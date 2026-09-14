import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { memory, newId } from '../services/store.js';
import { env } from '../config/env.js';

const makeToken = (user) => jwt.sign({ id: user.id, email: user.email, name: user.name }, env.jwtSecret, { expiresIn: '7d' });
const publicUser = (user) => ({ id: user.id, name: user.name, email: user.email, plan: user.plan });

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) return res.status(400).json({ message: 'Name, email, and a 6+ character password are required.' });
  if (memory.users.some(user => user.email === email.toLowerCase())) return res.status(409).json({ message: 'An account already exists for that email.' });
  const user = { id: newId('user'), name: name.trim(), email: email.toLowerCase(), passwordHash: await bcrypt.hash(password, 10), plan: 'Creator' };
  memory.users.push(user);
  res.status(201).json({ token: makeToken(user), user: publicUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = memory.users.find(item => item.email === email?.toLowerCase());
  if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) return res.status(401).json({ message: 'Incorrect email or password.' });
  res.json({ token: makeToken(user), user: publicUser(user) });
}

export function me(req, res) {
  const user = memory.users.find(item => item.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user: publicUser(user) });
}
