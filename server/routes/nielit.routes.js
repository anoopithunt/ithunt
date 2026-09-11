import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * GET /api/nielit-projects
 */
router.get('/', async (req, res) => {
  try {
    const list = await dbAdapter.find('nielit_projects');
    res.json({ success: true, data: list, projects: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/nielit-projects/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const item = await dbAdapter.findById('nielit_projects', req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'NIELIT project not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/nielit-projects
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const regNo = body.nielitRegNo || body.registrationNo || body.regNo || `NIELIT-${Date.now()}`;
    const studentName = body.studentName || body.candidateName || body.fullName || 'Candidate';

    const record = {
      ...body,
      id: regNo,
      registrationNo: regNo,
      nielitRegNo: regNo,
      studentName,
      candidateName: studentName,
      level: body.level || body.nielitLevel || 'O Level',
      projectTitle: body.projectTitle || body.title || 'MERN Stack Web Development',
      guideName: body.guideName || 'Mr. Sushil Kumar',
      guideQualification: body.guideQualification || 'MCA (Computer Science)',
      guideDesignation: body.guideDesignation || 'Laravel/NodeJS Developer',
      status: body.status || 'Submitted',
      feePaid: body.feePaid || body.amount || '₹1,000',
      utrNo: body.utrNo || body.utrNumber || 'UPI/Verified',
      accountHolderName: body.accountHolderName || studentName,
      paymentRemark: body.paymentRemark || 'Paid',
      date: body.date || new Date().toLocaleDateString('en-GB'),
      createdAt: new Date().toISOString()
    };

    const saved = await dbAdapter.create('nielit_projects', record);
    res.status(201).json({
      success: true,
      message: 'NIELIT project submitted successfully',
      data: saved,
      project: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/nielit-projects/:id
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await dbAdapter.update('nielit_projects', req.params.id, req.body);
    res.json({ success: true, data: updated, message: 'NIELIT project updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/nielit-projects/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    await dbAdapter.delete('nielit_projects', req.params.id);
    res.json({ success: true, message: `NIELIT project ${req.params.id} deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
