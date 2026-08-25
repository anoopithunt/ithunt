import { CONTENT_DATA } from '../data/contentData.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Helper to retrieve stored auth token
 */
function getAuthToken() {
  try {
    return localStorage.getItem('token') || 
           localStorage.getItem('adminToken') || 
           (() => {
             try {
               return JSON.parse(sessionStorage.getItem('ithunt_superadmin_auth') || '{}').token;
             } catch (e) { return null; }
           })();
  } catch (e) {
    return null;
  }
}

/**
 * Submit online admission registration to backend REST API
 */
export async function submitAdmissionToBackend(data) {
  const endpoints = [
    `${API_BASE_URL}/admissions`,
    `${API_BASE_URL}/admission`,
    `${API_BASE_URL}/admin/admissions`
  ];
  for (const ep of endpoints) {
    try {
      const response = await fetch(ep, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
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
  try {
    const response = await fetch(`${API_BASE_URL}/admissions`);
    if (response.ok) {
      const json = await response.json();
      if (json.success && Array.isArray(json.data?.admissions)) {
        return json.data.admissions.filter(a => !deletedIds.has(a.id) && !deletedIds.has(a.registrationNo));
      }
    }
  } catch (e) {}

  try {
    const local = JSON.parse(localStorage.getItem('ithunt_admissions') || '[]');
    return local.filter(a => !deletedIds.has(a.id) && !deletedIds.has(a.registrationNo));
  } catch (e) {
    return [];
  }
}

/**
 * Submit job application to backend REST API
 */
export async function submitJobApplicationToBackend(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/careers/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
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
  try {
    const response = await fetch(`${API_BASE_URL}/careers/applications`);
    if (response.ok) {
      const json = await response.json();
      if (json.success && Array.isArray(json.data?.applications)) {
        return json.data.applications;
      }
    }
  } catch (e) {}
  try {
    return JSON.parse(localStorage.getItem('ithunt_job_applications') || '[]');
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
  const endpoints = [
    `${API_BASE_URL}/nielit-projects`,
    `${API_BASE_URL}/projects/submit`
  ];
  for (const ep of endpoints) {
    try {
      const response = await fetch(ep, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
  try {
    const response = await fetch(`${API_BASE_URL}/nielit-projects`);
    if (response.ok) {
      const json = await response.json();
      if (json.success && Array.isArray(json.data?.projects)) {
        return json.data.projects.filter(p => !deletedIds.has(p.id) && !deletedIds.has(p.registrationNo) && !deletedIds.has(p.nielitRegNo));
      }
    }
  } catch (e) {}

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
  const endpoints = [
    `${API_BASE_URL}/nielit-projects/${id}`,
    `${API_BASE_URL}/projects/${id}`
  ];
  for (const ep of endpoints) {
    try {
      const response = await fetch(ep, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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

  const token = getAuthToken();
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
      console.log('✓ Project deleted successfully from database & Firebase via ithunt-api:', projectId);
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
  try {
    const response = await fetch(`${API_BASE_URL}/events/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (response.ok) {
      const json = await response.json();
      if (json.success && Array.isArray(json.data?.events)) {
        return json.data.events;
      }
    }
  } catch (e) {}
  try {
    return JSON.parse(localStorage.getItem('ithunt_rsvps') || '[]');
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
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token || getAuthToken()}` }
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
  
  const headers = { 'Accept': '*/*' };
  const authTok = token || getAuthToken();
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
  submitAdmissionToBackend,
  saveAdmissionRecord,
  fetchAdmissionsFromBackend,
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


