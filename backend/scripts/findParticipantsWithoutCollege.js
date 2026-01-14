import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Participant from '../models/Participant.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

async function findParticipantsWithoutCollege() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB\n');

        // Find participants with missing or empty college field
        const participantsWithoutCollege = await Participant.find({
            $or: [
                { college: { $exists: false } },
                { college: null },
                { college: '' },
                { college: '""' }
            ]
        }).select('userId name email phone college gender registerId registeredEvents amount paymentStatus');

        console.log(`Found ${participantsWithoutCollege.length} participants without college data\n`);

        let report = '';
        report += '='.repeat(100) + '\n';
        report += 'PARTICIPANTS WITHOUT COLLEGE DATA\n';
        report += '='.repeat(100) + '\n\n';

        if (participantsWithoutCollege.length === 0) {
            report += '✅ All participants have college data!\n';
            console.log('✅ All participants have college data!');
        } else {
            participantsWithoutCollege.forEach((participant, index) => {
                const details = `
${index + 1}. User ID: ${participant.userId}
   Name: ${participant.name}
   Email: ${participant.email}
   Phone: ${participant.phone || 'N/A'}
   Gender: ${participant.gender || 'N/A'}
   Registration No: ${participant.registerId || 'N/A'}
   College: "${participant.college || 'MISSING'}"
   Amount: ₹${participant.amount || 0}
   Payment Status: ${participant.paymentStatus || 'N/A'}
   Events Registered: ${participant.registeredEvents?.length || 0}
${participant.registeredEvents && participant.registeredEvents.length > 0
                        ? `   Event Names: ${participant.registeredEvents.map(e => e.eventName).join(', ')}\n`
                        : ''}
${'-'.repeat(100)}
`;
                report += details;
                console.log(details);
            });

            const summary = `

=== SUMMARY ===
Total participants without college: ${participantsWithoutCollege.length}

Breakdown by Gender:
${Object.entries(participantsWithoutCollege.reduce((acc, p) => {
                const gender = p.gender || 'Unknown';
                acc[gender] = (acc[gender] || 0) + 1;
                return acc;
            }, {})).map(([gender, count]) => `  ${gender}: ${count}`).join('\n')}

User IDs without college (for easy copy-paste):
${participantsWithoutCollege.map(p => p.userId).join(', ')}
`;

            report += summary;
            console.log(summary);

            // Save to file
            fs.writeFileSync('participants_without_college.txt', report);
            console.log('\n✅ Report saved to: participants_without_college.txt');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

// Run the script
findParticipantsWithoutCollege();
