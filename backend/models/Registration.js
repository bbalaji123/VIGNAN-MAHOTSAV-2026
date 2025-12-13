import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
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
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
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
    type: String,
    trim: true
  },
  gender: {
    type: String,
    trim: true
  },
  registerId: {
    type: String,
    trim: true
  },
  referenceId: {
    type: String,
    trim: true
  },
  userType: {
    type: String,
    enum: ['visitor', 'participant'],
    default: 'visitor'
  },
  participationType: {
    type: String,
    enum: ['sports', 'culturals', 'none'],
    default: 'none'
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'unpaid'],
    default: 'unpaid'
  },
  amount: {
    type: Number,
    default: 250
  }
}, {
  collection: 'registrations',
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create indexes for better performance and duplicate prevention
registrationSchema.index({ email: 1 }, { unique: true }); // Prevent duplicate emails
registrationSchema.index({ userId: 1 }, { unique: true }); // Ensure unique user IDs
registrationSchema.index({ createdAt: -1 }); // For ID generation sorting

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
