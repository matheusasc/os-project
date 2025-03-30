from typing import Optional, List

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class User(BaseModel):
    username: str
    password: str


class UserInDB(User):
    email: str
    disabled: bool | None = None
    name: str | None = None


class ChecklistItem(BaseModel):
    id: int
    description: str
    checked: bool


class OrderService(BaseModel):
    id: Optional[int] = None
    technician: Optional[str] = None
    description: str
    date: str
    status: str
    checklist: List[ChecklistItem]
    photo: Optional[str] = None
