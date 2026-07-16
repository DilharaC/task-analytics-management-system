import { Router } from 'express';
import {
  registerHandler,
  loginHandler,
  meHandler,
} from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { validateRegister, validateLogin } from '../middleware/validate.middleware';

const router = Router();

router.post('/register', validateRegister, registerHandler);
router.post('/login', validateLogin, loginHandler);
router.get('/me', requireAuth, meHandler);

export default router;