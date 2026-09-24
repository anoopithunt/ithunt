<template>
  <div class="aipost-wrapper">
    <!-- =====================================================================
         1. HERO SECTION (AIPost Signature Style with Native Brand Palette)
         ===================================================================== -->
    <section class="aipost-hero">
      <div class="aipost-hero-glow aipost-hero-glow-1"></div>
      <div class="aipost-hero-glow aipost-hero-glow-2"></div>

      <div class="container aipost-hero-container">
        <!-- Top Announcement Badge -->
        <div class="aipost-badge-wrapper anim-fade-in">
          <div class="aipost-pill-badge">
            <span class="aipost-badge-dot"></span>
            <span class="aipost-badge-text">{{ content.hero?.badgeText || '🚀 SOFTWARE STUDIO & TECH ACADEMY 2026' }}</span>
          </div>
        </div>

        <!-- Main Headline (AIPost Dual-Tone Style) -->
        <h1 class="aipost-hero-headline anim-fade-in-up">
          Every other institute starts with a blank syllabus.<br />
          <span class="aipost-gradient-text">Ours starts with real client code.</span>
        </h1>

        <!-- Subtitle -->
        <p class="aipost-hero-subtitle anim-fade-in-up-delay">
          {{ content.hero?.subtitle || 'IT HUNT builds production-ready software solutions while empowering engineers with 3-Month & 6-Month hands-on internships in MERN Stack, iOS, Android, AI, and Cloud DevOps.' }}
        </p>

        <!-- Interactive Website/Track Input Box (Signature AIPost widget) -->
        <div class="aipost-input-box-wrapper anim-fade-in-up-delay-2">
          <div class="aipost-input-box">
            <div class="aipost-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <input 
              type="text" 
              v-model="searchQuery" 
              :placeholder="activePlaceholder" 
              class="aipost-hero-input"
              @keydown.enter="handleTrackSearch"
            />
            <button class="aipost-btn-primary aipost-hero-cta" @click="handleTrackSearch">
              <span>{{ content.hero?.primaryCtaText || 'Explore Tracks & Syllabus' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>

          <!-- Quick Interactive Stack Tags (Like AIPost's platform chips) -->
          <div class="aipost-quick-tags">
            <span class="quick-tag-label">Supported Specializations:</span>
            <button 
              v-for="tag in stackPills" 
              :key="tag.id"
              class="quick-tag-btn"
              :class="{ active: selectedTrackId === tag.id }"
              @click="selectTrackPill(tag)"
            >
              <span class="quick-tag-icon">{{ tag.icon }}</span>
              <span>{{ tag.name }}</span>
            </button>
          </div>

          <!-- Trust Badges & Guarantee Row (AIPost Style) -->
          <div class="aipost-guarantee-row">
            <div class="guarantee-item">
              <span class="guarantee-icon">✓</span>
              <span>ISO 9001:2015 & Govt Certified</span>
            </div>
            <span class="guarantee-sep">·</span>
            <div class="guarantee-item">
              <span class="guarantee-icon">✓</span>
              <span>100% Practical Client Sprints</span>
            </div>
            <span class="guarantee-sep">·</span>
            <div class="guarantee-item">
              <span class="guarantee-icon">✓</span>
              <span>1-on-1 Senior Tech Mentorship</span>
            </div>
            <span class="guarantee-sep">·</span>
            <div class="guarantee-item">
              <span class="guarantee-icon">✓</span>
              <span>Direct Hiring Placement Support</span>
            </div>
          </div>
        </div>

        <!-- Interactive Hero Showcase Card (AIPost's "See in Action" Preview on Hero) -->
        <div class="aipost-showcase-container">
          <div class="aipost-showcase-card">
            <!-- Header with macOS window dots and interactive tabs -->
            <div class="showcase-card-header">
              <div class="mac-dots">
                <span class="mac-dot red"></span>
                <span class="mac-dot yellow"></span>
                <span class="mac-dot green"></span>
              </div>
              <div class="showcase-tabs">
                <button 
                  v-for="(proj, idx) in showcaseProjects" 
                  :key="proj.id"
                  class="showcase-tab-btn"
                  :class="{ active: activeShowcaseIdx === idx }"
                  @click="activeShowcaseIdx = idx"
                >
                  <span class="tab-icon">{{ proj.icon }}</span>
                  <span class="tab-title">{{ proj.title }}</span>
                </button>
              </div>
              <div class="showcase-badge-status">
                <span class="pulse-dot"></span>
                <span>PRODUCTION LIVE</span>
              </div>
            </div>

            <!-- Card Body: Interactive App & Terminal Showcase -->
            <div class="showcase-card-body">
              <div class="showcase-left-pane">
                <div class="project-headline-wrap">
                  <span class="project-track-chip">{{ currentProject.track }}</span>
                  <h3 class="project-main-title">{{ currentProject.name }}</h3>
                  <p class="project-brief">{{ currentProject.desc }}</p>
                </div>

                <!-- Code Terminal Snippet Preview -->
                <div class="showcase-terminal-box">
                  <div class="terminal-titlebar">
                    <span class="terminal-file-icon">⚡</span>
                    <span class="terminal-filename">{{ currentProject.file }}</span>
                  </div>
                  <pre class="terminal-code"><code><span v-for="(line, lIdx) in currentProject.codeSnippet" :key="lIdx" class="terminal-line"><span class="line-num">{{ lIdx + 1 }}</span><span class="line-content" v-html="highlightCode(line)"></span></span></code></pre>
                </div>

                <!-- Tech Stack Chips -->
                <div class="project-stack-chips">
                  <span v-for="tech in currentProject.stack" :key="tech" class="stack-badge">{{ tech }}</span>
                </div>
              </div>

              <!-- Right Pane: Real-Time Metrics & Highlights -->
              <div class="showcase-right-pane">
                <div class="metrics-panel-card">
                  <div class="metrics-panel-header">
                    <h4>Production Deployment Metrics</h4>
                    <span class="branch-tag">branch: production</span>
                  </div>

                  <div class="metrics-grid">
                    <div class="metric-item">
                      <span class="metric-val text-brand">{{ currentProject.metrics.coverage }}</span>
                      <span class="metric-lbl">Test Coverage</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-val text-green">{{ currentProject.metrics.uptime }}</span>
                      <span class="metric-lbl">Production Uptime</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-val">{{ currentProject.metrics.prs }}</span>
                      <span class="metric-lbl">Merged Client PRs</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-val text-brand">{{ currentProject.metrics.interns }}</span>
                      <span class="metric-lbl">Engineers on Team</span>
                    </div>
                  </div>

                  <div class="review-status-card">
                    <div class="reviewer-avatar">👨‍💻</div>
                    <div class="reviewer-info">
                      <div class="reviewer-name">Architect Review: Approved</div>
                      <div class="reviewer-comment">"Clean modular service architecture, production ready."</div>
                    </div>
                  </div>

                  <div class="showcase-actions">
                    <button class="aipost-btn-primary w-full" @click="$emit('apply-course', currentProject.track)">
                      <span>Apply for this Track ➜</span>
                    </button>
                    <button class="aipost-btn-secondary w-full" @click="$emit('set-tab', 'internships')">
                      <span>View All Internship Ventures</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         2. KEY METRICS COUNTER BAR (AIPost Style)
         ===================================================================== -->
    <div class="aipost-stats-band" ref="statsSectionRef">
      <div class="container">
        <div class="stats-card-grid">
          <div class="stat-pill-card" v-for="(stat, idx) in content.stats" :key="idx">
            <div class="stat-number-box">
              <span class="stat-num text-brand">{{ animatedStats[idx] || stat.number }}</span>
            </div>
            <div class="stat-desc-box">
              <div class="stat-label-title">{{ stat.label }}</div>
              <div class="stat-micro-note">Verified & Audited 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- =====================================================================
         3. SECTION 2: "We build real software before we teach a class" (AIPost Section 2 Style)
         ===================================================================== -->
    <section class="aipost-section aipost-section-alt">
      <div class="container">
        <div class="section-title-wrap text-center">
          <div class="aipost-pill-badge small">
            <span class="aipost-badge-dot"></span>
            <span>THE TRAINING PHILOSOPHY</span>
          </div>
          <h2 class="aipost-section-heading">
            We build real software before we teach a single class
          </h2>
          <p class="aipost-section-desc">
            A blank textbook puts the work back on you: memorize syntax, guess interview questions, build useless todo apps. IT HUNT gathers real client requirements and trains you directly on live code.
          </p>
        </div>

        <div class="homework-grid">
          <!-- Card 1 -->
          <div class="homework-card">
            <div class="card-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
            <h3 class="homework-card-title">Real Client Repositories</h3>
            <p class="homework-card-desc">
              On day one you clone active software codebases — what clients buy, how APIs scale, and real architecture. If an issue is challenging, senior mentors guide your approach rather than giving you toy answers.
            </p>
            <div class="homework-card-footer">
              <span class="pill-chip">Git branches & PR reviews</span>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="homework-card">
            <div class="card-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <h3 class="homework-card-title">Every Layer of Modern Tech</h3>
            <p class="homework-card-desc">
              Each connected module contributes its own real-world standard: Frontend state with React 19 / Vue 3, robust backend APIs with Node / Python, indexing with Postgres / MongoDB, and containerization with Docker.
            </p>
            <div class="homework-card-footer">
              <span class="pill-chip">Full-Stack Integration</span>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="homework-card">
            <div class="card-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
            </div>
            <h3 class="homework-card-title">Architect Reviews, Not Just Graders</h3>
            <p class="homework-card-desc">
              Those sources become one continuous feedback loop. Senior developers review your code quality, security vulnerabilities, and system design, which is why you never feel like you are writing code in a void.
            </p>
            <div class="homework-card-footer">
              <span class="pill-chip">Senior Mentor Guidance</span>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="homework-card">
            <div class="card-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h3 class="homework-card-title">Production Readiness Gate</h3>
            <p class="homework-card-desc">
              If code is too brittle to survive production traffic, the pipeline flags the bottleneck and teaches you how to optimize it — rather than passing you with something unvetted that would fail technical interviews.
            </p>
            <div class="homework-card-footer">
              <span class="pill-chip">Zero Mock Excuses</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         4. SECTION 3: "Three Core Tracks. One Integrated Studio." (AIPost Section 3 Style)
         ===================================================================== -->
    <section class="aipost-section aipost-section-base">
      <div class="container">
        <div class="section-title-wrap text-center">
          <div class="aipost-pill-badge small">
            <span class="aipost-badge-dot"></span>
            <span>MULTI-FORMAT ACCELERATION</span>
          </div>
          <h2 class="aipost-section-heading">
            Three Core Tracks. One Integrated Studio.
          </h2>
          <p class="aipost-section-desc">
            Most bootcamps charge separately for theory, projects, and interviews. At IT HUNT, one comprehensive track equips you with full-stack mastery, live client code, and career placement.
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
              <button class="aipost-btn-primary w-full" @click="$emit('set-tab', 'internships')">
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
              <button class="aipost-btn-primary w-full" @click="$emit('set-tab', 'internships')">
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
              <button class="aipost-btn-secondary w-full" @click="$emit('set-tab', 'courses')">
                <span>Explore NIELIT Programs ➜</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         5. SECTION 4: "See in Action" Live Projects Showcase (AIPost Section 4 Style)
         ===================================================================== -->
    <section class="aipost-section aipost-section-alt">
      <div class="container">
        <div class="section-title-wrap text-center">
          <div class="aipost-pill-badge small">
            <span class="aipost-badge-dot"></span>
            <span>EXAMPLES</span>
          </div>
          <h2 class="aipost-section-heading">
            See IT HUNT in Action
          </h2>
          <p class="aipost-section-desc">
            A quick preview of real software products designed, engineered, and shipped by our students and leads. Each live project below runs in active production.
          </p>
        </div>

        <div class="examples-grid">
          <div class="example-card" v-for="item in liveProjectsList" :key="item.id">
            <div class="example-card-header">
              <div class="example-brand-row">
                <span class="example-avatar">{{ item.logo }}</span>
                <div>
                  <h4 class="example-client-name">{{ item.name }}</h4>
                  <span class="example-meta-text">{{ item.category }} • 🌐 Production Live</span>
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
              <div class="example-engagement-stats">
                <span>⚡ {{ item.stats.speed }}</span>
                <span>👥 {{ item.stats.users }}</span>
                <span>⭐ {{ item.stats.rating }}</span>
              </div>
              <button class="example-view-btn" @click="$emit('apply-course', item.name)">
                <span>Inspect Architecture ↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         6. SECTION 5: "From Zero to Hired" 4-Stage Pipeline (AIPost Section 6 "How It Works" Style)
         ===================================================================== -->
    <section class="aipost-section aipost-section-base">
      <div class="container">
        <div class="section-title-wrap text-center">
          <div class="aipost-pill-badge small">
            <span class="aipost-badge-dot"></span>
            <span>HOW IT WORKS</span>
          </div>
          <h2 class="aipost-section-heading">
            From Day One to Placement Autopilot
          </h2>
          <p class="aipost-section-desc">
            Let our structured production system guide you through every milestone from zero experience to deploying live apps and cracking senior tech rounds.
          </p>
        </div>

        <div class="pipeline-wrapper">
          <div class="pipeline-step-item" v-for="(step, sIdx) in workflowSteps" :key="step.number">
            <div class="pipeline-step-number-wrap">
              <span class="pipeline-step-number">{{ step.number }}</span>
              <div class="pipeline-line" v-if="sIdx < workflowSteps.length - 1"></div>
            </div>
            <div class="pipeline-step-card">
              <div class="step-card-header">
                <div class="step-icon-box">{{ step.icon }}</div>
                <div>
                  <span class="step-phase-badge">{{ step.phase }}</span>
                  <h3 class="step-title">{{ step.title }}</h3>
                </div>
              </div>
              <p class="step-desc">{{ step.desc }}</p>
              <div class="step-subpoints">
                <div class="step-subpoint-item" v-for="pt in step.points" :key="pt">
                  <span class="point-check">✓</span>
                  <span>{{ pt }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         7. SECTION 6: "Why Choose IT HUNT?" Bento Grid (AIPost Section 7 Benefits Style)
         ===================================================================== -->
    <section class="aipost-section aipost-section-alt">
      <div class="container">
        <div class="section-title-wrap text-center">
          <div class="aipost-pill-badge small">
            <span class="aipost-badge-dot"></span>
            <span>BENEFITS & ADVANTAGES</span>
          </div>
          <h2 class="aipost-section-heading">
            Why Choose IT HUNT?
          </h2>
          <p class="aipost-section-desc">
            Join thousands of software engineers who stopped wasting time on disconnected tutorials and launched high-paying careers through real code.
          </p>
        </div>

        <div class="bento-grid">
          <!-- Card 1 -->
          <div class="bento-card">
            <div class="bento-icon">⚡</div>
            <h3 class="bento-card-title">Save 100+ Hours of Trial & Error</h3>
            <p class="bento-card-desc">
              Stop spending weeks getting stuck in tutorial purgatory. Build production applications in structured client sprints from week one.
            </p>
            <div class="bento-highlight-pill text-brand">100+ Hours Saved</div>
          </div>

          <!-- Card 2 -->
          <div class="bento-card">
            <div class="bento-icon">💎</div>
            <h3 class="bento-card-title">Production Quality Codebases</h3>
            <p class="bento-card-desc">
              Every project looks and performs like it was crafted by a senior engineering architect. Clean code, linted, automated tests.
            </p>
            <div class="bento-highlight-pill text-green">100% Industry Grade</div>
          </div>

          <!-- Card 3 -->
          <div class="bento-card">
            <div class="bento-icon">🚀</div>
            <h3 class="bento-card-title">Direct Placement Pipeline</h3>
            <p class="bento-card-desc">
              Direct recruitment referrals to 50+ hiring partner companies across Noida, Gurugram, Delhi, Bengaluru, and Remote.
            </p>
            <div class="bento-highlight-pill text-brand">94%+ Placement Rate</div>
          </div>

          <!-- Card 4 -->
          <div class="bento-card">
            <div class="bento-icon">🛡️</div>
            <h3 class="bento-card-title">Daily 1-on-1 Architect Guidance</h3>
            <p class="bento-card-desc">
              Never get stuck on bugs or architecture alone. Senior instructors and tech leads hold daily review and debugging hours.
            </p>
            <div class="bento-highlight-pill text-green">Daily Live Mentorship</div>
          </div>

          <!-- Card 5 -->
          <div class="bento-card">
            <div class="bento-icon">📜</div>
            <h3 class="bento-card-title">Govt. & NIELIT Recognized</h3>
            <p class="bento-card-desc">
              ISO 9001:2015 certification and official NIELIT accreditation that adds undeniable credibility to your engineering resume.
            </p>
            <div class="bento-highlight-pill text-brand">Govt. Verified</div>
          </div>

          <!-- Card 6 -->
          <div class="bento-card">
            <div class="bento-icon">🏢</div>
            <h3 class="bento-card-title">Active Software Development Studio</h3>
            <p class="bento-card-desc">
              We are not just a coaching center. IT HUNT is an active software consultancy delivering real products to global clients.
            </p>
            <div class="bento-highlight-pill text-green">Active Client Studio</div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         8. SECTION 7: "Powered by Cutting-Edge Tech" (AIPost Section 9 AI Models Showcase Style)
         ===================================================================== -->
    <section class="aipost-section aipost-section-base">
      <div class="container">
        <div class="section-title-wrap text-center">
          <div class="aipost-pill-badge small">
            <span class="aipost-badge-dot"></span>
            <span>TECH STACK ARCHITECTURE</span>
          </div>
          <h2 class="aipost-section-heading">
            Powered by Next-Generation Technologies
          </h2>
          <p class="aipost-section-desc">
            Harness the power of modern frameworks, cloud systems, and AI models to engineer applications that stand out on any engineering team.
          </p>
        </div>

        <div class="tech-models-grid">
          <!-- Model 1: Full-Stack Core -->
          <div class="tech-model-card">
            <div class="model-badge">MERN & Next.js Engine</div>
            <h3 class="model-name">Full-Stack Studio</h3>
            <p class="model-desc">
              High-performance JavaScript & TypeScript ecosystem for building responsive, reactive web applications at scale.
            </p>
            <ul class="model-feature-list">
              <li><span class="check">✓</span> React 19 & Next.js 15 Server Components</li>
              <li><span class="check">✓</span> Node.js & Express REST / GraphQL APIs</li>
              <li><span class="check">✓</span> MongoDB & PostgreSQL Relational Schemas</li>
              <li><span class="check">✓</span> TypeScript Type Safety & Clean Architectures</li>
            </ul>
          </div>

          <!-- Model 2: AI & Python Intelligence -->
          <div class="tech-model-card featured-model">
            <div class="model-badge">AI & Intelligence Core</div>
            <h3 class="model-name">AI & Data Engineering</h3>
            <p class="model-desc">
              State-of-the-art AI integration for automating complex workflows, natural language processing, and smart assistants.
            </p>
            <ul class="model-feature-list">
              <li><span class="check">✓</span> Gemini 2.0 & OpenAI API Integration</li>
              <li><span class="check">✓</span> LangChain & Vector Embeddings Search</li>
              <li><span class="check">✓</span> Python FastAPI & Data Analysis Pipelines</li>
              <li><span class="check">✓</span> Automated Social Media & Post Generation</li>
            </ul>
          </div>

          <!-- Model 3: Cloud & DevOps -->
          <div class="tech-model-card">
            <div class="model-badge">DevOps & Cloud Core</div>
            <h3 class="model-name">Cloud Infrastructure</h3>
            <p class="model-desc">
              Enterprise deployment pipelines that automate testing, containerization, and high-availability zero-downtime releases.
            </p>
            <ul class="model-feature-list">
              <li><span class="check">✓</span> Docker Containers & Microservices</li>
              <li><span class="check">✓</span> GitHub Actions CI/CD Pipeline Automation</li>
              <li><span class="check">✓</span> AWS Cloud Services (EC2, S3, CloudFront)</li>
              <li><span class="check">✓</span> Nginx Reverse Proxies & SSL Hardening</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         9. SECTION 8: EXECUTIVE LEADERSHIP & FOUNDERS (Clean Studio Style)
         ===================================================================== -->
    <section class="aipost-section aipost-section-alt">
      <div class="container">
        <div class="section-title-wrap text-center">
          <div class="aipost-pill-badge small">
            <span class="aipost-badge-dot"></span>
            <span>EXECUTIVE LEADERSHIP</span>
          </div>
          <h2 class="aipost-section-heading">
            Led by Active Industry Architects
          </h2>
          <p class="aipost-section-desc">
            Meet the senior founders and directors steering technical direction, client partnerships, and hands-on developer training.
          </p>
        </div>

        <div class="founders-grid">
          <!-- Director -->
          <div class="founder-card" v-if="content.director">
            <div class="founder-avatar-box">
              <img :src="content.director?.image" :alt="content.director?.name" class="founder-img" @error="onImgError">
            </div>
            <div class="founder-info">
              <div class="founder-badge">{{ content.director?.tagline || 'FOUNDER & DIRECTOR' }}</div>
              <h3 class="founder-name">{{ content.director?.name }}</h3>
              <div class="founder-role">{{ content.director?.title }}</div>
              <p class="founder-quote">"{{ content.director?.message }}"</p>
              <div class="founder-skills">
                <span class="skill-tag" v-for="s in content.director?.skills" :key="s">{{ s }}</span>
              </div>
            </div>
          </div>

          <!-- Co-Founder -->
          <div class="founder-card" v-if="content.coFounder">
            <div class="founder-avatar-box">
              <img :src="content.coFounder?.image" :alt="content.coFounder?.name" class="founder-img" @error="onImgError">
            </div>
            <div class="founder-info">
              <div class="founder-badge">{{ content.coFounder?.tagline || 'CO-FOUNDER & TECH LEAD' }}</div>
              <h3 class="founder-name">{{ content.coFounder?.name }}</h3>
              <div class="founder-role">{{ content.coFounder?.title }}</div>
              <p class="founder-quote">"{{ content.coFounder?.message }}"</p>
              <div class="founder-skills">
                <span class="skill-tag" v-for="s in content.coFounder?.skills" :key="s">{{ s }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         10. SECTION 9: FREQUENTLY ASKED QUESTIONS (AIPost Section 10 Accordion)
         ===================================================================== -->
    <section class="aipost-section aipost-section-base">
      <div class="container">
        <div class="section-title-wrap text-center">
          <div class="aipost-pill-badge small">
            <span class="aipost-badge-dot"></span>
            <span>FAQ</span>
          </div>
          <h2 class="aipost-section-heading">
            Frequently Asked Questions
          </h2>
          <p class="aipost-section-desc">
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
    </section>

    <!-- =====================================================================
         11. SECTION 10: FINAL CONVERSION BANNER (AIPost Section 11 Style)
         ===================================================================== -->
    <section class="aipost-cta-section">
      <div class="container">
        <div class="aipost-cta-banner">
          <div class="cta-glow-element"></div>
          <div class="cta-content-wrap text-center">
            <div class="aipost-pill-badge small">
              <span class="aipost-badge-dot"></span>
              <span>GET STARTED TODAY</span>
            </div>
            <h2 class="cta-main-title">
              Ready to Transform Your Tech Career?
            </h2>
            <p class="cta-subtitle">
              Join thousands of developers, students, and engineers who turned theory into high-paying engineering careers with IT HUNT.
            </p>

            <div class="cta-buttons-group">
              <button class="aipost-btn-primary aipost-btn-lg" @click="$emit('set-tab', 'admission')">
                <span>Start Free Application ➜</span>
              </button>
              <button class="aipost-btn-secondary aipost-btn-lg" @click="$emit('set-tab', 'internships')">
                <span>Explore All Tracks</span>
              </button>
            </div>

            <div class="cta-micro-guarantee">
              <span>✔ Free Initial Career Consultation</span>
              <span>·</span>
              <span>✔ 100% Practical Client Sprints</span>
              <span>·</span>
              <span>✔ Flexible Batches Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         12. SECTION 11: POWERED BY CODEMAYA (AIPost Section 12 Style)
         ===================================================================== -->
    <section class="aipost-codemaya-section">
      <div class="container">
        <div class="codemaya-banner text-center">
          <p class="codemaya-tagline">Proudly powered by innovative engineering by</p>
          <a href="https://www.codemaya.com" target="_blank" rel="noopener noreferrer" class="codemaya-logo-link">
            <span class="codemaya-brand-text">Code<span class="text-brand">Maya</span></span>
          </a>
          <p class="codemaya-subtext">
            Discover cutting-edge software solutions and digital transformation services at 
            <a href="https://www.codemaya.com" target="_blank" rel="noopener noreferrer" class="text-brand font-bold">www.codemaya.com</a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['set-tab', 'apply-course', 'open-job-modal']);

// Interactive Search Input State
const searchQuery = ref('');
const placeholders = [
  'e.g. MERN Fullstack Internship',
  'e.g. Python & AI Agent Engineering',
  'e.g. Flutter & iOS Mobile Development',
  'e.g. NIELIT O-Level & A-Level Certification',
  'e.g. Cloud DevOps & Microservices'
];
const placeholderIdx = ref(0);
let placeholderTimer = null;

const activePlaceholder = computed(() => {
  return placeholders[placeholderIdx.value] || placeholders[0];
});

// Interactive Specialization Pills
const stackPills = [
  { id: 'mern', name: 'MERN Stack', icon: '⚡' },
  { id: 'ai', name: 'Python & AI', icon: '🤖' },
  { id: 'mobile', name: 'Flutter & iOS', icon: '📱' },
  { id: 'devops', name: 'Cloud & DevOps', icon: '☁️' },
  { id: 'nextjs', name: 'Next.js 15', icon: '🌐' }
];
const selectedTrackId = ref('mern');

const selectTrackPill = (tag) => {
  selectedTrackId.value = tag.id;
  searchQuery.value = tag.name;
  handleTrackSearch();
};

const handleTrackSearch = () => {
  emit('set-tab', 'internships');
};

// Interactive Showcase Card Data (Mac-style App & Terminal view)
const showcaseProjects = [
  {
    id: 'cloudpay',
    title: 'FinTech Billing Gateway',
    icon: '💳',
    track: 'MERN Stack & Cloud',
    name: 'CloudPay — Multi-Tenant High-Throughput Billing Engine',
    desc: 'Engineered by IT HUNT interns for enterprise SaaS billing: webhooks, auto-invoicing, idempotency keys, and sub-50ms latency.',
    file: 'paymentEngine.service.ts',
    stack: ['React 19', 'Node.js', 'Express', 'Redis', 'PostgreSQL', 'Docker'],
    metrics: { coverage: '99.4%', uptime: '99.98%', prs: '48 Merged', interns: '6 Engineers' },
    codeSnippet: [
      "import { PaymentGateway, WebhookDispatcher } from '@cloudpay/core';",
      "import { RedisCache } from '@cloudpay/cache';",
      "",
      "export class TransactionManager {",
      "  async executePayment(payload: CheckoutPayload) {",
      "    const lock = await RedisCache.acquireLock(payload.idempotencyKey);",
      "    const charge = await PaymentGateway.processSecureIntent(payload);",
      "    await WebhookDispatcher.emit('payment.succeeded', charge);",
      "    return { status: 'COMPLETED', transactionId: charge.id };",
      "  }",
      "}"
    ]
  },
  {
    id: 'aipost',
    title: 'AI Social Post Autopilot',
    icon: '🤖',
    track: 'Python & Gemini AI',
    name: 'AI PostCraft — Autonomous Social Media Generation Engine',
    desc: 'Reads brand websites, generates viral multi-slide carousels, drafts copy, and publishes directly to social channels.',
    file: 'contentGenerator.py',
    stack: ['Python 3.12', 'FastAPI', 'Gemini 2.0 API', 'LangChain', 'Vue 3', 'Canvas API'],
    metrics: { coverage: '98.8%', uptime: '100%', prs: '36 Merged', interns: '5 Engineers' },
    codeSnippet: [
      "from fastapi import FastAPI, BackgroundTasks",
      "from ai_engine.models import GeminiProGenerator",
      "",
      "app = FastAPI(title='AIPost Engine')",
      "@app.post('/api/generate-post')",
      "async def generate_post(website_url: str):",
      "    brief = await GeminiProGenerator.extract_brand_dna(website_url)",
      "    post = await GeminiProGenerator.synthesize_carousel(brief)",
      "    return {'success': True, 'slides': post.slides, 'caption': post.caption}"
    ]
  },
  {
    id: 'healthpulse',
    title: 'HealthPulse Telemedicine',
    icon: '📱',
    track: 'Mobile & WebRTC',
    name: 'HealthPulse — Realtime Telemedicine & EHR Platform',
    desc: 'Cross-platform mobile application for doctor consultations with end-to-end encrypted video calling and instant prescriptions.',
    file: 'consultationController.dart',
    stack: ['Flutter 3.24', 'Dart', 'WebRTC', 'Firebase Auth', 'Node.js', 'Socket.io'],
    metrics: { coverage: '97.6%', uptime: '99.9%', prs: '52 Merged', interns: '7 Engineers' },
    codeSnippet: [
      "import 'package:flutter/material.dart';",
      "import 'package:healthpulse/webrtc_service.dart';",
      "",
      "class VideoConsultationRoom extends StatefulWidget {",
      "  final String appointmentId;",
      "  const VideoConsultationRoom({required this.appointmentId});",
      "  @override",
      "  Widget build(BuildContext context) {",
      "    return WebRTCStreamView(channelId: appointmentId, isEncrypted: true);",
      "  }",
      "}"
    ]
  }
];

const activeShowcaseIdx = ref(0);
const currentProject = computed(() => showcaseProjects[activeShowcaseIdx.value] || showcaseProjects[0]);

// Animated Stats Counter
const statsSectionRef = ref(null);
const animatedStats = ref([]);
let observer = null;

const startStatsAnimation = () => {
  const statsList = props.content?.stats || [];
  if (!statsList.length) return;

  const duration = 1500;
  const startTime = performance.now();

  const parsedStats = statsList.map(s => {
    const raw = String(s.number || '');
    if (raw.includes('4.9')) return { target: 4.9, isFloat: true, suffix: ' ★' };
    if (raw.includes('5,000') || raw.includes('5000')) return { target: 5000, isFloat: false, formatComma: true, suffix: '+' };
    if (raw.includes('100')) return { target: 100, isFloat: false, suffix: '%' };
    if (raw.includes('4')) return { target: 4, isFloat: false, suffix: '+ Yrs' };
    const match = raw.match(/([0-9.]+)/);
    if (match) {
      const val = parseFloat(match[1]);
      const suffix = raw.replace(match[1], '');
      return { target: val, isFloat: raw.includes('.'), suffix };
    }
    return { target: null, fallback: raw };
  });

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

    animatedStats.value = parsedStats.map(item => {
      if (item.target === null) return item.fallback;
      const current = item.target * ease;
      if (item.isFloat) return current.toFixed(1) + item.suffix;
      const intVal = Math.round(current);
      const formatted = item.formatComma ? intVal.toLocaleString('en-US') : String(intVal);
      return formatted + item.suffix;
    });

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

// Section 4 Live Projects Data
const liveProjectsList = [
  {
    id: 1,
    name: 'SaaS Billing & Invoice Engine',
    logo: '💳',
    category: 'FinTech Engineering',
    platform: 'MERN Stack',
    description: 'Enterprise multi-tenant payment gateway processing recurring client subscriptions, webhooks, and automated PDF tax invoices.',
    features: ['High-throughput Redis cache', 'Stripe & Razorpay integrations', 'Sub-45ms average response time'],
    stats: { speed: '<45ms', users: '10k+ MAU', rating: '4.9 ★' }
  },
  {
    id: 2,
    name: 'AI Post & Carousel Generator',
    logo: '🤖',
    category: 'Autonomous AI Platform',
    platform: 'Python & Vue 3',
    description: 'Intelligent social media autopilot that reads website URLs, analyzes tone, and generates multi-slide carousels automatically.',
    features: ['Gemini 2.0 Pro Multimodal API', 'Dynamic Canvas visual engine', 'Automated social scheduling'],
    stats: { speed: '1.2s Gen', users: '5k+ Posts', rating: '5.0 ★' }
  },
  {
    id: 3,
    name: 'Logistics Fleet Tracking Portal',
    logo: '🚚',
    category: 'IoT & Real-Time Tracking',
    platform: 'Full-Stack Node.js',
    description: 'Live GPS vehicle telemetry dashboard with geospatial geofencing alerts, route analytics, and driver dispatch coordination.',
    features: ['WebSockets realtime stream', 'PostGIS spatial queries', 'Driver mobile companion app'],
    stats: { speed: 'Realtime', users: '250+ Trucks', rating: '4.8 ★' }
  }
];

// Section 5 4-Stage Pipeline Steps
const workflowSteps = [
  {
    number: '1',
    icon: '🎯',
    phase: 'DIAGNOSTIC & ROADMAP',
    title: 'Skill Assessment & Track Allocation',
    desc: 'We evaluate your current foundation and match you into the ideal high-impact track: MERN Fullstack, Python AI, or Mobile Systems.',
    points: ['1-on-1 technical evaluation', 'Customized milestone roadmap', 'Workstation & dev environment setup']
  },
  {
    number: '2',
    icon: '💻',
    phase: 'PRODUCTION SPRINT IMMERSION',
    title: 'Real Client Codebase Immersion',
    desc: 'You join active engineering sprint teams, attend daily standups, pick up real GitHub tickets, and build scalable features.',
    points: ['Active Git branches & PR reviews', 'Agile sprint methodology', 'Docker containerized workflows']
  },
  {
    number: '3',
    icon: '🛡️',
    phase: 'SENIOR ARCHITECT CODE REVIEWS',
    title: '1-on-1 Mentorship & System Design',
    desc: 'Senior tech leads review your pull requests line-by-line, teaching memory optimization, security hardening, and database indexing.',
    points: ['Deep architectural reviews', 'Security & clean code enforcement', 'Live pair-programming sessions']
  },
  {
    number: '4',
    icon: '🏆',
    phase: 'PORTFOLIO & PLACEMENT LAUNCH',
    title: 'Verified Certification & Hiring Drives',
    desc: 'Deploy your portfolio live to cloud, obtain ISO/NIELIT verified credentials, and get referred to 50+ hiring partner tech companies.',
    points: ['Online QR verifiable certificate', 'Mock DSA & tech interview rounds', 'Direct placement referrals']
  }
];

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

// Syntax Highlighting Tokens for Terminal (Safe placeholder tokenizer)
const escapeHtml = (text) => {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const highlightCode = (line) => {
  if (!line) return '&nbsp;';
  const trimmed = line.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('#') || trimmed.startsWith('/*')) {
    return `<span class="code-comment">${escapeHtml(line)}</span>`;
  }
  
  let text = escapeHtml(line);

  // Step 1: Extract string literals and replace with non-word symbol placeholders
  const stringLiterals = [];
  text = text.replace(/(&#39;.*?&#39;|&quot;.*?&quot;|'.*?'|".*?")/g, (match) => {
    const key = `§§STR_${stringLiterals.length}§§`;
    stringLiterals.push(match);
    return key;
  });

  // Step 2: Highlight keywords
  text = text.replace(/\b(import|from|export|default|function|const|let|var|return|class|async|await|def|if|else)\b/g, '<span class="code-kw">$1</span>');

  // Step 3: Highlight functions
  text = text.replace(/\b(executePayment|acquireLock|processSecureIntent|emit|generate_post|extract_brand_dna|synthesize_carousel|build|process)\b/g, '<span class="code-fn">$1</span>');

  // Step 4: Highlight properties / object keys
  text = text.replace(/\b(status|transactionId|title|isEncrypted|channelId|appointmentId|idempotencyKey)\b/g, '<span class="code-prop">$1</span>');

  // Step 5: Restore string literals cleanly
  text = text.replace(/§§STR_(\d+)§§/g, (_, idx) => `<span class="code-str">${stringLiterals[idx]}</span>`);

  return text;
};

const onImgError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%231e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8">IT HUNT Center</text></svg>';
};

onMounted(() => {
  const statsList = props.content?.stats || [];
  animatedStats.value = statsList.map(s => s.number);

  placeholderTimer = setInterval(() => {
    placeholderIdx.value = (placeholderIdx.value + 1) % placeholders.length;
  }, 2800);

  if (typeof window !== 'undefined' && 'IntersectionObserver' in window && statsSectionRef.value) {
    let triggered = false;
    observer = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting && !triggered) {
        triggered = true;
        startStatsAnimation();
      }
    }, { threshold: 0.15 });
    observer.observe(statsSectionRef.value);
  } else {
    startStatsAnimation();
  }
});

onUnmounted(() => {
  if (placeholderTimer) clearInterval(placeholderTimer);
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* ==========================================================================
   AIPOST LAYOUT & INTERACTION STRUCTURE WITH NATIVE IT HUNT BRAND PALETTE
   ==========================================================================
   Uses the project's original CSS variables:
   - Primary Accent: var(--color-ai-orange, #f97316) & var(--color-ai-yellow, #f59e0b)
   - Gradients: var(--gradient-ai-hero) & var(--gradient-ai-btn)
   - Surfaces: var(--bg-cyber-dark), var(--bg-card-glass), var(--border-cyber)
   - Supports both dark mode and light mode naturally via CSS variables!
   ========================================================================== */

.aipost-wrapper {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: var(--bg-cyber-dark, #070a12);
  color: var(--text-main, #f8fafc);
  font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
}

/* ==========================================================================
   1. HERO SECTION
   ========================================================================== */

.aipost-hero {
  position: relative;
  padding: 5rem 1rem 4rem;
  overflow: hidden;
  background: radial-gradient(circle at 50% 0%, var(--glow-orange, rgba(249, 115, 22, 0.14)) 0%, transparent 60%);
}

.aipost-hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}

.aipost-hero-glow-1 {
  top: -10%;
  left: 20%;
  width: 500px;
  height: 500px;
  background: var(--glow-orange, rgba(249, 115, 22, 0.18));
}

.aipost-hero-glow-2 {
  top: 15%;
  right: 15%;
  width: 450px;
  height: 450px;
  background: var(--glow-yellow, rgba(245, 158, 11, 0.15));
}

.aipost-hero-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

/* Pill Badge */
.aipost-badge-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.aipost-pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.1rem;
  border-radius: var(--radius-full, 9999px);
  background: rgba(249, 115, 22, 0.08);
  border: 1px solid var(--border-cyber-glow, rgba(249, 115, 22, 0.35));
  color: var(--color-ai-orange, #f97316);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
}

.aipost-pill-badge.small {
  padding: 0.35rem 0.9rem;
  font-size: 0.75rem;
  margin-bottom: 1rem;
}

.aipost-badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-ai-orange, #f97316);
  box-shadow: 0 0 10px var(--color-ai-orange, #f97316);
  animation: pulse-dot-anim 2s infinite ease-in-out;
}

@keyframes pulse-dot-anim {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.6; }
}

/* Hero Headline */
.aipost-hero-headline {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: clamp(2.4rem, 5.2vw, 4.4rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--text-main, #f8fafc);
  margin-bottom: 1.5rem;
  max-width: 1050px;
  margin-left: auto;
  margin-right: auto;
}

.aipost-gradient-text {
  background: var(--gradient-ai-hero, linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #f59e0b 100%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-brand, .text-cyan {
  color: var(--color-ai-orange, #f97316) !important;
}

.text-green {
  color: #10B981 !important;
}

/* Subtitle */
.aipost-hero-subtitle {
  font-size: clamp(1.05rem, 1.8vw, 1.25rem);
  color: var(--text-muted, #94a3b8);
  line-height: 1.65;
  max-width: 820px;
  margin: 0 auto 2.5rem;
}

/* ==========================================================================
   INTERACTIVE INPUT BAR
   ========================================================================== */

.aipost-input-box-wrapper {
  max-width: 760px;
  margin: 0 auto 4rem;
}

.aipost-input-box {
  display: flex;
  align-items: center;
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.85));
  border: 1.5px solid var(--border-cyber-glow, rgba(249, 115, 22, 0.45));
  border-radius: var(--radius-full, 9999px);
  padding: 0.5rem 0.5rem 0.5rem 1.4rem;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.35), 0 0 25px var(--glow-orange, rgba(249, 115, 22, 0.2));
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.aipost-input-box:focus-within {
  border-color: var(--color-ai-orange, #f97316);
  box-shadow: 0 14px 45px var(--glow-orange, rgba(249, 115, 22, 0.35));
}

.aipost-input-icon {
  color: var(--color-ai-orange, #f97316);
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
}

.aipost-hero-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-main, #f8fafc);
  padding: 0.5rem 0;
}

.aipost-hero-input::placeholder {
  color: var(--text-dim, #64748b);
  font-weight: 400;
}

/* Buttons */
.aipost-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--gradient-ai-btn, linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fbbf24 100%));
  color: #ffffff;
  border: none;
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.85rem 1.6rem;
  border-radius: var(--radius-full, 9999px);
  cursor: pointer;
  box-shadow: 0 4px 18px var(--glow-orange, rgba(249, 115, 22, 0.4));
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.aipost-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--glow-orange, rgba(249, 115, 22, 0.6));
}

.aipost-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.15));
  color: var(--text-main, #f8fafc);
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.85rem 1.6rem;
  border-radius: var(--radius-full, 9999px);
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.aipost-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: var(--color-ai-orange, #f97316);
  color: #ffffff;
}

.aipost-btn-lg {
  padding: 1rem 2.2rem;
  font-size: 1.05rem;
}

.w-full {
  width: 100%;
}

/* Quick Stack Filter Tags */
.aipost-quick-tags {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.25rem;
}

.quick-tag-label {
  font-size: 0.82rem;
  color: var(--text-dim, #64748b);
  font-weight: 600;
}

.quick-tag-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.8rem;
  border-radius: var(--radius-full, 9999px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  color: var(--text-muted, #94a3b8);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-tag-btn:hover,
.quick-tag-btn.active {
  background: rgba(249, 115, 22, 0.15);
  border-color: rgba(249, 115, 22, 0.5);
  color: var(--color-ai-orange, #f97316);
}

/* Guarantees Row */
.aipost-guarantee-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
  font-size: 0.85rem;
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

.aipost-showcase-container {
  max-width: 1100px;
  margin: 0 auto;
  text-align: left;
}

.aipost-showcase-card {
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.9));
  border: 1px solid var(--border-cyber-glow, rgba(249, 115, 22, 0.35));
  border-radius: var(--radius-lg, 20px);
  box-shadow: 0 25px 65px rgba(0, 0, 0, 0.5), 0 0 35px var(--glow-orange, rgba(249, 115, 22, 0.12));
  overflow: hidden;
  backdrop-filter: blur(20px);
}

/* Card Header */
.showcase-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  background: rgba(2, 6, 23, 0.7);
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
  color: var(--color-ai-orange, #f97316);
  background: rgba(249, 115, 22, 0.12);
  border-color: rgba(249, 115, 22, 0.35);
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
  grid-template-columns: 1.3fr 0.9fr;
  gap: 1.5rem;
  padding: 1.5rem;
}

.project-headline-wrap {
  margin-bottom: 1.25rem;
}

.project-track-chip {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-ai-orange, #f97316);
  background: rgba(249, 115, 22, 0.12);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.project-main-title {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main, #ffffff);
  margin-bottom: 0.4rem;
}

.project-brief {
  font-size: 0.88rem;
  color: var(--text-muted, #94a3b8);
  line-height: 1.55;
}

/* Terminal Box */
.showcase-terminal-box {
  background: #020617;
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  border-radius: 12px;
  padding: 0.85rem 1rem;
  margin-bottom: 1rem;
  font-family: var(--font-mono, 'Fira Code', monospace);
}

.terminal-titlebar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: #64748b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
}

.terminal-code {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.6;
  overflow-x: auto;
}

.terminal-line {
  display: flex;
  align-items: baseline;
}

.line-num {
  width: 25px;
  color: #475569;
  font-size: 0.72rem;
  user-select: none;
  flex-shrink: 0;
}

.line-content {
  flex: 1;
  white-space: pre;
}

/* Syntax Token Colors */
:deep(.code-kw) { color: #f43f5e; font-weight: 600; }
:deep(.code-fn) { color: #38bdf8; }
:deep(.code-str) { color: #34d399; }
:deep(.code-prop) { color: #fbbf24; }
:deep(.code-comment) { color: #64748b; font-style: italic; }

/* Stack Badges */
.project-stack-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.stack-badge {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  color: #cbd5e1;
  font-weight: 600;
}

/* Right Pane */
.metrics-panel-card {
  background: rgba(2, 6, 23, 0.6);
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.06));
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.metrics-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.metrics-panel-header h4 {
  font-size: 0.88rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.branch-tag {
  font-size: 0.7rem;
  background: rgba(249, 115, 22, 0.15);
  color: var(--color-ai-orange, #f97316);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.metric-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.05));
  padding: 0.85rem;
  border-radius: 10px;
}

.metric-val {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.25rem;
  font-weight: 800;
  display: block;
  margin-bottom: 0.2rem;
  color: #ffffff;
}

.metric-lbl {
  font-size: 0.72rem;
  color: #94a3b8;
  font-weight: 600;
}

.review-status-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 10px;
  padding: 0.75rem;
  margin-bottom: 1.25rem;
}

.reviewer-avatar {
  font-size: 1.5rem;
}

.reviewer-name {
  font-size: 0.78rem;
  font-weight: 700;
  color: #10B981;
}

.reviewer-comment {
  font-size: 0.74rem;
  color: #cbd5e1;
  font-style: italic;
}

.showcase-actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: auto;
}

/* ==========================================================================
   2. STATS COUNTER BAND
   ========================================================================== */

.aipost-stats-band {
  background: rgba(15, 23, 42, 0.6);
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
  background: var(--bg-card-glass, rgba(255, 255, 255, 0.02));
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.06));
  padding: 1rem 1.25rem;
  border-radius: 16px;
  transition: all 0.2s ease;
}

.stat-pill-card:hover {
  border-color: rgba(249, 115, 22, 0.4);
  background: rgba(249, 115, 22, 0.05);
}

.stat-num {
  font-family: var(--font-heading, 'Outfit', sans-serif);
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

.aipost-section {
  padding: 5rem 1rem;
  position: relative;
}

.aipost-section-base {
  background: var(--bg-cyber-dark, #070a12);
  color: var(--text-main, #f8fafc);
}

.aipost-section-alt {
  background: rgba(15, 23, 42, 0.4);
  color: var(--text-main, #f8fafc);
}

.section-title-wrap {
  max-width: 850px;
  margin: 0 auto 3.5rem;
}

.text-center {
  text-align: center;
}

.aipost-section-heading {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: clamp(2rem, 3.8vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text-main, #f8fafc);
}

.aipost-section-desc {
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--text-muted, #94a3b8);
}

/* ==========================================================================
   3. HOMEWORK CARDS (AIPost Section 2)
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
   4. ACCELERATORS GRID (AIPost Section 3 Format Cards)
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
   5. EXAMPLES / LIVE PROJECTS (AIPost Section 4 Style)
   ========================================================================== */

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.example-engagement-stats {
  display: flex;
  gap: 0.75rem;
  font-size: 0.78rem;
  color: var(--text-muted, #94a3b8);
  font-weight: 600;
}

.example-view-btn {
  background: transparent;
  border: none;
  color: var(--color-ai-orange, #f97316);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.example-view-btn:hover {
  text-decoration: underline;
  color: var(--color-ai-yellow, #f59e0b);
}

/* ==========================================================================
   6. 4-STAGE PIPELINE (AIPost Section 6 "How It Works")
   ========================================================================== */

.pipeline-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.pipeline-step-item {
  display: flex;
  gap: 1.5rem;
  position: relative;
  margin-bottom: 2rem;
}

.pipeline-step-number-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 44px;
  flex-shrink: 0;
}

.pipeline-step-number {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--gradient-ai-btn, linear-gradient(135deg, #ea580c 0%, #f97316 100%));
  color: #ffffff;
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-weight: 800;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px var(--glow-orange, rgba(249, 115, 22, 0.35));
  z-index: 2;
}

.pipeline-line {
  flex: 1;
  width: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0.5rem 0;
}

.pipeline-step-card {
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.75));
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  border-radius: 16px;
  padding: 1.75rem;
  flex: 1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.step-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.step-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(249, 115, 22, 0.12);
  color: var(--color-ai-orange, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.step-phase-badge {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--color-ai-orange, #f97316);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.step-title {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-main, #ffffff);
  margin: 0;
}

.step-desc {
  font-size: 0.92rem;
  color: var(--text-muted, #94a3b8);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.step-subpoints {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.step-subpoint-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: #cbd5e1;
  font-weight: 600;
}

.point-check {
  color: #10B981;
  font-weight: 800;
}

/* ==========================================================================
   7. BENTO GRID (AIPost Section 7 Benefits)
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
   8. TECH MODELS SHOWCASE (AIPost Section 9)
   ========================================================================== */

.tech-models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.75rem;
  max-width: 1150px;
  margin: 0 auto;
}

.tech-model-card {
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.7));
  border: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  border-radius: 20px;
  padding: 2.25rem 1.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.tech-model-card:hover {
  border-color: rgba(249, 115, 22, 0.5);
  transform: translateY(-4px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.35);
}

.tech-model-card.featured-model {
  border: 2px solid var(--color-ai-orange, #f97316);
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.9));
}

.model-badge {
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--color-ai-orange, #f97316);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.model-name {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-main, #ffffff);
  margin-bottom: 0.75rem;
}

.model-desc {
  font-size: 0.9rem;
  color: var(--text-muted, #94a3b8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.model-feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.model-feature-list li {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: #cbd5e1;
  margin-bottom: 0.6rem;
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
   10. FAQ ACCORDION (AIPost Section 10)
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
   11. FINAL CTA BANNER (AIPost Section 11)
   ========================================================================== */

.aipost-cta-section {
  padding: 4rem 1rem;
  background: var(--bg-cyber-dark, #070a12);
}

.aipost-cta-banner {
  background: var(--bg-card-glass, rgba(15, 23, 42, 0.85));
  border: 1.5px solid var(--border-cyber-glow, rgba(249, 115, 22, 0.45));
  border-radius: 24px;
  padding: 4.5rem 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px var(--glow-orange, rgba(249, 115, 22, 0.2));
  backdrop-filter: blur(16px);
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
  background: radial-gradient(circle, var(--glow-orange, rgba(249, 115, 22, 0.25)) 0%, transparent 70%);
  filter: blur(50px);
  pointer-events: none;
}

.cta-main-title {
  font-family: var(--font-heading, 'Outfit', sans-serif);
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
   12. POWERED BY CODEMAYA (AIPost Section 12)
   ========================================================================== */

.aipost-codemaya-section {
  padding: 3rem 1rem 4rem;
  background: var(--bg-cyber-dark, #070a12);
  border-top: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
}

.codemaya-banner {
  max-width: 600px;
  margin: 0 auto;
}

.codemaya-tagline {
  font-size: 0.88rem;
  color: var(--text-dim, #64748b);
  margin-bottom: 0.5rem;
}

.codemaya-brand-text {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-main, #ffffff);
  letter-spacing: -0.02em;
}

.codemaya-subtext {
  font-size: 0.8rem;
  color: var(--text-dim, #64748b);
  margin-top: 0.5rem;
}

/* ==========================================================================
   LIGHT THEME SUPPORT (High-Contrast, Crisp, Clean & Polished)
   ========================================================================== */

:global(body.light-theme) .aipost-wrapper {
  background-color: #f8fafc;
  color: #0f172a;
}

:global(body.light-theme) .aipost-hero {
  background: radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.1) 0%, transparent 60%), #f8fafc;
}

:global(body.light-theme) .aipost-hero-headline,
:global(body.light-theme) .aipost-section-heading,
:global(body.light-theme) .project-main-title,
:global(body.light-theme) .homework-card-title,
:global(body.light-theme) .acc-title,
:global(body.light-theme) .example-client-name,
:global(body.light-theme) .step-title,
:global(body.light-theme) .bento-card-title,
:global(body.light-theme) .model-name,
:global(body.light-theme) .founder-name,
:global(body.light-theme) .faq-question-text,
:global(body.light-theme) .stat-label-title,
:global(body.light-theme) .metrics-panel-header h4,
:global(body.light-theme) .codemaya-brand-text {
  color: #0f172a !important;
}

:global(body.light-theme) .aipost-hero-subtitle,
:global(body.light-theme) .aipost-section-desc,
:global(body.light-theme) .project-brief,
:global(body.light-theme) .homework-card-desc,
:global(body.light-theme) .acc-sub,
:global(body.light-theme) .example-desc-text,
:global(body.light-theme) .step-desc,
:global(body.light-theme) .bento-card-desc,
:global(body.light-theme) .model-desc,
:global(body.light-theme) .faq-answer-text,
:global(body.light-theme) .founder-quote,
:global(body.light-theme) .acc-list li,
:global(body.light-theme) .model-feature-list li,
:global(body.light-theme) .step-subpoint-item {
  color: #334155 !important;
}

:global(body.light-theme) .stat-micro-note,
:global(body.light-theme) .example-meta-text,
:global(body.light-theme) .example-engagement-stats,
:global(body.light-theme) .feature-bullet,
:global(body.light-theme) .quick-tag-label,
:global(body.light-theme) .guarantee-item,
:global(body.light-theme) .founder-role,
:global(body.light-theme) .acc-cost-line,
:global(body.light-theme) .codemaya-tagline,
:global(body.light-theme) .codemaya-subtext {
  color: #64748b !important;
}

:global(body.light-theme) .aipost-pill-badge {
  background: #ffffff !important;
  border-color: rgba(249, 115, 22, 0.4) !important;
  color: #ea580c !important;
  box-shadow: 0 2px 10px rgba(249, 115, 22, 0.08) !important;
}

/* Input Bar & Filter Tags */
:global(body.light-theme) .aipost-input-box {
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06) !important;
}

:global(body.light-theme) .aipost-hero-input {
  color: #0f172a !important;
}

:global(body.light-theme) .aipost-hero-input::placeholder {
  color: #94a3b8 !important;
}

:global(body.light-theme) .quick-tag-btn {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
  color: #475569 !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02) !important;
}

:global(body.light-theme) .quick-tag-btn:hover,
:global(body.light-theme) .quick-tag-btn.active {
  background: rgba(249, 115, 22, 0.12) !important;
  border-color: rgba(249, 115, 22, 0.5) !important;
  color: #ea580c !important;
}

/* Showcase Card & Tabs */
:global(body.light-theme) .aipost-showcase-card {
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

/* Terminal Stays Dark & High-Contrast */
:global(body.light-theme) .showcase-terminal-box {
  background: #0d1117 !important;
  border-color: #30363d !important;
}

:global(body.light-theme) .terminal-titlebar {
  color: #8b949e !important;
  border-bottom-color: #21262d !important;
}

:global(body.light-theme) .line-num {
  color: #6e7681 !important;
}

:global(body.light-theme) .terminal-code code {
  color: #e6edf3 !important;
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

:global(body.light-theme) .aipost-btn-secondary {
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
  color: #0f172a !important;
  font-weight: 700 !important;
}

:global(body.light-theme) .aipost-btn-secondary:hover {
  background: #f8fafc !important;
  border-color: #ea580c !important;
  color: #ea580c !important;
}

/* Stats Counter Band */
:global(body.light-theme) .aipost-stats-band {
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

/* Sections 2 - 9 Backgrounds & Cards */
:global(body.light-theme) .aipost-section-base {
  background: #ffffff !important;
}

:global(body.light-theme) .aipost-section-alt {
  background: #f8fafc !important;
}

:global(body.light-theme) .homework-card,
:global(body.light-theme) .accelerator-card,
:global(body.light-theme) .example-card,
:global(body.light-theme) .pipeline-step-card,
:global(body.light-theme) .bento-card,
:global(body.light-theme) .tech-model-card,
:global(body.light-theme) .founder-card,
:global(body.light-theme) .faq-accordion-item {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
}

:global(body.light-theme) .accelerator-card.featured,
:global(body.light-theme) .tech-model-card.featured-model {
  border-color: #ea580c !important;
  box-shadow: 0 12px 35px rgba(234, 88, 12, 0.12) !important;
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
:global(body.light-theme) .aipost-cta-section {
  background: #f8fafc !important;
}

:global(body.light-theme) .aipost-cta-banner {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
  border-color: rgba(249, 115, 22, 0.4) !important;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25) !important;
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

:global(body.light-theme) .cta-buttons-group .aipost-btn-secondary {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(255, 255, 255, 0.25) !important;
  color: #ffffff !important;
}

/* Section 11: CodeMaya */
:global(body.light-theme) .aipost-codemaya-section {
  background: #f8fafc !important;
  border-top-color: #e2e8f0 !important;
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
.aipost-wrapper {
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
  .aipost-hero {
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

  .tech-models-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .founders-grid {
    grid-template-columns: 1fr;
    max-width: 650px;
  }

  .founder-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.75rem;
  }

  .founder-skills {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  /* Hero Spacing & Typography */
  .aipost-hero {
    padding: 2.25rem 0.85rem 2.25rem;
    overflow: hidden;
  }

  .aipost-badge-wrapper {
    margin-bottom: 1.1rem;
  }

  .aipost-pill-badge {
    padding: 0.35rem 0.85rem;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
  }

  .aipost-hero-headline {
    font-size: clamp(1.65rem, 6.2vw, 2.25rem);
    line-height: 1.22;
    margin-bottom: 1rem;
    padding: 0 0.25rem;
    word-break: break-word;
  }

  .aipost-hero-subtitle {
    font-size: 0.92rem;
    line-height: 1.55;
    margin-bottom: 1.75rem;
    padding: 0 0.4rem;
  }

  /* Interactive Input Box */
  .aipost-input-box-wrapper {
    margin-bottom: 2.25rem;
    padding: 0;
  }

  .aipost-input-box {
    border-radius: 18px;
    flex-direction: column;
    padding: 0.75rem;
    gap: 0.75rem;
    align-items: stretch;
  }

  .aipost-input-icon {
    display: none;
  }

  .aipost-hero-input {
    width: 100%;
    text-align: center;
    font-size: 0.92rem;
    padding: 0.4rem 0.25rem;
  }

  .aipost-hero-cta {
    width: 100%;
    justify-content: center;
    min-height: 48px;
    padding: 0.8rem 1.25rem;
    font-size: 0.92rem;
  }

  /* Specialization Quick Pills */
  .aipost-quick-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 1rem;
    padding: 0 0.25rem;
  }

  .quick-tag-label {
    width: 100%;
    text-align: center;
    font-size: 0.75rem;
    margin-bottom: 0.2rem;
  }

  .quick-tag-btn {
    padding: 0.35rem 0.65rem;
    font-size: 0.76rem;
    border-radius: 8px;
  }

  /* Guarantees 2x2 Grid on Mobile */
  .aipost-guarantee-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 0.75rem;
    margin-top: 1.25rem;
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
  .aipost-showcase-container {
    width: 100%;
    padding: 0;
  }

  .aipost-showcase-card {
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
  .aipost-stats-band {
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
  .aipost-section {
    padding: 3rem 0.85rem;
  }

  .section-title-wrap {
    margin: 0 auto 2rem;
  }

  .aipost-section-heading {
    font-size: clamp(1.55rem, 5.5vw, 2.15rem);
    margin-bottom: 0.75rem;
    line-height: 1.22;
  }

  .aipost-section-desc {
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

  .example-engagement-stats {
    font-size: 0.74rem;
    gap: 0.5rem;
  }

  .example-view-btn {
    align-self: flex-start;
    font-size: 0.82rem;
  }

  /* Section 5: Pipeline */
  .pipeline-step-item {
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
  }

  .pipeline-step-number-wrap {
    flex-direction: row;
    width: 100%;
    align-items: center;
    gap: 0.5rem;
  }

  .pipeline-step-number {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }

  .pipeline-line {
    display: none;
  }

  .pipeline-step-card {
    padding: 1.15rem 1rem;
    border-radius: 14px;
  }

  .step-card-header {
    gap: 0.75rem;
    margin-bottom: 0.6rem;
  }

  .step-icon-box {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }

  .step-title {
    font-size: 1.05rem;
  }

  .step-desc {
    font-size: 0.86rem;
    margin-bottom: 0.75rem;
  }

  .step-subpoints {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }

  .step-subpoint-item {
    font-size: 0.78rem;
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

  /* Section 7: Tech Models */
  .tech-models-grid {
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }

  .tech-model-card {
    padding: 1.35rem 1.15rem;
    border-radius: 16px;
  }

  .model-name {
    font-size: 1.2rem;
  }

  .model-desc {
    font-size: 0.86rem;
    margin-bottom: 1.1rem;
  }

  .model-feature-list li {
    font-size: 0.84rem;
    margin-bottom: 0.5rem;
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
  .aipost-cta-section {
    padding: 2.5rem 0.85rem;
  }

  .aipost-cta-banner {
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

  /* Section 11: CodeMaya */
  .aipost-codemaya-section {
    padding: 2rem 0.85rem 3rem;
  }

  .codemaya-tagline {
    font-size: 0.82rem;
  }

  .codemaya-brand-text {
    font-size: 1.45rem;
  }

  .codemaya-subtext {
    font-size: 0.78rem;
  }
}

/* Ultra-Compact Mobile (< 400px, e.g. iPhone SE, Fold) */
@media (max-width: 400px) {
  .aipost-hero-headline {
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

  .aipost-guarantee-row {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
  }
}
</style>
