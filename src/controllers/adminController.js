import db from '../config/db.js';
import { successResponse } from '../utils/helpers.js';

export function getDashboardStats(req, res) {
  const admissions = db.getCollection('admissions');
  const careers = db.getCollection('careers');
  const reviews = db.getCollection('reviews');
  const users = db.getCollection('users');
  const nielit = db.getCollection('nielitProjects');
  const events = db.getCollection('events');

  const stats = {
    totalAdmissions: admissions.length,
    provisionallyAdmitted: admissions.filter(a => a.status === 'PROVISIONALLY ADMITTED').length,
    pendingJobApplications: careers.filter(c => c.status === 'PENDING_REVIEW').length,
    totalJobApplications: careers.length,
    totalRegisteredStudents: users.filter(u => u.role === 'student').length,
    totalReviews: reviews.length,
    verifiedReviews: reviews.filter(r => r.verified).length,
    nielitProjectsSubmitted: nielit.length,
    eventRsvpsConfirmed: events.filter(e => e.status === 'CONFIRMED').length,
    systemStatus: 'ONLINE_ACTIVE'
  };

  return successResponse(res, 'SuperAdmin dashboard executive statistics generated', { stats });
}
