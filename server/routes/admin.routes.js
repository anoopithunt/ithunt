import { Router } from 'express';
import { dbAdapter, MODELS } from '../services/dbAdapter.js';
import { isMongoConnected } from '../config/db.js';
import { SystemSetting } from '../models/SystemSetting.js';
import { requireAdmin, verifyToken } from '../middleware/auth.js';

const router = Router();
const ROLE_PERMISSION_SETTING_KEY = 'role-permissions';
const PERMISSION_ROLES = [
  'admin', 'superadmin', 'teacher', 'faculty', 'tech-lead', 'developer',
  'senior-developer', 'student', 'intern', 'staff', 'accountant'
];
const PERMISSION_TABS = [
  'overview', 'students', 'student-exams', 'admissions', 'courses', 'nielit',
  'internships', 'events', 'careers', 'reviews', 'fees', 'certificates',
  'projects', 'contact', 'users', 'settings'
];

router.get('/role-permissions', verifyToken, async (req, res) => {
  try {
    const setting = await SystemSetting.findOne({ key: ROLE_PERMISSION_SETTING_KEY }).lean();
    const role = String(req.user?.roleType || req.user?.role || '').toLowerCase();
    const isAdmin = role === 'admin' || role === 'superadmin';
    const permissions = setting?.value || null;
    res.json({
      success: true,
      data: { permissions: isAdmin || !permissions ? permissions : { [role]: permissions[role] || {} } }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/role-permissions', verifyToken, requireAdmin, async (req, res) => {
  try {
    const permissions = req.body?.permissions;
    if (!permissions || typeof permissions !== 'object' || Array.isArray(permissions)) {
      return res.status(400).json({ success: false, message: 'A role permission map is required.' });
    }

    const normalized = {};
    for (const role of PERMISSION_ROLES) {
      const rolePermissions = permissions[role];
      if (!rolePermissions || typeof rolePermissions !== 'object' || Array.isArray(rolePermissions)) {
        return res.status(400).json({ success: false, message: `Permissions are required for ${role}.` });
      }

      normalized[role] = {};
      for (const tab of PERMISSION_TABS) {
        const access = rolePermissions[tab];
        const view = role === 'admin' || role === 'superadmin' || access?.view === true;
        const edit = role === 'admin' || role === 'superadmin' || (view && access?.edit === true);
        normalized[role][tab] = { view, edit };
      }
    }

    const setting = await SystemSetting.findOneAndUpdate(
      { key: ROLE_PERMISSION_SETTING_KEY },
      { $set: { value: normalized } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    res.json({ success: true, data: { permissions: setting.value } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/admin/stats
 */
router.get('/stats', async (req, res) => {
  try {
    const [
      studentsCount,
      admissionsCount,
      nielitCount,
      careersCount,
      internshipsCount,
      reviewsCount,
      feesCount,
      certificatesCount,
      projectsCount,
      contactCount
    ] = await Promise.all([
      dbAdapter.count('students'),
      dbAdapter.count('admissions'),
      dbAdapter.count('nielit_projects'),
      dbAdapter.count('job_applications'),
      dbAdapter.count('internships'),
      dbAdapter.count('reviews'),
      dbAdapter.count('fees'),
      dbAdapter.count('certificates'),
      dbAdapter.count('projects'),
      dbAdapter.count('contact')
    ]);

    const fees = await dbAdapter.find('fees');
    const totalRevenue = fees.reduce((sum, f) => {
      const num = parseInt(String(f.amount || '0').replace(/[^0-9]/g, ''), 10) || 0;
      return sum + num;
    }, 0);

    res.json({
      success: true,
      data: {
        students: studentsCount,
        admissions: admissionsCount,
        nielitProjects: nielitCount,
        jobApplications: careersCount,
        internships: internshipsCount,
        reviews: reviewsCount,
        fees: feesCount,
        certificates: certificatesCount,
        projects: projectsCount,
        contactInquiries: contactCount,
        totalRevenue: `₹${totalRevenue.toLocaleString('en-IN')}`,
        systemStatus: {
          database: {
            connected: isMongoConnected(),
            name: 'ithunt',
            engine: 'MongoDB'
          },
          uptime: process.uptime(),
          timestamp: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/admin/users
 */
router.get('/users', verifyToken, async (req, res) => {
  try {
    const list = await dbAdapter.find('users');
    const safeUsers = list.map(u => {
      const { password, ...rest } = u;
      return rest;
    });
    res.json({ success: true, data: safeUsers, users: safeUsers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
