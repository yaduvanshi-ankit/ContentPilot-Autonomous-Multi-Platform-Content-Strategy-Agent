import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { if (!localStorage.getItem('contentpilot_token')) return setLoading(false); api.me().then(({ user }) => setUser(user)).catch(() => localStorage.removeItem('contentpilot_token')).finally(() => setLoading(false)); }, []);
  const authenticate = async (mode, data) => { const result = mode === 'login' ? await api.login(data) : await api.register(data); localStorage.setItem('contentpilot_token', result.token); setUser(result.user); };
  const logout = () => { localStorage.removeItem('contentpilot_token'); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, authenticate, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
