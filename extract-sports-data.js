import XLSX from 'xlsx';

// Read the Excel file
const workbook = XLSX.readFile('./public/sports.xlsx');
const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

// Try reading with header: 1 to get raw array data
const rawData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

const sportsEvents = [];
let currentDay = '';
let currentDate = '';

for (let i = 0; i < rawData.length; i++) {
  const row = rawData[i];
  
  // Skip empty rows
  if (!row || row.length === 0 || !row[0]) continue;
  
  // Check if this is a day header (e.g., "DAY 1  ( 5 Feb 2026 )")
  if (typeof row[0] === 'string' && row[0].includes('DAY') && row[0].includes('Feb 2026')) {
    const match = row[0].match(/(\d+)\s+Feb\s+2026/);
    if (match) {
      currentDate = `${match[1].padStart(2, '0')}.02.2026`;
      currentDay = row[0];
      continue;
    }
  }
  
  // Skip header rows
  if (row[0] === 'Timings' || row[0] === 'Event') continue;
  
  // Parse event rows - assuming format: Timings, Event (and possibly Venue)
  if (row.length >= 2 && currentDate) {
    const timings = String(row[0]).trim();
    const eventName = String(row[1]).trim();
    const venue = row[2] ? String(row[2]).trim() : '';
    
    // Skip if it looks like a header or empty
    if (!timings || !eventName || timings === 'Timings' || eventName === 'Event') continue;
    
    sportsEvents.push({
      category: 'Sports',
      event: eventName,
      day: currentDate,
      time: timings,
      venue: venue || 'Sports Ground'
    });
  }
}

console.log('Total Sports Events Found:', sportsEvents.length);
console.log('\n\nTypeScript format for scheduleData.ts:');
console.log('===================\n');

sportsEvents.forEach(event => {
  console.log(`  { category: "Sports", event: "${event.event}", day: "${event.day}", time: "${event.time}", venue: "${event.venue}" },`);
});

console.log('\n===================');
console.log('Copy the above lines and paste them into scheduleData.ts');
