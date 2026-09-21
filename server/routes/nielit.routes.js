import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';
import { sendNielitProjectEmail } from '../services/nielitMailer.js';

const router = Router();

/**
 * GET /api/nielit-projects
 */
router.get('/', async (req, res) => {
  try {
    const list = await dbAdapter.find('nielit_projects');
    res.json({ success: true, data: list, projects: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/nielit-projects/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const item = await dbAdapter.findById('nielit_projects', req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'NIELIT project not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/nielit-projects
 * Saves record to DB, generates 4-page PDF and emails it with attachment.
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const regNo = String(body.nielitRegNo || body.registrationNo || body.regNo || `NIELIT-${Date.now()}`).trim();
    const studentName = (body.studentName || body.candidateName || body.fullName || 'Candidate').trim();
    const rawLevel = String(body.nielitLevel || body.level || 'O').trim();
    const cleanLevelCode = rawLevel.replace(/\s*Level/i, '').trim() || 'O';
    const cleanLevel = `${cleanLevelCode} Level`;

    const record = {
      ...body,
      id: regNo,
      registrationNo: regNo,
      nielitRegNo: regNo,
      studentName,
      candidateName: studentName,
      fatherName: body.fatherName || '—',
      email: (body.email || '').trim(),
      mobile: body.mobile || body.phone || '+91 9795771806',
      level: cleanLevel,
      nielitLevel: cleanLevelCode,
      projectTitle: body.projectTitle || body.title || 'MERN Stack Web Development',
      guideName: body.guideName || 'Mr. Sushil Kumar',
      guideQualification: body.guideQualification || 'MCA (Computer Science)',
      guideDesignation: body.guideDesignation || 'Laravel/NodeJS Developer',
      guidePlace: body.guidePlace || 'Prayagraj',
      guideAddress: body.guideAddress || 'Holagarh, Prayagraj, UP',
      status: body.status || 'Submitted',
      feePaid: body.feePaid || (body.amount ? `₹${body.amount}` : '₹1,000'),
      amount: String(body.amount || body.feePaid || '1000').replace(/[^0-9]/g, '') || '1000',
      utrNo: String(body.utrNo || body.utrNumber || 'UPI/Verified').trim().toUpperCase(),
      utrNumber: String(body.utrNumber || body.utrNo || 'UPI/Verified').trim().toUpperCase(),
      accountHolderName: body.accountHolderName || studentName,
      paymentRemark: 'Paid',
      projectDate: body.projectDate || body.date || new Date().toISOString(),
      paymentDate: body.paymentDate || body.date || new Date().toISOString(),
      address: body.address || 'Holagarh',
      district: body.district || 'Prayagraj',
      state: body.state || 'Uttar Pradesh',
      pin: body.pin || '212503',
      date: body.date || new Date().toLocaleDateString('en-GB'),
      createdAt: new Date().toISOString()
    };

    let saved = null;
    try {
      saved = await dbAdapter.create('nielit_projects', record);
    } catch (dbErr) {
      console.warn('[NIELIT] DB persistence error, attempting upsert:', dbErr.message);
      saved = await dbAdapter.update('nielit_projects', regNo, record).catch(() => record);
    }

    // Await email dispatch with 4-page PDF attachment BEFORE closing HTTP response!
    // This is required so Vercel Serverless and Node processes don't freeze/halt the SMTP connection.
    let emailResult = null;
    try {
      emailResult = await sendNielitProjectEmail(record);
      console.log(`[NIELIT Email] Sent result: method=${emailResult?.method} | PDF attached=${emailResult?.pdfAttached}`);
    } catch (mailErr) {
      console.warn('[NIELIT Email] Mail dispatch failed:', mailErr.message);
      emailResult = { success: false, error: mailErr.message };
    }

    res.status(201).json({
      success: true,
      message: 'NIELIT project submitted successfully',
      data: saved || record,
      project: saved || record,
      email: emailResult
    });

  } catch (error) {
    console.error('[NIELIT] Submission failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/nielit-projects/:id
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await dbAdapter.update('nielit_projects', req.params.id, req.body);
    res.json({ success: true, data: updated, message: 'NIELIT project updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/nielit-projects/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    await dbAdapter.delete('nielit_projects', req.params.id);
    res.json({ success: true, message: `NIELIT project ${req.params.id} deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
