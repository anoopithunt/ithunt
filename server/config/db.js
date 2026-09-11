import mongoose from 'mongoose';

let mongoConnected = false;
let isAtlasConnection = false;
let lastMongoError = null;

const ATLAS_PRODUCTION_URI = 'mongodb+srv://anoopmishrapitz_db_user:IthuntPass2026@cluster0.oo3akne.mongodb.net/ithunt?retryWrites=true&w=majority';

/**
 * Connect to MongoDB using Mongoose (Supports local MongoDB & MongoDB Atlas Cloud)
 */
export async function connectMongo() {
  if (mongoConnected && mongoose.connection.readyState === 1) {
    return true;
  }

  let rawUri = (process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI || '').trim();
  
  // In cloud/serverless environments (Vercel) or when no local URI specified, use Atlas Cloud
  if (!rawUri || (process.env.VERCEL && (rawUri.includes('127.0.0.1') || rawUri.includes('localhost')))) {
    rawUri = ATLAS_PRODUCTION_URI;
  }

  isAtlasConnection = rawUri.startsWith('mongodb+srv://') || rawUri.includes('.mongodb.net');

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(rawUri, {
      dbName: 'ithunt',
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10
    });
    mongoConnected = true;
    lastMongoError = null;
    const dbName = mongoose.connection?.name || 'ithunt';
    const typeLabel = isAtlasConnection ? 'MongoDB Atlas Cloud' : 'Local MongoDB';
    console.log(`✓ ${typeLabel} Connected: ${dbName}`);
  } catch (error) {
    mongoConnected = false;
    lastMongoError = error.message;
    const typeLabel = isAtlasConnection ? 'MongoDB Atlas Cloud' : 'MongoDB';
    console.warn(`! ${typeLabel} notice (ithunt): ${error.message}.`);
  }

  mongoose.connection.on('disconnected', () => {
    mongoConnected = false;
    console.warn('! MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    mongoConnected = true;
    lastMongoError = null;
    const dbName = mongoose.connection?.name || 'ithunt';
    console.log(`✓ MongoDB reconnected: ${dbName}`);
  });

  return mongoConnected;
}

// Backward compatibility stubs (Firebase removed)
export function initFirebaseAdmin() {
  return { connected: false };
}

export const isMongoConnected = () => mongoConnected && mongoose.connection.readyState === 1;
export const isFirebaseConnected = () => false;
export const isAtlas = () => isAtlasConnection;
export const getLastMongoError = () => lastMongoError;
export const getMongoDbName = () => (mongoConnected && mongoose.connection?.name) || 'ithunt';
export const getFirestoreDb = () => null;
export const getRealtimeDb = () => null;
export const getFirestore = () => null;

