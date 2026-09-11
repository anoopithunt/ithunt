import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  userId: { type: String, unique: true, sparse: true },
  enrollmentNumber: { type: String, required: true, unique: true, index: true },
  registrationNo: { type: String },
  name: { type: String, required: true },
  fullName: { type: String },
  candidateName: { type: String },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  mobile: { type: String, default: '' },
  course: { type: String, required: true },
  batch: { type: String, default: '2026' },
  academicStatus: { type: String, default: 'ACTIVE' },
  status: { type: String, default: 'ACTIVE' },
  gender: { type: String, default: 'Male' },
  dob: { type: String, default: '2004-01-01' },
  address: { type: String, default: 'Holagarh, Prayagraj' },
  guardianName: { type: String, default: '—' },
  guardianPhone: { type: String, default: '—' },
  bio: { type: String, default: '' },
  attendance: { type: Number, default: 94 },
  cgpa: { type: String, default: '8.8 / 10' },
  marks: { type: Array, default: [] },
  password: { type: String },
  admissionConfirmed: { type: Boolean, default: false }
}, { timestamps: true, strict: false });

StudentSchema.pre('validate', function() {
  if (!this.name && this.fullName) this.name = this.fullName;
  if (!this.name && this.candidateName) this.name = this.candidateName;
  if (!this.fullName && this.name) this.fullName = this.name;
  if (!this.enrollmentNumber && this.registrationNo) this.enrollmentNumber = this.registrationNo;
  if (!this.registrationNo && this.enrollmentNumber) this.registrationNo = this.enrollmentNumber;
  if (!this.phone && this.mobile) this.phone = this.mobile;
  if (!this.mobile && this.phone) this.mobile = this.phone;
  if (!this.course && this.track) this.course = this.track;
  if (!this.course) this.course = 'Software Engineering';
  if (!this.enrollmentNumber) this.enrollmentNumber = `ITH-2026-STU${Math.floor(1000 + Math.random() * 9000)}`;
});

export const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
