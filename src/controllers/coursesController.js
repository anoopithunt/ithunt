import db from '../config/db.js';
import { successResponse, errorResponse } from '../utils/helpers.js';

export function getCourses(req, res) {
  const courses = db.getCollection('courses');
  return successResponse(res, 'Course catalog retrieved successfully', { courses, totalCount: courses.length });
}

export function createCourse(req, res) {
  const { title, category, duration, fee, description, featured } = req.body;
  if (!title || !category || !fee) {
    return errorResponse(res, 'Title, category, and fee are required', 400);
  }

  const course = db.insert('courses', {
    title,
    category,
    duration: duration || '3 Months',
    fee,
    description: description || '',
    featured: Boolean(featured)
  });

  return successResponse(res, 'New course added successfully', { course }, 201);
}

export function getInternships(req, res) {
  const internships = db.getCollection('internships');
  return successResponse(res, 'Internship tracks retrieved successfully', { internships, totalCount: internships.length });
}

export function createInternship(req, res) {
  const { title, stipend, duration, mode, skills, description } = req.body;
  if (!title || !duration) {
    return errorResponse(res, 'Title and duration are required', 400);
  }

  const internship = db.insert('internships', {
    title,
    stipend: stipend || 'Performance Based',
    duration,
    mode: mode || 'On-Campus',
    skills: Array.isArray(skills) ? skills : [],
    description: description || '',
    status: 'OPEN'
  });

  return successResponse(res, 'New internship track added successfully', { internship }, 201);
}
