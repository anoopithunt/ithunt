import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * GET /api/admissions
 */
router.get('/', async (req, res) => {
  try {
    const list = await dbAdapter.find('admissions');
    res.json({ success: true, admissions: list, data: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/admissions/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const item = await dbAdapter.findById('admissions', req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Admission record not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/admissions
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const regNo = body.registrationNo || body.registrationNumber || `ITH-${Math.floor(100000 + Math.random() * 900000)}`;
    const candidateName = body.candidateName || body.fullName || 'Candidate';
    const email = (body.email || '').toLowerCase().trim();

    const admissionRecord = {
      ...body,
      id: regNo,
      registrationNo: regNo,
      registrationNumber: regNo,
      candidateName,
      fullName: candidateName,
      email,
      course: body.course || body.track || "NIELIT 'A' Level Diploma",
      status: body.status || 'Confirmed',
      feeStatus: body.feeStatus || 'Verified & Paid',
      amountPaid: body.amountPaid || '₹5,000',
      date: body.date || new Date().toLocaleDateString('en-GB'),
      time: body.time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date().toISOString()
    };

    const saved = await dbAdapter.create('admissions', admissionRecord);

    // Auto-create student record
    const studentRecord = {
      id: regNo,
      enrollmentNumber: regNo,
      registrationNo: regNo,
      name: candidateName,
      fullName: candidateName,
      email,
      phone: body.phone || body.mobile || '',
      mobile: body.phone || body.mobile || '',
      course: admissionRecord.course,
      batch: '2026',
      academicStatus: 'ACTIVE',
      status: 'ACTIVE',
      gender: body.gender || 'Male',
      dob: body.dob || '2004-01-01',
      address: body.address || 'Prayagraj, UP',
      createdAt: new Date().toISOString()
    };
    await dbAdapter.create('students', studentRecord);

    // Auto-create user account if email provided
    if (email) {
      await dbAdapter.create('users', {
        id: email,
        name: candidateName,
        email,
        password: body.password || 'Ithunt@123',
        role: 'student',
        registrationNo: regNo,
        course: admissionRecord.course,
        verified: true,
        status: 'ACTIVE'
      });
    }

    const registrationSlip = {
      slipNumber: `SLIP-${regNo}`,
      registrationNo: regNo,
      candidateName,
      course: admissionRecord.course,
      amountPaid: admissionRecord.amountPaid,
      date: admissionRecord.date,
      status: admissionRecord.status
    };

    res.status(201).json({
      success: true,
      message: 'Admission registered successfully',
      data: {
        admission: saved,
        registrationSlip
      },
      admission: saved,
      registrationSlip
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PATCH /api/admissions/:id/status
 */
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, feeStatus } = req.body || {};
    const updates = {};
    if (status) updates.status = status;
    if (feeStatus) updates.feeStatus = feeStatus;
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'Status or feeStatus is required' });
    }

    const updated = await dbAdapter.update('admissions', req.params.id, updates);
    res.json({ success: true, data: updated, message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/admissions/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    await dbAdapter.delete('admissions', req.params.id);
    res.json({ success: true, message: `Admission ${req.params.id} deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
