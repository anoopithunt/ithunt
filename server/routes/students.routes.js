import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';
import { generateToken, verifyToken, requireAdmin } from '../middleware/auth.js';
import { loginRateLimit } from '../middleware/loginRateLimit.js';
import bcrypt from 'bcryptjs';

const router = Router();

const sanitizeRecord = (record) => {
  if (!record || typeof record !== 'object') return record;
  const safeRecord = { ...record };
  delete safeRecord.password;
  return safeRecord;
};

const isAdmin = (user) => ['admin', 'superadmin'].includes(String(user?.role || '').toLowerCase());

/**
 * GET /api/students
 */
router.get('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const list = (await dbAdapter.find('students')).map(sanitizeRecord);
    res.json({ success: true, data: list, students: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/students/:id
 */
router.get('/:id', verifyToken, async (req, res) => {
  try {
    let student = await dbAdapter.findById('students', req.params.id);
    if (!student) {
      student = await dbAdapter.findById('admissions', req.params.id);
    }
    if (!student) return res.status(404).json({ success: false, message: 'Student record not found' });
    const ownsStudentRecord = req.user?.email && student.email &&
      req.user.email.toLowerCase() === student.email.toLowerCase();
    if (!isAdmin(req.user) && !ownsStudentRecord) {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }
    const safeStudent = sanitizeRecord(student);
    res.json({ success: true, data: safeStudent, student: safeStudent });
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
    const password = body.password;
    if (typeof body.email !== 'string' || !body.email.trim() || typeof password !== 'string' || password.length < 12 || password.length > 1024) {
      return res.status(400).json({ success: false, message: 'A valid email address and password of at least 12 characters are required.' });
    }

    const enrollment = body.enrollmentNumber || body.registrationNo || `ITH-2026-STU${Math.floor(1000 + Math.random() * 9000)}`;
    const name = body.name || body.fullName || body.candidateName || 'Student';
    const email = (body.email || '').toLowerCase().trim();
    const existingUser = await dbAdapter.findOne('users', { email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

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
      id: enrollment,
      enrollmentNumber: enrollment,
      registrationNo: regNo,
      name,
      fullName: name,
      email,
      phone: body.phone || body.mobile || '+91 9795771806',
      mobile: body.mobile || body.phone || '+91 9795771806',
      course: body.course || 'MERN Stack Developer',
      academicStatus: 'PENDING_REVIEW',
      status: 'PENDING_REVIEW',
      date,
      time,
      createdAt: body.createdAt || now.toISOString()
    };

    await dbAdapter.create('students', studentRecord);

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
      status: 'Pending Verification',
      feeStatus: body.feeStatus || 'Verified & Paid',
      amountPaid: body.amountPaid || '₹5,000',
      utrNo: body.utrNo || '',
      paymentMode: body.paymentMode || 'Online UPI',
      date,
      time,
      userId: body.userId || enrollment,
      enrollmentNumber: enrollment,
      admissionConfirmed: false,
      createdAt: body.createdAt || now.toISOString()
    };

    await dbAdapter.create('admissions', admissionRecord);
    await dbAdapter.create('users', {
      id: email,
      userId: email,
      name,
      email,
      password,
      role: 'student',
      registrationNo: regNo,
      course: studentRecord.course,
      verified: false,
      status: 'PENDING_REVIEW'
    });

    const safeUser = {
      id: email,
      userId: email,
      name,
      email,
      role: 'student',
      registrationNo: regNo,
      course: studentRecord.course,
      verified: false,
      status: 'PENDING_REVIEW'
    };

    res.status(201).json({
      success: true,
      message: 'Registration submitted for review. Sign in after your account is approved.',
      data: { user: safeUser, admission: admissionRecord }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/students/profile
 */
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const body = req.body || {};
    const targetId = isAdmin(req.user)
      ? body.id || body.registrationNo || body.email || body.userId
      : req.user?.id || req.user?.userId || req.user?.email;
    if (!targetId) {
      return res.status(400).json({ success: false, message: 'Student ID, Registration Number, or Email required' });
    }
    if (!isAdmin(req.user) && (
      typeof body.email !== 'string' ||
      body.email.toLowerCase().trim() !== String(req.user.email || '').toLowerCase()
    )) {
      return res.status(403).json({ success: false, message: 'You may only update your own student profile.' });
    }

    const profileFields = {};
    for (const field of ['name', 'fullName', 'candidateName', 'phone', 'mobile', 'address', 'gender', 'dob', 'guardianName', 'guardianPhone', 'bio']) {
      if (body[field] !== undefined) profileFields[field] = body[field];
    }

    const allStudents = await dbAdapter.find('students');
    const student = allStudents.find(s => 
      s.id === targetId || 
      s.registrationNo === targetId || 
      (s.email && s.email.toLowerCase() === String(targetId).toLowerCase())
    );

    let updated = null;
    if (student) {
      updated = await dbAdapter.update('students', student.id, profileFields);
    } else if (isAdmin(req.user)) {
      updated = await dbAdapter.create('students', { ...profileFields, id: targetId });
    } else {
      return res.status(404).json({ success: false, message: 'Student record not found.' });
    }

    const allAdmissions = await dbAdapter.find('admissions');
    const admission = allAdmissions.find(a => 
      a.id === targetId || 
      a.registrationNo === targetId || 
      (a.email && a.email.toLowerCase() === String(targetId).toLowerCase())
    );
    if (admission) {
      await dbAdapter.update('admissions', admission.id, {
        candidateName: profileFields.candidateName || profileFields.fullName || admission.candidateName,
        fullName: profileFields.fullName || profileFields.candidateName || admission.fullName,
        phone: profileFields.phone || profileFields.mobile || admission.phone,
        mobile: profileFields.mobile || profileFields.phone || admission.mobile,
        address: profileFields.address !== undefined ? profileFields.address : admission.address
      });
    }

    res.json({ success: true, data: sanitizeRecord(updated), message: 'Student profile updated successfully in database' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/students/:id
 */
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const body = { ...(req.body || {}) };
    delete body.password;
    let updated = null;

    // Check students first
    let student = await dbAdapter.findById('students', id);
    if (!student) {
      const allStudents = await dbAdapter.find('students');
      student = allStudents.find(s => s.id === id || s.registrationNo === id || (s.email && s.email.toLowerCase() === String(id).toLowerCase()));
    }

    if (student) {
      updated = await dbAdapter.update('students', student.id, body);
    }

    // Also check and update admissions
    let admission = await dbAdapter.findById('admissions', id);
    if (!admission) {
      const allAdmissions = await dbAdapter.find('admissions');
      admission = allAdmissions.find(a => a.id === id || a.registrationNo === id || (a.email && a.email.toLowerCase() === String(id).toLowerCase()));
    }

    if (admission) {
      const admissionUpdated = await dbAdapter.update('admissions', admission.id, body);
      if (!updated) updated = admissionUpdated;
    }

    if (!updated) {
      updated = await dbAdapter.update('students', id, body);
    }

    res.json({ success: true, data: sanitizeRecord(updated), message: 'Student profile & dashboard controls updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/students/:id
 */
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    await dbAdapter.delete('students', req.params.id);
    res.json({ success: true, message: `Student ${req.params.id} deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/students/login
 */
router.post('/login', loginRateLimit, async (req, res) => {
  try {
    const identifier = req.body?.email || req.body?.userId || req.body?.username || req.body?.identifier || req.body?.loginId;
    const password = req.body?.password;
    if (typeof identifier !== 'string' || !identifier.trim() || typeof password !== 'string' || !password || password.length > 1024) {
      return res.status(400).json({ success: false, message: 'User ID or email and password are required.' });
    }
    const norm = String(identifier).toLowerCase().trim();
    const inputPass = (password || '').trim();

    // 1. Check students collection
    const students = await dbAdapter.find('students');
    let student = students.find(s => 
      (s.userId && s.userId.toLowerCase() === norm) ||
      (s.email && s.email.toLowerCase() === norm) || 
      (s.registrationNo && s.registrationNo.toLowerCase() === norm) ||
      (s.enrollmentNumber && s.enrollmentNumber.toLowerCase() === norm) ||
      (s.id && s.id.toLowerCase() === norm)
    );

    // 2. Check admissions collection
    const admissions = await dbAdapter.find('admissions');
    let adm = admissions.find(a => 
      (a.userId && a.userId.toLowerCase() === norm) ||
      (a.email && a.email.toLowerCase() === norm) || 
      (a.registrationNo && a.registrationNo.toLowerCase() === norm) ||
      (a.registrationNumber && a.registrationNumber.toLowerCase() === norm) ||
      (a.id && a.id.toLowerCase() === norm)
    );

    // 3. Check users collection
    const users = await dbAdapter.find('users');
    let user = users.find(u => 
      (u.userId && u.userId.toLowerCase() === norm) ||
      (u.email && u.email.toLowerCase() === norm) || 
      (u.registrationNo && u.registrationNo.toLowerCase() === norm) ||
      (u.id && u.id.toLowerCase() === norm)
    );

    if (!student && !adm && !user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Check admission confirmation status
    const isAdmissionPending = adm && (adm.status === 'Pending Verification' || adm.status === 'Pending Confirmation') && !adm.admissionConfirmed;
    if (isAdmissionPending && !student?.admissionConfirmed && (!user || !user.verified)) {
      return res.status(403).json({
        success: false,
        pending: true,
        message: 'Your admission registration is currently pending review by SuperAdmin. Once confirmed, your generated User ID and Password will be activated for login.'
      });
    }

    const expectedPass = typeof user?.password === 'string' ? user.password : '';
    const isMatch = /^\$2[aby]\$\d{2}\$/.test(expectedPass) && await bcrypt.compare(inputPass, expectedPass);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const resolvedUser = {
      id: student?.userId || adm?.userId || student?.id || adm?.id || user?.id || `STU-${Date.now()}`,
      userId: student?.userId || adm?.userId || user?.userId || student?.enrollmentNumber || adm?.registrationNo || '',
      enrollmentNumber: student?.enrollmentNumber || adm?.enrollmentNumber || student?.userId || adm?.registrationNo || '',
      name: student?.name || student?.fullName || adm?.candidateName || user?.name || 'Student',
      fullName: student?.fullName || student?.name || adm?.candidateName || 'Student',
      email: student?.email || adm?.email || user?.email || norm,
      registrationNo: student?.registrationNo || adm?.registrationNo || user?.registrationNo || '',
      course: student?.course || adm?.course || 'Software Engineering',
      role: 'student',
      status: 'ACTIVE'
    };
    const token = generateToken(resolvedUser);
    res.json({
      success: true,
      message: 'Student login successful',
      token,
      data: { token, user: resolvedUser, student: resolvedUser },
      user: resolvedUser,
      student: resolvedUser
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/students/:id/reset-password
 * SuperAdmin can reset student credentials
 */
router.post('/:id/reset-password', verifyToken, requireAdmin, async (req, res) => {
  try {
    const targetId = req.params.id;
    const { newPassword } = req.body || {};
    if (typeof newPassword !== 'string' || newPassword.length < 12 || newPassword.length > 1024) {
      return res.status(400).json({ success: false, message: 'Password must be at least 12 characters.' });
    }

    const allUsers = await dbAdapter.find('users');
    const user = allUsers.find(u => u.id === targetId || u.userId === targetId || u.registrationNo === targetId || u.email === targetId);
    if (!user || String(user.role || '').toLowerCase() !== 'student') {
      return res.status(404).json({ success: false, message: 'Student account not found.' });
    }
    await dbAdapter.update('users', user.id, { password: newPassword });

    res.json({
      success: true,
      message: 'Student password reset successfully by SuperAdmin',
      data: {
        userId: user.userId || user.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/students/change-password
 */
router.post('/change-password', verifyToken, async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body || {};
    if (
      typeof email !== 'string' ||
      typeof oldPassword !== 'string' ||
      typeof newPassword !== 'string' ||
      !oldPassword ||
      newPassword.length < 12 ||
      newPassword.length > 1024
    ) {
      return res.status(400).json({ success: false, message: 'Current password and a new password of at least 12 characters are required.' });
    }
    const norm = email.toLowerCase().trim();
    if (!req.user?.email || req.user.email.toLowerCase() !== norm) {
      return res.status(403).json({ success: false, message: 'You may only change your own account password.' });
    }

    const user = await dbAdapter.findOne('users', { email: norm });
    if (!user || typeof user.password !== 'string' || !/^\$2[aby]\$\d{2}\$/.test(user.password)) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
    }
    if (!await bcrypt.compare(oldPassword, user.password)) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
    }

    await dbAdapter.update('users', user.id, { password: newPassword });
    res.json({ success: true, message: 'Password updated successfully in MongoDB database (ithunt).' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
