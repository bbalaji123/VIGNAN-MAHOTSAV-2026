import mongoose from 'mongoose';
import Event from './models/Event.js';

// MongoDB connection URI - update this with your actual connection string
const MONGODB_URI = 'mongodb://localhost:27017/test' || process.env.MONGODB_URI;

const sampleEvents = [
  // Sports Events
  {
    eventName: "Cricket Championship",
    eventType: "sports",
    category: "team",
    description: "Inter-college cricket tournament",
    prizePool: "₹50,000",
    rules: "Standard cricket rules apply"
  },
  {
    eventName: "Football Tournament", 
    eventType: "sports",
    category: "team",
    description: "Football championship",
    prizePool: "₹40,000"
  },
  {
    eventName: "Chess Tournament",
    eventType: "sports", 
    category: "indoor",
    description: "Individual chess competition",
    prizePool: "₹15,000"
  },
  {
    eventName: "Table Tennis",
    eventType: "sports",
    category: "indoor", 
    description: "Table tennis singles and doubles",
    prizePool: "₹20,000"
  },
  {
    eventName: "Basketball Championship",
    eventType: "sports",
    category: "team",
    description: "Inter-college basketball tournament",
    prizePool: "₹45,000"
  },

  // Cultural Events  
  {
    eventName: "Singing Idol",
    eventType: "culturals",
    category: "music",
    description: "Solo singing competition",
    prizePool: "₹25,000",
    rules: "4 minutes time limit"
  },
  {
    eventName: "Group Dance",
    eventType: "culturals", 
    category: "dance",
    description: "Group dance competition",
    prizePool: "₹30,000"
  },
  {
    eventName: "Classical Dance Solo",
    eventType: "culturals",
    category: "dance", 
    description: "Individual classical dance",
    prizePool: "₹20,000"
  },
  {
    eventName: "Drama Competition",
    eventType: "culturals",
    category: "theatre",
    description: "Group drama/skit competition", 
    prizePool: "₹35,000"
  },
  {
    eventName: "Poetry Recitation",
    eventType: "culturals",
    category: "literature",
    description: "English and Telugu poetry",
    prizePool: "₹15,000"
  },
  {
    eventName: "Painting Competition",
    eventType: "culturals",
    category: "visual",
    description: "Theme-based painting",
    prizePool: "₹18,000"
  },
  {
    eventName: "Fashion Show",
    eventType: "culturals",
    category: "fashion",
    description: "Theme-based fashion show",
    prizePool: "₹40,000"
  },
  {
    eventName: "Mr. & Ms. Mahotsav",
    eventType: "culturals", 
    category: "spotlight",
    description: "Personality contest",
    prizePool: "₹50,000"
  },

  // Para Sports
  {
    eventName: "Para Athletics 100m",
    eventType: "parasports",
    category: "athletics",
    description: "100m race for differently-abled athletes",
    prizePool: "₹10,000"
  },
  {
    eventName: "Para Athletics 400m", 
    eventType: "parasports",
    category: "athletics",
    description: "400m race for differently-abled athletes",
    prizePool: "₹12,000"
  }
];

async function addSampleEvents() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('🔗 Connected to MongoDB');

    // Clear existing events (optional - remove this line if you want to keep existing data)
    // await Event.deleteMany({});
    // console.log('🗑️ Cleared existing events');

    // Add sample events
    const createdEvents = await Event.insertMany(sampleEvents);
    console.log(`✅ Added ${createdEvents.length} sample events to the database`);

    // Display the created events
    console.log('\n📋 Created Events:');
    createdEvents.forEach(event => {
      console.log(`- ${event.eventName} (${event.eventType}/${event.category})`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log('\n🔐 Database connection closed');

  } catch (error) {
    console.error('❌ Error adding sample events:', error);
    process.exit(1);
  }
}

// Run the script
addSampleEvents();