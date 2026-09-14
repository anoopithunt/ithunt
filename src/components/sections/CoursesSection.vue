<template>
  <section class="container" style="padding: 4rem 1.5rem;">
    <div class="section-header">
      <span class="section-tag">{{ content.coursesSection?.tagline }}</span>
      <h2 class="section-title">{{ content.coursesSection?.titlePrefix }}<span class="text-gradient">{{ content.coursesSection?.titleGradient }}</span></h2>
      <p class="section-subtitle">{{ content.coursesSection?.description }}</p>
    </div>

    <div class="courses-grid">
      <div class="course-card" v-for="course in displayCourses" :key="course.id || course.code">
        <div class="course-img-wrapper">
          <img :src="course.image || 'img/code.jpg'" :alt="course.title || course.name" class="course-img" @error="onImgError">
          <span class="course-category-badge">{{ course.categoryName || course.category || 'Software Engineering' }}</span>
        </div>
        <div class="course-body">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            <h3 class="course-title" style="margin-bottom: 0;">{{ course.title || course.name }}</h3>
            <span v-if="course.badge" class="badge badge-warning" style="font-size: 0.7rem;">{{ course.badge }}</span>
          </div>
          <p class="course-desc">{{ course.description }}</p>
          <div class="course-meta" style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 1rem 0;">
            <div class="course-meta-item">⏱️ {{ course.duration }}</div>
            <div class="course-meta-item">📜 {{ course.certification || course.certificate || 'Govt. Recognized' }}</div>
            <div class="course-meta-item" v-if="course.fee" style="color: var(--color-ai-orange); font-weight: 700;">💰 {{ course.fee }}</div>
          </div>
          <button class="course-action-btn" @click="$emit('apply-course', course.title || course.name)">
            <span>{{ content.ui?.applyCourseBtnPrefix || 'Apply for' }} {{ course.code }}</span> →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  content: {
    type: Object,
    required: true
  },
  courses: {
    type: Array,
    default: () => []
  }
});

defineEmits(['apply-course']);

const displayCourses = computed(() => {
  if (props.courses && props.courses.length > 0) {
    return props.courses;
  }
  return props.content.coursesSection?.coursesList || [];
});

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%231e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8">Course Module</text></svg>';
};
</script>
