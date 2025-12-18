import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';
import { getEventsByType, type Event } from './services/api';

const EventsInfo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Main section states
  const [showSportsDetails, setShowSportsDetails] = useState(false);
  const [showParaSports, setShowParaSports] = useState(false);
  const [showCulturals, setShowCulturals] = useState(false);
  const [showIndoorSports, setShowIndoorSports] = useState(false);
  const [showWomensIndoorSports, setShowWomensIndoorSports] = useState(false);
  const [showMensTeamSports, setShowMensTeamSports] = useState(false);
  const [showWomensTeamSports, setShowWomensTeamSports] = useState(false);

  // Carousel states
  const [currentSportsSlide, setCurrentSportsSlide] = useState(2);
  const [currentCulturalsSlide, setCurrentCulturalsSlide] = useState(3);

  // Events data
  const [sportsEvents, setSportsEvents] = useState<Event[]>([]);
  const [culturalEvents, setCulturalEvents] = useState<Event[]>([]);
  const [paraSportsEvents, setParaSportsEvents] = useState<Event[]>([]);

  const sportsDetailCards = [
    { title: "Men's Athletics", subtitle: "Track & Field" },
    { title: "Women's Athletics", subtitle: "Track & Field" },
    { title: "Men's Individual &", subtitle: "Indoor Sports" },
    { title: "Women's Individual &", subtitle: "Indoor Sports" },
    { title: "Men's Team Field Sports", subtitle: "" },
    { title: "Women's Team Field", subtitle: "Sports" }
  ];

  const indoorSportsCards = [
    { title: "Chess", subtitle: "" },
    { title: "Table Tennis", subtitle: "" },
    { title: "Traditional Yogasana", subtitle: "" },
    { title: "Artistic Yogasana", subtitle: "" },
    { title: "Taekwondo", subtitle: "under 8 wt. categories" },
    { title: "Tennikoit", subtitle: "" }
  ];

  const mensTeamSportsCards = [
    { title: "Cricket Championship", subtitle: "(13+2)*" },
    { title: "Volley ball", subtitle: "(6+4)*" },
    { title: "Basket ball", subtitle: "(5+5)*" },
    { title: "Kabaddi", subtitle: "(7+3)*" },
    { title: "Football", subtitle: "(7+3)*" },
    { title: "Kho-Kho", subtitle: "(9+3)*" },
    { title: "Hockey", subtitle: "(7+3)*" }
  ];

  const womensTeamSportsCards = [
    { title: "Volley ball", subtitle: "(6+4)*" },
    { title: "Basket ball", subtitle: "(5+5)*" },
    { title: "Kabaddi", subtitle: "(7+3)*" },
    { title: "Kho-Kho", subtitle: "(9+3)*" },
    { title: "Throw ball", subtitle: "(6+3)*" }
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

  // Handle event detail click with gender context
  const handleEventDetailClick = (eventTitle: string, gender?: string) => {
    console.log('Event clicked:', eventTitle, 'Gender:', gender);
    
    // Check if it's Men's Individual & Indoor Sports
    if (eventTitle === "Men's Individual &") {
      setShowIndoorSports(true);
      return;
    }
    
    // Check if it's Women's Individual & Indoor Sports
    if (eventTitle === "Women's Individual &") {
      setShowWomensIndoorSports(true);
      return;
    }
    
    // Check if it's Men's Team Field Sports
    if (eventTitle === "Men's Team Field Sports") {
      setShowMensTeamSports(true);
      return;
    }
    
    // Check if it's Women's Team Field Sports
    if (eventTitle === "Women's Team Field") {
      setShowWomensTeamSports(true);
      return;
    }
    
    // Map event titles to their detail page names
    const eventNameMapping: { [key: string]: string } = {
      "Men's Athletics": "Men's Athletics",
      "Women's Athletics": "Men's Athletics",
      "Chess Championship": "Chess",
      "Chess Tournament": "Chess",
      "Chess": "Chess",
      "Table Tennis": "Table Tennis",
      "Traditional Yogasana": "Traditional Yogasana",
      "Artistic Yogasana": "Artistic Yogasana",
      "Taekwondo": "Taekwondo",
      "Cricket Championship": "Cricket Championship",
      "Tennikoit": "Tennikoit"
    };
    
    let eventName = eventTitle;
    if (eventNameMapping[eventTitle]) {
      eventName = eventNameMapping[eventTitle];
    } else if (gender) {
      // Add gender prefix for team sports
      eventName = `${eventTitle} (${gender})`;
    }
    
    // Determine which section we're currently in for back navigation
    let fromSection = '';
    if (showIndoorSports) fromSection = 'indoorSports';
    else if (showWomensIndoorSports) fromSection = 'womensIndoorSports';
    else if (showMensTeamSports) fromSection = 'mensTeamSports';
    else if (showWomensTeamSports) fromSection = 'womensTeamSports';
    
    console.log('Navigating to event:', eventName, 'from section:', fromSection);
    navigate(`/event/${encodeURIComponent(eventName)}`, { state: { fromSection } });
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

  // Restore section state when returning from event detail
  useEffect(() => {
    const state = location.state as { fromSection?: string } | null;
    if (state?.fromSection) {
      setShowSportsDetails(true);
      switch (state.fromSection) {
        case 'indoorSports':
          setShowIndoorSports(true);
          break;
        case 'womensIndoorSports':
          setShowWomensIndoorSports(true);
          break;
        case 'mensTeamSports':
          setShowMensTeamSports(true);
          break;
        case 'womensTeamSports':
          setShowWomensTeamSports(true);
          break;
      }
      // Clear the state to prevent issues on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col relative" style={{
      backgroundImage: 'url("/Background-redesign.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Floating Flower - Top Right */}
      <div className="fixed -top-32 -right-32 md:-top-64 md:-right-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-[1]">
        <div className="flower-inner" style={{ animation: 'spin-slow 120s linear infinite', transformOrigin: 'center center' }}>
          <img 
            src={`${import.meta.env.BASE_URL}petals.png`}
            alt="Flower Petals"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={`${import.meta.env.BASE_URL}sun.png`}
              alt="Sun"
              className="absolute w-1/3 h-1/3 object-contain"
              style={{ animation: 'sunRotateClockwise 20s linear infinite' }}
            />
            <img 
              src={`${import.meta.env.BASE_URL}moon.png`}
              alt="Moon"
              className="absolute w-1/3 h-1/3 object-contain"
              style={{ 
                zIndex: 10,
                animation: 'moonStatic 120s linear infinite'
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating Flower - Bottom Left */}
      <div className="fixed -bottom-32 -left-32 md:-bottom-64 md:-left-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-[1]">
        <div className="flower-inner" style={{ animation: 'spin-slow 120s linear infinite', transformOrigin: 'center center' }}>
          <img 
            src={`${import.meta.env.BASE_URL}petals.png`}
            alt="Flower Petals"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={`${import.meta.env.BASE_URL}sun.png`}
              alt="Sun"
              className="absolute w-1/3 h-1/3 object-contain"
              style={{ animation: 'sunRotateClockwise 20s linear infinite' }}
            />
            <img 
              src={`${import.meta.env.BASE_URL}moon.png`}
              alt="Moon"
              className="absolute w-1/3 h-1/3 object-contain"
              style={{ 
                zIndex: 10,
                animation: 'moonStatic 120s linear infinite'
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
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
        `}
      </style>

      {/* Main content - centered both vertically and horizontally */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header Section */}
        <div className="w-full py-6 px-8 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-lg hover:text-pink-300"
          >
            BACK
          </button>
          <h1 className="text-5xl md:text-7xl font-bold text-white" style={{
            fontFamily: 'cursive',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            events
          </h1>
          <div className="w-32"></div>
        </div>

        {/* Main Cards Section */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          {!showSportsDetails && !showParaSports && !showCulturals && !showIndoorSports && !showWomensIndoorSports && !showMensTeamSports && !showWomensTeamSports && (
            <div className="w-full max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-5xl mx-auto">
                <div 
                  className="relative h-96 rounded-3xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={handleCulturalsCardClick}
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(200,180,220,0.5) 100%)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h2 className="text-white text-xl font-bold" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>
                      PERFORMING ARTS,VISUAL<br />ARTS,LITERARY,FASHION
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div 
                    className="relative h-96 rounded-3xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={handleSportsCardClick}
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(200,180,220,0.5) 100%)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                      <h2 className="text-white text-xl font-bold" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>
                        SPORTS AND GAMES
                      </h2>
                    </div>
                  </div>
                  <button 
                    className="bg-pink-300 hover:bg-pink-400 text-purple-900 font-bold py-4 px-8 rounded-full transition-all duration-300 text-lg"
                    onClick={() => window.open('https://saturnalia.in/rulebook', '_blank')}
                  >
                    DOWNLOAD RULEBOOK
                  </button>
                </div>

                <div 
                  className="relative h-96 rounded-3xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(200,180,220,0.5) 100%)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h2 className="text-white text-xl font-bold" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>
                      ROBO WARS & GAMING
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Keep existing sections for when cards are clicked */}
          {showSportsDetails && !showIndoorSports && !showWomensIndoorSports && !showMensTeamSports && !showWomensTeamSports && (
            <section className="inline-sports-details-section">
              <div className="inline-sports-details-container">
                <div className="mb-6">
                  <img 
                    src={`${import.meta.env.BASE_URL}image.png`}
                    alt="Vignan Mahotsav" 
                    className="h-16 md:h-20 object-contain"
                  />
                </div>
                <div className="sports-grid-container" style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  padding: '20px',
                  maxWidth: '1200px',
                  margin: '0 auto',
                  justifyContent: 'center'
                }}>
                  {sportsDetailCards.map((card, index) => {
                    const isClickable = eventDetailsData[card.title as keyof typeof eventDetailsData] || 
                                       card.title === "Men's Individual &" || 
                                       card.title === "Women's Individual &" || 
                                       card.title === "Men's Team Field Sports" || 
                                       card.title === "Women's Team Field";
                    
                    return (
                      <div 
                        key={index} 
                        className="sports-detail-card"
                        onClick={isClickable ? () => handleEventDetailClick(card.title) : undefined}
                        style={{
                          cursor: isClickable ? 'pointer' : 'default',
                          width: 'calc(20% - 16px)',
                          minWidth: '220px',
                          height: '300px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          position: 'relative',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (isClickable) {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
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
                <div className="events-display">
                  <p className="text-white text-center mt-4">Sports Events: {sportsEvents.length} events available</p>
                </div>
              </div>
            </section>
          )}

          {/* Indoor Sports Section */}
          {showIndoorSports && (
            <section className="inline-sports-details-section">
              <div className="inline-sports-details-container">
                <div className="mb-4">
                  <img 
                    src={`${import.meta.env.BASE_URL}image.png`}
                    alt="Vignan Mahotsav" 
                    className="h-16 md:h-20 object-contain"
                  />
                </div>
                <div className="inline-indoor-sports-header">
                  <div className="indoor-sports-header-left">
                    <button className="indoor-sports-back-btn" onClick={() => setShowIndoorSports(false)}>
                      ← Back
                    </button>
                  </div>
                </div>
                <div className="inline-events-info-header">
                  <div className="events-header-left">
                    <h2>MEN'S INDIVIDUAL & INDOOR SPORTS</h2>
                  </div>
                </div>
                <div className="sports-grid-container" style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  padding: '20px',
                  maxWidth: '1200px',
                  margin: '0 auto',
                  justifyContent: 'center'
                }}>
                  {indoorSportsCards.map((card, index) => (
                    <div 
                      key={index} 
                      className="sports-detail-card"
                      onClick={() => handleEventDetailClick(card.title)}
                      style={{
                        cursor: 'pointer',
                        width: 'calc(25% - 15px)',
                        minWidth: '250px',
                        height: '300px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className="sports-card-poster-background">
                        <span className="sports-poster-placeholder-text">SPORTS POSTER</span>
                      </div>
                      <div className="sports-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && <h4>{card.subtitle}</h4>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Women's Indoor Sports Section */}
          {showWomensIndoorSports && (
            <section className="inline-sports-details-section">
              <div className="inline-sports-details-container">
                <div className="mb-4">
                  <img 
                    src={`${import.meta.env.BASE_URL}image.png`}
                    alt="Vignan Mahotsav" 
                    className="h-16 md:h-20 object-contain"
                  />
                </div>
                <div className="inline-indoor-sports-header">
                  <div className="indoor-sports-header-left">
                    <button className="indoor-sports-back-btn" onClick={() => setShowWomensIndoorSports(false)}>
                      ← Back
                    </button>
                  </div>
                </div>
                <div className="inline-events-info-header">
                  <div className="events-header-left">
                    <h2>WOMEN'S INDIVIDUAL & INDOOR SPORTS</h2>
                  </div>
                </div>
                <div className="sports-grid-container" style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  padding: '20px',
                  maxWidth: '1200px',
                  margin: '0 auto',
                  justifyContent: 'center'
                }}>
                  {indoorSportsCards.map((card, index) => (
                    <div 
                      key={index} 
                      className="sports-detail-card"
                      onClick={() => handleEventDetailClick(card.title)}
                      style={{
                        cursor: 'pointer',
                        width: 'calc(25% - 15px)',
                        minWidth: '250px',
                        height: '300px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className="sports-card-poster-background">
                        <span className="sports-poster-placeholder-text">SPORTS POSTER</span>
                      </div>
                      <div className="sports-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && <h4>{card.subtitle}</h4>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Men's Team Field Sports Section */}
          {showMensTeamSports && (
            <section className="inline-sports-details-section">
              <div className="inline-sports-details-container">
                <div className="mb-4">
                  <img 
                    src={`${import.meta.env.BASE_URL}image.png`}
                    alt="Vignan Mahotsav" 
                    className="h-16 md:h-20 object-contain"
                  />
                </div>
                <div className="inline-indoor-sports-header">
                  <div className="indoor-sports-header-left">
                    <button className="indoor-sports-back-btn" onClick={() => setShowMensTeamSports(false)}>
                      ← Back
                    </button>
                  </div>
                </div>
                <div className="inline-events-info-header">
                  <div className="events-header-left">
                    <h2>MEN'S TEAM FIELD SPORTS</h2>
                  </div>
                </div>
                <div className="sports-grid-container" style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  padding: '20px',
                  maxWidth: '1200px',
                  margin: '0 auto',
                  justifyContent: 'center'
                }}>
                  {mensTeamSportsCards.map((card, index) => (
                    <div 
                      key={index} 
                      className="sports-detail-card"
                      onClick={() => handleEventDetailClick(card.title, 'Men')}
                      style={{
                        cursor: 'pointer',
                        width: 'calc(25% - 15px)',
                        minWidth: '250px',
                        height: '300px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className="sports-card-poster-background">
                        <span className="sports-poster-placeholder-text">SPORTS POSTER</span>
                      </div>
                      <div className="sports-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && <h4>{card.subtitle}</h4>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Women's Team Field Sports Section */}
          {showWomensTeamSports && (
            <section className="inline-sports-details-section">
              <div className="inline-sports-details-container">
                <div className="mb-4">
                  <img 
                    src={`${import.meta.env.BASE_URL}image.png`}
                    alt="Vignan Mahotsav" 
                    className="h-16 md:h-20 object-contain"
                  />
                </div>
                <div className="inline-indoor-sports-header">
                  <div className="indoor-sports-header-left">
                    <button className="indoor-sports-back-btn" onClick={() => setShowWomensTeamSports(false)}>
                      ← Back
                    </button>
                  </div>
                </div>
                <div className="inline-events-info-header">
                  <div className="events-header-left">
                    <h2>WOMEN'S TEAM FIELD SPORTS</h2>
                  </div>
                </div>
                <div className="sports-grid-container" style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  padding: '20px',
                  maxWidth: '1200px',
                  margin: '0 auto',
                  justifyContent: 'center'
                }}>
                  {womensTeamSportsCards.map((card, index) => (
                    <div 
                      key={index} 
                      className="sports-detail-card"
                      onClick={() => handleEventDetailClick(card.title, 'Women')}
                      style={{
                        cursor: 'pointer',
                        width: 'calc(25% - 15px)',
                        minWidth: '250px',
                        height: '300px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className="sports-card-poster-background">
                        <span className="sports-poster-placeholder-text">SPORTS POSTER</span>
                      </div>
                      <div className="sports-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && <h4>{card.subtitle}</h4>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Para Sports Section */}
          {showParaSports && (
            <section className="inline-indoor-sports-section">
              <div className="inline-indoor-sports-container">
                <div className="mb-4">
                  <img 
                    src={`${import.meta.env.BASE_URL}image.png`}
                    alt="Vignan Mahotsav" 
                    className="h-16 md:h-20 object-contain"
                  />
                </div>
                <div className="inline-indoor-sports-header">
                  <div className="indoor-sports-header-left">
                    <button className="indoor-sports-back-btn" onClick={() => setShowParaSports(false)}>
                      ← Back
                    </button>
                    <h2>PARA SPORTS CATEGORIES</h2>
                  </div>
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
                <div className="mb-4">
                  <img 
                    src={`${import.meta.env.BASE_URL}image.png`}
                    alt="Vignan Mahotsav" 
                    className="h-16 md:h-20 object-contain"
                  />
                </div>
                <div className="inline-indoor-sports-header">
                  <div className="indoor-sports-header-left">
                    <button className="indoor-sports-back-btn" onClick={() => setShowCulturals(false)}>
                      ← Back
                    </button>
                  </div>
                </div>
                <div className="culturals-navigation">
                  <button className="culturals-nav-btn prev" onClick={prevCulturalsSlide}>◀</button>
                  <div className="culturals-carousel-3d-container">
                    <div className="culturals-carousel-3d-wrapper">
                      {culturalsCards.map((card, index) => {
                        const isActive = index === currentCulturalsSlide;
                        const totalCards = culturalsCards.length;
                        
                        // Calculate offset with wrapping for infinite loop
                        let offset = index - currentCulturalsSlide;
                        
                        // Normalize offset to wrap around (e.g., -5 becomes +2 in a 7-card carousel)
                        if (offset > totalCards / 2) {
                          offset -= totalCards;
                        } else if (offset < -totalCards / 2) {
                          offset += totalCards;
                        }
                        
                        let transform = '';
                        let zIndex = 0;
                        let opacity = 0;
                        let filter = 'grayscale(100%) brightness(0.5)';
                        
                        // Only show 5 cards: center + 2 on each side
                        if (Math.abs(offset) > 2) {
                          // Hide cards that are more than 2 positions away
                          opacity = 0;
                          transform = `translateX(0) translateY(0) translateZ(-500px) scale(0)`;
                        } else if (offset === 0) {
                          // Center card - prominent and forward
                          transform = `translateX(0) translateY(0) translateZ(100px) rotateY(0deg) scale(1.1)`;
                          zIndex = 10;
                          opacity = 1;
                          filter = 'brightness(1) saturate(1.2)';
                        } else {
                          // Side cards (offset -2, -1, 1, 2)
                          const direction = offset > 0 ? 1 : -1;
                          const absOffset = Math.abs(offset);
                          const x = direction * (190 + (absOffset - 1) * 85); // Tighter horizontal spacing
                          const z = -30 - (absOffset - 1) * 25; // Less depth
                          const rotY = direction * 10 * absOffset; // Slight rotation
                          const scale = 1 - absOffset * 0.08; // Minimal size decrease
                          
                          transform = `translateX(${x}px) translateY(0) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`;
                          zIndex = 10 - absOffset;
                          opacity = 1 - absOffset * 0.15;
                          
                          const brightness = 1 - absOffset * 0.12;
                          const saturate = 1 - absOffset * 0.15;
                          filter = `brightness(${brightness}) saturate(${saturate})`;
                        }
                        
                        return (
                          <div 
                            key={index} 
                            className={`cultural-card-3d ${isActive ? 'active' : ''}`}
                            onClick={!isActive ? () => setCurrentCulturalsSlide(index) : undefined}
                            style={{
                              transform,
                              zIndex,
                              opacity,
                              filter,
                              cursor: 'pointer',
                              position: 'absolute',
                              left: '50%',
                              top: '50%',
                              marginLeft: '-150px',
                              marginTop: '-225px'
                            }}
                          >
                            <div className="cultural-card-poster-background">
                              <span className="cultural-poster-placeholder-text">CULTURAL POSTER</span>
                            </div>
                            <div className="cultural-card-title-overlay">
                              <h3>{card.title}</h3>
                              {card.subtitle && <h4>{card.subtitle}</h4>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <button className="culturals-nav-btn next" onClick={nextCulturalsSlide}>▶</button>
                </div>
                <div className="culturals-carousel-indicators">
                  {culturalsCards.map((_, index) => (
                    <button
                      key={index}
                      className={`culturals-indicator ${index === currentCulturalsSlide ? 'active' : ''}`}
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