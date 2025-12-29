import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api';
const TEST_RUN_ID = Date.now(); // Unique ID per test run to avoid email conflicts

async function runBatch(batchNumber, batchSize, offset) {
  const requests = [];

  for (let i = 0; i < batchSize; i++) {
    const idx = offset + i;
    const body = {
      name: `LoadTestUser${batchNumber}-${idx}`,
      email: `loadtest${TEST_RUN_ID}-${batchNumber}-${idx}@example.com`,
      password: 'Test@123',
      phone: `9000000${String(idx).padStart(3, '0')}`,
      college: 'Test College',
      branch: 'CSE',
      dateOfBirth: '2000-01-01',
      gender: 'Male',
      registerId: '',
      userType: 'participant',
      participationType: 'general'
    };

    requests.push(
      fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(async r => {
          const json = await r.json().catch(() => ({}));
          return { status: r.status, ...json };
        })
        .catch(err => ({ error: err.message }))
    );
  }

  const results = await Promise.all(requests);

  const ids = results
    .map(r => r?.data?.userId)
    .filter(Boolean);

  console.log(`\n===== Batch ${batchNumber} (size ${batchSize}) =====`);
  console.log('Total successful registrations:', ids.length);

  const unique = new Set(ids);
  console.log('Unique IDs count:', unique.size);
  console.log('Has duplicates in this batch?', unique.size !== ids.length);

  const failed = results.filter(r => !r?.success);
  if (failed.length) {
    console.log(`Failed requests in batch ${batchNumber}:`, failed.length);
    console.log('Sample errors:', failed.slice(0, 3));
  }

  return { ids, results };
}

async function main() {
  // Configure a very heavy test: 100,000 signups total in batches of 1000
  const totalBatches = 100;    // 100 batches
  const batchSize = 1000;      // 1,000 users per batch = 100,000 total

  let allIds = [];
  
  console.log(`\n🚀 Starting load test: ${totalBatches * batchSize} total users in ${totalBatches} batches of ${batchSize}\n`);

  for (let b = 1; b <= totalBatches; b++) {
    const { ids } = await runBatch(b, batchSize, (b - 1) * batchSize);
    allIds = allIds.concat(ids);
    
    // Progress update every 10 batches
    if (b % 10 === 0) {
      console.log(`\n📊 Progress: ${b}/${totalBatches} batches completed (${allIds.length} IDs generated so far)\n`);
    }
  }

  console.log('\n===== OVERALL RESULT =====');
  console.log('Total MH IDs generated:', allIds.length);
  const overallUnique = new Set(allIds);
  console.log('Overall unique count:', overallUnique.size);
  console.log('Any duplicates across all batches?', overallUnique.size !== allIds.length);
}

main().catch(console.error);
