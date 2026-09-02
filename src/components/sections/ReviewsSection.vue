<template>
  <section class="container reviews-page-wrapper" style="padding: 3.5rem 1.5rem 5rem;">
    <!-- 1. HEADER WITH HERO CTA -->
    <div class="section-header anim-stagger-1">
      <div class="internship-live-pill" style="margin-bottom: 1rem;">
        <span class="pulse-dot"></span>
        <span>{{ content.reviewsSection?.tagline || 'QUALITY & FACILITY EVALUATION 2026' }}</span>
      </div>

      <h1 class="section-title">
        {{ content.reviewsSection?.titlePrefix }}<span class="text-gradient">{{ content.reviewsSection?.titleGradient }}</span>
      </h1>

      <p class="section-subtitle">
        {{ content.reviewsSection?.description }}
      </p>

      <!-- Prominent Header Action Buttons -->
      <div style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <button class="btn-primary highlight-pulse-btn" @click="scrollToReviewForm">
          <span>✍️ Leave a Review & Rating ⭐</span>
        </button>
        <button class="btn-secondary" @click="selectedCategory = 'all'; selectedRatingFilter = 0;">
          <span>Browse All {{ reviewsList.length }} Reviews 📖</span>
        </button>
      </div>
    </div>

    <!-- 2. RATING SUMMARY & METRIC BREAKDOWN CARD -->
    <div class="rating-summary-card anim-stagger-2">
      <div class="rating-score-column">
        <div class="big-rating-score text-gradient-gold">{{ content.reviewsSection?.overallScore || '4.9' }}</div>
        <div class="star-rating-display" style="font-size: 1.5rem; margin: 0.35rem 0;">{{ content.reviewsSection?.overallStars || '★★★★★' }}</div>
        <div class="rating-count-sub">{{ content.reviewsSection?.totalCountLabel || 'Based on 250+ Verified Reviews' }}</div>
        
        <button class="btn-primary quick-write-btn" @click="scrollToReviewForm" style="margin-top: 1.25rem; font-size: 0.88rem; padding: 0.6rem 1.15rem; width: 100%; justify-content: center;">
          <span>⭐ Write a Review Now</span>
        </button>
      </div>

      <div class="rating-metrics-column">
        <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; margin-bottom: 1.15rem; color: var(--text-main);">
          {{ content.reviewsSectionUI?.metricsHeading || 'Facility & Development Evaluation Metrics' }}
        </h4>
        
        <div class="metric-bar-wrapper" v-for="metric in (content.reviewsSection?.facilityMetrics || defaultFacilityMetrics)" :key="metric.name">
          <div class="metric-bar-header">
            <span style="font-weight: 600; color: var(--text-main); font-size: 0.9rem;">{{ metric.name }}</span>
            <span style="font-weight: 800; color: var(--color-ai-cyan); font-family: var(--font-mono); font-size: 0.85rem;">{{ metric.score }} / 5.0</span>
          </div>
          <div class="metric-bar-track">
            <div class="metric-bar-fill" :style="{ width: (metric.score / 5 * 100) + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. REVIEW FILTER BAR -->
    <div class="reviews-filter-bar anim-stagger-2">
      <div class="internship-filter-capsule">
        <button 
          v-for="cat in filterCategories" 
          :key="cat.id"
          class="filter-capsule-btn"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectedCategory = cat.id"
        >
          <span>{{ cat.label }}</span>
        </button>
      </div>

      <div style="display: flex; gap: 0.75rem; align-items: center;">
        <select v-model.number="selectedRatingFilter" class="form-control" style="padding: 0.55rem 0.85rem; font-size: 0.85rem; min-width: 150px;">
          <option :value="0">⭐ All Star Ratings</option>
          <option :value="5">⭐⭐⭐⭐⭐ 5 Stars Only</option>
          <option :value="4">⭐⭐⭐⭐ 4 Stars & Above</option>
        </select>

        <button class="btn-primary" style="padding: 0.55rem 1rem; font-size: 0.85rem;" @click="scrollToReviewForm">
          <span>+ Add Review ✍️</span>
        </button>
      </div>
    </div>

    <!-- 4. REVIEWS SHOWCASE GRID -->
    <div class="reviews-grid anim-stagger-3">
      <div class="review-card" v-for="review in filteredReviews" :key="review.id">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; flex-wrap: wrap; gap: 0.5rem;">
          <span class="star-rating-display" style="font-size: 1.1rem; color: #facc15;">
            {{ '★'.repeat(review.rating || 5) }}{{ '☆'.repeat(5 - (review.rating || 5)) }}
          </span>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="skill-tag" style="font-size: 0.7rem; padding: 0.2rem 0.5rem; background: rgba(56, 189, 248, 0.12); color: var(--color-ai-cyan); border-color: rgba(56, 189, 248, 0.3);">
              {{ review.category || 'Labs & Mentorship' }}
            </span>
            <span style="font-size: 0.75rem; color: var(--text-dim); font-family: var(--font-mono);">{{ review.date }}</span>
          </div>
        </div>

        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.65; margin-bottom: 1.25rem; font-style: italic;">
          "{{ review.comment }}"
        </p>

        <div class="review-author">
          <img :src="review.avatar || 'img/student-placeholder.svg'" :alt="review.name" class="review-avatar" @error="onImgError">
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 800; font-size: 0.92rem; color: var(--text-main);">{{ review.name }}</div>
            <div style="font-size: 0.775rem; color: var(--color-ai-cyan); font-family: var(--font-mono); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              {{ review.role }}
            </div>
          </div>
          <span class="verified-badge-pill" title="Verified Student of IT HUNT">✓ Verified</span>
        </div>
      </div>

      <div v-if="filteredReviews.length === 0" style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem; background: var(--bg-card-glass); border-radius: var(--radius-lg); border: 1px solid var(--border-cyber);">
        <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">⭐</div>
        <h3 style="font-family: var(--font-heading); color: var(--text-main); font-size: 1.25rem; margin-bottom: 0.4rem;">No reviews found for this filter</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Be the first student to leave a review in this category!</p>
        <button class="btn-primary" @click="scrollToReviewForm"><span>Leave Review Now ✍️</span></button>
      </div>
    </div>

    <!-- 5. ULTRA-HIGHLIGHTED "LEAVE A REVIEW" SECTION -->
    <div id="review-submission-form" ref="reviewFormRef" class="review-highlight-container anim-stagger-4">
      <!-- Glow Aura Backdrop -->
      <div class="review-glow-backdrop" aria-hidden="true"></div>

      <div class="review-highlight-card">
        <!-- Floating Header Badge -->
        <div style="display: flex; justify-content: center; margin-bottom: 1.25rem;">
          <div class="review-floating-pill">
            <span class="pulse-dot"></span>
            <span>🌟 OFFICIAL STUDENT SCORECARD & FEEDBACK HUB</span>
          </div>
        </div>

        <div class="review-card-head">
          <h2 class="review-highlight-title">
            Share Your Experience & <span class="text-gradient">Rate IT HUNT</span>
          </h2>
          <p class="review-highlight-desc">
            Your honest feedback regarding practical coding labs, faculty guidance, live client projects, and placement assistance directly helps aspiring students make confident career choices.
          </p>
        </div>

        <!-- Review Form -->
        <form @submit.prevent="handleSubmitReview" class="highlighted-review-form">
          <!-- 1. Star Rating Interactive Selector -->
          <div class="rating-interactive-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <label class="rating-picker-title">
                <span>⭐</span> Select Your Overall Experience Rating: <span class="req">*</span>
              </label>
              <span class="rating-badge-feedback text-gradient-gold">
                {{ getRatingLabel(hoverRating || newReview.rating) }}
              </span>
            </div>

            <div class="star-rating-selector-glow">
              <button 
                type="button" 
                v-for="star in 5" 
                :key="star"
                class="star-glow-btn"
                :class="{ active: star <= (hoverRating || newReview.rating) }"
                @mouseenter="hoverRating = star"
                @mouseleave="hoverRating = 0"
                @click="newReview.rating = star"
                :title="`${star} Stars`"
              >
                ★
              </button>
              <span class="star-count-indicator">({{ hoverRating || newReview.rating }} / 5.0)</span>
            </div>
          </div>

          <div class="form-grid" style="margin-top: 1.75rem;">
            <!-- Candidate Name -->
            <div class="form-group">
              <label class="form-label" for="rev-name">
                <span>👤</span> {{ content.reviewsSectionUI?.fields?.nameLabel || 'Your Full Name' }} <span class="req">*</span>
              </label>
              <input 
                id="rev-name"
                type="text" 
                v-model="newReview.name" 
                required 
                class="form-control review-input-field" 
                :placeholder="content.reviewsSectionUI?.fields?.namePlaceholder || 'e.g. Rahul Mishra'"
              >
            </div>

            <!-- Course / Program -->
            <div class="form-group">
              <label class="form-label" for="rev-role">
                <span>🎓</span> {{ content.reviewsSectionUI?.fields?.roleLabel || 'Course / Program Attended' }} <span class="req">*</span>
              </label>
              <input 
                id="rev-role"
                type="text" 
                v-model="newReview.role" 
                required 
                class="form-control review-input-field" 
                :placeholder="content.reviewsSectionUI?.fields?.rolePlaceholder || 'e.g. MERN Stack 6-Mo Intern / NIELIT O Level'"
              >
            </div>

            <!-- Category Selector -->
            <div class="form-group full-width">
              <label class="form-label">
                <span>🏷️</span> Evaluation Focus Category:
              </label>
              <div class="category-chips-group-glow">
                <button 
                  type="button"
                  v-for="cat in categoryList"
                  :key="cat"
                  class="cat-chip-glow-btn"
                  :class="{ active: newReview.category === cat }"
                  @click="newReview.category = cat"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- Review Comment -->
            <div class="form-group full-width">
              <label class="form-label" for="rev-comment">
                <span>💬</span> {{ content.reviewsSectionUI?.fields?.reviewLabel || 'Your Detailed Review & Feedback' }} <span class="req">*</span>
              </label>
              <textarea 
                id="rev-comment"
                v-model="newReview.comment" 
                rows="4" 
                required 
                class="form-control review-input-field" 
                :placeholder="content.reviewsSectionUI?.fields?.reviewPlaceholder || 'Share your experience regarding facility quality, faculty guidance, live coding projects, and ease of development...'"
              ></textarea>
            </div>
          </div>

          <!-- Live Preview Box if user starts typing -->
          <div v-if="newReview.name || newReview.comment" class="review-live-preview-box">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--color-ai-yellow); font-family: var(--font-mono); margin-bottom: 0.5rem; text-transform: uppercase;">
              👁️ Real-Time Review Preview:
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <span style="color: #facc15; font-size: 1rem;">{{ '★'.repeat(newReview.rating) }}{{ '☆'.repeat(5 - newReview.rating) }}</span>
              <span class="skill-tag" style="font-size: 0.7rem;">{{ newReview.category }}</span>
            </div>
            <p style="font-size: 0.85rem; font-style: italic; color: var(--text-muted); margin-bottom: 0.5rem;">
              "{{ newReview.comment || 'Your review text will appear here...' }}"
            </p>
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-main);">
              {{ newReview.name || 'Candidate Name' }} • <span style="color: var(--color-ai-cyan); font-weight: 600;">{{ newReview.role || 'Course Attended' }}</span>
            </div>
          </div>

          <!-- Submit Button -->
          <div style="margin-top: 2rem;">
            <button type="submit" class="btn-primary review-submit-mega-btn">
              <span>{{ content.reviewsSectionUI?.fields?.submitBtn || 'Submit & Publish Verified Review ⭐ ➔' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { saveReviewRecord } from '../../utils/apiClient.js';

const props = defineProps({
  content: {
    type: Object,
    required: true
  },
  allReviews: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['review-submitted']);

const reviewFormRef = ref(null);
const selectedCategory = ref('all');
const selectedRatingFilter = ref(0);
const hoverRating = ref(0);

const defaultFacilityMetrics = [
  { name: 'Computer Labs & Workstations', score: 4.9 },
  { name: 'Faculty Expertise & Mentorship', score: 5.0 },
  { name: 'Internship LOR & Placement Support', score: 4.9 },
  { name: 'Curriculum & Ease of Development', score: 4.8 }
];

const categoryList = [
  '💻 Labs & Workstations',
  '🎓 Teaching & Mentorship',
  '🚀 Live Client Projects',
  '💼 Placement & LOR Support',
  '📚 Course Curriculum'
];

const filterCategories = [
  { id: 'all', label: '🌟 All Reviews' },
  { id: 'Labs & Workstations', label: '💻 Labs & Workstations' },
  { id: 'Teaching & Mentorship', label: '🎓 Faculty & Teaching' },
  { id: 'Placement & LOR', label: '💼 Placements & LOR' },
  { id: 'Course Curriculum', label: '📚 Course Curriculums' }
];

const reviewsList = ref([]);

watch(() => props.allReviews, (val) => {
  if (val) {
    reviewsList.value = val;
  }
}, { immediate: true, deep: true });

const newReview = ref({
  name: '',
  role: '',
  rating: 5,
  category: '💻 Labs & Workstations',
  comment: ''
});

const filteredReviews = computed(() => {
  return reviewsList.value.filter(rev => {
    const matchCategory = selectedCategory.value === 'all' || (rev.category && rev.category.toLowerCase().includes(selectedCategory.value.toLowerCase()));
    const matchRating = selectedRatingFilter.value === 0 || (rev.rating && rev.rating >= selectedRatingFilter.value);
    return matchCategory && matchRating;
  });
});

const getRatingLabel = (stars) => {
  switch (stars) {
    case 5: return '⭐⭐⭐⭐⭐ 5.0 - Exceptional Quality & Mentorship!';
    case 4: return '⭐⭐⭐⭐ 4.0 - Very Good & Highly Recommended!';
    case 3: return '⭐⭐⭐ 3.0 - Good Standard';
    case 2: return '⭐⭐ 2.0 - Needs Improvement';
    case 1: return '⭐ 1.0 - Poor';
    default: return '⭐⭐⭐⭐⭐ 5.0 - Exceptional';
  }
};

const scrollToReviewForm = () => {
  if (reviewFormRef.value) {
    reviewFormRef.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const nameInput = document.getElementById('rev-name');
    if (nameInput) {
      setTimeout(() => {
        nameInput.focus();
        nameInput.classList.add('input-highlight-pulse');
        setTimeout(() => nameInput.classList.remove('input-highlight-pulse'), 1500);
      }, 450);
    }
  }
};

const handleSubmitReview = async () => {
  const reviewObj = {
    id: 'rev-' + Date.now(),
    name: newReview.value.name.trim(),
    role: newReview.value.role.trim(),
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=60',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    rating: newReview.value.rating,
    category: newReview.value.category.replace(/^[^\w]+/, '').trim(),
    comment: newReview.value.comment.trim(),
    createdAt: new Date().toISOString()
  };

  reviewsList.value.unshift(reviewObj);
  emit('review-submitted', reviewObj);

  try {
    await saveReviewRecord(reviewObj);
  } catch (e) {}

  // Reset form
  newReview.value = {
    name: '',
    role: '',
    rating: 5,
    category: '💻 Labs & Workstations',
    comment: ''
  };

  // Scroll smoothly back to top so user sees their new review
  window.scrollTo({ top: 350, behavior: 'smooth' });
};

const onImgError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=60';
};
</script>

<style scoped>
.reviews-page-wrapper {
  position: relative;
}

.highlight-pulse-btn {
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.4);
  animation: pulseGlow 2.5s infinite;
}

@keyframes pulseGlow {
  0% { box-shadow: 0 0 0 rgba(249, 115, 22, 0.4); }
  50% { box-shadow: 0 0 25px rgba(249, 115, 22, 0.7); }
  100% { box-shadow: 0 0 0 rgba(249, 115, 22, 0.4); }
}

.rating-summary-card {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2.5rem;
  background: var(--bg-card-glass);
  border: 1px solid var(--border-cyber-glow);
  padding: 2.5rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  margin-bottom: 3rem;
  align-items: center;
}

@media (max-width: 768px) {
  .rating-summary-card {
    grid-template-columns: 1fr;
    gap: 1.75rem;
    padding: 1.75rem;
  }
}

.rating-score-column {
  text-align: center;
  border-right: 1px solid var(--border-cyber);
  padding-right: 2rem;
}

@media (max-width: 768px) {
  .rating-score-column {
    border-right: none;
    border-bottom: 1px solid var(--border-cyber);
    padding-right: 0;
    padding-bottom: 1.5rem;
  }
}

.big-rating-score {
  font-family: var(--font-heading);
  font-size: 4rem;
  font-weight: 900;
  line-height: 1;
}

.rating-count-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 600;
}

.reviews-filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.verified-badge-pill {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.35);
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
  white-space: nowrap;
}

/* ==========================================================================
   SUPER-HIGHLIGHTED REVIEW SECTION STYLES
   ========================================================================== */

.review-highlight-container {
  position: relative;
  max-width: 880px;
  margin: 5rem auto 1rem;
  z-index: 1;
}

.review-glow-backdrop {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 105%;
  height: 105%;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, rgba(250, 204, 21, 0.12) 45%, rgba(0, 0, 0, 0) 75%);
  filter: blur(50px);
  pointer-events: none;
  z-index: -1;
}

.review-highlight-card {
  background: var(--bg-card-glass);
  border: 2px solid var(--color-ai-gold);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-radius: var(--radius-xl);
  padding: 3rem 2.5rem;
  box-shadow: 0 25px 65px -15px rgba(0, 0, 0, 0.7), 0 0 35px rgba(249, 115, 22, 0.28);
  position: relative;
}

@media (max-width: 640px) {
  .review-highlight-card {
    padding: 2rem 1.25rem;
  }
}

.review-floating-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 1.2rem;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.25), rgba(250, 204, 21, 0.15));
  border: 1px solid var(--color-ai-gold);
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--color-ai-yellow);
  font-family: var(--font-mono);
  box-shadow: 0 0 15px rgba(249, 115, 22, 0.25);
}

body.light-theme .review-floating-pill {
  color: #0f172a !important;
  background: rgba(249, 115, 22, 0.18);
}

.review-card-head {
  text-align: center;
  margin-bottom: 2.25rem;
}

.review-highlight-title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 0.75rem;
}

.review-highlight-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.65;
  max-width: 700px;
  margin: 0 auto;
}

.rating-interactive-card {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid var(--border-cyber-glow);
  border-radius: var(--radius-lg);
  padding: 1.5rem 1.75rem;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.4);
}

body.light-theme .rating-interactive-card {
  background: rgba(249, 115, 22, 0.08);
}

.rating-picker-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0;
  font-family: var(--font-heading);
}

.rating-badge-feedback {
  font-size: 0.88rem;
  font-weight: 800;
  font-family: var(--font-mono);
}

.star-rating-selector-glow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.star-glow-btn {
  background: transparent;
  border: none;
  font-size: 2.75rem;
  color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.18s ease;
  padding: 0 0.15rem;
  line-height: 1;
}

body.light-theme .star-glow-btn {
  color: rgba(0, 0, 0, 0.18);
}

.star-glow-btn.active {
  color: #facc15;
  transform: scale(1.2);
  text-shadow: 0 0 20px rgba(250, 204, 21, 0.75);
}

.star-glow-btn:hover {
  transform: scale(1.35);
  color: #fde047;
}

.star-count-indicator {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--color-ai-yellow);
  font-family: var(--font-mono);
  margin-left: 0.5rem;
}

body.light-theme .star-count-indicator {
  color: #c2410c;
}

.category-chips-group-glow {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 0.4rem;
}

.cat-chip-glow-btn {
  background: var(--bg-card-glass);
  border: 1px solid var(--border-cyber);
  color: var(--text-muted);
  padding: 0.55rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
}

.cat-chip-glow-btn:hover {
  border-color: var(--color-ai-gold);
  color: var(--text-main);
  transform: translateY(-2px);
}

.cat-chip-glow-btn.active {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.35), rgba(250, 204, 21, 0.2));
  border-color: var(--color-ai-gold);
  color: #ffffff;
  font-weight: 800;
  box-shadow: 0 0 15px rgba(249, 115, 22, 0.3);
}

body.light-theme .cat-chip-glow-btn.active {
  color: #0f172a !important;
  background: rgba(249, 115, 22, 0.16);
}

.review-input-field {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.review-input-field:focus {
  border-color: var(--color-ai-gold) !important;
  box-shadow: 0 0 15px rgba(249, 115, 22, 0.35) !important;
}

.input-highlight-pulse {
  animation: inputGlow 1.2s ease-in-out infinite alternate;
}

@keyframes inputGlow {
  0% { box-shadow: 0 0 0 rgba(249, 115, 22, 0); }
  100% { box-shadow: 0 0 25px rgba(249, 115, 22, 0.8); }
}

.review-live-preview-box {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px dashed var(--color-ai-gold);
  border-radius: var(--radius-md);
}

body.light-theme .review-live-preview-box {
  background: rgba(249, 115, 22, 0.06);
}

.review-submit-mega-btn {
  width: 100%;
  justify-content: center;
  padding: 1.1rem 2rem;
  font-size: 1.15rem;
  font-weight: 800;
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.35);
  transition: var(--transition);
}

.review-submit-mega-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(249, 115, 22, 0.55);
}
</style>
