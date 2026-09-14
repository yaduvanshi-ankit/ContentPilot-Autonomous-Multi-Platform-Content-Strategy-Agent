import { memory, newId } from '../services/store.js';
import { runContentPipeline } from '../agents/contentAgents.js';

export function listContent(req, res) { res.json({ content: memory.content }); }

export async function generateContent(req, res) {
  const { brief, goal, platforms } = req.body;
  if (!brief?.trim()) return res.status(400).json({ message: 'Tell the AI team what you want to create.' });
  const brand = memory.brands[0];
  const task = { id: newId('task'), status: 'running', brief, createdAt: new Date().toISOString() };
  memory.tasks.unshift(task);
  const run = await runContentPipeline({ brief, goal, platforms, brand });
  task.status = 'complete'; task.trace = run.trace;
  const content = { id: newId('content'), ...run, brief, platforms: Object.keys(run.outputs), status: 'review', scheduledFor: null, createdAt: new Date().toISOString() };
  memory.content.unshift(content);
  res.status(201).json({ content, task });
}

export function updateContent(req, res) {
  const content = memory.content.find(item => item.id === req.params.id);
  if (!content) return res.status(404).json({ message: 'Content not found' });
  Object.assign(content, req.body, { updatedAt: new Date().toISOString() });
  res.json({ content });
}

export function scheduleContent(req, res) {
  const content = memory.content.find(item => item.id === req.params.id);
  if (!content) return res.status(404).json({ message: 'Content not found' });
  if (!req.body.scheduledFor) return res.status(400).json({ message: 'Choose a publishing date and time.' });
  content.status = 'scheduled'; content.scheduledFor = req.body.scheduledFor;
  res.json({ content });
}
