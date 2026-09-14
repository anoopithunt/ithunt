import mongoose from 'mongoose';

let cached = global._mongooseConn;
if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

let isAtlasConnection = false;
let lastMongoError = null;
let secondaryConnection = null;

const ATLAS_PRODUCTION_URI = 'mongodb+srv://anoopmishrapitz_db_user:IthuntPass2026@cluster0.oo3akne.mongodb.net/ithunt?retryWrites=true&w=majority';

/**
 * Connect to MongoDB using Mongoose (Supports local MongoDB & MongoDB Atlas Cloud)
 */
export async function connectMongo() {
  if (mongoose.connection?.readyState === 1) {
    return true;
  }

  if (cached.promise) {
    try {
      await cached.promise;
      if (mongoose.connection?.readyState === 1) return true;
    } catch (e) {
      cached.promise = null;
    }
  }

  let rawUri = (process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI || '').trim();
  
  // In cloud/serverless environments (Vercel) or when no local URI specified, use Atlas Cloud
  if (!rawUri || (process.env.VERCEL && (rawUri.includes('127.0.0.1') || rawUri.includes('localhost')))) {
    rawUri = ATLAS_PRODUCTION_URI;
  }

  isAtlasConnection = rawUri.startsWith('mongodb+srv://') || rawUri.includes('.mongodb.net');

  try {
    mongoose.set('strictQuery', false);
    cached.promise = mongoose.connect(rawUri, {
      dbName: 'ithunt',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      maxPoolSize: 10,
      bufferCommands: false
    });
    await cached.promise;
    lastMongoError = null;
    const dbName = mongoose.connection?.name || 'ithunt';
    const typeLabel = isAtlasConnection ? 'MongoDB Atlas Cloud' : 'Local MongoDB';
    console.log(`✓ ${typeLabel} Connected: ${dbName}`);
  } catch (error) {
    cached.promise = null;
    lastMongoError = error.message;
    const typeLabel = isAtlasConnection ? 'MongoDB Atlas Cloud' : 'MongoDB';
    console.warn(`! ${typeLabel} notice (ithunt): ${error.message}.`);
  }

  // Connect secondary database for simultaneous Dual-Sync with MongoDB Compass
  const secondaryUri = isAtlasConnection ? 'mongodb://127.0.0.1:27017/ithunt' : ATLAS_PRODUCTION_URI;
  if (!process.env.VERCEL) {
    try {
      secondaryConnection = await mongoose.createConnection(secondaryUri, {
        dbName: 'ithunt',
        serverSelectionTimeoutMS: 4000,
        socketTimeoutMS: 20000,
        maxPoolSize: 5
      }).asPromise();
      const secType = secondaryUri.includes('.mongodb.net') ? 'MongoDB Atlas Cloud' : 'Local MongoDB';
      console.log(`✓ Dual-Sync Active with ${secType}: ithunt`);
    } catch (secErr) {
      secondaryConnection = null;
    }
  }

  return mongoose.connection?.readyState === 1;
}

export function getSecondaryDb() {
  return secondaryConnection && secondaryConnection.readyState === 1 ? secondaryConnection.db : null;
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
export const getFirestoreDb = () => null;
export const getRealtimeDb = () => null;
export const getFirestore = () => null;

