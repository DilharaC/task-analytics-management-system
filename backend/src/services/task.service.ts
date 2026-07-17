import * as taskRepo from '../repositories/task.repository';
import { AppError } from '../utils/AppError';
import { CreateTaskInput, TaskQueryOptions, UpdateTaskInput } from '../types/task.types';

export async function createTask(userId: string, input: CreateTaskInput) {
  if (!input.title || input.title.trim().length === 0) {
    throw new AppError('Title is required', 400);
  }
  return taskRepo.createTask(userId, input);
}


export async function listTasks(userId: string, query: any) {
  const options: TaskQueryOptions = {
    search: query.search,
    status: query.status,
    priority: query.priority,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
    page: query.page ? parseInt(query.page, 10) : 1,
    limit: query.limit ? parseInt(query.limit, 10) : 10,
  };
  return taskRepo.findTasksByUser(userId, options);
}

export async function updateTask(
  userId: string,
  taskId: string,
  input: UpdateTaskInput
) {
  const task = await taskRepo.updateTask(taskId, userId, input);
  if (!task) {
    throw new AppError('Task not found', 404);
  }
  return task;
}

export async function deleteTask(userId: string, taskId: string) {
  const deleted = await taskRepo.deleteTask(taskId, userId);
  if (!deleted) {
    throw new AppError('Task not found', 404);
  }
}