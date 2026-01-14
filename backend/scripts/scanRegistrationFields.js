import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Registration from '../models/Registration.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

async function scanRegistrationFields() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB\n');

        // Get all registrations
        const registrations = await Registration.find({});
        console.log(`Found ${registrations.length} registrations to scan\n`);

        // Define all expected fields
        const fields = [
            'userId',
            'name',
            'email',
            'password',
            'phone',
            'college',
            'branch',
            'dateOfBirth',
            'gender',
            'registerId',
            'userType',
            'participationType',
            'paymentStatus',
            'referredBy',
            'state',
            'district'
        ];

        // Track missing fields
        const missingFieldsReport = {};
        const usersWithMissingFields = [];

        registrations.forEach(reg => {
            const userMissingFields = [];

            fields.forEach(field => {
                const value = reg[field];
                const isEmpty = value === undefined ||
                    value === null ||
                    value === '' ||
                    value === '""' ||
                    (typeof value === 'string' && value.trim() === '');

                if (isEmpty) {
                    userMissingFields.push(field);

                    if (!missingFieldsReport[field]) {
                        missingFieldsReport[field] = {
                            count: 0,
                            users: []
                        };
                    }
                    missingFieldsReport[field].count++;
                    missingFieldsReport[field].users.push({
                        userId: reg.userId,
                        name: reg.name,
                        email: reg.email
                    });
                }
            });

            if (userMissingFields.length > 0) {
                usersWithMissingFields.push({
                    userId: reg.userId,
                    name: reg.name,
                    email: reg.email,
                    phone: reg.phone,
                    college: reg.college,
                    missingFields: userMissingFields
                });
            }
        });

        // Generate report
        let report = '';
        report += '='.repeat(120) + '\n';
        report += 'REGISTRATION COLLECTION - MISSING FIELDS ANALYSIS\n';
        report += '='.repeat(120) + '\n\n';

        // Summary by field
        report += '### SUMMARY BY FIELD ###\n\n';
        const sortedFields = Object.entries(missingFieldsReport).sort((a, b) => b[1].count - a[1].count);

        if (sortedFields.length === 0) {
            report += '✅ All fields are filled for all registrations!\n\n';
            console.log('✅ All fields are filled for all registrations!');
        } else {
            sortedFields.forEach(([field, data]) => {
                const percentage = ((data.count / registrations.length) * 100).toFixed(2);
                const line = `${field.padEnd(20)} : ${data.count.toString().padStart(4)} missing (${percentage}%)\n`;
                report += line;
                console.log(line.trim());
            });

            // Detailed breakdown
            report += '\n' + '='.repeat(120) + '\n';
            report += '### DETAILED BREAKDOWN BY FIELD ###\n';
            report += '='.repeat(120) + '\n\n';

            sortedFields.forEach(([field, data]) => {
                report += `\n--- ${field.toUpperCase()} (${data.count} missing) ---\n`;
                data.users.forEach((user, index) => {
                    report += `${(index + 1).toString().padStart(3)}. ${user.userId} - ${user.name} (${user.email})\n`;
                });
                report += '\n';
            });

            // Users with multiple missing fields
            report += '\n' + '='.repeat(120) + '\n';
            report += '### USERS WITH MISSING FIELDS ###\n';
            report += '='.repeat(120) + '\n\n';

            const sortedUsers = usersWithMissingFields.sort((a, b) => b.missingFields.length - a.missingFields.length);

            sortedUsers.forEach((user, index) => {
                report += `${index + 1}. User ID: ${user.userId}\n`;
                report += `   Name: ${user.name}\n`;
                report += `   Email: ${user.email}\n`;
                report += `   Phone: ${user.phone || 'MISSING'}\n`;
                report += `   College: ${user.college || 'MISSING'}\n`;
                report += `   Missing Fields (${user.missingFields.length}): ${user.missingFields.join(', ')}\n`;
                report += '-'.repeat(120) + '\n';
            });

            // Final summary
            report += '\n' + '='.repeat(120) + '\n';
            report += '### FINAL SUMMARY ###\n';
            report += '='.repeat(120) + '\n\n';
            report += `Total Registrations: ${registrations.length}\n`;
            report += `Users with at least one missing field: ${usersWithMissingFields.length}\n`;
            report += `Users with complete data: ${registrations.length - usersWithMissingFields.length}\n\n`;

            report += 'Most commonly missing fields:\n';
            sortedFields.slice(0, 5).forEach(([field, data], index) => {
                const percentage = ((data.count / registrations.length) * 100).toFixed(2);
                report += `  ${index + 1}. ${field}: ${data.count} (${percentage}%)\n`;
            });

            console.log('\n' + '='.repeat(120));
            console.log('FINAL SUMMARY');
            console.log('='.repeat(120));
            console.log(`Total Registrations: ${registrations.length}`);
            console.log(`Users with at least one missing field: ${usersWithMissingFields.length}`);
            console.log(`Users with complete data: ${registrations.length - usersWithMissingFields.length}`);
        }

        // Save to file
        fs.writeFileSync('registration_missing_fields_report.txt', report);
        console.log('\n✅ Report saved to: registration_missing_fields_report.txt');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

// Run the script
scanRegistrationFields();
