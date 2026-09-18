import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * GET /api/internships or /api/internships/applications
 */
const getInternshipsHandler = async (req, res) => {
  try {
    const list = await dbAdapter.find('internships');
    res.json({ success: true, data: list, applications: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

router.get('/applications', getInternshipsHandler);
router.get('/', getInternshipsHandler);

/**
 * POST /api/internships or /api/internships/apply
 */
const applyInternshipHandler = async (req, res) => {
  try {
    const body = req.body || {};
    const id = `INT-${Date.now()}`;
    const candidateName = body.candidateName || body.fullName || body.name || 'Applicant';
    const phone = body.phone || body.mobile || '';

    const record = {
      ...body,
      id: body.id || id,
      candidateName,
      name: candidateName,
      phone,
      mobile: phone,
      track: body.track || body.internshipTrack || 'Full Stack MERN',
      duration: body.duration || '6 Months',
      status: body.status || 'Confirmed',
      appliedAt: body.appliedAt || new Date().toLocaleDateString('en-GB'),
      createdAt: new Date().toISOString()
    };

    const saved = await dbAdapter.create('internships', record);
    res.status(201).json({
      success: true,
      message: 'Internship application submitted successfully',
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

router.post('/apply', applyInternshipHandler);
router.post('/', applyInternshipHandler);

/**
 * PUT /api/internships/applications/:id/status
 */
router.put('/applications/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await dbAdapter.update('internships', req.params.id, { status });
    res.json({ success: true, data: updated, message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/internships/:id
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await dbAdapter.update('internships', req.params.id, req.body);
    res.json({ success: true, data: updated, message: 'Internship application updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/internships/:id or /api/internships/applications/:id
 */
const deleteInternshipHandler = async (req, res) => {
  try {
    await dbAdapter.delete('internships', req.params.id);
    res.json({ success: true, message: `Internship application ${req.params.id} deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

router.delete('/applications/:id', deleteInternshipHandler);
router.delete('/:id', deleteInternshipHandler);

export default router;

