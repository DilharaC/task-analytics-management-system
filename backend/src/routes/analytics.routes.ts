import { Router } from 'express';
import { getSummaryHandler } from '../controllers/analytics.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.get('/summary', requireAuth, getSummaryHandler);

export default router;