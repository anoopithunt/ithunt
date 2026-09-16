/**
 * IT HUNT - Server-Side NIELIT Project Email Mailer
 * Generates a 4-page formatted PDF (pdfkit) and emails it via nodemailer (Gmail SMTP)
 * Fallback: FormSubmit AJAX (no attachment) if SMTP credentials not configured
 */

import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

const ADMIN_EMAIL    = process.env.CONTACT_EMAIL     || 'softtechithunt@gmail.com';
const SMTP_USER      = process.env.SMTP_USER         || process.env.CONTACT_EMAIL || 'softtechithunt@gmail.com';
const SMTP_PASS      = process.env.SMTP_PASS         || process.env.GMAIL_APP_PASSWORD || '';
const FORMSUBMIT_TOKEN = process.env.VITE_FORMSUBMIT_TOKEN || '1864b99a4972a64cd046dba2a86b13c8';

// ─────────────────────────────────────────────────────────────────────────────
// Helper: format date → "16-Sep-2026"
// ─────────────────────────────────────────────────────────────────────────────
function fmtDate(d) {
  if (!d) return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  const str = String(d).trim();
  if (/^\d{1,2}-[A-Za-z]{3}-\d{4}$/.test(str)) return str;
  try {
    const dt = new Date(str);
    if (!isNaN(dt)) {
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return `${String(dt.getDate()).padStart(2,'0')}-${months[dt.getMonth()]}-${dt.getFullYear()}`;
    }
  } catch (_) {}
  return str;
}

// ─────────────────────────────────────────────────────────────────────────────
// Generate 4-page NIELIT PDF as a Buffer using pdfkit (Node-safe, no browser)
// ─────────────────────────────────────────────────────────────────────────────
function generateNielitPdfBuffer(data) {
  return new Promise((resolve, reject) => {
    try {
      const chunks = [];
      const doc = new PDFDocument({ size: 'A4', margin: 55, bufferPages: true });

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end',  () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const W = doc.page.width;   // ~595 pt
      const M = 55;               // margin
      const CW = W - M * 2;      // content width

      const name      = (data.candidateName || data.studentName || 'Candidate').toUpperCase();
      const father    = data.fatherName || 'N/A';
      const regNo     = data.nielitRegNo || data.registrationNo || 'N/A';
      const level     = data.nielitLevel || data.level || 'A';
      const title     = data.projectTitle || 'N/A';
      const guide     = data.guideName || 'N/A';
      const guideQual = data.guideQualification || 'MCA';
      const guideDesig= data.guideDesignation || 'N/A';
      const guidePlace= data.guidePlace || 'Prayagraj';
      const guideAddr = data.guideAddress || 'Prayagraj, UP';
      const projDate  = fmtDate(data.projectDate);
      const payDate   = fmtDate(data.paymentDate);
      const utr       = data.utrNumber || data.utrNo || 'N/A';
      const acHolder  = data.accountHolderName || name;
      const amount    = data.amount || '1000';
      const remark    = data.paymentRemark || 'Paid';
      const address   = data.address || 'N/A';
      const district  = data.district || 'N/A';
      const state     = data.state || 'Uttar Pradesh';
      const pin       = data.pin || 'N/A';
      const mobile    = data.mobile || 'N/A';
      const email     = (data.email || 'N/A').toUpperCase();

      // ── PAGE 1: Annexure II ─────────────────────────────────────────────────
      doc.font('Helvetica-Bold').fontSize(11)
         .text('Annexure – II', { align: 'right' });

      doc.moveDown(0.5);
      doc.fontSize(11).text('PERFORMA FOR A / B / C Level PROJECT CERTIFICATE', { align: 'center' });
      doc.text('FROM PROJECT GUIDE / ACCREDITED INSTITUTE', { align: 'center' });
      doc.font('Helvetica').fontSize(10)
         .text('[For Direct as well as candidate from Accredited Institute]', { align: 'center' });

      doc.moveDown();
      doc.font('Helvetica').fontSize(11)
         .text(`This is to certify that the Project / Dissertation entitled "${title}" a bonafide work done by Mr. / Ms. ${name} (NIELIT Registration No: ${regNo}) in partial fulfilment of ${level} Level examination and has been carried out under my direct supervision and guidance. This report or a similar report on the topic has not been submitted for any other examination and does not form a part of any other course undergone by the candidate.`, { width: CW });

      doc.moveDown(1.5);
      doc.text('_______________________');
      doc.text('Signature of Guide / Supervisor');
      doc.moveDown(0.5);
      doc.font('Helvetica-Bold').text(`Name: ${guide}`);
      doc.moveDown(0.3);
      doc.font('Helvetica').text(`Place: ${guidePlace}`);
      doc.moveDown(0.3);
      doc.text(`Designation: ${guideDesig}`);
      doc.moveDown(0.3);
      doc.text(`Date: ${projDate}`);
      doc.moveDown(0.3);
      doc.text(`Address: ${guideAddr}`);
      doc.moveDown(1);
      doc.font('Helvetica-Bold').text('Signature of Center Manager');
      doc.font('Helvetica').fontSize(9).text('[in case of a candidate from Accredited Institute]');

      // ── PAGE 2: Annexure III ────────────────────────────────────────────────
      doc.addPage();
      doc.font('Helvetica-Bold').fontSize(11)
         .text('Annexure- III', { align: 'right' });
      doc.moveDown(0.5);
      doc.text('PERFORMA OF COVERING LETTER TO THE PROJECT REPORT', { align: 'center', underline: true });
      doc.moveDown();
      doc.text('Controller of Examinations,');
      doc.text('NIELIT,');
      doc.text('Plot No.3, PSP Pocket');
      doc.text('Dwarka, Sector-8');
      doc.text('New Delhi – 110077');
      doc.moveDown();
      doc.text('Sir,');
      doc.font('Helvetica').fontSize(11)
         .text(`I am submitting my ${level} level Project for evaluation. Details of my Registration and postal address, etc is as under:`);
      doc.moveDown();
      doc.font('Helvetica-Bold').text(`Regn.No: ${regNo}`);
      doc.text(`Level - ${level}`);
      doc.moveDown(0.5);
      doc.text(`Name: Mr. ${name}`);
      doc.moveDown(0.3);
      doc.text(`Father's Name: Mr. ${father}`);
      doc.moveDown(0.5);
      doc.text('Address:');
      doc.moveDown(0.2);
      doc.text(`(a) Residential Address: ${address}`);
      doc.text(`    District: ${district}`);
      doc.text(`    State: ${state},  Pin: ${pin}`);
      doc.moveDown(0.3);
      doc.text(`Mob No: ${mobile}`);
      doc.moveDown(0.3);
      doc.font('Helvetica').text('Tele No: __________________________________________________');
      doc.fontSize(9).text('(Country code) (City code) (Telephone number)', { indent: 40 });
      doc.moveDown(0.5);
      doc.fontSize(11);
      doc.font('Helvetica-Bold').text('(b) Office Address:');
      doc.font('Helvetica').text('__________________________________________________');
      doc.moveDown(0.5);
      doc.font('Helvetica-Bold').text('E-mail Address (Please in block letters only): ', { continued: true });
      doc.fillColor('blue').text(email).fillColor('black');

      // ── PAGE 3: Project Completion Certificate ──────────────────────────────
      doc.addPage();
      doc.font('Helvetica-Bold').fontSize(11)
         .text('Proforma of the Project Completion Certificate', { align: 'center', underline: true });
      doc.moveDown();
      doc.font('Helvetica').fontSize(10)
         .text(`This is to certify that the Project work done at "${title}" By Mr./Ms. ${name} (NIELIT Registration No. ${regNo}) in partial fulfillment of NIELIT '${level}' Level Examination has been found satisfactory. This report has not been submitted for any other examination and does not form part of any other course undergone by the candidate.`, { width: CW });
      doc.moveDown(0.5);
      doc.text(`It is further certified that he/she has appeared in all the four modules of NIELIT '${level}' level Examination.`);
      doc.moveDown(1.5);
      doc.text('Signature');
      doc.moveDown(0.3);
      doc.text('Name:');
      doc.text('(Institute PROV No./FULL No.) (or)');
      doc.text('Head of the Organization/Division:');
      doc.text('Name of the Organization:');
      doc.text('Address:');
      doc.text('(or)');
      doc.moveDown(0.3);
      doc.font('Helvetica-Bold').text(`Name of the Guide/Supervisor: ${guide}`);
      doc.text(`Qualification: ${guideQual}`);
      doc.font('Helvetica').fontSize(9)
         .text('(Self attested copy of the qualification of the guide/Supervisor to be attached)');

      // Fee Details Table
      doc.moveDown(1.2);
      doc.fontSize(10).font('Helvetica').text('Fees Details: -');
      doc.moveDown(0.5);

      const tX = M;
      const tY = doc.y;
      const tW = CW;
      const rH = 20;
      const cols = [50, 80, tW - 130];
      const headers = ['Payment Date', 'UTR Number', 'Account Holder Name'];
      const values  = [payDate, utr, acHolder];

      // Draw header row
      doc.rect(tX, tY, tW, rH).stroke();
      let cx = tX;
      headers.forEach((h, i) => {
        doc.font('Helvetica-Bold').fontSize(9)
           .text(h, cx + 3, tY + 6, { width: cols[i] - 6, ellipsis: true });
        cx += cols[i];
        if (i < headers.length - 1) doc.moveTo(cx, tY).lineTo(cx, tY + rH * 2).stroke();
      });

      // Draw data row
      const dY = tY + rH;
      doc.rect(tX, dY, tW, rH).stroke();
      cx = tX;
      values.forEach((v, i) => {
        doc.font('Helvetica').fontSize(9)
           .text(String(v), cx + 3, dY + 6, { width: cols[i] - 6, ellipsis: true });
        cx += cols[i];
      });

      // ── PAGE 4: Fee Details (Landscape) ────────────────────────────────────
      doc.addPage({ size: 'A4', layout: 'landscape', margin: 40 });

      const lW = doc.page.width;  // ~842 pt
      const lM = 40;
      const lCW = lW - lM * 2;   // ~762 pt

      // Convert mm-based proportions to pt (1mm ≈ 2.835pt)
      const colPtList = [34, 71, 147, 42, 51, 96, 136, 125, 54]; // total ~762
      const candSecW  = colPtList[0] + colPtList[1] + colPtList[2] + colPtList[3]; // ~294
      const paySecW   = lCW - candSecW; // ~468

      const r1H = 24, r2H = 24, r3H = 24, r4H = 24, r5H = 24;
      const totalH = r1H + r2H + r3H + r4H + r5H;
      const startY = (doc.page.height - totalH) / 2 - 20;

      // Outer border
      doc.rect(lM, startY, lCW, totalH).stroke();

      // Row 1: title
      doc.font('Helvetica-Bold').fontSize(11)
         .text('O/A/B/C Project Fee Details', lM, startY + 7, { width: lCW, align: 'center' });
      doc.moveTo(lM, startY + r1H).lineTo(lM + lCW, startY + r1H).stroke();

      // Row 2: subtitle
      const r2Y = startY + r1H;
      doc.fontSize(10).text('NIELIT HQ, NEW DELHI', lM, r2Y + 7, { width: lCW, align: 'center' });
      doc.moveTo(lM, r2Y + r2H).lineTo(lM + lCW, r2Y + r2H).stroke();

      // Row 3: section headers
      const r3Y = r2Y + r2H;
      doc.fontSize(9)
         .text('Candidate Details', lM, r3Y + 8, { width: candSecW, align: 'center' });
      doc.text('Payment Details', lM + candSecW, r3Y + 8, { width: paySecW, align: 'center' });
      doc.moveTo(lM + candSecW, r3Y).lineTo(lM + candSecW, r3Y + r3H + r4H + r5H).stroke();
      doc.moveTo(lM, r3Y + r3H).lineTo(lM + lCW, r3Y + r3H).stroke();

      // Row 4: column headers
      const r4Y = r3Y + r3H;
      const colHeaders = ['S. No.','Regn. No.','Name of Cand.','Level','Amount','Transaction Date','Transaction No/UTR','Payment Sender Name','Remark'];
      let cx4 = lM;
      colHeaders.forEach((h, i) => {
        doc.font('Helvetica-Bold').fontSize(8)
           .text(h, cx4 + 2, r4Y + 8, { width: colPtList[i] - 4, align: 'center' });
        if (i > 0) doc.moveTo(cx4, r4Y).lineTo(cx4, r4Y + r4H + r5H).stroke();
        cx4 += colPtList[i];
      });
      doc.moveTo(lM, r4Y + r4H).lineTo(lM + lCW, r4Y + r4H).stroke();

      // Row 5: data
      const r5Y = r4Y + r4H;
      const colValues = ['1.', regNo, `Mr. ${name}`, level, `₹${amount}`, payDate, utr, acHolder, remark];
      let cx5 = lM;
      colValues.forEach((v, i) => {
        doc.font('Helvetica').fontSize(8)
           .text(String(v), cx5 + 2, r5Y + 8, { width: colPtList[i] - 4, align: 'center', ellipsis: true });
        cx5 += colPtList[i];
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Build Gmail SMTP transporter
// ─────────────────────────────────────────────────────────────────────────────
function createTransporter() {
  if (!SMTP_PASS) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN: Send NIELIT Project Confirmation Email with 4-page PDF attachment
// ─────────────────────────────────────────────────────────────────────────────
export async function sendNielitProjectEmail(projectRecord) {
  if (!projectRecord) return { success: false, error: 'No project record' };

  const candName   = projectRecord.candidateName || projectRecord.studentName || 'Candidate';
  const regNo      = projectRecord.nielitRegNo || projectRecord.registrationNo || 'N/A';
  const level      = projectRecord.nielitLevel || projectRecord.level || 'A';
  const title      = projectRecord.projectTitle || 'N/A';
  const studentEmail = projectRecord.email || '';
  const filename   = `NIELIT_Project_${regNo}_${candName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  const subject    = `📜 NIELIT Project Submission Confirmed – ${candName} [${regNo}] (${level} Level)`;

  // Generate PDF buffer
  let pdfBuffer = null;
  try {
    pdfBuffer = await generateNielitPdfBuffer(projectRecord);
    console.log(`✓ NIELIT PDF generated: ${filename} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`);
  } catch (pdfErr) {
    console.warn('⚠ PDF generation failed:', pdfErr.message);
  }

  const adminBody = `
A new NIELIT Project has been submitted on ithunt.vercel.app.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NIELIT PROJECT SUBMISSION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Registration No   : ${regNo}
NIELIT Level      : ${level}
Candidate Name    : ${candName}
Father's Name     : ${projectRecord.fatherName || 'N/A'}
Project Title     : ${title}
Guide / Supervisor: ${projectRecord.guideName || 'N/A'} (${projectRecord.guideQualification || 'N/A'})
Mobile            : ${projectRecord.mobile || 'N/A'}
Email             : ${studentEmail || 'N/A'}
Address           : ${projectRecord.address || 'N/A'}, ${projectRecord.district || ''}, ${projectRecord.state || ''} - ${projectRecord.pin || ''}
Payment UTR No    : ${projectRecord.utrNumber || projectRecord.utrNo || 'N/A'}
Payment Date      : ${fmtDate(projectRecord.paymentDate)}
Amount            : ₹${projectRecord.amount || '1000'}
Payment Sender    : ${projectRecord.accountHolderName || candName}
Submitted At      : ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4-page NIELIT project form PDF is attached.

IT HUNT Software Solutions & Tech Academy
https://ithunt.vercel.app
  `.trim();

  const studentBody = `
Dear ${candName},

Your NIELIT ${level} Level Project has been successfully submitted.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUBMISSION CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Registration No   : ${regNo}
NIELIT Level      : ${level}
Project Title     : ${title}
Guide / Supervisor: ${projectRecord.guideName || 'N/A'}
Submission Date   : ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
Payment UTR       : ${projectRecord.utrNumber || projectRecord.utrNo || 'N/A'}
Amount Paid       : ₹${projectRecord.amount || '1000'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please find your 4-page NIELIT Project Submission form attached as a PDF.
Keep it for your records.

For queries contact us:
📞 +91 9795771806
📧 softtechithunt@gmail.com
🌐 https://ithunt.vercel.app

Warm regards,
IT HUNT Software Solutions & Tech Academy
  `.trim();

  // ── Try nodemailer SMTP first ───────────────────────────────────────────────
  const transporter = createTransporter();
  if (transporter && pdfBuffer) {
    try {
      const attachments = [{ filename, content: pdfBuffer, contentType: 'application/pdf' }];

      // Send to admin
      await transporter.sendMail({
        from: `"IT HUNT Academy" <${SMTP_USER}>`,
        to: ADMIN_EMAIL,
        subject: `[ADMIN] ${subject}`,
        text: adminBody,
        attachments
      });

      // Send to student if email exists
      if (studentEmail && studentEmail.includes('@')) {
        await transporter.sendMail({
          from: `"IT HUNT Academy" <${SMTP_USER}>`,
          to: studentEmail,
          subject,
          text: studentBody,
          attachments
        });
      }

      console.log(`✅ NIELIT emails sent via SMTP to admin (${ADMIN_EMAIL}) & student (${studentEmail})`);
      return { success: true, method: 'smtp', pdfAttached: true };
    } catch (smtpErr) {
      console.warn('⚠ SMTP send failed, falling back to FormSubmit:', smtpErr.message);
    }
  }

  // ── FormSubmit fallback (no attachment) ────────────────────────────────────
  try {
    const formsubmitUrl = `https://formsubmit.co/ajax/${FORMSUBMIT_TOKEN}`;
    await fetch(formsubmitUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: subject,
        _replyto: studentEmail || ADMIN_EMAIL,
        _template: 'table',
        _captcha: 'false',
        'SUBMISSION TYPE'   : '📜 NIELIT PROJECT FORM',
        'NIELIT REG NO'     : regNo,
        'NIELIT LEVEL'      : level,
        'CANDIDATE NAME'    : candName,
        "FATHER'S NAME"     : projectRecord.fatherName || 'N/A',
        'PROJECT TITLE'     : title,
        'GUIDE'             : `${projectRecord.guideName || 'N/A'} (${projectRecord.guideQualification || 'N/A'})`,
        'MOBILE'            : projectRecord.mobile || 'N/A',
        'EMAIL'             : studentEmail || 'N/A',
        'ADDRESS'           : `${projectRecord.address || 'N/A'}, ${projectRecord.district || ''}, ${projectRecord.state || ''} - ${projectRecord.pin || ''}`,
        'PAYMENT UTR'       : projectRecord.utrNumber || projectRecord.utrNo || 'N/A',
        'PAYMENT DATE'      : fmtDate(projectRecord.paymentDate),
        'AMOUNT'            : `₹${projectRecord.amount || '1000'}`,
        'PAYMENT SENDER'    : projectRecord.accountHolderName || candName,
        'NOTE'              : pdfBuffer ? 'PDF generated but SMTP not configured — attach manually' : 'PDF generation also failed'
      })
    });
    console.log(`✅ NIELIT notification sent via FormSubmit fallback`);
    return { success: true, method: 'formsubmit', pdfAttached: false };
  } catch (fbErr) {
    console.error('❌ FormSubmit fallback also failed:', fbErr.message);
    return { success: false, error: fbErr.message };
  }
}

export default { sendNielitProjectEmail };
