import mongoose from 'mongoose';

const AdmissionSchema = new mongoose.Schema({
  registrationNo: { type: String, required: true, unique: true, index: true },
  fullName: { type: String, required: true },
  candidateName: { type: String },
  fatherName: { type: String, default: '—' },
  motherName: { type: String, default: '—' },
  phone: { type: String, default: '+91 9795771806' },
  mobile: { type: String, default: '+91 9795771806' },
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
  userId: { type: String },
  password: { type: String },
  enrollmentNumber: { type: String },
  admissionConfirmed: { type: Boolean, default: false },
  admissionConfirmedDate: { type: String },
  admissionConfirmedTime: { type: String },
  confirmedAt: { type: String },
  confirmedBy: { type: String }
}, { timestamps: true, strict: false });

AdmissionSchema.pre('validate', function() {
  if (!this.fullName && this.candidateName) this.fullName = this.candidateName;
  if (!this.candidateName && this.fullName) this.candidateName = this.fullName;
  if (!this.phone && this.mobile) this.phone = this.mobile;
  if (!this.mobile && this.phone) this.mobile = this.phone;
  if (!this.phone) this.phone = '+91 9795771806';
  if (!this.mobile) this.mobile = this.phone;
  if (!this.course && this.track) this.course = this.track;
  if (!this.course) this.course = 'NIELIT O/A Level Diploma';
  if (!this.registrationNo) this.registrationNo = `ITH-${Math.floor(100000 + Math.random() * 900000)}`;
});

export const Admission = mongoose.models.Admission || mongoose.model('Admission', AdmissionSchema);
