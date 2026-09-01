import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/theme-colors.css';
import './assets/css/styles.css';
import { initImageProtection, protectedImageDirective } from './utils/imageProtection.js';
import { inject } from '@vercel/analytics';

// Initialize Vercel Web Analytics for live traffic tracking
inject();

// Initialize global client-side image protection
initImageProtection();

const app = createApp(App);
app.directive('protected-image', protectedImageDirective);
app.mount('#app');


