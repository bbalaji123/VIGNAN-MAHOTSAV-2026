import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Registration from '../models/Registration.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

async function autoPopulateStateDistrict() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB\n');

        // Load college data
        const collegeData = JSON.parse(fs.readFileSync('./data/college.json', 'utf8'));
        console.log(`Loaded ${collegeData.length} colleges from database\n`);

        // Create a map for faster lookup (case-insensitive)
        const collegeMap = new Map();
        collegeData.forEach(college => {
            const key = college.Name.toLowerCase().trim();
            collegeMap.set(key, {
                state: college.State,
                district: college.District
            });
        });

        // Find users with missing state or district
        const usersWithMissingLocation = await Registration.find({
            $or: [
                { state: { $exists: false } },
                { state: null },
                { state: '' },
                { district: { $exists: false } },
                { district: null },
                { district: '' }
            ]
        });

        console.log(`Found ${usersWithMissingLocation.length} users with missing state/district\n`);

        let updated = 0;
        let notFound = 0;
        let skipped = 0;
        const notFoundColleges = new Set();

        for (const user of usersWithMissingLocation) {
            if (!user.college || user.college.trim() === '') {
                skipped++;
                console.log(`⚠️  Skipped ${user.userId} (${user.name}): No college data`);
                continue;
            }

            const collegeName = user.college.toLowerCase().trim();

            // Try exact match first
            let location = collegeMap.get(collegeName);

            // If not found, try partial match
            if (!location) {
                for (const [key, value] of collegeMap.entries()) {
                    if (key.includes(collegeName) || collegeName.includes(key)) {
                        location = value;
                        break;
                    }
                }
            }

            if (location) {
                user.state = location.state;
                user.district = location.district;
                await user.save();
                updated++;
                console.log(`✅ Updated ${user.userId} (${user.name}): ${location.state}, ${location.district}`);
            } else {
                notFound++;
                notFoundColleges.add(user.college);
                console.log(`❌ Not found ${user.userId} (${user.name}): College "${user.college}"`);
            }
        }

        console.log('\n' + '='.repeat(100));
        console.log('MIGRATION SUMMARY');
        console.log('='.repeat(100));
        console.log(`Total users with missing location: ${usersWithMissingLocation.length}`);
        console.log(`✅ Successfully updated: ${updated}`);
        console.log(`❌ College not found: ${notFound}`);
        console.log(`⚠️  Skipped (no college): ${skipped}`);

        if (notFoundColleges.size > 0) {
            console.log('\n' + '='.repeat(100));
            console.log('COLLEGES NOT FOUND IN DATABASE:');
            console.log('='.repeat(100));
            Array.from(notFoundColleges).forEach((college, index) => {
                console.log(`${index + 1}. ${college}`);
            });
        }

        // Save report
        const report = {
            timestamp: new Date().toISOString(),
            total: usersWithMissingLocation.length,
            updated,
            notFound,
            skipped,
            notFoundColleges: Array.from(notFoundColleges)
        };

        fs.writeFileSync('state_district_migration_report.json', JSON.stringify(report, null, 2));
        console.log('\n✅ Report saved to: state_district_migration_report.json');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

// Run the script
autoPopulateStateDistrict();
