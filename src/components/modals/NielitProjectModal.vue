<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card nielit-modal-card">
      <button class="modal-close-btn" @click="$emit('close')">✕</button>

      <div class="modal-header">
        <span class="modal-badge-pill">📜 OFFICIAL NIELIT PORTAL</span>
        <h3 class="modal-title">NIELIT Project Form Submission</h3>
        <p class="modal-subtitle">Fill in your candidate, project guide, and fee details to generate your official 4-Page NIELIT Project Submission Document (Annexure II, III, Certificate & Fee Details).</p>
      </div>

      <form @submit.prevent="handleSubmit" class="nielit-form">
        <!-- SECTION 1: CANDIDATE PARTICULARS -->
        <div class="form-section-group">
          <h4 class="form-section-heading">1. Candidate Particulars</h4>
          <div class="form-grid-2">
            <div class="form-field">
              <label class="form-label">Candidate Name <span class="req">*</span></label>
              <input type="text" v-model="form.candidateName" required class="form-control" placeholder="e.g. Praveen Kumar Soni" />
            </div>

            <div class="form-field">
              <label class="form-label">NIELIT Registration No <span class="req">*</span></label>
              <input type="text" v-model="form.nielitRegNo" required class="form-control" placeholder="e.g. 1536056" />
            </div>

            <div class="form-field">
              <label class="form-label">NIELIT Examination Level <span class="req">*</span></label>
              <select v-model="form.nielitLevel" required class="form-control">
                <option value="O">O Level</option>
                <option value="A">A Level</option>
                <option value="B">B Level</option>
                <option value="C">C Level</option>
              </select>
            </div>

            <div class="form-field">
              <label class="form-label">Father's Name <span class="req">*</span></label>
              <input type="text" v-model="form.fatherName" required class="form-control" placeholder="e.g. Kedar Mal Soni" />
            </div>

            <div class="form-field">
              <label class="form-label">Email Address <span class="req">*</span></label>
              <input type="email" v-model="form.email" required class="form-control" placeholder="praveensoni11@gmail.com" />
            </div>

            <div class="form-field">
              <label class="form-label">Mobile Number <span class="req">*</span></label>
              <input type="tel" v-model="form.mobile" required class="form-control" placeholder="7740854811" />
            </div>
          </div>

          <div class="form-field" style="margin-top: 0.75rem;">
            <label class="form-label">Residential Address <span class="req">*</span></label>
            <input type="text" v-model="form.address" required class="form-control" placeholder="Buhana Jhunjhunu" />
          </div>

          <div class="form-grid-3" style="margin-top: 0.75rem;">
            <div class="form-field">
              <label class="form-label">District <span class="req">*</span></label>
              <input type="text" v-model="form.district" required class="form-control" placeholder="Jhunjhunu" />
            </div>

            <div class="form-field">
              <label class="form-label">State <span class="req">*</span></label>
              <input type="text" v-model="form.state" required class="form-control" placeholder="Rajasthan" />
            </div>

            <div class="form-field">
              <label class="form-label">Pin Code <span class="req">*</span></label>
              <input type="text" v-model="form.pin" required class="form-control" placeholder="333502" />
            </div>
          </div>
        </div>

        <!-- SECTION 2: PROJECT & GUIDE DETAILS -->
        <div class="form-section-group" style="margin-top: 1.25rem;">
          <h4 class="form-section-heading">2. Project & Guide Details</h4>
          <div class="form-field">
            <label class="form-label">Project / Dissertation Title <span class="req">*</span></label>
            <input type="text" v-model="form.projectTitle" required class="form-control" placeholder="e.g. Network Monitoring and Management" />
          </div>

          <div class="form-grid-2" style="margin-top: 0.75rem;">
            <div class="form-field">
              <label class="form-label">Guide / Supervisor Name <span class="req">*</span></label>
              <input type="text" v-model="form.guideName" required class="form-control" placeholder="Sushil Kumar" />
            </div>

            <div class="form-field">
              <label class="form-label">Guide Qualification <span class="req">*</span></label>
              <input type="text" v-model="form.guideQualification" required class="form-control" placeholder="MCA" />
            </div>

            <div class="form-field">
              <label class="form-label">Guide Designation <span class="req">*</span></label>
              <input type="text" v-model="form.guideDesignation" required class="form-control" placeholder="Sr. Laravel Developer" />
            </div>

            <div class="form-field">
              <label class="form-label">Submission Date <span class="req">*</span></label>
              <input type="text" v-model="form.projectDate" required class="form-control" placeholder="18/07/2026" />
            </div>
          </div>
        </div>

        <!-- SECTION 3: FEE & PAYMENT DETAILS -->
        <div class="form-section-group" style="margin-top: 1.25rem;">
          <h4 class="form-section-heading">3. Fee & Payment Details</h4>
          <div class="form-grid-3">
            <div class="form-field">
              <label class="form-label">Fee Amount (₹) <span class="req">*</span></label>
              <input type="text" v-model="form.amount" required class="form-control" placeholder="1000" />
            </div>

            <div class="form-field">
              <label class="form-label">Payment Date <span class="req">*</span></label>
              <input type="text" v-model="form.paymentDate" required class="form-control" placeholder="25-Mar-2026" />
            </div>

            <div class="form-field">
              <label class="form-label">UTR / Transaction No <span class="req">*</span></label>
              <input type="text" v-model="form.utrNumber" required class="form-control" placeholder="CHD550W1FMSF1B" />
            </div>
          </div>

          <div class="form-grid-2" style="margin-top: 0.75rem;">
            <div class="form-field">
              <label class="form-label">Account Holder / Sender Name <span class="req">*</span></label>
              <input type="text" v-model="form.accountHolderName" required class="form-control" placeholder="Praveen Kumar Soni" />
            </div>

            <div class="form-field">
              <label class="form-label">Remark <span class="req">*</span></label>
              <input type="text" v-model="form.paymentRemark" required class="form-control" placeholder="Paid" />
            </div>
          </div>
        </div>

        <div class="modal-actions" style="margin-top: 1.5rem;">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel</button>
          <button type="submit" class="btn-primary">
            <span>Submit & Generate 4-Page PDF 🚀</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close', 'submit-nielit-project']);

const form = ref({
  candidateName: props.initialData.candidateName || 'Praveen Kumar Soni',
  nielitRegNo: props.initialData.nielitRegNo || '1536056',
  nielitLevel: props.initialData.nielitLevel || 'A',
  fatherName: props.initialData.fatherName || 'Kedar Mal Soni',
  email: props.initialData.email || 'praveensoni11@gmail.com',
  mobile: props.initialData.mobile || '7740854811',
  address: props.initialData.address || 'Buhana Jhunjhunu',
  district: props.initialData.district || 'Jhunjhunu',
  state: props.initialData.state || 'Rajasthan',
  pin: props.initialData.pin || '333502',

  projectTitle: props.initialData.projectTitle || 'Network Monitoring and Management',
  guideName: props.initialData.guideName || 'Sushil Kumar',
  guideQualification: props.initialData.guideQualification || 'MCA',
  guideDesignation: props.initialData.guideDesignation || 'Sr. Laravel Developer',
  guidePlace: props.initialData.guidePlace || 'Prayagraj',
  guideAddress: props.initialData.guideAddress || 'Prayagraj Uttar Pradesh',
  projectDate: props.initialData.projectDate || new Date().toLocaleDateString('en-GB'),

  amount: props.initialData.amount || '1000',
  paymentDate: props.initialData.paymentDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  utrNumber: props.initialData.utrNumber || 'CHD550W1FMSF1B',
  accountHolderName: props.initialData.accountHolderName || 'Praveen Kumar Soni',
  paymentRemark: props.initialData.paymentRemark || 'Paid'
});

const handleSubmit = () => {
  emit('submit-nielit-project', { ...form.value });
};
</script>

<style scoped>
.nielit-modal-card {
  max-width: 720px;
  max-height: 90vh;
  overflow-y: auto;
}

.form-section-group {
  background: var(--color-surface-offset, rgba(255, 255, 255, 0.03));
  border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
  padding: 1.25rem;
  border-radius: 12px;
}

.form-section-heading {
  color: var(--color-primary, #f97316);
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 0.85rem;
  border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
  padding-bottom: 0.4rem;
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.form-grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.85rem;
}

@media (max-width: 640px) {
  .form-grid-2, .form-grid-3 {
    grid-template-columns: 1fr;
  }
}
</style>
