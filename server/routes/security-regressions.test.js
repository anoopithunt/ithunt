import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPendingAdmissionRecord } from '../services/admissionSubmission.js';
import { dbAdapter } from '../services/dbAdapter.js';

process.env.JWT_SECRET ||= 'test-only-jwt-secret-with-at-least-32-bytes';

const [admissionsModule, festivalModule] = await Promise.all([
  import('./admissions.routes.js'),
  import('./festival.routes.js')
]);

function findRoute(router, path, method) {
  const layer = router.stack.find(item =>
    item.route?.path === path && item.route.methods[method]
  );
  assert.ok(layer, `Expected ${method.toUpperCase()} ${path} route`);
  return layer.route.stack.map(item => item.name);
}

test('public admission data ignores caller-supplied activation and privileged fields', () => {
  const admission = buildPendingAdmissionRecord({
    candidateName: 'Ignored override',
    status: 'Confirmed',
    feeStatus: 'Paid',
    admissionConfirmed: true,
    confirmedBy: 'attacker',
    verified: true,
    role: 'admin',
    userId: 'privileged-id',
    password: 'must-not-be-persisted',
    address: 'Allowed application field',
    course: 'MERN'
  }, {
    registrationNo: 'ITH-TEST-1',
    candidateName: 'Applicant',
    email: 'applicant@example.com',
    phone: '123',
    mobile: '123',
    date: '01/01/2026',
    time: '10:00 AM',
    createdAt: '2026-01-01T10:00:00.000Z'
  });

  assert.equal(admission.status, 'Pending Verification');
  assert.equal(admission.feeStatus, 'Pending Verification');
  assert.equal(admission.admissionConfirmed, false);
  assert.equal(admission.candidateName, 'Applicant');
  assert.equal(admission.course, 'MERN');
  assert.equal(admission.address, 'Allowed application field');
  assert.equal('verified' in admission, false);
  assert.equal('role' in admission, false);
  assert.equal('userId' in admission, false);
  assert.equal('password' in admission, false);
  assert.equal('confirmedBy' in admission, false);
});

test('festival write routes require a verified administrator', () => {
  for (const [path, method] of [
    ['/', 'put'],
    ['/', 'post'],
    ['/presets', 'put'],
    ['/presets', 'post']
  ]) {
    const middleware = findRoute(festivalModule.default, path, method);
    assert.ok(middleware.includes('verifyToken'), `${method.toUpperCase()} ${path} must verify authentication`);
    assert.ok(middleware.includes('requireAdmin'), `${method.toUpperCase()} ${path} must require admin`);
  }
});

test('festival read routes remain public', () => {
  for (const path of ['/', '/presets']) {
    const middleware = findRoute(festivalModule.default, path, 'get');
    assert.equal(middleware.includes('verifyToken'), false);
    assert.equal(middleware.includes('requireAdmin'), false);
  }
});

test('admission activation and modification routes require a verified administrator', () => {
  for (const [path, method] of [
    ['/:id/confirm', 'post'],
    ['/:id/status', 'patch'],
    ['/:id', 'put']
  ]) {
    const middleware = findRoute(admissionsModule.default, path, method);
    assert.ok(middleware.includes('verifyToken'), `${method.toUpperCase()} ${path} must verify authentication`);
    assert.ok(middleware.includes('requireAdmin'), `${method.toUpperCase()} ${path} must require admin`);
  }
});

test('admission confirmation activates the existing pending student profile', async () => {
  const layer = admissionsModule.default.stack.find(item =>
    item.route?.path === '/:id/confirm' && item.route.methods.post
  );
  const handler = layer.route.stack.at(-1).handle;
  const original = {
    findById: dbAdapter.findById,
    find: dbAdapter.find,
    findOne: dbAdapter.findOne,
    update: dbAdapter.update,
    create: dbAdapter.create
  };
  const updates = [];
  const creates = [];
  const admission = {
    id: 'admission-id',
    registrationNo: 'ITH-TEST-1',
    candidateName: 'Applicant',
    email: 'applicant@example.com',
    course: 'MERN'
  };
  const pendingStudent = { id: 'ITH-TEST-1', registrationNo: 'ITH-TEST-1', email: 'applicant@example.com' };
  const user = { id: 'user-id', email: admission.email };
  const response = {
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

  dbAdapter.findById = async () => admission;
  dbAdapter.find = async () => [];
  dbAdapter.findOne = async (collection, query) => {
    if (collection === 'users') return user;
    if (collection === 'students') return query.registrationNo ? pendingStudent : null;
    return null;
  };
  dbAdapter.update = async (collection, id, fields) => {
    updates.push({ collection, id, fields });
    return { ...fields, id };
  };
  dbAdapter.create = async (collection, fields) => {
    creates.push({ collection, fields });
    return fields;
  };

  try {
    await handler({
      params: { id: admission.registrationNo },
      body: { userId: 'USR-TEST-1', feeStatus: 'Pending Verification', confirmedBy: 'untrusted caller' },
      user: { name: 'Verified Admin', role: 'superadmin' }
    }, response);

    assert.equal(response.statusCode, 200);
    assert.equal(response.body.success, true);
    assert.equal(creates.some(entry => entry.collection === 'students'), false);
    const studentUpdate = updates.find(entry => entry.collection === 'students');
    assert.equal(studentUpdate.id, pendingStudent.id);
    assert.equal(studentUpdate.fields.status, 'ACTIVE');
    assert.equal(studentUpdate.fields.enrollmentNumber, 'USR-TEST-1');
    assert.equal(updates.find(entry => entry.collection === 'admissions').fields.confirmedBy, 'Verified Admin');
  } finally {
    Object.assign(dbAdapter, original);
  }
});
