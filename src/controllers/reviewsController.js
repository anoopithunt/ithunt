import db from '../config/db.js';
import { successResponse, errorResponse } from '../utils/helpers.js';

export function submitReview(req, res) {
  try {
    const { name, role, rating, reviewText, avatar } = req.body;

    if (!name || !rating || !reviewText) {
      return errorResponse(res, 'Name, rating (1-5), and reviewText are required', 400);
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return errorResponse(res, 'Rating must be a number between 1 and 5', 400);
    }

    const review = db.insert('reviews', {
      name,
      role: role || 'Student / Alum',
      rating: numericRating,
      reviewText,
      avatar: avatar || '',
      verified: true,
      featured: false,
      createdAt: new Date().toISOString()
    });

    return successResponse(res, 'Thank you for your feedback! Review submitted successfully.', {
      review
    }, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
}

export function getPublicReviews(req, res) {
  const reviews = db.find('reviews', r => r.verified === true);
  return successResponse(res, 'Public student & client reviews retrieved', {
    reviews,
    averageRating: reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "5.0",
    totalCount: reviews.length
  });
}

export function getAdminReviews(req, res) {
  const reviews = db.getCollection('reviews');
  return successResponse(res, 'All reviews list for moderation', { reviews, totalCount: reviews.length });
}

export function toggleApproveReview(req, res) {
  const { id } = req.params;
  const { verified, featured } = req.body;

  const review = db.findById('reviews', id);
  if (!review) {
    return errorResponse(res, 'Review not found', 404);
  }

  const updates = {};
  if (typeof verified === 'boolean') updates.verified = verified;
  if (typeof featured === 'boolean') updates.featured = featured;

  const updated = db.updateById('reviews', id, updates);
  return successResponse(res, 'Review status updated successfully', { review: updated });
}

export function deleteReview(req, res) {
  const { id } = req.params;
  const deleted = db.deleteById('reviews', id);
  if (!deleted) {
    return errorResponse(res, 'Review not found', 404);
  }
  return successResponse(res, 'Review deleted successfully');
}
