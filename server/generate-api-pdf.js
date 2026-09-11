import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

function generateApiPdf() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;
  let pageNum = 1;

  // Color Palette
  const colors = {
    primary: [15, 23, 42],      // Slate 900
    primaryLight: [30, 41, 59], // Slate 800
    brandOrange: [249, 115, 22],// #f97316
    brandBlue: [14, 165, 233],  // #0ea5e9
    accentBg: [248, 250, 252],  // Slate 50
    cardBorder: [226, 232, 240],// Slate 200
    textDark: [15, 23, 42],
    textMuted: [100, 116, 139],
    white: [255, 255, 255],
    badgeGet: [16, 185, 129],   // Emerald
    badgePost: [14, 165, 233],  // Sky
    badgePatch: [245, 158, 11], // Amber
    badgePut: [139, 92, 246],   // Purple
    badgeDelete: [239, 68, 68]  // Rose
  };

  function drawHeader() {
    // Top banner bar
    doc.setFillColor(...colors.primary);
    doc.rect(0, 0, pageWidth, 28, 'F');

    // Accent line
    doc.setFillColor(...colors.brandOrange);
    doc.rect(0, 27, pageWidth, 1.5, 'F');

    // Title
    doc.setTextColor(...colors.white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('IT HUNT — REST API & DATABASE DIRECTORY', margin, 12);

    // Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(203, 213, 225);
    doc.text('Complete Local & Live Production Endpoints | Database: ithunt (MERN Stack)', margin, 19);

    // Date & Version
    doc.setFontSize(8);
    doc.setTextColor(253, 186, 116);
    doc.text('v2.0.0 | ISO 9001:2015 Accredited | Sep 2026', pageWidth - margin, 19, { align: 'right' });
  }

  function drawFooter(current, total) {
    doc.setFillColor(...colors.primary);
    doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(203, 213, 225);
    doc.text('IT HUNT Software Solutions & Tech Academy — Prayagraj, UP | softtechithunt@gmail.com', margin, pageHeight - 5);

    doc.setTextColor(...colors.white);
    doc.setFont('helvetica', 'bold');
    doc.text(`Page ${current} of ${total}`, pageWidth - margin, pageHeight - 5, { align: 'right' });
  }

  function checkPageBreak(neededSpace = 30) {
    if (y + neededSpace > pageHeight - 16) {
      doc.addPage();
      pageNum++;
      drawHeader();
      y = 35;
    }
  }

  // Draw Page 1 Header
  drawHeader();
  y = 34;

  // Base URLs Card
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 29, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...colors.primary);
  doc.text('API BASE ENVIRONMENTS & REVERSE PROXIES', margin + 4, y + 6);

  const envs = [
    { label: 'Local Backend (Node.js Direct)', url: 'http://localhost:3000/api', badge: 'PORT 3000' },
    { label: 'Local Frontend Proxy (Vite Dev)', url: 'http://localhost:5500/api', badge: 'PORT 5500' },
    { label: 'Live Production (Vercel Cloud)', url: 'https://ithunt.vercel.app/api', badge: 'PRODUCTION' }
  ];

  envs.forEach((item, idx) => {
    const rowY = y + 12 + idx * 5.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(...colors.primaryLight);
    doc.text(`• ${item.label}:`, margin + 4, rowY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(2, 132, 199);
    doc.text(item.url, margin + 55, rowY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`[${item.badge}]`, margin + contentWidth - 4, rowY, { align: 'right' });
  });

  y += 34;

  // API Modules Data
  const modules = [
    {
      title: '1. System & Health Endpoints',
      routes: [
        { method: 'GET', path: '/api/health', desc: 'Backend server & database connection health check (returns database: ithunt)' },
        { method: 'GET', path: '/', desc: 'API Engine root welcome banner and status' }
      ]
    },
    {
      title: '2. Admissions Management',
      routes: [
        { method: 'GET', path: '/api/admissions', desc: 'Retrieve all candidate online admission applications' },
        { method: 'GET', path: '/api/admissions/:id', desc: 'Retrieve single admission record by Registration Number or ID' },
        { method: 'POST', path: '/api/admissions', desc: 'Submit new admission (auto-creates records in admissions, students, and users)' },
        { method: 'PATCH', path: '/api/admissions/:id/status', desc: 'Update candidate admission status (Confirmed / Pending / Verified)' },
        { method: 'DELETE', path: '/api/admissions/:id', desc: 'Delete admission application from database' }
      ]
    },
    {
      title: '3. Students & Academic Profiles',
      routes: [
        { method: 'GET', path: '/api/students', desc: 'List enrolled students with optional filters (?course=&batch=&status=)' },
        { method: 'GET', path: '/api/students/:id', desc: 'Get student academic details by enrollment number or ID' },
        { method: 'POST', path: '/api/students/register', desc: 'Direct student registration into academic roster' },
        { method: 'PUT', path: '/api/students/:id', desc: 'Update student academic details and profile information' },
        { method: 'DELETE', path: '/api/students/:id', desc: 'Remove student profile from roster' }
      ]
    },
    {
      title: '4. Authentication & User Accounts',
      routes: [
        { method: 'POST', path: '/api/auth/login', desc: 'Authenticate student or admin; returns JWT bearer token' },
        { method: 'GET', path: '/api/auth/me', desc: 'Get currently authenticated user details from token' },
        { method: 'GET', path: '/api/auth/users', desc: 'List all registered portal accounts (Requires Admin token)' },
        { method: 'PUT', path: '/api/auth/users/:id', desc: 'Update user account role, credentials, and profile' },
        { method: 'DELETE', path: '/api/auth/users/:id', desc: 'Delete user account' }
      ]
    },
    {
      title: "5. NIELIT 'O' & 'A' Level Projects",
      routes: [
        { method: 'GET', path: '/api/nielit-projects', desc: 'List all NIELIT project guide applications and payment UTRs' },
        { method: 'GET', path: '/api/nielit-projects/:id', desc: 'Get single NIELIT project guide submission' },
        { method: 'POST', path: '/api/nielit-projects', desc: 'Submit project guide request and documentation' },
        { method: 'PUT', path: '/api/nielit-projects/:id', desc: 'Update NIELIT guide assignment, approval, or remarks' },
        { method: 'DELETE', path: '/api/nielit-projects/:id', desc: 'Delete NIELIT project application' }
      ]
    },
    {
      title: '6. Careers & Faculty Hiring',
      routes: [
        { method: 'GET', path: '/api/careers/applications', desc: 'List faculty and instructor job applications' },
        { method: 'POST', path: '/api/careers/apply', desc: 'Submit instructor or faculty employment application' },
        { method: 'PATCH', path: '/api/careers/applications/:id/status', desc: 'Update applicant status (Shortlisted / Interviewed / Hired)' },
        { method: 'DELETE', path: '/api/careers/applications/:id', desc: 'Delete job application' }
      ]
    },
    {
      title: '7. Internships (3-Month & 6-Month)',
      routes: [
        { method: 'GET', path: '/api/internships/applications', desc: 'List student software internship applications' },
        { method: 'POST', path: '/api/internships/apply', desc: 'Apply for software engineering internship' },
        { method: 'PATCH', path: '/api/internships/applications/:id/status', desc: 'Update internship progress or completion status' },
        { method: 'DELETE', path: '/api/internships/applications/:id', desc: 'Remove internship application' }
      ]
    },
    {
      title: '8. Event RSVPs (Campus Summits & Hackathons)',
      routes: [
        { method: 'GET', path: '/api/events/rsvps', desc: 'List attendees registered for tech summits and hackathons' },
        { method: 'POST', path: '/api/events/rsvp', desc: 'Register attendance / RSVP for upcoming tech event' },
        { method: 'DELETE', path: '/api/events/rsvps/:id', desc: 'Cancel event reservation' }
      ]
    },
    {
      title: '9. Student Reviews & Ratings',
      routes: [
        { method: 'GET', path: '/api/reviews', desc: 'List approved student reviews and star ratings' },
        { method: 'POST', path: '/api/reviews', desc: 'Submit student review and feedback' },
        { method: 'PATCH', path: '/api/reviews/:id/approve', desc: 'Admin approval for public display' },
        { method: 'DELETE', path: '/api/reviews/:id', desc: 'Delete review' }
      ]
    },
    {
      title: '10. Fees Ledger & Receipts',
      routes: [
        { method: 'GET', path: '/api/fees', desc: 'View complete financial fee transactions ledger' },
        { method: 'GET', path: '/api/fees/:id', desc: 'Retrieve fee receipt details by receipt number' },
        { method: 'POST', path: '/api/fees', desc: 'Record new student fee payment and generate receipt' },
        { method: 'DELETE', path: '/api/fees/:id', desc: 'Delete fee payment entry' }
      ]
    },
    {
      title: '11. Certificates & Public Verification',
      routes: [
        { method: 'GET', path: '/api/certificates', desc: 'List verified student certificates' },
        { method: 'GET', path: '/api/certificates/verify/:certNo', desc: 'Public certificate verification registry' },
        { method: 'POST', path: '/api/certificates', desc: 'Issue new verified student certificate' },
        { method: 'DELETE', path: '/api/certificates/:id', desc: 'Revoke certificate' }
      ]
    },
    {
      title: '12. Student Capstone Projects',
      routes: [
        { method: 'GET', path: '/api/projects', desc: 'List capstone projects and live GitHub demo repositories' },
        { method: 'POST', path: '/api/projects', desc: 'Submit student project showcase' },
        { method: 'DELETE', path: '/api/projects/:id', desc: 'Remove project' }
      ]
    },
    {
      title: '13. Contact Inquiries & Admin Analytics',
      routes: [
        { method: 'GET', path: '/api/contact', desc: 'List customer course inquiries' },
        { method: 'POST', path: '/api/contact', desc: 'Submit public course inquiry message' },
        { method: 'GET', path: '/api/admin/stats', desc: 'Real-time aggregated counts across all 12 MongoDB collections' },
        { method: 'POST', path: '/api/admin/firebase/sync-all', desc: 'Trigger 2-way cloud synchronization' }
      ]
    }
  ];

  modules.forEach(mod => {
    checkPageBreak(18 + mod.routes.length * 15);

    // Module Header
    doc.setFillColor(...colors.primaryLight);
    doc.roundedRect(margin, y, contentWidth, 6.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...colors.white);
    doc.text(mod.title, margin + 3, y + 4.5);
    y += 8.5;

    // Routes
    mod.routes.forEach(route => {
      const cardHeight = 15;
      checkPageBreak(cardHeight + 2);

      // Card Background
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(...colors.cardBorder);
      doc.roundedRect(margin, y, contentWidth, cardHeight, 1.5, 1.5, 'FD');

      // Method Badge
      let badgeColor = colors.badgeGet;
      if (route.method === 'POST') badgeColor = colors.badgePost;
      if (route.method === 'PATCH') badgeColor = colors.badgePatch;
      if (route.method === 'PUT') badgeColor = colors.badgePut;
      if (route.method === 'DELETE') badgeColor = colors.badgeDelete;

      doc.setFillColor(...badgeColor);
      doc.roundedRect(margin + 2.5, y + 2.5, 13, 4.5, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(...colors.white);
      doc.text(route.method, margin + 9, y + 5.7, { align: 'center' });

      // Path
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...colors.textDark);
      doc.text(route.path, margin + 18, y + 5.8);

      // Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(...colors.textMuted);
      doc.text(route.desc, margin + 18, y + 9.5);

      // Local & Live URLs
      const localFull = `Local: http://localhost:3000${route.path}`;
      const liveFull = `Live: https://ithunt.vercel.app${route.path}`;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6);
      doc.setTextColor(3, 105, 161);
      doc.text(localFull, margin + 18, y + 13.2);

      doc.setTextColor(15, 118, 110);
      doc.text(liveFull, margin + 105, y + 13.2);

      y += cardHeight + 2;
    });

    y += 2.5;
  });

  // Verification & Curl Testing Section
  checkPageBreak(38);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...colors.primary);
  doc.text('TESTING & VERIFICATION COMMANDS (CURL)', margin + 4, y + 5.5);

  const curls = [
    'curl -s http://localhost:3000/api/health                     # Check server & database status (ithunt)',
    'curl -s http://localhost:3000/api/admissions                 # Retrieve active online admissions list',
    'curl -s http://localhost:3000/api/certificates/verify/ITH-CERT-2026-001  # Public verification registry',
    'curl -s http://localhost:3000/api/admin/stats                # Real-time metrics across 12 collections',
    'npm run db:verify                                            # Node CLI verification tool'
  ];

  doc.setFont('courier', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(30, 41, 59);
  curls.forEach((c, idx) => {
    doc.text(c, margin + 4, y + 11 + idx * 4.5);
  });

  // Stamp total pages on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawFooter(i, totalPages);
  }

  // Save PDF to public/ and root
  const publicPath = path.resolve('public/IT_HUNT_API_Documentation.pdf');
  const rootPath = path.resolve('IT_HUNT_API_Documentation.pdf');

  const pdfOutput = doc.output('arraybuffer');
  fs.writeFileSync(publicPath, Buffer.from(pdfOutput));
  fs.writeFileSync(rootPath, Buffer.from(pdfOutput));

  console.log(`✓ PDF Generated successfully (${totalPages} pages)`);
  console.log(`  📁 Public: ${publicPath}`);
  console.log(`  📁 Root:   ${rootPath}`);
}

generateApiPdf();
