# Mind Group Blog — API

Backend da plataforma FULLSTACK Mind Group Blog desenvolvido com Node.js, Express, TypeScript e MySQL.

---

# Demonstração Online

## Backend API
https://mind-group-blog-api.onrender.com

---

# Arquitetura do Projeto

A API foi desenvolvida utilizando arquitetura REST moderna com integração cloud.

Infraestrutura utilizada:

- Backend hospedado no Render
- Banco de dados MySQL hospedado no Aiven
- Upload permanente de imagens via Cloudinary
- Versionamento utilizando GitHub

---

# Tecnologias Utilizadas

## Backend
- Node.js
- Express
- TypeScript
- MySQL2
- JWT
- Multer
- Cloudinary
- dotenv

## Infraestrutura
- Render
- Aiven MySQL
- Cloudinary
- GitHub

---

# Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- CRUD completo de artigos
- Upload de banners/imagens
- Persistência de sessão
- API REST
- Proteção de rotas privadas
- Integração com banco MySQL cloud
- Upload permanente em nuvem

---

# Estrutura do Projeto

```txt
src/
 ├── config/         # Configurações do banco, multer e cloudinary
 ├── controllers/    # Controladores HTTP
 ├── middlewares/    # Middlewares de autenticação e erros
 ├── routes/         # Rotas da API
 ├── services/       # Regras de negócio
 ├── database/       # Schema SQL
 ├── utils/          # Utilitários e AppError
 └── server.ts       # Entry point
```

---

# Variáveis de Ambiente

Crie um arquivo `.env`:

```env
PORT=3000
NODE_ENV=development

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
JWT_EXPIRES_IN=7d

MAX_FILE_SIZE=5242880

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# Banco de Dados

O projeto utiliza MySQL hospedado no Aiven com SSL habilitado.

## Executar schema SQL

```bash
mysql -u root -p < src/database/schema.sql
```

Ou execute diretamente o conteúdo do arquivo:

```txt
src/database/schema.sql
```

---

# Instalação

## Clonar projeto

```bash
git clone https://github.com/hlima-dev/mind-group-blog-api.git
```

## Entrar na pasta

```bash
cd mind-group-blog-api
```

## Instalar dependências

```bash
npm install
```

---

# Rodando Localmente

## Desenvolvimento

```bash
npm run dev
```

Servidor:

```txt
http://localhost:3000
```

---

# Build de Produção

```bash
npm run build
npm start
```

---

# Endpoints

## Auth

| Método | Rota                | Descrição |
|--------|---------------------|-----------|
| POST | /api/auth/register | Cadastro |
| POST | /api/auth/login | Login JWT |

---

## Articles

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/articles | Listar artigos |
| GET | /api/articles/:id | Buscar artigo |
| POST | /api/articles | Criar artigo |
| PUT | /api/articles/:id | Atualizar artigo |
| DELETE | /api/articles/:id | Excluir artigo |

---

# Autenticação JWT

Rotas privadas exigem:

```txt
Authorization: Bearer <token>
```

---

# Upload de Imagens

O sistema utiliza Cloudinary para armazenamento permanente de imagens.

As imagens são enviadas via:

```txt
multipart/form-data
```

Campo esperado:

```txt
bannerImage
```

---

# Deploy

## Backend — Render

Deploy automático conectado ao GitHub.

## Banco — Aiven

MySQL cloud com SSL habilitado.

## Upload — Cloudinary

Armazenamento permanente das imagens dos artigos.

---

# Diferenciais Técnicos

- API REST estruturada
- Arquitetura FULLSTACK
- JWT Authentication
- Upload em nuvem
- Banco cloud
- Integração Cloudinary
- Deploy profissional
- Tratamento de erros
- TypeScript
- Persistência de sessão
- Integração frontend/backend

---

# Links Oficiais

## Backend Online
https://mind-group-blog-api.onrender.com

## GitHub
https://github.com/hlima-dev/mind-group-blog-api

---

# Autor

Lucas Lima Santos

GitHub:
https://github.com/hlima-dev