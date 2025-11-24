from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.agents.avbot import AVBot

router = APIRouter()

# Instância global do agente
avbot = AVBot()


class ChatRequest(BaseModel):
    """Schema para requisição de chat"""
    message: str
    session_id: Optional[str] = "default"


class ChatResponse(BaseModel):
    """Schema para resposta do chat"""
    response: str
    session_id: str


@router.post("/autonomia/agentes", response_model=ChatResponse)
async def chat_agente(request: ChatRequest):
    """
    Endpoint principal do agente AVBot

    Recebe mensagens do usuário e retorna respostas do agente IA
    """
    try:
        # Processar mensagem com o agente
        response = await avbot.chat(
            message=request.message,
            session_id=request.session_id
        )

        return ChatResponse(
            response=response,
            session_id=request.session_id
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao processar mensagem: {str(e)}"
        )


@router.post("/chat")
async def chat_alternativo(request: ChatRequest):
    """
    Endpoint alternativo para chat (compatibilidade)
    """
    try:
        response = await avbot.chat(
            message=request.message,
            session_id=request.session_id
        )

        return {
            "status": "success",
            "response": response,
            "session_id": request.session_id
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
