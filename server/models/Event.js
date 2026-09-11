import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  category: { type: String, default: 'Tech Summit' },
  date: { type: String, required: true },
  time: { type: String, default: '10:00 AM - 04:00 PM' },
  venue: { type: String, default: 'IT HUNT Campus, Holagarh, Prayagraj' },
  mode: { type: String, default: 'Hybrid (Offline + Live Stream)' },
  banner: { type: String, default: '' },
  speakers: { type: Array, default: [] },
  highlights: { type: Array, default: [] },
  seatsTotal: { type: Number, default: 200 },
  seatsBooked: { type: Number, default: 45 },
  status: { type: String, default: 'UPCOMING' },
}, { timestamps: true });

export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
