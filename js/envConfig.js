/**
 * IT HUNT - Client-Side Environment Configuration Loader
 * Bridges .env variables with CONTENT_DATA and Vue runtime.
 */

(function () {
  // 1. Base Default Environment Configuration
  const defaultEnv = {
    PORT: "5500",
    HOST: "localhost",
    NODE_ENV: "development",
    APP_NAME: "IT HUNT",
    APP_NAME_HIGHLIGHT: "HUNT",
    APP_TAGLINE: "Software Solutions & Tech Academy",
    APP_TITLE: "IT HUNT | Software Solutions & Tech Academy",
    APP_ESTABLISHED_YEAR: "2012",
    APP_LOGO_IMAGE: "img/logo_ithunt.png",
    CONTACT_PHONE: "+91 9795771806",
    CONTACT_RAW_PHONE: "+919795771806",
    CONTACT_EMAIL: "info@ithunt.edu.in",
    CONTACT_LOCATION: "📍 Holagarh, Prayagraj (Allahabad), UP",
    WHATSAPP_NUMBER: "919795771806",
    DIRECTOR_NAME: "Mr. Lakshman Singh Chauhan",
    DIRECTOR_TITLE: "Director & Founder, IT HUNT | MCA (Computer Science)",
    DIRECTOR_IMAGE: "img/ithunt.jpg",
    API_BASE_URL: "http://localhost:3000/api",
    ADMISSION_API_ENDPOINT: "http://localhost:3000/api/admission",
    JOB_APPLICATION_API_ENDPOINT: "http://localhost:3000/api/careers/apply",
    REVIEWS_API_ENDPOINT: "http://localhost:3000/api/reviews",
    DEFAULT_THEME: "dark",
    ENABLE_LIVE_RELOAD: "true",
    ENABLE_ANALYTICS: "false",
    ENABLE_ADMISSION_PORTAL: "true",
    ENABLE_CAREERS_PORTAL: "true"
  };

  // Merge with window.ENV_CONFIG if already provided by /env.js
  window.ENV_CONFIG = Object.assign({}, defaultEnv, window.ENV_CONFIG || {});

  // Function to apply ENV to CONTENT_DATA
  function applyEnvToContent() {
    if (typeof window.CONTENT_DATA !== 'undefined') {
      const C = window.CONTENT_DATA;
      const E = window.ENV_CONFIG;

      // Brand
      if (E.APP_NAME) C.brand.name = E.APP_NAME;
      if (E.APP_NAME_HIGHLIGHT) C.brand.nameHighlight = E.APP_NAME_HIGHLIGHT;
      if (E.APP_TAGLINE) C.brand.tagline = E.APP_TAGLINE;
      if (E.APP_TITLE) C.brand.metaTitle = E.APP_TITLE;
      if (E.APP_ESTABLISHED_YEAR) C.brand.establishedYear = E.APP_ESTABLISHED_YEAR;
      if (E.APP_LOGO_IMAGE) C.brand.logoImage = E.APP_LOGO_IMAGE;

      // Contact
      if (E.CONTACT_PHONE) C.contact.phone = "📞 Mobile: " + E.CONTACT_PHONE.replace('📞 Mobile: ', '');
      if (E.CONTACT_RAW_PHONE) C.contact.rawPhone = E.CONTACT_RAW_PHONE;
      if (E.CONTACT_EMAIL) C.contact.email = "✉️ Email: " + E.CONTACT_EMAIL.replace('✉️ Email: ', '');
      if (E.CONTACT_LOCATION) C.contact.location = E.CONTACT_LOCATION;
      if (E.WHATSAPP_NUMBER) C.contact.whatsapp = E.WHATSAPP_NUMBER;

      // Director
      if (E.DIRECTOR_NAME) C.director.name = E.DIRECTOR_NAME;
      if (E.DIRECTOR_TITLE) C.director.title = E.DIRECTOR_TITLE;
      if (E.DIRECTOR_IMAGE) C.director.image = E.DIRECTOR_IMAGE;

      // API config
      C.api = {
        baseUrl: E.API_BASE_URL,
        admission: E.ADMISSION_API_ENDPOINT,
        jobApplication: E.JOB_APPLICATION_API_ENDPOINT,
        reviews: E.REVIEWS_API_ENDPOINT
      };

      // Features
      C.features = {
        analytics: E.ENABLE_ANALYTICS === 'true',
        admissionPortal: E.ENABLE_ADMISSION_PORTAL !== 'false',
        careersPortal: E.ENABLE_CAREERS_PORTAL !== 'false'
      };
    }
  }

  // Apply immediately
  applyEnvToContent();

  // Async fallback: If running on a static server without /env.js, try reading .env via fetch
  if (typeof window !== 'undefined' && window.fetch) {
    fetch('/.env')
      .then(res => {
        if (res.ok) return res.text();
        throw new Error('No static .env file found');
      })
      .then(text => {
        const lines = text.split('\n');
        lines.forEach(line => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) return;
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx !== -1) {
            const k = trimmed.substring(0, eqIdx).trim();
            let v = trimmed.substring(eqIdx + 1).trim();
            if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
              v = v.slice(1, -1);
            }
            window.ENV_CONFIG[k] = v;
          }
        });
        applyEnvToContent();
      })
      .catch(() => {
        // Fallback already loaded
      });
  }

  window.applyEnvToContent = applyEnvToContent;
})();
