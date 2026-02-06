# Rentals Module - Production Deployment Guide

**Target:** Deploy Backend (Railway) + Frontend (Vercel) in 2-3 hours

**Result:** Live demo URL ready for pilot recruitment in Da Nang

---

## 🎯 Quick Overview

**Step 1:** Deploy Backend to Railway (15-20 min)
**Step 2:** Deploy Frontend to Vercel (10-15 min)
**Step 3:** Configure Environment Variables (10 min)
**Step 4:** End-to-End Testing (30 min)

**Total Time:** ~90 minutes

---

## 📋 Prerequisites

### Accounts Needed (All Free Tier)

- [Railway.app](https://railway.app) - Backend hosting
- [Vercel.com](https://vercel.com) - Frontend hosting
- GitHub account (for deployment)

### Before Starting

- ✅ Commit all local changes to git
- ✅ Push to GitHub
- ✅ Have WhatsApp Business number ready
- ✅ Have bank account for VietQR ready

---

## 🚂 Step 1: Deploy Backend to Railway (15-20 min)

### 1.1 Push Code to GitHub

```bash
# Make sure you're in the project root
cd /Users/gianfrancodagostino/Desktop/qr-platform-complete

# Add deployment configs
git add packages/rentals/railway.toml packages/rentals/.env.production.example packages/rentals/frontend/vercel.json packages/rentals/frontend/.env.production.example packages/rentals/DEPLOYMENT-GUIDE.md

# Commit
git commit -m "feat: Add deployment configurations for Railway + Vercel"

# Push to GitHub
git push origin main
```

### 1.2 Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize GitHub access
5. Select repository: `qr-platform-complete`
6. Railway will detect the monorepo

### 1.3 Configure Root Directory

⚠️ **IMPORTANT:** Railway needs to know which folder to deploy

1. In Railway dashboard, click on your service
2. Go to **Settings** → **Source**
3. Set **Root Directory**: `packages/rentals`
4. Click **Save**

Railway will now:

- Read `railway.toml` config
- Run `npm install`
- Run `npm start`
- Health check on `/health`

### 1.4 Set Environment Variables

In Railway dashboard → **Variables** tab, add:

```bash
# Required
NODE_ENV=production
WHATSAPP_BUSINESS_PHONE=+84905123456
VIETQR_BANK_BIN=970436
VIETQR_ACCOUNT_NUMBER=1234567890
VIETQR_ACCOUNT_NAME=DA_NANG_BIKE_RENTALS

# CORS (will update after Vercel deployment)
CORS_ORIGIN=*

# Optional (leave empty for mock data)
AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
CAL_COM_EMBED_URL=
```

**Note:** `CORS_ORIGIN` will be updated in Step 3 after Vercel deployment

### 1.5 Deploy & Get URL

1. Click **Deploy** (Railway auto-deploys on push)
2. Wait 2-3 minutes for build
3. Once deployed, click **Settings** → **Domains**
4. Click **Generate Domain**
5. Copy the URL (e.g., `https://qr-platform-rentals.up.railway.app`)

### 1.6 Test Backend

```bash
# Replace with your Railway URL
curl https://your-app.up.railway.app/health

# Should return:
# {"status":"ok","service":"rentals-module","version":"1.0.0"}

# Test fleet endpoint
curl https://your-app.up.railway.app/api/rentals/550e8400-e29b-41d4-a716-446655440000/fleet

# Should return 6 bikes
```

✅ **Backend Deployed!** Save your Railway URL for Step 2.

---

## ▲ Step 2: Deploy Frontend to Vercel (10-15 min)

### 2.1 Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

**Or** deploy via Vercel Dashboard (recommended for first time).

### 2.2 Deploy via Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import Git Repository → Select `qr-platform-complete`
4. Vercel will detect Next.js automatically

### 2.3 Configure Build Settings

⚠️ **IMPORTANT:** Configure monorepo settings

- **Framework Preset:** Next.js
- **Root Directory:** `packages/rentals/frontend`
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

### 2.4 Set Environment Variables

In Vercel dashboard → **Settings** → **Environment Variables**, add:

```bash
NEXT_PUBLIC_API_URL=https://your-railway-app.up.railway.app/api/rentals
```

⚠️ Replace with your actual Railway URL from Step 1.5

### 2.5 Deploy

1. Click **Deploy**
2. Wait 2-3 minutes for build
3. Once deployed, Vercel shows your URL (e.g., `https://qr-platform-rentals-frontend.vercel.app`)

### 2.6 Test Frontend

1. Open the Vercel URL in browser
2. Should see "Da Nang Bike Rentals" homepage
3. Should see 6 bikes in fleet gallery (Honda, Yamaha, VinFast, Giant, Trek)
4. Click "Select This Bike" → Should scroll to contact form

✅ **Frontend Deployed!** Save your Vercel URL.

---

## 🔗 Step 3: Update CORS Configuration (5 min)

Now that you have the Vercel URL, update Railway backend:

1. Go to Railway dashboard
2. Select your backend service
3. Go to **Variables** tab
4. Update `CORS_ORIGIN`:

```bash
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

5. Click **Save**
6. Railway will auto-redeploy (~1 minute)

---

## ✅ Step 4: End-to-End Testing (30 min)

### 4.1 API Connectivity Test

Open browser DevTools (F12) → Console, then visit your Vercel URL:

```javascript
// Should NOT see CORS errors in console
// Fleet should load 6 bikes
```

### 4.2 User Flow Testing

**Test 1: View Fleet**

1. Open Vercel URL
2. ✅ See 6 bikes: Honda Wave, Honda Vision, Yamaha Exciter, VinFast Evo, Giant ATX, Trek FX
3. ✅ Each bike shows brand, model, price

**Test 2: Contact Form → WhatsApp**

1. Click "Select This Bike" on Honda Wave
2. ✅ Scrolls to contact form
3. ✅ Bike model pre-filled
4. Fill name, phone, message
5. Click "Send Inquiry"
6. ✅ Redirects to WhatsApp with pre-filled message

**Test 3: Mobile Responsive**

1. Open DevTools → Toggle device toolbar (Ctrl+Shift+M)
2. Select iPhone 12 Pro
3. ✅ Layout adapts to mobile
4. ✅ Buttons are tappable
5. ✅ Text is readable

### 4.3 Performance Testing

Use Lighthouse (Chrome DevTools → Lighthouse):

**Expected Scores:**

- Performance: 85+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 100

If scores are lower:

- Check image optimization
- Check API response times
- Review console for errors

### 4.4 Category Testing (Backend v2.0)

Test new API features via browser:

```bash
# All bikes
https://your-vercel-app.vercel.app

# Should see 6 bikes across 4 categories
```

Manual API test (optional):

```bash
# Bicycles only
curl https://your-railway-app.up.railway.app/api/rentals/550e8400-e29b-41d4-a716-446655440000/fleet?category=bicycle

# Should return 2 bikes: Giant, Trek

# Duration pricing (7 days)
curl https://your-railway-app.up.railway.app/api/rentals/550e8400-e29b-41d4-a716-446655440000/fleet?duration=7

# Should return bikes with durationPricing object
```

---

## 🎉 Success Checklist

After all steps complete, verify:

- ✅ Backend health check returns 200 OK
- ✅ Frontend loads without errors
- ✅ Fleet shows 6 bikes (not 3)
- ✅ Contact form redirects to WhatsApp
- ✅ Mobile responsive design works
- ✅ No CORS errors in console
- ✅ Lighthouse score 85+
- ✅ WhatsApp message pre-fills correctly

---

## 📱 Demo URLs (After Deployment)

**Frontend (Vercel):**

```
https://your-project.vercel.app
```

**Backend API (Railway):**

```
https://your-project.up.railway.app/api/rentals/550e8400-e29b-41d4-a716-446655440000/fleet
```

**Share This URL for Pilot Recruitment:**

```
https://your-project.vercel.app
```

---

## 🔧 Troubleshooting

### Issue 1: "Error fetching fleet"

**Cause:** CORS misconfigured or backend down

**Fix:**

1. Check Railway logs: Dashboard → View Logs
2. Verify `CORS_ORIGIN` matches Vercel URL exactly
3. Ensure backend is running (check /health endpoint)

### Issue 2: "Module not found" in Vercel

**Cause:** Wrong root directory

**Fix:**

1. Vercel → Settings → General
2. Set Root Directory: `packages/rentals/frontend`
3. Redeploy

### Issue 3: Fleet shows 0 bikes

**Cause:** API URL misconfigured

**Fix:**

1. Vercel → Settings → Environment Variables
2. Check `NEXT_PUBLIC_API_URL` includes `/api/rentals` path
3. Redeploy

### Issue 4: WhatsApp redirect doesn't work

**Cause:** WhatsApp number format issue

**Fix:**

1. Railway → Variables
2. Ensure `WHATSAPP_BUSINESS_PHONE=+84905123456` (with + prefix)
3. Redeploy

---

## 🚀 Custom Domain (Optional)

### For Professional Demo

**Backend (Railway):**

1. Buy domain (e.g., `api.gudbro.com`)
2. Railway → Settings → Domains
3. Add custom domain
4. Update DNS: CNAME to Railway

**Frontend (Vercel):**

1. Buy domain (e.g., `danangbikes.gudbro.com`)
2. Vercel → Settings → Domains
3. Add custom domain
4. Update DNS: CNAME to Vercel

**Cost:** ~$10/year for domain

---

## 📊 Monitoring (Post-Deployment)

### Railway (Backend)

- **Metrics:** Dashboard → Metrics tab
- **Logs:** Dashboard → View Logs
- **Alerts:** Settings → Notifications

### Vercel (Frontend)

- **Analytics:** Dashboard → Analytics tab
- **Logs:** Dashboard → View Function Logs
- **Performance:** Lighthouse CI integration

---

## 🔄 Future Updates

### To Deploy Updates:

**Backend:**

```bash
git add .
git commit -m "update: Your change description"
git push origin main
# Railway auto-deploys on push
```

**Frontend:**

```bash
git add .
git commit -m "update: Your change description"
git push origin main
# Vercel auto-deploys on push
```

Both platforms auto-deploy on git push to `main` branch!

---

## 💰 Cost Breakdown

**Free Tier Limits:**

**Railway:**

- $5 credit/month (free)
- Enough for 500+ hours/month
- Auto-sleep after 5 min inactivity
- Wake on request (~2s)

**Vercel:**

- 100 GB bandwidth/month (free)
- Unlimited deployments
- Unlimited team members
- 1000 serverless function invocations/day

**Total Monthly Cost: $0** (within free tier)

**Estimated Traffic for 10 Pilot Customers:**

- ~100 visitors/day = 3000/month
- ~10 GB bandwidth/month
- **Well within free tier**

---

## 📞 Support

### Railway Issues

- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway

### Vercel Issues

- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

### Code Issues

- Check: `/packages/rentals/TEST-RESULTS-V2-MULTI-VENUE.md`
- Run locally: `npm start` (backend), `npm run dev` (frontend)

---

## 🎯 Next Steps After Deployment

1. ✅ **Save URLs** in password manager
2. 📱 **Test on mobile phone** (real device)
3. 📸 **Screenshot demo** for pilot recruitment pitch
4. 🏍️ **Visit Da Nang** rental shops tomorrow
5. 📊 **Collect feedback** from 10+ shops
6. 🔄 **Iterate** based on merchant needs

---

**Created:** 2025-11-06
**Status:** Ready for Deployment
**Estimated Time:** 90 minutes
**Difficulty:** ⭐⭐☆☆☆ (Beginner-friendly)

Good luck with deployment! 🚀
