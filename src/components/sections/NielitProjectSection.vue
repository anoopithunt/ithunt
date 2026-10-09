<template>
  <section class="nielit-project-section">
    <div class="container nielit-container">
      <div class="nielit-page-card">
        <!-- Header -->
      <div class="modal-header">
        <div class="modal-badge-pill">
          <span class="pulse-dot"></span>
          <span>📜 OFFICIAL NIELIT PORTAL • PROJECT SUBMISSION 2026</span>
        </div>
        <h2 class="modal-title">
          NIELIT Student <span class="text-gradient">Project & Thesis Submission</span>
        </h2>
        <p class="modal-subtitle">
          Step {{ activeSection }} of 3: {{ stepTitles[activeSection - 1] }}. The official 4-Page NIELIT Project Document (Annexure II, III, Guide Certificate & Fee Receipt) will be automatically compiled.
        </p>

        <!-- Step Navigation Pill Strip -->
        <div class="nielit-steps-pill-strip">
          <div 
            class="step-pill" 
            :class="{ active: activeSection === 1, done: isSection1Filled && activeSection > 1 }" 
            @click="goToStep(1)"
          >
            <span class="step-num">{{ isSection1Filled && activeSection > 1 ? '✓' : '1' }}</span>
            <span class="step-text">1. Candidate Details</span>
          </div>
          <div class="step-divider"></div>
          <div 
            class="step-pill" 
            :class="{ active: activeSection === 2, done: isSection2Filled && activeSection > 2 }" 
            @click="goToStep(2)"
          >
            <span class="step-num">{{ isSection2Filled && activeSection > 2 ? '✓' : '2' }}</span>
            <span class="step-text">2. Project Topic</span>
          </div>
          <div class="step-divider"></div>
          <div 
            class="step-pill" 
            :class="{ active: activeSection === 3, done: isSection3Filled }" 
            @click="goToStep(3)"
          >
            <span class="step-num">{{ isSection3Filled ? '✓' : '3' }}</span>
            <span class="step-text">3. Payment & Submit</span>
          </div>
        </div>
      </div>

      <!-- Project Submission Form -->
      <form @submit.prevent="handleFormSubmit" class="nielit-form">
        <!-- PAGE 1: CANDIDATE PARTICULARS -->
        <div v-if="activeSection === 1" class="form-section-group page-fade-slide">
          <div class="form-section-header">
            <div class="section-title-wrap">
              <span class="section-icon-badge">🎓</span>
              <div>
                <h3 class="form-section-heading">Page 1: Candidate Particulars</h3>
                <span class="form-section-sub">Student registration identity and personal contact records</span>
              </div>
            </div>
            <span class="section-badge-req">Step 1 of 3</span>
          </div>

          <div class="form-grid-2">
            <div class="form-field" :class="{ 'has-error': validationErrors.candidateName }">
              <label class="form-label">
                <span class="label-icon">👤</span> Candidate Full Name <span class="req">*</span>
              </label>
              <input 
                type="text" 
                v-model="form.candidateName" 
                @blur="form.candidateName = toTitleCase(form.candidateName)"
                required 
                class="form-control" 
                placeholder="e.g. Anup Kumar Mishra" 
                style="text-transform: capitalize;"
                spellcheck="false"
              />
              <span v-if="validationErrors.candidateName" class="error-hint">{{ validationErrors.candidateName }}</span>
            </div>

            <div class="form-field" :class="{ 'has-error': validationErrors.nielitRegNo }">
              <label class="form-label">
                <span class="label-icon">🆔</span> NIELIT Registration No <span class="req">*</span>
              </label>
              <input 
                type="text" 
                v-model="form.nielitRegNo" 
                required 
                class="form-control font-mono" 
                placeholder="e.g. 1110423" 
              />
              <span v-if="validationErrors.nielitRegNo" class="error-hint">{{ validationErrors.nielitRegNo }}</span>
            </div>

            <div class="form-field">
              <label class="form-label">
                <span class="label-icon">📜</span> Examination Level <span class="req">*</span>
              </label>
              <select v-model="form.nielitLevel" required class="form-control">
                <option value="O">O Level (Foundation Diploma)</option>
                <option value="A">A Level (Advanced Diploma)</option>
                <option value="B">B Level (MCA Equivalent)</option>
                <option value="C">C Level (M.Tech Equivalent)</option>
              </select>
            </div>

            <div class="form-field" :class="{ 'has-error': validationErrors.fatherName }">
              <label class="form-label">
                <span class="label-icon">👨‍👦</span> Father's Name <span class="req">*</span>
              </label>
              <input 
                type="text" 
                v-model="form.fatherName" 
                @blur="form.fatherName = toTitleCase(form.fatherName)"
                required 
                class="form-control" 
                placeholder="e.g. Shiv Shanker Mishra" 
                style="text-transform: capitalize;"
                spellcheck="false"
              />
              <span v-if="validationErrors.fatherName" class="error-hint">{{ validationErrors.fatherName }}</span>
            </div>

            <div class="form-field" :class="{ 'has-error': validationErrors.email }">
              <label class="form-label">
                <span class="label-icon">📧</span> Email Address <span class="req">*</span>
              </label>
              <input 
                type="email" 
                v-model="form.email" 
                required 
                class="form-control" 
                placeholder="candidate@example.com" 
              />
              <span v-if="validationErrors.email" class="error-hint">{{ validationErrors.email }}</span>
            </div>

            <div class="form-field" :class="{ 'has-error': validationErrors.mobile }">
              <label class="form-label">
                <span class="label-icon">📱</span> Mobile Number <span class="req">*</span>
              </label>
              <input 
                type="tel" 
                v-model="form.mobile" 
                pattern="[0-9]{10}"
                required 
                class="form-control font-mono" 
                placeholder="10-digit mobile number" 
              />
              <span v-if="validationErrors.mobile" class="error-hint">{{ validationErrors.mobile }}</span>
            </div>
          </div>

          <div class="form-field" style="margin-top: 1rem;" :class="{ 'has-error': validationErrors.address }">
            <label class="form-label">
              <span class="label-icon">🏠</span> Permanent Residential Address <span class="req">*</span>
            </label>
            <input 
              type="text" 
              v-model="form.address" 
              @blur="form.address = toTitleCase(form.address)"
              required 
              class="form-control" 
              placeholder="House/Street, Landmark, Village/Town" 
              style="text-transform: capitalize;"
              spellcheck="false"
            />
            <span v-if="validationErrors.address" class="error-hint">{{ validationErrors.address }}</span>
          </div>

          <div class="form-grid-3" style="margin-top: 1rem;">
            <div class="form-field" :class="{ 'has-error': validationErrors.district }">
              <label class="form-label">
                <span class="label-icon">📍</span> District / City <span class="req">*</span>
              </label>
              <input 
                type="text" 
                v-model="form.district" 
                @blur="form.district = toTitleCase(form.district)"
                required 
                class="form-control" 
                placeholder="e.g. Prayagraj" 
                style="text-transform: capitalize;"
                spellcheck="false"
              />
              <span v-if="validationErrors.district" class="error-hint">{{ validationErrors.district }}</span>
            </div>

            <div class="form-field">
              <label class="form-label">
                <span class="label-icon">🗺️</span> State <span class="req">*</span>
              </label>
              <input 
                type="text" 
                v-model="form.state" 
                @blur="form.state = toTitleCase(form.state)"
                required 
                class="form-control" 
                placeholder="e.g. Uttar Pradesh" 
                style="text-transform: capitalize;"
                spellcheck="false"
              />
            </div>

            <div class="form-field" :class="{ 'has-error': validationErrors.pin }">
              <label class="form-label">
                <span class="label-icon">📮</span> Pin Code <span class="req">*</span>
              </label>
              <input 
                type="text" 
                v-model="form.pin" 
                pattern="[0-9]{6}"
                required 
                class="form-control font-mono" 
                placeholder="e.g. 212503" 
              />
              <span v-if="validationErrors.pin" class="error-hint">{{ validationErrors.pin }}</span>
            </div>
          </div>
        </div>

        <!-- PAGE 2: PROJECT TITLE & SYNOPSIS -->
        <div v-else-if="activeSection === 2" class="form-section-group page-fade-slide">
          <div class="form-section-header">
            <div class="section-title-wrap">
              <span class="section-icon-badge">💻</span>
              <div>
                <h3 class="form-section-heading">Page 2: Project / Dissertation Topic</h3>
                <span class="form-section-sub">Enter your research topic and project submission particulars</span>
              </div>
            </div>
            <span class="section-badge-req">Step 2 of 3</span>
          </div>

          <div class="form-grid-2">
            <div class="form-field full-col" :class="{ 'has-error': validationErrors.projectTitle }">
              <label class="form-label">
                <span class="label-icon">💡</span> Project / Dissertation Title <span class="req">*</span>
              </label>
              <input 
                type="text" 
                v-model="form.projectTitle" 
                @blur="form.projectTitle = toTitleCase(form.projectTitle)"
                required 
                class="form-control" 
                placeholder="e.g. AI-Powered Network Traffic Monitoring and Intrusion Detection System" 
                style="text-transform: capitalize;"
                spellcheck="false"
              />
              <span v-if="validationErrors.projectTitle" class="error-hint">{{ validationErrors.projectTitle }}</span>
            </div>

            <div class="form-field" :class="{ 'has-error': validationErrors.projectDate }">
              <label class="form-label">
                <span class="label-icon">📅</span> Project Submission Date <span class="req">*</span>
              </label>
              <input 
                type="date" 
                v-model="form.projectDate" 
                required 
                class="form-control date-picker-input font-mono" 
              />
              <span v-if="validationErrors.projectDate" class="error-hint">{{ validationErrors.projectDate }}</span>
            </div>

            <div class="form-field">
              <label class="form-label">
                <span class="label-icon">📦</span> GitHub / Project Source Link (Optional)
              </label>
              <input 
                type="url" 
                v-model="form.githubRepo" 
                class="form-control font-mono" 
                placeholder="https://github.com/username/project" 
              />
            </div>
          </div>

          <div class="form-grid-2" style="margin-top: 1rem;">
            <div class="form-field">
              <label class="form-label">
                <span class="label-icon">👨‍🏫</span> Authorized Project Guide
              </label>
              <input 
                type="text" 
                v-model="form.guideName" 
                readonly 
                class="form-control" 
                style="background: rgba(0, 0, 0, 0.25); color: var(--color-ai-cyan); font-weight: 700;"
              />
            </div>

            <div class="form-field">
              <label class="form-label">
                <span class="label-icon">🎖️</span> Guide Qualification & Designation
              </label>
              <input 
                type="text" 
                :value="`${form.guideQualification} (${form.guideDesignation})`" 
                readonly 
                class="form-control" 
                style="background: rgba(0, 0, 0, 0.25); color: var(--text-muted);"
              />
            </div>
          </div>
        </div>

        <!-- PAGE 3: FEE & PAYMENT VERIFICATION -->
        <div v-else-if="activeSection === 3" class="form-section-group page-fade-slide">
          <div class="form-section-header">
            <div class="section-title-wrap">
              <span class="section-icon-badge">💳</span>
              <div>
                <h3 class="form-section-heading">Page 3: Fee & Payment Verification</h3>
                <span class="form-section-sub">Bank transaction UTR reference and receipt verification</span>
              </div>
            </div>
            <span class="section-badge-req">Final Step</span>
          </div>

          <div class="form-grid-3">
            <div class="form-field" :class="{ 'has-error': validationErrors.amount }">
              <label class="form-label">
                <span class="label-icon">₹</span> Fee Amount (₹) <span class="req">*</span>
              </label>
              <input 
                type="text" 
                v-model="form.amount" 
                required 
                class="form-control font-mono" 
                placeholder="1000" 
              />
              <span v-if="validationErrors.amount" class="error-hint">{{ validationErrors.amount }}</span>
            </div>

            <div class="form-field" :class="{ 'has-error': validationErrors.paymentDate }">
              <label class="form-label">
                <span class="label-icon">🗓️</span> Payment Date <span class="req">*</span>
              </label>
              <input 
                type="date" 
                v-model="form.paymentDate" 
                required 
                class="form-control date-picker-input font-mono" 
              />
              <span v-if="validationErrors.paymentDate" class="error-hint">{{ validationErrors.paymentDate }}</span>
            </div>

            <div class="form-field" :class="{ 'has-error': validationErrors.utrNumber }">
              <label class="form-label">
                <span class="label-icon">🧾</span> UTR / Transaction No <span class="req">*</span>
              </label>
              <input 
                type="text" 
                v-model="form.utrNumber" 
                @input="form.utrNumber = ($event.target.value || '').toUpperCase()"
                required 
                class="form-control font-mono" 
                placeholder="e.g. CHD550W1FMSF1B" 
                style="text-transform: uppercase;"
                autocomplete="off"
                spellcheck="false"
              />
              <span v-if="validationErrors.utrNumber" class="error-hint">{{ validationErrors.utrNumber }}</span>
            </div>
          </div>

          <div class="form-field" style="margin-top: 1rem;" :class="{ 'has-error': validationErrors.accountHolderName }">
            <label class="form-label">
              <span class="label-icon">🏦</span> Account Holder / Sender Name <span class="req">*</span>
            </label>
            <input 
              type="text" 
              v-model="form.accountHolderName" 
              @blur="form.accountHolderName = toTitleCase(form.accountHolderName)"
              required 
              class="form-control" 
              placeholder="e.g. Anup Kumar Mishra" 
              style="text-transform: capitalize;"
              spellcheck="false"
            />
            <span v-if="validationErrors.accountHolderName" class="error-hint">{{ validationErrors.accountHolderName }}</span>
          </div>

          <!-- Official Document Generation Guarantee Banner -->
          <div class="doc-guarantee-ribbon" style="margin-top: 1.25rem;">
            <span class="doc-lock-icon">🔒</span>
            <div>
              <div class="doc-guarantee-title">Automatic 4-Page NIELIT PDF Compilation</div>
              <div class="doc-guarantee-sub">Upon submission, Annexure II (Project Proforma), Annexure III (Guide Bio-Data), Project Completion Certificate, and Official Fee Receipt will be compiled.</div>
            </div>
          </div>
        </div>

        <!-- Multi-Step Actions Bar -->
        <div class="modal-actions-bar">
          <!-- Back button (for pages 2 & 3) -->
          <button 
            v-if="activeSection > 1"
            type="button" 
            class="btn-secondary modal-cancel-btn" 
            :disabled="isSubmitting" 
            @click="prevStep"
          >
            <span>⬅️ Previous Step</span>
          </button>

          <!-- Cancel button (for page 1) -->
          <button 
            v-else
            type="button" 
            class="btn-secondary modal-cancel-btn" 
            :disabled="isSubmitting" 
            @click="$emit('cancel-submission')"
          >
            <span>Cancel</span>
          </button>

          <!-- Next button for pages 1 and 2 -->
          <button 
            v-if="activeSection < 3"
            type="button" 
            class="btn-primary modal-submit-btn" 
            @click="nextStep"
          >
            <span>{{ activeSection === 1 ? 'Next: Project Topic ➡️' : 'Next: Payment & Review ➡️' }}</span>
          </button>

          <!-- Final Submit Button for page 3 -->
          <button 
            v-else
            type="submit" 
            class="btn-primary modal-submit-btn" 
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="submitting-spinner-wrap">
              <span class="spinner-circle"></span> Submitting NIELIT Form...
            </span>
            <span v-else>
              Submit NIELIT Project Form 🚀
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { saveNielitProjectRecord } from '@/utils/apiClient';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['cancel-submission', 'submit-nielit-project']);

const isSubmitting = ref(false);
const activeSection = ref(1);
const validationErrors = ref({});

const stepTitles = [
  'Candidate Identity & Particulars',
  'Project & Dissertation Topic',
  'Fee & UTR Payment Verification'
];

function toIsoDate(val) {
  if (!val) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const str = String(val).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) {
    const [d, m, y] = str.split('/');
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function toTitleCase(val) {
  if (!val || typeof val !== 'string') return '';
  return val.replace(/\b([a-zA-Z])([a-zA-Z0-9&/'-]*)\b/g, (match, first, rest) => {
    const upper = match.toUpperCase();
    if (['AI', 'ML', 'IT', 'MERN', 'MEAN', 'AWS', 'API', 'UI', 'UX', 'IOT', 'PHP', 'SQL', 'DBMS', 'MCA', 'BCA', 'NIELIT', 'PDF', 'QR', 'UP'].includes(upper)) {
      return upper;
    }
    return first.toUpperCase() + rest.toLowerCase();
  });
}

const form = ref({
  studentName: toTitleCase(props.initialData.studentName || props.initialData.candidateName || ''),
  candidateName: toTitleCase(props.initialData.candidateName || props.initialData.studentName || ''),
  regNo: props.initialData.regNo || props.initialData.nielitRegNo || '',
  nielitRegNo: props.initialData.nielitRegNo || props.initialData.regNo || '',
  nielitLevel: props.initialData.nielitLevel || 'A',
  level: props.initialData.level || 'A Level',
  fatherName: toTitleCase(props.initialData.fatherName || ''),
  email: props.initialData.email || '',
  mobile: props.initialData.mobile || '',
  address: toTitleCase(props.initialData.address || ''),
  district: toTitleCase(props.initialData.district || 'Prayagraj'),
  state: toTitleCase(props.initialData.state || 'Uttar Pradesh'),
  pin: props.initialData.pin || '212503',

  projectTitle: toTitleCase(props.initialData.projectTitle || ''),
  guideName: toTitleCase(props.initialData.guideName || 'Er. Sushil Kumar'),
  guideQualification: props.initialData.guideQualification || 'MCA (Computer Science)',
  guideDesignation: props.initialData.guideDesignation || 'Sr. Laravel & Cloud Developer',
  guidePlace: toTitleCase(props.initialData.guidePlace || 'Prayagraj'),
  guideAddress: toTitleCase(props.initialData.guideAddress || 'Holagarh, Prayagraj, UP'),
  projectDate: toIsoDate(props.initialData.projectDate),
  githubRepo: props.initialData.githubRepo || '',

  amount: props.initialData.amount || '1000',
  paymentDate: toIsoDate(props.initialData.paymentDate),
  utrNumber: (props.initialData.utrNumber || '').trim().toUpperCase(),
  accountHolderName: toTitleCase(props.initialData.accountHolderName || ''),
  paymentRemark: 'Paid'
});

const isSection1Filled = computed(() => {
  const f = form.value;
  return !!(f.candidateName?.trim() && f.nielitRegNo?.trim() && f.fatherName?.trim() && f.email?.trim() && f.mobile?.trim() && f.address?.trim() && f.district?.trim() && f.pin?.trim());
});

const isSection2Filled = computed(() => {
  const f = form.value;
  return !!(f.projectTitle?.trim() && f.projectDate);
});

const isSection3Filled = computed(() => {
  const f = form.value;
  return !!(f.amount?.trim() && f.paymentDate && f.utrNumber?.trim() && f.accountHolderName?.trim());
});

const validateStep1 = () => {
  if (form.value.candidateName) form.value.candidateName = toTitleCase(form.value.candidateName.trim());
  if (form.value.fatherName) form.value.fatherName = toTitleCase(form.value.fatherName.trim());
  if (form.value.address) form.value.address = toTitleCase(form.value.address.trim());
  if (form.value.district) form.value.district = toTitleCase(form.value.district.trim());
  if (form.value.state) form.value.state = toTitleCase(form.value.state.trim());

  const errs = {};
  if (!form.value.candidateName?.trim()) errs.candidateName = 'Candidate full name is required';
  if (!form.value.nielitRegNo?.trim()) errs.nielitRegNo = 'NIELIT registration number is required';
  if (!form.value.fatherName?.trim()) errs.fatherName = "Father's name is required";
  if (!form.value.email?.trim() || !form.value.email.includes('@')) errs.email = 'Valid email address is required';
  if (!form.value.mobile?.trim() || form.value.mobile.replace(/\D/g, '').length < 10) errs.mobile = '10-digit mobile number is required';
  if (!form.value.address?.trim()) errs.address = 'Residential address is required';
  if (!form.value.district?.trim()) errs.district = 'District / City is required';
  if (!form.value.pin?.trim() || form.value.pin.length < 6) errs.pin = '6-digit pin code is required';
  
  validationErrors.value = errs;
  return Object.keys(errs).length === 0;
};

const validateStep2 = () => {
  if (form.value.projectTitle) form.value.projectTitle = toTitleCase(form.value.projectTitle.trim());

  const errs = {};
  if (!form.value.projectTitle?.trim()) errs.projectTitle = 'Project / Dissertation title is required';
  if (!form.value.projectDate) errs.projectDate = 'Project submission date is required';
  
  validationErrors.value = errs;
  return Object.keys(errs).length === 0;
};

const validateStep3 = () => {
  const errs = {};
  if (form.value.utrNumber) {
    form.value.utrNumber = form.value.utrNumber.trim().toUpperCase();
  }
  if (form.value.accountHolderName) {
    form.value.accountHolderName = toTitleCase(form.value.accountHolderName.trim());
  }
  if (!form.value.amount?.trim()) errs.amount = 'Fee amount is required';
  if (!form.value.paymentDate) errs.paymentDate = 'Payment date is required';
  if (!form.value.utrNumber?.trim()) errs.utrNumber = 'UTR / Transaction number is required';
  if (!form.value.accountHolderName?.trim()) errs.accountHolderName = 'Sender / Account holder name is required';
  
  validationErrors.value = errs;
  return Object.keys(errs).length === 0;
};

const nextStep = () => {
  if (activeSection.value === 1) {
    if (validateStep1()) {
      validationErrors.value = {};
      activeSection.value = 2;
    }
  } else if (activeSection.value === 2) {
    if (validateStep2()) {
      validationErrors.value = {};
      activeSection.value = 3;
    }
  }
};

const prevStep = () => {
  validationErrors.value = {};
  if (activeSection.value > 1) {
    activeSection.value -= 1;
  }
};

const goToStep = (step) => {
  if (step === 1) {
    validationErrors.value = {};
    activeSection.value = 1;
  } else if (step === 2) {
    if (validateStep1()) {
      validationErrors.value = {};
      activeSection.value = 2;
    }
  } else if (step === 3) {
    if (validateStep1() && validateStep2()) {
      validationErrors.value = {};
      activeSection.value = 3;
    }
  }
};

const handleFormSubmit = () => {
  if (!validateStep1()) {
    activeSection.value = 1;
    return;
  }
  if (!validateStep2()) {
    activeSection.value = 2;
    return;
  }
  if (!validateStep3()) {
    activeSection.value = 3;
    return;
  }

  const cleanUtr = (form.value.utrNumber || '').trim().toUpperCase();
  form.value.utrNumber = cleanUtr;
  form.value.candidateName = toTitleCase(form.value.candidateName?.trim() || '');
  form.value.fatherName = toTitleCase(form.value.fatherName?.trim() || '');
  form.value.address = toTitleCase(form.value.address?.trim() || '');
  form.value.district = toTitleCase(form.value.district?.trim() || '');
  form.value.state = toTitleCase(form.value.state?.trim() || '');
  form.value.projectTitle = toTitleCase(form.value.projectTitle?.trim() || '');
  form.value.accountHolderName = toTitleCase(form.value.accountHolderName?.trim() || form.value.candidateName);

  const regId = form.value.nielitRegNo || form.value.regNo || String(Date.now());
  const payload = {
    ...form.value,
    id: regId,
    studentName: form.value.candidateName,
    candidateName: form.value.candidateName,
    regNo: regId,
    registrationNo: regId,
    nielitRegNo: regId,
    level: form.value.nielitLevel ? `${form.value.nielitLevel} Level` : 'O Level',
    status: 'Submitted',
    feePaid: `₹${form.value.amount || '1,000'}`,
    utrNumber: cleanUtr,
    utrNo: cleanUtr,
    paymentRemark: 'Paid',
    guideName: form.value.guideName || 'Er. Sushil Kumar',
    guideQualification: form.value.guideQualification || 'MCA (Computer Science)',
    guideDesignation: form.value.guideDesignation || 'Sr. Laravel & Cloud Developer',
    guidePlace: form.value.guidePlace || 'Prayagraj',
    guideAddress: form.value.guideAddress || 'Holagarh, Prayagraj, UP'
  };

  emit('submit-nielit-project', payload);
};
</script>

<style scoped>
.nielit-project-section {
  padding: 120px 1rem 60px;
  position: relative;
}

/* Ambient background glow for the form */
.nielit-project-section::before {
  content: '';
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 60%);
  z-index: -1;
  pointer-events: none;
}

.nielit-container {
  max-width: 900px;
  margin: 0 auto;
}

.nielit-page-card {
  width: 100%;
  position: relative;
  padding: 3rem;
  border-radius: var(--radius-xl, 24px);
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  overflow: hidden;
}

.modal-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  margin: 0.75rem 0 0.5rem;
  line-height: 1.25;
  letter-spacing: -0.5px;
}

.text-gradient {
  background: linear-gradient(135deg, #f97316 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.modal-subtitle {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 90%;
}

/* Step Navigation Strip */
.nielit-steps-pill-strip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.4rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  width: fit-content;
  max-width: 100%;
}

.step-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.25rem 0.45rem 0.45rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.step-pill:hover:not(.active) {
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.05);
}

.step-num {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  color: inherit;
}

.step-pill.active {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

.step-pill.active .step-num {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}

.step-pill.done {
  color: #10b981;
}

.step-pill.done .step-num {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.step-divider {
  width: 24px;
  height: 2px;
  background: rgba(255, 255, 255, 0.08);
}

/* Page Transition Animation */
.page-fade-slide {
  animation: fadeSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Form Section Panels */
.form-section-group {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 2rem;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.form-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.section-icon-badge {
  font-size: 1.75rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.form-section-heading {
  font-family: var(--font-heading);
  color: #fff;
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.25px;
}

.form-section-sub {
  font-size: 0.85rem;
  color: #94a3b8;
  display: block;
  margin-top: 0.25rem;
}

.section-badge-req {
  font-size: 0.75rem;
  font-weight: 800;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Input Overrides for Premium Feel */
.form-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #cbd5e1;
  margin-bottom: 0.5rem;
}

.form-control {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f8fafc;
  border-radius: 12px;
  padding: 0.85rem 1.15rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  width: 100%;
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.form-control:focus, .form-control:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.2);
}

.form-control:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15);
  outline: none;
}

.form-field.has-error .form-control {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15) !important;
  background: rgba(239, 68, 68, 0.05);
}

.error-hint {
  color: #f87171;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.4rem;
  display: block;
}

.doc-guarantee-ribbon {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.02) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 16px;
}

.doc-lock-icon {
  font-size: 1.5rem;
}

.doc-guarantee-title {
  font-weight: 800;
  font-size: 0.95rem;
  color: #34d399;
  margin-bottom: 0.25rem;
}

.doc-guarantee-sub {
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.5;
}

/* Grids */
.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
}

.full-col {
  grid-column: 1 / -1;
}

/* Modal Actions Bar */
.modal-actions-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-cancel-btn {
  padding: 0.85rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  transition: all 0.3s ease;
}

.modal-cancel-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.modal-submit-btn {
  padding: 0.85rem 2.25rem;
  font-size: 0.95rem;
  font-weight: 800;
  margin-left: auto;
  border-radius: 12px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: #fff;
  border: none;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
  transition: all 0.3s ease;
}

.modal-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
}

.submitting-spinner-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.spinner-circle {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .nielit-project-section {
    padding: 100px 1rem 40px;
  }
  
  .nielit-page-card {
    padding: 1.5rem;
    border-radius: 16px;
  }

  .modal-title {
    font-size: 1.6rem;
  }

  .form-section-group {
    padding: 1.25rem;
  }

  .form-grid-2, .form-grid-3 {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  /* Compact Step Navigation for Mobile */
  .nielit-steps-pill-strip {
    justify-content: space-between;
    width: 100%;
    gap: 0.25rem;
  }
  
  .step-divider {
    flex-grow: 1;
    width: auto;
  }
  
  .step-pill {
    padding: 0.35rem;
  }
  
  /* Hide inactive text on mobile to prevent cutoff */
  .step-pill:not(.active) .step-text {
    display: none;
  }
  
  .step-pill.active {
    padding: 0.35rem 1rem 0.35rem 0.35rem;
  }

  .modal-actions-bar {
    flex-direction: column;
    gap: 1rem;
  }

  .modal-cancel-btn,
  .modal-submit-btn {
    width: 100%;
    margin-left: 0;
    justify-content: center;
  }
}
</style>
