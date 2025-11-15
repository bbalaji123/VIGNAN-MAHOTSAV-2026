# Vignan Mahotsav - Full Stack Application

A full-stack web application for Vignan Mahotsav 2026 event management with React frontend and Node.js/Express backend.

## 🎯 Features

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + MongoDB
- **Database**: MongoDB Atlas (test database, registrations collection)
- User registration with form validation
- Responsive design with modern UI/UX

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB Atlas account (already configured)

## 🚀 Quick Start

### 1. Install Frontend Dependencies

```powershell
npm install
```

### 2. Install Backend Dependencies

```powershell
cd backend
npm install
cd ..
```

### 3. Run the Application

#### Option A: Run Backend and Frontend Separately

**Terminal 1 - Start Backend Server:**
```powershell
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```powershell
npm run dev
```
The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

#### Option B: Quick Start Scripts

**Start Backend:**
```powershell
cd backend; npm run dev
```

**Start Frontend (in another terminal):**
```powershell
npm run dev
```

## 📁 Project Structure

```
my-react-app/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── Registration.js    # User registration schema
│   ├── routes/
│   │   └── registration.js    # API routes
│   ├── .env                   # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── server.js              # Express server entry point
│   └── README.md
├── src/
│   ├── services/
│   │   └── api.ts             # API service for backend calls
│   ├── Dashboard.tsx          # Main component with signup
│   └── ...
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

#### POST /register
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "college": "Vignan University"
}
```

#### GET /registrations
Get all registrations (passwords excluded)

#### GET /registration/:id
Get specific registration by ID

## 🗄️ Database Configuration

- **Database**: `test`
- **Collection**: `registrations`
- **Connection**: MongoDB Atlas (pre-configured)

The signup data is automatically saved to the `registrations` collection in the `test` database.

## 🎨 Frontend Features

- Modern animated UI with floating elements
- Time-based theme (day/evening/night)
- Responsive signup modal with validation
- Real-time form submission feedback
- Integration with backend API

## 🔒 Security Notes

⚠️ **For Production, Please Add:**
- Password hashing (bcrypt)
- JWT authentication
- Input validation and sanitization
- Rate limiting
- HTTPS
- Environment variable security

## 🛠️ Development

### Frontend Development
```powershell
npm run dev
```

### Backend Development
```powershell
cd backend
npm run dev
```

### Build Frontend for Production
```powershell
npm run build
```

## 📝 Environment Variables

Backend `.env` file is already configured with:
- `MONGODB_URI`: MongoDB Atlas connection string
- `PORT`: Server port (5000)

## 🐛 Troubleshooting

**Backend won't start:**
- Ensure MongoDB connection string is correct
- Check if port 5000 is available
- Run `npm install` in backend directory

**Frontend API calls fail:**
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API endpoint URLs in `src/services/api.ts`

**Database connection issues:**
- Verify MongoDB Atlas cluster is active
- Check network access settings in MongoDB Atlas
- Ensure IP whitelist includes your IP

## 📧 Support

For issues or questions, contact the development team.

---

Built with ❤️ for Vignan Mahotsav 2026
