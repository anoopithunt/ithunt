import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * GET /api/certificates
 */
router.get('/', async (req, res) => {
  try {
    const list = await dbAdapter.find('certificates');
    res.json({ success: true, data: list, certificates: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/certificates/verify
 * Allows searching by query param e.g. /api/certificates/verify?certNo=... or loading verification portal
 */
router.get('/verify', async (req, res) => {
  const certNo = (req.query.certNo || req.query.id || req.query.code || '').trim();
  if (certNo) {
    return res.redirect(`/api/certificates/verify/${encodeURIComponent(certNo)}`);
  }
  
  // Render search portal if visited without certNo
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.send(renderVerificationSearchHtml());
});

/**
 * GET /api/certificates/verify/:certNo (Public Verification)
 * Supports both JSON API and mobile camera QR scanner browser views
 */
router.get('/verify/:certNo', async (req, res) => {
  try {
    const { certNo } = req.params;
    const cert = await dbAdapter.findById('certificates', certNo);
    const wantsJson = req.query.format === 'json' || 
      (req.headers['accept']?.includes('application/json') && !req.headers['accept']?.includes('text/html'));

    if (!cert) {
      if (wantsJson) {
        return res.status(404).json({
          success: false,
          valid: false,
          message: `Certificate number ${certNo} not found in verified registry.`
        });
      }
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(404).send(renderVerificationNotFoundHtml(certNo));
    }

    if (wantsJson) {
      return res.json({
        success: true,
        valid: true,
        data: cert,
        certificate: cert
      });
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(renderVerificationHtml(cert));
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

function renderVerificationHtml(cert) {
  const isExp = cert.type === 'experience';
  const candName = cert.studentName || cert.candidateName || 'Candidate';
  const certNo = cert.certNo || cert.certificateNumber || 'ITH-CERT';
  const courseOrRole = cert.course || cert.role || cert.designation || (isExp ? 'Software Engineer Intern' : 'Full Stack Software Engineering');
  const typeLabel = isExp ? 'Corporate Work Experience & Internship Letter' : 'Official Course Completion Certificate';
  const typeBadge = isExp ? '💼 Experience Credential' : '🎓 Graduate Certificate';
  const duration = cert.duration || '6 Months';
  const grade = cert.grade || cert.performance || 'Grade A+ (Distinction)';
  const issueDate = cert.issueDate || 'Verified';
  const signatory = cert.authorizedSignatory || 'Er. Lakshman Singh Chauhan (Director)';
  const dateVerified = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>✓ Verified Credential | ${candName} [${certNo}] - IT HUNT Academy</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #090d16;
      --card-bg: #111827;
      --card-border: #1f2937;
      --accent-green: #10b981;
      --accent-orange: #f97316;
      --accent-blue: #38bdf8;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-dark);
      background-image: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.12) 0%, transparent 60%),
                        radial-gradient(circle at 100% 100%, rgba(249, 115, 22, 0.08) 0%, transparent 50%);
      color: var(--text-main);
      font-family: var(--font-sans);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 16px 40px;
    }
    .wrapper {
      max-width: 680px;
      width: 100%;
    }
    .inst-header {
      text-align: center;
      margin-bottom: 24px;
    }
    .inst-logo-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(249, 115, 22, 0.12);
      border: 1px solid rgba(249, 115, 22, 0.35);
      border-radius: 9999px;
      padding: 6px 16px;
      font-size: 13px;
      font-weight: 700;
      color: #fb923c;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .inst-title {
      font-size: 26px;
      font-weight: 900;
      background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em;
    }
    .inst-sub {
      color: var(--text-muted);
      font-size: 13px;
      margin-top: 4px;
    }
    .cert-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
    }
    .status-banner {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.08) 100%);
      border-bottom: 1px solid rgba(16, 185, 129, 0.3);
      padding: 24px;
      text-align: center;
      position: relative;
    }
    .shield-icon {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      color: #ffffff;
      box-shadow: 0 0 25px rgba(16, 185, 129, 0.5);
      margin-bottom: 12px;
      animation: pulse 2s infinite ease-in-out;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 25px rgba(16, 185, 129, 0.5); }
      50% { transform: scale(1.04); box-shadow: 0 0 35px rgba(16, 185, 129, 0.7); }
    }
    .status-title {
      font-size: 20px;
      font-weight: 800;
      color: #34d399;
      letter-spacing: 0.02em;
    }
    .status-sub {
      color: #94a3b8;
      font-size: 13px;
      margin-top: 4px;
    }
    .card-body {
      padding: 28px 24px;
    }
    .cand-name-hero {
      text-align: center;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--card-border);
    }
    .cand-name {
      font-size: 24px;
      font-weight: 900;
      color: #ffffff;
      margin-top: 6px;
    }
    .cert-type-tag {
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 6px;
      background: ${isExp ? 'rgba(56, 189, 248, 0.15)' : 'rgba(249, 115, 22, 0.15)'};
      color: ${isExp ? '#38bdf8' : '#fb923c'};
      border: 1px solid ${isExp ? 'rgba(56, 189, 248, 0.3)' : 'rgba(249, 115, 22, 0.3)'};
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .details-table tr {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    .details-table tr:last-child {
      border-bottom: none;
    }
    .details-table td {
      padding: 12px 6px;
      font-size: 14px;
      vertical-align: top;
    }
    .details-table td.label {
      color: var(--text-muted);
      width: 38%;
      font-weight: 500;
    }
    .details-table td.val {
      color: #f3f4f6;
      font-weight: 600;
      text-align: right;
    }
    .details-table td.val.mono {
      font-family: var(--font-mono);
      color: #38bdf8;
    }
    .grade-badge {
      display: inline-block;
      background: rgba(250, 204, 21, 0.15);
      color: #facc15;
      border: 1px solid rgba(250, 204, 21, 0.3);
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 700;
    }
    .security-callout {
      background: #0d121f;
      border: 1px solid #1e293b;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .seal-mini {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 2px dashed #f59e0b;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f59e0b;
      font-size: 18px;
      flex-shrink: 0;
    }
    .sec-text {
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.5;
    }
    .sec-text strong {
      color: #e2e8f0;
    }
    .btn-group {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .btn {
      flex: 1;
      min-width: 140px;
      padding: 14px 20px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s ease;
    }
    .btn-primary {
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: #ffffff;
      border: none;
      box-shadow: 0 4px 14px rgba(249, 115, 22, 0.4);
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: #1e293b;
      color: #e2e8f0;
      border: 1px solid #334155;
    }
    .btn-secondary:hover {
      background: #334155;
    }
    .search-box {
      margin-top: 24px;
      background: rgba(17, 24, 39, 0.7);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 16px;
      text-align: center;
    }
    .search-box form {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    .search-box input {
      flex: 1;
      background: #090d16;
      border: 1px solid #374151;
      border-radius: 8px;
      padding: 10px 14px;
      color: #f3f4f6;
      font-family: var(--font-mono);
      font-size: 13px;
    }
    .search-box button {
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 0 16px;
      font-weight: 600;
      cursor: pointer;
    }
    .footer {
      text-align: center;
      margin-top: 32px;
      font-size: 12px;
      color: #64748b;
      line-height: 1.6;
    }
    @media print {
      body { background: #ffffff; color: #000000; padding: 0; }
      .cert-card { box-shadow: none; border: 1px solid #000; }
      .btn-group, .search-box { display: none; }
      .cand-name { color: #000000; }
      .details-table td.val { color: #000000; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="inst-header">
      <div class="inst-logo-badge">ISO 9001:2015 Accredited Institution</div>
      <h1 class="inst-title">IT HUNT Software Academy</h1>
      <p class="inst-sub">Central Credential Verification & Registry Directorate</p>
    </div>

    <div class="cert-card">
      <div class="status-banner">
        <div class="shield-icon">✓</div>
        <div class="status-title">OFFICIALLY VERIFIED CREDENTIAL</div>
        <div class="status-sub">This record is authentic, valid, and active in the central IT HUNT registry.</div>
      </div>

      <div class="card-body">
        <div class="cand-name-hero">
          <span class="cert-type-tag">${typeBadge}</span>
          <h2 class="cand-name">${candName}</h2>
          <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">${typeLabel}</p>
        </div>

        <table class="details-table">
          <tr>
            <td class="label">Certificate ID</td>
            <td class="val mono">${certNo}</td>
          </tr>
          <tr>
            <td class="label">Candidate Name</td>
            <td class="val">${candName}</td>
          </tr>
          <tr>
            <td class="label">${isExp ? 'Designation / Role' : 'Program / Track'}</td>
            <td class="val">${courseOrRole}</td>
          </tr>
          ${isExp && cert.department ? `<tr><td class="label">Department</td><td class="val">${cert.department}</td></tr>` : ''}
          <tr>
            <td class="label">Duration</td>
            <td class="val">${duration} ${cert.startDate ? `(${cert.startDate} – ${cert.endDate})` : ''}</td>
          </tr>
          <tr>
            <td class="label">Performance / Grade</td>
            <td class="val"><span class="grade-badge">${grade}</span></td>
          </tr>
          ${cert.technologies ? `<tr><td class="label">Core Competencies</td><td class="val" style="font-size: 13px;">${cert.technologies}</td></tr>` : ''}
          <tr>
            <td class="label">Authorized Signatory</td>
            <td class="val">${signatory}</td>
          </tr>
          <tr>
            <td class="label">Date of Issuance</td>
            <td class="val">${issueDate}</td>
          </tr>
          <tr>
            <td class="label">Verification Time</td>
            <td class="val" style="font-size: 12px; color: #34d399;">${dateVerified}</td>
          </tr>
        </table>

        <div class="security-callout">
          <div class="seal-mini">★</div>
          <div class="sec-text">
            <strong>Direct Cloud Verified Record</strong><br>
            Validated in real-time from the official IT HUNT MongoDB Atlas cloud database. This transcript serves as formal digital proof of graduation and professional merit.
          </div>
        </div>

        <div class="btn-group">
          <button class="btn btn-primary" onclick="window.print()">🖨️ Print Verification Transcript</button>
          <a class="btn btn-secondary" href="https://ithunt.vercel.app">🌐 Visit IT HUNT Portal</a>
        </div>
      </div>
    </div>

    <div class="search-box">
      <div style="font-size: 13px; font-weight: 600; color: #cbd5e1;">Verify Another Certificate or Experience Letter</div>
      <form action="/api/certificates/verify" method="GET">
        <input type="text" name="certNo" placeholder="Enter Serial No (e.g. ITH-CERT-2026-001)" required autocomplete="off" />
        <button type="submit">Verify</button>
      </form>
    </div>

    <div class="footer">
      <strong>IT HUNT Software Solutions & Tech Academy</strong><br>
      📍 Dahiyawa Holagarh(Near Mela Ground), Prayagraj, UP, India<br>
      Academic Registrar Helpline: +91 9795771806 | softtechithunt@gmail.com
    </div>
  </div>
</body>
</html>`;
}

function renderVerificationNotFoundHtml(certNo) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>⚠ Credential Not Found - IT HUNT Academy</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono&display=swap" rel="stylesheet">
  <style>
    body {
      background: #090d16;
      color: #f3f4f6;
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .box {
      max-width: 520px;
      width: 100%;
      background: #111827;
      border: 1px solid #374151;
      border-radius: 20px;
      padding: 36px 28px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #ef4444;
      font-size: 30px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
    h1 { font-size: 22px; font-weight: 800; color: #f87171; }
    p { color: #9ca3af; font-size: 14px; line-height: 1.6; margin: 12px 0 24px; }
    .code { font-family: 'JetBrains Mono', monospace; color: #fbbf24; background: #1f2937; padding: 2px 8px; border-radius: 4px; }
    form { display: flex; gap: 8px; margin-bottom: 20px; }
    input { flex: 1; background: #090d16; border: 1px solid #4b5563; border-radius: 8px; padding: 10px 14px; color: #fff; }
    button { background: #ea580c; color: #fff; border: none; border-radius: 8px; padding: 0 16px; font-weight: 600; cursor: pointer; }
    a { color: #38bdf8; text-decoration: none; font-size: 13px; }
  </style>
</head>
<body>
  <div class="box">
    <div class="icon">✕</div>
    <h1>Credential Not Found in Registry</h1>
    <p>The serial number <span class="code">${certNo || 'Unknown'}</span> was not found in the official IT HUNT database. It may have been typed incorrectly or has not yet been registered.</p>
    
    <form action="/api/certificates/verify" method="GET">
      <input type="text" name="certNo" placeholder="Try another serial number..." required />
      <button type="submit">Search</button>
    </form>
    
    <p style="font-size: 12px; margin-bottom: 8px;">For verification inquiries, contact: +91 9795771806 | softtechithunt@gmail.com</p>
    <a href="https://ithunt.vercel.app">← Return to IT HUNT Academy Portal</a>
  </div>
</body>
</html>`;
}

function renderVerificationSearchHtml() {
  return renderVerificationNotFoundHtml('');
}

/**
 * POST /api/certificates (Issue New Certificate / Experience Certificate - Admin Only)
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const type = body.type === 'experience' ? 'experience' : 'course';
    const year = new Date().getFullYear();
    const prefix = type === 'experience' ? 'ITH-EXP' : 'ITH-CERT';
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const certNo = body.certNo || body.certificateNumber || `${prefix}-${year}-${randNum}`;

    const studentName = (body.studentName || body.candidateName || 'Engineer').trim();
    const course = (body.course || body.courseName || (type === 'experience' ? (body.role || 'Software Engineering Internship') : 'Full Stack Software Engineering')).trim();
    const issueDate = body.issueDate || new Date().toLocaleDateString('en-GB');

    const record = {
      ...body,
      id: certNo,
      certNo,
      certificateNumber: certNo,
      type,
      studentName,
      candidateName: studentName,
      course,
      courseName: course,
      role: body.role || body.designation || (type === 'experience' ? 'Full Stack Developer Intern' : ''),
      designation: body.designation || body.role || '',
      department: body.department || 'Software Solutions & Cloud Services',
      duration: body.duration || '6 Months',
      startDate: body.startDate || '',
      endDate: body.endDate || '',
      technologies: body.technologies || 'React.js, Node.js, Express, MongoDB, Git, Cloud Solutions',
      performance: body.performance || 'Outstanding',
      grade: body.grade || (type === 'experience' ? 'Grade A (Outstanding)' : 'A+'),
      authorizedSignatory: body.authorizedSignatory || 'Er. Lakshman Singh Chauhan',
      issueDate,
      status: 'Verified & Active',
      verificationUrl: `https://ithunt.vercel.app/api/certificates/verify/${certNo}`,
      createdAt: new Date().toISOString()
    };

    const saved = await dbAdapter.create('certificates', record);
    res.status(201).json({
      success: true,
      message: type === 'experience' ? 'Experience certificate generated successfully' : 'Course certificate issued successfully',
      data: saved,
      certificate: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/certificates/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    await dbAdapter.delete('certificates', req.params.id);
    res.json({ success: true, message: `Certificate ${req.params.id} removed.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
