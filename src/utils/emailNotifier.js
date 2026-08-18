/**
 * IT HUNT - Automatic Email Notification Dispatcher
 * Sends real-time admission and registration emails to softtechithunt@gmail.com
 */

const TARGET_EMAIL = 'softtechithunt@gmail.com';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

/**
 * Send Email Notification when a candidate registers for Admission
 * @param {Object} admissionRecord 
 */
export async function sendAdmissionEmailNotification(admissionRecord) {
  if (!admissionRecord) return { success: false, error: 'Empty record' };

  const genderDobFormatted = `${admissionRecord.gender || 'Male'} | ${admissionRecord.dob || 'N/A'}`;
  const districtStateFormatted = `${(admissionRecord.district || 'PRAYAGRAJ').toUpperCase()}, UP`;

  const payload = {
    _subject: `🟢 🏛️ OFFICIAL ADMISSION PREVIEW: ${admissionRecord.candidateName || 'Candidate'} [Reg: ${admissionRecord.registrationNo}]`,
    _replyto: admissionRecord.email || TARGET_EMAIL,
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

  try {
    const response = await fetch(FORMSUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`✓ Admission email notification sent to ${TARGET_EMAIL}`);
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

  try {
    await fetch(FORMSUBMIT_URL, {
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

  try {
    await fetch(FORMSUBMIT_URL, {
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
