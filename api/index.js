import app, { ensureDbConnected } from '../server/server.js';

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

    try {
      await ensureDbConnected();
    } catch (dbErr) {
      console.warn('Database initialization notice in serverless handler:', dbErr?.message);
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
