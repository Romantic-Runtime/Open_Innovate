# OpenInnovate Frontend

A modern React application for connecting innovators and teams, built with Vite and integrated with authentication backend.

## Features

- 🎨 Modern UI with green/black theme matching the landing page
- 🔐 Complete authentication system (Login/Signup)
- 🔗 Backend integration with REST APIs
- 🚀 Google OAuth integration
- 📱 Fully responsive design
- ⚡ Fast development with Vite

## Tech Stack

- React 18
- React Router v6
- Axios for API calls
- Vite for build tooling
- CSS3 with animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Backend server running on http://localhost:8000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable components
│   │   └── ProtectedRoute.jsx
│   ├── context/          # React Context (Auth)
│   │   └── AuthContext.jsx
│   ├── pages/            # Page components
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Dashboard.jsx
│   ├── services/         # API services
│   │   └── api.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## API Integration

The frontend connects to the following backend endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/google` - Google OAuth login

## Features Implemented

### Authentication Pages
- **Login Page**: Email/password login + Google OAuth
- **Signup Page**: User registration with validation
- **Dashboard**: Protected route for authenticated users

### Landing Page
- Hero section with CTAs
- Features showcase
- How it works section
- Pricing plans
- Fully responsive design

## Environment Configuration

Make sure your backend is configured with:
- CORS enabled for `http://localhost:3000`
- Session/cookie settings with proper domain
- Google OAuth credentials set up

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Styling

The application uses a consistent theme:
- Primary Color: `#7FFF00` (Chartreuse Green)
- Background: `#000000` (Black)
- Accent: Various shades of green
- Typography: System fonts for optimal performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
