import { Router } from 'express';
import { getAnalytics } from '../services/analyticsService.js';
import { authenticate } from '../middleware/auth.js';
const router = Router(); router.get('/', authenticate, (req, res) => res.json(getAnalytics())); router.get('/insights', authenticate, (req, res) => res.json({ insights: [getAnalytics().insight] })); export default router;
