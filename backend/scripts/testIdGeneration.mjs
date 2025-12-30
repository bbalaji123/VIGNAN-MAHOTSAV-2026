#!/usr/bin/env node
/**
 * Script to test ID generation
 * Run: node backend/scripts/testIdGeneration.mjs
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Counter schema
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
}, { collection: 'counters' });

const Counter = mongoose.model('Counter', counterSchema);

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

// Test ID generation
const testIdGeneration = async () => {
  try {
    console.log('\n🧪 Testing ID Generation...\n');
    
    // Check current counter state
    const currentCounter = await Counter.findOne({ _id: 'userId' });
    console.log('Current counter state:', currentCounter || 'No counter exists');
    
    // Generate 5 test IDs
    console.log('\nGenerating 5 test user IDs:');
    for (let i = 1; i <= 5; i++) {
      const counter = await Counter.findOneAndUpdate(
        { _id: 'userId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      
      const nextNumber = counter.seq;
      const nextUserId = `MH26${nextNumber.toString().padStart(6, '0')}`;
      
      console.log(`  ${i}. Counter seq: ${counter.seq} → User ID: ${nextUserId}`);
    }
    
    // Final counter state
    const finalCounter = await Counter.findOne({ _id: 'userId' });
    console.log('\n✅ Final counter state:', finalCounter);
    console.log('\n📝 Next user ID will be: MH26' + (finalCounter.seq + 1).toString().padStart(6, '0'));
    
  } catch (error) {
    console.error('❌ Error during test:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  }
};

// Run the script
(async () => {
  await connectDB();
  await testIdGeneration();
})();
