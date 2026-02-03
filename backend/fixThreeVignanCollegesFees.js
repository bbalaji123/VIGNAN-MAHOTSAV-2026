import mongoose from 'mongoose';
import Participant from './models/Participant.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

async function fixThreeVignanCollegesFees() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // The specific Vignan colleges that should have 150 fee (5 colleges only)
    const targetColleges = [
      'Vignan Pharmacy College',
      "Vignan's Institute of Management & Technology For Women",
      "Vignan's Institute of Engineering for Women, Kapujaggarupeta, Vadlapudi Post, Gajuwaka, PIN-530049(CC-NM)",
      "Vignan's Institute of Information Technology, Beside VSEZ, Duvvada, Gajuwaka,Vadlapudi (P.O)Pin-530049  (CC-L3)",
      "Vignan's Foundation for Science, Technology & Research (Off Campus, Hyderabad)"
    ];

    console.log('\nSearching for participants from these colleges:');
    targetColleges.forEach((college, index) => {
      console.log(`${index + 1}. ${college}`);
    });
    console.log('\n');

    let updatedCount = 0;
    let totalEventsFixed = 0;
    const collegeStats = {};

    // Initialize stats
    targetColleges.forEach(college => {
      collegeStats[college] = { participants: 0, eventsUpdated: 0 };
    });

    // Process each college
    for (const college of targetColleges) {
      // Try exact match first
      let participants = await Participant.find({ college: college });
      
      // If no exact match, try case-insensitive search
      if (participants.length === 0) {
        participants = await Participant.find({ 
          college: new RegExp(college.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
        });
      }

      console.log(`Found ${participants.length} participants from: ${college}`);
      collegeStats[college].participants = participants.length;

      for (const participant of participants) {
        let modified = false;
        
        // Update fee for each registered event
        participant.registeredEvents.forEach(event => {
          if (event.fee !== 150) {
            console.log(`\n  Participant: ${participant.name} (${participant.userId})`);
            console.log(`    Event: ${event.eventName}`);
            console.log(`    Old Fee: ${event.fee} → New Fee: 150`);
            
            event.fee = 150;
            modified = true;
            totalEventsFixed++;
            collegeStats[college].eventsUpdated++;
          }
        });

        if (modified) {
          await participant.save();
          updatedCount++;
        }
      }
    }

    console.log('\n\n=== DETAILED SUMMARY ===');
    console.log('College-wise breakdown:');
    targetColleges.forEach((college, index) => {
      console.log(`\n${index + 1}. ${college}`);
      console.log(`   Participants found: ${collegeStats[college].participants}`);
      console.log(`   Events fee updated: ${collegeStats[college].eventsUpdated}`);
    });

    console.log('\n\n=== OVERALL SUMMARY ===');
    console.log(`Total participants updated: ${updatedCount}`);
    console.log(`Total events fee updated: ${totalEventsFixed}`);
    console.log('✓ Database update completed successfully!');

  } catch (error) {
    console.error('Error updating database:', error);
    console.error(error.stack);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

fixThreeVignanCollegesFees();
