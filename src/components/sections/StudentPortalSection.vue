<template>
  <div class="container" style="padding: 3.5rem 1.5rem; min-height: 80vh;">
    <!-- Section Header -->
    <div class="section-header" style="text-align: center; margin-bottom: 2.5rem;">
      <span class="section-tag">🎓 STUDENT PORTAL</span>
      <h1 class="section-title">
        Student <span class="text-gradient">Account & Profile Center</span>
      </h1>
      <p class="section-subtitle">
        Sign in to view your admission records, edit your profile details, and track fee receipts.
      </p>
    </div>

    <!-- LOGGED IN VIEW: Student Dashboard & Profile Editor -->
    <div v-if="studentUser" class="student-dashboard-wrap anim-stagger-1" style="max-width: 960px; margin: 0 auto;">
      <!-- Dashboard Welcome Banner -->
      <div style="background: var(--bg-card-glass); border: 1px solid var(--border-cyber); padding: 1.75rem; border-radius: var(--radius-lg); margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 1.25rem;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--gradient-ai-btn); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; color: #fff; font-weight: 800;">
            🎓
          </div>
          <div>
            <h2 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; margin-bottom: 0.2rem;">
              Welcome back, {{ studentUser.candidateName }}!
            </h2>
            <div style="font-size: 0.875rem; color: var(--text-muted); font-family: var(--font-mono);">
              Reg ID: <strong style="color: var(--color-ai-orange);">{{ studentUser.registrationNo || 'ITH-2026-001' }}</strong> | Email: {{ studentUser.email }}
            </div>
          </div>
        </div>

        <button class="btn-secondary" @click="handleLogout" style="padding: 0.5rem 1.2rem; font-size: 0.875rem;">
          <span>🚪 Logout</span>
        </button>
      </div>

      <!-- Quick Status Badges -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 2.5rem;">
        <div style="background: var(--bg-card-glass); border: 1px solid var(--border-cyber); padding: 1.25rem; border-radius: var(--radius-md); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Program Enrolled</div>
          <div style="font-weight: 800; font-size: 1.1rem; color: var(--text-main); margin-top: 0.4rem;">{{ studentUser.course || 'MERN Stack Developer' }}</div>
        </div>

        <div style="background: var(--bg-card-glass); border: 1px solid var(--border-cyber); padding: 1.25rem; border-radius: var(--radius-md); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Admission Status</div>
          <div style="font-weight: 800; font-size: 1.1rem; color: #10b981; margin-top: 0.4rem;">
            {{ studentUser.status || 'Active & Confirmed ✓' }}
          </div>
        </div>

        <div style="background: var(--bg-card-glass); border: 1px solid var(--border-cyber); padding: 1.25rem; border-radius: var(--radius-md); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Fee Payment Status</div>
          <div style="font-weight: 800; font-size: 1.1rem; margin-top: 0.4rem;" :style="{ color: (studentUser.feeStatus && studentUser.feeStatus.includes('Paid')) ? '#10b981' : '#f59e0b' }">
            {{ studentUser.feeStatus || 'Pending Verification' }}
          </div>
        </div>
      </div>

      <!-- EDIT & UPDATE STUDENT PROFILE FORM -->
      <div style="background: var(--bg-card-glass); border: 1px solid var(--border-cyber); padding: 2rem; border-radius: var(--radius-lg);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.75rem; border-bottom: 1px solid var(--border-cyber); padding-bottom: 1rem;">
          <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 800;">
            ✏️ Edit & Update Your Student Profile Details
          </h3>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Full Edit Access Enabled</span>
        </div>

        <form @submit.prevent="saveProfileUpdates" class="admission-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
            <div class="form-group">
              <label class="form-label">Full Candidate Name <span class="req">*</span></label>
              <input type="text" v-model="editForm.candidateName" required class="form-control">
            </div>

            <div class="form-group">
              <label class="form-label">Father's Name <span class="req">*</span></label>
              <input type="text" v-model="editForm.fatherName" required class="form-control">
            </div>

            <div class="form-group">
              <label class="form-label">Mother's Name <span class="req">*</span></label>
              <input type="text" v-model="editForm.motherName" required class="form-control">
            </div>

            <div class="form-group">
              <label class="form-label">Date of Birth (DOB) <span class="req">*</span></label>
              <input type="date" v-model="editForm.dob" required class="form-control">
            </div>

            <div class="form-group">
              <label class="form-label">Gender <span class="req">*</span></label>
              <select v-model="editForm.gender" class="form-control" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Contact Mobile Number <span class="req">*</span></label>
              <input type="tel" v-model="editForm.mobile" pattern="[0-9]{10}" required class="form-control">
            </div>

            <div class="form-group">
              <label class="form-label">Email Address <span class="req">*</span></label>
              <input type="email" v-model="editForm.email" required class="form-control">
            </div>

            <div class="form-group">
              <label class="form-label">District / City <span class="req">*</span></label>
              <input type="text" v-model="editForm.district" required class="form-control">
            </div>

            <div class="form-group full-width">
              <label class="form-label">Permanent Residential Address <span class="req">*</span></label>
              <textarea v-model="editForm.address" rows="3" required class="form-control"></textarea>
            </div>
          </div>

          <div style="margin-top: 1.75rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div v-if="successMsg" style="color: #10b981; font-weight: 700; font-size: 0.9rem;">
              ✓ {{ successMsg }}
            </div>
            <button type="submit" class="btn-primary" style="padding: 0.75rem 2rem; margin-left: auto;">
              <span>Save & Update Profile Details 💾</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- LOGGED OUT VIEW: Student Login & Signup Tabs -->
    <div v-else class="student-auth-wrap anim-stagger-1" style="max-width: 480px; margin: 0 auto; background: var(--bg-card-glass); border: 1px solid var(--border-cyber); padding: 2.25rem; border-radius: var(--radius-lg);">
      <!-- Auth Mode Switcher Tabs -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 2rem; background: rgba(0, 0, 0, 0.2); padding: 0.3rem; border-radius: var(--radius-full);">
        <button 
          class="nav-item-btn" 
          :class="{ active: authMode === 'login' }"
          @click="authMode = 'login'"
          style="width: 100%; justify-content: center;"
        >
          🔐 Student Login
        </button>
        <button 
          class="nav-item-btn" 
          :class="{ active: authMode === 'signup' }"
          @click="authMode = 'signup'"
          style="width: 100%; justify-content: center;"
        >
          ✨ New Student Signup
        </button>
      </div>

      <!-- Feedback Alert -->
      <div v-if="authError" class="login-error-alert" style="margin-bottom: 1.5rem; padding: 0.85rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: var(--radius-md); color: #ef4444; font-size: 0.875rem;">
        ⚠️ {{ authError }}
      </div>

      <!-- 1. STUDENT LOGIN FORM -->
      <form v-if="authMode === 'login'" @submit.prevent="handleStudentLogin">
        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label">Email Address <span class="req">*</span></label>
          <input type="email" v-model="loginEmail" required class="form-control" placeholder="student@example.com">
        </div>

        <div class="form-group" style="margin-bottom: 1.5rem;">
          <label class="form-label">Password <span class="req">*</span></label>
          <input type="password" v-model="loginPassword" required class="form-control" placeholder="Enter student password">
        </div>

        <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">
          <span>Sign In to Student Account 🚀</span>
        </button>
      </form>

      <!-- 2. STUDENT SIGNUP FORM -->
      <form v-else @submit.prevent="handleStudentSignup">
        <div class="form-group" style="margin-bottom: 1rem;">
          <label class="form-label">Candidate Full Name <span class="req">*</span></label>
          <input type="text" v-model="signupForm.candidateName" required class="form-control" placeholder="Your full legal name">
        </div>

        <div class="form-group" style="margin-bottom: 1rem;">
          <label class="form-label">Email Address <span class="req">*</span></label>
          <input type="email" v-model="signupForm.email" required class="form-control" placeholder="name@example.com">
        </div>

        <div class="form-group" style="margin-bottom: 1rem;">
          <label class="form-label">Mobile Number <span class="req">*</span></label>
          <input type="tel" v-model="signupForm.mobile" pattern="[0-9]{10}" required class="form-control" placeholder="10-digit mobile">
        </div>

        <div class="form-group" style="margin-bottom: 1rem;">
          <label class="form-label">Desired Program <span class="req">*</span></label>
          <select v-model="signupForm.course" class="form-control" required>
            <option value="3-Month MERN Stack Web Engineer">3-Month MERN Stack Web Engineer</option>
            <option value="6-Month Software & Cloud Masterclass">6-Month Software & Cloud Masterclass</option>
            <option value="NIELIT O/A Level Diploma">NIELIT O/A Level Diploma</option>
            <option value="Mobile App Engineering (Flutter/iOS)">Mobile App Engineering (Flutter/iOS)</option>
          </select>
        </div>

        <div class="form-group" style="margin-bottom: 1.5rem;">
          <label class="form-label">Create Password <span class="req">*</span></label>
          <input type="password" v-model="signupForm.password" required class="form-control" placeholder="At least 6 characters">
        </div>

        <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">
          <span>Register & Create Student Account 🎓</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';

const props = defineProps({
  content: { type: Object, required: true },
  studentUser: { type: Object, default: null }
});

const emit = defineEmits(['student-login', 'student-signup', 'update-student-profile', 'student-logout']);

const authMode = ref('login');
const authError = ref('');
const successMsg = ref('');

const loginEmail = ref('');
const loginPassword = ref('');

const signupForm = reactive({
  candidateName: '',
  email: '',
  mobile: '',
  course: '3-Month MERN Stack Web Engineer',
  password: ''
});

const editForm = reactive({
  candidateName: '',
  fatherName: '',
  motherName: '',
  dob: '',
  gender: 'Male',
  mobile: '',
  email: '',
  district: 'Prayagraj',
  address: '',
  course: ''
});

// Sync editForm with studentUser whenever studentUser changes
watch(() => props.studentUser, (newVal) => {
  if (newVal) {
    Object.assign(editForm, {
      candidateName: newVal.candidateName || '',
      fatherName: newVal.fatherName || '',
      motherName: newVal.motherName || '',
      dob: newVal.dob || '',
      gender: newVal.gender || 'Male',
      mobile: newVal.mobile || '',
      email: newVal.email || '',
      district: newVal.district || 'Prayagraj',
      address: newVal.address || '',
      course: newVal.course || ''
    });
  }
}, { immediate: true });

const handleStudentLogin = () => {
  authError.value = '';
  if (!loginEmail.value || !loginPassword.value) {
    authError.value = 'Please enter both email and password.';
    return;
  }
  emit('student-login', { email: loginEmail.value, password: loginPassword.value }, (err) => {
    if (err) authError.value = err;
  });
};

const handleStudentSignup = () => {
  authError.value = '';
  if (!signupForm.candidateName || !signupForm.email || !signupForm.password) {
    authError.value = 'Please complete all required fields.';
    return;
  }
  emit('student-signup', { ...signupForm }, (err) => {
    if (err) authError.value = err;
  });
};

const saveProfileUpdates = () => {
  successMsg.value = '';
  emit('update-student-profile', { ...editForm });
  successMsg.value = 'Your profile information has been successfully updated!';
  setTimeout(() => { successMsg.value = ''; }, 4000);
};

const handleLogout = () => {
  emit('student-logout');
};
</script>
