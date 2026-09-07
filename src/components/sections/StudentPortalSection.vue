<template>
  <div class="container student-portal-root" style="padding: 2.5rem 1.25rem 5rem; min-height: 85vh;">
    <!-- ================================================================= -->
    <!-- LOGGED IN VIEW: Full Student Dashboard                            -->
    <!-- ================================================================= -->
    <div v-if="studentUser" class="student-dashboard-wrap anim-stagger-1">
      <!-- 1. Top Executive Welcome Banner -->
      <div class="student-welcome-banner">
        <div class="student-welcome-main">
          <div class="student-avatar-badge">
            <span class="avatar-icon">🎓</span>
            <span class="online-indicator" title="Student Session Active"></span>
          </div>
          <div>
            <div class="student-welcome-badge">
              <span>● ACTIVE STUDENT PORTAL</span>
              <span class="reg-pill">ID: {{ studentUser.registrationNo || 'ITH-2026-001' }}</span>
            </div>
            <h1 class="student-welcome-name">
              Welcome, <span class="text-gradient">{{ studentUser.candidateName || 'Student' }}</span>!
            </h1>
            <div class="student-welcome-meta">
              <span>📚 {{ studentUser.course || '3-Month MERN Stack Web Engineer' }}</span>
              <span class="meta-dot">•</span>
              <span>⏰ Batch: {{ studentUser.batchTiming || 'Morning 10:00 AM - 01:00 PM' }}</span>
              <span class="meta-dot">•</span>
              <span style="color: #10b981; font-weight: 700;">✓ {{ studentUser.status || 'Active & Confirmed' }}</span>
            </div>
          </div>
        </div>

        <div class="student-banner-actions">
          <button class="btn-secondary id-card-btn" @click="showIdCardModal = true" title="View Virtual Student ID Card">
            <span>🪪 View ID Card</span>
          </button>
          <button class="btn-secondary student-logout-btn" @click="handleLogout" title="Sign out of student dashboard">
            <span>🚪 Logout</span>
          </button>
        </div>
      </div>

      <!-- 2. Dashboard Sub-Navigation Tabs -->
      <nav class="dashboard-tab-nav" aria-label="Student Dashboard Sections">
        <button 
          v-for="tab in studentTabs" 
          :key="tab.id"
          class="dash-nav-btn"
          :class="{ active: currentTab === tab.id }"
          @click="currentTab = tab.id"
        >
          <span class="dash-tab-icon">{{ tab.icon }}</span>
          <span class="dash-tab-label">{{ tab.label }}</span>
          <span v-if="tab.badge" class="dash-tab-badge">{{ tab.badge }}</span>
        </button>
      </nav>

      <!-- =============================================================== -->
      <!-- TAB 1: OVERVIEW & ACADEMIC HIGHLIGHTS                           -->
      <!-- =============================================================== -->
      <section v-if="currentTab === 'overview'" class="dash-tab-content">
        <!-- 4 Top KPI Cards -->
        <div class="overview-kpi-grid">
          <!-- Card 1: Course -->
          <div class="kpi-card" @click="currentTab = 'course'">
            <div class="kpi-icon-wrap" style="background: rgba(249, 115, 22, 0.15); color: var(--color-ai-orange);">
              📚
            </div>
            <div class="kpi-details">
              <div class="kpi-label">Enrolled Program</div>
              <div class="kpi-val">{{ studentUser.course || 'MERN Stack Web Engineer' }}</div>
              <div class="kpi-sub" style="color: #10b981;">Progress: 70% Completed →</div>
            </div>
          </div>

          <!-- Card 2: Attendance -->
          <div class="kpi-card" @click="currentTab = 'attendance'">
            <div class="kpi-icon-wrap" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
              📋
            </div>
            <div class="kpi-details">
              <div class="kpi-label">Overall Attendance</div>
              <div class="kpi-val text-gradient">{{ attendanceData.overallPercentage }}%</div>
              <div class="kpi-sub" style="color: #10b981;">✓ Eligible for Certification</div>
            </div>
          </div>

          <!-- Card 3: Scoreboard / Results -->
          <div class="kpi-card" @click="currentTab = 'scoreboard'">
            <div class="kpi-icon-wrap" style="background: rgba(250, 204, 21, 0.15); color: var(--color-ai-yellow);">
              🏆
            </div>
            <div class="kpi-details">
              <div class="kpi-label">Latest Exam Score</div>
              <div class="kpi-val">94 / 100 <span class="badge-rank">Rank #3</span></div>
              <div class="kpi-sub" style="color: var(--color-ai-yellow);">Grade A+ (Distinction) →</div>
            </div>
          </div>

          <!-- Card 4: Next Public Holiday -->
          <div class="kpi-card" @click="currentTab = 'calendar'">
            <div class="kpi-icon-wrap" style="background: rgba(6, 182, 212, 0.15); color: var(--color-ai-cyan);">
              📅
            </div>
            <div class="kpi-details">
              <div class="kpi-label">Upcoming Public Holiday</div>
              <div class="kpi-val">{{ nextUpcomingHoliday ? nextUpcomingHoliday.name : 'Festival Break' }}</div>
              <div class="kpi-sub" style="color: var(--color-ai-cyan);">
                {{ nextUpcomingHoliday ? formatHolidayDate(nextUpcomingHoliday.date) : '2026 Academic Calendar' }} →
              </div>
            </div>
          </div>
        </div>

        <!-- Two Column Overview Layout -->
        <div class="overview-dual-grid">
          <!-- Left: Current Learning Progress & Timetable -->
          <div class="dash-panel">
            <div class="panel-header">
              <div class="panel-title">
                <span>🚀</span> Current Syllabus & Lab Status
              </div>
              <button class="panel-link-btn" @click="currentTab = 'course'">View Full Syllabus →</button>
            </div>

            <div class="module-highlight-card">
              <div class="module-badge-row">
                <span class="status-pill status-ongoing">● Current Active Module</span>
                <span class="week-pill">Week 8 - 9</span>
              </div>
              <h3 class="module-title">Module 4: MongoDB, Mongoose & Cloud Databases</h3>
              <p class="module-desc">
                Covering document data modeling, aggregation pipelines, Firestore hybrid sync, and ACID transactions.
              </p>

              <!-- Progress Bar -->
              <div class="progress-bar-wrap">
                <div class="progress-label-row">
                  <span>Module Progress</span>
                  <strong>75%</strong>
                </div>
                <div class="progress-track">
                  <div class="progress-fill" style="width: 75%;"></div>
                </div>
              </div>
            </div>

            <!-- Today's Class Schedule -->
            <div class="schedule-card">
              <div class="schedule-header">
                <span class="badge-today">TODAY'S LAB SESSION</span>
                <span class="schedule-time">10:00 AM - 01:00 PM</span>
              </div>
              <div class="schedule-topic">
                <strong>Topic:</strong> Mongoose Aggregation & Pipeline Optimization
              </div>
              <div class="schedule-mentor">
                <strong>Mentor:</strong> {{ studentUser.mentor || 'Mr. Lakshman Singh Chauhan' }} (Lead Architect)
              </div>
              <div class="schedule-room">
                <strong>Location:</strong> IT HUNT Lab Station 04, Holagarh Campus
              </div>
            </div>
          </div>

          <!-- Right: Quick Scoreboard & Attendance Glance -->
          <div class="dash-panel">
            <div class="panel-header">
              <div class="panel-title">
                <span>🏆</span> Batch Scoreboard & Top Performers
              </div>
              <button class="panel-link-btn" @click="currentTab = 'scoreboard'">Full Scoreboard →</button>
            </div>

            <div class="mini-scoreboard-list">
              <div 
                v-for="(res, idx) in allExamResults.slice(0, 4)" 
                :key="res.registrationNo"
                class="mini-score-item"
                :class="{ 'is-current-user': isCurrentStudent(res) }"
              >
                <div class="mini-rank-pill">#{{ res.rank }}</div>
                <div class="mini-student-info">
                  <div class="mini-student-name">
                    {{ res.studentName }}
                    <span v-if="isCurrentStudent(res)" class="you-badge">YOU</span>
                  </div>
                  <div class="mini-student-course">{{ res.course }}</div>
                </div>
                <div class="mini-score-right">
                  <div class="mini-score-val">{{ res.marksObtained }}/{{ res.maxMarks }}</div>
                  <div class="mini-score-grade">{{ res.grade }}</div>
                </div>
              </div>
            </div>

            <!-- Quick Holiday Reminder Widget -->
            <div class="quick-holiday-widget" @click="currentTab = 'calendar'">
              <div class="quick-holiday-icon">🏖️</div>
              <div>
                <div class="quick-holiday-title">
                  Public Holidays Calendar (2026)
                </div>
                <div class="quick-holiday-desc">
                  All Gazetted, Festival, & National holidays marked for your batch. Click to inspect calendar.
                </div>
              </div>
              <div class="quick-holiday-arrow">→</div>
            </div>
          </div>
        </div>
      </section>

      <!-- =============================================================== -->
      <!-- TAB 2: STUDENT PROFILE & EDIT DETAILS                           -->
      <!-- =============================================================== -->
      <section v-else-if="currentTab === 'profile'" class="dash-tab-content">
        <div class="dash-panel">
          <div class="panel-header">
            <div>
              <h2 class="panel-title" style="font-size: 1.4rem;">
                <span>👤</span> Student Official Details & Profile Editor
              </h2>
              <p class="panel-subtitle">
                Keep your candidate information updated for academic verification, NIELIT project filing, and certification.
              </p>
            </div>
            <button type="button" class="btn-secondary" @click="showIdCardModal = true">
              <span>🪪 Preview ID Card</span>
            </button>
          </div>

          <!-- Quick Readonly Card Snapshot -->
          <div class="profile-snapshot-grid">
            <div class="snapshot-item">
              <div class="snap-lbl">Student Registration ID</div>
              <div class="snap-val" style="color: var(--color-ai-orange); font-family: var(--font-mono);">
                {{ studentUser.registrationNo || 'ITH-2026-001' }}
              </div>
            </div>
            <div class="snapshot-item">
              <div class="snap-lbl">Admission Date</div>
              <div class="snap-val">{{ studentUser.admissionDate || '15 Jan 2026' }}</div>
            </div>
            <div class="snapshot-item">
              <div class="snap-lbl">Enrollment Status</div>
              <div class="snap-val" style="color: #10b981;">{{ studentUser.status || 'Active & Confirmed ✓' }}</div>
            </div>
            <div class="snapshot-item">
              <div class="snap-lbl">Batch Allocation</div>
              <div class="snap-val">{{ studentUser.batchCode || 'ITH-MERN-B1' }} ({{ studentUser.batchTiming || '10 AM - 1 PM' }})</div>
            </div>
          </div>

          <!-- Edit Profile Form -->
          <form @submit.prevent="saveProfileUpdates" class="student-edit-form">
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Full Candidate Name <span class="req">*</span></label>
                <input type="text" v-model="editForm.candidateName" required class="form-control">
              </div>

              <div class="form-group">
                <label class="form-label">Father's Name <span class="req">*</span></label>
                <input type="text" v-model="editForm.fatherName" required class="form-control">
              </div>

              <div class="form-group">
                <label class="form-label">Mother's Name <span class="req">*</span></label>
                <input type="text" v-model="editForm.motherName" required class="form-control">
              </div>

              <div class="form-group">
                <label class="form-label">Date of Birth (DOB) <span class="req">*</span></label>
                <input type="date" v-model="editForm.dob" required class="form-control">
              </div>

              <div class="form-group">
                <label class="form-label">Gender <span class="req">*</span></label>
                <select v-model="editForm.gender" class="form-control" required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Contact Mobile Number <span class="req">*</span></label>
                <input type="tel" v-model="editForm.mobile" pattern="[0-9]{10}" required class="form-control">
              </div>

              <div class="form-group">
                <label class="form-label">Email Address <span class="req">*</span></label>
                <input type="email" v-model="editForm.email" required class="form-control">
              </div>

              <div class="form-group">
                <label class="form-label">District / City <span class="req">*</span></label>
                <input type="text" v-model="editForm.district" required class="form-control">
              </div>

              <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Permanent Residential Address <span class="req">*</span></label>
                <textarea v-model="editForm.address" rows="3" required class="form-control"></textarea>
              </div>
            </div>

            <div class="form-footer-actions">
              <div v-if="successMsg" class="success-alert-pill">
                ✓ {{ successMsg }}
              </div>
              <button type="submit" class="btn-primary save-btn">
                <span>Save & Update Profile Details 💾</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Student Security & Password Management Card -->
        <div class="dash-panel" style="margin-top: 2rem;">
          <div class="panel-header">
            <div>
              <h3 class="panel-title" style="font-size: 1.3rem;">
                <span>🔐</span> Student Security & Login Password
              </h3>
              <p class="panel-subtitle">
                Your registered email is your student User ID. You can change your default password (<code>Ithunt@123</code>) to your own private password below.
              </p>
            </div>
            <span class="status-pill status-active">
              User ID: {{ studentUser.email }}
            </span>
          </div>

          <form @submit.prevent="handlePasswordChange" class="student-password-form">
            <div class="form-grid-3">
              <div class="form-group">
                <label class="form-label">Current Password <span class="req">*</span></label>
                <div class="password-input-wrap">
                  <input 
                    :type="showOldPass ? 'text' : 'password'" 
                    v-model="passwordForm.oldPassword" 
                    required 
                    class="form-control" 
                    placeholder="Current password (default: Ithunt@123)"
                  >
                  <button type="button" class="eye-toggle-btn" @click="showOldPass = !showOldPass" :title="showOldPass ? 'Hide' : 'Show'">
                    {{ showOldPass ? '🙈' : '👁️' }}
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">New Password <span class="req">*</span></label>
                <div class="password-input-wrap">
                  <input 
                    :type="showNewPass ? 'text' : 'password'" 
                    v-model="passwordForm.newPassword" 
                    required 
                    minlength="6"
                    class="form-control" 
                    placeholder="New password (min. 6 chars)"
                  >
                  <button type="button" class="eye-toggle-btn" @click="showNewPass = !showNewPass" :title="showNewPass ? 'Hide' : 'Show'">
                    {{ showNewPass ? '🙈' : '👁️' }}
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Confirm New Password <span class="req">*</span></label>
                <div class="password-input-wrap">
                  <input 
                    :type="showConfirmPass ? 'text' : 'password'" 
                    v-model="passwordForm.confirmPassword" 
                    required 
                    minlength="6"
                    class="form-control" 
                    placeholder="Confirm new password"
                  >
                  <button type="button" class="eye-toggle-btn" @click="showConfirmPass = !showConfirmPass" :title="showConfirmPass ? 'Hide' : 'Show'">
                    {{ showConfirmPass ? '🙈' : '👁️' }}
                  </button>
                </div>
              </div>
            </div>

            <div v-if="passwordError" class="login-error-alert" style="margin-top: 1.25rem;">
              <span style="font-size: 1.2rem;">⚠️</span>
              <div>{{ passwordError }}</div>
            </div>

            <div v-if="passwordSuccess" class="success-alert-pill" style="margin-top: 1.25rem; display: inline-block;">
              ✓ {{ passwordSuccess }}
            </div>

            <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end;">
              <button type="submit" class="btn-primary save-btn" :disabled="isChangingPass">
                <span v-if="isChangingPass" class="spinner-inline"></span>
                <span>{{ isChangingPass ? 'Updating Password...' : 'Update & Save New Password 🔒' }}</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- =============================================================== -->
      <!-- TAB 3: COURSE ENROLL STATUS & DETAILED SYLLABUS                 -->
      <!-- =============================================================== -->
      <section v-else-if="currentTab === 'course'" class="dash-tab-content">
        <div class="dash-panel" style="margin-bottom: 2rem;">
          <div class="panel-header">
            <div>
              <h2 class="panel-title" style="font-size: 1.4rem;">
                <span>📚</span> Course Enrollment Status & Academic Ledger
              </h2>
              <p class="panel-subtitle">
                Official accreditation, syllabus progression, and fee receipt record.
              </p>
            </div>
            <span class="status-pill status-active">✓ Enrollment Confirmed</span>
          </div>

          <!-- Course Header Card -->
          <div class="course-master-card">
            <div class="course-master-top">
              <div>
                <span class="program-tag">PROFESSIONAL DIPLOMA & INTERNSHIP</span>
                <h3 class="course-name">{{ studentUser.course || '3-Month MERN Stack Web Engineer' }}</h3>
                <p class="course-mentor-text">
                  Supervised by: <strong>{{ studentUser.mentor || 'Mr. Lakshman Singh Chauhan' }}</strong> (Lead Software Architect & Director)
                </p>
              </div>
              <div class="course-completion-circle">
                <div class="circle-val">70%</div>
                <div class="circle-lbl">Completed</div>
              </div>
            </div>

            <div class="course-meta-pills">
              <div class="meta-pill">
                <span class="meta-icon">⏳</span>
                <span>Duration: 12 Weeks (90 Days)</span>
              </div>
              <div class="meta-pill">
                <span class="meta-icon">🏢</span>
                <span>Batch: {{ studentUser.batchCode || 'ITH-MERN-B1' }}</span>
              </div>
              <div class="meta-pill">
                <span class="meta-icon">⏰</span>
                <span>Hours: {{ studentUser.batchTiming || '10:00 AM - 01:00 PM' }}</span>
              </div>
              <div class="meta-pill">
                <span class="meta-icon">📍</span>
                <span>Station: Workstation #04 (Lab)</span>
              </div>
            </div>

            <!-- Fee Status Ledger Row -->
            <div class="fee-ledger-box">
              <div class="fee-col">
                <div class="fee-lbl">Total Program Fee</div>
                <div class="fee-val">₹{{ (studentUser.totalFee || 15000).toLocaleString() }}</div>
              </div>
              <div class="fee-col">
                <div class="fee-lbl">Fee Paid to Date</div>
                <div class="fee-val" style="color: #10b981;">₹{{ (studentUser.paidFee || 15000).toLocaleString() }}</div>
              </div>
              <div class="fee-col">
                <div class="fee-lbl">Balance Due</div>
                <div class="fee-val" style="color: #64748b;">₹{{ (studentUser.balanceFee || 0).toLocaleString() }}</div>
              </div>
              <div class="fee-col fee-status-col">
                <div class="fee-lbl">Ledger Status</div>
                <span class="fee-badge-paid">✓ Paid in Full</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Modular Syllabus Breakdown -->
        <div class="dash-panel">
          <div class="panel-header">
            <h3 class="panel-title">
              <span>📋</span> Modular Syllabus & Curriculum Checklist
            </h3>
            <span style="font-size: 0.85rem; color: var(--text-muted);">4 of 6 Modules Completed</span>
          </div>

          <div class="modules-accordion">
            <div 
              v-for="mod in courseModules" 
              :key="mod.id" 
              class="module-card-item"
              :class="'mod-' + mod.status.toLowerCase().replace(' ', '-')"
            >
              <div class="mod-header-row">
                <div class="mod-title-col">
                  <div class="mod-status-indicator">
                    <span v-if="mod.status === 'Completed'" style="color: #10b981;">✓</span>
                    <span v-else-if="mod.status === 'In Progress'" style="color: var(--color-ai-orange);">🔄</span>
                    <span v-else style="color: var(--text-muted);">⏳</span>
                  </div>
                  <div>
                    <h4 class="mod-title">{{ mod.title }}</h4>
                    <span class="mod-duration">{{ mod.duration }} • Evaluation Grade: <strong>{{ mod.grade }}</strong></span>
                  </div>
                </div>

                <span 
                  class="status-pill"
                  :class="{
                    'status-done': mod.status === 'Completed',
                    'status-ongoing': mod.status === 'In Progress',
                    'status-pending': mod.status === 'Upcoming'
                  }"
                >
                  {{ mod.status }}
                </span>
              </div>

              <!-- Topic tags -->
              <div class="topic-tag-list">
                <span v-for="(top, ti) in mod.topics" :key="ti" class="topic-tag">
                  {{ top }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- =============================================================== -->
      <!-- TAB 4: ACADEMIC CALENDAR WITH MARKED PUBLIC HOLIDAYS            -->
      <!-- =============================================================== -->
      <section v-else-if="currentTab === 'calendar'" class="dash-tab-content">
        <div class="dash-panel" style="margin-bottom: 2rem;">
          <div class="panel-header calendar-nav-header">
            <div>
              <h2 class="panel-title" style="font-size: 1.4rem;">
                <span>📅</span> 2026 Academic Calendar & Public Holidays
              </h2>
              <p class="panel-subtitle">
                Official Indian public holidays, festival breaks, and institute lab schedules. Marked in colorful badges.
              </p>
            </div>

            <!-- Month Controls -->
            <div class="cal-controls">
              <button class="cal-nav-btn" @click="prevMonth" title="Previous Month">‹</button>
              <span class="current-month-display">{{ monthNames[calMonth] }} {{ calYear }}</span>
              <button class="cal-nav-btn" @click="nextMonth" title="Next Month">›</button>
              <button class="cal-today-btn" @click="setToday">Today</button>
            </div>
          </div>

          <!-- Interactive Calendar Grid Layout -->
          <div class="calendar-layout-grid">
            <!-- Left: Calendar Matrix -->
            <div class="cal-matrix-card">
              <!-- Weekday Headers -->
              <div class="cal-weekdays-row">
                <div v-for="d in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="d" class="weekday-cell" :class="{ 'weekend-head': d === 'Sun' }">
                  {{ d }}
                </div>
              </div>

              <!-- Month Days Grid -->
              <div class="cal-days-grid">
                <!-- Padding days from previous month -->
                <div 
                  v-for="p in calendarDays.prefixDays" 
                  :key="'pad-' + p" 
                  class="cal-day-cell cal-day-muted"
                >
                  <span class="day-num">{{ p }}</span>
                </div>

                <!-- Active Month Days -->
                <div 
                  v-for="dayObj in calendarDays.monthDays" 
                  :key="dayObj.dateString"
                  class="cal-day-cell"
                  :class="{
                    'is-holiday': dayObj.holiday,
                    'is-sunday': dayObj.isSunday,
                    'is-selected': selectedDate === dayObj.dateString,
                    'is-today': dayObj.isToday
                  }"
                  @click="selectDate(dayObj)"
                >
                  <div class="day-num-row">
                    <span class="day-num">{{ dayObj.dayNumber }}</span>
                    <span v-if="dayObj.isToday" class="today-marker">TODAY</span>
                  </div>

                  <!-- Holiday Chip if marked -->
                  <div v-if="dayObj.holiday" class="cal-holiday-chip" :style="{ backgroundColor: dayObj.holiday.color + '25', borderColor: dayObj.holiday.color }">
                    <span class="holiday-chip-text">{{ dayObj.holiday.name }}</span>
                  </div>
                  <div v-else-if="dayObj.isSunday" class="weekend-tag">
                    Off
                  </div>
                </div>
              </div>

              <!-- Legend Bar -->
              <div class="cal-legend-bar">
                <span class="legend-item">
                  <span class="legend-dot" style="background: #f97316;"></span> Public / Gazetted Holiday
                </span>
                <span class="legend-item">
                  <span class="legend-dot" style="background: #a855f7;"></span> Festival Break
                </span>
                <span class="legend-item">
                  <span class="legend-dot" style="background: #3b82f6;"></span> Lab / Class Day
                </span>
                <span class="legend-item">
                  <span class="legend-dot" style="background: #64748b;"></span> Sunday / Off
                </span>
              </div>
            </div>

            <!-- Right: Selected Day Details Inspector -->
            <div class="cal-inspector-card">
              <div class="inspector-header">
                <span class="inspector-tag">DATE INSPECTOR</span>
                <h3 class="inspector-date">{{ formatInspectorDate(selectedDate) }}</h3>
              </div>

              <!-- Case A: Date has Public Holiday -->
              <div v-if="selectedHoliday" class="holiday-detail-box" :style="{ borderColor: selectedHoliday.color }">
                <div class="holiday-type-pill" :style="{ background: selectedHoliday.color + '30', color: selectedHoliday.color }">
                  {{ selectedHoliday.badge }}
                </div>
                <h4 class="holiday-detail-name">{{ selectedHoliday.name }}</h4>
                <p class="holiday-detail-desc">{{ selectedHoliday.desc }}</p>
                <div class="holiday-detail-notice">
                  🏖️ <strong>Academy Status:</strong> Institute Closed for Public Holiday.
                </div>
              </div>

              <!-- Case B: Regular Sunday -->
              <div v-else-if="isDateSunday(selectedDate)" class="regular-day-box">
                <div class="holiday-type-pill" style="background: rgba(100, 116, 139, 0.2); color: #94a3b8;">
                  WEEKEND
                </div>
                <h4 class="regular-day-title">Sunday Weekend Break</h4>
                <p class="regular-day-desc">
                  Scheduled institute rest day. Self-paced coding assignments & optional doubt clearing sessions.
                </p>
              </div>

              <!-- Case C: Regular Class / Lab Day -->
              <div v-else class="regular-day-box">
                <div class="holiday-type-pill" style="background: rgba(16, 185, 129, 0.2); color: #10b981;">
                  WORKING DAY
                </div>
                <h4 class="regular-day-title">Regular Lab & Theory Class</h4>
                <p class="regular-day-desc">
                  Session timings: 10:00 AM - 01:00 PM. Workstation Lab Session #04.
                </p>
              </div>

              <!-- Upcoming Holidays Quick List -->
              <div class="upcoming-holidays-box">
                <h4 class="upcoming-head">🌟 Upcoming 2026 Public Holidays</h4>
                <div class="upcoming-list">
                  <div 
                    v-for="hol in publicHolidaysList.slice(0, 5)" 
                    :key="hol.date" 
                    class="upcoming-item"
                    @click="jumpToHoliday(hol)"
                  >
                    <div class="upcoming-date-badge" :style="{ color: hol.color }">
                      {{ formatShortDate(hol.date) }}
                    </div>
                    <div class="upcoming-info">
                      <div class="upcoming-name">{{ hol.name }}</div>
                      <div class="upcoming-type">{{ hol.day }} • {{ hol.type }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- =============================================================== -->
      <!-- TAB 5: SCOREBOARD & ALL STUDENT EXAM RESULTS                    -->
      <!-- =============================================================== -->
      <section v-else-if="currentTab === 'scoreboard'" class="dash-tab-content">
        <div class="dash-panel">
          <div class="panel-header scoreboard-header-wrap">
            <div>
              <h2 class="panel-title" style="font-size: 1.4rem;">
                <span>🏆</span> Batch Exam Scoreboard & Leaderboard
              </h2>
              <p class="panel-subtitle">
                Official marks & rankings for all enrolled students in the batch assessment.
              </p>
            </div>

            <!-- Exam Selector Dropdown -->
            <div class="exam-selector-wrap">
              <label class="exam-sel-lbl">Select Exam:</label>
              <select v-model="selectedExamId" class="form-control exam-select">
                <option v-for="ex in availableExams" :key="ex.id" :value="ex.id">
                  {{ ex.title }}
                </option>
              </select>
            </div>
          </div>

          <!-- Current Student Personal Scorecard Highlight -->
          <div class="personal-scorecard-card">
            <div class="personal-score-left">
              <span class="score-badge">YOUR PERSONAL PERFORMANCE RECORD</span>
              <h3 class="personal-score-name">
                {{ currentStudentResult ? currentStudentResult.studentName : (studentUser.candidateName || 'Student') }}
                <span class="you-pill">LOGGED IN</span>
              </h3>
              <div class="personal-score-meta">
                Exam: <strong>{{ currentExamTitle }}</strong> | Roll No: {{ studentUser.registrationNo || 'ITH-2026-001' }}
              </div>
            </div>

            <div class="personal-score-stats">
              <div class="score-stat-box">
                <div class="stat-lbl">Batch Rank</div>
                <div class="stat-val rank-val text-gradient">
                  #{{ currentStudentResult ? currentStudentResult.rank : 3 }}
                </div>
              </div>
              <div class="score-stat-box">
                <div class="stat-lbl">Total Marks</div>
                <div class="stat-val">
                  {{ currentStudentResult ? currentStudentResult.marksObtained : 94 }} <span class="max-denom">/ 100</span>
                </div>
              </div>
              <div class="score-stat-box">
                <div class="stat-lbl">Percentage</div>
                <div class="stat-val" style="color: #10b981;">
                  {{ currentStudentResult ? currentStudentResult.percentage : 94 }}%
                </div>
              </div>
              <div class="score-stat-box">
                <div class="stat-lbl">Grade</div>
                <div class="stat-val" style="color: var(--color-ai-yellow);">
                  {{ currentStudentResult ? currentStudentResult.grade.split(' ')[0] : 'A+' }}
                </div>
              </div>
            </div>
          </div>

          <!-- Search & Filter Controls -->
          <div class="scoreboard-filter-row">
            <div class="search-input-wrap">
              <span class="search-icon">🔍</span>
              <input 
                type="text" 
                v-model="studentFilterQuery" 
                placeholder="Search student by name or Reg No..."
                class="form-control scoreboard-search"
              >
            </div>
            <div class="score-count-badge">
              Displaying {{ filteredScoreboard.length }} Registered Students
            </div>
          </div>

          <!-- All Students Scoreboard Table -->
          <div class="table-responsive">
            <table class="scoreboard-table">
              <thead>
                <tr>
                  <th style="width: 70px; text-align: center;">Rank</th>
                  <th>Student Name & Reg No</th>
                  <th>Course / Program</th>
                  <th style="text-align: center;">Marks (100)</th>
                  <th style="text-align: center;">Percentage</th>
                  <th style="text-align: center;">Grade</th>
                  <th style="text-align: center;">Result</th>
                  <th>Distinction / Honor</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="res in filteredScoreboard" 
                  :key="res.registrationNo"
                  :class="{ 'highlight-current-student': isCurrentStudent(res) }"
                >
                  <!-- Rank -->
                  <td style="text-align: center;">
                    <span 
                      class="rank-badge"
                      :class="{
                        'rank-1': res.rank === 1,
                        'rank-2': res.rank === 2,
                        'rank-3': res.rank === 3
                      }"
                    >
                      {{ res.rank === 1 ? '🥇 1' : res.rank === 2 ? '🥈 2' : res.rank === 3 ? '🥉 3' : '#' + res.rank }}
                    </span>
                  </td>

                  <!-- Student Details -->
                  <td>
                    <div class="table-student-name">
                      <span>{{ res.avatar || '👨‍💻' }}</span>
                      <strong>{{ res.studentName }}</strong>
                      <span v-if="isCurrentStudent(res)" class="you-badge">YOU</span>
                    </div>
                    <div class="table-reg-no">{{ res.registrationNo }}</div>
                  </td>

                  <!-- Course -->
                  <td>
                    <span class="table-course-pill">{{ res.course }}</span>
                  </td>

                  <!-- Marks -->
                  <td style="text-align: center; font-weight: 800; font-family: var(--font-mono); font-size: 1rem;">
                    {{ res.marksObtained }} / {{ res.maxMarks }}
                  </td>

                  <!-- Percentage -->
                  <td style="text-align: center; font-weight: 700; color: #10b981;">
                    {{ res.percentage }}%
                  </td>

                  <!-- Grade -->
                  <td style="text-align: center;">
                    <span class="grade-pill" :class="'grade-' + res.grade.charAt(0)">
                      {{ res.grade }}
                    </span>
                  </td>

                  <!-- Result -->
                  <td style="text-align: center;">
                    <span class="status-pill status-done">✓ {{ res.status }}</span>
                  </td>

                  <!-- Distinction -->
                  <td>
                    <span class="distinction-tag">{{ res.distinction }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- =============================================================== -->
      <!-- TAB 6: ATTENDANCE SHEET & DAILY LOG                             -->
      <!-- =============================================================== -->
      <section v-else-if="currentTab === 'attendance'" class="dash-tab-content">
        <!-- Attendance Stats Summary Cards -->
        <div class="attendance-kpi-grid">
          <div class="kpi-card">
            <div class="kpi-icon-wrap" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
              📊
            </div>
            <div class="kpi-details">
              <div class="kpi-label">Cumulative Attendance</div>
              <div class="kpi-val text-gradient">{{ attendanceData.overallPercentage }}%</div>
              <div class="kpi-sub" style="color: #10b981;">Required: 75% Minimum</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon-wrap" style="background: rgba(59, 130, 246, 0.15); color: #3b82f6;">
              📅
            </div>
            <div class="kpi-details">
              <div class="kpi-label">Total Institute Days</div>
              <div class="kpi-val">{{ attendanceData.totalSessions }} Sessions</div>
              <div class="kpi-sub">{{ attendanceData.currentMonth }}</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon-wrap" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
              ✅
            </div>
            <div class="kpi-details">
              <div class="kpi-label">Present Days</div>
              <div class="kpi-val" style="color: #10b981;">{{ attendanceData.presentCount }} Days</div>
              <div class="kpi-sub">On-Time Lab Punches</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon-wrap" style="background: rgba(239, 68, 68, 0.15); color: #ef4444;">
              ⚠️
            </div>
            <div class="kpi-details">
              <div class="kpi-label">Absences / Leaves</div>
              <div class="kpi-val">{{ attendanceData.absentCount }} Abs • {{ attendanceData.leaveCount }} Leave</div>
              <div class="kpi-sub" style="color: #f59e0b;">Approved on file</div>
            </div>
          </div>
        </div>

        <!-- Monthly Punch Card Visual Grid -->
        <div class="dash-panel" style="margin-bottom: 2rem;">
          <div class="panel-header">
            <div>
              <h3 class="panel-title">
                <span>🟢</span> Monthly Attendance Punch Matrix ({{ attendanceData.currentMonth }})
              </h3>
              <p class="panel-subtitle">
                Visual day-by-day punch record. Verified by biometric card reader at IT HUNT laboratory.
              </p>
            </div>
            <div class="punch-legend">
              <span class="p-leg"><span class="leg-box leg-p"></span> Present</span>
              <span class="p-leg"><span class="leg-box leg-a"></span> Absent</span>
              <span class="p-leg"><span class="leg-box leg-l"></span> Leave</span>
              <span class="p-leg"><span class="leg-box leg-h"></span> Holiday</span>
              <span class="p-leg"><span class="leg-box leg-off"></span> Sunday</span>
            </div>
          </div>

          <!-- Day-by-Day Punch Tiles (1 - 31) -->
          <div class="punch-matrix-grid">
            <div 
              v-for="log in dailyAttendance" 
              :key="log.date"
              class="punch-tile"
              :class="'punch-' + log.status.toLowerCase()"
              :title="log.date + ' (' + log.day + '): ' + log.status + ' - ' + log.topic"
            >
              <div class="punch-date-num">{{ parseInt(log.date.split('-')[2]) }}</div>
              <div class="punch-status-code">
                {{ log.status === 'Present' ? 'P' : log.status === 'Absent' ? 'A' : log.status === 'Leave' ? 'L' : log.status === 'Holiday' ? 'H' : 'OFF' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Daily Attendance Sheet Table -->
        <div class="dash-panel">
          <div class="panel-header">
            <div>
              <h3 class="panel-title">
                <span>📋</span> Daily Attendance & Lab Session Sheet
              </h3>
              <p class="panel-subtitle">
                Complete audit log with punch-in, punch-out, topics, and lab hours.
              </p>
            </div>
            <button type="button" class="btn-secondary" @click="printAttendanceSheet">
              <span>🖨️ Export Attendance Sheet</span>
            </button>
          </div>

          <div class="table-responsive">
            <table class="attendance-table">
              <thead>
                <tr>
                  <th>Date & Day</th>
                  <th>Session Curriculum Topic</th>
                  <th style="text-align: center;">In Time</th>
                  <th style="text-align: center;">Out Time</th>
                  <th style="text-align: center;">Lab Hours</th>
                  <th style="text-align: center;">Punch Status</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="item in dailyAttendance" 
                  :key="item.date"
                  :class="{ 'row-holiday': item.status === 'Holiday', 'row-weekend': item.status === 'OFF' }"
                >
                  <!-- Date & Day -->
                  <td>
                    <strong>{{ formatLogDate(item.date) }}</strong>
                    <div class="text-dim" style="font-size: 0.78rem;">{{ item.day }}</div>
                  </td>

                  <!-- Curriculum Topic -->
                  <td>
                    <span :style="{ fontWeight: item.status === 'Holiday' ? '700' : 'normal', color: item.status === 'Holiday' ? 'var(--color-ai-orange)' : 'inherit' }">
                      {{ item.topic }}
                    </span>
                  </td>

                  <!-- In Time -->
                  <td style="text-align: center; font-family: var(--font-mono); font-size: 0.85rem;">
                    {{ item.timeIn }}
                  </td>

                  <!-- Out Time -->
                  <td style="text-align: center; font-family: var(--font-mono); font-size: 0.85rem;">
                    {{ item.timeOut }}
                  </td>

                  <!-- Lab Hours -->
                  <td style="text-align: center; font-weight: 700;">
                    {{ item.hours }}
                  </td>

                  <!-- Status -->
                  <td style="text-align: center;">
                    <span 
                      class="punch-badge"
                      :class="'p-badge-' + item.status.toLowerCase()"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>

    <!-- ================================================================= -->
    <!-- LOGGED OUT VIEW: Quick Redirect to Unified Login                  -->
    <!-- ================================================================= -->
    <div v-else class="student-auth-wrap anim-stagger-1" style="max-width: 520px; margin: 2rem auto; text-align: center; background: var(--bg-card-glass); border: 1px solid var(--border-cyber); padding: 3.5rem 2rem; border-radius: var(--radius-xl);">
      <div style="font-size: 3.5rem; margin-bottom: 1rem;">🎓</div>
      <h2 style="font-family: var(--font-heading); font-size: 1.75rem; margin-bottom: 0.75rem;">
        Student Session Not Active
      </h2>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.6;">
        Please sign in through the unified login portal to access your personalized course details, academic calendar, batch scoreboard, and attendance sheet.
      </p>
      <button class="btn-primary" style="padding: 0.9rem 2.25rem; font-size: 1rem;" @click="$emit('go-to-login')">
        <span>Go to Unified Login Portal 🔐</span>
      </button>
    </div>

    <!-- ================================================================= -->
    <!-- MODAL: Virtual Student ID Card                                    -->
    <!-- ================================================================= -->
    <div v-if="showIdCardModal" class="modal-backdrop" @click.self="showIdCardModal = false">
      <div class="id-card-modal anim-scale-up">
        <div class="id-card-wrap">
          <!-- Card Header -->
          <div class="id-card-top">
            <div class="id-brand-row">
              <div class="id-brand-logo">IT HUNT</div>
              <span class="id-brand-sub">SOFTWARE ACADEMY</span>
            </div>
            <div class="id-badge-chip">STUDENT ID</div>
          </div>

          <!-- Card Body -->
          <div class="id-card-body">
            <div class="id-photo-col">
              <div class="id-photo-box">
                🎓
              </div>
              <div class="id-status-pill">VERIFIED</div>
            </div>

            <div class="id-details-col">
              <h4 class="id-student-name">{{ studentUser?.candidateName || 'Student Name' }}</h4>
              <div class="id-reg-line">
                REG NO: <strong>{{ studentUser?.registrationNo || 'ITH-2026-001' }}</strong>
              </div>
              <div class="id-course-line">
                COURSE: <strong>{{ studentUser?.course || 'MERN Stack Web Engineer' }}</strong>
              </div>
              <div class="id-detail-row">
                <span>DOB: {{ studentUser?.dob || '2003-08-14' }}</span>
                <span>BLOOD: B+</span>
              </div>
              <div class="id-detail-row">
                <span>PHONE: {{ studentUser?.mobile || '9876543210' }}</span>
              </div>
              <div class="id-detail-row">
                <span>CAMPUS: Holagarh, Prayagraj</span>
              </div>
            </div>
          </div>

          <!-- Card Barcode Footer -->
          <div class="id-card-barcode-footer">
            <div class="barcode-strip">
              ||||| | |||| ||| |||||| || |||| ||| ||||| ||| |||||||
            </div>
            <div class="barcode-no">{{ studentUser?.registrationNo || 'ITH-2026-001' }} • ISO 9001:2015</div>
          </div>
        </div>

        <div style="margin-top: 1.5rem; text-align: center;">
          <button class="btn-secondary" @click="showIdCardModal = false">
            Close ID Card Preview ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { changeStudentPassword } from '../../utils/apiClient.js';
import { 
  PUBLIC_HOLIDAYS_2026, 
  ALL_STUDENT_EXAM_RESULTS, 
  AVAILABLE_EXAMS,
  COURSE_MODULES_DATA,
  ATTENDANCE_SUMMARY,
  DAILY_ATTENDANCE_LOG,
  DEFAULT_DEMO_STUDENT
} from '../../data/studentAcademicData.js';

const props = defineProps({
  content: { type: Object, required: true },
  studentUser: { type: Object, default: null }
});

const emit = defineEmits([
  'student-login', 
  'student-signup', 
  'update-student-profile', 
  'student-logout',
  'go-to-login'
]);

// Sub-Navigation Tabs
const studentTabs = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'profile', label: 'Student Details', icon: '👤' },
  { id: 'course', label: 'Course & Syllabus', icon: '📚' },
  { id: 'calendar', label: 'Public Holidays Calendar', icon: '📅', badge: '2026' },
  { id: 'scoreboard', label: 'Exam Scoreboard', icon: '🏆', badge: 'All' },
  { id: 'attendance', label: 'Attendance Sheet', icon: '📋' }
];

const currentTab = ref('overview');
const showIdCardModal = ref(false);
const successMsg = ref('');

// Scoreboard & Exam Results Data
const availableExams = ref(AVAILABLE_EXAMS);
const selectedExamId = ref('mern-arch');
const allExamResults = ref(ALL_STUDENT_EXAM_RESULTS);
const studentFilterQuery = ref('');

// Course Curriculum Modules
const courseModules = ref(COURSE_MODULES_DATA);

// Attendance Data
const attendanceData = ref(ATTENDANCE_SUMMARY);
const dailyAttendance = ref(DAILY_ATTENDANCE_LOG);

// Public Holidays Data
const publicHolidaysList = ref(PUBLIC_HOLIDAYS_2026);

// Calendar State (Current date: March 2026)
const calYear = ref(2026);
const calMonth = ref(2); // 0-indexed: 2 is March
const selectedDate = ref('2026-03-04'); // default on Holi

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Profile Edit Form
const editForm = reactive({
  candidateName: '',
  fatherName: '',
  motherName: '',
  dob: '',
  gender: 'Male',
  mobile: '',
  email: '',
  district: 'Prayagraj',
  address: '',
  course: ''
});

// Watch studentUser and populate editForm
watch(() => props.studentUser, (newVal) => {
  if (newVal) {
    Object.assign(editForm, {
      candidateName: newVal.candidateName || '',
      fatherName: newVal.fatherName || 'Mr. Rajendra Verma',
      motherName: newVal.motherName || 'Mrs. Shanti Verma',
      dob: newVal.dob || '2003-08-14',
      gender: newVal.gender || 'Male',
      mobile: newVal.mobile || '9876543210',
      email: newVal.email || 'student@ithunt.com',
      district: newVal.district || 'Prayagraj',
      address: newVal.address || 'Near Holagarh Block, Prayagraj, Uttar Pradesh - 212503',
      course: newVal.course || '3-Month MERN Stack Web Engineer'
    });
  }
}, { immediate: true });

// Check if a result row belongs to currently logged-in student
const isCurrentStudent = (result) => {
  if (!props.studentUser) return false;
  const userReg = (props.studentUser.registrationNo || '').toLowerCase();
  const resReg = (result.registrationNo || '').toLowerCase();
  const userName = (props.studentUser.candidateName || '').toLowerCase();
  const resName = (result.studentName || '').toLowerCase();
  return (userReg && userReg === resReg) || (userName && userName === resName);
};

// Logged-in Student's Scorecard in currently selected exam
const currentStudentResult = computed(() => {
  const match = allExamResults.value.find(r => isCurrentStudent(r));
  return match || allExamResults.value.find(r => r.registrationNo === 'ITH-2026-001') || allExamResults.value[2];
});

const currentExamTitle = computed(() => {
  const found = availableExams.value.find(e => e.id === selectedExamId.value);
  return found ? found.title : 'Full-Stack Architecture & API Mastery Exam';
});

// Filtered Scoreboard Table
const filteredScoreboard = computed(() => {
  const q = studentFilterQuery.value.toLowerCase().trim();
  if (!q) return allExamResults.value;
  return allExamResults.value.filter(s => 
    (s.studentName && s.studentName.toLowerCase().includes(q)) ||
    (s.registrationNo && s.registrationNo.toLowerCase().includes(q)) ||
    (s.course && s.course.toLowerCase().includes(q))
  );
});

// Upcoming Next Public Holiday
const nextUpcomingHoliday = computed(() => {
  const todayStr = '2026-03-01';
  return publicHolidaysList.value.find(h => h.date >= todayStr) || publicHolidaysList.value[0];
});

// Calendar Month Grid Calculation
const calendarDays = computed(() => {
  const year = calYear.value;
  const month = calMonth.value;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const prefixDays = [];
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    prefixDays.push(prevMonthTotalDays - i);
  }

  const monthDays = [];
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(d).padStart(2, '0');
    const dateString = `${year}-${monthStr}-${dayStr}`;

    const holidayMatch = publicHolidaysList.value.find(h => h.date === dateString);
    const dayOfWeek = new Date(year, month, d).getDay();

    monthDays.push({
      dayNumber: d,
      dateString,
      isSunday: dayOfWeek === 0,
      isToday: dateString === '2026-03-01',
      holiday: holidayMatch || null
    });
  }

  return { prefixDays, monthDays };
});

const selectedHoliday = computed(() => {
  return publicHolidaysList.value.find(h => h.date === selectedDate.value) || null;
});

const isDateSunday = (dateStr) => {
  if (!dateStr) return false;
  const parts = dateStr.split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).getDay() === 0;
};

// Calendar Navigation
const prevMonth = () => {
  if (calMonth.value === 0) {
    calMonth.value = 11;
    calYear.value--;
  } else {
    calMonth.value--;
  }
};

const nextMonth = () => {
  if (calMonth.value === 11) {
    calMonth.value = 0;
    calYear.value++;
  } else {
    calMonth.value++;
  }
};

const setToday = () => {
  calYear.value = 2026;
  calMonth.value = 2; // March
  selectedDate.value = '2026-03-04';
};

const selectDate = (dayObj) => {
  selectedDate.value = dayObj.dateString;
};

const jumpToHoliday = (hol) => {
  const parts = hol.date.split('-');
  calYear.value = parseInt(parts[0]);
  calMonth.value = parseInt(parts[1]) - 1;
  selectedDate.value = hol.date;
};

// Date Format Helpers
const formatHolidayDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatInspectorDate = (dateStr) => {
  if (!dateStr) return 'Select a date';
  const parts = dateStr.split('-');
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

const formatShortDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatLogDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

// Profile Update Handler
const saveProfileUpdates = () => {
  successMsg.value = '';
  emit('update-student-profile', { ...editForm });
  successMsg.value = 'Your student profile information has been saved successfully!';
  setTimeout(() => { successMsg.value = ''; }, 4500);
};

// Print / Export Helpers
const printAttendanceSheet = () => {
  window.print();
};

// Password Change State
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});
const showOldPass = ref(false);
const showNewPass = ref(false);
const showConfirmPass = ref(false);
const isChangingPass = ref(false);
const passwordError = ref('');
const passwordSuccess = ref('');

const handlePasswordChange = async () => {
  passwordError.value = '';
  passwordSuccess.value = '';

  const oldPass = passwordForm.oldPassword.trim();
  const newPass = passwordForm.newPassword.trim();
  const confPass = passwordForm.confirmPassword.trim();

  if (!oldPass) {
    passwordError.value = 'Please enter your current password (default is Ithunt@123).';
    return;
  }
  if (!newPass || newPass.length < 6) {
    passwordError.value = 'New password must be at least 6 characters long.';
    return;
  }
  if (newPass !== confPass) {
    passwordError.value = 'New password and confirmation do not match.';
    return;
  }

  isChangingPass.value = true;
  try {
    const studentEmail = props.studentUser?.email || props.studentUser?.userId;
    const res = await changeStudentPassword(studentEmail, oldPass, newPass);

    if (res && res.success) {
      passwordSuccess.value = res.message || 'Password successfully updated! Use your new password for all future sign-ins.';
      passwordForm.oldPassword = '';
      passwordForm.newPassword = '';
      passwordForm.confirmPassword = '';
      if (props.studentUser) {
        props.studentUser.password = newPass;
      }
      setTimeout(() => { passwordSuccess.value = ''; }, 6000);
    } else {
      passwordError.value = res?.error || 'Failed to update password.';
    }
  } catch (err) {
    passwordError.value = err.message || 'Error changing password.';
  } finally {
    isChangingPass.value = false;
  }
};

const handleLogout = () => {
  emit('student-logout');
};
</script>

<style scoped>
.student-portal-root {
  position: relative;
  z-index: 1;
}

.form-grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.password-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input-wrap input {
  padding-right: 2.75rem;
}

.eye-toggle-btn {
  position: absolute;
  right: 0.75rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
}

.student-dashboard-wrap {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
}

/* 1. Welcome Banner */
.student-welcome-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  background: var(--bg-card-glass);
  border: 1px solid var(--border-cyber-glow);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  padding: 1.75rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.5), 0 0 25px rgba(249, 115, 22, 0.12);
}

.student-welcome-main {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.student-avatar-badge {
  position: relative;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.25), rgba(250, 204, 21, 0.15));
  border: 2px solid var(--color-ai-orange);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #10b981;
  border: 2px solid var(--bg-dark);
}

.student-welcome-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.76rem;
  font-weight: 800;
  color: var(--color-ai-orange);
  font-family: var(--font-mono);
  margin-bottom: 0.35rem;
}

.reg-pill {
  background: rgba(249, 115, 22, 0.15);
  border: 1px solid rgba(249, 115, 22, 0.35);
  padding: 0.15rem 0.6rem;
  border-radius: var(--radius-full);
  color: var(--color-ai-yellow);
}

.student-welcome-name {
  font-family: var(--font-heading);
  font-size: 1.85rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 0.35rem;
}

.student-welcome-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.86rem;
  color: var(--text-muted);
  flex-wrap: wrap;
}

.meta-dot {
  color: var(--text-dim);
}

.student-banner-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.id-card-btn {
  font-size: 0.85rem;
  padding: 0.55rem 1.15rem;
}

.student-logout-btn {
  font-size: 0.85rem;
  padding: 0.55rem 1.15rem;
  border-color: rgba(239, 68, 68, 0.35);
  color: #fca5a5;
}

.student-logout-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

/* 2. Dashboard Navigation Bar */
.dashboard-tab-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-card-glass);
  border: 1px solid var(--border-cyber);
  backdrop-filter: blur(16px);
  padding: 0.45rem;
  border-radius: var(--radius-lg);
  margin-bottom: 2rem;
  overflow-x: auto;
  scrollbar-width: thin;
}

.dash-nav-btn {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.65rem 1.15rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.dash-nav-btn:hover {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.05);
}

.dash-nav-btn.active {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.18), rgba(250, 204, 21, 0.1));
  border-color: rgba(249, 115, 22, 0.4);
  color: var(--color-ai-yellow);
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.15);
}

.dash-tab-badge {
  background: rgba(249, 115, 22, 0.2);
  color: var(--color-ai-orange);
  font-size: 0.7rem;
  padding: 0.1rem 0.45rem;
  border-radius: var(--radius-full);
}

/* Common Panel Styling */
.dash-panel {
  background: var(--bg-card-glass);
  border: 1px solid var(--border-cyber);
  backdrop-filter: blur(16px);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.4);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.panel-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.panel-subtitle {
  font-size: 0.86rem;
  color: var(--text-muted);
}

.panel-link-btn {
  background: transparent;
  border: none;
  color: var(--color-ai-cyan);
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.panel-link-btn:hover {
  color: var(--color-ai-yellow);
  text-decoration: underline;
}

/* KPI Cards */
.overview-kpi-grid,
.attendance-kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.kpi-card {
  background: var(--bg-card-glass);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-lg);
  padding: 1.35rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.1rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.kpi-card:hover {
  transform: translateY(-3px);
  border-color: rgba(249, 115, 22, 0.45);
  box-shadow: 0 12px 25px -8px rgba(0, 0, 0, 0.6), 0 0 20px rgba(249, 115, 22, 0.15);
}

.kpi-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  flex-shrink: 0;
}

.kpi-label {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.kpi-val {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 0.25rem;
}

.badge-rank {
  font-size: 0.8rem;
  padding: 0.15rem 0.55rem;
  background: rgba(250, 204, 21, 0.15);
  border: 1px solid rgba(250, 204, 21, 0.35);
  border-radius: var(--radius-full);
  color: var(--color-ai-yellow);
  font-family: var(--font-mono);
}

.kpi-sub {
  font-size: 0.8rem;
  font-weight: 600;
}

/* Dual Grid */
.overview-dual-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
}

@media (max-width: 900px) {
  .overview-dual-grid {
    grid-template-columns: 1fr;
  }
}

.module-highlight-card {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1.25rem;
}

.module-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.65rem;
}

.week-pill {
  font-size: 0.76rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
}

.module-title {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.module-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin-bottom: 1.25rem;
}

.progress-bar-wrap {
  margin-top: 0.75rem;
}

.progress-label-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}

.progress-track {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-ai-orange), var(--color-ai-yellow));
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
}

.schedule-card {
  background: rgba(249, 115, 22, 0.07);
  border: 1px dashed rgba(249, 115, 22, 0.35);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  font-size: 0.86rem;
  line-height: 1.6;
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.badge-today {
  font-size: 0.74rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--color-ai-orange);
}

.schedule-time {
  font-weight: 700;
  color: var(--color-ai-yellow);
}

/* Mini Scoreboard */
.mini-scoreboard-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.mini-score-item {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.mini-score-item.is-current-user {
  background: rgba(249, 115, 22, 0.12);
  border-color: var(--color-ai-orange);
}

.mini-rank-pill {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.82rem;
  font-family: var(--font-mono);
  flex-shrink: 0;
}

.mini-student-info {
  flex: 1;
}

.mini-student-name {
  font-size: 0.88rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.you-badge {
  font-size: 0.68rem;
  font-weight: 900;
  padding: 0.1rem 0.4rem;
  background: linear-gradient(135deg, var(--color-ai-orange), #ea580c);
  color: #fff;
  border-radius: var(--radius-full);
}

.mini-student-course {
  font-size: 0.76rem;
  color: var(--text-dim);
}

.mini-score-right {
  text-align: right;
}

.mini-score-val {
  font-size: 0.92rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: #10b981;
}

.mini-score-grade {
  font-size: 0.74rem;
  color: var(--text-muted);
}

.quick-holiday-widget {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(6, 182, 212, 0.08);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.25s;
}

.quick-holiday-widget:hover {
  background: rgba(6, 182, 212, 0.15);
  border-color: var(--color-ai-cyan);
}

.quick-holiday-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
}

.quick-holiday-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-ai-cyan);
  margin-bottom: 0.2rem;
}

.quick-holiday-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.quick-holiday-arrow {
  font-size: 1.25rem;
  color: var(--color-ai-cyan);
  font-weight: 800;
}

/* Profile Form */
.profile-snapshot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
  margin-bottom: 2rem;
}

.snap-lbl {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.snap-val {
  font-size: 0.95rem;
  font-weight: 700;
}

.student-edit-form {
  margin-top: 1rem;
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 768px) {
  .form-grid-2 {
    grid-template-columns: 1fr;
  }
}

.form-footer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-cyber);
}

.success-alert-pill {
  color: #10b981;
  font-weight: 700;
  font-size: 0.9rem;
}

.save-btn {
  padding: 0.85rem 2rem;
  font-size: 0.95rem;
}

/* Course Master Card */
.course-master-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-cyber-glow);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.course-master-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.program-tag {
  font-size: 0.74rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--color-ai-orange);
  letter-spacing: 0.5px;
}

.course-name {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0.3rem 0 0.5rem;
}

.course-mentor-text {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.course-completion-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 4px solid var(--color-ai-orange);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(249, 115, 22, 0.1);
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.25);
  flex-shrink: 0;
}

.circle-val {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1;
}

.circle-lbl {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.course-meta-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}

.meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.85rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-full);
  font-size: 0.82rem;
}

.fee-ledger-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.25rem;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-md);
  padding: 1.25rem;
}

.fee-lbl {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.2rem;
}

.fee-val {
  font-size: 1.25rem;
  font-weight: 800;
  font-family: var(--font-mono);
}

.fee-badge-paid {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid #10b981;
  color: #10b981;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 800;
}

/* Modules Accordion */
.modules-accordion {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.module-card-item {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
  transition: all 0.2s;
}

.module-card-item.mod-in-progress {
  border-color: var(--color-ai-orange);
  background: rgba(249, 115, 22, 0.06);
}

.mod-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mod-title-col {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mod-status-indicator {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.mod-title {
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 0.2rem;
}

.mod-duration {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.topic-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.topic-tag {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-cyber);
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  color: var(--text-muted);
}

/* CALENDAR STYLING */
.calendar-layout-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 1.75rem;
}

@media (max-width: 960px) {
  .calendar-layout-grid {
    grid-template-columns: 1fr;
  }
}

.cal-controls {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.cal-nav-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border-cyber);
  color: var(--text-main);
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.cal-nav-btn:hover {
  background: var(--color-ai-orange);
  color: #fff;
}

.current-month-display {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 800;
  min-width: 140px;
  text-align: center;
}

.cal-today-btn {
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  background: rgba(249, 115, 22, 0.15);
  border: 1px solid rgba(249, 115, 22, 0.4);
  color: var(--color-ai-yellow);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
}

.cal-matrix-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
}

.cal-weekdays-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.4rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--text-muted);
  margin-bottom: 0.6rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--border-cyber);
}

.weekday-cell.weekend-head {
  color: #ef4444;
}

.cal-days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.4rem;
}

.cal-day-cell {
  min-height: 84px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-md);
  padding: 0.4rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s;
}

.cal-day-cell:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--color-ai-cyan);
}

.cal-day-cell.cal-day-muted {
  opacity: 0.3;
  pointer-events: none;
}

.cal-day-cell.is-holiday {
  background: rgba(249, 115, 22, 0.12);
  border-color: rgba(249, 115, 22, 0.6);
  box-shadow: 0 0 10px rgba(249, 115, 22, 0.15);
}

.cal-day-cell.is-sunday {
  background: rgba(239, 68, 68, 0.04);
}

.cal-day-cell.is-selected {
  outline: 2px solid var(--color-ai-yellow);
  box-shadow: 0 0 15px rgba(250, 204, 21, 0.3);
}

.day-num-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.day-num {
  font-size: 0.85rem;
  font-weight: 700;
}

.today-marker {
  font-size: 0.62rem;
  font-weight: 900;
  padding: 0.05rem 0.3rem;
  background: var(--color-ai-cyan);
  color: #000;
  border-radius: var(--radius-full);
}

.cal-holiday-chip {
  padding: 0.2rem 0.35rem;
  border-radius: var(--radius-sm);
  border: 1px solid;
  font-size: 0.68rem;
  font-weight: 800;
  line-height: 1.15;
  margin-top: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.weekend-tag {
  font-size: 0.65rem;
  color: #ef4444;
  font-weight: 700;
}

.cal-legend-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.25rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--border-cyber);
  font-size: 0.78rem;
  color: var(--text-muted);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* Inspector Card */
.cal-inspector-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.inspector-tag {
  font-size: 0.72rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--color-ai-cyan);
}

.inspector-date {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0.3rem 0 1.25rem;
}

.holiday-detail-box {
  background: rgba(249, 115, 22, 0.08);
  border: 1px solid;
  border-radius: var(--radius-md);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.holiday-type-pill {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-full);
  font-size: 0.74rem;
  font-weight: 800;
  margin-bottom: 0.65rem;
}

.holiday-detail-name {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.holiday-detail-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin-bottom: 0.85rem;
}

.holiday-detail-notice {
  font-size: 0.82rem;
  padding: 0.5rem 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-sm);
  color: var(--color-ai-yellow);
}

.regular-day-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.regular-day-title {
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
}

.regular-day-desc {
  font-size: 0.84rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.upcoming-head {
  font-size: 0.95rem;
  font-weight: 800;
  margin-bottom: 0.85rem;
}

.upcoming-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.upcoming-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
}

.upcoming-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--color-ai-orange);
}

.upcoming-date-badge {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 800;
  min-width: 55px;
}

.upcoming-name {
  font-size: 0.85rem;
  font-weight: 700;
}

.upcoming-type {
  font-size: 0.72rem;
  color: var(--text-dim);
}

/* SCOREBOARD STYLING */
.scoreboard-header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.exam-selector-wrap {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.exam-sel-lbl {
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 700;
}

.exam-select {
  min-width: 280px;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
}

.personal-scorecard-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(250, 204, 21, 0.08));
  border: 1px solid var(--border-cyber-glow);
  border-radius: var(--radius-lg);
  padding: 1.75rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px -5px rgba(249, 115, 22, 0.15);
}

.score-badge {
  font-size: 0.72rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--color-ai-orange);
  letter-spacing: 0.5px;
}

.personal-score-name {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0.25rem 0 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.you-pill {
  font-size: 0.7rem;
  font-weight: 800;
  background: #10b981;
  color: #fff;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-full);
}

.personal-score-meta {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.personal-score-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.score-stat-box {
  text-align: center;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-md);
  padding: 0.85rem 1.25rem;
  min-width: 90px;
}

.stat-lbl {
  font-size: 0.72rem;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.stat-val {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
}

.rank-val {
  font-size: 1.6rem;
}

.max-denom {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.scoreboard-filter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.search-input-wrap {
  position: relative;
  width: 320px;
  max-width: 100%;
}

.search-icon {
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9rem;
}

.scoreboard-search {
  padding-left: 2.4rem;
  font-size: 0.85rem;
}

.score-count-badge {
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 600;
}

/* Scoreboard Table */
.scoreboard-table,
.attendance-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.scoreboard-table th,
.attendance-table th {
  padding: 0.9rem 1rem;
  background: rgba(0, 0, 0, 0.35);
  color: var(--text-muted);
  font-weight: 700;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--border-cyber);
}

.scoreboard-table td,
.attendance-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  vertical-align: middle;
}

.scoreboard-table tr.highlight-current-student {
  background: rgba(249, 115, 22, 0.12) !important;
  border-left: 3px solid var(--color-ai-orange);
}

.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 28px;
  padding: 0 0.5rem;
  border-radius: var(--radius-full);
  font-weight: 800;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  background: rgba(255, 255, 255, 0.06);
}

.rank-badge.rank-1 {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.3), rgba(234, 179, 8, 0.15));
  border: 1px solid var(--color-ai-yellow);
  color: var(--color-ai-yellow);
}

.rank-badge.rank-2 {
  background: rgba(203, 213, 225, 0.2);
  border: 1px solid #cbd5e1;
  color: #f8fafc;
}

.rank-badge.rank-3 {
  background: rgba(249, 115, 22, 0.2);
  border: 1px solid var(--color-ai-orange);
  color: var(--color-ai-orange);
}

.table-student-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
}

.table-reg-no {
  font-size: 0.76rem;
  color: var(--text-dim);
  font-family: var(--font-mono);
  margin-top: 0.15rem;
}

.table-course-pill {
  font-size: 0.78rem;
  background: rgba(255, 255, 255, 0.04);
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-cyber);
}

.grade-pill {
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-full);
  font-size: 0.76rem;
  font-weight: 800;
  font-family: var(--font-mono);
}

.grade-O,
.grade-A {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.4);
}

.grade-B {
  background: rgba(250, 204, 21, 0.15);
  color: var(--color-ai-yellow);
  border: 1px solid rgba(250, 204, 21, 0.4);
}

.distinction-tag {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-ai-orange);
}

/* ATTENDANCE PUNCH MATRIX */
.punch-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  font-size: 0.78rem;
  color: var(--text-muted);
}

.p-leg {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.leg-box {
  width: 14px;
  height: 14px;
  border-radius: 3px;
}

.leg-p { background: #10b981; }
.leg-a { background: #ef4444; }
.leg-l { background: #eab308; }
.leg-h { background: #f97316; }
.leg-off { background: #64748b; }

.punch-matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(62px, 1fr));
  gap: 0.6rem;
}

.punch-tile {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-cyber);
  border-radius: var(--radius-md);
  padding: 0.5rem 0.4rem;
  text-align: center;
  transition: all 0.2s;
  cursor: default;
}

.punch-tile.punch-present {
  border-color: rgba(16, 185, 129, 0.5);
  background: rgba(16, 185, 129, 0.12);
}

.punch-tile.punch-absent {
  border-color: rgba(239, 68, 68, 0.5);
  background: rgba(239, 68, 68, 0.15);
}

.punch-tile.punch-leave {
  border-color: rgba(234, 179, 8, 0.5);
  background: rgba(234, 179, 8, 0.12);
}

.punch-tile.punch-holiday {
  border-color: rgba(249, 115, 22, 0.5);
  background: rgba(249, 115, 22, 0.15);
}

.punch-tile.punch-off {
  opacity: 0.5;
}

.punch-date-num {
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 0.15rem;
}

.punch-status-code {
  font-size: 0.85rem;
  font-weight: 900;
  font-family: var(--font-mono);
}

.punch-present .punch-status-code { color: #10b981; }
.punch-absent .punch-status-code { color: #ef4444; }
.punch-leave .punch-status-code { color: #eab308; }
.punch-holiday .punch-status-code { color: #f97316; }
.punch-off .punch-status-code { color: #64748b; }

.punch-badge {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-full);
  font-size: 0.76rem;
  font-weight: 800;
}

.p-badge-present {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.4);
}

.p-badge-absent {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.4);
}

.p-badge-leave {
  background: rgba(234, 179, 8, 0.15);
  color: #eab308;
  border: 1px solid rgba(234, 179, 8, 0.4);
}

.p-badge-holiday {
  background: rgba(249, 115, 22, 0.15);
  color: var(--color-ai-orange);
  border: 1px solid rgba(249, 115, 22, 0.4);
}

.p-badge-off {
  background: rgba(100, 116, 139, 0.15);
  color: #94a3b8;
}

/* Status Pills */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.76rem;
  font-weight: 800;
}

.status-active,
.status-done {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.4);
}

.status-ongoing {
  background: rgba(249, 115, 22, 0.15);
  color: var(--color-ai-orange);
  border: 1px solid rgba(249, 115, 22, 0.4);
}

.status-pending {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
  border: 1px solid var(--border-cyber);
}

/* ID CARD MODAL */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.id-card-modal {
  width: 100%;
  max-width: 440px;
}

.id-card-wrap {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border: 2px solid var(--color-ai-orange);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.9), 0 0 35px rgba(249, 115, 22, 0.35);
  color: #fff;
}

.id-card-top {
  background: linear-gradient(90deg, #f97316, #ea580c);
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.id-brand-logo {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 900;
  letter-spacing: 0.5px;
}

.id-brand-sub {
  font-size: 0.65rem;
  letter-spacing: 1px;
  display: block;
  opacity: 0.9;
}

.id-badge-chip {
  background: rgba(0, 0, 0, 0.3);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 800;
  font-family: var(--font-mono);
}

.id-card-body {
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
}

.id-photo-box {
  width: 80px;
  height: 95px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.75rem;
}

.id-status-pill {
  margin-top: 0.4rem;
  font-size: 0.65rem;
  font-weight: 800;
  background: #10b981;
  color: #000;
  text-align: center;
  border-radius: 4px;
  padding: 0.1rem 0;
}

.id-student-name {
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
}

.id-reg-line,
.id-course-line,
.id-detail-row {
  font-size: 0.76rem;
  color: #cbd5e1;
  margin-bottom: 0.3rem;
}

.id-reg-line strong {
  color: var(--color-ai-yellow);
}

.id-card-barcode-footer {
  background: #020617;
  padding: 0.75rem 1.25rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.barcode-strip {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  letter-spacing: 2px;
  opacity: 0.75;
}

.barcode-no {
  font-size: 0.68rem;
  color: #94a3b8;
  margin-top: 0.2rem;
}
</style>
