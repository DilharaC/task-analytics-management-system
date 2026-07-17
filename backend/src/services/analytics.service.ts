import * as taskRepo from '../repositories/task.repository';
import {
  AnalyticsSummary,
  StatusBreakdown,
  PriorityBreakdown,
} from '../types/task.types';

export async function getSummary(userId: string): Promise<AnalyticsSummary> {
  const [
    statusRows,
    priorityRows,
    totalActive,
    completedToday,
    overdue,
  ] = await Promise.all([
    taskRepo.getStatusBreakdown(userId),
    taskRepo.getPriorityBreakdown(userId),
    taskRepo.getTotalActive(userId),
    taskRepo.getCompletedToday(userId),
    taskRepo.getOverdue(userId),
  ]);

  const statusBreakdown: StatusBreakdown = {
    todo: 0,
    in_progress: 0,
    completed: 0,
  };
  for (const row of statusRows) {
    statusBreakdown[row.status as keyof StatusBreakdown] = parseInt(
      row.count,
      10
    );
  }

  const priorityBreakdown: PriorityBreakdown = {
    low: 0,
    medium: 0,
    high: 0,
  };
  for (const row of priorityRows) {
    priorityBreakdown[row.priority as keyof PriorityBreakdown] = parseInt(
      row.count,
      10
    );
  }

  return {
    statusBreakdown,
    priorityBreakdown,
    kpis: {
      totalActive,
      completedToday,
      overdue,
    },
  };
}