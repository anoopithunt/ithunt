<template>
  <section class="testimonials-page-section">
    <!-- 1. ALUMNI HERO HEADER BANNER -->
    <div class="alumni-hero-banner">
      <div class="container">
        <div class="internship-live-pill">
          <span class="pulse-dot"></span>
          <span>PROVEN TRACK RECORD • 500+ SUCCESSFUL ALUMNI WORLDWIDE</span>
        </div>

        <h1 class="internship-main-title">
          {{ content.testimonialsSection.titlePrefix }}<span class="text-gradient">{{ content.testimonialsSection.titleGradient }}</span>
        </h1>

        <p class="internship-main-desc">
          {{ content.testimonialsSection.description }}
        </p>

        <!-- 4-Metric Placement Key Stats Strip -->
        <div class="alumni-stats-ribbon">
          <div class="alumni-stat-card" v-for="(st, stIdx) in content.testimonialsSection.stats" :key="stIdx">
            <div class="alumni-stat-icon">{{ st.icon }}</div>
            <div class="alumni-stat-value text-gradient-gold">{{ st.value }}</div>
            <div class="alumni-stat-label">{{ st.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" style="padding: 3rem 1.5rem 5rem;">
      <!-- 2. HIRING PARTNERS STRIP -->
      <div class="alumni-partners-banner" v-if="content.testimonialsSection.hiringPartners">
        <div class="partners-label">Top Companies Hiring IT HUNT Alumni:</div>
        <div class="partners-logos-wrap">
          <span class="partner-pill" v-for="partner in content.testimonialsSection.hiringPartners" :key="partner">
            💼 {{ partner }}
          </span>
        </div>
      </div>

      <!-- 3. CATEGORY FILTER CAPSULES -->
      <div class="internship-filter-wrap" style="margin-bottom: 2.5rem;">
        <div class="internship-filter-capsule">
          <button 
            class="filter-capsule-btn" 
            :class="{ active: selectedCategory === 'all' }" 
            @click="selectedCategory = 'all'"
          >
            <span>All Alumni Stories</span>
            <span class="filter-count-badge" v-if="content.testimonialsSection.alumniList">{{ content.testimonialsSection.alumniList.length }}</span>
          </button>
          <button 
            class="filter-capsule-btn" 
            :class="{ active: selectedCategory === 'mern' }" 
            @click="selectedCategory = 'mern'"
          >
            <span>⚛️ MERN Full Stack</span>
          </button>
          <button 
            class="filter-capsule-btn" 
            :class="{ active: selectedCategory === 'ios' }" 
            @click="selectedCategory = 'ios'"
          >
            <span>🍎 iOS Swift</span>
          </button>
          <button 
            class="filter-capsule-btn" 
            :class="{ active: selectedCategory === 'android' }" 
            @click="selectedCategory = 'android'"
          >
            <span>🤖 Android Kotlin</span>
          </button>
          <button 
            class="filter-capsule-btn" 
            :class="{ active: selectedCategory === 'ai' }" 
            @click="selectedCategory = 'ai'"
          >
            <span>🐍 Python & AI</span>
          </button>
          <button 
            class="filter-capsule-btn" 
            :class="{ active: selectedCategory === 'diploma' }" 
            @click="selectedCategory = 'diploma'"
          >
            <span>📜 NIELIT Diplomas</span>
          </button>
        </div>
      </div>

      <!-- 4. ALUMNI TESTIMONIALS CARDS GRID -->
      <div class="alumni-cards-grid">
        <div class="alumni-card" v-for="alumni in filteredAlumni" :key="alumni.id">
          <!-- Card Header -->
          <div class="alumni-card-top">
            <div class="alumni-avatar-wrap">
              <img :src="alumni.avatar" :alt="alumni.name" class="alumni-avatar-img" @error="onImgError">
              <span class="alumni-verified-badge" title="Verified IT HUNT Alumni">✓ Verified</span>
            </div>
            <div class="alumni-user-info">
              <h3 class="alumni-name">{{ alumni.name }}</h3>
              <div class="alumni-role-company">
                <span class="alumni-company-tag">🏢 {{ alumni.company }}</span>
              </div>
              <div class="alumni-batch-tag">🎓 {{ alumni.batch }} • {{ alumni.track }}</div>
            </div>
          </div>

          <!-- Package Achievement Highlight Box -->
          <div class="alumni-achievement-strip">
            <div class="achievement-icon">🚀</div>
            <div>
              <div class="achievement-title">Placement & Salary Achievement:</div>
              <div class="achievement-val text-gradient-gold">{{ alumni.packageJump }}</div>
            </div>
          </div>

          <!-- Experience Story -->
          <div class="alumni-story-body">
            <div class="quote-symbol">“</div>
            <p class="alumni-story-text">{{ alumni.story }}</p>
          </div>

          <!-- Built Project Tag -->
          <div class="alumni-project-footer" v-if="alumni.projectBuilt">
            <span class="project-label">🛠️ Key Project Built:</span>
            <span class="project-val">{{ alumni.projectBuilt }}</span>
          </div>
        </div>
      </div>

      <!-- 5. CALL TO ACTION BOTTOM BANNER -->
      <div class="internship-bottom-cta" style="margin-top: 5rem;">
        <div class="cta-glow-backdrop"></div>
        <div class="cta-content-wrap">
          <div class="cta-badge-pill">NEXT BATCH ADMISSIONS OPEN</div>
          <h2 class="cta-headline">Want to Be Our Next <span class="text-gradient">Alumni Success Story?</span></h2>
          <p class="cta-subtext">
            Join our hands-on 3-Month or 6-Month IT Internship incubation in Prayagraj. Learn direct from senior MCA tech architects and build portfolio-worthy enterprise code.
          </p>
          <div class="cta-buttons-wrap">
            <button class="btn-primary cta-action-btn" @click="$emit('set-tab', 'admission')">
              <span>Start Admission Application</span> 📝 →
            </button>
            <button class="btn-secondary cta-whatsapp-btn" @click="$emit('set-tab', 'internships')">
              <span>Explore Internship Tracks</span> 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
});

defineEmits(['set-tab']);

const selectedCategory = ref('all');

const filteredAlumni = computed(() => {
  const list = props.content.testimonialsSection?.alumniList || [];
  if (selectedCategory.value === 'all') return list;
  return list.filter(a => a.category === selectedCategory.value);
});

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23f97316"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="900" fill="white">IT</text></svg>';
};
</script>
