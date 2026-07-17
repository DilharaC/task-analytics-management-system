export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
}

export interface AnalyticsSummary {
  statusBreakdown: { todo: number; in_progress: number; completed: number };
  priorityBreakdown: { low: number; medium: number; high: number };
  kpis: { totalActive: number; completedToday: number; overdue: number };
}