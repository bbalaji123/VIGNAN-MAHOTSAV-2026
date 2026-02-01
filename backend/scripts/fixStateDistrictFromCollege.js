import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Participant from '../models/Participant.js';
import Registration from '../models/Registration.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

// Load college data
const collegeData = JSON.parse(fs.readFileSync('./data/college.json', 'utf8'));

// Create a map for faster lookups
const collegeMap = new Map();
collegeData.forEach(college => {
    const normalizedName = college.Name.toLowerCase().trim();
    collegeMap.set(normalizedName, {
        state: college.State,
        district: college.District
    });
});

console.log(`Loaded ${collegeMap.size} colleges from database\n`);

function findCollegeInfo(collegeName) {
    if (!collegeName || collegeName === '""' || collegeName.trim() === '') {
        return null;
    }

    const normalized = collegeName.toLowerCase().trim();
    
    // Exact match
    if (collegeMap.has(normalized)) {
        return collegeMap.get(normalized);
    }

    // Partial match - find if college name contains or is contained in any entry
    for (const [key, value] of collegeMap.entries()) {
        if (key.includes(normalized) || normalized.includes(key)) {
            return value;
        }
    }

    return null;
}

async function fixStateDistrictFromCollege() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB\n');

        let participantsFixed = 0;
        let participantsFailed = 0;
        let registrationsFixed = 0;
        let registrationsFailed = 0;

        const fixReport = [];

        // Fix Participants with missing state/district but have college
        const participantsNeedingFix = await Participant.find({
            college: { $exists: true, $ne: '', $ne: null, $ne: '""' },
            $or: [
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
                }
            ]
        });

        console.log(`Found ${participantsNeedingFix.length} participants with college but missing state/district\n`);
        console.log('Processing participants...\n');

        for (const participant of participantsNeedingFix) {
            const collegeInfo = findCollegeInfo(participant.college);
            
            if (collegeInfo) {
                const updates = {};
                const changes = [];

                if (!participant.state || participant.state === '') {
                    updates.state = collegeInfo.state;
                    changes.push(`State: ${collegeInfo.state}`);
                }

                if (!participant.district || participant.district === '') {
                    updates.district = collegeInfo.district;
                    changes.push(`District: ${collegeInfo.district}`);
                }

                if (Object.keys(updates).length > 0) {
                    await Participant.updateOne(
                        { _id: participant._id },
                        { $set: updates }
                    );

                    participantsFixed++;
                    const report = {
                        type: 'Participant',
                        userId: participant.userId,
                        name: participant.name,
                        email: participant.email,
                        college: participant.college,
                        changes: changes.join(', '),
                        status: 'FIXED'
                    };
                    fixReport.push(report);
                    
                    console.log(`✅ Fixed Participant ${participant.userId} (${participant.name})`);
                    console.log(`   College: ${participant.college}`);
                    console.log(`   Updated: ${changes.join(', ')}\n`);
                }
            } else {
                participantsFailed++;
                const report = {
                    type: 'Participant',
                    userId: participant.userId,
                    name: participant.name,
                    email: participant.email,
                    college: participant.college,
                    changes: 'College not found in database',
                    status: 'FAILED'
                };
                fixReport.push(report);
                
                console.log(`❌ Could not fix Participant ${participant.userId} (${participant.name})`);
                console.log(`   College not found: ${participant.college}\n`);
            }
        }

        // Fix Registrations with missing state/district but have college
        const registrationsNeedingFix = await Registration.find({
            college: { $exists: true, $ne: '', $ne: null, $ne: '""' },
            $or: [
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
                }
            ]
        });

        console.log(`\nFound ${registrationsNeedingFix.length} registrations with college but missing state/district\n`);
        console.log('Processing registrations...\n');

        for (const registration of registrationsNeedingFix) {
            const collegeInfo = findCollegeInfo(registration.college);
            
            if (collegeInfo) {
                const updates = {};
                const changes = [];

                if (!registration.state || registration.state === '') {
                    updates.state = collegeInfo.state;
                    changes.push(`State: ${collegeInfo.state}`);
                }

                if (!registration.district || registration.district === '') {
                    updates.district = collegeInfo.district;
                    changes.push(`District: ${collegeInfo.district}`);
                }

                if (Object.keys(updates).length > 0) {
                    await Registration.updateOne(
                        { _id: registration._id },
                        { $set: updates }
                    );

                    registrationsFixed++;
                    const report = {
                        type: 'Registration',
                        userId: registration.userId,
                        name: registration.name,
                        email: registration.email,
                        college: registration.college,
                        changes: changes.join(', '),
                        status: 'FIXED'
                    };
                    fixReport.push(report);
                    
                    console.log(`✅ Fixed Registration ${registration.userId} (${registration.name})`);
                    console.log(`   College: ${registration.college}`);
                    console.log(`   Updated: ${changes.join(', ')}\n`);
                }
            } else {
                registrationsFailed++;
                const report = {
                    type: 'Registration',
                    userId: registration.userId,
                    name: registration.name,
                    email: registration.email,
                    college: registration.college,
                    changes: 'College not found in database',
                    status: 'FAILED'
                };
                fixReport.push(report);
                
                console.log(`❌ Could not fix Registration ${registration.userId} (${registration.name})`);
                console.log(`   College not found: ${registration.college}\n`);
            }
        }

        // Generate Summary Report
        console.log('\n' + '='.repeat(100));
        console.log('SUMMARY');
        console.log('='.repeat(100));
        console.log(`Participants Fixed: ${participantsFixed}`);
        console.log(`Participants Failed: ${participantsFailed}`);
        console.log(`Registrations Fixed: ${registrationsFixed}`);
        console.log(`Registrations Failed: ${registrationsFailed}`);
        console.log(`Total Fixed: ${participantsFixed + registrationsFixed}`);
        console.log(`Total Failed: ${participantsFailed + registrationsFailed}`);
        console.log('='.repeat(100));

        // Save detailed report
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        // Text report
        let textReport = '';
        textReport += '='.repeat(100) + '\n';
        textReport += 'STATE AND DISTRICT FIX REPORT\n';
        textReport += '='.repeat(100) + '\n\n';

        textReport += 'SUCCESSFULLY FIXED:\n';
        textReport += '-'.repeat(100) + '\n';
        const fixed = fixReport.filter(r => r.status === 'FIXED');
        fixed.forEach((item, index) => {
            textReport += `\n${index + 1}. [${item.type}] ${item.name} (${item.userId})\n`;
            textReport += `   Email: ${item.email}\n`;
            textReport += `   College: ${item.college}\n`;
            textReport += `   ✅ ${item.changes}\n`;
        });

        textReport += '\n\nFAILED TO FIX:\n';
        textReport += '-'.repeat(100) + '\n';
        const failed = fixReport.filter(r => r.status === 'FAILED');
        failed.forEach((item, index) => {
            textReport += `\n${index + 1}. [${item.type}] ${item.name} (${item.userId})\n`;
            textReport += `   Email: ${item.email}\n`;
            textReport += `   College: ${item.college}\n`;
            textReport += `   ❌ ${item.changes}\n`;
        });

        textReport += '\n\n' + '='.repeat(100) + '\n';
        textReport += 'SUMMARY\n';
        textReport += '='.repeat(100) + '\n';
        textReport += `Participants Fixed: ${participantsFixed}\n`;
        textReport += `Participants Failed: ${participantsFailed}\n`;
        textReport += `Registrations Fixed: ${registrationsFixed}\n`;
        textReport += `Registrations Failed: ${registrationsFailed}\n`;
        textReport += `Total Fixed: ${participantsFixed + registrationsFixed}\n`;
        textReport += `Total Failed: ${participantsFailed + registrationsFailed}\n`;
        textReport += '='.repeat(100) + '\n';

        const textFilename = `fix_state_district_report_${timestamp}.txt`;
        fs.writeFileSync(textFilename, textReport);
        console.log(`\n📄 Text report saved to: ${textFilename}`);

        // JSON report
        const jsonReport = {
            timestamp: new Date().toISOString(),
            summary: {
                participantsFixed,
                participantsFailed,
                registrationsFixed,
                registrationsFailed,
                totalFixed: participantsFixed + registrationsFixed,
                totalFailed: participantsFailed + registrationsFailed
            },
            details: fixReport
        };

        const jsonFilename = `fix_state_district_report_${timestamp}.json`;
        fs.writeFileSync(jsonFilename, JSON.stringify(jsonReport, null, 2));
        console.log(`📄 JSON report saved to: ${jsonFilename}`);

    } catch (error) {
        console.error('Error fixing state and district:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\nDatabase connection closed.');
    }
}

fixStateDistrictFromCollege();
