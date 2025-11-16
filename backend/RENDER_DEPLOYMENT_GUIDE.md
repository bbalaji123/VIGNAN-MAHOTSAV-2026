# 🚀 Deploy Mahotsav Backend to Render

## Step-by-Step Deployment Guide

### 1. **Create Render Account**
- Go to [render.com](https://render.com)
- Sign up with GitHub (recommended for auto-deploy)

### 2. **Create New Web Service**
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Akash209581/mahotsav`
3. Configure service:

```
Service Name: mahotsav-backend
Environment: Node
Region: Oregon (US West) or closest to your users
Branch: main
Root Directory: backend
```

### 3. **Build & Deploy Settings**
```bash
Build Command: npm install
Start Command: npm start
```

### 4. **Environment Variables**
Add these in Render Dashboard → Environment:

```bash
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://mahotsavvignan2025_db_user:mYzQ87sgJ3vKbh0L@events.nghtwjg.mongodb.net/test?retryWrites=true&w=majority&appName=Events

# JWT Security
JWT_SECRET=mahotsav-vignan-2025-super-secret-jwt-key-for-production-deployment-make-this-very-long-and-random
JWT_EXPIRES_IN=7d

# Email
GMAIL_USER=mahotsavvignan2025@gmail.com
GMAIL_APP_PASSWORD=sfpgnlnloxthfhxt

# Frontend URLs (Update with your actual domains)
FRONTEND_URL=https://akash209581.github.io

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

### 5. **Optional: Add Redis (Upstash)**
For production Redis queue:
1. Go to [upstash.com](https://upstash.com)
2. Create free Redis database
3. Copy Redis URL
4. Add to Render environment variables:
```bash
REDIS_URL=rediss://default:password@region.upstash.io:port
```

### 6. **Deploy**
1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repo
   - Install dependencies
   - Start your server
   - Provide HTTPS URL

### 7. **Your Backend URL**
After deployment: `https://your-service-name.onrender.com`

### 8. **Update Frontend API URL**
Update your frontend `src/services/api.ts`:
```typescript
const API_BASE_URL = 'https://your-service-name.onrender.com/api';
```

### 9. **Test Deployment**
Check these endpoints:
- ✅ Health check: `https://your-service-name.onrender.com/health`
- ✅ API status: `https://your-service-name.onrender.com/`
- ✅ Registration: `https://your-service-name.onrender.com/api/register`

## 🔧 **Render Service Features**

### ✅ **Included by Default:**
- **HTTPS SSL** certificates (auto-generated)
- **Custom domains** (free on paid plans)
- **Auto-deploy** on Git push
- **Health checks** and monitoring
- **Logs** and metrics dashboard
- **Environment variables** management

### 💰 **Pricing:**
- **Free Tier**: 512MB RAM, sleeps after 15min inactivity
- **Starter ($7/month)**: 512MB RAM, no sleep
- **Standard ($25/month)**: 2GB RAM, better performance

## 🚀 **Production Optimizations**

### For High Traffic (1000+ users):
1. **Upgrade to Standard plan** ($25/month)
2. **Enable auto-scaling** (2-10 instances)
3. **Add Redis** via Upstash (free tier)
4. **Monitor performance** via Render dashboard

### Auto-Deploy Setup:
```bash
# Push changes to trigger auto-deploy
git add .
git commit -m "Update backend for Render deployment"
git push origin main
```

## 🔍 **Monitoring & Debugging**

### Render Dashboard provides:
- **Real-time logs**
- **Performance metrics** (CPU, RAM, requests)
- **Deployment history**
- **Environment variables** management
- **Service health** status

### Common Issues & Fixes:
```bash
# Issue: Port binding error
# Fix: Render automatically sets PORT env var

# Issue: CORS errors  
# Fix: Frontend URLs added to CORS config

# Issue: MongoDB connection timeout
# Fix: MongoDB Atlas IP whitelist (0.0.0.0/0 for Render)

# Issue: Redis connection failed
# Fix: Redis URL format or fallback to direct processing
```

## 🎉 **Deployment Checklist**

- [ ] GitHub repo connected to Render
- [ ] Environment variables configured  
- [ ] Build and start commands set
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Frontend API URL updated
- [ ] Health check responding
- [ ] Registration/login working
- [ ] Email functionality tested
- [ ] CORS configured for your domain
- [ ] Custom domain configured (optional)

**Your Mahotsav backend will be live at: `https://your-service-name.onrender.com`** 🚀

## 📱 **Next Steps:**
1. Deploy backend to Render
2. Update frontend API URL
3. Deploy frontend to Vercel/GitHub Pages  
4. Test full application flow
5. Configure custom domain
6. Monitor performance

Your production-ready architecture is now ready for deployment! 🎯