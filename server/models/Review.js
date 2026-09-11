import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fullName: { type: String },
  role: { type: String, default: 'Alumni / Student' },
  course: { type: String, default: 'IT Track' },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  comment: { type: String },
  review: { type: String },
  category: { type: String, default: '💻 Labs & Workstations' },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=60' },
  verified: { type: Boolean, default: true },
  approved: { type: Boolean, default: true },
  date: { type: String },
}, { timestamps: true });

export const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
