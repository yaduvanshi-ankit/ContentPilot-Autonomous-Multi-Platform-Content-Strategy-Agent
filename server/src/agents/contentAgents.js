const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const tokens = (brief) => brief.toLowerCase().split(/\W+/).filter(Boolean).slice(0, 5);

export async function runContentPipeline({ brief, goal = 'Grow audience', platforms = ['Instagram', 'YouTube', 'LinkedIn'], brand }) {
  const phrase = tokens(brief).join(' ') || 'your niche';
  const trace = [];
  const step = async (agent, action, result) => { trace.push({ agent, action, status: 'running' }); await delay(220); trace[trace.length - 1] = { agent, action, status: 'complete', result }; };

  await step('Trend Scout', `Analyzing social signals for “${phrase}”`, ['#BuildInPublic', '#CreatorEconomy', '#Productivity']);
  const ideas = [
    `The unpopular truth about ${phrase}`,
    `I tried this ${phrase} framework for 7 days`,
    `Stop doing this if you want better ${phrase}`
  ];
  await step('Content Strategist', `Prioritized three ideas for ${goal.toLowerCase()}`, ideas);
  const selected = ideas[0];
  const hook = `Most people get ${phrase} wrong. Here is the simple shift that changes everything.`;
  await step('Script Writer', 'Created an educational short-form narrative', hook);
  const outputs = {};
  if (platforms.includes('Instagram')) outputs.instagram = { caption: `${hook}\n\nSave this before your next content session. The small systems you repeat matter more than the perfect plan.\n\nWhich part are you trying first?`, hashtags: ['#CreatorTips', '#ContentStrategy', '#BuildInPublic', '#Productivity'], format: 'Reel · 30–45 sec' };
  if (platforms.includes('YouTube')) outputs.youtube = { title: `The ${phrase} shift nobody talks about`, script: `${hook}\n\nHere is the three-step framework: start with one visible goal, make the first step frictionless, then review once a week. It is simple — and that is why it works.\n\nSubscribe for practical creator systems.`, format: 'Short · 45 sec' };
  if (platforms.includes('LinkedIn')) outputs.linkedin = { copy: `${hook}\n\nThe creators who compound fastest do not wait for motivation. They design a system that makes their next useful action obvious.\n\nMy rule: before I close my workday, I write tomorrow's first content step. What system has made your work easier?`, format: 'Text post' };
  await step('Platform Optimizer', `Adapted the idea for ${Object.keys(outputs).length} platforms`, Object.keys(outputs));
  return { title: selected, ideas, trendSignals: ['Short form “how I” stories are rising', 'Practical frameworks are outperforming generic motivation', 'Question CTAs improve comments'], outputs, trace };
}
