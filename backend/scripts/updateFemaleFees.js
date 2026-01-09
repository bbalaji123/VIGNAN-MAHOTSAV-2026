import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const specialVignanColleges = [
  'Vignan Pharmacy College',
  "Vignan's Foundation of Science, Technology & Research",
  "Vignan's Lara Institute of Technology & Science"
];

const isSpecialVignanCollege = (collegeName) => {
  if (!collegeName) return false;
  const lowerCollege = collegeName.toLowerCase();
  return specialVignanColleges.some(college => 
    lowerCollege.includes(college.toLowerCase()) || 
    college.toLowerCase().includes(lowerCollege)
  );
};

async function updateFemaleFees() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'test'
    });
    console.log('Connected successfully!');

    const db = mongoose.connection.db;
    const participantsCollection = db.collection('participants');

    // Find all female participants
    const femaleParticipants = await participantsCollection.find({
      gender: { $in: ['Female', 'female'] }
    }).toArray();

    console.log(`\nFound ${femaleParticipants.length} female participants`);

    let updated = 0;
    let skipped = 0;
    let vignanSkipped = 0;

    for (const participant of femaleParticipants) {
      const isVignan = isSpecialVignanCollege(participant.college);
      
      if (isVignan) {
        vignanSkipped++;
        console.log(`Skipping Vignan student: ${participant.name} - ${participant.college}`);
        continue;
      }

      // Check if they have events registered
      if (!participant.registeredEvents || participant.registeredEvents.length === 0) {
        skipped++;
        continue;
      }

      // Update each event's fee to 250 for females (but total charged is still 250)
      const updatedEvents = participant.registeredEvents.map(event => {
        if (event.eventType === 'para sports') {
          return event; // Keep para sports at 0
        }
        return {
          ...event,
          fee: 250 // Display 250 per event
        };
      });

      // Total fee for females is always 250 (regardless of number of events)
      const totalFee = 250;

      // Update the participant
      await participantsCollection.updateOne(
        { _id: participant._id },
        {
          $set: {
            registeredEvents: updatedEvents
          }
        }
      );

      updated++;
      console.log(`Updated: ${participant.name} - ${participant.email} - Total Events: ${updatedEvents.length} - Individual Fee: ₹250 - Total Charged: ₹${totalFee}`);
    }

    console.log('\n=== Update Summary ===');
    console.log(`Total female participants: ${femaleParticipants.length}`);
    console.log(`Updated: ${updated}`);
    console.log(`Skipped (no events): ${skipped}`);
    console.log(`Skipped (Vignan colleges): ${vignanSkipped}`);

  } catch (error) {
    console.error('Error updating fees:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

updateFemaleFees();
