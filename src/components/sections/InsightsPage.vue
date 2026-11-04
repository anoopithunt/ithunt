<template>
  <div class="insights-page">
    <div class="insights-container">
      <nav class="insights-breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <a href="/insights">Insights</a>
        <template v-if="route.type === 'article'">
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ route.article.title }}</span>
        </template>
      </nav>

      <template v-if="route.type === 'article'">
        <article class="insight-article">
          <header class="insight-article-header">
            <a class="insight-category-link" href="/insights">{{ categoryName(route.article.category) }}</a>
            <h1>{{ route.article.title }}</h1>
            <p class="insight-article-summary">{{ route.article.description }}</p>
            <div class="insight-byline">
              <span>IT HUNT Editorial</span>
              <span aria-hidden="true">·</span>
              <time :datetime="route.article.publishedAt">{{ formattedDate(route.article.publishedAt) }}</time>
              <span aria-hidden="true">·</span>
              <span>{{ route.article.readingMinutes }} min read</span>
            </div>
          </header>

          <p class="insight-introduction">{{ route.article.introduction }}</p>

          <section
            v-for="section in route.article.sections"
            :key="section.heading"
            class="insight-article-section"
          >
            <h2>{{ section.heading }}</h2>
            <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
            <ul v-if="section.bullets?.length">
              <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
          </section>

          <aside class="insight-takeaway">
            <strong>Key takeaway</strong>
            <p>{{ route.article.takeaway }}</p>
          </aside>

          <footer class="insight-article-footer">
            <a href="/insights">← Browse all insights</a>
            <a href="/#page-projects">Explore IT HUNT services and work →</a>
          </footer>
        </article>
      </template>

      <template v-else>
        <header class="insights-hero">
          <p class="insights-eyebrow">IT HUNT INSIGHTS</p>
          <h1>Useful ideas for building better software</h1>
          <p>Practical guides for product teams, founders, and businesses making technology decisions. Original, focused content—no mass-produced location pages.</p>
        </header>

        <nav class="insight-category-list" aria-label="Filter insights by topic">
          <button
            type="button"
            :class="{ active: selectedCategory === 'all' }"
            :aria-pressed="selectedCategory === 'all'"
            @click="selectedCategory = 'all'"
          >
            All topics
          </button>
          <button
            v-for="category in INSIGHT_CATEGORIES"
            :key="category.slug"
            type="button"
            :class="{ active: selectedCategory === category.slug }"
            :aria-pressed="selectedCategory === category.slug"
            @click="selectedCategory = category.slug"
          >
            {{ category.name }}
          </button>
        </nav>

        <section class="insight-topic-intro" aria-live="polite">
          <template v-if="selectedCategory === 'all'">
            <h2>Explore the topics</h2>
            <p>Start with a hands-on guide, then browse more articles as the library grows.</p>
          </template>
          <template v-else>
            <h2>{{ selectedCategoryInfo?.name }}</h2>
            <p>{{ selectedCategoryInfo?.description }}</p>
          </template>
        </section>

        <div v-if="filteredArticles.length" class="insight-article-grid">
          <article v-for="article in filteredArticles" :key="article.slug" class="insight-card">
            <button type="button" class="insight-card-category" @click="selectedCategory = article.category">
              {{ categoryName(article.category) }}
            </button>
            <h3><a :href="`/insights/${article.slug}`">{{ article.title }}</a></h3>
            <p>{{ article.description }}</p>
            <div class="insight-card-footer">
              <span>{{ article.readingMinutes }} min read</span>
              <a :href="`/insights/${article.slug}`" :aria-label="`Read: ${article.title}`">Read guide <span aria-hidden="true">→</span></a>
            </div>
          </article>
        </div>

        <aside v-else-if="selectedCategoryInfo?.slug === 'client-success-stories'" class="insight-empty-state">
          <span aria-hidden="true">🤝</span>
          <h2>Client stories require client permission</h2>
          <p>We’ll publish a project story only when the client has approved attribution and the project details and outcomes can be substantiated. No client stories are available to publish yet.</p>
        </aside>

        <aside v-else class="insight-empty-state">
          <h2>More guides are in progress</h2>
          <p>This topic will be expanded with original, practical guidance as new articles are ready.</p>
        </aside>

        <section class="insights-editorial-note">
          <h2>How we approach these guides</h2>
          <p>We focus on useful decisions, trade-offs, and implementation practices. Recommendations depend on each product’s users, constraints, and operating context; no single tool or architecture is right for every project.</p>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { INSIGHT_ARTICLES, INSIGHT_CATEGORIES } from '../../data/insights.js';

const props = defineProps({
  route: { type: Object, required: true }
});

const selectedCategory = ref('all');
const selectedCategoryInfo = computed(() => INSIGHT_CATEGORIES.find((category) => category.slug === selectedCategory.value));
const filteredArticles = computed(() => selectedCategory.value === 'all'
  ? INSIGHT_ARTICLES
  : INSIGHT_ARTICLES.filter((article) => article.category === selectedCategory.value));

const categoryName = (slug) => INSIGHT_CATEGORIES.find((category) => category.slug === slug)?.name || 'Insights';
const formattedDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' });
</script>

<style scoped>
.insights-page {
  min-height: 70vh;
  padding: clamp(2rem, 5vw, 4.5rem) 1rem 5rem;
  color: var(--text-main, #f8fafc);
}

.insights-container {
  width: min(100%, 1120px);
  margin: 0 auto;
}

.insights-breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
  margin-bottom: clamp(2rem, 5vw, 4rem);
  color: var(--text-muted, #94a3b8);
  font-size: 0.85rem;
}

.insights-breadcrumbs a,
.insight-article-footer a {
  color: #a5b4fc;
}

.insights-hero {
  max-width: 820px;
  padding: 1.5rem 0 2.5rem;
}

.insights-eyebrow {
  margin: 0 0 0.8rem;
  color: #a5b4fc;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.insights-hero h1,
.insight-article-header h1 {
  margin: 0;
  font-size: clamp(2.3rem, 6vw, 4.4rem);
  line-height: 1.08;
  letter-spacing: -0.05em;
}

.insights-hero > p:last-child,
.insight-article-summary {
  max-width: 740px;
  margin: 1rem 0 0;
  color: var(--text-muted, #cbd5e1);
  font-size: 1.08rem;
  line-height: 1.75;
}

.insight-category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 1rem 0 2.2rem;
}

.insight-category-list button {
  min-height: 42px;
  padding: 0.55rem 0.85rem;
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.14));
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
  color: var(--text-muted, #cbd5e1);
  font: inherit;
  font-size: 0.82rem;
  cursor: pointer;
}

.insight-category-list button:hover,
.insight-category-list button.active {
  border-color: #818cf8;
  background: rgba(99, 102, 241, 0.17);
  color: var(--text-main, #fff);
}

.insight-topic-intro {
  margin-bottom: 1.1rem;
}

.insight-topic-intro h2,
.insights-editorial-note h2 {
  margin: 0 0 0.4rem;
  font-size: 1.35rem;
}

.insight-topic-intro p,
.insights-editorial-note p {
  margin: 0;
  color: var(--text-muted, #94a3b8);
  line-height: 1.7;
}

.insight-article-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.insight-card {
  display: flex;
  min-height: 250px;
  flex-direction: column;
  padding: clamp(1.1rem, 3vw, 1.5rem);
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.1));
  border-radius: 1rem;
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.72));
}

.insight-card-category,
.insight-category-link {
  width: fit-content;
  padding: 0;
  border: 0;
  background: none;
  color: #a5b4fc;
  font-size: 0.76rem;
  font-weight: 750;
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
}

.insight-card h3 {
  margin: 0.8rem 0 0.55rem;
  font-size: 1.2rem;
  line-height: 1.4;
}

.insight-card h3 a {
  color: var(--text-main, #fff);
  text-decoration: none;
}

.insight-card h3 a:hover,
.insight-card-footer a:hover,
.insight-article-footer a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.insight-card > p {
  margin: 0;
  color: var(--text-muted, #94a3b8);
  font-size: 0.9rem;
  line-height: 1.65;
}

.insight-card-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  margin-top: auto;
  padding-top: 1.2rem;
  color: var(--text-muted, #94a3b8);
  font-size: 0.78rem;
}

.insight-card-footer a {
  color: #a5b4fc;
  font-weight: 750;
  text-decoration: none;
}

.insight-empty-state {
  padding: clamp(1.3rem, 4vw, 2rem);
  border: 1px dashed var(--border-cyber, rgba(255, 255, 255, 0.2));
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.025);
}

.insight-empty-state > span {
  font-size: 1.6rem;
}

.insight-empty-state h2 {
  margin: 0.45rem 0;
  font-size: 1.25rem;
}

.insight-empty-state p {
  max-width: 720px;
  margin: 0;
  color: var(--text-muted, #94a3b8);
  line-height: 1.7;
}

.insights-editorial-note {
  margin-top: 2rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.1));
}

.insight-article {
  max-width: 820px;
  margin: 0 auto;
}

.insight-article-header h1 {
  margin-top: 0.8rem;
  font-size: clamp(2.15rem, 5vw, 3.6rem);
}

.insight-byline {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1.1rem;
  color: var(--text-muted, #94a3b8);
  font-size: 0.82rem;
}

.insight-introduction {
  margin: 2.5rem 0;
  color: var(--text-main, #e2e8f0);
  font-size: 1.15rem;
  line-height: 1.8;
}

.insight-article-section {
  margin: 2rem 0;
}

.insight-article-section h2 {
  margin: 0 0 0.75rem;
  font-size: 1.45rem;
  letter-spacing: -0.02em;
}

.insight-article-section p,
.insight-article-section li,
.insight-takeaway p {
  color: var(--text-muted, #cbd5e1);
  font-size: 0.98rem;
  line-height: 1.8;
}

.insight-article-section p {
  margin: 0 0 0.9rem;
}

.insight-article-section ul {
  display: grid;
  gap: 0.45rem;
  padding-left: 1.25rem;
}

.insight-takeaway {
  margin: 2.5rem 0;
  padding: 1.2rem 1.3rem;
  border-left: 3px solid #818cf8;
  border-radius: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
}

.insight-takeaway strong {
  color: var(--text-main, #fff);
}

.insight-takeaway p {
  margin: 0.45rem 0 0;
}

.insight-article-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.3rem;
  border-top: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.1));
  font-size: 0.88rem;
  font-weight: 700;
}

@media (max-width: 680px) {
  .insight-article-grid {
    grid-template-columns: 1fr;
  }
}

:global(body.light-theme) .insight-card h3 a,
:global(body.light-theme) .insight-article-section h2,
:global(body.light-theme) .insight-takeaway strong,
:global(body.light-theme) .insight-empty-state h2,
:global(body.light-theme) .insights-hero h1,
:global(body.light-theme) .insight-article-header h1 {
  color: #111827;
}

:global(body.light-theme) .insights-hero > p:last-child,
:global(body.light-theme) .insight-article-summary,
:global(body.light-theme) .insight-topic-intro p,
:global(body.light-theme) .insights-editorial-note p,
:global(body.light-theme) .insight-card > p,
:global(body.light-theme) .insight-empty-state p,
:global(body.light-theme) .insight-introduction,
:global(body.light-theme) .insight-article-section p,
:global(body.light-theme) .insight-article-section li,
:global(body.light-theme) .insight-takeaway p {
  color: #4b5563;
}
</style>
