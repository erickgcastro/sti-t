# Executando com Docker

## Pré-requisitos

- Docker
- Docker Compose

## Comandos para execução local

### Executar apenas a aplicação (com H2 em memória)

```bash
docker compose up --build
```

## Endpoints da API

```bash
 http://localhost:5000/api
```

- `GET /` - Página inicial
- `GET /usuarios` - Listar usuários
- `POST /usuarios` - Criar usuário
- `GET /usuarios/{id}` - Buscar usuário por ID
- `PUT /usuarios/{id}` - Atualizar usuário
- `DELETE /usuarios/{id}` - Deletar usuário

## Exemplo de requisição POST

```json
{
  "nome": "João Silva",
  "cpf": "12345678901",
  "cep": "01310100",
  "numero": "123",
  "complemento": "Apto 45"
}
```

## Acessos

- **API**: http://localhost:5000
- **H2 Console**: http://localhost:5000/h2-console
- **PostgreSQL**: localhost:5432 (usuário: usuario, senha: senha123)
