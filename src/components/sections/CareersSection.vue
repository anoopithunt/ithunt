<template>
  <section class="careers-page-section container" style="padding: 3rem 1.5rem 5rem;">
    <!-- 1. HERO HIRING HEADER -->
    <div class="careers-hero-banner anim-stagger-1">
      <div class="internship-live-pill">
        <span class="pulse-dot"></span>
        <span>{{ content.careersSection?.tagline || 'WE ARE HIRING 2026 • GROW YOUR CAREER WITH IT HUNT' }}</span>
      </div>

      <h1 class="internship-main-title">
        {{ content.careersSection?.titlePrefix }}<span class="text-gradient">{{ content.careersSection?.titleGradient }}</span>
      </h1>

      <p class="internship-main-desc">
        {{ content.careersSection?.description }}
      </p>

      <div style="margin-top: 1.25rem;">
        <span class="exp-badge-required">
          {{ content.careersSection?.mandatoryPolicyNotice }}
        </span>
      </div>

      <!-- Key Benefits Ribbon -->
      <div class="careers-benefits-ribbon reveal-on-scroll" v-if="content.careersSection?.benefits">
        <div class="career-benefit-card" v-for="(ben, bIdx) in content.careersSection.benefits" :key="bIdx">
          <div class="benefit-icon">{{ ben.icon }}</div>
          <div>
            <div class="benefit-title">{{ ben.title }}</div>
            <div class="benefit-desc">{{ ben.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. CONTROLS BAR: CATEGORY FILTER & SEARCH -->
    <div class="careers-controls-bar anim-stagger-2">
      <div class="internship-filter-capsule">
        <button 
          v-for="cat in (content.careersSection?.filterCategories || [{ id: 'all', label: 'All Vacancies' }])"
          :key="cat.id"
          class="filter-capsule-btn"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectedCategory = cat.id"
        >
          <span>{{ cat.label }}</span>
          <span class="filter-count-badge" v-if="cat.id === 'all'">{{ content.careersSection?.jobOpenings?.length || 0 }}</span>
        </button>
      </div>

      <div class="events-search-box" style="max-width: 380px;">
        <span class="events-search-icon">🔍</span>
        <input 
          type="text" 
          v-model="searchQuery" 
          class="events-search-input" 
          placeholder="Search role, skills, tech (e.g. MERN, Python, Swift)..."
        >
        <button 
          v-if="searchQuery" 
          class="events-search-clear" 
          @click="searchQuery = ''" 
          title="Clear search"
        >✕</button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredJobs.length === 0" class="anim-stagger-2" style="text-align: center; padding: 4rem 1.5rem; background: var(--bg-card-glass); border-radius: var(--radius-lg); border: 1px solid var(--border-cyber); margin-bottom: 3rem;">
      <div style="font-size: 3rem; margin-bottom: 1rem;">💼</div>
      <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--text-main); margin-bottom: 0.5rem;">
        No Vacancies Matching "{{ searchQuery }}"
      </h3>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">
        Try selecting a different category or clearing your search filters.
      </p>
      <button class="btn-primary" @click="selectedCategory = 'all'; searchQuery = ''">
        Reset Job Filters 🔄
      </button>
    </div>

    <!-- 3. VACANCIES SHOWCASE GRID -->
    <div class="careers-grid anim-stagger-3 reveal-on-scroll" v-else>
      <div class="career-card" v-for="job in filteredJobs" :key="job.id">
        <!-- Top Meta Row -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.85rem; flex-wrap: wrap; gap: 0.5rem;">
          <span class="skill-tag" style="background: rgba(249, 115, 22, 0.15); color: var(--color-ai-yellow); border-color: rgba(249, 115, 22, 0.3);">
            {{ job.categoryBadge || job.type }}
          </span>
          <span class="exp-badge-required" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;">
            {{ job.experience || 'Min 4+ Yrs Exp' }}
          </span>
        </div>

        <!-- Role Title & Details -->
        <h3 style="font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; margin-bottom: 0.4rem; color: var(--text-main);">
          {{ job.title }}
        </h3>
        
        <div style="color: var(--color-ai-cyan); font-size: 0.85rem; font-weight: 700; margin-bottom: 0.85rem; font-family: var(--font-mono); display: flex; flex-wrap: wrap; gap: 0.75rem;">
          <span>📍 {{ job.location }}</span>
          <span>•</span>
          <span class="text-gradient-gold">💰 Salary: {{ job.salary }}</span>
          <span>•</span>
          <span style="color: var(--text-muted);">⏱️ {{ job.type }}</span>
        </div>

        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.25rem;">
          {{ job.description }}
        </p>

        <!-- Teaching / Developer Key Focus Points -->
        <div class="career-points-box" v-if="job.teachingPoints && job.teachingPoints.length">
          <div class="career-points-title">
            <span>🎯</span> Key Responsibilities & Role Focus:
          </div>
          <ul class="career-points-list">
            <li v-for="(pt, pIdx) in job.teachingPoints" :key="pIdx">
              <span class="point-check">✓</span>
              <span>{{ pt }}</span>
            </li>
          </ul>
        </div>

        <!-- Skills / Tech Stack Chips -->
        <div class="career-skills-wrap" v-if="job.skills">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 0.4rem;">
            Required Skills & Tools:
          </div>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
            <span class="tech-pill" v-for="sk in job.skills" :key="sk">{{ sk }}</span>
          </div>
        </div>

        <!-- Card Action Button -->
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-cyber);">
          <button class="btn-primary" style="width: 100%; justify-content: center;" @click="$emit('open-job-modal', job)">
            <span>Apply for {{ job.shortTitle }} 💼</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 4. 4-STEP HIRING PROCESS -->
    <div class="internship-features-section anim-stagger-4" style="margin-top: 5rem;">
      <div class="section-header" style="margin-bottom: 2.5rem;">
        <span class="section-tag">TRANSPARENT RECRUITMENT FLOW</span>
        <h2 class="section-title">Our 4-Stage <span class="text-gradient">Hiring Process</span></h2>
        <p class="section-subtitle">We value real-world coding capability, pedagogical skills, and cultural fit above all.</p>
      </div>

      <div class="roadmap-grid">
        <div class="roadmap-step-card">
          <div class="roadmap-step-header">
            <span class="roadmap-step-badge">Stage 1</span>
            <span class="roadmap-step-period">Within 48 Hours</span>
          </div>
          <h3 class="roadmap-step-title">Profile & Resume Review</h3>
          <p class="roadmap-step-desc">Our Academic Board reviews your technical portfolio, GitHub repositories, and past teaching/development experience.</p>
        </div>

        <div class="roadmap-step-card">
          <div class="roadmap-step-header">
            <span class="roadmap-step-badge">Stage 2</span>
            <span class="roadmap-step-period">Technical Round</span>
          </div>
          <h3 class="roadmap-step-title">Technical Code Audit / Teaching Demo</h3>
          <p class="roadmap-step-desc">A live code walkthrough, problem solving sprint, or 20-minute sample teaching demonstration on your core tech stack.</p>
        </div>

        <div class="roadmap-step-card">
          <div class="roadmap-step-header">
            <span class="roadmap-step-badge">Stage 3</span>
            <span class="roadmap-step-period">Director Interaction</span>
          </div>
          <h3 class="roadmap-step-title">Faculty Board & Director Discussion</h3>
          <p class="roadmap-step-desc">Meet with Director Mr. Lakshman Singh Chauhan to align on pedagogical vision, compensation, and leadership scope.</p>
        </div>

        <div class="roadmap-step-card">
          <div class="roadmap-step-header">
            <span class="roadmap-step-badge">Stage 4</span>
            <span class="roadmap-step-period">Fast Onboarding</span>
          </div>
          <h3 class="roadmap-step-title">Official Offer Letter & Studio Welcome</h3>
          <p class="roadmap-step-desc">Formal offer issuance, workstation allotment, orientation, and integration into the IT HUNT mentor community.</p>
        </div>
      </div>
    </div>

    <!-- 5. BOTTOM CTA BANNER -->
    <div class="internship-bottom-cta anim-stagger-4" style="margin-top: 5rem;">
      <div class="cta-glow-backdrop"></div>
      <div class="cta-content-wrap">
        <div class="cta-badge-pill">IMMEDIATE JOINING AVAILABLE</div>
        <h2 class="cta-headline">Don't See Your Exact Role? <span class="text-gradient">Send Us an Open Application</span></h2>
        <p class="cta-subtext">
          If you are an exceptional engineer, data scientist, or educator passionate about technology training, send your resume directly to our Director's desk.
        </p>
        <div class="cta-buttons-wrap">
          <a :href="'mailto:' + (content.contact?.rawEmail || 'softtechithunt@gmail.com') + '?subject=Open%20Job%20Application%20-%20IT%20HUNT'" class="btn-primary cta-action-btn">
            <span>Email Resume Directly ✉️ →</span>
          </a>
          <a :href="'https://wa.me/' + (content.contact?.whatsapp || '919795771806') + '?text=Hello%20IT%20HUNT%20HR%2C%20I%20am%20interested%20in%20applying%20for%20a%20Faculty%20%2F%20Developer%20position.'" target="_blank" rel="noopener noreferrer" class="btn-secondary cta-whatsapp-btn">
            <span>WhatsApp HR Desk 💬</span>
          </a>
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

defineEmits(['set-tab', 'open-job-modal']);

const selectedCategory = ref('all');
const searchQuery = ref('');

const filteredJobs = computed(() => {
  const jobs = props.content.careersSection?.jobOpenings || [];
  return jobs.filter(job => {
    const matchCategory = selectedCategory.value === 'all' || job.category === selectedCategory.value;
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return matchCategory;

    const matchQuery = 
      (job.title && job.title.toLowerCase().includes(query)) ||
      (job.shortTitle && job.shortTitle.toLowerCase().includes(query)) ||
      (job.description && job.description.toLowerCase().includes(query)) ||
      (job.location && job.location.toLowerCase().includes(query)) ||
      (job.skills && job.skills.some(s => s.toLowerCase().includes(query))) ||
      (job.teachingPoints && job.teachingPoints.some(p => p.toLowerCase().includes(query)));

    return matchCategory && matchQuery;
  });
});
</script>
