#!/bin/bash

# Script de deployment para VPS
# Execute este script após fazer upload dos arquivos

set -e  # Parar em caso de erro

echo "🚀 Iniciando deployment AVB Python..."
echo ""

# 1. Verificar se .env existe
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo "📝 Copie .env.example para .env e configure as credenciais:"
    echo "   cp .env.example .env"
    echo "   nano .env"
    exit 1
fi

# 2. Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado!"
    echo "Execute: curl -fsSL https://get.docker.com | sh"
    exit 1
fi

# 3. Verificar se Docker Compose está instalado
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose não está instalado!"
    echo "Execute: apt install docker-compose-plugin"
    exit 1
fi

echo "✅ Pré-requisitos verificados"
echo ""

# 4. Parar containers antigos (se existirem)
echo "🛑 Parando containers antigos..."
docker compose down || true

# 5. Build das imagens
echo "🔨 Construindo imagens Docker..."
docker compose build

# 6. Iniciar containers
echo "▶️  Iniciando containers..."
docker compose up -d

# 7. Aguardar containers iniciarem
echo "⏳ Aguardando containers iniciarem..."
sleep 10

# 8. Verificar status
echo ""
echo "📊 Status dos containers:"
docker compose ps

# 9. Verificar logs
echo ""
echo "📋 Últimos logs da API:"
docker compose logs --tail=50 api

echo ""
echo "✅ Deployment concluído!"
echo ""
echo "🌐 Acesse a API em: http://seu-ip:8000"
echo "📖 Documentação em: http://seu-ip:8000/docs"
echo ""
echo "📝 Comandos úteis:"
echo "   docker compose logs -f api       # Ver logs em tempo real"
echo "   docker compose restart api       # Reiniciar API"
echo "   docker compose down              # Parar tudo"
echo "   docker compose up -d             # Iniciar tudo"
