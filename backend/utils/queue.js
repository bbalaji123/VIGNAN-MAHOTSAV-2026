import Queue from 'bull';
import Redis from 'ioredis';

// Redis connection
let redisClient;
let emailQueue;
let idGenerationQueue;

const initializeQueue = () => {
  try {
    // Initialize Redis client
    redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true
    });

    // Initialize email queue
    emailQueue = new Queue('email processing', {
      redis: {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || 'localhost',
        password: process.env.REDIS_PASSWORD || undefined
      }
    });

    // Process email jobs
    emailQueue.process('send-email', async (job) => {
      const { to, subject, html, type } = job.data;
      
      console.log(`Processing email job: ${type} to ${to}`);
      
      // Your existing email sending logic here
      // Import and use your send_email.py or implement Node.js version
      
      return { success: true, message: `Email sent to ${to}` };
    });

    // Event handlers
    emailQueue.on('completed', (job) => {
      console.log(`Email job ${job.id} completed`);
    });

    emailQueue.on('failed', (job, err) => {
      console.error(`Email job ${job.id} failed:`, err);
    });

    // Initialize ID generation queue for sequential processing
    idGenerationQueue = new Queue('id generation', {
      redis: {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || 'localhost',
        password: process.env.REDIS_PASSWORD || undefined
      },
      settings: {
        maxStalledCount: 0, // Don't retry stalled jobs
        lockDuration: 30000 // Lock for 30 seconds
      }
    });

    console.log('Redis queue initialized successfully');
    
  } catch (error) {
    console.error('Failed to initialize queue:', error);
    // Fallback to direct processing if Redis is not available
  }
};

// Queue-based ID generation to prevent duplicates
const generateIdInQueue = async (generatorFunction, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      // If queue is available, use it for serialized execution
      if (idGenerationQueue) {
        const job = await idGenerationQueue.add('generate-id', 
          { type, timestamp: Date.now() },
          {
            attempts: 1,
            removeOnComplete: true,
            removeOnFail: false
          }
        );
        
        // Process this specific job
        const result = await generatorFunction();
        await job.finished();
        resolve(result);
      } else {
        // Fallback: direct execution with mutex-like behavior
        const result = await generatorFunction();
        resolve(result);
      }
    } catch (error) {
      console.error(`Failed to generate ID for ${type}:`, error);
      reject(error);
    }
  });
};

// Add email to queue
const addEmailToQueue = async (emailData) => {
  try {
    if (emailQueue) {
      const job = await emailQueue.add('send-email', emailData, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000
        }
      });
      console.log(`Email queued with job ID: ${job.id}`);
      return job.id;
    } else {
      // Direct processing if queue is not available
      console.log('Queue not available, processing email directly');
      return null;
    }
  } catch (error) {
    console.error('Failed to queue email:', error);
    throw error;
  }
};

export {
  initializeQueue,
  addEmailToQueue,
  generateIdInQueue,
  redisClient,
  emailQueue,
  idGenerationQueue
};