import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  userId: { type: String, unique: true, sparse: true },
  enrollmentNumber: { type: String, required: true, unique: true, index: true },
  registrationNo: { type: String },
  name: { type: String, required: true },
  fullName: { type: String },
  candidateName: { type: String },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  mobile: { type: String, default: '' },
  course: { type: String, required: true },
  batch: { type: String, default: '2026' },
  academicStatus: { type: String, default: 'ACTIVE' },
  status: { type: String, default: 'ACTIVE' },
  gender: { type: String, default: 'Male' },
  dob: { type: String, default: '2004-01-01' },
  address: { type: String, default: 'Holagarh, Prayagraj' },
  guardianName: { type: String, default: '—' },
  guardianPhone: { type: String, default: '—' },
  bio: { type: String, default: '' },
  attendance: { type: Number, default: 94 },
  cgpa: { type: String, default: '8.8 / 10' },
  marks: { type: Array, default: [] },
}, { timestamps: true });

export const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
