/**
 * IT HUNT - Official Fee Payment JPG Receipt Image Generator
 * Renders a high-resolution canvas receipt and exports it as an authentic JPEG Image Blob (.jpg)
 */

/**
 * Generate a JPG Image Blob for a Student Fee Payment Receipt
 * @param {Object} studentRecord Student / Candidate Admission data object
 * @returns {Promise<Blob>} JPEG Image Blob (.jpg)
 */
export async function generateFeeReceiptJpgBlob(studentRecord) {
  if (!studentRecord) throw new Error('Missing student record for JPG receipt generation');

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  const regNo = studentRecord.registrationNo || 'ITH-2026-001';
  const candName = studentRecord.candidateName || 'Student Name';
  const fatherName = studentRecord.fatherName || 'Father Name';
  const courseName = studentRecord.course || 'Software Engineering Track';
  const mobile = studentRecord.mobile || 'N/A';
  const email = studentRecord.email || 'N/A';
  const dateStr = studentRecord.feeConfirmedDate || studentRecord.date || new Date().toLocaleDateString('en-GB');
  const amountPaid = studentRecord.amountPaid || '₹5,000 / Paid in Full';
  const paymentMode = studentRecord.paymentMode || 'Online UPI / Bank Transfer';
  const receiptNo = studentRecord.receiptNo || `REC-${Math.floor(100000 + Math.random() * 900000)}`;

  // 1. Background Fill (Clean Warm Dark/Slate Palette)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 1200, 800);

  // Outer Border & Glass Container Card
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 1160, 760);

  // Inner Subtle Card Fill
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(35, 35, 1130, 730);

  // 2. Top Header Ribbon (Brand Accent Gradient Bar)
  const headerGrad = ctx.createLinearGradient(35, 35, 1165, 35);
  headerGrad.addColorStop(0, '#ea580c');
  headerGrad.addColorStop(0.5, '#f97316');
  headerGrad.addColorStop(1, '#f59e0b');
  ctx.fillStyle = headerGrad;
  ctx.fillRect(35, 35, 1130, 100);

  // Header Title & Tagline
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Outfit", sans-serif, Arial';
  ctx.fillText('IT HUNT SOFTWARE SOLUTIONS & TECH ACADEMY', 60, 82);

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 16px "Fira Code", monospace, Arial';
  ctx.fillText('OFFICIAL FEE PAYMENT ACKNOWLEDGMENT RECEIPT | ISO 9001:2015 ACCREDITED', 60, 115);

  // 3. Receipt Details Header Grid
  ctx.fillStyle = '#334155';
  ctx.fillRect(60, 160, 1080, 50);

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif, Arial';
  ctx.fillText(`RECEIPT NO: ${receiptNo}`, 80, 192);
  ctx.fillText(`DATE: ${dateStr}`, 520, 192);

  ctx.fillStyle = '#22c55e';
  ctx.fillText('PAYMENT STATUS: CONFIRMED & VERIFIED ✓', 800, 192);

  // 4. Student & Payment Details Table Rows
  const drawRow = (y, label, val, isHighlight = false) => {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(60, y, 1080, 48);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.strokeRect(60, y, 1080, 48);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 17px "Plus Jakarta Sans", sans-serif, Arial';
    ctx.fillText(label, 80, y + 30);

    ctx.fillStyle = isHighlight ? '#f97316' : '#f8fafc';
    ctx.font = isHighlight ? 'bold 20px "Plus Jakarta Sans", sans-serif, Arial' : '600 18px "Plus Jakarta Sans", sans-serif, Arial';
    ctx.fillText(val, 380, y + 30);
  };

  drawRow(225, 'Registration ID:', regNo, true);
  drawRow(278, 'Student Full Name:', candName, true);
  drawRow(331, "Father's Name:", fatherName);
  drawRow(384, 'Enrolled Program Track:', courseName, true);
  drawRow(437, 'Contact Mobile & Email:', `${mobile} | ${email}`);
  drawRow(490, 'Payment Method / Mode:', paymentMode);
  drawRow(543, 'Total Amount Confirmed:', amountPaid, true);

  // 5. Official Stamp & Authorised Signature Box
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(60, 610, 1080, 125);
  ctx.strokeStyle = '#f97316';
  ctx.strokeRect(60, 610, 1080, 125);

  // Stamp Badge
  ctx.fillStyle = '#ea580c';
  ctx.beginPath();
  ctx.arc(150, 672, 42, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('IT HUNT', 150, 668);
  ctx.fillText('VERIFIED', 150, 684);
  ctx.textAlign = 'left';

  // Address & Authorization text
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('IT HUNT Institute of Computer Technology & IT Solutions', 220, 648);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px sans-serif';
  ctx.fillText('Campus Address: Dahiyawa Holagarh, Near Kali Maa Mandir, Prayagraj, UP - 212503', 220, 672);
  ctx.fillText('Helpline: +91-9795771806 | Email: softtechithunt@gmail.com | Web: ithunt.vercel.app', 220, 696);

  // Signature Line
  ctx.fillStyle = '#f97316';
  ctx.font = 'bold 16px "Fira Code", monospace';
  ctx.fillText('Authorized Registrar & Accounts Seal', 790, 665);

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(780, 690);
  ctx.lineTo(1110, 690);
  ctx.stroke();

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '13px sans-serif';
  ctx.fillText('Directorate of Admissions, IT HUNT', 815, 712);

  // Export Canvas as JPG Blob (.jpg)
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to generate JPG receipt blob from canvas'));
      }
    }, 'image/jpeg', 0.95);
  });
}

export default {
  generateFeeReceiptJpgBlob
};
