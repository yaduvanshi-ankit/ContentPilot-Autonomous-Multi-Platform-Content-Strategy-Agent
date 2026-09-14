import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import { api } from './services/api';
import AuthPage from './pages/AuthPage';
import OverviewPage from './pages/OverviewPage';
import DiscoverPage from './pages/DiscoverPage';
import CalendarPage from './pages/CalendarPage';
import ContentPage from './pages/ContentPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DashboardLayout from './layouts/DashboardLayout';
import BriefModal from './components/BriefModal';
import Toast from './components/Toast';

export default function App() {
  const { user, loading, logout } = useAuth(); const [page, setPage] = useState('overview'); const [data, setData] = useState(null); const [modal, setModal] = useState(false); const [latest, setLatest] = useState(null); const [toast, setToast] = useState('');
  const load = async () => { const result = await api.overview(); setData(result); };
  useEffect(() => { if (user) load().catch(error => setToast(error.message)); }, [user]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 3400); return () => clearTimeout(timer); }, [toast]);
  const generate = async brief => { try { const result = await api.generate(brief); setLatest(result.content); setModal(false); setPage('discover'); await load(); setToast('Your AI team has completed a content strategy.'); } catch (error) { setToast(error.message); } };
  const schedule = async (id, scheduledFor) => { try { await api.schedule(id, scheduledFor); await load(); setToast('Content scheduled and ready for approval.'); } catch (error) { setToast(error.message); } };
  if (loading) return <div className="splash"><span>ϟ</span><p>Opening ContentPilot…</p></div>;
  if (!user) return <AuthPage />;
  if (!data) return <div className="splash"><span>✦</span><p>Waking up your AI team…</p></div>;
  const content = data.content;
  const views = { overview: <OverviewPage data={data} onBrief={() => setModal(true)} setPage={setPage} />, discover: <DiscoverPage generated={latest} onBrief={() => setModal(true)} />, calendar: <CalendarPage content={content} onSchedule={schedule} />, content: <ContentPage content={content} latest={latest} onBrief={() => setModal(true)} />, analytics: <AnalyticsPage data={data.analytics} /> };
  return <><DashboardLayout page={page} setPage={setPage} user={user} logout={logout} onBrief={() => setModal(true)}>{views[page]}</DashboardLayout>{modal && <BriefModal onClose={() => setModal(false)} onGenerate={generate} />}<Toast message={toast} /></>;
}
