/**
 * IT HUNT - Automatic Email Notification Dispatcher
 * Sends real-time admission and registration emails to softtechithunt@gmail.com
 */

const TARGET_EMAIL = 'softtechithunt@gmail.com';
const FORMSUBMIT_TOKEN = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FORMSUBMIT_TOKEN)
  ? import.meta.env.VITE_FORMSUBMIT_TOKEN
  : '1864b99a4972a64cd046dba2a86b13c8';

const FORMSUBMIT_AJAX_URL = `https://formsubmit.co/ajax/${FORMSUBMIT_TOKEN}`;
const FORMSUBMIT_FORM_URL = `https://formsubmit.co/${FORMSUBMIT_TOKEN}`;

import { getAdmissionPdfBlob } from './pdfGenerator.js';

/**
 * Send Email Notification when a candidate registers for Admission (with PDF attachment)
 * @param {Object} admissionRecord 
 * @param {Blob|null} [pdfBlob] Optional pre-generated PDF Blob
 */
/**
 * Send Email Notification when a candidate registers for Admission (with PDF attachment)
 * Sends Admin email with Admin content to softtechithunt@gmail.com and Student email with Student content to candidate.
 * @param {Object} admissionRecord 
 * @param {Blob|null} [pdfBlob] Optional pre-generated PDF Blob
 */
/**
 * Dispatch distinct Admin Email Notification with Admin PDF Record attachment
 * @param {Object} admissionRecord 
 * @param {Blob|null} adminPdfBlob 
 */
export async function sendAdminAdmissionEmail(admissionRecord, adminPdfBlob = null) {
  if (!admissionRecord) return { success: false };

  const regNo = admissionRecord.registrationNo || 'ITH-000000';
  const candName = admissionRecord.candidateName || 'Candidate';
  const courseTitle = admissionRecord.course || 'Selected Program';
  const genderDobFormatted = `${admissionRecord.gender || 'Male'} | ${admissionRecord.dob || 'N/A'}`;
  const districtStateFormatted = `${(admissionRecord.district || 'PRAYAGRAJ').toUpperCase()}, UP`;
  const candidateCleanName = candName.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `IT_HUNT_Admin_Record_${regNo}_${candidateCleanName}.pdf`;
  const subjectText = `👑 [ADMIN CONTROL PANEL] New Student Admission: ${candName} [Reg: ${regNo}]`;

  // Auto-generate Admin PDF blob if missing
  if (!adminPdfBlob) {
    try {
      adminPdfBlob = getAdmissionPdfBlob(admissionRecord, 'admin');
    } catch (e) {
      console.warn('Could not auto-generate Admin PDF blob:', e);
    }
  }

  // Submit via iframe multipart form to attach Admin PDF file
  if (adminPdfBlob && typeof document !== 'undefined') {
    try {
      let iframe = document.getElementById('formsubmit_admin_iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'formsubmit_admin_iframe';
        iframe.name = 'formsubmit_admin_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      const form = document.createElement('form');
      form.action = FORMSUBMIT_FORM_URL;
      form.method = 'POST';
      form.enctype = 'multipart/form-data';
      form.target = 'formsubmit_admin_iframe';
      form.style.display = 'none';

      const addField = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value || '';
        form.appendChild(input);
      };

      addField('_subject', subjectText);
      addField('_replyto', admissionRecord.email || TARGET_EMAIL);
      addField('_template', 'table');
      addField('_captcha', 'false');

      // Admin Email Body Content
      addField('NOTIFICATION TYPE', '👑 SUPERADMIN CONTROL PANEL ALERT');
      addField('ADMIN NOTICE', 'A new candidate admission has been provisionally submitted.');
      addField('REGISTRATION ID', regNo);
      addField('CANDIDATE FULL NAME', candName);
      addField("FATHER'S NAME", admissionRecord.fatherName || 'N/A');
      addField("MOTHER'S NAME", admissionRecord.motherName || 'N/A');
      addField('COURSE ENROLLED', courseTitle);
      addField('GENDER / DOB', genderDobFormatted);
      addField('CONTACT MOBILE', admissionRecord.mobile || 'N/A');
      addField('CANDIDATE EMAIL', admissionRecord.email || 'N/A');
      addField('DISTRICT & STATE', districtStateFormatted);
      addField('PERMANENT ADDRESS', admissionRecord.address || 'N/A');
      addField('REGISTRATION TIMESTAMP', `${admissionRecord.date || ''} ${admissionRecord.time || ''}`);
      addField('ADMIN ACTION REQUIRED', 'Log in to SuperAdmin Portal to verify credentials, fee receipt, and assign lab workstation.');

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.name = 'attachment';

      const pdfFile = new File([adminPdfBlob], filename, { type: 'application/pdf' });
      const dt = new DataTransfer();
      dt.items.add(pdfFile);
      fileInput.files = dt.files;
      form.appendChild(fileInput);

      document.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        if (form.parentNode) form.parentNode.removeChild(form);
      }, 3000);

      console.log(`✓ Admin email (${subjectText}) with attached Admin Record PDF submitted to ${TARGET_EMAIL}`);
      return { success: true };
    } catch (err) {
      console.warn('Admin hidden form submission failed, executing AJAX fallback:', err);
    }
  }

  // AJAX fallback for Admin Email
  try {
    const payload = {
      _subject: subjectText,
      _replyto: admissionRecord.email || TARGET_EMAIL,
      _template: 'table',
      _captcha: 'false',
      'NOTIFICATION TYPE': '👑 SUPERADMIN CONTROL PANEL ALERT',
      'ADMIN NOTICE': 'A new candidate admission has been provisionally submitted.',
      'REGISTRATION ID': regNo,
      'CANDIDATE FULL NAME': candName,
      "FATHER'S NAME": admissionRecord.fatherName || 'N/A',
      "MOTHER'S NAME": admissionRecord.motherName || 'N/A',
      'COURSE ENROLLED': courseTitle,
      'GENDER / DOB': genderDobFormatted,
      'CONTACT MOBILE': admissionRecord.mobile || 'N/A',
      'CANDIDATE EMAIL': admissionRecord.email || 'N/A',
      'DISTRICT & STATE': districtStateFormatted,
      'PERMANENT ADDRESS': admissionRecord.address || 'N/A',
      'REGISTRATION TIMESTAMP': `${admissionRecord.date || ''} ${admissionRecord.time || ''}`,
      'ADMIN ACTION REQUIRED': 'Log in to SuperAdmin Portal to verify credentials, fee receipt, and assign lab workstation.'
    };

    await fetch(FORMSUBMIT_AJAX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    return { success: true };
  } catch (err) {
    console.error('Failed to send Admin email:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Dispatch distinct Student Email Notification with Student PDF Slip attachment
 * @param {Object} admissionRecord 
 * @param {Blob|null} studentPdfBlob 
 */
/**
 * Dispatch distinct Student Email Notification with Student PDF Slip attachment
 * @param {Object} admissionRecord 
 * @param {Blob|null} studentPdfBlob 
 */
export async function sendStudentAdmissionEmail(admissionRecord, studentPdfBlob = null) {
  if (!admissionRecord || !admissionRecord.email || !admissionRecord.email.includes('@')) {
    return { success: false, reason: 'Invalid or missing candidate email' };
  }

  const regNo = admissionRecord.registrationNo || 'ITH-000000';
  const candName = admissionRecord.candidateName || 'Candidate';
  const courseTitle = admissionRecord.course || 'Selected Program';
  const candidateCleanName = candName.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `IT_HUNT_Student_Slip_${regNo}_${candidateCleanName}.pdf`;
  const subjectText = `🎓 [STUDENT CONFIRMATION] Welcome ${candName} to IT HUNT Academy! [Reg: ${regNo}]`;

  // Auto-generate Student PDF blob if missing
  if (!studentPdfBlob) {
    try {
      studentPdfBlob = getAdmissionPdfBlob(admissionRecord, 'student');
    } catch (e) {
      console.warn('Could not auto-generate Student PDF blob:', e);
    }
  }

  // Submit via verified FORMSUBMIT_FORM_URL with _cc set to student email so FormSubmit delivers the PDF attachment directly to candidate
  if (studentPdfBlob && typeof document !== 'undefined') {
    try {
      let iframe = document.getElementById('formsubmit_student_iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'formsubmit_student_iframe';
        iframe.name = 'formsubmit_student_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      const form = document.createElement('form');
      form.action = FORMSUBMIT_FORM_URL;
      form.method = 'POST';
      form.enctype = 'multipart/form-data';
      form.target = 'formsubmit_student_iframe';
      form.style.display = 'none';

      const addField = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value || '';
        form.appendChild(input);
      };

      addField('_subject', subjectText);
      addField('_replyto', TARGET_EMAIL);
      addField('_template', 'table');
      addField('_captcha', 'false');
      addField('_cc', admissionRecord.email);
      addField('email', admissionRecord.email);

      // Student Email Body Content
      addField('ACKNOWLEDGMENT', '🎓 IT HUNT ACADEMY - OFFICIAL ADMISSION CONFIRMATION');
      addField('WELCOME GREETING', `Dear ${candName}, Welcome to IT HUNT Academy & Software Solutions! Your registration is provisionally confirmed.`);
      addField('REGISTRATION ID', regNo);
      addField('STUDENT FULL NAME', candName);
      addField('ENROLLED PROGRAM', courseTitle);
      addField("FATHER'S NAME", admissionRecord.fatherName || 'N/A');
      addField('CONTACT MOBILE', admissionRecord.mobile || 'N/A');
      addField('REGISTERED DATE', admissionRecord.date || new Date().toLocaleDateString('en-GB'));
      addField('DAY 1 ONBOARDING', 'Reporting Time: 09:30 AM Onboarding Day 1 at Holagarh Campus');
      addField('MANDATORY DOCUMENTS TO BRING', `1. Printed or Digital Admission Slip (${regNo})\n2. 2 Passport Photos & Photo ID Proof (Aadhaar / Voter ID)`);
      addField('TRAINING CAMPUS LOCATION', '📍 IT HUNT Software Studio, Dahiyawa Holagarh, Prayagraj, UP – 212502');
      addField('ACADEMIC HELPLINES', '📞 +91 9795771806 | +91 8299544315 | 📧 softtechithunt@gmail.com');

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.name = 'attachment';

      const pdfFile = new File([studentPdfBlob], filename, { type: 'application/pdf' });
      const dt = new DataTransfer();
      dt.items.add(pdfFile);
      fileInput.files = dt.files;
      form.appendChild(fileInput);

      document.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        if (form.parentNode) form.parentNode.removeChild(form);
      }, 3000);

      console.log(`✓ Student email (${subjectText}) with attached Student Slip PDF (${filename}) submitted to ${admissionRecord.email}`);
      return { success: true };
    } catch (err) {
      console.warn('Student hidden form submission failed, executing AJAX fallback:', err);
    }
  }

  // AJAX fallback for Student Email
  try {
    const payload = {
      _subject: subjectText,
      _replyto: TARGET_EMAIL,
      _template: 'table',
      _captcha: 'false',
      _cc: admissionRecord.email,
      email: admissionRecord.email,
      'ACKNOWLEDGMENT': '🎓 IT HUNT ACADEMY - OFFICIAL ADMISSION CONFIRMATION',
      'WELCOME GREETING': `Dear ${candName}, Welcome to IT HUNT Academy & Software Solutions! Your registration is provisionally confirmed.`,
      'REGISTRATION ID': regNo,
      'STUDENT FULL NAME': candName,
      'ENROLLED PROGRAM': courseTitle,
      "FATHER'S NAME": admissionRecord.fatherName || 'N/A',
      'CONTACT MOBILE': admissionRecord.mobile || 'N/A',
      'REGISTERED DATE': admissionRecord.date || new Date().toLocaleDateString('en-GB'),
      'DAY 1 ONBOARDING': 'Reporting Time: 09:30 AM Onboarding Day 1 at Holagarh Campus',
      'MANDATORY DOCUMENTS TO BRING': `1. Printed or Digital Admission Slip (${regNo})\n2. 2 Passport Photos & Photo ID Proof (Aadhaar / Voter ID)`,
      'TRAINING CAMPUS LOCATION': '📍 IT HUNT Software Studio, Dahiyawa Holagarh, Prayagraj, UP – 212502',
      'ACADEMIC HELPLINES': '📞 +91 9795771806 | +91 8299544315 | 📧 softtechithunt@gmail.com'
    };

    await fetch(FORMSUBMIT_AJAX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    return { success: true };
  } catch (err) {
    console.error('Failed to send Student email:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Master dispatch for Admission Emails: Sends distinct Admin Email (with Admin PDF) and distinct Student Email (with Student PDF)
 * @param {Object} admissionRecord 
 * @param {Blob|null} [pdfBlob] Optional pre-generated PDF Blob
 */
export async function sendAdmissionEmailNotification(admissionRecord, pdfBlob = null) {
  if (!admissionRecord) return { success: false, error: 'Empty record' };

  // Generate distinct Admin and Student PDF Blobs
  let adminPdfBlob = pdfBlob;
  let studentPdfBlob = pdfBlob;

  try {
    adminPdfBlob = getAdmissionPdfBlob(admissionRecord, 'admin');
    studentPdfBlob = getAdmissionPdfBlob(admissionRecord, 'student');
  } catch (e) {
    console.warn('Could not generate distinct PDF blobs:', e);
  }

  // 1. Dispatch Admin Email (Admin Body + Admin PDF)
  const adminRes = await sendAdminAdmissionEmail(admissionRecord, adminPdfBlob);

  // 2. Dispatch Student Email (Student Body + Student PDF) with slight delay to ensure clean form submission
  let studentRes = { success: false };
  if (admissionRecord.email && admissionRecord.email.includes('@')) {
    await new Promise(resolve => setTimeout(resolve, 500));
    studentRes = await sendStudentAdmissionEmail(admissionRecord, studentPdfBlob);
  }

  return { success: adminRes.success || studentRes.success };
}

/**
 * Send Email Notification when a candidate applies for a Job
 * @param {Object} jobRecord 
 */
export async function sendJobEmailNotification(jobRecord) {
  if (!jobRecord) return { success: false };

  const payload = {
    _subject: `💼 NEW JOB APPLICATION: ${jobRecord.name || 'Applicant'} [${jobRecord.position}]`,
    _replyto: jobRecord.email || TARGET_EMAIL,
    _template: 'table',
    _captcha: 'false',
    'Application ID': jobRecord.id || 'N/A',
    'Applicant Name': jobRecord.name || 'N/A',
    'Position Applied': jobRecord.position || 'N/A',
    'Mobile Number': jobRecord.phone || 'N/A',
    'Email Address': jobRecord.email || 'N/A',
    'Experience': jobRecord.experience || 'N/A',
    'Portfolio / GitHub': jobRecord.portfolio || 'N/A',
    'Current Company': jobRecord.currentCompany || 'N/A',
    'Application Date': jobRecord.date || new Date().toLocaleDateString('en-GB')
  };

  if (jobRecord.email && jobRecord.email.includes('@')) {
    payload._cc = jobRecord.email;
    payload.email = jobRecord.email;
  }

  try {
    await fetch(FORMSUBMIT_AJAX_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Send Email Notification when a candidate registers for an Event RSVP
 * @param {Object} rsvpRecord 
 */
export async function sendRsvpEmailNotification(rsvpRecord) {
  if (!rsvpRecord) return { success: false };

  const payload = {
    _subject: `🎟️ NEW EVENT RSVP: ${rsvpRecord.name || 'Attendee'} [${rsvpRecord.eventTitle}]`,
    _replyto: rsvpRecord.email || TARGET_EMAIL,
    _template: 'table',
    _captcha: 'false',
    'Pass ID': rsvpRecord.id || 'N/A',
    'Attendee Name': rsvpRecord.name || 'N/A',
    'Event Title': rsvpRecord.eventTitle || 'N/A',
    'Mobile Number': rsvpRecord.phone || 'N/A',
    'Email Address': rsvpRecord.email || 'N/A',
    'College / Institute': rsvpRecord.college || 'N/A',
    'RSVP Date': rsvpRecord.date || new Date().toLocaleDateString('en-GB')
  };

  if (rsvpRecord.email && rsvpRecord.email.includes('@')) {
    payload._cc = rsvpRecord.email;
    payload.email = rsvpRecord.email;
  }

  try {
    await fetch(FORMSUBMIT_AJAX_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export default {
  sendAdmissionEmailNotification,
  sendJobEmailNotification,
  sendRsvpEmailNotification
};
