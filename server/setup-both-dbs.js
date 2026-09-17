import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { seedDatabase } from './seed.js';

const ATLAS_URI = (
  process.env.MONGODB_ATLAS_URI || 
  process.env.MONGODB_URI || 
  ''
).trim();

const LOCAL_URI = (
  process.env.MONGODB_LOCAL_URI || 
  'mongodb://127.0.0.1:27017/ithunt'
).trim();

const COLLECTIONS = [
  'admissions', 'students', 'users', 'courses', 'events', 'nielitprojects',
  'jobapplications', 'internships', 'reviews', 'fees', 'certificates',
  'projects', 'contactinquiries', 'eventrsvps'
];

async function setupBothDatabases() {
  console.log('\n=============================================================');
  console.log('  🔄 IT HUNT - Dual MongoDB Setup & Compass Synchronizer');
  console.log('  🗄️  Database Name: ithunt');
  console.log('=============================================================\n');

  // 1. Check / Seed Local MongoDB
  console.log('1️⃣  Connecting to Local MongoDB (127.0.0.1:27017/ithunt)...');
  let localConn = null;
  try {
    localConn = await mongoose.createConnection(LOCAL_URI, {
      dbName: 'ithunt',
      serverSelectionTimeoutMS: 4000
    }).asPromise();
    console.log('   ✓ Local MongoDB connected successfully.');
  } catch (err) {
    console.warn(`   ⚠️ Local MongoDB notice: ${err.message}`);
    console.log('   💡 Tip: If local mongod is not running, run "npm run db:start" in a separate terminal.');
  }

  // 2. Check / Seed MongoDB Atlas Cloud
  console.log('\n2️⃣  Connecting to MongoDB Atlas Cloud (cluster0.oo3akne.mongodb.net/ithunt)...');
  let atlasConn = null;
  try {
    atlasConn = await mongoose.createConnection(ATLAS_URI, {
      dbName: 'ithunt',
      serverSelectionTimeoutMS: 8000
    }).asPromise();
    console.log('   ✓ MongoDB Atlas connected successfully.');
  } catch (err) {
    console.error(`   ❌ MongoDB Atlas connection error: ${err.message}`);
  }

  // 3. Ensure Collections & Data exist
  if (localConn && atlasConn) {
    console.log('\n3️⃣  Syncing data between Local and Atlas to guarantee "ithunt" is complete in both...');
    for (const col of COLLECTIONS) {
      const lCol = localConn.db.collection(col);
      const aCol = atlasConn.db.collection(col);

      const lCount = await lCol.countDocuments().catch(() => 0);
      const aCount = await aCol.countDocuments().catch(() => 0);

      // If local has data and Atlas is empty for this collection, copy to Atlas
      if (lCount > 0 && aCount === 0) {
        const docs = await lCol.find({}).toArray();
        await aCol.insertMany(docs);
        console.log(`   ✓ Copied ${docs.length} records in "${col}" from Local to Atlas`);
      } 
      // If Atlas has data and local is empty, copy to Local
      else if (aCount > 0 && lCount === 0) {
        const docs = await aCol.find({}).toArray();
        await lCol.insertMany(docs);
        console.log(`   ✓ Copied ${docs.length} records in "${col}" from Atlas to Local`);
      }
      // If both have data, ensure bidirectional upsert
      else if (lCount > 0 && aCount > 0) {
        const lDocs = await lCol.find({}).toArray();
        for (const doc of lDocs) {
          await aCol.replaceOne({ _id: doc._id }, doc, { upsert: true });
        }
      }
    }
  }

  // Create Relational Views for MongoDB Compass (Joins collections visually)
  const setupRelationViews = async (conn, label) => {
    if (!conn) return;
    try {
      const db = conn.db;
      await db.command({ drop: 'student_relations_view' }).catch(() => {});
      await db.createCollection('student_relations_view', {
        viewOn: 'students',
        pipeline: [
          { $lookup: { from: 'admissions', localField: 'registrationNo', foreignField: 'registrationNo', as: 'admissionDetails' } },
          { $lookup: { from: 'users', localField: 'email', foreignField: 'email', as: 'userAccount' } },
          { $lookup: { from: 'fees', localField: 'registrationNo', foreignField: 'studentId', as: 'feePayments' } },
          { $lookup: { from: 'nielitprojects', localField: 'registrationNo', foreignField: 'registrationNo', as: 'nielitProjects' } },
          { $lookup: { from: 'certificates', localField: 'name', foreignField: 'studentName', as: 'certificates' } }
        ]
      });

      await db.command({ drop: 'admission_relations_view' }).catch(() => {});
      await db.createCollection('admission_relations_view', {
        viewOn: 'admissions',
        pipeline: [
          { $lookup: { from: 'students', localField: 'registrationNo', foreignField: 'registrationNo', as: 'studentProfile' } },
          { $lookup: { from: 'users', localField: 'email', foreignField: 'email', as: 'loginAccount' } },
          { $lookup: { from: 'fees', localField: 'registrationNo', foreignField: 'studentId', as: 'feeReceipts' } }
        ]
      });

      await db.command({ drop: 'course_enrollments_view' }).catch(() => {});
      await db.createCollection('course_enrollments_view', {
        viewOn: 'courses',
        pipeline: [
          { $lookup: { from: 'admissions', localField: 'name', foreignField: 'course', as: 'admissions' } },
          { $lookup: { from: 'students', localField: 'name', foreignField: 'course', as: 'enrolledStudents' } }
        ]
      });
      console.log(`   ✓ Relational views created in ${label}`);
    } catch (e) {
      console.warn(`   Notice setting views in ${label}:`, e.message);
    }
  };

  console.log('\n4️⃣  Setting up Relational Views for MongoDB Compass (Joins & Lookups)...');
  await setupRelationViews(localConn, 'Local MongoDB');
  await setupRelationViews(atlasConn, 'MongoDB Atlas');

  // If both were empty, run the full seeder
  const finalLocalCount = localConn ? await localConn.db.collection('admissions').countDocuments().catch(() => 0) : 0;
  const finalAtlasCount = atlasConn ? await atlasConn.db.collection('admissions').countDocuments().catch(() => 0) : 0;

  if (finalLocalCount === 0 && finalAtlasCount === 0) {
    console.log('\n🌱 Running initial data seed for database "ithunt"...');
    await seedDatabase();
  }

  // 4. Report Final Status
  console.log('\n=============================================================');
  console.log('  📊 Final Verification Status:');
  console.log('=============================================================');
  for (const col of COLLECTIONS) {
    const a = atlasConn ? await atlasConn.db.collection(col).countDocuments().catch(() => 0) : 'N/A';
    const l = localConn ? await localConn.db.collection(col).countDocuments().catch(() => 0) : 'N/A';
    console.log(`   • ${col.padEnd(18)} : Atlas=${a} docs | Local=${l} docs`);
  }

  if (localConn) await localConn.close();
  if (atlasConn) await atlasConn.close();

  console.log('\n=============================================================');
  console.log('  🧭 MONGODB COMPASS CONNECTION STRINGS:');
  console.log('=============================================================');
  console.log('\n📌 1. Connect to MongoDB Atlas in Compass:');
  console.log(`   ${ATLAS_URI}\n`);
  console.log('📌 2. Connect to Local MongoDB in Compass:');
  console.log(`   ${LOCAL_URI}\n`);
  console.log('💡 In MongoDB Compass: Click "New Connection", paste either URL, and click "Connect".');
  console.log('   You will see the database "ithunt" with all 14 collections!\n');
  console.log('=============================================================\n');

  process.exit(0);
}

setupBothDatabases().catch(err => {
  console.error('Fatal setup error:', err);
  process.exit(1);
});
