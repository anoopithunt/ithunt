<template>
  <section class="login-page-section container" style="min-height: 82vh; display: flex; align-items: center; justify-content: center; padding: 3.5rem 1.5rem;">
    <div class="login-card-wrap anim-stagger-1">
      <!-- Glow Backdrop Aura -->
      <div class="login-glow-aura" aria-hidden="true"></div>

      <div class="login-card">
        <!-- Brand & Header -->
        <div class="login-card-header">
          <div class="login-badge-pill">
            <span class="pulse-dot"></span>
            <span>🔐 UNIFIED IT HUNT SECURE PORTAL</span>
          </div>

          <h1 class="login-title">
            Portal <span class="text-gradient">{{ authMode === 'login' ? 'Sign In' : 'Registration' }}</span>
          </h1>

          <p class="login-subtitle">
            <span v-if="authMode === 'login'">
              Enter your credentials. The system automatically identifies your role and opens your 
              <strong style="color: #34d399;">Admin Console</strong>, 
              <strong style="color: #38bdf8;">Teacher Portal</strong>, or 
              <strong style="color: var(--color-ai-orange);">Student Dashboard</strong>.
            </span>
            <span v-else>
              Apply and create your student account to access live course materials, attendance tracking, and batch schedules.
            </span>
          </p>
        </div>

        <!-- Feedback Alert if Error -->
        <div v-if="errorMessage" class="login-error-alert" role="alert">
          <span style="font-size: 1.25rem;">⚠️</span>
          <div>
            <strong>Authentication Notice:</strong>
            <div>{{ errorMessage }}</div>
          </div>
        </div>

        <!-- Success Toast Alert if any -->
        <div v-if="successMessage" class="login-success-alert" role="alert">
          <span style="font-size: 1.25rem;">✅</span>
          <div>{{ successMessage }}</div>
        </div>

        <!-- ================================================================= -->
        <!-- UNIFIED SINGLE LOGIN FORM                                         -->
        <!-- ================================================================= -->
        <form v-if="authMode === 'login'" @submit.prevent="handleUnifiedLogin" class="login-form">
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" for="login-identifier">
              <span>👤</span> User ID / Email / Username / Reg No <span class="req">*</span>
            </label>
            <input 
              id="login-identifier"
              type="text" 
              v-model="loginIdentifier" 
              required 
              class="form-control" 
              placeholder="e.g. admin@ithunt.com, teacher@ithunt.com, or student email / ID"
              autocomplete="username"
            >
          </div>

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <label class="form-label" for="login-password" style="margin-bottom: 0;">
                <span>🔑</span> Password <span class="req">*</span>
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
              id="login-password"
              :type="showPassword ? 'text' : 'password'" 
              v-model="loginPassword" 
              required 
              class="form-control" 
              placeholder="Enter your security password"
              autocomplete="current-password"
            >
          </div>

          <!-- Options Row -->
          <div class="login-options-row">
            <label class="checkbox-label">
              <input type="checkbox" v-model="rememberMe">
              <span>Stay signed in on this device</span>
            </label>
            <span class="security-chip">🔒 256-Bit SSL Encrypted</span>
          </div>

          <!-- Submit Button -->
          <div style="margin-top: 1.5rem;">
            <button type="submit" class="btn-primary login-submit-btn" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-inline"></span>
              <span>{{ isLoading ? 'Verifying Credentials...' : 'Sign In to Portal 🚀' }}</span>
            </button>
          </div>

          <!-- Quick 1-Click Demo Credentials Pill Helpers -->
          <div class="login-demo-helper">
            <div class="demo-cred-title">
              ⚡ Quick Demo Login Shortcuts (Click to Auto-Fill):
            </div>
            <div class="demo-chips-grid">
              <button 
                type="button" 
                class="demo-chip-btn chip-admin" 
                @click="quickFillRole('admin')"
                title="Fill SuperAdmin credentials (admin@ithunt.com)"
              >
                <span>⚡ Admin</span>
              </button>
              <button 
                type="button" 
                class="demo-chip-btn chip-teacher" 
                @click="quickFillRole('teacher')"
                title="Fill Teacher credentials (teacher@ithunt.com)"
              >
                <span>👨‍🏫 Teacher</span>
              </button>
              <button 
                type="button" 
                class="demo-chip-btn chip-student" 
                @click="quickFillRole('student')"
                title="Fill Student credentials (student@ithunt.com)"
              >
                <span>🎓 Student</span>
              </button>
            </div>
          </div>

          <!-- Student Registration Prompt -->
          <div class="new-student-callout">
            <span>New Student seeking admission?</span>
            <button type="button" class="register-switch-link" @click="authMode = 'register'; errorMessage = '';">
              Create Student Account / Register →
            </button>
          </div>
        </form>

        <!-- ================================================================= -->
        <!-- OPTIONAL: NEW STUDENT REGISTRATION FORM                           -->
        <!-- ================================================================= -->
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

          <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem;">
            <button type="button" class="btn-secondary" style="flex: 1; justify-content: center;" @click="authMode = 'login'; errorMessage = '';">
              ← Back to Sign In
            </button>
            <button type="submit" class="btn-primary" style="flex: 2; justify-content: center;" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-inline"></span>
              <span>{{ isLoading ? 'Creating Account...' : 'Register & Enter Dashboard 🎓' }}</span>
            </button>
          </div>
        </form>

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

const emit = defineEmits(['login-success', 'student-login-success', 'set-tab', 'role-change']);

// View mode: 'login' | 'register'
const authMode = ref('login');

// Unified Form State
const loginIdentifier = ref('');
const loginPassword = ref('');
const showPassword = ref(false);
const rememberMe = ref(true);
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

// Student Registration State
const studentSignup = reactive({
  candidateName: '',
  email: '',
  mobile: '',
  course: '3-Month MERN Stack Web Engineer',
  password: ''
});

// Quick 1-Click Demo Credentials
const quickFillRole = (role) => {
  errorMessage.value = '';
  successMessage.value = '';
  authMode.value = 'login';

  if (role === 'admin') {
    loginIdentifier.value = props.content.superAdminData?.adminAuth?.defaultUsername || 'admin@ithunt.com';
    loginPassword.value = props.content.superAdminData?.adminAuth?.defaultPassword || 'admin@ithunt2026';
    successMessage.value = '⚡ Admin demo credentials loaded: admin@ithunt.com / admin@ithunt2026';
  } else if (role === 'teacher') {
    loginIdentifier.value = 'teacher@ithunt.com';
    loginPassword.value = 'teacher@123';
    successMessage.value = '👨‍🏫 Teacher demo credentials loaded: teacher@ithunt.com / teacher@123';
  } else if (role === 'student') {
    loginIdentifier.value = 'student@ithunt.com';
    loginPassword.value = 'Ithunt@123';
    successMessage.value = '🎓 Student demo credentials loaded: student@ithunt.com / Ithunt@123';
  }
};

/**
 * Route user based on their detected role:
 * - 'superadmin' | 'admin' => SuperAdmin Console
 * - 'teacher' | 'faculty' => Faculty / Teacher Console
 * - 'student' => Student Dashboard
 */
const routeUserByRole = (user) => {
  isLoading.value = false;
  const role = String(user.roleType || user.role || 'student').toLowerCase();
  const email = (user.email || loginIdentifier.value).trim();

  // 1. ADMIN / SUPERADMIN ROLE
  if (role === 'superadmin' || role === 'admin' || email === 'admin@ithunt.com') {
    const adminUser = {
      name: user.name || 'Mr. Lakshman Singh Chauhan',
      role: role === 'superadmin' ? 'Director & Chief Administrator' : (user.role || 'Administrator'),
      roleType: 'superadmin',
      email: email,
      avatar: user.avatar || props.content.director?.image || 'img/ithunt.webp',
      loginTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    if (rememberMe.value) {
      try {
        sessionStorage.setItem('ithunt_superadmin_auth', JSON.stringify(adminUser));
        localStorage.setItem('ithunt_superadmin_auth', JSON.stringify(adminUser));
      } catch (e) {}
    }

    emit('role-change', 'admin');
    emit('login-success', adminUser);
    return;
  }

  // 2. STAFF / TEACHER / TECH LEAD / DEVELOPER ROLES
  if (
    role === 'teacher' || role === 'faculty' || 
    role === 'tech-lead' || role === 'developer' || 
    role === 'senior-developer' || role === 'staff' || 
    role === 'accountant' || role === 'intern' ||
    role.includes('teacher') || role.includes('faculty') || 
    role.includes('lead') || role.includes('dev')
  ) {
    const staffRoleTitle = role === 'tech-lead' ? 'Tech Lead & Software Architect' 
      : (role === 'developer' ? 'Software Developer' 
      : (role === 'senior-developer' ? 'Senior Software Engineer' 
      : (role === 'accountant' ? 'Accounts & Finance Lead'
      : (role === 'staff' ? 'Administrative Staff' 
      : (user.designation || user.role || 'Senior Faculty Lead & Technical Mentor')))));

    const staffUser = {
      name: user.name || 'Staff Member',
      role: staffRoleTitle,
      roleType: role,
      email: email,
      avatar: user.avatar || 'img/ithunt.webp',
      loginTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    if (rememberMe.value) {
      try {
        sessionStorage.setItem('ithunt_superadmin_auth', JSON.stringify(staffUser));
        localStorage.setItem('ithunt_superadmin_auth', JSON.stringify(staffUser));
      } catch (e) {}
    }

    emit('role-change', role);
    emit('login-success', staffUser);
    return;
  }

  // 3. STUDENT ROLE
  const studentUser = {
    ...user,
    candidateName: user.candidateName || user.fullName || user.name || 'Student',
    name: user.name || user.candidateName || 'Student',
    email: email,
    role: 'student',
    roleType: 'student',
    registrationNo: user.registrationNo || user.enrollmentNumber || user.id || 'ITH-2026-STU'
  };

  if (rememberMe.value) {
    try {
      localStorage.setItem('ithunt_student_user', JSON.stringify(studentUser));
    } catch (e) {}
  }

  emit('role-change', 'student');
  emit('student-login-success', studentUser);
};

// ==========================================
// UNIFIED AUTHENTICATION HANDLER
// ==========================================
const handleUnifiedLogin = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  isLoading.value = true;

  const rawIdentifier = loginIdentifier.value.trim();
  const rawPassword = loginPassword.value.trim();
  const norm = rawIdentifier.toLowerCase();

  if (!rawIdentifier || !rawPassword) {
    isLoading.value = false;
    errorMessage.value = 'Please enter your User ID / Email and password.';
    return;
  }

  // 1. Authenticate with backend API: POST /api/auth/login
  try {
    const apiRes = await loginUserWithBackend(rawIdentifier, rawPassword);
    if (apiRes && apiRes.success) {
      const userData = apiRes.data?.user || apiRes.data || {};
      const token = apiRes.data?.token || '';
      if (token) {
        localStorage.setItem('token', token);
        if (userData.role === 'admin' || userData.role === 'superadmin' || userData.role === 'teacher' || userData.role === 'faculty') {
          localStorage.setItem('adminToken', token);
        }
      }
      routeUserByRole(userData);
      return;
    } else if (apiRes && (apiRes.pending || apiRes.error || apiRes.message)) {
      if (apiRes.pending) {
        isLoading.value = false;
        errorMessage.value = apiRes.message || 'Your admission is pending review by SuperAdmin.';
        return;
      }
    }
  } catch (apiErr) {
    console.warn('Backend API auth note:', apiErr.message);
  }

  // 2. Client-Side Fallback Verification (Offline & Demo Accounts)

  // 2.A Check Admin fallback
  const validAdminUser = (props.content.superAdminData?.adminAuth?.defaultUsername || 'admin@ithunt.com').toLowerCase();
  const validAdminPass = props.content.superAdminData?.adminAuth?.defaultPassword || 'admin@ithunt2026';
  if ((norm === validAdminUser || norm === 'admin') &&
      (rawPassword === validAdminPass || rawPassword === 'admin' || rawPassword === 'admin123' || rawPassword === 'admin@ithunt2026')) {
    routeUserByRole({
      name: props.content.superAdminData?.adminAuth?.superAdminName || 'Mr. Lakshman Singh Chauhan',
      email: validAdminUser,
      role: 'superadmin',
      roleType: 'superadmin'
    });
    return;
  }

  // 2.B Check Teacher fallback
  if ((norm === 'teacher@ithunt.com' || norm === 'teacher' || norm === 'faculty@ithunt.com' || norm === 'faculty') &&
      (rawPassword === 'teacher@ithunt2026' || rawPassword === 'teacher@123' || rawPassword === 'teacher' || rawPassword === 'faculty@123' || rawPassword === 'faculty')) {
    routeUserByRole({
      name: 'Er. Sandeep Srivastava (Teacher)',
      email: 'teacher@ithunt.com',
      role: 'teacher',
      roleType: 'teacher',
      designation: 'Senior Faculty Lead & Technical Mentor'
    });
    return;
  }

  // 2.C Check Student fallback (queries student API & localStorage)
  try {
    const stuRes = await loginStudentUser(rawIdentifier, rawPassword);
    if (stuRes && stuRes.success && stuRes.user) {
      routeUserByRole({
        ...stuRes.user,
        role: 'student',
        roleType: 'student'
      });
      return;
    }
  } catch (e) {}

  // 2.D Default demo student fallback
  if (norm === 'student@ithunt.com' && (rawPassword === 'Ithunt@123' || rawPassword === 'student123' || rawPassword === 'student' || rawPassword === 'password')) {
    routeUserByRole({
      ...DEFAULT_DEMO_STUDENT,
      role: 'student',
      roleType: 'student'
    });
    return;
  }

  isLoading.value = false;
  errorMessage.value = 'Invalid credentials. Please verify your User ID / Email and password, or use the quick demo shortcuts below.';
};

// ==========================================
// Student Registration Submit Handler
// ==========================================
const handleStudentSignupSubmit = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB');
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const signupPayload = {
      ...studentSignup,
      userId: studentSignup.email,
      password: studentSignup.password || 'Ithunt@123',
      date: dateStr,
      time: timeStr
    };
    const res = await registerStudentUser(signupPayload);
    const studentUser = (res && res.user) ? { ...res.user, admission: res.admission } : {
      ...DEFAULT_DEMO_STUDENT,
      candidateName: studentSignup.candidateName,
      userId: studentSignup.email,
      email: studentSignup.email,
      password: studentSignup.password || 'Ithunt@123',
      mobile: studentSignup.mobile,
      course: studentSignup.course,
      date: dateStr,
      time: timeStr,
      registrationNo: 'ITH-2026-' + Math.floor(100 + Math.random() * 900)
    };

    if (rememberMe.value) {
      try {
        localStorage.setItem('ithunt_student_user', JSON.stringify(studentUser));
      } catch (e) {}
    }

    isLoading.value = false;
    emit('role-change', 'student');
    emit('student-login-success', studentUser);
  } catch (err) {
    isLoading.value = false;
    errorMessage.value = err.message || 'Registration failed. Please try again.';
  }
};
</script>

<style scoped>
.login-page-section {
  position: relative;
  z-index: 1;
}

.login-card-wrap {
  width: 100%;
  max-width: 520px;
  position: relative;
}

.login-glow-aura {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, rgba(14, 165, 233, 0.12) 50%, rgba(0, 0, 0, 0) 80%);
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
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(249, 115, 22, 0.15);
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
  background: rgba(249, 115, 22, 0.12);
  border: 1px solid rgba(249, 115, 22, 0.35);
  border-radius: var(--radius-full);
  font-size: 0.76rem;
  font-weight: 800;
  color: var(--color-ai-yellow);
  font-family: var(--font-mono);
  margin-bottom: 0.85rem;
}

body.light-theme .login-badge-pill {
  color: #000000 !important;
}

.login-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.45rem;
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

.login-success-alert {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.4);
  color: #6ee7b7;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.82rem;
  font-weight: 600;
}

body.light-theme .login-success-alert {
  color: #065f46;
  background: #d1fae5;
  border-color: #a7f3d0;
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
  padding: 1rem;
  background: rgba(15, 23, 42, 0.4);
  border: 1px dashed var(--border-cyber);
  border-radius: var(--radius-md);
}

body.light-theme .login-demo-helper {
  background: rgba(241, 245, 249, 0.7);
}

.demo-cred-title {
  font-size: 0.76rem;
  color: var(--text-muted);
  font-weight: 700;
  margin-bottom: 0.65rem;
  text-align: center;
}

.demo-chips-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.demo-chip-btn {
  padding: 0.5rem 0.65rem;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
}

.chip-admin {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.35);
}

.chip-admin:hover {
  background: rgba(16, 185, 129, 0.28);
  transform: translateY(-1px);
}

.chip-teacher {
  background: rgba(14, 165, 233, 0.15);
  color: #38bdf8;
  border-color: rgba(14, 165, 233, 0.35);
}

.chip-teacher:hover {
  background: rgba(14, 165, 233, 0.28);
  transform: translateY(-1px);
}

.chip-student {
  background: rgba(249, 115, 22, 0.15);
  color: var(--color-ai-yellow);
  border-color: rgba(249, 115, 22, 0.35);
}

.chip-student:hover {
  background: rgba(249, 115, 22, 0.28);
  transform: translateY(-1px);
}

.new-student-callout {
  margin-top: 1.25rem;
  text-align: center;
  font-size: 0.82rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.register-switch-link {
  background: transparent;
  border: none;
  color: var(--color-ai-orange);
  font-weight: 700;
  font-size: 0.82rem;
  cursor: pointer;
  padding: 0;
  transition: var(--transition);
}

.register-switch-link:hover {
  text-decoration: underline;
  color: var(--color-ai-yellow);
}

.login-card-footer {
  margin-top: 1.5rem;
  text-align: center;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-cyber);
}

.security-notice-text {
  font-size: 0.74rem;
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
