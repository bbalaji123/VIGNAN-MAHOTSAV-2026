import express from 'express';
import Registration from '../models/Registration.js';
import Participant from '../models/Participant.js';
import CampusAmbassador from '../models/CampusAmbassador.js';
import { generateUserId } from '../utils/idGenerator.js';

const router = express.Router();

/* =====================================================
   OPTIONAL: Base API route
   URL: GET /api
   Purpose: Quick sanity check that API is alive
===================================================== */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Vignan Mahotsav 2025 API',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

/* =====================================================
   REQUIRED: Health check
   URL: GET /api/health
   Purpose: Server monitoring, uptime checks
===================================================== */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'Vignan Mahotsav Backend',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    nodeVersion: process.version
  });
});

/* =====================================================
   Utility route
   URL: GET /api/branches
===================================================== */
router.get('/branches', (req, res) => {
  const branches = [
    'CSE', 'ECE', 'ME', 'CE', 'IT',
    'EEE', 'CIVIL', 'CHEM', 'BIO',
    'MCA', 'MBA', 'Other'
  ];
  res.json({ branches });
});

/* =====================================================
   Registration
   URL: POST /api/register
===================================================== */
router.post('/register', async (req, res) => {
  try {
    const {
      name, email, password, phone,
      college, branch, dateOfBirth,
      gender, registerId, userType,
      participationType, referralCode
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    // Validate referral code
    let validReferralCode = null;
    if (referralCode?.trim()) {
      const ca = await CampusAmbassador.findOne({ mcaId: referralCode.trim() });
      if (!ca) {
        return res.status(400).json({
          success: false,
          message: 'Invalid referral code'
        });
      }
      validReferralCode = referralCode.trim();
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Email already exists
    if (await Registration.findOne({ email: normalizedEmail })) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Cleanup orphan participant
    await Participant.deleteOne({ email: normalizedEmail });

    const MAX_RETRIES = 3;
    let lastError = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const userId = await generateUserId();

        const registration = await Registration.create({
          userId,
          name,
          email: normalizedEmail,
          password, // ⚠️ hash in production
          phone,
          college,
          branch,
          dateOfBirth,
          gender,
          registerId,
          userType: userType || 'visitor',
          participationType: participationType || 'none',
          paymentStatus: 'unpaid',
          referredBy: validReferralCode
        });

        if (userType === 'participant') {
          await Participant.create({
            userId,
            name,
            email: normalizedEmail,
            phone,
            college,
            dateOfBirth,
            gender,
            registerId,
            participantType: participationType || 'general',
            referredBy: validReferralCode,
            paymentStatus: 'pending',
            registeredEvents: []
          });
        }

        return res.status(201).json({
          success: true,
          message: 'Registration successful',
          data: {
            userId: registration.userId,
            name: registration.name,
            email: registration.email
          }
        });
      } catch (err) {
        lastError = err;
        if (err.code === 11000) continue;
        return res.status(500).json({
          success: false,
          message: 'Registration failed',
          error: err.message
        });
      }
    }

    return res.status(503).json({
      success: false,
      message: 'Server busy, try again',
      error: lastError?.message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/* =====================================================
   Login
   URL: POST /api/login
===================================================== */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password required'
    });
  }

  const user = await Registration.findOne({
    $or: [{ email }, { userId: email }]
  });

  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      userId: user.userId,
      name: user.name,
      email: user.email,
      userType: user.userType
    }
  });
});

/* =====================================================
   Participant Events
   URL: POST /api/save-events
===================================================== */
router.post('/save-events', async (req, res) => {
  const { userId, events } = req.body;

  if (!userId || !Array.isArray(events)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input'
    });
  }

  const participant = await Participant.findOne({ userId });
  if (!participant) {
    return res.status(404).json({
      success: false,
      message: 'Participant not found'
    });
  }

  participant.registeredEvents = events.map(e => ({
    ...e,
    registeredAt: new Date()
  }));

  await participant.save();

  res.json({
    success: true,
    message: 'Events saved',
    count: participant.registeredEvents.length
  });
});

/* =====================================================
   OPTIONAL ADMIN / DEBUG ROUTES
   Remove in production if needed
===================================================== */

router.get('/registrations', async (req, res) => {
  const data = await Registration.find().select('-password');
  res.json({ count: data.length, data });
});

router.get('/user/:userId', async (req, res) => {
  const user = await Registration.findOne({ userId: req.params.userId }).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

router.post('/reset-counter', async (req, res) => {
  const mongoose = (await import('mongoose')).default;
  await mongoose.connection.db.collection('counters').deleteOne({ _id: 'userId' });
  res.json({ success: true, message: 'Counter reset' });
});

export default router;