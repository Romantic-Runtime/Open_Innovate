# Vercel Deployment Guide

## Option 1: Separate Deployments (RECOMMENDED)

This is the most reliable approach for your full-stack application.

### Step 1: Deploy Backend

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository: `Romantic-Runtime/Open_Innovate`
4. Configure the project:
   - **Project Name**: `open-innovate-backend`
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. Add Environment Variables (click "Environment Variables"):
   ```
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   GEMINI_API_KEY=your_gemini_api_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   BASE_PATH=/api
   NODE_ENV=production
   ```

6. **IMPORTANT**: After deployment, note your backend URL (e.g., `https://open-innovate-backend.vercel.app`)

### Step 2: Deploy Frontend

1. Go to Vercel Dashboard again
2. Click **"Add New Project"**
3. Import the SAME GitHub repository: `Romantic-Runtime/Open_Innovate`
4. Configure the project:
   - **Project Name**: `open-innovate-frontend`
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variable:
   ```
   VITE_API_URL=https://open-innovate-backend.vercel.app
   ```

6. Click **Deploy**

### Step 3: Update OAuth Callback URLs

After frontend deployment, you'll get a URL like `https://open-innovate-frontend.vercel.app`

Update these in your backend environment variables on Vercel:
```
FRONTEND_ORIGIN=https://open-innovate-frontend.vercel.app
CLIENT_URL=https://open-innovate-frontend.vercel.app
GOOGLE_CALLBACK_URL=https://open-innovate-backend.vercel.app/api/auth/google/callback
GITHUB_CALLBACK_URL=https://open-innovate-backend.vercel.app/api/auth/github/callback
```

Also update in OAuth providers:
- **Google Cloud Console**: Add `https://open-innovate-backend.vercel.app/api/auth/google/callback`
- **GitHub OAuth**: Add `https://open-innovate-backend.vercel.app/api/auth/github/callback`

### Step 4: Update Frontend API Calls

Create `frontend/.env.production`:
```env
VITE_API_URL=https://open-innovate-backend.vercel.app
```

Or update your axios/fetch calls to use the backend URL.

---

## Option 2: Current Monorepo Deployment

If the current deployment works, your app will be available at one URL with:
- Frontend at `/`
- Backend at `/api/*`

Environment variables needed:
```
MONGO_URI=your_mongodb_connection_string
FRONTEND_ORIGIN=https://your-app.vercel.app
CLIENT_URL=https://your-app.vercel.app
SESSION_SECRET=your_session_secret
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-app.vercel.app/api/auth/google/callback
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=https://your-app.vercel.app/api/auth/github/callback
BASE_PATH=/api
NODE_ENV=production
```

---

## Troubleshooting

If you continue to see build errors:
1. Delete the current Vercel project
2. Use **Option 1** (Separate Deployments)
3. This approach is more reliable and follows Vercel best practices

## Need Help?

Check the deployment logs in Vercel Dashboard → Your Project → Deployments → View Logs
