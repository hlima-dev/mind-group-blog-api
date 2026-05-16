import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Erros do Multer
  if (err.message.includes('imagens são permitidas') || err.message.includes('File too large')) {
    res.status(400).json({ error: err.message });
    return;
  }

  console.error('Erro inesperado:', err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
}
