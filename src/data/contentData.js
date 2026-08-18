/* ==========================================================================
   IT HUNT - Centralized Site Content & Static Text Dictionary
   ==========================================================================
   All headings, titles, subheadings, hero copy, badges, course details,
   internship tracks, team bios, student reviews, career job listings,
   and contact info are stored here in one distinct place.
   
   Modifying any text here automatically updates it across the entire project!
   ========================================================================== */

const CONTENT_DATA = {
  // Brand & Company Metadata
  brand: {
    name: "IT HUNT",
    nameHighlight: "HUNT",
    tagline: "Software Solutions & Tech Academy",
    logoImage: "img/logo_ithunt.png",
    establishedYear: "2012",
    metaTitle: "IT HUNT | Software Solutions & Tech Academy",
    metaDescription: "IT HUNT - Enterprise Software Solutions & IT Training Center in Holagarh Prayagraj. 3 & 6-month production internships in MERN Stack, iOS, Android, AI, and Digital Marketing."
  },

  // SuperAdmin & Login Governance Architecture
  "adminAuth": {
    "defaultUsername": "admin@ithunt.com",
    "defaultPassword": "admin@ithunt2026",
    "superAdminName": "Mr. Lakshman Singh Chauhan",
    "role": "Director & Chief Administrator",
    "avatar": "img/ithunt.jpg",
    "institute": "IT HUNT Software Solutions & Tech Academy"
  },
  "loginUI": {
    "badge": "🔐 SECURE SUPERADMIN GATEWAY",
    "titlePrefix": "Administrator ",
    "titleGradient": "Portal Login",
    "subtitle": "Authorized access for IT HUNT Directorate, Faculty Leads, and Academic Registry staff.",
    "usernameLabel": "Admin Email or Username",
    "usernamePlaceholder": "admin@ithunt.com",
    "passwordLabel": "Security Password",
    "passwordPlaceholder": "Enter administrator password",
    "rememberMeLabel": "Keep me authenticated on this workstation",
    "loginBtnText": "Sign In to SuperAdmin Console 🚀",
    "demoAdminCredentialsText": "🔑 Demo Credentials: admin@ithunt.com / admin@ithunt2026",
    "quickFillBtnText": "Auto-Fill SuperAdmin Credentials ⚡",
    "backToHomeBtnText": "← Back to Public Website",
    "securityNotice": "🛡️ 256-Bit Encrypted Session • ISO 9001:2015 Verified Academic Console"
  },
  "superAdminUI": {
    "headerTagline": "DIRECTORATE & CHIEF GOVERNANCE CONSOLE",
    "titlePrefix": "IT HUNT ",
    "titleGradient": "SuperAdmin Dashboard",
    "subtitle": "Real-time overview of candidate admissions, internship allocations, event passes, faculty recruitment, and system controls.",
    "stats": [
      {
        "id": "admissions",
        "title": "Total Admissions",
        "value": "142",
        "sub": "18 New This Week",
        "icon": "🎓",
        "trend": "+14.5%",
        "color": "primary"
      },
      {
        "id": "interns",
        "title": "Active Interns",
        "value": "88",
        "sub": "5 Production Tracks",
        "icon": "🚀",
        "trend": "+22.0%",
        "color": "warning"
      },
      {
        "id": "rsvps",
        "title": "Event RSVPs",
        "value": "340",
        "sub": "Hackathon & AI Summit",
        "icon": "🎟️",
        "trend": "+35.8%",
        "color": "info"
      },
      {
        "id": "jobs",
        "title": "Job Applications",
        "value": "32",
        "sub": "Faculty & Dev Roles",
        "icon": "💼",
        "trend": "+8.2%",
        "color": "secondary"
      },
      {
        "id": "reviews",
        "title": "Avg Rating",
        "value": "4.92 / 5.0",
        "sub": "128 Student Reviews",
        "icon": "⭐",
        "trend": "99.4% CSAT",
        "color": "gold"
      }
    ],
    "tabs": [
      {
        "id": "admissions",
        "label": "🎓 Student Admissions",
        "icon": "🎓"
      },
      {
        "id": "internships",
        "label": "🚀 Internship Tracks",
        "icon": "🚀"
      },
      {
        "id": "events",
        "label": "🎪 Event RSVPs & Passes",
        "icon": "🎪"
      },
      {
        "id": "careers",
        "label": "💼 Faculty & Dev Jobs",
        "icon": "💼"
      },
      {
        "id": "reviews",
        "label": "⭐ Student Reviews",
        "icon": "⭐"
      },
      {
        "id": "settings",
        "label": "⚙️ System Config",
        "icon": "⚙️"
      }
    ]
  },
  "sampleAdmissions": [
    {
      "registrationNo": "ITH-982410",
      "date": "18 Aug 2026",
      "time": "11:30 AM",
      "candidateName": "Rahul Sharma",
      "fatherName": "Suresh Sharma",
      "motherName": "Sunita Sharma",
      "dob": "2002-05-14",
      "gender": "Male",
      "course": "Web Development (MERN Stack & Cloud Architecture)",
      "mobile": "9876543210",
      "email": "rahul.sharma@example.com",
      "district": "PRAYAGRAJ",
      "address": "24/B Civil Lines, Near High Court",
      "status": "Confirmed"
    },
    {
      "registrationNo": "ITH-761234",
      "date": "17 Aug 2026",
      "time": "04:15 PM",
      "candidateName": "Priya Srivastava",
      "fatherName": "Vikas Srivastava",
      "motherName": "Anita Srivastava",
      "dob": "2003-09-22",
      "gender": "Female",
      "course": "iOS Native App Development (Swift & SwiftUI)",
      "mobile": "9123456789",
      "email": "priya.srivastava@example.com",
      "district": "PRAYAGRAJ",
      "address": "Plot 42, Teliyarganj, Prayagraj",
      "status": "Confirmed"
    },
    {
      "registrationNo": "ITH-542190",
      "date": "16 Aug 2026",
      "time": "02:00 PM",
      "candidateName": "Amitabh Verma",
      "fatherName": "Dinesh Verma",
      "motherName": "Kiran Verma",
      "dob": "2001-11-08",
      "gender": "Male",
      "course": "Android App Engineering (Kotlin & Jetpack Compose)",
      "mobile": "9834512789",
      "email": "amitabh.verma@example.com",
      "district": "PRATAPGARH",
      "address": "Near Railway Station, Pratapgarh",
      "status": "Verified"
    },
    {
      "registrationNo": "ITH-432890",
      "date": "15 Aug 2026",
      "time": "10:45 AM",
      "candidateName": "Ananya Gupta",
      "fatherName": "Rajesh Gupta",
      "motherName": "Meena Gupta",
      "dob": "2004-01-30",
      "gender": "Female",
      "course": "Python Programming, Generative AI & Data Analytics",
      "mobile": "9988776655",
      "email": "ananya.gupta@example.com",
      "district": "PRAYAGRAJ",
      "address": "Dahiyawa Holagarh, Prayagraj",
      "status": "Pending Verification"
    },
    {
      "registrationNo": "ITH-312987",
      "date": "14 Aug 2026",
      "time": "03:20 PM",
      "candidateName": "Mohd. Farhan",
      "fatherName": "Abdul Rashid",
      "motherName": "Fatima Begum",
      "dob": "2002-07-19",
      "gender": "Male",
      "course": "Full-Funnel Digital Marketing & Growth Hacking",
      "mobile": "9765432109",
      "email": "farhan.mohd@example.com",
      "district": "KAUSHAMBI",
      "address": "Main Bazaar, Sirathu, Kaushambi",
      "status": "Confirmed"
    }
  ],
  "sampleJobApplications": [
    {
      "id": "JOB-90123",
      "date": "18 Aug 2026",
      "name": "Er. Deepak Jaiswal",
      "email": "deepak.mern@example.com",
      "phone": "9876501234",
      "position": "Senior MERN Stack Developer & Technical Trainer",
      "experience": "5.5 Years",
      "portfolio": "https://github.com/deepak-mern-dev",
      "currentCompany": "Infotech Solutions Pvt Ltd",
      "status": "Shortlisted for Interview"
    },
    {
      "id": "JOB-84512",
      "date": "17 Aug 2026",
      "name": "Dr. Saurabh Pandey",
      "email": "saurabh.ai@example.com",
      "phone": "9812345670",
      "position": "Senior Python, Generative AI & Machine Learning Faculty",
      "experience": "6 Years",
      "portfolio": "https://huggingface.co/saurabh-ai",
      "currentCompany": "Apex Tech Institute",
      "status": "Reviewing Profile"
    },
    {
      "id": "JOB-72901",
      "date": "16 Aug 2026",
      "name": "Vipin Kumar Maurya",
      "email": "vipin.ios@example.com",
      "phone": "9923456781",
      "position": "Senior iOS Mobile Application Instructor & Swift Mentor",
      "experience": "4.5 Years",
      "portfolio": "https://apps.apple.com/developer/vipin-maurya",
      "currentCompany": "Mobility Labs India",
      "status": "Interview Scheduled"
    }
  ],
  "sampleRsvps": [
    {
      "id": "EVT-882190",
      "date": "18 Aug 2026",
      "name": "Kavita Singh",
      "email": "kavita.s@example.com",
      "phone": "9845123980",
      "eventTitle": "24-Hour Annual Campus Hackathon 2026",
      "college": "United College of Engineering & Research",
      "status": "VIP Entry Pass Confirmed"
    },
    {
      "id": "EVT-719283",
      "date": "17 Aug 2026",
      "name": "Alok Kumar Bind",
      "email": "alok.bind@example.com",
      "phone": "9734561280",
      "eventTitle": "Generative AI & LLM Engineering Masterclass",
      "college": "Shambhunath Institute of Engineering & Technology",
      "status": "VIP Entry Pass Confirmed"
    }
  ],

  // Header Navigation Items
  navigation: [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "internships", label: "IT Internships", icon: "🚀" },
    { id: "events", label: "Events & Gallery", icon: "🎪" },
    { id: "courses", label: "Courses", icon: "📚" }
  ],

  // Hero Section Copy
  hero: {
    badgeText: "🚀 IT SOLUTIONS & SOFTWARE DEVELOPMENT ACADEMY 2026",
    titlePrefix: "Architecting Next-Gen ",
    titleGradient: "Software & AI Solutions",
    subtitle: "IT HUNT is a premier software development studio & technology academy in Prayagraj. We build production-ready software solutions while empowering engineers with 3-Month & 6-Month hands-on internships in MERN Stack, iOS, Android, and Digital Marketing.",
    primaryCtaText: "Explore IT Internships 🚀",
    secondaryCtaText: "Start Application 2026 📝",
    highlights: [
      "✓ 3 & 6 Months Production Internships",
      "✓ Live Enterprise Client Projects",
      "✓ Verified Certificate + LOR",
      "✓ 100% Career Placement Support"
    ],
    floatingBadgeTitle: "Live Software Production",
    floatingBadgeSubtitle: "MERN • iOS • Android • AI Center",
    codeSnippetHeader: "App.jsx — IT HUNT MERN & AI Engine",
    codeSnippetLines: [
      "import { useState, useEffect } from 'react';",
      "import { ITHuntSoftwareVenture } from '@ithunt/core';",
      "",
      "export default function SoftwareStudio() {",
      "  const [internshipTrack, setTrack] = useState('MERN Stack');",
      "  const [experienceLevel, setExperience] = useState('4+ Yrs Faculty');",
      "  return <ITHuntSoftwareVenture status='ACTIVE' mode='PRODUCTION' />;",
      "}"
    ]
  },

  // Key Statistics & Metrics
  stats: [
    { number: "5,000+", label: "Engineers & Interns Trained", isGradientPrimary: true },
    { number: "4.9 ★", label: "Facility & Quality Review", isGradientSecondary: true },
    { number: "100%", label: "Live Client Projects", isGradientPrimary: true },
    { number: "4+ Yrs", label: "Senior Tech Instructors", isGradientSecondary: true }
  ],

  // Software Company Services & Internship Venture
  internshipVenture: {
    tagline: "SOFTWARE SOLUTIONS & INTERNSHIP VENTURE 2026",
    titlePrefix: "Production-Grade ",
    titleGradient: "IT Solutions & Training",
    description: "Work directly on real-world client software, enterprise APIs, mobile apps, and growth campaigns alongside senior developers.",
    spotlightBadge: "ENTERPRISE SOFTWARE VENTURE 2026",
    spotlightTitlePrefix: "IT Solutions ",
    spotlightTitleGradient: "Internship Program",
    spotlightDesc: "Step out of theory and step into production-level development. Build scalable web applications, native iOS apps, Android software, and data-driven marketing campaigns under senior tech mentors.",
    tracks: [
      {
        id: 1,
        icon: "⚛️",
        shortName: "MERN Stack",
        title: "Web Development (MERN Stack & Cloud Architecture)",
        duration: "3 Months / 6 Months",
        badge: "🔥 Highest Industry Demand 2026",
        description: "Production-ready full stack engineering with MongoDB, Express.js, React.js, and Node.js. Build scalable SaaS APIs, microservices, and reactive front-ends.",
        techDetails: "Modern full-stack engineering is the cornerstone of enterprise software development. In this track, you transition from basic coding to architecting scalable, distributed web applications. You will master client-side SPA state management, asynchronous REST/GraphQL microservices, NoSQL database indexing, JWT security, and automated cloud deployments with Docker and CI/CD pipelines.",
        earningPotential: {
          fresher: "₹4.5 LPA – ₹7.5 LPA",
          experienced: "₹8.5 LPA – ₹18.0+ LPA",
          freelance: "₹40,000 – ₹1,20,000 / month",
          overview: "MERN Stack developers command top packages across product startups and MNCs due to immense demand for single-language full-stack agility."
        },
        jobPlacementRate: {
          percentage: 95,
          demandLevel: "Extremely High (60,000+ Active Roles in 2026)",
          targetRoles: ["Full Stack Developer", "Frontend React Specialist", "Node.js Backend Engineer", "MERN Solution Architect"]
        },
        learningHours: {
          totalHours: "180+ Total Hours",
          weeklyHours: "12 - 15 Hours / Week",
          liveLabHours: "120+ Hours Production Coding",
          schedule: "Daily 2 Hours Interactive Sessions + Guided Lab Workstations"
        },
        technologiesLearned: [
          { category: "Frontend", items: ["React.js 19", "JavaScript (ES6+)", "TypeScript", "HTML5 & CSS3", "Tailwind CSS", "Redux Toolkit / Zustand"] },
          { category: "Backend & APIs", items: ["Node.js", "Express.js", "RESTful Architecture", "GraphQL", "JWT Auth", "WebSocket / Socket.io"] },
          { category: "Database & Cloud", items: ["MongoDB Atlas", "Mongoose ORM", "Redis Caching", "AWS S3 / Cloudinary", "Vercel / Render Deployments"] },
          { category: "Tools & DevOps", items: ["Git & GitHub", "Postman API Suite", "Docker Fundamentals", "VS Code Pro", "CI/CD Actions"] }
        ],
        liveProjects: [
          { name: "Enterprise SaaS CRM & Billing Portal", desc: "Multi-tenant authentication, automated invoicing, analytics dashboards, and Stripe/Razorpay payment integration." },
          { name: "Real-Time Collaborative Workspace", desc: "Live chat, WebSockets document sync, role-based access control, and notification microservices." },
          { name: "E-Commerce Marketplace with Admin Dashboard", desc: "Product catalog, cart state, inventory management, order tracking, and dynamic filtering." }
        ],
        curriculumHighlights: [
          "Module 1: Advanced JavaScript Engine, Async Architecture & ESNext",
          "Module 2: React 19 Component Architecture, Hooks, State & Routing",
          "Module 3: Server-side Engineering with Node.js, Express & Security",
          "Module 4: MongoDB Schema Design, Aggregation Pipelines & Indexing",
          "Module 5: End-to-End Live Client Production Project & Cloud Deployment"
        ],
        stack: ["MongoDB", "Express", "React.js", "Node.js", "REST APIs", "Redux / Zustand", "TypeScript", "Docker"]
      },
      {
        id: 2,
        icon: '<svg viewBox="0 0 384 512" width="30" height="30" fill="currentColor" style="display:inline-block;vertical-align:middle;"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>',
        shortName: "iOS Development",
        title: "iOS Native App Development (Swift & SwiftUI)",
        duration: "3 Months / 6 Months",
        badge: "💎 Premium Salary Track",
        description: "Native iOS application engineering with Swift and SwiftUI. Learn Xcode, App Store guidelines, REST APIs integration, CoreData, and Apple UI design.",
        techDetails: "Apple's iOS ecosystem represents the highest paying mobile engineering market globally. You will learn modern declarative UI development with SwiftUI, state-driven architecture with Combine, local persistence using CoreData & SwiftData, push notifications, and end-to-end publishing pipelines for the Apple App Store under strict human interface guidelines.",
        earningPotential: {
          fresher: "₹5.0 LPA – ₹8.5 LPA",
          experienced: "₹10.0 LPA – ₹22.0+ LPA",
          freelance: "₹50,000 – ₹1,50,000 / month",
          overview: "iOS developers enjoy premium compensation due to talent scarcity and enterprise focus on high-spending iOS users."
        },
        jobPlacementRate: {
          percentage: 93,
          demandLevel: "Very High (Global & Remote Opportunities)",
          targetRoles: ["iOS Developer", "Swift / SwiftUI Engineer", "Mobile App Specialist", "iOS Product Architect"]
        },
        learningHours: {
          totalHours: "160+ Total Hours",
          weeklyHours: "12 - 14 Hours / Week",
          liveLabHours: "110+ Hours Mac Lab Coding",
          schedule: "Daily 2 Hours Instructor-Led Lab on High-Performance Apple Workstations"
        },
        technologiesLearned: [
          { category: "Core Languages", items: ["Swift 5.10", "SwiftUI", "UIKit Interop", "Objective-C Basics"] },
          { category: "Architecture & Frameworks", items: ["MVVM-C", "Combine Framework", "Async/Await Concurrency", "CoreData & SwiftData", "CoreAnimation"] },
          { category: "Integrations & APIs", items: ["URLSession & REST APIs", "Apple Push Notifications (APNs)", "Apple Pay Integration", "MapKit & CoreLocation"] },
          { category: "Tooling & Deployment", items: ["Xcode IDE & Instruments", "TestFlight Beta Testing", "App Store Connect Submission", "Git & GitHub", "CocoaPods & SPM"] }
        ],
        liveProjects: [
          { name: "Live Audio/Video Streaming & Media App", desc: "Custom AVKit player, offline download caching, pip playback, and dynamic UI animations." },
          { name: "Smart Fitness & Health Tracker", desc: "HealthKit metrics synchronization, step tracking, custom charts, and CoreData persistence." },
          { name: "On-Demand Delivery & Geolocation App", desc: "Live GPS driver tracking, CoreLocation geofencing, real-time status updates, and Apple Pay." }
        ],
        curriculumHighlights: [
          "Module 1: Swift Syntax, Generics, Protocols & Memory Management (ARC)",
          "Module 2: SwiftUI Layouts, Modifiers, Custom Views & Animation",
          "Module 3: Networking with Async/Await, JSON Parsing & API Layer",
          "Module 4: CoreData / SwiftData, Offline Sync & State Management",
          "Module 5: App Store Submission Guidelines, TestFlight & Production Release"
        ],
        stack: ["Swift 5", "SwiftUI", "Xcode", "CoreData", "Combine", "SwiftData", "REST APIs", "TestFlight"]
      },
      {
        id: 3,
        icon: '<svg viewBox="0 0 576 512" width="32" height="32" fill="currentColor" style="display:inline-block;vertical-align:middle;"><path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.9-83a10,10,0,1,0-17.27-10l-48.5,83.86C370.05,130.67,321.49,118.4,288,118.4s-82,12.27-123.28,29.91L116.22,64.45a10,10,0,0,0-17.27,10l47.9,83C66.19,197.68,10,277.28,0,375.47H576C566,277.28,509.81,197.68,429.15,157.45Z"/></svg>',
        shortName: "Android Development",
        title: "Android Native App Development (Kotlin & Jetpack Compose)",
        duration: "3 Months / 6 Months",
        badge: "🌐 Largest Global Market Reach",
        description: "Build high-performance native Android applications using Kotlin and Jetpack Compose. Learn MVVM architecture, Room database, and Google Play deployment.",
        techDetails: "Android powers over 70% of smartphones globally. This internship trains you in Kotlin and Jetpack Compose — Google's modern declarative UI toolkit. You will implement industry-standard Clean MVVM architecture, Room SQLite persistence, dependency injection with Hilt/Dagger, WorkManager background processing, and Google Play Console release management.",
        earningPotential: {
          fresher: "₹4.5 LPA – ₹7.2 LPA",
          experienced: "₹8.0 LPA – ₹17.0+ LPA",
          freelance: "₹40,000 – ₹1,10,000 / month",
          overview: "Massive hiring from fintech, e-commerce, and logistics enterprises seeking robust native Android engineering."
        },
        jobPlacementRate: {
          percentage: 94,
          demandLevel: "Extremely High (55,000+ Active Openings)",
          targetRoles: ["Android Developer", "Kotlin App Engineer", "Mobile Software Engineer", "Android SDK Specialist"]
        },
        learningHours: {
          totalHours: "170+ Total Hours",
          weeklyHours: "12 - 15 Hours / Week",
          liveLabHours: "115+ Hours Android Studio Lab",
          schedule: "Daily 2 Hours Interactive Hands-on Labs & Simulator Testing"
        },
        technologiesLearned: [
          { category: "Language & UI", items: ["Kotlin 2.0", "Jetpack Compose", "Material 3 Design", "Kotlin Coroutines & Flow"] },
          { category: "Architecture & Storage", items: ["Clean MVVM Architecture", "Android Jetpack Components", "Room DB (SQLite)", "DataStore Preferences"] },
          { category: "Networking & Background", items: ["Retrofit 2 & OkHttp", "REST API & JSON", "WorkManager", "Firebase Cloud Messaging (FCM)"] },
          { category: "Tools & Testing", items: ["Android Studio", "Hilt / Koin DI", "Google Play Console", "Git / GitHub", "JUnit & Espresso"] }
        ],
        liveProjects: [
          { name: "Fintech Wallet & QR Payment App", desc: "Biometric authentication, encrypted local database, instant transaction history, and QR scanning." },
          { name: "Ride-Booking & Navigation App", desc: "Google Maps SDK integration, live vehicle location tracking, route calculation, and background push alerts." },
          { name: "News & Audio Podcast Hub", desc: "Compose declarative UI, offline caching with Room, foreground audio service, and Material You theming." }
        ],
        curriculumHighlights: [
          "Module 1: Kotlin Object-Oriented, Functional Paradigms & Coroutines",
          "Module 2: Modern UI with Jetpack Compose, State Hoisting & Animations",
          "Module 3: Architecture with ViewModel, LiveData/StateFlow & Repository Pattern",
          "Module 4: REST API Integration with Retrofit & Room Offline Caching",
          "Module 5: Google Play Store Release, App Bundles & Production Optimization"
        ],
        stack: ["Kotlin", "Jetpack Compose", "Android Studio", "Retrofit", "MVVM", "Room DB", "Coroutines", "Firebase"]
      },
      {
        id: 4,
        icon: "📈",
        shortName: "Digital Marketing",
        title: "Digital Marketing, SEO & Growth Hacking",
        duration: "3 Months / 6 Months",
        badge: "🚀 Rapid Career Launch",
        description: "Master data-driven marketing, Search Engine Optimization (SEO), Pay-Per-Click (PPC) campaigns, Meta Ads, social media strategy, and conversion optimization.",
        techDetails: "In today's digital economy, product success hinges on growth marketing and customer acquisition. This track covers Technical SEO, Google Search Console, Google Ads (Search, Display, Performance Max), Meta Ads Manager (Facebook & Instagram), programmatic email workflows, Google Analytics 4 (GA4) attribution models, and AI-powered copywriting/conversion optimization.",
        earningPotential: {
          fresher: "₹3.5 LPA – ₹6.0 LPA",
          experienced: "₹7.0 LPA – ₹14.0+ LPA",
          freelance: "₹35,000 – ₹1,00,000+ / month",
          overview: "High demand from businesses across Prayagraj, tier-1 cities, and remote agencies looking for measurable ROI and lead generation."
        },
        jobPlacementRate: {
          percentage: 92,
          demandLevel: "Very High (Universal Need Across All Industries)",
          targetRoles: ["Digital Marketing Executive", "SEO Specialist", "Performance Marketing Manager", "Growth Hacker"]
        },
        learningHours: {
          totalHours: "140+ Total Hours",
          weeklyHours: "10 - 12 Hours / Week",
          liveLabHours: "90+ Hours Live Campaign Execution",
          schedule: "Daily 1.5 - 2 Hours Strategy Labs with Real Ad Budget Experiments"
        },
        technologiesLearned: [
          { category: "SEO & Search Engine", items: ["Technical SEO", "On-Page / Off-Page SEO", "Google Search Console", "Ahrefs / SEMrush", "Schema Markup"] },
          { category: "Paid Ads & PPC", items: ["Google Ads (Search & Video)", "Meta Ads Manager", "LinkedIn Ads", "Performance Max", "Retargeting Pixels"] },
          { category: "Analytics & Automation", items: ["Google Analytics 4 (GA4)", "Google Tag Manager (GTM)", "HubSpot CRM", "Mailchimp / Zapier", "Looker Studio"] },
          { category: "Creative & AI Marketing", items: ["Canva Pro & Adobe PS", "AI Copywriting (ChatGPT/Claude)", "Conversion Rate Optimization (CRO)", "Copywriting Psychology"] }
        ],
        liveProjects: [
          { name: "Live Client Brand Lead Generation Campaign", desc: "End-to-end Meta & Google ad campaign with real budget, custom landing page, and A/B testing." },
          { name: "E-Commerce Technical SEO & Organic Traffic Boost", desc: "Keyword research strategy, link building outreach, technical audit, and 300%+ search ranking growth." },
          { name: "Multi-Channel Omni-Presence Marketing Funnel", desc: "Automated email sequences, social media calendar execution, lead magnet funnels, and GA4 tracking." }
        ],
        curriculumHighlights: [
          "Module 1: Search Engine Architecture, In-Depth Keyword Research & Technical SEO",
          "Module 2: Google Search & Display Ads, Bidding Strategies & Budget Scaling",
          "Module 3: Meta Ads Manager, Audience Targeting & High-Converting Creatives",
          "Module 4: GA4 Analytics, Conversion Funnels, GTM & Attribution Modeling",
          "Module 5: Live Client Portfolio, Case Studies & Freelance Client Acquisition"
        ],
        stack: ["SEO Strategy", "Google Ads PPC", "Meta Ads", "GA4 Analytics", "GTM", "SEMrush", "Email Marketing", "Canva Pro"]
      },
      {
        id: 5,
        icon: "🐍",
        shortName: "Python & AI",
        title: "Python, FastAPI & Applied Generative AI Engineering",
        duration: "3 Months / 6 Months",
        badge: "🤖 Next-Gen High Demand",
        description: "Architect intelligent applications with Python, FastAPI, LangChain, LLM APIs, and vector databases. Master data analysis, automated pipelines, and AI agent deployment.",
        techDetails: "Applied AI is reshaping global tech development. This track trains you in advanced Python programming, asynchronous FastAPI backends, vector search with Pinecone/ChromaDB, RAG (Retrieval-Augmented Generation) pipelines, and deploying custom AI agents and automation bots with Docker and cloud microservices.",
        earningPotential: {
          fresher: "₹5.0 LPA – ₹8.5 LPA",
          experienced: "₹9.5 LPA – ₹20.0+ LPA",
          freelance: "₹45,000 – ₹1,30,000 / month",
          overview: "AI engineers and Python backend specialists are experiencing unprecedented demand with the highest package growth across IT sectors."
        },
        jobPlacementRate: {
          percentage: 96,
          demandLevel: "Exponential Growth (Worldwide AI Transformation)",
          targetRoles: ["Python Developer", "AI / ML Engineer", "FastAPI Backend Developer", "Data & Automation Engineer"]
        },
        learningHours: {
          totalHours: "175+ Total Hours",
          weeklyHours: "12 - 15 Hours / Week",
          liveLabHours: "120+ Hours Hands-On AI Coding",
          schedule: "Daily 2 Hours Interactive Sessions with Cloud GPU Access"
        },
        technologiesLearned: [
          { category: "Python & Core Backend", items: ["Python 3.12 (Advanced)", "FastAPI", "AsyncIO", "SQLAlchemy", "Pydantic"] },
          { category: "AI & LLM Tooling", items: ["OpenAI / Claude APIs", "LangChain & LlamaIndex", "HuggingFace", "Vector DBs (Chroma/Pinecone)", "RAG Systems"] },
          { category: "Data & Processing", items: ["Pandas & NumPy", "Matplotlib / Seaborn", "Scikit-Learn Basics", "Data Cleaning Pipelines"] },
          { category: "Cloud & Deployment", items: ["Docker Containers", "PostgreSQL & Redis", "Git & GitHub", "Cloud Deployment (AWS/Vercel)"] }
        ],
        liveProjects: [
          { name: "Enterprise RAG AI Knowledge Assistant", desc: "Multi-document PDF querying system with semantic vector search, custom chat memory, and streaming responses." },
          { name: "Autonomous AI Agent & Lead Extractor", desc: "Multi-agent workflow automating web scraping, data enrichment, sentiment analysis, and email drafting." },
          { name: "High-Throughput Analytics & Prediction API", desc: "FastAPI microservice handling real-time data ingestion, background tasks, and model inference." }
        ],
        curriculumHighlights: [
          "Module 1: Advanced Python, OOP, Asynchronous Programming & Data Structures",
          "Module 2: RESTful Microservices & High-Speed APIs with FastAPI & PostgreSQL",
          "Module 3: Data Science Fundamentals, Vector Embeddings & Similarity Search",
          "Module 4: Generative AI, Prompt Engineering, LangChain & RAG Architectures",
          "Module 5: End-to-End AI Agent Deployment, Cloud APIs & Production Scaling"
        ],
        stack: ["Python", "FastAPI", "LangChain", "OpenAI APIs", "Vector DB", "PostgreSQL", "Docker", "RAG"]
      }
    ],
    features: [
      {
        icon: "🏢",
        title: "Live Corporate Repositories",
        desc: "Work on genuine production codebases, Git branches, and pull request reviews matching Fortune 500 standards."
      },
      {
        icon: "👨‍💻",
        title: "1-on-1 Senior Mentorship",
        desc: "Daily personalized debugging, code reviews, and architectural guidance from experienced MCA tech leads."
      },
      {
        icon: "📜",
        title: "Corporate Certification & LOR",
        desc: "Receive official Letter of Recommendation (LOR) and verifiable ISO-accredited completion certificate."
      },
      {
        icon: "💼",
        title: "Guaranteed Placement Support",
        desc: "100% interview scheduling, resume masterclasses, mock HR/tech rounds, and direct hiring partner referrals."
      }
    ],
    roadmap: [
      { phase: "01", period: "Month 1", title: "Foundation & Core Architecture", desc: "Master language syntax, OOP design patterns, modern frameworks, and local development environments." },
      { phase: "02", period: "Month 2", title: "Advanced Full-Stack / Native APIs", desc: "Integrate complex backend databases, state management, asynchronous REST/GraphQL APIs, and UI animations." },
      { phase: "03", period: "Month 3", title: "Live Client Production Projects", desc: "Develop and deploy 3 production-grade applications with cloud database hosting and automated CI/CD pipelines." },
      { phase: "04", period: "Month 4-6", title: "Placement Drives & Mock Interviews", desc: "Technical interview prep, algorithmic problem solving, LinkedIn portfolio optimization, and recruitment referrals." }
    ]
  },

  // Accredited Computer Courses & Diplomas Section
  coursesSection: {
    tagline: "ACCREDITED TECH CURRICULUMS",
    titlePrefix: "Recognized ",
    titleGradient: "Diplomas & Degree Programs",
    description: "Government recognized computer education combined with practical lab training.",
    coursesList: [
      {
        id: 1,
        code: "O Level",
        title: 'NIELIT "O" Level Diploma',
        category: "nielit",
        categoryName: "NIELIT Accredited",
        duration: "1 Year (2 Semesters)",
        certification: "Govt. of India Recognized",
        image: "img/O level.png",
        description: "Foundation diploma equivalent to PGDCA. Covers IT Tools, Web Designing, Python Programming, and Internet of Things (IoT).",
        topics: ["IT Fundamentals", "HTML5 & CSS3", "Python Scripting", "IoT Sensors"]
      },
      {
        id: 2,
        code: "A Level",
        title: 'NIELIT "A" Level Diploma',
        category: "nielit",
        categoryName: "NIELIT Accredited",
        duration: "1 Year (2 Semesters)",
        certification: "Advance Graduate Diploma",
        image: "img/A level.png",
        description: "Advanced IT engineering diploma covering Data Structures, Computer Networks, Database Management, and Software Engineering.",
        topics: ["Data Structures C++", "DBMS & SQL", "Computer Networks", "Software Eng"]
      },
      {
        id: 3,
        code: "Subharti Degree",
        title: "Subharti University Degree Courses (BCA / MCA)",
        category: "university",
        categoryName: "UGC / AICTE Approved",
        duration: "1 - 3 Years",
        certification: "Regular / Distance Degree",
        image: "img/shubharati.png",
        description: "Comprehensive degree courses in computer applications run via Distance Education approved by UGC, AICTE, and DEC joint committee.",
        topics: ["Computer Architecture", "Object Oriented Programming", "Operating Systems"]
      }
    ]
  },

  // About Company Section
  about: {
    tagline: "ABOUT OUR SOFTWARE STUDIO & SOCIETY",
    titlePrefix: "Building High-Tech Solutions in ",
    titleGradient: "Prayagraj & India",
    description: "IT HUNT in Holagarh, Prayagraj is a top-tier Computer Technology & IT Solution Training Institute. Established with a vision to make digital literacy and modern software skills accessible to all, we specialize in rapidly evolving fields like MERN Stack, iOS/Android Development, Cyber Security, and Financial Accounting.",
    mainImage: "img/ithunt1.jpg",
    subImage: "img/desktop.jpg",
    features: [
      "✓ NIELIT Accredited Center",
      "✓ Subharti Univ Partner",
      "✓ IT Solution Center",
      "✓ 4+ Yrs Exp Faculty",
      "✓ Modern Workstations",
      "✓ Career Counseling"
    ]
  },

  // Director & Co-Founder Spotlight Section
  director: {
    tagline: "FOUNDER & DIRECTOR'S SPOTLIGHT",
    name: "Mr. Lakshman Singh Chauhan",
    title: "Director & Founder, IT HUNT | MCA (Computer Science)",
    image: "img/ithunt.jpg",
    message: "Our mission is to empower every candidate with market-ready IT skills. With our new IT Solutions Internship Center and experienced senior faculty (min 14+ years experience), we deliver unparalleled quality and hands-on production experience.",
    skills: ["Public Speaking Expert", "Motivational Speaker", "Life Coach", "Spoken English Mentor"]
  },
  coFounder: {
    tagline: "CO-FOUNDER'S SPOTLIGHT",
    name: "Anup Mishra",
    title: "Co-Founder & Lead Software Architect",
    image: "img/anoop.png",
    message: "We are committed to building production-grade software engineers and delivering state-of-the-art tech solutions, high-performance web platforms, and hands-on production engineering mentorship.",
    skills: ["Full Stack Architecture", "Vue.js / React", "Node.js / Java", "Python", "Cloud Systems"]
  },

  // Team & Faculty Section
  teamSection: {
    tagline: "EXPERT TECH LEADERSHIP",
    titlePrefix: "Meet Our Senior ",
    titleGradient: "Instructors & Tech Mentors",
    description: "Dedicated tech leaders with minimum 14+ years industry and teaching experience.",
    members: [
      {
        id: 1,
        name: "Mr. Lakshman Singh Chauhan",
        role: "Director & Founder (14+ Yrs Experience)",
        bio: "Public speaking expert, motivational speaker, and life coach with MCA degree. Lead mentor with 14+ years experience in computer science & executive management.",
        image: "img/ithunt.jpg",
        skills: ["O/A Level", "MCA", "Public Speaking", "Life Coaching", "C/C++"]
      },
      {
        id: 2,
        name: "Anup Mishra",
        role: "Co-Founder & Senior Software Architect (4+ Yrs Exp)",
        bio: "Co-Founder & Lead Full Stack Developer specializing in modern Java, Python, Web Engineering, Vue.js, and enterprise software solutions.",
        image: "img/anoop.png",
        skills: ["Java", "Python", "C/C++", "Vue.js", "Full Stack"]
      },
      {
        id: 3,
        name: "Vikash Srivastav",
        role: "Institute Manager & Tally Specialist (4+ Yrs Exp)",
        bio: "Accounting specialist with expertise in Tally ERP 9, financial inventory management, HTML/CSS, and campus management.",
        image: "img/vikash.png",
        skills: ["Tally ERP 9", "CA Accounting", "HTML", "CSS", "JavaScript"]
      },
      {
        id: 4,
        name: "Achal Singh Chauhan",
        role: "Ethical Hacking & Cyber Security Mentor (4+ Yrs Exp)",
        bio: "Cyber security specialist, hackathon winner, and instructor for Java, C++, and penetration testing tracks.",
        image: "img/hacker.png",
        skills: ["Ethical Hacking", "Cyber Security", "Python", "Java", "Hackathons"]
      }
    ]
  },

  // Student & Client Reviews Section
  reviewsSection: {
    tagline: "QUALITY & FACILITY EVALUATION",
    titlePrefix: "Student & Client ",
    titleGradient: "Reviews & Feedback",
    description: "We continuously evaluate our institute facilities and curriculum to drive software development quality.",
    overallScore: "4.9",
    overallStars: "★★★★★",
    totalCountLabel: "Based on 250+ Verified Reviews",
    facilityMetrics: [
      { name: "Computer Labs & Workstations", score: 4.9 },
      { name: "Faculty Expertise & Mentorship", score: 5.0 },
      { name: "Internship LOR & Placement Support", score: 4.9 },
      { name: "Curriculum & Ease of Development", score: 4.8 }
    ],
    reviewsList: [
      {
        id: 1,
        name: "Anup Mishra (Co-Founder)",
        role: "Co-Founder & Senior Software Architect",
        rating: 5,
        date: "Aug 2026",
        avatar: "img/anoop.png",
        comment: "The 6-month MERN Stack internship transformed my practical coding skills! The mentors have 4+ years of real industry experience and guided us on live client projects."
      },
      {
        id: 2,
        name: "Priya Mishra",
        role: "NIELIT O Level Student",
        rating: 5,
        date: "Jul 2026",
        avatar: "img/vikash.png",
        comment: "Exceptional facilities and lab infrastructure in Holagarh Prayagraj! Teachers make complex Python and Web topics very easy to learn."
      },
      {
        id: 3,
        name: "Amit Kumar Srivastav",
        role: "iOS App Development Intern",
        rating: 5,
        date: "Jun 2026",
        avatar: "img/vikash.png",
        comment: "Great experience learning Swift & SwiftUI! The lab workstations and ease of development support helped me build 2 production apps on App Store."
      }
    ]
  },

  // Careers & Hiring Section
  careersSection: {
  "tagline": "JOIN OUR ELITE ACADEMIC & ENGINEERING TEAM",
  "titlePrefix": "Careers: ",
  "titleGradient": "Teachers & Developers Wanted",
  "description": "IT HUNT is expanding! We are hiring passionate technical educators, senior developers, and academic mentors to lead our production software studio and technology training academy in Prayagraj.",
  "mandatoryPolicyNotice": "⚠️ MANDATORY REQUIREMENT: Minimum 4+ Years Experience Required for Senior & Lead Roles",
  "filterCategories": [
    {
      "id": "all",
      "label": "🌟 All Vacancies",
      "icon": "🌟"
    },
    {
      "id": "teaching",
      "label": "🎓 Teaching & Faculty (Mentors)",
      "icon": "🎓"
    },
    {
      "id": "developer",
      "label": "💻 Software Developers (Web & Mobile)",
      "icon": "💻"
    },
    {
      "id": "operations",
      "label": "⚙️ Lab & Academic Operations",
      "icon": "⚙️"
    }
  ],
  "benefits": [
    {
      "icon": "💰",
      "title": "Top-Tier Compensation",
      "desc": "Industry-competitive salaries with performance bonuses and annual appraisal reviews."
    },
    {
      "icon": "💻",
      "title": "High-Tech Studio Labs",
      "desc": "Dedicated Apple Mac / PC workstations with fiber internet and licensed dev tools."
    },
    {
      "icon": "🚀",
      "title": "Live Client Exposure",
      "desc": "Work on actual enterprise client projects alongside training aspiring engineers."
    },
    {
      "icon": "🌴",
      "title": "Academic Work-Life Balance",
      "desc": "Structured working hours, festival holidays, and a supportive collaborative culture."
    }
  ],
  "jobOpenings": [
    {
      "id": 1,
      "category": "teaching",
      "categoryBadge": "🎓 Teaching Faculty",
      "shortTitle": "MERN Lead Trainer",
      "title": "Senior MERN Stack Developer & Technical Trainer",
      "type": "Full-Time / Part-Time",
      "experience": "Min 4+ Years Experience",
      "location": "Prayagraj Campus / Hybrid",
      "salary": "₹6.5L - ₹10.0L P.A.",
      "description": "Lead our flagship MERN Stack internship track, mentor students through live web applications, conduct sprint code reviews, and teach modern React/Node architecture.",
      "teachingPoints": [
        "Deliver interactive daily lectures and hands-on live coding sessions on React 19, Node.js, Express, and MongoDB.",
        "Mentor internship batches in building production-grade SaaS web apps and microservices.",
        "Conduct GitHub Pull Request code reviews and teach clean coding practices and JWT authentication.",
        "Evaluate student capstone projects and guide candidates through technical interview preparation."
      ],
      "skills": [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redux Toolkit",
        "TypeScript",
        "Docker",
        "REST APIs",
        "Git"
      ]
    },
    {
      "id": 2,
      "category": "teaching",
      "categoryBadge": "🎓 Teaching Faculty",
      "shortTitle": "Python & AI Faculty",
      "title": "Senior Python, Generative AI & Machine Learning Faculty",
      "type": "Full-Time",
      "experience": "Min 4+ Years Experience",
      "location": "Prayagraj Campus / Hybrid",
      "salary": "₹7.5L - ₹12.0L P.A.",
      "description": "Train students and engineering interns in Python programming, FastAPI backends, Machine Learning models, and modern Generative AI / LLM workflows.",
      "teachingPoints": [
        "Teach Core & Advanced Python, Object-Oriented Programming, NumPy, Pandas, and data modeling.",
        "Deliver curriculum on Prompt Engineering, LangChain, RAG pipelines, and OpenAI/HuggingFace API integrations.",
        "Guide students in deploying AI models on cloud endpoints using FastAPI and Docker.",
        "Mentor aspiring AI engineers in building real-world AI chatbot and automation projects."
      ],
      "skills": [
        "Python 3.12+",
        "FastAPI",
        "PyTorch / Scikit-Learn",
        "LangChain",
        "OpenAI APIs",
        "PostgreSQL",
        "Docker",
        "RAG"
      ]
    },
    {
      "id": 3,
      "category": "teaching",
      "categoryBadge": "🎓 Teaching Faculty",
      "shortTitle": "iOS Tech Mentor",
      "title": "Senior iOS Mobile Application Instructor & Swift Mentor",
      "type": "Full-Time / Part-Time",
      "experience": "Min 4+ Years Experience",
      "location": "Prayagraj Campus / Remote",
      "salary": "₹7.0L - ₹11.0L P.A.",
      "description": "Guide interns through native iOS app development, Swift 5+, modern SwiftUI framework, Xcode debugging, and Apple App Store submission processes.",
      "teachingPoints": [
        "Teach Swift programming, SwiftUI declarative UI architecture, StateObject, and Combine.",
        "Mentor students on local database integration using CoreData, SwiftData, and REST API consumption.",
        "Instruct on Apple Human Interface Guidelines, TestFlight beta distribution, and App Store publishing.",
        "Review student mobile app code and facilitate portfolio development."
      ],
      "skills": [
        "Swift 5+",
        "SwiftUI",
        "UIKit",
        "Xcode",
        "CoreData / SwiftData",
        "Combine",
        "App Store Connect",
        "REST APIs"
      ]
    },
    {
      "id": 4,
      "category": "teaching",
      "categoryBadge": "🎓 Teaching Faculty",
      "shortTitle": "Android Instructor",
      "title": "Senior Android Developer & Native Kotlin Educator",
      "type": "Full-Time",
      "experience": "Min 4+ Years Experience",
      "location": "Prayagraj Campus / Hybrid",
      "salary": "₹6.5L - ₹9.5L P.A.",
      "description": "Instruct and mentor Android development interns on Kotlin, Jetpack Compose, clean MVVM architecture, Room DB, and Google Play Store deployment.",
      "teachingPoints": [
        "Deliver hands-on instruction in Kotlin syntax, Coroutines, StateFlow, and Jetpack Compose UI.",
        "Teach clean MVVM architectural patterns, Dependency Injection (Hilt), and Room SQLite persistence.",
        "Guide students through Firebase Auth, Google Maps SDK, and Push Notification integration.",
        "Assist interns in publishing production apps to the Google Play Store."
      ],
      "skills": [
        "Kotlin",
        "Jetpack Compose",
        "MVVM",
        "Coroutines",
        "Room Database",
        "Retrofit",
        "Hilt / Koin",
        "Google Play"
      ]
    },
    {
      "id": 5,
      "category": "teaching",
      "categoryBadge": "🎓 Teaching Faculty",
      "shortTitle": "NIELIT Faculty",
      "title": "NIELIT O & A Level Computer Science Faculty",
      "type": "Full-Time",
      "experience": "Min 3+ Years Experience",
      "location": "Prayagraj Campus",
      "salary": "₹4.5L - ₹7.0L P.A.",
      "description": "Teach NIELIT O Level and A Level modules including IT Tools, Web Designing, Python Programming, and Internet of Things (IoT).",
      "teachingPoints": [
        "Conduct classroom and lab sessions covering NIELIT official syllabus (M1-R5 to M4-R5).",
        "Prepare students for online objective exams, theory papers, and practical lab viva.",
        "Instruct fundamentals of Web Designing (HTML5, CSS3, JavaScript) and Python problem solving.",
        "Track student progress, conduct periodic mock exams, and facilitate certification success."
      ],
      "skills": [
        "Python",
        "HTML/CSS/JS",
        "C Programming",
        "IoT & Arduino",
        "DBMS",
        "Computer Networking",
        "MS Office"
      ]
    },
    {
      "id": 6,
      "category": "teaching",
      "categoryBadge": "🎓 Teaching Faculty",
      "shortTitle": "Digital Marketing Mentor",
      "title": "Senior Digital Marketing Lead & Growth Marketing Mentor",
      "type": "Full-Time",
      "experience": "Min 3+ Years Experience",
      "location": "Prayagraj Campus",
      "salary": "₹4.8L - ₹7.5L P.A.",
      "description": "Lead the Digital Marketing internship track, teaching technical SEO, Google Ads PPC campaigns, Meta Ads Manager, and growth hacking strategies.",
      "teachingPoints": [
        "Teach On-Page/Off-Page SEO, Keyword Research, Technical Audits, and Google Search Console.",
        "Mentor students in running live budget Google Search/Display Ads and Meta Ads campaigns.",
        "Instruct on Google Analytics 4 (GA4), conversion tracking, ROI modeling, and email marketing.",
        "Guide interns through live client brand marketing campaigns."
      ],
      "skills": [
        "SEO / SEM",
        "Google Ads (PPC)",
        "Meta Ads Manager",
        "Google Analytics 4",
        "Content Strategy",
        "Canva / Figma"
      ]
    },
    {
      "id": 7,
      "category": "developer",
      "categoryBadge": "💻 Software Developer",
      "shortTitle": "Full-Stack Developer",
      "title": "Senior Full-Stack Web Developer (React.js, Node.js & Cloud)",
      "type": "Full-Time",
      "experience": "Min 4+ Years Experience",
      "location": "Prayagraj Campus / Hybrid",
      "salary": "₹8.0L - ₹13.0L P.A.",
      "description": "Architect and build robust enterprise web applications, customer portals, and high-throughput REST/GraphQL microservices for IT HUNT client software ventures.",
      "teachingPoints": [
        "Design scalable database schemas with PostgreSQL, MongoDB, and Redis caching layers.",
        "Develop responsive, accessible frontends using React 19, Next.js, and TypeScript.",
        "Implement automated CI/CD deployment pipelines on AWS / Docker infrastructure.",
        "Participate in architecture reviews and mentor junior engineering staff."
      ],
      "skills": [
        "React.js / Next.js",
        "Node.js",
        "PostgreSQL / MongoDB",
        "TypeScript",
        "Docker",
        "AWS / Cloud",
        "GraphQL"
      ]
    },
    {
      "id": 8,
      "category": "developer",
      "categoryBadge": "💻 Software Developer",
      "shortTitle": "Mobile Apps Lead",
      "title": "Lead Mobile Applications Developer (iOS & Android)",
      "type": "Full-Time",
      "experience": "Min 4+ Years Experience",
      "location": "Prayagraj Campus / Hybrid",
      "salary": "₹8.5L - ₹13.5L P.A.",
      "description": "Lead mobile app development initiatives for enterprise clients across both Apple iOS and Google Android ecosystems.",
      "teachingPoints": [
        "Architect high-performance native iOS (SwiftUI) and Android (Jetpack Compose) mobile clients.",
        "Integrate biometric auth, offline caching, push notifications, and payment gateways.",
        "Manage end-to-end releases on Apple App Store Connect and Google Play Console.",
        "Ensure 99.9% crash-free sessions and optimized rendering performance."
      ],
      "skills": [
        "SwiftUI / Swift",
        "Kotlin / Compose",
        "Cross-Platform SDKs",
        "REST APIs",
        "App Store & Play Store",
        "Firebase"
      ]
    },
    {
      "id": 9,
      "category": "developer",
      "categoryBadge": "💻 Software Developer",
      "shortTitle": "Backend & Cloud Engineer",
      "title": "Senior Backend & Cloud Infrastructure Engineer",
      "type": "Full-Time",
      "experience": "Min 4+ Years Experience",
      "location": "Prayagraj Campus / Remote",
      "salary": "₹8.0L - ₹12.5L P.A.",
      "description": "Design and maintain high-concurrency backend services, database clusters, containerized deployments, and robust API gateways.",
      "teachingPoints": [
        "Build high-performance microservices in Node.js / Go / FastAPI with asynchronous queues.",
        "Optimize relational and NoSQL database queries, indexes, and sharding strategies.",
        "Maintain secure Linux cloud servers, SSL certificates, Nginx reverse proxies, and Docker swarms.",
        "Enforce security audits, rate limiting, and automated health monitoring."
      ],
      "skills": [
        "Node.js / FastAPI",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Docker & Kubernetes",
        "Nginx",
        "Linux Servers",
        "CI/CD"
      ]
    },
    {
      "id": 10,
      "category": "developer",
      "categoryBadge": "💻 Software Developer",
      "shortTitle": "UI/UX & Frontend Engineer",
      "title": "UI/UX Product Designer & Modern Frontend Specialist",
      "type": "Full-Time",
      "experience": "Min 3+ Years Experience",
      "location": "Prayagraj Campus",
      "salary": "₹5.5L - ₹8.5L P.A.",
      "description": "Create world-class user interfaces, responsive component libraries, Figma prototypes, and micro-animations for educational platforms and enterprise apps.",
      "teachingPoints": [
        "Design intuitive wireframes, mockups, and clickable prototypes in Figma.",
        "Translate designs into clean, responsive HTML5, modern CSS3, and Vue/React components.",
        "Ensure strict WCAG accessibility, fluid typography, and delightful micro-interactions.",
        "Collaborate with developers to ensure 100% pixel-perfect UI fidelity."
      ],
      "skills": [
        "Figma",
        "CSS3 / CSS Animations",
        "Vue.js / React",
        "Tailwind CSS",
        "Wireframing",
        "Prototyping",
        "Design Systems"
      ]
    },
    {
      "id": 11,
      "category": "operations",
      "categoryBadge": "⚙️ Academic Operations",
      "shortTitle": "Lab Systems Administrator",
      "title": "Senior Lab Workstation & High-Speed Network Systems Administrator",
      "type": "Full-Time",
      "experience": "Min 3+ Years Experience",
      "location": "Holagarh Prayagraj Campus",
      "salary": "₹4.0L - ₹6.5L P.A.",
      "description": "Manage campus computer labs, hardware maintenance, optical fiber network routing, software licenses, and server backups for 100+ workstations.",
      "teachingPoints": [
        "Maintain 100+ lab computers (macOS, Windows, Linux) and resolve hardware/OS issues.",
        "Manage high-speed optical fiber routers, Wi-Fi access points, VLANs, and firewall security.",
        "Install and license developer tools (VS Code, Xcode, Android Studio, Node.js, Python).",
        "Maintain daily lab availability and manage automated local backup servers."
      ],
      "skills": [
        "Networking (LAN/VLAN/Routers)",
        "Hardware Troubleshooting",
        "Linux & Windows Admin",
        "Server Maintenance"
      ]
    },
    {
      "id": 12,
      "category": "operations",
      "categoryBadge": "⚙️ Academic Operations",
      "shortTitle": "Career & Admission Counselor",
      "title": "Student Academic Counselor & Career Placement Coordinator",
      "type": "Full-Time",
      "experience": "Min 2+ Years Experience",
      "location": "Holagarh Prayagraj Campus",
      "salary": "₹3.8L - ₹6.0L P.A.",
      "description": "Counsel prospective students and parents, coordinate batch admissions, and liaise with partner software companies for alumni placement drives.",
      "teachingPoints": [
        "Guide students on choosing suitable internship and diploma tracks based on career goals.",
        "Manage admission inquiries, registration verifications, and onboarding schedules.",
        "Coordinate with corporate HR partners to schedule campus placement drives and interviews.",
        "Maintain student satisfaction records, feedback reviews, and alumni networking."
      ],
      "skills": [
        "Student Counseling",
        "Communication & Sales",
        "Placement Coordination",
        "CRM Software",
        "Academic Operations"
      ]
    }
  ]
},

  // Alumni Testimonials & Achievements Section
  testimonialsSection: {
    tagline: "PROVEN ALUMNI SUCCESS STORIES",
    titlePrefix: "Our Alumni ",
    titleGradient: "Experiences & Achievements",
    description: "Discover how engineering students, freshers, and graduates transformed their careers and secured top-tier tech roles with IT HUNT.",
    stats: [
      { label: "Graduated Alumni", value: "500+", icon: "🎓" },
      { label: "Highest Package", value: "₹18.5 LPA", icon: "💰" },
      { label: "Average CTC", value: "₹6.2 LPA", icon: "📈" },
      { label: "Placement Rate", value: "95%", icon: "🎯" }
    ],
    hiringPartners: [
      "Paytm", "TCS", "Infosys", "Wipro", "Zomato", "Tech Mahindra", "Cognizant", "HCL Tech", "Swiggy", "Accenture"
    ],
    alumniList: [
      {
        id: 1,
        name: "Anup Mishra",
        avatar: "img/student-placeholder.svg",
        batch: "Batch of 2024",
        track: "MERN Stack & Cloud Architecture",
        trackCategory: "mern",
        currentRole: "Software Engineer",
        company: "Paytm Payments",
        packageJump: "₹3.5 LPA ➔ ₹11.2 LPA (220% Jump)",
        verified: true,
        rating: 5,
        projectBuilt: "Multi-Tenant SaaS CRM with Razorpay & Socket.io",
        story: "Joining IT HUNT was the turning point in my engineering career. Before this, I only knew theoretical Java from college. At IT HUNT, under Director Mr. Lakshman Singh Chauhan's mentorship, I coded on real Git branches daily, built 3 full-stack MERN production web apps, and mastered Docker and MongoDB aggregation. The mock technical rounds directly helped me clear Paytm's 4-round technical interview!"
      },
      {
        id: 2,
        name: "Neha Upadhyay",
        avatar: "img/student-placeholder.svg",
        batch: "Batch of 2024",
        track: "iOS Native App Development (Swift & SwiftUI)",
        trackCategory: "ios",
        currentRole: "iOS Developer",
        company: "Zomato Tech",
        packageJump: "Fresher ➔ ₹9.8 LPA Direct Offer",
        verified: true,
        rating: 5,
        projectBuilt: "Live AVKit Streaming App & HealthKit Tracker",
        story: "The Apple lab workstations and Xcode hands-on training at Holagarh are unmatched. We didn't just study SwiftUI theory; we published two native apps on TestFlight and the App Store. Learning Combine, CoreData, and Apple Human Interface Guidelines gave me a massive advantage over standard applicants. Highly recommend the 6-month masterclass!"
      },
      {
        id: 3,
        name: "Amit Kumar Srivastav",
        avatar: "img/student-placeholder.svg",
        batch: "Batch of 2023",
        track: "Android Native App Development (Kotlin & Compose)",
        trackCategory: "android",
        currentRole: "Senior Android Engineer",
        company: "Infosys Digital",
        packageJump: "₹4.0 LPA ➔ ₹14.5 LPA (3-Year Progression)",
        verified: true,
        rating: 5,
        projectBuilt: "Fintech Wallet & QR Payment Engine with Biometrics",
        story: "The faculty at IT HUNT has 4+ years of real industry experience. They taught us Clean MVVM architecture, Room database caching, Coroutines, and Hilt dependency injection exactly as top product companies write code. The corporate Letter of Recommendation (LOR) and verifiable certificate added immense weight to my resume."
      },
      {
        id: 4,
        name: "Saurabh Pandey",
        avatar: "img/student-placeholder.svg",
        batch: "Batch of 2025",
        track: "Python, FastAPI & Applied Generative AI",
        trackCategory: "ai",
        currentRole: "AI / Backend Developer",
        company: "Venture-Backed AI Startup",
        packageJump: "Fresher ➔ ₹8.5 LPA + Stock Options",
        verified: true,
        rating: 5,
        projectBuilt: "Enterprise RAG AI Knowledge Search & LangChain Bot",
        story: "I joined the Applied Generative AI track to learn practical LLM orchestration. We built custom RAG pipelines with Pinecone, asynchronous APIs with FastAPI, and autonomous web agents. The hands-on project portfolio on my GitHub helped me get hired within 3 weeks of internship completion!"
      },
      {
        id: 5,
        name: "Pooja Verma",
        avatar: "img/student-placeholder.svg",
        batch: "Batch of 2023",
        track: "NIELIT 'O' Level & 'A' Level Diploma",
        trackCategory: "diploma",
        currentRole: "Assistant IT Officer",
        company: "State IT Department / Govt. Sector",
        packageJump: "Diploma Certification ➔ Govt. Grade Pay",
        verified: true,
        rating: 5,
        projectBuilt: "Comprehensive Government Office Automation & Database",
        story: "IT HUNT is the premier NIELIT accredited center in Holagarh Prayagraj. The structured lab schedule, Python practice classes, and dedicated question bank revision helped me secure top grades in all O Level modules on my first attempt. Thank you to the entire IT HUNT team!"
      },
      {
        id: 6,
        name: "Vikas Singh",
        avatar: "img/student-placeholder.svg",
        batch: "Batch of 2024",
        track: "Digital Marketing, SEO & Growth Hacking",
        trackCategory: "marketing",
        currentRole: "Growth & Performance Lead",
        company: "Global E-Commerce Agency (Remote)",
        packageJump: "₹3.0 LPA ➔ ₹8.0 LPA Remote",
        verified: true,
        rating: 5,
        projectBuilt: "Live E-Commerce Meta & Google Ads Scaling (ROAS 4.5x)",
        story: "Unlike other institutes that teach slides, IT HUNT had us manage live ad budgets, optimize real client SEO rankings, and run A/B testing on landing pages. I now manage remote US and Indian e-commerce ad accounts with confidence."
      }
    ]
  },

  // Events & Media Gallery Section
  eventsSection: {
    tagline: "CAMPUS LIFE, TECH INNOVATION & CELEBRATIONS",
    titlePrefix: "Flagship Events, Hackathons & ",
    titleGradient: "Media Gallery",
    description: "Explore our vibrant campus culture, 24-hour coding hackathons, technical masterclasses, graduation convocation ceremonies, and corporate placement drives at IT HUNT.",
    stats: [
      { value: "45+", label: "Events & Hackathons", icon: "🎪" },
      { value: "3,500+", label: "Student Participants", icon: "👥" },
      { value: "₹2.5L+", label: "Cash Prizes Awarded", icon: "💰" },
      { value: "25+", label: "Industry Guest Mentors", icon: "👨‍🏫" }
    ],
    categories: [
      { id: "all", label: "All Events", icon: "🌟" },
      { id: "hackathon", label: "Hackathons & Bootcamps", icon: "💻" },
      { id: "workshop", label: "AI & Tech Workshops", icon: "🤖" },
      { id: "convocation", label: "Convocation & Awards", icon: "🏆" },
      { id: "placement", label: "Placement Drives", icon: "💼" },
      { id: "techfest", label: "Tech Fest & Expo", icon: "🎉" }
    ],
    eventsList: [
      {
        id: 1,
        title: "Prayagraj Grand TechFest & 24-Hour Code Hackathon",
        subtitle: "Inter-college software engineering challenge solving real-world AI, Web & Mobile problems.",
        category: "hackathon",
        categoryLabel: "Hackathon & Bootcamp",
        date: "Aug 12 - 13, 2026",
        year: "2026",
        time: "09:00 AM (24-Hour Non-Stop Sprint)",
        venue: "IT HUNT Main Innovation Hub & Lab 1, Holagarh, Prayagraj",
        badge: "🔥 Flagship Hackathon",
        status: "Completed",
        coverImage: "img/event_hackathon.jpg",
        galleryImages: [
          {
            src: "img/event_hackathon.jpg",
            title: "Live 24-Hour Coding Arena",
            caption: "48 student developer teams building production-grade SaaS products and AI systems under the clock."
          },
          {
            src: "img/event_workshop.jpg",
            title: "Midnight Mentor Architecture Reviews",
            caption: "Senior tech leads providing live code debugging, API optimizations, and database indexing tips."
          },
          {
            src: "img/event_convocation.jpg",
            title: "Grand Trophy & Cash Prize Distribution",
            caption: "Director Mr. Lakshman Singh Chauhan presenting ₹50,000 cash prize to the champion development team."
          },
          {
            src: "img/event_techfest.jpg",
            title: "Live Product Demonstrations & Public Booths",
            caption: "Finalists presenting live interactive web applications to external industry jury members."
          }
        ],
        attendeeCount: "200+ Developers (48 Teams)",
        chiefGuests: [
          {
            name: "Mr. Lakshman Singh Chauhan",
            role: "Director & Chief Patron, IT HUNT",
            image: "img/ithunt.jpg"
          },
          {
            name: "Anoop Mishra",
            role: "Senior Full Stack Mentor & Hackathon Lead",
            image: "img/anoop.png"
          }
        ],
        metrics: {
          teams: "48 Competing Teams",
          prizePool: "₹50,000 Cash Prizes",
          projectsBuilt: "36 Production Demos",
          hoursOfCoding: "24 Hours Non-Stop"
        },
        overview: "The IT HUNT Grand Hackathon 2026 brought together over 200 passionate student developers, alumni, and tech enthusiasts from across Prayagraj, Pratapgarh, and Uttar Pradesh. Participants built end-to-end applications across MERN Stack, Generative AI, iOS Swift, and Android ecosystems, evaluated on code cleanliness, UI/UX polish, database architecture, and market viability.",
        agendaSchedule: [
          { time: "09:00 AM", title: "Inauguration & Problem Track Reveal", desc: "Keynote address by Director and release of 5 enterprise problem statements." },
          { time: "01:30 PM", title: "Architecture & Git Repo Setup Review", desc: "First round mentor evaluations of schema models and API routes." },
          { time: "11:00 PM", title: "Midnight Rapid Bug Buster Round", desc: "Deep debugging, Redux state troubleshooting, and UI optimization." },
          { time: "08:00 AM (Day 2)", title: "Git Push Freeze & Live Deployments", desc: "Live deployments to Vercel, Render, and AWS cloud instances." },
          { time: "11:30 AM", title: "Grand Jury Demo & Trophy Felicitation", desc: "Top 3 winning teams awarded trophies, certificates, and job interview fast-tracks." }
        ],
        highlights: [
          "48 Teams competed non-stop for 24 hours with dedicated high-speed optical fiber workstations",
          "36 Full-stack web and mobile apps deployed live on public cloud URLs",
          "₹50,000 total cash prizes distributed alongside verified Corporate Recommendation Letters (LOR)",
          "Top 5 performers received direct recruitment offers from IT HUNT Software Solutions"
        ],
        outcomes: [
          "1st Place: Team CyberPulse (AI-Powered Medical Diagnostic Assistant)",
          "2nd Place: Team DevSphere (Multi-Tenant Offline-First ERP for Local Retailers)",
          "3rd Place: Team CodeCraft (Real-Time Driver Geolocation & Route Optimizer in Kotlin)"
        ],
        quotes: [
          {
            author: "Rahul Tiwari (3rd Year B.Tech CSE)",
            text: "Coding all night in IT HUNT's air-conditioned lab with senior mentors guiding us through Docker and WebSocket issues was the best tech experience of my college life!"
          }
        ]
      },
      {
        id: 2,
        title: "Applied Generative AI & Cloud Microservices Masterclass Workshop",
        subtitle: "Hands-on intensive masterclass on LLM orchestration, FastAPI backends, and Vector Databases.",
        category: "workshop",
        categoryLabel: "AI & Tech Workshop",
        date: "Jul 26, 2026",
        year: "2026",
        time: "10:00 AM - 04:30 PM",
        venue: "Advanced AI & Software Lab, IT HUNT Holagarh",
        badge: "🤖 Next-Gen Workshop",
        status: "Completed",
        coverImage: "img/event_workshop.jpg",
        galleryImages: [
          {
            src: "img/event_workshop.jpg",
            title: "Interactive Generative AI Architecture Session",
            caption: "Mentor illustrating RAG retrieval pipelines, vector embeddings, and LangChain agents on the digital display."
          },
          {
            src: "img/event_hackathon.jpg",
            title: "Hands-On Python & FastAPI Coding Labs",
            caption: "Students deploying high-throughput asynchronous REST APIs with PostgreSQL database backends."
          },
          {
            src: "img/event_techfest.jpg",
            title: "Autonomous Agent Demonstrations",
            caption: "Participants testing custom customer support bots connected to live ChromaDB vector indexes."
          }
        ],
        attendeeCount: "120+ Enrolled Students & Developers",
        chiefGuests: [
          {
            name: "Anoop Mishra",
            role: "Senior AI & Full-Stack Instructor",
            image: "img/anoop.png"
          },
          {
            name: "Achal Singh Chauhan",
            role: "Cyber Security & Systems Lead",
            image: "img/hacker.png"
          }
        ],
        metrics: {
          teams: "120+ Participants",
          prizePool: "Free Cloud GPU Credits",
          projectsBuilt: "120 Live AI Bots Built",
          hoursOfCoding: "6.5 Hours Masterclass"
        },
        overview: "A power-packed 1-day masterclass designed to bridge academic Python knowledge with enterprise-grade Generative AI engineering. Every attendee built a functional Retrieval-Augmented Generation (RAG) system utilizing Pinecone vector database, OpenAI API models, and asynchronous FastAPI microservices.",
        agendaSchedule: [
          { time: "10:00 AM", title: "LLM Fundamentals & Vector Embedding Mathematics", desc: "Understanding similarity search, tokens, chunking strategies, and cosine distance." },
          { time: "12:00 PM", title: "Building Asynchronous APIs with FastAPI", desc: "Writing typed endpoints, Pydantic validation, and streaming HTTP responses." },
          { time: "02:00 PM", title: "Hands-On RAG Pipeline Implementation", desc: "Connecting custom PDF documents to ChromaDB and generating context-grounded answers." },
          { time: "03:45 PM", title: "Dockerization & Production Cloud Deployment", desc: "Containerizing AI apps and hosting them live on Render with automated CI/CD." }
        ],
        highlights: [
          "Zero-to-One production deployment of Retrieval-Augmented Generation (RAG) applications",
          "Dedicated high-performance cloud workstations provided for every attendee",
          "100% of participants left with a working AI project link on their GitHub profile",
          "Verifiable digital workshop certificate awarded to all attendees"
        ],
        outcomes: [
          "120+ Working RAG AI web assistants deployed to public cloud endpoints",
          "Comprehensive code repository and boilerplate template provided to all attendees",
          "15 Students selected for advanced 6-month AI Internship track"
        ],
        quotes: [
          {
            author: "Neha Sharma (MCA Student)",
            text: "This workshop demystified AI completely. In just 6 hours, I went from knowing basic Python to hosting my own intelligent document search API live on the web!"
          }
        ]
      },
      {
        id: 3,
        title: "Annual Convocation, ISO Certification & Merit Awards Gala",
        subtitle: "Honoring our graduating batches in NIELIT O/A Level, MERN Stack, and Mobile Engineering.",
        category: "convocation",
        categoryLabel: "Convocation & Awards",
        date: "Jun 18, 2026",
        year: "2026",
        time: "11:00 AM - 03:00 PM",
        venue: "IT HUNT Grand Academic Auditorium, Holagarh Prayagraj",
        badge: "🏆 Annual Convocation",
        status: "Completed",
        coverImage: "img/event_convocation.jpg",
        galleryImages: [
          {
            src: "img/event_convocation.jpg",
            title: "Stage Felicitation & Gold Medalist Honoring",
            caption: "Director Mr. Lakshman Singh Chauhan presenting gold medals and honors to batch toppers."
          },
          {
            src: "img/event_placement.jpg",
            title: "Placement Achievers Recognition Ceremony",
            caption: "Alumni placed in top MNCs and IT firms receiving corporate recommendation tokens and awards."
          },
          {
            src: "img/event_techfest.jpg",
            title: "Auditorium Address & Motivational Keynote",
            caption: "Inspirational address on ethical engineering, career longevity, and modern software leadership."
          }
        ],
        attendeeCount: "450+ Students, Alumni & Parents",
        chiefGuests: [
          {
            name: "Mr. Lakshman Singh Chauhan",
            role: "Director & Founder, IT HUNT",
            image: "img/ithunt.jpg"
          },
          {
            name: "Vikash Srivastav",
            role: "Campus Administrator",
            image: "img/vikash.png"
          }
        ],
        metrics: {
          teams: "180+ Graduates",
          prizePool: "15 Gold Medals & Trophies",
          projectsBuilt: "100% Verified Certifications",
          hoursOfCoding: "Annual Celebration"
        },
        overview: "The IT HUNT Annual Convocation & Merit Awards is our flagship yearly celebration honoring the hard work and accomplishments of our graduating engineering interns, NIELIT diploma holders, and university degree candidates. The ceremony recognized exceptional coding aptitude, client project deliveries, and record-breaking placement offers.",
        agendaSchedule: [
          { time: "11:00 AM", title: "Ceremonial Lamp Lighting & Welcome Note", desc: "Traditional auspicious lamp lighting followed by Director's welcoming address." },
          { time: "11:45 AM", title: "Presentation of NIELIT Diplomas & Internship Letters", desc: "Awarding official government recognized diplomas and corporate certificates." },
          { time: "01:00 PM", title: "Gold Medals & Top Project Innovator Awards", desc: "Felicitation of the top 15 merit rankers with customized trophies and honors." },
          { time: "02:15 PM", title: "Alumni Success Sharing & Networking Lunch", desc: "Graduates sharing their hiring interview journeys over a celebratory banquet." }
        ],
        highlights: [
          "Over 180 students received verified ISO-accredited completion certificates and LORs",
          "15 Gold medals awarded for academic excellence and outstanding live software contributions",
          "Attended by distinguished academic dignitaries, alumni, and proud family members",
          "Special felicitation for 100% attendance and peer-mentorship champions"
        ],
        outcomes: [
          "180+ Certified software engineers and NIELIT diploma holders graduated into industry",
          "95% of graduates successfully transitioned into corporate tech roles and higher degree programs"
        ],
        quotes: [
          {
            author: "Pooja Verma (Assistant IT Officer & NIELIT Topper)",
            text: "Receiving my diploma and gold medal from Director Chauhan Sir on this stage was a moment of immense pride for me and my family."
          }
        ]
      },
      {
        id: 4,
        title: "Mega Campus Placement Drive & Corporate Hiring Fair",
        subtitle: "Direct on-campus recruitment drive connecting IT HUNT talent with leading tech companies.",
        category: "placement",
        categoryLabel: "Placement Drive",
        date: "May 08, 2026",
        year: "2026",
        time: "09:30 AM - 06:00 PM",
        venue: "IT HUNT Career Development Wing & Interview Suites",
        badge: "💼 Placement Drive",
        status: "Completed",
        coverImage: "img/event_placement.jpg",
        galleryImages: [
          {
            src: "img/event_placement.jpg",
            title: "Corporate Technical Interview Rooms",
            caption: "HR directors and senior software architects evaluating candidate code portfolios and resumes."
          },
          {
            src: "img/event_hackathon.jpg",
            title: "Live Machine Coding & Algorithmic Rounds",
            caption: "Candidates solving data structure problems and building REST endpoints under timed conditions."
          },
          {
            src: "img/event_convocation.jpg",
            title: "Instant Letter of Intent (LOI) Distribution",
            caption: "Selected students celebrating on-the-spot job offer letters from participating tech firms."
          }
        ],
        attendeeCount: "250+ Candidates • 18 Tech Companies",
        chiefGuests: [
          {
            name: "Mr. Lakshman Singh Chauhan",
            role: "Director & Placement Head",
            image: "img/ithunt.jpg"
          },
          {
            name: "Vikash Srivastav",
            role: "Corporate Liaison Lead",
            image: "img/vikash.png"
          }
        ],
        metrics: {
          teams: "18 Hiring Companies",
          prizePool: "₹18.5 LPA Top Package",
          projectsBuilt: "85+ On-Spot Offers",
          hoursOfCoding: "Full Day Drive"
        },
        overview: "The IT HUNT Mega Placement Fair is an exclusive hiring initiative designed to place our trained software interns and diploma candidates in high-growth companies. Over 18 IT companies, software agencies, and startups conducted machine coding tests, technical interviews, and HR rounds right at our Holagarh campus.",
        agendaSchedule: [
          { time: "09:30 AM", title: "Company Pre-Placement Briefing (PPT)", desc: "Recruiters presenting company visions, job profiles, and package structures." },
          { time: "11:00 AM", title: "Round 1: Online Coding Assessment & Aptitude", desc: "Algorithmic challenges, SQL queries, and React/Node debugging tests." },
          { time: "02:00 PM", title: "Round 2: Technical Architecture & Portfolio Deep-Dive", desc: "1-on-1 code walkthroughs of GitHub repositories built during internship." },
          { time: "05:00 PM", title: "Round 3: HR Discussion & On-The-Spot Offer Letters", desc: "Issuance of Letters of Intent (LOI) to selected candidates." }
        ],
        highlights: [
          "18 Reputed IT firms and software agencies participated as hiring partners",
          "85+ Job offers extended with packages ranging from ₹4.0 LPA to ₹18.5 LPA",
          "100% Machine coding qualification rate for candidates completing the 6-month MERN/Mobile tracks",
          "Extensive pre-drive mock interview prep and resume polishing support provided"
        ],
        outcomes: [
          "85+ Students secured direct corporate placements",
          "Highest CTC offered: ₹18.5 LPA | Average CTC: ₹6.2 LPA",
          "100% positive recruiter satisfaction ratings on candidate practical coding skills"
        ],
        quotes: [
          {
            author: "Anup Mishra (Placed at Paytm Payments)",
            text: "The recruiters specifically appreciated that we had live production projects with Docker and Redis on GitHub, rather than simple classroom toys."
          }
        ]
      },
      {
        id: 5,
        title: "National Youth Tech Fest & Smart IoT Project Expo",
        subtitle: "Exhibition of student-engineered robotics, embedded IoT hardware, and AI innovations.",
        category: "techfest",
        categoryLabel: "Tech Fest & Expo",
        date: "Apr 14, 2026",
        year: "2026",
        time: "10:00 AM - 05:00 PM",
        venue: "IT HUNT Exhibition Lawn & Smart Hardware Lab",
        badge: "🎉 Tech Fest & Expo",
        status: "Completed",
        coverImage: "img/event_techfest.jpg",
        galleryImages: [
          {
            src: "img/event_techfest.jpg",
            title: "Robotics & Smart Agriculture IoT Live Stalls",
            caption: "Students demonstrating automated irrigation systems, robotic arms, and sensor dashboards."
          },
          {
            src: "img/event_workshop.jpg",
            title: "Interactive Mobile App Demonstrations",
            caption: "Visitors experiencing native iOS and Android apps controlling real-time microcontrollers."
          },
          {
            src: "img/event_hackathon.jpg",
            title: "Junior Coding Challenge & Game Dev Zone",
            caption: "High school and diploma students competing in rapid Python game creation tournaments."
          }
        ],
        attendeeCount: "600+ Visitors, Students & Tech Lovers",
        chiefGuests: [
          {
            name: "Mr. Lakshman Singh Chauhan",
            role: "Director & Chief Patron",
            image: "img/ithunt.jpg"
          },
          {
            name: "Achal Singh Chauhan",
            role: "Hardware & Robotics Mentor",
            image: "img/hacker.png"
          }
        ],
        metrics: {
          teams: "35 Hardware Stalls",
          prizePool: "₹25,000 Innovation Awards",
          projectsBuilt: "35 Working Prototypes",
          hoursOfCoding: "Day-Long Expo"
        },
        overview: "The National Youth Tech Fest celebrates the fusion of software intelligence with real-world electronics and smart automation. Students exhibited 35 innovative working prototypes including smart irrigation IoT monitors, solar tracking controllers, biometric campus security systems, and AI computer vision assistants.",
        agendaSchedule: [
          { time: "10:00 AM", title: "Grand Ribbon Cutting & Exhibition Walkthrough", desc: "Guests inspecting working hardware prototypes and student code." },
          { time: "12:30 PM", title: "Public Innovation Voting & Live Demonstrations", desc: "Audience testing IoT sensors and mobile companion applications." },
          { time: "03:00 PM", title: "Robo-Race & Micro-Drone Challenge", desc: "Autonomous obstacle navigation contest on custom obstacle tracks." },
          { time: "04:30 PM", title: "Grand Innovation Trophy & Cash Awards", desc: "Best Innovator, Best Green Tech Project, and Best UI/UX design trophies." }
        ],
        highlights: [
          "35 Live working prototypes demonstrated to over 600 visiting students and educators",
          "Interdisciplinary projects combining Python, Node.js, Arduino, Raspberry Pi, and Swift",
          "Cash innovation grants awarded to the top 3 sustainable technology projects",
          "Wide regional media coverage highlighting rural tech empowerment in Holagarh Prayagraj"
        ],
        outcomes: [
          "1st Place Winner: Smart Solar Agricultural Water Monitoring System",
          "2nd Place Winner: Computer Vision Biometric Face-Scanner & Access Gate",
          "3rd Place Winner: Bluetooth Low Energy (BLE) Medical Vitals Tracker"
        ],
        quotes: [
          {
            author: "Saurabh Pandey (AI Intern)",
            text: "Seeing hundreds of school and college students interact with the smart robot arm we coded at IT HUNT was an unforgettable feeling of accomplishment!"
          }
        ]
      },
      {
        id: 6,
        title: "Native iOS & Android Mobile App Architecture Bootcamp",
        subtitle: "Deep-dive weekend sprint on Swift 5, SwiftUI, Kotlin 2.0, and Jetpack Compose state architecture.",
        category: "workshop",
        categoryLabel: "Mobile Bootcamp",
        date: "Feb 22, 2026",
        year: "2026",
        time: "10:00 AM - 05:00 PM",
        venue: "Apple Mac & Android Testing Lab, IT HUNT Holagarh",
        badge: "📱 Mobile Bootcamp",
        status: "Completed",
        coverImage: "img/event_workshop.jpg",
        galleryImages: [
          {
            src: "img/event_workshop.jpg",
            title: "SwiftUI Declarative Layouts & Combine Framework",
            caption: "Instructor breaking down state hoisting, observable objects, and async/await networking in Swift."
          },
          {
            src: "img/event_hackathon.jpg",
            title: "Jetpack Compose & Kotlin Coroutines Lab",
            caption: "Building reactive Android Material 3 user interfaces with clean MVVM architecture."
          },
          {
            src: "img/event_convocation.jpg",
            title: "TestFlight & Play Store Submission Session",
            caption: "Demonstration of generating app bundles, provisioning profiles, and signing certificates."
          }
        ],
        attendeeCount: "90+ Mobile Developers",
        chiefGuests: [
          {
            name: "Mr. Lakshman Singh Chauhan",
            role: "Director & Founder",
            image: "img/ithunt.jpg"
          },
          {
            name: "Anoop Mishra",
            role: "Lead Mobile & Web Architect",
            image: "img/anoop.png"
          }
        ],
        metrics: {
          teams: "90+ Mobile Devs",
          prizePool: "App Store Publishing Passes",
          projectsBuilt: "2 Native Apps Published",
          hoursOfCoding: "7 Hours Intensive"
        },
        overview: "A masterclass dedicated to the nuances of modern declarative mobile app development. Interns built cross-compatible native mobile modules, connected secure REST APIs with token refreshing, implemented Room/CoreData offline persistence, and prepared production release builds for the Apple App Store and Google Play Store.",
        agendaSchedule: [
          { time: "10:00 AM", title: "Modern Mobile Architecture: MVVM vs Clean Architecture", desc: "Separation of concerns, repository pattern, and reactive data streams." },
          { time: "11:45 AM", title: "Declarative UI Masterclass: SwiftUI & Jetpack Compose", desc: "Building responsive dynamic screens with modern state hoisting." },
          { time: "02:00 PM", title: "Networking & Offline Caching", desc: "Retrofit/URLSession with encrypted Room database and SwiftData sync." },
          { time: "04:00 PM", title: "App Store Connect & Play Store Release Pipelines", desc: "Managing app metadata, screenshots, certificates, and beta testing." }
        ],
        highlights: [
          "Hands-on practice on dedicated Apple Mac workstations and high-speed Android test devices",
          "Built and released two live native test applications to TestFlight during the session",
          "Complete architectural boilerplate source code shared with all attendees",
          "Exclusive guidance on landing high-paying remote iOS and Android contracts"
        ],
        outcomes: [
          "90+ Developers upskilled in modern declarative mobile frameworks",
          "2 Production demo apps approved on Apple TestFlight and Google Internal Testing"
        ],
        quotes: [
          {
            author: "Amit Kumar Srivastav (iOS Intern)",
            text: "The Apple lab at IT HUNT is world-class. Learning how to architect scalable SwiftUI code under mentor guidance gave me the exact confidence I needed."
          }
        ]
      }
    ],
    upcomingEvents: [
      {
        id: "up-1",
        title: "Prayagraj Grand Web & AI Hackathon (Autumn Edition)",
        date: "September 24 - 25, 2026",
        time: "09:00 AM - Next Day 09:00 AM",
        venue: "IT HUNT Innovation Arena & Lab 1",
        category: "Hackathon",
        categoryBadge: "🚀 Registrations Open",
        seatsTotal: 60,
        seatsRemaining: 18,
        perks: [
          "₹75,000 Total Cash Prize Pool",
          "Free High-Speed Lab Workstations & Cloud GPUs",
          "Verified Corporate Recommendation Letters (LOR)",
          "Direct Placement Opportunities with IT HUNT"
        ],
        description: "Join the most anticipated 24-hour coding hackathon in Eastern UP. Build next-gen full-stack web platforms, AI agents, or mobile apps and compete for massive cash prizes and direct recruitment."
      },
      {
        id: "up-2",
        title: "Enterprise Cybersecurity & Ethical Hacking Masterclass",
        date: "October 10, 2026",
        time: "10:00 AM - 04:00 PM",
        venue: "Cyber Defense Wing, IT HUNT Holagarh",
        category: "Workshop",
        categoryBadge: "🛡️ Free for Enrolled Students",
        seatsTotal: 40,
        seatsRemaining: 12,
        perks: [
          "Hands-on Penetration Testing & Web Vulnerability Lab",
          "Wireshark, Burp Suite & Kali Linux Real-World Exercises",
          "Official Cyber Defense Workshop Certificate"
        ],
        description: "Learn how modern cybersecurity specialists audit web applications, prevent SQL injection, mitigate DDoS attacks, and secure enterprise cloud infrastructure."
      }
    ]
  },

  // Contact Information
  contact: {
    location: "Dahiyawa Holagarh(Near Mela Ground in Front of Kali Maa Mandir), Prayagraj (Allahabad), UP",
    phone: "Mobile: +91 9795771806",
    rawPhone: "+91 9795771806",
    email: "Email: softtechithunt@gmail.com",
    rawEmail: "softtechithunt@gmail.com",
    districts: ["PRAYAGRAJ", "PRATAPGARH", "KAUSHAMBI", "GORAKHPUR", "LUCKNOW", "RAEBARELI", "VARANASI", "AMETHI"]
  },

  // Legal Documents (Privacy Policy & Terms)
  "privacyPolicyData": {
    "docTitle": "OFFICIAL PRIVACY & DATA PROTECTION POLICY",
    "docSubtitle": "Candidate, Intern & Enterprise Client Information Governance",
    "effectiveDate": "January 01, 2026",
    "referenceCode": "ITH-POL-2026/01",
    "sections": [
      {
        "title": "1. Information We Collect",
        "content": "IT HUNT collects essential candidate details including legal name, contact numbers, email addresses, permanent address, educational credentials, and portfolio links submitted during online registration or on-campus admissions."
      },
      {
        "title": "2. Purpose & Use of Collected Data",
        "content": "Data is strictly utilized for academic enrollment, lab workstation allotment, generating ISO 9001:2015 verified certificates, publishing corporate recommendation letters (LOR), and facilitating direct placement drives with partner software firms."
      },
      {
        "title": "3. Live Client Software & Non-Disclosure (NDA)",
        "content": "Interns working on live client web, mobile, and AI solutions are bound by confidentiality. Source code repositories, client API keys, and database schemas remain the exclusive intellectual property of IT HUNT and client stakeholders."
      },
      {
        "title": "4. Data Security & Storage Architecture",
        "content": "We enforce enterprise-grade security protocols including encrypted data storage, restricted staff authorization, secure SSL communications, and automated backups. We do not sell, rent, or trade student records with third-party telemarketers."
      },
      {
        "title": "5. Student Rights & Verification Access",
        "content": "Enrolled students and alumni have the right to request official academic transcripts, update contact records, or request verification reports for employer background screening at any time."
      },
      {
        "title": "6. Policy Inquiries & Data Officer",
        "content": "For questions regarding this privacy policy or data corrections, contact the IT HUNT Administrative Desk at Dahiyawa Holagarh, Prayagraj, UP - 212502 or via email at softtechithunt@gmail.com."
      }
    ]
  },
  "termsConditionsData": {
    "docTitle": "TERMS OF ADMISSION & ACADEMIC REGULATIONS",
    "docSubtitle": "Production Internship & Accredited Computer Education Code",
    "effectiveDate": "Academic Session 2026 - 2027",
    "referenceCode": "ITH-TOC-2026/02",
    "sections": [
      {
        "title": "1. Admission Eligibility & Candidate Representation",
        "content": "Admission to IT HUNT production internships and NIELIT diploma tracks requires valid educational documentation. The candidate certifies that all submitted records are authentic and truthful."
      },
      {
        "title": "2. Lab Workstations & Infrastructure Guidelines",
        "content": "Students are allotted dedicated workstations and high-speed fiber internet. Unauthorized system modifications, software piracy, or hardware damage will result in immediate disciplinary review."
      },
      {
        "title": "3. Sprint Deliverables, Attendance & Code Reviews",
        "content": "Interns must maintain a minimum of 80% lab attendance and actively complete assigned sprint tasks, Git commits, and code review milestones to qualify for course completion."
      },
      {
        "title": "4. Verified Certification & Letter of Recommendation (LOR)",
        "content": "ISO 9001:2015 accredited certificates and Corporate LOR signed by the Director are awarded upon successful presentation of production capstone projects and mentor code audits."
      },
      {
        "title": "5. 100% Career Placement Support Policy",
        "content": "Placement assistance includes resume reviews, mock interviews, and direct interview scheduling with partner software firms. Offer conversion depends on the candidate technical performance in client rounds."
      },
      {
        "title": "6. Fee Policy, Transparency & Jurisdiction",
        "content": "All training fees are transparently structured. Any disputes arising under these terms and conditions shall be subject to the exclusive jurisdiction of the competent courts in Prayagraj (Allahabad), Uttar Pradesh."
      }
    ]
  },

  // Centralized Global UI & Modal Dictionary
  "navbar": {
    "applyCtaText": "Apply Internship",
    "applyCtaIcon": "✨",
    "lightModeTitle": "Switch to Light Mode",
    "darkModeTitle": "Switch to Dark Mode",
    "toggleNavAria": "Toggle Navigation"
  },
  "ui": {
    "backToTop": "⬆ Back to Top",
    "privacyPolicy": "Privacy Policy",
    "termsConditions": "Terms & Conditions",
    "reviewsAndRatings": "⭐ Reviews & Ratings",
    "eventsGallery": "Events Gallery",
    "alumniStories": "Alumni Stories",
    "gotIt": "Got It 👍",
    "cancel": "Cancel",
    "resetFilters": "Reset Filters 🔄",
    "clearSearch": "Clear search",
    "photosCountSuffix": "Photos",
    "viewAlbumDetails": "View Event Album & Details 🔍",
    "exploreEventStory": "Explore Event Story & Photos 📸 →",
    "enrollCourseBtn": "Enroll in Course →",
    "applyCourseBtnPrefix": "Apply for",
    "applyJobBtnPrefix": "Apply for",
    "minExpRequiredBadge": "Min 4+ Yrs Exp",
    "fastApplyBtn": "Fast Apply ⚡",
    "viewDetailsSyllabusBtn": "View Details & Syllabus 🔬",
    "startAdmissionCta": "Start Admission Application 📝 →",
    "chatWhatsappBtn": "Chat on WhatsApp 💬",
    "exploreInternshipsBtn": "Explore Internship Tracks 🚀",
    "exploreEventsGalleryBtn": "Explore Events & Media Gallery 🎪 →",
    "confirmedBadge": "✓ CONFIRMED",
    "verifiedAlumniBadge": "✓ Verified",
    "topCompaniesHeading": "Top Companies Hiring IT HUNT Alumni:",
    "placementAchievementLabel": "Placement & Salary Achievement:",
    "keyProjectBuiltLabel": "🛠️ Key Project Built:",
    "reviewSubmitSuccessTitle": "Review Published Successfully! ⭐",
    "eventRsvpSuccessTitle": "Free Event Pass Confirmed! 🎟️",
    "jobApplicationSuccessTitle": "Job Application Received! 💼",
    "admissionSuccessTitle": "Admission Registered Successfully! 🎓",
    "generatingPdfLabel": "⏳ Generating PDF...",
    "downloadPdfSlipBtn": "📄 Download Registration Slip (PDF)",
    "downloadVerifiedPdfBtn": "📄 Download Verified Admission Slip (PDF)",
    "printSlipBtn": "Print Slip 🖨️"
  },
  "homeSpotlights": {
    "internshipBanner": {
      "track3MoTitle": "3-Month Track",
      "track3MoDesc": "Fast-track Skill Acceleration",
      "track6MoTitle": "6-Month Track",
      "track6MoDesc": "Complete Industry Masterclass",
      "ctaBtn": "Apply for Internship Track →"
    },
    "eventsBanner": {
      "pillBadge": "🎪 CAMPUS EVENTS & GALLERY 2026",
      "titlePrefix": "Where Tech Innovation Meets ",
      "titleGradient": "Celebration",
      "desc": "Explore our 24-hour coding hackathons, applied AI workshops, annual graduation convocation ceremonies, and mega campus placement drives.",
      "ctaBtn": "Explore Events & Media Gallery 🎪 →",
      "box1Title": "Hackathons",
      "box1Desc": "24-Hr Coding Sprints",
      "box2Title": "Convocation",
      "box2Desc": "Awards & Degrees"
    }
  },
  "internshipsSectionUI": {
    "heroPill": "2026 BATCH ENROLLMENTS OPEN • PRODUCTION-GRADE SOFTWARE INCUBATOR",
    "trustRibbon": [
      {
        "icon": "🚀",
        "text": "100% Production Codebases"
      },
      {
        "icon": "👨‍💻",
        "text": "1-on-1 Senior Tech Mentorship"
      },
      {
        "icon": "📜",
        "text": "Corporate LOR & Certificate"
      },
      {
        "icon": "💼",
        "text": "95% Placement Assistance"
      }
    ],
    "filterTabs": [
      {
        "id": "all",
        "label": "All Tracks"
      },
      {
        "id": "3 Months",
        "label": "⚡ 3-Month Fast-Track"
      },
      {
        "id": "6 Months",
        "label": "🚀 6-Month Masterclass"
      }
    ],
    "cardLabels": {
      "salaryRange": "💰 Salary Range",
      "placement": "🎯 Placement",
      "totalHours": "⏱️ Total Hours",
      "liveProjectsPrefix": "🛠️ Live Production Projects",
      "liveProjectsSuffix": "Apps",
      "moreProjectsText": "+1 More Live Project",
      "techStackLabel": "Technologies & Frameworks:"
    },
    "advantageSection": {
      "tagline": "THE IT HUNT ADVANTAGE",
      "titlePrefix": "Why Engineering Students Choose ",
      "titleGradient": "IT HUNT",
      "subtitle": "Real workplace culture, corporate Git repositories, and direct industry hiring connections."
    },
    "roadmapSection": {
      "tagline": "STRUCTURED LEARNING TIMELINE",
      "titlePrefix": "Your 4-Phase ",
      "titleGradient": "Career Launchpad",
      "subtitle": "A proven step-by-step roadmap from fundamental coding to enterprise production and placement."
    },
    "bottomCta": {
      "badgePill": "LIMITED SEATS AVAILABLE PER BATCH",
      "headlinePrefix": "Ready to Transform from a Student to a ",
      "headlineGradient": "Production Engineer?",
      "subtext": "Book a free 1-on-1 counseling session with Director Mr. Lakshman Singh Chauhan, tour our Holagarh high-tech labs, and test drive our live workstation setups."
    }
  },
  "eventsSectionUI": {
    "tagline": "CAMPUS LIFE & TECH INNOVATION",
    "titlePrefix": "Flagship Events, Hackathons & ",
    "titleGradient": "Media Gallery",
    "searchPlaceholder": "Search hackathons, workshops, guests...",
    "emptySearchTitlePrefix": "No Events Found Matching ",
    "emptySearchSubtitle": "Try selecting a different category or clearing your search filters.",
    "upcomingSection": {
      "tagline": "🌟 Registrations Open",
      "titlePrefix": "Upcoming ",
      "titleGradient": "Hackathons & Masterclasses",
      "subtitle": "Reserve your free seat for our next campus innovation events and industry sprints.",
      "seatsSuffix": "Seats Left",
      "rsvpBtnText": "RSVP / Register Free for Event 🚀 →"
    }
  },
  "testimonialsSectionUI": {
    "heroPill": "PROVEN TRACK RECORD • 500+ SUCCESSFUL ALUMNI WORLDWIDE",
    "filterTabs": [
      {
        "id": "all",
        "label": "All Alumni Stories"
      },
      {
        "id": "mern",
        "label": "⚛️ MERN Full Stack"
      },
      {
        "id": "ios",
        "label": "🍎 iOS Swift"
      },
      {
        "id": "android",
        "label": "🤖 Android Kotlin"
      },
      {
        "id": "ai",
        "label": "🐍 Python & AI"
      },
      {
        "id": "diploma",
        "label": "📜 NIELIT Diplomas"
      }
    ],
    "bottomCta": {
      "badgePill": "NEXT BATCH ADMISSIONS OPEN",
      "headlinePrefix": "Want to Be Our Next ",
      "headlineGradient": "Alumni Success Story?",
      "subtext": "Join our hands-on 3-Month or 6-Month IT Internship incubation in Prayagraj. Learn direct from senior MCA tech architects and build portfolio-worthy enterprise code."
    }
  },
  "reviewsSectionUI": {
    "metricsHeading": "Facility & Development Evaluation Metrics",
    "formTitle": "Submit Your Review & Feedback",
    "formSubtitle": "Help us improve institute infrastructure, labs, and ease of technical development.",
    "fields": {
      "nameLabel": "Your Name",
      "namePlaceholder": "Full name",
      "roleLabel": "Course / Program Attended",
      "rolePlaceholder": "e.g. MERN Stack Intern / O Level Student",
      "ratingLabel": "Overall Rating",
      "categoryLabel": "Evaluation Category",
      "reviewLabel": "Your Review",
      "reviewPlaceholder": "Share your experience regarding facility quality, faculty guidance, and ease of development...",
      "submitBtn": "Post Review & Feedback ⭐"
    },
    "ratingOptions": [
      {
        "value": 5,
        "label": "⭐⭐⭐⭐⭐ 5 Stars (Excellent)"
      },
      {
        "value": 4,
        "label": "⭐⭐⭐⭐ 4 Stars (Very Good)"
      },
      {
        "value": 3,
        "label": "⭐⭐⭐ 3 Stars (Average)"
      }
    ],
    "categoryOptions": [
      "Labs & Workstations",
      "Teaching & Mentorship",
      "Placement & LOR",
      "Course Curriculum"
    ]
  },
  "admissionSection": {
    "sectionTag": "Online Registration 2026",
    "titlePrefix": "Candidate ",
    "titleGradient": "Admission Application",
    "formTitle": "Student Registration Details",
    "formSubtitle": "Please enter accurate candidate information as per official records.",
    "fields": {
      "candidateName": "Candidate Name",
      "candidateNamePlaceholder": "Full candidate name",
      "fatherName": "Father's Name",
      "fatherNamePlaceholder": "Father's full name",
      "motherName": "Mother's Name",
      "motherNamePlaceholder": "Mother's full name",
      "dob": "Date of Birth",
      "gender": "Gender",
      "genderOptions": [
        "Male",
        "Female",
        "Other"
      ],
      "course": "Target Program",
      "mobile": "Mobile Number",
      "mobilePlaceholder": "10-digit mobile",
      "email": "Email Address",
      "emailPlaceholder": "name@example.com",
      "address": "Permanent Address",
      "addressPlaceholder": "Full residential street address",
      "submitBtn": "Submit Registration 🚀"
    },
    "courseOptgroups": [
      {
        "label": "🚀 IT Solution & Production Internships (3 / 6 Months)",
        "options": [
          "Web Development (MERN Stack & Cloud Architecture)",
          "iOS Native App Development (Swift & SwiftUI)",
          "Android Native App Development (Kotlin & Jetpack Compose)",
          "Digital Marketing, SEO & Growth Hacking"
        ]
      },
      {
        "label": "📚 Accredited Diplomas & University Degrees",
        "options": [
          "NIELIT \"O\" Level Diploma",
          "NIELIT \"A\" Level Diploma",
          "Subharti University Degree Courses (BCA / MCA)",
          "Tally ERP 9 & GST"
        ]
      }
    ],
    "previewCard": {
      "stamp": "🏛️ OFFICIAL ADMISSION PREVIEW",
      "title": "IT HUNT ACADEMY 2026",
      "location": "Dahiyawa Holagarh, Prayagraj, UP - 212502",
      "copyBadge": "📜 OFFICIAL CANDIDATE COPY",
      "accreditedBadge": "✓ ISO 9001:2015 ACCREDITED",
      "candidateNameLabel": "Candidate Name:",
      "fatherNameLabel": "Father's Name:",
      "programLabel": "Program Selected:",
      "genderDobLabel": "Gender / DOB:",
      "mobileLabel": "Contact Mobile:",
      "districtLabel": "District & State:",
      "typingPlaceholder": "— (Typing...)",
      "securityNote": "Auto-generates official verified admission registration ID upon submission",
      "signatoryTitle": "Authorized Signatory:",
      "signatoryName": "Director Mr. Lakshman Singh Chauhan"
    }
  },
  "modalTexts": {
    "courseDetail": {
      "subheading": "IT Solutions & Production Internship Track 2026 • Live Project Lab",
      "earningTag": "Earning Potential",
      "fresherLabel": "Fresher Salary:",
      "experiencedLabel": "Experienced (2-3+ Yrs):",
      "freelanceLabel": "Freelance / Remote:",
      "marketOverviewLabel": "Current Market Scenario:",
      "successRateTag": "Job Success Rate",
      "placementSuffix": "% Placement",
      "hoursTag": "Learning Hours",
      "weeklyHoursLabel": "Weekly Commitment:",
      "liveLabHoursLabel": "Live Lab Coding:",
      "scheduleLabel": "Schedule:",
      "targetRolesTag": "Target Job Roles",
      "techScopeHeading": "Details About Technology & Industry Scope",
      "techLearnedHeading": "Technologies & Tools You Will Learn",
      "liveProjectsHeading": "Real-World Production Projects You Will Build",
      "projectBadgePrefix": "Project 0",
      "curriculumHeading": "Structured Curriculum Milestones",
      "guaranteeTitle": "Verified Internship Certification + Corporate Letter of Recommendation (LOR)",
      "guaranteeDesc": "Includes 100% placement assistance, resume masterclass, mock technical interviews, and GitHub production code portfolio review.",
      "backBtn": "Back to Tracks",
      "proceedBtn": "Proceed to Registration 📝 →"
    },
    "eventDetail": {
      "venueLabel": "Venue:",
      "fullscreenHint": "🔍 Click to View Fullscreen",
      "metrics": {
        "teams": "Participation",
        "prizePool": "Prizes & Perks",
        "projectsBuilt": "Deliverables",
        "hoursOfCoding": "Format / Sprint"
      },
      "storyHeading": "Event Overview & Campus Story",
      "scheduleHeading": "Official Event Schedule & Milestones",
      "dignitariesHeading": "Chief Mentors & Dignitaries Lineup",
      "outcomesHeading": "Key Outcomes & Milestones",
      "podiumHeading": "🥇 Honors & Winners Podium:",
      "backBtn": "Back to All Events",
      "applyBtn": "Apply for IT HUNT Academy 2026 🚀 →"
    },
    "lightbox": {
      "counterPrefix": "📸 Photo",
      "counterOf": "of",
      "closeTooltip": "Close Lightbox (Esc)",
      "prevTooltip": "Previous Image (Left Arrow)",
      "nextTooltip": "Next Image (Right Arrow)"
    },
    "eventRsvp": {
      "passBadge": "FREE EVENT PASS 2026",
      "headingPrefix": "Register for",
      "nameLabel": "Full Name",
      "namePlaceholder": "Candidate full name",
      "phoneLabel": "Mobile Number",
      "phonePlaceholder": "10-digit mobile",
      "emailLabel": "Email Address",
      "emailPlaceholder": "name@example.com",
      "collegeLabel": "College / Organization",
      "collegePlaceholder": "e.g. Allahabad University / Shambhunath / BBS / UIET",
      "domainLabel": "Primary Interest / Domain",
      "domainOptions": [
        "Full-Stack Web (MERN Stack)",
        "Generative AI & Python",
        "Mobile App (iOS / Android)",
        "Cybersecurity & Ethical Hacking",
        "Other / General Tech Innovation"
      ],
      "cancelBtn": "Cancel",
      "submitBtn": "Confirm Free Registration 🎟️"
    },
    "jobApplication": {
      "headingPrefix": "Apply for",
      "expWarning": "⚠️ Requirement: Minimum 4+ Years Experience Required",
      "nameLabel": "Full Name",
      "namePlaceholder": "Your full legal name",
      "expLabel": "Total Exp",
      "expOptions": [
        {
          "value": "4 Years",
          "label": "4 Years Experience"
        },
        {
          "value": "5 Years",
          "label": "5 Years Experience"
        },
        {
          "value": "6-8 Years",
          "label": "6 - 8 Years Experience"
        },
        {
          "value": "8+ Years",
          "label": "8+ Years Experience"
        }
      ],
      "phoneLabel": "Mobile",
      "phonePlaceholder": "10-digit mobile",
      "emailLabel": "Email Address",
      "emailPlaceholder": "name@example.com",
      "portfolioLabel": "Portfolio / LinkedIn Link",
      "portfolioPlaceholder": "https://linkedin.com/in/username",
      "cancelBtn": "Cancel",
      "submitBtn": "Submit Job Application 💼"
    },
    "confirmation": {
      "defaultTitle": "Application Submitted Successfully! 🎉",
      "referencePrefix": "Reference ID:",
      "receiptHeading": "📄 Official Admission Receipt",
      "confirmedBadge": "✓ CONFIRMED",
      "candidateNameLabel": "Candidate Name",
      "registrationIdLabel": "Registration ID",
      "fatherNameLabel": "Father's Name",
      "mobileLabel": "Mobile Number",
      "courseLabel": "Enrolled Program / Track",
      "downloadPdfBtn": "📄 Download Registration Slip (PDF)",
      "generatingPdfBtn": "⏳ Generating PDF...",
      "printBtn": "Print Slip 🖨️",
      "gotItBtn": "Got It 👍"
    }
  },
  "printableSlip": {
    "instituteName": "IT HUNT",
    "instituteTagline": "Software Solutions & Tech Academy • Estd. 2012",
    "instituteAddress": "Dahiyawa Holagarh, Prayagraj, UP - 212502",
    "institutePhone": "+91 9795771806",
    "instituteEmail": "softtechithunt@gmail.com",
    "accreditationText": "ISO 9001:2015 Accredited",
    "sealBadge": "OFFICIAL RECEIPT",
    "sealSub": "ORIGINAL COPY",
    "titleBar": "Admission & Internship Registration Acknowledgment",
    "statusBadge": "STATUS: CONFIRMED",
    "sessionText": "2026 - 2027",
    "regNoLabel": "Official Registration No.",
    "regDateLabel": "Registration Date",
    "sessionLabel": "Academic Session",
    "candidateTitle": "Candidate Particulars",
    "programTitle": "Program & Training Allocation",
    "campusValue": "IT HUNT Software Studio, Holagarh Campus",
    "workstationValue": "Dedicated PC + High-Speed Fiber",
    "certificationValue": "ISO 9001:2015 + Corporate LOR",
    "reportingValue": "09:30 AM Onboarding",
    "admittedStatusValue": "PROVISIONALLY ADMITTED",
    "guidelinesTitle": "⚠️ Mandatory Candidate Instructions for Day 1:",
    "guidelines": [
      "Please present a printed or digital copy of this Registration Slip at the campus helpdesk.",
      "Carry 2 recent passport-size color photographs and 1 government photo ID proof (Aadhaar / Voter ID).",
      "Reporting time is 09:30 AM at IT HUNT Holagarh Campus for batch orientation and workstation allotment.",
      "Access to corporate GitHub repositories, Discord community, and live project keys will be issued on Day 1."
    ],
    "securityNote": "System Generated Official Document",
    "securitySub": "Verified via IT HUNT Central Academic Database",
    "signatoryTitle": "Authorized Signatory",
    "signatoryName": "Mr. Lakshman Singh Chauhan",
    "signatoryDesignation": "Director & Founder, IT HUNT | MCA"
  },
  "footerSections": {
    "quickLinksTitle": "Quick Links",
    "internshipsTitle": "Internship Ventures",
    "contactTitle": "Contact & Location",
    "reviewRatingBadge": "⭐ Student Reviews & Ratings (4.9 / 5.0) →"
  },

  // Footer Text
  footer: {
    aboutText: "World-class IT Solutions Internship Center & accredited computer education institute. Training students in MERN Stack, iOS, Android, and Digital Marketing.",
    copyrightText: "© 2026 IT HUNT Institute of Computer Technology & IT Solutions. All rights reserved."
  }
};

// Make accessible globally
if (typeof window !== 'undefined') {
  window.CONTENT_DATA = CONTENT_DATA;
  if (typeof window.applyEnvToContent === 'function') {
    window.applyEnvToContent();
  }
}

export { CONTENT_DATA };
export default CONTENT_DATA;
