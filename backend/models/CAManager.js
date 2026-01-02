import mongoose from 'mongoose';

const actionLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ['points_increase', 'points_decrease', 'dismiss', 'activate', 'login', 'logout']
  },
  targetCAId: {
    type: String
  },
  targetCAName: {
    type: String
  },
  oldValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now
  },
  notes: String
});

const caManagerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'CA Manager'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  actionLogs: [actionLogSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Method to log actions
caManagerSchema.methods.logAction = function(action, targetCAId, targetCAName, oldValue, newValue, notes) {
  this.actionLogs.push({
    action,
    targetCAId,
    targetCAName,
    oldValue,
    newValue,
    notes,
    timestamp: new Date()
  });
  return this.save();
};

const CAManager = mongoose.model('CAManager', caManagerSchema, 'ca-manager');

export default CAManager;
