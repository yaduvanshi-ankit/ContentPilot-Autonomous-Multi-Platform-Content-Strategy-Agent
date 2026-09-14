import { Router } from 'express';
import { generateContent, listContent, scheduleContent, updateContent } from '../controllers/contentController.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();
router.use(authenticate); router.get('/', listContent); router.post('/generate', generateContent); router.patch('/:id', updateContent); router.post('/:id/schedule', scheduleContent);
export default router;
