# Database Cleanup and Fix Summary

## Problem Identified
- User data was being saved in **both** `registrations` and `participants` collections during signup/login
- This caused unnecessary duplication of data
- Participants collection should only contain users who have actually registered for events

## Changes Made

### 1. Backend Code Fixes (`backend/routes/registration.js`)

#### Fix 1: Removed automatic Participant creation during signup
**Before:**
```javascript
if (userType === 'participant') {
  await Participant.create({
    userId,
    name,
    email: normalizedEmail,
    // ... other fields
    registeredEvents: []  // Empty array
  });
}
```

**After:**
```javascript
// Participant will be created only when user registers for events
// No automatic participant creation during signup
```

#### Fix 2: Only create Participant when registering for events
**Before:**
```javascript
// Always created participant, even with empty events
let participant = await Participant.findOne({ userId });
if (!participant) {
  participant = await Participant.create({
    // ... fields
    registeredEvents: []  // Empty initially
  });
}
participant.registeredEvents = events;
await participant.save();
```

**After:**
```javascript
// Validate events first
if (!events || events.length === 0) {
  return res.status(400).json({
    success: false,
    message: 'No events provided for registration'
  });
}

// Only create participant when they have events to register
let participant = await Participant.findOne({ userId });
if (!participant) {
  participant = await Participant.create({
    // ... fields
    registeredEvents: events  // Directly with events
  });
} else {
  participant.registeredEvents = events;
  await participant.save();
}
```

### 2. Database Cleanup Script (`backend/scripts/cleanupParticipants.mjs`)

Created a script to clean up existing data:
- Connects to MongoDB
- Finds all participants with empty `registeredEvents` array
- Deletes them from the database
- Shows summary of deleted and remaining participants

### 3. Cleanup Results

**Deleted:** 126 participants with no registered events
**Kept:** 23 participants with actual event registrations

## Current Database Structure

### `registrations` Collection
- Stores ALL user accounts (visitors and participants)
- Contains login credentials
- Created during signup
- Always present for every user

### `participants` Collection  
- Stores ONLY users who have registered for events
- Contains event registration details
- Created only when user registers for at least one event
- Only kept if `registeredEvents.length > 0`

## How to Run Cleanup Script

```bash
cd backend
node scripts/cleanupParticipants.mjs
```

## Testing the Fix

1. **New Signup:** User signs up → Only saved in `registrations`
2. **Event Registration:** User registers for events → Now saved in `participants` with events
3. **No Empty Participants:** Participants collection never has entries with empty events array

## Files Modified

1. `backend/routes/registration.js` - Fixed duplicate creation logic
2. `backend/scripts/cleanupParticipants.mjs` - New cleanup script

## Benefits

✅ No data duplication during signup  
✅ Cleaner database structure  
✅ Participants collection only has meaningful data  
✅ Easier to track actual event participants  
✅ Reduced database storage usage
