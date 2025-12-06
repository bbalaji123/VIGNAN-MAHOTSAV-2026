import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('🔄 Connecting to MongoDB...');
    console.log(`📍 Your current IP: 103.208.230.77`);
    console.log('💡 Make sure this IP is whitelisted in MongoDB Atlas Network Access');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'test',
      serverSelectionTimeoutMS: 60000, // Increase timeout to 60 seconds
      socketTimeoutMS: 75000, // Socket timeout
      connectTimeoutMS: 60000, // Connection timeout
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 5, // Maintain a minimum of 5 socket connections
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
    });
    
    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`🗄️  Database Host: ${conn.connection.host}`);
    console.log(`📚 Database Name: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });
    
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('\n⚠️  CONNECTION FAILED - Possible solutions:');
    console.error('1. 🌐 Whitelist your IP (103.208.230.77) in MongoDB Atlas Network Access');
    console.error('2. 🔗 Check Network Access settings at: https://cloud.mongodb.com');
    console.error('3. 🔑 Verify your MongoDB credentials are correct');
    console.error('4. 🌍 Check if you can access internet/MongoDB Atlas from your network');
    console.error('5. 🔄 Try restarting your internet connection\n');
    process.exit(1);
  }
};

export default connectDB;
