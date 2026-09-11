import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';
import { generateToken, verifyToken, requireAdmin } from '../middleware/auth.js';
import bcrypt from 'bcryptjs';

const router = Router();

/**
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const normEmail = email.toLowerCase().trim();

    // 1. Check Default Super Admin credentials
    if (
      (normEmail === 'admin@ithunt.com' || normEmail === 'admin') &&
      (password === 'admin@ithunt2026' || password === 'admin')
    ) {
      const adminUser = {
        id: 'usr-admin-default',
        name: 'IT HUNT Super Admin',
        email: 'admin@ithunt.com',
        role: 'superadmin',
        verified: true
      };
      const token = generateToken(adminUser);
      return res.json({
        success: true,
        message: 'Authentication successful',
        data: { token, user: adminUser }
      });
    }

    // 2. Check Database Users
    const user = await dbAdapter.findOne('users', { email: normEmail });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    let isMatch = false;
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = user.password === password;
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Incorrect password.' });
    }

    const safeUser = {
      id: user.id || user._id,
      name: user.name,
      email: user.email,
      role: user.role || 'student',
      registrationNo: user.registrationNo || '',
      verified: user.verified !== false
    };

    const token = generateToken(safeUser);
    res.json({
      success: true,
      message: 'Login successful',
      data: { token, user: safeUser }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Authentication error', error: error.message });
  }
});

/**
 * GET /api/auth/users
 */
router.get('/users', verifyToken, requireAdmin, async (req, res) => {
  try {
    const users = await dbAdapter.find('users');
    const sanitized = users.map(u => ({
      id: u.id || u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      phone: u.phone,
      verified: u.verified,
      createdAt: u.createdAt
    }));
    res.json({ success: true, data: sanitized });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/auth/users/:id
 */
router.delete('/users/:id', verifyToken, requireAdmin, async (req, res) => {
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
