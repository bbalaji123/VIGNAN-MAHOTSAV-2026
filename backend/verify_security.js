
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/neekendukura';
// Use a test user known to exist or create a new one (since we can't easily query DB here without importing models)
// Ideally, we'd use the login flow first.

async function runTests() {
    console.log('🔒 Starting Security Verification...\n');

    // 1. Test Public Route (Should succeed)
    console.log('1️⃣  Testing Public Route (/health)...');
    try {
        const res = await fetch(`${BASE_URL}/health`);
        if (res.status === 200) {
            console.log('   ✅ Public route accessible (200 OK)');
        } else {
            console.log(`   ❌ Public route failed (${res.status})`);
        }
    } catch (err) {
        console.log(`   ❌ Connection refused. Is server running?`);
    }

    // 2. Test Protected Route without Token (Should fail)
    console.log('\n2️⃣  Testing Protected Route without Token (/save-events)...');
    try {
        const res = await fetch(`${BASE_URL}/save-events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'test', events: [] })
        });

        if (res.status === 401) {
            console.log('   ✅ Access denied as expected (401 Unauthorized)');
        } else {
            console.log(`   ❌ Unexpected response: ${res.status} (Should be 401)`);
        }
    } catch (err) {
        console.log(`   ❌ Request error: ${err.message}`);
    }

    // 2.1 Test Protected Admin Route (/registrations)
    console.log('\n2️⃣.1️⃣ Test Protected Admin Route (/registrations)...');
    try {
        const res = await fetch(`${BASE_URL}/registrations`);

        if (res.status === 401) {
            console.log('   ✅ Access denied as expected (401 Unauthorized)');
        } else {
            console.log(`   ❌ Unexpected response: ${res.status} (Should be 401)`);
        }
    } catch (err) {
        console.log(`   ❌ Request error: ${err.message}`);
    }

    // 3. Test CORS (Mocking Origin)
    console.log('\n3️⃣  Testing CORS (Unauthorized Origin)...');
    try {
        const res = await fetch(`${BASE_URL}/health`, {
            headers: { 'Origin': 'http://evil-site.com' }
        });
        // CORS usually doesn't fail the request in server-to-server scenarios like node-fetch easily without preflight checks 
        // but the Allow-Origin header should not be present or match.
        // However, the CORS middleware in Express might block it if configured to fail.
        // Our configuration returns error for callback if origin not allowed.

        if (res.status === 500 || res.status === 403 || !res.ok) {
            // If our callback throws error, express error handler catches it
            console.log('   ✅ CORS blocked requests from unauthorized origin');
        } else {
            // Check headers
            const allowOrigin = res.headers.get('access-control-allow-origin');
            if (!allowOrigin || allowOrigin !== 'http://evil-site.com') {
                console.log('   ✅ CORS headers correctly restricted');
            } else {
                console.log('   ❌ CORS header leaked to unauthorized origin');
            }
        }
    } catch (err) {
        console.log('   ✅ CORS blocked request (Network Error/Preflight)');
    }
}

runTests();
