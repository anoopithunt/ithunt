<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card nielit-modal-card">
      <!-- Theme Matched Top-Right Close Button -->
      <button 
        class="modal-close-icon" 
        @click="$emit('close')" 
        title="Close Project Submission Form (Esc)"
        aria-label="Close Project Submission Form"
      >
        ✕
      </button>

      <!-- Modal Header -->
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
                required 
                class="form-control" 
                placeholder="e.g. Anup Kumar" 
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
                required 
                class="form-control" 
                placeholder="e.g. Shiv Shanker Mishra" 
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
              required 
              class="form-control" 
              placeholder="House/Street, Landmark, Village/Town" 
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
                required 
                class="form-control" 
                placeholder="e.g. Prayagraj" 
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
                required 
                class="form-control" 
                placeholder="e.g. Uttar Pradesh" 
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
                required 
                class="form-control" 
                placeholder="e.g. AI-Powered Network Traffic Monitoring and Intrusion Detection System" 
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
                required 
                class="form-control font-mono" 
                placeholder="e.g. CHD550W1FMSF1B" 
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
              required 
              class="form-control" 
              placeholder="Name as registered with bank" 
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
            @click="$emit('close')"
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

const emit = defineEmits(['close', 'submit-nielit-project']);

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

const form = ref({
  studentName: props.initialData.studentName || props.initialData.candidateName || '',
  candidateName: props.initialData.candidateName || props.initialData.studentName || '',
  regNo: props.initialData.regNo || props.initialData.nielitRegNo || '',
  nielitRegNo: props.initialData.nielitRegNo || props.initialData.regNo || '',
  nielitLevel: props.initialData.nielitLevel || 'A',
  level: props.initialData.level || 'A Level',
  fatherName: props.initialData.fatherName || '',
  email: props.initialData.email || '',
  mobile: props.initialData.mobile || '',
  address: props.initialData.address || '',
  district: props.initialData.district || 'Prayagraj',
  state: props.initialData.state || 'Uttar Pradesh',
  pin: props.initialData.pin || '212503',

  projectTitle: props.initialData.projectTitle || '',
  guideName: props.initialData.guideName || 'Er. Sushil Kumar',
  guideQualification: props.initialData.guideQualification || 'MCA (Computer Science)',
  guideDesignation: props.initialData.guideDesignation || 'Sr. Laravel & Cloud Developer',
  guidePlace: props.initialData.guidePlace || 'Prayagraj',
  guideAddress: props.initialData.guideAddress || 'Holagarh, Prayagraj, UP',
  projectDate: toIsoDate(props.initialData.projectDate),
  githubRepo: props.initialData.githubRepo || '',

  amount: props.initialData.amount || '1000',
  paymentDate: toIsoDate(props.initialData.paymentDate),
  utrNumber: props.initialData.utrNumber || '',
  accountHolderName: props.initialData.accountHolderName || '',
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
  const errs = {};
  if (!form.value.projectTitle?.trim()) errs.projectTitle = 'Project / Dissertation title is required';
  if (!form.value.projectDate) errs.projectDate = 'Project submission date is required';
  
  validationErrors.value = errs;
  return Object.keys(errs).length === 0;
};

const validateStep3 = () => {
  const errs = {};
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

const handleFormSubmit = async () => {
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

  try {
    isSubmitting.value = true;
    const regId = form.value.nielitRegNo || form.value.regNo || String(Date.now());
    const payload = {
      ...form.value,
      id: regId,
      studentName: form.value.candidateName || form.value.studentName || '',
      candidateName: form.value.candidateName || form.value.studentName || '',
      regNo: regId,
      registrationNo: regId,
      nielitRegNo: regId,
      level: form.value.nielitLevel ? `${form.value.nielitLevel} Level` : 'O Level',
      status: 'Submitted',
      feePaid: `₹${form.value.amount || '1,000'}`,
      utrNo: form.value.utrNumber || '',
      paymentRemark: 'Paid',
      guideName: form.value.guideName || 'Er. Sushil Kumar',
      guideQualification: form.value.guideQualification || 'MCA (Computer Science)',
      guideDesignation: form.value.guideDesignation || 'Sr. Laravel & Cloud Developer',
      guidePlace: form.value.guidePlace || 'Prayagraj',
      guideAddress: form.value.guideAddress || 'Holagarh, Prayagraj, UP'
    };

    // Save directly to Firebase Firestore Cloud Database
    await saveNielitProjectRecord(payload);
    emit('submit-nielit-project', payload);
  } catch (err) {
    console.warn('API submission note:', err.message);
    emit('submit-nielit-project', { ...form.value });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.nielit-modal-card {
  max-width: 820px;
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 2.25rem 2rem;
  border-radius: var(--radius-xl, 20px);
  background: var(--bg-card-glass);
  border: 1px solid var(--border-cyber-glow);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(249, 115, 22, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.modal-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-cyber);
  padding-right: 3rem;
}

.modal-title {
  font-family: var(--font-heading);
  font-size: 1.85rem;
  font-weight: 800;
  margin: 0.6rem 0 0.4rem;
  line-height: 1.25;
}

.modal-subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

/* Step Navigation Strip */
.nielit-steps-pill-strip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.25);
  padding: 0.4rem;
  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--border-cyber);
  width: fit-content;
  max-width: 100%;
  overflow-x: auto;
}

.step-pill {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full, 9999px);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}

.step-pill:hover {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.05);
}

.step-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  font-weight: 800;
}

.step-pill.active {
  background: var(--gradient-ai-btn);
  color: #fff;
  box-shadow: 0 0 15px rgba(249, 115, 22, 0.4);
}

.step-pill.active .step-num {
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
}

.step-pill.done {
  color: #10b981;
}

.step-pill.done .step-num {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.step-divider {
  width: 16px;
  height: 2px;
  background: var(--border-cyber);
}

/* Page Transition Animation */
.page-fade-slide {
  animation: fadeSlideIn 0.35s ease-out forwards;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Form Section Panels */
.form-section-group {
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid var(--border-cyber-glow);
  padding: 1.75rem;
  border-radius: var(--radius-lg, 16px);
  transition: var(--transition);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

body.light-theme .form-section-group {
  background: rgba(255, 255, 255, 0.75);
}

.form-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-cyber);
  padding-bottom: 0.85rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-icon-badge {
  font-size: 1.5rem;
}

.form-section-heading {
  font-family: var(--font-heading);
  color: var(--color-ai-orange);
  font-size: 1.15rem;
  font-weight: 800;
  margin: 0;
}

.form-section-sub {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.section-badge-req {
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--color-ai-gold);
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.label-icon {
  margin-right: 0.25rem;
}

.font-mono {
  font-family: var(--font-mono);
}

.full-col {
  grid-column: 1 / -1;
}

.form-field.has-error .form-control {
  border-color: #ef4444 !important;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.35) !important;
}

.error-hint {
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.3rem;
  display: block;
}

.doc-guarantee-ribbon {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.15rem;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: var(--radius-md);
}

.doc-lock-icon {
  font-size: 1.35rem;
  color: #10b981;
  flex-shrink: 0;
}

.doc-guarantee-title {
  font-weight: 800;
  font-size: 0.9rem;
  color: #10b981;
  margin-bottom: 0.2rem;
}

.doc-guarantee-sub {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.45;
}

/* Grids */
.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.15rem;
}

.form-grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.15rem;
}

/* Modal Actions Bar */
.modal-actions-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  border-top: 1px solid var(--border-cyber);
}

.modal-cancel-btn {
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 700;
}

.modal-submit-btn {
  padding: 0.75rem 2rem;
  font-size: 0.95rem;
  font-weight: 800;
  margin-left: auto;
}

.submitting-spinner-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.spinner-circle {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 680px) {
  .nielit-modal-card {
    padding: 1.5rem 1.15rem;
  }

  .modal-title {
    font-size: 1.45rem;
  }

  .form-grid-2, .form-grid-3 {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }

  .modal-actions-bar {
    flex-direction: column;
  }

  .modal-cancel-btn,
  .modal-submit-btn {
    width: 100%;
    justify-content: center;
    margin-left: 0;
  }
}
</style>
