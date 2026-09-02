<template>
  <div id="app">
    <!-- Top Scroll Progress Indicator -->
    <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }" aria-hidden="true"></div>

    <!-- Cosmic Twinkling Starfield Layer -->
    <div class="starfield-wrapper" aria-hidden="true">
      <div class="stars-layer stars-small"></div>
      <div class="stars-layer stars-medium"></div>
      <div class="stars-layer stars-large"></div>
      <div class="shooting-star shooting-star-1"></div>
      <div class="shooting-star shooting-star-2"></div>
      <div class="shooting-star shooting-star-3"></div>
    </div>

    <!-- Floating Ambient Glow Orbs Layer -->
    <div class="ambient-glow-container" aria-hidden="true">
      <div class="ambient-orb ambient-orb-1"></div>
      <div class="ambient-orb ambient-orb-2"></div>
      <div class="ambient-orb ambient-orb-3"></div>
    </div>

    <!-- Subtle Clean Background Accent Layer -->
    <div class="subtle-bg-gradient" aria-hidden="true"></div>

    <!-- Confetti Burst Layer -->
    <div v-if="showConfetti" class="confetti-container" aria-hidden="true">
      <div v-for="piece in confettiPieces" :key="piece.id" class="confetti-piece" :style="piece.style"></div>
    </div>

    <!-- Toast Notification Stack -->
    <div class="toast-stack" aria-live="polite" aria-label="Notifications">
      <Transition name="toast" v-for="toast in toasts" :key="toast.id">
        <div :class="['toast-item', 'toast-' + toast.type]">
          <span class="toast-icon">{{ toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️' }}</span>
          <span class="toast-msg">{{ toast.message }}</span>
          <button class="toast-close" @click="toasts = toasts.filter(t => t.id !== toast.id)">✕</button>
        </div>
      </Transition>
    </div>

    <!-- WhatsApp Floating CTA -->
    <a
      :href="'https://wa.me/' + (content.contact?.whatsapp || '919795771806') + '?text=Hello%20IT%20HUNT%20Team%2C%20I%20want%20to%20know%20more%20about%20your%20internship%20programs.'" 
      target="_blank" 
      rel="noopener noreferrer"
      class="whatsapp-float-btn"
      :class="{ visible: showBackToTop }"
      title="Chat with us on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="26" height="26"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    </a>


    <!-- Navbar Component -->
    <Navbar 
      :content="content" 
      :activeTab="activeTab" 
      :isDarkMode="isDarkMode" 
      :isAdminLoggedIn="isAdminLoggedIn"
      @set-tab="setTab" 
      @toggle-theme="toggleTheme" 
      @open-nielit-modal="showNielitModal = true"
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
          @open-nielit-modal="showNielitModal = true"
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
          :allNielitProjects="liveNielitProjectsList"
          :allStudents="liveStudentsList"
          :allInternships="liveInternshipsList"
          :allFees="liveFeesList"
          :allCertificates="liveCertificatesList"
          :allProjects="liveProjectsList"
          :allContactInquiries="liveContactInquiriesList"
          :allReviews="liveReviewsList"
          :allUsers="liveUsersList"
          @logout="handleAdminLogout"
          @download-slip="downloadCustomAdmissionSlip"
          @download-nielit-pdf="downloadNielitProjectPdfDoc"
          @add-admission="handleDirectAdmission"
          @delete-admission="handleDeleteAdmission"
          @delete-student="handleDeleteStudent"
          @update-nielit-project="handleUpdateNielitProject"
          @delete-nielit-project="handleDeleteNielitProject"
          @set-tab="setTab" 
        />

        <!-- 11. Dedicated Student Portal View -->
        <StudentPortalSection 
          v-else-if="activeTab === 'student-portal'" 
          key="student-portal"
          :content="content" 
          :studentUser="studentUser"
          @student-login="handleStudentLogin"
          @student-signup="handleStudentSignup"
          @update-student-profile="handleUpdateStudentProfile"
          @student-logout="handleStudentLogout"
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

    <NielitProjectModal 
      v-if="showNielitModal" 
      @close="showNielitModal = false" 
      @submit-nielit-project="submitNielitProject" 
    />

    <NielitPdfPreviewModal 
      v-if="showNielitPreviewModal" 
      :projectData="submittedNielitData" 
      @close="showNielitPreviewModal = false" 
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

    <!-- Floating Back to Top Action Button -->
    <button 
      class="floating-back-to-top" 
      :class="{ visible: showBackToTop }" 
      @click="scrollToTop" 
      title="Scroll to Top"
      aria-label="Back to Top"
    >
      <span>↑</span>
    </button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import CONTENT_DATA from './data/contentData.js';
import { generateAdmissionPdf, generatePrivacyPolicyPdf, generateTermsConditionsPdf, getAdmissionPdfBlob } from './utils/pdfGenerator.js';
import { generateNielitProjectPdf, getNielitProjectPdfBlob } from './utils/nielitPdfGenerator.js';
import { sendAdmissionEmailNotification, sendJobEmailNotification, sendRsvpEmailNotification, sendNielitProjectEmailNotification } from './utils/emailNotifier.js';
import { 
  saveNielitProjectRecord, 
  saveAdmissionRecord, 
  saveJobApplicationRecord, 
  saveRsvpRecord, 
  fetchAdmissionsFromBackend, 
  fetchJobApplicationsFromBackend, 
  fetchRsvpsFromBackend, 
  fetchNielitProjectsFromBackend, 
  fetchStudentsFromBackend,
  fetchInternshipsFromBackend,
  fetchFeesFromBackend,
  fetchCertificatesFromBackend,
  fetchProjectsFromBackend,
  fetchContactInquiriesFromBackend,
  fetchReviewsFromBackend,
  fetchUsersFromBackend,
  deleteStudentFromBackend,
  deleteUserFromBackend,
  deleteAdmissionFromBackend,
  registerStudentUser, 
  loginStudentUser, 
  updateStudentProfile 
} from './utils/apiClient.js';
import { triggerMobileMessageNotification } from './utils/smsNotifier.js';

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
import StudentPortalSection from './components/sections/StudentPortalSection.vue';

import CourseDetailModal from './components/modals/CourseDetailModal.vue';
import EventDetailModal from './components/modals/EventDetailModal.vue';
import EventLightbox from './components/modals/EventLightbox.vue';
import EventRsvpModal from './components/modals/EventRsvpModal.vue';
import JobApplicationModal from './components/modals/JobApplicationModal.vue';
import NielitProjectModal from './components/modals/NielitProjectModal.vue';
import NielitPdfPreviewModal from './components/modals/NielitPdfPreviewModal.vue';
import ConfirmationModal from './components/modals/ConfirmationModal.vue';

const content = ref(CONTENT_DATA);
const activeTab = ref('home');
const isDarkMode = ref(true);
const scrollProgress = ref(0);
const showBackToTop = ref(false);
const showConfetti = ref(false);
const confettiPieces = ref([]);

// Toast Notification System
const toasts = ref([]);
let toastIdCounter = 0;
const showToast = (message, type = 'success', duration = 4000) => {
  const id = ++toastIdCounter;
  toasts.value.push({ id, message, type });
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, duration);
};

// Scroll-reveal IntersectionObserver
let revealObserver = null;

// SuperAdmin & Auth Session State
const isAdminLoggedIn = ref(false);
const adminUser = ref({
  name: 'Mr. Lakshman Singh Chauhan',
  role: 'Director & Chief Administrator',
  email: 'admin@ithunt.com',
  avatar: 'img/ithunt.webp'
});

// Student Session & Auth State
const studentUser = ref(null);
try {
  const savedStudent = localStorage.getItem('ithunt_student_user');
  if (savedStudent) studentUser.value = JSON.parse(savedStudent);
} catch (e) {}

const handleStudentLogin = async ({ email, password }, callback) => {
  try {
    const res = await loginStudentUser(email, password);
    if (res.success && res.user) {
      studentUser.value = { ...res.user };
      localStorage.setItem('ithunt_student_user', JSON.stringify(studentUser.value));
      if (callback) callback(null);
    } else {
      if (callback) callback(res.error || 'Invalid email or password. Please check your credentials.');
    }
  } catch (err) {
    if (callback) callback(err.message || 'Authentication error.');
  }
};

const handleStudentSignup = async (signupData, callback) => {
  try {
    const res = await registerStudentUser(signupData);
    if (res.success && res.user) {
      studentUser.value = { ...res.user };
      localStorage.setItem('ithunt_student_user', JSON.stringify(studentUser.value));
      
      const admRes = await saveAdmissionRecord({
        fullName: signupData.candidateName || signupData.fullName || signupData.name || '',
        candidateName: signupData.candidateName || signupData.fullName || signupData.name || '',
        email: signupData.email || '',
        phone: signupData.mobile || signupData.phone || '',
        mobile: signupData.mobile || signupData.phone || '',
        course: signupData.course || '',
        track: signupData.track || signupData.course || '',
        qualification: signupData.qualification || '',
        address: signupData.address || ''
      });

      if (admRes && admRes.success) {
        const finalAdm = admRes.record || res.user;
        const existingIdx = liveAdmissionsList.value.findIndex(a => a.registrationNo === finalAdm.registrationNo);
        if (existingIdx === -1) {
          liveAdmissionsList.value.unshift(finalAdm);
        }
        if (callback) callback(null);
      } else {
        if (callback) callback(admRes?.error || 'Failed to submit admission application to database server');
      }
    } else {
      if (callback) callback(res.error || 'Registration failed. Please try again.');
    }
  } catch (err) {
    if (callback) callback(err.message || 'Registration error.');
  }
};

const handleUpdateStudentProfile = async (updatedData) => {
  if (!studentUser.value) return;
  const merged = { ...studentUser.value, ...updatedData };
  studentUser.value = merged;
  localStorage.setItem('ithunt_student_user', JSON.stringify(merged));

  const idx = liveAdmissionsList.value.findIndex(s => s.registrationNo === merged.registrationNo || s.email === merged.email);
  if (idx !== -1) {
    liveAdmissionsList.value[idx] = { ...liveAdmissionsList.value[idx], ...updatedData };
  }

  await updateStudentProfile(merged);
};

const handleStudentLogout = () => {
  studentUser.value = null;
  localStorage.removeItem('ithunt_student_user');
};

// Live registries synced 100% dynamically with live database API (All Swagger API Collections)
const liveAdmissionsList = ref([]);
const liveJobApplicationsList = ref([]);
const liveRsvpsList = ref([]);
const liveNielitProjectsList = ref([]);
const liveStudentsList = ref([]);
const liveInternshipsList = ref([]);
const liveFeesList = ref([]);
const liveCertificatesList = ref([]);
const liveProjectsList = ref([]);
const liveContactInquiriesList = ref([]);
const liveReviewsList = ref([]);
const liveUsersList = ref([]);

const handleDeleteStudent = async (student) => {
  const idToDelete = student.id || student.userId;
  liveStudentsList.value = liveStudentsList.value.filter(s => s.id !== idToDelete && s.userId !== idToDelete);
  await deleteStudentFromBackend(student);
};

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

const showNielitModal = ref(false);
const showNielitPreviewModal = ref(false);
const submittedNielitData = ref(null);

const showModal = ref(false);
const modalTitle = ref('');
const modalBody = ref('');
const submittedRegistrationNo = ref('');

// Scroll Progress Tracker & Floating Action Controller
const handleScroll = () => {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (totalHeight > 0) {
    scrollProgress.value = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
  }
  showBackToTop.value = window.scrollY > 320;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Save to Firebase Firestore & local storage
  saveRsvpRecord(rsvpRecord).catch(() => {});

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

  // Save to Firebase Firestore & local storage
  saveJobApplicationRecord(jobRecord).catch(() => {});

  // Send automatic email notification to softtechithunt@gmail.com
  sendJobEmailNotification(jobRecord).catch(() => {});

  modalTitle.value = content.value?.ui?.jobApplicationSuccessTitle || 'Job Application Received! 💼';
  modalBody.value = `Thank you ${jobData.name}! Your application for "${jobData.jobTitle}" has been forwarded to our HR & Academic Board.`;
  showModal.value = true;
  triggerConfetti();
};

const submitNielitProject = async (projectData) => {
  showNielitModal.value = false;
  submittedNielitData.value = projectData;

  const regId = projectData.nielitRegNo || ('NIELIT-' + Math.floor(100000 + Math.random() * 900000));
  submittedRegistrationNo.value = regId;

  const nielitRecord = {
    registrationNo: regId,
    ...projectData,
    status: 'Submitted'
  };

  liveNielitProjectsList.value.unshift(nielitRecord);

  // Save to Firebase Firestore & local storage
  let fbDocId = regId;
  try {
    const res = await saveNielitProjectRecord(nielitRecord);
    if (res && res.id) fbDocId = res.id;
  } catch (e) {}

  // Dispatch email notification with 4-page PDF attachment EXCLUSIVELY to Admin
  try {
    const pdfBlob = getNielitProjectPdfBlob(projectData);
    sendNielitProjectEmailNotification(projectData, pdfBlob).catch(() => {});
  } catch (e) {
    sendNielitProjectEmailNotification(projectData).catch(() => {});
  }

  // Display Success Dialog Box
  modalTitle.value = '🎉 Project Data Stored Successfully in Firebase!';
  modalBody.value = `Congratulations ${projectData.candidateName}! Your ${projectData.nielitLevel || 'O'} Level Project record (Reg No: ${regId}) has been successfully saved to your Firebase Firestore Database & Users collection.\n\n🔥 Firebase Document ID: ${fbDocId}`;
  showModal.value = true;
  triggerConfetti();
};

const downloadNielitProjectPdfDoc = (projectData) => {
  generateNielitProjectPdf(projectData);
};

const handleReviewSubmitted = (review) => {
  submittedRegistrationNo.value = '';
  modalTitle.value = content.value?.ui?.reviewSubmitSuccessTitle || 'Review Published Successfully! ⭐';
  modalBody.value = `Thank you ${review.name} for rating IT HUNT ${review.rating} Stars! Your review is now live on our student ratings scorecard.`;
  showModal.value = true;
  triggerConfetti();
};

const submitAdmission = async (formData) => {
  const randomRegId = 'ITH-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const newAdmissionRecord = {
    registrationNo: randomRegId,
    date: dateStr,
    time: timeStr,
    candidateName: formData.candidateName || formData.fullName || '',
    fullName: formData.fullName || formData.candidateName || '',
    fatherName: formData.fatherName || '',
    motherName: formData.motherName || '',
    dob: formData.dob || '',
    gender: formData.gender || 'Male',
    course: formData.course || '',
    track: formData.track || formData.course || '',
    qualification: formData.qualification || '',
    mobile: formData.mobile || formData.phone || '',
    phone: formData.phone || formData.mobile || '',
    email: formData.email || '',
    district: formData.district || 'PRAYAGRAJ',
    address: formData.address || '',
    status: 'Confirmed'
  };

  // POST http://localhost:3000/api/admissions
  const apiRes = await saveAdmissionRecord(newAdmissionRecord);

  if (apiRes && apiRes.success) {
    const finalRegNo = apiRes.record?.registrationNo || apiRes.id || randomRegId;
    newAdmissionRecord.registrationNo = finalRegNo;

    submittedRegistrationNo.value = finalRegNo;
    lastSubmittedAdmission.value = newAdmissionRecord;

    const existingIdx = liveAdmissionsList.value.findIndex(a => a.registrationNo === finalRegNo);
    if (existingIdx === -1) {
      liveAdmissionsList.value.unshift(newAdmissionRecord);
    }

    try {
      const pdfBlob = getAdmissionPdfBlob(newAdmissionRecord);
      sendAdmissionEmailNotification(newAdmissionRecord, pdfBlob).catch(() => {});
    } catch (e) {
      sendAdmissionEmailNotification(newAdmissionRecord).catch(() => {});
    }
    triggerMobileMessageNotification(newAdmissionRecord).catch(() => {});

    modalTitle.value = '🎉 Admission Application Submitted Successfully!';
    modalBody.value = `Congratulations ${newAdmissionRecord.candidateName}! Your student admission for "${newAdmissionRecord.course}" has been successfully submitted to the database API (http://localhost:3000/api/admissions).\n\n📋 Registration No: ${finalRegNo}\n✉️ Confirmation details sent to ${newAdmissionRecord.email}.`;
    showModal.value = true;
    triggerConfetti();
  } else {
    submittedRegistrationNo.value = '';
    modalTitle.value = '❌ Admission Submission Failed';
    modalBody.value = `Error submitting admission application: ${apiRes?.error || 'Unable to connect to http://localhost:3000/api/admissions'}. Please check if the backend API server is running and try again.`;
    showModal.value = true;
  }
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

const handleDirectAdmission = async (newAdm) => {
  lastSubmittedAdmission.value = newAdm;
  
  // 1. Immediately update local state to show in admissions list
  const existingIdx = liveAdmissionsList.value.findIndex(a => a.registrationNo === newAdm.registrationNo);
  if (existingIdx === -1) {
    liveAdmissionsList.value.unshift(newAdm);
  }

  // 2. Persist directly to Firebase Firestore, Realtime DB & REST API backend
  try {
    await saveAdmissionRecord(newAdm);
    console.log('✓ Admin direct admission saved to Firebase Firestore & Users collection:', newAdm.registrationNo);
  } catch (err) {
    console.warn('Firebase save warning (Direct Admission):', err.message);
  }

  // 3. Trigger dual email notification for Admin & Student as well as mobile notifications
  try {
    const pdfBlob = getAdmissionPdfBlob(newAdm);
    sendAdmissionEmailNotification(newAdm, pdfBlob).catch(() => {});
  } catch (e) {
    sendAdmissionEmailNotification(newAdm).catch(() => {});
  }
  triggerMobileMessageNotification(newAdm).catch(() => {});
  triggerConfetti();
};

const handleDeleteAdmission = async (adm) => {
  const idToDelete = adm.registrationNo || adm.id;
  liveAdmissionsList.value = liveAdmissionsList.value.filter(a => 
    a.registrationNo !== idToDelete && 
    a.id !== idToDelete &&
    a.registrationNo !== adm.registrationNo && 
    a.id !== adm.id
  );
  await deleteAdmissionFromBackend(adm);
};

const handleUpdateNielitProject = (updatedProject) => {
  const targetId = updatedProject.registrationNo || updatedProject.nielitRegNo;
  const idx = liveNielitProjectsList.value.findIndex(p => p.registrationNo === targetId || p.nielitRegNo === targetId);
  if (idx !== -1) {
    liveNielitProjectsList.value[idx] = { ...liveNielitProjectsList.value[idx], ...updatedProject };
  }
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_nielit_projects') || '[]');
    const eIdx = existing.findIndex(p => p.registrationNo === targetId || p.nielitRegNo === targetId);
    if (eIdx !== -1) {
      existing[eIdx] = { ...existing[eIdx], ...updatedProject };
      localStorage.setItem('ithunt_nielit_projects', JSON.stringify(existing));
    }
  } catch (e) {}
};

const handleDeleteNielitProject = (project) => {
  const targetId = project.registrationNo || project.nielitRegNo || project.id;
  try {
    const deleted = JSON.parse(localStorage.getItem('ithunt_deleted_nielit_ids') || '[]');
    if (project.registrationNo && !deleted.includes(project.registrationNo)) deleted.push(project.registrationNo);
    if (project.nielitRegNo && !deleted.includes(project.nielitRegNo)) deleted.push(project.nielitRegNo);
    if (project.id && !deleted.includes(project.id)) deleted.push(project.id);
    if (targetId && !deleted.includes(targetId)) deleted.push(targetId);
    localStorage.setItem('ithunt_deleted_nielit_ids', JSON.stringify(deleted));
  } catch (e) {}

  liveNielitProjectsList.value = liveNielitProjectsList.value.filter(p => 
    p.registrationNo !== targetId && 
    p.nielitRegNo !== targetId && 
    p.id !== targetId &&
    p.registrationNo !== project.registrationNo && 
    p.nielitRegNo !== project.nielitRegNo && 
    p.id !== project.id
  );
  try {
    const existing = JSON.parse(localStorage.getItem('ithunt_nielit_projects') || '[]');
    const filtered = existing.filter(p => 
      p.registrationNo !== targetId && 
      p.nielitRegNo !== targetId && 
      p.id !== targetId &&
      p.registrationNo !== project.registrationNo && 
      p.nielitRegNo !== project.nielitRegNo && 
      p.id !== project.id
    );
    localStorage.setItem('ithunt_nielit_projects', JSON.stringify(filtered));
  } catch (e) {}
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

  // Load 100% live database records across all Swagger API endpoints from ithunt-api REST API
  const loadInitialData = async () => {
    try {
      const [
        admissions, jobs, rsvps, nielitProjects, students,
        internships, fees, certificates, projects, contactInquiries, reviews, users
      ] = await Promise.all([
        fetchAdmissionsFromBackend(),
        fetchJobApplicationsFromBackend(),
        fetchRsvpsFromBackend(),
        fetchNielitProjectsFromBackend(),
        fetchStudentsFromBackend(),
        fetchInternshipsFromBackend(),
        fetchFeesFromBackend(),
        fetchCertificatesFromBackend(),
        fetchProjectsFromBackend(),
        fetchContactInquiriesFromBackend(),
        fetchReviewsFromBackend(),
        fetchUsersFromBackend()
      ]);

      liveAdmissionsList.value = admissions || [];
      liveJobApplicationsList.value = jobs || [];
      liveRsvpsList.value = rsvps || [];
      liveNielitProjectsList.value = (nielitProjects && nielitProjects.length > 0) ? nielitProjects : (content.value.sampleNielitProjects || []);
      liveStudentsList.value = students || [];
      liveInternshipsList.value = internships || [];
      liveFeesList.value = fees || [];
      liveCertificatesList.value = certificates || [];
      liveProjectsList.value = projects || [];
      liveContactInquiriesList.value = contactInquiries || [];
      liveReviewsList.value = reviews || [];
      liveUsersList.value = users || [];
    } catch (e) {
      console.warn('Notice loading initial records from REST API:', e);
    }
  };
  loadInitialData();

  // Initialize SEO Metadata for active view
  updateSeoMetadata(activeTab.value);

  // Initialize scroll-reveal IntersectionObserver
  const initReveal = () => {
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    nextTick(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
      });
    });
  };
  initReveal();
  watch(activeTab, () => {
    setTimeout(initReveal, 300);
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (revealObserver) revealObserver.disconnect();
});
</script>
