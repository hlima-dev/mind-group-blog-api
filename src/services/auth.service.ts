import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';
import { AppError } from '../utils/AppError';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export class AuthService {
  async register(input: RegisterInput) {
    const { name, email, password } = input;

    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if ((rows as []).length > 0) {
      throw new AppError('E-mail já cadastrado.', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    await pool.query(
      'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
      [id, name, email, hashedPassword]
    );

    return { id, name, email };
  }

  async login(input: LoginInput) {
    const { email, password } = input;

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = (rows as any[])[0];

    if (!user) {
      throw new AppError('Credenciais inválidas.', 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Credenciais inválidas.', 401);
    }

    const secret = process.env.JWT_SECRET as string;
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn } as jwt.SignOptions
    );

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
