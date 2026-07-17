import { pool } from '../db/pool';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task.types';

export async function createTask(
  userId: string,
  input: CreateTaskInput
): Promise<Task> {
  const result = await pool.query<Task>(
    `INSERT INTO tasks (user_id, title, description, due_date, priority)
     VALUES ($1, $2, $3, $4, COALESCE($5::task_priority, 'medium'::task_priority))
     RETURNING *`,
    [
      userId,
      input.title,
      input.description ?? null,
      input.due_date ?? null,
      input.priority ?? null,
    ]
  );

  return result.rows[0];
}

export async function findTasksByUser(userId: string): Promise<Task[]> {
  const result = await pool.query<Task>(
    'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

export async function findTaskById(
  taskId: string,
  userId: string
): Promise<Task | null> {
  const result = await pool.query<Task>(
    'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
    [taskId, userId]
  );
  return result.rows[0] ?? null;
}

export async function updateTask(
  taskId: string,
  userId: string,
  input: UpdateTaskInput
): Promise<Task | null> {
  // completed_at auto-managed: set when moving to 'completed', cleared otherwise
  const completedAtExpr =
    input.status === 'completed'
      ? 'NOW()'
      : input.status
      ? 'NULL'
      : 'completed_at';

  const result = await pool.query<Task>(
    `UPDATE tasks SET
       title = COALESCE($1, title),
       description = COALESCE($2, description),
       due_date = COALESCE($3, due_date),
       priority = COALESCE($4::task_priority, priority),
       status = COALESCE($5, status),
       completed_at = ${completedAtExpr},
       updated_at = NOW()
     WHERE id = $6 AND user_id = $7
     RETURNING *`,
    [
      input.title ?? null,
      input.description ?? null,
      input.due_date ?? null,
      input.priority ?? null,
      input.status ?? null,
      taskId,
      userId,
    ]
  );
  return result.rows[0] ?? null;
}

export async function deleteTask(
  taskId: string,
  userId: string
): Promise<boolean> {
  const result = await pool.query(
    'DELETE FROM tasks WHERE id = $1 AND user_id = $2',
    [taskId, userId]
  );
  return (result.rowCount ?? 0) > 0;
}