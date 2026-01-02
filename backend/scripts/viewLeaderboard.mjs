import mongoose from 'mongoose';
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

async function viewLeaderboard() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'test' });
    console.log('Connected to MongoDB\n');

    const ambassadors = await CampusAmbassador.find({ isActive: true })
      .sort({ points: -1 })
      .select('mcaId name college points referrals');

    if (ambassadors.length === 0) {
      console.log('❌ No Campus Ambassadors found in the database.');
      console.log('\nTo add test data, run: node backend/scripts/seedTestCAs.mjs');
      process.exit(0);
    }

    console.log('🏆 CAMPUS AMBASSADOR LEADERBOARD 🏆\n');
    console.log('═'.repeat(80));
    
    ambassadors.forEach((ca, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
      const bar = '█'.repeat(Math.floor(ca.points / 10));
      
      console.log(`\n${medal.padEnd(6)} ${ca.name.padEnd(25)} ${ca.mcaId}`);
      console.log(`        College: ${ca.college}`);
      console.log(`        Points: ${ca.points} | Referrals: ${ca.referrals.length}`);
      console.log(`        ${bar}`);
    });

    console.log('\n' + '═'.repeat(80));
    console.log(`\nTotal Active Ambassadors: ${ambassadors.length}`);
    console.log(`Total Points Distributed: ${ambassadors.reduce((sum, ca) => sum + ca.points, 0)}`);
    console.log(`Total Referrals: ${ambassadors.reduce((sum, ca) => sum + ca.referrals.length, 0)}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

viewLeaderboard();
