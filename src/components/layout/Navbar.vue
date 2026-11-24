<template>
  <header class="navbar-header" :class="{ scrolled: isScrolled }">
    <!-- Top Announcement Strip (Image 2) -->
    <div class="top-announcement-bar" v-if="!isScrolled">
      <div class="container top-announcement-container">
        <div class="top-announcement-left">
          <span class="announcement-pill">ADMISSION 2026</span>
          <span class="announcement-text">Admission Open for 2026 Batch at Prayagraj Campus</span>
        </div>
        <div class="top-announcement-right">
          <a href="tel:+919795771806" class="announcement-link" title="Call IT HUNT Admission Office">
            <span class="announcement-icon">📞</span>
            <span>Call: +91 9795771806</span>
          </a>
          <span class="announcement-sep">|</span>
          <button class="announcement-btn" type="button" @click="$emit('set-tab', 'admission')" title="Apply for 2026 Batches">
            <span>Apply Online ➜</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container navbar-container">
      <!-- Brand Logo -->
      <button class="brand-logo brand-logo-button" type="button" @click="$emit('set-tab', 'home')" aria-label="Go to IT HUNT home page">
        <img :src="content.brand?.logoImage" :alt="(content.brand?.name || 'IT HUNT') + ' Logo'" class="brand-logo-img" @error="onImgError" loading="eager" fetchpriority="high">
        <div>
          <div class="brand-title">IT <span class="text-gradient">{{ content.brand?.nameHighlight }}</span></div>
          <div class="brand-tagline">{{ content.brand?.tagline }}</div>
        </div>
      </button>

      <!-- Desktop Navigation -->
      <nav aria-label="Primary navigation">
        <ul class="nav-links">
          <li v-for="item in content.navigation" :key="item.id">
            <button 
              class="nav-item-btn" 
              :class="{ active: activeTab === item.id }" 
              @click="$emit('set-tab', item.id)"
            >
              <span class="nav-item-icon" aria-hidden="true">{{ item.icon }}</span><span>{{ item.label }}</span>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Action Buttons (ITHUNT Style: Clean, Modern & Responsive) -->
      <div class="nav-actions">
        <!-- Unified Single Login / Portal Button (Desktop) -->
        <button 
          v-if="isAdminLoggedIn"
          class="cta-btn-header nav-action-desktop" 
          :style="staffConsoleMeta.style"
          @click="$emit('set-tab', 'superadmin')"
          :title="staffConsoleMeta.tooltip"
        >
          <span>{{ staffConsoleMeta.title }}</span>
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
          class="nav-outline-btn nav-action-desktop" 
          @click="$emit('set-tab', 'login')"
          title="Sign in to your account"
        >
          <span>🔐 Login</span>
        </button>

        <button 
          class="cta-btn-header nav-action-desktop nav-btn-admission" 
          @click="$emit('set-tab', 'admission')"
          title="Apply for Admission 2026"
        >
          <span>Admission Open ➜</span>
        </button>

        <!-- Mobile Drawer Toggle -->
        <button 
          class="mobile-toggle-btn" 
          @click="toggleMobileNav" 
          :aria-label="isMobileNavOpen ? 'Close navigation' : (content.navbar?.toggleNavAria || 'Open navigation')"
          :aria-expanded="isMobileNavOpen"
          aria-controls="mobile-navigation-sidebar"
          ref="mobileToggleButton"
        >
          <span>{{ isMobileNavOpen ? '✕' : '☰' }}</span>
        </button>
      </div>
    </div>

    <!-- Teleport Mobile Drawer & Backdrop directly to body for true viewport stacking and full-screen outside click detection -->
    <Teleport to="body">
      <!-- Mobile Backdrop Overlay — closes sidebar on outside tap -->
      <div 
        class="mobile-nav-backdrop" 
        :class="{ open: isMobileNavOpen }" 
        @click="closeMobileNav"
        @touchstart.passive="closeMobileNav"
        @touchmove.prevent
        aria-hidden="true"
      ></div>

    <!-- Mobile Off-Canvas Navigation Sidebar (Side Menu) -->
    <aside 
      id="mobile-navigation-sidebar"
      ref="mobileNavSidebar"
      class="mobile-nav-sidebar" 
      :class="{ open: isMobileNavOpen }"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Sidebar"
      :aria-hidden="!isMobileNavOpen"
      :inert="!isMobileNavOpen"
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
          </div>
        </div>

        <button 
          class="sidebar-close-btn" 
          @click="closeMobileNav(true)"
          aria-label="Close Navigation Sidebar"
          title="Close Sidebar Menu"
        >
          <span>✕</span>
        </button>
      </div>

      <!-- Compact navigation links -->
      <div class="sidebar-nav-body">
        <ul class="sidebar-nav-list">
          <li>
            <button class="sidebar-nav-item admission-mobile-highlight" :class="{ active: activeTab === 'admission' }" @click="$emit('set-tab', 'admission'); closeMobileNav();">
              <span class="sidebar-item-icon">📝</span><span class="sidebar-item-label">Admission 2026 (Open)</span>
            </button>
          </li>
          <li>
            <button class="sidebar-nav-item" :class="{ active: activeTab === 'courses' }" @click="$emit('set-tab', 'courses'); closeMobileNav();">
              <span class="sidebar-item-icon">📚</span><span class="sidebar-item-label">Courses & NIELIT</span>
            </button>
          </li>
          <li>
            <button class="sidebar-nav-item" :class="{ active: activeTab === 'internships' }" @click="$emit('set-tab', 'internships'); closeMobileNav();">
              <span class="sidebar-item-icon">🚀</span><span class="sidebar-item-label">Development Tracks</span>
            </button>
          </li>
          <li>
            <button class="sidebar-nav-item" :class="{ active: activeTab === 'events' }" @click="$emit('set-tab', 'events'); closeMobileNav();">
              <span class="sidebar-item-icon">🎪</span><span class="sidebar-item-label">Events</span>
            </button>
          </li>
          <li>
            <button class="sidebar-nav-item" :class="{ active: activeTab === 'admission' }" @click="$emit('set-tab', 'admission'); closeMobileNav();">
              <span class="sidebar-item-icon">📝</span><span class="sidebar-item-label">Admission</span>
            </button>
          </li>
          <li>
            <button class="sidebar-nav-item" @click="$emit('open-cv-modal'); closeMobileNav();">
              <span class="sidebar-item-icon">📄</span><span class="sidebar-item-label">Create a CV</span>
            </button>
          </li>
          <li>
            <button class="sidebar-nav-item" :class="{ active: activeTab === 'testimonials' }" @click="$emit('set-tab', 'testimonials'); closeMobileNav();">
              <span class="sidebar-item-icon">⭐</span><span class="sidebar-item-label">Success stories</span>
            </button>
          </li>
          <li>
            <button class="sidebar-nav-item" :class="{ active: activeTab === 'reviews' }" @click="$emit('set-tab', 'reviews'); closeMobileNav();">
              <span class="sidebar-item-icon">🌟</span><span class="sidebar-item-label">Reviews</span>
            </button>
          </li>
          <li>
            <button class="sidebar-nav-item" :class="{ active: activeTab === 'careers' }" @click="$emit('set-tab', 'careers'); closeMobileNav();">
              <span class="sidebar-item-icon">💼</span><span class="sidebar-item-label">Careers</span>
            </button>
          </li>
          <li v-if="isAdminLoggedIn">
            <button class="sidebar-nav-item" :class="{ active: activeTab === 'superadmin' }" @click="$emit('set-tab', 'superadmin'); closeMobileNav();">
              <span class="sidebar-item-icon">{{ isTeacher ? '👨‍🏫' : '⚡' }}</span>
              <span class="sidebar-item-label">{{ isTeacher ? 'Teacher console' : 'Admin dashboard' }}</span>
            </button>
          </li>
          <li v-if="studentUser">
            <button class="sidebar-nav-item" :class="{ active: activeTab === 'student-portal' }" @click="$emit('set-tab', 'student-portal'); closeMobileNav();">
              <span class="sidebar-item-icon">🎓</span><span class="sidebar-item-label">Student portal</span>
            </button>
          </li>
          <li v-if="!isAdminLoggedIn && !studentUser">
            <button class="sidebar-nav-item" :class="{ active: activeTab === 'login' }" @click="$emit('set-tab', 'login'); closeMobileNav();">
              <span class="sidebar-item-icon">🔐</span><span class="sidebar-item-label">Sign in</span>
            </button>
          </li>
        </ul>

        <button class="sidebar-cta-btn" @click="$emit('open-nielit-modal'); closeMobileNav();">
          Apply for NIELIT project
        </button>
      </div>

      <!-- Sidebar Footer with Contact -->
      <div class="sidebar-footer">
        <div class="sidebar-contact-grid">
          <a href="tel:+919795771806" class="sidebar-contact-btn">
            <span>📞 Call Us</span>
          </a>
          <a 
            href="https://wa.me/919795771806?text=Hello%20IT%20HUNT,%20I%20am%20interested%20in%20Software%20Training%20and%20Internships" 
            target="_blank" 
            rel="noopener noreferrer"
            class="sidebar-contact-btn whatsapp"
          >
            <span>💬 WhatsApp</span>
          </a>
        </div>

      </div>
    </aside>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
  content: {
    type: Object,
    required: true
  },
  activeTab: {
    type: String,
    required: true
  },
  studentUser: {
    type: Object,
    default: null
  },
  isAdminLoggedIn: {
    type: Boolean,
    default: false
  },
  adminUser: {
    type: Object,
    default: () => ({})
  }
});

const staffConsoleMeta = computed(() => {
  const roleType = (props.adminUser?.roleType || props.adminUser?.role || '').toLowerCase();
  if (roleType.includes('teacher') || roleType.includes('faculty')) {
    return {
      title: '👨‍🏫 Teacher Console',
      tooltip: 'Teacher & Faculty Console Logged In',
      style: 'background: linear-gradient(135deg, #0284c7, #0369a1); border-color: #38bdf8; box-shadow: 0 0 15px rgba(2, 132, 199, 0.4);'
    };
  }
  if (roleType.includes('tech-lead') || roleType.includes('lead')) {
    return {
      title: '💻 Tech Lead Console',
      tooltip: 'Tech Lead & Software Architect Console Logged In',
      style: 'background: linear-gradient(135deg, #7c3aed, #6d28d9); border-color: #a855f7; box-shadow: 0 0 15px rgba(124, 58, 237, 0.4);'
    };
  }
  if (roleType.includes('developer') || roleType.includes('dev')) {
    return {
      title: '⚡ Developer Console',
      tooltip: 'Software Developer Console Logged In',
      style: 'background: linear-gradient(135deg, #0891b2, #0e7490); border-color: #06b6d4; box-shadow: 0 0 15px rgba(8, 145, 178, 0.4);'
    };
  }
  if (roleType.includes('staff')) {
    return {
      title: '👤 Staff Console',
      tooltip: 'Staff Console Logged In',
      style: 'background: linear-gradient(135deg, #ca8a04, #a16207); border-color: #eab308; box-shadow: 0 0 15px rgba(202, 138, 4, 0.4);'
    };
  }
  return {
    title: '⚡ SuperAdmin',
    tooltip: 'SuperAdmin Console Logged In',
    style: 'background: linear-gradient(135deg, #10b981, #059669); border-color: #34d399; box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);'
  };
});

const isTeacher = computed(() => {
  const roleType = props.adminUser?.roleType || '';
  const role = props.adminUser?.role || '';
  return roleType === 'teacher' || roleType === 'faculty' || 
         role.toLowerCase().includes('teacher') || role.toLowerCase().includes('faculty');
});

defineEmits(['set-tab', 'open-nielit-modal', 'open-cv-modal']);

const isMobileNavOpen = ref(false);
const isScrolled = ref(false);
const mobileToggleButton = ref(null);
const mobileNavSidebar = ref(null);

const toggleMobileNav = () => {
  if (isMobileNavOpen.value) {
    closeMobileNav(true);
    return;
  }

  isMobileNavOpen.value = true;
  nextTick(() => mobileNavSidebar.value?.querySelector('.sidebar-close-btn')?.focus());
};

const closeMobileNav = (restoreFocus = true) => {
  isMobileNavOpen.value = false;
  if (restoreFocus) nextTick(() => mobileToggleButton.value?.focus());
};

let savedScrollY = 0;
let isScrollLocked = false;
let touchStartY = 0;

const handleTouchStart = (e) => {
  if (e.touches && e.touches.length > 0) {
    touchStartY = e.touches[0].clientY;
  }
};

const handleTouchMove = (e) => {
  if (!isMobileNavOpen.value) return;

  const scrollable = e.target && e.target.closest ? e.target.closest('.sidebar-nav-body') : null;
  if (!scrollable) {
    if (e.cancelable) e.preventDefault();
    return;
  }

  const touchY = e.touches && e.touches[0] ? e.touches[0].clientY : 0;
  const isDraggingDown = touchY > touchStartY;
  const isDraggingUp = touchY < touchStartY;

  const atTop = scrollable.scrollTop <= 0;
  const atBottom = Math.ceil(scrollable.scrollTop + scrollable.clientHeight) >= scrollable.scrollHeight;

  if ((atTop && isDraggingDown) || (atBottom && isDraggingUp)) {
    if (e.cancelable) e.preventDefault();
  }
};

const handleWheel = (e) => {
  if (!isMobileNavOpen.value) return;

  const scrollable = e.target && e.target.closest ? e.target.closest('.sidebar-nav-body') : null;
  if (!scrollable) {
    if (e.cancelable) e.preventDefault();
    return;
  }

  const isScrollingUp = e.deltaY < 0;
  const isScrollingDown = e.deltaY > 0;

  const atTop = scrollable.scrollTop <= 0;
  const atBottom = Math.ceil(scrollable.scrollTop + scrollable.clientHeight) >= scrollable.scrollHeight;

  if ((atTop && isScrollingUp) || (atBottom && isScrollingDown)) {
    if (e.cancelable) e.preventDefault();
  }
};

const lockBodyScroll = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined' || isScrollLocked) return;
  
  savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  isScrollLocked = true;

  document.documentElement.classList.add('mobile-nav-locked');
  document.body.classList.add('mobile-nav-locked');

  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.overscrollBehavior = 'none';

  document.body.style.position = 'fixed';
  document.body.style.top = `-${savedScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
  document.body.style.overscrollBehavior = 'none';

  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: false });
  window.addEventListener('wheel', handleWheel, { passive: false });
};

const unlockBodyScroll = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !isScrollLocked) return;
  
  const scrollYToRestore = savedScrollY;
  isScrollLocked = false;

  document.documentElement.classList.remove('mobile-nav-locked');
  document.body.classList.remove('mobile-nav-locked');

  document.documentElement.style.overflow = '';
  document.documentElement.style.overscrollBehavior = '';

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  document.body.style.overscrollBehavior = '';

  document.removeEventListener('click', handleOutsideClick, true);
  document.removeEventListener('touchstart', handleOutsideClick, { capture: true });
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('wheel', handleWheel);

  window.scrollTo(0, scrollYToRestore);
};

const handleOutsideClick = (e) => {
  if (!isMobileNavOpen.value) return;
  // If clicked inside the mobile sidebar drawer, do not close
  if (e.target && e.target.closest && e.target.closest('.mobile-nav-sidebar')) {
    return;
  }
  // If clicked the mobile toggle button, toggle button has its own handler
  if (e.target && e.target.closest && e.target.closest('.mobile-toggle-btn')) {
    return;
  }
  // Outside click detected -> close the side menu
  closeMobileNav(false);
};

watch(isMobileNavOpen, (isOpen) => {
  if (isOpen) {
    lockBodyScroll();
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick, true);
      document.addEventListener('touchstart', handleOutsideClick, { passive: true, capture: true });
    }, 50);
  } else {
    unlockBodyScroll();
    document.removeEventListener('click', handleOutsideClick, true);
    document.removeEventListener('touchstart', handleOutsideClick, { capture: true });
  }
});

const handleNavScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && isMobileNavOpen.value) {
    closeMobileNav(true);
    return;
  }
  if (!isMobileNavOpen.value) return;
  if (e.key === 'Tab') {
    const focusable = mobileNavSidebar.value?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusable?.length) {
      e.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && (document.activeElement === first || !mobileNavSidebar.value.contains(document.activeElement))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (document.activeElement === last || !mobileNavSidebar.value.contains(document.activeElement))) {
      e.preventDefault();
      first.focus();
    }
    return;
  }
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
    const scrollable = e.target && e.target.closest ? e.target.closest('.sidebar-nav-body') : null;
    if (!scrollable) {
      e.preventDefault();
    }
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
  document.removeEventListener('click', handleOutsideClick, true);
  document.removeEventListener('touchstart', handleOutsideClick, { capture: true });
  unlockBodyScroll();
});

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="12" fill="%23f97316"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="900" fill="white">IT HUNT</text></svg>';
};
</script>

<style scoped>
.insights-nav-link,
.insights-mobile-nav-link {
  text-decoration: none;
}

/* Top Announcement Strip (Image 2) */
.top-announcement-bar {
  background: linear-gradient(90deg, #0f766e 0%, #0369a1 50%, #0f766e 100%);
  color: #ffffff;
  font-size: 0.82rem;
  padding: 0.45rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  position: relative;
  z-index: 1001;
}

.top-announcement-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.top-announcement-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.announcement-pill {
  background: #f97316;
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 6px rgba(249, 115, 22, 0.35);
}

.announcement-text {
  color: #f0fdfa;
}

.top-announcement-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
}

.announcement-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: opacity 0.2s ease;
}

.announcement-link:hover {
  opacity: 0.85;
}

.announcement-sep {
  opacity: 0.4;
}

.announcement-btn {
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #ffffff;
  padding: 0.22rem 0.65rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.announcement-btn:hover {
  background: #ffffff;
  color: #0f766e;
}

/* Admission Button in Navbar (Image 2) */
.nav-btn-admission {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
  color: #ffffff !important;
  border: 1px solid #fb923c !important;
  border-radius: 999px !important;
  padding: 0.55rem 1.25rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.02em !important;
  box-shadow: 0 4px 14px rgba(249, 115, 22, 0.38) !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.nav-btn-admission:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.55) !important;
}

.admission-mobile-highlight {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.18), rgba(234, 88, 12, 0.12)) !important;
  border: 1px solid rgba(249, 115, 22, 0.35) !important;
  color: #f97316 !important;
  font-weight: 700 !important;
}

@media (max-width: 768px) {
  .top-announcement-bar {
    display: none;
  }
}
</style>
