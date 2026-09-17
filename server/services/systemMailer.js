import nodemailer from 'nodemailer';

function getSmtpCredentials() {
  const user = (process.env.SMTP_USER || process.env.GMAIL_USER || process.env.CONTACT_EMAIL || '').trim();
  const rawPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS || '';
  const pass = rawPass.replace(/\s+/g, '');
  return { user, pass };
}

function getAdminRecipients() {
  const list = [
    process.env.ADMIN_EMAIL,
    process.env.CONTACT_EMAIL,
    process.env.SMTP_USER,
    'softtechithunt@gmail.com'
  ].filter(Boolean).map(e => e.trim().toLowerCase());
  return Array.from(new Set(list));
}

const FROM_NAME = 'IT HUNT Academy';

async function sendMail({ to, subject, text, html, fromAddress = null, replyTo = null }) {
  const { user, pass } = getSmtpCredentials();
  if (!user || !pass || !to) {
    console.warn('[SystemMailer] Skipping email send — SMTP_USER or SMTP_PASS not set in environment variables.');
    return { success: false, reason: 'Missing credentials or recipient' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass }
    });
    await transporter.verify();
    const info = await transporter.sendMail({
      from: fromAddress || `"${FROM_NAME}" <${user}>`,
      to,
      replyTo: replyTo || (fromAddress ? fromAddress : user),
      subject,
      text,
      html
    });
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.warn(`[SystemMailer] Failed to send email to ${to}:`, err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Send Admission notification emails to candidate and admin
 */
export async function sendAdmissionNotificationEmail(adm) {
  if (!adm) return { success: false };

  const candName = adm.candidateName || adm.fullName || 'Student';
  const regNo = adm.registrationNo || adm.registrationNumber || adm.id || 'ITH-2026';
  const course = adm.course || adm.track || 'Software Engineering & IT';
  const stuEmail = (adm.email || '').trim();
  const mobile = adm.mobile || adm.phone || 'N/A';
  const date = adm.date || new Date().toLocaleDateString('en-GB');

  const stuSubject = `🎓 Admission Application Received - IT HUNT Academy [Reg: ${regNo}]`;
  const stuText = `Dear ${candName},

Thank you for applying to IT HUNT Software Solutions & Tech Academy!

Your admission application has been successfully recorded in our system.

==================================================
           ADMISSION REGISTRATION DETAILS
==================================================
Registration ID : ${regNo}
Candidate Name  : ${candName}
Enrolled Course : ${course}
Mobile Number   : ${mobile}
Application Date: ${date}
Status          : ${adm.status || 'Pending Verification'}

Student Portal  : https://ithunt.vercel.app/#login
User ID         : ${adm.userId || adm.enrollmentNumber || stuEmail}
Default Password: ${adm.password || 'Ithunt@123'}

Our academic directorate will review your particulars and confirm your lab workstation and batch schedule.

Campus: IT HUNT Software Studio, Dahiyawa Holagarh, Prayagraj (Allahabad), UP
Helpline: +91 9795771806 | softtechithunt@gmail.com

Warm regards,
Academic Admissions Directorate
IT HUNT Software Solutions & Tech Academy`;

  const stuHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #0d1117; color: #e6edf3; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #161b22; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1f242c 0%, #0d1117 100%); padding: 24px; text-align: center; border-bottom: 2px solid #3b82f6; }
    .header h1 { margin: 0; color: #60a5fa; font-size: 22px; }
    .body { padding: 24px; line-height: 1.6; }
    .info-box { background: #0d1117; border: 1px solid #21262d; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #21262d; font-size: 14px; }
    .row:last-child { border-bottom: none; }
    .label { color: #8b949e; }
    .val { color: #f0f6fc; font-weight: 600; }
    .footer { padding: 16px; background: #0d1117; font-size: 12px; color: #8b949e; text-align: center; border-top: 1px solid #21262d; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>IT HUNT Tech Academy</h1>
      <p style="margin: 4px 0 0 0; color: #8b949e; font-size: 13px;">Online Admission Portal • ISO 9001:2015 Accredited</p>
    </div>
    <div class="body">
      <h2 style="color: #f0f6fc; font-size: 18px; margin-top: 0;">Dear ${candName},</h2>
      <p>Congratulations! Your admission application for <strong>${course}</strong> has been received and registered in our database.</p>
      <div class="info-box">
        <div class="row"><span class="label">Registration ID:</span><span class="val" style="color: #60a5fa; font-family: monospace;">${regNo}</span></div>
        <div class="row"><span class="label">Course:</span><span class="val">${course}</span></div>
        <div class="row"><span class="label">Mobile:</span><span class="val">${mobile}</span></div>
        <div class="row"><span class="label">Email:</span><span class="val">${stuEmail}</span></div>
        <div class="row"><span class="label">Status:</span><span class="val" style="color: #22c55e;">${adm.status || 'Pending Verification'}</span></div>
        <div class="row"><span class="label">Portal User ID:</span><span class="val">${adm.userId || adm.enrollmentNumber || stuEmail}</span></div>
        <div class="row"><span class="label">Portal Password:</span><span class="val">${adm.password || 'Ithunt@123'}</span></div>
      </div>
      <p style="font-size: 13px; color: #8b949e;">You can access your student dashboard at <a href="https://ithunt.vercel.app/#login" style="color: #58a6ff;">ithunt.vercel.app/#login</a>.</p>
    </div>
    <div class="footer">
      <strong>IT HUNT Software Solutions & Tech Academy</strong><br>
      📍 Dahiyawa Holagarh, Prayagraj, UP | 📞 +91 9795771806
    </div>
  </div>
</body>
</html>`;

  // 1. Send confirmation to student
  if (stuEmail && stuEmail.includes('@')) {
    await sendMail({ to: stuEmail, subject: stuSubject, text: stuText, html: stuHtml });
    console.log(`📧 Admission confirmation sent to student: ${stuEmail}`);
  }

  // 2. Send notification to admin(s)
  const adminSubject = `👑 [NEW ADMISSION] ${candName} [${regNo}] - ${course}`;
  const adminText = `A new student admission has been submitted on IT HUNT Portal:
Candidate: ${candName}
Reg No   : ${regNo}
Course   : ${course}
Mobile   : ${mobile}
Email    : ${stuEmail}
Address  : ${adm.address || 'N/A'}, ${adm.district || ''}
Timestamp: ${date}`;

  const fallbackFrom = process.env.SMTP_USER || process.env.CONTACT_EMAIL || 'softtechithunt@gmail.com';
  const studentFrom = (stuEmail && stuEmail.includes('@'))
    ? `"${candName} (${stuEmail})" <${stuEmail}>`
    : `"${candName} (via IT HUNT)" <${fallbackFrom}>`;

  for (const adminTo of getAdminRecipients()) {
    await sendMail({
      to: adminTo,
      subject: adminSubject,
      text: adminText,
      fromAddress: studentFrom,
      replyTo: stuEmail || undefined
    });
    console.log(`📧 Admission admin alert sent to: ${adminTo} (From: ${studentFrom})`);
  }

  return { success: true };
}

/**
 * Send Contact form inquiry emails to admin and inquirer
 */
export async function sendContactNotificationEmail(inquiry) {
  if (!inquiry) return { success: false };

  const name = inquiry.name || inquiry.fullName || 'Inquirer';
  const email = (inquiry.email || '').trim();
  const phone = inquiry.phone || inquiry.mobile || 'N/A';
  const subject = inquiry.subject || 'Course Enquiry';
  const message = inquiry.message || '';

  // 1. Acknowledgment to user
  if (email && email.includes('@')) {
    const ackSubject = `Thank you for contacting IT HUNT Tech Academy [${subject}]`;
    const ackText = `Dear ${name},

Thank you for reaching out to IT HUNT Software Solutions & Tech Academy!

We have received your message:
Subject: ${subject}
Message: ${message}

Our team will review your inquiry and get back to you shortly.

Helpline: +91 9795771806 | softtechithunt@gmail.com
Website: https://ithunt.vercel.app`;
    await sendMail({ to: email, subject: ackSubject, text: ackText });
    console.log(`📧 Contact inquiry acknowledgment sent to: ${email}`);
  }

  // 2. Alert to admin with From: Inquirer's email
  const adminSubject = `📩 [NEW INQUIRY] from ${name} - ${subject}`;
  const adminText = `New contact inquiry received:
Name   : ${name}
Email  : ${email}
Phone  : ${phone}
Subject: ${subject}
Message:
${message}`;

  const inquirerFrom = (email && email.includes('@'))
    ? `"${name} (${email})" <${email}>`
    : `"${name} (via IT HUNT)" <${fallbackFrom}>`;

  for (const adminTo of getAdminRecipients()) {
    await sendMail({
      to: adminTo,
      subject: adminSubject,
      text: adminText,
      fromAddress: inquirerFrom,
      replyTo: email || undefined
    });
    console.log(`📧 Contact inquiry sent to admin: ${adminTo} (From: ${inquirerFrom})`);
  }

  return { success: true };
}
