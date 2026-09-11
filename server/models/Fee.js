import mongoose from 'mongoose';

const FeeSchema = new mongoose.Schema({
  studentId: { type: String, required: true, index: true },
  studentName: { type: String, required: true },
  receiptNo: { type: String, required: true, unique: true },
  receiptNumber: { type: String },
  course: { type: String, default: 'IT Masterclass' },
  courseName: { type: String },
  amount: { type: String, required: true },
  amountPaid: { type: String },
  paymentMode: { type: String, default: 'Online UPI' },
  mode: { type: String },
  status: { type: String, default: 'Verified & Paid' },
  paymentDate: { type: Date, default: Date.now },
  date: { type: String },
}, { timestamps: true });

export const Fee = mongoose.models.Fee || mongoose.model('Fee', FeeSchema);
