import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function setDefaultGenderToMale() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'test'
    });
    console.log('Connected successfully!');

    const db = mongoose.connection.db;
    const registrationsCollection = db.collection('registrations');

    // Update users without gender to Male
    const result = await registrationsCollection.updateMany(
      {
        $or: [
          { gender: { $exists: false } },
          { gender: null },
          { gender: '' }
        ]
      },
      {
        $set: { gender: 'Male' }
      }
    );

    console.log('\n=== Update Summary ===');
    console.log(`Users updated: ${result.modifiedCount}`);
    console.log('All users without gender have been set to Male');

    // Verify the update
    const remainingWithoutGender = await registrationsCollection.countDocuments({
      $or: [
        { gender: { $exists: false } },
        { gender: null },
        { gender: '' }
      ]
    });

    console.log(`\nVerification: Users still without gender: ${remainingWithoutGender}`);

  } catch (error) {
    console.error('Error updating users:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

setDefaultGenderToMale();
