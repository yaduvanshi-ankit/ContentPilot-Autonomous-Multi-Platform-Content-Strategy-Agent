import { Router } from 'express';
import { memory } from '../services/store.js';
import { authenticate } from '../middleware/auth.js';
const router = Router(); router.use(authenticate); router.get('/', (req, res) => res.json({ brands: memory.brands })); router.patch('/:id', (req, res) => { const brand = memory.brands.find(item => item.id === req.params.id); if (!brand) return res.status(404).json({ message: 'Brand not found' }); Object.assign(brand, req.body); res.json({ brand }); }); export default router;
