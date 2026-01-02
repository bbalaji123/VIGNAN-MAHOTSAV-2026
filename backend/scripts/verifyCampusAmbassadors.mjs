#!/usr/bin/env node
/**
 * Verification script to check CA data and next ID
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'test',
    });
    console.log('✅ Connected to MongoDB\n');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const campusAmbassadorSchema = new mongoose.Schema({}, { strict: false, collection: 'campusambassadors' });
const CampusAmbassador = mongoose.model('CampusAmbassador', campusAmbassadorSchema);

const verifyCA = async () => {
  try {
    const count = await CampusAmbassador.countDocuments();
    console.log(`📊 Total Campus Ambassadors in database: ${count}`);
    
    if (count > 0) {
      const lastCA = await CampusAmbassador.findOne({}, { mcaId: 1, name: 1, email: 1 })
        .sort({ mcaId: -1 })
        .limit(1);
      console.log(`📌 Last CA ID: ${lastCA.mcaId}`);
      console.log(`📌 Name: ${lastCA.name}`);
      
      const lastNumber = parseInt(lastCA.mcaId.substring(3));
      const nextNumber = lastNumber + 1;
      const nextId = `MCA${nextNumber.toString().padStart(6, '0')}`;
      console.log(`🆕 Next CA ID will be: ${nextId}`);
    } else {
      console.log('🆕 Next CA ID will be: MCA260001');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  }
};

(async () => {
  await connectDB();
  await verifyCA();
})();
