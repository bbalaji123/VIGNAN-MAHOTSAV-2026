import mongoose from 'mongoose';
import Participant from '../models/Participant.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

async function cleanupParticipants() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all participants with empty registeredEvents array
    const participantsWithNoEvents = await Participant.find({
      $or: [
        { registeredEvents: { $exists: false } },
        { registeredEvents: { $size: 0 } }
      ]
    });

    console.log(`Found ${participantsWithNoEvents.length} participants with no registered events`);

    if (participantsWithNoEvents.length === 0) {
      console.log('No participants to delete. Database is clean!');
      await mongoose.disconnect();
      return;
    }

    // Display participants that will be deleted
    console.log('\nParticipants to be deleted:');
    participantsWithNoEvents.forEach((p, index) => {
      console.log(`${index + 1}. ${p.name} (${p.userId}) - ${p.email}`);
    });

    // Delete participants with no events
    const result = await Participant.deleteMany({
      $or: [
        { registeredEvents: { $exists: false } },
        { registeredEvents: { $size: 0 } }
      ]
    });

    console.log(`\n✅ Successfully deleted ${result.deletedCount} participants with no registered events`);

    // Show remaining participants (those with events)
    const remainingParticipants = await Participant.find({});
    console.log(`\n📊 Remaining participants: ${remainingParticipants.length}`);
    
    if (remainingParticipants.length > 0) {
      console.log('\nParticipants with registered events:');
      remainingParticipants.forEach((p, index) => {
        console.log(`${index + 1}. ${p.name} (${p.userId}) - ${p.registeredEvents.length} events`);
      });
    }

    await mongoose.disconnect();
    console.log('\n✅ Database cleanup completed successfully!');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupParticipants();
