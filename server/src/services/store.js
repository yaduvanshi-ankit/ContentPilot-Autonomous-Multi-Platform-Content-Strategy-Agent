import bcrypt from 'bcryptjs';

const hash = await bcrypt.hash('contentpilot', 10);
export const memory = {
  users: [{ id: 'demo-user', name: 'Arjun Yadav', email: 'demo@contentpilot.ai', passwordHash: hash, plan: 'Creator' }],
  brands: [{ id: 'brand-1', name: 'Creator Lab', industry: 'Education', audience: 'Indian student creators and early career developers', voice: 'Warm, clear, evidence-led', pillars: ['Study systems', 'Career growth', 'Creator habits'], platforms: ['Instagram', 'YouTube', 'LinkedIn'] }],
  content: [
    { id: 'post-1', title: 'The simple habit that changed my creative flow', platforms: ['Instagram', 'YouTube'], status: 'scheduled', scheduledFor: '2026-09-16T18:30:00.000Z', outputs: {} },
    { id: 'post-2', title: '3 frameworks for learning faster', platforms: ['LinkedIn'], status: 'review', scheduledFor: null, outputs: {} },
    { id: 'post-3', title: 'Your study system is backwards', platforms: ['Instagram'], status: 'draft', scheduledFor: null, outputs: {} }
  ],
  tasks: []
};

export const newId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
