import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';

dotenv.config();

const sampleEvents = [
  // Sports Events
  {
    eventName: 'Cricket Tournament',
    eventType: 'sports',
    description: 'Inter-college cricket championship with teams from across the region',
    category: 'Team Sport',
    date: 'February 5-7, 2026',
    time: '9:00 AM onwards',
    venue: 'University Cricket Ground',
    maxParticipants: 120,
    registeredCount: 0,
    prizePool: '₹50,000',
    rules: 'Standard ICC cricket rules apply. Teams of 11 players each.',
    coordinators: [
      { name: 'Rahul Sharma', contact: '9876543210' }
    ],
    isActive: true
  },
  {
    eventName: 'Football Championship',
    eventType: 'sports',
    description: 'Intense football matches with exciting prizes for winners',
    category: 'Team Sport',
    date: 'February 5-6, 2026',
    time: '10:00 AM - 6:00 PM',
    venue: 'Main Football Field',
    maxParticipants: 100,
    registeredCount: 0,
    prizePool: '₹40,000',
    rules: 'FIFA standard rules. Teams of 11 players + 5 substitutes.',
    coordinators: [
      { name: 'Vikram Singh', contact: '9876543211' }
    ],
    isActive: true
  },
  {
    eventName: 'Basketball Tournament',
    eventType: 'sports',
    description: '3v3 and 5v5 basketball competitions',
    category: 'Team Sport',
    date: 'February 6, 2026',
    time: '11:00 AM - 5:00 PM',
    venue: 'Indoor Basketball Court',
    maxParticipants: 80,
    registeredCount: 0,
    prizePool: '₹30,000',
    rules: 'NBA standard rules apply. Both 3v3 and 5v5 formats available.',
    coordinators: [
      { name: 'Amit Patel', contact: '9876543212' }
    ],
    isActive: true
  },
  {
    eventName: 'Athletics Championship',
    eventType: 'sports',
    description: 'Track and field events including 100m, 200m, relay, long jump, and more',
    category: 'Individual Sport',
    date: 'February 5, 2026',
    time: '8:00 AM - 4:00 PM',
    venue: 'Athletic Track',
    maxParticipants: 150,
    registeredCount: 0,
    prizePool: '₹60,000',
    rules: 'IAAF rules apply. Multiple events throughout the day.',
    coordinators: [
      { name: 'Priya Reddy', contact: '9876543213' }
    ],
    isActive: true
  },
  {
    eventName: 'Table Tennis Tournament',
    eventType: 'sports',
    description: 'Singles and doubles table tennis competitions',
    category: 'Individual Sport',
    date: 'February 7, 2026',
    time: '9:00 AM - 3:00 PM',
    venue: 'Sports Complex - Table Tennis Hall',
    maxParticipants: 60,
    registeredCount: 0,
    prizePool: '₹20,000',
    rules: 'ITTF rules. Both singles and doubles categories.',
    coordinators: [
      { name: 'Suresh Kumar', contact: '9876543214' }
    ],
    isActive: true
  },

  // Cultural Events
  {
    eventName: 'Classical Dance Competition',
    eventType: 'culturals',
    description: 'Showcase traditional Indian classical dance forms including Bharatanatyam, Kathak, Kuchipudi, and more',
    category: 'Dance',
    date: 'February 6, 2026',
    time: '4:00 PM - 8:00 PM',
    venue: 'Main Auditorium',
    maxParticipants: 50,
    registeredCount: 0,
    prizePool: '₹45,000',
    rules: 'Solo and group performances. Time limit: 5-7 minutes per performance.',
    coordinators: [
      { name: 'Lakshmi Devi', contact: '9876543215' }
    ],
    isActive: true
  },
  {
    eventName: 'Western Music Band Competition',
    eventType: 'culturals',
    description: 'Battle of the bands featuring rock, pop, and indie music performances',
    category: 'Music',
    date: 'February 6, 2026',
    time: '6:00 PM - 10:00 PM',
    venue: 'Open Air Theater',
    maxParticipants: 40,
    registeredCount: 0,
    prizePool: '₹50,000',
    rules: 'Bands of 3-6 members. Original or cover songs allowed. 15 minutes per band.',
    coordinators: [
      { name: 'Arjun Malhotra', contact: '9876543216' }
    ],
    isActive: true
  },
  {
    eventName: 'Solo Singing Competition',
    eventType: 'culturals',
    description: 'Showcase your vocal talents in classical, semi-classical, or light music',
    category: 'Music',
    date: 'February 5, 2026',
    time: '3:00 PM - 6:00 PM',
    venue: 'Music Hall',
    maxParticipants: 80,
    registeredCount: 0,
    prizePool: '₹35,000',
    rules: 'Solo performance. Time limit: 3-5 minutes. Karaoke or live music allowed.',
    coordinators: [
      { name: 'Shreya Ghosh', contact: '9876543217' }
    ],
    isActive: true
  },
  {
    eventName: 'Drama & Theatre Competition',
    eventType: 'culturals',
    description: 'Present original plays or adaptations showcasing acting and storytelling skills',
    category: 'Drama',
    date: 'February 7, 2026',
    time: '2:00 PM - 7:00 PM',
    venue: 'Main Auditorium',
    maxParticipants: 60,
    registeredCount: 0,
    prizePool: '₹40,000',
    rules: 'Teams of 5-15 members. Time limit: 15-20 minutes. Any language allowed.',
    coordinators: [
      { name: 'Rohan Kapoor', contact: '9876543218' }
    ],
    isActive: true
  },
  {
    eventName: 'Fashion Show',
    eventType: 'culturals',
    description: 'Walk the ramp and showcase creativity through fashion',
    category: 'Fashion',
    date: 'February 6, 2026',
    time: '7:00 PM - 10:00 PM',
    venue: 'Main Auditorium',
    maxParticipants: 70,
    registeredCount: 0,
    prizePool: '₹55,000',
    rules: 'Teams of 8-12 models. Themes will be announced. 12 minutes per team.',
    coordinators: [
      { name: 'Neha Desai', contact: '9876543219' }
    ],
    isActive: true
  },
  {
    eventName: 'Folk Dance Competition',
    eventType: 'culturals',
    description: 'Celebrate regional diversity through traditional folk dances',
    category: 'Dance',
    date: 'February 5, 2026',
    time: '5:00 PM - 8:00 PM',
    venue: 'Open Air Theater',
    maxParticipants: 90,
    registeredCount: 0,
    prizePool: '₹38,000',
    rules: 'Group performances (5-15 members). Authentic folk forms from any region.',
    coordinators: [
      { name: 'Kavita Nair', contact: '9876543220' }
    ],
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('🗑️  Cleared existing events');

    // Insert sample events
    const insertedEvents = await Event.insertMany(sampleEvents);
    console.log(`✅ Successfully inserted ${insertedEvents.length} events`);

    // Display summary
    const sportsCount = insertedEvents.filter(e => e.eventType === 'sports').length;
    const culturalsCount = insertedEvents.filter(e => e.eventType === 'culturals').length;
    
    console.log('\n📊 Event Summary:');
    console.log(`   Sports Events: ${sportsCount}`);
    console.log(`   Cultural Events: ${culturalsCount}`);
    console.log(`   Total Events: ${insertedEvents.length}`);

    // Disconnect
    await mongoose.disconnect();
    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
