import mongoose from 'mongoose';
import Participant from './models/Participant.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

async function fixMaleWomenEvents() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all male participants who have events with "Women's" in category
    const maleParticipants = await Participant.find({
      gender: 'Male',
      'registeredEvents.category': /Women's/i
    });

    console.log(`Found ${maleParticipants.length} male participants with Women's events`);

    let updatedCount = 0;
    let totalEventsFixed = 0;

    for (const participant of maleParticipants) {
      let modified = false;
      
      // Update each registered event that contains "Women's" in category
      participant.registeredEvents.forEach(event => {
        if (event.category && event.category.includes("Women's")) {
          console.log(`\nParticipant: ${participant.name} (${participant.userId})`);
          console.log(`  Event: ${event.eventName}`);
          console.log(`  Old Category: ${event.category}`);
          
          // Remove "Women's " from the category
          event.category = event.category.replace(/Women's\s*/gi, '');
          
          console.log(`  New Category: ${event.category}`);
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
    console.log(`Total male participants updated: ${updatedCount}`);
    console.log(`Total events fixed: ${totalEventsFixed}`);
    console.log('Database update completed successfully!');

  } catch (error) {
    console.error('Error updating database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

fixMaleWomenEvents();
