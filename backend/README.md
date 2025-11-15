# Backend Server for My React App

This is the Node.js/Express backend server for the Vignan Mahotsav application.

## Features

- User registration and authentication
- MongoDB database integration
- RESTful API endpoints
- CORS enabled for frontend communication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB installation)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured with the MongoDB connection string.

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /api/register
Register a new user
- **Body**: `{ name, email, password, phone?, college? }`
- **Response**: `{ success, message, data }`

### GET /api/registrations
Get all registrations (excluding passwords)
- **Response**: `{ success, count, data }`

### GET /api/registration/:id
Get a specific registration by ID
- **Response**: `{ success, data }`

## Database Structure

**Database**: `test`
**Collection**: `registrations`

**Schema**:
- name (String, required)
- email (String, required, lowercase)
- password (String, required)
- phone (String, optional)
- college (String, optional)
- createdAt (Date, auto-generated)

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)

## Notes

⚠️ **Security Notice**: In a production environment, you should:
- Hash passwords before storing (use bcrypt)
- Implement JWT authentication
- Add input validation and sanitization
- Use HTTPS
- Store sensitive data in environment variables
- Never commit `.env` file to version control
