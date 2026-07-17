import { pool } from '../db/pool';
import { Task, CreateTaskInput, UpdateTaskInput, TaskQueryOptions } from '../types/task.types';



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



export async function findTasksByUser(
  userId: string,
  option: TaskQueryOptions
): Promise<{ tasks: Task[]; total: number }> {
  const {
    search,
    status,
    priority,
    sortBy = 'created_at',
    sortOrder = 'desc',
    page = 1,
    limit = 10,
  } = option;

  const conditions: string[] = ['user_id = $1'];
  const values: any[] = [userId];
  let paramIndex = 2;

  if (search) {
    conditions.push(`title ILIKE $${paramIndex}`);
    values.push(`%${search}%`);
    paramIndex++;
  }
  if (status) {
    conditions.push(`status = $${paramIndex}`);
    values.push(status);
    paramIndex++;
  }
  if (priority) {
    conditions.push(`priority = $${paramIndex}`);
    values.push(priority);
    paramIndex++;
  }

  const whereClause = conditions.join(' AND ');

  // Whitelist sortBy/sortOrder — never interpolate raw user input into SQL
  const allowedSortColumns = ['created_at', 'due_date', 'priority', 'title'];
  const safeSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'created_at';
  const safeSortOrder = sortOrder === 'asc' ? 'ASC' : 'DESC';

  const offset = (page - 1) * limit;

  const dataQuery = `
    SELECT * FROM tasks
    WHERE ${whereClause}
    ORDER BY ${safeSortBy} ${safeSortOrder}
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `;
  const countQuery = `SELECT COUNT(*) FROM tasks WHERE ${whereClause}`;

  const [dataResult, countResult] = await Promise.all([
    pool.query<Task>(dataQuery, [...values, limit, offset]),
    pool.query(countQuery, values),
  ]);

  return {
    tasks: dataResult.rows,
    total: parseInt(countResult.rows[0].count, 10),
  };
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


export async function getStatusBreakdown(
  userId: string
): Promise<{ status: string; count: string }[]> {
  const result = await pool.query(
    `SELECT status, COUNT(*) as count
     FROM tasks
     WHERE user_id = $1
     GROUP BY status`,
    [userId]
  );
  return result.rows;
}

export async function getPriorityBreakdown(
  userId: string
): Promise<{ priority: string; count: string }[]> {
  const result = await pool.query(
    `SELECT priority, COUNT(*) as count
     FROM tasks
     WHERE user_id = $1
     GROUP BY priority`,
    [userId]
  );
  return result.rows;
}

export async function getTotalActive(userId: string): Promise<number> {
  const result = await pool.query(
    `SELECT COUNT(*) as count FROM tasks
     WHERE user_id = $1 AND status != 'completed'`,
    [userId]
  );
  return parseInt(result.rows[0].count, 10);
}

export async function getCompletedToday(userId: string): Promise<number> {
  const result = await pool.query(
    `SELECT COUNT(*) as count FROM tasks
     WHERE user_id = $1
       AND status = 'completed'
       AND completed_at::date = CURRENT_DATE`,
    [userId]
  );
  return parseInt(result.rows[0].count, 10);
}

export async function getOverdue(userId: string): Promise<number> {
  const result = await pool.query(
    `SELECT COUNT(*) as count FROM tasks
     WHERE user_id = $1
       AND status != 'completed'
       AND due_date IS NOT NULL
       AND due_date < CURRENT_DATE`,
    [userId]
  );
  return parseInt(result.rows[0].count, 10);
}