<template>
  <footer 
    class="footer-section ithunt-home-section" 
    id="page-footer"
    :class="{ 'home-footer-snap': activeTab === 'home' }"
  >

    <!-- ── Main 3-column grid ── -->
    <div class="container footer-grid">

      <!-- Brand + Socials -->
      <div class="footer-col footer-brand-col">
        <div class="brand-logo">
          <img :src="content.brand?.logoImage" :alt="(content.brand?.name || 'IT HUNT') + ' Logo'" class="brand-logo-img" @error="onImgError">
          <div>
            <div class="brand-title">IT <span class="text-gradient">{{ content.brand?.nameHighlight }}</span></div>
            <div class="brand-tagline">{{ content.brand?.tagline }}</div>
          </div>
        </div>
        <p class="footer-about-text">{{ content.footer?.aboutText }}</p>
        <div v-if="socialLinks.length" class="footer-social-row">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-social-btn"
            :aria-label="social.name"
          >
            {{ social.name }}
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-col footer-links-col">
        <h4>Quick Links</h4>
        <ul class="footer-links">
          <li><a href="#" @click.prevent="$emit('set-tab', 'home')">Home</a></li>
          <li><a href="/insights">Insights &amp; Guides</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'internships')">Internships</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'courses')">Courses</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'events')">Events</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'testimonials')">Alumni</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'reviews')">Reviews</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'careers')">Careers</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'admission')">Admission</a></li>
          <li><a href="#" @click.prevent="$emit('open-cv-modal')" class="footer-link-cta">Build a CV</a></li>
        </ul>
      </div>

      <div id="service-links" class="footer-col footer-services-col">
        <h4>Software Services</h4>
        <ul class="footer-links">
          <li v-for="service in servicePages" :key="service.slug">
            <a :href="`/services/${service.slug}`">{{ service.name }}</a>
          </li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="footer-col footer-contact-col">
        <h4>Contact & Location</h4>
        <p class="footer-contact-item">📍 {{ content.contact?.location }}</p>
        <a
          class="footer-contact-link footer-map-link"
          :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(content.contact?.location || 'IT HUNT Prayagraj')"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get directions ↗
        </a>
        <p class="footer-contact-item">
          📞 <a :href="'tel:' + (content.contact?.rawPhone || '+919795771806')" class="footer-contact-link">{{ content.contact?.phone || '+91-9795771806' }}</a>
        </p>
        <p class="footer-contact-item">
          ✉️ <a :href="'mailto:' + (content.contact?.rawEmail || 'softtechithunt@gmail.com')" class="footer-contact-link">{{ content.contact?.email || 'softtechithunt@gmail.com' }}</a>
        </p>
      </div>
    </div>

    <!-- ── Bottom bar ── -->
    <div class="container footer-bottom">
      <div class="footer-copyright-text">{{ content.footer?.copyrightText }}</div>
      <div class="footer-bottom-links">
        <a href="#" @click.prevent="$emit('open-privacy-policy')">Privacy Policy</a>
        <span class="footer-sep">·</span>
        <a href="#" @click.prevent="$emit('open-terms-conditions')">Terms & Conditions</a>
        <span class="footer-sep">·</span>
        <a href="#" @click.prevent="scrollToTop">⬆ Top</a>
      </div>
      <a href="https://productfame.com/products/it-hunt" target="_blank" rel="noopener noreferrer" class="footer-productfame-badge">
        <img src="https://productfame.com/badges/featured-light.svg" alt="Featured on ProductFame" width="160" height="36" />
      </a>
    </div>

  </footer>
</template>

<script setup>
import { SERVICE_PAGES } from '../../data/servicePages.js';
import { TRUST_PROOF } from '../../data/trustProof.js';

defineProps({
  content: { type: Object, required: true },
  activeTab: { type: String, default: 'home' }
});
defineEmits(['set-tab', 'open-privacy-policy', 'open-terms-conditions', 'open-cv-modal']);
const servicePages = SERVICE_PAGES;
const socialLinks = TRUST_PROOF.socialLinks.filter((social) => {
  try {
    const url = new URL(social.url);
    return social.name && (url.protocol === 'https:' || url.protocol === 'http:');
  } catch {
    return false;
  }
});

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="12" fill="%23f97316"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="900" fill="white">IT HUNT</text></svg>';
};
</script>

<style scoped>
/* ── Layout ── */
.footer-section {
  background: #0b0f19;
  border-top: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  padding: 3.5rem 0 0;
  color: #fff;
}

.home-footer-snap {
  min-height: calc(100vh - var(--navbar-height, 72px));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  scroll-margin-top: var(--navbar-height, 72px);
  box-sizing: border-box;
}

.footer-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(130px, 0.75fr) minmax(0, 1.25fr) minmax(0, 1.25fr);
  gap: 2rem;
  padding-bottom: 2.5rem;
}

/* ── Brand ── */
.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}
.brand-logo-img {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  object-fit: cover;
}
.brand-title {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
}
.text-gradient {
  background: var(--gradient-ai-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.brand-tagline {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-top: 0.1rem;
}
.footer-about-text {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* ── Socials ── */
.footer-social-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.footer-social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  text-decoration: none;
  transition: var(--transition-spring);
}
.footer-social-btn:hover { transform: translateY(-2px) scale(1.1); }
.footer-social-instagram:hover { background: linear-gradient(135deg,#f09433,#dc2743,#bc1888); border-color: transparent; }
.footer-social-youtube:hover   { background: #ff0000; border-color: #ff0000; }
.footer-social-linkedin:hover  { background: #0077b5; border-color: #0077b5; }

/* ── Column headings ── */
.footer-col h4 {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--color-ai-indigo, #6366f1);
  margin-bottom: 1rem;
}

/* ── Links ── */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.footer-links a {
  font-size: 0.855rem;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  transition: var(--transition);
}
.footer-links a:hover {
  color: var(--color-ai-indigo, #6366f1);
  padding-left: 4px;
}
.footer-link-cta {
  color: var(--color-ai-indigo, #6366f1) !important;
  font-weight: 700 !important;
}

/* ── Contact ── */
.footer-contact-item {
  font-size: 0.855rem;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 0.4rem;
  line-height: 1.5;
}

.footer-contact-link {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: rgba(99, 102, 241, 0.4);
  text-underline-offset: 3px;
  transition: all 0.2s ease;
}

.footer-contact-link:hover {
  color: var(--color-ai-indigo, #6366f1);
  text-decoration-color: var(--color-ai-indigo, #6366f1);
}

/* ── Bottom bar ── */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.1rem 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.footer-copyright-text {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.4);
}
.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.footer-bottom-links a {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: var(--transition);
}
.footer-bottom-links a:hover { color: var(--color-ai-indigo, #6366f1); }
.footer-sep { color: rgba(255, 255, 255, 0.2); font-size: 0.78rem; }

/* ── ProductFame badge ── */
.footer-productfame-badge {
  display: inline-flex;
  align-items: center;
  opacity: 0.85;
  transition: var(--transition-spring);
}
.footer-productfame-badge:hover {
  opacity: 1;
  transform: translateY(-2px) scale(1.04);
}

/* ── Light theme ── */
body.light-theme .footer-section {
  background: #f9fafb;
  border-top-color: #e5e7eb;
  color: #111827;
}
body.light-theme .brand-title { color: #111827; }
body.light-theme .footer-about-text { color: #4b5563; }
body.light-theme .footer-social-btn {
  background: rgba(0, 0, 0, 0.04);
  border-color: rgba(0, 0, 0, 0.08);
  color: #111827;
}
body.light-theme .footer-links a { color: #4b5563; }
body.light-theme .footer-links a:hover { color: var(--color-ai-indigo, #6366f1); }
body.light-theme .footer-contact-item { color: #4b5563; }
body.light-theme .footer-bottom { border-top-color: #e5e7eb; }
body.light-theme .footer-copyright-text { color: #6b7280; }
body.light-theme .footer-bottom-links a { color: #6b7280; }
body.light-theme .footer-bottom-links a:hover { color: var(--color-ai-indigo, #6366f1); }
body.light-theme .footer-sep { color: #cbd5e1; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .home-footer-snap {
    min-height: auto !important;
    scroll-snap-align: none !important;
    scroll-snap-stop: normal !important;
  }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
  .footer-section {
    padding-top: 2.25rem;
  }
  .footer-section .footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    align-items: start;
    column-gap: 1.25rem !important;
    row-gap: 1.25rem !important;
    padding-bottom: 1.5rem;
  }
  .footer-brand-col {
    grid-column: 1 / -1;
  }
  .footer-brand-col .brand-logo {
    margin-bottom: 0.65rem;
  }
  .footer-brand-col .footer-about-text {
    margin-bottom: 0.8rem;
  }
  .footer-col h4 {
    margin-bottom: 0.65rem;
  }
  .footer-links {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 0.45rem;
  }
  .footer-links li {
    min-width: 0;
  }
  .footer-links a {
    font-size: 0.9rem;
    line-height: 1.4;
  }
  .footer-contact-item {
    overflow-wrap: anywhere;
  }
  .footer-bottom { 
    flex-direction: column; 
    align-items: flex-start; 
    gap: 0.85rem; 
    padding: 1.25rem 0 2rem;
  }
  .footer-bottom-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    align-items: center;
  }
  .footer-productfame-badge img {
    max-width: 100%;
    height: auto;
  }
}
</style>
