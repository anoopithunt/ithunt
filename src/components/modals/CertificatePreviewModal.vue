<template>
  <div class="cert-modal-backdrop" @click.self="$emit('close')">
    <div class="cert-modal-wrapper" :class="{ 'is-experience': certData.type === 'experience' }">
      <!-- Modal Header Bar -->
      <div class="cert-modal-header">
        <div class="cert-header-title-box">
          <span class="cert-type-icon">{{ certData.type === 'experience' ? '💼' : '🎓' }}</span>
          <div>
            <div class="cert-modal-title">
              {{ certData.type === 'experience' ? 'Official Experience & Internship Certificate' : 'Official Course Completion Certificate' }}
            </div>
            <div class="cert-modal-sub">
              ID: <span class="cert-mono-id">{{ certData.certNo }}</span> • Status: <span class="cert-status-tag">✓ Verified & Registered</span>
            </div>
          </div>
        </div>

        <div class="cert-modal-header-actions">
          <!-- Zoom & Fit Controls -->
          <div class="cert-zoom-toolbar">
            <button 
              class="cert-zoom-btn fit-btn" 
              :class="{ 'is-active': isFitToPage }" 
              @click="toggleFitToPage" 
              title="Fit full certificate on screen"
            >
              <span>🔍 Fit Page</span>
            </button>
            <div class="cert-zoom-group">
              <button class="cert-zoom-btn" @click="zoomOut" title="Zoom Out (−)" :disabled="zoomLevel <= 0.45">
                <span>−</span>
              </button>
              <button class="cert-zoom-val" @click="resetZoom100" title="Click for 100% scale">
                {{ Math.round(zoomLevel * 100) }}%
              </button>
              <button class="cert-zoom-btn" @click="zoomIn" title="Zoom In (+)" :disabled="zoomLevel >= 1.6">
                <span>+</span>
              </button>
            </div>
          </div>

          <button class="cert-action-btn primary" @click="handleDownloadPdf" :title="'Download Official PDF'">
            <span>📜 Download PDF</span>
          </button>
          <button class="cert-action-btn print" @click="handlePrint" :title="'Print Certificate'">
            <span>🖨️ Print</span>
          </button>
          <button class="cert-action-btn secondary" @click="copyVerificationUrl" :title="'Copy Verification Link'">
            <span>{{ copied ? '✓ Copied!' : '🔗 Copy Link' }}</span>
          </button>
          <button class="cert-close-btn" @click="$emit('close')" aria-label="Close Preview Modal">✕</button>
        </div>
      </div>

      <!-- Modal Body Preview Container -->
      <div class="cert-modal-body" ref="viewportRef">
        <div 
          class="cert-scaler-wrapper" 
          :style="{ 
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            marginBottom: scalerMarginBottom
          }"
        >
          <!-- 1. COURSE CERTIFICATE VISUAL CARD (Landscape aesthetic) -->
          <div v-if="certData.type !== 'experience'" class="course-cert-paper" id="printable-certificate" ref="paperRef">
            <div class="course-cert-border-outer">
              <div class="course-cert-border-inner">
              <!-- Corner Ornaments -->
              <div class="corner-ornament top-left"></div>
              <div class="corner-ornament top-right"></div>
              <div class="corner-ornament bottom-left"></div>
              <div class="corner-ornament bottom-right"></div>

              <!-- Top Branding Header -->
              <div class="cert-brand-header">
                <div class="cert-brand-logo-text">IT HUNT</div>
                <div class="cert-brand-sub">SOFTWARE SOLUTIONS & ADVANCED TECHNOLOGY ACADEMY</div>
                <div class="cert-brand-accreditation">
                  AN ISO 9001:2015 CERTIFIED INSTITUTION • GOVT. REGISTERED MSME (UDYAM-UP-50-001289)
                </div>
                <div class="cert-divider-line"></div>
              </div>

              <!-- Certificate Title -->
              <div class="cert-award-heading">
                <h2 class="cert-main-heading">CERTIFICATE OF COURSE COMPLETION</h2>
                <div class="cert-award-sub">PROUDLY AWARDED FOR ACADEMIC & PRACTICAL EXCELLENCE</div>
              </div>

              <!-- Recipient -->
              <div class="cert-recipient-section">
                <div class="cert-presented-text">This is to certify that</div>
                <div class="cert-recipient-name">{{ (certData.studentName || certData.candidateName || 'Candidate Name').toUpperCase() }}</div>
                <div class="cert-name-underline"></div>
              </div>

              <!-- Course Details -->
              <div class="cert-details-section">
                <p class="cert-completion-desc">
                  has successfully completed the comprehensive, production-grade training curriculum in
                </p>
                <div class="cert-course-title">{{ certData.course || certData.courseName || 'Full Stack MERN Stack & Cloud Engineering' }}</div>
                <div class="cert-meta-ribbon">
                  <span><strong>Duration:</strong> {{ certData.duration || '6 Months' }}</span>
                  <span class="ribbon-sep">•</span>
                  <span><strong>Performance:</strong> {{ certData.grade || 'Grade A+ (Distinction)' }}</span>
                </div>
              </div>

              <!-- Bottom Row: QR, Stamp & Signatures -->
              <div class="cert-bottom-row">
                <!-- QR Code Box (Real Scannable QR Code) -->
                <div class="cert-qr-box" @click="handleOpenVerifyUrl" title="Click to verify online in browser" style="cursor: pointer;">
                  <div class="qr-real-wrapper">
                    <img v-if="qrCodeDataUrl" :src="qrCodeDataUrl" alt="Scan to Verify Certificate" class="cert-qr-real-img" />
                    <div v-else class="qr-loading-box">Generating...</div>
                  </div>
                  <div class="qr-label">SCAN TO VERIFY 🔍</div>
                  <div class="qr-id">ID: {{ certData.certNo }}</div>
                </div>

                <!-- Center Official Seal -->
                <div class="cert-seal-box">
                  <div class="official-gold-seal">
                    <div class="seal-inner-ring">
                      <div class="seal-star">★</div>
                      <div class="seal-text-center">VERIFIED</div>
                      <div class="seal-sub">ISO 9001:2015</div>
                    </div>
                  </div>
                </div>

                <!-- Signatures -->
                <div class="cert-signatures-box">
                  <div class="sig-column">
                    <div class="signature-ink">Lakshman S. Chauhan</div>
                    <div class="sig-line"></div>
                    <div class="sig-name">Er. Lakshman Singh Chauhan</div>
                    <div class="sig-role">Director & Founder, IT HUNT</div>
                  </div>
                  <div class="sig-column">
                    <div class="signature-ink">Sushil Kumar</div>
                    <div class="sig-line"></div>
                    <div class="sig-name">Er. Sushil Kumar</div>
                    <div class="sig-role">Lead Mentor & Academic Head</div>
                  </div>
                </div>
              </div>

              <div class="cert-footer-disclaimer">
                This digital credential is cryptographically registered and verifiable worldwide on the official IT HUNT portal.
              </div>
            </div>
          </div>
        </div>

        <!-- 2. EXPERIENCE CERTIFICATE VISUAL LETTER (Portrait aesthetic) -->
        <div v-else class="exp-cert-paper" id="printable-certificate" ref="paperRef">
          <div class="exp-cert-border-outer">
            <!-- Corporate Letterhead Header -->
            <div class="exp-letterhead-header">
              <div class="exp-header-brand-row">
                <div>
                  <div class="exp-brand-title">IT <span class="exp-brand-highlight">HUNT</span></div>
                  <div class="exp-brand-sub">SOFTWARE SOLUTIONS & TECH ACADEMY</div>
                </div>
                <div class="exp-header-badge">
                  <div class="badge-iso">ISO 9001:2015 ACCREDITED</div>
                  <div class="badge-msme">MSME: UDYAM-UP-50-001289</div>
                </div>
              </div>
              <div class="exp-header-address">
                <div>📍 Campus & Registered Office: Holagarh, Prayagraj, Uttar Pradesh - 212503</div>
                <div>🌐 www.ithunt.in | 📧 contact@ithunt.in | 📞 +91 9795771806</div>
              </div>
              <div class="exp-header-divider"></div>
            </div>

            <!-- Ref & Date Meta Bar -->
            <div class="exp-ref-bar">
              <div><strong>REF NO:</strong> {{ certData.certNo }}</div>
              <div><strong>DATE OF ISSUANCE:</strong> {{ certData.issueDate || new Date().toLocaleDateString('en-GB') }}</div>
            </div>

            <!-- Letter Title -->
            <div class="exp-letter-title-section">
              <h2 class="exp-letter-title">EXPERIENCE CERTIFICATE</h2>
              <div class="exp-letter-subtitle">TO WHOMSOEVER IT MAY CONCERN</div>
            </div>

            <!-- Letter Body Paragraphs -->
            <div class="exp-letter-body">
              <p>
                This is to certify that <strong>Mr. / Ms. {{ (certData.studentName || certData.candidateName || 'Candidate Name').trim() }}</strong> 
                has successfully completed their software engineering tenure / internship with <strong>IT HUNT Software Solutions</strong> 
                serving in the capacity of <strong>"{{ certData.role || certData.designation || 'Software Engineering Intern' }}"</strong> 
                in the <strong>{{ certData.department || 'Software Solutions & Cloud Architecture' }}</strong> department from 
                <strong>{{ certData.startDate || '01/09/2025' }}</strong> to <strong>{{ certData.endDate || '28/02/2026' }}</strong> 
                (Tenure Duration: <strong>{{ certData.duration || '6 Months' }}</strong>).
              </p>

              <p>
                During their tenure with us, {{ (certData.studentName || certData.candidateName || 'Candidate Name').trim() }} was actively engaged in 
                production-grade software development, system design, and engineering delivery. They demonstrated commendable practical command across 
                modern web & cloud technologies including <strong>{{ certData.technologies || 'React.js, Node.js, Express, MongoDB, REST APIs, Git & Cloud Hosting' }}</strong>.
              </p>

              <p>
                Their professional conduct, problem-solving mindset, and dedication to high code quality and architectural integrity were evaluated as 
                <strong>"{{ certData.performance || certData.grade || 'Outstanding and Highly Commended' }}"</strong>. 
                They exhibited remarkable teamwork, punctuality, and an exemplary work ethic throughout their engagement.
              </p>

              <p>
                We appreciate their sincere contributions to our software development division and take pride in their technical accomplishments. 
                We strongly recommend them for upcoming software engineering and technology opportunities and wish them outstanding success in all their future career pursuits.
              </p>
            </div>

            <!-- Verification & Corporate Signature Section -->
            <div class="exp-bottom-section">
              <!-- QR Verification Box -->
              <div class="exp-qr-container">
                <div class="exp-qr-box" @click="handleOpenVerifyUrl" title="Click to verify online in browser" style="cursor: pointer;">
                  <img v-if="qrCodeDataUrl" :src="qrCodeDataUrl" alt="Scan to Verify Experience Certificate" class="exp-qr-real-img" />
                  <div v-else class="qr-loading-box">Generating...</div>
                </div>
                <div class="exp-qr-info">
                  <div class="exp-qr-title">OFFICIAL VERIFICATION QR</div>
                  <div class="exp-qr-sub">Scan to verify document authenticity online in the official IT HUNT registry.</div>
                  <div class="exp-qr-link">{{ certData.certNo }}</div>
                </div>
              </div>

              <!-- Official Seal & Signatory -->
              <div class="exp-signatory-box">
                <div class="exp-corporate-stamp">
                  <div class="stamp-border">
                    <div class="stamp-inner">
                      <div class="stamp-company">IT HUNT SOFTWARE</div>
                      <div class="stamp-mid">AUTHORIZED</div>
                      <div class="stamp-loc">PRAYAGRAJ, UP</div>
                    </div>
                  </div>
                </div>

                <div class="exp-signature-block">
                  <div class="for-company">For IT HUNT SOFTWARE SOLUTIONS</div>
                  <div class="exp-sig-script">Lakshman S. Chauhan</div>
                  <div class="exp-sig-line"></div>
                  <div class="exp-sig-name">Er. Lakshman Singh Chauhan</div>
                  <div class="exp-sig-designation">Director & Founder</div>
                </div>
              </div>
            </div>

            <!-- Footer Disclaimer -->
            <div class="exp-footer-note">
              This is an official document of IT HUNT Software Solutions. Any alteration or tampering voids validity.
            </div>
          </div>
        </div>
        </div>
      </div>

      <!-- Modal Bottom Actions Bar -->
      <div class="cert-modal-footer">
        <div class="footer-hint">
          💡 Click <strong>Download PDF</strong> to get a high-resolution vector PDF ready for sharing on LinkedIn, resumes, or print.
        </div>
        <div class="footer-actions">
          <button class="cert-action-btn secondary" @click="$emit('close')">
            Close Preview
          </button>
          <button class="cert-action-btn primary" @click="handleDownloadPdf">
            <span>Download Official PDF 📜</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted, nextTick } from 'vue';
import QRCode from 'qrcode';
import { generateCourseCertificatePdf, generateExperienceCertificatePdf } from '../../utils/certificatePdfGenerator.js';

const props = defineProps({
  certData: {
    type: Object,
    required: true
  }
});

defineEmits(['close']);

const copied = ref(false);
const qrCodeDataUrl = ref('');
const viewportRef = ref(null);
const paperRef = ref(null);
const zoomLevel = ref(1);
const isFitToPage = ref(true);
const paperHeight = ref(780);
let resizeObserver = null;

const scalerMarginBottom = computed(() => {
  if (!paperHeight.value) return '0px';
  const diff = paperHeight.value * (zoomLevel.value - 1);
  return `${Math.round(diff)}px`;
});

const calculateFitZoom = () => {
  if (!viewportRef.value || !paperRef.value) return;

  const vpHeight = viewportRef.value.clientHeight - 32;
  const vpWidth = viewportRef.value.clientWidth - 32;
  const pHeight = paperRef.value.offsetHeight;
  const pWidth = paperRef.value.offsetWidth;

  if (pHeight <= 0 || pWidth <= 0 || vpHeight <= 0 || vpWidth <= 0) return;

  paperHeight.value = pHeight;

  const scaleY = vpHeight / pHeight;
  const scaleX = vpWidth / pWidth;
  const fitScale = Math.min(scaleX, scaleY);

  // In Fit Mode, scale down if needed (capped at 1.0, minimum 0.40)
  const finalScale = Math.min(1.0, Math.max(0.40, fitScale));
  zoomLevel.value = Number(finalScale.toFixed(2));
};

const toggleFitToPage = () => {
  if (isFitToPage.value) {
    isFitToPage.value = false;
    zoomLevel.value = 1.0;
  } else {
    isFitToPage.value = true;
    calculateFitZoom();
  }
};

const resetZoom100 = () => {
  isFitToPage.value = false;
  zoomLevel.value = 1.0;
};

const zoomIn = () => {
  isFitToPage.value = false;
  zoomLevel.value = Math.min(1.6, Number((zoomLevel.value + 0.1).toFixed(2)));
};

const zoomOut = () => {
  isFitToPage.value = false;
  zoomLevel.value = Math.max(0.4, Number((zoomLevel.value - 0.1).toFixed(2)));
};

const handleWindowResize = () => {
  if (isFitToPage.value) {
    calculateFitZoom();
  }
};

const getVerifyUrl = () => {
  const certId = props.certData?.certNo || props.certData?.certificateNumber || 'ITH-CERT-2026';
  if (props.certData?.verificationUrl) {
    return props.certData.verificationUrl;
  }
  const base = (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.origin)
    ? window.location.origin
    : 'https://ithunt.vercel.app';
  return `${base}/api/certificates/verify/${certId}`;
};

const updateQrCode = async () => {
  const url = getVerifyUrl();
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 256,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('Failed to generate QR code in modal:', err);
  }
};

watch(() => props.certData, () => {
  updateQrCode();
  nextTick(() => {
    if (isFitToPage.value) {
      calculateFitZoom();
    }
  });
}, { immediate: true, deep: true });

onMounted(() => {
  nextTick(() => {
    if (paperRef.value) {
      paperHeight.value = paperRef.value.offsetHeight;
      if (typeof window !== 'undefined' && window.ResizeObserver) {
        resizeObserver = new ResizeObserver(() => {
          if (paperRef.value) {
            paperHeight.value = paperRef.value.offsetHeight;
            if (isFitToPage.value) {
              calculateFitZoom();
            }
          }
        });
        resizeObserver.observe(paperRef.value);
        if (viewportRef.value) {
          resizeObserver.observe(viewportRef.value);
        }
      }
    }
    if (isFitToPage.value) {
      calculateFitZoom();
    }
    window.addEventListener('resize', handleWindowResize);
  });
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  window.removeEventListener('resize', handleWindowResize);
});

const handleOpenVerifyUrl = () => {
  const url = getVerifyUrl();
  window.open(url, '_blank');
};

const handleDownloadPdf = async () => {
  if (props.certData.type === 'experience') {
    await generateExperienceCertificatePdf(props.certData);
  } else {
    await generateCourseCertificatePdf(props.certData);
  }
};

const handlePrint = () => {
  window.print();
};

const copyVerificationUrl = async () => {
  const url = getVerifyUrl();
  try {
    await navigator.clipboard.writeText(url);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2500);
  } catch (e) {
    console.warn('Clipboard write failed:', e);
  }
};
</script>

<style scoped>
.cert-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(3, 7, 18, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.cert-modal-wrapper {
  background: #0f172a;
  border: 1px solid rgba(249, 115, 22, 0.35);
  border-radius: 16px;
  width: 100%;
  max-width: 960px;
  max-height: 94vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(249, 115, 22, 0.18);
  overflow: hidden;
  animation: modalFadeIn 0.25s ease-out;
}

.cert-modal-wrapper.is-experience {
  max-width: 820px;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: scale(0.96) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Header */
.cert-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #090d16;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  gap: 1rem;
  flex-wrap: wrap;
}

.cert-header-title-box {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.cert-type-icon {
  font-size: 1.75rem;
}

.cert-modal-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 1.1rem;
  font-weight: 800;
  color: #f8fafc;
}

.cert-modal-sub {
  font-size: 0.78rem;
  color: #94a3b8;
}

.cert-mono-id {
  font-family: var(--font-mono, monospace);
  color: #fb923c;
  font-weight: 700;
}

.cert-status-tag {
  color: #34d399;
  font-weight: 700;
}

.cert-modal-header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cert-action-btn {
  padding: 0.5rem 1rem;
  font-size: 0.825rem;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;
}

.cert-action-btn.primary {
  background: linear-gradient(135deg, #ea580c, #f97316);
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 14px rgba(234, 88, 12, 0.4);
}

.cert-action-btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(234, 88, 12, 0.6);
}

.cert-action-btn.secondary, .cert-action-btn.print {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
}

.cert-action-btn.secondary:hover, .cert-action-btn.print:hover {
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}

.cert-close-btn {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.cert-close-btn:hover {
  background: rgba(239, 68, 68, 0.3);
  color: #ffffff;
}

/* Zoom & Fit Toolbar */
.cert-zoom-toolbar {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  padding: 3px 5px;
}

.cert-zoom-btn {
  background: transparent;
  border: none;
  color: #cbd5e1;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.cert-zoom-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
}

.cert-zoom-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.cert-zoom-btn.fit-btn {
  font-size: 0.78rem;
  font-weight: 700;
  gap: 4px;
  padding: 4px 9px;
  color: #e2e8f0;
}

.cert-zoom-btn.fit-btn.is-active {
  background: rgba(234, 88, 12, 0.28);
  border: 1px solid rgba(234, 88, 12, 0.55);
  color: #fb923c;
}

.cert-zoom-group {
  display: flex;
  align-items: center;
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  padding-left: 0.25rem;
  margin-left: 0.15rem;
}

.cert-zoom-val {
  background: transparent;
  border: none;
  font-family: var(--font-mono, monospace);
  font-size: 0.78rem;
  font-weight: 700;
  color: #94a3b8;
  padding: 3px 6px;
  min-width: 44px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.cert-zoom-val:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

/* Modal Body */
.cert-modal-body {
  padding: 1.25rem 1rem;
  overflow-y: auto;
  overflow-x: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #020617;
  flex: 1;
  min-height: 0;
}

.cert-scaler-wrapper {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), margin-bottom 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  justify-content: center;
  width: 100%;
}

/* =========================================================================
   1. COURSE CERTIFICATE VISUAL CARD (Landscape)
   ========================================================================= */
.course-cert-paper {
  background: #fffdf8;
  color: #0f172a;
  width: 100%;
  max-width: 880px;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.45);
}

.course-cert-border-outer {
  border: 4px solid #0f172a;
  padding: 8px;
}

.course-cert-border-inner {
  border: 2px solid #d97706;
  padding: 24px;
  position: relative;
  text-align: center;
}

.corner-ornament {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 3px solid #d97706;
}

.corner-ornament.top-left { top: 6px; left: 6px; border-right: none; border-bottom: none; }
.corner-ornament.top-right { top: 6px; right: 6px; border-left: none; border-bottom: none; }
.corner-ornament.bottom-left { bottom: 6px; left: 6px; border-right: none; border-top: none; }
.corner-ornament.bottom-right { bottom: 6px; right: 6px; border-left: none; border-top: none; }

.cert-brand-header {
  margin-bottom: 1rem;
}

.cert-brand-logo-text {
  font-family: var(--font-heading, sans-serif);
  font-size: 1.9rem;
  font-weight: 900;
  color: #ea580c;
  letter-spacing: 1px;
}

.cert-brand-sub {
  font-size: 0.725rem;
  font-weight: 800;
  color: #475569;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

.cert-brand-accreditation {
  font-size: 0.65rem;
  color: #64748b;
  margin-top: 2px;
}

.cert-divider-line {
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #f59e0b, transparent);
  margin: 8px auto 0;
}

.cert-main-heading {
  font-family: var(--font-heading, sans-serif);
  font-size: 1.45rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 2px;
}

.cert-award-sub {
  font-size: 0.68rem;
  font-weight: 700;
  color: #d97706;
  letter-spacing: 1px;
}

.cert-recipient-section {
  margin: 1.25rem 0;
}

.cert-presented-text {
  font-size: 0.85rem;
  color: #64748b;
  font-style: italic;
}

.cert-recipient-name {
  font-family: var(--font-heading, sans-serif);
  font-size: 1.75rem;
  font-weight: 800;
  color: #ea580c;
  margin: 4px 0;
  word-break: break-word;
}

.cert-name-underline {
  width: 45%;
  height: 2px;
  background: #d97706;
  margin: 0 auto;
}

.cert-details-section {
  margin: 1rem 0;
}

.cert-completion-desc {
  font-size: 0.85rem;
  color: #475569;
  margin-bottom: 6px;
}

.cert-course-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 6px;
}

.cert-meta-ribbon {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.8rem;
  color: #475569;
  background: #fef3c7;
  padding: 4px 14px;
  border-radius: 999px;
  border: 1px solid #fde68a;
}

.ribbon-sep {
  color: #d97706;
}

/* Bottom Row */
.cert-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 1.75rem;
  padding-top: 1rem;
  border-top: 1px dashed #cbd5e1;
  gap: 1rem;
  flex-wrap: wrap;
}

.cert-qr-box {
  text-align: center;
  width: 110px;
  transition: transform 0.2s ease;
}

.cert-qr-box:hover {
  transform: scale(1.05);
}

.qr-real-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 4px;
}

.cert-qr-real-img {
  width: 72px;
  height: 72px;
  display: block;
  border-radius: 4px;
  background: #ffffff;
  padding: 3px;
  border: 1px solid rgba(203, 213, 225, 0.9);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

.qr-loading-box {
  width: 72px;
  height: 72px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  color: #94a3b8;
  border: 1px dashed #cbd5e1;
  border-radius: 4px;
}

.qr-label {
  font-size: 0.6rem;
  font-weight: 800;
  color: #0f172a;
}

.qr-id {
  font-size: 0.55rem;
  color: #64748b;
  font-family: var(--font-mono, monospace);
}

.official-gold-seal {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);
}

.seal-inner-ring {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  border: 2px dashed #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 0.55rem;
  font-weight: 800;
  text-align: center;
  line-height: 1.1;
}

.seal-star {
  font-size: 0.75rem;
}

.cert-signatures-box {
  display: flex;
  gap: 2rem;
}

.sig-column {
  text-align: center;
}

.signature-ink {
  font-family: 'Brush Script MT', 'Dancing Script', cursive, sans-serif;
  font-size: 1.15rem;
  color: #1e3a8a;
  font-style: italic;
  font-weight: 700;
}

.sig-line {
  width: 120px;
  height: 1px;
  background: #94a3b8;
  margin: 2px auto 4px;
}

.sig-name {
  font-size: 0.725rem;
  font-weight: 800;
  color: #0f172a;
}

.sig-role {
  font-size: 0.625rem;
  color: #64748b;
}

.cert-footer-disclaimer {
  font-size: 0.6rem;
  color: #94a3b8;
  margin-top: 1rem;
}

/* =========================================================================
   2. EXPERIENCE CERTIFICATE VISUAL LETTER (Portrait)
   ========================================================================= */
.exp-cert-paper {
  background: #ffffff;
  color: #1e293b;
  width: 100%;
  max-width: 740px;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.45);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.exp-cert-border-outer {
  border: 1px solid #cbd5e1;
  padding: 18px 22px;
}

.exp-letterhead-header {
  background: #fff7ed;
  border: 1px solid #fed7aa;
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 0.85rem;
}

.exp-header-brand-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.exp-brand-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 1.75rem;
  font-weight: 900;
  color: #ea580c;
}

.exp-brand-highlight {
  color: #d97706;
}

.exp-brand-sub {
  font-size: 0.72rem;
  font-weight: 800;
  color: #1e293b;
}

.exp-header-badge {
  text-align: right;
  font-size: 0.65rem;
  font-weight: 800;
  color: #c2410c;
}

.badge-iso {
  background: rgba(234, 88, 12, 0.12);
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 3px;
}

.badge-msme {
  color: #64748b;
  font-weight: 600;
}

.exp-header-address {
  margin-top: 6px;
  font-size: 0.70rem;
  color: #64748b;
  line-height: 1.45;
}

.exp-header-divider {
  height: 2px;
  background: #ea580c;
  margin-top: 8px;
}

.exp-ref-bar {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  font-weight: 600;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 6px;
  margin-bottom: 0.85rem;
}

.exp-letter-title-section {
  text-align: center;
  margin: 0.85rem 0;
}

.exp-letter-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: 0.5px;
}

.exp-letter-subtitle {
  font-size: 0.82rem;
  font-weight: 800;
  color: #d97706;
  margin-top: 2px;
}

.exp-letter-body {
  font-size: 0.875rem;
  line-height: 1.55;
  color: #334155;
  text-align: justify;
}

.exp-letter-body p {
  margin-bottom: 0.65rem;
}

.exp-bottom-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.exp-qr-container {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 300px;
}

.exp-qr-box {
  width: 62px;
  height: 62px;
  background: #ffffff;
  border: 1px solid rgba(203, 213, 225, 0.9);
  border-radius: 4px;
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease;
}

.exp-qr-box:hover {
  transform: scale(1.05);
}

.exp-qr-real-img {
  width: 58px;
  height: 58px;
  display: block;
  border-radius: 3px;
}

.exp-qr-title {
  font-size: 0.70rem;
  font-weight: 800;
  color: #0f172a;
}

.exp-qr-sub {
  font-size: 0.63rem;
  color: #64748b;
  line-height: 1.3;
}

.exp-qr-link {
  font-size: 0.63rem;
  font-family: var(--font-mono, monospace);
  color: #ea580c;
  font-weight: 700;
}

.exp-signatory-box {
  display: flex;
  align-items: flex-end;
  gap: 1.25rem;
}

.exp-corporate-stamp {
  width: 64px;
  height: 64px;
  border: 2px solid #ea580c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stamp-inner {
  border: 1px dashed #d97706;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.46rem;
  font-weight: 800;
  color: #ea580c;
  text-align: center;
  line-height: 1.2;
}

.exp-signature-block {
  text-align: right;
}

.for-company {
  font-size: 0.72rem;
  font-weight: 700;
  color: #475569;
}

.exp-sig-script {
  font-family: 'Brush Script MT', 'Dancing Script', cursive, sans-serif;
  font-size: 1.2rem;
  color: #1e3a8a;
  font-style: italic;
  font-weight: 700;
  margin: 3px 0 2px;
}

.exp-sig-line {
  width: 140px;
  height: 1px;
  background: #94a3b8;
  margin-left: auto;
}

.exp-sig-name {
  font-size: 0.80rem;
  font-weight: 800;
  color: #0f172a;
  margin-top: 3px;
}

.exp-sig-designation {
  font-size: 0.70rem;
  color: #64748b;
}

.exp-footer-note {
  font-size: 0.63rem;
  color: #94a3b8;
  text-align: center;
  margin-top: 0.85rem;
}

/* Footer Actions */
.cert-modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #090d16;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-hint {
  font-size: 0.8rem;
  color: #94a3b8;
}

.footer-actions {
  display: flex;
  gap: 0.6rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .cert-modal-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .cert-modal-header-actions {
    width: 100%;
    justify-content: flex-start;
  }
  .cert-bottom-row, .exp-bottom-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .exp-signature-block {
    text-align: center;
  }
  .exp-sig-line {
    margin: 2px auto;
  }
  .cert-signatures-box {
    flex-direction: column;
    gap: 1rem;
  }
  .course-cert-paper, .exp-cert-paper {
    padding: 12px;
  }
  .course-cert-border-inner, .exp-cert-border-outer {
    padding: 12px;
  }
  .cert-recipient-name {
    font-size: 1.35rem;
  }
}
</style>
