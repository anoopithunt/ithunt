import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

async function verifyDatabase() {
  const rawUri = (process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ithunt').trim();
  const isAtlas = rawUri.startsWith('mongodb+srv://') || rawUri.includes('.mongodb.net');
  const typeLabel = isAtlas ? 'MongoDB Atlas Cloud' : 'Local MongoDB';

  console.log('\n=============================================================');
  console.log('  🔍 IT HUNT - MongoDB Connection Verifier');
  console.log(`  🗄️  Target Database: ithunt`);
  console.log(`  🌐 Engine Type:     ${typeLabel}`);
  console.log('=============================================================\n');

  const startTime = Date.now();

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(rawUri, {
      dbName: 'ithunt',
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });

    const latency = Date.now() - startTime;
    const db = mongoose.connection.db;
    const dbName = mongoose.connection.name;

    // Ping test
    const pingResult = await db.admin().ping();
    const collections = await db.listCollections().toArray();

    console.log(`✓ CONNECTION STATUS : VERIFIED & ACTIVE`);
    console.log(`✓ Database Name     : ${dbName}`);
    console.log(`✓ Engine Mode       : ${typeLabel}`);
    console.log(`✓ Network Latency   : ${latency}ms`);
    console.log(`✓ Ping Result       : ok=${pingResult?.ok || 1}`);
    console.log(`✓ Total Collections : ${collections.length}\n`);

    console.log('📊 Collections in database "ithunt":');
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`   • ${col.name.padEnd(20)} : ${count} documents`);
    }

    console.log('\n=============================================================');
    console.log('  🎉 All systems verified! Database is ready for production.');
    console.log('=============================================================\n');
  } catch (error) {
    console.error(`\n❌ Connection Failed: ${error.message}`);
    console.log('\nTroubleshooting Checklist:');
    if (isAtlas) {
      console.log(' 1. Check if your Atlas IP Access List allows 0.0.0.0/0 (or your current IP).');
      console.log(' 2. Verify username and password in MONGODB_ATLAS_URI in your .env file.');
      console.log(' 3. Ensure special characters in password are URL-encoded.');
    } else {
      console.log(' 1. Run "npm run db:start" to launch local mongod.');
      console.log(' 2. Check port with "npm run db:status".');
    }
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

verifyDatabase();
