<template>
  <div class="fullscreen-lightbox-overlay" v-if="isOpen" @click.self="$emit('close')">
    <div class="lightbox-header">
      <div class="lightbox-counter">
        {{ content?.modalTexts?.lightbox?.counterPrefix || '📸 Photo' }} {{ currentIndex + 1 }} {{ content?.modalTexts?.lightbox?.counterOf || 'of' }} {{ images.length }}
      </div>
      <button class="lightbox-close-btn" @click="$emit('close')" :title="content?.modalTexts?.lightbox?.closeTooltip || 'Close Lightbox (Esc)'">✕</button>
    </div>

    <div class="lightbox-main-stage">
      <button 
        class="lightbox-arrow prev" 
        @click="prevImage" 
        :title="content?.modalTexts?.lightbox?.prevTooltip || 'Previous Image (Left Arrow)'" 
        v-if="images.length > 1"
      >‹</button>
      <div class="lightbox-img-wrapper protected-img-wrapper">
        <div class="protected-img-overlay" @contextmenu.prevent></div>
        <img 
          :src="images[currentIndex]?.src" 
          :alt="images[currentIndex]?.title" 
          class="lightbox-img protected-img" 
          draggable="false"
          @contextmenu.prevent
          @dragstart.prevent
          @error="onImgError"
        >
      </div>
      <button 
        class="lightbox-arrow next" 
        @click="nextImage" 
        :title="content?.modalTexts?.lightbox?.nextTooltip || 'Next Image (Right Arrow)'" 
        v-if="images.length > 1"
      >›</button>
    </div>

    <div class="lightbox-footer-caption" v-if="images[currentIndex]">
      <div class="lightbox-caption-title">{{ images[currentIndex]?.title }}</div>
      <div class="lightbox-caption-text">{{ images[currentIndex]?.caption || images[currentIndex]?.desc }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  images: {
    type: Array,
    default: () => []
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  content: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close', 'update:currentIndex']);

const prevImage = () => {
  if (props.images.length <= 1) return;
  const newIdx = (props.currentIndex - 1 + props.images.length) % props.images.length;
  emit('update:currentIndex', newIdx);
};

const nextImage = () => {
  if (props.images.length <= 1) return;
  const newIdx = (props.currentIndex + 1) % props.images.length;
  emit('update:currentIndex', newIdx);
};

const handleKeyDown = (e) => {
  if (!props.isOpen) return;
  if (e.key === 'Escape') emit('close');
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%231e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%2394a3b8">Photo View</text></svg>';
};
</script>
