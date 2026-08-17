<template>
  <section class="container" style="padding: 4rem 1.5rem;">
    <div class="section-header">
      <span class="section-tag">{{ content.reviewsSection?.tagline }}</span>
      <h2 class="section-title">{{ content.reviewsSection?.titlePrefix }}<span class="text-gradient">{{ content.reviewsSection?.titleGradient }}</span></h2>
      <p class="section-subtitle">{{ content.reviewsSection?.description }}</p>
    </div>

    <!-- Rating Summary Card -->
    <div class="rating-summary-card">
      <div style="text-align: center;">
        <div class="big-rating-score">{{ content.reviewsSection?.overallScore }}</div>
        <div class="star-rating-display">{{ content.reviewsSection?.overallStars }}</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.4rem;">{{ content.reviewsSection?.totalCountLabel }}</div>
      </div>

      <div>
        <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">
          {{ content.reviewsSectionUI?.metricsHeading || 'Facility & Development Evaluation Metrics' }}
        </h4>
        
        <div class="metric-bar-wrapper" v-for="metric in content.reviewsSection?.facilityMetrics" :key="metric.name">
          <div class="metric-bar-header">
            <span>{{ metric.name }}</span>
            <span style="font-weight: 700; color: var(--color-ai-cyan); font-family: var(--font-mono);">{{ metric.score }} / 5.0</span>
          </div>
          <div class="metric-bar-track">
            <div class="metric-bar-fill" :style="{ width: (metric.score / 5 * 100) + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews Grid -->
    <div class="reviews-grid">
      <div class="review-card" v-for="review in reviewsList" :key="review.id">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <span class="star-rating-display">★★★★★</span>
          <span style="font-size: 0.75rem; color: var(--text-dim); font-family: var(--font-mono);">{{ review.date }}</span>
        </div>
        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.15rem; font-style: italic;">
          "{{ review.comment }}"
        </p>
        <div class="review-author">
          <img :src="review.avatar" :alt="review.name" class="review-avatar" @error="onImgError">
          <div>
            <div style="font-weight: 700; font-size: 0.9rem;">{{ review.name }}</div>
            <div style="font-size: 0.775rem; color: var(--color-ai-cyan); font-family: var(--font-mono);">{{ review.role }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Review Submission Form -->
    <div class="form-card" style="max-width: 750px; margin: 0 auto;">
      <h3 class="form-title">{{ content.reviewsSectionUI?.formTitle || 'Submit Your Review & Feedback' }}</h3>
      <p class="form-subtitle">{{ content.reviewsSectionUI?.formSubtitle || 'Help us improve institute infrastructure, labs, and ease of technical development.' }}</p>

      <form @submit.prevent="handleSubmitReview">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">{{ content.reviewsSectionUI?.fields?.nameLabel || 'Your Name' }} <span class="req">*</span></label>
            <input type="text" v-model="newReview.name" required class="form-control" :placeholder="content.reviewsSectionUI?.fields?.namePlaceholder || 'Full name'">
          </div>

          <div class="form-group">
            <label class="form-label">{{ content.reviewsSectionUI?.fields?.roleLabel || 'Course / Program Attended' }} <span class="req">*</span></label>
            <input type="text" v-model="newReview.role" required class="form-control" :placeholder="content.reviewsSectionUI?.fields?.rolePlaceholder || 'e.g. MERN Stack Intern / O Level Student'">
          </div>

          <div class="form-group">
            <label class="form-label">{{ content.reviewsSectionUI?.fields?.ratingLabel || 'Overall Rating' }} <span class="req">*</span></label>
            <select v-model.number="newReview.rating" class="form-control" required>
              <option 
                v-for="opt in (content.reviewsSectionUI?.ratingOptions || [{ value: 5, label: '⭐⭐⭐⭐⭐ 5 Stars (Excellent)' }])"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">{{ content.reviewsSectionUI?.fields?.categoryLabel || 'Evaluation Category' }}</label>
            <select v-model="newReview.category" class="form-control">
              <option 
                v-for="cat in (content.reviewsSectionUI?.categoryOptions || ['Labs & Workstations', 'Teaching & Mentorship', 'Placement & LOR', 'Course Curriculum'])"
                :key="cat"
                :value="cat"
              >
                {{ cat }}
              </option>
            </select>
          </div>

          <div class="form-group full-width">
            <label class="form-label">{{ content.reviewsSectionUI?.fields?.reviewLabel || 'Your Review' }} <span class="req">*</span></label>
            <textarea v-model="newReview.comment" rows="4" required class="form-control" :placeholder="content.reviewsSectionUI?.fields?.reviewPlaceholder || 'Share your experience regarding facility quality, faculty guidance, and ease of development...'"></textarea>
          </div>
        </div>

        <div style="margin-top: 1.25rem;">
          <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">
            <span>{{ content.reviewsSectionUI?.fields?.submitBtn || 'Post Review & Feedback ⭐' }}</span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['review-submitted']);

const reviewsList = ref([...(props.content.reviewsSection?.reviewsList || [])]);

const newReview = ref({
  name: '',
  role: '',
  rating: 5,
  category: 'Labs & Workstations',
  comment: ''
});

const handleSubmitReview = () => {
  const reviewObj = {
    id: 'rev-' + Date.now(),
    name: newReview.value.name,
    role: newReview.value.role,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=60',
    date: 'Just Now',
    rating: newReview.value.rating,
    category: newReview.value.category,
    comment: newReview.value.comment
  };

  reviewsList.value.unshift(reviewObj);
  emit('review-submitted', reviewObj);

  // Reset form
  newReview.value = {
    name: '',
    role: '',
    rating: 5,
    category: 'Labs & Workstations',
    comment: ''
  };
};

const onImgError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=60';
};
</script>
