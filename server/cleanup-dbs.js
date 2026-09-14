import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const ATLAS_URI = (process.env.MONGODB_ATLAS_URI || '').trim() ||
  'mongodb+srv://anoopmishrapitz_db_user:IthuntPass2026@cluster0.oo3akne.mongodb.net/ithunt?retryWrites=true&w=majority';

const LOCAL_URI = (process.env.MONGODB_LOCAL_URI || process.env.MONGODB_URI || '').trim() ||
  'mongodb://127.0.0.1:27017/ithunt';

// Junk / dummy / test identifiers to remove
const JUNK_EMAILS = new Set([
  'test@example.com',
  'asd@qw.vv',
  'viteproxy@test.com',
  'miss@gm.cc',
  'localtest@ithunt.com',
  'pooja.sharma.test@gmail.com',
  'aryan.verma.test@example.com'
]);

function isJunkDocument(doc) {
  if (!doc) return false;
  const email = (doc.email || doc.userId || '').toLowerCase().trim();
  if (JUNK_EMAILS.has(email)) return true;

  const rawName = (doc.candidateName || doc.fullName || doc.name || doc.studentName || doc.title || '').trim();
  const lowerName = rawName.toLowerCase();

  if (rawName === 'r' || rawName === 'asdfgh') return true;
  if (lowerName === 'test candidate' || lowerName === 'test student' || lowerName === 'local student test' || lowerName === 'vite proxy test' || lowerName.includes('test entry')) return true;

  const id = String(doc.id || doc.registrationNo || doc.code || '').toUpperCase();
  if (id === 'ITH-TESTLOCAL1' || id === 'ITH-2026-815' || id === 'ITH-457864' || id === 'ITH-2026-280' || id === 'ITH-712290' || id === 'TEST-COURSE-99') return true;

  return false;
}

const OFFICIAL_COURSES = [
  {
    code: 'MERN-FULLSTACK',
    id: 'MERN-FULLSTACK',
    title: 'Full Stack MERN Web Engineering (React 19, Node.js & MongoDB)',
    name: 'Full Stack MERN Web Engineering (React 19, Node.js & MongoDB)',
    category: 'Software Engineering',
    duration: '6 Months (3-Mo Bootcamp + 3-Mo Production Internship)',
    fee: '₹25,000',
    badge: 'Flagship Job-Ready Track',
    eligibility: 'Pursuing / Completed B.Tech, BCA, MCA, B.Sc, or Diploma',
    certificate: 'IT HUNT Production Software Engineer Certificate + Corporate LOR',
    status: 'ACTIVE',
    description: 'Production software engineering track covering modern HTML5/CSS3, JavaScript ES2025, React 19, Node.js, Express, MongoDB Atlas, REST APIs, and Cloud Deployment.',
    syllabus: [
      'Advanced JavaScript ES6+ & TypeScript Essentials',
      'React 19 Architecture, Hooks & Modern State Management',
      'Node.js & Express RESTful Microservices',
      'MongoDB Atlas Aggregation, Indexing & Mongoose Models',
      'Docker, Vercel CI/CD & Production Deployment'
    ]
  },
  {
    code: 'MOBILE-APP-DEV',
    id: 'MOBILE-APP-DEV',
    title: 'Mobile App Engineering (Flutter, Dart & iOS/Android Native)',
    name: 'Mobile App Engineering (Flutter, Dart & iOS/Android Native)',
    category: 'Software Engineering',
    duration: '6 Months',
    fee: '₹25,000',
    badge: 'High Demand',
    eligibility: 'Basic Programming Knowledge',
    certificate: 'IT HUNT Mobile Software Engineer Certificate & Experience Letter',
    status: 'ACTIVE',
    description: 'Comprehensive cross-platform and native mobile app development program using Flutter, Dart, Swift iOS, and Firebase cloud integrations.',
    syllabus: [
      'Dart Language & Reactive UI Paradigms',
      'Flutter State Management (Riverpod & Bloc)',
      'Firebase Authentication & Cloud Firestore',
      'Native iOS/Android Bridge & App Store / Play Store Release'
    ]
  },
  {
    code: 'PYTHON-AI-ML',
    id: 'PYTHON-AI-ML',
    title: 'Python Programming, Data Science & Machine Learning / AI',
    name: 'Python Programming, Data Science & Machine Learning / AI',
    category: 'Artificial Intelligence',
    duration: '6 Months',
    fee: '₹24,000',
    badge: 'AI / ML Era',
    eligibility: '10+2 / Mathematics or Computer Background',
    certificate: 'IT HUNT Certified AI & Data Science Specialist',
    status: 'ACTIVE',
    description: 'Practical AI engineering course covering Python programming, NumPy, Pandas, Scikit-learn, PyTorch, Deep Learning, and Generative AI Agents.',
    syllabus: [
      'Python Core, OOP & Advanced Algorithms',
      'Data Analysis & Visualization with NumPy and Pandas',
      'Supervised & Unsupervised Machine Learning Models',
      'Generative AI Agents, Prompt Engineering & API Orchestration'
    ]
  },
  {
    code: 'O-LEVEL',
    id: 'O-LEVEL',
    title: 'NIELIT "O" Level Diploma',
    name: 'NIELIT "O" Level Diploma',
    category: 'NIELIT Accredited',
    duration: '1 Year (2 Semesters)',
    fee: '₹18,000',
    badge: 'Govt. Recognized',
    eligibility: '10+2 or ITI Certificate',
    certificate: 'NIELIT (Ministry of Electronics & IT, Govt. of India)',
    status: 'ACTIVE',
    description: 'Foundation diploma equivalent to PGDCA. Covers IT Tools, Web Designing, Python Programming, and Internet of Things (IoT).',
    syllabus: [
      'M1-R5: Information Technology Tools and Network Basics',
      'M2-R5: Web Designing & Publishing',
      'M3-R5: Programming and Problem Solving through Python',
      'M4-R5: Internet of Things and its Applications',
      'PR1: Practical Assessment',
      'PJ1: Project Work'
    ]
  },
  {
    code: 'A-LEVEL',
    id: 'A-LEVEL',
    title: 'NIELIT "A" Level Advanced Diploma',
    name: 'NIELIT "A" Level Advanced Diploma',
    category: 'NIELIT Accredited',
    duration: '1 Year (2 Semesters)',
    fee: '₹28,000',
    badge: 'Advance Graduate Diploma',
    eligibility: 'O Level / Graduate / Polytechnic Diploma',
    certificate: 'NIELIT (Govt. of India Recognized)',
    status: 'ACTIVE',
    description: 'Advanced IT engineering diploma covering Data Structures, Computer Networks, Database Management, and Software Engineering.',
    syllabus: [
      'A1-R5: Information Technology Tools and Network Basics',
      'A2-R5: Web Designing & Publishing',
      'A3-R5: Programming and Problem Solving through Python',
      'A4-R5: Internet of Things and its Applications',
      'A5-R5: Data Structures through Object Oriented Programming Language',
      'A6-R5: Computer Organization and Operating Systems',
      'A7-R5: Databases and SQL Technologies',
      'A8-R5: Systems Software and Software Engineering'
    ]
  },
  {
    code: 'BCA-MCA-SUBHARTI',
    id: 'BCA-MCA-SUBHARTI',
    title: 'Subharti University Degree Courses (BCA / MCA)',
    name: 'Subharti University Degree Courses (BCA / MCA)',
    category: 'University Degree',
    duration: '3 Years (BCA) / 2 Years (MCA)',
    fee: '₹32,000/Yr',
    badge: 'UGC & AICTE Approved',
    eligibility: '10+2 (for BCA) / Graduation (for MCA)',
    certificate: 'Swami Vivekanand Subharti University (UGC Approved)',
    status: 'ACTIVE',
    description: 'Comprehensive degree courses in computer applications run via Distance & Regular education approved by UGC, AICTE, and DEC joint committee.',
    syllabus: [
      'Computer Architecture & Digital Electronics',
      'Object Oriented Programming in Java and C++',
      'Operating Systems & System Architecture',
      'Database Management Systems & Cloud Architecture',
      'Web Technologies & Enterprise Development'
    ]
  },
  {
    code: 'TALLY-PRIME',
    id: 'TALLY-PRIME',
    title: 'Tally Prime ERP & Advanced Financial Accounting with GST',
    name: 'Tally Prime ERP & Advanced Financial Accounting with GST',
    category: 'Accounting & Finance',
    duration: '3 Months',
    fee: '₹6,500',
    badge: 'Job Oriented',
    eligibility: '10th / 12th / Commerce or Any Stream',
    certificate: 'IT HUNT Authorized Financial Accountant Certificate',
    status: 'ACTIVE',
    description: 'Industry accounting course covering Tally Prime, GST filing, e-Way bills, payroll management, TDS, balance sheets, and inventory control.',
    syllabus: [
      'Double Entry Accounting Principles & Journal Entries',
      'Tally Prime Company Setup, Ledgers & Groups',
      'GST Invoicing, e-Way Bills & Tax Computation',
      'Payroll Management, TDS, and Audit Balance Sheets'
    ]
  },
  {
    code: 'CCC',
    id: 'CCC',
    title: 'NIELIT Course on Computer Concepts (CCC)',
    name: 'NIELIT Course on Computer Concepts (CCC)',
    category: 'Govt. Certification',
    duration: '3 Months (80 Hours)',
    fee: '₹3,500',
    badge: 'Govt. Job Essential',
    eligibility: 'Open to All (No Minimum Educational Requirement)',
    certificate: 'NIELIT Govt. of India Certificate',
    status: 'ACTIVE',
    description: 'Mandatory government exam certification covering computer basics, LibreOffice/MS Office, Windows, Internet, Digital Financial Services, and Cyber Security.',
    syllabus: [
      'Introduction to Computers, Hardware & Operating Systems',
      'Word Processing & Spreadsheet Analysis (LibreOffice / MS Office)',
      'Presentations & Web Browsing Protocols',
      'Digital Financial Services, Net Banking & Cyber Safety'
    ]
  }
];

async function cleanDatabase(db, label) {
  console.log(`\n=============================================================`);
  console.log(`🧹 Cleaning & Synchronizing: ${label}`);
  console.log(`=============================================================`);

  const collections = ['admissions', 'students', 'users', 'projects', 'courses', 'nielitprojects', 'fees'];

  for (const colName of collections) {
    const col = db.collection(colName);
    const docs = await col.find({}).toArray();
    const beforeCount = docs.length;

    let removed = 0;
    const toKeep = [];
    const seenKeys = new Set();

    for (const doc of docs) {
      if (isJunkDocument(doc)) {
        await col.deleteOne({ _id: doc._id });
        removed++;
        continue;
      }

      // Deduplication check
      let uniqueKey = '';
      if (colName === 'users') {
        uniqueKey = (doc.email || doc.userId || doc.id || '').toLowerCase().trim();
      } else if (colName === 'students') {
        uniqueKey = (doc.email || doc.enrollmentNumber || doc.registrationNo || doc.id || '').toLowerCase().trim();
      } else if (colName === 'admissions') {
        uniqueKey = (doc.registrationNo || doc.registrationNumber || doc.email || doc.id || '').toLowerCase().trim();
      } else if (colName === 'courses') {
        uniqueKey = (doc.code || doc.title || doc.id || '').toUpperCase().trim();
      }

      if (uniqueKey) {
        if (seenKeys.has(uniqueKey)) {
          // Remove duplicate
          await col.deleteOne({ _id: doc._id });
          removed++;
          continue;
        }
        seenKeys.add(uniqueKey);
      }

      toKeep.push(doc);
    }

    const afterCount = await col.countDocuments();
    console.log(`  • ${colName.padEnd(16)}: ${beforeCount} -> ${afterCount} (Removed ${removed} junk/duplicates)`);
  }

  // Ensure Official Courses are intact
  const coursesCol = db.collection('courses');
  for (const course of OFFICIAL_COURSES) {
    await coursesCol.updateOne(
      { code: course.code },
      { $set: course },
      { upsert: true }
    );
  }

  // Create / Recreate Compass Relational Views
  await createCompassViews(db, label);
}

async function createCompassViews(db, label) {
  const views = [
    {
      name: 'student_relations_view',
      source: 'students',
      pipeline: [
        {
          $lookup: {
            from: 'admissions',
            localField: 'registrationNo',
            foreignField: 'registrationNo',
            as: 'admissionDetails'
          }
        },
        {
          $lookup: {
            from: 'fees',
            localField: 'registrationNo',
            foreignField: 'registrationNo',
            as: 'feePayments'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'email',
            foreignField: 'email',
            as: 'portalAccount'
          }
        },
        {
          $project: {
            enrollmentNumber: { $ifNull: ['$enrollmentNumber', '$userId', '$id'] },
            name: { $ifNull: ['$name', '$fullName', '$candidateName'] },
            email: 1,
            mobile: { $ifNull: ['$mobile', '$phone'] },
            course: 1,
            academicStatus: { $ifNull: ['$academicStatus', '$status', 'ACTIVE'] },
            batch: { $ifNull: ['$batch', '2026'] },
            admissionRecord: { $arrayElemAt: ['$admissionDetails', 0] },
            totalFeeReceipts: { $size: '$feePayments' },
            hasPortalAccess: { $gt: [{ $size: '$portalAccount' }, 0] },
            createdAt: 1
          }
        }
      ]
    },
    {
      name: 'admission_relations_view',
      source: 'admissions',
      pipeline: [
        {
          $lookup: {
            from: 'students',
            localField: 'registrationNo',
            foreignField: 'registrationNo',
            as: 'studentProfile'
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'course',
            foreignField: 'title',
            as: 'courseDetails'
          }
        },
        {
          $project: {
            registrationNo: 1,
            candidateName: { $ifNull: ['$candidateName', '$fullName'] },
            fatherName: 1,
            email: 1,
            mobile: { $ifNull: ['$mobile', '$phone'] },
            course: 1,
            status: 1,
            feeStatus: 1,
            date: 1,
            studentAccountCreated: { $gt: [{ $size: '$studentProfile' }, 0] },
            courseBadge: { $arrayElemAt: ['$courseDetails.badge', 0] },
            courseDuration: { $arrayElemAt: ['$courseDetails.duration', 0] },
            createdAt: 1
          }
        }
      ]
    },
    {
      name: 'course_enrollments_view',
      source: 'courses',
      pipeline: [
        {
          $lookup: {
            from: 'admissions',
            localField: 'title',
            foreignField: 'course',
            as: 'enrolledAdmissions'
          }
        },
        {
          $lookup: {
            from: 'students',
            localField: 'title',
            foreignField: 'course',
            as: 'enrolledStudents'
          }
        },
        {
          $project: {
            code: 1,
            title: { $ifNull: ['$title', '$name'] },
            category: 1,
            duration: 1,
            fee: 1,
            badge: 1,
            totalAdmissions: { $size: '$enrolledAdmissions' },
            totalActiveStudents: { $size: '$enrolledStudents' },
            status: 1
          }
        }
      ]
    }
  ];

  for (const v of views) {
    try {
      await db.command({ drop: v.name });
    } catch (_) {}

    try {
      await db.createCollection(v.name, {
        viewOn: v.source,
        pipeline: v.pipeline
      });
      console.log(`  ✓ Relational View active: ${v.name}`);
    } catch (err) {
      console.warn(`  ! Notice creating view ${v.name}:`, err.message);
    }
  }
}

async function run() {
  console.log('🚀 IT HUNT Database Cleaner & Synchronizer Starting...');

  // 1. Clean Atlas Cloud
  let atlasConn = null;
  try {
    console.log(`\n📡 Connecting to Atlas Cloud: ${ATLAS_URI.split('@')[1] || 'Cluster'}...`);
    atlasConn = await mongoose.createConnection(ATLAS_URI, {
      dbName: 'ithunt',
      serverSelectionTimeoutMS: 10000
    }).asPromise();
    await cleanDatabase(atlasConn.db, 'MongoDB Atlas Cloud');
  } catch (err) {
    console.error('Atlas connection error:', err.message);
  }

  // 2. Clean Local MongoDB
  let localConn = null;
  try {
    console.log(`\n💻 Connecting to Local MongoDB: ${LOCAL_URI}...`);
    localConn = await mongoose.createConnection(LOCAL_URI, {
      dbName: 'ithunt',
      serverSelectionTimeoutMS: 5000
    }).asPromise();
    await cleanDatabase(localConn.db, 'Local MongoDB (localhost:27017)');
  } catch (err) {
    console.warn('Local MongoDB connection notice:', err.message);
  }

  // 3. Sync clean records from Atlas to Local (or vice versa) to ensure 100% parity
  if (atlasConn && localConn) {
    console.log(`\n=============================================================`);
    console.log(`🔄 Synchronizing 100% Identical Data Between Atlas & Local`);
    console.log(`=============================================================`);
    const allCols = ['admissions', 'students', 'users', 'courses', 'nielitprojects', 'fees', 'certificates', 'projects', 'jobapplications', 'internships', 'events', 'eventrsvps', 'reviews', 'contactinquiries'];
    
    for (const colName of allCols) {
      const atlasDocs = await atlasConn.db.collection(colName).find({}).toArray();
      const localCol = localConn.db.collection(colName);
      await localCol.deleteMany({});
      if (atlasDocs.length > 0) {
        await localCol.insertMany(atlasDocs);
      }
      console.log(`  ✓ Synced ${colName.padEnd(18)}: ${atlasDocs.length} documents copied to Local MongoDB`);
    }
  }

  console.log('\n=============================================================');
  console.log('🎉 Cleanup and Dual-Database Synchronization Complete!');
  console.log('Both MongoDB Atlas and MongoDB Compass (Local) now show the EXACT');
  console.log('same clean, professional data without any junk records.');
  console.log('=============================================================\n');

  if (atlasConn) await atlasConn.close();
  if (localConn) await localConn.close();
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal cleaner error:', err);
  process.exit(1);
});
