<template>
  <section class="internship-page-section">
    <!-- 1. INTERNSHIP HERO HEADER -->
    <div class="internship-hero-banner">
      <div class="container">
        <div class="internship-live-pill">
          <span class="pulse-dot"></span>
          <span>{{ content.internshipsSectionUI?.heroPill || '2026 BATCH ENROLLMENTS OPEN • PRODUCTION-GRADE SOFTWARE INCUBATOR' }}</span>
        </div>
        
        <h1 class="internship-main-title">
          {{ content.internshipVenture?.titlePrefix }}<span class="text-gradient">{{ content.internshipVenture?.titleGradient }}</span>
        </h1>
        
        <p class="internship-main-desc">
          {{ content.internshipVenture?.description }}
        </p>

        <!-- Trust Highlights Ribbon -->
        <div class="internship-trust-ribbon">
          <div class="trust-item" v-for="(trust, tIdx) in (content.internshipsSectionUI?.trustRibbon || [])" :key="tIdx">
            <span class="trust-icon">{{ trust.icon }}</span>
            <span class="trust-text">{{ trust.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container" style="padding: 2.5rem 1.5rem 4rem;">
      <!-- 2. DURATION FILTER CAPSULES -->
      <div class="internship-filter-wrap">
        <div class="internship-filter-capsule">
          <button 
            v-for="tab in (content.internshipsSectionUI?.filterTabs || [{ id: 'all', label: 'All Tracks' }])"
            :key="tab.id"
            class="filter-capsule-btn" 
            :class="{ active: selectedDuration === tab.id }" 
            @click="selectedDuration = tab.id"
          >
            <span>{{ tab.label }}</span>
            <span class="filter-count-badge" v-if="tab.id === 'all'">{{ content.internshipVenture?.tracks?.length || 0 }}</span>
          </button>
        </div>
      </div>

      <!-- 3. INTERNSHIP TRACKS GRID -->
      <div class="internship-tracks-grid">
        <div class="modern-track-card" v-for="track in filteredInternships" :key="track.id">
          <!-- Glow Header Banner -->
          <div class="track-card-header">
            <div class="track-icon-bubble" v-html="track.icon"></div>
            <div class="track-meta-pills">
              <span class="track-duration-tag">⏱️ {{ track.duration }}</span>
              <span class="track-badge-tag" v-if="track.badge">{{ track.badge }}</span>
            </div>
          </div>

          <!-- Track Body -->
          <div class="track-card-body">
            <h3 class="track-card-title">{{ track.title }}</h3>
            <p class="track-card-desc">{{ track.description }}</p>

            <!-- 3-Metric High-Impact Stat Strip -->
            <div class="track-glass-stats">
              <div class="track-stat-cell">
                <span class="cell-label">{{ content.internshipsSectionUI?.cardLabels?.salaryRange || '💰 Salary Range' }}</span>
                <span class="cell-val text-gradient-gold">{{ track.earningPotential?.fresher || '₹4.5 - ₹7.5 LPA' }}</span>
              </div>
              <div class="track-stat-cell">
                <span class="cell-label">{{ content.internshipsSectionUI?.cardLabels?.placement || '🎯 Placement' }}</span>
                <span class="cell-val cell-green">{{ track.jobPlacementRate?.percentage || 95 }}% Rate</span>
              </div>
              <div class="track-stat-cell">
                <span class="cell-label">{{ content.internshipsSectionUI?.cardLabels?.totalHours || '⏱️ Total Hours' }}</span>
                <span class="cell-val cell-cyan">{{ track.learningHours?.totalHours || '180+ Hrs' }}</span>
              </div>
            </div>

            <!-- Live Project Highlight -->
            <div class="track-projects-preview" v-if="track.liveProjects && track.liveProjects.length">
              <div class="projects-preview-label">
                <span>{{ content.internshipsSectionUI?.cardLabels?.liveProjectsPrefix || '🛠️ Live Production Projects' }} ({{ track.liveProjects.length }} {{ content.internshipsSectionUI?.cardLabels?.liveProjectsSuffix || 'Apps' }}):</span>
              </div>
              <div class="projects-preview-tags">
                <span class="proj-tag" v-for="proj in track.liveProjects.slice(0, 2)" :key="proj.name">
                  ⚡ {{ proj.name }}
                </span>
                <span class="proj-tag-more" v-if="track.liveProjects.length > 2">{{ content.internshipsSectionUI?.cardLabels?.moreProjectsText || '+1 More Live Project' }}</span>
              </div>
            </div>

            <!-- Technologies & Tools Stack -->
            <div class="track-tech-stack">
              <div class="tech-stack-label">{{ content.internshipsSectionUI?.cardLabels?.techStackLabel || 'Technologies & Frameworks:' }}</div>
              <div class="tech-stack-chips">
                <span class="tech-pill" v-for="tech in track.stack" :key="tech">{{ tech }}</span>
              </div>
            </div>
          </div>

          <!-- Track Card Action Buttons -->
          <div class="track-card-actions">
            <button type="button" class="btn-primary track-view-btn" @click="$emit('open-detail', track)">
              <span>{{ content.ui?.viewDetailsSyllabusBtn || 'View Details & Syllabus 🔬' }}</span>
            </button>
            <button type="button" class="btn-secondary track-fast-btn" @click="$emit('fast-apply', track)" :title="content.ui?.fastApplyBtn || 'Fast Apply ⚡'">
              <span>{{ content.ui?.fastApplyBtn || 'Fast Apply ⚡' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 4. WHY CHOOSE IT HUNT INTERNSHIPS PILLARS -->
      <div class="internship-features-section" v-if="content.internshipVenture?.features">
        <div class="section-header" style="margin-bottom: 2.5rem;">
          <span class="section-tag">{{ content.internshipsSectionUI?.advantageSection?.tagline || 'THE IT HUNT ADVANTAGE' }}</span>
          <h2 class="section-title">{{ content.internshipsSectionUI?.advantageSection?.titlePrefix || 'Why Engineering Students Choose ' }}<span class="text-gradient">{{ content.internshipsSectionUI?.advantageSection?.titleGradient || 'IT HUNT' }}</span></h2>
          <p class="section-subtitle">{{ content.internshipsSectionUI?.advantageSection?.subtitle }}</p>
        </div>

        <div class="internship-features-grid">
          <div class="feature-pillar-card" v-for="(feat, fIdx) in content.internshipVenture.features" :key="fIdx">
            <div class="pillar-icon-box">{{ feat.icon }}</div>
            <h3 class="pillar-title">{{ feat.title }}</h3>
            <p class="pillar-desc">{{ feat.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 5. STRUCTURED 4-PHASE INTERNSHIP ROADMAP -->
      <div class="internship-roadmap-section" v-if="content.internshipVenture?.roadmap">
        <div class="section-header" style="margin-bottom: 3rem;">
          <span class="section-tag">{{ content.internshipsSectionUI?.roadmapSection?.tagline || 'STRUCTURED LEARNING TIMELINE' }}</span>
          <h2 class="section-title">{{ content.internshipsSectionUI?.roadmapSection?.titlePrefix || 'Your 4-Phase ' }}<span class="text-gradient">{{ content.internshipsSectionUI?.roadmapSection?.titleGradient || 'Career Launchpad' }}</span></h2>
          <p class="section-subtitle">{{ content.internshipsSectionUI?.roadmapSection?.subtitle }}</p>
        </div>

        <div class="roadmap-grid">
          <div class="roadmap-step-card" v-for="(step, sIdx) in content.internshipVenture.roadmap" :key="sIdx">
            <div class="roadmap-step-header">
              <span class="roadmap-step-badge">Phase {{ step.phase }}</span>
              <span class="roadmap-step-period">{{ step.period }}</span>
            </div>
            <h3 class="roadmap-step-title">{{ step.title }}</h3>
            <p class="roadmap-step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 6. FINAL CALL TO ACTION BANNER -->
      <div class="internship-bottom-cta">
        <div class="cta-glow-backdrop"></div>
        <div class="cta-content-wrap">
          <div class="cta-badge-pill">{{ content.internshipsSectionUI?.bottomCta?.badgePill || 'LIMITED SEATS AVAILABLE PER BATCH' }}</div>
          <h2 class="cta-headline">{{ content.internshipsSectionUI?.bottomCta?.headlinePrefix || 'Ready to Transform from a Student to a ' }}<span class="text-gradient">{{ content.internshipsSectionUI?.bottomCta?.headlineGradient || 'Production Engineer?' }}</span></h2>
          <p class="cta-subtext">
            {{ content.internshipsSectionUI?.bottomCta?.subtext }}
          </p>
          <div class="cta-buttons-wrap">
            <button class="btn-primary cta-action-btn" @click="$emit('set-tab', 'admission')">
              <span>{{ content.ui?.startAdmissionCta || 'Start Admission Application 📝 →' }}</span>
            </button>
            <a :href="'https://wa.me/' + (content.contact?.whatsapp || '919795771806') + '?text=Hello%20IT%20HUNT%20Team%2C%20I%20am%20interested%20in%20the%20IT%20Internship%20Program.'" target="_blank" rel="noopener noreferrer" class="btn-secondary cta-whatsapp-btn">
              <span>{{ content.ui?.chatWhatsappBtn || 'Chat on WhatsApp 💬' }}</span>
            </a>
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

defineEmits(['set-tab', 'open-detail', 'fast-apply']);

const selectedDuration = ref('all');

const filteredInternships = computed(() => {
  const tracks = props.content.internshipVenture?.tracks || [];
  if (selectedDuration.value === 'all') return tracks;
  return tracks.filter(t => t.duration.includes(selectedDuration.value));
});
</script>
