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
    status: 'ok',
    details: {
      service: 'Vignan Mahotsav Backend',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memory: process.memoryUsage(),
      nodeVersion: process.version,
    },
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
    // Anti-bot honeypot validation - check if bot filled honeypot fields
    const { company_name, address2 } = req.body;
    if (company_name || address2) {
      console.log('Bot detected - honeypot triggered:', { company_name, address2, ip: req.ip });
      return res.status(400).json({
        success: false,
        message: 'Invalid request'
      });
    }

    const {
      name, email, password, phone,
      college, branch, dateOfBirth,
      gender, registerId, userType,
      participationType, referralCode,
      state, district
    } = req.body;

    // Validate required fields - check for empty strings and whitespace
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedPhone = phone?.trim();
    const trimmedCollege = college?.trim();
    const trimmedBranch = branch?.trim();
    const trimmedRegisterId = registerId?.trim();
    const trimmedState = state?.trim();
    const trimmedDistrict = district?.trim();
    const trimmedGender = gender?.trim();

    if (!trimmedName) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    if (!trimmedEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    if (!trimmedGender) {
      return res.status(400).json({
        success: false,
        message: 'Gender is required'
      });
    }

    if (!trimmedPhone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    if (!dateOfBirth) {
      return res.status(400).json({
        success: false,
        message: 'Date of birth is required'
      });
    }

    if (!trimmedCollege) {
      return res.status(400).json({
        success: false,
        message: 'College is required'
      });
    }

    if (!trimmedBranch) {
      return res.status(400).json({
        success: false,
        message: 'Branch is required'
      });
    }

    if (!trimmedRegisterId) {
      return res.status(400).json({
        success: false,
        message: 'College registration number is required'
      });
    }

    if (!trimmedState) {
      return res.status(400).json({
        success: false,
        message: 'State is required'
      });
    }

    if (!trimmedDistrict) {
      return res.status(400).json({
        success: false,
        message: 'District is required'
      });
    }

    // Validate referral code
    let validReferralCode = null;
    if (referralCode?.trim()) {
      try {
        const ca = await CampusAmbassador.findOne({ mcaId: referralCode.trim() }).lean();
        if (!ca) {
          return res.status(400).json({
            success: false,
            message: 'Invalid referral code'
          });
        }
        validReferralCode = referralCode.trim();
      } catch (referralError) {
        console.error('Error validating referral code:', referralError);
        // Continue without referral if there's an error
      }
    }

    const normalizedEmail = trimmedEmail.toLowerCase();

    // Email already exists
    const existingEmail = await Registration.findOne({ email: normalizedEmail }).lean();
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Check for duplicate Registration Number if provided
    if (trimmedRegisterId) {
      // Use Promise.all to check both collections in parallel
      const [existingRegId, existingCARegNo] = await Promise.all([
        Registration.findOne({
          registerId: { $regex: new RegExp(`^${trimmedRegisterId}$`, 'i') }
        }).lean(),
        CampusAmbassador.findOne({
          registrationNumber: { $regex: new RegExp(`^${trimmedRegisterId}$`, 'i') }
        }).lean()
      ]);

      if (existingRegId) {
        return res.status(409).json({
          success: false,
          message: `Registration Number '${trimmedRegisterId}' is already registered by another user.`
        });
      }

      if (existingCARegNo) {
        return res.status(409).json({
          success: false,
          message: `Registration Number '${trimmedRegisterId}' is already registered by a Campus Ambassador.`
        });
      }
    }

    // Cleanup orphan participant
    await Participant.deleteOne({ email: normalizedEmail });

    const MAX_RETRIES = 3;
    let lastError = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        // Generate ID only once per attempt
        const userId = await generateUserId();

        // Convert YYYY-MM-DD to DD/MM/YYYY for password storage
        let passwordToStore = dateOfBirth || password;
        if (passwordToStore && passwordToStore.includes('-')) {
          const [year, month, day] = passwordToStore.split('-');
          passwordToStore = `${day}/${month}/${year}`;
        }

        const registration = await Registration.create({
          userId,
          name: trimmedName,
          email: normalizedEmail,
          password: passwordToStore, // Store in DD/MM/YYYY format
          phone: trimmedPhone,
          college: trimmedCollege,
          branch: trimmedBranch,
          dateOfBirth,
          gender: trimmedGender,
          registerId: trimmedRegisterId,
          userType: userType || 'visitor',
          participationType: participationType || 'none',
          paymentStatus: 'unpaid',
          referredBy: validReferralCode,
          state: trimmedState,
          district: trimmedDistrict
        });

        // If a valid referral code was used, update the CA's referral list
        if (validReferralCode) {
          try {
            const ca = await CampusAmbassador.findOne({ mcaId: validReferralCode });
            if (ca) {
              await ca.addReferral(userId, name, normalizedEmail, college);
              console.log(`Added referral ${userId} to CA ${validReferralCode}`);
            }
          } catch (referralError) {
            console.error('Error adding referral to CA:', referralError);
            // Don't fail the registration if referral update fails
          }
        }

        // Participant will be created only when user registers for events
        // No automatic participant creation during signup

        return res.status(201).json({
          success: true,
          message: 'Registration successful',
          data: {
            userId: registration.userId,
            name: registration.name,
            email: registration.email,
            password: registration.password
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
  try {
    const { email, password, mahotsavId, regNo } = req.body;
    const identifier = email || mahotsavId || regNo;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Identifier and password required'
      });
    }

    // Make identifier case-insensitive and trim whitespace
    const normalizedIdentifier = identifier.trim();

    // Try to find user with case-insensitive matching for userId and registerId
    // Use .lean() for faster query without full Mongoose document overhead
    const user = await Registration.findOne({
      $or: [
        { email: normalizedIdentifier.toLowerCase() },
        { userId: { $regex: new RegExp(`^${normalizedIdentifier}$`, 'i') } },
        { registerId: { $regex: new RegExp(`^${normalizedIdentifier}$`, 'i') } }
      ]
    }).select('userId name email password college branch dateOfBirth gender registerId userType participationType paymentStatus state district phone').lean();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Convert YYYY-MM-DD input from date picker to DD/MM/YYYY
    let passwordToCheck = password;
    if (password.includes('-') && password.length === 10) {
      const [year, month, day] = password.split('-');
      passwordToCheck = `${day}/${month}/${year}`;
    }

    // Check if passwords match
    if (user.password !== passwordToCheck) {
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
        registerId: user.registerId,
        name: user.name,
        email: user.email,
        userType: user.userType,
        gender: user.gender,
        branch: user.branch,
        college: user.college,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        paymentStatus: user.paymentStatus
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
});

/* =====================================================
   Participant Events
   URL: POST /api/save-events
===================================================== */
router.post('/save-events', async (req, res) => {
  try {
    const { userId, events } = req.body;

    if (!userId || !Array.isArray(events)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input'
      });
    }

    // Get user details from Registration
    const user = await Registration.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Gender validation removed - users can register for any event

    // Find or create participant
    let participant = await Participant.findOne({ userId });

    if (events.length === 0) {
      // If no events, remove all registered events from participant and reset amount
      if (participant) {
        participant.registeredEvents = [];
        participant.amount = 0;
        await participant.save();
      }
      return res.json({
        success: true,
        message: 'All events removed successfully',
        participant: participant || null
      });
    }

    // Validate mutual exclusivity between para sports and normal events
    const hasParaSports = events.some(e => e.eventType === 'parasports');
    const hasNormalEvents = events.some(e => e.eventType === 'sports' || e.eventType === 'culturals');

    if (hasParaSports && hasNormalEvents) {
      return res.status(400).json({
        success: false,
        message: 'You cannot register for both para sports and normal events. Please choose one category only.'
      });
    }

    // Calculate total registration fee based on events
    const calculateRegistrationFee = (events, userGender, userCollege) => {
      // Check event types
      const hasSports = events.some(e => e.eventType === 'sports');
      const hasCulturals = events.some(e => e.eventType === 'culturals');
      const hasParaSports = events.some(e => e.eventType === 'parasports');

      // Para sports are always free
      if (hasParaSports) {
        return 0;
      }

      // Check if user is from special Vignan colleges
      const specialVignanColleges = [
        'Vignan Pharmacy College',
        "Vignan's Foundation of Science, Technology & Research",
        "Vignan's Lara Institute of Technology & Science"
      ];

      const isSpecialVignanStudent = specialVignanColleges.some(college =>
        userCollege?.toLowerCase().includes(college.toLowerCase()) ||
        college.toLowerCase().includes(userCollege?.toLowerCase())
      );

      // Special Vignan colleges: ₹150 flat fee
      if (isSpecialVignanStudent) {
        if (hasSports || hasCulturals) {
          return 150;
        }
        return 0;
      }

      // Regular fee calculation
      const gender = userGender?.toLowerCase();

      if (gender === 'male') {
        if (hasSports && hasCulturals) {
          return 350; // Both sports and culturals
        } else if (hasSports) {
          return 350; // Sports only
        } else if (hasCulturals) {
          return 250; // Culturals only
        }
      } else if (gender === 'female') {
        if (hasSports || hasCulturals) {
          return 250; // Female fee is always 250 total
        }
      } else {
        // Default for other genders
        if (hasSports && hasCulturals) {
          return 350;
        } else if (hasSports) {
          return 350;
        } else if (hasCulturals) {
          return 250;
        }
      }

      return 0;
    };

    const totalAmount = calculateRegistrationFee(events, user.gender, user.college);

    // Create participant if they're registering for events and don't exist
    if (!participant) {
      participant = await Participant.create({
        userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        college: user.college,
        state: user.state,
        district: user.district,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        registerId: user.registerId,
        participantType: 'general',
        referredBy: user.referredBy,
        paymentStatus: 'pending',
        amount: totalAmount,
        registeredEvents: events.map(e => ({
          ...e,
          fee: totalAmount, // Set each event's fee to the total registration amount
          category: e.category ? e.category.replace(/Women's\s*/gi, '').replace(/Men's\s*/gi, '').replace(/\s*Women\s*/gi, ' ').replace(/\s*Men\s*/gi, ' ').replace(/\s*Female\s*/gi, ' ').replace(/\s*Male\s*/gi, ' ').trim() : e.category,
          registeredAt: new Date()
        }))
      });
    } else {
      // Update registered events for existing participant
      participant.registeredEvents = events.map(e => ({
        ...e,
        fee: totalAmount, // Set each event's fee to the total registration amount
        category: e.category ? e.category.replace(/Women's\s*/gi, '').replace(/Men's\s*/gi, '').replace(/\s*Women\s*/gi, ' ').replace(/\s*Men\s*/gi, ' ').replace(/\s*Female\s*/gi, ' ').replace(/\s*Male\s*/gi, ' ').trim() : e.category,
        registeredAt: new Date()
      }));
      participant.amount = totalAmount;
      await participant.save();
    }

    res.json({
      success: true,
      message: 'Events saved successfully',
      data: {
        userId,
        registeredEvents: participant.registeredEvents
      }
    });
  } catch (error) {
    console.error('❌ Error saving events:');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Request body:', req.body);
    res.status(500).json({
      success: false,
      message: 'Failed to save events',
      error: error.message
    });
  }
});

/* =====================================================
   Get User's Registered Events
   URL: GET /api/my-registrations/:userId
===================================================== */
router.get('/my-registrations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find participant by userId
    const participant = await Participant.findOne({ userId });

    if (!participant) {
      return res.json({
        success: true,
        message: 'No registrations found',
        data: {
          userId,
          events: []
        }
      });
    }

    res.json({
      success: true,
      message: 'Registered events retrieved successfully',
      data: {
        userId,
        events: participant.registeredEvents || []
      }
    });
  } catch (error) {
    console.error('Error fetching registered events:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registered events',
      error: error.message
    });
  }
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
  try {
    const mongoose = (await import('mongoose')).default;

    // Delete the counter to reset it
    await mongoose.connection.db.collection('counters').deleteOne({ _id: 'userId' });

    // Optionally set it to 0 explicitly
    await mongoose.connection.db.collection('counters').insertOne({ _id: 'userId', seq: 0 });

    res.json({
      success: true,
      message: 'Counter reset to 0. Next ID will be MH26000001'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to reset counter',
      error: error.message
    });
  }
});

router.get('/counter-status', async (req, res) => {
  try {
    const mongoose = (await import('mongoose')).default;
    const counter = await mongoose.connection.db.collection('counters').findOne({ _id: 'userId' });

    res.json({
      success: true,
      counter: counter?.seq || 0,
      nextId: `MH26${((counter?.seq || 0) + 1).toString().padStart(6, '0')}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get counter',
      error: error.message
    });
  }
});

export default router;