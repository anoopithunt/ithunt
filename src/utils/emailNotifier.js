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
export async function sendAdmissionEmailNotification(admissionRecord, pdfBlob = null) {
  if (!admissionRecord) return { success: false, error: 'Empty record' };

  const genderDobFormatted = `${admissionRecord.gender || 'Male'} | ${admissionRecord.dob || 'N/A'}`;
  const districtStateFormatted = `${(admissionRecord.district || 'PRAYAGRAJ').toUpperCase()}, UP`;

  // Auto-generate PDF blob if not passed explicitly
  if (!pdfBlob) {
    try {
      pdfBlob = getAdmissionPdfBlob(admissionRecord);
    } catch (e) {
      console.warn('Could not auto-generate PDF blob for email:', e);
    }
  }

  const subjectText = `🟢 🏛️ OFFICIAL ADMISSION PREVIEW: ${admissionRecord.candidateName || 'Candidate'} [Reg: ${admissionRecord.registrationNo}]`;
  const replyToEmail = admissionRecord.email || TARGET_EMAIL;
  const candidateCleanName = (admissionRecord.candidateName || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `IT_HUNT_Admission_${admissionRecord.registrationNo || 'Slip'}_${candidateCleanName}.pdf`;

  // FormSubmit requires standard HTML form submission (not AJAX) for file attachments.
  // We construct a dynamic multipart form targeting a hidden iframe so the SPA UI does not redirect.
  if (pdfBlob && typeof document !== 'undefined') {
    try {
      // 1. Ensure hidden iframe exists in body
      let iframe = document.getElementById('formsubmit_hidden_iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'formsubmit_hidden_iframe';
        iframe.name = 'formsubmit_hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      // 2. Create dynamic multipart form targeting the iframe
      const form = document.createElement('form');
      form.action = FORMSUBMIT_FORM_URL;
      form.method = 'POST';
      form.enctype = 'multipart/form-data';
      form.target = 'formsubmit_hidden_iframe';
      form.style.display = 'none';

      const addField = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value || '';
        form.appendChild(input);
      };

      addField('_subject', subjectText);
      addField('_replyto', replyToEmail);
      addField('_template', 'table');
      addField('_captcha', 'false');

      if (admissionRecord.email && admissionRecord.email.includes('@')) {
        addField('_cc', admissionRecord.email);
        addField('email', admissionRecord.email);
        addField('_autoresponse', `Dear ${admissionRecord.candidateName || 'Candidate'},\n\nThank you for registering with IT HUNT Academy!\nYour admission/internship registration for "${admissionRecord.course || 'Selected Track'}" has been provisionally confirmed.\n\nPlease find your official Admission Registration Slip attached in PDF format.\n\nBest regards,\nIT HUNT Directorate\n📍 Holagarh Campus, Prayagraj, UP – 212502`);
      }

      addField('ACADEMY HEADER', '🟢 🏛️ OFFICIAL ADMISSION PREVIEW');
      addField('INSTITUTION', 'IT HUNT ACADEMY 2026');
      addField('CAMPUS LOCATION', '📍 Dahiyawa Holagarh, Prayagraj, UP – 212502');
      addField('OFFICIAL BADGES', '📜 OFFICIAL CANDIDATE COPY | ✓ ISO 9001:2015 ACCREDITED');
      addField('REGISTRATION NUMBER', admissionRecord.registrationNo || 'ITH-000000');

      addField('Candidate Name', admissionRecord.candidateName || 'N/A');
      addField("Father's Name", admissionRecord.fatherName || 'N/A');
      addField('Program Selected', admissionRecord.course || 'N/A');
      addField('Gender / DOB', genderDobFormatted);
      addField('Contact Mobile', admissionRecord.mobile || 'N/A');
      addField('District & State', districtStateFormatted);

      addField("Mother's Name", admissionRecord.motherName || 'N/A');
      addField('Email Address', admissionRecord.email || 'N/A');
      addField('Full Address', admissionRecord.address || 'N/A');
      addField('Registration Date', admissionRecord.date || new Date().toLocaleDateString('en-GB'));
      addField('Registration Time', admissionRecord.time || new Date().toLocaleTimeString('en-US'));

      // 3. Attach file via DataTransfer API to input[name="attachment"]
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.name = 'attachment';

      const pdfFile = new File([pdfBlob], filename, { type: 'application/pdf' });
      const dt = new DataTransfer();
      dt.items.add(pdfFile);
      fileInput.files = dt.files;
      form.appendChild(fileInput);

      // 4. Submit form in background and clean up
      document.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        if (form.parentNode) {
          form.parentNode.removeChild(form);
        }
      }, 3000);

      console.log(`✓ Admission email notification with attached PDF (${filename}) submitted to ${TARGET_EMAIL} and CC to ${admissionRecord.email || 'Candidate'}`);
      return { success: true };
    } catch (err) {
      console.warn('Hidden form submission for attachment failed, falling back to AJAX:', err);
    }
  }

  // Fallback to AJAX POST (without attachment if DOM is unavailable)
  try {
    const payload = {
      _subject: subjectText,
      _replyto: replyToEmail,
      _template: 'table',
      _captcha: 'false',

      'ACADEMY HEADER': '🟢 🏛️ OFFICIAL ADMISSION PREVIEW',
      'INSTITUTION': 'IT HUNT ACADEMY 2026',
      'CAMPUS LOCATION': '📍 Dahiyawa Holagarh, Prayagraj, UP – 212502',
      'OFFICIAL BADGES': '📜 OFFICIAL CANDIDATE COPY | ✓ ISO 9001:2015 ACCREDITED',
      'REGISTRATION NUMBER': admissionRecord.registrationNo || 'ITH-000000',

      'Candidate Name': admissionRecord.candidateName || 'N/A',
      "Father's Name": admissionRecord.fatherName || 'N/A',
      'Program Selected': admissionRecord.course || 'N/A',
      'Gender / DOB': genderDobFormatted,
      'Contact Mobile': admissionRecord.mobile || 'N/A',
      'District & State': districtStateFormatted,

      "Mother's Name": admissionRecord.motherName || 'N/A',
      'Email Address': admissionRecord.email || 'N/A',
      'Full Address': admissionRecord.address || 'N/A',
      'Registration Date': admissionRecord.date || new Date().toLocaleDateString('en-GB'),
      'Registration Time': admissionRecord.time || new Date().toLocaleTimeString('en-US')
    };

    if (admissionRecord.email && admissionRecord.email.includes('@')) {
      payload._cc = admissionRecord.email;
      payload.email = admissionRecord.email;
    }

    const response = await fetch(FORMSUBMIT_AJAX_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`✓ Admission email notification sent to ${TARGET_EMAIL} and ${admissionRecord.email}`);
      return { success: true };
    } else {
      console.warn(`FormSubmit status: ${response.status}`);
      return { success: false, status: response.status };
    }
  } catch (err) {
    console.error('Failed to dispatch admission email notification:', err);
    return { success: false, error: err.message };
  }
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
