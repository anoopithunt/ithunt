import { isMongoConnected, isFirebaseConnected, getFirestore } from '../config/db.js';
import { User } from '../models/User.js';
import { Admission } from '../models/Admission.js';
import { Student } from '../models/Student.js';
import { NielitProject } from '../models/NielitProject.js';
import { JobApplication } from '../models/JobApplication.js';
import { Internship } from '../models/Internship.js';
import { Review } from '../models/Review.js';
import { Fee } from '../models/Fee.js';
import { Certificate } from '../models/Certificate.js';
import { Project } from '../models/Project.js';
import { ContactInquiry } from '../models/ContactInquiry.js';
import { EventRsvp } from '../models/EventRsvp.js';
import { Course } from '../models/Course.js';
import { Event } from '../models/Event.js';
import fs from 'fs';
import path from 'path';

// Model map (All 14 IT HUNT database collections)
export const MODELS = {
  users: User,
  admissions: Admission,
  students: Student,
  courses: Course,
  events_catalog: Event,
  nielit_projects: NielitProject,
  job_applications: JobApplication,
  internships: Internship,
  reviews: Review,
  fees: Fee,
  certificates: Certificate,
  projects: Project,
  contact: ContactInquiry,
  event_rsvps: EventRsvp,
};

// In-memory fallback storage
const memoryStore = new Map();
Object.keys(MODELS).forEach(k => memoryStore.set(k, new Map()));

// Seed default admin
const DEFAULT_ADMIN = {
  id: 'usr-admin-default',
  name: 'IT HUNT Super Admin',
  email: 'admin@ithunt.com',
  password: 'admin@ithunt2026',
  role: 'superadmin',
  verified: true,
  status: 'ACTIVE',
  createdAt: new Date().toISOString()
};
memoryStore.get('users').set('admin@ithunt.com', DEFAULT_ADMIN);

/**
 * Sync record to Firebase Firestore if connected
 */
async function syncToFirebase(collectionName, docId, data) {
  if (!isFirebaseConnected()) return;
  const db = getFirestore();
  if (!db) return;

  try {
    const cleanId = String(docId).replace(/\//g, '_');
    const cleanData = JSON.parse(JSON.stringify(data));
    await db.collection(collectionName).doc(cleanId).set(cleanData, { merge: true });
  } catch (err) {
    console.warn(`Firebase Admin sync notice (${collectionName}/${docId}):`, err.message);
  }
}

/**
 * Delete record from Firebase Firestore if connected
 */
async function deleteFromFirebase(collectionName, docId) {
  if (!isFirebaseConnected()) return;
  const db = getFirestore();
  if (!db) return;

  try {
    const cleanId = String(docId).replace(/\//g, '_');
    await db.collection(collectionName).doc(cleanId).delete();
  } catch (err) {
    console.warn(`Firebase Admin delete notice (${collectionName}/${docId}):`, err.message);
  }
}

export const dbAdapter = {
  /**
   * Find records with optional query filter
   */
  async find(collectionName, query = {}) {
    const Model = MODELS[collectionName];

    // 1. Try MongoDB if connected
    if (isMongoConnected() && Model) {
      try {
        const results = await Model.find(query).sort({ createdAt: -1 }).lean();
        return results.map(r => ({ ...r, id: r._id?.toString() || r.id || r.registrationNo }));
      } catch (err) {
        console.warn(`MongoDB find error on ${collectionName}, falling back:`, err.message);
      }
    }

    // 2. Try Firebase if connected and Mongo wasn't used
    if (isFirebaseConnected()) {
      const db = getFirestore();
      if (db) {
        try {
          const snapshot = await db.collection(collectionName).get();
          if (!snapshot.empty) {
            const records = [];
            snapshot.forEach(d => records.push({ id: d.id, ...d.data() }));
            return records;
          }
        } catch (_) {}
      }
    }

    // 3. Fallback to memory store
    const store = memoryStore.get(collectionName) || new Map();
    let records = Array.from(store.values());

    // Basic in-memory filtering
    if (Object.keys(query).length > 0) {
      records = records.filter(item => {
        return Object.entries(query).every(([k, v]) => {
          if (v === undefined || v === null) return true;
          return String(item[k] || '').toLowerCase() === String(v).toLowerCase();
        });
      });
    }

    return records;
  },

  /**
   * Find single record by query
   */
  async findOne(collectionName, query) {
    const Model = MODELS[collectionName];

    if (isMongoConnected() && Model) {
      try {
        const doc = await Model.findOne(query).lean();
        if (doc) return { ...doc, id: doc._id?.toString() || doc.id };
      } catch (_) {}
    }

    const records = await this.find(collectionName, query);
    return records[0] || null;
  },

  /**
   * Find record by ID or registration number
   */
  async findById(collectionName, id) {
    const Model = MODELS[collectionName];

    if (isMongoConnected() && Model) {
      try {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          const doc = await Model.findById(id).lean();
          if (doc) return { ...doc, id: doc._id?.toString() || doc.id };
        }
        // Also check custom registration fields
        const altDoc = await Model.findOne({
          $or: [
            { registrationNo: id },
            { registrationNumber: id },
            { enrollmentNumber: id },
            { certNo: id },
            { email: id.toLowerCase() }
          ]
        }).lean();
        if (altDoc) return { ...altDoc, id: altDoc._id?.toString() || altDoc.id };
      } catch (_) {}
    }

    const store = memoryStore.get(collectionName) || new Map();
    if (store.has(id)) return store.get(id);

    const all = Array.from(store.values());
    return all.find(r => 
      r.id === id || 
      r.registrationNo === id || 
      r.enrollmentNumber === id || 
      r.certNo === id || 
      r.email === id
    ) || null;
  },

  /**
   * Create new record
   */
  async create(collectionName, data) {
    const Model = MODELS[collectionName];
    const cleanId = data.id || data.registrationNo || data.registrationNumber || data.enrollmentNumber || data.certNo || `${collectionName.slice(0, 3).toUpperCase()}-${Date.now()}`;
    const payload = {
      ...data,
      id: cleanId,
      createdAt: data.createdAt || new Date().toISOString()
    };

    // 1. Save to MongoDB
    if (isMongoConnected() && Model) {
      try {
        const created = await Model.create(payload);
        payload._id = created._id;
        console.log(`✓ Saved record to MongoDB collection "${collectionName}" (${cleanId})`);
      } catch (err) {
        if (err.code === 11000) {
          try {
            const filter = {
              $or: [
                { id: cleanId },
                { registrationNo: cleanId },
                { registrationNumber: cleanId },
                { enrollmentNumber: cleanId },
                ...(payload.email ? [{ email: payload.email.toLowerCase() }] : [])
              ]
            };
            const updated = await Model.findOneAndUpdate(filter, payload, { new: true });
            if (updated) {
              payload._id = updated._id;
              console.log(`✓ Updated existing record in MongoDB collection "${collectionName}" (${cleanId})`);
            }
          } catch (updateErr) {
            console.warn(`MongoDB upsert notice on ${collectionName}:`, updateErr.message);
          }
        } else {
          console.warn(`MongoDB create notice on ${collectionName}:`, err.message);
        }
      }
    }

    // 2. Mirror to Firebase Firestore
    await syncToFirebase(collectionName, cleanId, payload);

    // 3. Save to memory store
    const store = memoryStore.get(collectionName) || new Map();
    store.set(cleanId, payload);
    if (payload.email) store.set(payload.email.toLowerCase(), payload);

    return payload;
  },

  /**
   * Update existing record
   */
  async update(collectionName, id, updates) {
    const Model = MODELS[collectionName];
    let updatedDoc = null;

    if (isMongoConnected() && Model) {
      try {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          updatedDoc = await Model.findByIdAndUpdate(id, updates, { new: true }).lean();
        } else {
          updatedDoc = await Model.findOneAndUpdate(
            {
              $or: [
                { registrationNo: id },
                { registrationNumber: id },
                { enrollmentNumber: id },
                { certNo: id },
                { email: id.toLowerCase() }
              ]
            },
            updates,
            { new: true }
          ).lean();
        }
      } catch (err) {
        console.warn(`MongoDB update notice on ${collectionName}:`, err.message);
      }
    }

    const existing = await this.findById(collectionName, id) || {};
    const merged = { ...existing, ...updates, updatedAt: new Date().toISOString() };

    await syncToFirebase(collectionName, id, merged);

    const store = memoryStore.get(collectionName) || new Map();
    store.set(id, merged);
    if (merged.id && merged.id !== id) store.set(merged.id, merged);

    return updatedDoc ? { ...updatedDoc, id: updatedDoc._id?.toString() || id } : merged;
  },

  /**
   * Delete record
   */
  async delete(collectionName, id) {
    const Model = MODELS[collectionName];

    if (isMongoConnected() && Model) {
      try {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          await Model.findByIdAndDelete(id);
        } else {
          await Model.deleteMany({
            $or: [
              { registrationNo: id },
              { registrationNumber: id },
              { enrollmentNumber: id },
              { certNo: id },
              { email: id.toLowerCase() }
            ]
          });
        }
      } catch (err) {
        console.warn(`MongoDB delete notice on ${collectionName}:`, err.message);
      }
    }

    await deleteFromFirebase(collectionName, id);

    const store = memoryStore.get(collectionName) || new Map();
    store.delete(id);

    return { success: true };
  },

  /**
   * Count records in a collection
   */
  async count(collectionName, query = {}) {
    const Model = MODELS[collectionName];
    if (isMongoConnected() && Model) {
      try {
        return await Model.countDocuments(query);
      } catch (_) {}
    }
    const records = await this.find(collectionName, query);
    return records.length;
  }
};
