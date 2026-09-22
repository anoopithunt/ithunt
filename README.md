# IT HUNT — Software Solutions & Tech Academy

> A Vue 3 and Node.js platform for technology education, internships, admissions, events, and software solutions.

[![Live Website](https://img.shields.io/badge/Live%20Website-ithunt.vercel.app-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://ithunt.vercel.app/)
[![Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anoopithunt/ithunt)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

## Overview

IT HUNT is a technology education and software solutions portal established in 2012 and based in Holagarh, Prayagraj, Uttar Pradesh, India. The website brings academy information and online workflows together in one responsive application.

The current platform supports:

- Technology courses and academic programmes
- Three- and six-month internship tracks
- Admissions and student information workflows
- Events, workshops, hackathons, and gallery content
- Careers and faculty/developer applications
- Contact and enquiry forms
- Certificates, projects, reviews, fees, and administrative workflows
- Dark/light theme support and responsive layouts

## Current programmes

### Internship tracks

1. MERN stack and cloud architecture
2. Native iOS development with Swift and SwiftUI
3. Native Android development with Kotlin and Jetpack Compose
4. Digital marketing, SEO, and growth marketing
5. Python, FastAPI, and applied generative AI

### Academic programmes

- NIELIT O Level
- NIELIT A Level
- BCA and MCA programmes

Programme content, navigation, events, faculty, reviews, and other public-facing content are maintained through the application's centralized content configuration.

## Technology stack

### Frontend

- Vue 3
- Vite
- JavaScript
- HTML5 and CSS3
- Responsive CSS and custom properties
- jsPDF/PDFKit-based document generation where applicable
- Vercel Analytics integration

### Backend and data

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs password hashing
- Nodemailer and Resend integrations for notifications
- QR-code and PDF generation utilities

### Deployment

The application is configured for Vercel deployment through `vercel.json`. The Vercel routing configuration serves the frontend and forwards API routes to the Node.js backend/serverless entry point.

## Project structure

```text
ithunt/
├── .github/workflows/       # CI/CD workflows
├── css/                     # Global styles and theme colors
├── img/                     # Logos, course, event, faculty, and gallery media
├── js/                      # Frontend configuration and content data
├── public/                  # Public assets and generated documentation
├── server/                  # Express API, database, seed, and utility scripts
├── src/                     # Vue application source (where applicable)
├── index.html               # Application entry point
├── package.json             # Scripts and dependencies
├── vercel.json              # Vercel routes and security headers
├── .env.example             # Environment variable template
└── README.md
```

> Directory contents may evolve as the frontend and backend continue to be consolidated. Use the repository tree as the authoritative source for newly added modules.

## Local development

### Prerequisites

- Node.js 18 or later
- npm
- MongoDB for API and database features

### Install

```bash
git clone https://github.com/anoopithunt/ithunt.git
cd ithunt
npm install
cp .env.example .env
```

Update `.env` with local values. Never commit `.env` or real credentials.

### Run the application

Start the Vite frontend:

```bash
npm run dev
```

Start the API in a second terminal:

```bash
npm run server:dev
```

The frontend is normally available at the Vite URL shown in the terminal, and the local API runs on the configured backend port (3000 by default).

### Useful scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production frontend build |
| `npm run preview` | Preview the production build locally |
| `npm run server` | Start the Express server |
| `npm run server:dev` | Start the server with Node watch mode |
| `npm run seed` | Seed local database data |
| `npm run db:verify` | Verify database connectivity/data |
| `npm run db:test` | Run database/table checks |
| `npm test` | Run the repository's current test command |
| `npm run pdf:api` | Generate API documentation PDF output |

## API capabilities

The backend provides REST workflows for the academy platform, including:

- Health checks and database status
- Authentication and current-user profiles
- Admissions and student records
- Courses and internship information
- Event registrations and RSVPs
- Career applications
- NIELIT project submissions
- Contact enquiries
- Reviews, fees, certificates, projects, and administrative statistics

The production API is exposed under `/api` on the deployed application. Local API URLs are controlled by environment variables rather than hardcoded deployment assumptions.

## Configuration

Start from `.env.example`. Important configuration areas include:

- Application identity and branding
- Contact and leadership information
- Backend port and MongoDB connection string
- API base URLs
- JWT configuration
- Email and notification providers
- Theme and feature flags
- Optional SMS and form-provider integrations

### Security requirements

Before deploying:

1. Replace every development credential and placeholder.
2. Generate a strong, unique `JWT_SECRET`.
3. Keep MongoDB credentials, SMTP credentials, API keys, and provider tokens in Vercel environment variables or another secret manager.
4. Do not expose server-only secrets through `VITE_*` variables.
5. Restrict MongoDB network access and create a least-privilege database user.
6. Configure production CORS, rate limiting, validation, logging, and backups.

## Current status

The repository currently provides a working academy portal with a Vue/Vite frontend, Express API, MongoDB integration, authentication dependencies, content-driven programme pages, admission/career workflows, and Vercel deployment configuration. The codebase is actively evolving, so API contracts and page structure should be validated against the implementation before integrating external clients.

## Future plan

The following roadmap is proposed for the next development stages.

### Phase 1 — Stabilize the foundation

- Add a real automated test suite for frontend components, API routes, authentication, and database operations.
- Add request validation, consistent API error responses, structured logging, and rate limiting.
- Add CI checks for linting, formatting, tests, build output, dependency vulnerabilities, and deployment previews.
- Remove duplicated configuration and document the canonical frontend/backend architecture.
- Add API versioning and publish an OpenAPI specification.

### Phase 2 — Improve the student experience

- Create student and applicant dashboards with application status tracking.
- Add secure document uploads for identity, certificates, and admission records.
- Add online fee collection, invoices, receipts, and payment status reconciliation.
- Provide downloadable digital certificates with QR verification.
- Add course progress, attendance, assignments, mentor feedback, and internship milestones.

### Phase 3 — Build a stronger administration platform

- Add role-based access control for super administrators, counsellors, faculty, mentors, and students.
- Add audit logs for sensitive changes and administrative actions.
- Add searchable student, admission, course, event, and career records with pagination and exports.
- Add a content management interface so authorized staff can update courses, events, faculty, reviews, and gallery content without code changes.
- Add dashboards for admissions, enrollment, attendance, placement, revenue, and campaign performance.

### Phase 4 — Expand learning and community features

- Launch a learning area with recorded lessons, quizzes, coding exercises, and assignment submissions.
- Add mentor/student messaging, announcements, notifications, and calendar scheduling.
- Add an alumni network, job board, referrals, and verified success stories.
- Add event registration passes, reminders, certificates of participation, and post-event resources.
- Add multilingual content, beginning with English and Hindi.

### Phase 5 — Scale the platform responsibly

- Move toward a clear modular Vue frontend and documented service boundaries.
- Add caching, background jobs, observability, backups, and disaster-recovery procedures.
- Improve accessibility toward WCAG 2.2 AA and optimize Core Web Vitals, SEO, and image delivery.
- Add privacy controls, consent management, data retention policies, and a documented security-incident process.
- Evaluate a mobile application or PWA after the web workflows and API contracts are stable.

## Contributing

1. Create a feature branch.
2. Keep changes focused and update documentation for API or environment changes.
3. Add or update tests for behavior changes.
4. Run `npm run build` and the relevant test/database checks locally.
5. Open a pull request describing the change, validation performed, and any migration or configuration requirements.

## License

This project is licensed under the ISC License. See `package.json` for the project metadata.

## Links

- Live website: https://ithunt.vercel.app/
- Repository: https://github.com/anoopithunt/ithunt
