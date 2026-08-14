/**
 * Vercel Serverless Function: /api/config.js
 * Returns environment variables as JSON
 */

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  const envConfig = {
    PORT: process.env.PORT || "5500",
    HOST: process.env.HOST || "localhost",
    NODE_ENV: process.env.NODE_ENV || "production",
    APP_NAME: process.env.APP_NAME || "IT HUNT",
    APP_NAME_HIGHLIGHT: process.env.APP_NAME_HIGHLIGHT || "HUNT",
    APP_TAGLINE: process.env.APP_TAGLINE || "Software Solutions & Tech Academy",
    APP_TITLE: process.env.APP_TITLE || "IT HUNT | Software Solutions & Tech Academy",
    APP_ESTABLISHED_YEAR: process.env.APP_ESTABLISHED_YEAR || "2012",
    APP_LOGO_IMAGE: process.env.APP_LOGO_IMAGE || "img/logo_ithunt.png",
    CONTACT_PHONE: process.env.CONTACT_PHONE || "+91 9795771806",
    CONTACT_RAW_PHONE: process.env.CONTACT_RAW_PHONE || "+919795771806",
    CONTACT_EMAIL: process.env.CONTACT_EMAIL || "info@ithunt.edu.in",
    CONTACT_LOCATION: process.env.CONTACT_LOCATION || "📍 Holagarh, Prayagraj (Allahabad), UP",
    WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || "919795771806",
    DIRECTOR_NAME: process.env.DIRECTOR_NAME || "Mr. Lakshman Singh Chauhan",
    DIRECTOR_TITLE: process.env.DIRECTOR_TITLE || "Director & Founder, IT HUNT | MCA (Computer Science)",
    DIRECTOR_IMAGE: process.env.DIRECTOR_IMAGE || "img/ithunt.jpg",
    API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3000/api",
    ADMISSION_API_ENDPOINT: process.env.ADMISSION_API_ENDPOINT || "http://localhost:3000/api/admission",
    JOB_APPLICATION_API_ENDPOINT: process.env.JOB_APPLICATION_API_ENDPOINT || "http://localhost:3000/api/careers/apply",
    REVIEWS_API_ENDPOINT: process.env.REVIEWS_API_ENDPOINT || "http://localhost:3000/api/reviews",
    DEFAULT_THEME: process.env.DEFAULT_THEME || "dark",
    ENABLE_LIVE_RELOAD: "false",
    ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS || "false",
    ENABLE_ADMISSION_PORTAL: process.env.ENABLE_ADMISSION_PORTAL || "true",
    ENABLE_CAREERS_PORTAL: process.env.ENABLE_CAREERS_PORTAL || "true"
  };

  res.status(200).json(envConfig);
}
