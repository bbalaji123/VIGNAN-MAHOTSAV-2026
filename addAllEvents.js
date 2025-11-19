// Comprehensive script to add all cultural, sports, and para sports events with gender categories

const API_BASE = 'http://localhost:5000/api';

const allEvents = [
    // CULTURAL EVENTS - MUSIC
    {
        eventName: "Singing Solo - Male",
        eventType: "culturals",
        category: "music",
        gender: "male",
        description: "Solo singing competition for male participants",
        prizePool: "₹25,000",
        isActive: true
    },
    {
        eventName: "Singing Solo - Female", 
        eventType: "culturals",
        category: "music",
        gender: "female",
        description: "Solo singing competition for female participants",
        prizePool: "₹25,000",
        isActive: true
    },
    {
        eventName: "Group Singing",
        eventType: "culturals",
        category: "music", 
        gender: "mixed",
        description: "Group singing competition with mixed gender teams",
        prizePool: "₹40,000",
        isActive: true
    },
    {
        eventName: "Battle of Bands",
        eventType: "culturals",
        category: "music",
        gender: "mixed",
        description: "Musical band competition",
        prizePool: "₹50,000", 
        isActive: true
    },

    // CULTURAL EVENTS - DANCE
    {
        eventName: "Solo Dance - Male",
        eventType: "culturals",
        category: "dance",
        gender: "male",
        description: "Solo dance performance for male participants",
        prizePool: "₹20,000",
        isActive: true
    },
    {
        eventName: "Solo Dance - Female",
        eventType: "culturals",
        category: "dance", 
        gender: "female",
        description: "Solo dance performance for female participants",
        prizePool: "₹20,000",
        isActive: true
    },
    {
        eventName: "Group Dance",
        eventType: "culturals",
        category: "dance",
        gender: "mixed",
        description: "Group dance competition with choreography",
        prizePool: "₹45,000",
        isActive: true
    },
    {
        eventName: "Classical Dance",
        eventType: "culturals",
        category: "dance",
        gender: "female",
        description: "Traditional classical dance forms",
        prizePool: "₹30,000",
        isActive: true
    },
    {
        eventName: "Folk Dance",
        eventType: "culturals", 
        category: "dance",
        gender: "mixed",
        description: "Regional folk dance competition",
        prizePool: "₹35,000",
        isActive: true
    },

    // CULTURAL EVENTS - THEATRE
    {
        eventName: "Drama Competition",
        eventType: "culturals",
        category: "theatre",
        gender: "mixed",
        description: "Short play performances and skits",
        prizePool: "₹40,000",
        isActive: true
    },
    {
        eventName: "Mime Competition",
        eventType: "culturals",
        category: "theatre", 
        gender: "mixed",
        description: "Silent acting and mime performances",
        prizePool: "₹15,000",
        isActive: true
    },
    {
        eventName: "Stand-up Comedy",
        eventType: "culturals",
        category: "theatre",
        gender: "mixed",
        description: "Comedy performances and storytelling",
        prizePool: "₹20,000",
        isActive: true
    },

    // CULTURAL EVENTS - LITERARY
    {
        eventName: "Poetry Competition",
        eventType: "culturals",
        category: "literary",
        gender: "mixed", 
        description: "Original poetry recitation and composition",
        prizePool: "₹12,000",
        isActive: true
    },
    {
        eventName: "Debate Competition",
        eventType: "culturals",
        category: "literary",
        gender: "mixed",
        description: "Formal debate on contemporary topics",
        prizePool: "₹18,000",
        isActive: true
    },
    {
        eventName: "Creative Writing",
        eventType: "culturals",
        category: "literary",
        gender: "mixed",
        description: "Short story and essay writing competition",
        prizePool: "₹15,000",
        isActive: true
    },

    // SPORTS EVENTS - TEAM SPORTS
    {
        eventName: "Cricket - Men",
        eventType: "sports",
        category: "team",
        gender: "male",
        description: "Inter-college cricket tournament for men",
        prizePool: "₹75,000",
        isActive: true
    },
    {
        eventName: "Cricket - Women",
        eventType: "sports", 
        category: "team",
        gender: "female",
        description: "Inter-college cricket tournament for women", 
        prizePool: "₹60,000",
        isActive: true
    },
    {
        eventName: "Football - Men",
        eventType: "sports",
        category: "team",
        gender: "male",
        description: "Football championship for male teams",
        prizePool: "₹70,000",
        isActive: true
    },
    {
        eventName: "Football - Women",
        eventType: "sports",
        category: "team", 
        gender: "female",
        description: "Football championship for female teams",
        prizePool: "₹55,000",
        isActive: true
    },
    {
        eventName: "Basketball - Men",
        eventType: "sports",
        category: "team",
        gender: "male",
        description: "Basketball tournament for men's teams",
        prizePool: "₹50,000",
        isActive: true
    },
    {
        eventName: "Basketball - Women",
        eventType: "sports",
        category: "team",
        gender: "female",
        description: "Basketball tournament for women's teams", 
        prizePool: "₹45,000",
        isActive: true
    },
    {
        eventName: "Volleyball - Men",
        eventType: "sports",
        category: "team",
        gender: "male", 
        description: "Volleyball championship for male teams",
        prizePool: "₹40,000",
        isActive: true
    },
    {
        eventName: "Volleyball - Women",
        eventType: "sports",
        category: "team",
        gender: "female",
        description: "Volleyball championship for female teams",
        prizePool: "₹40,000",
        isActive: true
    },

    // SPORTS EVENTS - INDIVIDUAL SPORTS
    {
        eventName: "100m Sprint - Men",
        eventType: "sports",
        category: "athletics",
        gender: "male",
        description: "100 meter sprint race for men",
        prizePool: "₹15,000",
        isActive: true
    },
    {
        eventName: "100m Sprint - Women",
        eventType: "sports",
        category: "athletics", 
        gender: "female",
        description: "100 meter sprint race for women",
        prizePool: "₹15,000",
        isActive: true
    },
    {
        eventName: "200m Sprint - Men",
        eventType: "sports",
        category: "athletics",
        gender: "male",
        description: "200 meter sprint race for men",
        prizePool: "₹18,000",
        isActive: true
    },
    {
        eventName: "200m Sprint - Women",
        eventType: "sports",
        category: "athletics",
        gender: "female",
        description: "200 meter sprint race for women",
        prizePool: "₹18,000", 
        isActive: true
    },
    {
        eventName: "Long Jump - Men",
        eventType: "sports",
        category: "athletics",
        gender: "male",
        description: "Long jump competition for men",
        prizePool: "₹12,000",
        isActive: true
    },
    {
        eventName: "Long Jump - Women",
        eventType: "sports",
        category: "athletics",
        gender: "female",
        description: "Long jump competition for women",
        prizePool: "₹12,000",
        isActive: true
    },

    // SPORTS EVENTS - INDOOR SPORTS
    {
        eventName: "Chess - Open",
        eventType: "sports",
        category: "indoor",
        gender: "mixed",
        description: "Individual chess tournament open to all",
        prizePool: "₹20,000",
        isActive: true
    },
    {
        eventName: "Badminton Singles - Men",
        eventType: "sports", 
        category: "indoor",
        gender: "male",
        description: "Badminton singles championship for men",
        prizePool: "₹25,000",
        isActive: true
    },
    {
        eventName: "Badminton Singles - Women",
        eventType: "sports",
        category: "indoor",
        gender: "female",
        description: "Badminton singles championship for women",
        prizePool: "₹25,000",
        isActive: true
    },
    {
        eventName: "Badminton Doubles - Mixed",
        eventType: "sports",
        category: "indoor",
        gender: "mixed",
        description: "Mixed doubles badminton tournament",
        prizePool: "₹30,000",
        isActive: true
    },
    {
        eventName: "Table Tennis - Men",
        eventType: "sports",
        category: "indoor",
        gender: "male", 
        description: "Table tennis singles for men",
        prizePool: "₹15,000",
        isActive: true
    },
    {
        eventName: "Table Tennis - Women",
        eventType: "sports",
        category: "indoor",
        gender: "female",
        description: "Table tennis singles for women",
        prizePool: "₹15,000",
        isActive: true
    },

    // PARA SPORTS EVENTS
    {
        eventName: "Para Athletics 100m - Men",
        eventType: "parasports",
        category: "athletics",
        gender: "male",
        description: "100m race for differently-abled male athletes",
        prizePool: "₹15,000",
        isActive: true
    },
    {
        eventName: "Para Athletics 100m - Women",
        eventType: "parasports",
        category: "athletics", 
        gender: "female",
        description: "100m race for differently-abled female athletes",
        prizePool: "₹15,000",
        isActive: true
    },
    {
        eventName: "Para Swimming 50m - Men",
        eventType: "parasports",
        category: "swimming",
        gender: "male",
        description: "50m swimming for differently-abled male athletes",
        prizePool: "₹12,000",
        isActive: true
    },
    {
        eventName: "Para Swimming 50m - Women",
        eventType: "parasports",
        category: "swimming",
        gender: "female",
        description: "50m swimming for differently-abled female athletes",
        prizePool: "₹12,000",
        isActive: true
    },
    {
        eventName: "Wheelchair Basketball",
        eventType: "parasports", 
        category: "team",
        gender: "mixed",
        description: "Basketball tournament for wheelchair users",
        prizePool: "₹25,000",
        isActive: true
    },
    {
        eventName: "Para Badminton - Singles",
        eventType: "parasports",
        category: "indoor",
        gender: "mixed",
        description: "Badminton singles for differently-abled athletes",
        prizePool: "₹18,000",
        isActive: true
    },
    {
        eventName: "Para Powerlifting - Men",
        eventType: "parasports",
        category: "strength",
        gender: "male",
        description: "Powerlifting competition for differently-abled men",
        prizePool: "₹20,000", 
        isActive: true
    },
    {
        eventName: "Para Powerlifting - Women",
        eventType: "parasports",
        category: "strength",
        gender: "female",
        description: "Powerlifting competition for differently-abled women",
        prizePool: "₹20,000",
        isActive: true
    }
];

async function addAllEventsViaAPI() {
    console.log('🚀 Starting to add all events to database...\n');
    
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;
    
    // Group events by type for better logging
    const eventsByType = {
        culturals: allEvents.filter(e => e.eventType === 'culturals'),
        sports: allEvents.filter(e => e.eventType === 'sports'), 
        parasports: allEvents.filter(e => e.eventType === 'parasports')
    };

    for (const [type, events] of Object.entries(eventsByType)) {
        console.log(`\n📝 Adding ${type.toUpperCase()} events (${events.length} events):`);
        console.log('─'.repeat(50));

        for (const eventData of events) {
            try {
                const response = await fetch(`${API_BASE}/event`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eventData)
                });

                const result = await response.json();

                if (response.ok) {
                    console.log(`✅ ${eventData.eventName} (${eventData.gender})`);
                    successCount++;
                } else if (response.status === 409 || result.message?.includes('already exists')) {
                    console.log(`⚠️ ${eventData.eventName} (already exists)`);
                    skipCount++;
                } else {
                    console.log(`❌ ${eventData.eventName}: ${result.message || 'Unknown error'}`);
                    errorCount++;
                }
            } catch (error) {
                console.log(`❌ ${eventData.eventName}: ${error.message}`);
                errorCount++;
            }

            // Small delay to avoid overwhelming the API
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL SUMMARY:');
    console.log(`✅ Successfully added: ${successCount} events`);
    console.log(`⚠️ Already existed: ${skipCount} events`);
    console.log(`❌ Failed: ${errorCount} events`);
    console.log(`📈 Total processed: ${successCount + skipCount + errorCount} events`);

    // Check final counts by querying API
    console.log('\n🔍 Verifying event counts in database:');
    console.log('─'.repeat(40));
    
    try {
        for (const type of ['sports', 'culturals', 'parasports']) {
            const response = await fetch(`${API_BASE}/events/${type}`);
            const data = await response.json();
            console.log(`${type.padEnd(12)}: ${(data.count || 0).toString().padStart(3)} events`);
        }

        // Get total count
        const totalResponse = await fetch(`${API_BASE}/events`);
        const totalData = await totalResponse.json();
        console.log(`${'TOTAL'.padEnd(12)}: ${(totalData.count || 0).toString().padStart(3)} events`);
        
    } catch (error) {
        console.log('❌ Error verifying counts:', error.message);
    }

    console.log('\n🎉 All events have been processed!');
    console.log('💡 Now refresh your frontend to see the events.');
}

// Check if API is available first
async function checkAPI() {
    try {
        const response = await fetch(`${API_BASE}/events`);
        if (response.ok) {
            console.log('✅ Backend API is running and accessible\n');
            return true;
        } else {
            console.log('❌ Backend API returned error:', response.status);
            return false;
        }
    } catch (error) {
        console.log('❌ Cannot connect to backend API:', error.message);
        console.log('💡 Please ensure your backend server is running on http://localhost:5000');
        return false;
    }
}

// Main execution
async function main() {
    console.log('🔗 Checking backend connection...');
    
    const apiReady = await checkAPI();
    if (!apiReady) {
        process.exit(1);
    }

    await addAllEventsViaAPI();
}

main().catch(console.error);