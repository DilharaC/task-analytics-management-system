import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import type { Task, TaskListResponse } from '../types/task.types';

export interface TaskFilters {
  search?: string;
  status?: string;
  priority?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export function useTasks(filters: TaskFilters, enabled: boolean = true) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get<TaskListResponse>('/tasks', { params: filters });
      setTasks(res.data.tasks);
      setTotal(res.data.total);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    fetchTasks();
  }, [fetchTasks, enabled]);

  async function createTask(input: Partial<Task>) {
    await api.post('/tasks', input);
    await fetchTasks();
  }

  async function updateTask(id: string, input: Partial<Task>) {
    await api.put(`/tasks/${id}`, input);
    await fetchTasks();
  }

  async function deleteTask(id: string) {
    await api.delete(`/tasks/${id}`);
    await fetchTasks();
  }

  return { tasks, total, loading, error, createTask, updateTask, deleteTask, refetch: fetchTasks };
}