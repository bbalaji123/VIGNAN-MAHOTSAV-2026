import express from 'express';
import UserEvent from '../models/UserEvent.js';
import Event from '../models/Event.js';
import Registration from '../models/Registration.js';
import EventRegistration from '../models/EventRegistration.js';

const router = express.Router();

// Middleware to verify user exists
const verifyUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User ID is required. Please login to continue.'
      });
    }

    // Check if user exists in database
    const user = await Registration.findOne({ userId });
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

    if (!eventIds || !Array.isArray(eventIds) || eventIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please select at least one event to save'
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

    // Remove existing saved events for this user to replace with new selection
    await UserEvent.deleteMany({ userId });

    // Create new user events
    const userEvents = events.map(event => ({
      userId,
      eventId: event._id,
      eventName: event.eventName,
      eventType: event.eventType
    }));

    await UserEvent.insertMany(userEvents);

    // Auto-register user for all selected events
    const registrations = [];
    for (const event of events) {
      // Check if already registered
      const existingRegistration = await EventRegistration.findOne({
        userId,
        eventId: event._id
      });

      if (!existingRegistration) {
        // Generate unique registration ID
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        const registrationId = `REG${timestamp}${random}`;

        // Create individual registration
        const registration = new EventRegistration({
          registrationId,
          registrationType: 'individual',
          eventId: event._id,
          eventName: event.eventName,
          eventType: event.eventType,
          userId: user.userId,
          participantName: user.name,
          email: user.email,
          phone: user.phone,
          college: user.college,
          paymentStatus: 'unpaid',
          status: 'confirmed'
        });

        await registration.save();
        registrations.push(registration);
      }
    }

    res.status(200).json({
      success: true,
      message: `Successfully saved and registered for ${events.length} event(s)`,
      data: {
        count: events.length,
        events: userEvents,
        registrations: registrations.length
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

    // Get user's saved events with full event details
    const userEvents = await UserEvent.find({ userId }).populate('eventId');

    // Extract full event details
    const events = userEvents.map(ue => ue.eventId).filter(e => e !== null);

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
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
