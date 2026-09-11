import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin', 'superadmin', 'faculty'], default: 'student' },
  phone: { type: String, default: '' },
  course: { type: String, default: '' },
  registrationNo: { type: String, default: '' },
  verified: { type: Boolean, default: true },
  status: { type: String, default: 'ACTIVE' },
  avatar: { type: String, default: '' },
}, { timestamps: true, strict: false });

UserSchema.pre('validate', function() {
  if (!this.name && this.fullName) this.name = this.fullName;
  if (!this.name && this.candidateName) this.name = this.candidateName;
  if (!this.userId && this.registrationNo) this.userId = this.registrationNo;
  if (!this.userId && this.enrollmentNumber) this.userId = this.enrollmentNumber;
  if (!this.password) this.password = 'Ithunt@123';
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  // Direct match fallback for default admin development credentials
  if (this.password === candidatePassword) return true;
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
