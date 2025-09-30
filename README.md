# Calculadora do Milhão - Backend

API para simulação de investimentos de longo prazo, com autenticação de usuários e persistência de cálculos.

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT (autenticação)
- Bcrypt (hash de senha)

## Como rodar o projeto

### 1. Clone o repositório e instale as dependências

```bash
npm install
```

### 2. Configure o banco de dados

- Edite o arquivo `.env` na raiz do projeto:
  ```
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/calculadora"
  JWT_SECRET="sua_chave_secreta"
  ```

- Suba o banco de dados com Docker:
  ```bash
  docker-compose up -d
  ```

### 3. Rode as migrations do Prisma

```bash
npx prisma migrate dev --name init
```

### 4. Inicie o servidor

```bash
npx ts-node-dev src/index.ts
```

A API estará disponível em `http://localhost:3333`.

## Rotas principais

- `POST /auth/signup` — Cadastro de usuário
- `POST /auth/login` — Login de usuário (retorna JWT)
- (Em breve) Rotas para cálculos e histórico

## Testando as rotas

Você pode usar o arquivo `request.http` (com a extensão REST Client no VS Code) ou ferramentas como Postman/Insomnia.

Exemplo de requisição para cadastro:
```
POST http://localhost:3333/auth/signup
Content-Type: application/json

{
  "email": "seu@email.com",
  "password": "suaSenhaForte"
}
```

## Estrutura de pastas

```
src/
  controllers/
  routes/
  middlewares/
  index.ts
prisma/
  schema.prisma
docker-compose.yml
.env
tsconfig.json
package.json
```

---

> Dúvidas ou sugestões? Abra uma issue ou entre em contato!
