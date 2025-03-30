from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt, JWTError

from .database import get_db_users, get_db_os, pwd_context
from .schemas import Token, User, OrderService, ChecklistItem
from .security import create_access_token, verify_token, oauth2_scheme, ALGORITHM, SECRET_KEY

router = APIRouter()


def authenticate_user(username: str, password: str):
    users_db = get_db_users()
    user = users_db.get(username)
    if not user:
        return False
    if not pwd_context.verify(password, user["hashed_password"]):
        return False
    return user


@router.post("/token", response_model=Token)
async def login(user_data: User):
    user = authenticate_user(user_data.username, user_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me/", response_model=User)
async def read_users_me(email: str = Depends(verify_token)):
    users_db = get_db_users()
    user = users_db.get(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# Rotas para Ordens de Serviço
@router.get("/os/", response_model=List[OrderService])
async def list_orders(email: str = Depends(verify_token)):
    os_db = get_db_os()
    # Filtra OS apenas do técnico logado
    return [os for os in os_db.values() if os["technician"] == email]


@router.post("/os/", response_model=OrderService, status_code=status.HTTP_201_CREATED)
async def create_order(
        order: OrderService,
        email: str = Depends(verify_token)
):
    os_db = get_db_os()
    new_id = max(os_db.keys()) + 1 if os_db else 1

    # Garante que a OS pertence ao técnico logado
    order_dict = order.dict()
    order_dict["id"] = new_id
    order_dict["technician"] = email

    os_db[new_id] = order_dict
    return order_dict


@router.get("/os/{order_id}", response_model=OrderService)
async def read_order(
        order_id: int,
        email: str = Depends(verify_token)
):
    os_db = get_db_os()
    order = os_db.get(order_id)

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order["technician"] != email:
        raise HTTPException(status_code=403, detail="Not authorized to access this order")

    return order


@router.put("/os/{order_id}", response_model=OrderService)
async def update_order(
        order_id: int,
        order: OrderService,
        email: str = Depends(verify_token)
):
    os_db = get_db_os()
    if order_id not in os_db:
        raise


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        return email
    except JWTError:
        raise credentials_exception
