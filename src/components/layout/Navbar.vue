<template>
  <header class="navbar-header" :class="{ scrolled: isScrolled }">
    <div class="container navbar-container">
      <!-- Brand Logo -->
      <div class="brand-logo" @click="$emit('set-tab', 'home')">
        <img :src="content.brand?.logoImage" :alt="(content.brand?.name || 'IT HUNT') + ' Logo'" class="brand-logo-img" @error="onImgError" loading="eager" fetchpriority="high">
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
        <button class="cta-btn-header" @click="$emit('open-nielit-modal')">
          <span>{{ content.navbar?.applyCtaText || 'Apply NIELIT Project' }}</span> {{ content.navbar?.applyCtaIcon || '✨' }}
        </button>

        <!-- Unified Single Login / Portal Button (Desktop) -->
        <button 
          v-if="isAdminLoggedIn"
          class="cta-btn-header nav-action-desktop" 
          style="background: linear-gradient(135deg, #10b981, #059669); border-color: #34d399; box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);"
          @click="$emit('set-tab', 'superadmin')"
          :title="'SuperAdmin Console Logged In'"
        >
          <span>⚡ SuperAdmin</span>
        </button>
        <button 
          v-else-if="studentUser"
          class="cta-btn-header nav-action-desktop" 
          style="background: linear-gradient(135deg, #f97316, #ea580c); border-color: #fb923c; box-shadow: 0 0 15px rgba(249, 115, 22, 0.4);"
          @click="$emit('set-tab', 'student-portal')"
          :title="'Student Dashboard (' + (studentUser.candidateName || 'Student') + ')'"
        >
          <span>🎓 Student Dashboard</span>
        </button>
        <button 
          v-else
          class="theme-toggle-btn nav-action-desktop" 
          style="width: auto; padding: 0.45rem 1.15rem; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 700; border-color: rgba(249, 115, 22, 0.4); color: var(--color-ai-yellow);"
          @click="$emit('set-tab', 'login')"
          title="Login to Student or Admin Portal"
        >
          <span>🔐 Login</span>
        </button>

        <!-- Mobile Drawer Toggle -->
        <button 
          class="mobile-toggle-btn" 
          @click="toggleMobileNav" 
          :aria-label="content.navbar?.toggleNavAria || 'Toggle Navigation'"
          :aria-expanded="isMobileNavOpen"
        >
          <span>{{ isMobileNavOpen ? '✕' : '☰' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile Backdrop Overlay — closes drawer on outside tap -->
    <div 
      class="mobile-nav-backdrop" 
      :class="{ open: isMobileNavOpen }" 
      @click="closeMobileNav"
      aria-hidden="true"
    ></div>

    <!-- Mobile Navigation Drawer -->
    <div class="mobile-nav-drawer" :class="{ open: isMobileNavOpen }">
      <button 
        v-for="item in content.navigation" 
        :key="'mob-' + item.id" 
        class="nav-item-btn" 
        :class="{ active: activeTab === item.id }" 
        @click="$emit('set-tab', item.id); closeMobileNav();"
      >
        {{ item.icon }} {{ item.label }}
      </button>

      <!-- Single Mobile Login / Dashboard Button -->
      <button 
        v-if="isAdminLoggedIn"
        class="nav-item-btn" 
        :class="{ active: activeTab === 'superadmin' }" 
        @click="$emit('set-tab', 'superadmin'); closeMobileNav();"
        style="color: #34d399; font-weight: 800;"
      >
        ⚡ SuperAdmin Dashboard
      </button>
      <button 
        v-else-if="studentUser"
        class="nav-item-btn" 
        :class="{ active: activeTab === 'student-portal' }" 
        @click="$emit('set-tab', 'student-portal'); closeMobileNav();"
        style="color: var(--color-ai-orange); font-weight: 800;"
      >
        🎓 Student Dashboard ({{ studentUser.candidateName || 'Student' }})
      </button>
      <button 
        v-else
        class="nav-item-btn" 
        :class="{ active: activeTab === 'login' }" 
        @click="$emit('set-tab', 'login'); closeMobileNav();"
        style="color: var(--color-ai-yellow); font-weight: 800;"
      >
        🔐 Login
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

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
  studentUser: {
    type: Object,
    default: null
  },
  isAdminLoggedIn: {
    type: Boolean,
    default: false
  }
});

defineEmits(['set-tab', 'toggle-theme', 'open-nielit-modal']);

const isMobileNavOpen = ref(false);
const isScrolled = ref(false);

const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value;
  document.body.style.overflow = isMobileNavOpen.value ? 'hidden' : '';
};

const closeMobileNav = () => {
  isMobileNavOpen.value = false;
  document.body.style.overflow = '';
};

const handleNavScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleNavScroll);
  document.body.style.overflow = '';
});

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="12" fill="%23f97316"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="900" fill="white">IT HUNT</text></svg>';
};
</script>
