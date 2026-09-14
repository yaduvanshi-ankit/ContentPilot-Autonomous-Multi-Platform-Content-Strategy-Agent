import { Router } from 'express';
import { overview } from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/auth.js';
const router = Router(); router.get('/overview', authenticate, overview); export default router;
