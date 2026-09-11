import mongoose from 'mongoose';

const InternshipSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  name: { type: String },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  mobile: { type: String },
  track: { type: String, required: true, default: 'Full Stack MERN' },
  duration: { type: String, default: '6 Months' },
  college: { type: String, default: '' },
  qualification: { type: String, default: '' },
  status: { type: String, default: 'Active Internship' },
  appliedAt: { type: String },
}, { timestamps: true });

export const Internship = mongoose.models.Internship || mongoose.model('Internship', InternshipSchema);
