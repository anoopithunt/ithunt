<template>
  <section class="login-page-section container" style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 4rem 1.5rem;">
    <div class="login-card-wrap anim-stagger-1">
      <!-- Glow Backdrop Aura -->
      <div class="login-glow-aura" aria-hidden="true"></div>

      <div class="login-card">
        <!-- Unified Portal Role Tabs -->
        <div class="role-switcher-tabs" role="tablist">
          <button 
            type="button"
            class="role-tab-btn" 
            :class="{ active: activeRole === 'student' }" 
            @click="activeRole = 'student'; errorMessage = '';"
            role="tab"
            :aria-selected="activeRole === 'student'"
          >
            <span>🎓 Student Portal</span>
          </button>

          <button 
            type="button"
            class="role-tab-btn" 
            :class="{ active: activeRole === 'admin' }" 
            @click="activeRole = 'admin'; errorMessage = '';"
            role="tab"
            :aria-selected="activeRole === 'admin'"
          >
            <span>⚡ SuperAdmin Console</span>
          </button>
        </div>

        <!-- ================================================================= -->
        <!-- 1. STUDENT AUTHENTICATION FLOW                                    -->
        <!-- ================================================================= -->
        <div v-if="activeRole === 'student'">
          <!-- Brand & Header -->
          <div class="login-card-header">
            <div class="login-badge-pill student-badge">
              <span class="pulse-dot" style="background: var(--color-ai-orange);"></span>
              <span>🎓 IT HUNT ACADEMY STUDENT GATEWAY</span>
            </div>

            <h1 class="login-title">
              Student <span class="text-gradient">Portal Login</span>
            </h1>

            <p class="login-subtitle">
              Access your enrolled course progress, attendance sheet, public holidays calendar, and batch exam scoreboard.
            </p>
          </div>

          <!-- Student Mode Sub-Tabs (Login vs Signup) -->
          <div class="sub-auth-mode-row">
            <button 
              type="button"
              class="sub-mode-btn" 
              :class="{ active: studentMode === 'login' }"
              @click="studentMode = 'login'; errorMessage = '';"
            >
              🔐 Student Sign In
            </button>
            <button 
              type="button"
              class="sub-mode-btn" 
              :class="{ active: studentMode === 'signup' }"
              @click="studentMode = 'signup'; errorMessage = '';"
            >
              ✨ New Student Registration
            </button>
          </div>

          <!-- Feedback Alert if Error -->
          <div v-if="errorMessage" class="login-error-alert" role="alert">
            <span style="font-size: 1.25rem;">⚠️</span>
            <div>
              <strong>Authentication Notice:</strong>
              <div>{{ errorMessage }}</div>
            </div>
          </div>

          <!-- 1.A Student Login Form -->
          <form v-if="studentMode === 'login'" @submit.prevent="handleStudentLoginSubmit" class="login-form">
            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label class="form-label" for="student-email">
                <span>📧</span> Registered Email or Reg No <span class="req">*</span>
              </label>
              <input 
                id="student-email"
                type="text" 
                v-model="studentLoginEmail" 
                required 
                class="form-control" 
                placeholder="student@ithunt.com or ITH-2026-001"
                autocomplete="username"
              >
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                <label class="form-label" for="student-password" style="margin-bottom: 0;">
                  <span>🔑</span> Student Password <span class="req">*</span>
                </label>
                <button 
                  type="button" 
                  class="password-toggle-btn" 
                  @click="showPassword = !showPassword"
                  :title="showPassword ? 'Hide password' : 'Show password'"
                >
                  {{ showPassword ? '🙈 Hide' : '👁️ Show' }}
                </button>
              </div>
              <input 
                id="student-password"
                :type="showPassword ? 'text' : 'password'" 
                v-model="studentLoginPassword" 
                required 
                class="form-control" 
                placeholder="Enter student password"
                autocomplete="current-password"
              >
            </div>

            <div class="login-options-row">
              <label class="checkbox-label">
                <input type="checkbox" v-model="rememberMe">
                <span>Stay signed in on this device</span>
              </label>
              <span class="security-chip">🎓 Verified Student</span>
            </div>

            <div style="margin-top: 1.5rem;">
              <button type="submit" class="btn-primary login-submit-btn" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-inline"></span>
                <span>{{ isLoading ? 'Verifying Student Credentials...' : 'Sign In to Student Dashboard 🚀' }}</span>
              </button>
            </div>
          </form>

          <!-- 1.B Student Signup Form -->
          <form v-else @submit.prevent="handleStudentSignupSubmit" class="login-form">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Candidate Full Name <span class="req">*</span></label>
              <input type="text" v-model="studentSignup.candidateName" required class="form-control" placeholder="Your full legal name">
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Email Address <span class="req">*</span></label>
              <input type="email" v-model="studentSignup.email" required class="form-control" placeholder="name@example.com">
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Mobile Number <span class="req">*</span></label>
              <input type="tel" v-model="studentSignup.mobile" pattern="[0-9]{10}" required class="form-control" placeholder="10-digit mobile">
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Desired Program <span class="req">*</span></label>
              <select v-model="studentSignup.course" class="form-control" required>
                <option value="3-Month MERN Stack Web Engineer">3-Month MERN Stack Web Engineer</option>
                <option value="6-Month Software & Cloud Masterclass">6-Month Software & Cloud Masterclass</option>
                <option value="NIELIT O/A Level Diploma">NIELIT O/A Level Diploma</option>
                <option value="Mobile App Engineering (Flutter/iOS)">Mobile App Engineering (Flutter/iOS)</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label class="form-label">Create Password <span class="req">*</span></label>
              <input type="password" v-model="studentSignup.password" required class="form-control" placeholder="At least 6 characters">
            </div>

            <div style="margin-top: 1.5rem;">
              <button type="submit" class="btn-primary login-submit-btn" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-inline"></span>
                <span>{{ isLoading ? 'Creating Student Account...' : 'Register & Enter Student Dashboard 🎓' }}</span>
              </button>
            </div>
          </form>

          <!-- Demo Quick-Fill Pill for Student -->
          <div class="login-demo-helper">
            <div class="demo-cred-text">
              🔑 Demo Student: <strong>student@ithunt.com</strong> / <strong>student123</strong>
            </div>
            <button type="button" class="btn-secondary quick-fill-btn" @click="quickFillStudent">
              <span>Auto-Fill Demo Student Credentials ⚡</span>
            </button>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- 2. SUPERADMIN AUTHENTICATION FLOW                                 -->
        <!-- ================================================================= -->
        <div v-else>
          <!-- Brand & Header -->
          <div class="login-card-header">
            <div class="login-badge-pill admin-badge">
              <span class="pulse-dot"></span>
              <span>{{ content.superAdminData?.loginUI?.badge || '🔐 SECURE SUPERADMIN GATEWAY' }}</span>
            </div>

            <h1 class="login-title">
              {{ content.superAdminData?.loginUI?.titlePrefix || 'Administrator ' }}<span class="text-gradient">{{ content.superAdminData?.loginUI?.titleGradient || 'Portal Login' }}</span>
            </h1>

            <p class="login-subtitle">
              {{ content.superAdminData?.loginUI?.subtitle || 'Authorized access for IT HUNT Directorate, Faculty Leads, and Academic Registry staff.' }}
            </p>
          </div>

          <!-- Feedback Alert if Error -->
          <div v-if="errorMessage" class="login-error-alert" role="alert">
            <span style="font-size: 1.25rem;">⚠️</span>
            <div>
              <strong>Authentication Failed:</strong>
              <div>{{ errorMessage }}</div>
            </div>
          </div>

          <!-- Admin Login Form -->
          <form @submit.prevent="handleAdminLogin" class="login-form">
            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label class="form-label" for="admin-username">
                <span>👤</span> {{ content.superAdminData?.loginUI?.usernameLabel || 'Admin Email or Username' }} <span class="req">*</span>
              </label>
              <input 
                id="admin-username"
                type="text" 
                v-model="adminUsername" 
                required 
                class="form-control" 
                :placeholder="content.superAdminData?.loginUI?.usernamePlaceholder || 'admin@ithunt.com'"
                autocomplete="username"
              >
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                <label class="form-label" for="admin-password" style="margin-bottom: 0;">
                  <span>🔑</span> {{ content.superAdminData?.loginUI?.passwordLabel || 'Security Password' }} <span class="req">*</span>
                </label>
                <button 
                  type="button" 
                  class="password-toggle-btn" 
                  @click="showPassword = !showPassword"
                  :title="showPassword ? 'Hide password' : 'Show password'"
                >
                  {{ showPassword ? '🙈 Hide' : '👁️ Show' }}
                </button>
              </div>
              <input 
                id="admin-password"
                :type="showPassword ? 'text' : 'password'" 
                v-model="adminPassword" 
                required 
                class="form-control" 
                :placeholder="content.superAdminData?.loginUI?.passwordPlaceholder || 'Enter administrator password'"
                autocomplete="current-password"
              >
            </div>

            <!-- Remember Me & Security Badge -->
            <div class="login-options-row">
              <label class="checkbox-label">
                <input type="checkbox" v-model="rememberMe">
                <span>{{ content.superAdminData?.loginUI?.rememberMeLabel || 'Keep me authenticated' }}</span>
              </label>
              <span class="security-chip">🔒 256-Bit SSL</span>
            </div>

            <!-- Submit Button -->
            <div style="margin-top: 1.5rem;">
              <button type="submit" class="btn-primary login-submit-btn" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-inline"></span>
                <span>{{ isLoading ? 'Verifying Administrator...' : (content.superAdminData?.loginUI?.loginBtnText || 'Sign In to SuperAdmin Console 🚀') }}</span>
              </button>
            </div>
          </form>

          <!-- Demo Quick-Fill Pill for Admin -->
          <div class="login-demo-helper">
            <div class="demo-cred-text">
              {{ content.superAdminData?.loginUI?.demoAdminCredentialsText || '🔑 Demo Credentials: admin@ithunt.com / admin@ithunt2026' }}
            </div>
            <button type="button" class="btn-secondary quick-fill-btn" @click="quickFillAdmin">
              <span>{{ content.superAdminData?.loginUI?.quickFillBtnText || 'Auto-Fill SuperAdmin Credentials ⚡' }}</span>
            </button>
          </div>
        </div>

        <!-- Security Footer Notice -->
        <div class="login-card-footer">
          <div class="security-notice-text">
            🛡️ 256-Bit Encrypted Session • ISO 9001:2015 Verified Academic Portal
          </div>
          <button type="button" class="back-home-link" @click="$emit('set-tab', 'home')">
            ← Back to Public Website
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { loginUserWithBackend, loginStudentUser, registerStudentUser } from '../../utils/apiClient.js';
import { DEFAULT_DEMO_STUDENT } from '../../data/studentAcademicData.js';

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['login-success', 'student-login-success', 'set-tab']);

// Tab states
const activeRole = ref('student'); // 'student' | 'admin'
const studentMode = ref('login'); // 'login' | 'signup'

// Common state
const showPassword = ref(false);
const rememberMe = ref(true);
const isLoading = ref(false);
const errorMessage = ref('');

// Admin inputs
const adminUsername = ref('');
const adminPassword = ref('');

// Student inputs
const studentLoginEmail = ref('');
const studentLoginPassword = ref('');

const studentSignup = reactive({
  candidateName: '',
  email: '',
  mobile: '',
  course: '3-Month MERN Stack Web Engineer',
  password: ''
});

// ==========================================
// Student Auth Handlers
// ==========================================
const handleStudentLoginSubmit = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  const emailInput = studentLoginEmail.value.trim();
  const passInput = studentLoginPassword.value.trim();

  // Smart detect: if user entered admin credentials into student tab
  const validAdminUser = props.content.superAdminData?.adminAuth?.defaultUsername || 'admin@ithunt.com';
  if (emailInput.toLowerCase() === validAdminUser.toLowerCase() || emailInput.toLowerCase() === 'admin') {
    activeRole.value = 'admin';
    adminUsername.value = emailInput;
    adminPassword.value = passInput;
    isLoading.value = false;
    handleAdminLogin();
    return;
  }

  // 1. Check if matching default demo student
  if (emailInput.toLowerCase() === 'student@ithunt.com' && (passInput === 'student123' || passInput === 'student' || passInput === 'password')) {
    const studentUser = { ...DEFAULT_DEMO_STUDENT };
    if (rememberMe.value) {
      try {
        localStorage.setItem('ithunt_student_user', JSON.stringify(studentUser));
      } catch (e) {}
    }
    isLoading.value = false;
    emit('student-login-success', studentUser);
    return;
  }

  // 2. Check local registration records or backend API
  try {
    const apiRes = await loginStudentUser(emailInput, passInput);
    if (apiRes && apiRes.success && apiRes.user) {
      const studentUser = { ...apiRes.user };
      if (rememberMe.value) {
        try {
          localStorage.setItem('ithunt_student_user', JSON.stringify(studentUser));
        } catch (e) {}
      }
      isLoading.value = false;
      emit('student-login-success', studentUser);
      return;
    }
  } catch (err) {
    console.warn('Student login API error:', err);
  }

  // 3. Fallback: check saved student in localStorage or cached admissions
  try {
    const saved = JSON.parse(localStorage.getItem('ithunt_student_user') || 'null');
    if (saved && (saved.email?.toLowerCase() === emailInput.toLowerCase() || saved.registrationNo?.toLowerCase() === emailInput.toLowerCase())) {
      isLoading.value = false;
      emit('student-login-success', saved);
      return;
    }

    const admissions = JSON.parse(localStorage.getItem('ithunt_admissions') || '[]');
    const match = admissions.find(a => 
      a.email?.toLowerCase() === emailInput.toLowerCase() || 
      a.registrationNo?.toLowerCase() === emailInput.toLowerCase()
    );
    if (match) {
      const studentUser = {
        ...DEFAULT_DEMO_STUDENT,
        candidateName: match.candidateName || match.fullName || 'Student',
        email: match.email || emailInput,
        mobile: match.mobile || match.phone || '9876543210',
        course: match.course || '3-Month MERN Stack Web Engineer',
        registrationNo: match.registrationNo || 'ITH-2026-' + Math.floor(100 + Math.random() * 900)
      };
      if (rememberMe.value) {
        localStorage.setItem('ithunt_student_user', JSON.stringify(studentUser));
      }
      isLoading.value = false;
      emit('student-login-success', studentUser);
      return;
    }
  } catch (e) {}

  isLoading.value = false;
  errorMessage.value = 'Invalid student credentials. Please check your email/password or use "Auto-Fill Demo Student Credentials".';
};

const handleStudentSignupSubmit = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    const res = await registerStudentUser({ ...studentSignup });
    const studentUser = (res && res.user) ? { ...res.user } : {
      ...DEFAULT_DEMO_STUDENT,
      candidateName: studentSignup.candidateName,
      email: studentSignup.email,
      mobile: studentSignup.mobile,
      course: studentSignup.course,
      registrationNo: 'ITH-2026-' + Math.floor(100 + Math.random() * 900)
    };

    if (rememberMe.value) {
      try {
        localStorage.setItem('ithunt_student_user', JSON.stringify(studentUser));
      } catch (e) {}
    }

    isLoading.value = false;
    emit('student-login-success', studentUser);
  } catch (err) {
    isLoading.value = false;
    errorMessage.value = err.message || 'Registration failed. Please try again.';
  }
};

const quickFillStudent = () => {
  studentLoginEmail.value = 'student@ithunt.com';
  studentLoginPassword.value = 'student123';
  studentMode.value = 'login';
  errorMessage.value = '';
};

// ==========================================
// Administrator Auth Handlers
// ==========================================
const handleAdminLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  const inputUser = adminUsername.value.trim();
  const inputPass = adminPassword.value.trim();

  // 1. Authenticate with backend REST API: POST /api/auth/login
  try {
    const apiRes = await loginUserWithBackend(inputUser, inputPass);
    if (apiRes && apiRes.success) {
      const user = apiRes.data?.user || apiRes.data || {};
      const token = apiRes.data?.token || '';
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('adminToken', token);
      }

      const adminUser = {
        name: user.name || 'Mr. Lakshman Singh Chauhan',
        role: user.role === 'superadmin' ? 'Director & Chief Administrator' : (user.role || 'Administrator'),
        email: user.email || inputUser,
        token: token,
        avatar: props.content.director?.image || 'img/ithunt.webp',
        loginTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      if (rememberMe.value) {
        try {
          sessionStorage.setItem('ithunt_superadmin_auth', JSON.stringify(adminUser));
        } catch (e) {}
      }

      isLoading.value = false;
      emit('login-success', adminUser);
      return;
    }
  } catch (apiErr) {
    console.info('Backend API auth notice:', apiErr.message);
  }

  // 2. Fallback check for default SuperAdmin portal credentials
  const validUsername = props.content.superAdminData?.adminAuth?.defaultUsername || 'admin@ithunt.com';
  const validPassword = props.content.superAdminData?.adminAuth?.defaultPassword || 'admin@ithunt2026';

  if ((inputUser.toLowerCase() === validUsername.toLowerCase() || inputUser === 'admin') && 
      (inputPass === validPassword || inputPass === 'admin123' || inputPass === 'admin@ithunt2026')) {
    const adminUser = {
      name: props.content.superAdminData?.adminAuth?.superAdminName || 'Mr. Lakshman Singh Chauhan',
      role: props.content.superAdminData?.adminAuth?.role || 'Director & Chief Administrator',
      email: validUsername,
      avatar: props.content.director?.image || 'img/ithunt.webp',
      loginTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    if (rememberMe.value) {
      try {
        sessionStorage.setItem('ithunt_superadmin_auth', JSON.stringify(adminUser));
      } catch (e) {}
    }

    isLoading.value = false;
    emit('login-success', adminUser);
  } else {
    isLoading.value = false;
    errorMessage.value = 'Invalid administrator credentials. Verify your email & password or click "Auto-Fill SuperAdmin Credentials".';
  }
};

const quickFillAdmin = () => {
  adminUsername.value = props.content.superAdminData?.adminAuth?.defaultUsername || 'admin@ithunt.com';
  adminPassword.value = props.content.superAdminData?.adminAuth?.defaultPassword || 'admin@ithunt2026';
  errorMessage.value = '';
};
</script>

<style scoped>
.login-page-section {
  position: relative;
  z-index: 1;
}

.login-card-wrap {
  width: 100%;
  max-width: 540px;
  position: relative;
}

.login-glow-aura {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.22) 0%, rgba(250, 204, 21, 0.1) 50%, rgba(0, 0, 0, 0) 80%);
  filter: blur(40px);
  pointer-events: none;
  z-index: -1;
}

.login-card {
  background: var(--bg-card-glass);
  border: 1px solid var(--border-cyber-glow);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  padding: 2.25rem 2.25rem;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(249, 115, 22, 0.18);
}

/* Role Switcher Tabs */
.role-switcher-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.35);
  padding: 0.35rem;
  border-radius: var(--radius-full);
  margin-bottom: 2rem;
  border: 1px solid var(--border-cyber);
}

body.light-theme .role-switcher-tabs {
  background: rgba(241, 245, 249, 0.9);
}

.role-tab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1rem;
  border: none;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-muted);
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.role-tab-btn.active {
  background: linear-gradient(135deg, var(--color-ai-orange), #ea580c);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
}

.sub-auth-mode-row {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.sub-mode-btn {
  padding: 0.45rem 1rem;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-cyber);
  color: var(--text-muted);
  font-size: 0.825rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.sub-mode-btn.active {
  background: rgba(249, 115, 22, 0.15);
  border-color: var(--color-ai-orange);
  color: var(--color-ai-yellow);
}

.login-card-header {
  text-align: center;
  margin-bottom: 1.75rem;
}

.login-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.95rem;
  background: rgba(249, 115, 22, 0.15);
  border: 1px solid rgba(249, 115, 22, 0.35);
  border-radius: var(--radius-full);
  font-size: 0.76rem;
  font-weight: 800;
  color: var(--color-ai-yellow);
  font-family: var(--font-mono);
  margin-bottom: 0.85rem;
}

.login-badge-pill.student-badge {
  background: rgba(249, 115, 22, 0.15);
  border-color: rgba(249, 115, 22, 0.4);
  color: var(--color-ai-yellow);
}

.login-badge-pill.admin-badge {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.4);
  color: #34d399;
}

body.light-theme .login-badge-pill {
  color: #0f172a !important;
}

.login-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
}

.login-subtitle {
  color: var(--text-muted);
  font-size: 0.86rem;
  line-height: 1.55;
}

.login-error-alert {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
  padding: 0.85rem 1.15rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.85rem;
  line-height: 1.5;
}

body.light-theme .login-error-alert {
  color: #991b1b;
  background: #fee2e2;
  border-color: #fca5a5;
}

.password-toggle-btn {
  background: transparent;
  border: none;
  color: var(--color-ai-cyan);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
}

.login-options-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.825rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  color: var(--text-muted);
  font-weight: 600;
}

.security-chip {
  color: var(--color-ai-emerald);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
}

.login-submit-btn {
  width: 100%;
  justify-content: center;
  padding: 0.95rem 1.5rem;
  font-size: 0.98rem;
}

.login-submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner-inline {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  margin-right: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-demo-helper {
  margin-top: 1.5rem;
  padding: 0.9rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px dashed var(--border-cyber);
  border-radius: var(--radius-md);
  text-align: center;
}

body.light-theme .login-demo-helper {
  background: rgba(249, 115, 22, 0.06);
}

.demo-cred-text {
  font-size: 0.78rem;
  color: var(--color-ai-yellow);
  font-family: var(--font-mono);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

body.light-theme .demo-cred-text {
  color: #c2410c;
}

.quick-fill-btn {
  width: 100%;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.825rem;
}

.login-card-footer {
  margin-top: 1.75rem;
  text-align: center;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-cyber);
}

.security-notice-text {
  font-size: 0.75rem;
  color: var(--text-dim);
  margin-bottom: 0.75rem;
}

.back-home-link {
  background: transparent;
  border: none;
  color: var(--color-ai-cyan);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
}

.back-home-link:hover {
  color: var(--color-ai-yellow);
  text-decoration: underline;
}
</style>
