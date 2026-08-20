<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="$emit('close')">
    <div class="modal-card" style="max-width: 520px;">
      <div class="modal-icon-success">✓</div>
      <h3 style="font-family: var(--font-heading); font-size: 1.75rem; font-weight: 800; margin-bottom: 0.4rem;">
        {{ title || content?.modalTexts?.confirmation?.defaultTitle || 'Application Submitted Successfully! 🎉' }}
      </h3>
      <p style="color: var(--text-muted); margin-bottom: 1.25rem; font-size: 0.95rem; line-height: 1.6;">
        {{ body }}
      </p>

      <div v-if="referenceId" style="background: rgba(255, 255, 255, 0.05); padding: 0.85rem; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 1.1rem; color: #34d399; margin-bottom: 1.25rem; border: 1px solid var(--border-cyber); font-weight: 800;">
        {{ content?.modalTexts?.confirmation?.referencePrefix || 'Reference ID:' }} {{ referenceId }}
      </div>

      <!-- Live Admission Details Summary Card -->
      <div v-if="admission" style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-cyber); border-radius: var(--radius-md); padding: 1.1rem; margin-bottom: 1.25rem; text-align: left;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
          <div style="font-size: 0.825rem; font-weight: 800; color: var(--color-ai-orange); text-transform: uppercase; letter-spacing: 0.5px;">
            {{ content?.modalTexts?.confirmation?.receiptHeading || '📄 Official Admission Receipt' }}
          </div>
          <div style="font-size: 0.75rem; color: #34d399; font-weight: 800; background: rgba(52, 211, 153, 0.15); padding: 0.2rem 0.55rem; border-radius: 4px; border: 1px solid rgba(52, 211, 153, 0.3);">
            {{ content?.modalTexts?.confirmation?.confirmedBadge || '✓ CONFIRMED' }}
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.85rem;">
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">
              {{ content?.modalTexts?.confirmation?.candidateNameLabel || 'Candidate Name' }}
            </div>
            <div style="font-weight: 800; color: var(--text-main);">{{ admission.candidateName }}</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">
              {{ content?.modalTexts?.confirmation?.registrationIdLabel || 'Registration ID' }}
            </div>
            <div style="font-weight: 800; color: var(--color-ai-yellow); font-family: var(--font-mono);">{{ admission.registrationNo }}</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">
              {{ content?.modalTexts?.confirmation?.fatherNameLabel || "Father's Name" }}
            </div>
            <div style="font-weight: 600; color: var(--text-main);">{{ admission.fatherName || '—' }}</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">
              {{ content?.modalTexts?.confirmation?.mobileLabel || 'Mobile Number' }}
            </div>
            <div style="font-weight: 600; color: #38bdf8; font-family: var(--font-mono);">{{ admission.mobile }}</div>
          </div>
          <div style="grid-column: 1 / -1;">
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">
              {{ content?.modalTexts?.confirmation?.courseLabel || 'Enrolled Program / Track' }}
            </div>
            <div style="font-weight: 800; color: var(--color-ai-orange);">{{ admission.course }}</div>
          </div>
        </div>
      </div>

      <div class="modal-actions-group" style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
        <button 
          v-if="admission" 
          class="btn-primary pdf-download-btn" 
          @click="$emit('download-pdf')" 
          :disabled="isGeneratingPdf"
        >
          <span>{{ isGeneratingPdf ? (content?.ui?.generatingPdfLabel || '⏳ Generating PDF...') : (content?.ui?.downloadPdfSlipBtn || '📄 Download Slip (PDF)') }}</span>
        </button>

        <button 
          v-if="admission && admission.mobile" 
          class="btn-primary" 
          style="background: linear-gradient(135deg, #25D366, #128C7E); border-color: #25D366; color: #ffffff;"
          @click="sendWhatsAppNotification(admission)"
          title="Send Official Admission Confirmation Pass on WhatsApp"
        >
          <span>💬 WhatsApp Pass</span>
        </button>

        <button 
          v-if="admission && admission.mobile" 
          class="btn-secondary" 
          style="border-color: rgba(56, 189, 248, 0.4); color: #38bdf8;"
          @click="sendDeviceSmsNotification(admission)"
          title="Send Confirmation via Mobile SMS"
        >
          <span>📱 Mobile SMS</span>
        </button>
        
        <button 
          v-if="admission" 
          class="btn-secondary" 
          @click="$emit('print-slip')"
        >
          <span>{{ content?.ui?.printSlipBtn || 'Print 🖨️' }}</span>
        </button>

        <button class="btn-secondary" @click="$emit('close')">{{ content?.ui?.gotIt || 'Got It 👍' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { sendWhatsAppNotification, sendDeviceSmsNotification } from '../../utils/smsNotifier.js';

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    default: ''
  },
  referenceId: {
    type: String,
    default: ''
  },
  admission: {
    type: Object,
    default: null
  },
  isGeneratingPdf: {
    type: Boolean,
    default: false
  },
  content: {
    type: Object,
    default: () => ({})
  }
});

defineEmits(['close', 'download-pdf', 'print-slip']);
</script>
