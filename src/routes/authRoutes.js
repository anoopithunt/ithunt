import { Router } from 'express';
import { register, login, getCurrentUser, getAllUsers } from '../controllers/authController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getCurrentUser);
router.get('/users', authenticate, authorize('admin', 'superadmin'), getAllUsers);

export default router;
