// Simple test for pricing logic
function getEventPricing(eventType, eventGender) {
  if (eventType === 'parasports') {
    return 0; // Para sports are free
  }

  if (eventType === 'sports') {
    if (eventGender?.toLowerCase() === 'female') {
      return 250;
    }
    // Men's or mixed sports default to ₹350
    return 350;
  }

  if (eventType === 'culturals') {
    return 250;
  }

  return 0;
}

console.log('Testing pricing logic:');
console.log('Female sports:', getEventPricing('sports', 'female')); // Should be 250
console.log('Female sports (uppercase):', getEventPricing('sports', 'Female')); // Should be 250
console.log('Male sports:', getEventPricing('sports', 'male')); // Should be 350
console.log('Mixed sports:', getEventPricing('sports', 'mixed')); // Should be 350
console.log('Culturals:', getEventPricing('culturals', 'female')); // Should be 250
console.log('Culturals (male):', getEventPricing('culturals', 'male')); // Should be 250
console.log('Para sports:', getEventPricing('parasports', 'male')); // Should be 0

// Test sample events
const sampleEvents = [
  { eventName: 'Cricket Championship - Women', eventType: 'sports', gender: 'female' },
  { eventName: 'Cricket Championship - Men', eventType: 'sports', gender: 'male' },
  { eventName: 'Solo Singing - Female', eventType: 'culturals', gender: 'female' },
  { eventName: 'Solo Singing - Male', eventType: 'culturals', gender: 'male' }
];

console.log('\nSample event pricing:');
sampleEvents.forEach(event => {
  const price = getEventPricing(event.eventType, event.gender);
  console.log(`${event.eventName} (${event.gender}): ₹${price}`);
});