import mongoose from 'mongoose';

const NielitProjectSchema = new mongoose.Schema({
  registrationNo: { type: String, required: true, unique: true, index: true },
  nielitRegNo: { type: String },
  studentName: { type: String, required: true },
  candidateName: { type: String },
  fatherName: { type: String, default: '—' },
  motherName: { type: String, default: '—' },
  mobile: { type: String, required: true },
  phone: { type: String },
  email: { type: String, default: '' },
  level: { type: String, default: 'O Level' },
  projectTitle: { type: String, required: true },
  guideName: { type: String, default: 'Mr. Sushil Kumar' },
  guideQualification: { type: String, default: 'MCA (Computer Science)' },
  guideDesignation: { type: String, default: 'Laravel/NodeJS Developer' },
  status: { type: String, default: 'Submitted' },
  feePaid: { type: String, default: '₹1,000' },
  utrNo: { type: String, default: 'UPI/Verified' },
  accountHolderName: { type: String, default: '' },
  paymentRemark: { type: String, default: 'Paid' },
  date: { type: String },
}, { timestamps: true });

export const NielitProject = mongoose.models.NielitProject || mongoose.model('NielitProject', NielitProjectSchema);
