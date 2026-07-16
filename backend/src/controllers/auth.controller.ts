import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { findUserById } from '../repositories/user.repository';
import { AppError } from '../utils/AppError';

export async function registerHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, name } = req.body;
    const result = await authService.register({ email, password, name });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function loginHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function meHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) throw new AppError('Not authenticated', 401);
    const user = await findUserById(req.user.userId);
    if (!user) throw new AppError('User not found', 404);

    const { password_hash, ...publicUser } = user;
    res.json(publicUser);
  } catch (err) {
    next(err);
  }
}