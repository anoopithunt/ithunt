<template>
  <nav 
    class="ithunt-vertical-pagination" 
    :class="{ 'mobile-compact': isMobile }"
    aria-label="Page Section Vertical Pagination"
  >
    <div class="pagination-glass-rail">
      <!-- Top Action: Scroll to Previous Section -->
      <button 
        class="pagination-chevron-btn btn-prev"
        :disabled="activeIndex <= 0"
        @click="$emit('navigate', prevSectionId)"
        title="Previous Section (Arrow Up / Page Up)"
        aria-label="Previous Section"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      <!-- Connecting Track with Dynamic Progress Fill -->
      <div class="pagination-track-wrapper">
        <div class="pagination-track-bg"></div>
        <div class="pagination-track-fill" :style="{ height: progressPercent + '%' }"></div>
      </div>

      <!-- Section Dots List -->
      <ul class="pagination-dots-list">
        <li 
          v-for="(sec, idx) in sections" 
          :key="sec.id"
          class="pagination-dot-item"
        >
          <button
            class="pagination-dot-btn"
            :class="{ 
              'active': activeSectionId === sec.id,
              'passed': idx < activeIndex
            }"
            @click="$emit('navigate', sec.id)"
            @mouseenter="hoveredId = sec.id"
            @mouseleave="hoveredId = null"
            :aria-label="'Go to ' + sec.label"
            :aria-current="activeSectionId === sec.id ? 'step' : undefined"
          >
            <!-- Core Dot Icon / Indicator -->
            <span class="dot-core">
              <span v-if="activeSectionId === sec.id" class="dot-pulse-ring"></span>
            </span>

            <!-- Floating Preview Tooltip Card (Rendered to Left) -->
            <Transition name="tooltip-slide">
              <div 
                v-if="hoveredId === sec.id" 
                class="pagination-tooltip-card"
                role="tooltip"
              >
                <div class="tooltip-header">
                  <span class="tooltip-num">{{ String(idx + 1).padStart(2, '0') }}</span>
                  <span class="tooltip-icon">{{ sec.icon }}</span>
                  <span class="tooltip-title">{{ sec.label }}</span>
                </div>
                <div v-if="sec.subtitle" class="tooltip-subtitle">
                  {{ sec.subtitle }}
                </div>
                <span class="tooltip-arrow"></span>
              </div>
            </Transition>
          </button>
        </li>
      </ul>

      <!-- Bottom Action: Scroll to Next Section -->
      <button 
        class="pagination-chevron-btn btn-next"
        :disabled="activeIndex >= sections.length - 1"
        @click="$emit('navigate', nextSectionId)"
        title="Next Section (Arrow Down / Page Down)"
        aria-label="Next Section"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <!-- Section Page Counter HUD -->
      <div class="pagination-counter-pill" :title="'Viewing section ' + (activeIndex + 1) + ' of ' + sections.length">
        <span class="curr-page">{{ String(activeIndex + 1).padStart(2, '0') }}</span>
        <span class="divider">/</span>
        <span class="total-pages">{{ String(sections.length).padStart(2, '0') }}</span>
      </div>

      <!-- Quick Snap Lock Toggle Pill -->
      <button 
        class="pagination-snap-toggle" 
        :class="{ 'snap-active': isSnapEnabled }"
        @click="$emit('toggle-snap')"
        :title="isSnapEnabled ? 'Snap Scrolling: ON (Click to toggle smooth free scroll)' : 'Snap Scrolling: OFF (Click to enable 1-page snap)'"
        aria-label="Toggle Section Snap"
      >
        <span class="snap-dot"></span>
        <span class="snap-text">{{ isSnapEnabled ? 'SNAP' : 'FREE' }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  sections: {
    type: Array,
    required: true
  },
  activeSectionId: {
    type: String,
    required: true
  },
  isSnapEnabled: {
    type: Boolean,
    default: true
  }
});

defineEmits(['navigate', 'toggle-snap']);

const hoveredId = ref(null);
const isMobile = ref(false);

const activeIndex = computed(() => {
  const idx = props.sections.findIndex(s => s.id === props.activeSectionId);
  return idx !== -1 ? idx : 0;
});

const progressPercent = computed(() => {
  if (props.sections.length <= 1) return 100;
  return Math.round((activeIndex.value / (props.sections.length - 1)) * 100);
});

const prevSectionId = computed(() => {
  if (activeIndex.value > 0) {
    return props.sections[activeIndex.value - 1].id;
  }
  return props.sections[0].id;
});

const nextSectionId = computed(() => {
  if (activeIndex.value < props.sections.length - 1) {
    return props.sections[activeIndex.value + 1].id;
  }
  return props.sections[props.sections.length - 1].id;
});

const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
/* ==========================================================================
   VERTICAL PAGINATION COMPONENT STYLES
   ========================================================================== */

.ithunt-vertical-pagination {
  position: fixed;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 998;
  user-select: none;
  pointer-events: auto;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.pagination-glass-rail {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 0.45rem;
  background: rgba(10, 15, 29, 0.78);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  box-shadow: 
    0 16px 45px rgba(0, 0, 0, 0.55),
    0 0 25px rgba(249, 115, 22, 0.15),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
}

/* Light Theme Support */
:global(body.light-theme) .pagination-glass-rail {
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 
    0 16px 40px rgba(15, 23, 42, 0.12),
    0 0 20px rgba(249, 115, 22, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.9);
}

/* ── Chevron Up / Down Buttons ── */
.pagination-chevron-btn {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted, #94a3b8);
  cursor: pointer;
  transition: all 0.22s ease;
  padding: 0;
}

.pagination-chevron-btn:hover:not(:disabled) {
  background: rgba(249, 115, 22, 0.2);
  color: #ffffff;
  border-color: rgba(249, 115, 22, 0.4);
  transform: scale(1.1);
}

.pagination-chevron-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
  transform: none;
}

:global(body.light-theme) .pagination-chevron-btn {
  background: rgba(0, 0, 0, 0.04);
  color: #64748b;
}

:global(body.light-theme) .pagination-chevron-btn:hover:not(:disabled) {
  background: rgba(249, 115, 22, 0.15);
  color: #ea580c;
}

/* ── Continuous Progress Line Behind Dots ── */
.pagination-track-wrapper {
  position: absolute;
  top: 38px;
  bottom: 68px;
  width: 2px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 0;
}

.pagination-track-bg {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

:global(body.light-theme) .pagination-track-bg {
  background: rgba(0, 0, 0, 0.08);
}

.pagination-track-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(180deg, #f97316 0%, #f59e0b 100%);
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(249, 115, 22, 0.6);
  transition: height 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ── Dots List ── */
.pagination-dots-list {
  position: relative;
  z-index: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.pagination-dot-item {
  position: relative;
}

.pagination-dot-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
}

.dot-core {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
}

:global(body.light-theme) .dot-core {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0.12);
}

.pagination-dot-btn:hover .dot-core {
  transform: scale(1.35);
  background: rgba(249, 115, 22, 0.7);
  border-color: #f97316;
}

.pagination-dot-btn.passed .dot-core {
  background: rgba(249, 115, 22, 0.5);
  border-color: rgba(249, 115, 22, 0.4);
}

.pagination-dot-btn.active .dot-core {
  width: 10px;
  height: 18px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #f97316, #ea580c);
  border-color: #fb923c;
  box-shadow: 
    0 0 14px rgba(249, 115, 22, 0.9),
    0 0 24px rgba(249, 115, 22, 0.4);
  transform: scale(1.05);
}

.dot-pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid rgba(249, 115, 22, 0.65);
  animation: pulse-ring 2s infinite ease-out;
  pointer-events: none;
}

@keyframes pulse-ring {
  0% { transform: translate(-50%, -50%) scale(0.6); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
}

/* ── Hover Tooltip Card ── */
.pagination-tooltip-card {
  position: absolute;
  right: calc(100% + 14px);
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(249, 115, 22, 0.35);
  border-radius: 10px;
  padding: 0.55rem 0.85rem;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.6),
    0 0 15px rgba(249, 115, 22, 0.2);
  pointer-events: none;
  z-index: 1000;
  text-align: left;
}

:global(body.light-theme) .pagination-tooltip-card {
  background: rgba(255, 255, 255, 0.97);
  border-color: rgba(249, 115, 22, 0.4);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.02em;
}

:global(body.light-theme) .tooltip-header {
  color: #0f172a;
}

.tooltip-num {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  color: var(--color-ai-orange, #f97316);
  font-weight: 800;
  background: rgba(249, 115, 22, 0.12);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}

.tooltip-icon {
  font-size: 0.9rem;
}

.tooltip-title {
  color: #ffffff;
}

:global(body.light-theme) .tooltip-title {
  color: #0f172a;
}

.tooltip-subtitle {
  margin-top: 0.2rem;
  font-size: 0.72rem;
  color: var(--text-muted, #94a3b8);
  max-width: 200px;
  line-height: 1.3;
}

:global(body.light-theme) .tooltip-subtitle {
  color: #64748b;
}

.tooltip-arrow {
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 9px;
  height: 9px;
  background: rgba(15, 23, 42, 0.95);
  border-top: 1px solid rgba(249, 115, 22, 0.35);
  border-right: 1px solid rgba(249, 115, 22, 0.35);
}

:global(body.light-theme) .tooltip-arrow {
  background: rgba(255, 255, 255, 0.97);
  border-color: rgba(249, 115, 22, 0.4);
}

/* Tooltip animation */
.tooltip-slide-enter-active,
.tooltip-slide-leave-active {
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

.tooltip-slide-enter-from,
.tooltip-slide-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(8px);
}

/* ── Page Counter Pill HUD ── */
.pagination-counter-pill {
  margin-top: 0.2rem;
  padding: 0.2rem 0.45rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-family: var(--font-mono, monospace);
  font-size: 0.68rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 2px;
  letter-spacing: 0.03em;
}

:global(body.light-theme) .pagination-counter-pill {
  background: rgba(0, 0, 0, 0.04);
  border-color: rgba(0, 0, 0, 0.08);
}

.curr-page {
  color: var(--color-ai-orange, #f97316);
  font-weight: 800;
}

.divider {
  color: var(--text-muted, #64748b);
  opacity: 0.6;
}

.total-pages {
  color: var(--text-muted, #94a3b8);
}

:global(body.light-theme) .total-pages {
  color: #64748b;
}

/* ── Snap Toggle Button ── */
.pagination-snap-toggle {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 0.2rem 0.4rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-muted, #94a3b8);
  font-family: var(--font-mono, monospace);
  font-size: 0.6rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-snap-toggle:hover {
  background: rgba(249, 115, 22, 0.15);
  color: #ffffff;
  border-color: rgba(249, 115, 22, 0.3);
}

.pagination-snap-toggle.snap-active {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.4);
  color: #10b981;
}

.snap-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #64748b;
}

.snap-active .snap-dot {
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
}

/* ── Mobile Compact View ── */
@media (max-width: 768px) {
  .ithunt-vertical-pagination {
    right: 0.5rem;
  }

  .pagination-glass-rail {
    padding: 0.45rem 0.3rem;
    gap: 0.35rem;
    backdrop-filter: blur(12px);
  }

  .pagination-chevron-btn {
    width: 22px;
    height: 22px;
  }

  .pagination-dots-list {
    gap: 0.38rem;
  }

  .pagination-dot-btn {
    width: 18px;
    height: 18px;
  }

  .dot-core {
    width: 6px;
    height: 6px;
  }

  .pagination-dot-btn.active .dot-core {
    width: 8px;
    height: 14px;
  }

  .pagination-counter-pill {
    font-size: 0.6rem;
    padding: 0.15rem 0.3rem;
  }

  .pagination-snap-toggle {
    display: none; /* Hide snap button on very small screens to keep dock ultra-compact */
  }

  .pagination-tooltip-card {
    display: none; /* Don't display hover tooltips on touch devices */
  }
}
</style>
