<template>
  <div>
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content anim-stagger-1">
          <div class="hero-badge">
            <span class="hero-badge-dot"></span>
            <span>{{ content.hero?.badgeText }}</span>
          </div>
          <h1 class="hero-title">
            {{ content.hero?.titlePrefix }}<span class="text-gradient">{{ content.hero?.titleGradient }}</span>
          </h1>
          <p class="hero-subtitle">
            {{ content.hero?.subtitle }}
          </p>

          <div class="hero-cta-group">
            <button class="btn-primary" @click="$emit('set-tab', 'internships')">
              <span>{{ content.hero?.primaryCtaText }}</span>
            </button>
            <button class="btn-secondary" @click="$emit('set-tab', 'admission')">
              <span>{{ content.hero?.secondaryCtaText }}</span>
            </button>
          </div>

          <!-- Quick Highlights Badges -->
          <div class="hero-highlights-row">
            <div class="hero-highlight-chip" v-for="hl in content.hero?.highlights" :key="hl">{{ hl }}</div>
          </div>
        </div>

        <!-- Software Code Terminal Visual -->
        <div class="hero-media-wrapper anim-stagger-2">
          <div class="code-terminal-card">
            <div class="code-terminal-header">
              <div class="terminal-dots">
                <div class="terminal-dot" style="background: #ef4444;"></div>
                <div class="terminal-dot" style="background: #f59e0b;"></div>
                <div class="terminal-dot" style="background: #10b981;"></div>
              </div>
              <div class="terminal-title">{{ content.hero?.codeSnippetHeader }}</div>
            </div>
            <div class="code-terminal-body">
              <span v-for="(line, idx) in content.hero?.codeSnippetLines" :key="idx" class="code-line">
                <span style="color: #64748b; margin-right: 12px; user-select: none;">{{ idx + 1 }}</span>
                <span>{{ line }}</span>
              </span>
            </div>
          </div>
          
          <div class="hero-floating-badge" style="bottom: -25px; right: 10px; left: auto;">
            <div class="hero-floating-icon">💼</div>
            <div>
              <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">{{ content.hero?.floatingBadgeTitle }}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">{{ content.hero?.floatingBadgeSubtitle }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Counter Section -->
    <div class="container stats-section reveal-on-scroll">
      <div class="stats-grid">
        <div class="stat-card" v-for="(stat, idx) in content.stats" :key="idx">
          <div class="stat-number" :class="stat.isGradientPrimary ? 'text-gradient' : 'text-gradient-secondary'">{{ animatedStats[idx] || stat.number }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- Internship Spotlight Banner -->
    <div class="container reveal-on-scroll reveal-delay-1" style="margin-bottom: 4rem;">
      <div class="internship-banner">
        <div>
          <span class="duration-pill">{{ content.internshipVenture?.spotlightBadge }}</span>
          <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; margin-bottom: 0.85rem;">
            {{ content.internshipVenture?.spotlightTitlePrefix }}<span class="text-gradient">{{ content.internshipVenture?.spotlightTitleGradient }}</span>
          </h2>
          <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 1.25rem; font-size: 0.95rem;">
            {{ content.internshipVenture?.spotlightDesc }}
          </p>
          <button class="btn-primary" @click="$emit('set-tab', 'internships')">
            {{ content.homeSpotlights?.internshipBanner?.ctaBtn || 'Apply for Internship Track →' }}
          </button>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div style="background: var(--bg-card-glass); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-cyber); text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 0.3rem;">⚡</div>
            <div style="font-weight: 800; font-size: 0.95rem;">{{ content.homeSpotlights?.internshipBanner?.track3MoTitle || '3-Month Track' }}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">{{ content.homeSpotlights?.internshipBanner?.track3MoDesc || 'Fast-track Skill Acceleration' }}</div>
          </div>
          <div style="background: var(--bg-card-glass); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-cyber); text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 0.3rem;">🚀</div>
            <div style="font-weight: 800; font-size: 0.95rem;">{{ content.homeSpotlights?.internshipBanner?.track6MoTitle || '6-Month Track' }}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">{{ content.homeSpotlights?.internshipBanner?.track6MoDesc || 'Complete Industry Masterclass' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Programs Preview -->
    <div class="container reveal-on-scroll reveal-delay-1" style="padding-bottom: 4rem;">
      <div class="section-header">
        <span class="section-tag">{{ content.coursesSection?.tagline }}</span>
        <h2 class="section-title">{{ content.coursesSection?.titlePrefix }}<span class="text-gradient">{{ content.coursesSection?.titleGradient }}</span></h2>
        <p class="section-subtitle">{{ content.coursesSection?.description }}</p>
      </div>

      <div class="courses-grid">
        <div class="course-card" v-for="course in content.coursesSection?.coursesList" :key="course.id">
          <div class="course-img-wrapper">
            <img :src="course.image" :alt="course.title" class="course-img" @error="onImgError">
            <span class="course-category-badge">{{ course.categoryName }}</span>
          </div>
          <div class="course-body">
            <h3 class="course-title">{{ course.title }}</h3>
            <p class="course-desc">{{ course.description }}</p>
            <div class="course-meta">
              <div class="course-meta-item">⏱️ {{ course.duration }}</div>
              <div class="course-meta-item">📜 {{ course.certification }}</div>
            </div>
            <button class="course-action-btn" @click="$emit('apply-course', course.title)">
              <span>{{ content.ui?.enrollCourseBtn || 'Enroll in Course →' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Campus Events & Hackathons Spotlight on Home Tab -->
    <div class="container reveal-on-scroll reveal-delay-2" style="padding-bottom: 4rem;">
      <div class="internship-banner" style="background: linear-gradient(135deg, rgba(249, 115, 22, 0.18), rgba(250, 204, 21, 0.12));">
        <div>
          <span class="duration-pill">{{ content.homeSpotlights?.eventsBanner?.pillBadge || '🎪 CAMPUS EVENTS & GALLERY 2026' }}</span>
          <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; margin-bottom: 0.85rem;">
            {{ content.homeSpotlights?.eventsBanner?.titlePrefix || 'Where Tech Innovation Meets ' }}<span class="text-gradient">{{ content.homeSpotlights?.eventsBanner?.titleGradient || 'Celebration' }}</span>
          </h2>
          <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 1.25rem; font-size: 0.95rem;">
            {{ content.homeSpotlights?.eventsBanner?.desc }}
          </p>
          <button class="btn-primary" @click="$emit('set-tab', 'events')">
            <span>{{ content.homeSpotlights?.eventsBanner?.ctaBtn || 'Explore Events & Media Gallery 🎪 →' }}</span>
          </button>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div style="background: var(--bg-card-glass); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-cyber); text-align: center; cursor: pointer;" @click="$emit('set-tab', 'events')">
            <div style="font-size: 1.5rem; margin-bottom: 0.3rem;">💻</div>
            <div style="font-weight: 800; font-size: 0.95rem;">{{ content.homeSpotlights?.eventsBanner?.box1Title || 'Hackathons' }}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">{{ content.homeSpotlights?.eventsBanner?.box1Desc || '24-Hr Coding Sprints' }}</div>
          </div>
          <div style="background: var(--bg-card-glass); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-cyber); text-align: center; cursor: pointer;" @click="$emit('set-tab', 'events')">
            <div style="font-size: 1.5rem; margin-bottom: 0.3rem;">🏆</div>
            <div style="font-weight: 800; font-size: 0.95rem;">{{ content.homeSpotlights?.eventsBanner?.box2Title || 'Convocation' }}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">{{ content.homeSpotlights?.eventsBanner?.box2Desc || 'Awards & Degrees' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 1. ABOUT US SECTION -->
    <div style="background: rgba(15, 23, 42, 0.4); border-top: 1px solid var(--border-cyber); padding: 4rem 0;">
      <div class="container">
        <div class="about-grid reveal-on-scroll">
          <div class="about-card-stack">
            <img :src="content.about?.mainImage" alt="IT HUNT Society" class="about-img-main" @error="onImgError" loading="lazy">
            <img :src="content.about?.subImage" alt="Computer Lab" class="about-img-sub" @error="onImgError" loading="lazy">
          </div>
          <div class="about-text-content">
            <span class="section-tag">{{ content.about?.tagline }}</span>
            <h2>{{ content.about?.titlePrefix }}<span class="text-gradient">{{ content.about?.titleGradient }}</span></h2>
            <p>{{ content.about?.description }}</p>

            <div class="about-features-list">
              <div class="about-feature-item" v-for="feat in content.about?.features" :key="feat">
                <span class="about-check-icon">✓</span> {{ feat.replace('✓ ', '') }}
              </div>
            </div>
          </div>
        </div>

        <!-- Executive Leadership Spotlight Grid -->
        <div class="leadership-spotlight-grid">
          <!-- Director Spotlight -->
          <div class="director-spotlight-card protected-img-wrapper">
            <div class="protected-img-overlay" @contextmenu.prevent></div>
            <img :src="content.director?.image" :alt="content.director?.name" class="director-img protected-img" draggable="false" @contextmenu.prevent @dragstart.prevent @error="onImgError">
            <div>
              <span class="section-tag">{{ content.director?.tagline }}</span>
              <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; margin-bottom: 0.3rem;">{{ content.director?.name }}</h3>
              <div style="color: var(--color-ai-cyan); font-weight: 700; margin-bottom: 0.65rem; font-size: 0.85rem; font-family: var(--font-mono);">{{ content.director?.title }}</div>
              <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 0.85rem; font-size: 0.9rem;">
                "{{ content.director?.message }}"
              </p>
              <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                <span class="skill-tag" v-for="sk in content.director?.skills" :key="sk">{{ sk }}</span>
              </div>
            </div>
          </div>

          <!-- Co-Founder Spotlight -->
          <div class="director-spotlight-card protected-img-wrapper" v-if="content.coFounder">
            <div class="protected-img-overlay" @contextmenu.prevent></div>
            <img :src="content.coFounder?.image" :alt="content.coFounder?.name" class="director-img protected-img" draggable="false" @contextmenu.prevent @dragstart.prevent @error="onImgError">
            <div>
              <span class="section-tag">{{ content.coFounder?.tagline }}</span>
              <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; margin-bottom: 0.3rem;">{{ content.coFounder?.name }}</h3>
              <div style="color: var(--color-ai-yellow); font-weight: 700; margin-bottom: 0.65rem; font-size: 0.85rem; font-family: var(--font-mono);">{{ content.coFounder?.title }}</div>
              <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 0.85rem; font-size: 0.9rem;">
                "{{ content.coFounder?.message }}"
              </p>
              <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                <span class="skill-tag" v-for="sk in content.coFounder?.skills" :key="sk">{{ sk }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. FACULTY TEAM SECTION -->
    <div style="padding: 4rem 0; border-top: 1px solid var(--border-cyber);">
      <div class="container">
        <div class="section-header reveal-on-scroll">
          <span class="section-tag">{{ content.teamSection?.tagline }}</span>
          <h2 class="section-title">{{ content.teamSection?.titlePrefix }}<span class="text-gradient">{{ content.teamSection?.titleGradient }}</span></h2>
          <p class="section-subtitle">{{ content.teamSection?.description }}</p>
        </div>

        <div class="team-grid">
          <div class="team-card" v-for="member in content.teamSection?.members" :key="member.id">
            <div class="team-avatar-wrapper">
              <img :src="member.image" :alt="member.name" class="team-avatar" @error="onImgError">
            </div>
            <h3 class="team-name">{{ member.name }}</h3>
            <div class="team-role">{{ member.role }}</div>
            <p class="team-bio">{{ member.bio }}</p>
            <div class="team-skills">
              <span class="skill-tag" v-for="skill in member.skills" :key="skill">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  content: {
    type: Object,
    required: true
  }
});

defineEmits(['set-tab', 'apply-course', 'open-job-modal']);

import { ref, onMounted, computed } from 'vue';

const animatedStats = ref([]);

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%231e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8">IT HUNT Center</text></svg>';
};
</script>
