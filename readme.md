## Executando o Projeto Localmente

Para executar o projeto localmente em sua máquina, siga as etapas abaixo:

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Portas **3000**, **5000** e **5432** livres na sua máquina

### Passos

1. Clone o repositório do projeto:

   ```bash
   git clone https://github.com/erickgcastro/sti-t.git
   ```

2. Acesse a raiz do projeto:
   ```bash
   cd sti-t
   ```
3. Inicie os containers com Docker Compose:
   ```bash
   docker compose up --build
   ```
4. Acesse a aplicação no navegador:
   ```bash
   http://localhost:3000
   ```
---

## Endpoints da API

```bash
 http://localhost:5000/api
```

| Método | Endpoint               | Descrição                     |
|--------|------------------------|-------------------------------|
| GET    | `/`                    | Página inicial                |
| GET    | `/usuarios`            | Lista todos os usuários       |
| POST   | `/usuarios`            | Cria um novo usuário          |
| GET    | `/usuarios/{id}`       | Busca usuário por ID          |
| PUT    | `/usuarios/{id}`       | Atualiza um usuário           |
| DELETE | `/usuarios/{id}`       | Deleta um usuário             |

### Exemplo de requisição POST

```json
{
  "nome": "João Silva",
  "cpf": "12345678901",
  "cep": "01310100",
  "complemento": "Apto 45"
}
```
