import mongoose from 'mongoose';

const AdmissionSchema = new mongoose.Schema({
  registrationNo: { type: String, required: true, unique: true, index: true },
  fullName: { type: String, required: true },
  candidateName: { type: String },
  fatherName: { type: String, default: '—' },
  motherName: { type: String, default: '—' },
  phone: { type: String, required: true },
  mobile: { type: String },
  email: { type: String, required: true, lowercase: true, trim: true },
  course: { type: String, required: true },
  track: { type: String },
  district: { type: String, default: 'Prayagraj' },
  address: { type: String, default: '' },
  qualification: { type: String, default: '' },
  gender: { type: String, default: 'Male' },
  dob: { type: String, default: '2004-01-01' },
  status: { type: String, default: 'Confirmed' },
  feeStatus: { type: String, default: 'Verified & Paid' },
  amountPaid: { type: String, default: '₹5,000' },
  utrNo: { type: String, default: '' },
  paymentMode: { type: String, default: 'Online UPI' },
  date: { type: String },
  time: { type: String },
}, { timestamps: true });

export const Admission = mongoose.models.Admission || mongoose.model('Admission', AdmissionSchema);
