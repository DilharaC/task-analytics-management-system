import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/task.service';
import { AppError } from '../utils/AppError';
import { ParamsDictionary } from 'express-serve-static-core';

interface TaskParams extends ParamsDictionary {
  id: string;
}

export async function createTaskHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) throw new AppError('Not authenticated', 401);
    const task = await taskService.createTask(req.user.userId, req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

export async function listTasksHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) throw new AppError('Not authenticated', 401);
    const tasks = await taskService.listTasks(req.user.userId);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function updateTaskHandler(
  req: Request<TaskParams>,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) throw new AppError('Not authenticated', 401);
    const task = await taskService.updateTask(
  req.user.userId,
  req.params.id,
  req.body
); 
    res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function deleteTaskHandler(
  req: Request<TaskParams>,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) throw new AppError('Not authenticated', 401);
   await taskService.deleteTask(
  req.user.userId,
  req.params.id
);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}