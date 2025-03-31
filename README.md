# 🛠️ Sistema de Ordens de Serviço

<div align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular">
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI">

</div>

## 📌 Visão Geral
Sistema para gerenciamento de ordens de serviço com:
- **Backend**: FastAPI (Python 3.10+)
- **Frontend**: Angular 18+

## 🚀 Começando

### Pré-requisitos
```bash
# Backend
Python 3.10+
pip install -U pip

# Frontend
Node.js 20+
npm install -g @angular/cli
  ```

### Instalação
```bash
# Clone o repositório
git clone https://github.com/matheusasc/os-project
cd os-project

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
  ```
  ## ⚙️ Execução
  ### Iniciar Backend
  ```bash
  uvicorn main:app --reload
  ```
- **📌 API disponível em**: http://localhost:8000
- **📚 Documentação**: http://localhost:8000/docs


### Iniciar Frontend
```bash
cd ../frontend
ng serve
  ```
- **🌐 Acesse**: http://localhost:4200
