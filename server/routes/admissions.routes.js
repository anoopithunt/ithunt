import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';
import { sendAdmissionNotificationEmail } from '../services/systemMailer.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { buildPendingAdmissionRecord } from '../services/admissionSubmission.js';

const router = Router();

const sanitizeRecord = (record) => {
  if (!record || typeof record !== 'object') return record;
  const safeRecord = { ...record };
  delete safeRecord.password;
  return safeRecord;
};

/**
 * GET /api/admissions
 */
router.get('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const list = (await dbAdapter.find('admissions')).map(sanitizeRecord);
    res.json({ success: true, admissions: list, data: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/admissions/:id
 */
router.get('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const item = await dbAdapter.findById('admissions', req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Admission record not found' });
    res.json({ success: true, data: sanitizeRecord(item) });
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
    if (typeof body.password !== 'string' || body.password.length < 12 || body.password.length > 1024) {
      return res.status(400).json({ success: false, message: 'Create a password of at least 12 characters before submitting.' });
    }
    const regNo = body.registrationNo || body.registrationNumber || `ITH-${Math.floor(100000 + Math.random() * 900000)}`;
    const candidateName = body.candidateName || body.fullName || 'Candidate';
    const email = (body.email || `${regNo.toLowerCase()}@ithunt.com`).toLowerCase().trim();
    const phone = body.phone || body.mobile || '+91 9795771806';
    const mobile = body.mobile || body.phone || phone;
    const now = new Date();
    const admissionRecord = buildPendingAdmissionRecord(body, {
      registrationNo: regNo,
      candidateName,
      email,
      phone,
      mobile,
      date: now.toLocaleDateString('en-GB'),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      createdAt: now.toISOString()
    });

    const saved = await dbAdapter.create('admissions', admissionRecord);

    // Auto-create student record
    const studentRecord = {
      id: regNo,
      enrollmentNumber: regNo,
      registrationNo: regNo,
      name: candidateName,
      fullName: candidateName,
      email,
      phone,
      mobile,
      course: admissionRecord.course,
      batch: '2026',
      academicStatus: 'PENDING_REVIEW',
      status: 'PENDING_REVIEW',
      admissionConfirmed: false,
      gender: body.gender || 'Male',
      dob: body.dob || '2004-01-01',
      address: body.address || 'Prayagraj, UP',
      createdAt: new Date().toISOString()
    };
    await dbAdapter.create('students', studentRecord);

    // Admission submissions stay pending until the authenticated admin confirmation flow.
    if (email) {
      await dbAdapter.create('users', {
        id: email,
        name: candidateName,
        email,
        phone,
        password,
        role: 'student',
        registrationNo: regNo,
        course: admissionRecord.course,
        verified: false,
        status: 'PENDING_REVIEW'
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

    // Await admission notification email dispatch to student and admin
    let emailSent = false;
    try {
      await sendAdmissionNotificationEmail({
        ...admissionRecord,
        userId: email
      });
      emailSent = true;
    } catch (mailErr) {
      console.warn('[Admissions] Email dispatch error:', mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Admission registered successfully',
      data: {
        admission: saved,
        registrationSlip
      },
      admission: saved,
      registrationSlip,
      emailSent
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/admissions/:id/confirm
 * Admin confirms admission without resetting or exposing the student's password.
 */
router.post('/:id/confirm', verifyToken, requireAdmin, async (req, res) => {
  try {
    const targetId = req.params.id;
    let adm = await dbAdapter.findById('admissions', targetId);
    if (!adm) {
      const all = await dbAdapter.find('admissions');
      adm = all.find(a => a.id === targetId || a.registrationNo === targetId || a.registrationNumber === targetId || (a.email && a.email.toLowerCase() === targetId.toLowerCase()));
    }
    if (!adm) {
      return res.status(404).json({ success: false, message: 'Admission record not found' });
    }

    const { userId: reqUserId, feeStatus } = req.body || {};
    const finalUserId = reqUserId || adm.userId || adm.enrollmentNumber || adm.email;
    const email = (adm.email || `${finalUserId.toLowerCase()}@ithunt.com`).toLowerCase();
    const user = await dbAdapter.findOne('users', { email });
    if (!user) {
      return res.status(409).json({
        success: false,
        message: 'No registered account exists for this admission. Ask the applicant to complete account registration first.'
      });
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB');
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const updates = {
      status: 'Confirmed',
      feeStatus: feeStatus || adm.feeStatus || 'Verified & Paid',
      userId: finalUserId,
      enrollmentNumber: finalUserId,
      admissionConfirmed: true,
      admissionConfirmedDate: dateStr,
      admissionConfirmedTime: timeStr,
      confirmedAt: now.toISOString(),
      confirmedBy: req.user?.name || req.user?.fullName || 'SuperAdmin'
    };

    const updatedAdmission = await dbAdapter.update('admissions', adm.id || targetId, updates);

    // 1. Sync or Create Student Profile in MongoDB
    const studentRecord = {
      id: finalUserId,
      enrollmentNumber: finalUserId,
      registrationNo: adm.registrationNo || targetId,
      userId: finalUserId,
      name: adm.candidateName || adm.fullName || 'Student',
      fullName: adm.fullName || adm.candidateName || 'Student',
      email,
      phone: adm.phone || adm.mobile || '',
      mobile: adm.mobile || adm.phone || '',
      course: adm.course || 'Software Engineering',
      batch: adm.batch || '2026',
      academicStatus: 'ACTIVE',
      status: 'ACTIVE',
      admissionConfirmed: true,
      gender: adm.gender || 'Male',
      dob: adm.dob || '2004-01-01',
      address: adm.address || 'Prayagraj, UP',
      confirmedAt: now.toISOString()
    };
    const existingStudent = await dbAdapter.findOne('students', {
      registrationNo: studentRecord.registrationNo
    }) || await dbAdapter.findOne('students', { email: studentRecord.email.toLowerCase() });
    if (existingStudent) {
      await dbAdapter.update('students', existingStudent.id || existingStudent._id || studentRecord.registrationNo, studentRecord);
    } else {
      await dbAdapter.create('students', studentRecord);
    }

    await dbAdapter.update('users', user.id || user._id, {
      userId: finalUserId,
      status: 'ACTIVE',
      verified: true,
      registrationNo: adm.registrationNo || targetId,
      enrollmentNumber: finalUserId,
      confirmedAt: now.toISOString()
    });

    res.json({
      success: true,
      message: 'Admission confirmed. The student can sign in using the password created during registration.',
      data: {
        admission: sanitizeRecord(updatedAdmission),
        student: studentRecord,
        credentials: {
          userId: finalUserId,
          candidateName: adm.candidateName || adm.fullName || 'Student',
          email: adm.email,
          mobile: adm.mobile || adm.phone,
          course: adm.course,
          loginUrl: 'https://ithunt.vercel.app/#login'
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/admissions/:id
 * Full update of an admission record by admin
 */
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const targetId = req.params.id;
    const body = req.body || {};

    // Find the record by mongo _id, registrationNo, or id field
    let adm = await dbAdapter.findById('admissions', targetId);
    if (!adm) {
      const all = await dbAdapter.find('admissions');
      adm = all.find(a =>
        a.id === targetId ||
        a.registrationNo === targetId ||
        a.registrationNumber === targetId ||
        (a.email && a.email.toLowerCase() === String(targetId).toLowerCase())
      );
    }
    if (!adm) {
      return res.status(404).json({ success: false, message: 'Admission record not found' });
    }

    // Strip fields that should NOT be changed by a plain edit
    const safeUpdates = { ...body };
    delete safeUpdates._id;
    delete safeUpdates.__v;
    delete safeUpdates.createdAt;
    delete safeUpdates.password;

    const updated = await dbAdapter.update('admissions', adm.id || targetId, safeUpdates);

    // Also sync relevant fields to the students collection
    const studentFields = {};
    if (safeUpdates.candidateName || safeUpdates.fullName) {
      studentFields.name = safeUpdates.candidateName || safeUpdates.fullName;
      studentFields.fullName = studentFields.name;
    }
    if (safeUpdates.email) studentFields.email = safeUpdates.email;
    if (safeUpdates.phone || safeUpdates.mobile) {
      studentFields.phone = safeUpdates.phone || safeUpdates.mobile;
      studentFields.mobile = safeUpdates.mobile || safeUpdates.phone;
    }
    if (safeUpdates.course) studentFields.course = safeUpdates.course;
    if (safeUpdates.gender) studentFields.gender = safeUpdates.gender;
    if (safeUpdates.dob) studentFields.dob = safeUpdates.dob;
    if (safeUpdates.address) studentFields.address = safeUpdates.address;
    if (safeUpdates.fatherName) studentFields.guardianName = safeUpdates.fatherName;

    if (Object.keys(studentFields).length > 0) {
      try {
        const studentId = adm.userId || adm.enrollmentNumber || adm.registrationNo;
        if (studentId) {
          await dbAdapter.update('students', studentId, studentFields);
        }
      } catch (syncErr) {
        console.warn('[Admissions PUT] Could not sync student record:', syncErr.message);
      }
    }

    res.json({ success: true, data: sanitizeRecord(updated), message: 'Admission record updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PATCH /api/admissions/:id/status
 */
router.patch('/:id/status', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { status, feeStatus } = req.body || {};
    if (status === 'Confirmed') {
      return res.status(400).json({ success: false, message: 'Use the admission confirmation endpoint to activate a registered student account.' });
    }
    const updates = {};
    if (status) updates.status = status;
    if (feeStatus) updates.feeStatus = feeStatus;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'Status or feeStatus is required' });
    }

    const updated = await dbAdapter.update('admissions', req.params.id, updates);
    res.json({ success: true, data: sanitizeRecord(updated), message: 'Admission status updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/admissions/:id
 */
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    await dbAdapter.delete('admissions', req.params.id);
    res.json({ success: true, message: `Admission ${req.params.id} deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
