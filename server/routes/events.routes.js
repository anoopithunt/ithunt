import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * GET /api/events/rsvps
 */
router.get('/rsvps', async (req, res) => {
  try {
    const list = await dbAdapter.find('event_rsvps');
    res.json({ success: true, data: list, rsvps: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/events/rsvp
 */
router.post('/rsvp', async (req, res) => {
  try {
    const body = req.body || {};
    const id = `RSVP-${Date.now()}`;
    const name = body.name || body.candidateName || body.fullName || 'Attendee';

    const record = {
      ...body,
      id,
      name,
      candidateName: name,
      eventTitle: body.eventTitle || body.eventName || 'IT HUNT Tech Summit 2026',
      status: 'Confirmed',
      date: new Date().toLocaleDateString('en-GB'),
      createdAt: new Date().toISOString()
    };

    const saved = await dbAdapter.create('event_rsvps', record);
    res.status(201).json({
      success: true,
      message: 'RSVP confirmed',
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
