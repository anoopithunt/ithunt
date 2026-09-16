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
 * POST /api/certificates (Issue New Certificate / Experience Certificate - Admin Only)
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const type = body.type === 'experience' ? 'experience' : 'course';
    const year = new Date().getFullYear();
    const prefix = type === 'experience' ? 'ITH-EXP' : 'ITH-CERT';
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const certNo = body.certNo || body.certificateNumber || `${prefix}-${year}-${randNum}`;

    const studentName = (body.studentName || body.candidateName || 'Engineer').trim();
    const course = (body.course || body.courseName || (type === 'experience' ? (body.role || 'Software Engineering Internship') : 'Full Stack Software Engineering')).trim();
    const issueDate = body.issueDate || new Date().toLocaleDateString('en-GB');

    const record = {
      ...body,
      id: certNo,
      certNo,
      certificateNumber: certNo,
      type,
      studentName,
      candidateName: studentName,
      course,
      courseName: course,
      role: body.role || body.designation || (type === 'experience' ? 'Full Stack Developer Intern' : ''),
      designation: body.designation || body.role || '',
      department: body.department || 'Software Solutions & Cloud Services',
      duration: body.duration || '6 Months',
      startDate: body.startDate || '',
      endDate: body.endDate || '',
      technologies: body.technologies || 'React.js, Node.js, Express, MongoDB, Git, Cloud Solutions',
      performance: body.performance || 'Outstanding',
      grade: body.grade || (type === 'experience' ? 'Grade A (Outstanding)' : 'A+'),
      authorizedSignatory: body.authorizedSignatory || 'Er. Lakshman Singh Chauhan',
      issueDate,
      status: 'Verified & Active',
      verificationUrl: `https://ithunt.vercel.app/api/certificates/verify/${certNo}`,
      createdAt: new Date().toISOString()
    };

    const saved = await dbAdapter.create('certificates', record);
    res.status(201).json({
      success: true,
      message: type === 'experience' ? 'Experience certificate generated successfully' : 'Course certificate issued successfully',
      data: saved,
      certificate: saved
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
