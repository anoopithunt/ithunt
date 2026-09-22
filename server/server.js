import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import { connectMongo, isMongoConnected, getMongoDbName, isAtlas, getLastMongoError, getActiveMaskedUri } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import admissionsRoutes from './routes/admissions.routes.js';
import studentsRoutes from './routes/students.routes.js';
import nielitRoutes from './routes/nielit.routes.js';
import careersRoutes from './routes/careers.routes.js';
import internshipsRoutes from './routes/internships.routes.js';
import eventsRoutes from './routes/events.routes.js';
import reviewsRoutes from './routes/reviews.routes.js';
import feesRoutes from './routes/fees.routes.js';
import certificatesRoutes from './routes/certificates.routes.js';
import projectsRoutes from './routes/projects.routes.js';
import contactRoutes from './routes/contact.routes.js';
import adminRoutes from './routes/admin.routes.js';
import coursesRoutes from './routes/courses.routes.js';

const app = express();
const PORT = process.env.BACKEND_PORT || process.env.PORT || 3000;

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5500,http://localhost:5173,https://ithunt.vercel.app')
  .split(',').map(origin => origin.trim()).filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    if (!req.path.includes('/health')) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${Date.now() - start}ms)`);
    }
  });
  next();
});

export async function ensureDbConnected() {
  if (isMongoConnected()) return;
  try { await connectMongo(); } catch (error) { console.warn('[DB] Initialization:', error.message); }
}

app.use(async (req, res, next) => {
  if (!isMongoConnected()) await ensureDbConnected();
  next();
});

const healthHandler = async (req, res) => {
  let dbErr = null;
  try { await connectMongo(); } catch (error) { dbErr = error.message; }
  res.status(isMongoConnected() ? 200 : 503).json({
    success: isMongoConnected(),
    status: isMongoConnected() ? 'ONLINE' : 'DEGRADED',
    service: 'IT HUNT Backend API Engine',
    version: '2.2.2-atlas',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    database: {
      name: getMongoDbName(),
      connected: isMongoConnected(),
      readyState: mongoose.connection?.readyState,
      type: isAtlas() ? 'MongoDB Atlas Cloud' : 'MongoDB',
      mode: isMongoConnected() ? 'CONNECTED' : 'STANDBY',
      lastError: process.env.NODE_ENV === 'development' ? (getLastMongoError() || dbErr) : undefined
    },
    endpoints: ['/api/admissions', '/api/students', '/api/courses', '/api/events', '/api/nielit-projects', '/api/careers/applications', '/api/internships/applications', '/api/events/rsvps', '/api/reviews', '/api/fees', '/api/certificates', '/api/projects', '/api/contact', '/api/auth/login', '/api/admin/stats']
  });
};

app.get(['/api/health', '/health', '/api'], healthHandler);
app.get('/', (req, res) => res.json({ message: 'IT HUNT MERN & AI Backend API Server', status: 'Running', docs: '/api/health' }));

app.use('/api/auth', authRoutes);
app.use('/api/admissions', admissionsRoutes);
app.use('/api/students', studentsRoutes);
app.use(['/api/nielit-projects', '/api/nielit'], nielitRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/internships', internshipsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/fees', feesRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/users', authRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: `API route not found: ${req.method} ${req.originalUrl}` }));
app.use((error, req, res, next) => {
  console.error('[API]', error);
  if (res.headersSent) return next(error);
  res.status(error.status || 500).json({ success: false, message: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error' });
});

process.on('unhandledRejection', reason => console.warn('[API] Unhandled rejection:', reason?.message || reason));

async function startServer() {
  await ensureDbConnected();
  app.listen(PORT, '0.0.0.0', () => console.log(`IT HUNT API listening on port ${PORT}`));
}

if (!process.env.VERCEL) startServer().catch(error => { console.error('[API] Startup failed:', error); process.exit(1); });

export default app;
