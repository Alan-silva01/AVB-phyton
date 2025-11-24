# 🧪 Testes da API AVB

## Testar Endpoints com cURL

Após a API estar rodando, teste os endpoints:

### 1. Health Check

```bash
curl http://165.22.131.157:8000/health
```

Resposta esperada:
```json
{"status":"healthy"}
```

---

### 2. Pegar Ferramenta

```bash
curl -X POST http://165.22.131.157:8000/pegar-ferramenta \
  -H "Content-Type: application/json" \
  -d '{
    "funcionario_nome": "João Silva",
    "funcionario_matricula": "12345",
    "funcionario_setor": "Manutenção",
    "categoria": "elétrica",
    "total_itens": 2,
    "item_0_nome": "Furadeira",
    "item_0_tag": "TAG001",
    "item_0_tipo": "elétrica",
    "item_0_quantidade": 1,
    "item_1_nome": "Jogo de Brocas",
    "item_1_tag": "TAG002",
    "item_1_tipo": "manual",
    "item_1_quantidade": 1
  }'
```

---

### 3. Devolver Ferramenta

```bash
curl -X POST http://165.22.131.157:8000/devolver-ferramenta \
  -H "Content-Type: application/json" \
  -d '{
    "funcionario_nome": "João Silva",
    "funcionario_matricula": "12345",
    "funcionario_setor": "Manutenção",
    "categoria": "elétrica",
    "total_itens": 1,
    "item_0_nome": "Furadeira",
    "item_0_tag": "TAG001"
  }'
```

---

### 4. Chat com AVBot

```bash
curl -X POST http://165.22.131.157:8000/api/autonomia/agentes \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Quais furadeiras temos disponíveis?",
    "session_id": "test-123"
  }'
```

---

### 5. Notificar Funcionário

```bash
curl -X POST http://165.22.131.157:8000/notificar-funcionario \
  -H "Content-Type: application/json" \
  -d '{
    "numero": "5511999999999@c.us",
    "mensagem": "Teste de notificação AVB"
  }'
```

---

## Testar com Postman

1. Abra Postman
2. Importe a collection: `http://165.22.131.157:8000/docs`
3. Teste cada endpoint

---

## Testar Documentação Interativa

Acesse no navegador:
```
http://165.22.131.157:8000/docs
```

Você pode testar todos os endpoints diretamente pela interface!

---

## Exemplos de Respostas

### Sucesso:
```json
{
  "status": "success",
  "message": "Ferramenta registrada com sucesso",
  "itens": 2
}
```

### Erro:
```json
{
  "detail": "Erro ao processar requisição: ..."
}
```

---

## Testar WhatsApp

Se a notificação funcionou, você deve receber uma mensagem no grupo WhatsApp:

```
📢 Retirada de ferramenta – AVB

👷 Funcionário
João Silva
🆔 Matrícula: 12345
🏭 Setor: Manutenção

📦 Itens retirados da ferramentaria:
🔧 TAG TAG001 – Furadeira
🔧 TAG TAG002 – Jogo de Brocas

📅 Hoje, 24 de novembro às 15:30
```

---

## Testar Agente IA (AVBot)

Perguntas para testar:

1. "Olá, tudo bem?"
2. "Quais ferramentas temos disponíveis?"
3. "Tem furadeira disponível?"
4. "Quantas chaves inglesas temos?"
5. "Quem pegou a ferramenta TAG007?"
6. "Materiais com estoque baixo"

---

## Monitorar Logs Durante Testes

Em outro terminal, deixe os logs abertos:

```bash
ssh avb@165.22.131.157
cd ~/AVB-python
docker compose logs -f api
```

Você verá as requisições chegando em tempo real!

---

## Performance Testing

### Testar velocidade de resposta:

```bash
time curl http://165.22.131.157:8000/health
```

Deve ser < 100ms

### Testar carga (100 requisições):

```bash
for i in {1..100}; do
  curl -s http://165.22.131.157:8000/health > /dev/null &
done
wait
```

---

## Verificar Uso de Recursos

```bash
# Na VPS
docker stats

# Deve mostrar algo como:
# NAME        CPU %     MEM USAGE / LIMIT
# avb-api     5%        250MB / 4GB
# avb-postgres 2%       80MB / 4GB
# avb-redis   1%        10MB / 4GB
```

Muito mais leve que n8n! 🚀

---

## Troubleshooting

### API não responde
```bash
docker compose ps  # Verificar se está rodando
docker compose logs api  # Ver erros
docker compose restart api  # Reiniciar
```

### Erro 500
```bash
# Ver logs detalhados
docker compose logs api | tail -100
```

### WhatsApp não envia
Verifique:
1. EVOLUTION_API_KEY está correta no .env
2. EVOLUTION_API_URL está acessível
3. Instância "autonomia" está ativa

```bash
# Testar Evolution API
curl https://autonomia-evolution.w8liji.easypanel.host/instance/fetchInstances \
  -H "apikey: SUA_KEY"
```

---

Bons testes! 🧪
