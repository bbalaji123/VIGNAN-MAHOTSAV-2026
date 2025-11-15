import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    const eventsCollection = db.collection('events');

    // Get all indexes
    const indexes = await eventsCollection.indexes();
    console.log('\n📋 Current indexes:', indexes);

    // Drop the problematic eventId_1 index if it exists
    try {
      await eventsCollection.dropIndex('eventId_1');
      console.log('✅ Dropped eventId_1 index');
    } catch (error) {
      if (error.code === 27) {
        console.log('ℹ️  eventId_1 index does not exist (already removed)');
      } else {
        console.log('⚠️  Error dropping index:', error.message);
      }
    }

    // Clear the collection
    await eventsCollection.deleteMany({});
    console.log('✅ Cleared events collection');

    console.log('\n✅ Database fixed! Now run: node seedEvents.js');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixDatabase();
