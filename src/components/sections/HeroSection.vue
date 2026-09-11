<template>
  <div>
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content anim-stagger-1">
          <div class="hero-badge">
            <span class="hero-badge-dot"></span>
            <span class="hero-badge-text">{{ content.hero?.badgeText }}</span>
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
              <div class="terminal-title" :title="content.hero?.codeSnippetHeader">{{ content.hero?.codeSnippetHeader }}</div>
            </div>
            <div class="code-terminal-body">
              <div v-for="(line, idx) in (content.hero?.codeSnippetLines || [])" :key="idx" class="code-line">
                <span class="code-line-num">{{ idx + 1 }}</span>
                <span class="code-line-content" v-html="highlightCode(line)"></span>
                <span v-if="idx === (content.hero?.codeSnippetLines?.length || 1) - 1" class="terminal-cursor"></span>
              </div>
            </div>
          </div>
          
          <div class="hero-floating-badge">
            <div class="hero-floating-icon">💼</div>
            <div class="hero-floating-text">
              <div class="hero-floating-title">{{ content.hero?.floatingBadgeTitle }}</div>
              <div class="hero-floating-sub">{{ content.hero?.floatingBadgeSubtitle }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Counter Section -->
    <div class="container stats-section reveal-on-scroll" ref="statsSectionRef">
      <div class="stats-grid">
        <div class="stat-card" v-for="(stat, idx) in content.stats" :key="idx">
          <div class="stat-number" :class="stat.isGradientPrimary ? 'text-gradient' : 'text-gradient-secondary'">{{ animatedStats[idx] || stat.number }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- Internship Spotlight Banner -->
    <div class="container reveal-on-scroll reveal-delay-1 home-section-spacer">
      <div class="internship-banner">
        <div>
          <span class="duration-pill">{{ content.internshipVenture?.spotlightBadge }}</span>
          <h2 class="spotlight-banner-heading">
            {{ content.internshipVenture?.spotlightTitlePrefix }}<span class="text-gradient">{{ content.internshipVenture?.spotlightTitleGradient }}</span>
          </h2>
          <p class="spotlight-banner-desc">
            {{ content.internshipVenture?.spotlightDesc }}
          </p>
          <button class="btn-primary banner-cta-btn" @click="$emit('set-tab', 'internships')">
            <span>{{ content.homeSpotlights?.internshipBanner?.ctaBtn || 'Apply for Internship Track →' }}</span>
          </button>
        </div>
        <div class="spotlight-sub-grid">
          <div class="spotlight-sub-card">
            <div class="spotlight-icon">⚡</div>
            <div class="spotlight-card-title">{{ content.homeSpotlights?.internshipBanner?.track3MoTitle || '3-Month Track' }}</div>
            <div class="spotlight-card-desc">{{ content.homeSpotlights?.internshipBanner?.track3MoDesc || 'Fast-track Skill Acceleration' }}</div>
          </div>
          <div class="spotlight-sub-card">
            <div class="spotlight-icon">🚀</div>
            <div class="spotlight-card-title">{{ content.homeSpotlights?.internshipBanner?.track6MoTitle || '6-Month Track' }}</div>
            <div class="spotlight-card-desc">{{ content.homeSpotlights?.internshipBanner?.track6MoDesc || 'Complete Industry Masterclass' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Programs Preview -->
    <div class="container reveal-on-scroll reveal-delay-1 home-section-spacer">
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
    <div class="container reveal-on-scroll reveal-delay-2 home-section-spacer">
      <div class="internship-banner events-spotlight-banner">
        <div>
          <span class="duration-pill">{{ content.homeSpotlights?.eventsBanner?.pillBadge || '🎪 CAMPUS EVENTS & GALLERY 2026' }}</span>
          <h2 class="spotlight-banner-heading">
            {{ content.homeSpotlights?.eventsBanner?.titlePrefix || 'Where Tech Innovation Meets ' }}<span class="text-gradient">{{ content.homeSpotlights?.eventsBanner?.titleGradient || 'Celebration' }}</span>
          </h2>
          <p class="spotlight-banner-desc">
            {{ content.homeSpotlights?.eventsBanner?.desc }}
          </p>
          <button class="btn-primary banner-cta-btn" @click="$emit('set-tab', 'events')">
            <span>{{ content.homeSpotlights?.eventsBanner?.ctaBtn || 'Explore Events & Media Gallery 🎪 →' }}</span>
          </button>
        </div>
        <div class="spotlight-sub-grid">
          <div class="spotlight-sub-card clickable" @click="$emit('set-tab', 'events')">
            <div class="spotlight-icon">💻</div>
            <div class="spotlight-card-title">{{ content.homeSpotlights?.eventsBanner?.box1Title || 'Hackathons' }}</div>
            <div class="spotlight-card-desc">{{ content.homeSpotlights?.eventsBanner?.box1Desc || '24-Hr Coding Sprints' }}</div>
          </div>
          <div class="spotlight-sub-card clickable" @click="$emit('set-tab', 'events')">
            <div class="spotlight-icon">🏆</div>
            <div class="spotlight-card-title">{{ content.homeSpotlights?.eventsBanner?.box2Title || 'Convocation' }}</div>
            <div class="spotlight-card-desc">{{ content.homeSpotlights?.eventsBanner?.box2Desc || 'Awards & Degrees' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 1. ABOUT US SECTION -->
    <div class="about-wrapper-band">
      <div class="container">
        <div class="about-grid reveal-on-scroll">
          <div class="about-card-stack">
            <img :src="content.about?.mainImage" alt="IT HUNT Society" class="about-img-main" @error="onImgError" loading="lazy">
            <img :src="content.about?.subImage" alt="Computer Lab" class="about-img-sub" @error="onImgError" loading="lazy">
          </div>
          <div class="about-text-content">
            <span class="section-tag">{{ content.about?.tagline }}</span>
            <h2 class="about-title">{{ content.about?.titlePrefix }}<span class="text-gradient">{{ content.about?.titleGradient }}</span></h2>
            <p class="about-desc">{{ content.about?.description }}</p>

            <div class="about-features-list">
              <div class="about-feature-item" v-for="feat in content.about?.features" :key="feat">
                <span class="about-check-icon">✓</span>
                <span>{{ feat.replace('✓ ', '') }}</span>
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
            <div class="director-info-body">
              <span class="section-tag">{{ content.director?.tagline }}</span>
              <h3 class="director-name">{{ content.director?.name }}</h3>
              <div class="director-title">{{ content.director?.title }}</div>
              <p class="director-message">
                "{{ content.director?.message }}"
              </p>
              <div class="director-skills">
                <span class="skill-tag" v-for="sk in content.director?.skills" :key="sk">{{ sk }}</span>
              </div>
            </div>
          </div>

          <!-- Co-Founder Spotlight -->
          <div class="director-spotlight-card protected-img-wrapper" v-if="content.coFounder">
            <div class="protected-img-overlay" @contextmenu.prevent></div>
            <img :src="content.coFounder?.image" :alt="content.coFounder?.name" class="director-img protected-img" draggable="false" @contextmenu.prevent @dragstart.prevent @error="onImgError">
            <div class="director-info-body">
              <span class="section-tag">{{ content.coFounder?.tagline }}</span>
              <h3 class="director-name">{{ content.coFounder?.name }}</h3>
              <div class="director-title cofounder-title">{{ content.coFounder?.title }}</div>
              <p class="director-message">
                "{{ content.coFounder?.message }}"
              </p>
              <div class="director-skills">
                <span class="skill-tag" v-for="sk in content.coFounder?.skills" :key="sk">{{ sk }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. FACULTY TEAM SECTION -->
    <div class="faculty-wrapper-band">
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
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
});

defineEmits(['set-tab', 'apply-course', 'open-job-modal']);

const statsSectionRef = ref(null);
const animatedStats = ref([]);
let observer = null;

// HTML Escaping Helper for Code Terminal
const escapeHtml = (text) => {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Syntax Highlighting Tokens
const highlightCode = (line) => {
  if (!line) return '&nbsp;';
  const trimmed = line.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('/*')) {
    return `<span class="code-comment">${escapeHtml(line)}</span>`;
  }
  let escaped = escapeHtml(line);
  // Strings
  escaped = escaped.replace(/(&#39;.*?&#39;|&#34;.*?&#34;|'.*?'|".*?")/g, '<span class="code-str">$1</span>');
  // Keywords
  escaped = escaped.replace(/\b(import|from|export|default|function|const|let|var|return)\b/g, '<span class="code-kw">$1</span>');
  // Functions & Components
  escaped = escaped.replace(/\b(useState|useEffect|SoftwareStudio|ITHuntSoftwareVenture|setTrack|setExperience)\b/g, '<span class="code-fn">$1</span>');
  // Attributes / Props
  escaped = escaped.replace(/\b(status|mode)\b/g, '<span class="code-prop">$1</span>');
  return escaped;
};

// Dynamic Easing Number Counter on Scroll
const startStatsAnimation = () => {
  const statsList = props.content?.stats || [];
  if (!statsList.length) return;

  const duration = 1600;
  const startTime = performance.now();

  const parsedStats = statsList.map(s => {
    const raw = String(s.number || '');
    if (raw.includes('4.9')) {
      return { target: 4.9, isFloat: true, suffix: ' ★' };
    }
    if (raw.includes('5,000') || raw.includes('5000')) {
      return { target: 5000, isFloat: false, formatComma: true, suffix: '+' };
    }
    if (raw.includes('100')) {
      return { target: 100, isFloat: false, suffix: '%' };
    }
    if (raw.includes('4')) {
      return { target: 4, isFloat: false, suffix: '+ Yrs' };
    }
    const match = raw.match(/([0-9.]+)/);
    if (match) {
      const val = parseFloat(match[1]);
      const suffix = raw.replace(match[1], '');
      return { target: val, isFloat: raw.includes('.'), suffix };
    }
    return { target: null, fallback: raw };
  });

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth easeOutExpo physics
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

    animatedStats.value = parsedStats.map(item => {
      if (item.target === null) return item.fallback;
      const current = item.target * ease;
      if (item.isFloat) {
        return current.toFixed(1) + item.suffix;
      }
      const intVal = Math.round(current);
      const formatted = item.formatComma ? intVal.toLocaleString('en-US') : String(intVal);
      return formatted + item.suffix;
    });

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

onMounted(() => {
  const statsList = props.content?.stats || [];
  animatedStats.value = statsList.map(s => s.number);

  if (typeof window !== 'undefined' && 'IntersectionObserver' in window && statsSectionRef.value) {
    let triggered = false;
    observer = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting && !triggered) {
        triggered = true;
        startStatsAnimation();
      }
    }, { threshold: 0.15 });
    observer.observe(statsSectionRef.value);
  } else {
    startStatsAnimation();
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%231e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8">IT HUNT Center</text></svg>';
};
</script>
