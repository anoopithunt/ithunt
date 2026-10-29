import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import { createInterface } from 'node:readline';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MIN_PASSWORD_LENGTH = 16;

function ask(question) {
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => prompt.question(question, answer => {
    prompt.close();
    resolve(answer.trim());
  }));
}

function askHidden(question) {
  if (!process.stdin.isTTY || typeof process.stdin.setRawMode !== 'function') {
    throw new Error('Run this command in an interactive terminal so the password can be entered without echo.');
  }

  return new Promise((resolve, reject) => {
    let value = '';
    const stdin = process.stdin;
    const onData = (chunk) => {
      for (const byte of chunk) {
        if (byte === 3) {
          cleanup();
          reject(new Error('Password entry cancelled.'));
          return;
        }
        if (byte === 13 || byte === 10) {
          process.stdout.write('\n');
          cleanup();
          resolve(value);
          return;
        }
        if (byte === 8 || byte === 127) {
          value = value.slice(0, -1);
          continue;
        }
        if (byte >= 32 && byte <= 126) value += String.fromCharCode(byte);
      }
    };
    const cleanup = () => {
      stdin.off('data', onData);
      stdin.setRawMode(false);
      stdin.pause();
    };

    process.stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on('data', onData);
  });
}

async function main() {
  const email = (process.env.SUPERADMIN_EMAIL || await ask('SuperAdmin email [admin@ithunt.com]: ') || 'admin@ithunt.com')
    .trim()
    .toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new Error('Enter a valid SuperAdmin email address.');
  }

  const password = await askHidden('New SuperAdmin password (hidden): ');
  const confirmation = await askHidden('Confirm new password (hidden): ');
  if (password.length < MIN_PASSWORD_LENGTH || password.length > 1024) {
    throw new Error(`Password must be between ${MIN_PASSWORD_LENGTH} and 1024 characters.`);
  }
  if (password !== confirmation) {
    throw new Error('Passwords do not match.');
  }

  const mongoUri = (process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI || '').trim();
  if (!mongoUri) {
    throw new Error('Set MONGODB_ATLAS_URI or MONGODB_URI in your local environment.');
  }

  await mongoose.connect(mongoUri, { dbName: 'ithunt', serverSelectionTimeoutMS: 10000 });

  const passwordHash = await bcrypt.hash(password, 12);
  const accountId = `usr-superadmin-${randomUUID()}`;
  await mongoose.connection.db.collection('users').updateOne(
    { email },
    {
      $set: {
        email,
        password: passwordHash,
        role: 'superadmin',
        verified: true,
        status: 'ACTIVE'
      },
      $setOnInsert: {
        id: accountId,
        userId: accountId,
        name: 'IT HUNT SuperAdmin',
        createdAt: new Date().toISOString()
      }
    },
    { upsert: true }
  );

  console.log(`SuperAdmin account provisioned for ${email}. Password stored as a bcrypt hash.`);
  console.log('The account password is not displayed or saved by this command.');
}

main()
  .catch(error => {
    console.error(`SuperAdmin provisioning failed: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
  });
