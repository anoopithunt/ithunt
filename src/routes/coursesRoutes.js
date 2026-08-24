import { Router } from 'express';
import { getCourses, createCourse, getInternships, createInternship } from '../controllers/coursesController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// Courses API
router.get('/', getCourses);
router.post('/', authenticate, authorize('admin', 'superadmin'), createCourse);

// Internships API
router.get('/internships', getInternships);
router.post('/internships', authenticate, authorize('admin', 'superadmin'), createInternship);

export default router;
