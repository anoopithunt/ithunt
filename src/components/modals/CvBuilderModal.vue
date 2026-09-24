<template>
  <div class="modal-overlay cv-modal-overlay" v-if="isOpen" @click.self="$emit('close')">
    <div class="modal-card cv-modal-card">
      <!-- Modal Header -->
      <div class="cv-modal-header">
        <div class="cv-header-title-box">
          <div class="cv-header-badge">
            <span class="pulse-dot"></span>
            <span>OFFICIAL IT HUNT RESUME ENGINE</span>
          </div>
          <h2 class="cv-header-title">Generate Professional Student CV</h2>
          <p class="cv-header-subtitle">
            Fill your academic & internship particulars to generate an executive, ATS-optimized PDF resume ready for tech recruiters.
          </p>
        </div>

        <div class="cv-header-actions">
          <button type="button" class="cv-preset-btn" @click="loadSampleData" title="Load sample production-ready profile">
            <span>✨ Load Sample Data</span>
          </button>
          <button type="button" class="modal-close-icon cv-close-btn" @click="$emit('close')" title="Close Modal">✕</button>
        </div>
      </div>

      <!-- Navigation Steps / Tabs -->
      <div class="cv-tabs-bar">
        <button 
          v-for="(t, idx) in tabs" 
          :key="t.id"
          class="cv-tab-item"
          :class="{ active: currentTab === t.id }"
          @click="currentTab = t.id"
        >
          <span class="tab-num">{{ idx + 1 }}</span>
          <span class="tab-label">{{ t.label }}</span>
        </button>
      </div>

      <!-- Modal Body (Tabbed Content) -->
      <div class="cv-modal-body">
        <!-- TAB 1: Personal & Contact Particulars -->
        <div v-show="currentTab === 'personal'" class="cv-form-section">
          <h3 class="section-title">1. Candidate Identity & Contact Particulars</h3>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Full Legal Name <span class="req">*</span></label>
              <input type="text" v-model="cvForm.fullName" class="form-control" placeholder="e.g. Rahul Sharma" required />
            </div>
            <div class="form-group">
              <label class="form-label">Professional Title / Headline <span class="req">*</span></label>
              <input type="text" v-model="cvForm.title" class="form-control" placeholder="e.g. Full-Stack MERN Developer | Cloud Architect" required />
            </div>
            <div class="form-group">
              <label class="form-label">Email Address <span class="req">*</span></label>
              <input type="email" v-model="cvForm.email" class="form-control" placeholder="e.g. rahul.sharma@example.com" required />
            </div>
            <div class="form-group">
              <label class="form-label">Mobile Number <span class="req">*</span></label>
              <input type="tel" v-model="cvForm.phone" class="form-control" placeholder="e.g. +91 98765 43210" required />
            </div>
            <div class="form-group">
              <label class="form-label">Location (City, State)</label>
              <input type="text" v-model="cvForm.location" class="form-control" placeholder="e.g. Noida, Uttar Pradesh, India" />
            </div>
            <div class="form-group">
              <label class="form-label">LinkedIn Profile URL</label>
              <input type="url" v-model="cvForm.linkedin" class="form-control" placeholder="e.g. https://linkedin.com/in/rahulsharma" />
            </div>
            <div class="form-group">
              <label class="form-label">GitHub Profile URL</label>
              <input type="url" v-model="cvForm.github" class="form-control" placeholder="e.g. https://github.com/rahulsharma" />
            </div>
            <div class="form-group">
              <label class="form-label">Portfolio / Live URL</label>
              <input type="url" v-model="cvForm.portfolio" class="form-control" placeholder="e.g. https://rahulsharma.dev" />
            </div>
          </div>
        </div>

        <!-- TAB 2: Professional Summary -->
        <div v-show="currentTab === 'summary'" class="cv-form-section">
          <div class="flex-between">
            <h3 class="section-title">2. Executive Career Summary</h3>
            <div class="preset-chips">
              <span class="chip-label">Quick Presets:</span>
              <button type="button" class="mini-chip-btn" @click="applySummaryPreset('mern')">⚡ MERN Stack</button>
              <button type="button" class="mini-chip-btn" @click="applySummaryPreset('ai')">🤖 Python & AI</button>
              <button type="button" class="mini-chip-btn" @click="applySummaryPreset('mobile')">📱 Flutter Mobile</button>
            </div>
          </div>
          <div class="form-group">
            <textarea 
              v-model="cvForm.summary" 
              rows="6" 
              class="form-control code-font" 
              placeholder="Highlight your engineering foundation, client projects delivered, core strengths, and career aspirations..."
            ></textarea>
            <span class="field-hint">A concise 3-4 sentence professional summary that captures recruiter attention immediately.</span>
          </div>
        </div>

        <!-- TAB 3: Technical Skills -->
        <div v-show="currentTab === 'skills'" class="cv-form-section">
          <h3 class="section-title">3. Core Technical Skills & Categorization</h3>
          <p class="section-sub">Categorized competencies formatted for automated ATS parsing and engineering leads.</p>
          
          <div class="form-grid-1">
            <div class="form-group" v-for="(sk, idx) in cvForm.skills" :key="idx">
              <label class="form-label font-bold text-brand">{{ sk.category }}</label>
              <input type="text" v-model="sk.items" class="form-control" placeholder="Comma separated, e.g. React 19, Vue 3, Node.js..." />
            </div>
          </div>
        </div>

        <!-- TAB 4: Experience & Internships -->
        <div v-show="currentTab === 'experience'" class="cv-form-section">
          <div class="flex-between">
            <h3 class="section-title">4. Software Engineering Experience & Internships</h3>
            <button type="button" class="btn-add-mini" @click="addExperience">+ Add Experience</button>
          </div>

          <div v-for="(exp, expIdx) in cvForm.experience" :key="expIdx" class="dynamic-item-card">
            <div class="item-card-header">
              <span class="item-card-badge">Position #{{ expIdx + 1 }}</span>
              <button v-if="cvForm.experience.length > 1" type="button" class="btn-remove-mini" @click="removeExperience(expIdx)">✕ Remove</button>
            </div>
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Role / Designation <span class="req">*</span></label>
                <input type="text" v-model="exp.role" class="form-control" placeholder="e.g. Full-Stack Software Engineering Intern" />
              </div>
              <div class="form-group">
                <label class="form-label">Duration / Period <span class="req">*</span></label>
                <input type="text" v-model="exp.duration" class="form-control" placeholder="e.g. Jan 2026 – Present (6 Months)" />
              </div>
              <div class="form-group">
                <label class="form-label">Organization / Studio <span class="req">*</span></label>
                <input type="text" v-model="exp.company" class="form-control" placeholder="e.g. IT HUNT Software Studio & Tech Academy" />
              </div>
              <div class="form-group">
                <label class="form-label">Location</label>
                <input type="text" v-model="exp.location" class="form-control" placeholder="e.g. Noida, UP, India" />
              </div>
            </div>

            <div class="form-group mt-2">
              <label class="form-label">Key Deliverables & Responsibilities (One bullet per line)</label>
              <textarea 
                :value="exp.points.join('\n')" 
                @input="updateExpPoints(expIdx, $event.target.value)"
                rows="4" 
                class="form-control" 
                placeholder="• Engineered scalable REST microservices using Node.js and Express&#10;• Designed high-performance responsive UI using React 19 and Tailwind CSS&#10;• Participated in daily Agile client sprints and Git pull-request code reviews"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- TAB 5: Projects, Education & Certifications -->
        <div v-show="currentTab === 'projects'" class="cv-form-section">
          <div class="flex-between">
            <h3 class="section-title">5. Featured Software Projects</h3>
            <button type="button" class="btn-add-mini" @click="addProject">+ Add Project</button>
          </div>

          <div v-for="(proj, pIdx) in cvForm.projects" :key="pIdx" class="dynamic-item-card">
            <div class="item-card-header">
              <span class="item-card-badge">Project #{{ pIdx + 1 }}</span>
              <button v-if="cvForm.projects.length > 1" type="button" class="btn-remove-mini" @click="removeProject(pIdx)">✕ Remove</button>
            </div>
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Project Name <span class="req">*</span></label>
                <input type="text" v-model="proj.name" class="form-control" placeholder="e.g. CloudPay — Billing & Invoicing Engine" />
              </div>
              <div class="form-group">
                <label class="form-label">Technologies Used <span class="req">*</span></label>
                <input type="text" v-model="proj.stack" class="form-control" placeholder="e.g. React 19, Node.js, Redis, PostgreSQL, Docker" />
              </div>
            </div>
            <div class="form-group mt-2">
              <label class="form-label">Live App or Repository Link</label>
              <input type="text" v-model="proj.link" class="form-control" placeholder="e.g. github.com/username/project-repo" />
            </div>
            <div class="form-group mt-2">
              <label class="form-label">Project Impact & Architecture Description</label>
              <textarea v-model="proj.description" rows="2" class="form-control" placeholder="Engineered a multi-tenant payment gateway processing recurring client subscriptions with idempotency keys..."></textarea>
            </div>
          </div>

          <!-- Education Section -->
          <div class="mt-4">
            <div class="flex-between">
              <h3 class="section-title">6. Education & Academic Qualifications</h3>
              <button type="button" class="btn-add-mini" @click="addEducation">+ Add Education</button>
            </div>

            <div v-for="(edu, eduIdx) in cvForm.education" :key="eduIdx" class="dynamic-item-card">
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Degree / Diploma <span class="req">*</span></label>
                  <input type="text" v-model="edu.degree" class="form-control" placeholder="e.g. B.Tech in Computer Science & Engineering" />
                </div>
                <div class="form-group">
                  <label class="form-label">Year & Score</label>
                  <input type="text" v-model="edu.year" class="form-control" placeholder="e.g. 2022 – 2026 | CGPA: 8.5 / 10" />
                </div>
              </div>
              <div class="form-group mt-2">
                <label class="form-label">Institute / University Name <span class="req">*</span></label>
                <input type="text" v-model="edu.institution" class="form-control" placeholder="e.g. Dr. A.P.J. Abdul Kalam Technical University (AKTU)" />
              </div>
            </div>
          </div>

          <!-- Certifications -->
          <div class="mt-4">
            <h3 class="section-title">7. Verified Certifications & Credentials</h3>
            <div class="form-group">
              <textarea 
                :value="cvForm.certifications.join('\n')" 
                @input="updateCertifications($event.target.value)"
                rows="3" 
                class="form-control" 
                placeholder="ISO 9001:2015 Verified Full-Stack Software Engineering Masterclass — IT HUNT&#10;NIELIT Accredited O-Level & A-Level Information Technology Diploma&#10;AWS Certified Cloud Practitioner (Optional)"
              ></textarea>
              <span class="field-hint">One certification per line with verified credentials.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer (Palette Selector & Direct Download) -->
      <div class="cv-modal-footer">
        <div class="cv-palette-picker">
          <span class="palette-label">PDF Style Theme:</span>
          <div class="palette-options">
            <button 
              type="button" 
              class="palette-btn orange" 
              :class="{ active: selectedTheme === 'orange' }" 
              @click="selectedTheme = 'orange'"
              title="IT HUNT Executive Warm Orange & Slate"
            >
              <span class="color-dot orange"></span>
              <span>IT HUNT Brand</span>
            </button>
            <button 
              type="button" 
              class="palette-btn blue" 
              :class="{ active: selectedTheme === 'blue' }" 
              @click="selectedTheme = 'blue'"
              title="Modern Tech Royal Blue & Navy"
            >
              <span class="color-dot blue"></span>
              <span>Tech Blue</span>
            </button>
            <button 
              type="button" 
              class="palette-btn green" 
              :class="{ active: selectedTheme === 'green' }" 
              @click="selectedTheme = 'green'"
              title="Emerald Elite"
            >
              <span class="color-dot green"></span>
              <span>Emerald</span>
            </button>
            <button 
              type="button" 
              class="palette-btn classic" 
              :class="{ active: selectedTheme === 'classic' }" 
              @click="selectedTheme = 'classic'"
              title="Monochrome Executive Slate"
            >
              <span class="color-dot classic"></span>
              <span>Classic</span>
            </button>
          </div>
        </div>

        <div class="cv-footer-buttons">
          <button type="button" class="btn-cancel" @click="$emit('close')">Cancel</button>
          <button type="button" class="btn-download-cv" :disabled="isGenerating" @click="handleDownloadCv">
            <span v-if="!isGenerating">📄 Download Professional CV (PDF) ➜</span>
            <span v-else>⚙️ Compiling PDF...</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { downloadProfessionalCvPdf } from '../../utils/cvPdfGenerator.js';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  studentUser: {
    type: Object,
    default: null
  },
  content: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close', 'cv-generated']);

const currentTab = ref('personal');
const selectedTheme = ref('orange');
const isGenerating = ref(false);

const tabs = [
  { id: 'personal', label: 'Identity' },
  { id: 'summary', label: 'Summary' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects & Edu' }
];

// CV Form Data
const cvForm = ref({
  fullName: '',
  title: 'Full-Stack Software Engineer | MERN & Cloud Architecture',
  email: '',
  phone: '',
  location: 'Noida, Uttar Pradesh, India',
  linkedin: 'https://linkedin.com/in/student-ithunt',
  github: 'https://github.com/student-ithunt',
  portfolio: 'https://ithunt.in',
  summary: 'Dedicated Software Engineering graduate and IT HUNT Intern with practical experience designing, architecting, and deploying multi-tenant web applications and REST APIs. Proficient in modern JavaScript, React 19, Node.js, and containerized Docker deployments. Proven ability to thrive in Agile sprints, write maintainable clean code with high test coverage, and deliver production-grade client solutions.',
  skills: [
    { category: 'Languages & Core', items: 'JavaScript (ES6+), TypeScript, Python 3, SQL, HTML5, CSS3' },
    { category: 'Frontend Ecosystem', items: 'React 19, Next.js 15, Vue 3, Tailwind CSS, Responsive UX/UI' },
    { category: 'Backend & APIs', items: 'Node.js, Express, FastAPI, REST APIs, Microservices, JWT Auth' },
    { category: 'Databases & Cache', items: 'MongoDB, PostgreSQL, Redis In-Memory Cache, Mongoose' },
    { category: 'DevOps, Cloud & Tools', items: 'Docker, AWS S3/EC2, Git, GitHub Actions CI/CD, Postman, Linux' }
  ],
  experience: [
    {
      role: 'Full-Stack Software Engineering Intern',
      company: 'IT HUNT Software Studio & Tech Academy',
      duration: 'Jan 2026 – Present (6-Month Masterclass)',
      location: 'Noida, UP, India',
      points: [
        'Engineered responsive client-facing modules and REST microservices in Agile sprints, delivering sub-50ms API responses.',
        'Architected secure JWT authentication and Redis caching layer, reducing database query overhead by 42%.',
        'Participated in weekly architect code reviews, Git pull-request merges, and automated unit testing with 98%+ coverage.',
        'Collaborated on live client software deployments using Docker containerization and GitHub Actions CI/CD.'
      ]
    }
  ],
  projects: [
    {
      name: 'CloudPay — Multi-Tenant Billing Gateway',
      stack: 'React 19, Node.js, Redis, PostgreSQL, Docker',
      link: 'github.com/ithunt/cloudpay-engine',
      description: 'Engineered an enterprise SaaS billing engine processing recurring client subscriptions, automated invoicing, idempotency keys, and sub-50ms latency.'
    },
    {
      name: 'AI PostCraft — Autonomous Social Content Engine',
      stack: 'Python 3.12, FastAPI, Gemini 2.0 API, Vue 3',
      link: 'github.com/ithunt/aipost-engine',
      description: 'Autonomous marketing software that analyzes brand websites, synthesizes viral multi-slide carousels, and publishes directly via REST webhooks.'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
      institution: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
      year: '2022 – 2026',
      score: 'CGPA: 8.6 / 10.0'
    }
  ],
  certifications: [
    'ISO 9001:2015 Verified Full-Stack Software Engineering Masterclass — IT HUNT (2026)',
    'NIELIT Accredited O-Level & A-Level Information Technology Diploma',
    'Verified Production Client Sprint Internship Credential — IT HUNT Live Cloud Registry'
  ]
});

// Pre-fill from studentUser if provided
const initFromStudentUser = () => {
  if (!props.studentUser) return;
  const su = props.studentUser;
  if (su.candidateName || su.name) cvForm.value.fullName = su.candidateName || su.name;
  if (su.email) cvForm.value.email = su.email;
  if (su.phone || su.mobile) cvForm.value.phone = su.phone || su.mobile;
  if (su.course) {
    cvForm.value.title = `${su.course} Engineer | IT HUNT Certified`;
  }
};

watch(() => props.studentUser, () => {
  initFromStudentUser();
}, { immediate: true });

onMounted(() => {
  if (props.studentUser) {
    initFromStudentUser();
  } else {
    loadSampleData();
  }
});

// Load High-Grade Sample Data for 1-Click Testing
function loadSampleData() {
  cvForm.value.fullName = 'Rahul Sharma';
  cvForm.value.title = 'Full-Stack MERN Developer | Cloud & System Architecture';
  cvForm.value.email = 'rahul.sharma@example.com';
  cvForm.value.phone = '+91 98765 43210';
  cvForm.value.location = 'Noida, Uttar Pradesh, India';
  cvForm.value.linkedin = 'https://linkedin.com/in/rahulsharma-dev';
  cvForm.value.github = 'https://github.com/rahulsharma-code';
  cvForm.value.portfolio = 'https://rahulsharma.dev';
  cvForm.value.summary = 'Passionate Full-Stack Developer with hands-on client sprint training at IT HUNT Software Studio. Specialized in architecting scalable MERN applications, high-throughput REST APIs, and responsive React 19 interfaces. Experienced with Redis caching, Docker containerization, and Git collaboration workflows with a strong focus on clean code and reliable system design.';
}

// Preset Summaries
function applySummaryPreset(type) {
  if (type === 'mern') {
    cvForm.value.title = 'Full-Stack MERN Developer | React 19 & Node.js';
    cvForm.value.summary = 'Proactive Full-Stack Engineer with comprehensive hands-on internship experience in MERN stack development at IT HUNT. Proficient in crafting component-driven UIs with React 19, building scalable Node/Express microservices, and modeling optimized MongoDB databases. Adept in Agile methodologies, Git PR workflows, and automated CI/CD deployments.';
  } else if (type === 'ai') {
    cvForm.value.title = 'Python & AI Engineer | LLM Agents & FastAPI';
    cvForm.value.summary = 'AI & Backend Developer skilled in building intelligent software applications utilizing Python 3.12, FastAPI, and modern LLM APIs (Gemini 2.0 / OpenAI). Experienced in designing vector embeddings search, automating business workflows, and deploying containerized cloud services with rigorous automated tests.';
  } else if (type === 'mobile') {
    cvForm.value.title = 'Cross-Platform Mobile Developer | Flutter & Dart';
    cvForm.value.summary = 'Mobile Application Developer trained on live production client applications using Flutter, Dart, and Firebase. Proven experience building fluid 60fps user experiences, implementing WebRTC audio/video calling, and managing secure local storage with Room / SQLite.';
  }
}

// Dynamic Helpers
function addExperience() {
  cvForm.value.experience.push({
    role: 'Software Developer Intern',
    company: 'Tech Studio',
    duration: '2026',
    location: 'Noida, India',
    points: ['Collaborated on feature enhancements and bug fixes in client repositories.']
  });
}

function removeExperience(idx) {
  if (cvForm.value.experience.length > 1) {
    cvForm.value.experience.splice(idx, 1);
  }
}

function updateExpPoints(idx, text) {
  cvForm.value.experience[idx].points = text.split('\n').filter(p => p.trim());
}

function addProject() {
  cvForm.value.projects.push({
    name: 'New Production Project',
    stack: 'Vue 3, Node.js, PostgreSQL',
    link: 'github.com/username/project',
    description: 'Designed and deployed scalable full-stack web application with responsive UI and secure authentication.'
  });
}

function removeProject(idx) {
  if (cvForm.value.projects.length > 1) {
    cvForm.value.projects.splice(idx, 1);
  }
}

function addEducation() {
  cvForm.value.education.push({
    degree: 'Higher Secondary / Diploma',
    institution: 'Institution Name',
    year: '2024',
    score: 'First Division'
  });
}

function updateCertifications(text) {
  cvForm.value.certifications = text.split('\n').filter(c => c.trim());
}

// Download PDF
function handleDownloadCv() {
  try {
    isGenerating.value = true;
    const filename = downloadProfessionalCvPdf(cvForm.value, selectedTheme.value);
    emit('cv-generated', { filename, candidateName: cvForm.value.fullName });
  } catch (err) {
    console.error('Failed to generate CV PDF:', err);
    alert('An error occurred while compiling your PDF. Please ensure all required fields are filled.');
  } finally {
    setTimeout(() => {
      isGenerating.value = false;
    }, 700);
  }
}
</script>

<style scoped>
.cv-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(2, 6, 23, 0.85);
  backdrop-filter: blur(12px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
}

.cv-modal-card {
  background: var(--bg-card-glass, #0f172a);
  border: 1.5px solid var(--border-cyber-glow, rgba(249, 115, 22, 0.45));
  border-radius: 20px;
  width: 100%;
  max-width: 900px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 65px rgba(0, 0, 0, 0.6), 0 0 35px var(--glow-orange, rgba(249, 115, 22, 0.2));
  overflow: hidden;
  animation: modalEnter 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modalEnter {
  from { opacity: 0; transform: scale(0.96) translateY(12px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Header */
.cv-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.5rem 1.75rem 1.15rem;
  border-bottom: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  gap: 1rem;
}

.cv-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--color-ai-orange, #f97316);
  margin-bottom: 0.35rem;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-ai-orange, #f97316);
  box-shadow: 0 0 8px var(--color-ai-orange, #f97316);
}

.cv-header-title {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--text-main, #ffffff);
  margin: 0 0 0.3rem;
  line-height: 1.2;
}

.cv-header-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted, #94a3b8);
  margin: 0;
  line-height: 1.45;
}

.cv-header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.cv-preset-btn {
  background: rgba(249, 115, 22, 0.12);
  border: 1px solid rgba(249, 115, 22, 0.35);
  color: var(--color-ai-orange, #f97316);
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.cv-preset-btn:hover {
  background: rgba(249, 115, 22, 0.22);
  border-color: var(--color-ai-orange, #f97316);
}

.cv-close-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #94a3b8;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.cv-close-btn:hover {
  color: #ffffff;
  background: rgba(239, 68, 68, 0.25);
  border-color: #ef4444;
}

/* Tabs Bar */
.cv-tabs-bar {
  display: flex;
  align-items: center;
  padding: 0.5rem 1.75rem;
  background: rgba(2, 6, 23, 0.5);
  border-bottom: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.06));
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.cv-tabs-bar::-webkit-scrollbar {
  display: none;
}

.cv-tab-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: none;
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted, #94a3b8);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.cv-tab-item:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

.cv-tab-item.active {
  background: rgba(249, 115, 22, 0.15);
  color: var(--color-ai-orange, #f97316);
  font-weight: 700;
}

.tab-num {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.68rem;
  font-weight: 800;
}

.cv-tab-item.active .tab-num {
  background: var(--color-ai-orange, #f97316);
  color: #ffffff;
}

/* Modal Body */
.cv-modal-body {
  padding: 1.5rem 1.75rem;
  overflow-y: auto;
  flex: 1;
}

.section-title {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-main, #ffffff);
  margin: 0 0 1rem;
}

.section-sub {
  font-size: 0.82rem;
  color: var(--text-muted, #94a3b8);
  margin: -0.6rem 0 1rem;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.preset-chips {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.chip-label {
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 600;
}

.mini-chip-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #cbd5e1;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mini-chip-btn:hover {
  background: rgba(249, 115, 22, 0.15);
  border-color: rgba(249, 115, 22, 0.4);
  color: var(--color-ai-orange, #f97316);
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-grid-1 {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #cbd5e1;
}

.req {
  color: #f43f5e;
}

.form-control {
  background: rgba(2, 6, 23, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 0.65rem 0.85rem;
  color: #ffffff;
  font-size: 0.88rem;
  outline: none;
  transition: all 0.2s ease;
  width: 100%;
}

.form-control:focus {
  border-color: var(--color-ai-orange, #f97316);
  box-shadow: 0 0 10px rgba(249, 115, 22, 0.25);
  background: rgba(2, 6, 23, 0.9);
}

.code-font {
  font-family: var(--font-mono, 'Fira Code', monospace);
  font-size: 0.82rem;
  line-height: 1.5;
}

.field-hint {
  font-size: 0.72rem;
  color: #64748b;
  margin-top: 0.2rem;
}

/* Dynamic Cards */
.dynamic-item-card {
  background: rgba(2, 6, 23, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.15rem;
  margin-bottom: 1rem;
}

.item-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.item-card-badge {
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--color-ai-orange, #f97316);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-add-mini {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #10b981;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-add-mini:hover {
  background: rgba(16, 185, 129, 0.22);
}

.btn-remove-mini {
  background: transparent;
  border: none;
  color: #f43f5e;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
}

.btn-remove-mini:hover {
  text-decoration: underline;
}

.mt-2 { margin-top: 0.65rem; }
.mt-4 { margin-top: 1.5rem; }

/* Modal Footer */
.cv-modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.15rem 1.75rem;
  background: rgba(2, 6, 23, 0.75);
  border-top: 1px solid var(--border-cyber, rgba(255, 255, 255, 0.08));
  gap: 1rem;
  flex-wrap: wrap;
}

.cv-palette-picker {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.palette-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #94a3b8;
}

.palette-options {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.palette-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  font-size: 0.74rem;
  font-weight: 600;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.palette-btn.active {
  border-color: var(--color-ai-orange, #f97316);
  background: rgba(249, 115, 22, 0.15);
  color: #ffffff;
}

.color-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.color-dot.orange { background: #ea580c; }
.color-dot.blue { background: #1d4ed8; }
.color-dot.green { background: #059669; }
.color-dot.classic { background: #475569; }

.cv-footer-buttons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-cancel {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #94a3b8;
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 0.88rem;
  font-weight: 600;
  padding: 0.65rem 1.25rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  color: #ffffff;
  border-color: #cbd5e1;
}

.btn-download-cv {
  background: var(--gradient-ai-btn, linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fbbf24 100%));
  color: #ffffff;
  border: none;
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 0.92rem;
  font-weight: 700;
  padding: 0.7rem 1.6rem;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 4px 18px var(--glow-orange, rgba(249, 115, 22, 0.4));
  transition: all 0.25s ease;
  white-space: nowrap;
}

.btn-download-cv:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--glow-orange, rgba(249, 115, 22, 0.6));
}

.btn-download-cv:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Light Theme Support */
:global(body.light-theme) .cv-modal-card {
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 25px 65px rgba(0, 0, 0, 0.15) !important;
}

:global(body.light-theme) .cv-modal-header {
  border-bottom-color: #e2e8f0 !important;
}

:global(body.light-theme) .cv-header-title {
  color: #0f172a !important;
}

:global(body.light-theme) .cv-header-subtitle {
  color: #475569 !important;
}

:global(body.light-theme) .cv-tabs-bar {
  background: #f8fafc !important;
  border-bottom-color: #e2e8f0 !important;
}

:global(body.light-theme) .cv-tab-item {
  color: #64748b !important;
}

:global(body.light-theme) .cv-tab-item.active {
  background: rgba(249, 115, 22, 0.12) !important;
  color: #ea580c !important;
}

:global(body.light-theme) .section-title {
  color: #0f172a !important;
}

:global(body.light-theme) .form-label {
  color: #334155 !important;
}

:global(body.light-theme) .form-control {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
  color: #0f172a !important;
}

:global(body.light-theme) .form-control:focus {
  background: #ffffff !important;
  border-color: #ea580c !important;
}

:global(body.light-theme) .dynamic-item-card {
  background: #f8fafc !important;
  border-color: #e2e8f0 !important;
}

:global(body.light-theme) .cv-modal-footer {
  background: #f8fafc !important;
  border-top-color: #e2e8f0 !important;
}

:global(body.light-theme) .btn-cancel {
  border-color: #cbd5e1 !important;
  color: #475569 !important;
}

:global(body.light-theme) .btn-cancel:hover {
  background: #f1f5f9 !important;
  color: #0f172a !important;
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .cv-modal-overlay {
    padding: 0.5rem;
  }

  .cv-modal-card {
    border-radius: 14px;
    max-height: 96vh;
  }

  .cv-modal-header {
    padding: 1.15rem 1rem 0.85rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.65rem;
  }

  .cv-header-actions {
    justify-content: space-between;
    width: 100%;
  }

  .cv-header-title {
    font-size: 1.25rem;
  }

  .cv-tabs-bar {
    padding: 0.4rem 0.75rem;
  }

  .cv-tab-item {
    font-size: 0.76rem;
    padding: 0.35rem 0.65rem;
  }

  .cv-modal-body {
    padding: 1.15rem 1rem;
  }

  .form-grid-2 {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .cv-modal-footer {
    padding: 0.85rem 1rem;
    flex-direction: column;
    align-items: stretch;
  }

  .cv-palette-picker {
    justify-content: space-between;
    width: 100%;
  }

  .cv-footer-buttons {
    width: 100%;
    flex-direction: column-reverse;
  }

  .btn-download-cv, .btn-cancel {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}
</style>
