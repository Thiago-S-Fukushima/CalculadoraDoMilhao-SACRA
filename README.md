Calculadora do Milhão

Aplicação Full Stack para simulação de investimentos de longo prazo, com autenticação de usuários, registro de simulações e resultados detalhados.

Tecnologias

Backend:

Node.js

TypeScript

Express

Prisma ORM

PostgreSQL

JWT (autenticação)

Bcrypt (hash de senha)

Frontend:

Next.js

React

TypeScript

CSS puro (tema escuro com detalhes verdes)

DevOps / Utilitários:

Docker (PostgreSQL)

REST Client (arquivo request.http para testes)

Estrutura do Projeto
C:.
|   .env
|   .gitignore
|   docker-compose.yml
|   package-lock.json
|   package.json
|   README.md
|   request.http
|   tsconfig.json
|   
+---.next
+---Front-End
|   |   package.json
|   |   tsconfig.json
|   |   next-env.d.ts
|   
+---prisma
|   |   schema.prisma
|   \---migrations
|       +---20250930005916_init
|       |       migration.sql
|       \---20251001232615_add_simulation
|               migration.sql
|               
\---src
    |   index.ts
    +---controllers
    |       authController.ts
    |       simulationController.ts
    +---middlewares
    |       authMiddleware.ts
    +---prisma
    |       index.ts
    \---routes
            authRoutes.ts
            simulationRoutes.ts

Como rodar o projeto
Backend

Instale as dependências:

npm install


Configure o banco de dados no .env:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/calculadora"
JWT_SECRET="sua_chave_secreta"


Suba o banco com Docker:

docker-compose up -d


Rode as migrations do Prisma:

npx prisma migrate dev --name init


Inicie o servidor backend:

npx ts-node-dev src/index.ts


O backend ficará disponível em http://localhost:3333.

Frontend

Entre na pasta Front-End:

cd Front-End


Instale as dependências:

npm install


Inicie o servidor frontend:

npm run dev


O frontend ficará disponível em http://localhost:3000.

Rotas principais do backend

POST /auth/signup — Cadastro de usuário

POST /auth/login — Login de usuário (retorna JWT)

POST /simulation — Cria nova simulação (requer token)

GET /simulation — Lista histórico de simulações do usuário (requer token)

Exemplo de requisição para cadastro (request.http ou Postman):

POST http://localhost:3333/auth/signup
Content-Type: application/json

{
  "email": "usuario@teste.com",
  "password": "senha123"
}

Frontend

O frontend possui três telas principais:

Login — Autenticação do usuário

Cadastro — Registro de novo usuário

Dashboard — Criação de novas simulações e visualização de histórico

Tema e Estilo

Tema escuro com detalhes verdes

Layout centralizado

Inputs e botões estilizados para melhor experiência