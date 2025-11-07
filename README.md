# 🖼️ Image Search & Multi-Select - MERN Stack Project

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring OAuth authentication, image search functionality powered by Unsplash API, and multi-select capabilities.

## ✨ Features

- **🔐 OAuth Authentication**: Support for Google, Facebook, and GitHub login via Passport.js
- **🔍 Image Search**: Search for high-quality images using the Unsplash API
- **✅ Multi-Select Grid**: Select multiple images with a beautiful 4-column grid layout
- **📊 Top Searches**: View the top 5 most popular searches across all users
- **📜 Search History**: Track your personal search history with timestamps
- **🎨 Modern UI**: Beautiful, responsive design with gradient backgrounds and smooth animations
- **🔒 Protected Routes**: Only authenticated users can access the application

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication middleware
- **Express Session** - Session management
- **Axios** - HTTP client for Unsplash API

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with modern gradients and animations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
cd "Image Search and Multi Select"
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials. Below is a detailed explanation of each variable:

```env
# ============================================
# DATABASE CONFIGURATION
# ============================================
# MongoDB connection string
# Local: mongodb://localhost:27017/image-search-app
# Atlas: mongodb+srv://username:password@cluster.mongodb.net/dbname
MONGO_URI=mongodb://localhost:27017/image-search-app

# ============================================
# SERVER CONFIGURATION
# ============================================
# Port number for the Express server
PORT=5000

# Environment (development/production)
NODE_ENV=development

# ============================================
# SESSION SECURITY
# ============================================
# Secret key for session encryption
# Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# IMPORTANT: Use a strong random string in production
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# ============================================
# GOOGLE OAUTH 2.0
# ============================================
# Get from: https://console.cloud.google.com/
# 1. Create project → APIs & Services → Credentials
# 2. Create OAuth 2.0 Client ID
# 3. Add authorized redirect URI
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# ============================================
# FACEBOOK OAUTH
# ============================================
# Get from: https://developers.facebook.com/
# 1. Create app → Add Facebook Login
# 2. Get App ID and App Secret from Settings → Basic
# 3. Add Valid OAuth Redirect URI in Facebook Login → Settings
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
FACEBOOK_CALLBACK_URL=http://localhost:5000/auth/facebook/callback

# ============================================
# GITHUB OAUTH
# ============================================
# Get from: https://github.com/settings/developers
# 1. New OAuth App
# 2. Set Authorization callback URL
# 3. Copy Client ID and Client Secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback

# ============================================
# UNSPLASH API
# ============================================
# Get from: https://unsplash.com/developers
# 1. Create account / Sign in
# 2. Create new application
# 3. Copy Access Key
# Rate Limits: 50 requests/hour (Demo), 5000 requests/hour (Production)
UNSPLASH_ACCESS_KEY=your-unsplash-access-key

# ============================================
# FRONTEND URL
# ============================================
# URL where your React frontend is running
# Used for CORS and OAuth redirects
CLIENT_URL=http://localhost:3000
```

#### Environment Variables Reference Table

| Variable | Required | Description | Where to Get |
|----------|----------|-------------|--------------|
| `MONGO_URI` | ✅ Yes | MongoDB connection string | Local install or MongoDB Atlas |
| `PORT` | ⚠️ Optional | Server port (default: 5000) | Any available port |
| `NODE_ENV` | ⚠️ Optional | Environment mode | `development` or `production` |
| `SESSION_SECRET` | ✅ Yes | Session encryption key | Generate random string |
| `GOOGLE_CLIENT_ID` | ⚠️ Optional* | Google OAuth Client ID | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | ⚠️ Optional* | Google OAuth Client Secret | Google Cloud Console |
| `GOOGLE_CALLBACK_URL` | ⚠️ Optional* | Google OAuth callback URL | Must match Google Console |
| `FACEBOOK_APP_ID` | ⚠️ Optional* | Facebook App ID | Facebook Developers |
| `FACEBOOK_APP_SECRET` | ⚠️ Optional* | Facebook App Secret | Facebook Developers |
| `FACEBOOK_CALLBACK_URL` | ⚠️ Optional* | Facebook callback URL | Must match Facebook settings |
| `GITHUB_CLIENT_ID` | ⚠️ Optional* | GitHub OAuth Client ID | GitHub Developer Settings |
| `GITHUB_CLIENT_SECRET` | ⚠️ Optional* | GitHub OAuth Client Secret | GitHub Developer Settings |
| `GITHUB_CALLBACK_URL` | ⚠️ Optional* | GitHub callback URL | Must match GitHub app |
| `UNSPLASH_ACCESS_KEY` | ✅ Yes | Unsplash API Access Key | Unsplash Developers |
| `CLIENT_URL` | ✅ Yes | Frontend URL for CORS | Your React app URL |

**Note:** *At least ONE OAuth provider (Google, Facebook, OR GitHub) is required for authentication.

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../client
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `client` directory:

```bash
cp .env.example .env
```

Edit `.env` and configure the backend API URL:

```env
# Backend API URL
# Development: http://localhost:5000
# Production: Your production backend URL
REACT_APP_API_URL=http://localhost:5000
```

**Important:** 
- ⚠️ The `proxy` field in `package.json` is NOT used (removed to prevent CORS issues)
- ✅ All API calls use the full URL from `REACT_APP_API_URL`
- ✅ This ensures proper CORS handling in both development and production

#### Environment Files:
- `.env` - Your local development configuration (not committed to Git)
- `.env.example` - Template for environment variables (committed to Git)
- `.env.production` - Production configuration template

### 4. OAuth Provider Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `http://localhost:5000/auth/google/callback`
6. Copy Client ID and Client Secret to `.env`

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add "Facebook Login" product
4. In Settings → Basic, copy App ID and App Secret
5. In Facebook Login → Settings, add redirect URI: `http://localhost:5000/auth/facebook/callback`
6. Add credentials to `.env`

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set Authorization callback URL: `http://localhost:5000/auth/github/callback`
4. Copy Client ID and Client Secret to `.env`

#### Unsplash API
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy the Access Key to `.env`

### 5. Start MongoDB

Make sure MongoDB is running:

```bash
# On Windows (if MongoDB is installed as a service)
net start MongoDB

# On macOS/Linux
mongod
```

### 6. Run the Application

#### Start Backend Server (from server directory)
```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

#### Start Frontend (from client directory - open new terminal)
```bash
cd client
npm start
```

The React app will start on `http://localhost:3000`

## 📁 Project Structure

```
Image Search and Multi Select/
│
├── 📚 Documentation Files
│   ├── README.md                     # Main project documentation (you are here)
│   ├── GETTING_STARTED.md           # Quick setup guide
│   ├── SETUP_GUIDE.md               # Detailed setup instructions
│   ├── SETUP_CHECKLIST.md           # Verification checklist
│   ├── API_DOCUMENTATION.md         # Complete API reference
│   ├── ARCHITECTURE.md              # System architecture and diagrams
│   ├── PROJECT_SUMMARY.md           # Project overview
│   ├── ENV_VARIABLES.md             # Environment variables guide
│   ├── INDEX.md                     # Documentation navigation
│   └── PROJECT_COMPLETE.md          # Project completion summary
│
├── 🔧 Utility Scripts
│   ├── setup.bat                    # Automated setup (Windows)
│   ├── start-dev.bat                # Start both servers (Windows)
│   ├── package.json                 # Root package.json
│   └── .gitignore                   # Git ignore rules
│
├── 🖥️ server/                       # Backend (Node.js + Express)
│   │
│   ├── 📄 Core Files
│   │   ├── server.js                # Main Express server entry point
│   │   ├── package.json             # Backend dependencies
│   │   ├── .env.example             # Environment variables template
│   │   └── .gitignore               # Backend gitignore
│   │
│   ├── 📁 config/
│   │   └── passport.js              # Passport.js OAuth strategies configuration
│   │                                # - Google OAuth setup
│   │                                # - Facebook OAuth setup
│   │                                # - GitHub OAuth setup
│   │                                # - Serialize/deserialize user
│   │
│   ├── 📁 middleware/
│   │   └── auth.js                  # Authentication middleware
│   │                                # - isAuthenticated: Protects routes
│   │                                # - Checks req.user existence
│   │
│   ├── 📁 models/                   # MongoDB Mongoose models
│   │   ├── User.js                  # User model
│   │   │                            # - provider (google/facebook/github)
│   │   │                            # - providerId (OAuth ID)
│   │   │                            # - displayName, email, profilePhoto
│   │   │                            # - Indexes: {provider, providerId}
│   │   │
│   │   └── Search.js                # Search history model
│   │                                # - userId (ref to User)
│   │                                # - term (search keyword)
│   │                                # - timestamp
│   │                                # - Indexes: {userId, timestamp}, {term}
│   │
│   └── 📁 routes/                   # API route handlers
│       ├── auth.js                  # Authentication routes
│       │                            # - OAuth login routes
│       │                            # - Callback handlers
│       │                            # - User session route
│       │                            # - Logout route
│       │
│       └── api.js                   # Application API routes
│                                    # - GET /api/top-searches
│                                    # - POST /api/search
│                                    # - GET /api/history
│
└── 🌐 client/                       # Frontend (React.js)
    │
    ├── 📁 public/
    │   └── index.html               # HTML template
    │
    ├── 📄 Configuration
    │   ├── package.json             # Frontend dependencies
    │   └── .gitignore               # Frontend gitignore
    │
    └── 📁 src/                      # React source code
        │
        ├── 📄 Entry & Root
        │   ├── index.js             # React app entry point
        │   ├── index.css            # Global styles
        │   ├── App.js               # Main App component with routing
        │   └── App.css              # App-level styles
        │
        ├── 📁 services/
        │   └── api.js               # Axios API client
        │                            # - API endpoints configuration
        │                            # - OAuth URL helpers
        │                            # - Credentials handling
        │
        └── 📁 components/           # React components
            │
            ├── Login.js             # Login page component
            ├── Login.css            # - OAuth provider buttons
            │                        # - Redirects to OAuth flows
            │                        # - Beautiful gradient design
            │
            ├── Dashboard.js         # Main dashboard component
            ├── Dashboard.css        # - Layout and state management
            │                        # - Integrates all child components
            │                        # - Handles search logic
            │
            ├── SearchBar.js         # Search input component
            ├── SearchBar.css        # - Search term input
            │                        # - Submit handler
            │                        # - Loading states
            │
            ├── ImageGrid.js         # Image grid with multi-select
            ├── ImageGrid.css        # - 4-column responsive grid
            │                        # - Checkbox overlays
            │                        # - Selection state management
            │                        # - Hover effects
            │
            ├── TopSearches.js       # Top searches banner
            ├── TopSearches.css      # - Displays top 5 searches
            │                        # - Clickable search tags
            │                        # - Shows search counts
            │
            ├── SearchHistory.js     # User search history sidebar
            └── SearchHistory.css    # - Last 20 searches
                                     # - Relative timestamps
                                     # - Click to re-search

Total Files: 43
- Backend: 13 files (~1,200 lines of code)
- Frontend: 18 files (~1,800 lines of code)
- Documentation: 10 files (~4,500 lines)
- Utilities: 2 scripts
```

### Key Directories Explained

#### `server/config/`
Configuration files for third-party services and authentication strategies. Contains Passport.js setup for OAuth.

#### `server/middleware/`
Custom Express middleware functions. Currently contains authentication middleware to protect routes.

#### `server/models/`
Mongoose schemas and models defining the structure of MongoDB documents.

#### `server/routes/`
Express route handlers organized by functionality (authentication vs application APIs).

#### `client/src/components/`
Reusable React components. Each component has its own JS and CSS file for modularity.

#### `client/src/services/`
Service layer for external communications, primarily the Axios API client for backend communication.

## 🔌 API Endpoints

### Base URL
```
Development: http://localhost:5000
Production: https://your-domain.com
```

---

### Authentication Endpoints

#### 1. Initiate Google OAuth Login
```http
GET /auth/google
```

**Description:** Redirects user to Google OAuth consent page

**Response:** HTTP 302 Redirect to Google

**cURL Example:**
```bash
curl -L http://localhost:5000/auth/google
```

---

#### 2. Google OAuth Callback
```http
GET /auth/google/callback
```

**Description:** Handles Google OAuth callback and creates user session

**Parameters:** (Handled automatically by Google)

**Response:** HTTP 302 Redirect to frontend

---

#### 3. Initiate Facebook OAuth Login
```http
GET /auth/facebook
```

**Description:** Redirects user to Facebook OAuth consent page

**Response:** HTTP 302 Redirect to Facebook

**cURL Example:**
```bash
curl -L http://localhost:5000/auth/facebook
```

---

#### 4. Facebook OAuth Callback
```http
GET /auth/facebook/callback
```

**Description:** Handles Facebook OAuth callback and creates user session

**Response:** HTTP 302 Redirect to frontend

---

#### 5. Initiate GitHub OAuth Login
```http
GET /auth/github
```

**Description:** Redirects user to GitHub OAuth consent page

**Response:** HTTP 302 Redirect to GitHub

**cURL Example:**
```bash
curl -L http://localhost:5000/auth/github
```

---

#### 6. GitHub OAuth Callback
```http
GET /auth/github/callback
```

**Description:** Handles GitHub OAuth callback and creates user session

**Response:** HTTP 302 Redirect to frontend

---

#### 7. Get Current User
```http
GET /auth/user
```

**Description:** Returns the currently authenticated user's information

**Authentication:** Session cookie required

**Success Response (200 OK):**
```json
{
  "authenticated": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "displayName": "John Doe",
    "email": "john@example.com",
    "profilePhoto": "https://lh3.googleusercontent.com/a/...",
    "provider": "google"
  }
}
```

**Unauthenticated Response (200 OK):**
```json
{
  "authenticated": false
}
```

**cURL Example:**
```bash
# After logging in and obtaining session cookie
curl -X GET http://localhost:5000/auth/user \
  -H "Cookie: connect.sid=s%3A..." \
  --cookie-jar cookies.txt
```

**Postman:**
- Method: `GET`
- URL: `http://localhost:5000/auth/user`
- Headers: None (cookies handled automatically)
- Body: None

---

#### 8. Logout
```http
GET /auth/logout
```

**Description:** Logs out the current user and destroys session

**Authentication:** Session cookie required

**Success Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

**Error Response (500):**
```json
{
  "error": "Logout failed"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/auth/logout \
  -H "Cookie: connect.sid=s%3A..." \
  --cookie cookies.txt
```

**Postman:**
- Method: `GET`
- URL: `http://localhost:5000/auth/logout`
- Headers: None
- Body: None

---

### Application API Endpoints (Protected)

All these endpoints require authentication (valid session cookie).

#### 1. Get Top Searches
```http
GET /api/top-searches
```

**Description:** Returns the top 5 most frequently searched terms across all users

**Authentication:** ✅ Required

**Success Response (200 OK):**
```json
[
  {
    "term": "nature",
    "count": 45
  },
  {
    "term": "technology",
    "count": 32
  },
  {
    "term": "architecture",
    "count": 28
  },
  {
    "term": "people",
    "count": 21
  },
  {
    "term": "food",
    "count": 18
  }
]
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized",
  "message": "You must be logged in to access this resource"
}
```

**Error Response (500):**
```json
{
  "error": "Failed to fetch top searches",
  "message": "Error details..."
}
```

**cURL Example:**
```bash
# Using saved cookies from login
curl -X GET http://localhost:5000/api/top-searches \
  -H "Cookie: connect.sid=s%3A..." \
  --cookie cookies.txt
```

**Postman:**
- Method: `GET`
- URL: `http://localhost:5000/api/top-searches`
- Headers: None (cookies handled automatically after OAuth login)
- Body: None

---

#### 2. Search Images
```http
POST /api/search
```

**Description:** Searches for images using Unsplash API and stores the search in user's history

**Authentication:** ✅ Required

**Request Body:**
```json
{
  "term": "nature"
}
```

**Success Response (200 OK):**
```json
{
  "term": "nature",
  "count": 30,
  "images": [
    {
      "id": "abc123xyz",
      "url": "https://images.unsplash.com/photo-123?ixlib=rb-4.0.3",
      "thumbnail": "https://images.unsplash.com/photo-123?w=400",
      "description": "Beautiful mountain landscape at sunset",
      "photographer": "John Smith",
      "photographerUrl": "https://unsplash.com/@johnsmith"
    },
    {
      "id": "def456uvw",
      "url": "https://images.unsplash.com/photo-456?ixlib=rb-4.0.3",
      "thumbnail": "https://images.unsplash.com/photo-456?w=400",
      "description": "Forest path with sunlight",
      "photographer": "Jane Doe",
      "photographerUrl": "https://unsplash.com/@janedoe"
    }
    // ... up to 30 images
  ]
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Search term is required"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized",
  "message": "You must be logged in to access this resource"
}
```

**Error Response (500):**
```json
{
  "error": "Failed to search images",
  "message": "Invalid Unsplash API key"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=s%3A..." \
  -d '{"term":"nature"}' \
  --cookie cookies.txt
```

**Postman:**
- Method: `POST`
- URL: `http://localhost:5000/api/search`
- Headers: 
  - `Content-Type: application/json`
- Body (raw JSON):
  ```json
  {
    "term": "nature"
  }
  ```

---

#### 3. Get User Search History
```http
GET /api/history
```

**Description:** Returns the authenticated user's personal search history (last 20 searches)

**Authentication:** ✅ Required

**Success Response (200 OK):**
```json
[
  {
    "term": "mountains",
    "timestamp": "2025-11-05T14:30:00.000Z"
  },
  {
    "term": "ocean",
    "timestamp": "2025-11-05T13:15:00.000Z"
  },
  {
    "term": "city",
    "timestamp": "2025-11-04T18:45:00.000Z"
  },
  {
    "term": "technology",
    "timestamp": "2025-11-04T16:20:00.000Z"
  }
  // ... up to 20 searches
]
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized",
  "message": "You must be logged in to access this resource"
}
```

**Error Response (500):**
```json
{
  "error": "Failed to fetch search history",
  "message": "Error details..."
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/history \
  -H "Cookie: connect.sid=s%3A..." \
  --cookie cookies.txt
```

**Postman:**
- Method: `GET`
- URL: `http://localhost:5000/api/history`
- Headers: None
- Body: None

---

### Complete cURL Testing Workflow

#### Step 1: Login via Browser
Since OAuth requires browser interaction, first login via browser:
1. Open browser to `http://localhost:3000`
2. Click OAuth provider button
3. Complete OAuth flow

#### Step 2: Extract Session Cookie
After login, extract the `connect.sid` cookie from browser DevTools:
- Chrome: DevTools → Application → Cookies → `http://localhost:5000`
- Copy the `connect.sid` value

#### Step 3: Test API Endpoints with cURL

**Get Current User:**
```bash
curl -X GET http://localhost:5000/auth/user \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE_HERE" \
  --cookie-jar cookies.txt \
  --cookie cookies.txt
```

**Get Top Searches:**
```bash
curl -X GET http://localhost:5000/api/top-searches \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE_HERE" \
  --cookie cookies.txt
```

**Search for Images:**
```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE_HERE" \
  -d '{"term":"nature"}' \
  --cookie cookies.txt
```

**Get Search History:**
```bash
curl -X GET http://localhost:5000/api/history \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE_HERE" \
  --cookie cookies.txt
```

**Logout:**
```bash
curl -X GET http://localhost:5000/auth/logout \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE_HERE" \
  --cookie cookies.txt
```

---

### Postman Collection Setup

#### Import into Postman:

1. **Create New Collection:** "Image Search API"

2. **Set Collection Variables:**
   - `base_url`: `http://localhost:5000`
   - `session_cookie`: (will be set after login)

3. **Add Requests:**

   **Folder: Authentication**
   - GET `{{base_url}}/auth/user` - Get Current User
   - GET `{{base_url}}/auth/logout` - Logout

   **Folder: API Endpoints**
   - GET `{{base_url}}/api/top-searches` - Top Searches
   - POST `{{base_url}}/api/search` - Search Images
   - GET `{{base_url}}/api/history` - Search History

4. **Configure Cookie Handling:**
   - Postman automatically handles cookies after OAuth login
   - Or manually set Cookie header: `connect.sid={{session_cookie}}`

5. **OAuth Login Flow:**
   - Login via browser first
   - Extract session cookie from browser
   - Use in Postman requests

### Postman Collection Setup

#### Quick Import Method:

**Option 1: Import from File**
1. Download/locate `postman_collection.json` in the project root
2. Open Postman → Import → Upload Files
3. Select `postman_collection.json`
4. Collection "Image Search & Multi-Select API" will be imported

**Option 2: Copy-Paste JSON**
1. Open `postman_collection.json` and copy contents
2. In Postman: Import → Raw Text → Paste JSON
3. Click Import

The collection includes:
- ✅ All 8 API endpoints
- ✅ Pre-configured requests
- ✅ Sample responses
- ✅ Automated test scripts
- ✅ Environment variables

#### Using the Collection:

1. **Login via Browser First:**
   - Open `http://localhost:3000`
   - Complete OAuth login
   - Session cookie is automatically set

2. **Test Endpoints in Postman:**
   - Postman will use the session cookie automatically
   - Start with "Get Current User" to verify authentication
   - Then test other endpoints

3. **Environment Variables:**
   - `base_url`: `http://localhost:5000` (already set)
   - Modify for production deployment

---
```json
{
  "info": {
    "name": "Image Search & Multi-Select API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Get Current User",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/auth/user",
              "host": ["{{base_url}}"],
              "path": ["auth", "user"]
            }
          }
        },
        {
          "name": "Logout",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/auth/logout",
              "host": ["{{base_url}}"],
              "path": ["auth", "logout"]
            }
          }
        }
      ]
    },
    {
      "name": "API Endpoints",
      "item": [
        {
          "name": "Get Top Searches",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/top-searches",
              "host": ["{{base_url}}"],
              "path": ["api", "top-searches"]
            }
          }
        },
        {
          "name": "Search Images",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"term\": \"nature\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/search",
              "host": ["{{base_url}}"],
              "path": ["api", "search"]
            }
          }
        },
        {
          "name": "Get Search History",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/history",
              "host": ["{{base_url}}"],
              "path": ["api", "history"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:5000"
    }
  ]
}
```

**To Import:**
1. Copy the JSON above
2. In Postman: Import → Raw Text → Paste JSON
3. Collection will be created with all endpoints

---

### API Response Codes

| Status Code | Meaning | When it Occurs |
|-------------|---------|----------------|
| 200 | OK | Successful request |
| 302 | Redirect | OAuth flow redirects |
| 400 | Bad Request | Missing or invalid parameters |
| 401 | Unauthorized | Not logged in or invalid session |
| 500 | Internal Server Error | Server or external API error |

---

### API Rate Limits

**Unsplash API:**
- Demo Mode: 50 requests per hour
- Production Mode: 5,000 requests per hour

**Application:**
- No rate limiting currently implemented
- Consider adding rate limiting for production

---

### Testing Tips

1. **Use Browser First:** OAuth requires browser interaction
2. **Save Cookies:** Use `--cookie-jar` and `--cookie` in cURL
3. **Check Session:** Verify session with `/auth/user` first
4. **JSON Format:** Use proper JSON in POST requests
5. **Check Logs:** Monitor server terminal for errors

## 🎯 Usage

1. **Login**: Click on any OAuth provider button to authenticate
2. **Search**: Enter a search term in the search bar (e.g., "nature", "technology")
3. **View Results**: Images are displayed in a 4-column grid
4. **Select Images**: Click on images or checkboxes to select multiple images
5. **Track Selection**: View selected count in the results header
6. **Top Searches**: Click on trending searches in the top banner
7. **History**: Click on previous searches in the sidebar to search again

## 🎨 Features in Detail

### Multi-Select Grid
- 4-column responsive grid layout
- Checkbox overlay on each image
- Visual feedback for selected images
- Select/Deselect All button
- Real-time selection counter

### Top Searches Banner
- Shows top 5 most popular searches
- Displays search count for each term
- Clickable tags for quick searching
- Updates after each search

### Search History
- Personal search history (last 20 searches)
- Timestamps with relative time display
- Click to re-search previous terms
- Scrollable sidebar layout

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`
- Verify MongoDB service is started

### OAuth Callback Errors
- Verify callback URLs match in OAuth provider settings
- Check environment variables are correctly set
- Ensure `CLIENT_URL` matches your frontend URL

### Unsplash API Errors
- Verify your `UNSPLASH_ACCESS_KEY` is valid
- Check API rate limits (50 requests/hour for demo apps)
- Ensure your Unsplash app is in "Demo" or "Production" mode

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

## 📝 Development Notes

### Backend
- Sessions are stored in MongoDB using `connect-mongo`
- Passport.js handles OAuth authentication flow
- Search terms are normalized to lowercase
- Aggregation pipeline used for top searches

### Frontend
- React Router handles protected routes
- Axios configured with `withCredentials: true` for sessions
- Component-based architecture
- Responsive design with mobile-first approach

## 🚀 Deployment

### Important: No Hardcoded URLs! 

This project is configured to use environment variables for ALL URLs, ensuring smooth deployment without CORS issues.

#### ✅ What's Configured:
- **Client:** Uses `REACT_APP_API_URL` from `.env` (no hardcoded backend URLs)
- **Server:** Uses `CLIENT_URL` from `.env` (no hardcoded frontend URLs)
- **No proxy in package.json** - Full URL control via environment variables

### Backend Deployment (Heroku/Render/Railway)

#### 1. Set Environment Variables
Configure these in your hosting platform's dashboard:

```env
# Database
MONGO_URI=your-mongodb-atlas-connection-string

# Server
PORT=5000  # or use platform default
NODE_ENV=production

# Security
SESSION_SECRET=your-secure-random-string

# OAuth (Update callback URLs to production domain)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-backend.com/auth/google/callback

# API Keys
UNSPLASH_ACCESS_KEY=your-unsplash-key

# IMPORTANT: Your frontend URL
CLIENT_URL=https://your-frontend.com
```

#### 2. Update OAuth Callback URLs
Update your OAuth provider settings:
- **Google Console:** `https://your-backend.com/auth/google/callback`
- **Facebook App:** `https://your-backend.com/auth/facebook/callback`
- **GitHub App:** `https://your-backend.com/auth/github/callback`

#### 3. Deploy
```bash
git push heroku main
# or follow your hosting platform's deployment steps
```

---

### Frontend Deployment (Vercel/Netlify)

#### 1. Set Environment Variable
In your hosting platform's dashboard, set:

```env
REACT_APP_API_URL=https://your-backend.com
```

**Important:** No trailing slash!

#### 2. Build and Deploy
```bash
npm run build
# or automatic deployment via Git integration
```

---

### Production Checklist

Before deploying, verify:

✅ **Backend `.env`:**
- [ ] `MONGO_URI` points to production database
- [ ] `CLIENT_URL` is your production frontend URL
- [ ] `NODE_ENV=production`
- [ ] All OAuth callback URLs updated to production URLs
- [ ] `SESSION_SECRET` is a strong random string

✅ **Frontend `.env` or hosting environment:**
- [ ] `REACT_APP_API_URL` points to production backend URL
- [ ] No hardcoded URLs in code

✅ **OAuth Providers:**
- [ ] Callback URLs updated in Google Console
- [ ] Callback URLs updated in Facebook App
- [ ] Callback URLs updated in GitHub Settings

✅ **CORS Configuration:**
- [ ] Server's `CLIENT_URL` matches frontend domain exactly
- [ ] Test authentication flow after deployment

---

### Testing Production Build Locally

#### Test Frontend Build:
```bash
cd client
npm run build
npx serve -s build -l 3000
```

#### Test with Production-like Environment:
```bash
# Backend
cd server
NODE_ENV=production npm start

# Frontend - update .env first
cd client
REACT_APP_API_URL=http://localhost:5000 npm start
```

---

### Common Deployment Issues

#### ❌ CORS Errors in Production
**Cause:** `CLIENT_URL` doesn't match frontend domain  
**Fix:** Verify `CLIENT_URL` in backend `.env` exactly matches your frontend URL (no trailing slash)

#### ❌ OAuth Callback Fails
**Cause:** Callback URLs not updated in OAuth provider settings  
**Fix:** Update callback URLs in Google/Facebook/GitHub to production URLs

#### ❌ Session Not Persisting
**Cause:** Cookie settings need adjustment for production  
**Fix:** Server is configured to handle this automatically based on `NODE_ENV`

#### ❌ API Calls to Wrong URL
**Cause:** `REACT_APP_API_URL` not set or incorrect  
**Fix:** Verify environment variable in hosting platform dashboard

---

---

### Backend Deployment (Heroku Example)
1. Set all environment variables in Heroku Config Vars
2. Update OAuth callback URLs to production URLs
3. Set `NODE_ENV=production`
4. Deploy: `git push heroku main`

### Frontend Deployment (Vercel/Netlify)
1. Build: `npm run build`
2. Set `REACT_APP_API_URL` to your backend URL
3. Deploy the `build` folder

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Developed as a MERN Stack demonstration project showcasing:
- Full-stack development
- OAuth authentication
- RESTful API design
- Modern React patterns
- Responsive UI/UX

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com/) for the amazing free image API
- [Passport.js](http://www.passportjs.org/) for authentication
- [MongoDB](https://www.mongodb.com/) for database
- [React](https://reactjs.org/) for the UI library

---

**Happy Coding! 🎉**
