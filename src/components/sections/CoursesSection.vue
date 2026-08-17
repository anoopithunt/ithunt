<template>
  <section class="container" style="padding: 4rem 1.5rem;">
    <div class="section-header">
      <span class="section-tag">{{ content.coursesSection.tagline }}</span>
      <h2 class="section-title">{{ content.coursesSection.titlePrefix }}<span class="text-gradient">{{ content.coursesSection.titleGradient }}</span></h2>
      <p class="section-subtitle">{{ content.coursesSection.description }}</p>
    </div>

    <div class="courses-grid">
      <div class="course-card" v-for="course in content.coursesSection.coursesList" :key="course.id">
        <div class="course-img-wrapper">
          <img :src="course.image" :alt="course.title" class="course-img" @error="onImgError">
          <span class="course-category-badge">{{ course.categoryName }}</span>
        </div>
        <div class="course-body">
          <h3 class="course-title">{{ course.title }}</h3>
          <p class="course-desc">{{ course.description }}</p>
          <div class="course-meta">
            <div class="course-meta-item">⏱️ {{ course.duration }}</div>
            <div class="course-meta-item">📜 {{ course.certification }}</div>
          </div>
          <button class="course-action-btn" @click="$emit('apply-course', course.title)">
            <span>Apply for {{ course.code }}</span> →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  content: {
    type: Object,
    required: true
  }
});

defineEmits(['apply-course']);

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%231e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8">Course Module</text></svg>';
};
</script>
