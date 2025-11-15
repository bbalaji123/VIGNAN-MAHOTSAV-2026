# 🚀 Quick Setup Instructions

## What's New? 

✨ **Auto-Generated User IDs**: When users sign up, they receive a unique Mahotsav ID:
- First user: `MH26000001`
- Second user: `MH26000002`
- And so on...

✨ **Beautiful Popup Display**: After successful registration, users see their ID in an animated popup!

## Installation & Running

### Step 1: Install Backend Dependencies
```powershell
cd backend
npm install
```

### Step 2: Start Backend Server (Keep this terminal open)
```powershell
npm run dev
```
✅ Backend running on `http://localhost:5000`

### Step 3: Open New Terminal - Start Frontend
```powershell
npm run dev
```
✅ Frontend running on `http://localhost:5173`

## How It Works

1. User clicks **"Login"** button
2. User clicks **"Sign up"** at the bottom
3. User fills the registration form:
   - ✅ Name (required)
   - ✅ Email (required)
   - ✅ Password (required)
   - Optional: Phone, College, DOB, Gender, Register ID
4. User clicks **"Create Account & Get Mahotsav ID"**
5. 🎉 **Popup appears with generated ID** (e.g., MH26000001)
6. User clicks **"Continue to Login"**
7. User can now login with their email and password

## Database Info

- **Database**: `test`
- **Collection**: `registrations`
- **Fields Saved**:
  - `userId` (auto-generated: MH26000001, MH26000002, etc.)
  - `name`
  - `email`
  - `password`
  - `phone`
  - `college`
  - `dateOfBirth`
  - `gender`
  - `registerId`
  - `createdAt`

## Testing

1. Register first user → Get ID: `MH26000001`
2. Register second user → Get ID: `MH26000002`
3. Check MongoDB to see data saved in `test.registrations` collection

## Features

✅ Unique ID generation (MH26 + 6-digit number)
✅ Beautiful animated popup to display the ID
✅ Form validation
✅ Email uniqueness check
✅ Success/Error messages
✅ Auto-redirect to login after successful signup
✅ MongoDB integration

---

**Need help?** Make sure both backend and frontend are running!
