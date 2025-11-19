import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({ isActive: true });
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Fetch events error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching events',
      error: error.message 
    });
  }
});

// Get events by type (sports, culturals, technical, literary)
router.get('/events/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { gender } = req.query; // Optional gender filter
    
    // Validate event type
    const validTypes = ['sports', 'culturals', 'technical', 'literary', 'parasports'];
    if (!validTypes.includes(type.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid event type. Must be sports, culturals, technical, literary, or parasports'
      });
    }

    let query = { 
      eventType: type.toLowerCase(),
      isActive: true 
    };

    // Add gender filter if provided
    if (gender && ['male', 'female', 'mixed'].includes(gender.toLowerCase())) {
      if (gender.toLowerCase() === 'female') {
        // Female users can see female and mixed events
        query.gender = { $in: ['female', 'mixed'] };
      } else if (gender.toLowerCase() === 'male') {
        // Male users can see male and mixed events
        query.gender = { $in: ['male', 'mixed'] };
      } else {
        // For 'mixed', just show mixed events
        query.gender = 'mixed';
      }
    }

    const events = await Event.find(query);

    res.status(200).json({
      success: true,
      count: events.length,
      type: type,
      gender: gender,
      data: events
    });
  } catch (error) {
    console.error('Fetch events by type error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching events',
      error: error.message 
    });
  }
});

// Get all events with optional gender filtering
router.get('/events-by-gender/:gender?', async (req, res) => {
  try {
    const { gender } = req.params;
    
    let query = { isActive: true };
    
    // Add gender filter if provided
    if (gender && ['male', 'female', 'mixed'].includes(gender.toLowerCase())) {
      if (gender.toLowerCase() === 'female') {
        // Female users can see female and mixed events
        query.gender = { $in: ['female', 'mixed'] };
      } else if (gender.toLowerCase() === 'male') {
        // Male users can see male and mixed events
        query.gender = { $in: ['male', 'mixed'] };
      } else {
        // For 'mixed', just show mixed events
        query.gender = 'mixed';
      }
    }

    const events = await Event.find(query);

    res.status(200).json({
      success: true,
      count: events.length,
      gender: gender,
      data: events
    });
  } catch (error) {
    console.error('Fetch events by gender error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching events by gender',
      error: error.message 
    });
  }
});

// Get single event by ID
router.get('/event/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Fetch event error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching event',
      error: error.message 
    });
  }
});

// Create new event (for admin)
router.post('/event', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating event',
      error: error.message 
    });
  }
});

// Update event (for admin)
router.put('/event/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating event',
      error: error.message 
    });
  }
});

// Delete event (soft delete - set isActive to false)
router.delete('/event/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
      data: event
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting event',
      error: error.message 
    });
  }
});

export default router;
