<template>
  <div 
    class="admin-shell" 
    :class="{ 
      'sidebar-collapsed': isSidebarCollapsed, 
      'light-theme': !isDarkMode, 
      'dark-theme': isDarkMode 
    }"
    :style="{ '--admin-header-height': adminHeaderHeight + 'px' }"
  >
    <!-- 1. LEFT ENTERPRISE SIDEBAR NAVIGATION -->
    <aside class="admin-sidebar" :class="{ 'mobile-open': isMobileSidebarOpen }">
      <!-- Sidebar Brand / Console Header -->
      <div class="sidebar-brand">
        <div class="brand-badge-row">
          <img :src="content.brand?.logoImage" :alt="(content.brand?.name || 'IT HUNT') + ' Logo'" class="brand-logo-img" @error="onImgError">
          <div class="brand-titles" v-if="!isSidebarCollapsed">
            <div class="brand-main-title">IT HUNT</div>
            <div class="brand-sub-badge">DIRECTORATE CONSOLE</div>
          </div>
        </div>
        <button 
          class="sidebar-collapse-btn" 
          @click="isSidebarCollapsed = !isSidebarCollapsed" 
          :title="isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'"
        >
          <span>{{ isSidebarCollapsed ? '▶' : '◀' }}</span>
        </button>
        <button 
          class="sidebar-mobile-close-btn" 
          @click="isMobileSidebarOpen = false" 
          aria-label="Close Sidebar Menu"
          title="Close Sidebar Menu"
        >
          <span>✕</span>
        </button>
      </div>

      <!-- Admin User Snippet -->
      <div class="sidebar-user-pill">
        <div class="sidebar-avatar-wrap">
          <img :src="adminUser.avatar || content.director?.image || 'img/ithunt.webp'" :alt="adminUser.name" class="sidebar-avatar-img" @error="onAvatarError">
          <span class="live-status-dot-emerald" title="Admin Active Online"></span>
        </div>
        <div class="sidebar-user-details" v-if="!isSidebarCollapsed">
          <div class="sidebar-user-name">{{ adminUser.name || 'Mr. Lakshman Singh Chauhan' }}</div>
          <div class="sidebar-user-role">🛡️ {{ adminUser.role || 'Director Desk' }}</div>
        </div>
      </div>

      <!-- Grouped Sidebar Navigation Items -->
      <nav class="sidebar-nav-scroll">
        <!-- Group 1: Core Dashboard -->
        <div class="nav-group-section">
          <div class="nav-group-label" v-if="!isSidebarCollapsed">EXECUTIVE</div>
          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'overview' }" 
            @click="currentTab = 'overview'; isMobileSidebarOpen = false"
            title="Executive Dashboard Overview"
          >
            <span class="nav-item-icon">📊</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">Overview</span>
          </button>
        </div>

        <!-- Group 2: Academics & Registry -->
        <div class="nav-group-section">
          <div class="nav-group-label" v-if="!isSidebarCollapsed">STUDENTS & REGISTRY</div>
          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'admissions' }" 
            @click="currentTab = 'admissions'; isMobileSidebarOpen = false"
            title="Admissions Registry & Applications"
          >
            <span class="nav-item-icon">📝</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">Admissions</span>
            <span class="nav-badge-pill alert-badge" v-if="pendingAdmissionsCount > 0">{{ pendingAdmissionsCount }} new</span>
            <span class="nav-badge-pill" v-else-if="!isSidebarCollapsed">{{ admissionsList.length }}</span>
          </button>

          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'students' }" 
            @click="currentTab = 'students'; isMobileSidebarOpen = false"
            title="Students Master Directory"
          >
            <span class="nav-item-icon">🎓</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">Students Directory</span>
            <span class="nav-badge-pill" v-if="!isSidebarCollapsed">{{ unifiedStudentsList.length }}</span>
          </button>

          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'nielit' }" 
            @click="currentTab = 'nielit'; isMobileSidebarOpen = false"
            title="NIELIT Project Submissions"
          >
            <span class="nav-item-icon">📜</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">NIELIT Submissions</span>
            <span class="nav-badge-pill" v-if="!isSidebarCollapsed">{{ nielitProjectsList.length }}</span>
          </button>

          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'courses' }" 
            @click="currentTab = 'courses'; isMobileSidebarOpen = false"
            title="Accredited Courses & Curriculum"
          >
            <span class="nav-item-icon">📚</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">Courses</span>
            <span class="nav-badge-pill" v-if="!isSidebarCollapsed">{{ coursesList.length }}</span>
          </button>
        </div>

        <!-- Group 3: Finance & Credentials -->
        <div class="nav-group-section">
          <div class="nav-group-label" v-if="!isSidebarCollapsed">FINANCE & CREDENTIALS</div>
          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'fees' }" 
            @click="currentTab = 'fees'; isMobileSidebarOpen = false"
            title="Fees Ledger & Receipts"
          >
            <span class="nav-item-icon">💳</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">Fees & Ledgers</span>
            <span class="nav-badge-pill" v-if="!isSidebarCollapsed">{{ feesList.length }}</span>
          </button>

          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'certificates' }" 
            @click="currentTab = 'certificates'; isMobileSidebarOpen = false"
            title="Certificates & QR Registry"
          >
            <span class="nav-item-icon">🏅</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">Certificates & QR</span>
            <span class="nav-badge-pill" v-if="!isSidebarCollapsed">{{ certificatesList.length }}</span>
          </button>

          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'internships' }" 
            @click="currentTab = 'internships'; isMobileSidebarOpen = false"
            title="Internship Tracks"
          >
            <span class="nav-item-icon">🚀</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">Internships</span>
            <span class="nav-badge-pill" v-if="!isSidebarCollapsed">{{ internshipsList.length || (content.internshipVenture?.tracks?.length || 5) }}</span>
          </button>

          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'careers' }" 
            @click="currentTab = 'careers'; isMobileSidebarOpen = false"
            title="Faculty & Developer Recruitment"
          >
            <span class="nav-item-icon">💼</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">Recruitment</span>
            <span class="nav-badge-pill" v-if="!isSidebarCollapsed">{{ jobApplicationsList.length }}</span>
          </button>
        </div>

        <!-- Group 4: Engagement & Platform -->
        <div class="nav-group-section">
          <div class="nav-group-label" v-if="!isSidebarCollapsed">PLATFORM & SUPPORT</div>
          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'reviews' }" 
            @click="currentTab = 'reviews'; isMobileSidebarOpen = false"
            title="Student Reviews & Feedback"
          >
            <span class="nav-item-icon">⭐</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">Reviews</span>
            <span class="nav-badge-pill" v-if="!isSidebarCollapsed">{{ reviewsList.length }}</span>
          </button>

          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'events' }" 
            @click="currentTab = 'events'; isMobileSidebarOpen = false"
            title="Events & VIP Passes"
          >
            <span class="nav-item-icon">🎪</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">Events & RSVPs</span>
            <span class="nav-badge-pill" v-if="!isSidebarCollapsed">{{ rsvpsList.length }}</span>
          </button>

          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'projects' }" 
            @click="currentTab = 'projects'; isMobileSidebarOpen = false"
            title="Capstone Student Projects"
          >
            <span class="nav-item-icon">💻</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">Student Projects</span>
            <span class="nav-badge-pill" v-if="!isSidebarCollapsed">{{ projectsList.length }}</span>
          </button>

          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'contact' }" 
            @click="currentTab = 'contact'; isMobileSidebarOpen = false"
            title="Contact Inquiries"
          >
            <span class="nav-item-icon">📬</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">Enquiries</span>
            <span class="nav-badge-pill" v-if="!isSidebarCollapsed">{{ contactInquiriesList.length }}</span>
          </button>

          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'users' }" 
            @click="currentTab = 'users'; isMobileSidebarOpen = false"
            title="User & Staff Accounts"
          >
            <span class="nav-item-icon">👥</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">Staff Accounts</span>
            <span class="nav-badge-pill" v-if="!isSidebarCollapsed">{{ usersList.length }}</span>
          </button>

          <button 
            class="sidebar-nav-item" 
            :class="{ active: currentTab === 'settings' }" 
            @click="currentTab = 'settings'; isMobileSidebarOpen = false"
            title="System Configuration & Backups"
          >
            <span class="nav-item-icon">⚙️</span>
            <span class="nav-item-label" v-if="!isSidebarCollapsed">System Settings</span>
          </button>
        </div>
      </nav>

      <!-- Sidebar Bottom Tools -->
      <div class="sidebar-bottom-actions">
        <button 
          class="sidebar-footer-btn back-site-btn" 
          @click="$emit('set-tab', 'home')" 
          title="Return to Public Website"
        >
          <span class="footer-btn-icon">🌐</span>
          <span class="footer-btn-text" v-if="!isSidebarCollapsed">Public Website</span>
        </button>
        <button 
          class="sidebar-footer-btn logout-btn" 
          @click="$emit('logout')" 
          title="Sign out of SuperAdmin Console"
        >
          <span class="footer-btn-icon">🚪</span>
          <span class="footer-btn-text" v-if="!isSidebarCollapsed">Sign Out</span>
        </button>
      </div>
    </aside>

    <!-- Mobile Overlay Backdrop -->
    <div 
      v-if="isMobileSidebarOpen" 
      class="admin-sidebar-backdrop" 
      @click="isMobileSidebarOpen = false" 
      @touchstart.passive="isMobileSidebarOpen = false"
      aria-hidden="true"
    ></div>

    <!-- 2. MAIN ADMIN CONTENT CANVAS -->
    <main class="admin-main-canvas">
      <!-- Top Executive Command Bar -->
      <header ref="adminHeaderRef" class="admin-top-command-bar">
        <div class="command-bar-left">
          <button 
            class="admin-mobile-toggle" 
            :class="{ active: isMobileSidebarOpen }"
            @click="isMobileSidebarOpen = !isMobileSidebarOpen" 
            :aria-label="isMobileSidebarOpen ? 'Close Sidebar Menu' : 'Open Sidebar Menu'"
            :title="isMobileSidebarOpen ? 'Close Menu' : 'Open Menu'"
          >
            <span>{{ isMobileSidebarOpen ? '✕' : '☰' }}</span>
          </button>
          <div class="admin-breadcrumb">
            <span class="breadcrumb-root">IT HUNT Console</span>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current">{{ currentTabTitle }}</span>
          </div>
        </div>

        <!-- Global Search Input in Command Bar -->
        <div class="command-bar-search">
          <span class="command-search-icon">🔍</span>
          <input 
            type="text" 
            v-model="globalAdminSearch" 
            class="command-search-input" 
            placeholder="Search records in current tab..."
          >
          <button v-if="globalAdminSearch" class="command-search-clear" @click="globalAdminSearch = ''">✕</button>
        </div>

        <div class="command-bar-right">
          <!-- Live Cloud Database Status Pill (Dynamic From Server) -->
          <div 
            class="cloud-status-chip" 
            :class="dbStatusClass"
            :title="dbStatusTitle"
          >
            <span :class="dbStatus.connected ? 'pulse-dot-emerald' : 'pulse-dot-amber'"></span>
            <span class="cloud-status-text">{{ dbStatus.connected ? dbEngineLabel + ': ' + dbStatusLabel : 'DB: ' + dbStatusLabel }}</span>
            <span v-if="dbStatus.latency" style="font-size: 0.72rem; color: #34d399; margin-left: 0.25rem;">({{ dbStatus.latency }}ms)</span>
          </div>

          <!-- Pending Admissions Notification Pill -->
          <button 
            v-if="pendingAdmissionsCount > 0" 
            class="command-alert-pill" 
            @click="currentTab = 'admissions'; admissionStatusFilter = 'Pending Verification'"
            title="Click to review pending student registrations"
          >
            <span class="alert-icon">🔔</span>
            <span class="alert-text">{{ pendingAdmissionsCount }} Pending Review</span>
          </button>

          <!-- Direct Admission Modal Button -->
          <button 
            class="command-primary-btn" 
            @click="openQuickAdmissionModal" 
            title="Register New Admission Directly"
          >
            <span>+ New Admission</span>
          </button>

          <!-- Backup Database Button -->
          <button 
            class="command-secondary-btn" 
            @click="exportDataToJson" 
            title="Download Complete JSON Backup of Database"
          >
            <span>📥 Backup</span>
          </button>

          <!-- Refresh Data Button -->
          <button 
            class="command-icon-btn" 
            @click="refreshAllData" 
            :disabled="isRefreshing" 
            title="Sync with Live Database"
          >
            <span :style="isRefreshing ? 'display: inline-block; animation: spin 1s linear infinite;' : ''">🔄</span>
          </button>

          <!-- Theme Toggle -->
          <button 
            class="command-icon-btn" 
            @click="$emit('toggle-theme')" 
            :title="isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'"
          >
            <span>{{ isDarkMode ? '☀️' : '🌙' }}</span>
          </button>
        </div>
      </header>

      <!-- Feedback Toast Banner -->
      <div v-if="emailActionMsg" class="admin-toast-banner" :class="{ 'is-success': emailActionMsg.includes('✓') }">
        <span>{{ emailActionMsg }}</span>
      </div>

      <!-- Main Workspace Panels Area -->
      <div class="admin-canvas-content">

        <!-- TAB: OVERVIEW (EXECUTIVE DASHBOARD) -->
        <div v-if="currentTab === 'overview'" class="admin-tab-panel overview-panel anim-stagger-1">
          <!-- 1. Executive Welcome Banner -->
          <div class="overview-welcome-card">
            <div class="welcome-card-left">
              <div class="welcome-pill">
                <span class="pulse-dot-emerald"></span>
                <span>CENTRAL DIRECTORATE CONSOLE • ACADEMIC SESSION 2026-27</span>
              </div>
              <h2 class="welcome-title">
                Welcome back, <span class="text-gradient">{{ adminUser.name || 'Mr. Lakshman Singh Chauhan' }}</span>
              </h2>
              <p class="welcome-desc">
                IT HUNT Academy Central Registry • Connected to {{ dbEngineLabel }} ({{ dbStatus.name }}) • Database: <strong :style="{ color: dbStatusColor }">{{ dbStatusLabel }}</strong>
              </p>
            </div>
            <div class="welcome-card-actions">
              <button class="btn-primary welcome-cta-btn" @click="openQuickAdmissionModal">
                <span>+ Direct Admission</span>
              </button>
              <button class="btn-secondary welcome-secondary-btn" @click="refreshAllData" :disabled="isRefreshing">
                <span :style="isRefreshing ? 'display: inline-block; animation: spin 1s linear infinite;' : ''">🔄</span>
                <span>Sync Live Data</span>
              </button>
            </div>
          </div>

          <!-- 2. Urgent Pending Applications Alert Banner (if pending) -->
          <div 
            v-if="pendingAdmissionsCount > 0" 
            class="overview-urgent-banner"
            @click="currentTab = 'admissions'; admissionStatusFilter = (pendingAdmissionsCount > 0 ? 'Pending Verification' : 'all')"
            title="Click to review and confirm pending registrations"
          >
            <div class="banner-left">
              <div class="banner-icon-badge">🔔</div>
              <div>
                <div class="banner-head">
                  <span>{{ pendingAdmissionsCount }} New Candidate Registration(s) Awaiting Review!</span>
                  <span class="action-req-chip">ACTION REQUIRED</span>
                </div>
                <div class="banner-sub">
                  Candidate applications submitted online. 1-Click confirm to automatically generate Student User ID & Password.
                </div>
              </div>
            </div>
            <button class="btn-primary banner-action-btn">
              <span>Review Applications ({{ pendingAdmissionsCount }}) →</span>
            </button>
          </div>

          <!-- 3. Core Executive KPI Metrics -->
          <div class="overview-kpi-grid">
            <!-- Metric 1: Total Enrolled Students -->
            <div class="kpi-card" @click="currentTab = 'students'" title="View Students Directory">
              <div class="kpi-card-top">
                <div class="kpi-icon-box primary">🎓</div>
                <span class="kpi-badge-pill green">Active Roster</span>
              </div>
              <div class="kpi-value text-gradient">{{ unifiedStudentsList.length }}</div>
              <div class="kpi-label">Registered Students</div>
              <div class="kpi-meta">
                <span>🟢 {{ confirmedAdmissionsCount }} Confirmed</span>
                <span>•</span>
                <span style="color: #f59e0b;">⏳ {{ pendingAdmissionsCount }} Pending</span>
              </div>
            </div>

            <!-- Metric 2: Admissions Registry -->
            <div class="kpi-card" @click="currentTab = 'admissions'" title="View Admissions Registry">
              <div class="kpi-card-top">
                <div class="kpi-icon-box warning">📝</div>
                <span class="kpi-badge-pill orange">Registry Node</span>
              </div>
              <div class="kpi-value text-gradient-gold">{{ admissionsList.length }}</div>
              <div class="kpi-label">Admission Applications</div>
              <div class="kpi-meta">
                <span>Session 2026-27</span>
                <span>•</span>
                <span style="color: #38bdf8;">{{ availableInternshipTracks.length }} Program Tracks</span>
              </div>
            </div>

            <!-- Metric 3: Total Verified Fees Collected -->
            <div class="kpi-card" @click="currentTab = 'fees'" title="View Fees Ledger">
              <div class="kpi-card-top">
                <div class="kpi-icon-box emerald">💳</div>
                <span class="kpi-badge-pill emerald">Fee Ledger</span>
              </div>
              <div class="kpi-value text-gradient-emerald">₹{{ totalFeeCollected.toLocaleString('en-IN') }}</div>
              <div class="kpi-label">Verified Fee Revenue</div>
              <div class="kpi-meta">
                <span>₹{{ totalFeePending.toLocaleString('en-IN') }} Pending</span>
                <span>•</span>
                <span>{{ feesList.length }} Accounts</span>
              </div>
            </div>

            <!-- Metric 4: Verified Certificates & NIELIT Projects -->
            <div class="kpi-card" @click="currentTab = 'certificates'" title="View Certificates Registry">
              <div class="kpi-card-top">
                <div class="kpi-icon-box purple">🏅</div>
                <span class="kpi-badge-pill purple">QR Registry</span>
              </div>
              <div class="kpi-value" style="color: #c084fc;">{{ certificatesList.length }}</div>
              <div class="kpi-label">Certificates Issued</div>
              <div class="kpi-meta">
                <span>{{ nielitProjectsList.length }} NIELIT Projects</span>
                <span>•</span>
                <span>100% Scannable QR</span>
              </div>
            </div>
          </div>

          <!-- 4. Quick Action Power Launchpad -->
          <div class="overview-launchpad-section">
            <h3 class="section-block-title">⚡ Executive Command Shortcuts</h3>
            <div class="launchpad-grid">
              <button class="launch-card" @click="openQuickAdmissionModal">
                <div class="launch-icon">➕</div>
                <div class="launch-info">
                  <div class="launch-title">Register Direct Admission</div>
                  <div class="launch-desc">Enroll candidate & generate credentials</div>
                </div>
                <span class="launch-arrow">→</span>
              </button>

              <button class="launch-card" @click="currentTab = 'admissions'; admissionStatusFilter = (pendingAdmissionsCount > 0 ? 'Pending Verification' : 'all')">
                <div class="launch-icon">📋</div>
                <div class="launch-info">
                  <div class="launch-title">Review Admissions Registry</div>
                  <div class="launch-desc">{{ pendingAdmissionsCount > 0 ? (pendingAdmissionsCount + ' candidate(s) awaiting approval') : (admissionsList.length + ' registered candidates (All Confirmed)') }}</div>
                </div>
                <span class="launch-arrow">→</span>
              </button>

              <button class="launch-card" @click="currentTab = 'students'">
                <div class="launch-icon">🎛️</div>
                <div class="launch-info">
                  <div class="launch-title">Student Dashboard Controls</div>
                  <div class="launch-desc">Toggle student tabs, notice banners & status</div>
                </div>
                <span class="launch-arrow">→</span>
              </button>

              <button class="launch-card" @click="showCourseCertModal = true">
                <div class="launch-icon">🏅</div>
                <div class="launch-info">
                  <div class="launch-title">Issue Course Certificate</div>
                  <div class="launch-desc">Generate official ISO certificate with QR</div>
                </div>
                <span class="launch-arrow">→</span>
              </button>

              <button class="launch-card" @click="currentTab = 'fees'">
                <div class="launch-icon">🧾</div>
                <div class="launch-info">
                  <div class="launch-title">Record Fee Payment</div>
                  <div class="launch-desc">Generate JPG receipts & download ledger</div>
                </div>
                <span class="launch-arrow">→</span>
              </button>

              <button class="launch-card" @click="exportDataToJson">
                <div class="launch-icon">📥</div>
                <div class="launch-info">
                  <div class="launch-title">Export Database Backup</div>
                  <div class="launch-desc">Download complete system JSON snapshot</div>
                </div>
                <span class="launch-arrow">→</span>
              </button>
            </div>
          </div>

          <!-- MongoDB Atlas Live Connectivity & Document Counters Bar (Dynamic From Server) -->
          <div class="overview-db-status-bar" :style="{ background: dbStatusBg, borderColor: dbStatusBorder }" style="margin-top: 1.25rem; margin-bottom: 1.25rem; padding: 0.85rem 1.25rem; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <span :style="{ width: '10px', height: '10px', borderRadius: '50%', background: dbStatusColor, boxShadow: '0 0 10px ' + dbStatusColor, display: 'inline-block' }"></span>
              <strong :style="{ color: dbStatusColor, fontSize: '0.925rem' }">{{ dbEngineLabel }} ({{ dbStatus.name }})</strong>
              <span style="font-size: 0.78rem; color: var(--text-dim);">• {{ dbStatus.connected ? 'Cluster Live • All Collections Synced' : 'Connecting to Server...' }} <span v-if="dbStatus.latency" style="color: #38bdf8;">({{ dbStatus.latency }}ms ping)</span></span>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
              <span class="nav-badge-pill" style="background: rgba(255,255,255,0.06); color: #fff; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.76rem;">📝 {{ admissionsList.length }} Admissions</span>
              <span class="nav-badge-pill" style="background: rgba(255,255,255,0.06); color: #fff; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.76rem;">🎓 {{ unifiedStudentsList.length }} Students</span>
              <span class="nav-badge-pill" style="background: rgba(255,255,255,0.06); color: #fff; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.76rem;">📜 {{ nielitProjectsList.length }} NIELIT</span>
              <span class="nav-badge-pill" style="background: rgba(255,255,255,0.06); color: #fff; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.76rem;">📚 {{ coursesList.length }} Courses</span>
              <span class="nav-badge-pill" style="background: rgba(255,255,255,0.06); color: #fff; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.76rem;">💳 {{ feesList.length }} Fees</span>
              <span class="nav-badge-pill" style="background: rgba(255,255,255,0.06); color: #fff; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.76rem;">🏅 {{ certificatesList.length }} Certificates</span>
              <span class="nav-badge-pill" style="background: rgba(255,255,255,0.06); color: #fff; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.76rem;">🚀 {{ internshipsList.length }} Internships</span>
              <span class="nav-badge-pill" style="background: rgba(255,255,255,0.06); color: #fff; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.76rem;">🎪 {{ eventsCatalogList.length }} Events</span>
              <span class="nav-badge-pill" style="background: rgba(255,255,255,0.06); color: #fff; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.76rem;">💻 {{ projectsList.length }} Projects</span>
              <span class="nav-badge-pill" style="background: rgba(255,255,255,0.06); color: #fff; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.76rem;">⭐ {{ reviewsList.length }} Reviews</span>
              <span class="nav-badge-pill" style="background: rgba(255,255,255,0.06); color: #fff; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.76rem;">👥 {{ usersList.length }} Users</span>
            </div>
          </div>

          <!-- 5. Two-Column Dashboard Split: Recent Admissions Registry & Live System Health -->
          <div class="overview-dual-grid">
            <!-- Left: Recent Candidate Admissions & Confirmed Roster -->
            <div class="overview-box-card" style="flex: 1.4;">
              <div class="box-card-header" style="flex-wrap: wrap; gap: 0.75rem;">
                <div>
                  <div class="box-card-title">📋 Admissions & Registered Students Registry</div>
                  <div class="box-card-sub">Active records loaded live from MongoDB Atlas database</div>
                </div>
                <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
                  <button 
                    type="button"
                    class="admin-tab-btn" 
                    :class="{ active: overviewAdmissionFilter === 'all' }"
                    @click="overviewAdmissionFilter = 'all'"
                    style="padding: 0.25rem 0.6rem; font-size: 0.75rem; border-radius: 6px;"
                  >All ({{ admissionsList.length }})</button>
                  <button 
                    type="button"
                    class="admin-tab-btn" 
                    :class="{ active: overviewAdmissionFilter === 'confirmed' }"
                    @click="overviewAdmissionFilter = 'confirmed'"
                    style="padding: 0.25rem 0.6rem; font-size: 0.75rem; border-radius: 6px;"
                  >Confirmed ({{ confirmedAdmissionsCount }})</button>
                  <button 
                    type="button"
                    class="admin-tab-btn" 
                    :class="{ active: overviewAdmissionFilter === 'pending' }"
                    @click="overviewAdmissionFilter = 'pending'"
                    style="padding: 0.25rem 0.6rem; font-size: 0.75rem; border-radius: 6px;"
                  >Pending ({{ pendingAdmissionsCount }})</button>
                  <button class="box-card-link" @click="currentTab = 'admissions'" style="margin-left: 0.25rem;">View All →</button>
                </div>
              </div>

              <!-- Informative Banner when user selected Pending but all are Confirmed -->
              <div 
                v-if="overviewAdmissionFilter === 'pending' && pendingAdmissionsCount === 0 && admissionsList.length > 0" 
                style="margin: 0.85rem 0.85rem 0 0.85rem; padding: 0.65rem 0.85rem; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; font-size: 0.8rem; color: #34d399; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;"
              >
                <span>✓ All {{ admissionsList.length }} candidate applications are Confirmed & Verified! Displaying registered candidates below:</span>
                <button type="button" class="admin-tab-btn" @click="overviewAdmissionFilter = 'all'" style="font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 6px;">Show All Filter</button>
              </div>

              <div v-if="recentAdmissions.length === 0" class="empty-state-clean">
                <span class="empty-icon">📂</span>
                <div class="empty-title">No Candidate Records Found</div>
                <div class="empty-sub">
                  {{ admissionsList.length > 0 ? 'No candidate registrations match this filter (' + overviewAdmissionFilter + ').' : 'Connecting to live database...' }}
                </div>
                <button 
                  v-if="admissionsList.length > 0"
                  type="button" 
                  class="btn-primary" 
                  style="margin-top: 0.75rem; padding: 0.35rem 0.85rem; font-size: 0.8rem;" 
                  @click="overviewAdmissionFilter = 'all'"
                >
                  View All {{ admissionsList.length }} Registered Candidates
                </button>
                <button 
                  v-else
                  type="button" 
                  class="btn-secondary" 
                  style="margin-top: 0.75rem; padding: 0.35rem 0.85rem; font-size: 0.8rem;" 
                  @click="refreshAllData"
                >
                  🔄 Sync from MongoDB Atlas
                </button>
              </div>

              <div v-else class="queue-list">
                <div v-for="adm in recentAdmissions" :key="adm.registrationNo || adm.id" class="queue-item" style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.05); gap: 1rem;">
                  <div class="queue-item-info" style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                      <div class="queue-item-name" style="font-weight: 700; color: #fff;">{{ adm.candidateName || adm.fullName || 'Candidate' }}</div>
                      <span class="admin-status-chip" :class="(adm.status === 'Confirmed' || adm.status === 'Active Registered Student' || adm.admissionConfirmed) ? 'status-confirmed' : 'status-pending'" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">
                        {{ (adm.status === 'Confirmed' || adm.status === 'Active Registered Student' || adm.admissionConfirmed) ? 'Confirmed ✓' : 'Pending Review' }}
                      </span>
                    </div>
                    <div class="queue-item-meta" style="font-size: 0.78rem; color: var(--text-dim); margin-top: 0.25rem; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                      <span class="queue-reg-pill" style="font-family: var(--font-mono); color: #38bdf8;">{{ adm.registrationNo || adm.id }}</span>
                      <span>•</span>
                      <span style="color: #94a3b8;">{{ adm.course }}</span>
                      <span>•</span>
                      <span>📞 {{ adm.mobile || adm.phone || '—' }}</span>
                      <span>•</span>
                      <span>💳 {{ adm.feeStatus || 'Pending' }}</span>
                    </div>
                  </div>
                  <div class="queue-item-actions" style="display: flex; gap: 0.4rem; align-items: center; flex-shrink: 0;">
                    <button 
                      v-if="!adm.admissionConfirmed && adm.status !== 'Confirmed' && adm.status !== 'Active Registered Student'"
                      class="btn-primary queue-confirm-btn" 
                      @click="handleConfirmAdmission(adm)" 
                      title="1-Click Confirm Admission"
                      style="font-size: 0.78rem; padding: 0.35rem 0.7rem;"
                    >
                      <span>Confirm ✓</span>
                    </button>
                    <button 
                      class="btn-secondary queue-icon-btn" 
                      @click="openCredentialsModal(adm)" 
                      title="View Student Portal Login Credentials"
                      style="font-size: 0.78rem; padding: 0.35rem 0.65rem;"
                    >
                      <span>🔑 Logins</span>
                    </button>
                    <button 
                      class="btn-secondary queue-icon-btn" 
                      @click="emit('download-slip', adm)" 
                      title="Download ISO Admission Slip"
                      style="font-size: 0.78rem; padding: 0.35rem 0.65rem;"
                    >
                      <span>📄 Slip</span>
                    </button>
                    <button 
                      class="btn-secondary queue-icon-btn" 
                      @click="shareCredentialsOnWhatsApp(adm)" 
                      title="WhatsApp Candidate"
                      style="font-size: 0.78rem; padding: 0.35rem 0.55rem;"
                    >
                      <span>💬</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Realtime Cloud Infrastructure & Quick Jumpers -->
            <div class="overview-box-card">
              <div class="box-card-header">
                <div>
                  <div class="box-card-title">🛡️ Central System & Infrastructure</div>
                  <div class="box-card-sub">Realtime database health, security protocols, and quick jumpers</div>
                </div>
                <button class="box-card-link" @click="refreshAllData">🔄 Refresh Status</button>
              </div>

              <div class="system-health-list">
                <div class="health-row">
                  <div class="health-label">
                    <span :style="{ width: '8px', height: '8px', borderRadius: '50%', background: dbStatusColor, display: 'inline-block' }"></span>
                    <span>Database Engine</span>
                  </div>
                  <div class="health-value">
                    {{ dbEngineLabel }} ({{ dbStatus.name }})
                    <span :style="{ color: dbStatusColor, marginLeft: '0.35rem', fontSize: '0.76rem' }">● {{ dbStatusLabel }}</span>
                  </div>
                </div>

                <div class="health-row">
                  <div class="health-label">
                    <span :class="dbStatus.connected ? 'health-dot-green' : 'health-dot-amber'"></span>
                    <span>REST API Service</span>
                  </div>
                  <div class="health-value">
                    {{ dbStatus.connected ? 'Online' : 'Standby' }} • v2.2.2-atlas
                    <span v-if="dbStatus.latency" style="color: #38bdf8; margin-left: 0.35rem; font-size: 0.76rem;">({{ dbStatus.latency }}ms)</span>
                  </div>
                </div>

                <div class="health-row">
                  <div class="health-label">
                    <span class="health-dot-green"></span>
                    <span>QR Verification Node</span>
                  </div>
                  <div class="health-value">Active • ISO 9001:2015</div>
                </div>

                <div class="health-row">
                  <div class="health-label">
                    <span class="health-dot-green"></span>
                    <span>Security Encryption</span>
                  </div>
                  <div class="health-value">256-Bit SSL / JWT Auth</div>
                </div>

                <div class="health-row">
                  <div class="health-label">
                    <span class="health-dot-green"></span>
                    <span>Session Authority</span>
                  </div>
                  <div class="health-value">{{ adminUser.name || 'Director & Founder' }}</div>
                </div>
              </div>

              <div class="quick-jump-chips">
                <span class="jump-label">Quick Jump:</span>
                <button class="jump-chip" @click="currentTab = 'nielit'">📜 NIELIT Projects ({{ nielitProjectsList.length }})</button>
                <button class="jump-chip" @click="currentTab = 'courses'">📚 Courses ({{ coursesList.length }})</button>
                <button class="jump-chip" @click="currentTab = 'careers'">💼 Jobs ({{ jobApplicationsList.length }})</button>
                <button class="jump-chip" @click="currentTab = 'reviews'">⭐ Reviews ({{ reviewsList.length }})</button>
                <button class="jump-chip" @click="currentTab = 'events'">🎪 Events ({{ rsvpsList.length }})</button>
                <button class="jump-chip" @click="currentTab = 'contact'">📬 Inquiries ({{ contactInquiriesList.length }})</button>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 0: STUDENTS DIRECTORY / STUDENT LIST -->
        <div v-else-if="currentTab === 'students'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">🎓 Students Directory & Master Academic List</h3>
          <p class="panel-subtitle">
            Connected Database | Total Enrolled & Candidates: <strong style="color: var(--color-ai-orange);">{{ unifiedStudentsList.length }}</strong>
          </p>
        </div>

        <div class="panel-filter-group">
          <!-- Search Bar -->
          <div class="events-search-box" style="margin: 0; min-width: 280px;">
            <span class="events-search-icon">🔍</span>
            <input 
              type="text" 
              v-model="studentSearch" 
              class="events-search-input" 
              placeholder="Search by Name, Reg No, Email, Phone..."
            >
            <button v-if="studentSearch" class="events-search-clear" @click="studentSearch = ''">✕</button>
          </div>

          <!-- Course Filter -->
          <select v-model="studentCourseFilter" class="form-control admin-select-filter">
            <option value="all">All Courses ({{ availableCoursesForFilter.length }})</option>
            <option v-for="c in availableCoursesForFilter" :key="c" :value="c">{{ c }}</option>
          </select>

          <!-- Batch Filter -->
          <select v-model="studentBatchFilter" class="form-control admin-select-filter" style="min-width: 120px;">
            <option value="all">All Batches</option>
            <option value="2026">Batch 2026</option>
            <option value="2025">Batch 2025</option>
          </select>

          <!-- Status Filter -->
          <select v-model="studentStatusFilter" class="form-control admin-select-filter" style="min-width: 130px;">
            <option value="all">All Statuses ({{ unifiedStudentsList.length }})</option>
            <option value="ACTIVE">ACTIVE ✓ ({{ confirmedAdmissionsCount }})</option>
            <option value="PENDING_REVIEW">PENDING REVIEW ⏳ ({{ pendingAdmissionsCount }})</option>
            <option value="GRADUATED">GRADUATED 🎓</option>
            <option value="INACTIVE">INACTIVE ⏸️</option>
          </select>
        </div>
      </div>

      <!-- Students Data Table Card -->
      <div class="admin-table-card">
        <div class="table-responsive-container">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>Enrollment No</th>
                <th>Student Particulars</th>
                <th>Contact Mobile</th>
                <th>Enrolled Course & Batch</th>
                <th>Academic Status</th>
                <th>Registered Date</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="stu in filteredStudents" :key="stu.id || stu.enrollmentNumber">
                <!-- Enrollment No -->
                <td>
                  <span 
                    class="reg-no-code" 
                    :style="{
                      background: (stu.admissionConfirmed || stu.status === 'Confirmed') ? 'rgba(56, 189, 248, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: (stu.admissionConfirmed || stu.status === 'Confirmed') ? '#38bdf8' : '#f59e0b',
                      border: (stu.admissionConfirmed || stu.status === 'Confirmed') ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(245, 158, 11, 0.4)',
                      fontWeight: '700'
                    }"
                  >
                    {{ stu.enrollmentNumber || stu.registrationNo || 'ITH-2026-STU001' }}
                  </span>
                  <div v-if="!stu.admissionConfirmed && stu.status !== 'Confirmed'" style="font-size: 0.68rem; color: #f59e0b; font-weight: 800; margin-top: 3px;">
                    ⏳ Pending Review
                  </div>
                  <div v-else-if="stu.userId" style="font-size: 0.7rem; font-family: var(--font-mono); color: #38bdf8; margin-top: 2px;">
                    🆔 {{ stu.userId }}
                  </div>
                </td>

                <!-- Student Particulars -->
                <td>
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 38px; height: 38px; border-radius: 50%; background: var(--gradient-ai-btn); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; font-size: 1rem; flex-shrink: 0;">
                      {{ (stu.name || stu.fullName || 'S').charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div style="font-weight: 700; color: var(--text-main);">{{ stu.name || stu.fullName || stu.candidateName }}</div>
                      <div style="font-size: 0.78rem; color: var(--text-muted);">{{ stu.email }}</div>
                    </div>
                  </div>
                </td>

                <!-- Mobile -->
                <td style="font-family: var(--font-mono); font-size: 0.875rem;">
                  {{ stu.phone || stu.mobile || '—' }}
                </td>

                <!-- Course & Batch -->
                <td>
                  <div style="font-weight: 600; font-size: 0.88rem; color: var(--text-main);">{{ stu.course }}</div>
                  <span style="font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 12px; background: rgba(255,255,255,0.06); color: var(--text-muted); font-family: var(--font-mono);">
                    Batch: {{ stu.batch || '2026' }}
                  </span>
                </td>

                <!-- Academic Status -->
                <td>
                  <span 
                    class="status-pill"
                    :style="{
                      background: (stu.academicStatus === 'ACTIVE' || stu.status === 'ACTIVE' || stu.admissionConfirmed) ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: (stu.academicStatus === 'ACTIVE' || stu.status === 'ACTIVE' || stu.admissionConfirmed) ? '#10b981' : '#f59e0b',
                      borderColor: (stu.academicStatus === 'ACTIVE' || stu.status === 'ACTIVE' || stu.admissionConfirmed) ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.4)'
                    }"
                  >
                    ● {{ (stu.academicStatus === 'ACTIVE' || stu.status === 'ACTIVE' || stu.admissionConfirmed) ? (stu.academicStatus || 'ACTIVE') : 'Pending Review' }}
                  </span>
                </td>

                <!-- Date -->
                <td style="font-size: 0.82rem; color: var(--text-muted);">
                  {{ stu.createdAtFormatted || stu.createdAt }}
                </td>

                <!-- Actions -->
                <td style="text-align: right;">
                  <div style="display: flex; justify-content: flex-end; gap: 0.4rem; flex-wrap: wrap;">
                    <!-- If pending candidate: prominent 1-click Confirm & Generate Login -->
                    <button 
                      v-if="!stu.admissionConfirmed && stu.status !== 'Confirmed'"
                      class="btn-primary" 
                      @click="handleConfirmAdmissionAndGenerateCredentials(stu.originalAdmission || stu)"
                      title="Confirm candidate admission and automatically generate Student User ID & Password"
                      style="padding: 0.35rem 0.75rem; font-size: 0.78rem; font-weight: 800; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-color: #10b981; color: #fff; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);"
                    >
                      ⚡ Confirm & Generate
                    </button>

                    <button 
                      class="admin-icon-btn" 
                      title="View Student Profile"
                      @click="selectedStudentDetail = stu; showStudentDetailModal = true;"
                    >
                      👁️ Profile
                    </button>
                    <button 
                      class="admin-icon-btn" 
                      title="Edit Student Record"
                      style="color: var(--color-ai-cyan); border-color: rgba(56, 189, 248, 0.4);"
                      @click="openEditStudentModal(stu)"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      type="button"
                      class="admin-icon-btn" 
                      title="Issue Official Course Completion Certificate"
                      style="color: var(--color-ai-yellow); border-color: rgba(250, 204, 21, 0.4);"
                      @click="openIssueCourseCertModalForStudent(stu)"
                    >
                      🏅 Issue Cert
                    </button>
                    <button 
                      type="button"
                      class="admin-icon-btn" 
                      title="Control Student Dashboard Features, Modules, Announcements & Access"
                      style="color: #c084fc; border-color: rgba(192, 132, 252, 0.4); background: rgba(192, 132, 252, 0.1); font-weight: 700;"
                      @click="openDashboardControlModal(stu)"
                    >
                      🎛️ Controls
                    </button>
                    <button 
                      v-if="stu.admissionConfirmed || stu.status === 'Confirmed'"
                      class="admin-icon-btn" 
                      title="View Student Portal Login Credentials"
                      style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);"
                      @click="openCredentialsModal(stu)"
                    >
                      🔐 Credentials
                    </button>
                    <button 
                      v-if="(stu.admissionConfirmed || stu.status === 'Confirmed') && (stu.phone || stu.mobile)"
                      class="admin-icon-btn" 
                      title="Share Login Credentials via WhatsApp"
                      style="color: #22c55e; border-color: rgba(34, 197, 94, 0.4);"
                      @click="shareCredentialsOnWhatsApp(stu)"
                    >
                      📲 WhatsApp
                    </button>
                    <button 
                      v-if="stu.admissionConfirmed || stu.status === 'Confirmed'"
                      class="admin-icon-btn" 
                      title="Reset Student Login Password"
                      style="color: #f59e0b; border-color: rgba(245, 158, 11, 0.4);"
                      @click="openResetPasswordModal(stu)"
                    >
                      🔑 Reset Pass
                    </button>
                    <button 
                      class="admin-icon-btn" 
                      style="color: #ef4444; border-color: rgba(239, 68, 68, 0.3);"
                      title="Delete Student"
                      @click="$emit('delete-student', stu)"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty state -->
              <tr v-if="filteredStudents.length === 0">
                <td colspan="7" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                  <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎓</div>
                  <div style="font-weight: 700; font-size: 1rem; color: #fff; margin-bottom: 0.5rem;">
                    {{ unifiedStudentsList.length > 0 ? 'No student records match current filter (' + studentStatusFilter + ').' : 'No student records found in database.' }}
                  </div>
                  <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 1rem;">
                    {{ unifiedStudentsList.length > 0 ? 'Total ' + unifiedStudentsList.length + ' registered students exist in MongoDB Atlas roster.' : 'Connecting to live database...' }}
                  </div>
                  <button 
                    v-if="studentStatusFilter !== 'all' || studentSearch || studentCourseFilter !== 'all' || studentBatchFilter !== 'all'"
                    type="button" 
                    class="btn-primary" 
                    style="padding: 0.4rem 1rem; font-size: 0.85rem;" 
                    @click="studentStatusFilter = 'all'; studentCourseFilter = 'all'; studentBatchFilter = 'all'; studentSearch = ''"
                  >
                    Show All {{ unifiedStudentsList.length }} Students
                  </button>
                  <button 
                    v-else
                    type="button" 
                    class="btn-secondary" 
                    style="padding: 0.4rem 1rem; font-size: 0.85rem;" 
                    @click="refreshAllData"
                  >
                    🔄 Sync from MongoDB Atlas
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 1: ADMISSIONS & STUDENT REGISTRY -->
    <div v-else-if="currentTab === 'admissions'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">🎓 Student Admissions & Candidate Registry</h3>
          <p class="panel-subtitle">Manage registered candidate details, verified ISO registration slips, and program allocations.</p>
        </div>

        <div class="panel-filter-group">
          <!-- Search input -->
          <div class="events-search-box" style="margin: 0; min-width: 260px;">
            <span class="events-search-icon">🔍</span>
            <input 
              type="text" 
              v-model="admissionSearch" 
              class="events-search-input" 
              placeholder="Search by name, mobile, reg ID..."
            >
            <button v-if="admissionSearch" class="events-search-clear" @click="admissionSearch = ''">✕</button>
          </div>

          <!-- Status filter -->
          <select v-model="admissionStatusFilter" class="form-control admin-select-filter">
            <option value="all">All Registrations ({{ admissionsList.length }})</option>
            <option value="Pending Verification">⏳ Pending Review ({{ pendingAdmissionsCount }})</option>
            <option value="Confirmed">✅ Confirmed Admissions ({{ confirmedAdmissionsCount }})</option>
            <option value="Verified">Verified</option>
          </select>

          <!-- Enroll New Candidate Button -->
          <button 
            class="btn-primary" 
            style="padding: 0.5rem 1rem; font-size: 0.825rem; font-weight: 700; white-space: nowrap; border-radius: var(--radius-sm);"
            @click="openQuickAdmissionModal"
          >
            <span>➕ Enroll Candidate</span>
          </button>
        </div>
      </div>

      <!-- Quick Filter Pills Strip -->
      <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap;">
        <button 
          type="button"
          class="admin-tab-btn" 
          :class="{ active: admissionStatusFilter === 'all' }"
          @click="admissionStatusFilter = 'all'"
          style="padding: 0.35rem 0.85rem; font-size: 0.8rem; border-radius: 999px;"
        >
          📋 All Registrations ({{ admissionsList.length }})
        </button>
        <button 
          type="button"
          class="admin-tab-btn" 
          :class="{ active: admissionStatusFilter === 'Pending Verification' || admissionStatusFilter === 'Pending Confirmation' }"
          @click="admissionStatusFilter = 'Pending Verification'"
          style="padding: 0.35rem 0.85rem; font-size: 0.8rem; border-radius: 999px; border-color: rgba(245, 158, 11, 0.5);"
          :style="pendingAdmissionsCount > 0 ? { color: '#f59e0b', fontWeight: '800', background: 'rgba(245, 158, 11, 0.12)' } : {}"
        >
          ⏳ Pending Review ({{ pendingAdmissionsCount }})
          <span v-if="pendingAdmissionsCount > 0" style="margin-left: 6px; padding: 2px 7px; border-radius: 999px; background: #f59e0b; color: #000; font-size: 0.68rem; font-weight: 900;">
            Action Needed
          </span>
        </button>
        <button 
          type="button"
          class="admin-tab-btn" 
          :class="{ active: admissionStatusFilter === 'Confirmed' }"
          @click="admissionStatusFilter = 'Confirmed'"
          style="padding: 0.35rem 0.85rem; font-size: 0.8rem; border-radius: 999px; border-color: rgba(16, 185, 129, 0.5);"
          :style="{ color: '#10b981' }"
        >
          ✅ Confirmed Students & Active Logins ({{ confirmedAdmissionsCount }})
        </button>
      </div>

      <!-- Action Feedback Banner -->
      <div v-if="emailActionMsg" style="margin-bottom: 1.25rem; padding: 0.85rem 1.25rem; background: rgba(249, 115, 22, 0.15); border: 1px solid rgba(249, 115, 22, 0.4); border-radius: var(--radius-md); color: var(--color-ai-orange); font-weight: 700; font-size: 0.9rem;">
        {{ emailActionMsg }}
      </div>

      <!-- Admissions Data Table -->
      <div class="admin-table-card">
        <div class="table-responsive">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>Reg. / Student ID</th>
                <th>Candidate Name</th>
                <th>Father's Name</th>
                <th>Mobile & Email</th>
                <th>Enrolled Program / Track</th>
                <th>Date & Time</th>
                <th>Admission Status</th>
                <th style="text-align: right;">Official Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="adm in filteredAdmissions" :key="adm.registrationNo || adm.id">
                <td>
                  <span class="admin-reg-pill">{{ adm.registrationNo || adm.id }}</span>
                  <div v-if="adm.userId || adm.enrollmentNumber" style="font-size: 0.72rem; font-family: var(--font-mono); color: #38bdf8; margin-top: 4px; font-weight: 700;">
                    🆔 {{ adm.userId || adm.enrollmentNumber }}
                  </div>
                  <div v-if="adm.password" style="font-size: 0.72rem; font-family: var(--font-mono); color: #34d399; margin-top: 2px; display: flex; align-items: center; gap: 4px;">
                    <span>🔑 {{ showPasswordFor[adm.registrationNo || adm.id] ? adm.password : '••••••••' }}</span>
                    <button 
                      type="button" 
                      @click="togglePassword(adm.registrationNo || adm.id)" 
                      style="background: none; border: none; cursor: pointer; font-size: 0.75rem; padding: 0;" 
                      :title="showPasswordFor[adm.registrationNo || adm.id] ? 'Hide Password' : 'Show Password'"
                    >
                      {{ showPasswordFor[adm.registrationNo || adm.id] ? '👁️' : '🙈' }}
                    </button>
                  </div>
                </td>
                <td>
                  <div style="font-weight: 800; color: var(--text-main);">{{ adm.candidateName || adm.fullName }}</div>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">{{ adm.gender || '—' }} | DOB: {{ adm.dob || '—' }}</div>
                </td>
                <td>{{ adm.fatherName || '—' }}</td>
                <td>
                  <div>📞 {{ adm.mobile || adm.phone || '—' }}</div>
                  <div style="font-size: 0.75rem; color: var(--color-ai-cyan);">{{ adm.email || '—' }}</div>
                </td>
                <td>
                  <span class="admin-track-pill">{{ adm.course }}</span>
                  <div style="font-size: 0.725rem; color: var(--text-dim); margin-top: 2px;">📍 {{ adm.district || 'Prayagraj' }}, UP</div>
                </td>
                <td style="font-size: 0.8rem; font-family: var(--font-mono); white-space: nowrap;">
                  <div>📅 {{ adm.date }}</div>
                  <div style="color: var(--text-dim);">⏱️ {{ adm.time }}</div>
                </td>
                <td>
                  <span 
                    class="admin-status-chip"
                    :class="{
                      'status-confirmed': adm.status === 'Confirmed' || adm.admissionConfirmed,
                      'status-verified': adm.status === 'Verified',
                      'status-pending': adm.status === 'Pending Verification' || (!adm.status && !adm.admissionConfirmed)
                    }"
                    @click="cycleAdmissionStatus(adm)"
                    :title="'Click to toggle status'"
                  >
                    {{ adm.status || (adm.admissionConfirmed ? 'Confirmed' : 'Pending Verification') }}
                  </span>
                  <div v-if="adm.status === 'Confirmed' || adm.admissionConfirmed" style="font-size: 0.7rem; color: #10b981; font-weight: 700; margin-top: 3px;">
                    ● Login Active
                  </div>
                  <div v-else style="font-size: 0.7rem; color: #f59e0b; font-weight: 700; margin-top: 3px;">
                    ● Pending Review
                  </div>
                  <div style="font-size: 0.7rem; font-weight: 700; margin-top: 3px;" :style="{ color: (adm.feeStatus && adm.feeStatus.includes('Paid')) ? '#10b981' : '#f59e0b' }">
                    💳 {{ adm.feeStatus || 'Fee Pending' }}
                  </div>
                </td>
                <td style="text-align: right;">
                  <div class="admin-row-actions">
                    <!-- ✏️ Edit Admission Record Button -->
                    <button 
                      class="admin-icon-btn" 
                      @click="openEditAdmissionModal(adm)" 
                      title="Edit Candidate Admission Details"
                      style="color: var(--color-ai-cyan); border-color: rgba(56, 189, 248, 0.4);"
                    >
                      ✏️ Edit
                    </button>
                    <!-- 1-Click Confirm & Auto-Generate Credentials for Pending Registrations -->
                    <button 
                      v-if="adm.status !== 'Confirmed' && !adm.admissionConfirmed"
                      class="btn-primary" 
                      @click="handleConfirmAdmissionAndGenerateCredentials(adm)" 
                      title="Confirm candidate admission, generate User ID & Password, and activate student login"
                      style="padding: 0.35rem 0.75rem; font-size: 0.78rem; font-weight: 800; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-color: #10b981; color: #fff; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);"
                    >
                      ⚡ Confirm & Generate
                    </button>

                    <!-- Confirmed Candidate Actions: Credentials, WhatsApp, Reset Password -->
                    <button 
                      v-if="adm.status === 'Confirmed' || adm.admissionConfirmed"
                      class="admin-icon-btn" 
                      @click="openCredentialsModal(adm)" 
                      title="View Generated Student User ID & Password"
                      style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);"
                    >
                      🔐 Credentials
                    </button>
                    <button 
                      v-if="(adm.status === 'Confirmed' || adm.admissionConfirmed) && (adm.mobile || adm.phone)"
                      class="admin-icon-btn" 
                      @click="shareCredentialsOnWhatsApp(adm)" 
                      title="Send Credentials to Student WhatsApp"
                      style="color: #22c55e; border-color: rgba(34, 197, 94, 0.4);"
                    >
                      📲 WhatsApp
                    </button>
                    <button 
                      v-if="adm.status === 'Confirmed' || adm.admissionConfirmed"
                      class="admin-icon-btn" 
                      @click="openResetPasswordModal(adm)" 
                      title="Reset Student Login Password"
                      style="color: #f59e0b; border-color: rgba(245, 158, 11, 0.4);"
                    >
                      🔑 Reset Pass
                    </button>
                    <button 
                      v-if="adm.status === 'Confirmed' || adm.admissionConfirmed"
                      type="button"
                      class="admin-icon-btn" 
                      @click="openDashboardControlModal(adm)" 
                      title="Control Student Dashboard Features, Modules, Announcements & Access"
                      style="color: #c084fc; border-color: rgba(192, 132, 252, 0.4); background: rgba(192, 132, 252, 0.1); font-weight: 700;"
                    >
                      🎛️ Controls
                    </button>

                    <button 
                      class="admin-icon-btn" 
                      @click="openAdmissionEmailModal(adm)" 
                      title="Open Official Admission Confirmation Letter Dispatch Modal"
                      style="color: var(--color-ai-orange); border-color: rgba(249, 115, 22, 0.4);"
                    >
                      📩 Email
                    </button>
                    <button 
                      class="admin-icon-btn" 
                      @click="confirmFeeAndSendJpgReceipt(adm)" 
                      title="Confirm Fee Payment and Email Official JPG Image Receipt to Student"
                      style="color: #34d399; border-color: rgba(52, 211, 153, 0.4);"
                    >
                      💳 JPG Receipt
                    </button>
                    <button 
                      class="admin-icon-btn" 
                      @click="$emit('download-slip', adm)" 
                      title="Download Official Verified PDF Slip"
                    >
                      📄 PDF
                    </button>
                    <button 
                      class="admin-icon-btn" 
                      @click="deleteAdmission(adm)" 
                      title="Delete Candidate Record"
                      style="color: #ef4444;"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredAdmissions.length === 0">
                <td colspan="8" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                  <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
                  <div style="font-weight: 700; font-size: 1rem; color: #fff; margin-bottom: 0.5rem;">
                    {{ admissionsList.length > 0 ? 'No candidates match filter "' + admissionStatusFilter + '".' : 'No candidate admissions found.' }}
                  </div>
                  <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 1rem;">
                    {{ admissionsList.length > 0 ? 'All ' + admissionsList.length + ' registered candidates in MongoDB Atlas are currently Confirmed.' : 'Connecting to live database...' }}
                  </div>
                  <button 
                    v-if="admissionStatusFilter !== 'all' || admissionSearch"
                    type="button" 
                    class="btn-primary" 
                    style="padding: 0.4rem 1rem; font-size: 0.85rem;" 
                    @click="admissionStatusFilter = 'all'; admissionSearch = ''"
                  >
                    Show All {{ admissionsList.length }} Registered Candidates
                  </button>
                  <button 
                    v-else
                    type="button" 
                    class="btn-secondary" 
                    style="padding: 0.4rem 1rem; font-size: 0.85rem;" 
                    @click="refreshAllData"
                  >
                    🔄 Sync from MongoDB Atlas
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB: COURSES & ACADEMIC PROGRAMS -->
    <div v-else-if="currentTab === 'courses'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">📚 Courses & Academic Programs Directory</h3>
          <p class="panel-subtitle">Manage live curriculum programs, fees, certifications, and student enrollments stored in MongoDB.</p>
        </div>
        <button class="btn-primary" @click="openAddCourseModal" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">
          <span>+ Add New Program / Course 🚀</span>
        </button>
      </div>

      <!-- Quick stats for courses -->
      <div class="admin-stats-grid anim-stagger-2" style="margin-bottom: 1.5rem;">
        <div class="admin-stat-card">
          <div class="stat-icon" style="background: rgba(249, 115, 22, 0.15); color: #f97316;">📚</div>
          <div class="stat-meta">
            <span class="stat-value">{{ coursesList.length }}</span>
            <span class="stat-label">Active Database Programs</span>
          </div>
        </div>
        <div class="admin-stat-card">
          <div class="stat-icon" style="background: rgba(52, 211, 153, 0.15); color: #34d399;">🎓</div>
          <div class="stat-meta">
            <span class="stat-value">{{ unifiedStudentsList.length }}</span>
            <span class="stat-label">Total Student Enrollments</span>
          </div>
        </div>
        <div class="admin-stat-card">
          <div class="stat-icon" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">🗄️</div>
          <div class="stat-meta">
            <span class="stat-value">MongoDB</span>
            <span class="stat-label">Database Storage Engine</span>
          </div>
        </div>
      </div>

      <div class="admin-table-card">
        <div class="table-responsive">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Program / Course Title</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Program Fee</th>
                <th>Enrolled Candidates</th>
                <th>Certification</th>
                <th>Status</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in coursesList" :key="course.id || course.code">
                <td><span class="admin-reg-pill">{{ course.code }}</span></td>
                <td>
                  <div style="font-weight: 800; color: var(--text-main);">{{ course.title || course.name }}</div>
                  <span v-if="course.badge" class="badge badge-warning" style="font-size: 0.65rem; margin-top: 0.25rem;">{{ course.badge }}</span>
                </td>
                <td style="color: var(--color-ai-cyan);">{{ course.category || course.categoryName || 'Software Engineering' }}</td>
                <td style="font-family: var(--font-mono); font-size: 0.85rem;">⏱️ {{ course.duration }}</td>
                <td style="font-weight: 800; color: #10b981; font-family: var(--font-mono);">{{ course.fee || '₹15,000' }}</td>
                <td>
                  <span class="badge badge-primary" style="font-size: 0.75rem;">
                    {{ getCourseEnrollmentCount(course.title || course.name) }} Students
                  </span>
                </td>
                <td style="font-size: 0.8rem; color: var(--text-muted);">{{ course.certification || course.certificate || 'Govt. Recognized' }}</td>
                <td>
                  <span class="admin-status-chip status-confirmed">{{ course.status || 'ACTIVE' }}</span>
                </td>
                <td style="text-align: right;">
                  <div style="display: flex; gap: 0.4rem; justify-content: flex-end;">
                    <button class="admin-icon-btn" @click="filterAdmissionsByCourse(course.title || course.name)" title="View Enrolled Students">
                      👥
                    </button>
                    <button class="admin-icon-btn" @click="openEditCourseModal(course)" title="Edit Course Details">
                      ✏️
                    </button>
                    <button class="admin-icon-btn" @click="deleteCourseItem(course)" style="color: #ef4444;" title="Delete Course">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="coursesList.length === 0">
                <td colspan="9" style="text-align: center; padding: 2rem; color: var(--text-dim);">No courses found in MongoDB. Click "+ Add New Program" to create one.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB: NIELIT STUDENT PROJECTS -->
    <div v-else-if="currentTab === 'nielit'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">📜 NIELIT Student Project Submissions</h3>
          <p class="panel-subtitle">Review candidate project forms, guide declarations, fee UTR details, and official 4-Page PDF verification documents.</p>
        </div>

        <div class="panel-filter-group" style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
          <button 
            type="button" 
            class="btn-primary" 
            style="background: linear-gradient(135deg, #38bdf8, #0284c7); border-color: #38bdf8; font-weight: 800; font-size: 0.85rem;"
            @click="openAddNielitModal()"
          >
            <span>📜 + New NIELIT Submission</span>
          </button>
          <!-- Search input -->
          <div class="events-search-box" style="margin: 0; min-width: 260px;">
            <span class="events-search-icon">🔍</span>
            <input 
              type="text" 
              v-model="nielitSearch" 
              class="events-search-input" 
              placeholder="Search by candidate name, reg no, project..."
            >
            <button v-if="nielitSearch" class="events-search-clear" @click="nielitSearch = ''">✕</button>
          </div>

          <!-- Status filter -->
          <select v-model="nielitStatusFilter" class="form-control admin-select-filter">
            <option value="all">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Verified & Approved">Verified & Approved</option>
          </select>
        </div>
      </div>

      <!-- NIELIT Projects Table -->
      <div class="admin-table-card">
        <div class="table-responsive">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>Reg & Level</th>
                <th>Candidate Particulars</th>
                <th>Project & Guide</th>
                <th>Fee & UTR Details</th>
                <th>Date & Location</th>
                <th>Verification Status</th>
                <th style="text-align: right;">Official Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in filteredNielitProjects" :key="p.registrationNo || p.nielitRegNo">
                <td>
                  <span class="admin-reg-pill">{{ p.nielitRegNo || p.registrationNo }}</span>
                  <div style="margin-top: 4px;">
                    <span class="admin-track-pill" style="background: rgba(249, 115, 22, 0.15); color: #f97316;">
                      '{{ p.nielitLevel || 'O' }}' Level
                    </span>
                  </div>
                </td>
                <td>
                  <div style="font-weight: 800; color: var(--text-main);">{{ p.candidateName }}</div>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">Father: {{ p.fatherName }}</div>
                  <div style="font-size: 0.75rem; color: var(--color-ai-cyan);">📞 {{ p.mobile }} | {{ p.email }}</div>
                </td>
                <td>
                  <div style="font-weight: 700; color: var(--color-ai-yellow);">{{ p.projectTitle }}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Guide: {{ p.guideName }} ({{ p.guideQualification || 'MCA' }})</div>
                  <div style="font-size: 0.725rem; color: var(--text-dim);">{{ p.guideDesignation }}</div>
                </td>
                <td>
                  <div style="font-weight: 800; color: #22c55e;">₹{{ p.amount || '1000' }} ({{ p.paymentRemark || 'Paid' }})</div>
                  <div style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--color-ai-cyan);">UTR: {{ p.utrNumber || 'N/A' }}</div>
                  <div style="font-size: 0.725rem; color: var(--text-dim);">Date: {{ p.paymentDate }}</div>
                </td>
                <td style="font-size: 0.8rem; font-family: var(--font-mono); white-space: nowrap;">
                  <div>📅 {{ p.projectDate || p.createdAt || 'Recent' }}</div>
                  <div style="color: var(--text-dim);">📍 {{ p.district || 'Prayagraj' }}, {{ p.state || 'UP' }}</div>
                </td>
                <td>
                  <span 
                    class="admin-status-chip"
                    :class="{
                      'status-confirmed': p.status === 'Verified & Approved',
                      'status-verified': p.status === 'Under Review',
                      'status-pending': !p.status || p.status === 'Submitted'
                    }"
                    @click="cycleNielitStatus(p)"
                    title="Click to toggle project verification status"
                  >
                    {{ p.status || 'Submitted' }}
                  </span>
                </td>
                <td style="text-align: right;">
                  <div class="admin-row-actions">
                    <button 
                      class="admin-icon-btn" 
                      @click="openEditNielitModal(p)" 
                      title="Edit Submitted Project Form Details"
                      style="color: var(--color-ai-cyan); border-color: rgba(56, 189, 248, 0.4);"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      class="admin-icon-btn" 
                      @click="$emit('download-nielit-pdf', p)" 
                      title="Download Official 4-Page NIELIT Project PDF Document"
                      style="color: var(--color-ai-yellow);"
                    >
                      📜 PDF
                    </button>
                    <button 
                      class="admin-icon-btn" 
                      @click="deleteNielitProject(p)" 
                      title="Delete Project Submission"
                      style="color: #ef4444;"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredNielitProjects.length === 0">
                <td colspan="7" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                  <div style="font-size: 2rem; margin-bottom: 0.5rem;">📜</div>
                  <div>No NIELIT student project submissions found matching your search.</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 2: INTERNSHIP TRACKS MANAGER -->
    <div v-else-if="currentTab === 'internships'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">🚀 Production Internship Tracks & Candidate Registry</h3>
          <p class="panel-subtitle">Live candidate applications from MongoDB Atlas, industry tracks, and placement roadmaps.</p>
        </div>
        <div>
          <button 
            type="button" 
            class="btn-primary" 
            style="background: linear-gradient(135deg, #06b6d4, #0284c7); border-color: #06b6d4; font-weight: 800; font-size: 0.85rem;"
            @click="openAddInternshipModal()"
          >
            <span>🚀 + Register Internship Applicant</span>
          </button>
        </div>
      </div>

      <!-- Live Internship Applications Registry Table from MongoDB -->
      <div class="admin-table-card" style="margin-bottom: 2rem;">
        <div class="table-card-header" style="padding: 1rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <h4 style="font-size: 1rem; font-weight: 800; color: #fff; margin: 0;">📋 Registered Internship Applicants ({{ internshipsList.length }})</h4>
            <div style="font-size: 0.78rem; color: var(--text-dim); margin-top: 0.2rem;">Live records retrieved from MongoDB Atlas (internships collection)</div>
          </div>
          <button class="box-card-link" @click="refreshAllData">🔄 Refresh Data</button>
        </div>
        <div class="table-responsive">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Applicant Name</th>
                <th>Contact Details</th>
                <th>Domain / Track</th>
                <th>Duration & Mode</th>
                <th>College / Branch</th>
                <th>Status</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="intern in internshipsList" :key="intern.id || intern._id">
                <td><span class="admin-reg-pill">{{ intern.id || intern._id }}</span></td>
                <td style="font-weight: 800; color: var(--text-main);">
                  <div>{{ intern.name || intern.candidateName }}</div>
                </td>
                <td>
                  <div style="font-size: 0.85rem;">📞 {{ intern.phone || intern.mobile || '—' }}</div>
                  <div style="font-size: 0.78rem; color: var(--color-ai-cyan);">{{ intern.email }}</div>
                </td>
                <td style="font-weight: 700; color: #38bdf8;">{{ intern.track || intern.domain || 'Full Stack Web Development' }}</td>
                <td>
                  <div>⏱️ {{ intern.duration || '6 Months' }}</div>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">{{ intern.mode || 'Studio / Hybrid' }}</div>
                </td>
                <td style="color: var(--text-muted); font-size: 0.82rem;">
                  <div>{{ intern.college || 'Engineering College' }}</div>
                  <div style="font-size: 0.74rem; color: var(--text-dim);">{{ intern.branch || 'CSE' }}</div>
                </td>
                <td>
                  <span class="admin-status-chip status-confirmed">{{ intern.status || 'Confirmed' }}</span>
                </td>
                <td style="text-align: right;">
                  <div style="display: inline-flex; gap: 0.35rem;">
                    <button class="admin-icon-btn" @click="openEditInternshipModal(intern)" title="Edit Internship Details" style="color: #38bdf8;">✏️</button>
                    <button class="admin-icon-btn" @click="handleDeleteInternship(intern)" title="Delete Internship" style="color: #ef4444;">🗑️</button>
                  </div>
                </td>
              </tr>
              <tr v-if="internshipsList.length === 0">
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-dim);">
                  No internship applications found in MongoDB Atlas. Click "+ Register Internship Applicant" to add one.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="admin-grid-2col">
        <div class="modern-track-card" v-for="track in availableInternshipTracks" :key="track.id">
          <div class="track-card-header">
            <div class="track-icon-bubble" v-html="track.icon"></div>
            <div class="track-meta-pills">
              <span class="track-duration-tag">⏱️ {{ track.duration }}</span>
              <span class="track-badge-tag">{{ track.badge }}</span>
            </div>
          </div>
          <div class="track-card-body">
            <h3 class="track-card-title">{{ track.title }}</h3>
            <p class="track-card-desc">{{ track.description }}</p>

            <div class="track-glass-stats" style="margin-top: 1rem;">
              <div class="track-stat-cell">
                <span class="cell-label">💰 Salary Range</span>
                <span class="cell-val text-gradient-gold">{{ track.earningPotential?.fresher || '₹4.5 - ₹7.5 LPA' }}</span>
              </div>
              <div class="track-stat-cell">
                <span class="cell-label">🎯 Placement</span>
                <span class="cell-val cell-green">{{ track.jobPlacementRate?.percentage || 95 }}%</span>
              </div>
              <div class="track-stat-cell">
                <span class="cell-label">⏱️ Total Hours</span>
                <span class="cell-val cell-cyan">{{ track.learningHours?.totalHours || '180+ Hrs' }}</span>
              </div>
            </div>

            <div style="margin-top: 1rem;">
              <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-dim); margin-bottom: 0.35rem;">Live Projects ({{ track.liveProjects?.length || 0 }}):</div>
              <div class="projects-preview-tags">
                <span class="proj-tag" v-for="proj in (track.liveProjects || [])" :key="proj.name">
                  ⚡ {{ proj.name }}
                </span>
              </div>
            </div>

            <div style="margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: flex-end;">
              <button 
                type="button" 
                class="admin-icon-btn" 
                style="color: #34d399; border-color: rgba(52, 211, 153, 0.4); font-size: 0.8rem; padding: 0.4rem 0.85rem;"
                @click="openIssueExpCertModal({ role: track.title + ' Intern', track: track.title, duration: track.duration })"
                title="Issue Experience Certificate for this Internship Track"
              >
                💼 Issue {{ track.title }} Exp Letter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: EVENT RSVPS & PASSES -->
    <div v-else-if="currentTab === 'events'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">🎪 Events Directory & VIP Pass Bookings</h3>
          <p class="panel-subtitle">Scheduled hackathons, tech conferences, and live VIP pass reservations stored in MongoDB Atlas.</p>
        </div>
        <div>
          <button 
            type="button" 
            class="btn-primary" 
            style="background: linear-gradient(135deg, #f59e0b, #d97706); border-color: #f59e0b; font-weight: 800; font-size: 0.85rem;"
            @click="openAddEventModal()"
          >
            <span>🎪 + Schedule New Event</span>
          </button>
        </div>
      </div>

      <!-- Scheduled Events Catalog Directory from MongoDB -->
      <div class="admin-table-card" style="margin-bottom: 2rem;">
        <div class="table-card-header" style="padding: 1rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <h4 style="font-size: 1rem; font-weight: 800; color: #fff; margin: 0;">📅 Scheduled Campus Events & Summits ({{ eventsCatalogList.length }})</h4>
            <div style="font-size: 0.78rem; color: var(--text-dim); margin-top: 0.2rem;">Events directory stored in MongoDB Atlas (events collection)</div>
          </div>
          <button class="box-card-link" @click="refreshAllData">🔄 Refresh Data</button>
        </div>
        <div class="table-responsive">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Title & Topic</th>
                <th>Category</th>
                <th>Date & Time</th>
                <th>Venue / Location</th>
                <th>Capacity</th>
                <th>Status</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="evt in eventsCatalogList" :key="evt.id || evt._id">
                <td><span class="admin-reg-pill">{{ evt.id || evt._id }}</span></td>
                <td>
                  <div style="font-weight: 800; color: var(--text-main);">{{ evt.title || evt.name }}</div>
                  <div style="font-size: 0.76rem; color: var(--text-dim);" v-if="evt.description">{{ evt.description.slice(0, 60) }}...</div>
                </td>
                <td><span class="badge-tag" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">{{ evt.category || 'Tech Summit' }}</span></td>
                <td>
                  <div style="font-weight: 700;">📅 {{ evt.date }}</div>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">⏰ {{ evt.time || '10:00 AM' }}</div>
                </td>
                <td style="font-size: 0.82rem; color: var(--text-muted);">📍 {{ evt.location || evt.venue || 'IT HUNT Studio Lab' }}</td>
                <td style="font-weight: 700; color: var(--color-ai-cyan);">👥 {{ evt.capacity || '100+' }}</td>
                <td>
                  <span class="admin-status-chip status-confirmed">{{ evt.status || 'Upcoming' }}</span>
                </td>
                <td style="text-align: right;">
                  <div style="display: inline-flex; gap: 0.35rem;">
                    <button class="admin-icon-btn" @click="openEditEventModal(evt)" title="Edit Event" style="color: #38bdf8;">✏️</button>
                    <button class="admin-icon-btn" @click="handleDeleteEvent(evt)" title="Cancel/Delete Event" style="color: #ef4444;">🗑️</button>
                  </div>
                </td>
              </tr>
              <tr v-if="eventsCatalogList.length === 0">
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-dim);">
                  No scheduled events found in MongoDB Atlas. Click "+ Schedule New Event" to create one.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="admin-table-card">
        <div class="table-responsive">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>Pass ID</th>
                <th>Attendee Name</th>
                <th>Contact Phone</th>
                <th>Email Address</th>
                <th>Target Event</th>
                <th>College / Institute</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rsvp in rsvpsList" :key="rsvp.id">
                <td><span class="admin-reg-pill">{{ rsvp.id }}</span></td>
                <td style="font-weight: 800; color: var(--text-main);">{{ rsvp.name }}</td>
                <td>📞 {{ rsvp.phone }}</td>
                <td style="color: var(--color-ai-cyan);">{{ rsvp.email }}</td>
                <td style="font-weight: 700;">{{ rsvp.eventTitle }}</td>
                <td style="color: var(--text-muted);">{{ rsvp.college || 'Engineering College' }}</td>
                <td>
                  <span class="admin-status-chip status-confirmed">{{ rsvp.status || 'Pass Confirmed' }}</span>
                </td>
                <td style="text-align: right;">
                  <button class="admin-icon-btn" @click="deleteRsvp(rsvp)" style="color: #ef4444;" title="Cancel Pass">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 4: CAREERS & FACULTY JOB APPLICATIONS -->
    <div v-else-if="currentTab === 'careers'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">💼 Faculty & Developer Job Applications</h3>
          <p class="panel-subtitle">Review incoming resumes for Senior MERN Trainers, iOS Instructors, Python AI Faculty, and Developers.</p>
        </div>
      </div>

      <div class="admin-table-card">
        <div class="table-responsive">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Candidate Name</th>
                <th>Contact Info</th>
                <th>Applied Role</th>
                <th>Experience</th>
                <th>Portfolio / GitHub</th>
                <th>Status</th>
                <th style="text-align: right;">Review Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="job in jobApplicationsList" :key="job.id">
                <td><span class="admin-reg-pill">{{ job.id }}</span></td>
                <td>
                  <div style="font-weight: 800; color: var(--text-main);">{{ job.name }}</div>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">{{ job.currentCompany || 'Software Company' }}</div>
                </td>
                <td>
                  <div>📞 {{ job.phone }}</div>
                  <div style="font-size: 0.75rem; color: var(--color-ai-cyan);">{{ job.email }}</div>
                </td>
                <td style="font-weight: 700; color: var(--color-ai-yellow);">{{ job.position || job.jobTitle }}</td>
                <td><span class="exp-badge-required" style="font-size: 0.725rem;">{{ job.experience || '4+ Yrs' }}</span></td>
                <td>
                  <a v-if="job.portfolio" :href="job.portfolio" target="_blank" rel="noopener noreferrer" style="color: var(--color-ai-cyan); text-decoration: underline; font-size: 0.8rem;">
                    🔗 View Portfolio
                  </a>
                  <span v-else style="color: var(--text-dim); font-size: 0.8rem;">Submitted via Portal</span>
                </td>
                <td>
                  <span 
                    class="admin-status-chip"
                    :class="{
                      'status-confirmed': job.status === 'Shortlisted for Interview' || job.status === 'Hired',
                      'status-verified': job.status === 'Interview Scheduled',
                      'status-pending': !job.status || job.status === 'Reviewing Profile'
                    }"
                    @click="cycleJobStatus(job)"
                    title="Click to advance candidate recruitment stage"
                  >
                    {{ job.status || 'Reviewing Profile' }}
                  </span>
                </td>
                <td style="text-align: right;">
                  <button class="admin-icon-btn" @click="deleteJobApp(job)" style="color: #ef4444;" title="Archive Application">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 5: STUDENT REVIEWS & RATINGS -->
    <div v-else-if="currentTab === 'reviews'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">⭐ Student Reviews & Facility Ratings Moderation</h3>
          <p class="panel-subtitle">Review feedback regarding lab workstations, mentor guidance, and learning outcomes ({{ reviewsList.length }} reviews in DB).</p>
        </div>
        <div>
          <button 
            type="button" 
            class="btn-primary" 
            style="background: linear-gradient(135deg, #eab308, #ca8a04); border-color: #eab308; font-weight: 800; font-size: 0.85rem; color: #000;"
            @click="openAddReviewModal()"
          >
            <span>⭐ + Add Student Review</span>
          </button>
        </div>
      </div>

      <div class="reviews-grid">
        <div class="review-card" v-for="rev in reviewsList" :key="rev.id">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span class="star-rating-display">{{ '★'.repeat(rev.rating || 5) }}</span>
            <span style="font-size: 0.75rem; color: var(--text-dim); font-family: var(--font-mono);">{{ rev.date }}</span>
          </div>
          <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.15rem; font-style: italic;">
            "{{ rev.comment }}"
          </p>
          <div class="review-author">
            <img :src="rev.avatar || 'img/student-placeholder.svg'" :alt="rev.name" class="review-avatar" @error="onAvatarError">
            <div style="flex: 1;">
              <div style="font-weight: 700; font-size: 0.9rem;">{{ rev.name }}</div>
              <div style="font-size: 0.775rem; color: var(--color-ai-cyan); font-family: var(--font-mono);">{{ rev.role }}</div>
            </div>
            <button class="admin-icon-btn" @click="deleteReview(rev)" style="color: #ef4444;" title="Delete Review">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB: FEES LEDGER -->
    <div v-else-if="currentTab === 'fees'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">💳 Student Fees Ledger & Transaction History</h3>
          <p class="panel-subtitle">Official verified UPI receipts, installment tracking, and payment reconciliations.</p>
        </div>
        <div>
          <button 
            type="button" 
            class="btn-primary" 
            style="background: linear-gradient(135deg, #10b981, #059669); border-color: #10b981; font-weight: 800; font-size: 0.85rem;"
            @click="openAddFeeModal()"
          >
            <span>💳 + Record Fee Payment</span>
          </button>
        </div>
      </div>

      <div class="admin-table-card">
        <div class="table-responsive">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>Receipt No</th>
                <th>Student Name</th>
                <th>Program / Course</th>
                <th>Amount Paid</th>
                <th>Payment Mode</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="fee in feesList" :key="fee.id">
                <td><span class="admin-reg-pill">{{ fee.receiptNo }}</span></td>
                <td style="font-weight: 800; color: var(--text-main);">{{ fee.studentName }}</td>
                <td style="color: var(--color-ai-cyan);">{{ fee.course }}</td>
                <td style="font-weight: 800; color: #10b981; font-family: var(--font-mono);">{{ fee.amount }}</td>
                <td><span style="font-size: 0.8rem; color: var(--text-muted);">{{ fee.paymentMode }}</span></td>
                <td style="font-family: var(--font-mono); font-size: 0.8rem;">{{ fee.date }}</td>
                <td>
                  <span class="admin-status-chip status-confirmed">{{ fee.status || 'Verified & Paid' }}</span>
                </td>
                <td style="text-align: right;">
                  <div style="display: flex; gap: 0.35rem; justify-content: flex-end; align-items: center;">
                    <button class="btn-primary" @click="confirmFeeAndSendJpgReceipt(fee)" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
                      <span>JPG Slip 🧾</span>
                    </button>
                    <button class="admin-icon-btn" @click="openEditFeeModal(fee)" title="Edit Fee" style="color: var(--color-ai-cyan); border-color: rgba(56, 189, 248, 0.4);">
                      ✏️
                    </button>
                    <button class="admin-icon-btn" @click="handleDeleteFee(fee)" title="Delete Fee Record" style="color: #ef4444;">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="feesList.length === 0">
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-dim);">No fee ledger transactions recorded yet.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB: CERTIFICATES -->
    <div v-else-if="currentTab === 'certificates'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">🏅 Verified Graduate Certificates & Experience Letters</h3>
          <p class="panel-subtitle">Official ISO 9001:2015 accredited course completion credentials and corporate experience certificates.</p>
        </div>

        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; align-items: center;">
          <button 
            type="button"
            class="btn-primary" 
            style="background: linear-gradient(135deg, #ea580c, #f97316); border-color: #ea580c; box-shadow: 0 4px 14px rgba(234, 88, 12, 0.35); font-weight: 800; font-size: 0.85rem;"
            @click="openIssueCourseCertModal()"
          >
            <span>🎓 + Issue Course Certificate</span>
          </button>
          <button 
            type="button"
            class="btn-primary" 
            style="background: linear-gradient(135deg, #10b981, #059669); border-color: #10b981; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35); font-weight: 800; font-size: 0.85rem;"
            @click="openIssueExpCertModal()"
          >
            <span>💼 + Issue Experience Certificate</span>
          </button>
        </div>
      </div>

      <!-- Filters Ribbon -->
      <div class="panel-filter-group" style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div class="events-search-box" style="margin: 0; min-width: 280px; flex: 1;">
          <span class="events-search-icon">🔍</span>
          <input 
            type="text" 
            v-model="certSearch" 
            class="events-search-input" 
            placeholder="Search by Student Name, Cert ID, Course, Role..."
          >
          <button v-if="certSearch" class="events-search-clear" @click="certSearch = ''">✕</button>
        </div>

        <div style="display: flex; gap: 0.4rem; background: rgba(0,0,0,0.3); padding: 4px; border-radius: var(--radius-md); border: 1px solid var(--border-cyber); flex-wrap: wrap;">
          <button 
            type="button"
            class="admin-icon-btn" 
            :style="{ background: certFilter === 'all' ? 'var(--color-ai-orange)' : 'transparent', color: certFilter === 'all' ? '#fff' : 'var(--text-muted)' }"
            @click="certFilter = 'all'"
          >
            All ({{ filteredCertificates.length }})
          </button>
          <button 
            type="button"
            class="admin-icon-btn" 
            :style="{ background: certFilter === 'course' ? 'var(--color-ai-orange)' : 'transparent', color: certFilter === 'course' ? '#fff' : 'var(--text-muted)' }"
            @click="certFilter = 'course'"
          >
            🎓 Course ({{ certificatesList.filter(c => c.type !== 'experience').length }})
          </button>
          <button 
            type="button"
            class="admin-icon-btn" 
            :style="{ background: certFilter === 'experience' ? '#10b981' : 'transparent', color: certFilter === 'experience' ? '#fff' : 'var(--text-muted)' }"
            @click="certFilter = 'experience'"
          >
            💼 Experience ({{ certificatesList.filter(c => c.type === 'experience').length }})
          </button>
        </div>
      </div>

      <div class="admin-table-card">
        <div class="table-responsive">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>Certificate ID</th>
                <th>Candidate / Graduate</th>
                <th>Type & Program / Role</th>
                <th>Tenure / Duration</th>
                <th>Grade / Appraisal</th>
                <th>Issue Date</th>
                <th>Status</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cert in filteredCertificates" :key="cert.id || cert.certNo">
                <td>
                  <span class="admin-reg-pill" style="display: inline-flex; align-items: center; gap: 4px;">
                    <span>{{ cert.type === 'experience' ? '💼' : '🎓' }}</span>
                    <span>{{ cert.certNo }}</span>
                  </span>
                </td>
                <td style="font-weight: 800; color: var(--text-main);">
                  <div>{{ cert.studentName || cert.candidateName }}</div>
                  <div style="font-size: 0.725rem; color: var(--text-dim);" v-if="cert.type === 'experience'">{{ cert.department || 'Software Solutions' }}</div>
                </td>
                <td>
                  <div style="font-weight: 700; color: var(--color-ai-cyan);">
                    {{ cert.type === 'experience' ? (cert.role || cert.designation || cert.course) : cert.course }}
                  </div>
                  <span 
                    style="font-size: 0.7rem; font-weight: 800; padding: 1px 6px; border-radius: 4px; text-transform: uppercase;"
                    :style="cert.type === 'experience' ? 'background: rgba(16, 185, 129, 0.15); color: #34d399;' : 'background: rgba(249, 115, 22, 0.15); color: #fb923c;'"
                  >
                    {{ cert.type === 'experience' ? '💼 Experience Letter' : '🎓 Course Completion' }}
                  </span>
                </td>
                <td style="font-size: 0.85rem; color: var(--text-muted);">
                  <div>{{ cert.duration || '6 Months' }}</div>
                  <div v-if="cert.startDate" style="font-size: 0.725rem; color: var(--text-dim);">{{ cert.startDate }} – {{ cert.endDate }}</div>
                </td>
                <td>
                  <span class="exp-badge-required" style="font-size: 0.75rem; background: rgba(250, 204, 21, 0.15); color: #facc15; border-color: rgba(250, 204, 21, 0.3);">
                    {{ cert.grade || cert.performance || 'Outstanding' }}
                  </span>
                </td>
                <td style="font-family: var(--font-mono); font-size: 0.8rem;">{{ cert.issueDate }}</td>
                <td>
                  <span class="admin-status-chip status-confirmed">✓ {{ cert.status || 'Verified & Active' }}</span>
                </td>
                <td style="text-align: right;">
                  <div class="admin-row-actions">
                    <button 
                      type="button"
                      class="admin-icon-btn" 
                      @click="handlePreviewCertificate(cert)" 
                      title="Preview Official Certificate"
                      style="color: var(--color-ai-cyan); border-color: rgba(56, 189, 248, 0.4);"
                    >
                      👁️ Preview
                    </button>
                    <button 
                      type="button"
                      class="admin-icon-btn" 
                      @click="handleDownloadCertPdf(cert)" 
                      title="Download Official PDF Document"
                      style="color: var(--color-ai-yellow); border-color: rgba(250, 204, 21, 0.4);"
                    >
                      📜 PDF
                    </button>
                    <button 
                      type="button"
                      class="admin-icon-btn" 
                      @click="handleDeleteCertificate(cert)" 
                      title="Delete Certificate Record"
                      style="color: #ef4444;"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredCertificates.length === 0">
                <td colspan="8" style="text-align: center; padding: 2.5rem; color: var(--text-dim);">
                  No certificates found matching criteria. Click "+ Issue Course Certificate" or "+ Issue Experience Certificate" above to generate one!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB: CAPSTONE PROJECTS -->
    <div v-else-if="currentTab === 'projects'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">💻 Capstone Projects & Student Repositories</h3>
          <p class="panel-subtitle">Production apps built by interns with live cloud hosting and public Git repos ({{ projectsList.length }} projects in DB).</p>
        </div>
        <div>
          <button 
            type="button" 
            class="btn-primary" 
            style="background: linear-gradient(135deg, #10b981, #059669); border-color: #10b981; font-weight: 800; font-size: 0.85rem;"
            @click="openAddProjectModal()"
          >
            <span>💻 + Add Capstone Project</span>
          </button>
        </div>
      </div>

      <div class="admin-table-card">
        <div class="table-responsive">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Developer Name</th>
                <th>Tech Stack</th>
                <th>Repository</th>
                <th>Live Demo</th>
                <th>Status</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prj in projectsList" :key="prj.id || prj._id">
                <td>
                  <div style="font-weight: 800; color: var(--text-main);">{{ prj.title || prj.projectTitle }}</div>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">ID: {{ prj.id || prj._id }}</div>
                </td>
                <td style="font-weight: 700; color: var(--color-ai-yellow);">{{ prj.studentName }}</td>
                <td><span style="font-size: 0.8rem; color: var(--color-ai-cyan);">{{ prj.techStack }}</span></td>
                <td>
                  <a v-if="prj.repoUrl" :href="prj.repoUrl" target="_blank" rel="noopener noreferrer" style="color: var(--color-ai-cyan); text-decoration: underline; font-size: 0.8rem;">
                    📦 GitHub Repo
                  </a>
                  <span v-else style="color: var(--text-dim); font-size: 0.8rem;">—</span>
                </td>
                <td>
                  <a v-if="prj.liveUrl" :href="prj.liveUrl" target="_blank" rel="noopener noreferrer" style="color: #10b981; text-decoration: underline; font-size: 0.8rem; font-weight: 700;">
                    🚀 Live Demo
                  </a>
                  <span v-else style="color: var(--text-dim); font-size: 0.8rem;">—</span>
                </td>
                <td>
                  <span class="admin-status-chip status-confirmed">{{ prj.status || 'Completed & Deployed' }}</span>
                </td>
                <td style="text-align: right;">
                  <div style="display: inline-flex; gap: 0.35rem;">
                    <button class="admin-icon-btn" @click="openEditProjectModal(prj)" title="Edit Project" style="color: #38bdf8;">✏️</button>
                    <button class="admin-icon-btn" @click="handleDeleteProject(prj)" title="Delete Project" style="color: #ef4444;">🗑️</button>
                  </div>
                </td>
              </tr>
              <tr v-if="projectsList.length === 0">
                <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-dim);">No capstone projects registered yet. Click "+ Add Capstone Project" to create one.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB: ENQUIRIES & CONTACT -->
    <div v-else-if="currentTab === 'contact'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">📬 Inbound Student & Corporate Enquiries</h3>
          <p class="panel-subtitle">Direct messages and queries submitted through the website contact channels.</p>
        </div>
      </div>

      <div class="admin-table-card">
        <div class="table-responsive">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>Inquirer Name</th>
                <th>Contact Phone</th>
                <th>Email Address</th>
                <th>Subject</th>
                <th>Message Content</th>
                <th>Received Date</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inq in contactInquiriesList" :key="inq.id || inq._id">
                <td style="font-weight: 800; color: var(--text-main);">{{ inq.name || inq.fullName }}</td>
                <td>📞 {{ inq.phone || inq.mobile }}</td>
                <td style="color: var(--color-ai-cyan);">{{ inq.email }}</td>
                <td style="font-weight: 700; color: var(--color-ai-yellow);">{{ inq.subject }}</td>
                <td style="max-width: 320px; font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">{{ inq.message }}</td>
                <td style="font-family: var(--font-mono); font-size: 0.8rem;">{{ inq.createdAt }}</td>
                <td style="text-align: right;">
                  <button class="admin-icon-btn" @click="handleDeleteContact(inq)" title="Delete Contact Inquiry" style="color: #ef4444;">
                    🗑️
                  </button>
                </td>
              </tr>
              <tr v-if="contactInquiriesList.length === 0">
                <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-dim);">No inbound enquiries recorded yet.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB: USER ACCOUNTS -->
    <div v-else-if="currentTab === 'users'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">👥 Central Auth User Accounts & Roles</h3>
          <p class="panel-subtitle">Registered system users, administrator accounts, and verified student credentials.</p>
        </div>
      </div>

      <div class="admin-table-card">
        <div class="table-responsive">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>System Role</th>
                <th>Status</th>
                <th>Registered Date</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in usersList" :key="user.id">
                <td><span class="admin-reg-pill">{{ user.id }}</span></td>
                <td style="font-weight: 800; color: var(--text-main);">{{ user.name }}</td>
                <td style="color: var(--color-ai-cyan);">{{ user.email }}</td>
                <td>
                  <span class="exp-badge-required" :style="{ background: user.role === 'admin' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(56, 189, 248, 0.15)', color: user.role === 'admin' ? '#f97316' : '#38bdf8' }">
                    {{ user.role === 'admin' ? '🛡️ SuperAdmin' : '🎓 Student' }}
                  </span>
                </td>
                <td>
                  <span class="admin-status-chip status-confirmed">✓ {{ user.verified ? 'Verified' : 'Active' }}</span>
                </td>
                <td style="font-family: var(--font-mono); font-size: 0.8rem;">{{ user.createdAt }}</td>
                <td style="text-align: right;">
                  <div style="display: flex; justify-content: flex-end; gap: 0.4rem;">
                    <button 
                      v-if="user.role !== 'admin'" 
                      class="admin-icon-btn" 
                      @click="openResetPasswordModal(user)" 
                      style="color: #f59e0b; border-color: rgba(245, 158, 11, 0.4);" 
                      title="Reset User Password"
                    >
                      🔑 Reset Pass
                    </button>
                    <button v-if="user.role !== 'admin'" class="admin-icon-btn" @click="handleDeleteUser(user)" style="color: #ef4444;" title="Delete User">🗑️</button>
                  </div>
                </td>
              </tr>
              <tr v-if="usersList.length === 0">
                <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-dim);">No user accounts recorded yet.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 6: SYSTEM CONFIGURATION -->
    <div v-else-if="currentTab === 'settings'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">⚙️ System Configuration & Environment Controls</h3>
          <p class="panel-subtitle">Manage feature flags, security policies, and official verification keys.</p>
        </div>
      </div>

      <div class="admin-grid-2col">
        <div class="form-card" style="margin: 0;">
          <h4 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 1rem; color: var(--color-ai-yellow);">
            🌐 Production Environment Variables (.env)
          </h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem; font-family: var(--font-mono); font-size: 0.85rem;">
            <div class="config-row">
              <span class="config-key">PORT:</span>
              <span class="config-val">5500 (Active)</span>
            </div>
            <div class="config-row">
              <span class="config-key">DATABASE:</span>
              <span class="config-val" :style="{ color: dbStatusColor, fontWeight: '700' }">{{ dbEngineLabel }} ({{ dbStatus.name }}) • {{ dbStatusLabel }} ✅</span>
            </div>
            <div class="config-row">
              <span class="config-key">ACCREDITATION:</span>
              <span class="config-val text-gradient-gold">ISO 9001:2015 Accredited</span>
            </div>
            <div class="config-row">
              <span class="config-key">PRIVACY_CODE:</span>
              <span class="config-val">ITH-POL-2026/01</span>
            </div>
            <div class="config-row">
              <span class="config-key">TERMS_CODE:</span>
              <span class="config-val">ITH-TOC-2026/02</span>
            </div>
          </div>
        </div>

        <div class="form-card" style="margin: 0;">
          <h4 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 1rem; color: var(--color-ai-yellow);">
            🛡️ Feature Flags & Live Services
          </h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <label class="toggle-control-label">
              <input type="checkbox" v-model="featureAdmissionPortal" checked>
              <div>
                <strong>Online Admission Portal</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Enable public candidate registrations and PDF slip generator</div>
              </div>
            </label>

            <label class="toggle-control-label">
              <input type="checkbox" v-model="featureCareersPortal" checked>
              <div>
                <strong>Faculty & Developer Hiring Portal</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Accept online trainer and engineering applications</div>
              </div>
            </label>

            <label class="toggle-control-label">
              <input type="checkbox" v-model="featureCosmicStarfield" checked>
              <div>
                <strong>Cosmic Twinkling Starfield Animation</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">60 FPS GPU-accelerated background atmosphere</div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Add / Edit Course Program Modal -->
    <div class="modal-overlay" v-if="showAddCourseModal" @click.self="showAddCourseModal = false">
      <div class="modal-card" style="max-width: 720px;">
        <div class="modal-header">
          <div class="modal-title">
            <span>📚</span> {{ isEditingCourse ? 'Edit Course / Academic Program' : 'Add New Course / Program to Database' }}
          </div>
          <button class="modal-close-btn" @click="showAddCourseModal = false">✕</button>
        </div>
        <div class="modal-body" style="padding: 1.5rem;">
          <form @submit.prevent="handleSaveCourse">
            <div class="form-grid">
              <div class="form-group full-width">
                <label class="form-label">Program / Course Title <span class="req">*</span></label>
                <input type="text" v-model="newCourseForm.title" required class="form-control" placeholder="e.g. Full Stack MERN Web Engineering">
              </div>

              <div class="form-group">
                <label class="form-label">Course Code / Identifier <span class="req">*</span></label>
                <input type="text" v-model="newCourseForm.code" required class="form-control" placeholder="e.g. MERN-FULLSTACK" :disabled="isEditingCourse">
              </div>

              <div class="form-group">
                <label class="form-label">Category <span class="req">*</span></label>
                <select v-model="newCourseForm.category" class="form-control" required>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Mobile Development">Mobile App Engineering</option>
                  <option value="Artificial Intelligence">Artificial Intelligence & Data</option>
                  <option value="NIELIT Accredited">NIELIT Accredited Diploma</option>
                  <option value="University Degree">University Degree (BCA/MCA)</option>
                  <option value="Accounting & Finance">Accounting & Finance (Tally/GST)</option>
                  <option value="Govt. Certification">Govt. Certification (CCC/Basic)</option>
                  <option value="Digital Marketing">Digital Marketing & Growth</option>
                  <option value="Cybersecurity">Cybersecurity & Cloud</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Duration <span class="req">*</span></label>
                <input type="text" v-model="newCourseForm.duration" required class="form-control" placeholder="e.g. 6 Months / 1 Year">
              </div>

              <div class="form-group">
                <label class="form-label">Program Fee <span class="req">*</span></label>
                <input type="text" v-model="newCourseForm.fee" required class="form-control" placeholder="e.g. ₹25,000">
              </div>

              <div class="form-group">
                <label class="form-label">Promotional Badge</label>
                <input type="text" v-model="newCourseForm.badge" class="form-control" placeholder="e.g. Flagship Job-Ready, Popular, New">
              </div>

              <div class="form-group">
                <label class="form-label">Eligibility Criteria</label>
                <input type="text" v-model="newCourseForm.eligibility" class="form-control" placeholder="e.g. 10+2 / BCA / B.Tech / Graduate">
              </div>

              <div class="form-group full-width">
                <label class="form-label">Certification Awarded</label>
                <input type="text" v-model="newCourseForm.certificate" class="form-control" placeholder="e.g. ISO 9001:2015 Recognized Certificate & Corporate LOR">
              </div>

              <div class="form-group full-width">
                <label class="form-label">Program Description / Overview</label>
                <textarea v-model="newCourseForm.description" class="form-control" rows="3" placeholder="Brief description of the curriculum, technologies covered, and real-world outcomes..."></textarea>
              </div>
            </div>

            <div class="credentials-info-notice" style="margin-top: 1.25rem; padding: 0.85rem 1.15rem; background: rgba(56, 189, 248, 0.08); border: 1px dashed rgba(56, 189, 248, 0.35); border-radius: var(--radius-md); font-size: 0.825rem;">
              <div style="font-weight: 800; color: var(--color-ai-cyan); margin-bottom: 0.25rem;">
                🗄️ Connected to MongoDB <code>courses</code> Collection
              </div>
              <div style="color: var(--text-muted);">
                Saving this program will immediately update the database, making it available across public courses list, admission dropdown, and student portal.
              </div>
            </div>

            <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem; justify-content: flex-end;">
              <button type="button" class="btn-secondary" @click="showAddCourseModal = false">Cancel</button>
              <button type="submit" class="btn-primary">
                <span>{{ isEditingCourse ? 'Update Course in Database 💾' : 'Save Course to Database 🚀' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Admission Modal -->
    <div class="modal-overlay" v-if="showEditAdmissionModal" @click.self="showEditAdmissionModal = false">
      <div class="modal-card" style="max-width: 700px;">
        <div class="modal-header">
          <div class="modal-title"><span>✏️</span> Edit Admission Record (MongoDB)</div>
          <button class="modal-close-btn" @click="showEditAdmissionModal = false">✕</button>
        </div>
        <div class="modal-body" style="padding: 1.5rem;">
          <form @submit.prevent="handleSaveEditedAdmission">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Registration No</label>
                <input type="text" v-model="editAdmissionForm.registrationNo" disabled class="form-control" style="opacity: 0.7;">
              </div>
              <div class="form-group">
                <label class="form-label">Candidate Name <span class="req">*</span></label>
                <input type="text" v-model="editAdmissionForm.candidateName" required class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Father's Name</label>
                <input type="text" v-model="editAdmissionForm.fatherName" class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Mother's Name</label>
                <input type="text" v-model="editAdmissionForm.motherName" class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Mobile Number <span class="req">*</span></label>
                <input type="tel" v-model="editAdmissionForm.mobile" required class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Email Address <span class="req">*</span></label>
                <input type="email" v-model="editAdmissionForm.email" required class="form-control">
              </div>
              <div class="form-group full-width">
                <label class="form-label">Program / Track <span class="req">*</span></label>
                <select v-model="editAdmissionForm.course" class="form-control" required>
                  <option v-for="c in coursesList" :key="c.id || c.code" :value="c.title || c.name">
                    {{ c.title || c.name }} ({{ c.code }})
                  </option>
                  <option v-if="coursesList.length === 0" value="Web Development (MERN Stack & Cloud Architecture)">
                    Web Development (MERN Stack & Cloud Architecture)
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Admission Status</label>
                <select v-model="editAdmissionForm.status" class="form-control">
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending Verification">Pending Verification</option>
                  <option value="Verified">Verified</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Fee Status</label>
                <select v-model="editAdmissionForm.feeStatus" class="form-control">
                  <option value="Verified & Paid">Verified & Paid</option>
                  <option value="Pending Verification">Pending Verification</option>
                  <option value="Partial Payment">Partial Payment</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Amount Paid</label>
                <input type="text" v-model="editAdmissionForm.amountPaid" class="form-control" placeholder="e.g. ₹5,000">
              </div>
              <div class="form-group">
                <label class="form-label">District</label>
                <input type="text" v-model="editAdmissionForm.district" class="form-control" placeholder="e.g. Prayagraj">
              </div>
              <div class="form-group full-width">
                <label class="form-label">Residential Address</label>
                <textarea v-model="editAdmissionForm.address" rows="2" class="form-control" placeholder="Full residential street address"></textarea>
              </div>
            </div>

            <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem; justify-content: flex-end;">
              <button type="button" class="btn-secondary" @click="showEditAdmissionModal = false">Cancel</button>
              <button type="submit" class="btn-primary">
                <span>Save Changes to Database 💾</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Student Modal -->
    <div class="modal-overlay" v-if="showEditStudentModal" @click.self="showEditStudentModal = false">
      <div class="modal-card" style="max-width: 680px;">
        <div class="modal-header">
          <div class="modal-title"><span>🎓</span> Edit Student Profile (MongoDB)</div>
          <button class="modal-close-btn" @click="showEditStudentModal = false">✕</button>
        </div>
        <div class="modal-body" style="padding: 1.5rem;">
          <form @submit.prevent="handleSaveEditedStudent">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Enrollment / User ID</label>
                <input type="text" v-model="editStudentForm.enrollmentNumber" disabled class="form-control" style="opacity: 0.7;">
              </div>
              <div class="form-group">
                <label class="form-label">Full Name <span class="req">*</span></label>
                <input type="text" v-model="editStudentForm.name" required class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Mobile Number <span class="req">*</span></label>
                <input type="tel" v-model="editStudentForm.phone" required class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Email Address <span class="req">*</span></label>
                <input type="email" v-model="editStudentForm.email" required class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Course / Program</label>
                <select v-model="editStudentForm.course" class="form-control" required>
                  <option v-for="c in coursesList" :key="c.id || c.code" :value="c.title || c.name">
                    {{ c.title || c.name }} ({{ c.code }})
                  </option>
                  <option v-if="coursesList.length === 0" value="MERN Stack Developer">MERN Stack Developer</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Batch</label>
                <input type="text" v-model="editStudentForm.batch" class="form-control" placeholder="e.g. 2026">
              </div>
              <div class="form-group">
                <label class="form-label">Academic Status</label>
                <select v-model="editStudentForm.academicStatus" class="form-control">
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="PENDING_REVIEW">PENDING_REVIEW</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="SUSPENDED">SUSPENDED</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Gender</label>
                <select v-model="editStudentForm.gender" class="form-control">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">DOB</label>
                <input type="date" v-model="editStudentForm.dob" class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Guardian / Father Name</label>
                <input type="text" v-model="editStudentForm.guardianName" class="form-control">
              </div>
              <div class="form-group full-width">
                <label class="form-label">Address</label>
                <textarea v-model="editStudentForm.address" rows="2" class="form-control"></textarea>
              </div>
            </div>

            <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem; justify-content: flex-end;">
              <button type="button" class="btn-secondary" @click="showEditStudentModal = false">Cancel</button>
              <button type="submit" class="btn-primary">
                <span>Update Student Profile 💾</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add / Edit Fee Payment Modal -->
    <div class="modal-overlay" v-if="showAddFeeModal" @click.self="showAddFeeModal = false">
      <div class="modal-card" style="max-width: 650px;">
        <div class="modal-header">
          <div class="modal-title"><span>💳</span> {{ isEditingFee ? 'Edit Fee Transaction' : 'Record Fee Payment' }}</div>
          <button class="modal-close-btn" @click="showAddFeeModal = false">✕</button>
        </div>
        <div class="modal-body" style="padding: 1.5rem;">
          <form @submit.prevent="handleSaveFee">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Receipt Number <span class="req">*</span></label>
                <input type="text" v-model="feeForm.receiptNo" required class="form-control" placeholder="e.g. REC-58392" :disabled="isEditingFee">
              </div>
              <div class="form-group">
                <label class="form-label">Student Name <span class="req">*</span></label>
                <input type="text" v-model="feeForm.studentName" required class="form-control" placeholder="Candidate / Student name">
              </div>
              <div class="form-group full-width">
                <label class="form-label">Program / Course <span class="req">*</span></label>
                <select v-model="feeForm.course" class="form-control" required>
                  <option v-for="c in coursesList" :key="c.id || c.code" :value="c.title || c.name">
                    {{ c.title || c.name }}
                  </option>
                  <option v-if="coursesList.length === 0" value="Web Development (MERN Stack & Cloud Architecture)">
                    Web Development (MERN Stack & Cloud Architecture)
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Amount Paid <span class="req">*</span></label>
                <input type="text" v-model="feeForm.amount" required class="form-control" placeholder="e.g. ₹5,000">
              </div>
              <div class="form-group">
                <label class="form-label">Payment Mode</label>
                <select v-model="feeForm.paymentMode" class="form-control">
                  <option value="Online UPI">Online UPI</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque / DD">Cheque / DD</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Payment Date</label>
                <input type="text" v-model="feeForm.date" class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Status</label>
                <select v-model="feeForm.status" class="form-control">
                  <option value="Verified & Paid">Verified & Paid</option>
                  <option value="Pending Verification">Pending Verification</option>
                </select>
              </div>
            </div>

            <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem; justify-content: flex-end;">
              <button type="button" class="btn-secondary" @click="showAddFeeModal = false">Cancel</button>
              <button type="submit" class="btn-primary">
                <span>{{ isEditingFee ? 'Update Fee Record 💾' : 'Save Fee to Database 🚀' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add New NIELIT Submission Modal -->
    <div class="modal-overlay" v-if="showAddNielitModal" @click.self="showAddNielitModal = false">
      <div class="modal-card" style="max-width: 750px;">
        <div class="modal-header">
          <div class="modal-title"><span>📜</span> Register New NIELIT Project Submission</div>
          <button class="modal-close-btn" @click="showAddNielitModal = false">✕</button>
        </div>
        <div class="modal-body" style="padding: 1.5rem;">
          <form @submit.prevent="handleSaveNewNielit">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">NIELIT Registration No <span class="req">*</span></label>
                <input type="text" v-model="newNielitForm.registrationNo" required class="form-control" placeholder="e.g. NIELIT-123456">
              </div>
              <div class="form-group">
                <label class="form-label">Candidate Name <span class="req">*</span></label>
                <input type="text" v-model="newNielitForm.candidateName" required class="form-control" placeholder="Full candidate name">
              </div>
              <div class="form-group">
                <label class="form-label">Father's Name</label>
                <input type="text" v-model="newNielitForm.fatherName" class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Mobile Number <span class="req">*</span></label>
                <input type="tel" v-model="newNielitForm.mobile" required class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Email Address <span class="req">*</span></label>
                <input type="email" v-model="newNielitForm.email" required class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">NIELIT Level <span class="req">*</span></label>
                <select v-model="newNielitForm.nielitLevel" class="form-control" required>
                  <option value="O">'O' Level</option>
                  <option value="A">'A' Level</option>
                  <option value="B">'B' Level</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label class="form-label">Project Title <span class="req">*</span></label>
                <input type="text" v-model="newNielitForm.projectTitle" required class="form-control" placeholder="e.g. Full Stack MERN Web Application">
              </div>
              <div class="form-group">
                <label class="form-label">Supervisor / Guide Name</label>
                <input type="text" v-model="newNielitForm.guideName" class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Fee Paid / UTR</label>
                <input type="text" v-model="newNielitForm.utrNumber" class="form-control" placeholder="UTR Number or UPI Reference">
              </div>
            </div>

            <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem; justify-content: flex-end;">
              <button type="button" class="btn-secondary" @click="showAddNielitModal = false">Cancel</button>
              <button type="submit" class="btn-primary">
                <span>Save NIELIT Project to Database 🚀</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Quick Admission Modal -->
    <div class="modal-overlay" v-if="showQuickAdmissionModal" @click.self="showQuickAdmissionModal = false">
      <div class="modal-card" style="max-width: 650px;">
        <div class="modal-header">
          <div class="modal-title"><span>📝</span> Direct SuperAdmin Candidate Enrollment</div>
          <button class="modal-close-btn" @click="showQuickAdmissionModal = false">✕</button>
        </div>
        <div class="modal-body" style="padding: 1.5rem;">
          <form @submit.prevent="handleCreateDirectAdmission">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Candidate Name <span class="req">*</span></label>
                <input type="text" v-model="quickForm.candidateName" required class="form-control" placeholder="Full name">
              </div>
              <div class="form-group">
                <label class="form-label">Father's Name <span class="req">*</span></label>
                <input type="text" v-model="quickForm.fatherName" required class="form-control" placeholder="Father name">
              </div>
              <div class="form-group">
                <label class="form-label">Mobile Number <span class="req">*</span></label>
                <input type="tel" v-model="quickForm.mobile" required class="form-control" placeholder="10-digit mobile">
              </div>
              <div class="form-group">
                <label class="form-label">Email Address <span class="req">*</span></label>
                <input type="email" v-model="quickForm.email" required class="form-control" placeholder="email@example.com">
              </div>
              <div class="form-group full-width">
                <label class="form-label">Target Program / Track <span class="req">*</span></label>
                <select v-model="quickForm.course" class="form-control" required>
                  <option v-for="c in coursesList" :key="c.id || c.code" :value="c.title || c.name">
                    {{ c.title || c.name }} ({{ c.code }}) - {{ c.fee || '₹15,000' }}
                  </option>
                  <option v-if="coursesList.length === 0" value="Web Development (MERN Stack & Cloud Architecture)">
                    Web Development (MERN Stack & Cloud Architecture)
                  </option>
                </select>
              </div>
            </div>

            <!-- Student Login Credentials Preview -->
            <div class="credentials-info-notice" style="margin-top: 1.25rem; padding: 0.9rem 1.15rem; background: rgba(249, 115, 22, 0.09); border: 1px dashed rgba(249, 115, 22, 0.4); border-radius: var(--radius-md); font-size: 0.825rem; line-height: 1.55;">
              <div style="font-weight: 800; color: var(--color-ai-yellow); display: flex; align-items: center; gap: 0.45rem; margin-bottom: 0.35rem;">
                <span>🔑</span> Auto-Generated Student Portal Login Credentials
              </div>
              <div style="color: var(--text-muted);">
                • <strong>Student User ID:</strong> <span style="color: var(--color-ai-cyan); font-weight: 700;">{{ quickForm.email || 'Candidate Email Address' }}</span><br>
                • <strong>Default Password:</strong> <code style="color: var(--color-ai-orange); font-weight: 800; background: rgba(0,0,0,0.3); padding: 0.15rem 0.45rem; border-radius: 4px;">Ithunt@123</code><br>
                • <em>The student can log in immediately using their email & this default password, and can change it anytime from their Student Dashboard.</em>
              </div>
            </div>

            <div style="margin-top: 1.5rem;">
              <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">
                <span>Enroll & Generate Official Registration Slip 🎓</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Submitted NIELIT Project Modal -->
    <div class="modal-overlay" v-if="showEditNielitModal" @click.self="showEditNielitModal = false">
      <div class="modal-card" style="max-width: 780px;">
        <div class="modal-header">
          <div class="modal-title"><span>✏️</span> Edit Submitted Project Form Details</div>
          <button class="modal-close-btn" @click="showEditNielitModal = false">✕</button>
        </div>
        <div class="modal-body" style="padding: 1.5rem;">
          <form @submit.prevent="handleSaveEditedProject">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Candidate Name <span class="req">*</span></label>
                <input type="text" v-model="editNielitForm.candidateName" required class="form-control" placeholder="Full name">
              </div>
              <div class="form-group">
                <label class="form-label">Father's Name <span class="req">*</span></label>
                <input type="text" v-model="editNielitForm.fatherName" required class="form-control" placeholder="Father name">
              </div>
              <div class="form-group">
                <label class="form-label">Mobile Number <span class="req">*</span></label>
                <input type="tel" v-model="editNielitForm.mobile" required class="form-control" placeholder="10-digit mobile">
              </div>
              <div class="form-group">
                <label class="form-label">Email Address <span class="req">*</span></label>
                <input type="email" v-model="editNielitForm.email" required class="form-control" placeholder="email@example.com">
              </div>
              <div class="form-group">
                <label class="form-label">NIELIT Reg / Roll No <span class="req">*</span></label>
                <input type="text" v-model="editNielitForm.nielitRegNo" required class="form-control" placeholder="e.g. 1548234">
              </div>
              <div class="form-group">
                <label class="form-label">NIELIT Level <span class="req">*</span></label>
                <select v-model="editNielitForm.nielitLevel" class="form-control" required>
                  <option value="O">'O' Level</option>
                  <option value="A">'A' Level</option>
                  <option value="B">'B' Level</option>
                  <option value="C">'C' Level</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label class="form-label">Project Title <span class="req">*</span></label>
                <input type="text" v-model="editNielitForm.projectTitle" required class="form-control" placeholder="Complete project title">
              </div>
              <div class="form-group">
                <label class="form-label">Guide Name <span class="req">*</span></label>
                <input type="text" v-model="editNielitForm.guideName" required class="form-control" placeholder="Project guide name">
              </div>
              <div class="form-group">
                <label class="form-label">Guide Qualification <span class="req">*</span></label>
                <input type="text" v-model="editNielitForm.guideQualification" required class="form-control" placeholder="e.g. MCA, M.Tech">
              </div>
              <div class="form-group full-width">
                <label class="form-label">Guide Designation <span class="req">*</span></label>
                <input type="text" v-model="editNielitForm.guideDesignation" required class="form-control" placeholder="e.g. Director & Founder, IT HUNT">
              </div>
              <div class="form-group">
                <label class="form-label">Project Submission Date</label>
                <input type="date" v-model="editNielitForm.projectDate" class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Payment Date</label>
                <input type="date" v-model="editNielitForm.paymentDate" class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Fee Amount (₹) <span class="req">*</span></label>
                <input type="text" v-model="editNielitForm.amount" required class="form-control" placeholder="1000">
              </div>
              <div class="form-group">
                <label class="form-label">Transaction / UTR Number <span class="req">*</span></label>
                <input type="text" v-model="editNielitForm.utrNumber" required class="form-control" placeholder="e.g. UTR123456789">
              </div>
              <div class="form-group">
                <label class="form-label">District / City</label>
                <input type="text" v-model="editNielitForm.district" class="form-control" placeholder="Prayagraj">
              </div>
              <div class="form-group">
                <label class="form-label">Submission / Verification Status</label>
                <select v-model="editNielitForm.status" class="form-control">
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Verified & Approved">Verified & Approved</option>
                </select>
              </div>
            </div>
            <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: flex-end;">
              <button type="button" class="btn-secondary" @click="showEditNielitModal = false">
                Cancel
              </button>
              <button type="submit" class="btn-primary">
                <span>Save & Update Project Form 💾</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Student Profile Detail Modal -->
    <div class="modal-overlay" v-if="showStudentDetailModal && selectedStudentDetail" @click.self="showStudentDetailModal = false">
      <div class="modal-card" style="max-width: 640px;">
        <div class="modal-header">
          <div class="modal-title"><span>🎓</span> Student Profile & Master Academic Record</div>
          <button class="modal-close-btn" @click="showStudentDetailModal = false">✕</button>
        </div>
        <div class="modal-body" style="padding: 1.75rem;">
          <div style="display: flex; align-items: center; gap: 1.25rem; margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border-cyber);">
            <div style="width: 58px; height: 58px; border-radius: 50%; background: var(--gradient-ai-btn); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #fff; font-weight: 800; flex-shrink: 0;">
              🎓
            </div>
            <div>
              <h3 style="font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; margin-bottom: 0.2rem; color: var(--text-main);">
                {{ selectedStudentDetail.name || selectedStudentDetail.fullName || selectedStudentDetail.candidateName }}
              </h3>
              <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-ai-orange);">
                Enrollment ID: {{ selectedStudentDetail.enrollmentNumber }}
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.88rem; line-height: 1.6;">
            <div><strong style="color: var(--text-muted);">Database Record ID:</strong> <div style="font-family: var(--font-mono); font-size: 0.78rem; color: #38bdf8; word-break: break-all;">{{ selectedStudentDetail.id }}</div></div>
            <div><strong style="color: var(--text-muted);">User Account ID:</strong> <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); word-break: break-all;">{{ selectedStudentDetail.userId || selectedStudentDetail.id }}</div></div>
            <div><strong style="color: var(--text-muted);">Email Address:</strong> <div style="color: var(--text-main); font-weight: 600;">{{ selectedStudentDetail.email }}</div></div>
            <div><strong style="color: var(--text-muted);">Contact Phone:</strong> <div style="color: var(--text-main); font-family: var(--font-mono);">{{ selectedStudentDetail.phone || selectedStudentDetail.mobile }}</div></div>
            <div><strong style="color: var(--text-muted);">Enrolled Program:</strong> <div style="color: var(--text-main); font-weight: 700;">{{ selectedStudentDetail.course }}</div></div>
            <div><strong style="color: var(--text-muted);">Batch Cohort:</strong> <div><span style="padding: 0.15rem 0.5rem; border-radius: 12px; background: rgba(255,255,255,0.08); font-family: var(--font-mono); font-size: 0.75rem;">Batch {{ selectedStudentDetail.batch || '2026' }}</span></div></div>
            <div><strong style="color: var(--text-muted);">Academic Status:</strong> <div><span class="status-pill" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border-color: rgba(16, 185, 129, 0.3);">● {{ selectedStudentDetail.academicStatus || 'ACTIVE' }}</span></div></div>
            <div><strong style="color: var(--text-muted);">Gender / DOB:</strong> <div style="color: var(--text-main);">{{ selectedStudentDetail.gender }} | {{ selectedStudentDetail.dob || '—' }}</div></div>
            <div style="grid-column: span 2;"><strong style="color: var(--text-muted);">Residential Address:</strong> <div style="color: var(--text-main);">{{ selectedStudentDetail.address || 'Holagarh, Prayagraj, UP' }}</div></div>
            <div><strong style="color: var(--text-muted);">Account Created:</strong> <div style="color: var(--text-dim); font-size: 0.8rem;">{{ selectedStudentDetail.createdAt }}</div></div>
          </div>
        </div>
        <div class="modal-footer" style="padding: 1rem 1.5rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
          <button 
            type="button"
            class="btn-primary" 
            style="background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); border-color: #a855f7; color: #fff;" 
            @click="showStudentDetailModal = false; openDashboardControlModal(selectedStudentDetail)"
          >
            🎛️ Configure Dashboard
          </button>
          <button class="btn-secondary" @click="showStudentDetailModal = false">Close Profile</button>
        </div>
      </div>
    </div>

    <!-- Official Admission Email Modal (100% Clean Dispatch) -->
    <div class="modal-overlay" v-if="showAdmissionEmailModal" @click.self="showAdmissionEmailModal = false">
      <div class="modal-card" style="max-width: 640px; text-align: left;">
        <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.75rem; margin-bottom: 1rem;">
          <div>
            <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: var(--color-ai-orange);">
              ✉️ Official Admission Confirmation Dispatch
            </h3>
            <p style="margin: 0.2rem 0 0 0; font-size: 0.8rem; color: var(--text-muted);">
              Dispatch authentic admission letter from <strong>softtechithunt@gmail.com</strong> with candidate portal credentials.
            </p>
          </div>
          <button class="modal-close-btn" @click="showAdmissionEmailModal = false">✕</button>
        </div>

        <div v-if="selectedAdmissionForEmail" style="display: flex; flex-direction: column; gap: 0.85rem;">
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-cyber); border-radius: var(--radius-sm); padding: 0.85rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.85rem;">
            <div><span style="color: var(--text-muted); font-size: 0.72rem; display: block;">Candidate:</span><strong>{{ selectedAdmissionForEmail.candidateName || selectedAdmissionForEmail.fullName }}</strong></div>
            <div><span style="color: var(--text-muted); font-size: 0.72rem; display: block;">Registration No:</span><strong style="color: var(--color-ai-yellow); font-family: var(--font-mono);">{{ selectedAdmissionForEmail.registrationNo }}</strong></div>
            <div><span style="color: var(--text-muted); font-size: 0.72rem; display: block;">Student Portal User ID:</span><strong style="color: #38bdf8;">{{ selectedAdmissionForEmail.email }}</strong></div>
            <div><span style="color: var(--text-muted); font-size: 0.72rem; display: block;">Default Password:</span><strong style="color: #34d399; font-family: var(--font-mono);">Ithunt@123</strong></div>
            <div style="grid-column: 1 / -1;"><span style="color: var(--text-muted); font-size: 0.72rem; display: block;">Course:</span><strong style="color: var(--color-ai-orange);">{{ selectedAdmissionForEmail.course }}</strong></div>
          </div>

          <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255,255,255,0.06); border-radius: var(--radius-sm); padding: 0.75rem; max-height: 200px; overflow-y: auto;">
            <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.4rem;">
              Preview of Official Admission Letter
            </div>
            <pre style="margin: 0; font-family: var(--font-mono); font-size: 0.78rem; color: #cbd5e1; white-space: pre-wrap; line-height: 1.45;">{{ emailLetterPreview }}</pre>
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: flex-end; margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.08);">
          <button class="btn-primary" style="background: #ea580c; border-color: #ea580c;" @click="openDirectGmailCompose" title="Open Gmail with official letter pre-filled to send from softtechithunt@gmail.com">
            <span>🚀 Open in Gmail Web (100% Clean)</span>
          </button>
          <button class="btn-secondary" @click="openDirectMailto" title="Open in default system mail client">
            <span>📫 Open in Mail App</span>
          </button>
          <button class="btn-secondary" @click="copyLetterToClipboard">
            <span>📋 Copy Letter</span>
          </button>
          <button class="btn-secondary" @click="triggerBackgroundAdmissionEmail">
            <span>⚡ Cloud Dispatch</span>
          </button>
          <button class="btn-secondary" @click="showAdmissionEmailModal = false">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Confirmed Credentials Modal (1-Click WhatsApp, Copy & Share) -->
    <div class="modal-overlay" v-if="showConfirmedCredentialsModal && confirmedStudentData" @click.self="showConfirmedCredentialsModal = false">
      <div class="modal-card" style="max-width: 620px; text-align: left; border: 1px solid rgba(16, 185, 129, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(16, 185, 129, 0.2);">
        <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.75rem; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981 0%, #059669 100%); display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
              ✅
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: #10b981;">
                Admission Confirmed & Login Generated!
              </h3>
              <p style="margin: 0.2rem 0 0 0; font-size: 0.8rem; color: var(--text-muted);">
                Student account is active in MongoDB. Credentials ready to share with student.
              </p>
            </div>
          </div>
          <button class="modal-close-btn" @click="showConfirmedCredentialsModal = false">✕</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <!-- Student Particulars Card -->
          <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-md); padding: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.85rem;">
            <div>
              <span style="color: var(--text-muted); font-size: 0.72rem; display: block; text-transform: uppercase;">Student Name</span>
              <strong style="color: var(--text-main); font-size: 0.95rem;">{{ confirmedStudentData.candidateName || confirmedStudentData.fullName }}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); font-size: 0.72rem; display: block; text-transform: uppercase;">Registration Ref</span>
              <strong style="color: var(--color-ai-yellow); font-family: var(--font-mono);">{{ confirmedStudentData.registrationNo || confirmedStudentData.id }}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); font-size: 0.72rem; display: block; text-transform: uppercase;">Contact Mobile</span>
              <strong style="color: var(--text-main); font-family: var(--font-mono);">📞 {{ confirmedStudentData.mobile || confirmedStudentData.phone || '—' }}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); font-size: 0.72rem; display: block; text-transform: uppercase;">Email Address</span>
              <strong style="color: var(--color-ai-cyan);">✉️ {{ confirmedStudentData.email || '—' }}</strong>
            </div>
            <div style="grid-column: 1 / -1;">
              <span style="color: var(--text-muted); font-size: 0.72rem; display: block; text-transform: uppercase;">Enrolled Program</span>
              <strong style="color: var(--color-ai-orange);">🎓 {{ confirmedStudentData.course }}</strong>
            </div>
          </div>

          <!-- Credentials Highlight Box -->
          <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(56, 189, 248, 0.08) 100%); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-md); padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem;">
              <span style="font-size: 0.75rem; font-weight: 800; color: #10b981; text-transform: uppercase; letter-spacing: 0.05em;">
                🔐 OFFICIAL STUDENT PORTAL CREDENTIALS
              </span>
              <span style="font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 999px; background: rgba(16, 185, 129, 0.2); color: #10b981; font-weight: 700;">
                ● ACTIVE IN SYSTEM
              </span>
            </div>

            <!-- User ID Row -->
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 0.85rem; background: rgba(0,0,0,0.4); border-radius: var(--radius-sm); margin-bottom: 0.5rem;">
              <div>
                <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">Student User ID:</span>
                <span style="font-family: var(--font-mono); font-weight: 800; font-size: 1.05rem; color: #38bdf8;">
                  {{ confirmedStudentData.userId || confirmedStudentData.enrollmentNumber }}
                </span>
              </div>
              <button 
                class="btn-secondary" 
                style="padding: 0.3rem 0.7rem; font-size: 0.75rem;" 
                @click="copyText(confirmedStudentData.userId || confirmedStudentData.enrollmentNumber, 'User ID')"
              >
                📋 Copy ID
              </button>
            </div>

            <!-- Password Row -->
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 0.85rem; background: rgba(0,0,0,0.4); border-radius: var(--radius-sm); margin-bottom: 0.5rem;">
              <div>
                <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">Login Password:</span>
                <span style="font-family: var(--font-mono); font-weight: 800; font-size: 1.05rem; color: #34d399;">
                  {{ showModalPassword ? confirmedStudentData.password : '••••••••••••' }}
                </span>
              </div>
              <div style="display: flex; gap: 0.4rem;">
                <button 
                  class="btn-secondary" 
                  style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" 
                  @click="showModalPassword = !showModalPassword"
                >
                  {{ showModalPassword ? '🙈 Hide' : '👁️ Show' }}
                </button>
                <button 
                  class="btn-secondary" 
                  style="padding: 0.3rem 0.7rem; font-size: 0.75rem;" 
                  @click="copyText(confirmedStudentData.password, 'Password')"
                >
                  📋 Copy
                </button>
              </div>
            </div>

            <!-- Portal Login Link Row -->
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 0.85rem; background: rgba(0,0,0,0.4); border-radius: var(--radius-sm);">
              <div>
                <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">Portal Login URL:</span>
                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #cbd5e1;">
                  https://ithunt.vercel.app/#login
                </span>
              </div>
              <button 
                class="btn-secondary" 
                style="padding: 0.3rem 0.7rem; font-size: 0.75rem;" 
                @click="copyText('https://ithunt.vercel.app/#login', 'Login URL')"
              >
                📋 Copy URL
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: flex-end; margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.08);">
          <button 
            class="btn-primary" 
            style="background: #22c55e; border-color: #22c55e; font-weight: 700;" 
            @click="shareCredentialsOnWhatsApp(confirmedStudentData)"
            title="Open WhatsApp with pre-filled candidate credentials"
          >
            <span>📲 Send to WhatsApp</span>
          </button>
          <button 
            class="btn-secondary" 
            @click="openAdmissionEmailModal(confirmedStudentData)"
            title="Dispatch official admission confirmation email"
          >
            <span>✉️ Send Official Email</span>
          </button>
          <button 
            class="btn-secondary" 
            @click="copyCredentialsText(confirmedStudentData)"
          >
            <span>📋 Copy All Details</span>
          </button>
          <button 
            class="btn-secondary" 
            @click="openResetPasswordModal(confirmedStudentData)"
            title="Change or reset password"
          >
            <span>🔑 Reset Password</span>
          </button>
          <button 
            class="btn-secondary" 
            @click="showConfirmedCredentialsModal = false"
          >
            Done
          </button>
        </div>
      </div>
    </div>

    <!-- SuperAdmin Reset Password Modal -->
    <div class="modal-overlay" v-if="showResetPasswordModal && resetStudentTarget" @click.self="showResetPasswordModal = false">
      <div class="modal-card" style="max-width: 480px; text-align: left;">
        <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.75rem; margin-bottom: 1rem;">
          <div>
            <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: #f59e0b;">
              🔑 Reset Student Password
            </h3>
            <p style="margin: 0.2rem 0 0 0; font-size: 0.8rem; color: var(--text-muted);">
              Update login password for {{ resetStudentTarget.candidateName || resetStudentTarget.name || 'Student' }}
            </p>
          </div>
          <button class="modal-close-btn" @click="showResetPasswordModal = false">✕</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: rgba(15, 23, 42, 0.6); border-radius: var(--radius-sm); padding: 0.85rem; font-size: 0.85rem;">
            <div><strong style="color: var(--text-muted);">Target Student:</strong> {{ resetStudentTarget.candidateName || resetStudentTarget.name }}</div>
            <div><strong style="color: var(--text-muted);">User ID:</strong> <span style="font-family: var(--font-mono); color: #38bdf8;">{{ resetStudentTarget.userId || resetStudentTarget.enrollmentNumber || resetStudentTarget.id }}</span></div>
            <div><strong style="color: var(--text-muted);">Email:</strong> {{ resetStudentTarget.email }}</div>
          </div>

          <div class="form-group">
            <label class="form-label">New Password <span class="req">*</span></label>
            <div style="display: flex; gap: 0.5rem;">
              <input 
                type="text" 
                v-model="newPasswordInput" 
                required 
                class="form-control" 
                style="font-family: var(--font-mono); font-weight: 700; color: #10b981;"
                placeholder="Enter new password"
              >
              <button 
                type="button" 
                class="btn-secondary" 
                style="white-space: nowrap; padding: 0.5rem 0.75rem;" 
                @click="newPasswordInput = 'ITH@' + Math.floor(1000 + Math.random() * 9000)"
              >
                🎲 Random
              </button>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.08);">
          <button class="btn-secondary" @click="showResetPasswordModal = false">Cancel</button>
          <button class="btn-primary" style="background: #f59e0b; border-color: #f59e0b;" @click="handleSaveResetPassword">
            <span>Save & Apply New Password 💾</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Issue Course Certificate Modal (SuperAdmin Only) -->
    <div class="modal-overlay" v-if="showCourseCertModal" @click.self="showCourseCertModal = false">
      <div class="modal-card" style="max-width: 620px; text-align: left;">
        <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.75rem; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.5rem;">🎓</span>
            <div>
              <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: var(--color-ai-yellow);">
                Issue Course Completion Certificate
              </h3>
              <p style="margin: 0.15rem 0 0 0; font-size: 0.78rem; color: var(--text-muted);">
                Generate verifiable ISO 9001:2015 accredited course completion diploma
              </p>
            </div>
          </div>
          <button class="modal-close-btn" @click="showCourseCertModal = false">✕</button>
        </div>

        <form @submit.prevent="handleSaveCourseCert">
          <div class="admin-grid-2col" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group" style="grid-column: 1 / -1;">
              <label class="form-label">Graduate / Candidate Full Name <span class="req">*</span></label>
              <input type="text" v-model="courseCertForm.studentName" required class="form-control" placeholder="e.g. Aditya Kumar Sharma">
            </div>

            <div class="form-group" style="grid-column: 1 / -1;">
              <label class="form-label">Course / Program Completed <span class="req">*</span></label>
              <input type="text" v-model="courseCertForm.course" required class="form-control" placeholder="e.g. Full Stack MERN Stack & Cloud Engineering">
            </div>

            <div class="form-group">
              <label class="form-label">Program Duration <span class="req">*</span></label>
              <select v-model="courseCertForm.duration" class="form-control" required>
                <option value="1 Month Fast-Track">1 Month Fast-Track</option>
                <option value="3 Months Intensive">3 Months Intensive</option>
                <option value="6 Months Masterclass">6 Months Masterclass</option>
                <option value="1 Year Advanced Diploma">1 Year Advanced Diploma</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Performance / Grade Awarded <span class="req">*</span></label>
              <select v-model="courseCertForm.grade" class="form-control" required>
                <option value="Grade O (Outstanding)">Grade O (Outstanding)</option>
                <option value="Grade A+ (Distinction)">Grade A+ (Distinction)</option>
                <option value="Grade A (Excellent)">Grade A (Excellent)</option>
                <option value="Grade B+ (Good)">Grade B+ (Good)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Date of Issuance <span class="req">*</span></label>
              <input type="date" v-model="courseCertForm.issueDate" class="form-control" required>
            </div>

            <div class="form-group">
              <label class="form-label">Certificate Serial ID</label>
              <input type="text" v-model="courseCertForm.certNo" class="form-control" style="font-family: var(--font-mono); font-weight: 700; color: #fb923c;" placeholder="Auto-generated if blank">
            </div>
          </div>

          <div style="display: flex; gap: 0.6rem; justify-content: flex-end; margin-top: 1.5rem; padding-top: 0.85rem; border-top: 1px solid rgba(255,255,255,0.08);">
            <button type="button" class="btn-secondary" @click="showCourseCertModal = false">Cancel</button>
            <button type="submit" class="btn-primary" style="background: linear-gradient(135deg, #ea580c, #f97316); border-color: #ea580c;">
              <span>Generate & Register Certificate 🎓</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Issue Experience Certificate Modal (SuperAdmin Only) -->
    <div class="modal-overlay" v-if="showExpCertModal" @click.self="showExpCertModal = false">
      <div class="modal-card" style="max-width: 680px; text-align: left;">
        <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.75rem; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.5rem;">💼</span>
            <div>
              <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: #10b981;">
                Issue Experience & Internship Certificate
              </h3>
              <p style="margin: 0.15rem 0 0 0; font-size: 0.78rem; color: var(--text-muted);">
                Generate official IT HUNT corporate work experience letter on company letterhead
              </p>
            </div>
          </div>
          <button class="modal-close-btn" @click="showExpCertModal = false">✕</button>
        </div>

        <form @submit.prevent="handleSaveExpCert">
          <div class="admin-grid-2col" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group" style="grid-column: 1 / -1;">
              <label class="form-label">Candidate / Engineer Name <span class="req">*</span></label>
              <input type="text" v-model="expCertForm.studentName" required class="form-control" placeholder="e.g. Anup Mishra">
            </div>

            <div class="form-group">
              <label class="form-label">Designation / Role <span class="req">*</span></label>
              <input type="text" v-model="expCertForm.role" required class="form-control" placeholder="e.g. Full Stack Developer Intern">
            </div>

            <div class="form-group">
              <label class="form-label">Department <span class="req">*</span></label>
              <input type="text" v-model="expCertForm.department" required class="form-control" placeholder="e.g. Software Solutions & Cloud Architecture">
            </div>

            <div class="form-group">
              <label class="form-label">Tenure Duration <span class="req">*</span></label>
              <select v-model="expCertForm.duration" class="form-control" required>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="9 Months">9 Months</option>
                <option value="1 Year">1 Year</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Performance Appraisal <span class="req">*</span></label>
              <select v-model="expCertForm.performance" class="form-control" required>
                <option value="Outstanding and Highly Commended">Outstanding and Highly Commended</option>
                <option value="Excellent and Commendable">Excellent and Commendable</option>
                <option value="Very Good and Dedicated">Very Good and Dedicated</option>
                <option value="Good and Satisfactory">Good and Satisfactory</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Start Date <span class="req">*</span></label>
              <input type="date" v-model="expCertForm.startDate" class="form-control" required>
            </div>

            <div class="form-group">
              <label class="form-label">End Date <span class="req">*</span></label>
              <input type="date" v-model="expCertForm.endDate" class="form-control" required>
            </div>

            <div class="form-group" style="grid-column: 1 / -1;">
              <label class="form-label">Tech Stack & Projects Mastered <span class="req">*</span></label>
              <input type="text" v-model="expCertForm.technologies" required class="form-control" placeholder="e.g. React.js, Node.js, Express, MongoDB, REST APIs, Git & Cloud Hosting">
            </div>

            <div class="form-group">
              <label class="form-label">Date of Issuance <span class="req">*</span></label>
              <input type="date" v-model="expCertForm.issueDate" class="form-control" required>
            </div>

            <div class="form-group">
              <label class="form-label">Reference / Certificate ID</label>
              <input type="text" v-model="expCertForm.certNo" class="form-control" style="font-family: var(--font-mono); font-weight: 700; color: #34d399;" placeholder="Auto-generated if blank">
            </div>
          </div>

          <div style="display: flex; gap: 0.6rem; justify-content: flex-end; margin-top: 1.5rem; padding-top: 0.85rem; border-top: 1px solid rgba(255,255,255,0.08);">
            <button type="button" class="btn-secondary" @click="showExpCertModal = false">Cancel</button>
            <button type="submit" class="btn-primary" style="background: linear-gradient(135deg, #10b981, #059669); border-color: #10b981;">
              <span>Generate Experience Letter 💼</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Official Certificate Interactive Preview Modal -->
    <CertificatePreviewModal 
      v-if="showCertPreviewModal && selectedCertForPreview"
      :certData="selectedCertForPreview"
      @close="showCertPreviewModal = false"
    />

    <!-- Student Dashboard Control Center Modal (SuperAdmin Full Control) -->
    <div class="modal-overlay" v-if="showDashboardControlModal && selectedStudentControl" @click.self="showDashboardControlModal = false">
      <div class="modal-card control-center-modal" style="max-width: 860px; max-height: 90vh; display: flex; flex-direction: column; padding: 0; overflow: hidden; text-align: left;">
        
        <!-- Modal Sticky Header -->
        <div class="modal-header" style="padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(15, 23, 42, 0.95); display: flex; justify-content: space-between; align-items: center; z-index: 10;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; box-shadow: 0 4px 14px rgba(168, 85, 247, 0.35);">
              🎛️
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.2rem; font-weight: 800; color: #f3e8ff;">
                Student Dashboard Control Center
              </h3>
              <p style="margin: 0.15rem 0 0 0; font-size: 0.78rem; color: var(--text-muted);">
                Fully customize what this student sees, access permissions, notices & academic indicators
              </p>
            </div>
          </div>
          <button class="modal-close-btn" @click="showDashboardControlModal = false">✕</button>
        </div>

        <!-- Student Quick Identity Banner -->
        <div style="padding: 0.85rem 1.5rem; background: rgba(168, 85, 247, 0.08); border-bottom: 1px solid rgba(168, 85, 247, 0.2); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <span style="font-size: 0.72rem; color: #c084fc; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">TARGET STUDENT</span>
            <div style="font-weight: 800; font-size: 1rem; color: var(--text-main);">
              {{ selectedStudentControl.name || selectedStudentControl.candidateName || selectedStudentControl.fullName }}
              <span style="font-size: 0.78rem; font-weight: 600; color: var(--color-ai-orange); margin-left: 0.5rem; font-family: var(--font-mono);">
                [{{ selectedStudentControl.enrollmentNumber || selectedStudentControl.registrationNo || selectedStudentControl.id }}]
              </span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 0.78rem; color: var(--text-muted);">Current Status:</span>
            <span 
              class="status-pill"
              :style="{
                background: dashboardControlForm.accountStatus === 'ACTIVE' ? 'rgba(16, 185, 129, 0.15)' : dashboardControlForm.accountStatus === 'ON_HOLD' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: dashboardControlForm.accountStatus === 'ACTIVE' ? '#10b981' : dashboardControlForm.accountStatus === 'ON_HOLD' ? '#f59e0b' : '#ef4444',
                borderColor: dashboardControlForm.accountStatus === 'ACTIVE' ? 'rgba(16, 185, 129, 0.3)' : dashboardControlForm.accountStatus === 'ON_HOLD' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                fontWeight: '700'
              }"
            >
              ● {{ dashboardControlForm.accountStatus }}
            </span>
          </div>
        </div>

        <!-- Quick Presets Toolbar -->
        <div style="padding: 0.75rem 1.5rem; background: rgba(0,0,0,0.25); border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">⚡ Quick Presets:</span>
          <button type="button" class="preset-badge-btn" @click="applyDashboardPreset('all')">✨ Enable Everything</button>
          <button type="button" class="preset-badge-btn" @click="applyDashboardPreset('minimal')">📄 Minimal (Overview + Syllabus)</button>
          <button type="button" class="preset-badge-btn" @click="applyDashboardPreset('exam')">🏆 Exam Season</button>
          <button type="button" class="preset-badge-btn" @click="applyDashboardPreset('cert')">🏅 Certificate Ready</button>
          <button type="button" class="preset-badge-btn" @click="applyDashboardPreset('hold')">⏸️ Restrict & Place on Hold</button>
        </div>

        <!-- Scrollable Modal Body -->
        <div class="modal-body" style="padding: 1.5rem; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- SECTION 1: TAB & FEATURE VISIBILITY -->
          <div class="control-card-section">
            <div class="section-badge-title">
              <span>👁️</span> 1. Student Dashboard Tabs & Features Visibility
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
              Turn tabs and portal capabilities ON or OFF for this specific student in real-time.
            </p>

            <div class="toggle-cards-grid">
              <!-- Tab: Overview -->
              <label class="toggle-card" :class="{ 'is-active': dashboardControlForm.visibleTabs.overview }">
                <div class="toggle-card-info">
                  <div class="toggle-card-title">
                    <span>📊</span> Main Overview Tab
                  </div>
                  <div class="toggle-card-desc">Executive KPIs, summary cards & quick timetable</div>
                </div>
                <input type="checkbox" v-model="dashboardControlForm.visibleTabs.overview" class="custom-switch-input">
              </label>

              <!-- Tab: Certificates & QR -->
              <label class="toggle-card" :class="{ 'is-active': dashboardControlForm.visibleTabs.certificates }">
                <div class="toggle-card-info">
                  <div class="toggle-card-title">
                    <span>🏅</span> Certificates & QR Verification
                  </div>
                  <div class="toggle-card-desc">Verified diplomas, QR code scanner & verification portal</div>
                </div>
                <input type="checkbox" v-model="dashboardControlForm.visibleTabs.certificates" class="custom-switch-input">
              </label>

              <!-- Tab: Exam Scoreboard -->
              <label class="toggle-card" :class="{ 'is-active': dashboardControlForm.visibleTabs.examScores }">
                <div class="toggle-card-info">
                  <div class="toggle-card-title">
                    <span>🏆</span> Exam Results & Scoreboard
                  </div>
                  <div class="toggle-card-desc">Mid-term/final tests, subject marks & batch rank</div>
                </div>
                <input type="checkbox" v-model="dashboardControlForm.visibleTabs.examScores" class="custom-switch-input">
              </label>

              <!-- Tab: Attendance Register -->
              <label class="toggle-card" :class="{ 'is-active': dashboardControlForm.visibleTabs.attendance }">
                <div class="toggle-card-info">
                  <div class="toggle-card-title">
                    <span>📋</span> Attendance Sheet & Register
                  </div>
                  <div class="toggle-card-desc">Daily check-ins, monthly attendance % and leave tracker</div>
                </div>
                <input type="checkbox" v-model="dashboardControlForm.visibleTabs.attendance" class="custom-switch-input">
              </label>

              <!-- Tab: Course Syllabus -->
              <label class="toggle-card" :class="{ 'is-active': dashboardControlForm.visibleTabs.syllabus }">
                <div class="toggle-card-info">
                  <div class="toggle-card-title">
                    <span>📚</span> Course Syllabus & Modules
                  </div>
                  <div class="toggle-card-desc">Modular milestones, lab curriculum and course progress</div>
                </div>
                <input type="checkbox" v-model="dashboardControlForm.visibleTabs.syllabus" class="custom-switch-input">
              </label>

              <!-- Tab: Public Holidays -->
              <label class="toggle-card" :class="{ 'is-active': dashboardControlForm.visibleTabs.holidays }">
                <div class="toggle-card-info">
                  <div class="toggle-card-title">
                    <span>📅</span> Public Holidays Calendar
                  </div>
                  <div class="toggle-card-desc">2026 academic holidays, festival dates & institute leaves</div>
                </div>
                <input type="checkbox" v-model="dashboardControlForm.visibleTabs.holidays" class="custom-switch-input">
              </label>

              <!-- Feature: Virtual Student ID Card -->
              <label class="toggle-card" :class="{ 'is-active': dashboardControlForm.visibleTabs.idCard }">
                <div class="toggle-card-info">
                  <div class="toggle-card-title">
                    <span>🪪</span> Virtual Student ID Card
                  </div>
                  <div class="toggle-card-desc">Digital badge modal, institute QR code & download button</div>
                </div>
                <input type="checkbox" v-model="dashboardControlForm.visibleTabs.idCard" class="custom-switch-input">
              </label>
            </div>
          </div>

          <!-- SECTION 2: PERSONAL ANNOUNCEMENT / NOTICE BANNER -->
          <div class="control-card-section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div class="section-badge-title">
                <span>📢</span> 2. Personal Student Alert / Notice Banner
              </div>
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.82rem; font-weight: 700; color: #38bdf8;">
                <input type="checkbox" v-model="dashboardControlForm.noticeBanner.enabled">
                <span>Display Banner on Student's Dashboard</span>
              </label>
            </div>
            
            <div v-if="dashboardControlForm.noticeBanner.enabled" style="display: flex; flex-direction: column; gap: 0.85rem; padding-top: 0.5rem;">
              <div class="admin-grid-2col" style="grid-template-columns: 180px 1fr; gap: 0.85rem;">
                <div class="form-group">
                  <label class="form-label">Banner Tone / Type</label>
                  <select v-model="dashboardControlForm.noticeBanner.type" class="form-control">
                    <option value="info">ℹ️ Info (Blue)</option>
                    <option value="warning">⚠️ Warning (Amber)</option>
                    <option value="urgent">🚨 Urgent (Red)</option>
                    <option value="success">✅ Announcement (Green)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Banner Title</label>
                  <input type="text" v-model="dashboardControlForm.noticeBanner.title" class="form-control" placeholder="e.g. Action Required: Fee Due Notice">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Banner Message</label>
                <textarea v-model="dashboardControlForm.noticeBanner.message" rows="2" class="form-control" placeholder="Write custom instructions or administrative note for this student..."></textarea>
              </div>

              <!-- Live Banner Preview -->
              <div v-if="dashboardControlForm.noticeBanner.message" style="padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.82rem;" :style="{
                background: dashboardControlForm.noticeBanner.type === 'urgent' ? 'rgba(239, 68, 68, 0.15)' : dashboardControlForm.noticeBanner.type === 'warning' ? 'rgba(245, 158, 11, 0.15)' : dashboardControlForm.noticeBanner.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                border: '1px solid ' + (dashboardControlForm.noticeBanner.type === 'urgent' ? 'rgba(239, 68, 68, 0.4)' : dashboardControlForm.noticeBanner.type === 'warning' ? 'rgba(245, 158, 11, 0.4)' : dashboardControlForm.noticeBanner.type === 'success' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(56, 189, 248, 0.4)')
              }">
                <div style="font-weight: 700; margin-bottom: 0.2rem; color: #fff;">
                  Preview: {{ dashboardControlForm.noticeBanner.title || 'Administrative Notice' }}
                </div>
                <div style="color: var(--text-main);">{{ dashboardControlForm.noticeBanner.message }}</div>
              </div>
            </div>
            <div v-else style="font-size: 0.8rem; color: var(--text-dim); font-style: italic;">
              Banner is disabled. No announcement will be displayed on this student's portal.
            </div>
          </div>

          <!-- SECTION 3: ACADEMIC METRICS & PERFORMANCE OVERRIDES -->
          <div class="control-card-section">
            <div class="section-badge-title">
              <span>📊</span> 3. Academic Metrics & Performance Display
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.85rem;">
              Override or fine-tune the key academic metrics shown on the student's overview and cards.
            </p>

            <div class="admin-grid-2col" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.85rem;">
              <div class="form-group">
                <label class="form-label">Overall Attendance %</label>
                <input type="text" v-model="dashboardControlForm.academicMetrics.attendanceRate" class="form-control" placeholder="e.g. 94%">
              </div>
              <div class="form-group">
                <label class="form-label">Latest Exam Score</label>
                <input type="text" v-model="dashboardControlForm.academicMetrics.examScore" class="form-control" placeholder="e.g. 94 / 100">
              </div>
              <div class="form-group">
                <label class="form-label">Batch Rank</label>
                <input type="text" v-model="dashboardControlForm.academicMetrics.batchRank" class="form-control" placeholder="e.g. Rank #3">
              </div>
              <div class="form-group">
                <label class="form-label">Academic Grade</label>
                <input type="text" v-model="dashboardControlForm.academicMetrics.grade" class="form-control" placeholder="e.g. Grade A+ (Distinction)">
              </div>
              <div class="form-group">
                <label class="form-label">Course Progress % ({{ dashboardControlForm.academicMetrics.courseProgress }}%)</label>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <input type="range" min="0" max="100" v-model.number="dashboardControlForm.academicMetrics.courseProgress" style="flex: 1;">
                  <input type="number" min="0" max="100" v-model.number="dashboardControlForm.academicMetrics.courseProgress" class="form-control" style="width: 70px;">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Assigned Lab PC / Station</label>
                <input type="text" v-model="dashboardControlForm.academicMetrics.labPcNumber" class="form-control" placeholder="e.g. Workstation #04 (Lab A)">
              </div>
              <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Batch Schedule / Class Timing</label>
                <input type="text" v-model="dashboardControlForm.academicMetrics.batchTiming" class="form-control" placeholder="e.g. Morning 10:00 AM - 01:00 PM (Mon - Fri)">
              </div>
            </div>
          </div>

          <!-- SECTION 4: FEE LEDGER & FINANCIAL OVERRIDES -->
          <div class="control-card-section">
            <div class="section-badge-title">
              <span>💳</span> 4. Fee Ledger & Payment Status Overrides
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.85rem;">
              Set the exact financial standing and installment ledger visible on the student's portal.
            </p>

            <div class="admin-grid-2col" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.85rem;">
              <div class="form-group">
                <label class="form-label">Fee Status</label>
                <select v-model="dashboardControlForm.feeLedger.feeStatus" class="form-control">
                  <option value="Verified & Paid">Verified & Paid (100% Cleared)</option>
                  <option value="Pending Verification">Pending Verification</option>
                  <option value="Partial Payment">Partial Payment (Balance Due)</option>
                  <option value="Overdue">Overdue / Action Needed</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Total Course Fee</label>
                <input type="text" v-model="dashboardControlForm.feeLedger.totalFee" class="form-control" placeholder="e.g. ₹15,000">
              </div>
              <div class="form-group">
                <label class="form-label">Amount Paid</label>
                <input type="text" v-model="dashboardControlForm.feeLedger.feePaid" class="form-control" placeholder="e.g. ₹15,000">
              </div>
              <div class="form-group">
                <label class="form-label">Balance Remaining</label>
                <input type="text" v-model="dashboardControlForm.feeLedger.feePending" class="form-control" placeholder="e.g. ₹0">
              </div>
              <div class="form-group">
                <label class="form-label">Next Due Date (if pending)</label>
                <input type="date" v-model="dashboardControlForm.feeLedger.nextDueDate" class="form-control">
              </div>
            </div>
          </div>

          <!-- SECTION 5: ACCOUNT ACCESS STATUS -->
          <div class="control-card-section">
            <div class="section-badge-title">
              <span>🔒</span> 5. Account Access & Suspension Controls
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.85rem;">
              Control whether this student can access their dashboard normally, or see a hold/suspension notice.
            </p>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
              <label class="status-radio-card" :class="{ 'is-selected': dashboardControlForm.accountStatus === 'ACTIVE' }">
                <input type="radio" value="ACTIVE" v-model="dashboardControlForm.accountStatus" style="display: none;">
                <div style="font-size: 1.1rem;">🟢</div>
                <div>
                  <div style="font-weight: 700; color: #10b981;">ACTIVE</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Normal dashboard access</div>
                </div>
              </label>

              <label class="status-radio-card" :class="{ 'is-selected': dashboardControlForm.accountStatus === 'ON_HOLD' }">
                <input type="radio" value="ON_HOLD" v-model="dashboardControlForm.accountStatus" style="display: none;">
                <div style="font-size: 1.1rem;">🟡</div>
                <div>
                  <div style="font-weight: 700; color: #f59e0b;">ON HOLD</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Portal temporarily restricted</div>
                </div>
              </label>

              <label class="status-radio-card" :class="{ 'is-selected': dashboardControlForm.accountStatus === 'SUSPENDED' }">
                <input type="radio" value="SUSPENDED" v-model="dashboardControlForm.accountStatus" style="display: none;">
                <div style="font-size: 1.1rem;">🔴</div>
                <div>
                  <div style="font-weight: 700; color: #ef4444;">SUSPENDED</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Access fully revoked</div>
                </div>
              </label>
            </div>

            <div v-if="dashboardControlForm.accountStatus !== 'ACTIVE'" class="form-group" style="margin-top: 0.5rem;">
              <label class="form-label" style="color: #f59e0b;">Hold / Suspension Reason (Shown to Student)</label>
              <textarea v-model="dashboardControlForm.holdReason" rows="2" class="form-control" placeholder="e.g. Your portal access is temporarily on hold due to pending fee verification. Please visit the admin office."></textarea>
            </div>
          </div>

        </div>

        <!-- Sticky Footer with Save Action -->
        <div class="modal-footer" style="padding: 1rem 1.5rem; background: rgba(15, 23, 42, 0.95); border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div style="font-size: 0.85rem;">
            <span v-if="controlSaveMsg" :style="{ color: controlSaveMsg.includes('✓') ? '#34d399' : '#f59e0b', fontWeight: '700' }">
              {{ controlSaveMsg }}
            </span>
          </div>
          <div style="display: flex; gap: 0.6rem;">
            <button type="button" class="btn-secondary" @click="showDashboardControlModal = false" :disabled="isSavingControls">
              Cancel
            </button>
            <button 
              type="button" 
              class="btn-primary" 
              style="background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); border-color: #a855f7; color: #fff; font-weight: 800; box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);"
              @click="saveDashboardControls" 
              :disabled="isSavingControls"
            >
              <span v-if="isSavingControls">Saving... ⏳</span>
              <span v-else>Save & Apply Live to Student Dashboard 💾</span>
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Add / Edit Internship Application Modal -->
    <div class="modal-overlay" v-if="showAddInternshipModal" @click.self="showAddInternshipModal = false">
      <div class="modal-card" style="max-width: 650px;">
        <div class="modal-header">
          <div class="modal-title">
            <span>🚀</span> {{ isEditingInternship ? 'Edit Internship Applicant' : 'Register New Internship Applicant' }}
          </div>
          <button class="modal-close-btn" @click="showAddInternshipModal = false">✕</button>
        </div>
        <div class="modal-body" style="padding: 1.5rem;">
          <form @submit.prevent="handleSaveInternship">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Applicant Full Name <span class="req">*</span></label>
                <input type="text" v-model="internshipForm.name" required class="form-control" placeholder="Candidate Name">
              </div>
              <div class="form-group">
                <label class="form-label">Email Address <span class="req">*</span></label>
                <input type="email" v-model="internshipForm.email" required class="form-control" placeholder="candidate@email.com">
              </div>
              <div class="form-group">
                <label class="form-label">Mobile Number</label>
                <input type="tel" v-model="internshipForm.phone" class="form-control" placeholder="10-digit phone">
              </div>
              <div class="form-group">
                <label class="form-label">Target Domain / Track <span class="req">*</span></label>
                <select v-model="internshipForm.track" class="form-control" required>
                  <option value="Full Stack Web Development (MERN)">Full Stack Web Development (MERN)</option>
                  <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                  <option value="AI / ML Engineering & Data Science">AI / ML Engineering & Data Science</option>
                  <option value="Mobile Application Development (Flutter/iOS)">Mobile Application Development (Flutter/iOS)</option>
                  <option value="Cyber Security & Ethical Hacking">Cyber Security & Ethical Hacking</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Duration</label>
                <select v-model="internshipForm.duration" class="form-control">
                  <option value="6 Months">6 Months Industry Internship</option>
                  <option value="3 Months">3 Months Fast-Track</option>
                  <option value="1 Year">1 Year Apprenticeship</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Mode</label>
                <select v-model="internshipForm.mode" class="form-control">
                  <option value="Offline Studio / Hybrid">Offline Studio / Hybrid (Prayagraj)</option>
                  <option value="Remote / Virtual">Remote / Virtual</option>
                  <option value="Full-Time On-Premise">Full-Time On-Premise</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">College / Institute</label>
                <input type="text" v-model="internshipForm.college" class="form-control" placeholder="e.g. United College of Engg">
              </div>
              <div class="form-group">
                <label class="form-label">Branch / Specialization</label>
                <input type="text" v-model="internshipForm.branch" class="form-control" placeholder="e.g. Computer Science (B.Tech / BCA)">
              </div>
              <div class="form-group full-width">
                <label class="form-label">Application Status</label>
                <select v-model="internshipForm.status" class="form-control">
                  <option value="Confirmed">Confirmed & Active Intern</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted for Interview</option>
                  <option value="Completed">Internship Completed</option>
                </select>
              </div>
            </div>
            <div class="modal-footer-actions" style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
              <button type="button" class="btn-secondary" @click="showAddInternshipModal = false">Cancel</button>
              <button type="submit" class="btn-primary" style="background: linear-gradient(135deg, #06b6d4, #0284c7); border-color: #06b6d4;">
                <span>{{ isEditingInternship ? 'Update Internship Record' : 'Save to MongoDB Atlas' }} 💾</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add / Edit Event Modal -->
    <div class="modal-overlay" v-if="showAddEventModal" @click.self="showAddEventModal = false">
      <div class="modal-card" style="max-width: 650px;">
        <div class="modal-header">
          <div class="modal-title">
            <span>🎪</span> {{ isEditingEvent ? 'Edit Scheduled Campus Event' : 'Schedule New Campus Event' }}
          </div>
          <button class="modal-close-btn" @click="showAddEventModal = false">✕</button>
        </div>
        <div class="modal-body" style="padding: 1.5rem;">
          <form @submit.prevent="handleSaveEvent">
            <div class="form-grid">
              <div class="form-group full-width">
                <label class="form-label">Event Title <span class="req">*</span></label>
                <input type="text" v-model="eventForm.title" required class="form-control" placeholder="e.g. National Hackathon 2026">
              </div>
              <div class="form-group">
                <label class="form-label">Category</label>
                <select v-model="eventForm.category" class="form-control">
                  <option value="Hackathon">Hackathon</option>
                  <option value="Workshop">Hands-on Workshop</option>
                  <option value="Tech Summit">Tech Summit / Conference</option>
                  <option value="Convocation">Convocation / Award Ceremony</option>
                  <option value="Webinar">Live Masterclass / Webinar</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Date <span class="req">*</span></label>
                <input type="text" v-model="eventForm.date" required class="form-control" placeholder="e.g. 25 Oct 2026 or DD-MM-YYYY">
              </div>
              <div class="form-group">
                <label class="form-label">Time</label>
                <input type="text" v-model="eventForm.time" class="form-control" placeholder="e.g. 10:00 AM - 04:00 PM">
              </div>
              <div class="form-group">
                <label class="form-label">Expected Capacity</label>
                <input type="number" v-model="eventForm.capacity" class="form-control" placeholder="e.g. 150">
              </div>
              <div class="form-group full-width">
                <label class="form-label">Venue / Location</label>
                <input type="text" v-model="eventForm.location" class="form-control" placeholder="e.g. IT HUNT Main Auditorium & Studio, Prayagraj">
              </div>
              <div class="form-group">
                <label class="form-label">Keynote Speaker / Mentor</label>
                <input type="text" v-model="eventForm.speaker" class="form-control" placeholder="e.g. Mr. Lakshman Singh Chauhan">
              </div>
              <div class="form-group">
                <label class="form-label">Status</label>
                <select v-model="eventForm.status" class="form-control">
                  <option value="Upcoming">Upcoming</option>
                  <option value="Registration Open">Registration Open</option>
                  <option value="Live Now">Live Now</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label class="form-label">Tags (comma-separated)</label>
                <input type="text" v-model="eventForm.tags" class="form-control" placeholder="AI, Cloud, MERN Stack, Flutter">
              </div>
              <div class="form-group full-width">
                <label class="form-label">Brief Description</label>
                <textarea v-model="eventForm.description" rows="2" class="form-control" placeholder="Event overview, objectives, and eligibility..."></textarea>
              </div>
            </div>
            <div class="modal-footer-actions" style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
              <button type="button" class="btn-secondary" @click="showAddEventModal = false">Cancel</button>
              <button type="submit" class="btn-primary" style="background: linear-gradient(135deg, #f59e0b, #d97706); border-color: #f59e0b;">
                <span>{{ isEditingEvent ? 'Update Event Record' : 'Save Event to MongoDB Atlas' }} 💾</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add / Edit Capstone Project Modal -->
    <div class="modal-overlay" v-if="showAddProjectModal" @click.self="showAddProjectModal = false">
      <div class="modal-card" style="max-width: 650px;">
        <div class="modal-header">
          <div class="modal-title">
            <span>💻</span> {{ isEditingProject ? 'Edit Capstone Project' : 'Add New Capstone Project' }}
          </div>
          <button class="modal-close-btn" @click="showAddProjectModal = false">✕</button>
        </div>
        <div class="modal-body" style="padding: 1.5rem;">
          <form @submit.prevent="handleSaveProject">
            <div class="form-grid">
              <div class="form-group full-width">
                <label class="form-label">Project Title <span class="req">*</span></label>
                <input type="text" v-model="projectForm.title" required class="form-control" placeholder="e.g. AI-Powered Healthcare Diagnostic Portal">
              </div>
              <div class="form-group">
                <label class="form-label">Developer / Student Name <span class="req">*</span></label>
                <input type="text" v-model="projectForm.studentName" required class="form-control" placeholder="e.g. Aditya Verma">
              </div>
              <div class="form-group">
                <label class="form-label">Tech Stack</label>
                <input type="text" v-model="projectForm.techStack" class="form-control" placeholder="e.g. React, Node.js, Express, MongoDB">
              </div>
              <div class="form-group">
                <label class="form-label">GitHub Repository URL</label>
                <input type="url" v-model="projectForm.repoUrl" class="form-control" placeholder="https://github.com/...">
              </div>
              <div class="form-group">
                <label class="form-label">Live Hosted Demo URL</label>
                <input type="url" v-model="projectForm.liveUrl" class="form-control" placeholder="https://...">
              </div>
              <div class="form-group full-width">
                <label class="form-label">Deployment Status</label>
                <select v-model="projectForm.status" class="form-control">
                  <option value="Completed & Deployed">Completed & Deployed</option>
                  <option value="In Progress">In Progress (Beta)</option>
                  <option value="Submitted for Review">Submitted for Review</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label class="form-label">Project Summary</label>
                <textarea v-model="projectForm.description" rows="2" class="form-control" placeholder="Brief description of key features and architecture..."></textarea>
              </div>
            </div>
            <div class="modal-footer-actions" style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
              <button type="button" class="btn-secondary" @click="showAddProjectModal = false">Cancel</button>
              <button type="submit" class="btn-primary" style="background: linear-gradient(135deg, #10b981, #059669); border-color: #10b981;">
                <span>{{ isEditingProject ? 'Update Project' : 'Save Project to MongoDB Atlas' }} 💾</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add Student Review Modal -->
    <div class="modal-overlay" v-if="showAddReviewModal" @click.self="showAddReviewModal = false">
      <div class="modal-card" style="max-width: 550px;">
        <div class="modal-header">
          <div class="modal-title">
            <span>⭐</span> Add Student Review & Testimonial
          </div>
          <button class="modal-close-btn" @click="showAddReviewModal = false">✕</button>
        </div>
        <div class="modal-body" style="padding: 1.5rem;">
          <form @submit.prevent="handleSaveReview">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Student Name <span class="req">*</span></label>
                <input type="text" v-model="reviewForm.name" required class="form-control" placeholder="Full name">
              </div>
              <div class="form-group">
                <label class="form-label">Role / Batch / Course</label>
                <input type="text" v-model="reviewForm.role" class="form-control" placeholder="e.g. MERN Stack Graduate, Batch 2026">
              </div>
              <div class="form-group full-width">
                <label class="form-label">Star Rating</label>
                <select v-model="reviewForm.rating" class="form-control">
                  <option :value="5">⭐⭐⭐⭐⭐ 5 Stars (Excellent)</option>
                  <option :value="4">⭐⭐⭐⭐ 4 Stars (Very Good)</option>
                  <option :value="3">⭐⭐⭐ 3 Stars (Good)</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label class="form-label">Review Comment & Testimonial <span class="req">*</span></label>
                <textarea v-model="reviewForm.comment" rows="3" required class="form-control" placeholder="Enter student's experience, learning outcomes, lab feedback..."></textarea>
              </div>
            </div>
            <div class="modal-footer-actions" style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
              <button type="button" class="btn-secondary" @click="showAddReviewModal = false">Cancel</button>
              <button type="submit" class="btn-primary" style="background: linear-gradient(135deg, #eab308, #ca8a04); border-color: #eab308; color: #000; font-weight: 800;">
                <span>Save Review to MongoDB Atlas 💾</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
      </div> <!-- /.admin-canvas-content -->
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { 
  sendStudentAdmissionEmail, 
  sendFeeReceiptJpgEmail,
  getStudentAdmissionGmailUrl,
  getStudentAdmissionMailtoUrl,
  getStudentAdmissionEmailContent,
  getStudentAdmissionWhatsAppUrl
} from '../../utils/emailNotifier.js';
import { generateFeeReceiptJpgBlob } from '../../utils/jpgReceiptGenerator.js';
import { 
  API, 
  fetchAdmissionsFromBackend,
  fetchStudentsFromBackend,
  fetchUsersFromBackend,
  fetchCoursesFromBackend,
  fetchNielitProjectsFromBackend,
  fetchFeesFromBackend,
  fetchCertificatesFromBackend,
  fetchProjectsFromBackend,
  fetchContactInquiriesFromBackend,
  fetchReviewsFromBackend,
  fetchJobApplicationsFromBackend,
  fetchRsvpsFromBackend,
  confirmAdmissionInBackend,
  resetStudentPasswordInBackend,
  deleteAdmissionFromBackend, 
  updateAdmissionInBackend,
  deleteStudentFromBackend,
  updateStudentInBackend,
  deleteUserFromBackend, 
  updateNielitProjectInBackend, 
  deleteNielitProjectFromBackend, 
  deleteProject,
  deleteJobApplicationFromBackend,
  deleteRsvpFromBackend,
  deleteReviewFromBackend,
  saveFeeToBackend,
  updateFeeInBackend,
  deleteFeeFromBackend,
  deleteContactInquiryFromBackend,
  saveNielitProjectRecord,
  fetchInternshipsFromBackend,
  fetchEventsCatalogFromBackend,
  saveInternshipToBackend,
  updateInternshipInBackend,
  deleteInternshipFromBackend,
  saveEventToBackend,
  updateEventInBackend,
  deleteEventFromBackend,
  saveProjectToBackend,
  updateProjectInBackend,
  deleteProjectFromBackend,
  saveReviewToBackend
} from '../../utils/apiClient.js';
import CertificatePreviewModal from '../modals/CertificatePreviewModal.vue';
import { 
  generateCourseCertificatePdf, 
  generateExperienceCertificatePdf 
} from '../../utils/certificatePdfGenerator.js';

const props = defineProps({
  content: {
    type: Object,
    required: true
  },
  adminUser: {
    type: Object,
    default: () => ({
      name: 'Mr. Lakshman Singh Chauhan',
      role: 'Director & Chief Administrator',
      email: 'admin@ithunt.com',
      avatar: 'img/ithunt.webp'
    })
  },
  allAdmissions: {
    type: Array,
    default: () => []
  },
  allJobApplications: {
    type: Array,
    default: () => []
  },
  allRsvps: {
    type: Array,
    default: () => []
  },
  allNielitProjects: {
    type: Array,
    default: () => []
  },
  allStudents: {
    type: Array,
    default: () => []
  },
  allInternships: {
    type: Array,
    default: () => []
  },
  allEventsCatalog: {
    type: Array,
    default: () => []
  },
  allFees: {
    type: Array,
    default: () => []
  },
  allCertificates: {
    type: Array,
    default: () => []
  },
  allProjects: {
    type: Array,
    default: () => []
  },
  allContactInquiries: {
    type: Array,
    default: () => []
  },
  allReviews: {
    type: Array,
    default: () => []
  },
  allUsers: {
    type: Array,
    default: () => []
  },
  allCourses: {
    type: Array,
    default: () => []
  },
  isDarkMode: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits([
  'logout', 
  'download-slip', 
  'download-nielit-pdf', 
  'add-admission', 
  'confirm-admission', 
  'delete-admission', 
  'update-admission',
  'delete-student', 
  'update-student',
  'add-course', 
  'update-course', 
  'delete-course', 
  'update-nielit-project', 
  'delete-nielit-project', 
  'submit-nielit-project',
  'add-fee',
  'update-fee',
  'delete-fee',
  'add-internship',
  'update-internship',
  'delete-internship',
  'add-event',
  'update-event',
  'delete-event',
  'add-project',
  'update-project',
  'delete-project',
  'add-review',
  'delete-review',
  'delete-contact',
  'refresh-data',
  'set-tab',
  'toggle-theme'
]);

const emailActionMsg = ref('');
const showAdmissionEmailModal = ref(false);
const selectedAdmissionForEmail = ref(null);
const emailLetterPreview = ref('');

// Confirmed Credentials Modal State
const showConfirmedCredentialsModal = ref(false);
const confirmedStudentData = ref(null);
const showModalPassword = ref(true);

// Reset Password Modal State
const showResetPasswordModal = ref(false);
const resetStudentTarget = ref(null);
const newPasswordInput = ref('');

// Password Visibility toggle map for table rows
const showPasswordFor = ref({});
const togglePassword = (key) => {
  if (!key) return;
  showPasswordFor.value[key] = !showPasswordFor.value[key];
};

const copyText = async (text, label = 'Text') => {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(String(text));
    emailActionMsg.value = `✓ Copied ${label} to clipboard!`;
  } catch (e) {
    prompt(`Copy ${label}:`, String(text));
  }
  setTimeout(() => { emailActionMsg.value = ''; }, 3000);
};

const copyCredentialsText = async (data) => {
  if (!data) return;
  const text = `🎓 IT HUNT Academy - Official Student Portal Login Credentials
Candidate Name  : ${data.candidateName || data.fullName || data.name || 'Student'}
Registration ID : ${data.registrationNo || data.id}
Enrolled Program: ${data.course}

🔐 STUDENT LOGIN CREDENTIALS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Student User ID : ${data.userId || data.enrollmentNumber || data.registrationNo}
🔑 Login Password  : ${data.password || 'Ithunt@123'}
🌐 Portal Login URL: https://ithunt.vercel.app/#login
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please sign in and keep your credentials confidential.`;

  await copyText(text, 'Full Credentials');
};

const shareCredentialsOnWhatsApp = (data) => {
  if (!data) return;
  const url = getStudentAdmissionWhatsAppUrl(data);
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
    emailActionMsg.value = `✓ Opened WhatsApp with credentials for ${data.candidateName || data.name || 'Student'}`;
    setTimeout(() => { emailActionMsg.value = ''; }, 4000);
  } else {
    alert('Candidate record has no valid mobile number for WhatsApp.');
  }
};

const openCredentialsModal = (adm) => {
  if (!adm) return;
  confirmedStudentData.value = {
    ...adm,
    userId: adm.userId || adm.enrollmentNumber || adm.registrationNo || adm.id,
    password: adm.password || 'Ithunt@123',
    candidateName: adm.candidateName || adm.fullName || 'Student',
    course: adm.course,
    mobile: adm.mobile || adm.phone,
    email: adm.email,
    registrationNo: adm.registrationNo || adm.id,
    loginUrl: 'https://ithunt.vercel.app/#login'
  };
  showModalPassword.value = true;
  showConfirmedCredentialsModal.value = true;
};

const openResetPasswordModal = (item) => {
  if (!item) return;
  resetStudentTarget.value = item;
  newPasswordInput.value = `ITH@${Math.floor(1000 + Math.random() * 9000)}`;
  showResetPasswordModal.value = true;
};

const handleSaveResetPassword = async () => {
  if (!resetStudentTarget.value || !newPasswordInput.value.trim()) return;
  const target = resetStudentTarget.value;
  const targetId = target.userId || target.id || target.registrationNo;
  const newPass = newPasswordInput.value.trim();

  emailActionMsg.value = `Updating password for ${target.candidateName || target.name || 'Student'}...`;

  try {
    await resetStudentPasswordInBackend(targetId, newPass);
    target.password = newPass;

    // Sync in admissionsList
    const aIdx = admissionsList.value.findIndex(a => a.userId === targetId || a.registrationNo === targetId || a.id === targetId);
    if (aIdx !== -1) {
      admissionsList.value[aIdx].password = newPass;
    }
    // Sync in studentsList
    const sIdx = studentsList.value.findIndex(s => s.userId === targetId || s.id === targetId || s.registrationNo === targetId);
    if (sIdx !== -1) {
      studentsList.value[sIdx].password = newPass;
    }
    // Sync in usersList
    const uIdx = usersList.value.findIndex(u => u.userId === targetId || u.id === targetId || u.email === target.email);
    if (uIdx !== -1) {
      usersList.value[uIdx].password = newPass;
    }

    emailActionMsg.value = `✓ Password reset to "${newPass}" for ${target.candidateName || target.name || 'Student'}!`;
    showResetPasswordModal.value = false;
  } catch (err) {
    alert('Failed to reset password: ' + err.message);
  }
  setTimeout(() => { emailActionMsg.value = ''; }, 5000);
};

const pendingAdmissionsCount = computed(() => {
  return admissionsList.value.filter(a => a.status === 'Pending Verification' || a.status === 'Pending Confirmation' || (!a.status && !a.admissionConfirmed)).length;
});

const confirmedAdmissionsCount = computed(() => {
  return admissionsList.value.filter(a => a.status === 'Confirmed' || a.status === 'Active Registered Student' || a.status === 'Verified' || a.admissionConfirmed).length;
});

const openAdmissionEmailModal = (adm) => {
  if (!adm || !adm.email) {
    alert('Candidate record has no valid email address.');
    return;
  }
  selectedAdmissionForEmail.value = adm;
  const content = getStudentAdmissionEmailContent(adm);
  emailLetterPreview.value = content.body;
  showAdmissionEmailModal.value = true;
};

const openDirectGmailCompose = () => {
  if (!selectedAdmissionForEmail.value) return;
  const url = getStudentAdmissionGmailUrl(selectedAdmissionForEmail.value);
  window.open(url, '_blank', 'noopener,noreferrer');
  emailActionMsg.value = `✓ Opened Gmail Web compose for ${selectedAdmissionForEmail.value.email}`;
  setTimeout(() => { emailActionMsg.value = ''; }, 5000);
};

const openDirectMailto = () => {
  if (!selectedAdmissionForEmail.value) return;
  const url = getStudentAdmissionMailtoUrl(selectedAdmissionForEmail.value);
  window.location.href = url;
};

const copyLetterToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(emailLetterPreview.value);
    alert('✓ Admission Confirmation Letter copied to clipboard!');
  } catch (e) {
    alert('Could not copy letter automatically.');
  }
};

const triggerBackgroundAdmissionEmail = async () => {
  if (!selectedAdmissionForEmail.value) return;
  await sendAdmissionEmailToStudent(selectedAdmissionForEmail.value);
  showAdmissionEmailModal.value = false;
};

const sendAdmissionEmailToStudent = async (adm) => {
  if (!adm || !adm.email) {
    alert('Candidate record has no valid email address.');
    return;
  }
  emailActionMsg.value = `Sending Admission Confirmation Email to ${adm.email}...`;
  try {
    const res = await sendStudentAdmissionEmail(adm);
    if (res.success) {
      adm.status = 'Admission Form Sent';
      emailActionMsg.value = `✓ Admission Confirmation Email & Slip prepared for ${adm.email}`;
    } else {
      emailActionMsg.value = `⚠️ Email notification status: ${adm.email}`;
    }
  } catch (err) {
    emailActionMsg.value = `⚠️ Error dispatching email: ${err.message}`;
  }
  setTimeout(() => { emailActionMsg.value = ''; }, 5000);
};

const confirmFeeAndSendJpgReceipt = async (adm) => {
  if (!adm) return;
  emailActionMsg.value = `Recording fee payment and updating database...`;
  const nowStr = new Date().toLocaleDateString('en-GB');
  adm.feeConfirmedDate = nowStr;
  adm.feeStatus = 'Verified & Paid';

  const feeData = {
    receiptNo: `REC-${Math.floor(10000 + Math.random() * 90000)}`,
    studentId: adm.registrationNo || adm.id || adm.userId || 'STU-GEN',
    studentName: adm.candidateName || adm.fullName || adm.name || 'Student',
    course: adm.course || 'IT Masterclass',
    amount: adm.amountPaid || '₹5,000',
    amountPaid: adm.amountPaid || '₹5,000',
    paymentMode: 'Online UPI',
    status: 'Verified & Paid',
    date: nowStr
  };

  try {
    await API.recordFee(feeData);
    if (adm.registrationNo || adm.id) {
      await API.updateAdmissionStatus(adm.registrationNo || adm.id, 'Verified', 'Verified & Paid');
    }
    emailActionMsg.value = `✓ Fee confirmed and saved to database for ${feeData.studentName}!`;
  } catch (err) {
    console.warn('Save fee error:', err.message);
    emailActionMsg.value = `✓ Fee confirmed for ${feeData.studentName}.`;
  }
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

// Enterprise Admin Shell State
const isSidebarCollapsed = ref(false);
const isMobileSidebarOpen = ref(false);
const adminHeaderRef = ref(null);
const adminHeaderHeight = ref(60);

const updateAdminHeaderHeight = () => {
  if (adminHeaderRef.value) {
    adminHeaderHeight.value = adminHeaderRef.value.offsetHeight || 60;
  }
};

let savedAdminScrollY = 0;
let isAdminScrollLocked = false;
let adminTouchStartY = 0;

const handleAdminTouchStart = (e) => {
  if (e.touches && e.touches.length > 0) {
    adminTouchStartY = e.touches[0].clientY;
  }
};

const handleAdminTouchMove = (e) => {
  if (!isMobileSidebarOpen.value) return;

  const scrollable = e.target && e.target.closest ? e.target.closest('.sidebar-nav-scroll') : null;
  if (!scrollable) {
    if (e.cancelable) e.preventDefault();
    return;
  }

  const touchY = e.touches && e.touches[0] ? e.touches[0].clientY : 0;
  const isDraggingDown = touchY > adminTouchStartY;
  const isDraggingUp = touchY < adminTouchStartY;

  const atTop = scrollable.scrollTop <= 0;
  const atBottom = Math.ceil(scrollable.scrollTop + scrollable.clientHeight) >= scrollable.scrollHeight;

  if ((atTop && isDraggingDown) || (atBottom && isDraggingUp)) {
    if (e.cancelable) e.preventDefault();
  }
};

const handleAdminWheel = (e) => {
  if (!isMobileSidebarOpen.value) return;

  const scrollable = e.target && e.target.closest ? e.target.closest('.sidebar-nav-scroll') : null;
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

const lockAdminScroll = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined' || isAdminScrollLocked) return;
  savedAdminScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  isAdminScrollLocked = true;

  document.documentElement.classList.add('mobile-nav-locked');
  document.body.classList.add('mobile-nav-locked');

  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.overscrollBehavior = 'none';

  document.body.style.position = 'fixed';
  document.body.style.top = `-${savedAdminScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
  document.body.style.overscrollBehavior = 'none';

  window.addEventListener('touchstart', handleAdminTouchStart, { passive: true });
  window.addEventListener('touchmove', handleAdminTouchMove, { passive: false });
  window.addEventListener('wheel', handleAdminWheel, { passive: false });
};

const unlockAdminScroll = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !isAdminScrollLocked) return;
  const scrollYToRestore = savedAdminScrollY;
  isAdminScrollLocked = false;

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

  document.removeEventListener('click', handleAdminOutsideClick, true);
  document.removeEventListener('touchstart', handleAdminOutsideClick, { capture: true });
  window.removeEventListener('touchstart', handleAdminTouchStart);
  window.removeEventListener('touchmove', handleAdminTouchMove);
  window.removeEventListener('wheel', handleAdminWheel);

  window.scrollTo(0, scrollYToRestore);
};

const handleAdminOutsideClick = (e) => {
  if (!isMobileSidebarOpen.value) return;
  // If clicked inside admin sidebar, do not close
  if (e.target && e.target.closest && e.target.closest('.admin-sidebar')) {
    return;
  }
  // If clicked the admin mobile toggle button, toggle button handles itself
  if (e.target && e.target.closest && e.target.closest('.admin-mobile-toggle')) {
    return;
  }
  isMobileSidebarOpen.value = false;
};

watch(isMobileSidebarOpen, (isOpen) => {
  if (isOpen) {
    lockAdminScroll();
    setTimeout(() => {
      document.addEventListener('click', handleAdminOutsideClick, true);
      document.addEventListener('touchstart', handleAdminOutsideClick, { passive: true, capture: true });
    }, 50);
  } else {
    unlockAdminScroll();
    document.removeEventListener('click', handleAdminOutsideClick, true);
    document.removeEventListener('touchstart', handleAdminOutsideClick, { capture: true });
  }
});
const globalAdminSearch = ref('');
const currentTab = ref('overview');
const studentSearch = ref('');
const studentCourseFilter = ref('all');
const studentBatchFilter = ref('all');
const studentStatusFilter = ref('all');
const studentsList = ref(props.allStudents && props.allStudents.length ? [...props.allStudents] : []);
const selectedStudentDetail = ref(null);
const showStudentDetailModal = ref(false);

// --- STUDENT DASHBOARD CONTROL CENTER (SUPERADMIN FULL CONTROL) ---
const showDashboardControlModal = ref(false);
const selectedStudentControl = ref(null);
const isSavingControls = ref(false);
const controlSaveMsg = ref('');

const dashboardControlForm = ref({
  visibleTabs: {
    overview: true,
    certificates: true,
    examScores: true,
    attendance: true,
    syllabus: true,
    holidays: true,
    idCard: true
  },
  noticeBanner: {
    enabled: false,
    type: 'info',
    title: '',
    message: ''
  },
  academicMetrics: {
    attendanceRate: '94%',
    examScore: '88%',
    batchRank: 'Rank #3',
    grade: 'Grade A+ (Distinction)',
    courseProgress: 75,
    labPcNumber: 'Workstation #04 (Lab A)',
    batchTiming: 'Morning 10:00 AM - 01:00 PM (Mon - Fri)'
  },
  feeLedger: {
    feeStatus: 'Verified & Paid',
    totalFee: '₹15,000',
    feePaid: '₹15,000',
    feePending: '₹0',
    nextDueDate: ''
  },
  accountStatus: 'ACTIVE',
  holdReason: ''
});

const openDashboardControlModal = (stu) => {
  if (!stu) return;
  selectedStudentControl.value = stu;
  const existingControls = stu.dashboardControls || {};
  
  dashboardControlForm.value = {
    visibleTabs: {
      overview: existingControls.visibleTabs?.overview !== false,
      certificates: existingControls.visibleTabs?.certificates !== false,
      examScores: existingControls.visibleTabs?.examScores !== false,
      attendance: existingControls.visibleTabs?.attendance !== false,
      syllabus: existingControls.visibleTabs?.syllabus !== false,
      holidays: existingControls.visibleTabs?.holidays !== false,
      idCard: existingControls.visibleTabs?.idCard !== false
    },
    noticeBanner: {
      enabled: !!existingControls.noticeBanner?.enabled,
      type: existingControls.noticeBanner?.type || 'info',
      title: existingControls.noticeBanner?.title || '',
      message: existingControls.noticeBanner?.message || ''
    },
    academicMetrics: {
      attendanceRate: existingControls.academicMetrics?.attendanceRate || '94%',
      examScore: existingControls.academicMetrics?.examScore || '88%',
      batchRank: existingControls.academicMetrics?.batchRank || 'Rank #3',
      grade: existingControls.academicMetrics?.grade || 'Grade A+ (Distinction)',
      courseProgress: existingControls.academicMetrics?.courseProgress !== undefined ? existingControls.academicMetrics.courseProgress : 75,
      labPcNumber: existingControls.academicMetrics?.labPcNumber || 'Workstation #04 (Lab A)',
      batchTiming: existingControls.academicMetrics?.batchTiming || stu.batchTiming || 'Morning 10:00 AM - 01:00 PM (Mon - Fri)'
    },
    feeLedger: {
      feeStatus: existingControls.feeLedger?.feeStatus || stu.feeStatus || 'Verified & Paid',
      totalFee: existingControls.feeLedger?.totalFee || stu.totalFee || '₹15,000',
      feePaid: existingControls.feeLedger?.feePaid || stu.amountPaid || stu.paidFee || '₹15,000',
      feePending: existingControls.feeLedger?.feePending || stu.balanceFee || '₹0',
      nextDueDate: existingControls.feeLedger?.nextDueDate || ''
    },
    accountStatus: existingControls.accountStatus || stu.accountStatus || 'ACTIVE',
    holdReason: existingControls.holdReason || ''
  };

  showDashboardControlModal.value = true;
};

const applyDashboardPreset = (type) => {
  if (type === 'all') {
    dashboardControlForm.value.visibleTabs = {
      overview: true,
      certificates: true,
      examScores: true,
      attendance: true,
      syllabus: true,
      holidays: true,
      idCard: true
    };
    dashboardControlForm.value.accountStatus = 'ACTIVE';
  } else if (type === 'minimal') {
    dashboardControlForm.value.visibleTabs = {
      overview: true,
      certificates: false,
      examScores: false,
      attendance: false,
      syllabus: true,
      holidays: false,
      idCard: false
    };
  } else if (type === 'exam') {
    dashboardControlForm.value.visibleTabs = {
      overview: true,
      certificates: false,
      examScores: true,
      attendance: true,
      syllabus: true,
      holidays: true,
      idCard: true
    };
    dashboardControlForm.value.noticeBanner.enabled = true;
    dashboardControlForm.value.noticeBanner.type = 'warning';
    dashboardControlForm.value.noticeBanner.title = 'Final Semester Examinations Announced';
    dashboardControlForm.value.noticeBanner.message = 'Please check your exam scoreboard and verify timetable before Friday.';
  } else if (type === 'cert') {
    dashboardControlForm.value.visibleTabs = {
      overview: true,
      certificates: true,
      examScores: true,
      attendance: false,
      syllabus: true,
      holidays: false,
      idCard: true
    };
    dashboardControlForm.value.noticeBanner.enabled = true;
    dashboardControlForm.value.noticeBanner.type = 'success';
    dashboardControlForm.value.noticeBanner.title = 'Official Certificate Issued & Ready!';
    dashboardControlForm.value.noticeBanner.message = 'Your graduation certificate is now available in your Certificates & QR tab. Scan or download your accredited credential.';
  } else if (type === 'hold') {
    dashboardControlForm.value.accountStatus = 'ON_HOLD';
    dashboardControlForm.value.holdReason = 'Your portal access is placed on temporary hold. Please visit IT HUNT administration desk or contact office.';
  }
};

const saveDashboardControls = async () => {
  if (!selectedStudentControl.value) return;
  const target = selectedStudentControl.value;
  const targetId = target.id || target.registrationNo || target.userId || target.enrollmentNumber;
  isSavingControls.value = true;
  controlSaveMsg.value = 'Saving controls to database...';

  try {
    const controlsPayload = JSON.parse(JSON.stringify(dashboardControlForm.value));
    
    // Call API to update student
    await API.updateStudent(targetId, {
      dashboardControls: controlsPayload,
      academicStatus: controlsPayload.accountStatus === 'ACTIVE' ? 'ACTIVE' : controlsPayload.accountStatus,
      accountStatus: controlsPayload.accountStatus,
      feeStatus: controlsPayload.feeLedger.feeStatus
    });

    // Update in-memory objects
    target.dashboardControls = controlsPayload;
    target.accountStatus = controlsPayload.accountStatus;
    if (controlsPayload.accountStatus !== 'ACTIVE') {
      target.academicStatus = controlsPayload.accountStatus;
    }

    // Update in admissionsList
    const aIdx = admissionsList.value.findIndex(a => 
      a.id === targetId || 
      a.registrationNo === targetId || 
      a.userId === targetId || 
      (a.email && a.email.toLowerCase() === String(target.email || '').toLowerCase())
    );
    if (aIdx !== -1) {
      admissionsList.value[aIdx].dashboardControls = controlsPayload;
      admissionsList.value[aIdx].accountStatus = controlsPayload.accountStatus;
      if (controlsPayload.accountStatus !== 'ACTIVE') {
        admissionsList.value[aIdx].academicStatus = controlsPayload.accountStatus;
      }
    }

    // Update in studentsList
    const sIdx = studentsList.value.findIndex(s => 
      s.id === targetId || 
      s.registrationNo === targetId || 
      s.userId === targetId || 
      (s.email && s.email.toLowerCase() === String(target.email || '').toLowerCase())
    );
    if (sIdx !== -1) {
      studentsList.value[sIdx].dashboardControls = controlsPayload;
      studentsList.value[sIdx].accountStatus = controlsPayload.accountStatus;
      if (controlsPayload.accountStatus !== 'ACTIVE') {
        studentsList.value[sIdx].academicStatus = controlsPayload.accountStatus;
      }
    }

    controlSaveMsg.value = '✓ Controls saved & applied to student dashboard!';
    setTimeout(() => {
      showDashboardControlModal.value = false;
      controlSaveMsg.value = '';
    }, 1200);
  } catch (err) {
    console.error('Failed to save dashboard controls:', err);
    controlSaveMsg.value = '⚠️ Failed to save: ' + err.message;
  } finally {
    isSavingControls.value = false;
  }
};

const admissionSearch = ref('');
const admissionStatusFilter = ref('all');
const nielitSearch = ref('');
const nielitStatusFilter = ref('all');
const sessionTime = ref('Active Now');

// --- DYNAMIC DATABASE ENGINE & SERVER CONNECTIVITY (MONGODB) ---
const dbStatus = ref({
  connected: false,
  name: 'ithunt',
  engine: 'MongoDB Atlas Cloud',
  mode: 'Standby',
  latency: 0,
  lastChecked: ''
});

const dbStatusLabel = computed(() => dbStatus.value.connected ? 'Online' : 'Standby');
const dbEngineLabel = computed(() => dbStatus.value.engine || 'MongoDB Atlas Cloud');
const dbStatusClass = computed(() => dbStatus.value.connected ? 'db-online' : 'db-disconnected');
const dbStatusColor = computed(() => dbStatus.value.connected ? '#10b981' : '#f59e0b');
const dbStatusBg = computed(() => dbStatus.value.connected ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)');
const dbStatusBorder = computed(() => dbStatus.value.connected ? 'rgba(16, 185, 129, 0.25)' : 'rgba(245, 158, 11, 0.3)');
const dbStatusTitle = computed(() => dbStatus.value.connected 
  ? `Connected to ${dbStatus.value.engine} (${dbStatus.value.name}) • Latency: ${dbStatus.value.latency}ms` 
  : `Database connecting (${dbStatus.value.name})`
);

const refreshDatabaseStatus = async () => {
  const start = performance.now();
  try {
    const health = await API.getHealth();
    const db = health?.database;
    const latency = Math.round(performance.now() - start);
    if (db) {
      dbStatus.value = {
        connected: db.connected === true,
        name: db.name || 'ithunt',
        engine: db.type || (db.connected ? 'MongoDB Atlas Cloud' : 'MongoDB'),
        mode: db.mode || (db.connected ? 'Online' : 'Standby'),
        latency,
        lastChecked: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
    } else {
      dbStatus.value = {
        ...dbStatus.value,
        connected: false,
        mode: 'Standby',
        latency,
        lastChecked: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
    }
  } catch (err) {
    dbStatus.value = {
      ...dbStatus.value,
      connected: false,
      mode: 'Standby',
      latency: Math.round(performance.now() - start),
      lastChecked: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
  }
};

const featureAdmissionPortal = ref(true);
const featureCareersPortal = ref(true);
const featureCosmicStarfield = ref(true);

const showQuickAdmissionModal = ref(false);
const quickForm = ref({
  candidateName: '',
  fatherName: '',
  mobile: '',
  email: '',
  course: 'Web Development (MERN Stack & Cloud Architecture)'
});

const defaultTabs = [
  { id: 'overview', label: '📊 Dashboard Overview', icon: '📊' },
  { id: 'students', label: '🎓 Students Directory', icon: '🎓' },
  { id: 'admissions', label: '📝 Admissions Registry', icon: '📝' },
  { id: 'courses', label: '📚 Courses & Programs', icon: '📚' },
  { id: 'nielit', label: '📜 NIELIT Submissions', icon: '📜' },
  { id: 'internships', label: '🚀 Internship Tracks', icon: '🚀' },
  { id: 'events', label: '🎪 Event VIP Passes', icon: '🎪' },
  { id: 'careers', label: '💼 Faculty & Dev Jobs', icon: '💼' },
  { id: 'reviews', label: '⭐ Student Reviews', icon: '⭐' },
  { id: 'fees', label: '💳 Fees Ledger', icon: '💳' },
  { id: 'certificates', label: '🏅 Certificates', icon: '🏅' },
  { id: 'projects', label: '💻 Capstone Projects', icon: '💻' },
  { id: 'contact', label: '📬 Enquiries', icon: '📬' },
  { id: 'users', label: '👥 User Accounts', icon: '👥' },
  { id: 'settings', label: '⚙️ System Config', icon: '⚙️' }
];

// Reactive dataset states (initialized from live props if available)
const admissionsList = ref(props.allAdmissions && props.allAdmissions.length ? [...props.allAdmissions] : []);
const jobApplicationsList = ref(props.allJobApplications && props.allJobApplications.length ? [...props.allJobApplications] : []);
const rsvpsList = ref(props.allRsvps && props.allRsvps.length ? [...props.allRsvps] : []);
const nielitProjectsList = ref(props.allNielitProjects && props.allNielitProjects.length ? [...props.allNielitProjects] : []);
const internshipsList = ref(props.allInternships && props.allInternships.length ? [...props.allInternships] : []);
const feesList = ref(props.allFees && props.allFees.length ? [...props.allFees] : []);
const certificatesList = ref(props.allCertificates && props.allCertificates.length ? [...props.allCertificates] : []);
const projectsList = ref(props.allProjects && props.allProjects.length ? [...props.allProjects] : []);
const contactInquiriesList = ref(props.allContactInquiries && props.allContactInquiries.length ? [...props.allContactInquiries] : []);
const reviewsList = ref(props.allReviews && props.allReviews.length ? [...props.allReviews] : []);
const usersList = ref(props.allUsers && props.allUsers.length ? [...props.allUsers] : []);
const coursesList = ref(props.allCourses && props.allCourses.length ? [...props.allCourses] : (props.content?.coursesSection?.coursesList || []));
const eventsCatalogList = ref(props.allEventsCatalog && props.allEventsCatalog.length ? [...props.allEventsCatalog] : []);

watch(() => props.allEventsCatalog, (val) => {
  if (val && val.length > 0) eventsCatalogList.value = val;
}, { immediate: true, deep: true });

const availableInternshipTracks = computed(() => {
  const contentTracks = props.content?.internshipVenture?.tracks || [];
  if (contentTracks.length > 0) {
    return contentTracks.map((t, idx) => ({
      id: t.id || `track-${idx}`,
      icon: t.icon || '🚀',
      duration: t.duration || '6 Months',
      badge: t.badge || 'Industry Venture',
      title: t.title || 'Tech Internship',
      description: t.description || 'Hands-on practical development with real-world deployments.',
      earningPotential: t.earningPotential || { fresher: '₹4.5 - ₹7.5 LPA' },
      jobPlacementRate: t.jobPlacementRate || { percentage: 95 },
      learningHours: t.learningHours || { totalHours: '180+ Hrs' },
      liveProjects: t.liveProjects || [{ name: 'Enterprise Portal' }, { name: 'Cloud API Service' }]
    }));
  }
  return (coursesList.value || []).map((c, idx) => ({
    id: c.id || `track-${idx}`,
    icon: c.icon || '💻',
    duration: c.duration || '6 Months',
    badge: c.category || 'Diploma Track',
    title: c.title || c.name || 'Full Stack Track',
    description: c.description || 'Comprehensive industry curriculum and live lab training.',
    earningPotential: { fresher: '₹4.0 - ₹7.0 LPA' },
    jobPlacementRate: { percentage: 92 },
    learningHours: { totalHours: '160+ Hrs' },
    liveProjects: [{ name: `${c.title || 'Full Stack'} Capstone` }]
  }));
});

// --- ENTERPRISE EXECUTIVE OVERVIEW COMPUTED PROPERTIES ---
const overviewAdmissionFilter = ref('all');
const recentAdmissions = computed(() => {
  const list = (admissionsList.value && admissionsList.value.length) ? admissionsList.value : (props.allAdmissions && props.allAdmissions.length ? props.allAdmissions : []);
  if (overviewAdmissionFilter.value === 'pending') {
    const pending = list.filter(a => a.status === 'Pending Verification' || a.status === 'Pending Confirmation' || (!a.status && !a.admissionConfirmed));
    if (pending.length > 0) return pending.slice(0, 15);
    // If pending is 0 (all are confirmed), show all candidates so user never gets an empty box
    return list.slice(0, 15);
  }
  if (overviewAdmissionFilter.value === 'confirmed') {
    const conf = list.filter(a => a.status === 'Confirmed' || a.status === 'Active Registered Student' || a.status === 'Verified' || a.admissionConfirmed);
    return conf.length > 0 ? conf.slice(0, 15) : list.slice(0, 15);
  }
  return list.slice(0, 15);
});

const currentTabTitle = computed(() => {
  const found = defaultTabs.find(t => t.id === currentTab.value);
  return found ? found.label : 'Directorate Console';
});

const totalStudentsCount = computed(() => {
  return studentsList.value.length || (props.allStudents && props.allStudents.length) || 0;
});

const totalFeeCollected = computed(() => {
  const list = feesList.value.length ? feesList.value : (props.allFees || []);
  const sum = list.reduce((acc, f) => {
    const raw = String(f.amount || f.feePaid || 0).replace(/[^0-9.]/g, '');
    return acc + (parseFloat(raw) || 0);
  }, 0);
  return sum.toLocaleString('en-IN');
});

const totalFeePending = computed(() => {
  const list = feesList.value.length ? feesList.value : (props.allFees || []);
  const sum = list.reduce((acc, f) => {
    const raw = String(f.pendingAmount || f.feePending || 0).replace(/[^0-9.]/g, '');
    return acc + (parseFloat(raw) || 0);
  }, 0);
  return sum.toLocaleString('en-IN');
});

const recentPendingAdmissions = computed(() => {
  const list = admissionsList.value.length ? admissionsList.value : (props.allAdmissions || []);
  return list
    .filter(a => a.status === 'Pending Verification' || a.status === 'Pending' || a.status === 'PENDING_REVIEW' || (!a.admissionConfirmed && a.status !== 'Confirmed'))
    .slice(0, 5);
});

const handleConfirmAdmission = (adm) => {
  return handleConfirmAdmissionAndGenerateCredentials(adm);
};

watch(globalAdminSearch, (val) => {
  const q = (val || '').trim();
  if (currentTab.value === 'students') {
    studentSearch.value = q;
  } else if (currentTab.value === 'admissions') {
    admissionSearch.value = q;
  } else if (currentTab.value === 'nielit') {
    nielitSearch.value = q;
  } else if (currentTab.value === 'certificates') {
    certSearch.value = q;
  }
});

watch(() => props.allCourses, (val) => {
  if (val && val.length > 0) coursesList.value = val;
}, { immediate: true, deep: true });

const showAddCourseModal = ref(false);
const isEditingCourse = ref(false);
const editingCourseId = ref(null);
const newCourseForm = ref({
  title: '',
  code: '',
  category: 'Software Engineering',
  duration: '6 Months',
  fee: '₹15,000',
  eligibility: '10+2 / BCA / Graduate / Diploma',
  certificate: 'ISO 9001:2015 & Govt. Recognized',
  badge: 'Popular',
  description: ''
});

const openAddCourseModal = () => {
  isEditingCourse.value = false;
  editingCourseId.value = null;
  newCourseForm.value = {
    title: '',
    code: '',
    category: 'Software Engineering',
    duration: '6 Months',
    fee: '₹15,000',
    eligibility: '10+2 / BCA / Graduate / Diploma',
    certificate: 'ISO 9001:2015 & Govt. Recognized',
    badge: 'Popular',
    description: ''
  };
  showAddCourseModal.value = true;
};

const openEditCourseModal = (course) => {
  isEditingCourse.value = true;
  editingCourseId.value = course.id || course.code;
  newCourseForm.value = {
    title: course.title || course.name || '',
    code: course.code || course.slug || '',
    category: course.category || course.categoryName || 'Software Engineering',
    duration: course.duration || '6 Months',
    fee: course.fee || '₹15,000',
    eligibility: course.eligibility || '10+2 / BCA / Graduate / Diploma',
    certificate: course.certificate || course.certification || 'ISO 9001:2015 & Govt. Recognized',
    badge: course.badge || '',
    description: course.description || ''
  };
  showAddCourseModal.value = true;
};

const handleSaveCourse = () => {
  if (!newCourseForm.value.title || !newCourseForm.value.code) {
    alert('Please enter Course Title and Course Code.');
    return;
  }
  if (isEditingCourse.value && editingCourseId.value) {
    emit('update-course', editingCourseId.value, { ...newCourseForm.value });
  } else {
    emit('add-course', { ...newCourseForm.value });
  }
  showAddCourseModal.value = false;
  newCourseForm.value = {
    title: '',
    code: '',
    category: 'Software Engineering',
    duration: '6 Months',
    fee: '₹15,000',
    eligibility: '10+2 / BCA / Graduate / Diploma',
    certificate: 'ISO 9001:2015 & Govt. Recognized',
    badge: 'Popular',
    description: ''
  };
};

const deleteCourseItem = (course) => {
  if (confirm(`Are you sure you want to delete course "${course.title || course.name}" from MongoDB database?`)) {
    emit('delete-course', course.id || course.code);
  }
};

const getCourseEnrollmentCount = (courseName) => {
  if (!courseName) return 0;
  const target = courseName.toLowerCase().trim();
  return unifiedStudentsList.value.filter(s => (s.course || '').toLowerCase().includes(target)).length;
};

const filterAdmissionsByCourse = (courseName) => {
  currentTab.value = 'admissions';
  admissionSearch.value = courseName;
};

watch(() => props.allStudents, (val) => {
  if (val && val.length > 0) studentsList.value = val;
}, { immediate: true, deep: true });

// Unified student list that combines both confirmed students and pending candidate registrations
const unifiedStudentsList = computed(() => {
  const map = new Map();

  // 1. Add all admissions first (including pending registrations)
  admissionsList.value.forEach(adm => {
    const key = String(adm.registrationNo || adm.id || adm.userId || adm.email || '').trim();
    if (!key) return;
    map.set(key, {
      id: adm.userId || adm.registrationNo || adm.id,
      userId: adm.userId || adm.enrollmentNumber || adm.registrationNo,
      enrollmentNumber: adm.enrollmentNumber || adm.userId || adm.registrationNo,
      registrationNo: adm.registrationNo || adm.id,
      name: adm.candidateName || adm.fullName || 'Candidate',
      fullName: adm.fullName || adm.candidateName || 'Candidate',
      candidateName: adm.candidateName || adm.fullName || 'Candidate',
      email: adm.email || '',
      phone: adm.phone || adm.mobile || '',
      mobile: adm.mobile || adm.phone || '',
      course: adm.course || 'Software Engineering',
      batch: adm.batch || '2026',
      academicStatus: (adm.status === 'Confirmed' || adm.admissionConfirmed) ? 'ACTIVE' : 'PENDING_REVIEW',
      status: adm.status || (adm.admissionConfirmed ? 'Confirmed' : 'Pending Verification'),
      admissionConfirmed: !!(adm.status === 'Confirmed' || adm.admissionConfirmed),
      password: adm.password || '',
      gender: adm.gender || 'Male',
      dob: adm.dob || '—',
      address: adm.address || adm.district || 'Prayagraj, UP',
      date: adm.date,
      time: adm.time,
      createdAt: adm.date ? `${adm.date} ${adm.time || ''}` : (adm.createdAt || 'Recent'),
      createdAtFormatted: adm.date || 'Recent',
      isAdmissionRecord: true,
      originalAdmission: adm,
      dashboardControls: adm.dashboardControls || null,
      accountStatus: adm.accountStatus || 'ACTIVE'
    });
  });

  // 2. Overlay / merge official students records
  studentsList.value.forEach(stu => {
    const key = String(stu.enrollmentNumber || stu.registrationNo || stu.userId || stu.id || stu.email || '').trim();
    if (!key) return;
    const existing = map.get(key) || {};
    map.set(key, {
      ...existing,
      ...stu,
      id: stu.id || existing.id,
      userId: stu.userId || existing.userId || stu.id,
      enrollmentNumber: stu.enrollmentNumber || existing.enrollmentNumber || stu.id,
      name: stu.name || stu.fullName || existing.name || 'Student',
      email: stu.email || existing.email || '',
      mobile: stu.mobile || stu.phone || existing.mobile || '',
      phone: stu.phone || stu.mobile || existing.phone || '',
      course: stu.course || existing.course || 'Software Engineering',
      academicStatus: stu.academicStatus || existing.academicStatus || 'ACTIVE',
      status: stu.status || existing.status || 'ACTIVE',
      admissionConfirmed: stu.admissionConfirmed !== undefined ? stu.admissionConfirmed : (existing.admissionConfirmed !== undefined ? existing.admissionConfirmed : true),
      password: stu.password || existing.password || '',
      dashboardControls: stu.dashboardControls || existing.dashboardControls || null,
      accountStatus: stu.accountStatus || existing.accountStatus || 'ACTIVE'
    });
  });

  return Array.from(map.values());
});

const availableCoursesForFilter = computed(() => {
  const set = new Set();
  coursesList.value.forEach(c => {
    if (c.title) set.add(c.title);
    if (c.name) set.add(c.name);
  });
  unifiedStudentsList.value.forEach(s => {
    if (s.course) set.add(s.course);
  });
  return Array.from(set).filter(Boolean);
});

const filteredStudents = computed(() => {
  return unifiedStudentsList.value.filter(stu => {
    const search = studentSearch.value.toLowerCase().trim();
    const matchesSearch = !search || 
      (stu.name && stu.name.toLowerCase().includes(search)) ||
      (stu.enrollmentNumber && stu.enrollmentNumber.toLowerCase().includes(search)) ||
      (stu.registrationNo && stu.registrationNo.toLowerCase().includes(search)) ||
      (stu.userId && stu.userId.toLowerCase().includes(search)) ||
      (stu.email && stu.email.toLowerCase().includes(search)) ||
      (stu.phone && stu.phone.includes(search)) ||
      (stu.mobile && stu.mobile.includes(search)) ||
      (stu.course && stu.course.toLowerCase().includes(search));

    const matchesCourse = studentCourseFilter.value === 'all' || stu.course === studentCourseFilter.value || (stu.course && stu.course.includes(studentCourseFilter.value));
    const matchesBatch = studentBatchFilter.value === 'all' || stu.batch === studentBatchFilter.value;
    let matchesStatus = true;
    if (studentStatusFilter.value === 'ACTIVE') {
      matchesStatus = stu.academicStatus === 'ACTIVE' || stu.status === 'ACTIVE' || stu.status === 'Active Registered Student' || stu.status === 'Confirmed' || stu.admissionConfirmed;
    } else if (studentStatusFilter.value === 'PENDING_REVIEW') {
      matchesStatus = stu.academicStatus === 'PENDING_REVIEW' || stu.status === 'Pending Verification' || (!stu.status && !stu.admissionConfirmed);
    } else if (studentStatusFilter.value !== 'all') {
      matchesStatus = stu.academicStatus === studentStatusFilter.value || stu.status === studentStatusFilter.value;
    }

    return matchesSearch && matchesCourse && matchesBatch && matchesStatus;
  });
});

watch(() => props.allAdmissions, (val) => {
  if (val && val.length > 0) admissionsList.value = val;
}, { immediate: true, deep: true });

watch(() => props.allJobApplications, (val) => {
  if (val && val.length > 0) jobApplicationsList.value = val;
}, { immediate: true, deep: true });

watch(() => props.allRsvps, (val) => {
  if (val && val.length > 0) rsvpsList.value = val;
}, { immediate: true, deep: true });

watch(() => props.allNielitProjects, (val) => {
  if (val && val.length > 0) nielitProjectsList.value = val;
}, { immediate: true, deep: true });

watch(() => props.allInternships, (val) => {
  if (val && val.length > 0) internshipsList.value = val;
}, { immediate: true, deep: true });

watch(() => props.allFees, (val) => {
  if (val && val.length > 0) feesList.value = val;
}, { immediate: true, deep: true });

watch(() => props.allCertificates, (val) => {
  if (val && val.length > 0) certificatesList.value = val;
}, { immediate: true, deep: true });

watch(() => props.allProjects, (val) => {
  if (val && val.length > 0) projectsList.value = val;
}, { immediate: true, deep: true });

watch(() => props.allContactInquiries, (val) => {
  if (val && val.length > 0) contactInquiriesList.value = val;
}, { immediate: true, deep: true });

watch(() => props.allReviews, (val) => {
  if (val && val.length > 0) reviewsList.value = val;
}, { immediate: true, deep: true });

watch(() => props.allUsers, (val) => {
  if (val && val.length > 0) usersList.value = val;
}, { immediate: true, deep: true });

const filteredAdmissions = computed(() => {
  const list = (admissionsList.value && admissionsList.value.length) ? admissionsList.value : (props.allAdmissions && props.allAdmissions.length ? props.allAdmissions : []);
  return list.filter(adm => {
    let matchStatus = true;
    if (admissionStatusFilter.value === 'Confirmed') {
      matchStatus = adm.status === 'Confirmed' || adm.status === 'Active Registered Student' || adm.status === 'Verified' || adm.admissionConfirmed === true;
    } else if (admissionStatusFilter.value === 'Pending Verification' || admissionStatusFilter.value === 'Pending Confirmation') {
      matchStatus = adm.status === 'Pending Verification' || adm.status === 'Pending Confirmation' || (!adm.status && !adm.admissionConfirmed);
    } else if (admissionStatusFilter.value !== 'all') {
      matchStatus = adm.status === admissionStatusFilter.value;
    }

    const query = admissionSearch.value.trim().toLowerCase();
    if (!query) return matchStatus;

    const matchQuery = 
      (adm.candidateName && adm.candidateName.toLowerCase().includes(query)) ||
      (adm.fullName && adm.fullName.toLowerCase().includes(query)) ||
      (adm.fatherName && adm.fatherName.toLowerCase().includes(query)) ||
      (adm.registrationNo && adm.registrationNo.toLowerCase().includes(query)) ||
      (adm.userId && adm.userId.toLowerCase().includes(query)) ||
      (adm.email && adm.email.toLowerCase().includes(query)) ||
      (adm.mobile && String(adm.mobile).includes(query)) ||
      (adm.phone && String(adm.phone).includes(query)) ||
      (adm.course && adm.course.toLowerCase().includes(query)) ||
      (adm.district && adm.district.toLowerCase().includes(query));

    return matchStatus && matchQuery;
  });
});

const filteredNielitProjects = computed(() => {
  const map = new Map();
  nielitProjectsList.value.forEach(p => {
    const key = String(p.nielitRegNo || p.registrationNo || p.regNo || p.id || '').trim();
    if (key) {
      if (!map.has(key)) {
        map.set(key, p);
      } else {
        map.set(key, { ...map.get(key), ...p });
      }
    }
  });

  return Array.from(map.values()).filter(p => {
    const matchStatus = nielitStatusFilter.value === 'all' || p.status === nielitStatusFilter.value;
    const query = nielitSearch.value.trim().toLowerCase();
    if (!query) return matchStatus;

    const matchQuery = 
      (p.candidateName && p.candidateName.toLowerCase().includes(query)) ||
      (p.fatherName && p.fatherName.toLowerCase().includes(query)) ||
      (p.registrationNo && p.registrationNo.toLowerCase().includes(query)) ||
      (p.nielitRegNo && p.nielitRegNo.toLowerCase().includes(query)) ||
      (p.mobile && p.mobile.includes(query)) ||
      (p.projectTitle && p.projectTitle.toLowerCase().includes(query)) ||
      (p.guideName && p.guideName.toLowerCase().includes(query));

    return matchStatus && matchQuery;
  });
});

const showEditNielitModal = ref(false);
const editNielitForm = ref({
  registrationNo: '',
  nielitRegNo: '',
  candidateName: '',
  fatherName: '',
  mobile: '',
  email: '',
  nielitLevel: 'O',
  projectTitle: '',
  guideName: 'Mr. Lakshman Singh Chauhan',
  guideQualification: 'MCA (Computer Science)',
  guideDesignation: 'Director & Founder, IT HUNT',
  amount: '1000',
  utrNumber: '',
  district: 'Prayagraj',
  state: 'Uttar Pradesh',
  status: 'Submitted'
});

const openEditNielitModal = (p) => {
  editNielitForm.value = {
    registrationNo: p.registrationNo || p.nielitRegNo || '',
    nielitRegNo: p.nielitRegNo || p.registrationNo || '',
    candidateName: p.candidateName || '',
    fatherName: p.fatherName || '',
    mobile: p.mobile || '',
    email: p.email || '',
    nielitLevel: p.nielitLevel || 'O',
    projectTitle: p.projectTitle || '',
    guideName: p.guideName || 'Mr. Lakshman Singh Chauhan',
    guideQualification: p.guideQualification || 'MCA (Computer Science)',
    guideDesignation: p.guideDesignation || 'Director & Founder, IT HUNT',
    amount: p.amount || '1000',
    utrNumber: p.utrNumber || '',
    district: p.district || 'Prayagraj',
    state: p.state || 'Uttar Pradesh',
    status: p.status || 'Submitted',
    paymentDate: p.paymentDate || new Date().toISOString().split('T')[0],
    paymentRemark: p.paymentRemark || 'Paid'
  };
  showEditNielitModal.value = true;
};

const handleSaveEditedProject = async () => {
  const updatedData = { ...editNielitForm.value };
  const targetId = updatedData.registrationNo || updatedData.nielitRegNo;

  // 1. Update local reactive state
  const idx = nielitProjectsList.value.findIndex(p => 
    p.registrationNo === targetId || p.nielitRegNo === targetId
  );
  if (idx !== -1) {
    nielitProjectsList.value[idx] = { ...nielitProjectsList.value[idx], ...updatedData };
  }

  // 2. Emit to parent App.vue
  emit('update-nielit-project', updatedData);

  // 3. Persist to REST API backend
  try {
    await updateNielitProjectInBackend(targetId, updatedData);
    emailActionMsg.value = `✓ NIELIT project form for ${updatedData.candidateName} updated successfully in Database & API.`;
  } catch (err) {
    console.warn('Update project error:', err.message);
  }

  showEditNielitModal.value = false;
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

const deleteNielitProject = async (p) => {
  const targetId = typeof p === 'object' ? (p.registrationNo || p.nielitRegNo || p.id) : p;
  const candidateName = typeof p === 'object' ? (p.candidateName || p.studentName || 'Candidate') : 'Candidate';
  if (!confirm(`Are you sure you want to delete NIELIT project form for ${candidateName} (${targetId})?`)) {
    return;
  }

  // 1. Immediately remove from local list
  nielitProjectsList.value = nielitProjectsList.value.filter(item => 
    item.registrationNo !== targetId &&
    item.nielitRegNo !== targetId &&
    item.id !== targetId
  );

  // 2. Emit delete to parent App.vue
  emit('delete-nielit-project', typeof p === 'object' ? p : { id: targetId, registrationNo: targetId });

  // 3. Delete from Database & REST API backend
  try {
    await deleteNielitProjectFromBackend(targetId);
    emailActionMsg.value = `✓ NIELIT project form (${targetId}) removed successfully from Database & API.`;
  } catch (err) {
    try {
      await API.deleteProject(targetId);
    } catch (e) {
      console.warn('Delete project warning:', err.message);
    }
  }
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

// Universal alias
const handleDeleteNielit = (projectId) => deleteNielitProject(projectId);

const cycleNielitStatus = (p) => {
  if (!p.status || p.status === 'Submitted') p.status = 'Under Review';
  else if (p.status === 'Under Review') p.status = 'Verified & Approved';
  else p.status = 'Submitted';
  const targetId = p.registrationNo || p.nielitRegNo;
  updateNielitProjectInBackend(targetId, { status: p.status }).catch(() => {});
};

const cycleAdmissionStatus = async (adm) => {
  if (adm.status === 'Confirmed') adm.status = 'Verified';
  else if (adm.status === 'Verified') adm.status = 'Pending Verification';
  else adm.status = 'Confirmed';
  const targetId = adm.registrationNo || adm.id;
  try {
    await API.updateAdmissionStatus(targetId, adm.status);
  } catch (e) {
    console.warn('Update admission status error:', e.message);
  }
};

const handleConfirmAdmissionAndGenerateCredentials = async (adm) => {
  if (!adm) return;
  const targetId = adm.registrationNo || adm.id;
  const candidateName = adm.candidateName || adm.fullName || 'Student';

  const cleanId = String(targetId || '').replace(/^ITH-?/i, '');
  const suffix = cleanId && cleanId.length >= 3 ? cleanId.slice(-4) : Math.floor(1000 + Math.random() * 9000);
  const generatedUserId = adm.userId || adm.enrollmentNumber || `ITH-2026-STU${suffix}`;
  const generatedPassword = (adm.password && adm.password !== 'Ithunt@123') ? adm.password : `ITH@${Math.floor(1000 + Math.random() * 9000)}`;

  emailActionMsg.value = `Confirming admission and generating login for ${candidateName}...`;

  try {
    await confirmAdmissionInBackend(adm, {
      userId: generatedUserId,
      password: generatedPassword,
      feeStatus: adm.feeStatus || 'Verified & Paid',
      confirmedBy: props.adminUser?.name || 'SuperAdmin'
    });

    adm.status = 'Confirmed';
    adm.admissionConfirmed = true;
    adm.userId = generatedUserId;
    adm.enrollmentNumber = generatedUserId;
    adm.password = generatedPassword;
    adm.confirmedAt = new Date().toISOString();
    adm.admissionConfirmedDate = new Date().toLocaleDateString('en-GB');
    adm.admissionConfirmedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Sync in admissionsList
    const idx = admissionsList.value.findIndex(a => a.registrationNo === targetId || a.id === targetId);
    if (idx !== -1) {
      admissionsList.value[idx] = { ...admissionsList.value[idx], ...adm };
    }

    // Sync in studentsList
    const sIdx = studentsList.value.findIndex(s => s.userId === generatedUserId || s.id === generatedUserId || s.registrationNo === targetId);
    if (sIdx !== -1) {
      studentsList.value[sIdx] = {
        ...studentsList.value[sIdx],
        id: generatedUserId,
        userId: generatedUserId,
        enrollmentNumber: generatedUserId,
        password: generatedPassword,
        status: 'ACTIVE',
        academicStatus: 'ACTIVE',
        admissionConfirmed: true
      };
    } else {
      studentsList.value.unshift({
        id: generatedUserId,
        userId: generatedUserId,
        enrollmentNumber: generatedUserId,
        registrationNo: targetId,
        password: generatedPassword,
        name: candidateName,
        fullName: candidateName,
        course: adm.course,
        email: adm.email,
        mobile: adm.mobile || adm.phone,
        status: 'ACTIVE',
        academicStatus: 'ACTIVE',
        admissionConfirmed: true,
        batch: '2026'
      });
    }

    // Sync in usersList
    const uIdx = usersList.value.findIndex(u => u.userId === generatedUserId || u.id === generatedUserId || u.email === adm.email);
    if (uIdx !== -1) {
      usersList.value[uIdx] = {
        ...usersList.value[uIdx],
        id: generatedUserId,
        userId: generatedUserId,
        password: generatedPassword,
        verified: true,
        status: 'ACTIVE'
      };
    } else {
      usersList.value.unshift({
        id: generatedUserId,
        userId: generatedUserId,
        email: adm.email,
        name: candidateName,
        password: generatedPassword,
        role: 'student',
        verified: true,
        status: 'ACTIVE'
      });
    }

    emit('confirm-admission', { ...adm, userId: generatedUserId, password: generatedPassword });

    confirmedStudentData.value = {
      ...adm,
      userId: generatedUserId,
      password: generatedPassword,
      candidateName,
      course: adm.course,
      mobile: adm.mobile || adm.phone,
      email: adm.email,
      registrationNo: targetId,
      loginUrl: 'https://ithunt.vercel.app/#login'
    };
    showModalPassword.value = true;
    showConfirmedCredentialsModal.value = true;
    emailActionMsg.value = `✓ Admission Confirmed! Student User ID: ${generatedUserId} | Password: ${generatedPassword}`;
  } catch (err) {
    console.warn('Admission confirm error:', err.message);
    emailActionMsg.value = `⚠️ Error confirming admission: ${err.message}`;
  }

  setTimeout(() => { emailActionMsg.value = ''; }, 6000);
};

const deleteAdmission = async (adm) => {
  const idToDelete = typeof adm === 'object' ? (adm.registrationNo || adm.id) : adm;
  const candidateName = typeof adm === 'object' ? (adm.candidateName || adm.name || 'Candidate') : 'Candidate';
  if (!confirm(`Are you sure you want to remove admission record for ${candidateName} (${idToDelete})?`)) {
    return;
  }

  // 1. Immediately remove from local list
  admissionsList.value = admissionsList.value.filter(a => 
    a.registrationNo !== idToDelete && 
    a.id !== idToDelete
  );

  // 2. Emit delete to parent App.vue
  emit('delete-admission', typeof adm === 'object' ? adm : { id: idToDelete, registrationNo: idToDelete });

  // 3. Delete directly from connected database (MongoDB & REST API)
  try {
    await deleteAdmissionFromBackend(adm);
    emailActionMsg.value = `✓ Candidate record ${idToDelete} removed successfully from Database & API.`;
  } catch (err) {
    console.warn('Delete admission warning:', err.message);
  }
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

// Universal alias
const handleDeleteAdmission = (admissionId) => deleteAdmission(admissionId);

const cycleJobStatus = async (job) => {
  if (job.status === 'Reviewing Profile') job.status = 'Shortlisted for Interview';
  else if (job.status === 'Shortlisted for Interview') job.status = 'Interview Scheduled';
  else if (job.status === 'Interview Scheduled') job.status = 'Hired';
  else job.status = 'Reviewing Profile';
  try {
    await API.updateJobStatus(job.id, job.status);
  } catch (e) {
    console.warn('Update job status error:', e.message);
  }
};

const deleteJobApp = async (job) => {
  if (confirm(`Archive application of ${job.name}?`)) {
    jobApplicationsList.value = jobApplicationsList.value.filter(j => j.id !== job.id);
    try {
      await deleteJobApplicationFromBackend(job.id);
      emailActionMsg.value = `✓ Application for ${job.name} deleted from database.`;
      setTimeout(() => { emailActionMsg.value = ''; }, 3500);
    } catch (e) {
      console.warn('Delete job app error:', e.message);
    }
  }
};

const deleteRsvp = async (rsvp) => {
  if (confirm(`Cancel event RSVP for ${rsvp.name}?`)) {
    rsvpsList.value = rsvpsList.value.filter(r => r.id !== rsvp.id);
    try {
      await deleteRsvpFromBackend(rsvp.id);
      emailActionMsg.value = `✓ RSVP for ${rsvp.name} deleted from database.`;
      setTimeout(() => { emailActionMsg.value = ''; }, 3500);
    } catch (e) {
      console.warn('Delete RSVP error:', e.message);
    }
  }
};

const deleteReview = async (rev) => {
  if (confirm(`Delete review from ${rev.name}?`)) {
    reviewsList.value = reviewsList.value.filter(r => r.id !== rev.id);
    try {
      await deleteReviewFromBackend(rev.id);
      emailActionMsg.value = `✓ Review from ${rev.name} deleted from database.`;
      setTimeout(() => { emailActionMsg.value = ''; }, 3500);
    } catch (e) {
      console.warn('Delete review error:', e.message);
    }
  }
};

const handleDeleteUser = async (user) => {
  const targetId = user.id || user.email;
  if (confirm(`Delete user account for ${user.name} (${targetId})?`)) {
    usersList.value = usersList.value.filter(u => u.id !== user.id && u.email !== user.email);
    try {
      await deleteUserFromBackend(targetId);
      emailActionMsg.value = `✓ User account ${user.name} removed successfully.`;
      setTimeout(() => { emailActionMsg.value = ''; }, 4000);
    } catch (e) {}
  }
};

const openQuickAdmissionModal = () => {
  quickForm.value = {
    candidateName: '',
    fatherName: '',
    mobile: '',
    email: '',
    course: 'Web Development (MERN Stack & Cloud Architecture)'
  };
  showQuickAdmissionModal.value = true;
};

const handleCreateDirectAdmission = async () => {
  const regId = 'ITH-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const studentEmail = (quickForm.value.email || '').trim();
  const candidateName = (quickForm.value.candidateName || '').trim();
  const studentMobile = (quickForm.value.mobile || '').trim();
  const studentCourse = quickForm.value.course;

  const suffix = Math.floor(1000 + Math.random() * 9000);
  const generatedUserId = `ITH-2026-STU${suffix}`;
  const generatedPassword = `ITH@${Math.floor(1000 + Math.random() * 9000)}`;

  const newAdm = {
    id: regId,
    registrationNo: regId,
    registrationNumber: regId,
    date: dateStr,
    time: timeStr,
    candidateName,
    fullName: candidateName,
    fatherName: (quickForm.value.fatherName || '').trim(),
    motherName: 'Not Specified',
    dob: '2003-01-01',
    gender: 'Male',
    course: studentCourse,
    track: studentCourse,
    mobile: studentMobile,
    phone: studentMobile,
    email: studentEmail,
    userId: generatedUserId,
    password: generatedPassword,
    enrollmentNumber: generatedUserId,
    district: 'PRAYAGRAJ',
    address: 'Holagarh Studio, Prayagraj',
    status: 'Confirmed',
    admissionConfirmed: true,
    feeStatus: 'Verified & Paid',
    confirmedAt: now.toISOString()
  };

  admissionsList.value.unshift(newAdm);
  emit('add-admission', newAdm);

  // Sync into studentsList
  studentsList.value.unshift({
    id: generatedUserId,
    userId: generatedUserId,
    enrollmentNumber: generatedUserId,
    registrationNo: regId,
    password: generatedPassword,
    name: candidateName,
    fullName: candidateName,
    course: studentCourse,
    email: studentEmail,
    mobile: studentMobile,
    status: 'ACTIVE',
    academicStatus: 'ACTIVE',
    admissionConfirmed: true,
    batch: '2026'
  });

  // Sync into usersList
  usersList.value.unshift({
    id: generatedUserId,
    userId: generatedUserId,
    email: studentEmail,
    name: candidateName,
    password: generatedPassword,
    role: 'student',
    verified: true,
    status: 'ACTIVE'
  });

  try {
    await confirmAdmissionInBackend(newAdm, {
      userId: generatedUserId,
      password: generatedPassword,
      feeStatus: 'Verified & Paid',
      confirmedBy: props.adminUser?.name || 'SuperAdmin'
    });
  } catch (err) {
    console.warn('Direct admission backend confirm error:', err.message);
  }

  showQuickAdmissionModal.value = false;

  confirmedStudentData.value = {
    ...newAdm,
    userId: generatedUserId,
    password: generatedPassword,
    loginUrl: 'https://ithunt.vercel.app/#login'
  };
  showModalPassword.value = true;
  showConfirmedCredentialsModal.value = true;
  emailActionMsg.value = `✓ Direct Candidate Enrolled! User ID: ${generatedUserId} | Password: ${generatedPassword}`;
  setTimeout(() => { emailActionMsg.value = ''; }, 6000);
};

const exportDataToJson = () => {
  const exportPayload = {
    exportDate: new Date().toISOString(),
    institute: props.content.brand?.name || 'IT HUNT',
    admissions: admissionsList.value,
    nielitProjects: nielitProjectsList.value,
    jobApplications: jobApplicationsList.value,
    eventRsvps: rsvpsList.value,
    studentReviews: reviewsList.value
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `IT_HUNT_SuperAdmin_Backup_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

const onAvatarError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60';
};

const onImgError = (event) => {
  event.target.src = 'img/ithunt.webp';
};

// Edit Admission Modal State
const showEditAdmissionModal = ref(false);
const editAdmissionForm = ref({
  id: '',
  registrationNo: '',
  candidateName: '',
  fatherName: '',
  motherName: '',
  dob: '',
  gender: 'Male',
  course: '',
  mobile: '',
  email: '',
  district: 'Prayagraj',
  address: '',
  status: 'Confirmed',
  feeStatus: 'Verified & Paid',
  amountPaid: '₹5,000'
});

const openEditAdmissionModal = (adm) => {
  editAdmissionForm.value = {
    id: adm.id || adm.registrationNo,
    registrationNo: adm.registrationNo || adm.id,
    candidateName: adm.candidateName || adm.fullName || '',
    fatherName: adm.fatherName || '',
    motherName: adm.motherName || '',
    dob: adm.dob || '2004-01-01',
    gender: adm.gender || 'Male',
    course: adm.course || 'Web Development (MERN Stack & Cloud Architecture)',
    mobile: adm.mobile || adm.phone || '',
    email: adm.email || '',
    district: adm.district || 'Prayagraj',
    address: adm.address || '',
    status: adm.status || (adm.admissionConfirmed ? 'Confirmed' : 'Pending Verification'),
    feeStatus: adm.feeStatus || 'Verified & Paid',
    amountPaid: adm.amountPaid || '₹5,000'
  };
  showEditAdmissionModal.value = true;
};

const handleSaveEditedAdmission = async () => {
  const updated = { ...editAdmissionForm.value };
  const targetId = updated.registrationNo || updated.id;
  const idx = admissionsList.value.findIndex(a => a.registrationNo === targetId || a.id === targetId);
  if (idx !== -1) {
    admissionsList.value[idx] = { ...admissionsList.value[idx], ...updated };
  }
  const sIdx = studentsList.value.findIndex(s => s.registrationNo === targetId || s.id === targetId || s.userId === updated.email);
  if (sIdx !== -1) {
    studentsList.value[sIdx] = {
      ...studentsList.value[sIdx],
      name: updated.candidateName,
      fullName: updated.candidateName,
      email: updated.email,
      mobile: updated.mobile,
      phone: updated.mobile,
      course: updated.course
    };
  }
  emit('update-admission', updated);
  try {
    await updateAdmissionInBackend(targetId, updated);
    emailActionMsg.value = `✓ Admission record for ${updated.candidateName} updated in MongoDB!`;
  } catch (err) {
    console.warn('Update admission notice:', err.message);
  }
  showEditAdmissionModal.value = false;
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

// Edit Student Modal State
const showEditStudentModal = ref(false);
const editStudentForm = ref({
  id: '',
  enrollmentNumber: '',
  userId: '',
  name: '',
  email: '',
  phone: '',
  course: '',
  batch: '2026',
  academicStatus: 'ACTIVE',
  gender: 'Male',
  dob: '',
  address: '',
  guardianName: ''
});

const openEditStudentModal = (stu) => {
  editStudentForm.value = {
    id: stu.id || stu.enrollmentNumber || stu.userId,
    enrollmentNumber: stu.enrollmentNumber || stu.id || stu.userId,
    userId: stu.userId || stu.enrollmentNumber || stu.id,
    name: stu.name || stu.fullName || stu.candidateName || '',
    email: stu.email || '',
    phone: stu.phone || stu.mobile || '',
    course: stu.course || 'Software Engineering',
    batch: stu.batch || '2026',
    academicStatus: stu.academicStatus || stu.status || 'ACTIVE',
    gender: stu.gender || 'Male',
    dob: stu.dob || '2004-01-01',
    address: stu.address || 'Prayagraj, UP',
    guardianName: stu.guardianName || stu.fatherName || ''
  };
  showEditStudentModal.value = true;
};

const handleSaveEditedStudent = async () => {
  const updated = { ...editStudentForm.value };
  const targetId = updated.enrollmentNumber || updated.userId || updated.id;
  const idx = studentsList.value.findIndex(s => s.enrollmentNumber === targetId || s.userId === targetId || s.id === targetId);
  if (idx !== -1) {
    studentsList.value[idx] = { ...studentsList.value[idx], ...updated };
  }
  const aIdx = admissionsList.value.findIndex(a => a.enrollmentNumber === targetId || a.userId === targetId || a.registrationNo === targetId || a.id === targetId);
  if (aIdx !== -1) {
    admissionsList.value[aIdx] = {
      ...admissionsList.value[aIdx],
      candidateName: updated.name,
      fullName: updated.name,
      email: updated.email,
      phone: updated.phone,
      mobile: updated.phone,
      course: updated.course
    };
  }
  emit('update-student', updated);
  try {
    await updateStudentInBackend(targetId, updated);
    emailActionMsg.value = `✓ Student ${updated.name} updated in MongoDB!`;
  } catch (err) {
    console.warn('Update student notice:', err.message);
  }
  showEditStudentModal.value = false;
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

// Fee Modal State (Add & Edit)
const showAddFeeModal = ref(false);
const isEditingFee = ref(false);
const feeForm = ref({
  id: '',
  receiptNo: '',
  studentName: '',
  course: 'Web Development (MERN Stack & Cloud Architecture)',
  amount: '₹5,000',
  paymentMode: 'Online UPI',
  date: new Date().toLocaleDateString('en-GB'),
  status: 'Verified & Paid'
});

const openAddFeeModal = () => {
  isEditingFee.value = false;
  const recId = `REC-${Math.floor(10000 + Math.random() * 90000)}`;
  feeForm.value = {
    id: recId,
    receiptNo: recId,
    studentName: '',
    course: coursesList.value[0]?.title || coursesList.value[0]?.name || 'Web Development (MERN Stack & Cloud Architecture)',
    amount: '₹5,000',
    paymentMode: 'Online UPI',
    date: new Date().toLocaleDateString('en-GB'),
    status: 'Verified & Paid'
  };
  showAddFeeModal.value = true;
};

const openEditFeeModal = (fee) => {
  isEditingFee.value = true;
  feeForm.value = {
    id: fee.id || fee.receiptNo,
    receiptNo: fee.receiptNo || fee.id,
    studentName: fee.studentName || '',
    course: fee.course || 'Web Development (MERN Stack & Cloud Architecture)',
    amount: fee.amount || '₹5,000',
    paymentMode: fee.paymentMode || 'Online UPI',
    date: fee.date || new Date().toLocaleDateString('en-GB'),
    status: fee.status || 'Verified & Paid'
  };
  showAddFeeModal.value = true;
};

const handleSaveFee = async () => {
  const f = { ...feeForm.value };
  if (isEditingFee.value) {
    const idx = feesList.value.findIndex(item => item.id === f.id || item.receiptNo === f.id);
    if (idx !== -1) {
      feesList.value[idx] = { ...feesList.value[idx], ...f };
    }
    emit('update-fee', f.id, f);
    try {
      await updateFeeInBackend(f.id, f);
      emailActionMsg.value = `✓ Fee record ${f.receiptNo} updated in MongoDB!`;
    } catch (e) {}
  } else {
    feesList.value.unshift(f);
    emit('add-fee', f);
    try {
      await saveFeeToBackend(f);
      emailActionMsg.value = `✓ Fee payment recorded and saved to MongoDB!`;
    } catch (e) {}
  }
  showAddFeeModal.value = false;
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

const handleDeleteFee = async (fee) => {
  const id = fee.id || fee.receiptNo;
  if (!confirm(`Delete fee transaction ${fee.receiptNo || id} for ${fee.studentName}?`)) return;
  feesList.value = feesList.value.filter(f => f.id !== id && f.receiptNo !== id);
  emit('delete-fee', id);
  try {
    await deleteFeeFromBackend(id);
    emailActionMsg.value = `✓ Fee record deleted.`;
  } catch (e) {}
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

const handleDeleteContact = async (inq) => {
  const id = inq.id || inq._id;
  if (!confirm(`Delete contact inquiry from ${inq.name || inq.fullName}?`)) return;
  contactInquiriesList.value = contactInquiriesList.value.filter(c => c.id !== id && c._id !== id);
  emit('delete-contact', id);
  try {
    await deleteContactInquiryFromBackend(id);
    emailActionMsg.value = `✓ Contact inquiry deleted.`;
  } catch (e) {}
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

// Add NIELIT Modal State
const showAddNielitModal = ref(false);
const newNielitForm = ref({
  registrationNo: '',
  candidateName: '',
  fatherName: '',
  mobile: '',
  email: '',
  nielitLevel: 'O',
  projectTitle: 'Web Development (MERN Stack)',
  guideName: 'Mr. Lakshman Singh Chauhan',
  guideQualification: 'MCA (Computer Science)',
  guideDesignation: 'Director & Founder, IT HUNT',
  amount: '₹1,000',
  utrNumber: '',
  district: 'Prayagraj',
  state: 'Uttar Pradesh',
  status: 'Submitted'
});

const openAddNielitModal = () => {
  const regId = 'NIELIT-' + Math.floor(100000 + Math.random() * 900000);
  newNielitForm.value = {
    registrationNo: regId,
    nielitRegNo: regId,
    candidateName: '',
    fatherName: '',
    mobile: '',
    email: '',
    nielitLevel: 'O',
    projectTitle: 'Web Development (MERN Stack)',
    guideName: 'Mr. Lakshman Singh Chauhan',
    guideQualification: 'MCA (Computer Science)',
    guideDesignation: 'Director & Founder, IT HUNT',
    amount: '₹1,000',
    utrNumber: '',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    status: 'Submitted',
    date: new Date().toLocaleDateString('en-GB')
  };
  showAddNielitModal.value = true;
};

const handleSaveNewNielit = async () => {
  const p = { ...newNielitForm.value };
  p.id = p.registrationNo;
  nielitProjectsList.value.unshift(p);
  emit('submit-nielit-project', p);
  try {
    await saveNielitProjectRecord(p);
    emailActionMsg.value = `✓ NIELIT Project for ${p.candidateName} registered in MongoDB!`;
  } catch (err) {
    console.warn('Save NIELIT error:', err.message);
  }
  showAddNielitModal.value = false;
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

let refreshTimer = null;
const isRefreshing = ref(false);
const lastRefreshedTime = ref('');

const refreshAllData = async () => {
  isRefreshing.value = true;
  try {
    emit('refresh-data');
    refreshDatabaseStatus();
    const results = await Promise.allSettled([
      fetchAdmissionsFromBackend(),
      fetchStudentsFromBackend(),
      fetchUsersFromBackend(),
      fetchCoursesFromBackend(),
      fetchNielitProjectsFromBackend(),
      fetchFeesFromBackend(),
      fetchCertificatesFromBackend(),
      fetchProjectsFromBackend(),
      fetchContactInquiriesFromBackend(),
      fetchReviewsFromBackend(),
      fetchJobApplicationsFromBackend(),
      fetchRsvpsFromBackend(),
      fetchInternshipsFromBackend(),
      fetchEventsCatalogFromBackend()
    ]);

    const getVal = (idx) => {
      const res = results[idx];
      return (res && res.status === 'fulfilled' && Array.isArray(res.value)) ? res.value : null;
    };

    const adms = getVal(0);
    const stus = getVal(1);
    const usrs = getVal(2);
    const crss = getVal(3);
    const nielits = getVal(4);
    const fees = getVal(5);
    const certs = getVal(6);
    const projs = getVal(7);
    const inqs = getVal(8);
    const revs = getVal(9);
    const jobs = getVal(10);
    const rsvps = getVal(11);
    const interns = getVal(12);
    const eventsCat = getVal(13);

    if (adms && adms.length > 0) admissionsList.value = adms;
    if (stus && stus.length > 0) studentsList.value = stus;
    if (usrs && usrs.length > 0) usersList.value = usrs;
    if (crss && crss.length > 0) coursesList.value = crss;
    if (nielits && nielits.length > 0) nielitProjectsList.value = nielits;
    if (fees && fees.length > 0) feesList.value = fees;
    if (certs && certs.length > 0) certificatesList.value = certs;
    if (projs && projs.length > 0) projectsList.value = projs;
    if (inqs && inqs.length > 0) contactInquiriesList.value = inqs;
    if (revs && revs.length > 0) reviewsList.value = revs;
    if (jobs && jobs.length > 0) jobApplicationsList.value = jobs;
    if (rsvps && rsvps.length > 0) rsvpsList.value = rsvps;
    if (interns && interns.length > 0) internshipsList.value = interns;
    if (eventsCat && eventsCat.length > 0) eventsCatalogList.value = eventsCat;
    lastRefreshedTime.value = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  } catch (err) {
    console.warn('SuperAdmin refresh notice:', err.message);
  } finally {
    isRefreshing.value = false;
  }
};

// --- INTERNSHIP MANAGEMENT STATE & ACTIONS ---
const showAddInternshipModal = ref(false);
const isEditingInternship = ref(false);
const editingInternshipId = ref(null);
const internshipForm = ref({
  id: '',
  name: '',
  email: '',
  phone: '',
  track: 'Full Stack Web Development (MERN)',
  duration: '6 Months',
  college: '',
  branch: 'Computer Science & Engineering',
  mode: 'Offline Studio / Hybrid',
  status: 'Confirmed'
});

const openAddInternshipModal = () => {
  isEditingInternship.value = false;
  editingInternshipId.value = null;
  const newId = `INT-${Math.floor(10000 + Math.random() * 90000)}`;
  internshipForm.value = {
    id: newId,
    name: '',
    email: '',
    phone: '',
    track: 'Full Stack Web Development (MERN)',
    duration: '6 Months',
    college: '',
    branch: 'Computer Science & Engineering',
    mode: 'Offline Studio / Hybrid',
    status: 'Confirmed'
  };
  showAddInternshipModal.value = true;
};

const openEditInternshipModal = (intern) => {
  isEditingInternship.value = true;
  editingInternshipId.value = intern.id || intern._id;
  internshipForm.value = {
    id: intern.id || intern._id,
    name: intern.name || intern.candidateName || '',
    email: intern.email || '',
    phone: intern.phone || intern.mobile || '',
    track: intern.track || intern.domain || 'Full Stack Web Development (MERN)',
    duration: intern.duration || '6 Months',
    college: intern.college || '',
    branch: intern.branch || 'Computer Science & Engineering',
    mode: intern.mode || 'Offline Studio / Hybrid',
    status: intern.status || 'Confirmed'
  };
  showAddInternshipModal.value = true;
};

const handleSaveInternship = async () => {
  if (!internshipForm.value.name || !internshipForm.value.email) {
    alert('Please enter Applicant Name and Email.');
    return;
  }
  const item = { ...internshipForm.value };
  if (isEditingInternship.value && editingInternshipId.value) {
    const idx = internshipsList.value.findIndex(i => (i.id === editingInternshipId.value || i._id === editingInternshipId.value));
    if (idx !== -1) internshipsList.value[idx] = { ...internshipsList.value[idx], ...item };
    emit('update-internship', editingInternshipId.value, item);
    try {
      await updateInternshipInBackend(editingInternshipId.value, item);
      emailActionMsg.value = `✓ Internship for ${item.name} updated in MongoDB!`;
    } catch (e) {
      console.warn('Update internship error:', e.message);
    }
  } else {
    internshipsList.value.unshift(item);
    emit('add-internship', item);
    try {
      await saveInternshipToBackend(item);
      emailActionMsg.value = `✓ New internship registration saved to MongoDB Atlas!`;
    } catch (e) {
      console.warn('Save internship error:', e.message);
    }
  }
  showAddInternshipModal.value = false;
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

const handleDeleteInternship = async (intern) => {
  const targetId = intern.id || intern._id;
  if (confirm(`Delete internship application for ${intern.name || intern.candidateName}?`)) {
    internshipsList.value = internshipsList.value.filter(i => i.id !== targetId && i._id !== targetId);
    emit('delete-internship', targetId);
    try {
      await deleteInternshipFromBackend(targetId);
      emailActionMsg.value = `✓ Internship application deleted.`;
    } catch (e) {
      console.warn('Delete internship error:', e.message);
    }
    setTimeout(() => { emailActionMsg.value = ''; }, 4000);
  }
};

// --- EVENT CATALOG MANAGEMENT STATE & ACTIONS ---
const showAddEventModal = ref(false);
const isEditingEvent = ref(false);
const editingEventId = ref(null);
const eventForm = ref({
  id: '',
  title: '',
  description: '',
  date: '',
  time: '10:00 AM - 04:00 PM',
  location: 'IT HUNT Campus & Innovation Lab, Prayagraj',
  category: 'Hackathon',
  status: 'Upcoming',
  capacity: 100,
  speaker: 'Mr. Lakshman Singh Chauhan',
  tags: 'AI, WebDev, Cloud'
});

const openAddEventModal = () => {
  isEditingEvent.value = false;
  editingEventId.value = null;
  const newId = `EVT-${Math.floor(1000 + Math.random() * 9000)}`;
  eventForm.value = {
    id: newId,
    title: '',
    description: '',
    date: new Date().toLocaleDateString('en-GB'),
    time: '10:00 AM - 04:00 PM',
    location: 'IT HUNT Campus & Innovation Lab, Prayagraj',
    category: 'Hackathon',
    status: 'Upcoming',
    capacity: 100,
    speaker: 'Mr. Lakshman Singh Chauhan',
    tags: 'AI, WebDev, Cloud'
  };
  showAddEventModal.value = true;
};

const openEditEventModal = (evt) => {
  isEditingEvent.value = true;
  editingEventId.value = evt.id || evt._id;
  eventForm.value = {
    id: evt.id || evt._id,
    title: evt.title || evt.name || '',
    description: evt.description || '',
    date: evt.date || '',
    time: evt.time || '10:00 AM - 04:00 PM',
    location: evt.location || evt.venue || 'IT HUNT Campus & Innovation Lab, Prayagraj',
    category: evt.category || 'Hackathon',
    status: evt.status || 'Upcoming',
    capacity: evt.capacity || 100,
    speaker: evt.speaker || 'Mr. Lakshman Singh Chauhan',
    tags: Array.isArray(evt.tags) ? evt.tags.join(', ') : (evt.tags || '')
  };
  showAddEventModal.value = true;
};

const handleSaveEvent = async () => {
  if (!eventForm.value.title) {
    alert('Please enter Event Title.');
    return;
  }
  const item = { 
    ...eventForm.value,
    tags: typeof eventForm.value.tags === 'string' ? eventForm.value.tags.split(',').map(t => t.trim()).filter(Boolean) : eventForm.value.tags
  };
  if (isEditingEvent.value && editingEventId.value) {
    const idx = eventsCatalogList.value.findIndex(e => (e.id === editingEventId.value || e._id === editingEventId.value));
    if (idx !== -1) eventsCatalogList.value[idx] = { ...eventsCatalogList.value[idx], ...item };
    emit('update-event', editingEventId.value, item);
    try {
      await updateEventInBackend(editingEventId.value, item);
      emailActionMsg.value = `✓ Event "${item.title}" updated in MongoDB!`;
    } catch (e) {
      console.warn('Update event error:', e.message);
    }
  } else {
    eventsCatalogList.value.unshift(item);
    emit('add-event', item);
    try {
      await saveEventToBackend(item);
      emailActionMsg.value = `✓ New Event scheduled and saved to MongoDB Atlas!`;
    } catch (e) {
      console.warn('Save event error:', e.message);
    }
  }
  showAddEventModal.value = false;
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

const handleDeleteEvent = async (evt) => {
  const targetId = evt.id || evt._id;
  if (confirm(`Cancel and remove scheduled event "${evt.title || evt.name}"?`)) {
    eventsCatalogList.value = eventsCatalogList.value.filter(e => e.id !== targetId && e._id !== targetId);
    emit('delete-event', targetId);
    try {
      await deleteEventFromBackend(targetId);
      emailActionMsg.value = `✓ Event removed from directory.`;
    } catch (e) {
      console.warn('Delete event error:', e.message);
    }
    setTimeout(() => { emailActionMsg.value = ''; }, 4000);
  }
};

// --- CAPSTONE PROJECT MANAGEMENT STATE & ACTIONS ---
const showAddProjectModal = ref(false);
const isEditingProject = ref(false);
const editingProjectId = ref(null);
const projectForm = ref({
  id: '',
  title: '',
  studentName: '',
  techStack: 'Vue.js, Node.js, Express, MongoDB',
  description: '',
  repoUrl: '',
  liveUrl: '',
  status: 'Completed & Deployed'
});

const openAddProjectModal = () => {
  isEditingProject.value = false;
  editingProjectId.value = null;
  const newId = `PRJ-${Math.floor(1000 + Math.random() * 9000)}`;
  projectForm.value = {
    id: newId,
    title: '',
    studentName: '',
    techStack: 'Vue.js, Node.js, Express, MongoDB',
    description: '',
    repoUrl: '',
    liveUrl: '',
    status: 'Completed & Deployed'
  };
  showAddProjectModal.value = true;
};

const openEditProjectModal = (prj) => {
  isEditingProject.value = true;
  editingProjectId.value = prj.id || prj._id;
  projectForm.value = {
    id: prj.id || prj._id,
    title: prj.title || prj.projectTitle || '',
    studentName: prj.studentName || '',
    techStack: prj.techStack || 'Vue.js, Node.js, Express, MongoDB',
    description: prj.description || '',
    repoUrl: prj.repoUrl || '',
    liveUrl: prj.liveUrl || '',
    status: prj.status || 'Completed & Deployed'
  };
  showAddProjectModal.value = true;
};

const handleSaveProject = async () => {
  if (!projectForm.value.title || !projectForm.value.studentName) {
    alert('Please enter Project Title and Developer Name.');
    return;
  }
  const item = { ...projectForm.value };
  if (isEditingProject.value && editingProjectId.value) {
    const idx = projectsList.value.findIndex(p => (p.id === editingProjectId.value || p._id === editingProjectId.value));
    if (idx !== -1) projectsList.value[idx] = { ...projectsList.value[idx], ...item };
    emit('update-project', editingProjectId.value, item);
    try {
      await updateProjectInBackend(editingProjectId.value, item);
      emailActionMsg.value = `✓ Project "${item.title}" updated in MongoDB!`;
    } catch (e) {
      console.warn('Update project error:', e.message);
    }
  } else {
    projectsList.value.unshift(item);
    emit('add-project', item);
    try {
      await saveProjectToBackend(item);
      emailActionMsg.value = `✓ Capstone Project added and saved to MongoDB Atlas!`;
    } catch (e) {
      console.warn('Save project error:', e.message);
    }
  }
  showAddProjectModal.value = false;
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

const handleDeleteProject = async (prj) => {
  const targetId = prj.id || prj._id;
  if (confirm(`Delete capstone project "${prj.title || prj.projectTitle}"?`)) {
    projectsList.value = projectsList.value.filter(p => p.id !== targetId && p._id !== targetId);
    emit('delete-project', targetId);
    try {
      await deleteProjectFromBackend(targetId);
      emailActionMsg.value = `✓ Project deleted.`;
    } catch (e) {
      console.warn('Delete project error:', e.message);
    }
    setTimeout(() => { emailActionMsg.value = ''; }, 4000);
  }
};

// --- STUDENT REVIEWS MANAGEMENT STATE & ACTIONS ---
const showAddReviewModal = ref(false);
const reviewForm = ref({
  name: '',
  role: 'Full Stack Developer / Student',
  comment: '',
  rating: 5,
  date: new Date().toLocaleDateString('en-GB')
});

const openAddReviewModal = () => {
  reviewForm.value = {
    name: '',
    role: 'Full Stack Developer / Student',
    comment: '',
    rating: 5,
    date: new Date().toLocaleDateString('en-GB')
  };
  showAddReviewModal.value = true;
};

const handleSaveReview = async () => {
  if (!reviewForm.value.name || !reviewForm.value.comment) {
    alert('Please enter Reviewer Name and Feedback Comment.');
    return;
  }
  const item = {
    id: `REV-${Math.floor(1000 + Math.random() * 9000)}`,
    ...reviewForm.value
  };
  reviewsList.value.unshift(item);
  emit('add-review', item);
  try {
    await saveReviewToBackend(item);
    emailActionMsg.value = `✓ Student review saved to MongoDB Atlas!`;
  } catch (e) {
    console.warn('Save review error:', e.message);
  }
  showAddReviewModal.value = false;
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

// Certificate Generation & Management State (SuperAdmin Only)
const showCourseCertModal = ref(false);
const showExpCertModal = ref(false);
const showCertPreviewModal = ref(false);
const selectedCertForPreview = ref(null);
const certFilter = ref('all');
const certSearch = ref('');

const courseCertForm = ref({
  studentName: '',
  course: 'Full Stack MERN Stack & Cloud Engineering',
  duration: '6 Months Masterclass',
  grade: 'Grade A+ (Distinction)',
  issueDate: new Date().toISOString().split('T')[0],
  certNo: ''
});

const expCertForm = ref({
  studentName: '',
  role: 'Full Stack Developer Intern',
  department: 'Software Solutions & Cloud Architecture',
  duration: '6 Months',
  startDate: '',
  endDate: '',
  technologies: 'React.js, Node.js, Express, MongoDB, REST APIs, Git & Cloud Hosting',
  performance: 'Outstanding and Highly Commended',
  issueDate: new Date().toISOString().split('T')[0],
  certNo: ''
});

const filteredCertificates = computed(() => {
  let list = certificatesList.value || [];
  if (certFilter.value === 'course') {
    list = list.filter(c => c.type !== 'experience');
  } else if (certFilter.value === 'experience') {
    list = list.filter(c => c.type === 'experience');
  }
  const q = certSearch.value.trim().toLowerCase();
  if (!q) return list;
  return list.filter(c => {
    const name = (c.studentName || c.candidateName || '').toLowerCase();
    const id = (c.certNo || c.certificateNumber || '').toLowerCase();
    const course = (c.course || c.courseName || '').toLowerCase();
    const role = (c.role || c.designation || '').toLowerCase();
    return name.includes(q) || id.includes(q) || course.includes(q) || role.includes(q);
  });
});

const openIssueCourseCertModal = (prefill = {}) => {
  courseCertForm.value = {
    studentName: prefill.name || prefill.candidateName || prefill.studentName || '',
    course: prefill.course || 'Full Stack MERN Stack & Cloud Engineering',
    duration: prefill.duration || '6 Months Masterclass',
    grade: prefill.grade || 'Grade A+ (Distinction)',
    issueDate: new Date().toISOString().split('T')[0],
    certNo: `ITH-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  };
  showCourseCertModal.value = true;
};

const openIssueExpCertModal = (prefill = {}) => {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  expCertForm.value = {
    studentName: prefill.name || prefill.candidateName || prefill.studentName || '',
    role: prefill.role || prefill.track || 'Full Stack Developer Intern',
    department: prefill.department || 'Software Solutions & Cloud Architecture',
    duration: prefill.duration || '6 Months',
    startDate: prefill.startDate || sixMonthsAgo.toISOString().split('T')[0],
    endDate: prefill.endDate || today.toISOString().split('T')[0],
    technologies: prefill.technologies || 'React.js, Node.js, Express, MongoDB, REST APIs, Git & Cloud Hosting',
    performance: prefill.performance || 'Outstanding and Highly Commended',
    issueDate: today.toISOString().split('T')[0],
    certNo: `ITH-EXP-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  };
  showExpCertModal.value = true;
};

const openIssueCourseCertModalForStudent = (stu) => {
  openIssueCourseCertModal({
    name: stu.candidateName || stu.fullName || stu.name,
    course: stu.course,
    duration: '6 Months Masterclass'
  });
};

const handleSaveCourseCert = async () => {
  const f = courseCertForm.value;
  const certId = f.certNo || `ITH-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const payload = {
    type: 'course',
    certNo: certId,
    certificateNumber: certId,
    studentName: f.studentName.trim(),
    candidateName: f.studentName.trim(),
    course: f.course.trim(),
    duration: f.duration,
    grade: f.grade,
    issueDate: f.issueDate,
    status: 'Verified & Active',
    verificationUrl: `https://ithunt.vercel.app/api/certificates/verify/${certId}`
  };

  try {
    const res = await API.issueCertificate(payload);
    const created = res.data || res.certificate || payload;
    certificatesList.value.unshift(created);
    showCourseCertModal.value = false;
    emailActionMsg.value = `✓ Course Certificate ${certId} issued successfully for ${f.studentName}!`;
    setTimeout(() => { emailActionMsg.value = ''; }, 4000);
    selectedCertForPreview.value = created;
    showCertPreviewModal.value = true;
  } catch (err) {
    console.warn('Save certificate error:', err.message);
    certificatesList.value.unshift(payload);
    showCourseCertModal.value = false;
    selectedCertForPreview.value = payload;
    showCertPreviewModal.value = true;
  }
};

const handleSaveExpCert = async () => {
  const f = expCertForm.value;
  const certId = f.certNo || `ITH-EXP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const payload = {
    type: 'experience',
    certNo: certId,
    certificateNumber: certId,
    studentName: f.studentName.trim(),
    candidateName: f.studentName.trim(),
    role: f.role.trim(),
    designation: f.role.trim(),
    course: f.role.trim(),
    department: f.department.trim(),
    duration: f.duration,
    startDate: f.startDate,
    endDate: f.endDate,
    technologies: f.technologies,
    performance: f.performance,
    grade: f.performance,
    issueDate: f.issueDate,
    status: 'Verified & Active',
    verificationUrl: `https://ithunt.vercel.app/api/certificates/verify/${certId}`
  };

  try {
    const res = await API.issueCertificate(payload);
    const created = res.data || res.certificate || payload;
    certificatesList.value.unshift(created);
    showExpCertModal.value = false;
    emailActionMsg.value = `✓ Experience Letter ${certId} generated successfully for ${f.studentName}!`;
    setTimeout(() => { emailActionMsg.value = ''; }, 4000);
    selectedCertForPreview.value = created;
    showCertPreviewModal.value = true;
  } catch (err) {
    console.warn('Save experience certificate error:', err.message);
    certificatesList.value.unshift(payload);
    showExpCertModal.value = false;
    selectedCertForPreview.value = payload;
    showCertPreviewModal.value = true;
  }
};

const handlePreviewCertificate = (cert) => {
  selectedCertForPreview.value = cert;
  showCertPreviewModal.value = true;
};

const handleDownloadCertPdf = async (cert) => {
  if (cert.type === 'experience') {
    await generateExperienceCertificatePdf(cert);
  } else {
    await generateCourseCertificatePdf(cert);
  }
};

const handleDeleteCertificate = async (cert) => {
  const id = cert.id || cert._id || cert.certNo;
  const label = cert.certNo || cert.studentName;
  if (!confirm(`Are you sure you want to delete certificate ${label}?`)) return;

  const idx = certificatesList.value.findIndex(c => (c.id === id || c.certNo === cert.certNo));
  if (idx !== -1) {
    certificatesList.value.splice(idx, 1);
  }

  try {
    await API.deleteCertificate(id);
    emailActionMsg.value = `✓ Certificate ${label} deleted from registry.`;
  } catch (err) {
    console.warn('Delete certificate error:', err.message);
  }
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

let headerResizeObserver = null;

onMounted(() => {
  sessionTime.value = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  refreshDatabaseStatus();
  refreshAllData();

  // Dynamic header height measurement for mobile sticky alignment
  updateAdminHeaderHeight();
  if (typeof window !== 'undefined' && 'ResizeObserver' in window && adminHeaderRef.value) {
    headerResizeObserver = new ResizeObserver(() => {
      updateAdminHeaderHeight();
    });
    headerResizeObserver.observe(adminHeaderRef.value);
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateAdminHeaderHeight, { passive: true });
  }

  // Live polling every 12 seconds so SuperAdmin gets new candidate registrations in real-time
  refreshTimer = setInterval(() => {
    refreshAllData();
  }, 12000);
});

onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer);
  if (headerResizeObserver) {
    headerResizeObserver.disconnect();
    headerResizeObserver = null;
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateAdminHeaderHeight);
    document.removeEventListener('click', handleAdminOutsideClick, true);
    document.removeEventListener('touchstart', handleAdminOutsideClick, { capture: true });
  }
  unlockAdminScroll();
});
</script>

<style scoped>
.admin-control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  background: var(--bg-card-glass);
  border: 1px solid var(--border-cyber-glow);
  padding: 1.5rem 2rem;
  border-radius: var(--radius-xl);
  box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.6);
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.admin-profile-info {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.admin-avatar-wrap {
  position: relative;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 2px solid var(--color-ai-yellow);
  padding: 2px;
  background: rgba(249, 115, 22, 0.2);
  flex-shrink: 0;
}

.admin-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.admin-live-status-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  background: #22c55e;
  border: 2px solid #0f172a;
  border-radius: 50%;
}

.admin-role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--color-ai-yellow);
  font-family: var(--font-mono);
  text-transform: uppercase;
}

body.light-theme .admin-role-badge {
  color: #c2410c !important;
}

.admin-user-name {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0.15rem 0;
}

.admin-meta-sub {
  font-size: 0.8rem;
  color: var(--text-muted);
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.admin-quick-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.admin-action-btn {
  padding: 0.6rem 1.15rem;
  font-size: 0.85rem;
}

.admin-logout-btn {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.35);
  color: #f87171;
  padding: 0.6rem 1.15rem;
  font-size: 0.85rem;
}

.admin-logout-btn:hover {
  background: rgba(239, 68, 68, 0.3);
  color: #ffffff;
}

/* Stats Grid */
.superadmin-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.admin-stat-card {
  background: var(--bg-card-glass);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-lg);
  padding: 1.35rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: var(--transition);
}

.admin-stat-card:hover {
  border-color: var(--color-ai-gold);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(249, 115, 22, 0.15);
}

.admin-stat-icon-box {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.primary-glow { background: rgba(249, 115, 22, 0.15); border: 1px solid rgba(249, 115, 22, 0.3); }
.warning-glow { background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); }
.info-glow { background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); }
.secondary-glow { background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.3); }
.gold-glow { background: rgba(250, 204, 21, 0.15); border: 1px solid rgba(250, 204, 21, 0.3); }

.admin-stat-val {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
}

.admin-stat-lbl {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-main);
}

.admin-stat-trend {
  font-size: 0.725rem;
  color: var(--text-muted);
  margin-top: 2px;
}

/* Tabs Navigation */
.admin-tabs-nav-bar {
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-cyber);
}

.admin-nav-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: var(--bg-card-glass);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  color: var(--text-muted);
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: var(--transition);
}

.admin-nav-tab-btn:hover {
  color: var(--text-main);
  border-color: var(--color-ai-gold);
}

.admin-nav-tab-btn.active {
  color: #ffffff;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.35), rgba(250, 204, 21, 0.2));
  border-color: var(--color-ai-gold);
  border-bottom: 2px solid var(--color-ai-gold);
}

body.light-theme .admin-nav-tab-btn.active {
  color: #000000 !important;
  background: rgba(249, 115, 22, 0.15);
}

.tab-badge-counter {
  background: rgba(249, 115, 22, 0.3);
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--color-ai-yellow);
}

/* Panels */
.panel-header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.panel-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.panel-subtitle {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin: 0;
}

.panel-filter-group {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.admin-select-filter {
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  min-width: 160px;
}

/* Table */
.admin-table-card {
  background: var(--bg-card-glass);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table-responsive {
  overflow-x: auto;
}

.admin-data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.85rem;
}

.admin-data-table th {
  background: rgba(15, 23, 42, 0.7);
  padding: 0.95rem 1.15rem;
  color: var(--color-ai-yellow);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--border-cyber);
}

body.light-theme .admin-data-table th {
  background: rgba(249, 115, 22, 0.1);
  color: #c2410c;
}

.admin-data-table td {
  padding: 1rem 1.15rem;
  border-bottom: 1px solid var(--border-cyber);
  color: var(--text-main);
  vertical-align: middle;
}

.admin-data-table tbody tr:hover {
  background: rgba(249, 115, 22, 0.04);
}

.admin-reg-pill {
  font-family: var(--font-mono);
  font-weight: 800;
  color: #ea580c;
  background: rgba(234, 88, 12, 0.12);
  padding: 0.25rem 0.55rem;
  border-radius: var(--radius-sm);
  font-size: 0.78rem;
  white-space: nowrap;
}

.admin-track-pill {
  font-weight: 700;
  font-size: 0.82rem;
  color: var(--text-main);
}

.admin-status-chip {
  display: inline-block;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  font-size: 0.725rem;
  font-weight: 800;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.status-confirmed {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.35);
}

.status-verified {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.35);
}

.status-pending {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.35);
}

.admin-row-actions {
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
}

.admin-icon-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-cyber);
  padding: 0.35rem 0.65rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-main);
  cursor: pointer;
  transition: var(--transition);
}

.admin-icon-btn:hover {
  background: rgba(249, 115, 22, 0.2);
  border-color: var(--color-ai-gold);
}

.admin-grid-2col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 1.5rem;
}

.config-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.config-key {
  color: var(--text-dim);
}

.config-val {
  color: var(--text-main);
  font-weight: 700;
}

.toggle-control-label {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  cursor: pointer;
  padding: 0.65rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-cyber);
  background: rgba(15, 23, 42, 0.3);
}

.toggle-control-label input {
  margin-top: 0.2rem;
  accent-color: #f97316;
  width: 18px;
  height: 18px;
}

/* ==========================================================================
   SuperAdmin Responsive Media Queries
   ========================================================================== */
@media (max-width: 1024px) {
  .superadmin-stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }
  .admin-grid-2col {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 860px) {
  .admin-control-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
  }

  .admin-quick-actions {
    width: 100%;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  .admin-action-btn, .admin-logout-btn {
    flex: 1;
    min-width: 120px;
    justify-content: center;
  }

  .panel-header-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .panel-filter-group {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: 0.75rem;
  }

  .events-search-box {
    width: 100% !important;
    min-width: 0 !important;
  }

  .admin-select-filter {
    width: 100% !important;
    min-width: 0 !important;
  }

  .superadmin-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .admin-profile-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .admin-user-name {
    font-size: 1.25rem;
  }

  .admin-meta-sub {
    font-size: 0.75rem;
  }

  .admin-tabs-nav-bar {
    gap: 0.4rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.4rem;
  }

  .admin-nav-tab-btn {
    padding: 0.55rem 0.85rem;
    font-size: 0.78rem;
    gap: 0.35rem;
  }

  .tab-badge-counter {
    padding: 0.1rem 0.35rem;
    font-size: 0.65rem;
  }

  .modal-card {
    width: 95% !important;
    max-width: 95% !important;
    margin: 1rem auto !important;
    padding: 1.25rem !important;
  }

  .admin-data-table th,
  .admin-data-table td {
    padding: 0.75rem 0.65rem;
    font-size: 0.8rem;
  }

  .superadmin-stats-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .admin-control-bar {
    padding: 1rem !important;
  }

  .admin-quick-actions {
    flex-direction: column;
    width: 100%;
  }

  .admin-action-btn, .admin-logout-btn {
    width: 100%;
  }
}

/* ==========================================================================
   Student Dashboard Control Center Modal Styles
   ========================================================================== */
.control-center-modal {
  border: 1px solid rgba(168, 85, 247, 0.35) !important;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(168, 85, 247, 0.2) !important;
}

.control-card-section {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  transition: all 0.2s ease;
}

.control-card-section:hover {
  border-color: rgba(168, 85, 247, 0.3);
}

.section-badge-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 800;
  color: #f3e8ff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.preset-badge-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #e2e8f0;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preset-badge-btn:hover {
  background: rgba(168, 85, 247, 0.2);
  border-color: rgba(168, 85, 247, 0.5);
  color: #fff;
  transform: translateY(-1px);
}

.toggle-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.75rem;
}

.toggle-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-sm);
  padding: 0.85rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-card:hover {
  background: rgba(30, 41, 59, 0.7);
  border-color: rgba(255, 255, 255, 0.15);
}

.toggle-card.is-active {
  background: rgba(168, 85, 247, 0.1);
  border-color: rgba(168, 85, 247, 0.4);
}

.toggle-card-info {
  flex: 1;
}

.toggle-card-title {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.15rem;
}

.toggle-card.is-active .toggle-card-title {
  color: #f3e8ff;
}

.toggle-card-desc {
  font-size: 0.72rem;
  color: var(--text-muted);
  line-height: 1.35;
}

.custom-switch-input {
  width: 18px;
  height: 18px;
  accent-color: #a855f7;
  cursor: pointer;
  flex-shrink: 0;
}

.status-radio-card {
  flex: 1;
  min-width: 140px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-radio-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
}

.status-radio-card.is-selected {
  background: rgba(15, 23, 42, 0.8);
  border-color: #a855f7;
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.2);
}

/* ==========================================================================
   ENTERPRISE SUPERADMIN APP SHELL, SIDEBAR & COMMAND BAR STYLES
   ========================================================================== */
.admin-shell {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: #070a13;
  color: #f1f5f9;
  position: relative;
  font-family: var(--font-body, system-ui, -apple-system, sans-serif);
  transition: background-color 0.25s ease, color 0.25s ease;
}

.admin-shell.light-theme {
  background: #f4f6fb !important;
  color: #000000 !important;
}

/* --- SIDEBAR --- */
.admin-sidebar {
  width: 275px;
  min-width: 275px;
  max-width: 275px;
  height: 100vh;
  position: sticky;
  top: 0;
  background: #0b101e;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.25s, max-width 0.25s, background-color 0.25s ease, border-color 0.25s ease;
}

.admin-shell.light-theme .admin-sidebar {
  background: #ffffff !important;
  border-right: 1px solid #e2e8f0 !important;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.03);
}

.admin-shell.sidebar-collapsed .admin-sidebar {
  width: 76px;
  min-width: 76px;
  max-width: 76px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  gap: 0.5rem;
}

.admin-shell.light-theme .sidebar-brand {
  border-bottom-color: #e2e8f0 !important;
}

.brand-badge-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  overflow: hidden;
}

.brand-logo-img {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}

.brand-titles {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.brand-main-title {
  font-family: var(--font-heading, inherit);
  font-weight: 900;
  font-size: 1.05rem;
  letter-spacing: 0.05em;
  background: linear-gradient(135deg, #60a5fa 0%, #c084fc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.admin-shell.light-theme .brand-main-title {
  background: linear-gradient(135deg, #1d4ed8 0%, #6b21a8 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.brand-sub-badge {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.45);
  font-family: var(--font-mono, monospace);
}

.admin-shell.light-theme .brand-sub-badge {
  color: #000000 !important;
}

.sidebar-collapse-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  transition: all 0.2s;
  flex-shrink: 0;
}

.admin-shell.light-theme .sidebar-collapse-btn {
  background: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
  color: #000000 !important;
}

.sidebar-collapse-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.admin-shell.light-theme .sidebar-collapse-btn:hover {
  background: #e2e8f0 !important;
  color: #000000 !important;
}

.sidebar-mobile-close-btn {
  display: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  transition: all 0.2s;
  flex-shrink: 0;
}

.admin-shell.light-theme .sidebar-mobile-close-btn {
  background: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
  color: #0f172a !important;
}

.sidebar-mobile-close-btn:hover {
  background: rgba(239, 68, 68, 0.2) !important;
  border-color: rgba(239, 68, 68, 0.4) !important;
  color: #ef4444 !important;
}

.sidebar-user-pill {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 0.85rem;
  margin: 0.75rem 0.75rem 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
}

.admin-shell.light-theme .sidebar-user-pill {
  background: #f8fafc !important;
  border-color: #e2e8f0 !important;
}

.sidebar-avatar-wrap {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  flex-shrink: 0;
}

.sidebar-avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: cover;
  border: 1.5px solid rgba(59, 130, 246, 0.4);
}

.live-status-dot-emerald {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10b981;
  border: 2px solid #0b101e;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.8);
}

.admin-shell.light-theme .live-status-dot-emerald {
  border-color: #ffffff !important;
}

.sidebar-user-details {
  overflow: hidden;
}

.sidebar-user-name {
  font-size: 0.8rem;
  font-weight: 700;
  color: #e2e8f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-shell.light-theme .sidebar-user-name {
  color: #000000 !important;
}

.sidebar-user-role {
  font-size: 0.68rem;
  color: #94a3b8;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-shell.light-theme .sidebar-user-role {
  color: #000000 !important;
}

.sidebar-nav-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  scrollbar-width: thin;
}

.nav-group-section {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.nav-group-label {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.35);
  padding: 0.4rem 0.75rem 0.2rem;
  text-transform: uppercase;
  font-family: var(--font-mono, monospace);
}

.admin-shell.light-theme .nav-group-label {
  color: #000000 !important;
}

.sidebar-nav-item,
.nav-item-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: #94a3b8;
  font-size: 0.83rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.18s ease;
  text-decoration: none;
}

.admin-shell.light-theme .sidebar-nav-item,
.admin-shell.light-theme .nav-item-btn {
  color: #000000 !important;
}

.sidebar-nav-item:hover,
.nav-item-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #f1f5f9;
  border-color: rgba(255, 255, 255, 0.05);
}

.admin-shell.light-theme .sidebar-nav-item:hover,
.admin-shell.light-theme .nav-item-btn:hover {
  background: #f1f5f9 !important;
  color: #000000 !important;
  border-color: #e2e8f0 !important;
}

.sidebar-nav-item.active,
.nav-item-btn.active {
  background: rgba(59, 130, 246, 0.14) !important;
  color: #60a5fa !important;
  border-color: rgba(59, 130, 246, 0.3) !important;
  font-weight: 700 !important;
}

.admin-shell.light-theme .sidebar-nav-item.active,
.admin-shell.light-theme .nav-item-btn.active {
  background: #eff6ff !important;
  color: #1d4ed8 !important;
  border-color: #bfdbfe !important;
  font-weight: 800 !important;
}

.nav-item-icon {
  font-size: 1rem;
  flex-shrink: 0;
  width: 22px;
  text-align: center;
}

.nav-item-label,
.nav-item-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-badge-pill {
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
}

.admin-shell.light-theme .nav-badge-pill {
  background: #e2e8f0 !important;
  color: #1e293b !important;
}

.nav-badge-pill.alert-badge {
  background: rgba(245, 158, 11, 0.2) !important;
  color: #fbbf24 !important;
  border: 1px solid rgba(245, 158, 11, 0.4) !important;
}

.admin-shell.light-theme .nav-badge-pill.alert-badge {
  background: #fef3c7 !important;
  color: #92400e !important;
  border-color: #fcd34d !important;
}

.sidebar-bottom-actions {
  padding: 0.75rem 0.6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.admin-shell.light-theme .sidebar-bottom-actions {
  border-top-color: #e2e8f0 !important;
}

.sidebar-footer-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: #94a3b8;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.18s ease;
}

.sidebar-footer-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #f1f5f9;
}

.admin-shell.light-theme .sidebar-footer-btn {
  color: #000000 !important;
}

.admin-shell.light-theme .sidebar-footer-btn:hover {
  background: #f1f5f9 !important;
  color: #000000 !important;
}

.sidebar-footer-btn.logout-btn,
.sidebar-logout-btn {
  color: #f87171 !important;
}

.sidebar-footer-btn.logout-btn:hover,
.sidebar-logout-btn:hover {
  background: rgba(239, 68, 68, 0.12) !important;
  border-color: rgba(239, 68, 68, 0.25) !important;
  color: #ef4444 !important;
}

/* --- CANVAS & TOP COMMAND BAR --- */
.admin-main-canvas {
  flex: 1;
  min-width: 0;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: #070a13;
  scroll-behavior: smooth;
  transition: background-color 0.25s ease;
}

.admin-shell.light-theme .admin-main-canvas {
  background: #f4f6fb !important;
}

.admin-canvas-content {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.admin-top-command-bar {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1.75rem;
  background: rgba(11, 16, 29, 0.94);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  flex-wrap: wrap;
  transition: background-color 0.25s ease, border-color 0.25s ease;
}

.admin-shell.light-theme .admin-top-command-bar {
  background: rgba(255, 255, 255, 0.96) !important;
  border-bottom: 1px solid #e2e8f0 !important;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.03);
}

.command-bar-left, .command-bar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.admin-mobile-toggle {
  display: none;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  padding: 0.4rem 0.65rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}

.admin-shell.light-theme .admin-mobile-toggle {
  background: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
  color: #000000 !important;
}

.admin-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
}

.breadcrumb-root {
  color: #64748b;
  font-weight: 500;
}

.breadcrumb-sep,
.breadcrumb-separator {
  color: #475569;
  font-size: 0.7rem;
}

.admin-shell.light-theme .breadcrumb-sep,
.admin-shell.light-theme .breadcrumb-separator {
  color: #94a3b8 !important;
}

.breadcrumb-current {
  color: #f1f5f9;
  font-weight: 700;
}

.admin-shell.light-theme .breadcrumb-current {
  color: #000000 !important;
  font-weight: 800 !important;
}

.command-bar-search,
.command-search-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 320px;
}

.command-search-icon {
  position: absolute;
  left: 0.75rem;
  color: #64748b;
  font-size: 0.85rem;
  pointer-events: none;
}

.command-search-input {
  width: 100%;
  padding: 0.5rem 2.2rem 0.5rem 2.25rem;
  font-size: 0.82rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f8fafc;
  transition: all 0.2s;
  outline: none;
}

.admin-shell.light-theme .command-search-input {
  background: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
  color: #000000 !important;
}

.command-search-input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.admin-shell.light-theme .command-search-input:focus {
  background: #ffffff !important;
  border-color: #2563eb !important;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15) !important;
}

.command-search-clear,
.search-clear-btn {
  position: absolute;
  right: 0.65rem;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 2px 4px;
}

.cloud-status-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  font-size: 0.74rem;
  font-weight: 700;
  color: #34d399;
}

.admin-shell.light-theme .cloud-status-chip {
  background: #ecfdf5 !important;
  border-color: #a7f3d0 !important;
  color: #059669 !important;
}

.pulse-dot-emerald {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.8);
}

.command-alert-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.35);
  color: #fbbf24;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-shell.light-theme .command-alert-pill {
  background: #fef3c7 !important;
  border-color: #fcd34d !important;
  color: #92400e !important;
}

.command-alert-pill:hover {
  background: rgba(245, 158, 11, 0.25);
  border-color: rgba(245, 158, 11, 0.5);
  transform: translateY(-1px);
}

.command-primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #fff !important;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid #3b82f6;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35);
  transition: all 0.2s;
}

.command-primary-btn:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-1px);
}

.command-secondary-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s;
}

.admin-shell.light-theme .command-secondary-btn {
  background: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
  color: #1e293b !important;
}

.command-secondary-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.admin-shell.light-theme .command-secondary-btn:hover {
  background: #e2e8f0 !important;
}

.command-icon-btn {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.admin-shell.light-theme .command-icon-btn {
  background: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
  color: #1e293b !important;
}

.command-icon-btn:hover {
  background: rgba(255, 255, 255, 0.12);
}

.admin-shell.light-theme .command-icon-btn:hover {
  background: #e2e8f0 !important;
}

/* Toast Banner */
.admin-toast-banner {
  padding: 0.75rem 1.5rem;
  background: #1e293b;
  color: #f1f5f9;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  font-weight: 600;
}

.admin-toast-banner.is-success {
  background: #064e3b;
  color: #34d399;
}

.admin-shell.light-theme .admin-toast-banner.is-success {
  background: #ecfdf5 !important;
  color: #065f46 !important;
  border-bottom-color: #a7f3d0 !important;
}

/* ==========================================================================
   OVERVIEW DASHBOARD PANEL
   ========================================================================== */
.overview-panel {
  padding: 1.75rem 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  max-width: 1560px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.overview-welcome-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  flex-wrap: wrap;
}

.admin-shell.light-theme .overview-welcome-card {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
}

.welcome-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #34d399;
  font-size: 0.7rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.admin-shell.light-theme .welcome-pill {
  background: #ecfdf5 !important;
  border-color: #a7f3d0 !important;
  color: #059669 !important;
}

.welcome-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: #f8fafc;
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.02em;
}

.admin-shell.light-theme .welcome-title {
  color: #000000 !important;
}

.welcome-desc {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0;
}

.admin-shell.light-theme .welcome-desc {
  color: #000000 !important;
}

.welcome-actions-group,
.welcome-card-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.welcome-cta-btn {
  padding: 0.65rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 10px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #fff !important;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  transition: transform 0.2s;
}

.welcome-cta-btn:hover {
  transform: translateY(-2px);
}

.welcome-secondary-btn {
  padding: 0.65rem 1.15rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
  transition: all 0.2s;
}

.admin-shell.light-theme .welcome-secondary-btn {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
  color: #1e293b !important;
}

/* Urgent Alert Banner */
.overview-urgent-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  padding: 1.15rem 1.5rem;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(217, 119, 6, 0.1) 100%);
  border: 1px solid rgba(245, 158, 11, 0.38);
  box-shadow: 0 8px 24px -6px rgba(245, 158, 11, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-wrap: wrap;
}

.overview-urgent-banner:hover {
  transform: translateY(-2px);
  border-color: rgba(245, 158, 11, 0.6);
  box-shadow: 0 12px 28px -6px rgba(245, 158, 11, 0.3);
}

.admin-shell.light-theme .overview-urgent-banner {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%) !important;
  border-color: #fde68a !important;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.1) !important;
}

.banner-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.banner-icon-badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(245, 158, 11, 0.2);
  border: 1px solid rgba(245, 158, 11, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.banner-head {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 800;
  font-size: 0.95rem;
  color: #fbbf24;
  flex-wrap: wrap;
}

.admin-shell.light-theme .banner-head {
  color: #92400e !important;
}

.action-req-chip {
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: #f59e0b;
  color: #000;
}

.banner-sub {
  font-size: 0.78rem;
  color: #e2e8f0;
  margin-top: 0.2rem;
  line-height: 1.4;
}

.admin-shell.light-theme .banner-sub {
  color: #78350f !important;
}

.banner-action-btn {
  padding: 0.55rem 1.15rem;
  font-size: 0.8rem;
  font-weight: 800;
  border-radius: 8px;
  background: #f59e0b;
  color: #000 !important;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);
}

/* KPI Grid */
.overview-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.kpi-card {
  padding: 1.35rem 1.5rem;
  border-radius: 14px;
  background: #0e1526;
  border: 1px solid rgba(255, 255, 255, 0.07);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}

.admin-shell.light-theme .kpi-card {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04) !important;
}

.kpi-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.5);
}

.admin-shell.light-theme .kpi-card:hover {
  border-color: #cbd5e1 !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
}

.kpi-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.kpi-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.kpi-icon-box.primary { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
.kpi-icon-box.warning { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
.kpi-icon-box.emerald { background: rgba(16, 185, 129, 0.15); color: #34d399; }
.kpi-icon-box.purple  { background: rgba(168, 85, 247, 0.15); color: #c084fc; }

.kpi-badge-pill {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
}

.kpi-badge-pill.green   { background: rgba(16, 185, 129, 0.14); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.25); }
.kpi-badge-pill.orange  { background: rgba(249, 115, 22, 0.14); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.25); }
.kpi-badge-pill.emerald { background: rgba(16, 185, 129, 0.14); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.25); }
.kpi-badge-pill.purple  { background: rgba(168, 85, 247, 0.14); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.25); }

.admin-shell.light-theme .kpi-badge-pill.green   { background: #ecfdf5 !important; color: #059669 !important; border-color: #a7f3d0 !important; }
.admin-shell.light-theme .kpi-badge-pill.orange  { background: #fff7ed !important; color: #c2410c !important; border-color: #fed7aa !important; }
.admin-shell.light-theme .kpi-badge-pill.emerald { background: #ecfdf5 !important; color: #047857 !important; border-color: #a7f3d0 !important; }
.admin-shell.light-theme .kpi-badge-pill.purple  { background: #faf5ff !important; color: #7e22ce !important; border-color: #e9d5ff !important; }

.kpi-value {
  font-size: 1.85rem;
  font-weight: 900;
  color: #f8fafc;
  line-height: 1.1;
  margin: 0.25rem 0;
  letter-spacing: -0.02em;
}

.admin-shell.light-theme .kpi-value {
  color: #000000 !important;
}

.kpi-label,
.kpi-card-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.admin-shell.light-theme .kpi-label,
.admin-shell.light-theme .kpi-card-label {
  color: #000000 !important;
}

.kpi-meta,
.kpi-footer {
  font-size: 0.74rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.text-gradient {
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.admin-shell.light-theme .text-gradient {
  background: linear-gradient(135deg, #1d4ed8 0%, #6b21a8 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.text-gradient-gold {
  background: linear-gradient(135deg, #fbbf24 0%, #f97316 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.admin-shell.light-theme .text-gradient-gold {
  background: linear-gradient(135deg, #b45309 0%, #c2410c 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.text-gradient-emerald {
  background: linear-gradient(135deg, #34d399 0%, #059669 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.admin-shell.light-theme .text-gradient-emerald {
  background: linear-gradient(135deg, #047857 0%, #065f46 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

/* Launchpad */
.overview-launchpad-section {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.section-block-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #f1f5f9;
  margin: 0;
}

.admin-shell.light-theme .section-block-title {
  color: #000000 !important;
}

.launchpad-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
}

.launch-card {
  padding: 1.15rem 1rem;
  border-radius: 12px;
  background: #0e1526;
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.85rem;
  color: inherit;
}

.admin-shell.light-theme .launch-card {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.launch-card:hover {
  transform: translateY(-2px);
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.06);
}

.admin-shell.light-theme .launch-card:hover {
  border-color: #2563eb !important;
  background: #f8fafc !important;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.launch-icon {
  font-size: 1.4rem;
}

.launch-info {
  flex: 1;
}

.launch-title {
  font-size: 0.85rem;
  font-weight: 800;
  color: #f1f5f9;
  margin-bottom: 0.2rem;
}

.admin-shell.light-theme .launch-title {
  color: #000000 !important;
}

.launch-desc {
  font-size: 0.7rem;
  color: #64748b;
  line-height: 1.3;
}

.admin-shell.light-theme .launch-desc {
  color: #000000 !important;
}

.launch-arrow {
  font-size: 0.85rem;
  color: #3b82f6;
  font-weight: 800;
  align-self: flex-end;
}

/* Dual Grid: Queue & System Health */
.overview-dual-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.5rem;
}

.overview-box-card {
  padding: 1.5rem;
  border-radius: 14px;
  background: #0e1526;
  border: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.admin-shell.light-theme .overview-box-card {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.box-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 0.85rem;
}

.admin-shell.light-theme .box-card-header {
  border-bottom-color: #e2e8f0 !important;
}

.box-card-title {
  font-size: 0.98rem;
  font-weight: 800;
  color: #f1f5f9;
}

.admin-shell.light-theme .box-card-title {
  color: #000000 !important;
}

.box-card-sub {
  font-size: 0.74rem;
  color: #64748b;
  margin-top: 0.15rem;
}

.admin-shell.light-theme .box-card-sub {
  color: #000000 !important;
}

.box-card-link {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
}

.box-card-link:hover {
  text-decoration: underline;
}

.empty-state-clean {
  text-align: center;
  padding: 2.5rem 1rem;
}

.empty-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
}

.empty-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: #f1f5f9;
}

.admin-shell.light-theme .empty-title {
  color: #000000 !important;
}

.empty-sub {
  font-size: 0.78rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.admin-shell.light-theme .empty-sub {
  color: #000000 !important;
}

.queue-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.queue-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.15s;
}

.admin-shell.light-theme .queue-item {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
}

.queue-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}

.admin-shell.light-theme .queue-item:hover {
  background: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
}

.queue-item-info {
  overflow: hidden;
}

.queue-item-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #f1f5f9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-shell.light-theme .queue-item-name {
  color: #000000 !important;
}

.queue-item-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  color: #94a3b8;
  margin-top: 0.2rem;
  flex-wrap: wrap;
}

.admin-shell.light-theme .queue-item-meta {
  color: #000000 !important;
}

.queue-reg-pill {
  font-family: var(--font-mono, monospace);
  font-weight: 700;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.admin-shell.light-theme .queue-reg-pill {
  color: #0284c7 !important;
  background: #e0f2fe !important;
}

.queue-item-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.queue-confirm-btn {
  padding: 0.4rem 0.85rem;
  font-size: 0.75rem;
  font-weight: 800;
  border-radius: 6px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #fff !important;
  border: none;
  cursor: pointer;
}

.queue-icon-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.admin-shell.light-theme .queue-icon-btn {
  background: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
  color: #000000 !important;
}

.system-health-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.health-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 0.78rem;
}

.admin-shell.light-theme .health-row {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
}

.health-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-weight: 600;
}

.admin-shell.light-theme .health-label {
  color: #000000 !important;
}

.health-dot-green {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.8);
}

.health-value {
  font-family: var(--font-mono, monospace);
  font-weight: 700;
  color: #e2e8f0;
  font-size: 0.75rem;
}

.admin-shell.light-theme .health-value {
  color: #000000 !important;
}

.quick-jump-chips {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.admin-shell.light-theme .quick-jump-chips {
  border-top-color: #e2e8f0 !important;
}

.jump-label {
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 700;
}

.admin-shell.light-theme .jump-label {
  color: #000000 !important;
}

.jump-chip {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.admin-shell.light-theme .jump-chip {
  background: #f1f5f9 !important;
  border: 1px solid #cbd5e1 !important;
  color: #000000 !important;
}

.jump-chip:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
  color: #60a5fa;
}

.admin-shell.light-theme .jump-chip:hover {
  background: #eff6ff !important;
  border-color: #3b82f6 !important;
  color: #1d4ed8 !important;
}

/* ==========================================================================
   TABLES & PANEL VISIBILITY (LIGHT & DARK THEMES)
   ========================================================================== */
.admin-tab-panel {
  padding: 1.75rem 2rem 3rem;
  max-width: 1560px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.panel-header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.panel-title {
  font-family: var(--font-heading, inherit);
  font-size: 1.35rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
  color: #f8fafc;
}

.admin-shell.light-theme .panel-title {
  color: #000000 !important;
}

.panel-subtitle {
  color: #94a3b8;
  font-size: 0.85rem;
  margin: 0;
}

.admin-shell.light-theme .panel-subtitle {
  color: #000000 !important;
}

.panel-filter-group {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

/* Filters & Inputs in Light & Dark Mode */
.admin-select-filter,
.admin-filter-select,
.admin-search-input,
.form-control,
input.form-control,
select.form-control,
textarea.form-control {
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  border-radius: 8px;
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #f8fafc;
  outline: none;
  transition: all 0.2s ease;
}

.admin-shell.light-theme .admin-select-filter,
.admin-shell.light-theme .admin-filter-select,
.admin-shell.light-theme .admin-search-input,
.admin-shell.light-theme .form-control,
.admin-shell.light-theme input.form-control,
.admin-shell.light-theme select.form-control,
.admin-shell.light-theme textarea.form-control {
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
  color: #000000 !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) !important;
}

.admin-shell.light-theme .form-control::placeholder,
.admin-shell.light-theme .admin-search-input::placeholder {
  color: #94a3b8 !important;
}

/* Table Card in Light & Dark Mode */
.admin-table-card {
  background: #0d1322;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.4);
}

.admin-shell.light-theme .admin-table-card {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.admin-data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.85rem;
}

.admin-data-table th {
  background: rgba(15, 23, 42, 0.95);
  padding: 0.95rem 1.15rem;
  color: #38bdf8;
  font-family: var(--font-mono, monospace);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;
}

.admin-shell.light-theme .admin-data-table th {
  background: #f1f5f9 !important;
  color: #000000 !important;
  font-weight: 800 !important;
  border-bottom: 2px solid #cbd5e1 !important;
}

.admin-data-table td {
  padding: 0.95rem 1.15rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
  vertical-align: middle;
}

.admin-shell.light-theme .admin-data-table td {
  color: #000000 !important;
  border-bottom: 1px solid #f1f5f9 !important;
}

.admin-data-table tbody tr:hover {
  background: rgba(59, 130, 246, 0.04);
}

.admin-shell.light-theme .admin-data-table tbody tr:hover {
  background: #f8fafc !important;
}

/* Badges & Pills in Tables */
.admin-reg-pill {
  font-family: var(--font-mono, monospace);
  font-weight: 800;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
  font-size: 0.78rem;
  white-space: nowrap;
}

.admin-shell.light-theme .admin-reg-pill {
  color: #0284c7 !important;
  background: #e0f2fe !important;
}

.admin-track-pill {
  font-weight: 700;
  font-size: 0.82rem;
  color: #f1f5f9;
}

.admin-shell.light-theme .admin-track-pill {
  color: #000000 !important;
}

.admin-status-chip {
  display: inline-block;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
}

/* Action Buttons in Light Mode */
.admin-shell.light-theme .btn-secondary {
  background: #f1f5f9 !important;
  border: 1px solid #cbd5e1 !important;
  color: #000000 !important;
}

.admin-shell.light-theme .btn-secondary:hover {
  background: #e2e8f0 !important;
  color: #000000 !important;
}

/* ==========================================================================
   MODALS THEME & VISIBILITY (ALL 11 MODALS)
   ========================================================================== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.admin-shell.light-theme .modal-overlay {
  background: rgba(15, 23, 42, 0.5) !important;
}

.modal-card,
.modal-content {
  background: #0f172a !important;
  color: #f8fafc !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 16px !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85) !important;
  max-height: 90vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.admin-shell.light-theme .modal-card,
.admin-shell.light-theme .modal-content {
  background: #ffffff !important;
  color: #000000 !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.18) !important;
}

.modal-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-shell.light-theme .modal-header {
  border-bottom: 1px solid #e2e8f0 !important;
  background: #f8fafc !important;
}

.modal-title,
.modal-header h3 {
  color: #f8fafc !important;
  font-weight: 800 !important;
  margin: 0;
}

.admin-shell.light-theme .modal-title,
.admin-shell.light-theme .modal-header h3 {
  color: #000000 !important;
}

.modal-close-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #cbd5e1;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.admin-shell.light-theme .modal-close-btn {
  background: #e2e8f0 !important;
  border-color: #cbd5e1 !important;
  color: #000000 !important;
}

.modal-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
}

.admin-shell.light-theme .modal-footer {
  border-top: 1px solid #e2e8f0 !important;
  background: #f8fafc !important;
}

.form-label,
label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #cbd5e1;
  margin-bottom: 0.35rem;
  display: block;
}

.admin-shell.light-theme .form-label,
.admin-shell.light-theme label {
  color: #000000 !important;
}

/* Control Center Modal Specific Light Theme */
.admin-shell.light-theme .control-center-modal .modal-header {
  background: #f8fafc !important;
  border-bottom: 1px solid #e2e8f0 !important;
}

.admin-shell.light-theme .control-center-modal .modal-footer {
  background: #f8fafc !important;
  border-top: 1px solid #e2e8f0 !important;
}

.admin-shell.light-theme .control-card-section {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
}

.admin-shell.light-theme .section-badge-title {
  color: #6b21a8 !important;
}

.admin-shell.light-theme .preset-badge-btn {
  background: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
  color: #000000 !important;
}

.admin-shell.light-theme .preset-badge-btn:hover {
  background: #f1f5f9 !important;
  color: #000000 !important;
}

.admin-shell.light-theme .toggle-card {
  background: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
}

.admin-shell.light-theme .toggle-card.is-active {
  background: #faf5ff !important;
  border-color: #a855f7 !important;
}

.admin-shell.light-theme .toggle-card-title {
  color: #000000 !important;
}

.admin-shell.light-theme .toggle-card.is-active .toggle-card-title {
  color: #6b21a8 !important;
}

.admin-shell.light-theme .toggle-card-desc {
  color: #000000 !important;
}

.admin-shell.light-theme .status-radio-card {
  background: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
  color: #000000 !important;
}

.admin-shell.light-theme .status-radio-card.is-selected {
  background: #faf5ff !important;
  border-color: #a855f7 !important;
}

/* ==========================================================================
   COMPREHENSIVE RESPONSIVE STYLES & SPACE MANAGEMENT FOR SUPERADMIN
   ========================================================================== */
.admin-shell {
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: clip !important;
}

.admin-main-canvas {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  overflow-x: clip !important;
  height: 100vh;
  height: 100dvh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 1400px) {
  .overview-kpi-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)) !important;
    gap: 1rem !important;
  }
  .overview-dual-grid {
    grid-template-columns: 1fr !important;
    gap: 1.25rem !important;
  }
}

@media (max-width: 1200px) {
  .launchpad-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 0.75rem !important;
  }
  .admin-grid-2col {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }
}

@media (max-width: 960px) {
  .sidebar-collapse-btn {
    display: none !important;
  }

  .sidebar-mobile-close-btn {
    display: flex !important;
  }

  .admin-mobile-toggle {
    display: flex !important;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .admin-mobile-toggle.active {
    background: rgba(249, 115, 22, 0.2) !important;
    border-color: rgba(249, 115, 22, 0.5) !important;
    color: #f97316 !important;
  }

  /* Keep header sticky always when navigating & scrolling page */
  .admin-top-command-bar {
    position: -webkit-sticky !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 1000 !important;
    width: 100% !important;
    box-sizing: border-box !important;
    padding: 0.65rem 1rem !important;
    gap: 0.65rem !important;
    background: rgba(11, 16, 29, 0.96) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  }

  .admin-shell.light-theme .admin-top-command-bar {
    background: rgba(255, 255, 255, 0.98) !important;
    border-bottom: 1px solid #e2e8f0 !important;
  }

  /* Dedicated full-height mobile drawer: cleanly overlays screen with zero header content collision */
  .admin-sidebar {
    position: fixed !important;
    top: 0 !important;
    left: -340px !important;
    bottom: 0 !important;
    width: min(310px, 86vw) !important;
    min-width: unset !important;
    max-width: 86vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    max-height: 100dvh !important;
    z-index: 100002 !important;
    box-shadow: 20px 0 60px rgba(0, 0, 0, 0.9) !important;
    transition: left 0.32s cubic-bezier(0.16, 1, 0.3, 1) !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    touch-action: pan-y !important;
  }

  .admin-sidebar.mobile-open {
    left: 0 !important;
  }

  /* Inside mobile sidebar: brand & footer are sticky, only content list is scrollable */
  .admin-sidebar .sidebar-brand,
  .admin-sidebar .sidebar-user-pill,
  .admin-sidebar .sidebar-bottom-actions {
    flex-shrink: 0 !important;
  }

  .admin-sidebar .sidebar-nav-scroll {
    flex: 1 !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    overscroll-behavior: contain !important;
    touch-action: pan-y !important;
  }

  /* Full screen dark backdrop behind mobile drawer */
  .admin-sidebar-backdrop {
    position: fixed !important;
    inset: 0 !important;
    background: rgba(0, 0, 0, 0.75) !important;
    backdrop-filter: blur(6px) !important;
    -webkit-backdrop-filter: blur(6px) !important;
    z-index: 100001 !important;
    touch-action: none !important;
    overscroll-behavior: contain !important;
  }

  /* Prevent page scrolling when side menu is open */
  .admin-main-canvas.canvas-locked {
    overflow-y: hidden !important;
    touch-action: none !important;
  }


  .command-bar-search,
  .command-search-bar {
    order: 3;
    width: 100% !important;
    max-width: 100% !important;
    margin-top: 0.35rem;
  }

  .command-bar-left {
    flex: 1;
    min-width: 0;
  }

  .command-bar-right {
    display: flex !important;
    align-items: center !important;
    gap: 0.4rem !important;
    flex-wrap: wrap !important;
    justify-content: flex-end !important;
  }

  .cloud-status-chip {
    display: flex !important;
    padding: 0.25rem 0.55rem !important;
    font-size: 0.72rem !important;
    border-radius: 20px;
    align-items: center;
    gap: 0.35rem;
  }

  .admin-tab-panel,
  .overview-panel {
    padding: 1rem 0.85rem 2.5rem !important;
    gap: 1.25rem !important;
  }

  .overview-welcome-card {
    padding: 1.25rem 1rem !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 1rem !important;
  }

  .welcome-actions-group,
  .welcome-card-actions {
    width: 100% !important;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    gap: 0.5rem !important;
  }

  .welcome-cta-btn,
  .welcome-secondary-btn {
    flex: 1 !important;
    min-width: 140px;
    text-align: center !important;
    justify-content: center !important;
  }

  .overview-urgent-banner {
    padding: 0.85rem 1rem !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0.75rem !important;
  }

  .banner-action-btn,
  .urgent-banner-cta {
    width: 100% !important;
    justify-content: center !important;
  }

  .launchpad-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.75rem !important;
  }

  .panel-header-controls {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0.85rem !important;
  }

  .panel-filter-group {
    width: 100% !important;
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 0.5rem !important;
  }

  .panel-filter-group input,
  .panel-filter-group select,
  .admin-select-filter,
  .admin-search-input {
    width: 100% !important;
    min-width: 0 !important;
  }

  .table-responsive {
    width: 100%;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
  }

  .modal-overlay {
    padding: 0.75rem !important;
    align-items: center !important;
  }

  .modal-card {
    width: 100% !important;
    max-width: 95vw !important;
    max-height: 90vh !important;
    margin: auto !important;
    border-radius: 14px !important;
  }
}

@media (max-width: 640px) {
  .overview-kpi-grid {
    grid-template-columns: 1fr !important;
    gap: 0.75rem !important;
  }

  .launchpad-grid {
    grid-template-columns: 1fr !important;
    gap: 0.65rem !important;
  }

  .queue-item {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0.75rem !important;
  }

  .queue-item-actions {
    width: 100% !important;
    display: flex !important;
    justify-content: flex-end !important;
    flex-wrap: wrap !important;
    gap: 0.35rem !important;
  }

  .admin-tab-panel {
    padding: 0.75rem 0.5rem 2rem !important;
  }

  .admin-table-card {
    border-radius: 8px !important;
    margin-bottom: 1.25rem !important;
  }

  .admin-data-table th,
  .admin-data-table td {
    padding: 0.65rem 0.6rem !important;
    font-size: 0.78rem !important;
    white-space: nowrap !important;
  }

  .command-bar-right {
    gap: 0.25rem !important;
  }

  .command-primary-btn,
  .command-secondary-btn {
    padding: 0.3rem 0.55rem !important;
    font-size: 0.74rem !important;
  }

  .command-alert-pill {
    padding: 0.3rem 0.5rem !important;
    font-size: 0.68rem !important;
  }

  .breadcrumb-root,
  .breadcrumb-sep {
    display: none !important;
  }

  .breadcrumb-current {
    font-size: 0.85rem !important;
    font-weight: 700 !important;
  }

  .overview-db-status-bar {
    padding: 0.75rem 0.85rem !important;
    gap: 0.5rem !important;
  }

  .modal-card {
    max-width: 98vw !important;
    max-height: 94vh !important;
    padding: 0 !important;
  }

  .modal-header {
    padding: 0.75rem 1rem !important;
  }

  .modal-body {
    padding: 0.85rem 1rem !important;
  }

  .modal-footer {
    padding: 0.75rem 1rem !important;
  }
}
</style>
