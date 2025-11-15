# My Events Feature Documentation

## Overview
This feature allows authenticated users to select and save events to their personal "My Events" collection. All data is stored in MongoDB and requires user authentication.

## Features Implemented

### 1. **Authentication Required**
- Users must be logged in to access the event selection feature
- Login check is performed when clicking "My Events" button
- User session is maintained in localStorage and validated against database

### 2. **Database Integration**
- **New Model**: `UserEvent` - Stores user's saved events
- **Collection**: `userEvents` in MongoDB
- Events are saved with userId reference for secure retrieval
- Prevents duplicate event entries per user

### 3. **Backend API Endpoints**

#### POST `/api/save-events`
- **Purpose**: Save multiple events to user's My Events
- **Authentication**: Required (userId in body)
- **Body**: `{ userId: string, eventIds: string[] }`
- **Response**: Success message with saved events count
- **Notes**: Replaces existing saved events with new selection

#### GET `/api/my-events/:userId`
- **Purpose**: Fetch all saved events for a user
- **Authentication**: Required (userId in params)
- **Response**: Array of event objects with full details
- **Notes**: Populated with complete event information

#### POST `/api/add-event`
- **Purpose**: Add a single event to My Events
- **Authentication**: Required
- **Body**: `{ userId: string, eventId: string }`
- **Response**: Success message
- **Notes**: Prevents duplicate saves

#### DELETE `/api/remove-event`
- **Purpose**: Remove an event from My Events
- **Authentication**: Required
- **Body**: `{ userId: string, eventId: string }`
- **Response**: Success message

#### POST `/api/check-saved`
- **Purpose**: Check which events are already saved by user
- **Authentication**: Required
- **Body**: `{ userId: string, eventIds: string[] }`
- **Response**: Array of saved event IDs

### 4. **Frontend Features**

#### Navigation Changes
- **Header Nav**: "Events" → "My Events"
- **Menu Cards**: "EVENTS" → "MY EVENTS"
- Both open the event selection checklist

#### Event Selection Modal
- Displays all available sports and cultural events
- Checkbox interface for multi-select
- Live counter showing number of selected events
- "Save to My Events" button (disabled when no selection)
- Requires login - shows login modal if not authenticated

#### My Events Modal
- Accessible from profile dropdown
- Displays all saved events in card format
- Shows event type badges (Sports/Cultural)
- Event details: date, venue, prize pool
- Direct "Register for Event" button
- Empty state with "Browse Events" link

### 5. **User Flow**

```
1. User clicks "My Events" (navbar or menu card)
   ↓
2. System checks if user is logged in
   ↓ (not logged in)
   → Shows login modal
   ↓ (logged in)
3. Opens Event Selection Modal
   ↓
4. User selects events using checkboxes
   ↓
5. Clicks "Save to My Events"
   ↓
6. Events saved to database (POST /api/save-events)
   ↓
7. Success message displayed
   ↓
8. User can view saved events from profile dropdown
   ↓
9. Access "My Events" to see saved events (GET /api/my-events/:userId)
   ↓
10. Can register for events directly from My Events
```

### 6. **Data Persistence**

#### localStorage (Frontend)
- `isLoggedIn`: Authentication status
- `userName`: User's display name
- `userEmail`: User's email
- `userId`: Unique user identifier
- `generatedUserId`: Newly registered user ID

#### MongoDB (Backend)
- **Collection**: `userEvents`
- **Schema**:
  ```javascript
  {
    userId: String (indexed),
    eventId: ObjectId (ref: Event),
    eventName: String,
    eventType: String,
    savedAt: Date
  }
  ```
- **Indexes**: Compound unique index on (userId, eventId)

### 7. **Security Features**

1. **Authentication Middleware**: `verifyUser`
   - Validates userId exists in request
   - Checks user exists in database
   - Attaches user object to request

2. **User Validation**
   - All protected routes verify user exists
   - Database lookup prevents fake userIds
   - Unauthorized access returns 401

3. **Data Isolation**
   - Users can only access their own saved events
   - userId is required for all operations
   - No cross-user data leakage

### 8. **Error Handling**

- **No userId**: "Please login to continue"
- **Invalid userId**: "User not found"
- **No events selected**: "Please select at least one event"
- **Duplicate save**: "Event already saved"
- **Database errors**: Proper error messages with status codes

## File Structure

```
backend/
  ├── models/
  │   ├── UserEvent.js          # New model for saved events
  │   ├── Event.js              # Existing event model
  │   └── Registration.js       # User model
  ├── routes/
  │   ├── userEvents.js         # New routes for My Events
  │   ├── events.js             # Event listing routes
  │   └── registration.js       # User auth routes
  └── server.js                 # Updated with userEvents routes

frontend/
  ├── src/
  │   ├── Dashboard.tsx         # Updated with My Events logic
  │   ├── Dashboard.css         # Styles for modals
  │   └── services/
  │       └── api.ts            # New API functions
  └── MY_EVENTS_FEATURE.md      # This documentation
```

## Testing Guide

### 1. User Registration & Login
```bash
# Register a new user
POST http://localhost:5000/api/register
{
  "name": "Test User",
  "email": "test@example.com",
  "dateOfBirth": "2000-01-15"
}

# Login with generated userId or email
```

### 2. Save Events
```bash
# Save events (requires authentication)
POST http://localhost:5000/api/save-events
{
  "userId": "MH26000001",
  "eventIds": ["eventId1", "eventId2", "eventId3"]
}
```

### 3. Fetch Saved Events
```bash
# Get user's saved events
GET http://localhost:5000/api/my-events/MH26000001
```

### 4. Frontend Testing
1. Open application
2. Click "My Events" → Should prompt login
3. Login with valid credentials
4. Click "My Events" → Opens event selection modal
5. Select multiple events
6. Click "Save to My Events"
7. Open profile dropdown → "My Events"
8. View saved events
9. Click "Register for Event"

## Database Queries

### Check user's saved events
```javascript
db.userEvents.find({ userId: "MH26000001" })
```

### Count saved events per user
```javascript
db.userEvents.aggregate([
  { $group: { _id: "$userId", count: { $sum: 1 } } }
])
```

### Popular events
```javascript
db.userEvents.aggregate([
  { $group: { _id: "$eventName", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

## Future Enhancements

1. **Event Recommendations**: Suggest events based on user's saved events
2. **Notifications**: Alert users when saved events are approaching
3. **Share Feature**: Share My Events with friends
4. **Event Categories**: Filter My Events by type
5. **Export Feature**: Download My Events as PDF/Calendar
6. **Waitlist**: Automatically add to waitlist for full events
7. **Analytics**: Track which events are most saved

## Troubleshooting

### "Please login to continue"
- User is not authenticated
- Solution: Login with valid credentials

### "User not found"
- UserId doesn't exist in database
- Solution: Register or use correct userId

### Events not appearing in My Events
- Check if userId is correct in localStorage
- Verify events were saved to database
- Check browser console for errors

### Save button disabled
- No events selected
- Solution: Select at least one event

## API Response Examples

### Successful Save
```json
{
  "success": true,
  "message": "Successfully saved 3 event(s)",
  "data": {
    "count": 3,
    "events": [
      {
        "userId": "MH26000001",
        "eventId": "...",
        "eventName": "Cricket Tournament",
        "eventType": "sports",
        "savedAt": "2025-11-13T..."
      }
    ]
  }
}
```

### Fetch My Events
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "...",
      "eventName": "Cricket Tournament",
      "eventType": "sports",
      "description": "...",
      "date": "2026-02-06",
      "venue": "Sports Complex",
      "prizePool": "₹50,000"
    }
  ]
}
```

## Notes

- Authentication is enforced on both frontend and backend
- All event data is fetched fresh from database (no stale data)
- LocalStorage is used only for session management
- Event selections are persisted in MongoDB
- Duplicate prevention ensures data integrity
