from datetime import date
from pydantic import BaseModel
from typing import List, Optional


class ChecklistItem(BaseModel):
    id: int
    description: str
    checked: bool


class OrderServiceBase(BaseModel):
    technician: str
    description: str
    date: date
    status: str  # 'open', 'in_progress', 'completed'
    checklist: List[ChecklistItem]
    photo: Optional[str] = None


class OrderServiceCreate(OrderServiceBase):
    pass


class OrderService(OrderServiceBase):
    id: int

    class Config:
        from_attributes = True
