import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import type { AnalyticsSummary } from '../../types/task.types';

// Severity ramp — High reuses the "overdue" rust so attention-worthy items
// read consistently across the whole dashboard, not just this chart.
const PRIORITY_COLORS = { Low: '#B9C2CE', Medium: '#2454A6', High: '#B5482E' };

export function PriorityBarChart({ data }: { data: AnalyticsSummary['priorityBreakdown'] }) {
  const chartData = [
    { name: 'Low', value: data.low },
    { name: 'Medium', value: data.medium },
    { name: 'High', value: data.high },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E4E9" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ fill: '#F5F6F8' }}
          contentStyle={{ border: '1px solid #E2E4E9', borderRadius: 6, boxShadow: 'none', fontSize: 12 }}
          itemStyle={{ color: '#12151C', fontFamily: 'ui-monospace, monospace' }}
          labelStyle={{ color: '#6B7280' }}
        />
        <Bar dataKey="value" radius={[3, 3, 0, 0]}>
          {chartData.map((entry) => (
            <Cell key={entry.name} fill={PRIORITY_COLORS[entry.name as keyof typeof PRIORITY_COLORS]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}