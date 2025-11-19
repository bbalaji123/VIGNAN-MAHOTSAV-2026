import express from 'express';
import Registration from '../models/Registration.js';
import Participant from '../models/Participant.js';
import { sendWelcomeEmail, sendPasswordResetEmail } from '../utils/emailService.js';

const router = express.Router();

// Helper function to generate next user ID
async function generateUserId() {
  try {
    // Find the last registration sorted by userId in descending order
    const lastRegistration = await Registration.findOne()
      .sort({ userId: -1 })
      .select('userId');
    
    if (!lastRegistration || !lastRegistration.userId) {
      // First user
      return 'MH26000001';
    }
    
    // Extract the number from the last userId (e.g., "MH26000001" -> 1)
    const lastNumber = parseInt(lastRegistration.userId.substring(4));
    const nextNumber = lastNumber + 1;
    
    // Format with leading zeros (e.g., 2 -> "MH26000002")
    const nextUserId = `MH26${nextNumber.toString().padStart(6, '0')}`;
    
    return nextUserId;
  } catch (error) {
    console.error('Error generating user ID:', error);
    throw error;
  }
}

// Create new registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, college, dateOfBirth, gender, registerId, userType, participationType } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and password are required' 
      });
    }

    // Check if user already exists
    const existingUser = await Registration.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Generate unique user ID
    const userId = await generateUserId();

    // Create new registration
    const registration = new Registration({
      userId,
      name,
      email,
      password, // Note: In production, you should hash passwords before storing
      phone,
      college,
      dateOfBirth,
      gender,
      registerId,
      userType: userType || 'visitor',
      participationType: participationType || 'none',
      paymentStatus: 'unpaid' // Automatically set to unpaid
    });

    await registration.save();

    // If user is a participant, also save to participants collection
    if (userType === 'participant') {
      try {
        const participant = new Participant({
          userId,
          name,
          email,
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
        // Don't fail the whole registration if participant save fails
      }
    }

    // Send welcome email with credentials (async, don't wait for it)
    sendWelcomeEmail(email, userId, password, name)
      .then(success => {
        if (success) {
          console.log(`✅ Welcome email sent to ${email}`);
        } else {
          console.log(`⚠️  Email sending failed for ${email}, but registration succeeded`);
        }
      })
      .catch(err => {
        console.error(`❌ Email error for ${email}:`, err.message);
      });

    res.status(201).json({
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
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration',
      error: error.message 
    });
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

// Forgot Password - Send credentials to email
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

    // Send password reset email with credentials
    const emailSent = await sendPasswordResetEmail(
      user.email, 
      user.name, 
      user.userId, 
      user.password
    );

    if (emailSent) {
      res.status(200).json({
        success: true,
        message: 'Password recovery email sent successfully! Please check your inbox.',
        data: {
          email: user.email,
          userId: user.userId
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send recovery email. Please try again later.'
      });
    }
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

