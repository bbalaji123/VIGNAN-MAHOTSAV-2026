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
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'registrations'
});

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
