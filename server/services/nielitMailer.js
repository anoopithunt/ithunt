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
  const user = (process.env.SMTP_USER || process.env.GMAIL_USER || process.env.CONTACT_EMAIL || 'anoopmishrapitz@gmail.com').trim();
  const rawPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS || 'jbyadbnincvvwqwx';
  const pass = rawPass.replace(/\s+/g, '');
  return { user, pass };
}

function getAdminRecipients() {
  const list = [
    process.env.ADMIN_EMAIL,
    process.env.CONTACT_EMAIL || 'softtechithunt@gmail.com',
    process.env.SMTP_USER || 'anoopmishrapitz@gmail.com',
    'softtechithunt@gmail.com',
    'anoopmishrapitz@gmail.com'
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
      const rawLevel  = String(data.nielitLevel || data.level || 'O').trim();
      const level     = rawLevel.replace(/\s*Level/i, '').trim() || 'O';
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
      const remark    = 'Paid';
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
      doc.moveDown(1.5);
      doc.fontSize(10).font('Helvetica-Bold').text('Fees Details: -');
      doc.moveDown(0.5);

      const tX = M, tY = doc.y, tW = CW, rH = 26;
      const col1 = 140;
      const col2 = 180;
      const col3 = tW - col1 - col2;
      const dY = tY + rH;

      // Table grid lines
      doc.lineWidth(0.5).strokeColor('#000000');
      doc.rect(tX, tY, tW, rH * 2).stroke();
      doc.moveTo(tX, dY).lineTo(tX + tW, dY).stroke();
      doc.moveTo(tX + col1, tY).lineTo(tX + col1, tY + rH * 2).stroke();
      doc.moveTo(tX + col1 + col2, tY).lineTo(tX + col1 + col2, tY + rH * 2).stroke();

      // Table headers
      doc.font('Helvetica-Bold').fontSize(9.5);
      doc.text('Payment Date', tX + 8, tY + 8, { width: col1 - 16, lineBreak: false });
      doc.text('UTR Number', tX + col1 + 8, tY + 8, { width: col2 - 16, lineBreak: false });
      doc.text('Account Holder Name', tX + col1 + col2 + 8, tY + 8, { width: col3 - 16, lineBreak: false });

      // Table data row
      doc.font('Helvetica').fontSize(9.5);
      doc.text(String(payDate || '—'), tX + 8, dY + 8, { width: col1 - 16, lineBreak: false });
      doc.text(String(utr || '—'), tX + col1 + 8, dY + 8, { width: col2 - 16, lineBreak: false, ellipsis: true });
      doc.text(String(acHolder || '—'), tX + col1 + col2 + 8, dY + 8, { width: col3 - 16, lineBreak: false, ellipsis: true });

      // ── PAGE 4: Landscape fee table ─────────────────────────────────────
      doc.addPage({ size: 'A4', layout: 'landscape', margin: 40 });
      const lW = doc.page.width, lM = 40, lCW = lW - lM * 2;
      const colPt  = [35, 75, 145, 45, 55, 95, 140, 125, lCW - (35 + 75 + 145 + 45 + 55 + 95 + 140 + 125)];
      const candW  = colPt.slice(0, 4).reduce((a, b) => a + b, 0);
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
      const colHdrs = ['S. No.', 'Regn. No.', 'Name of Cand.', 'Level', 'Amount', 'Transaction Date', 'Transaction No/UTR', 'Payment Sender Name', 'Remark'];
      let cx4 = lM;
      colHdrs.forEach((h, i) => {
        doc.font('Helvetica-Bold').fontSize(8).text(h, cx4 + 2, r4Y + 8, { width: colPt[i] - 4, align: 'center', lineBreak: false });
        if (i > 0) doc.moveTo(cx4, r4Y).lineTo(cx4, r4Y + rH4 * 2).stroke();
        cx4 += colPt[i];
      });
      doc.moveTo(lM, r4Y + rH4).lineTo(lM + lCW, r4Y + rH4).stroke();

      const r5Y = r4Y + rH4;
      const cleanAmount = String(amount).replace(/[^0-9]/g, '') || '1000';
      const colVals = ['1.', regNo, `Mr. ${name}`, level, cleanAmount, payDate, utr, acHolder, remark];
      let cx5 = lM;
      colVals.forEach((v, i) => {
        doc.font('Helvetica').fontSize(8).text(String(v), cx5 + 2, r5Y + 8, { width: colPt[i] - 4, align: 'center', lineBreak: false, ellipsis: true });
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
  return `New NIELIT Project submitted on ithunt

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

function studentHtml(d, regNo, level, title, payDate, utr) {
  const candName = d.candidateName || d.studentName || 'Candidate';
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0d1117; color: #e6edf3; margin: 0; padding: 20px; }
    .container { max-width: 620px; margin: 0 auto; background: #161b22; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1f242c 0%, #0d1117 100%); padding: 24px; text-align: center; border-bottom: 2px solid #f97316; }
    .header h1 { margin: 0; color: #f97316; font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { margin: 6px 0 0 0; color: #8b949e; font-size: 13px; }
    .content { padding: 24px; line-height: 1.6; }
    .card { background: #0d1117; border: 1px solid #21262d; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #21262d; font-size: 14px; }
    .row:last-child { border-bottom: none; }
    .label { color: #8b949e; font-weight: 500; }
    .val { color: #f0f6fc; font-weight: 600; text-align: right; }
    .badge { display: inline-block; background: rgba(34, 197, 94, 0.15); color: #22c55e; border: 1px solid #22c55e; border-radius: 4px; padding: 2px 8px; font-size: 12px; font-weight: 600; }
    .attach-notice { background: rgba(249, 115, 22, 0.1); border: 1px solid rgba(249, 115, 22, 0.3); border-radius: 8px; padding: 14px; margin: 20px 0; color: #fdba74; font-size: 13px; }
    .footer { padding: 18px 24px; background: #0d1117; border-top: 1px solid #21262d; font-size: 12px; color: #8b949e; text-align: center; }
    .footer a { color: #58a6ff; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>IT HUNT Tech Academy</h1>
      <p>Official NIELIT Project & Thesis Directorate • ISO 9001:2015 Accredited</p>
    </div>
    <div class="content">
      <h2 style="color: #f0f6fc; margin-top: 0; font-size: 18px;">Dear ${candName},</h2>
      <p style="color: #c9d1d9;">Your official <strong>NIELIT '${level}' Level Project submission</strong> has been recorded and verified.</p>
      
      <div class="card">
        <div class="row"><span class="label">Candidate Name:</span><span class="val">${candName}</span></div>
        <div class="row"><span class="label">NIELIT Reg No:</span><span class="val" style="color: #f97316; font-family: monospace;">${regNo}</span></div>
        <div class="row"><span class="label">Exam Level:</span><span class="val">${level} Level</span></div>
        <div class="row"><span class="label">Project Title:</span><span class="val">${title}</span></div>
        <div class="row"><span class="label">Project Guide:</span><span class="val">${d.guideName || 'Er. Sushil Kumar'}</span></div>
        <div class="row"><span class="label">Payment UTR / Ref:</span><span class="val" style="font-family: monospace;">${utr}</span></div>
        <div class="row"><span class="label">Fee Paid:</span><span class="val">₹${d.amount || '1,000'}</span></div>
        <div class="row"><span class="label">Payment Status:</span><span class="val"><span class="badge">Paid ✓</span></span></div>
      </div>

      <div class="attach-notice">
        📎 <strong>Attached Official Document:</strong> Your complete <strong>4-Page NIELIT Project Document</strong> (Annexure II, III, Guide Certificate & Verified Payment Receipt) is attached to this email as a PDF. Please download and keep it for your academic records and submission.
      </div>

      <p style="color: #8b949e; font-size: 13px;">For any academic assistance, you may contact the Institute helpline at <strong>+91 9795771806</strong> or reply directly to this email.</p>
    </div>
    <div class="footer">
      <p style="margin: 0 0 6px 0;"><strong>IT HUNT Software Solutions & Tech Academy</strong></p>
      <p style="margin: 0;">📍 Dahiyawa Holagarh, Prayagraj (Allahabad), UP | 🌐 <a href="https://ithunt.vercel.app">ithunt.vercel.app</a></p>
    </div>
  </div>
</body>
</html>`;
}

function adminHtml(d, regNo, level, title, payDate, utr) {
  const candName = d.candidateName || d.studentName || 'Candidate';
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0d1117; color: #e6edf3; margin: 0; padding: 20px; }
    .container { max-width: 620px; margin: 0 auto; background: #161b22; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; }
    .header { background: #1c1917; padding: 20px 24px; border-bottom: 2px solid #ea580c; }
    .badge-admin { background: #ea580c; color: #fff; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .content { padding: 24px; line-height: 1.6; }
    .card { background: #0d1117; border: 1px solid #21262d; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #21262d; font-size: 14px; }
    .row:last-child { border-bottom: none; }
    .label { color: #8b949e; }
    .val { color: #f0f6fc; font-weight: 600; text-align: right; }
    .attach-box { background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 12px; margin-top: 16px; font-size: 13px; color: #93c5fd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge-admin">SuperAdmin Notice</span>
      <h2 style="color: #f0f6fc; margin: 8px 0 0 0; font-size: 18px;">New NIELIT Student Project Form Submitted</h2>
    </div>
    <div class="content">
      <div class="card">
        <div class="row"><span class="label">Candidate Name:</span><span class="val">${candName}</span></div>
        <div class="row"><span class="label">Father's Name:</span><span class="val">${d.fatherName || 'N/A'}</span></div>
        <div class="row"><span class="label">NIELIT Reg No:</span><span class="val" style="color: #f97316;">${regNo}</span></div>
        <div class="row"><span class="label">Level:</span><span class="val">${level} Level</span></div>
        <div class="row"><span class="label">Project Title:</span><span class="val">${title}</span></div>
        <div class="row"><span class="label">Guide / Supervisor:</span><span class="val">${d.guideName || 'Er. Sushil Kumar'}</span></div>
        <div class="row"><span class="label">Mobile:</span><span class="val">${d.mobile || 'N/A'}</span></div>
        <div class="row"><span class="label">Email:</span><span class="val">${d.email || 'N/A'}</span></div>
        <div class="row"><span class="label">Address:</span><span class="val">${d.address || 'N/A'}, ${d.district || ''}</span></div>
        <div class="row"><span class="label">UTR / Transaction:</span><span class="val">${utr}</span></div>
        <div class="row"><span class="label">Fee Paid:</span><span class="val">₹${d.amount || '1000'} (Paid)</span></div>
        <div class="row"><span class="label">Sender Name:</span><span class="val">${d.accountHolderName || candName}</span></div>
      </div>
      <div class="attach-box">
        📎 <strong>Attachment:</strong> 4-Page NIELIT Project PDF document has been compiled and attached.
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ── SENDER 1: nodemailer Gmail SMTP ──────────────────────────────────────────
async function sendViaSmtp(to, subject, text, attachments, html = null, fromAddress = null, replyTo = null) {
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
    from: fromAddress || `"${FROM_NAME}" <${user}>`,
    to,
    replyTo: replyTo || (fromAddress ? fromAddress : user),
    subject,
    text,
    ...(html ? { html } : {}),
    attachments
  });
}

// ── SENDER 2: Resend API ──────────────────────────────────────────────────────
async function sendViaResend(to, subject, text, pdfBuffer, filename, fromAddress = null, replyTo = null) {
  const resendKey = (process.env.RESEND_API_KEY || '').trim();
  const { Resend } = await import('resend');
  const resend = new Resend(resendKey);
  const attachments = pdfBuffer
    ? [{ filename, content: pdfBuffer }]
    : [];
  const result = await resend.emails.send({
    from: fromAddress || `${FROM_NAME} <onboarding@resend.dev>`,
    to,
    reply_to: replyTo,
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
  const rawLevel = String(projectRecord.nielitLevel || projectRecord.level || 'O').trim();
  const level    = rawLevel.replace(/\s*Level/i, '').trim() || 'O';
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
      // 1. Send student confirmation with PDF attachment to candidate email
      // From: IT HUNT Academy, To: Candidate Email
      if (stuEmail && stuEmail.includes('@')) {
        await sendViaSmtp(
          stuEmail,
          stuSubject,
          studentBody(projectRecord, regNo, level, title, payDate, utr),
          attachments,
          studentHtml(projectRecord, regNo, level, title, payDate, utr),
          `"${FROM_NAME}" <${smtpUser}>`,
          process.env.CONTACT_EMAIL || 'softtechithunt@gmail.com'
        );
        console.log(`📧 NIELIT student confirmation sent to candidate: ${stuEmail}`);
      }

      // 2. Send official copy with PDF attachment to Admin recipient(s)
      // Display Name includes candidate name and student email: "Candidate Name (email@domain.com)"
      const studentFrom = (stuEmail && stuEmail.includes('@'))
        ? `"${candName} (${stuEmail})" <${stuEmail}>`
        : `"${candName} (via IT HUNT)" <${smtpUser}>`;

      for (const adminTo of adminRecipients) {
        await sendViaSmtp(
          adminTo,
          adminSubject,
          adminBody(projectRecord, regNo, level, title, payDate, utr),
          attachments,
          adminHtml(projectRecord, regNo, level, title, payDate, utr),
          studentFrom,
          stuEmail || smtpUser
        );
        console.log(`📧 NIELIT admin copy sent to: ${adminTo} (From: ${studentFrom})`);
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
      if (stuEmail && stuEmail.includes('@')) {
        await sendViaResend(
          stuEmail,
          stuSubject,
          studentBody(projectRecord, regNo, level, title, payDate, utr),
          pdfBuffer,
          filename,
          `${FROM_NAME} <onboarding@resend.dev>`,
          process.env.CONTACT_EMAIL || 'softtechithunt@gmail.com'
        );
      }
      const studentFrom = (stuEmail && stuEmail.includes('@'))
        ? `"${candName} (${stuEmail})" <${stuEmail}>`
        : `"${candName} via IT HUNT" <onboarding@resend.dev>`;

      for (const adminTo of adminRecipients) {
        await sendViaResend(
          adminTo,
          adminSubject,
          adminBody(projectRecord, regNo, level, title, payDate, utr),
          pdfBuffer,
          filename,
          studentFrom,
          stuEmail
        );
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
