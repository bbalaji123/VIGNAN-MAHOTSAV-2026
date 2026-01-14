# Amount Field Implementation - Complete Summary

## Date: 2026-01-13

## Overview
Added `amount` field to the Participant model to store the total registration fee for each participant. This ensures proper tracking of payment amounts in the database.

---

## Changes Made

### 1. **Backend Model Update**
**File:** `backend/models/Participant.js`

Added new field to schema:
```javascript
amount: {
  type: Number,
  default: 0,
  min: 0
}
```

**Location:** After `paymentStatus`, before `registeredEvents`

---

### 2. **Backend Route Update**
**File:** `backend/routes/registration.js`

**Added:**
- Fee calculation function `calculateRegistrationFee()`
- Logic to calculate and save `amount` when creating/updating participants
- Reset `amount` to 0 when all events are removed

**Fee Calculation Logic:**
```javascript
// Para Sports → ₹0
// Special Vignan Colleges → ₹150 (any events)
// Male (Regular):
//   - Culturals only → ₹250
//   - Sports only → ₹350
//   - Both → ₹350
// Female (Regular) → ₹250 (any events)
```

---

### 3. **Migration Script**
**File:** `backend/scripts/updateParticipantAmounts.js`

Created migration script to update existing participants with calculated amounts.

**To run:**
```bash
cd backend
node scripts/updateParticipantAmounts.js
```

---

## How Amount is Saved

### **Example 1: Male user from regular college**
**Scenario:** Registers for Cricket (sports) + Dance (culturals)

**Database Entry:**
```json
{
  "userId": "MH26000123",
  "name": "John Doe",
  "gender": "Male",
  "college": "ABC College",
  "amount": 350,  // ✅ Total registration fee
  "paymentStatus": "pending",
  "registeredEvents": [
    {
      "eventName": "Cricket",
      "eventType": "sports",
      "fee": 0  // Individual event fee (not used)
    },
    {
      "eventName": "Dance",
      "eventType": "culturals",
      "fee": 0  // Individual event fee (not used)
    }
  ]
}
```

### **Example 2: Male user - Culturals only**
**Scenario:** Registers for Dance (culturals) only

**Database Entry:**
```json
{
  "userId": "MH26000124",
  "name": "Mike Smith",
  "gender": "Male",
  "college": "XYZ College",
  "amount": 250,  // ✅ Culturals only = ₹250
  "paymentStatus": "pending",
  "registeredEvents": [
    {
      "eventName": "Dance",
      "eventType": "culturals",
      "fee": 0
    }
  ]
}
```

### **Example 3: Female user**
**Scenario:** Registers for any events

**Database Entry:**
```json
{
  "userId": "MH26000125",
  "name": "Jane Doe",
  "gender": "Female",
  "college": "ABC College",
  "amount": 250,  // ✅ Always ₹250 for females
  "paymentStatus": "pending",
  "registeredEvents": [...]
}
```

### **Example 4: Special Vignan College student**
**Scenario:** Registers for any events

**Database Entry:**
```json
{
  "userId": "MH26000126",
  "name": "Ram Kumar",
  "gender": "Male",
  "college": "Vignan Pharmacy College",
  "amount": 150,  // ✅ Always ₹150 for special Vignan colleges
  "paymentStatus": "pending",
  "registeredEvents": [...]
}
```

### **Example 5: Para Sports participant**
**Scenario:** Registers for Para Sports events

**Database Entry:**
```json
{
  "userId": "MH26000127",
  "name": "Arjun Singh",
  "gender": "Male",
  "college": "ABC College",
  "amount": 0,  // ✅ Para Sports are FREE
  "paymentStatus": "pending",
  "registeredEvents": [
    {
      "eventName": "Para Athletics - 100M",
      "eventType": "parasports",
      "fee": 0
    }
  ]
}
```

---

## Fee Structure Summary

| User Type | Events Selected | Amount Saved |
|-----------|----------------|--------------|
| **Male (Regular)** | Culturals only | ₹250 |
| **Male (Regular)** | Sports only | ₹350 |
| **Male (Regular)** | Both Sports + Culturals | ₹350 |
| **Female (Regular)** | Any events | ₹250 |
| **Special Vignan Colleges** | Any events | ₹150 |
| **Para Sports** | Any events | ₹0 (FREE) |

---

## Benefits of Amount Field

### ✅ **Payment Tracking**
- Easy to see how much each participant owes
- No need to recalculate from events

### ✅ **Historical Record**
- Preserves original fee even if structure changes later
- Audit trail for payments

### ✅ **Reporting**
- Simple queries for total revenue
- Easy to generate payment reports

### ✅ **Payment Gateway Integration**
- Direct amount value for payment processing
- No calculation errors

---

## Database Queries

### Get total pending payments:
```javascript
const totalPending = await Participant.aggregate([
  { $match: { paymentStatus: 'pending' } },
  { $group: { _id: null, total: { $sum: '$amount' } } }
]);
```

### Get participants by fee amount:
```javascript
// All ₹250 participants
const participants250 = await Participant.find({ amount: 250 });

// All ₹350 participants
const participants350 = await Participant.find({ amount: 350 });
```

### Get payment summary:
```javascript
const summary = await Participant.aggregate([
  {
    $group: {
      _id: '$paymentStatus',
      count: { $sum: 1 },
      totalAmount: { $sum: '$amount' }
    }
  }
]);
```

---

## Testing Checklist

- [ ] Male user registers for culturals only → amount = 250
- [ ] Male user registers for sports only → amount = 350
- [ ] Male user registers for both → amount = 350
- [ ] Female user registers for any events → amount = 250
- [ ] Special Vignan college student → amount = 150
- [ ] Para sports participant → amount = 0
- [ ] User removes all events → amount = 0
- [ ] Run migration script on existing data
- [ ] Verify amounts in database match expected values

---

## Migration Instructions

### **Step 1: Backup Database**
```bash
mongodump --uri="your_mongodb_uri" --out=backup_before_amount_field
```

### **Step 2: Run Migration**
```bash
cd backend
node scripts/updateParticipantAmounts.js
```

### **Step 3: Verify Results**
Check the console output for:
- Total participants processed
- Number updated
- Number skipped (already correct)

### **Step 4: Spot Check**
Manually verify a few participants in the database to ensure amounts are correct.

---

## Notes

- The `amount` field is automatically calculated and saved when:
  - User registers for events (new participant)
  - User updates their event selection (existing participant)
  - User removes all events (amount reset to 0)

- Individual event `fee` fields are set to 0 because the total fee is calculated at registration level based on event combination

- The migration script is idempotent - safe to run multiple times

---

## Files Modified

1. ✅ `backend/models/Participant.js` - Added amount field
2. ✅ `backend/routes/registration.js` - Added fee calculation logic
3. ✅ `backend/scripts/updateParticipantAmounts.js` - Created migration script

---

## Next Steps

1. Run the migration script to update existing participants
2. Test the new fee structure with new registrations
3. Verify payment tracking works correctly
4. Update any payment-related frontend components to use the `amount` field
