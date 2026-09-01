# Deployment Guide - URL Shortener App

This guide explains how to deploy the URL Shortener app to free hosting platforms.

## 🎯 Best Free Hosting Options

| Platform | Backend | Frontend | Free Tier | Best For |
|----------|---------|----------|-----------|----------|
| **Render.com** ⭐ | ✅ | ✅ | Yes | Full-stack (Recommended) |
| **Railway.app** | ✅ | ✅ | $5/month | Full-stack with better performance |
| **Vercel + Render** | Render | ✅ | Yes | Vercel (frontend) + Render (backend) |

## 📦 Option 1: Deploy to Render.com (Recommended - Easiest)

### Step 1: Build the React App

Before deploying, we need to build the React frontend:

```bash
cd client
npm run build
cd ..
```

This creates an optimized build in `client/build/`.

### Step 2: Create Render Account

1. Go to [Render.com](https://render.com)
2. Click "Get Started"
3. Sign up with GitHub (authorize the app)

### Step 3: Connect GitHub Repository

1. Go to Render Dashboard
2. Click "New" → "Web Service"
3. Select "Connect a repository"
4. Find and connect `url-shortener-app`
5. Click "Connect"

### Step 4: Configure Render Service

**Configuration:**
- **Name**: `url-shortener-app` (or your choice)
- **Environment**: `Node`
- **Build Command**: `bash build.sh` (or `npm install --prefix server && npm install --prefix client && npm run build --prefix client`)
- **Start Command**: `cd server && node server.js`
- **Plan**: Free

### Step 5: Add Environment Variables

1. In Render dashboard, go to "Environment"
2. Add these variables:
```
NODE_ENV = production
PORT = (leave default - Render sets this automatically)
BASE_URL = https://your-app-name.onrender.com
```

Replace `your-app-name` with your actual Render service name.

### Step 6: Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete (2-3 minutes)
3. You'll get a URL like: `https://your-app-name.onrender.com`

✅ **Done!** Your app is live!

---

## 📦 Option 2: Deploy to Railway.app

### Step 1: Create Account

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: Create New Project

1. Click "New Project" → "Deploy from GitHub repo"
2. Select your `url-shortener-app` repository

### Step 3: Configure Build & Start Commands

1. In Railway, click on your project
2. Go to "Settings" → "Build & Deploy"
3. Set these commands:
   - **Build**: `npm install --prefix server && npm install --prefix client && npm run build --prefix client`
   - **Start**: `cd server && npm start`

### Step 4: Add Environment Variables

In Railway dashboard:
```
NODE_ENV = production
BASE_URL = https://your-railway-domain.railway.app
```

### Step 5: Deploy

Railway automatically deploys when you push to GitHub.

---

## 📦 Option 3: Deploy Backend + Frontend Separately

### Backend (Render.com)

1. Create new "Web Service" on Render
2. Build Command: `cd server && npm install`
3. Start Command: `cd server && node server.js`
4. Add `BASE_URL` environment variable

### Frontend (Vercel)

1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects it's a monorepo
4. Configure:
   - **Framework**: React
   - **Root Directory**: `client`
5. Add environment variable:
   ```
   REACT_APP_API_URL = https://your-render-backend.onrender.com
   ```
6. Deploy

---

## 🔧 Environment Variables Explained

### Production Variables

```bash
# This tells the server to run in production mode
NODE_ENV=production

# The public URL of your deployed app (used for generating short URLs)
BASE_URL=https://your-app-name.onrender.com

# Port (Render manages this automatically)
PORT=10000 (Render default)
```

### Example Production URLs Generated

When deployed with `BASE_URL=https://url-shortener-app.onrender.com`:

- Original URL: `https://github.com/features/copilot`
- Shortened to: `https://url-shortener-app.onrender.com/abc123`

---

## 🔗 Testing Your Deployment

After deployment, test these:

1. **Create a short URL**
   ```
   POST https://your-app.onrender.com/api/shorten
   Body: { "url": "https://github.com" }
   ```

2. **Visit the short URL**
   ```
   https://your-app.onrender.com/abc123
   ```
   Should redirect to GitHub

3. **Get all URLs**
   ```
   https://your-app.onrender.com/api/urls
   ```

---

## ⚠️ Important Notes

### Database Persistence

- SQLite database (`urls.db`) is stored in the `/tmp` directory on free tier
- **Data may be lost** when the server restarts
- For persistent data, upgrade to paid tier or use external database

### Free Tier Limitations

**Render.com Free:**
- ✅ 0.5 CPU, 512 MB RAM
- ✅ 100 GB bandwidth/month
- ❌ Spins down after 15 minutes of inactivity
- ❌ Takes 5-10 seconds to wake up

**Solutions:**
- Upgrade to paid tier
- Use Uptime Robot to keep it alive: [uptimerobot.com](https://uptimerobot.com)

---

## 📈 Keep Your Free App Alive

Use a free monitoring service to prevent spin-down:

### Uptime Robot Setup

1. Go to [UptimeRobot.com](https://uptimerobot.com)
2. Sign up (free)
3. Click "Add Monitor"
4. Set these:
   - **Monitor Type**: HTTP(s)
   - **URL to monitor**: `https://your-app.onrender.com/api/urls`
   - **Monitoring Interval**: Every 5 minutes
5. Save

This keeps your app awake 24/7 on the free tier! 🎉

---

## 🔄 Continuous Deployment

### Automatic Updates

Both Render and Railway automatically deploy when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main
```

Your app updates automatically! ✨

---

## ❓ Troubleshooting Deployment

### "Port already in use"
- Render/Railway manage ports automatically
- Remove hardcoded port references

### "Database not found"
- Check that `urls.db` is created in the server directory
- On first run, it auto-creates

### "Static files not loading"
- React build must exist in `client/build/`
- Run `npm run build --prefix client` locally first

### "Long startup time"
- Free tier takes 10-30 seconds to start
- Normal behavior - consider upgrading for faster startup

---

## 📊 Deployment Comparison

| Feature | Render | Railway | Vercel+Render |
|---------|--------|---------|---|
| Ease | Very Easy | Easy | Medium |
| Free Tier | ✅ | $ | ✅ |
| Speed | Slow (cold start) | Fast | Fast |
| Setup Time | 5 minutes | 5 minutes | 10 minutes |
| Best For | Beginners | Production | Pro |

---

## 🚀 Next Steps After Deployment

1. **Share your app**: Send the live URL to friends
2. **Test everything**: Create, redirect, delete URLs
3. **Monitor uptime**: Set up Uptime Robot
4. **Get feedback**: Ask users for improvements
5. **Add features**: Implement ideas from README

---

## 💡 Tips & Tricks

- Use short domain: Create a custom domain on Render (paid)
- Monitor logs: View server logs in Render/Railway dashboard
- Scale up: Upgrade to paid tier as your app grows
- Backup data: Export URLs regularly

---

**Your app is ready to go live! 🎉**
