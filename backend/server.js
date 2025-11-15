import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import registrationRoutes from './routes/registration.js';
import eventsRoutes from './routes/events.js';
import eventRegistrationRoutes from './routes/eventRegistration.js';
import userEventsRoutes from './routes/userEvents.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', registrationRoutes);
app.use('/api', eventsRoutes);
app.use('/api', eventRegistrationRoutes);
app.use('/api', userEventsRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend server is running',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
