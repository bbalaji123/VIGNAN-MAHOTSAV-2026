import mongoose from 'mongoose';
import Registration from '../models/Registration.js';
import EventRegistration from '../models/EventRegistration.js';

// Counter schema for atomic, sequential ID generation
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
}, {
  collection: 'counters'
});

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

// In-memory queue to serialize ID generation requests
class IdGenerationQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async enqueue(generatorFunction) {
    return new Promise((resolve, reject) => {
      this.queue.push({ generatorFunction, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    // If already processing or queue is empty, return
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const { generatorFunction, resolve, reject } = this.queue.shift();
      
      try {
        const result = await generatorFunction();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }

    this.processing = false;
  }
}

// Create separate queues for different ID types
const userIdQueue = new IdGenerationQueue();
const registrationIdQueue = new IdGenerationQueue();
const teamIdQueue = new IdGenerationQueue();

// Helper function to generate next user ID (queued + atomic counter in DB)
async function generateUserId() {
  return userIdQueue.enqueue(async () => {
    try {
      // Atomically increment a dedicated counter in MongoDB
      const counter = await Counter.findOneAndUpdate(
        { _id: 'userId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      const nextNumber = counter.seq;
      const nextUserId = `MH26${nextNumber.toString().padStart(6, '0')}`;

      return nextUserId;
    } catch (error) {
      console.error('Error generating user ID:', error);
      throw error;
    }
  });
}

// Helper function to generate registration ID for individual (queued)
async function generateRegistrationId(eventType) {
  return registrationIdQueue.enqueue(async () => {
    try {
      const prefix = eventType === 'sports' ? 'SR' : eventType === 'culturals' ? 'CR' : 'ER';
      const lastRegistration = await EventRegistration.findOne({ registrationType: 'individual' })
        .sort({ createdAt: -1 })
        .select('registrationId');
      
      if (!lastRegistration || !lastRegistration.registrationId) {
        return `${prefix}26000001`;
      }
      
      const lastNumber = parseInt(lastRegistration.registrationId.substring(2));
      const nextNumber = lastNumber + 1;
      return `${prefix}${nextNumber.toString().padStart(8, '0')}`;
    } catch (error) {
      console.error('Error generating registration ID:', error);
      throw error;
    }
  });
}

// Helper function to generate team ID (queued)
async function generateTeamId(eventType) {
  return teamIdQueue.enqueue(async () => {
    try {
      const prefix = eventType === 'sports' ? 'ST' : eventType === 'culturals' ? 'CT' : 'ET';
      const lastTeam = await EventRegistration.findOne({ registrationType: 'team' })
        .sort({ createdAt: -1 })
        .select('teamId');
      
      if (!lastTeam || !lastTeam.teamId) {
        return `${prefix}26000001`;
      }
      
      const lastNumber = parseInt(lastTeam.teamId.substring(2));
      const nextNumber = lastNumber + 1;
      return `${prefix}${nextNumber.toString().padStart(8, '0')}`;
    } catch (error) {
      console.error('Error generating team ID:', error);
      throw error;
    }
  });
}

export {
  generateUserId,
  generateRegistrationId,
  generateTeamId
};
