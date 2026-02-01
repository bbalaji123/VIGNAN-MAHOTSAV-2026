import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Participant from '../models/Participant.js';
import Registration from '../models/Registration.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

async function findRecordsWithoutRegisterId() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB\n');

        // Find participants without registerId
        const participantsWithoutRegisterId = await Participant.find({
            $or: [
                { registerId: { $exists: false } },
                { registerId: null },
                { registerId: '' }
            ]
        }).select('userId name email phone college gender registerId registeredEvents amount paymentStatus');

        // Find registrations without registerId
        const registrationsWithoutRegisterId = await Registration.find({
            $or: [
                { registerId: { $exists: false } },
                { registerId: null },
                { registerId: '' }
            ]
        }).select('userId name email phone college gender registerId');

        console.log(`Found ${participantsWithoutRegisterId.length} participants without registerId`);
        console.log(`Found ${registrationsWithoutRegisterId.length} registrations without registerId\n`);

        let report = '';
        report += '='.repeat(100) + '\n';
        report += 'RECORDS WITHOUT REGISTER ID\n';
        report += '='.repeat(100) + '\n\n';

        // Report Participants
        report += '-'.repeat(100) + '\n';
        report += 'PARTICIPANTS WITHOUT REGISTER ID\n';
        report += '-'.repeat(100) + '\n\n';

        if (participantsWithoutRegisterId.length === 0) {
            report += '✅ All participants have registerId!\n\n';
            console.log('✅ All participants have registerId!');
        } else {
            participantsWithoutRegisterId.forEach((participant, index) => {
                const details = `
${index + 1}. User ID: ${participant.userId}
   Name: ${participant.name}
   Email: ${participant.email}
   Phone: ${participant.phone || 'N/A'}
   Gender: ${participant.gender || 'N/A'}
   College: ${participant.college || 'N/A'}
   Register ID: ${participant.registerId || 'MISSING'}
   Amount: ₹${participant.amount || 0}
   Payment Status: ${participant.paymentStatus || 'N/A'}
   Events Registered: ${participant.registeredEvents?.length || 0}
${participant.registeredEvents && participant.registeredEvents.length > 0
                        ? `   Event Names: ${participant.registeredEvents.map(e => e.eventName).join(', ')}\n`
                        : ''}
`;
                report += details;
                console.log(details);
            });
        }

        // Report Registrations
        report += '\n' + '-'.repeat(100) + '\n';
        report += 'REGISTRATIONS WITHOUT REGISTER ID\n';
        report += '-'.repeat(100) + '\n\n';

        if (registrationsWithoutRegisterId.length === 0) {
            report += '✅ All registrations have registerId!\n\n';
            console.log('✅ All registrations have registerId!');
        } else {
            registrationsWithoutRegisterId.forEach((registration, index) => {
                const details = `
${index + 1}. User ID: ${registration.userId}
   Name: ${registration.name}
   Email: ${registration.email}
   Phone: ${registration.phone || 'N/A'}
   Gender: ${registration.gender || 'N/A'}
   College: ${registration.college || 'N/A'}
   Register ID: ${registration.registerId || 'MISSING'}
`;
                report += details;
                console.log(details);
            });
        }

        // Summary
        report += '\n' + '='.repeat(100) + '\n';
        report += 'SUMMARY\n';
        report += '='.repeat(100) + '\n';
        report += `Total Participants without registerId: ${participantsWithoutRegisterId.length}\n`;
        report += `Total Registrations without registerId: ${registrationsWithoutRegisterId.length}\n`;
        report += `Total Records without registerId: ${participantsWithoutRegisterId.length + registrationsWithoutRegisterId.length}\n`;
        report += '='.repeat(100) + '\n';

        console.log('\n' + '='.repeat(100));
        console.log('SUMMARY');
        console.log('='.repeat(100));
        console.log(`Total Participants without registerId: ${participantsWithoutRegisterId.length}`);
        console.log(`Total Registrations without registerId: ${registrationsWithoutRegisterId.length}`);
        console.log(`Total Records without registerId: ${participantsWithoutRegisterId.length + registrationsWithoutRegisterId.length}`);
        console.log('='.repeat(100));

        // Save report to file
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `records_without_registerId_${timestamp}.txt`;
        fs.writeFileSync(filename, report);
        console.log(`\n📄 Report saved to: ${filename}`);

        // Also save as JSON for easier processing
        const jsonFilename = `records_without_registerId_${timestamp}.json`;
        const jsonReport = {
            timestamp: new Date().toISOString(),
            participants: participantsWithoutRegisterId.map(p => ({
                userId: p.userId,
                name: p.name,
                email: p.email,
                phone: p.phone,
                college: p.college,
                gender: p.gender,
                registerId: p.registerId,
                amount: p.amount,
                paymentStatus: p.paymentStatus,
                eventsRegistered: p.registeredEvents?.length || 0,
                events: p.registeredEvents?.map(e => e.eventName) || []
            })),
            registrations: registrationsWithoutRegisterId.map(r => ({
                userId: r.userId,
                name: r.name,
                email: r.email,
                phone: r.phone,
                college: r.college,
                gender: r.gender,
                registerId: r.registerId
            })),
            summary: {
                totalParticipantsWithoutRegisterId: participantsWithoutRegisterId.length,
                totalRegistrationsWithoutRegisterId: registrationsWithoutRegisterId.length,
                totalRecordsWithoutRegisterId: participantsWithoutRegisterId.length + registrationsWithoutRegisterId.length
            }
        };

        fs.writeFileSync(jsonFilename, JSON.stringify(jsonReport, null, 2));
        console.log(`📄 JSON report saved to: ${jsonFilename}`);

    } catch (error) {
        console.error('Error finding records without registerId:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\nDatabase connection closed.');
    }
}

findRecordsWithoutRegisterId();
