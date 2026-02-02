import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Participant from '../models/Participant.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

async function updateParticipantAmounts() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Get all participants
        const participants = await Participant.find({});
        console.log(`Found ${participants.length} participants to update`);

        let updated = 0;
        let skipped = 0;

        for (const participant of participants) {
            // Calculate fee based on registered events
            const events = participant.registeredEvents || [];

            if (events.length === 0) {
                // No events, amount should be 0
                if (participant.amount !== 0) {
                    participant.amount = 0;
                    await participant.save();
                    updated++;
                    console.log(`Updated ${participant.userId} (${participant.name}): No events, amount set to 0`);
                } else {
                    skipped++;
                }
                continue;
            }

            // Check event types
            const hasSports = events.some(e => e.eventType === 'sports');
            const hasCulturals = events.some(e => e.eventType === 'culturals');
            const hasParaSports = events.some(e => e.eventType === 'parasports');

            let calculatedAmount = 0;

            // Para sports are always free
            if (hasParaSports) {
                calculatedAmount = 0;
            } else {
                // Check if user is from special Vignan colleges
                const specialVignanColleges = [
                    'Vignan Pharmacy College',
                    "Vignan's Foundation of Science, Technology & Research",
                    "Vignan's Lara Institute of Technology & Science",
                    "Vignan's Nirula Institute of Technology & Science for Women"
                ];

                const isSpecialVignanStudent = specialVignanColleges.some(college =>
                    participant.college?.toLowerCase().includes(college.toLowerCase()) ||
                    college.toLowerCase().includes(participant.college?.toLowerCase())
                );

                // Special Vignan colleges: ₹150 flat fee
                if (isSpecialVignanStudent) {
                    if (hasSports || hasCulturals) {
                        calculatedAmount = 150;
                    }
                } else {
                    // Regular fee calculation
                    const gender = participant.gender?.toLowerCase();

                    if (gender === 'male') {
                        if (hasSports && hasCulturals) {
                            calculatedAmount = 350; // Both sports and culturals
                        } else if (hasSports) {
                            calculatedAmount = 350; // Sports only
                        } else if (hasCulturals) {
                            calculatedAmount = 250; // Culturals only
                        }
                    } else if (gender === 'female') {
                        if (hasSports || hasCulturals) {
                            calculatedAmount = 250; // Female fee is always 250 total
                        }
                    } else {
                        // Default for other genders
                        if (hasSports && hasCulturals) {
                            calculatedAmount = 350;
                        } else if (hasSports) {
                            calculatedAmount = 350;
                        } else if (hasCulturals) {
                            calculatedAmount = 250;
                        }
                    }
                }
            }

            // Update if amount is different
            if (participant.amount !== calculatedAmount) {
                const oldAmount = participant.amount;
                participant.amount = calculatedAmount;
                await participant.save();
                updated++;

                const eventTypes = [];
                if (hasSports) eventTypes.push('Sports');
                if (hasCulturals) eventTypes.push('Culturals');
                if (hasParaSports) eventTypes.push('ParaSports');

                console.log(`Updated ${participant.userId} (${participant.name}): ${oldAmount || 0} → ${calculatedAmount} | Events: ${eventTypes.join('+')}`);
            } else {
                skipped++;
            }
        }

        console.log('\n=== Migration Summary ===');
        console.log(`Total participants: ${participants.length}`);
        console.log(`Updated: ${updated}`);
        console.log(`Skipped (already correct): ${skipped}`);
        console.log('Migration completed successfully!');

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the migration
updateParticipantAmounts();
