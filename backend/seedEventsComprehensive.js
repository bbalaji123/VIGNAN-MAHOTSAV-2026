import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';

dotenv.config();

const comprehensiveEvents = [
  // CULTURAL EVENTS - MUSIC
  {
    eventName: 'Solo Singing - Male',
    eventType: 'culturals',
    category: 'music',
    gender: 'male',
    description: 'Solo singing competition for male participants',
    date: 'February 5, 2026',
    time: '3:00 PM - 6:00 PM',
    venue: 'Music Hall',
    maxParticipants: 40,
    registeredCount: 0,
    prizePool: '₹25,000',
    rules: 'Solo performance. Time limit: 3-5 minutes. Live or karaoke allowed.',
    coordinators: [{ name: 'Arjun Singh', contact: '9876543215' }],
    isActive: true
  },
  {
    eventName: 'Solo Singing - Female',
    eventType: 'culturals',
    category: 'music',
    gender: 'female',
    description: 'Solo singing competition for female participants',
    date: 'February 5, 2026',
    time: '6:00 PM - 9:00 PM',
    venue: 'Music Hall',
    maxParticipants: 40,
    registeredCount: 0,
    prizePool: '₹25,000',
    rules: 'Solo performance. Time limit: 3-5 minutes. Live or karaoke allowed.',
    coordinators: [{ name: 'Shreya Ghosh', contact: '9876543216' }],
    isActive: true
  },
  {
    eventName: 'Group Singing - Mixed',
    eventType: 'culturals',
    category: 'music',
    gender: 'mixed',
    description: 'Group singing competition with mixed gender teams',
    date: 'February 6, 2026',
    time: '4:00 PM - 7:00 PM',
    venue: 'Main Auditorium',
    maxParticipants: 60,
    registeredCount: 0,
    prizePool: '₹40,000',
    rules: 'Groups of 4-8 members. Mixed gender teams preferred.',
    coordinators: [{ name: 'Kavya Nair', contact: '9876543217' }],
    isActive: true
  },
  {
    eventName: 'Battle of Bands',
    eventType: 'culturals',
    category: 'music',
    gender: 'mixed',
    description: 'Rock/Pop band competition open to all',
    date: 'February 6, 2026',
    time: '6:00 PM - 10:00 PM',
    venue: 'Open Air Theater',
    maxParticipants: 40,
    registeredCount: 0,
    prizePool: '₹50,000',
    rules: 'Bands of 3-6 members. Original or cover songs. 15 minutes per band.',
    coordinators: [{ name: 'Arjun Malhotra', contact: '9876543218' }],
    isActive: true
  },

  // CULTURAL EVENTS - DANCE
  {
    eventName: 'Solo Dance - Male',
    eventType: 'culturals',
    category: 'dance',
    gender: 'male',
    description: 'Solo dance performance for male participants',
    date: 'February 7, 2026',
    time: '3:00 PM - 6:00 PM',
    venue: 'Dance Studio',
    maxParticipants: 30,
    registeredCount: 0,
    prizePool: '₹20,000',
    rules: 'Any dance form. Time limit: 4-6 minutes.',
    coordinators: [{ name: 'Rohan Kapoor', contact: '9876543219' }],
    isActive: true
  },
  {
    eventName: 'Solo Dance - Female',
    eventType: 'culturals',
    category: 'dance',
    gender: 'female',
    description: 'Solo dance performance for female participants',
    date: 'February 7, 2026',
    time: '6:00 PM - 9:00 PM',
    venue: 'Dance Studio',
    maxParticipants: 40,
    registeredCount: 0,
    prizePool: '₹20,000',
    rules: 'Any dance form. Time limit: 4-6 minutes.',
    coordinators: [{ name: 'Neha Desai', contact: '9876543220' }],
    isActive: true
  },
  {
    eventName: 'Group Dance - Mixed',
    eventType: 'culturals',
    category: 'dance',
    gender: 'mixed',
    description: 'Group dance competition with choreography',
    date: 'February 8, 2026',
    time: '4:00 PM - 8:00 PM',
    venue: 'Main Auditorium',
    maxParticipants: 90,
    registeredCount: 0,
    prizePool: '₹45,000',
    rules: 'Groups of 6-15 members. Any dance form.',
    coordinators: [{ name: 'Lakshmi Devi', contact: '9876543221' }],
    isActive: true
  },
  {
    eventName: 'Classical Dance - Female',
    eventType: 'culturals',
    category: 'dance',
    gender: 'female',
    description: 'Traditional classical dance forms',
    date: 'February 6, 2026',
    time: '4:00 PM - 7:00 PM',
    venue: 'Cultural Hall',
    maxParticipants: 25,
    registeredCount: 0,
    prizePool: '₹30,000',
    rules: 'Bharatanatyam, Kathak, Kuchipudi, Odissi accepted.',
    coordinators: [{ name: 'Sita Devi', contact: '9876543222' }],
    isActive: true
  },

  // CULTURAL EVENTS - THEATRE & LITERARY
  {
    eventName: 'Drama Competition',
    eventType: 'culturals',
    category: 'theatre',
    gender: 'mixed',
    description: 'Short play performances and skits',
    date: 'February 7, 2026',
    time: '2:00 PM - 7:00 PM',
    venue: 'Main Auditorium',
    maxParticipants: 60,
    registeredCount: 0,
    prizePool: '₹40,000',
    rules: 'Teams of 5-15 members. 15-20 minutes per play.',
    coordinators: [{ name: 'Deepak Gupta', contact: '9876543223' }],
    isActive: true
  },
  {
    eventName: 'Stand-up Comedy',
    eventType: 'culturals',
    category: 'theatre',
    gender: 'mixed',
    description: 'Comedy performances and storytelling',
    date: 'February 7, 2026',
    time: '7:00 PM - 10:00 PM',
    venue: 'Open Air Theater',
    maxParticipants: 30,
    registeredCount: 0,
    prizePool: '₹20,000',
    rules: 'Solo performances. 5-8 minutes. Original content only.',
    coordinators: [{ name: 'Rohit Verma', contact: '9876543224' }],
    isActive: true
  },
  {
    eventName: 'Poetry Competition',
    eventType: 'culturals',
    category: 'literary',
    gender: 'mixed',
    description: 'Original poetry recitation and composition',
    date: 'February 6, 2026',
    time: '2:00 PM - 5:00 PM',
    venue: 'Literature Hall',
    maxParticipants: 50,
    registeredCount: 0,
    prizePool: '₹15,000',
    rules: 'Original compositions. Hindi, English, regional languages allowed.',
    coordinators: [{ name: 'Suman Joshi', contact: '9876543225' }],
    isActive: true
  },

  // SPORTS EVENTS - TEAM SPORTS
  {
    eventName: 'Cricket Championship - Men',
    eventType: 'sports',
    category: 'team',
    gender: 'male',
    description: 'Inter-college cricket tournament for men',
    date: 'February 5-7, 2026',
    time: '9:00 AM onwards',
    venue: 'University Cricket Ground',
    maxParticipants: 120,
    registeredCount: 0,
    prizePool: '₹75,000',
    rules: 'Standard ICC cricket rules. Teams of 11 players each.',
    coordinators: [{ name: 'Rahul Sharma', contact: '9876543226' }],
    isActive: true
  },
  {
    eventName: 'Cricket Championship - Women',
    eventType: 'sports',
    category: 'team',
    gender: 'female',
    description: 'Inter-college cricket tournament for women',
    date: 'February 8-9, 2026',
    time: '9:00 AM onwards',
    venue: 'University Cricket Ground',
    maxParticipants: 80,
    registeredCount: 0,
    prizePool: '₹60,000',
    rules: 'Standard ICC cricket rules. Teams of 11 players each.',
    coordinators: [{ name: 'Priya Reddy', contact: '9876543227' }],
    isActive: true
  },
  {
    eventName: 'Football Championship - Men',
    eventType: 'sports',
    category: 'team',
    gender: 'male',
    description: 'Football championship for male teams',
    date: 'February 5-6, 2026',
    time: '10:00 AM - 6:00 PM',
    venue: 'Main Football Field',
    maxParticipants: 100,
    registeredCount: 0,
    prizePool: '₹70,000',
    rules: 'FIFA rules. Teams of 11 players + 5 substitutes.',
    coordinators: [{ name: 'Vikram Singh', contact: '9876543228' }],
    isActive: true
  },
  {
    eventName: 'Football Championship - Women',
    eventType: 'sports',
    category: 'team',
    gender: 'female',
    description: 'Football championship for female teams',
    date: 'February 10-11, 2026',
    time: '10:00 AM - 6:00 PM',
    venue: 'Main Football Field',
    maxParticipants: 70,
    registeredCount: 0,
    prizePool: '₹55,000',
    rules: 'FIFA rules. Teams of 11 players + 5 substitutes.',
    coordinators: [{ name: 'Ananya Sharma', contact: '9876543229' }],
    isActive: true
  },
  {
    eventName: 'Basketball Tournament - Men',
    eventType: 'sports',
    category: 'team',
    gender: 'male',
    description: 'Basketball tournament for men\'s teams',
    date: 'February 6, 2026',
    time: '11:00 AM - 5:00 PM',
    venue: 'Indoor Basketball Court',
    maxParticipants: 50,
    registeredCount: 0,
    prizePool: '₹50,000',
    rules: 'NBA rules. Teams of 5 players + 7 substitutes.',
    coordinators: [{ name: 'Amit Patel', contact: '9876543230' }],
    isActive: true
  },
  {
    eventName: 'Basketball Tournament - Women',
    eventType: 'sports',
    category: 'team',
    gender: 'female',
    description: 'Basketball tournament for women\'s teams',
    date: 'February 7, 2026',
    time: '11:00 AM - 5:00 PM',
    venue: 'Indoor Basketball Court',
    maxParticipants: 40,
    registeredCount: 0,
    prizePool: '₹45,000',
    rules: 'WNBA rules. Teams of 5 players + 7 substitutes.',
    coordinators: [{ name: 'Kavya Nair', contact: '9876543231' }],
    isActive: true
  },
  {
    eventName: 'Volleyball Tournament - Men',
    eventType: 'sports',
    category: 'team',
    gender: 'male',
    description: 'Volleyball championship for male teams',
    date: 'February 8, 2026',
    time: '9:00 AM - 6:00 PM',
    venue: 'Outdoor Volleyball Courts',
    maxParticipants: 48,
    registeredCount: 0,
    prizePool: '₹40,000',
    rules: 'FIVB rules. Teams of 6 players + 2 substitutes.',
    coordinators: [{ name: 'Ravi Kumar', contact: '9876543232' }],
    isActive: true
  },
  {
    eventName: 'Volleyball Tournament - Women',
    eventType: 'sports',
    category: 'team',
    gender: 'female',
    description: 'Volleyball championship for female teams',
    date: 'February 9, 2026',
    time: '9:00 AM - 6:00 PM',
    venue: 'Outdoor Volleyball Courts',
    maxParticipants: 42,
    registeredCount: 0,
    prizePool: '₹40,000',
    rules: 'FIVB rules. Teams of 6 players + 2 substitutes.',
    coordinators: [{ name: 'Meera Joshi', contact: '9876543233' }],
    isActive: true
  },

  // SPORTS EVENTS - INDIVIDUAL SPORTS
  {
    eventName: '100m Sprint - Men',
    eventType: 'sports',
    category: 'athletics',
    gender: 'male',
    description: '100 meter sprint race for men',
    date: 'February 5, 2026',
    time: '8:00 AM - 12:00 PM',
    venue: 'Athletic Track',
    maxParticipants: 40,
    registeredCount: 0,
    prizePool: '₹15,000',
    rules: 'IAAF rules apply. Multiple heats if needed.',
    coordinators: [{ name: 'Suresh Kumar', contact: '9876543234' }],
    isActive: true
  },
  {
    eventName: '100m Sprint - Women',
    eventType: 'sports',
    category: 'athletics',
    gender: 'female',
    description: '100 meter sprint race for women',
    date: 'February 5, 2026',
    time: '12:00 PM - 4:00 PM',
    venue: 'Athletic Track',
    maxParticipants: 35,
    registeredCount: 0,
    prizePool: '₹15,000',
    rules: 'IAAF rules apply. Multiple heats if needed.',
    coordinators: [{ name: 'Priya Singh', contact: '9876543235' }],
    isActive: true
  },
  {
    eventName: 'Long Jump - Men',
    eventType: 'sports',
    category: 'athletics',
    gender: 'male',
    description: 'Long jump competition for men',
    date: 'February 6, 2026',
    time: '9:00 AM - 1:00 PM',
    venue: 'Athletic Track',
    maxParticipants: 25,
    registeredCount: 0,
    prizePool: '₹12,000',
    rules: 'IAAF long jump rules. 3 attempts per participant.',
    coordinators: [{ name: 'Arjun Singh', contact: '9876543236' }],
    isActive: true
  },
  {
    eventName: 'Long Jump - Women',
    eventType: 'sports',
    category: 'athletics',
    gender: 'female',
    description: 'Long jump competition for women',
    date: 'February 6, 2026',
    time: '1:00 PM - 5:00 PM',
    venue: 'Athletic Track',
    maxParticipants: 20,
    registeredCount: 0,
    prizePool: '₹12,000',
    rules: 'IAAF long jump rules. 3 attempts per participant.',
    coordinators: [{ name: 'Anjali Gupta', contact: '9876543237' }],
    isActive: true
  },

  // SPORTS EVENTS - INDOOR SPORTS
  {
    eventName: 'Chess Championship',
    eventType: 'sports',
    category: 'indoor',
    gender: 'mixed',
    description: 'Individual chess tournament open to all',
    date: 'February 5-6, 2026',
    time: '2:00 PM - 8:00 PM',
    venue: 'Conference Hall',
    maxParticipants: 40,
    registeredCount: 0,
    prizePool: '₹20,000',
    rules: 'FIDE rules. Swiss system format.',
    coordinators: [{ name: 'Deepak Gupta', contact: '9876543238' }],
    isActive: true
  },
  {
    eventName: 'Badminton Singles - Men',
    eventType: 'sports',
    category: 'indoor',
    gender: 'male',
    description: 'Badminton singles championship for men',
    date: 'February 8, 2026',
    time: '10:00 AM - 5:00 PM',
    venue: 'Badminton Hall',
    maxParticipants: 32,
    registeredCount: 0,
    prizePool: '₹25,000',
    rules: 'BWF rules. Knockout format.',
    coordinators: [{ name: 'Rohit Sharma', contact: '9876543239' }],
    isActive: true
  },
  {
    eventName: 'Badminton Singles - Women',
    eventType: 'sports',
    category: 'indoor',
    gender: 'female',
    description: 'Badminton singles championship for women',
    date: 'February 8, 2026',
    time: '10:00 AM - 5:00 PM',
    venue: 'Badminton Hall',
    maxParticipants: 24,
    registeredCount: 0,
    prizePool: '₹25,000',
    rules: 'BWF rules. Knockout format.',
    coordinators: [{ name: 'Kavitha Rao', contact: '9876543240' }],
    isActive: true
  },
  {
    eventName: 'Table Tennis - Men',
    eventType: 'sports',
    category: 'indoor',
    gender: 'male',
    description: 'Table tennis singles for men',
    date: 'February 7, 2026',
    time: '9:00 AM - 3:00 PM',
    venue: 'Table Tennis Hall',
    maxParticipants: 30,
    registeredCount: 0,
    prizePool: '₹15,000',
    rules: 'ITTF rules. Best of 5 games.',
    coordinators: [{ name: 'Amit Verma', contact: '9876543241' }],
    isActive: true
  },
  {
    eventName: 'Table Tennis - Women',
    eventType: 'sports',
    category: 'indoor',
    gender: 'female',
    description: 'Table tennis singles for women',
    date: 'February 7, 2026',
    time: '3:00 PM - 9:00 PM',
    venue: 'Table Tennis Hall',
    maxParticipants: 24,
    registeredCount: 0,
    prizePool: '₹15,000',
    rules: 'ITTF rules. Best of 5 games.',
    coordinators: [{ name: 'Neha Singh', contact: '9876543242' }],
    isActive: true
  },

  // PARA SPORTS EVENTS
  {
    eventName: 'Para Athletics 100m - Men',
    eventType: 'parasports',
    category: 'athletics',
    gender: 'male',
    description: '100m race for differently-abled male athletes',
    date: 'February 6, 2026',
    time: '2:00 PM - 5:00 PM',
    venue: 'Athletic Track',
    maxParticipants: 15,
    registeredCount: 0,
    prizePool: '₹15,000',
    rules: 'World Para Athletics rules. Multiple classifications.',
    coordinators: [{ name: 'Ravi Patel', contact: '9876543243' }],
    isActive: true
  },
  {
    eventName: 'Para Athletics 100m - Women',
    eventType: 'parasports',
    category: 'athletics',
    gender: 'female',
    description: '100m race for differently-abled female athletes',
    date: 'February 6, 2026',
    time: '5:00 PM - 8:00 PM',
    venue: 'Athletic Track',
    maxParticipants: 12,
    registeredCount: 0,
    prizePool: '₹15,000',
    rules: 'World Para Athletics rules. Multiple classifications.',
    coordinators: [{ name: 'Sunita Devi', contact: '9876543244' }],
    isActive: true
  },
  {
    eventName: 'Wheelchair Basketball',
    eventType: 'parasports',
    category: 'team',
    gender: 'mixed',
    description: 'Basketball tournament for wheelchair users',
    date: 'February 6, 2026',
    time: '2:00 PM - 6:00 PM',
    venue: 'Adapted Sports Hall',
    maxParticipants: 40,
    registeredCount: 0,
    prizePool: '₹35,000',
    rules: 'IWBF rules apply. Mixed gender teams allowed.',
    coordinators: [{ name: 'Priya Sharma', contact: '9876543245' }],
    isActive: true
  },
  {
    eventName: 'Para Swimming 50m - Men',
    eventType: 'parasports',
    category: 'swimming',
    gender: 'male',
    description: '50m swimming for differently-abled male athletes',
    date: 'February 7, 2026',
    time: '10:00 AM - 2:00 PM',
    venue: 'University Pool',
    maxParticipants: 15,
    registeredCount: 0,
    prizePool: '₹12,000',
    rules: 'World Para Swimming rules. Multiple classifications.',
    coordinators: [{ name: 'Suresh Kumar', contact: '9876543246' }],
    isActive: true
  },
  {
    eventName: 'Para Swimming 50m - Women',
    eventType: 'parasports',
    category: 'swimming',
    gender: 'female',
    description: '50m swimming for differently-abled female athletes',
    date: 'February 7, 2026',
    time: '2:00 PM - 6:00 PM',
    venue: 'University Pool',
    maxParticipants: 10,
    registeredCount: 0,
    prizePool: '₹12,000',
    rules: 'World Para Swimming rules. Multiple classifications.',
    coordinators: [{ name: 'Lakshmi Nair', contact: '9876543247' }],
    isActive: true
  },
  {
    eventName: 'Para Powerlifting - Men',
    eventType: 'parasports',
    category: 'strength',
    gender: 'male',
    description: 'Powerlifting competition for differently-abled men',
    date: 'February 7, 2026',
    time: '11:00 AM - 5:00 PM',
    venue: 'Fitness Center',
    maxParticipants: 12,
    registeredCount: 0,
    prizePool: '₹20,000',
    rules: 'World Para Powerlifting rules. Bench press only.',
    coordinators: [{ name: 'Deepak Singh', contact: '9876543248' }],
    isActive: true
  },
  {
    eventName: 'Para Powerlifting - Women',
    eventType: 'parasports',
    category: 'strength',
    gender: 'female',
    description: 'Powerlifting competition for differently-abled women',
    date: 'February 8, 2026',
    time: '11:00 AM - 4:00 PM',
    venue: 'Fitness Center',
    maxParticipants: 8,
    registeredCount: 0,
    prizePool: '₹20,000',
    rules: 'World Para Powerlifting rules. Bench press only.',
    coordinators: [{ name: 'Meera Gupta', contact: '9876543249' }],
    isActive: true
  },
  {
    eventName: 'Para Badminton Singles',
    eventType: 'parasports',
    category: 'indoor',
    gender: 'mixed',
    description: 'Badminton singles for differently-abled athletes',
    date: 'February 8, 2026',
    time: '1:00 PM - 7:00 PM',
    venue: 'Adapted Badminton Hall',
    maxParticipants: 20,
    registeredCount: 0,
    prizePool: '₹18,000',
    rules: 'Para Badminton World Federation rules. Multiple classifications.',
    coordinators: [{ name: 'Anjali Reddy', contact: '9876543250' }],
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

    // Insert comprehensive events
    const insertedEvents = await Event.insertMany(comprehensiveEvents);
    console.log(`✅ Successfully inserted ${insertedEvents.length} events`);

    // Display detailed summary
    const sportsCount = insertedEvents.filter(e => e.eventType === 'sports').length;
    const culturalsCount = insertedEvents.filter(e => e.eventType === 'culturals').length;
    const paraSportsCount = insertedEvents.filter(e => e.eventType === 'parasports').length;
    
    // Gender breakdown
    const maleEvents = insertedEvents.filter(e => e.gender === 'male').length;
    const femaleEvents = insertedEvents.filter(e => e.gender === 'female').length;
    const mixedEvents = insertedEvents.filter(e => e.gender === 'mixed').length;
    
    console.log('\n📊 Comprehensive Event Summary:');
    console.log(`   🏃 Sports Events: ${sportsCount}`);
    console.log(`   🎭 Cultural Events: ${culturalsCount}`);
    console.log(`   ♿ Para Sports Events: ${paraSportsCount}`);
    console.log(`   📈 Total Events: ${insertedEvents.length}`);
    
    console.log('\n👥 Gender Distribution:');
    console.log(`   👨 Male Events: ${maleEvents}`);
    console.log(`   👩 Female Events: ${femaleEvents}`);
    console.log(`   👫 Mixed Gender Events: ${mixedEvents}`);

    // Category breakdown
    console.log('\n📂 Category Breakdown:');
    const categories = [...new Set(insertedEvents.map(e => e.category))];
    categories.forEach(cat => {
      const count = insertedEvents.filter(e => e.category === cat).length;
      console.log(`   ${cat}: ${count} events`);
    });

    // Disconnect
    await mongoose.disconnect();
    console.log('\n✅ Database seeding completed successfully!');
    console.log('🎉 All events with gender categories have been added!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();