<template>
  <div class="modal-overlay cv-modal-overlay" v-if="isOpen" @click.self="$emit('close')">
    <div class="modal-card cv-modal-card">
      <!-- Modal Header -->
      <div class="cv-modal-header">
        <div class="cv-header-title-box">
          <div class="cv-header-badge">
            <span class="pulse-dot"></span>
            <span>CLASSIC 1-PAGE ATS RESUME ENGINE</span>
          </div>
          <h2 class="cv-header-title">Generate 1-Page Professional CV</h2>
          <p class="cv-header-subtitle">
            Minimalist, high-impact single-page format formatted for ATS systems and top recruiters. Fits exactly 1 full page.
          </p>
        </div>

        <div class="cv-header-actions">
          <button type="button" class="cv-preset-btn specimen-btn" @click="loadSpecimenData" title="Load sample from specimen photo">
            <span>📋 Load Specimen (Diya Agarwal)</span>
          </button>
          <button type="button" class="cv-preset-btn" @click="loadTechSampleData" title="Load IT HUNT Tech Graduate Profile">
            <span>💻 Tech Profile</span>
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
          <h3 class="section-title">1. Candidate Identity & Contact Info</h3>
          <p class="section-sub">Standard single-line contact header with full name and clean pipe separators.</p>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Full Name <span class="req">*</span></label>
              <input type="text" v-model="cvForm.fullName" class="form-control" placeholder="e.g. Diya Agarwal" required />
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number <span class="req">*</span></label>
              <input type="tel" v-model="cvForm.phone" class="form-control" placeholder="e.g. +91 11 5555 3345" required />
            </div>
            <div class="form-group">
              <label class="form-label">Email Address <span class="req">*</span></label>
              <input type="email" v-model="cvForm.email" class="form-control" placeholder="e.g. d.agarwal@sample.in" required />
            </div>
            <div class="form-group">
              <label class="form-label">Location (City, Country & PIN) <span class="req">*</span></label>
              <input type="text" v-model="cvForm.location" class="form-control" placeholder="e.g. New Delhi, India 110034" />
            </div>
            <div class="form-group">
              <label class="form-label">LinkedIn (Optional)</label>
              <input type="text" v-model="cvForm.linkedin" class="form-control" placeholder="e.g. linkedin.com/in/diya-agarwal" />
            </div>
            <div class="form-group">
              <label class="form-label">Portfolio / GitHub (Optional)</label>
              <input type="text" v-model="cvForm.portfolio" class="form-control" placeholder="e.g. diyaagarwal.me" />
            </div>
          </div>
        </div>

        <!-- TAB 2: Professional Summary -->
        <div v-show="currentTab === 'summary'" class="cv-form-section">
          <div class="flex-between">
            <h3 class="section-title">2. Professional Summary</h3>
            <div class="preset-chips">
              <span class="chip-label">Fill Sample:</span>
              <button type="button" class="mini-chip-btn" @click="applySummaryPreset('specimen')">📋 Retail & Sales</button>
              <button type="button" class="mini-chip-btn" @click="applySummaryPreset('mern')">⚡ Full-Stack Web</button>
              <button type="button" class="mini-chip-btn" @click="applySummaryPreset('ai')">🤖 Python & AI</button>
            </div>
          </div>
          <p class="section-sub">A punchy 3-4 sentence summary highlighting dynamics, background, and proven records.</p>
          <div class="form-group">
            <textarea 
              v-model="cvForm.summary" 
              rows="6" 
              class="form-control" 
              placeholder="Customer-focused Retail Sales professional with solid understanding of retail dynamics, marketing and customer service. Offering 5 years of experience providing quality product recommendations..."
            ></textarea>
          </div>
        </div>

        <!-- TAB 3: Skills (2-Column Bulleted Layout) -->
        <div v-show="currentTab === 'skills'" class="cv-form-section">
          <h3 class="section-title">3. Skills (2-Column Bulleted Format)</h3>
          <p class="section-sub">List your key skills (separated by commas or new lines). They will automatically align into 2 balanced columns with bullets.</p>
          
          <div class="form-group">
            <label class="form-label">Skills List (Comma or newline separated)</label>
            <textarea 
              v-model="skillsInputText" 
              rows="4" 
              class="form-control" 
              placeholder="Cash register operation, POS system operation, Sales expertise, Teamwork, Inventory management, Accurate money handling, Documentation and recordkeeping, Retail merchandising expertise"
              @input="syncSkillsFromText"
            ></textarea>
          </div>

          <!-- Live 2-Column Preview -->
          <div class="skills-2col-preview">
            <div class="preview-col-title">2-Column Layout Preview in Document:</div>
            <div class="skills-2col-grid">
              <div class="skills-subcol">
                <div v-for="(sk, sIdx) in parsedSkillsCol1" :key="'col1-' + sIdx" class="skill-bullet-item">
                  <span class="bullet-dot">•</span>
                  <span>{{ sk }}</span>
                </div>
              </div>
              <div class="skills-subcol">
                <div v-for="(sk, sIdx) in parsedSkillsCol2" :key="'col2-' + sIdx" class="skill-bullet-item">
                  <span class="bullet-dot">•</span>
                  <span>{{ sk }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 4: Experience -->
        <div v-show="currentTab === 'experience'" class="cv-form-section">
          <div class="flex-between">
            <h3 class="section-title">4. Professional Experience & Internships</h3>
            <button type="button" class="btn-add-mini" @click="addExperience">+ Add Position</button>
          </div>
          <p class="section-sub">Role, Organization, Duration, Location, and concise bullet points.</p>

          <div v-for="(exp, expIdx) in cvForm.experience" :key="expIdx" class="dynamic-item-card">
            <div class="item-card-header">
              <span class="item-card-badge">Position #{{ expIdx + 1 }}</span>
              <button v-if="cvForm.experience.length > 1" type="button" class="btn-remove-mini" @click="removeExperience(expIdx)">✕ Remove</button>
            </div>
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Job Title / Role <span class="req">*</span></label>
                <input type="text" v-model="exp.role" class="form-control" placeholder="e.g. Retail Sales Associate" />
              </div>
              <div class="form-group">
                <label class="form-label">Company / Organization <span class="req">*</span></label>
                <input type="text" v-model="exp.company" class="form-control" placeholder="e.g. ZARA" />
              </div>
              <div class="form-group">
                <label class="form-label">Duration / Dates <span class="req">*</span></label>
                <input type="text" v-model="exp.duration" class="form-control" placeholder="e.g. February 2017-Current" />
              </div>
              <div class="form-group">
                <label class="form-label">Location (City, Country)</label>
                <input type="text" v-model="exp.location" class="form-control" placeholder="e.g. New Delhi, India" />
              </div>
            </div>

            <div class="form-group mt-2">
              <label class="form-label">Key Responsibilities / Impact (One bullet per line)</label>
              <textarea 
                :value="Array.isArray(exp.points) ? exp.points.join('\n') : exp.points" 
                @input="updateExpPoints(expIdx, $event.target.value)"
                rows="3" 
                class="form-control" 
                placeholder="Increased monthly sales 10% by effectively upselling and cross-selling products...&#10;Prevented store losses by leveraging awareness, attention to detail, and integrity...&#10;Processed payments and maintained accurate drawers to meet financial targets."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- TAB 5: Education & Languages -->
        <div v-show="currentTab === 'education'" class="cv-form-section">
          <!-- Education -->
          <div class="flex-between">
            <h3 class="section-title">5. Education and Training</h3>
            <button type="button" class="btn-add-mini" @click="addEducation">+ Add Degree / Training</button>
          </div>

          <div v-for="(edu, eduIdx) in cvForm.education" :key="'edu-' + eduIdx" class="dynamic-item-card">
            <div class="item-card-header">
              <span class="item-card-badge">Qualification #{{ eduIdx + 1 }}</span>
              <button v-if="cvForm.education.length > 1" type="button" class="btn-remove-mini" @click="removeEducation(eduIdx)">✕ Remove</button>
            </div>
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Degree / Diploma Title <span class="req">*</span></label>
                <input type="text" v-model="edu.degree" class="form-control" placeholder="e.g. Diploma in Financial Accounting" />
              </div>
              <div class="form-group">
                <label class="form-label">Year / Duration</label>
                <input type="text" v-model="edu.year" class="form-control" placeholder="e.g. 2016" />
              </div>
            </div>
            <div class="form-group mt-2">
              <label class="form-label">Institute / University & Location <span class="req">*</span></label>
              <input type="text" v-model="edu.institution" class="form-control" placeholder="e.g. Oxford Software Institute & Oxford School of English, New Delhi, India" />
            </div>
          </div>

          <!-- Languages with progress bars -->
          <div class="mt-4">
            <h3 class="section-title">6. Languages & Proficiency</h3>
            <p class="section-sub">Matches the specimen: Native speaker label + visual proficiency meter bars.</p>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Primary / Native Language</label>
                <input type="text" v-model="cvForm.languages[0].name" class="form-control" placeholder="Hindi" />
              </div>
              <div class="form-group">
                <label class="form-label">Level / Note</label>
                <input type="text" v-model="cvForm.languages[0].levelText" class="form-control" placeholder="Native speaker" />
              </div>
            </div>

            <div class="form-grid-2 mt-2">
              <!-- Language 2 -->
              <div class="lang-edit-card">
                <div class="form-group">
                  <label class="form-label">Language 2</label>
                  <input type="text" v-model="cvForm.languages[1].name" class="form-control" placeholder="English" />
                </div>
                <div class="form-group mt-1">
                  <label class="form-label">CEFR Code & Label</label>
                  <div class="flex-gap">
                    <input type="text" v-model="cvForm.languages[1].code" class="form-control flex-1" placeholder="C2" />
                    <input type="text" v-model="cvForm.languages[1].proficiency" class="form-control flex-2" placeholder="Proficient" />
                  </div>
                </div>
                <div class="form-group mt-1">
                  <label class="form-label">Proficiency Fill: {{ cvForm.languages[1].percent }}%</label>
                  <input type="range" min="30" max="100" v-model.number="cvForm.languages[1].percent" class="range-slider" />
                </div>
              </div>

              <!-- Language 3 -->
              <div class="lang-edit-card">
                <div class="form-group">
                  <label class="form-label">Language 3</label>
                  <input type="text" v-model="cvForm.languages[2].name" class="form-control" placeholder="Bengali" />
                </div>
                <div class="form-group mt-1">
                  <label class="form-label">CEFR Code & Label</label>
                  <div class="flex-gap">
                    <input type="text" v-model="cvForm.languages[2].code" class="form-control flex-1" placeholder="B2" />
                    <input type="text" v-model="cvForm.languages[2].proficiency" class="form-control flex-2" placeholder="Upper-intermediate" />
                  </div>
                </div>
                <div class="form-group mt-1">
                  <label class="form-label">Proficiency Fill: {{ cvForm.languages[2].percent }}%</label>
                  <input type="range" min="30" max="100" v-model.number="cvForm.languages[2].percent" class="range-slider" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 6: 1-Page Paper Live Preview -->
        <div v-show="currentTab === 'preview'" class="cv-form-section">
          <div class="flex-between">
            <h3 class="section-title">📄 1-Page Full View Specimen</h3>
            <span class="preview-badge">Guaranteed Single Page Layout</span>
          </div>

          <!-- Document Paper Replica -->
          <div class="paper-preview-container">
            <div class="paper-sheet" :class="'theme-' + selectedTheme">
              <!-- Name & Contact -->
              <div class="paper-name">{{ cvForm.fullName || 'Candidate Name' }}</div>
              <div class="paper-contact">
                <span>{{ cvForm.phone }}</span>
                <span v-if="cvForm.email"> | {{ cvForm.email }}</span>
                <span v-if="cvForm.location"> | {{ cvForm.location }}</span>
                <span v-if="cvForm.linkedin"> | {{ cvForm.linkedin }}</span>
              </div>

              <!-- Summary -->
              <div v-if="cvForm.summary" class="paper-section">
                <div class="paper-heading">SUMMARY</div>
                <div class="paper-body">{{ cvForm.summary }}</div>
              </div>

              <!-- Skills in 2 columns -->
              <div v-if="parsedSkillsList.length" class="paper-section">
                <div class="paper-heading">SKILLS</div>
                <div class="paper-skills-grid">
                  <div class="paper-skills-col">
                    <div v-for="(sk, idx) in parsedSkillsCol1" :key="'pcol1-' + idx" class="paper-bullet-line">
                      • {{ sk }}
                    </div>
                  </div>
                  <div class="paper-skills-col">
                    <div v-for="(sk, idx) in parsedSkillsCol2" :key="'pcol2-' + idx" class="paper-bullet-line">
                      • {{ sk }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Experience -->
              <div v-if="cvForm.experience.length" class="paper-section">
                <div class="paper-heading">EXPERIENCE</div>
                <div v-for="(exp, expIdx) in cvForm.experience" :key="'pexp-' + expIdx" class="paper-exp-entry">
                  <div class="paper-exp-header">
                    <strong>{{ exp.role }}</strong>, {{ exp.company }}, {{ exp.duration }}
                  </div>
                  <div v-if="exp.location" class="paper-exp-sub">{{ exp.location }}</div>
                  <ul class="paper-bullet-list">
                    <li v-for="(pt, pIdx) in exp.points" :key="'ppt-' + pIdx">{{ pt }}</li>
                  </ul>
                </div>
              </div>

              <!-- Education -->
              <div v-if="cvForm.education.length" class="paper-section">
                <div class="paper-heading">EDUCATION AND TRAINING</div>
                <div v-for="(edu, eduIdx) in cvForm.education" :key="'pedu-' + eduIdx" class="paper-edu-entry">
                  <div class="paper-edu-degree"><strong>{{ edu.degree }}</strong></div>
                  <div class="paper-edu-sub">{{ edu.institution }} {{ edu.year ? edu.year : '' }}</div>
                </div>
              </div>

              <!-- Languages with bars -->
              <div v-if="cvForm.languages && cvForm.languages.length" class="paper-section">
                <div class="paper-heading">LANGUAGES</div>
                <div v-if="cvForm.languages[0]?.name" class="paper-native-row">
                  <strong>{{ cvForm.languages[0].name }}:</strong> {{ cvForm.languages[0].levelText || 'Native speaker' }}
                </div>
                <div class="paper-lang-bars-grid">
                  <div v-if="cvForm.languages[1]?.name" class="paper-lang-meter">
                    <div class="paper-lang-top">
                      <span>{{ cvForm.languages[1].name }}:</span>
                      <span>{{ cvForm.languages[1].code }}</span>
                    </div>
                    <div class="paper-bar-track">
                      <div class="paper-bar-fill" :style="{ width: cvForm.languages[1].percent + '%' }"></div>
                    </div>
                    <div class="paper-lang-label">{{ cvForm.languages[1].proficiency }}</div>
                  </div>

                  <div v-if="cvForm.languages[2]?.name" class="paper-lang-meter">
                    <div class="paper-lang-top">
                      <span>{{ cvForm.languages[2].name }}:</span>
                      <span>{{ cvForm.languages[2].code }}</span>
                    </div>
                    <div class="paper-bar-track">
                      <div class="paper-bar-fill" :style="{ width: cvForm.languages[2].percent + '%' }"></div>
                    </div>
                    <div class="paper-lang-label">{{ cvForm.languages[2].proficiency }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer (Palette Selector & Direct Download) -->
      <div class="cv-modal-footer">
        <div class="cv-palette-picker">
          <span class="palette-label">Theme Palette:</span>
          <div class="palette-options">
            <button 
              type="button" 
              class="palette-btn classic" 
              :class="{ active: selectedTheme === 'classic' }" 
              @click="selectedTheme = 'classic'"
              title="Classic Minimalist (Specimen Style)"
            >
              <span class="color-dot classic"></span>
              <span>Classic Specimen</span>
            </button>
            <button 
              type="button" 
              class="palette-btn slate" 
              :class="{ active: selectedTheme === 'slate' }" 
              @click="selectedTheme = 'slate'"
              title="Executive Slate"
            >
              <span class="color-dot slate"></span>
              <span>Slate</span>
            </button>
            <button 
              type="button" 
              class="palette-btn orange" 
              :class="{ active: selectedTheme === 'orange' }" 
              @click="selectedTheme = 'orange'"
              title="IT HUNT Brand Subtle"
            >
              <span class="color-dot orange"></span>
              <span>IT HUNT Brand</span>
            </button>
          </div>
        </div>

        <div class="cv-footer-buttons">
          <button type="button" class="btn-cancel" @click="$emit('close')">Cancel</button>
          <button type="button" class="btn-download-cv" :disabled="isGenerating" @click="handleDownloadCv">
            <span v-if="!isGenerating">📄 Download 1-Page PDF CV ➜</span>
            <span v-else>⚙️ Compiling 1-Page PDF...</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
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
const selectedTheme = ref('classic'); // Default to classic monochrome matching specimen
const isGenerating = ref(false);

const tabs = [
  { id: 'personal', label: 'Identity' },
  { id: 'summary', label: 'Summary' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education & Lang' },
  { id: 'preview', label: '📄 1-Page Preview' }
];

// Skills input as raw text for easy editing
const skillsInputText = ref('');

// CV Form Data
const cvForm = ref({
  fullName: 'Diya Agarwal',
  phone: '+91 11 5555 3345',
  email: 'd.agarwal@sample.in',
  location: 'New Delhi, India 110034',
  linkedin: '',
  portfolio: '',
  summary: 'Customer-focused Retail Sales professional with solid understanding of retail dynamics, marketing and customer service. Offering 5 years of experience providing quality product recommendations and solutions to meet customer needs and exceed expectations. Demonstrated record of exceeding revenue targets by leveraging communication skills and sales expertise.',
  skills: [],
  experience: [
    {
      role: 'Retail Sales Associate',
      company: 'ZARA',
      duration: 'February 2017-Current',
      location: 'New Delhi, India',
      points: [
        'Increased monthly sales 10% by effectively upselling and cross-selling products to maximize profitability.',
        'Prevented store losses by leveraging awareness, attention to detail, and integrity to identify and investigate concerns.',
        'Processed payments and maintained accurate drawers to meet financial targets.'
      ]
    },
    {
      role: 'Barista',
      company: 'Dunkin\' Donuts',
      duration: 'March 2015-January 2017',
      location: 'New Delhi, India',
      points: [
        'Upsold seasonal drinks and pastries, boosting average store sales by ₹1500 weekly.',
        'Managed morning rush of over 300 customers daily with efficient, levelheaded customer service.',
        'Trained entire staff of 15 baristas in new smoothie program offerings and procedures.',
        'Developed creative and appealing latte art techniques and instructed coworkers in method.'
      ]
    }
  ],
  education: [
    {
      degree: 'Diploma in Financial Accounting',
      institution: 'Oxford Software Institute & Oxford School of English, New Delhi, India',
      year: '2016'
    }
  ],
  languages: [
    { name: 'Hindi', levelText: 'Native speaker', isNative: true },
    { name: 'English', code: 'C2', proficiency: 'Proficient', percent: 92 },
    { name: 'Bengali', code: 'B2', proficiency: 'Upper-intermediate', percent: 70 }
  ]
});

// Compute parsed skills
const parsedSkillsList = computed(() => {
  if (!skillsInputText.value) return [];
  return skillsInputText.value
    .split(/[,;\n]/)
    .map(s => s.trim())
    .filter(Boolean);
});

const parsedSkillsCol1 = computed(() => {
  const list = parsedSkillsList.value;
  const half = Math.ceil(list.length / 2);
  return list.slice(0, half);
});

const parsedSkillsCol2 = computed(() => {
  const list = parsedSkillsList.value;
  const half = Math.ceil(list.length / 2);
  return list.slice(half);
});

function syncSkillsFromText() {
  cvForm.value.skills = parsedSkillsList.value;
}

// Load Specimen (Diya Agarwal - exactly matching the attached image)
function loadSpecimenData() {
  cvForm.value.fullName = 'Diya Agarwal';
  cvForm.value.phone = '+91 11 5555 3345';
  cvForm.value.email = 'd.agarwal@sample.in';
  cvForm.value.location = 'New Delhi, India 110034';
  cvForm.value.linkedin = '';
  cvForm.value.portfolio = '';
  cvForm.value.summary = 'Customer-focused Retail Sales professional with solid understanding of retail dynamics, marketing and customer service. Offering 5 years of experience providing quality product recommendations and solutions to meet customer needs and exceed expectations. Demonstrated record of exceeding revenue targets by leveraging communication skills and sales expertise.';
  
  skillsInputText.value = 'Cash register operation, Inventory management, POS system operation, Accurate money handling, Sales expertise, Documentation and recordkeeping, Teamwork, Retail merchandising expertise';
  syncSkillsFromText();

  cvForm.value.experience = [
    {
      role: 'Retail Sales Associate',
      company: 'ZARA',
      duration: 'February 2017-Current',
      location: 'New Delhi, India',
      points: [
        'Increased monthly sales 10% by effectively upselling and cross-selling products to maximize profitability.',
        'Prevented store losses by leveraging awareness, attention to detail, and integrity to identify and investigate concerns.',
        'Processed payments and maintained accurate drawers to meet financial targets.'
      ]
    },
    {
      role: 'Barista',
      company: 'Dunkin\' Donuts',
      duration: 'March 2015-January 2017',
      location: 'New Delhi, India',
      points: [
        'Upsold seasonal drinks and pastries, boosting average store sales by ₹1500 weekly.',
        'Managed morning rush of over 300 customers daily with efficient, levelheaded customer service.',
        'Trained entire staff of 15 baristas in new smoothie program offerings and procedures.',
        'Developed creative and appealing latte art techniques and instructed coworkers in method.'
      ]
    }
  ];

  cvForm.value.education = [
    {
      degree: 'Diploma in Financial Accounting',
      institution: 'Oxford Software Institute & Oxford School of English, New Delhi, India',
      year: '2016'
    }
  ];

  cvForm.value.languages = [
    { name: 'Hindi', levelText: 'Native speaker', isNative: true },
    { name: 'English', code: 'C2', proficiency: 'Proficient', percent: 92 },
    { name: 'Bengali', code: 'B2', proficiency: 'Upper-intermediate', percent: 70 }
  ];
}

// Load Tech Profile (Rahul Sharma)
function loadTechSampleData() {
  cvForm.value.fullName = 'Rahul Sharma';
  cvForm.value.phone = '+91 98765 43210';
  cvForm.value.email = 'rahul.sharma@ithunt.in';
  cvForm.value.location = 'Noida, Uttar Pradesh, India 201301';
  cvForm.value.linkedin = 'linkedin.com/in/rahulsharma-dev';
  cvForm.value.portfolio = 'github.com/rahulsharma';
  cvForm.value.summary = 'Passionate Full-Stack Developer with hands-on client sprint training at IT HUNT Software Studio. Specialized in architecting scalable MERN applications, high-throughput REST APIs, and responsive React 19 interfaces. Experienced with Redis caching, Docker containerization, and Git collaboration workflows with a strong focus on clean code and reliable system design.';
  
  skillsInputText.value = 'JavaScript (ES6+), React 19 & Next.js, Node.js & Express, MongoDB & Mongoose, PostgreSQL & SQL, Docker & CI/CD, Redis In-Memory Cache, REST APIs & Microservices';
  syncSkillsFromText();

  cvForm.value.experience = [
    {
      role: 'Software Engineering Intern',
      company: 'IT HUNT Software Studio & Tech Academy',
      duration: 'January 2026-Present',
      location: 'Noida, India',
      points: [
        'Engineered responsive client modules and REST microservices in Agile sprints, delivering sub-50ms API response times.',
        'Architected secure JWT authentication and Redis caching layer, decreasing database query overhead by 42%.',
        'Participated in weekly architect code reviews, Git pull-request merges, and automated unit testing with 95%+ coverage.'
      ]
    }
  ];

  cvForm.value.education = [
    {
      degree: 'Bachelor of Technology (B.Tech) in Computer Science',
      institution: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
      year: '2022-2026'
    }
  ];

  cvForm.value.languages = [
    { name: 'Hindi', levelText: 'Native speaker', isNative: true },
    { name: 'English', code: 'C1', proficiency: 'Advanced Proficient', percent: 88 },
    { name: 'German', code: 'A2', proficiency: 'Elementary', percent: 45 }
  ];
}

// Apply Preset Summaries
function applySummaryPreset(type) {
  if (type === 'specimen') {
    cvForm.value.summary = 'Customer-focused Retail Sales professional with solid understanding of retail dynamics, marketing and customer service. Offering 5 years of experience providing quality product recommendations and solutions to meet customer needs and exceed expectations. Demonstrated record of exceeding revenue targets by leveraging communication skills and sales expertise.';
  } else if (type === 'mern') {
    cvForm.value.summary = 'Proactive Full-Stack Engineer with comprehensive hands-on internship experience in MERN stack development at IT HUNT. Proficient in crafting component-driven UIs with React 19, building scalable Node/Express microservices, and modeling optimized MongoDB databases. Adept in Agile methodologies and automated CI/CD deployments.';
  } else if (type === 'ai') {
    cvForm.value.summary = 'AI & Backend Developer skilled in building intelligent software applications utilizing Python 3.12, FastAPI, and modern LLM APIs (Gemini 2.0 / OpenAI). Experienced in designing vector embeddings search, automating business workflows, and deploying containerized cloud services with rigorous automated tests.';
  }
}

// Dynamic Helpers
function addExperience() {
  cvForm.value.experience.push({
    role: 'Associate Position',
    company: 'Company / Studio',
    duration: '2025-Current',
    location: 'City, Country',
    points: ['Delivered key business tasks and collaborated with multi-disciplinary team members.']
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

function addEducation() {
  cvForm.value.education.push({
    degree: 'Higher Secondary / Diploma',
    institution: 'Institute Name, City',
    year: '2024'
  });
}

function removeEducation(idx) {
  if (cvForm.value.education.length > 1) {
    cvForm.value.education.splice(idx, 1);
  }
}

// Pre-fill from studentUser if present
const initFromStudentUser = () => {
  if (!props.studentUser) return;
  const su = props.studentUser;
  if (su.candidateName || su.name) cvForm.value.fullName = su.candidateName || su.name;
  if (su.email) cvForm.value.email = su.email;
  if (su.phone || su.mobile) cvForm.value.phone = su.phone || su.mobile;
};

watch(() => props.studentUser, () => {
  initFromStudentUser();
}, { immediate: true });

onMounted(() => {
  if (props.studentUser) {
    initFromStudentUser();
  } else {
    loadSpecimenData();
  }
  skillsInputText.value = 'Cash register operation, Inventory management, POS system operation, Accurate money handling, Sales expertise, Documentation and recordkeeping, Teamwork, Retail merchandising expertise';
  syncSkillsFromText();
});

// Download 1-Page PDF
function handleDownloadCv() {
  try {
    isGenerating.value = true;
    syncSkillsFromText();
    const filename = downloadProfessionalCvPdf(cvForm.value, selectedTheme.value);
    emit('cv-generated', { filename, candidateName: cvForm.value.fullName });
  } catch (err) {
    console.error('Failed to generate CV PDF:', err);
    alert('An error occurred while compiling your 1-page PDF. Please verify your details.');
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
  background: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(10px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
}

.cv-modal-card {
  background: var(--bg-card, #ffffff);
  color: var(--text-main, #1e293b);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 18px;
  width: 100%;
  max-width: 920px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  animation: modalEnter 0.22s ease-out forwards;
}

@keyframes modalEnter {
  from { opacity: 0; transform: scale(0.97) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Header */
.cv-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.25rem 1.75rem 1rem;
  border-bottom: 1px solid var(--border-color, #e2e8f0);
  gap: 1rem;
  background: var(--bg-card-subtle, #f8fafc);
}

.cv-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--color-ai-orange, #ea580c);
  margin-bottom: 0.25rem;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-ai-orange, #ea580c);
}

.cv-header-title {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-main, #0f172a);
  margin: 0 0 0.25rem;
}

.cv-header-subtitle {
  font-size: 0.82rem;
  color: var(--text-muted, #64748b);
  margin: 0;
}

.cv-header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.cv-preset-btn {
  background: rgba(234, 88, 12, 0.1);
  border: 1px solid rgba(234, 88, 12, 0.3);
  color: var(--color-ai-orange, #ea580c);
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cv-preset-btn:hover {
  background: rgba(234, 88, 12, 0.2);
}

.specimen-btn {
  background: rgba(30, 41, 59, 0.08);
  border-color: rgba(30, 41, 59, 0.2);
  color: var(--text-main, #0f172a);
}

.cv-close-btn {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #64748b;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.cv-close-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

/* Tabs */
.cv-tabs-bar {
  display: flex;
  align-items: center;
  padding: 0.5rem 1.75rem;
  background: var(--bg-card-subtle, #f1f5f9);
  border-bottom: 1px solid var(--border-color, #e2e8f0);
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
  gap: 0.35rem;
  background: transparent;
  border: none;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted, #64748b);
  cursor: pointer;
  transition: all 0.15s ease;
}

.cv-tab-item:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--text-main, #0f172a);
}

.cv-tab-item.active {
  background: var(--color-ai-orange, #ea580c);
  color: #ffffff;
}

.tab-num {
  font-size: 0.7rem;
  font-weight: 800;
  opacity: 0.8;
}

/* Modal Body */
.cv-modal-body {
  padding: 1.5rem 1.75rem;
  overflow-y: auto;
  flex: 1;
}

.cv-form-section {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-title {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-main, #0f172a);
  margin: 0 0 0.2rem;
}

.section-sub {
  font-size: 0.8rem;
  color: var(--text-muted, #64748b);
  margin: 0 0 1rem;
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.form-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-main, #334155);
}

.req {
  color: #ef4444;
}

.form-control {
  width: 100%;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border-color, #cbd5e1);
  background: var(--bg-card, #ffffff);
  color: var(--text-main, #0f172a);
  font-size: 0.85rem;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: var(--color-ai-orange, #ea580c);
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.preset-chips {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.chip-label {
  font-size: 0.75rem;
  color: var(--text-muted, #64748b);
}

.mini-chip-btn {
  background: var(--bg-card-subtle, #f1f5f9);
  border: 1px solid var(--border-color, #cbd5e1);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-main, #334155);
}

.mini-chip-btn:hover {
  border-color: var(--color-ai-orange, #ea580c);
  color: var(--color-ai-orange, #ea580c);
}

/* Skills 2-Column Preview */
.skills-2col-preview {
  margin-top: 1rem;
  padding: 0.85rem;
  background: var(--bg-card-subtle, #f8fafc);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 10px;
}

.preview-col-title {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted, #64748b);
  margin-bottom: 0.5rem;
}

.skills-2col-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.skills-subcol {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.skill-bullet-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--text-main, #1e293b);
}

.bullet-dot {
  color: var(--text-muted, #64748b);
  font-weight: 800;
}

/* Dynamic Cards */
.dynamic-item-card {
  padding: 0.85rem;
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 10px;
  background: var(--bg-card-subtle, #f8fafc);
  margin-bottom: 0.85rem;
}

.item-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.item-card-badge {
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--text-muted, #64748b);
  text-transform: uppercase;
}

.btn-add-mini {
  background: rgba(234, 88, 12, 0.1);
  border: 1px solid rgba(234, 88, 12, 0.3);
  color: var(--color-ai-orange, #ea580c);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  cursor: pointer;
}

.btn-remove-mini {
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
}

/* Languages */
.lang-edit-card {
  padding: 0.75rem;
  background: var(--bg-card-subtle, #f8fafc);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 8px;
}

.flex-gap {
  display: flex;
  gap: 0.5rem;
}

.flex-1 { flex: 1; }
.flex-2 { flex: 2; }

.range-slider {
  width: 100%;
  accent-color: var(--color-ai-orange, #ea580c);
}

/* 📄 Full Page Paper Preview */
.paper-preview-container {
  display: flex;
  justify-content: center;
  background: #cbd5e1;
  padding: 1.5rem;
  border-radius: 12px;
  overflow-x: auto;
}

.paper-sheet {
  background: #ffffff;
  color: #222222;
  width: 100%;
  max-width: 580px;
  min-height: 720px;
  padding: 2.25rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: 'Times New Roman', Times, Georgia, serif;
  box-sizing: border-box;
}

.paper-name {
  font-size: 1.75rem;
  font-weight: bold;
  color: #222222;
  line-height: 1.15;
}

.paper-contact {
  font-size: 0.75rem;
  color: #666666;
  margin-top: 0.35rem;
  margin-bottom: 1.25rem;
}

.paper-section {
  margin-bottom: 1.1rem;
}

.paper-heading {
  font-size: 0.85rem;
  font-weight: bold;
  letter-spacing: 0.04em;
  color: #222222;
  margin-bottom: 0.35rem;
}

.paper-body {
  font-size: 0.78rem;
  line-height: 1.45;
  color: #333333;
}

.paper-skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.paper-bullet-line {
  font-size: 0.78rem;
  line-height: 1.45;
  color: #333333;
}

.paper-exp-entry {
  margin-bottom: 0.65rem;
}

.paper-exp-header {
  font-size: 0.79rem;
  color: #222222;
}

.paper-exp-sub {
  font-size: 0.74rem;
  color: #666666;
  margin-bottom: 0.2rem;
}

.paper-bullet-list {
  margin: 0;
  padding-left: 1rem;
  font-size: 0.76rem;
  line-height: 1.4;
  color: #333333;
}

.paper-edu-degree {
  font-size: 0.79rem;
  color: #222222;
}

.paper-edu-sub {
  font-size: 0.74rem;
  color: #555555;
}

.paper-native-row {
  font-size: 0.78rem;
  color: #333333;
  margin-bottom: 0.4rem;
}

.paper-lang-bars-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.paper-lang-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.74rem;
  color: #333333;
  margin-bottom: 0.15rem;
}

.paper-bar-track {
  width: 100%;
  height: 5px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.paper-bar-fill {
  height: 100%;
  background: #333333;
}

.theme-orange .paper-bar-fill {
  background: #ea580c;
}

.paper-lang-label {
  font-size: 0.68rem;
  color: #666666;
  margin-top: 0.15rem;
}

.preview-badge {
  font-size: 0.72rem;
  font-weight: 700;
  color: #059669;
  background: rgba(5, 150, 105, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

/* Modal Footer */
.cv-modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.75rem;
  border-top: 1px solid var(--border-color, #e2e8f0);
  background: var(--bg-card-subtle, #f8fafc);
  gap: 1rem;
  flex-wrap: wrap;
}

.cv-palette-picker {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.palette-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted, #64748b);
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
  background: var(--bg-card, #ffffff);
  border: 1px solid var(--border-color, #cbd5e1);
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-main, #334155);
  cursor: pointer;
}

.palette-btn.active {
  border-color: var(--color-ai-orange, #ea580c);
  background: rgba(234, 88, 12, 0.08);
  color: var(--color-ai-orange, #ea580c);
}

.color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.color-dot.classic { background: #334155; }
.color-dot.slate { background: #0f172a; }
.color-dot.orange { background: #ea580c; }

.cv-footer-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-cancel {
  background: transparent;
  border: 1px solid var(--border-color, #cbd5e1);
  color: var(--text-muted, #64748b);
  padding: 0.55rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-download-cv {
  background: var(--color-ai-orange, #ea580c);
  color: #ffffff;
  border: none;
  padding: 0.55rem 1.25rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.25);
}

.btn-download-cv:hover:not(:disabled) {
  opacity: 0.95;
  transform: translateY(-1px);
}

.btn-download-cv:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .form-grid-2, .skills-2col-grid, .paper-skills-grid, .paper-lang-bars-grid {
    grid-template-columns: 1fr;
  }
  .cv-modal-header {
    flex-direction: column;
  }
  .cv-modal-footer {
    flex-direction: column;
    align-items: stretch;
  }
  .cv-footer-buttons {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
