import type { TaskFilters as TaskFiltersType } from '../../hooks/useTasks';

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onChange: (filters: TaskFiltersType) => void;
}

const inputClass =
  'px-3 py-2 rounded-md border border-[#E2E4E9] bg-white text-sm text-[#12151C] placeholder:text-[#6B7280] focus:outline-none focus:border-[#2454A6] transition-colors';

export function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2.5 mb-5">
      <input
        type="text"
        placeholder="Search by title…"
        value={filters.search ?? ''}
        onChange={(e) => onChange({ ...filters, search: e.target.value, page: 1 })}
        className={`${inputClass} flex-1 min-w-[220px]`}
      />
      <select
        value={filters.status ?? ''}
        onChange={(e) => onChange({ ...filters, status: e.target.value || undefined, page: 1 })}
        className={inputClass}
      >
        <option value="">All Statuses</option>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
        value={filters.priority ?? ''}
        onChange={(e) => onChange({ ...filters, priority: e.target.value || undefined, page: 1 })}
        className={inputClass}
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        value={`${filters.sortBy ?? 'created_at'}-${filters.sortOrder ?? 'desc'}`}
        onChange={(e) => {
          const [sortBy, sortOrder] = e.target.value.split('-');
          onChange({ ...filters, sortBy, sortOrder: sortOrder as 'asc' | 'desc' });
        }}
        className={inputClass}
      >
        <option value="created_at-desc">Newest First</option>
        <option value="created_at-asc">Oldest First</option>
        <option value="due_date-asc">Due Date (Soonest)</option>
        <option value="priority-desc">Priority (High First)</option>
      </select>
    </div>
  );
}