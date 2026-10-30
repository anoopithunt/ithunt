import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import { generatePasswordResetToken, generateToken, hashPasswordResetToken, verifyToken } from './auth.js';
import authRoutes from '../routes/auth.routes.js';

function createResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    }
  };
}

test('JWT generation fails closed when the secret is missing or too short', () => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    process.env.JWT_SECRET = '';
    assert.throws(() => generateToken({ sub: 'test' }), { code: 'JWT_SECRET_CONFIGURATION' });
    process.env.JWT_SECRET = 'short';
    assert.throws(() => generateToken({ sub: 'test' }), { code: 'JWT_SECRET_CONFIGURATION' });
  } finally {
    if (originalSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = originalSecret;
  }
});

test('JWTs use HS256 and verification rejects other signing algorithms', () => {
  const originalSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'test-only-secret-with-at-least-32-cryptographic-bytes';
  try {
    const token = generateToken({ sub: 'test-user' });
    assert.equal(jwt.decode(token).sub, 'test-user');

    const rejectedResponse = createResponse();
    let continued = false;
    verifyToken(
      { headers: { authorization: `Bearer ${jwt.sign({ sub: 'test-user' }, process.env.JWT_SECRET, { algorithm: 'HS384' })}` } },
      rejectedResponse,
      () => { continued = true; }
    );
    assert.equal(continued, false);
    assert.equal(rejectedResponse.statusCode, 401);
  } finally {
    if (originalSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = originalSecret;
  }
});

test('password reset tokens are random, URL-safe, and stored as one-way hashes', () => {
  const first = generatePasswordResetToken();
  const second = generatePasswordResetToken();

  assert.match(first.token, /^[a-f0-9]{64}$/);
  assert.match(first.tokenHash, /^[a-f0-9]{64}$/);
  assert.notEqual(first.token, first.tokenHash);
  assert.equal(hashPasswordResetToken(first.token), first.tokenHash);
  assert.notEqual(first.token, second.token);
  assert.notEqual(first.tokenHash, second.tokenHash);
});

test('password recovery endpoints are public and login keeps its existing route', () => {
  for (const [path, method] of [
    ['/login', 'post'],
    ['/forgot-password', 'post'],
    ['/reset-password', 'post']
  ]) {
    const layer = authRoutes.stack.find(item =>
      item.route?.path === path && item.route.methods[method]
    );
    assert.ok(layer, `Expected ${method.toUpperCase()} ${path}`);
    const middlewareNames = layer.route.stack.map(item => item.name);
    assert.equal(middlewareNames.includes('verifyToken'), false, `${method.toUpperCase()} ${path} must remain unauthenticated`);
    if (path === '/login') assert.ok(middlewareNames.includes('loginRateLimit'));
  }
});
