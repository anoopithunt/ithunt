<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="$emit('close')">
    <div class="modal-card" style="max-width: 540px; text-align: left;">
      <button class="modal-close-icon" @click="$emit('close')" title="Close Modal (Esc)">✕</button>
      <div class="duration-pill" style="margin-bottom: 0.5rem;">FREE EVENT PASS 2026</div>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; margin-bottom: 0.3rem;">
        Register for {{ event.title }}
      </h3>
      <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">
        📍 {{ event.venue }} • 📅 {{ event.date }}
      </p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group" style="margin-bottom: 0.85rem;">
          <label class="form-label">Full Name <span class="req">*</span></label>
          <input type="text" v-model="form.name" required class="form-control" placeholder="Candidate full name">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 0.85rem;">
          <div class="form-group">
            <label class="form-label">Mobile Number <span class="req">*</span></label>
            <input type="tel" v-model="form.phone" pattern="[0-9]{10}" required class="form-control" placeholder="10-digit mobile">
          </div>
          <div class="form-group">
            <label class="form-label">Email Address <span class="req">*</span></label>
            <input type="email" v-model="form.email" required class="form-control" placeholder="name@example.com">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0.85rem;">
          <label class="form-label">College / Organization <span class="req">*</span></label>
          <input type="text" v-model="form.college" required class="form-control" placeholder="e.g. Allahabad University / Shambhunath / BBS / UIET">
        </div>

        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label">Primary Interest / Domain <span class="req">*</span></label>
          <select v-model="form.interest" class="form-control" required>
            <option value="Full-Stack Web (MERN Stack)">Full-Stack Web (MERN Stack)</option>
            <option value="Generative AI & Python">Generative AI & Python</option>
            <option value="Mobile App (iOS / Android)">Mobile App (iOS / Android)</option>
            <option value="Cybersecurity & Ethical Hacking">Cybersecurity & Ethical Hacking</option>
            <option value="Other / General Tech Innovation">Other / General Tech Innovation</option>
          </select>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel</button>
          <button type="submit" class="btn-primary">Confirm Free Registration 🎟️</button>
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
  event: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close', 'submit-rsvp']);

const form = ref({
  name: '',
  phone: '',
  email: '',
  college: '',
  interest: 'Full-Stack Web (MERN Stack)'
});

const handleSubmit = () => {
  emit('submit-rsvp', {
    ...form.value,
    eventTitle: props.event.title
  });
  form.value = {
    name: '',
    phone: '',
    email: '',
    college: '',
    interest: 'Full-Stack Web (MERN Stack)'
  };
};
</script>
