# 🚀 Deploy Mahotsav Frontend

## Frontend Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Why Vercel?**
- ✅ **Free tier** with generous limits
- ✅ **Automatic HTTPS** and CDN
- ✅ **Zero-config** React deployment
- ✅ **Custom domains** (free)
- ✅ **Auto-deploy** on Git push
- ✅ **Edge functions** for performance

#### Quick Deploy to Vercel:

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Import Project** → Connect `Akash209581/mahotsav` repository
4. **Configure:**
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Environment Variables** (if needed):
   ```bash
   VITE_API_URL=https://mahotsav-backend.onrender.com/api
   ```

6. **Deploy!** - Auto-deploys on every push to main

**Your frontend will be live at:** `https://mahotsav-vignan.vercel.app`

---

### Option 2: GitHub Pages (Free)

#### Setup GitHub Pages:

1. **Go to your repository settings**
2. **Pages section** → Source: GitHub Actions
3. **Create workflow file:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

**Your frontend will be live at:** `https://akash209581.github.io/mahotsav`

---

### Option 3: Netlify (Alternative)

1. **Go to [netlify.com](https://netlify.com)**
2. **Connect GitHub** repository
3. **Build settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

---

## 🔧 Frontend Configuration

### API Connection Setup ✅
Your frontend is now configured to automatically connect to:
- **Development**: `http://localhost:5000/api` (when running locally)
- **Production**: `https://mahotsav-backend.onrender.com/api` (when deployed)

### Build Configuration

**Update your `vite.config.ts` if needed:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // For GitHub Pages compatibility
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
})
```

## 📱 Complete Deployment Steps

### 1. **Deploy Backend to Render**
- ✅ Already configured
- ✅ Use: `https://mahotsav-backend.onrender.com`

### 2. **Deploy Frontend** (Choose one):

#### Option A: Vercel (Easiest)
```bash
# One-time setup
npm install -g vercel
vercel --prod

# Or use GUI at vercel.com
```

#### Option B: GitHub Pages
```bash
# Create workflow file and push
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

### 3. **Update Backend CORS**
Make sure your Render backend includes your frontend domain in CORS:
```javascript
// In your backend server.js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mahotsav-vignan.vercel.app', // Your Vercel domain
    'https://akash209581.github.io' // Your GitHub Pages domain
  ]
}));
```

### 4. **Test Full Application**
- ✅ Frontend loads properly
- ✅ Backend API connection works
- ✅ User registration/login
- ✅ Event registration
- ✅ Email notifications

## 🌐 Domain Configuration (Optional)

### Custom Domain Setup:
1. **Buy domain** (name.com, godaddy, etc.)
2. **Point DNS** to your deployment:
   - **Vercel**: Add CNAME record
   - **GitHub Pages**: Add A record to GitHub IPs
3. **Enable HTTPS** (automatic on both platforms)

## 🚀 Performance Optimizations

### Frontend Optimizations:
- ✅ **Vite bundling** (automatic code splitting)
- ✅ **Image optimization** (WebP, lazy loading)
- ✅ **CDN delivery** (automatic on Vercel/Netlify)
- ✅ **Gzip compression** (automatic)

### Backend Optimizations:
- ✅ **Rate limiting** (implemented)
- ✅ **CORS security** (configured)
- ✅ **Compression middleware** (active)
- ✅ **Health monitoring** (/health endpoint)

## 💰 Cost Summary

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| **Frontend** (Vercel) | Hobby | **Free** |
| **Backend** (Render) | Free/Starter | **$0-7** |
| **Database** (MongoDB) | M0 | **Free** |
| **Redis** (Upstash) | Free tier | **Free** |
| **Total** | | **$0-7/month** |

## 🎯 Final URLs

After deployment, your complete application will be:

- **Frontend**: `https://mahotsav-vignan.vercel.app`
- **Backend API**: `https://mahotsav-backend.onrender.com/api`
- **Health Check**: `https://mahotsav-backend.onrender.com/health`

**Ready to handle 1000+ concurrent users!** 🎉

---

## 🔍 Troubleshooting

### Common Issues:
```bash
# CORS Error
# Fix: Add your frontend domain to backend CORS config

# API Connection Failed
# Fix: Update API_BASE_URL in api.ts

# Build Failed
# Fix: Check node_modules and run npm install

# 404 on Refresh
# Fix: Add _redirects file for SPA routing
```

Your Mahotsav application is now ready for production deployment! 🚀