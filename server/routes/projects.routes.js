import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * GET /api/projects
 */
router.get('/', async (req, res) => {
  try {
    const list = await dbAdapter.find('projects');
    res.json({ success: true, data: list, projects: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/projects/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const item = await dbAdapter.findById('projects', req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/projects or POST /api/projects/submit
 */
const submitProjectHandler = async (req, res) => {
  try {
    const body = req.body || {};
    const id = `PRJ-${Date.now()}`;

    const record = {
      ...body,
      id,
      title: body.title || body.projectTitle || 'Capstone Project',
      projectTitle: body.title || body.projectTitle || 'Capstone Project',
      studentName: body.authorName || body.studentName || 'Student Developer',
      techStack: Array.isArray(body.techStack) ? body.techStack.join(', ') : (body.techStack || 'React, Node.js, MongoDB'),
      status: 'Completed & Approved',
      submittedAt: new Date().toLocaleDateString('en-GB'),
      createdAt: new Date().toISOString()
    };

    const saved = await dbAdapter.create('projects', record);
    res.status(201).json({
      success: true,
      message: 'Project submitted successfully',
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

router.post('/submit', submitProjectHandler);
router.post('/', submitProjectHandler);

/**
 * PUT /api/projects/:id
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await dbAdapter.update('projects', req.params.id, req.body);
    res.json({ success: true, data: updated, message: 'Project updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/projects/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    await dbAdapter.delete('projects', req.params.id);
    res.json({ success: true, message: `Project ${req.params.id} deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
