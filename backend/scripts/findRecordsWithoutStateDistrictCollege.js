import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Participant from '../models/Participant.js';
import Registration from '../models/Registration.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

async function findRecordsWithMissingFields() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB\n');

        // Find participants with missing state, district, or college
        const participantsWithMissingState = await Participant.find({
            $or: [
                { state: { $exists: false } },
                { state: null },
                { state: '' }
            ]
        }).select('userId name email phone college state district registerId registeredEvents amount paymentStatus');

        const participantsWithMissingDistrict = await Participant.find({
            $or: [
                { district: { $exists: false } },
                { district: null },
                { district: '' }
            ]
        }).select('userId name email phone college state district registerId registeredEvents amount paymentStatus');

        const participantsWithMissingCollege = await Participant.find({
            $or: [
                { college: { $exists: false } },
                { college: null },
                { college: '' },
                { college: '""' }
            ]
        }).select('userId name email phone college state district registerId registeredEvents amount paymentStatus');

        // Find participants missing ALL three fields
        const participantsWithMissingAll = await Participant.find({
            $and: [
                {
                    $or: [
                        { state: { $exists: false } },
                        { state: null },
                        { state: '' }
                    ]
                },
                {
                    $or: [
                        { district: { $exists: false } },
                        { district: null },
                        { district: '' }
                    ]
                },
                {
                    $or: [
                        { college: { $exists: false } },
                        { college: null },
                        { college: '' },
                        { college: '""' }
                    ]
                }
            ]
        }).select('userId name email phone college state district registerId registeredEvents amount paymentStatus');

        // Find registrations with missing fields
        const registrationsWithMissingState = await Registration.find({
            $or: [
                { state: { $exists: false } },
                { state: null },
                { state: '' }
            ]
        }).select('userId name email phone college state district registerId');

        const registrationsWithMissingDistrict = await Registration.find({
            $or: [
                { district: { $exists: false } },
                { district: null },
                { district: '' }
            ]
        }).select('userId name email phone college state district registerId');

        const registrationsWithMissingCollege = await Registration.find({
            $or: [
                { college: { $exists: false } },
                { college: null },
                { college: '' },
                { college: '""' }
            ]
        }).select('userId name email phone college state district registerId');

        // Find registrations missing ALL three fields
        const registrationsWithMissingAll = await Registration.find({
            $and: [
                {
                    $or: [
                        { state: { $exists: false } },
                        { state: null },
                        { state: '' }
                    ]
                },
                {
                    $or: [
                        { district: { $exists: false } },
                        { district: null },
                        { district: '' }
                    ]
                },
                {
                    $or: [
                        { college: { $exists: false } },
                        { college: null },
                        { college: '' },
                        { college: '""' }
                    ]
                }
            ]
        }).select('userId name email phone college state district registerId');

        console.log('='.repeat(100));
        console.log('PARTICIPANTS - Missing Field Counts:');
        console.log('='.repeat(100));
        console.log(`Missing State: ${participantsWithMissingState.length}`);
        console.log(`Missing District: ${participantsWithMissingDistrict.length}`);
        console.log(`Missing College: ${participantsWithMissingCollege.length}`);
        console.log(`Missing ALL THREE: ${participantsWithMissingAll.length}`);
        console.log('');
        console.log('REGISTRATIONS - Missing Field Counts:');
        console.log('='.repeat(100));
        console.log(`Missing State: ${registrationsWithMissingState.length}`);
        console.log(`Missing District: ${registrationsWithMissingDistrict.length}`);
        console.log(`Missing College: ${registrationsWithMissingCollege.length}`);
        console.log(`Missing ALL THREE: ${registrationsWithMissingAll.length}\n`);

        let report = '';
        report += '='.repeat(100) + '\n';
        report += 'RECORDS WITH MISSING STATE, DISTRICT, OR COLLEGE DATA\n';
        report += '='.repeat(100) + '\n\n';

        // Report Participants missing ALL THREE fields
        report += '█'.repeat(100) + '\n';
        report += '🚨 PARTICIPANTS MISSING ALL THREE FIELDS (STATE, DISTRICT, COLLEGE)\n';
        report += '█'.repeat(100) + '\n\n';

        if (participantsWithMissingAll.length === 0) {
            report += '✅ No participants are missing all three fields!\n\n';
        } else {
            participantsWithMissingAll.forEach((participant, index) => {
                const details = `
${index + 1}. User ID: ${participant.userId}
   Name: ${participant.name}
   Email: ${participant.email}
   Phone: ${participant.phone || 'N/A'}
   Register ID: ${participant.registerId || 'MISSING'}
   ❌ State: ${participant.state || 'MISSING'}
   ❌ District: ${participant.district || 'MISSING'}
   ❌ College: ${participant.college || 'MISSING'}
   Amount: ₹${participant.amount || 0}
   Payment Status: ${participant.paymentStatus || 'N/A'}
   Events Registered: ${participant.registeredEvents?.length || 0}
${participant.registeredEvents && participant.registeredEvents.length > 0
                        ? `   Event Names: ${participant.registeredEvents.map(e => e.eventName).join(', ')}\n`
                        : ''}
`;
                report += details;
            });
        }

        // Report Registrations missing ALL THREE fields
        report += '\n' + '█'.repeat(100) + '\n';
        report += '🚨 REGISTRATIONS MISSING ALL THREE FIELDS (STATE, DISTRICT, COLLEGE)\n';
        report += '█'.repeat(100) + '\n\n';

        if (registrationsWithMissingAll.length === 0) {
            report += '✅ No registrations are missing all three fields!\n\n';
        } else {
            registrationsWithMissingAll.forEach((registration, index) => {
                const details = `
${index + 1}. User ID: ${registration.userId}
   Name: ${registration.name}
   Email: ${registration.email}
   Phone: ${registration.phone || 'N/A'}
   Register ID: ${registration.registerId || 'MISSING'}
   ❌ State: ${registration.state || 'MISSING'}
   ❌ District: ${registration.district || 'MISSING'}
   ❌ College: ${registration.college || 'MISSING'}
`;
                report += details;
            });
        }

        // Report Participants missing STATE
        report += '\n' + '-'.repeat(100) + '\n';
        report += 'PARTICIPANTS MISSING STATE\n';
        report += '-'.repeat(100) + '\n\n';

        if (participantsWithMissingState.length === 0) {
            report += '✅ All participants have state data!\n\n';
        } else {
            participantsWithMissingState.forEach((participant, index) => {
                const details = `
${index + 1}. User ID: ${participant.userId} | Name: ${participant.name}
   Email: ${participant.email} | Phone: ${participant.phone || 'N/A'}
   ❌ State: ${participant.state || 'MISSING'} | District: ${participant.district || 'N/A'} | College: ${participant.college || 'N/A'}
`;
                report += details;
            });
        }

        // Report Participants missing DISTRICT
        report += '\n' + '-'.repeat(100) + '\n';
        report += 'PARTICIPANTS MISSING DISTRICT\n';
        report += '-'.repeat(100) + '\n\n';

        if (participantsWithMissingDistrict.length === 0) {
            report += '✅ All participants have district data!\n\n';
        } else {
            participantsWithMissingDistrict.forEach((participant, index) => {
                const details = `
${index + 1}. User ID: ${participant.userId} | Name: ${participant.name}
   Email: ${participant.email} | Phone: ${participant.phone || 'N/A'}
   State: ${participant.state || 'N/A'} | ❌ District: ${participant.district || 'MISSING'} | College: ${participant.college || 'N/A'}
`;
                report += details;
            });
        }

        // Report Participants missing COLLEGE
        report += '\n' + '-'.repeat(100) + '\n';
        report += 'PARTICIPANTS MISSING COLLEGE\n';
        report += '-'.repeat(100) + '\n\n';

        if (participantsWithMissingCollege.length === 0) {
            report += '✅ All participants have college data!\n\n';
        } else {
            participantsWithMissingCollege.forEach((participant, index) => {
                const details = `
${index + 1}. User ID: ${participant.userId} | Name: ${participant.name}
   Email: ${participant.email} | Phone: ${participant.phone || 'N/A'}
   State: ${participant.state || 'N/A'} | District: ${participant.district || 'N/A'} | ❌ College: ${participant.college || 'MISSING'}
`;
                report += details;
            });
        }

        // Report Registrations missing STATE
        report += '\n' + '-'.repeat(100) + '\n';
        report += 'REGISTRATIONS MISSING STATE\n';
        report += '-'.repeat(100) + '\n\n';

        if (registrationsWithMissingState.length === 0) {
            report += '✅ All registrations have state data!\n\n';
        } else {
            registrationsWithMissingState.forEach((registration, index) => {
                const details = `
${index + 1}. User ID: ${registration.userId} | Name: ${registration.name}
   Email: ${registration.email} | Phone: ${registration.phone || 'N/A'}
   ❌ State: ${registration.state || 'MISSING'} | District: ${registration.district || 'N/A'} | College: ${registration.college || 'N/A'}
`;
                report += details;
            });
        }

        // Report Registrations missing DISTRICT
        report += '\n' + '-'.repeat(100) + '\n';
        report += 'REGISTRATIONS MISSING DISTRICT\n';
        report += '-'.repeat(100) + '\n\n';

        if (registrationsWithMissingDistrict.length === 0) {
            report += '✅ All registrations have district data!\n\n';
        } else {
            registrationsWithMissingDistrict.forEach((registration, index) => {
                const details = `
${index + 1}. User ID: ${registration.userId} | Name: ${registration.name}
   Email: ${registration.email} | Phone: ${registration.phone || 'N/A'}
   State: ${registration.state || 'N/A'} | ❌ District: ${registration.district || 'MISSING'} | College: ${registration.college || 'N/A'}
`;
                report += details;
            });
        }

        // Report Registrations missing COLLEGE
        report += '\n' + '-'.repeat(100) + '\n';
        report += 'REGISTRATIONS MISSING COLLEGE\n';
        report += '-'.repeat(100) + '\n\n';

        if (registrationsWithMissingCollege.length === 0) {
            report += '✅ All registrations have college data!\n\n';
        } else {
            registrationsWithMissingCollege.forEach((registration, index) => {
                const details = `
${index + 1}. User ID: ${registration.userId} | Name: ${registration.name}
   Email: ${registration.email} | Phone: ${registration.phone || 'N/A'}
   State: ${registration.state || 'N/A'} | District: ${registration.district || 'N/A'} | ❌ College: ${registration.college || 'MISSING'}
`;
                report += details;
            });
        }

        // Summary
        report += '\n' + '='.repeat(100) + '\n';
        report += 'SUMMARY\n';
        report += '='.repeat(100) + '\n\n';
        
        report += 'PARTICIPANTS:\n';
        report += `  Missing State: ${participantsWithMissingState.length}\n`;
        report += `  Missing District: ${participantsWithMissingDistrict.length}\n`;
        report += `  Missing College: ${participantsWithMissingCollege.length}\n`;
        report += `  Missing ALL THREE: ${participantsWithMissingAll.length}\n\n`;
        
        report += 'REGISTRATIONS:\n';
        report += `  Missing State: ${registrationsWithMissingState.length}\n`;
        report += `  Missing District: ${registrationsWithMissingDistrict.length}\n`;
        report += `  Missing College: ${registrationsWithMissingCollege.length}\n`;
        report += `  Missing ALL THREE: ${registrationsWithMissingAll.length}\n\n`;
        
        report += 'TOTAL:\n';
        report += `  Missing State: ${participantsWithMissingState.length + registrationsWithMissingState.length}\n`;
        report += `  Missing District: ${participantsWithMissingDistrict.length + registrationsWithMissingDistrict.length}\n`;
        report += `  Missing College: ${participantsWithMissingCollege.length + registrationsWithMissingCollege.length}\n`;
        report += `  Missing ALL THREE: ${participantsWithMissingAll.length + registrationsWithMissingAll.length}\n`;
        report += '='.repeat(100) + '\n';

        console.log('\n' + report);

        // Save report to file
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `missing_state_district_college_${timestamp}.txt`;
        fs.writeFileSync(filename, report);
        console.log(`\n📄 Report saved to: ${filename}`);

        // Save as JSON
        const jsonFilename = `missing_state_district_college_${timestamp}.json`;
        const jsonReport = {
            timestamp: new Date().toISOString(),
            participants: {
                missingState: participantsWithMissingState.map(p => ({
                    userId: p.userId,
                    name: p.name,
                    email: p.email,
                    phone: p.phone,
                    state: p.state,
                    district: p.district,
                    college: p.college,
                    registerId: p.registerId,
                    amount: p.amount,
                    paymentStatus: p.paymentStatus,
                    eventsCount: p.registeredEvents?.length || 0
                })),
                missingDistrict: participantsWithMissingDistrict.map(p => ({
                    userId: p.userId,
                    name: p.name,
                    email: p.email,
                    phone: p.phone,
                    state: p.state,
                    district: p.district,
                    college: p.college,
                    registerId: p.registerId,
                    amount: p.amount,
                    paymentStatus: p.paymentStatus,
                    eventsCount: p.registeredEvents?.length || 0
                })),
                missingCollege: participantsWithMissingCollege.map(p => ({
                    userId: p.userId,
                    name: p.name,
                    email: p.email,
                    phone: p.phone,
                    state: p.state,
                    district: p.district,
                    college: p.college,
                    registerId: p.registerId,
                    amount: p.amount,
                    paymentStatus: p.paymentStatus,
                    eventsCount: p.registeredEvents?.length || 0
                })),
                missingAll: participantsWithMissingAll.map(p => ({
                    userId: p.userId,
                    name: p.name,
                    email: p.email,
                    phone: p.phone,
                    state: p.state,
                    district: p.district,
                    college: p.college,
                    registerId: p.registerId,
                    amount: p.amount,
                    paymentStatus: p.paymentStatus,
                    eventsCount: p.registeredEvents?.length || 0
                }))
            },
            registrations: {
                missingState: registrationsWithMissingState.map(r => ({
                    userId: r.userId,
                    name: r.name,
                    email: r.email,
                    phone: r.phone,
                    state: r.state,
                    district: r.district,
                    college: r.college,
                    registerId: r.registerId
                })),
                missingDistrict: registrationsWithMissingDistrict.map(r => ({
                    userId: r.userId,
                    name: r.name,
                    email: r.email,
                    phone: r.phone,
                    state: r.state,
                    district: r.district,
                    college: r.college,
                    registerId: r.registerId
                })),
                missingCollege: registrationsWithMissingCollege.map(r => ({
                    userId: r.userId,
                    name: r.name,
                    email: r.email,
                    phone: r.phone,
                    state: r.state,
                    district: r.district,
                    college: r.college,
                    registerId: r.registerId
                })),
                missingAll: registrationsWithMissingAll.map(r => ({
                    userId: r.userId,
                    name: r.name,
                    email: r.email,
                    phone: r.phone,
                    state: r.state,
                    district: r.district,
                    college: r.college,
                    registerId: r.registerId
                }))
            },
            summary: {
                participants: {
                    missingState: participantsWithMissingState.length,
                    missingDistrict: participantsWithMissingDistrict.length,
                    missingCollege: participantsWithMissingCollege.length,
                    missingAll: participantsWithMissingAll.length
                },
                registrations: {
                    missingState: registrationsWithMissingState.length,
                    missingDistrict: registrationsWithMissingDistrict.length,
                    missingCollege: registrationsWithMissingCollege.length,
                    missingAll: registrationsWithMissingAll.length
                },
                total: {
                    missingState: participantsWithMissingState.length + registrationsWithMissingState.length,
                    missingDistrict: participantsWithMissingDistrict.length + registrationsWithMissingDistrict.length,
                    missingCollege: participantsWithMissingCollege.length + registrationsWithMissingCollege.length,
                    missingAll: participantsWithMissingAll.length + registrationsWithMissingAll.length
                }
            }
        };

        fs.writeFileSync(jsonFilename, JSON.stringify(jsonReport, null, 2));
        console.log(`📄 JSON report saved to: ${jsonFilename}`);

    } catch (error) {
        console.error('Error finding records with missing fields:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\nDatabase connection closed.');
    }
}

findRecordsWithMissingFields();
