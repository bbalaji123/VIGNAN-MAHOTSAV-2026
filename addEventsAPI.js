const API_BASE = 'http://localhost:5000/api';

const sampleEvents = [
    {
        eventName: "Singing Idol",
        eventType: "culturals",
        category: "music", 
        description: "Solo singing competition",
        prizePool: "₹25,000",
        isActive: true
    },
    {
        eventName: "Cricket Championship",
        eventType: "sports",
        category: "team",
        description: "Inter-college cricket tournament", 
        prizePool: "₹50,000",
        isActive: true
    },
    {
        eventName: "Chess Tournament", 
        eventType: "sports",
        category: "indoor",
        description: "Individual chess competition",
        prizePool: "₹15,000",
        isActive: true
    },
    {
        eventName: "Group Dance",
        eventType: "culturals",
        category: "dance",
        description: "Group dance competition",
        prizePool: "₹30,000", 
        isActive: true
    },
    {
        eventName: "Para Athletics 100m",
        eventType: "parasports", 
        category: "athletics",
        description: "100m race for differently-abled athletes",
        prizePool: "₹10,000",
        isActive: true
    },
    {
        eventName: "Classical Dance",
        eventType: "culturals",
        category: "dance",
        description: "Traditional dance performances",
        prizePool: "₹20,000",
        isActive: true
    },
    {
        eventName: "Basketball 3x3",
        eventType: "sports", 
        category: "team",
        description: "3-on-3 basketball tournament",
        prizePool: "₹35,000",
        isActive: true
    }
];

async function addEventsViaAPI() {
    try {
        console.log('🔗 Testing API connection...');
        const testResponse = await fetch(`${API_BASE}/events`);
        if (!testResponse.ok) {
            throw new Error(`API not responding: ${testResponse.status}`);
        }
        console.log('✅ API is running!');

        console.log('📝 Adding sample events...');
        for (const eventData of sampleEvents) {
            try {
                const response = await fetch(`${API_BASE}/event`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eventData)
                });

                const result = await response.json();

                if (response.ok) {
                    console.log(`✅ Added: ${eventData.eventName} (${eventData.eventType})`);
                } else {
                    console.log(`⚠️ ${eventData.eventName}: ${result.message || 'Already exists or error'}`);
                }
            } catch (error) {
                console.log(`❌ Failed: ${eventData.eventName} - ${error.message}`);
            }
        }

        // Check final counts
        console.log('\n📊 Checking final event counts...');
        const types = ['sports', 'culturals', 'parasports'];
        for (const type of types) {
            const response = await fetch(`${API_BASE}/events/${type}`);
            const data = await response.json();
            console.log(`${type}: ${data.count || 0} events`);
        }

        console.log('\n🎉 Done! Your events should now appear in the frontend.');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('💡 Make sure your backend is running on port 5000');
    }
}

addEventsViaAPI();