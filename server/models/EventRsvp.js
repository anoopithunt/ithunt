import mongoose from 'mongoose';

const EventRsvpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  candidateName: { type: String },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  mobile: { type: String },
  eventTitle: { type: String, required: true, default: 'IT HUNT Tech Summit 2026' },
  college: { type: String, default: '' },
  status: { type: String, default: 'Confirmed' },
  date: { type: String },
}, { timestamps: true });

export const EventRsvp = mongoose.models.EventRsvp || mongoose.model('EventRsvp', EventRsvpSchema);
