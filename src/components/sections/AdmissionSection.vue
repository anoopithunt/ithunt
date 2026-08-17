<template>
  <section class="container" style="padding: 4rem 1.5rem;">
    <div class="section-header">
      <span class="section-tag">{{ content.admissionSection?.sectionTag || 'Online Registration 2026' }}</span>
      <h2 class="section-title">{{ content.admissionSection?.titlePrefix || 'Candidate ' }}<span class="text-gradient">{{ content.admissionSection?.titleGradient || 'Admission Application' }}</span></h2>
    </div>

    <div class="admission-container">
      <!-- Admission Form -->
      <div class="form-card">
        <h3 class="form-title">{{ content.admissionSection?.formTitle || 'Student Registration Details' }}</h3>
        <p class="form-subtitle">{{ content.admissionSection?.formSubtitle || 'Please enter accurate candidate information as per official records.' }}</p>

        <form @submit.prevent="handleSubmit">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">{{ content.admissionSection?.fields?.candidateName || 'Candidate Name' }} <span class="req">*</span></label>
              <input type="text" v-model="form.candidateName" required class="form-control" :placeholder="content.admissionSection?.fields?.candidateNamePlaceholder || 'Full candidate name'">
            </div>

            <div class="form-group">
              <label class="form-label">{{ content.admissionSection?.fields?.fatherName || 'Father Name' }} <span class="req">*</span></label>
              <input type="text" v-model="form.fatherName" required class="form-control" :placeholder="content.admissionSection?.fields?.fatherNamePlaceholder || 'Father full name'">
            </div>

            <div class="form-group">
              <label class="form-label">{{ content.admissionSection?.fields?.motherName || 'Mother Name' }} <span class="req">*</span></label>
              <input type="text" v-model="form.motherName" required class="form-control" :placeholder="content.admissionSection?.fields?.motherNamePlaceholder || 'Mother full name'">
            </div>

            <div class="form-group">
              <label class="form-label">{{ content.admissionSection?.fields?.dob || 'Date of Birth' }} <span class="req">*</span></label>
              <input type="date" v-model="form.dob" required class="form-control">
            </div>

            <div class="form-group">
              <label class="form-label">{{ content.admissionSection?.fields?.gender || 'Gender' }} <span class="req">*</span></label>
              <div class="radio-group">
                <label 
                  class="radio-option" 
                  v-for="gOpt in (content.admissionSection?.fields?.genderOptions || ['Male', 'Female', 'Other'])" 
                  :key="gOpt"
                >
                  <input type="radio" v-model="form.gender" :value="gOpt"> {{ gOpt }}
                </label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">{{ content.admissionSection?.fields?.course || 'Target Program' }} <span class="req">*</span></label>
              <select v-model="form.course" class="form-control" required>
                <optgroup 
                  v-for="grp in (content.admissionSection?.courseOptgroups || [])" 
                  :key="grp.label" 
                  :label="grp.label"
                >
                  <option v-for="opt in grp.options" :key="opt" :value="opt">{{ opt }}</option>
                </optgroup>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">{{ content.admissionSection?.fields?.mobile || 'Mobile Number' }} <span class="req">*</span></label>
              <input type="tel" v-model="form.mobile" pattern="[0-9]{10}" required class="form-control" :placeholder="content.admissionSection?.fields?.mobilePlaceholder || '10-digit mobile'">
            </div>

            <div class="form-group">
              <label class="form-label">{{ content.admissionSection?.fields?.email || 'Email Address' }} <span class="req">*</span></label>
              <input type="email" v-model="form.email" required class="form-control" :placeholder="content.admissionSection?.fields?.emailPlaceholder || 'name@example.com'">
            </div>

            <div class="form-group full-width">
              <label class="form-label">{{ content.admissionSection?.fields?.address || 'Permanent Address' }} <span class="req">*</span></label>
              <textarea v-model="form.address" rows="3" required class="form-control" :placeholder="content.admissionSection?.fields?.addressPlaceholder || 'Full residential street address'"></textarea>
            </div>
          </div>

          <div style="margin-top: 1.75rem;">
            <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">
              <span>{{ content.admissionSection?.fields?.submitBtn || 'Submit Registration 🚀' }}</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Live Receipt Preview Card -->
      <div class="receipt-preview-card">
        <!-- Receipt Top Ribbon -->
        <div class="receipt-header">
          <div class="receipt-brand-logo-wrap">
            <img :src="content.brand?.logoImage" :alt="(content.brand?.name || 'IT HUNT') + ' Logo'" class="receipt-logo-img" @error="onImgError">
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
            <span class="receipt-reg-badge" style="color: #34d399; border-color: rgba(52, 211, 153, 0.4); background: rgba(52, 211, 153, 0.1);">{{ content.admissionSection?.previewCard?.accreditedBadge || '✓ ISO 9001:2015 ACCREDITED' }}</span>
          </div>
        </div>

        <!-- Receipt Content Rows -->
        <div class="receipt-body">
          <div class="receipt-row">
            <span class="receipt-label">{{ content.admissionSection?.previewCard?.candidateNameLabel || 'Candidate Name:' }}</span>
            <span class="receipt-val">{{ form.candidateName || content.admissionSection?.previewCard?.typingPlaceholder || '— (Typing...)' }}</span>
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
            <span class="receipt-val">{{ form.gender }} | {{ form.dob || '—' }}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">{{ content.admissionSection?.previewCard?.mobileLabel || 'Contact Mobile:' }}</span>
            <span class="receipt-val receipt-phone-val">{{ form.mobile || '—' }}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">{{ content.admissionSection?.previewCard?.districtLabel || 'District & State:' }}</span>
            <span class="receipt-val">{{ form.district }}, UP</span>
          </div>
        </div>

        <!-- Receipt Footer / Security Stamp -->
        <div class="receipt-footer">
          <div class="receipt-security-note">
            <span class="security-icon">🛡️</span>
            <span>{{ content.admissionSection?.previewCard?.securityNote }}</span>
          </div>
          <div class="receipt-signature-line">
            <div class="sig-title">{{ content.admissionSection?.previewCard?.signatoryTitle || 'Authorized Signatory:' }}</div>
            <div class="sig-name">{{ content.admissionSection?.previewCard?.signatoryName || content.director?.name }}</div>
          </div>
        </div>

        <!-- Receipt Download Action if submitted -->
        <div v-if="lastSubmittedAdmission" style="margin-top: 1.25rem; padding: 0 1.25rem 1.25rem;">
          <button 
            class="btn-primary pdf-download-btn" 
            style="width: 100%; justify-content: center;" 
            @click="$emit('download-pdf')" 
            :disabled="isGeneratingPdf"
          >
            <span>{{ isGeneratingPdf ? (content.ui?.generatingPdfLabel || '⏳ Generating PDF...') : (content.ui?.downloadVerifiedPdfBtn || '📄 Download Verified Admission Slip (PDF)') }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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
  }
});

const emit = defineEmits(['submit-admission', 'download-pdf']);

const handleSubmit = () => {
  emit('submit-admission', props.form);
};

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="12" fill="%23f97316"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="900" fill="white">IT HUNT</text></svg>';
};
</script>
