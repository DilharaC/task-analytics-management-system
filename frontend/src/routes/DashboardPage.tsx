import { Link } from 'react-router-dom';
import {
  ListChecks,
  CheckCircle2,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { StatusPieChart } from '../components/dashboard/StatusPieChart';
import { PriorityBarChart } from '../components/dashboard/PriorityBarChart';
import { useAnalytics } from '../hooks/useAnalytics';
import { useAuth } from '../context/AuthContext';


export function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { data, loading } = useAnalytics();

  const now = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  // Logged-out visitor: show the dashboard shell with a login prompt, no data
if (!authLoading && !user) {
  return (
    <>
      <Header title="Welcome to Zentryx" subtitle="Log in to see your task analytics" />
      <main className="relative p-8 bg-[#F9FAFB] h-full overflow-y-auto">
        {/* Faint grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(#E2E4E9 1px, transparent 1px), linear-gradient(90deg, #E2E4E9 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Blurred preview content */}
        <div className="relative flex flex-col gap-5 pointer-events-none select-none blur-[3px] opacity-60">
          <div className="rounded-md border border-[#E2E4E9] bg-white overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E4E9]">
              {[
                { label: 'Active Tasks', accent: '#2454A6' },
                { label: 'Completed Today', accent: '#1B7F5C' },
                { label: 'Overdue', accent: '#B5482E' },
              ].map(({ label, accent }) => (
                <div key={label} className="relative p-6 pl-7">
                  <span className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: accent }} />
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#6B7280] mb-3">{label}</p>
                  <p className="font-mono text-4xl font-semibold text-[#12151C]">--</p>
                  <p className="text-sm text-[#6B7280] mt-2.5">Log in to view</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-md border border-[#E2E4E9] bg-white p-6 h-72" />
            <div className="rounded-md border border-[#E2E4E9] bg-white p-6 h-72" />
          </div>
        </div>

        {/* Centered login card, overlaid on top */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="rounded-lg border border-[#E2E4E9] bg-white shadow-lg p-10 sm:p-12 max-w-[460px] w-full text-center flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-[#2454A6]/10 flex items-center justify-center">
              <Lock size={26} className="text-[#2454A6]" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#12151C]">Welcome to Zentryx Task Manager</p>
              <p className="text-sm text-[#6B7280] mt-3 leading-relaxed">
                Manage your daily tasks, monitor productivity, and visualize progress through
                interactive analytics. Sign in to continue.
              </p>
            </div>
            <div className="flex gap-3 w-full mt-1">
              <Link
                to="/login"
                className="flex-1 px-4 py-2.5 rounded-md bg-[#2454A6] text-white text-sm font-medium hover:bg-[#1e4685] transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="flex-1 px-4 py-2.5 rounded-md border border-[#E2E4E9] text-[#12151C] text-sm font-medium hover:bg-[#F5F6F8] transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

  const kpis = data
    ? [
        {
          label: 'Active Tasks',
          value: data.kpis.totalActive,
          subtitle: 'In progress or to do',
          icon: ListChecks,
          accent: '#2454A6',
        },
        {
          label: 'Completed Today',
          value: data.kpis.completedToday,
          subtitle: 'Finished in the last 24 hours',
          icon: CheckCircle2,
          accent: '#1B7F5C',
        },
        {
          label: 'Overdue',
          value: data.kpis.overdue,
          subtitle: 'Past their due date',
          icon: AlertTriangle,
          accent: '#B5482E',
        },
      ]
    : [];

  return (
    <>
      <Header title={`Hello, ${user?.name || 'there'}!`} subtitle="Here's where things stand across your active work." />

      <main className="p-8 flex flex-col gap-5 bg-[#F5F6F8] h-full overflow-y-auto">
        <div className="flex items-center justify-between text-sm">
          <p className="text-[#6B7280]">
            <span className="font-mono tabular-nums text-[#12151C]">{now}</span>
            <span className="mx-1.5">·</span>
            data refreshed moments ago
          </p>
          <div className="flex items-center gap-2.5">
            <span className="text-[#6B7280]">{user?.name ?? 'Guest'}</span>
            <div className="w-8 h-8 rounded-md border border-[#E2E4E9] bg-white flex items-center justify-center font-mono text-xs font-semibold text-[#12151C]">
              {user?.name?.[0]?.toUpperCase() ?? 'U'}
            </div>
          </div>
        </div>

        {loading || !data ? (
          <div className="rounded-md border border-[#E2E4E9] bg-white p-20 flex flex-col items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2454A6] animate-pulse" />
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#6B7280]">Loading data…</p>
          </div>
        ) : (
          <>
            <div className="rounded-md border border-[#E2E4E9] bg-white overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E4E9]">
                {kpis.map(({ label, value, subtitle, icon: Icon, accent }) => (
                  <div key={label} className="relative p-6 pl-7">
                    <span className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: accent }} />
                    <div className="flex items-center gap-1.5 mb-3">
                      <Icon size={13} style={{ color: accent }} />
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#6B7280]">{label}</p>
                    </div>
                    <p className="font-mono text-4xl font-semibold text-[#12151C] tabular-nums leading-none">{value}</p>
                    <p className="text-sm text-[#6B7280] mt-2.5">{subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-md border border-[#E2E4E9] bg-white p-6">
                <div className="border-b border-[#E2E4E9] pb-3 mb-5">
                  <p className="text-sm font-semibold text-[#12151C]">Task Status</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">Breakdown by current status</p>
                </div>
                <StatusPieChart data={data.statusBreakdown} />
              </div>
              <div className="rounded-md border border-[#E2E4E9] bg-white p-6">
                <div className="border-b border-[#E2E4E9] pb-3 mb-5">
                  <p className="text-sm font-semibold text-[#12151C]">Priority Breakdown</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">Tasks by priority level</p>
                </div>
                <PriorityBarChart data={data.priorityBreakdown} />
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}