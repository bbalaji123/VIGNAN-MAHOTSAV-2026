import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CampusAmbassador from '../models/CampusAmbassador.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Generate next MCA ID
const generateMCAId = async () => {
  try {
    const lastCA = await CampusAmbassador.findOne({}, { mcaId: 1 }).sort({ mcaId: -1 }).limit(1);
    
    if (!lastCA) {
      return 'MCA260001';
    }
    
    const lastNumber = parseInt(lastCA.mcaId.substring(3));
    const nextNumber = lastNumber + 1;
    return `MCA${nextNumber.toString().padStart(6, '0')}`;
  } catch (error) {
    logger.error('Error generating MCA ID:', error);
    throw error;
  }
};

// Campus Ambassador Signup
router.post('/campus-ambassador/signup', async (req, res) => {
  try {
    const { name, email, password, phone, college, branch, state, district, dateOfBirth, referralCode } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone || !college) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if email already exists
    const existingCA = await CampusAmbassador.findOne({ email: email.toLowerCase() });
    if (existingCA) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered as Campus Ambassador'
      });
    }

    // Validate referral code if provided
    let referringCA = null;
    if (referralCode) {
      referringCA = await CampusAmbassador.findOne({ mcaId: referralCode.toUpperCase() });
      if (!referringCA) {
        return res.status(400).json({
          success: false,
          message: 'Invalid referral code. Please check the MCA ID and try again.'
        });
      }
      
      // Check if referring CA is from the same college
      if (referringCA.college.toLowerCase() === college.toLowerCase()) {
        return res.status(400).json({
          success: false,
          message: 'Cannot use referral code from a Campus Ambassador of your own college. Please use a referral code from a CA at a different college.'
        });
      }
    }

    // Generate MCA ID
    const mcaId = await generateMCAId();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new Campus Ambassador
    const newCA = new CampusAmbassador({
      mcaId,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      college,
      branch,
      state,
      district,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined
    });

    await newCA.save();

    // Award 20 points to referring Campus Ambassador if referral code was used
    if (referringCA) {
      referringCA.totalPoints += 20;
      referringCA.caReferrals = (referringCA.caReferrals || 0) + 1;
      
      // Add to caReferralList
      referringCA.caReferralList = referringCA.caReferralList || [];
      referringCA.caReferralList.push({
        mcaId: newCA.mcaId,
        name: newCA.name,
        email: newCA.email,
        college: newCA.college,
        registeredAt: new Date(),
        pointsAwarded: 20
      });
      
      referringCA.updateTier();
      await referringCA.save();
      logger.info(`Awarded 20 points to ${referringCA.mcaId} for CA referral: ${mcaId}`);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        mcaId: newCA.mcaId,
        email: newCA.email,
        userType: 'campusAmbassador'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    logger.info(`New Campus Ambassador registered: ${mcaId}${referralCode ? ` (Referred by: ${referralCode})` : ''}`);

    res.status(201).json({
      success: true,
      message: 'Campus Ambassador registered successfully',
      token,
      campusAmbassador: {
        mcaId: newCA.mcaId,
        name: newCA.name,
        email: newCA.email,
        college: newCA.college,
        totalPoints: newCA.totalPoints,
        tier: newCA.tier
      }
    });
  } catch (error) {
    logger.error('Campus Ambassador signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// Campus Ambassador Login
router.post('/campus-ambassador/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide MCA ID/email and password'
      });
    }

    // Find CA by MCA ID or email
    const ca = await CampusAmbassador.findOne({
      $or: [
        { mcaId: identifier.toUpperCase() },
        { email: identifier.toLowerCase() }
      ]
    });

    if (!ca) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if CA is active
    if (!ca.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, ca.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        mcaId: ca.mcaId,
        email: ca.email,
        userType: 'campusAmbassador'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    logger.info(`Campus Ambassador logged in: ${ca.mcaId}`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      campusAmbassador: {
        mcaId: ca.mcaId,
        name: ca.name,
        email: ca.email,
        college: ca.college,
        totalPoints: ca.totalPoints,
        tier: ca.tier,
        totalReferrals: ca.totalReferrals,
        paidReferrals: ca.paidReferrals,
        pendingReferrals: ca.pendingReferrals
      }
    });
  } catch (error) {
    logger.error('Campus Ambassador login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// Get Campus Ambassador Dashboard Data
router.get('/campus-ambassador/dashboard/:mcaId', async (req, res) => {
  try {
    const { mcaId } = req.params;

    const ca = await CampusAmbassador.findOne({ mcaId: mcaId.toUpperCase() });

    if (!ca) {
      return res.status(404).json({
        success: false,
        message: 'Campus Ambassador not found'
      });
    }

    res.status(200).json({
      mcaId: ca.mcaId,
      name: ca.name,
      email: ca.email,
      college: ca.college,
      totalPoints: ca.totalPoints,
      tier: ca.tier,
      totalReferrals: ca.totalReferrals,
      paidReferrals: ca.paidReferrals,
      pendingReferrals: ca.pendingReferrals,
      caReferrals: ca.caReferrals || 0,
      referrals: ca.referrals.map(r => ({
          userId: r.userId,
          userName: r.userName,
          userEmail: r.userEmail,
          registeredAt: r.registeredAt,
          paymentStatus: r.paymentStatus,
          pointsAwarded: r.pointsAwarded ? 5 : 0
        })),
      caReferralList: (ca.caReferralList || []).map(r => ({
          mcaId: r.mcaId,
          name: r.name,
          email: r.email,
          college: r.college,
          registeredAt: r.registeredAt,
          pointsAwarded: r.pointsAwarded
        }))
    });
  } catch (error) {
    logger.error('Get CA dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: error.message
    });
  }
});

// Verify MCA ID (for referral validation)
router.get('/campus-ambassador/verify/:mcaId', async (req, res) => {
  try {
    const { mcaId } = req.params;

    const ca = await CampusAmbassador.findOne({ mcaId: mcaId.toUpperCase() });

    if (!ca || !ca.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Invalid MCA ID'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        mcaId: ca.mcaId,
        name: ca.name,
        isValid: true
      }
    });
  } catch (error) {
    logger.error('Verify MCA ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Verification failed'
    });
  }
});

// Add referral (called when user signs up with referral code)
router.post('/campus-ambassador/add-referral', async (req, res) => {
  try {
    const { mcaId, userId, userName, userEmail } = req.body;

    if (!mcaId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'MCA ID and User ID are required'
      });
    }

    const ca = await CampusAmbassador.findOne({ mcaId: mcaId.toUpperCase() });

    if (!ca) {
      return res.status(404).json({
        success: false,
        message: 'Campus Ambassador not found'
      });
    }

    await ca.addReferral(userId, userName, userEmail);

    logger.info(`Referral added for ${mcaId}: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Referral added successfully'
    });
  } catch (error) {
    logger.error('Add referral error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add referral',
      error: error.message
    });
  }
});

// Update payment status (called when user payment is confirmed)
router.post('/campus-ambassador/update-payment', async (req, res) => {
  try {
    const { mcaId, userId, paymentStatus } = req.body;

    if (!mcaId || !userId || !paymentStatus) {
      return res.status(400).json({
        success: false,
        message: 'MCA ID, User ID, and payment status are required'
      });
    }

    const ca = await CampusAmbassador.findOne({ mcaId: mcaId.toUpperCase() });

    if (!ca) {
      return res.status(404).json({
        success: false,
        message: 'Campus Ambassador not found'
      });
    }

    await ca.updatePaymentStatus(userId, paymentStatus);

    logger.info(`Payment status updated for ${mcaId}, user: ${userId}, status: ${paymentStatus}`);

    res.status(200).json({
      success: true,
      message: 'Payment status updated successfully',
      data: {
        totalPoints: ca.totalPoints,
        tier: ca.tier,
        paidReferrals: ca.paidReferrals
      }
    });
  } catch (error) {
    logger.error('Update payment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update payment status',
      error: error.message
    });
  }
});

export default router;
