import { Router } from 'express';
import { submitEventRsvp, getAllRsvps } from '../controllers/eventsController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/rsvp', submitEventRsvp);
router.get('/rsvps', authenticate, authorize('admin', 'superadmin'), getAllRsvps);

export default router;
