# 🚀 Quick Deployment Fix Guide

## Problem Fixed
Your frontend was trying to connect to `localhost:8000` even when deployed. Now it uses environment variables.

## 🔧 Next Steps to Complete Deployment

### Step 1: Deploy Backend First

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Import: `Romantic-Runtime/Open_Innovate`
4. Configuration:
   - **Project Name**: `open-innovate-backend` (or any name)
   - **Root Directory**: Select `backend`
   - **Framework**: Other
   - Leave build/output commands empty
   
5. **Add Environment Variables** (CRITICAL):
   ```
   MONGO_URI=<your_mongodb_connection_string>
   SESSION_SECRET=<generate_strong_secret>
   GEMINI_API_KEY=<your_gemini_key>
   GOOGLE_CLIENT_ID=<your_google_client_id>
   GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   GITHUB_CLIENT_ID=<your_github_client_id>
   GITHUB_CLIENT_SECRET=<your_github_client_secret>
   BASE_PATH=/api
   NODE_ENV=production
   ```

6. Click **Deploy**
7. **Copy the backend URL** (e.g., `https://open-innovate-backend.vercel.app`)

### Step 2: Update Backend Environment Variables

After backend deployment, add these two more variables:
```
FRONTEND_ORIGIN=https://your-frontend-url.vercel.app
CLIENT_URL=https://your-frontend-url.vercel.app
```

(You'll get the frontend URL in the next step)

### Step 3: Deploy Frontend

1. Go to Vercel Dashboard again
2. Click **"Add New Project"**
3. Import the SAME repo: `Romantic-Runtime/Open_Innovate`
4. Configuration:
   - **Project Name**: `open-innovate-frontend` (or any name)
   - **Root Directory**: Select `frontend`
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Add Environment Variable**:
   ```
   VITE_API_URL=https://open-innovate-backend.vercel.app
   ```
   (Use your actual backend URL from Step 1)

6. Click **Deploy**
7. **Copy your frontend URL**

### Step 4: Update Backend Environment Variables Again

1. Go to backend project settings → Environment Variables
2. Update these variables with your frontend URL:
   ```
   FRONTEND_ORIGIN=https://your-frontend-url.vercel.app
   CLIENT_URL=https://your-frontend-url.vercel.app
   GOOGLE_CALLBACK_URL=https://open-innovate-backend.vercel.app/api/auth/google/callback
   GITHUB_CALLBACK_URL=https://open-innovate-backend.vercel.app/api/auth/github/callback
   ```

3. Redeploy backend (Deployments → Three dots → Redeploy)

### Step 5: Update OAuth Providers

#### Google Cloud Console
1. Go to: https://console.cloud.google.com/apis/credentials
2. Edit your OAuth 2.0 Client
3. Add to **Authorized Redirect URIs**:
   ```
   https://open-innovate-backend.vercel.app/api/auth/google/callback
   ```

#### GitHub OAuth
1. Go to: https://github.com/settings/developers
2. Edit your OAuth App
3. Update **Authorization callback URL**:
   ```
   https://open-innovate-backend.vercel.app/api/auth/github/callback
   ```

### Step 6: MongoDB Atlas (if needed)

1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (Allow from anywhere)
   - This allows Vercel's serverless functions to connect

## ✅ Testing

After all steps:
1. Visit your frontend URL
2. Click "Sign in with Google"
3. Should redirect to Google OAuth (not localhost!)
4. After authorization, should redirect back to your app

## 🔍 Troubleshooting

- **CORS errors**: Check `FRONTEND_ORIGIN` in backend env vars
- **OAuth errors**: Verify callback URLs match in Google/GitHub console
- **Connection errors**: Check MongoDB allows connections from `0.0.0.0/0`
- **Still seeing localhost**: Clear browser cache or try incognito mode

## 📝 Environment Variables Summary

### Backend Env Vars
```env
MONGO_URI=mongodb+srv://...
FRONTEND_ORIGIN=https://your-frontend.vercel.app
CLIENT_URL=https://your-frontend.vercel.app
SESSION_SECRET=your-secret-key
GEMINI_API_KEY=your-key
GOOGLE_CLIENT_ID=your-id
GOOGLE_CLIENT_SECRET=your-secret
GOOGLE_CALLBACK_URL=https://your-backend.vercel.app/api/auth/google/callback
GITHUB_CLIENT_ID=your-id
GITHUB_CLIENT_SECRET=your-secret
GITHUB_CALLBACK_URL=https://your-backend.vercel.app/api/auth/github/callback
BASE_PATH=/api
NODE_ENV=production
```

### Frontend Env Vars
```env
VITE_API_URL=https://your-backend.vercel.app
```

---

**Need Help?** Check Vercel deployment logs for detailed error messages.
