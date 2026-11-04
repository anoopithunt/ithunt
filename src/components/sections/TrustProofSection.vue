<template>
  <section id="page-trust" class="ithunt-home-section trust-proof-section ithunt-section ithunt-section-odd ithunt-section-base">
    <div class="container">
      <header class="section-title-wrap text-center">
        <div class="ithunt-pill-badge small">
          <span class="ithunt-badge-dot"></span>
          <span>TRUST &amp; TRANSPARENCY</span>
        </div>
        <h2 class="ithunt-section-heading">Real people. Clear credentials. Verifiable proof.</h2>
        <p class="ithunt-section-desc">
          Meet the team, find our contact details, and review the credentials IT HUNT lists. We publish customer reviews and client identities only when their source, verification, and permission are confirmed.
        </p>
      </header>

      <div class="trust-proof-grid">
        <section class="trust-proof-card trust-reviews" aria-labelledby="trust-reviews-heading">
          <div class="trust-card-heading">
            <span class="trust-card-icon" aria-hidden="true">💬</span>
            <div>
              <p class="trust-eyebrow">CUSTOMER FEEDBACK</p>
              <h3 id="trust-reviews-heading">Verified testimonials</h3>
            </div>
          </div>
          <template v-if="publishedTestimonials.length">
            <blockquote v-for="testimonial in publishedTestimonials" :key="testimonial.id" class="trust-testimonial">
              <p>“{{ testimonial.quote }}”</p>
              <footer>
                <strong>{{ testimonial.customerName }}</strong>
                <span v-if="testimonial.companyName">{{ testimonial.companyName }}</span>
                <span v-if="testimonial.project">{{ testimonial.project }}</span>
                <span class="trust-verified-badge">✓ Verified with permission</span>
              </footer>
            </blockquote>
          </template>
          <p v-else class="trust-empty-state">
            No customer testimonials are published yet. Reviews will appear here after the customer and their permission to publish have been confirmed.
          </p>
          <div class="trust-review-links">
            <a v-if="validExternalUrl(proof.googleReviewsUrl)" :href="proof.googleReviewsUrl" target="_blank" rel="noopener noreferrer">
              Google reviews <span aria-hidden="true">↗</span>
            </a>
            <span v-else class="trust-link-unavailable">Google review link not configured</span>
            <a v-if="validExternalUrl(proof.clutchReviewsUrl)" :href="proof.clutchReviewsUrl" target="_blank" rel="noopener noreferrer">
              Clutch reviews <span aria-hidden="true">↗</span>
            </a>
            <span v-else class="trust-link-unavailable">Clutch profile link not configured</span>
          </div>
        </section>

        <section class="trust-proof-card trust-client-logos" aria-labelledby="trust-clients-heading">
          <div class="trust-card-heading">
            <span class="trust-card-icon" aria-hidden="true">🤝</span>
            <div>
              <p class="trust-eyebrow">CLIENT PARTNERSHIPS</p>
              <h3 id="trust-clients-heading">Client logos</h3>
            </div>
          </div>
          <div v-if="permittedClientLogos.length" class="trust-logo-list">
            <a
              v-for="client in permittedClientLogos"
              :key="client.name"
              :href="validExternalUrl(client.url) ? client.url : undefined"
              :target="validExternalUrl(client.url) ? '_blank' : undefined"
              :rel="validExternalUrl(client.url) ? 'noopener noreferrer' : undefined"
              :aria-label="`${client.name} (client)`"
            >
              <img :src="client.logo" :alt="`${client.name} logo`" loading="lazy">
            </a>
          </div>
          <p v-else class="trust-empty-state">
            Client logos are not displayed until the client has granted permission to identify them publicly.
          </p>
          <p class="trust-supporting-note">Technology experience: {{ proof.technologyExperience.join(' · ') }}. This describes our areas of work, not official vendor partnerships.</p>
        </section>

        <section class="trust-proof-card trust-credentials" aria-labelledby="trust-credentials-heading">
          <div class="trust-card-heading">
            <span class="trust-card-icon" aria-hidden="true">📜</span>
            <div>
              <p class="trust-eyebrow">CREDENTIALS &amp; AFFILIATIONS</p>
              <h3 id="trust-credentials-heading">Details available on request</h3>
            </div>
          </div>
          <ul class="trust-credential-list">
            <li v-for="credential in proof.credentials" :key="credential.name">
              <strong>{{ credential.name }}</strong>
              <span>{{ credential.type }}</span>
              <small>{{ credential.details }}</small>
            </li>
          </ul>
          <p class="trust-supporting-note">
            These items are company-reported and are not independently verified on this page. Request current supporting documents from IT HUNT. Technology experience does not imply vendor endorsement or partnership.
          </p>
        </section>

        <section class="trust-proof-card trust-company" aria-labelledby="trust-company-heading">
          <div class="trust-card-heading">
            <span class="trust-card-icon" aria-hidden="true">🏢</span>
            <div>
              <p class="trust-eyebrow">COMPANY INFORMATION</p>
              <h3 id="trust-company-heading">{{ companyName }}</h3>
            </div>
          </div>
          <dl class="trust-company-details">
            <div>
              <dt>Established</dt>
              <dd>{{ content.brand?.establishedYear || 'Details available on request' }}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{{ content.contact?.location }}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd><a :href="`tel:${content.contact?.rawPhone || '+919795771806'}`">{{ content.contact?.phone }}</a></dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a :href="`mailto:${content.contact?.rawEmail || content.contact?.email}`">{{ content.contact?.email }}</a></dd>
            </div>
          </dl>
          <a
            class="trust-directions-link"
            :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.contact?.location || companyName)}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            View location on Google Maps <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section class="trust-proof-card trust-team" aria-labelledby="trust-team-heading">
          <div class="trust-card-heading">
            <span class="trust-card-icon" aria-hidden="true">👥</span>
            <div>
              <p class="trust-eyebrow">PEOPLE AT IT HUNT</p>
              <h3 id="trust-team-heading">Meet the team</h3>
            </div>
          </div>
          <div class="trust-team-list">
            <article v-for="member in teamMembers" :key="member.id" class="trust-team-member">
              <img :src="member.image" :alt="member.name" loading="lazy" @error="onImageError">
              <div>
                <h4>{{ member.name }}</h4>
                <p>{{ member.role }}</p>
                <ul>
                  <li v-for="skill in member.skills.slice(0, 3)" :key="skill">{{ skill }}</li>
                </ul>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>

    <button class="section-scroll-pill" @click="$emit('navigate', 'page-faq')" aria-label="Next: Frequently Asked Questions">
      <span>Next: Frequently Asked Questions</span>
      <span class="scroll-arrow-anim">↓</span>
    </button>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { TRUST_PROOF } from '../../data/trustProof.js';

const props = defineProps({
  content: { type: Object, required: true }
});

defineEmits(['navigate']);

const proof = TRUST_PROOF;
const companyName = computed(() => [props.content.brand?.name, props.content.brand?.tagline].filter(Boolean).join(' ') || 'IT HUNT');
const teamMembers = computed(() => (props.content.teamSection?.members || []).filter((member) => member.name && member.role));
const publishedTestimonials = computed(() => proof.clientTestimonials.filter((testimonial) =>
  testimonial.published === true
  && testimonial.verified === true
  && testimonial.consentToPublish === true
  && testimonial.quote
  && testimonial.customerName
));
const permittedClientLogos = computed(() => proof.clientLogos.filter((client) =>
  client.permissionToPublish === true && client.name && client.logo
));

const validExternalUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

const onImageError = (event) => {
  event.target.src = '/img/student-placeholder.svg';
};
</script>

<style scoped>
.trust-proof-section {
  position: relative;
}

.trust-proof-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem;
  max-width: 1160px;
  margin: 0 auto;
}

.trust-proof-card {
  min-width: 0;
  padding: clamp(1.15rem, 3vw, 1.6rem);
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.1));
  border-radius: 1.1rem;
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.72));
}

.trust-card-heading {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-bottom: 1.15rem;
}

.trust-card-icon {
  display: grid;
  width: 2.8rem;
  height: 2.8rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgba(129, 140, 248, 0.25);
  border-radius: 0.85rem;
  background: rgba(99, 102, 241, 0.12);
  font-size: 1.25rem;
}

.trust-eyebrow {
  margin: 0 0 0.25rem;
  color: #a5b4fc;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.trust-card-heading h3 {
  margin: 0;
  color: var(--text-main, #fff);
  font-size: 1.14rem;
  line-height: 1.35;
}

.trust-empty-state,
.trust-supporting-note {
  margin: 0;
  color: var(--text-muted, #94a3b8);
  font-size: 0.84rem;
  line-height: 1.65;
}

.trust-empty-state {
  padding: 0.85rem;
  border: 1px dashed var(--border-cyber, rgba(255, 255, 255, 0.18));
  border-radius: 0.7rem;
}

.trust-review-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1rem;
  margin-top: 1rem;
}

.trust-review-links a,
.trust-directions-link {
  color: #a5b4fc;
  font-size: 0.83rem;
  font-weight: 750;
  text-underline-offset: 3px;
}

.trust-review-links a:hover,
.trust-directions-link:hover {
  text-decoration: underline;
}

.trust-link-unavailable {
  color: var(--text-muted, #94a3b8);
  font-size: 0.78rem;
}

.trust-testimonial {
  margin: 0;
  padding: 0.9rem;
  border-left: 3px solid #818cf8;
  border-radius: 0.5rem;
  background: rgba(99, 102, 241, 0.08);
}

.trust-testimonial + .trust-testimonial {
  margin-top: 0.7rem;
}

.trust-testimonial > p {
  margin: 0 0 0.75rem;
  color: var(--text-main, #f8fafc);
  font-size: 0.9rem;
  line-height: 1.65;
}

.trust-testimonial footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.65rem;
  align-items: center;
  color: var(--text-muted, #94a3b8);
  font-size: 0.76rem;
}

.trust-testimonial footer strong {
  color: var(--text-main, #fff);
}

.trust-verified-badge {
  color: #34d399;
  font-weight: 700;
}

.trust-logo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.trust-logo-list a {
  display: grid;
  min-width: 120px;
  min-height: 64px;
  place-items: center;
  padding: 0.6rem;
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.12));
  border-radius: 0.7rem;
}

.trust-logo-list img {
  max-width: 140px;
  max-height: 44px;
  object-fit: contain;
}

.trust-credential-list,
.trust-company-details {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.trust-credential-list li {
  display: grid;
  gap: 0.2rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
}

.trust-credential-list li:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.trust-credential-list strong,
.trust-company-details dt {
  color: var(--text-main, #fff);
  font-size: 0.84rem;
}

.trust-credential-list span,
.trust-credential-list small,
.trust-company-details dd {
  color: var(--text-muted, #94a3b8);
  font-size: 0.78rem;
  line-height: 1.55;
}

.trust-credentials .trust-supporting-note {
  margin-top: 0.9rem;
}

.trust-company-details > div {
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr);
  gap: 0.75rem;
}

.trust-company-details dt,
.trust-company-details dd {
  margin: 0;
}

.trust-company-details a {
  color: inherit;
  overflow-wrap: anywhere;
}

.trust-directions-link {
  display: inline-flex;
  gap: 0.35rem;
  margin-top: 1rem;
}

.trust-team {
  grid-column: 1 / -1;
}

.trust-team-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.trust-team-member {
  display: flex;
  min-width: 0;
  gap: 0.85rem;
  align-items: flex-start;
  padding: 0.9rem;
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  border-radius: 0.8rem;
}

.trust-team-member > img {
  width: 3rem;
  height: 3rem;
  flex: 0 0 auto;
  border-radius: 50%;
  object-fit: cover;
}

.trust-team-member h4 {
  margin: 0;
  color: var(--text-main, #fff);
  font-size: 0.88rem;
}

.trust-team-member p {
  margin: 0.2rem 0 0.45rem;
  color: var(--text-muted, #94a3b8);
  font-size: 0.76rem;
  line-height: 1.45;
}

.trust-team-member ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.trust-team-member li {
  padding: 0.2rem 0.45rem;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.12);
  color: #c7d2fe;
  font-size: 0.68rem;
}

:global(body.light-theme) .trust-card-heading h3,
:global(body.light-theme) .trust-testimonial > p,
:global(body.light-theme) .trust-testimonial footer strong,
:global(body.light-theme) .trust-credential-list strong,
:global(body.light-theme) .trust-company-details dt,
:global(body.light-theme) .trust-team-member h4 {
  color: #111827;
}

:global(body.light-theme) .trust-empty-state,
:global(body.light-theme) .trust-supporting-note,
:global(body.light-theme) .trust-link-unavailable,
:global(body.light-theme) .trust-testimonial footer,
:global(body.light-theme) .trust-credential-list span,
:global(body.light-theme) .trust-credential-list small,
:global(body.light-theme) .trust-company-details dd,
:global(body.light-theme) .trust-team-member p {
  color: #4b5563;
}

@media (max-width: 720px) {
  .trust-proof-grid,
  .trust-team-list {
    grid-template-columns: 1fr;
  }

  .trust-team {
    grid-column: auto;
  }
}
</style>
