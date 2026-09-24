import { jsPDF } from 'jspdf';

/**
 * Color palettes for Professional CV
 */
const CV_THEMES = {
  orange: {
    primary: [234, 88, 12],    // #ea580c Warm Brand Orange
    secondary: [15, 23, 42],   // #0f172a Deep Navy Slate
    accent: [217, 119, 6],     // #d97706 Amber
    text: [30, 41, 59],        // #1e293b Dark Slate
    muted: [100, 116, 139],    // #64748b Slate Muted
    line: [226, 232, 240],     // #e2e8f0 Soft Border
    bgLight: [255, 247, 237]   // #fff7ed Warm Light
  },
  blue: {
    primary: [29, 78, 216],    // #1d4ed8 Tech Blue
    secondary: [15, 23, 42],   // #0f172a Deep Navy Slate
    accent: [2, 132, 199],     // #0284c7 Ocean Blue
    text: [30, 41, 59],
    muted: [100, 116, 139],
    line: [226, 232, 240],
    bgLight: [239, 246, 255]
  },
  green: {
    primary: [5, 150, 105],    // #059669 Emerald
    secondary: [15, 23, 42],
    accent: [16, 185, 129],
    text: [30, 41, 59],
    muted: [100, 116, 139],
    line: [226, 232, 240],
    bgLight: [236, 253, 245]
  },
  classic: {
    primary: [51, 65, 85],     // #334155 Graphite
    secondary: [15, 23, 42],
    accent: [71, 85, 105],
    text: [30, 41, 59],
    muted: [100, 116, 139],
    line: [226, 232, 240],
    bgLight: [248, 250, 252]
  }
};

/**
 * Generate a high-impact, ATS-optimized Professional CV / Resume in PDF format
 * @param {Object} cvData - The student / candidate details
 * @param {string} themeKey - Theme choice ('orange', 'blue', 'green', 'classic')
 * @returns {jsPDF} The jsPDF document instance
 */
export function generateProfessionalCvPdf(cvData, themeKey = 'orange') {
  const theme = CV_THEMES[themeKey] || CV_THEMES.orange;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 14;
  const contentWidth = pageWidth - (marginX * 2);
  let currentY = 12;

  // Helper: check page overflow and add new page
  const checkPageBreak = (neededHeight) => {
    if (currentY + neededHeight > pageHeight - 16) {
      doc.addPage();
      currentY = 16;
      // Draw top subtle accent bar on page 2+
      doc.setFillColor(...theme.primary);
      doc.rect(0, 0, pageWidth, 2.5, 'F');
      return true;
    }
    return false;
  };

  // 1. Top Decorative Brand Accent Strip
  doc.setFillColor(...theme.primary);
  doc.rect(0, 0, pageWidth, 4, 'F');
  doc.setFillColor(...theme.secondary);
  doc.rect(0, 4, pageWidth, 1.2, 'F');

  currentY = 16;

  // 2. Candidate Header (Name & Headline)
  const fullName = (cvData.fullName || 'CANDIDATE NAME').trim().toUpperCase();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(21);
  doc.setTextColor(...theme.secondary);
  doc.text(fullName, marginX, currentY);
  currentY += 6.5;

  const headline = cvData.title || 'Full-Stack Software Engineer | Production Systems & Cloud';
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...theme.primary);
  doc.text(headline, marginX, currentY);
  currentY += 5.5;

  // 3. Contact & Social Link Row
  const contactParts = [];
  if (cvData.email) contactParts.push(cvData.email);
  if (cvData.phone) contactParts.push(cvData.phone);
  if (cvData.location) contactParts.push(cvData.location);
  if (cvData.linkedin) contactParts.push(cvData.linkedin.replace(/^https?:\/\/(www\.)?/, ''));
  if (cvData.github) contactParts.push(cvData.github.replace(/^https?:\/\/(www\.)?/, ''));
  if (cvData.portfolio) contactParts.push(cvData.portfolio.replace(/^https?:\/\/(www\.)?/, ''));

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...theme.muted);

  const contactString = contactParts.join('  •  ');
  const contactLines = doc.splitTextToSize(contactString, contentWidth);
  contactLines.forEach(line => {
    doc.text(line, marginX, currentY);
    currentY += 4;
  });
  currentY += 1.5;

  // Divider Line
  doc.setDrawColor(...theme.line);
  doc.setLineWidth(0.5);
  doc.line(marginX, currentY, marginX + contentWidth, currentY);
  currentY += 5;

  // Helper: Section Header Generator
  const drawSectionHeader = (title) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...theme.primary);
    doc.text(title.toUpperCase(), marginX, currentY);
    
    // Bottom accent underline
    const textWidth = doc.getTextWidth(title.toUpperCase());
    doc.setDrawColor(...theme.primary);
    doc.setLineWidth(0.8);
    doc.line(marginX, currentY + 1.5, marginX + textWidth + 4, currentY + 1.5);
    
    doc.setDrawColor(...theme.line);
    doc.setLineWidth(0.3);
    doc.line(marginX + textWidth + 6, currentY + 1.5, marginX + contentWidth, currentY + 1.5);
    
    currentY += 6.5;
  };

  // 4. Professional Summary Section
  if (cvData.summary && cvData.summary.trim()) {
    drawSectionHeader('Professional Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...theme.text);

    const summaryLines = doc.splitTextToSize(cvData.summary.trim(), contentWidth);
    summaryLines.forEach(line => {
      checkPageBreak(5);
      doc.text(line, marginX, currentY);
      currentY += 4.2;
    });
    currentY += 3;
  }

  // 5. Technical Skills & Core Competencies
  if (cvData.skills && (cvData.skills.length > 0 || typeof cvData.skills === 'string')) {
    drawSectionHeader('Technical Skills & Competencies');
    
    // Format skills: either array of categories or raw string
    let skillCategories = [];
    if (Array.isArray(cvData.skills)) {
      skillCategories = cvData.skills;
    } else if (typeof cvData.skills === 'string') {
      const lines = cvData.skills.split('\n').filter(l => l.trim());
      skillCategories = lines.map(line => {
        const parts = line.split(':');
        if (parts.length > 1) {
          return { category: parts[0].trim(), items: parts.slice(1).join(':').trim() };
        }
        return { category: 'Core Stack', items: line.trim() };
      });
    }

    doc.setFontSize(9);
    skillCategories.forEach(skill => {
      checkPageBreak(5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...theme.secondary);
      const catLabel = `•  ${skill.category}: `;
      doc.text(catLabel, marginX, currentY);

      const labelWidth = doc.getTextWidth(catLabel);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...theme.text);

      const itemsStr = Array.isArray(skill.items) ? skill.items.join(', ') : skill.items;
      const itemsLines = doc.splitTextToSize(itemsStr, contentWidth - labelWidth);

      if (itemsLines.length > 0) {
        doc.text(itemsLines[0], marginX + labelWidth, currentY);
        for (let i = 1; i < itemsLines.length; i++) {
          currentY += 4;
          checkPageBreak(4);
          doc.text(itemsLines[i], marginX + labelWidth, currentY);
        }
      }
      currentY += 4.5;
    });
    currentY += 2;
  }

  // 6. Experience & Software Internships
  if (cvData.experience && cvData.experience.length > 0) {
    drawSectionHeader('Professional Experience & Internships');

    cvData.experience.forEach(exp => {
      checkPageBreak(18);

      // Title & Dates
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...theme.secondary);
      doc.text(exp.role || 'Software Engineering Intern', marginX, currentY);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...theme.primary);
      const durationStr = exp.duration || '2026';
      doc.text(durationStr, marginX + contentWidth, currentY, { align: 'right' });
      currentY += 4.5;

      // Organization & Location
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...theme.muted);
      const companyLocation = `${exp.company || 'IT HUNT Software Studio & Tech Academy'}${exp.location ? '  |  ' + exp.location : ''}`;
      doc.text(companyLocation, marginX, currentY);
      currentY += 4.5;

      // Bullet Points / Responsibilities
      if (exp.points && exp.points.length > 0) {
        doc.setFontSize(8.7);
        doc.setTextColor(...theme.text);

        exp.points.forEach(point => {
          checkPageBreak(6);
          const bullet = '•';
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(...theme.primary);
          doc.text(bullet, marginX + 2, currentY);

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(...theme.text);
          const pointLines = doc.splitTextToSize(point, contentWidth - 8);
          doc.text(pointLines[0], marginX + 6, currentY);

          for (let i = 1; i < pointLines.length; i++) {
            currentY += 3.8;
            checkPageBreak(4);
            doc.text(pointLines[i], marginX + 6, currentY);
          }
          currentY += 4.2;
        });
      }
      currentY += 2.5;
    });
  }

  // 7. Featured Production Projects
  if (cvData.projects && cvData.projects.length > 0) {
    drawSectionHeader('Featured Software Projects');

    cvData.projects.forEach(proj => {
      checkPageBreak(16);

      // Project Name & Stack
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.8);
      doc.setTextColor(...theme.secondary);
      doc.text(proj.name || 'Project Title', marginX, currentY);

      if (proj.link) {
        const nameW = doc.getTextWidth(proj.name || 'Project Title');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...theme.primary);
        doc.text(`[${proj.link.replace(/^https?:\/\//, '')}]`, marginX + nameW + 3, currentY);
      }

      if (proj.stack) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8.5);
        doc.setTextColor(...theme.muted);
        doc.text(proj.stack, marginX + contentWidth, currentY, { align: 'right' });
      }
      currentY += 4.5;

      // Project Description
      if (proj.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.8);
        doc.setTextColor(...theme.text);

        const descLines = doc.splitTextToSize(proj.description, contentWidth);
        descLines.forEach(dl => {
          checkPageBreak(4.5);
          doc.text(dl, marginX, currentY);
          currentY += 4;
        });
      }

      // Highlights / Outcomes
      if (proj.highlights && proj.highlights.length > 0) {
        doc.setFontSize(8.5);
        proj.highlights.forEach(hl => {
          checkPageBreak(4.5);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(...theme.primary);
          doc.text('–', marginX + 3, currentY);

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(...theme.text);
          const hlLines = doc.splitTextToSize(hl, contentWidth - 8);
          doc.text(hlLines[0], marginX + 7, currentY);
          for (let k = 1; k < hlLines.length; k++) {
            currentY += 3.8;
            checkPageBreak(4);
            doc.text(hlLines[k], marginX + 7, currentY);
          }
          currentY += 4;
        });
      }
      currentY += 2.5;
    });
  }

  // 8. Education
  if (cvData.education && cvData.education.length > 0) {
    drawSectionHeader('Education');

    cvData.education.forEach(edu => {
      checkPageBreak(12);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...theme.secondary);
      doc.text(edu.degree || 'Degree / Diploma', marginX, currentY);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...theme.primary);
      const yearScore = [edu.year, edu.score].filter(Boolean).join('  |  ');
      doc.text(yearScore, marginX + contentWidth, currentY, { align: 'right' });
      currentY += 4.2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.8);
      doc.setTextColor(...theme.muted);
      doc.text(edu.institution || 'University / Institute', marginX, currentY);
      currentY += 5;
    });
    currentY += 1.5;
  }

  // 9. Verified Certifications & Honors
  if (cvData.certifications && cvData.certifications.length > 0) {
    drawSectionHeader('Certifications & Verified Credentials');

    doc.setFontSize(8.8);
    cvData.certifications.forEach(cert => {
      checkPageBreak(5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...theme.primary);
      doc.text('✓', marginX + 1, currentY);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...theme.text);
      const certText = typeof cert === 'string' ? cert : `${cert.title} — ${cert.issuer || 'IT HUNT'}`;
      doc.text(certText, marginX + 5.5, currentY);
      currentY += 4.2;
    });
    currentY += 3;
  }

  // 10. Professional Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Bottom subtle border
    doc.setDrawColor(...theme.line);
    doc.setLineWidth(0.4);
    doc.line(marginX, pageHeight - 11, marginX + contentWidth, pageHeight - 11);

    // Footer text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...theme.muted);
    const footerNote = 'Official Candidate CV  •  Verified through IT HUNT Software Studio & Tech Academy';
    doc.text(footerNote, marginX, pageHeight - 7);

    // Page indicator
    const pageNumText = `Page ${i} of ${totalPages}`;
    doc.text(pageNumText, marginX + contentWidth, pageHeight - 7, { align: 'right' });
  }

  return doc;
}

/**
 * Trigger immediate browser download of the generated PDF CV
 */
export function downloadProfessionalCvPdf(cvData, themeKey = 'orange') {
  const doc = generateProfessionalCvPdf(cvData, themeKey);
  const cleanName = (cvData.fullName || 'Student')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${cleanName}_Professional_CV.pdf`;
  doc.save(filename);
  return filename;
}
