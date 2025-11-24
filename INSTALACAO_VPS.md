# 🚀 Guia Completo de Instalação na VPS

## Seu servidor: `165.22.131.157`

---

## Passo 1: Conectar no Servidor

Abra o terminal no seu Mac e execute:

```bash
ssh root@165.22.131.157
```

Digite a senha quando solicitado.

---

## Passo 2: Atualizar Sistema e Instalar Docker

Cole estes comandos (um de cada vez):

```bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar ferramentas básicas
apt install -y git curl wget vim htop ufw fail2ban

# Instalar Docker
curl -fsSL https://get.docker.com | sh

# Instalar Docker Compose
apt install -y docker-compose-plugin

# Verificar instalação
docker --version
docker compose version
```

---

## Passo 3: Configurar Firewall

```bash
# Permitir SSH, HTTP e HTTPS
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Verificar
ufw status
```

---

## Passo 4: Criar Usuário para Aplicação

```bash
# Criar usuário
adduser avb
# Digite uma senha forte quando pedir
# Pressione ENTER nas outras perguntas

# Adicionar ao grupo Docker
usermod -aG docker avb

# Trocar para o usuário
su - avb
```

Agora você está logado como usuário `avb`.

---

## Passo 5: Fazer Upload dos Arquivos

### Opção A: Via Git (Recomendado)

Se você colocar o projeto no GitHub:

```bash
cd ~
git clone https://github.com/seu-usuario/AVB-python.git
cd AVB-python
```

### Opção B: Via SCP (do seu Mac)

Abra **OUTRO terminal** no seu Mac e execute:

```bash
cd /Users/alanferreiradasilva/Desktop/AVB-code
scp -r AVB-python avb@165.22.131.157:~/
```

Depois volte ao terminal conectado na VPS:

```bash
cd ~/AVB-python
```

---

## Passo 6: Configurar Credenciais

```bash
# Copiar exemplo
cp .env.example .env

# Editar arquivo
nano .env
```

**Edite estas linhas:**

1. **PostgreSQL** (linha 2):
   ```
   POSTGRES_PASSWORD=SuaSenhaForte123!@#
   ```

2. **DATABASE_URL** (linha 4) - Use a mesma senha:
   ```
   DATABASE_URL=postgresql://avb_user:SuaSenhaForte123!@#@postgres:5432/avb_db
   ```

3. **OpenAI** (linha 7):
   ```
   OPENAI_API_KEY=sk-proj-SUA_KEY_REAL_AQUI
   ```

4. **Evolution API** (linha 11):
   ```
   EVOLUTION_API_KEY=SUA_KEY_EVOLUTION_AQUI
   ```

**Salvar**: Pressione `CTRL + O`, depois `ENTER`, depois `CTRL + X`

---

## Passo 7: Deploy!

```bash
# Tornar script executável
chmod +x deploy.sh

# Executar deployment
./deploy.sh
```

**Aguarde...** O script vai:
1. ✅ Construir as imagens Docker
2. ✅ Iniciar PostgreSQL
3. ✅ Iniciar Redis
4. ✅ Iniciar a API

---

## Passo 8: Verificar se Funcionou

### Ver logs da API:
```bash
docker compose logs -f api
```

Você deve ver algo como:
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
✅ Conectado ao PostgreSQL
```

Pressione `CTRL + C` para sair dos logs.

### Testar API:

No seu navegador, acesse:
```
http://165.22.131.157:8000
```

Deve aparecer:
```json
{
  "status": "online",
  "service": "AVB Ferramentaria API",
  "version": "1.0.0"
}
```

### Ver documentação interativa:
```
http://165.22.131.157:8000/docs
```

---

## 🎉 Pronto! API está no ar!

### URLs importantes:

- **API Base**: `http://165.22.131.157:8000`
- **Documentação**: `http://165.22.131.157:8000/docs`
- **Health Check**: `http://165.22.131.157:8000/health`

### Endpoints para usar no seu app:

```
POST http://165.22.131.157:8000/pegar-ferramenta
POST http://165.22.131.157:8000/devolver-ferramenta
POST http://165.22.131.157:8000/autonomia/agentes  (Chatbot)
```

---

## 🛠️ Comandos Úteis

### Ver o que está rodando:
```bash
docker compose ps
```

### Ver logs em tempo real:
```bash
docker compose logs -f api
```

### Reiniciar a API:
```bash
docker compose restart api
```

### Parar tudo:
```bash
docker compose down
```

### Iniciar novamente:
```bash
docker compose up -d
```

### Ver uso de memória/CPU:
```bash
docker stats
```

---

## 🔧 Migrar Dados do PostgreSQL Existente

Se você já tem um PostgreSQL com dados, você tem 2 opções:

### Opção 1: Usar o PostgreSQL existente (Recomendado)

Edite o `.env` e aponte para seu PostgreSQL existente:

```bash
nano .env
```

Mude:
```
DATABASE_URL=postgresql://usuario_existente:senha_existente@ip_postgres_existente:5432/nome_db_existente
```

E no `docker-compose.yml`, comente o serviço postgres:
```bash
nano docker-compose.yml
```

Comente as linhas do PostgreSQL (adicione # no início):
```yaml
#  postgres:
#    image: postgres:16-alpine
#    ...
```

### Opção 2: Migrar dados para o novo PostgreSQL

```bash
# No servidor antigo, fazer backup
pg_dump -U usuario -d nome_db > backup.sql

# Copiar para VPS nova
scp backup.sql avb@165.22.131.157:~/

# Na VPS nova, restaurar
docker compose exec -T postgres psql -U avb_user avb_db < ~/backup.sql
```

---

## 🆘 Problemas Comuns

### "Cannot connect to Docker daemon"
```bash
# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
# Fazer logout e login novamente
exit
su - avb
```

### "Port 8000 already in use"
```bash
# Matar processo usando porta 8000
sudo lsof -ti:8000 | xargs kill -9
# Ou mudar a porta no docker-compose.yml
```

### API não responde
```bash
# Ver logs para diagnóstico
docker compose logs api

# Verificar se container está rodando
docker compose ps

# Reiniciar
docker compose restart api
```

### Erro de permissão
```bash
# Dar permissão correta
sudo chown -R avb:avb ~/AVB-python
```

---

## 📞 Próximos Passos

1. ✅ Testar todos os endpoints em `/docs`
2. ✅ Configurar seu frontend para apontar para `http://165.22.131.157:8000`
3. ✅ Testar o chatbot AVBot
4. ✅ Enviar uma notificação WhatsApp de teste
5. ⚠️ Opcional: Configurar domínio e SSL (HTTPS)

---

## 🔒 SSL/HTTPS (Opcional)

Se você quiser usar um domínio (ex: `api.avb.com.br`):

1. Apontar domínio para o IP `165.22.131.157`
2. Instalar Nginx e Certbot:
```bash
apt install nginx certbot python3-certbot-nginx
certbot --nginx -d api.avb.com.br
```

---

Boa sorte! 🚀
