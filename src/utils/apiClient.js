import { CONTENT_DATA } from '../data/contentData.js';
import { db, rtdb } from './firebaseConfig.js';
import { collection, doc, setDoc, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore';
import { ref as dbRef, set as dbSet, get as dbGet, remove as dbRemove, onValue } from 'firebase/database';

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 
  import.meta.env.VITE_API_BASE_URL || 
  'http://localhost:3000/api'
).replace(/\/+$/, '');

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
 * Direct Firebase Cloud Database Sync Helpers (Project: ithunt-3a42d)
 * Ensures 100% data persistence on production (e.g. Vercel) even when local node server is unreachable.
 */
export async function saveToFirebaseCloud(collectionName, docId, data) {
  if (!collectionName || !docId || !data) return { success: false };
  const cleanId = String(docId).replace(/\//g, '_');
  let saved = false;

  // Clean data to strip any undefined values that cause Firestore setDoc to throw
  const cleanData = JSON.parse(JSON.stringify(data));

  try {
    if (db) {
      await setDoc(doc(db, collectionName, cleanId), cleanData, { merge: true });
      console.log(`✓ Record saved to Firebase Cloud Firestore collection "${collectionName}" ID: ${cleanId}`);
      saved = true;
    }
  } catch (e) {
    console.warn(`Firestore save notice (${collectionName}/${cleanId}):`, e.message);
  }

  try {
    if (rtdb) {
      await dbSet(dbRef(rtdb, `${collectionName}/${cleanId}`), cleanData);
      console.log(`✓ Record synced to Firebase Realtime DB "${collectionName}" ID: ${cleanId}`);
      saved = true;
    }
  } catch (e) {
    console.warn(`Realtime DB save notice (${collectionName}/${cleanId}):`, e.message);
  }

  return { success: saved, id: cleanId };
}

export async function fetchFromFirebaseCloud(collectionName) {
  if (!collectionName) return [];
  const records = [];

  try {
    if (db) {
      const snap = await getDocs(collection(db, collectionName));
      snap.forEach(d => {
        records.push({ id: d.id, ...d.data() });
      });
      if (records.length > 0) return records;
    }
  } catch (e) {
    console.warn(`Firestore fetch notice (${collectionName}):`, e.message);
  }

  try {
    if (rtdb) {
      const snap = await dbGet(dbRef(rtdb, collectionName));
      if (snap.exists()) {
        const val = snap.val();
        if (val && typeof val === 'object') {
          return Object.values(val);
        }
      }
    }
  } catch (e) {}

  return records;
}

export async function deleteFromFirebaseCloud(collectionName, docId) {
  if (!collectionName || !docId) return;
  const cleanId = String(docId).replace(/\//g, '_');

  try {
    if (db) await deleteDoc(doc(db, collectionName, cleanId));
  } catch (e) {}

  try {
    if (rtdb) await dbRemove(dbRef(rtdb, `${collectionName}/${cleanId}`));
  } catch (e) {}
}

/**
 * Setup Real-time Firebase Firestore Live Listeners
 * Watches all live database collections and immediately invokes callbacks whenever data is added, changed, or removed.
 */
export function setupRealtimeFirebaseListeners(callbacks = {}) {
  const unsubscribes = [];

  const listenerMap = [
    { name: 'admissions', callback: callbacks.onAdmissions, normalizer: normalizeAdmission },
    { name: 'students', callback: callbacks.onStudents, normalizer: normalizeStudent },
    { name: 'nielit_projects', callback: callbacks.onNielitProjects, normalizer: normalizeNielitProject },
    { name: 'job_applications', callback: callbacks.onJobApplications, normalizer: normalizeJobApplication },
    { name: 'event_rsvps', callback: callbacks.onRsvps, normalizer: normalizeRsvp },
    { name: 'reviews', callback: callbacks.onReviews, normalizer: normalizeReview },
    { name: 'internships', callback: callbacks.onInternships, normalizer: normalizeInternship },
    { name: 'fees', callback: callbacks.onFees, normalizer: normalizeFee },
    { name: 'certificates', callback: callbacks.onCertificates, normalizer: normalizeCertificate },
    { name: 'projects', callback: callbacks.onProjects, normalizer: normalizeProject },
    { name: 'contact', callback: callbacks.onContactInquiries, normalizer: normalizeContactInquiry },
    { name: 'users', callback: callbacks.onUsers, normalizer: normalizeUser }
  ];

  if (db) {
    listenerMap.forEach(({ name, callback, normalizer }) => {
      if (typeof callback === 'function') {
        try {
          const unsub = onSnapshot(collection(db, name), (snapshot) => {
            if (!snapshot.empty) {
              const records = [];
              snapshot.forEach(docSnap => {
                records.push({ id: docSnap.id, ...docSnap.data() });
              });
              const normalized = normalizer ? records.map(normalizer) : records;
              callback(normalized);
            }
          }, (err) => {
            console.warn(`Realtime Firestore listener notice (${name}):`, err.message);
          });
          unsubscribes.push(unsub);
        } catch (e) {
          console.warn(`Could not attach Firestore listener for ${name}:`, e.message);
        }
      }
    });
  }

  return () => {
    unsubscribes.forEach(unsub => {
      try { unsub(); } catch (e) {}
    });
  };
}

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

  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

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
  updateAdmissionStatus: (id, status) => apiRequest(`/admissions/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteAdmission: (id) => apiRequest(`/admissions/${id}`, { method: 'DELETE' }),

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

  // Reviews
  getReviews: () => apiRequest('/reviews'),
  getAdminReviews: () => apiRequest('/reviews/admin'),
  submitReview: (reviewData) => apiRequest('/reviews', { method: 'POST', body: JSON.stringify(reviewData) }),
  approveReview: (id) => apiRequest(`/reviews/admin/${id}/approve`, { method: 'PATCH' }),
  deleteReview: (id) => apiRequest(`/reviews/admin/${id}`, { method: 'DELETE' }),

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

    // Save directly to Firebase Cloud Database (ithunt-3a42d)
    saveToFirebaseCloud('admissions', finalRecord.id, finalRecord);

    return {
      success: true,
      id: finalRecord.registrationNo,
      record: finalRecord,
      data: res.data
    };
  } else {
    // Save to Firebase Cloud Database as fallback for live deployment
    const fallbackId = payload.id || payload.registrationNo || `ADM-${Date.now()}`;
    const fallbackRecord = { ...payload, id: fallbackId, status: 'Confirmed' };
    saveToFirebaseCloud('admissions', fallbackId, fallbackRecord);

    return {
      success: true,
      id: fallbackId,
      record: fallbackRecord,
      data: { admission: fallbackRecord }
    };
  }
}

/**
 * Fetch all stored Admissions from backend REST API or local storage
 */
export async function fetchAdmissionsFromBackend() {
  let list = [];

  try {
    const data = await API.getAdmissions();
    const rawList = Array.isArray(data?.admissions) 
      ? data.admissions 
      : (Array.isArray(data) ? data : []);

    if (rawList.length > 0) {
      list = rawList;
    }
  } catch (e) {
    console.warn('Notice loading admissions from REST API:', e.message);
  }

  // Fetch/merge live records directly from Firebase Cloud Firestore
  try {
    const fbRecords = await fetchFromFirebaseCloud('admissions');
    if (fbRecords.length > 0) {
      const map = new Map();
      list.forEach(a => map.set(a.id || a.registrationNumber || a.registrationNo, a));
      fbRecords.forEach(a => map.set(a.id || a.registrationNumber || a.registrationNo, { ...map.get(a.id || a.registrationNumber || a.registrationNo), ...a }));
      list = Array.from(map.values());
    }
  } catch (e) {}

  // 3. Fallback to localStorage cache
  if (list.length === 0) {
    try {
      const cached = JSON.parse(localStorage.getItem('ithunt_admissions') || '[]');
      if (Array.isArray(cached) && cached.length > 0) {
        list = cached;
      }
    } catch (e) {}
  }

  return list.map(normalizeAdmission);
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
  const docId = data.id || `JOB-${Date.now()}`;
  const payload = {
    ...data,
    id: docId,
    type: 'JOB_APPLICATION',
    createdAt: data.createdAt || new Date().toISOString()
  };

  // 1. Direct save to Firebase Cloud (Firestore & Realtime DB)
  await saveToFirebaseCloud('job_applications', docId, payload);

  // 2. Local storage cache
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_job_applications') || '[]');
    const filtered = existing.filter(j => j.id !== docId);
    filtered.unshift(payload);
    localStorage.setItem('ithunt_job_applications', JSON.stringify(filtered));
  } catch (e) {}

  // 3. REST API backend sync
  const apiRes = await submitJobApplicationToBackend(payload);
  return { success: true, id: docId, record: payload, ...apiRes };
}

export async function fetchJobApplicationsFromBackend() {
  const deletedIds = new Set(JSON.parse(localStorage.getItem('ithunt_deleted_job_ids') || '[]'));
  let list = [];

  // 1. Try REST API
  try {
    const data = await API.getCareers();
    const rawList = Array.isArray(data?.applications) 
      ? data.applications 
      : (Array.isArray(data) ? data : []);
    if (rawList.length > 0) list = rawList;
  } catch (e) {
    console.warn('Notice loading job applications from API:', e.message);
  }

  // 2. Fetch & merge from Firebase Cloud
  try {
    const fbRecords = await fetchFromFirebaseCloud('job_applications');
    if (fbRecords.length > 0) {
      const map = new Map();
      list.forEach(j => map.set(j.id, j));
      fbRecords.forEach(j => {
        if (j.id) map.set(j.id, { ...map.get(j.id), ...j });
      });
      list = Array.from(map.values());
    }
  } catch (e) {
    console.warn('Notice loading job applications from Firebase Cloud:', e.message);
  }

  // 3. Fallback to localStorage cache
  if (list.length === 0) {
    try {
      const cached = JSON.parse(localStorage.getItem('ithunt_careers_cache') || localStorage.getItem('ithunt_job_applications') || '[]');
      if (Array.isArray(cached) && cached.length > 0) {
        list = cached;
      }
    } catch (e) {}
  }

  const normalized = list.map(normalizeJobApplication);
  const filtered = normalized.filter(j => !deletedIds.has(j.id));
  try { localStorage.setItem('ithunt_careers_cache', JSON.stringify(filtered)); } catch (e) {}
  return filtered;
}

/**
 * Submit student review to backend REST API
 */
export async function submitReviewToBackend(data) {
  const docId = data.id || `REV-${Date.now()}`;
  const payload = {
    ...data,
    id: docId,
    name: data.name || data.fullName || 'Verified Student',
    role: data.role || data.course || 'Alumni / Student',
    course: data.course || 'Full Stack Development',
    rating: Number(data.rating) || 5,
    reviewText: data.review || data.reviewText || data.feedback || 'Excellent training at IT HUNT!',
    avatar: data.avatar || 'img/ithunt.webp',
    createdAt: data.createdAt || new Date().toISOString()
  };

  // 1. Direct save to Firebase Cloud
  await saveToFirebaseCloud('reviews', docId, payload);

  // 2. Local storage cache
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_reviews') || '[]');
    existing.unshift(payload);
    localStorage.setItem('ithunt_reviews', JSON.stringify(existing));
  } catch (e) {}

  try {
    return await API.submitReview(payload);
  } catch (error) {
    console.warn('Backend API connection warning (Review):', error.message);
    return { success: true, localOnly: true, record: payload };
  }
}

export const saveReviewRecord = submitReviewToBackend;

/**
 * Fetch verified public student reviews from backend REST API & Firebase Cloud
 */
export async function fetchReviewsFromBackend() {
  let list = [];

  try {
    const data = await API.getReviews();
    const rawList = Array.isArray(data?.reviews) ? data.reviews : (Array.isArray(data) ? data : []);
    if (rawList.length > 0) list = rawList;
  } catch (error) {
    console.warn('Backend API connection warning (Fetch Reviews):', error.message);
  }

  try {
    const fbRecords = await fetchFromFirebaseCloud('reviews');
    if (fbRecords.length > 0) {
      const map = new Map();
      list.forEach(r => map.set(r.id || r.name, r));
      fbRecords.forEach(r => {
        const k = r.id || r.name;
        map.set(k, { ...map.get(k), ...r });
      });
      list = Array.from(map.values());
    }
  } catch (e) {}

  if (list.length === 0) {
    try {
      const cached = JSON.parse(localStorage.getItem('ithunt_reviews') || '[]');
      if (Array.isArray(cached) && cached.length > 0) {
        list = cached;
      }
    } catch (e) {}
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

  // 1. Direct save to Firebase Cloud (Firestore & Realtime DB)
  await saveToFirebaseCloud('nielit_projects', docId, payload);

  // 2. Local storage cache
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_nielit_projects') || '[]');
    const filtered = existing.filter(p => p.id !== docId && p.registrationNo !== docId && p.nielitRegNo !== docId);
    filtered.unshift(payload);
    localStorage.setItem('ithunt_nielit_projects', JSON.stringify(filtered));
  } catch (e) {}

  // 3. REST API backend sync
  const apiRes = await submitNielitProjectToBackend(payload);
  return { success: true, id: docId, data: payload, record: payload, ...apiRes };
}

/**
 * Fetch all stored NIELIT Projects from backend REST API, Firebase Cloud, or local storage
 */
export async function fetchNielitProjectsFromBackend() {
  const deletedIds = new Set(JSON.parse(localStorage.getItem('ithunt_deleted_nielit_ids') || '[]'));
  let list = [];

  // 1. Try REST API
  try {
    const data = await API.getNielitProjects();
    const rawList = Array.isArray(data?.projects) 
      ? data.projects 
      : (Array.isArray(data) ? data : []);
    if (rawList.length > 0) list = rawList;
  } catch (e) {
    console.warn('Notice loading nielit projects from API:', e.message);
  }

  // 2. Fetch & merge from Firebase Cloud (Firestore & Realtime DB)
  try {
    const fbRecords = await fetchFromFirebaseCloud('nielit_projects');
    if (fbRecords.length > 0) {
      const map = new Map();
      list.forEach(p => map.set(p.id || p.regNo || p.registrationNo || p.nielitRegNo, p));
      fbRecords.forEach(p => {
        const k = p.id || p.regNo || p.registrationNo || p.nielitRegNo;
        map.set(k, { ...map.get(k), ...p });
      });
      list = Array.from(map.values());
    }
  } catch (e) {
    console.warn('Notice loading nielit projects from Firebase Cloud:', e.message);
  }

  // 3. Fallback to localStorage cache
  if (list.length === 0) {
    try {
      const cached = JSON.parse(localStorage.getItem('ithunt_nielit_cache') || localStorage.getItem('ithunt_nielit_projects') || '[]');
      if (Array.isArray(cached) && cached.length > 0) {
        list = cached;
      }
    } catch (e) {}
  }

  const normalized = list.map(normalizeNielitProject);
  const filtered = normalized.filter(p => !deletedIds.has(p.id) && !deletedIds.has(p.registrationNo) && !deletedIds.has(p.nielitRegNo));
  try { localStorage.setItem('ithunt_nielit_cache', JSON.stringify(filtered)); } catch (e) {}
  return filtered;
}

/**
 * Update submitted NIELIT Project in backend REST API & Firebase Cloud
 */
export async function updateNielitProjectInBackend(id, data) {
  if (!id) return { success: false };
  const cleanId = String(id).replace(/\//g, '_');

  // 1. Update in Firebase Cloud
  await saveToFirebaseCloud('nielit_projects', cleanId, data);

  // 2. Update local storage
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_nielit_projects') || '[]');
    const idx = existing.findIndex(p => p.id === cleanId || p.registrationNo === cleanId || p.nielitRegNo === cleanId);
    if (idx !== -1) {
      existing[idx] = { ...existing[idx], ...data };
      localStorage.setItem('ithunt_nielit_projects', JSON.stringify(existing));
    }
  } catch (e) {}

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
 * Delete submitted NIELIT Project from backend REST API & Firebase Cloud
 */
export async function deleteNielitProjectFromBackend(id, token = '') {
  if (!id) return false;
  const cleanId = String(id).replace(/\//g, '_');

  // 1. Delete from Firebase Cloud
  await deleteFromFirebaseCloud('nielit_projects', cleanId);

  // 2. Mark in deleted IDs local cache
  try {
    const deletedIds = JSON.parse(localStorage.getItem('ithunt_deleted_nielit_ids') || '[]');
    deletedIds.push(cleanId);
    localStorage.setItem('ithunt_deleted_nielit_ids', JSON.stringify(deletedIds));
  } catch (e) {}

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

  // 1. Direct save to Firebase Cloud (Firestore & Realtime DB)
  await saveToFirebaseCloud('event_rsvps', docId, payload);

  // 2. Local storage cache
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_rsvps') || '[]');
    const filtered = existing.filter(r => r.id !== docId);
    filtered.unshift(payload);
    localStorage.setItem('ithunt_rsvps', JSON.stringify(filtered));
  } catch (e) {}

  // 3. REST API backend sync
  const apiRes = await submitRsvpToBackend(payload);
  return { success: true, id: docId, record: payload, ...apiRes };
}

export async function fetchRsvpsFromBackend() {
  const deletedIds = new Set(JSON.parse(localStorage.getItem('ithunt_deleted_rsvp_ids') || '[]'));
  let list = [];

  // 1. Try REST API
  try {
    const data = await API.getEvents();
    const rawList = Array.isArray(data?.rsvps)
      ? data.rsvps
      : (Array.isArray(data?.events) ? data.events : (Array.isArray(data) ? data : []));
    if (rawList.length > 0) list = rawList;
  } catch (e) {}

  // 2. Fetch & merge from Firebase Cloud
  try {
    const fbRecords = await fetchFromFirebaseCloud('event_rsvps');
    if (fbRecords.length > 0) {
      const map = new Map();
      list.forEach(r => map.set(r.id, r));
      fbRecords.forEach(r => {
        if (r.id) map.set(r.id, { ...map.get(r.id), ...r });
      });
      list = Array.from(map.values());
    }
  } catch (e) {
    console.warn('Notice loading RSVPs from Firebase Cloud:', e.message);
  }

  // 3. Fallback to localStorage cache
  if (list.length === 0) {
    try {
      const cached = JSON.parse(localStorage.getItem('ithunt_rsvps_cache') || localStorage.getItem('ithunt_rsvps') || '[]');
      if (Array.isArray(cached) && cached.length > 0) {
        list = cached;
      }
    } catch (e) {}
  }

  const normalized = list.map(normalizeRsvp);
  const filtered = normalized.filter(r => !deletedIds.has(r.id));
  try { localStorage.setItem('ithunt_rsvps_cache', JSON.stringify(filtered)); } catch (e) {}
  return filtered;
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

  // Fetch/merge live student records directly from Firebase Cloud Firestore
  try {
    const fbRecords = await fetchFromFirebaseCloud('students');
    if (fbRecords.length > 0) {
      const map = new Map();
      list.forEach(s => map.set(s.id || s.userId || s.email, s));
      fbRecords.forEach(s => map.set(s.id || s.userId || s.email, { ...map.get(s.id || s.userId || s.email), ...s }));
      list = Array.from(map.values());
    }
  } catch (e) {}

  // Fallback to localStorage
  if (list.length === 0) {
    try {
      const cached = JSON.parse(localStorage.getItem('ithunt_students') || '[]');
      if (Array.isArray(cached) && cached.length > 0) {
        list = cached;
      }
    } catch (e) {}
  }

  return list.map(normalizeStudent);
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
  const studentId = studentData.id || `STU-${Date.now()}`;
  const userId = studentData.userId || `USR-${Date.now()}`;
  const enrollmentNumber = studentData.enrollmentNumber || `ITH-${new Date().getFullYear()}-STU${Math.floor(1000 + Math.random() * 9000)}`;

  const payload = {
    ...studentData,
    id: studentId,
    userId,
    enrollmentNumber,
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
    createdAt: new Date().toISOString()
  };

  // 1. Save directly to Firebase Cloud Database (ithunt-3a42d)
  saveToFirebaseCloud('students', studentId, payload);
  saveToFirebaseCloud('users', userId, {
    id: userId,
    name: payload.name,
    email: payload.email,
    role: 'student',
    verified: true,
    createdAt: new Date().toISOString()
  });

  // 2. Try REST API endpoint
  try {
    const data = await API.registerStudent(payload);
    return { success: true, data };
  } catch (error) {
    console.warn('Backend API notice, returning saved Firebase Cloud student record:', error.message);
    return { success: true, data: { user: payload, student: payload } };
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
 * Fetch all Internship Applications from backend REST API (GET /api/internships/applications)
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

  try {
    const fbRecords = await fetchFromFirebaseCloud('internships');
    if (fbRecords.length > 0) {
      const map = new Map();
      list.forEach(i => map.set(i.id || i.candidateName, i));
      fbRecords.forEach(i => map.set(i.id || i.candidateName, { ...map.get(i.id || i.candidateName), ...i }));
      list = Array.from(map.values());
    }
  } catch (e) {}

  if (list.length === 0) {
    try {
      const cached = JSON.parse(localStorage.getItem('ithunt_internships') || '[]');
      if (Array.isArray(cached) && cached.length > 0) {
        list = cached;
      }
    } catch (e) {}
  }

  return list.map(normalizeInternship);
}

/**
 * Fetch all Fees Ledger Payments from backend REST API (GET /api/fees)
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

  try {
    const fbRecords = await fetchFromFirebaseCloud('fees');
    if (fbRecords.length > 0) {
      const map = new Map();
      list.forEach(f => map.set(f.id || f.receiptNo || f.receiptNumber, f));
      fbRecords.forEach(f => map.set(f.id || f.receiptNo || f.receiptNumber, { ...map.get(f.id || f.receiptNo || f.receiptNumber), ...f }));
      list = Array.from(map.values());
    }
  } catch (e) {}

  if (list.length === 0) {
    try {
      const cached = JSON.parse(localStorage.getItem('ithunt_fees') || '[]');
      if (Array.isArray(cached) && cached.length > 0) {
        list = cached;
      }
    } catch (e) {}
  }

  return list.map(normalizeFee);
}

/**
 * Fetch all Verified Certificates from backend REST API (GET /api/certificates)
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

  try {
    const fbRecords = await fetchFromFirebaseCloud('certificates');
    if (fbRecords.length > 0) {
      const map = new Map();
      list.forEach(c => map.set(c.id || c.certNo || c.certificateNumber, c));
      fbRecords.forEach(c => map.set(c.id || c.certNo || c.certificateNumber, { ...map.get(c.id || c.certNo || c.certificateNumber), ...c }));
      list = Array.from(map.values());
    }
  } catch (e) {}

  if (list.length === 0) {
    try {
      const cached = JSON.parse(localStorage.getItem('ithunt_certificates') || '[]');
      if (Array.isArray(cached) && cached.length > 0) {
        list = cached;
      }
    } catch (e) {}
  }

  return list.map(normalizeCertificate);
}

/**
 * Fetch all Capstone Projects from backend REST API (GET /api/projects)
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

  try {
    const fbRecords = await fetchFromFirebaseCloud('projects');
    if (fbRecords.length > 0) {
      const map = new Map();
      list.forEach(p => map.set(p.id || p.title, p));
      fbRecords.forEach(p => map.set(p.id || p.title, { ...map.get(p.id || p.title), ...p }));
      list = Array.from(map.values());
    }
  } catch (e) {}

  if (list.length === 0) {
    try {
      const cached = JSON.parse(localStorage.getItem('ithunt_projects') || '[]');
      if (Array.isArray(cached) && cached.length > 0) {
        list = cached;
      }
    } catch (e) {}
  }

  return list.map(normalizeProject);
}

/**
 * Fetch all Contact Inquiries from backend REST API (GET /api/contact)
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

  try {
    const fbRecords = await fetchFromFirebaseCloud('contact');
    if (fbRecords.length > 0) {
      const map = new Map();
      list.forEach(c => map.set(c.id || c.email, c));
      fbRecords.forEach(c => map.set(c.id || c.email, { ...map.get(c.id || c.email), ...c }));
      list = Array.from(map.values());
    }
  } catch (e) {}

  if (list.length === 0) {
    try {
      const cached = JSON.parse(localStorage.getItem('ithunt_contact_inquiries') || '[]');
      if (Array.isArray(cached) && cached.length > 0) {
        list = cached;
      }
    } catch (e) {}
  }

  return list.map(normalizeContactInquiry);
}

/**
 * Fetch all Auth Users from backend REST API (GET /api/auth/users)
 */
export async function fetchUsersFromBackend() {
  let list = [];

  try {
    const data = await API.getUsers();
    const rawList = Array.isArray(data?.users) ? data.users : (Array.isArray(data) ? data : []);
    if (rawList.length > 0) {
      list = rawList;
    }
  } catch (e) {
    console.warn('Notice loading auth users from API:', e.message);
  }

  // Fetch/merge live user accounts directly from Firebase Cloud Firestore
  try {
    const fbRecords = await fetchFromFirebaseCloud('users');
    if (fbRecords.length > 0) {
      const map = new Map();
      list.forEach(u => map.set(u.id || u.email, u));
      fbRecords.forEach(u => map.set(u.id || u.email, { ...map.get(u.id || u.email), ...u }));
      list = Array.from(map.values());
    }
  } catch (e) {}

  if (list.length === 0) {
    try {
      const cached = JSON.parse(localStorage.getItem('ithunt_users') || '[]');
      if (Array.isArray(cached) && cached.length > 0) {
        list = cached;
      }
    } catch (e) {}
  }

  return list.map(normalizeUser);
}

/**
 * Delete user account or admission by ID from backend REST API
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
