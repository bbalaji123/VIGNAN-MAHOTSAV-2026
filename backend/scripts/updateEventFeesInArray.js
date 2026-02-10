import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Participant from '../models/Participant.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

async function updateEventFees() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Get all participants
        const participants = await Participant.find({});
        console.log(`Found ${participants.length} participants to update`);

        let updated = 0;
        let skipped = 0;

        for (const participant of participants) {
            const events = participant.registeredEvents || [];

            if (events.length === 0) {
                skipped++;
                continue;
            }

            // Check event types
            const hasSports = events.some(e => e.eventType === 'sports');
            const hasCulturals = events.some(e => e.eventType === 'culturals');
            const hasParaSports = events.some(e => e.eventType === 'parasports');

            let totalFee = 0;

            // Calculate total fee
            if (hasParaSports) {
                totalFee = 0;
            } else {
                // Check if student is from specific Vignan colleges (only these 10 colleges have 150 fee)
                const specialVignanColleges = [
                    { name: "Vignan's Institute of Information Technology (Visakhapatnam)", keywords: ['information technology', 'duvvada', 'cc-l3', 'visakhapatnam'] },
                    { name: "Vignan's Institute of Engineering for Women (Visakhapatnam)", keywords: ['engineering for women', 'kapujaggarupeta', 'cc-nm', 'visakhapatnam'] },
                    { name: 'Vignan Institute of Technology & Sciences (Hyderabad)', keywords: ['technology & sciences', 'deshmukhi'] },
                    { name: "Vignan's Institute of Management & Technology For Women (Hyderabad)", keywords: ['management & technology for women', 'nizampet'] },
                    { name: 'Vignan Institute of Pharmaceutical Sciences (Hyderabad)', keywords: ['pharmaceutical sciences'] },
                    { name: "Vignan's Foundation for Science, Technology & Research (Off Campus, Hyderabad)", keywords: ['off campus, hyderabad', 'foundation', 'hyderabad'] },
                    { name: "Vignan's Nirula Institute of Technology & Science for Women (Guntur)", keywords: ['nirula', 'cc-nn', 'palakaluru'] },
                    { name: "Vignan's Foundation of Science, Technology & Research (Guntur - Deemed to be University)", keywords: ['foundation', 'guntur', 'deemed'] },
                    { name: "Vignan's Lara Institute of Technology & Science (Vadlamudi)", keywords: ['lara', 'cc-fe', 'vadlamudi'] },
                    { name: 'Vignan Pharmacy College (Vadlamudi)', keywords: ['pharmacy', 'vadlamudi', 'cc-ab'] }
                ];

                const collegeLower = (participant.college || '').toLowerCase().trim();
                const isSpecialVignanStudent = specialVignanColleges.some(college => {
                    const nameLower = college.name.toLowerCase();
                    if (collegeLower === nameLower) {
                        return true;
                    }
                    if (collegeLower.includes('vignan')) {
                        return college.keywords.some(keyword => collegeLower.includes(keyword));
                    }
                    return false;
                });

                if (isSpecialVignanStudent) {
                    if (hasSports || hasCulturals) {
                        totalFee = 150;
                    }
                } else {
                    const gender = participant.gender?.toLowerCase();

                    if (gender === 'male') {
                        if (hasSports && hasCulturals) {
                            totalFee = 350;
                        } else if (hasSports) {
                            totalFee = 350;
                        } else if (hasCulturals) {
                            totalFee = 250;
                        }
                    } else if (gender === 'female') {
                        if (hasSports || hasCulturals) {
                            totalFee = 250;
                        }
                    } else {
                        if (hasSports && hasCulturals) {
                            totalFee = 350;
                        } else if (hasSports) {
                            totalFee = 350;
                        } else if (hasCulturals) {
                            totalFee = 250;
                        }
                    }
                }
            }

            // Update each event's fee to the total fee
            let needsUpdate = false;
            participant.registeredEvents = events.map(event => {
                if (event.fee !== totalFee) {
                    needsUpdate = true;
                }
                return {
                    ...event.toObject(),
                    fee: totalFee
                };
            });

            // Also update the participant's amount field
            if (participant.amount !== totalFee) {
                needsUpdate = true;
            }
            participant.amount = totalFee;

            if (needsUpdate) {
                await participant.save();
                updated++;

                const eventTypes = [];
                if (hasSports) eventTypes.push('Sports');
                if (hasCulturals) eventTypes.push('Culturals');
                if (hasParaSports) eventTypes.push('ParaSports');

                console.log(`Updated ${participant.userId} (${participant.name}): Fee set to ₹${totalFee} for ${events.length} event(s) | Types: ${eventTypes.join('+')}`);
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
updateEventFees();
