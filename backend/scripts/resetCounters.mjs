#!/usr/bin/env node
/**
 * Script to reset ID counters to start from 1
 * Run: node backend/scripts/resetCounters.mjs
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'test',
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Define Counter schema
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
}, { collection: 'counters' });

const Counter = mongoose.model('Counter', counterSchema);

const resetCounters = async () => {
  try {
    console.log('\n🔄 Resetting ID counters...\n');
    
    // Delete all counters
    const result = await Counter.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} counter(s)`);
    
    // Optionally, you can also delete all registrations and participants
    const db = mongoose.connection.db;
    
    console.log('\n📊 Current Collections:');
    const collections = await db.listCollections().toArray();
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`   - ${collection.name}: ${count} document(s)`);
    }
    
    console.log('\n✅ Counters reset! Next user ID will be: MH26000001');
    console.log('✅ Next registration IDs will start from: SR26000001, CR26000001, etc.');
    
  } catch (error) {
    console.error('❌ Error resetting counters:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  }
};

// Run the script
(async () => {
  await connectDB();
  await resetCounters();
})();
