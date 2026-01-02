import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const CampusAmbassadorSchema = new mongoose.Schema({
  mcaId: { type: String, required: true, unique: true },
  registrationNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  whatsapp: { type: String, required: true },
  college: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  points: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  referrals: [{
    userId: String,
    userName: String,
    userCollege: String,
    registeredAt: Date,
    points: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

const CampusAmbassador = mongoose.model('CampusAmbassador', CampusAmbassadorSchema);

const testCAs = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@college.edu',
    password: 'Password123',
    registrationNumber: 'REG2024001',
    whatsapp: '+919876543210',
    college: 'Indian Institute of Technology, Delhi',
    state: 'Delhi',
    district: 'New Delhi',
    points: 250,
    referrals: [
      { userId: 'MH240001', userName: 'Amit Sharma', userCollege: 'IIT Delhi', registeredAt: new Date('2024-11-15'), points: 50 },
      { userId: 'MH240002', userName: 'Priya Singh', userCollege: 'IIT Delhi', registeredAt: new Date('2024-11-18'), points: 50 },
      { userId: 'MH240003', userName: 'Vikram Patel', userCollege: 'IIT Delhi', registeredAt: new Date('2024-11-22'), points: 50 },
      { userId: 'MH240004', userName: 'Neha Gupta', userCollege: 'IIT Delhi', registeredAt: new Date('2024-12-01'), points: 50 },
      { userId: 'MH240005', userName: 'Rahul Verma', userCollege: 'IIT Delhi', registeredAt: new Date('2024-12-05'), points: 50 }
    ]
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@college.edu',
    password: 'Password123',
    registrationNumber: 'REG2024002',
    whatsapp: '+919876543211',
    college: 'Lovely Professional University',
    state: 'Punjab',
    district: 'Jalandhar',
    points: 200,
    referrals: [
      { userId: 'MH240006', userName: 'Simran Kaur', userCollege: 'LPU', registeredAt: new Date('2024-11-20'), points: 50 },
      { userId: 'MH240007', userName: 'Harpreet Singh', userCollege: 'LPU', registeredAt: new Date('2024-11-25'), points: 50 },
      { userId: 'MH240008', userName: 'Ananya Reddy', userCollege: 'LPU', registeredAt: new Date('2024-12-03'), points: 50 },
      { userId: 'MH240009', userName: 'Karan Mehta', userCollege: 'LPU', registeredAt: new Date('2024-12-10'), points: 50 }
    ]
  },
  {
    name: 'Arjun Menon',
    email: 'arjun.menon@college.edu',
    password: 'Password123',
    registrationNumber: 'REG2024003',
    whatsapp: '+919876543212',
    college: 'National Institute of Technology, Trichy',
    state: 'Tamil Nadu',
    district: 'Tiruchirappalli',
    points: 150,
    referrals: [
      { userId: 'MH240010', userName: 'Divya Krishnan', userCollege: 'NIT Trichy', registeredAt: new Date('2024-11-28'), points: 50 },
      { userId: 'MH240011', userName: 'Suresh Kumar', userCollege: 'NIT Trichy', registeredAt: new Date('2024-12-02'), points: 50 },
      { userId: 'MH240012', userName: 'Lakshmi Iyer', userCollege: 'NIT Trichy', registeredAt: new Date('2024-12-08'), points: 50 }
    ]
  },
  {
    name: 'Sneha Patel',
    email: 'sneha.patel@college.edu',
    password: 'Password123',
    registrationNumber: 'REG2024004',
    whatsapp: '+919876543213',
    college: 'Manipal Institute of Technology',
    state: 'Karnataka',
    district: 'Udupi',
    points: 100,
    referrals: [
      { userId: 'MH240013', userName: 'Rohan D\'Souza', userCollege: 'MIT Manipal', registeredAt: new Date('2024-12-05'), points: 50 },
      { userId: 'MH240014', userName: 'Aisha Khan', userCollege: 'MIT Manipal', registeredAt: new Date('2024-12-12'), points: 50 }
    ]
  },
  {
    name: 'Aditya Singh',
    email: 'aditya.singh@college.edu',
    password: 'Password123',
    registrationNumber: 'REG2024005',
    whatsapp: '+919876543214',
    college: 'Banaras Hindu University',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    points: 50,
    referrals: [
      { userId: 'MH240015', userName: 'Ankit Yadav', userCollege: 'BHU', registeredAt: new Date('2024-12-15'), points: 50 }
    ]
  },
  {
    name: 'Kavya Nair',
    email: 'kavya.nair@college.edu',
    password: 'Password123',
    registrationNumber: 'REG2024006',
    whatsapp: '+919876543215',
    college: 'Christ University',
    state: 'Karnataka',
    district: 'Bangalore Urban',
    points: 75,
    referrals: [
      { userId: 'MH240016', userName: 'Thomas Joseph', userCollege: 'Christ University', registeredAt: new Date('2024-12-10'), points: 50 }
    ]
  },
  {
    name: 'Vikram Reddy',
    email: 'vikram.reddy@college.edu',
    password: 'Password123',
    registrationNumber: 'REG2024007',
    whatsapp: '+919876543216',
    college: 'BITS Pilani, Hyderabad Campus',
    state: 'Telangana',
    district: 'Hyderabad',
    points: 125,
    referrals: [
      { userId: 'MH240017', userName: 'Sai Kiran', userCollege: 'BITS Hyderabad', registeredAt: new Date('2024-12-01'), points: 50 },
      { userId: 'MH240018', userName: 'Meera Chowdhary', userCollege: 'BITS Hyderabad', registeredAt: new Date('2024-12-07'), points: 50 }
    ]
  },
  {
    name: 'Meera Desai',
    email: 'meera.desai@college.edu',
    password: 'Password123',
    registrationNumber: 'REG2024008',
    whatsapp: '+919876543217',
    college: 'Ahmedabad University',
    state: 'Gujarat',
    district: 'Ahmedabad',
    points: 175,
    referrals: [
      { userId: 'MH240019', userName: 'Jay Shah', userCollege: 'Ahmedabad University', registeredAt: new Date('2024-11-30'), points: 50 },
      { userId: 'MH240020', userName: 'Riya Patel', userCollege: 'Ahmedabad University', registeredAt: new Date('2024-12-04'), points: 50 },
      { userId: 'MH240021', userName: 'Dhruv Modi', userCollege: 'Ahmedabad University', registeredAt: new Date('2024-12-11'), points: 50 }
    ]
  }
];

async function seedTestCAs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'test' });
    console.log('Connected to MongoDB');

    // Clear existing test CAs (optional)
    const existingCount = await CampusAmbassador.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing Campus Ambassadors`);
      console.log('Skipping seed. Delete existing CAs first if you want to reset.');
      process.exit(0);
    }

    let mcaIdCounter = 1;

    for (const caData of testCAs) {
      const hashedPassword = await bcrypt.hash(caData.password, 10);
      const mcaId = `MCA${String(mcaIdCounter).padStart(6, '0')}`;
      
      const ca = new CampusAmbassador({
        ...caData,
        mcaId,
        password: hashedPassword,
        isActive: true
      });

      await ca.save();
      console.log(`✅ Created: ${ca.name} (${ca.mcaId}) - ${ca.points} points`);
      mcaIdCounter++;
    }

    console.log('\n🎉 Successfully seeded test Campus Ambassadors!');
    console.log(`Total CAs created: ${testCAs.length}`);
    console.log('\nTop performers:');
    const sorted = [...testCAs].sort((a, b) => b.points - a.points);
    sorted.slice(0, 3).forEach((ca, i) => {
      console.log(`  ${i + 1}. ${ca.name} - ${ca.points} points`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding test data:', error.message);
    process.exit(1);
  }
}

seedTestCAs();
