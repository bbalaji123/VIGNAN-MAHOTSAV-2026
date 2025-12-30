import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  college: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  registerId: {
    type: String,
    trim: true
  },
  referenceId: {
    type: String,
    trim: true
  },
  participantType: {
    type: String,
    default: 'general',
    trim: true
  },
  referredBy: {
    type: String,
    trim: true,
    default: null
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  registeredEvents: [{
    eventCode: {
      type: String,
      required: true
    },
    eventId: String,
    eventName: String,
    eventType: String,
    category: String,
    description: String,
    fee: Number,
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }],
  registeredAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'participants'
});

const Participant = mongoose.model('Participant', participantSchema);

export default Participant;
