import { Router } from 'express';
import { submitContactInquiry, getAllContactInquiries } from '../controllers/contactController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/', submitContactInquiry);
router.get('/', authenticate, authorize('admin', 'superadmin'), getAllContactInquiries);

export default router;
