<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="$emit('close')">
    <div class="modal-card" style="max-width: 550px; text-align: left;">
      <button class="modal-close-icon" @click="$emit('close')" title="Close Modal (Esc)">✕</button>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; margin-bottom: 0.3rem;">Apply for {{ job.title }}</h3>
      <div style="color: var(--color-ai-gold); font-weight: 700; font-size: 0.8rem; margin-bottom: 1.25rem; font-family: var(--font-mono);">⚠️ Requirement: Minimum 4+ Years Experience Required</div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group" style="margin-bottom: 0.85rem;">
          <label class="form-label">Full Name <span class="req">*</span></label>
          <input type="text" v-model="form.name" required class="form-control" placeholder="Your full legal name">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 0.85rem;">
          <div class="form-group">
            <label class="form-label">Total Exp <span class="req">*</span></label>
            <select v-model="form.experience" class="form-control" required>
              <option value="4 Years">4 Years Experience</option>
              <option value="5 Years">5 Years Experience</option>
              <option value="6-8 Years">6 - 8 Years Experience</option>
              <option value="8+ Years">8+ Years Experience</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Mobile <span class="req">*</span></label>
            <input type="tel" v-model="form.phone" pattern="[0-9]{10}" required class="form-control" placeholder="10-digit mobile">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0.85rem;">
          <label class="form-label">Email Address <span class="req">*</span></label>
          <input type="email" v-model="form.email" required class="form-control" placeholder="name@example.com">
        </div>

        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label">Portfolio / LinkedIn Link <span class="req">*</span></label>
          <input type="url" v-model="form.link" required class="form-control" placeholder="https://linkedin.com/in/username">
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel</button>
          <button type="submit" class="btn-primary">Submit Job Application 💼</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  job: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close', 'submit-job']);

const form = ref({
  name: '',
  experience: '4 Years',
  phone: '',
  email: '',
  link: ''
});

const handleSubmit = () => {
  emit('submit-job', {
    ...form.value,
    jobTitle: props.job.title
  });
  form.value = {
    name: '',
    experience: '4 Years',
    phone: '',
    email: '',
    link: ''
  };
};
</script>
