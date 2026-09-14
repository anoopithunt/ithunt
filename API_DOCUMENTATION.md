# 📚 IT HUNT — Official REST API & Database Documentation

> **Production Engine Version**: `v2.2.2-atlas`  
> **Database**: MongoDB Atlas Cloud (`cluster0.oo3akne.mongodb.net/ithunt`)  
> **Architecture**: 100% Direct Cloud Database (Zero Local Caches / Zero In-Memory Mocks)  
> **Accreditation**: ISO 9001:2015 Accredited IT Solutions Studio & Tech Academy

---

## 🌐 API Base URLs

| Environment | Base URL | Description |
| :--- | :--- | :--- |
| **Live Production (Vercel)** | `https://ithunt.vercel.app/api` | Public Serverless Cloud Edge |
| **Local Backend Direct** | `http://localhost:3000/api` | Direct Express Node.js Engine |
| **Local Frontend Proxy (Vite)** | `http://localhost:5500/api` | Vite Dev Server Reverse Proxy |

> [!NOTE]
> All endpoints support dual-mounting: you can call `/api/<route>` or directly `/<route>` on the production domain (e.g. `https://ithunt.vercel.app/api/admissions` and `https://ithunt.vercel.app/admissions`).

---

## 🔐 Authentication & Headers

Protected routes require a JSON Web Token (JWT) in the `Authorization` header:

```http
Authorization: Bearer <your_jwt_token_here>
Content-Type: application/json
Accept: application/json
```

### Roles & Access Matrix:
* **Public**: Candidate admission submissions, course browsing, event registrations, job applications, certificate verification.
* **Student**: Access to personal academic profile (`GET /api/auth/me`), student portal dashboard.
* **SuperAdmin**: Admission confirmations (`POST /api/admissions/:id/confirm`), user credentials management, administrative statistics.

---

## 📑 Complete Endpoints Directory

### 1. System & Health Check

#### `GET /api/health`
Returns live system health and MongoDB Atlas Cloud connection state.
```bash
curl -s https://ithunt.vercel.app/api/health
```
**Response (200 OK):**
```json
{
  "status": "ONLINE",
  "service": "IT HUNT Backend API Engine",
  "version": "2.2.2-atlas",
  "timestamp": "2026-09-14T11:30:00.000Z",
  "uptime": "320s",
  "database": {
    "name": "ithunt",
    "connected": true,
    "readyState": 1,
    "type": "MongoDB Atlas Cloud",
    "mode": "Active / Synchronized",
    "lastError": null
  }
}
```

---

### 2. Authentication & User Management

#### `POST /api/auth/login`
Authenticates SuperAdmin or Student credentials and issues a JWT token.
* **SuperAdmin default**: `admin@ithunt.com` / `admin@ithunt2026`
* **Student credentials**: Automatically generated upon admission confirmation (`ITH-2026-STUxxxx`).

```bash
curl -s -X POST https://ithunt.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ithunt.com",
    "password": "admin@ithunt2026"
  }'
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Authentication successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "id": "usr-admin-default",
      "name": "IT HUNT Super Admin",
      "email": "admin@ithunt.com",
      "role": "superadmin",
      "verified": true
    }
  }
}
```

#### `GET /api/auth/me`
Retrieves authenticated user details from the JWT bearer token.
```bash
curl -s https://ithunt.vercel.app/api/auth/me \
  -H "Authorization: Bearer <token>"
```

#### `GET /api/auth/users` *(SuperAdmin Only)*
Retrieves all registered portal users directly from the Atlas `users` collection.
```bash
curl -s https://ithunt.vercel.app/api/auth/users \
  -H "Authorization: Bearer <admin_token>"
```

#### `DELETE /api/auth/users/:id` *(SuperAdmin Only)*
Deletes a user account from the database.
```bash
curl -s -X DELETE https://ithunt.vercel.app/api/auth/users/USR-1234 \
  -H "Authorization: Bearer <admin_token>"
```

---

### 3. Admissions Portal & Candidate Applications

#### `GET /api/admissions`
List all online admission applications from MongoDB Atlas.
* **Query Parameters**:
  * `course`: Filter by curriculum program.
  * `status`: Filter by status (`Pending Verification`, `Confirmed`, `Enrolled`).
  * `search`: Search by candidate name, email, or registration number.

```bash
curl -s https://ithunt.vercel.app/api/admissions?status=Confirmed
```

#### `GET /api/admissions/:id`
Fetch single candidate admission details by Registration Number or ID.
```bash
curl -s https://ithunt.vercel.app/api/admissions/ITH-2026-10492
```

#### `POST /api/admissions`
Submit a new candidate admission application. Automatically persists to the Atlas `admissions` collection and generates an official admission acknowledgment slip.
```bash
curl -s -X POST https://ithunt.vercel.app/api/admissions \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "Aarav Sharma",
    "fullName": "Aarav Sharma",
    "fatherName": "Mr. Rajesh Sharma",
    "email": "aarav.sharma@example.com",
    "mobile": "9876543210",
    "phone": "9876543210",
    "course": "Full Stack MERN Web Engineering (React 19, Node.js & MongoDB)",
    "gender": "Male",
    "dob": "2002-04-12",
    "districtState": "Prayagraj, UP",
    "address": "Civil Lines, Prayagraj, UP"
  }'
```
**Response (201 Created):**
```json
{
  "success": true,
  "message": "Admission registered successfully",
  "data": {
    "admission": {
      "id": "ITH-892104",
      "registrationNo": "ITH-892104",
      "candidateName": "Aarav Sharma",
      "email": "aarav.sharma@example.com",
      "status": "Pending Verification",
      "createdAt": "2026-09-14T11:00:00.000Z"
    },
    "registrationSlip": {
      "slipNumber": "SLIP-ITH-892104",
      "registrationNo": "ITH-892104",
      "candidateName": "Aarav Sharma",
      "course": "Full Stack MERN Web Engineering (React 19, Node.js & MongoDB)",
      "status": "Pending Verification"
    }
  }
}
```

#### `POST /api/admissions/:id/confirm` *(SuperAdmin Only)*
Confirms a student's admission. **Automatically executes the following cloud database actions**:
1. Updates admission status to `Confirmed`.
2. Automatically generates Student **User ID** (`ITH-2026-STUxxxx`) and secure **Password** (`ITH@xxxx`).
3. Creates official student profile in Atlas `students` collection.
4. Creates student authentication account in Atlas `users` collection.
5. Returns credentials payload for onboarding.

```bash
curl -s -X POST https://ithunt.vercel.app/api/admissions/ITH-892104/confirm \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_token>" \
  -d '{
    "feeStatus": "Verified & Paid",
    "confirmedBy": "SuperAdmin"
  }'
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Admission confirmed successfully! Student User ID and Password generated.",
  "data": {
    "credentials": {
      "userId": "ITH-2026-STU2104",
      "password": "ITH@4918",
      "candidateName": "Aarav Sharma",
      "email": "aarav.sharma@example.com",
      "course": "Full Stack MERN Web Engineering (React 19, Node.js & MongoDB)",
      "loginUrl": "https://ithunt.vercel.app/#login"
    }
  }
}
```

#### `PATCH /api/admissions/:id`
Updates admission particulars or fee verification status.
```bash
curl -s -X PATCH https://ithunt.vercel.app/api/admissions/ITH-892104 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_token>" \
  -d '{ "feeStatus": "Scholarship Approved" }'
```

#### `DELETE /api/admissions/:id`
Deletes candidate application record from Atlas Cloud.
```bash
curl -s -X DELETE https://ithunt.vercel.app/api/admissions/ITH-892104 \
  -H "Authorization: Bearer <admin_token>"
```

---

### 4. Students Directory & Academic Rosters

#### `GET /api/students`
Fetches all enrolled students directly from Atlas `students` collection.
* **Query Parameters**: `?course=...&batch=2026&status=ACTIVE`
```bash
curl -s https://ithunt.vercel.app/api/students
```

#### `GET /api/students/:id`
Fetches individual student academic profile.
```bash
curl -s https://ithunt.vercel.app/api/students/ITH-2026-STU2104
```

#### `POST /api/students/register`
Direct student registration into academic roster.
```bash
curl -s -X POST https://ithunt.vercel.app/api/students/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Karan Verma",
    "email": "karan.verma@example.com",
    "course": "iOS App Development (SwiftUI, UIKit)",
    "batch": "2026"
  }'
```

#### `PATCH /api/students/:id`
Updates student details (phone, batch, academic status).
```bash
curl -s -X PATCH https://ithunt.vercel.app/api/students/ITH-2026-STU2104 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_token>" \
  -d '{ "batch": "2026-Q4", "mobile": "9876543219" }'
```

#### `DELETE /api/students/:id`
Removes student record from roster.
```bash
curl -s -X DELETE https://ithunt.vercel.app/api/students/ITH-2026-STU2104 \
  -H "Authorization: Bearer <admin_token>"
```

---

### 5. Official Accredited Courses Catalog

#### `GET /api/courses`
Retrieves all 8 official accredited curriculum tracks with detailed modules, milestones, and fees.
```bash
curl -s https://ithunt.vercel.app/api/courses
```
**Curriculum Tracks Returned:**
1. `FSW-2026` — Full Stack MERN Web Engineering (React 19, Node.js & MongoDB)
2. `IOS-2026` — iOS App Development & Swift Architecture (SwiftUI & UIKit)
3. `AND-2026` — Modern Android Engineering (Kotlin, Jetpack Compose, MVVM)
4. `AI-PY-2026` — Python, FastAPI & Applied Generative AI Engineering
5. `DM-2026` — Advanced Digital Marketing, Performance Ads & Growth SEO
6. `O-LVL-2026` — NIELIT 'O' Level Foundation Certification Program
7. `A-LVL-2026` — NIELIT 'A' Level Advanced Diploma in Computer Applications
8. `DEG-2026` — University Degree Technical Mentorship (BCA / MCA Track)

#### `GET /api/courses/:id`
Get single course particulars by code or ID.
```bash
curl -s https://ithunt.vercel.app/api/courses/FSW-2026
```

---

### 6. Events & Tech Summit Passes (RSVPs)

#### `GET /api/events`
Lists all official hackathons, AI workshops, and technology summits.
```bash
curl -s https://ithunt.vercel.app/api/events
```

#### `POST /api/events/rsvps`
Registers candidate for a free event pass.
```bash
curl -s -X POST https://ithunt.vercel.app/api/events/rsvps \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Priya Sharma",
    "email": "priya.sharma@example.com",
    "phone": "9876543215",
    "eventTitle": "IT HUNT Annual Tech Summit 2026",
    "domain": "Full-Stack Web (MERN Stack)"
  }'
```

#### `GET /api/events/rsvps`
List all event reservations and attendees.
```bash
curl -s https://ithunt.vercel.app/api/events/rsvps
```

---

### 7. NIELIT O/A Level Project Submissions

#### `GET /api/nielit-projects`
Fetches NIELIT practical project guide submissions.
```bash
curl -s https://ithunt.vercel.app/api/nielit-projects
```

#### `POST /api/nielit-projects`
Submits project guide request, candidate registration, and payment UTR.
```bash
curl -s -X POST https://ithunt.vercel.app/api/nielit-projects \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Vikas Tripathi",
    "registrationNo": "1394821",
    "courseLevel": "O Level",
    "projectTitle": "Hospital Management Information System",
    "mobile": "9876543216",
    "email": "vikas.tripathi@gmail.com",
    "paymentUtr": "UTR92837482910"
  }'
```

---

### 8. Careers & Faculty Recruitment

#### `GET /api/careers/applications`
Lists applicant resumes and instructor job submissions.
```bash
curl -s https://ithunt.vercel.app/api/careers/applications
```

#### `POST /api/careers/applications`
Submits employment application for technical trainer or software architect roles.
```bash
curl -s -X POST https://ithunt.vercel.app/api/careers/applications \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Siddharth Rao",
    "email": "siddharth.rao@example.com",
    "phone": "9876543217",
    "position": "Senior Full Stack Developer & Technical Trainer",
    "experience": "6-8 Years",
    "portfolio": "https://linkedin.com/in/siddharth-rao"
  }'
```

---

### 9. Public Contact Inquiries

#### `POST /api/contact`
Submits visitor inquiry message to the institute helpdesk.
```bash
curl -s -X POST https://ithunt.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ramesh Kumar",
    "email": "ramesh.kumar@example.com",
    "phone": "9876543218",
    "subject": "Inquiry regarding Batch Timings for Python AI Track",
    "message": "Please share upcoming weekend batch timings and fee structure."
  }'
```

#### `GET /api/contact`
Lists all received inquiries.
```bash
curl -s https://ithunt.vercel.app/api/contact
```

---

### 10. Student Fees Ledger

#### `GET /api/fees`
Returns financial transaction records and payment history.
```bash
curl -s https://ithunt.vercel.app/api/fees
```

#### `POST /api/fees`
Records an official student fee payment receipt.
```bash
curl -s -X POST https://ithunt.vercel.app/api/fees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_token>" \
  -d '{
    "studentId": "ITH-2026-STU2104",
    "studentName": "Aarav Sharma",
    "amount": "₹15,000",
    "paymentMode": "Online UPI",
    "transactionId": "UPI-9182374921",
    "purpose": "Full Course Tuition Fee"
  }'
```

---

### 11. Certificate Verification Registry

#### `GET /api/certificates/verify/:certNo`
Public verification registry for employer & student credential verification.
```bash
curl -s https://ithunt.vercel.app/api/certificates/verify/ITH-CERT-2026-001
```

---

### 12. Administrative Dashboard Metrics

#### `GET /api/admin/stats`
Aggregated real-time counts across all Atlas Cloud collections.
```bash
curl -s https://ithunt.vercel.app/api/admin/stats \
  -H "Authorization: Bearer <admin_token>"
```
**Response (200 OK):**
```json
{
  "success": true,
  "stats": {
    "admissions": 14,
    "students": 19,
    "users": 18,
    "courses": 8,
    "nielitProjects": 5,
    "fees": 4,
    "certificates": 3,
    "projects": 4,
    "jobApplications": 3,
    "internships": 2,
    "events": 4,
    "eventRsvps": 3,
    "reviews": 6,
    "contactInquiries": 4
  }
}
```

---

## 🛠️ Automated Testing & Validation

Execute the automated test suites anytime:

```bash
# Model & Scenario Database Tests (34 Scenarios)
node server/test-all-scenarios.js

# Live HTTP REST API Endpoint Tests (31 Scenarios)
node server/test-http-endpoints.js

# Database Cleaner & Normalizer
node server/cleanup-dbs.js

# PDF Documentation Generator
npm run pdf:api
```

---

© 2026 **IT HUNT Institute of Computer Technology & Software Solutions**  
*Dahiyawa Holagarh, Prayagraj, UP — 212502* | Contact: `+91 9795771806` | Email: `softtechithunt@gmail.com`
