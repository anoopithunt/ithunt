import { Router } from 'express';
import { getDashboardStats } from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/stats', authenticate, authorize('admin', 'superadmin'), getDashboardStats);

export default router;
