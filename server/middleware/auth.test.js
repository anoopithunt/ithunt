import test from 'node:test';
import assert from 'node:assert/strict';
import { generatePasswordResetToken, hashPasswordResetToken } from './auth.js';

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
