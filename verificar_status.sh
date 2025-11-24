#!/bin/bash

# Script de verificação de status da instalação
# Execute este script NO SERVIDOR VPS

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        Verificação de Status - AVB Python API               ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verificar usuário atual
echo "👤 Usuário atual:"
echo "   $(whoami)"
echo ""

# 2. Verificar se Docker está instalado
echo "🐳 Docker:"
if command -v docker &> /dev/null; then
    echo -e "   ${GREEN}✓ Instalado${NC}"
    docker --version
else
    echo -e "   ${RED}✗ NÃO instalado${NC}"
    echo "   ⚠️  Execute: curl -fsSL https://get.docker.com | sh"
fi
echo ""

# 3. Verificar Docker Compose
echo "🐳 Docker Compose:"
if docker compose version &> /dev/null; then
    echo -e "   ${GREEN}✓ Instalado${NC}"
    docker compose version
else
    echo -e "   ${RED}✗ NÃO instalado${NC}"
    echo "   ⚠️  Execute: apt install docker-compose-plugin"
fi
echo ""

# 4. Verificar se usuário avb existe
echo "👥 Usuário 'avb':"
if id "avb" &>/dev/null; then
    echo -e "   ${GREEN}✓ Existe${NC}"
    # Verificar se está no grupo docker
    if groups avb | grep -q docker; then
        echo -e "   ${GREEN}✓ No grupo docker${NC}"
    else
        echo -e "   ${YELLOW}⚠  NÃO está no grupo docker${NC}"
        echo "   Execute: usermod -aG docker avb"
    fi
else
    echo -e "   ${RED}✗ NÃO existe${NC}"
    echo "   ⚠️  Execute: adduser avb"
fi
echo ""

# 5. Verificar se projeto existe
echo "📁 Projeto AVB-python:"
if [ -d "/home/avb/AVB-python" ]; then
    echo -e "   ${GREEN}✓ Pasta existe${NC}"
    echo "   Localização: /home/avb/AVB-python"

    # Verificar .env
    if [ -f "/home/avb/AVB-python/.env" ]; then
        echo -e "   ${GREEN}✓ Arquivo .env existe${NC}"
    else
        echo -e "   ${YELLOW}⚠  .env NÃO encontrado${NC}"
        echo "   Execute: cp .env.example .env && nano .env"
    fi
else
    echo -e "   ${RED}✗ Pasta NÃO existe${NC}"
    echo "   ⚠️  Faça upload dos arquivos"
fi
echo ""

# 6. Verificar se containers estão rodando
echo "🐋 Containers Docker:"
if docker compose version &> /dev/null; then
    if [ -d "/home/avb/AVB-python" ]; then
        cd /home/avb/AVB-python 2>/dev/null
        RUNNING=$(docker compose ps 2>/dev/null | grep -c "Up" || echo "0")
        if [ "$RUNNING" -gt 0 ]; then
            echo -e "   ${GREEN}✓ Rodando ($RUNNING containers)${NC}"
            docker compose ps
        else
            echo -e "   ${YELLOW}⚠  Nenhum container rodando${NC}"
            echo "   Execute: cd ~/AVB-python && docker compose up -d"
        fi
    fi
else
    echo -e "   ${YELLOW}⚠  Docker Compose não instalado${NC}"
fi
echo ""

# 7. Verificar firewall
echo "🔥 Firewall (UFW):"
if command -v ufw &> /dev/null; then
    STATUS=$(ufw status | grep -c "Status: active" || echo "0")
    if [ "$STATUS" -gt 0 ]; then
        echo -e "   ${GREEN}✓ Ativo${NC}"
        ufw status | grep -E "22|80|443|8000"
    else
        echo -e "   ${YELLOW}⚠  Inativo${NC}"
        echo "   Execute: ufw allow 22/tcp && ufw allow 80/tcp && ufw enable"
    fi
else
    echo -e "   ${YELLOW}⚠  UFW não instalado${NC}"
fi
echo ""

# 8. Verificar se API está respondendo
echo "🌐 API Status:"
if curl -s http://localhost:8000/health &> /dev/null; then
    echo -e "   ${GREEN}✓ API está ONLINE!${NC}"
    echo "   URL: http://$(hostname -I | awk '{print $1}'):8000"
    echo ""
    echo "   Teste:"
    curl -s http://localhost:8000/health | python3 -m json.tool 2>/dev/null || curl -s http://localhost:8000/health
else
    echo -e "   ${YELLOW}⚠  API não está respondendo${NC}"
    echo "   Verifique os logs: docker compose logs api"
fi
echo ""

# Resumo final
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    PRÓXIMOS PASSOS                           ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Determinar próximo passo
if ! command -v docker &> /dev/null; then
    echo "1️⃣  Instalar Docker:"
    echo "   curl -fsSL https://get.docker.com | sh"
    echo "   apt install docker-compose-plugin"
elif ! id "avb" &>/dev/null; then
    echo "2️⃣  Criar usuário avb:"
    echo "   adduser avb"
    echo "   usermod -aG docker avb"
elif [ ! -d "/home/avb/AVB-python" ]; then
    echo "3️⃣  Fazer upload do projeto:"
    echo "   (Do seu Mac) scp -r AVB-python avb@165.22.131.157:~/"
elif [ ! -f "/home/avb/AVB-python/.env" ]; then
    echo "4️⃣  Configurar credenciais:"
    echo "   su - avb"
    echo "   cd ~/AVB-python"
    echo "   cp .env.example .env"
    echo "   nano .env"
elif ! docker compose ps 2>/dev/null | grep -q "Up"; then
    echo "5️⃣  Fazer deploy:"
    echo "   su - avb"
    echo "   cd ~/AVB-python"
    echo "   chmod +x deploy.sh"
    echo "   ./deploy.sh"
else
    echo "🎉 Tudo instalado e rodando!"
    echo ""
    echo "   Acesse: http://$(hostname -I | awk '{print $1}'):8000/docs"
fi

echo ""
