import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadColleges() {
  const dataDir = path.join(__dirname, '../data');
  const collegesPath = path.join(dataDir, 'college.json');
  const raw = await fs.readFile(collegesPath, 'utf-8');
  const json = JSON.parse(raw);
  // Filter valid entries
  return json.filter(c => c && c.Name && c.State && c.District);
}

function normalize(str) {
  // Keep original string; only trim spaces for consistency
  return String(str).trim();
}

function extractStatesAndDistricts(colleges) {
  const stateSet = new Map(); // key: stateKey(lower), value: original state
  const districtsByState = new Map(); // key: stateKey(lower), value: Map(districtKey -> original district)

  for (const c of colleges) {
    const stateOrig = normalize(c.State);
    const districtOrig = normalize(c.District);
    const stateKey = stateOrig.toLowerCase();
    const districtKey = districtOrig.toLowerCase();

    if (!stateSet.has(stateKey)) {
      stateSet.set(stateKey, stateOrig);
    }

    if (!districtsByState.has(stateKey)) {
      districtsByState.set(stateKey, new Map());
    }
    const dMap = districtsByState.get(stateKey);
    if (!dMap.has(districtKey)) {
      dMap.set(districtKey, districtOrig);
    }
  }

  // Sort states alphabetically by display name
  const sortedStates = Array.from(stateSet.values()).sort((a, b) => a.localeCompare(b));

  // Assign state numbers (as strings starting from 1)
  const stateNoByKey = new Map();
  const states = [];
  sortedStates.forEach((stateName, idx) => {
    const no = String(idx + 1);
    states.push({ no, name: stateName });
    stateNoByKey.set(stateName.toLowerCase(), no);
  });

  // Build districts list, sorted within each state
  const districts = [];
  let districtCounter = 1;
  sortedStates.forEach((stateName) => {
    const sKey = stateName.toLowerCase();
    const sno = stateNoByKey.get(sKey);
    const dMap = districtsByState.get(sKey) || new Map();
    const sortedDistricts = Array.from(dMap.values()).sort((a, b) => a.localeCompare(b));
    sortedDistricts.forEach((districtName) => {
      districts.push({ no: String(districtCounter++), sno, name: districtName });
    });
  });

  return { states, districts };
}

async function writeOutput(states, districts) {
  const dataDir = path.join(__dirname, '../data');
  const statePath = path.join(dataDir, 'state.json');
  const districtPath = path.join(dataDir, 'district.json');

  // Pretty print JSON with 2-space indentation
  await fs.writeFile(statePath, JSON.stringify(states, null, 2) + '\n', 'utf-8');
  await fs.writeFile(districtPath, JSON.stringify(districts, null, 2) + '\n', 'utf-8');
}

async function main() {
  console.time('generate-locations');
  try {
    const colleges = await loadColleges();
    console.log(`Loaded colleges: ${colleges.length}`);
    const { states, districts } = extractStatesAndDistricts(colleges);
    console.log(`Unique states: ${states.length}`);
    console.log(`Unique districts: ${districts.length}`);
    await writeOutput(states, districts);
    console.log('Wrote state.json and district.json from college.json');
    console.timeEnd('generate-locations');
  } catch (err) {
    console.error('Error generating locations:', err);
    process.exitCode = 1;
  }
}

main();
