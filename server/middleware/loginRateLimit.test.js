import test from 'node:test';
import assert from 'node:assert/strict';
import { createLoginRateLimitMiddleware } from './loginRateLimit.js';

function createResponse() {
  return {
    headers: {},
    statusCode: 200,
    body: null,
    set(name, value) {
      this.headers[name] = value;
      return this;
    },
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

test('allows login attempts below both per-IP and per-identifier limits', async () => {
  const counts = new Map();
  const limiter = createLoginRateLimitMiddleware(async (scope, value) => {
    const key = `${scope}:${value}`;
    counts.set(key, (counts.get(key) || 0) + 1);
    return counts.get(key);
  });
  let continued = false;

  await limiter(
    { ip: '192.0.2.1', body: { email: 'person@example.com' } },
    createResponse(),
    () => { continued = true; }
  );

  assert.equal(continued, true);
});

test('blocks attempts after the per-identifier limit and sets Retry-After', async () => {
  const counts = new Map();
  const limiter = createLoginRateLimitMiddleware(async (scope, value) => {
    const key = `${scope}:${value}`;
    counts.set(key, (counts.get(key) || 0) + 1);
    return counts.get(key);
  });
  const req = { ip: '192.0.2.2', body: { email: 'PERSON@example.com' } };
  let response;

  for (let attempt = 0; attempt < 9; attempt += 1) {
    response = createResponse();
    await limiter(req, response, () => {});
  }

  assert.equal(response.statusCode, 429);
  assert.equal(response.body.success, false);
  assert.ok(Number(response.headers['Retry-After']) > 0);
});

test('blocks attempts after the per-IP limit across multiple identifiers', async () => {
  const counts = new Map();
  const limiter = createLoginRateLimitMiddleware(async (scope, value) => {
    const key = `${scope}:${value}`;
    counts.set(key, (counts.get(key) || 0) + 1);
    return counts.get(key);
  });
  let response;
  let continued = false;

  for (let attempt = 0; attempt < 41; attempt += 1) {
    response = createResponse();
    continued = false;
    await limiter(
      { ip: '192.0.2.4', body: { email: `person-${attempt}@example.com` } },
      response,
      () => { continued = true; }
    );
  }

  assert.equal(continued, false);
  assert.equal(response.statusCode, 429);
  assert.ok(Number(response.headers['Retry-After']) > 0);
});

test('fails closed when the shared limiter store is unavailable', async () => {
  const limiter = createLoginRateLimitMiddleware(async () => {
    throw new Error('database unavailable');
  });
  const response = createResponse();
  let continued = false;

  await limiter(
    { ip: '192.0.2.3', body: { email: 'person@example.com' } },
    response,
    () => { continued = true; }
  );

  assert.equal(continued, false);
  assert.equal(response.statusCode, 503);
});
