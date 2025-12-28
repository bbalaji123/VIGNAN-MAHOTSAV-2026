import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true
  },
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  eventType: {
    type: String,
    enum: ['sports', 'culturals', 'other'],
    required: true
  },
  registrationType: {
    type: String,
    enum: ['individual', 'team'],
    required: true
  },
  registrationId: {
    type: String,
    trim: true
  },
  teamId: {
    type: String,
    trim: true
  },
  teamName: {
    type: String,
    trim: true
  },
  teamMembers: [{
    userId: String,
    name: String,
    email: String,
    phone: String
  }],
  paymentStatus: {
    type: String,
    enum: ['paid', 'unpaid', 'pending'],
    default: 'unpaid'
  },
  participantDetails: {
    name: String,
    email: String,
    phone: String,
    college: String
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Index for efficient querying
eventRegistrationSchema.index({ userId: 1 });
eventRegistrationSchema.index({ registrationType: 1, createdAt: -1 });
eventRegistrationSchema.index({ eventName: 1 });

const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);

export default EventRegistration;
