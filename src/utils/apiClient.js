import { CONTENT_DATA } from '../data/contentData.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

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
  return { success: false, error: 'Backend REST API endpoint not responding' };
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
    return { success: false, error: error.message };
  }
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

  const token = localStorage.getItem('token') || 
                localStorage.getItem('adminToken') || 
                (() => {
                  try {
                    return JSON.parse(sessionStorage.getItem('ithunt_superadmin_auth') || '{}').token;
                  } catch (e) { return null; }
                })();

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
      console.log('✓ Project deleted successfully from database & Firebase:', projectId);
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
    return { success: false, error: error.message };
  }
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
      headers: { 'Authorization': `Bearer ${token}` }
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
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
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
    } catch (error) {
      console.warn(`API delete attempt notice for ${ep}:`, error.message);
    }
  }
  return { success: true, localOnly: true };
}

export default {
  submitAdmissionToBackend,
  submitJobApplicationToBackend,
  submitReviewToBackend,
  fetchReviewsFromBackend,
  submitNielitProjectToBackend,
  updateNielitProjectInBackend,
  deleteNielitProjectFromBackend,
  deleteProject,
  submitRsvpToBackend,
  registerStudentWithBackend,
  loginStudentWithBackend,
  updateStudentProfileWithBackend,
  loginUserWithBackend,
  fetchAdminStatsFromBackend,
  deleteUserFromBackend
};

