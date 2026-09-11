import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * GET /api/students
 */
router.get('/', async (req, res) => {
  try {
    const list = await dbAdapter.find('students');
    res.json({ success: true, data: list, students: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/students/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const student = await dbAdapter.findById('students', req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student record not found' });
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/students/register
 */
router.post('/register', async (req, res) => {
  try {
    const body = req.body || {};
    const enrollment = body.enrollmentNumber || body.registrationNo || `ITH-2026-STU${Math.floor(1000 + Math.random() * 9000)}`;
    const name = body.name || body.fullName || body.candidateName || 'Student';
    const email = (body.email || '').toLowerCase().trim();

    const studentRecord = {
      ...body,
      id: enrollment,
      enrollmentNumber: enrollment,
      name,
      fullName: name,
      email,
      course: body.course || 'MERN Stack Developer',
      academicStatus: body.academicStatus || 'ACTIVE',
      status: body.academicStatus || 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    const saved = await dbAdapter.create('students', studentRecord);

    if (email) {
      await dbAdapter.create('users', {
        id: email,
        name,
        email,
        password: body.password || 'Ithunt@123',
        role: 'student',
        registrationNo: enrollment,
        verified: true,
        status: 'ACTIVE'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: saved,
      student: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/students/:id
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await dbAdapter.update('students', req.params.id, req.body);
    res.json({ success: true, data: updated, message: 'Student profile updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/students/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    await dbAdapter.delete('students', req.params.id);
    res.json({ success: true, message: `Student ${req.params.id} deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
