import type { Task } from '../../types/task.types';

const STATUS_META: Record<string, { label: string; color: string }> = {
  todo: { label: 'To Do', color: '#6B7280' },
  in_progress: { label: 'In Progress', color: '#2454A6' },
  completed: { label: 'Completed', color: '#1B7F5C' },
};

const PRIORITY_COLORS: Record<string, string> = {
  low: '#6B7280',
  medium: '#2454A6',
  high: '#B5482E',
};

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: string) => void;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const isOverdue =
    task.due_date && task.status !== 'completed' && new Date(task.due_date) < new Date(new Date().toDateString());

  const statusColor = STATUS_META[task.status]?.color ?? '#6B7280';
  const priorityColor = PRIORITY_COLORS[task.priority] ?? '#6B7280';

  return (
    <div className="relative bg-white rounded-md border border-[#E2E4E9] p-5 pl-6 flex flex-col gap-3">
      <span className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-md" style={{ backgroundColor: statusColor }} />

      <div className="flex justify-between items-start gap-3">
        <h3 className="font-semibold text-[#12151C] leading-snug">{task.title}</h3>
        <span
          className="inline-flex items-center gap-1.5 shrink-0 text-[10px] font-mono font-semibold uppercase tracking-[0.1em]"
          style={{ color: priorityColor }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: priorityColor }} />
          {task.priority}
        </span>
      </div>

      {task.description && <p className="text-sm text-[#6B7280] leading-relaxed">{task.description}</p>}

      <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="text-[11px] font-mono font-medium uppercase tracking-[0.08em] px-2 py-1.5 rounded-md border border-[#E2E4E9] bg-white focus:outline-none focus:border-[#2454A6] cursor-pointer"
          style={{ color: statusColor }}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {task.due_date && (
          <span
            className="text-xs font-mono tabular-nums"
            style={{ color: isOverdue ? '#B5482E' : '#6B7280', fontWeight: isOverdue ? 600 : 400 }}
          >
            Due {new Date(task.due_date).toLocaleDateString()}
            {isOverdue && ' · Overdue'}
          </span>
        )}
      </div>

      <div className="flex gap-2 pt-2 border-t border-[#E2E4E9] mt-1">
        <button
          onClick={onEdit}
          className="text-xs font-medium text-[#12151C] px-3 py-1.5 rounded-md border border-[#E2E4E9] hover:bg-[#F5F6F8] transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-xs font-medium text-[#B5482E] px-3 py-1.5 rounded-md border border-[#E2E4E9] hover:bg-[#B5482E]/5 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}