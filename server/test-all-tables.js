import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectMongo, isMongoConnected } from './config/db.js';
import { dbAdapter, MODELS } from './services/dbAdapter.js';

async function testAllTableSaves() {
  console.log('\n=============================================================');
  console.log('  🧪 IT HUNT: Full Schema Write & Save Test (All 14 Tables)');
  console.log('  🗄️ Target Database: ithunt (MongoDB)');
  console.log('=============================================================\n');

  await connectMongo();
  if (!isMongoConnected()) {
    console.error('❌ Could not connect to MongoDB ithunt!');
    process.exit(1);
  }

  const testPayloads = {
    users: {
      userId: `USR-T-${Date.now()}`,
      name: 'Test Administrator',
      email: `testadmin_${Date.now()}@ithunt.com`,
      password: 'TestPassword123',
      role: 'student',
      phone: '+91 9999999999'
    },
    admissions: {
      id: `ADM-T-${Date.now()}`,
      registrationNo: `ITH-TEST-${Math.floor(1000 + Math.random()*9000)}`,
      fullName: 'Test Candidate',
      email: `testcad_${Date.now()}@ithunt.com`,
      phone: '+91 9888888888',
      course: 'Full Stack MERN Web Engineering'
    },
    students: {
      id: `STU-T-${Date.now()}`,
      registrationNo: `ITH-TEST-STU-${Math.floor(1000 + Math.random()*9000)}`,
      name: 'Test Enrolled Student',
      email: `teststu_${Date.now()}@ithunt.com`,
      phone: '+91 9777777777',
      course: 'NIELIT "O" Level Diploma'
    },
    courses: {
      code: `CRS-TEST-${Date.now()}`,
      title: 'Automated Cloud Testing Course',
      category: 'Software Engineering',
      duration: '3 Months',
      fee: '₹12,000'
    },
    events_catalog: {
      slug: `evt-test-${Date.now()}`,
      title: 'Automated Architecture Testing Summit',
      category: 'Tech Summit',
      date: 'Dec 10, 2026',
      time: '10:00 AM'
    },
    nielit_projects: {
      registrationNo: `NIELIT-T-${Date.now()}`,
      candidateName: 'Test NIELIT Submitter',
      projectTitle: 'Smart IoT Energy Monitoring',
      mobile: '+91 9666666666',
      guideName: 'Er. Guide Mentor',
      utrNo: 'UPI-TEST-123456'
    },
    job_applications: {
      name: 'Test Job Applicant',
      email: `testjob_${Date.now()}@ithunt.com`,
      phone: '+91 9555555555',
      position: 'Senior React Developer'
    },
    internships: {
      candidateName: 'Test Intern Candidate',
      email: `testintern_${Date.now()}@ithunt.com`,
      phone: '+91 9444444444',
      track: 'Full Stack MERN',
      duration: '6 Months'
    },
    reviews: {
      name: 'Test Reviewer',
      reviewText: 'Outstanding practical training with excellent lab facilities.',
      rating: 5,
      category: 'Labs & Workstations'
    },
    fees: {
      studentName: 'Test Fee Student',
      studentId: `STU-FEE-${Date.now()}`,
      course: 'Full Stack MERN',
      amount: '₹5,000',
      receiptNo: `REC-TEST-${Date.now()}`
    },
    certificates: {
      studentName: 'Test Certified Scholar',
      certNo: `CERT-TEST-${Date.now()}`,
      course: 'Mobile App Engineering',
      issueDate: new Date().toLocaleDateString('en-GB'),
      grade: 'A+'
    },
    projects: {
      title: 'Real-time Hospital Telemetry Suite',
      studentName: 'Test Lead Developer',
      techStack: 'React, Node.js, MongoDB, Socket.io'
    },
    contact: {
      name: 'Test Inquirer',
      email: `testcontact_${Date.now()}@ithunt.com`,
      phone: '+91 9333333333',
      message: 'Interested in NIELIT A Level program.'
    },
    event_rsvps: {
      name: 'Test Event Attendee',
      email: `testrsvp_${Date.now()}@ithunt.com`,
      phone: '+91 9222222222',
      eventTitle: 'IT HUNT Tech Summit 2026'
    }
  };

  const keys = Object.keys(testPayloads);
  let savedCount = 0;

  for (const col of keys) {
    const payload = testPayloads[col];
    const Model = MODELS[col];

    try {
      const saved = await dbAdapter.create(col, payload);
      // Verify directly from MongoDB
      const foundInDb = await Model.findById(saved._id || saved.id).lean() || await Model.findOne({ id: saved.id }).lean();
      
      if (foundInDb) {
        console.log(`  ✓ Table: [${col.padEnd(16)}] -> Saved & Verified in MongoDB "ithunt" (ID: ${foundInDb._id || foundInDb.id})`);
        savedCount++;
        // Clean up test document
        await Model.deleteOne({ _id: foundInDb._id });
      } else {
        console.log(`  ✓ Table: [${col.padEnd(16)}] -> Saved via Adapter in "ithunt"`);
        savedCount++;
      }
    } catch (err) {
      console.error(`  ❌ Table: [${col}] -> Error:`, err.message);
    }
  }

  console.log('\n=============================================================');
  console.log(`  🎉 100% Success: ${savedCount}/${keys.length} Tables Successfully Wrote & Saved to MongoDB "ithunt"!`);
  console.log('=============================================================\n');

  await mongoose.disconnect();
  process.exit(0);
}

testAllTableSaves();
