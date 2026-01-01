import mongoose from 'mongoose';

const campusAmbassadorSchema = new mongoose.Schema({
  mcaId: {
    type: String,
    required: true,
    unique: true,
    match: /^MCA\d{6}$/
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
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  college: {
    type: String,
    required: true,
    trim: true
  },
  branch: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  district: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  referrals: [{
    userId: {
      type: String,
      required: true
    },
    userName: {
      type: String
    },
    userEmail: {
      type: String
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    pointsAwarded: {
      type: Boolean,
      default: false
    }
  }],
  caReferralList: [{
    mcaId: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    college: {
      type: String
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    pointsAwarded: {
      type: Number,
      default: 20
    }
  }],
  totalPoints: {
    type: Number,
    default: 0
  },
  tier: {
    type: String,
    enum: ['none', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'],
    default: 'none'
  },
  totalReferrals: {
    type: Number,
    default: 0
  },
  paidReferrals: {
    type: Number,
    default: 0
  },
  pendingReferrals: {
    type: Number,
    default: 0
  },
  caReferrals: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Method to update tier based on points
campusAmbassadorSchema.methods.updateTier = function() {
  if (this.totalPoints >= 250) {
    this.tier = 'Diamond';
  } else if (this.totalPoints >= 200) {
    this.tier = 'Platinum';
  } else if (this.totalPoints >= 200) {
    this.tier = 'Gold';
  } else if (this.totalPoints >= 150) {
    this.tier = 'Silver';
  } else if (this.totalPoints >= 100) {
    this.tier = 'Bronze';
  } else {
    this.tier = 'none';
  }
  return this.tier;
};

// Method to add referral and update points
campusAmbassadorSchema.methods.addReferral = function(userId, userName, userEmail) {
  this.referrals.push({
    userId,
    userName,
    userEmail,
    paymentStatus: 'pending'
  });
  this.totalReferrals += 1;
  this.pendingReferrals += 1;
  return this.save();
};

// Method to update payment status and award points
campusAmbassadorSchema.methods.updatePaymentStatus = async function(userId, paymentStatus) {
  const referral = this.referrals.find(r => r.userId === userId);
  
  if (!referral) {
    throw new Error('Referral not found');
  }
  
  const oldStatus = referral.paymentStatus;
  referral.paymentStatus = paymentStatus;
  
  // Award points only when payment is marked as paid
  if (paymentStatus === 'paid' && !referral.pointsAwarded) {
    this.totalPoints += 5; // 5 points per paid referral
    referral.pointsAwarded = true;
    this.paidReferrals += 1;
    if (oldStatus === 'pending') {
      this.pendingReferrals -= 1;
    }
    this.updateTier();
  }
  
  // Remove points if payment was paid but now changed to pending/failed
  if (oldStatus === 'paid' && paymentStatus !== 'paid' && referral.pointsAwarded) {
    this.totalPoints -= 5;
    referral.pointsAwarded = false;
    this.paidReferrals -= 1;
    if (paymentStatus === 'pending') {
      this.pendingReferrals += 1;
    }
    this.updateTier();
  }
  
  return this.save();
};

const CampusAmbassador = mongoose.model('CampusAmbassador', campusAmbassadorSchema);

export default CampusAmbassador;
