import { Router } from 'express';
import { applyJob, getAllApplications, updateApplicationStatus, deleteApplication } from '../controllers/careersController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// Public submission route
router.post('/apply', applyJob);

// Admin review routes
router.get('/applications', authenticate, authorize('admin', 'superadmin'), getAllApplications);
router.patch('/applications/:id/status', authenticate, authorize('admin', 'superadmin'), updateApplicationStatus);
router.delete('/applications/:id', authenticate, authorize('superadmin'), deleteApplication);

export default router;
