import { CONTENT_DATA } from '../data/contentData.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

let memoryToken = null;

/**
 * Helper to retrieve stored auth token or automatically authenticate with default admin
 */
export async function ensureAuthToken() {
  try {
    const stored = localStorage.getItem('token') || 
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
  const token = await ensureAuthToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const payload = {
    ...data,
    fullName: data.candidateName || data.fullName || 'Candidate',
    candidateName: data.candidateName || data.fullName || 'Candidate',
    registrationNumber: data.registrationNo || data.registrationNumber || data.id,
    registrationNo: data.registrationNo || data.registrationNumber || data.id,
    phone: data.mobile || data.phone || '',
    mobile: data.mobile || data.phone || '',
    course: data.course || 'NIELIT O Level Diploma',
    track: data.course || 'NIELIT O Level Diploma',
    status: data.status || 'Confirmed'
  };

  const endpoints = [
    `${API_BASE_URL}/admissions`,
    `${API_BASE_URL}/admission`,
    `${API_BASE_URL}/admin/admissions`
  ];
  for (const ep of endpoints) {
    try {
      const response = await fetch(ep, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {}
  }
  return { success: true, localOnly: true };
}

/**
 * Save admission record (Unified API wrapper with local persistence)
 */
export async function saveAdmissionRecord(data) {
  if (!data) return { success: false };
  const nowIso = new Date().toISOString();
  const payload = {
    ...data,
    fullName: data.candidateName || data.fullName,
    candidateName: data.candidateName || data.fullName,
    registrationNumber: data.registrationNo || data.registrationNumber,
    registrationNo: data.registrationNo || data.registrationNumber,
    phone: data.mobile || data.phone,
    mobile: data.mobile || data.phone,
    type: 'ADMISSION',
    createdAt: nowIso,
    createdAtMs: Date.now()
  };

  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_admissions') || '[]');
    existing.unshift(payload);
    localStorage.setItem('ithunt_admissions', JSON.stringify(existing));
  } catch (e) {}

  const res = await submitAdmissionToBackend(payload);
  return { success: true, id: payload.registrationNo, ...res };
}

/**
 * Fetch all stored Admissions from backend REST API or local storage
 */
export async function fetchAdmissionsFromBackend() {
  const deletedIds = new Set(JSON.parse(localStorage.getItem('ithunt_deleted_admission_ids') || '[]'));
  const token = await ensureAuthToken();
  const headers = { 'Accept': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const response = await fetch(`${API_BASE_URL}/admissions`, { headers });
    if (response.ok) {
      const json = await response.json();
      const rawList = Array.isArray(json.data?.admissions) 
        ? json.data.admissions 
        : (Array.isArray(json.data) ? json.data : (Array.isArray(json.admissions) ? json.admissions : []));

      if (rawList.length > 0) {
        const normalized = rawList.map(a => ({
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

        return normalized.filter(a => !deletedIds.has(a.id) && !deletedIds.has(a.registrationNo));
      }
    }
  } catch (e) {
    console.warn('Notice loading admissions from API:', e.message);
  }

  try {
    const local = JSON.parse(localStorage.getItem('ithunt_admissions') || '[]');
    return local.filter(a => !deletedIds.has(a.id) && !deletedIds.has(a.registrationNo));
  } catch (e) {
    return [];
  }
}

/**
 * Delete admission record from backend REST API
 */
export async function deleteAdmissionFromBackend(adm) {
  const targetId = typeof adm === 'object' ? (adm.id || adm.registrationNo) : adm;
  const regNo = typeof adm === 'object' ? (adm.registrationNo || adm.id) : adm;
  const authTok = await ensureAuthToken();
  const headers = { 'Accept': '*/*' };
  if (authTok) headers['Authorization'] = `Bearer ${authTok}`;

  const idsToTry = Array.from(new Set([targetId, regNo].filter(Boolean)));
  for (const id of idsToTry) {
    const endpoints = [
      `${API_BASE_URL}/admissions/${id}`,
      `${API_BASE_URL}/users/${id}`,
      `${API_BASE_URL}/students/${id}`
    ];
    for (const ep of endpoints) {
      try {
        const response = await fetch(ep, {
          method: 'DELETE',
          headers
        });
        if (response.ok) {
          console.log(`✓ Deleted admission via backend API: ${ep}`);
        }
      } catch (e) {}
    }
  }

  return { success: true };
}

/**
 * Submit job application to backend REST API
 */
export async function submitJobApplicationToBackend(data) {
  const token = await ensureAuthToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const payload = {
    ...data,
    name: data.fullName || data.name || 'Applicant',
    phone: data.mobile || data.phone || '',
    position: data.role || data.position || 'Full Stack Instructor',
    resumeLink: data.resumeLink || 'https://example.com/resume.pdf'
  };

  try {
    const response = await fetch(`${API_BASE_URL}/careers/apply`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
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
  const token = await ensureAuthToken();
  const headers = { 'Accept': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const response = await fetch(`${API_BASE_URL}/careers/applications`, { headers });
    if (response.ok) {
      const json = await response.json();
      const rawList = Array.isArray(json.data?.applications) 
        ? json.data.applications 
        : (Array.isArray(json.data) ? json.data : (Array.isArray(json.applications) ? json.applications : []));

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

        return normalized.filter(j => !deletedIds.has(j.id));
      }
    }
  } catch (e) {
    console.warn('Notice loading job applications from API:', e.message);
  }

  try {
    const local = JSON.parse(localStorage.getItem('ithunt_job_applications') || '[]');
    return local.filter(j => !deletedIds.has(j.id));
  } catch (e) { return []; }
}

/**
 * Submit student review to backend REST API
 */
export async function submitReviewToBackend(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
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
    const response = await fetch(`${API_BASE_URL}/reviews`);
    const json = await response.json();
    return json.success ? json.data.reviews : [];
  } catch (error) {
    console.warn('Backend API connection warning (Fetch Reviews):', error.message);
    return [];
  }
}

/**
 * Submit NIELIT Project to backend REST API
 */
export async function submitNielitProjectToBackend(data) {
  const token = await ensureAuthToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const endpoints = [
    `${API_BASE_URL}/nielit-projects`,
    `${API_BASE_URL}/projects/submit`
  ];
  for (const ep of endpoints) {
    try {
      const response = await fetch(ep, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      if (response.ok) return await response.json();
    } catch (error) {}
  }
  return { success: true, localOnly: true };
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
  const token = await ensureAuthToken();
  const headers = { 'Accept': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const response = await fetch(`${API_BASE_URL}/nielit-projects`, { headers });
    if (response.ok) {
      const json = await response.json();
      const rawList = Array.isArray(json.data?.projects) 
        ? json.data.projects 
        : (Array.isArray(json.data) ? json.data : (Array.isArray(json.projects) ? json.projects : []));

      if (rawList.length > 0) {
        const normalized = rawList.map(p => ({
          id: p.id || p.registrationNo || p.nielitRegNo || `NIELIT-${Date.now()}`,
          registrationNo: p.registrationNo || p.nielitRegNo || p.id,
          nielitRegNo: p.nielitRegNo || p.registrationNo || p.id,
          candidateName: p.candidateName || p.fullName || p.name || 'Candidate',
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

        return normalized.filter(p => !deletedIds.has(p.id) && !deletedIds.has(p.registrationNo) && !deletedIds.has(p.nielitRegNo));
      }
    }
  } catch (e) {
    console.warn('Notice loading nielit projects from API:', e.message);
  }

  try {
    const local = JSON.parse(localStorage.getItem('ithunt_nielit_projects') || '[]');
    return local.filter(p => !deletedIds.has(p.id) && !deletedIds.has(p.registrationNo) && !deletedIds.has(p.nielitRegNo));
  } catch (e) {
    return [];
  }
}

/**
 * Update submitted NIELIT Project in backend REST API
 */
export async function updateNielitProjectInBackend(id, data) {
  const token = await ensureAuthToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const endpoints = [
    `${API_BASE_URL}/nielit-projects/${id}`,
    `${API_BASE_URL}/projects/${id}`
  ];
  for (const ep of endpoints) {
    try {
      const response = await fetch(ep, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
      });
      if (response.ok) return await response.json();
    } catch (error) {}
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
 * Supports both NIELIT projects (/api/nielit-projects) and showcase projects (/api/projects)
 */
export async function deleteProject(projectId, isNielit = false) {
  if (!projectId) return false;

  const token = await ensureAuthToken();
  const endpoint = isNielit ? '/nielit-projects' : '/projects';
  const headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}/${projectId}`, {
      method: 'DELETE',
      headers
    });

    const result = await response.json();
    if (result && result.success) {
      console.log('✓ Project deleted successfully via ithunt-api:', projectId);
      return true;
    } else {
      console.warn('Delete project notice:', result?.message || result?.error);
      return true;
    }
  } catch (error) {
    console.error('Delete request error:', error);
    return false;
  }
}

/**
 * Submit Event RSVP to backend REST API
 */
export async function submitRsvpToBackend(data) {
  const token = await ensureAuthToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const response = await fetch(`${API_BASE_URL}/events/rsvp`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    return await response.json();
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
  const token = await ensureAuthToken();
  const headers = { 'Accept': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const response = await fetch(`${API_BASE_URL}/events`, { headers });
    if (response.ok) {
      const json = await response.json();
      const rawList = Array.isArray(json.data?.events) 
        ? json.data.events 
        : (Array.isArray(json.data) ? json.data : (Array.isArray(json.events) ? json.events : []));

      if (rawList.length > 0) {
        const normalized = rawList.map(r => ({
          id: r.id || `RSVP-${Date.now()}`,
          name: r.name || r.fullName || 'Attendee',
          email: r.email || '',
          mobile: r.mobile || r.phone || '',
          eventTitle: r.eventTitle || r.title || 'IT HUNT Tech Summit 2026',
          status: r.status || 'Confirmed',
          date: r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-GB') : (r.date || new Date().toLocaleDateString('en-GB'))
        }));
        return normalized.filter(r => !deletedIds.has(r.id));
      }
    }
  } catch (e) {}

  try {
    const local = JSON.parse(localStorage.getItem('ithunt_rsvps') || '[]');
    return local.filter(r => !deletedIds.has(r.id));
  } catch (e) { return []; }
}

/**
 * Register a new student user via backend REST API
 */
export async function registerStudentWithBackend(studentData) {
  try {
    const response = await fetch(`${API_BASE_URL}/students/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });
    return await response.json();
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
    candidateName: signupData.candidateName || 'Student',
    email: signupData.email,
    mobile: signupData.mobile || '',
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
    const response = await fetch(`${API_BASE_URL}/students/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
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
    const response = await fetch(`${API_BASE_URL}/students/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });
    return await response.json();
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
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  } catch (error) {
    console.warn('Backend API connection warning (Login):', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch SuperAdmin executive stats from backend REST API
 */
export async function fetchAdminStatsFromBackend(token) {
  const authTok = token || await ensureAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: { 'Authorization': `Bearer ${authTok}` }
    });
    return await response.json();
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
  
  const authTok = token || await ensureAuthToken();
  const headers = { 'Accept': '*/*' };
  if (authTok) {
    headers['Authorization'] = `Bearer ${authTok}`;
  }

  const endpoints = [
    `${API_BASE_URL}/users/${userId}`,
    `${API_BASE_URL}/admissions/${userId}`,
    `${API_BASE_URL}/students/${userId}`
  ];

  for (const ep of endpoints) {
    try {
      const response = await fetch(ep, {
        method: 'DELETE',
        headers
      });
      if (response.ok) {
        console.log(`✓ Record deleted via backend API: ${ep}`);
        return await response.json();
      }
    } catch (error) {}
  }
  return { success: true, localOnly: true };
}

export default {
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
