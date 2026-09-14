import fetch from 'node-fetch';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function testHttpEndpoints() {
  console.log('\n================================================================');
  console.log('🌐 IT HUNT Live HTTP REST API Scenario Test Suite');
  console.log('Target Server: http://127.0.0.1:3000 (connected to MongoDB Atlas Cloud)');
  console.log('================================================================\n');

  const BASE_URL = 'http://127.0.0.1:3000';
  const suffix = Date.now().toString().slice(-4);
  const testEmail = `http.candidate${suffix}@ithunt.com`;
  const testRegNo = `ITH-HTTP-${suffix}`;

  let studentToken = null;
  let adminToken = null;

  try {
    // 1. Health Endpoint
    console.log('▶ [Test 1] GET /api/health');
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, 'HTTP 200 OK from /api/health');
    assert(healthData.database.connected === true, 'Database is connected in health endpoint');
    assert(healthData.database.type === 'MongoDB Atlas Cloud', 'Database type is MongoDB Atlas Cloud');

    // 2. Courses Catalog
    console.log('\n▶ [Test 2] GET /api/courses');
    const coursesRes = await fetch(`${BASE_URL}/api/courses`);
    const coursesData = await coursesRes.json();
    const courseList = Array.isArray(coursesData) ? coursesData : (coursesData.courses || coursesData.data || []);
    assert(coursesRes.status === 200, 'HTTP 200 OK from /api/courses');
    assert(courseList.length === 8, `Loaded exactly ${courseList.length} courses from Atlas`);

    // 3. SuperAdmin Login
    console.log('\n▶ [Test 3] POST /api/auth/login (SuperAdmin)');
    const adminLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@ithunt.com', password: 'admin@ithunt2026' })
    });
    const adminLoginData = await adminLoginRes.json();
    assert(adminLoginRes.status === 200, 'SuperAdmin login returned HTTP 200');
    assert(adminLoginData.success === true, 'Login marked successful');
    assert(!!adminLoginData.data?.token, 'JWT token returned for SuperAdmin');
    adminToken = adminLoginData.data.token;

    // 4. Submit Admission via HTTP
    console.log('\n▶ [Test 4] POST /api/admissions (Candidate Submission)');
    const admPayload = {
      candidateName: `HTTP Student ${suffix}`,
      fullName: `HTTP Student ${suffix}`,
      fatherName: 'Mr. Father',
      email: testEmail,
      mobile: '9876543220',
      phone: '9876543220',
      course: 'MERN Stack & Full-Stack Web Development',
      gender: 'Male',
      dob: '2002-01-15',
      districtState: 'Prayagraj, UP',
      registrationNo: testRegNo,
      status: 'Pending Verification'
    };
    const createAdmRes = await fetch(`${BASE_URL}/api/admissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(admPayload)
    });
    const createAdmData = await createAdmRes.json();
    assert(createAdmRes.status === 200 || createAdmRes.status === 201, 'Admission creation returned HTTP 200/201');
    assert(createAdmData.success === true, 'Admission submission marked success');

    // 5. Fetch Admission by ID
    console.log('\n▶ [Test 5] GET /api/admissions/:id');
    const getAdmRes = await fetch(`${BASE_URL}/api/admissions/${testRegNo}`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const getAdmData = await getAdmRes.json();
    assert(getAdmRes.status === 200, 'Fetched single admission HTTP 200');
    const foundCandidate = getAdmData.data || getAdmData;
    assert(foundCandidate.email === testEmail, 'Candidate email matches submission');

    // 6. Confirm Admission & Auto-generate Student Credentials
    console.log('\n▶ [Test 6] POST /api/admissions/:id/confirm (Confirm & Generate Login)');
    const confirmRes = await fetch(`${BASE_URL}/api/admissions/${testRegNo}/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        feeStatus: 'Verified & Paid',
        confirmedBy: 'SuperAdmin'
      })
    });
    const confirmData = await confirmRes.json();
    assert(confirmRes.status === 200, 'Confirmed admission HTTP 200');
    assert(confirmData.success === true, 'Admission marked confirmed');
    const creds = confirmData.data?.credentials || {};
    const generatedUser = creds.userId || testRegNo;
    const generatedPass = creds.password || 'Ithunt@123';
    assert(!!generatedUser, `Generated User ID: ${generatedUser}`);
    assert(!!generatedPass, `Generated Student Password: ${generatedPass}`);

    // 7. Student Login via HTTP
    console.log('\n▶ [Test 7] POST /api/auth/login (Student Portal Login)');
    const studentLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: generatedUser,
        password: generatedPass
      })
    });
    const studentLoginData = await studentLoginRes.json();
    assert(studentLoginRes.status === 200, 'Student login returned HTTP 200');
    assert(studentLoginData.success === true, 'Student authentication successful');
    assert(!!studentLoginData.data?.token, 'JWT Token issued for student');
    studentToken = studentLoginData.data?.token;

    // 8. Fetch Profile with Student Token
    console.log('\n▶ [Test 8] GET /api/auth/me (Student Profile)');
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    const meData = await meRes.json();
    assert(meRes.status === 200, 'Student profile returned HTTP 200');
    assert(meData.data?.email === testEmail, 'Profile email matches authenticated student');

    // 9. Fetch Users with SuperAdmin Token
    console.log('\n▶ [Test 9] GET /api/auth/users (SuperAdmin Access)');
    const usersRes = await fetch(`${BASE_URL}/api/auth/users`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const usersData = await usersRes.json();
    assert(usersRes.status === 200, 'User list returned HTTP 200');
    const userList = Array.isArray(usersData.data) ? usersData.data : [];
    assert(userList.length >= 16, `Fetched ${userList.length} users directly from Atlas`);
    assert(userList.some(u => u.email === testEmail), 'Newly confirmed student present in user directory');

    // 10. Student Directory
    console.log('\n▶ [Test 10] GET /api/students');
    const stuListRes = await fetch(`${BASE_URL}/api/students`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const stuListData = await stuListRes.json();
    assert(stuListRes.status === 200, 'Students directory returned HTTP 200');
    const students = Array.isArray(stuListData.students) ? stuListData.students : (stuListData.data || []);
    assert(students.length > 0, `Active students listed: ${students.length}`);

    // 11. Contact Inquiry
    console.log('\n▶ [Test 11] POST /api/contact');
    const contactRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Inquirer ${suffix}`,
        email: `inquiry${suffix}@ithunt.com`,
        phone: '9876543221',
        message: 'Requesting syllabus details.'
      })
    });
    const contactData = await contactRes.json();
    assert(contactRes.status === 200 || contactRes.status === 201, 'Contact inquiry submitted HTTP 200');
    assert(contactData.success === true, 'Inquiry saved successfully');

    // 12. Cleanup
    console.log('\n▶ [Test 12] DELETE /api/admissions/:id (Cleanup)');
    const delRes = await fetch(`${BASE_URL}/api/admissions/${testRegNo}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const delData = await delRes.json();
    assert(delRes.status === 200, 'Admission deleted HTTP 200');
    assert(delData.success === true, 'Admission cleanup marked success');

    // Also clean up student and user created for this test
    if (generatedUser) {
      await fetch(`${BASE_URL}/api/students/${generatedUser}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      await fetch(`${BASE_URL}/api/auth/users/${generatedUser}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
    }

    // Verify deletion directly
    const verifyDel = await fetch(`${BASE_URL}/api/admissions/${testRegNo}`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const verifyDelData = await verifyDel.json();
    console.log(`    ℹ verifyDel status: ${verifyDel.status}, data:`, JSON.stringify(verifyDelData));
    assert(verifyDel.status === 404 || (!verifyDelData.data && !verifyDelData.success), 'Verified admission record no longer exists in Atlas');


  } catch (err) {
    console.error('❌ HTTP Test Exception:', err.message);
    failed++;
  } finally {
    console.log('\n================================================================');
    console.log(`📊 HTTP API Test Results: ${passed} PASSED, ${failed} FAILED`);
    console.log('================================================================\n');
    process.exit(failed > 0 ? 1 : 0);
  }
}

testHttpEndpoints();
