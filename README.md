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
- `JWT_SECRET`
- `PORT` / `BACKEND_PORT`
- email notification credentials
- any third-party API keys

Never commit `.env` or production secrets to the repository.

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

Use these files to understand the exposed routes, payloads, and service behavior for the application backend.

## Deployment

The app is designed to be deployed on Vercel. The repository includes `vercel.json` for routing and configuration, and supports Vercel environment variables for secrets and production settings.

Recommended deployment checklist:

1. Set production environment variables in Vercel.
2. Use a secure MongoDB connection string.
3. Replace all default or sample credentials.
4. Set a strong `JWT_SECRET`.
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

