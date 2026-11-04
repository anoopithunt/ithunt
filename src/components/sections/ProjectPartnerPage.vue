<template>
  <div class="partner-page">
    <div class="partner-container">
      <nav class="partner-breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Product development</span>
      </nav>

      <header class="partner-hero">
        <p class="partner-eyebrow">YOUR SOFTWARE PRODUCT DEVELOPMENT PARTNER</p>
        <h1>From product idea to a dependable software business.</h1>
        <p>Work with one team to clarify the product, build the first release, and keep improving it. We bring deep engineering knowledge, practical discovery, and delivery focused on your users and business goals.</p>
        <div class="partner-hero-actions">
          <a class="partner-button primary" href="#project-enquiry">Plan a project</a>
          <a class="partner-button secondary" href="#partner-services">Explore capabilities</a>
        </div>
        <div class="partner-principles">
          <span>Senior-led collaboration</span>
          <span>Clear scope and milestones</span>
          <span>Knowledge transfer and maintainability</span>
        </div>
      </header>

      <section id="partner-services" class="partner-section">
        <header class="partner-section-heading">
          <p class="partner-eyebrow">FOCUSED CAPABILITIES</p>
          <h2>Four ways to move your product forward</h2>
          <p>Choose the area closest to your current need. We can combine capabilities when the project calls for it.</p>
        </header>
        <div class="partner-service-grid">
          <article v-for="service in PRODUCT_SERVICES" :key="service.name" class="partner-service-card">
            <h3>{{ service.name }}</h3>
            <p>{{ service.description }}</p>
            <a :href="service.href">Explore this service <span aria-hidden="true">→</span></a>
          </article>
        </div>
      </section>

      <section class="partner-section partner-packages">
        <header class="partner-section-heading">
          <p class="partner-eyebrow">ENGAGEMENT OPTIONS</p>
          <h2>Start with the model that fits your stage</h2>
          <p>Each engagement is scoped to your goals. We’ll confirm deliverables, timeline, and a fixed-price proposal after discovery.</p>
        </header>
        <div class="partner-package-grid">
          <article v-for="offer in PROJECT_PACKAGES" :key="offer.id" class="partner-package-card">
            <div class="partner-package-name">{{ offer.name }}</div>
            <p>{{ offer.suitableFor }}</p>
            <ul>
              <li v-for="item in offer.includes" :key="item">{{ item }}</li>
            </ul>
            <button type="button" class="partner-text-button" @click="selectPackage(offer.id)">
              Discuss this option <span aria-hidden="true">→</span>
            </button>
          </article>
        </div>
        <p class="pricing-disclosure">
          <strong>Pricing:</strong> fixed package prices are not published yet because approved price points were not provided. We won’t invent a number. Request a fixed-price proposal and we’ll first confirm the scope and assumptions with you.
        </p>
      </section>

      <section class="partner-section estimator-section" aria-labelledby="estimator-heading">
        <header class="partner-section-heading">
          <p class="partner-eyebrow">PROJECT ESTIMATOR</p>
          <h2 id="estimator-heading">Get a scope-based estimate</h2>
          <p>Build a quick brief. Until approved package rates are available, this tool estimates the information needed for a fixed quote—not an invented budget.</p>
        </header>
        <div class="estimator-grid">
          <div class="estimator-controls">
            <label>
              Project type
              <select v-model="estimate.projectType">
                <option value="">Choose a project type</option>
                <option v-for="option in projectTypes" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>
            </label>
            <label>
              Product stage
              <select v-model="estimate.stage">
                <option value="">Choose a stage</option>
                <option value="idea">Idea / validation</option>
                <option value="mvp">MVP in progress</option>
                <option value="existing">Existing product</option>
              </select>
            </label>
            <fieldset>
              <legend>What should be included?</legend>
              <label v-for="item in estimateOptions" :key="item.value" class="estimator-check">
                <input v-model="estimate.scope" type="checkbox" :value="item.value">
                <span>{{ item.label }}</span>
              </label>
            </fieldset>
            <label>
              Target start (optional)
              <select v-model="estimate.start">
                <option value="">Not decided</option>
                <option value="soon">As soon as practical</option>
                <option value="month">Within 1–3 months</option>
                <option value="later">Later / exploring</option>
              </select>
            </label>
          </div>
          <aside class="estimate-summary" aria-live="polite">
            <p class="partner-eyebrow">YOUR INITIAL BRIEF</p>
            <h3>{{ estimate.projectType ? projectTypeLabel : 'Select a project type' }}</h3>
            <p v-if="estimate.stage">{{ stageLabel }}</p>
            <ul v-if="estimate.scope.length">
              <li v-for="item in estimate.scope" :key="item">{{ estimateLabel(item) }}</li>
            </ul>
            <div class="estimate-price">
              <span>Fixed-price estimate</span>
              <strong>Prepared after discovery</strong>
            </div>
            <p class="estimate-disclaimer">
              This scope preview is not a quote. We’ll confirm requirements, dependencies, and acceptance criteria before proposing a fixed price.
            </p>
            <button type="button" class="partner-button primary" @click="beginEnquiry">
              Request a fixed-price proposal
            </button>
          </aside>
        </div>
      </section>

      <section id="project-enquiry" class="partner-section enquiry-section" aria-labelledby="enquiry-heading">
        <header class="partner-section-heading">
          <p class="partner-eyebrow">FREE DISCOVERY CONVERSATION</p>
          <h2 id="enquiry-heading">Tell us what you’re trying to build</h2>
          <p>Share a few details. We’ll use them to prepare a focused conversation—no commitment required.</p>
        </header>

        <div v-if="submitted" class="enquiry-success" role="status">
          <span aria-hidden="true">✓</span>
          <h3>Thanks, your project enquiry is in.</h3>
          <p>IT HUNT has received your brief. We’ll follow up using the contact details you provided.</p>
          <button type="button" class="partner-text-button" @click="resetEnquiry">Send another enquiry</button>
        </div>

        <form v-else class="enquiry-form" @submit.prevent="submitEnquiry">
          <div class="enquiry-progress" :aria-label="`Step ${step} of 3`">
            <span :class="{ complete: step >= 1 }">1. Project</span>
            <span :class="{ complete: step >= 2 }">2. Scope</span>
            <span :class="{ complete: step >= 3 }">3. Contact</span>
          </div>

          <fieldset v-if="step === 1">
            <legend>What are you planning?</legend>
            <label>
              Project type <span aria-hidden="true">*</span>
              <select v-model="enquiry.projectType" required>
                <option value="">Select one</option>
                <option v-for="option in projectTypes" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>
            </label>
            <label>
              Where are you in the process?
              <select v-model="enquiry.stage">
                <option value="">Select one</option>
                <option value="idea">Idea / validating the opportunity</option>
                <option value="requirements">Requirements are taking shape</option>
                <option value="existing">Improving an existing product</option>
              </select>
            </label>
            <label>
              What business or user problem should this solve? <span aria-hidden="true">*</span>
              <textarea v-model.trim="enquiry.goal" required rows="4" maxlength="1200" placeholder="A short description is enough to start."></textarea>
            </label>
          </fieldset>

          <fieldset v-else-if="step === 2">
            <legend>What should we consider?</legend>
            <label>
              Preferred engagement
              <select v-model="enquiry.package">
                <option value="">Help me decide</option>
                <option v-for="offer in PROJECT_PACKAGES" :key="offer.id" :value="offer.id">{{ offer.name }}</option>
              </select>
            </label>
            <label>
              Expected scope or important features
              <textarea v-model.trim="enquiry.scope" rows="4" maxlength="1200" placeholder="Platforms, integrations, user roles, or must-have workflows."></textarea>
            </label>
            <label>
              Budget expectations (optional; helps us shape a suitable scope)
              <input v-model.trim="enquiry.budget" type="text" maxlength="120" placeholder="For example, a range in your preferred currency">
            </label>
            <label>
              Target start date
              <select v-model="enquiry.start">
                <option value="">Not decided</option>
                <option value="soon">As soon as practical</option>
                <option value="month">Within 1–3 months</option>
                <option value="later">Later / exploring</option>
              </select>
            </label>
          </fieldset>

          <fieldset v-else>
            <legend>Where should we follow up?</legend>
            <label>
              Your name <span aria-hidden="true">*</span>
              <input v-model.trim="enquiry.name" required type="text" maxlength="120" autocomplete="name">
            </label>
            <label>
              Work email <span aria-hidden="true">*</span>
              <input v-model.trim="enquiry.email" required type="email" maxlength="254" autocomplete="email">
            </label>
            <label>
              Phone or WhatsApp (optional)
              <input v-model.trim="enquiry.phone" type="tel" maxlength="30" autocomplete="tel">
            </label>
            <label class="enquiry-consent">
              <input v-model="enquiry.consent" type="checkbox" required>
              <span>I agree that IT HUNT may contact me about this project enquiry. Please don’t include sensitive information in this form.</span>
            </label>
          </fieldset>

          <p v-if="errorMessage" class="enquiry-error" role="alert">{{ errorMessage }}</p>
          <div class="enquiry-actions">
            <button v-if="step > 1" type="button" class="partner-button secondary" :disabled="isSubmitting" @click="step -= 1">Back</button>
            <span v-else></span>
            <button v-if="step < 3" type="button" class="partner-button primary" @click="nextStep">Continue</button>
            <button v-else type="submit" class="partner-button primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending…' : 'Send project enquiry' }}
            </button>
          </div>
          <p class="enquiry-privacy-note">Your project details are used to respond to this enquiry. Please don’t include passwords, payment information, or other sensitive data.</p>
        </form>
      </section>

      <section class="partner-section partner-credibility">
        <h2>A good partnership should leave your team stronger</h2>
        <p>We agree on the problem, keep scope and trade-offs visible, and document the work so your team can own the product after delivery. Client results and named case studies are published only when evidence and client permission are available.</p>
        <a href="/#page-trust">Meet the team and review company information <span aria-hidden="true">→</span></a>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { API } from '../../utils/apiClient.js';
import { sanitizeInput, isValidEmail } from '../../utils/security.js';
import { PRODUCT_SERVICES, PROJECT_PACKAGES } from '../../data/projectOffers.js';

const projectTypes = [
  { value: 'web', label: 'Web product or business software' },
  { value: 'mobile', label: 'Mobile app (iOS / Android)' },
  { value: 'saas', label: 'Startup MVP or SaaS product' },
  { value: 'ai', label: 'AI automation or integration' },
  { value: 'maintenance', label: 'Maintenance or dedicated team' }
];

const estimateOptions = [
  { value: 'discovery', label: 'Discovery and product definition' },
  { value: 'design', label: 'UX and interface design' },
  { value: 'frontend', label: 'Web or mobile application' },
  { value: 'backend', label: 'Backend, accounts, and data' },
  { value: 'integrations', label: 'Third-party integrations' },
  { value: 'operations', label: 'Testing, deployment, and support' }
];

const step = ref(1);
const isSubmitting = ref(false);
const submitted = ref(false);
const errorMessage = ref('');
const estimate = reactive({ projectType: '', stage: '', scope: [], start: '' });
const enquiry = reactive({
  projectType: '',
  stage: '',
  goal: '',
  package: '',
  scope: '',
  budget: '',
  start: '',
  name: '',
  email: '',
  phone: '',
  consent: false
});

const projectTypeLabel = computed(() => projectTypes.find((type) => type.value === estimate.projectType)?.label || '');
const stageLabel = computed(() => ({
  idea: 'Stage: idea and validation',
  mvp: 'Stage: MVP in progress',
  existing: 'Stage: existing product'
}[estimate.stage] || ''));

const estimateLabel = (value) => estimateOptions.find((option) => option.value === value)?.label || value;

const selectPackage = (packageId) => {
  enquiry.package = packageId;
  document.getElementById('project-enquiry')?.scrollIntoView({ behavior: 'smooth' });
};

const beginEnquiry = () => {
  if (estimate.projectType) enquiry.projectType = estimate.projectType;
  if (estimate.stage === 'idea') enquiry.stage = 'idea';
  else if (estimate.stage === 'mvp') enquiry.stage = 'requirements';
  else if (estimate.stage === 'existing') enquiry.stage = 'existing';
  enquiry.scope = estimate.scope.map(estimateLabel).join(', ');
  enquiry.start = estimate.start;
  document.getElementById('project-enquiry')?.scrollIntoView({ behavior: 'smooth' });
};

const nextStep = () => {
  errorMessage.value = '';
  if (step.value === 1 && (!enquiry.projectType || !enquiry.goal.trim())) {
    errorMessage.value = 'Choose a project type and describe the problem you want to solve.';
    return;
  }
  step.value = Math.min(step.value + 1, 3);
};

const formatStart = (value) => ({
  soon: 'As soon as practical',
  month: 'Within 1–3 months',
  later: 'Later / exploring'
}[value] || 'Not decided');

const submitEnquiry = async () => {
  errorMessage.value = '';
  const name = sanitizeInput(enquiry.name);
  const email = sanitizeInput(enquiry.email);
  const phone = sanitizeInput(enquiry.phone);
  const goal = sanitizeInput(enquiry.goal);
  const scope = sanitizeInput(enquiry.scope);
  const budget = sanitizeInput(enquiry.budget);

  if (!name || !isValidEmail(email) || !enquiry.consent) {
    errorMessage.value = 'Enter your name and a valid email address, and confirm the contact consent.';
    return;
  }

  const packageName = PROJECT_PACKAGES.find((offer) => offer.id === enquiry.package)?.name || 'Help me decide';
  const projectName = projectTypes.find((type) => type.value === enquiry.projectType)?.label || enquiry.projectType;
  const message = [
    `Project type: ${projectName}`,
    `Project stage: ${enquiry.stage || 'Not specified'}`,
    `Preferred engagement: ${packageName}`,
    `Business goal: ${goal}`,
    `Scope: ${scope || 'To be discussed'}`,
    `Budget expectations: ${budget || 'Not provided'}`,
    `Target start: ${formatStart(enquiry.start)}`,
    `Source: Product development enquiry wizard`
  ].join('\n');

  isSubmitting.value = true;
  try {
    await API.submitContactInquiry({
      name,
      email,
      phone,
      subject: `Product enquiry: ${projectName}`,
      message,
      source: 'product-development-wizard',
      consentToContact: true
    });
    submitted.value = true;
  } catch (error) {
    console.error('Unable to submit project enquiry:', error);
    errorMessage.value = 'We could not send your enquiry right now. Please try again or contact IT HUNT by phone or email.';
  } finally {
    isSubmitting.value = false;
  }
};

const resetEnquiry = () => {
  submitted.value = false;
  step.value = 1;
  errorMessage.value = '';
};
</script>

<style scoped>
.partner-page {
  min-height: 70vh;
  padding: clamp(2rem, 5vw, 4.5rem) 1rem 5rem;
  color: var(--text-main, #f8fafc);
}

.partner-container {
  width: min(100%, 1120px);
  margin: 0 auto;
}

.partner-breadcrumbs {
  display: flex;
  gap: 0.55rem;
  align-items: center;
  margin-bottom: 2rem;
  color: var(--text-muted, #94a3b8);
  font-size: 0.84rem;
}

.partner-breadcrumbs a,
.partner-service-card a,
.partner-credibility a {
  color: #a5b4fc;
}

.partner-hero {
  padding: clamp(1.5rem, 5vw, 4.5rem) 0;
}

.partner-eyebrow {
  margin: 0 0 0.7rem;
  color: #a5b4fc;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.partner-hero h1 {
  max-width: 880px;
  margin: 0;
  font-size: clamp(2.4rem, 6vw, 4.8rem);
  line-height: 1.06;
  letter-spacing: -0.05em;
}

.partner-hero > p:not(.partner-eyebrow) {
  max-width: 780px;
  margin: 1.2rem 0 0;
  color: var(--text-muted, #cbd5e1);
  font-size: 1.1rem;
  line-height: 1.75;
}

.partner-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.partner-button {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.7rem;
  font: inherit;
  font-weight: 750;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

.partner-button:disabled {
  cursor: wait;
  opacity: 0.65;
}

.partner-button.primary {
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  color: #fff;
}

.partner-button.secondary {
  border-color: var(--border-cyber, rgba(255, 255, 255, 0.18));
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-main, #fff);
}

.partner-principles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.2rem;
  margin-top: 1.5rem;
  color: var(--text-muted, #94a3b8);
  font-size: 0.84rem;
}

.partner-principles span::before {
  content: "✓";
  margin-right: 0.4rem;
  color: #34d399;
}

.partner-section {
  padding: clamp(2.5rem, 6vw, 4rem) 0;
  border-top: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.1));
}

.partner-section-heading {
  max-width: 760px;
  margin-bottom: 1.5rem;
}

.partner-section-heading h2,
.partner-credibility h2 {
  margin: 0;
  font-size: clamp(1.7rem, 3.4vw, 2.5rem);
  line-height: 1.18;
  letter-spacing: -0.035em;
}

.partner-section-heading > p:last-child,
.partner-credibility > p {
  margin: 0.75rem 0 0;
  color: var(--text-muted, #94a3b8);
  line-height: 1.7;
}

.partner-service-grid,
.partner-package-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.partner-service-card,
.partner-package-card {
  min-width: 0;
  padding: clamp(1.1rem, 3vw, 1.5rem);
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.11));
  border-radius: 1rem;
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.72));
}

.partner-service-card h3,
.partner-package-name {
  margin: 0;
  color: var(--text-main, #fff);
  font-size: 1.15rem;
  font-weight: 800;
}

.partner-service-card p,
.partner-package-card > p {
  margin: 0.6rem 0 1rem;
  color: var(--text-muted, #94a3b8);
  font-size: 0.9rem;
  line-height: 1.65;
}

.partner-service-card a,
.partner-text-button {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  font-size: 0.86rem;
  font-weight: 750;
  text-decoration: none;
  cursor: pointer;
}

.partner-package-card ul {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.partner-package-card li {
  color: var(--text-muted, #cbd5e1);
  font-size: 0.86rem;
  line-height: 1.5;
}

.partner-package-card li::before {
  content: "✓";
  margin-right: 0.5rem;
  color: #34d399;
}

.partner-text-button {
  margin-top: 1rem;
  color: #a5b4fc;
}

.pricing-disclosure {
  margin: 1rem 0 0;
  padding: 0.85rem 1rem;
  border: 1px dashed var(--border-cyber, rgba(255, 255, 255, 0.18));
  border-radius: 0.7rem;
  color: var(--text-muted, #94a3b8);
  font-size: 0.83rem;
  line-height: 1.6;
}

.pricing-disclosure strong {
  color: var(--text-main, #fff);
}

.estimator-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 1.3rem;
  align-items: start;
}

.estimator-controls,
.enquiry-form {
  display: grid;
  gap: 1rem;
}

.estimator-controls > label,
.enquiry-form fieldset > label {
  display: grid;
  gap: 0.45rem;
  color: var(--text-main, #f8fafc);
  font-size: 0.86rem;
  font-weight: 700;
}

.estimator-controls select,
.enquiry-form input:not([type="checkbox"]),
.enquiry-form select,
.enquiry-form textarea {
  width: 100%;
  min-height: 44px;
  padding: 0.7rem 0.8rem;
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.15));
  border-radius: 0.65rem;
  background: rgba(15, 23, 42, 0.78);
  color: var(--text-main, #f8fafc);
  font: inherit;
  font-size: 0.9rem;
}

.estimator-controls fieldset,
.enquiry-form fieldset {
  display: grid;
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  border: 0;
}

.estimator-controls legend,
.enquiry-form legend {
  margin-bottom: 0.6rem;
  color: var(--text-main, #f8fafc);
  font-size: 1rem;
  font-weight: 800;
}

.estimator-check {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  color: var(--text-muted, #cbd5e1);
  font-size: 0.86rem;
}

.estimator-check input,
.enquiry-consent input {
  accent-color: #818cf8;
}

.estimate-summary {
  padding: 1.25rem;
  border: 1px solid rgba(129, 140, 248, 0.28);
  border-radius: 1rem;
  background: rgba(99, 102, 241, 0.08);
}

.estimate-summary h3 {
  margin: 0;
  font-size: 1.15rem;
}

.estimate-summary > p:not(.partner-eyebrow) {
  color: var(--text-muted, #cbd5e1);
  font-size: 0.87rem;
  line-height: 1.6;
}

.estimate-summary ul {
  display: grid;
  gap: 0.45rem;
  padding-left: 1.1rem;
  color: var(--text-muted, #cbd5e1);
  font-size: 0.83rem;
}

.estimate-price {
  display: grid;
  gap: 0.3rem;
  margin-top: 1.15rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.14));
}

.estimate-price span {
  color: var(--text-muted, #94a3b8);
  font-size: 0.77rem;
}

.estimate-price strong {
  color: var(--text-main, #fff);
  font-size: 1rem;
}

.estimate-disclaimer {
  font-size: 0.78rem !important;
}

.estimate-summary .partner-button {
  width: 100%;
  margin-top: 0.5rem;
}

.enquiry-section {
  scroll-margin-top: 90px;
}

.enquiry-form,
.enquiry-success {
  max-width: 760px;
  padding: clamp(1rem, 3vw, 1.5rem);
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.11));
  border-radius: 1rem;
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.72));
}

.enquiry-progress {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.enquiry-progress span {
  padding: 0.55rem;
  border-bottom: 2px solid var(--border-cyber, rgba(255, 255, 255, 0.14));
  color: var(--text-muted, #94a3b8);
  font-size: 0.78rem;
  text-align: center;
}

.enquiry-progress span.complete {
  border-color: #818cf8;
  color: var(--text-main, #fff);
}

.enquiry-consent {
  display: flex !important;
  grid-template-columns: auto 1fr;
  gap: 0.6rem !important;
  align-items: flex-start;
  color: var(--text-muted, #cbd5e1) !important;
  font-weight: 500 !important;
  line-height: 1.55;
}

.enquiry-consent a {
  color: #a5b4fc;
}

.enquiry-actions {
  display: flex;
  justify-content: space-between;
  gap: 0.7rem;
  padding-top: 0.3rem;
}

.enquiry-error {
  margin: 0;
  color: #fca5a5;
  font-size: 0.87rem;
}

.enquiry-privacy-note {
  margin: 0;
  color: var(--text-muted, #94a3b8);
  font-size: 0.76rem;
  line-height: 1.55;
}

.enquiry-success > span {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border-radius: 50%;
  background: rgba(52, 211, 153, 0.15);
  color: #34d399;
  font-weight: 900;
}

.enquiry-success h3 {
  margin-bottom: 0.4rem;
}

.enquiry-success p,
.partner-credibility > p {
  color: var(--text-muted, #94a3b8);
  line-height: 1.7;
}

.partner-credibility a {
  display: inline-flex;
  gap: 0.4rem;
  margin-top: 0.6rem;
  font-weight: 750;
  text-decoration: none;
}

:global(body.light-theme) .partner-hero h1,
:global(body.light-theme) .partner-section-heading h2,
:global(body.light-theme) .partner-credibility h2,
:global(body.light-theme) .partner-service-card h3,
:global(body.light-theme) .partner-package-name,
:global(body.light-theme) .estimator-controls > label,
:global(body.light-theme) .enquiry-form fieldset > label,
:global(body.light-theme) .estimator-controls legend,
:global(body.light-theme) .enquiry-form legend,
:global(body.light-theme) .estimate-summary h3,
:global(body.light-theme) .estimate-price strong {
  color: #111827;
}

:global(body.light-theme) .partner-hero > p:not(.partner-eyebrow),
:global(body.light-theme) .partner-section-heading > p:last-child,
:global(body.light-theme) .partner-service-card p,
:global(body.light-theme) .partner-package-card > p,
:global(body.light-theme) .partner-package-card li,
:global(body.light-theme) .pricing-disclosure,
:global(body.light-theme) .estimator-check,
:global(body.light-theme) .estimate-summary > p:not(.partner-eyebrow),
:global(body.light-theme) .estimate-summary ul,
:global(body.light-theme) .enquiry-consent,
:global(body.light-theme) .enquiry-privacy-note,
:global(body.light-theme) .partner-credibility > p {
  color: #4b5563 !important;
}

@media (max-width: 720px) {
  .partner-service-grid,
  .partner-package-grid,
  .estimator-grid {
    grid-template-columns: 1fr;
  }
}
</style>
