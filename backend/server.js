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
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', 
    'https://akash209581.github.io',
    'https://mahotsav-1.onrender.com',
    'https://your-vercel-app.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server started on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check at http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🚀 Server started on port ${PORT}`);
  logger.info(`📡 API available at http://localhost:${PORT}/api`);
  logger.info(`🏥 Health check at http://localhost:${PORT}/health`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}).on('error', (err) => {
  console.error('❌ Server startup error:', err);
  logger.error('Server startup error:', err);
  process.exit(1);
});
