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
  status: { type: String, default: 'Verified & Active' },
  verificationUrl: { type: String },
}, { timestamps: true });

export const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
