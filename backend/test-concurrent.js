import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Generate unique test data for concurrent users
function generateTestUser(index) {
  const timestamp = Date.now();
  return {
    name: `Concurrent User ${index}`,
    email: `concurrent${index}_${timestamp}@test.com`,
    password: '15/01/2000',
    phone: `98765432${String(index).padStart(2, '0')}`,
    college: 'Test College',
    branch: 'CSE',
    dateOfBirth: '2000-01-15',
    gender: index % 2 === 0 ? 'Male' : 'Female',
    registerId: `CONC${timestamp}_${index}`,
    state: 'Andhra Pradesh',
    district: 'Guntur'
  };
}

// Register a single user
async function registerUser(userData) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    
    return {
      success: response.ok && data.success,
      userId: data.data?.userId,
      email: userData.email,
      status: response.status,
      message: data.message,
      error: data.error
    };
  } catch (error) {
    return {
      success: false,
      email: userData.email,
      error: error.message
    };
  }
}

// Test concurrent registrations
async function testConcurrentRegistrations(numUsers = 70) {
  log(`\n${'='.repeat(70)}`, 'cyan');
  log(`CONCURRENT REGISTRATION TEST - ${numUsers} USERS`, 'cyan');
  log('='.repeat(70), 'cyan');
  
  log(`\n📝 Generating ${numUsers} test users...`, 'blue');
  const users = Array.from({ length: numUsers }, (_, i) => generateTestUser(i + 1));
  
  log(`\n🚀 Starting concurrent registrations...`, 'yellow');
  const startTime = Date.now();
  
  // Send all requests concurrently
  const promises = users.map(user => registerUser(user));
  const results = await Promise.all(promises);
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  log(`\n⏱️  Completed in ${duration} seconds`, 'cyan');
  
  // Analyze results
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const userIds = successful.map(r => r.userId).filter(Boolean);
  
  // Check for duplicate IDs
  const uniqueIds = new Set(userIds);
  const duplicates = userIds.length - uniqueIds.size;
  
  log(`\n${'='.repeat(70)}`, 'cyan');
  log('RESULTS ANALYSIS', 'cyan');
  log('='.repeat(70), 'cyan');
  
  log(`\n📊 Registration Summary:`, 'blue');
  log(`   Total Attempts: ${numUsers}`, 'cyan');
  log(`   Successful: ${successful.length}`, successful.length === numUsers ? 'green' : 'yellow');
  log(`   Failed: ${failed.length}`, failed.length > 0 ? 'red' : 'green');
  
  log(`\n🔑 User ID Analysis:`, 'blue');
  log(`   Total IDs Generated: ${userIds.length}`, 'cyan');
  log(`   Unique IDs: ${uniqueIds.size}`, 'cyan');
  log(`   Duplicate IDs: ${duplicates}`, duplicates === 0 ? 'green' : 'red');
  
  if (duplicates > 0) {
    log(`\n⚠️  DUPLICATE IDs DETECTED!`, 'red');
    
    // Find which IDs are duplicated
    const idCounts = {};
    userIds.forEach(id => {
      idCounts[id] = (idCounts[id] || 0) + 1;
    });
    
    const duplicatedIds = Object.entries(idCounts)
      .filter(([_, count]) => count > 1)
      .map(([id, count]) => ({ id, count }));
    
    log(`\n   Duplicated User IDs:`, 'yellow');
    duplicatedIds.forEach(({ id, count }) => {
      log(`   - ${id}: appears ${count} times`, 'red');
    });
  } else {
    log(`\n✅ NO DUPLICATE IDs - ID Generation is working correctly!`, 'green');
  }
  
  // Show sample of generated IDs
  log(`\n📋 Sample of Generated User IDs:`, 'blue');
  const sampleSize = Math.min(10, userIds.length);
  userIds.slice(0, sampleSize).forEach((id, index) => {
    log(`   ${index + 1}. ${id}`, 'cyan');
  });
  if (userIds.length > sampleSize) {
    log(`   ... and ${userIds.length - sampleSize} more`, 'cyan');
  }
  
  // Show failures if any
  if (failed.length > 0) {
    log(`\n❌ Failed Registrations (${failed.length}):`, 'red');
    failed.forEach((result, index) => {
      log(`   ${index + 1}. ${result.email}`, 'yellow');
      log(`      Status: ${result.status || 'N/A'}`, 'yellow');
      log(`      Message: ${result.message || result.error || 'Unknown error'}`, 'yellow');
    });
  }
  
  // Performance metrics
  log(`\n⚡ Performance Metrics:`, 'blue');
  log(`   Total Time: ${duration}s`, 'cyan');
  log(`   Average Time per User: ${(duration / numUsers).toFixed(3)}s`, 'cyan');
  log(`   Registrations per Second: ${(numUsers / duration).toFixed(2)}`, 'cyan');
  
  // Final verdict
  log(`\n${'='.repeat(70)}`, 'cyan');
  if (duplicates === 0 && successful.length === numUsers) {
    log('✅ TEST PASSED: All users registered with unique IDs!', 'green');
  } else if (duplicates === 0 && successful.length < numUsers) {
    log('⚠️  TEST PARTIAL: No duplicates but some registrations failed', 'yellow');
  } else {
    log('❌ TEST FAILED: Duplicate IDs detected!', 'red');
  }
  log('='.repeat(70) + '\n', 'cyan');
  
  return {
    total: numUsers,
    successful: successful.length,
    failed: failed.length,
    duplicates,
    uniqueIds: uniqueIds.size,
    duration
  };
}

// Run the test
log('\n🧪 Starting Concurrent Registration Test...', 'magenta');

testConcurrentRegistrations(70).then(results => {
  if (results.duplicates === 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}).catch(error => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
