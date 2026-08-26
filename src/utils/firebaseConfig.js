import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase Credentials read 100% strictly from Environment Variables (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''
};

let app = null;
let db = null;
let auth = null;
let rtdb = null;
let analytics = null;

try {
  // Validate presence of valid API key before initializing Firebase SDK
  if (firebaseConfig.apiKey && typeof firebaseConfig.apiKey === 'string' && firebaseConfig.apiKey.trim().length > 0) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

    try { db = getFirestore(app); } catch (e) {}
    try { auth = getAuth(app); } catch (e) {}
    try { rtdb = getDatabase(app); } catch (e) {}

    if (typeof window !== 'undefined') {
      isSupported().then(supported => {
        if (supported && app) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {});
    }
    console.log(`✓ Firebase Web SDK initialized for project: ${firebaseConfig.projectId || 'Active'}`);
  } else {
    console.warn('Notice: Firebase VITE_FIREBASE_API_KEY environment variable is not set.');
  }
} catch (err) {
  console.warn('Firebase Web SDK initialization notice:', err.message);
}

export { app, db, auth, rtdb, analytics };
export default app;
