<template>
  <section class="admission-page-section">
    <div class="container admission-inner-wrap">
      <!-- Section Header -->
      <div class="section-header anim-stagger-1 text-center">
        <span class="section-tag">{{ content.admissionSection?.sectionTag || 'Online Registration 2026' }}</span>
        <h2 class="section-title">
          {{ content.admissionSection?.titlePrefix || 'Candidate ' }}
          <span class="text-gradient">{{ content.admissionSection?.titleGradient || 'Admission Application' }}</span>
        </h2>
        <p class="section-subtitle-desc">
          Official enrollment portal for software development, IT certification, and career incubator batches.
        </p>
      </div>

      <!-- Multi-Step Progress Indicator -->
      <div class="admission-steps-bar reveal-on-scroll" aria-label="Application Progress">
        <div class="admission-step" :class="{ active: currentStep === 1, done: currentStep > 1 }">
          <div class="step-circle">{{ currentStep > 1 ? '✓' : '1' }}</div>
          <span class="step-label">Personal Info</span>
        </div>
        <div class="step-connector" :class="{ done: currentStep > 1 }"></div>
        <div class="admission-step" :class="{ active: currentStep === 2, done: currentStep > 2 }">
          <div class="step-circle">{{ currentStep > 2 ? '✓' : '2' }}</div>
          <span class="step-label">Program</span>
        </div>
        <div class="step-connector" :class="{ done: currentStep > 2 }"></div>
        <div class="admission-step" :class="{ active: currentStep === 3, done: isFormComplete }">
          <div class="step-circle">{{ isFormComplete ? '✓' : '3' }}</div>
          <span class="step-label">Contact & Portal</span>
        </div>
      </div>

      <!-- Mobile Tab Switcher for Form vs Receipt -->
      <div class="mobile-tab-switcher">
        <button 
          class="tab-switch-btn" 
          :class="{ active: mobileActiveTab === 'form' }"
          @click="mobileActiveTab = 'form'"
        >
          <span>📝 Application Form</span>
        </button>
        <button 
          class="tab-switch-btn" 
          :class="{ active: mobileActiveTab === 'preview' }"
          @click="mobileActiveTab = 'preview'"
        >
          <span>📜 Live Preview Slip</span>
        </button>
      </div>

      <!-- Main Layout Container -->
      <div class="admission-grid-container">
        <!-- Application Form Card -->
        <div class="form-card anim-stagger-2" :class="{ 'mobile-hidden': mobileActiveTab === 'preview' }">
          <div class="form-card-header">
            <h3 class="form-title">
              <span class="form-title-icon">📋</span>
              {{ content.admissionSection?.formTitle || 'Student Registration Details' }}
            </h3>
            <p class="form-subtitle">
              {{ content.admissionSection?.formSubtitle || 'Please enter accurate candidate information as per official records.' }}
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="admission-form">
            <div class="form-grid">
              <!-- Candidate Name -->
              <div class="form-group">
                <label class="form-label">
                  <span>{{ content.admissionSection?.fields?.candidateName || 'Candidate Name' }}</span>
                  <span class="req">*</span>
                </label>
                <div class="input-wrap">
                  <input 
                    type="text" 
                    v-model="form.candidateName" 
                    required 
                    class="form-control" 
                    :placeholder="content.admissionSection?.fields?.candidateNamePlaceholder || 'Full candidate name'"
                  >
                </div>
              </div>

              <!-- Father Name -->
              <div class="form-group">
                <label class="form-label">
                  <span>{{ content.admissionSection?.fields?.fatherName || 'Father Name' }}</span>
                  <span class="req">*</span>
                </label>
                <div class="input-wrap">
                  <input 
                    type="text" 
                    v-model="form.fatherName" 
                    required 
                    class="form-control" 
                    :placeholder="content.admissionSection?.fields?.fatherNamePlaceholder || 'Father full name'"
                  >
                </div>
              </div>

              <!-- Mother Name -->
              <div class="form-group">
                <label class="form-label">
                  <span>{{ content.admissionSection?.fields?.motherName || 'Mother Name' }}</span>
                  <span class="req">*</span>
                </label>
                <div class="input-wrap">
                  <input 
                    type="text" 
                    v-model="form.motherName" 
                    required 
                    class="form-control" 
                    :placeholder="content.admissionSection?.fields?.motherNamePlaceholder || 'Mother full name'"
                  >
                </div>
              </div>

              <!-- DOB -->
              <div class="form-group">
                <label class="form-label">
                  <span>{{ content.admissionSection?.fields?.dob || 'Date of Birth' }}</span>
                  <span class="req">*</span>
                </label>
                <div class="input-wrap">
                  <input 
                    type="date" 
                    v-model="form.dob" 
                    required 
                    class="form-control"
                  >
                </div>
              </div>

              <!-- Gender -->
              <div class="form-group">
                <label class="form-label">
                  <span>{{ content.admissionSection?.fields?.gender || 'Gender' }}</span>
                  <span class="req">*</span>
                </label>
                <div class="radio-pill-group">
                  <label 
                    class="radio-pill-option" 
                    v-for="gOpt in (content.admissionSection?.fields?.genderOptions || ['Male', 'Female', 'Other'])" 
                    :key="gOpt"
                    :class="{ selected: form.gender === gOpt }"
                  >
                    <input type="radio" v-model="form.gender" :value="gOpt" class="radio-native">
                    <span class="radio-custom-dot"></span>
                    <span class="radio-label-text">{{ gOpt }}</span>
                  </label>
                </div>
              </div>

              <!-- Target Program -->
              <div class="form-group">
                <label class="form-label">
                  <span>{{ content.admissionSection?.fields?.course || 'Target Program' }}</span>
                  <span class="req">*</span>
                </label>
                <div class="input-wrap select-wrap">
                  <select v-model="form.course" class="form-control select-control" required>
                    <optgroup 
                      v-for="grp in dynamicCourseOptgroups" 
                      :key="grp.label" 
                      :label="grp.label"
                    >
                      <option v-for="opt in grp.options" :key="opt" :value="opt">{{ opt }}</option>
                    </optgroup>
                  </select>
                  <span class="select-chevron">▼</span>
                </div>
              </div>

              <!-- Mobile -->
              <div class="form-group">
                <label class="form-label">
                  <span>{{ content.admissionSection?.fields?.mobile || 'Mobile Number' }}</span>
                  <span class="req">*</span>
                </label>
                <div class="input-wrap">
                  <input 
                    type="tel" 
                    v-model="form.mobile" 
                    pattern="[0-9]{10}" 
                    required 
                    class="form-control" 
                    :placeholder="content.admissionSection?.fields?.mobilePlaceholder || '10-digit mobile'"
                  >
                </div>
              </div>

              <!-- Email / Login Username -->
              <div class="form-group">
                <label class="form-label">
                  <span>{{ content.admissionSection?.fields?.email || 'Email Address' }}</span>
                  <span class="req">*</span>
                </label>
                <div class="input-wrap">
                  <input 
                    type="email" 
                    v-model="form.email" 
                    required 
                    class="form-control" 
                    :placeholder="content.admissionSection?.fields?.emailPlaceholder || 'name@example.com'"
                  >
                </div>
                <small class="field-hint-pill orange">
                  🔑 Student Portal Username (Login ID)
                </small>
              </div>

              <!-- Portal Password with Inline Eye Toggle -->
              <div class="form-group">
                <label class="form-label">
                  <span>Portal Password</span>
                  <span class="optional-tag">(Optional)</span>
                </label>
                <div class="input-wrap pwd-wrap">
                  <input 
                    :type="showAdmPassword ? 'text' : 'password'" 
                    v-model="form.password" 
                    class="form-control pwd-control" 
                    placeholder="Default: Ithunt@123"
                  >
                  <button 
                    type="button" 
                    class="pwd-toggle-inline" 
                    @click="showAdmPassword = !showAdmPassword"
                    :title="showAdmPassword ? 'Hide Password' : 'Show Password'"
                    aria-label="Toggle Password Visibility"
                  >
                    <span>{{ showAdmPassword ? '🙈' : '👁️' }}</span>
                  </button>
                </div>
                <small class="field-hint-pill green">
                  🔒 Default: Ithunt@123 (or set custom)
                </small>
              </div>

              <!-- Permanent Address -->
              <div class="form-group full-width">
                <label class="form-label">
                  <span>{{ content.admissionSection?.fields?.address || 'Permanent Address' }}</span>
                  <span class="req">*</span>
                </label>
                <div class="input-wrap">
                  <textarea 
                    v-model="form.address" 
                    rows="3" 
                    required 
                    class="form-control textarea-control" 
                    :placeholder="content.admissionSection?.fields?.addressPlaceholder || 'Full residential street address'"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Submit Action Bar -->
            <div class="form-submit-row">
              <button type="submit" class="btn-primary submit-admission-btn" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="submitting-state">
                  <span class="spinner-dot"></span> Submitting Application...
                </span>
                <span v-else class="normal-state">
                  {{ content.admissionSection?.fields?.submitBtn || 'Submit Registration Application 🚀' }}
                </span>
              </button>
            </div>
          </form>
        </div>

        <!-- Live Candidate Receipt Preview Card -->
        <div class="receipt-preview-card anim-stagger-3" :class="{ 'mobile-hidden': mobileActiveTab === 'form' }">
          <!-- Receipt Top Ribbon -->
          <div class="receipt-header">
            <div class="receipt-brand-logo-wrap">
              <img 
                :src="content.brand?.logoImage" 
                :alt="(content.brand?.name || 'IT HUNT') + ' Logo'" 
                class="receipt-logo-img" 
                @error="onImgError"
              >
              <div>
                <div class="receipt-stamp">
                  <span class="stamp-dot"></span>
                  <span>{{ content.admissionSection?.previewCard?.stamp || '🏛️ OFFICIAL ADMISSION PREVIEW' }}</span>
                </div>
                <h4 class="receipt-title">{{ content.admissionSection?.previewCard?.title || 'IT HUNT ACADEMY 2026' }}</h4>
                <div class="receipt-subtitle">📍 {{ content.admissionSection?.previewCard?.location || content.contact?.location }}</div>
              </div>
            </div>
            <div class="receipt-badges-row">
              <span class="receipt-reg-badge">{{ content.admissionSection?.previewCard?.copyBadge || '📜 OFFICIAL CANDIDATE COPY' }}</span>
              <span class="receipt-reg-badge iso-badge">{{ content.admissionSection?.previewCard?.accreditedBadge || '✓ ISO 9001:2015 ACCREDITED' }}</span>
            </div>
          </div>

          <!-- Receipt Content Rows -->
          <div class="receipt-body">
            <div class="receipt-row">
              <span class="receipt-label">{{ content.admissionSection?.previewCard?.candidateNameLabel || 'Candidate Name:' }}</span>
              <span class="receipt-val highlight">{{ form.candidateName || content.admissionSection?.previewCard?.typingPlaceholder || '— (Typing...)' }}</span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">{{ content.admissionSection?.previewCard?.fatherNameLabel || "Father's Name:" }}</span>
              <span class="receipt-val">{{ form.fatherName || '—' }}</span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">{{ content.admissionSection?.previewCard?.programLabel || 'Program Selected:' }}</span>
              <span class="receipt-val receipt-course-pill">{{ form.course }}</span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">{{ content.admissionSection?.previewCard?.genderDobLabel || 'Gender / DOB:' }}</span>
              <span class="receipt-val">{{ form.gender || '—' }} | {{ form.dob || '—' }}</span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">{{ content.admissionSection?.previewCard?.mobileLabel || 'Contact Mobile:' }}</span>
              <span class="receipt-val receipt-phone-val">{{ form.mobile || '—' }}</span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">{{ content.admissionSection?.previewCard?.districtLabel || 'District & State:' }}</span>
              <span class="receipt-val">{{ form.district || 'Prayagraj' }}, UP</span>
            </div>
            <div class="receipt-row login-id-row">
              <span class="receipt-label login-label">Student Login ID:</span>
              <span class="receipt-val login-val">{{ form.email || 'Candidate Email Address' }}</span>
            </div>
          </div>

          <!-- Receipt Footer / Security Stamp -->
          <div class="receipt-footer">
            <div class="receipt-security-note">
              <span class="security-icon">🛡️</span>
              <span>{{ content.admissionSection?.previewCard?.securityNote || 'Digitally Generated Verification Seal' }}</span>
            </div>
            <div class="receipt-signature-line">
              <div class="sig-title">{{ content.admissionSection?.previewCard?.signatoryTitle || 'Authorized Signatory:' }}</div>
              <div class="sig-name">{{ content.admissionSection?.previewCard?.signatoryName || content.director?.name || 'Director, IT HUNT' }}</div>
            </div>
          </div>

          <!-- Post-Submission Action Buttons -->
          <div v-if="lastSubmittedAdmission" class="submitted-actions-wrap">
            <button 
              class="btn-primary student-login-action-btn" 
              @click="$emit('login-as-student', lastSubmittedAdmission)"
              title="Sign in directly to your new Student Dashboard"
            >
              <span>🎓 Sign In as Student Now →</span>
            </button>

            <button 
              class="btn-primary pdf-download-btn" 
              @click="$emit('download-pdf')" 
              :disabled="isGeneratingPdf"
            >
              <span>{{ isGeneratingPdf ? (content.ui?.generatingPdfLabel || '⏳ Generating PDF...') : (content.ui?.downloadVerifiedPdfBtn || '📄 Download Verified Admission Slip (PDF)') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  content: {
    type: Object,
    required: true
  },
  form: {
    type: Object,
    required: true
  },
  lastSubmittedAdmission: {
    type: Object,
    default: null
  },
  isGeneratingPdf: {
    type: Boolean,
    default: false
  },
  courses: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['submit-admission', 'download-pdf', 'login-as-student', 'go-to-login']);

const mobileActiveTab = ref('form'); // 'form' or 'preview'
const isSubmitting = ref(false);
const showAdmPassword = ref(false);

const dynamicCourseOptgroups = computed(() => {
  if (props.courses && props.courses.length > 0) {
    const categoryMap = new Map();
    props.courses.forEach(c => {
      const cat = c.category || c.categoryName || 'Certified Software & IT Programs';
      const title = c.title || c.name || c.code;
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, []);
      }
      if (!categoryMap.get(cat).includes(title)) {
        categoryMap.get(cat).push(title);
      }
    });

    const groups = [];
    categoryMap.forEach((options, cat) => {
      let icon = '📚';
      const lower = cat.toLowerCase();
      if (lower.includes('software') || lower.includes('mern') || lower.includes('internship') || lower.includes('mobile')) icon = '🚀';
      else if (lower.includes('ai') || lower.includes('machine') || lower.includes('intelligence')) icon = '🤖';
      else if (lower.includes('nielit') || lower.includes('diploma') || lower.includes('level')) icon = '🏛️';
      else if (lower.includes('degree') || lower.includes('university') || lower.includes('bca') || lower.includes('mca')) icon = '🎓';
      else if (lower.includes('tally') || lower.includes('account') || lower.includes('finance')) icon = '📊';
      else if (lower.includes('govt') || lower.includes('ccc')) icon = '📜';

      groups.push({
        label: `${icon} ${cat} (${options.length})`,
        options
      });
    });
    return groups;
  }
  return props.content.admissionSection?.courseOptgroups || [];
});

const currentStep = computed(() => {
  const f = props.form;
  if (f.mobile || f.email || f.address) return 3;
  if (f.course && f.dob) return 2;
  if (f.candidateName) return 2;
  return 1;
});

const isFormComplete = computed(() => {
  const f = props.form;
  return !!(f.candidateName && f.mobile && f.email && f.course);
});

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    await emit('submit-admission', props.form);
    // Switch to preview tab automatically on mobile after submission
    mobileActiveTab.value = 'preview';
  } finally {
    setTimeout(() => {
      isSubmitting.value = false;
    }, 600);
  }
};

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="12" fill="%23f97316"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="900" fill="white">IT HUNT</text></svg>';
};
</script>

<style scoped>
/* ==========================================================================
   ADMISSION SECTION - HIGH-PERFORMANCE RESPONSIVE DESIGN SYSTEM
   ========================================================================== */

.admission-page-section {
  padding: 3.5rem 1rem;
  width: 100%;
  box-sizing: border-box;
}

.admission-inner-wrap {
  max-width: 1200px;
  margin: 0 auto;
}

.section-subtitle-desc {
  color: var(--text-muted, #94a3b8);
  font-size: 0.95rem;
  margin-top: 0.5rem;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
}

/* Steps Bar Styling */
.admission-steps-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 2.25rem auto 2.5rem;
  max-width: 650px;
  width: 100%;
}

.admission-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--text-muted, #94a3b8);
  transition: all 0.3s ease;
}

.admission-step.active .step-circle {
  background: var(--color-ai-orange, #f97316);
  border-color: #fb923c;
  color: #ffffff;
  box-shadow: 0 0 15px rgba(249, 115, 22, 0.4);
}

.admission-step.done .step-circle {
  background: #10b981;
  border-color: #34d399;
  color: #ffffff;
}

.step-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted, #94a3b8);
}

.admission-step.active .step-label,
.admission-step.done .step-label {
  color: var(--text-main, #ffffff);
  font-weight: 700;
}

.step-connector {
  flex: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  margin: 0 0.25rem;
  transition: all 0.3s ease;
}

.step-connector.done {
  background: #10b981;
}

/* Mobile Tab Switcher */
.mobile-tab-switcher {
  display: none;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  background: rgba(13, 21, 39, 0.6);
  padding: 0.35rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tab-switch-btn {
  flex: 1;
  padding: 0.75rem 0.5rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-muted, #94a3b8);
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.tab-switch-btn.active {
  background: var(--gradient-ai-btn, linear-gradient(135deg, #f97316, #ea580c));
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

/* Grid Layout */
.admission-grid-container {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2rem;
  align-items: start;
}

/* Form Card */
.form-card {
  background: var(--bg-card-cyber, rgba(13, 21, 39, 0.85));
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.form-card-header {
  margin-bottom: 1.75rem;
}

.form-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-main, #ffffff);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.4rem 0;
}

.form-subtitle {
  color: var(--text-muted, #94a3b8);
  font-size: 0.88rem;
  margin: 0;
  line-height: 1.4;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--text-main, #e2e8f0);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.form-label .req {
  color: #f43f5e;
}

.optional-tag {
  font-size: 0.75rem;
  color: var(--text-muted, #94a3b8);
  font-weight: 500;
}

.input-wrap {
  position: relative;
  width: 100%;
}

.form-control {
  width: 100%;
  box-sizing: border-box;
  background: rgba(15, 23, 42, 0.75);
  border: 1.5px solid rgba(255, 255, 255, 0.14);
  color: var(--text-main, #ffffff);
  padding: 0.8rem 1rem;
  border-radius: 12px;
  font-size: 0.92rem;
  font-family: inherit;
  transition: all 0.25s ease;
  outline: none;
}

.form-control::placeholder {
  color: rgba(148, 163, 184, 0.6);
}

.form-control:focus {
  border-color: var(--color-ai-orange, #f97316);
  background: rgba(15, 23, 42, 0.95);
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2);
}

/* Fix browser autofill white background */
.form-control:-webkit-autofill,
.form-control:-webkit-autofill:hover, 
.form-control:-webkit-autofill:focus,
.form-control:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px #0f172a inset !important;
  -webkit-text-fill-color: #ffffff !important;
  transition: background-color 5000s ease-in-out 0s;
}

/* Custom Select Control */
.select-wrap {
  position: relative;
}

.select-control {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2.5rem;
  cursor: pointer;
}

.select-chevron {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 0.75rem;
  color: var(--color-ai-orange, #f97316);
}

/* Radio Option Pills */
.radio-pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding-top: 0.2rem;
}

.radio-pill-option {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.6);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.radio-pill-option.selected {
  background: rgba(249, 115, 22, 0.15);
  border-color: var(--color-ai-orange, #f97316);
}

.radio-native {
  display: none;
}

.radio-custom-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  position: relative;
  transition: all 0.2s ease;
}

.radio-pill-option.selected .radio-custom-dot {
  border-color: var(--color-ai-orange, #f97316);
  background: var(--color-ai-orange, #f97316);
  box-shadow: 0 0 8px rgba(249, 115, 22, 0.5);
}

.radio-label-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-main, #ffffff);
}

/* Password Toggle Inline */
.pwd-wrap {
  position: relative;
}

.pwd-control {
  padding-right: 3rem;
}

.pwd-toggle-inline {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.pwd-toggle-inline:hover {
  background: rgba(255, 255, 255, 0.1);
}

.field-hint-pill {
  display: inline-block;
  margin-top: 0.35rem;
  font-size: 0.78rem;
  font-weight: 700;
}

.field-hint-pill.orange {
  color: var(--color-ai-orange, #f97316);
}

.field-hint-pill.green {
  color: #34d399;
}

.textarea-control {
  resize: vertical;
  min-height: 80px;
}

/* Form Submit Row */
.form-submit-row {
  margin-top: 1.75rem;
}

.submit-admission-btn {
  width: 100%;
  justify-content: center;
  padding: 0.95rem 1.5rem;
  font-size: 1rem;
  font-weight: 800;
  border-radius: 12px;
}

/* Receipt Preview Card */
.receipt-preview-card {
  background: rgba(13, 21, 39, 0.9);
  border: 1.5px dashed rgba(249, 115, 22, 0.35);
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  position: sticky;
  top: 5.5rem;
}

.receipt-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
}

.receipt-brand-logo-wrap {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 0.85rem;
}

.receipt-logo-img {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  object-fit: cover;
}

.receipt-stamp {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--color-ai-orange, #f97316);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.stamp-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-ai-orange, #f97316);
}

.receipt-title {
  margin: 0.15rem 0 0 0;
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--text-main, #ffffff);
}

.receipt-subtitle {
  font-size: 0.78rem;
  color: var(--text-muted, #94a3b8);
}

.receipt-badges-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.receipt-reg-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-main, #e2e8f0);
}

.receipt-reg-badge.iso-badge {
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.4);
  background: rgba(52, 211, 153, 0.1);
}

.receipt-body {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.06);
  font-size: 0.85rem;
}

.receipt-label {
  color: var(--text-muted, #94a3b8);
  font-weight: 600;
}

.receipt-val {
  color: var(--text-main, #ffffff);
  font-weight: 700;
  text-align: right;
}

.receipt-val.highlight {
  color: var(--color-ai-orange, #f97316);
}

.receipt-course-pill {
  background: rgba(249, 115, 22, 0.15);
  color: var(--color-ai-orange, #f97316);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-size: 0.8rem;
}

.login-id-row {
  background: rgba(56, 189, 248, 0.08);
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  border: 1px dashed rgba(56, 189, 248, 0.35);
  margin-top: 0.4rem;
}

.login-label {
  color: #38bdf8;
  font-weight: 800;
}

.login-val {
  color: var(--text-main, #ffffff);
  font-weight: 800;
  word-break: break-all;
}

.receipt-footer {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
}

.receipt-security-note {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.73rem;
  color: var(--text-muted, #94a3b8);
}

.receipt-signature-line {
  text-align: right;
}

.sig-title {
  font-size: 0.7rem;
  color: var(--text-muted, #94a3b8);
}

.sig-name {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--text-main, #ffffff);
}

.submitted-actions-wrap {
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.student-login-action-btn {
  width: 100%;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-ai-orange), #ea580c);
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.35);
}

/* ==========================================================================
   MOBILE RESPONSIVE BREAKPOINTS (<= 768px)
   ========================================================================== */
@media (max-width: 992px) {
  .admission-grid-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .receipt-preview-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .admission-page-section {
    padding: 2rem 0.75rem;
  }

  .mobile-tab-switcher {
    display: flex;
  }

  .mobile-hidden {
    display: none !important;
  }

  .form-card {
    padding: 1.25rem 1rem;
    border-radius: 16px;
  }

  .form-grid {
    grid-template-columns: 1fr !important;
    gap: 1rem;
  }

  .form-title {
    font-size: 1.2rem;
  }

  .form-subtitle {
    font-size: 0.82rem;
  }

  .admission-steps-bar {
    gap: 0.25rem;
    margin: 1.5rem 0 1.75rem;
  }

  .step-circle {
    width: 28px;
    height: 28px;
    font-size: 0.75rem;
  }

  .step-label {
    font-size: 0.75rem;
  }

  .radio-pill-group {
    gap: 0.4rem;
  }

  .radio-pill-option {
    padding: 0.5rem 0.75rem;
  }

  .submit-admission-btn {
    padding: 0.85rem 1rem;
    font-size: 0.92rem;
  }
}
</style>

