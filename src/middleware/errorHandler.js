import { errorResponse } from '../utils/helpers.js';

export function notFoundHandler(req, res, next) {
  return errorResponse(res, `Route not found: ${req.originalUrl}`, 404);
}

export function globalErrorHandler(err, req, res, next) {
  console.error('Unhandled Application Error:', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return errorResponse(res, message, statusCode, process.env.NODE_ENV === 'development' ? err.stack : null);
}
