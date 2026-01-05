import mongoose from 'mongoose';
import Participant from './models/Participant.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

async function fixOtherCollegeFees() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all participants NOT from Vignan's Foundation
    const participants = await Participant.find({
      college: { $not: /Vignan's Foundation of Science, Technology & Research, Guntur/i }
    });

    console.log(`Found ${participants.length} participants from other colleges`);

    let updatedCount = 0;
    let totalEventsFixed = 0;

    for (const participant of participants) {
      let modified = false;
      
      participant.registeredEvents.forEach(event => {
        let newFee = null;

        // Check if participant is para sports or event is para-related
        if (participant.participantType === 'para' || 
            (event.eventName && event.eventName.toLowerCase().includes('para')) ||
            (event.category && event.category.toLowerCase().includes('para')) ||
            (event.eventType && event.eventType.toLowerCase().includes('para'))) {
          newFee = 0;
        }
        // Male participants - all events 350
        else if (participant.gender === 'Male') {
          newFee = 350;
        }
        // Female participants - culturals 250, sports 350
        else if (participant.gender === 'Female') {
          const eventType = event.eventType ? event.eventType.toLowerCase() : '';
          
          if (eventType === 'culturals' || eventType === 'cultural') {
            newFee = 250;
          } else if (eventType === 'sports' || eventType === 'sport') {
            newFee = 350;
          } else {
            // Default for female if type unclear
            newFee = 350;
          }
        }

        // Update if fee is different
        if (newFee !== null && event.fee !== newFee) {
          console.log(`\nParticipant: ${participant.name} (${participant.userId})`);
          console.log(`  Gender: ${participant.gender}, Type: ${participant.participantType}`);
          console.log(`  Event: ${event.eventName}`);
          console.log(`  Event Type: ${event.eventType}`);
          console.log(`  Old Fee: ${event.fee}`);
          console.log(`  New Fee: ${newFee}`);
          
          event.fee = newFee;
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
    console.log(`Total participants updated: ${updatedCount}`);
    console.log(`Total events fee updated: ${totalEventsFixed}`);
    console.log('Database update completed successfully!');

  } catch (error) {
    console.error('Error updating database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

fixOtherCollegeFees();
