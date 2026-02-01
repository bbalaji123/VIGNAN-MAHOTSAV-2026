import mongoose from 'mongoose';

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'test',
    serverSelectionTimeoutMS: 120000, // Increase timeout to 120 seconds
    socketTimeoutMS: 120000, // Socket timeout
    connectTimeoutMS: 120000, // Connection timeout
    maxPoolSize: 20, // Maintain up to 20 socket connections
    minPoolSize: 2, // Maintain a minimum of 2 socket connections
    maxIdleTimeMS: 60000, // Close connections after 60 seconds of inactivity
    bufferCommands: false, // Disable mongoose buffering - CRITICAL for error detection
    retryWrites: true, // Enable automatic retry of write operations
    retryReads: true, // Enable automatic retry of read operations
  });

  console.log(`✅ Database Host: ${conn.connection.host}`);
  console.log(`✅ Database Name: ${conn.connection.name}`);

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
      console.log('ℹ️ Index cleanup note:', indexError.message);
    }
  }

  // Handle connection events (these persist after initial connection)
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected - will attempt to reconnect');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected successfully');
  });

  return conn;
};

export default connectDB;
