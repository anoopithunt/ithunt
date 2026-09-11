import app, { ensureDbConnected } from '../server/server.js';

export default async function handler(req, res) {
  // If Vercel rewrote the URL to /api, restore the original incoming path
  const matchedPath = req.headers['x-matched-path'] || req.headers['x-vercel-matched-path'] || req.headers['x-forwarded-uri'];
  if (matchedPath && (req.url === '/api' || req.url === '/api/')) {
    req.url = matchedPath;
  }
  await ensureDbConnected();
  return app(req, res);
}
