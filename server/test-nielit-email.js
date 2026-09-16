/**
 * Quick test: generate NIELIT PDF + send email
 * Run: node server/test-nielit-email.js
 */
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendNielitProjectEmail } from './services/nielitMailer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const testData = {
  studentName: 'Anup Mishra',
  candidateName: 'Anup Mishra',
  nielitRegNo: 'TEST-EMAIL-2026',
  nielitLevel: 'A',
  level: 'A Level',
  fatherName: 'SS Mishra',
  email: 'softtechithunt@gmail.com',   // send to admin for test
  mobile: '8987898890',
  address: '256 Kamoli Veer Bhan Pur',
  district: 'Prayagraj',
  state: 'Uttar Pradesh',
  pin: '212503',
  projectTitle: 'Networking with Hadoop & Cloud Infrastructure',
  guideName: 'Er. Sushil Kumar',
  guideQualification: 'MCA (Computer Science)',
  guideDesignation: 'Sr. Laravel & Cloud Developer',
  guidePlace: 'Prayagraj',
  guideAddress: 'Holagarh, Prayagraj, UP',
  projectDate: '2026-09-16',
  amount: '1000',
  paymentDate: '2026-09-16',
  utrNumber: 'CDHJKSKJFDKJF32',
  accountHolderName: 'Anup Mishra',
  paymentRemark: 'Paid',
  status: 'Submitted'
};

console.log('\n🔄 Generating 4-page NIELIT PDF and sending test email...');
console.log(`📧 Target: ${testData.email}`);
console.log(`📋 Reg No: ${testData.nielitRegNo}`);
console.log(`📚 Level : ${testData.nielitLevel}`);
console.log(`🏗️  Title : ${testData.projectTitle}\n`);

// Also save PDF locally for inspection
import PDFDocument from 'pdfkit';

async function savePdfLocally() {
  const { sendNielitProjectEmail: _, ...rest } = await import('./services/nielitMailer.js');
  // Re-use the internal PDF generator via a small inline version
  const PDFDoc = (await import('pdfkit')).default;
  const chunks = [];
  const doc = new PDFDoc({ size: 'A4', margin: 55 });
  doc.on('data', c => chunks.push(c));
  const done = new Promise(r => doc.on('end', r));

  doc.font('Helvetica-Bold').fontSize(14)
     .text('NIELIT PROJECT SUBMISSION', { align: 'center' });
  doc.moveDown();
  doc.font('Helvetica').fontSize(11)
     .text(`Registration No: ${testData.nielitRegNo}`)
     .text(`Candidate: ${testData.candidateName}`)
     .text(`Level: ${testData.nielitLevel}`)
     .text(`Project: ${testData.projectTitle}`)
     .text(`Guide: ${testData.guideName}`)
     .text(`Amount: ₹${testData.amount}`)
     .text(`UTR: ${testData.utrNumber}`)
     .text(`Date: ${testData.projectDate}`);
  doc.end();
  await done;

  const outPath = path.join(__dirname, '../test-nielit-output.pdf');
  fs.writeFileSync(outPath, Buffer.concat(chunks));
  console.log(`💾 Sample PDF saved locally → ${outPath}`);
}

try {
  await savePdfLocally();
} catch (e) {
  console.warn('Local PDF save skipped:', e.message);
}

const result = await sendNielitProjectEmail(testData);

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📬 EMAIL SEND RESULT:');
console.log(`   Success     : ${result.success}`);
console.log(`   Method      : ${result.method || 'unknown'}`);
console.log(`   PDF Attached: ${result.pdfAttached !== undefined ? result.pdfAttached : 'N/A (formsubmit)'}`);
if (result.error) console.log(`   Error       : ${result.error}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (result.success) {
  console.log('✅ Email sent! Check softtechithunt@gmail.com inbox.\n');
} else {
  console.log('❌ Email failed. See error above.\n');
}
