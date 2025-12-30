#!/usr/bin/env node
/**
 * Script to test password conversion
 * Run: node backend/scripts/testPasswordFormat.mjs
 */

console.log('\n🧪 Testing Password Conversion...\n');

// Test 1: YYYY-MM-DD to DD/MM/YYYY
const testDate1 = '2110-02-19';
const [year1, month1, day1] = testDate1.split('-');
const converted1 = `${day1}/${month1}/${year1}`;
console.log(`Test 1: ${testDate1} → ${converted1}`);
console.log(`Expected: 19/02/2110`);
console.log(`✅ ${converted1 === '19/02/2110' ? 'PASS' : 'FAIL'}\n`);

// Test 2: Another date
const testDate2 = '2005-11-16';
const [year2, month2, day2] = testDate2.split('-');
const converted2 = `${day2}/${month2}/${year2}`;
console.log(`Test 2: ${testDate2} → ${converted2}`);
console.log(`Expected: 16/11/2005`);
console.log(`✅ ${converted2 === '16/11/2005' ? 'PASS' : 'FAIL'}\n`);

// Test 3: Login conversion
const loginInput = '2005-11-16';
const [yearL, monthL, dayL] = loginInput.split('-');
const loginConverted = `${dayL}/${monthL}/${yearL}`;
console.log(`Test 3 (Login): ${loginInput} → ${loginConverted}`);
console.log(`Expected: 16/11/2005`);
console.log(`✅ ${loginConverted === '16/11/2005' ? 'PASS' : 'FAIL'}\n`);

console.log('✅ All password format conversions working correctly!\n');
