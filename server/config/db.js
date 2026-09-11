import mongoose from 'mongoose';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';
import { getDatabase as getAdminDatabase } from 'firebase-admin/database';
import fs from 'fs';
import path from 'path';

let mongoConnected = false;
let firebaseConnected = false;
let firestoreDb = null;
let realtimeDb = null;

/**
 * Connect to MongoDB using Mongoose
 */
export async function connectMongo() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ithunt';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
      socketTimeoutMS: 45000,
    });
    mongoConnected = true;
    console.log(`✓ MongoDB Connected successfully: ${uri.replace(/\/\/.*@/, '//***@')}`);
  } catch (error) {
    mongoConnected = false;
    console.warn(`! MongoDB notice (${uri}): ${error.message}. (Server will continue operating with hybrid fallback)`);
  }

  mongoose.connection.on('disconnected', () => {
    mongoConnected = false;
    console.warn('! MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    mongoConnected = true;
    console.log('✓ MongoDB reconnected');
  });

  return mongoConnected;
}

/**
 * Initialize Firebase Admin SDK
 */
export function initFirebaseAdmin() {
  try {
    if (getApps().length > 0) {
      firebaseConnected = true;
      firestoreDb = getAdminFirestore();
      try { realtimeDb = getAdminDatabase(); } catch (_) {}
      return { connected: true, firestore: firestoreDb, rtdb: realtimeDb };
    }

    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || 'ithunt-3a42d';
    const databaseURL = process.env.FIREBASE_DATABASE_URL || process.env.VITE_FIREBASE_DATABASE_URL || 'https://ithunt-3a42d-default-rtdb.firebaseio.com';
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

    let credential = null;
    if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
      try {
        const sa = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
        credential = cert(sa);
      } catch (e) {
        console.warn('! Could not read FIREBASE_SERVICE_ACCOUNT_PATH:', e.message);
      }
    } else if (serviceAccountJson) {
      try {
        const sa = JSON.parse(serviceAccountJson);
        credential = cert(sa);
      } catch (e) {
        console.warn('! Invalid FIREBASE_SERVICE_ACCOUNT_JSON provided');
      }
    }

    if (!credential) {
      console.log('ℹ Firebase Admin: STANDBY (Provide FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT_JSON in .env for server-side Firebase sync)');
      firebaseConnected = false;
      return { connected: false };
    }

    initializeApp({
      credential,
      projectId,
      databaseURL
    });
    firebaseConnected = true;
    firestoreDb = getAdminFirestore();
    try { realtimeDb = getAdminDatabase(); } catch (_) {}
    console.log(`✓ Firebase Admin initialized with service account for project: ${projectId}`);
  } catch (error) {
    firebaseConnected = false;
    console.warn(`! Firebase Admin notice: ${error.message}`);
  }

  return { connected: firebaseConnected, firestore: firestoreDb, rtdb: realtimeDb };
}

export const isMongoConnected = () => mongoConnected;
export const isFirebaseConnected = () => firebaseConnected;
export const getFirestoreDb = () => firestoreDb;
export const getRealtimeDb = () => realtimeDb;
// Alias for backward compatibility
export const getFirestore = () => firestoreDb;
