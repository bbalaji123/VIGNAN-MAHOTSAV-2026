import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  eventType: {
    type: String,
    enum: ['sports', 'culturals', 'technical', 'literary', 'parasports'],
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'mixed'],
    trim: true
  },
  date: {
    type: String,
    trim: true
  },
  time: {
    type: String,
    trim: true
  },
  venue: {
    type: String,
    trim: true
  },
  maxParticipants: {
    type: Number,
    default: 0
  },
  registeredCount: {
    type: Number,
    default: 0
  },
  prizePool: {
    type: String,
    trim: true
  },
  rules: {
    type: String,
    trim: true
  },
  coordinators: [{
    name: String,
    contact: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'events'
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
