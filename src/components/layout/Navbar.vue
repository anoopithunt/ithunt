<template>
  <header class="navbar-header">
    <div class="container navbar-container">
      <!-- Brand Logo -->
      <div class="brand-logo" @click="$emit('set-tab', 'home')">
        <img :src="content.brand?.logoImage" :alt="(content.brand?.name || 'IT HUNT') + ' Logo'" class="brand-logo-img" @error="onImgError">
        <div>
          <div class="brand-title">IT <span class="text-gradient">{{ content.brand?.nameHighlight }}</span></div>
          <div class="brand-tagline">{{ content.brand?.tagline }}</div>
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
        <!-- Theme Toggle -->
        <button 
          class="theme-toggle-btn" 
          @click="$emit('toggle-theme')" 
          :title="isDarkMode ? (content.navbar?.lightModeTitle || 'Switch to Light Mode') : (content.navbar?.darkModeTitle || 'Switch to Dark Mode')"
        >
          <span>{{ isDarkMode ? '☀️' : '🌙' }}</span>
        </button>
        
        <!-- Quick Apply CTA -->
        <button class="cta-btn-header" @click="$emit('set-tab', 'internships')">
          <span>{{ content.navbar?.applyCtaText || 'Apply Internship' }}</span> {{ content.navbar?.applyCtaIcon || '✨' }}
        </button>

        <!-- SuperAdmin / Login Portal Button -->
        <button 
          v-if="isAdminLoggedIn"
          class="cta-btn-header" 
          style="background: linear-gradient(135deg, #10b981, #059669); border-color: #34d399; box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);"
          @click="$emit('set-tab', 'superadmin')"
          :title="'SuperAdmin Console Logged In'"
        >
          <span>⚡ SuperAdmin</span>
        </button>
        <button 
          v-else
          class="theme-toggle-btn" 
          style="width: auto; padding: 0.45rem 0.85rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700;"
          @click="$emit('set-tab', 'login')"
          :title="'SuperAdmin / Staff Login'"
        >
          <span>🔐 Login</span>
        </button>

        <!-- Mobile Drawer Toggle -->
        <button 
          class="mobile-toggle-btn" 
          @click="isMobileNavOpen = !isMobileNavOpen" 
          :aria-label="content.navbar?.toggleNavAria || 'Toggle Navigation'"
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

      <button 
        v-if="isAdminLoggedIn"
        class="nav-item-btn" 
        :class="{ active: activeTab === 'superadmin' }" 
        @click="$emit('set-tab', 'superadmin'); isMobileNavOpen = false;"
        style="color: #34d399; font-weight: 800;"
      >
        ⚡ SuperAdmin Dashboard
      </button>
      <button 
        v-else
        class="nav-item-btn" 
        :class="{ active: activeTab === 'login' }" 
        @click="$emit('set-tab', 'login'); isMobileNavOpen = false;"
        style="color: var(--color-ai-yellow); font-weight: 800;"
      >
        🔐 Admin / Staff Login
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
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
  },
  isAdminLoggedIn: {
    type: Boolean,
    default: false
  }
});

defineEmits(['set-tab', 'toggle-theme']);

const isMobileNavOpen = ref(false);

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="12" fill="%23f97316"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="900" fill="white">IT HUNT</text></svg>';
};
</script>
