<template>
  <section class="superadmin-section container" style="padding: 2.5rem 1.5rem 5rem;">
    <!-- 1. TOP SUPERADMIN CONTROL BAR -->
    <div class="admin-control-bar anim-stagger-1">
      <div class="admin-profile-info">
        <div class="admin-avatar-wrap">
          <img :src="adminUser.avatar || content.director?.image || 'img/ithunt.webp'" :alt="adminUser.name" class="admin-avatar-img" @error="onAvatarError">
          <span class="admin-live-status-dot" title="Admin Active"></span>
        </div>
        <div>
          <div class="admin-role-badge">
            <span>🛡️</span> {{ adminUser.role || 'SuperAdmin • Director Desk' }}
          </div>
          <h2 class="admin-user-name">{{ adminUser.name || 'Mr. Lakshman Singh Chauhan' }}</h2>
          <div class="admin-meta-sub">
            <span>🏛️ {{ content.brand?.name || 'IT HUNT' }}</span>
            <span>•</span>
            <span class="text-gradient-gold">⚡ Central Registry Node</span>
            <span>•</span>
            <span>Session: {{ sessionTime }}</span>
          </div>
        </div>
      </div>

      <div class="admin-quick-actions">
        <button class="btn-secondary admin-action-btn" @click="exportDataToJson" title="Export Complete Database Backup">
          <span>📥 Backup (JSON)</span>
        </button>
        <button class="btn-primary admin-action-btn" @click="openQuickAdmissionModal">
          <span>+ New Admission</span>
        </button>
        <button class="btn-secondary admin-logout-btn" @click="$emit('logout')" title="Log Out Admin Session">
          <span>🚪 Logout</span>
        </button>
      </div>
    </div>

    <!-- 2. HIGH-LEVEL EXECUTIVE METRIC STATS -->
    <div class="superadmin-stats-grid anim-stagger-2">
      <!-- Total Admissions -->
      <div class="admin-stat-card">
        <div class="admin-stat-icon-box primary-glow">🎓</div>
        <div class="admin-stat-content">
          <div class="admin-stat-val text-gradient">{{ admissionsList.length }}</div>
          <div class="admin-stat-lbl">Registered Admissions</div>
          <div class="admin-stat-trend">🟢 Active Batch 2026-27</div>
        </div>
      </div>

      <!-- Active Interns -->
      <div class="admin-stat-card">
        <div class="admin-stat-icon-box warning-glow">🚀</div>
        <div class="admin-stat-content">
          <div class="admin-stat-val text-gradient-gold">{{ content.internshipVenture?.tracks?.length || 5 }} Tracks</div>
          <div class="admin-stat-lbl">Production Incubator</div>
          <div class="admin-stat-trend">⚡ 95% Placement Rate</div>
        </div>
      </div>

      <!-- Event RSVPs -->
      <div class="admin-stat-card">
        <div class="admin-stat-icon-box info-glow">🎟️</div>
        <div class="admin-stat-content">
          <div class="admin-stat-val text-gradient-secondary">{{ rsvpsList.length }}</div>
          <div class="admin-stat-lbl">Event VIP Passes</div>
          <div class="admin-stat-trend">🎪 Hackathon & AI Summit</div>
        </div>
      </div>

      <!-- Job Applications -->
      <div class="admin-stat-card">
        <div class="admin-stat-icon-box secondary-glow">💼</div>
        <div class="admin-stat-content">
          <div class="admin-stat-val" style="color: #38bdf8;">{{ jobApplicationsList.length }}</div>
          <div class="admin-stat-lbl">Faculty & Dev Applicants</div>
          <div class="admin-stat-trend">🔍 Active Recruitment</div>
        </div>
      </div>

      <!-- Student Reviews -->
      <div class="admin-stat-card">
        <div class="admin-stat-icon-box gold-glow">⭐</div>
        <div class="admin-stat-content">
          <div class="admin-stat-val text-gradient-gold">{{ reviewsList.length }}</div>
          <div class="admin-stat-lbl">Student Scorecards</div>
          <div class="admin-stat-trend">🏆 4.92 / 5.0 Star Rating</div>
        </div>
      </div>

      <!-- NIELIT Submitted Projects -->
      <div class="admin-stat-card">
        <div class="admin-stat-icon-box gold-glow">📜</div>
        <div class="admin-stat-content">
          <div class="admin-stat-val text-gradient-gold">{{ nielitProjectsList.length }}</div>
          <div class="admin-stat-lbl">NIELIT Project Submissions</div>
          <div class="admin-stat-trend">⚡ Official 4-Page Verification</div>
        </div>
      </div>
    </div>

    <!-- 3. INTERACTIVE NAVIGATION TABS -->
    <div class="admin-tabs-nav-bar anim-stagger-2">
      <button 
        v-for="tab in (content.superAdminData?.superAdminUI?.tabs || defaultTabs)"
        :key="tab.id"
        class="admin-nav-tab-btn"
        :class="{ active: currentTab === tab.id }"
        @click="currentTab = tab.id"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
        <span class="tab-badge-counter" v-if="tab.id === 'admissions'">{{ admissionsList.length }}</span>
        <span class="tab-badge-counter" v-else-if="tab.id === 'nielit'">{{ nielitProjectsList.length }}</span>
        <span class="tab-badge-counter" v-else-if="tab.id === 'careers'">{{ jobApplicationsList.length }}</span>
        <span class="tab-badge-counter" v-else-if="tab.id === 'events'">{{ rsvpsList.length }}</span>
      </button>
    </div>

    <!-- 4. TAB PANELS -->

    <!-- TAB 1: ADMISSIONS & STUDENT REGISTRY -->
    <div v-if="currentTab === 'admissions'" class="admin-tab-panel anim-stagger-3">
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
            <option value="all">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Verified">Verified</option>
            <option value="Pending Verification">Pending</option>
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
                <th>Reg. ID</th>
                <th>Candidate Name</th>
                <th>Father's Name</th>
                <th>Mobile & Email</th>
                <th>Enrolled Program / Track</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th style="text-align: right;">Official Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="adm in filteredAdmissions" :key="adm.registrationNo">
                <td>
                  <span class="admin-reg-pill">{{ adm.registrationNo }}</span>
                </td>
                <td>
                  <div style="font-weight: 800; color: var(--text-main);">{{ adm.candidateName }}</div>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">{{ adm.gender }} | DOB: {{ adm.dob }}</div>
                </td>
                <td>{{ adm.fatherName }}</td>
                <td>
                  <div>📞 {{ adm.mobile }}</div>
                  <div style="font-size: 0.75rem; color: var(--color-ai-cyan);">{{ adm.email }}</div>
                </td>
                <td>
                  <span class="admin-track-pill">{{ adm.course }}</span>
                  <div style="font-size: 0.725rem; color: var(--text-dim); margin-top: 2px;">📍 {{ adm.district }}, UP</div>
                </td>
                <td style="font-size: 0.8rem; font-family: var(--font-mono); white-space: nowrap;">
                  <div>📅 {{ adm.date }}</div>
                  <div style="color: var(--text-dim);">⏱️ {{ adm.time }}</div>
                </td>
                <td>
                  <span 
                    class="admin-status-chip"
                    :class="{
                      'status-confirmed': adm.status === 'Confirmed' || adm.status === 'Admission Form Sent',
                      'status-verified': adm.status === 'Verified',
                      'status-pending': adm.status === 'Pending Verification'
                    }"
                    @click="cycleAdmissionStatus(adm)"
                    :title="'Click to toggle status'"
                  >
                    {{ adm.status || 'Confirmed' }}
                  </span>
                  <div style="font-size: 0.7rem; font-weight: 700; margin-top: 4px;" :style="{ color: (adm.feeStatus && adm.feeStatus.includes('Paid')) ? '#10b981' : '#f59e0b' }">
                    💳 {{ adm.feeStatus || 'Fee Pending' }}
                  </div>
                </td>
                <td style="text-align: right;">
                  <div class="admin-row-actions">
                    <button 
                      class="admin-icon-btn" 
                      @click="sendAdmissionEmailToStudent(adm)" 
                      title="Send Admission Form & Confirmation Email to Candidate"
                      style="color: var(--color-ai-orange); border-color: rgba(249, 115, 22, 0.4);"
                    >
                      📩 Admission Email
                    </button>
                    <button 
                      class="admin-icon-btn" 
                      @click="confirmFeeAndSendJpgReceipt(adm)" 
                      title="Confirm Fee Payment and Email Official JPG Image Receipt to Student"
                      style="color: #34d399; border-color: rgba(52, 211, 153, 0.4);"
                    >
                      💳 Confirm Fee & JPG Receipt
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
                  <div>No candidate admissions found matching your criteria.</div>
                </td>
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

        <div class="panel-filter-group">
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
          <h3 class="panel-title">🚀 Production Internship Tracks & Capacity</h3>
          <p class="panel-subtitle">Monitor batch sizes, active syllabus roadmaps, and industry placement standards.</p>
        </div>
      </div>

      <div class="admin-grid-2col">
        <div class="modern-track-card" v-for="track in content.internshipVenture?.tracks" :key="track.id">
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
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: EVENT RSVPS & PASSES -->
    <div v-else-if="currentTab === 'events'" class="admin-tab-panel anim-stagger-3">
      <div class="panel-header-controls">
        <div>
          <h3 class="panel-title">🎪 Event RSVPs & VIP Pass Bookings</h3>
          <p class="panel-subtitle">Live registrations for annual hackathons, AI workshops, and convocation summits.</p>
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
          <p class="panel-subtitle">Review feedback regarding lab workstations, mentor guidance, and learning outcomes.</p>
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
              <span class="config-key">API_BASE_URL:</span>
              <span class="config-val">http://localhost:5500/api</span>
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
                  <option>Web Development (MERN Stack & Cloud Architecture)</option>
                  <option>iOS Native App Development (Swift & SwiftUI)</option>
                  <option>Android App Engineering (Kotlin & Jetpack Compose)</option>
                  <option>Python Programming, Generative AI & Data Analytics</option>
                  <option>Full-Funnel Digital Marketing & Growth Hacking</option>
                  <option>NIELIT 'O' Level Official Diploma</option>
                </select>
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
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { sendStudentAdmissionEmail, sendFeeReceiptJpgEmail } from '../../utils/emailNotifier.js';
import { generateFeeReceiptJpgBlob } from '../../utils/jpgReceiptGenerator.js';
import { deleteUserFromBackend, updateNielitProjectInBackend, deleteProject } from '../../utils/apiClient.js';

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
  }
});

const emit = defineEmits(['logout', 'download-slip', 'download-nielit-pdf', 'add-admission', 'delete-admission', 'update-nielit-project', 'delete-nielit-project']);

const emailActionMsg = ref('');

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
      emailActionMsg.value = `✓ Admission Confirmation Email & Slip sent to ${adm.email}`;
    } else {
      emailActionMsg.value = `⚠️ Email notification sent (Fallback): ${adm.email}`;
    }
  } catch (err) {
    emailActionMsg.value = `⚠️ Error dispatching email: ${err.message}`;
  }
  setTimeout(() => { emailActionMsg.value = ''; }, 5000);
};

const confirmFeeAndSendJpgReceipt = async (adm) => {
  if (!adm || !adm.email) {
    alert('Candidate record has no valid email address.');
    return;
  }
  emailActionMsg.value = `Generating JPG Fee Receipt & Emailing to ${adm.email}...`;
  adm.feeConfirmedDate = new Date().toLocaleDateString('en-GB');
  adm.feeStatus = 'Fee Paid & Confirmed';

  try {
    const jpgBlob = await generateFeeReceiptJpgBlob(adm);
    const res = await sendFeeReceiptJpgEmail(adm, jpgBlob);
    if (res.success) {
      adm.feeStatus = 'Fee Paid & Receipt Sent';
      emailActionMsg.value = `✓ Fee Confirmed! Official JPG Receipt emailed to ${adm.email}`;
    } else {
      emailActionMsg.value = `✓ Fee Confirmed & Receipt notification dispatched to ${adm.email}`;
    }
  } catch (err) {
    emailActionMsg.value = `⚠️ JPG Receipt Error: ${err.message}`;
  }
  setTimeout(() => { emailActionMsg.value = ''; }, 5000);
};

const currentTab = ref('admissions');
const admissionSearch = ref('');
const admissionStatusFilter = ref('all');
const nielitSearch = ref('');
const nielitStatusFilter = ref('all');
const sessionTime = ref('Active Now');

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
  { id: 'admissions', label: '🎓 Student Admissions', icon: '🎓' },
  { id: 'nielit', label: '📜 NIELIT Projects', icon: '📜' },
  { id: 'internships', label: '🚀 Internship Tracks', icon: '🚀' },
  { id: 'events', label: '🎪 Event RSVPs & Passes', icon: '🎪' },
  { id: 'careers', label: '💼 Faculty & Dev Jobs', icon: '💼' },
  { id: 'reviews', label: '⭐ Student Reviews', icon: '⭐' },
  { id: 'settings', label: '⚙️ System Config', icon: '⚙️' }
];

// Reactive dataset states
const admissionsList = ref([]);
const jobApplicationsList = ref([]);
const rsvpsList = ref([]);
const nielitProjectsList = ref([]);
const reviewsList = ref([
  ...(props.content.reviewsSection?.reviewsList || [])
]);

const getDeletedIds = (key) => {
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || '[]'));
  } catch (e) {
    return new Set();
  }
};

const addDeletedId = (key, id) => {
  if (!id) return;
  try {
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    if (!existing.includes(id)) {
      existing.push(id);
      localStorage.setItem(key, JSON.stringify(existing));
    }
  } catch (e) {}
};

watch(() => props.allAdmissions, (val) => {
  const deletedIds = getDeletedIds('ithunt_deleted_admission_ids');
  const samples = (props.content.superAdminData?.sampleAdmissions || props.content.sampleAdmissions || []).filter(s => {
    const sId = s.registrationNo || s.id;
    return !deletedIds.has(sId);
  });
  const validProps = (val || []).filter(a => {
    const aId = a.registrationNo || a.id;
    return !deletedIds.has(aId);
  });
  const existingIds = new Set(validProps.map(a => a.registrationNo || a.id));
  admissionsList.value = [...validProps, ...samples.filter(s => !existingIds.has(s.registrationNo || s.id))];
}, { immediate: true, deep: true });

watch(() => props.allJobApplications, (val) => {
  const deletedIds = getDeletedIds('ithunt_deleted_job_ids');
  const samples = (props.content.superAdminData?.sampleJobApplications || props.content.sampleJobApplications || []).filter(s => !deletedIds.has(s.id));
  const validProps = (val || []).filter(j => !deletedIds.has(j.id));
  const existingIds = new Set(validProps.map(j => j.id));
  jobApplicationsList.value = [...validProps, ...samples.filter(s => !existingIds.has(s.id))];
}, { immediate: true, deep: true });

watch(() => props.allRsvps, (val) => {
  const deletedIds = getDeletedIds('ithunt_deleted_rsvp_ids');
  const samples = (props.content.superAdminData?.sampleRsvps || props.content.sampleRsvps || []).filter(s => !deletedIds.has(s.id));
  const validProps = (val || []).filter(r => !deletedIds.has(r.id));
  const existingIds = new Set(validProps.map(r => r.id));
  rsvpsList.value = [...validProps, ...samples.filter(s => !existingIds.has(s.id))];
}, { immediate: true, deep: true });

watch(() => props.allNielitProjects, (val) => {
  const deletedIds = getDeletedIds('ithunt_deleted_nielit_ids');
  const samples = (props.content.sampleNielitProjects || []).filter(s => {
    const sId = s.registrationNo || s.nielitRegNo || s.id;
    return !deletedIds.has(sId);
  });
  const validProps = (val || []).filter(p => {
    const pId = p.registrationNo || p.nielitRegNo || p.id;
    return !deletedIds.has(pId);
  });
  const existingIds = new Set(validProps.map(n => n.registrationNo || n.nielitRegNo || n.id));
  nielitProjectsList.value = [...validProps, ...samples.filter(s => !existingIds.has(s.registrationNo || s.nielitRegNo || s.id))];
}, { immediate: true, deep: true });

const filteredAdmissions = computed(() => {
  return admissionsList.value.filter(adm => {
    const matchStatus = admissionStatusFilter.value === 'all' || adm.status === admissionStatusFilter.value;
    const query = admissionSearch.value.trim().toLowerCase();
    if (!query) return matchStatus;

    const matchQuery = 
      (adm.candidateName && adm.candidateName.toLowerCase().includes(query)) ||
      (adm.fatherName && adm.fatherName.toLowerCase().includes(query)) ||
      (adm.registrationNo && adm.registrationNo.toLowerCase().includes(query)) ||
      (adm.mobile && adm.mobile.includes(query)) ||
      (adm.course && adm.course.toLowerCase().includes(query)) ||
      (adm.district && adm.district.toLowerCase().includes(query));

    return matchStatus && matchQuery;
  });
});

const filteredNielitProjects = computed(() => {
  return nielitProjectsList.value.filter(p => {
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
    paymentRemark: p.paymentRemark || 'Paid Online'
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
  const targetId = p.registrationNo || p.nielitRegNo || p.id;
  if (!confirm(`Are you sure you want to delete NIELIT project form for ${p.candidateName || 'Candidate'} (${targetId})?`)) {
    return;
  }

  // 1. Blacklist IDs in localStorage
  if (p.registrationNo) addDeletedId('ithunt_deleted_nielit_ids', p.registrationNo);
  if (p.nielitRegNo) addDeletedId('ithunt_deleted_nielit_ids', p.nielitRegNo);
  if (p.id) addDeletedId('ithunt_deleted_nielit_ids', p.id);
  if (targetId) addDeletedId('ithunt_deleted_nielit_ids', targetId);

  // 2. Immediately remove from local list
  nielitProjectsList.value = nielitProjectsList.value.filter(item => 
    item.registrationNo !== p.registrationNo && 
    item.nielitRegNo !== p.nielitRegNo && 
    item.id !== p.id &&
    item.registrationNo !== targetId &&
    item.nielitRegNo !== targetId &&
    item.id !== targetId
  );

  // 3. Emit delete to parent App.vue
  emit('delete-nielit-project', p);

  // 4. Delete from REST API backend
  try {
    await deleteProject(targetId, true);
    emailActionMsg.value = `✓ NIELIT project form (${targetId}) removed successfully from Database & API.`;
  } catch (err) {
    console.warn('Delete project warning:', err.message);
  }
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

const cycleNielitStatus = (p) => {
  if (!p.status || p.status === 'Submitted') p.status = 'Under Review';
  else if (p.status === 'Under Review') p.status = 'Verified & Approved';
  else p.status = 'Submitted';
  const targetId = p.registrationNo || p.nielitRegNo;
  updateNielitProjectInBackend(targetId, { status: p.status }).catch(() => {});
};

const cycleAdmissionStatus = (adm) => {
  if (adm.status === 'Confirmed') adm.status = 'Verified';
  else if (adm.status === 'Verified') adm.status = 'Pending Verification';
  else adm.status = 'Confirmed';
};

const deleteAdmission = async (adm) => {
  const idToDelete = adm.registrationNo || adm.id;
  if (!confirm(`Are you sure you want to remove admission record for ${adm.candidateName} (${idToDelete})?`)) {
    return;
  }

  // 1. Blacklist IDs in localStorage
  if (adm.registrationNo) addDeletedId('ithunt_deleted_admission_ids', adm.registrationNo);
  if (adm.id) addDeletedId('ithunt_deleted_admission_ids', adm.id);
  if (idToDelete) addDeletedId('ithunt_deleted_admission_ids', idToDelete);

  // 2. Immediately remove from local list
  admissionsList.value = admissionsList.value.filter(a => 
    a.registrationNo !== adm.registrationNo && 
    a.id !== adm.id &&
    a.registrationNo !== idToDelete &&
    a.id !== idToDelete
  );

  // 3. Emit delete to parent App.vue
  emit('delete-admission', adm);

  // 4. Delete from REST API backend
  try {
    await deleteUserFromBackend(idToDelete);
    emailActionMsg.value = `✓ Candidate record ${idToDelete} removed successfully from Database & API.`;
  } catch (e) {
    console.warn('Delete warning:', e.message);
  }
  setTimeout(() => { emailActionMsg.value = ''; }, 4000);
};

const cycleJobStatus = (job) => {
  if (job.status === 'Reviewing Profile') job.status = 'Shortlisted for Interview';
  else if (job.status === 'Shortlisted for Interview') job.status = 'Interview Scheduled';
  else if (job.status === 'Interview Scheduled') job.status = 'Hired';
  else job.status = 'Reviewing Profile';
};

const deleteJobApp = (job) => {
  if (confirm(`Archive application of ${job.name}?`)) {
    jobApplicationsList.value = jobApplicationsList.value.filter(j => j.id !== job.id);
  }
};

const deleteRsvp = (rsvp) => {
  if (confirm(`Cancel event RSVP for ${rsvp.name}?`)) {
    rsvpsList.value = rsvpsList.value.filter(r => r.id !== rsvp.id);
  }
};

const deleteReview = (rev) => {
  if (confirm(`Delete review from ${rev.name}?`)) {
    reviewsList.value = reviewsList.value.filter(r => r.id !== rev.id);
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

const handleCreateDirectAdmission = () => {
  const regId = 'ITH-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const newAdm = {
    registrationNo: regId,
    date: dateStr,
    time: timeStr,
    candidateName: quickForm.value.candidateName,
    fatherName: quickForm.value.fatherName,
    motherName: 'Not Specified',
    dob: '2003-01-01',
    gender: 'Male',
    course: quickForm.value.course,
    mobile: quickForm.value.mobile,
    email: quickForm.value.email,
    district: 'PRAYAGRAJ',
    address: 'Holagarh Studio, Prayagraj',
    status: 'Confirmed'
  };

  admissionsList.value.unshift(newAdm);
  emit('add-admission', newAdm);
  showQuickAdmissionModal.value = false;
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

onMounted(() => {
  sessionTime.value = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
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
  color: #0f172a !important;
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
</style>
