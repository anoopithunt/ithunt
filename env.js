/**
 * IT HUNT - Static Environment Configuration Fallback
 */
if (typeof window !== 'undefined') {
  window.ENV_CONFIG = Object.assign({
    PORT: "5500",
    HOST: "localhost",
    NODE_ENV: "production",
    APP_NAME: "IT HUNT",
    APP_NAME_HIGHLIGHT: "HUNT",
    APP_TAGLINE: "Software Solutions & Tech Academy",
    APP_TITLE: "IT HUNT | Software Solutions & Tech Academy",
    APP_ESTABLISHED_YEAR: "2012",
    APP_LOGO_IMAGE: "img/logo_ithunt.png",
    CONTACT_PHONE: "+91 9795771806",
    CONTACT_RAW_PHONE: "+919795771806",
    CONTACT_EMAIL: "softtechithunt@gmail.com",
    CONTACT_LOCATION: "📍 Dahiyawa Holagarh(Near Mela Ground in Front of Kali Maa Mandir), Prayagraj (Allahabad), UP",
    WHATSAPP_NUMBER: "919795771806",
    DIRECTOR_NAME: "Mr. Lakshman Singh Chauhan",
    DIRECTOR_TITLE: "Director & Founder, IT HUNT | MCA (Computer Science)",
    DIRECTOR_IMAGE: "img/ithunt.jpg",
    API_BASE_URL: "http://localhost:5500/api",
    ADMISSION_API_ENDPOINT: "http://localhost:5500/api/admission",
    JOB_APPLICATION_API_ENDPOINT: "http://localhost:5500/api/careers/apply",
    REVIEWS_API_ENDPOINT: "http://localhost:5500/api/reviews",
    DEFAULT_THEME: "dark",
    ENABLE_LIVE_RELOAD: "false",
    ENABLE_ANALYTICS: "false",
    ENABLE_ADMISSION_PORTAL: "true",
    ENABLE_CAREERS_PORTAL: "true"
  }, window.ENV_CONFIG || {});
}
