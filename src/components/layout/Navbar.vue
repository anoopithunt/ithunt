<template>
  <header class="navbar-header">
    <div class="container navbar-container">
      <!-- Brand Logo -->
      <div class="brand-logo" @click="$emit('set-tab', 'home')">
        <img :src="content.brand.logoImage" :alt="content.brand.name + ' Logo'" class="brand-logo-img" @error="onImgError">
        <div>
          <div class="brand-title">IT <span class="text-gradient">{{ content.brand.nameHighlight }}</span></div>
          <div class="brand-tagline">{{ content.brand.tagline }}</div>
        </div>
      </div>

      <!-- Desktop Navigation -->
      <nav>
        <ul class="nav-links">
          <li v-for="item in content.navigation" :key="item.id">
            <button 
              class="nav-item-btn" 
              :class="{ active: activeTab === item.id }" 
              @click="$emit('set-tab', item.id)"
            >
              <span>{{ item.icon }}</span> {{ item.label }}
            </button>
          </li>
        </ul>
      </nav>

      <!-- Action Buttons -->
      <div class="nav-actions">
        <button 
          class="theme-toggle-btn" 
          @click="$emit('toggle-theme')" 
          :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <span>{{ isDarkMode ? '☀️' : '🌙' }}</span>
        </button>
        
        <button class="cta-btn-header" @click="$emit('set-tab', 'internships')">
          <span>Apply Internship</span> ✨
        </button>

        <button 
          class="mobile-toggle-btn" 
          @click="isMobileNavOpen = !isMobileNavOpen" 
          aria-label="Toggle Navigation"
        >
          <span>{{ isMobileNavOpen ? '✕' : '☰' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div class="mobile-nav-drawer" :class="{ open: isMobileNavOpen }">
      <button 
        v-for="item in content.navigation" 
        :key="'mob-' + item.id" 
        class="nav-item-btn" 
        :class="{ active: activeTab === item.id }" 
        @click="$emit('set-tab', item.id); isMobileNavOpen = false;"
      >
        {{ item.icon }} {{ item.label }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  content: {
    type: Object,
    required: true
  },
  activeTab: {
    type: String,
    required: true
  },
  isDarkMode: {
    type: Boolean,
    default: true
  }
});

defineEmits(['set-tab', 'toggle-theme']);

const isMobileNavOpen = ref(false);

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="12" fill="%23f97316"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="900" fill="white">IT HUNT</text></svg>';
};
</script>
