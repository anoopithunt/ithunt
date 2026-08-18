<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="$emit('close')" tabindex="-1">
    <div class="modal-card modal-lg event-detail-popup">
      <!-- Close Button -->
      <button class="modal-close-icon" @click="$emit('close')" title="Close Popup (Esc)">✕</button>

      <!-- Header -->
      <div class="event-detail-header">
        <div class="event-detail-badge-group">
          <span class="event-category-pill">{{ event.categoryLabel || event.category }}</span>
          <span class="event-date-pill">📅 {{ event.date }}</span>
          <span class="event-date-pill">⏱️ {{ event.time }}</span>
          <span class="event-date-pill" v-if="event.attendeeCount">👥 {{ event.attendeeCount }}</span>
        </div>
        <h2 class="event-detail-title">{{ event.title }}</h2>
        <p class="event-detail-subtitle">{{ event.subtitle }}</p>
        <div style="font-size: 0.85rem; color: var(--text-dim); margin-top: 0.5rem;">
          📍 <strong>{{ content?.modalTexts?.eventDetail?.venueLabel || 'Venue:' }}</strong> {{ event.venue }}
        </div>
      </div>

      <!-- Featured Interactive Photo Gallery -->
      <div class="event-gallery-showcase" v-if="event.galleryImages && event.galleryImages.length">
        <div class="event-gallery-main-view protected-img-wrapper" @click="$emit('open-lightbox', { images: event.galleryImages, index: activeIndex })">
          <div class="protected-img-overlay" @contextmenu.prevent></div>
          <img 
            :src="event.galleryImages[activeIndex]?.src || event.coverImage" 
            :alt="event.galleryImages[activeIndex]?.title || event.title"
            class="event-gallery-main-img protected-img"
            draggable="false"
            @contextmenu.prevent
            @dragstart.prevent
            @error="onImgError"
          >
          <div class="event-gallery-zoom-hint">
            <span>{{ content?.modalTexts?.eventDetail?.fullscreenHint || '🔍 Click to View Fullscreen' }}</span>
          </div>
          <div class="event-gallery-caption-overlay">
            <div class="event-gallery-caption-title">
              {{ event.galleryImages[activeIndex]?.title }}
            </div>
            <div class="event-gallery-caption-desc">
              {{ event.galleryImages[activeIndex]?.caption }}
            </div>
          </div>
        </div>

        <!-- Thumbnail Strip Selector -->
        <div class="event-gallery-thumbs-row">
          <div 
            v-for="(img, gIdx) in event.galleryImages" 
            :key="gIdx"
            class="event-gallery-thumb-item protected-img-wrapper"
            :class="{ active: activeIndex === gIdx }"
            @click="activeIndex = gIdx"
          >
            <div class="protected-img-overlay" @contextmenu.prevent></div>
            <img :src="img.src" :alt="img.title" draggable="false" @contextmenu.prevent @dragstart.prevent @error="onImgError">
          </div>
        </div>
      </div>

      <!-- 4 Key Metrics Stat Cards -->
      <div class="event-metrics-grid" v-if="event.metrics">
        <div class="event-metric-box">
          <div class="event-metric-val text-gradient">{{ event.metrics.teams }}</div>
          <div class="event-metric-lbl">{{ content?.modalTexts?.eventDetail?.metrics?.teams || 'Participation' }}</div>
        </div>
        <div class="event-metric-box">
          <div class="event-metric-val text-gradient-gold">{{ event.metrics.prizePool }}</div>
          <div class="event-metric-lbl">{{ content?.modalTexts?.eventDetail?.metrics?.prizePool || 'Prizes & Perks' }}</div>
        </div>
        <div class="event-metric-box">
          <div class="event-metric-val" style="color: #34d399;">{{ event.metrics.projectsBuilt }}</div>
          <div class="event-metric-lbl">{{ content?.modalTexts?.eventDetail?.metrics?.projectsBuilt || 'Deliverables' }}</div>
        </div>
        <div class="event-metric-box">
          <div class="event-metric-val" style="color: #f43f5e;">{{ event.metrics.hoursOfCoding }}</div>
          <div class="event-metric-lbl">{{ content?.modalTexts?.eventDetail?.metrics?.hoursOfCoding || 'Format / Sprint' }}</div>
        </div>
      </div>

      <!-- Event Story / Overview -->
      <div class="event-detail-section" v-if="event.overview">
        <h3 class="event-detail-section-heading">
          <span>📖</span> {{ content?.modalTexts?.eventDetail?.storyHeading || 'Event Overview & Campus Story' }}
        </h3>
        <p class="event-detail-story-text">{{ event.overview }}</p>
      </div>

      <!-- Event Agenda Timeline -->
      <div class="event-detail-section" v-if="event.agendaSchedule && event.agendaSchedule.length">
        <h3 class="event-detail-section-heading">
          <span>⏱️</span> {{ content?.modalTexts?.eventDetail?.scheduleHeading || 'Official Event Schedule & Milestones' }}
        </h3>
        <div class="event-agenda-timeline">
          <div class="agenda-timeline-item" v-for="(item, aIdx) in event.agendaSchedule" :key="aIdx">
            <span class="agenda-time-pill">{{ item.time }}</span>
            <h4 class="agenda-title">{{ item.title }}</h4>
            <p class="agenda-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Chief Dignitaries & Mentors -->
      <div class="event-detail-section" v-if="event.chiefGuests && event.chiefGuests.length">
        <h3 class="event-detail-section-heading">
          <span>👨‍🏫</span> {{ content?.modalTexts?.eventDetail?.dignitariesHeading || 'Chief Mentors & Dignitaries Lineup' }}
        </h3>
        <div class="event-guests-grid">
          <div class="event-guest-card" v-for="guest in event.chiefGuests" :key="guest.name">
            <img :src="guest.image" :alt="guest.name" class="event-guest-avatar" @error="onImgError">
            <div>
              <div class="event-guest-name">{{ guest.name }}</div>
              <div class="event-guest-role">{{ guest.role }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Highlights & Key Outcomes -->
      <div class="event-detail-section" v-if="event.highlights && event.highlights.length">
        <h3 class="event-detail-section-heading">
          <span>🏆</span> {{ content?.modalTexts?.eventDetail?.outcomesHeading || 'Key Outcomes & Milestones' }}
        </h3>
        <div class="event-highlights-list">
          <div class="event-highlight-item" v-for="(hl, hIdx) in event.highlights" :key="hIdx">
            <span class="event-highlight-bullet">✓</span>
            <span>{{ hl }}</span>
          </div>
        </div>

        <!-- Winners / Outcomes if present -->
        <div style="margin-top: 1.25rem;" v-if="event.outcomes && event.outcomes.length">
          <h4 style="font-weight: 800; font-size: 0.95rem; color: var(--color-ai-yellow); margin-bottom: 0.5rem;">
            {{ content?.modalTexts?.eventDetail?.podiumHeading || '🥇 Honors & Winners Podium:' }}
          </h4>
          <div class="event-highlights-list">
            <div class="event-highlight-item" v-for="(out, oIdx) in event.outcomes" :key="oIdx">
              <span style="color: var(--color-ai-gold);">⭐</span>
              <span>{{ out }}</span>
            </div>
          </div>
        </div>

        <!-- Student Quote -->
        <div class="event-quote-box" v-if="event.quotes && event.quotes.length">
          <div class="event-quote-text">“{{ event.quotes[0].text }}”</div>
          <div class="event-quote-author">— {{ event.quotes[0].author }}</div>
        </div>
      </div>

      <!-- Modal Actions Footer -->
      <div class="event-modal-actions-footer">
        <button type="button" class="btn-secondary" @click="$emit('close')">
          {{ content?.modalTexts?.eventDetail?.backBtn || 'Back to All Events' }}
        </button>
        <button type="button" class="btn-primary" @click="$emit('apply')">
          <span>{{ content?.modalTexts?.eventDetail?.applyBtn || 'Apply for IT HUNT Academy 2026 🚀 →' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  event: {
    type: Object,
    default: () => ({})
  },
  content: {
    type: Object,
    default: () => ({})
  }
});

defineEmits(['close', 'open-lightbox', 'apply']);

const activeIndex = ref(0);

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect width="400" height="240" fill="%231e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8">IT HUNT Event</text></svg>';
};
</script>
