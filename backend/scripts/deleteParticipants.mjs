#!/usr/bin/env node
/**
 * Script to delete all participants
 * Run: node backend/scripts/deleteParticipants.mjs
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

const deleteParticipants = async () => {
  try {
    console.log('\n🗑️  Deleting all participants...\n');
    
    const db = mongoose.connection.db;
    
    // Delete all participants
    const result = await db.collection('participants').deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} participant(s)`);
    
    console.log('\n📊 Current Collections:');
    const collections = await db.listCollections().toArray();
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`   - ${collection.name}: ${count} document(s)`);
    }
    
  } catch (error) {
    console.error('❌ Error deleting participants:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  }
};

// Run the script
(async () => {
  await connectDB();
  await deleteParticipants();
})();
