<template>
  <footer class="footer-section">
    <div class="container footer-grid">
      <!-- Brand Column -->
      <div class="footer-col">
        <div class="brand-logo" style="margin-bottom: 1rem;">
          <img :src="content.brand?.logoImage" :alt="(content.brand?.name || 'IT HUNT') + ' Logo'" class="brand-logo-img" @error="onImgError">
          <div>
            <div class="brand-title">IT <span class="text-gradient">{{ content.brand?.nameHighlight }}</span></div>
            <div class="brand-tagline">{{ content.brand?.tagline }}</div>
          </div>
        </div>
        <p class="footer-about-text">
          {{ content.footer?.aboutText }}
        </p>
        <div class="footer-action-chips">
          <a href="#" @click.prevent="$emit('set-tab', 'reviews')" class="footer-chip footer-chip-yellow">
            {{ content.footerSections?.reviewRatingBadge || '⭐ Student Reviews & Ratings (4.9 / 5.0) →' }}
          </a>
          <a href="#" @click.prevent="$emit('set-tab', 'careers')" class="footer-chip footer-chip-orange">
            💼 We Are Hiring (Teachers & Devs) →
          </a>
          <a href="#" @click.prevent="$emit('set-tab', 'admission')" class="footer-chip footer-chip-green">
            🎓 Apply for Admission →
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-col">
        <h4>{{ content.footerSections?.quickLinksTitle || 'Quick Links' }}</h4>
        <ul class="footer-links">
          <li><a href="#" @click.prevent="$emit('set-tab', 'home')">Home Overview</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'internships')">IT Internships (3/6 Mo)</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'events')">🎪 Events & Media Gallery</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'testimonials')">🌟 Alumni Testimonials & Achievements</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'courses')">Accredited Courses</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'careers')">💼 Careers & Faculty Openings</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'reviews')">⭐ Reviews & Feedback</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'admission')">Admission Portal</a></li>
          <li><a href="/api/certificates/verify" target="_blank" class="footer-qr-verify-link">🔍 Verify Certificate (QR Registry)</a></li>
        </ul>
      </div>

      <!-- Internship Tracks -->
      <div class="footer-col">
        <h4>{{ content.footerSections?.internshipsTitle || 'Internship Ventures' }}</h4>
        <ul class="footer-links">
          <li v-for="tr in content.internshipVenture?.tracks" :key="'foot-' + tr.id">
            <a href="#" @click.prevent="$emit('set-tab', 'internships')">{{ tr.shortName }} Track</a>
          </li>
        </ul>
      </div>

      <!-- Contact & Location -->
      <div class="footer-col">
        <h4>{{ content.footerSections?.contactTitle || 'Contact & Location' }}</h4>
        <p class="footer-contact-item">📍 {{ content.contact?.location }}</p>
        <p class="footer-contact-item">📞 {{ content.contact?.phone }}</p>
        <p class="footer-contact-item">✉️ {{ content.contact?.email }}</p>
        <!-- WhatsApp Quick Contact -->
        <a 
          :href="'https://wa.me/' + (content.contact?.whatsapp || '919795771806') + '?text=Hello%20IT%20HUNT%20Team!'" 
          target="_blank" 
          rel="noopener noreferrer"
          class="footer-whatsapp-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>

    <!-- Footer Bottom Bar -->
    <div class="container footer-bottom">
      <div class="footer-copyright-text">{{ content.footer?.copyrightText }}</div>
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
        <a href="#" @click.prevent="$emit('set-tab', 'careers')">💼 Careers</a>
        <a href="#" @click.prevent="$emit('set-tab', 'reviews')">{{ content.ui?.reviewsAndRatings || '⭐ Reviews & Ratings' }}</a>
        <a href="#" @click.prevent="$emit('set-tab', 'events')">{{ content.ui?.eventsGallery || 'Events Gallery' }}</a>
        <a href="#" @click.prevent="$emit('set-tab', 'testimonials')">{{ content.ui?.alumniStories || 'Alumni Stories' }}</a>
        <a href="#" @click.prevent="$emit('open-privacy-policy')">{{ content.ui?.privacyPolicy || 'Privacy Policy' }} 📄</a>
        <a href="#" @click.prevent="$emit('open-terms-conditions')">{{ content.ui?.termsConditions || 'Terms & Conditions' }} 📜</a>
        <a href="#" @click.prevent="scrollToTop">{{ content.ui?.backToTop || '⬆ Back to Top' }}</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  content: {
    type: Object,
    required: true
  }
});

defineEmits(['set-tab', 'open-privacy-policy', 'open-terms-conditions']);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="12" fill="%23f97316"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="900" fill="white">IT HUNT</text></svg>';
};
</script>

<style scoped>
.footer-section {
  padding: 4.5rem 0 2rem;
  transition: var(--transition);
}

:global(body.light-theme) .footer-section {
  background: #ffffff !important;
  border-top: 1px solid #e2e8f0 !important;
  color: #000000 !important;
  box-shadow: 0 -4px 20px rgba(15, 23, 42, 0.03);
}

:global(body:not(.light-theme)) .footer-section {
  background: #070a13 !important;
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #f8fafc !important;
}

.brand-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.3px;
  line-height: 1.1;
}

:global(body.light-theme) .brand-title {
  color: #000000 !important;
}

:global(body:not(.light-theme)) .brand-title {
  color: #ffffff !important;
}

.brand-tagline {
  font-size: 0.72rem;
  font-weight: 600;
  font-family: var(--font-mono);
}

:global(body.light-theme) .brand-tagline {
  color: #000000 !important;
}

:global(body:not(.light-theme)) .brand-tagline {
  color: #94a3b8 !important;
}

.footer-about-text {
  font-size: 0.875rem;
  line-height: 1.7;
  margin-top: 0.85rem;
}

:global(body.light-theme) .footer-about-text {
  color: #000000 !important;
}

:global(body:not(.light-theme)) .footer-about-text {
  color: #cbd5e1 !important;
}

.footer-col h4 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 1.15rem;
  letter-spacing: -0.2px;
}

:global(body.light-theme) .footer-col h4 {
  color: #000000 !important;
}

:global(body:not(.light-theme)) .footer-col h4 {
  color: #ffffff !important;
}

.footer-links a {
  text-decoration: none;
  font-size: 0.875rem;
  transition: var(--transition);
  display: inline-block;
}

:global(body.light-theme) .footer-links a {
  color: #000000 !important;
}

:global(body.light-theme) .footer-links a:hover {
  color: #ea580c !important;
  padding-left: 5px;
}

:global(body:not(.light-theme)) .footer-links a {
  color: #cbd5e1 !important;
}

:global(body:not(.light-theme)) .footer-links a:hover {
  color: #fbbf24 !important;
  padding-left: 5px;
}

.footer-qr-verify-link {
  font-weight: 700 !important;
}

:global(body.light-theme) .footer-qr-verify-link {
  color: #0284c7 !important;
}

:global(body:not(.light-theme)) .footer-qr-verify-link {
  color: #38bdf8 !important;
}

.footer-contact-item {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

:global(body.light-theme) .footer-contact-item {
  color: #000000 !important;
}

:global(body:not(.light-theme)) .footer-contact-item {
  color: #cbd5e1 !important;
}

.footer-whatsapp-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  border-radius: var(--radius-full);
  font-size: 0.825rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s;
  margin-top: 0.4rem;
}

:global(body.light-theme) .footer-whatsapp-btn {
  background: #dcfce7 !important;
  border: 1px solid #86efac !important;
  color: #15803d !important;
  box-shadow: 0 2px 8px rgba(22, 101, 52, 0.08);
}

:global(body.light-theme) .footer-whatsapp-btn:hover {
  background: #bbf7d0 !important;
  transform: translateY(-2px);
}

:global(body:not(.light-theme)) .footer-whatsapp-btn {
  background: rgba(37, 211, 102, 0.15) !important;
  border: 1px solid rgba(37, 211, 102, 0.4) !important;
  color: #25D366 !important;
}

:global(body:not(.light-theme)) .footer-whatsapp-btn:hover {
  background: rgba(37, 211, 102, 0.25) !important;
  transform: translateY(-2px);
}

/* Action Chips */
.footer-chip {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  font-weight: 800;
  font-size: 0.825rem;
  border-radius: var(--radius-full);
  max-width: 100%;
  line-height: 1.35;
  transition: var(--transition);
}

.footer-chip:hover {
  transform: translateY(-2px);
}

:global(body.light-theme) .footer-chip-yellow {
  background: #fef9c3 !important;
  color: #854d0e !important;
  border: 1.5px solid #facc15 !important;
}

:global(body.light-theme) .footer-chip-orange {
  background: #ffedd5 !important;
  color: #9a3412 !important;
  border: 1.5px solid #fb923c !important;
}

:global(body.light-theme) .footer-chip-green {
  background: #dcfce7 !important;
  color: #166534 !important;
  border: 1.5px solid #4ade80 !important;
}

:global(body:not(.light-theme)) .footer-chip-yellow {
  background: rgba(250, 204, 21, 0.18) !important;
  color: #fef08a !important;
  border: 1px solid rgba(250, 204, 21, 0.5) !important;
}

:global(body:not(.light-theme)) .footer-chip-orange {
  background: rgba(249, 115, 22, 0.18) !important;
  color: #fed7aa !important;
  border: 1px solid rgba(249, 115, 22, 0.5) !important;
}

:global(body:not(.light-theme)) .footer-chip-green {
  background: rgba(16, 185, 129, 0.18) !important;
  color: #a7f3d0 !important;
  border: 1px solid rgba(16, 185, 129, 0.5) !important;
}

.footer-bottom {
  padding-top: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
  flex-wrap: wrap;
  gap: 1rem;
}

:global(body.light-theme) .footer-bottom {
  border-top: 1px solid #e2e8f0 !important;
}

:global(body:not(.light-theme)) .footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.12) !important;
}

.footer-copyright-text {
  font-size: 0.85rem;
}

:global(body.light-theme) .footer-copyright-text {
  color: #000000 !important;
}

:global(body:not(.light-theme)) .footer-copyright-text {
  color: #94a3b8 !important;
}

.footer-bottom a {
  text-decoration: none;
  font-size: 0.85rem;
  transition: var(--transition);
}

:global(body.light-theme) .footer-bottom a {
  color: #000000 !important;
}

:global(body.light-theme) .footer-bottom a:hover {
  color: #ea580c !important;
}

:global(body:not(.light-theme)) .footer-bottom a {
  color: #cbd5e1 !important;
}

:global(body:not(.light-theme)) .footer-bottom a:hover {
  color: #fbbf24 !important;
}
</style>
