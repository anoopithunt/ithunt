<template>
  <div class="ithunt-wrapper">
    <!-- Dedicated Vertical Pagination Rail for Home View -->
    <VerticalPaginationNav
      :sections="homeSections"
      :activeSectionId="activeSectionId"
      :isSnapEnabled="isSnapEnabled"
      @navigate="scrollToSection"
      @toggle-snap="toggleSnapMode"
    />

    <!-- =====================================================================
         1. PAGE 1: EDUCATIONAL ACADEMY HERO & 3 HIGHLIGHT CARDS & LAPTOP FORM
         ===================================================================== -->
    <section class="ithunt-home-section ithunt-hero ithunt-edu-hero ithunt-section-odd" id="page-hero">
      <div class="ithunt-hero-glow ithunt-hero-glow-1"></div>
      <div class="ithunt-hero-glow ithunt-hero-glow-2"></div>

      <div class="container ithunt-hero-container">
        <!-- Interactive Carousel Container (Image 2) -->
        <div class="hero-carousel-wrapper">
          <!-- Left/Right Slide Controls -->
          <button class="carousel-control-btn btn-prev" @click="prevHeroSlide" aria-label="Previous slide" title="Previous Slide">
            <span>‹</span>
          </button>
          <button class="carousel-control-btn btn-next" @click="nextHeroSlide" aria-label="Next slide" title="Next Slide">
            <span>›</span>
          </button>

          <div class="hero-carousel-grid">
            <!-- Left Hero Content Column -->
            <div class="hero-text-column">
              <!-- Top Category Badge -->
              <div class="hero-badge-pill anim-fade-in">
                <span class="badge-dot"></span>
                <span>{{ currentHeroSlide.badge }}</span>
              </div>

              <!-- Main Hero Headline -->
              <h1 class="hero-main-title anim-fade-in-up">
                {{ currentHeroSlide.titlePrefix }}<br />
                <span class="hero-highlight-text">{{ currentHeroSlide.titleHighlight }}</span>
              </h1>

              <!-- Subtitle / Location -->
              <p class="hero-subheading anim-fade-in-up-delay">
                {{ currentHeroSlide.subtitle }}
              </p>

              <!-- Benefit Checklist Pills -->
              <div class="hero-pills-row anim-fade-in-up-delay">
                <div class="hero-pill-item" v-for="(pill, idx) in currentHeroSlide.pills" :key="idx">
                  <span class="check-icon">✓</span>
                  <span>{{ pill }}</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="hero-actions-row anim-fade-in-up-delay">
                <button class="btn-hero-primary" @click="currentHeroSlide.ctaPrimaryAction">
                  <span>{{ currentHeroSlide.ctaPrimary }}</span>
                </button>
                <button class="btn-hero-secondary" @click="currentHeroSlide.ctaSecondaryAction">
                  <span>{{ currentHeroSlide.ctaSecondary }}</span>
                </button>
              </div>

              <!-- Carousel Indicators -->
              <div class="hero-dots-row">
                <button 
                  v-for="(slide, idx) in heroSlides" 
                  :key="idx" 
                  class="hero-dot" 
                  :class="{ active: heroSlideIdx === idx }"
                  @click="heroSlideIdx = idx"
                  :aria-label="'Go to slide ' + (idx + 1)"
                ></button>
              </div>
            </div>

            <!-- Right Hero Image Column with Angular Geometric Panels (Image 2) -->
            <div class="hero-visual-column">
              <div class="hero-image-stage">
                <!-- Geometric Angular Panels matching Image 2 -->
                <div class="geo-panel geo-panel-orange"></div>
                <div class="geo-panel geo-panel-teal"></div>

                <!-- Students Main Photo -->
                <img 
                  src="/img/hero-students.jpg" 
                  alt="IT HUNT Students with Laptop and Books" 
                  class="hero-students-photo"
                  loading="eager"
                  fetchpriority="high"
                />

                <!-- Floating Stat Badges (Image 2) -->
                <div class="floating-badge badge-rating">
                  <span class="badge-icon">⭐</span>
                  <div>
                    <div class="badge-bold">4.9 / 5 Rating</div>
                    <div class="badge-sub">1,200+ Alumni Placed</div>
                  </div>
                </div>

                <div class="floating-badge badge-placement">
                  <span class="badge-icon">🎯</span>
                  <div>
                    <div class="badge-bold">100% Placement</div>
                    <div class="badge-sub">Prayagraj Campus</div>
                  </div>
                </div>

                <div class="floating-badge badge-certified">
                  <span class="badge-icon">🏅</span>
                  <div>
                    <div class="badge-bold">NIELIT Accredited</div>
                    <div class="badge-sub">ISO 9001:2015 Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- =================================================================
             THREE CATEGORY HIGHLIGHT CARDS (Image 2)
             ================================================================= -->
        <div class="highlight-cards-band">
          <div class="highlight-cards-grid">
            <div 
              v-for="card in highlightCards" 
              :key="card.id"
              class="highlight-card"
              :class="'card-theme-' + card.theme"
            >
              <div class="card-icon-circle">
                <span>{{ card.icon }}</span>
              </div>
              <div class="card-body">
                <div class="card-badge-chip">{{ card.badge }}</div>
                <h3 class="card-title">{{ card.title }}</h3>
                <p class="card-desc">{{ card.desc }}</p>
                <button class="card-cta-btn" @click="card.action">
                  <span>{{ card.actionText }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- =================================================================
             INTERACTIVE 3D LAPTOP APPLICATION FORM (Image 1)
             ================================================================= -->
        <div class="laptop-section-wrapper" id="home-application-form">
          <div class="laptop-section-header text-center">
            <div class="ithunt-pill-badge small">
              <span class="ithunt-badge-dot"></span>
              <span>DIRECT ADMISSION 2026</span>
            </div>
            <h2 class="laptop-section-title">
              IT HUNT Fast-Track <span class="ithunt-gradient-text">Application Form</span>
            </h2>
            <p class="laptop-section-sub">
              Secure your seat for 2026 batches at Prayagraj Campus. Apply directly below in under 30 seconds.
            </p>
          </div>

          <!-- 3D Laptop Mockup Body (Image 1) -->
          <div class="laptop-mockup-frame">
            <!-- Laptop Top Lid / Screen -->
            <div class="laptop-screen">
              <div class="laptop-webcam">
                <span class="webcam-lens"></span>
                <span class="webcam-mic"></span>
              </div>

              <!-- Inside Screen: Application Form -->
              <div class="laptop-screen-content">
                <!-- Left Orange Accent Stripe -->
                <div class="laptop-left-accent"></div>

                <div class="laptop-form-inner">
                  <!-- Form Header -->
                  <div class="laptop-brand-header">
                    <div class="laptop-logo-wrap">
                      <span class="laptop-logo-it">IT</span>
                      <span class="laptop-logo-hunt">HUNT</span>
                    </div>
                    <h3 class="laptop-form-heading">Application Form</h3>
                  </div>

                  <!-- Form Inputs (2 Columns) -->
                  <form @submit.prevent="submitLaptopForm" class="laptop-form-grid">
                    <div class="laptop-col">
                      <div class="laptop-form-group">
                        <label class="laptop-label">Name</label>
                        <input 
                          type="text" 
                          v-model="laptopForm.candidateName" 
                          class="laptop-input-field" 
                          placeholder="Candidate full name" 
                          required
                        />
                      </div>

                      <div class="laptop-form-group">
                        <label class="laptop-label">Password / Qualification</label>
                        <input 
                          type="text" 
                          v-model="laptopForm.qualification" 
                          class="laptop-input-field" 
                          placeholder="10th / 12th / Grad / B.Tech"
                        />
                      </div>
                    </div>

                    <div class="laptop-col">
                      <div class="laptop-form-group">
                        <label class="laptop-label">Username / Mobile</label>
                        <input 
                          type="tel" 
                          v-model="laptopForm.mobile" 
                          class="laptop-input-field" 
                          placeholder="10-digit mobile number" 
                          required
                        />
                      </div>

                      <div class="laptop-form-group">
                        <label class="laptop-label">Course</label>
                        <div class="laptop-select-wrapper">
                          <select v-model="laptopForm.course" class="laptop-select-field">
                            <option value="NIELIT 'O' Level Diploma">NIELIT 'O' Level Diploma</option>
                            <option value="NIELIT 'A' Level Advanced">NIELIT 'A' Level Advanced</option>
                            <option value="Full-Stack MERN Development">Full-Stack MERN Development</option>
                            <option value="Python AI & Data Science">Python AI & Data Science</option>
                            <option value="ADCA (Advance Diploma in Computer Apps)">ADCA Diploma</option>
                            <option value="CCC (Course on Computer Concepts)">CCC Certification</option>
                            <option value="Tally Prime + GST Accounting">Tally Prime + GST Accounting</option>
                            <option value="Web Designing & Frontend">Web Designing & Frontend</option>
                          </select>
                          <span class="select-chevron">▼</span>
                        </div>
                      </div>
                    </div>

                    <!-- Submit Button Row -->
                    <div class="laptop-submit-row">
                      <button type="submit" class="laptop-apply-btn" title="Submit Admission Application">
                        <span>Apply Now</span>
                        <svg class="cursor-pointer-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                          <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2 1-3.2-7.4L7 18V2z"/>
                        </svg>
                      </button>
                    </div>
                  </form>

                  <!-- Bottom Accent Bar -->
                  <div class="laptop-bottom-bar"></div>
                </div>
              </div>
            </div>

            <!-- Laptop Base & Keyboard Contour -->
            <div class="laptop-base">
              <div class="laptop-base-notch"></div>
            </div>
            <!-- Laptop Shadow -->
            <div class="laptop-drop-shadow"></div>
          </div>

          <!-- Bottom Hindi Trust Watermark (Image 1) -->
          <div class="laptop-hindi-watermark text-center">
            <h2 class="hindi-trust-heading">IT करियर का सबसे भरोसेमंद संस्थान</h2>
            <p class="hindi-trust-sub">Prayagraj Campus • NIELIT Accredited • ISO 9001:2015 Certified • 100% Practical Training</p>
          </div>
        </div>
      </div>

      <!-- Jump Down Pill to Next Page -->
      <button class="section-scroll-pill" @click="scrollToSection('page-tracks')" aria-label="Explore Programs & Diplomas">
        <span>Explore Programs &amp; Diplomas</span>
        <span class="scroll-arrow-anim">↓</span>
      </button>
    </section>

    <!-- =====================================================================
         2. CORE ACADEMIC & SOFTWARE TRACKS
         ===================================================================== -->

    <!-- =====================================================================
         4. PAGE 4: THREE CORE TRACKS ("Three Core Tracks. One Integrated Studio.")
         ===================================================================== -->
    <section class="ithunt-home-section ithunt-section ithunt-section-even ithunt-section-alt" id="page-tracks">
      <div class="container">
        <div class="section-title-wrap text-center">
          <div class="ithunt-pill-badge small">
            <span class="ithunt-badge-dot"></span>
            <span>MULTI-FORMAT ACCELERATION</span>
          </div>
          <h2 class="ithunt-section-heading">
            Three Core Tracks. One Integrated Studio.
          </h2>
          <p class="ithunt-section-desc">
            Compare a focused short sprint, a longer immersive internship, and accredited diploma options. Choose a learning path that fits your goals and schedule.
          </p>
        </div>

        <div class="accelerators-grid">
          <!-- Track 1: 3-Month Sprint -->
          <div class="accelerator-card">
            <div class="acc-top">
              <span class="acc-format-badge">Sprint Track</span>
              <h3 class="acc-title">3-Month Fast-Track</h3>
              <p class="acc-sub">Intensive Skill Acceleration</p>
            </div>
            <div class="acc-body">
              <div class="acc-deliverables-title">Delivers to:</div>
              <ul class="acc-list">
                <li><span class="check">✓</span> Core Full-Stack (MERN / Python / Flutter)</li>
                <li><span class="check">✓</span> Live Client Sprint Project</li>
                <li><span class="check">✓</span> Git, Docker & Cloud Deployment Basics</li>
                <li><span class="check">✓</span> Verified Internship Certificate</li>
              </ul>
            </div>
            <div class="acc-footer">
              <div class="acc-cost-line">3 Months · Fast Track</div>
              <button class="ithunt-btn-primary w-full" @click="$emit('set-tab', 'internships')">
                <span>Enroll in 3-Month Track ➜</span>
              </button>
            </div>
          </div>

          <!-- Track 2: 6-Month Full Industry Masterclass -->
          <div class="accelerator-card featured">
            <div class="acc-popular-badge">MOST POPULAR</div>
            <div class="acc-top">
              <span class="acc-format-badge">Masterclass Track</span>
              <h3 class="acc-title">6-Month Industry Masterclass</h3>
              <p class="acc-sub">Complete Enterprise Immersion</p>
            </div>
            <div class="acc-body">
              <div class="acc-deliverables-title">Delivers to:</div>
              <ul class="acc-list">
                <li><span class="check">✓</span> Advanced Microservices & Cloud CI/CD</li>
                <li><span class="check">✓</span> AI Post & LLM Integration (Gemini/OpenAI)</li>
                <li><span class="check">✓</span> End-to-End Enterprise Client Software</li>
                <li><span class="check">✓</span> Dedicated Placement Drive & LOR</li>
              </ul>
            </div>
            <div class="acc-footer">
              <div class="acc-cost-line">6 Months · Full Immersion</div>
              <button class="ithunt-btn-primary w-full" @click="$emit('set-tab', 'internships')">
                <span>Enroll in 6-Month Masterclass ➜</span>
              </button>
            </div>
          </div>

          <!-- Track 3: 1-Year NIELIT Govt Accredited Diploma -->
          <div class="accelerator-card">
            <div class="acc-top">
              <span class="acc-format-badge">Govt Accredited Track</span>
              <h3 class="acc-title">NIELIT Accredited Diploma</h3>
              <p class="acc-sub">O-Level & A-Level Certification</p>
            </div>
            <div class="acc-body">
              <div class="acc-deliverables-title">Delivers to:</div>
              <ul class="acc-list">
                <li><span class="check">✓</span> Central Govt. Recognized Diploma</li>
                <li><span class="check">✓</span> Online QR Registry Verification</li>
                <li><span class="check">✓</span> Deep CS Fundamentals + Practical Labs</li>
                <li><span class="check">✓</span> Lifetime Alumni Placement Backing</li>
              </ul>
            </div>
            <div class="acc-footer">
              <div class="acc-cost-line">1 Year · Govt Credential</div>
              <button class="ithunt-btn-secondary w-full" @click="$emit('set-tab', 'courses')">
                <span>Explore NIELIT Programs ➜</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Jump Down Pill to Next Page -->
      <button class="section-scroll-pill" @click="scrollToSection('page-projects')" aria-label="Next: Live Projects">
        <span>Next: Live Projects</span>
        <span class="scroll-arrow-anim">↓</span>
      </button>
    </section>

    <!-- =====================================================================
         5. PAGE 5: LIVE PROJECTS SHOWCASE ("See in Action" Live Projects)
         ===================================================================== -->
    <section class="ithunt-home-section ithunt-section ithunt-section-odd ithunt-section-base" id="page-projects">
      <div class="container" id="examples">
        <div class="section-title-wrap text-center">
          <div class="ithunt-pill-badge small">
            <span class="ithunt-badge-dot"></span>
            <span>EXAMPLES</span>
          </div>
          <h2 class="ithunt-section-heading">
            See IT HUNT <span class="text-brand">Product Thinking</span>
          </h2>
          <p class="ithunt-section-desc">
            These are illustrative solution concepts, not published client case studies. We’ll share client work only when attribution, media, timelines, and outcome evidence are approved.
          </p>
        </div>

        <!-- IT Hunt Category Filter Tabs Pill -->
        <div class="ithunt-cat-tabs-wrapper">
          <div class="ithunt-cat-tabs-pill">
            <button 
              v-for="cat in projectCategories" 
              :key="cat.id"
              class="ithunt-cat-tab-btn"
              :class="{ active: selectedProjectCategory === cat.id }"
              @click="selectedProjectCategory = cat.id"
            >
              <span class="cat-tab-icon">{{ cat.icon }}</span>
              <span>{{ cat.name }}</span>
            </button>
          </div>
        </div>

        <div class="examples-grid">
          <div class="example-card" v-for="item in filteredProjects" :key="item.id">
            <div class="example-card-header">
              <div class="example-brand-row">
                <span class="example-avatar">{{ item.logo }}</span>
                <div>
                  <h4 class="example-client-name">{{ item.name }}</h4>
                  <span class="example-meta-text">{{ item.category }} • Illustrative concept</span>
                </div>
              </div>
              <span class="example-platform-pill">{{ item.platform }}</span>
            </div>

            <div class="example-card-content">
              <p class="example-desc-text">
                {{ item.description }}
              </p>

              <div class="example-features-box">
                <div class="feature-bullet" v-for="f in item.features" :key="f">
                  <span class="bullet-dot"></span>
                  <span>{{ f }}</span>
                </div>
              </div>
            </div>

            <div class="example-card-footer">
              <details class="case-study-details">
                <summary class="example-view-btn">View solution concept <span aria-hidden="true">⌄</span></summary>
                <div class="case-study-content">
                  <div class="case-study-section">
                    <h5>Example problem</h5>
                    <p>{{ item.problem }}</p>
                  </div>
                  <div class="case-study-section">
                    <h5>Illustrative approach</h5>
                    <p>{{ item.solution }}</p>
                  </div>
                  <div class="case-study-section">
                    <h5>Technologies used</h5>
                    <div class="case-study-tech-list">
                      <span class="stack-badge" v-for="technology in item.technologies" :key="technology">{{ technology }}</span>
                    </div>
                  </div>
                  <div class="case-study-section">
                    <h5>Concept media</h5>
                    <div v-if="item.screenshots.length || item.videoUrl" class="case-study-media">
                      <figure v-for="image in item.screenshots" :key="image.src">
                        <img :src="image.src" :alt="image.alt" loading="lazy">
                        <figcaption>{{ image.caption }}</figcaption>
                      </figure>
                      <video v-if="item.videoUrl" controls preload="metadata" :poster="item.videoPoster || undefined">
                        <source :src="item.videoUrl">
                        Your browser does not support embedded videos.
                      </video>
                    </div>
                    <p v-else class="case-study-evidence-note">
                      No client-approved project media is available for this concept.
                    </p>
                  </div>
                  <div class="case-study-meta-grid">
                    <div class="case-study-section">
                      <h5>Delivery timeline</h5>
                      <p>{{ item.timeline || 'A real delivery timeline depends on discovery and an agreed scope.' }}</p>
                    </div>
                    <div class="case-study-section">
                      <h5>Client outcome evidence</h5>
                      <ul v-if="item.results.length">
                        <li v-for="result in item.results" :key="result">{{ result }}</li>
                      </ul>
                      <p v-else class="case-study-evidence-note">
                        This is an illustrative concept, not a client case study. No client results are claimed.
                      </p>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      <!-- Jump Down Pill to Next Page -->
      <button class="section-scroll-pill" @click="scrollToSection('page-trust')" aria-label="Next: Trust & Accreditation">
        <span>Next: Trust &amp; Accreditation</span>
        <span class="scroll-arrow-anim">↓</span>
      </button>
    </section>

    <TrustProofSection
      :content="content"
      @navigate="scrollToSection"
    />

    <!-- =====================================================================
         9. PAGE 9: FREQUENTLY ASKED QUESTIONS (Accordion)
         ===================================================================== -->
    <section class="ithunt-home-section ithunt-section ithunt-section-odd ithunt-section-base" id="page-faq">
      <div class="container">
        <div class="section-title-wrap text-center">
          <div class="ithunt-pill-badge small">
            <span class="ithunt-badge-dot"></span>
            <span>FAQ</span>
          </div>
          <h2 class="ithunt-section-heading">
            Frequently Asked Questions
          </h2>
          <p class="ithunt-section-desc">
            Everything you need to know about the IT HUNT training and internship venture. Have a specific question? Our tech team is ready to help.
          </p>
        </div>

        <div class="faq-accordion-wrap">
          <div 
            class="faq-accordion-item" 
            v-for="(faq, fIdx) in faqsList" 
            :key="fIdx"
            :class="{ open: openFaqIdx === fIdx }"
          >
            <button class="faq-question-bar" @click="toggleFaq(fIdx)">
              <span class="faq-question-text">{{ faq.q }}</span>
              <span class="faq-chevron-icon">{{ openFaqIdx === fIdx ? '−' : '+' }}</span>
            </button>
            <div class="faq-answer-container" v-show="openFaqIdx === fIdx">
              <p class="faq-answer-text">{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Jump Down Pill to Footer / Contact -->
      <button class="section-scroll-pill" @click="scrollToSection('page-footer')" aria-label="Next: Contact & Information">
        <span>Contact &amp; Information</span>
        <span class="scroll-arrow-anim">↓</span>
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import VerticalPaginationNav from '../layout/VerticalPaginationNav.vue';
import TrustProofSection from './TrustProofSection.vue';

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['set-tab', 'apply-course', 'open-job-modal', 'open-cv-modal']);

// Vertical Section-Wise Pagination Config
const homeSections = [
  { id: 'page-hero', label: 'Overview', icon: '🏠', subtitle: 'Hero & Fast Application' },
  { id: 'page-tracks', label: 'Programs', icon: '🎯', subtitle: 'Diplomas & Core Tracks' },
  { id: 'page-projects', label: 'Live Projects', icon: '🚀', subtitle: 'Student Production Software' },
  { id: 'page-trust', label: 'Trust & Proof', icon: '🤝', subtitle: 'Accreditation & Reviews' },
  { id: 'page-faq', label: 'FAQs', icon: '❓', subtitle: 'Common Questions' },
  { id: 'page-footer', label: 'Contact & Info', icon: '📍', subtitle: 'Location, Socials & Legal' },
];

const activeSectionId = ref('page-hero');
const isSnapEnabled = ref(true);

const scrollToSection = (id) => {
  activeSectionId.value = id;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const toggleSnapMode = () => {
  isSnapEnabled.value = !isSnapEnabled.value;
  if (isSnapEnabled.value) {
    document.documentElement.classList.add('ithunt-home-snapping');
    document.body.classList.add('ithunt-home-snapping');
  } else {
    document.documentElement.classList.remove('ithunt-home-snapping');
    document.body.classList.remove('ithunt-home-snapping');
  }
};

// Educational Hero Carousel Configuration (Image 2)
const heroSlideIdx = ref(0);
const heroSlides = [
  {
    badge: "🎓 NIELIT ACCREDITED & ISO 9001:2015 CERTIFIED",
    titlePrefix: "NIELIT Diploma Courses:",
    titleHighlight: "'O' Level, 'A' Level, 'B' Level",
    subtitle: "Admission Open for 2026 at Prayagraj Campus",
    pills: ["Classroom Batches", "100% Placement Support", "Practical Labs"],
    ctaPrimary: "Admission Open ➜",
    ctaPrimaryAction: () => emit('set-tab', 'admission'),
    ctaSecondary: "Explore Courses 📚",
    ctaSecondaryAction: () => emit('set-tab', 'courses')
  },
  {
    badge: "🚀 INDUSTRY SOFTWARE PRODUCTION TRACKS",
    titlePrefix: "Software Engineering & AI:",
    titleHighlight: "Full-Stack MERN, Python AI & Cloud",
    subtitle: "Live Client Deployments & Guaranteed 3-6 Months Internships",
    pills: ["Live Codebase", "Senior Architect Mentors", "Verified Certificate"],
    ctaPrimary: "Apply for Track ➜",
    ctaPrimaryAction: () => emit('set-tab', 'internships'),
    ctaSecondary: "View Syllabus 📚",
    ctaSecondaryAction: () => emit('set-tab', 'courses')
  },
  {
    badge: "💻 HIGH-DEMAND COMPUTER DIPLOMAS",
    titlePrefix: "Government Verified Diplomas:",
    titleHighlight: "ADCA, DCA & Tally Prime + GST",
    subtitle: "Complete Practical Computer Literacy & Office Management",
    pills: ["Govt. Recognized", "Daily Lab Practicals", "Job Placement"],
    ctaPrimary: "Enroll Today ➜",
    ctaPrimaryAction: () => emit('set-tab', 'admission'),
    ctaSecondary: "View Courses 📚",
    ctaSecondaryAction: () => emit('set-tab', 'courses')
  }
];

const currentHeroSlide = computed(() => heroSlides[heroSlideIdx.value]);

const nextHeroSlide = () => {
  heroSlideIdx.value = (heroSlideIdx.value + 1) % heroSlides.length;
};

const prevHeroSlide = () => {
  heroSlideIdx.value = (heroSlideIdx.value - 1 + heroSlides.length) % heroSlides.length;
};

let heroTimer = null;
onMounted(() => {
  heroTimer = setInterval(() => {
    nextHeroSlide();
  }, 7000);
});

onUnmounted(() => {
  if (heroTimer) clearInterval(heroTimer);
});

// Three Highlight Feature Cards (Image 2)
const highlightCards = [
  {
    id: 'nielit',
    icon: '🎓',
    theme: 'cyan',
    title: 'NIELIT Courses',
    desc: "Government-recognized 'O' Level, 'A' Level, 'B' Level & CCC certification with official syllabus & lab practicals.",
    badge: 'Govt. Accredited',
    actionText: 'Learn More ➜',
    action: () => emit('set-tab', 'courses')
  },
  {
    id: 'dev-tracks',
    icon: '🚀',
    theme: 'orange',
    title: 'Development Tracks',
    desc: 'Full-Stack MERN, Python AI, React, Flutter & Cloud DevOps with production client software and internships.',
    badge: 'High Placement',
    actionText: 'Learn More ➜',
    action: () => emit('set-tab', 'internships')
  },
  {
    id: 'courses-portfolio',
    icon: '💻',
    theme: 'teal',
    title: 'Courses Portfolio',
    desc: 'ADCA, DCA, Tally Prime + GST, Graphic Design & Web Designing diploma programs for fast career entry.',
    badge: 'Job Ready',
    actionText: 'Learn More ➜',
    action: () => emit('set-tab', 'courses')
  }
];

// Interactive 3D Laptop Application Form (Image 1)
const laptopForm = ref({
  candidateName: '',
  mobile: '',
  qualification: '',
  course: "NIELIT 'O' Level Diploma"
});

const submitLaptopForm = () => {
  if (!laptopForm.value.candidateName.trim() || !laptopForm.value.mobile.trim()) {
    alert('Please enter your Name and Mobile Number.');
    return;
  }
  emit('apply-course', {
    candidateName: laptopForm.value.candidateName,
    mobile: laptopForm.value.mobile,
    course: laptopForm.value.course
  });
};

// Section 4 Live Projects Data & Filter Categories (IT Hunt Style)
const projectCategories = [
  { id: 'all', name: 'All Solutions', icon: '⚡' },
  { id: 'mern', name: 'MERN & Web', icon: '🌐' },
  { id: 'ai', name: 'AI & Python', icon: '🤖' },
  { id: 'mobile', name: 'Mobile Apps', icon: '📱' },
  { id: 'cloud', name: 'Cloud & DevOps', icon: '☁️' }
];

const selectedProjectCategory = ref('all');

const liveProjectsList = [
  {
    id: 1,
    name: 'SaaS Billing & Invoice Engine',
    logo: '💳',
    category: 'FinTech Engineering',
    categoryKey: 'mern',
    platform: 'MERN Stack',
    description: 'Enterprise multi-tenant payment gateway processing recurring client subscriptions, webhooks, and automated PDF tax invoices.',
    features: ['Redis caching layer', 'Stripe & Razorpay integrations', 'Recurring billing and invoice workflows'],
    problem: 'Example brief: A subscription business needs one dependable way to manage recurring billing, payment events, and customer invoices across multiple organizations.',
    solution: 'Design a multi-tenant billing service with payment-provider integrations, idempotent webhook handling, automated invoice generation, and a cache layer for frequently accessed data.',
    technologies: ['React', 'Node.js', 'Express', 'Redis', 'PostgreSQL', 'Stripe', 'Razorpay'],
    screenshots: [],
    videoUrl: '',
    videoPoster: '',
    timeline: '',
    results: []
  },
  {
    id: 2,
    name: 'AI Post & Carousel Generator',
    logo: '🤖',
    category: 'Autonomous AI Platform',
    categoryKey: 'ai',
    platform: 'Python & Vue 3',
    description: 'Intelligent social media autopilot that reads website URLs, analyzes tone, and generates multi-slide carousels automatically.',
    features: ['Gemini AI integration', 'Canvas-based visual editor', 'Social content scheduling'],
    problem: 'Example brief: A marketing team spends significant time researching brand material and producing consistent social posts and carousel content.',
    solution: 'Create a workflow that extracts brand context from a website, drafts social copy and carousel content with an AI model, and provides a visual editor and scheduling tools.',
    technologies: ['Python', 'FastAPI', 'Gemini API', 'Vue 3', 'Canvas API'],
    screenshots: [],
    videoUrl: '',
    videoPoster: '',
    timeline: '',
    results: []
  },
  {
    id: 3,
    name: 'Logistics Fleet Tracking Portal',
    logo: '🚚',
    category: 'IoT & Real-Time Tracking',
    categoryKey: 'cloud',
    platform: 'Full-Stack Node.js',
    description: 'Live GPS vehicle telemetry dashboard with geospatial geofencing alerts, route analytics, and driver dispatch coordination.',
    features: ['Live telemetry stream', 'Geospatial route and geofence tools', 'Driver companion app'],
    problem: 'Example brief: A fleet operations team needs a shared view of vehicle locations, route activity, and dispatch events as they happen.',
    solution: 'Build a live tracking portal that streams vehicle telemetry, evaluates geofence events, and brings route insights and driver coordination into one interface.',
    technologies: ['Node.js', 'WebSockets', 'PostgreSQL', 'PostGIS', 'Mobile app'],
    screenshots: [],
    videoUrl: '',
    videoPoster: '',
    timeline: '',
    results: []
  },
  {
    id: 4,
    name: 'HealthPulse Telemedicine App',
    logo: '📱',
    category: 'Mobile & HealthTech',
    categoryKey: 'mobile',
    platform: 'Flutter & Dart',
    description: 'Cross-platform mobile application with WebRTC end-to-end encrypted video appointments, instant digital prescriptions, and EHR sync.',
    features: ['WebRTC video appointments', 'Secure patient record access', 'Realtime messaging'],
    problem: 'Example brief: Patients and clinicians need a convenient way to arrange remote consultations and access visit information from a mobile device.',
    solution: 'Develop a cross-platform app with video consultations, secure access to patient records, real-time messaging, and digital prescription workflows.',
    technologies: ['Flutter', 'Dart', 'WebRTC', 'Firebase', 'Node.js', 'Socket.IO'],
    screenshots: [],
    videoUrl: '',
    videoPoster: '',
    timeline: '',
    results: []
  },
  {
    id: 5,
    name: 'Next.js 15 HyperStore & CMS',
    logo: '🌐',
    category: 'Modern Web Platform',
    categoryKey: 'mern',
    platform: 'Next.js 15 & TS',
    description: 'Headless e-commerce store with incremental static regeneration, server actions, faceted search filters, and checkout flow.',
    features: ['Next.js 15 React Server Components', 'Tailored Algolia search', 'Optimized catalog and checkout flows'],
    problem: 'Example brief: An online retailer needs a flexible storefront that makes a large catalog easier to browse and supports a smooth purchase journey.',
    solution: 'Build a headless commerce experience with server-rendered pages, catalog filters and search, and an integrated checkout flow.',
    technologies: ['Next.js 15', 'TypeScript', 'React', 'Algolia', 'Server Actions'],
    screenshots: [],
    videoUrl: '',
    videoPoster: '',
    timeline: '',
    results: []
  },
  {
    id: 6,
    name: 'Central QR Credential Registry',
    logo: '📜',
    category: 'Govt & Cloud Registry',
    categoryKey: 'cloud',
    platform: 'Python & Cloud',
    description: 'Centralized public verification gateway with cryptographic QR verification for diplomas, marksheets, and internship letters.',
    features: ['SHA-256 document integrity checks', 'QR-based public verification', 'Automated PDF generation'],
    problem: 'Example brief: Organizations and document holders need a simple way to check whether a digital credential was issued and has not been altered.',
    solution: 'Create a public verification portal that links QR codes to issued records and checks document identifiers and integrity hashes.',
    technologies: ['Python', 'Cloud services', 'SHA-256', 'QR codes', 'PDF generation'],
    screenshots: [],
    videoUrl: '',
    videoPoster: '',
    timeline: '',
    results: []
  }
];

const filteredProjects = computed(() => {
  if (selectedProjectCategory.value === 'all') return liveProjectsList;
  return liveProjectsList.filter(p => p.categoryKey === selectedProjectCategory.value);
});

// Section 9 FAQ Accordion
const faqsList = [
  {
    q: 'Who is eligible to apply for the IT HUNT internship and training programs?',
    a: 'Students, graduates, and working professionals from BCA, MCA, B.Tech (CS/IT/ECE), B.Sc IT, or related fields are fully eligible. Even non-CS candidates with a strong passion for programming and problem-solving are welcome after our initial diagnostic round.'
  },
  {
    q: 'Do interns work on real client projects or dummy assignments?',
    a: '100% of our internship deliverables are based on active client requirements and real production software. You will push code to real GitHub repositories, use Docker containers, and deploy applications to live cloud servers.'
  },
  {
    q: 'What credentials and certifications do I receive upon graduation?',
    a: 'You receive an official ISO 9001:2015 verified Internship Completion Certificate, a personalized Letter of Recommendation (LOR) from our Director, and a verifiable digital certificate with an online QR code registry. For NIELIT courses, students receive central government recognized diploma certifications.'
  },
  {
    q: 'How does your placement support and partner company referral work?',
    a: 'We maintain hiring partnerships with 50+ tech companies and startups. Our dedicated placement cell conducts mock technical interviews, algorithmic problem-solving sprints, resume revamping, and directly schedules interviews for high-performing interns.'
  },
  {
    q: 'Are flexible weekend and online batches available?',
    a: 'Yes! We offer both offline campus workstations in Holagarh, Prayagraj, and live interactive online batches for remote students and working professionals, with flexible morning, evening, and weekend timings.'
  }
];

const openFaqIdx = ref(0);
const toggleFaq = (idx) => {
  openFaqIdx.value = openFaqIdx.value === idx ? -1 : idx;
};

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%231e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8">IT HUNT Center</text></svg>';
};

let sectionObserver = null;

const handleKeyDown = (e) => {
  const tag = (e.target?.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;

  const currentIdx = homeSections.findIndex(s => s.id === activeSectionId.value);
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    if (currentIdx < homeSections.length - 1) {
      e.preventDefault();
      scrollToSection(homeSections[currentIdx + 1].id);
    }
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    if (currentIdx > 0) {
      e.preventDefault();
      scrollToSection(homeSections[currentIdx - 1].id);
    }
  } else if (e.key === 'Home') {
    e.preventDefault();
    scrollToSection(homeSections[0].id);
  } else if (e.key === 'End') {
    e.preventDefault();
    scrollToSection(homeSections[homeSections.length - 1].id);
  }
};

const handleScrollBounds = () => {
  if (window.scrollY < 60) {
    activeSectionId.value = 'page-hero';
  } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
    activeSectionId.value = 'page-footer';
  }
};

const initSectionObserver = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const observerOptions = {
    threshold: [0.2, 0.45, 0.75],
    rootMargin: '-10% 0px -10% 0px'
  };

  sectionObserver = new IntersectionObserver((entries) => {
    let highestRatio = 0;
    let mostVisibleId = null;

    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
        highestRatio = entry.intersectionRatio;
        mostVisibleId = entry.target.id;
      }
    });

    if (mostVisibleId && highestRatio > 0.25) {
      activeSectionId.value = mostVisibleId;
    }
  }, observerOptions);

  homeSections.forEach(sec => {
    const el = document.getElementById(sec.id);
    if (el) sectionObserver.observe(el);
  });
};

onMounted(() => {
  document.documentElement.classList.add('ithunt-home-snapping');
  document.body.classList.add('ithunt-home-snapping');
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('scroll', handleScrollBounds, { passive: true });

  setTimeout(initSectionObserver, 200);
});

onUnmounted(() => {
  document.documentElement.classList.remove('ithunt-home-snapping');
  document.body.classList.remove('ithunt-home-snapping');
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('scroll', handleScrollBounds);
  if (sectionObserver) sectionObserver.disconnect();
});
</script>

<style scoped>
/* ==========================================================================
   IT HUNT LAYOUT & INTERACTION STRUCTURE WITH NATIVE IT HUNT BRAND PALETTE
   ==========================================================================
   Uses the project's original CSS variables:
   - Primary Accent: var(--color-ai-orange, #f97316) & var(--color-ai-yellow, #f59e0b)
   - Gradients: var(--gradient-ai-hero) & var(--gradient-ai-btn)
   - Surfaces: var(--bg-cyber-dark), var(--bg-card-glass), var(--border-cyber)
   - Supports both dark mode and light mode naturally via CSS variables!
   ========================================================================== */

.ithunt-wrapper {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: var(--bg-cyber-dark, #070a12);
  color: var(--text-main, #f8fafc);
  font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
}

/* ==========================================================================
   VERTICAL ONE-PAGE-PER-SECTION PAGINATION LAYOUT
   ========================================================================== */

/* Enable scroll snap on html/body when home snapping is active */
:global(html.ithunt-home-snapping) {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

:global(body.ithunt-home-snapping) {
  overflow-y: scroll;
}

/* Base Full-Viewport Section Style */
.ithunt-home-section {
  min-height: calc(100vh - var(--navbar-height, 72px));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  scroll-margin-top: var(--navbar-height, 72px);
  box-sizing: border-box;
  padding: 3rem 1.5rem 4rem;
  width: 100%;
}

.ithunt-home-section > .container {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
}

/* Hero Section Specific Page 1 Tuning */
.ithunt-hero.ithunt-home-section {
  padding-top: 2rem;
  padding-bottom: 4rem;
  justify-content: center;
}

.ithunt-stats-band-hero {
  margin-top: 2rem;
  width: 100%;
}

.ithunt-stats-band-hero .stats-card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

/* Page 2: Showcase Section Tuning */
.ithunt-showcase-section {
  padding-top: 2.5rem;
  padding-bottom: 4rem;
}

.ithunt-showcase-section .section-title-wrap {
  margin-bottom: 1.5rem;
}

/* In-Page Jump Pill / Next Section Indicator */
.section-scroll-pill {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.15rem;
  background: rgba(15, 23, 42, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(249, 115, 22, 0.35);
  border-radius: 9999px;
  color: #ffffff;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
}

.section-scroll-pill:hover {
  background: rgba(249, 115, 22, 0.22);
  border-color: #f97316;
  color: #f97316;
  transform: translateX(-50%) translateY(-2px);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.35);
}

.scroll-arrow-anim {
  display: inline-block;
  color: var(--color-ai-orange, #f97316);
  font-weight: 800;
  animation: bounce-arrow 1.6s infinite ease-in-out;
}

@keyframes bounce-arrow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}

:global(body.light-theme) .section-scroll-pill {
  background: rgba(255, 255, 255, 0.92);
  border-color: rgba(249, 115, 22, 0.45);
  color: #0f172a;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

:global(body.light-theme) .section-scroll-pill:hover {
  background: #ffffff;
  color: #ea580c;
  border-color: #ea580c;
}

/* Mobile & Tablet Responsiveness */
@media (max-width: 991px) {
  :global(html.ithunt-home-snapping) {
    scroll-snap-type: y proximity;
  }

  .ithunt-home-section {
    min-height: auto;
    padding: 3.5rem 1rem 3.5rem;
    scroll-snap-align: start;
    scroll-snap-stop: normal;
  }

  .ithunt-stats-band-hero .stats-card-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-scroll-pill {
    display: none;
  }
}

/* ==========================================================================
   1. HERO SECTION
   ========================================================================== */

.ithunt-hero {
  position: relative;
  padding: 5rem 1rem 4rem;
  overflow: hidden;
  background: radial-gradient(circle at 50% -10%, var(--glow-primary, rgba(99, 102, 241, 0.18)) 0%, transparent 65%);
}

.ithunt-hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(95px);
  pointer-events: none;
  z-index: 0;
}

.ithunt-hero-glow-1 {
  top: -12%;
  left: 18%;
  width: 520px;
  height: 520px;
  background: var(--glow-primary, rgba(99, 102, 241, 0.22));
}

.ithunt-hero-glow-2 {
  top: 12%;
  right: 14%;
  width: 480px;
  height: 480px;
  background: var(--glow-violet, rgba(139, 92, 246, 0.18));
}

.ithunt-hero-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

/* Pill Badge */
.ithunt-badge-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.ithunt-pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.45rem 1.15rem;
  border-radius: var(--radius-full, 9999px);
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid var(--border-cyber-glow, rgba(99, 102, 241, 0.3));
  color: var(--color-ai-indigo, #6366f1);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.1);
}

.ithunt-pill-badge.small {
  padding: 0.35rem 0.9rem;
  font-size: 0.75rem;
  margin-bottom: 1rem;
}

.ithunt-badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-ai-indigo, #6366f1);
  box-shadow: 0 0 10px var(--color-ai-indigo, #6366f1);
  animation: pulse-dot-anim 2s infinite ease-in-out;
}

@keyframes pulse-dot-anim {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.6; }
}

/* Hero Headline */
.ithunt-hero-headline {
  font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
  font-size: clamp(2.4rem, 5.2vw, 4.4rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.035em;
  color: #ffffff !important;
  margin-bottom: 1.5rem;
  max-width: 1050px;
  margin-left: auto;
  margin-right: auto;
}

.ithunt-gradient-text {
  background: var(--gradient-ai-hero, linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #f97316 100%));
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.text-brand, .text-cyan {
  color: var(--color-ai-indigo, #6366f1) !important;
}

.text-green {
  color: #10B981 !important;
}

/* Subtitle */
.ithunt-hero-subtitle {
  font-size: clamp(1.05rem, 1.8vw, 1.25rem);
  color: #cbd5e1 !important;
  line-height: 1.65;
  max-width: 820px;
  margin: 0 auto 2rem;
}

/* Platform Pills & Formats (IT Hunt Style) */
.ithunt-platform-pills-row {
  font-size: clamp(0.92rem, 1.5vw, 1.1rem);
  color: var(--text-muted, #94a3b8);
  margin-bottom: 0.65rem;
  font-weight: 500;
}

.platform-link {
  color: var(--text-main, #f8fafc);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  border-bottom: 1px dashed rgba(99, 102, 241, 0.4);
}

.platform-link:hover {
  color: var(--color-ai-indigo, #6366f1);
  border-bottom-color: var(--color-ai-indigo, #6366f1);
}

.ithunt-track-formats-row {
  font-size: clamp(0.82rem, 1.3vw, 0.92rem);
  color: var(--text-dim, #64748b);
  margin-bottom: 1.35rem;
}

.track-format-link {
  color: var(--text-muted, #94a3b8);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease;
}

.track-format-link:hover {
  color: var(--color-ai-indigo, #6366f1);
}

/* Signature IT Hunt Hand-Drawn Brush Stroke Underline (Animated Green Glow) */
.ithunt-brush-wrap {
  position: relative;
  display: inline-block;
  font-weight: 700;
  color: var(--text-main, #ffffff);
  white-space: nowrap;
}

.ithunt-brush-stroke {
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 12px;
  overflow: visible;
  pointer-events: none;
  animation: greenUnderlineGlow 2.8s ease-in-out infinite;
}

.ithunt-brush-stroke .brush-path-main {
  stroke: #22c55e;
  stroke: url(#ithuntGreenBrushGradient);
  stroke-dasharray: 140;
  stroke-dashoffset: 140;
  animation: brushDrawLoop 3.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.ithunt-brush-stroke .brush-path-sub {
  stroke: #4ade80;
  stroke-dasharray: 140;
  stroke-dashoffset: 140;
  animation: brushDrawLoop 3.6s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.18s;
}

@keyframes brushDrawLoop {
  0% {
    stroke-dashoffset: 140;
    opacity: 0;
  }
  28% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  82% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  94%, 100% {
    stroke-dashoffset: -140;
    opacity: 0;
  }
}

@keyframes greenUnderlineGlow {
  0%, 100% {
    filter: drop-shadow(0 0 3px rgba(34, 197, 94, 0.55));
  }
  50% {
    filter: drop-shadow(0 0 9px rgba(34, 197, 94, 0.95)) drop-shadow(0 0 16px rgba(74, 222, 128, 0.5));
  }
}

:global(body.light-theme) .ithunt-brush-wrap {
  color: #0f172a !important;
}

:global(body.light-theme) .ithunt-brush-stroke {
  animation: greenUnderlineGlowLight 2.8s ease-in-out infinite;
}

@keyframes greenUnderlineGlowLight {
  0%, 100% {
    filter: drop-shadow(0 0 2px rgba(22, 163, 74, 0.45));
  }
  50% {
    filter: drop-shadow(0 0 7px rgba(22, 163, 74, 0.8)) drop-shadow(0 0 14px rgba(34, 197, 94, 0.35));
  }
}

/* Dual Hero CTA Buttons (IT Hunt Style) */
.ithunt-hero-cta-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.ithunt-hero-main-cta {
  padding: 0.95rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 12px;
  min-height: 52px;
  box-shadow: 0 4px 20px var(--glow-primary, rgba(99, 102, 241, 0.35));
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.ithunt-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--bg-card-glass, rgba(17, 24, 39, 0.8));
  border: 1.5px solid var(--border-cyber, rgba(255, 255, 255, 0.12));
  color: var(--text-main, #ffffff);
  padding: 0.95rem 1.85rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.ithunt-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--color-ai-indigo, #6366f1);
  color: var(--color-ai-indigo, #6366f1);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.2);
}

.ithunt-pricing-microtext {
  font-size: 0.85rem;
  color: var(--text-muted, #94a3b8);
  margin-bottom: 3.25rem;
}

/* Buttons */
.ithunt-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--gradient-ai-btn, linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%));
  color: #ffffff;
  border: none;
  font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.85rem 1.6rem;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 18px var(--glow-primary, rgba(99, 102, 241, 0.4));
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.ithunt-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--glow-primary, rgba(99, 102, 241, 0.6));
}

.ithunt-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.12));
  color: var(--text-main, #f8fafc);
  font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.85rem 1.6rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.ithunt-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: var(--color-ai-indigo, #6366f1);
  color: #ffffff;
}

.ithunt-btn-lg {
  padding: 1rem 2.2rem;
  font-size: 1.05rem;
}

.w-full {
  width: 100%;
}

/* Guarantees Row */
.ithunt-guarantee-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem 1.4rem;
  margin-top: 1.5rem;
  margin-bottom: 3.25rem;
  font-size: 0.88rem;
  color: var(--text-muted, #94a3b8);
}

.guarantee-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.guarantee-icon {
  color: #10B981;
  font-weight: 800;
}

.guarantee-sep {
  color: #475569;
}

/* ==========================================================================
   HERO INTERACTIVE SHOWCASE CARD
   ========================================================================== */

.ithunt-showcase-container {
  max-width: 1100px;
  margin: 0 auto;
  text-align: left;
}

.ithunt-showcase-card {
  background: var(--bg-card-glass, rgba(17, 24, 39, 0.88));
  border: 1px solid var(--border-cyber-glow, rgba(99, 102, 241, 0.28));
  border-radius: var(--radius-lg, 20px);
  box-shadow: 0 25px 65px rgba(0, 0, 0, 0.55), 0 0 35px var(--glow-primary, rgba(99, 102, 241, 0.12));
  overflow: hidden;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Card Header */
.showcase-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  background: rgba(11, 15, 25, 0.85);
  border-bottom: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  flex-wrap: wrap;
  gap: 0.75rem;
}

.mac-dots {
  display: flex;
  align-items: center;
  gap: 6px;
}

.mac-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.mac-dot.red { background: #ef4444; }
.mac-dot.yellow { background: #f59e0b; }
.mac-dot.green { background: #10b981; }

.showcase-tabs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
}

.showcase-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-muted, #94a3b8);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.showcase-tab-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

.showcase-tab-btn.active {
  color: var(--color-ai-indigo, #6366f1);
  background: rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.35);
}

.showcase-badge-status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #10B981;
  letter-spacing: 0.05em;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 8px #10B981;
  animation: pulse-dot-anim 1.5s infinite;
}

/* Card Body */
.showcase-card-body {
  display: grid;
  grid-template-columns: minmax(0, 1.22fr) minmax(0, 0.98fr);
  gap: 1.25rem;
  padding: 1.25rem;
  box-sizing: border-box;
  align-items: stretch;
}

.showcase-left-pane,
.showcase-right-pane {
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}

.project-headline-wrap {
  margin-bottom: 0.75rem;
}

.project-track-chip {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-ai-indigo, #6366f1);
  background: rgba(99, 102, 241, 0.12);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.35rem;
  text-transform: uppercase;
}

.project-main-title {
  font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
  font-size: 1.12rem;
  font-weight: 700;
  color: var(--text-main, #ffffff);
  margin-bottom: 0.3rem;
  line-height: 1.35;
}

.project-brief {
  font-size: 0.82rem;
  color: var(--text-muted, #94a3b8);
  line-height: 1.45;
}

/* Terminal Box */
.showcase-terminal-box {
  background: #090d16;
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  border-radius: 10px;
  padding: 0.65rem 0.85rem;
  margin-bottom: 0.75rem;
  font-family: var(--font-mono, 'Fira Code', monospace);
}

.terminal-titlebar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  color: #94a3b8;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 0.4rem;
  margin-bottom: 0.5rem;
}

.terminal-code {
  margin: 0;
  font-size: 0.74rem;
  line-height: 1.5;
  overflow-x: auto;
  color: #f1f5f9;
}

.terminal-line {
  display: flex;
  align-items: baseline;
  color: #f1f5f9;
}

.line-num {
  width: 24px;
  color: #64748b;
  font-size: 0.7rem;
  user-select: none;
  flex-shrink: 0;
}

.line-content {
  flex: 1;
  white-space: pre;
  color: #f1f5f9;
}

/* Syntax Token Colors (Dark Mode) */
:deep(.code-kw) { color: #fb7185; font-weight: 700; }
:deep(.code-type) { color: #c084fc; font-weight: 600; }
:deep(.code-fn) { color: #38bdf8; font-weight: 600; }
:deep(.code-str) { color: #34d399; font-weight: 500; }
:deep(.code-prop) { color: #fbbf24; font-weight: 600; }
:deep(.code-bool) { color: #f97316; font-weight: 700; }
:deep(.code-dec) { color: #e879f9; font-style: italic; }
:deep(.code-comment) { color: #64748b; font-style: italic; }

/* Stack Badges */
.project-stack-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.stack-badge {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-size: 0.72rem;
  color: #cbd5e1;
  font-weight: 600;
}

/* Right Pane */
.metrics-panel-card {
  background: rgba(11, 15, 25, 0.65);
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.06));
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.metrics-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.85rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-wrap: wrap;
  gap: 0.4rem;
}

.metrics-panel-header h4 {
  font-size: 0.82rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.branch-tag {
  font-size: 0.68rem;
  background: rgba(99, 102, 241, 0.15);
  color: var(--color-ai-indigo, #6366f1);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  white-space: nowrap;
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
}

.metric-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.05));
  padding: 0.6rem 0.65rem;
  border-radius: 8px;
  min-width: 0;
}

.metric-val {
  font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
  font-size: 1.1rem;
  font-weight: 800;
  display: block;
  margin-bottom: 0.15rem;
  color: #ffffff;
  word-break: break-word;
}

.metric-lbl {
  font-size: 0.68rem;
  color: #94a3b8;
  font-weight: 600;
}

.review-status-card {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
  margin-bottom: 0.85rem;
}

.reviewer-avatar {
  font-size: 1.25rem;
}

.reviewer-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: #10B981;
}

.reviewer-comment {
  font-size: 0.72rem;
  color: #cbd5e1;
  font-style: italic;
}

.showcase-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
}

/* ==========================================================================
   2. STATS COUNTER BAND
   ========================================================================== */

.ithunt-stats-band {
  background: rgba(11, 15, 25, 0.7);
  border-top: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.06));
  border-bottom: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.06));
  padding: 2.5rem 1rem;
}

.stats-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stat-pill-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-card-glass, rgba(17, 24, 39, 0.75));
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  padding: 1.1rem 1.35rem;
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.stat-pill-card:hover {
  border-color: var(--border-cyber-glow, rgba(99, 102, 241, 0.35));
  background: rgba(99, 102, 241, 0.06);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.35), 0 0 15px rgba(99, 102, 241, 0.12);
}

.stat-num {
  font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-main, #f8fafc);
}

.stat-micro-note {
  font-size: 0.72rem;
  color: var(--text-dim, #64748b);
  margin-top: 0.2rem;
}

/* ==========================================================================
   GENERIC SECTION HEADINGS
   ========================================================================== */

.ithunt-section {
  padding: 5rem 1rem;
  position: relative;
}

/* ─── EVEN SECTIONS: DARK MODE BY DEFAULT (Cohesive Dark Canvas) ─── */
.ithunt-section-even,
.ithunt-section-alt {
  background: #0e1322 !important;
  color: #f8fafc !important;
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.ithunt-section-even .ithunt-section-heading,
.ithunt-section-alt .ithunt-section-heading {
  color: #ffffff !important;
}

.ithunt-section-even .ithunt-section-desc,
.ithunt-section-alt .ithunt-section-desc {
  color: #94a3b8 !important;
}

.ithunt-section-even .ithunt-pill-badge,
.ithunt-section-alt .ithunt-pill-badge {
  background: rgba(99, 102, 241, 0.1) !important;
  border: 1px solid rgba(99, 102, 241, 0.3) !important;
  color: var(--color-ai-indigo, #6366f1) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
}

.ithunt-section-even .ithunt-badge-dot,
.ithunt-section-alt .ithunt-badge-dot {
  background-color: var(--color-ai-indigo, #6366f1) !important;
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.4) !important;
}

/* Homework Cards in Dark Mode */
.ithunt-section-even .homework-card,
.ithunt-section-alt .homework-card {
  background: var(--bg-card-glass, rgba(17, 24, 39, 0.8)) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 16px;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.ithunt-section-even .homework-card:hover,
.ithunt-section-alt .homework-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.5) !important;
  box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.2) !important;
}

.ithunt-section-even .card-icon-wrap,
.ithunt-section-alt .card-icon-wrap {
  background: rgba(99, 102, 241, 0.12) !important;
  color: var(--color-ai-indigo, #6366f1) !important;
}

.ithunt-section-even .homework-card-title,
.ithunt-section-alt .homework-card-title {
  color: #ffffff !important;
  font-weight: 700;
}

.ithunt-section-even .homework-card-desc,
.ithunt-section-alt .homework-card-desc {
  color: #94a3b8 !important;
}

.ithunt-section-even .pill-chip,
.ithunt-section-alt .pill-chip {
  background: rgba(99, 102, 241, 0.12) !important;
  color: #a5b4fc !important;
  border: 1px solid rgba(99, 102, 241, 0.3) !important;
  font-weight: 700;
}

/* Category Tabs in Dark Mode */
.ithunt-section-even .ithunt-cat-tabs-pill,
.ithunt-section-alt .ithunt-cat-tabs-pill {
  background: rgba(17, 24, 39, 0.85) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;
}

.ithunt-section-even .ithunt-cat-tab-btn,
.ithunt-section-alt .ithunt-cat-tab-btn {
  color: #94a3b8 !important;
}

.ithunt-section-even .ithunt-cat-tab-btn:hover,
.ithunt-section-alt .ithunt-cat-tab-btn:hover {
  color: #ffffff !important;
  background: rgba(255, 255, 255, 0.06) !important;
}

.ithunt-section-even .ithunt-cat-tab-btn.active,
.ithunt-section-alt .ithunt-cat-tab-btn.active {
  background: var(--gradient-ai-btn, linear-gradient(135deg, #6366f1, #8b5cf6)) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35) !important;
}

/* Example Cards in Dark Mode */
.ithunt-section-even .example-card,
.ithunt-section-alt .example-card {
  background: var(--bg-card-glass, rgba(17, 24, 39, 0.8)) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 16px;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.ithunt-section-even .example-card:hover,
.ithunt-section-alt .example-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.5) !important;
  box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.2) !important;
}

.ithunt-section-even .example-card-header,
.ithunt-section-alt .example-card-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
}

.ithunt-section-even .example-client-name,
.ithunt-section-alt .example-client-name {
  color: #ffffff !important;
  font-weight: 700;
}

.ithunt-section-even .example-meta-text,
.ithunt-section-alt .example-meta-text {
  color: #94a3b8 !important;
}

.ithunt-section-even .example-platform-pill,
.ithunt-section-alt .example-platform-pill {
  background: rgba(99, 102, 241, 0.12) !important;
  color: #a5b4fc !important;
  border: 1px solid rgba(99, 102, 241, 0.3) !important;
  font-weight: 700;
}

.ithunt-section-even .example-desc-text,
.ithunt-section-alt .example-desc-text {
  color: #cbd5e1 !important;
}

.ithunt-section-even .feature-bullet,
.ithunt-section-alt .feature-bullet {
  color: #94a3b8 !important;
}

.ithunt-section-even .bullet-dot,
.ithunt-section-alt .bullet-dot {
  background: var(--color-ai-indigo, #6366f1) !important;
}

.ithunt-section-even .example-card-footer,
.ithunt-section-alt .example-card-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
}

.ithunt-section-even .example-view-btn,
.ithunt-section-alt .example-view-btn {
  background: rgba(99, 102, 241, 0.12) !important;
  border: 1px solid rgba(99, 102, 241, 0.3) !important;
  color: #a5b4fc !important;
  font-weight: 700 !important;
}

.ithunt-section-even .example-view-btn:hover,
.ithunt-section-alt .example-view-btn:hover {
  background: var(--gradient-ai-btn) !important;
  color: #ffffff !important;
  border-color: transparent !important;
}

/* Bento Grid in Dark Mode */
.ithunt-section-even .bento-card,
.ithunt-section-alt .bento-card {
  background: var(--bg-card-glass, rgba(17, 24, 39, 0.8)) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 16px;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.ithunt-section-even .bento-card:hover,
.ithunt-section-alt .bento-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.5) !important;
  box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.2) !important;
}

.ithunt-section-even .bento-card-title,
.ithunt-section-alt .bento-card-title {
  color: #ffffff !important;
  font-weight: 700;
}

.ithunt-section-even .bento-card-desc,
.ithunt-section-alt .bento-card-desc {
  color: #94a3b8 !important;
}

.ithunt-section-even .bento-highlight-pill,
.ithunt-section-alt .bento-highlight-pill {
  display: inline-block;
  padding: 0.35rem 0.8rem;
  border-radius: 99px;
  width: fit-content;
  font-size: 0.78rem;
  font-weight: 800;
}

.ithunt-section-even .bento-highlight-pill.text-brand,
.ithunt-section-alt .bento-highlight-pill.text-brand {
  background: rgba(99, 102, 241, 0.12) !important;
  color: #a5b4fc !important;
  border: 1px solid rgba(99, 102, 241, 0.3) !important;
}

.ithunt-section-even .bento-highlight-pill.text-green,
.ithunt-section-alt .bento-highlight-pill.text-green {
  background: rgba(16, 185, 129, 0.12) !important;
  color: #34d399 !important;
  border: 1px solid rgba(16, 185, 129, 0.3) !important;
}

/* FAQ Accordion in Dark Mode */
.ithunt-section-even .faq-accordion-item,
.ithunt-section-alt .faq-accordion-item {
  background: var(--bg-card-glass, rgba(17, 24, 39, 0.8)) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
  border-radius: 14px;
}

.ithunt-section-even .faq-accordion-item:hover,
.ithunt-section-alt .faq-accordion-item:hover {
  border-color: rgba(99, 102, 241, 0.45) !important;
}

.ithunt-section-even .faq-accordion-item.open,
.ithunt-section-alt .faq-accordion-item.open {
  border-color: var(--color-ai-indigo, #6366f1) !important;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.2) !important;
}

.ithunt-section-even .faq-question-bar,
.ithunt-section-alt .faq-question-bar {
  background: transparent !important;
}

.ithunt-section-even .faq-question-text,
.ithunt-section-alt .faq-question-text {
  color: #ffffff !important;
  font-weight: 700;
}

.ithunt-section-even .faq-chevron-icon,
.ithunt-section-alt .faq-chevron-icon {
  color: var(--color-ai-indigo, #6366f1) !important;
  font-weight: 800;
}

.ithunt-section-even .faq-answer-container,
.ithunt-section-alt .faq-answer-container {
  border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
  background: rgba(11, 15, 25, 0.6) !important;
}

.ithunt-section-even .faq-answer-text,
.ithunt-section-alt .faq-answer-text {
  color: #94a3b8 !important;
  line-height: 1.65;
}

/* ─── ODD SECTIONS: DARK MODE (Cohesive Dark Obsidian Canvas) ─── */
.ithunt-section-odd,
.ithunt-section-base {
  background: #0b0f19 !important;
  color: #f8fafc !important;
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.ithunt-hero.ithunt-section-odd {
  background: radial-gradient(circle at 50% -10%, var(--glow-primary, rgba(99, 102, 241, 0.18)) 0%, #0b0f19 65%) !important;
  border-top: none;
}

.ithunt-hero.ithunt-section-odd .ithunt-hero-headline {
  color: #ffffff !important;
}

.ithunt-hero.ithunt-section-odd .ithunt-hero-subtitle {
  color: #cbd5e1 !important;
}

.ithunt-hero.ithunt-section-odd .guarantee-item {
  color: #cbd5e1 !important;
}

.ithunt-cta-section.ithunt-section-odd {
  background: #0b0f19 !important;
}

.hiw-section.ithunt-section-odd {
  background: #090e1a !important;
}

.ithunt-section-odd .ithunt-section-heading,
.ithunt-section-base .ithunt-section-heading {
  color: #ffffff !important;
}

.ithunt-section-odd .ithunt-section-desc,
.ithunt-section-base .ithunt-section-desc {
  color: #94a3b8 !important;
}

.ithunt-section-odd .ithunt-pill-badge,
.ithunt-section-base .ithunt-pill-badge {
  background: rgba(249, 115, 22, 0.08) !important;
  border: 1px solid rgba(249, 115, 22, 0.35) !important;
  color: #f97316 !important;
}

.ithunt-section-odd .ithunt-badge-dot,
.ithunt-section-base .ithunt-badge-dot {
  background-color: #f97316 !important;
  box-shadow: 0 0 10px #f97316 !important;
}

/* Odd Section 3: Three Core Tracks Cards in Dark Mode */
.ithunt-section-odd .accelerator-card,
.ithunt-section-base .accelerator-card {
  background: rgba(15, 23, 42, 0.85) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35) !important;
}

.ithunt-section-odd .accelerator-card:hover,
.ithunt-section-base .accelerator-card:hover {
  border-color: rgba(249, 115, 22, 0.45) !important;
  transform: translateY(-4px);
}

.ithunt-section-odd .accelerator-card.featured,
.ithunt-section-base .accelerator-card.featured {
  border-color: #ea580c !important;
  box-shadow: 0 14px 40px rgba(234, 88, 12, 0.25) !important;
}

.ithunt-section-odd .acc-format-badge,
.ithunt-section-base .acc-format-badge {
  background: rgba(249, 115, 22, 0.15) !important;
  color: #f97316 !important;
}

.ithunt-section-odd .acc-title,
.ithunt-section-base .acc-title {
  color: #ffffff !important;
}

.ithunt-section-odd .acc-sub,
.ithunt-section-base .acc-sub {
  color: #94a3b8 !important;
}

.ithunt-section-odd .acc-deliverables-title,
.ithunt-section-base .acc-deliverables-title {
  color: #e2e8f0 !important;
}

.ithunt-section-odd .acc-list li,
.ithunt-section-base .acc-list li {
  color: #cbd5e1 !important;
}

.ithunt-section-odd .acc-cost-line,
.ithunt-section-base .acc-cost-line {
  color: #94a3b8 !important;
}

/* Odd Section 5: How It Works Accordion in Dark Mode */
.ithunt-section-odd .hiw-acc-trigger,
.hiw-section.ithunt-section-odd .hiw-acc-trigger {
  background: rgba(15, 23, 42, 0.85) !important;
  border: 1px solid rgba(255, 255, 255, 0.09) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
}

.ithunt-section-odd .hiw-acc-trigger:hover,
.hiw-section.ithunt-section-odd .hiw-acc-trigger:hover {
  background: rgba(22, 33, 58, 0.85) !important;
  border-color: rgba(249, 115, 22, 0.4) !important;
}

.ithunt-section-odd .hiw-acc-open .hiw-acc-trigger,
.hiw-section.ithunt-section-odd .hiw-acc-open .hiw-acc-trigger {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.12), rgba(15, 23, 42, 0.95)) !important;
  border-color: rgba(249, 115, 22, 0.55) !important;
  box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.25), 0 8px 28px rgba(0, 0, 0, 0.25) !important;
}

.ithunt-section-odd .hiw-title,
.hiw-section.ithunt-section-odd .hiw-title {
  color: #ffffff !important;
}

.ithunt-section-odd .hiw-phase,
.hiw-section.ithunt-section-odd .hiw-phase {
  color: #f97316 !important;
}

.ithunt-section-odd .hiw-progress-tag,
.hiw-section.ithunt-section-odd .hiw-progress-tag {
  background: rgba(249, 115, 22, 0.12) !important;
  color: #f97316 !important;
  border: 1px solid rgba(249, 115, 22, 0.3) !important;
}

.ithunt-section-odd .hiw-chevron,
.hiw-section.ithunt-section-odd .hiw-chevron {
  color: #94a3b8 !important;
}

.ithunt-section-odd .hiw-chevron.rotated,
.hiw-section.ithunt-section-odd .hiw-chevron.rotated {
  color: #f97316 !important;
}

.ithunt-section-odd .hiw-acc-body,
.hiw-section.ithunt-section-odd .hiw-acc-body {
  background: rgba(11, 17, 33, 0.95) !important;
  border: 1px solid rgba(249, 115, 22, 0.35) !important;
  border-top: none !important;
}

.ithunt-section-odd .hiw-desc,
.hiw-section.ithunt-section-odd .hiw-desc {
  color: #94a3b8 !important;
}

.ithunt-section-odd .hiw-point,
.hiw-section.ithunt-section-odd .hiw-point {
  color: #e2e8f0 !important;
}

/* Odd Section 7: Founders & Leadership in Dark Mode */
.ithunt-section-odd .founder-card {
  background: rgba(15, 23, 42, 0.85) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35) !important;
}

.ithunt-section-odd .founder-card:hover {
  border-color: rgba(249, 115, 22, 0.45) !important;
}

.ithunt-section-odd .founder-badge {
  color: #f97316 !important;
  font-weight: 800;
}

.ithunt-section-odd .founder-name {
  color: #ffffff !important;
  font-weight: 800;
}

.ithunt-section-odd .founder-role {
  color: #94a3b8 !important;
}

.ithunt-section-odd .founder-quote {
  color: #cbd5e1 !important;
}

.ithunt-section-odd .skill-tag {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #cbd5e1 !important;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Odd Section 9: CTA Banner in Dark Mode */
.ithunt-section-odd .ithunt-cta-banner {
  background: rgba(17, 24, 39, 0.9) !important;
  border: 1.5px solid rgba(99, 102, 241, 0.45) !important;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.55), 0 0 40px rgba(99, 102, 241, 0.2) !important;
}

.ithunt-section-odd .cta-main-title {
  color: #ffffff !important;
}

.ithunt-section-odd .cta-subtitle {
  color: #94a3b8 !important;
}

.ithunt-section-odd .cta-micro-guarantee {
  color: #64748b !important;
}

.section-title-wrap {
  max-width: 850px;
  margin: 0 auto 3.5rem;
}

.text-center {
  text-align: center;
}

.ithunt-section-heading {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: clamp(2rem, 3.8vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text-main, #f8fafc);
}

.ithunt-section-desc {
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--text-muted, #94a3b8);
}

/* ==========================================================================
   3. HOMEWORK CARDS (IT Hunt Section 2)
   ========================================================================== */

.homework-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.homework-card {
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.7));
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  border-radius: 16px;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.homework-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.35);
  border-color: rgba(249, 115, 22, 0.4);
}

.card-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(249, 115, 22, 0.12);
  color: var(--color-ai-orange, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.homework-card-title {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main, #ffffff);
  margin-bottom: 0.75rem;
}

.homework-card-desc {
  font-size: 0.92rem;
  color: var(--text-muted, #94a3b8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.homework-card-footer {
  margin-top: auto;
}

.pill-chip {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-ai-orange, #f97316);
  background: rgba(249, 115, 22, 0.1);
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
}

/* ==========================================================================
   4. ACCELERATORS GRID (IT Hunt Section 3 Format Cards)
   ========================================================================== */

.accelerators-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1150px;
  margin: 0 auto;
}

.accelerator-card {
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.7));
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.1));
  border-radius: 20px;
  padding: 2.25rem 1.75rem;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.accelerator-card:hover {
  border-color: rgba(249, 115, 22, 0.4);
  transform: translateY(-4px);
}

.accelerator-card.featured {
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.95));
  border: 2px solid var(--color-ai-orange, #f97316);
  box-shadow: 0 15px 40px var(--glow-orange, rgba(249, 115, 22, 0.25));
}

.acc-popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-ai-orange, #f97316);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.2rem 0.8rem;
  border-radius: var(--radius-full, 9999px);
  letter-spacing: 0.08em;
}

.acc-format-badge {
  font-size: 0.75rem;
  color: var(--color-ai-orange, #f97316);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.acc-title {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-main, #ffffff);
  margin: 0.4rem 0 0.2rem;
}

.acc-sub {
  font-size: 0.88rem;
  color: var(--text-muted, #94a3b8);
  margin-bottom: 1.5rem;
}

.acc-deliverables-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #cbd5e1;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.acc-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
}

.acc-list li {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: #cbd5e1;
  margin-bottom: 0.6rem;
  line-height: 1.4;
}

.check {
  color: #10B981;
  font-weight: 800;
}

.acc-footer {
  margin-top: auto;
}

.acc-cost-line {
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-muted, #94a3b8);
  margin-bottom: 1rem;
  font-weight: 600;
}

/* ==========================================================================
   5. EXAMPLES / LIVE PROJECTS (IT Hunt Section 4 Style)
   ========================================================================== */

/* IT Hunt Category Filter Tabs */
.ithunt-cat-tabs-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2.75rem;
  width: 100%;
}

.ithunt-cat-tabs-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem;
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.85));
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.1));
  border-radius: 16px;
  backdrop-filter: blur(16px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
}

.ithunt-cat-tabs-pill::-webkit-scrollbar {
  display: none;
}

.ithunt-cat-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-muted, #94a3b8);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.ithunt-cat-tab-btn:hover {
  color: var(--text-main, #ffffff);
  background: rgba(255, 255, 255, 0.05);
}

.ithunt-cat-tab-btn.active {
  background: rgba(249, 115, 22, 0.18);
  border-color: rgba(249, 115, 22, 0.4);
  color: var(--color-ai-orange, #f97316);
  box-shadow: 0 2px 10px rgba(249, 115, 22, 0.2);
}

.cat-tab-icon {
  font-size: 1rem;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.75rem;
  max-width: 1200px;
  margin: 0 auto;
}

.example-card {
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.75));
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  border-radius: 16px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.example-card:hover {
  border-color: rgba(249, 115, 22, 0.45);
  transform: translateY(-4px);
}

.example-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.example-brand-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.example-avatar {
  font-size: 1.6rem;
}

.example-client-name {
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--text-main, #ffffff);
  margin: 0;
}

.example-meta-text {
  font-size: 0.72rem;
  color: var(--text-muted, #94a3b8);
}

.example-platform-pill {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-ai-orange, #f97316);
  background: rgba(249, 115, 22, 0.12);
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
}

.example-desc-text {
  font-size: 0.9rem;
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.example-features-box {
  margin-bottom: 1.5rem;
}

.feature-bullet {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--text-muted, #94a3b8);
  margin-bottom: 0.4rem;
}

.bullet-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-ai-orange, #f97316);
}

.example-card-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.case-study-details {
  width: 100%;
}

.example-view-btn {
  background: transparent;
  border: none;
  color: var(--color-ai-orange, #f97316);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  list-style: none;
}

.example-view-btn::-webkit-details-marker {
  display: none;
}

.case-study-details[open] > .example-view-btn {
  margin-bottom: 1rem;
}

.case-study-content {
  display: grid;
  gap: 1rem;
  padding-top: 0.5rem;
}

.case-study-section {
  min-width: 0;
}

.case-study-section h5 {
  margin-bottom: 0.35rem;
  color: var(--text-main, #fff);
  font-size: 0.82rem;
  font-weight: 700;
}

.case-study-section p,
.case-study-section li,
.case-study-evidence-note {
  color: var(--text-muted, #94a3b8);
  font-size: 0.82rem;
  line-height: 1.55;
}

.case-study-section ul {
  margin: 0;
  padding-left: 1.1rem;
}

.case-study-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.case-study-media {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
}

.case-study-media figure {
  margin: 0;
}

.case-study-media img,
.case-study-media video {
  display: block;
  width: 100%;
  max-height: 240px;
  object-fit: cover;
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.12));
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.65);
}

.case-study-media figcaption {
  margin-top: 0.35rem;
  color: var(--text-muted, #94a3b8);
  font-size: 0.72rem;
}

.case-study-evidence-note {
  padding: 0.7rem 0.8rem;
  border: 1px dashed var(--border-cyber, rgba(255, 255, 255, 0.16));
  border-radius: 8px;
}

.case-study-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

:global(body.light-theme) .case-study-section h5 {
  color: #111827;
}

:global(body.light-theme) .case-study-section p,
:global(body.light-theme) .case-study-section li,
:global(body.light-theme) .case-study-evidence-note,
:global(body.light-theme) .case-study-media figcaption {
  color: #4b5563;
}

.example-view-btn:hover {
  text-decoration: underline;
  color: var(--color-ai-yellow, #f59e0b);
}



/* ==========================================================================
   6. HOW IT WORKS — INTERACTIVE ACCORDION
   ========================================================================== */

.hiw-section { --hiw-accent: var(--color-ai-orange, #f97316); }

.hiw-accordion-wrap {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Each accordion item */
.hiw-acc-item {
  position: relative;
}

/* Connector line between items */
.hiw-connector {
  width: 2px;
  height: 20px;
  background: linear-gradient(to bottom, rgba(249,115,22,0.45), rgba(249,115,22,0.1));
  margin-left: 27px;
}

/* Trigger row (the clickable header) */
.hiw-acc-trigger {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  text-align: left;
  background: var(--bg-card-glass, rgba(15,23,42,0.7));
  border: 1px solid var(--border-cyber, rgba(255,255,255,0.08));
  border-radius: 16px;
  padding: 1.1rem 1.4rem;
  cursor: pointer;
  transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  position: relative;
  z-index: 1;
}

.hiw-acc-trigger:hover {
  border-color: rgba(249,115,22,0.35);
  background: var(--bg-card-hover, rgba(22,33,58,0.85));
}

.hiw-acc-open .hiw-acc-trigger {
  border-color: rgba(249,115,22,0.55);
  background: linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(251,191,36,0.04) 100%);
  box-shadow: 0 0 0 1px rgba(249,115,22,0.25), 0 8px 28px rgba(0,0,0,0.25);
  border-radius: 16px 16px 0 0;
  border-bottom-color: transparent;
}

/* Step number pill */
.hiw-step-num {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--gradient-ai-btn, linear-gradient(135deg,#ea580c,#f97316));
  color: #fff;
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-weight: 900;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 12px rgba(249,115,22,0.4);
  transition: transform 0.3s var(--transition-spring, cubic-bezier(0.34,1.56,0.64,1));
}

.hiw-acc-open .hiw-step-num {
  transform: scale(1.12);
}

/* Emoji icon */
.hiw-step-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  line-height: 1;
}

/* Labels block */
.hiw-trigger-labels {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.hiw-phase {
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--color-ai-orange, #f97316);
}

.hiw-title {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-main, #f8fafc);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Milestone count tag */
.hiw-progress-tag {
  flex-shrink: 0;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.22rem 0.65rem;
  border-radius: 99px;
  background: rgba(249,115,22,0.1);
  color: var(--color-ai-orange, #f97316);
  border: 1px solid rgba(249,115,22,0.25);
  white-space: nowrap;
  transition: opacity 0.2s;
}

/* Chevron */
.hiw-chevron {
  flex-shrink: 0;
  color: var(--text-muted, #94a3b8);
  transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), color 0.2s;
  display: flex;
}

.hiw-chevron.rotated {
  transform: rotate(180deg);
  color: var(--color-ai-orange, #f97316);
}

/* Expand body */
.hiw-acc-body {
  background: linear-gradient(135deg, rgba(249,115,22,0.05) 0%, rgba(15,23,42,0.75) 100%);
  border: 1px solid rgba(249,115,22,0.35);
  border-top: none;
  border-radius: 0 0 16px 16px;
  overflow: hidden;
}

.hiw-acc-body-inner {
  padding: 1.35rem 1.6rem 1.5rem;
}

.hiw-desc {
  font-size: 0.92rem;
  color: var(--text-muted, #94a3b8);
  line-height: 1.65;
  margin-bottom: 1.1rem;
}

.hiw-points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.55rem;
  margin-bottom: 1.25rem;
}

.hiw-point {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--text-main, #e2e8f0);
}

.hiw-point-check {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(16,185,129,0.15);
  border: 1.5px solid rgba(16,185,129,0.4);
  color: #10b981;
}

/* Inline CTA for last step */
.hiw-inline-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--gradient-ai-btn, linear-gradient(135deg,#ea580c,#f97316,#fbbf24));
  border: none;
  border-radius: 99px;
  padding: 0.6rem 1.5rem;
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-weight: 800;
  font-size: 0.9rem;
  color: #fff;
  cursor: pointer;
  transition: var(--transition-spring, all 0.4s cubic-bezier(0.34,1.56,0.64,1));
  box-shadow: 0 4px 16px rgba(249,115,22,0.35);
}

.hiw-inline-cta:hover {
  transform: translateY(-2px) scale(1.04);
  filter: brightness(1.1);
}

/* Expand/collapse transition */
.hiw-expand-enter-active,
.hiw-expand-leave-active {
  transition: max-height 0.38s cubic-bezier(0.16,1,0.3,1), opacity 0.28s ease;
  max-height: 400px;
  overflow: hidden;
}

.hiw-expand-enter-from,
.hiw-expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Section 5 (HIW) is Odd section: Keep deep cyber dark mode theme */
.hiw-section .hiw-acc-trigger {
  background: rgba(15, 23, 42, 0.85);
  border-color: rgba(255, 255, 255, 0.09);
}

/* ── Responsive ─── */
@media (max-width: 640px) {
  .hiw-acc-trigger { gap: 0.65rem; padding: 0.9rem 1rem; }
  .hiw-title { font-size: 0.92rem; }
  .hiw-step-icon { font-size: 1.25rem; }
  .hiw-progress-tag { display: none; }
  .hiw-points-grid { grid-template-columns: 1fr; }
  .hiw-acc-body-inner { padding: 1rem 1rem 1.25rem; }
}

/* ==========================================================================
   7. BENTO GRID (IT Hunt Section 7 Benefits)
   ========================================================================== */

.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.bento-card {
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.65));
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  border-radius: 16px;
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.bento-card:hover {
  border-color: rgba(249, 115, 22, 0.4);
  transform: translateY(-4px);
}

.bento-icon {
  font-size: 2rem;
  margin-bottom: 1.25rem;
}

.bento-card-title {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-main, #ffffff);
  margin-bottom: 0.75rem;
}

.bento-card-desc {
  font-size: 0.92rem;
  color: var(--text-muted, #94a3b8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.bento-highlight-pill {
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}



/* ==========================================================================
   9. FOUNDERS & EXECUTIVE LEADERSHIP
   ========================================================================== */

.founders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1050px;
  margin: 0 auto;
}

.founder-card {
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.75));
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  transition: all 0.3s ease;
}

.founder-card:hover {
  border-color: rgba(249, 115, 22, 0.4);
}

.founder-avatar-box {
  width: 90px;
  height: 90px;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid var(--border-cyber-glow, rgba(249, 115, 22, 0.5));
  flex-shrink: 0;
}

.founder-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.founder-badge {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--color-ai-orange, #f97316);
  letter-spacing: 0.05em;
}

.founder-name {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-main, #ffffff);
  margin: 0.2rem 0;
}

.founder-role {
  font-size: 0.82rem;
  color: var(--text-muted, #94a3b8);
  margin-bottom: 0.75rem;
}

.founder-quote {
  font-size: 0.88rem;
  color: #cbd5e1;
  font-style: italic;
  line-height: 1.55;
  margin-bottom: 1rem;
}

.founder-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.skill-tag {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-muted, #94a3b8);
  font-size: 0.72rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

/* ==========================================================================
   10. FAQ ACCORDION (IT Hunt Section 10)
   ========================================================================== */

.faq-accordion-wrap {
  max-width: 850px;
  margin: 0 auto;
}

.faq-accordion-item {
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.75));
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.2s ease;
}

.faq-accordion-item.open {
  border-color: var(--color-ai-orange, #f97316);
  box-shadow: 0 4px 15px var(--glow-orange, rgba(249, 115, 22, 0.15));
}

.faq-question-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
}

.faq-question-text {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-main, #ffffff);
  padding-right: 1rem;
}

.faq-chevron-icon {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-ai-orange, #f97316);
}

.faq-answer-container {
  padding: 0 1.5rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.faq-answer-text {
  font-size: 0.94rem;
  color: var(--text-muted, #94a3b8);
  line-height: 1.65;
  margin: 0.75rem 0 0;
}

/* ==========================================================================
   11. FINAL CTA BANNER (IT Hunt Section 11)
   ========================================================================== */

.ithunt-cta-section {
  padding: 4rem 1rem;
  background: var(--bg-cyber-dark, #070a12);
}

.ithunt-cta-banner {
  background: var(--bg-card-glass, rgba(17, 24, 39, 0.88));
  border: 1.5px solid var(--border-cyber-glow, rgba(99, 102, 241, 0.35));
  border-radius: 24px;
  padding: 4.5rem 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.55), 0 0 40px var(--glow-primary, rgba(99, 102, 241, 0.2));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  max-width: 1100px;
  margin: 0 auto;
}

.cta-glow-element {
  position: absolute;
  top: -40%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 300px;
  background: radial-gradient(circle, var(--glow-primary, rgba(99, 102, 241, 0.25)) 0%, transparent 70%);
  filter: blur(50px);
  pointer-events: none;
}

.cta-main-title {
  font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1rem;
  line-height: 1.15;
}

.cta-subtitle {
  font-size: 1.1rem;
  color: var(--text-muted, #94a3b8);
  max-width: 650px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

.cta-buttons-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.cta-micro-guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.82rem;
  color: var(--text-dim, #64748b);
  flex-wrap: wrap;
}



/* ==========================================================================
   LIGHT THEME SUPPORT (High-Contrast, Crisp, Clean & Polished)
   ========================================================================== */

:global(body.light-theme) .ithunt-wrapper {
  background-color: #f8fafc;
  color: #0f172a;
}

:global(body.light-theme) .ithunt-hero.ithunt-section-odd {
  background: radial-gradient(circle at 50% -10%, rgba(99, 102, 241, 0.12) 0%, #f9fafb 70%) !important;
}

:global(body.light-theme) .ithunt-hero.ithunt-section-odd .ithunt-hero-headline {
  color: #111827 !important;
}

:global(body.light-theme) .ithunt-hero.ithunt-section-odd .ithunt-hero-subtitle {
  color: #4b5563 !important;
}

:global(body.light-theme) .ithunt-hero.ithunt-section-odd .project-main-title {
  color: #111827 !important;
}

:global(body.light-theme) .ithunt-hero.ithunt-section-odd .project-brief {
  color: #4b5563 !important;
}

:global(body.light-theme) .ithunt-hero.ithunt-section-odd .guarantee-item {
  color: #4b5563 !important;
}

:global(body.light-theme) .ithunt-section-even,
:global(body.light-theme) .ithunt-section-alt {
  background: #f1f5f9 !important;
  color: #111827 !important;
  border-top: 1px solid #e2e8f0 !important;
  border-bottom: 1px solid #e2e8f0 !important;
}

:global(body.light-theme) .ithunt-section-even .homework-card,
:global(body.light-theme) .ithunt-section-even .example-card,
:global(body.light-theme) .ithunt-section-even .bento-card,
:global(body.light-theme) .ithunt-section-even .faq-accordion-item {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  color: #111827 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04) !important;
}

:global(body.light-theme) .ithunt-section-even .ithunt-section-heading,
:global(body.light-theme) .ithunt-section-even .homework-card-title,
:global(body.light-theme) .ithunt-section-even .example-client-name,
:global(body.light-theme) .ithunt-section-even .bento-card-title,
:global(body.light-theme) .ithunt-section-even .faq-question-text {
  color: #111827 !important;
}

:global(body.light-theme) .ithunt-section-even .ithunt-section-desc,
:global(body.light-theme) .ithunt-section-even .homework-card-desc,
:global(body.light-theme) .ithunt-section-even .example-desc-text,
:global(body.light-theme) .ithunt-section-even .bento-card-desc,
:global(body.light-theme) .ithunt-section-even .faq-answer-text {
  color: #4b5563 !important;
}

:global(body.light-theme) .ithunt-section-even .faq-answer-container {
  background: #f8fafc !important;
  border-top: 1px solid #f1f5f9 !important;
}

:global(body.light-theme) .platform-link {
  color: #0f172a !important;
}
:global(body.light-theme) .platform-link:hover {
  color: #ea580c !important;
}

:global(body.light-theme) .ithunt-btn-secondary {
  background: #ffffff !important;
  border-color: rgba(0, 0, 0, 0.15) !important;
  color: #0f172a !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
}
:global(body.light-theme) .ithunt-btn-secondary:hover {
  border-color: #f97316 !important;
  color: #ea580c !important;
  background: #fff7ed !important;
}

:global(body.light-theme) .ithunt-cat-tabs-pill {
  background: #ffffff !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06) !important;
}
:global(body.light-theme) .ithunt-cat-tab-btn {
  color: #64748b !important;
}
:global(body.light-theme) .ithunt-cat-tab-btn:hover {
  color: #0f172a !important;
  background: #f1f5f9 !important;
}
:global(body.light-theme) .ithunt-cat-tab-btn.active {
  background: rgba(249, 115, 22, 0.12) !important;
  color: #ea580c !important;
  border-color: rgba(249, 115, 22, 0.3) !important;
}

:global(body.light-theme) .stat-micro-note,
:global(body.light-theme) .example-meta-text,
:global(body.light-theme) .feature-bullet,
:global(body.light-theme) .guarantee-item,
:global(body.light-theme) .founder-role,
:global(body.light-theme) .acc-cost-line {
  color: #64748b !important;
}

:global(body.light-theme) .ithunt-pill-badge {
  background: #ffffff !important;
  border-color: rgba(249, 115, 22, 0.4) !important;
  color: #ea580c !important;
  box-shadow: 0 2px 10px rgba(249, 115, 22, 0.08) !important;
}

/* Showcase Card & Tabs */
:global(body.light-theme) .ithunt-showcase-card {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.07) !important;
}

:global(body.light-theme) .showcase-card-header {
  background: #f8fafc !important;
  border-bottom-color: #e2e8f0 !important;
}

:global(body.light-theme) .showcase-tab-btn {
  color: #64748b !important;
}

:global(body.light-theme) .showcase-tab-btn:hover {
  background: #f1f5f9 !important;
  color: #0f172a !important;
}

:global(body.light-theme) .showcase-tab-btn.active {
  background: rgba(249, 115, 22, 0.12) !important;
  border-color: rgba(249, 115, 22, 0.4) !important;
  color: #ea580c !important;
}

:global(body.light-theme) .project-track-chip {
  background: rgba(249, 115, 22, 0.12) !important;
  color: #ea580c !important;
}

:global(body.light-theme) .stack-badge {
  background: #f1f5f9 !important;
  border-color: #e2e8f0 !important;
  color: #1e293b !important;
  font-weight: 700 !important;
}

/* Terminal in Light Theme: Crisp Modern Light IDE Window */
:global(body.light-theme) .showcase-terminal-box {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04) !important;
}

:global(body.light-theme) .terminal-titlebar {
  background: #f1f5f9 !important;
  color: #475569 !important;
  border-bottom-color: #e2e8f0 !important;
}

:global(body.light-theme) .line-num {
  color: #94a3b8 !important;
}

:global(body.light-theme) .terminal-code,
:global(body.light-theme) .terminal-line,
:global(body.light-theme) .line-content {
  color: #334155 !important;
}

/* Light Theme Syntax Highlighting - Vibrant, High-Contrast Jewel Tones */
:global(body.light-theme) :deep(.code-kw) {
  color: #e11d48 !important;
  font-weight: 700 !important;
}

:global(body.light-theme) :deep(.code-type) {
  color: #7c3aed !important;
  font-weight: 700 !important;
}

:global(body.light-theme) :deep(.code-fn) {
  color: #0284c7 !important;
  font-weight: 700 !important;
}

:global(body.light-theme) :deep(.code-str) {
  color: #15803d !important;
  font-weight: 600 !important;
}

:global(body.light-theme) :deep(.code-prop) {
  color: #c2410c !important;
  font-weight: 600 !important;
}

:global(body.light-theme) :deep(.code-bool) {
  color: #d97706 !important;
  font-weight: 700 !important;
}

:global(body.light-theme) :deep(.code-dec) {
  color: #a21caf !important;
  font-style: italic !important;
}

:global(body.light-theme) :deep(.code-comment) {
  color: #64748b !important;
  font-style: italic !important;
}

/* Metrics Panel (Right Pane) */
:global(body.light-theme) .metrics-panel-card {
  background: #f8fafc !important;
  border-color: #e2e8f0 !important;
}

:global(body.light-theme) .metrics-panel-header {
  border-bottom-color: #e2e8f0 !important;
}

:global(body.light-theme) .branch-tag {
  background: rgba(249, 115, 22, 0.12) !important;
  color: #ea580c !important;
}

:global(body.light-theme) .metric-item {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03) !important;
}

:global(body.light-theme) .metric-val {
  color: #0f172a !important;
}

:global(body.light-theme) .metric-val.text-brand {
  color: #ea580c !important;
}

:global(body.light-theme) .metric-val.text-green {
  color: #059669 !important;
}

:global(body.light-theme) .metric-lbl {
  color: #64748b !important;
  font-weight: 600 !important;
}

:global(body.light-theme) .review-status-card {
  background: #ecfdf5 !important;
  border-color: #a7f3d0 !important;
}

:global(body.light-theme) .reviewer-name {
  color: #065f46 !important;
  font-weight: 700 !important;
}

:global(body.light-theme) .reviewer-comment {
  color: #1e293b !important;
}

:global(body.light-theme) .ithunt-btn-secondary {
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
  color: #0f172a !important;
  font-weight: 700 !important;
}

:global(body.light-theme) .ithunt-btn-secondary:hover {
  background: #f8fafc !important;
  border-color: #ea580c !important;
  color: #ea580c !important;
}

/* Stats Counter Band */
:global(body.light-theme) .ithunt-stats-band {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
}

:global(body.light-theme) .stat-pill-card {
  background: #f8fafc !important;
  border-color: #e2e8f0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02) !important;
}

:global(body.light-theme) .stat-num {
  color: #ea580c !important;
}

/* Sections 2 - 9: Maintain Odd (Dark) and Even (Light) Rhythms */
:global(body.light-theme) .ithunt-section-even,
:global(body.light-theme) .ithunt-section-alt {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%) !important;
  color: #0f172a !important;
  border-top-color: #e2e8f0 !important;
  border-bottom-color: #e2e8f0 !important;
}

:global(body.light-theme) .ithunt-section-odd,
:global(body.light-theme) .ithunt-section-base {
  background: #070a12 !important;
  color: #f8fafc !important;
  border-top-color: rgba(255, 255, 255, 0.06) !important;
  border-bottom-color: rgba(255, 255, 255, 0.06) !important;
}

:global(body.light-theme) .ithunt-section-odd .ithunt-section-heading,
:global(body.light-theme) .ithunt-section-odd .acc-title,
:global(body.light-theme) .ithunt-section-odd .hiw-title,
:global(body.light-theme) .ithunt-section-odd .founder-name,
:global(body.light-theme) .ithunt-section-odd .cta-main-title {
  color: #ffffff !important;
}

:global(body.light-theme) .ithunt-section-odd .ithunt-section-desc,
:global(body.light-theme) .ithunt-section-odd .acc-sub,
:global(body.light-theme) .ithunt-section-odd .hiw-desc,
:global(body.light-theme) .ithunt-section-odd .founder-role,
:global(body.light-theme) .ithunt-section-odd .cta-subtitle {
  color: #94a3b8 !important;
}

:global(body.light-theme) .ithunt-section-odd .accelerator-card,
:global(body.light-theme) .ithunt-section-odd .founder-card {
  background: rgba(15, 23, 42, 0.85) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35) !important;
}

:global(body.light-theme) .ithunt-section-odd .accelerator-card.featured {
  border-color: #ea580c !important;
  box-shadow: 0 14px 40px rgba(234, 88, 12, 0.25) !important;
}

:global(body.light-theme) .ithunt-section-odd .acc-deliverables-title {
  color: #e2e8f0 !important;
}

:global(body.light-theme) .ithunt-section-odd .acc-list li {
  color: #cbd5e1 !important;
}

:global(body.light-theme) .ithunt-section-odd .acc-cost-line {
  color: #94a3b8 !important;
}

:global(body.light-theme) .ithunt-section-odd .founder-quote {
  color: #cbd5e1 !important;
}

:global(body.light-theme) .ithunt-section-odd .skill-tag {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #cbd5e1 !important;
}

:global(body.light-theme) .ithunt-section-even .homework-card,
:global(body.light-theme) .ithunt-section-even .example-card,
:global(body.light-theme) .ithunt-section-even .bento-card,
:global(body.light-theme) .ithunt-section-even .faq-accordion-item {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
}

:global(body.light-theme) .card-icon-wrap,
:global(body.light-theme) .step-icon-box {
  background: rgba(249, 115, 22, 0.1) !important;
  color: #ea580c !important;
}

:global(body.light-theme) .pill-chip,
:global(body.light-theme) .example-platform-pill {
  background: #f1f5f9 !important;
  color: #ea580c !important;
  font-weight: 700 !important;
}

:global(body.light-theme) .acc-deliverables-title {
  color: #1e293b !important;
}

:global(body.light-theme) .example-card-footer {
  border-top-color: #e2e8f0 !important;
}

:global(body.light-theme) .example-view-btn {
  color: #ea580c !important;
}

:global(body.light-theme) .pipeline-line {
  background: #cbd5e1 !important;
}

:global(body.light-theme) .skill-tag {
  background: #f1f5f9 !important;
  color: #475569 !important;
  font-weight: 600 !important;
}

:global(body.light-theme) .faq-accordion-item.open {
  border-color: #ea580c !important;
  box-shadow: 0 4px 15px rgba(234, 88, 12, 0.1) !important;
}

:global(body.light-theme) .faq-chevron-icon {
  color: #ea580c !important;
}

:global(body.light-theme) .faq-answer-container {
  border-top-color: #f1f5f9 !important;
}

/* Section 10: Final CTA Stays Striking Midnight Luxury in Both Modes */
:global(body.light-theme) .ithunt-cta-section {
  background: #f8fafc !important;
}

:global(body.light-theme) .ithunt-cta-banner {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
  border-color: rgba(99, 102, 241, 0.45) !important;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25), 0 0 25px rgba(99, 102, 241, 0.15) !important;
}

:global(body.light-theme) .cta-main-title {
  color: #ffffff !important;
}

:global(body.light-theme) .cta-subtitle {
  color: #cbd5e1 !important;
}

:global(body.light-theme) .cta-micro-guarantee {
  color: #94a3b8 !important;
}

:global(body.light-theme) .cta-buttons-group .ithunt-btn-secondary {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(255, 255, 255, 0.25) !important;
  color: #ffffff !important;
}



/* Light Theme Enhancements for Complete Contrast & Polish */
:global(body.light-theme) .check,
:global(body.light-theme) .point-check {
  color: #059669 !important;
}

:global(body.light-theme) .bento-highlight-pill.text-green {
  color: #059669 !important;
}

:global(body.light-theme) .bento-highlight-pill.text-brand {
  color: #ea580c !important;
}

:global(body.light-theme) .founder-avatar-box {
  border-color: rgba(249, 115, 22, 0.45) !important;
}

:global(body.light-theme) .stat-pill-card:hover {
  border-color: #ea580c !important;
  background: #ffffff !important;
}

:global(body.light-theme) .homework-card:hover,
:global(body.light-theme) .example-card:hover,
:global(body.light-theme) .bento-card:hover,
:global(body.light-theme) .tech-model-card:hover,
:global(body.light-theme) .founder-card:hover {
  border-color: rgba(234, 88, 12, 0.5) !important;
  box-shadow: 0 10px 30px rgba(234, 88, 12, 0.08) !important;
}

/* ==========================================================================
   ANIMATIONS & RESPONSIVE (Deep Mobile-First Orientation)
   ========================================================================== */

/* Wrapper safety for mobile viewports to prevent horizontal overflow */
.ithunt-wrapper {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.anim-fade-in { animation: fadeIn 0.8s ease forwards; }
.anim-fade-in-up { animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.anim-fade-in-up-delay { animation: fadeInUp 0.9s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
.anim-fade-in-up-delay-2 { animation: fadeInUp 0.9s 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
  .ithunt-hero {
    padding: 3.5rem 1.25rem 3rem;
  }

  .showcase-card-body {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.25rem;
  }

  .accelerators-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .examples-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .bento-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .founders-grid {
    grid-template-columns: 1fr;
    max-width: 650px;
  }

  .ithunt-hero-cta-group {
    flex-direction: column;
    width: 100%;
  }

  .ithunt-hero-main-cta,
  .ithunt-btn-secondary {
    width: 100%;
    justify-content: center;
  }

  .ithunt-cat-tabs-pill {
    width: 100%;
    justify-content: flex-start;
    padding: 0.35rem;
  }
}

@media (max-width: 960px) {
  .showcase-card-body {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 1.15rem;
  }

  .metrics-panel-card {
    max-width: 100%;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }
}

@media (max-width: 640px) {
  /* Hero Spacing & Typography */
  .ithunt-hero {
    padding: 2.25rem 0.85rem 2.25rem;
    overflow: hidden;
  }

  .ithunt-badge-wrapper {
    margin-bottom: 1.1rem;
  }

  .ithunt-pill-badge {
    padding: 0.35rem 0.85rem;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
  }

  .ithunt-hero-headline {
    font-size: clamp(1.65rem, 6.2vw, 2.25rem);
    line-height: 1.22;
    margin-bottom: 1rem;
    padding: 0 0.25rem;
    word-break: break-word;
  }

  .ithunt-platform-pills-row {
    font-size: 0.84rem;
    line-height: 1.5;
    margin-bottom: 0.4rem;
    padding: 0 0.5rem;
  }

  .ithunt-track-formats-row {
    font-size: 0.78rem;
    line-height: 1.4;
    margin-bottom: 0.9rem;
    padding: 0 0.5rem;
  }

  .ithunt-hero-subtitle {
    font-size: 0.92rem;
    line-height: 1.55;
    margin-bottom: 1.5rem;
    padding: 0 0.4rem;
  }

  .ithunt-hero-cta-group {
    margin-bottom: 0.75rem;
  }

  .ithunt-hero-main-cta,
  .ithunt-btn-secondary {
    font-size: 0.92rem;
    padding: 0.8rem 1.25rem;
    min-height: 48px;
    border-radius: 12px;
  }

  .ithunt-pricing-microtext {
    font-size: 0.76rem;
    margin-bottom: 2rem;
    padding: 0 0.5rem;
  }

  .ithunt-cat-tabs-pill {
    width: 100%;
    justify-content: flex-start;
    padding: 0.3rem;
    border-radius: 12px;
  }

  .ithunt-cat-tab-btn {
    padding: 0.45rem 0.8rem;
    font-size: 0.78rem;
    border-radius: 8px;
  }

  /* Guarantees 2x2 Grid on Mobile */
  .ithunt-guarantee-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 0.75rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    text-align: left;
    padding: 0 0.5rem;
  }

  .guarantee-sep {
    display: none;
  }

  .guarantee-item {
    font-size: 0.76rem;
    line-height: 1.35;
  }

  /* Interactive Showcase Card Mobile Ergonomics */
  .ithunt-showcase-container {
    width: 100%;
    padding: 0;
  }

  .ithunt-showcase-card {
    border-radius: 16px;
  }

  .showcase-card-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0.85rem;
    gap: 0.5rem;
  }

  .mac-dots {
    order: 1;
  }

  .showcase-badge-status {
    order: 2;
    font-size: 0.68rem;
  }

  .showcase-tabs {
    order: 3;
    width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    margin-top: 0.25rem;
    gap: 0.35rem;
  }

  .showcase-tabs::-webkit-scrollbar {
    display: none;
  }

  .showcase-tab-btn {
    flex-shrink: 0;
    padding: 0.35rem 0.7rem;
    font-size: 0.76rem;
    white-space: nowrap;
  }

  .showcase-card-body {
    grid-template-columns: 1fr;
    padding: 0.85rem;
    gap: 1rem;
  }

  .project-headline-wrap {
    margin-bottom: 0.85rem;
  }

  .project-main-title {
    font-size: 1.1rem;
  }

  .project-brief {
    font-size: 0.82rem;
    line-height: 1.5;
  }

  .showcase-terminal-box {
    padding: 0.65rem 0.75rem;
    border-radius: 10px;
    margin-bottom: 0.85rem;
  }

  .terminal-titlebar {
    font-size: 0.7rem;
    padding-bottom: 0.4rem;
    margin-bottom: 0.5rem;
  }

  .terminal-code {
    font-size: 0.72rem;
    line-height: 1.5;
    max-width: 100%;
    overflow-x: auto;
  }

  .line-num {
    width: 20px;
    font-size: 0.68rem;
  }

  .stack-badge {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }

  .metrics-panel-card {
    padding: 0.9rem 0.8rem;
    border-radius: 12px;
  }

  .metrics-panel-header {
    margin-bottom: 0.85rem;
    padding-bottom: 0.65rem;
  }

  .metrics-panel-header h4 {
    font-size: 0.82rem;
  }

  .metrics-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-bottom: 0.85rem;
  }

  .metric-item {
    padding: 0.65rem 0.5rem;
    text-align: center;
    border-radius: 8px;
  }

  .metric-val {
    font-size: 1.1rem;
  }

  .metric-lbl {
    font-size: 0.68rem;
  }

  .review-status-card {
    padding: 0.65rem 0.75rem;
    gap: 0.6rem;
    margin-bottom: 0.85rem;
  }

  .reviewer-avatar {
    font-size: 1.25rem;
  }

  .reviewer-name {
    font-size: 0.74rem;
  }

  .reviewer-comment {
    font-size: 0.7rem;
  }

  .showcase-actions {
    gap: 0.5rem;
  }

  .showcase-actions button {
    min-height: 46px;
    font-size: 0.88rem;
  }

  /* Stats Band 2-Column Mobile Layout */
  .ithunt-stats-band {
    padding: 1.75rem 0.75rem;
  }

  .stats-card-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.65rem;
  }

  .stat-pill-card {
    padding: 0.85rem 0.75rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
    border-radius: 12px;
  }

  .stat-num {
    font-size: 1.45rem;
  }

  .stat-label-title {
    font-size: 0.78rem;
    line-height: 1.3;
  }

  .stat-micro-note {
    display: none;
  }

  /* Sections Generic */
  .ithunt-section {
    padding: 3rem 0.85rem;
  }

  .section-title-wrap {
    margin: 0 auto 2rem;
  }

  .ithunt-section-heading {
    font-size: clamp(1.55rem, 5.5vw, 2.15rem);
    margin-bottom: 0.75rem;
    line-height: 1.22;
  }

  .ithunt-section-desc {
    font-size: 0.92rem;
    line-height: 1.55;
  }

  /* Section 2: Homework Cards */
  .homework-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .homework-card {
    padding: 1.35rem 1.15rem;
    border-radius: 14px;
  }

  .card-icon-wrap {
    width: 42px;
    height: 42px;
    margin-bottom: 1rem;
  }

  .homework-card-title {
    font-size: 1.05rem;
  }

  .homework-card-desc {
    font-size: 0.88rem;
    margin-bottom: 1rem;
  }

  /* Section 3: Accelerators */
  .accelerators-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .accelerator-card {
    padding: 1.5rem 1.2rem;
    border-radius: 16px;
  }

  .acc-title {
    font-size: 1.25rem;
  }

  .acc-sub {
    font-size: 0.82rem;
    margin-bottom: 1.1rem;
  }

  .acc-deliverables-title {
    font-size: 0.75rem;
  }

  .acc-list {
    margin-bottom: 1.5rem;
  }

  .acc-list li {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }

  .accelerator-card button {
    min-height: 46px;
  }

  /* Section 4: Live Examples */
  .examples-grid {
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }

  .example-card {
    padding: 1.25rem 1.1rem;
    border-radius: 14px;
  }

  .example-card-header {
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
  }

  .example-client-name {
    font-size: 0.92rem;
  }

  .example-desc-text {
    font-size: 0.86rem;
    margin-bottom: 1rem;
  }

  .example-card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding-top: 0.85rem;
  }

  .example-view-btn {
    align-self: flex-start;
    font-size: 0.82rem;
  }

  .case-study-meta-grid {
    grid-template-columns: 1fr;
  }

  /* Section 6: Bento Grid */
  .bento-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .bento-card {
    padding: 1.25rem 1.1rem;
    border-radius: 14px;
  }

  .bento-icon {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .bento-card-title {
    font-size: 1.05rem;
  }

  .bento-card-desc {
    font-size: 0.86rem;
    margin-bottom: 1rem;
  }

  /* Section 8: Founders */
  .founders-grid {
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }

  .founder-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.35rem 1.15rem;
    gap: 1rem;
    border-radius: 16px;
  }

  .founder-avatar-box {
    width: 80px;
    height: 80px;
    border-radius: 14px;
  }

  .founder-name {
    font-size: 1.15rem;
  }

  .founder-quote {
    font-size: 0.84rem;
  }

  .founder-skills {
    justify-content: center;
  }

  /* Section 9: FAQ */
  .faq-question-bar {
    padding: 1rem 1.1rem;
  }

  .faq-question-text {
    font-size: 0.94rem;
  }

  .faq-chevron-icon {
    font-size: 1.3rem;
  }

  .faq-answer-container {
    padding: 0 1.1rem 1rem;
  }

  .faq-answer-text {
    font-size: 0.86rem;
  }

  /* Section 10: CTA Banner */
  .ithunt-cta-section {
    padding: 2.5rem 0.85rem;
  }

  .ithunt-cta-banner {
    padding: 2.25rem 1.15rem;
    border-radius: 18px;
  }

  .cta-main-title {
    font-size: clamp(1.5rem, 5.8vw, 2rem);
    line-height: 1.22;
  }

  .cta-subtitle {
    font-size: 0.92rem;
    margin-bottom: 1.75rem;
  }

  .cta-buttons-group {
    flex-direction: column;
    width: 100%;
    gap: 0.65rem;
  }

  .cta-buttons-group button {
    width: 100%;
    min-height: 48px;
    font-size: 0.95rem;
  }

  .cta-micro-guarantee {
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.76rem;
  }

  .cta-micro-guarantee span:nth-child(2),
  .cta-micro-guarantee span:nth-child(4) {
    display: none;
  }


}

/* Ultra-Compact Mobile (< 400px, e.g. iPhone SE, Fold) */
@media (max-width: 400px) {
  .ithunt-hero-headline {
    font-size: 1.55rem;
  }

  .stats-card-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .stat-pill-card {
    padding: 0.75rem 0.6rem;
  }

  .stat-num {
    font-size: 1.3rem;
  }

  .stat-label-title {
    font-size: 0.72rem;
  }

  .ithunt-guarantee-row {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
  }
}

/* ==========================================================================
   ACADEMY HERO CAROUSEL, HIGHLIGHT CARDS & 3D LAPTOP FORM (Images 1 & 2)
   ========================================================================== */
.ithunt-edu-hero {
  padding-top: 1.5rem !important;
  padding-bottom: 4rem !important;
  justify-content: flex-start !important;
}

.hero-carousel-wrapper {
  position: relative;
  width: 100%;
  border-radius: 28px;
  padding: 3rem 2.5rem;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(14, 116, 144, 0.2) 60%, rgba(249, 115, 22, 0.1) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
  overflow: visible;
}

.carousel-control-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-size: 1.9rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.carousel-control-btn.btn-prev {
  left: -20px;
}

.carousel-control-btn.btn-next {
  right: -20px;
}

.carousel-control-btn:hover {
  background: #f97316;
  border-color: #fb923c;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 0 25px rgba(249, 115, 22, 0.6);
}

.hero-carousel-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 2.5rem;
  align-items: center;
  min-height: 430px;
}

/* Left Hero Text Column */
.hero-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(249, 115, 22, 0.15);
  border: 1px solid rgba(249, 115, 22, 0.4);
  color: #fb923c;
  padding: 0.35rem 0.95rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
  box-shadow: 0 2px 10px rgba(249, 115, 22, 0.2);
}

.hero-badge-pill .badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #f97316;
  box-shadow: 0 0 8px #f97316;
}

.hero-main-title {
  font-size: clamp(2.2rem, 3.6vw, 3.4rem);
  font-weight: 900;
  line-height: 1.15;
  color: #ffffff;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.hero-highlight-text {
  background: linear-gradient(135deg, #f97316 0%, #fb923c 45%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.hero-subheading {
  font-size: 1.2rem;
  color: #94a3b8;
  font-weight: 500;
  margin-bottom: 1.5rem;
  line-height: 1.45;
}

.hero-pills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 1.85rem;
}

.hero-pill-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.85rem;
  color: #f1f5f9;
  font-weight: 600;
}

.hero-pill-item .check-icon {
  color: #22c55e;
  font-weight: 900;
}

.hero-actions-row {
  display: flex;
  gap: 1.1rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.btn-hero-primary {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: #ffffff;
  border: 1px solid #fb923c;
  border-radius: 999px;
  padding: 0.9rem 2rem;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.45);
}

.btn-hero-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(249, 115, 22, 0.65);
}

.btn-hero-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  padding: 0.9rem 1.85rem;
  font-size: 1.02rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-hero-secondary:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.4);
}

.hero-dots-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.hero-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.hero-dot.active {
  width: 32px;
  background: #f97316;
}

/* Right Hero Visual Stage with Geometric Angled Panels (Image 2) */
.hero-visual-column {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image-stage {
  position: relative;
  width: 100%;
  max-width: 460px;
  height: 420px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.geo-panel {
  position: absolute;
  border-radius: 24px;
}

.geo-panel-orange {
  top: 10px;
  right: -10px;
  width: 280px;
  height: 380px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  transform: skewX(-8deg) rotate(5deg);
  z-index: 1;
  opacity: 0.95;
  box-shadow: 0 15px 40px rgba(249, 115, 22, 0.35);
}

.geo-panel-teal {
  top: 30px;
  left: 5px;
  width: 260px;
  height: 370px;
  background: linear-gradient(135deg, #0ea5e9 0%, #0f766e 100%);
  transform: skewX(6deg) rotate(-4deg);
  z-index: 1;
  opacity: 0.85;
  box-shadow: 0 15px 40px rgba(15, 118, 110, 0.35);
}

.hero-students-photo {
  position: relative;
  z-index: 2;
  width: 94%;
  height: 94%;
  object-fit: cover;
  object-position: top center;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.45);
}

/* Floating Badges */
.floating-badge {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  padding: 0.55rem 0.95rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45);
}

.badge-rating {
  top: 10px;
  left: -20px;
}

.badge-placement {
  bottom: 20px;
  left: -20px;
}

.badge-certified {
  top: 25px;
  right: -25px;
}

.floating-badge .badge-icon {
  font-size: 1.35rem;
}

.floating-badge .badge-bold {
  font-weight: 800;
  font-size: 0.85rem;
  color: #ffffff;
}

.floating-badge .badge-sub {
  font-size: 0.72rem;
  color: #94a3b8;
}

/* ==========================================================================
   THREE CATEGORY HIGHLIGHT CARDS (Image 2)
   ========================================================================== */
.highlight-cards-band {
  margin-top: 3.5rem;
  width: 100%;
}

.highlight-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
}

.highlight-card {
  background: rgba(15, 23, 42, 0.85);
  color: #ffffff;
  border-radius: 22px;
  padding: 2.2rem 1.8rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.highlight-card:hover {
  transform: translateY(-8px);
  border-color: rgba(249, 115, 22, 0.45);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 25px rgba(249, 115, 22, 0.18);
}

.card-icon-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.85rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.card-theme-cyan .card-icon-circle {
  background: rgba(14, 165, 233, 0.2);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

.card-theme-orange .card-icon-circle {
  background: rgba(249, 115, 22, 0.2);
  color: #fb923c;
  border: 1px solid rgba(249, 115, 22, 0.3);
}

.card-theme-teal .card-icon-circle {
  background: rgba(20, 184, 166, 0.2);
  color: #2dd4bf;
  border: 1px solid rgba(45, 212, 191, 0.3);
}

.card-badge-chip {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.card-theme-cyan .card-badge-chip {
  background: rgba(14, 165, 233, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.35);
}

.card-theme-orange .card-badge-chip {
  background: rgba(249, 115, 22, 0.15);
  color: #fb923c;
  border: 1px solid rgba(249, 115, 22, 0.35);
}

.card-theme-teal .card-badge-chip {
  background: rgba(20, 184, 166, 0.15);
  color: #2dd4bf;
  border: 1px solid rgba(45, 212, 191, 0.35);
}

.card-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.45rem;
}

.card-desc {
  font-size: 0.95rem;
  color: #94a3b8;
  line-height: 1.55;
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.card-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: none;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  padding: 0;
  transition: gap 0.2s ease;
}

.card-theme-cyan .card-cta-btn {
  color: #38bdf8;
}

.card-theme-orange .card-cta-btn {
  color: #f97316;
}

.card-theme-teal .card-cta-btn {
  color: #2dd4bf;
}

.card-cta-btn:hover {
  gap: 0.65rem;
}

/* Light Theme overrides for Highlight Cards */
body.light-theme .highlight-card {
  background: #ffffff;
  color: #0f172a;
  border: 1px solid rgba(226, 232, 240, 0.85);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
}
body.light-theme .highlight-card .card-title {
  color: #0f172a;
}
body.light-theme .highlight-card .card-desc {
  color: #64748b;
}

/* ==========================================================================
   3D LAPTOP APPLICATION FORM (Image 1 - THEME-ORIENTED)
   ========================================================================== */
.laptop-section-wrapper {
  margin-top: 5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.laptop-section-title {
  font-size: clamp(1.8rem, 3.2vw, 2.7rem);
  font-weight: 900;
  color: #ffffff;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.laptop-section-sub {
  font-size: 1.05rem;
  color: #94a3b8;
  max-width: 620px;
  margin-bottom: 2.5rem;
}

.laptop-mockup-frame {
  position: relative;
  width: 100%;
  max-width: 840px;
  perspective: 1200px;
  margin: 0 auto;
}

.laptop-screen {
  background: #0a0f1d;
  border-radius: 18px 18px 0 0;
  padding: 12px 14px 0 14px;
  box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.2);
  border: 2px solid #1e293b;
  border-bottom: none;
  position: relative;
}

.laptop-webcam {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.webcam-lens {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #020617;
  border: 1px solid #334155;
  box-shadow: inset 0 0 2px #38bdf8;
}

.webcam-mic {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #475569;
}

/* Inside Screen: Cyber Dark Theme Oriented */
.laptop-screen-content {
  background: radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.15) 0%, transparent 60%), linear-gradient(145deg, #070d1e 0%, #0c1833 55%, #050a18 100%);
  border-radius: 10px 10px 0 0;
  display: flex;
  position: relative;
  overflow: hidden;
  min-height: 400px;
  border: 1px solid rgba(56, 189, 248, 0.25);
  box-shadow: inset 0 2px 25px rgba(0, 0, 0, 0.75);
}

.laptop-left-accent {
  width: 10px;
  background: linear-gradient(180deg, #f97316 0%, #ea580c 50%, #f59e0b 100%);
  box-shadow: 0 0 18px rgba(249, 115, 22, 0.65);
  flex-shrink: 0;
}

.laptop-form-inner {
  padding: 2.2rem 2.5rem 1.8rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.laptop-brand-header {
  text-align: center;
  margin-bottom: 1.75rem;
}

.laptop-logo-wrap {
  font-size: 1.45rem;
  font-weight: 900;
  letter-spacing: -0.01em;
  margin-bottom: 0.2rem;
}

.laptop-logo-it {
  color: #f97316;
  margin-right: 4px;
  text-shadow: 0 0 15px rgba(249, 115, 22, 0.6);
}

.laptop-logo-hunt {
  color: #ffffff;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.35);
}

.laptop-form-heading {
  font-size: 1.7rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
}

.laptop-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;
  width: 100%;
  align-items: start;
}

.laptop-label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.88rem;
  font-weight: 700;
  color: #cbd5e1;
  margin-bottom: 0.45rem;
  text-align: left;
}

.laptop-input-field {
  width: 100%;
  background: rgba(15, 23, 42, 0.82) !important;
  border: 1.5px solid rgba(56, 189, 248, 0.35) !important;
  border-radius: 999px !important;
  padding: 0.75rem 1.25rem !important;
  font-size: 0.95rem !important;
  font-weight: 600 !important;
  color: #ffffff !important;
  outline: none !important;
  transition: all 0.25s ease !important;
  box-sizing: border-box !important;
  backdrop-filter: blur(10px) !important;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.45) !important;
}

.laptop-input-field::placeholder {
  color: rgba(148, 163, 184, 0.65) !important;
  font-weight: 400 !important;
}

.laptop-input-field:focus {
  background: rgba(15, 23, 42, 0.98) !important;
  border-color: #f97316 !important;
  color: #ffffff !important;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.25), 0 0 20px rgba(249, 115, 22, 0.45) !important;
}

.laptop-select-wrapper {
  position: relative;
  width: 100%;
}

.laptop-select-field {
  width: 100%;
  appearance: none;
  background: linear-gradient(135deg, #0f766e 0%, #0e7490 100%) !important;
  color: #ffffff !important;
  border: 1.5px solid #14b8a6 !important;
  border-radius: 999px !important;
  padding: 0.75rem 2.5rem 0.75rem 1.25rem !important;
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  outline: none !important;
  transition: all 0.25s ease !important;
  box-sizing: border-box !important;
  box-shadow: 0 4px 18px rgba(15, 118, 110, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.25) !important;
}

.laptop-select-field:focus {
  border-color: #2dd4bf !important;
  box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.35), 0 0 25px rgba(20, 184, 166, 0.45) !important;
}

.laptop-select-field option {
  background: #0f172a;
  color: #ffffff;
}

.laptop-select-wrapper .select-chevron {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #38bdf8;
  font-size: 0.75rem;
  pointer-events: none;
}

.laptop-submit-row {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.laptop-apply-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
  color: #ffffff !important;
  border: 1px solid #fb923c !important;
  border-radius: 999px !important;
  padding: 0.9rem 3rem !important;
  font-size: 1.15rem !important;
  font-weight: 900 !important;
  cursor: pointer !important;
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.55), 0 0 35px rgba(249, 115, 22, 0.35) !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.laptop-apply-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(249, 115, 22, 0.75), 0 0 45px rgba(249, 115, 22, 0.5) !important;
}

.cursor-pointer-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
}

.laptop-bottom-bar {
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #f97316 0%, #06b6d4 50%, #0f766e 100%);
  margin-top: 1rem;
  border-radius: 999px;
  box-shadow: 0 0 12px rgba(6, 182, 212, 0.5);
}

.laptop-base {
  width: 106%;
  margin-left: -3%;
  height: 20px;
  background: linear-gradient(180deg, #334155 0%, #1e293b 50%, #0f172a 100%);
  border-radius: 0 0 18px 18px;
  position: relative;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.laptop-base-notch {
  width: 140px;
  height: 7px;
  background: #0f172a;
  border-radius: 0 0 8px 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: none;
}

.laptop-drop-shadow {
  width: 90%;
  height: 25px;
  margin: 0 auto;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0) 70%);
  filter: blur(8px);
  margin-top: 4px;
}

/* Light theme overrides for Laptop Mockup */
body.light-theme .laptop-screen-content {
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
}
body.light-theme .laptop-logo-hunt,
body.light-theme .laptop-form-heading {
  color: #0f172a;
  text-shadow: none;
}
body.light-theme .laptop-label {
  color: #475569;
}
body.light-theme .laptop-input-field {
  background: #e0f2fe !important;
  border: 1.5px solid #bae6fd !important;
  color: #0f172a !important;
  box-shadow: none !important;
}

/* Bottom Hindi Trust Watermark (Image 1) */
.laptop-hindi-watermark {
  margin-top: 2.75rem;
}

.hindi-trust-heading {
  font-size: clamp(2.2rem, 4.4vw, 3.6rem);
  font-weight: 900;
  color: #0284c7;
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 12px rgba(2, 132, 199, 0.3);
}

.hindi-trust-sub {
  font-size: 1.05rem;
  color: #94a3b8;
  font-weight: 600;
}

/* Responsive Overrides */
@media (max-width: 992px) {
  .hero-carousel-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .hero-pills-row,
  .hero-actions-row,
  .hero-dots-row {
    justify-content: center;
  }

  .highlight-cards-grid {
    grid-template-columns: 1fr;
  }

  .carousel-control-btn.btn-prev {
    left: 5px;
  }

  .carousel-control-btn.btn-next {
    right: 5px;
  }
}

@media (max-width: 640px) {
  .hero-carousel-wrapper {
    padding: 2rem 1.25rem;
  }

  .hero-image-stage {
    max-width: 320px;
    height: 300px;
  }

  .geo-panel-orange,
  .geo-panel-teal {
    width: 200px;
    height: 260px;
  }

  .laptop-form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .laptop-form-inner {
    padding: 1.5rem 1rem;
  }

  .badge-rating,
  .badge-placement,
  .badge-certified {
    transform: scale(0.85);
  }
}
</style>
