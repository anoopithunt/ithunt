import app, { ensureDbConnected } from '../server/server.js';

/**
 * Vercel Serverless Function Handler for IT HUNT Backend
 */
export default async function handler(req, res) {
  try {
    const urlObj = new URL(req.url, 'http://localhost');
    const pathParam = urlObj.searchParams.get('path');

    if (pathParam) {
      urlObj.searchParams.delete('path');
      const remainingQuery = urlObj.searchParams.toString();
      req.url = `/${pathParam}${remainingQuery ? '?' + remainingQuery : ''}`;
    } else {
      const matchedPath = req.headers['x-matched-path'] || req.headers['x-vercel-matched-path'] || req.headers['x-forwarded-uri'];
      if (matchedPath && (req.url === '/api' || req.url === '/api/')) {
        req.url = matchedPath.startsWith('/') ? matchedPath : `/${matchedPath}`;
      }
    }
  } catch (_) {}

  await ensureDbConnected();
  return app(req, res);
}
