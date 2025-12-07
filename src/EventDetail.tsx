import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface EventDetailData {
  title: string;
  subtitle: string;
  rules: string[];
  prizes: {
    first: string;
    second: string;
    third?: string;
    fourth?: string;
  };
  contacts: {
    name: string;
    phone: string;
  }[];
}

const EventDetail: React.FC = () => {
  const { eventName } = useParams<{ eventName: string }>();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sample event data - this would normally come from your API
  const eventDetailsData: { [key: string]: EventDetailData } = {
    "Chess": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "CHESS (Men & Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Chess Tournament is conducted in Swiss League system.",
        "Everyone should report at least 30 mins before scheduled match time.",
        "All India Chess Federation Rules & Regulations are adopted for the competition.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Tie breaks is as following: A. Buchholz B. Buchholz but 1 C. Sonneburn burger D. Direct encounter E. Great number of victories"
      ],
      prizes: {
        first: "Rs. 6,000",
        second: "Rs. 4,000",
        third: ""
      },
      contacts: [
        { name: "Ms. K. Deepika Siva Gowri", phone: "+91 9390335366" },
        { name: "Ms. M. Poojitha", phone: "+91 8374697597" }
      ]
    },
    "Table Tennis": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "TABLE TENNIS - Singles (Men & Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Everyone should report at least 30 mins before scheduled match time.",
        "Matches are conducted on knock out basis and are played to 11 points.",
        "All player must come with a proper sports attire.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "There will be only three sets for each match.",
        "Five sets will be conducted for semifinals and finals."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: ""
      },
      contacts: [
        { name: "Mr. U. Om Shri", phone: "+91 9347775310" },
        { name: "Ms. K. Deepika Siva Gowri", phone: "+91 9390335366" }
      ]
    },
    "Football": {
      title: "TEAM EVENTS",
      subtitle: "FOOTBALL (Men & Women)",
      rules: [
        "Team strength is 7+3 players.",
        "The time of each half will be informed before the commencement of tournament.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team."
      ],
      prizes: {
        first: "Men: Rs. 30,000 | Women: Rs. 15,000",
        second: "Men: Rs. 20,000 | Women: Rs. 10,000",
        third: "Men: Rs. 7,000",
        fourth: "Men: Rs. 3,000"
      },
      contacts: [
        { name: "Mr. B. Bala", phone: "+91 7981216560" },
        { name: "Mr. P. Murali", phone: "+91 7207049397" },
        { name: "Ms. M. Poojitha", phone: "+91 8374697597" }
      ]
    },
    "Volley ball": {
      title: "TEAM EVENTS",
      subtitle: "VOLLEY BALL (Men & Women)",
      rules: [
        "Team strength is 6+4 players.",
        "Match will be organized for a total of 3 sets and each set contains 25+25+15 points. It may vary depending upon the situation after prior information to both participating teams.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team."
      ],
      prizes: {
        first: "Men: Rs. 30,000 | Women: Rs. 15,000",
        second: "Men: Rs. 20,000 | Women: Rs. 10,000",
        third: "Men: Rs. 7,000",
        fourth: "Men: Rs. 3,000"
      },
      contacts: [
        { name: "Mr. V Rajesh", phone: "+91 98661 46676" },
        { name: "Ms. Ch. Manvitha", phone: "+91 94928 31319" },
        { name: "Mr. P. Murali", phone: "+91 7207049397" }
      ]
    },
    "Basket ball": {
      title: "TEAM EVENTS",
      subtitle: "BASKET BALL (Men & Women)",
      rules: [
        "Team strength is 5+5 players.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team."
      ],
      prizes: {
        first: "Men: Rs. 30,000 | Women: Rs. 15,000",
        second: "Men: Rs. 20,000 | Women: Rs. 10,000",
        third: "Men: Rs. 7,000",
        fourth: "Men: Rs. 3,000"
      },
      contacts: [
        { name: "Ms. Ch. Jyothika", phone: "+91 6301174427" },
        { name: "Mr. M. Manikanta", phone: "+91 7672069471" },
        { name: "Ms. Ch. Manvitha", phone: "+91 94928 31319" }
      ]
    },
    "Kabaddi": {
      title: "TEAM EVENTS",
      subtitle: "KABADDI (Men & Women)",
      rules: [
        "Team strength is 7+3 players.",
        "Pro Kabaddi rules & Regulations are applicable.",
        "All matches will be conducted on the kabaddi mat.",
        "Player may wear mat shoes or can play with barefoot.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team."
      ],
      prizes: {
        first: "Men: Rs. 30,000 | Women: Rs. 15,000",
        second: "Men: Rs. 20,000 | Women: Rs. 10,000",
        third: "Men: Rs. 7,000",
        fourth: "Men: Rs. 3,000"
      },
      contacts: [
        { name: "Mr. N. Gopi Chandu", phone: "+91 9014360039" },
        { name: "Ms. E. Nikhitha", phone: "+91 6281464539" },
        { name: "Ms. Ch. Bhavana", phone: "+91 9346557223" }
      ]
    },
    "Men's Athletics": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "TRACK & FIELD (Men & Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "All participants must come with a proper sports attire.",
        "Sport Authority of India (SAI) rules are applicable for all Track & Field events under Men & Women categories i.e., 100 M, 400 M, 800 M, 4 X 100 M relay, 4 x 400 M relay, Short put, long Jump and 3 K for men only.",
        "Everyone should report at least 30 mins before scheduled time.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. S. Badari Ajith", phone: "+91 9346193840" },
        { name: "Mr. M. Manikanta", phone: "+91 7672069471" },
        { name: "Ms. Y. Lavanya", phone: "+91 9063809790" }
      ]
    }
  };

  const eventData = eventDetailsData[eventName || ''];

  if (!eventData) {
    return (
      <div className="w-screen min-h-screen overflow-x-hidden relative">
        <div className="flex flex-col items-center justify-center h-screen text-center text-white">
          <h2 className="text-4xl mb-8">Event Not Found</h2>
          <button 
            onClick={() => navigate(-1)} 
            className="circular-back-button"
            aria-label="Go back"
            style={{ position: 'relative' }}
          >
          </button>
        </div>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      console.log('Creating downloadable HTML file...');
      
      // Create a complete HTML page with all styling
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${eventData?.subtitle || 'Event'} Details - Vignan Mahotsav</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 25%, #A855F7 50%, #C084FC 75%, #DDD6FE 100%);
            min-height: 100vh;
            color: white;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .header h1 {
            font-size: 48px;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            color: white;
        }
        
        .header h2 {
            font-size: 28px;
            color: #E9D5FF;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
            margin-bottom: 20px;
        }
        
        .content-grid {
            display: grid;
            grid-template-columns: 300px 1fr 350px;
            gap: 40px;
            align-items: start;
        }
        
        .poster-section {
            text-align: center;
        }
        
        .poster {
            width: 250px;
            height: 350px;
            background: rgba(255, 255, 255, 0.9);
            border: 4px solid white;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #581C87;
            font-weight: bold;
            font-size: 18px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(12px);
        }
        
        .rules-section h3,
        .prizes-section h3,
        .contact-section h3 {
            color: #FFD700;
            font-size: 28px;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .rules-list {
            list-style: none;
            padding: 0;
        }
        
        .rules-list li {
            margin-bottom: 15px;
            display: flex;
            align-items: flex-start;
            font-size: 16px;
            line-height: 1.5;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        .rule-bullet {
            color: #FFD700;
            font-weight: bold;
            margin-right: 12px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        .prizes-section {
            margin-bottom: 40px;
        }
        
        .prize-item {
            margin-bottom: 12px;
            font-size: 18px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        .prize-label {
            color: #FFD700;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        .contact-item {
            margin-bottom: 12px;
            font-size: 16px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
            line-height: 1.4;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 1024px) {
            .content-grid {
                grid-template-columns: 1fr;
                gap: 30px;
                text-align: center;
            }
            
            .header h1 {
                font-size: 36px;
            }
            
            .header h2 {
                font-size: 22px;
            }
            
            .poster {
                margin: 0 auto;
            }
        }
        
        /* Print styles */
        @media print {
            body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
            }
            
            .container {
                padding: 10px;
            }
            
            .content-grid {
                gap: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${eventData.title}</h1>
            <h2>${eventData.subtitle}</h2>
        </div>
        
        <div class="content-grid">
            <!-- Poster Section -->
            <div class="poster-section">
                <div class="poster">
                    POSTER of EVENT
                </div>
            </div>
            
            <!-- Rules Section -->
            <div class="rules-section">
                <h3>Rules:</h3>
                <ul class="rules-list">
                    ${eventData.rules.map(rule => `
                        <li>
                            <span class="rule-bullet">•</span>
                            <span>${rule}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <!-- Prizes and Contact Section -->
            <div>
                <!-- Cash Prizes -->
                <div class="prizes-section">
                    <h3>Cash Prizes:</h3>
                    <div class="prize-item">
                        <span class="prize-label">First:</span> ${eventData.prizes.first}
                    </div>
                    <div class="prize-item">
                        <span class="prize-label">Second:</span> ${eventData.prizes.second}
                    </div>
                    ${eventData.prizes.third ? `
                        <div class="prize-item">
                            <span class="prize-label">Third:</span> ${eventData.prizes.third}
                        </div>
                    ` : ''}
                    ${eventData.prizes.fourth ? `
                        <div class="prize-item">
                            <span class="prize-label">Fourth:</span> ${eventData.prizes.fourth}
                        </div>
                    ` : ''}
                </div>
                
                <!-- Contact Information -->
                <div class="contact-section">
                    <h3>For Queries Contact:</h3>
                    ${eventData.contacts.map(contact => `
                        <div class="contact-item">
                            ${contact.name} - ${contact.phone}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

      // Create and download the HTML file
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${eventData?.subtitle?.replace(/[^a-zA-Z0-9\s]/g, '') || 'Event'}_Details.html`;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('HTML file downloaded successfully');
      
      // Show success message with instructions
      alert(`✅ Event details downloaded as HTML file!\\n\\n📄 To convert to PDF:\\n1. Open the downloaded HTML file in your browser\\n2. Press Ctrl+P (or Cmd+P on Mac)\\n3. Choose "Save as PDF"\\n4. Click Save\\n\\nThe file includes all styling and will look exactly like the webpage!`);
      
    } catch (error) {
      console.error('Error creating HTML file:', error);
      alert('❌ Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAddToMyEvents = async () => {
    setIsSaving(true);
    try {
      // Get user data from localStorage
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const userId = localStorage.getItem('userId');
      
      if (!isLoggedIn || isLoggedIn !== 'true') {
        alert('Please login to save events to your profile.');
        return;
      }
      
      if (!userId) {
        alert('User information not found. Please login again.');
        return;
      }

      // Get existing saved events from localStorage
      const existingEvents = JSON.parse(localStorage.getItem('myEvents') || '[]');
      
      // Create event object with current event data
      const eventToSave = {
        id: eventName || 'unknown',
        name: eventName,
        title: eventData.title,
        subtitle: eventData.subtitle,
        savedAt: new Date().toISOString()
      };
      
      // Check if already saved
      const isAlreadySaved = existingEvents.some((event: any) => event.id === eventToSave.id);
      
      if (isAlreadySaved) {
        alert('📋 This event is already in your saved events!');
        return;
      }
      
      // Add to saved events
      const updatedEvents = [...existingEvents, eventToSave];
      localStorage.setItem('myEvents', JSON.stringify(updatedEvents));
      
      console.log('Event saved successfully:', eventToSave);
      alert(`✅ "${eventData?.subtitle || eventName}" has been added to your saved events!\n\n📁 You can view all your saved events in your profile.`);
      
    } catch (error) {
      console.error('Error adding event to My Events:', error);
      alert('⚠️ Error saving event. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-screen min-h-screen overflow-x-hidden relative" style={{
      backgroundImage: 'url("/Background-redesign.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Background with dashboard image */}
      <div className="min-h-screen relative p-3 sm:p-5 text-white pdf-content">
        {/* Mahotsav Logo/Header */}
        <div className="flex justify-center sm:justify-start mb-6 lg:mb-8 px-2 sm:pl-5">
          <img 
            src={`${import.meta.env.BASE_URL}image.png`}
            alt="Vignan Mahotsav" 
            className="max-w-xs sm:max-w-lg lg:max-w-2xl h-auto object-contain brightness-110 contrast-110"
            style={{filter: 'drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.3))'}}
          />
        </div>

        {/* Main Content Area - Centered */}
        <div className="flex items-start justify-center min-h-[calc(100vh-200px)] relative z-10">
          <div className="max-w-7xl w-full mx-auto px-4">
            {/* Back Button */}
            <button 
              className="circular-back-button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              style={{ position: 'relative', marginBottom: '2rem' }}
            >
            </button>

            {/* Event Title Section */}
            <div className="text-center mb-6 lg:mb-10 px-4">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 lg:mb-3 text-white" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>{eventData.title}</h1>
              <h2 className="text-lg sm:text-xl lg:text-3xl font-medium text-purple-100" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'}}>{eventData.subtitle}</h2>
            </div>

            {/* Mobile Layout */}
            <div className="block lg:hidden">
              {/* Mobile Poster - First */}
              <div className="flex justify-center mb-8">
                <div className="w-48 h-64 sm:w-56 sm:h-72 bg-white/90 border-4 border-white rounded-2xl flex items-center justify-center text-sm sm:text-base font-bold text-purple-900 text-center shadow-2xl backdrop-blur-md">
                  <span>POSTER of EVENT</span>
                </div>
              </div>

              {/* Mobile Rules */}
              <div className="p-4 sm:p-6 mb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-400" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>Rules:</h3>
                <ul className="rules-list list-none p-0 m-0 space-y-3">
                  {eventData.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3 text-white text-sm sm:text-base font-medium leading-relaxed" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>
                      <span className="text-yellow-400 font-bold text-lg mt-0 shrink-0" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>•</span>
                      <span className="flex-1">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile Prizes and Contact */}
              <div className="flex flex-col gap-6">
                {/* Cash Prizes */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-400" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>Cash Prizes:</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center text-white text-sm sm:text-base">
                      <span className="font-bold text-yellow-400 min-w-16 sm:min-w-20" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>First</span>
                      <span className="text-white font-semibold" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>: {eventData.prizes.first}</span>
                    </div>
                    <div className="flex items-center text-white text-sm sm:text-base">
                      <span className="font-bold text-yellow-400 min-w-16 sm:min-w-20" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>Second</span>
                      <span className="text-white font-semibold" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>: {eventData.prizes.second}</span>
                    </div>
                    {eventData.prizes.third && (
                      <div className="flex items-center text-white text-sm sm:text-base">
                        <span className="font-bold text-yellow-400 min-w-16 sm:min-w-20" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>Third</span>
                        <span className="text-white font-semibold" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>: {eventData.prizes.third}</span>
                      </div>
                    )}
                    {eventData.prizes.fourth && (
                      <div className="flex items-center text-white text-sm sm:text-base">
                        <span className="font-bold text-yellow-400 min-w-16 sm:min-w-20" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>Fourth</span>
                        <span className="text-white font-semibold" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>: {eventData.prizes.fourth}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-400" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>For Queries Contact:</h3>
                  <div className="flex flex-col gap-2">
                    {eventData.contacts.map((contact, index) => (
                      <div key={index} className="text-white text-sm sm:text-base font-medium leading-relaxed overflow-wrap-break-word" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>
                        <div className="sm:inline">{contact.name}</div>
                        <div className="sm:inline sm:ml-2">- {contact.phone}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Original 3-column with poster on left */}
            <div className="hidden lg:grid lg:grid-cols-[300px_1fr_350px] gap-10 mb-10 items-start">
              {/* Left Side - Poster */}
              <div className="flex justify-center">
                <div className="w-72 h-96 bg-white/90 border-4 border-white rounded-2xl flex items-center justify-center text-lg font-bold text-purple-900 text-center shadow-2xl backdrop-blur-md">
                  <span>POSTER of EVENT</span>
                </div>
              </div>

              {/* Center - Rules */}
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-6 text-yellow-400" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>Rules:</h3>
                <ul className="rules-list list-none p-0 m-0 space-y-4">
                  {eventData.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-4 text-white text-base font-medium leading-relaxed" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>
                      <span className="text-yellow-400 font-bold text-xl mt-0 shrink-0" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>•</span>
                      <span className="flex-1">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side - Prizes and Contact */}
              <div className="flex flex-col gap-8">
                {/* Cash Prizes */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-yellow-400" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>Cash Prizes:</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center text-white text-lg">
                      <span className="font-bold text-yellow-400 min-w-20" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>First</span>
                      <span className="text-white font-semibold" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>: {eventData.prizes.first}</span>
                    </div>
                    <div className="flex items-center text-white text-lg">
                      <span className="font-bold text-yellow-400 min-w-20" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>Second</span>
                      <span className="text-white font-semibold" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>: {eventData.prizes.second}</span>
                    </div>
                    {eventData.prizes.third && (
                      <div className="flex items-center text-white text-lg">
                        <span className="font-bold text-yellow-400 min-w-20" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>Third</span>
                        <span className="text-white font-semibold" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>: {eventData.prizes.third}</span>
                      </div>
                    )}
                    {eventData.prizes.fourth && (
                      <div className="flex items-center text-white text-lg">
                        <span className="font-bold text-yellow-400 min-w-20" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>Fourth</span>
                        <span className="text-white font-semibold" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>: {eventData.prizes.fourth}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-yellow-400" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>For Queries Contact:</h3>
                  <div className="flex flex-col gap-3">
                    {eventData.contacts.map((contact, index) => (
                      <div key={index} className="text-white text-base font-medium leading-relaxed overflow-wrap-break-word" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>
                        <div className="sm:inline">{contact.name}</div>
                        <div className="sm:inline sm:ml-2">- {contact.phone}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8 lg:mt-12 flex-wrap print-hide px-4">
              <button 
                className="action-button bg-linear-to-r from-red-500 via-red-600 to-red-700 text-white border-none py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-12 rounded-2xl text-base sm:text-lg lg:text-xl font-bold cursor-pointer transition-all duration-300 shadow-2xl hover:-translate-y-2 hover:shadow-3xl hover:from-red-600 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 lg:gap-3 min-w-[180px] sm:min-w-[200px] justify-center transform hover:scale-105 active:scale-95 w-full sm:w-auto"
                onClick={handleDownloadPDF}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Preparing PDF...
                  </>
                ) : (
                  <>
                    <span className="text-2xl">📄</span>
                    Download PDF
                  </>
                )}
              </button>
              <button 
                className="action-button bg-linear-to-r from-green-500 via-green-600 to-green-700 text-white border-none py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-12 rounded-2xl text-base sm:text-lg lg:text-xl font-bold cursor-pointer transition-all duration-300 shadow-2xl hover:-translate-y-2 hover:shadow-3xl hover:from-green-600 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 lg:gap-3 min-w-[180px] sm:min-w-60 lg:min-w-[280px] justify-center transform hover:scale-105 active:scale-95 w-full sm:w-auto"
                onClick={handleAddToMyEvents}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <span className="text-2xl">⭐</span>
                    Add to My Events
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Floating Flower Image - Continuous Rotation */}
        <div className="absolute top-[5%] sm:top-[10%] right-[1%] z-20">
          <style>
            {`
              @keyframes flowerRotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              .rotating-flower {
                animation: flowerRotate 6s linear infinite;
              }
              
              /* Print styles for PDF generation */
              @media print {
                @page {
                  margin: 0.5in;
                  size: A4;
                }
                
                body, * {
                  background: white !important;
                  color: black !important;
                  font-size: 12pt !important;
                  -webkit-print-color-adjust: exact !important;
                  color-adjust: exact !important;
                }
                
                .print-hide {
                  display: none !important;
                }
                
                .print-show {
                  display: block !important;
                }
                
                /* Ensure content fits on page */
                .rotating-flower {
                  display: none !important;
                }
                
                /* Make text more readable in print */
                h1, h2, h3 {
                  color: #333 !important;
                  text-shadow: none !important;
                  font-weight: bold !important;
                }
                
                .text-white {
                  color: #333 !important;
                  text-shadow: none !important;
                }
                
                .text-yellow-400 {
                  color: #666 !important;
                  text-shadow: none !important;
                  font-weight: bold !important;
                }
                
                /* Hide action buttons in print */
                button, .action-button {
                  display: none !important;
                }
                
                /* Improve bullet point visibility in print */
                .rules-list li {
                  margin-bottom: 8px !important;
                  line-height: 1.4 !important;
                }
                
                /* Ensure proper spacing */
                .pdf-content {
                  padding: 20px !important;
                }
              }
              
              /* Enhanced button hover effects */
              .action-button {
                position: relative;
                overflow: hidden;
              }
              
              .action-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s;
              }
              
              .action-button:hover::before {
                left: 100%;
              }
            `}
          </style>
          <img 
            src={`${import.meta.env.BASE_URL}IMG_2037.webp`}
            alt="Decorative Flower" 
            className="w-16 h-auto sm:w-24 md:w-32 lg:w-48 xl:w-64 opacity-50 sm:opacity-70 rounded-full p-1 sm:p-2 rotating-flower"
            style={{
              filter: 'brightness(1.4) contrast(1.2) saturate(0.9) hue-rotate(5deg) drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.3))',
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.08), transparent)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetail;