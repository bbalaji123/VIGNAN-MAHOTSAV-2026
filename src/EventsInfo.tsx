import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './FloatingIcons.css';
import { getEventsByType, type Event } from './services/api';

const EventsInfo: React.FC = () => {
  const navigate = useNavigate();
  
  // Main section states
  const [showSportsDetails, setShowSportsDetails] = useState(false);
  const [showParaSports, setShowParaSports] = useState(false);
  const [showCulturals, setShowCulturals] = useState(false);

  // Carousel states
  const [currentSportsSlide, setCurrentSportsSlide] = useState(0);
  const [currentCulturalsSlide, setCurrentCulturalsSlide] = useState(0);

  // Events data
  const [sportsEvents, setSportsEvents] = useState<Event[]>([]);
  const [culturalEvents, setCulturalEvents] = useState<Event[]>([]);
  const [paraSportsEvents, setParaSportsEvents] = useState<Event[]>([]);

  const eventInfoCards = [
    { title: "SPORTS", description: "Competitive sports events including Cricket, Football, Basketball, Badminton, and more." },
    { title: "CULTURALS", description: "Cultural events featuring Dance, Music, Drama, Art competitions, and creative showcases." },
    { title: "PARA SPORTS", description: "Inclusive para sports events designed for participants with special abilities." }
  ];

  const sportsDetailCards = [
    { title: "Men's Athletics", subtitle: "Track & Field" },
    { title: "Women's Athletics", subtitle: "Track & Field" },
    { title: "Men's Individual &", subtitle: "Indoor Sports" },
    { title: "Women's Individual &", subtitle: "Indoor Sports" },
    { title: "Men's Team Field Sports", subtitle: "" },
    { title: "Women's Team Field", subtitle: "Sports" }
  ];

  const culturalsCards = [
    { title: "Music", subtitle: "Singing & Instruments" },
    { title: "Dance", subtitle: "Classical & Western" },
    { title: "Theatre", subtitle: "Drama & Cinematography" },
    { title: "Literature", subtitle: "Poetry & Writing" },
    { title: "Visual Arts", subtitle: "Arts & Craft" },
    { title: "Fashion Design", subtitle: "Fashion & Styling" },
    { title: "Spot Light", subtitle: "Special Events" }
  ];

  // Event details data - just the keys to check if event exists
  const eventDetailsData = {
    "Men's Athletics": true,
    "Women's Athletics": true,
    "Chess": true,
    "Table Tennis": true,
    "Football": true,
    "Volley ball": true,
    "Basket ball": true,
    "Kabaddi": true,
    "Hockey": true,
    "Kho-Kho": true,
    "Throw ball": true,
    "Tennikoit": true,
    "Traditional Yogasana": true,
    "Artistic Yogasana": true,
    "Taekwondo": true
  };

  // Handle event detail click
  const handleEventDetailClick = (eventTitle: string) => {
    console.log('Event clicked:', eventTitle);
    
    // Map event titles to their detail page names
    const eventNameMapping: { [key: string]: string } = {
      "Men's Athletics": "Men's Athletics",
      "Women's Athletics": "Men's Athletics",
      "Chess Championship": "Chess",
      "Chess Tournament": "Chess",
      "Chess": "Chess",
      "Table Tennis": "Table Tennis",
      "Football": "Football",
      "Volley ball": "Volley ball",
      "Basket ball": "Basket ball",
      "Kabaddi": "Kabaddi",
      "Hockey": "Hockey",
      "Kho-Kho": "Kho-Kho",
      "Throw ball": "Throw ball",
      "Tennikoit": "Tennikoit"
    };
    
    let eventName = eventTitle;
    if (eventNameMapping[eventTitle]) {
      eventName = eventNameMapping[eventTitle];
    }
    
    console.log('Navigating to event:', eventName);
    navigate(`/event/${encodeURIComponent(eventName)}`);
  };

  // Click handlers
  const handleSportsCardClick = () => {
    console.log('Sports card clicked');
    setShowSportsDetails(true);
  };

  const handleParaSportsCardClick = () => {
    console.log('Para Sports card clicked');
    setShowParaSports(true);
  };

  const handleCulturalsCardClick = () => {
    console.log('Culturals card clicked');
    setShowCulturals(true);
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  // Navigation functions for sports carousel
  const nextSportsSlide = () => {
    setCurrentSportsSlide((prev) => (prev + 1) % sportsDetailCards.length);
  };

  const prevSportsSlide = () => {
    setCurrentSportsSlide((prev) => (prev - 1 + sportsDetailCards.length) % sportsDetailCards.length);
  };

  // Navigation functions for culturals carousel
  const nextCulturalsSlide = () => {
    setCurrentCulturalsSlide((prev) => (prev + 1) % culturalsCards.length);
  };

  const prevCulturalsSlide = () => {
    setCurrentCulturalsSlide((prev) => (prev - 1 + culturalsCards.length) % culturalsCards.length);
  };

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [sportsResponse, culturalsResponse, paraSportsResponse] = await Promise.all([
          getEventsByType('Sports'),
          getEventsByType('Cultural'),
          getEventsByType('Para Sports')
        ]);
        setSportsEvents(sportsResponse.data || []);
        setCulturalEvents(culturalsResponse.data || []);
        setParaSportsEvents(paraSportsResponse.data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative" style={{
      backgroundImage: 'url("/Background-redesign.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Floating Flower - Top Right */}
      <div className="fixed top-0 right-0 z-10 pointer-events-none flower-container-mobile">
        <div className="flower-inner" style={{ animation: 'petalsRotateAnticlockwise 20s linear infinite', transformOrigin: 'center center' }}>
          {/* Petals layer - rotates anticlockwise */}
          <img 
            src={`${import.meta.env.BASE_URL}petals.png`}
            alt="Flower Petals"
            className="absolute inset-0 w-full h-full object-contain"
          />
          {/* Sun layer in center - rotates clockwise */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={`${import.meta.env.BASE_URL}sun.png`}
              alt="Sun"
              className="absolute w-1/3 h-1/3 object-contain"
              style={{ animation: 'sunRotateClockwise 20s linear infinite' }}
            />
            {/* Moon layer - inside sun, stays static */}
            <img 
              src={`${import.meta.env.BASE_URL}moon.png`}
              alt="Moon"
              className="absolute w-1/3 h-1/3 object-contain"
              style={{ 
                zIndex: 10,
                animation: 'moonStatic 20s linear infinite'
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating Flower - Bottom Left */}
      <div className="fixed bottom-0 left-0 z-10 pointer-events-none flower-container-mobile">
        <div className="flower-inner" style={{ animation: 'petalsRotateAnticlockwise 20s linear infinite', transformOrigin: 'center center' }}>
          {/* Petals layer - rotates anticlockwise */}
          <img 
            src={`${import.meta.env.BASE_URL}petals.png`}
            alt="Flower Petals"
            className="absolute inset-0 w-full h-full object-contain"
          />
          {/* Sun layer in center - rotates clockwise */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={`${import.meta.env.BASE_URL}sun.png`}
              alt="Sun"
              className="absolute w-1/3 h-1/3 object-contain"
              style={{ animation: 'sunRotateClockwise 20s linear infinite' }}
            />
            {/* Moon layer - inside sun, stays static */}
            <img 
              src={`${import.meta.env.BASE_URL}moon.png`}
              alt="Moon"
              className="absolute w-1/3 h-1/3 object-contain"
              style={{ 
                zIndex: 10,
                animation: 'moonStatic 20s linear infinite'
              }}
            />
          </div>
        </div>
      </div>

      <style>
        {`
          .flower-container-mobile {
            width: 600px;
            height: 600px;
            overflow: hidden;
          }
          
          .flower-inner {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          
          .flower-container-mobile:first-of-type .flower-inner {
            top: -48%;
            right: -48%;
          }
          
          .flower-container-mobile:nth-of-type(2) .flower-inner {
            bottom: -48%;
            left: -48%;
          }
          
          @media (max-width: 768px) {
            .flower-container-mobile {
              width: 300px;
              height: 300px;
            }
            
            .flower-container-mobile:first-of-type .flower-inner {
              top: -40%;
              right: -40%;
            }
            
            .flower-container-mobile:nth-of-type(2) .flower-inner {
              bottom: -40%;
              left: -40%;
            }
          }
          
          @media (max-width: 480px) {
            .flower-container-mobile {
              width: 200px;
              height: 200px;
            }
            
            .flower-container-mobile:first-of-type .flower-inner {
              top: -35%;
              right: -35%;
            }
            
            .flower-container-mobile:nth-of-type(2) .flower-inner {
              bottom: -35%;
              left: -35%;
            }
          }
          
          @media (max-width: 375px) {
            .flower-container-mobile {
              width: 150px;
              height: 150px;
            }
            
            .flower-container-mobile:first-of-type .flower-inner {
              top: -30%;
              right: -30%;
            }
            
            .flower-container-mobile:nth-of-type(2) .flower-inner {
              bottom: -30%;
              left: -30%;
            }
          }
        
          @keyframes petalsRotateAnticlockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          
          @keyframes sunRotateClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(720deg); }
          }
          
          @keyframes moonStatic {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Back to Dashboard Button */}
      <div className="fixed top-4 left-4 z-50">
        <button 
          onClick={handleBackToDashboard}
          className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors duration-300 bg-black/20 backdrop-blur-md rounded-lg px-4 py-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Main content - centered both vertically and horizontally */}
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl px-4">
          {!showSportsDetails && !showParaSports && !showCulturals && (
            <section className="inline-events-info-section">
              <div className="inline-events-info-container">
                <div className="inline-events-info-header">
                  <div className="events-header-left">
                    <h2>EVENTS INFORMATION</h2>
                  </div>
                </div>
                <div className="inline-events-info-grid">
                  <div 
                    className="inline-event-info-card"
                    onClick={handleSportsCardClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-poster-background">
                      <span className="poster-placeholder-text">POSTER of EVENT</span>
                    </div>
                    <div className="card-title-overlay">
                      <h3>SPORTS</h3>
                      <h4>Competitive sports events including Cricket, Football, Basketball, Badminton, and more.</h4>
                    </div>
                  </div>
                  
                  <div 
                    className="inline-event-info-card"
                    onClick={handleCulturalsCardClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-poster-background">
                      <span className="poster-placeholder-text">POSTER of EVENT</span>
                    </div>
                    <div className="card-title-overlay">
                      <h3>CULTURALS</h3>
                      <h4>Cultural events featuring Dance, Music, Drama, Art competitions, and creative showcases.</h4>
                    </div>
                  </div>
                  
                  <div 
                    className="inline-event-info-card"
                    onClick={handleParaSportsCardClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-poster-background">
                      <span className="poster-placeholder-text">POSTER of EVENT</span>
                    </div>
                    <div className="card-title-overlay">
                      <h3>PARA SPORTS</h3>
                      <h4>Inclusive para sports events designed for participants with special abilities.</h4>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Sports Details Section */}
          {showSportsDetails && (
            <section className="inline-sports-details-section">
              <div className="inline-sports-details-container">
                <div className="inline-sports-details-header">
                  <div className="sports-header-left">
                    <button className="sports-back-btn" onClick={() => setShowSportsDetails(false)}>
                      ← Back
                    </button>
                    <h2>SPORTS CATEGORIES</h2>
                  </div>
                  <button className="inline-sports-details-close-btn" onClick={() => setShowSportsDetails(false)}>×</button>
                </div>
                <div className="sports-details-navigation">
                  <button className="sports-nav-btn prev" onClick={prevSportsSlide}>◀</button>
                  <div className="sports-details-grid">
                    {Array.from({ length: Math.min(3, sportsDetailCards.length) }).map((_, index) => {
                      const cardIndex = (currentSportsSlide + index) % sportsDetailCards.length;
                      const card = sportsDetailCards[cardIndex];
                      const isClickable = eventDetailsData[card.title as keyof typeof eventDetailsData] || 
                                         card.title === "Men's Individual &" || 
                                         card.title === "Women's Individual &" || 
                                         card.title === "Men's Team Field Sports" || 
                                         card.title === "Women's Team Field";
                      return (
                        <div 
                          key={cardIndex} 
                          className="sports-detail-card" 
                          onClick={isClickable ? () => handleEventDetailClick(card.title) : undefined}
                          style={isClickable ? { cursor: 'pointer' } : {}}
                        >
                          <div className="sports-card-poster-background">
                            <span className="sports-poster-placeholder-text">SPORTS POSTER</span>
                          </div>
                          <div className="sports-card-title-overlay">
                            <h3>{card.title}</h3>
                            {card.subtitle && <h4>{card.subtitle}</h4>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button className="sports-nav-btn next" onClick={nextSportsSlide}>▶</button>
                </div>
                <div className="sports-carousel-indicators">
                  {sportsDetailCards.map((_, index) => (
                    <button
                      key={index}
                      className={`sports-indicator ${index === currentSportsSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSportsSlide(index)}
                    />
                  ))}
                </div>
                <div className="events-display">
                  <p className="text-white text-center mt-4">Sports Events: {sportsEvents.length} events available</p>
                </div>
              </div>
            </section>
          )}

          {/* Para Sports Section */}
          {showParaSports && (
            <section className="inline-indoor-sports-section">
              <div className="inline-indoor-sports-container">
                <div className="inline-indoor-sports-header">
                  <div className="indoor-sports-header-left">
                    <button className="indoor-sports-back-btn" onClick={() => setShowParaSports(false)}>
                      ← Back
                    </button>
                    <h2>PARA SPORTS CATEGORIES</h2>
                  </div>
                  <button className="inline-indoor-sports-close-btn" onClick={() => setShowParaSports(false)}>×</button>
                </div>
                <div className="para-sports-message text-center mt-8">
                  <p className="text-white text-xl">Para Sports events: {paraSportsEvents.length} events available</p>
                  <p className="text-white mt-4">Para Sports categories will be displayed here.</p>
                </div>
              </div>
            </section>
          )}

          {/* Culturals Section */}
          {showCulturals && (
            <section className="inline-indoor-sports-section">
              <div className="inline-indoor-sports-container">
                <div className="inline-indoor-sports-header">
                  <div className="indoor-sports-header-left">
                    <button className="indoor-sports-back-btn" onClick={() => setShowCulturals(false)}>
                      ← Back
                    </button>
                    <h2>CULTURAL CATEGORIES</h2>
                  </div>
                  <button className="inline-indoor-sports-close-btn" onClick={() => setShowCulturals(false)}>×</button>
                </div>
                <div className="indoor-sports-navigation">
                  <button className="indoor-sports-nav-btn prev" onClick={prevCulturalsSlide}>◀</button>
                  <div className="indoor-sports-grid">
                    {Array.from({ length: Math.min(3, culturalsCards.length) }).map((_, index) => {
                      const cardIndex = (currentCulturalsSlide + index) % culturalsCards.length;
                      const card = culturalsCards[cardIndex];
                      return (
                        <div key={cardIndex} className="indoor-sport-card" style={{ cursor: 'pointer' }}>
                          <div className="indoor-sport-card-poster-background">
                            <span className="indoor-sport-poster-placeholder-text">CULTURAL POSTER</span>
                          </div>
                          <div className="indoor-sport-card-title-overlay">
                            <h3>{card.title}</h3>
                            {card.subtitle && <h4>{card.subtitle}</h4>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button className="indoor-sports-nav-btn next" onClick={nextCulturalsSlide}>▶</button>
                </div>
                <div className="indoor-sports-carousel-indicators">
                  {culturalsCards.map((_, index) => (
                    <button
                      key={index}
                      className={`indoor-sports-indicator ${index === currentCulturalsSlide ? 'active' : ''}`}
                      onClick={() => setCurrentCulturalsSlide(index)}
                    />
                  ))}
                </div>
                <div className="events-display">
                  <p className="text-white text-center mt-4">Cultural Events: {culturalEvents.length} events available</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsInfo;