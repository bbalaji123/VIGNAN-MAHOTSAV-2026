#!/usr/bin/env node
/**
 * Script to delete all Campus Ambassador data and reset counter to MCA260001
 * Run: node backend/scripts/deleteCampusAmbassadors.mjs
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

// Define schemas
const campusAmbassadorSchema = new mongoose.Schema({}, { strict: false, collection: 'campusambassadors' });
const CampusAmbassador = mongoose.model('CampusAmbassador', campusAmbassadorSchema);

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
}, { collection: 'counters' });
const Counter = mongoose.model('Counter', counterSchema);

const deleteCampusAmbassadors = async () => {
  try {
    console.log('\n🗑️  Deleting all Campus Ambassador data...\n');
    
    // Get count before deletion
    const countBefore = await CampusAmbassador.countDocuments();
    console.log(`📊 Current Campus Ambassadors: ${countBefore}`);
    
    if (countBefore === 0) {
      console.log('⚠️  No Campus Ambassadors found in database');
    } else {
      // Delete all campus ambassadors
      const deleteResult = await CampusAmbassador.deleteMany({});
      console.log(`✅ Deleted ${deleteResult.deletedCount} Campus Ambassador(s)`);
    }
    
    // Reset the mcaId counter
    console.log('\n🔄 Resetting Campus Ambassador counter...');
    
    // Delete the existing counter
    await Counter.deleteOne({ _id: 'mcaId' });
    
    // Create new counter starting from 0 (next ID will be MCA260001)
    await Counter.create({ _id: 'mcaId', seq: 0 });
    
    console.log('✅ Counter reset! Next Campus Ambassador ID will be: MCA260001');
    
    // Verify counter
    const counter = await Counter.findOne({ _id: 'mcaId' });
    console.log(`📊 Current counter value: ${counter?.seq || 0}`);
    
    console.log('\n✨ All Campus Ambassador data deleted and counter reset successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  }
};

// Run the script
(async () => {
  await connectDB();
  await deleteCampusAmbassadors();
})();
