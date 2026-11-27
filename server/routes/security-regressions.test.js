import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPendingAdmissionRecord } from '../services/admissionSubmission.js';
import { dbAdapter } from '../services/dbAdapter.js';

process.env.JWT_SECRET ||= 'test-only-jwt-secret-with-at-least-32-bytes';

const [admissionsModule, festivalModule, contactModule, studentsModule] = await Promise.all([
  import('./admissions.routes.js'),
  import('./festival.routes.js'),
  import('./contact.routes.js'),
  import('./students.routes.js')
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

test('contact inquiry reads, updates, and deletes require an administrator', () => {
  for (const [path, method] of [
    ['/', 'get'],
    ['/:id/status', 'patch'],
    ['/:id', 'delete']
  ]) {
    const middleware = findRoute(contactModule.default, path, method);
    assert.ok(middleware.includes('verifyToken'), `${method.toUpperCase()} ${path} must verify authentication`);
    assert.ok(middleware.includes('requireAdmin'), `${method.toUpperCase()} ${path} must require admin`);
  }
  assert.equal(findRoute(contactModule.default, '/', 'post').includes('requireAdmin'), false);
});

test('contact lead stage only accepts known pipeline values', async () => {
  const layer = contactModule.default.stack.find(item =>
    item.route?.path === '/:id/status' && item.route.methods.patch
  );
  const handler = layer.route.stack.at(-1).handle;
  const originalUpdate = dbAdapter.update;
  const updates = [];
  dbAdapter.update = async (...args) => {
    updates.push(args);
    return { id: args[1], ...args[2] };
  };
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
  try {
    await handler({ params: { id: 'INQ-1' }, body: { status: 'Qualified' } }, response);
    assert.equal(response.statusCode, 200);
    assert.equal(updates[0][2].status, 'Qualified');

    await handler({ params: { id: 'INQ-1' }, body: { status: 'admin' } }, response);
    assert.equal(response.statusCode, 400);
    assert.equal(updates.length, 1);
  } finally {
    dbAdapter.update = originalUpdate;
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

test('student password reset route enforces admin authorization', () => {
  const middleware = findRoute(studentsModule.default, '/:id/reset-password', 'post');
  assert.ok(middleware.includes('verifyToken'), 'POST /:id/reset-password must verify authentication');
  assert.ok(middleware.includes('requireAdmin'), 'POST /:id/reset-password must require admin');
});

test('student password reset by SuperAdmin auto-provisions user account when target matches admission userId', async () => {
  const layer = studentsModule.default.stack.find(item =>
    item.route?.path === '/:id/reset-password' && item.route.methods.post
  );
  const handler = layer.route.stack.at(-1).handle;
  const original = {
    find: dbAdapter.find,
    findOne: dbAdapter.findOne,
    create: dbAdapter.create,
    update: dbAdapter.update
  };
  const creates = [];
  const updates = [];

  const admission = {
    id: 'adm-001',
    userId: 'USR-1789980325848',
    registrationNo: 'ITH-2026-513',
    candidateName: 'Anoop Mishra',
    email: 'anoopmishrapitz@gmail.com',
    course: 'NIELIT O/A Level Diploma',
    phone: '9795771806'
  };

  dbAdapter.find = async (collection) => {
    if (collection === 'admissions') return [admission];
    if (collection === 'students') return [];
    if (collection === 'users') return []; // User record missing initially
    return [];
  };
  dbAdapter.findOne = async () => null;
  dbAdapter.create = async (collection, fields) => {
    creates.push({ collection, fields });
    return { ...fields, id: fields.id || 'new-user-id' };
  };
  dbAdapter.update = async (collection, id, fields) => {
    updates.push({ collection, id, fields });
    return { ...fields, id };
  };

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

  try {
    await handler({
      params: { id: 'USR-1789980325848' },
      body: {
        newPassword: 'SecurePassword2026!',
        email: 'anoopmishrapitz@gmail.com',
        registrationNo: 'ITH-2026-513',
        candidateName: 'Anoop Mishra'
      },
      user: { name: 'Director', role: 'superadmin' }
    }, response);

    assert.equal(response.statusCode, 200);
    assert.equal(response.body.success, true);

    // Verify user account was auto-provisioned
    const userCreate = creates.find(c => c.collection === 'users');
    assert.ok(userCreate, 'User account should be auto-created in users collection');
    assert.equal(userCreate.fields.email, 'anoopmishrapitz@gmail.com');
    assert.equal(userCreate.fields.role, 'student');
    assert.equal(userCreate.fields.status, 'ACTIVE');
    assert.equal(userCreate.fields.verified, true);
    assert.equal(userCreate.fields.password, 'SecurePassword2026!');

    // Verify admission was updated
    const admissionUpdate = updates.find(u => u.collection === 'admissions');
    assert.ok(admissionUpdate, 'Admission record should be confirmed');
    assert.equal(admissionUpdate.fields.admissionConfirmed, true);
    assert.equal(admissionUpdate.fields.plainPassword, 'SecurePassword2026!');
  } finally {
    Object.assign(dbAdapter, original);
  }
});

test('student password reset by SuperAdmin rejects attempting to reset administrator account', async () => {
  const layer = studentsModule.default.stack.find(item =>
    item.route?.path === '/:id/reset-password' && item.route.methods.post
  );
  const handler = layer.route.stack.at(-1).handle;
  const original = { find: dbAdapter.find, findOne: dbAdapter.findOne };

  dbAdapter.find = async (collection) => {
    if (collection === 'users') {
      return [{ id: 'admin-1', email: 'admin@ithunt.com', role: 'superadmin' }];
    }
    return [];
  };
  dbAdapter.findOne = async () => null;

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

  try {
    await handler({
      params: { id: 'admin-1' },
      body: { newPassword: 'NewPassword123!' },
      user: { name: 'SuperAdmin', role: 'superadmin' }
    }, response);

    assert.equal(response.statusCode, 403);
    assert.equal(response.body.success, false);
  } finally {
    Object.assign(dbAdapter, original);
  }
});
