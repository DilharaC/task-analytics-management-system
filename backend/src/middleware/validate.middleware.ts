import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export function validateRegister(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  if (!email || typeof email !== 'string') {
    return next(new AppError('Email is required', 400));
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    return next(new AppError('Password must be at least 8 characters', 400));
  }
  next();
}

export function validateLogin(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Email and password are required', 400));
  }
  next();
}


export function validateCreateTask(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { title, priority } = req.body;
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return next(new AppError('Title is required', 400));
  }
  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    return next(new AppError('Invalid priority value', 400));
  }
  next();
}

export function validateUpdateTask(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { priority, status } = req.body;
  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    return next(new AppError('Invalid priority value', 400));
  }
  if (status && !['todo', 'in_progress', 'completed'].includes(status)) {
    return next(new AppError('Invalid status value', 400));
  }
  next();
}