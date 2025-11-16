# Render Deployment Configuration

## Build Command
```bash
npm install
```

## Start Command  
```bash
npm start
```

## Environment Variables (Set in Render Dashboard)

### Required Environment Variables:
```
NODE_ENV=production
PORT=10000

# Database
MONGODB_URI=mongodb+srv://mahotsavvignan2025_db_user:mYzQ87sgJ3vKbh0L@events.nghtwjg.mongodb.net/test?retryWrites=true&w=majority&appName=Events

# JWT Security  
JWT_SECRET=mahotsav-vignan-2025-super-secret-jwt-key-for-production-deployment-make-this-very-long-and-random
JWT_EXPIRES_IN=7d

# Redis (Use Render Redis Add-on or external Redis)
REDIS_URL=redis://localhost:6379

# Email
GMAIL_USER=mahotsavvignan2025@gmail.com
GMAIL_APP_PASSWORD=sfpgnlnloxthfhxt

# Frontend URL (Update with your Vercel domain)
FRONTEND_URL=https://your-vercel-app.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

## Render Service Settings:
- **Service Type**: Web Service
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 18+ (auto-detected from package.json engines)
- **Instance Type**: Free Tier (512MB RAM) - Good for development/testing
- **Auto-Deploy**: Yes (on Git push)

## Health Check:
Render will automatically check: `https://your-app-name.onrender.com/health`