import mongoose from 'mongoose';

let mongoConnected = false;
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
    console.warn(`! ${typeLabel} notice (ithunt): ${error.message}.`);
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

// Backward compatibility stubs (Firebase removed)
export function initFirebaseAdmin() {
  return { connected: false };
}

export const isMongoConnected = () => mongoConnected;
export const isFirebaseConnected = () => false;
export const isAtlas = () => isAtlasConnection;
export const getMongoDbName = () => (mongoConnected && mongoose.connection?.name) || 'ithunt';
export const getFirestoreDb = () => null;
export const getRealtimeDb = () => null;
export const getFirestore = () => null;

