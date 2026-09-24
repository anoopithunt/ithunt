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

    <!-- WhatsApp Floating CTA (Hidden in SuperAdmin console) -->
    <a
      v-if="activeTab !== 'superadmin'"
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


    <!-- Navbar Component (Hidden in SuperAdmin mode for dedicated admin experience) -->
    <Navbar 
      v-if="activeTab !== 'superadmin'"
      :content="content" 
      :activeTab="activeTab" 
      :isDarkMode="isDarkMode" 
      :studentUser="studentUser" 
      :isAdminLoggedIn="isAdminLoggedIn"
      :adminUser="adminUser"
      @set-tab="setTab" 
      @toggle-theme="toggleTheme" 
      @open-nielit-modal="showNielitModal = true"
    />

    <!-- Main Dynamic Views with Animated Morph Transition -->
    <main :class="{ 'superadmin-main-active': activeTab === 'superadmin' }">
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
          :courses="liveCoursesList"
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
          :allReviews="liveReviewsList"
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
          :courses="liveCoursesList"
          :form="form" 
          :lastSubmittedAdmission="lastSubmittedAdmission" 
          :isGeneratingPdf="isGeneratingPdf" 
          @submit-admission="submitAdmission" 
          @download-pdf="downloadAdmissionPdf" 
          @login-as-student="handleLoginAsStudent"
          @go-to-login="activeTab = 'login'"
        />

        <!-- 9. Unified Portal Login View (Student & Admin) -->
        <LoginSection 
          v-else-if="activeTab === 'login'" 
          key="login"
          :content="content" 
          @login-success="handleLoginSuccess" 
          @student-login-success="handleStudentLoginSuccess"
          @set-tab="setTab" 
          @role-change="role => loginActiveRole = role"
        />

        <!-- 10. Dedicated SuperAdmin Dashboard View -->
        <SuperAdminSection 
          v-else-if="activeTab === 'superadmin'" 
          key="superadmin"
          :content="content" 
          :adminUser="adminUser"
          :isDarkMode="isDarkMode"
          :allCourses="liveCoursesList"
          :allAdmissions="liveAdmissionsList"
          :allJobApplications="liveJobApplicationsList"
          :allRsvps="liveRsvpsList"
          :allNielitProjects="liveNielitProjectsList"
          :allStudents="liveStudentsList"
          :allInternships="liveInternshipsList"
          :allEventsCatalog="liveEventsCatalogList"
          :allFees="liveFeesList"
          :allCertificates="liveCertificatesList"
          :allProjects="liveProjectsList"
          :allContactInquiries="liveContactInquiriesList"
          :allReviews="liveReviewsList"
          :allUsers="liveUsersList"
          @logout="handleAdminLogout"
          @toggle-theme="toggleTheme"
          @download-slip="downloadCustomAdmissionSlip"
          @download-nielit-pdf="downloadNielitProjectPdfDoc"
          @add-admission="handleDirectAdmission"
          @confirm-admission="handleConfirmAdmission"
          @delete-admission="handleDeleteAdmission"
          @update-admission="handleUpdateAdmission"
          @delete-student="handleDeleteStudent"
          @update-student="handleUpdateStudent"
          @add-course="handleAddCourse"
          @update-course="handleUpdateCourse"
          @delete-course="handleDeleteCourse"
          @update-nielit-project="handleUpdateNielitProject"
          @delete-nielit-project="handleDeleteNielitProject"
          @add-fee="handleAddFee"
          @update-fee="handleUpdateFee"
          @delete-fee="handleDeleteFee"
          @add-internship="handleAddInternship"
          @update-internship="handleUpdateInternship"
          @delete-internship="handleDeleteInternship"
          @add-event="handleAddEvent"
          @update-event="handleUpdateEvent"
          @delete-event="handleDeleteEvent"
          @add-project="handleAddProject"
          @update-project="handleUpdateProject"
          @delete-project="handleDeleteProject"
          @add-review="handleAddReview"
          @delete-review="handleDeleteReview"
          @delete-contact="handleDeleteContact"
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
          @go-to-login="setTab('login')"
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
      @login-as-student="handleLoginAsStudent"
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
      v-if="!isAdminLoggedIn && activeTab !== 'superadmin' && activeTab !== 'login'"
      :content="content" 
      @set-tab="setTab" 
      @open-privacy-policy="openPrivacyPolicyPdf"
      @open-terms-conditions="openTermsConditionsPdf"
    />

    <!-- Floating Back to Top Action Button -->
    <button 
      v-if="activeTab !== 'superadmin'"
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
import { ref, watch, onMounted, onUnmounted, nextTick, defineAsyncComponent } from 'vue';
import CONTENT_DATA from './data/contentData.js';
import { DEFAULT_DEMO_STUDENT } from './data/studentAcademicData.js';
import { generateAdmissionPdf, generatePrivacyPolicyPdf, generateTermsConditionsPdf, getAdmissionPdfBlob } from './utils/pdfGenerator.js';
import { generateNielitProjectPdf, getNielitProjectPdfBlob } from './utils/nielitPdfGenerator.js';
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
  updateAdmissionInBackend,
  updateStudentInBackend,
  fetchCoursesFromBackend,
  saveCourseToBackend,
  updateCourseInBackend,
  deleteCourseFromBackend,
  saveFeeToBackend,
  updateFeeInBackend,
  deleteFeeFromBackend,
  deleteContactInquiryFromBackend,
  fetchEventsCatalogFromBackend,
  saveEventToBackend,
  updateEventInBackend,
  deleteEventFromBackend,
  saveInternshipToBackend,
  updateInternshipInBackend,
  deleteInternshipFromBackend,
  saveProjectToBackend,
  updateProjectInBackend,
  deleteProjectFromBackend,
  saveReviewToBackend,
  deleteReviewFromBackend,
  registerStudentUser, 
  loginStudentUser, 
  saveStudentAccount,
  updateStudentProfile,
  submitReviewToBackend
} from './utils/apiClient.js';
import { sendNielitProjectEmailNotification } from './utils/emailNotifier.js';

import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import HeroSection from './components/sections/HeroSection.vue';

// Lazy-loaded secondary view sections (splits bundle & makes Home page load instantly)
const InternshipsSection = defineAsyncComponent(() => import('./components/sections/InternshipsSection.vue'));
const EventsSection = defineAsyncComponent(() => import('./components/sections/EventsSection.vue'));
const CoursesSection = defineAsyncComponent(() => import('./components/sections/CoursesSection.vue'));
const TestimonialsSection = defineAsyncComponent(() => import('./components/sections/TestimonialsSection.vue'));
const ReviewsSection = defineAsyncComponent(() => import('./components/sections/ReviewsSection.vue'));
const CareersSection = defineAsyncComponent(() => import('./components/sections/CareersSection.vue'));
const AdmissionSection = defineAsyncComponent(() => import('./components/sections/AdmissionSection.vue'));
const LoginSection = defineAsyncComponent(() => import('./components/sections/LoginSection.vue'));
const SuperAdminSection = defineAsyncComponent(() => import('./components/sections/SuperAdminSection.vue'));
const StudentPortalSection = defineAsyncComponent(() => import('./components/sections/StudentPortalSection.vue'));

// Lazy-loaded modals (only downloaded when user triggers interaction)
const CourseDetailModal = defineAsyncComponent(() => import('./components/modals/CourseDetailModal.vue'));
const EventDetailModal = defineAsyncComponent(() => import('./components/modals/EventDetailModal.vue'));
const EventLightbox = defineAsyncComponent(() => import('./components/modals/EventLightbox.vue'));
const EventRsvpModal = defineAsyncComponent(() => import('./components/modals/EventRsvpModal.vue'));
const JobApplicationModal = defineAsyncComponent(() => import('./components/modals/JobApplicationModal.vue'));
const NielitProjectModal = defineAsyncComponent(() => import('./components/modals/NielitProjectModal.vue'));
const NielitPdfPreviewModal = defineAsyncComponent(() => import('./components/modals/NielitPdfPreviewModal.vue'));
const ConfirmationModal = defineAsyncComponent(() => import('./components/modals/ConfirmationModal.vue'));

const content = ref(CONTENT_DATA);
const isDarkMode = ref(false);
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
const getStoredAdminAuth = () => {
  try {
    const raw = sessionStorage.getItem('ithunt_superadmin_auth') || localStorage.getItem('ithunt_superadmin_auth');
    if (raw) {
      const parsed = JSON.parse(raw);
      const role = String(parsed.role || '').toLowerCase();
      const roleType = String(parsed.roleType || '').toLowerCase();
      const isPrivileged = [
        'superadmin', 'admin', 'teacher', 'faculty', 'tech-lead', 'developer',
        'senior-developer', 'intern', 'staff', 'accountant'
      ].some(r => role.includes(r) || roleType === r) || 
      parsed.email === 'admin@ithunt.com' ||
      parsed.role === 'Director & Chief Administrator';

      if (isPrivileged) {
        return parsed;
      }
      sessionStorage.removeItem('ithunt_superadmin_auth');
      localStorage.removeItem('ithunt_superadmin_auth');
    }
  } catch (e) {}
  return null;
};
const storedAdmin = getStoredAdminAuth();
const isAdminLoggedIn = ref(!!storedAdmin);
const loginActiveRole = ref('student');
const adminUser = ref(storedAdmin || {
  name: 'Mr. Lakshman Singh Chauhan',
  role: 'Director & Chief Administrator',
  roleType: 'superadmin',
  email: 'admin@ithunt.com',
  avatar: 'img/ithunt.webp'
});

// Student Session & Auth State
const getStoredStudentAuth = () => {
  try {
    const saved = localStorage.getItem('ithunt_student_user');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return null;
};
const storedStudent = getStoredStudentAuth();
const studentUser = ref(storedStudent);

// Compute default initial tab based on logged in user session (persists across hard refresh)
const computeInitialTab = () => {
  if (typeof window !== 'undefined' && window.location.hash) {
    const rawHash = window.location.hash.replace('#', '').toLowerCase().trim();
    if (rawHash === 'admission' || rawHash === 'admisson') return 'admission';
    if (rawHash === 'login') return 'login';
    if (rawHash === 'superadmin' || rawHash === 'admin') return storedAdmin ? 'superadmin' : 'login';
    if (rawHash === 'student-portal' || rawHash === 'student') return storedStudent ? 'student-portal' : 'login';
    if (['home', 'internships', 'courses', 'careers', 'reviews', 'testimonials', 'events'].includes(rawHash)) {
      return rawHash;
    }
  }
  // If user is already logged in, default directly to their dedicated dashboard
  if (storedAdmin) return 'superadmin';
  if (storedStudent) return 'student-portal';
  return 'home';
};

const activeTab = ref(computeInitialTab());

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

const handleStudentLoginSuccess = (user) => {
  studentUser.value = user;
  try {
    localStorage.setItem('ithunt_student_user', JSON.stringify(user));
  } catch (e) {}
  if (user && user.admission) {
    const existingIdx = liveAdmissionsList.value.findIndex(a => a.registrationNo === user.admission.registrationNo || a.email === user.admission.email);
    if (existingIdx === -1) {
      liveAdmissionsList.value.unshift(user.admission);
    }
  }
  activeTab.value = 'student-portal';
  triggerConfetti();
  showToast(`Welcome back, ${user.candidateName || 'Student'}! Logged into Student Dashboard.`, 'success');
};

const handleStudentLogout = () => {
  studentUser.value = null;
  try {
    localStorage.removeItem('ithunt_student_user');
  } catch (e) {}
  activeTab.value = 'home';
  showToast('You have been logged out of the Student Portal.', 'info');
};

// Live registries synced 100% dynamically with live MongoDB database (ithunt)
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
const liveCoursesList = ref([]);
const liveEventsCatalogList = ref([]);

// Primary dynamic database loader: loads public catalog data by default, avoiding redundant admin API calls
const loadInitialData = async (loadAll = false) => {
  try {
    if (!loadAll) {
      const [crss, revs, evts, projs] = await Promise.allSettled([
        fetchCoursesFromBackend(),
        fetchReviewsFromBackend(),
        fetchEventsCatalogFromBackend(),
        fetchProjectsFromBackend()
      ]);
      if (crss.status === 'fulfilled' && Array.isArray(crss.value) && crss.value.length > 0) liveCoursesList.value = crss.value;
      if (revs.status === 'fulfilled' && Array.isArray(revs.value) && revs.value.length > 0) liveReviewsList.value = revs.value;
      if (evts.status === 'fulfilled' && Array.isArray(evts.value) && evts.value.length > 0) liveEventsCatalogList.value = evts.value;
      if (projs.status === 'fulfilled' && Array.isArray(projs.value) && projs.value.length > 0) liveProjectsList.value = projs.value;
      return;
    }

    const results = await Promise.allSettled([
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
      fetchUsersFromBackend(),
      fetchCoursesFromBackend(),
      fetchEventsCatalogFromBackend()
    ]);

    const getVal = (idx, fallback = []) => {
      const res = results[idx];
      return (res && res.status === 'fulfilled' && Array.isArray(res.value) && res.value.length > 0) ? res.value : fallback;
    };

    liveAdmissionsList.value = getVal(0, liveAdmissionsList.value);
    liveJobApplicationsList.value = getVal(1, liveJobApplicationsList.value);
    liveRsvpsList.value = getVal(2, liveRsvpsList.value);
    liveNielitProjectsList.value = getVal(3, liveNielitProjectsList.value);
    liveStudentsList.value = getVal(4, liveStudentsList.value);
    liveInternshipsList.value = getVal(5, liveInternshipsList.value);
    liveFeesList.value = getVal(6, liveFeesList.value);
    liveCertificatesList.value = getVal(7, liveCertificatesList.value);
    liveProjectsList.value = getVal(8, liveProjectsList.value);
    liveContactInquiriesList.value = getVal(9, liveContactInquiriesList.value);
    liveReviewsList.value = getVal(10, liveReviewsList.value);
    liveUsersList.value = getVal(11, liveUsersList.value);
    liveCoursesList.value = getVal(12, liveCoursesList.value);
    liveEventsCatalogList.value = getVal(13, liveEventsCatalogList.value);
  } catch (e) {
    console.warn('Notice loading initial records from REST API:', e);
  }
};

const handleAddCourse = async (courseData) => {
  const res = await saveCourseToBackend(courseData);
  if (res.success) {
    const saved = res.data?.data || res.data || courseData;
    liveCoursesList.value.unshift(saved);
    showToast(`Course "${saved.title || saved.name}" added and saved to MongoDB!`, 'success');
  } else {
    showToast(`Error saving course: ${res.error}`, 'error');
  }
};

const handleUpdateCourse = async (id, courseData) => {
  const res = await updateCourseInBackend(id, courseData);
  if (res.success) {
    const idx = liveCoursesList.value.findIndex(c => c.id === id || c.code === id);
    if (idx !== -1) {
      liveCoursesList.value[idx] = { ...liveCoursesList.value[idx], ...courseData };
    }
    showToast(`Course updated in database!`, 'success');
  } else {
    showToast(`Error updating course: ${res.error}`, 'error');
  }
};

const handleDeleteCourse = async (id) => {
  await deleteCourseFromBackend(id);
  liveCoursesList.value = liveCoursesList.value.filter(c => c.id !== id && c.code !== id);
  showToast('Course removed from database.', 'info');
};

const handleDeleteStudent = async (student) => {
  const idToDelete = student.id || student.userId;
  liveStudentsList.value = liveStudentsList.value.filter(s => s.id !== idToDelete && s.userId !== idToDelete);
  await deleteStudentFromBackend(student);
};

const handleAddInternship = async (data) => {
  const res = await saveInternshipToBackend(data);
  if (res.success) {
    const saved = res.data?.data || res.data || data;
    liveInternshipsList.value.unshift(saved);
    showToast(`Internship application for ${saved.candidateName || saved.name} registered in MongoDB!`, 'success');
  } else {
    showToast(`Failed to register internship: ${res.error}`, 'error');
  }
};

const handleUpdateInternship = async (id, data) => {
  const res = await updateInternshipInBackend(id, data);
  if (res.success) {
    const idx = liveInternshipsList.value.findIndex(i => i.id === id || i._id === id);
    if (idx !== -1) liveInternshipsList.value[idx] = { ...liveInternshipsList.value[idx], ...data };
    showToast('Internship application updated in database!', 'success');
  }
};

const handleDeleteInternship = async (item) => {
  const targetId = typeof item === 'object' ? (item.id || item._id) : item;
  await deleteInternshipFromBackend(targetId);
  liveInternshipsList.value = liveInternshipsList.value.filter(i => i.id !== targetId && i._id !== targetId);
  showToast('Internship application deleted from database.', 'info');
};

const handleAddEvent = async (data) => {
  const res = await saveEventToBackend(data);
  if (res.success) {
    const saved = res.data?.data || res.data || data;
    liveEventsCatalogList.value.unshift(saved);
    showToast(`Event "${saved.title || saved.name}" scheduled in MongoDB!`, 'success');
  } else {
    showToast(`Failed to schedule event: ${res.error}`, 'error');
  }
};

const handleUpdateEvent = async (id, data) => {
  const res = await updateEventInBackend(id, data);
  if (res.success) {
    const idx = liveEventsCatalogList.value.findIndex(e => e.id === id || e._id === id || e.slug === id);
    if (idx !== -1) liveEventsCatalogList.value[idx] = { ...liveEventsCatalogList.value[idx], ...data };
    showToast('Event updated in database!', 'success');
  }
};

const handleDeleteEvent = async (item) => {
  const targetId = typeof item === 'object' ? (item.id || item._id || item.slug) : item;
  await deleteEventFromBackend(targetId);
  liveEventsCatalogList.value = liveEventsCatalogList.value.filter(e => e.id !== targetId && e._id !== targetId && e.slug !== targetId);
  showToast('Event removed from database.', 'info');
};

const handleAddProject = async (data) => {
  const res = await saveProjectToBackend(data);
  if (res.success) {
    const saved = res.data?.data || res.data || data;
    liveProjectsList.value.unshift(saved);
    showToast(`Project "${saved.title || saved.projectTitle}" saved to MongoDB!`, 'success');
  } else {
    showToast(`Failed to save project: ${res.error}`, 'error');
  }
};

const handleUpdateProject = async (id, data) => {
  const res = await updateProjectInBackend(id, data);
  if (res.success) {
    const idx = liveProjectsList.value.findIndex(p => p.id === id || p._id === id);
    if (idx !== -1) liveProjectsList.value[idx] = { ...liveProjectsList.value[idx], ...data };
    showToast('Capstone project updated in database!', 'success');
  }
};

const handleDeleteProject = async (item) => {
  const targetId = typeof item === 'object' ? (item.id || item._id) : item;
  await deleteProjectFromBackend(targetId);
  liveProjectsList.value = liveProjectsList.value.filter(p => p.id !== targetId && p._id !== targetId);
  showToast('Capstone project removed from database.', 'info');
};

const handleAddReview = async (data) => {
  const res = await saveReviewToBackend(data);
  if (res.success) {
    const saved = res.data?.data || res.data || data;
    liveReviewsList.value.unshift(saved);
    showToast('Student review recorded in database!', 'success');
  }
};

const handleDeleteReview = async (item) => {
  const targetId = typeof item === 'object' ? (item.id || item._id) : item;
  await deleteReviewFromBackend(targetId);
  liveReviewsList.value = liveReviewsList.value.filter(r => r.id !== targetId && r._id !== targetId);
  showToast('Review removed from database.', 'info');
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
  // Prevent unauthorized users from accessing the SuperAdmin/Staff console
  if (tab === 'superadmin') {
    const user = adminUser.value;
    const role = String(user?.role || '').toLowerCase();
    const roleType = String(user?.roleType || '').toLowerCase();
    const isAuthorized = [
      'superadmin', 'admin', 'teacher', 'faculty', 'tech-lead', 'developer',
      'senior-developer', 'intern', 'staff', 'accountant'
    ].some(r => role.includes(r) || roleType === r) || 
    user?.email === 'admin@ithunt.com' ||
    user?.role === 'Director & Chief Administrator';

    if (!isAdminLoggedIn.value || !isAuthorized) {
      activeTab.value = 'login';
      return;
    }
  }
  if (tab === 'student-portal') {
    if (!studentUser.value) {
      activeTab.value = 'login';
      return;
    }
  }
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
  try {
    localStorage.setItem('ithunt_theme', isDarkMode.value ? 'dark' : 'light');
  } catch (e) {}
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

const submitEventRsvp = async (rsvpData) => {
  showRsvpModal.value = false;
  const passId = 'EVT-' + Math.floor(100000 + Math.random() * 900000);
  submittedRegistrationNo.value = passId;
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const rsvpRecord = {
    id: passId,
    date: dateStr,
    time: timeStr,
    name: rsvpData.name,
    candidateName: rsvpData.name,
    email: rsvpData.email,
    phone: rsvpData.phone,
    mobile: rsvpData.phone,
    eventTitle: rsvpData.eventTitle,
    college: rsvpData.college,
    status: 'Confirmed'
  };

  // Real-time sync into SuperAdmin registry
  liveRsvpsList.value.unshift(rsvpRecord);

  // Save via specific REST API call to backend database
  await saveRsvpRecord(rsvpRecord).catch((e) => console.warn('Save RSVP error:', e.message));

  modalTitle.value = content.value?.ui?.eventRsvpSuccessTitle || 'Free Event Pass Confirmed! 🎟️';
  modalBody.value = `Congratulations ${rsvpData.name}! Your VIP entry pass (ID: ${passId}) for "${rsvpData.eventTitle}" has been booked and saved to the database.`;
  showModal.value = true;
  triggerConfetti();
};

const openJobModal = (job) => {
  selectedJob.value = job;
  showJobModal.value = true;
};

const submitJobApplication = async (jobData) => {
  showJobModal.value = false;
  const appId = 'JOB-' + Math.floor(100000 + Math.random() * 900000);
  submittedRegistrationNo.value = appId;
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const jobRecord = {
    id: appId,
    date: dateStr,
    time: timeStr,
    name: jobData.name,
    fullName: jobData.name,
    email: jobData.email,
    phone: jobData.phone,
    mobile: jobData.phone,
    position: jobData.jobTitle,
    role: jobData.jobTitle,
    experience: jobData.experience || '4+ Years',
    portfolio: jobData.portfolio || jobData.link || '',
    resumeLink: jobData.resumeLink || jobData.portfolio || jobData.link || '',
    currentCompany: jobData.currentCompany || 'Software Company',
    status: 'Pending Review'
  };

  // Real-time sync into SuperAdmin registry
  liveJobApplicationsList.value.unshift(jobRecord);

  // Save via specific REST API call to backend database
  await saveJobApplicationRecord(jobRecord).catch((e) => console.warn('Save job application error:', e.message));

  modalTitle.value = content.value?.ui?.jobApplicationSuccessTitle || 'Job Application Received! 💼';
  modalBody.value = `Thank you ${jobData.name}! Your application for "${jobData.jobTitle}" has been received and saved to the database for HR review.`;
  showModal.value = true;
  triggerConfetti();
};

const submitNielitProject = async (projectData) => {
  showNielitModal.value = false;
  submittedNielitData.value = projectData;

  const regId = String(projectData.nielitRegNo || projectData.registrationNo || ('NIELIT-' + Math.floor(100000 + Math.random() * 900000))).trim();
  submittedRegistrationNo.value = regId;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const nielitRecord = {
    ...projectData,
    id: regId,
    nielitRegNo: regId,
    registrationNo: regId,
    regNo: regId,
    date: projectData.date || dateStr,
    time: projectData.time || timeStr,
    status: projectData.status || 'Submitted'
  };

  const existingIdx = liveNielitProjectsList.value.findIndex(p => {
    const pId = String(p.registrationNo || p.nielitRegNo || p.regNo || p.id || '').trim();
    return pId === regId;
  });

  if (existingIdx !== -1) {
    liveNielitProjectsList.value[existingIdx] = { ...liveNielitProjectsList.value[existingIdx], ...nielitRecord };
  } else {
    liveNielitProjectsList.value.unshift(nielitRecord);
  }

  // Save via specific REST API call to backend database & trigger server-side email with 4-page PDF attachment
  let backendEmailSent = false;
  try {
    const apiRes = await saveNielitProjectRecord(nielitRecord);
    if (apiRes && apiRes.email && apiRes.email.success) {
      backendEmailSent = true;
      console.log('✓ Backend dispatched NIELIT email with 4-page PDF attachment:', apiRes.email);
    }
  } catch (e) {
    console.warn('Save NIELIT project error:', e.message);
  }

  // If backend email did not send (e.g. offline/network issue), trigger client-side fallback with PDF attachment!
  if (!backendEmailSent) {
    try {
      console.log('⚡ Triggering client-side fallback NIELIT email with PDF attachment...');
      sendNielitProjectEmailNotification(nielitRecord).catch((err) => console.warn('Client fallback email notice:', err));
    } catch (clientErr) {
      console.warn('Client fallback email notice:', clientErr);
    }
  }

  // Display clean, professional confirmation dialog
  modalTitle.value = '🎉 NIELIT Project Registered Successfully!';
  modalBody.value = `Congratulations ${projectData.candidateName}! Your ${projectData.nielitLevel || 'O Level'} Project submission (Reg No: ${regId}) has been recorded and saved in the database.\n\nAn official confirmation email with your 4-Page NIELIT Project Document attached has been dispatched to ${projectData.email || 'your registered email'} and the Academy Admin.`;
  showModal.value = true;
  triggerConfetti();
};

const downloadNielitProjectPdfDoc = (projectData) => {
  generateNielitProjectPdf(projectData);
};

const handleReviewSubmitted = async (review) => {
  submittedRegistrationNo.value = '';
  const existingIdx = liveReviewsList.value.findIndex(r => r.id === review.id);
  if (existingIdx === -1) {
    liveReviewsList.value.unshift(review);
  }
  try {
    await submitReviewToBackend(review);
  } catch (e) {}

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

  const normEmail = (formData.email || '').toLowerCase().trim();
  const studentPassword = (formData.password || '').trim() || 'Ithunt@123';

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
    email: normEmail,
    userId: normEmail,
    password: studentPassword,
    district: formData.district || 'PRAYAGRAJ',
    address: formData.address || '',
    status: formData.status || 'Pending Verification',
    feeStatus: formData.feeStatus || 'Pending Verification',
    role: 'student'
  };

  // Save admission record to backend API & Database
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

    modalTitle.value = '🎉 Admission Application Submitted Successfully!';
    modalBody.value = `Congratulations ${newAdmissionRecord.candidateName}! Your admission application for "${newAdmissionRecord.course}" has been successfully submitted to IT HUNT.\n\n📋 Registration ID: ${finalRegNo}\n⏳ Status: Pending SuperAdmin Confirmation\n\nOur SuperAdmin will review and confirm your admission. Once confirmed, your unique Student User ID & Password will be automatically generated and activated for your portal login.`;
    showModal.value = true;
    triggerConfetti();
  } else {
    modalTitle.value = '❌ Admission Submission Notice';
    modalBody.value = `Error submitting admission application: ${apiRes?.error || 'Unable to complete submission'}. Please verify your connection and try again.`;
    showModal.value = true;
  }
};

const handleLoginAsStudent = (admission) => {
  if (!admission) return;
  const normEmail = (admission.email || admission.userId || '').toLowerCase().trim();
  const currentStudent = {
    ...DEFAULT_DEMO_STUDENT,
    ...admission,
    userId: normEmail,
    email: normEmail,
    password: admission.password || 'Ithunt@123',
    candidateName: admission.candidateName || admission.fullName || 'Student',
    fullName: admission.fullName || admission.candidateName || 'Student',
    registrationNo: admission.registrationNo || admission.id || 'ITH-2026-001',
    status: admission.status || 'Active & Confirmed ✓',
    course: admission.course || '3-Month MERN Stack Web Engineer'
  };

  saveStudentAccount(currentStudent);
  studentUser.value = currentStudent;
  try {
    localStorage.setItem('ithunt_student_user', JSON.stringify(currentStudent));
  } catch (e) {}

  showModal.value = false;
  activeTab.value = 'student-portal';
  triggerConfetti();
  showToast(`Welcome ${currentStudent.candidateName}! Logged into Student Dashboard.`, 'success');
};

const handleLoginSuccess = async (user) => {
  const role = String(user.role || '').toLowerCase();
  const roleType = String(user.roleType || '').toLowerCase();
  const isTeacher = roleType.includes('teacher') || roleType.includes('faculty') || role.includes('teacher') || role.includes('faculty');
  const isPrivileged = [
    'superadmin', 'admin', 'teacher', 'faculty', 'tech-lead', 'developer',
    'senior-developer', 'intern', 'staff', 'accountant'
  ].some(r => role.includes(r) || roleType === r) || 
  user.email === 'admin@ithunt.com' ||
  user.role === 'Director & Chief Administrator';

  if (!isPrivileged) {
    showToast('Access Denied: You do not have administrator or staff privileges.', 'error');
    return;
  }
  isAdminLoggedIn.value = true;
  adminUser.value = {
    ...user,
    name: user.name || (isTeacher ? 'Er. Sandeep Srivastava' : 'Mr. Lakshman Singh Chauhan'),
    role: user.designation || user.role || (isTeacher ? 'Senior Faculty Lead & Teacher' : 'Director & Chief Administrator'),
    roleType: user.roleType || (isTeacher ? 'teacher' : 'superadmin'),
    avatar: user.avatar || (isTeacher ? 'img/ithunt.jpg' : 'img/ithunt.webp'),
    email: user.email || (isTeacher ? 'teacher@ithunt.com' : 'admin@ithunt.com'),
    loginTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  };
  try {
    sessionStorage.setItem('ithunt_superadmin_auth', JSON.stringify(adminUser.value));
    localStorage.setItem('ithunt_superadmin_auth', JSON.stringify(adminUser.value));
  } catch (e) {}
  activeTab.value = 'superadmin';
  triggerConfetti();
  if (isTeacher) {
    showToast(`Welcome Teacher ${adminUser.value.name}! Logged into Faculty Management Console.`, 'success');
  } else {
    showToast(`Welcome ${adminUser.value.name}! Logged into Management Console.`, 'success');
  }
};

const handleAdminLogout = () => {
  isAdminLoggedIn.value = false;
  adminUser.value = {
    name: 'Mr. Lakshman Singh Chauhan',
    role: 'Director & Chief Administrator',
    email: 'admin@ithunt.com',
    avatar: 'img/ithunt.webp'
  };
  try {
    sessionStorage.removeItem('ithunt_superadmin_auth');
    localStorage.removeItem('ithunt_superadmin_auth');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('token');
  } catch (e) {}
  activeTab.value = 'home';
};

const handleDirectAdmission = async (newAdm) => {
  newAdm.id = newAdm.id || newAdm.registrationNo;
  newAdm.registrationNumber = newAdm.registrationNumber || newAdm.registrationNo;
  newAdm.userId = newAdm.email;
  newAdm.password = newAdm.password || 'Ithunt@123';
  lastSubmittedAdmission.value = newAdm;
  
  // 1. Immediately update local state to show in admissions list
  const existingIdx = liveAdmissionsList.value.findIndex(a => 
    (a.registrationNo && a.registrationNo === newAdm.registrationNo) || 
    (a.id && a.id === newAdm.id)
  );
  if (existingIdx === -1) {
    liveAdmissionsList.value.unshift(newAdm);
  }

  // 2. Persist student account for Student Portal login
  saveStudentAccount(newAdm);

  // 3. Persist directly to MongoDB database & REST API backend
  try {
    await saveAdmissionRecord(newAdm);
    console.log('✓ Admin direct admission saved to MongoDB database (ithunt):', newAdm.registrationNo);
  } catch (err) {
    console.warn('Database save warning (Direct Admission):', err.message);
  }

  triggerConfetti();
  showToast(`Direct admission registered and saved to database! Student User ID: ${newAdm.userId || newAdm.email} | Password: ${newAdm.password || 'Ithunt@123'}`, 'success', 6000);
};

const handleConfirmAdmission = (confirmedData) => {
  if (!confirmedData) return;
  const targetId = confirmedData.registrationNo || confirmedData.id;
  const idx = liveAdmissionsList.value.findIndex(a => (a.registrationNo === targetId) || (a.id === targetId));
  if (idx !== -1) {
    liveAdmissionsList.value[idx] = { 
      ...liveAdmissionsList.value[idx], 
      ...confirmedData, 
      status: 'Confirmed', 
      admissionConfirmed: true 
    };
  } else {
    liveAdmissionsList.value.unshift({ 
      ...confirmedData, 
      status: 'Confirmed', 
      admissionConfirmed: true 
    });
  }

  // Sync to liveStudentsList
  const finalUserId = confirmedData.userId || targetId;
  const sIdx = liveStudentsList.value.findIndex(s => s.userId === finalUserId || s.id === finalUserId || s.registrationNo === targetId);
  if (sIdx !== -1) {
    liveStudentsList.value[sIdx] = { 
      ...liveStudentsList.value[sIdx], 
      ...confirmedData, 
      academicStatus: 'ACTIVE', 
      status: 'ACTIVE' 
    };
  } else {
    liveStudentsList.value.unshift({
      id: finalUserId,
      userId: finalUserId,
      enrollmentNumber: finalUserId,
      registrationNo: targetId,
      name: confirmedData.candidateName || confirmedData.fullName || 'Student',
      email: confirmedData.email,
      mobile: confirmedData.mobile,
      course: confirmedData.course,
      academicStatus: 'ACTIVE',
      status: 'ACTIVE'
    });
  }

  triggerConfetti();
  showToast(`Admission Confirmed! Student User ID: ${finalUserId} | Password: ${confirmedData.password}`, 'success', 6000);
};

const handleDeleteAdmission = async (adm) => {
  const idToDelete = typeof adm === 'object' ? (adm.registrationNo || adm.id) : adm;
  const altId = typeof adm === 'object' ? (adm.id || adm.registrationNo) : adm;
  liveAdmissionsList.value = liveAdmissionsList.value.filter(a => 
    a.registrationNo !== idToDelete && 
    a.id !== idToDelete &&
    a.registrationNo !== altId && 
    a.id !== altId
  );
  await deleteAdmissionFromBackend(adm);
};

// Update an admission record in MongoDB and refresh the local list
const handleUpdateAdmission = async (updatedAdm) => {
  const targetId = updatedAdm.registrationNo || updatedAdm.id;
  const idx = liveAdmissionsList.value.findIndex(a =>
    a.registrationNo === targetId || a.id === targetId
  );
  if (idx !== -1) {
    liveAdmissionsList.value[idx] = { ...liveAdmissionsList.value[idx], ...updatedAdm };
  }
  const sIdx = liveStudentsList.value.findIndex(s =>
    s.registrationNo === targetId || s.id === targetId || s.userId === updatedAdm.userId
  );
  if (sIdx !== -1) {
    liveStudentsList.value[sIdx] = { ...liveStudentsList.value[sIdx], ...updatedAdm };
  }
  await updateAdmissionInBackend(targetId, updatedAdm);
  showToast(`Admission record for ${updatedAdm.candidateName || targetId} updated in database!`, 'success');
};

// Update a student record in MongoDB and refresh the local list
const handleUpdateStudent = async (updatedStu) => {
  const targetId = updatedStu.enrollmentNumber || updatedStu.userId || updatedStu.id;
  const idx = liveStudentsList.value.findIndex(s =>
    s.enrollmentNumber === targetId || s.userId === targetId || s.id === targetId
  );
  if (idx !== -1) {
    liveStudentsList.value[idx] = { ...liveStudentsList.value[idx], ...updatedStu };
  }
  const aIdx = liveAdmissionsList.value.findIndex(a =>
    a.enrollmentNumber === targetId || a.userId === targetId || a.registrationNo === targetId || a.id === targetId
  );
  if (aIdx !== -1) {
    liveAdmissionsList.value[aIdx] = { ...liveAdmissionsList.value[aIdx], ...updatedStu };
  }
  await updateStudentInBackend(targetId, updatedStu);
  showToast(`Student record for ${updatedStu.name || targetId} updated in database!`, 'success');
};

const handleAddFee = async (feeData) => {
  const res = await saveFeeToBackend(feeData);
  if (res.success) {
    const saved = res.data?.data || res.data || feeData;
    liveFeesList.value.unshift(saved);
    showToast(`Fee payment recorded and saved to database!`, 'success');
  } else {
    showToast(`Error saving fee: ${res.error}`, 'error');
  }
};

const handleUpdateFee = async (id, feeData) => {
  const res = await updateFeeInBackend(id, feeData);
  if (res.success) {
    const idx = liveFeesList.value.findIndex(f => f.id === id || f.receiptNo === id);
    if (idx !== -1) {
      liveFeesList.value[idx] = { ...liveFeesList.value[idx], ...feeData };
    }
    showToast(`Fee transaction updated in database!`, 'success');
  } else {
    showToast(`Error updating fee: ${res.error}`, 'error');
  }
};

const handleDeleteFee = async (id) => {
  await deleteFeeFromBackend(id);
  liveFeesList.value = liveFeesList.value.filter(f => f.id !== id && f.receiptNo !== id);
  showToast('Fee transaction removed from database.', 'info');
};

const handleDeleteContact = async (id) => {
  await deleteContactInquiryFromBackend(id);
  liveContactInquiriesList.value = liveContactInquiriesList.value.filter(c => c.id !== id);
  showToast('Contact inquiry removed from database.', 'info');
};

const handleUpdateNielitProject = async (updatedProject) => {
  const targetId = updatedProject.registrationNo || updatedProject.nielitRegNo;
  const idx = liveNielitProjectsList.value.findIndex(p => p.registrationNo === targetId || p.nielitRegNo === targetId);
  if (idx !== -1) {
    liveNielitProjectsList.value[idx] = { ...liveNielitProjectsList.value[idx], ...updatedProject };
  }
  await updateNielitProjectInBackend(targetId, updatedProject);
};

const handleDeleteNielitProject = async (project) => {
  const targetId = project.registrationNo || project.nielitRegNo || project.id;
  liveNielitProjectsList.value = liveNielitProjectsList.value.filter(p => 
    p.registrationNo !== targetId && 
    p.nielitRegNo !== targetId && 
    p.id !== targetId &&
    p.registrationNo !== project.registrationNo && 
    p.nielitRegNo !== project.nielitRegNo && 
    p.id !== project.id
  );
  await deleteNielitProjectFromBackend(targetId);
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
  // Default to Light Mode unless explicitly set to 'dark' by user preference
  try {
    const savedTheme = localStorage.getItem('ithunt_theme');
    if (savedTheme === 'dark') {
      isDarkMode.value = true;
      document.body.classList.remove('light-theme');
    } else {
      isDarkMode.value = false;
      document.body.classList.add('light-theme');
    }
  } catch (e) {
    isDarkMode.value = false;
    document.body.classList.add('light-theme');
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Clear any legacy stale data caches from localStorage so UI displays 100% directly from database
  if (typeof window !== 'undefined' && window.localStorage) {
    const STALE_DATA_KEYS = [
      'ithunt_all_admissions',
      'ithunt_all_students',
      'ithunt_admissions',
      'ithunt_students',
      'ithunt_student_accounts',
      'ithunt_nielit_projects',
      'ithunt_nielit_cache',
      'ithunt_job_applications',
      'ithunt_careers_cache',
      'ithunt_rsvps',
      'ithunt_rsvps_cache',
      'ithunt_reviews',
      'ithunt_internships',
      'ithunt_fees',
      'ithunt_certificates',
      'ithunt_projects',
      'ithunt_contact_inquiries',
      'ithunt_users',
      'ithunt_deleted_admission_ids',
      'ithunt_deleted_nielit_ids',
      'ithunt_deleted_job_ids',
      'ithunt_deleted_rsvp_ids'
    ];
    try {
      STALE_DATA_KEYS.forEach(k => localStorage.removeItem(k));
    } catch (e) {}
  }

  // Restore saved admin session if any
  try {
    const savedAdmin = sessionStorage.getItem('ithunt_superadmin_auth') || localStorage.getItem('ithunt_superadmin_auth');
    if (savedAdmin) {
      const parsedAdmin = JSON.parse(savedAdmin);
      const role = String(parsedAdmin.role || '').toLowerCase();
      const roleType = String(parsedAdmin.roleType || '').toLowerCase();
      const isPrivileged = [
        'superadmin', 'admin', 'teacher', 'faculty', 'tech-lead', 'developer',
        'senior-developer', 'intern', 'staff', 'accountant'
      ].some(r => role.includes(r) || roleType === r) || 
      parsedAdmin.email === 'admin@ithunt.com' ||
      parsedAdmin.role === 'Director & Chief Administrator';

      if (isPrivileged) {
        adminUser.value = parsedAdmin;
        isAdminLoggedIn.value = true;
      } else {
        sessionStorage.removeItem('ithunt_superadmin_auth');
        localStorage.removeItem('ithunt_superadmin_auth');
      }
    }
  } catch (e) {}

  // If user arrived with a hash (e.g. #admission, #login, #superadmin), open corresponding view
  if (window.location.hash) {
    const rawHash = window.location.hash.replace('#', '').toLowerCase().trim();
    if (rawHash === 'admission' || rawHash === 'admisson') {
      activeTab.value = 'admission';
    } else if (rawHash === 'login') {
      activeTab.value = 'login';
    } else if (rawHash === 'superadmin' || rawHash === 'admin') {
      activeTab.value = isAdminLoggedIn.value ? 'superadmin' : 'login';
    } else if (rawHash === 'student-portal' || rawHash === 'student') {
      activeTab.value = studentUser.value ? 'student-portal' : 'login';
    } else if (['home', 'internships', 'courses', 'careers', 'reviews', 'testimonials', 'events'].includes(rawHash)) {
      activeTab.value = rawHash;
    }
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  } else {
    // If no explicit hash in URL, ensure logged in users open their dashboard by default even on hard refresh
    if (isAdminLoggedIn.value && activeTab.value === 'home') {
      activeTab.value = 'superadmin';
    } else if (studentUser.value && activeTab.value === 'home') {
      activeTab.value = 'student-portal';
    }
  }

  // Defer background API synchronization to background idle cycles so the Home page loads instantly
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(() => loadInitialData(), { timeout: 2000 });
  } else {
    setTimeout(() => loadInitialData(), 300);
  }

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
