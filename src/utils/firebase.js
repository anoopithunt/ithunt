import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'ithunt-3a42d',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '649496257816',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:649496257816:web:47fe9d549e7494198aaa6d',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''
};

let app;
let db = null;
let auth = null;
let analytics = null;

try {
  if (firebaseConfig.apiKey) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    isSupported().then(supported => {
      if (supported && firebaseConfig.measurementId) {
        analytics = getAnalytics(app);
      }
    }).catch(() => {});
    console.log('🔥 Firebase Firestore, Authentication & Analytics initialized successfully.');
  } else {
    console.info('ℹ️ Firebase API Key not provided in .env. Operating with local database persistence mode.');
  }
} catch (err) {
  console.warn('Firebase initialization warning:', err.message);
}

/**
 * Sign in user with Email and Password
 */
export async function loginWithEmailPassword(email, password) {
  if (!auth) throw new Error('Firebase Auth not initialized. Check VITE_FIREBASE_API_KEY in .env.');
  return await signInWithEmailAndPassword(auth, email, password);
}

/**
 * Register new user with Email and Password
 */
export async function registerWithEmailPassword(email, password) {
  if (!auth) throw new Error('Firebase Auth not initialized. Check VITE_FIREBASE_API_KEY in .env.');
  return await createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Sign out current user
 */
export async function logoutUser() {
  if (!auth) return;
  return await signOut(auth);
}

/**
 * Listen to auth state changes
 */
export function onAuthUserChanged(callback) {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
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
      console.error('❌ Could not save NIELIT project to Firebase Firestore:', err);
      return { success: true, localOnly: true, error: err.message };
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
      console.error('❌ Could not save Admission to Firebase Firestore:', err);
      return { success: true, localOnly: true, error: err.message };
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
      console.error('❌ Could not save Job Application to Firebase Firestore:', err);
      return { success: true, localOnly: true, error: err.message };
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
      console.error('❌ Could not save Event RSVP to Firebase Firestore:', err);
      return { success: true, localOnly: true, error: err.message };
    }
  }
  return { success: true, localOnly: true };
}

/**
 * Fetch all stored NIELIT Projects from Firebase Firestore or local storage
 */
export async function fetchNielitProjectsFromFirebase() {
  if (db) {
    try {
      const q = query(collection(db, 'nielit_projects'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.warn('Fetching from Firestore failed, reading local storage:', e.message);
    }
  }
  try {
    return JSON.parse(localStorage.getItem('ithunt_nielit_projects') || '[]');
  } catch (e) { return []; }
}

/**
 * Fetch all stored Admissions from Firebase Firestore or local storage
 */
export async function fetchAdmissionsFromFirebase() {
  if (db) {
    try {
      const q = query(collection(db, 'admissions'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.warn('Fetching from Firestore failed, reading local storage:', e.message);
    }
  }
  try {
    return JSON.parse(localStorage.getItem('ithunt_admissions') || '[]');
  } catch (e) { return []; }
}

/**
 * Fetch all stored Job Applications from Firebase Firestore or local storage
 */
export async function fetchJobApplicationsFromFirebase() {
  if (db) {
    try {
      const q = query(collection(db, 'job_applications'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.warn('Fetching from Firestore failed, reading local storage:', e.message);
    }
  }
  try {
    return JSON.parse(localStorage.getItem('ithunt_job_applications') || '[]');
  } catch (e) { return []; }
}

/**
 * Fetch all stored Event RSVPs from Firebase Firestore or local storage
 */
export async function fetchRsvpsFromFirebase() {
  if (db) {
    try {
      const q = query(collection(db, 'event_rsvps'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.warn('Fetching from Firestore failed, reading local storage:', e.message);
    }
  }
  try {
    return JSON.parse(localStorage.getItem('ithunt_event_rsvps') || '[]');
  } catch (e) { return []; }
}

export default {
  loginWithEmailPassword,
  registerWithEmailPassword,
  logoutUser,
  onAuthUserChanged,
  saveNielitProjectRecord,
  saveAdmissionRecord,
  saveJobApplicationRecord,
  saveRsvpRecord,
  fetchNielitProjectsFromFirebase,
  fetchAdmissionsFromFirebase,
  fetchJobApplicationsFromFirebase,
  fetchRsvpsFromFirebase
};
