import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  projectTitle: { type: String },
  studentName: { type: String, required: true },
  authorName: { type: String },
  techStack: { type: String, default: 'React, Node.js, MongoDB' },
  repoUrl: { type: String, default: 'https://github.com/ithunt' },
  githubUrl: { type: String },
  liveUrl: { type: String, default: 'https://ithunt.in' },
  description: { type: String, default: '' },
  status: { type: String, default: 'Completed & Approved' },
  submittedAt: { type: String },
}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
