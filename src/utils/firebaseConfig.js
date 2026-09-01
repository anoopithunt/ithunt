import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase Credentials read strictly with production fallback for Vercel/live hosting
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
