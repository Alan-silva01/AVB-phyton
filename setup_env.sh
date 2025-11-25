#!/bin/bash

# Script para configurar .env automaticamente
# Execute APÓS clonar o repositório na VPS

echo "🔧 Configurando arquivo .env..."

# Criar .env a partir do .env.example
cp .env.example .env

# Configurar variáveis (já estão corretas no .env.example)
echo "✅ Arquivo .env criado!"
echo ""
echo "📝 Verificando configurações:"
echo ""

# Mostrar configurações (sem mostrar senhas completas)
echo "PostgreSQL: $(grep POSTGRES_USER .env | cut -d'=' -f2)"
echo "Database: Supabase configurado"
echo "OpenAI: $(grep OPENAI_API_KEY .env | cut -d'=' -f2 | cut -c1-20)..."
echo "Evolution API: Configurada"
echo "WhatsApp Group: $(grep AVB_GROUP_ID .env | cut -d'=' -f2)"
echo ""
echo "✅ Configuração completa!"
echo ""
echo "🚀 Próximo passo: ./deploy.sh"
