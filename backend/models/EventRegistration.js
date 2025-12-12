import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema({
  registrationId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  registrationType: {
    type: String,
    enum: ['individual', 'team'],
    required: true
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
    required: true
  },
  // Individual Registration Fields
  userId: {
    type: String,
    trim: true
  },
  participantName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  college: {
    type: String,
    trim: true
  },
  // Team Registration Fields
  teamId: {
    type: String,
    trim: true
  },
  teamName: {
    type: String,
    trim: true
  },
  captain: {
    userId: String,
    name: String,
    email: String,
    phone: String,
    college: String
  },
  teamMembers: [{
    userId: String,
    name: String,
    email: String,
    phone: String,
    college: String,
    role: String // captain, member
  }],
  teamSize: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'unpaid'],
    default: 'unpaid'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  }
}, {
  collection: 'eventRegistrations',
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create compound indexes for better query performance and duplicate prevention
eventRegistrationSchema.index({ eventId: 1, userId: 1, registrationType: 1 });
eventRegistrationSchema.index({ eventId: 1, 'captain.userId': 1, registrationType: 1 });
eventRegistrationSchema.index({ createdAt: -1 }); // For ID generation sorting
eventRegistrationSchema.index({ registrationId: 1 }, { unique: true }); // Ensure unique registration IDs
eventRegistrationSchema.index({ teamId: 1 }, { sparse: true }); // For team lookups

const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);

export default EventRegistration;
