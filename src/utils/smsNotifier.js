/**
 * IT HUNT - Mobile SMS & WhatsApp Notification Dispatcher
 * Provides SMS API integration, WhatsApp direct pass generation, and device native SMS dispatch.
 */

const FAST2SMS_API_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FAST2SMS_API_KEY)
  ? import.meta.env.VITE_FAST2SMS_API_KEY
  : null;

/**
 * Builds standard plain-text mobile SMS message for admission
 * @param {Object} adm 
 * @returns {String}
 */
export function buildAdmissionSmsText(adm) {
  if (!adm) return '';
  return `🎓 IT HUNT ACADEMY ADMISSION CONFIRMED!
Candidate: ${adm.candidateName || 'Student'}
Reg ID: ${adm.registrationNo || 'ITH-2026'}
Program: ${adm.course || 'IT Track'}
Date: ${adm.date || ''}
Campus: Dahiyawa Holagarh, Prayagraj
Reporting: 09:30 AM Onboarding Day 1
Verified PDF slip sent to email.`;
}

/**
 * Builds formatted WhatsApp message with markdown bolding & emojis
 * @param {Object} adm 
 * @returns {String}
 */
export function buildAdmissionWhatsAppText(adm) {
  if (!adm) return '';
  return `🎓 *IT HUNT ACADEMY 2026 — ADMISSION CONFIRMED*

Dear *${adm.candidateName || 'Candidate'}*,
Your admission and internship registration at *IT HUNT Academy* has been provisionally confirmed!

📌 *REGISTRATION ID:* ${adm.registrationNo || 'ITH-2026'}
📚 *ENROLLED PROGRAM:* ${adm.course || 'MERN Stack & Cloud Architecture'}
👤 *FATHER'S NAME:* ${adm.fatherName || '—'}
📞 *CONTACT MOBILE:* +91 ${adm.mobile || ''}
📅 *DATE OF REGISTRATION:* ${adm.date || ''}

📍 *TRAINING CAMPUS:*
IT HUNT Software Studio, Dahiyawa Holagarh (Near Kali Maa Mandir), Prayagraj, UP – 212502

⏰ *DAY 1 REPORTING:* 09:30 AM Onboarding & Workstation Allotment
📜 *OFFICIAL DOCUMENTS:* Verified ISO 9001:2015 Registration Slip has been dispatched to your email.

*Directorate Desk, IT HUNT*
🌐 Website: ithunt.org | ✉️ softtechithunt@gmail.com`;
}

/**
 * Clean 10-digit Indian phone number
 * @param {String} mobile 
 * @returns {String}
 */
function sanitizeMobileNumber(mobile) {
  if (!mobile) return '';
  const digits = String(mobile).replace(/[^0-9]/g, '');
  if (digits.length === 10) return '91' + digits;
  if (digits.length === 12 && digits.startsWith('91')) return digits;
  return digits;
}

/**
 * Open instant WhatsApp message for candidate
 * @param {Object} adm 
 */
export function sendWhatsAppNotification(adm) {
  if (!adm || !adm.mobile) return false;
  const targetNum = sanitizeMobileNumber(adm.mobile);
  const text = buildAdmissionWhatsAppText(adm);
  const waUrl = `https://wa.me/${targetNum}?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
  return true;
}

/**
 * Trigger native SMS messaging app on mobile devices
 * @param {Object} adm 
 */
export function sendDeviceSmsNotification(adm) {
  if (!adm || !adm.mobile) return false;
  const digits = String(adm.mobile).replace(/[^0-9]/g, '').slice(-10);
  const text = buildAdmissionSmsText(adm);
  const smsUrl = `sms:+91${digits}?body=${encodeURIComponent(text)}`;
  window.open(smsUrl, '_blank');
  return true;
}

/**
 * Send automated transactional SMS via Fast2SMS gateway if API key is provided
 * @param {Object} adm 
 */
export async function sendFast2SmsApiNotification(adm) {
  if (!adm || !adm.mobile || !FAST2SMS_API_KEY) {
    return { success: false, reason: 'Missing mobile or Fast2SMS API key' };
  }

  const rawDigits = String(adm.mobile).replace(/[^0-9]/g, '').slice(-10);
  const messageText = `IT HUNT Admission Confirmed! Candidate: ${adm.candidateName}, Reg ID: ${adm.registrationNo}, Program: ${adm.course}. Reporting 09:30 AM at Holagarh Prayagraj Campus.`;

  try {
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'v3',
        sender_id: 'TXTIND',
        message: messageText,
        language: 'english',
        flash: 0,
        numbers: rawDigits
      })
    });

    const data = await response.json();
    if (data && data.return) {
      console.log(`✓ Fast2SMS notification sent successfully to +91 ${rawDigits}`);
      return { success: true, data };
    } else {
      console.warn('Fast2SMS returned error:', data);
      return { success: false, data };
    }
  } catch (err) {
    console.error('Fast2SMS dispatch failed:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Unified dispatch call for Mobile SMS & WhatsApp
 * @param {Object} adm 
 */
export async function triggerMobileMessageNotification(adm) {
  if (!adm) return false;

  // Try Fast2SMS backend API dispatch if key is configured
  if (FAST2SMS_API_KEY) {
    sendFast2SmsApiNotification(adm).catch(() => {});
  }

  // Also log confirmation dispatch status
  console.log(`📱 Mobile message ready for candidate ${adm.candidateName} (+91 ${adm.mobile})`);
  return true;
}

export default {
  buildAdmissionSmsText,
  buildAdmissionWhatsAppText,
  sendWhatsAppNotification,
  sendDeviceSmsNotification,
  sendFast2SmsApiNotification,
  triggerMobileMessageNotification
};
