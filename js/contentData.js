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

  // Header Navigation Items
  navigation: [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "internships", label: "IT Internships", icon: "🚀" },
    { id: "courses", label: "Courses", icon: "📚" },
    { id: "reviews", label: "Reviews & Ratings", icon: "⭐" },
    { id: "admission", label: "Apply Portal", icon: "📝" }
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
        icon: '<svg viewBox="0 0 170 170" width="32" height="32" fill="currentColor" style="display:block;margin:auto;"><path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.03-7.6-7.85-11.77-14.44-6-9.43-10.74-20.47-14.23-33.12-3.48-12.65-5.23-24.51-5.23-35.59 0-14.7 3.59-26.68 10.77-35.94 7.18-9.25 16.33-13.98 27.46-14.19 4.35 0 9.29 1.15 14.82 3.44 5.53 2.29 9.07 3.49 10.63 3.6 2.06-.33 5.92-1.68 11.58-4.06 5.66-2.38 10.68-3.44 15.06-3.18 10.1.66 18.3 4.16 24.6 10.51 6.3 6.35 10.37 13.95 12.21 22.8-8.92 5.39-13.29 12.87-13.11 22.44.18 8.16 3.38 15.09 9.6 20.79 6.22 5.7 13.52 9.02 21.9 9.96-1.74 5.88-3.92 12.01-6.53 18.39zM119.22 31.84c0-7.39 2.65-14.46 7.95-21.21 5.3-6.75 11.96-10.63 19.98-11.63.22 1.3.33 2.45.33 3.44 0 7.49-2.79 14.75-8.37 21.78-5.58 7.03-12.3 11.02-20.16 11.97-.22-1.09-.33-2.54-.33-4.35z"/></svg>',
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
        icon: '<svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" style="display:block;margin:auto;"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5896 8.4312 13.8564 8.077 12 8.077s-3.5896.3542-5.1368.8727L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/></svg>',
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

  // Director Spotlight Section
  director: {
    tagline: "DIRECTOR'S SPOTLIGHT",
    name: "Mr. Lakshman Singh Chauhan",
    title: "Director & Founder, IT HUNT | MCA (Computer Science)",
    image: "img/ithunt.jpg",
    message: "Our mission is to empower every candidate with market-ready IT skills. With our new IT Solutions Internship Center and experienced senior faculty (min 4+ years experience), we deliver unparalleled quality and hands-on production experience.",
    skills: ["Public Speaking Expert", "Motivational Speaker", "Life Coach", "Spoken English Mentor"]
  },

  // Team & Faculty Section
  teamSection: {
    tagline: "EXPERT TECH LEADERSHIP",
    titlePrefix: "Meet Our Senior ",
    titleGradient: "Instructors & Tech Mentors",
    description: "Dedicated tech leaders with minimum 4+ years industry and teaching experience.",
    members: [
      {
        id: 1,
        name: "Mr. Lakshman Singh Chauhan",
        role: "Director & Founder (4+ Yrs Leader)",
        bio: "Public speaking expert, motivational speaker, and life coach with MCA degree. Lead mentor in computer science & executive management.",
        image: "img/ithunt.jpg",
        skills: ["O/A Level", "MCA", "Public Speaking", "Life Coaching", "C/C++"]
      },
      {
        id: 2,
        name: "Anoop Mishra",
        role: "Software Developer & Senior Instructor (4+ Yrs Exp)",
        bio: "Full stack developer specializing in modern Java, Python, Web Engineering, and computer science core subjects.",
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
        name: "Anoop Mishra (4+ Yrs Exp)",
        role: "Software Developer & Senior Instructor",
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
    tagline: "HIRING PORTAL",
    titlePrefix: "Careers: ",
    titleGradient: "Teachers & Developers",
    description: "Looking for senior educators and technical mentors to lead our IT solutions venture.",
    mandatoryPolicyNotice: "⚠️ MANDATORY REQUIREMENT: Minimum 4+ Years Experience Required",
    jobOpenings: [
      {
        id: 1,
        shortTitle: "MERN Lead Trainer",
        title: "Senior MERN Stack Developer & Technical Trainer",
        type: "Full-Time / Part-Time",
        location: "Prayagraj / Hybrid",
        salary: "₹6.0L - ₹9.0L P.A.",
        description: "Lead our MERN stack internship track, mentor students on live web applications, conduct code reviews, and drive modern React/Node architecture."
      },
      {
        id: 2,
        shortTitle: "iOS Tech Mentor",
        title: "Senior iOS Mobile Application Instructor",
        type: "Full-Time / Part-Time",
        location: "Prayagraj / Remote",
        salary: "₹6.5L - ₹9.5L P.A.",
        description: "Guide interns through native iOS development, Swift, SwiftUI framework, Xcode debugging, and App Store submission processes."
      },
      {
        id: 3,
        shortTitle: "Android Instructor",
        title: "Senior Android Developer & Educator",
        type: "Full-Time",
        location: "Prayagraj / Hybrid",
        salary: "₹6.0L - ₹8.5L P.A.",
        description: "Instruct and mentor Android development interns on Kotlin, Jetpack Compose, clean MVVM architecture, and Play Store deployment."
      },
      {
        id: 4,
        shortTitle: "Digital Marketing Lead",
        title: "Senior Digital Marketing Lead & Educator",
        type: "Full-Time",
        location: "Prayagraj",
        salary: "₹4.5L - ₹7.0L P.A.",
        description: "Lead the Digital Marketing internship track, teaching SEO, Google Ads PPC, Meta Ads Manager, and growth hacking strategies."
      }
    ]
  },

  // Contact Information
  contact: {
    location: "📍Dahiyawa Holagarh(Near Mela Ground in Front of Kali Maa Mandir), Prayagraj (Allahabad), UP",
    phone: "📞 Mobile: +91 9795771806",
    rawPhone: "+91 9795771806",
    email: "✉️ Email: softtechithunt@gmail.com",
    rawEmail: "softtechithunt@gmail.com",
    districts: ["PRAYAGRAJ", "PRATAPGARH", "KAUSHAMBI", "GORAKHPUR", "LUCKNOW", "RAEBARELI", "VARANASI", "AMETHI"]
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
