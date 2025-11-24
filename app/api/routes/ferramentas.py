from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from app.services.ferramentas_service import FerramentasService
from app.services.whatsapp_service import WhatsAppService
import base64

router = APIRouter()


class PegarFerramentaRequest(BaseModel):
    """Schema para pegar ferramenta"""
    funcionario_nome: str
    funcionario_matricula: str
    funcionario_setor: str
    categoria: str
    total_itens: int

    class Config:
        extra = "allow"  # Permite campos extras (item_0_nome, item_0_tag, etc)


class DevolverFerramentaRequest(BaseModel):
    """Schema para devolver ferramenta"""
    funcionario_nome: str
    funcionario_matricula: str
    funcionario_setor: str
    categoria: str
    total_itens: int

    class Config:
        extra = "allow"


@router.post("/pegar-ferramenta")
async def pegar_ferramenta(data: Dict[str, Any]):
    """Registrar empréstimo de ferramenta"""
    try:
        ferramentas_service = FerramentasService()
        whatsapp_service = WhatsAppService()

        # Extrair dados
        funcionario = data.get("funcionario_nome")
        matricula = data.get("funcionario_matricula")
        setor = data.get("funcionario_setor")
        total_itens = int(data.get("total_itens", 0))

        # Extrair itens
        itens = []
        for i in range(total_itens):
            nome = data.get(f"item_{i}_nome")
            tag = data.get(f"item_{i}_tag")
            tipo = data.get(f"item_{i}_tipo", "")
            quantidade = int(data.get(f"item_{i}_quantidade", 1))

            if nome and tag:
                itens.append({
                    "nome": nome,
                    "tag": tag,
                    "tipo": tipo,
                    "quantidade": quantidade
                })

        # Registrar no banco
        await ferramentas_service.registrar_emprestimo(
            funcionario=funcionario,
            matricula=matricula,
            setor=setor,
            itens=itens
        )

        # Enviar notificação WhatsApp
        mensagem = ferramentas_service.formatar_mensagem_emprestimo(
            funcionario=funcionario,
            matricula=matricula,
            setor=setor,
            itens=itens
        )

        await whatsapp_service.enviar_mensagem_grupo(mensagem)

        return {
            "status": "success",
            "message": "Ferramenta registrada com sucesso",
            "itens": len(itens)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/devolver-ferramenta")
async def devolver_ferramenta(data: Dict[str, Any]):
    """Registrar devolução de ferramenta"""
    try:
        ferramentas_service = FerramentasService()
        whatsapp_service = WhatsAppService()

        # Extrair dados
        funcionario = data.get("funcionario_nome")
        matricula = data.get("funcionario_matricula")
        setor = data.get("funcionario_setor")
        total_itens = int(data.get("total_itens", 0))

        # Extrair itens
        itens = []
        for i in range(total_itens):
            nome = data.get(f"item_{i}_nome")
            tag = data.get(f"item_{i}_tag")

            if nome and tag:
                itens.append({"nome": nome, "tag": tag})

        # Registrar devolução
        await ferramentas_service.registrar_devolucao(
            funcionario=funcionario,
            matricula=matricula,
            setor=setor,
            itens=itens
        )

        # Notificar
        mensagem = ferramentas_service.formatar_mensagem_devolucao(
            funcionario=funcionario,
            matricula=matricula,
            setor=setor,
            itens=itens
        )

        await whatsapp_service.enviar_mensagem_grupo(mensagem)

        return {
            "status": "success",
            "message": "Devolução registrada com sucesso",
            "itens": len(itens)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/pegar-ferramenta-imagem")
async def pegar_ferramenta_imagem(foto: UploadFile = File(...)):
    """Upload de imagem ao pegar ferramenta"""
    try:
        whatsapp_service = WhatsAppService()

        # Ler imagem
        contents = await foto.read()
        base64_image = base64.b64encode(contents).decode('utf-8')
        mime_type = foto.content_type or 'image/png'

        # Formato completo base64
        full_base64 = f"data:{mime_type};base64,{base64_image}"

        # Enviar para WhatsApp
        await whatsapp_service.enviar_imagem_grupo(
            base64_image=full_base64,
            caption="📸 Foto - Retirada de ferramenta"
        )

        return {
            "status": "success",
            "message": "Imagem enviada com sucesso"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/devolver-ferramenta-imagem")
async def devolver_ferramenta_imagem(foto: UploadFile = File(...)):
    """Upload de imagem ao devolver ferramenta"""
    try:
        whatsapp_service = WhatsAppService()

        # Ler imagem
        contents = await foto.read()
        base64_image = base64.b64encode(contents).decode('utf-8')
        mime_type = foto.content_type or 'image/png'

        # Formato completo base64
        full_base64 = f"data:{mime_type};base64,{base64_image}"

        # Enviar para WhatsApp
        await whatsapp_service.enviar_imagem_grupo(
            base64_image=full_base64,
            caption="📸 Foto - Devolução de ferramenta"
        )

        return {
            "status": "success",
            "message": "Imagem enviada com sucesso"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/notificar-funcionario")
async def notificar_funcionario(data: Dict[str, Any]):
    """Enviar notificação para funcionário"""
    try:
        whatsapp_service = WhatsAppService()

        numero = data.get("numero")
        mensagem = data.get("mensagem")

        if not numero or not mensagem:
            raise HTTPException(status_code=400, detail="Número e mensagem são obrigatórios")

        await whatsapp_service.enviar_mensagem(numero, mensagem)

        return {
            "status": "success",
            "message": "Notificação enviada"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/estoque-baixo")
async def alerta_estoque_baixo(data: Dict[str, Any]):
    """Alerta de estoque baixo"""
    try:
        whatsapp_service = WhatsAppService()

        mensagem = data.get("mensagem", "⚠️ Alerta de estoque baixo")

        await whatsapp_service.enviar_mensagem_grupo(mensagem)

        return {
            "status": "success",
            "message": "Alerta enviado"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
