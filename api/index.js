import app, { ensureDbConnected } from '../server/server.js';
import mongoose from 'mongoose';

/**
 * Wait for a given number of milliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Attempt DB connection with retries — essential for Vercel cold starts
 * where the first attempt may time out before the route handler fires.
 */
async function ensureDbConnectedWithRetry(maxAttempts = 3, delayMs = 500) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await ensureDbConnected();
      if (mongoose.connection?.readyState === 1) return true;
    } catch (err) {
      console.warn(`[DB] Connection attempt ${attempt}/${maxAttempts} failed: ${err?.message}`);
    }
    if (attempt < maxAttempts) await sleep(delayMs);
  }
  return mongoose.connection?.readyState === 1;
}

/**
 * Vercel Serverless Function Handler for IT HUNT Backend
 */
export default async function handler(req, res) {
  try {
    // If Vercel has pre-parsed the body as JSON object, flag for body-parser
    if (req.body && typeof req.body === 'object') {
      req._body = true;
    }

    const urlObj = new URL(req.url, 'http://localhost');
    const pathParam = urlObj.searchParams.get('path');

    if (pathParam) {
      urlObj.searchParams.delete('path');
      const remainingQuery = urlObj.searchParams.toString();
      const cleanPath = pathParam.replace(/^\/+/, '');
      req.url = `/${cleanPath}${remainingQuery ? '?' + remainingQuery : ''}`;
    } else {
      const matchedPath = req.headers['x-matched-path'] || req.headers['x-vercel-matched-path'] || req.headers['x-forwarded-uri'];
      if (matchedPath && (req.url === '/api' || req.url === '/api/')) {
        req.url = matchedPath.startsWith('/') ? matchedPath : `/${matchedPath}`;
      }
    }

    // Ensure DB is connected before handing off to Express routes.
    // bufferCommands=false means Mongoose will throw immediately if not connected.
    const isHealthPath = req.url.includes('/health') || req.url === '/' || req.url === '/api';
    const dbReady = await ensureDbConnectedWithRetry(3, 500);

    if (!dbReady && !isHealthPath) {
      console.error('[DB] MongoDB not connected after retries — returning 503');
      return res.status(503).json({
        success: false,
        message: 'Database is initializing. Please retry in a moment.',
        retryAfter: 3
      });
    }

    return app(req, res);
  } catch (err) {
    console.error('! Vercel Serverless Function Handler Error:', err);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error in API handler',
        error: err.message
      });
    }
  }
}
