import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { logger, requestLogger, errorLogger } from './utils/logger.js';
import { initializeQueue } from './utils/queue.js';

// Import routes
import registrationRoutes from './routes/registration.js';
import eventsRoutes from './routes/events.js';
import eventRegistrationRoutes from './routes/eventRegistration.js';
import userEventsRoutes from './routes/userEvents.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database and queue
connectDB();
initializeQueue();

// Security and performance middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}));

app.use(compression());
app.use(requestLogger);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
app.use('/api', generalLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api', registrationRoutes);
app.use('/api', eventsRoutes);
app.use('/api', eventRegistrationRoutes);
app.use('/api', userEventsRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    version: process.version
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Vignan Mahotsav 2025 API',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(errorLogger);

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server started on port ${PORT}`);
  logger.info(`📡 API available at http://localhost:${PORT}/api`);
  logger.info(`🏥 Health check at http://localhost:${PORT}/health`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
