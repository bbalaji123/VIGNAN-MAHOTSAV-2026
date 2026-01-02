import mongoose from 'mongoose';
import CAManager from '../models/CAManager.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

async function checkManager() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav');
    console.log('Connected to MongoDB\n');

    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Available collections:');
    collections.forEach(col => console.log(`   - ${col.name}`));
    console.log('');

    // Check for manager
    const manager = await CAManager.findOne();
    
    if (manager) {
      console.log('✅ CA Manager found in database!');
      console.log(`   Email: ${manager.email}`);
      console.log(`   Name: ${manager.name}`);
      console.log(`   Created: ${manager.createdAt}`);
      console.log(`   Action Logs: ${manager.actionLogs?.length || 0}`);
    } else {
      console.log('❌ No CA Manager found in database!');
      console.log('\nTo create the manager, run:');
      console.log('   node backend/scripts/seedCAManager.mjs');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkManager();
