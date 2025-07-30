## Executando o Projeto Localmente

Para executar o projeto localmente em sua máquina, siga as etapas abaixo:

### Pré-requisitos

- Docker
- Docker Compose
- Certifique-se de ter as portas 3000, 5000 e 5432 livre em sua máquina antes de prosseguir

### Passos

1. Clone o repositório do projeto:

   ```bash
   git clone <repository-url>
   ```

2. Navegue até o diretório raiz do projeto;

3. Inicie o projeto usando o Docker Compose:

   ```bash
   docker compose up --build
   ```

   Isso iniciará os contêineres necessários para executar o projeto;

4. Após a inicialização, você poderá acessar o projeto em seu navegador através do seguinte endereço:

   ```bash
   http://localhost:3000
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

### Exemplo de requisição POST

```json
{
  "nome": "João Silva",
  "cpf": "12345678901",
  "cep": "01310100",
  "complemento": "Apto 45"
}
```
