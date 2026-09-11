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

let isAtlasConnection = false;

/**
 * Connect to MongoDB using Mongoose (Supports local MongoDB & MongoDB Atlas Cloud)
 */
export async function connectMongo() {
  const rawUri = (process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ithunt').trim();
  isAtlasConnection = rawUri.startsWith('mongodb+srv://') || rawUri.includes('.mongodb.net');

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(rawUri, {
      dbName: 'ithunt',
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });
    mongoConnected = true;
    const dbName = mongoose.connection?.name || 'ithunt';
    const typeLabel = isAtlasConnection ? 'MongoDB Atlas Cloud' : 'MongoDB';
    console.log(`✓ ${typeLabel} Connected: ${dbName}`);
  } catch (error) {
    mongoConnected = false;
    const typeLabel = isAtlasConnection ? 'MongoDB Atlas Cloud' : 'MongoDB';
    console.warn(`! ${typeLabel} notice (ithunt): ${error.message}. (Operating in hybrid mode)`);
  }

  mongoose.connection.on('disconnected', () => {
    mongoConnected = false;
    console.warn('! MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    mongoConnected = true;
    const dbName = mongoose.connection?.name || 'ithunt';
    console.log(`✓ MongoDB reconnected: ${dbName}`);
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
export const isAtlas = () => isAtlasConnection;
export const getMongoDbName = () => (mongoConnected && mongoose.connection?.name) || 'ithunt';
export const getFirestoreDb = () => firestoreDb;
export const getRealtimeDb = () => realtimeDb;
// Alias for backward compatibility
export const getFirestore = () => firestoreDb;
