<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="$emit('close')" tabindex="-1">
    <div class="modal-card modal-lg course-detail-popup">
      <!-- Close Button -->
      <button class="modal-close-icon" @click="$emit('close')" title="Close Popup (Esc)">✕</button>

      <!-- Header -->
      <div class="detail-popup-header">
        <div class="detail-header-icon" v-html="track.icon"></div>
        <div class="detail-header-content">
          <div class="detail-badge-group">
            <span class="duration-pill">⏱️ {{ track.duration }}</span>
            <span class="detail-highlight-pill" v-if="track.badge">{{ track.badge }}</span>
          </div>
          <h2 class="detail-popup-title">{{ track.title }}</h2>
          <div class="detail-popup-sub">IT Solutions & Production Internship Track 2026 • Live Project Lab</div>
        </div>
      </div>

      <!-- 4 Key Metric Stat Cards -->
      <div class="metric-stats-grid">
        <!-- 1. Earning Potential -->
        <div class="metric-stat-card stat-earning">
          <div class="metric-stat-top">
            <span class="metric-stat-icon">💰</span>
            <span class="metric-stat-tag">Earning Potential</span>
          </div>
          <div class="metric-stat-value text-gradient-gold">
            {{ track.earningPotential?.fresher || '₹4.5 - ₹7.5 LPA' }}
          </div>
          <div class="metric-stat-detail">
            <div><strong>Fresher Salary:</strong> {{ track.earningPotential?.fresher }}</div>
            <div><strong>Experienced (2-3+ Yrs):</strong> {{ track.earningPotential?.experienced }}</div>
            <div><strong>Freelance / Remote:</strong> {{ track.earningPotential?.freelance }}</div>
          </div>
        </div>

        <!-- 2. Job Placement Rate -->
        <div class="metric-stat-card stat-placement">
          <div class="metric-stat-top">
            <span class="metric-stat-icon">🎯</span>
            <span class="metric-stat-tag">Job Success Rate</span>
          </div>
          <div class="metric-stat-value text-gradient">
            {{ track.jobPlacementRate?.percentage || 95 }}% Placement
          </div>
          <div class="metric-stat-detail">
            <div class="stat-progress-bar">
              <div class="stat-progress-fill" :style="{ width: (track.jobPlacementRate?.percentage || 95) + '%' }"></div>
            </div>
            <div style="font-size: 0.775rem; color: var(--color-ai-emerald); font-weight: 700;">
              ✓ {{ track.jobPlacementRate?.demandLevel || 'Extremely High Industry Demand' }}
            </div>
          </div>
        </div>

        <!-- 3. Learning Hours Required -->
        <div class="metric-stat-card stat-hours">
          <div class="metric-stat-top">
            <span class="metric-stat-icon">⏱️</span>
            <span class="metric-stat-tag">Learning Hours</span>
          </div>
          <div class="metric-stat-value" style="color: var(--color-ai-cyan);">
            {{ track.learningHours?.totalHours || '180+ Hours' }}
          </div>
          <div class="metric-stat-detail">
            <div><strong>Weekly Commitment:</strong> {{ track.learningHours?.weeklyHours || '12-15 Hrs/Wk' }}</div>
            <div><strong>Live Lab Coding:</strong> {{ track.learningHours?.liveLabHours || '120+ Hrs' }}</div>
            <div><strong>Schedule:</strong> {{ track.learningHours?.schedule || 'Daily 2 Hours Interactive Lab' }}</div>
          </div>
        </div>

        <!-- 4. Career Target Roles -->
        <div class="metric-stat-card stat-roles">
          <div class="metric-stat-top">
            <span class="metric-stat-icon">💼</span>
            <span class="metric-stat-tag">Target Job Roles</span>
          </div>
          <div class="metric-stat-value" style="font-size: 1.15rem; color: var(--color-ai-violet);">
            {{ track.jobPlacementRate?.targetRoles?.[0] || 'Software Engineer' }}
          </div>
          <div class="metric-stat-detail">
            <div class="role-tags-wrap">
              <span class="role-chip" v-for="role in track.jobPlacementRate?.targetRoles" :key="role">{{ role }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- In-Depth Technology & Architectural Scope -->
      <div class="detail-section-block">
        <h3 class="detail-section-heading">
          <span>🔬</span> Details About Technology & Industry Scope
        </h3>
        <p class="detail-section-text">{{ track.techDetails || track.description }}</p>
        
        <div class="market-insight-box" v-if="track.earningPotential?.overview">
          <span class="insight-icon">💡</span>
          <div>
            <strong>Current Market Scenario:</strong> {{ track.earningPotential.overview }}
          </div>
        </div>
      </div>

      <!-- Technologies & Tools You Will Learn -->
      <div class="detail-section-block">
        <h3 class="detail-section-heading">
          <span>💻</span> Technologies & Tools You Will Learn
        </h3>
        <div class="tech-category-grid" v-if="track.technologiesLearned && track.technologiesLearned.length">
          <div class="tech-cat-box" v-for="cat in track.technologiesLearned" :key="cat.category">
            <div class="tech-cat-title">{{ cat.category }}</div>
            <div class="tech-chips-list">
              <span class="tech-chip-item" v-for="tech in cat.items" :key="tech">{{ tech }}</span>
            </div>
          </div>
        </div>
        <div class="tech-chips-list" v-else>
          <span class="tech-chip-item" v-for="tech in track.stack" :key="tech">{{ tech }}</span>
        </div>
      </div>

      <!-- Real-World Production Projects -->
      <div class="detail-section-block" v-if="track.liveProjects && track.liveProjects.length">
        <h3 class="detail-section-heading">
          <span>🚀</span> Real-World Production Projects You Will Build
        </h3>
        <div class="projects-detail-grid">
          <div class="project-detail-card" v-for="(proj, pIdx) in track.liveProjects" :key="proj.name">
            <div class="project-number-badge">Project 0{{ pIdx + 1 }}</div>
            <h4 class="project-card-title">{{ proj.name }}</h4>
            <p class="project-card-desc">{{ proj.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Curriculum Syllabus Breakdown -->
      <div class="detail-section-block" v-if="track.curriculumHighlights && track.curriculumHighlights.length">
        <h3 class="detail-section-heading">
          <span>📚</span> Structured Curriculum Milestones
        </h3>
        <div class="curriculum-list">
          <div class="curriculum-item" v-for="(module, mIdx) in track.curriculumHighlights" :key="mIdx">
            <span class="curriculum-check">✓</span>
            <span>{{ module }}</span>
          </div>
        </div>
      </div>

      <!-- Perks & Placement Certification Banner -->
      <div class="perks-guarantee-banner">
        <div class="perks-icon">🏆</div>
        <div>
          <div style="font-weight: 800; font-size: 1rem; color: var(--text-main); margin-bottom: 0.25rem;">
            Verified Internship Certification + Corporate Letter of Recommendation (LOR)
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">
            Includes 100% placement assistance, resume masterclass, mock technical interviews, and GitHub production code portfolio review.
          </div>
        </div>
      </div>

      <!-- Modal Action Buttons Footer -->
      <div class="detail-modal-footer">
        <button type="button" class="btn-secondary" @click="$emit('close')">
          Back to Tracks
        </button>
        <button type="button" class="btn-primary proceed-btn" @click="$emit('proceed-register', track)">
          <span>Proceed to Registration</span> 📝 →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  track: {
    type: Object,
    default: () => ({})
  }
});

defineEmits(['close', 'proceed-register']);
</script>
