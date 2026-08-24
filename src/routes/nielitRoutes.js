import { Router } from 'express';
import { submitNielitProject, getAllNielitProjects, updateNielitProjectStatus } from '../controllers/nielitController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/', submitNielitProject);
router.get('/', getAllNielitProjects);
router.patch('/:id/status', authenticate, authorize('admin', 'superadmin'), updateNielitProjectStatus);

export default router;
