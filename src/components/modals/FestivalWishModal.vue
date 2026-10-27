<template>
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
        <!-- Floating Close Button -->
        <button 
          class="festive-close-btn" 
          @click="handleClose" 
          aria-label="Close greetings modal"
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
        </div>

        <!-- Animated Sparkle Particles -->
        <div class="festive-sparkles" aria-hidden="true">
          <span class="sparkle sp-1">✨</span>
          <span class="sparkle sp-2">🌟</span>
          <span class="sparkle sp-3">✨</span>
          <span class="sparkle sp-4">🎉</span>
        </div>

        <!-- Main Body Content -->
        <div class="festive-body">
          <div class="festive-title-row">
            <div class="festive-icon-circle">{{ festivalMainSymbol }}</div>
            <div>
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

        <!-- Action Footer -->
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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
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
/* Festive Overlay */
.festive-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(3, 7, 18, 0.78);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  overflow-y: auto;
}

/* Festive Card */
.festive-modal-card {
  position: relative;
  width: 100%;
  max-width: 580px;
  background: #0b1120;
  color: #f8fafc;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 25px 70px -10px rgba(0, 0, 0, 0.7), 0 0 50px rgba(249, 115, 22, 0.15);
  overflow: hidden;
  font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
}

/* Light Theme Adaptability */
:global(body.light-theme) .festive-modal-card {
  background: #ffffff;
  color: #0f172a;
  border-color: rgba(0, 0, 0, 0.08);
  box-shadow: 0 25px 70px -10px rgba(15, 23, 42, 0.25), 0 0 50px rgba(249, 115, 22, 0.1);
}

/* Close Button */
.festive-close-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.45);
  color: #f8fafc;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  transition: all 0.2s ease;
}

.festive-close-btn:hover {
  background: rgba(239, 68, 68, 0.9);
  color: #fff;
  transform: rotate(90deg);
}

/* Top Banner Strips based on Theme */
.festive-banner-strip {
  padding: 1.25rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

/* Theme 1: Freedom / Republic (Indian Tricolor Saffron, White, Emerald) */
.theme-freedom .festive-banner-strip,
.theme-republic .festive-banner-strip {
  background: linear-gradient(135deg, rgba(255, 153, 51, 0.9) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(19, 136, 8, 0.9) 100%);
  border-bottom: 2px solid rgba(255, 153, 51, 0.4);
}
.theme-freedom .festive-badge,
.theme-republic .festive-badge {
  background: rgba(11, 17, 32, 0.88);
  color: #fff;
}

/* Theme 2: Diwali (Deep Gold, Amber, Rich Crimson) */
.theme-diwali .festive-banner-strip {
  background: linear-gradient(135deg, #b45309 0%, #f59e0b 50%, #d97706 100%);
  border-bottom: 2px solid rgba(251, 191, 36, 0.4);
}
.theme-diwali .festive-badge {
  background: rgba(20, 10, 0, 0.85);
  color: #fef08a;
  border-color: rgba(251, 191, 36, 0.4);
}

/* Theme 3: Holi (Vibrant Rainbow Splash) */
.theme-holi .festive-banner-strip {
  background: linear-gradient(135deg, #ec4899 0%, #f59e0b 33%, #10b981 66%, #6366f1 100%);
  border-bottom: 2px solid rgba(236, 72, 153, 0.4);
}
.theme-holi .festive-badge {
  background: rgba(11, 17, 32, 0.9);
  color: #fdf2f8;
}

/* Theme 4: Eid (Emerald & Gold) */
.theme-eid .festive-banner-strip {
  background: linear-gradient(135deg, #065f46 0%, #10b981 50%, #f59e0b 100%);
  border-bottom: 2px solid rgba(16, 185, 129, 0.4);
}
.theme-eid .festive-badge {
  background: rgba(6, 40, 30, 0.9);
  color: #a7f3d0;
}

/* Theme 5: New Year (Cyber Midnight & Electric Gold) */
.theme-newyear .festive-banner-strip {
  background: linear-gradient(135deg, #4f46e5 0%, #9333ea 50%, #f59e0b 100%);
  border-bottom: 2px solid rgba(147, 51, 234, 0.4);
}
.theme-newyear .festive-badge {
  background: rgba(11, 17, 32, 0.9);
  color: #e0e7ff;
}

/* Badge in Banner */
.festive-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

/* Sparkles */
.festive-sparkles {
  position: absolute;
  top: 1rem;
  right: 3.5rem;
  pointer-events: none;
}
.sparkle {
  position: absolute;
  font-size: 1.1rem;
  animation: sparkle-float 2.5s ease-in-out infinite alternate;
}
.sp-1 { top: 0; right: 0; animation-delay: 0s; }
.sp-2 { top: 18px; right: 28px; font-size: 0.85rem; animation-delay: 0.7s; }
.sp-3 { top: -8px; right: 50px; font-size: 1rem; animation-delay: 1.3s; }
.sp-4 { top: 12px; right: 75px; font-size: 0.9rem; animation-delay: 0.4s; }

@keyframes sparkle-float {
  0% { transform: translateY(0) scale(0.85) rotate(0deg); opacity: 0.6; }
  100% { transform: translateY(-6px) scale(1.15) rotate(15deg); opacity: 1; }
}

/* Main Body */
.festive-body {
  padding: 1.75rem 2rem 1.25rem;
}

.festive-title-row {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-bottom: 1.15rem;
}

.festive-icon-circle {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.85rem;
  flex-shrink: 0;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

:global(body.light-theme) .festive-icon-circle {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.festive-title {
  font-family: var(--font-heading, inherit);
  font-size: 1.45rem;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.025em;
  margin: 0;
  color: #fff;
}

:global(body.light-theme) .festive-title {
  color: #0f172a;
}

.festive-tagline {
  font-size: 0.84rem;
  color: #f59e0b;
  font-weight: 600;
  margin-top: 0.25rem;
}

.festive-message {
  font-size: 0.96rem;
  line-height: 1.65;
  color: #94a3b8;
  margin-bottom: 1.35rem;
}

:global(body.light-theme) .festive-message {
  color: #475569;
}

/* Offer Box */
.festive-offer-box {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(249, 115, 22, 0.08) 100%);
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.35rem;
  position: relative;
}

:global(body.light-theme) .festive-offer-box {
  background: linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%);
  border-color: #fcd34d;
}

.offer-box-header {
  margin-bottom: 0.35rem;
}

.offer-tag {
  font-size: 0.7rem;
  font-weight: 800;
  color: #f59e0b;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.offer-box-text {
  font-size: 0.95rem;
  font-weight: 700;
  color: #fbbf24;
  line-height: 1.45;
}

:global(body.light-theme) .offer-box-text {
  color: #b45309;
}

/* Director Note */
.festive-director-note {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

:global(body.light-theme) .festive-director-note {
  border-color: rgba(0, 0, 0, 0.08);
}

.director-avatar-mini img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid #f97316;
}

.director-text {
  display: flex;
  flex-direction: column;
}

.director-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #e2e8f0;
}

:global(body.light-theme) .director-name {
  color: #1e293b;
}

.director-desig {
  font-size: 0.72rem;
  color: #64748b;
}

/* Footer Actions */
.festive-footer {
  padding: 1.15rem 2rem 1.6rem;
  background: rgba(0, 0, 0, 0.25);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

:global(body.light-theme) .festive-footer {
  background: #f8fafc;
  border-color: #e2e8f0;
}

.festive-dismiss-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: #64748b;
  cursor: pointer;
  user-select: none;
}

.festive-dismiss-option input {
  cursor: pointer;
  accent-color: #f97316;
}

.festive-actions-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.festive-btn-secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #94a3b8;
  padding: 0.65rem 1.15rem;
  border-radius: 12px;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

:global(body.light-theme) .festive-btn-secondary {
  border-color: #cbd5e1;
  color: #475569;
}

.festive-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

:global(body.light-theme) .festive-btn-secondary:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.festive-btn-primary {
  background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%);
  color: #ffffff;
  border: none;
  padding: 0.65rem 1.35rem;
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.35);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.festive-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.5);
  background: linear-gradient(135deg, #ea580c 0%, #d97706 100%);
}

/* Animations */
.festive-modal-anim-enter-active,
.festive-modal-anim-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.festive-modal-anim-enter-active .festive-modal-card {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.festive-modal-anim-leave-active .festive-modal-card {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
}

.festive-modal-anim-enter-from {
  opacity: 0;
}
.festive-modal-anim-enter-from .festive-modal-card {
  opacity: 0;
  transform: scale(0.92) translateY(20px);
}

.festive-modal-anim-leave-to {
  opacity: 0;
}
.festive-modal-anim-leave-to .festive-modal-card {
  opacity: 0;
  transform: scale(0.95) translateY(15px);
}

@media (max-width: 640px) {
  .festive-modal-card {
    border-radius: 20px;
  }
  .festive-body {
    padding: 1.25rem 1.25rem 1rem;
  }
  .festive-title {
    font-size: 1.25rem;
  }
  .festive-footer {
    padding: 1rem 1.25rem 1.25rem;
    flex-direction: column;
    align-items: stretch;
  }
  .festive-actions-row {
    flex-direction: column;
    width: 100%;
  }
  .festive-btn-primary, .festive-btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
