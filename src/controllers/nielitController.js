import db from '../config/db.js';
import { successResponse, errorResponse } from '../utils/helpers.js';

export function submitNielitProject(req, res) {
  try {
    const { studentName, regNo, projectTitle, level, guideName, githubRepo, status } = req.body;

    if (!studentName || !regNo || !projectTitle) {
      return errorResponse(res, 'Student name, registration number, and project title are required', 400);
    }

    const project = db.insert('nielitProjects', {
      studentName,
      regNo,
      projectTitle,
      level: level || 'O Level',
      guideName: guideName || 'Mr. Lakshman Singh Chauhan',
      githubRepo: githubRepo || '',
      status: status || 'SUBMITTED',
      createdAt: new Date().toISOString()
    });

    return successResponse(res, 'NIELIT Project record submitted successfully', { project }, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
}

export function getAllNielitProjects(req, res) {
  const projects = db.getCollection('nielitProjects');
  return successResponse(res, 'NIELIT Projects list retrieved', { projects, totalCount: projects.length });
}

export function updateNielitProjectStatus(req, res) {
  const { id } = req.params;
  const { status, remarks } = req.body;

  if (!status) {
    return errorResponse(res, 'Status is required', 400);
  }

  const updated = db.updateById('nielitProjects', id, { status, remarks: remarks || '' });
  if (!updated) {
    return errorResponse(res, 'NIELIT Project record not found', 404);
  }

  return successResponse(res, 'NIELIT project status updated successfully', { project: updated });
}
