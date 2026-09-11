import app, { ensureDbConnected } from '../server/server.js';

/**
 * Vercel Serverless Function Handler
 * Automatically handles all /api/* and root dual-mount routes on Vercel
 */
export default async function handler(req, res) {
  await ensureDbConnected();
  return app(req, res);
}
