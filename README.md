# 🚀 IT HUNT — Software Solutions & Tech Academy

> **Architecting Next-Gen Software & AI Solutions**

[![Live Website](https://img.shields.io/badge/Live%20Website-ithunt.vercel.app-00C7B7?style=for-the-badge\&logo=vercel\&logoColor=white)](https://ithunt.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge\&logo=github\&logoColor=white)](https://github.com/anoopithunt/ithun)
[![Node.js](https://img.shields.io/badge/Node.js-Native%20HTTP%20Server-339933?style=for-the-badge\&logo=node.js\&logoColor=white)](https://nodejs.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?style=for-the-badge\&logo=vue.js\&logoColor=white)](https://vuejs.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](https://opensource.org/licenses/ISC)

---

## 📌 Overview

**IT HUNT** is a Software Solutions & Tech Academy web portal focused on technology education, software-development services, internships, professional training, academic programs, events, admissions, career opportunities, testimonials, and alumni experiences.

The website combines two major objectives:

1. **Software Solutions** — presenting IT HUNT as a software development and technology solutions organization.
2. **Technology Academy** — providing practical training, internships, academic programs, technical workshops, and career-oriented learning.

The current website is designed around a production-focused technology education experience covering:

* MERN Stack Development
* iOS Development
* Android Development
* Digital Marketing
* Python & Generative AI
* NIELIT O Level
* NIELIT A Level
* BCA / MCA programs
* Technical events
* Hackathons
* AI workshops
* Placement activities
* Career opportunities

The project content identifies IT HUNT as being established in **2012** and based in **Holagarh, Prayagraj, Uttar Pradesh, India**.

---

# 🌟 Project Highlights

| Feature               | Description                                               |
| --------------------- | --------------------------------------------------------- |
| 🎓 Technology Academy | Practical IT education and career-oriented training       |
| 💻 Software Solutions | Software development and technology solutions positioning |
| 🚀 Internships        | 5 technical and professional internship tracks            |
| 📚 Courses            | NIELIT O/A Level and BCA/MCA programs                     |
| 🤖 AI Training        | Python, FastAPI, LLM, RAG and AI-agent focused learning   |
| 🍎 iOS Training       | Swift, SwiftUI, UIKit, CoreData and App Store workflows   |
| 🤖 Android Training   | Kotlin, Jetpack Compose, Room, MVVM and Play Store        |
| ⚛️ MERN Training      | React, Node.js, MongoDB, APIs, Docker and cloud           |
| 📈 Digital Marketing  | SEO, PPC, Meta Ads, GA4 and growth marketing              |
| 🎪 Events             | Hackathons, workshops, convocation and placement events   |
| 💼 Careers            | Technical trainer and developer opportunities             |
| 📝 Admission          | Online application portal                                 |
| 🌙 Theme              | Dark/light theme support                                  |
| 📱 Responsive UI      | Desktop, tablet and mobile layouts                        |
| ⚙️ Configuration      | Environment-based configuration                           |
| 🚀 Deployment         | Vercel-compatible Node.js server                          |

The current repository exposes these features through the main application and centralized content configuration.

---

# 🏗️ Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript
* Vue 3
* Responsive CSS
* CSS custom properties
* Client-side HTML-to-PDF generation

Vue 3 is currently loaded directly from the jsDelivr CDN rather than being bundled through Vite or another frontend build system.

### Frontend Libraries

```text
Vue 3
html2pdf.js
```

`html2pdf.js` is included for client-side PDF generation.

---

## Backend / Server

The project uses a lightweight **native Node.js HTTP server**.

Core Node.js modules include:

```text
http
fs
path
url
```

There is currently no Express dependency in `package.json`.

---

## Development Server

The repository includes a custom development server:

```text
dev-server.js
```

It provides:

* Static file serving
* `.env` loading
* MIME type handling
* Live reload support
* Server-Sent Events
* Automatic port fallback
* Environment configuration
* Local development support

---

## Deployment

The project includes:

```text
vercel.json
```

and is configured to deploy the Node.js application through Vercel.

---

# 📁 Project Structure

```text
ithun/
│
├── .github/
│   └── workflows/
│
├── css/
│   ├── styles.css
│   └── theme-colors.css
│
├── img/
│   ├── logos
│   ├── course images
│   ├── event images
│   ├── faculty images
│   ├── gallery images
│   └── other media
│
├── js/
│   ├── contentData.js
│   └── envConfig.js
│
├── .env.example
├── .gitignore
│
├── AboutUs.html
├── Events.html
├── Home.html
├── admission.html
├── admissionStyle.css
├── index.html
│
├── app.js
├── dev-server.js
├── env.js
│
├── package.json
├── package-lock.json
├── vercel.json
│
└── README.md
```

The current GitHub repository contains these principal directories and files, with the source organized around static frontend assets, centralized JavaScript data, a Node.js server, and deployment configuration.

---

# 🧠 Application Architecture

The current architecture is intentionally lightweight.

```text
                         ┌───────────────────────┐
                         │       Browser         │
                         │   HTML + CSS + Vue 3  │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │      index.html       │
                         │   Main Application    │
                         └───────────┬───────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
             ┌────────────┐   ┌────────────┐   ┌────────────┐
             │ Vue 3 CDN  │   │ CSS Theme  │   │ Environment│
             │            │   │ & Styles   │   │ Config     │
             └────────────┘   └────────────┘   └────────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │   contentData.js      │
                         │ Centralized Content   │
                         └───────────────────────┘

                                     ▲
                                     │
                         ┌───────────────────────┐
                         │      Node.js          │
                         │    HTTP Server        │
                         │       app.js          │
                         └───────────┬───────────┘
                                     │
                         ┌───────────▼───────────┐
                         │       Vercel          │
                         │ Serverless Deployment │
                         └───────────────────────┘
```

The primary application is implemented inside `index.html`, where Vue 3 handles reactive state, navigation, filtering, modals, forms, and dynamic rendering.

---

# 🧩 Centralized Content Architecture

One of the most important architectural components is:

```text
js/contentData.js
```

This file acts as the centralized content dictionary for the application.

It contains data for:

* Brand information
* Navigation
* Hero section
* Statistics
* Internship tracks
* Technologies
* Live projects
* Curriculum
* Internship roadmap
* Courses
* About section
* Director
* Faculty
* Reviews
* Careers
* Alumni
* Events
* Gallery
* Contact information

The file explicitly states that headings, titles, hero copy, badges, course details, internship tracks, team bios, reviews, career listings, and contact information are maintained centrally.

### Example

```javascript
const CONTENT_DATA = {
  brand: {
    name: "IT HUNT",
    nameHighlight: "HUNT",
    tagline: "Software Solutions & Tech Academy",
    establishedYear: "2012"
  }
};
```

This architecture makes content updates easier because much of the site's displayed content can be changed without modifying the HTML template.

---

# 🏠 Main Website

The main interface provides a single-page style experience with dynamic tabs/views.

Current navigation includes:

```text
🏠 Home
🚀 IT Internships
🎪 Events & Gallery
📚 Courses
📝 Apply Portal
```

These navigation entries are defined in `contentData.js`.

---

# 🏠 Home Experience

The home experience contains multiple sections.

## Hero Section

Includes:

* IT HUNT branding
* Software & AI positioning
* Internship CTA
* Admission CTA
* Production-code visual
* Technology highlights
* Career-focused messaging

The hero promotes 3-month and 6-month internships and highlights live projects, certification/LOR, and career support.

---

## Statistics

The current content configuration displays:

```text
5,000+   Engineers & Interns Trained
4.9 ★    Facility & Quality Review
100%     Live Client Projects
4+ Yrs   Senior Tech Instructors
```

These values are content-driven rather than hardcoded directly into the visual component.

---

# 🚀 IT Internship Portal

The internship section is one of the largest parts of the application.

The current repository contains **5 internship tracks**.

---

## 1. ⚛️ MERN Stack

### Program

**Web Development — MERN Stack & Cloud Architecture**

### Technologies

* MongoDB
* Express.js
* React.js
* Node.js
* TypeScript
* REST APIs
* GraphQL
* Redux / Zustand
* Docker
* Git/GitHub

### Topics

* Advanced JavaScript
* React architecture
* State management
* Node.js
* Express
* MongoDB
* REST APIs
* GraphQL
* JWT
* WebSockets
* Cloud deployment
* CI/CD

### Example Projects

* Enterprise SaaS CRM & Billing Portal
* Real-Time Collaborative Workspace
* E-Commerce Marketplace

The current content configuration describes this as a 3-month / 6-month track.

---

# 🍎 2. iOS Development

### Program

**iOS Native App Development — Swift & SwiftUI**

### Technologies

* Swift
* SwiftUI
* UIKit
* Xcode
* Combine
* CoreData
* SwiftData
* URLSession
* REST APIs
* APNs
* MapKit
* CoreLocation
* TestFlight
* App Store Connect
* Git/GitHub

### Example Projects

* Audio/Video Streaming App
* Fitness & Health Tracker
* On-Demand Delivery & Geolocation App

The repository's internship configuration includes Swift, SwiftUI, UIKit interoperability, modern concurrency, persistence, networking and App Store deployment topics.

---

# 🤖 3. Android Development

### Program

**Android Native App Development — Kotlin & Jetpack Compose**

### Technologies

* Kotlin
* Jetpack Compose
* Material 3
* Android Studio
* Retrofit
* OkHttp
* Room
* Coroutines
* Flow
* Firebase
* Hilt / Koin
* JUnit
* Espresso

### Architecture

* Clean Architecture
* MVVM
* Repository Pattern
* StateFlow
* ViewModel

### Example Projects

* Fintech Wallet & QR Payment App
* Ride-Booking & Navigation App
* News & Audio Podcast Hub

These technologies and project descriptions are defined in the current internship dataset.

---

# 📈 4. Digital Marketing

### Program

**Digital Marketing, SEO & Growth Hacking**

### Technologies & Platforms

* Technical SEO
* Google Search Console
* Google Ads
* Meta Ads
* LinkedIn Ads
* Google Analytics 4
* Google Tag Manager
* HubSpot
* Mailchimp
* Zapier
* Looker Studio
* SEMrush
* Canva
* AI Copywriting

### Topics

* Keyword research
* Technical SEO
* On-page SEO
* Off-page SEO
* PPC
* Meta Ads
* Analytics
* Conversion optimization
* Growth hacking
* Marketing automation

### Example Projects

* Lead-generation campaign
* E-Commerce SEO campaign
* Multi-channel marketing funnel

The repository currently defines this as one of the five internship tracks with both 3-month and 6-month options.

---

# 🐍 5. Python & Applied Generative AI

### Program

**Python, FastAPI & Applied Generative AI Engineering**

### Backend

* Python
* FastAPI
* AsyncIO
* SQLAlchemy
* Pydantic
* PostgreSQL
* Redis

### AI

* OpenAI APIs
* Claude APIs
* LangChain
* LlamaIndex
* Hugging Face
* ChromaDB
* Pinecone
* RAG
* Vector embeddings
* AI agents

### Data

* Pandas
* NumPy
* Matplotlib
* Scikit-Learn fundamentals
* Data processing pipelines

### Deployment

* Docker
* Git/GitHub
* AWS
* Vercel

### Example Projects

* Enterprise RAG AI Knowledge Assistant
* Autonomous AI Agent & Lead Extractor
* Analytics & Prediction API

The current content configuration specifically defines this fifth track and its AI-focused curriculum.

---

# 🛣️ Internship Roadmap

The internship program includes a four-stage roadmap:

```text
Phase 01
Foundation & Core Architecture
Month 1
        ↓
Phase 02
Advanced Full-Stack / Native APIs
Month 2
        ↓
Phase 03
Live Client Production Projects
Month 3
        ↓
Phase 04
Placement Drives & Mock Interviews
Month 4–6
```

The roadmap is defined centrally within `internshipVenture.roadmap`.

---

# 💡 Internship Features

The current content includes four major internship advantages:

### 🏢 Live Corporate Repositories

Practical work with production-oriented repositories, branches and pull requests.

### 👨‍💻 Senior Mentorship

Personalized debugging, code reviews and architecture guidance.

### 📜 Certification & LOR

Corporate completion certification and Letter of Recommendation positioning.

### 💼 Placement Support

Interview preparation, resume support, mock interviews and hiring referrals.

These features are defined in the internship content model.

---

# 📚 Courses & Academic Programs

The current project includes **three academic/program offerings**.

---

## 🎓 NIELIT "O" Level

### Duration

**1 Year / 2 Semesters**

### Topics

* IT Fundamentals
* HTML5
* CSS3
* Python
* IoT

---

## 🎓 NIELIT "A" Level

### Duration

**1 Year / 2 Semesters**

### Topics

* Data Structures
* C++
* DBMS
* SQL
* Computer Networks
* Software Engineering

---

## 🎓 BCA / MCA Programs

The project also presents:

**Subharti University Degree Courses**

including:

* BCA
* MCA
* Computer Architecture
* Object-Oriented Programming
* Operating Systems

The course information is maintained in `coursesSection.coursesList`.

---

# 🎪 Events & Gallery

The application contains a dedicated Events & Gallery section.

Current event categories include:

```text
🌟 All Events
💻 Hackathons & Bootcamps
🤖 AI & Tech Workshops
🏆 Convocation & Awards
💼 Placement Drives
🎉 Tech Fest & Expo
```

These categories are defined in the centralized event configuration.

---

## Current 2026 Events

### 💻 Grand TechFest & 24-Hour Code Hackathon

* Date: August 12–13, 2026
* Category: Hackathon
* Status: Completed
* 24-hour coding sprint
* 48 competing teams
* Production project demonstrations
* Cash prizes

The event dataset includes detailed agenda, gallery images, metrics, outcomes and participant information.

---

### 🤖 Applied Generative AI & Cloud Microservices Masterclass

* Date: July 26, 2026
* Category: AI & Tech Workshop
* Status: Completed
* FastAPI
* RAG
* Vector databases
* LLM architecture
* Docker
* Cloud deployment

The event content includes hands-on AI development, RAG implementation and cloud deployment activities.

---

### 🏆 Annual Convocation & Merit Awards

* Date: June 18, 2026
* Category: Convocation & Awards
* Status: Completed
* NIELIT programs
* Internship certifications
* Merit awards
* Alumni recognition

The event includes detailed agenda, gallery and outcomes data.

---

### 💼 Mega Campus Placement Drive

* Date: May 8, 2026
* Category: Placement Drive
* Status: Completed
* Corporate hiring
* Coding assessments
* Technical interviews
* HR rounds
* Job offers

The current dataset describes participation from 18 hiring companies and detailed placement-drive activities.

---

# 👨‍🏫 Faculty & Technical Leadership

The current faculty dataset includes four primary members:

| Member                     | Role                                    |
| -------------------------- | --------------------------------------- |
| Mr. Lakshman Singh Chauhan | Director & Founder                      |
| Anoop Mishra               | Software Developer & Senior Instructor  |
| Vikash Srivastav           | Institute Manager & Tally Specialist    |
| Achal Singh Chauhan        | Ethical Hacking & Cyber Security Mentor |

The faculty information, biographies, roles and skills are maintained centrally in `teamSection`.

---

# 👤 Director

**Mr. Lakshman Singh Chauhan**

**Director & Founder, IT HUNT**

The current content identifies him as an MCA Computer Science professional and describes his focus around technology education, public speaking, mentoring and career development.

---

# ⭐ Reviews & Feedback

The website includes a review and facility-evaluation section.

Current configured metrics include:

```text
Overall Score: 4.9 / 5

Computer Labs & Workstations        4.9
Faculty Expertise & Mentorship      5.0
Internship LOR & Placement Support  4.9
Curriculum & Development            4.8
```

The dataset also contains a configured label for **250+ verified reviews** and sample review entries.

> **Note:** These are application content values stored in the repository. They should be independently verified before being treated as externally audited statistics.

---

# 💼 Careers

The website includes a dedicated hiring portal.

Current openings include:

### Senior MERN Stack Developer & Technical Trainer

* Full-Time / Part-Time
* Prayagraj / Hybrid
* ₹6.0L – ₹9.0L P.A.

### Senior iOS Mobile Application Instructor

* Full-Time / Part-Time
* Prayagraj / Remote
* ₹6.5L – ₹9.5L P.A.

### Senior Android Developer & Educator

* Full-Time
* Prayagraj / Hybrid
* ₹6.0L – ₹8.5L P.A.

### Senior Digital Marketing Lead & Educator

* Full-Time
* Prayagraj
* ₹4.5L – ₹7.0L P.A.

The current career configuration specifies a **minimum 4+ years experience requirement**.

---

# 🎓 Alumni & Success Stories

The application includes an alumni section with:

* Alumni statistics
* Hiring partners
* Individual success stories
* Career transitions
* Packages
* Projects
* Ratings
* Verification indicators

Current configured headline metrics include:

```text
500+    Graduated Alumni
₹18.5L  Highest Package
₹6.2L   Average CTC
95%     Placement Rate
```

The project also includes a configured list of hiring-partner names.

> **Important:** These values are application content and should be verified independently before use as audited placement statistics.

---

# 📝 Admission Portal

The project includes an admission/application experience.

Configuration includes:

```text
ENABLE_ADMISSION_PORTAL
ADMISSION_API_ENDPOINT
```

The default API configuration points to:

```text
http://localhost:5500/api/admission
```

The actual production API should be configured through environment variables before deployment.

---

# 🔌 API Configuration

The frontend/server configuration currently supports these endpoint variables:

```env
API_BASE_URL=
ADMISSION_API_ENDPOINT=
JOB_APPLICATION_API_ENDPOINT=
REVIEWS_API_ENDPOINT=
```

Default development values are:

```text
http://localhost:5500/api
http://localhost:5500/api/admission
http://localhost:5500/api/careers/apply
http://localhost:5500/api/reviews
```

These values are configuration targets; the repository itself is primarily the portal/frontend plus its Node.js serving layer rather than a complete implementation of those external business APIs.

---

# ⚙️ Environment Configuration

The project provides:

```text
.env.example
```

The configuration covers:

### Server

```env
PORT=5500
HOST=localhost
NODE_ENV=development
```

### Branding

```env
APP_NAME="IT HUNT"
APP_NAME_HIGHLIGHT="HUNT"
APP_TAGLINE="Software Solutions & Tech Academy"
APP_TITLE="IT HUNT | Software Solutions & Tech Academy"
APP_ESTABLISHED_YEAR="2012"
```

### Contact

```env
CONTACT_PHONE=
CONTACT_RAW_PHONE=
CONTACT_EMAIL=
CONTACT_LOCATION=
WHATSAPP_NUMBER=
```

### Leadership

```env
DIRECTOR_NAME=
DIRECTOR_TITLE=
DIRECTOR_IMAGE=
```

### APIs

```env
API_BASE_URL=
ADMISSION_API_ENDPOINT=
JOB_APPLICATION_API_ENDPOINT=
REVIEWS_API_ENDPOINT=
```

### Feature Flags

```env
DEFAULT_THEME="dark"
ENABLE_LIVE_RELOAD=true
ENABLE_ANALYTICS=false
ENABLE_ADMISSION_PORTAL=true
ENABLE_CAREERS_PORTAL=true
```

These configuration keys are defined in `.env.example` and consumed by the Node.js environment configuration logic.

---

# 🔐 Environment & Security

## Never Commit Secrets

Do not commit:

```text
.env
API keys
Database passwords
JWT secrets
Private tokens
Cloud credentials
Payment credentials
```

Use:

```text
.env.example
```

as the safe configuration template.

---

## ⚠️ Client-Side Configuration

The application exposes configuration through:

```text
/env.js
/api/config
```

The Node.js server dynamically generates these responses from environment configuration.

Therefore:

> **Only public/non-sensitive configuration should ever be exposed through these endpoints.**

Private secrets must remain server-side.

---

# 🌐 Node.js Server

The production server is implemented in:

```text
app.js
```

The application uses Node's native HTTP functionality.

### Supported MIME Types

The server supports assets including:

```text
HTML
CSS
JavaScript
JSON
PNG
JPG
JPEG
GIF
SVG
ICO
WebP
WOFF
WOFF2
TTF
```

This is handled through a custom MIME mapping.

---

# 🔧 Dynamic Configuration Endpoints

## `/env.js`

Returns JavaScript configuration:

```javascript
window.ENV_CONFIG = {
  ...
};
```

## `/api/config`

Returns configuration as JSON:

```json
{
  "APP_NAME": "IT HUNT",
  "APP_TAGLINE": "Software Solutions & Tech Academy"
}
```

These routes are implemented directly inside `app.js`.

---

# 🔄 Development Server

The project includes:

```text
dev-server.js
```

Run it with:

```bash
npm run dev
```

The development server supports:

* Static file serving
* Environment loading
* Live reload
* Server-Sent Events
* MIME detection
* Automatic port fallback
* Local development workflow

---

# 📦 Installation

## Prerequisites

Install:

* Git
* Node.js 18+
* npm
* Modern web browser

Verify:

```bash
node --version
npm --version
git --version
```

---

## Clone Repository

```bash
git clone https://github.com/anoopithunt/ithun.git
```

Navigate:

```bash
cd ithun
```

Install dependencies:

```bash
npm install
```

The current project has a very small dependency footprint and currently lists `gh-pages` as its development dependency.

---

# ▶️ Run Locally

## Development

```bash
npm run dev
```

Default URL:

```text
http://localhost:5500
```

---

## Production Server

```bash
npm start
```

or:

```bash
npm run serve
```

The production entry point is:

```text
app.js
```

This is defined in `package.json`.

---

# 📜 NPM Scripts

Current scripts:

| Script  | Command                  | Purpose                   |
| ------- | ------------------------ | ------------------------- |
| `dev`   | `node dev-server.js`     | Development server        |
| `serve` | `node app.js`            | Production server         |
| `start` | `node app.js`            | Production start          |
| `build` | `echo 'Build complete!'` | Current placeholder build |
| `test`  | Node console command     | Current placeholder test  |

The current `build` and `test` scripts are placeholders rather than a frontend compilation or automated testing pipeline.

---

# 🧪 Testing Status

At present, the project does **not contain a full automated testing framework**.

The current test script is:

```bash
npm test
```

and resolves through a simple Node command that prints:

```text
✓ All tests passed!
```

Therefore, this should be treated as a placeholder rather than evidence of comprehensive automated test coverage.

### Recommended Future Testing

Consider adding:

* Vitest
* Jest
* Playwright
* Cypress
* Lighthouse
* axe-core

---

# 🚀 Vercel Deployment

The repository includes a Vercel configuration:

```text
vercel.json
```

Current configuration:

* Uses Vercel configuration version 2
* Enables clean URLs
* Disables trailing slashes
* Executes `app.js`
* Includes HTML files
* Includes CSS
* Includes JavaScript
* Includes images
* Adds security headers

The included assets are explicitly listed under the Vercel function configuration.

---

## Deploy with Vercel CLI

Install:

```bash
npm install -g vercel
```

Login:

```bash
vercel login
```

Deploy:

```bash
vercel
```

Production:

```bash
vercel --prod
```

---

# 🌍 Current Live Website

The GitHub repository currently links to:

```text
https://ithunt.vercel.app/
```

The GitHub repository itself is:

```text
https://github.com/anoopithunt/ithun
```

The live website is listed in the repository's About section.

---

# 🛡️ Security Headers

The Vercel configuration currently defines:

```text
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

These headers are configured globally through `vercel.json`.

### Recommended Additional Security

For a production system, consider:

* Content Security Policy
* Strict-Transport-Security
* Proper CORS restrictions
* Rate limiting
* Input validation
* CSRF protection
* API authentication
* Server-side authorization
* Secure cookie configuration
* Secret management
* API request monitoring

---

# 🎨 UI & UX

The application uses a modern technology-focused visual style.

## Design Characteristics

* Dark technology theme
* Gradient typography
* Glass-style cards
* Responsive layouts
* Technology badges
* Interactive cards
* CTA buttons
* Modal interfaces
* Mobile navigation
* Theme switching
* Event galleries
* Internship filtering
* Course cards
* Career cards

---

# 🌙 Dark / Light Mode

The application supports theme switching.

Default:

```env
DEFAULT_THEME="dark"
```

The UI includes a theme-toggle button that allows users to switch between dark and light presentation modes.

---

# 📱 Responsive Design

The application is designed to support:

* Desktop
* Laptop
* Tablet
* Mobile

Responsive behavior covers:

* Navigation
* Mobile drawer
* Hero section
* Internship cards
* Course cards
* Event cards
* Faculty cards
* Career cards
* Admission interface
* Modals
* CTA sections

The mobile navigation is implemented directly within the Vue application.

---

# 🔍 SEO

The main HTML document includes:

```html
<title>IT HUNT | Software Solutions & Tech Academy</title>
```

and a descriptive meta tag targeting:

* IT training
* Internships
* MERN
* iOS
* Android
* Digital Marketing
* NIELIT

The application also includes a favicon and semantic HTML structure.

---

# ⚡ Performance

The project uses a lightweight architecture:

```text
HTML
+
CSS
+
JavaScript
+
Vue 3 CDN
+
Native Node.js
```

This avoids a large frontend build dependency tree.

### Recommended Performance Enhancements

For production optimization:

* WebP/AVIF image conversion
* Responsive image sizes
* Lazy loading
* Image compression
* CSS minification
* JavaScript minification
* Static asset caching
* CDN optimization
* Brotli/Gzip compression
* Reduce third-party dependencies

---

# 🧰 Content Management Workflow

To update most website content:

```text
Open:
js/contentData.js
```

Then update the relevant section.

### Brand

```javascript
CONTENT_DATA.brand
```

### Navigation

```javascript
CONTENT_DATA.navigation
```

### Hero

```javascript
CONTENT_DATA.hero
```

### Internships

```javascript
CONTENT_DATA.internshipVenture
```

### Courses

```javascript
CONTENT_DATA.coursesSection
```

### Faculty

```javascript
CONTENT_DATA.teamSection
```

### Careers

```javascript
CONTENT_DATA.careersSection
```

### Events

```javascript
CONTENT_DATA.eventsSection
```

### Reviews

```javascript
CONTENT_DATA.reviewsSection
```

This centralized content approach is explicitly documented inside `contentData.js`.

---

# ➕ Adding a New Internship

Add a new object to:

```javascript
CONTENT_DATA.internshipVenture.tracks
```

Example:

```javascript
{
  id: 6,
  shortName: "Cloud & DevOps",
  title: "Cloud & DevOps Engineering",
  duration: "3 Months / 6 Months",
  badge: "☁️ Cloud Track",
  description: "Hands-on cloud and DevOps engineering training.",
  stack: [
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Terraform"
  ]
}
```

Make sure the object contains all properties expected by the Vue template.

---

# ➕ Adding a New Course

Add a new object to:

```javascript
CONTENT_DATA.coursesSection.coursesList
```

Example:

```javascript
{
  id: 4,
  code: "Cloud",
  title: "Cloud Computing Program",
  category: "technology",
  categoryName: "Professional Program",
  duration: "6 Months",
  certification: "Professional Certificate",
  image: "img/cloud-course.png",
  description: "Practical cloud engineering and deployment training.",
  topics: [
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD"
  ]
}
```

---

# ➕ Adding an Event

Add an object to the events list with:

```text
id
title
subtitle
category
categoryLabel
date
year
time
venue
status
coverImage
galleryImages
attendeeCount
chiefGuests
metrics
overview
agendaSchedule
highlights
outcomes
quotes
```

The existing event model uses this structure for detailed event pages and gallery presentation.

---

# 🐛 Troubleshooting

## Port 5500 Already in Use

Check:

```bash
lsof -i :5500
```

Stop the process:

```bash
kill -9 <PID>
```

Or change:

```env
PORT=5501
```

Then restart:

```bash
npm run dev
```

---

## Environment Configuration Not Updating

Verify:

```text
.env
.env.example
env.js
js/envConfig.js
```

Then restart:

```bash
npm run dev
```

---

## API Not Working

Verify:

```env
API_BASE_URL=
ADMISSION_API_ENDPOINT=
JOB_APPLICATION_API_ENDPOINT=
REVIEWS_API_ENDPOINT=
```

For local backend integration, confirm that the API server is actually running.

---

## Images Not Loading

Verify image paths against:

```text
img/
```

Example:

```javascript
image: "img/anoop.png"
```

Remember that Linux/Vercel environments can be case-sensitive.

---

# 🔒 Production Recommendations

Before treating the portal as a complete production platform, the following areas should be strengthened.

## 1. Real Automated Tests

Replace the placeholder test command with:

* Unit tests
* Integration tests
* E2E tests

## 2. Real Build Pipeline

The current build script is:

```bash
echo 'Build complete!'
```

A future migration to Vite or another build system could provide:

* Minification
* Bundling
* Tree shaking
* Code splitting
* Asset optimization

## 3. Backend APIs

Implement dedicated APIs for:

* Admission
* Career applications
* Reviews
* Authentication
* Student management

## 4. Database

Potential options:

```text
PostgreSQL
MongoDB
MySQL
```

## 5. Admin Dashboard

Allow authorized administrators to manage:

* Courses
* Internships
* Events
* Gallery
* Faculty
* Reviews
* Admissions
* Careers

## 6. Authentication

Introduce:

* Admin authentication
* Student authentication
* Role-based access control
* Secure sessions/JWT

---

# 🏆 Recommended Future Architecture

For a larger production platform, the project could evolve toward:

```text
                    ┌──────────────────────┐
                    │      Vue / Vite      │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      API Gateway     │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
   ┌────────────┐       ┌────────────┐       ┌────────────┐
   │ Admission  │       │ Careers    │       │ Reviews    │
   │ Service    │       │ Service    │       │ Service    │
   └──────┬─────┘       └──────┬─────┘       └──────┬─────┘
          │                    │                    │
          └────────────────────┼────────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │       Database       │
                    │ PostgreSQL / MongoDB │
                    └──────────┬───────────┘
                               │
                  ┌────────────┴────────────┐
                  ▼                         ▼
           ┌─────────────┐           ┌─────────────┐
           │ File / CDN  │           │ Notifications│
           │ Storage     │           │ Email/SMS    │
           └─────────────┘           └─────────────┘
```

---

# 🤝 Contributing

Contributions are welcome.

## 1. Fork

Fork the repository:

```bash
git fork https://github.com/anoopithunt/ithun
```

## 2. Clone

```bash
git clone <your-fork-url>
```

## 3. Create Branch

```bash
git checkout -b feature/your-feature
```

## 4. Install

```bash
npm install
```

## 5. Run

```bash
npm run dev
```

## 6. Make Changes

Follow the existing:

* Content architecture
* CSS structure
* Naming conventions
* Responsive design
* Environment configuration

## 7. Test

```bash
npm test
```

> The current test command is a placeholder and should not be considered full automated coverage.

## 8. Commit

```bash
git add .
git commit -m "feat: add your feature"
```

## 9. Push

```bash
git push origin feature/your-feature
```

## 10. Pull Request

Open a Pull Request against the project's main branch.

---

# 📄 License

This project currently declares:

```text
ISC License
```

in `package.json`.

Before redistributing the project, verify ownership and licensing requirements for:

* Source code
* Images
* Logos
* Fonts
* Third-party libraries
* Educational content
* Brand assets

---

# 📊 Project Status

**Current Status:** Active Development

### Current Capabilities

* [x] Responsive web portal
* [x] Vue 3 application
* [x] Centralized content dictionary
* [x] 5 internship tracks
* [x] MERN internship
* [x] iOS internship
* [x] Android internship
* [x] Digital Marketing internship
* [x] Python & Generative AI internship
* [x] NIELIT O Level
* [x] NIELIT A Level
* [x] BCA/MCA programs
* [x] Events & Gallery
* [x] Hackathon content
* [x] AI workshop content
* [x] Convocation content
* [x] Placement-drive content
* [x] Faculty section
* [x] Career section
* [x] Alumni section
* [x] Reviews section
* [x] Admission portal UI
* [x] Dark/light theme
* [x] Environment configuration
* [x] Native Node.js server
* [x] Development server
* [x] Vercel configuration
* [x] Security headers

---

# 📌 Repository Information

| Property         | Value                                     |
| ---------------- | ----------------------------------------- |
| Project          | IT HUNT Portal                            |
| Organization     | IT HUNT                                   |
| Type             | Software Solutions & Tech Academy         |
| Established      | 2012                                      |
| Primary Location | Holagarh, Prayagraj, Uttar Pradesh, India |
| Frontend         | HTML5, CSS3, JavaScript, Vue 3            |
| Server           | Native Node.js HTTP                       |
| Deployment       | Vercel                                    |
| Package Manager  | npm                                       |
| License          | ISC                                       |
| Repository       | `anoopithunt/ithun`                       |
| Live Website     | `ithunt.vercel.app`                       |

The repository's package metadata identifies the project as `ithunt-portal`, version `1.0.0`, with Node.js `app.js` as its main entry point.

---

# 🔗 Links

### 🌐 Live Website

https://ithunt.vercel.app/

### 💻 GitHub Repository

https://github.com/anoopithunt/ithun

---

# 📞 Contact Configuration

Contact information is configurable through environment variables:

```env
CONTACT_PHONE=
CONTACT_EMAIL=
CONTACT_LOCATION=
WHATSAPP_NUMBER=
```

The current repository also contains default contact values in its configuration files. For production deployments, maintain these values through the appropriate deployment environment configuration rather than hardcoding sensitive information.

---

# 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/anoopithunt/ithun.git

# Enter project
cd ithun

# Install dependencies
npm install

# Start development server
npm run dev
```

Open:

```text
http://localhost:5500
```

---

# 💡 Project Philosophy

IT HUNT's current platform is built around the idea of connecting:

```text
                 EDUCATION
                     │
                     ▼
              PRACTICAL SKILLS
                     │
                     ▼
              LIVE PROJECTS
                     │
                     ▼
             INDUSTRY EXPOSURE
                     │
                     ▼
              CAREER SUPPORT
                     │
                     ▼
               EMPLOYMENT
```

The platform combines technology education, software development, internships, academic programs, technical events, and career opportunities into a single digital experience.

---

<p align="center">

## 🚀 IT HUNT

### Software Solutions & Tech Academy

**Learn • Build • Innovate • Deploy • Grow**

Made with ❤️ for technology, education, software engineering, and innovation.

</p>
