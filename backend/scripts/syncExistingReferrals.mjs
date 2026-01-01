import mongoose from 'mongoose';
import Registration from '../models/Registration.js';
import CampusAmbassador from '../models/CampusAmbassador.js';
import { config } from 'dotenv';

config();

const syncExistingReferrals = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database');

    // Find all registrations that have a referredBy value
    const registrationsWithReferrals = await Registration.find({
      referredBy: { $exists: true, $ne: null, $ne: '' }
    });

    console.log(`Found ${registrationsWithReferrals.length} registrations with referral codes`);

    let successCount = 0;
    let errorCount = 0;

    for (const registration of registrationsWithReferrals) {
      try {
        const mcaId = registration.referredBy.toUpperCase();
        
        // Find the Campus Ambassador
        const ca = await CampusAmbassador.findOne({ mcaId });

        if (!ca) {
          console.log(`⚠️  CA not found for MCA ID: ${mcaId} (User: ${registration.userId})`);
          errorCount++;
          continue;
        }

        // Check if this referral already exists
        const existingReferral = ca.referrals.find(r => r.userId === registration.userId);
        
        if (existingReferral) {
          console.log(`ℹ️  Referral already exists: ${registration.userId} -> ${mcaId}`);
          continue;
        }

        // Add the referral
        await ca.addReferral(registration.userId, registration.name, registration.email);
        console.log(`✅ Added referral: ${registration.userId} (${registration.name}) -> ${mcaId}`);
        successCount++;

      } catch (err) {
        console.error(`❌ Error processing ${registration.userId}:`, err.message);
        errorCount++;
      }
    }

    console.log('\n=== Migration Complete ===');
    console.log(`✅ Successfully synced: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`ℹ️  Already existed: ${registrationsWithReferrals.length - successCount - errorCount}`);

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

syncExistingReferrals();
