import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * GET /api/contact
 */
router.get('/', async (req, res) => {
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
    const id = `INQ-${Date.now()}`;
    const name = body.name || body.fullName || 'Inquirer';

    const record = {
      ...body,
      id,
      name,
      fullName: name,
      email: body.email || '',
      phone: body.phone || body.mobile || '',
      subject: body.subject || 'Course Enquiry',
      message: body.message || '',
      status: 'New',
      createdAt: new Date().toLocaleDateString('en-GB')
    };

    const saved = await dbAdapter.create('contact', record);
    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully',
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
