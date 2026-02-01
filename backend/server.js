import dotenv from 'dotenv';

// CRITICAL: Load environment variables FIRST before any other imports
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import connectDB from './config/db.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { logger, requestLogger, errorLogger } from './utils/logger.js';
import { initializeQueue } from './utils/queue.js';

// Routes
import registrationRoutes from './routes/registration.js';
import campusAmbassadorRoutes from './routes/campusAmbassador.js';
import caManagerRoutes from './routes/caManager.js';
import eventsRoutes from './routes/events.js';
import locationRoutes from './routes/location.js';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 5000;

/* =====================================================
   Trust Proxy Configuration (for nginx/reverse proxy)
===================================================== */
// Enable trust proxy when behind nginx or other reverse proxy
app.set('trust proxy', 1);

/* =====================================================
   Security & Performance
===================================================== */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
  })
);

app.use(compression());
app.use(requestLogger);

// Request timeout middleware - prevent hanging requests
app.use((req, res, next) => {
  // Set timeout to 30 seconds
  req.setTimeout(30000, () => {
    res.status(408).json({
      success: false,
      message: 'Request timeout'
    });
  });
  res.setTimeout(30000);
  next();
});

// Strict CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://akash209581.github.io',
  'https://vignanmahotsav.in',
  'https://www.vignanmahotsav.in',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/* =====================================================
   Rate Limiting
===================================================== */
app.use('/neekendukura', generalLimiter);

/* =====================================================
   Static File Serving with Caching
===================================================== */
// Serve static files with aggressive caching for images
// This enables browser caching for 1 year (immutable)
app.use(express.static('public', {
  maxAge: '1y', // 1 year cache
  immutable: true,
  setHeaders: (res, path) => {
    // Apply aggressive caching to image files
    if (path.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

/* =====================================================
   Body Parsing
===================================================== */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* =====================================================
  API Routes
===================================================== */
app.use('/neekendukura', registrationRoutes);
app.use('/neekendukura', campusAmbassadorRoutes);
app.use('/neekendukura', caManagerRoutes);
app.use('/neekendukura', eventsRoutes);
app.use('/neekendukura', locationRoutes);

/* =====================================================
  Coordinator Backend Proxy
  Proxies requests to the coordinator service to avoid
  model conflicts while keeping a unified API base.
===================================================== */
const COORDINATOR_TARGET = process.env.COORDINATOR_URL || 'http://localhost:6001';

// Proxy coordinator auth endpoints
app.use(
  '/neekendukura/auth',
  createProxyMiddleware({
    target: COORDINATOR_TARGET,
    changeOrigin: true,
    pathRewrite: {
      '^/neekendukura/auth': '/api/auth',
    },
    onProxyReq: (proxyReq, req) => {
      // Ensure JSON content-type for POST/PUT
      if (['POST', 'PUT', 'PATCH'].includes(proxyReq.method)) {
        proxyReq.setHeader('Content-Type', 'application/json');
      }
    },
  })
);

// Proxy coordinator feature endpoints
app.use(
  '/neekendukura/coordinator',
  createProxyMiddleware({
    target: COORDINATOR_TARGET,
    changeOrigin: true,
    pathRewrite: {
      '^/neekendukura/coordinator': '/api/coordinator',
    },
    onProxyReq: (proxyReq, req) => {
      if (['POST', 'PUT', 'PATCH'].includes(proxyReq.method)) {
        proxyReq.setHeader('Content-Type', 'application/json');
      }
    },
  })
);

// Proxy coordinator health check for simple diagnostics
app.use(
  '/neekendukura/coordinator/health',
  createProxyMiddleware({
    target: COORDINATOR_TARGET,
    changeOrigin: true,
    pathRewrite: {
      '^/neekendukura/coordinator/health': '/api/health',
    },
  })
);

// Proxy team registration endpoints
app.use(
  '/neekendukura/teams',
  createProxyMiddleware({
    target: COORDINATOR_TARGET,
    changeOrigin: true,
    pathRewrite: {
      '^/neekendukura/teams': '/api/teams',
    },
    onProxyReq: (proxyReq) => {
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(proxyReq.method)) {
        proxyReq.setHeader('Content-Type', 'application/json');
      }
    },
  })
);

// Health check route - now under /neekendukura
app.get('/neekendukura/health', (req, res) => {
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
    timestamp: new Date().toISOString(),
  });
});

/* =====================================================
   Error Handler
===================================================== */
app.use(errorLogger);

/* =====================================================
   Start Server - ASYNC PATTERN
===================================================== */
const startServer = async () => {
  try {
    // STEP 1: Connect to MongoDB FIRST
    console.log('🔌 Connecting to MongoDB...');
    await connectDB();
    console.log('✅ MongoDB Connected Successfully');

    // STEP 2: Initialize Queue after DB is ready
    await initializeQueue();
    console.log('✅ Queue Initialized');

    // STEP 3: Start Express server ONLY after DB is connected
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server started on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/neekendukura`);
      console.log(`💚 Health check at http://localhost:${PORT}/neekendukura/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);

      logger.info(`Server started on port ${PORT}`);
      logger.info(`API available at http://localhost:${PORT}/neekendukura`);
      logger.info(`Health check at http://localhost:${PORT}/neekendukura/health`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    }).on('error', (err) => {
      console.error('❌ Server startup error:', err);
      logger.error('Server startup error:', err);
      process.exit(1);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    console.error('💥 MongoDB connection failed - stopping process');
    logger.error('Failed to start server:', err);
    process.exit(1); // Exit if DB connection fails
  }
};

// Start the server
startServer();
