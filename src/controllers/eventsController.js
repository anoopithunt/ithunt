import db from '../config/db.js';
import { successResponse, errorResponse } from '../utils/helpers.js';

export function submitEventRsvp(req, res) {
  try {
    const { eventName, eventId, candidateName, name, email, phone, college } = req.body;

    const rsvpName = candidateName || name;
    if (!rsvpName || !phone) {
      return errorResponse(res, 'Candidate name and phone number are required for RSVP', 400);
    }

    const rsvp = db.insert('events', {
      eventName: eventName || 'IT HUNT Hackathon / Workshop 2026',
      eventId: eventId || 'event-annual-2026',
      candidateName: rsvpName,
      email: email || '',
      phone,
      college: college || 'N/A',
      status: 'CONFIRMED',
      createdAt: new Date().toISOString()
    });

    return successResponse(res, 'Event RSVP confirmed successfully!', { rsvp }, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
}

export function getAllRsvps(req, res) {
  const rsvps = db.getCollection('events');
  return successResponse(res, 'Event RSVPs list retrieved', { rsvps, totalCount: rsvps.length });
}
