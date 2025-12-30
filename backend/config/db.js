import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('🔄 Connecting to MongoDB...');
    
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

    // Clean up stale indexes that might cause issues
    try {
      const participantsCollection = conn.connection.collection('participants');
      const indexes = await participantsCollection.indexes();
      
      // Check for stale participantId index
      const staleIndex = indexes.find(idx => idx.name === 'participantId_1');
      if (staleIndex) {
        console.log('🧹 Found stale participantId_1 index, dropping it...');
        await participantsCollection.dropIndex('participantId_1');
        console.log('✅ Stale index dropped successfully!');
      }
    } catch (indexError) {
      // Index might not exist, which is fine
      if (indexError.code !== 27) { // 27 = IndexNotFound
        console.log('⚠️  Index cleanup note:', indexError.message);
      }
    }
    
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
    console.error('1. 🔑 Verify your MongoDB credentials are correct');
    console.error('2. 🌐 Check if MongoDB server is running and accessible');
    console.error('3. 🔗 Verify the MONGODB_URI in your .env file');
    console.error('4. 🌍 Check your network/firewall settings\n');
    process.exit(1);
  }
};

export default connectDB;
