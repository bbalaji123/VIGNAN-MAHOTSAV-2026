import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

async function checkCollectionRaw() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'test' });
    console.log('Connected to MongoDB\n');

    const db = mongoose.connection.db;
    
    // Check ca-manager collection directly
    const collection = db.collection('ca-manager');
    const count = await collection.countDocuments();
    const docs = await collection.find({}).toArray();
    
    console.log(`📊 ca-manager collection has ${count} documents\n`);
    
    if (docs.length > 0) {
      console.log('Documents found:');
      docs.forEach((doc, index) => {
        console.log(`\n${index + 1}. Document:`);
        console.log(`   _id: ${doc._id}`);
        console.log(`   email: ${doc.email}`);
        console.log(`   name: ${doc.name}`);
        console.log(`   isActive: ${doc.isActive}`);
        console.log(`   createdAt: ${doc.createdAt}`);
        console.log(`   actionLogs: ${doc.actionLogs?.length || 0}`);
      });
    } else {
      console.log('❌ Collection is empty!');
      console.log('\nDeleting the empty collection and re-running seed...');
      await collection.drop().catch(() => console.log('Collection already dropped'));
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkCollectionRaw();
