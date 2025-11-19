// Quick script to add sample events to your database
import mongoose from 'mongoose';

// MongoDB connection (using the same connection string from your backend)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://bandatharan7:admin123@cluster0.nghtwjg.mongodb.net/test';

// Event schema (same as your backend model)
const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventType: { type: String, required: true, enum: ['sports', 'culturals', 'parasports'] },
    category: String,
    description: String,
    prizePool: String,
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

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
    },
    {
        eventName: "Drama Competition",
        eventType: "culturals",
        category: "theatre",
        description: "Short play performances",
        prizePool: "₹40,000",
        isActive: true
    }
];

async function addSampleEvents() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing events (optional - remove this if you want to keep existing ones)
        // await Event.deleteMany({});
        // console.log('🧹 Cleared existing events');

        console.log('📝 Adding sample events...');
        for (const eventData of sampleEvents) {
            try {
                const existingEvent = await Event.findOne({ eventName: eventData.eventName });
                if (existingEvent) {
                    console.log(`⚠️ Event "${eventData.eventName}" already exists, skipping...`);
                    continue;
                }

                const event = new Event(eventData);
                await event.save();
                console.log(`✅ Added: ${eventData.eventName} (${eventData.eventType})`);
            } catch (error) {
                console.log(`❌ Failed to add ${eventData.eventName}: ${error.message}`);
            }
        }

        // Show final count
        const totalEvents = await Event.countDocuments();
        const sportEvents = await Event.countDocuments({ eventType: 'sports' });
        const culturalEvents = await Event.countDocuments({ eventType: 'culturals' });
        const parasportEvents = await Event.countDocuments({ eventType: 'parasports' });

        console.log('\n🎉 Sample data added successfully!');
        console.log(`📊 Total Events: ${totalEvents}`);
        console.log(`🏃 Sports: ${sportEvents}`);
        console.log(`🎭 Culturals: ${culturalEvents}`);
        console.log(`♿ Para Sports: ${parasportEvents}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

addSampleEvents();