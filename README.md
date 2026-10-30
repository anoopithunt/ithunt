# IT HUNT

> Software Solutions & Tech Academy Portal

[![Live Website](https://img.shields.io/badge/Live%20Website-ithunt.vercel.app-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://ithunt.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anoopithunt/ithunt)
[![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

IT HUNT is a full-stack education and software solutions platform built for a technology academy, internship programs, admissions, events, careers, and digital services. The project combines a modern Vue 3 frontend with an Express API and MongoDB-backed data layer to support the business and student workflows of the academy.

## Features

- Course, internship, and academic program information
- Admissions and student enquiry workflows
- Events, workshops, gallery, and promotional content
- Career and faculty application forms
- Contact and support enquiry handling
- Authentication and secure admin/user operations
- Email and notification integrations
- PDF, QR, and document-generation utilities
- Responsive dark/light themed UI

## Tech Stack

### Frontend

- Vue 3
- Vite
- JavaScript
- HTML5 and CSS3
- Responsive, theme-aware UI styling

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs password hashing
- Nodemailer and Resend integrations
- PDF and QR generation tools

### Deployment

- Vercel-ready project configuration
- Static frontend build via Vite
- Backend API routing and deployment config handled through `vercel.json`

## Project Structure

```text
ithunt/
├── .github/                  # GitHub workflows and automation
├── api/                      # API-related project assets
├── public/                   # Static assets and generated/public files
├── server/                   # Express server, DB utilities, seeds, and scripts
├── src/                      # Vue application source
├── .env.example              # Example environment configuration
├── .gitignore                # Git ignore rules
├── API_DOCUMENTATION.md      # API documentation
├── IT_HUNT_API_Documentation.pdf
├── firebase.json             # Firebase config
├── firestore.rules           # Firestore rules
├── index.html                # App entry point
├── package.json              # Dependencies and scripts
├── README.md                 # Project overview and setup guide
├── vercel.json               # Vercel deployment config
├── vite.config.js            # Vite configuration
├── package-lock.json         # Lockfile
└── .firebaserc               # Firebase project config
```

## Prerequisites

Before starting the project, make sure you have:

- Node.js 18 or later
- npm
- MongoDB running locally or a MongoDB connection URL available

## Local Setup

```bash
git clone https://github.com/anoopithunt/ithunt.git
cd ithunt
npm install
cp .env.example .env
```

Then update the values in `.env` with your local environment details, especially:

- `MONGODB_URI`
- `JWT_SECRET` — generate a unique secret with `openssl rand -hex 32`; authentication fails closed unless at least 32 bytes are configured.
- `PASSWORD_RESET_BASE_URL` — public app URL used in password reset links; local development can use `http://localhost:5500`.
- `SEED_ADMIN_PASSWORD`, `SEED_TEACHER_PASSWORD`, and `SEED_STUDENT_PASSWORD` — set unique passwords of at least 16 characters before running the seeder.
- `PORT` / `BACKEND_PORT`
- email notification credentials
- any third-party API keys

Never commit `.env` or production secrets to the repository.
Login requests are limited using MongoDB-backed counters shared across serverless instances. The API fails closed if this store is unavailable. Provisioned user accounts must have bcrypt-hashed passwords; old demo/default credentials are no longer accepted.

### Provision a SuperAdmin account

Run `npm run admin:bootstrap` from a trusted interactive terminal with `MONGODB_ATLAS_URI` or `MONGODB_URI` configured. The command defaults to `admin@ithunt.com` (override with `SUPERADMIN_EMAIL`), prompts twice for a new password without echoing it, and writes only the bcrypt hash to the `users` collection. Use a unique password of at least 16 characters. The command does not print, persist, or transmit the password.

Production login requires a unique `JWT_SECRET` (at least 32 bytes) configured in the hosting provider's Production environment. Never use a default or shared JWT secret.
Password recovery emails use `SMTP_USER` and `SMTP_PASS`; links expire after 30 minutes. Configure `PASSWORD_RESET_BASE_URL` as the public app URL (defaults to `https://ithunt.vercel.app`).

## Run the Project

### Start the frontend

```bash
npm run dev
```

### Start the backend API

```bash
npm run server:dev
```

### Start local MongoDB

```bash
npm run db:start
```

For the full app experience, run both the frontend and backend in separate terminals.

## Useful Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite frontend |
| `npm run build` | Build production assets |
| `npm run preview` | Preview the production build |
| `npm run server` | Start the Express server |
| `npm run server:dev` | Start the server in watch mode |
| `npm run seed` | Seed database data |
| `npm run db:start` | Start MongoDB locally |
| `npm run db:verify` | Verify database connectivity and data |
| `npm run db:setup` | Set up the required database configuration |
| `npm run db:test` | Run database checks |
| `npm run pdf:api` | Generate API documentation PDF output |
| `npm test` | Project's current verification script |

## Environment Configuration

The repository includes a starter template at `.env.example` with the main configuration points, including:

- app branding and contact information
- backend port and MongoDB connection
- JWT secret
- API base URLs
- email and notification settings
- feature toggles and theme-related settings

## API and Documentation

This project includes API documentation for the backend services:

- `API_DOCUMENTATION.md`
- `IT_HUNT_API_Documentation.pdf`
- [Full project documentation](docs/PROJECT_DOCUMENTATION.md)
- [Two-month change history PDF](docs/IT_HUNT_Changes_August-October_2026.pdf)

Use these files to understand the exposed routes, payloads, and service behavior for the application backend.
The API references are historical; verify current request behavior in `server/routes/` and `server/middleware/`.

## Deployment

The app is designed to be deployed on Vercel. The repository includes `vercel.json` for routing and configuration, and supports Vercel environment variables for secrets and production settings.

Recommended deployment checklist:

1. Set production environment variables in Vercel.
2. Use a secure MongoDB connection string.
3. Configure unique seeding passwords and rotate any previously used sample credentials.
4. Set a unique `JWT_SECRET` generated from a cryptographically secure random source.
5. Verify CORS, API routes, and frontend/backend compatibility before releasing.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Keep changes focused and document any config or API updates.
4. Run relevant validation such as `npm run build` and database checks.
5. Submit a pull request with a clear description of the changes.

## License

This project is licensed under the ISC License. See `package.json` for package metadata.

## Links

- Live website: https://ithunt.vercel.app/
- GitHub repository: https://github.com/anoopithunt/ithunt
