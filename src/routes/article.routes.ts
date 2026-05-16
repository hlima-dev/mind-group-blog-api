import { Router } from 'express';
import { ArticleController } from '../controllers/article.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import upload from '../config/multer';

const router = Router();
const articleController = new ArticleController();

// Rotas públicas
router.get('/',    (req, res, next) => articleController.findAll(req, res, next));
router.get('/:id', (req, res, next) => articleController.findById(req, res, next));

// Rotas privadas (requerem JWT)
router.post(
  '/',
  authMiddleware,
  upload.single('bannerImage'),
  (req, res, next) => articleController.create(req, res, next)
);

router.put(
  '/:id',
  authMiddleware,
  upload.single('bannerImage'),
  (req, res, next) => articleController.update(req, res, next)
);

router.delete(
  '/:id',
  authMiddleware,
  (req, res, next) => articleController.delete(req, res, next)
);

export default router;
