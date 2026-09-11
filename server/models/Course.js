import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  category: { type: String, default: 'Software Engineering' },
  duration: { type: String, default: '6 Months' },
  fee: { type: String, default: '₹15,000' },
  badge: { type: String, default: 'Popular' },
  description: { type: String, default: '' },
  syllabus: { type: Array, default: [] },
  eligibility: { type: String, default: '10+2 / Graduate / Diploma' },
  certificate: { type: String, default: 'ISO 9001:2015 & Govt. Recognized' },
  status: { type: String, default: 'ACTIVE' },
}, { timestamps: true });

export const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);
