import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';
import { getEventsByType, type Event } from './services/api';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';

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
  const [showDance, setShowDance] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showTheatre, setShowTheatre] = useState(false);
  const [showLiterature, setShowLiterature] = useState(false);
  const [showVisualArts, setShowVisualArts] = useState(false);
  const [showFashionDesign, setShowFashionDesign] = useState(false);
  const [showDigitalStorytelling, setShowDigitalStorytelling] = useState(false);
  const [showGaming, setShowGaming] = useState(false);
  const [showRoboGames, setShowRoboGames] = useState(false);
  const [showSpotLight, setShowSpotLight] = useState(false);

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
    { title: "Spot Light", subtitle: "Special Events" },
    { title: "Digital Storytelling & Creative Media", subtitle: "" },
    { title: "Gaming", subtitle: "" },
    { title: "Robo Games", subtitle: "" }
  ];

  const danceCards = [
    { title: "Classical Dance Solo", subtitle: "" },
    { title: "Dancing Star – Western Solo", subtitle: "" },
    { title: "Dancing Jodi – Western Duo", subtitle: "" },
    { title: "Spot Dance - Jodi", subtitle: "" },
    { title: "Group Dance (10 no.)", subtitle: "" }
  ];

  const musicCards = [
    { title: "Singing Idol", subtitle: "" },
    { title: "Group Singing (6 no.)", subtitle: "" },
    { title: "Singing Jodi", subtitle: "" },
    { title: "Classical/Light Vocal Solo", subtitle: "" },
    { title: "Western Vocal Solo", subtitle: "" },
    { title: "Anthyakshari Duo", subtitle: "" },
    { title: "Instrumental Solo", subtitle: "" }
  ];

  const theatreCards = [
    { title: "Skit (8 no.)", subtitle: "" },
    { title: "Mime (6 no.)", subtitle: "" },
    { title: "Dialogue Dhamakha", subtitle: "" },
    { title: "Mono Action", subtitle: "" },
    { title: "On the Spot Ad making", subtitle: "" }
  ];

  const literatureCards = [
    { title: "Master Orator", subtitle: "" },
    { title: "Spot Creative writing", subtitle: "" },
    { title: "Telugu Vyaasa rachana", subtitle: "" },
    { title: "Shayari – Hindi", subtitle: "" },
    { title: "Impromptu (JAM)", subtitle: "" },
    { title: "Story telling", subtitle: "" },
    { title: "Quiz wiz (3 no.)", subtitle: "" },
    { title: "Word Master", subtitle: "" },
    { title: "Dumb charades (2 no.)", subtitle: "" }
  ];

  const visualArtsCards = [
    { title: "Theme Painting", subtitle: "" },
    { title: "Clay modelling", subtitle: "" },
    { title: "Rangoli (2 no.)", subtitle: "" },
    { title: "Mehandi", subtitle: "" },
    { title: "Collage", subtitle: "" },
    { title: "Face Painting", subtitle: "" },
    { title: "Pencil Sketching", subtitle: "" },
    { title: "Mandala", subtitle: "" }
  ];

  const fashionDesignCards = [
    { title: "Haute Couture - Theme Ramp walk (12 no.)", subtitle: "" },
    { title: "Craft villa ( Accessory design)", subtitle: "" },
    { title: "Texart (Fashion sketching)", subtitle: "" },
    { title: "T-Shirt designing", subtitle: "" }
  ];

  const digitalStorytellingCards = [
    { title: "Short film", subtitle: "" },
    { title: "Theme Photography (Online)", subtitle: "" },
    { title: "Digital Poster making", subtitle: "" },
    { title: "Mahotsav Digital Chronicle", subtitle: "" },
    { title: "Reel Making", subtitle: "" }
  ];

  const gamingCards = [
    { title: "Valorant (PC)", subtitle: "" },
    { title: "E- Football (PC)", subtitle: "" },
    { title: "Counter Strike (PC)", subtitle: "" },
    { title: "Smash Karts (PC)", subtitle: "" }
  ];

  const roboGamesCards = [
    { title: "Line follower robot", subtitle: "" },
    { title: "Bot Wrestling", subtitle: "" },
    { title: "Robo races", subtitle: "" }
  ];

  const spotLightCards = [
    { title: "Mr. Mahotsav", subtitle: "" },
    { title: "Ms. Mahotsav", subtitle: "" },
    { title: "Mahotsav Got Talent", subtitle: "" }
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
      // Sports events
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
      "Tennikoit": "Tennikoit",
      
      // Cultural events - Dance
      "Classical Dance Solo": "Classical Dance Solo",
      "Dancing Star – Western Solo": "Dancing Star - Western Solo",
      "Dancing Jodi – Western Duo": "Dancing Jodi - Western Duo",
      "Spot Dance - Jodi": "Spot Dance - Jodi",
      "Group Dance (10 no.)": "Group Dance",
      
      // Cultural events - Music
      "Singing Idol": "Singing Idol",
      "Group Singing (6 no.)": "Group Singing",
      "Singing Jodi": "Singing Jodi",
      "Classical/Light Vocal Solo": "Classical Light Vocal Solo",
      "Western Vocal Solo": "Western Vocal Solo",
      "Instrumental Solo": "Instrumental Solo",
      "Anthyakshari": "Anthyakshari",
      
      // Cultural events - Theatre
      "Skit": "Skit",
      "Mime": "Mime",
      "Short Film Making": "Short Film Making",
      "Mono Action": "Mono Action",
      "Spot Ad Making": "Spot Ad Making",
      
      // Cultural events - Literature
      "Shayari (Hindi)": "Shayari - Hindi",
      "On Spot Creative Content Writing": "On Spot Creative Content Writing",
      "Telugu Vyasa Rachana": "Telugu Vyaasa Rachana",
      "JAM": "JAM",
      "Dumb Charades": "Dumb Charades",
      "Quiz": "Quiz",
      "Word Master": "Word Master",
      "Master Orator": "Master Orator",
      "Dialogue Dhamaka (HINDI)": "Dialogue Dhamaka",
      
      // Cultural events - Visual Arts
      "Rangoli": "Rangoli",
      "Clay Modelling": "Clay Modelling",
      "Collage": "Collage",
      "Mandala Art": "Mandala Art",
      "Face Painting": "Face Painting",
      "Pencil Sketching": "Pencil Sketching",
      "Theme Painting": "Theme Painting",
      "Texart": "Texart",
      "Craftvilla": "Craftvilla",
      
      // Cultural events - Fashion Design
      "Haute Couture": "Haute Couture",
      "T-Shirt Designing": "T-Shirt Designing",
      "Mehandi": "Mehandi",
      
      // Cultural events - Spot Light
      "Mahotsav Got Talent": "Mahotsav Got Talent",
      "Mr. and Ms. Mahotsav": "Mr. and Ms. Mahotsav",
      
      // Cultural events - Digital Storytelling
      "Online Photography": "Online Photography"
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
    else if (showDance) fromSection = 'dance';
    else if (showMusic) fromSection = 'music';
    else if (showTheatre) fromSection = 'theatre';
    else if (showLiterature) fromSection = 'literature';
    else if (showVisualArts) fromSection = 'visualArts';
    else if (showFashionDesign) fromSection = 'fashionDesign';
    else if (showDigitalStorytelling) fromSection = 'digitalStorytelling';
    else if (showGaming) fromSection = 'gaming';
    else if (showRoboGames) fromSection = 'roboGames';
    else if (showSpotLight) fromSection = 'spotLight';
    else if (showParaSports) fromSection = 'paraSports';
    
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
    const state = location.state as { openSection?: string } | null;
    if (state?.openSection) {
      const section = state.openSection;
      
      // Handle sports sections
      if (['indoorSports', 'womensIndoorSports', 'mensTeamSports', 'womensTeamSports'].includes(section)) {
        setShowSportsDetails(true);
        
        switch (section) {
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
      }
      // Handle cultural sections
      else if (['dance', 'music', 'theatre', 'literature', 'visualArts', 'fashionDesign', 'digitalStorytelling', 'gaming', 'roboGames', 'spotLight'].includes(section)) {
        setShowCulturals(true);
        
        switch (section) {
          case 'dance':
            setShowDance(true);
            break;
          case 'music':
            setShowMusic(true);
            break;
          case 'theatre':
            setShowTheatre(true);
            break;
          case 'literature':
            setShowLiterature(true);
            break;
          case 'visualArts':
            setShowVisualArts(true);
            break;
          case 'fashionDesign':
            setShowFashionDesign(true);
            break;
          case 'digitalStorytelling':
            setShowDigitalStorytelling(true);
            break;
          case 'gaming':
            setShowGaming(true);
            break;
          case 'roboGames':
            setShowRoboGames(true);
            break;
          case 'spotLight':
            setShowSpotLight(true);
            break;
        }
      }
      // Handle para sports section
      else if (section === 'paraSports') {
        setShowParaSports(true);
      }
      
      // Clear the state to prevent issues on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden events-info-page" style={{
      backgroundImage: 'url("/Background-redesign.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Floating Flower - Top Right (clipped naturally) */}
      <div className="fixed pointer-events-none z-[1] flower-top-right">
        <FlowerComponent 
          size="100%"
          sunSize="50%"
          moonSize="43%"
          sunTop="25%"
          sunLeft="25%"
          moonTop="28.5%"
          moonLeft="28.5%"
          showPetalRotation={true}
        />
      </div>

      {/* Floating Flower - Bottom Left (clipped naturally) */}
      <div className="fixed pointer-events-none z-[1] flower-bottom-left">
        <FlowerComponent 
          size="100%"
          sunSize="50%"
          moonSize="43%"
          sunTop="25%"
          sunLeft="25%"
          moonTop="28.5%"
          moonLeft="28.5%"
          showPetalRotation={true}
        />
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
        <div className="w-full pb-4 px-8 relative z-20 flex items-center gap-69" style={{paddingTop: "32px"}}>
          <img 
            src={`${import.meta.env.BASE_URL}image.png`}
            alt="Vignan Mahotsav" 
            className="h-16 md:h-20 object-contain"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-white events-page-heading" style={{
            fontFamily: 'Woodtrap, sans-serif',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            {showIndoorSports ? 'Indoor Sports' : 
             showWomensIndoorSports ? "Women's Indoor Sports" : 
             showMensTeamSports ? "Men's Team Field Sports" : 
             showWomensTeamSports ? "Women's Team Field Sports" :
             showDance ? 'Dance' :
             showMusic ? 'Music' :
             showTheatre ? 'Theatre' :
             showLiterature ? 'Literature' :
             showVisualArts ? 'Visual Arts' :
             showFashionDesign ? 'Fashion Design' :
             showDigitalStorytelling ? 'Digital Storytelling & Creative Media' :
             showGaming ? 'Gaming' :
             showRoboGames ? 'Robo Games' :
             showSpotLight ? 'Spot Light' :
             showSportsDetails ? 'sports and games' : 
             showCulturals ? 'culturals' :
             'EVENTS'}
          </h1>
        </div>

        {/* Back button - on left */}
        <div className="w-full px-8 pb-4 relative z-20" style={{paddingTop: "6px"}}>
          <BackButton onClick={() => {
            if (showDance || showMusic || showTheatre || showLiterature || showVisualArts || showFashionDesign || showDigitalStorytelling || showGaming || showRoboGames || showSpotLight) {
              setShowDance(false);
              setShowMusic(false);
              setShowTheatre(false);
              setShowLiterature(false);
              setShowVisualArts(false);
              setShowFashionDesign(false);
              setShowDigitalStorytelling(false);
              setShowGaming(false);
              setShowRoboGames(false);
              setShowSpotLight(false);
            } else if (showIndoorSports || showWomensIndoorSports || showMensTeamSports || showWomensTeamSports) {
              setShowIndoorSports(false);
              setShowWomensIndoorSports(false);
              setShowMensTeamSports(false);
              setShowWomensTeamSports(false);
            } else if (showSportsDetails || showCulturals || showParaSports) {
              setShowSportsDetails(false);
              setShowCulturals(false);
              setShowParaSports(false);
            } else {
              navigate('/');
            }
          }} />
        </div>

        {/* Main Cards Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-8" style={{ position: 'relative', zIndex: 10 }}>
          {!showSportsDetails && !showParaSports && !showCulturals && !showIndoorSports && !showWomensIndoorSports && !showMensTeamSports && !showWomensTeamSports && !showDance && !showMusic && !showTheatre && !showLiterature && !showVisualArts && !showFashionDesign && !showDigitalStorytelling && !showGaming && !showRoboGames && !showSpotLight && (
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
                    <h2 className="text-white text-sm font-bold tracking-wide" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', fontFamily: 'BackToSchool, sans-serif'}}>
                      CULTURALS
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
                    <h2 className="text-white text-sm font-bold tracking-wide" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', fontFamily: 'BackToSchool, sans-serif'}}>
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
                    <h2 className="text-white text-sm font-bold tracking-wide" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', fontFamily: 'BackToSchool, sans-serif'}}>
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
          {showCulturals && !showDance && !showMusic && !showTheatre && !showLiterature && !showVisualArts && !showFashionDesign && !showDigitalStorytelling && !showGaming && !showRoboGames && !showSpotLight && (
            <div className="w-full h-full flex flex-col relative z-20">
              {/* Cards Grid - centered */}
              <div className="flex-1 flex items-center justify-center px-4 md:px-8 pb-12">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {culturalsCards.map((card, index) => {
                      const handleCardClick = () => {
                        if (card.title === "Dance") {
                          setShowDance(true);
                        } else if (card.title === "Music") {
                          setShowMusic(true);
                        } else if (card.title === "Theatre") {
                          setShowTheatre(true);
                        } else if (card.title === "Literature") {
                          setShowLiterature(true);
                        } else if (card.title === "Visual Arts") {
                          setShowVisualArts(true);
                        } else if (card.title === "Fashion Design") {
                          setShowFashionDesign(true);
                        } else if (card.title === "Digital Storytelling & Creative Media") {
                          setShowDigitalStorytelling(true);
                        } else if (card.title === "Gaming") {
                          setShowGaming(true);
                        } else if (card.title === "Robo Games") {
                          setShowRoboGames(true);
                        } else if (card.title === "Spot Light") {
                          setShowSpotLight(true);
                        }
                      };
                      return (
                        <div 
                          key={index} 
                          className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                          onClick={handleCardClick}
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

          {/* Dance Section */}
          {showDance && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {danceCards.map((card, index) => (
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

          {/* Music Section */}
          {showMusic && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {musicCards.map((card, index) => (
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

          {/* Theatre Section */}
          {showTheatre && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {theatreCards.map((card, index) => (
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

          {/* Literature Section */}
          {showLiterature && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {literatureCards.map((card, index) => (
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

          {/* Visual Arts Section */}
          {showVisualArts && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {visualArtsCards.map((card, index) => (
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

          {/* Fashion Design Section */}
          {showFashionDesign && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {fashionDesignCards.map((card, index) => (
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

          {/* Digital Storytelling & Creative Media Section */}
          {showDigitalStorytelling && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {digitalStorytellingCards.map((card, index) => (
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

          {/* Gaming Section */}
          {showGaming && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {gamingCards.map((card, index) => (
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

          {/* Robo Games Section */}
          {showRoboGames && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {roboGamesCards.map((card, index) => (
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

          {/* Spot Light Section */}
          {showSpotLight && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-12 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {spotLightCards.map((card, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default EventsInfo;