import { memory } from '../services/store.js';
import { getAnalytics } from '../services/analyticsService.js';

export function overview(req, res) {
  const analytics = getAnalytics();
  res.json({
    brand: memory.brands[0],
    stats: [
      { label: 'CONTENT IN PIPELINE', value: '12', change: '+4 this week', tone: 'purple', icon: '✦' },
      { label: 'TRENDS TRACKED', value: '28', change: '+8 new', tone: 'orange', icon: '◉' },
      { label: 'AVERAGE ENGAGEMENT', value: '8.4%', change: '↑ 1.2%', tone: 'green', icon: '↗' }
    ],
    upcoming: memory.content.filter(item => item.status === 'scheduled'),
    content: memory.content,
    agents: [
      { name: 'Trend Scout', detail: 'Scanning your niche', state: '12 found', icon: '◉', tone: 'purple' },
      { name: 'Content Strategist', detail: 'Planning this week', state: 'Ready', icon: '✦', tone: 'pink' },
      { name: 'Platform Optimizer', detail: 'Adapting 4 posts', state: '4 tasks', icon: '↗', tone: 'blue' }
    ],
    analytics
  });
}
