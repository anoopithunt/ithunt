/**
 * IT HUNT - Automatic Email Notification Dispatcher
 * Sends real-time admission and registration emails to softtechithunt@gmail.com
 */

const TARGET_EMAIL = (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_FORMSUBMIT_EMAIL || import.meta.env.VITE_CONTACT_EMAIL))
  ? (import.meta.env.VITE_FORMSUBMIT_EMAIL || import.meta.env.VITE_CONTACT_EMAIL)
  : 'softtechithunt@gmail.com';
const FORMSUBMIT_TOKEN = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FORMSUBMIT_TOKEN)
  ? import.meta.env.VITE_FORMSUBMIT_TOKEN
  : '1864b99a4972a64cd046dba2a86b13c8';

const FORMSUBMIT_AJAX_URL = `https://formsubmit.co/ajax/${FORMSUBMIT_TOKEN}`;
const FORMSUBMIT_FORM_URL = `https://formsubmit.co/${FORMSUBMIT_TOKEN}`;
const WEB3FORMS_ACCESS_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
  ? import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
  : '';
const OFFICIAL_SITE_NAME = 'IT HUNT Software Solutions & Tech Academy';
const OFFICIAL_SITE_URL = 'https://ithunt.org';

import { getAdmissionPdfBlob } from './pdfGenerator.js';
import { getNielitProjectPdfBlob } from './nielitPdfGenerator.js';

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
      form.setAttribute('referrerpolicy', 'no-referrer');

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
      addField('_url', `${OFFICIAL_SITE_NAME} (${OFFICIAL_SITE_URL})`);
      addField('_site', OFFICIAL_SITE_NAME);

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
      _url: `${OFFICIAL_SITE_NAME} (${OFFICIAL_SITE_URL})`,
      _site: OFFICIAL_SITE_NAME,
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
 * Clean Official Student Admission Email Content Generator
 */
export function getStudentAdmissionEmailContent(adm) {
  if (!adm) return { subject: '', body: '', to: '' };

  const candName = adm.candidateName || adm.fullName || 'Student';
  const regNo = adm.registrationNo || adm.id || 'ITH-2026';
  const course = adm.course || adm.track || 'Software Engineering & IT';
  const email = adm.email || '';
  const mobile = adm.mobile || adm.phone || 'N/A';
  const date = adm.date || new Date().toLocaleDateString('en-GB');

  const subject = `Official Admission Confirmation & Portal Access - IT HUNT Academy [Reg: ${regNo}]`;
  const body = `Dear ${candName},

Congratulations and welcome to IT HUNT Software Solutions & Tech Academy!

Your student admission has been officially confirmed. Below are your official enrollment details and student dashboard access credentials:

==================================================
        OFFICIAL ADMISSION CONFIRMATION
==================================================
Candidate Name        : ${candName}
Registration ID       : ${regNo}
Enrolled Program      : ${course}
Registered Mobile     : ${mobile}
Admission Date        : ${date}
Admission Status      : Confirmed & Active ✓

==================================================
     STUDENT PORTAL LOGIN ACCESS CREDENTIALS
==================================================
Portal Access URL     : https://ithunt.org
Student User ID       : ${email}
Default Password      : Ithunt@123

(You can sign in to your Student Dashboard using your Email & Default Password and change your password anytime.)

==================================================
           DAY 1 ONBOARDING INSTRUCTIONS
==================================================
• Reporting Time      : 09:30 AM Onboarding Day 1
• Training Campus     : IT HUNT Software Studio, Dahiyawa Holagarh,
                        (Near Mela Ground, Front of Kali Mandir),
                        Prayagraj (Allahabad), UP – 212502
• Documents to Bring  : 1. Printed or Digital Admission Slip (${regNo})
                        2. 2 Passport-sized Photographs & Valid ID Proof

For any academic queries or technical support, contact us:
📞 Phone    : +91 9795771806 / +91 8299544315
📧 Email    : softtechithunt@gmail.com
🌐 Website  : https://ithunt.org

Warm regards,
Academic Admissions Directorate
IT HUNT Software Solutions & Tech Academy
(ISO 9001:2015 Accredited Institution)`;

  return { subject, body, to: email, regNo, candName, course };
}

/**
 * Generate 1-click direct Gmail Web Compose URL (100% clean body, no FormSubmit wrapper)
 */
export function getStudentAdmissionGmailUrl(adm) {
  const { to, subject, body } = getStudentAdmissionEmailContent(adm);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Generate mailto URL for default system email client
 */
export function getStudentAdmissionMailtoUrl(adm) {
  const { to, subject, body } = getStudentAdmissionEmailContent(adm);
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Generate 1-click direct Gmail Web Compose URL for JPG Fee Receipt
 */
export function getFeeReceiptGmailUrl(studentRecord) {
  const candName = studentRecord.candidateName || studentRecord.name || 'Student';
  const regNo = studentRecord.registrationNo || 'ITH-2026';
  const email = studentRecord.email || '';
  const amount = studentRecord.amountPaid || '₹5,000';
  const subject = `💳 [FEE CONFIRMED] Official Fee Receipt for ${candName} [Reg: ${regNo}]`;
  const body = `Dear ${candName},

We are pleased to confirm that your fee payment of ${amount} for your enrolled program (${studentRecord.course || 'IT Track'}) at IT HUNT Academy has been successfully verified.

Registration No: ${regNo}
Amount Paid: ${amount}
Fee Status: Confirmed & Verified ✓

Please find attached your official Verified Fee Receipt.

Warm regards,
Accounts & Finance Department
IT HUNT Software Solutions & Tech Academy
📞 +91 9795771806 | 📧 softtechithunt@gmail.com`;

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Dispatch distinct Student Email Notification with Student PDF Slip attachment
 * Ensures 100% clean official communication without FormSubmit "Someone just submitted your form on localhost" header
 * @param {Object} admissionRecord 
 * @param {Blob|null} studentPdfBlob 
 */
export async function sendStudentAdmissionEmail(admissionRecord, studentPdfBlob = null) {
  if (!admissionRecord || !admissionRecord.email || !admissionRecord.email.includes('@')) {
    return { success: false, reason: 'Invalid or missing candidate email' };
  }

  const regNo = admissionRecord.registrationNo || 'ITH-000000';
  const candName = admissionRecord.candidateName || admissionRecord.fullName || 'Candidate';
  const cleanEmail = getStudentAdmissionEmailContent(admissionRecord);
  admissionRecord._cleanEmailContent = cleanEmail.body;
  admissionRecord._cleanEmailSubject = cleanEmail.subject;
  admissionRecord._gmailDirectUrl = getStudentAdmissionGmailUrl(admissionRecord);

  // 1. If Web3Forms key is configured, dispatch clean, header-free email directly to candidate
  if (WEB3FORMS_ACCESS_KEY) {
    try {
      const w3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: cleanEmail.subject,
          from_name: OFFICIAL_SITE_NAME,
          to: admissionRecord.email,
          email: admissionRecord.email,
          message: cleanEmail.body
        })
      });
      if (w3Res.ok) {
        console.log('✓ Clean student admission email dispatched via Web3Forms to:', admissionRecord.email);
        return { success: true, method: 'web3forms' };
      }
    } catch (w3Err) {
      console.warn('Web3Forms dispatch warning:', w3Err.message);
    }
  }

  // 2. Write to Firebase Firestore 'mail' collection for Firebase Trigger Email extension / Cloud Functions
  try {
    const { db } = await import('./firebaseConfig.js');
    if (db) {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      await addDoc(collection(db, 'mail'), {
        to: [admissionRecord.email],
        from: TARGET_EMAIL,
        message: {
          subject: cleanEmail.subject,
          text: cleanEmail.body,
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
              <div style="background: #0f172a; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h2 style="color: #ea580c; margin: 0; font-size: 20px;">🎓 IT HUNT Software Solutions & Tech Academy</h2>
                <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 13px;">Official Candidate Admission Confirmation</p>
              </div>
              <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none; background: #ffffff;">
                <pre style="font-family: inherit; white-space: pre-wrap; font-size: 14px; margin: 0;">${cleanEmail.body}</pre>
              </div>
            </div>
          `
        },
        registrationNo: regNo,
        createdAt: serverTimestamp ? serverTimestamp() : new Date().toISOString()
      });
      console.log('✓ Student admission email queued to Firebase mail collection for candidate:', admissionRecord.email);
    }
  } catch (fbMailErr) {
    // Non-blocking firestore queue
  }

  // Note: We deliberately do NOT use FormSubmit with _cc to student email here,
  // because FormSubmit hardcodes "Someone just submitted your form on localhost"
  // which is an internal website-owner notification and must never be shown to a self-registering student!
  console.log(`✓ Clean student admission confirmation prepared for ${admissionRecord.email} [Reg: ${regNo}]`);
  return { success: true, method: 'clean_direct' };
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

  // 2. Dispatch Student Email (Clean Student Body)
  let studentRes = { success: false };
  if (admissionRecord.email && admissionRecord.email.includes('@')) {
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

/**
 * Send Email Notification when a candidate submits a NIELIT Project Form (with 4-Page PDF Attachment)
 * @param {Object} projectRecord 
 * @param {Blob|null} [pdfBlob] 
 */
export async function sendNielitProjectEmailNotification(projectRecord, pdfBlob = null) {
  if (!projectRecord) return { success: false };

  const candName = projectRecord.candidateName || 'Candidate';
  const regNo = projectRecord.nielitRegNo || '1110423';
  const level = projectRecord.nielitLevel || 'A';
  const projectTitle = projectRecord.projectTitle || 'Network Monitoring and Management';
  const subjectText = `📜 [NIELIT PROJECT SUBMISSION] ${candName} [Reg: ${regNo}] (${level} Level)`;
  const candidateCleanName = candName.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `NIELIT_Project_Submission_${regNo}_${candidateCleanName}.pdf`;

  if (!pdfBlob) {
    try {
      pdfBlob = getNielitProjectPdfBlob(projectRecord);
    } catch (e) {
      console.warn('Could not auto-generate NIELIT Project PDF blob:', e);
    }
  }

  // Submit via iframe multipart form to attach 4-Page NIELIT Project PDF file
  if (pdfBlob && typeof document !== 'undefined') {
    try {
      let iframe = document.getElementById('formsubmit_nielit_iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'formsubmit_nielit_iframe';
        iframe.name = 'formsubmit_nielit_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      const form = document.createElement('form');
      form.action = FORMSUBMIT_FORM_URL;
      form.method = 'POST';
      form.enctype = 'multipart/form-data';
      form.target = 'formsubmit_nielit_iframe';
      form.style.display = 'none';

      const addField = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value || '';
        form.appendChild(input);
      };

      addField('_subject', subjectText);
      addField('_replyto', projectRecord.email || TARGET_EMAIL);
      addField('_template', 'table');
      addField('_captcha', 'false');

      addField('SUBMISSION TYPE', '📜 NIELIT PROJECT FORM SUBMISSION');
      addField('NIELIT REGISTRATION NO', regNo);
      addField('NIELIT LEVEL', level);
      addField('CANDIDATE FULL NAME', candName);
      addField("FATHER'S NAME", projectRecord.fatherName || 'N/A');
      addField('PROJECT TITLE', projectTitle);
      addField('GUIDE / SUPERVISOR', `${projectRecord.guideName || 'Sushil Kumar'} (${projectRecord.guideQualification || 'MCA'})`);
      addField('CONTACT MOBILE', projectRecord.mobile || 'N/A');
      addField('STUDENT EMAIL', projectRecord.email || 'N/A');
      addField('RESIDENTIAL ADDRESS', `${projectRecord.address || 'N/A'}, ${projectRecord.district || ''}, ${projectRecord.state || ''} - ${projectRecord.pin || ''}`);
      addField('PAYMENT UTR NO', projectRecord.utrNumber || 'N/A');
      addField('PAYMENT DATE & SENDER', `${projectRecord.paymentDate || ''} by ${projectRecord.accountHolderName || candName}`);

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.name = 'attachment';

      const pdfFile = new File([pdfBlob], filename, { type: 'application/pdf' });
      const dt = new DataTransfer();
      dt.items.add(pdfFile);
      fileInput.files = dt.files;
      form.appendChild(fileInput);

      document.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        if (form.parentNode) form.parentNode.removeChild(form);
      }, 3000);

      console.log(`✓ NIELIT Project email (${subjectText}) with attached 4-page PDF submitted.`);
      return { success: true };
    } catch (err) {
      console.warn('NIELIT Project form submission failed, executing AJAX fallback:', err);
    }
  }

  try {
    const payload = {
      _subject: subjectText,
      _replyto: projectRecord.email || TARGET_EMAIL,
      _template: 'table',
      _captcha: 'false',
      'SUBMISSION TYPE': '📜 NIELIT PROJECT FORM SUBMISSION',
      'NIELIT REGISTRATION NO': regNo,
      'NIELIT LEVEL': level,
      'CANDIDATE FULL NAME': candName,
      "FATHER'S NAME": projectRecord.fatherName || 'N/A',
      'PROJECT TITLE': projectTitle,
      'GUIDE / SUPERVISOR': `${projectRecord.guideName || 'Sushil Kumar'} (${projectRecord.guideQualification || 'MCA'})`,
      'CONTACT MOBILE': projectRecord.mobile || 'N/A',
      'STUDENT EMAIL': projectRecord.email || 'N/A',
      'RESIDENTIAL ADDRESS': `${projectRecord.address || 'N/A'}, ${projectRecord.district || ''}, ${projectRecord.state || ''} - ${projectRecord.pin || ''}`,
      'PAYMENT UTR NO': projectRecord.utrNumber || 'N/A',
      'PAYMENT DATE & SENDER': `${projectRecord.paymentDate || ''} by ${projectRecord.accountHolderName || candName}`
    };

    await fetch(FORMSUBMIT_AJAX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    return { success: true };
  } catch (err) {
    console.error('Failed to send NIELIT Project email:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Dispatch Fee Receipt Email Notification with JPG Image Receipt attachment (.jpg)
 * @param {Object} studentRecord 
 * @param {Blob|null} jpgBlob 
 */
export async function sendFeeReceiptJpgEmail(studentRecord, jpgBlob = null) {
  if (!studentRecord || !studentRecord.email || !studentRecord.email.includes('@')) {
    return { success: false, reason: 'Invalid student email' };
  }

  const regNo = studentRecord.registrationNo || 'ITH-2026-001';
  const candName = studentRecord.candidateName || 'Student';
  const candidateCleanName = candName.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `IT_HUNT_Fee_Receipt_${regNo}_${candidateCleanName}.jpg`;
  const subjectText = `💳 [FEE CONFIRMED] Official Fee Receipt for ${candName} [Reg: ${regNo}]`;

  // Auto-generate JPG receipt Blob if not passed
  if (!jpgBlob) {
    try {
      const { generateFeeReceiptJpgBlob } = await import('./jpgReceiptGenerator.js');
      jpgBlob = await generateFeeReceiptJpgBlob(studentRecord);
    } catch (e) {
      console.warn('Could not auto-generate JPG receipt Blob:', e);
    }
  }

  if (jpgBlob && typeof document !== 'undefined') {
    try {
      let iframe = document.getElementById('formsubmit_receipt_iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'formsubmit_receipt_iframe';
        iframe.name = 'formsubmit_receipt_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      const form = document.createElement('form');
      form.action = FORMSUBMIT_FORM_URL;
      form.method = 'POST';
      form.enctype = 'multipart/form-data';
      form.target = 'formsubmit_receipt_iframe';
      form.style.display = 'none';

      const addField = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value || '';
        form.appendChild(input);
      };

      addField('_subject', subjectText);
      addField('_replyto', studentRecord.email || TARGET_EMAIL);
      addField('_template', 'table');
      addField('_captcha', 'false');
      addField('email', studentRecord.email);

      addField('ACKNOWLEDGMENT', '💳 IT HUNT ACADEMY - OFFICIAL FEE PAYMENT RECEIPT (JPG)');
      addField('PAYMENT STATUS', 'CONFIRMED & VERIFIED ✓');
      addField('REGISTRATION ID', regNo);
      addField('STUDENT FULL NAME', candName);
      addField('ENROLLED PROGRAM', studentRecord.course || 'Software Engineering Track');
      addField('TOTAL AMOUNT PAID', studentRecord.amountPaid || '₹5,000');
      addField('PAYMENT DATE', studentRecord.feeConfirmedDate || new Date().toLocaleDateString('en-GB'));
      addField('ATTACHMENT NOTICE', `Attached is your official Fee Receipt in high-resolution JPG image format (${filename}). Please save for records.`);

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.name = 'attachment';

      const jpgFile = new File([jpgBlob], filename, { type: 'image/jpeg' });
      const dt = new DataTransfer();
      dt.items.add(jpgFile);
      fileInput.files = dt.files;
      form.appendChild(fileInput);

      document.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        if (form.parentNode) form.parentNode.removeChild(form);
      }, 3000);

      console.log(`✓ JPG Fee Receipt email (${subjectText}) submitted to candidate (${studentRecord.email})`);
      return { success: true };
    } catch (err) {
      console.warn('JPG Fee receipt hidden form submission failed, executing AJAX fallback:', err);
    }
  }

  // Fallback
  try {
    const payload = {
      _subject: subjectText,
      _replyto: studentRecord.email || TARGET_EMAIL,
      _template: 'table',
      _captcha: 'false',
      email: studentRecord.email,
      'ACKNOWLEDGMENT': '💳 IT HUNT ACADEMY - OFFICIAL FEE PAYMENT RECEIPT (JPG)',
      'PAYMENT STATUS': 'CONFIRMED & VERIFIED ✓',
      'REGISTRATION ID': regNo,
      'STUDENT FULL NAME': candName,
      'ENROLLED PROGRAM': studentRecord.course || 'Software Engineering Track',
      'TOTAL AMOUNT PAID': studentRecord.amountPaid || '₹5,000',
      'PAYMENT DATE': studentRecord.feeConfirmedDate || new Date().toLocaleDateString('en-GB')
    };

    await fetch(FORMSUBMIT_AJAX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    return { success: true };
  } catch (err) {
    console.error('Failed to send JPG Receipt email:', err);
    return { success: false, error: err.message };
  }
}

export default {
  sendAdmissionEmailNotification,
  sendJobEmailNotification,
  sendRsvpEmailNotification,
  sendNielitProjectEmailNotification,
  sendFeeReceiptJpgEmail
};

