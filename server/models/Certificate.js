import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  certNo: { type: String, required: true, unique: true, index: true },
  certificateNumber: { type: String },
  studentName: { type: String, required: true },
  candidateName: { type: String },
  course: { type: String, required: true },
  courseName: { type: String },
  grade: { type: String, default: 'A+' },
  issueDate: { type: String, required: true },
  type: { type: String, default: 'course', enum: ['course', 'experience'] },
  role: { type: String },
  designation: { type: String },
  department: { type: String, default: 'Software Engineering & Cloud Solutions' },
  duration: { type: String, default: '6 Months' },
  startDate: { type: String },
  endDate: { type: String },
  technologies: { type: String },
  performance: { type: String, default: 'Outstanding' },
  authorizedSignatory: { type: String, default: 'Er. Lakshman Singh Chauhan' },
  status: { type: String, default: 'Verified & Active' },
  verificationUrl: { type: String },
}, { timestamps: true });

export const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
