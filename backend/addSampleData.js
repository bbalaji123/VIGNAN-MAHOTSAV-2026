// Simple script to add sample events to your database
console.log('Adding sample events to database...');

// Add some events using fetch to your API
const API_BASE_URL = 'http://localhost:5000/api';

const sampleEvents = [
  {
    eventName: "Singing Idol",
    eventType: "culturals", 
    category: "music",
    description: "Solo singing competition",
    prizePool: "₹25,000"
  },
  {
    eventName: "Cricket Championship", 
    eventType: "sports",
    category: "team",
    description: "Inter-college cricket tournament",
    prizePool: "₹50,000"
  },
  {
    eventName: "Chess Tournament",
    eventType: "sports",
    category: "indoor", 
    description: "Individual chess competition",
    prizePool: "₹15,000"
  },
  {
    eventName: "Group Dance",
    eventType: "culturals",
    category: "dance",
    description: "Group dance competition", 
    prizePool: "₹30,000"
  },
  {
    eventName: "Para Athletics 100m",
    eventType: "parasports",
    category: "athletics",
    description: "100m race for differently-abled athletes",
    prizePool: "₹10,000"
  }
];

async function addEvents() {
  try {
    for (const event of sampleEvents) {
      const response = await fetch(`${API_BASE_URL}/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
      
      const result = await response.json();
      if (result.success) {
        console.log(`✅ Added: ${event.eventName}`);
      } else {
        console.log(`❌ Failed to add: ${event.eventName}`, result.message);
      }
    }
    
    console.log('🎉 Sample events added! Now test your frontend.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('⚠️  Make sure your backend server is running on port 5000');
  }
}

addEvents();