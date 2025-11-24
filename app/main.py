from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import ferramentas, agente, webhooks
from app.database.connection import init_db

app = FastAPI(
    title="AVB Ferramentaria API",
    description="Sistema de controle de ferramentaria com IA",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rotas
app.include_router(ferramentas.router, prefix="/api", tags=["Ferramentas"])
app.include_router(agente.router, prefix="/api", tags=["Agente IA"])
app.include_router(webhooks.router, prefix="", tags=["Webhooks"])


@app.on_event("startup")
async def startup():
    """Inicializar conexão com banco de dados"""
    await init_db()


@app.get("/")
def root():
    """Endpoint raiz"""
    return {
        "status": "online",
        "service": "AVB Ferramentaria API",
        "version": "1.0.0"
    }


@app.get("/health")
def health_check():
    """Health check"""
    return {"status": "healthy"}
