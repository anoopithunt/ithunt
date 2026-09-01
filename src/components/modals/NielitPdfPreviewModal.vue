<template>
  <div class="modal-overlay secure-preview-overlay" @click.self="$emit('close')">
    <div class="modal-card secure-preview-card" :class="{ 'blurred-protection': isBlurred }">
      
      <!-- Security Watermark Ribbon Bar -->
      <div class="security-banner">
        <div class="security-banner-info">
          <span class="security-lock-icon">🔒</span>
          <div>
            <strong>SECURE NIELIT PREVIEW (READ ONLY)</strong>
            <div class="security-subtext">Confidential Document. Downloads & screen captures are disabled. Submitted to Admin.</div>
          </div>
        </div>

        <!-- Page Jump Navigation Capsule -->
        <div class="page-nav-capsule">
          <button 
            v-for="p in 4" 
            :key="p" 
            class="page-nav-btn" 
            :class="{ active: currentPage === p }"
            @click="scrollToPage(p)"
          >
            P{{ p }}
          </button>
        </div>

        <button class="modal-close-btn" @click="$emit('close')" title="Close Preview">✕</button>
      </div>

      <!-- 4 Pages Scrollable Viewport -->
      <div class="secure-pages-scroll-viewport" ref="scrollContainer" @scroll="handleScroll" @contextmenu.prevent>
        
        <!-- Page 1 Container (Annexure II) -->
        <div class="page-section-header" id="page-sec-1">PAGE 1 OF 4 — ANNEXURE II</div>
        <div class="secure-page-wrapper portrait-page">
          <canvas ref="canvasPage1" class="secure-pdf-canvas"></canvas>
        </div>

        <!-- Page 2 Container (Annexure III) -->
        <div class="page-section-header" id="page-sec-2">PAGE 2 OF 4 — ANNEXURE III (COVERING LETTER)</div>
        <div class="secure-page-wrapper portrait-page">
          <canvas ref="canvasPage2" class="secure-pdf-canvas"></canvas>
        </div>

        <!-- Page 3 Container (Completion Certificate) -->
        <div class="page-section-header" id="page-sec-3">PAGE 3 OF 4 — PROJECT COMPLETION CERTIFICATE</div>
        <div class="secure-page-wrapper portrait-page">
          <canvas ref="canvasPage3" class="secure-pdf-canvas"></canvas>
        </div>

        <!-- Page 4 Container (Project Fee Details Landscape) -->
        <div class="page-section-header" id="page-sec-4">PAGE 4 OF 4 — PROJECT FEE DETAILS (NIELIT HQ)</div>
        <div class="secure-page-wrapper landscape-page">
          <canvas ref="canvasPage4" class="secure-pdf-canvas"></canvas>
        </div>
      </div>

      <!-- Footer Action Bar -->
      <div class="secure-preview-footer">
        <div class="security-status-lbl">
          <span>✓ Transmitted to Admin (softtechithunt@gmail.com)</span>
        </div>
        <button class="btn-primary" @click="$emit('close')">
          <span>Done & Close Preview ✕</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { formatNielitDate } from '../../utils/nielitPdfGenerator.js';

const props = defineProps({
  projectData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);

const scrollContainer = ref(null);
const canvasPage1 = ref(null);
const canvasPage2 = ref(null);
const canvasPage3 = ref(null);
const canvasPage4 = ref(null);

const currentPage = ref(1);
const isBlurred = ref(false);

const scrollToPage = (pNum) => {
  currentPage.value = pNum;
  const target = document.getElementById(`page-sec-${pNum}`);
  if (target && scrollContainer.value) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const handleScroll = () => {
  if (!scrollContainer.value) return;
  const scrollTop = scrollContainer.value.scrollTop;
  const viewportH = scrollContainer.value.clientHeight;
  const pageIndex = Math.min(4, Math.max(1, Math.round(scrollTop / (viewportH * 0.8)) + 1));
  currentPage.value = pageIndex;
};

const drawSecurityWatermark = (ctx, width, height) => {
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate((-25 * Math.PI) / 180);
  ctx.font = '900 24px sans-serif';
  ctx.fillStyle = 'rgba(220, 38, 38, 0.12)';
  ctx.textAlign = 'center';
  
  ctx.fillText('CONFIDENTIAL • FOR ADMIN VERIFICATION ONLY', 0, -220);
  ctx.fillText('CONFIDENTIAL • FOR ADMIN VERIFICATION ONLY', 0, 0);
  ctx.fillText('CONFIDENTIAL • FOR ADMIN VERIFICATION ONLY', 0, 220);
  ctx.restore();
};

const renderPage1 = () => {
  const canvas = canvasPage1.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = 794;
  canvas.height = 1123;
  
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const d = props.projectData || {};
  const candName = (d.candidateName || 'Candidate Name').toUpperCase();
  const regNo = d.nielitRegNo || '1110423';
  const level = d.nielitLevel || 'A';
  const projectTitle = d.projectTitle || 'Network Monitoring and Management';
  const guideName = d.guideName || 'Sushil Kumar';
  const guideDesignation = d.guideDesignation || 'Sr. Laravel Developer';
  const guidePlace = d.guidePlace || 'Prayagraj';
  const guideAddress = d.guideAddress || 'Prayagraj Uttar Pradesh';
  const projectDate = formatNielitDate(d.projectDate || '18/07/2026');

  ctx.fillStyle = '#000000';

  // Top Right Header
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('Annexure – II', 734, 70);

  // Main Header
  ctx.textAlign = 'center';
  ctx.font = 'bold 19px sans-serif';
  ctx.fillText('PERFORMA FOR A / B / C Level PROJECT CERTIFICATE', 397, 120);
  ctx.fillText('FROM PROJECT GUIDE /ACCREDITED INSTITUTE', 397, 152);
  ctx.font = 'normal 16px sans-serif';
  ctx.fillText('[For Direct as well as candidate from Accredited Institute]', 397, 184);

  // Body Paragraph
  ctx.textAlign = 'left';
  ctx.font = 'normal 17px sans-serif';
  
  const p1Text = `This is to certify that the Project / Dissertation entitled "${projectTitle}" a bonafide work done by Mr. / Ms. ${candName} (NIELIT Registration No: ${regNo}) in partial fulfilment of ${level} Level / B Level / C Level examination and has been carried out under my direct supervision and guidance. This report or a similar report on the topic has not been submitted for any other examination and does not form a part of any other course undergone by the candidate.`;
  
  let words = p1Text.split(' ');
  let line = '';
  let y = 250;
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    if (metrics.width > 650 && n > 0) {
      ctx.fillText(line, 60, y);
      line = words[n] + ' ';
      y += 32;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 60, y);

  // Signature Block
  y += 80;
  ctx.beginPath();
  ctx.moveTo(60, y);
  ctx.lineTo(320, y);
  ctx.lineWidth = 2;
  ctx.stroke();

  y += 30;
  ctx.font = 'normal 17px sans-serif';
  ctx.fillText('Signature of Guide / Supervisor', 60, y);
  
  y += 55;
  ctx.font = 'bold 17px sans-serif';
  ctx.fillText(`Name: ${guideName}`, 60, y);

  y += 45;
  ctx.font = 'normal 17px sans-serif';
  ctx.fillText(`Place: ${guidePlace}`, 60, y);

  y += 45;
  ctx.fillText(`Designation: ${guideDesignation}`, 60, y);

  y += 45;
  ctx.fillText(`Date: ${projectDate}`, 60, y);

  y += 45;
  ctx.fillText(`Address: ${guideAddress}`, 60, y);

  y += 65;
  ctx.font = 'bold 17px sans-serif';
  ctx.fillText('Signature of Center Manager', 60, y);
  y += 30;
  ctx.font = 'normal 15px sans-serif';
  ctx.fillText('[in case of a candidate from Accredited Institute]', 60, y);

  drawSecurityWatermark(ctx, canvas.width, canvas.height);
};

const renderPage2 = () => {
  const canvas = canvasPage2.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = 794;
  canvas.height = 1123;
  
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const d = props.projectData || {};
  const candName = (d.candidateName || 'Candidate Name').toUpperCase();
  const fatherName = d.fatherName || 'Father Name';
  const regNo = d.nielitRegNo || '1110423';
  const level = d.nielitLevel || 'A';
  const address = d.address || 'Kunda Pratapgarh ';
  const district = d.district || 'Kunda';
  const state = d.state || 'Uttar Pradesh';
  const pin = d.pin || '230129';
  const mobile = d.mobile || '9795771806';
  const email = (d.email || 'anupcodemaya@gmail.com').toUpperCase();

  ctx.fillStyle = '#000000';

  // Top Right
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('Annexure- |||', 734, 70);

  // Title
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('PERFORMA OF COVERING LETTER TO THE PROJECT REPORT', 397, 120);
  ctx.beginPath();
  ctx.moveTo(110, 126);
  ctx.lineTo(684, 126);
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Recipient
  ctx.textAlign = 'left';
  ctx.font = 'bold 17px sans-serif';
  let y = 175;
  ctx.fillText('Controller of Examinations,', 60, y); y += 30;
  ctx.fillText('NIELIT,', 60, y); y += 30;
  ctx.fillText('PlotNo.3,PSP Pocket', 60, y); y += 30;
  ctx.fillText('Dwarka, Sector-8', 60, y); y += 30;
  ctx.fillText('New Delhi – 110077', 60, y); y += 45;

  ctx.fillText('Sir,', 60, y); y += 30;
  ctx.font = 'normal 17px sans-serif';
  ctx.fillText(`I am submitting my ${level} level Project for evaluation. Details of my Registration and postal`, 60, y); y += 30;
  ctx.fillText('address, etc is as under:', 60, y); y += 45;

  ctx.font = 'bold 17px sans-serif';
  ctx.fillText(`Regn.No: ${regNo}`, 60, y); y += 40;
  ctx.fillText(`Level - ${level}`, 60, y); y += 40;
  ctx.fillText(`Name: Mr. ${candName}`, 60, y); y += 40;
  ctx.fillText(`Father’s Name: Mr. ${fatherName}`, 60, y); y += 40;
  
  ctx.fillText('Address:', 60, y); y += 32;
  ctx.fillText(`(a)Residential Address :- ${address}`, 60, y); y += 32;
  ctx.fillText(`District:- ${district},`, 60, y); y += 32;
  ctx.fillText(`State:- ${state}, Pin:- ${pin}`, 60, y); y += 40;

  ctx.fillText(`Mob No: ${mobile}`, 60, y); y += 35;
  ctx.fillText('Tele No: __________________________________________________', 60, y); y += 22;
  ctx.font = 'normal 14px sans-serif';
  ctx.fillText('(Country code) (City code) (Telephone number)', 130, y); y += 35;

  ctx.font = 'bold 17px sans-serif';
  ctx.fillText('(b) Office Address:', 60, y); y += 30;
  ctx.fillText('__________________________________________________', 60, y); y += 35;
  ctx.fillText('Tele No: __________________________________________________', 60, y); y += 22;
  ctx.font = 'normal 14px sans-serif';
  ctx.fillText('(Country code) (City code) (Telephone number)', 130, y); y += 35;

  ctx.font = 'bold 17px sans-serif';
  ctx.fillText('Fax: __________________________________________________', 60, y); y += 22;
  ctx.font = 'normal 14px sans-serif';
  ctx.fillText('(Country code) (City code) (Telephone number)', 130, y); y += 40;

  ctx.font = 'bold 17px sans-serif';
  ctx.fillText('E-mail Address (Please in block letters only): ', 60, y);
  ctx.fillStyle = '#0000ff';
  ctx.fillText(email, 430, y);

  drawSecurityWatermark(ctx, canvas.width, canvas.height);
};

const renderPage3 = () => {
  const canvas = canvasPage3.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = 794;
  canvas.height = 1123;
  
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const d = props.projectData || {};
  const candName = (d.candidateName || 'Candidate Name').toUpperCase();
  const regNo = d.nielitRegNo || '1110423';
  const level = d.nielitLevel || 'A';
  const projectTitle = d.projectTitle || 'Network Monitoring and Management';
  const guideName = d.guideName || 'Sushil Kumar';
  const guideQualification = d.guideQualification || 'MCA';
  const paymentDate = formatNielitDate(d.paymentDate || '25-Mar-2026');
  const utrNumber = d.utrNumber || 'CHD550W1FMSF1B';
  const accountHolderName = d.accountHolderName || candName;

  ctx.fillStyle = '#000000';

  // Title
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('Proforma of the Project Completion Certificate', 397, 90);
  ctx.beginPath();
  ctx.moveTo(190, 96);
  ctx.lineTo(604, 96);
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Paragraph 1
  ctx.textAlign = 'left';
  ctx.font = 'normal 16px sans-serif';
  const p1 = `This is to certify that the Project work done at "${projectTitle}" By Mr./Ms. ${candName}(NIELIT Registration No.${regNo}) in partial fulfillment of NIELIT '${level}' Level Examination has been found satisfactory. This report has not been submitted for any other examination and does not form part of any other course undergone by the candidate.`;
  
  let words = p1.split(' ');
  let line = '';
  let y = 145;
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    if (metrics.width > 650 && n > 0) {
      ctx.fillText(line, 60, y);
      line = words[n] + ' ';
      y += 30;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 60, y); y += 45;

  const p2 = `It is further certifies that he/she has appeared in all the four modules of NIELIT '${level}' level Examination.`;
  ctx.fillText(p2, 60, y); y += 65;

  ctx.fillText('Signature', 60, y); y += 40;
  ctx.fillText('Name:', 60, y); y += 30;
  ctx.fillText('(Institute PROV No./FULL No.) (or)', 60, y); y += 30;
  ctx.fillText('Head of the Organization/Division:', 60, y); y += 30;
  ctx.fillText('Name of the Organization:', 60, y); y += 30;
  ctx.fillText('Address:', 60, y); y += 30;
  ctx.fillText('(or)', 60, y); y += 35;

  ctx.font = 'bold 17px sans-serif';
  ctx.fillText(`Name of the Guide/Supervisor: ${guideName}`, 60, y); y += 35;
  ctx.fillText(`Qualification: ${guideQualification}`, 60, y); y += 30;
  ctx.font = 'normal 14px sans-serif';
  ctx.fillText('(Self attested copy of the qualification of the guide/Supervisor to be attached)', 60, y); y += 60;

  ctx.font = 'bold 17px sans-serif';
  ctx.fillText('Fees Details: -', 60, y); y += 40;

  // Table
  const tblX = 60;
  const tblW = 674;
  const colW1 = 190;
  const colW2 = 230;
  
  ctx.lineWidth = 1;
  ctx.strokeRect(tblX, y, tblW, 45);
  ctx.strokeRect(tblX, y + 45, tblW, 45);

  ctx.beginPath();
  ctx.moveTo(tblX + colW1, y);
  ctx.lineTo(tblX + colW1, y + 90);
  ctx.moveTo(tblX + colW1 + colW2, y);
  ctx.lineTo(tblX + colW1 + colW2, y + 90);
  ctx.stroke();

  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Payment Date', tblX + 15, y + 28);
  ctx.fillText('UTR Number', tblX + colW1 + 15, y + 28);
  ctx.fillText('Account Holder Name', tblX + colW1 + colW2 + 15, y + 28);

  ctx.font = 'normal 16px sans-serif';
  ctx.fillText(paymentDate, tblX + 15, y + 73);
  ctx.fillText(utrNumber, tblX + colW1 + 15, y + 73);
  ctx.fillText(accountHolderName, tblX + colW1 + colW2 + 15, y + 73);

  drawSecurityWatermark(ctx, canvas.width, canvas.height);
};

const renderPage4 = () => {
  const canvas = canvasPage4.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = 1123;
  canvas.height = 794;
  
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const d = props.projectData || {};
  const candName = (d.candidateName || 'Candidate Name').toUpperCase();
  const regNo = d.nielitRegNo || '1110423';
  const level = d.nielitLevel || 'A';
  const amount = d.amount || '1000';
  const paymentDate = formatNielitDate(d.paymentDate || '25-Mar-2026');
  const utrNumber = d.utrNumber || 'CHD550W1FMSF1B';
  const accountHolderName = d.accountHolderName || candName;
  const remark = d.paymentRemark || 'Paid';

  ctx.fillStyle = '#000000';
  ctx.lineWidth = 1.5;

  const tblX = 40;
  const tblY = 180;
  const tblW = 1043;
  const r1H = 65;
  const r2H = 65;
  const r3H = 70;
  const r4H = 70;
  const r5H = 70;

  ctx.strokeRect(tblX, tblY, tblW, r1H + r2H + r3H + r4H + r5H);

  // Row 1 Title
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('O/A/B/C Project Fee Details', 561, tblY + 40);
  ctx.beginPath();
  ctx.moveTo(tblX, tblY + r1H);
  ctx.lineTo(tblX + tblW, tblY + r1H);
  ctx.stroke();

  // Row 2 Subtitle
  let curY = tblY + r1H;
  ctx.fillText('NIELIT HQ,NEW DELHI', 561, curY + 40);
  ctx.beginPath();
  ctx.moveTo(tblX, curY + r2H);
  ctx.lineTo(tblX + tblW, curY + r2H);
  ctx.stroke();

  // Row 3 Section Headers
  curY += r2H;
  const colWidths = [55, 105, 215, 65, 75, 135, 190, 165, 68];
  const candW = colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3]; // 440px

  ctx.font = 'bold 19px sans-serif';
  ctx.fillText('Candidate Details', tblX + (candW / 2), curY + 42);
  ctx.fillText('Payment Details', tblX + candW + ((tblW - candW) / 2), curY + 42);

  ctx.beginPath();
  ctx.moveTo(tblX + candW, curY);
  ctx.lineTo(tblX + candW, curY + r3H + r4H + r5H);
  ctx.moveTo(tblX, curY + r3H);
  ctx.lineTo(tblX + tblW, curY + r3H);
  ctx.stroke();

  // Row 4 Column Headers
  curY += r3H;
  ctx.font = 'bold 16px sans-serif';
  const headers = [
    'S. No.', 'Regn. No.', 'Name of Cand.', 'Level', 
    'Amount', 'Transaction Date', 'Transaction No/UTR', 'Payment Sender Name', 'Remark'
  ];

  let currX = tblX;
  for (let i = 0; i < headers.length; i++) {
    const w = colWidths[i];
    if (i > 0) {
      ctx.beginPath();
      ctx.moveTo(currX, curY);
      ctx.lineTo(currX, curY + r4H + r5H);
      ctx.stroke();
    }
    ctx.fillText(headers[i], currX + (w / 2), curY + 42);
    currX += w;
  }

  ctx.beginPath();
  ctx.moveTo(tblX, curY + r4H);
  ctx.lineTo(tblX + tblW, curY + r4H);
  ctx.stroke();

  // Row 5 Data Values
  curY += r4H;
  ctx.font = 'normal 16px sans-serif';
  const values = [
    '1.', regNo, `Mr. ${candName}`, level, 
    amount, paymentDate, utrNumber, accountHolderName, remark
  ];

  currX = tblX;
  for (let i = 0; i < values.length; i++) {
    const w = colWidths[i];
    ctx.fillText(String(values[i]), currX + (w / 2), curY + 42);
    currX += w;
  }

  drawSecurityWatermark(ctx, canvas.width, canvas.height);
};

// Key & Shortcut Protection Logic
const preventProtectionKey = (e) => {
  if (
    e.key === 'PrintScreen' ||
    ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S')) ||
    ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 's' || e.key === 'S' || e.key === '3' || e.key === '4'))
  ) {
    e.preventDefault();
    e.stopPropagation();
    isBlurred.value = true;
    setTimeout(() => {
      isBlurred.value = false;
    }, 2500);
    return false;
  }
};

const handleWindowBlur = () => {
  isBlurred.value = true;
};

const handleWindowFocus = () => {
  isBlurred.value = false;
};

onMounted(() => {
  renderPage1();
  renderPage2();
  renderPage3();
  renderPage4();

  window.addEventListener('keydown', preventProtectionKey);
  window.addEventListener('keyup', preventProtectionKey);
  window.addEventListener('blur', handleWindowBlur);
  window.addEventListener('focus', handleWindowFocus);
});

onUnmounted(() => {
  window.removeEventListener('keydown', preventProtectionKey);
  window.removeEventListener('keyup', preventProtectionKey);
  window.removeEventListener('blur', handleWindowBlur);
  window.removeEventListener('focus', handleWindowFocus);
});
</script>

<style scoped>
.secure-preview-overlay {
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
}

.secure-preview-card {
  width: 96vw;
  max-width: 1050px;
  height: 94vh;
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  transition: filter 0.3s ease;
}

.secure-preview-card.blurred-protection {
  filter: blur(30px) opacity(0.1);
}

.security-banner {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.85rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.security-banner-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #f8fafc;
}

.security-lock-icon {
  font-size: 1.5rem;
}

.security-subtext {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 0.15rem;
}

.page-nav-capsule {
  display: flex;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  padding: 0.25rem;
  gap: 0.35rem;
}

.page-nav-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-nav-btn.active, .page-nav-btn:hover {
  background: #f97316;
  color: #ffffff;
  box-shadow: 0 0 10px rgba(249, 115, 22, 0.4);
}

.secure-pages-scroll-viewport {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: #020617;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.page-section-header {
  background: rgba(249, 115, 22, 0.15);
  color: #f97316;
  border: 1px solid rgba(249, 115, 22, 0.35);
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.secure-page-wrapper {
  background: #ffffff;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  pointer-events: none;
}

.secure-page-wrapper.portrait-page {
  width: 100%;
  max-width: 794px;
}

.secure-page-wrapper.landscape-page {
  width: 100%;
  max-width: 980px;
}

.secure-pdf-canvas {
  width: 100%;
  height: auto;
  display: block;
  pointer-events: none;
  -webkit-user-drag: none;
}

.secure-preview-footer {
  background: #0f172a;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.85rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.security-status-lbl {
  color: #34d399;
  font-size: 0.85rem;
  font-weight: 700;
}

@media print {
  body {
    display: none !important;
  }
}

@media (max-width: 640px) {
  .security-banner {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .page-nav-capsule {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
