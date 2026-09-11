import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * GET /api/certificates
 */
router.get('/', async (req, res) => {
  try {
    const list = await dbAdapter.find('certificates');
    res.json({ success: true, data: list, certificates: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/certificates/verify/:certNo (Public Verification)
 */
router.get('/verify/:certNo', async (req, res) => {
  try {
    const { certNo } = req.params;
    const cert = await dbAdapter.findById('certificates', certNo);

    if (!cert) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: `Certificate number ${certNo} not found in verified registry.`
      });
    }

    res.json({
      success: true,
      valid: true,
      data: cert,
      certificate: cert
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/certificates
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const certNo = body.certNo || body.certificateNumber || `ITH-CERT-${Math.floor(10000 + Math.random() * 90000)}`;

    const record = {
      ...body,
      id: certNo,
      certNo,
      certificateNumber: certNo,
      studentName: body.studentName || body.candidateName || 'Engineer',
      course: body.course || body.courseName || body.program || 'Software Engineering',
      grade: body.grade || 'A+',
      issueDate: body.issueDate || new Date().toLocaleDateString('en-GB'),
      status: 'Verified & Active',
      createdAt: new Date().toISOString()
    };

    const saved = await dbAdapter.create('certificates', record);
    res.status(201).json({
      success: true,
      message: 'Certificate issued successfully',
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/certificates/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    await dbAdapter.delete('certificates', req.params.id);
    res.json({ success: true, message: `Certificate ${req.params.id} removed.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
