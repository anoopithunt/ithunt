import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * GET /api/courses
 */
router.get('/', async (req, res) => {
  try {
    const list = await dbAdapter.find('courses');
    res.json({ success: true, data: list, courses: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/courses/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const course = await dbAdapter.findById('courses', req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/courses
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const code = body.code || `COURSE-${Date.now()}`;
    const record = {
      ...body,
      id: code,
      code,
      title: body.title || 'Certification Program',
      status: body.status || 'ACTIVE'
    };

    const saved = await dbAdapter.create('courses', record);
    res.status(201).json({ success: true, message: 'Course registered', data: saved });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/courses/:id
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await dbAdapter.update('courses', req.params.id, req.body);
    res.json({ success: true, message: 'Course updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/courses/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    await dbAdapter.delete('courses', req.params.id);
    res.json({ success: true, message: `Course ${req.params.id} deleted successfully.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
