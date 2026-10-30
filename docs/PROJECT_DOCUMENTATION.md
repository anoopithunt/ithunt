# IT HUNT Portal — Project Documentation

**Product:** IT HUNT Software Solutions & Tech Academy Portal  
**Repository:** `anoopithunt/ithunt`  
**Production site:** <https://ithunt.vercel.app/>  
**Documentation reviewed:** 30 October 2026

## 1. Purpose and scope

IT HUNT is a public education and training website with administrative and student workflows. It presents courses, internships, admissions, events, career opportunities, NIELIT project services, reviews, and contact information. The application also provides authenticated account and academic features for students and administrators.

This guide describes the checked-in application structure and operating workflows. Route handlers and environment configuration are the source of truth when implementation and older API examples differ.

## 2. Technology and runtime

| Area | Implementation |
| --- | --- |
| Browser application | Vue 3 single-page application |
| Build and development server | Vite 6 |
| Language and styling | JavaScript, HTML, CSS, Tailwind CSS |
| API | Node.js and Express |
| Database access | Mongoose and MongoDB |
| Authentication | JSON Web Tokens (`jsonwebtoken`), password hashing with `bcryptjs` |
| Email | Nodemailer and Resend integrations |
| Documents | jsPDF, PDFKit, QR-code utilities |
| Hosting configuration | Vercel rewrites and serverless API handler |

The browser application is served from the Vite build output (`dist`). The Express application is used directly for local development and is also imported by the Vercel function in `api/index.js`.

## 3. Repository map

```text
.
├── api/
│   └── index.js                 Vercel serverless API entry and request normalization
├── docs/                        Project documentation and generated report
├── public/                      Static images, manifest, robots and sitemap files
├── server/
│   ├── config/                  MongoDB connection configuration
│   ├── middleware/              Authentication, rate limits and role permissions
│   ├── models/                  Mongoose schemas
│   ├── routes/                  Express endpoint modules
│   ├── services/                Database adapter, mail and domain helpers
│   ├── server.js                Express application and local server entry
│   ├── bootstrap-superadmin.js  Interactive privileged-account bootstrap
│   └── generate-*.js            Database utilities and document generators
├── src/
│   ├── assets/css/              Global styles, theme and responsive refinements
│   ├── components/layout/       Navbar, footer and navigation
│   ├── components/modals/       Dialogs, previews and application flows
│   ├── components/sections/     Public, student and administrative screens
│   ├── data/                    Static content and academic data
│   ├── utils/                   API client, notifications and PDF helpers
│   ├── App.vue                  Application shell and section coordination
│   └── main.js                  Vue application bootstrap
├── .env.example                 Environment-variable names and placeholders
├── index.html                   SEO metadata and browser entry document
├── package.json                 Scripts and dependency manifest
├── vercel.json                  Build, rewrite and response-header configuration
└── vite.config.js               Vite plugins, local API proxy and build settings
```

### Main browser sections

The application shell in `src/App.vue` coordinates the home/hero, internships, events, courses, testimonials, reviews, careers, admissions, login, SuperAdmin, student portal, and NIELIT project screens. Shared layout and modal components are under `src/components/`. The public HTML entry contains the document title, canonical URL, social preview metadata, structured organization data, and a no-JavaScript fallback.

## 4. Request and data flow

1. A visitor loads the Vue application and static files from the site host.
2. Components call the shared API utilities in `src/utils/apiClient.js`.
3. During local development, `/api` is proxied to `http://127.0.0.1:3000` by Vite. The development configuration can start the backend when one is not already listening.
4. In production, `vercel.json` routes API paths to the Vercel function at `api/index.js`. That handler normalizes rewritten paths, retries database connection setup, and hands the request to the Express application.
5. `server/server.js` mounts API routers and shared middleware. Route handlers use `server/services/dbAdapter.js` to access Mongoose models.
6. MongoDB uses `MONGODB_ATLAS_URI` or `MONGODB_URI`; absent either, the connection configuration defaults to local MongoDB at `127.0.0.1:27017/ithunt`.
7. Email and PDF operations are handled by service modules and browser/server utilities as appropriate.

The configured Mongo database name is `ithunt`. The serverless handler responds with a retryable service-unavailable result when it cannot connect to MongoDB for a non-health request.

## 5. Functional areas

| Area | Primary screens / endpoints | Purpose |
| --- | --- | --- |
| Public learning catalog | Courses, internships, events | Present learning programs and institute activities |
| Admissions | `AdmissionSection.vue`; `/api/admissions` | Submit applications, generate acknowledgements, review and confirm admissions |
| Student services | `StudentPortalSection.vue`; `/api/students` | Student sign-in, profile, academic data and account actions |
| Administration | `SuperAdminSection.vue`; `/api/admin`, `/api/auth/users` | Manage admissions, students, courses and operational records |
| NIELIT projects | `NielitProjectSection.vue`; `/api/nielit-projects` | Submit and manage project-guide requests |
| Careers and internships | `/api/careers`, `/api/internships` | Receive and manage applications |
| Events and reviews | `/api/events`, `/api/reviews` | Publish event information, record RSVPs and manage reviews |
| Fees and certificates | `/api/fees`, `/api/certificates` | Record fee information and provide certificate lookup |
| Projects and contact | `/api/projects`, `/api/contact` | Accept project submissions and contact inquiries |
| Seasonal content | `/api/festival-wish` and `/api/festivals` | Read or administer festival content and presets |

## 6. API route directory

All paths below are mounted below `/api` (for example, `/api/auth/login`). Some integrations also use the root-path rewrites configured by Vercel. The route implementation and middleware determine the exact authorization requirements for each operation.

| Router | Implemented route patterns |
| --- | --- |
| Health | `GET /health`, `GET /` |
| Authentication and users | `POST /auth/login`, `/auth/forgot-password`, `/auth/reset-password`; `GET /auth/me`, `/auth/users`, `/auth`; account create/update/delete routes |
| Admissions | `GET /admissions`, `/admissions/:id`; `POST /admissions`, `/admissions/:id/confirm`; `PUT /admissions/:id`; `PATCH /admissions/:id/status`; `DELETE /admissions/:id` |
| Students | `GET /students`, `/students/:id`; `POST /students/register`, `/students/login`, `/students/:id/reset-password`, `/students/change-password`; profile and administrator update/delete routes |
| Courses | `GET /courses`, `/courses/:id`; `POST /courses`; `PUT /courses/:id`; `DELETE /courses/:id` |
| Events | `GET /events`, `/events/:id`, `/events/rsvps`; `POST /events`, `/events/rsvp`; event and RSVP delete routes; `PUT /events/:id` |
| NIELIT | `GET /nielit-projects`, `/nielit-projects/:id`; `POST /nielit-projects`; `PUT /nielit-projects/:id`; `DELETE /nielit-projects/:id` |
| Careers | `GET /careers`, `/careers/applications`; `POST /careers`, `/careers/apply`; application status and delete routes |
| Internships | `GET /internships`, `/internships/applications`; `POST /internships`, `/internships/apply`; status, update and delete routes |
| Reviews | `GET /reviews`, `/reviews/admin`; `POST /reviews`; approve and delete routes |
| Fees | `GET /fees`, `/fees/student/:studentId`; `POST /fees`, `/fees/record`; `PUT /fees/:id`; `DELETE /fees/:id` |
| Certificates | `GET /certificates`, `/certificates/verify`, `/certificates/verify/:certNo`; `POST /certificates`; `DELETE /certificates/:id` |
| Projects | `GET /projects`, `/projects/:id`; `POST /projects`, `/projects/submit`; `PUT /projects/:id`; `DELETE /projects/:id` |
| Contact | `GET /contact`; `POST /contact`; `DELETE /contact/:id` |
| Administration | `GET /admin/stats`, `/admin/users`, `/admin/role-permissions`; `PUT /admin/role-permissions` |
| Festival content | `GET /festival-wish`, `/festival-wish/presets`; `POST` and `PUT` update routes for each |

### Authentication notes

- Protected route handlers use the authentication middleware and, where required, administrator checks. Role-section permission checks are mounted for API requests and consult the `SystemSetting` record.
- Login and password-recovery requests are rate limited. Password-reset tokens are one-time, hashed before storage, and time limited.
- The SuperAdmin bootstrap command is an interactive administrative tool; do not seed production accounts with sample credentials.
- Configure a unique, randomly generated `JWT_SECRET` (at least 32 bytes) in every environment. The current checked-in authentication middleware includes a built-in fallback when the environment variable is absent; that fallback is not appropriate for production. Remove/replace it before relying on JWT signing in a production deployment, and rotate the key if it may have been used.
- Do not put bearer tokens, mail credentials, database credentials, or API keys in documentation, source control, or support requests.

### Existing API reference

`API_DOCUMENTATION.md` and the existing API PDF are legacy endpoint references. Because route behavior and payloads can change, verify details against `server/routes/` and `server/middleware/` before using older examples in a client or operational runbook.

## 7. Data model directory

Mongoose models are defined under `server/models/`.

| Model | Primary responsibility |
| --- | --- |
| `User` | Login identity, role, verification, status and password-reset state |
| `Admission` | Candidate application and admission decision state |
| `Student` | Student identity and academic profile |
| `Course` | Course catalog entries |
| `Event`, `EventRsvp` | Event content and attendee registrations |
| `Internship`, `JobApplication` | Internship and employment applications |
| `NielitProject` | NIELIT project-guide requests and review state |
| `Fee` | Student fee records |
| `Certificate` | Issued certificate information and verification |
| `Project` | Student project submissions |
| `ContactInquiry` | Website contact messages |
| `Review` | Submitted and moderated public reviews |
| `SystemSetting` | Role permissions and application settings |

`dbAdapter.js` centralizes common CRUD operations, identifier matching, field normalization, and Mongoose model selection. Review model constraints before altering identifiers or account/admission workflows.

## 8. Key workflows

### Admission submission and confirmation

1. An applicant submits the public admission form and creates an application in pending review.
2. The API records the application and associated account/student data as configured by the route.
3. An administrator reviews the application. The authenticated confirmation route updates the admission and synchronizes the associated student and user records.
4. The applicant signs in using the existing account password; confirmation does not need to expose or reset the password.

Check `server/routes/admissions.routes.js` and `server/services/admissionSubmission.js` for current validation and state transitions.

### Password recovery

1. The user submits an email through `/api/auth/forgot-password`.
2. The response is designed not to disclose whether an account exists.
3. For an eligible account, the system sends a one-time reset link with a time-limited token.
4. `/api/auth/reset-password` validates the token and replaces the password.

Configure production mail credentials and `PASSWORD_RESET_BASE_URL`; never log or forward reset tokens.

### Administrative provisioning

Use `npm run admin:bootstrap` in a trusted terminal to provision a SuperAdmin account. Configure the database URI and an administrator email as required by the bootstrap script. Choose a unique, high-entropy password and keep all credentials out of the repository.

## 9. Environment configuration

Copy `.env.example` to `.env` for local work, then replace placeholders with environment-specific values. `.env` is sensitive and must not be committed.

| Variable | Use |
| --- | --- |
| `NODE_ENV` | Runtime environment |
| `PORT`, `BACKEND_PORT`, `HOST` | Local/server listener configuration |
| `MONGODB_ATLAS_URI`, `MONGODB_URI` | MongoDB connection string (Atlas variable takes precedence) |
| `JWT_SECRET`, `JWT_EXPIRES_IN` | JWT signing key and token lifetime |
| `CORS_ORIGINS` | Comma-separated allowed browser origins |
| `VITE_API_URL`, `VITE_API_BASE_URL`, `API_BASE_URL` | Frontend/API endpoint configuration |
| `PASSWORD_RESET_BASE_URL` | Origin used in password reset links |
| `SMTP_USER`, `SMTP_PASS`, `ADMIN_EMAIL`, `RESEND_API_KEY` | Email delivery and administrative notifications |
| `SEED_ADMIN_PASSWORD`, `SEED_TEACHER_PASSWORD`, `SEED_STUDENT_PASSWORD` | Optional seed account passwords |
| `APP_*`, `CONTACT_*`, `DIRECTOR_*`, `COFOUNDER_*` | Public brand, contact and leadership details |
| `ENABLE_*`, `DEFAULT_THEME` | Optional feature and theme defaults |

The template may contain third-party integration settings. Treat every key as confidential; do not copy any value from the template into public issue reports or generated reports. Keep production credentials in the hosting provider's secret/environment-variable manager.

## 10. Local development and verification

### Requirements

- Node.js 18 or later
- npm
- MongoDB locally or a reachable MongoDB connection string

### Setup

```bash
git clone https://github.com/anoopithunt/ithunt.git
cd ithunt
npm install
cp .env.example .env
# Set local MongoDB and a unique JWT_SECRET in .env
npm run dev
```

The Vite server listens on port 5500 by default and proxies API requests to port 3000. The backend can also be started in a separate terminal with `npm run server:dev`.

### Common commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run server:dev` | Start Express with Node watch mode |
| `npm run server` | Start Express server |
| `npm run build` | Create production browser assets in `dist/` |
| `npm run preview` | Preview the production build |
| `npm test` | Run Node test files under server middleware and routes |
| `npm run admin:bootstrap` | Provision a SuperAdmin interactively |
| `npm run seed` | Run database seeding (configure unique seed passwords first) |
| `npm run db:start` | Start the local MongoDB daemon |
| `npm run db:verify` | Verify database connectivity |
| `npm run db:setup` | Run database setup utility |
| `npm run db:test` | Run database-table checks |
| `npm run pdf:api` | Generate the legacy API PDF |
| `npm run docs:pdf` | Regenerate the two-month project-change report |

## 11. Build, deployment and operations

Vercel uses `npm run build` and publishes `dist/`. API requests are rewritten to the serverless function. Configure production environment variables for MongoDB, JWT signing, allowed origins, and any enabled mail providers before deployment.

Recommended release checks:

1. Run `npm test` and `npm run build`.
2. Check `GET /api/health` and verify database/auth configuration status without exposing secrets.
3. Confirm Vercel rewrites and environment variables for the target environment.
4. Exercise authentication, admission submission/confirmation, password recovery, and major public forms with safe test accounts.
5. Check browser network errors and server logs; redact personal data and tokens before sharing logs.
6. Verify database backups and operational access before running cleanup or destructive scripts.

`firestore.rules`, Firebase configuration files, and Firebase-related utilities are present in the repository. The active server data path documented here is MongoDB/Mongoose; do not assume the Firebase artifacts are the live source of truth without checking the deployed configuration.

## 12. Security and maintenance guidance

- Keep secrets only in local ignored environment files or hosting-provider secret stores.
- Use a unique `JWT_SECRET` with at least 32 random bytes; remove the checked-in fallback in `server/middleware/auth.js` before production use.
- Use HTTPS for live traffic and rotate tokens/secrets after exposure.
- Protect administrative routes with the appropriate authentication and role checks; audit route-level middleware when adding endpoints.
- Preserve password hashing, reset-token hashing, rate-limit behavior, and generic recovery responses.
- Avoid placing personal data, tokens, or credentials in logs, examples, reports, and issue attachments.
- Run tests and a production build after modifying API contracts, account lifecycle, admission state, or shared styles.

## 13. Documentation and change history

- [API documentation source](../API_DOCUMENTATION.md) — legacy API reference; confirm against current source.
- [Two-month change history PDF](./IT_HUNT_Changes_August-October_2026.pdf) — full Git commit ledger and categorized summary for 30 August through 30 October 2026.
- Regenerate the change-history PDF with `npm run docs:pdf`.

The change report uses commits reachable from the current `HEAD` in the stated date window. It does not include local uncommitted work, remote branches not merged into `HEAD`, or GitHub activity without a commit in this repository.
