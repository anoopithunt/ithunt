import { submitAdmissionToBackend, submitJobApplicationToBackend, submitNielitProjectToBackend, updateNielitProjectInBackend, deleteNielitProjectFromBackend, submitRsvpToBackend, deleteUserFromBackend } from './apiClient.js';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
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
 * Update NIELIT Project submission record in Firestore, Realtime DB, and REST API
 * @param {string} idOrRegNo
 * @param {Object} updatedData
 */
export async function updateNielitProjectInFirebase(idOrRegNo, updatedData) {
  if (!idOrRegNo || !updatedData) return { success: false };

  const id = idOrRegNo;

  // 1. Sync with backend REST API
  try {
    await updateNielitProjectInBackend(id, updatedData);
  } catch (e) {}

  // 2. Local storage update
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_nielit_projects') || '[]');
    const idx = existing.findIndex(p => p.registrationNo === id || p.nielitRegNo === id || p.id === id);
    if (idx !== -1) {
      existing[idx] = { ...existing[idx], ...updatedData };
      localStorage.setItem('ithunt_nielit_projects', JSON.stringify(existing));
    }
  } catch (e) {}

  // 3. Firestore Document Update
  if (db) {
    try {
      await setDoc(doc(db, 'nielit_projects', id), {
        ...updatedData,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log('✓ NIELIT Project updated in Firebase Firestore:', id);
    } catch (e) {
      console.warn('Firestore update warning:', e.message);
    }
  }

  return { success: true };
}

/**
 * Delete NIELIT Project submission record from Firestore, Realtime DB, and REST API
 * @param {string} idOrRegNo
 */
export async function deleteNielitProjectFromFirebase(idOrRegNo) {
  if (!idOrRegNo) return { success: false };

  const id = idOrRegNo;

  // 1. Sync with backend REST API
  try {
    await deleteNielitProjectFromBackend(id);
  } catch (e) {}

  // 2. Local storage cleanup
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_nielit_projects') || '[]');
    const filtered = existing.filter(p => p.registrationNo !== id && p.nielitRegNo !== id && p.id !== id);
    localStorage.setItem('ithunt_nielit_projects', JSON.stringify(filtered));
  } catch (e) {}

  // 3. Firestore Document Deletion
  if (db) {
    try {
      await deleteDoc(doc(db, 'nielit_projects', id));
      console.log('✓ NIELIT Project document deleted from Firebase Firestore:', id);
    } catch (e) {
      console.warn('Firestore delete warning:', e.message);
    }
  }

  return { success: true };
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
    let savedId = payload.registrationNo;
    try {
      if (payload.registrationNo) {
        await setDoc(doc(db, 'admissions', payload.registrationNo), {
          ...payload,
          timestamp: serverTimestamp ? serverTimestamp() : nowIso
        }, { merge: true });
        savedId = payload.registrationNo;
      } else {
        const docRef = await addDoc(collection(db, 'admissions'), {
          ...payload,
          timestamp: serverTimestamp ? serverTimestamp() : nowIso
        });
        savedId = docRef.id;
      }
      console.log('✓ Admission record successfully written to Firebase Firestore ID:', savedId);
    } catch (err) {
      console.error('❌ Could not save Admission to Firebase Firestore:', err.message, err.code);
      if (err.code === 'permission-denied') {
        console.warn('⚠️ FIRESTORE PERMISSION DENIED: Please update your Firestore Security Rules in Firebase Console (console.firebase.google.com -> ithunt-3a42d -> Firestore Database -> Rules) to: allow read, write: if true;');
      }
      return { success: false, localOnly: true, error: err.message, code: err.code };
    }

    try {
      await addDoc(collection(db, 'users'), {
        ...userPayload,
        timestamp: serverTimestamp ? serverTimestamp() : nowIso
      });
      console.log('✓ Enrolled Student user record saved to Firestore "users" collection');
    } catch (e) {
      console.warn('Could not save to users collection:', e.message);
    }

    return { success: true, id: savedId, firestore: true };
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

/**
 * Register a new student user with Firebase Auth, Firestore, and REST API
 * @param {Object} signupData 
 */
export async function registerStudentUser(signupData) {
  if (!signupData || !signupData.email || !signupData.password) {
    return { success: false, error: 'Email and password are required' };
  }

  const regNo = `ITH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const studentRecord = {
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
    feeStatus: 'Pending Verification'
  };

  // 1. Firebase Authentication
  let authUser = null;
  if (auth) {
    try {
      const userCredential = await registerWithEmailPassword(signupData.email, signupData.password);
      authUser = userCredential.user;
      studentRecord.uid = authUser.uid;
      console.log('✓ Student registered in Firebase Auth:', authUser.uid);
    } catch (authErr) {
      console.warn('Firebase Auth registration note:', authErr.message);
    }
  }

  // 2. REST API Integration
  try {
    const apiRes = await registerStudentWithBackend(studentRecord);
    if (apiRes && apiRes.success) {
      console.log('✓ Student registered with backend REST API');
    }
  } catch (apiErr) {
    console.warn('Backend API student register notice:', apiErr.message);
  }

  // 3. Firestore Database Write
  await saveAdmissionRecord(studentRecord);
  await saveStudentRecord(studentRecord.candidateName, studentRecord.email, studentRecord);

  return { success: true, user: studentRecord, authUser };
}

/**
 * Log in student user with Firebase Auth, Firestore, and REST API
 * @param {string} email 
 * @param {string} password 
 */
export async function loginStudentUser(email, password) {
  if (!email || !password) {
    return { success: false, error: 'Email and password required' };
  }

  let authUser = null;

  // 1. Firebase Authentication
  if (auth) {
    try {
      const userCredential = await loginWithEmailPassword(email, password);
      authUser = userCredential.user;
      console.log('✓ Student authenticated with Firebase Auth:', authUser.uid);
    } catch (authErr) {
      console.warn('Firebase Auth login notice:', authErr.message);
    }
  }

  // 2. REST API Login Fallback / Verification
  try {
    const apiRes = await loginStudentWithBackend(email, password);
    if (apiRes && apiRes.success && apiRes.data?.user) {
      return { success: true, user: apiRes.data.user, authUser };
    }
  } catch (e) {}

  // 3. Firestore / Admissions Matching
  const admissions = await fetchAdmissionsFromFirebase();
  const found = admissions.find(s => s.email && s.email.toLowerCase() === email.toLowerCase());

  if (found) {
    return { success: true, user: found, authUser };
  }

  return { success: false, error: 'Invalid email or password. Please check your credentials.' };
}

/**
 * Update Student Profile details in Firestore and REST API
 * @param {Object} updatedData 
 */
export async function updateStudentProfileInFirebase(updatedData) {
  if (!updatedData || !updatedData.email) return { success: false };

  try {
    await updateStudentProfileWithBackend(updatedData);
  } catch (e) {}

  await saveAdmissionRecord(updatedData);
  await saveStudentRecord(updatedData.candidateName || updatedData.name, updatedData.email, updatedData);

  return { success: true };
}

/**
 * Delete Admission record from Firebase Firestore, Realtime DB, and REST API backend
 * @param {string} idOrRegNo 
 */
export async function deleteAdmissionFromFirebase(idOrRegNo) {
  if (!idOrRegNo) return { success: false };

  // 1. Delete from Backend REST API (curl -X DELETE http://localhost:3000/api/users/:id)
  try {
    await deleteUserFromBackend(idOrRegNo);
  } catch (e) {}

  // 2. Local storage cleanup
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_admissions') || '[]');
    const filtered = existing.filter(a => a.registrationNo !== idOrRegNo && a.id !== idOrRegNo);
    localStorage.setItem('ithunt_admissions', JSON.stringify(filtered));
  } catch (e) {}

  // 3. Firestore Document Deletion
  if (db) {
    try {
      await deleteDoc(doc(db, 'admissions', idOrRegNo));
      console.log('✓ Admission document deleted from Firebase Firestore:', idOrRegNo);
    } catch (e) {
      console.warn('Firestore admission delete notice:', e.message);
    }
  }

  return { success: true };
}

export default {
  loginWithEmailPassword,
  registerWithEmailPassword,
  logoutUser,
  onAuthUserChanged,
  saveNielitProjectRecord,
  updateNielitProjectInFirebase,
  deleteNielitProjectFromFirebase,
  saveAdmissionRecord,
  deleteAdmissionFromFirebase,
  saveJobApplicationRecord,
  saveRsvpRecord,
  saveStudentRecord,
  registerStudentUser,
  loginStudentUser,
  updateStudentProfileInFirebase,
  fetchNielitProjectsFromFirebase,
  fetchAdmissionsFromFirebase,
  fetchJobApplicationsFromFirebase,
  fetchRsvpsFromFirebase,
  fetchUsersFromFirebase,
  fetchAllStudents
};


