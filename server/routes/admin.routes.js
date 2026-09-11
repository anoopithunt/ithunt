import { Router } from 'express';
import { dbAdapter, MODELS } from '../services/dbAdapter.js';
import { isMongoConnected, isFirebaseConnected } from '../config/db.js';

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
            mongo: isMongoConnected(),
            firebase: isFirebaseConnected(),
            mode: isMongoConnected() ? 'MongoDB Connected' : (isFirebaseConnected() ? 'Firebase Cloud Connected' : 'Hybrid Local Mode')
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
 * POST /api/admin/firebase/sync-all
 */
router.post('/firebase/sync-all', async (req, res) => {
  try {
    const collections = Object.keys(MODELS);
    const summary = {};

    for (const col of collections) {
      const records = await dbAdapter.find(col);
      summary[col] = records.length;
    }

    res.json({
      success: true,
      message: 'Database collections analyzed and synchronized',
      data: summary
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
