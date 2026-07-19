import {
  ListChecks,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { StatusPieChart } from '../components/dashboard/StatusPieChart';
import { PriorityBarChart } from '../components/dashboard/PriorityBarChart';
import { useAnalytics } from '../hooks/useAnalytics';
import { useAuth } from '../context/AuthContext';

export function DashboardPage() {
  const { user } = useAuth();
  const { data, loading } = useAnalytics();

  const now = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

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