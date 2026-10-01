<template>
  <footer class="footer-section">

    <!-- ─── Stats Bar ─────────────────────────────────────────────── -->
    <div class="footer-stats-bar">
      <div class="container footer-stats-inner">
        <div class="footer-stat-item">
          <span class="footer-stat-num">500+</span>
          <span class="footer-stat-label">Students Trained</span>
        </div>
        <div class="footer-stat-divider"></div>
        <div class="footer-stat-item">
          <span class="footer-stat-num">4.9★</span>
          <span class="footer-stat-label">Average Rating</span>
        </div>
        <div class="footer-stat-divider"></div>
        <div class="footer-stat-item">
          <span class="footer-stat-num">6+</span>
          <span class="footer-stat-label">Tech Tracks</span>
        </div>
        <div class="footer-stat-divider"></div>
        <div class="footer-stat-item">
          <span class="footer-stat-num">100%</span>
          <span class="footer-stat-label">Placement Support</span>
        </div>
        <div class="footer-stat-divider"></div>
        <div class="footer-stat-item">
          <span class="footer-stat-num">2026</span>
          <span class="footer-stat-label">Batch Open</span>
        </div>
      </div>
    </div>

    <!-- ─── Main Grid ─────────────────────────────────────────────── -->
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

        <!-- Social Links -->
        <div class="footer-social-row">
          <a href="https://wa.me/919795771806?text=Hello%20IT%20HUNT%20Team!" target="_blank" rel="noopener noreferrer" class="footer-social-btn footer-social-whatsapp" aria-label="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="footer-social-btn footer-social-instagram" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" class="footer-social-btn footer-social-youtube" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" class="footer-social-btn footer-social-linkedin" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>

        <!-- Action Chips -->
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
          <li><a href="#" @click.prevent="$emit('set-tab', 'home')">🏠 Home Overview</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'internships')">💻 IT Internships (3/6 Mo)</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'events')">🎪 Events & Media Gallery</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'testimonials')">🌟 Alumni Testimonials</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'courses')">📚 Accredited Courses</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'careers')">💼 Careers & Faculty</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'reviews')">⭐ Reviews & Feedback</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'admission')">📝 Admission Portal</a></li>
          <li><a href="#" @click.prevent="$emit('open-cv-modal')" class="footer-link-highlight">📄 Generate CV (PDF)</a></li>
          <li><a href="/api/certificates/verify" target="_blank" class="footer-qr-verify-link">🔍 Verify Certificate</a></li>
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

        <!-- Tech Stack Badges -->
        <h4 style="margin-top: 1.5rem;">🛠 Tech Stack</h4>
        <div class="footer-tech-badges">
          <span class="footer-tech-badge">React</span>
          <span class="footer-tech-badge">Node.js</span>
          <span class="footer-tech-badge">MongoDB</span>
          <span class="footer-tech-badge">Swift iOS</span>
          <span class="footer-tech-badge">Android</span>
          <span class="footer-tech-badge">Python AI</span>
          <span class="footer-tech-badge">NIELIT</span>
        </div>
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

        <!-- Newsletter CTA -->
        <div class="footer-newsletter">
          <div class="footer-newsletter-label">📬 Stay Updated</div>
          <div class="footer-newsletter-row">
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="your@email.com"
              class="footer-newsletter-input"
              @keyup.enter="subscribeNewsletter"
            />
            <button class="footer-newsletter-btn" @click="subscribeNewsletter">→</button>
          </div>
          <p v-if="newsletterMsg" class="footer-newsletter-msg" :class="newsletterSuccess ? 'footer-newsletter-success' : 'footer-newsletter-error'">
            {{ newsletterMsg }}
          </p>
        </div>
      </div>
    </div>

    <!-- ─── Footer Bottom Bar ──────────────────────────────────────── -->
    <div class="container footer-bottom">
      <div class="footer-copyright-text">{{ content.footer?.copyrightText }}</div>
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center;">
        <a href="#" @click.prevent="$emit('set-tab', 'careers')">💼 Careers</a>
        <a href="#" @click.prevent="$emit('set-tab', 'reviews')">{{ content.ui?.reviewsAndRatings || '⭐ Reviews & Ratings' }}</a>
        <a href="#" @click.prevent="$emit('set-tab', 'events')">{{ content.ui?.eventsGallery || 'Events Gallery' }}</a>
        <a href="#" @click.prevent="$emit('set-tab', 'testimonials')">{{ content.ui?.alumniStories || 'Alumni Stories' }}</a>
        <a href="#" @click.prevent="$emit('open-privacy-policy')">{{ content.ui?.privacyPolicy || 'Privacy Policy' }} 📄</a>
        <a href="#" @click.prevent="$emit('open-terms-conditions')">{{ content.ui?.termsConditions || 'Terms & Conditions' }} 📜</a>
        <a href="#" @click.prevent="scrollToTop">{{ content.ui?.backToTop || '⬆ Back to Top' }}</a>
      </div>
    </div>

    <!-- ─── Recognition Bar ───────────────────────────────────────── -->
    <div class="footer-recognition-bar">
      <div class="container footer-recognition-inner">
        <span class="footer-recognition-label">🏆 As Seen On &amp; Featured By</span>
        <a href="https://productfame.com/products/it-hunt" target="_blank" rel="noopener noreferrer" class="footer-productfame-badge">
          <img src="https://productfame.com/badges/featured-light.svg" alt="Featured on ProductFame" width="200" height="44" />
        </a>
        <div class="footer-trust-chips">
          <span class="footer-trust-chip">🇮🇳 NIELIT Accredited</span>
          <span class="footer-trust-chip">🔐 SSL Secured</span>
          <span class="footer-trust-chip">✅ ISO Verified</span>
        </div>
      </div>
    </div>

  </footer>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  content: {
    type: Object,
    required: true
  }
});

defineEmits(['set-tab', 'open-privacy-policy', 'open-terms-conditions', 'open-cv-modal']);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="12" fill="%23f97316"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="900" fill="white">IT HUNT</text></svg>';
};

const newsletterEmail = ref('');
const newsletterMsg = ref('');
const newsletterSuccess = ref(false);

function subscribeNewsletter() {
  const email = newsletterEmail.value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newsletterMsg.value = '⚠️ Please enter a valid email address.';
    newsletterSuccess.value = false;
    return;
  }
  newsletterMsg.value = '✅ You\'re subscribed! We\'ll keep you posted.';
  newsletterSuccess.value = true;
  newsletterEmail.value = '';
  setTimeout(() => { newsletterMsg.value = ''; }, 4000);
}
</script>

<style scoped>
/* ── Stats Bar ─────────────────────────────────────────────────── */
.footer-stats-bar {
  background: linear-gradient(90deg, rgba(249,115,22,0.12) 0%, rgba(251,191,36,0.10) 50%, rgba(249,115,22,0.12) 100%);
  border-bottom: 1px solid rgba(249, 115, 22, 0.25);
  padding: 1.1rem 0;
}
.footer-stats-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
}
.footer-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  gap: 0.15rem;
}
.footer-stat-num {
  font-family: var(--font-heading);
  font-size: 1.45rem;
  font-weight: 900;
  background: var(--gradient-ai-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}
.footer-stat-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}
.footer-stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.12);
  flex-shrink: 0;
}

/* ── Social Row ────────────────────────────────────────────────── */
.footer-social-row {
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}
.footer-social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.06);
  color: #fff;
  transition: var(--transition-spring);
  text-decoration: none;
}
.footer-social-btn:hover {
  transform: translateY(-3px) scale(1.12);
}
.footer-social-whatsapp:hover { background: #25d366; border-color: #25d366; }
.footer-social-instagram:hover { background: linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); border-color: transparent; }
.footer-social-youtube:hover   { background: #ff0000; border-color: #ff0000; }
.footer-social-linkedin:hover  { background: #0077b5; border-color: #0077b5; }

/* ── Tech Badges ───────────────────────────────────────────────── */
.footer-tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.5rem;
}
.footer-tech-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  background: rgba(249,115,22,0.12);
  color: var(--color-ai-orange);
  border: 1px solid rgba(249,115,22,0.3);
  letter-spacing: 0.03em;
  transition: var(--transition);
}
.footer-tech-badge:hover {
  background: rgba(249,115,22,0.25);
  transform: translateY(-1px);
}

/* ── Highlight link ────────────────────────────────────────────── */
.footer-link-highlight {
  color: var(--color-ai-orange) !important;
  font-weight: 700 !important;
}

/* ── Newsletter ────────────────────────────────────────────────── */
.footer-newsletter {
  margin-top: 1.25rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  background: rgba(249,115,22,0.07);
  border: 1px solid rgba(249,115,22,0.2);
}
.footer-newsletter-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-ai-yellow);
  margin-bottom: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.footer-newsletter-row {
  display: flex;
  gap: 0.4rem;
}
.footer-newsletter-input {
  flex: 1;
  min-width: 0;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: var(--radius-sm);
  color: #fff;
  font-size: 0.82rem;
  padding: 0.45rem 0.75rem;
  outline: none;
  font-family: var(--font-body);
  transition: var(--transition);
}
.footer-newsletter-input::placeholder { color: rgba(255,255,255,0.4); }
.footer-newsletter-input:focus {
  border-color: var(--color-ai-orange);
  background: rgba(249,115,22,0.08);
}
.footer-newsletter-btn {
  background: var(--gradient-ai-btn);
  border: none;
  border-radius: var(--radius-sm);
  color: #fff;
  font-size: 1rem;
  font-weight: 900;
  width: 38px;
  cursor: pointer;
  transition: var(--transition-spring);
  flex-shrink: 0;
}
.footer-newsletter-btn:hover {
  transform: scale(1.1);
  filter: brightness(1.15);
}
.footer-newsletter-msg {
  font-size: 0.75rem;
  margin-top: 0.5rem;
  font-weight: 600;
}
.footer-newsletter-success { color: #34d399; }
.footer-newsletter-error   { color: #f87171; }

/* ── Recognition Bar ───────────────────────────────────────────── */
.footer-recognition-bar {
  border-top: 1px solid rgba(255,255,255,0.08);
  background: rgba(0,0,0,0.3);
  padding: 1.1rem 0;
}
.footer-recognition-inner {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: center;
}
.footer-recognition-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  flex-shrink: 0;
}
.footer-productfame-badge {
  display: inline-flex;
  align-items: center;
  opacity: 0.92;
  transition: var(--transition-spring);
  flex-shrink: 0;
}
.footer-productfame-badge:hover {
  opacity: 1;
  transform: translateY(-2px) scale(1.04);
}
.footer-trust-chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.footer-trust-chip {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.7rem;
  border-radius: var(--radius-full);
  background: rgba(16,185,129,0.1);
  color: #34d399;
  border: 1px solid rgba(16,185,129,0.3);
  letter-spacing: 0.03em;
}

/* ── Light Theme Overrides ─────────────────────────────────────── */
body.light-theme .footer-stats-bar {
  background: linear-gradient(90deg, rgba(249,115,22,0.07), rgba(251,191,36,0.06), rgba(249,115,22,0.07));
  border-bottom-color: rgba(249,115,22,0.18);
}
body.light-theme .footer-stat-label { color: #475569; }
body.light-theme .footer-stat-divider { background: rgba(0,0,0,0.1); }
body.light-theme .footer-social-btn {
  background: rgba(0,0,0,0.05);
  border-color: rgba(0,0,0,0.12);
  color: #111;
}
body.light-theme .footer-tech-badge {
  background: rgba(249,115,22,0.08);
  color: #c2410c;
  border-color: rgba(249,115,22,0.25);
}
body.light-theme .footer-newsletter {
  background: rgba(249,115,22,0.05);
  border-color: rgba(249,115,22,0.15);
}
body.light-theme .footer-newsletter-input {
  background: #fff;
  border-color: #e2e8f0;
  color: #111;
}
body.light-theme .footer-newsletter-input::placeholder { color: #94a3b8; }
body.light-theme .footer-newsletter-input:focus { border-color: var(--color-ai-orange); }
body.light-theme .footer-newsletter-label { color: #b45309; }
body.light-theme .footer-recognition-bar {
  background: #f1f5f9;
  border-top-color: #e2e8f0;
}
body.light-theme .footer-recognition-label { color: #475569; }
body.light-theme .footer-trust-chip {
  background: rgba(5,150,105,0.08);
  color: #065f46;
  border-color: rgba(5,150,105,0.25);
}

/* ── Responsive ────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .footer-stats-inner { gap: 0; justify-content: space-around; }
  .footer-stat-item { padding: 0 0.75rem; }
  .footer-stat-num { font-size: 1.15rem; }
  .footer-recognition-inner { flex-direction: column; text-align: center; }
}
</style>
