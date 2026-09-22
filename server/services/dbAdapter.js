import { isMongoConnected, connectMongo } from '../config/db.js';
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

// Model map (All 14 IT HUNT database collections in MongoDB Atlas)
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

async function ensureConnection() {
  if (!isMongoConnected()) {
    await connectMongo();
  }
}

export const dbAdapter = {
  /**
   * Find records with optional query filter (100% Direct from MongoDB Atlas)
   */
  async find(collectionName, query = {}) {
    await ensureConnection();
    const Model = MODELS[collectionName];
    if (!Model) return [];

    const results = await Model.find(query).sort({ createdAt: -1 }).lean();
    return results.map(r => ({ ...r, id: r._id?.toString() || r.id || r.registrationNo }));
  },

  /**
   * Find single record by query (100% Direct from MongoDB Atlas)
   */
  async findOne(collectionName, query) {
    await ensureConnection();
    const Model = MODELS[collectionName];
    if (!Model) return null;

    const doc = await Model.findOne(query).lean();
    if (doc) return { ...doc, id: doc._id?.toString() || doc.id };
    return null;
  },

  /**
   * Find record by ID or registration number (100% Direct from MongoDB Atlas)
   */
  async findById(collectionName, id) {
    await ensureConnection();
    const Model = MODELS[collectionName];
    if (!Model || !id) return null;

    if (String(id).match(/^[0-9a-fA-F]{24}$/)) {
      const doc = await Model.findById(id).lean();
      if (doc) return { ...doc, id: doc._id?.toString() || doc.id };
    }

    // Also check standard identifier fields with case-insensitive matching
    const idRegex = new RegExp(`^${String(id).trim()}$`, 'i');
    const altDoc = await Model.findOne({
      $or: [
        { id: id },
        { id: idRegex },
        { userId: id },
        { userId: idRegex },
        { code: id },
        { code: idRegex },
        { slug: id },
        { slug: idRegex },
        { registrationNo: id },
        { registrationNo: idRegex },
        { registrationNumber: id },
        { registrationNumber: idRegex },
        { enrollmentNumber: id },
        { enrollmentNumber: idRegex },
        { certNo: id },
        { certNo: idRegex },
        { certificateNumber: id },
        { certificateNumber: idRegex },
        { email: String(id).toLowerCase() }
      ]
    }).lean();

    if (altDoc) return { ...altDoc, id: altDoc._id?.toString() || altDoc.id };
    return null;
  },

  /**
   * Create new record (100% Direct to MongoDB Atlas)
   */
  async create(collectionName, data) {
    await ensureConnection();
    const Model = MODELS[collectionName];
    const cleanId = data.id || data.registrationNo || data.registrationNumber || data.enrollmentNumber || data.certNo || `${collectionName.slice(0, 3).toUpperCase()}-${Date.now()}`;
    const payload = {
      ...data,
      id: cleanId,
      createdAt: data.createdAt || new Date().toISOString()
    };

    // Automatic field normalization for strict Mongoose schemas
    if (collectionName === 'students') {
      payload.enrollmentNumber = payload.enrollmentNumber || payload.registrationNo || cleanId;
      payload.registrationNo = payload.registrationNo || payload.enrollmentNumber || cleanId;
      payload.name = payload.name || payload.fullName || payload.candidateName || 'Student';
      payload.course = payload.course || payload.program || 'Software Engineering';
      payload.email = payload.email || `${cleanId.toLowerCase()}@ithunt.com`;
    } else if (collectionName === 'nielit_projects') {
      payload.registrationNo = payload.registrationNo || payload.nielitRegNo || cleanId;
      payload.studentName = payload.studentName || payload.candidateName || payload.name || 'Candidate';
      payload.projectTitle = payload.projectTitle || payload.title || 'NIELIT Practical Project';
      payload.mobile = payload.mobile || payload.phone || '+91 9795771806';
    } else if (collectionName === 'admissions') {
      payload.registrationNo = payload.registrationNo || cleanId;
      payload.fullName = payload.fullName || payload.candidateName || payload.name || 'Candidate';
      payload.phone = payload.phone || payload.mobile || '+91 9795771806';
      payload.course = payload.course || payload.program || 'Software Engineering';
      payload.email = payload.email || `${cleanId.toLowerCase()}@ithunt.com`;
    } else if (collectionName === 'users') {
      payload.userId = payload.userId || cleanId;
      payload.name = payload.name || payload.fullName || 'User';
      payload.email = (payload.email || `${cleanId.toLowerCase()}@ithunt.com`).toLowerCase();
      payload.password = payload.password || 'Ithunt@123';
    } else if (collectionName === 'courses') {
      payload.code = payload.code || cleanId;
      payload.title = payload.title || payload.name || 'Software Course';
      payload.name = payload.name || payload.title || 'Software Course';
      payload.duration = payload.duration || '6 Months';
      payload.fee = payload.fee || '₹15,000';
    }

    if (!Model) return payload;

    try {
      const created = await Model.create(payload);
      payload._id = created._id;
      console.log(`✓ Saved record to MongoDB Atlas "${collectionName}" (${cleanId})`);
      return { ...created.toObject(), id: created._id?.toString() || cleanId };
    } catch (err) {
      if (err.code === 11000) {
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
          console.log(`✓ Upserted record in MongoDB Atlas "${collectionName}" (${cleanId})`);
          return { ...updated.toObject(), id: updated._id?.toString() || cleanId };
        }
      }
      throw err;
    }
  },

  /**
   * Update existing record (100% Direct in MongoDB Atlas)
   */
  async update(collectionName, id, updates) {
    await ensureConnection();
    const Model = MODELS[collectionName];
    if (!Model) return updates;

    let updatedDoc = null;
    const filter = String(id).match(/^[0-9a-fA-F]{24}$/)
      ? { _id: id }
      : {
          $or: [
            { id: id },
            { userId: id },
            { code: id },
            { slug: id },
            { registrationNo: id },
            { registrationNumber: id },
            { enrollmentNumber: id },
            { certNo: id },
            { email: String(id).toLowerCase() }
          ]
        };

    updatedDoc = await Model.findOneAndUpdate(
      filter,
      { ...updates, updatedAt: new Date().toISOString() },
      { new: true }
    ).lean();

    if (updatedDoc) {
      return { ...updatedDoc, id: updatedDoc._id?.toString() || id };
    }
    return { ...updates, id };
  },

  /**
   * Delete record (100% Direct from MongoDB Atlas)
   */
  async delete(collectionName, id) {
    await ensureConnection();
    const Model = MODELS[collectionName];
    if (!Model) return { success: true };

    if (String(id).match(/^[0-9a-fA-F]{24}$/)) {
      await Model.findByIdAndDelete(id);
    } else {
      await Model.deleteMany({
        $or: [
          { id: id },
          { userId: id },
          { code: id },
          { slug: id },
          { registrationNo: id },
          { registrationNumber: id },
          { enrollmentNumber: id },
          { certNo: id },
          { email: String(id).toLowerCase() }
        ]
      });
    }

    console.log(`✓ Deleted record from MongoDB Atlas "${collectionName}" (${id})`);
    return { success: true };
  },

  /**
   * Count records in a collection (100% Direct from MongoDB Atlas)
   */
  async count(collectionName, query = {}) {
    await ensureConnection();
    const Model = MODELS[collectionName];
    if (!Model) return 0;
    return await Model.countDocuments(query);
  }
};
