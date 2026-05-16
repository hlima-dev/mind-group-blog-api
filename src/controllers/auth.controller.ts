import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AppError } from '../utils/AppError';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new AppError('name, email e password são obrigatórios.');
      }

      if (password.length < 6) {
        throw new AppError('A senha deve ter ao menos 6 caracteres.');
      }

      const user = await authService.register({ name, email, password });
      res.status(201).json({ message: 'Usuário criado com sucesso.', user });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError('email e password são obrigatórios.');
      }

      const result = await authService.login({ email, password });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
