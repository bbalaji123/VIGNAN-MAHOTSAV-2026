#!/usr/bin/env node
/**
 * Script to convert passwords from DDMMYYYY format to YYYY-MM-DD format
 * Run: node backend/scripts/convertPasswords.mjs
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

// Define Registration schema
const registrationSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  password: String,
  dateOfBirth: String,
}, { collection: 'registrations' });

const Registration = mongoose.model('Registration', registrationSchema);

const convertPasswords = async () => {
  try {
    console.log('\n🔄 Starting password conversion...\n');
    
    // Find all users with 8-digit passwords (DDMMYYYY format)
    const users = await Registration.find({
      password: /^\d{8}$/
    });
    
    console.log(`Found ${users.length} users with old password format\n`);
    
    let converted = 0;
    let errors = 0;
    
    for (const user of users) {
      try {
        const oldPassword = user.password;
        
        // Extract parts from DDMMYYYY
        const day = oldPassword.substring(0, 2);
        const month = oldPassword.substring(2, 4);
        const year = oldPassword.substring(4, 8);
        
        // Convert to YYYY-MM-DD
        const newPassword = `${year}-${month}-${day}`;
        
        // Update the password
        user.password = newPassword;
        await user.save();
        
        converted++;
        console.log(`✅ ${user.email} (${user.userId}): ${oldPassword} → ${newPassword}`);
      } catch (error) {
        errors++;
        console.error(`❌ Error converting ${user.email}:`, error.message);
      }
    }
    
    console.log(`\n📊 Conversion Summary:`);
    console.log(`   ✅ Successfully converted: ${converted}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log(`   📝 Total processed: ${users.length}`);
    
  } catch (error) {
    console.error('❌ Error during conversion:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  }
};

// Run the script
(async () => {
  await connectDB();
  await convertPasswords();
})();
