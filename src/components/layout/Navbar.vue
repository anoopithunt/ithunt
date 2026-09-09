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

    <!-- Mobile Backdrop Overlay — closes sidebar on outside tap -->
    <div 
      class="mobile-nav-backdrop" 
      :class="{ open: isMobileNavOpen }" 
      @click="closeMobileNav"
      aria-hidden="true"
    ></div>

    <!-- Mobile Off-Canvas Navigation Sidebar (Side Menu) -->
    <aside 
      class="mobile-nav-sidebar" 
      :class="{ open: isMobileNavOpen }"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Sidebar"
    >
      <!-- Sidebar Header with Brand & Close Button -->
      <div class="sidebar-header">
        <div class="sidebar-brand" @click="$emit('set-tab', 'home'); closeMobileNav();">
          <img 
            :src="content.brand?.logoImage" 
            :alt="(content.brand?.name || 'IT HUNT') + ' Logo'" 
            class="sidebar-brand-logo" 
            @error="onImgError" 
            loading="lazy"
          >
          <div>
            <div class="sidebar-brand-title">IT <span class="text-gradient">{{ content.brand?.nameHighlight }}</span></div>
            <div class="sidebar-brand-sub">{{ content.brand?.tagline || 'Software Solutions & Tech Academy' }}</div>
          </div>
        </div>

        <button 
          class="sidebar-close-btn" 
          @click="closeMobileNav" 
          aria-label="Close Navigation Sidebar"
          title="Close Sidebar Menu"
        >
          <span>✕</span>
        </button>
      </div>

      <!-- User / Portal Status Banner -->
      <div class="sidebar-user-card" v-if="isAdminLoggedIn">
        <div class="sidebar-user-avatar admin">⚡</div>
        <div class="sidebar-user-details">
          <div class="sidebar-user-badge admin">🛡️ SuperAdmin Active</div>
          <div class="sidebar-user-name">{{ content.adminAuth?.superAdminName || 'Administrator' }}</div>
          <div class="sidebar-user-sub">Directorate Console</div>
        </div>
        <button 
          class="sidebar-user-btn" 
          @click="$emit('set-tab', 'superadmin'); closeMobileNav();"
        >
          Open Console →
        </button>
      </div>

      <div class="sidebar-user-card" v-else-if="studentUser">
        <div class="sidebar-user-avatar student">🎓</div>
        <div class="sidebar-user-details">
          <div class="sidebar-user-badge student">● Active Student</div>
          <div class="sidebar-user-name">{{ studentUser.candidateName || 'Enrolled Student' }}</div>
          <div class="sidebar-user-sub">ID: {{ studentUser.registrationNo || 'ITH-STUDENT' }}</div>
        </div>
        <button 
          class="sidebar-user-btn" 
          @click="$emit('set-tab', 'student-portal'); closeMobileNav();"
        >
          My Dashboard →
        </button>
      </div>

      <div class="sidebar-user-card guest" v-else>
        <div class="sidebar-user-avatar guest">👤</div>
        <div class="sidebar-user-details">
          <div class="sidebar-user-badge guest">Guest Visitor</div>
          <div class="sidebar-user-name">Welcome to IT HUNT</div>
          <div class="sidebar-user-sub">Software Studio & Academy</div>
        </div>
        <div class="sidebar-guest-actions">
          <button 
            class="sidebar-guest-btn primary"
            @click="$emit('set-tab', 'login'); closeMobileNav();"
          >
            🔐 Sign In
          </button>
          <button 
            class="sidebar-guest-btn secondary"
            @click="$emit('set-tab', 'admission'); closeMobileNav();"
          >
            📝 Apply
          </button>
        </div>
      </div>

      <!-- Scrollable Sidebar Navigation Links -->
      <div class="sidebar-nav-body">
        <!-- Section: Core Academic Programs -->
        <div class="sidebar-nav-section">
          <div class="sidebar-nav-heading">Academic & Training Programs</div>
          <ul class="sidebar-nav-list">
            <li>
              <button 
                class="sidebar-nav-item" 
                :class="{ active: activeTab === 'home' }"
                @click="$emit('set-tab', 'home'); closeMobileNav();"
              >
                <span class="sidebar-item-icon">🏠</span>
                <span class="sidebar-item-label">Home</span>
              </button>
            </li>
            <li>
              <button 
                class="sidebar-nav-item" 
                :class="{ active: activeTab === 'courses' }"
                @click="$emit('set-tab', 'courses'); closeMobileNav();"
              >
                <span class="sidebar-item-icon">📚</span>
                <span class="sidebar-item-label">Courses & Curriculum</span>
              </button>
            </li>
            <li>
              <button 
                class="sidebar-nav-item" 
                :class="{ active: activeTab === 'internships' }"
                @click="$emit('set-tab', 'internships'); closeMobileNav();"
              >
                <span class="sidebar-item-icon">🚀</span>
                <span class="sidebar-item-label">Production Internships</span>
                <span class="sidebar-item-pill">Incubator</span>
              </button>
            </li>
            <li>
              <button 
                class="sidebar-nav-item" 
                :class="{ active: activeTab === 'events' }"
                @click="$emit('set-tab', 'events'); closeMobileNav();"
              >
                <span class="sidebar-item-icon">🎪</span>
                <span class="sidebar-item-label">Campus Events & Gallery</span>
                <span class="sidebar-item-pill gold">2026</span>
              </button>
            </li>
            <li>
              <button 
                class="sidebar-nav-item" 
                :class="{ active: activeTab === 'admission' }"
                @click="$emit('set-tab', 'admission'); closeMobileNav();"
              >
                <span class="sidebar-item-icon">📝</span>
                <span class="sidebar-item-label">Direct Admission 2026</span>
                <span class="sidebar-item-pill pulse">Open</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- Section: Institute & Community -->
        <div class="sidebar-nav-section">
          <div class="sidebar-nav-heading">Institute & Placements</div>
          <ul class="sidebar-nav-list">
            <li>
              <button 
                class="sidebar-nav-item" 
                :class="{ active: activeTab === 'testimonials' }"
                @click="$emit('set-tab', 'testimonials'); closeMobileNav();"
              >
                <span class="sidebar-item-icon">⭐</span>
                <span class="sidebar-item-label">Placement Stories</span>
              </button>
            </li>
            <li>
              <button 
                class="sidebar-nav-item" 
                :class="{ active: activeTab === 'reviews' }"
                @click="$emit('set-tab', 'reviews'); closeMobileNav();"
              >
                <span class="sidebar-item-icon">🌟</span>
                <span class="sidebar-item-label">Student Reviews & Ratings</span>
              </button>
            </li>
            <li>
              <button 
                class="sidebar-nav-item" 
                :class="{ active: activeTab === 'careers' }"
                @click="$emit('set-tab', 'careers'); closeMobileNav();"
              >
                <span class="sidebar-item-icon">💼</span>
                <span class="sidebar-item-label">Careers & Faculty Hiring</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- Section: Portals & Gateways -->
        <div class="sidebar-nav-section">
          <div class="sidebar-nav-heading">Portals & Login</div>
          <ul class="sidebar-nav-list">
            <li v-if="isAdminLoggedIn">
              <button 
                class="sidebar-nav-item highlight-admin" 
                :class="{ active: activeTab === 'superadmin' }"
                @click="$emit('set-tab', 'superadmin'); closeMobileNav();"
              >
                <span class="sidebar-item-icon">⚡</span>
                <span class="sidebar-item-label">SuperAdmin Dashboard</span>
              </button>
            </li>
            <li v-if="studentUser">
              <button 
                class="sidebar-nav-item highlight-student" 
                :class="{ active: activeTab === 'student-portal' }"
                @click="$emit('set-tab', 'student-portal'); closeMobileNav();"
              >
                <span class="sidebar-item-icon">🎓</span>
                <span class="sidebar-item-label">Student Portal Dashboard</span>
              </button>
            </li>
            <li v-if="!isAdminLoggedIn && !studentUser">
              <button 
                class="sidebar-nav-item" 
                :class="{ active: activeTab === 'login' }"
                @click="$emit('set-tab', 'login'); closeMobileNav();"
              >
                <span class="sidebar-item-icon">🔐</span>
                <span class="sidebar-item-label">Portal Sign In</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- NIELIT Apply CTA Button -->
        <div class="sidebar-cta-wrap">
          <button 
            class="sidebar-cta-btn" 
            @click="$emit('open-nielit-modal'); closeMobileNav();"
          >
            <span>✨ Apply NIELIT Project 🚀</span>
          </button>
        </div>
      </div>

      <!-- Sidebar Footer with Theme Toggle & Contact -->
      <div class="sidebar-footer">
        <div class="sidebar-theme-row">
          <span class="sidebar-theme-label">
            {{ isDarkMode ? '🌙 Dark Mode Active' : '☀️ Light Mode Active' }}
          </span>
          <button 
            class="sidebar-theme-btn" 
            @click="$emit('toggle-theme')" 
            :title="isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'"
          >
            <span>{{ isDarkMode ? '☀️ Switch to Light' : '🌙 Switch to Dark' }}</span>
          </button>
        </div>

        <div class="sidebar-contact-grid">
          <a href="tel:+919140412215" class="sidebar-contact-btn">
            <span>📞 Call Us</span>
          </a>
          <a 
            href="https://wa.me/919838112215?text=Hello%20IT%20HUNT,%20I%20am%20interested%20in%20Software%20Training%20and%20Internships" 
            target="_blank" 
            rel="noopener noreferrer"
            class="sidebar-contact-btn whatsapp"
          >
            <span>💬 WhatsApp</span>
          </a>
        </div>

        <div class="sidebar-location-tag">
          📍 Holagarh, Prayagraj, UP • ISO 9001:2015
        </div>
      </div>
    </aside>
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
    default: false
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
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isMobileNavOpen.value ? 'hidden' : '';
  }
};

const closeMobileNav = () => {
  isMobileNavOpen.value = false;
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
};

const handleNavScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && isMobileNavOpen.value) {
    closeMobileNav();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  window.addEventListener('keydown', handleKeyDown);
  handleNavScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleNavScroll);
  window.removeEventListener('keydown', handleKeyDown);
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="12" fill="%23f97316"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="900" fill="white">IT HUNT</text></svg>';
};
</script>
