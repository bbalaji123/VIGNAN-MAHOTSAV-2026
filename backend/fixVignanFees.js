import mongoose from 'mongoose';
import Participant from './models/Participant.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

async function fixVignanFees() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all participants from Vignan's Foundation
    const vignanParticipants = await Participant.find({
      college: /Vignan's Foundation of Science, Technology & Research, Guntur/i
    });

    console.log(`Found ${vignanParticipants.length} participants from Vignan's Foundation`);

    let updatedCount = 0;
    let totalEventsFixed = 0;

    for (const participant of vignanParticipants) {
      let modified = false;
      
      // Update fee for each registered event
      participant.registeredEvents.forEach(event => {
        if (event.fee !== 150) {
          console.log(`\nParticipant: ${participant.name} (${participant.userId})`);
          console.log(`  Event: ${event.eventName}`);
          console.log(`  Old Fee: ${event.fee}`);
          console.log(`  New Fee: 150`);
          
          event.fee = 150;
          modified = true;
          totalEventsFixed++;
        }
      });

      if (modified) {
        await participant.save();
        updatedCount++;
      }
    }

    console.log(`\n=== Summary ===`);
    console.log(`Total Vignan's participants updated: ${updatedCount}`);
    console.log(`Total events fee updated: ${totalEventsFixed}`);
    console.log('Database update completed successfully!');

  } catch (error) {
    console.error('Error updating database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

fixVignanFees();
