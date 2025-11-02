# OpenInnovate - Complete Setup Guide

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory and install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables:**
   - Create a `.env` file in the backend directory
   - Add the following variables:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret_key
   
   # Frontend URLs
   FRONTEND_ORIGIN=http://localhost:3000
   FRONTEND_GOOGLE_CALLBACK_URL=http://localhost:3000/auth/callback
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:8000/auth/google/callback
   ```

3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory and install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

## 🎨 Features

### Authentication System
- ✅ Email/Password Registration
- ✅ Email/Password Login
- ✅ Google OAuth Integration
- ✅ Session Management
- ✅ Protected Routes
- ✅ Logout Functionality

### Pages Created
1. **Landing Page** (`/`)
   - Hero section with CTAs
   - Features showcase
   - How it works section
   - Pricing plans

2. **Login Page** (`/login`)
   - Email/password form
   - Google OAuth button
   - Form validation
   - Error handling

3. **Signup Page** (`/signup`)
   - Registration form
   - Password confirmation
   - Google OAuth button
   - Form validation

4. **Dashboard** (`/dashboard`)
   - Protected route (requires authentication)
   - User profile display
   - Quick actions cards

## 🔧 Backend API Endpoints Used

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback

## 🎨 Theme & Design

The application uses your landing page theme:
- **Primary Color:** `#7FFF00` (Chartreuse Green)
- **Background:** `#000000` (Black)
- **Text:** `#FFFFFF` (White) with `#CCCCCC` for secondary
- **Font:** System fonts for performance
- **Design:** Modern, minimalist with glassmorphism effects

## 📦 Dependencies

### Frontend
- React 18.2.0
- React Router DOM 6.20.0
- Axios 1.6.2
- Vite 5.0.8

### Backend (Already Installed)
- Express
- Passport.js
- MongoDB/Mongoose
- Express Session
- Cookie Parser

## 🔐 CORS Configuration

Make sure your backend has CORS configured:

```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
```

## 🧪 Testing the Integration

1. Start both servers (backend and frontend)
2. Navigate to `http://localhost:3000`
3. Click "Register" to create a new account
4. Fill in the registration form
5. After successful registration, login with your credentials
6. You should be redirected to the dashboard

### Test Google OAuth
1. Click "Continue with Google" on login/signup page
2. Authorize with your Google account
3. You'll be redirected back to the dashboard

## 📁 Project Structure

```
hackwithup/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── auth-route.js
│   │   ├── controller/
│   │   │   └── auth-controller.js
│   │   ├── services/
│   │   │   └── auth-service.js
│   │   └── validation/
│   │       └── auth-validation.js
│   └── index.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── LandingPage.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   └── Dashboard.jsx
    │   ├── services/
    │   │   └── api.js
    │   └── App.jsx
    └── package.json
```

## 🐛 Troubleshooting

### CORS Errors
- Ensure backend CORS is configured for `http://localhost:3000`
- Check that `credentials: true` is set in both frontend and backend

### Login Not Working
- Verify backend is running on port 8000
- Check MongoDB connection
- Ensure session secret is configured

### Google OAuth Issues
- Verify Google OAuth credentials in `.env`
- Check callback URLs match in Google Console
- Ensure redirect URIs are whitelisted

## 🚀 Next Steps

1. Add email verification
2. Implement password reset
3. Add more OAuth providers (GitHub, Twitter)
4. Enhance dashboard functionality
5. Add project management features
6. Implement matchmaking system

## 📝 Notes

- Frontend uses session-based authentication with cookies
- Protected routes automatically redirect to login
- User data is stored in localStorage for persistence
- All forms include client-side validation
- Responsive design works on all screen sizes

## 🤝 Support

For issues or questions:
1. Check the console for errors
2. Verify environment variables
3. Ensure all dependencies are installed
4. Check that both servers are running

Happy coding! 🎉
