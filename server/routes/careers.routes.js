import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * GET /api/careers/applications
 */
router.get('/applications', async (req, res) => {
  try {
    const list = await dbAdapter.find('job_applications');
    res.json({ success: true, data: list, applications: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/careers/apply
 */
router.post('/apply', async (req, res) => {
  try {
    const body = req.body || {};
    const id = `JOB-${Date.now()}`;
    const name = body.name || body.fullName || 'Applicant';

    const record = {
      ...body,
      id,
      name,
      fullName: name,
      position: body.position || body.role || body.jobTitle || 'Faculty Instructor',
      role: body.position || body.role || body.jobTitle || 'Faculty Instructor',
      status: 'Pending Review',
      date: new Date().toLocaleDateString('en-GB'),
      createdAt: new Date().toISOString()
    };

    const saved = await dbAdapter.create('job_applications', record);
    res.status(201).json({
      success: true,
      message: 'Job application submitted successfully',
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PATCH /api/careers/applications/:id/status
 */
router.patch('/applications/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await dbAdapter.update('job_applications', req.params.id, { status });
    res.json({ success: true, data: updated, message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/careers/applications/:id
 */
router.delete('/applications/:id', async (req, res) => {
  try {
    await dbAdapter.delete('job_applications', req.params.id);
    res.json({ success: true, message: `Application ${req.params.id} deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
