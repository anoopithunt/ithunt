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

    // Create user account with PENDING_REVIEW if not yet confirmed by SuperAdmin
    const isConfirmed = admissionRecord.status === 'Confirmed' || admissionRecord.admissionConfirmed;
    if (email) {
      await dbAdapter.create('users', {
        id: email,
        name: candidateName,
        email,
        password: body.password || 'Ithunt@123',
        role: 'student',
        registrationNo: regNo,
        course: admissionRecord.course,
        verified: !!isConfirmed,
        status: isConfirmed ? 'ACTIVE' : 'PENDING_REVIEW'
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
 * Helper to generate secure credentials for admitted student
 */
function generateStudentCredentials(adm = {}) {
  const cleanId = (adm.registrationNo || adm.id || '').replace(/^ITH-?/i, '');
  const suffix = cleanId && cleanId.length >= 3 ? cleanId.slice(-4) : Math.floor(1000 + Math.random() * 9000);
  const userId = adm.userId || adm.enrollmentNumber || `ITH-2026-STU${suffix}`;
  const password = adm.password || `ITH@${Math.floor(1000 + Math.random() * 9000)}`;
  return { userId, password };
}

/**
 * POST /api/admissions/:id/confirm
 * Admin confirms admission: automatically generates Student User ID & Password and saves accounts to DB
 */
router.post('/:id/confirm', async (req, res) => {
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

    const { userId: reqUserId, password: reqPassword, feeStatus, confirmedBy } = req.body || {};
    const autoCreds = generateStudentCredentials(adm);
    const finalUserId = reqUserId || adm.userId || autoCreds.userId;
    const finalPassword = reqPassword || (adm.password && adm.password !== 'Ithunt@123' ? adm.password : autoCreds.password);

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB');
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const updates = {
      status: 'Confirmed',
      feeStatus: feeStatus || adm.feeStatus || 'Verified & Paid',
      userId: finalUserId,
      enrollmentNumber: finalUserId,
      password: finalPassword,
      admissionConfirmed: true,
      admissionConfirmedDate: dateStr,
      admissionConfirmedTime: timeStr,
      confirmedAt: now.toISOString(),
      confirmedBy: confirmedBy || 'SuperAdmin'
    };

    const updatedAdmission = await dbAdapter.update('admissions', adm.id || targetId, updates);

    // 1. Sync or Create Student Profile in MongoDB
    const studentRecord = {
      id: finalUserId,
      enrollmentNumber: finalUserId,
      registrationNo: adm.registrationNo || targetId,
      userId: finalUserId,
      password: finalPassword,
      name: adm.candidateName || adm.fullName || 'Student',
      fullName: adm.fullName || adm.candidateName || 'Student',
      email: adm.email || `${finalUserId.toLowerCase()}@ithunt.com`,
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
    await dbAdapter.create('students', studentRecord);

    // 2. Sync or Create User Authentication Account in MongoDB
    const userRecord = {
      id: finalUserId,
      userId: finalUserId,
      name: adm.candidateName || adm.fullName || 'Student',
      email: (adm.email || `${finalUserId.toLowerCase()}@ithunt.com`).toLowerCase(),
      password: finalPassword,
      role: 'student',
      status: 'ACTIVE',
      verified: true,
      registrationNo: adm.registrationNo || targetId,
      enrollmentNumber: finalUserId,
      confirmedAt: now.toISOString()
    };
    await dbAdapter.create('users', userRecord);

    // Also register user record under their email for dual lookup
    if (adm.email) {
      await dbAdapter.create('users', {
        ...userRecord,
        id: adm.email.toLowerCase()
      });
    }

    res.json({
      success: true,
      message: 'Admission confirmed successfully! Student User ID and Password generated.',
      data: {
        admission: updatedAdmission,
        student: studentRecord,
        credentials: {
          userId: finalUserId,
          password: finalPassword,
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
 * PATCH /api/admissions/:id/status
 */
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, feeStatus, password, userId } = req.body || {};
    const updates = {};
    if (status) updates.status = status;
    if (feeStatus) updates.feeStatus = feeStatus;

    if (status === 'Confirmed') {
      const existing = await dbAdapter.findById('admissions', req.params.id) || {};
      const creds = generateStudentCredentials(existing);
      updates.userId = userId || existing.userId || creds.userId;
      updates.enrollmentNumber = updates.userId;
      updates.password = password || existing.password || creds.password;
      updates.admissionConfirmed = true;
      updates.confirmedAt = new Date().toISOString();

      // Ensure user and student records exist
      await dbAdapter.create('students', {
        id: updates.userId,
        enrollmentNumber: updates.userId,
        registrationNo: existing.registrationNo || req.params.id,
        userId: updates.userId,
        password: updates.password,
        name: existing.candidateName || existing.fullName || 'Student',
        email: existing.email,
        mobile: existing.mobile,
        course: existing.course,
        academicStatus: 'ACTIVE',
        status: 'ACTIVE'
      });

      await dbAdapter.create('users', {
        id: updates.userId,
        userId: updates.userId,
        name: existing.candidateName || existing.fullName || 'Student',
        email: existing.email,
        password: updates.password,
        role: 'student',
        status: 'ACTIVE',
        verified: true
      });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'Status or feeStatus is required' });
    }

    const updated = await dbAdapter.update('admissions', req.params.id, updates);
    res.json({ success: true, data: updated, message: 'Admission status updated and synchronized' });
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
