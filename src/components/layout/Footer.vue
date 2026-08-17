<template>
  <footer class="footer-section">
    <div class="container footer-grid">
      <!-- Brand Column -->
      <div class="footer-col">
        <div class="brand-logo" style="margin-bottom: 1rem;">
          <img :src="content.brand?.logoImage" :alt="(content.brand?.name || 'IT HUNT') + ' Logo'" class="brand-logo-img" @error="onImgError">
          <div>
            <div class="brand-title" style="color: #ffffff;">IT <span class="text-gradient">{{ content.brand?.nameHighlight }}</span></div>
            <div class="brand-tagline" style="color: #ffffff; opacity: 0.85;">{{ content.brand?.tagline }}</div>
          </div>
        </div>
        <p style="font-size: 0.875rem; line-height: 1.7; color: #ffffff;">
          {{ content.footer?.aboutText }}
        </p>
        <div style="margin-top: 1.15rem;">
          <a href="#" @click.prevent="$emit('set-tab', 'reviews')" class="skill-tag" style="background: rgba(250, 204, 21, 0.15); color: var(--color-ai-yellow); border-color: rgba(250, 204, 21, 0.4); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.9rem; font-weight: 800; font-size: 0.825rem; border-radius: var(--radius-full);">
            {{ content.footerSections?.reviewRatingBadge || '⭐ Student Reviews & Ratings (4.9 / 5.0) →' }}
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
          <li><a href="#" @click.prevent="$emit('set-tab', 'reviews')">⭐ Reviews & Feedback</a></li>
          <li><a href="#" @click.prevent="$emit('set-tab', 'admission')">Admission Portal</a></li>
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
        <p style="font-size: 0.875rem; margin-bottom: 0.4rem; color: #ffffff;">📍 {{ content.contact?.location }}</p>
        <p style="font-size: 0.875rem; margin-bottom: 0.4rem; color: #ffffff;">📞 {{ content.contact?.phone }}</p>
        <p style="font-size: 0.875rem; margin-bottom: 1rem; color: #ffffff;">✉️ {{ content.contact?.email }}</p>
      </div>
    </div>

    <!-- Footer Bottom Bar -->
    <div class="container footer-bottom">
      <div style="color: #ffffff;">{{ content.footer?.copyrightText }}</div>
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
        <a href="#" @click.prevent="$emit('set-tab', 'reviews')">{{ content.ui?.reviewsAndRatings || '⭐ Reviews & Ratings' }}</a>
        <a href="#" @click.prevent="$emit('set-tab', 'events')">{{ content.ui?.eventsGallery || 'Events Gallery' }}</a>
        <a href="#" @click.prevent="$emit('set-tab', 'testimonials')">{{ content.ui?.alumniStories || 'Alumni Stories' }}</a>
        <a href="#">{{ content.ui?.privacyPolicy || 'Privacy Policy' }}</a>
        <a href="#">{{ content.ui?.termsConditions || 'Terms & Conditions' }}</a>
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

defineEmits(['set-tab']);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="12" fill="%23f97316"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="900" fill="white">IT HUNT</text></svg>';
};
</script>
