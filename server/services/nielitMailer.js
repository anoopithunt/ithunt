/**
 * IT HUNT - Server-Side NIELIT Project Email Mailer
 * ─────────────────────────────────────────────────
 * Priority:
 *   1. nodemailer via Gmail SMTP  (needs SMTP_USER + SMTP_PASS / GMAIL_APP_PASSWORD)
 *   2. Resend API                 (needs RESEND_API_KEY)
 *   3. Log-only fallback          (no credentials → prints details to console)
 *
 * All three paths generate the 4-page pdfkit PDF and attach it.
 */

import nodemailer  from 'nodemailer';
import PDFDocument from 'pdfkit';

// ── Helpers to get fresh, sanitized credentials & recipients ──────────────────
function getSmtpCredentials() {
  const user = (process.env.SMTP_USER || process.env.GMAIL_USER || process.env.CONTACT_EMAIL || '').trim();
  const rawPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS || '';
  const pass = rawPass.replace(/\s+/g, '');
  return { user, pass };
}

function getAdminRecipients() {
  const list = [
    process.env.ADMIN_EMAIL,
    process.env.CONTACT_EMAIL || 'softtechithunt@gmail.com',
    process.env.SMTP_USER
  ].filter(Boolean).map(e => e.trim().toLowerCase());
  return Array.from(new Set(list));
}

const FROM_NAME = 'IT HUNT Academy';

// ── Date formatter ────────────────────────────────────────────────────────────
function fmtDate(d) {
  if (!d) return new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  const str = String(d).trim();
  try {
    const dt = new Date(str);
    if (!isNaN(dt)) {
      const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return `${String(dt.getDate()).padStart(2,'0')}-${M[dt.getMonth()]}-${dt.getFullYear()}`;
    }
  } catch (_) {}
  return str;
}

// ── 4-Page NIELIT PDF generator (pdfkit — pure Node.js) ──────────────────────
export function generateNielitPdfBuffer(data) {
  return new Promise((resolve, reject) => {
    try {
      const chunks = [];
      const doc = new PDFDocument({ size: 'A4', margin: 55, bufferPages: true });
      doc.on('data', c => chunks.push(c));
      doc.on('end',  () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const W  = doc.page.width;
      const M  = 55;
      const CW = W - M * 2;

      const name      = (data.candidateName || data.studentName || 'Candidate').toUpperCase();
      const father    = data.fatherName        || 'N/A';
      const regNo     = data.nielitRegNo       || data.registrationNo || 'N/A';
      const level     = data.nielitLevel       || data.level          || 'A';
      const title     = data.projectTitle      || 'N/A';
      const guide     = data.guideName         || 'N/A';
      const guideQual = data.guideQualification|| 'MCA';
      const guideDesig= data.guideDesignation  || 'N/A';
      const guidePlace= data.guidePlace        || 'Prayagraj';
      const guideAddr = data.guideAddress      || 'Prayagraj, UP';
      const projDate  = fmtDate(data.projectDate);
      const payDate   = fmtDate(data.paymentDate);
      const utr       = data.utrNumber         || data.utrNo          || 'N/A';
      const acHolder  = data.accountHolderName || name;
      const amount    = data.amount            || '1000';
      const remark    = data.paymentRemark     || 'Paid';
      const address   = data.address           || 'N/A';
      const district  = data.district          || 'N/A';
      const state     = data.state             || 'Uttar Pradesh';
      const pin       = data.pin               || 'N/A';
      const mobile    = data.mobile            || 'N/A';
      const email     = (data.email            || 'N/A').toUpperCase();

      // ── PAGE 1: Annexure II ─────────────────────────────────────────────
      doc.font('Helvetica-Bold').fontSize(11).text('Annexure – II', { align: 'right' });
      doc.moveDown(0.5);
      doc.text('PERFORMA FOR A / B / C Level PROJECT CERTIFICATE', { align: 'center' });
      doc.text('FROM PROJECT GUIDE / ACCREDITED INSTITUTE', { align: 'center' });
      doc.font('Helvetica').fontSize(10).text('[For Direct as well as candidate from Accredited Institute]', { align: 'center' });
      doc.moveDown();
      doc.fontSize(11).text(
        `This is to certify that the Project / Dissertation entitled "${title}" a bonafide work done by ` +
        `Mr. / Ms. ${name} (NIELIT Registration No: ${regNo}) in partial fulfilment of ${level} Level examination ` +
        `and has been carried out under my direct supervision and guidance. This report or a similar report on the ` +
        `topic has not been submitted for any other examination and does not form a part of any other course undergone by the candidate.`,
        { width: CW }
      );
      doc.moveDown(1.5);
      doc.text('_______________________');
      doc.text('Signature of Guide / Supervisor');
      doc.moveDown(0.5);
      doc.font('Helvetica-Bold').text(`Name: ${guide}`);
      doc.font('Helvetica').text(`Place: ${guidePlace}`);
      doc.text(`Designation: ${guideDesig}`);
      doc.text(`Date: ${projDate}`);
      doc.text(`Address: ${guideAddr}`);
      doc.moveDown(1);
      doc.font('Helvetica-Bold').text('Signature of Center Manager');
      doc.font('Helvetica').fontSize(9).text('[in case of a candidate from Accredited Institute]');

      // ── PAGE 2: Annexure III ────────────────────────────────────────────
      doc.addPage();
      doc.font('Helvetica-Bold').fontSize(11).text('Annexure- III', { align: 'right' });
      doc.moveDown(0.5);
      doc.text('PERFORMA OF COVERING LETTER TO THE PROJECT REPORT', { align: 'center', underline: true });
      doc.moveDown();
      ['Controller of Examinations,','NIELIT,','Plot No.3, PSP Pocket','Dwarka, Sector-8','New Delhi – 110077']
        .forEach(l => doc.text(l));
      doc.moveDown();
      doc.text('Sir,');
      doc.font('Helvetica').fontSize(11).text(`I am submitting my ${level} level Project for evaluation. Details of my Registration and postal address, etc is as under:`);
      doc.moveDown();
      doc.font('Helvetica-Bold').text(`Regn.No: ${regNo}`);
      doc.text(`Level - ${level}`);
      doc.moveDown(0.3);
      doc.text(`Name: Mr. ${name}`);
      doc.text(`Father's Name: Mr. ${father}`);
      doc.moveDown(0.3);
      doc.text('Address:');
      doc.text(`(a) Residential Address: ${address}`);
      doc.text(`    District: ${district}`);
      doc.text(`    State: ${state},  Pin: ${pin}`);
      doc.moveDown(0.3);
      doc.text(`Mob No: ${mobile}`);
      doc.moveDown(0.3);
      doc.font('Helvetica-Bold').text('E-mail Address (in block letters only): ', { continued: true });
      doc.fillColor('blue').text(email).fillColor('black');

      // ── PAGE 3: Project Completion Certificate ──────────────────────────
      doc.addPage();
      doc.font('Helvetica-Bold').fontSize(11)
         .text('Proforma of the Project Completion Certificate', { align: 'center', underline: true });
      doc.moveDown();
      doc.font('Helvetica').fontSize(10).text(
        `This is to certify that the Project work done at "${title}" By Mr./Ms. ${name} ` +
        `(NIELIT Registration No. ${regNo}) in partial fulfillment of NIELIT '${level}' Level Examination ` +
        `has been found satisfactory. This report has not been submitted for any other examination and does ` +
        `not form part of any other course undergone by the candidate.`,
        { width: CW }
      );
      doc.moveDown(0.5);
      doc.text(`It is further certified that he/she has appeared in all the four modules of NIELIT '${level}' level Examination.`);
      doc.moveDown(1.5);
      doc.text('Signature');
      doc.text('Name:');
      doc.text('Head of the Organization/Division:');
      doc.moveDown(0.3);
      doc.font('Helvetica-Bold').text(`Name of the Guide/Supervisor: ${guide}`);
      doc.text(`Qualification: ${guideQual}`);
      doc.font('Helvetica').fontSize(9).text('(Self attested copy of the qualification of the guide/Supervisor to be attached)');

      // Fee table
      doc.moveDown(1);
      doc.fontSize(10).font('Helvetica').text('Fees Details: -');
      doc.moveDown(0.5);
      const tX = M, tY = doc.y, tW = CW, rH = 20;
      const cols = [55, 85, tW - 140];
      const hdrs = ['Payment Date', 'UTR Number', 'Account Holder Name'];
      const vals  = [payDate, utr, acHolder];
      doc.rect(tX, tY, tW, rH).stroke();
      let cx = tX;
      hdrs.forEach((h, i) => {
        doc.font('Helvetica-Bold').fontSize(9).text(h, cx + 3, tY + 6, { width: cols[i] - 6 });
        cx += cols[i];
        if (i < hdrs.length - 1) doc.moveTo(cx, tY).lineTo(cx, tY + rH * 2).stroke();
      });
      const dY = tY + rH;
      doc.rect(tX, dY, tW, rH).stroke();
      cx = tX;
      vals.forEach((v, i) => {
        doc.font('Helvetica').fontSize(9).text(String(v), cx + 3, dY + 6, { width: cols[i] - 6, ellipsis: true });
        cx += cols[i];
      });

      // ── PAGE 4: Landscape fee table ─────────────────────────────────────
      doc.addPage({ size: 'A4', layout: 'landscape', margin: 40 });
      const lW = doc.page.width, lM = 40, lCW = lW - lM * 2;
      const colPt  = [34, 71, 147, 42, 51, 96, 136, 125, 54];
      const candW  = colPt.slice(0,4).reduce((a,b) => a+b, 0);
      const payW   = lCW - candW;
      const rH4    = 24;
      const totalH = rH4 * 5;
      const sY     = (doc.page.height - totalH) / 2 - 20;

      doc.rect(lM, sY, lCW, totalH).stroke();
      doc.font('Helvetica-Bold').fontSize(11).text('O/A/B/C Project Fee Details', lM, sY + 7, { width: lCW, align: 'center' });
      doc.moveTo(lM, sY + rH4).lineTo(lM + lCW, sY + rH4).stroke();

      const r2Y = sY + rH4;
      doc.fontSize(10).text('NIELIT HQ, NEW DELHI', lM, r2Y + 7, { width: lCW, align: 'center' });
      doc.moveTo(lM, r2Y + rH4).lineTo(lM + lCW, r2Y + rH4).stroke();

      const r3Y = r2Y + rH4;
      doc.fontSize(9).text('Candidate Details', lM, r3Y + 8, { width: candW, align: 'center' });
      doc.text('Payment Details', lM + candW, r3Y + 8, { width: payW, align: 'center' });
      doc.moveTo(lM + candW, r3Y).lineTo(lM + candW, r3Y + rH4 * 3).stroke();
      doc.moveTo(lM, r3Y + rH4).lineTo(lM + lCW, r3Y + rH4).stroke();

      const r4Y = r3Y + rH4;
      const colHdrs = ['S. No.','Regn. No.','Name of Cand.','Level','Amount','Transaction Date','Transaction No/UTR','Payment Sender Name','Remark'];
      let cx4 = lM;
      colHdrs.forEach((h, i) => {
        doc.font('Helvetica-Bold').fontSize(8).text(h, cx4 + 2, r4Y + 8, { width: colPt[i] - 4, align: 'center' });
        if (i > 0) doc.moveTo(cx4, r4Y).lineTo(cx4, r4Y + rH4 * 2).stroke();
        cx4 += colPt[i];
      });
      doc.moveTo(lM, r4Y + rH4).lineTo(lM + lCW, r4Y + rH4).stroke();

      const r5Y = r4Y + rH4;
      const colVals = ['1.', regNo, `Mr. ${name}`, level, `₹${amount}`, payDate, utr, acHolder, remark];
      let cx5 = lM;
      colVals.forEach((v, i) => {
        doc.font('Helvetica').fontSize(8).text(String(v), cx5 + 2, r5Y + 8, { width: colPt[i] - 4, align: 'center', ellipsis: true });
        cx5 += colPt[i];
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

// ── Email body helpers ────────────────────────────────────────────────────────
function adminBody(d, regNo, level, title, payDate, utr) {
  return `New NIELIT Project submitted on ithunt.vercel.app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NIELIT PROJECT SUBMISSION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Registration No   : ${regNo}
NIELIT Level      : ${level}
Candidate Name    : ${d.candidateName || d.studentName || 'N/A'}
Father's Name     : ${d.fatherName || 'N/A'}
Project Title     : ${title}
Guide/Supervisor  : ${d.guideName || 'N/A'} (${d.guideQualification || 'N/A'})
Mobile            : ${d.mobile || 'N/A'}
Email             : ${d.email || 'N/A'}
Address           : ${d.address || 'N/A'}, ${d.district || ''}, ${d.state || ''} - ${d.pin || ''}
Payment UTR No    : ${utr}
Payment Date      : ${payDate}
Amount            : ₹${d.amount || '1000'}
Payment Sender    : ${d.accountHolderName || 'N/A'}
Submitted At      : ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4-page NIELIT project form PDF is attached.

IT HUNT Software Solutions & Tech Academy
https://ithunt.vercel.app`;
}

function studentBody(d, regNo, level, title, payDate, utr) {
  return `Dear ${d.candidateName || d.studentName || 'Candidate'},

Your NIELIT ${level} Level Project has been successfully submitted.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUBMISSION CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Registration No   : ${regNo}
NIELIT Level      : ${level}
Project Title     : ${title}
Guide/Supervisor  : ${d.guideName || 'N/A'}
Submission Date   : ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
Payment UTR       : ${utr}
Amount Paid       : ₹${d.amount || '1000'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your 4-page NIELIT Project Submission form is attached as a PDF.
Keep it for your records.

For queries:
📞 +91 9795771806
📧 softtechithunt@gmail.com
🌐 https://ithunt.vercel.app

Warm regards,
IT HUNT Software Solutions & Tech Academy`;
}

// ── SENDER 1: nodemailer Gmail SMTP ──────────────────────────────────────────
async function sendViaSmtp(to, subject, text, attachments) {
  const { user, pass } = getSmtpCredentials();
  if (!user || !pass) throw new Error('Missing SMTP credentials');

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass }
  });
  await transporter.verify();
  return await transporter.sendMail({
    from: `"${FROM_NAME}" <${user}>`,
    to,
    subject,
    text,
    attachments
  });
}

// ── SENDER 2: Resend API ──────────────────────────────────────────────────────
async function sendViaResend(to, subject, text, pdfBuffer, filename) {
  const resendKey = (process.env.RESEND_API_KEY || '').trim();
  const { Resend } = await import('resend');
  const resend = new Resend(resendKey);
  const attachments = pdfBuffer
    ? [{ filename, content: pdfBuffer }]
    : [];
  const result = await resend.emails.send({
    from: `${FROM_NAME} <onboarding@resend.dev>`,
    to,
    subject,
    text,
    attachments
  });
  if (result.error) throw new Error(result.error.message || JSON.stringify(result.error));
  return result;
}

// ── MAIN export ───────────────────────────────────────────────────────────────
export async function sendNielitProjectEmail(projectRecord) {
  if (!projectRecord) return { success: false, error: 'No project record' };

  const regNo    = projectRecord.nielitRegNo || projectRecord.registrationNo || 'N/A';
  const level    = projectRecord.nielitLevel || projectRecord.level || 'A';
  const title    = projectRecord.projectTitle || 'N/A';
  const utr      = projectRecord.utrNumber   || projectRecord.utrNo || 'N/A';
  const payDate  = fmtDate(projectRecord.paymentDate);
  const candName = projectRecord.candidateName || projectRecord.studentName || 'Candidate';
  const stuEmail = (projectRecord.email || '').trim();
  const filename = `NIELIT_Project_${regNo}_${candName.replace(/[^a-zA-Z0-9]/g,'_')}.pdf`;
  const adminSubject = `[ADMIN] NIELIT Project Submitted – ${candName} [${regNo}] (${level} Level)`;
  const stuSubject   = `NIELIT Project Submission Confirmed – ${candName} [${regNo}]`;

  // Generate PDF
  let pdfBuffer = null;
  try {
    pdfBuffer = await generateNielitPdfBuffer(projectRecord);
    console.log(`✓ NIELIT PDF generated: ${filename} (${(pdfBuffer.length/1024).toFixed(1)} KB)`);
  } catch (pdfErr) {
    console.warn('⚠ PDF generation error:', pdfErr.message);
  }

  const attachments = pdfBuffer
    ? [{ filename, content: pdfBuffer, contentType: 'application/pdf' }]
    : [];

  const { user: smtpUser, pass: smtpPass } = getSmtpCredentials();
  const adminRecipients = getAdminRecipients();
  const resendKey = (process.env.RESEND_API_KEY || '').trim();

  // ── Try Gmail SMTP ─────────────────────────────────────────────────────────
  if (smtpUser && smtpPass) {
    try {
      // Send to Admin recipient(s)
      for (const adminTo of adminRecipients) {
        await sendViaSmtp(adminTo, adminSubject, adminBody(projectRecord, regNo, level, title, payDate, utr), attachments);
        console.log(`📧 NIELIT admin copy sent to: ${adminTo}`);
      }
      // Send to Student if email provided and not already in admin list
      if (stuEmail && stuEmail.includes('@') && !adminRecipients.includes(stuEmail.toLowerCase())) {
        await sendViaSmtp(stuEmail, stuSubject, studentBody(projectRecord, regNo, level, title, payDate, utr), attachments);
        console.log(`📧 NIELIT student confirmation sent to: ${stuEmail}`);
      }
      console.log(`✅ NIELIT emails sent via Gmail SMTP (PDF attached: ${!!pdfBuffer})`);
      return { success: true, method: 'smtp', pdfAttached: !!pdfBuffer };
    } catch (smtpErr) {
      console.warn('⚠ Gmail SMTP failed:', smtpErr.message, '— trying Resend...');
    }
  }

  // ── Try Resend API ─────────────────────────────────────────────────────────
  if (resendKey) {
    try {
      for (const adminTo of adminRecipients) {
        await sendViaResend(adminTo, adminSubject, adminBody(projectRecord, regNo, level, title, payDate, utr), pdfBuffer, filename);
      }
      if (stuEmail && stuEmail.includes('@') && !adminRecipients.includes(stuEmail.toLowerCase())) {
        await sendViaResend(stuEmail, stuSubject, studentBody(projectRecord, regNo, level, title, payDate, utr), pdfBuffer, filename);
      }
      console.log(`✅ NIELIT emails sent via Resend (PDF attached: ${!!pdfBuffer})`);
      return { success: true, method: 'resend', pdfAttached: !!pdfBuffer };
    } catch (resendErr) {
      console.warn('⚠ Resend failed:', resendErr.message);
    }
  }

  // ── No credentials configured ──────────────────────────────────────────────
  console.error(`
❌ NO EMAIL CREDENTIALS CONFIGURED — email not sent.
   Add one of these to your .env / Vercel Environment Variables:

   Option A – Gmail App Password (recommended):
     SMTP_USER = softtechithunt@gmail.com
     SMTP_PASS = xxxx xxxx xxxx xxxx   ← 16-char App Password from myaccount.google.com/apppasswords

   Option B – Resend API key (free tier: 100 emails/day):
     RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxx
     Get it free at: https://resend.com/signup

   NIELIT submission was saved to MongoDB. Reg No: ${regNo}
  `);

  return {
    success: false,
    method: 'none',
    pdfAttached: false,
    error: 'No email credentials configured. Add SMTP_PASS or RESEND_API_KEY to env.'
  };
}

export default { sendNielitProjectEmail, generateNielitPdfBuffer };
