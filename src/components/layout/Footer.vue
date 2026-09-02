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
        <p style="font-size: 0.875rem; line-height: 1.7; color: var(--text-muted);">
          {{ content.footer?.aboutText }}
        </p>
        <div style="margin-top: 1.15rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#" @click.prevent="$emit('set-tab', 'reviews')" class="skill-tag" style="background: rgba(250, 204, 21, 0.15); color: var(--color-ai-yellow); border-color: rgba(250, 204, 21, 0.4); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.9rem; font-weight: 800; font-size: 0.825rem; border-radius: var(--radius-full);">
            {{ content.footerSections?.reviewRatingBadge || '⭐ Student Reviews & Ratings (4.9 / 5.0) →' }}
          </a>
          <a href="#" @click.prevent="$emit('set-tab', 'careers')" class="skill-tag" style="background: rgba(249, 115, 22, 0.15); color: var(--color-ai-orange); border-color: rgba(249, 115, 22, 0.4); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.9rem; font-weight: 800; font-size: 0.825rem; border-radius: var(--radius-full);">
            💼 We Are Hiring (Teachers & Devs) →
          </a>
          <a href="#" @click.prevent="$emit('set-tab', 'login')" class="skill-tag" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border-color: rgba(16, 185, 129, 0.4); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.9rem; font-weight: 800; font-size: 0.825rem; border-radius: var(--radius-full);">
            🔐 SuperAdmin Portal →
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
          <li><a href="#" @click.prevent="$emit('set-tab', 'login')">🔐 SuperAdmin Console</a></li>
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
        <p style="font-size: 0.875rem; margin-bottom: 0.4rem; color: var(--text-muted);">📍 {{ content.contact?.location }}</p>
        <p style="font-size: 0.875rem; margin-bottom: 0.4rem; color: var(--text-muted);">📞 {{ content.contact?.phone }}</p>
        <p style="font-size: 0.875rem; margin-bottom: 0.8rem; color: var(--text-muted);">✉️ {{ content.contact?.email }}</p>
        <!-- WhatsApp Quick Contact -->
        <a 
          :href="'https://wa.me/' + (content.contact?.whatsapp || '919795771806') + '?text=Hello%20IT%20HUNT%20Team!'" 
          target="_blank" 
          rel="noopener noreferrer"
          style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: var(--radius-full); background: linear-gradient(135deg, rgba(37, 211, 102, 0.15), rgba(18, 140, 126, 0.1)); border: 1px solid rgba(37, 211, 102, 0.3); color: #25D366; font-size: 0.8rem; font-weight: 700; text-decoration: none; transition: all 0.25s;"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>

    <!-- Footer Bottom Bar -->
    <div class="container footer-bottom">
      <div style="color: var(--text-muted);">{{ content.footer?.copyrightText }}</div>
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
        <a href="#" @click.prevent="$emit('set-tab', 'careers')">💼 Careers</a>
        <a href="#" @click.prevent="$emit('set-tab', 'reviews')">{{ content.ui?.reviewsAndRatings || '⭐ Reviews & Ratings' }}</a>
        <a href="#" @click.prevent="$emit('set-tab', 'events')">{{ content.ui?.eventsGallery || 'Events Gallery' }}</a>
        <a href="#" @click.prevent="$emit('set-tab', 'testimonials')">{{ content.ui?.alumniStories || 'Alumni Stories' }}</a>
        <a href="#" @click.prevent="$emit('set-tab', 'login')">🔐 SuperAdmin</a>
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
