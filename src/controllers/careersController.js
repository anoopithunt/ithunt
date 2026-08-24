import db from '../config/db.js';
import { successResponse, errorResponse } from '../utils/helpers.js';

export function applyJob(req, res) {
  try {
    const { name, email, phone, position, experience, resumeLink, portfolioUrl } = req.body;

    if (!name || !email || !phone || !position) {
      return errorResponse(res, 'Name, email, phone, and position applied for are required', 400);
    }

    const application = db.insert('careers', {
      name,
      email,
      phone,
      position,
      experience: experience || 'Entry Level / Fresher',
      resumeLink: resumeLink || '',
      portfolioUrl: portfolioUrl || '',
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString()
    });

    return successResponse(res, 'Job application submitted successfully. IT HUNT team will contact you soon.', {
      application
    }, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
}

export function getAllApplications(req, res) {
  const applications = db.getCollection('careers');
  return successResponse(res, 'Job applications retrieved successfully', {
    applications,
    totalCount: applications.length
  });
}

export function updateApplicationStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return errorResponse(res, 'Status field is required', 400);
  }

  const updated = db.updateById('careers', id, { status });
  if (!updated) {
    return errorResponse(res, 'Job application not found', 404);
  }

  return successResponse(res, 'Job application status updated', { application: updated });
}

export function deleteApplication(req, res) {
  const { id } = req.params;
  const deleted = db.deleteById('careers', id);
  if (!deleted) {
    return errorResponse(res, 'Job application not found', 404);
  }
  return successResponse(res, 'Job application deleted successfully');
}
