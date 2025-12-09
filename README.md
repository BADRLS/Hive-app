# 🐝 Hive Academic Hub

A comprehensive academic management platform that integrates with Canvas LMS, Google Calendar, and Outlook to help students manage their assignments, tasks, and schedules in one centralized hub.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)

---

## ✨ Features

### Authentication & User Management
- ✅ **User Registration** - Secure signup with email and password
- ✅ **User Login** - JWT-based authentication
- ✅ **Password Reset** - Email-based password recovery with secure tokens
  - Automated email sending via Gmail SMTP
  - One-time use reset tokens with 1-hour expiration
  - Styled HTML emails with reset links

### Canvas LMS Integration
- ✅ **Course Synchronization** - Fetch all enrolled courses from Canvas
- ✅ **Assignment Tracking** - View all assignments across courses
- ✅ **Assignment Submission** - Submit assignments directly through Hive
- ✅ **Real-time Canvas Data** - Live sync with Canvas LMS

### Calendar Integration
- ✅ **Google Calendar Sync** - OAuth 2.0 integration for Google Calendar
- ✅ **Outlook Calendar Sync** - Integration with Microsoft Outlook
- ✅ **Event Management** - View and manage calendar events
- ✅ **Multi-Calendar Support** - Aggregate events from multiple sources

### Task Management
- ✅ **Task Dashboard** - Visual task organization with priority indicators
- ✅ **Task Creation** - Create custom tasks and reminders
- ✅ **Task Prioritization** - High, medium, low priority levels
- ✅ **Due Date Tracking** - Track deadlines and upcoming tasks

### Notifications
- ✅ **Assignment Notifications** - Get notified about new assignments
- ✅ **Due Date Reminders** - Alerts for approaching deadlines
- ✅ **Notification Center** - Centralized notification management

### Intelligent Features
- ✅ **AI-Powered Task Prioritization** - Python logic engine for smart task sorting
- ✅ **Assignment Analytics** - Track assignment completion and performance

### Testing
- ✅ **Backend Unit Tests** - 14 Jest tests for authentication and email service
- ✅ **Frontend Unit Tests** - 17 Vitest tests for React components
- ✅ **API Mocking** - Comprehensive test coverage with mocked dependencies

---

## 🛠️ Tech Stack

### Frontend
- **React** 18 with TypeScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Testing Library** - Component testing

### Backend
- **Node.js** with Express.js
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Axios** - HTTP client for external APIs

### Logic Engine
- **Python** with Flask
- **AI/ML** capabilities for task prioritization

### Testing
- **Jest** + **Supertest** - Backend testing
- **Vitest** + **React Testing Library** - Frontend testing

---

## 📦 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v16 or higher)
- **PostgreSQL** (v12 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **Git**

### Required API Keys & Credentials
- Canvas LMS API token
- Google OAuth 2.0 credentials (Client ID & Secret)
- Gmail account with App Password for email service
- Microsoft Outlook credentials (optional)

---

## 📥 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/hive-academic-hub2.git
cd hive-academic-hub2
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Set up database
# Create a PostgreSQL database named 'hive_db'
createdb hive_db

# Run migrations (if any)
# Migration files are in backend/migrations/
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install
```

### 4. Logic Engine Setup
```bash
cd logic-engine

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

---

## 🚀 How to Run

### Running the Complete Application

You'll need **three terminal windows** to run all services:

#### Terminal 1: Backend Server
```bash
cd backend
npm run dev
```
✅ Backend will run on `http://localhost:5000`

#### Terminal 2: Frontend Server
```bash
cd frontend
npm run dev
```
✅ Frontend will run on `http://localhost:5173`

#### Terminal 3: Logic Engine
```bash
cd logic-engine
python app.py
```
✅ Logic engine will run on `http://localhost:5001`

### First Time Setup

1. **Visit** `http://localhost:5173` in your browser
2. **Sign up** for a new account
3. **Log in** with your credentials
4. **Connect integrations:**
   - Go to Settings → Account Linking
   - Add your Canvas API token
   - Connect Google Calendar (OAuth flow)
   - Connect Outlook (optional)

---

## 🧪 Testing

### Backend Tests
```bash
cd backend

# Run all tests
npm test

# Watch mode (re-run on changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

**Test Coverage:** 14/14 tests passing ✅
- Authentication routes (signup, login, forgot password, reset password)
- Email service functionality

### Frontend Tests
```bash
cd frontend

# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

**Test Coverage:** LoginPage component with 17 test cases
- Login flow
- Signup flow
- Forgot password flow
- User interactions

---

## 🔐 Environment Variables

### Backend (`.env`)

Create a `.env` file in the `backend` directory:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/hive_db

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Server Port
PORT=5000

# Email Service (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password

# Google OAuth (for Calendar)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/oauth/google/callback

# Canvas API
CANVAS_API_BASE_URL=https://your-university.instructure.com/api/v1

# Outlook (optional)
OUTLOOK_CLIENT_ID=your-outlook-client-id
OUTLOOK_CLIENT_SECRET=your-outlook-client-secret
```

### Frontend

No environment variables needed. API calls are proxied through Vite config.

### Logic Engine

No environment variables needed by default.

---

## 📁 Project Structure

```
hive-academic-hub2/
├── backend/                 # Node.js Express backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── services/       # Business logic services
│   │   ├── middleware/     # Express middleware
│   │   └── utils/          # Utility functions
│   ├── __tests__/          # Jest unit tests
│   ├── migrations/         # Database migrations
│   └── package.json
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── test/          # Test setup
│   │   └── index.css      # Global styles
│   └── package.json
│
├── logic-engine/          # Python Flask service
│   ├── app.py            # Main Flask application
│   └── requirements.txt
│
└── README.md
```

---

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user
```json
{
  "email": "student@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

#### POST `/api/auth/login`
Authenticate user
```json
{
  "email": "student@example.com",
  "password": "securepassword"
}
```

#### POST `/api/auth/forgot-password`
Request password reset
```json
{
  "email": "student@example.com"
}
```

#### POST `/api/auth/reset-password`
Reset password with token
```json
{
  "token": "reset-token-from-email",
  "newPassword": "newpassword123"
}
```

### Canvas Integration

#### GET `/api/canvas/courses`
Fetch all enrolled courses (requires auth token)

#### GET `/api/canvas/assignments`
Fetch all assignments across courses

#### POST `/api/canvas/assignments/:id/submit`
Submit an assignment

### Google Calendar

#### GET `/api/oauth/google`
Initiate Google OAuth flow

#### GET `/api/oauth/google/callback`
OAuth callback handler

#### GET `/api/google/calendar/events`
Fetch Google Calendar events

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is for academic purposes.

---

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists: `psql -l`

### Email Not Sending
- Verify Gmail App Password is correct
- Check 2-Step Verification is enabled on Google Account
- Ensure no spaces in `EMAIL_APP_PASSWORD`

### Canvas Integration Not Working
- Verify Canvas API token is valid
- Check `CANVAS_API_BASE_URL` matches your institution
- Ensure you have necessary permissions in Canvas

### Google Calendar OAuth Errors
- Check redirect URI matches in Google Console
- Verify Client ID and Secret are correct
- Ensure OAuth consent screen is configured

---

## 📧 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for academic success**
