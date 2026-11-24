import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * Deduplicate reviews by normalized author and comment text
 */
const deduplicateReviews = (list) => {
  if (!Array.isArray(list)) return [];
  const map = new Map();
  list.forEach(r => {
    const normName = String(r.name || r.fullName || '').trim().toLowerCase();
    const normComment = String(r.comment || r.reviewText || r.review || '').trim().toLowerCase();
    const key = (normName && normComment) ? `${normName}::${normComment}` : (r.id || r._id?.toString());
    if (key && !map.has(key)) {
      map.set(key, r);
    }
  });
  return Array.from(map.values());
};

/**
 * GET /api/reviews (Public: approved reviews only, deduplicated)
 */
router.get('/', async (req, res) => {
  try {
    const list = await dbAdapter.find('reviews');
    const approved = list.filter(r => r.approved !== false);
    const deduped = deduplicateReviews(approved);
    res.json({ success: true, data: deduped, reviews: deduped });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/reviews/admin (Admin: all reviews, deduplicated)
 */
router.get('/admin', async (req, res) => {
  try {
    const list = await dbAdapter.find('reviews');
    const deduped = deduplicateReviews(list);
    res.json({ success: true, data: deduped, reviews: deduped });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/reviews (Idempotent: prevents duplicate reviews)
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const name = String(body.name || body.fullName || 'Verified Student').trim();
    const comment = String(body.reviewText || body.review || body.comment || '').trim();

    if (!name || !comment) {
      return res.status(400).json({ success: false, error: 'Reviewer name and comment are required.' });
    }

    // Check if an identical review already exists in the database
    const existingList = await dbAdapter.find('reviews');
    const existing = existingList.find(r => {
      const rName = String(r.name || r.fullName || '').trim().toLowerCase();
      const rText = String(r.reviewText || r.review || r.comment || '').trim().toLowerCase();
      return (rName === name.toLowerCase() && rText === comment.toLowerCase()) || (body.id && r.id === body.id);
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'Review already recorded',
        data: existing
      });
    }

    const id = body.id || `REV-${Date.now()}`;
    const record = {
      ...body,
      id,
      name,
      fullName: name,
      rating: Number(body.rating) || 5,
      reviewText: comment,
      comment: comment,
      category: body.category || '💻 Labs & Workstations',
      verified: true,
      approved: true,
      date: body.date || new Date().toLocaleDateString('en-GB'),
      createdAt: body.createdAt || new Date().toISOString()
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
 * DELETE /api/reviews/admin/:id or /api/reviews/:id
 */
router.delete('/admin/:id', async (req, res) => {
  try {
    await dbAdapter.delete('reviews', req.params.id);
    res.json({ success: true, message: `Review ${req.params.id} deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await dbAdapter.delete('reviews', req.params.id);
    res.json({ success: true, message: `Review ${req.params.id} deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
