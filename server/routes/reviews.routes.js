import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * GET /api/reviews (Public: approved reviews only)
 */
router.get('/', async (req, res) => {
  try {
    const list = await dbAdapter.find('reviews');
    const approved = list.filter(r => r.approved !== false);
    res.json({ success: true, data: approved, reviews: approved });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/reviews/admin (Admin: all reviews)
 */
router.get('/admin', async (req, res) => {
  try {
    const list = await dbAdapter.find('reviews');
    res.json({ success: true, data: list, reviews: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/reviews
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const id = `REV-${Date.now()}`;
    const name = body.name || body.fullName || 'Verified Student';

    const record = {
      ...body,
      id,
      name,
      fullName: name,
      rating: Number(body.rating) || 5,
      reviewText: body.reviewText || body.review || body.comment || '',
      category: body.category || '💻 Labs & Workstations',
      verified: true,
      approved: true,
      date: new Date().toLocaleDateString('en-GB'),
      createdAt: new Date().toISOString()
    };

    const saved = await dbAdapter.create('reviews', record);
    res.status(201).json({
      success: true,
      message: 'Review submitted',
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PATCH /api/reviews/admin/:id/approve
 */
router.patch('/admin/:id/approve', async (req, res) => {
  try {
    const updated = await dbAdapter.update('reviews', req.params.id, { approved: true });
    res.json({ success: true, data: updated, message: 'Review approved' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/reviews/admin/:id
 */
router.delete('/admin/:id', async (req, res) => {
  try {
    await dbAdapter.delete('reviews', req.params.id);
    res.json({ success: true, message: `Review ${req.params.id} deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
