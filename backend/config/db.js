import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'test',
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Socket timeout
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error('\n⚠️  CONNECTION FAILED - Possible reasons:');
    console.error('1. IP address not whitelisted in MongoDB Atlas');
    console.error('2. Check Network Access settings at: https://cloud.mongodb.com');
    console.error('3. Your current IP: Run "ipconfig" or check https://api.ipify.org\n');
    process.exit(1);
  }
};

export default connectDB;
