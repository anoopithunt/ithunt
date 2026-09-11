import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { User } from './models/User.js';
import { Admission } from './models/Admission.js';
import { Student } from './models/Student.js';
import { NielitProject } from './models/NielitProject.js';
import { JobApplication } from './models/JobApplication.js';
import { Internship } from './models/Internship.js';
import { Review } from './models/Review.js';
import { Fee } from './models/Fee.js';
import { Certificate } from './models/Certificate.js';
import { Project } from './models/Project.js';
import { ContactInquiry } from './models/ContactInquiry.js';
import { EventRsvp } from './models/EventRsvp.js';
import { Course } from './models/Course.js';
import { Event } from './models/Event.js';
import bcrypt from 'bcryptjs';

const MONGODB_URI = (process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ithunt').trim();

export async function seedDatabase() {
  const isAtlas = MONGODB_URI.startsWith('mongodb+srv://') || MONGODB_URI.includes('.mongodb.net');
  console.log(`\n=============================================================`);
  console.log(`  🌱 IT HUNT Database Seeder`);
  console.log(`  🗄️  Target Database: ithunt (${isAtlas ? 'MongoDB Atlas Cloud' : 'MongoDB'})`);
  console.log(`=============================================================\n`);

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGODB_URI, { dbName: 'ithunt' });
    console.log(`✓ Connected to ${isAtlas ? 'MongoDB Atlas Cloud' : 'MongoDB'} (ithunt)`);

    // 1. SEED USERS
    console.log('👤 Seeding Users & SuperAdmin accounts...');
    const hashedAdminPassword = await bcrypt.hash('admin@ithunt2026', 10);
    const hashedStudentPassword = await bcrypt.hash('Ithunt@123', 10);

    const usersData = [
      {
        userId: 'usr-admin-default',
        name: 'Mr. Lakshman Singh Chauhan',
        email: 'admin@ithunt.com',
        password: hashedAdminPassword,
        role: 'superadmin',
        phone: '+91 9795771806',
        course: 'Directorate & Leadership',
        registrationNo: 'ITH-ADMIN-01',
        verified: true,
        status: 'ACTIVE',
        avatar: 'img/ithunt.jpg'
      },
      {
        userId: 'usr-admin-director',
        name: 'Mr. Lakshman Singh Chauhan',
        email: 'director@ithunt.com',
        password: hashedAdminPassword,
        role: 'admin',
        phone: '+91 9795771806',
        course: 'Director & Founder, IT HUNT | MCA (Computer Science)',
        registrationNo: 'ITH-ADMIN-02',
        verified: true,
        status: 'ACTIVE',
        avatar: 'img/ithunt.jpg'
      },
      {
        userId: 'usr-admin-cofounder',
        name: 'Anup Mishra',
        email: 'anoop@ithunt.com',
        password: hashedAdminPassword,
        role: 'admin',
        phone: '+91 9795771806',
        course: 'Co-Founder & Lead Software Architect',
        registrationNo: 'ITH-ADMIN-03',
        verified: true,
        status: 'ACTIVE',
        avatar: 'img/anoop.png'
      },
      {
        userId: 'usr-stu-aditya',
        name: 'Aditya Kumar Sharma',
        email: 'aditya@example.com',
        password: hashedStudentPassword,
        role: 'student',
        phone: '+91 9876543201',
        course: '3-Month MERN Stack Web Engineer',
        registrationNo: 'ITH-2026-004',
        verified: true,
        status: 'ACTIVE'
      },
      {
        userId: 'usr-stu-pooja',
        name: 'Pooja Mishra',
        email: 'pooja@example.com',
        password: hashedStudentPassword,
        role: 'student',
        phone: '+91 9876543202',
        course: '3-Month MERN Stack Web Engineer',
        registrationNo: 'ITH-2026-009',
        verified: true,
        status: 'ACTIVE'
      },
      {
        userId: 'usr-stu-rohan',
        name: 'Rohan Verma',
        email: 'rohan@example.com',
        password: hashedStudentPassword,
        role: 'student',
        phone: '+91 9876543203',
        course: '3-Month MERN Stack Web Engineer',
        registrationNo: 'ITH-2026-001',
        verified: true,
        status: 'ACTIVE'
      }
    ];

    for (const u of usersData) {
      await User.findOneAndUpdate({ email: u.email }, u, { upsert: true, new: true });
    }
    console.log(`  ✓ ${usersData.length} Users initialized.`);

    // 2. SEED STUDENTS
    console.log('🎓 Seeding Enrolled Students...');
    const studentsData = [
      {
        userId: 'aditya@example.com',
        enrollmentNumber: 'ITH-2026-004',
        registrationNo: 'ITH-2026-004',
        name: 'Aditya Kumar Sharma',
        fullName: 'Aditya Kumar Sharma',
        candidateName: 'Aditya Kumar Sharma',
        email: 'aditya@example.com',
        phone: '+91 9876543201',
        mobile: '+91 9876543201',
        course: '3-Month MERN Stack Web Engineer',
        batch: '2026',
        academicStatus: 'ACTIVE',
        status: 'ACTIVE',
        gender: 'Male',
        dob: '2004-03-12',
        address: 'Dahiyawa Holagarh, Prayagraj',
        guardianName: 'Mr. R. K. Sharma',
        guardianPhone: '+91 9876543200',
        attendance: 96,
        cgpa: '9.8 / 10',
        bio: 'Aspiring Full Stack Engineer specializing in Node.js microservices and React 19 architecture.',
        marks: [
          { subject: 'Frontend React 19 & State Management', score: 98, max: 100 },
          { subject: 'Node.js & Express REST Architecture', score: 97, max: 100 },
          { subject: 'MongoDB & Cloud Aggregations', score: 99, max: 100 }
        ]
      },
      {
        userId: 'pooja@example.com',
        enrollmentNumber: 'ITH-2026-009',
        registrationNo: 'ITH-2026-009',
        name: 'Pooja Mishra',
        fullName: 'Pooja Mishra',
        candidateName: 'Pooja Mishra',
        email: 'pooja@example.com',
        phone: '+91 9876543202',
        mobile: '+91 9876543202',
        course: '3-Month MERN Stack Web Engineer',
        batch: '2026',
        academicStatus: 'ACTIVE',
        status: 'ACTIVE',
        gender: 'Female',
        dob: '2004-07-25',
        address: 'Civil Lines, Prayagraj',
        guardianName: 'Mr. S. P. Mishra',
        guardianPhone: '+91 9876543205',
        attendance: 94,
        cgpa: '9.6 / 10',
        bio: 'Full Stack JavaScript developer with a focus on high-performance UI and REST APIs.',
        marks: [
          { subject: 'Frontend React 19 & State Management', score: 96, max: 100 },
          { subject: 'Node.js & Express REST Architecture', score: 95, max: 100 },
          { subject: 'MongoDB & Cloud Aggregations', score: 97, max: 100 }
        ]
      },
      {
        userId: 'rohan@example.com',
        enrollmentNumber: 'ITH-2026-001',
        registrationNo: 'ITH-2026-001',
        name: 'Rohan Verma',
        fullName: 'Rohan Verma',
        candidateName: 'Rohan Verma',
        email: 'rohan@example.com',
        phone: '+91 9876543203',
        mobile: '+91 9876543203',
        course: '3-Month MERN Stack Web Engineer',
        batch: '2026',
        academicStatus: 'ACTIVE',
        status: 'ACTIVE',
        gender: 'Male',
        dob: '2003-11-15',
        address: 'Holagarh, Prayagraj',
        guardianName: 'Mr. M. L. Verma',
        guardianPhone: '+91 9876543208',
        attendance: 92,
        cgpa: '9.5 / 10',
        bio: 'Passionate about building scalable backend APIs and database performance optimization.',
        marks: [
          { subject: 'Frontend React 19 & State Management', score: 95, max: 100 },
          { subject: 'Node.js & Express REST Architecture', score: 94, max: 100 },
          { subject: 'MongoDB & Cloud Aggregations', score: 96, max: 100 }
        ]
      },
      {
        userId: 'neha@example.com',
        enrollmentNumber: 'ITH-2026-002',
        registrationNo: 'ITH-2026-002',
        name: 'Neha Upadhyay',
        fullName: 'Neha Upadhyay',
        candidateName: 'Neha Upadhyay',
        email: 'neha@example.com',
        phone: '+91 9876543204',
        mobile: '+91 9876543204',
        course: '6-Month iOS Native App Masterclass',
        batch: '2026',
        academicStatus: 'ACTIVE',
        status: 'ACTIVE',
        gender: 'Female',
        dob: '2004-01-18',
        address: 'Katra, Prayagraj',
        attendance: 95,
        cgpa: '9.4 / 10',
        bio: 'iOS Developer with Swift 5, SwiftUI, and Combine experience.'
      },
      {
        userId: 'amit@example.com',
        enrollmentNumber: 'ITH-2026-003',
        registrationNo: 'ITH-2026-003',
        name: 'Amit Kumar Srivastav',
        fullName: 'Amit Kumar Srivastav',
        candidateName: 'Amit Kumar Srivastav',
        email: 'amit@example.com',
        phone: '+91 9876543205',
        mobile: '+91 9876543205',
        course: '6-Month Android Native App Masterclass',
        batch: '2026',
        academicStatus: 'ACTIVE',
        status: 'ACTIVE',
        gender: 'Male',
        dob: '2003-09-08',
        address: 'Naini, Prayagraj',
        attendance: 93,
        cgpa: '9.3 / 10',
        bio: 'Kotlin specialist creating clean MVVM architecture apps with Jetpack Compose.'
      }
    ];

    for (const s of studentsData) {
      await Student.findOneAndUpdate({ enrollmentNumber: s.enrollmentNumber }, s, { upsert: true, new: true });
    }
    console.log(`  ✓ ${studentsData.length} Students initialized.`);

    // 3. SEED ADMISSIONS
    console.log('📝 Seeding Admissions Registry...');
    const admissionsData = [
      {
        registrationNo: 'ITH-2026-004',
        fullName: 'Aditya Kumar Sharma',
        candidateName: 'Aditya Kumar Sharma',
        fatherName: 'Mr. R. K. Sharma',
        motherName: 'Mrs. S. Sharma',
        phone: '+91 9876543201',
        email: 'aditya@example.com',
        course: '3-Month MERN Stack Web Engineer',
        district: 'Prayagraj',
        gender: 'Male',
        dob: '2004-03-12',
        status: 'Confirmed',
        feeStatus: 'Verified & Paid',
        amountPaid: '₹5,000',
        paymentMode: 'Online UPI',
        date: '01/03/2026',
        time: '10:30 AM'
      },
      {
        registrationNo: 'ITH-2026-009',
        fullName: 'Pooja Mishra',
        candidateName: 'Pooja Mishra',
        fatherName: 'Mr. S. P. Mishra',
        motherName: 'Mrs. K. Mishra',
        phone: '+91 9876543202',
        email: 'pooja@example.com',
        course: '3-Month MERN Stack Web Engineer',
        district: 'Prayagraj',
        gender: 'Female',
        dob: '2004-07-25',
        status: 'Confirmed',
        feeStatus: 'Verified & Paid',
        amountPaid: '₹5,000',
        paymentMode: 'Online UPI',
        date: '01/03/2026',
        time: '11:15 AM'
      },
      {
        registrationNo: 'ITH-2026-001',
        fullName: 'Rohan Verma',
        candidateName: 'Rohan Verma',
        fatherName: 'Mr. M. L. Verma',
        motherName: 'Mrs. P. Verma',
        phone: '+91 9876543203',
        email: 'rohan@example.com',
        course: '3-Month MERN Stack Web Engineer',
        district: 'Prayagraj',
        gender: 'Male',
        dob: '2003-11-15',
        status: 'Confirmed',
        feeStatus: 'Verified & Paid',
        amountPaid: '₹5,000',
        paymentMode: 'Online UPI',
        date: '02/03/2026',
        time: '02:00 PM'
      },
      {
        registrationNo: 'ITH-2026-002',
        fullName: 'Neha Upadhyay',
        candidateName: 'Neha Upadhyay',
        fatherName: 'Mr. V. Upadhyay',
        motherName: 'Mrs. M. Upadhyay',
        phone: '+91 9876543204',
        email: 'neha@example.com',
        course: '6-Month iOS Native App Masterclass',
        district: 'Prayagraj',
        gender: 'Female',
        dob: '2004-01-18',
        status: 'Confirmed',
        feeStatus: 'Verified & Paid',
        amountPaid: '₹10,000',
        paymentMode: 'Net Banking',
        date: '03/03/2026',
        time: '12:45 PM'
      }
    ];

    for (const a of admissionsData) {
      await Admission.findOneAndUpdate({ registrationNo: a.registrationNo }, a, { upsert: true, new: true });
    }
    console.log(`  ✓ ${admissionsData.length} Admissions initialized.`);

    // 4. SEED NIELIT PROJECTS
    console.log('📁 Seeding NIELIT Projects...');
    const nielitData = [
      {
        registrationNo: 'NIELIT-2026-001',
        nielitRegNo: '1389421',
        studentName: 'Aditya Kumar Sharma',
        candidateName: 'Aditya Kumar Sharma',
        fatherName: 'Mr. R. K. Sharma',
        motherName: 'Mrs. S. Sharma',
        mobile: '+91 9876543201',
        email: 'aditya@example.com',
        level: 'O Level',
        projectTitle: 'Multi-Tenant SaaS CRM & Lead Automation Portal',
        guideName: 'Mr. Sushil Kumar',
        guideQualification: 'MCA (Computer Science)',
        guideDesignation: 'Laravel / Node.js Lead Developer',
        status: 'Approved',
        feePaid: '₹1,000',
        utrNo: 'UPI9823471029',
        accountHolderName: 'Aditya Kumar Sharma',
        paymentRemark: 'Verified & Approved by Director',
        date: '05/03/2026'
      },
      {
        registrationNo: 'NIELIT-2026-002',
        nielitRegNo: '1389422',
        studentName: 'Pooja Mishra',
        candidateName: 'Pooja Mishra',
        fatherName: 'Mr. S. P. Mishra',
        motherName: 'Mrs. K. Mishra',
        mobile: '+91 9876543202',
        email: 'pooja@example.com',
        level: 'A Level',
        projectTitle: 'Smart Healthcare Clinic Automation System',
        guideName: 'Mr. Lakshman Singh Chauhan',
        guideQualification: 'MCA (Computer Science)',
        guideDesignation: 'Director & Lead Tech Mentor',
        status: 'Submitted',
        feePaid: '₹1,000',
        utrNo: 'UPI9823471030',
        accountHolderName: 'Pooja Mishra',
        paymentRemark: 'Under Guide Evaluation',
        date: '06/03/2026'
      },
      {
        registrationNo: 'NIELIT-2026-003',
        nielitRegNo: '1389423',
        studentName: 'Rohan Verma',
        candidateName: 'Rohan Verma',
        fatherName: 'Mr. M. L. Verma',
        motherName: 'Mrs. P. Verma',
        mobile: '+91 9876543203',
        email: 'rohan@example.com',
        level: 'O Level',
        projectTitle: 'Cloud Inventory & E-Commerce Warehouse Manager',
        guideName: 'Mr. Sushil Kumar',
        guideQualification: 'MCA (Computer Science)',
        guideDesignation: 'Laravel / Node.js Lead Developer',
        status: 'Approved',
        feePaid: '₹1,000',
        utrNo: 'UPI9823471031',
        accountHolderName: 'Rohan Verma',
        paymentRemark: 'Final Viva Passed',
        date: '07/03/2026'
      }
    ];

    for (const n of nielitData) {
      await NielitProject.findOneAndUpdate({ registrationNo: n.registrationNo }, n, { upsert: true, new: true });
    }
    console.log(`  ✓ ${nielitData.length} NIELIT Projects initialized.`);

    // 5. SEED REVIEWS & ALUMNI SUCCESS STORIES
    console.log('⭐ Seeding Alumni Reviews & Testimonials...');
    const reviewsData = [
      {
        name: 'Anup Mishra',
        fullName: 'Anup Mishra',
        role: 'MERN Stack Lead (Batch of 2024)',
        course: 'Full Stack MERN Stack Engineering',
        rating: 5,
        reviewText: 'Joining IT HUNT was the turning point in my engineering career. Under Director Mr. Lakshman Singh Chauhan mentorship, I coded on real Git branches daily, built 3 full-stack MERN production web apps, and mastered Docker and MongoDB aggregation. Top tier placement guidance!',
        category: '💻 Labs & Workstations',
        verified: true,
        approved: true,
        date: '01/02/2026'
      },
      {
        name: 'Neha Upadhyay',
        fullName: 'Neha Upadhyay',
        role: 'iOS Developer @ Zomato Tech',
        course: 'iOS Native App Development (Swift & SwiftUI)',
        rating: 5,
        reviewText: 'The Apple lab workstations and Xcode hands-on training at Holagarh are unmatched. We built native apps on TestFlight and the App Store. Learning Combine, CoreData, and Apple HIG gave me a massive advantage over standard applicants!',
        category: '🍎 Apple Workstations',
        verified: true,
        approved: true,
        date: '10/02/2026'
      },
      {
        name: 'Amit Kumar Srivastav',
        fullName: 'Amit Kumar Srivastav',
        role: 'Senior Android Engineer @ Infosys Digital',
        course: 'Android Native App Development (Kotlin & Compose)',
        rating: 5,
        reviewText: 'The faculty at IT HUNT has 4+ years of real industry experience. They taught us Clean MVVM architecture, Room database caching, Coroutines, and Hilt dependency injection exactly as top product companies write code.',
        category: '👨‍🏫 Faculty Mentorship',
        verified: true,
        approved: true,
        date: '15/02/2026'
      },
      {
        name: 'Saurabh Pandey',
        fullName: 'Saurabh Pandey',
        role: 'AI / Backend Developer',
        course: 'Python, FastAPI & Applied Generative AI',
        rating: 5,
        reviewText: 'I joined the Applied Generative AI track to learn practical LLM orchestration. We built custom RAG pipelines with Pinecone, asynchronous APIs with FastAPI, and autonomous web agents. Got hired within 3 weeks!',
        category: '🚀 Career Placements',
        verified: true,
        approved: true,
        date: '20/02/2026'
      }
    ];

    for (const r of reviewsData) {
      await Review.findOneAndUpdate({ name: r.name }, r, { upsert: true, new: true });
    }
    console.log(`  ✓ ${reviewsData.length} Reviews initialized.`);

    // 6. SEED CERTIFICATES
    console.log('📜 Seeding Certificates Registry...');
    const certificatesData = [
      {
        certNo: 'ITH-CERT-2026-001',
        certificateNumber: 'ITH-CERT-2026-001',
        studentName: 'Aditya Kumar Sharma',
        candidateName: 'Aditya Kumar Sharma',
        course: 'Full Stack MERN Stack & Cloud Engineering',
        grade: 'O (Outstanding)',
        issueDate: '01/03/2026',
        status: 'Verified & Active',
        verificationUrl: 'http://localhost:3000/api/certificates/verify/ITH-CERT-2026-001'
      },
      {
        certNo: 'ITH-CERT-2026-002',
        certificateNumber: 'ITH-CERT-2026-002',
        studentName: 'Pooja Mishra',
        candidateName: 'Pooja Mishra',
        course: 'Full Stack MERN Stack & Cloud Engineering',
        grade: 'A+ (Excellent)',
        issueDate: '01/03/2026',
        status: 'Verified & Active',
        verificationUrl: 'http://localhost:3000/api/certificates/verify/ITH-CERT-2026-002'
      },
      {
        certNo: 'ITH-CERT-2026-003',
        certificateNumber: 'ITH-CERT-2026-003',
        studentName: 'Neha Upadhyay',
        candidateName: 'Neha Upadhyay',
        course: 'iOS Native App Development (Swift & SwiftUI)',
        grade: 'A+ (Excellent)',
        issueDate: '02/03/2026',
        status: 'Verified & Active',
        verificationUrl: 'http://localhost:3000/api/certificates/verify/ITH-CERT-2026-003'
      }
    ];

    for (const c of certificatesData) {
      await Certificate.findOneAndUpdate({ certNo: c.certNo }, c, { upsert: true, new: true });
    }
    console.log(`  ✓ ${certificatesData.length} Certificates initialized.`);

    // 7. SEED FEES LEDGER
    console.log('💰 Seeding Fees Ledger...');
    const feesData = [
      {
        studentId: 'ITH-2026-004',
        studentName: 'Aditya Kumar Sharma',
        receiptNo: 'REC-10021',
        receiptNumber: 'REC-10021',
        course: '3-Month MERN Stack Web Engineer',
        amount: '₹5,000',
        paymentMode: 'Online UPI (GooglePay)',
        status: 'Verified & Paid',
        date: '01/03/2026'
      },
      {
        studentId: 'ITH-2026-009',
        studentName: 'Pooja Mishra',
        receiptNo: 'REC-10022',
        receiptNumber: 'REC-10022',
        course: '3-Month MERN Stack Web Engineer',
        amount: '₹5,000',
        paymentMode: 'Online UPI (PhonePe)',
        status: 'Verified & Paid',
        date: '01/03/2026'
      },
      {
        studentId: 'ITH-2026-002',
        studentName: 'Neha Upadhyay',
        receiptNo: 'REC-10023',
        receiptNumber: 'REC-10023',
        course: '6-Month iOS Native App Masterclass',
        amount: '₹10,000',
        paymentMode: 'Net Banking (HDFC)',
        status: 'Verified & Paid',
        date: '03/03/2026'
      }
    ];

    for (const f of feesData) {
      await Fee.findOneAndUpdate({ receiptNo: f.receiptNo }, f, { upsert: true, new: true });
    }
    console.log(`  ✓ ${feesData.length} Fees records initialized.`);

    // 8. SEED CAPSTONE PROJECTS
    console.log('💻 Seeding Student Capstone Projects...');
    const projectsData = [
      {
        title: 'Multi-Tenant SaaS CRM with Razorpay & Socket.io',
        studentName: 'Aditya Kumar Sharma',
        techStack: 'React.js 19, Node.js, Express, MongoDB, Socket.io',
        repoUrl: 'https://github.com/ithunt/saas-crm-mern',
        liveUrl: 'https://saas-crm.ithunt.in',
        description: 'Enterprise level customer relationship platform featuring real-time socket chats and webhook payment automation.',
        status: 'Completed & Approved',
        submittedAt: '01/03/2026'
      },
      {
        title: 'Live AVKit Streaming App & HealthKit Tracker',
        studentName: 'Neha Upadhyay',
        techStack: 'Swift 5.10, SwiftUI, Combine, HealthKit, AVKit',
        repoUrl: 'https://github.com/ithunt/ios-fitness-stream',
        liveUrl: 'https://testflight.apple.com/join/ithunt-demo',
        description: 'Native iOS streaming platform integrating Apple HealthKit biometric sensors and AVPlayer streaming.',
        status: 'Completed & Approved',
        submittedAt: '02/03/2026'
      },
      {
        title: 'Fintech Wallet & QR Payment Engine',
        studentName: 'Amit Kumar Srivastav',
        techStack: 'Kotlin, Jetpack Compose, Room DB, Retrofit, Coroutines',
        repoUrl: 'https://github.com/ithunt/android-fintech-wallet',
        liveUrl: 'https://play.google.com/store/apps/details?id=in.ithunt.wallet',
        description: 'Clean MVVM architecture Android application supporting biometric login and offline Room caching.',
        status: 'Completed & Approved',
        submittedAt: '03/03/2026'
      }
    ];

    for (const p of projectsData) {
      await Project.findOneAndUpdate({ title: p.title }, p, { upsert: true, new: true });
    }
    console.log(`  ✓ ${projectsData.length} Projects initialized.`);

    // 9. SEED INTERNSHIPS & CAREERS
    console.log('🚀 Seeding Internships & Job Applications...');
    const internshipsData = [
      {
        candidateName: 'Aditya Kumar Sharma',
        email: 'aditya@example.com',
        phone: '+91 9876543201',
        track: 'Full Stack MERN',
        duration: '6 Months',
        status: 'Active Internship',
        appliedAt: '01/03/2026'
      },
      {
        candidateName: 'Neha Upadhyay',
        email: 'neha@example.com',
        phone: '+91 9876543204',
        track: 'iOS Native Development',
        duration: '6 Months',
        status: 'Active Internship',
        appliedAt: '03/03/2026'
      }
    ];
    for (const i of internshipsData) {
      await Internship.findOneAndUpdate({ email: i.email }, i, { upsert: true, new: true });
    }

    const careersData = [
      {
        name: 'Er. Rajesh Kumar Maurya',
        position: 'Senior MERN Stack Faculty Mentor',
        email: 'rajesh.maurya@example.com',
        phone: '+91 9811223344',
        experience: '5+ Years Experience',
        resumeLink: 'https://example.com/resumes/rajesh.pdf',
        status: 'Pending Review',
        date: '08/03/2026'
      }
    ];
    for (const j of careersData) {
      await JobApplication.findOneAndUpdate({ email: j.email }, j, { upsert: true, new: true });
    }

    // 10. SEED CONTACT INQUIRIES & RSVPS
    console.log('📬 Seeding Contact & Events...');
    const contactData = [
      {
        name: 'Sunil Gupta',
        email: 'sunil.gupta@example.com',
        phone: '+91 9795001122',
        subject: 'Inquiry for Summer 2026 MERN Internship',
        message: 'Hello, I am in B.Tech 3rd year and would like details regarding the upcoming 3-Month MERN Stack batch at Holagarh.',
        status: 'New'
      }
    ];
    for (const c of contactData) {
      await ContactInquiry.findOneAndUpdate({ email: c.email }, c, { upsert: true, new: true });
    }

    const rsvpsData = [
      {
        name: 'Aditya Kumar Sharma',
        email: 'aditya@example.com',
        phone: '+91 9876543201',
        eventTitle: 'IT HUNT 24-Hr Hackathon 2026',
        college: 'Prayagraj Institute of Technology',
        status: 'Confirmed',
        date: '10/03/2026'
      }
    ];
    for (const r of rsvpsData) {
      await EventRsvp.findOneAndUpdate({ email: r.email }, r, { upsert: true, new: true });
    }

    // 11. SEED COURSES CATALOG
    console.log('📚 Seeding Accredited Courses & Degree Programs...');
    const coursesData = [
      {
        code: 'O-LEVEL',
        title: 'NIELIT "O" Level Diploma',
        category: 'NIELIT Accredited',
        duration: '1 Year (2 Semesters)',
        fee: '₹18,000',
        badge: 'Govt. Recognized',
        description: 'Foundation diploma equivalent to PGDCA. Covers IT Tools, Web Designing, Python Programming, and Internet of Things (IoT).',
        syllabus: [
          'M1-R5: Information Technology Tools and Network Basics',
          'M2-R5: Web Designing & Publishing',
          'M3-R5: Programming and Problem Solving through Python',
          'M4-R5: Internet of Things and its Applications',
          'PR1: Practical Assessment',
          'PJ1: Project Work'
        ],
        eligibility: '10+2 or ITI Certificate',
        certificate: 'NIELIT (Ministry of Electronics & IT, Govt. of India)',
        status: 'ACTIVE'
      },
      {
        code: 'A-LEVEL',
        title: 'NIELIT "A" Level Advanced Diploma',
        category: 'NIELIT Accredited',
        duration: '1 Year (2 Semesters)',
        fee: '₹28,000',
        badge: 'Advance Graduate Diploma',
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
        ],
        eligibility: 'O Level / Graduate / Polytechnic Diploma',
        certificate: 'NIELIT (Govt. of India Recognized)',
        status: 'ACTIVE'
      },
      {
        code: 'BCA-MCA-SUBHARTI',
        title: 'Subharti University Degree Courses (BCA / MCA)',
        category: 'University Degree',
        duration: '3 Years (BCA) / 2 Years (MCA)',
        fee: '₹32,000/Yr',
        badge: 'UGC & AICTE Approved',
        description: 'Comprehensive degree courses in computer applications run via Distance & Regular education approved by UGC, AICTE, and DEC joint committee.',
        syllabus: [
          'Computer Architecture & Digital Electronics',
          'Object Oriented Programming in Java and C++',
          'Operating Systems & System Architecture',
          'Database Management Systems & Cloud Architecture',
          'Web Technologies & Enterprise Development'
        ],
        eligibility: '10+2 (for BCA) / Graduation (for MCA)',
        certificate: 'Swami Vivekanand Subharti University (UGC Approved)',
        status: 'ACTIVE'
      },
      {
        code: 'MERN-FULLSTACK',
        title: 'Full Stack MERN Web Engineering (React 19, Node.js & MongoDB)',
        category: 'Software Engineering',
        duration: '6 Months (3-Mo Bootcamp + 3-Mo Production Internship)',
        fee: '₹25,000',
        badge: 'Flagship Job-Ready Track',
        description: 'Production software engineering track covering modern HTML5/CSS3, JavaScript ES2025, React 19, Node.js, Express, MongoDB Atlas, REST APIs, and Cloud Deployment.',
        syllabus: [
          'Advanced JavaScript ES6+ & TypeScript Essentials',
          'React 19 Architecture, Hooks & Modern State Management',
          'Node.js & Express RESTful Microservices',
          'MongoDB Atlas Aggregation, Indexing & Mongoose Models',
          'Docker, Vercel CI/CD & Production Deployment'
        ],
        eligibility: 'Pursuing / Completed B.Tech, BCA, MCA, B.Sc, or Diploma',
        certificate: 'IT HUNT Production Software Engineer Certificate + Corporate LOR',
        status: 'ACTIVE'
      },
      {
        code: 'MOBILE-APP-DEV',
        title: 'Mobile App Engineering (Flutter, Dart & iOS/Android Native)',
        category: 'Software Engineering',
        duration: '6 Months',
        fee: '₹25,000',
        badge: 'High Demand',
        description: 'Comprehensive cross-platform and native mobile app development program using Flutter, Dart, Swift iOS, and Firebase cloud integrations.',
        syllabus: [
          'Dart Language & Reactive UI Paradigms',
          'Flutter State Management (Riverpod & Bloc)',
          'Firebase Authentication & Cloud Firestore',
          'Native iOS/Android Bridge & App Store / Play Store Release'
        ],
        eligibility: 'Basic Programming Knowledge',
        certificate: 'IT HUNT Mobile Software Engineer Certificate & Experience Letter',
        status: 'ACTIVE'
      },
      {
        code: 'PYTHON-AI-ML',
        title: 'Python Programming, Data Science & Machine Learning / AI',
        category: 'Artificial Intelligence',
        duration: '6 Months',
        fee: '₹24,000',
        badge: 'AI / ML Era',
        description: 'Practical AI engineering course covering Python programming, NumPy, Pandas, Scikit-learn, PyTorch, Deep Learning, and Generative AI Agents.',
        syllabus: [
          'Python Core, OOP & Advanced Algorithms',
          'Data Analysis & Visualization with NumPy and Pandas',
          'Supervised & Unsupervised Machine Learning Models',
          'Generative AI Agents, Prompt Engineering & API Orchestration'
        ],
        eligibility: '10+2 / Mathematics or Computer Background',
        certificate: 'IT HUNT Certified AI & Data Science Specialist',
        status: 'ACTIVE'
      },
      {
        code: 'TALLY-PRIME',
        title: 'Tally Prime ERP & Advanced Financial Accounting with GST',
        category: 'Accounting & Finance',
        duration: '3 Months',
        fee: '₹6,500',
        badge: 'Job Oriented',
        description: 'Industry accounting course covering Tally Prime, GST filing, e-Way bills, payroll management, TDS, balance sheets, and inventory control.',
        syllabus: [
          'Double Entry Accounting Principles & Journal Entries',
          'Tally Prime Company Setup, Ledgers & Groups',
          'GST Invoicing, e-Way Bills & Tax Computation',
          'Payroll Management, TDS, and Audit Balance Sheets'
        ],
        eligibility: '10th / 12th / Commerce or Any Stream',
        certificate: 'IT HUNT Authorized Financial Accountant Certificate',
        status: 'ACTIVE'
      },
      {
        code: 'CCC',
        title: 'NIELIT Course on Computer Concepts (CCC)',
        category: 'Govt. Certification',
        duration: '3 Months (80 Hours)',
        fee: '₹3,500',
        badge: 'Govt. Job Essential',
        description: 'Mandatory government exam certification covering computer basics, LibreOffice/MS Office, Windows, Internet, Digital Financial Services, and Cyber Security.',
        syllabus: [
          'Introduction to Computers, Hardware & Operating Systems',
          'Word Processing & Spreadsheet Analysis (LibreOffice / MS Office)',
          'Presentations & Web Browsing Protocols',
          'Digital Financial Services, Net Banking & Cyber Safety'
        ],
        eligibility: 'Open to All (No Minimum Educational Requirement)',
        certificate: 'NIELIT Govt. of India Certificate',
        status: 'ACTIVE'
      }
    ];
    for (const c of coursesData) {
      await Course.findOneAndUpdate({ code: c.code }, c, { upsert: true, new: true });
    }

    // 12. SEED EVENTS CATALOG
    console.log('🎪 Seeding Flagship Events, Hackathons & Workshops Catalog...');
    const eventsCatalogData = [
      {
        slug: 'hackathon-2026',
        title: 'Prayagraj Grand TechFest & 24-Hour Code Hackathon',
        subtitle: 'Inter-college software engineering challenge solving real-world AI, Web & Mobile problems.',
        category: 'Hackathon',
        date: 'Aug 12 - 13, 2026',
        time: '09:00 AM (24-Hour Non-Stop Sprint)',
        venue: 'IT HUNT Main Innovation Hub & Lab 1, Holagarh, Prayagraj',
        mode: 'Offline Campus Lab',
        banner: 'img/event_hackathon.webp',
        speakers: ['Mr. Lakshman Singh Chauhan (Director)', 'Er. Anup Mishra (Software Architect)'],
        highlights: [
          '₹75,000 Cash Prize Pool',
          '48 Competing Developer Teams',
          'Corporate LOR & Direct Hiring by IT HUNT Studio'
        ],
        seatsTotal: 150,
        seatsBooked: 132,
        status: 'COMPLETED'
      },
      {
        slug: 'autumn-hackathon-2026',
        title: 'Prayagraj Grand Web & AI Hackathon (Autumn Edition)',
        subtitle: '24-hour sprint to build full-stack web platforms, AI agents, and mobile apps.',
        category: 'Hackathon',
        date: 'September 24 - 25, 2026',
        time: '09:00 AM - Next Day 09:00 AM',
        venue: 'IT HUNT Innovation Arena & Lab 1, Holagarh, Prayagraj',
        mode: 'Hybrid (Offline + Live Stream)',
        banner: 'img/event_hackathon.webp',
        speakers: ['Mr. Lakshman Singh Chauhan (Director, IT HUNT)', 'Er. Anup Mishra (Lead Software Architect)'],
        highlights: [
          '₹75,000 Total Cash Prize Pool',
          'Free High-Speed Lab Workstations & Cloud GPUs',
          'Verified Corporate Recommendation Letters (LOR)'
        ],
        seatsTotal: 100,
        seatsBooked: 62,
        status: 'UPCOMING'
      },
      {
        slug: 'cybersecurity-masterclass-2026',
        title: 'Enterprise Cybersecurity & Ethical Hacking Masterclass',
        subtitle: 'Live offensive and defensive security lab with hands-on penetration testing.',
        category: 'Workshop',
        date: 'October 10, 2026',
        time: '10:00 AM - 04:00 PM',
        venue: 'Cyber Defense Wing, IT HUNT Holagarh',
        mode: 'In-Person Lab Practical',
        banner: 'img/event_workshop.webp',
        speakers: ['Senior Cyber Security Faculty & Guest Ethical Hackers'],
        highlights: [
          'Hands-on Penetration Testing & Web Vulnerability Lab',
          'Wireshark, Burp Suite & Kali Linux Real-World Exercises',
          'Official Cyber Defense Workshop Certificate'
        ],
        seatsTotal: 60,
        seatsBooked: 48,
        status: 'UPCOMING'
      },
      {
        slug: 'annual-convocation-2026',
        title: 'Annual Convocation & Tech Achievement Ceremony 2026',
        subtitle: 'Honoring graduating batches in NIELIT O/A Level, MERN Stack, and Mobile Engineering.',
        category: 'Convocation',
        date: 'November 15, 2026',
        time: '11:00 AM - 03:30 PM',
        venue: 'IT HUNT Auditorium, Holagarh, Prayagraj',
        mode: 'In-Person Ceremony',
        banner: 'img/event_convocation.webp',
        speakers: ['Distinguished Academic Patrons & Industry Leaders'],
        highlights: [
          'Distribution of NIELIT & ISO Diplomas',
          'Award of Excellence for Top Interns',
          'Alumni Networking Session & High Tea'
        ],
        seatsTotal: 250,
        seatsBooked: 180,
        status: 'UPCOMING'
      }
    ];
    for (const e of eventsCatalogData) {
      await Event.findOneAndUpdate({ slug: e.slug }, e, { upsert: true, new: true });
    }

    console.log('\n=============================================================');
    console.log('  🎉 All Required IT HUNT Data Successfully Synchronized!');
    console.log('  🗄️  Database: ithunt (MongoDB)');
    console.log('=============================================================\n');

    await mongoose.disconnect();
    return true;
  } catch (error) {
    console.error('! Seeding failed:', error);
    try { await mongoose.disconnect(); } catch (_) {}
    return false;
  }
}

// Execute directly if run via CLI
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase().then(ok => process.exit(ok ? 0 : 1));
}
