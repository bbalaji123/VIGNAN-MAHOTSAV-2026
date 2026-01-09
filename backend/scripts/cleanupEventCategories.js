import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function cleanupEventCategories() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'test'
    });
    console.log('Connected successfully!');

    const db = mongoose.connection.db;
    const participantsCollection = db.collection('participants');

    // Find all participants with registered events
    const participants = await participantsCollection.find({
      registeredEvents: { $exists: true, $ne: [] }
    }).toArray();

    console.log(`\nFound ${participants.length} participants with registered events`);

    let updated = 0;

    for (const participant of participants) {
      let needsUpdate = false;
      
      const updatedEvents = participant.registeredEvents.map(event => {
        if (event.category) {
          const originalCategory = event.category;
          const cleanedCategory = event.category
            .replace(/Women's\s*/gi, '')
            .replace(/Men's\s*/gi, '')
            .replace(/\s*Women\s*/gi, ' ')
            .replace(/\s*Men\s*/gi, ' ')
            .replace(/\s*Female\s*/gi, ' ')
            .replace(/\s*Male\s*/gi, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          if (originalCategory !== cleanedCategory) {
            needsUpdate = true;
            console.log(`  "${originalCategory}" → "${cleanedCategory}"`);
          }
          
          return {
            ...event,
            category: cleanedCategory
          };
        }
        return event;
      });

      if (needsUpdate) {
        await participantsCollection.updateOne(
          { _id: participant._id },
          { $set: { registeredEvents: updatedEvents } }
        );
        updated++;
        console.log(`Updated: ${participant.name} (${participant.email})`);
      }
    }

    console.log('\n=== Cleanup Summary ===');
    console.log(`Total participants checked: ${participants.length}`);
    console.log(`Participants updated: ${updated}`);
    console.log(`No changes needed: ${participants.length - updated}`);

  } catch (error) {
    console.error('Error cleaning up categories:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

cleanupEventCategories();
