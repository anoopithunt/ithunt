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

    const record = {
      ...body,
      id,
      candidateName,
      name: candidateName,
      track: body.track || body.internshipTrack || 'Full Stack MERN',
      duration: body.duration || '6 Months',
      status: 'Active Internship',
      appliedAt: new Date().toLocaleDateString('en-GB'),
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

export default router;
