import asyncpg
from typing import Optional
from app.config import settings

# Pool de conexões global
pool: Optional[asyncpg.Pool] = None


async def init_db():
    """Inicializar pool de conexões PostgreSQL"""
    global pool
    pool = await asyncpg.create_pool(
        settings.DATABASE_URL,
        min_size=2,
        max_size=10
    )
    print("✅ Conectado ao PostgreSQL")


async def get_db():
    """Obter conexão do pool"""
    if pool is None:
        await init_db()
    async with pool.acquire() as connection:
        yield connection


async def execute_query(query: str, *args):
    """Executar query SQL"""
    if pool is None:
        await init_db()
    async with pool.acquire() as connection:
        return await connection.fetch(query, *args)


async def execute_one(query: str, *args):
    """Executar query e retornar um resultado"""
    if pool is None:
        await init_db()
    async with pool.acquire() as connection:
        return await connection.fetchrow(query, *args)


async def execute_command(query: str, *args):
    """Executar comando SQL (INSERT, UPDATE, DELETE)"""
    if pool is None:
        await init_db()
    async with pool.acquire() as connection:
        return await connection.execute(query, *args)
