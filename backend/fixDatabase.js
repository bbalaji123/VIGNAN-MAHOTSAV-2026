import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function fixDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'test'
    });
    console.log('Connected to MongoDB');

    // Get the registrations collection
    const db = mongoose.connection.db;
    const collection = db.collection('registrations');

    // List all indexes
    const indexes = await collection.indexes();
    console.log('\nCurrent indexes:');
    indexes.forEach(index => {
      console.log('  -', JSON.stringify(index.key), index.unique ? '(unique)' : '');
    });

    // Drop the problematic rollNumber index if it exists
    try {
      await collection.dropIndex('rollNumber_1');
      console.log('\n✅ Successfully dropped rollNumber_1 index');
    } catch (error) {
      if (error.codeName === 'IndexNotFound') {
        console.log('\n⚠️  rollNumber_1 index not found (already removed)');
      } else {
        console.error('\n❌ Error dropping rollNumber index:', error.message);
      }
    }

    // Drop the participantId index if it exists
    try {
      await collection.dropIndex('participantId_1');
      console.log('✅ Successfully dropped participantId_1 index');
    } catch (error) {
      if (error.codeName === 'IndexNotFound') {
        console.log('⚠️  participantId_1 index not found (already removed)');
      } else {
        console.error('❌ Error dropping participantId index:', error.message);
      }
    }

    // List indexes after dropping
    const indexesAfter = await collection.indexes();
    console.log('\nIndexes after cleanup:');
    indexesAfter.forEach(index => {
      console.log('  -', JSON.stringify(index.key), index.unique ? '(unique)' : '');
    });

    console.log('\n✅ Database cleanup completed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\nDisconnected from MongoDB');
    process.exit(0);
  }
}

fixDatabase();
