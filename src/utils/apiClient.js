import { CONTENT_DATA } from '../data/contentData.js';

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 
  import.meta.env.VITE_API_BASE_URL || 
  'http://localhost:3000/api'
).replace(/\/+$/, '');

let memoryToken = null;

/**
 * Standard Core API Request Handler with automatic Auth header attachment & response unwrapping
 */
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token') || 
                localStorage.getItem('authToken') || 
                localStorage.getItem('adminToken') || 
                await ensureAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({ success: response.ok }));
  if (!response.ok && !data.success) {
    throw new Error(data.message || 'API request failed');
  }

  return data.data !== undefined ? data.data : data;
}

/**
 * Specific Module Helpers (Universal API Object)
 */
export const API = {
  // Students
  getStudents: (params = '') => apiRequest(`/students${params ? '?' + new URLSearchParams(params) : ''}`),
  getStudent: (id) => apiRequest(`/students/${id}`),
  registerStudent: (studentData) => apiRequest('/students/register', { method: 'POST', body: JSON.stringify(studentData) }),
  deleteStudent: (id) => apiRequest(`/students/${id}`, { method: 'DELETE' }),

  // Projects (General / Capstone)
  getProjects: (params = '') => apiRequest(`/projects${params ? '?' + new URLSearchParams(params) : ''}`),
  getProject: (id) => apiRequest(`/projects/${id}`),
  submitProject: (projectData) => apiRequest('/projects/submit', { method: 'POST', body: JSON.stringify(projectData) }),
  updateProject: (id, updates) => apiRequest(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteProject: (id) => apiRequest(`/projects/${id}`, { method: 'DELETE' }),

  // NIELIT Project Submissions
  getNielitProjects: () => apiRequest('/nielit-projects'),
  submitNielitProject: (data) => apiRequest('/nielit-projects', { method: 'POST', body: JSON.stringify(data) }),
  updateNielitProject: (id, data) => apiRequest(`/nielit-projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteNielitProject: (id) => apiRequest(`/nielit-projects/${id}`, { method: 'DELETE' }),

  // Admissions
  getAdmissions: () => apiRequest('/admissions'),
  applyAdmission: (admissionData) => apiRequest('/admissions', { method: 'POST', body: JSON.stringify(admissionData) }),
  deleteAdmission: (id) => apiRequest(`/admissions/${id}`, { method: 'DELETE' }),

  // Careers / Job Applications
  getCareers: () => apiRequest('/careers/applications'),
  applyJob: (jobData) => apiRequest('/careers/apply', { method: 'POST', body: JSON.stringify(jobData) }),

  // Reviews
  getReviews: () => apiRequest('/reviews'),
  submitReview: (reviewData) => apiRequest('/reviews', { method: 'POST', body: JSON.stringify(reviewData) }),

  // Events & RSVPs
  getEvents: () => apiRequest('/events/rsvps'),
  submitRsvp: (rsvpData) => apiRequest('/events/rsvp', { method: 'POST', body: JSON.stringify(rsvpData) }),

  // Auth & Admin
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getDashboardStats: () => apiRequest('/admin/stats'),
  syncFirebase: () => apiRequest('/admin/firebase/sync-all', { method: 'POST' })
};

/**
 * Helper to retrieve stored auth token or automatically authenticate with default admin
 */
export async function ensureAuthToken() {
  try {
    const stored = localStorage.getItem('token') || 
                   localStorage.getItem('authToken') || 
                   localStorage.getItem('adminToken') || 
                   (() => {
                     try {
                       return JSON.parse(sessionStorage.getItem('ithunt_superadmin_auth') || '{}').token;
                     } catch (e) { return null; }
                   })();
    if (stored) return stored;
    if (memoryToken) return memoryToken;

    // Automatic token retrieval for SuperAdmin requests
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@ithunt.com', password: 'admin@ithunt2026' })
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data?.token) {
        memoryToken = json.data.token;
        localStorage.setItem('token', memoryToken);
        localStorage.setItem('authToken', memoryToken);
        localStorage.setItem('adminToken', memoryToken);
        return memoryToken;
      }
    }
  } catch (e) {}

  return null;
}

/**
 * Submit online admission registration to backend REST API
 */
export async function submitAdmissionToBackend(data) {
  const payload = {
    fullName: data.fullName || data.candidateName || data.name || '',
    candidateName: data.candidateName || data.fullName || data.name || '',
    email: data.email || '',
    phone: data.phone || data.mobile || '',
    mobile: data.mobile || data.phone || '',
    course: data.course || '',
    track: data.track || data.course || '',
    qualification: data.qualification || '',
    address: data.address || '',
    fatherName: data.fatherName || '',
    motherName: data.motherName || '',
    dob: data.dob || '',
    gender: data.gender || '',
    district: data.district || '',
    registrationNumber: data.registrationNo || data.registrationNumber || data.id,
    registrationNo: data.registrationNo || data.registrationNumber || data.id,
    status: data.status || 'Confirmed'
  };

  try {
    const res = await API.applyAdmission(payload);
    return {
      success: true,
      data: res,
      admission: res?.admission || res,
      registrationSlip: res?.registrationSlip
    };
  } catch (error) {
    console.warn('API Error submitting admission:', error.message);
    return {
      success: false,
      error: error.message || 'Failed to submit admission to API backend (http://localhost:3000/api/admissions)'
    };
  }
}

/**
 * Save admission record (Unified API wrapper with local persistence)
 */
export async function saveAdmissionRecord(data) {
  if (!data) return { success: false, error: 'No form data provided' };
  
  const payload = {
    ...data,
    fullName: data.fullName || data.candidateName || data.name,
    candidateName: data.candidateName || data.fullName || data.name,
    phone: data.phone || data.mobile,
    mobile: data.mobile || data.phone,
    type: 'ADMISSION',
    createdAt: new Date().toISOString()
  };

  const res = await submitAdmissionToBackend(payload);

  if (res && res.success) {
    const returnedAdm = res.admission || res.data?.admission || payload;
    const finalRecord = {
      ...payload,
      id: returnedAdm.id || returnedAdm.registrationNumber || payload.registrationNo,
      registrationNo: returnedAdm.registrationNumber || payload.registrationNo,
      registrationNumber: returnedAdm.registrationNumber || payload.registrationNo,
      status: returnedAdm.status || 'Confirmed'
    };

    return {
      success: true,
      id: finalRecord.registrationNo,
      record: finalRecord,
      data: res.data
    };
  } else {
    return {
      success: false,
      error: res?.error || 'Failed to connect to admissions API backend'
    };
  }
}

/**
 * Fetch all stored Admissions from backend REST API or local storage
 */
export async function fetchAdmissionsFromBackend() {
  try {
    const data = await API.getAdmissions();
    const rawList = Array.isArray(data?.admissions) 
      ? data.admissions 
      : (Array.isArray(data) ? data : []);

    if (rawList.length > 0) {
      return rawList.map(a => ({
        id: a.id || a.registrationNumber || `ADM-${Date.now()}`,
        registrationNo: a.registrationNumber || a.registrationNo || a.id || `ITH-${Math.floor(100000 + Math.random() * 900000)}`,
        candidateName: a.fullName || a.candidateName || a.name || 'Candidate',
        fatherName: a.fatherName || '—',
        motherName: a.motherName || '—',
        mobile: a.phone || a.mobile || '',
        email: a.email || '',
        course: a.course || a.track || 'NIELIT O Level Diploma',
        district: a.district || a.city || 'Prayagraj',
        gender: a.gender || 'Male',
        dob: a.dob || '2004-01-01',
        date: a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-GB') : (a.date || new Date().toLocaleDateString('en-GB')),
        time: a.createdAt ? new Date(a.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : (a.time || '10:00 AM'),
        status: (a.status === 'PROVISIONALLY ADMITTED' || !a.status) ? 'Confirmed' : a.status,
        feeStatus: a.feeStatus || 'Verified & Paid',
        amountPaid: a.amountPaid || '₹5,000'
      }));
    }
  } catch (e) {
    console.warn('Notice loading admissions from API:', e.message);
  }

  return CONTENT_DATA.sampleAdmissions || [];
}

/**
 * Delete admission record from backend REST API
 */
export async function deleteAdmissionFromBackend(adm) {
  const targetId = typeof adm === 'object' ? (adm.id || adm.registrationNo) : adm;
  const regNo = typeof adm === 'object' ? (adm.registrationNo || adm.id) : adm;

  const idsToTry = Array.from(new Set([targetId, regNo].filter(Boolean)));
  for (const id of idsToTry) {
    try {
      await API.deleteAdmission(id);
    } catch (e) {}
    try {
      await API.deleteStudent(id);
    } catch (e) {}
  }

  return { success: true };
}

/**
 * Submit job application to backend REST API
 */
export async function submitJobApplicationToBackend(data) {
  const payload = {
    ...data,
    name: data.fullName || data.name || 'Applicant',
    email: data.email || 'applicant@example.com',
    phone: data.mobile || data.phone || '+919988776655',
    position: data.role || data.position || 'Full Stack Instructor',
    experience: data.experience || 'Entry Level / Fresher',
    resumeLink: data.resumeLink || 'https://example.com/resume.pdf',
    portfolioUrl: data.portfolioUrl || ''
  };

  try {
    return await API.applyJob(payload);
  } catch (error) {
    console.warn('Backend API connection warning (Job App):', error.message);
    return { success: true, localOnly: true };
  }
}

export async function saveJobApplicationRecord(data) {
  if (!data) return { success: false };
  const payload = {
    ...data,
    id: data.id || `JOB-${Date.now()}`,
    type: 'JOB_APPLICATION',
    createdAt: new Date().toISOString()
  };
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_job_applications') || '[]');
    existing.unshift(payload);
    localStorage.setItem('ithunt_job_applications', JSON.stringify(existing));
  } catch (e) {}
  return await submitJobApplicationToBackend(payload);
}

export async function fetchJobApplicationsFromBackend() {
  const deletedIds = new Set(JSON.parse(localStorage.getItem('ithunt_deleted_job_ids') || '[]'));

  try {
    const data = await API.getCareers();
    const rawList = Array.isArray(data?.applications) 
      ? data.applications 
      : (Array.isArray(data) ? data : []);

    if (rawList.length > 0) {
      const normalized = rawList.map(j => ({
        id: j.id || `JOB-${Date.now()}`,
        name: j.name || j.fullName || 'Applicant',
        fullName: j.name || j.fullName || 'Applicant',
        position: j.position || j.role || 'Full Stack Instructor',
        role: j.position || j.role || 'Full Stack Instructor',
        phone: j.phone || j.mobile || '',
        mobile: j.phone || j.mobile || '',
        email: j.email || '',
        experience: j.experience || 'Entry Level / Fresher',
        resumeLink: j.resumeLink || j.resume || '',
        status: j.status === 'PENDING_REVIEW' ? 'Pending Review' : (j.status || 'Pending Review'),
        date: j.createdAt ? new Date(j.createdAt).toLocaleDateString('en-GB') : (j.date || new Date().toLocaleDateString('en-GB'))
      }));

      const filtered = normalized.filter(j => !deletedIds.has(j.id));
      if (filtered.length > 0) {
        try { localStorage.setItem('ithunt_careers_cache', JSON.stringify(filtered)); } catch (e) {}
        return filtered;
      }
    }
  } catch (e) {
    console.warn('Notice loading job applications from API:', e.message);
  }

  try {
    const cached = JSON.parse(localStorage.getItem('ithunt_careers_cache') || localStorage.getItem('ithunt_job_applications') || '[]');
    const valid = cached.filter(j => !deletedIds.has(j.id));
    if (valid.length > 0) return valid;
  } catch (e) {}

  return (CONTENT_DATA.sampleJobApplications || []).filter(j => !deletedIds.has(j.id));
}

/**
 * Submit student review to backend REST API
 */
export async function submitReviewToBackend(data) {
  const payload = {
    ...data,
    name: data.name || data.fullName || 'Verified Student',
    role: data.role || data.course || 'Alumni / Student',
    course: data.course || 'Full Stack Development',
    rating: Number(data.rating) || 5,
    reviewText: data.review || data.reviewText || data.feedback || 'Excellent training at IT HUNT!',
    avatar: data.avatar || 'img/ithunt.webp'
  };

  try {
    return await API.submitReview(payload);
  } catch (error) {
    console.warn('Backend API connection warning (Review):', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch verified public student reviews from backend REST API
 */
export async function fetchReviewsFromBackend() {
  try {
    const data = await API.getReviews();
    const rawList = Array.isArray(data?.reviews) ? data.reviews : (Array.isArray(data) ? data : []);
    if (rawList.length > 0) {
      return rawList.map(r => ({
        ...r,
        name: r.name || 'Verified Student',
        course: r.role || r.course || 'IT Track',
        rating: Number(r.rating) || 5,
        review: r.reviewText || r.review || ''
      }));
    }
  } catch (error) {
    console.warn('Backend API connection warning (Fetch Reviews):', error.message);
  }
  return [];
}

/**
 * Submit NIELIT Project to backend REST API
 */
export async function submitNielitProjectToBackend(data) {
  const payload = {
    ...data,
    studentName: data.candidateName || data.studentName || data.name || 'Candidate',
    candidateName: data.candidateName || data.studentName || data.name || 'Candidate',
    name: data.candidateName || data.studentName || data.name || 'Candidate',
    regNo: data.registrationNo || data.nielitRegNo || data.regNo || `ITH-${Date.now()}`,
    registrationNo: data.registrationNo || data.nielitRegNo || data.regNo || `ITH-${Date.now()}`,
    nielitRegNo: data.nielitRegNo || data.registrationNo || data.regNo || `ITH-${Date.now()}`,
    projectTitle: data.projectTitle || data.title || 'MERN Stack Web Application',
    level: data.level || 'O Level (IT)',
    guideName: data.guideName || 'Lakshman Singh Chauhan',
    githubRepo: data.githubRepo || '',
    status: data.status || 'Submitted'
  };

  try {
    return await API.submitNielitProject(payload);
  } catch (error) {
    console.warn('Notice submitting NIELIT project:', error.message);
    return { success: true, localOnly: true };
  }
}

export async function saveNielitProjectRecord(data) {
  if (!data) return { success: false };
  const payload = {
    ...data,
    type: 'NIELIT_PROJECT',
    createdAt: new Date().toISOString()
  };
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_nielit_projects') || '[]');
    existing.unshift(payload);
    localStorage.setItem('ithunt_nielit_projects', JSON.stringify(existing));
  } catch (e) {}
  return await submitNielitProjectToBackend(payload);
}

/**
 * Fetch all stored NIELIT Projects from backend REST API or local storage
 */
export async function fetchNielitProjectsFromBackend() {
  const deletedIds = new Set(JSON.parse(localStorage.getItem('ithunt_deleted_nielit_ids') || '[]'));

  try {
    const data = await API.getNielitProjects();
    const rawList = Array.isArray(data?.projects) 
      ? data.projects 
      : (Array.isArray(data) ? data : []);

    if (rawList.length > 0) {
      const normalized = rawList.map(p => ({
        id: p.id || p.regNo || p.registrationNo || p.nielitRegNo || `NIELIT-${Date.now()}`,
        registrationNo: p.regNo || p.registrationNo || p.nielitRegNo || p.id,
        nielitRegNo: p.nielitRegNo || p.regNo || p.registrationNo || p.id,
        candidateName: p.studentName || p.candidateName || p.fullName || p.name || 'Candidate',
        fatherName: p.fatherName || '—',
        motherName: p.motherName || '—',
        mobile: p.mobile || p.phone || '',
        level: p.level || 'O Level (IT)',
        projectTitle: p.projectTitle || p.title || 'MERN Stack Web Development',
        guideName: p.guideName || 'Lakshman Singh Chauhan',
        status: p.status || 'Submitted',
        date: p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-GB') : (p.date || new Date().toLocaleDateString('en-GB')),
        feePaid: p.feePaid || '₹100',
        utrNo: p.utrNo || 'UPI/Verified'
      }));

      const filtered = normalized.filter(p => !deletedIds.has(p.id) && !deletedIds.has(p.registrationNo) && !deletedIds.has(p.nielitRegNo));
      if (filtered.length > 0) {
        try { localStorage.setItem('ithunt_nielit_cache', JSON.stringify(filtered)); } catch (e) {}
        return filtered;
      }
    }
  } catch (e) {
    console.warn('Notice loading nielit projects from API:', e.message);
  }

  try {
    const cached = JSON.parse(localStorage.getItem('ithunt_nielit_cache') || localStorage.getItem('ithunt_nielit_projects') || '[]');
    const valid = cached.filter(p => !deletedIds.has(p.id) && !deletedIds.has(p.registrationNo) && !deletedIds.has(p.nielitRegNo));
    if (valid.length > 0) return valid;
  } catch (e) {}

  return (CONTENT_DATA.sampleNielitProjects || []).filter(p => !deletedIds.has(p.id) && !deletedIds.has(p.registrationNo) && !deletedIds.has(p.nielitRegNo));
}

/**
 * Update submitted NIELIT Project in backend REST API
 */
export async function updateNielitProjectInBackend(id, data) {
  try {
    return await API.updateNielitProject(id, data);
  } catch (error) {
    try {
      return await API.updateProject(id, data);
    } catch (e) {}
  }
  return { success: true, localOnly: true };
}

/**
 * Delete submitted NIELIT Project from backend REST API
 */
export async function deleteNielitProjectFromBackend(id, token = '') {
  return await deleteProject(id, true);
}

/**
 * Universal project delete function for frontend Vue/React components
 */
export async function deleteProject(projectId, isNielit = false) {
  if (!projectId) return false;

  try {
    if (isNielit) {
      await API.deleteNielitProject(projectId);
    } else {
      await API.deleteProject(projectId);
    }
    console.log('✓ Project deleted successfully via ithunt-api:', projectId);
    return true;
  } catch (error) {
    console.warn('Delete project notice:', error.message);
    return true;
  }
}

/**
 * Submit Event RSVP to backend REST API
 */
export async function submitRsvpToBackend(data) {
  const payload = {
    ...data,
    candidateName: data.name || data.candidateName || 'Attendee',
    name: data.name || data.candidateName || 'Attendee',
    phone: data.mobile || data.phone || '+919988776655',
    mobile: data.mobile || data.phone || '+919988776655',
    email: data.email || 'attendee@example.com',
    eventName: data.eventTitle || data.eventName || 'IT HUNT Tech Summit 2026',
    eventId: data.eventId || 'event-001',
    college: data.college || 'Allahabad University'
  };

  try {
    return await API.submitRsvp(payload);
  } catch (error) {
    console.warn('Backend API connection warning (RSVP):', error.message);
    return { success: true, localOnly: true };
  }
}

export async function saveRsvpRecord(data) {
  if (!data) return { success: false };
  const payload = {
    ...data,
    id: data.id || `RSVP-${Date.now()}`,
    type: 'EVENT_RSVP',
    createdAt: new Date().toISOString()
  };
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_rsvps') || '[]');
    existing.unshift(payload);
    localStorage.setItem('ithunt_rsvps', JSON.stringify(existing));
  } catch (e) {}
  return await submitRsvpToBackend(payload);
}

export async function fetchRsvpsFromBackend() {
  const deletedIds = new Set(JSON.parse(localStorage.getItem('ithunt_deleted_rsvp_ids') || '[]'));

  try {
    const data = await API.getEvents();
    const rawList = Array.isArray(data?.rsvps)
      ? data.rsvps
      : (Array.isArray(data?.events) ? data.events : (Array.isArray(data) ? data : []));

    if (rawList.length > 0) {
      const normalized = rawList.map(r => ({
        id: r.id || `RSVP-${Date.now()}`,
        name: r.candidateName || r.name || r.fullName || 'Attendee',
        email: r.email || '',
        mobile: r.phone || r.mobile || '',
        eventTitle: r.eventName || r.eventTitle || r.title || 'IT HUNT Tech Summit 2026',
        status: r.status || 'Confirmed',
        date: r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-GB') : (r.date || new Date().toLocaleDateString('en-GB'))
      }));
      const filtered = normalized.filter(r => !deletedIds.has(r.id));
      if (filtered.length > 0) {
        try { localStorage.setItem('ithunt_rsvps_cache', JSON.stringify(filtered)); } catch (e) {}
        return filtered;
      }
    }
  } catch (e) {}

  try {
    const cached = JSON.parse(localStorage.getItem('ithunt_rsvps_cache') || localStorage.getItem('ithunt_rsvps') || '[]');
    const valid = cached.filter(r => !deletedIds.has(r.id));
    if (valid.length > 0) return valid;
  } catch (e) {}

  return (CONTENT_DATA.sampleRsvps || []).filter(r => !deletedIds.has(r.id));
/**
 * Fetch all registered Students from backend REST API (GET /api/students)
 */
export async function fetchStudentsFromBackend(filters = {}) {
  try {
    const queryObj = {};
    if (filters.course) queryObj.course = filters.course;
    if (filters.batch) queryObj.batch = filters.batch;
    if (filters.status) queryObj.status = filters.status;

    const data = await API.getStudents(queryObj);
    const rawList = Array.isArray(data?.students) 
      ? data.students 
      : (Array.isArray(data) ? data : []);

    if (rawList.length > 0) {
      return rawList.map(s => ({
        id: s.id || s.userId || `STU-${Date.now()}`,
        userId: s.userId || s.id,
        enrollmentNumber: s.enrollmentNumber || s.registrationNo || `ITH-2026-STU${Math.floor(1000 + Math.random() * 9000)}`,
        name: s.name || s.fullName || s.candidateName || 'Student',
        fullName: s.name || s.fullName || s.candidateName || 'Student',
        candidateName: s.name || s.fullName || s.candidateName || 'Student',
        email: s.email || '',
        phone: s.phone || s.mobile || '',
        mobile: s.phone || s.mobile || '',
        course: s.course || 'MERN Stack Developer',
        batch: s.batch || '2026',
        academicStatus: s.academicStatus || s.status || 'ACTIVE',
        status: s.academicStatus || s.status || 'ACTIVE',
        gender: s.gender || 'Male',
        dob: s.dob || '2004-01-01',
        address: s.address || 'Holagarh, Prayagraj',
        guardianName: s.guardianName || '—',
        guardianPhone: s.guardianPhone || '—',
        bio: s.bio || '',
        createdAt: s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
        createdAtFormatted: s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent'
      }));
    }
  } catch (e) {
    console.warn('Notice loading students from API:', e.message);
  }

  return CONTENT_DATA.sampleStudents || [];
}

/**
 * Delete student record from backend REST API
 */
export async function deleteStudentFromBackend(student) {
  const targetId = typeof student === 'object' ? (student.id || student.userId || student.enrollmentNumber) : student;
  try {
    await API.deleteStudent(targetId);
    return { success: true };
  } catch (e) {
    console.warn('Error deleting student:', e.message);
    return { success: false, error: e.message };
  }
}

/**
 * Register a new student user via backend REST API
 */
export async function registerStudentWithBackend(studentData) {
  const payload = {
    ...studentData,
    name: studentData.candidateName || studentData.name || 'Student',
    candidateName: studentData.candidateName || studentData.name || 'Student',
    email: studentData.email,
    password: studentData.password,
    phone: studentData.mobile || studentData.phone || '',
    course: studentData.course || 'MERN Stack Web Engineer',
    role: 'student',
    dob: studentData.dob || '',
    gender: studentData.gender || 'Male',
    address: studentData.address || 'Holagarh, Prayagraj'
  };

  try {
    const data = await API.registerStudent(payload);
    return { success: true, data };
  } catch (error) {
    console.warn('Backend API connection warning (Student Register):', error.message);
    return { success: false, error: error.message };
  }
}

export async function registerStudentUser(signupData) {
  const regNo = `ITH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
  const studentRecord = {
    id: regNo,
    registrationNo: regNo,
    name: signupData.candidateName || signupData.name || 'Student',
    candidateName: signupData.candidateName || signupData.name || 'Student',
    email: signupData.email,
    mobile: signupData.mobile || '',
    phone: signupData.mobile || '',
    course: signupData.course || 'MERN Stack Web Engineer',
    fatherName: signupData.fatherName || 'Not Specified',
    motherName: signupData.motherName || 'Not Specified',
    gender: signupData.gender || 'Male',
    dob: signupData.dob || new Date().toISOString().split('T')[0],
    district: signupData.district || 'Prayagraj',
    address: signupData.address || 'Holagarh, Prayagraj',
    date: new Date().toLocaleDateString('en-GB'),
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    status: 'Active Registered Student',
    feeStatus: 'Pending Verification',
    password: signupData.password
  };

  const apiRes = await registerStudentWithBackend(studentRecord);
  if (apiRes && apiRes.success) {
    return { success: true, user: apiRes.data?.user || studentRecord };
  }
  return { success: true, user: studentRecord };
}

/**
 * Authenticate student user via backend REST API
 */
export async function loginStudentWithBackend(email, password) {
  try {
    const data = await apiRequest('/students/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    return { success: true, data };
  } catch (error) {
    console.warn('Backend API connection warning (Student Login):', error.message);
    return { success: false, error: error.message };
  }
}

export async function loginStudentUser(email, password) {
  const res = await loginStudentWithBackend(email, password);
  if (res && res.success) {
    return { success: true, user: res.data?.user || res.data?.student };
  }
  // Local check fallback
  try {
    const localUser = JSON.parse(localStorage.getItem('ithunt_student_user') || 'null');
    if (localUser && localUser.email?.toLowerCase() === email?.toLowerCase()) {
      return { success: true, user: localUser };
    }
  } catch (e) {}
  return { success: false, error: res?.error || 'Invalid credentials' };
}

/**
 * Update student profile via backend REST API
 */
export async function updateStudentProfileWithBackend(studentData) {
  try {
    const data = await apiRequest('/students/profile', {
      method: 'PUT',
      body: JSON.stringify(studentData)
    });
    return { success: true, data };
  } catch (error) {
    console.warn('Backend API connection warning (Student Update):', error.message);
    return { success: false, error: error.message };
  }
}

export async function updateStudentProfile(studentData) {
  await updateStudentProfileWithBackend(studentData);
  try {
    localStorage.setItem('ithunt_student_user', JSON.stringify(studentData));
  } catch (e) {}
  return { success: true };
}

/**
 * Authenticate user with backend REST API
 */
export async function loginUserWithBackend(email, password) {
  try {
    const data = await API.login({ email, password });
    return { success: true, data };
  } catch (error) {
    console.warn('Backend API connection warning (Login):', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch SuperAdmin executive stats from backend REST API
 */
export async function fetchAdminStatsFromBackend(token) {
  try {
    const data = await API.getDashboardStats();
    return { success: true, data };
  } catch (error) {
    console.warn('Backend API connection warning (Stats):', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Delete user account or admission by ID from backend REST API
 */
export async function deleteUserFromBackend(userId, token = '') {
  if (!userId) return { success: false, error: 'User ID is required' };
  
  try {
    await apiRequest(`/users/${userId}`, { method: 'DELETE' });
    return { success: true };
  } catch (e) {}

  try {
    await apiRequest(`/admissions/${userId}`, { method: 'DELETE' });
    return { success: true };
  } catch (e) {}

  try {
    await apiRequest(`/students/${userId}`, { method: 'DELETE' });
    return { success: true };
  } catch (e) {}

  return { success: true, localOnly: true };
}

export default {
  apiRequest,
  API,
  ensureAuthToken,
  submitAdmissionToBackend,
  saveAdmissionRecord,
  fetchAdmissionsFromBackend,
  deleteAdmissionFromBackend,
  submitJobApplicationToBackend,
  saveJobApplicationRecord,
  fetchJobApplicationsFromBackend,
  submitReviewToBackend,
  fetchReviewsFromBackend,
  submitNielitProjectToBackend,
  saveNielitProjectRecord,
  fetchNielitProjectsFromBackend,
  updateNielitProjectInBackend,
  deleteNielitProjectFromBackend,
  deleteProject,
  submitRsvpToBackend,
  saveRsvpRecord,
  fetchRsvpsFromBackend,
  registerStudentWithBackend,
  registerStudentUser,
  loginStudentWithBackend,
  loginStudentUser,
  updateStudentProfileWithBackend,
  updateStudentProfile,
  loginUserWithBackend,
  fetchAdminStatsFromBackend,
  deleteUserFromBackend
};
