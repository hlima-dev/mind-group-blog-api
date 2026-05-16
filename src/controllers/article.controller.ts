import { Request, Response, NextFunction } from 'express';
import { ArticleService } from '../services/article.service';
import { AppError } from '../utils/AppError';

const articleService = new ArticleService();

export class ArticleController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, summary, content, category, tags } = req.body;
      const authorId = req.user!.userId;

      if (!title || !summary || !content || !category) {
        throw new AppError('title, summary, content e category são obrigatórios.');
      }

      // Salva apenas o nome do arquivo — a URL pública é montada pelo frontend
      const bannerImage = req.file ? req.file.filename : undefined;

      const parsedTags = tags
        ? (Array.isArray(tags) ? tags : JSON.parse(tags))
        : [];

      const article = await articleService.create({
        title, summary, content, category,
        tags: parsedTags,
        bannerImage,
        authorId,
      });

      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const articles = await articleService.findAll();
      res.json(articles);
    } catch (err) {
      next(err);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const article = await articleService.findById(req.params.id);
      res.json(article);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorId = req.user!.userId;
      const { title, summary, content, category, tags } = req.body;

      // Salva apenas o nome do arquivo — a URL pública é montada pelo frontend
      const bannerImage = req.file ? req.file.filename : undefined;

      const parsedTags = tags
        ? (Array.isArray(tags) ? tags : JSON.parse(tags))
        : undefined;

      const article = await articleService.update(req.params.id, authorId, {
        title, summary, content, category,
        tags: parsedTags,
        bannerImage,
      });

      res.json(article);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorId = req.user!.userId;
      await articleService.delete(req.params.id, authorId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
