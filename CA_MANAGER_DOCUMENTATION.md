# CA Manager System - Complete Documentation

## Overview
A complete management system for overseeing Campus Ambassadors with authentication, CRUD operations, and action logging`

## Features

### 1. Authentication
- Secure login with JWT tokens
- Session management with localStorage
- Auto-redirect if not authenticated

### 2. Dashboard Tabs
- **Campus Ambassadors**: View and manage all CAs
- **Activity Logs**: Track all manager actions

### 3. Campus Ambassador Management
- View all registered CAs with:
  - MCA ID & Registration Number
  - Name, Email, College
  - Current Points & Referrals Count
  - Active/Dismissed Status

### 4. Points Management
- **Increase Points**: Add points with optional notes
- **Decrease Points**: Deduct points with optional notes
- All changes logged with timestamp and reason

### 5. Status Control
- **Dismiss**: Deactivate a Campus Ambassador
- **Activate**: Reactivate a dismissed CA
- Confirmation prompts prevent accidental changes

### 6. Activity Logging
- Tracks all manager actions:
  - Login events
  - Points increases/decreases
  - CA dismissals/activations
- Each log includes:
  - Action type
  - Target CA (name + MCA ID)
  - Details/notes
  - Timestamp

### 7. Responsive Design
- **Desktop**: Full table with inline actions
- **Mobile**: Card-based layout with expanded buttons
- Seamless switching between views

## Technical Implementation

### Frontend Components
1. **CAManagerLogin.tsx**
   - Email/password authentication
   - Error handling
   - JWT token storage

2. **CAManagerDashboard.tsx**
   - Two-tab interface
   - CA list with inline editing
   - Points modal for updates
   - Activity logs display
   - Logout functionality

### Backend Routes (`/api/ca-manager/`)
1. **POST /login**
   - Authenticates manager
   - Returns JWT token

2. **GET /ambassadors**
   - Fetches all CAs (sorted by points)
   - Requires authentication

3. **POST /update-points**
   - Increase/decrease points
   - Logs action with notes

4. **POST /toggle-status**
   - Activate/dismiss CAs
   - Logs status changes

5. **GET /activity-logs**
   - Returns last 100 actions
   - Sorted by timestamp (newest first)

### Database Models

#### CAManager Model
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  name: String (default: "Manager"),
  actionLogs: [
    {
      action: String,
      targetCA: {
        mcaId: String,
        name: String
      },
      details: String,
      timestamp: Date
    }
  ]
}
```

#### Actions Tracked
- `login`: Manager login event
- `points_increase`: Points added to CA
- `points_decrease`: Points deducted from CA
- `dismiss`: CA deactivated
- `activate`: CA reactivated

### Styling
- Uses existing `CADashboard.css` with new manager-specific classes
- Glassmorphism design matching CA Dashboard
- Color-coded action buttons and status badges
- Smooth transitions and hover effects

## API Endpoints

### Authentication
```
POST /api/ca-manager/login
Body: { email, password }
Response: { token, manager }
```

### Get All Ambassadors
```
GET /api/ca-manager/ambassadors
Headers: { Authorization: "Bearer <token>" }
Response: { ambassadors: [...] }
```

### Update Points
```
POST /api/ca-manager/update-points
Headers: { Authorization: "Bearer <token>" }
Body: { caId, points, action: "increase"|"decrease", notes }
Response: { message, updatedCA }
```

### Toggle Status
```
POST /api/ca-manager/toggle-status
Headers: { Authorization: "Bearer <token>" }
Body: { caId }
Response: { message, updatedCA }
```

### Get Activity Logs
```
GET /api/ca-manager/activity-logs
Headers: { Authorization: "Bearer <token>" }
Response: { logs: [...] }
```

## Security Features
- Password hashed with bcrypt (10 rounds)
- JWT authentication for all manager actions
- Token verification middleware
- Secure session management
- Confirmation prompts for destructive actions

## Usage Flow

1. **Login**
   - Navigate to `/CA-Manager`
   - Enter credentials
   - Redirected to dashboard on success

2. **View Ambassadors**
   - See complete list with all details
   - Desktop: Table view
   - Mobile: Card view

3. **Manage Points**
   - Click + or - button
   - Enter amount and optional notes
   - Confirm to apply changes

4. **Toggle Status**
   - Click Dismiss/Activate button
   - Confirm the action
   - Status updates immediately

5. **View Logs**
   - Switch to Activity Logs tab
   - See chronological history
   - Color-coded by action type

6. **Logout**
   - Click Logout button
   - Redirected to login page
   - Token cleared from storage

## Files Created/Modified

### Created
- `src/CAManagerLogin.tsx`
- `src/CAManagerDashboard.tsx`
- `backend/models/CAManager.js`
- `backend/routes/caManager.js`
- `backend/scripts/seedCAManager.mjs`

### Modified
- `src/App.tsx` (added routes)
- `src/CADashboard.css` (added manager styles)
- `backend/server.js` (registered routes)

## Testing Checklist
- [x] Seed script creates manager successfully
- [x] Backend routes integrated
- [x] Frontend components created
- [x] Routes added to React Router
- [x] Styles implemented
- [ ] Test login functionality
- [ ] Test points increase/decrease
- [ ] Test CA dismiss/activate
- [ ] Test activity logs display
- [ ] Test mobile responsiveness

## Next Steps
1. Start the development server
2. Navigate to `/CA-Manager`
3. Login with provided credentials
4. Test all CRUD operations
5. Verify activity logging works
6. Check mobile responsiveness
