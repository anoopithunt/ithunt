/* ==========================================================================
   IT HUNT - Student Academic Data & Public Holidays 2026
   ========================================================================== */

// 1. All Indian Official Public Holidays & Festival Breaks 2026
export const PUBLIC_HOLIDAYS_2026 = [
  {
    date: "2026-01-26",
    name: "Republic Day",
    day: "Monday",
    type: "National Holiday",
    badge: "🇮🇳 National",
    color: "#f97316",
    desc: "Celebration of the Constitution of India coming into effect."
  },
  {
    date: "2026-02-15",
    name: "Maha Shivratri",
    day: "Sunday",
    type: "Gazetted Holiday",
    badge: "🕉️ Festival",
    color: "#a855f7",
    desc: "Traditional Hindu festival dedicated to Lord Shiva."
  },
  {
    date: "2026-03-04",
    name: "Holi (Festival of Colours)",
    day: "Wednesday",
    type: "Gazetted Holiday",
    badge: "🎨 Festival",
    color: "#ec4899",
    desc: "Grand spring festival celebrating colors, harmony, and joy."
  },
  {
    date: "2026-03-20",
    name: "Eid-ul-Fitr",
    day: "Friday",
    type: "Gazetted Holiday",
    badge: "🌙 Festival",
    color: "#10b981",
    desc: "Islamic festival marking the end of the holy month of Ramadan."
  },
  {
    date: "2026-03-27",
    name: "Ram Navami",
    day: "Friday",
    type: "Gazetted Holiday",
    badge: "🏹 Festival",
    color: "#eab308",
    desc: "Celebration of the birth of Lord Rama."
  },
  {
    date: "2026-03-31",
    name: "Mahavir Jayanti",
    day: "Tuesday",
    type: "Gazetted Holiday",
    badge: "✨ Spiritual",
    color: "#06b6d4",
    desc: "Most auspicious festival in Jainism celebrating Lord Mahavira."
  },
  {
    date: "2026-04-03",
    name: "Good Friday",
    day: "Friday",
    type: "Public Holiday",
    badge: "✝️ Christian",
    color: "#64748b",
    desc: "Christian holiday commemorating the crucifixion of Jesus."
  },
  {
    date: "2026-04-14",
    name: "Dr. B.R. Ambedkar Jayanti",
    day: "Tuesday",
    type: "Public Holiday",
    badge: "📜 National",
    color: "#3b82f6",
    desc: "Birth anniversary of the architect of the Indian Constitution."
  },
  {
    date: "2026-05-01",
    name: "Buddha Purnima & Labour Day",
    day: "Friday",
    type: "Gazetted Holiday",
    badge: "🕊️ Spiritual",
    color: "#f59e0b",
    desc: "Celebration of Gautama Buddha's birth and International Workers' Day."
  },
  {
    date: "2026-05-27",
    name: "Bakrid / Eid-ul-Adha",
    day: "Wednesday",
    type: "Gazetted Holiday",
    badge: "🌙 Festival",
    color: "#10b981",
    desc: "Feast of Sacrifice observed by Muslims worldwide."
  },
  {
    date: "2026-06-26",
    name: "Muharram (Ashura)",
    day: "Friday",
    type: "Gazetted Holiday",
    badge: "🕌 Public",
    color: "#6b7280",
    desc: "Tenth day of Muharram commemorating Islamic history."
  },
  {
    date: "2026-08-15",
    name: "Independence Day",
    day: "Saturday",
    type: "National Holiday",
    badge: "🇮🇳 National",
    color: "#f97316",
    desc: "India's 80th Independence Day national celebration."
  },
  {
    date: "2026-08-28",
    name: "Raksha Bandhan",
    day: "Friday",
    type: "Festival Holiday",
    badge: "🌸 Festival",
    color: "#ec4899",
    desc: "Traditional Indian celebration honoring sibling bonds."
  },
  {
    date: "2026-09-04",
    name: "Janmashtami",
    day: "Friday",
    type: "Gazetted Holiday",
    badge: "🪈 Festival",
    color: "#3b82f6",
    desc: "Celebration of the birth of Lord Krishna."
  },
  {
    date: "2026-09-25",
    name: "Milad-un-Nabi (Eid-e-Milad)",
    day: "Friday",
    type: "Gazetted Holiday",
    badge: "🌙 Festival",
    color: "#10b981",
    desc: "Observance of the birthday of Prophet Muhammad."
  },
  {
    date: "2026-10-02",
    name: "Mahatma Gandhi Jayanti",
    day: "Friday",
    type: "National Holiday",
    badge: "🇮🇳 National",
    color: "#f97316",
    desc: "National holiday commemorating Mahatma Gandhi's birthday."
  },
  {
    date: "2026-10-20",
    name: "Dussehra (Vijaya Dashami)",
    day: "Tuesday",
    type: "Gazetted Holiday",
    badge: "🏹 Festival",
    color: "#eab308",
    desc: "Triumph of good over evil, celebrated with cultural festivities."
  },
  {
    date: "2026-11-08",
    name: "Diwali (Deepavali)",
    day: "Sunday",
    type: "Gazetted Holiday",
    badge: "🪔 Festival",
    color: "#f59e0b",
    desc: "The festival of lights symbolizing victory of light over darkness."
  },
  {
    date: "2026-11-09",
    name: "Govardhan Puja / Annakut",
    day: "Monday",
    type: "Public Holiday",
    badge: "🌾 Festival",
    color: "#10b981",
    desc: "Post-Diwali festivities honoring Lord Krishna's benevolence."
  },
  {
    date: "2026-11-10",
    name: "Bhai Dooj",
    day: "Tuesday",
    type: "Festival Holiday",
    badge: "🌸 Festival",
    color: "#ec4899",
    desc: "Festival celebrating the bond between brothers and sisters."
  },
  {
    date: "2026-11-24",
    name: "Guru Nanak Jayanti",
    day: "Tuesday",
    type: "Gazetted Holiday",
    badge: "✨ Spiritual",
    color: "#f97316",
    desc: "Celebration of the birth of the first Sikh Guru, Guru Nanak Dev Ji."
  },
  {
    date: "2026-12-25",
    name: "Christmas Day",
    day: "Friday",
    type: "Gazetted Holiday",
    badge: "🎄 Festival",
    color: "#ef4444",
    desc: "Annual Christian commemoration of the birth of Jesus Christ."
  }
];

// 2. Scoreboard / All Student Exam Results Dataset
export const ALL_STUDENT_EXAM_RESULTS = [
  {
    rank: 1,
    studentName: "Aditya Kumar Sharma",
    registrationNo: "ITH-2026-004",
    course: "3-Month MERN Stack Web Engineer",
    examTitle: "Full-Stack Architecture & API Mastery Exam",
    date: "2026-03-01",
    marksObtained: 98,
    maxMarks: 100,
    percentage: 98.0,
    grade: "O (Outstanding)",
    status: "Passed",
    distinction: "🏆 Top Performer",
    avatar: "👨‍💻",
    theory: 49,
    practical: 49,
    viva: 10
  },
  {
    rank: 2,
    studentName: "Pooja Mishra",
    registrationNo: "ITH-2026-009",
    course: "3-Month MERN Stack Web Engineer",
    examTitle: "Full-Stack Architecture & API Mastery Exam",
    date: "2026-03-01",
    marksObtained: 96,
    maxMarks: 100,
    percentage: 96.0,
    grade: "A+ (Excellent)",
    status: "Passed",
    distinction: "⭐ Distinction",
    avatar: "👩‍💻",
    theory: 48,
    practical: 48,
    viva: 9.5
  },
  {
    rank: 3,
    studentName: "Rohan Verma",
    registrationNo: "ITH-2026-001",
    course: "3-Month MERN Stack Web Engineer",
    examTitle: "Full-Stack Architecture & API Mastery Exam",
    date: "2026-03-01",
    marksObtained: 94,
    maxMarks: 100,
    percentage: 94.0,
    grade: "A+ (Excellent)",
    status: "Passed",
    distinction: "⭐ Distinction",
    avatar: "🎓",
    theory: 47,
    practical: 47,
    viva: 9.0
  },
  {
    rank: 4,
    studentName: "Shashank Patel",
    registrationNo: "ITH-2026-012",
    course: "6-Month Software & Cloud Masterclass",
    examTitle: "Full-Stack Architecture & API Mastery Exam",
    date: "2026-03-01",
    marksObtained: 91,
    maxMarks: 100,
    percentage: 91.0,
    grade: "A (Very Good)",
    status: "Passed",
    distinction: "First Class",
    avatar: "👨‍🎓",
    theory: 45,
    practical: 46,
    viva: 8.5
  },
  {
    rank: 5,
    studentName: "Ananya Gupta",
    registrationNo: "ITH-2026-015",
    course: "NIELIT O/A Level Diploma",
    examTitle: "Full-Stack Architecture & API Mastery Exam",
    date: "2026-03-01",
    marksObtained: 89,
    maxMarks: 100,
    percentage: 89.0,
    grade: "A (Very Good)",
    status: "Passed",
    distinction: "First Class",
    avatar: "👩‍🎓",
    theory: 44,
    practical: 45,
    viva: 8.5
  },
  {
    rank: 6,
    studentName: "Vikram Yadav",
    registrationNo: "ITH-2026-018",
    course: "Mobile App Engineering (Flutter/iOS)",
    examTitle: "Full-Stack Architecture & API Mastery Exam",
    date: "2026-03-01",
    marksObtained: 87,
    maxMarks: 100,
    percentage: 87.0,
    grade: "A (Very Good)",
    status: "Passed",
    distinction: "First Class",
    avatar: "👨‍💻",
    theory: 43,
    practical: 44,
    viva: 8.0
  },
  {
    rank: 7,
    studentName: "Divya Singh",
    registrationNo: "ITH-2026-022",
    course: "3-Month MERN Stack Web Engineer",
    examTitle: "Full-Stack Architecture & API Mastery Exam",
    date: "2026-03-01",
    marksObtained: 85,
    maxMarks: 100,
    percentage: 85.0,
    grade: "B+ (Good)",
    status: "Passed",
    distinction: "First Class",
    avatar: "👩‍💻",
    theory: 41,
    practical: 44,
    viva: 8.0
  },
  {
    rank: 8,
    studentName: "Amitabh Tiwari",
    registrationNo: "ITH-2026-025",
    course: "6-Month Software & Cloud Masterclass",
    examTitle: "Full-Stack Architecture & API Mastery Exam",
    date: "2026-03-01",
    marksObtained: 83,
    maxMarks: 100,
    percentage: 83.0,
    grade: "B+ (Good)",
    status: "Passed",
    distinction: "Second Class",
    avatar: "👨‍🎓",
    theory: 40,
    practical: 43,
    viva: 7.5
  },
  {
    rank: 9,
    studentName: "Kavita Soni",
    registrationNo: "ITH-2026-030",
    course: "NIELIT O/A Level Diploma",
    examTitle: "Full-Stack Architecture & API Mastery Exam",
    date: "2026-03-01",
    marksObtained: 81,
    maxMarks: 100,
    percentage: 81.0,
    grade: "B+ (Good)",
    status: "Passed",
    distinction: "Second Class",
    avatar: "👩‍🎓",
    theory: 39,
    practical: 42,
    viva: 7.5
  },
  {
    rank: 10,
    studentName: "Nitin Pandey",
    registrationNo: "ITH-2026-034",
    course: "Mobile App Engineering (Flutter/iOS)",
    examTitle: "Full-Stack Architecture & API Mastery Exam",
    date: "2026-03-01",
    marksObtained: 79,
    maxMarks: 100,
    percentage: 79.0,
    grade: "B (Above Average)",
    status: "Passed",
    distinction: "Second Class",
    avatar: "👨‍💻",
    theory: 38,
    practical: 41,
    viva: 7.0
  }
];

// Available Exams in Scoreboard
export const AVAILABLE_EXAMS = [
  { id: "mern-arch", title: "Full-Stack Architecture & API Mastery Exam (March 2026)", maxMarks: 100 },
  { id: "frontend-react", title: "Frontend Engineering & Component State Architecture", maxMarks: 100 },
  { id: "backend-db", title: "Node.js, Express & MongoDB Performance Optimization", maxMarks: 100 },
  { id: "nielit-mod", title: "NIELIT Practical Project Lab Evaluation", maxMarks: 100 }
];

// 3. Course Curriculum Modules & Enrollment Tracker
export const COURSE_MODULES_DATA = [
  {
    id: 1,
    title: "Module 1: Web Foundation & Modern ES6+ JavaScript",
    duration: "Week 1 - 2",
    status: "Completed",
    grade: "100%",
    topics: ["HTML5 Semantic Tags", "CSS3 Flexbox & Grid", "DOM Manipulation", "ES6+ Async/Await & Promises", "Git & GitHub Workflows"]
  },
  {
    id: 2,
    title: "Module 2: React.js & Single Page Application Architecture",
    duration: "Week 3 - 5",
    status: "Completed",
    grade: "96%",
    topics: ["Component Lifecycle & Hooks", "State Management (Context & Pinia/Redux)", "React Router DOM", "Vite Bundler Optimization", "TailwindCSS & Glassmorphism"]
  },
  {
    id: 3,
    title: "Module 3: Backend REST APIs with Node.js & Express",
    duration: "Week 6 - 7",
    status: "Completed",
    grade: "94%",
    topics: ["Express Server Architecture", "Middleware & Routing", "JWT Authentication & Role Guards", "File Uploads (Multer & Cloudinary)", "API Security & Rate Limiting"]
  },
  {
    id: 4,
    title: "Module 4: MongoDB, Mongoose & Cloud Databases",
    duration: "Week 8 - 9",
    status: "In Progress",
    grade: "Current Module (75%)",
    topics: ["Document Data Modeling", "Mongoose Schemas & Population", "Aggregation Pipelines & Indexing", "Firebase Firestore Integration", "ACID Transactions"]
  },
  {
    id: 5,
    title: "Module 5: Real-Time WebSockets & Microservices",
    duration: "Week 10",
    status: "Upcoming",
    grade: "Pending",
    topics: ["Socket.io Event Streaming", "Realtime Notifications", "Redis Caching Basics", "Microservice Communication"]
  },
  {
    id: 6,
    title: "Module 6: Enterprise Capstone Project & Deployment",
    duration: "Week 11 - 12",
    status: "Upcoming",
    grade: "Pending",
    topics: ["Production Build & Vercel / Render Deployment", "CI/CD GitHub Actions", "Performance Auditing & SEO", "NIELIT Final Viva & Placement Drive"]
  }
];

// 4. Monthly Attendance Log & Punch Grid
export const ATTENDANCE_SUMMARY = {
  overallPercentage: 94.1,
  totalSessions: 68,
  presentCount: 64,
  absentCount: 2,
  leaveCount: 2,
  eligibilityStatus: "ELIGIBLE FOR CERTIFICATION & PLACEMENTS (Min. 75% Req.)",
  currentMonth: "March 2026",
  batchTiming: "10:00 AM - 01:00 PM (Lab + Theory)",
  room: "Lab Station 04, IT HUNT Holagarh"
};

// Daily records for current month (March 2026)
export const DAILY_ATTENDANCE_LOG = [
  { date: "2026-03-01", day: "Sunday", status: "OFF", timeIn: "-", timeOut: "-", hours: "-", topic: "Institute Weekend" },
  { date: "2026-03-02", day: "Monday", status: "Present", timeIn: "09:55 AM", timeOut: "01:15 PM", hours: "3.3 hrs", topic: "MongoDB Aggregation Pipeline Optimization" },
  { date: "2026-03-03", day: "Tuesday", status: "Present", timeIn: "10:02 AM", timeOut: "01:20 PM", hours: "3.3 hrs", topic: "Database Indexing & Query Execution Plans" },
  { date: "2026-03-04", day: "Wednesday", status: "Holiday", timeIn: "-", timeOut: "-", hours: "-", topic: "🎨 Holi (Festival of Colours) - Public Holiday" },
  { date: "2026-03-05", day: "Thursday", status: "Holiday", timeIn: "-", timeOut: "-", hours: "-", topic: "🎨 Holi Break - Institute Holiday" },
  { date: "2026-03-06", day: "Friday", status: "Present", timeIn: "09:58 AM", timeOut: "01:10 PM", hours: "3.2 hrs", topic: "Mongoose Multi-Document Transactions" },
  { date: "2026-03-07", day: "Saturday", status: "Present", timeIn: "10:00 AM", timeOut: "01:30 PM", hours: "3.5 hrs", topic: "Hands-on Live Project Sprint 3" },
  { date: "2026-03-08", day: "Sunday", status: "OFF", timeIn: "-", timeOut: "-", hours: "-", topic: "Institute Weekend" },
  { date: "2026-03-09", day: "Monday", status: "Present", timeIn: "09:52 AM", timeOut: "01:15 PM", hours: "3.4 hrs", topic: "REST API Versioning & Error Middleware" },
  { date: "2026-03-10", day: "Tuesday", status: "Present", timeIn: "09:59 AM", timeOut: "01:10 PM", hours: "3.2 hrs", topic: "Firebase Cloud Firestore Hybrid Sync" },
  { date: "2026-03-11", day: "Wednesday", status: "Present", timeIn: "10:05 AM", timeOut: "01:25 PM", hours: "3.3 hrs", topic: "Securing Endpoints with JWT & HMAC Signatures" },
  { date: "2026-03-12", day: "Thursday", status: "Leave", timeIn: "-", timeOut: "-", hours: "-", topic: "Approved Medical Leave" },
  { date: "2026-03-13", day: "Friday", status: "Present", timeIn: "09:50 AM", timeOut: "01:15 PM", hours: "3.4 hrs", topic: "Real-time Chat with Socket.io" },
  { date: "2026-03-14", day: "Saturday", status: "Present", timeIn: "10:00 AM", timeOut: "01:30 PM", hours: "3.5 hrs", topic: "Weekend Code Review & Mentor Q&A" },
  { date: "2026-03-15", day: "Sunday", status: "OFF", timeIn: "-", timeOut: "-", hours: "-", topic: "Institute Weekend" },
  { date: "2026-03-16", day: "Monday", status: "Present", timeIn: "09:55 AM", timeOut: "01:15 PM", hours: "3.3 hrs", topic: "Redis Caching for API Endpoints" },
  { date: "2026-03-17", day: "Tuesday", status: "Present", timeIn: "10:00 AM", timeOut: "01:10 PM", hours: "3.2 hrs", topic: "Microservices Architecture Patterns" },
  { date: "2026-03-18", day: "Wednesday", status: "Present", timeIn: "09:58 AM", timeOut: "01:20 PM", hours: "3.4 hrs", topic: "Full-Stack Authentication & Refresh Tokens" },
  { date: "2026-03-19", day: "Thursday", status: "Present", timeIn: "10:01 AM", timeOut: "01:15 PM", hours: "3.2 hrs", topic: "Unit Testing with Vitest & Supertest" },
  { date: "2026-03-20", day: "Friday", status: "Holiday", timeIn: "-", timeOut: "-", hours: "-", topic: "🌙 Eid-ul-Fitr - Public Holiday" },
  { date: "2026-03-21", day: "Saturday", status: "Present", timeIn: "10:00 AM", timeOut: "01:30 PM", hours: "3.5 hrs", topic: "Capstone Project Prototype Demo" },
  { date: "2026-03-22", day: "Sunday", status: "OFF", timeIn: "-", timeOut: "-", hours: "-", topic: "Institute Weekend" },
  { date: "2026-03-23", day: "Monday", status: "Present", timeIn: "09:54 AM", timeOut: "01:15 PM", hours: "3.3 hrs", topic: "Docker Containerization of MERN Stack" },
  { date: "2026-03-24", day: "Tuesday", status: "Present", timeIn: "09:59 AM", timeOut: "01:10 PM", hours: "3.2 hrs", topic: "CI/CD Pipeline with GitHub Actions" },
  { date: "2026-03-25", day: "Wednesday", status: "Present", timeIn: "10:00 AM", timeOut: "01:20 PM", hours: "3.3 hrs", topic: "Cloud Deployment on Vercel & Render" },
  { date: "2026-03-26", day: "Thursday", status: "Present", timeIn: "09:53 AM", timeOut: "01:15 PM", hours: "3.4 hrs", topic: "Domain Setup, SSL & Production Security" },
  { date: "2026-03-27", day: "Friday", status: "Holiday", timeIn: "-", timeOut: "-", hours: "-", topic: "🏹 Ram Navami - Public Holiday" },
  { date: "2026-03-28", day: "Saturday", status: "Present", timeIn: "10:00 AM", timeOut: "01:30 PM", hours: "3.5 hrs", topic: "NIELIT Final Project Presentation & Review" },
  { date: "2026-03-29", day: "Sunday", status: "OFF", timeIn: "-", timeOut: "-", hours: "-", topic: "Institute Weekend" },
  { date: "2026-03-30", day: "Monday", status: "Present", timeIn: "09:55 AM", timeOut: "01:15 PM", hours: "3.3 hrs", topic: "Resume Engineering & Technical Mock Interviews" },
  { date: "2026-03-31", day: "Tuesday", status: "Holiday", timeIn: "-", timeOut: "-", hours: "-", topic: "✨ Mahavir Jayanti - Public Holiday" }
];

// Default Demo Student Profile
export const DEFAULT_DEMO_STUDENT = {
  userId: "student@ithunt.com",
  password: "Ithunt@123",
  candidateName: "Rohan Verma",
  registrationNo: "ITH-2026-001",
  email: "student@ithunt.com",
  mobile: "9876543210",
  fatherName: "Mr. Rajendra Verma",
  motherName: "Mrs. Shanti Verma",
  dob: "2003-08-14",
  gender: "Male",
  district: "Prayagraj",
  address: "Near Holagarh Block, Prayagraj, Uttar Pradesh - 212503",
  course: "3-Month MERN Stack Web Engineer",
  track: "MERN Stack Web Development",
  admissionDate: "2026-01-15",
  status: "Active & Confirmed ✓",
  feeStatus: "Paid in Full (₹15,000 / ₹15,000) ✓",
  totalFee: 15000,
  paidFee: 15000,
  balanceFee: 0,
  batchCode: "ITH-MERN-B1",
  batchTiming: "Morning 10:00 AM - 01:00 PM",
  mentor: "Mr. Lakshman Singh Chauhan",
  mentorRole: "Director & Lead Software Architect"
};
