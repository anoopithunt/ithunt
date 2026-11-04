<template>
  <article class="service-page">
    <div class="service-page-container">
      <nav class="service-breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>Services</span>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{{ service.name }}</span>
      </nav>

      <header class="service-hero">
        <p class="service-eyebrow">IT HUNT SOFTWARE SERVICES</p>
        <h1>{{ service.headline }}</h1>
        <p class="service-intro">{{ service.intro }}</p>
        <div class="service-hero-actions">
          <a class="service-button service-button-primary" href="/start-project">
            Book a Free Consultation
          </a>
          <a class="service-button service-button-secondary" href="/#page-projects">View Our Work</a>
        </div>
        <p class="service-audience"><strong>Who we help:</strong> {{ service.audience }}</p>
      </header>

      <section class="service-section service-problem" aria-labelledby="service-problem-heading">
        <div>
          <p class="service-eyebrow">THE CHALLENGE</p>
          <h2 id="service-problem-heading">Start with the problem, not the software</h2>
        </div>
        <p>{{ service.challenge }}</p>
      </section>

      <section class="service-section" aria-labelledby="service-approach-heading">
        <div class="service-section-heading">
          <p class="service-eyebrow">OUR APPROACH</p>
          <h2 id="service-approach-heading">A solution shaped around your goals</h2>
          <p>{{ service.approach }}</p>
        </div>
        <div class="service-deliverables-grid">
          <article v-for="(deliverable, index) in service.deliverables" :key="deliverable" class="service-detail-card">
            <span class="service-card-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ deliverable }}</h3>
          </article>
        </div>
      </section>

      <section class="service-section service-outcomes" aria-labelledby="service-outcomes-heading">
        <div class="service-section-heading">
          <p class="service-eyebrow">BUSINESS VALUE</p>
          <h2 id="service-outcomes-heading">Built for practical outcomes</h2>
          <p>We align delivery to business priorities and define project-specific measures together before work begins.</p>
        </div>
        <ul class="service-outcomes-list">
          <li v-for="outcome in service.outcomes" :key="outcome">
            <span aria-hidden="true">✓</span>{{ outcome }}
          </li>
        </ul>
      </section>

      <section class="service-section" aria-labelledby="service-technologies-heading">
        <div class="service-section-heading">
          <p class="service-eyebrow">TECHNOLOGY</p>
          <h2 id="service-technologies-heading">The right tools for the job</h2>
          <p>We select technologies to fit your product, existing systems, team, and long-term maintenance needs.</p>
        </div>
        <ul class="service-technology-list" aria-label="Technologies used">
          <li v-for="technology in service.technologies" :key="technology">{{ technology }}</li>
        </ul>
      </section>

      <section class="service-section service-faq" aria-labelledby="service-faq-heading">
        <div class="service-section-heading">
          <p class="service-eyebrow">FAQ</p>
          <h2 id="service-faq-heading">Questions about {{ service.name.toLowerCase() }}</h2>
        </div>
        <div class="service-faq-list">
          <details v-for="faq in service.faqs" :key="faq.question">
            <summary>{{ faq.question }}</summary>
            <p>{{ faq.answer }}</p>
          </details>
        </div>
      </section>

      <section class="service-cta" aria-labelledby="service-cta-heading">
        <p class="service-eyebrow">LET'S TALK</p>
        <h2 id="service-cta-heading">Have a project in mind?</h2>
        <p>Tell us what you are trying to achieve. We’ll discuss your requirements and possible next steps in a free consultation.</p>
        <a class="service-button service-button-primary" href="/start-project">
          Book a Free Consultation
        </a>
      </section>

      <nav class="service-related" aria-labelledby="related-services-heading">
        <h2 id="related-services-heading">Explore our other services</h2>
        <div class="service-related-links">
          <a v-for="related in services.filter((item) => item.slug !== service.slug)" :key="related.slug" :href="`/services/${related.slug}`">
            {{ related.name }} <span aria-hidden="true">→</span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</template>

<script setup>
defineProps({
  service: { type: Object, required: true },
  services: { type: Array, required: true }
});
</script>

<style scoped>
.service-page {
  min-height: 70vh;
  padding: clamp(2rem, 5vw, 4.5rem) 1rem 5rem;
  color: var(--text-main, #f8fafc);
}

.service-page-container {
  width: min(100%, 1120px);
  margin: 0 auto;
}

.service-breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
  margin-bottom: clamp(2rem, 5vw, 4.5rem);
  color: var(--text-muted, #94a3b8);
  font-size: 0.86rem;
}

.service-breadcrumbs a,
.service-related a {
  color: var(--color-ai-indigo, #818cf8);
}

.service-breadcrumbs a:hover,
.service-related a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.service-hero {
  max-width: 860px;
  padding: clamp(2rem, 6vw, 5rem) 0;
}

.service-eyebrow {
  margin: 0 0 0.8rem;
  color: #a5b4fc;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.service-hero h1 {
  max-width: 850px;
  margin: 0 0 1.25rem;
  font-size: clamp(2.4rem, 6vw, 4.8rem);
  line-height: 1.04;
  letter-spacing: -0.055em;
}

.service-intro {
  max-width: 760px;
  margin: 0;
  color: var(--text-muted, #cbd5e1);
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  line-height: 1.75;
}

.service-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.8rem;
}

.service-button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  border: 1px solid transparent;
  border-radius: 0.75rem;
  font-weight: 750;
  text-align: center;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.service-button:hover {
  transform: translateY(-2px);
}

.service-button-primary {
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  color: #fff;
}

.service-button-secondary {
  border-color: var(--border-cyber, rgba(255, 255, 255, 0.18));
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-main, #fff);
}

.service-audience {
  max-width: 760px;
  margin: 2rem 0 0;
  color: var(--text-muted, #94a3b8);
  line-height: 1.7;
}

.service-audience strong {
  color: var(--text-main, #fff);
}

.service-section {
  padding: clamp(2.5rem, 6vw, 4.5rem) 0;
  border-top: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.1));
}

.service-section h2,
.service-cta h2,
.service-related h2 {
  margin: 0 0 0.85rem;
  font-size: clamp(1.65rem, 3.4vw, 2.5rem);
  line-height: 1.16;
  letter-spacing: -0.035em;
}

.service-section-heading {
  max-width: 760px;
  margin-bottom: 1.6rem;
}

.service-section-heading > p:last-child,
.service-problem > p,
.service-cta > p:not(.service-eyebrow) {
  color: var(--text-muted, #cbd5e1);
  line-height: 1.75;
}

.service-problem {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 2rem;
  align-items: start;
}

.service-problem > p {
  margin: 0;
  padding-top: 1.7rem;
  font-size: 1.08rem;
}

.service-deliverables-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.service-detail-card {
  min-height: 140px;
  padding: 1.25rem;
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.12));
  border-radius: 1rem;
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.72));
}

.service-card-index {
  color: #a5b4fc;
  font-family: var(--font-mono, monospace);
  font-size: 0.78rem;
  font-weight: 700;
}

.service-detail-card h3 {
  margin: 1.2rem 0 0;
  font-size: 1.05rem;
  line-height: 1.45;
}

.service-outcomes {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 2rem;
  align-items: center;
}

.service-outcomes-list {
  display: grid;
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.service-outcomes-list li {
  display: flex;
  gap: 0.7rem;
  align-items: flex-start;
  color: var(--text-muted, #cbd5e1);
  line-height: 1.6;
}

.service-outcomes-list li span {
  color: #34d399;
  font-weight: 800;
}

.service-technology-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.service-technology-list li {
  padding: 0.55rem 0.8rem;
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.1);
  color: #c7d2fe;
  font-size: 0.9rem;
  font-weight: 650;
}

.service-faq-list {
  display: grid;
  gap: 0.7rem;
}

.service-faq-list details {
  padding: 1rem 1.15rem;
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.12));
  border-radius: 0.85rem;
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.72));
}

.service-faq-list summary {
  cursor: pointer;
  font-weight: 700;
  line-height: 1.5;
}

.service-faq-list details p {
  margin: 0.8rem 0 0;
  color: var(--text-muted, #cbd5e1);
  line-height: 1.7;
}

.service-cta {
  margin: 1rem 0 3rem;
  padding: clamp(1.5rem, 5vw, 3.5rem);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 1.25rem;
  background:
    radial-gradient(circle at 90% 0, rgba(139, 92, 246, 0.2), transparent 40%),
    rgba(99, 102, 241, 0.08);
}

.service-cta > p:not(.service-eyebrow) {
  max-width: 650px;
  margin: 0 0 1.4rem;
}

.service-related {
  padding-top: 1.5rem;
}

.service-related-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem 1.2rem;
}

.service-related a {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.1));
  font-size: 0.92rem;
}

:global(body.light-theme) .service-page {
  color: #111827;
}

:global(body.light-theme) .service-intro,
:global(body.light-theme) .service-audience,
:global(body.light-theme) .service-section-heading > p:last-child,
:global(body.light-theme) .service-problem > p,
:global(body.light-theme) .service-cta > p:not(.service-eyebrow),
:global(body.light-theme) .service-outcomes-list li,
:global(body.light-theme) .service-faq-list details p {
  color: #4b5563;
}

:global(body.light-theme) .service-audience strong,
:global(body.light-theme) .service-detail-card h3 {
  color: #111827;
}

:global(body.light-theme) .service-button-secondary {
  color: #111827;
}

:global(body.light-theme) .service-technology-list li {
  color: #3730a3;
}

@media (max-width: 680px) {
  .service-page {
    padding-inline: 1rem;
  }

  .service-hero {
    padding-top: 1.5rem;
  }

  .service-hero-actions {
    flex-direction: column;
  }

  .service-problem,
  .service-outcomes {
    grid-template-columns: 1fr;
    gap: 0.7rem;
  }

  .service-problem > p {
    padding-top: 0;
  }

  .service-deliverables-grid,
  .service-related-links {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-button {
    transition: none;
  }
}
</style>
