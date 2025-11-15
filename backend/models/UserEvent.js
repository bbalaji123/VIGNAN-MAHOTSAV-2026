import mongoose from 'mongoose';

const userEventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  eventName: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    enum: ['sports', 'culturals', 'technical', 'literary'],
    required: true
  },
  savedAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'userEvents'
});

// Create compound index to prevent duplicate entries
userEventSchema.index({ userId: 1, eventId: 1 }, { unique: true });

const UserEvent = mongoose.model('UserEvent', userEventSchema);

export default UserEvent;
