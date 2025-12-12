import express from 'express';
import UserEvent from '../models/UserEvent.js';
import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

const router = express.Router();

// Middleware to verify user exists
const verifyUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    
    console.log('🔐 Verifying user:', userId);
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User ID is required. Please login to continue.'
      });
    }

    // Check if user exists in database
    const user = await Registration.findOne({ userId });
    console.log('🔍 User found:', user ? { name: user.name, email: user.email } : 'NOT FOUND');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Please login with valid credentials.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('User verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message
    });
  }
};

// Save selected events for a user and auto-register them
router.post('/save-events', verifyUser, async (req, res) => {
  try {
    const { userId, eventIds } = req.body;
    const user = req.user;

    console.log('📝 Save events request:', { userId, eventIds });
    console.log('👤 User data:', { name: user?.name, email: user?.email, userId: user?.userId });

    if (!eventIds || !Array.isArray(eventIds) || eventIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please select at least one event to save'
      });
    }

    if (!user || !user.name || !user.email) {
      return res.status(400).json({
        success: false,
        message: 'User data incomplete. Please login again.'
      });
    }

    // Fetch all events to get their details
    const events = await Event.find({ _id: { $in: eventIds } });

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No valid events found'
      });
    }

    // Get existing user event document to preserve existing registrations
    const existingUserEvent = await UserEvent.findOne({ userId });
    const existingRegistrations = existingUserEvent?.registeredEvents || [];
    
    // Build map of existing registrations by eventId
    const existingRegMap = new Map();
    existingRegistrations.forEach(reg => {
      existingRegMap.set(reg.eventId.toString(), reg);
    });

    // Build the registeredEvents array for the UserEvent document
    const registeredEventsData = [];

    for (const event of events) {
      const eventIdStr = event._id.toString();
      const existingReg = existingRegMap.get(eventIdStr);
      
      // Use existing registration ID if already registered, else generate new
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      const registrationId = existingReg?.registrationId || `REG${timestamp}${random}`;

      // Add to registeredEvents array
      registeredEventsData.push({
        registrationId,
        registrationType: 'individual',
        eventId: event._id,
        eventName: event.eventName,
        eventType: event.eventType,
        participantName: user.name,
        phone: user.phone,
        college: user.college,
        paymentStatus: existingReg?.paymentStatus || 'unpaid',
        status: 'confirmed',
        registeredAt: existingReg?.registeredAt || new Date()
      });
    }

    // Update or create the single UserEvent document for this user
    console.log('📝 Attempting to save UserEvent for:', userId);
    console.log('📋 Data to save:', JSON.stringify({
      userId,
      userName: user.name,
      email: user.email,
      eventsCount: registeredEventsData.length
    }));

    const userEvent = await UserEvent.findOneAndUpdate(
      { userId },
      {
        $set: {
          userId,
          userName: user.name,
          email: user.email,
          registeredEvents: registeredEventsData
        }
      },
      { upsert: true, new: true, runValidators: true }
    );

    console.log('✅ Saved events for user:', userId, '- Total:', registeredEventsData.length);
    console.log('💾 Saved document ID:', userEvent?._id);
    console.log('📊 Saved registeredEvents count:', userEvent?.registeredEvents?.length);

    res.status(200).json({
      success: true,
      message: `Successfully saved and registered for ${events.length} event(s)`,
      data: {
        count: events.length,
        events: registeredEventsData,
        totalRegistrations: registeredEventsData.length
      }
    });
  } catch (error) {
    console.error('Save events error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving events',
      error: error.message
    });
  }
});

// Get user's saved events
router.get('/my-events/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User ID is required. Please login to continue.'
      });
    }

    // Verify user exists
    const user = await Registration.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Please login with valid credentials.'
      });
    }

    // Get user's saved events - return the registeredEvents array from UserEvent document
    const userEventDoc = await UserEvent.findOne({ userId });

    if (!userEventDoc || !userEventDoc.registeredEvents || userEventDoc.registeredEvents.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
        message: 'No events saved yet'
      });
    }

    // Get full event details for each registered event
    const eventIds = userEventDoc.registeredEvents.map(re => re.eventId);
    const events = await Event.find({ _id: { $in: eventIds } });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
      registrations: userEventDoc.registeredEvents
    });
  } catch (error) {
    console.error('Fetch my events error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching saved events',
      error: error.message
    });
  }
});

// Add a single event to user's saved events
router.post('/add-event', verifyUser, async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: 'Event ID is required'
      });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if already saved
    const existing = await UserEvent.findOne({ userId, eventId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Event already saved'
      });
    }

    // Save event
    const userEvent = new UserEvent({
      userId,
      eventId: event._id,
      eventName: event.eventName,
      eventType: event.eventType
    });

    await userEvent.save();

    res.status(200).json({
      success: true,
      message: 'Event saved successfully',
      data: userEvent
    });
  } catch (error) {
    console.error('Add event error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding event',
      error: error.message
    });
  }
});

// Remove an event from user's saved events
router.delete('/remove-event', verifyUser, async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: 'Event ID is required'
      });
    }

    const result = await UserEvent.findOneAndDelete({ userId, eventId });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Event not found in your saved events'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event removed successfully'
    });
  } catch (error) {
    console.error('Remove event error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing event',
      error: error.message
    });
  }
});

// Check if specific events are saved by user
router.post('/check-saved', async (req, res) => {
  try {
    const { userId, eventIds } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User ID is required'
      });
    }

    if (!eventIds || !Array.isArray(eventIds)) {
      return res.status(400).json({
        success: false,
        message: 'Event IDs array is required'
      });
    }

    const savedEvents = await UserEvent.find({ 
      userId, 
      eventId: { $in: eventIds } 
    });

    const savedEventIds = savedEvents.map(ue => ue.eventId.toString());

    res.status(200).json({
      success: true,
      data: {
        savedEventIds
      }
    });
  } catch (error) {
    console.error('Check saved events error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking saved events',
      error: error.message
    });
  }
});

export default router;
