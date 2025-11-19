import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';

dotenv.config();

const sampleEvents = [
  // SPORTS EVENTS WITH GENDER CATEGORIES
  
  // Cricket - Gender Split
  {
    eventName: 'Cricket Tournament - Men',
    eventType: 'sports',
    description: 'Inter-college cricket championship for men\'s teams',
    category: 'team',
    gender: 'male',
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
    eventName: 'Cricket Tournament - Women',
    eventType: 'sports',
    description: 'Inter-college cricket championship for women\'s teams',
    category: 'team',
    gender: 'female',
    date: 'February 8-9, 2026',
    time: '9:00 AM onwards',
    venue: 'University Cricket Ground',
    maxParticipants: 80,
    registeredCount: 0,
    prizePool: '₹40,000',
    rules: 'Standard ICC cricket rules apply. Teams of 11 players each.',
    coordinators: [
      { name: 'Priya Sharma', contact: '9876543210' }
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
  {
    eventName: 'Badminton Championship',
    eventType: 'sports',
    description: 'Singles and doubles badminton competitions with elimination rounds',
    category: 'Individual Sport',
    date: 'February 8, 2026',
    time: '10:00 AM - 5:00 PM',
    venue: 'Sports Complex - Badminton Hall',
    maxParticipants: 80,
    registeredCount: 0,
    prizePool: '₹25,000',
    rules: 'BWF rules apply. Singles and doubles categories available.',
    coordinators: [
      { name: 'Ananya Sharma', contact: '9876543221' }
    ],
    isActive: true
  },
  {
    eventName: 'Volleyball Tournament',
    eventType: 'sports',
    description: 'Inter-college volleyball championship with team competitions',
    category: 'Team Sport',
    date: 'February 6-7, 2026',
    time: '9:00 AM - 6:00 PM',
    venue: 'Outdoor Volleyball Courts',
    maxParticipants: 84,
    registeredCount: 0,
    prizePool: '₹35,000',
    rules: 'FIVB rules. Teams of 6 players + 2 substitutes.',
    coordinators: [
      { name: 'Ravi Kumar', contact: '9876543222' }
    ],
    isActive: true
  },
  {
    eventName: 'Chess Championship',
    eventType: 'sports',
    description: 'Strategic chess tournament with multiple rounds',
    category: 'Individual Sport',
    date: 'February 5-6, 2026',
    time: '2:00 PM - 8:00 PM',
    venue: 'Conference Hall - Chess Arena',
    maxParticipants: 40,
    registeredCount: 0,
    prizePool: '₹15,000',
    rules: 'FIDE rules apply. Swiss system tournament format.',
    coordinators: [
      { name: 'Deepak Gupta', contact: '9876543223' }
    ],
    isActive: true
  },
  {
    eventName: 'Swimming Competition',
    eventType: 'sports',
    description: 'Multiple swimming events including freestyle, butterfly, and relay races',
    category: 'Individual Sport',
    date: 'February 8, 2026',
    time: '7:00 AM - 12:00 PM',
    venue: 'University Swimming Pool',
    maxParticipants: 50,
    registeredCount: 0,
    prizePool: '₹30,000',
    rules: 'FINA rules apply. Multiple stroke categories.',
    coordinators: [
      { name: 'Kavya Nair', contact: '9876543224' }
    ],
    isActive: true
  },
  {
    eventName: 'Kabaddi Tournament',
    eventType: 'sports',
    description: 'Traditional Indian sport tournament with team competitions',
    category: 'Team Sport',
    date: 'February 7-8, 2026',
    time: '3:00 PM - 7:00 PM',
    venue: 'Main Sports Ground',
    maxParticipants: 70,
    registeredCount: 0,
    prizePool: '₹28,000',
    rules: 'Traditional kabaddi rules. Teams of 7 players each.',
    coordinators: [
      { name: 'Arjun Singh', contact: '9876543225' }
    ],
    isActive: true
  },

  // Cultural Events (10 events)
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
  },
  {
    eventName: 'Stand-up Comedy Competition',
    eventType: 'culturals',
    description: 'Make the audience laugh with your original comedy acts',
    category: 'Comedy',
    date: 'February 7, 2026',
    time: '7:00 PM - 10:00 PM',
    venue: 'Open Air Theater',
    maxParticipants: 30,
    registeredCount: 0,
    prizePool: '₹25,000',
    rules: 'Solo performances. Time limit: 5-8 minutes. Original content only.',
    coordinators: [
      { name: 'Rohit Verma', contact: '9876543226' }
    ],
    isActive: true
  },
  {
    eventName: 'Art & Painting Exhibition',
    eventType: 'culturals',
    description: 'Display your artistic talents through paintings and digital art',
    category: 'Art',
    date: 'February 5-7, 2026',
    time: '10:00 AM - 6:00 PM',
    venue: 'Art Gallery',
    maxParticipants: 100,
    registeredCount: 0,
    prizePool: '₹30,000',
    rules: 'Original artworks only. Multiple categories available.',
    coordinators: [
      { name: 'Priya Singh', contact: '9876543227' }
    ],
    isActive: true
  },
  {
    eventName: 'Poetry & Literature Competition',
    eventType: 'culturals',
    description: 'Express yourself through the power of words and poetry',
    category: 'Literature',
    date: 'February 6, 2026',
    time: '2:00 PM - 5:00 PM',
    venue: 'Literature Hall',
    maxParticipants: 60,
    registeredCount: 0,
    prizePool: '₹22,000',
    rules: 'Original compositions. Hindi, English, and regional languages allowed.',
    coordinators: [
      { name: 'Suman Joshi', contact: '9876543228' }
    ],
    isActive: true
  },
  {
    eventName: 'DJ & Music Production Battle',
    eventType: 'culturals',
    description: 'Electronic music competition featuring DJs and music producers',
    category: 'Music',
    date: 'February 8, 2026',
    time: '8:00 PM - 12:00 AM',
    venue: 'Open Air Theater',
    maxParticipants: 25,
    registeredCount: 0,
    prizePool: '₹42,000',
    rules: 'Original mixes and live performances. 20 minutes per DJ.',
    coordinators: [
      { name: 'Aditya Mehta', contact: '9876543229' }
    ],
    isActive: true
  },

  // Para Sports Events (8 events)
  {
    eventName: 'Wheelchair Basketball',
    eventType: 'parasports',
    description: 'Competitive wheelchair basketball tournament following international rules',
    category: 'Team Sport',
    date: 'February 6, 2026',
    time: '2:00 PM - 6:00 PM',
    venue: 'Indoor Adapted Sports Hall',
    maxParticipants: 40,
    registeredCount: 0,
    prizePool: '₹35,000',
    rules: 'International Wheelchair Basketball Federation (IWBF) rules apply.',
    coordinators: [
      { name: 'Priya Sharma', contact: '9876543230' }
    ],
    isActive: true
  },
  {
    eventName: 'Para Swimming Championship',
    eventType: 'parasports',
    description: 'Swimming competition for athletes with physical disabilities across multiple categories',
    category: 'Individual Sport',
    date: 'February 7, 2026',
    time: '10:00 AM - 4:00 PM',
    venue: 'University Swimming Pool (Accessible)',
    maxParticipants: 30,
    registeredCount: 0,
    prizePool: '₹30,000',
    rules: 'World Para Swimming classification and rules. Multiple categories available.',
    coordinators: [
      { name: 'Suresh Kumar', contact: '9876543231' }
    ],
    isActive: true
  },
  {
    eventName: 'Goalball Tournament',
    eventType: 'parasports',
    description: 'Goalball competition for visually impaired athletes',
    category: 'Team Sport',
    date: 'February 5, 2026',
    time: '3:00 PM - 7:00 PM',
    venue: 'Adapted Sports Indoor Court',
    maxParticipants: 24,
    registeredCount: 0,
    prizePool: '₹25,000',
    rules: 'International Blind Sports Federation (IBSA) goalball rules.',
    coordinators: [
      { name: 'Anjali Gupta', contact: '9876543232' }
    ],
    isActive: true
  },
  {
    eventName: 'Wheelchair Racing',
    eventType: 'parasports',
    description: 'Sprint and distance wheelchair racing events on the athletics track',
    category: 'Individual Sport',
    date: 'February 8, 2026',
    time: '9:00 AM - 1:00 PM',
    venue: 'University Athletics Track',
    maxParticipants: 20,
    registeredCount: 0,
    prizePool: '₹28,000',
    rules: 'World Para Athletics racing wheelchair specifications required.',
    coordinators: [
      { name: 'Ravi Patel', contact: '9876543233' }
    ],
    isActive: true
  },
  {
    eventName: 'Sitting Volleyball',
    eventType: 'parasports',
    description: 'Competitive sitting volleyball for athletes with lower limb impairments',
    category: 'Team Sport',
    date: 'February 6, 2026',
    time: '4:00 PM - 8:00 PM',
    venue: 'Indoor Volleyball Court (Modified)',
    maxParticipants: 36,
    registeredCount: 0,
    prizePool: '₹32,000',
    rules: 'World ParaVolley sitting volleyball rules apply.',
    coordinators: [
      { name: 'Meera Joshi', contact: '9876543234' }
    ],
    isActive: true
  },
  {
    eventName: 'Para Powerlifting',
    eventType: 'parasports',
    description: 'Bench press competition for athletes with physical impairments',
    category: 'Individual Sport',
    date: 'February 7, 2026',
    time: '11:00 AM - 5:00 PM',
    venue: 'Fitness Center (Accessible)',
    maxParticipants: 15,
    registeredCount: 0,
    prizePool: '₹22,000',
    rules: 'World Para Powerlifting technical rules and classifications.',
    coordinators: [
      { name: 'Amit Verma', contact: '9876543235' }
    ],
    isActive: true
  },
  {
    eventName: 'Blind Cricket',
    eventType: 'parasports',
    description: 'Cricket tournament for visually impaired players using special ball',
    category: 'Team Sport',
    date: 'February 8, 2026',
    time: '10:00 AM - 6:00 PM',
    venue: 'Adapted Cricket Ground',
    maxParticipants: 44,
    registeredCount: 0,
    prizePool: '₹38,000',
    rules: 'World Blind Cricket Council rules. Ball with bells used.',
    coordinators: [
      { name: 'Deepak Singh', contact: '9876543236' }
    ],
    isActive: true
  },
  {
    eventName: 'Para Table Tennis',
    eventType: 'parasports',
    description: 'Table tennis competition for athletes with physical and intellectual disabilities',
    category: 'Individual Sport',
    date: 'February 5, 2026',
    time: '1:00 PM - 7:00 PM',
    venue: 'Table Tennis Hall (Accessible)',
    maxParticipants: 25,
    registeredCount: 0,
    prizePool: '₹20,000',
    rules: 'World Para Table Tennis classification system and rules.',
    coordinators: [
      { name: 'Kavitha Rao', contact: '9876543237' }
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
    const paraSportsCount = insertedEvents.filter(e => e.eventType === 'parasports').length;
    
    console.log('\n📊 Event Summary:');
    console.log(`   Sports Events: ${sportsCount}`);
    console.log(`   Cultural Events: ${culturalsCount}`);
    console.log(`   Para Sports Events: ${paraSportsCount}`);
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
