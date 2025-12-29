import express from 'express';

const router = express.Router();

// In-memory event catalog placeholder.
// Replace with real DB or config-driven data in production.
const EVENT_GROUPS = {
  sports: [],
  culturals: [],
  parasports: [],
};

// GET /api/events
router.get('/events', (req, res) => {
  const allEvents = [
    ...EVENT_GROUPS.sports,
    ...EVENT_GROUPS.culturals,
    ...EVENT_GROUPS.parasports,
  ];

  res.json({
    success: true,
    count: allEvents.length,
    data: allEvents,
  });
});

// GET /api/events/:type (sports, culturals, parasports)
router.get('/events/:type', (req, res) => {
  const { type } = req.params;
  const normalizedType = String(type).toLowerCase();
  const gender = req.query.gender;

  if (!['sports', 'culturals', 'parasports'].includes(normalizedType)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid event type',
      error: 'Allowed types: sports, culturals, parasports',
    });
  }

  let events = EVENT_GROUPS[normalizedType] || [];

  if (gender) {
    const normalizedGender = String(gender).toLowerCase();
    events = events.filter((e) =>
      !e.gender || String(e.gender).toLowerCase() === normalizedGender,
    );
  }

  res.json({
    success: true,
    type: normalizedType,
    count: events.length,
    data: events,
  });
});

export default router;
