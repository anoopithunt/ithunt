<template>
  <span class="service-icon" :class="`service-icon--${serviceKey}`" :title="label" :aria-label="label" role="img">
    <svg v-if="serviceKey === 'whatsapp'" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.3-6.1-3.5-8.3Zm-8.4 18.1h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.3-.7.1-1.9-1-3.1-1.8-4.3-4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.3 3.6 5.7 5 .8.3 1.4.5 1.9.6.8.2 1.5.2 2.1.1.6-.1 1.7-.7 2-1.3.2-.7.2-1.2.1-1.4Z"/></svg>
    <span v-else aria-hidden="true">{{ fallback }}</span>
  </span>
</template>

<script setup>
defineProps({
  serviceKey: { type: String, default: 'generic' },
  label: { type: String, default: 'Service' },
  fallback: { type: String, default: '•' }
});
</script>

<style scoped>
.service-icon { display: inline-flex; align-items: center; justify-content: center; width: 1.25em; height: 1.25em; vertical-align: -.2em; }
.service-icon svg { width: 100%; height: 100%; fill: currentColor; }
.service-icon--whatsapp { color: #25d366; }
</style>
