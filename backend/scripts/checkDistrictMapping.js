import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const districtsPath = path.join(__dirname, '..', 'data', 'district.json');
const statesPath = path.join(__dirname, '..', 'data', 'state.json');

const districts = JSON.parse(fs.readFileSync(districtsPath, 'utf8'));
const states = JSON.parse(fs.readFileSync(statesPath, 'utf8'));

const snoSet = new Set(districts.map(d => d.sno));
const districtCounts = {};

districts.forEach(d => {
  districtCounts[d.sno] = (districtCounts[d.sno] || 0) + 1;
});

console.log('\n=== States with District Counts ===');
states.forEach(state => {
  const count = districtCounts[state.no] || 0;
  if (count === 0) {
    console.log(`❌ ${state.no}. ${state.name}: ${count} districts`);
  } else {
    console.log(`✓ ${state.no}. ${state.name}: ${count} districts`);
  }
});

console.log('\n=== Summary ===');
console.log(`Total states: ${states.length}`);
console.log(`States with districts: ${Object.keys(districtCounts).length}`);
console.log(`States without districts: ${states.length - Object.keys(districtCounts).length}`);
