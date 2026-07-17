export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  due_date: string | null; // ISO date string
  priority: TaskPriority;
  status: TaskStatus;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  due_date?: string;
  priority?: TaskPriority;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  due_date?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}


export interface StatusBreakdown {
  todo: number;
  in_progress: number;
  completed: number;
}

export interface PriorityBreakdown {
  low: number;
  medium: number;
  high: number;
}

export interface AnalyticsSummary {
  statusBreakdown: StatusBreakdown;
  priorityBreakdown: PriorityBreakdown;
  kpis: {
    totalActive: number;
    completedToday: number;
    overdue: number;
  };
}


export interface TaskQueryOptions {
  search?: string;
  status?: string;
  priority?: string;
  sortBy?: 'created_at' | 'due_date' | 'priority' | 'title';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}