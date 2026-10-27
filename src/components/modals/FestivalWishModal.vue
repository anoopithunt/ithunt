<template>
  <Teleport to="body">
    <Transition name="festive-modal-anim">
      <div 
        v-if="isOpen" 
        class="festive-modal-overlay" 
        @click.self="handleClose" 
        role="dialog" 
        aria-modal="true" 
        :aria-label="currentWish.title || 'Festival Greetings'"
      >
        <div 
          class="festive-modal-card" 
          :class="['theme-' + (currentWish.theme || 'freedom')]"
        >
          <!-- Floating High-Contrast Close Button -->
          <button 
            type="button"
            class="festive-close-btn" 
            @click="handleClose" 
            aria-label="Close festival greetings"
            title="Close (Esc)"
          >
            ✕
          </button>

          <!-- Top Themed Decorative Header Banner -->
          <div class="festive-banner-strip">
            <div class="festive-badge">
              <span class="festive-badge-icon">{{ festivalIcon }}</span>
              <span class="festive-badge-text">{{ currentWish.occasion || 'SPECIAL OCCASION' }} • IT HUNT</span>
            </div>

            <!-- Animated Sparkle Particles in Banner -->
            <div class="festive-sparkles" aria-hidden="true">
              <span class="sparkle sp-1">✨</span>
              <span class="sparkle sp-2">🌟</span>
              <span class="sparkle sp-3">✨</span>
            </div>
          </div>

          <!-- Scrollable Main Body Content (Guaranteed Visible on All Viewports) -->
          <div class="festive-body-scrollable">
            <div class="festive-title-row">
              <div class="festive-icon-circle">{{ festivalMainSymbol }}</div>
              <div class="festive-titles-wrap">
                <h2 class="festive-title">{{ currentWish.title }}</h2>
                <div class="festive-tagline" v-if="currentWish.tagline">{{ currentWish.tagline }}</div>
              </div>
            </div>

            <p class="festive-message">
              {{ currentWish.message }}
            </p>

            <!-- Highlighted Special Offer / Scholarship Box (if configured) -->
            <div v-if="currentWish.specialOffer" class="festive-offer-box">
              <div class="offer-box-header">
                <span class="offer-tag">🎁 CELEBRATION BENEFIT</span>
              </div>
              <div class="offer-box-text">
                {{ currentWish.specialOffer }}
              </div>
            </div>

            <!-- Directorate Signature Note -->
            <div class="festive-director-note">
              <div class="director-avatar-mini">
                <img src="/img/ithunt.webp" alt="Director IT HUNT" @error="onImgError">
              </div>
              <div class="director-text">
                <span class="director-name">Mr. Lakshman Singh Chauhan</span>
                <span class="director-desig">Director, IT HUNT Software Solutions & Tech Academy</span>
              </div>
            </div>
          </div>

          <!-- Fixed Action Footer (Pinned & Never Pushed Off-Screen) -->
          <div class="festive-footer">
            <label class="festive-dismiss-option">
              <input type="checkbox" v-model="dismissForSession">
              <span>Don't show again today</span>
            </label>

            <div class="festive-actions-row">
              <button 
                type="button" 
                class="festive-btn-secondary" 
                @click="handleClose"
              >
                Continue to Site
              </button>
              <button 
                type="button" 
                class="festive-btn-primary" 
                @click="handleAction"
              >
                <span>{{ currentWish.ctaText || 'Explore Courses & Batches 🚀' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  wish: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close', 'action']);

const dismissForSession = ref(false);

const currentWish = computed(() => {
  const w = props.wish || {};
  return {
    title: w.title || '🇮🇳 Happy Independence Day from IT HUNT!',
    occasion: w.occasion || 'FREEDOM CELEBRATION',
    tagline: w.tagline || 'Freedom to Code, Innovate & Build the Future',
    message: w.message || 'On this auspicious occasion, celebrate freedom with knowledge and skills. Join our elite software engineering internships, AI tracks, and industry programs.',
    specialOffer: w.specialOffer || 'Special Festive Scholarship: Up to 25% Fee Waiver on All Coding Bootcamps!',
    ctaText: w.ctaText || 'Claim Festive Scholarship 🚀',
    ctaAction: w.ctaAction || 'admission',
    theme: w.theme || 'freedom'
  };
});

const festivalIcon = computed(() => {
  const theme = currentWish.value.theme;
  if (theme === 'freedom' || theme === 'republic') return '🇮🇳';
  if (theme === 'diwali') return '🪔';
  if (theme === 'holi') return '🎨';
  if (theme === 'eid') return '🌙';
  if (theme === 'newyear') return '🎆';
  return '🎉';
});

const festivalMainSymbol = computed(() => {
  const theme = currentWish.value.theme;
  if (theme === 'freedom' || theme === 'republic') return '🇮🇳';
  if (theme === 'diwali') return '🪔';
  if (theme === 'holi') return '🎨';
  if (theme === 'eid') return '🌙';
  if (theme === 'newyear') return '✨';
  return '🎉';
});

const handleClose = () => {
  if (dismissForSession.value) {
    try {
      localStorage.setItem('ithunt_festival_dismissed_until', String(Date.now() + 24 * 60 * 60 * 1000));
    } catch (e) {}
  }
  emit('close');
};

const handleAction = () => {
  if (dismissForSession.value) {
    try {
      localStorage.setItem('ithunt_festival_dismissed_until', String(Date.now() + 24 * 60 * 60 * 1000));
    } catch (e) {}
  }
  emit('action', currentWish.value.ctaAction || 'admission');
  emit('close');
};

const onKeydown = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    handleClose();
  }
};

const onImgError = (e) => {
  e.target.src = '/img/ithunt-logo.svg';
};

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
/* ==========================================================================
   PERFECTLY CENTERED, 100% RESPONSIVE, THEME-ADAPTIVE FESTIVAL MODAL
   ========================================================================== */

/* Fullscreen Dead-Center Overlay */
.festive-modal-overlay {
  position: fixed;
  inset: 0;
  top: 0;
  left: 0;
  width: 100vw;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background: rgba(4, 7, 18, 0.86);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  box-sizing: border-box;
  overflow: hidden;
}

:global(body.light-theme) .festive-modal-overlay {
  background: rgba(15, 23, 42, 0.72) !important;
}

/* Modal Card Container */
.festive-modal-card {
  position: relative;
  width: 100%;
  max-width: 530px;
  margin: auto;
  max-height: min(92vh, 690px);
  max-height: min(92dvh, 690px);
  display: flex;
  flex-direction: column;
  background: #0c1322;
  color: #f8fafc;
  border-radius: 24px;
  border: 1.5px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 25px 70px -10px rgba(0, 0, 0, 0.9), 0 0 50px rgba(249, 115, 22, 0.22);
  overflow: hidden;
  font-family: var(--font-sans, system-ui, -apple-system, BlinkMacSystemFont, sans-serif);
  box-sizing: border-box;
}

/* Light Theme Adaptability for Entire Card */
:global(body.light-theme) .festive-modal-card {
  background: #ffffff !important;
  color: #0f172a !important;
  border: 1.5px solid #e2e8f0 !important;
  box-shadow: 0 25px 70px -10px rgba(15, 23, 42, 0.28), 0 0 45px rgba(249, 115, 22, 0.18) !important;
}

/* Floating High-Contrast Close Button */
.festive-close-btn {
  position: absolute;
  top: 12px;
  right: 14px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(9, 14, 26, 0.75);
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
  transition: all 0.2s ease;
  line-height: 1;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.35);
}

.festive-close-btn:hover {
  background: #ef4444 !important;
  border-color: #ef4444 !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  transform: rotate(90deg) scale(1.08);
}

/* Top Banner Header Strip */
.festive-banner-strip {
  padding: 1.15rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
}

/* Theme 1: Freedom Day & Republic Day (Indian Tricolor) */
.theme-freedom .festive-banner-strip,
.theme-republic .festive-banner-strip {
  background: linear-gradient(90deg, #ea580c 0%, #ffffff 50%, #15803d 100%) !important;
  border-bottom: 2px solid rgba(234, 88, 12, 0.5);
}
.theme-freedom .festive-badge,
.theme-republic .festive-badge {
  background: #090e1a !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Theme 2: Diwali (Deep Radiant Gold, Amber & Crimson) */
.theme-diwali .festive-banner-strip {
  background: linear-gradient(90deg, #7c2d12 0%, #b45309 35%, #f59e0b 70%, #d97706 100%) !important;
  border-bottom: 2px solid rgba(251, 191, 36, 0.6);
}
.theme-diwali .festive-badge {
  background: #1c0e03 !important;
  color: #fef08a !important;
  border: 1px solid rgba(251, 191, 36, 0.5);
}

/* Theme 3: Holi (Vibrant Colorful Gulal Splash) */
.theme-holi .festive-banner-strip {
  background: linear-gradient(90deg, #be185d 0%, #7e22ce 33%, #0284c7 66%, #059669 100%) !important;
  border-bottom: 2px solid rgba(190, 24, 93, 0.5);
}
.theme-holi .festive-badge {
  background: #090e1a !important;
  color: #fdf2f8 !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Theme 4: Eid (Royal Emerald & Golden Moonlit) */
.theme-eid .festive-banner-strip {
  background: linear-gradient(90deg, #064e3b 0%, #047857 50%, #b45309 100%) !important;
  border-bottom: 2px solid rgba(16, 185, 129, 0.5);
}
.theme-eid .festive-badge {
  background: #022c22 !important;
  color: #a7f3d0 !important;
  border: 1px solid rgba(52, 211, 153, 0.45);
}

/* Theme 5: New Year (Midnight & Purple Spark) */
.theme-newyear .festive-banner-strip {
  background: linear-gradient(90deg, #312e81 0%, #6d28d9 50%, #d97706 100%) !important;
  border-bottom: 2px solid rgba(109, 40, 217, 0.5);
}
.theme-newyear .festive-badge {
  background: #0f172a !important;
  color: #e0e7ff !important;
  border: 1px solid rgba(199, 210, 254, 0.4);
}

/* Theme 6: Custom Celebration (Royal Aurora Glow) */
.theme-custom .festive-banner-strip {
  background: linear-gradient(90deg, #ea580c 0%, #7c3aed 50%, #0284c7 100%) !important;
  border-bottom: 2px solid rgba(124, 58, 237, 0.5);
}
.theme-custom .festive-badge {
  background: #090e1a !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Festive Pill Badge */
.festive-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  z-index: 5;
}

.festive-badge-icon {
  font-size: 0.95rem;
  line-height: 1;
}

.festive-badge-text {
  font-weight: 800;
  color: inherit !important;
  -webkit-text-fill-color: initial !important;
}

/* Sparkles in Banner (With Drop-Shadow for 100% Visibility on White) */
.festive-sparkles {
  margin-left: auto;
  margin-right: 2.75rem;
  display: flex;
  gap: 0.5rem;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.65));
}
.sparkle {
  font-size: 1rem;
  animation: sparkle-pulse 2s ease-in-out infinite alternate;
}
.sp-1 { animation-delay: 0s; }
.sp-2 { animation-delay: 0.6s; font-size: 0.85rem; }
.sp-3 { animation-delay: 1.2s; font-size: 1.1rem; }

@keyframes sparkle-pulse {
  0% { transform: scale(0.85) rotate(-10deg); opacity: 0.75; }
  100% { transform: scale(1.2) rotate(15deg); opacity: 1; }
}

/* Scrollable Inner Body (Prevents modal cut-off on ANY viewport height) */
.festive-body-scrollable {
  flex: 1 1 auto;
  min-height: 0; /* CRITICAL: allows flex child to shrink properly */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  padding: 1.35rem 1.6rem 1.15rem;
}

/* Title & Emblem Row */
.festive-title-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.15rem;
}

.festive-icon-circle {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(255, 255, 255, 0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  flex-shrink: 0;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

:global(body.light-theme) .festive-icon-circle {
  background: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.festive-titles-wrap {
  flex: 1;
  min-width: 0;
}

.festive-title {
  font-family: var(--font-heading, inherit);
  font-size: 1.3rem;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.025em;
  margin: 0;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  word-break: break-word;
}

:global(body.light-theme) .festive-title {
  color: #0f172a !important;
  -webkit-text-fill-color: #0f172a !important;
}

.festive-tagline {
  font-size: 0.84rem;
  color: #fbbf24 !important;
  -webkit-text-fill-color: #fbbf24 !important;
  font-weight: 700;
  margin-top: 0.25rem;
  line-height: 1.35;
}

:global(body.light-theme) .festive-tagline {
  color: #b45309 !important;
  -webkit-text-fill-color: #b45309 !important;
}

/* Greeting Message */
.festive-message {
  font-size: 0.92rem;
  line-height: 1.65;
  color: #e2e8f0 !important;
  -webkit-text-fill-color: #e2e8f0 !important;
  margin: 0 0 1.15rem 0;
  word-break: break-word;
}

:global(body.light-theme) .festive-message {
  color: #334155 !important;
  -webkit-text-fill-color: #334155 !important;
}

/* Special Offer Box */
.festive-offer-box {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(249, 115, 22, 0.12) 100%) !important;
  border: 1.5px solid rgba(245, 158, 11, 0.45) !important;
  border-radius: 14px;
  padding: 0.85rem 1.1rem;
  margin-bottom: 1.15rem;
}

:global(body.light-theme) .festive-offer-box {
  background: #fffbeb !important;
  border: 1.5px solid #fcd34d !important;
}

.offer-box-header {
  margin-bottom: 0.25rem;
}

.offer-tag {
  font-size: 0.68rem;
  font-weight: 800;
  color: #fbbf24 !important;
  -webkit-text-fill-color: #fbbf24 !important;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

:global(body.light-theme) .offer-tag {
  color: #92400e !important;
  -webkit-text-fill-color: #92400e !important;
}

.offer-box-text {
  font-size: 0.9rem;
  font-weight: 700;
  color: #fef08a !important;
  -webkit-text-fill-color: #fef08a !important;
  line-height: 1.45;
  margin-top: 0.2rem;
}

:global(body.light-theme) .offer-box-text {
  color: #78350f !important;
  -webkit-text-fill-color: #78350f !important;
}

/* Director Note */
.festive-director-note {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-top: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

:global(body.light-theme) .festive-director-note {
  border-top-color: #e2e8f0 !important;
}

.director-avatar-mini img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid #f97316;
}

.director-text {
  display: flex;
  flex-direction: column;
}

.director-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: #f8fafc !important;
  -webkit-text-fill-color: #f8fafc !important;
}

:global(body.light-theme) .director-name {
  color: #0f172a !important;
  -webkit-text-fill-color: #0f172a !important;
}

.director-desig {
  font-size: 0.7rem;
  color: #94a3b8 !important;
  -webkit-text-fill-color: #94a3b8 !important;
}

:global(body.light-theme) .director-desig {
  color: #475569 !important;
  -webkit-text-fill-color: #475569 !important;
}

/* Fixed Footer Actions */
.festive-footer {
  padding: 0.95rem 1.6rem 1.15rem;
  background: rgba(6, 11, 23, 0.88);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  flex-wrap: wrap;
  flex-shrink: 0;
  box-sizing: border-box;
}

:global(body.light-theme) .festive-footer {
  background: #f8fafc !important;
  border-top-color: #e2e8f0 !important;
}

.festive-dismiss-option {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.76rem;
  color: #cbd5e1 !important;
  -webkit-text-fill-color: #cbd5e1 !important;
  cursor: pointer;
  user-select: none;
}

:global(body.light-theme) .festive-dismiss-option {
  color: #334155 !important;
  -webkit-text-fill-color: #334155 !important;
}

.festive-dismiss-option span {
  color: inherit !important;
  -webkit-text-fill-color: initial !important;
}

.festive-dismiss-option input {
  cursor: pointer;
  accent-color: #f97316;
}

.festive-actions-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.festive-btn-secondary {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.22) !important;
  color: #f1f5f9 !important;
  -webkit-text-fill-color: #f1f5f9 !important;
  padding: 0.58rem 1.05rem;
  border-radius: 12px;
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

:global(body.light-theme) .festive-btn-secondary {
  background: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
  color: #0f172a !important;
  -webkit-text-fill-color: #0f172a !important;
}

.festive-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.16) !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

:global(body.light-theme) .festive-btn-secondary:hover {
  background: #e2e8f0 !important;
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
}

.festive-btn-primary {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.45) !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.festive-btn-primary * {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

.festive-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.6) !important;
  background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%) !important;
}

/* Modal Animations */
.festive-modal-anim-enter-active,
.festive-modal-anim-leave-active {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.festive-modal-anim-enter-active .festive-modal-card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
}

.festive-modal-anim-leave-active .festive-modal-card {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
}

.festive-modal-anim-enter-from {
  opacity: 0;
}
.festive-modal-anim-enter-from .festive-modal-card {
  opacity: 0;
  transform: scale(0.9) translateY(16px);
}

.festive-modal-anim-leave-to {
  opacity: 0;
}
.festive-modal-anim-leave-to .festive-modal-card {
  opacity: 0;
  transform: scale(0.95) translateY(12px);
}

/* Responsive Media Queries */
@media (max-width: 640px) {
  .festive-modal-overlay {
    padding: 0.75rem;
  }
  .festive-modal-card {
    border-radius: 20px;
    max-height: calc(100dvh - 1.5rem);
  }
  .festive-banner-strip {
    padding: 0.95rem 1.15rem;
  }
  .festive-body-scrollable {
    padding: 1.15rem 1.15rem 0.95rem;
  }
  .festive-title {
    font-size: 1.18rem;
  }
  .festive-footer {
    padding: 0.85rem 1.15rem 1.15rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  .festive-actions-row {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }
  .festive-btn-primary, 
  .festive-btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
