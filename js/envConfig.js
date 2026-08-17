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
    CONTACT_EMAIL: "softtechithunt@gmail.com",
    CONTACT_LOCATION: "📍 Dahiyawa Holagarh(Near Mela Ground in Front of Kali Maa Mandir), Prayagraj (Allahabad), UP",
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
    if (typeof window.CONTENT_DATA !== 'undefined' && window.CONTENT_DATA) {
      const C = window.CONTENT_DATA;
      const E = window.ENV_CONFIG;

      const getVal = (key) => E[key] || E['VITE_' + key] || E['NEXT_PUBLIC_' + key] || E['REACT_APP_' + key];

      // Brand
      if (getVal('APP_NAME')) C.brand.name = getVal('APP_NAME');
      if (getVal('APP_NAME_HIGHLIGHT')) C.brand.nameHighlight = getVal('APP_NAME_HIGHLIGHT');
      if (getVal('APP_TAGLINE')) C.brand.tagline = getVal('APP_TAGLINE');
      if (getVal('APP_TITLE')) C.brand.metaTitle = getVal('APP_TITLE');
      if (getVal('APP_ESTABLISHED_YEAR')) C.brand.establishedYear = getVal('APP_ESTABLISHED_YEAR');
      if (getVal('APP_LOGO_IMAGE')) C.brand.logoImage = getVal('APP_LOGO_IMAGE');

      // Contact
      if (getVal('CONTACT_PHONE')) C.contact.phone = "📞 Mobile: " + getVal('CONTACT_PHONE').replace('📞 Mobile: ', '');
      if (getVal('CONTACT_RAW_PHONE')) C.contact.rawPhone = getVal('CONTACT_RAW_PHONE');
      if (getVal('CONTACT_EMAIL')) C.contact.email = "Email: " + getVal('CONTACT_EMAIL').replace('Email: ', '');
      if (getVal('CONTACT_LOCATION')) C.contact.location = getVal('CONTACT_LOCATION');
      if (getVal('WHATSAPP_NUMBER')) C.contact.whatsapp = getVal('WHATSAPP_NUMBER');

      // Director
      if (getVal('DIRECTOR_NAME')) C.director.name = getVal('DIRECTOR_NAME');
      if (getVal('DIRECTOR_TITLE')) C.director.title = getVal('DIRECTOR_TITLE');
      if (getVal('DIRECTOR_IMAGE')) C.director.image = getVal('DIRECTOR_IMAGE');

      // API config
      C.api = {
        baseUrl: getVal('API_BASE_URL'),
        admission: getVal('ADMISSION_API_ENDPOINT'),
        jobApplication: getVal('JOB_APPLICATION_API_ENDPOINT'),
        reviews: getVal('REVIEWS_API_ENDPOINT')
      };

      // Features
      C.features = {
        analytics: getVal('ENABLE_ANALYTICS') === 'true',
        admissionPortal: getVal('ENABLE_ADMISSION_PORTAL') !== 'false',
        careersPortal: getVal('ENABLE_CAREERS_PORTAL') !== 'false'
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
