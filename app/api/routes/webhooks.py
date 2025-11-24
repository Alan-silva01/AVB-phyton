from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()


@router.post("/pegar-ferramenta")
async def webhook_pegar(data: Dict[str, Any]):
    """
    Webhook para pegar ferramenta
    (Redireciona para /api/pegar-ferramenta)
    """
    from app.api.routes.ferramentas import pegar_ferramenta
    return await pegar_ferramenta(data)


@router.post("/devolver-ferramenta")
async def webhook_devolver(data: Dict[str, Any]):
    """
    Webhook para devolver ferramenta
    (Redireciona para /api/devolver-ferramenta)
    """
    from app.api.routes.ferramentas import devolver_ferramenta
    return await devolver_ferramenta(data)


@router.post("/autonomia/agentes")
async def webhook_agente(data: Dict[str, Any]):
    """
    Webhook para agente IA
    (Redireciona para /api/autonomia/agentes)
    """
    from app.api.routes.agente import chat_agente
    from app.api.routes.agente import ChatRequest

    message = data.get("message", data.get("mensagem", ""))
    session_id = data.get("session_id", "default")

    request = ChatRequest(message=message, session_id=session_id)
    return await chat_agente(request)
