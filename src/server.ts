import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';

import routes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { testConnection } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imagens de upload como arquivos estáticos
app.use('/uploads', express.static(path.resolve(process.env.UPLOAD_DIR || 'uploads')));

// Rotas da API
app.use('/api', routes);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Middleware de erros (deve vir por último)
app.use(errorMiddleware);

(async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
})();
