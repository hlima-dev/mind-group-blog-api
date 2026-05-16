# Mind Group Blog — API

Backend para sistema de blog construído com Node.js, Express, TypeScript e MySQL.

---

## Pré-requisitos

- Node.js 18+
- MySQL 8+
- npm ou yarn

---

## 1. Instalar dependências

```bash
npm install
```

---

## 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Abra o arquivo `.env` e preencha:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=mind_group_blog

JWT_SECRET=troque_por_um_secret_longo_e_seguro
JWT_EXPIRES_IN=7d

UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```

---

## 3. Criar o banco de dados e as tabelas

Abra seu cliente MySQL (MySQL Workbench, DBeaver, CLI) e execute:

```bash
mysql -u root -p < src/database/schema.sql
```

Ou copie e cole o conteúdo do arquivo `src/database/schema.sql` direto no cliente.

---

## 4. Rodar em desenvolvimento

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000`.

---

## 5. Build para produção

```bash
npm run build
npm start
```

---

## Endpoints

### Auth
| Método | Rota                   | Acesso  | Descrição          |
|--------|------------------------|---------|--------------------|
| POST   | /api/auth/register     | Público | Cadastrar usuário  |
| POST   | /api/auth/login        | Público | Login → retorna JWT |

### Articles
| Método | Rota                   | Acesso  | Descrição                 |
|--------|------------------------|---------|---------------------------|
| GET    | /api/articles          | Público | Listar todos os artigos   |
| GET    | /api/articles/:id      | Público | Buscar artigo por ID      |
| POST   | /api/articles          | Privado | Criar artigo              |
| PUT    | /api/articles/:id      | Privado | Editar artigo (só autor)  |
| DELETE | /api/articles/:id      | Privado | Excluir artigo (só autor) |

### Upload de imagem

Para criar ou editar um artigo com banner, envie a requisição como `multipart/form-data` com o campo `bannerImage`.

### Autenticação

Rotas privadas exigem o header:
```
Authorization: Bearer <seu_token_jwt>
```

---

## Estrutura do projeto

```
src/
  config/         # Database pool e configuração do Multer
  controllers/    # Handlers HTTP (recebem req/res, chamam services)
  middlewares/    # Auth JWT e tratamento de erros
  routes/         # Definição dos endpoints
  services/       # Regras de negócio e acesso ao banco
  database/       # schema.sql
  utils/          # AppError (erros customizados)
  server.ts       # Entry point
```
