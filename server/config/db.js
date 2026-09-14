import mongoose from 'mongoose';

let cached = global._mongooseConn;
if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

let isAtlasConnection = false;
let lastMongoError = null;
let secondaryConnection = null;
let lastAttemptTime = 0;
let activeMaskedUri = null;

const ATLAS_PRODUCTION_URI = 'mongodb+srv://anoopmishrapitz_db_user:IthuntPass2026@cluster0.oo3akne.mongodb.net/ithunt?retryWrites=true&w=majority';

function maskUri(uri) {
  if (!uri) return 'none';
  return uri.replace(/:([^:@]+)@/, ':****@');
}

/**
 * Connect to MongoDB using Mongoose (Supports local MongoDB & MongoDB Atlas Cloud)
 */
export async function connectMongo() {
  if (mongoose.connection?.readyState === 1) {
    lastMongoError = null;
    return true;
  }

  // If a connection promise is already in flight, await it
  if (cached.promise) {
    try {
      await cached.promise;
      if (mongoose.connection?.readyState === 1) {
        lastMongoError = null;
        return true;
      }
    } catch (e) {
      // Handled in initiator
    }
  }

  // Rate-limit connection retries to prevent hammering on serverless cold starts
  const now = Date.now();
  if (lastMongoError && (now - lastAttemptTime < 6000)) {
    return false;
  }
  lastAttemptTime = now;

  // 100% Direct Cloud Database: All environments connect to MongoDB Atlas Cloud
  let rawUri = (process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI || '').trim();
  if (!rawUri || rawUri.includes('127.0.0.1') || rawUri.includes('localhost') || !rawUri.includes('cluster0.oo3akne.mongodb.net')) {
    rawUri = ATLAS_PRODUCTION_URI;
  }

  isAtlasConnection = true;
  activeMaskedUri = maskUri(rawUri);

  try {
    mongoose.set('strictQuery', false);
    cached.promise = mongoose.connect(rawUri, {
      dbName: 'ithunt',
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      maxPoolSize: 10,
      bufferCommands: false
    });
    await cached.promise;
    lastMongoError = null;
    const dbName = mongoose.connection?.name || 'ithunt';
    console.log(`✓ MongoDB Atlas Cloud Connected: ${dbName}`);
  } catch (error) {
    cached.promise = null;
    lastMongoError = error.message;
    console.warn(`! MongoDB Atlas Cloud notice (ithunt): ${error.message}.`);
  }

  return mongoose.connection?.readyState === 1;
}

export function getSecondaryDb() {
  return null;
}


// Backward compatibility stubs (Firebase removed)
export function initFirebaseAdmin() {
  return { connected: false };
}

export const isMongoConnected = () => mongoose.connection?.readyState === 1;
export const isFirebaseConnected = () => false;
export const isAtlas = () => isAtlasConnection;
export const getLastMongoError = () => lastMongoError;
export const getMongoDbName = () => (mongoose.connection?.readyState === 1 && mongoose.connection?.name) || 'ithunt';
export const getActiveMaskedUri = () => activeMaskedUri || maskUri(process.env.MONGODB_ATLAS_URI || ATLAS_PRODUCTION_URI);
export const getFirestoreDb = () => null;
export const getRealtimeDb = () => null;
export const getFirestore = () => null;

