import { Router } from 'express';
import {
  submitReview,
  getPublicReviews,
  getAdminReviews,
  toggleApproveReview,
  deleteReview
} from '../controllers/reviewsController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// Public routes
router.post('/', submitReview);
router.get('/', getPublicReviews);

// Admin moderation routes
router.get('/admin', authenticate, authorize('admin', 'superadmin'), getAdminReviews);
router.patch('/admin/:id/approve', authenticate, authorize('admin', 'superadmin'), toggleApproveReview);
router.delete('/admin/:id', authenticate, authorize('admin', 'superadmin'), deleteReview);

export default router;
