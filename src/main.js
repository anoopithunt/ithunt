import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/theme-colors.css';
import './assets/css/styles.css';
import { initImageProtection, protectedImageDirective } from './utils/imageProtection.js';

// Initialize global client-side image protection
initImageProtection();

const app = createApp(App);
app.directive('protected-image', protectedImageDirective);
app.mount('#app');

