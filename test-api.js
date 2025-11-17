// Test API endpoints
import http from 'http';

async function testAPI(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing API endpoints...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const health = await testAPI('/health');
    console.log('   ✅ Health check:', health.status);

    // Test all events
    console.log('\n2. Testing all events endpoint...');
    const allEvents = await testAPI('/api/events');
    if (allEvents.success) {
      console.log('   ✅ All events:', allEvents.count, 'events found');
    } else {
      console.log('   ❌ All events failed:', allEvents.message);
    }

    // Test sports events
    console.log('\n3. Testing sports events endpoint...');
    const sportsEvents = await testAPI('/api/events/sports');
    if (sportsEvents.success) {
      console.log('   ✅ Sports events:', sportsEvents.count, 'events found');
      if (sportsEvents.data && sportsEvents.data.length > 0) {
        console.log('   📋 Sample sports events:');
        sportsEvents.data.slice(0, 3).forEach(e => 
          console.log('      -', e.eventName)
        );
      }
    } else {
      console.log('   ❌ Sports events failed:', sportsEvents.message);
    }

    // Test cultural events
    console.log('\n4. Testing cultural events endpoint...');
    const culturalEvents = await testAPI('/api/events/culturals');
    if (culturalEvents.success) {
      console.log('   ✅ Cultural events:', culturalEvents.count, 'events found');
      if (culturalEvents.data && culturalEvents.data.length > 0) {
        console.log('   📋 Sample cultural events:');
        culturalEvents.data.slice(0, 3).forEach(e => 
          console.log('      -', e.eventName)
        );
      }
    } else {
      console.log('   ❌ Cultural events failed:', culturalEvents.message);
    }

    console.log('\n🎉 API testing completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runTests();