import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';
import { generateToken, generatePasswordResetToken, hashPasswordResetToken, verifyToken, requireAdmin } from '../middleware/auth.js';
import { loginRateLimit } from '../middleware/loginRateLimit.js';
import { sendPasswordResetEmail } from '../services/systemMailer.js';
import bcrypt from 'bcryptjs';

const router = Router();

/**
 * POST /api/auth/login
 */
router.post('/login', loginRateLimit, async (req, res) => {
  try {
    const identifier = req.body?.email || req.body?.username || req.body?.userId || req.body?.loginId;
    const password = req.body?.password;
    if (typeof identifier !== 'string' || typeof password !== 'string' || !identifier.trim() || !password || password.length > 1024) {
      return res.status(400).json({ success: false, message: 'Email/User ID and password are required.' });
    }

    const normEmail = String(identifier).toLowerCase().trim();

    // Only provisioned user accounts can authenticate; profile records are not credentials.
    const allUsers = await dbAdapter.find('users');
    let user = allUsers.find(u =>
      (u.userId && u.userId.toLowerCase() === normEmail) ||
      (u.email && u.email.toLowerCase() === normEmail) ||
      (u.registrationNo && u.registrationNo.toLowerCase() === normEmail) ||
      (u.enrollmentNumber && u.enrollmentNumber.toLowerCase() === normEmail) ||
      (u.id && u.id.toLowerCase() === normEmail)
    );

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (user.role === 'student' && user.verified === false) {
      return res.status(403).json({
        success: false,
        pending: true,
        message: 'Your admission registration is currently pending review by SuperAdmin. Once confirmed, your generated User ID and Password will be activated for login.'
      });
    }

    const userPass = typeof user.password === 'string' ? user.password : '';
    const isMatch = /^\$2[aby]\$\d{2}\$/.test(userPass) && await bcrypt.compare(password, userPass);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const safeUser = {
      id: user.id || user._id,
      userId: user.userId || user.id,
      name: user.name || user.candidateName || 'User',
      fullName: user.name || user.candidateName || 'User',
      candidateName: user.candidateName || user.name || 'User',
      email: user.email,
      role: user.role || 'student',
      roleType: user.roleType || user.role || 'student',
      registrationNo: user.registrationNo || '',
      enrollmentNumber: user.enrollmentNumber || user.userId || '',
      course: user.course || '',
      designation: user.designation || (user.role === 'teacher' || user.role === 'faculty' ? 'Faculty Instructor' : ''),
      verified: user.verified !== false
    };

    const token = generateToken(safeUser);
    res.json({
      success: true,
      message: 'Login successful',
      data: { token, user: safeUser }
    });
  } catch (error) {
    if (error.code === 'JWT_SECRET_CONFIGURATION') {
      console.error('[Security] JWT configuration error:', error.message);
      return res.status(503).json({
        success: false,
        message: 'Authentication is temporarily unavailable. Please contact the administrator.'
      });
    }
    res.status(500).json({ success: false, message: 'Authentication error', error: error.message });
  }
});

/**
 * POST /api/auth/forgot-password
 */
router.post('/forgot-password', loginRateLimit, async (req, res) => {
  const genericResponse = {
    success: true,
    message: 'If an account exists for that email, a password reset link will be sent shortly.'
  };
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Enter a valid email address.' });
  }

  try {
    const emailPattern = new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
    const user = await dbAdapter.findOne('users', { email: emailPattern });
    if (!user) return res.json(genericResponse);

    const { token, tokenHash } = generatePasswordResetToken();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    await dbAdapter.update('users', user.id || user._id, {
      passwordResetTokenHash: tokenHash,
      passwordResetExpiresAt: expiresAt
    });

    const resetUrl = new URL('/', process.env.FRONTEND_URL || 'https://ithunt.vercel.app');
    resetUrl.searchParams.set('resetToken', token);
    resetUrl.hash = 'login';
    const result = await sendPasswordResetEmail(email, resetUrl.toString());
    if (!result.success) {
      console.error('[Auth] Password reset email delivery failed:', result.error || result.reason || 'Unknown mail delivery error');
    }

    return res.json(genericResponse);
  } catch (error) {
    console.error('[Auth] Password reset request failed:', error.message);
    return res.status(503).json({
      success: false,
      message: 'Password reset is temporarily unavailable. Please try again shortly.'
    });
  }
});

/**
 * POST /api/auth/reset-password
 */
router.post('/reset-password', loginRateLimit, async (req, res) => {
  const { token, password } = req.body || {};
  if (
    typeof token !== 'string' ||
    !/^[a-f0-9]{64}$/i.test(token) ||
    typeof password !== 'string' ||
    password.length < 12 ||
    Buffer.byteLength(password, 'utf8') > 72
  ) {
    return res.status(400).json({
      success: false,
      message: 'A valid reset link and a password of 12 to 72 UTF-8 bytes are required.'
    });
  }

  try {
    const tokenHash = hashPasswordResetToken(token);
    const passwordHash = await bcrypt.hash(password, 12);
    const updated = await dbAdapter.resetUserPassword(tokenHash, passwordHash);
    if (!updated) {
      return res.status(400).json({
        success: false,
        message: 'This password reset link is invalid or has expired. Request a new link to continue.'
      });
    }

    return res.json({ success: true, message: 'Your password has been reset. You can now sign in.' });
  } catch (error) {
    console.error('[Auth] Password reset failed:', error.message);
    return res.status(503).json({
      success: false,
      message: 'Password reset is temporarily unavailable. Please try again shortly.'
    });
  }
});

/**
 * GET /api/auth/users and /api/users
 */
router.get(['/users', '/'], verifyToken, requireAdmin, async (req, res) => {
  try {
    const users = await dbAdapter.find('users');
    const sanitized = users.map(u => ({
      id: u.id || u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      designation: u.designation || '',
      phone: u.phone,
      verified: u.verified,
      createdAt: u.createdAt
    }));
    res.json({ success: true, data: sanitized, users: sanitized });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/auth/users and /api/users
 * Create a new staff or user account
 */
router.post(['/users', '/'], verifyToken, requireAdmin, async (req, res) => {
  try {
    const { name, email, password, role, phone, designation, verified } = req.body || {};
    if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || password.length < 12) {
      return res.status(400).json({ success: false, error: 'A valid email address and password of at least 12 characters are required.' });
    }

    const normEmail = email.toLowerCase().trim();
    const allUsers = await dbAdapter.find('users');
    const existing = allUsers.find(u => u.email && u.email.toLowerCase() === normEmail);
    if (existing) {
      return res.status(400).json({ success: false, error: 'An account with this email already exists.' });
    }

    const newUser = {
      id: `USR-${Date.now()}`,
      name: (name || 'Staff Member').trim(),
      email: normEmail,
      password,
      role: role || 'teacher',
      phone: phone || '',
      designation: designation || '',
      verified: verified !== false,
      createdAt: new Date().toISOString()
    };

    const created = await dbAdapter.create('users', newUser);
    res.json({ success: true, message: 'User account created successfully.', data: created });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/auth/users/:id and /api/users/:id
 * Update user account details or change role (SuperAdmin, Teacher, Tech Lead, Developer, Student, etc.)
 */
router.put(['/users/:id', '/:id'], verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, name, email, phone, status, verified, designation, password } = req.body || {};

    const updateData = {};
    if (role !== undefined) updateData.role = role;
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email.toLowerCase().trim();
    if (phone !== undefined) updateData.phone = phone;
    if (status !== undefined) updateData.status = status;
    if (verified !== undefined) updateData.verified = verified;
    if (designation !== undefined) updateData.designation = designation;
    if (password !== undefined) {
      if (typeof password !== 'string' || password.length < 12) {
        return res.status(400).json({ success: false, error: 'Password must be at least 12 characters.' });
      }
      updateData.password = await bcrypt.hash(password, 12);
    }

    const allUsers = await dbAdapter.find('users');
    const user = allUsers.find(u => u.id === id || u._id === id || u.email === id);
    const targetKey = user ? (user.id || user._id) : id;

    const updated = await dbAdapter.update('users', targetKey, updateData);
    res.json({
      success: true,
      message: `User ${id} updated successfully.`,
      data: updated || { id: targetKey, ...updateData }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/auth/users/:id and /api/users/:id
 */
router.delete(['/users/:id', '/:id'], verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await dbAdapter.delete('users', id);
    res.json({ success: true, message: `User ${id} removed successfully.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/auth/me
 */
router.get('/me', verifyToken, async (req, res) => {
  res.json({ success: true, data: req.user });
});

export default router;
