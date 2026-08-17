import { jsPDF } from 'jspdf';

/**
 * Generates and downloads an official 1-page A4 vector Admission Registration Slip.
 * @param {Object} adm - Candidate admission details
 */
export function generateAdmissionPdf(adm) {
  if (!adm) return false;

  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 12;
    const contentWidth = pageWidth - (margin * 2);

    // 1. Background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Outer & Inner Borders
    doc.setDrawColor(234, 88, 12);
    doc.setLineWidth(1.0);
    doc.rect(margin, margin, contentWidth, pageHeight - (margin * 2));
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.4);
    doc.rect(margin + 1.5, margin + 1.5, contentWidth - 3, pageHeight - (margin * 2) - 3);

    // 2. Header Top Banner Background
    doc.setFillColor(255, 247, 237);
    doc.rect(margin + 2, margin + 2, contentWidth - 4, 32, 'F');

    const logoImg = document.querySelector('.receipt-logo-img') || document.querySelector('.brand-logo-img');
    let logoDrawn = false;
    if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
      try {
        doc.addImage(logoImg, 'PNG', margin + 6, margin + 5, 22, 22);
        logoDrawn = true;
      } catch (e) {
        logoDrawn = false;
      }
    }
    
    if (!logoDrawn) {
      doc.setFillColor(234, 88, 12);
      doc.roundedRect(margin + 6, margin + 5, 22, 22, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('IT HUNT', margin + 17, margin + 18, { align: 'center' });
    }

    const textStartX = margin + 33;
    doc.setTextColor(234, 88, 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('IT HUNT', textStartX, margin + 13);

    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('SOFTWARE SOLUTIONS & TECH ACADEMY', textStartX, margin + 19);

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('Dahiyawa Holagarh, Prayagraj, UP - 212502 | Mob: +91 9795771806', textStartX, margin + 24.5);
    doc.text('Email: softtechithunt@gmail.com | Website: ithunt.org', textStartX, margin + 29.5);

    // Right Pill Badge
    doc.setFillColor(234, 88, 12);
    doc.roundedRect(pageWidth - margin - 58, margin + 6, 52, 8, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('OFFICIAL RECEIPT', pageWidth - margin - 32, margin + 11.5, { align: 'center' });

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('ISO 9001:2015 ACCREDITED', pageWidth - margin - 32, margin + 19, { align: 'center' });
    doc.text('CANDIDATE ORIGINAL COPY', pageWidth - margin - 32, margin + 25, { align: 'center' });

    // 3. Title Ribbon
    let curY = margin + 37;
    doc.setFillColor(234, 88, 12);
    doc.rect(margin + 2, curY, contentWidth - 4, 9, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('ADMISSION & INTERNSHIP REGISTRATION ACKNOWLEDGMENT', pageWidth / 2, curY + 6.2, { align: 'center' });

    // 4. Highlight Identifiers Box
    curY += 12;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin + 2, curY, contentWidth - 4, 18, 2, 2, 'FD');

    const colW = (contentWidth - 4) / 3;
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('REGISTRATION NUMBER', margin + 6, curY + 6.5);
    doc.setTextColor(234, 88, 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(adm.registrationNo || 'ITH-2026', margin + 6, curY + 13.5);

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('REGISTRATION DATE & TIME', margin + 6 + colW, curY + 6.5);
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text((adm.date || '') + ' ' + (adm.time || ''), margin + 6 + colW, curY + 13.5);

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('ADMISSION STATUS', margin + 6 + (colW * 2), curY + 6.5);
    doc.setTextColor(5, 150, 105);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('PROVISIONALLY CONFIRMED', margin + 6 + (colW * 2), curY + 13.5);

    // 5. Section 1: Candidate Particulars
    curY += 22;
    doc.setFillColor(255, 247, 237);
    doc.rect(margin + 2, curY, contentWidth - 4, 7.5, 'F');
    doc.setTextColor(234, 88, 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('1. CANDIDATE PARTICULARS', margin + 6, curY + 5.5);

    curY += 9.5;
    const candidateRows = [
      ['Candidate Full Name:', adm.candidateName || '—', "Father's Name:", adm.fatherName || '—'],
      ['Mother\'s Name:', adm.motherName || '—', 'Date of Birth & Gender:', (adm.dob || '—') + ' (' + (adm.gender || 'Male') + ')'],
      ['Contact Mobile:', '+91 ' + (adm.mobile || '—'), 'Email Address:', adm.email || '—'],
      ['Permanent Address:', (adm.address || '—') + ', ' + (adm.district || 'PRAYAGRAJ') + ', UP', '', '']
    ];

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);

    candidateRows.forEach((row, rIdx) => {
      const rowY = curY + (rIdx * 9);
      const isFull = !row[2];
      doc.setFillColor(rIdx % 2 === 0 ? 255 : 248, rIdx % 2 === 0 ? 255 : 250, rIdx % 2 === 0 ? 255 : 252);
      doc.rect(margin + 2, rowY, contentWidth - 4, 9, 'FD');

      if (isFull) {
        doc.setTextColor(71, 85, 105);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.text(row[0], margin + 6, rowY + 6);

        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text(row[1], margin + 46, rowY + 6);
      } else {
        doc.setTextColor(71, 85, 105);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.text(row[0], margin + 6, rowY + 6);

        doc.setTextColor(rIdx === 0 ? 234 : 15, rIdx === 0 ? 88 : 23, rIdx === 0 ? 12 : 42);
        doc.setFont('helvetica', rIdx === 0 ? 'bold' : 'normal');
        doc.setFontSize(9);
        doc.text(row[1], margin + 45, rowY + 6);

        doc.setTextColor(71, 85, 105);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.text(row[2], margin + 98, rowY + 6);

        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text(row[3], margin + 138, rowY + 6);
      }
    });

    curY += (candidateRows.length * 9) + 5;

    // 6. Section 2: Program & Training Allocation
    doc.setFillColor(255, 247, 237);
    doc.rect(margin + 2, curY, contentWidth - 4, 7.5, 'F');
    doc.setTextColor(234, 88, 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('2. ENROLLED PROGRAM & TRAINING ALLOCATION', margin + 6, curY + 5.5);

    curY += 9.5;
    const programRows = [
      ['Enrolled Program / Track:', adm.course || '—'],
      ['Training Campus / Studio:', 'IT HUNT Software Studio & NIELIT Center, Holagarh Campus, Prayagraj'],
      ['Workstation Allotment:', 'Dedicated High-Performance PC + Optical Fiber High-Speed Internet'],
      ['Certifications Guaranteed:', 'ISO 9001:2015 Verified Certificate + Corporate Letter of Recommendation (LOR)'],
      ['Session & Batch Schedule:', 'Academic Batch 2026-2027 • Reporting Time: 09:30 AM Onboarding']
    ];

    programRows.forEach((pRow, pIdx) => {
      const pRowY = curY + (pIdx * 8.5);
      doc.setFillColor(pIdx % 2 === 0 ? 255 : 248, pIdx % 2 === 0 ? 255 : 250, pIdx % 2 === 0 ? 255 : 252);
      doc.rect(margin + 2, pRowY, contentWidth - 4, 8.5, 'FD');

      doc.setTextColor(71, 85, 105);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(pRow[0], margin + 6, pRowY + 5.8);

      doc.setTextColor(pIdx === 0 ? 234 : 15, pIdx === 0 ? 88 : 23, pIdx === 0 ? 12 : 42);
      doc.setFont('helvetica', pIdx === 0 ? 'bold' : 'normal');
      doc.setFontSize(9);
      doc.text(pRow[1], margin + 50, pRowY + 5.8);
    });

    curY += (programRows.length * 8.5) + 5;

    // 7. Section 3: Mandatory Candidate Instructions
    doc.setFillColor(254, 252, 232);
    doc.setDrawColor(254, 240, 138);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin + 2, curY, contentWidth - 4, 30, 2, 2, 'FD');

    doc.setTextColor(133, 77, 14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('MANDATORY CANDIDATE INSTRUCTIONS FOR DAY 1:', margin + 6, curY + 6.5);

    const instructions = [
      '1. Please present a printed or digital copy of this Registration Slip at the campus helpdesk.',
      '2. Carry 2 recent passport-size color photographs and 1 government photo ID proof (Aadhaar / Voter ID).',
      '3. Reporting time is 09:30 AM at IT HUNT Holagarh Campus for orientation and workstation allotment.',
      '4. Official corporate GitHub repository access and live project keys will be issued on Day 1.'
    ];

    doc.setTextColor(113, 63, 18);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    instructions.forEach((inst, iIdx) => {
      doc.text(inst, margin + 6, curY + 12 + (iIdx * 4.5));
    });

    curY += 34;

    // 8. Footer Signatures & Security Stamp
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin + 2, curY, pageWidth - margin - 2, curY);

    curY += 5;
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('SECURITY VERIFIED OFFICIAL DOCUMENT', margin + 6, curY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('Verified via IT HUNT Central Academic Registry Database', margin + 6, curY + 9);
    doc.text('Issued on: ' + (adm.date || '') + ' ' + (adm.time || ''), margin + 6, curY + 14);

    const sigX = pageWidth - margin - 65;
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('AUTHORIZED SIGNATORY:', sigX, curY + 4);

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Mr. Lakshman Singh Chauhan', sigX, curY + 10);

    doc.setTextColor(234, 88, 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('Director & Founder, IT HUNT | MCA', sigX, curY + 15);

    // Save PDF
    const candidateCleanName = (adm.candidateName || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `IT_HUNT_Admission_${adm.registrationNo}_${candidateCleanName}.pdf`;
    
    doc.save(filename);
    return true;
  } catch (err) {
    console.error('Error generating PDF with jsPDF:', err);
    window.print();
    return false;
  }
}
