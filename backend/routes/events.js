import express from 'express';

const router = express.Router();

// In-memory event catalog placeholder.
// Replace with real DB or config-driven data in production.
const EVENT_GROUPS = {
  sports: [],
  culturals: [],
  parasports: [
    // Para Athletics - Men's Events
    { _id: 'para-athletics-men-100m-leg', eventName: '100 M - Leg Amputee', category: 'Para Athletics Men', eventType: 'parasports', gender: 'male' },
    { _id: 'para-athletics-men-100m-visual', eventName: '100 M - Visual impairment', category: 'Para Athletics Men', eventType: 'parasports', gender: 'male' },
    { _id: 'para-athletics-men-400m-hand', eventName: '400 M - Hand Amputee', category: 'Para Athletics Men', eventType: 'parasports', gender: 'male' },
    { _id: 'para-athletics-men-400m-leg', eventName: '400 M - Leg Amputee', category: 'Para Athletics Men', eventType: 'parasports', gender: 'male' },
    { _id: 'para-athletics-men-shotput', eventName: 'Shot put', category: 'Para Athletics Men', eventType: 'parasports', gender: 'male' },
    { _id: 'para-athletics-men-javelin', eventName: 'Javelin throw', category: 'Para Athletics Men', eventType: 'parasports', gender: 'male' },
    { _id: 'para-athletics-men-discus', eventName: 'Discus throw', category: 'Para Athletics Men', eventType: 'parasports', gender: 'male' },
    
    // Para Athletics - Women's Events
    { _id: 'para-athletics-women-100m-leg', eventName: '100 M - Leg Amputee', category: 'Para Athletics Women', eventType: 'parasports', gender: 'female' },
    { _id: 'para-athletics-women-100m-visual', eventName: '100 M - Visual impairment', category: 'Para Athletics Women', eventType: 'parasports', gender: 'female' },
    { _id: 'para-athletics-women-400m-hand', eventName: '400 M - Hand Amputee', category: 'Para Athletics Women', eventType: 'parasports', gender: 'female' },
    { _id: 'para-athletics-women-400m-leg', eventName: '400 M - Leg Amputee', category: 'Para Athletics Women', eventType: 'parasports', gender: 'female' },
    { _id: 'para-athletics-women-shotput', eventName: 'Shot put', category: 'Para Athletics Women', eventType: 'parasports', gender: 'female' },
    { _id: 'para-athletics-women-javelin', eventName: 'Javelin throw', category: 'Para Athletics Women', eventType: 'parasports', gender: 'female' },
    { _id: 'para-athletics-women-discus', eventName: 'Discus throw', category: 'Para Athletics Women', eventType: 'parasports', gender: 'female' },
    
    // Para Cricket - Men's Events
    { _id: 'para-cricket-men-physical', eventName: 'Cricket - Physical Disability', category: 'Para Cricket Men', eventType: 'parasports', gender: 'male' },
    { _id: 'para-cricket-men-visual', eventName: 'Cricket - Visual Impairment', category: 'Para Cricket Men', eventType: 'parasports', gender: 'male' },
    { _id: 'para-cricket-men-deaf', eventName: 'Cricket - Deaf', category: 'Para Cricket Men', eventType: 'parasports', gender: 'male' },
    
    // Para Cricket - Women's Events
    { _id: 'para-cricket-women-physical', eventName: 'Cricket - Physical Disability', category: 'Para Cricket Women', eventType: 'parasports', gender: 'female' },
    { _id: 'para-cricket-women-visual', eventName: 'Cricket - Visual Impairment', category: 'Para Cricket Women', eventType: 'parasports', gender: 'female' },
    { _id: 'para-cricket-women-deaf', eventName: 'Cricket - Deaf', category: 'Para Cricket Women', eventType: 'parasports', gender: 'female' }
  ],
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
