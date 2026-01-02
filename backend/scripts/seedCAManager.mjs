import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import CAManager from '../models/CAManager.js';
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

const seedCAManager = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'test' });
    console.log('Connected to MongoDB');

    // Check if manager already exists
    const existingManager = await CAManager.findOne({ email: 'bandaruakash8@gmail.com' });
    
    if (existingManager) {
      console.log('✅ CA Manager already exists!');
      console.log(`   Email: ${existingManager.email}`);
      console.log(`   Name: ${existingManager.name}`);
      console.log(`   Created: ${existingManager.createdAt}`);
      await mongoose.connection.close();
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('Naidu@akash', 10);

    // Create CA Manager
    const manager = new CAManager({
      email: 'bandaruakash8@gmail.com',
      password: hashedPassword,
      name: 'Akash - CA Manager',
      isActive: true
    });

    const saved = await manager.save();
    
    console.log('✅ CA Manager created successfully!');
    console.log(`   ID: ${saved._id}`);
    console.log(`   Email: ${saved.email}`);
    console.log(`   Name: ${saved.name}`);
    console.log(`   Password: CAmanager@1 (use this to login)`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding CA Manager:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedCAManager();
