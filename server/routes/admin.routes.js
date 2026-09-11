import { Router } from 'express';
import { dbAdapter, MODELS } from '../services/dbAdapter.js';
import { isMongoConnected } from '../config/db.js';

const router = Router();

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
router.get('/users', async (req, res) => {
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
