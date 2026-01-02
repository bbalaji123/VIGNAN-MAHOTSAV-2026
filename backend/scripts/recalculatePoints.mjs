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

async function recalculatePoints() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'test' });
    console.log('Connected to MongoDB\n');

    const ambassadors = await CampusAmbassador.find({ isActive: true });

    if (ambassadors.length === 0) {
      console.log('❌ No Campus Ambassadors found.');
      process.exit(0);
    }

    console.log('🔄 Recalculating points based on actual referrals...\n');

    for (const ca of ambassadors) {
      // Calculate points from referrals
      const calculatedPoints = ca.referrals.reduce((sum, ref) => sum + (ref.points || 0), 0);
      
      console.log(`${ca.name} (${ca.mcaId}):`);
      console.log(`  Current Points in DB: ${ca.points}`);
      console.log(`  Referrals: ${ca.referrals.length}`);
      console.log(`  Calculated Points from Referrals: ${calculatedPoints}`);
      
      // Update to correct points
      await CampusAmbassador.updateOne(
        { _id: ca._id },
        { $set: { points: calculatedPoints } }
      );
      
      console.log(`  ✅ Updated to: ${calculatedPoints} points\n`);
    }

    console.log('═'.repeat(60));
    console.log('✅ Points recalculation complete!\n');

    // Show updated leaderboard
    const updated = await CampusAmbassador.find({ isActive: true })
      .sort({ points: -1 })
      .select('mcaId name points referrals');

    console.log('🏆 UPDATED LEADERBOARD (Based on Actual Referrals)');
    console.log('═'.repeat(60));
    
    updated.forEach((ca, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
      console.log(`${medal.padEnd(6)} ${ca.name.padEnd(30)} ${ca.points} points (${ca.referrals.length} referrals)`);
    });

    console.log('═'.repeat(60));

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

recalculatePoints();
