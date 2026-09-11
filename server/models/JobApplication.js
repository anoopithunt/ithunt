import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fullName: { type: String },
  position: { type: String, required: true },
  role: { type: String },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  mobile: { type: String },
  experience: { type: String, default: 'Entry Level / Fresher' },
  resumeLink: { type: String, default: '' },
  portfolio: { type: String, default: '' },
  status: { type: String, default: 'Pending Review' },
  date: { type: String },
}, { timestamps: true });

export const JobApplication = mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);
