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

    const now = new Date();
    let date = body.date;
    let time = body.time;
    if (!date) {
      try {
        date = now.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' });
      } catch (_) {
        date = now.toLocaleDateString('en-GB');
      }
    }
    if (!time) {
      try {
        time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
      } catch (_) {
        time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      }
    }

    const regNo = body.registrationNo || body.registrationNumber || enrollment;
    const studentRecord = {
      ...body,
      id: enrollment,
      enrollmentNumber: enrollment,
      registrationNo: regNo,
      name,
      fullName: name,
      email,
      phone: body.phone || body.mobile || '',
      mobile: body.mobile || body.phone || '',
      course: body.course || 'MERN Stack Developer',
      academicStatus: body.academicStatus || 'ACTIVE',
      status: body.academicStatus || 'ACTIVE',
      date,
      time,
      createdAt: body.createdAt || now.toISOString()
    };

    const saved = await dbAdapter.create('students', studentRecord);

    // Automatically create Admission record with timing in admissions collection
    const admissionRecord = {
      id: regNo,
      registrationNo: regNo,
      registrationNumber: regNo,
      candidateName: name,
      fullName: name,
      fatherName: body.fatherName || 'Not Specified',
      motherName: body.motherName || 'Not Specified',
      email,
      phone: body.phone || body.mobile || '+91 9795771806',
      mobile: body.mobile || body.phone || '+91 9795771806',
      course: body.course || 'NIELIT O/A Level Diploma',
      track: body.track || body.course || 'NIELIT O/A Level Diploma',
      district: body.district || 'Prayagraj',
      address: body.address || 'Holagarh, Prayagraj',
      qualification: body.qualification || '',
      gender: body.gender || 'Male',
      dob: body.dob || '2004-01-01',
      status: body.status || 'Active Registered Student',
      feeStatus: body.feeStatus || 'Pending Verification',
      amountPaid: body.amountPaid || '₹0',
      date,
      time,
      createdAt: body.createdAt || now.toISOString()
    };

    const savedAdmission = await dbAdapter.create('admissions', admissionRecord);

    if (email) {
      await dbAdapter.create('users', {
        id: email,
        name,
        email,
        password: body.password || 'Ithunt@123',
        role: 'student',
        registrationNo: regNo,
        verified: true,
        status: 'ACTIVE',
        createdAt: body.createdAt || now.toISOString()
      });
    }

    res.status(201).json({
      success: true,
      message: 'Student registered and admission record created successfully',
      data: {
        ...saved,
        admission: savedAdmission
      },
      student: saved,
      admission: savedAdmission
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
