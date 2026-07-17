import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { AnalyticsSummary } from '../../types/task.types';

// Matches the dashboard's status palette: muted slate / steel blue / forest green
const COLORS = { todo: '#B9C2CE', in_progress: '#2454A6', completed: '#1B7F5C' };

export function StatusPieChart({ data }: { data: AnalyticsSummary['statusBreakdown'] }) {
  const chartData = [
    { name: 'To Do', value: data.todo, color: COLORS.todo },
    { name: 'In Progress', value: data.in_progress, color: COLORS.in_progress },
    { name: 'Completed', value: data.completed, color: COLORS.completed },
  ];
  const total = data.todo + data.in_progress + data.completed;

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="font-semibold text-[#12151C]">No tasks yet</p>
        <p className="text-sm text-[#6B7280] mt-1">Create a task to see status breakdown.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}>
          {chartData.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            border: '1px solid #E2E4E9',
            borderRadius: 6,
            boxShadow: 'none',
            fontSize: 12,
          }}
          itemStyle={{ color: '#12151C', fontFamily: 'ui-monospace, monospace' }}
          labelStyle={{ color: '#6B7280' }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, color: '#6B7280' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}