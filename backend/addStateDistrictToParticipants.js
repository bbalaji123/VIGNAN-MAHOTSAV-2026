import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Participant from './models/Participant.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

// Load college data
const collegeData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'college.json'), 'utf8')
);

// Create a mapping of college name to state and district
const collegeMapping = {};
collegeData.forEach(college => {
  const collegeName = college.Name.trim().toLowerCase();
  collegeMapping[collegeName] = {
    state: college.State,
    district: college.District
  };
});

async function addStateDistrictToParticipants() {
  try {
    console.log('Connecting to MongoDB...');
    
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI environment variable is not set');
      console.log('Please set MONGODB_URI in your .env file');
      process.exit(1);
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'test'
    });
    console.log('Connected to MongoDB successfully');
    console.log(`Database: ${mongoose.connection.name}`);

    // Get all participants
    const participants = await Participant.find({});
    console.log(`Found ${participants.length} participants to update`);

    let updatedCount = 0;
    let notFoundCount = 0;
    const notFoundColleges = new Set();

    for (const participant of participants) {
      if (participant.college) {
        const collegeName = participant.college.trim().toLowerCase();
        const collegeInfo = collegeMapping[collegeName];

        if (collegeInfo) {
          // Update participant with state and district
          await Participant.updateOne(
            { _id: participant._id },
            {
              $set: {
                state: collegeInfo.state,
                district: collegeInfo.district
              }
            }
          );
          updatedCount++;
          
          if (updatedCount % 100 === 0) {
            console.log(`Updated ${updatedCount} participants...`);
          }
        } else {
          notFoundCount++;
          notFoundColleges.add(participant.college);
        }
      }
    }

    console.log('\n=== Update Summary ===');
    console.log(`Total participants: ${participants.length}`);
    console.log(`Successfully updated: ${updatedCount}`);
    console.log(`Colleges not found in mapping: ${notFoundCount}`);
    
    if (notFoundColleges.size > 0) {
      console.log('\nColleges not found in mapping:');
      Array.from(notFoundColleges).forEach(college => {
        console.log(`  - ${college}`);
      });
    }

    console.log('\nUpdate completed successfully!');
  } catch (error) {
    console.error('Error updating participants:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the update
addStateDistrictToParticipants();
