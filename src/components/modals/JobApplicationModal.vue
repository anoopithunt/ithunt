<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="$emit('close')">
    <div class="modal-card" style="max-width: 550px; text-align: left;">
      <button class="modal-close-icon" @click="$emit('close')" title="Close Modal (Esc)">✕</button>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; margin-bottom: 0.3rem;">
        {{ content?.modalTexts?.jobApplication?.headingPrefix || 'Apply for' }} {{ job.title }}
      </h3>
      <div style="color: var(--color-ai-gold); font-weight: 700; font-size: 0.8rem; margin-bottom: 1.25rem; font-family: var(--font-mono);">
        {{ content?.modalTexts?.jobApplication?.expWarning || '⚠️ Requirement: Minimum 4+ Years Experience Required' }}
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group" style="margin-bottom: 0.85rem;">
          <label class="form-label">{{ content?.modalTexts?.jobApplication?.nameLabel || 'Full Name' }} <span class="req">*</span></label>
          <input type="text" v-model="form.name" required class="form-control" :placeholder="content?.modalTexts?.jobApplication?.namePlaceholder || 'Your full legal name'">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 0.85rem;">
          <div class="form-group">
            <label class="form-label">{{ content?.modalTexts?.jobApplication?.expLabel || 'Total Exp' }} <span class="req">*</span></label>
            <select v-model="form.experience" class="form-control" required>
              <option 
                v-for="opt in (content?.modalTexts?.jobApplication?.expOptions || [{ value: '4 Years', label: '4 Years Experience' }, { value: '5 Years', label: '5 Years Experience' }, { value: '6-8 Years', label: '6 - 8 Years Experience' }, { value: '8+ Years', label: '8+ Years Experience' }])"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">{{ content?.modalTexts?.jobApplication?.phoneLabel || 'Mobile' }} <span class="req">*</span></label>
            <input type="tel" v-model="form.phone" pattern="[0-9]{10}" required class="form-control" :placeholder="content?.modalTexts?.jobApplication?.phonePlaceholder || '10-digit mobile'">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0.85rem;">
          <label class="form-label">{{ content?.modalTexts?.jobApplication?.emailLabel || 'Email Address' }} <span class="req">*</span></label>
          <input type="email" v-model="form.email" required class="form-control" :placeholder="content?.modalTexts?.jobApplication?.emailPlaceholder || 'name@example.com'">
        </div>

        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label">{{ content?.modalTexts?.jobApplication?.portfolioLabel || 'Portfolio / LinkedIn Link' }} <span class="req">*</span></label>
          <input type="url" v-model="form.link" required class="form-control" :placeholder="content?.modalTexts?.jobApplication?.portfolioPlaceholder || 'https://linkedin.com/in/username'">
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
          <button type="button" class="btn-secondary" @click="$emit('close')">{{ content?.modalTexts?.jobApplication?.cancelBtn || 'Cancel' }}</button>
          <button type="submit" class="btn-primary">{{ content?.modalTexts?.jobApplication?.submitBtn || 'Submit Job Application 💼' }}</button>
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
  },
  content: {
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
