import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectMongo, initFirebaseAdmin, isMongoConnected, isFirebaseConnected, getMongoDbName, isAtlas } from './config/db.js';

// Import Route Handlers
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

const app = express();
const PORT = process.env.BACKEND_PORT || process.env.PORT || 3000;

// Security & Parsing Middleware
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Custom Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (!req.path.includes('/health')) {
      console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Health Check Endpoints
const healthHandler = (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'IT HUNT Backend API Engine',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    database: {
      name: getMongoDbName(),
      mongoConnected: isMongoConnected(),
      firebaseConnected: isFirebaseConnected(),
      type: isAtlas() ? 'MongoDB Atlas Cloud' : 'MongoDB',
      mode: isMongoConnected() ? (isAtlas() ? 'MongoDB Atlas Cloud' : 'MongoDB (MERN Stack)') : (isFirebaseConnected() ? 'Firebase Cloud' : 'Universal Hybrid Adapter')
    },
    endpoints: [
      '/api/admissions',
      '/api/students',
      '/api/nielit-projects',
      '/api/careers/applications',
      '/api/internships/applications',
      '/api/events/rsvps',
      '/api/reviews',
      '/api/fees',
      '/api/certificates',
      '/api/projects',
      '/api/contact',
      '/api/auth/login',
      '/api/admin/stats'
    ]
  });
};

app.get('/api/health', healthHandler);
app.get('/health', healthHandler);
app.get('/api', healthHandler);
app.get('/', (req, res) => {
  res.json({
    message: 'IT HUNT MERN & AI Backend API Server',
    status: 'Running',
    docs: '/api/health'
  });
});

// Mount Main API Routes (/api/*)
app.use('/api/auth', authRoutes);
app.use('/api/admissions', admissionsRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/nielit-projects', nielitRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/internships', internshipsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/fees', feesRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Dual Mount Route Aliases (Direct Root without /api prefix for flexibility)
app.use('/auth', authRoutes);
app.use('/admissions', admissionsRoutes);
app.use('/students', studentsRoutes);
app.use('/nielit-projects', nielitRoutes);
app.use('/careers', careersRoutes);
app.use('/internships', internshipsRoutes);
app.use('/events', eventsRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/fees', feesRoutes);
app.use('/certificates', certificatesRoutes);
app.use('/projects', projectsRoutes);
app.use('/contact', contactRoutes);
app.use('/admin', adminRoutes);

// 404 Catch-all
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('! Server Unhandled Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

process.on('unhandledRejection', (reason) => {
  console.warn('! Unhandled Promise Rejection (handled safely):', reason?.message || reason);
});

process.on('uncaughtException', (err) => {
  console.error('! Uncaught Exception (handled safely):', err?.message || err);
});

let isInitialized = false;

export async function ensureDbConnected() {
  if (isInitialized) return;
  initFirebaseAdmin();
  await connectMongo();
  isInitialized = true;
}

// Ensure DB connected on serverless invocations
app.use(async (req, res, next) => {
  if (!isInitialized) {
    try {
      await ensureDbConnected();
    } catch (_) {}
  }
  next();
});

// Initialize Databases and Start Server (Local / Standalone VM mode)
async function startServer() {
  console.log('🚀 Initializing IT HUNT Node.js Backend Server...');

  await ensureDbConnected();

  app.listen(PORT, '0.0.0.0', () => {
    const dbType = isAtlas() ? 'MongoDB Atlas Cloud' : 'MongoDB';
    console.log(`\n=============================================================`);
    console.log(`  🚀 IT HUNT Node.js API Server is Live!`);
    console.log(`  🌐 URL: http://localhost:${PORT}`);
    console.log(`  📡 Health: http://localhost:${PORT}/api/health`);
    console.log(`  🗄️  Database: ${getMongoDbName()} [${dbType}: ${isMongoConnected() ? 'CONNECTED' : 'STANDBY'}]`);
    console.log(`  🔥 Firebase: ${isFirebaseConnected() ? 'CONNECTED' : 'STANDBY'}`);
    console.log(`=============================================================\n`);
  });
}

if (!process.env.VERCEL) {
  startServer().catch(err => {
    console.error('Fatal error starting server:', err);
    process.exit(1);
  });
}

export default app;
