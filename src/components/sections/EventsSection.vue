<template>
  <section class="events-page-section container">
    <!-- Events Hero Banner -->
    <div class="events-hero-banner anim-stagger-1">
      <div class="events-badge-pill">
        <span class="pulse-dot"></span>
        <span>{{ content.eventsSectionUI?.tagline || content.eventsSection?.tagline || 'CAMPUS LIFE & TECH INNOVATION' }}</span>
      </div>
      <h1 class="events-hero-title">
        {{ content.eventsSectionUI?.titlePrefix || content.eventsSection?.titlePrefix || 'Flagship Events, Hackathons & ' }}<span class="text-gradient">{{ content.eventsSectionUI?.titleGradient || content.eventsSection?.titleGradient || 'Media Gallery' }}</span>
      </h1>
      <p class="events-hero-subtitle">
        {{ content.eventsSection?.description }}
      </p>

      <!-- Aggregate Stats Ribbon -->
      <div class="events-stats-ribbon" v-if="content.eventsSection?.stats">
        <div class="event-stat-card" v-for="stat in content.eventsSection.stats" :key="stat.label">
          <div class="event-stat-icon">{{ stat.icon }}</div>
          <div>
            <div class="event-stat-val text-gradient">{{ stat.value }}</div>
            <div class="event-stat-lbl">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls Bar: Category Filters & Real-Time Search -->
    <div class="events-controls-bar anim-stagger-2">
      <div class="events-category-nav" v-if="content.eventsSection?.categories">
        <button 
          v-for="cat in content.eventsSection.categories" 
          :key="cat.id"
          class="event-cat-btn"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectedCategory = cat.id"
        >
          <span>{{ cat.icon }}</span> {{ cat.label }}
        </button>
      </div>

      <div class="events-search-box">
        <span class="events-search-icon">🔍</span>
        <input 
          type="text" 
          v-model="searchQuery" 
          class="events-search-input" 
          :placeholder="content.eventsSectionUI?.searchPlaceholder || 'Search hackathons, workshops, guests...'"
        >
        <button 
          v-if="searchQuery" 
          class="events-search-clear" 
          @click="searchQuery = ''" 
          :title="content.ui?.clearSearch || 'Clear search'"
        >✕</button>
      </div>
    </div>

    <!-- Empty State if search/filter returns zero -->
    <div v-if="filteredEvents.length === 0" class="anim-stagger-2" style="text-align: center; padding: 4rem 1.5rem; background: var(--bg-card-glass); border-radius: var(--radius-lg); border: 1px solid var(--border-cyber); margin-bottom: 3rem;">
      <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
      <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--text-main); margin-bottom: 0.5rem;">
        {{ content.eventsSectionUI?.emptySearchTitlePrefix || 'No Events Found Matching ' }} "{{ searchQuery }}"
      </h3>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">
        {{ content.eventsSectionUI?.emptySearchSubtitle || 'Try selecting a different category or clearing your search filters.' }}
      </p>
      <button class="btn-primary" @click="selectedCategory = 'all'; searchQuery = ''">
        {{ content.ui?.resetFilters || 'Reset Filters 🔄' }}
      </button>
    </div>

    <!-- Event Cards Showcase Grid -->
    <div class="events-grid anim-stagger-3" v-else>
      <div class="event-card" v-for="ev in filteredEvents" :key="ev.id">
        <!-- Cover Media wrapper with Hover Zoom & Image Preview -->
        <div class="event-card-media protected-img-wrapper" @click="$emit('open-detail', ev)">
          <div class="protected-img-overlay" @contextmenu.prevent></div>
          <img :src="ev.coverImage" :alt="ev.title" class="event-card-img protected-img" draggable="false" @contextmenu.prevent @dragstart.prevent @error="onImgError">
          <span class="event-card-badge" v-if="ev.badge">{{ ev.badge }}</span>
          <span class="event-photo-count-pill">
            <span>📸</span> {{ ev.galleryImages?.length || 1 }} {{ content.ui?.photosCountSuffix || 'Photos' }}
          </span>
          <div class="event-card-overlay">
            <span class="event-card-overlay-btn">{{ content.ui?.viewAlbumDetails || 'View Event Album & Details 🔍' }}</span>
          </div>
        </div>

        <!-- Mini Thumbnails Carousel Strip -->
        <div class="event-card-thumbnails" v-if="ev.galleryImages && ev.galleryImages.length > 1">
          <img 
            v-for="(img, gIdx) in ev.galleryImages.slice(0, 4)" 
            :key="gIdx" 
            :src="img.src" 
            :alt="img.title" 
            class="event-thumb-mini protected-img"
            draggable="false"
            @contextmenu.prevent
            @dragstart.prevent
            @click.stop="$emit('open-lightbox', { images: ev.galleryImages, index: gIdx })"
            :title="img.title"
            @error="onImgError"
          >
        </div>

        <!-- Card Body & Detailing -->
        <div class="event-card-body">
          <div class="event-meta-row">
            <span class="event-meta-item">📅 {{ ev.date }}</span>
            <span class="event-meta-item">⏱️ {{ ev.time }}</span>
          </div>

          <h3 class="event-card-title">{{ ev.title }}</h3>
          <p class="event-card-desc">{{ ev.subtitle }}</p>

          <!-- Highlights Chips -->
          <div class="event-chips-wrap" v-if="ev.highlights">
            <span class="event-chip" v-for="(hl, hIdx) in ev.highlights.slice(0, 3)" :key="hIdx">
              ✓ {{ hl }}
            </span>
          </div>

          <!-- Venue Details Strip -->
          <div class="event-venue-strip">
            <span>📍</span>
            <span>{{ ev.venue }}</span>
          </div>

          <!-- Card Actions -->
          <div class="event-card-actions">
            <button class="event-explore-btn" @click="$emit('open-detail', ev)">
              <span>{{ content.ui?.exploreEventStory || 'Explore Event Story & Photos 📸 →' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- UPCOMING EVENTS & REGISTRATIONS SECTION -->
    <div class="upcoming-events-section anim-stagger-4" v-if="content.eventsSection?.upcomingEvents && content.eventsSection.upcomingEvents.length">
      <div class="section-header" style="text-align: left; margin-bottom: 2rem;">
        <span class="section-tag">{{ content.eventsSectionUI?.upcomingSection?.tagline || '🌟 Registrations Open' }}</span>
        <h2 class="section-title">{{ content.eventsSectionUI?.upcomingSection?.titlePrefix || 'Upcoming ' }}<span class="text-gradient">{{ content.eventsSectionUI?.upcomingSection?.titleGradient || 'Hackathons & Masterclasses' }}</span></h2>
        <p class="section-subtitle" style="text-align: left; margin: 0;">{{ content.eventsSectionUI?.upcomingSection?.subtitle }}</p>
      </div>

      <div class="upcoming-banner-grid">
        <div class="upcoming-event-card" v-for="upEv in content.eventsSection.upcomingEvents" :key="upEv.id">
          <div class="upcoming-header-row">
            <span class="duration-pill">{{ upEv.categoryBadge }}</span>
            <span class="upcoming-seats-badge">🔥 {{ upEv.seatsRemaining }} {{ content.eventsSectionUI?.upcomingSection?.seatsSuffix || 'Seats Left' }}</span>
          </div>

          <h3 class="upcoming-event-title">{{ upEv.title }}</h3>
          
          <div class="event-meta-row" style="margin-bottom: 0.85rem;">
            <span class="event-meta-item">📅 {{ upEv.date }}</span>
            <span class="event-meta-item">⏱️ {{ upEv.time }}</span>
          </div>

          <div class="event-venue-strip" style="border: none; padding: 0; margin-bottom: 1rem;">
            <span>📍 {{ upEv.venue }}</span>
          </div>

          <p class="upcoming-event-desc">{{ upEv.description }}</p>

          <!-- Perks List -->
          <div class="upcoming-perks-list">
            <div class="upcoming-perk-item" v-for="(perk, pIdx) in upEv.perks" :key="pIdx">
              <span style="color: #22c55e;">✓</span>
              <span>{{ perk }}</span>
            </div>
          </div>

          <button class="upcoming-action-btn" @click="$emit('open-rsvp', upEv)">
            <span>{{ content.eventsSectionUI?.upcomingSection?.rsvpBtnText || 'RSVP / Register Free for Event 🚀 →' }}</span>
          </button>
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

defineEmits(['open-detail', 'open-lightbox', 'open-rsvp']);

const selectedCategory = ref('all');
const searchQuery = ref('');

const filteredEvents = computed(() => {
  const events = props.content.eventsSection?.eventsList || [];
  return events.filter(ev => {
    const matchCategory = selectedCategory.value === 'all' || ev.category === selectedCategory.value;
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return matchCategory;

    const matchQuery = 
      (ev.title && ev.title.toLowerCase().includes(query)) ||
      (ev.subtitle && ev.subtitle.toLowerCase().includes(query)) ||
      (ev.venue && ev.venue.toLowerCase().includes(query)) ||
      (ev.chiefGuest && ev.chiefGuest.name && ev.chiefGuest.name.toLowerCase().includes(query)) ||
      (ev.highlights && ev.highlights.some(h => h.toLowerCase().includes(query)));

    return matchCategory && matchQuery;
  });
});

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect width="400" height="240" fill="%231e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8">IT HUNT Campus Event</text></svg>';
};
</script>
