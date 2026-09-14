import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  try { req.user = jwt.verify(token, env.jwtSecret); next(); }
  catch { return res.status(401).json({ message: 'Your session has expired. Please sign in again.' }); }
}
