import { createHash } from 'node:crypto';
import mongoose from 'mongoose';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_IP_ATTEMPTS = 40;
const MAX_IDENTIFIER_ATTEMPTS = 8;
const COLLECTION_NAME = 'login_rate_limits';

let indexPromise;

async function getRateLimitCollection() {
  const database = mongoose.connection.db;
  if (!database) {
    throw new Error('Login rate-limit storage is unavailable.');
  }

  if (!indexPromise) {
    indexPromise = database.collection(COLLECTION_NAME).createIndex(
      { expiresAt: 1 },
      { expireAfterSeconds: 0, name: 'expire_login_rate_limits' }
    );
  }

  try {
    await indexPromise;
  } catch (error) {
    indexPromise = null;
    throw error;
  }

  return database.collection(COLLECTION_NAME);
}

async function consumePersistentAttempt(scope, value, windowStart, expiresAt) {
  const collection = await getRateLimitCollection();
  const id = createHash('sha256')
    .update(`${scope}\0${windowStart}\0${value}`)
    .digest('hex');

  let result;
  try {
    result = await collection.findOneAndUpdate(
      { _id: id },
      { $inc: { attempts: 1 }, $setOnInsert: { expiresAt: new Date(expiresAt) } },
      { upsert: true, returnDocument: 'after' }
    );
  } catch (error) {
    if (error.code !== 11000) throw error;
    result = await collection.findOneAndUpdate(
      { _id: id },
      { $inc: { attempts: 1 } },
      { returnDocument: 'after' }
    );
  }

  const record = result?.value ?? result;
  if (!Number.isSafeInteger(record?.attempts)) {
    throw new Error('Login rate-limit storage returned an invalid counter.');
  }
  return record.attempts;
}

export function createLoginRateLimitMiddleware(consumeAttempt = consumePersistentAttempt) {
  return async function loginRateLimit(req, res, next) {
    const now = Date.now();
    const windowStart = Math.floor(now / WINDOW_MS) * WINDOW_MS;
    const expiresAt = windowStart + WINDOW_MS;
    const body = req.body || {};
    const identifierValue = body.email || body.username || body.userId || body.identifier || body.loginId || body.token;
    const identifier = typeof identifierValue === 'string'
      ? identifierValue.trim().toLowerCase().slice(0, 320)
      : '';
    const ipAddress = String(req.ip || req.socket?.remoteAddress || 'unknown').slice(0, 256);

    try {
      const [ipAttempts, identifierAttempts] = await Promise.all([
        consumeAttempt('ip', ipAddress, windowStart, expiresAt),
        consumeAttempt('identifier', identifier || 'missing', windowStart, expiresAt)
      ]);
      const retryAfter = Math.max(1, Math.ceil((expiresAt - now) / 1000));

      if (ipAttempts > MAX_IP_ATTEMPTS || identifierAttempts > MAX_IDENTIFIER_ATTEMPTS) {
        res.set('Retry-After', String(retryAfter));
        return res.status(429).json({
          success: false,
          message: 'Too many authentication attempts. Please try again later.',
          retryAfter
        });
      }

      return next();
    } catch (error) {
      console.error('[Security] Login rate-limit storage failure:', error.message);
      return res.status(503).json({
        success: false,
        message: 'Authentication is temporarily unavailable. Please try again shortly.'
      });
    }
  };
}

export const loginRateLimit = createLoginRateLimitMiddleware();
