import * as taskRepo from '../repositories/task.repository';
import { AppError } from '../utils/AppError';
import { CreateTaskInput, UpdateTaskInput } from '../types/task.types';

export async function createTask(userId: string, input: CreateTaskInput) {
  if (!input.title || input.title.trim().length === 0) {
    throw new AppError('Title is required', 400);
  }
  return taskRepo.createTask(userId, input);
}

export async function listTasks(userId: string) {
  return taskRepo.findTasksByUser(userId);
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