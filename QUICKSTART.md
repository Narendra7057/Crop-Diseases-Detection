# CropGuard - Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js v16+ installed
- MongoDB running locally OR MongoDB Atlas account
- Code editor (VS Code recommended)

### Step 1: MongoDB Setup (Choose One)

#### Option A: Local MongoDB
```bash
# Windows: Start MongoDB service
# macOS/Linux: Run MongoDB daemon
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Use it in backend `.env`

### Step 2: Backend Setup

```bash
cd backend

# Install packages
npm install

# Create .env file with:
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/crop-detection
JWT_SECRET=dev-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000

# Start backend
npm run dev
```

Backend should run on `http://localhost:5000`

### Step 3: Frontend Setup (New Terminal)

```bash
cd frontend

# Install packages
npm install

# Start frontend
npm run dev
```

Frontend should open at `http://localhost:3000`

### Step 4: Test the App

1. Visit `http://localhost:3000`
2. Click "Sign Up"
3. Create account with:
   - Name: John Doe
   - Email: john@example.com
   - Password: Password123
4. Login with same credentials
5. Access dashboard, detection, and prevention pages

## 🎯 What You Can Try

### 1. Disease Detection
- Go to Detection page
- Select a crop (Tomato/Grapes/Maize/Onion)
- Upload any image
- Click "Analyze Image"
- See mock disease result

### 2. Prevention Guide
- Go to Prevention page
- Browse all diseases or filter by crop
- Search for specific symptoms
- Read prevention tips and treatments

### 3. Dashboard
- View statistics cards
- Check scan trends chart
- See crop health status
- Review recent scans table
- Check active alerts

### 4. Dark Mode
- Click moon/sun icon in navbar
- Toggle between light and dark themes

## 📁 Project Structure Overview

```
CropDetection/
├── frontend/          # React app on port 3000
│   ├── src/
│   │   ├── components/  # Buttons, Forms, Navigation
│   │   ├── pages/       # Landing, Login, Dashboard, etc.
│   │   ├── data/        # mockData.js with all content
│   │   └── utils/       # Auth helpers, API calls
│   └── package.json
│
└── backend/           # Node.js API on port 5000
    ├── config/        # Database connection
    ├── controllers/    # Auth logic
    ├── models/        # User schema
    ├── routes/        # API endpoints
    └── package.json
```

## 🔑 Key Features Demo

| Feature | Location | What to Try |
|---------|----------|-------------|
| Authentication | /login, /signup | Create account, login |
| Disease Detection | /detection | Upload image, see results |
| Prevention Guide | /prevention | Search diseases, read tips |
| Dashboard | /dashboard | View charts and statistics |
| Contact | /contact | Send message (mock) |

## 🆘 Quick Fixes

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### MongoDB Connection Failed
- Check MongoDB is running
- Verify connection string in `.env`
- Try `mongodb://localhost:27017/crop-detection`

## 📞 Need Help?

1. Check the full README.md for detailed info
2. Review error messages in browser console (F12)
3. Check backend terminal for API errors
4. Ensure all ports (3000, 5000) are available

## 🎓 Learning Resources

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, JWT
- **Database**: MongoDB with Mongoose ODM

Visit documentation:
- React: https://react.dev
- Express: https://expressjs.com
- MongoDB: https://mongodb.com/docs
- Tailwind: https://tailwindcss.com

## ✅ Success Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] Backend dependencies installed
- [ ] Backend .env configured
- [ ] Backend running on 5000
- [ ] Frontend dependencies installed
- [ ] Frontend running on 3000
- [ ] Can access http://localhost:3000
- [ ] Can sign up and login
- [ ] Can view dashboard

---

**You're all set! Happy developing! 🚀**
