import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

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

// Points to distribute (will be assigned to random CAs)
const pointsDistribution = [250, 200, 150, 100, 75, 50, 25, 10];

async function addTestPoints() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'test' });
    console.log('Connected to MongoDB\n');

    const ambassadors = await CampusAmbassador.find({ isActive: true }).sort({ _id: 1 });

    if (ambassadors.length === 0) {
      console.log('❌ No Campus Ambassadors found in the database.');
      process.exit(0);
    }

    console.log('🎯 Adding test points to Campus Ambassadors...\n');

    for (let i = 0; i < Math.min(ambassadors.length, pointsDistribution.length); i++) {
      const ca = ambassadors[i];
      const points = pointsDistribution[i];
      
      await CampusAmbassador.updateOne(
        { _id: ca._id },
        { $set: { points: points } }
      );
      
      console.log(`✅ ${ca.name} (${ca.mcaId}): ${points} points`);
    }

    console.log('\n🏆 Points distribution complete!\n');

    // Show updated leaderboard
    const updated = await CampusAmbassador.find({ isActive: true })
      .sort({ points: -1 })
      .select('mcaId name points');

    console.log('═'.repeat(60));
    console.log('UPDATED LEADERBOARD');
    console.log('═'.repeat(60));
    
    updated.forEach((ca, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
      console.log(`${medal.padEnd(6)} ${ca.name.padEnd(30)} ${ca.points} points`);
    });

    console.log('═'.repeat(60));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addTestPoints();
