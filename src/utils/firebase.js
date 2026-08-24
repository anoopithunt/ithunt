import { submitAdmissionToBackend, submitJobApplicationToBackend, submitNielitProjectToBackend, submitRsvpToBackend } from './apiClient.js';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { getDatabase, ref as rtdbRef, push as rtdbPush, get as rtdbGet } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAgYRupnwQdIDC-MfBGSJApvOQDMxJZbeI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'ithunt-3a42d.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://ithunt-3a42d-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'ithunt-3a42d',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'ithunt-3a42d.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '649496257816',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:649496257816:web:47fe9d549e7494198aaa6d',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-Q441K5VDH5'
};

let app;
let db = null;
let rtdb = null;
let auth = null;
let analytics = null;

try {
  if (firebaseConfig.apiKey) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    try {
      if (firebaseConfig.databaseURL) {
        rtdb = getDatabase(app);
      }
    } catch (e) {}
    auth = getAuth(app);
    isSupported().then(supported => {
      if (supported && firebaseConfig.measurementId) {
        analytics = getAnalytics(app);
      }
    }).catch(() => {});
    console.log('🔥 Firebase Firestore, Realtime DB & Auth initialized successfully.');
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
 * Save NIELIT Project submission record to Firestore & Realtime DB
 * @param {Object} data 
 */
export async function saveNielitProjectRecord(data) {
  if (!data) return { success: false };
  
  const nowIso = new Date().toISOString();
  const nowMs = Date.now();

  const payload = {
    ...data,
    type: 'NIELIT_PROJECT',
    createdAt: nowIso,
    createdAtMs: nowMs
  };

  const userPayload = {
    name: data.candidateName || data.name || 'Student Candidate',
    email: data.email || '',
    mobile: data.mobile || data.phone || '',
    role: 'Student',
    category: 'NIELIT_PROJECT_STUDENT',
    registrationNo: data.nielitRegNo || data.registrationNo || '',
    nielitLevel: data.nielitLevel || 'O',
    projectTitle: data.projectTitle || '',
    guideName: data.guideName || '',
    district: data.district || '',
    state: data.state || '',
    createdAt: nowIso,
    createdAtMs: nowMs
  };

  // Local storage fallback
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_nielit_projects') || '[]');
    existing.unshift(payload);
    localStorage.setItem('ithunt_nielit_projects', JSON.stringify(existing));
  } catch (e) {}

  // 1. Realtime Database Write
  if (rtdb) {
    try {
      rtdbPush(rtdbRef(rtdb, 'nielit_projects'), payload);
      submitNielitProjectToBackend(payload).catch(() => {});
      rtdbPush(rtdbRef(rtdb, 'users'), userPayload);
      console.log('✓ NIELIT Project & Student User pushed to Firebase Realtime DB');
    } catch (e) {
      console.warn('Realtime DB push notice:', e.message);
    }
  }

  // 2. Cloud Firestore Database Write
  if (db) {
    let usersDocId = null;
    let projectDocId = null;

    try {
      const userRef = await addDoc(collection(db, 'users'), {
        ...userPayload,
        timestamp: serverTimestamp ? serverTimestamp() : nowIso
      });
      usersDocId = userRef.id;
      console.log('✓ Student user record saved to Firestore "users" collection ID:', usersDocId);
    } catch (e) {
      console.warn('Could not save to Firestore users collection:', e.message);
    }

    try {
      const docRef = await addDoc(collection(db, 'nielit_projects'), {
        ...payload,
        timestamp: serverTimestamp ? serverTimestamp() : nowIso
      });
      projectDocId = docRef.id;
      console.log('✓ NIELIT Project record saved to Firestore "nielit_projects" collection ID:', projectDocId);
      return { success: true, id: projectDocId, userId: usersDocId };
    } catch (err) {
      console.error('❌ Could not save NIELIT project to Firebase Firestore:', err);
      return { success: true, localOnly: true, error: err.message };
    }
  }
  return { success: true, localOnly: true };
}

/**
 * Save Admission registration record to Firestore & Realtime DB
 * @param {Object} data 
 */
export async function saveAdmissionRecord(data) {
  if (!data) return { success: false };

  const nowIso = new Date().toISOString();
  const nowMs = Date.now();

  const payload = {
    ...data,
    type: 'ADMISSION',
    createdAt: nowIso,
    createdAtMs: nowMs
  };

  const userPayload = {
    name: data.candidateName || data.name || 'Enrolled Student',
    email: data.email || '',
    mobile: data.mobile || '',
    role: 'Student',
    category: 'ADMISSION_STUDENT',
    registrationNo: data.registrationNo || '',
    course: data.course || '',
    fatherName: data.fatherName || '',
    district: data.district || '',
    address: data.address || '',
    createdAt: nowIso,
    createdAtMs: nowMs
  };

  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_admissions') || '[]');
    existing.unshift(payload);
    localStorage.setItem('ithunt_admissions', JSON.stringify(existing));
  } catch (e) {}

  // Realtime Database Push
  if (rtdb) {
    try {
      rtdbPush(rtdbRef(rtdb, 'admissions'), payload);
      submitAdmissionToBackend(payload).catch(() => {});
      rtdbPush(rtdbRef(rtdb, 'users'), userPayload);
      console.log('✓ Admission record & Student User pushed to Firebase Realtime DB');
    } catch (e) {
      console.warn('Realtime DB push notice:', e.message);
    }
  }

  // Cloud Firestore Write
  if (db) {
    try {
      await addDoc(collection(db, 'users'), {
        ...userPayload,
        timestamp: serverTimestamp ? serverTimestamp() : nowIso
      });
      console.log('✓ Enrolled Student record saved to Firestore "users" collection');
    } catch (e) {
      console.warn('Could not save to users collection:', e.message);
    }

    try {
      const docRef = await addDoc(collection(db, 'admissions'), {
        ...payload,
        timestamp: serverTimestamp ? serverTimestamp() : nowIso
      });
      console.log('✓ Admission record saved to Firestore "admissions" collection ID:', docRef.id);
      return { success: true, id: docRef.id };
    } catch (err) {
      console.error('❌ Could not save Admission to Firebase Firestore:', err);
      return { success: true, localOnly: true, error: err.message };
    }
  }
  return { success: true, localOnly: true };
}

/**
 * Save Job Application record to Firestore & Realtime DB
 * @param {Object} data 
 */
export async function saveJobApplicationRecord(data) {
  if (!data) return { success: false };

  const nowIso = new Date().toISOString();
  const nowMs = Date.now();

  const payload = {
    ...data,
    type: 'JOB_APPLICATION',
    createdAt: nowIso,
    createdAtMs: nowMs
  };

  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_job_applications') || '[]');
    existing.unshift(payload);
    localStorage.setItem('ithunt_job_applications', JSON.stringify(existing));
  } catch (e) {}

  if (rtdb) {
    try {
      rtdbPush(rtdbRef(rtdb, 'job_applications'), payload);
      submitJobApplicationToBackend(payload).catch(() => {});
      console.log('✓ Job Application record pushed to Firebase Realtime DB');
    } catch (e) {
      console.warn('Realtime DB push notice:', e.message);
    }
  }

  if (db) {
    try {
      const docRef = await addDoc(collection(db, 'job_applications'), {
        ...payload,
        timestamp: serverTimestamp ? serverTimestamp() : nowIso
      });
      console.log('✓ Job Application record saved to Firestore "job_applications" collection ID:', docRef.id);
      return { success: true, id: docRef.id };
    } catch (err) {
      console.error('❌ Could not save Job Application to Firebase Firestore:', err);
      return { success: true, localOnly: true, error: err.message };
    }
  }
  return { success: true, localOnly: true };
}

/**
 * Save Event RSVP record to Firestore & Realtime DB
 * @param {Object} data 
 */
export async function saveRsvpRecord(data) {
  if (!data) return { success: false };

  const nowIso = new Date().toISOString();
  const nowMs = Date.now();

  const payload = {
    ...data,
    type: 'EVENT_RSVP',
    createdAt: nowIso,
    createdAtMs: nowMs
  };

  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_event_rsvps') || '[]');
    existing.unshift(payload);
    localStorage.setItem('ithunt_event_rsvps', JSON.stringify(existing));
  } catch (e) {}

  if (rtdb) {
    try {
      rtdbPush(rtdbRef(rtdb, 'event_rsvps'), { ...payload, timestamp: Date.now() });
      submitRsvpToBackend(payload).catch(() => {});
      console.log('✓ Event RSVP record pushed to Firebase Realtime DB');
    } catch (e) {
      console.warn('Realtime DB push warning:', e.message);
    }
  }

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

/**
 * Fetch all stored users from Firebase Firestore
 */
export async function fetchUsersFromFirebase() {
  if (db) {
    try {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.warn('Fetching users from Firestore failed:', e.message);
    }
  }
  return [];
}

/**
 * Save Student Record directly to Firestore "users" collection
 * @param {string} studentName 
 * @param {string} studentEmail 
 * @param {Object} [extraData] 
 */
export async function saveStudentRecord(studentName, studentEmail, extraData = {}) {
  if (!db) {
    console.warn('Firestore database is not initialized. Check VITE_FIREBASE_API_KEY in .env.');
    return { success: false, error: 'Database not initialized' };
  }
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: studentName,
      email: studentEmail,
      role: "student",
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp ? serverTimestamp() : new Date().toISOString(),
      ...extraData
    });
    console.log("Student record stored successfully with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding student record: ", error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch all students from Firestore "users" collection
 */
export async function fetchAllStudents() {
  if (!db) {
    console.warn('Firestore database is not initialized. Check VITE_FIREBASE_API_KEY in .env.');
    return [];
  }
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const students = [];
    querySnapshot.forEach((doc) => {
      console.log(`Student ID: ${doc.id}`, doc.data());
      students.push({ id: doc.id, ...doc.data() });
    });
    return students;
  } catch (error) {
    console.error("Error fetching students: ", error);
    return [];
  }
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
  saveStudentRecord,
  fetchNielitProjectsFromFirebase,
  fetchAdmissionsFromFirebase,
  fetchJobApplicationsFromFirebase,
  fetchRsvpsFromFirebase,
  fetchUsersFromFirebase,
  fetchAllStudents
};
