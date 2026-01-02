import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CAManager from '../models/CAManager.js';
import CampusAmbassador from '../models/CampusAmbassador.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// CA Manager Login
router.post('/ca-manager/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find CA Manager
    const manager = await CAManager.findOne({ email: email.toLowerCase() });

    if (!manager) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if active
    if (!manager.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, manager.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login and log action
    manager.lastLogin = new Date();
    await manager.logAction('login', null, null, null, null, 'Manager logged in');

    // Generate JWT token
    const token = jwt.sign(
      {
        managerId: manager._id,
        email: manager.email,
        userType: 'caManager'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    logger.info(`CA Manager logged in: ${manager.email}`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      manager: {
        email: manager.email,
        name: manager.name
      }
    });
  } catch (error) {
    logger.error('CA Manager login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// Get all Campus Ambassadors
router.get('/ca-manager/ambassadors', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    if (decoded.userType !== 'caManager') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access'
      });
    }

    // Get all CAs
    const ambassadors = await CampusAmbassador.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      ambassadors
    });
  } catch (error) {
    logger.error('Get ambassadors error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ambassadors',
      error: error.message
    });
  }
});

// Update CA Points
router.post('/ca-manager/update-points', async (req, res) => {
  try {
    const { mcaId, points, action, notes } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    if (decoded.userType !== 'caManager') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access'
      });
    }

    // Find CA
    const ca = await CampusAmbassador.findOne({ mcaId: mcaId.toUpperCase() });
    
    if (!ca) {
      return res.status(404).json({
        success: false,
        message: 'Campus Ambassador not found'
      });
    }

    const oldPoints = ca.totalPoints;
    const pointsValue = parseInt(points);

    if (action === 'increase') {
      ca.totalPoints += pointsValue;
    } else if (action === 'decrease') {
      ca.totalPoints = Math.max(0, ca.totalPoints - pointsValue);
    }

    ca.updateTier();
    await ca.save();

    // Log action
    const manager = await CAManager.findById(decoded.managerId);
    await manager.logAction(
      action === 'increase' ? 'points_increase' : 'points_decrease',
      ca.mcaId,
      ca.name,
      oldPoints,
      ca.totalPoints,
      notes || `${action === 'increase' ? 'Added' : 'Removed'} ${pointsValue} points`
    );

    logger.info(`CA Manager updated points for ${mcaId}: ${oldPoints} -> ${ca.totalPoints}`);

    res.status(200).json({
      success: true,
      message: 'Points updated successfully',
      ambassador: {
        mcaId: ca.mcaId,
        name: ca.name,
        totalPoints: ca.totalPoints,
        tier: ca.tier
      }
    });
  } catch (error) {
    logger.error('Update points error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update points',
      error: error.message
    });
  }
});

// Dismiss/Activate CA
router.post('/ca-manager/toggle-status', async (req, res) => {
  try {
    const { mcaId, status, notes } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    if (decoded.userType !== 'caManager') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access'
      });
    }

    // Find CA
    const ca = await CampusAmbassador.findOne({ mcaId: mcaId.toUpperCase() });
    
    if (!ca) {
      return res.status(404).json({
        success: false,
        message: 'Campus Ambassador not found'
      });
    }

    const oldStatus = ca.isActive;
    ca.isActive = status;
    await ca.save();

    // Log action
    const manager = await CAManager.findById(decoded.managerId);
    await manager.logAction(
      status ? 'activate' : 'dismiss',
      ca.mcaId,
      ca.name,
      oldStatus,
      status,
      notes || `CA ${status ? 'activated' : 'dismissed'}`
    );

    logger.info(`CA Manager ${status ? 'activated' : 'dismissed'} ${mcaId}`);

    res.status(200).json({
      success: true,
      message: `Campus Ambassador ${status ? 'activated' : 'dismissed'} successfully`,
      ambassador: {
        mcaId: ca.mcaId,
        name: ca.name,
        isActive: ca.isActive
      }
    });
  } catch (error) {
    logger.error('Toggle status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status',
      error: error.message
    });
  }
});

// Get Manager Activity Logs
router.get('/ca-manager/activity-logs', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    if (decoded.userType !== 'caManager') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access'
      });
    }

    const manager = await CAManager.findById(decoded.managerId);
    
    // Get recent logs (last 100)
    const logs = manager.actionLogs.slice(-100).reverse();

    res.status(200).json({
      success: true,
      logs
    });
  } catch (error) {
    logger.error('Get activity logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity logs',
      error: error.message
    });
  }
});

export default router;
