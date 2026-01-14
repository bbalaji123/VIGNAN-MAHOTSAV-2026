# How Fee Data is Saved - Detailed Flow

## Current Implementation

### **Issue Identified:**
The current implementation has individual event fees set to **0** for regular colleges, but **150** for special Vignan colleges. This creates an inconsistency.

## Data Flow

### 1. **User Selects Events in Dashboard**
When a user selects events and clicks "Submit Registration":

```typescript
// Example: Male user from regular college selects:
// - Cricket (sport)
// - Dance (cultural)

hasSports = true
hasCulturals = true
```

### 2. **Total Fee Calculation (Display & Confirmation)**
```typescript
// For male user (regular college):
if (hasSports && hasCulturals) {
  fee = 350; // Both sports and culturals
}
// Total fee shown: ₹350
```

### 3. **Individual Event Objects Created**
```typescript
// Each event gets this structure:
{
  eventName: "Cricket",
  eventType: "sports",
  category: "Team Sports",
  description: "Team Sports - Cricket",
  fee: 0  // ⚠️ PROBLEM: Individual fee is 0 for regular colleges
}

{
  eventName: "Dance",
  eventType: "culturals", 
  category: "Performing Arts",
  description: "Performing Arts - Dance",
  fee: 0  // ⚠️ PROBLEM: Individual fee is 0 for regular colleges
}
```

### 4. **Saved to Database (Participant Model)**
```javascript
{
  userId: "MH26000123",
  name: "John Doe",
  email: "john@example.com",
  college: "ABC College",
  gender: "Male",
  paymentStatus: "pending",
  registeredEvents: [
    {
      eventName: "Cricket",
      eventType: "sports",
      category: "Team Sports",
      description: "Team Sports - Cricket",
      fee: 0,  // ⚠️ Individual event fee
      registeredAt: "2026-01-13T17:06:51.000Z"
    },
    {
      eventName: "Dance",
      eventType: "culturals",
      category: "Performing Arts",
      description: "Performing Arts - Dance",
      fee: 0,  // ⚠️ Individual event fee
      registeredAt: "2026-01-13T17:06:51.000Z"
    }
  ]
}
```

## **Problem:**

The **total registration fee** (₹350) is **NOT stored anywhere** in the database! 

Only individual event fees are stored, and they're all **0** for regular colleges.

## **Where is the Total Fee Used?**

The total fee (₹350) is only:
1. **Displayed** to the user during registration
2. **Shown in the success toast message**
3. **NOT saved to the database**

## **Potential Issues:**

1. **Payment tracking:** If you need to know how much a user should pay, you'll have to recalculate it from their events
2. **Fee changes:** If you change the fee structure later, old registrations won't have the original fee amount
3. **Reports:** Generating payment reports will require recalculating fees for each user

## **Recommended Fix:**

You should store the **total registration fee** in the database. Here are the options:

### Option 1: Add `amount` field to Participant model
```javascript
// In Participant model:
{
  userId: "MH26000123",
  registeredEvents: [...],
  amount: 350,  // ✅ Total registration fee
  paymentStatus: "pending"
}
```

### Option 2: Store total fee with each registration batch
```javascript
// In Participant model:
{
  userId: "MH26000123",
  registeredEvents: [...],
  registrationBatches: [
    {
      events: ["Cricket", "Dance"],
      totalFee: 350,  // ✅ Total fee for this batch
      registeredAt: "2026-01-13T17:06:51.000Z"
    }
  ]
}
```

### Option 3: Keep individual event fees accurate
Instead of setting individual fees to 0, distribute the total fee across events:
```javascript
// For male user selecting sports + culturals (₹350 total):
{
  eventName: "Cricket",
  fee: 175  // Half of 350
},
{
  eventName: "Dance", 
  fee: 175  // Half of 350
}
```

## **Current Behavior Summary:**

| User Type | Events Selected | Total Fee Shown | Individual Event Fees Saved | Total Fee Saved |
|-----------|----------------|-----------------|----------------------------|-----------------|
| Male (Regular) | Culturals only | ₹250 | 0 each | ❌ No |
| Male (Regular) | Sports only | ₹350 | 0 each | ❌ No |
| Male (Regular) | Both | ₹350 | 0 each | ❌ No |
| Female (Regular) | Any | ₹250 | 0 each | ❌ No |
| Special Vignan | Any | ₹150 | 150 each | ⚠️ Yes, but duplicated |
| Para Sports | Any | ₹0 | 0 each | ✅ Yes |

## **Recommendation:**

I recommend adding an `amount` field to store the total registration fee. Would you like me to implement this?
