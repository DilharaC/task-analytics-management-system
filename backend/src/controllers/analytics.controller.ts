import { Request, Response, NextFunction } from 'express';
import * as analyticsService from '../services/analytics.service';
import { AppError } from '../utils/AppError';

export async function getSummaryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) throw new AppError('Not authenticated', 401);
    const summary = await analyticsService.getSummary(req.user.userId);
    res.json(summary);
  } catch (err) {
    next(err);
  }
}