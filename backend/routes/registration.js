import express from 'express';
import Registration from '../models/Registration.js';
import Participant from '../models/Participant.js';
import { generateUserId } from '../utils/idGenerator.js';

const router = express.Router();

// Get branches
router.get('/branches', (req, res) => {
  const branches = ['CSE', 'ECE', 'ME', 'CE', 'IT', 'EEE', 'CIVIL', 'CHEM', 'BIO', 'MCA', 'MBA', 'Other'];
  res.json({ branches });
});

// Create new registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, college, branch, dateOfBirth, gender, registerId, userType, participationType } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and password are required' 
      });
    }

    // Normalize email (trim and lowercase to match schema)
    const normalizedEmail = email.trim().toLowerCase();
    console.log(`📧 Original email: "${email}"`);
    console.log(`📧 Normalized email: "${normalizedEmail}"`);

    // Check if email already exists in Registration collection
    const emailExistsInRegistration = await Registration.findOne({ email: normalizedEmail });
    console.log(`📊 Email exists in Registration:`, emailExistsInRegistration ? 'YES' : 'NO');
    
    if (emailExistsInRegistration) {
      console.log(`⚠️  Existing user found in Registration:`, emailExistsInRegistration.userId, emailExistsInRegistration.name);
      return res.status(400).json({ 
        success: false, 
        message: `This email (${normalizedEmail}) is already registered. Please login or use a different email.`,
        existingUser: true
      });
    }

    // Also check if email exists in Participant collection (from partial registrations)
    const emailExistsInParticipant = await Participant.findOne({ email: normalizedEmail });
    console.log(`📊 Email exists in Participant:`, emailExistsInParticipant ? 'YES' : 'NO');
    
    if (emailExistsInParticipant) {
      console.log(`⚠️  Orphan participant found, cleaning up:`, emailExistsInParticipant.userId);
      // Clean up orphan participant record (exists in participants but not in registrations)
      await Participant.deleteOne({ email: normalizedEmail });
      console.log(`🧹 Cleaned up orphan participant record for ${normalizedEmail}`);
    }
    
    console.log(`✅ Email is available, proceeding with registration...`);

    // Retry logic for concurrent userId conflicts
    const MAX_RETRIES = 3;
    let lastError = null;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        // Generate unique user ID (queue ensures uniqueness)
        const userId = await generateUserId();
        console.log(`🔄 Attempt ${attempt}: Generated userId ${userId}`);

        // Create new registration (without transaction for better compatibility)
        const registration = new Registration({
          userId,
          name,
          email: normalizedEmail, // Use normalized email
          password, // Note: In production, you should hash passwords before storing
          phone,
          college,
          branch,
          dateOfBirth,
          gender,
          registerId,
          userType: userType || 'visitor',
          participationType: participationType || 'none',
          paymentStatus: 'unpaid' // Automatically set to unpaid
        });

        await registration.save();
        console.log(`✅ Registration saved for ${name} (${userId})`);

        // If user is a participant, also save to participants collection
        if (userType === 'participant') {
          try {
            const participant = new Participant({
              userId,
              name,
              email: normalizedEmail, // Use normalized email
              phone,
              college,
              dateOfBirth,
              gender,
              registerId,
              participantType: participationType || 'general',
              registeredEvents: []
            });
            
            await participant.save();
            console.log(`✅ Participant record created for ${name} (${userId})`);
          } catch (participantError) {
            console.error('Error creating participant record:', participantError);
            // If participant save fails, we should clean up the registration
            // But the registration is still valid, so we can continue
            console.log(`⚠️  Participant record failed but registration succeeded for ${name}`);
          }
        }

        return res.status(201).json({
          success: true,
          message: 'Registration successful',
          data: {
            id: registration._id,
            userId: registration.userId,
            name: registration.name,
            email: registration.email
          }
        });
      } catch (error) {
        console.error(`Registration error (attempt ${attempt}):`, error);
        lastError = error;
        
        // Handle duplicate key errors
        if (error.code === 11000) {
          // Check which field caused the duplicate
          if (error.keyPattern?.email) {
            return res.status(409).json({
              success: false,
              message: 'This email is already registered. Please use a different email or login with your existing account.',
              error: 'Duplicate email'
            });
          } else if (error.keyPattern?.userId) {
            // This is a race condition - retry with a new ID
            console.log(`⚠️  userId conflict on attempt ${attempt}, retrying...`);
            // Add small delay before retry
            await new Promise(resolve => setTimeout(resolve, 100 * attempt));
            continue; // Retry with next attempt
          } else {
            return res.status(409).json({
              success: false,
              message: 'This account already exists. Please try a different email.',
              error: 'Duplicate registration detected'
            });
          }
        }
        
        // For non-duplicate errors, don't retry
        return res.status(500).json({ 
          success: false, 
          message: 'Server error during registration',
          error: error.message 
        });
      }
    } // End of retry loop
    
    // All retries exhausted for userId conflict
    console.error('All retry attempts failed for userId generation');
    return res.status(503).json({ 
      success: false, 
      message: 'Server is busy. Please try again in a moment.',
      error: lastError?.message || 'Registration conflict after retries'
    });
  } catch (outerError) {
    console.error('Outer registration error:', outerError);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration',
      error: outerError.message 
    });
  }
});

// Check if email exists (for debugging)
router.get('/check-email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await Registration.findOne({ email });
    res.json({
      exists: !!user,
      email: email,
      user: user ? { userId: user.userId, name: user.name, email: user.email } : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user by email (for testing only - remove in production)
router.delete('/delete-email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const result = await Registration.deleteOne({ email });
    // Also clean up from participants collection
    const participantResult = await Participant.deleteOne({ email });
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} registration(s) and ${participantResult.deletedCount} participant(s) with email ${email}`,
      deletedCount: result.deletedCount,
      participantDeletedCount: participantResult.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clean up orphan participants (participants without matching registration)
router.post('/cleanup-orphans', async (req, res) => {
  try {
    const participants = await Participant.find({});
    let cleanedCount = 0;
    
    for (const participant of participants) {
      const registration = await Registration.findOne({ email: participant.email });
      if (!registration) {
        await Participant.deleteOne({ _id: participant._id });
        console.log(`🧹 Cleaned up orphan participant: ${participant.email}`);
        cleanedCount++;
      }
    }
    
    res.json({
      success: true,
      message: `Cleaned up ${cleanedCount} orphan participant(s)`,
      cleanedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all registrations
router.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find().select('-password');
    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching registrations',
      error: error.message 
    });
  }
});

// Get registration by ID
router.get('/registration/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id).select('-password');
    if (!registration) {
      return res.status(404).json({ 
        success: false, 
        message: 'Registration not found' 
      });
    }
    res.status(200).json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching registration',
      error: error.message 
    });
  }
});

// Get registration by userId
router.get('/user/:userId', async (req, res) => {
  try {
    const registration = await Registration.findOne({ userId: req.params.userId }).select('-password');
    if (!registration) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    res.status(200).json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching user',
      error: error.message 
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user by email or userId
    let user = await Registration.findOne({ 
      $or: [
        { email: email },
        { userId: email }
      ]
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found. Please check your credentials.' 
      });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Incorrect password. Please try again.' 
      });
    }

    // Login successful
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        userType: user.userType,
        participationType: user.participationType,
        gender: user.gender // Add gender field to login response
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

// Forgot Password - Return credentials directly (email disabled)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate required field
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Find user by email
    const user = await Registration.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'No account found with this email address' 
      });
    }

    // Return user credentials directly
    res.status(200).json({
      success: true,
      message: 'Account found! Here are your credentials.',
      data: {
        email: user.email,
        userId: user.userId,
        password: user.password
      }
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during password recovery',
      error: error.message 
    });
  }
});

export default router;

