<template>
  <div id="app">
    <!-- Top Scroll Progress Indicator -->
    <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }" aria-hidden="true"></div>

    <!-- Floating Ambient Aurora Glow Mesh -->
    <div class="ambient-glow-container" aria-hidden="true">
      <div class="ambient-orb ambient-orb-1"></div>
      <div class="ambient-orb ambient-orb-2"></div>
      <div class="ambient-orb ambient-orb-3"></div>
    </div>

    <!-- Cosmic Twinkling Starfield Background Layer -->
    <div class="starfield-wrapper" aria-hidden="true">
      <div class="stars-layer stars-small"></div>
      <div class="stars-layer stars-medium"></div>
      <div class="stars-layer stars-large"></div>
      <div class="shooting-star shooting-star-1"></div>
      <div class="shooting-star shooting-star-2"></div>
      <div class="shooting-star shooting-star-3"></div>
    </div>

    <!-- Celebratory Floating Confetti System -->
    <div class="confetti-container" v-if="showConfetti" aria-hidden="true">
      <div 
        v-for="item in confettiPieces" 
        :key="item.id" 
        class="confetti-piece" 
        :style="item.style"
      ></div>
    </div>

    <!-- Navbar Component -->
    <Navbar 
      :content="content" 
      :activeTab="activeTab" 
      :isDarkMode="isDarkMode" 
      :isAdminLoggedIn="isAdminLoggedIn"
      @set-tab="setTab" 
      @toggle-theme="toggleTheme" 
    />

    <!-- Main Dynamic Views with Animated Morph Transition -->
    <main>
      <Transition name="view-morph" mode="out-in">
        <!-- 1. Home Flow -->
        <HeroSection 
          v-if="activeTab === 'home'" 
          key="home"
          :content="content" 
          @set-tab="setTab" 
          @apply-course="applyForCourse" 
          @open-job-modal="openJobModal" 
        />

        <!-- 2. Dedicated Internships View -->
        <InternshipsSection 
          v-else-if="activeTab === 'internships'" 
          key="internships"
          :content="content" 
          @set-tab="setTab" 
          @open-detail="openCourseDetailModal" 
          @fast-apply="proceedToRegistration" 
        />

        <!-- 3. Dedicated Events & Gallery View -->
        <EventsSection 
          v-else-if="activeTab === 'events'" 
          key="events"
          :content="content" 
          @open-detail="openEventDetailModal" 
          @open-lightbox="openLightbox" 
          @open-rsvp="openRsvpModal" 
        />

        <!-- 4. Dedicated Courses View -->
        <CoursesSection 
          v-else-if="activeTab === 'courses'" 
          key="courses"
          :content="content" 
          @apply-course="applyForCourse" 
        />

        <!-- 5. Dedicated Testimonials View -->
        <TestimonialsSection 
          v-else-if="activeTab === 'testimonials'" 
          key="testimonials"
          :content="content" 
          @set-tab="setTab" 
        />

        <!-- 6. Dedicated Reviews View -->
        <ReviewsSection 
          v-else-if="activeTab === 'reviews'" 
          key="reviews"
          :content="content" 
          @review-submitted="handleReviewSubmitted" 
        />

        <!-- 7. Dedicated Careers & Hiring View -->
        <CareersSection 
          v-else-if="activeTab === 'careers'" 
          key="careers"
          :content="content" 
          @set-tab="setTab" 
          @open-job-modal="openJobModal" 
        />

        <!-- 8. Dedicated Admission View -->
        <AdmissionSection 
          v-else-if="activeTab === 'admission'" 
          key="admission"
          :content="content" 
          :form="form" 
          :lastSubmittedAdmission="lastSubmittedAdmission" 
          :isGeneratingPdf="isGeneratingPdf" 
          @submit-admission="submitAdmission" 
          @download-pdf="downloadAdmissionPdf" 
        />

        <!-- 9. Dedicated Administrator Login View -->
        <LoginSection 
          v-else-if="activeTab === 'login'" 
          key="login"
          :content="content" 
          @login-success="handleLoginSuccess" 
          @set-tab="setTab" 
        />

        <!-- 10. Dedicated SuperAdmin Dashboard View -->
        <SuperAdminSection 
          v-else-if="activeTab === 'superadmin'" 
          key="superadmin"
          :content="content" 
          :adminUser="adminUser"
          :allAdmissions="liveAdmissionsList"
          :allJobApplications="liveJobApplicationsList"
          :allRsvps="liveRsvpsList"
          @logout="handleAdminLogout"
          @download-slip="downloadCustomAdmissionSlip"
          @add-admission="handleDirectAdmission"
          @set-tab="setTab" 
        />
      </Transition>
    </main>

    <!-- Modals with Dynamic Content Injection & Spring Animations -->
    <CourseDetailModal 
      :isOpen="showDetailModal" 
      :track="selectedTrack" 
      :content="content"
      @close="closeCourseDetailModal" 
      @proceed-register="proceedToRegistration" 
    />

    <EventDetailModal 
      :isOpen="showEventDetailModal" 
      :event="selectedEvent" 
      :content="content"
      @close="closeEventDetailModal" 
      @open-lightbox="openLightbox" 
      @apply="closeEventDetailModal(); setTab('admission');" 
    />

    <EventLightbox 
      :isOpen="showFullscreenLightbox" 
      :images="lightboxImages" 
      :currentIndex="lightboxImageIndex" 
      :content="content"
      @close="showFullscreenLightbox = false" 
      @update:currentIndex="lightboxImageIndex = $event" 
    />

    <EventRsvpModal 
      :isOpen="showRsvpModal" 
      :event="selectedUpcomingEvent" 
      :content="content"
      @close="showRsvpModal = false" 
      @submit-rsvp="submitEventRsvp" 
    />

    <JobApplicationModal 
      :isOpen="showJobModal" 
      :job="selectedJob" 
      :content="content"
      @close="showJobModal = false" 
      @submit-job="submitJobApplication" 
    />

    <ConfirmationModal 
      :isOpen="showModal" 
      :title="modalTitle" 
      :body="modalBody" 
      :referenceId="submittedRegistrationNo" 
      :admission="lastSubmittedAdmission" 
      :isGeneratingPdf="isGeneratingPdf" 
      :content="content"
      @close="showModal = false" 
      @download-pdf="downloadAdmissionPdf" 
      @print-slip="printAdmissionSlip" 
    />

    <!-- Hidden Printable Slip for Browser Print Engine -->
    <div id="printable-admission-slip" v-if="lastSubmittedAdmission">
      <div class="pdf-slip-header">
        <div class="pdf-header-brand">
          <img :src="content.brand?.logoImage" :alt="(content.brand?.name || 'IT HUNT') + ' Logo'" class="pdf-logo-img">
          <div>
            <div class="pdf-institute-name">{{ content.printableSlip?.instituteName || content.brand?.name || 'IT HUNT' }}</div>
            <div class="pdf-institute-tagline">{{ content.printableSlip?.instituteTagline || content.brand?.tagline }}</div>
            <div class="pdf-institute-contact">
              {{ content.printableSlip?.instituteAddress || content.contact?.location }}<br>
              Mobile: {{ content.printableSlip?.institutePhone || content.contact?.rawPhone }} | ✉️ {{ content.printableSlip?.instituteEmail || content.contact?.rawEmail }} | 🌐 {{ content.printableSlip?.accreditationText || 'ISO 9001:2015 Accredited' }}
            </div>
          </div>
        </div>
        <div class="pdf-header-seal">
          <span class="pdf-seal-badge">{{ content.printableSlip?.sealBadge || 'OFFICIAL RECEIPT' }}</span>
          <div style="font-size: 10px; color: #64748b; margin-top: 4px; font-weight: 700;">{{ content.printableSlip?.sealSub || 'ORIGINAL COPY' }}</div>
        </div>
      </div>

      <div class="pdf-slip-title-bar">
        <span class="pdf-slip-title">{{ content.printableSlip?.titleBar || 'Admission & Internship Registration Acknowledgment' }}</span>
        <span class="pdf-slip-status">{{ content.printableSlip?.statusBadge || 'STATUS: CONFIRMED' }}</span>
      </div>

      <div class="pdf-reg-highlight-row">
        <div class="pdf-highlight-item">
          <span class="pdf-highlight-lbl">{{ content.printableSlip?.regNoLabel || 'Official Registration No.' }}</span>
          <span class="pdf-highlight-val" style="color: #ea580c;">{{ lastSubmittedAdmission.registrationNo }}</span>
        </div>
        <div class="pdf-highlight-item">
          <span class="pdf-highlight-lbl">{{ content.printableSlip?.regDateLabel || 'Registration Date' }}</span>
          <span class="pdf-highlight-val">{{ lastSubmittedAdmission.date }}</span>
        </div>
        <div class="pdf-highlight-item">
          <span class="pdf-highlight-lbl">{{ content.printableSlip?.sessionLabel || 'Academic Session' }}</span>
          <span class="pdf-highlight-val">{{ content.printableSlip?.sessionText || '2026 - 2027' }}</span>
        </div>
      </div>

      <div class="pdf-two-col-grid">
        <div class="pdf-col-card">
          <div class="pdf-section-title"><span>👤</span> {{ content.printableSlip?.candidateTitle || 'Candidate Particulars' }}</div>
          <div class="pdf-info-list">
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">{{ content.admissionSection?.previewCard?.candidateNameLabel || 'Full Name:' }}</span>
              <span class="pdf-info-val highlight">{{ lastSubmittedAdmission.candidateName }}</span>
            </div>
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">{{ content.admissionSection?.previewCard?.fatherNameLabel || "Father's Name:" }}</span>
              <span class="pdf-info-val">{{ lastSubmittedAdmission.fatherName }}</span>
            </div>
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">Mother's Name:</span>
              <span class="pdf-info-val">{{ lastSubmittedAdmission.motherName }}</span>
            </div>
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">DOB & Gender:</span>
              <span class="pdf-info-val">{{ lastSubmittedAdmission.dob }} | {{ lastSubmittedAdmission.gender }}</span>
            </div>
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">Contact Mobile:</span>
              <span class="pdf-info-val">{{ lastSubmittedAdmission.mobile }}</span>
            </div>
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">Email Address:</span>
              <span class="pdf-info-val">{{ lastSubmittedAdmission.email }}</span>
            </div>
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">Address:</span>
              <span class="pdf-info-val">{{ lastSubmittedAdmission.address }}, {{ lastSubmittedAdmission.district }}</span>
            </div>
          </div>
        </div>

        <div class="pdf-col-card">
          <div class="pdf-section-title"><span>📚</span> {{ content.printableSlip?.programTitle || 'Program & Training Allocation' }}</div>
          <div class="pdf-info-list">
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">Enrolled Track:</span>
              <span class="pdf-info-val highlight">{{ lastSubmittedAdmission.course }}</span>
            </div>
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">Campus / Center:</span>
              <span class="pdf-info-val">{{ content.printableSlip?.campusValue || 'IT HUNT Software Studio, Holagarh Campus' }}</span>
            </div>
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">Workstation:</span>
              <span class="pdf-info-val">{{ content.printableSlip?.workstationValue || 'Dedicated PC + High-Speed Fiber' }}</span>
            </div>
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">Certification:</span>
              <span class="pdf-info-val">{{ content.printableSlip?.certificationValue || 'ISO 9001:2015 + Corporate LOR' }}</span>
            </div>
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">Session:</span>
              <span class="pdf-info-val">Academic Batch {{ content.printableSlip?.sessionText || '2026 - 2027' }}</span>
            </div>
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">Reporting:</span>
              <span class="pdf-info-val">{{ content.printableSlip?.reportingValue || '09:30 AM Onboarding' }}</span>
            </div>
            <div class="pdf-info-row">
              <span class="pdf-info-lbl">Status:</span>
              <span class="pdf-info-val" style="color: #16a34a; font-weight: 800;">{{ content.printableSlip?.admittedStatusValue || 'PROVISIONALLY ADMITTED' }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pdf-guidelines-box">
        <div class="pdf-guidelines-title">{{ content.printableSlip?.guidelinesTitle || '⚠️ Mandatory Candidate Instructions for Day 1:' }}</div>
        <ul class="pdf-guidelines-list">
          <li v-for="(guide, gIdx) in (content.printableSlip?.guidelines || [])" :key="gIdx">
            {{ guide }}
          </li>
        </ul>
      </div>

      <div class="pdf-footer-signatures">
        <div class="pdf-security-stamp">
          <div>🛡️ <strong>{{ content.printableSlip?.securityNote || 'System Generated Official Document' }}</strong></div>
          <div>{{ content.printableSlip?.securitySub || 'Verified via IT HUNT Central Academic Database' }}</div>
          <div>Generated on: {{ lastSubmittedAdmission.date }} at {{ lastSubmittedAdmission.time }}</div>
        </div>
        <div class="pdf-sig-box">
          <div class="pdf-sig-title">{{ content.printableSlip?.signatoryTitle || 'Authorized Signatory' }}</div>
          <div class="pdf-sig-name">{{ content.printableSlip?.signatoryName || content.director?.name || 'Mr. Lakshman Singh Chauhan' }}</div>
          <div class="pdf-sig-designation">{{ content.printableSlip?.signatoryDesignation || 'Director & Founder, IT HUNT | MCA' }}</div>
        </div>
      </div>
    </div>

    <!-- Footer Component with Legal PDF Triggers -->
    <Footer 
      :content="content" 
      @set-tab="setTab" 
      @open-privacy-policy="openPrivacyPolicyPdf"
      @open-terms-conditions="openTermsConditionsPdf"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import CONTENT_DATA from './data/contentData.js';
import { generateAdmissionPdf, generatePrivacyPolicyPdf, generateTermsConditionsPdf } from './utils/pdfGenerator.js';
import { sendAdmissionEmailNotification, sendJobEmailNotification, sendRsvpEmailNotification } from './utils/emailNotifier.js';

import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import HeroSection from './components/sections/HeroSection.vue';
import InternshipsSection from './components/sections/InternshipsSection.vue';
import EventsSection from './components/sections/EventsSection.vue';
import CoursesSection from './components/sections/CoursesSection.vue';
import TestimonialsSection from './components/sections/TestimonialsSection.vue';
import ReviewsSection from './components/sections/ReviewsSection.vue';
import CareersSection from './components/sections/CareersSection.vue';
import AdmissionSection from './components/sections/AdmissionSection.vue';
import LoginSection from './components/sections/LoginSection.vue';
import SuperAdminSection from './components/sections/SuperAdminSection.vue';

import CourseDetailModal from './components/modals/CourseDetailModal.vue';
import EventDetailModal from './components/modals/EventDetailModal.vue';
import EventLightbox from './components/modals/EventLightbox.vue';
import EventRsvpModal from './components/modals/EventRsvpModal.vue';
import JobApplicationModal from './components/modals/JobApplicationModal.vue';
import ConfirmationModal from './components/modals/ConfirmationModal.vue';

const content = ref(CONTENT_DATA);
const activeTab = ref('home');
const isDarkMode = ref(true);
const scrollProgress = ref(0);
const showConfetti = ref(false);
const confettiPieces = ref([]);

// SuperAdmin & Auth Session State
const isAdminLoggedIn = ref(false);
const adminUser = ref({
  name: 'Mr. Lakshman Singh Chauhan',
  role: 'Director & Chief Administrator',
  email: 'admin@ithunt.com',
  avatar: 'img/ithunt.webp'
});

// Live registries synced dynamically
const liveAdmissionsList = ref([]);
const liveJobApplicationsList = ref([]);
const liveRsvpsList = ref([]);

// Admission Form State
const form = ref({
  candidateName: '',
  fatherName: '',
  motherName: '',
  dob: '',
  gender: 'Male',
  course: 'Web Development (MERN Stack & Cloud Architecture)',
  mobile: '',
  email: '',
  district: 'PRAYAGRAJ',
  address: ''
});

const lastSubmittedAdmission = ref(null);
const isGeneratingPdf = ref(false);

// Modal States
const showDetailModal = ref(false);
const selectedTrack = ref({});

const showEventDetailModal = ref(false);
const selectedEvent = ref({});

const showFullscreenLightbox = ref(false);
const lightboxImages = ref([]);
const lightboxImageIndex = ref(0);

const showRsvpModal = ref(false);
const selectedUpcomingEvent = ref({});

const showJobModal = ref(false);
const selectedJob = ref({});

const showModal = ref(false);
const modalTitle = ref('');
const modalBody = ref('');
const submittedRegistrationNo = ref('');

// Scroll Progress Tracker
const handleScroll = () => {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (totalHeight > 0) {
    scrollProgress.value = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
  }
};

// Trigger Celebratory Confetti Burst
const triggerConfetti = () => {
  const colors = ['#ff6b00', '#f97316', '#facc15', '#f59e0b', '#10b981', '#38bdf8', '#a855f7'];
  const pieces = [];
  for (let i = 0; i < 40; i++) {
    pieces.push({
      id: 'conf-' + i + '-' + Date.now(),
      style: {
        left: Math.random() * 100 + 'vw',
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        transform: `rotate(${Math.random() * 360}deg)`,
        animationDuration: 2.2 + Math.random() * 2 + 's',
        animationDelay: Math.random() * 0.4 + 's'
      }
    });
  }
  confettiPieces.value = pieces;
  showConfetti.value = true;
  setTimeout(() => {
    showConfetti.value = false;
    confettiPieces.value = [];
  }, 4200);
};

// Methods
const setTab = (tab) => {
  activeTab.value = tab;
  // Keep URL completely clean without exposing hash fragment
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('light-theme', !isDarkMode.value);
};

const applyForCourse = (courseName) => {
  form.value.course = courseName;
  setTab('admission');
};

const openCourseDetailModal = (track) => {
  selectedTrack.value = track;
  showDetailModal.value = true;
};

const closeCourseDetailModal = () => {
  showDetailModal.value = false;
};

const proceedToRegistration = (track) => {
  closeCourseDetailModal();
  form.value.course = track.title;
  setTab('admission');
};

const openEventDetailModal = (event) => {
  selectedEvent.value = event;
  showEventDetailModal.value = true;
};

const closeEventDetailModal = () => {
  showEventDetailModal.value = false;
};

const openLightbox = (payload) => {
  lightboxImages.value = payload.images || [];
  lightboxImageIndex.value = payload.index || 0;
  showFullscreenLightbox.value = true;
};

const openRsvpModal = (upEv) => {
  selectedUpcomingEvent.value = upEv;
  showRsvpModal.value = true;
};

const submitEventRsvp = (rsvpData) => {
  showRsvpModal.value = false;
  const passId = 'EVT-' + Math.floor(100000 + Math.random() * 900000);
  submittedRegistrationNo.value = passId;
  
  const rsvpRecord = {
    id: passId,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    name: rsvpData.name,
    email: rsvpData.email,
    phone: rsvpData.phone,
    eventTitle: rsvpData.eventTitle,
    college: rsvpData.college,
    status: 'VIP Entry Pass Confirmed'
  };

  // Real-time sync into SuperAdmin registry
  liveRsvpsList.value.unshift(rsvpRecord);

  // Send automatic email notification to softtechithunt@gmail.com
  sendRsvpEmailNotification(rsvpRecord).catch(() => {});

  modalTitle.value = content.value?.ui?.eventRsvpSuccessTitle || 'Free Event Pass Confirmed! 🎟️';
  modalBody.value = `Congratulations ${rsvpData.name}! Your free VIP entry pass for "${rsvpData.eventTitle}" has been booked. A confirmation SMS will be sent to +91 ${rsvpData.phone}.`;
  showModal.value = true;
  triggerConfetti();
};

const openJobModal = (job) => {
  selectedJob.value = job;
  showJobModal.value = true;
};

const submitJobApplication = (jobData) => {
  showJobModal.value = false;
  const appId = 'JOB-' + Math.floor(100000 + Math.random() * 900000);
  submittedRegistrationNo.value = appId;
  
  const jobRecord = {
    id: appId,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    name: jobData.name,
    email: jobData.email,
    phone: jobData.phone,
    position: jobData.jobTitle,
    experience: jobData.experience || '4+ Years',
    portfolio: jobData.portfolio,
    currentCompany: jobData.currentCompany || 'Software Company',
    status: 'Reviewing Profile'
  };

  // Real-time sync into SuperAdmin registry
  liveJobApplicationsList.value.unshift(jobRecord);

  // Send automatic email notification to softtechithunt@gmail.com
  sendJobEmailNotification(jobRecord).catch(() => {});

  modalTitle.value = content.value?.ui?.jobApplicationSuccessTitle || 'Job Application Received! 💼';
  modalBody.value = `Thank you ${jobData.name}! Your application for "${jobData.jobTitle}" has been forwarded to our HR & Academic Board.`;
  showModal.value = true;
  triggerConfetti();
};

const handleReviewSubmitted = (review) => {
  submittedRegistrationNo.value = '';
  modalTitle.value = content.value?.ui?.reviewSubmitSuccessTitle || 'Review Published Successfully! ⭐';
  modalBody.value = `Thank you ${review.name} for rating IT HUNT ${review.rating} Stars! Your review is now live on our student ratings scorecard.`;
  showModal.value = true;
  triggerConfetti();
};

const submitAdmission = (formData) => {
  const randomRegId = 'ITH-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const newAdmissionRecord = {
    registrationNo: randomRegId,
    date: dateStr,
    time: timeStr,
    candidateName: formData.candidateName,
    fatherName: formData.fatherName,
    motherName: formData.motherName,
    dob: formData.dob,
    gender: formData.gender,
    course: formData.course,
    mobile: formData.mobile,
    email: formData.email,
    district: formData.district || 'PRAYAGRAJ',
    address: formData.address,
    status: 'Confirmed'
  };

  submittedRegistrationNo.value = randomRegId;
  lastSubmittedAdmission.value = newAdmissionRecord;
  liveAdmissionsList.value.unshift(newAdmissionRecord);

  // Trigger automatic email dispatch to softtechithunt@gmail.com
  sendAdmissionEmailNotification(newAdmissionRecord).catch(() => {});

  modalTitle.value = content.value?.ui?.admissionSuccessTitle || 'Admission Registered Successfully! 🎓';
  modalBody.value = `Congratulations ${formData.candidateName}! Your admission/internship application for "${formData.course}" has been confirmed. You can now download your official verified Admission Registration Slip in PDF format.`;
  showModal.value = true;
  triggerConfetti();
};

const handleLoginSuccess = (user) => {
  isAdminLoggedIn.value = true;
  adminUser.value = user;
  activeTab.value = 'superadmin';
  triggerConfetti();
};

const handleAdminLogout = () => {
  isAdminLoggedIn.value = false;
  try {
    sessionStorage.removeItem('ithunt_superadmin_auth');
  } catch (e) {}
  activeTab.value = 'home';
};

const handleDirectAdmission = (newAdm) => {
  lastSubmittedAdmission.value = newAdm;
  triggerConfetti();
};

const downloadCustomAdmissionSlip = (adm) => {
  isGeneratingPdf.value = true;
  setTimeout(() => {
    generateAdmissionPdf(adm);
    isGeneratingPdf.value = false;
  }, 100);
};

const downloadAdmissionPdf = () => {
  if (!lastSubmittedAdmission.value) return;
  isGeneratingPdf.value = true;
  setTimeout(() => {
    generateAdmissionPdf(lastSubmittedAdmission.value);
    isGeneratingPdf.value = false;
  }, 100);
};

const openPrivacyPolicyPdf = () => {
  generatePrivacyPolicyPdf(content.value?.privacyPolicyData);
};

const openTermsConditionsPdf = () => {
  generateTermsConditionsPdf(content.value?.termsConditionsData);
};

const printAdmissionSlip = () => {
  window.print();
};

// Dynamic SEO Metadata Updater for SPA Views
const updateSeoMetadata = (tab) => {
  if (typeof document === 'undefined') return;
  const metaObj = content.value?.seoPages?.[tab] || content.value?.seoPages?.home || {};

  // 1. Update Document Title
  if (metaObj.title) {
    document.title = metaObj.title;
  }

  // Helper to set or create <meta> tags
  const setMetaTag = (selector, attrName, attrVal, contentVal) => {
    if (!contentVal) return;
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', contentVal);
  };

  // 2. Standard Description & Keywords
  if (metaObj.description) {
    setMetaTag('meta[name="description"]', 'name', 'description', metaObj.description);
  }
  if (metaObj.keywords) {
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', metaObj.keywords);
  }

  // 3. Open Graph Social Card Tags
  if (metaObj.ogTitle || metaObj.title) {
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', metaObj.ogTitle || metaObj.title);
  }
  if (metaObj.ogDescription || metaObj.description) {
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', metaObj.ogDescription || metaObj.description);
  }
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
  if (typeof window !== 'undefined') {
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', window.location.href);
  }

  // 4. Twitter Card Meta Tags
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', metaObj.ogTitle || metaObj.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', metaObj.ogDescription || metaObj.description);

  // 5. Canonical URL Link Tag
  if (typeof window !== 'undefined') {
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', window.location.href);
  }
};

// Synchronize SEO metadata whenever active tab changes
watch(activeTab, (newTab) => {
  updateSeoMetadata(newTab);
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Restore saved admin session if any
  try {
    const savedAdmin = sessionStorage.getItem('ithunt_superadmin_auth');
    if (savedAdmin) {
      adminUser.value = JSON.parse(savedAdmin);
      isAdminLoggedIn.value = true;
    }
  } catch (e) {}

  // If user arrived with a hash (e.g. #admission, #login, #superadmin), open the corresponding view then immediately clear the hash from the URL bar
  if (window.location.hash) {
    const rawHash = window.location.hash.replace('#', '').toLowerCase().trim();
    if (rawHash === 'admission' || rawHash === 'admisson') {
      activeTab.value = 'admission';
    } else if (rawHash === 'login') {
      activeTab.value = 'login';
    } else if (rawHash === 'superadmin' || rawHash === 'admin') {
      activeTab.value = isAdminLoggedIn.value ? 'superadmin' : 'login';
    } else if (['home', 'internships', 'courses', 'careers', 'reviews', 'testimonials', 'events'].includes(rawHash)) {
      activeTab.value = rawHash;
    }
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  // Initialize SEO Metadata for active view
  updateSeoMetadata(activeTab.value);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
