from passlib.context import CryptContext
from datetime import date
from typing import Dict, List

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Banco de dados fake em memória
fake_users_db = {
    "user@example.com": {
        "email": "user@example.com",
        "hashed_password": pwd_context.hash("secret"),
        "disabled": False,
        "name": "João Técnico"
    }
}

# Banco de dados fake para Ordens de Serviço
fake_os_db = {
    1: {
        "id": 1,
        "technician": "user@example.com",
        "description": "Manutenção preventiva",
        "date": date(2023, 10, 15).isoformat(),
        "status": "completed",
        "checklist": [
            {"id": 1, "description": "Verificação de segurança", "checked": True},
            {"id": 2, "description": "Teste de funcionamento", "checked": True}
        ],
        "photo": None
    }
}


def get_db_users():
    return fake_users_db


def get_db_os():
    return fake_os_db
