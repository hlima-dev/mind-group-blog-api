import { Router } from 'express';
import authRoutes    from './auth.routes';
import articleRoutes from './article.routes';

const router = Router();

router.use('/auth',     authRoutes);
router.use('/articles', articleRoutes);

export default router;
