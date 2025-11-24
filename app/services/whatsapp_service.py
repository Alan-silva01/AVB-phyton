import httpx
from app.config import settings


class WhatsAppService:
    """Serviço para integração com Evolution API (WhatsApp)"""

    def __init__(self):
        self.base_url = settings.EVOLUTION_API_URL
        self.api_key = settings.EVOLUTION_API_KEY
        self.instance = settings.EVOLUTION_INSTANCE
        self.group_id = settings.AVB_GROUP_ID

    async def enviar_mensagem_grupo(self, mensagem: str):
        """Enviar mensagem de texto para grupo AVB"""
        url = f"{self.base_url}/message/sendText/{self.instance}"

        headers = {
            "apikey": self.api_key,
            "Content-Type": "application/json"
        }

        payload = {
            "number": self.group_id,
            "text": mensagem
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(url, json=payload, headers=headers)
            return response.json()

    async def enviar_mensagem(self, numero: str, mensagem: str):
        """Enviar mensagem de texto para número específico"""
        url = f"{self.base_url}/message/sendText/{self.instance}"

        headers = {
            "apikey": self.api_key,
            "Content-Type": "application/json"
        }

        payload = {
            "number": numero,
            "text": mensagem
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(url, json=payload, headers=headers)
            return response.json()

    async def enviar_imagem_grupo(self, base64_image: str, caption: str = ""):
        """Enviar imagem para grupo AVB"""
        url = f"{self.base_url}/message/sendMedia/{self.instance}"

        headers = {
            "apikey": self.api_key,
            "Content-Type": "application/json"
        }

        payload = {
            "number": self.group_id,
            "mediatype": "image",
            "media": base64_image,
            "caption": caption
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(url, json=payload, headers=headers)
            return response.json()

    async def enviar_imagem(self, numero: str, base64_image: str, caption: str = ""):
        """Enviar imagem para número específico"""
        url = f"{self.base_url}/message/sendMedia/{self.instance}"

        headers = {
            "apikey": self.api_key,
            "Content-Type": "application/json"
        }

        payload = {
            "number": numero,
            "mediatype": "image",
            "media": base64_image,
            "caption": caption
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(url, json=payload, headers=headers)
            return response.json()
