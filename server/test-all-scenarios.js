import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { MODELS, dbAdapter } from './services/dbAdapter.js';
import { connectMongo, isMongoConnected } from './config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'ithunt_super_secure_jwt_secret_2026';

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
  }
}

async function runAllScenarios() {
  console.log('\n================================================================');
  console.log('🧪 IT HUNT Comprehensive End-to-End Database Scenario Testing');
  console.log('Target: MongoDB Atlas Cloud (cluster0.oo3akne.mongodb.net/ithunt)');
  console.log('================================================================\n');

  const startTotal = Date.now();

  // -------------------------------------------------------------
  // Scenario 1: Direct Cloud Database Connectivity
  // -------------------------------------------------------------
  console.log('▶ [Scenario 1] Connecting directly to MongoDB Atlas Cloud...');
  const connStart = Date.now();
  const isConnected = await connectMongo();
  const connDuration = Date.now() - connStart;
  assert(isConnected === true, `Connected to Atlas Cloud in ${connDuration}ms`);
  assert(mongoose.connection.readyState === 1, 'Mongoose readyState is 1 (Connected)');
  assert(mongoose.connection.name === 'ithunt', `Active database is "${mongoose.connection.name}"`);

  const testSuffix = Date.now().toString().slice(-4);
  const testEmail = `test.candidate${testSuffix}@ithunt.com`;
  const testRegNo = `ITH-TEST-${testSuffix}`;
  let createdAdmission = null;
  let createdStudentUser = null;
  let studentLoginToken = null;
  let adminToken = null;

  try {
    // -------------------------------------------------------------
    // Scenario 2: Save New Admission directly to Atlas
    // -------------------------------------------------------------
    console.log('\n▶ [Scenario 2] Saving New Admission to MongoDB Atlas...');
    const admissionPayload = {
      candidateName: `Test Candidate ${testSuffix}`,
      fullName: `Test Candidate ${testSuffix}`,
      fatherName: 'Late Sh. Test Father',
      email: testEmail,
      mobile: '9876543210',
      phone: '9876543210',
      course: 'MERN Stack & Full-Stack Web Development',
      gender: 'Male',
      dob: '2001-05-15',
      districtState: 'Prayagraj, UP',
      registrationNo: testRegNo,
      status: 'Pending Verification',
      source: 'Direct Portal Registration'
    };

    createdAdmission = await dbAdapter.create('admissions', admissionPayload);
    assert(createdAdmission && createdAdmission.id, 'Admission record returned valid ID');
    assert(createdAdmission.registrationNo === testRegNo, `Registration No matches (${testRegNo})`);

    // Verify directly in raw MongoDB collection
    const rawAdmInDb = await mongoose.connection.db.collection('admissions').findOne({ registrationNo: testRegNo });
    assert(rawAdmInDb !== null, 'Record verified directly in Atlas "admissions" collection');
    assert(rawAdmInDb.email === testEmail, 'Email stored accurately in Atlas');

    // -------------------------------------------------------------
    // Scenario 3: Fetching Admissions from Atlas
    // -------------------------------------------------------------
    console.log('\n▶ [Scenario 3] Fetching Admissions directly from MongoDB Atlas...');
    const allAdmissions = await dbAdapter.find('admissions');
    assert(Array.isArray(allAdmissions) && allAdmissions.length > 0, `Fetched ${allAdmissions.length} admissions from Atlas`);
    
    const fetchedById = await dbAdapter.findById('admissions', testRegNo);
    assert(fetchedById !== null, `Successfully fetched single admission by RegNo "${testRegNo}"`);
    assert(fetchedById.candidateName === `Test Candidate ${testSuffix}`, 'Candidate name matches fetched document');

    const fetchedByQuery = await dbAdapter.findOne('admissions', { email: testEmail });
    assert(fetchedByQuery !== null, `Successfully fetched single admission by email query "${testEmail}"`);

    // -------------------------------------------------------------
    // Scenario 4: Update Admission Status & Auto-Generate Student Account
    // -------------------------------------------------------------
    console.log('\n▶ [Scenario 4] Updating Admission to "Confirmed" & Generating Student Login...');
    const generatedUserId = `ITH-2026-STU${testSuffix}`;
    const generatedPassword = `Ithunt@${testSuffix}`;
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const updatedAdmission = await dbAdapter.update('admissions', testRegNo, {
      status: 'Confirmed',
      admissionConfirmed: true,
      userId: generatedUserId,
      password: generatedPassword,
      enrollmentNumber: generatedUserId
    });
    assert(updatedAdmission.status === 'Confirmed', 'Admission status updated to "Confirmed" in Atlas');

    // Create student in students collection
    const studentRecord = await dbAdapter.create('students', {
      id: generatedUserId,
      userId: generatedUserId,
      registrationNo: testRegNo,
      enrollmentNumber: generatedUserId,
      name: updatedAdmission.candidateName,
      fullName: updatedAdmission.candidateName,
      email: testEmail,
      mobile: '9876543210',
      course: 'MERN Stack & Full-Stack Web Development',
      batch: '2026',
      academicStatus: 'ACTIVE',
      status: 'ACTIVE',
      admissionConfirmed: true
    });
    assert(studentRecord && studentRecord.enrollmentNumber === generatedUserId, 'Student directory record created in Atlas');

    // Create user login in users collection
    createdStudentUser = await dbAdapter.create('users', {
      userId: generatedUserId,
      name: updatedAdmission.candidateName,
      email: testEmail,
      password: hashedPassword,
      role: 'student',
      registrationNo: testRegNo,
      enrollmentNumber: generatedUserId,
      verified: true,
      status: 'ACTIVE'
    });
    assert(createdStudentUser && createdStudentUser.email === testEmail, 'Student login user created in Atlas "users" collection');

    // -------------------------------------------------------------
    // Scenario 5: Authenticate Student with Generated Credentials
    // -------------------------------------------------------------
    console.log('\n▶ [Scenario 5] Testing Student Login with Generated Credentials...');
    const studentInDb = await dbAdapter.findOne('users', {
      $or: [{ userId: generatedUserId }, { email: testEmail }]
    });
    assert(studentInDb !== null, 'Found student user in Atlas "users" collection');
    
    const isPasswordValid = await bcrypt.compare(generatedPassword, studentInDb.password);
    assert(isPasswordValid === true, 'Generated password matches bcrypt hash stored in Atlas');

    studentLoginToken = jwt.sign(
      { id: studentInDb.id, name: studentInDb.name, email: studentInDb.email, role: 'student', verified: true },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    assert(!!studentLoginToken, 'Generated valid JWT authentication token for student');

    const decodedStudent = jwt.verify(studentLoginToken, JWT_SECRET);
    assert(decodedStudent.email === testEmail, 'Verified student JWT token claims');

    // -------------------------------------------------------------
    // Scenario 6: SuperAdmin Authentication & Fetch All Users
    // -------------------------------------------------------------
    console.log('\n▶ [Scenario 6] Testing SuperAdmin Login & User Management...');
    const adminUser = await dbAdapter.findOne('users', { email: 'admin@ithunt.com' });
    assert(adminUser !== null, 'Default SuperAdmin found in Atlas database');
    assert(adminUser.role === 'superadmin', 'SuperAdmin role is verified');

    adminToken = jwt.sign(
      { id: adminUser.id || 'usr-admin-default', name: adminUser.name, email: adminUser.email, role: 'superadmin', verified: true },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    assert(!!adminToken, 'Generated valid SuperAdmin JWT token');

    const allUsers = await dbAdapter.find('users');
    assert(Array.isArray(allUsers) && allUsers.length >= 16, `Fetched ${allUsers.length} total users directly from Atlas`);
    const studentFoundInList = allUsers.some(u => u.email === testEmail);
    assert(studentFoundInList === true, 'Newly registered student appears in SuperAdmin users list');

    // -------------------------------------------------------------
    // Scenario 7: Courses Catalog Fetching
    // -------------------------------------------------------------
    console.log('\n▶ [Scenario 7] Testing Courses Catalog direct fetching...');
    const courses = await dbAdapter.find('courses');
    assert(Array.isArray(courses) && courses.length === 8, `Fetched all ${courses.length} official courses from Atlas`);
    const mernCourse = courses.find(c => (c.code || '').toUpperCase().includes('FSW') || (c.title || '').includes('MERN'));
    assert(mernCourse !== null, `MERN Full-Stack course verified: "${mernCourse?.title || mernCourse?.name}"`);

    // -------------------------------------------------------------
    // Scenario 8: Event RSVP Save & Fetch
    // -------------------------------------------------------------
    console.log('\n▶ [Scenario 8] Testing Event RSVP submission & fetching...');
    const testRsvp = await dbAdapter.create('event_rsvps', {
      name: `RSVP Candidate ${testSuffix}`,
      email: `rsvp${testSuffix}@ithunt.com`,
      phone: '9876543212',
      eventTitle: 'IT HUNT Tech Summit 2026',
      domain: 'Full-Stack Web (MERN Stack)',
      status: 'CONFIRMED'
    });
    assert(testRsvp && testRsvp.id, 'Event RSVP saved to Atlas');
    const fetchedRsvp = await dbAdapter.findById('event_rsvps', testRsvp.id);
    assert(fetchedRsvp !== null && fetchedRsvp.email === `rsvp${testSuffix}@ithunt.com`, 'Event RSVP fetched directly from Atlas');

    // -------------------------------------------------------------
    // Scenario 9: Job Application Save & Fetch
    // -------------------------------------------------------------
    console.log('\n▶ [Scenario 9] Testing Careers / Job Application submission & fetching...');
    const testJobApp = await dbAdapter.create('job_applications', {
      name: `Applicant ${testSuffix}`,
      email: `job${testSuffix}@ithunt.com`,
      phone: '9876543213',
      position: 'Senior Full Stack Developer (MERN)',
      experience: '5 Years',
      status: 'UNDER_REVIEW'
    });
    assert(testJobApp && testJobApp.id, 'Job Application saved to Atlas');
    const fetchedJob = await dbAdapter.findById('job_applications', testJobApp.id);
    assert(fetchedJob !== null && fetchedJob.position.includes('Full Stack'), 'Job Application fetched from Atlas');

    // -------------------------------------------------------------
    // Scenario 10: Contact Inquiry Save & Fetch
    // -------------------------------------------------------------
    console.log('\n▶ [Scenario 10] Testing Contact Inquiry submission & fetching...');
    const testContact = await dbAdapter.create('contact', {
      name: `Inquirer ${testSuffix}`,
      email: `contact${testSuffix}@ithunt.com`,
      mobile: '9876543214',
      message: 'Interested in admission batch timing details.',
      status: 'NEW'
    });
    assert(testContact && testContact.id, 'Contact Inquiry saved to Atlas');
    const fetchedContact = await dbAdapter.findById('contact', testContact.id);
    assert(fetchedContact !== null, 'Contact inquiry fetched from Atlas');

    // -------------------------------------------------------------
    // Scenario 11: Cleanup Test Records from Atlas
    // -------------------------------------------------------------
    console.log('\n▶ [Scenario 11] Cleaning up temporary test records from Atlas Cloud...');
    await dbAdapter.delete('admissions', testRegNo);
    await dbAdapter.delete('students', generatedUserId);
    await dbAdapter.delete('users', createdStudentUser.id);
    await dbAdapter.delete('event_rsvps', testRsvp.id);
    await dbAdapter.delete('job_applications', testJobApp.id);
    await dbAdapter.delete('contact', testContact.id);

    // Verify cleanup
    const verifyCleanAdm = await dbAdapter.findById('admissions', testRegNo);
    const verifyCleanStu = await dbAdapter.findById('students', generatedUserId);
    const verifyCleanUsr = await dbAdapter.findById('users', createdStudentUser.id);
    assert(verifyCleanAdm === null, 'Test admission cleaned up from Atlas');
    assert(verifyCleanStu === null, 'Test student cleaned up from Atlas');
    assert(verifyCleanUsr === null, 'Test user cleaned up from Atlas');

  } catch (err) {
    console.error('❌ Unexpected Error during scenario execution:', err);
    failedTests++;
  } finally {
    const totalDuration = Date.now() - startTotal;
    console.log('\n================================================================');
    console.log(`📊 Test Results: ${passedTests} PASSED, ${failedTests} FAILED (Completed in ${totalDuration}ms)`);
    console.log('================================================================\n');
    await mongoose.disconnect();
    process.exit(failedTests > 0 ? 1 : 0);
  }
}

runAllScenarios();
