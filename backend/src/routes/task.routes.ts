import { Router } from 'express';
import {
  createTaskHandler,
  listTasksHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from '../controllers/task.controller';
import { requireAuth } from '../middleware/auth.middleware';
import {
  validateCreateTask,
  validateUpdateTask,
} from '../middleware/validate.middleware';

const router = Router();

router.use(requireAuth); // every task route below requires a valid JWT

router.get('/', listTasksHandler);
router.post('/', validateCreateTask, createTaskHandler);
router.put('/:id', validateUpdateTask, updateTaskHandler);
router.delete('/:id', deleteTaskHandler);

export default router;