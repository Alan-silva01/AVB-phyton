from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # PostgreSQL
    DATABASE_URL: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str

    # OpenAI
    OPENAI_API_KEY: str

    # Evolution API (WhatsApp)
    EVOLUTION_API_URL: str
    EVOLUTION_API_KEY: str
    EVOLUTION_INSTANCE: str
    AVB_GROUP_ID: str

    # Aplicação
    DEBUG: bool = False
    TZ: str = "America/Sao_Paulo"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
