from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import date
from app.models.os_models import OrderService, OrderServiceCreate, ChecklistItem
from app.auth import get_current_user

router = APIRouter()

# Banco de dados fake
fake_os_db = [
    {
        "id": 1,
        "technician": "user@example.com",  # Relacionado ao usuário do auth
        "description": "Manutenção preventiva",
        "date": date(2023, 10, 15).isoformat(),
        "status": "completed",
        "checklist": [
            {"id": 1, "description": "Verificação de segurança", "checked": True},
            {"id": 2, "description": "Teste de funcionamento", "checked": True}
        ],
        "photo": None
    }
]


@router.get("/", response_model=List[OrderService])
def list_orders(
        skip: int = 0,
        limit: int = 100,
        current_user: str = Depends(get_current_user)
):
    # Filtra apenas as OS do técnico logado
    user_orders = [o for o in fake_os_db if o["technician"] == current_user]
    return user_orders[skip:skip + limit]


@router.post("/", response_model=OrderService, status_code=status.HTTP_201_CREATED)
def create_order(
        order: OrderServiceCreate,
        current_user: str = Depends(get_current_user)
):
    new_order = {
        "id": len(fake_os_db) + 1,
        "technician": current_user,  # Se associa ao usuário logado
        **order.dict()
    }
    fake_os_db.append(new_order)
    return new_order


@router.get("/{order_id}", response_model=OrderService)
def read_order(
        order_id: int,
        current_user: str = Depends(get_current_user)
):
    order = next((o for o in fake_os_db if o["id"] == order_id), None)
    if order is None or order["technician"] != current_user:
        raise HTTPException(status_code=404, detail="Ordem de serviço não encontrada")
    return order


@router.put("/{order_id}", response_model=OrderService)
def update_order(
        order_id: int,
        order: OrderServiceCreate,
        current_user: str = Depends(get_current_user)
):
    db_order = next((o for o in fake_os_db if o["id"] == order_id), None)
    if db_order is None or db_order["technician"] != current_user:
        raise HTTPException(status_code=404, detail="Ordem de serviço não encontrada")

    updated_order = {**db_order, **order.dict()}
    fake_os_db[fake_os_db.index(db_order)] = updated_order
    return updated_order


@router.get("/{order_id}/checklist", response_model=List[ChecklistItem])
def get_checklist(
        order_id: int,
        current_user: str = Depends(get_current_user)
):
    order = next((o for o in fake_os_db if o["id"] == order_id), None)
    if order is None or order["technician"] != current_user:
        raise HTTPException(status_code=404, detail="Ordem de serviço não encontrada")
    return order["checklist"]
