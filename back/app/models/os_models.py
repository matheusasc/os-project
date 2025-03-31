from datetime import date
from pydantic import BaseModel
from typing import List, Optional


class ChecklistItem(BaseModel):
    id: int
    description: str
    checked: bool


# Modelo para criação (o que vem do cliente)
class OrderServiceCreate(BaseModel):
    description: str
    date: date
    status: str  # 'open', 'in_progress', 'completed'
    checklist: List[ChecklistItem]
    photo: Optional[str] = None


# Modelo base (com campos completos)
class OrderServiceBase(OrderServiceCreate):
    technician: str


# Modelo para resposta (com ID)
class OrderService(OrderServiceBase):
    id: int

    class Config:
        from_attributes = True
