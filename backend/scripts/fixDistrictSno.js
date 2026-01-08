import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the district.json file
const districtFilePath = path.join(__dirname, '..', 'data', 'district.json');
const districts = JSON.parse(fs.readFileSync(districtFilePath, 'utf8'));

// Update all sno values by incrementing them by 1
const updatedDistricts = districts.map(district => ({
  ...district,
  sno: String(parseInt(district.sno) + 1)
}));

// Write back to the file
fs.writeFileSync(districtFilePath, JSON.stringify(updatedDistricts, null, '\t'));

console.log('Successfully updated all district sno values!');
console.log(`Total districts updated: ${updatedDistricts.length}`);
