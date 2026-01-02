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
  const [showRoboWarsGaming, setShowRoboWarsGaming] = useState(false);
  const [showParaCards, setShowParaCards] = useState(false);

  // Carousel states - removed unused slide state

  // Events data
  const [, setSportsEvents] = useState<Event[]>([]);
  const [, setCulturalEvents] = useState<Event[]>([]);

  const sportsDetailCards = [
    { title: "Athletics", subtitle: "Track & Field" },
    { title: "Individual &", subtitle: "Indoor Sports" },
    { title: "Team Field", subtitle: "Sports" },
    { title: "Para Sports", subtitle: "" }
  ];

  const indoorSportsCards = [
    { title: "Chess", subtitle: "" },
    { title: "Table Tennis", subtitle: "" },
    { title: "Traditional Yogasana", subtitle: "" },
    { title: "Taekwondo", subtitle: "under 8 wt. categories" },
    { title: "Tennikoit", subtitle: "" },
    { title: "Throwball", subtitle: "" }
  ];

  const mensTeamSportsCards = [
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

  const paraCards = [
    { title: "Para Athletics", subtitle: "" },
    { title: "Para Cricket", subtitle: "" }
  ];

  const culturalsCards = [
    { title: "Dance", subtitle: "Classical & Western" },
    { title: "Music", subtitle: "Singing & Instruments" },
    { title: "Dramatics", subtitle: "Drama & Cinematography" },
    { title: "Literature", subtitle: "Writing & Oratory" },
    { title: "Visual Arts", subtitle: "Arts & Craft" },
    { title: "Fashion Design", subtitle: "Fashion & Styling" },
    { title: "Spot Light", subtitle: "Special Events" },
    { title: "Digital Storytelling & Creative Media", subtitle: "" }
  ];

  const roboWarsGamingCards = [
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
    { title: "Mr. and Ms. Mahotsav", subtitle: "" },
    { title: "Mahotsav Got Talent", subtitle: "" }
  ];

  // Event details data - just the keys to check if event exists
  const eventDetailsData = {
    "Athletics": true,
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
    "Taekwondo": true,
    "Yoga & Individual": true
  };

  // Handle event detail click with gender context
  const handleEventDetailClick = (eventTitle: string, gender?: string) => {

    // Check if it's Individual & Indoor Sports (merged)
    if (eventTitle === "Individual &") {
      navigate('/events/indoor-sports');
      return;
    }

    // Check if it's Team Field Sports (merged)
    if (eventTitle === "Team Field") {
      navigate('/events/mens-team-sports');
      return;
    }

    // Check if it's Para Sports
    if (eventTitle === "Para Sports") {
      navigate('/events/para');
      return;
    }

    // Map event titles to their detail page names
    const eventNameMapping: { [key: string]: string } = {
      // Sports events
      "Athletics": "Athletics",
      "Men's Athletics": "Men's Athletics",
      "Women's Athletics": "Men's Athletics",
      "Chess Championship": "Chess",
      "Chess Tournament": "Chess",
      "Chess": "Chess",
      "Table Tennis": "Table Tennis",
      "Traditional Yogasana": "Traditional Yogasana",
      "Taekwondo": "Taekwondo",
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
      "Skit (8 no.)": "Skit",
      "Mime": "Mime",
      "Mime (6 no.)": "Mime",
      "Mono Action": "Mono Action",
      "Spot Ad Making": "Spot Ad Making",
      "On the Spot Ad making": "Spot Ad Making",
      "Dialogue Dhamakha": "Dialogue Dhamaka",

      // Cultural events - Literature
      "Shayari (Hindi)": "Shayari - Hindi",
      "Shayari – Hindi": "Shayari - Hindi",
      "On Spot Creative Content Writing": "On Spot Creative Content Writing",
      "Spot Creative writing": "On Spot Creative Content Writing",
      "Telugu Vyasa Rachana": "Telugu Vyaasa Rachana",
      "Telugu Vyaasa rachana": "Telugu Vyaasa Rachana",
      "JAM": "JAM",
      "Impromptu (JAM)": "JAM",
      "Dumb Charades": "Dumb Charades",
      "Dumb charades (2 no.)": "Dumb Charades",
      "Quiz": "Quiz",
      "Quiz wiz (3 no.)": "Quiz",
      "Word Master": "Word Master",
      "Master Orator": "Master Orator",
      "Story telling": "Story telling",
      "Dialogue Dhamaka (HINDI)": "Dialogue Dhamaka",

      // Cultural events - Visual Arts
      "Rangoli": "Rangoli",
      "Rangoli (2 no.)": "Rangoli",
      "Clay Modelling": "Clay Modelling",
      "Clay modelling": "Clay Modelling",
      "Collage": "Collage",
      "Mandala Art": "Mandala Art",
      "Mandala": "Mandala Art",
      "Face Painting": "Face Painting",
      "Pencil Sketching": "Pencil Sketching",
      "Theme Painting": "Theme Painting",
      "Texart": "Texart",
      "Mehandi": "Mehandi",

      // Cultural events - Fashion Design
      "Haute Couture": "Haute Couture",
      "Haute Couture - Theme Ramp walk (12 no.)": "Haute Couture",
      "T-Shirt Designing": "T-Shirt Designing",
      "T-Shirt designing": "T-Shirt Designing",
      "Texart (Fashion sketching)": "Texart",
      "Craftvilla": "Craftvilla",
      "Craft villa ( Accessory design)": "Craftvilla",

      // Cultural events - Spot Light
      "Mahotsav Got Talent": "Mahotsav Got Talent",
      "Mr. and Ms. Mahotsav": "Mr. and Ms. Mahotsav",
      "Mr. Mahotsav": "Mr. and Ms. Mahotsav",
      "Ms. Mahotsav": "Mr. and Ms. Mahotsav",

      // Cultural events - Digital Storytelling
      "Short Film Making": "Short Film Making",
      "Short film": "Short Film Making",
      "Online Photography": "Online Photography",
      "Theme Photography (Online)": "Online Photography",
      "Digital Poster Making": "Digital Poster Making",
      "Digital Poster making": "Digital Poster Making",
      "Mahotsav Digital Chronicle": "Mahotsav Digital Chronicle",
      "Reel Making": "Reel Making",

      // Gaming events
      "Valorant": "Valorant",
      "Valorant (PC)": "Valorant",
      "E-Football": "E-Football",
      "E- Football (PC)": "E-Football",
      "Counter Strike": "Counter Strike",
      "Counter Strike (PC)": "Counter Strike",
      "Smash Karts": "Smash Karts",
      "Smash Karts (PC)": "Smash Karts",

      // Robo Wars events
      "Line Follower Robot": "Line Follower Robot",
      "Line follower robot": "Line Follower Robot",
      "Bot Wrestling": "Bot Wrestling",
      "Robo Races": "Robo Races",
      "Robo races": "Robo Races",

      // Para Sports events
      "Para Athletics": "Para Sports",
      "Para Cricket": "Para Cricket"
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
    else if (showParaCards) fromSection = 'paraCards';
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
    else if (showRoboWarsGaming) fromSection = 'roboWarsGaming';
    navigate(`/event/${encodeURIComponent(eventName)}`, { state: { fromSection } });
  };

  // Click handlers
  const handleSportsCardClick = () => {
    navigate('/events/sports');
  };

  const handleCulturalsCardClick = () => {
    setShowCulturals(true);
  };

  // Navigation functions removed - carousel not currently implemented

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [sportsResponse, culturalsResponse] = await Promise.all([
          getEventsByType('Sports'),
          getEventsByType('Cultural')
        ]);
        setSportsEvents(sportsResponse.data || []);
        setCulturalEvents(culturalsResponse.data || []);
      } catch {
        // Error silently ignored
      }
    };

    fetchEvents();
  }, []);

  // Handle URL-based routing and restore section state
  useEffect(() => {
    const path = location.pathname;
    const state = location.state as { openSection?: string } | null;
    
    // Handle URL-based routing
    if (path.includes('/events/')) {
      const section = path.split('/events/')[1];
      
      switch (section) {
        case 'dance':
          setShowCulturals(true);
          setShowDance(true);
          break;
        case 'music':
          setShowCulturals(true);
          setShowMusic(true);
          break;
        case 'dramatics':
          setShowCulturals(true);
          setShowTheatre(true);
          break;
        case 'literature':
          setShowCulturals(true);
          setShowLiterature(true);
          break;
        case 'visual-arts':
          setShowCulturals(true);
          setShowVisualArts(true);
          break;
        case 'fashion-design':
          setShowCulturals(true);
          setShowFashionDesign(true);
          break;
        case 'digital-storytelling':
          setShowCulturals(true);
          setShowDigitalStorytelling(true);
          break;
        case 'spot-light':
          setShowCulturals(true);
          setShowSpotLight(true);
          break;
        case 'gaming':
          setShowRoboWarsGaming(true);
          setShowGaming(true);
          break;
        case 'robo-games':
          setShowRoboWarsGaming(true);
          setShowRoboGames(true);
          break;
        case 'sports':
          setShowSportsDetails(true);
          break;
        case 'indoor-sports':
          setShowSportsDetails(true);
          setShowIndoorSports(true);
          break;
        case 'mens-team-sports':
          setShowSportsDetails(true);
          setShowMensTeamSports(true);
          break;
        case 'womens-team-sports':
          setShowSportsDetails(true);
          setShowWomensTeamSports(true);
          break;
        case 'para':
          setShowSportsDetails(true);
          setShowParaCards(true);
          break;
      }
      return;
    }
    
    // Restore section state when returning from event detail
    if (state?.openSection) {
      const section = state.openSection;

      // Handle sports sections
      if (['indoorSports', 'womensIndoorSports', 'mensTeamSports', 'womensTeamSports', 'paraCards'].includes(section)) {
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
          case 'paraCards':
            setShowParaCards(true);
            break;
        }
      }
      // Handle cultural sections
      else if (['dance', 'music', 'theatre', 'literature', 'visualArts', 'fashionDesign', 'digitalStorytelling', 'spotLight'].includes(section)) {
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
          case 'spotLight':
            setShowSpotLight(true);
            break;
        }
      }
      // Handle robo wars & gaming sections
      else if (['gaming', 'roboGames', 'roboWarsGaming'].includes(section)) {
        if (section === 'roboWarsGaming') {
          setShowRoboWarsGaming(true);
        } else {
          setShowRoboWarsGaming(true);
          if (section === 'gaming') {
            setShowGaming(true);
          } else if (section === 'roboGames') {
            setShowRoboGames(true);
          }
        }
      }

      // Clear the state to prevent issues on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden events-info-page" style={{
      backgroundImage: 'url("https://res.cloudinary.com/dctuev0mm/image/upload/v1766935583/Background-redesign_jbvbrc.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Floating Flower - Top Right (clipped naturally) */}
      <div className="fixed pointer-events-none max-md:z-0 md:z-[1] flower-top-right">
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
      <div className="fixed pointer-events-none max-md:z-0 md:z-[1] flower-bottom-left">
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
            top: -28%;
            right: -13%;
            width: 500px;
            height: 500px;
          }
          
          .flower-bottom-left {
            bottom: -28%;
            left: -13%;
            width: 500px;
            height: 500px;
          }
          
          /* Responsive flower positioning */
          @media (max-width: 768px) {
            .flower-top-right,
            .flower-bottom-left {
              width: 200px !important;
              height: 200px !important;
              opacity: 0.01 !important;
            }
            
            .flower-top-right {
              top: -25% !important;
              right: -25% !important;
            }
            
            .flower-bottom-left {
              bottom: -25% !important;
              left: -25% !important;
            }
          }
          
          @media (max-width: 480px) {
            .flower-top-right,
            .flower-bottom-left {
              width: 160px !important;
              height: 160px !important;
              opacity: 0.01 !important;
            }
            
            .flower-top-right {
              top: -25% !important;
              right: -25% !important;
            }
            
            .flower-bottom-left {
              bottom: -25% !important;
              left: -25% !important;
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
          
          /* Global Event Card Dimensions - 3:4 Aspect Ratio */
          .event-card {
            width: 280px;
            height: 380px;
            max-width: 280px;
            margin: 0 -30px;
            position: relative;
            overflow: visible;
            transition: transform 1.5s ease;
            border-radius: 1.5rem;
            transform-style: preserve-3d;
          }
          
          .event-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 1.5rem;
            overflow: hidden;
            z-index: -1;
          }
          
          /* Card Hover Effect - Global */
          .event-card:hover {
            transform: perspective(1000px) rotateX(8deg) translateY(-10px) scale(1.02);
            z-index: 5;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          }
          
          .event-card-image {
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
            transition: transform 0.5s ease-in-out;
            z-index: 0;
            opacity: 1;
            border-radius: 1.5rem 1.5rem 1.5rem 1.5rem;
          }
          
          .event-card:hover .event-card-image {
            transform: translate(-50%, -65%) scale(1.25);
            z-index: 100;
          }
          
          /* Global Grid Gap Styles */
          .grid {
            row-gap: 3rem !important;
            column-gap: 15 !important;
          }
          
          /* Responsive adjustments for mobile */
          @media (max-width: 768px) {
            .events-header-title {
              font-size: 3rem !important;
            }
            
            .event-card {
              width: 270px !important;
              height: 360px !important;
            }
          }
          
          @media (max-width: 480px) {
            .events-header-title {
              font-size: 2.5rem !important;
            }
            
            .event-card {
              width: 240px !important;
              height: 320px !important;
            }
          }

          /* Header Elements */
          .events-logo {
            height: 16rem;
            object-fit: contain;
            margin-top: -2rem;
          }

          .events-title {
            font-family: 'Aladin, cursive';
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            font-size: 2.25rem;
            font-weight: bold;
            color: white;
            white-space: nowrap;
          }

          /* Mobile heading responsive - force 2 lines for long text */
          @media (max-width: 768px) {
            .events-mobile-heading {
              white-space: normal !important;
              word-wrap: break-word !important;
              overflow-wrap: break-word !important;
              max-width: 90% !important;
              font-size: clamp(1.5rem, 5vw, 2rem) !important;
              line-height: 1.3 !important;
              padding: 0 1rem !important;
              text-align: center !important;
              margin: 1rem auto !important;
            }
          }

          .events-back-button-container {
            margin-top: -6rem;
          }

          @media (min-width: 768px) {
            .events-logo {
              height: 16rem;
              margin-top: -6rem;
            }

            .events-title {
              font-size: 2.25rem;
            }
          }

          /* Main Category Cards */
          .category-card {
            background-image: url(/images/card-bg.avif);
            background-size: cover;
            background-position: center;
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          }

          .category-card-title {
            font-family: 'Aladin, cursive';
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
          }

          /* Mobile-specific heading responsiveness */
          @media (max-width: 768px) {
            .category-card-title {
              font-size: clamp(1rem, 4.5vw, 1.25rem) !important;
              line-height: 1.4 !important;
              max-width: 100% !important;
              word-wrap: break-word !important;
              overflow-wrap: break-word !important;
              hyphens: auto !important;
              padding: 0 1rem !important;
              text-align: center !important;
              display: block !important;
              margin-left: auto !important;
              margin-right: auto !important;
            }
          }

          /* Sub-category Cards (with background image) */
          .subcategory-card {
            background-image: url(/images/card-bg.avif);
            background-size: cover;
            background-position: center;
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
            height: 380px;
            width: 280px;
            max-width: 280px;
            padding-bottom: 5rem;
            overflow: visible;
            position: relative;
            transition: transform 1.5s ease;
          }
          
          .subcategory-card:hover {
            transform: perspective(1000px) rotateX(8deg) translateY(-10px) scale(1.02);
            z-index: 5;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          }
          
          .subcategory-card img {
            transition: transform 0.5s ease-in-out;
          }
          
          .subcategory-card:hover img {
            transform: scale(1.15) translateY(-10%);
          }

          /* Cultural Event Cards (with background image) */
          .cultural-event-card {
            background-image: url(/images/card-bg.avif);
            background-size: cover;
            background-position: center;
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
            height: 380px;
            width: 280px;
            max-width: 280px;
            padding-bottom: 1rem;
          }

          .subcategory-card-title {
            color: #fde047;
            font-size: 0.875rem;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
          }

          .subcategory-card-subtitle {
            color: white;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
          }

          /* Download Rulebook Button */
          .download-rulebook-btn {
            background-color: #f9a8d4;
            color: #581c87;
            font-weight: bold;
            padding: 10px 60px;
            border-radius: 6px;
            font-size: 18px;
            border: none;
            cursor: pointer;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            white-space: nowrap;
          }

          .download-rulebook-btn:hover {
            background-color: #f472b6;
          }

          /* Inner Event Image Cards - Clean image-only cards */
          .inner-event-card {
            width: 280px;
            height: 380px;
            max-width: 280px;
            position: relative;
            overflow: hidden;
            border-radius: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .inner-event-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0);
            transition: background 0.3s ease;
            z-index: 1;
            pointer-events: none;
          }

          .inner-event-card:hover {
            transform: scale(1.05);
          }

          .inner-event-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            transition: opacity 0.3s ease;
          }

          /* When hovering over a specific card, make its siblings transparent */
          .inner-event-cards-container:has(.inner-event-card:hover) .inner-event-card:not(:hover) img {
            opacity: 0.4;
          }
        `}
      </style>

      {/* Main content - centered both vertically and horizontally */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header: Logo + Title + Back Button */}
        <div className="w-full px-8 relative z-20" style={{ paddingTop: window.innerWidth <= 768 ? "0px" : "10px" }}>
          {/* Desktop layout - Logo left, Title center, Back below logo */}
          <div className="hidden md:grid md:grid-cols-3 md:items-start">
            {/* Left column: Logo and Back button stacked */}
            <div className="flex flex-col items-start gap-3">
              <img
                src={`/menu-dashboard/image.avif`}
                alt="Vignan Mahotsav"
                className="events-logo"
                style={{ marginTop: '-60px' }}
              />
              <div className="events-back-button-container">
                <BackButton
                  className="!static !top-auto !left-auto"
                  onClick={() => {
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
                      if (showGaming || showRoboGames) {
                        setShowRoboWarsGaming(true);
                      }
                    } else if (showRoboWarsGaming) {
                      setShowRoboWarsGaming(false);
                    } else if (showIndoorSports || showWomensIndoorSports || showMensTeamSports || showWomensTeamSports || showParaCards) {
                      setShowIndoorSports(false);
                      setShowWomensIndoorSports(false);
                      setShowMensTeamSports(false);
                      setShowWomensTeamSports(false);
                      setShowParaCards(false);
                    } else if (showSportsDetails || showCulturals) {
                      setShowSportsDetails(false);
                      setShowCulturals(false);
                    } else {
                      navigate('/');
                    }
                  }} />
              </div>
            </div>

            {/* Center column: Title */}
            <div className="flex items-start justify-center" style={{ marginTop: '30px' }}>
              <h1 className="events-title events-page-heading">
                {showIndoorSports ? 'Indoor Sports' :
                  showWomensIndoorSports ? "Women's Indoor Sports" :
                    showMensTeamSports ? "Men's Team Field Sports" :
                      showWomensTeamSports ? "Women's Team Field Sports" :
                        showParaCards ? 'Para' :
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
                                              showRoboWarsGaming ? 'Robo Wars & Gaming' :
                                                showSportsDetails ? 'sports and games' :
                                                  showCulturals ? 'PERFORMING ARTS,VISUAL ARTS,LITERARY,FASHION' :
                                                    'EVENTS'}
              </h1>
            </div>

            {/* Right column: Empty (for balance) */}
            <div></div>
          </div>

          {/* Mobile layout - Logo and Back button centered, stacked */}
          <div className="events-mobile-header md:hidden flex flex-col items-center w-full relative" style={{ paddingBottom: 0 }}>
            <div className="absolute left-4 top-0">
              <BackButton
                className="!static !top-auto !left-auto"
                onClick={() => {
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
                    if (showGaming || showRoboGames) {
                      setShowRoboWarsGaming(true);
                    }
                  } else if (showRoboWarsGaming) {
                    setShowRoboWarsGaming(false);
                  } else if (showIndoorSports || showWomensIndoorSports || showMensTeamSports || showWomensTeamSports || showParaCards) {
                    setShowIndoorSports(false);
                    setShowWomensIndoorSports(false);
                    setShowMensTeamSports(false);
                    setShowWomensTeamSports(false);
                    setShowParaCards(false);
                  } else if (showSportsDetails || showCulturals) {
                    setShowSportsDetails(false);
                    setShowCulturals(false);
                  } else {
                    navigate('/');
                  }
                }} />
            </div>
            <img
              src={`/menu-dashboard/image.avif`}
              alt="Vignan Mahotsav"
              className="events-logo events-mobile-logo mx-auto"
            />
            <h1 className="events-title events-page-heading events-mobile-heading">
              {showIndoorSports ? 'Indoor Sports' :
                showWomensIndoorSports ? "Women's Indoor Sports" :
                  showMensTeamSports ? "Men's Team Field Sports" :
                    showWomensTeamSports ? "Women's Team Field Sports" :
                      showParaCards ? 'Para' :
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
                                              showCulturals ? 'PERFORMING ARTS,VISUAL ARTS,LITERARY,FASHION' :
                                                'EVENTS'}
            </h1>
          </div>
        </div>

        {/* Main Cards Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 md:py-8" style={{ position: 'relative', zIndex: 10, paddingTop: window.innerWidth <= 768 ? '0px' : undefined, paddingBottom: window.innerWidth <= 768 ? '0px' : undefined }}>
          {!showSportsDetails && !showCulturals && !showRoboWarsGaming && !showIndoorSports && !showWomensIndoorSports && !showMensTeamSports && !showWomensTeamSports && !showParaCards && !showDance && !showMusic && !showTheatre && !showLiterature && !showVisualArts && !showFashionDesign && !showDigitalStorytelling && !showGaming && !showRoboGames && !showSpotLight && (
            <div className="w-full max-w-7xl mx-auto">
              {/* Three Cards - exact spacing from reference */}
              <div className="events-main-cards-container flex flex-row flex-wrap items-start justify-center gap-10 md:gap-14 mb-10">
                {/* Card 1 - Performing Arts */}
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="event-card category-card relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={handleCulturalsCardClick}
                    style={{
                      margin: '0 16px',
                      backgroundImage: 'url(/images/Cultural.avif)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '90%',
                      textAlign: 'center',
                      zIndex: 10
                    }}>
                      <h2 className="category-card-title text-white text-xl font-bold tracking-wide" style={{ lineHeight: '1.3', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', marginTop: '460px' }}>
                        PERFORMING ARTS,VISUAL ARTS,LITERARY,FASHION
                      </h2>
                    </div>
                  </div>
                  {/* Title below card - visible on mobile via CSS */}
                  <h2 className="category-card-title text-white text-xl font-bold tracking-wide text-center">
                    PERFORMING ARTS,VISUAL ARTS,LITERARY,FASHION
                  </h2>
                </div>

                {/* Card 2 - Sports and Games with Button Below (Desktop Only) */}
                <div className="relative flex flex-col items-center gap-3 events-card-with-button-desktop" style={{ marginTop: '-90px' }}>
                  <div className="flex flex-col items-center gap-3" style={{ marginTop: '-30px' }}>
                    <div
                      className="event-card category-card relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                      onClick={handleSportsCardClick}
                      style={{
                        margin: '0 16px',
                        backgroundImage: 'url(/images/Sports.avif)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        top: '-60px'
                      }}
                    >
                    </div>
                    <h2 className="category-card-title text-white text-xl font-bold tracking-wide text-center" style={{ marginTop: '-50px' }}>
                      SPORTS AND GAMES
                    </h2>
                  </div>
                  {/* Download Rulebook button - Desktop */}
                  <button
                    className="download-rulebook-btn download-rulebook-desktop"
                  >
                    DOWNLOAD RULEBOOK
                  </button>
                </div>

                {/* Card 2 - Sports and Games (Mobile - No Button) */}
                <div className="flex flex-col items-center gap-3 events-card-mobile-only">
                  <div
                    className="event-card category-card relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={handleSportsCardClick}
                    style={{
                      margin: '0 16px',
                      backgroundImage: 'url(/images/Sports.avif)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                  </div>
                  <h2 className="category-card-title text-white text-lg font-bold tracking-wide text-center">
                    SPORTS AND GAMES
                  </h2>
                </div>

                {/* Card 3 - Robo Wars & Gaming */}
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="event-card category-card relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={() => setShowRoboWarsGaming(true)}
                    style={{
                      margin: '0 16px',
                      backgroundImage: 'url(/images/Gaming.avif)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                  </div>
                  <h2 className="category-card-title text-white text-xl font-bold tracking-wide text-center">
                    ROBO WARS & GAMING
                  </h2>
                </div>
              </div>

              {/* Download Rulebook button - Mobile (After all 3 cards) */}
              <div className="events-button-mobile-container flex justify-center">
                <button
                  className="download-rulebook-btn download-rulebook-mobile"
                  onClick={(e) => {
                    e.stopPropagation();
                    const link = document.createElement('a');
                    link.href = '/Mahostav Rules Book 2025.pdf';
                    link.download = 'Mahostav Rules Book 2026.pdf';
                    link.click();
                  }}
                >
                  DOWNLOAD RULEBOOK
                </button>
              </div>
            </div>
          )}

          {/* Keep existing sections for when cards are clicked */}
          {showSportsDetails && !showIndoorSports && !showWomensIndoorSports && !showMensTeamSports && !showWomensTeamSports && !showParaCards && (
            <div className="w-full h-full flex flex-col relative z-20">
              {/* Cards Grid - centered */}
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-x-1">

                    {sportsDetailCards.map((card, index) => {
                      const isClickable = eventDetailsData[card.title as keyof typeof eventDetailsData] ||
                        card.title === "Individual &" ||
                        card.title === "Team Field" ||
                        card.title === "Para Sports";

                      // Map sports detail card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Athletics": "/images/athletics.png",
                        "Individual &": "/images/individual.png",
                        "Team Field": "/images/team events.png",
                        "Para Sports": "/images/Para_Sports.png"
                      };

                      return (
                        <div
                          key={index}
                          className="subcategory-card relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                          onClick={isClickable ? () => handleEventDetailClick(card.title) : undefined}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={imageMap[card.title]}
                              alt={card.title}
                              className="absolute inset-0 w-full h-full object-contain"
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                          <div className="absolute bottom-0 left-0 right-0 p-5 text-center bg-gradient-to-t from-black/60 to-transparent">
                            <h2 className="subcategory-card-title">
                              {card.title}
                            </h2>
                            {card.subtitle && (
                              <p className="subcategory-card-subtitle">
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
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="inner-event-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {indoorSportsCards.map((card, index) => {
                      // Map indoor sports card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Chess": "images/chess.avif",
                        "Table Tennis": "images/Tabel Tennis.avif",
                        "Traditional Yogasana": "images/Traditional Yoga.avif",
                        "Taekwondo": "images/Taekwando.avif",
                        "Tennikoit": "images/Tennikoit.avif",
                        "Throwball": "images/throwball.avif",
                        "Yoga & Individual": "/images/Yoga & individual.png"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          onClick={() => handleEventDetailClick(card.title)}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Women's Indoor Sports Section */}
          {showWomensIndoorSports && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="inner-event-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {indoorSportsCards.map((card, index) => {
                      // Map indoor sports card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Chess": "images/chess.avif",
                        "Table Tennis": "images/Tabel Tennis.avif",
                        "Traditional Yogasana": "images/Traditional Yoga.avif",
                        "Taekwondo": "images/Taekwando.avif",
                        "Tennikoit": "images/Tennikoit.avif",
                        "Throwball": "images/throwball.avif",
                        "Yoga & Individual": "/images/Yoga & individual.png"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          onClick={() => handleEventDetailClick(card.title)}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Men's Team Field Sports Section */}
          {showMensTeamSports && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="inner-event-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {mensTeamSportsCards.map((card, index) => {
                      // Map men's team sports card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Volley ball": "images/volley ball.avif",
                        "Basket ball": "images/basket ball.avif",
                        "Kabaddi": "images/kabbadi.avif",
                        "Football": "images/football men.avif",
                        "Kho-Kho": "images/kho kho.avif",
                        "Hockey": "images/hockey.avif"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          onClick={() => handleEventDetailClick(card.title, 'Men')}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Women's Team Field Sports Section */}
          {showWomensTeamSports && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="inner-event-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {womensTeamSportsCards.map((card, index) => {
                      // Map women's team sports card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Volley ball": "images/volley ball.avif",
                        "Basket ball": "images/basket ball.avif",
                        "Kabaddi": "images/kabbadi.avif",
                        "Kho-Kho": "images/kho kho.avif",
                        "Throw ball": "images/throwball.avif"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          onClick={() => handleEventDetailClick(card.title, 'Women')}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Para Cards Section */}
          {showParaCards && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {paraCards.map((card, index) => (
                      <div
                        key={index}
                        className="inner-event-card"
                        onClick={() => handleEventDetailClick(card.title)}
                      >
                        {card.title === "Para Athletics" && (
                          <img
                            src={`/images/para athletics (men).png`}
                            alt="Para Athletics"
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                        {card.title === "Para Cricket" && (
                          <img
                            src={`/images/para cricket(men).png`}
                            alt="Para Cricket"
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Culturals Section */}
          {showCulturals && !showDance && !showMusic && !showTheatre && !showLiterature && !showVisualArts && !showFashionDesign && !showDigitalStorytelling && !showGaming && !showRoboGames && !showSpotLight && (
            <div className="w-full h-full flex flex-col relative z-20">
              {/* Cards Grid - centered */}
              <div className="flex-1 flex items-center justify-center px-4 md:px-8 pb-12" style={{ overflowY: 'visible' }}>
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center events-cards-grid" style={{ columnGap: '0', overflowY: 'visible' }}>
                    {culturalsCards.map((card, index) => {
                      const handleCardClick = () => {
                        if (card.title === "Dance") {
                          navigate('/events/dance');
                        } else if (card.title === "Music") {
                          navigate('/events/music');
                        } else if (card.title === "Dramatics") {
                          navigate('/events/dramatics');
                        } else if (card.title === "Literature") {
                          navigate('/events/literature');
                        } else if (card.title === "Visual Arts") {
                          navigate('/events/visual-arts');
                        } else if (card.title === "Fashion Design") {
                          navigate('/events/fashion-design');
                        } else if (card.title === "Digital Storytelling & Creative Media") {
                          navigate('/events/digital-storytelling');
                        } else if (card.title === "Gaming") {
                          navigate('/events/gaming');
                        } else if (card.title === "Robo Games") {
                          navigate('/events/robo-games');
                        } else if (card.title === "Spot Light") {
                          navigate('/events/spot-light');
                        }
                      };
                      return (
                        <div
                          key={index}
                          className="event-card relative rounded-3xl cursor-pointer transition-all duration-300 overflow-hidden"
                          onClick={handleCardClick}
                          style={{
                            backgroundImage: 'url(/images/card-bg.avif)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
                          }}
                        >
                          {card.title === "Dance" && (
                            <img
                              src={`/images/dance.png`}
                              alt="Dance"
                              className="event-card-image transition-transform duration-300"
                              style={{ display: 'block', width: '100%', height: 'auto', zIndex: 1 }}
                            />
                          )}
                          {card.title === "Music" && (
                            <img
                              src={`/images/music.avif`}
                              alt="Music"
                              className="event-card-image transition-transform duration-300"
                              style={{ display: 'block', width: '100%', height: 'auto', zIndex: 1 }}
                            />
                          )}
                          {card.title === "Dramatics" && (
                            <img
                              src="/images/Dramatics.png"
                              alt="Dramatics"
                              className="event-card-image transition-transform duration-300"
                              style={{ display: 'block', width: '100%', height: 'auto', zIndex: 1 }}
                            />
                          )}
                          {card.title === "Literature" && (
                            <img
                              src={`/images/literary.png`}
                              alt="Literature"
                              className="event-card-image transition-transform duration-300"
                              style={{ display: 'block', width: '100%', height: 'auto', zIndex: 1 }}
                            />
                          )}
                          {card.title === "Visual Arts" && (
                            <img
                              src="/images/visual arts.png"
                              alt="Visual Arts"
                              className="event-card-image transition-transform duration-300"
                              style={{ display: 'block', width: '100%', height: 'auto', zIndex: 1 }}
                            />
                          )}
                          {card.title === "Fashion Design" && (
                            <img
                              src={`/images/fashion.png`}
                              alt="Fashion Design"
                              className="event-card-image transition-transform duration-300"
                              style={{ display: 'block', width: '100%', height: 'auto', zIndex: 1 }}
                            />
                          )}
                          {card.title === "Digital Storytelling & Creative Media" && (
                            <img
                              src="/images/Digital Arts.png"
                              alt="Digital Storytelling"
                              className="event-card-image transition-transform duration-300"
                              style={{ display: 'block', width: '100%', height: 'auto', zIndex: 1 }}
                            />
                          )}
                          {card.title === "Spot Light" && (
                            <img
                              src={`/images/spotlight.png`}
                              alt="Spot Light"
                              className="event-card-image transition-transform duration-300"
                              style={{ display: 'block', width: '100%', height: 'auto', zIndex: 1 }}
                            />
                          )}
                          <div className="absolute bottom-0 left-0 right-0 p-5 text-center bg-gradient-to-t from-black/60 to-transparent rounded-b-3xl" style={{ zIndex: 10 }}>
                            <h2 className="text-white text-2xl font-bold tracking-wide uppercase transition-all duration-300" style={{ textShadow: '1px 1px 0 #000, 2px 2px 0 #000, 3px 3px 0 #000, 4px 4px 0 #000, 5px 5px 0 #000, 6px 6px 8px rgba(0, 0, 0, 0.8)' }}>
                              {card.title}
                            </h2>
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
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="inner-event-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {danceCards.map((card, index) => {
                      // Map dance card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Classical Dance Solo": "images/classical dance.avif",
                        "Dancing Star – Western Solo": "images/dancig star.avif",
                        "Dancing Jodi – Western Duo": "images/dancing jodi.avif",
                        "Spot Dance - Jodi": "images/spot dance.avif",
                        "Group Dance (10 no.)": "images/group dance.avif"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          onClick={() => handleEventDetailClick(card.title)}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Music Section */}
          {showMusic && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="inner-event-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {musicCards.map((card, index) => {
                      // Map music card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Singing Idol": "images/singing idol.avif",
                        "Group Singing (6 no.)": "images/group singing.avif",
                        "Singing Jodi": "images/singing jodi.avif",
                        "Classical/Light Vocal Solo": "images/classical or light vocal solo.avif",
                        "Western Vocal Solo": "images/Western vocal solo.avif",
                        "Anthyakshari Duo": "images/anthyakshari.avif",
                        "Instrumental Solo": "images/instrumental solo.avif"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          style={index >= 4 ? { marginBottom: '50px' } : {}}
                          onClick={() => handleEventDetailClick(card.title)}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Theatre Section */}
          {showTheatre && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="inner-event-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {theatreCards.map((card, index) => {
                      // Map theatre card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Skit (8 no.)": "images/skit.avif",
                        "Mime (6 no.)": "images/mime.avif",
                        "Dialogue Dhamakha": "images/Dialogue Drama.avif",
                        "Mono Action": "images/Mono Action.avif",
                        "On the Spot Ad making": "images/On Spot Ad Making.avif"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          onClick={() => handleEventDetailClick(card.title)}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Literature Section */}
          {showLiterature && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="inner-event-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {literatureCards.map((card, index) => {
                      // Map literature card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Master Orator": "images/Master orator.avif",
                        "Spot Creative writing": "images/spot creative.avif",
                        "Telugu Vyaasa rachana": "images/telugu vyasa rachana.avif",
                        "Shayari – Hindi": "images/Shayari hindi.avif",
                        "Impromptu (JAM)": "images/impromptu.avif",
                        "Story telling": "images/story telling.avif",
                        "Quiz wiz (3 no.)": "images/Quiz wiz.avif",
                        "Word Master": "images/word master.avif",
                        "Dumb charades (2 no.)": "images/dumb chardes.avif"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          onClick={() => handleEventDetailClick(card.title)}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visual Arts Section */}
          {showVisualArts && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="inner-event-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {visualArtsCards.map((card, index) => {
                      // Map visual arts card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Theme Painting": "images/Theme Painting.avif",
                        "Clay modelling": "images/clay modeling.avif",
                        "Rangoli (2 no.)": "images/Rangoli.avif",
                        "Mehandi": "images/Mehandi.avif",
                        "Collage": "images/collage.avif",
                        "Face Painting": "images/Face painting.avif",
                        "Pencil Sketching": "images/pencil Sketching.avif",
                        "Mandala": "images/Mandala Art.avif"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          onClick={() => handleEventDetailClick(card.title)}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fashion Design Section */}
          {showFashionDesign && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="inner-event-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {fashionDesignCards.map((card, index) => {
                      // Map fashion design card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Haute Couture - Theme Ramp walk (12 no.)": "images/Theme Ramp walk.avif",
                        "Craft villa ( Accessory design)": "images/Craft villa.avif",
                        "Texart (Fashion sketching)": "images/texart.avif",
                        "T-Shirt designing": "images/T-shirt designing.avif"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          onClick={() => handleEventDetailClick(card.title)}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Digital Storytelling & Creative Media Section */}
          {showDigitalStorytelling && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="inner-event-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {digitalStorytellingCards.map((card, index) => {
                      // Map digital storytelling card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Short film": "images/Short Film.avif",
                        "Theme Photography (Online)": "images/Theme Photography.avif",
                        "Digital Poster making": "images/Digital Poster Making.avif",
                        "Mahotsav Digital Chronicle": "images/MH-26 Digital Chronicle.avif",
                        "Reel Making": "images/reel making.avif"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          onClick={() => handleEventDetailClick(card.title)}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gaming Section */}
          {showGaming && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="inner-event-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {gamingCards.map((card, index) => {
                      // Map gaming card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Valorant (PC)": "images/valorant.avif",
                        "E- Football (PC)": "images/E-Football.avif",
                        "Counter Strike (PC)": "images/Counter Strike.avif",
                        "Smash Karts (PC)": "images/smash kart.avif"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          onClick={() => handleEventDetailClick(card.title)}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Robo Games Section */}
          {showRoboGames && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {roboGamesCards.map((card, index) => {
                      // Map robo games card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Line follower robot": "images/Line Flower Robot.png",
                        "Bot Wrestling": "images/Bot wrestling.png",
                        "Robo races": "images/Robo Races.png"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          onClick={() => handleEventDetailClick(card.title)}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Spot Light Section */}
          {showSpotLight && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-24 pt-4">
                <div className="w-full max-w-6xl">
                  <div className="inner-event-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center" style={{ columnGap: '0' }}>
                    {spotLightCards.map((card, index) => {
                      // Map spotlight card titles to their image paths
                      const imageMap: { [key: string]: string } = {
                        "Mr. and Ms. Mahotsav": "images/Mr and ms mahotsav.avif",
                        "Mahotsav Got Talent": "images/Mr and ms mahotsav.avif"
                      };

                      return (
                        <div
                          key={index}
                          className="inner-event-card"
                          onClick={() => handleEventDetailClick(card.title)}
                        >
                          {imageMap[card.title] && (
                            <img
                              src={`${import.meta.env.BASE_URL}${imageMap[card.title]}`}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                          {!imageMap[card.title] && (
                            <div className="cultural-event-card relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-5 text-center bg-gradient-to-t from-black/60 to-transparent">
                                <h2 className="subcategory-card-title">
                                  {card.title}
                                </h2>
                                {card.subtitle && (
                                  <p className="subcategory-card-subtitle">
                                    {card.subtitle}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Robo Wars & Gaming Section */}
          {showRoboWarsGaming && !showGaming && !showRoboGames && (
            <div className="w-full h-full flex flex-col relative z-20">
              <div className="flex-1 flex items-center justify-center px-4 md:px-8 pb-12">
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {roboWarsGamingCards.map((card, index) => {
                      const handleCardClick = () => {
                        if (card.title === "Gaming") {
                          setShowGaming(true);
                        } else if (card.title === "Robo Games") {
                          setShowRoboGames(true);
                        }
                      };
                      return (
                        <div
                          key={index}
                          className="subcategory-card relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                          onClick={handleCardClick}
                        >
                          <div className="absolute bottom-0 left-0 right-0 p-5 text-center bg-gradient-to-t from-black/60 to-transparent">
                            <h2 className="subcategory-card-title">
                              {card.title}
                            </h2>
                            {card.subtitle && (
                              <p className="subcategory-card-subtitle">
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
