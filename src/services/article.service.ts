import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';
import { AppError } from '../utils/AppError';

interface ArticleInput {
  title: string;
  summary: string;
  content: string;
  category: string;
  tags?: string[];
  bannerImage?: string;
  authorId: string;
}

interface ArticleUpdateInput {
  title?: string;
  summary?: string;
  content?: string;
  category?: string;
  tags?: string[];
  bannerImage?: string;
}

export class ArticleService {
  async create(input: ArticleInput) {
    const { title, summary, content, category, tags = [], bannerImage, authorId } = input;
    const id = uuidv4();

    await pool.query(
      `INSERT INTO articles (id, title, summary, content, category, tags, banner_image, author_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, summary, content, category, JSON.stringify(tags), bannerImage || null, authorId]
    );

    return this.findById(id);
  }

  async findAll() {
    const [rows] = await pool.query(
      `SELECT
         a.id, a.title, a.summary, a.content, a.category, a.tags,
         a.banner_image AS bannerImage, a.author_id AS authorId,
         a.created_at AS createdAt, a.updated_at AS updatedAt,
         u.name AS authorName, u.email AS authorEmail
       FROM articles a
       INNER JOIN users u ON u.id = a.author_id
       ORDER BY a.created_at DESC`
    );

    return (rows as any[]).map(this.formatArticle);
  }

  async findById(id: string) {
    const [rows] = await pool.query(
      `SELECT
         a.id, a.title, a.summary, a.content, a.category, a.tags,
         a.banner_image AS bannerImage, a.author_id AS authorId,
         a.created_at AS createdAt, a.updated_at AS updatedAt,
         u.name AS authorName, u.email AS authorEmail
       FROM articles a
       INNER JOIN users u ON u.id = a.author_id
       WHERE a.id = ?`,
      [id]
    );

    const article = (rows as any[])[0];
    if (!article) throw new AppError('Artigo não encontrado.', 404);

    return this.formatArticle(article);
  }

  async update(id: string, authorId: string, input: ArticleUpdateInput) {
    const article = await this.findById(id);

    if (article.authorId !== authorId) {
      throw new AppError('Você não tem permissão para editar este artigo.', 403);
    }

    const fields: string[] = [];
    const values: any[] = [];

    if (input.title !== undefined)       { fields.push('title = ?');        values.push(input.title); }
    if (input.summary !== undefined)     { fields.push('summary = ?');      values.push(input.summary); }
    if (input.content !== undefined)     { fields.push('content = ?');      values.push(input.content); }
    if (input.category !== undefined)    { fields.push('category = ?');     values.push(input.category); }
    if (input.tags !== undefined)        { fields.push('tags = ?');         values.push(JSON.stringify(input.tags)); }
    if (input.bannerImage !== undefined) { fields.push('banner_image = ?'); values.push(input.bannerImage); }

    if (fields.length === 0) throw new AppError('Nenhum campo para atualizar.');

    values.push(id);
    await pool.query(`UPDATE articles SET ${fields.join(', ')} WHERE id = ?`, values);

    return this.findById(id);
  }

  async delete(id: string, authorId: string) {
    const article = await this.findById(id);

    if (article.authorId !== authorId) {
      throw new AppError('Você não tem permissão para excluir este artigo.', 403);
    }

    await pool.query('DELETE FROM articles WHERE id = ?', [id]);
  }

  private formatArticle(row: any) {
    return {
      id: row.id,
      title: row.title,
      summary: row.summary,
      content: row.content,
      category: row.category,
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags,
      bannerImage: row.bannerImage,
      authorId: row.authorId,
      author: { name: row.authorName, email: row.authorEmail },
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
