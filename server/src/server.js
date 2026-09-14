import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import brandRoutes from './routes/brandRoutes.js';

const app = express();
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', mode: 'demo-ready' }));
app.use('/api/auth', authRoutes); app.use('/api/content', contentRoutes); app.use('/api/dashboard', dashboardRoutes); app.use('/api/analytics', analyticsRoutes); app.use('/api/brands', brandRoutes);
app.use(errorHandler);

await connectDatabase();
app.listen(env.port, () => console.log(`ContentPilot API listening on http://localhost:${env.port}`));
