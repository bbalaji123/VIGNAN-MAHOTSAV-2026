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
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{
      backgroundImage: 'url("/Background-redesign.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Floating Flower - Top Right (clipped naturally) */}
      <div className="fixed pointer-events-none z-[1] flower-top-right">
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

      {/* Floating Flower - Bottom Left (clipped naturally) */}
      <div className="fixed pointer-events-none z-[1] flower-bottom-left">
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
          /* Flower positioning - Desktop */
          .flower-top-right {
            top: -15%;
            right: -8%;
            width: 450px;
            height: 450px;
            opacity: 0.3;
          }
          
          .flower-bottom-left {
            bottom: -15%;
            left: -8%;
            width: 450px;
            height: 450px;
            opacity: 0.3;
          }
          
          /* Responsive flower positioning */
          @media (max-width: 768px) {
            .flower-top-right,
            .flower-bottom-left {
              width: 350px !important;
              height: 350px !important;
              opacity: 0.25 !important;
            }
            
            .flower-top-right {
              top: -10% !important;
              right: -10% !important;
            }
            
            .flower-bottom-left {
              bottom: -10% !important;
              left: -10% !important;
            }
          }
          
          @media (max-width: 480px) {
            .flower-top-right,
            .flower-bottom-left {
              width: 250px !important;
              height: 250px !important;
              opacity: 0.2 !important;
            }
            
            .flower-top-right {
              top: -8% !important;
              right: -12% !important;
            }
            
            .flower-bottom-left {
              bottom: -8% !important;
              left: -12% !important;
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
          
          /* Responsive adjustments for mobile */
          @media (max-width: 768px) {
            .events-header-title {
              font-size: 3rem !important;
            }
            
            .events-cards-container > div {
              width: 280px !important;
              height: 320px !important;
            }
          }
          
          @media (max-width: 480px) {
            .events-header-title {
              font-size: 2.5rem !important;
            }
            
            .events-cards-container > div {
              width: 260px !important;
              height: 300px !important;
            }
          }
        `}
      </style>

      {/* Main content - centered both vertically and horizontally */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Logo and heading row */}
        <div className="w-full pt-8 pb-4 px-8 relative z-20 flex items-center gap-69">
          <img 
            src={`${import.meta.env.BASE_URL}image.png`}
            alt="Vignan Mahotsav" 
            className="h-16 md:h-20 object-contain"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-white" style={{
            fontFamily: 'Bradley Hand, cursive',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            {showIndoorSports ? 'Indoor Sports' : 
             showWomensIndoorSports ? "Women's Indoor Sports" : 
             showMensTeamSports ? "Men's Team Field Sports" : 
             showWomensTeamSports ? "Women's Team Field Sports" :
             showSportsDetails ? 'sports and games' : 
             showCulturals ? 'performing arts, visual arts, literary, fashion' :
             'EVENTS'}
          </h1>
        </div>

        {/* Back button - on left */}
        <div className="w-full px-8 pb-4 relative z-20">
          <button 
            onClick={() => {
              if (showSportsDetails || showCulturals || showParaSports) {
                setShowSportsDetails(false);
                setShowCulturals(false);
                setShowParaSports(false);
              } else {
                navigate('/');
              }
            }}
            className="bg-pink-300 hover:bg-pink-400 text-purple-900 font-bold py-3 px-10 rounded-full transition-all duration-300 text-base shadow-lg"
          >
            BACK
          </button>
        </div>

        {/* Main Cards Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-8" style={{ position: 'relative', zIndex: 10 }}>
          {!showSportsDetails && !showParaSports && !showCulturals && !showIndoorSports && !showWomensIndoorSports && !showMensTeamSports && !showWomensTeamSports && (
            <div className="w-full max-w-7xl mx-auto">
              {/* Three Cards - exact spacing from reference */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-10">
                {/* Card 1 - Performing Arts */}
                <div 
                  className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={handleCulturalsCardClick}
                  style={{
                    background: 'rgba(180, 150, 200, 0.35)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    height: '350px',
                    width: '300px',
                    maxWidth: '100%'
                  }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h2 className="text-white text-sm font-bold tracking-wide" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>
                      PERFORMING ARTS,VISUAL<br />ARTS,LITERARY,FASHION
                    </h2>
                  </div>
                </div>

                {/* Card 2 - Sports and Games */}
                <div 
                  className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={handleSportsCardClick}
                  style={{
                    background: 'rgba(180, 150, 200, 0.35)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    height: '350px',
                    width: '300px',
                    maxWidth: '100%'
                  }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h2 className="text-white text-sm font-bold tracking-wide" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>
                      SPORTS AND GAMES
                    </h2>
                  </div>
                  {/* Download Rulebook button - positioned under this card */}
                  <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '370px' }}>
                    <button 
                      className="bg-pink-300 hover:bg-pink-400 text-purple-900 font-bold py-3 px-10 rounded-full transition-all duration-300 text-sm shadow-lg whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open('https://saturnalia.in/rulebook', '_blank');
                      }}
                    >
                      DOWNLOAD RULEBOOK
                    </button>
                  </div>
                </div>

                {/* Card 3 - Robo Wars & Gaming */}
                <div 
                  className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(180, 150, 200, 0.35)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    height: '350px',
                    width: '300px',
                    maxWidth: '100%'
                  }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h2 className="text-white text-sm font-bold tracking-wide" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>
                      ROBO WARS & GAMING
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Keep existing sections for when cards are clicked */}
          {showSportsDetails && !showIndoorSports && !showWomensIndoorSports && !showMensTeamSports && !showWomensTeamSports && (
            <div className="w-full h-full flex flex-col relative z-20">
              {/* Cards Grid - centered */}
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {sportsDetailCards.map((card, index) => {
                      const isClickable = eventDetailsData[card.title as keyof typeof eventDetailsData] || 
                                         card.title === "Men's Individual &" || 
                                         card.title === "Women's Individual &" || 
                                         card.title === "Men's Team Field Sports" || 
                                         card.title === "Women's Team Field";
                      
                      return (
                        <div 
                          key={index} 
                          className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                          onClick={isClickable ? () => handleEventDetailClick(card.title) : undefined}
                          style={{
                            background: 'rgba(180, 150, 200, 0.35)',
                            backdropFilter: 'blur(15px)',
                            WebkitBackdropFilter: 'blur(15px)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                            height: '280px',
                            width: '100%',
                            maxWidth: '280px'
                          }}
                        >
                          <div className="absolute bottom-0 left-0 right-0 p-5 text-center bg-gradient-to-t from-black/60 to-transparent">
                            <h2 className="text-yellow-300 text-sm font-bold tracking-wide uppercase" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'}}>
                              {card.title}
                            </h2>
                            {card.subtitle && (
                              <p className="text-white text-xs mt-1" style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)'}}>
                                {card.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Indoor Sports Section */}
          {showIndoorSports && (
            <div className="w-full h-full flex flex-col relative z-20">
              {/* Cards Grid - centered */}
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {indoorSportsCards.map((card, index) => (
                      <div 
                        key={index} 
                        className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                        onClick={() => handleEventDetailClick(card.title)}
                        style={{
                          background: 'rgba(180, 150, 200, 0.35)',
                          backdropFilter: 'blur(15px)',
                          WebkitBackdropFilter: 'blur(15px)',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                          height: '280px',
                          width: '100%',
                          maxWidth: '280px'
                        }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 p-5 text-center bg-gradient-to-t from-black/60 to-transparent">
                          <h2 className="text-yellow-300 text-sm font-bold tracking-wide uppercase" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'}}>
                            {card.title}
                          </h2>
                          {card.subtitle && (
                            <p className="text-white text-xs mt-1" style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)'}}>
                              {card.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Women's Indoor Sports Section */}
          {showWomensIndoorSports && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {indoorSportsCards.map((card, index) => (
                      <div 
                        key={index} 
                        className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                        onClick={() => handleEventDetailClick(card.title)}
                        style={{
                          background: 'rgba(180, 150, 200, 0.35)',
                          backdropFilter: 'blur(15px)',
                          WebkitBackdropFilter: 'blur(15px)',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                          height: '280px',
                          width: '100%',
                          maxWidth: '280px'
                        }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 p-5 text-center bg-gradient-to-t from-black/60 to-transparent">
                          <h2 className="text-yellow-300 text-sm font-bold tracking-wide uppercase" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'}}>
                            {card.title}
                          </h2>
                          {card.subtitle && (
                            <p className="text-white text-xs mt-1" style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)'}}>
                              {card.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Men's Team Field Sports Section */}
          {showMensTeamSports && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {mensTeamSportsCards.map((card, index) => (
                      <div 
                        key={index} 
                        className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                        onClick={() => handleEventDetailClick(card.title, 'Men')}
                        style={{
                          background: 'rgba(180, 150, 200, 0.35)',
                          backdropFilter: 'blur(15px)',
                          WebkitBackdropFilter: 'blur(15px)',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                          height: '280px',
                          width: '100%',
                          maxWidth: '280px'
                        }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 p-5 text-center bg-gradient-to-t from-black/60 to-transparent">
                          <h2 className="text-yellow-300 text-sm font-bold tracking-wide uppercase" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'}}>
                            {card.title}
                          </h2>
                          {card.subtitle && (
                            <p className="text-white text-xs mt-1" style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)'}}>
                              {card.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Women's Team Field Sports Section */}
          {showWomensTeamSports && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {womensTeamSportsCards.map((card, index) => (
                      <div 
                        key={index} 
                        className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                        onClick={() => handleEventDetailClick(card.title, 'Women')}
                        style={{
                          background: 'rgba(180, 150, 200, 0.35)',
                          backdropFilter: 'blur(15px)',
                          WebkitBackdropFilter: 'blur(15px)',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                          height: '280px',
                          width: '100%',
                          maxWidth: '280px'
                        }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 p-5 text-center bg-gradient-to-t from-black/60 to-transparent">
                          <h2 className="text-yellow-300 text-sm font-bold tracking-wide uppercase" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'}}>
                            {card.title}
                          </h2>
                          {card.subtitle && (
                            <p className="text-white text-xs mt-1" style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)'}}>
                              {card.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
            <div className="w-full h-full flex flex-col relative z-20">
              {/* Cards Grid - centered */}
              <div className="flex-1 flex items-center justify-center px-4 md:px-8 pb-12">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {culturalsCards.map((card, index) => {
                      return (
                        <div 
                          key={index} 
                          className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                          style={{
                            background: 'rgba(180, 150, 200, 0.35)',
                            backdropFilter: 'blur(15px)',
                            WebkitBackdropFilter: 'blur(15px)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                            height: '280px',
                            width: '100%',
                            maxWidth: '280px'
                          }}
                        >
                          <div className="absolute bottom-0 left-0 right-0 p-5 text-center bg-gradient-to-t from-black/60 to-transparent">
                            <h2 className="text-white text-sm font-bold tracking-wide uppercase" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'}}>
                              {card.title}
                            </h2>
                            {card.subtitle && (
                              <p className="text-white text-xs mt-1" style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)'}}>
                                {card.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsInfo;