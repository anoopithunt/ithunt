import { jsPDF } from 'jspdf';

/**
 * Clean & Minimalist Color Themes for Single-Page Professional CV
 */
const CV_THEMES = {
  classic: {
    name: 'Classic Minimalist',
    heading: [34, 34, 34],        // Deep Charcoal #222222
    body: [50, 50, 50],           // Charcoal #323232
    muted: [100, 100, 100],       // Medium Slate Gray #646464
    barFilled: [50, 50, 50],      // Dark Charcoal Bar
    barTrack: [225, 228, 232]     // Clean Light Gray Track
  },
  slate: {
    name: 'Executive Slate',
    heading: [15, 23, 42],        // Deep Navy Slate #0f172a
    body: [51, 65, 85],           // Slate Body #334155
    muted: [100, 116, 139],       // Slate Muted #64748b
    barFilled: [30, 41, 59],      // Dark Slate Bar
    barTrack: [226, 232, 240]
  },
  orange: {
    name: 'IT HUNT Warm',
    heading: [30, 30, 30],
    body: [50, 50, 50],
    muted: [100, 100, 100],
    barFilled: [234, 88, 12],     // Warm Brand Orange
    barTrack: [254, 215, 170]
  },
  emerald: {
    name: 'Emerald Clean',
    heading: [20, 30, 25],
    body: [45, 55, 50],
    muted: [90, 105, 98],
    barFilled: [5, 150, 105],     // Emerald
    barTrack: [209, 250, 229]
  }
};

/**
 * Generate a clean, minimalist 1-page Professional CV matching the classic editorial standard
 * (Left-aligned serif typography, clean whitespace, 2-column skills, languages with progress bars, fits 1 full page)
 * @param {Object} cvData - The candidate details
 * @param {string} themeKey - Theme choice ('classic', 'slate', 'orange', 'emerald')
 * @returns {jsPDF} The jsPDF document instance (guaranteed 1 page)
 */
export function generateProfessionalCvPdf(cvData, themeKey = 'classic') {
  const theme = CV_THEMES[themeKey] || CV_THEMES.classic;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 18;
  const contentWidth = pageWidth - (marginX * 2); // 174mm
  const colWidth = (contentWidth - 8) / 2;         // 83mm per column

  // 1. Prepare & Sanitize Data
  const fullName = (cvData.fullName || 'Candidate Name').trim();
  const summary = (cvData.summary || '').trim();

  // Contact info
  const contactParts = [];
  if (cvData.phone) contactParts.push(cvData.phone.trim());
  if (cvData.email) contactParts.push(cvData.email.trim());
  if (cvData.location) contactParts.push(cvData.location.trim());
  if (cvData.linkedin) contactParts.push(cvData.linkedin.replace(/^https?:\/\/(www\.)?/, '').trim());
  if (cvData.portfolio) contactParts.push(cvData.portfolio.replace(/^https?:\/\/(www\.)?/, '').trim());
  else if (cvData.github) contactParts.push(cvData.github.replace(/^https?:\/\/(www\.)?/, '').trim());

  // Skills: list of individual bullet skills
  let skillItems = [];
  if (Array.isArray(cvData.skills)) {
    cvData.skills.forEach(s => {
      if (typeof s === 'string') {
        const parts = s.split(/[,;\n]/).map(x => x.trim()).filter(Boolean);
        skillItems.push(...parts);
      } else if (s && s.items) {
        const parts = (typeof s.items === 'string' ? s.items.split(/[,;\n]/) : s.items).map(x => x.trim()).filter(Boolean);
        skillItems.push(...parts);
      }
    });
  } else if (typeof cvData.skills === 'string') {
    skillItems = cvData.skills.split(/[,;\n]/).map(s => s.trim()).filter(Boolean);
  }

  // Deduplicate and trim skills
  skillItems = Array.from(new Set(skillItems)).filter(Boolean);

  // Experience
  const experiences = Array.isArray(cvData.experience) ? cvData.experience : [];

  // Featured Projects (if any)
  const projects = Array.isArray(cvData.projects) ? cvData.projects : [];

  // Education
  const educations = Array.isArray(cvData.education) ? cvData.education : [];

  // Languages & Certifications
  const languages = Array.isArray(cvData.languages) && cvData.languages.length > 0 
    ? cvData.languages 
    : [
        { name: 'Hindi', levelText: 'Native speaker', isNative: true },
        { name: 'English', code: 'C2', proficiency: 'Proficient', percent: 92 },
        { name: 'Bengali', code: 'B2', proficiency: 'Upper-intermediate', percent: 70 }
      ];

  // 2. Budget Height Calculation & Adaptive Scaling
  // We calculate total required height at standard spacing, then scale to gracefully fit exactly 1 page.
  const targetBottom = pageHeight - 14; // 283mm
  const startY = 16;
  const availableHeight = targetBottom - startY; // ~267mm

  // Rough estimation of height needed at standard size:
  // Header: 18mm
  // Summary: ~20mm
  // Skills: ceil(items / 2) * 4.5 + 10mm
  // Experience: expCount * 8 + totalBullets * 4 + 10mm
  // Education: eduCount * 10 + 8mm
  // Projects: projCount * 12 + 8mm
  // Languages: 20mm
  const estimatedSkillsRows = Math.ceil(Math.min(skillItems.length || 8, 12) / 2);
  let totalBullets = 0;
  experiences.slice(0, 2).forEach(e => {
    totalBullets += Math.min(e.points ? e.points.length : 2, 4);
  });
  let totalProjectLines = projects.slice(0, 1).length * 3;

  const estimatedTotalHeight = 
    18 + // Header
    (summary ? 22 : 0) +
    (skillItems.length ? (estimatedSkillsRows * 4.5 + 10) : 0) +
    (experiences.length ? (experiences.slice(0, 2).length * 8 + totalBullets * 4 + 10) : 0) +
    (projects.length ? (totalProjectLines * 4 + 10) : 0) +
    (educations.length ? (educations.slice(0, 2).length * 9 + 10) : 0) +
    (languages.length ? 22 : 0);

  // Derive optimal vertical scaling parameters so CV fills the page cleanly without overflow
  let sectionGap = 6.5;
  let bodyFontSize = 8.8;
  let bodyLineHeight = 4.0;
  let titleFontSize = 25;

  if (estimatedTotalHeight > availableHeight) {
    // Dense content -> compress slightly
    const compression = Math.max(0.78, availableHeight / estimatedTotalHeight);
    sectionGap = Math.max(3.8, 6.5 * compression);
    bodyFontSize = Math.max(8.0, 8.8 * compression);
    bodyLineHeight = Math.max(3.4, 4.0 * compression);
    titleFontSize = Math.max(22, 25 * compression);
  } else if (estimatedTotalHeight < availableHeight * 0.75) {
    // Sparse content -> expand gaps gracefully so it fills the full page
    sectionGap = 8.5;
    bodyFontSize = 9.2;
    bodyLineHeight = 4.5;
    titleFontSize = 27;
  }

  let currentY = startY;

  // Helper: Draw Section Header (matching the attached image: uppercase, bold serif, clean space)
  const drawSectionHeader = (title) => {
    currentY += (currentY === startY ? 0 : sectionGap);
    doc.setFont('times', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...theme.heading);
    doc.text(title.toUpperCase(), marginX, currentY);
    currentY += 4.5;
  };

  // -------------------------------------------------------------
  // 1. CANDIDATE HEADER (Name & Single-Line Contact Details)
  // -------------------------------------------------------------
  doc.setFont('times', 'bold');
  doc.setFontSize(titleFontSize);
  doc.setTextColor(...theme.heading);
  doc.text(fullName, marginX, currentY);
  currentY += (titleFontSize * 0.35) + 1.5;

  if (contactParts.length > 0) {
    doc.setFont('times', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...theme.muted);
    const contactLine = contactParts.join(' | ');
    const lines = doc.splitTextToSize(contactLine, contentWidth);
    lines.slice(0, 2).forEach(line => {
      doc.text(line, marginX, currentY);
      currentY += 3.8;
    });
  }
  currentY += 1.5;

  // -------------------------------------------------------------
  // 2. SUMMARY SECTION
  // -------------------------------------------------------------
  if (summary) {
    drawSectionHeader('Summary');
    doc.setFont('times', 'normal');
    doc.setFontSize(bodyFontSize);
    doc.setTextColor(...theme.body);

    const summaryLines = doc.splitTextToSize(summary, contentWidth);
    // Limit to max 4-5 lines to preserve 1-page budget
    summaryLines.slice(0, 5).forEach(line => {
      doc.text(line, marginX, currentY);
      currentY += bodyLineHeight;
    });
  }

  // -------------------------------------------------------------
  // 3. SKILLS SECTION (2-Column Bulleted List, exactly like image)
  // -------------------------------------------------------------
  if (skillItems.length > 0) {
    drawSectionHeader('Skills');

    // Take top 8-12 skills to preserve clean 2-column aesthetic
    const displaySkills = skillItems.slice(0, 12);
    const half = Math.ceil(displaySkills.length / 2);
    const col1 = displaySkills.slice(0, half);
    const col2 = displaySkills.slice(half);

    const skillsStartY = currentY;
    const col2X = marginX + colWidth + 8;

    doc.setFont('times', 'normal');
    doc.setFontSize(bodyFontSize);
    doc.setTextColor(...theme.body);

    // Left Column
    col1.forEach((item, idx) => {
      const y = skillsStartY + (idx * bodyLineHeight);
      doc.text(`•   ${item}`, marginX + 2, y);
    });

    // Right Column
    col2.forEach((item, idx) => {
      const y = skillsStartY + (idx * bodyLineHeight);
      doc.text(`•   ${item}`, col2X + 2, y);
    });

    currentY = skillsStartY + (half * bodyLineHeight) + 1.5;
  }

  // -------------------------------------------------------------
  // 4. EXPERIENCE SECTION
  // -------------------------------------------------------------
  if (experiences.length > 0) {
    drawSectionHeader('Experience');

    // Fit 1-2 major roles
    experiences.slice(0, 2).forEach((exp, eIdx) => {
      if (currentY > targetBottom - 35) return; // safeguard

      // Role, Company, Duration line
      doc.setFont('times', 'bold');
      doc.setFontSize(9.2);
      doc.setTextColor(...theme.heading);

      const roleCompanyDate = [
        exp.role || 'Software Engineering Intern',
        exp.company || 'IT HUNT Software Studio',
        exp.duration || '2026'
      ].filter(Boolean).join(', ');

      const headerLines = doc.splitTextToSize(roleCompanyDate, contentWidth);
      headerLines.forEach(hl => {
        doc.text(hl, marginX, currentY);
        currentY += 4.0;
      });

      // Location line
      if (exp.location) {
        doc.setFont('times', 'normal');
        doc.setFontSize(8.4);
        doc.setTextColor(...theme.muted);
        doc.text(exp.location, marginX, currentY);
        currentY += 3.8;
      }

      // Bullet points
      if (exp.points && exp.points.length > 0) {
        doc.setFont('times', 'normal');
        doc.setFontSize(bodyFontSize);
        doc.setTextColor(...theme.body);

        const points = exp.points.slice(0, 4); // Up to 4 concise impact bullets
        points.forEach(pt => {
          if (currentY > targetBottom - 18) return;

          const bulletText = `•   ${pt}`;
          const wrapped = doc.splitTextToSize(bulletText, contentWidth - 4);
          doc.text(wrapped[0], marginX + 3, currentY);
          currentY += bodyLineHeight;

          for (let k = 1; k < wrapped.length; k++) {
            if (currentY > targetBottom - 14) break;
            doc.text(wrapped[k], marginX + 7, currentY);
            currentY += bodyLineHeight;
          }
        });
      }

      if (eIdx < experiences.length - 1) {
        currentY += 2;
      }
    });
  }

  // -------------------------------------------------------------
  // 5. FEATURED PROJECTS (Compact, if available and space allows)
  // -------------------------------------------------------------
  if (projects.length > 0 && currentY < targetBottom - 38) {
    drawSectionHeader('Featured Projects');

    projects.slice(0, 1).forEach(proj => {
      doc.setFont('times', 'bold');
      doc.setFontSize(9.2);
      doc.setTextColor(...theme.heading);

      const titleLine = [proj.name, proj.stack].filter(Boolean).join(' — ');
      doc.text(titleLine, marginX, currentY);
      currentY += 4.0;

      if (proj.description) {
        doc.setFont('times', 'normal');
        doc.setFontSize(bodyFontSize);
        doc.setTextColor(...theme.body);

        const descLines = doc.splitTextToSize(proj.description, contentWidth);
        descLines.slice(0, 2).forEach(dl => {
          doc.text(dl, marginX, currentY);
          currentY += bodyLineHeight;
        });
      }
    });
  }

  // -------------------------------------------------------------
  // 6. EDUCATION AND TRAINING SECTION
  // -------------------------------------------------------------
  if (educations.length > 0 && currentY < targetBottom - 30) {
    drawSectionHeader('Education and Training');

    educations.slice(0, 2).forEach((edu, eduIdx) => {
      if (currentY > targetBottom - 15) return;

      doc.setFont('times', 'bold');
      doc.setFontSize(9.2);
      doc.setTextColor(...theme.heading);
      doc.text(edu.degree || 'Degree / Diploma in Engineering', marginX, currentY);
      currentY += 3.8;

      doc.setFont('times', 'normal');
      doc.setFontSize(8.4);
      doc.setTextColor(...theme.body);
      const eduDetail = [
        edu.institution || 'University / Institute Name',
        edu.year || '',
        edu.score || ''
      ].filter(Boolean).join(', ');

      doc.text(eduDetail, marginX, currentY);
      currentY += 4.2;
    });
  }

  // -------------------------------------------------------------
  // 7. LANGUAGES SECTION (With visual progress bars as attached)
  // -------------------------------------------------------------
  if (languages.length > 0 && currentY < targetBottom - 24) {
    drawSectionHeader('Languages');

    // 1. Native speaker text if any
    const nativeLangs = languages.filter(l => l.isNative || l.levelText === 'Native speaker' || l.proficiency?.toLowerCase().includes('native'));
    if (nativeLangs.length > 0) {
      doc.setFont('times', 'bold');
      doc.setFontSize(8.8);
      doc.setTextColor(...theme.heading);
      const nativeNames = nativeLangs.map(l => l.name).join(', ');
      doc.text(`${nativeNames}: `, marginX, currentY);

      const nWidth = doc.getTextWidth(`${nativeNames}: `);
      doc.setFont('times', 'normal');
      doc.setTextColor(...theme.body);
      doc.text('Native speaker', marginX + nWidth, currentY);
      currentY += 5.5;
    }

    // 2. Proficiency bar languages (e.g. English C2, Bengali B2)
    const barLangs = languages.filter(l => !l.isNative && l.levelText !== 'Native speaker' && !l.proficiency?.toLowerCase().includes('native'));
    
    if (barLangs.length > 0 && currentY < targetBottom - 14) {
      const langColWidth = (contentWidth - 10) / 2; // ~82mm
      const barHeight = 2.0;

      // Render 2 side-by-side language meters
      barLangs.slice(0, 2).forEach((lang, lIdx) => {
        const langX = marginX + (lIdx * (langColWidth + 10));
        const langY = currentY;

        // Top line: "English:" on left, "C2" on right
        doc.setFont('times', 'normal');
        doc.setFontSize(8.4);
        doc.setTextColor(...theme.heading);
        doc.text(`${lang.name}:`, langX, langY);

        if (lang.code) {
          doc.text(lang.code, langX + langColWidth, langY, { align: 'right' });
        }

        // Progress bar: track + filled
        const barY = langY + 1.8;
        const fillPercent = Math.min(Math.max(lang.percent || 80, 20), 100) / 100;
        const filledWidth = langColWidth * fillPercent;

        // Background Track
        doc.setFillColor(...theme.barTrack);
        doc.rect(langX, barY, langColWidth, barHeight, 'F');

        // Filled Portion
        doc.setFillColor(...theme.barFilled);
        doc.rect(langX, barY, filledWidth, barHeight, 'F');

        // Bottom label: "Proficient" / "Upper-intermediate"
        if (lang.proficiency) {
          doc.setFont('times', 'normal');
          doc.setFontSize(7.8);
          doc.setTextColor(...theme.muted);
          doc.text(lang.proficiency, langX, barY + barHeight + 3.2);
        }
      });

      currentY += 12;
    }
  }

  // -------------------------------------------------------------
  // GUARANTEE STRICT SINGLE PAGE
  // -------------------------------------------------------------
  // If jsPDF accidentally created a second page, remove all extra pages
  while (doc.getNumberOfPages() > 1) {
    doc.deletePage(doc.getNumberOfPages());
  }

  return doc;
}

/**
 * Trigger immediate browser download of the generated single-page PDF CV
 */
export function downloadProfessionalCvPdf(cvData, themeKey = 'classic') {
  const doc = generateProfessionalCvPdf(cvData, themeKey);
  const cleanName = (cvData.fullName || 'Candidate')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${cleanName}_CV.pdf`;
  doc.save(filename);
  return filename;
}
