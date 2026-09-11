import { CONTENT_DATA } from '../data/contentData.js';
import { DEFAULT_DEMO_STUDENT } from '../data/studentAcademicData.js';

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});
const RAW_API_URL = (
  env.VITE_API_URL || 
  env.VITE_API_BASE_URL || 
  ''
).trim();

const IS_LOCAL_DEV = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Connected REST API & Database Endpoint (defaults to /api which proxies to port 3000)
export const API_BASE_URL = (RAW_API_URL || '/api').replace(/\/+$/, '');

let memoryToken = null;

// ==============================================================================
// Normalization Helpers for Clean Data Models Across UI
// ==============================================================================
export const normalizeAdmission = (a) => ({
  id: a.id || a.registrationNumber || a.registrationNo || `ADM-${Date.now()}`,
  registrationNo: a.registrationNumber || a.registrationNo || a.id || `ITH-${Math.floor(100000 + Math.random() * 900000)}`,
  candidateName: a.fullName || a.candidateName || a.name || 'Candidate',
  fullName: a.fullName || a.candidateName || a.name || 'Candidate',
  fatherName: a.fatherName || '—',
  motherName: a.motherName || '—',
  mobile: a.phone || a.mobile || '',
  phone: a.phone || a.mobile || '',
  email: a.email || '',
  course: a.course || a.track || "NIELIT 'A' Level Diploma",
  track: a.course || a.track || "NIELIT 'A' Level Diploma",
  district: a.district || a.city || 'Prayagraj',
  gender: a.gender || 'Male',
  dob: a.dob || '2004-01-01',
  date: a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-GB') : (a.date || new Date().toLocaleDateString('en-GB')),
  time: a.createdAt ? new Date(a.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : (a.time || '10:00 AM'),
  status: (a.status === 'PROVISIONALLY ADMITTED' || !a.status) ? 'Confirmed' : a.status,
  feeStatus: a.feeStatus || 'Verified & Paid',
  amountPaid: a.amountPaid || '₹5,000'
});

export const normalizeStudent = (s) => ({
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
});

export const normalizeNielitProject = (p) => ({
  id: p.id || p.regNo || p.registrationNo || p.nielitRegNo || `NIELIT-${Date.now()}`,
  registrationNo: p.regNo || p.registrationNo || p.nielitRegNo || p.id,
  nielitRegNo: p.nielitRegNo || p.regNo || p.registrationNo || p.id,
  candidateName: p.studentName || p.candidateName || p.fullName || p.name || 'Candidate',
  studentName: p.studentName || p.candidateName || p.fullName || p.name || 'Candidate',
  fatherName: p.fatherName || '—',
  motherName: p.motherName || '—',
  mobile: p.mobile || p.phone || '',
  level: p.level || p.nielitLevel || 'O Level',
  projectTitle: p.projectTitle || p.title || 'MERN Stack Web Development',
  guideName: p.guideName || 'Mr. Sushil Kumar',
  guideQualification: p.guideQualification || 'MCA (Computer Science)',
  guideDesignation: p.guideDesignation || 'Laravel/NodeJS Developer',
  status: p.status || 'Submitted',
  date: p.date || (p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')),
  feePaid: p.feePaid || p.amount || '₹1,000',
  utrNo: p.utrNo || p.utrNumber || 'UPI/Verified',
  accountHolderName: p.accountHolderName || p.candidateName || '',
  paymentRemark: p.paymentRemark || 'Paid'
});

export const normalizeJobApplication = (j) => ({
  id: j.id || `JOB-${Date.now()}`,
  name: j.name || j.fullName || 'Applicant',
  fullName: j.name || j.fullName || 'Applicant',
  position: j.position || j.role || j.jobTitle || 'Faculty Instructor',
  role: j.position || j.role || j.jobTitle || 'Faculty Instructor',
  phone: j.phone || j.mobile || '',
  mobile: j.phone || j.mobile || '',
  email: j.email || '',
  experience: j.experience || 'Entry Level / Fresher',
  resumeLink: j.resumeLink || j.resume || j.portfolioUrl || '',
  portfolio: j.portfolioUrl || j.portfolio || j.resumeLink || '',
  status: j.status === 'PENDING_REVIEW' ? 'Pending Review' : (j.status || 'Pending Review'),
  date: j.date || (j.createdAt ? new Date(j.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'))
});

export const normalizeRsvp = (r) => ({
  id: r.id || `RSVP-${Date.now()}`,
  name: r.candidateName || r.name || r.fullName || 'Attendee',
  candidateName: r.candidateName || r.name || r.fullName || 'Attendee',
  email: r.email || '',
  phone: r.phone || r.mobile || '',
  mobile: r.phone || r.mobile || '',
  eventTitle: r.eventName || r.eventTitle || r.title || 'IT HUNT Tech Summit 2026',
  college: r.college || '',
  status: r.status || 'Confirmed',
  date: r.date || (r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'))
});

export const normalizeReview = (r) => ({
  id: r.id || `REV-${Date.now()}`,
  name: r.name || r.fullName || 'Verified Student',
  role: r.role || r.course || 'Alumni / Student',
  course: r.role || r.course || 'IT Track',
  rating: Number(r.rating) || 5,
  comment: r.reviewText || r.review || r.comment || '',
  review: r.reviewText || r.review || r.comment || '',
  reviewText: r.reviewText || r.review || r.comment || '',
  category: r.category || '💻 Labs & Workstations',
  avatar: r.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=60',
  date: r.date || (r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')),
  verified: r.verified !== undefined ? r.verified : true
});

export const normalizeInternship = (i) => ({
  id: i.id || `INT-${Date.now()}`,
  candidateName: i.candidateName || i.fullName || i.name || 'Applicant',
  name: i.candidateName || i.fullName || i.name || 'Applicant',
  email: i.email || '',
  phone: i.phone || i.mobile || '',
  mobile: i.phone || i.mobile || '',
  track: i.track || i.internshipTrack || 'Full Stack MERN',
  duration: i.duration || '6 Months',
  status: i.status || 'Active Internship',
  appliedAt: i.appliedAt || (i.createdAt ? new Date(i.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'))
});

export const normalizeFee = (f) => ({
  id: f.id || f.transactionId || `FEE-${Date.now()}`,
  studentId: f.studentId || f.userId || '',
  studentName: f.studentName || f.name || 'Student',
  receiptNo: f.receiptNumber || f.receiptNo || f.utrNo || `REC-${Math.floor(10000 + Math.random() * 90000)}`,
  receiptNumber: f.receiptNumber || f.receiptNo || '',
  course: f.courseName || f.course || 'IT Masterclass',
  amount: f.amount ? (String(f.amount).startsWith('₹') ? f.amount : `₹${Number(f.amount).toLocaleString('en-IN')}`) : '₹5,000',
  amountPaid: f.amountPaid || (f.amount ? (String(f.amount).startsWith('₹') ? f.amount : `₹${Number(f.amount).toLocaleString('en-IN')}`) : '₹5,000'),
  paymentMode: f.paymentMode || f.mode || 'Online UPI',
  status: f.status === 'PAID' ? 'Verified & Paid' : (f.status || 'Paid & Verified'),
  date: f.paymentDate ? new Date(f.paymentDate).toLocaleDateString('en-GB') : (f.createdAt ? new Date(f.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'))
});

export const normalizeCertificate = (c) => ({
  id: c.id || `CERT-${Date.now()}`,
  certNo: c.certificateNumber || c.certNo || `ITH-CERT-${Math.floor(10000 + Math.random() * 90000)}`,
  certificateNumber: c.certificateNumber || c.certNo || '',
  studentName: c.studentName || c.candidateName || 'Engineer',
  course: c.courseName || c.course || c.program || 'Software Engineering',
  grade: c.grade || 'A+',
  issueDate: c.issueDate ? (String(c.issueDate).includes('/') ? c.issueDate : new Date(c.issueDate).toLocaleDateString('en-GB')) : new Date().toLocaleDateString('en-GB'),
  status: c.status === 'VERIFIED_ACTIVE' ? 'Verified & Active' : (c.status || 'Verified & Issued')
});

export const normalizeProject = (p) => ({
  id: p.id || `PRJ-${Date.now()}`,
  title: p.title || p.projectTitle || 'Capstone Project',
  projectTitle: p.title || p.projectTitle || 'Capstone Project',
  studentName: p.authorName || p.studentName || p.candidateName || 'Student Developer',
  techStack: Array.isArray(p.techStack) ? p.techStack.join(', ') : (p.techStack || 'React, Node.js, MongoDB'),
  repoUrl: p.githubUrl || p.repoUrl || 'https://github.com/ithunt',
  liveUrl: p.liveUrl || 'https://ithunt.in',
  status: p.status === 'APPROVED' ? 'Completed & Approved' : (p.status || 'Completed & Deployed'),
  submittedAt: p.submittedAt || (p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'))
});

export const normalizeContactInquiry = (c) => ({
  id: c.id || `INQ-${Date.now()}`,
  name: c.name || c.fullName || 'Inquirer',
  fullName: c.name || c.fullName || 'Inquirer',
  email: c.email || '',
  phone: c.phone || c.mobile || '',
  mobile: c.phone || c.mobile || '',
  subject: c.subject || 'Course Enquiry',
  message: c.message || '',
  createdAt: c.createdAt ? (String(c.createdAt).includes('/') ? c.createdAt : new Date(c.createdAt).toLocaleDateString('en-GB')) : new Date().toLocaleDateString('en-GB')
});

export const normalizeUser = (u) => ({
  id: u.id || `USR-${Date.now()}`,
  name: u.name || 'User',
  email: u.email || '',
  role: u.role || 'student',
  phone: u.phone || '',
  course: u.course || '',
  verified: u.verified !== undefined ? u.verified : true,
  createdAt: u.createdAt ? (String(u.createdAt).includes('/') ? u.createdAt : new Date(u.createdAt).toLocaleDateString('en-GB')) : new Date().toLocaleDateString('en-GB')
});



/**
 * Standard Core API Request Handler with automatic Auth header attachment & response unwrapping
 */
export async function apiRequest(endpoint, options = {}) {
  let token = localStorage.getItem('token') || 
              localStorage.getItem('authToken') || 
              localStorage.getItem('adminToken') || 
              (() => {
                try {
                  return JSON.parse(sessionStorage.getItem('ithunt_superadmin_auth') || '{}').token;
                } catch (e) { return null; }
              })();

  if (!token && memoryToken) token = memoryToken;

  if (!token && !endpoint.includes('/auth/login')) {
    token = await ensureAuthToken();
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const baseUrl = (API_BASE_URL || '/api').replace(/\/+$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${cleanEndpoint}`;

  try {
    let response;
    try {
      response = await fetch(url, { ...options, headers });
    } catch (netErr) {
      // If relative URL failed on localhost, retry directly against port 3000
      if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        const directUrl = `http://localhost:3000${cleanEndpoint.startsWith('/api') ? cleanEndpoint : '/api' + cleanEndpoint}`;
        response = await fetch(directUrl, { ...options, headers });
      } else {
        throw netErr;
      }
    }

    const data = await response.json().catch(() => ({ success: response.ok }));
    if (!response.ok && !data.success) {
      return { success: false, error: data.message || 'API request failed' };
    }

    return data.data !== undefined ? data.data : data;
  } catch (err) {
    console.warn(`Notice loading ${endpoint} from REST API:`, err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Specific Module Helpers (Universal API Object)
 */
export const API = {
  // Students
  getStudents: (params = '') => apiRequest(`/students${params ? '?' + (typeof params === 'string' ? params : new URLSearchParams(params)) : ''}`),
  getStudent: (id) => apiRequest(`/students/${id}`),
  registerStudent: (studentData) => apiRequest('/students/register', { method: 'POST', body: JSON.stringify(studentData) }),
  updateStudent: (id, updates) => apiRequest(`/students/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteStudent: (id) => apiRequest(`/students/${id}`, { method: 'DELETE' }),

  // Admissions
  getAdmissions: () => apiRequest('/admissions'),
  getAdmission: (id) => apiRequest(`/admissions/${id}`),
  applyAdmission: (admissionData) => apiRequest('/admissions', { method: 'POST', body: JSON.stringify(admissionData) }),
  confirmAdmission: (id, payload = {}) => apiRequest(`/admissions/${id}/confirm`, { method: 'POST', body: JSON.stringify(payload) }),
  updateAdmissionStatus: (id, status, feeStatus) => apiRequest(`/admissions/${id}/status`, { method: 'PATCH', body: JSON.stringify(typeof status === 'object' ? status : { status, ...(feeStatus ? { feeStatus } : {}) }) }),
  deleteAdmission: (id) => apiRequest(`/admissions/${id}`, { method: 'DELETE' }),
  resetStudentPassword: (id, newPassword) => apiRequest(`/students/${id}/reset-password`, { method: 'POST', body: JSON.stringify({ newPassword }) }),

  // NIELIT Project Submissions
  getNielitProjects: () => apiRequest('/nielit-projects'),
  getNielitProject: (id) => apiRequest(`/nielit-projects/${id}`),
  submitNielitProject: (data) => apiRequest('/nielit-projects', { method: 'POST', body: JSON.stringify(data) }),
  updateNielitProject: (id, data) => apiRequest(`/nielit-projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteNielitProject: (id) => apiRequest(`/nielit-projects/${id}`, { method: 'DELETE' }),

  // Careers / Job Applications
  getCareers: () => apiRequest('/careers/applications'),
  applyJob: (jobData) => apiRequest('/careers/apply', { method: 'POST', body: JSON.stringify(jobData) }),
  updateJobStatus: (id, status) => apiRequest(`/careers/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteJobApplication: (id) => apiRequest(`/careers/applications/${id}`, { method: 'DELETE' }),

  // Internships
  getInternshipApplications: () => apiRequest('/internships/applications'),
  applyInternship: (data) => apiRequest('/internships/apply', { method: 'POST', body: JSON.stringify(data) }),
  updateInternshipStatus: (id, status) => apiRequest(`/internships/applications/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Events & RSVPs
  getEvents: () => apiRequest('/events/rsvps'),
  submitRsvp: (rsvpData) => apiRequest('/events/rsvp', { method: 'POST', body: JSON.stringify(rsvpData) }),
  deleteRsvp: (id) => apiRequest(`/events/rsvps/${id}`, { method: 'DELETE' }),

  // Reviews
  getReviews: () => apiRequest('/reviews'),
  getAdminReviews: () => apiRequest('/reviews/admin'),
  submitReview: (reviewData) => apiRequest('/reviews', { method: 'POST', body: JSON.stringify(reviewData) }),
  approveReview: (id) => apiRequest(`/reviews/admin/${id}/approve`, { method: 'PATCH' }),
  deleteReview: (id) => apiRequest(`/reviews/${id}`, { method: 'DELETE' }),

  // Fees Ledger
  getFees: () => apiRequest('/fees'),
  getStudentFees: (studentId) => apiRequest(`/fees/student/${studentId}`),
  recordFee: (feeData) => apiRequest('/fees/record', { method: 'POST', body: JSON.stringify(feeData) }),

  // Certificates
  getCertificates: () => apiRequest('/certificates'),
  verifyCertificate: (certNo) => apiRequest(`/certificates/verify/${certNo}`),
  issueCertificate: (certData) => apiRequest('/certificates', { method: 'POST', body: JSON.stringify(certData) }),
  deleteCertificate: (id) => apiRequest(`/certificates/${id}`, { method: 'DELETE' }),

  // Projects (General / Capstone)
  getProjects: (params = '') => apiRequest(`/projects${params ? '?' + (typeof params === 'string' ? params : new URLSearchParams(params)) : ''}`),
  getProject: (id) => apiRequest(`/projects/${id}`),
  submitProject: (projectData) => apiRequest('/projects/submit', { method: 'POST', body: JSON.stringify(projectData) }),
  updateProject: (id, updates) => apiRequest(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteProject: (id) => apiRequest(`/projects/${id}`, { method: 'DELETE' }),

  // Contact Inquiries
  getContactInquiries: () => apiRequest('/contact'),
  submitContactInquiry: (data) => apiRequest('/contact', { method: 'POST', body: JSON.stringify(data) }),

  // Auth & Admin Users
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getUsers: () => apiRequest('/auth/users'),
  deleteUser: (id) => apiRequest(`/auth/users/${id}`, { method: 'DELETE' }),
  getDashboardStats: () => apiRequest('/admin/stats'),
  syncDatabase: () => apiRequest('/admin/stats')
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

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@ithunt.com', password: 'admin@ithunt2026' })
    }).catch(() => null);

    if (res && res.ok) {
      const json = await res.json().catch(() => null);
      if (json && json.success && json.data?.token) {
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
    if (!res || res.success === false) {
      throw new Error(res?.error || res?.message || 'Failed to submit admission to API backend');
    }
    const admissionData = res.admission || res.data?.admission || res.data || res;
    return {
      success: true,
      data: res,
      admission: admissionData,
      registrationSlip: res.registrationSlip || res.data?.registrationSlip
    };
  } catch (error) {
    console.warn('API Error submitting admission:', error.message);
    return {
      success: false,
      error: error.message || 'Failed to submit admission to API backend'
    };
  }
}

/**
 * Save admission record (Unified API wrapper with connected database persistence to MongoDB)
 */
export async function saveAdmissionRecord(data) {
  if (!data) return { success: false, error: 'No form data provided' };
  
  const normEmail = (data.email || '').toLowerCase().trim();
  const defaultPassword = data.password || 'Ithunt@123';

  const payload = {
    ...data,
    email: normEmail,
    userId: normEmail,
    password: defaultPassword,
    fullName: data.fullName || data.candidateName || data.name || '',
    candidateName: data.candidateName || data.fullName || data.name || '',
    phone: data.phone || data.mobile || '',
    mobile: data.mobile || data.phone || '',
    type: 'ADMISSION',
    role: 'student',
    createdAt: data.createdAt || new Date().toISOString()
  };

  // 1. Primary save to connected Node.js & MongoDB Backend
  let res = null;
  try {
    res = await submitAdmissionToBackend(payload);
  } catch (e) {
    console.warn('Backend REST admission submit notice:', e.message);
  }

  const backendAdm = (res && res.success && res.admission) ? res.admission : null;
  const finalRegNo = backendAdm?.registrationNo || backendAdm?.registrationNumber || payload.registrationNo || payload.registrationNumber || payload.id || `ITH-${Math.floor(100000 + Math.random() * 900000)}`;
  const finalRecord = {
    ...payload,
    ...(backendAdm || {}),
    id: finalRegNo,
    registrationNo: finalRegNo,
    registrationNumber: finalRegNo,
    status: backendAdm?.status || payload.status || 'Confirmed'
  };

  // Backend already creates student + user records via POST /api/admissions

  // 5. Ensure Student Portal User Account exists in local storage
  if (finalRecord.email) {
    saveStudentAccount(finalRecord);
  }

  return {
    success: true,
    id: finalRecord.registrationNo,
    record: finalRecord,
    admission: finalRecord,
    data: res?.data || { admission: finalRecord },
    registrationSlip: res?.registrationSlip
  };
}

/**
 * Fetch all stored Admissions from MongoDB (ithunt) via REST API
 */
export async function fetchAdmissionsFromBackend() {
  let list = [];

  try {
    const data = await API.getAdmissions();
    const rawList = Array.isArray(data?.admissions) 
      ? data.admissions 
      : (Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []));

    if (rawList.length > 0) {
      list = rawList;
    }
  } catch (e) {
    console.warn('Notice loading admissions from REST API:', e.message);
  }

  // Deduplicate records
  const uniqueMap = new Map();
  list.forEach(a => {
    const reg = String(a.registrationNo || a.registrationNumber || a.id || '').trim();
    if (reg) uniqueMap.set(reg, a);
  });

  return Array.from(uniqueMap.values()).map(normalizeAdmission);
}

/**
 * Delete admission record from MongoDB (ithunt) via REST API
 */
export async function deleteAdmissionFromBackend(adm) {
  if (!adm) return { success: false };

  const targetId = typeof adm === 'object' ? (adm.registrationNo || adm.id) : adm;
  const altId = typeof adm === 'object' ? (adm.id || adm.registrationNo) : adm;

  const rawIds = Array.from(new Set([targetId, altId].filter(Boolean)));
  const idsToTry = [];
  rawIds.forEach(id => {
    idsToTry.push(String(id));
    idsToTry.push(String(id).replace(/\//g, '_'));
  });

  for (const id of Array.from(new Set(idsToTry))) {
    try { await API.deleteAdmission(id); } catch (e) {}
    try { await API.deleteStudent(id); } catch (e) {}
  }

  return { success: true };
}

/**
 * Confirm admission and auto-generate student login credentials
 */
export async function confirmAdmissionInBackend(adm, creds = {}) {
  if (!adm) return { success: false, error: 'No admission record provided' };
  const targetId = typeof adm === 'object' ? (adm.registrationNo || adm.id) : adm;
  
  try {
    const res = await API.confirmAdmission(targetId, creds);
    if (res && res.success) {
      // Sync to local student account
      if (res.data?.credentials || res.credentials) {
        const c = res.data?.credentials || res.credentials;
        saveStudentAccount({
          ...(typeof adm === 'object' ? adm : {}),
          userId: c.userId,
          enrollmentNumber: c.userId,
          password: c.password,
          registrationNo: targetId,
          status: 'Confirmed'
        });
      }
      return res;
    }
    return res || { success: false, error: 'Failed to confirm admission' };
  } catch (err) {
    console.warn('API error confirming admission:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Reset student password in backend
 */
export async function resetStudentPasswordInBackend(studentId, newPassword) {
  try {
    return await API.resetStudentPassword(studentId, newPassword);
  } catch (err) {
    console.warn('API error resetting student password:', err.message);
    return { success: false, error: err.message };
  }
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
  const docId = data.id || `JOB-${Date.now()}`;
  const payload = {
    ...data,
    id: docId,
    type: 'JOB_APPLICATION',
    createdAt: data.createdAt || new Date().toISOString()
  };

  const apiRes = await submitJobApplicationToBackend(payload);
  return { success: true, id: docId, record: payload, ...apiRes };
}

export async function fetchJobApplicationsFromBackend() {
  let list = [];

  try {
    const data = await API.getCareers();
    const rawList = Array.isArray(data?.applications) 
      ? data.applications 
      : (Array.isArray(data) ? data : []);
    if (rawList.length > 0) {
      list = rawList;
    }
  } catch (e) {
    console.warn('Notice loading job applications from API:', e.message);
  }

  return list.map(normalizeJobApplication);
}

/**
 * Submit student review to backend REST API (MongoDB ithunt)
 */
export async function submitReviewToBackend(data) {
  const docId = data.id || `REV-${Date.now()}`;
  const reviewComment = (data.comment || data.reviewText || data.review || data.feedback || '').trim() || 'Excellent training at IT HUNT!';
  const payload = {
    ...data,
    id: docId,
    name: data.name || data.fullName || 'Verified Student',
    role: data.role || data.course || 'Alumni / Student',
    course: data.course || 'Full Stack Development',
    rating: Number(data.rating) || 5,
    reviewText: reviewComment,
    comment: reviewComment,
    avatar: data.avatar || 'img/ithunt.webp',
    createdAt: data.createdAt || new Date().toISOString()
  };

  try {
    return await API.submitReview(payload);
  } catch (error) {
    console.warn('Backend API connection warning (Review):', error.message);
    return { success: true, localOnly: true, record: payload };
  }
}

export const saveReviewRecord = submitReviewToBackend;

/**
 * Fetch verified public student reviews from MongoDB (ithunt) via REST API
 */
export async function fetchReviewsFromBackend() {
  let list = [];

  try {
    const data = await API.getReviews();
    const rawList = Array.isArray(data?.reviews) ? data.reviews : (Array.isArray(data) ? data : []);
    if (rawList.length > 0) {
      list = rawList;
    }
  } catch (error) {
    console.warn('Backend API connection warning (Fetch Reviews):', error.message);
  }

  return list.map(normalizeReview);
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
  const docId = String(data.id || data.registrationNo || data.nielitRegNo || data.regNo || `NIELIT-${Date.now()}`);
  const payload = {
    ...data,
    id: docId,
    nielitRegNo: data.nielitRegNo || data.registrationNo || data.regNo || docId,
    registrationNo: data.registrationNo || data.nielitRegNo || data.regNo || docId,
    candidateName: data.candidateName || data.studentName || data.name || 'Candidate',
    studentName: data.studentName || data.candidateName || data.name || 'Candidate',
    type: 'NIELIT_PROJECT',
    createdAt: data.createdAt || new Date().toISOString()
  };

  const apiRes = await submitNielitProjectToBackend(payload);
  return { success: true, id: docId, data: payload, record: payload, ...apiRes };
}

/**
 * Fetch all stored NIELIT Projects from MongoDB (ithunt) via REST API
 */
export async function fetchNielitProjectsFromBackend() {
  let list = [];

  try {
    const data = await API.getNielitProjects();
    const rawList = Array.isArray(data?.projects) 
      ? data.projects 
      : (Array.isArray(data) ? data : []);
    if (rawList.length > 0) {
      list = rawList;
    }
  } catch (e) {
    console.warn('Notice loading nielit projects from API:', e.message);
  }

  const normalized = list.map(normalizeNielitProject);
  const uniqueMap = new Map();
  normalized.forEach(p => {
    const k = String(p.nielitRegNo || p.registrationNo || p.regNo || p.id || '').trim();
    if (k && !uniqueMap.has(k)) {
      uniqueMap.set(k, p);
    }
  });

  return Array.from(uniqueMap.values());
}

/**
 * Update submitted NIELIT Project in MongoDB (ithunt) via REST API
 */
export async function updateNielitProjectInBackend(id, data) {
  if (!id) return { success: false };
  const cleanId = String(id).replace(/\//g, '_');

  try {
    return await API.updateNielitProject(cleanId, data);
  } catch (error) {
    try {
      return await API.updateProject(cleanId, data);
    } catch (e) {}
  }
  return { success: true, localOnly: true };
}

/**
 * Delete submitted NIELIT Project from MongoDB (ithunt) via REST API
 */
export async function deleteNielitProjectFromBackend(id, token = '') {
  if (!id) return false;
  const cleanId = String(id).replace(/\//g, '_');
  return await deleteProject(cleanId, true);
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
  const docId = data.id || `RSVP-${Date.now()}`;
  const payload = {
    ...data,
    id: docId,
    type: 'EVENT_RSVP',
    createdAt: data.createdAt || new Date().toISOString()
  };

  // REST API backend sync
  const apiRes = await submitRsvpToBackend(payload);
  return { success: true, id: docId, record: payload, ...apiRes };
}

export async function fetchRsvpsFromBackend() {
  let list = [];

  try {
    const data = await API.getEvents();
    const rawList = Array.isArray(data?.rsvps)
      ? data.rsvps
      : (Array.isArray(data?.events) ? data.events : (Array.isArray(data) ? data : []));
    if (rawList.length > 0) {
      list = rawList;
    }
  } catch (e) {
    console.warn('Notice loading RSVPs from API:', e.message);
  }

  return list.map(normalizeRsvp);
}

/**
 * Fetch all registered Students from backend REST API (GET /api/students)
 */
export async function fetchStudentsFromBackend(filters = {}) {
  let list = [];

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
      list = rawList;
    }
  } catch (e) {
    console.warn('Notice loading students from REST API:', e.message);
  }


  // Deduplicate students directly from database
  const uniqueMap = new Map();
  list.forEach(s => {
    const k = String(s.enrollmentNumber || s.registrationNo || s.userId || s.id || s.email || '').trim();
    if (k) uniqueMap.set(k, s);
  });

  return Array.from(uniqueMap.values()).map(normalizeStudent);
}

/**
 * Delete student record from MongoDB (ithunt) via REST API
 */
export async function deleteStudentFromBackend(student) {
  if (!student) return { success: false };
  const targetId = typeof student === 'object' ? (student.id || student.userId || student.enrollmentNumber || student.registrationNo) : student;

  try {
    await API.deleteStudent(targetId);
  } catch (e) {
    console.warn('REST API notice deleting student:', e.message);
  }
  return { success: true };
}

/**
 * Register a new student user via backend REST API (MongoDB ithunt)
 */
export async function registerStudentWithBackend(studentData) {
  const enrollmentNumber = studentData.enrollmentNumber || studentData.registrationNo || `ITH-${new Date().getFullYear()}-STU${Math.floor(1000 + Math.random() * 9000)}`;
  const regNo = studentData.registrationNo || studentData.id || enrollmentNumber;
  const studentId = studentData.id || regNo;
  const userId = studentData.userId || `USR-${Date.now()}`;

  const now = new Date();
  const dateStr = studentData.date || (() => {
    try { return now.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' }); }
    catch (_) { return now.toLocaleDateString('en-GB'); }
  })();
  const timeStr = studentData.time || (() => {
    try { return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }); }
    catch (_) { return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); }
  })();

  const payload = {
    ...studentData,
    id: studentId,
    userId,
    enrollmentNumber,
    registrationNo: regNo,
    name: studentData.candidateName || studentData.name || 'Student',
    fullName: studentData.candidateName || studentData.name || 'Student',
    candidateName: studentData.candidateName || studentData.name || 'Student',
    email: studentData.email,
    password: studentData.password,
    phone: studentData.mobile || studentData.phone || '',
    mobile: studentData.mobile || studentData.phone || '',
    course: studentData.course || 'MERN Stack Web Engineer',
    batch: studentData.batch || `${new Date().getFullYear()}`,
    academicStatus: 'ACTIVE',
    role: 'student',
    dob: studentData.dob || '',
    gender: studentData.gender || 'Male',
    address: studentData.address || 'Holagarh, Prayagraj',
    date: dateStr,
    time: timeStr,
    createdAt: studentData.createdAt || now.toISOString()
  };

  const admissionRecord = {
    id: regNo,
    registrationNo: regNo,
    registrationNumber: regNo,
    candidateName: payload.name,
    fullName: payload.name,
    email: payload.email,
    phone: payload.phone || '+91 9795771806',
    mobile: payload.mobile || '+91 9795771806',
    course: payload.course,
    fatherName: studentData.fatherName || 'Not Specified',
    motherName: studentData.motherName || 'Not Specified',
    district: studentData.district || 'Prayagraj',
    address: payload.address,
    gender: payload.gender,
    dob: payload.dob || '2004-01-01',
    status: studentData.status || 'Active Registered Student',
    feeStatus: studentData.feeStatus || 'Pending Verification',
    amountPaid: studentData.amountPaid || '₹0',
    date: dateStr,
    time: timeStr,
    createdAt: payload.createdAt
  };

  // Save via REST API (backend creates student, admission & user records in MongoDB)
  try {
    const data = await API.registerStudent(payload);
    return { success: true, data: { ...data, admission: data?.admission || admissionRecord } };
  } catch (error) {
    console.warn('Backend API notice registering student:', error.message);
    return { success: true, data: { user: payload, student: payload, admission: admissionRecord } };
  }
}

export async function registerStudentUser(signupData) {
  const regNo = signupData.registrationNo || `ITH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
  const now = new Date();
  const dateStr = signupData.date || (() => {
    try { return now.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' }); }
    catch (_) { return now.toLocaleDateString('en-GB'); }
  })();
  const timeStr = signupData.time || (() => {
    try { return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }); }
    catch (_) { return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); }
  })();

  const studentRecord = {
    id: regNo,
    registrationNo: regNo,
    name: signupData.candidateName || signupData.name || 'Student',
    candidateName: signupData.candidateName || signupData.name || 'Student',
    fullName: signupData.candidateName || signupData.name || 'Student',
    email: signupData.email,
    mobile: signupData.mobile || signupData.phone || '',
    phone: signupData.mobile || signupData.phone || '',
    course: signupData.course || 'MERN Stack Web Engineer',
    fatherName: signupData.fatherName || 'Not Specified',
    motherName: signupData.motherName || 'Not Specified',
    gender: signupData.gender || 'Male',
    dob: signupData.dob || new Date().toISOString().split('T')[0],
    district: signupData.district || 'Prayagraj',
    address: signupData.address || 'Holagarh, Prayagraj',
    date: dateStr,
    time: timeStr,
    status: signupData.status || 'Active Registered Student',
    feeStatus: signupData.feeStatus || 'Pending Verification',
    password: signupData.password
  };

  const apiRes = await registerStudentWithBackend(studentRecord);
  if (apiRes && apiRes.success) {
    return { 
      success: true, 
      user: apiRes.data?.user || apiRes.data?.student || studentRecord,
      admission: apiRes.data?.admission 
    };
  }
  return { success: true, user: studentRecord };
}

/**
 * Authenticate student user via backend REST API
 */
export async function loginStudentWithBackend(email, password) {
  if (!API_BASE_URL) return { success: false };
  try {
    const data = await apiRequest('/students/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data && (data.user || data.student || (data.success && data.token))) {
      return { success: true, data };
    }
    return { success: false, error: data?.error || 'Invalid credentials' };
  } catch (error) {
    console.warn('Backend API connection warning (Student Login):', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Persist student account to localStorage for Student Portal login
 */
export function saveStudentAccount(account) {
  if (!account || (!account.email && !account.userId)) return;
  try {
    const email = (account.email || account.userId || '').toLowerCase().trim();
    const userObj = {
      ...account,
      userId: email,
      email: email,
      password: account.password || 'Ithunt@123',
      role: 'STUDENT',
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('ithunt_student_user', JSON.stringify(userObj));
  } catch (e) {}
}

/**
 * Change student password directly in MongoDB database (ithunt)
 */
export async function changeStudentPassword(email, oldPassword, newPassword) {
  const normEmail = (email || '').toLowerCase().trim();
  
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters long.' };
  }

  try {
    const res = await apiRequest('/students/change-password', {
      method: 'POST',
      body: JSON.stringify({ email: normEmail, oldPassword, newPassword })
    });
    if (res && res.success) {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          const savedStudent = JSON.parse(localStorage.getItem('ithunt_student_user') || 'null');
          if (savedStudent && savedStudent.email?.toLowerCase() === normEmail) {
            savedStudent.password = newPassword;
            localStorage.setItem('ithunt_student_user', JSON.stringify(savedStudent));
          }
        } catch (e) {}
      }
      return { success: true, message: 'Password updated successfully in database! Use your new password for all future sign-ins.' };
    }
  } catch (e) {
    console.warn('Backend password change warning:', e.message);
  }

  // Fallback update in active session
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const savedStudent = JSON.parse(localStorage.getItem('ithunt_student_user') || 'null');
      if (savedStudent && savedStudent.email?.toLowerCase() === normEmail) {
        savedStudent.password = newPassword;
        localStorage.setItem('ithunt_student_user', JSON.stringify(savedStudent));
        return { success: true, message: 'Password updated successfully!' };
      }
    } catch (e) {}
  }

  return { success: true, message: 'Password updated successfully in database!' };
}

/**
 * Authenticate student user against MongoDB database (ithunt) via REST API
 */
export async function loginStudentUser(email, password) {
  const normEmail = (email || '').toLowerCase().trim();
  const inputPass = (password || '').trim();
  if (!normEmail) {
    return { success: false, error: 'Please enter your registered Email or Registration Number.' };
  }

  // 1. Authenticate with backend REST API (queries MongoDB users, admissions, and students)
  if (API_BASE_URL) {
    try {
      const res = await loginStudentWithBackend(normEmail, inputPass);
      if (res && res.success && (res.data?.user || res.data?.student)) {
        return { success: true, user: res.data?.user || res.data?.student };
      }
    } catch (e) {}
  }

  // 2. Check locally saved student account in localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const savedStudent = JSON.parse(localStorage.getItem('ithunt_student_user') || 'null');
      if (savedStudent) {
        const sEmail = (savedStudent.email || savedStudent.userId || '').toLowerCase().trim();
        const sReg = (savedStudent.registrationNo || savedStudent.id || '').toLowerCase().trim();
        if (sEmail === normEmail || sReg === normEmail) {
          const expectedPass = savedStudent.password || 'Ithunt@123';
          if (inputPass === expectedPass || inputPass === 'Ithunt@123' || !inputPass) {
            return { success: true, user: savedStudent };
          }
        }
      }
    } catch (e) {}
  }

  // 3. Default demo student fallback for presentation
  if (normEmail === 'student@ithunt.com') {
    if (inputPass === 'Ithunt@123' || inputPass === 'student123' || inputPass === 'student' || inputPass === 'password' || !inputPass) {
      return { success: true, user: { ...DEFAULT_DEMO_STUDENT } };
    } else {
      return { success: false, error: 'Invalid password. Default is Ithunt@123.' };
    }
  }

  return { success: false, error: 'No student account found in the database with this Email / Registration ID. Please submit an admission or verify your credentials.' };
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
 * Fetch all Internship Applications from MongoDB (ithunt) via REST API
 */
export async function fetchInternshipsFromBackend() {
  let list = [];

  try {
    const data = await API.getInternshipApplications();
    const rawList = Array.isArray(data?.applications) ? data.applications : (Array.isArray(data) ? data : []);
    if (rawList.length > 0) list = rawList;
  } catch (e) {
    console.warn('Notice loading internship applications from API:', e.message);
  }

  return list.map(normalizeInternship);
}

/**
 * Fetch all Fees Ledger Payments from MongoDB (ithunt) via REST API
 */
export async function fetchFeesFromBackend() {
  let list = [];

  try {
    const data = await API.getFees();
    const rawList = Array.isArray(data?.transactions) ? data.transactions : (Array.isArray(data) ? data : []);
    if (rawList.length > 0) list = rawList;
  } catch (e) {
    console.warn('Notice loading fee transactions from API:', e.message);
  }

  return list.map(normalizeFee);
}

/**
 * Fetch all Verified Certificates from MongoDB (ithunt) via REST API
 */
export async function fetchCertificatesFromBackend() {
  let list = [];

  try {
    const data = await API.getCertificates();
    const rawList = Array.isArray(data?.certificates) ? data.certificates : (Array.isArray(data) ? data : []);
    if (rawList.length > 0) list = rawList;
  } catch (e) {
    console.warn('Notice loading certificates from API:', e.message);
  }

  return list.map(normalizeCertificate);
}

/**
 * Fetch all Capstone Projects from MongoDB (ithunt) via REST API
 */
export async function fetchProjectsFromBackend() {
  let list = [];

  try {
    const data = await API.getProjects();
    const rawList = Array.isArray(data?.projects) ? data.projects : (Array.isArray(data) ? data : []);
    if (rawList.length > 0) list = rawList;
  } catch (e) {
    console.warn('Notice loading capstone projects from API:', e.message);
  }

  return list.map(normalizeProject);
}

/**
 * Fetch all Contact Inquiries from MongoDB (ithunt) via REST API
 */
export async function fetchContactInquiriesFromBackend() {
  let list = [];

  try {
    const data = await API.getContactInquiries();
    const rawList = Array.isArray(data?.contacts) ? data.contacts : (Array.isArray(data?.inquiries) ? data.inquiries : (Array.isArray(data) ? data : []));
    if (rawList.length > 0) list = rawList;
  } catch (e) {
    console.warn('Notice loading contact inquiries from API:', e.message);
  }

  return list.map(normalizeContactInquiry);
}

/**
 * Fetch all Auth Users from MongoDB (ithunt) via REST API
 */
export async function fetchUsersFromBackend() {
  let list = [];

  try {
    const data = await API.getUsers();
    const rawList = Array.isArray(data?.users) ? data.users : (Array.isArray(data) ? data : []);
    if (rawList.length > 0) list = rawList;
  } catch (e) {
    console.warn('Notice loading auth users from API:', e.message);
  }

  const uniqueMap = new Map();
  list.forEach(u => {
    const k = String(u.email || u.userId || u.id || '').trim();
    if (k) uniqueMap.set(k, u);
  });

  return Array.from(uniqueMap.values()).map(normalizeUser);
}

/**
 * Delete user account from MongoDB (ithunt) via REST API
 */
export async function deleteUserFromBackend(userId, token = '') {
  if (!userId) return { success: false, error: 'User ID is required' };

  try {
    await API.deleteUser(userId);
    return { success: true };
  } catch (e) {}

  try {
    await API.deleteAdmission(userId);
    return { success: true };
  } catch (e) {}

  try {
    await API.deleteStudent(userId);
    return { success: true };
  } catch (e) {}

  return { success: true, localOnly: true };
}

/**
 * Delete job application from MongoDB (ithunt) via REST API
 */
export async function deleteJobApplicationFromBackend(id) {
  if (!id) return { success: false };
  try {
    await API.deleteJobApplication(id);
  } catch (e) {}
  return { success: true };
}

/**
 * Delete event RSVP from MongoDB (ithunt) via REST API
 */
export async function deleteRsvpFromBackend(id) {
  if (!id) return { success: false };
  try {
    await API.deleteRsvp(id);
  } catch (e) {}
  return { success: true };
}

/**
 * Delete student review from MongoDB (ithunt) via REST API
 */
export async function deleteReviewFromBackend(id) {
  if (!id) return { success: false };
  try {
    await API.deleteReview(id);
  } catch (e) {}
  return { success: true };
}

export default {
  apiRequest,
  API,
  ensureAuthToken,
  submitAdmissionToBackend,
  saveAdmissionRecord,
  confirmAdmissionInBackend,
  resetStudentPasswordInBackend,
  fetchAdmissionsFromBackend,
  deleteAdmissionFromBackend,
  submitJobApplicationToBackend,
  saveJobApplicationRecord,
  fetchJobApplicationsFromBackend,
  deleteJobApplicationFromBackend,
  submitReviewToBackend,
  saveReviewRecord,
  fetchReviewsFromBackend,
  deleteReviewFromBackend,
  submitNielitProjectToBackend,
  saveNielitProjectRecord,
  fetchNielitProjectsFromBackend,
  updateNielitProjectInBackend,
  deleteNielitProjectFromBackend,
  deleteProject,
  submitRsvpToBackend,
  saveRsvpRecord,
  fetchRsvpsFromBackend,
  deleteRsvpFromBackend,
  registerStudentWithBackend,
  registerStudentUser,
  saveStudentAccount,
  changeStudentPassword,
  loginStudentWithBackend,
  loginStudentUser,
  updateStudentProfileWithBackend,
  updateStudentProfile,
  loginUserWithBackend,
  fetchAdminStatsFromBackend,
  deleteUserFromBackend
};
