import mongoose from 'mongoose';

const userEventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true, // One document per user
    trim: true
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  // Array of all registered events for this user
  registeredEvents: [{
    registrationId: {
      type: String,
      required: true
    },
    registrationType: {
      type: String,
      enum: ['individual', 'team'],
      default: 'individual'
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
      enum: ['sports', 'culturals', 'technical', 'literary', 'parasports'],
      required: true
    },
    // For individual registrations
    participantName: String,
    phone: String,
    college: String,
    // For team registrations
    teamId: String,
    teamName: String,
    teamRole: {
      type: String,
      enum: ['captain', 'member', 'none'],
      default: 'none'
    },
    captain: {
      userId: String,
      name: String,
      email: String
    },
    teamMembers: [{
      userId: String,
      name: String,
      email: String,
      phone: String,
      role: String
    }],
    teamSize: Number,
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'confirmed'
    }
  }]
}, {
  collection: 'userEvents',
  timestamps: true
});

// Create indexes for efficient querying
userEventSchema.index({ 'registeredEvents.eventId': 1 });
userEventSchema.index({ 'registeredEvents.registrationId': 1 });

const UserEvent = mongoose.model('UserEvent', userEventSchema);

export default UserEvent;
