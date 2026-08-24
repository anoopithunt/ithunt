import { CONTENT_DATA } from '../data/contentData.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Submit online admission registration to backend REST API
 */
export async function submitAdmissionToBackend(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/admissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.warn('Backend API connection warning (Admission):', error.message);
    return { success: false, error: error.message };
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
  try {
    const response = await fetch(`${API_BASE_URL}/nielit-projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.warn('Backend API connection warning (NIELIT Project):', error.message);
    return { success: false, error: error.message };
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
 * Delete user account by ID from backend REST API
 */
export async function deleteUserFromBackend(userId, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await response.json();
  } catch (error) {
    console.warn('Backend API connection warning (Delete User):', error.message);
    return { success: false, error: error.message };
  }
}

export default {
  submitAdmissionToBackend,
  submitJobApplicationToBackend,
  submitReviewToBackend,
  fetchReviewsFromBackend,
  submitNielitProjectToBackend,
  submitRsvpToBackend,
  loginUserWithBackend,
  fetchAdminStatsFromBackend,
  deleteUserFromBackend
};
