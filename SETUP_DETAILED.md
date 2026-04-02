# CropGuard - Detailed Setup Instructions

## 📋 Prerequisites Checklist

Before starting, ensure you have:

```
✓ Node.js v16.0.0 or higher
✓ npm v8.0.0 or higher (comes with Node.js)
✓ MongoDB v5.0 or higher (local or Atlas)
✓ Git installed
✓ 4GB+ RAM available
✓ ~500MB disk space
```

### Verify Installations

```bash
node --version    # Should show v16+
npm --version     # Should show v8+
git --version     # Should show version
```

## 🗄️ MongoDB Setup

### Option 1: MongoDB Local (Recommended for Development)

#### Windows
```bash
# Download from https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
# Run installer
# MongoDB runs as service automatically

# Test connection
mongosh
# Type: show databases
```

#### macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Test connection
mongosh
```

#### Linux (Ubuntu)
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Option 2: MongoDB Atlas (Cloud - No Installation)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (M0 free tier)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<password>` with your password
7. Use this in backend `.env` as `MONGODB_URI`

## 🚀 Step-by-Step Installation

### Step 1: Navigate to Project Directory

```bash
cd d:\SY\ LAB\Sem2\ML\CropDetection
```

### Step 2: Backend Installation & Setup

#### 2.1 Install Dependencies

```bash
cd backend
npm install
```

This installs:
- express (web framework)
- mongoose (database ODM)
- bcryptjs (password hashing)
- jsonwebtoken (authentication)
- cors (cross-origin)
- dotenv (environment variables)

#### 2.2 Create Environment File

**Windows (PowerShell):**
```bash
Copy-Item .env.example .env
code .env    # Opens in VS Code
```

**macOS/Linux:**
```bash
cp .env.example .env
nano .env    # Or use any editor
```

#### 2.3 Configure Environment Variables

Edit `.env` file:

```bash
# Server
PORT=5000
NODE_ENV=development

# Database - Choose one:
# Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/crop-detection

# OR MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crop-detection?retryWrites=true&w=majority

# Security & Auth
JWT_SECRET=your-super-secret-key-change-in-production

# CORS
CORS_ORIGIN=http://localhost:3000
```

#### 2.4 Start Backend Server

```bash
npm run dev
```

Expected output:
```
Server running on port 5000
Environment: development
MongoDB connected successfully
```

✅ **Backend Ready!** Running at `http://localhost:5000`

### Step 3: Frontend Installation & Setup

#### 3.1 Open New Terminal & Navigate

```bash
# Keep backend running in first terminal
# Open NEW terminal window/tab
cd d:\SY\ LAB\Sem2\ML\CropDetection\frontend
```

#### 3.2 Install Dependencies

```bash
npm install
```

This installs:
- react (UI library)
- react-router-dom (routing)
- tailwindcss (styling)
- recharts (charts)
- lucide-react (icons)
- framer-motion (animations)

#### 3.3 Create Environment File

**Windows (PowerShell):**
```bash
Copy-Item .env.example .env
```

**macOS/Linux:**
```bash
cp .env.example .env
```

#### 3.4 Configure Environment Variables

Edit `.env` file:

```bash
REACT_APP_API_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000
```

#### 3.5 Start Frontend Development Server

```bash
npm run dev
```

Expected output:
```
VITE v5.0.0  ready in 234 ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

✅ **Frontend Ready!** Available at `http://localhost:3000`

## 🧪 Testing the Application

### 1. Access the Application

Open browser and go to:
```
http://localhost:3000
```

### 2. Create Test Account

1. Click "Sign Up" button
2. Fill in form:
   - Full Name: **John Farmer**
   - Email: **john@farmer.com**
   - Password: **Password123**
   - Confirm: **Password123**
3. Click "Create Account"
4. Should redirect to dashboard

### 3. Test Features

#### Test Login
1. Click "Logout"
2. Go to login page
3. Enter same email and password
4. Should redirect to dashboard

#### Test Disease Detection
1. Go to "Detection" page (navbar)
2. Select a crop (Tomato/Grapes/Maize/Onion)
3. Upload any image file
4. Click "Analyze Image"
5. Should show mock disease result

#### Test Prevention Guide
1. Go to "Prevention" page
2. Search for a disease (e.g., "Early Blight")
3. Or filter by crop
4. Click disease card to expand
5. View symptoms, causes, and prevention tips

#### Test Dashboard
1. Go to "Dashboard" page
2. View statistics cards
3. Interact with charts
4. Review recent scans table

#### Test Dark Mode
1. Click sun/moon icon in navbar
2. Theme should toggle

### 4. Test API Endpoints

Using Postman or curl:

```bash
# Register User
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

# Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

# Get Current User (Use token from login response)
GET http://localhost:5000/api/auth/me
Authorization: Bearer <token from login>

# Health Check
GET http://localhost:5000/api/health
```

## 📊 Project Architecture

### Frontend Architecture
```
User Interface (React Components)
         ↓
React Router (Routing)
         ↓
Custom Hooks (useAuth)
         ↓
API Calls (helpers.js)
         ↓
HTTP Client → Backend API
```

### Backend Architecture
```
HTTP Request
         ↓
Express Middleware (CORS, JSON Parser)
         ↓
Routes (/api/auth/...)
         ↓
Controllers (authController.js)
         ↓
Models (User.js)
         ↓
MongoDB Database
```

## 🔐 Authentication Flow

```
1. User fills signup form
   ↓
2. Frontend sends POST /api/auth/register
   ↓
3. Backend creates user with hashed password
   ↓
4. JWT token generated
   ↓
5. Token sent to frontend
   ↓
6. Token stored in localStorage
   ↓
7. Protected routes check localStorage
   ↓
8. Access granted to dashboard
```

## 📁 Important File Locations

```
Frontend:
- Pages:  frontend/src/pages/
- Components: frontend/src/components/
- Mock Data: frontend/src/data/mockData.js
- Auth Hook: frontend/src/hooks/useAuth.js
- Helpers: frontend/src/utils/helpers.js

Backend:
- Models: backend/models/User.js
- Controllers: backend/controllers/authController.js
- Routes: backend/routes/authRoutes.js
- Middleware: backend/middleware/authMiddleware.js
- Config: backend/config/database.js
```

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
```bash
# Check if MongoDB is running
# Windows: Check Services
# macOS: brew services list
# Linux: systemctl status mongod

# Or test connection
mongosh

# If local not working, use Atlas
# Update MONGODB_URI in .env with Atlas connection string
```

### Issue: "ECONNREFUSED" on port 5000

**Solution:**
```bash
# Check if port is in use
# Windows:
netstat -ano | findstr :5000

# macOS/Linux:
lsof -i :5000

# Kill process if needed:
# Windows:
taskkill /PID <PID> /F

# macOS/Linux:
kill -9 <PID>
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS errors in browser console

**Solution:**
1. Check `CORS_ORIGIN=http://localhost:3000` in backend `.env`
2. Restart backend server
3. Clear browser cache (Ctrl+Shift+Delete)

### Issue: Can't login after signup

**Solution:**
1. Check browser console (F12) for errors
2. Check backend terminal for error messages
3. Verify MongoDB is running and has the database
4. Check JWT_SECRET is set in `.env`

### Issue: Images not uploading

**Solution:**
- Image upload is mocked in frontend
- Any file upload triggers mock detection result
- Real ML backend would be needed for actual detection

## 🎯 Next Steps

1. **Customize Colors**: Edit `frontend/tailwind.config.js`
2. **Add More Diseases**: Edit `frontend/src/data/mockData.js`
3. **Add Real ML Backend**: Integrate actual disease detection
4. **Deploy**: Use Vercel (frontend) + Heroku/Railway (backend)
5. **Database**: Migrate from local to MongoDB Atlas for production

## 📚 Learning Resources

### Frontend
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

### Backend
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Mongoose ODM](https://mongoosejs.com)

### Full Stack
- [JWT Authentication](https://jwt.io)
- [REST API Best Practices](https://restfulapi.net)

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
cd frontend
npm run build
# Upload dist/ folder to Vercel
```

### Backend Deployment (Railroad/Render)
```bash
# Set environment variables in hosting dashboard
# Push code to Git
# Deploy from dashboard
```

---

**Congratulations! You have a fully functional Crop Disease Detection System! 🎉**

For questions or issues, refer to the main README.md file.
