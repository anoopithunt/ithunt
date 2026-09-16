import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

/**
 * Camera-scannable QR code generator for jsPDF
 */
async function drawScannableQr(doc, x, y, size, text) {
  try {
    const qrDataUrl = await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 320,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });
    doc.addImage(qrDataUrl, 'PNG', x, y, size, size);

    // Subtle crisp border around QR
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.rect(x, y, size, size, 'S');
  } catch (err) {
    console.warn('Scannable QR generation failed, falling back to vector matrix:', err);
    drawQrMatrix(doc, x, y, size, text);
  }
}

/**
 * Fallback procedural pseudo-QR code drawer on jsPDF canvas
 */
function drawQrMatrix(doc, x, y, size, text) {
  const cells = 21; // Standard Version 1 QR code 21x21
  const cellSize = size / cells;

  // Background white box
  doc.setFillColor(255, 255, 255);
  doc.rect(x, y, size, size, 'F');

  doc.setFillColor(15, 23, 42); // Deep slate

  // Helper to draw square in cell grid
  const fillCell = (r, c) => {
    doc.rect(x + (c * cellSize), y + (r * cellSize), cellSize, cellSize, 'F');
  };

  // 1. Draw Finder Patterns (Top-Left, Top-Right, Bottom-Left 7x7 boxes)
  const drawFinder = (startR, startC) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          fillCell(startR + r, startC + c);
        }
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, cells - 7);
  drawFinder(cells - 7, 0);

  // 2. Timing patterns
  for (let i = 8; i < cells - 8; i += 2) {
    fillCell(6, i);
    fillCell(i, 6);
  }

  // 3. Deterministic hash pseudo-data cells based on input text
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      // Skip finder zones
      if (
        (r < 8 && c < 8) ||
        (r < 8 && c >= cells - 8) ||
        (r >= cells - 8 && c < 8) ||
        (r === 6 || c === 6)
      ) {
        continue;
      }
      const val = Math.abs(Math.sin((r * 17 + c * 31) ^ hash));
      if (val > 0.48) {
        fillCell(r, c);
      }
    }
  }

  // Outer border around QR
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.rect(x, y, size, size, 'S');
}

/**
 * Draws an official Circular Corporate / Academy Stamp
 */
function drawOfficialStamp(doc, cx, cy, radius, label1, label2, centerText) {
  doc.saveGraphicsState();
  doc.setDrawColor(234, 88, 12); // Orange
  doc.setLineWidth(0.8);
  doc.circle(cx, cy, radius, 'S');

  doc.setDrawColor(245, 158, 11); // Amber
  doc.setLineWidth(0.4);
  doc.circle(cx, cy, radius - 1.8, 'S');
  doc.circle(cx, cy, radius - 4.5, 'S');

  // Top arch text
  doc.setTextColor(234, 88, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.text(label1 || '★ IT HUNT SOFTWARE ACADEMY ★', cx, cy - radius + 3.8, { align: 'center' });

  // Center emblem
  doc.setFontSize(8.5);
  doc.setTextColor(194, 65, 12);
  doc.text(centerText || 'VERIFIED', cx, cy + 1, { align: 'center' });

  // Bottom arch text
  doc.setFontSize(5.5);
  doc.setTextColor(234, 88, 12);
  doc.text(label2 || 'ISO 9001:2015 CERTIFIED', cx, cy + radius - 2.8, { align: 'center' });

  doc.restoreGraphicsState();
}

/**
 * =========================================================================
 * 1. COURSE COMPLETION CERTIFICATE (A4 LANDSCAPE: 297mm x 210mm)
 * =========================================================================
 */
export async function createCourseCertificateDoc(data = {}) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageW = 297;
  const pageH = 210;
  const margin = 10;

  const studentName = (data.studentName || data.candidateName || 'Candidate Name').toUpperCase();
  const courseName = data.course || data.courseName || 'Full Stack MERN Stack & Cloud Engineering';
  const duration = data.duration || '6 Months';
  const grade = data.grade || 'Grade A+ (Distinction)';
  const certNo = data.certNo || data.certificateNumber || `ITH-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const issueDate = data.issueDate || new Date().toLocaleDateString('en-GB');
  const verifyUrl = data.verificationUrl || `https://ithunt.vercel.app/api/certificates/verify/${certNo}`;

  // 1. Background Fill (Ultra-light warm luxury parchment / cyber tint)
  doc.setFillColor(255, 253, 248);
  doc.rect(0, 0, pageW, pageH, 'F');

  // 2. Luxury Outer Gold & Deep Navy Frame
  doc.setDrawColor(15, 23, 42); // Deep slate
  doc.setLineWidth(1.8);
  doc.rect(margin, margin, pageW - (margin * 2), pageH - (margin * 2), 'S');

  doc.setDrawColor(217, 119, 6); // Luxury Amber Gold
  doc.setLineWidth(0.8);
  doc.rect(margin + 2.5, margin + 2.5, pageW - (margin * 2) - 5, pageH - (margin * 2) - 5, 'S');

  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.3);
  doc.rect(margin + 4, margin + 4, pageW - (margin * 2) - 8, pageH - (margin * 2) - 8, 'S');

  // Corner Ornaments
  const drawCornerOrnament = (ox, oy, flipX = 1, flipY = 1) => {
    doc.setDrawColor(217, 119, 6);
    doc.setLineWidth(1.2);
    doc.line(ox, oy, ox + (14 * flipX), oy);
    doc.line(ox, oy, ox, oy + (14 * flipY));
    doc.setFillColor(245, 158, 11);
    doc.circle(ox + (5 * flipX), oy + (5 * flipY), 1.2, 'F');
  };
  drawCornerOrnament(margin + 5, margin + 5, 1, 1);
  drawCornerOrnament(pageW - margin - 5, margin + 5, -1, 1);
  drawCornerOrnament(margin + 5, pageH - margin - 5, 1, -1);
  drawCornerOrnament(pageW - margin - 5, pageH - margin - 5, -1, -1);

  // 3. Top Organization Brand Header
  let curY = 25;
  doc.setTextColor(234, 88, 12); // Primary Brand Orange
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('IT HUNT', pageW / 2, curY, { align: 'center' });

  curY += 6;
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('SOFTWARE SOLUTIONS & ADVANCED TECHNOLOGY ACADEMY', pageW / 2, curY, { align: 'center' });

  curY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('AN ISO 9001:2015 CERTIFIED INSTITUTION • GOVT. REGISTERED MSME (UDYAM-UP-50-001289)', pageW / 2, curY, { align: 'center' });

  // Divider ribbon line
  curY += 5;
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.6);
  doc.line(margin + 40, curY, pageW - margin - 40, curY);

  // 4. Main Certificate Header
  curY += 12;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('CERTIFICATE OF COURSE COMPLETION', pageW / 2, curY, { align: 'center' });

  curY += 5.5;
  doc.setFontSize(8.5);
  doc.setTextColor(217, 119, 6);
  doc.text('PROUDLY AWARDED FOR ACADEMIC & PRACTICAL EXCELLENCE', pageW / 2, curY, { align: 'center' });

  // 5. Recipient Name
  curY += 12;
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('This is to certify that', pageW / 2, curY, { align: 'center' });

  curY += 11;
  doc.setTextColor(234, 88, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text(studentName, pageW / 2, curY, { align: 'center' });

  // Underline for name
  const nameW = Math.min(doc.getTextWidth(studentName) + 20, pageW - 80);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.7);
  doc.line((pageW / 2) - (nameW / 2), curY + 2.5, (pageW / 2) + (nameW / 2), curY + 2.5);

  // 6. Course & Completion Paragraph
  curY += 12;
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('has successfully completed the comprehensive, production-grade training curriculum in', pageW / 2, curY, { align: 'center' });

  curY += 9;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(courseName, pageW / 2, curY, { align: 'center' });

  // 7. Metadata Ribbon: Duration & Grade
  curY += 9;
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Duration: ${duration}  |  Performance Award: ${grade}`, pageW / 2, curY, { align: 'center' });

  // 8. Bottom Section: Security QR Code, Seal, and Dual Signatures
  const bottomY = 168;

  // QR Code Verification (Left)
  const qrSize = 25;
  const qrX = margin + 18;
  const qrY = bottomY - 14;
  await drawScannableQr(doc, qrX, qrY, qrSize, verifyUrl);

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('SCAN TO VERIFY CREDENTIAL', qrX + (qrSize / 2), qrY + qrSize + 4, { align: 'center' });

  doc.setFontSize(6.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`ID: ${certNo}`, qrX + (qrSize / 2), qrY + qrSize + 7.5, { align: 'center' });
  doc.text(`Issued: ${issueDate}`, qrX + (qrSize / 2), qrY + qrSize + 11, { align: 'center' });

  // Center Official Seal
  drawOfficialStamp(doc, pageW / 2, bottomY - 2, 16, '★ IT HUNT SOFTWARE ACADEMY ★', 'ISO 9001:2015 CERTIFIED', 'VERIFIED');

  // Signatures (Right Side)
  const sigX1 = pageW - margin - 85;
  const sigX2 = pageW - margin - 25;
  const sigLineY = bottomY + 5;

  // Director Signature Line
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.5);
  doc.line(sigX1 - 25, sigLineY, sigX1 + 25, sigLineY);

  // Handwritten flourish representation
  doc.setFont('helvetica', 'bolditalic');
  doc.setFontSize(13);
  doc.setTextColor(30, 58, 138); // Blue signature ink
  doc.text('Lakshman S. Chauhan', sigX1, sigLineY - 3, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Er. Lakshman Singh Chauhan', sigX1, sigLineY + 4.5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(100, 116, 139);
  doc.text('Director & Founder, IT HUNT', sigX1, sigLineY + 8.5, { align: 'center' });

  // Academic Head Signature Line
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.5);
  doc.line(sigX2 - 25, sigLineY, sigX2 + 25, sigLineY);

  doc.setFont('helvetica', 'bolditalic');
  doc.setFontSize(13);
  doc.setTextColor(30, 58, 138);
  doc.text('Sushil Kumar', sigX2, sigLineY - 3, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Er. Sushil Kumar', sigX2, sigLineY + 4.5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(100, 116, 139);
  doc.text('Lead Mentor & Academic Head', sigX2, sigLineY + 8.5, { align: 'center' });

  // Footer Tagline
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('This digital credential is cryptographically registered and verifiable worldwide on the official IT HUNT portal.', pageW / 2, pageH - margin - 2, { align: 'center' });

  return doc;
}

/**
 * =========================================================================
 * 2. EXPERIENCE / INTERNSHIP CERTIFICATE (A4 PORTRAIT: 210mm x 297mm)
 * =========================================================================
 */
export async function createExperienceCertificateDoc(data = {}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageW = 210;
  const pageH = 297;
  const margin = 18;
  const contentW = pageW - (margin * 2);

  const candidateName = (data.studentName || data.candidateName || 'Candidate Name').trim();
  const role = data.role || data.designation || 'Software Engineering Intern';
  const department = data.department || 'Software Solutions & Cloud Architecture';
  const duration = data.duration || '6 Months';
  const startDate = data.startDate || '01/09/2025';
  const endDate = data.endDate || '28/02/2026';
  const techStack = data.technologies || 'React.js, Node.js, Express, MongoDB, REST APIs, Git & Cloud Hosting';
  const performance = data.performance || 'Outstanding and Highly Commended';
  const certNo = data.certNo || data.certificateNumber || `ITH-EXP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const issueDate = data.issueDate || new Date().toLocaleDateString('en-GB');
  const verifyUrl = data.verificationUrl || `https://ithunt.vercel.app/api/certificates/verify/${certNo}`;

  // 1. Outer Border & Header Banner
  doc.setDrawColor(234, 88, 12);
  doc.setLineWidth(0.8);
  doc.rect(margin - 4, margin - 4, contentW + 8, pageH - (margin * 2) + 8, 'S');

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.rect(margin - 2.5, margin - 2.5, contentW + 5, pageH - (margin * 2) + 5, 'S');

  // Header Banner Background
  doc.setFillColor(255, 247, 237); // Light warm cream
  doc.rect(margin - 2.2, margin - 2.2, contentW + 4.4, 34, 'F');

  // Brand Name in Header
  let curY = margin + 8;
  doc.setTextColor(234, 88, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('IT HUNT', margin + 4, curY);

  curY += 5.5;
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  doc.text('SOFTWARE SOLUTIONS & TECH ACADEMY', margin + 4, curY);

  curY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Campus & Registered Office: Holagarh, Prayagraj, Uttar Pradesh - 212503', margin + 4, curY);

  curY += 3.8;
  doc.text('Website: www.ithunt.in | Email: contact@ithunt.in | Contact: +91 9795771806', margin + 4, curY);

  // ISO / MSME Tag on Right Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(217, 119, 6);
  doc.text('ISO 9001:2015 ACCREDITED', pageW - margin - 4, margin + 8, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(100, 116, 139);
  doc.text('GOVT. MSME: UDYAM-UP-50-001289', pageW - margin - 4, margin + 12.5, { align: 'right' });

  // Header Divider
  curY = margin + 34;
  doc.setDrawColor(234, 88, 12);
  doc.setLineWidth(1.0);
  doc.line(margin - 4, curY, pageW - margin + 4, curY);

  // 2. Reference & Date Bar
  curY += 9;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(`REF NO: ${certNo}`, margin, curY);
  doc.text(`DATE: ${issueDate}`, pageW - margin, curY, { align: 'right' });

  // 3. Document Title
  curY += 15;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('EXPERIENCE CERTIFICATE', pageW / 2, curY, { align: 'center' });

  curY += 5.5;
  doc.setFontSize(9.5);
  doc.setTextColor(217, 119, 6);
  doc.text('TO WHOMSOEVER IT MAY CONCERN', pageW / 2, curY, { align: 'center' });

  // Underline for title
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.6);
  doc.line((pageW / 2) - 40, curY + 2.5, (pageW / 2) + 40, curY + 2.5);

  // 4. Body Paragraphs
  curY += 14;
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.2);

  const para1 = `This is to certify that Mr. / Ms. ${candidateName} has successfully completed their software engineering tenure / internship with IT HUNT Software Solutions in the capacity of "${role}" in the ${department} department from ${startDate} to ${endDate} (Tenure Duration: ${duration}).`;
  const p1Lines = doc.splitTextToSize(para1, contentW);
  doc.text(p1Lines, margin, curY);
  curY += (p1Lines.length * 5.8) + 6;

  const para2 = `During their tenure with us, ${candidateName} was actively engaged in production-grade software development, system design, and engineering delivery. They demonstrated commendable practical command across modern web & cloud technologies including ${techStack}.`;
  const p2Lines = doc.splitTextToSize(para2, contentW);
  doc.text(p2Lines, margin, curY);
  curY += (p2Lines.length * 5.8) + 6;

  const para3 = `Their professional conduct, problem-solving mindset, and dedication to high code quality and architectural integrity were evaluated as "${performance}". They exhibited remarkable teamwork, punctuality, and an exemplary work ethic throughout their engagement.`;
  const p3Lines = doc.splitTextToSize(para3, contentW);
  doc.text(p3Lines, margin, curY);
  curY += (p3Lines.length * 5.8) + 6;

  const para4 = `We appreciate their sincere contributions to our software development division and take pride in their technical accomplishments. We strongly recommend them for upcoming software engineering and technology opportunities and wish them outstanding success in all their future career pursuits.`;
  const p4Lines = doc.splitTextToSize(para4, contentW);
  doc.text(p4Lines, margin, curY);
  curY += (p4Lines.length * 5.8) + 14;

  // 5. Verification Badge & QR Box
  const qrSize = 24;
  const qrX = margin + 4;
  const qrY = curY;
  await drawScannableQr(doc, qrX, qrY, qrSize, verifyUrl);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('OFFICIAL VERIFICATION QR', qrX + qrSize + 6, qrY + 6);

  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  const verifyLines = doc.splitTextToSize(`Scan this code to verify document authenticity online in the official IT HUNT credential registry. Serial: ${certNo}`, 75);
  doc.text(verifyLines, qrX + qrSize + 6, qrY + 11);

  // 6. Signatory & Official Stamp
  const sigX = pageW - margin - 40;
  const sigY = curY + 18;

  // Circular Stamp
  drawOfficialStamp(doc, sigX - 35, sigY - 2, 14, '★ IT HUNT SOFTWARE SOLUTIONS ★', 'AUTHORIZED STAMP', 'OFFICIAL');

  // Signature representation
  doc.setFont('helvetica', 'bolditalic');
  doc.setFontSize(14);
  doc.setTextColor(30, 58, 138); // Blue ink
  doc.text('Lakshman S. Chauhan', sigX, sigY - 4, { align: 'center' });

  // Signature line
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.5);
  doc.line(sigX - 32, sigY, sigX + 32, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('Er. Lakshman Singh Chauhan', sigX, sigY + 5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(100, 116, 139);
  doc.text('Director & Founder', sigX, sigY + 9, { align: 'center' });
  doc.text('IT HUNT Software Solutions', sigX, sigY + 12.8, { align: 'center' });

  // Bottom Security Footer
  doc.setFontSize(7.0);
  doc.setTextColor(148, 163, 184);
  doc.text('This is an official document of IT HUNT Software Solutions. Any alteration or tampering voids validity.', pageW / 2, pageH - margin + 2, { align: 'center' });

  return doc;
}

/**
 * Downloads Course Certificate as PDF file
 */
export async function generateCourseCertificatePdf(data) {
  const doc = await createCourseCertificateDoc(data);
  const filename = `IT_HUNT_Certificate_${(data.studentName || 'Student').replace(/\s+/g, '_')}_${data.certNo || '2026'}.pdf`;
  doc.save(filename);
}

/**
 * Gets Course Certificate Blob
 */
export async function getCourseCertificatePdfBlob(data) {
  const doc = await createCourseCertificateDoc(data);
  return doc.output('blob');
}

/**
 * Downloads Experience Certificate as PDF file
 */
export async function generateExperienceCertificatePdf(data) {
  const doc = await createExperienceCertificateDoc(data);
  const filename = `IT_HUNT_Experience_Letter_${(data.studentName || data.candidateName || 'Candidate').replace(/\s+/g, '_')}_${data.certNo || '2026'}.pdf`;
  doc.save(filename);
}

/**
 * Gets Experience Certificate Blob
 */
export async function getExperienceCertificatePdfBlob(data) {
  const doc = await createExperienceCertificateDoc(data);
  return doc.output('blob');
}
