import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function findUsersWithoutGender() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'test'
    });
    console.log('Connected successfully!');

    const db = mongoose.connection.db;
    const registrationsCollection = db.collection('registrations');

    // Find users without gender or with empty gender
    const usersWithoutGender = await registrationsCollection.find({
      $or: [
        { gender: { $exists: false } },
        { gender: null },
        { gender: '' }
      ]
    }).toArray();

    console.log(`\n=== Users Without Gender ===`);
    console.log(`Total users without gender: ${usersWithoutGender.length}\n`);

    if (usersWithoutGender.length > 0) {
      usersWithoutGender.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name || 'N/A'}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   User ID: ${user.userId}`);
        console.log(`   College: ${user.college || 'N/A'}`);
        console.log(`   Phone: ${user.phone || 'N/A'}`);
        console.log(`   Registered At: ${user.createdAt || 'N/A'}`);
        console.log(`   Gender: ${user.gender || 'NOT SET'}`);
        console.log('');
      });
    } else {
      console.log('All users have gender information! ✓');
    }

  } catch (error) {
    console.error('Error finding users:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

findUsersWithoutGender();
