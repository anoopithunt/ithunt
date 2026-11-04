import mongoose from 'mongoose';

const ContactInquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  fullName: { type: String },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  mobile: { type: String },
  subject: { type: String, default: 'Course Enquiry' },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'], default: 'New' },
  source: { type: String, default: 'website' },
  createdAt: { type: Date, default: Date.now },
});

export const ContactInquiry = mongoose.models.ContactInquiry || mongoose.model('ContactInquiry', ContactInquirySchema);
