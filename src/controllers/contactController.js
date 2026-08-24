import db from '../config/db.js';
import { successResponse, errorResponse } from '../utils/helpers.js';

export function submitContactInquiry(req, res) {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !phone || !message) {
      return errorResponse(res, 'Name, phone number, and message are required', 400);
    }

    const contact = db.insert('contacts', {
      name,
      email: email || '',
      phone,
      subject: subject || 'General Inquiry',
      message,
      status: 'UNREAD',
      createdAt: new Date().toISOString()
    });

    return successResponse(res, 'Inquiry received successfully. IT HUNT team will get back to you shortly.', { contact }, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
}

export function getAllContactInquiries(req, res) {
  const contacts = db.getCollection('contacts');
  return successResponse(res, 'Contact inquiries list retrieved', { contacts, totalCount: contacts.length });
}
