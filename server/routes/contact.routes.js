import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';
import { sendContactNotificationEmail } from '../services/systemMailer.js';
import { requireAdmin, verifyToken } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/contact
 */
router.get('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const list = await dbAdapter.find('contact');
    res.json({ success: true, data: list, inquiries: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/contact
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const name = String(body.name || body.fullName || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const phone = String(body.phone || body.mobile || '').trim();
    const subject = String(body.subject || 'Website Enquiry').trim();
    const message = String(body.message || '').trim();
    if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !message || message.length > 5000) {
      return res.status(400).json({ success: false, message: 'Please provide a valid name, email address, and enquiry.' });
    }

    const id = `INQ-${Date.now()}`;
    const record = {
      id,
      name,
      fullName: name,
      email,
      phone,
      subject: subject.slice(0, 180),
      message,
      source: String(body.source || 'website').slice(0, 100),
      status: 'New',
      createdAt: new Date().toISOString()
    };

    const saved = await dbAdapter.create('contact', record);

    // Send email notification to inquirer & admin
    try {
      await sendContactNotificationEmail(record);
    } catch (mailErr) {
      console.warn('[Contact] Email dispatch error:', mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully',
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/contact/:id
 */
router.patch('/:id/status', verifyToken, requireAdmin, async (req, res) => {
  try {
    const allowedStatuses = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];
    const status = String(req.body?.status || '');
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid enquiry status.' });
    }
    const updated = await dbAdapter.update('contact', req.params.id, { status });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Contact enquiry not found.' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await dbAdapter.delete('contact', id);
    res.json({ success: true, message: 'Contact inquiry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
