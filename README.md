Calculadora do Milhão

Como rodar o projeto
Backend

Instale as dependências:

`npm install`


Configure o banco de dados no .env:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/calculadora"
JWT_SECRET="sua_chave_secreta"


Suba o banco com Docker:

`docker-compose up -d`


Rode as migrations do Prisma:

`npx prisma migrate dev --name init`


Inicie o servidor backend:

`npx ts-node-dev src/index.ts`


O backend ficará disponível em http://localhost:3333.

Frontend

Entre na pasta Front-End:

`cd Front-End`


Instale as dependências:

`npm install`


Inicie o servidor frontend:

`npm run dev`
