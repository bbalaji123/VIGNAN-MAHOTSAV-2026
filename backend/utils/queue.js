import Queue from 'bull';
import Redis from 'ioredis';

// Redis connection
let redisClient;
let emailQueue;

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

    console.log('Redis queue initialized successfully');
    
  } catch (error) {
    console.error('Failed to initialize queue:', error);
    // Fallback to direct processing if Redis is not available
  }
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
  redisClient,
  emailQueue
};