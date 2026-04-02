# 🌾 CropGuard - Crop Disease Detection & Prevention System

A modern, full-stack web application that helps farmers detect crop diseases using AI and get prevention recommendations. Built with React, Node.js, MongoDB, and Tailwind CSS.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🎯 Features

### Frontend Features
- ✨ **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- 🔐 **User Authentication** - Sign up, login, and secure authentication
- 📸 **Disease Detection** - Drag-and-drop image upload with AI analysis
- 📋 **Prevention Guide** - Comprehensive disease prevention and treatment information
- 📊 **Dashboard** - Analytics, charts, and crop health monitoring
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🎨 **Smooth Animations** - Framer Motion animations for enhanced UX
- 📈 **Charts & Analytics** - Powered by Recharts for data visualization

### Backend Features
- 🔐 **JWT Authentication** - Secure token-based authentication
- 🗄️ **MongoDB Integration** - NoSQL database for scalability
- 🔒 **Password Hashing** - bcryptjs for secure password storage
- 🛡️ **CORS Enabled** - Cross-origin resource sharing configured
- 📝 **RESTful API** - Clean and organized API structure
- ⚡ **Express.js** - Fast and lightweight web framework

## 🏗️ Project Structure

```
CropDetection/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── layouts/          # Layout components
│   │   ├── data/             # Mock data
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── index.html
│
└── backend/
    ├── config/               # Configuration files
    ├── controllers/          # Route controllers
    ├── middleware/           # Express middleware
    ├── models/              # Mongoose models
    ├── routes/              # API routes
    ├── utils/               # Utility functions
    ├── app.js               # Main application file
    ├── package.json
    └── .env.example
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas cloud)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
cd d:\SY\ LAB\Sem2\ML\CropDetection
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/crop-detection
# JWT_SECRET=your-secret-key-here
# PORT=5000

# Start the backend server
npm run dev
# Server will run on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Start the development server
npm run dev
# Application will open at http://localhost:3000
```

## 📱 Pages & Features

### Landing Page
- Hero section with call-to-action buttons
- Feature cards highlighting key benefits
- How it works section with step-by-step process
- Supported crops showcase
- Farmer testimonials
- FAQ section
- Footer with links

### Authentication Pages
- **Login Page**
  - Email & password validation
  - Show/hide password toggle
  - Remember me checkbox
  - Forgot password link
  - Redirect to signup for new users

- **Signup Page**
  - Full name input
  - Email with validation
  - Password with strength indicator
  - Confirm password field
  - Form validation with error messages

### Dashboard (Protected)
- Statistics cards showing:
  - Total scans performed
  - Healthy crops identified
  - Diseased crops detected
  - High-risk cases
- Line chart showing scan trends
- Pie chart showing crop health status
- Recent scans table with status badges
- Alert panel for critical issues
- Weather information card

### Disease Detection (Protected)
- Crop selection dropdown
  - Tomato
  - Grapes
  - Maize
  - Onion
- Drag-and-drop image upload
- Image preview with change option
- Mock AI analysis with loading state
- Results card showing:
  - Disease name
  - Confidence score
  - Severity level
  - Expert recommendations

### Prevention Guide (Protected)
- Search diseases by name or symptoms
- Filter by crop type
- Expandable disease cards showing:
  - Symptoms
  - Causes
  - Prevention tips
  - Treatment recommendations
  - Severity badges

### Contact Page
- Contact form with validation
- Email, phone, and office location cards
- Quick help section with FAQs
- Enterprise solution information

## 🔐 Authentication Flow

1. User signs up with name, email, and password
2. Password is hashed using bcryptjs
3. User account is created in MongoDB
4. JWT token is generated and sent to client
5. Token is stored in localStorage
6. Protected routes check for valid token
7. Expired tokens redirect to login

## 📊 Mock Data

The application uses mock data for:
- Disease information and prevention tips
- Detection results
- Dashboard statistics
- Recent scans
- Testimonials
- FAQ entries

Mock data is stored in `/frontend/src/data/mockData.js`

## 🔒 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Health Check
- `GET /api/health` - Server health status

## 🎨 Design System

### Colors
- **Primary Green**: #22c55e - Main action color
- **Dark Gray**: #111827 - Dark mode background
- **Light Gray**: #f3f4f6 - Light mode background
- **Success**: #10b981 - Success states
- **Alert**: #ef4444 - Error/alert states
- **Warning**: #f59e0b - Warning states

### Components
- Buttons (primary, secondary, outline, danger)
- Input fields with validation
- Cards and containers
- Loading spinners
- Toast notifications
- Empty states

## 🚦 Getting Started Commands

### Development
```bash
# Backend
cd backend
npm run dev

# Frontend (in another terminal)
cd frontend
npm run dev
```

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/crop-detection
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## 🧪 Testing the Application

### Test Account Credentials
You can use these credentials after signing up:
- Email: test@example.com
- Password: password123

### Test Image Upload
Use any crop leaf or plant image for the disease detection feature. The system uses mock data to demonstrate results.

## 🔄 User Flow

1. **Landing Page** → View features and information
2. **Sign Up** → Create new account
3. **Login** → Authenticate with credentials
4. **Dashboard** → View crop health statistics
5. **Detection** → Upload image and analyze
6. **Prevention** → Read disease info and prevention tips
7. **Contact** → Reach out for support

## 🐛 Troubleshooting

### Backend Connection Error
```
Error: Cannot connect to MongoDB
Solution: Ensure MongoDB is running. Check MONGODB_URI in .env
```

### CORS Error
```
Error: Access to XMLHttpRequest blocked by CORS
Solution: Ensure CORS_ORIGIN in backend .env matches frontend URL
```

### Port Already in Use
```
Error: Port 5000/3000 already in use
Solution: Change PORT in .env or kill the process using the port
```

### Token Expired
```
Error: Invalid token
Solution: Clear localStorage and login again
```

## 📚 File Descriptions

### Key Frontend Files
- `App.jsx` - Main application component with routing
- `Navbar.jsx` - Navigation bar with auth menu
- `ProtectedRoute.jsx` - Route protection for authenticated pages
- `useAuth.js` - Custom hook for authentication logic
- `helpers.js` - Utility functions for auth and API calls
- `mockData.js` - All mock data for development

### Key Backend Files
- `app.js` - Express application setup
- `database.js` - MongoDB connection
- `User.js` - User schema and model
- `authController.js` - Authentication logic
- `authRoutes.js` - Auth API routes
- `authMiddleware.js` - Token verification

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues or questions:
- Email: support@cropguard.com
- Website: https://cropguard.com
- GitHub Issues: Submit an issue in this repository

## 🙏 Acknowledgments

- Tailwind CSS for the amazing utility-first CSS framework
- React community for building such a great library
- All farmers and agricultural experts for their valuable feedback

---

**Made with ❤️ for farmers worldwide** 🌾

Happy farming! 🚜
