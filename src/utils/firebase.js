import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'ithunt-portal',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

let app;
let db = null;

try {
  if (firebaseConfig.apiKey) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    console.log('🔥 Firebase initialized successfully.');
  } else {
    console.info('ℹ️ Firebase API Key not provided in .env. Operating with local database persistence mode.');
  }
} catch (err) {
  console.warn('Firebase initialization warning:', err.message);
}

/**
 * Save NIELIT Project submission record to Firestore
 * @param {Object} data 
 */
export async function saveNielitProjectRecord(data) {
  if (!data) return { success: false };
  const payload = {
    ...data,
    type: 'NIELIT_PROJECT',
    createdAt: new Date().toISOString(),
    timestamp: serverTimestamp ? serverTimestamp() : new Date().toISOString()
  };

  // Local storage fallback
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_nielit_projects') || '[]');
    existing.unshift(payload);
    localStorage.setItem('ithunt_nielit_projects', JSON.stringify(existing));
  } catch (e) {}

  if (db) {
    try {
      const docRef = await addDoc(collection(db, 'nielit_projects'), payload);
      console.log('✓ NIELIT Project record saved to Firebase Firestore ID:', docRef.id);
      return { success: true, id: docRef.id };
    } catch (err) {
      console.warn('Could not save to Firebase Firestore, record saved locally:', err.message);
      return { success: true, localOnly: true };
    }
  }
  return { success: true, localOnly: true };
}

/**
 * Save Admission registration record to Firestore
 * @param {Object} data 
 */
export async function saveAdmissionRecord(data) {
  if (!data) return { success: false };
  const payload = {
    ...data,
    type: 'ADMISSION',
    createdAt: new Date().toISOString(),
    timestamp: serverTimestamp ? serverTimestamp() : new Date().toISOString()
  };

  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_admissions') || '[]');
    existing.unshift(payload);
    localStorage.setItem('ithunt_admissions', JSON.stringify(existing));
  } catch (e) {}

  if (db) {
    try {
      const docRef = await addDoc(collection(db, 'admissions'), payload);
      console.log('✓ Admission record saved to Firebase Firestore ID:', docRef.id);
      return { success: true, id: docRef.id };
    } catch (err) {
      console.warn('Could not save to Firebase Firestore, record saved locally:', err.message);
      return { success: true, localOnly: true };
    }
  }
  return { success: true, localOnly: true };
}

/**
 * Save Job Application record to Firestore
 * @param {Object} data 
 */
export async function saveJobApplicationRecord(data) {
  if (!data) return { success: false };
  const payload = {
    ...data,
    type: 'JOB_APPLICATION',
    createdAt: new Date().toISOString(),
    timestamp: serverTimestamp ? serverTimestamp() : new Date().toISOString()
  };

  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_job_applications') || '[]');
    existing.unshift(payload);
    localStorage.setItem('ithunt_job_applications', JSON.stringify(existing));
  } catch (e) {}

  if (db) {
    try {
      const docRef = await addDoc(collection(db, 'job_applications'), payload);
      console.log('✓ Job Application record saved to Firebase Firestore ID:', docRef.id);
      return { success: true, id: docRef.id };
    } catch (err) {
      console.warn('Could not save to Firebase Firestore, record saved locally:', err.message);
      return { success: true, localOnly: true };
    }
  }
  return { success: true, localOnly: true };
}

/**
 * Save Event RSVP record to Firestore
 * @param {Object} data 
 */
export async function saveRsvpRecord(data) {
  if (!data) return { success: false };
  const payload = {
    ...data,
    type: 'EVENT_RSVP',
    createdAt: new Date().toISOString(),
    timestamp: serverTimestamp ? serverTimestamp() : new Date().toISOString()
  };

  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_event_rsvps') || '[]');
    existing.unshift(payload);
    localStorage.setItem('ithunt_event_rsvps', JSON.stringify(existing));
  } catch (e) {}

  if (db) {
    try {
      const docRef = await addDoc(collection(db, 'event_rsvps'), payload);
      console.log('✓ Event RSVP record saved to Firebase Firestore ID:', docRef.id);
      return { success: true, id: docRef.id };
    } catch (err) {
      console.warn('Could not save to Firebase Firestore, record saved locally:', err.message);
      return { success: true, localOnly: true };
    }
  }
  return { success: true, localOnly: true };
}

export default {
  saveNielitProjectRecord,
  saveAdmissionRecord,
  saveJobApplicationRecord,
  saveRsvpRecord
};
