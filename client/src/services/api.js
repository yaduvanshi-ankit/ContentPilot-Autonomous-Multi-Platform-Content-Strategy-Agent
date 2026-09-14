const API = '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('contentpilot_token');
  const response = await fetch(`${API}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

export const api = {
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request('/auth/me'),
  overview: () => request('/dashboard/overview'),
  generate: (payload) => request('/content/generate', { method: 'POST', body: JSON.stringify(payload) }),
  content: () => request('/content'),
  updateContent: (id, payload) => request(`/content/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  schedule: (id, scheduledFor) => request(`/content/${id}/schedule`, { method: 'POST', body: JSON.stringify({ scheduledFor }) }),
  analytics: () => request('/analytics')
};
