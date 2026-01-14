import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Registration from '../models/Registration.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mahotsav';

async function findCriticalMissingFields() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB\n');

        const isEmpty = (value) => {
            return value === undefined ||
                value === null ||
                value === '' ||
                value === '""' ||
                (typeof value === 'string' && value.trim() === '');
        };

        // Find users with missing critical fields
        const allRegistrations = await Registration.find({});

        const criticalIssues = {
            missingCollege: [],
            missingGender: [],
            missingStateDistrict: [],
            missingRegisterId: [],
            missingBranch: []
        };

        allRegistrations.forEach(reg => {
            const user = {
                userId: reg.userId,
                name: reg.name,
                email: reg.email,
                phone: reg.phone,
                college: reg.college,
                branch: reg.branch,
                gender: reg.gender,
                registerId: reg.registerId,
                state: reg.state,
                district: reg.district
            };

            if (isEmpty(reg.college)) {
                criticalIssues.missingCollege.push(user);
            }
            if (isEmpty(reg.gender)) {
                criticalIssues.missingGender.push(user);
            }
            if (isEmpty(reg.state) || isEmpty(reg.district)) {
                criticalIssues.missingStateDistrict.push(user);
            }
            if (isEmpty(reg.registerId)) {
                criticalIssues.missingRegisterId.push(user);
            }
            if (isEmpty(reg.branch)) {
                criticalIssues.missingBranch.push(user);
            }
        });

        let report = '';
        report += '='.repeat(120) + '\n';
        report += 'CRITICAL MISSING FIELDS - IMMEDIATE ACTION REQUIRED\n';
        report += '='.repeat(120) + '\n\n';

        // HIGH PRIORITY
        report += '🔴 HIGH PRIORITY\n';
        report += '='.repeat(120) + '\n\n';

        // Missing College
        report += `1. MISSING COLLEGE (${criticalIssues.missingCollege.length} users)\n`;
        report += '-'.repeat(120) + '\n';
        if (criticalIssues.missingCollege.length > 0) {
            criticalIssues.missingCollege.forEach((user, index) => {
                report += `${(index + 1).toString().padStart(3)}. ${user.userId} | ${user.name.padEnd(30)} | ${user.email.padEnd(40)} | ${user.phone || 'N/A'}\n`;
            });
            report += '\nUser IDs: ' + criticalIssues.missingCollege.map(u => u.userId).join(', ') + '\n';
        } else {
            report += '✅ All users have college information\n';
        }
        report += '\n';

        // Missing Gender
        report += `2. MISSING GENDER (${criticalIssues.missingGender.length} users)\n`;
        report += '-'.repeat(120) + '\n';
        if (criticalIssues.missingGender.length > 0) {
            criticalIssues.missingGender.forEach((user, index) => {
                report += `${(index + 1).toString().padStart(3)}. ${user.userId} | ${user.name.padEnd(30)} | ${user.email.padEnd(40)} | ${user.phone || 'N/A'}\n`;
            });
            report += '\nUser IDs: ' + criticalIssues.missingGender.map(u => u.userId).join(', ') + '\n';
        } else {
            report += '✅ All users have gender information\n';
        }
        report += '\n';

        // Missing State/District
        report += `3. MISSING STATE/DISTRICT (${criticalIssues.missingStateDistrict.length} users)\n`;
        report += '-'.repeat(120) + '\n';
        if (criticalIssues.missingStateDistrict.length > 0) {
            criticalIssues.missingStateDistrict.slice(0, 50).forEach((user, index) => {
                const stateInfo = `State: ${user.state || 'MISSING'} | District: ${user.district || 'MISSING'}`;
                report += `${(index + 1).toString().padStart(3)}. ${user.userId} | ${user.name.padEnd(30)} | ${stateInfo}\n`;
            });
            if (criticalIssues.missingStateDistrict.length > 50) {
                report += `\n... and ${criticalIssues.missingStateDistrict.length - 50} more users\n`;
            }
            report += '\nFirst 20 User IDs: ' + criticalIssues.missingStateDistrict.slice(0, 20).map(u => u.userId).join(', ') + '\n';
        } else {
            report += '✅ All users have state/district information\n';
        }
        report += '\n';

        // MEDIUM PRIORITY
        report += '\n' + '='.repeat(120) + '\n';
        report += '🟡 MEDIUM PRIORITY\n';
        report += '='.repeat(120) + '\n\n';

        // Missing Registration ID
        report += `4. MISSING REGISTRATION ID (${criticalIssues.missingRegisterId.length} users)\n`;
        report += '-'.repeat(120) + '\n';
        if (criticalIssues.missingRegisterId.length > 0) {
            criticalIssues.missingRegisterId.forEach((user, index) => {
                report += `${(index + 1).toString().padStart(3)}. ${user.userId} | ${user.name.padEnd(30)} | ${user.email.padEnd(40)} | ${user.college || 'N/A'}\n`;
            });
            report += '\nUser IDs: ' + criticalIssues.missingRegisterId.map(u => u.userId).join(', ') + '\n';
        } else {
            report += '✅ All users have registration ID\n';
        }
        report += '\n';

        // Missing Branch
        report += `5. MISSING BRANCH (${criticalIssues.missingBranch.length} users)\n`;
        report += '-'.repeat(120) + '\n';
        if (criticalIssues.missingBranch.length > 0) {
            criticalIssues.missingBranch.forEach((user, index) => {
                report += `${(index + 1).toString().padStart(3)}. ${user.userId} | ${user.name.padEnd(30)} | ${user.email.padEnd(40)} | ${user.college || 'N/A'}\n`;
            });
            report += '\nUser IDs: ' + criticalIssues.missingBranch.map(u => u.userId).join(', ') + '\n';
        } else {
            report += '✅ All users have branch information\n';
        }
        report += '\n';

        // SUMMARY
        report += '\n' + '='.repeat(120) + '\n';
        report += 'SUMMARY\n';
        report += '='.repeat(120) + '\n\n';
        report += `Total Registrations: ${allRegistrations.length}\n\n`;
        report += '🔴 HIGH PRIORITY:\n';
        report += `  - Missing College: ${criticalIssues.missingCollege.length} users\n`;
        report += `  - Missing Gender: ${criticalIssues.missingGender.length} users\n`;
        report += `  - Missing State/District: ${criticalIssues.missingStateDistrict.length} users\n\n`;
        report += '🟡 MEDIUM PRIORITY:\n';
        report += `  - Missing Registration ID: ${criticalIssues.missingRegisterId.length} users\n`;
        report += `  - Missing Branch: ${criticalIssues.missingBranch.length} users\n`;

        // Console output
        console.log('🔴 HIGH PRIORITY:');
        console.log(`  - Missing College: ${criticalIssues.missingCollege.length} users`);
        console.log(`  - Missing Gender: ${criticalIssues.missingGender.length} users`);
        console.log(`  - Missing State/District: ${criticalIssues.missingStateDistrict.length} users`);
        console.log('\n🟡 MEDIUM PRIORITY:');
        console.log(`  - Missing Registration ID: ${criticalIssues.missingRegisterId.length} users`);
        console.log(`  - Missing Branch: ${criticalIssues.missingBranch.length} users`);

        // Save to file
        fs.writeFileSync('critical_missing_fields.txt', report);
        console.log('\n✅ Report saved to: critical_missing_fields.txt');

        // Also create CSV for easy import
        let csv = 'Priority,Issue,UserID,Name,Email,Phone,College,Branch,Gender,RegistrationID,State,District\n';

        criticalIssues.missingCollege.forEach(u => {
            csv += `HIGH,Missing College,${u.userId},"${u.name}",${u.email},${u.phone || ''},${u.college || ''},${u.branch || ''},${u.gender || ''},${u.registerId || ''},${u.state || ''},${u.district || ''}\n`;
        });

        criticalIssues.missingGender.forEach(u => {
            csv += `HIGH,Missing Gender,${u.userId},"${u.name}",${u.email},${u.phone || ''},${u.college || ''},${u.branch || ''},${u.gender || ''},${u.registerId || ''},${u.state || ''},${u.district || ''}\n`;
        });

        criticalIssues.missingStateDistrict.forEach(u => {
            csv += `HIGH,Missing State/District,${u.userId},"${u.name}",${u.email},${u.phone || ''},${u.college || ''},${u.branch || ''},${u.gender || ''},${u.registerId || ''},${u.state || ''},${u.district || ''}\n`;
        });

        criticalIssues.missingRegisterId.forEach(u => {
            csv += `MEDIUM,Missing Registration ID,${u.userId},"${u.name}",${u.email},${u.phone || ''},${u.college || ''},${u.branch || ''},${u.gender || ''},${u.registerId || ''},${u.state || ''},${u.district || ''}\n`;
        });

        criticalIssues.missingBranch.forEach(u => {
            csv += `MEDIUM,Missing Branch,${u.userId},"${u.name}",${u.email},${u.phone || ''},${u.college || ''},${u.branch || ''},${u.gender || ''},${u.registerId || ''},${u.state || ''},${u.district || ''}\n`;
        });

        fs.writeFileSync('critical_missing_fields.csv', csv);
        console.log('✅ CSV saved to: critical_missing_fields.csv');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

// Run the script
findCriticalMissingFields();
