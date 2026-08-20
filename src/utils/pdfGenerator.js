import { jsPDF } from 'jspdf';

/**
 * Helper to draw standard IT HUNT Header on PDF
 */
function drawHeader(doc, margin, contentWidth, pageWidth, docCode, badgeTitle) {
  // Outer & Inner Borders
  doc.setDrawColor(234, 88, 12);
  doc.setLineWidth(1.0);
  doc.rect(margin, margin, contentWidth, 297 - (margin * 2));
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.4);
  doc.rect(margin + 1.5, margin + 1.5, contentWidth - 3, 297 - (margin * 2) - 3);

  // Header Top Banner Background
  doc.setFillColor(255, 247, 237);
  doc.rect(margin + 2, margin + 2, contentWidth - 4, 30, 'F');

  const logoImg = document.querySelector('.receipt-logo-img') || document.querySelector('.brand-logo-img');
  let logoDrawn = false;
  if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
    try {
      doc.addImage(logoImg, 'PNG', margin + 6, margin + 4, 22, 22);
      logoDrawn = true;
    } catch (e) {
      logoDrawn = false;
    }
  }
  
  if (!logoDrawn) {
    doc.setFillColor(234, 88, 12);
    doc.roundedRect(margin + 6, margin + 4, 22, 22, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('IT HUNT', margin + 17, margin + 17, { align: 'center' });
  }

  const textStartX = margin + 32;
  doc.setTextColor(234, 88, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('IT HUNT', textStartX, margin + 12);

  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('SOFTWARE SOLUTIONS & TECH ACADEMY', textStartX, margin + 18);

  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Dahiyawa Holagarh, Prayagraj, UP - 212502 | Mob: +91 9795771806', textStartX, margin + 23);
  doc.text('Email: softtechithunt@gmail.com | Website: ithunt.org', textStartX, margin + 27.5);

  // Right Pill Badge
  doc.setFillColor(234, 88, 12);
  doc.roundedRect(pageWidth - margin - 56, margin + 5, 50, 7.5, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(badgeTitle || 'OFFICIAL DOCUMENT', pageWidth - margin - 31, margin + 10, { align: 'center' });

  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('ISO 9001:2015 ACCREDITED', pageWidth - margin - 31, margin + 17, { align: 'center' });
  doc.text(docCode || 'ORIGINAL ACADEMIC COPY', pageWidth - margin - 31, margin + 22, { align: 'center' });
}

/**
 * Helper to build and return a jsPDF instance for Admission Slip
 * @param {Object} adm - Candidate admission details
 * @returns {jsPDF|null}
 */
export function createAdmissionPdfDoc(adm) {
  if (!adm) return null;

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

    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    drawHeader(doc, margin, contentWidth, pageWidth, 'CANDIDATE ORIGINAL COPY', 'OFFICIAL RECEIPT');

    // 3. Title Ribbon
    let curY = margin + 35;
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

    return doc;
  } catch (err) {
    console.error('Error building Admission PDF document:', err);
    return null;
  }
}

/**
 * Returns a PDF Blob of the Admission Registration Slip
 * @param {Object} adm - Candidate admission details
 * @returns {Blob|null}
 */
export function getAdmissionPdfBlob(adm) {
  const doc = createAdmissionPdfDoc(adm);
  if (!doc) return null;
  return doc.output('blob');
}

/**
 * Generates and downloads an official 1-page A4 vector Admission Registration Slip.
 * @param {Object} adm - Candidate admission details
 */
export function generateAdmissionPdf(adm) {
  if (!adm) return false;

  try {
    const doc = createAdmissionPdfDoc(adm);
    if (!doc) return false;

    // Save PDF
    const candidateCleanName = (adm.candidateName || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `IT_HUNT_Admission_${adm.registrationNo}_${candidateCleanName}.pdf`;
    
    // Open preview in new tab and download
    const blobUrl = doc.output('bloburl');
    window.open(blobUrl, '_blank');
    doc.save(filename);
    return true;
  } catch (err) {
    console.error('Error generating PDF with jsPDF:', err);
    window.print();
    return false;
  }
}

/**
 * Generates and opens an official Privacy Policy PDF Document.
 */
export function generatePrivacyPolicyPdf(policyData) {
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

    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    drawHeader(doc, margin, contentWidth, pageWidth, 'ITH-POL-2026/01', 'PRIVACY POLICY');

    // Title Ribbon
    let curY = margin + 35;
    doc.setFillColor(234, 88, 12);
    doc.rect(margin + 2, curY, contentWidth - 4, 9, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('OFFICIAL PRIVACY & STUDENT DATA PROTECTION POLICY 2026', pageWidth / 2, curY + 6.2, { align: 'center' });

    // Meta Box
    curY += 12;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin + 2, curY, contentWidth - 4, 14, 2, 2, 'FD');

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('EFFECTIVE DATE:', margin + 6, curY + 5.5);
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(policyData?.effectiveDate || 'January 01, 2026', margin + 6, curY + 10.5);

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('GOVERNING JURISDICTION:', margin + 65, curY + 5.5);
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Prayagraj (Allahabad), UP, India', margin + 65, curY + 10.5);

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('SECURITY COMPLIANCE:', margin + 125, curY + 5.5);
    doc.setTextColor(5, 150, 105);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('ISO 9001:2015 & IT Act Compliant', margin + 125, curY + 10.5);

    curY += 18;

    const sections = policyData?.sections || [
      {
        title: '1. Information We Collect',
        content: 'IT HUNT collects essential candidate details including legal name, contact numbers, email addresses, permanent address, educational credentials, and portfolio links submitted during online registration or on-campus admissions.'
      },
      {
        title: '2. Purpose & Use of Collected Data',
        content: 'Data is strictly utilized for academic enrollment, lab workstation allotment, generating ISO 9001:2015 verified certificates, publishing corporate recommendation letters (LOR), and facilitating direct placement drives with partner software firms.'
      },
      {
        title: '3. Live Client Software & Non-Disclosure (NDA)',
        content: 'Interns working on live client web, mobile, and AI solutions are bound by confidentiality. Source code repositories, client API keys, and database schemas remain the exclusive intellectual property of IT HUNT and client stakeholders.'
      },
      {
        title: '4. Data Security & Storage Architecture',
        content: 'We enforce enterprise-grade security protocols including encrypted data storage, restricted staff authorization, secure SSL communications, and automated backups. We do not sell, rent, or trade student records with third-party telemarketers.'
      },
      {
        title: '5. Student Rights & Verification Access',
        content: 'Enrolled students and alumni have the right to request official academic transcripts, update contact records, or request verification reports for employer background screening at any time.'
      },
      {
        title: '6. Policy Inquiries & Data Officer',
        content: 'For questions regarding this privacy policy or data corrections, contact the IT HUNT Administrative Desk at Dahiyawa Holagarh, Prayagraj, UP - 212502 or via email at softtechithunt@gmail.com.'
      }
    ];

    sections.forEach((sec, sIdx) => {
      // Header for section
      doc.setFillColor(255, 247, 237);
      doc.rect(margin + 2, curY, contentWidth - 4, 6.5, 'F');
      doc.setTextColor(234, 88, 12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(sec.title, margin + 6, curY + 4.8);

      curY += 8;

      // Text for section
      doc.setTextColor(51, 65, 85);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const splitText = doc.splitTextToSize(sec.content, contentWidth - 12);
      doc.text(splitText, margin + 6, curY);

      curY += (splitText.length * 4) + 4.5;
    });

    // Footer Signatures
    curY = pageHeight - margin - 22;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin + 2, curY, pageWidth - margin - 2, curY);

    curY += 4;
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('OFFICIAL IT HUNT POLICY DOCUMENT', margin + 6, curY + 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('Published by IT HUNT Academic Governance Board • Prayagraj, UP', margin + 6, curY + 8.5);

    const sigX = pageWidth - margin - 65;
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('ISSUING AUTHORITY:', sigX, curY + 4);

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Mr. Lakshman Singh Chauhan', sigX, curY + 9);

    doc.setTextColor(234, 88, 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('Director & Founder, IT HUNT | MCA', sigX, curY + 13.5);

    const blobUrl = doc.output('bloburl');
    window.open(blobUrl, '_blank');
    doc.save('IT_HUNT_Privacy_Policy_2026.pdf');
    return true;
  } catch (err) {
    console.error('Error generating Privacy Policy PDF:', err);
    return false;
  }
}

/**
 * Generates and opens an official Terms & Conditions PDF Document.
 */
export function generateTermsConditionsPdf(termsData) {
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

    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    drawHeader(doc, margin, contentWidth, pageWidth, 'ITH-TOC-2026/02', 'TERMS & CONDITIONS');

    // Title Ribbon
    let curY = margin + 35;
    doc.setFillColor(234, 88, 12);
    doc.rect(margin + 2, curY, contentWidth - 4, 9, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('TERMS OF ADMISSION, INTERNSHIP & ACADEMIC REGULATIONS', pageWidth / 2, curY + 6.2, { align: 'center' });

    // Meta Box
    curY += 12;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin + 2, curY, contentWidth - 4, 14, 2, 2, 'FD');

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('ACADEMIC SESSION:', margin + 6, curY + 5.5);
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(termsData?.effectiveDate || '2026 - 2027', margin + 6, curY + 10.5);

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('TRAINING CAMPUS:', margin + 65, curY + 5.5);
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Holagarh Prayagraj Campus, UP', margin + 65, curY + 10.5);

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('CERTIFICATION STANDARD:', margin + 125, curY + 5.5);
    doc.setTextColor(5, 150, 105);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('ISO 9001:2015 Accredited', margin + 125, curY + 10.5);

    curY += 18;

    const sections = termsData?.sections || [
      {
        title: '1. Admission Eligibility & Candidate Representation',
        content: 'Admission to IT HUNT production internships and NIELIT diploma tracks requires valid educational documentation. The candidate certifies that all submitted records are authentic and truthful.'
      },
      {
        title: '2. Lab Workstations & Infrastructure Guidelines',
        content: 'Students are allotted dedicated workstations and high-speed fiber internet. Unauthorized system modifications, software piracy, or hardware damage will result in immediate disciplinary review.'
      },
      {
        title: '3. Sprint Deliverables, Attendance & Code Reviews',
        content: 'Interns must maintain a minimum of 80% lab attendance and actively complete assigned sprint tasks, Git commits, and code review milestones to qualify for course completion.'
      },
      {
        title: '4. Verified Certification & Letter of Recommendation (LOR)',
        content: 'ISO 9001:2015 accredited certificates and Corporate LOR signed by the Director are awarded upon successful presentation of production capstone projects and mentor code audits.'
      },
      {
        title: '5. 100% Career Placement Support Policy',
        content: 'Placement assistance includes resume reviews, mock interviews, and direct interview scheduling with partner software firms. Offer conversion depends on candidate technical performance in client rounds.'
      },
      {
        title: '6. Fee Policy, Transparency & Jurisdiction',
        content: 'All training fees are transparently structured. Any disputes arising under these terms and conditions shall be subject to the exclusive jurisdiction of the competent courts in Prayagraj (Allahabad), Uttar Pradesh.'
      }
    ];

    sections.forEach((sec, sIdx) => {
      doc.setFillColor(255, 247, 237);
      doc.rect(margin + 2, curY, contentWidth - 4, 6.5, 'F');
      doc.setTextColor(234, 88, 12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(sec.title, margin + 6, curY + 4.8);

      curY += 8;

      doc.setTextColor(51, 65, 85);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const splitText = doc.splitTextToSize(sec.content, contentWidth - 12);
      doc.text(splitText, margin + 6, curY);

      curY += (splitText.length * 4) + 4.5;
    });

    // Footer Signatures
    curY = pageHeight - margin - 22;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin + 2, curY, pageWidth - margin - 2, curY);

    curY += 4;
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('OFFICIAL IT HUNT ACADEMIC REGULATIONS', margin + 6, curY + 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('Issued by IT HUNT Directorate & Faculty Board • Prayagraj, UP', margin + 6, curY + 8.5);

    const sigX = pageWidth - margin - 65;
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('AUTHORIZED SIGNATORY:', sigX, curY + 4);

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Mr. Lakshman Singh Chauhan', sigX, curY + 9);

    doc.setTextColor(234, 88, 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('Director & Founder, IT HUNT | MCA', sigX, curY + 13.5);

    const blobUrl = doc.output('bloburl');
    window.open(blobUrl, '_blank');
    doc.save('IT_HUNT_Terms_and_Conditions_2026.pdf');
    return true;
  } catch (err) {
    console.error('Error generating Terms & Conditions PDF:', err);
    return false;
  }
}
