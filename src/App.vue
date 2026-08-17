<template>
  <div id="app">
    <!-- Navbar Component -->
    <Navbar 
      :content="content" 
      :activeTab="activeTab" 
      :isDarkMode="isDarkMode" 
      @set-tab="setTab" 
      @toggle-theme="toggleTheme" 
    />

    <!-- Main Dynamic Views -->
    <main>
      <!-- 1. Home Flow -->
      <HeroSection 
        v-if="activeTab === 'home'" 
        :content="content" 
        @set-tab="setTab" 
        @apply-course="applyForCourse" 
        @open-job-modal="openJobModal" 
      />

      <!-- 2. Dedicated Internships View -->
      <InternshipsSection 
        v-if="activeTab === 'internships'" 
        :content="content" 
        @set-tab="setTab" 
        @open-detail="openCourseDetailModal" 
        @fast-apply="proceedToRegistration" 
      />

      <!-- 3. Dedicated Events & Gallery View -->
      <EventsSection 
        v-if="activeTab === 'events'" 
        :content="content" 
        @open-detail="openEventDetailModal" 
        @open-lightbox="openLightbox" 
        @open-rsvp="openRsvpModal" 
      />

      <!-- 4. Dedicated Courses View -->
      <CoursesSection 
        v-if="activeTab === 'courses'" 
        :content="content" 
        @apply-course="applyForCourse" 
      />

      <!-- 5. Dedicated Testimonials View -->
      <TestimonialsSection 
        v-if="activeTab === 'testimonials'" 
        :content="content" 
        @set-tab="setTab" 
      />

      <!-- 6. Dedicated Reviews View -->
      <ReviewsSection 
        v-if="activeTab === 'reviews'" 
        :content="content" 
        @review-submitted="handleReviewSubmitted" 
      />

      <!-- 7. Dedicated Admission View -->
      <AdmissionSection 
        v-if="activeTab === 'admission'" 
        :content="content" 
        :form="form" 
        :lastSubmittedAdmission="lastSubmittedAdmission" 
        :isGeneratingPdf="isGeneratingPdf" 
        @submit-admission="submitAdmission" 
        @download-pdf="downloadAdmissionPdf" 
      />
    </main>

    <!-- Modals with Dynamic Content Injection -->
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

    <!-- Footer Component -->
    <Footer :content="content" @set-tab="setTab" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CONTENT_DATA from './data/contentData.js';
import { generateAdmissionPdf } from './utils/pdfGenerator.js';

import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import HeroSection from './components/sections/HeroSection.vue';
import InternshipsSection from './components/sections/InternshipsSection.vue';
import EventsSection from './components/sections/EventsSection.vue';
import CoursesSection from './components/sections/CoursesSection.vue';
import TestimonialsSection from './components/sections/TestimonialsSection.vue';
import ReviewsSection from './components/sections/ReviewsSection.vue';
import AdmissionSection from './components/sections/AdmissionSection.vue';

import CourseDetailModal from './components/modals/CourseDetailModal.vue';
import EventDetailModal from './components/modals/EventDetailModal.vue';
import EventLightbox from './components/modals/EventLightbox.vue';
import EventRsvpModal from './components/modals/EventRsvpModal.vue';
import JobApplicationModal from './components/modals/JobApplicationModal.vue';
import ConfirmationModal from './components/modals/ConfirmationModal.vue';

const content = ref(CONTENT_DATA);
const activeTab = ref('home');
const isDarkMode = ref(true);

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

// Methods
const setTab = (tab) => {
  activeTab.value = tab;
  window.location.hash = tab;
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
  submittedRegistrationNo.value = 'EVT-' + Math.floor(100000 + Math.random() * 900000);
  modalTitle.value = content.value?.ui?.eventRsvpSuccessTitle || 'Free Event Pass Confirmed! 🎟️';
  modalBody.value = `Congratulations ${rsvpData.name}! Your free VIP entry pass for "${rsvpData.eventTitle}" has been booked. A confirmation SMS will be sent to +91 ${rsvpData.phone}.`;
  showModal.value = true;
};

const openJobModal = (job) => {
  selectedJob.value = job;
  showJobModal.value = true;
};

const submitJobApplication = (jobData) => {
  showJobModal.value = false;
  submittedRegistrationNo.value = 'JOB-' + Math.floor(100000 + Math.random() * 900000);
  modalTitle.value = content.value?.ui?.jobApplicationSuccessTitle || 'Job Application Received! 💼';
  modalBody.value = `Thank you ${jobData.name}! Your application for "${jobData.jobTitle}" has been forwarded to our HR & Academic Board.`;
  showModal.value = true;
};

const handleReviewSubmitted = (review) => {
  submittedRegistrationNo.value = '';
  modalTitle.value = content.value?.ui?.reviewSubmitSuccessTitle || 'Review Published Successfully! ⭐';
  modalBody.value = `Thank you ${review.name} for rating IT HUNT ${review.rating} Stars! Your review is now live on our student ratings scorecard.`;
  showModal.value = true;
};

const submitAdmission = (formData) => {
  const randomRegId = 'ITH-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  submittedRegistrationNo.value = randomRegId;
  lastSubmittedAdmission.value = {
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
    address: formData.address
  };

  modalTitle.value = content.value?.ui?.admissionSuccessTitle || 'Admission Registered Successfully! 🎓';
  modalBody.value = `Congratulations ${formData.candidateName}! Your admission/internship application for "${formData.course}" has been confirmed. You can now download your official verified Admission Registration Slip in PDF format.`;
  showModal.value = true;
};

const downloadAdmissionPdf = () => {
  if (!lastSubmittedAdmission.value) return;
  isGeneratingPdf.value = true;
  setTimeout(() => {
    generateAdmissionPdf(lastSubmittedAdmission.value);
    isGeneratingPdf.value = false;
  }, 100);
};

const printAdmissionSlip = () => {
  window.print();
};

onMounted(() => {
  const hash = window.location.hash.replace('#', '');
  if (hash && ['home', 'internships', 'courses', 'reviews', 'testimonials', 'events', 'admission'].includes(hash)) {
    activeTab.value = hash;
  }

  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '');
    if (h && ['home', 'internships', 'courses', 'reviews', 'testimonials', 'events', 'admission'].includes(h)) {
      activeTab.value = h;
    }
  });
});
</script>
