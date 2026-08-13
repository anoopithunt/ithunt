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
        title: "Web Development (MERN Stack Developer)",
        duration: "3 Months / 6 Months",
        description: "Production-ready full stack engineering with MongoDB, Express.js, React.js, and Node.js. Build scalable SaaS APIs, microservices, and reactive front-ends.",
        stack: ["MongoDB", "Express", "React.js", "Node.js", "REST APIs", "Redux / Zustand"]
      },
      {
        id: 2,
        icon: "🍏",
        shortName: "iOS Development",
        title: "iOS Native App Development",
        duration: "3 Months / 6 Months",
        description: "Native iOS application engineering with Swift and SwiftUI. Learn Xcode, App Store guidelines, REST APIs integration, CoreData, and Apple UI design.",
        stack: ["Swift 5", "SwiftUI", "Xcode", "CoreData", "Combine"]
      },
      {
        id: 3,
        icon: "🤖",
        shortName: "Android Development",
        title: "Android Native App Development",
        duration: "3 Months / 6 Months",
        description: "Build high-performance native Android applications using Kotlin and Jetpack Compose. Learn MVVM architecture, Room database, and Google Play deployment.",
        stack: ["Kotlin", "Jetpack Compose", "Android Studio", "Retrofit", "MVVM"]
      },
      {
        id: 4,
        icon: "📈",
        shortName: "Digital Marketing",
        title: "Digital Marketing & Growth Hacking",
        duration: "3 Months / 6 Months",
        description: "Master data-driven marketing, Search Engine Optimization (SEO), Pay-Per-Click (PPC) campaigns, Meta Ads, social media strategy, and conversion optimization.",
        stack: ["SEO Strategy", "Google Ads PPC", "Meta Ads", "GA4 Analytics"]
      }
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
    location: "📍 Holagarh, Prayagraj (Allahabad), UP",
    phone: "📞 Mobile: +91 9795771806",
    rawPhone: "+91 9795771806",
    email: "✉️ Email: info@ithunt.edu.in",
    rawEmail: "info@ithunt.edu.in",
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
}
