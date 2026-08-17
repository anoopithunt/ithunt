<template>
  <section class="container" style="padding: 4rem 1.5rem;">
    <div class="section-header">
      <span class="section-tag">Online Registration 2026</span>
      <h2 class="section-title">Candidate <span class="text-gradient">Admission Application</span></h2>
    </div>

    <div class="admission-container">
      <!-- Admission Form -->
      <div class="form-card">
        <h3 class="form-title">Student Registration Details</h3>
        <p class="form-subtitle">Please enter accurate candidate information as per official records.</p>

        <form @submit.prevent="handleSubmit">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Candidate Name <span class="req">*</span></label>
              <input type="text" v-model="form.candidateName" required class="form-control" placeholder="Full candidate name">
            </div>

            <div class="form-group">
              <label class="form-label">Father's Name <span class="req">*</span></label>
              <input type="text" v-model="form.fatherName" required class="form-control" placeholder="Father's full name">
            </div>

            <div class="form-group">
              <label class="form-label">Mother's Name <span class="req">*</span></label>
              <input type="text" v-model="form.motherName" required class="form-control" placeholder="Mother's full name">
            </div>

            <div class="form-group">
              <label class="form-label">Date of Birth <span class="req">*</span></label>
              <input type="date" v-model="form.dob" required class="form-control">
            </div>

            <div class="form-group">
              <label class="form-label">Gender <span class="req">*</span></label>
              <div class="radio-group">
                <label class="radio-option"><input type="radio" v-model="form.gender" value="Male"> Male</label>
                <label class="radio-option"><input type="radio" v-model="form.gender" value="Female"> Female</label>
                <label class="radio-option"><input type="radio" v-model="form.gender" value="Other"> Other</label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Target Program <span class="req">*</span></label>
              <select v-model="form.course" class="form-control" required>
                <optgroup label="🚀 IT Solution & Production Internships (3 / 6 Months)">
                  <option value="Web Development (MERN Stack & Cloud Architecture)">Web Development (MERN Stack & Cloud Architecture)</option>
                  <option value="iOS Native App Development (Swift & SwiftUI)">iOS Native App Development (Swift & SwiftUI)</option>
                  <option value="Android Native App Development (Kotlin & Jetpack Compose)">Android Native App Development (Kotlin & Jetpack Compose)</option>
                  <option value="Digital Marketing, SEO & Growth Hacking">Digital Marketing, SEO & Growth Hacking</option>
                </optgroup>
                <optgroup label="📚 Accredited Diplomas & University Degrees">
                  <option value='NIELIT "O" Level Diploma'>NIELIT "O" Level Diploma (Govt. of India)</option>
                  <option value='NIELIT "A" Level Diploma'>NIELIT "A" Level Diploma (Graduate Diploma)</option>
                  <option value="Subharti University Degree Courses (BCA / MCA)">Subharti University Degree (BCA / MCA)</option>
                  <option value="Tally ERP 9 & GST">Tally ERP 9 & Financial Accounting</option>
                </optgroup>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Mobile Number <span class="req">*</span></label>
              <input type="tel" v-model="form.mobile" pattern="[0-9]{10}" required class="form-control" placeholder="10-digit mobile">
            </div>

            <div class="form-group">
              <label class="form-label">Email Address <span class="req">*</span></label>
              <input type="email" v-model="form.email" required class="form-control" placeholder="name@example.com">
            </div>

            <div class="form-group full-width">
              <label class="form-label">Permanent Address <span class="req">*</span></label>
              <textarea v-model="form.address" rows="3" required class="form-control" placeholder="Full residential street address"></textarea>
            </div>
          </div>

          <div style="margin-top: 1.75rem;">
            <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">
              <span>Submit Registration</span> 🚀
            </button>
          </div>
        </form>
      </div>

      <!-- Live Receipt Preview Card -->
      <div class="receipt-preview-card">
        <!-- Receipt Top Ribbon -->
        <div class="receipt-header">
          <div class="receipt-brand-logo-wrap">
            <img :src="content.brand.logoImage" alt="IT HUNT Logo" class="receipt-logo-img" @error="onImgError">
            <div>
              <div class="receipt-stamp">
                <span class="stamp-dot"></span>
                <span>🏛️ OFFICIAL ADMISSION PREVIEW</span>
              </div>
              <h4 class="receipt-title">IT HUNT ACADEMY 2026</h4>
              <div class="receipt-subtitle">📍 Near Bank of Baroda, Dahiyawa Road, Holagarh, Prayagraj, UP</div>
            </div>
          </div>
          <div class="receipt-badges-row">
            <span class="receipt-reg-badge">📜 OFFICIAL CANDIDATE COPY</span>
            <span class="receipt-reg-badge" style="color: #34d399; border-color: rgba(52, 211, 153, 0.4); background: rgba(52, 211, 153, 0.1);">✓ ISO 9001:2015 ACCREDITED</span>
          </div>
        </div>

        <!-- Receipt Content Rows -->
        <div class="receipt-body">
          <div class="receipt-row">
            <span class="receipt-label">Candidate Name:</span>
            <span class="receipt-val">{{ form.candidateName || '— (Typing...)' }}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Father's Name:</span>
            <span class="receipt-val">{{ form.fatherName || '—' }}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Program Selected:</span>
            <span class="receipt-val receipt-course-pill">{{ form.course }}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Gender / DOB:</span>
            <span class="receipt-val">{{ form.gender }} | {{ form.dob || '—' }}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Contact Mobile:</span>
            <span class="receipt-val receipt-phone-val">{{ form.mobile || '—' }}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">District & State:</span>
            <span class="receipt-val">{{ form.district }}, UP</span>
          </div>
        </div>

        <!-- Receipt Footer / Security Stamp -->
        <div class="receipt-footer">
          <div class="receipt-security-note">
            <span class="security-icon">🛡️</span>
            <span>Auto-generates official verified admission registration ID upon submission</span>
          </div>
          <div class="receipt-signature-line">
            <div class="sig-title">Authorized Signatory:</div>
            <div class="sig-name">Director Mr. Lakshman Singh Chauhan</div>
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
            <span>{{ isGeneratingPdf ? '⏳ Generating PDF...' : '📄 Download Verified Admission Slip (PDF)' }}</span>
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
