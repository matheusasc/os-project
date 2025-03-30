from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import router as auth_router
from app.routes.os_routes import router as os_router

app = FastAPI()

# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_origin_regex=r"http://localhost:\d+",
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    allow_credentials=True,
    expose_headers=["*"],
    max_age=600,
)

# Rotas
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(os_router, prefix="/api/os", tags=["os"])


@app.get("/")
def read_root():
    return {"message": "API de Ordens de Serviço"}
