import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';
import AnimatedIcon from './Animatedicon';
import EventRegistrationModal from './EventRegistrationModal';
import Login from './Login';
import Signup from './Signup';
import FlowerComponent from './components/FlowerComponent';
import { registerUser, loginUser, forgotPassword, getEventsByType, saveMyEvents, getMyEvents, getUserRegisteredEvents, type SignupData, type Event } from './services/api';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPageMenu, setShowPageMenu] = useState(false);
  const [showEventsInfo, setShowEventsInfo] = useState(false);
  const [showSportsDetails, setShowSportsDetails] = useState(false);
  const [currentEventSlide, setCurrentEventSlide] = useState(0);

  const [currentSportsSlide, setCurrentSportsSlide] = useState(0);
  
  // Counter animation states
  const [footfall, setFootfall] = useState(0);
  const [colleges, setColleges] = useState(0);
  const [events, setEvents] = useState(0);
  const [onlineAudience, setOnlineAudience] = useState(0);
  const [cashPrizes, setCashPrizes] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  // Timer countdown state
  const eventDate = new Date("Feb 5, 2026 00:00:00").getTime();
  const getTimeLeft = () => {
    const now = Date.now();
    const diff = eventDate - now;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(getTimeLeft);
  const [animate, setAnimate] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

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

  const [showIndoorSports, setShowIndoorSports] = useState(false);
  const [currentIndoorSlide, setCurrentIndoorSlide] = useState(0);
  const [showWomenIndoorSports, setShowWomenIndoorSports] = useState(false);
  const [currentWomenIndoorSlide, setCurrentWomenIndoorSlide] = useState(0);
  const [showMenTeamSports, setShowMenTeamSports] = useState(false);
  const [currentMenTeamSlide, setCurrentMenTeamSlide] = useState(0);
  const [showWomenTeamSports, setShowWomenTeamSports] = useState(false);
  const [currentWomenTeamSlide, setCurrentWomenTeamSlide] = useState(0);
  const [showParaSports, setShowParaSports] = useState(false);
  const [currentParaSportsSlide, setCurrentParaSportsSlide] = useState(0);
  const [showParaAthleticsMen, setShowParaAthleticsMen] = useState(false);
  const [currentParaAthleticsSlide, setCurrentParaAthleticsSlide] = useState(0);
  const [showParaCricketMen, setShowParaCricketMen] = useState(false);
  const [currentParaCricketSlide, setCurrentParaCricketSlide] = useState(0);
  const [showCulturals, setShowCulturals] = useState(false);
  const [currentCulturalsSlide, setCurrentCulturalsSlide] = useState(0);
  const [isThrowbackUnlocked, setIsThrowbackUnlocked] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{ row: number; index: number } | null>(null);
  const [selectedYear, setSelectedYear] = useState<'2023' | '2024' | '2025'>('2023');
  
  // Touch swipe state for carousels
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // State for fetched events from database
  const [sportsEvents, setSportsEvents] = useState<Event[]>([]);
  const [culturalEvents, setCulturalEvents] = useState<Event[]>([]);
  const [paraSportsEvents, setParaSportsEvents] = useState<Event[]>([]);
  const [showMusic, setShowMusic] = useState(false);
  const [currentMusicSlide, setCurrentMusicSlide] = useState(0);
  const [showDance, setShowDance] = useState(false);
  const [currentDanceSlide, setCurrentDanceSlide] = useState(0);
  const [showTheatre, setShowTheatre] = useState(false);
  const [currentTheatreSlide, setCurrentTheatreSlide] = useState(0);
  const [showLiterature, setShowLiterature] = useState(false);
  const [currentLiteratureSlide, setCurrentLiteratureSlide] = useState(0);
  const [showVisualArts, setShowVisualArts] = useState(false);
  const [currentVisualArtsSlide, setCurrentVisualArtsSlide] = useState(0);
  const [showFashionDesign, setShowFashionDesign] = useState(false);
  const [currentFashionDesignSlide, setCurrentFashionDesignSlide] = useState(0);
  const [showSpotLight, setShowSpotLight] = useState(false);
  const [currentSpotLightSlide, setCurrentSpotLightSlide] = useState(0);

  // Gender-based pricing structure
  const getPricingForUser = () => {
    const normalizedGender = userProfileData.gender?.toLowerCase();

    if (normalizedGender === 'female') {
      return {
        sports: 250,
        culturals: 250,
        both: 350
      };
    }

    // Default to male pricing (covers explicit male users + unknown gender)
    return {
      sports: 350,
      culturals: 250,
      both: 350
    };
  };

  // Convert database events to card format for display
  const convertEventsToCards = (events: Event[]) => {
    return events.map(event => ({
      title: event.eventName,
      subtitle: event.category || event.eventType || "Event"
    }));
  };



  const culturalsCards = [
    { title: "Music", subtitle: "Singing & Instruments" },
    { title: "Dance", subtitle: "Classical & Western" },
    { title: "Theatre", subtitle: "Drama & Cinematography" },
    { title: "Literature", subtitle: "Poetry & Writing" },
    { title: "Visual Arts", subtitle: "Arts & Craft" },
    { title: "Fashion Design", subtitle: "Fashion & Styling" },
    { title: "Spot Light", subtitle: "Special Events" }
  ];

  const eventDetailsData = {
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
    },
    "Women's Athletics": {
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
    },
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
        "Tie breaks is as following: A. Buchholz B. Buchholz but 1 C. Sonneburn burger D. Direct encounter E. Great number of victories",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
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
        "Five sets will be conducted for semifinals and finals.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
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
    "Tennikoit": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "TENNIKOIT � Singles (Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "All participants must come with a proper sports attire.",
        "Participants should report at least 30 mins before scheduled time.",
        "The match is played as the best of 3 sets, 21+21+15 points.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: ""
      },
      contacts: [
        { name: "Ms. Y. Lavanya", phone: "+91 9063809790" },
        { name: "Ms. K. Vaishnavi", phone: "+91 7729838501" }
      ]
    },
    "Traditional Yogasana": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "YOGASANA (Men & Women) - Traditional & Artistic",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Everyone should report at least 30 mins before scheduled match time.",
        "All participants must come with a proper sports attire.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Syllabus, Rules & Regulations for the Yogasana events: A. Traditional Yogasana (singles) Event - Syllabus of Seniors A for Men & Women as per new code of points of Yogasana Bharat B. Artistic Yogasana (singles) Event - Artistic Yogasana Single Event syllabus as per new code of points of Yogasana Bharat",
        "Link to refer syllabus: https://www.yogasanabharat.com/code",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: ""
      },
      contacts: [
        { name: "Mr. G. Siva Rama Krishna", phone: "+91 6309959419" },
        { name: "Ms. P. Syam Keerthi", phone: "+91 8886161616" }
      ]
    },
    "Artistic Yogasana": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "YOGASANA (Men & Women) - Traditional & Artistic",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Everyone should report at least 30 mins before scheduled match time.",
        "All participants must come with a proper sports attire.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Syllabus, Rules & Regulations for the Yogasana events: A. Traditional Yogasana (singles) Event - Syllabus of Seniors A for Men & Women as per new code of points of Yogasana Bharat B. Artistic Yogasana (singles) Event - Artistic Yogasana Single Event syllabus as per new code of points of Yogasana Bharat",
        "Link to refer syllabus: https://www.yogasanabharat.com/code",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: ""
      },
      contacts: [
        { name: "Mr. G. Siva Rama Krishna", phone: "+91 6309959419" },
        { name: "Ms. P. Syam Keerthi", phone: "+91 8886161616" }
      ]
    },
    "Taekwondo": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "TAEKWONDO (Men & Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Everyone should report at least 30 mins before scheduled match time.",
        "Men Weight Categories (U-54, U-58, U-63, U-68, U-74, U-80, U-87, above 87).",
        "Women Weight Categories (U-46, U-49, U-53, U-57, U-62, U-67, U-73, above 73).",
        "World Taekwondo (WT) new competition rules are applicable.",
        "Senior men and women kyorugi competitions only.",
        "All participants must come with a proper sports attire.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 1,500",
        second: "Rs. 1,000",
        third: ""
      },
      contacts: [
        { name: "Mr. U. Om Shri", phone: "+91 9347775310" },
        { name: "Ms. Ch. Jyothika", phone: "+91 6301174427" }
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
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
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
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
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
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
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
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
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
    "Kho-Kho": {
      title: "TEAM EVENTS",
      subtitle: "KHO-KHO (Men & Women)",
      rules: [
        "Team strength is 9+3 players.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Men: Rs. 30,000 | Women: Rs. 15,000",
        second: "Men: Rs. 20,000 | Women: Rs. 10,000",
        third: "Men: Rs. 7,000",
        fourth: "Men: Rs. 3,000"
      },
      contacts: [
        { name: "Mr. S. Badari Ajith", phone: "+91 9346193840" },
        { name: "Mr. N. Gopi Chandu", phone: "+91 9014360039" },
        { name: "Ms. E. Nikhitha", phone: "+91 6281464539" }
      ]
    },
    "Hockey": {
      title: "TEAM EVENTS",
      subtitle: "HOCKEY (Men & Women)",
      rules: [
        "Team strength is 7+3 players.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Men: Rs. 30,000 | Women: Rs. 15,000",
        second: "Men: Rs. 20,000 | Women: Rs. 10,000",
        third: "Men: Rs. 7,000",
        fourth: "Men: Rs. 3,000"
      },
      contacts: [
        { name: "Mr. B. Bala", phone: "+91 7981216560" },
        { name: "Mr. G. Siva Rama Krishna", phone: "+91 6309959419" },
        { name: "Ms. M. Poojitha", phone: "+91 8374697597" }
      ]
    },
    "Throw ball": {
      title: "TEAM EVENTS",
      subtitle: "THROWBALL (Women)",
      rules: [
        "Team limit is 9+1 players.",
        "The match is played as the best of 3 sets, 25+25+15 points.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Ms. P. Syam Keerthi", phone: "+91 8886161616" },
        { name: "Ms. K. Vaishnavi", phone: "+91 7729838501" },
        { name: "Ms. Ch. Bhavana", phone: "+91 9346557223" }
      ]
    },
    "Para Sports": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "PARA SPORTS (Men)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "In Para sports only two events:100Mts,400Mts (Men only) under Hand amputee, Leg amputee and visual impairment categories.",
        "Players must report at least before 30 minutes at respective grounds.",
        "All participants must come with a proper sports attire.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500"
      },
      contacts: [
        { name: "Mr. S. Badari Ajith", phone: "+91 9346193840" },
        { name: "Mr. M. Manikanta", phone: "+91 7672069471" }
      ]
    }
  };

  const culturalEventsData = {
    "Classical Dance Solo": {
      title: "DANCE",
      subtitle: "Classical Dance Solo",
      rules: [
        "The classical dance performed can be from any of the approved schools of dance, such as Kathak, Kathakali, Bharat Natyam, Manipuri, Kuchipudi, Mohiniyattam, or Odissi.",
        "Participants will be allowed up to 10 minutes, which includes preparation time. Maximum three accompanists are permissible. Audio tracks are also permitted.",
        "The selected song(s) must not appear in movies or shows. However, if an original song is present in a movie, the original composition should be used.",
        "Judgment will be based on the qualities like Tal, Technique, Rhythm, Abhinaya or Expression, Costumes, Footwork and general impression."
      ],
      prizes: {
        first: "Rs. 4000",
        second: "Rs. 3000",
        third: "Rs. 2000"
      },
      contacts: []
    },
    "Singing Idol": {
      title: "MUSIC",
      subtitle: "Singing Idol",
      rules: [
        "This competition consists a total of 4 rounds, with eliminations occurring after the first and third rounds.",
        "Any songs that may lead to controversies are not allowed.",
        "Karaoke is not allowed in the first round.",
        "Karaoke must be used mandatorily for 2nd, 3rd and 4th rounds.",
        "Medleys will not be entertained and the Karaoke tracks are to be submitted to the coordinators before the commencement of event.",
        "Judgement will be based on Pitch, Scale, and Rhythm, voice modulation, selection of song and stage presence.",
        "1st round: 2 minutes (one pallavi and one charanam without karaoke)",
        "2nd round: 3 minutes (Fast beat song with karaoke)",
        "3rd round: 3 minutes (Melody with karaoke)",
        "4th round: 5 minutes (any composition of Ilayaraja / A R Rahman / K V Mahadevan/ MM Keeravani / Mani Sharma. Karaoke is must)",
        "Promotion to the final round: Average scores from the 2nd and 3rd rounds will be utilized for promotion to the final round.",
        "Declaration of the IDOL: The final score will be calculated as a composite of 40% of the average scores from the 2nd and 3rd rounds, and 60% of the score from the 4th round performance."
      ],
      prizes: {
        first: "Rs. 4000",
        second: "Rs. 3000",
        third: "Rs. 2000"
      },
      contacts: []
    },
    "Dancing Star - Western Solo": {
      title: "DANCE",
      subtitle: "Dancing Star - Western Dance Solo",
      rules: [
        "There will be an elimination round. Max time in this round will be 2 minutes.",
        "The final round can be performed as an extension of the preliminaries or as a new composition. The maximum duration for the final performance shall not exceed 4 minutes.",
        "The use of fire (including diyas, candles, or lighters) and water is not allowed.",
        "Film song of any language can be chosen for performance, any songs that may lead to controversies are not allowed.",
        "Any audio or track that are offensive, criticising or hurt others feelings must be avoided. This includes for ex. AI generated spoofs.",
        "Judgement will be based on choreography, selection of songs, expression and overall performance."
      ],
      prizes: {
        first: "Rs. 4000",
        second: "Rs. 3000",
        third: "Rs. 2000"
      },
      contacts: []
    },
    "Group Singing": {
      title: "MUSIC",
      subtitle: "Group Singing",
      rules: [
        "A performing group must consist of a minimum of 4 singers and a maximum of 6 singers.",
        "The performance may be accompanied by either a live band (maximum of 3 accompanists) or a karaoke track.",
        "A participant (singer) is limited to performing with only one team. However, accompanists are permitted to perform with multiple teams.",
        "Folk song / Film song of any language can be chosen for performance, any songs of that may be lead to controversies are not allowed.",
        "Maximum time allowed for the group song is 5 minutes which does not include setting time. The setting time for a group shall not exceed 3 minutes.",
        "Judgement will be strictly on the basis of quality of singing only. Things like make-up, costumes and actions of the team are not considered for judgement."
      ],
      prizes: {
        first: "Rs. 5000",
        second: "Rs. 3500",
        third: "Rs. 2000"
      },
      contacts: []
    },
    "Skit": {
      title: "THEATRE & CINEMATOGRAPHY",
      subtitle: "Skit",
      rules: [
        "A minimum of 4 and a maximum of 8 participants are allowed to participate in one item.",
        "The maximum time allotted for each team is 8 minutes.",
        "The use of make-up, drapery and background music is allowed. Personal remarks, aspersions, character assassination is not allowed.",
        "Vulgarity or bitter insinuations in presentation should be avoided. Only innocent satire or humour is expected.",
        "Following the conclusion of the skit, it is essential for the team to promptly exit the stage, ensuring that all props and personal belongings they brought are removed, leaving the stage clear and uncluttered.",
        "The item will be judged basically on the qualities like theme, work on acting, script work, dialogues and overall impression."
      ],
      prizes: {
        first: "Rs. 8000",
        second: "Rs. 5000",
        third: "Rs. 4000"
      },
      contacts: []
    },
    "Dancing Jodi - Western Duo": {
      title: "DANCE",
      subtitle: "Dancing Star - Western Dance Duo",
      rules: [
        "This is a dual dance competition and must feature exactly two dancers.",
        "The choice of the genre is left to the team.",
        "The duo can be a Boy/Boy (BB), Boy/Girl (BG), or Girl/Girl (GG) pairing.",
        "The maximum duration of the performance should not exceed 4 minutes.",
        "The audio track must be submitted in pen drive to the coordinator before the event starts.",
        "The use of fire (including diyas, candles, or lighters) and water is not allowed.",
        "Film song of any language can be chosen for performance, any songs that may lead to controversies are not allowed.",
        "Any audio or track that is offensive, criticizing, or hurts others' feelings must be avoided. For example, AI-generated spoofs are not permitted.",
        "Judgement will be based on choreography, song selection, synchronization and overall performance."
      ],
      prizes: {
        first: "Rs. 4000",
        second: "Rs. 3000",
        third: "Rs. 2000"
      },
      contacts: []
    },
    "Mime": {
      title: "THEATRE & CINEMATOGRAPHY",
      subtitle: "Mime",
      rules: [
        "Minimum 3 and Maximum of 8 participants are allowed to participate in a team.",
        "Judgment will most likely be based on the qualities like idea, creativity of presentation, use of make-up, general impression.",
        "Duration of performance shall be for maximum of 5 minutes",
        "Background music with no vocals is allowed."
      ],
      prizes: {
        first: "Rs. 6000",
        second: "Rs. 4000",
        third: "Rs. 2000"
      },
      contacts: []
    },
    "Singing Jodi": {
      title: "MUSIC",
      subtitle: "Singing Jodi",
      rules: [
        "This is a Jodi singing competition (Each performance must feature exactly two singers).",
        "The number of accompanists should not exceed two. Karaoke is permitted only in the absence of accompanists.",
        "The maximum duration of the performance shall be 4 minutes.",
        "The maximum time for Stage/ Instruments setting is 3 minutes",
        "Film song of any language can be chosen for performance, any songs that may lead to controversies are not allowed.",
        "Judgment will be made on the qualities like, pitch, rhythm, coordination and general impression."
      ],
      prizes: {
        first: "Rs. 3000",
        second: "Rs. 2000",
        third: "Rs. 1000"
      },
      contacts: []
    },
    "Group Dance": {
      title: "DANCE",
      subtitle: "Group Dance Competition",
      rules: [
        "Participants are free to choose any genre, such as Bollywood, hip-hop, contemporary, salsa, classical, semi-classical, mass, and folk, etc.",
        "There should be a minimum of 4 members on the stage at any point of time and a maximum of 10 members per team.",
        "The maximum duration of performance is 6 minutes. An elimination round will be held if necessary.",
        "In case of using movie songs or movie references in the audio tracks, any sort of controversial elements is to be avoided.",
        "The use of fire (including diyas, candles, or lighters) and water is not allowed.",
        "Any audio or track that is offensive, criticizing, or hurts others' feelings must be avoided. For example, AI-generated spoofs are not permitted.",
        "Judgment will be based on the following: choreography, creativity in presentation, track selection, formations, costume, synchronization, and overall performance.",
        "Note: If the performance portrays any specific theme, it is strongly advised to avoid repetitive and routine themes, such as Kanchana etc. Themes are encouraged to be youth-centric, thought-provoking or crowd pulling."
      ],
      prizes: {
        first: "Rs. 15000",
        second: "Rs. 12000",
        third: "Rs. 8000"
      },
      contacts: []
    },
    "Short Film Making": {
      title: "THEATRE & CINEMATOGRAPHY",
      subtitle: "Short Film Making",
      rules: [
        "Submission Method: Participants must submit their short film using the Google Drive or YouTube link provided in the registration form.",
        "Deadline: The last date for submitting the short film is January 25th, 2026 by 9:00 AM.",
        "Modification: Once submitted, no further modifications to the film are allowed.",
        "Eligibility: Only short films released between March 2025 to January 2026 are eligible for the competition.",
        "Duration: The short film duration should not exceed 15 minutes, including titles and end credits.",
        "Theme: The short film may address any theme, including social issues, fiction, love, drama, or thriller.",
        "Format: The submission must be a visually engaging video, such as a vlog, documentary, or short story that incorporates camera work.",
        "Judging Criteria: The short films will be judged based on the concept, script, acting, screenplay, narration, and overall presentation."
      ],
      prizes: {
        first: "Rs. 20000",
        second: "Rs. 15000",
        third: "Rs. 12000"
      },
      contacts: []
    },
    "Haute Couture": {
      title: "FASHION COMPETITIONS",
      subtitle: "Haute Couture (Fashion Themed Ramp Walk)",
      rules: [
        "The teams should bring their own costumes and must present a theme.",
        "Teams would be awarded points on the basis of their performance in theme, Formation, Creativity in designing the Costumes & Walk.",
        "Any sort of obscenity in dressing or vulgarity in presentation will not be entertained.",
        "Any no. of teams can participate from an institute.",
        "The slot for the final event is 8 to 10 minutes.",
        "Members limit 8 to 12 for a team."
      ],
      prizes: {
        first: "Rs. 20000",
        second: "Rs. 15000",
        third: "Rs. 12000"
      },
      contacts: [
        { name: "Ms. U. Varshitha", phone: "+91 8790300977" },
        { name: "Mr. Fuzel Akther", phone: "+91 9603382796" }
      ]
    }
  };
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [activeSubModal, setActiveSubModal] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [] = useState(0);
  
  // Animation state for sections
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [timeTheme, setTimeTheme] = useState<'day' | 'evening' | 'night'>('day');
  const [signupFormData, setSignupFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    college: '',
    dateOfBirth: '',
    userType: 'participant',
    participationType: 'none',
    referenceId: '',
    state: '',
    district: ''
  });
  const [signupStep, setSignupStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [generatedUserId, setGeneratedUserId] = useState<string | null>(null);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
  const [showUserIdPopup, setShowUserIdPopup] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [resetMessage, setResetMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [showEventRegistrationModal, setShowEventRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setLoggedInUserName] = useState<string>('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [loginFormData, setLoginFormData] = useState({ identifier: '', password: '' });
  const [loginMessage, setLoginMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userProfileData, setUserProfileData] = useState<{ name: string; email: string; userId?: string; userType?: string; gender?: string }>({ name: '', email: '' });
  const [showEventChecklistModal, setShowEventChecklistModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [tempSelectedEvents, setTempSelectedEvents] = useState<Set<string>>(new Set());
  const [paraSportsSelected, setParaSportsSelected] = useState(false);
  const [regularEventsSelected, setRegularEventsSelected] = useState(false);
  const [showMyEventsModal, setShowMyEventsModal] = useState(false);
  const [userRegisteredEvents, setUserRegisteredEvents] = useState<any[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Check what gender events are currently selected
  const getSelectedEventsGender = () => {
    const selectedEventsArray = Array.from(tempSelectedEvents);
    const allEvents = [...sportsEvents, ...culturalEvents, ...paraSportsEvents];
    
    let hasMaleEvents = false;
    let hasFemaleEvents = false;
    let hasMixedEvents = false;
    
    for (const eventId of selectedEventsArray) {
      const event = allEvents.find(e => e._id === eventId);
      if (event) {
        if (event.gender === 'male') hasMaleEvents = true;
        else if (event.gender === 'female') hasFemaleEvents = true;
        else if (event.gender === 'mixed') hasMixedEvents = true;
      }
    }
    
    return { hasMaleEvents, hasFemaleEvents, hasMixedEvents };
  };

  // Check if an event should be disabled based on current selections
  const isEventDisabled = (event: Event) => {
    // If already selected, don't disable
    if (tempSelectedEvents.has(event._id)) {
      return false;
    }
    
    // If already registered for this event, disable
    if (selectedEvents.has(event._id)) {
      return true;
    }
    
    const { hasMaleEvents, hasFemaleEvents } = getSelectedEventsGender();
    const isParaSports = paraSportsEvents.some(pe => pe._id === event._id);
    
    // Para sports logic
    if (isParaSports) {
      // Para sports can't be selected if regular events are selected
      return regularEventsSelected;
    } else {
      // Regular events can't be selected if para sports are selected
      if (paraSportsSelected) {
        return true;
      }
      
      // Gender-based restrictions for regular events
      if (event.gender === 'male' && hasFemaleEvents) {
        return true; // Can't select male events if female events are selected
      }
      
      if (event.gender === 'female' && hasMaleEvents) {
        return true; // Can't select female events if male events are selected
      }
    }
    
    // Mixed events are always allowed (unless para sports conflict)
    return false;
  };

  // Filter events based on user gender - users only see events appropriate for their gender
  const filterEventsByGender = (events: Event[]) => {
    const userGender = userProfileData.gender;
    console.log('?? Filtering events - User gender:', userGender, 'User profile:', userProfileData);
    console.log('?? Events to filter:', events.length, 'events');
    
    if (userGender === 'female') {
      // Female users can only see female and mixed gender events
      const filtered = events.filter(event => 
        event.gender === 'female' || event.gender === 'mixed'
      );
      console.log('?? Female user - showing', filtered.length, 'events (female + mixed only)');
      return filtered;
    }
    
    if (userGender === 'male') {
      // Male users can only see male and mixed gender events  
      const filtered = events.filter(event => 
        event.gender === 'male' || event.gender === 'mixed'
      );
      console.log('?? Male user - showing', filtered.length, 'events (male + mixed only)');
      return filtered;
    }
    
    // For non-logged in users or other genders, show all events
    console.log('?? Non-logged user or other gender - showing all', events.length, 'events');
    return events;
  };

  // Apply gender filtering to event categories
  const getFilteredSportsEvents = () => {
    return isLoggedIn ? filterEventsByGender(sportsEvents) : sportsEvents;
  };

  const getFilteredCulturalEvents = () => {
    return isLoggedIn ? filterEventsByGender(culturalEvents) : culturalEvents;
  };

  const getFilteredParaSportsEvents = () => {
    return isLoggedIn ? filterEventsByGender(paraSportsEvents) : paraSportsEvents;
  };

  // Functions to filter cultural events by category (with gender filtering)
  const getMusicEvents = () => {
    const filteredEvents = getFilteredCulturalEvents();
    return filteredEvents.filter(event => 
      event.eventName?.toLowerCase().includes('singing') || 
      event.eventName?.toLowerCase().includes('music') ||
      event.category?.toLowerCase().includes('music')
    );
  };

  const getDanceEvents = () => {
    const filteredEvents = getFilteredCulturalEvents();
    return filteredEvents.filter(event => 
      event.eventName?.toLowerCase().includes('dance') ||
      event.category?.toLowerCase().includes('dance')
    );
  };

  const getTheatreEvents = () => {
    const filteredEvents = getFilteredCulturalEvents();
    return filteredEvents.filter(event => 
      event.eventName?.toLowerCase().includes('theatre') ||
      event.eventName?.toLowerCase().includes('drama') ||
      event.category?.toLowerCase().includes('theatre')
    );
  };

  const getLiteratureEvents = () => {
    const filteredEvents = getFilteredCulturalEvents();
    return filteredEvents.filter(event => 
      event.eventName?.toLowerCase().includes('literature') ||
      event.eventName?.toLowerCase().includes('poetry') ||
      event.eventName?.toLowerCase().includes('writing') ||
      event.category?.toLowerCase().includes('literature')
    );
  };

  const getVisualArtsEvents = () => {
    const filteredEvents = getFilteredCulturalEvents();
    return filteredEvents.filter(event => 
      event.eventName?.toLowerCase().includes('art') ||
      event.eventName?.toLowerCase().includes('painting') ||
      event.eventName?.toLowerCase().includes('photography') ||
      event.category?.toLowerCase().includes('visual')
    );
  };

  const getFashionDesignEvents = () => {
    const filteredEvents = getFilteredCulturalEvents();
    return filteredEvents.filter(event => 
      event.eventName?.toLowerCase().includes('fashion') ||
      event.eventName?.toLowerCase().includes('design') ||
      event.category?.toLowerCase().includes('fashion')
    );
  };

  const getSpotLightEvents = () => {
    const filteredEvents = getFilteredCulturalEvents();
    return filteredEvents.filter(event => 
      event.eventName?.toLowerCase().includes('spotlight') ||
      event.eventName?.toLowerCase().includes('talent') ||
      event.category?.toLowerCase().includes('spotlight')
    );
  };

  const getIndoorSportsEvents = () => {
    const filteredEvents = getFilteredSportsEvents();
    return filteredEvents.filter(event => 
      event.eventName?.toLowerCase().includes('chess') ||
      event.eventName?.toLowerCase().includes('table tennis') ||
      event.eventName?.toLowerCase().includes('badminton') ||
      event.eventName?.toLowerCase().includes('yoga') ||
      event.eventName?.toLowerCase().includes('taekwondo') ||
      event.category?.toLowerCase().includes('indoor')
    );
  };

  const getTeamSportsEvents = () => {
    const filteredEvents = getFilteredSportsEvents();
    return filteredEvents.filter(event => 
      event.eventName?.toLowerCase().includes('cricket') ||
      event.eventName?.toLowerCase().includes('football') ||
      event.eventName?.toLowerCase().includes('volleyball') ||
      event.eventName?.toLowerCase().includes('basketball') ||
      event.eventName?.toLowerCase().includes('kabaddi') ||
      event.category?.toLowerCase().includes('team')
    );
  };

  // Dynamic event cards from database (with gender filtering)
  const musicCards = convertEventsToCards(getMusicEvents());
  const danceCards = convertEventsToCards(getDanceEvents());
  const theatreCards = convertEventsToCards(getTheatreEvents());
  const literatureCards = convertEventsToCards(getLiteratureEvents());
  const visualArtsCards = convertEventsToCards(getVisualArtsEvents());
  const fashionDesignCards = convertEventsToCards(getFashionDesignEvents());
  const spotLightCards = convertEventsToCards(getSpotLightEvents());
  
  // Sports event cards (with gender filtering)
  const indoorSportsCards = convertEventsToCards(getIndoorSportsEvents());
  const teamSportsCards = convertEventsToCards(getTeamSportsEvents());
  
  // Para sports cards (with gender filtering)
  const paraSportsCards = convertEventsToCards(getFilteredParaSportsEvents());

  // Additional card assignments for compatibility
  const womenIndoorSportsCards = indoorSportsCards;
  const menTeamSportsCards = teamSportsCards;
  const womenTeamSportsCards = teamSportsCards;
  const paraAthleticsMenCards = paraSportsCards;
  const paraCricketMenCards = paraSportsCards;

  // Check if coming from Campus Ambassador with login request
  useEffect(() => {
    if (location.state?.openLogin) {
      setShowLoginModal(true);
      // Clear the state to prevent reopening on subsequent visits
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Counter animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset counters to 0 when section comes into view
            setFootfall(0);
            setColleges(0);
            setEvents(0);
            setOnlineAudience(0);
            setCashPrizes(0);
            
            // Small delay before starting animation
            setTimeout(() => {
              // Animate footfall to 20000
              let footfallCount = 0;
              const footfallInterval = setInterval(() => {
                footfallCount += 500;
                if (footfallCount >= 20000) {
                  setFootfall(20000);
                  clearInterval(footfallInterval);
                } else {
                  setFootfall(footfallCount);
                }
              }, 15);
              
              // Animate colleges to 350
              let collegesCount = 0;
              const collegesInterval = setInterval(() => {
                collegesCount += 10;
                if (collegesCount >= 350) {
                  setColleges(350);
                  clearInterval(collegesInterval);
                } else {
                  setColleges(collegesCount);
                }
              }, 15);
              
              // Animate events to 80
              let eventsCount = 0;
              const eventsInterval = setInterval(() => {
                eventsCount += 2;
                if (eventsCount >= 80) {
                  setEvents(80);
                  clearInterval(eventsInterval);
                } else {
                  setEvents(eventsCount);
                }
              }, 15);
              
              // Animate online audience to 500000
              let audienceCount = 0;
              const audienceInterval = setInterval(() => {
                audienceCount += 12500;
                if (audienceCount >= 500000) {
                  setOnlineAudience(500000);
                  clearInterval(audienceInterval);
                } else {
                  setOnlineAudience(audienceCount);
                }
              }, 15);
              
              // Animate cash prizes to 15
              let prizesCount = 0;
              const prizesInterval = setInterval(() => {
                prizesCount += 1;
                if (prizesCount >= 15) {
                  setCashPrizes(15);
                  clearInterval(prizesInterval);
                } else {
                  setCashPrizes(prizesCount);
                }
              }, 40);
            }, 100);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = getTimeLeft();

      setTime(prev => {
        setAnimate({
          days: prev.days !== newTime.days,
          hours: prev.hours !== newTime.hours,
          minutes: prev.minutes !== newTime.minutes,
          seconds: prev.seconds !== newTime.seconds,
        });

        setTimeout(() => {
          setAnimate({
            days: false,
            hours: false,
            minutes: false,
            seconds: false,
          });
        }, 400);

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Scroll tracking for throwback section - flower open/close animation
  useEffect(() => {
    // Use a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const throwbackSection = document.querySelector('[data-section-id="throwback"]');
      if (!throwbackSection) {
        console.log('Throwback section not found');
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            console.log('Throwback intersection:', entry.isIntersecting, entry.intersectionRatio);
            if (entry.isIntersecting) {
              // Section entering viewport - open flower
              setIsThrowbackUnlocked(true);
            } else {
              // Section leaving viewport - close flower
              setIsThrowbackUnlocked(false);
            }
          });
        },
        {
          threshold: 0.5, // Trigger when 50% of section is visible (half of the flower)
          rootMargin: '0px' // No margin offset
        }
      );

      observer.observe(throwbackSection);

      return () => {
        observer.disconnect();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Time-based theme detection
  useEffect(() => {
    const updateTimeTheme = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 18) {
        setTimeTheme('day');
      } else if (hour >= 18 && hour < 24) {
        setTimeTheme('evening');
      } else {
        setTimeTheme('night');
      }
    };

    updateTimeTheme();
    const interval = setInterval(updateTimeTheme, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Prevent scrolling and pause animations when photo modal is open
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
      // Add class to pause animations
      const scrollRows = document.querySelectorAll('.scroll-row');
      scrollRows.forEach(row => {
        (row as HTMLElement).style.animationPlayState = 'paused';
      });
    } else {
      document.body.style.overflow = '';
      // Resume animations
      const scrollRows = document.querySelectorAll('.scroll-row');
      scrollRows.forEach(row => {
        (row as HTMLElement).style.animationPlayState = 'running';
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPhoto]);

  // Scroll detection for sunlight effect and flower parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsScrolled(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for scroll-based animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '100px 0px -100px 0px', // Start animation 100px before, remove 100px after
      threshold: [0, 0.1, 0.5, 0.9, 1] // Multiple thresholds for better detection
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section-id');
        if (sectionId) {
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
              // Section is entering viewport - add it
              newSet.add(sectionId);
            } else if (!entry.isIntersecting || entry.intersectionRatio < 0.05) {
              // Section is leaving viewport - remove it for re-animation
              newSet.delete(sectionId);
            }
            return newSet;
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all registered sections
    sectionRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Helper function to register section refs
  const registerSection = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current.set(id, element);
    } else {
      sectionRefs.current.delete(id);
    }
  }, []);

  // Function to fetch events from API
  const fetchEvents = useCallback(async () => {
    console.log('?? Fetching events from API...');
    const userGender = isLoggedIn ? userProfileData.gender : undefined;
    console.log('?? User gender for filtering:', userGender);
    setLoadingEvents(true);
    try {
        // Test API connection first
        console.log('?? Testing API connection...');
        const testResponse = await fetch('/api/events').catch(() => null);
        if (!testResponse) {
          console.warn('?? Backend server may not be running. Using production API...');
        }

        // Fetch sports events with gender filter if user is logged in
        console.log('?? Fetching sports events...');
        const sportsResponse = await getEventsByType('sports', userGender);
        console.log('? Sports response:', sportsResponse);
        if (sportsResponse.success && sportsResponse.data) {
          setSportsEvents(sportsResponse.data);
          console.log(`? Loaded ${sportsResponse.data.length} sports events ${userGender ? `for ${userGender} users` : ''}`);
        } else {
          console.warn('?? No sports events loaded:', sportsResponse.message);
        }

        // Fetch culturals events with gender filter if user is logged in
        console.log('?? Fetching cultural events...');
        const culturalsResponse = await getEventsByType('culturals', userGender);
        console.log('?? Culturals response:', culturalsResponse);
        if (culturalsResponse.success && culturalsResponse.data) {
          setCulturalEvents(culturalsResponse.data);
          console.log(`? Loaded ${culturalsResponse.data.length} cultural events ${userGender ? `for ${userGender} users` : ''}`);
        } else {
          console.warn('?? No cultural events loaded:', culturalsResponse.message);
        }

        // Fetch para sports events with gender filter if user is logged in
        console.log('?? Fetching para sports events...');
        const paraSportsResponse = await getEventsByType('parasports', userGender);
        console.log('? Para Sports response:', paraSportsResponse);
        if (paraSportsResponse.success && paraSportsResponse.data) {
          setParaSportsEvents(paraSportsResponse.data);
          console.log(`? Loaded ${paraSportsResponse.data.length} para sports events ${userGender ? `for ${userGender} users` : ''}`);
        } else {
          console.warn('?? No para sports events loaded:', paraSportsResponse.message || paraSportsResponse.error);
        }
      } catch (error) {
        console.error('? Error fetching events:', error);
        console.log('?? Troubleshooting tips:');
        console.log('   1. Make sure backend server is running: npm start');
        console.log('   2. Check if MongoDB is connected');
        console.log('   3. Verify API endpoints are working');
      } finally {
        setLoadingEvents(false);
        console.log('? Finished loading events');
      }
  }, [isLoggedIn, userProfileData.gender]);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Refetch events when user login status or gender changes
  useEffect(() => {
    if (isLoggedIn && userProfileData.gender) {
      console.log('?? User gender detected, refetching events for:', userProfileData.gender);
      fetchEvents();
    }
  }, [isLoggedIn, userProfileData.gender, fetchEvents]);

  const handlePageMenuToggle = () => {
    setShowPageMenu(!showPageMenu);
  };

  const handleEventsInfoClick = () => {
    navigate('/events-info');
  };



  const nextSportsSlide = useCallback(() => {
    setCurrentSportsSlide((prev) => (prev + 1) % sportsDetailCards.length);
  }, [sportsDetailCards.length]);

  const prevSportsSlide = useCallback(() => {
    setCurrentSportsSlide((prev) => (prev - 1 + sportsDetailCards.length) % sportsDetailCards.length);
  }, [sportsDetailCards.length]);

  // Keyboard navigation for sports carousel
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (showSportsDetails) {
        if (event.key === 'ArrowLeft') {
          prevSportsSlide();
        } else if (event.key === 'ArrowRight') {
          nextSportsSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showSportsDetails, nextSportsSlide, prevSportsSlide]);
  
  // Touch swipe handlers for culturals carousel
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = (carouselType: 'sports' | 'culturals' | 'events') => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (carouselType === 'sports') {
      if (isLeftSwipe) {
        nextSportsSlide();
      } else if (isRightSwipe) {
        prevSportsSlide();
      }
    } else if (carouselType === 'culturals') {
      if (isLeftSwipe) {
        setCurrentCulturalsSlide((prev) => (prev + 1) % culturalsCards.length);
      } else if (isRightSwipe) {
        setCurrentCulturalsSlide((prev) => (prev - 1 + culturalsCards.length) % culturalsCards.length);
      }
    } else if (carouselType === 'events') {
      if (isLeftSwipe) {
        nextEventSlide();
      } else if (isRightSwipe) {
        prevEventSlide();
      }
    }
  };
  
  const prevEventSlide = () => {
    setCurrentEventSlide((prev) => (prev - 1 + eventInfoCards.length) % eventInfoCards.length);
  };

  const nextEventSlide = () => {
    setCurrentEventSlide((prev) => (prev + 1) % eventInfoCards.length);
  };

  // Touch swipe handling for sports carousel
  const [sportsTouchStart, setSportsTouchStart] = useState<number | null>(null);
  const [sportsTouchEnd, setSportsTouchEnd] = useState<number | null>(null);

  const handleSportsTouchStart = (e: React.TouchEvent) => {
    setSportsTouchEnd(null);
    setSportsTouchStart(e.targetTouches[0].clientX);
  };

  const handleSportsTouchMove = (e: React.TouchEvent) => {
    setSportsTouchEnd(e.targetTouches[0].clientX);
  };

  const handleSportsTouchEnd = () => {
    if (!sportsTouchStart || !sportsTouchEnd) return;
    const distance = sportsTouchStart - sportsTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSportsSlide();
    } else if (isRightSwipe) {
      prevSportsSlide();
    }
  };

  const nextIndoorSlide = () => {
    setCurrentIndoorSlide((prev) => (prev + 1) % indoorSportsCards.length);
  };

  const prevIndoorSlide = () => {
    setCurrentIndoorSlide((prev) => (prev - 1 + indoorSportsCards.length) % indoorSportsCards.length);
  };

  const nextWomenIndoorSlide = () => {
    setCurrentWomenIndoorSlide((prev) => (prev + 1) % womenIndoorSportsCards.length);
  };

  const prevWomenIndoorSlide = () => {
    setCurrentWomenIndoorSlide((prev) => (prev - 1 + womenIndoorSportsCards.length) % womenIndoorSportsCards.length);
  };

  const nextMenTeamSlide = () => {
    setCurrentMenTeamSlide((prev) => (prev + 1) % menTeamSportsCards.length);
  };

  const prevMenTeamSlide = () => {
    setCurrentMenTeamSlide((prev) => (prev - 1 + menTeamSportsCards.length) % menTeamSportsCards.length);
  };

  const nextWomenTeamSlide = () => {
    setCurrentWomenTeamSlide((prev) => (prev + 1) % womenTeamSportsCards.length);
  };

  const prevWomenTeamSlide = () => {
    setCurrentWomenTeamSlide((prev) => (prev - 1 + womenTeamSportsCards.length) % womenTeamSportsCards.length);
  };

  const nextParaSportsSlide = () => {
    setCurrentParaSportsSlide((prev) => (prev + 1) % paraSportsCards.length);
  };

  const prevParaSportsSlide = () => {
    setCurrentParaSportsSlide((prev) => (prev - 1 + paraSportsCards.length) % paraSportsCards.length);
  };

  const nextParaAthleticsSlide = () => {
    setCurrentParaAthleticsSlide((prev: number) => (prev + 1) % paraAthleticsMenCards.length);
  };

  const prevParaAthleticsSlide = () => {
    setCurrentParaAthleticsSlide((prev: number) => (prev - 1 + paraAthleticsMenCards.length) % paraAthleticsMenCards.length);
  };

  const nextParaCricketSlide = () => {
    setCurrentParaCricketSlide((prev: number) => (prev + 1) % paraCricketMenCards.length);
  };

  const prevParaCricketSlide = () => {
    setCurrentParaCricketSlide((prev: number) => (prev - 1 + paraCricketMenCards.length) % paraCricketMenCards.length);
  };

  const nextCulturalsSlide = useCallback(() => {
    setCurrentCulturalsSlide((prev: number) => (prev + 1) % culturalsCards.length);
  }, [culturalsCards.length]);

  const prevCulturalsSlide = useCallback(() => {
    setCurrentCulturalsSlide((prev: number) => (prev - 1 + culturalsCards.length) % culturalsCards.length);
  }, [culturalsCards.length]);

  // Keyboard navigation for culturals carousel
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (showCulturals) {
        if (event.key === 'ArrowLeft') {
          prevCulturalsSlide();
        } else if (event.key === 'ArrowRight') {
          nextCulturalsSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showCulturals, nextCulturalsSlide, prevCulturalsSlide]);

  const nextMusicSlide = () => {
    setCurrentMusicSlide((prev: number) => (prev + 1) % musicCards.length);
  };

  const prevMusicSlide = () => {
    setCurrentMusicSlide((prev: number) => (prev - 1 + musicCards.length) % musicCards.length);
  };

  const nextDanceSlide = () => {
    setCurrentDanceSlide((prev: number) => (prev + 1) % danceCards.length);
  };

  const prevDanceSlide = () => {
    setCurrentDanceSlide((prev: number) => (prev - 1 + danceCards.length) % danceCards.length);
  };

  const nextTheatreSlide = () => {
    setCurrentTheatreSlide((prev: number) => (prev + 1) % theatreCards.length);
  };

  const prevTheatreSlide = () => {
    setCurrentTheatreSlide((prev: number) => (prev - 1 + theatreCards.length) % theatreCards.length);
  };

  const nextLiteratureSlide = () => {
    setCurrentLiteratureSlide((prev: number) => (prev + 1) % literatureCards.length);
  };

  const prevLiteratureSlide = () => {
    setCurrentLiteratureSlide((prev: number) => (prev - 1 + literatureCards.length) % literatureCards.length);
  };

  const nextVisualArtsSlide = () => {
    setCurrentVisualArtsSlide((prev: number) => (prev + 1) % visualArtsCards.length);
  };

  const prevVisualArtsSlide = () => {
    setCurrentVisualArtsSlide((prev: number) => (prev - 1 + visualArtsCards.length) % visualArtsCards.length);
  };

  const nextFashionDesignSlide = () => {
    setCurrentFashionDesignSlide((prev: number) => (prev + 1) % fashionDesignCards.length);
  };

  const prevFashionDesignSlide = () => {
    setCurrentFashionDesignSlide((prev: number) => (prev - 1 + fashionDesignCards.length) % fashionDesignCards.length);
  };

  const nextSpotLightSlide = () => {
    setCurrentSpotLightSlide((prev: number) => (prev + 1) % spotLightCards.length);
  };

  const prevSpotLightSlide = () => {
    setCurrentSpotLightSlide((prev: number) => (prev - 1 + spotLightCards.length) % spotLightCards.length);
  };

  const handleParaSportsClick = (eventTitle: string) => {
    if (eventTitle === "Para Athletics") {
      setShowParaAthleticsMen(true);
      setShowParaSports(false);
    } else if (eventTitle === "Para Cricket Men") {
      setShowParaCricketMen(true);
      setShowParaSports(false);
    }
  };

  const handleCulturalsClick = (eventTitle: string) => {
    setShowCulturals(false);
    if (eventTitle === "Music") {
      setShowMusic(true);
    } else if (eventTitle === "Dance") {
      setShowDance(true);
    } else if (eventTitle === "Theatre") {
      setShowTheatre(true);
    } else if (eventTitle === "Literature") {
      setShowLiterature(true);
    } else if (eventTitle === "Visual Arts") {
      setShowVisualArts(true);
    } else if (eventTitle === "Fashion Design") {
      setShowFashionDesign(true);
    } else if (eventTitle === "Spot Light") {
      setShowSpotLight(true);
    }
  };

  const handleIndoorSportsClick = (eventTitle: string) => {
    if (eventTitle === "Men's Individual &") {
      setShowIndoorSports(true);
      setShowSportsDetails(false);
    } else if (eventTitle === "Women's Individual &") {
      setShowWomenIndoorSports(true);
      setShowSportsDetails(false);
    } else if (eventTitle === "Men's Team Field Sports") {
      setShowMenTeamSports(true);
      setShowSportsDetails(false);
    } else if (eventTitle === "Women's Team Field") {
      setShowWomenTeamSports(true);
      setShowSportsDetails(false);
    }
  };

  const handleEventDetailClick = (eventTitle: string) => {
    console.log('Event clicked:', eventTitle);
    
    // Create a comprehensive mapping from database event names to URL-friendly names
    const eventNameMapping: { [key: string]: string } = {
      // Chess events
      'Chess Championship': 'Chess',
      'Chess Tournament': 'Chess',
      'Chess': 'Chess',
      
      // Table Tennis events
      'Table Tennis Tournament': 'Table Tennis',
      'Table Tennis Championship': 'Table Tennis',
      'Table Tennis': 'Table Tennis',
      
      // Badminton events
      'Badminton Championship': 'Table Tennis', // Assuming same structure
      'Badminton Tournament': 'Table Tennis',
      
      // Athletics events
      'Athletics Championship': 'Men\'s Athletics',
      'Track & Field': 'Men\'s Athletics',
      
      // Taekwondo events
      'Taekwondo Championship': 'Taekwondo',
      'Taekwondo Tournament': 'Taekwondo',
      
      // Volleyball events
      'Volleyball Tournament': 'Volley ball',
      'Volleyball Championship': 'Volley ball',
      'Volley Ball Tournament': 'Volley ball',
      
      // Basketball events
      'Basketball Tournament': 'Basket ball',
      'Basketball Championship': 'Basket ball',
      'Basket Ball Tournament': 'Basket ball',
      
      // Football events
      'Football Championship': 'Football',
      'Football Tournament': 'Football',
      
      // Cricket events
      'Cricket Tournament - Men': 'Football', // Using similar team sport structure
      'Cricket Tournament - Women': 'Football',
      'Cricket Tournament': 'Football',
      'Cricket Championship': 'Football',
      
      // Kabaddi events
      'Kabaddi Tournament': 'Kabaddi',
      'Kabaddi Championship': 'Kabaddi',
      
      // Hockey events
      'Hockey Tournament': 'Hockey',
      'Hockey Championship': 'Hockey',
      
      // Kho-Kho events
      'Kho-Kho Tournament': 'Kho-Kho',
      'Kho-Kho Championship': 'Kho-Kho',
      
      // Swimming events
      'Swimming Competition': 'Men\'s Athletics', // Using individual sports structure
      'Swimming Championship': 'Men\'s Athletics',
      
      // Throwball events
      'Throwball Tournament': 'Throw ball',
      'Throwball Championship': 'Throw ball',
      
      // Tennikoit events
      'Tennikoit Tournament': 'Tennikoit',
      'Tennikoit Championship': 'Tennikoit',
      
      // Yoga events
      'Yoga Competition': 'Traditional Yogasana',
      'Traditional Yogasana Competition': 'Traditional Yogasana',
      'Artistic Yogasana Competition': 'Artistic Yogasana',
      
      // Para Sports events
      'Para Athletics': 'Para Sports',
      'Para Cricket Men': 'Para Sports',
      'Para Sports Competition': 'Para Sports',
      
      // Cultural events - Dance
      'Classical Dance Competition': 'Classical Dance Solo',
      'Classical Dance Solo': 'Classical Dance Solo',
      'Western Dance Solo': 'Dancing Star - Western Solo',
      'Dancing Star - Western Solo': 'Dancing Star - Western Solo',
      'Dancing Star - Westren Solo': 'Dancing Star - Western Solo',
      'Western Dance Duo': 'Dancing Jodi - Western Duo',
      'Dancing Jodi - Westren Duo': 'Dancing Jodi - Western Duo',
      'Dancing Jodi - Western Duo': 'Dancing Jodi - Western Duo',
      'Group Dance Competition': 'Group Dance',
      'Group Dance': 'Group Dance',
      
      // Cultural events - Music
      'Solo Singing Competition': 'Singing Idol',
      'Singing Idol': 'Singing Idol',
      'Group Singing': 'Group Singing',
      'Group Singing Competition': 'Group Singing',
      'Singing Jodi': 'Singing Jodi',
      'Singing Duo': 'Singing Jodi',
      
      // Cultural events - Theatre
      'Drama & Theatre Competition': 'Skit',
      'Skit': 'Skit',
      'Skit Competition': 'Skit',
      'Mime': 'Mime',
      'Mime Competition': 'Mime',
      'Short Film Making': 'Short Film Making',
      'Short Film Competition': 'Short Film Making',
      
      // Cultural events - Fashion
      'Fashion Show': 'Haute Couture',
      'Haute Couture': 'Haute Couture',
      'Fashion Competition': 'Haute Couture',
      
      // Other cultural events
      'Stand-up Comedy Competition': 'Singing Idol',
      'Art & Painting Exhibition': 'Singing Idol',
      'Poetry & Literature Competition': 'Singing Idol',
      'DJ & Music Production Battle': 'Singing Idol'
    };
    
    // Try to find the event name using the original title first, then the mapped title
    let eventName = eventTitle;
    if (eventNameMapping[eventTitle]) {
      eventName = eventNameMapping[eventTitle];
    } else {
      // Smart fallback: try to match based on keywords in the event title
      const lowerTitle = eventTitle.toLowerCase();
      if (lowerTitle.includes('chess')) {
        eventName = 'Chess';
      } else if (lowerTitle.includes('table tennis')) {
        eventName = 'Table Tennis';
      } else if (lowerTitle.includes('badminton')) {
        eventName = 'Table Tennis'; // Using same template
      } else if (lowerTitle.includes('football')) {
        eventName = 'Football';
      } else if (lowerTitle.includes('volleyball') || lowerTitle.includes('volley ball')) {
        eventName = 'Volley ball';
      } else if (lowerTitle.includes('basketball') || lowerTitle.includes('basket ball')) {
        eventName = 'Basket ball';
      } else if (lowerTitle.includes('kabaddi')) {
        eventName = 'Kabaddi';
      } else if (lowerTitle.includes('cricket')) {
        eventName = 'Football'; // Using team structure
      } else if (lowerTitle.includes('hockey')) {
        eventName = 'Hockey';
      } else if (lowerTitle.includes('athletics') || lowerTitle.includes('track')) {
        eventName = 'Men\'s Athletics';
      } else if (lowerTitle.includes('classical') && lowerTitle.includes('dance')) {
        eventName = 'Classical Dance Solo';
      } else if (lowerTitle.includes('western') && lowerTitle.includes('solo')) {
        eventName = 'Dancing Star - Western Solo';
      } else if (lowerTitle.includes('western') && lowerTitle.includes('duo')) {
        eventName = 'Dancing Jodi - Western Duo';
      } else if (lowerTitle.includes('group') && lowerTitle.includes('dance')) {
        eventName = 'Group Dance';
      } else if (lowerTitle.includes('singing idol')) {
        eventName = 'Singing Idol';
      } else if (lowerTitle.includes('group') && lowerTitle.includes('singing')) {
        eventName = 'Group Singing';
      } else if (lowerTitle.includes('singing') && lowerTitle.includes('jodi')) {
        eventName = 'Singing Jodi';
      } else if (lowerTitle.includes('skit')) {
        eventName = 'Skit';
      } else if (lowerTitle.includes('mime')) {
        eventName = 'Mime';
      } else if (lowerTitle.includes('short film')) {
        eventName = 'Short Film Making';
      } else if (lowerTitle.includes('haute couture') || lowerTitle.includes('fashion')) {
        eventName = 'Haute Couture';
      }
    }
    
    console.log('Mapped event name:', eventName);
    
    // Check if event data exists in either sports or cultural events before navigating
    const eventExists = eventDetailsData[eventName as keyof typeof eventDetailsData] || 
                        culturalEventsData[eventName as keyof typeof culturalEventsData];
    
    if (eventExists || eventName) {
      // Navigate to the new event detail page
      navigate(`/event/${encodeURIComponent(eventName)}`);
    } else {
      console.warn('No event details found for:', eventName);
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
    setLoginFormData({ identifier: '', password: '' });
    setLoginMessage(null);
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
    setShowLoginModal(false); // Close login modal if open
    setSignupStep(1); // Reset to step 1 when opening signup
    setSignupFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      college: '',
      dateOfBirth: '',
      userType: 'participant',
      participationType: 'none',
      referenceId: ''
    });
    setSubmitMessage(null);
  };

  const handleCloseSignup = () => {
    setShowSignupModal(false);
    setSignupStep(1);
    setSignupFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      college: '',
      dateOfBirth: '',
      userType: 'participant',
      participationType: 'none',
      referenceId: ''
    });
    setSubmitMessage(null);
    setShowUserIdPopup(false);
    setGeneratedUserId(null);
    setGeneratedPassword(null);
  };

  const handleNextStep = () => {
    if (signupStep === 1) {
      if (!signupFormData.name || !signupFormData.dateOfBirth) {
        setSubmitMessage({ type: 'error', text: 'Please fill in all required fields' });
        return;
      }
    } else if (signupStep === 2) {
      if (!signupFormData.college) {
        setSubmitMessage({ type: 'error', text: 'Please enter your college name' });
        return;
      }
    } else if (signupStep === 3) {
      if (!signupFormData.email || !signupFormData.phone) {
        setSubmitMessage({ type: 'error', text: 'Please enter your email and phone number' });
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signupFormData.email)) {
        setSubmitMessage({ type: 'error', text: 'Please enter a valid email address' });
        return;
      }
      if (signupFormData.phone && signupFormData.phone.length !== 10) {
        setSubmitMessage({ type: 'error', text: 'Please enter a valid 10-digit phone number' });
        return;
      }
    }
    setSubmitMessage(null);
    setSignupStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setSubmitMessage(null);
    setSignupStep(prev => prev - 1);
  };

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignupFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Validate required fields
    if (!signupFormData.name || !signupFormData.email || !signupFormData.dateOfBirth) {
      setSubmitMessage({
        type: 'error',
        text: 'Please fill in all required fields (Name, Email, Date of Birth)'
      });
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupFormData.email)) {
      setSubmitMessage({
        type: 'error',
        text: 'Please enter a valid email address'
      });
      setIsSubmitting(false);
      return;
    }

    // Set password as date of birth in DDMMYYYY format
    const dob = new Date(signupFormData.dateOfBirth);
    const day = String(dob.getDate()).padStart(2, '0');
    const month = String(dob.getMonth() + 1).padStart(2, '0');
    const year = dob.getFullYear();
    const password = `${day}${month}${year}`;

    // Create submission data with auto-generated password
    const submissionData = {
      ...signupFormData,
      password: password
    };

    try {
      const result = await registerUser(submissionData);
      
      if (result.success && result.data?.userId) {
        setGeneratedUserId(result.data.userId);
        setGeneratedPassword(password);
        setShowUserIdPopup(true);
        
        // Store the generated userId
        localStorage.setItem('generatedUserId', result.data.userId);
        
        // Reset form after showing popup
        setSignupFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          college: '',
          dateOfBirth: '',
          userType: 'visitor',
          participationType: 'none',
          referenceId: '',
          state: '',
          district: ''
        });
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.message || 'Registration failed. Please try again.'
        });
      }
    } catch (error: unknown) {
      console.error('Registration error:', error);
      setSubmitMessage({
        type: 'error',
        text: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseUserIdPopup = () => {
    setShowUserIdPopup(false);
    setGeneratedUserId(null);
    setGeneratedPassword(null);
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPasswordModal(false);
    setForgotPasswordEmail('');
    setResetMessage(null);
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingReset(true);
    setResetMessage(null);

    if (!forgotPasswordEmail) {
      setResetMessage({
        type: 'error',
        text: 'Please enter your email address'
      });
      setIsSendingReset(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotPasswordEmail)) {
      setResetMessage({
        type: 'error',
        text: 'Please enter a valid email address'
      });
      setIsSendingReset(false);
      return;
    }

    try {
      const result = await forgotPassword(forgotPasswordEmail);
      
      if (result.success) {
        setResetMessage({
          type: 'success',
          text: `Password recovery email sent to ${forgotPasswordEmail}. Please check your inbox!`
        });
        
        // Close modal and show login after 3 seconds
        setTimeout(() => {
          handleCloseForgotPassword();
          setShowLoginModal(true);
        }, 3000);
      } else {
        setResetMessage({
          type: 'error',
          text: result.message || 'Failed to send recovery email. Please try again.'
        });
      }
    } catch (error: unknown) {
      console.error('Password reset error:', error);
      setResetMessage({
        type: 'error',
        text: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSendingReset(false);
    }
  };

  const handleCardClick = async (cardName: string) => {
    if (cardName === 'HOME') {
      // Scroll to top for home
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowPageMenu(false);
    } else if (cardName === 'ABOUT US') {
      // Navigate to About Us page
      window.location.href = '/about-us';
    } else if (cardName === 'EVENTS') {
      // Check if user is logged in and is a participant
      if (!isLoggedIn) {
        alert('Please login to view events!');
        setShowLoginModal(true);
        return;
      }
      
      if (userProfileData.userType === 'visitor') {
        alert('You are registered as a Visitor. Only Participants can register for events. Please contact admin to upgrade your account.');
        return;
      }
      
      // Open modal immediately
      setActiveSubModal(cardName);
      
      // Fetch events and user data in background
      fetchEvents();
      if (isLoggedIn && userProfileData.userId) {
        fetchUserSavedEvents(userProfileData.userId).then(savedEventIds => {
          setTempSelectedEvents(savedEventIds);
        });
      } else {
        setTempSelectedEvents(new Set());
      }
    } else {
      setActiveSubModal(cardName);
    }
  };

  const handleCloseSubModal = () => {
    setActiveSubModal(null);
  };

  // Calculate registration price based on gender and selected events
  const calculateRegistrationPrice = (selectedEventIds: Set<string>, gender: string) => {
    const selectedEventsArray = Array.from(selectedEventIds);
    
    console.log('?? PRICE CALCULATION START');
    console.log('   - Gender:', gender);
    console.log('   - Gender type:', typeof gender);
    console.log('   - Events count:', selectedEventsArray.length);
    console.log('   - Event IDs:', selectedEventsArray);
    
    // If no events selected, return 0
    if (selectedEventsArray.length === 0) {
      console.log('   - No events selected, returning 0');
      return 0;
    }
    
    // Check if para sports events are selected
    const hasParaSports = selectedEventsArray.some(eventId => 
      paraSportsEvents.some(event => event._id === eventId)
    );
    
    if (hasParaSports) {
      console.log('   - Para sports selected - FREE');
      return 0;
    }
    
    // Check event types
    const hasSports = selectedEventsArray.some(eventId => 
      sportsEvents.some(event => event._id === eventId)
    );
    
    const hasCulturals = selectedEventsArray.some(eventId => 
      culturalEvents.some(event => event._id === eventId)
    );
    
    console.log('   - Has sports:', hasSports);
    console.log('   - Has culturals:', hasCulturals);
    console.log('   - Sports events in state:', sportsEvents.length);
    console.log('   - Cultural events in state:', culturalEvents.length);
    
    // EXPLICIT FEMALE LOGIC - ALWAYS ?250 FOR SINGLE TYPE
    const normalizedGender = gender?.toLowerCase();

    if (normalizedGender === 'female') {
      console.log('   - ? FEMALE USER DETECTED');
      
      if (hasSports && hasCulturals) {
        console.log('   - ?? Female: Sports + Culturals = ?350');
        return 350;
      }
      
      if (hasSports && !hasCulturals) {
        console.log('   - ?? Female: Sports ONLY = ?250');
        return 250;
      }
      
      if (hasCulturals && !hasSports) {
        console.log('   - ?? Female: Culturals ONLY = ?250');
        return 250;
      }
      
      console.log('   - ? Female user but no sports/culturals detected');
    }
    
    // MALE LOGIC
    if (normalizedGender === 'male') {
      console.log('   - ? MALE USER DETECTED');
      
      if (hasSports && hasCulturals) {
        console.log('   - ?? Male: Sports + Culturals = ?350');
        return 350;
      }
      
      if (hasSports && !hasCulturals) {
        console.log('   - ?? Male: Sports ONLY = ?350');
        return 350;
      }
      
      if (hasCulturals && !hasSports) {
        console.log('   - ?? Male: Culturals ONLY = ?250');
        return 250;
      }
    }
    
    // Fallback for users without gender info - charge as per event mix
    if (hasSports && hasCulturals) {
      console.log('   - ?? Fallback: Sports + Culturals = ?350');
      return 350;
    }
    if (hasSports) {
      console.log('   - ?? Fallback: Sports only = ?350');
      return 350;
    }
    if (hasCulturals) {
      console.log('   - ?? Fallback: Culturals only = ?250');
      return 250;
    }

    console.log('   - ? FALLBACK: Defaulting to ?0');
    console.log('?? PRICE CALCULATION END');
    return 0;
  };

  // Handle registration with pricing confirmation
  const handleRegisterForEvents = async () => {
    if (!isLoggedIn) {
      alert('Please login to register for events!');
      setShowLoginModal(true);
      handleCloseSubModal();
      return;
    }
    
    if (userProfileData.userType === 'visitor') {
      alert('You are registered as a Visitor. Only Participants can register for events. Please contact admin to upgrade your account.');
      return;
    }
    
    if (tempSelectedEvents.size === 0) {
      alert('Please select at least one event!');
      return;
    }

    const eventIds = Array.from(tempSelectedEvents);
    const userGender = userProfileData.gender || 'male'; // Default to male if not specified
    const totalAmount = calculateRegistrationPrice(tempSelectedEvents, userGender);
    
    // Get selected event names
    const allEvents = [...sportsEvents, ...culturalEvents, ...paraSportsEvents];
    const selectedEventNames = eventIds.map(eventId => {
      const event = allEvents.find(e => e._id === eventId);
      return event ? event.eventName : 'Unknown Event';
    });

    // Create confirmation message
    const eventsList = selectedEventNames.map((name, index) => `${index + 1}. ${name}`).join('\n');
    const priceText = totalAmount === 0 ? 'FREE' : `?${totalAmount}`;
    
    const confirmationMessage = `
?? REGISTRATION CONFIRMATION
????????????????????????????

?? Selected Events (${eventIds.length}):
${eventsList}

?? Participant: ${userProfileData.name}
? Gender: ${userGender}
?? Total Amount: ${priceText}

????????????????????????????

Do you want to proceed with registration?`;

    const confirmed = window.confirm(confirmationMessage);
    
    if (!confirmed) {
      return;
    }

    try {
      const result = await saveMyEvents(userProfileData.userId!, eventIds);
      
      if (result.success) {
        const savedEventIds = await fetchUserSavedEvents(userProfileData.userId!);
        setTempSelectedEvents(savedEventIds); // Keep the registered events selected
        handleCloseSubModal();
        
        const successMessage = totalAmount === 0 
          ? `? Successfully registered for ${eventIds.length} event(s) for FREE!`
          : `? Successfully registered for ${eventIds.length} event(s)! Total amount: ?${totalAmount}`;
          
        alert(successMessage);
      } else {
        alert(result.message || 'Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error registering for events:', error);
      alert('An error occurred while registering.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUserName('');
    setShowProfileDropdown(false);
    setUserProfileData({ name: '', email: '' });
    setMyEvents([]);
    setSelectedEvents(new Set());
    // Clear any stored user data from localStorage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('isLoggedIn');
    
    // Redirect to main page
    window.location.href = '/';
  };


  const handleCloseProfile = () => {
    setShowProfileModal(false);
  };

  const handleOpenProfile = async () => {
    if (!userProfileData.userId) {
      return;
    }
    
    setShowProfileModal(true);
    setIsLoadingProfile(true);
    
    try {
      // Fetch user's registered events
      const registrationsResult = await getUserRegisteredEvents(userProfileData.userId);
      console.log('📊 Registered events result:', registrationsResult);
      
      if (registrationsResult.success && registrationsResult.data) {
        setUserRegisteredEvents(registrationsResult.data.registeredEvents || []);
      } else {
        setUserRegisteredEvents([]);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setUserRegisteredEvents([]);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleCloseEventChecklist = () => {
    setShowEventChecklistModal(false);
  };

  const handleToggleEventSelection = (eventId: string) => {
    const newSelected = new Set(selectedEvents);
    if (newSelected.has(eventId)) {
      newSelected.delete(eventId);
    } else {
      newSelected.add(eventId);
    }
    setSelectedEvents(newSelected);
  };

  const handleSaveSelectedEvents = async () => {
    if (!userProfileData.userId) {
      alert('Please login to save events!');
      return;
    }

    const eventIds = Array.from(selectedEvents);
    
    try {
      const result = await saveMyEvents(userProfileData.userId, eventIds);
      
      if (result.success) {
        // Fetch updated saved events from database
        await fetchUserSavedEvents(userProfileData.userId);
        setShowEventChecklistModal(false);
        alert(`? Successfully saved and registered for ${eventIds.length} event(s)!`);
      } else {
        alert(result.message || 'Failed to save events. Please try again.');
      }
    } catch (error) {
      console.error('Error saving events:', error);
      alert('An error occurred while saving events.');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginMessage(null);

    // Validate required fields
    if (!loginFormData.identifier || !loginFormData.password) {
      setLoginMessage({
        type: 'error',
        text: 'Please enter email/userId and password'
      });
      setIsLoggingIn(false);
      return;
    }

    try {
      // Call the real login API
      const result = await loginUser(loginFormData.identifier, loginFormData.password);
      
      if (result.success && result.data) {
        const { userId, name, email, userType = 'visitor', gender } = result.data;
        console.log('?? Login success - User data:', { userId, name, email, userType, gender });
        
        // Ensure all required fields are present
        if (!userId || !name || !email) {
          setLoginMessage({
            type: 'error',
            text: 'Invalid response from server. Please try again.'
          });
          setIsLoggingIn(false);
          return;
        }
        
        setIsLoggedIn(true);
        setLoggedInUserName(name);
        
        // Store user profile data
        const profileData = {
          name: name,
          email: email,
          userId: userId,
          userType: userType || 'visitor',
          gender: gender // No default value
        };
        setUserProfileData(profileData);
        console.log('?? Storing user profile:', profileData);
        
        setShowLoginModal(false);
        setLoginFormData({ identifier: '', password: '' });
        
        // Store in localStorage
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userType', userType || 'visitor');
        if (gender) {
          localStorage.setItem('userGender', gender);
        }
        localStorage.setItem('isLoggedIn', 'true');
        
        // Fetch user's saved events from database
        await fetchUserSavedEvents(userId);
      } else {
        setLoginMessage({
          type: 'error',
          text: result.message || 'Login failed. Please check your credentials.'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginMessage({
        type: 'error',
        text: 'An error occurred during login. Please try again.'
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Check if user is already logged in on component mount
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedUserEmail = localStorage.getItem('userEmail'); 
    const storedUserId = localStorage.getItem('userId');
    const storedUserType = localStorage.getItem('userType');
    const storedUserGender = localStorage.getItem('userGender');
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    
    if (storedLoginStatus === 'true' && storedUserName && storedUserId) {
      setIsLoggedIn(true);
      setLoggedInUserName(storedUserName);
      const profileData = {
        name: storedUserName,
        email: storedUserEmail || '',
        userId: storedUserId,
        userType: storedUserType || 'visitor',
        gender: storedUserGender || undefined // Convert null to undefined
      };
      setUserProfileData(profileData);
      console.log('?? Loading user profile from localStorage:', profileData);
      
      // Fetch user's saved events from database
      if (storedUserId) {
        fetchUserSavedEvents(storedUserId);
      }
    }
  }, []);
  const fetchUserSavedEvents = async (userId: string): Promise<Set<string>> => {
    try {
      const result = await getMyEvents(userId);
      if (result.success && result.data) {
        setMyEvents(result.data);
        const savedEventIds = new Set<string>(result.data.map((e: Event) => e._id));
        setSelectedEvents(savedEventIds);
        return savedEventIds; // Return the event IDs for immediate use
      }
    } catch (error) {
      console.error('Error fetching saved events:', error);
    }
    return new Set<string>(); // Return empty set if failed
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showProfileDropdown && !target.closest('.user-profile-wrapper')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  return (
    <div className={`dashboard-container w-screen overflow-x-hidden relative font-sans min-h-screen ${timeTheme}-theme`}
         style={{background: "transparent", maxWidth: "100vw", overflowX: "hidden", position: "relative", padding: "0", margin: "0"}}>
      
      {/* Sunlight Effect */}
      <div className={`sunlight-effect ${isScrolled ? 'active' : ''}`}>
        <div className="sunlight-rays ray-1"></div>
        <div className="sunlight-rays ray-2"></div>
        <div className="sunlight-rays ray-3"></div>
      </div>

      {/* Shimmer Overlay */}
      <div className={`shimmer-overlay ${isScrolled ? 'active' : ''}`}></div>

      {/* Top-Left Menu Icon - Only show when menu is closed */}
      {!showPageMenu && (
        <>
          <div className="fixed top-5 left-5 z-60 cursor-pointer" onClick={handlePageMenuToggle}>
            <div className="w-8 h-8 flex flex-col justify-around items-center transition-transform duration-300">
              <span className="block w-full h-0.5 rounded transition-all duration-300 bg-yellow-400" style={{backgroundColor: '#fdee71'}}></span>
              <span className="block w-full h-0.5 rounded transition-all duration-300 bg-yellow-400" style={{backgroundColor: '#fdee71'}}></span>
              <span className="block w-full h-0.5 rounded transition-all duration-300 bg-yellow-400" style={{backgroundColor: '#fdee71'}}></span>
            </div>
          </div>
          
          {/* Gaurada Image beside hamburger */}
          <div className="absolute top-1 left-16 z-60">
            <img 
              src={`${import.meta.env.BASE_URL}Garuda.avif`}
              alt="Garuda"
              className="h-20 w-auto object-contain"
            />
          </div>
        </>
      )}

      {/* Top-Right Vignan Logo - Only show on main dashboard (hide when menu, modals, or submodals are open) */}
      {!showPageMenu && !activeSubModal && !showLoginModal && !showSignupModal && !showProfileModal && !showMyEventsModal && !showForgotPasswordModal && (
        <div className="vignan-logo-top" style={{ position: 'absolute' }}>
          <img 
            src={`${import.meta.env.BASE_URL}Vignan-logo.avif`}
            alt="Vignan Logo"
            className="vignan-logo-img"
          />
        </div>
      )}
     
      {/* 1. Hero Section (First Fold) - Moved to Top */}
      <section className="relative min-h-screen flex flex-col items-center justify-center lg:justify-start lg:pt-48 xl:pt-48 z-10 text-white text-center overflow-hidden" style={{background: "transparent"}} >
        {/* National Level Youth Festival Text - Positioned absolutely */}
        <div className="absolute top-32 sm:top-20 left-0 right-0 z-20 w-full px-4 pt-8">
          <h2 className="text-white text-sm md:text-lg font-semibold" style={{
            fontFamily: 'serif',
            letterSpacing: '0.05em',
            textAlign: 'left',
            paddingLeft: '22%',
            marginBottom: '0'
          }}>
            A National Level Youth Festival - 19<sup>th</sup> Edition
          </h2>
        </div>
        
        <div className="flex justify-center items-center z-20 relative w-full px-0" style={{marginTop: "0px"}}>
          <img src={`${import.meta.env.BASE_URL}image.png`} alt="Vignan Mahotsav" className="w-[95%] sm:w-full max-w-none md:w-[95%] md:max-w-8xl lg:w-[92%] xl:w-[90%] object-contain bg-transparent border-none shadow-none animate-fadeInDown" style={{width: "80%", height: "90%", maxWidth: "none", marginLeft: "5%", marginRight: "0"}} />
        </div>
        <style>{`
          /* Responsive adjustments handled by Tailwind classes in JSX */
          
          section {
            position: relative;
            z-index: 20 !important;
          }
        `}</style>
        
        {/* Action Buttons - Register for events and login when not logged in */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 mt-16 sm:mt-20 mb-4 justify-center items-center z-20 relative px-4 w-full">
          {isLoggedIn ? (
            <button className="w-36 sm:w-48 sm:max-w-none md:w-52 lg:w-56 xl:w-60 min-h-[48px] bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white rounded-2xl text-base sm:text-lg md:text-xl font-semibold cursor-pointer transition-all duration-300 border-4 border-transparent hover:border-[#FFD700] hover:-translate-y-1 hover:shadow-lg active:scale-95 flex items-center justify-center touch-manipulation" onClick={() => {
              // Open modal immediately
              setActiveSubModal('EVENTS');
              // Fetch events in background
              if (isLoggedIn && userProfileData.userId) {
                fetchUserSavedEvents(userProfileData.userId).then(savedEventIds => {
                  setTempSelectedEvents(savedEventIds);
                });
              } else {
                setTempSelectedEvents(new Set());
              }
              fetchEvents();
            }}>Register for Events</button>
          ) : (
            <button className="w-36 sm:w-48 sm:max-w-none md:w-52 lg:w-56 xl:w-60 min-h-[48px] bg-linear-to-r from-pink-500 to-pink-600 text-white rounded-2xl text-base sm:text-lg md:text-xl font-semibold cursor-pointer transition-all duration-300 hover:from-pink-600 hover:to-pink-700 hover:-translate-y-1 hover:shadow-lg active:scale-95 flex items-center justify-center touch-manipulation" onClick={handleLoginClick}>Register/Login</button>
          )}
        </div>
      </section>

      {/* The Icon Component - Fixed position flower - Hide in Gallery and Throwback sections */}
      {!visibleSections.has('throwback') && !visibleSections.has('throwbacks') && <AnimatedIcon />}

      {/* Full Screen Grid Menu Overlay */}
      {showPageMenu && (
        <div className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat overflow-visible" 
          style={{
            backgroundImage: 'url("/Background-redesign.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            zIndex: 99998
          }}>
          {/* Floating Flower - Top Right */}
          <div className="fixed -top-32 -right-32 md:-top-64 md:-right-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-[1]" style={{ border: 'none', outline: 'none' }}>
            <div className="flower-inner" style={{ animation: 'spin-slow 120s linear infinite', transformOrigin: 'center center', border: 'none', outline: 'none' }}>
              <FlowerComponent 
                size="100%"
                sunSize="50%"
                moonSize="43%"
                sunTop="25%"
                sunLeft="25%"
                moonTop="28.5%"
                moonLeft="28.5%"
                showPetalRotation={true}
                opacity={1}
              />
            </div>
          </div>

          {/* Floating Flower - Bottom Left */}
          <div className="fixed -bottom-32 -left-32 md:-bottom-64 md:-left-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-[1]" style={{ border: 'none', outline: 'none' }}>
            <div className="flower-inner" style={{ animation: 'spin-slow 120s linear infinite', transformOrigin: 'center center', border: 'none', outline: 'none' }}>
              <FlowerComponent 
                size="100%"
                sunSize="50%"
                moonSize="43%"
                sunTop="25%"
                sunLeft="25%"
                moonTop="28.5%"
                moonLeft="28.5%"
                showPetalRotation={true}
                opacity={1}
              />
            </div>
          </div>
          
          {/* Menu Title */}
          <div className="text-center" style={{marginTop: "30px", paddingBottom: "2px"}}>
            <h1 className="menu-title-heading text-4xl md:text-6xl font-bold text-white tracking-widest" style={{textShadow: '0 4px 12px rgba(0,0,0,0.3)', fontFamily: 'coffee+tea demo, sans-serif !important'}}>MENU</h1>
          </div>

          {/* Grid Menu Items - Scrollable Container */}
          <div className="overflow-y-auto overflow-x-hidden h-[calc(100vh-140px)] px-4 md:px-6" style={{marginTop: "-90px"}}>
            <div className="max-w-5xl mx-auto py-4 md:py-6 flex items-center justify-center min-h-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {/* Back Button - positioned above HOME card */}
              <div className="col-span-2 md:col-span-4 flex justify-start mb-2" style={{ marginLeft: '-190px' }}>
                <button
                  onClick={() => setShowPageMenu(false)}
                  className="w-32 h-16 flex items-center justify-center bg-transparent border-none cursor-pointer transition-all duration-300 hover:scale-110"
                  aria-label="Go back"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}BackButton.svg`}
                    alt="Back"
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>
              {/* HOME */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[130px] border border-white/20 group"
                onClick={() => { handleCardClick('HOME'); setShowPageMenu(false); }}
                 style={{ 
                  transformStyle: 'preserve-3d'
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <img src="/home.svg" alt="Home" className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-125" />
                <span className="text-white text-lg font-semibold tracking-wide">HOME</span>
              </div>

              {/* EVENTS */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[130px] border border-white/20 group"
                onClick={handleEventsInfoClick}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <img src="/events.svg" alt="Events" className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-125" />
                <span className="text-white text-lg font-semibold tracking-wide" style={{fontFamily: 'Woodtrap, sans-serif'}}>EVENTS</span>
              </div>

              {/* PROFILE */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[130px] border border-white/20 group"
                onClick={(e) => { e.preventDefault(); setActiveSubModal('PROFILE'); setShowPageMenu(false); }}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <img src="/profile.svg" alt="Profile" className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-125" />
                <span className="text-white text-lg font-semibold tracking-wide">PROFILE</span>
              </div>

              {/* SCHEDULE */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[130px] border border-white/20 group"
                onClick={() => { 
                  navigate('/schedule');
                  setShowPageMenu(false); 
                }}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <img src="/Schedule.svg" alt="Schedule" className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-125" />
                <span className="text-white text-lg font-semibold tracking-wide">SCHEDULE</span>
              </div>

              {/* COLLABORATION */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[130px] border border-white/20 group"
                onClick={() => { 
                  navigate('/collaboration');
                  setShowPageMenu(false); 
                }}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <img src="/collaboration.svg" alt="Collaboration" className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-125" />
                <span className="text-white text-lg font-semibold tracking-wide">COLLABORATION</span>
              </div>

              {/* ZONALS */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[130px] border border-white/20 group"
                onClick={() => { 
                  navigate('/zonals');
                  setShowPageMenu(false); 
                }}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <img src="/zonals.svg" alt="Zonals" className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-125" />
                <span className="text-white text-lg font-semibold tracking-wide">ZONALS</span>
              </div>

              {/* PARA SPORTS */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[130px] border border-white/20 group"
                onClick={() => { 
                  navigate('/para-sports');
                  setShowPageMenu(false); 
                }}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <img src="/para sports.svg" alt="Para Sports" className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-125" />
                <span className="text-white text-lg font-semibold tracking-wide">PARA SPORTS</span>
              </div>

              {/* HOSPITALITY */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[130px] border border-white/20 group"
                onClick={() => { 
                  navigate('/hospitality');
                  setShowPageMenu(false); 
                }}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <img src="/hospitality.svg" alt="Hospitality" className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-125" />
                <span className="text-white text-lg font-semibold tracking-wide">HOSPITALITY</span>
              </div>

              {/* CAMPUS AMBASSADOR */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[130px] border border-white/20 group"
                onClick={() => { navigate('/campus-ambassador'); setShowPageMenu(false); }}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <img src="/campus ambassador.svg" alt="Campus Ambassador" className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-125" />
                <span className="text-white text-lg font-semibold tracking-wide">CAMPUS AMBASSADOR</span>
              </div>

              {/* SPONSORS */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[130px] border border-white/20 group"
                onClick={() => { 
                  navigate('/sponsors');
                  setShowPageMenu(false); 
                }}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <img src="/Sponsership.svg" alt="Sponsors" className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-125" />
                <span className="text-white text-lg font-semibold tracking-wide">SPONSORS</span>
              </div>

              {/* OUR TEAM */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[130px] border border-white/20 group"
                onClick={() => { 
                  navigate('/our-team');
                  setShowPageMenu(false); 
                }}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <img src="/team.svg" alt="Our Team" className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-125" />
                <span className="text-white text-lg font-semibold tracking-wide">OUR TEAM</span>
              </div>

              {/* MAP */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[130px] border border-white/20 group"
                onClick={() => { 
                  navigate('/campus-map');
                  setShowPageMenu(false); 
                }}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <img src="/17.svg" alt="Map" className="w-16 h-16 mb-4 object-contain transition-transform duration-300 group-hover:scale-125" />
                <span className="text-white text-lg font-semibold tracking-wide">MAP</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Para Sports Section - appears when clicking PARA SPORTS */}
      {showParaSports && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowParaSports(false); setShowPageMenu(true); }}>
                  ? Back
                </button>
                <h2>PARA SPORTS CATEGORIES</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowParaSports(false); setShowPageMenu(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevParaSportsSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: Math.min(3, paraSportsCards.length) }).map((_, index) => {
                  const cardIndex = (currentParaSportsSlide + index) % paraSportsCards.length;
                  const card = paraSportsCards[cardIndex];
                  return (
                    <div 
                      key={cardIndex} 
                      className="indoor-sport-card"
                      onClick={() => handleParaSportsClick(card.title)}
                    >
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">SPORTS POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && (
                          <h4>{card.subtitle}</h4>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextParaSportsSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {paraSportsCards.map((_, index) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentParaSportsSlide ? 'active' : ''}`}
                  onClick={() => setCurrentParaSportsSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Para Athletics Men Section - appears when clicking Para Athletics */}
      {showParaAthleticsMen && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowParaAthleticsMen(false); setShowParaSports(true); }}>
                  ? Back
                </button>
                <h2>PARA ATHLETICS MEN</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowParaAthleticsMen(false); setShowParaSports(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevParaAthleticsSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: Math.min(3, paraAthleticsMenCards.length) }).map((_, index) => {
                  const cardIndex = (currentParaAthleticsSlide + index) % paraAthleticsMenCards.length;
                  const card = paraAthleticsMenCards[cardIndex];
                  return (
                    <div 
                      key={cardIndex} 
                      className="indoor-sport-card"
                    >
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">SPORTS POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && (
                          <h4>{card.subtitle}</h4>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextParaAthleticsSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {paraAthleticsMenCards.map((_: unknown, index: number) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentParaAthleticsSlide ? 'active' : ''}`}
                  onClick={() => setCurrentParaAthleticsSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Para Cricket Men Section - appears when clicking Para Cricket Men */}
      {showParaCricketMen && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowParaCricketMen(false); setShowParaSports(true); }}>
                  ? Back
                </button>
                <h2>PARA CRICKET MEN</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowParaCricketMen(false); setShowParaSports(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevParaCricketSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: Math.min(3, paraCricketMenCards.length) }).map((_, index) => {
                  const cardIndex = (currentParaCricketSlide + index) % paraCricketMenCards.length;
                  const card = paraCricketMenCards[cardIndex];
                  return (
                    <div 
                      key={cardIndex} 
                      className="indoor-sport-card"
                    >
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">SPORTS POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && (
                          <h4>{card.subtitle}</h4>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextParaCricketSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {paraCricketMenCards.map((_: unknown, index: number) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentParaCricketSlide ? 'active' : ''}`}
                  onClick={() => setCurrentParaCricketSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Culturals Section - appears when clicking CULTURALS */}
      {showCulturals && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowCulturals(false); setShowPageMenu(true); }}>
                  ? Back
                </button>
                <h2>CULTURAL CATEGORIES</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowCulturals(false); setShowPageMenu(true); }}>�</button>
            </div>
            <div className="culturals-navigation">
              <button className="culturals-nav-btn prev" onClick={prevCulturalsSlide}>?</button>
              <div 
                className="culturals-carousel-3d-container"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={() => onTouchEnd('culturals')}
              >
                <div className="culturals-carousel-3d-wrapper">
                  {culturalsCards.map((card, index) => {
                    const isActive = index === currentCulturalsSlide;
                    const offset = index - currentCulturalsSlide;
                    
                    let transform = '';
                    let zIndex = 0;
                    let opacity = 0;
                    let filter = 'grayscale(100%) brightness(0.5)';
                    
                    if (offset === 0) {
                      // Active card - center front of semicircle
                      transform = 'translateX(0) translateY(0) translateZ(250px) rotateY(0deg) scale(1.08)';
                      zIndex = 10;
                      opacity = 1;
                      filter = 'none';
                    } else if (offset === 1 || offset === -culturalsCards.length + 1) {
                      // Right card - arc position
                      transform = 'translateX(55%) translateY(12%) translateZ(-180px) rotateY(-42deg) scale(0.78)';
                      zIndex = 8;
                      opacity = 0.55;
                      filter = 'brightness(0.35)';
                    } else if (offset === -1 || offset === culturalsCards.length - 1) {
                      // Left card - arc position
                      transform = 'translateX(-55%) translateY(12%) translateZ(-180px) rotateY(42deg) scale(0.78)';
                      zIndex = 8;
                      opacity = 0.55;
                      filter = 'brightness(0.35)';
                    } else if (offset === 2 || offset === -culturalsCards.length + 2) {
                      // Far right card
                      transform = 'translateX(85%) translateY(20%) translateZ(-350px) rotateY(-55deg) scale(0.6)';
                      zIndex = 6;
                      opacity = 0.35;
                      filter = 'brightness(0.25)';
                    } else if (offset === -2 || offset === culturalsCards.length - 2) {
                      // Far left card
                      transform = 'translateX(-85%) translateY(20%) translateZ(-350px) rotateY(55deg) scale(0.6)';
                      zIndex = 6;
                      opacity = 0.35;
                      filter = 'brightness(0.25)';
                    } else if (offset > 0) {
                      // Far right hidden
                      transform = 'translateX(100%) translateY(25%) translateZ(-500px) rotateY(-65deg) scale(0.5)';
                      zIndex = 1;
                      opacity = 0.15;
                      filter = 'brightness(0.2)';
                    } else {
                      // Far left hidden
                      transform = 'translateX(-100%) translateY(25%) translateZ(-500px) rotateY(65deg) scale(0.5)';
                      zIndex = 1;
                      opacity = 0.15;
                      filter = 'brightness(0.2)';
                    }
                    
                    return (
                      <div 
                        key={index} 
                        className={`cultural-card-3d ${isActive ? 'active' : ''}`}
                        onClick={isActive ? () => handleCulturalsClick(card.title) : () => setCurrentCulturalsSlide(index)}
                        style={{
                          transform,
                          zIndex,
                          opacity,
                          filter,
                          cursor: 'pointer'
                        }}
                      >
                        <div className="cultural-card-poster-background">
                          <span className="cultural-poster-placeholder-text">CULTURAL POSTER</span>
                        </div>
                        <div className="cultural-card-title-overlay">
                          <h3>{card.title}</h3>
                          {card.subtitle && (
                            <h4>{card.subtitle}</h4>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button className="culturals-nav-btn next" onClick={nextCulturalsSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {culturalsCards.map((_: typeof culturalsCards[0], index: number) => (
                <button
                  key={index}
                  className={`culturals-indicator ${index === currentCulturalsSlide ? 'active' : ''}`}
                  onClick={() => setCurrentCulturalsSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Music Section */}
      {showMusic && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowMusic(false); setShowCulturals(true); }}>
                  ? Back
                </button>
                <h2 className="event-category-heading">MUSIC EVENTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowMusic(false); setShowCulturals(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevMusicSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: Math.min(3, musicCards.length) }).map((_, index) => {
                  const cardIndex = (currentMusicSlide + index) % musicCards.length;
                  const card = musicCards[cardIndex];
                  return (
                    <div key={cardIndex} className="indoor-sport-card">
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">MUSIC POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && <h4>{card.subtitle}</h4>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextMusicSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {musicCards.map((_: unknown, index: number) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentMusicSlide ? 'active' : ''}`}
                  onClick={() => setCurrentMusicSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dance Section */}
      {showDance && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowDance(false); setShowCulturals(true); }}>
                  ? Back
                </button>
                <h2 className="event-category-heading">DANCE EVENTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowDance(false); setShowCulturals(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevDanceSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: Math.min(3, danceCards.length) }).map((_, index) => {
                  const cardIndex = (currentDanceSlide + index) % danceCards.length;
                  const card = danceCards[cardIndex];
                  return (
                    <div key={cardIndex} className="indoor-sport-card">
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">DANCE POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && <h4>{card.subtitle}</h4>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextDanceSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {danceCards.map((_: unknown, index: number) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentDanceSlide ? 'active' : ''}`}
                  onClick={() => setCurrentDanceSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Theatre & Cinematography Section */}
      {showTheatre && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowTheatre(false); setShowCulturals(true); }}>
                  ? Back
                </button>
                <h2>THEATRE & CINEMATOGRAPHY</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowTheatre(false); setShowCulturals(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevTheatreSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: Math.min(3, theatreCards.length) }).map((_, index) => {
                  const cardIndex = (currentTheatreSlide + index) % theatreCards.length;
                  const card = theatreCards[cardIndex];
                  return (
                    <div key={cardIndex} className="indoor-sport-card">
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">THEATRE POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && <h4>{card.subtitle}</h4>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextTheatreSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {theatreCards.map((_: unknown, index: number) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentTheatreSlide ? 'active' : ''}`}
                  onClick={() => setCurrentTheatreSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Literature Section */}
      {showLiterature && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowLiterature(false); setShowCulturals(true); }}>
                  ? Back
                </button>
                <h2 className="event-category-heading">LITERATURE EVENTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowLiterature(false); setShowCulturals(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevLiteratureSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: Math.min(3, literatureCards.length) }).map((_, index) => {
                  const cardIndex = (currentLiteratureSlide + index) % literatureCards.length;
                  const card = literatureCards[cardIndex];
                  return (
                    <div key={cardIndex} className="indoor-sport-card">
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">LITERATURE POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && <h4>{card.subtitle}</h4>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextLiteratureSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {literatureCards.map((_: unknown, index: number) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentLiteratureSlide ? 'active' : ''}`}
                  onClick={() => setCurrentLiteratureSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Visual Arts & Craft Section */}
      {showVisualArts && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowVisualArts(false); setShowCulturals(true); }}>
                  ? Back
                </button>
                <h2>VISUAL ARTS & CRAFT</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowVisualArts(false); setShowCulturals(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevVisualArtsSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: Math.min(3, visualArtsCards.length) }).map((_, index) => {
                  const cardIndex = (currentVisualArtsSlide + index) % visualArtsCards.length;
                  const card = visualArtsCards[cardIndex];
                  return (
                    <div key={cardIndex} className="indoor-sport-card">
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">VISUAL ARTS POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && <h4>{card.subtitle}</h4>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextVisualArtsSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {visualArtsCards.map((_: unknown, index: number) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentVisualArtsSlide ? 'active' : ''}`}
                  onClick={() => setCurrentVisualArtsSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fashion Design & Styling Section */}
      {showFashionDesign && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowFashionDesign(false); setShowCulturals(true); }}>
                  ? Back
                </button>
                <h2>FASHION DESIGN & STYLING</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowFashionDesign(false); setShowCulturals(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevFashionDesignSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: Math.min(3, fashionDesignCards.length) }).map((_, index) => {
                  const cardIndex = (currentFashionDesignSlide + index) % fashionDesignCards.length;
                  const card = fashionDesignCards[cardIndex];
                  return (
                    <div key={cardIndex} className="indoor-sport-card">
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">FASHION POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && <h4>{card.subtitle}</h4>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextFashionDesignSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {fashionDesignCards.map((_: unknown, index: number) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentFashionDesignSlide ? 'active' : ''}`}
                  onClick={() => setCurrentFashionDesignSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spot Light Section */}
      {showSpotLight && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowSpotLight(false); setShowCulturals(true); }}>
                  ? Back
                </button>
                <h2 className="event-category-heading">SPOT LIGHT EVENTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowSpotLight(false); setShowCulturals(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevSpotLightSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: Math.min(3, spotLightCards.length) }).map((_, index) => {
                  const cardIndex = (currentSpotLightSlide + index) % spotLightCards.length;
                  const card = spotLightCards[cardIndex];
                  return (
                    <div key={cardIndex} className="indoor-sport-card">
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">SPOTLIGHT POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && <h4>{card.subtitle}</h4>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextSpotLightSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {spotLightCards.map((_: unknown, index: number) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentSpotLightSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSpotLightSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sports Details Section - appears after clicking sports */}
      {showSportsDetails && (
        <section className="inline-sports-details-section">
          <div className="inline-sports-details-container">
            <div className="inline-sports-details-header">
              <div className="sports-header-left">
                <button className="circular-back-button" onClick={() => { setShowSportsDetails(false); setShowPageMenu(true); }}></button>
                <h2>SPORTS CATEGORIES</h2>
              </div>
              <button className="inline-sports-details-close-btn" onClick={() => { setShowSportsDetails(false); setShowPageMenu(true); }}>�</button>
            </div>
            <div className="sports-details-navigation">
              <button className="sports-nav-btn prev" onClick={prevSportsSlide}></button>
              <div 
                className="sports-carousel-3d-container"
                onTouchStart={handleSportsTouchStart}
                onTouchMove={handleSportsTouchMove}
                onTouchEnd={handleSportsTouchEnd}
              >
                <div className="sports-carousel-3d-wrapper">
                  {sportsDetailCards.map((card, index) => {
                    const isActive = index === currentSportsSlide;
                    const offset = index - currentSportsSlide;
                    const isClickable = eventDetailsData[card.title as keyof typeof eventDetailsData] || card.title === "Men's Individual &" || card.title === "Women's Individual &" || card.title === "Men's Team Field Sports" || card.title === "Women's Team Field";
                    
                    let transform = '';
                    let zIndex = 0;
                    let opacity = 0;
                    let filter = 'grayscale(100%) brightness(0.5)';
                    
                    if (offset === 0) {
                      // Active card - center front (Glide style)
                      transform = 'translateX(-50%) translateY(-50%) translateZ(0) rotateY(0deg) scale(1)';
                      zIndex = 10;
                      opacity = 1;
                      filter = 'none';
                    } else if (offset === 1 || offset === -sportsDetailCards.length + 1) {
                      // Right card - horizontal slide with subtle depth
                      transform = 'translateX(calc(-50% + 420px)) translateY(-50%) translateZ(-100px) rotateY(-12deg) scale(0.92)';
                      zIndex = 8;
                      opacity = 0.6;
                      filter = 'brightness(0.7)';
                    } else if (offset === -1 || offset === sportsDetailCards.length - 1) {
                      // Left card - horizontal slide with subtle depth
                      transform = 'translateX(calc(-50% - 420px)) translateY(-50%) translateZ(-100px) rotateY(12deg) scale(0.92)';
                      zIndex = 8;
                      opacity = 0.6;
                      filter = 'brightness(0.7)';
                    } else if (offset === 2 || offset === -sportsDetailCards.length + 2) {
                      // Far right card - more receded
                      transform = 'translateX(calc(-50% + 840px)) translateY(-50%) translateZ(-200px) rotateY(-18deg) scale(0.85)';
                      zIndex = 6;
                      opacity = 0.4;
                      filter = 'brightness(0.5)';
                    } else if (offset === -2 || offset === sportsDetailCards.length - 2) {
                      // Far left card - more receded
                      transform = 'translateX(calc(-50% - 840px)) translateY(-50%) translateZ(-200px) rotateY(18deg) scale(0.85)';
                      zIndex = 6;
                      opacity = 0.4;
                      filter = 'brightness(0.5)';
                    } else if (offset > 0) {
                      // Far right hidden cards
                      transform = 'translateX(calc(-50% + 1200px)) translateY(-50%) translateZ(-300px) rotateY(-25deg) scale(0.75)';
                      zIndex = 2;
                      opacity = 0.2;
                      filter = 'brightness(0.3)';
                    } else {
                      // Far left hidden cards
                      transform = 'translateX(calc(-50% - 1200px)) translateY(-50%) translateZ(-300px) rotateY(25deg) scale(0.75)';
                      zIndex = 2;
                      opacity = 0.2;
                      filter = 'brightness(0.3)';
                    }
                    
                    return (
                      <div 
                        key={index} 
                        className={`sports-detail-card-3d ${isActive ? 'active' : ''}`}
                        onClick={isClickable && isActive ? () => {
                          if (card.title === "Men's Individual &" || card.title === "Women's Individual &" || card.title === "Men's Team Field Sports" || card.title === "Women's Team Field") {
                            handleIndoorSportsClick(card.title);
                          } else {
                            handleEventDetailClick(card.title);
                          }
                        } : !isActive ? () => setCurrentSportsSlide(index) : undefined}
                        style={{
                          transform,
                          zIndex,
                          opacity,
                          filter,
                          cursor: isActive && isClickable ? 'pointer' : 'pointer',
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          marginLeft: '-100px',
                          marginTop: '-150px'
                        }}
                      >
                        <div className="sports-card-poster-background">
                          <span className="sports-poster-placeholder-text">SPORTS POSTER</span>
                        </div>
                        <div className="sports-card-title-overlay">
                          <h3>{card.title}</h3>
                          {card.subtitle && (
                            <h4>{card.subtitle}</h4>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button className="sports-nav-btn next" onClick={nextSportsSlide}></button>
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
          </div>
        </section>
      )}

      {/* Indoor Sports Section - appears when clicking Men's Individual & Indoor Sports */}
      {showIndoorSports && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowIndoorSports(false); setShowSportsDetails(true); }}>
                  ? Back
                </button>
                <h2>MEN'S INDIVIDUAL & INDOOR SPORTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowIndoorSports(false); setShowSportsDetails(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevIndoorSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: 3 }).map((_, index) => {
                  const cardIndex = (currentIndoorSlide + index) % indoorSportsCards.length;
                  const card = indoorSportsCards[cardIndex];
                  return (
                    <div 
                      key={cardIndex} 
                      className="indoor-sport-card"
                      onClick={() => handleEventDetailClick(card.title)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">SPORTS POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && (
                          <h4>{card.subtitle}</h4>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextIndoorSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {indoorSportsCards.map((_, index) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentIndoorSlide ? 'active' : ''}`}
                  onClick={() => setCurrentIndoorSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Women's Indoor Sports Section - appears when clicking Women's Individual & Indoor Sports */}
      {showWomenIndoorSports && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowWomenIndoorSports(false); setShowSportsDetails(true); }}>
                  ? Back
                </button>
                <h2>WOMEN'S INDIVIDUAL & INDOOR SPORTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowWomenIndoorSports(false); setShowSportsDetails(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevWomenIndoorSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: 3 }).map((_, index) => {
                  const cardIndex = (currentWomenIndoorSlide + index) % womenIndoorSportsCards.length;
                  const card = womenIndoorSportsCards[cardIndex];
                  return (
                    <div 
                      key={cardIndex} 
                      className="indoor-sport-card"
                      onClick={() => handleEventDetailClick(card.title)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">SPORTS POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && (
                          <h4>{card.subtitle}</h4>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextWomenIndoorSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {womenIndoorSportsCards.map((_, index) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentWomenIndoorSlide ? 'active' : ''}`}
                  onClick={() => setCurrentWomenIndoorSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Men's Team Field Sports Section - appears when clicking Men's Team Field Sports */}
      {showMenTeamSports && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowMenTeamSports(false); setShowSportsDetails(true); }}>
                  ? Back
                </button>
                <h2>MEN'S TEAM FIELD SPORTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowMenTeamSports(false); setShowSportsDetails(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevMenTeamSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: 3 }).map((_, index) => {
                  const cardIndex = (currentMenTeamSlide + index) % menTeamSportsCards.length;
                  const card = menTeamSportsCards[cardIndex];
                  return (
                    <div 
                      key={cardIndex} 
                      className="indoor-sport-card"
                      onClick={() => handleEventDetailClick(card.title)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">SPORTS POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && (
                          <h4>{card.subtitle}</h4>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextMenTeamSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {menTeamSportsCards.map((_, index) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentMenTeamSlide ? 'active' : ''}`}
                  onClick={() => setCurrentMenTeamSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Women's Team Field Sports Section - appears when clicking Women's Team Field Sports */}
      {showWomenTeamSports && (
        <section className="inline-indoor-sports-section">
          <div className="inline-indoor-sports-container">
            <div className="inline-indoor-sports-header">
              <div className="indoor-sports-header-left">
                <button className="indoor-sports-back-btn" onClick={() => { setShowWomenTeamSports(false); setShowSportsDetails(true); }}>
                  ? Back
                </button>
                <h2>WOMEN'S TEAM FIELD SPORTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowWomenTeamSports(false); setShowSportsDetails(true); }}>�</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevWomenTeamSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: 3 }).map((_, index) => {
                  const cardIndex = (currentWomenTeamSlide + index) % womenTeamSportsCards.length;
                  const card = womenTeamSportsCards[cardIndex];
                  return (
                    <div 
                      key={cardIndex} 
                      className="indoor-sport-card"
                      onClick={() => handleEventDetailClick(card.title)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">SPORTS POSTER</span>
                      </div>
                      <div className="indoor-sport-card-title-overlay">
                        <h3>{card.title}</h3>
                        {card.subtitle && (
                          <h4>{card.subtitle}</h4>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="indoor-sports-nav-btn next" onClick={nextWomenTeamSlide}>?</button>
            </div>
            <div className="indoor-sports-carousel-indicators">
              {womenTeamSportsCards.map((_, index) => (
                <button
                  key={index}
                  className={`indoor-sports-indicator ${index === currentWomenTeamSlide ? 'active' : ''}`}
                  onClick={() => setCurrentWomenTeamSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Theme Section */}
      <section 
        className={`dashboard-section about-theme-section section-animate section-animate-right ${visibleSections.has('about-theme') ? 'visible' : ''}`}
        data-section-id="about-theme"
        ref={(el) => registerSection('about-theme', el)}
        style={{ fontFamily: 'coffee+tea demo, sans-serif', position: 'relative' }}
      >
        <div className="about-theme-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', position: 'relative' }}>
          <h2 className="about-theme-title" style={{
            textAlign: 'center',
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#fdee71',
            marginBottom: '60px',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
            fontFamily: 'coffee+tea demo, sans-serif'
          }}>ABOUT THEME</h2>
          
          {/* Garuda Logo */}
          <div className="garuda-about-logo" style={{
            position: 'absolute',
            width: 'clamp(120px, 20vw, 350px)',
            height: 'auto',
            zIndex: 1
          }}>
            <img 
              src="/Garuda.avif" 
              alt="Garuda Logo"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 20px rgba(253, 238, 113, 0.3))'
              }}
            />
          </div>
          <style>{`
            .garuda-about-logo {
              top: -120px;
              left: 50%;
              transform: translateX(-50%);
            }
            
            @media (min-width: 768px) {
              .garuda-about-logo {
                top: 180px;
                left: -80px;
                transform: none;
              }
            }
          `}</style>

          <div style={{ marginBottom: '40px', position: 'relative', zIndex: 2, paddingLeft: 'clamp(0px, 15vw, 380px)', paddingRight: 'clamp(20px, 5vw, 80px)' }}>
            <h3 className="theme-name" style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#fdee71',
                marginBottom: '30px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                fontFamily: 'coffee+tea demo, sans-serif'
              }}>Mahotsav 2026 - The Eternal Harmony</h3>
              
              <p className="theme-description" style={{
                fontSize: '1.25rem',
                lineHeight: '1.9',
                color: '#FFFFFF',
                textAlign: 'justify',
                fontWeight: '400',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                fontFamily: 'coffee+tea demo, sans-serif'
              }}>
                Vignan is all geared up for the 19th edition of Mahotsav 2026, a national-level convergence of talent centered on the sacred theme "Eternal Harmony," running for three dynamic days from February 5th to 7th, 2026. This event is meticulously designed to merge the diverse pursuits of sport, culture, art, and athletics into a single, vibrant platform, offering over 20,000 participants from 300+ colleges a high-stakes opportunity to showcase their excellence. With a magnificent prize pool exceeding ₹17,00,000, Mahotsav 2026 is an essential crucible for nurturing the nation's most promising young minds, providing a powerful stage for students, a high-visibility engagement platform for sponsors, and a celebrated organizational achievement for Vignan, reinforcing its legacy as a premier host of national youth aspiration.
              </p>
          </div>
          
          {/* Stats Bar */}
          <div ref={statsRef} className="rounded-2xl sm:rounded-3xl p-12 sm:p-14 md:p-16 lg:p-14 mt-8 sm:mt-10" style={{
            background: 'rgba(200, 180, 220, 0.9)'
          }}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
              {/* Left Column - 3 items */}
              <div className="flex flex-col gap-6 sm:gap-8">
                {/* Footfall */}
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">👣</div>
                  <div className="text-gray-900 font-bold text-xl sm:text-2xl md:text-3xl mb-1">{footfall.toLocaleString()}+</div>
                  <div className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base">TOTAL FOOTFALL</div>
                </div>
                
                {/* Events */}
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">👥</div>
                  <div className="text-gray-900 font-bold text-xl sm:text-2xl md:text-3xl mb-1">{events}+</div>
                  <div className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base">EVENTS</div>
                </div>
                
                {/* Cash Prizes */}
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">🏆</div>
                  <div className="text-gray-900 font-bold text-xl sm:text-2xl md:text-3xl mb-1">{cashPrizes}+ LACKS</div>
                  <div className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base">CASH PRIZES</div>
                </div>
              </div>
              
              {/* Middle - Editions (featured) - only visible on desktop */}
              <div className="hidden lg:flex justify-center items-center">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 flex justify-center items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 sm:border-5 border-gray-900 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">18</div>
                  </div>
                  <div className="text-gray-900 font-bold text-base sm:text-lg md:text-xl mb-1">18 EDITIONS</div>
                  <div className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base">OF FESTIVITIES</div>
                </div>
              </div>
              
              {/* Right Column - 3 items */}
              <div className="flex flex-col gap-6 sm:gap-8">
                {/* Colleges */}
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">🎓</div>
                  <div className="text-gray-900 font-bold text-xl sm:text-2xl md:text-3xl mb-1">{colleges}+</div>
                  <div className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base">COLLEGES</div>
                </div>
                
                {/* Online Audience */}
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">📱</div>
                  <div className="text-gray-900 font-bold text-xl sm:text-2xl md:text-3xl mb-1">{onlineAudience.toLocaleString()}+</div>
                  <div className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base">ONLINE AUDIANCE</div>
                </div>
                
                {/* Editions - mobile only */}
                <div className="text-center lg:hidden">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 flex justify-center items-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 sm:border-4 border-gray-900 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-900">18</div>
                  </div>
                  <div className="text-gray-900 font-bold text-sm sm:text-base mb-1">18 EDITIONS</div>
                  <div className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base">OF FESTIVITIES</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Throwbacks Section */}
      <style>
        {`
          @keyframes scrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes scrollRight {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }

          .scroll-row {
            display: flex;
            gap: 20px;
            animation: scrollLeft 20s linear infinite;
          }

          .scroll-row:hover {
            animation-play-state: paused;
          }

          .scroll-row-2 {
            animation: scrollRight 23s linear infinite;
          }

          .scroll-row-3 {
            animation-duration: 27s;
          }

          .throwback-card {
            flex-shrink: 0;
            width: calc((100vw - 60px) / 3);
            max-width: 280px;
            min-width: 100px;
            height: clamp(140px, 20vw, 200px);
            border-radius: 15px;
            overflow: visible;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
          }
          
          @media (min-width: 768px) {
            .throwback-card {
              width: calc((100vw - 80px) / 3);
            }
            
            .scroll-row {
              gap: 20px;
            }
          }

          .throwback-card:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
            z-index: 10;
          }

          .throwback-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .card-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justifyContent: center;
            font-weight: bold;
            font-size: 1.2rem;
          }
        `}
      </style>
      <section 
        className={`dashboard-section throwbacks-section section-animate section-animate-left ${visibleSections.has('throwbacks') ? 'visible animate-in' : ''}`}
        data-section-id="throwbacks"
        ref={(el) => registerSection('throwbacks', el)}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: '120px 20px 80px',
          marginTop: '0',
          overflow: 'visible'
        }}
      >
        <h2
      style={{
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    fontWeight: 'bold',
    color: '#fdee71',
    marginBottom: '80px',
    textAlign: 'center',
    fontFamily: 'Woodtrap, sans-serif'
  }}
>
  Gallery
</h2>


        <div style={{
          width: '100%',
          maxWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          {/* Row 1 - Moving Left */}
          <div style={{ overflow: 'visible', width: '100%', padding: '20px 0' }}>
            <div className="scroll-row">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={`row1-${i}`}
                  className="throwback-card"
                  onClick={() => setSelectedPhoto({ row: 1, index: i })}
                  style={{
                    background: `linear-gradient(135deg, ${['rgba(255, 215, 0, 0.5)', 'rgba(255, 105, 180, 0.5)', 'rgba(0, 255, 255, 0.5)', 'rgba(138, 43, 226, 0.5)', 'rgba(50, 205, 50, 0.5)'][i % 5]}, rgba(0, 0, 0, 0.3))`,
                    border: `3px solid ${['#FFD700', '#FF69B4', '#00FFFF', '#8B2BE2', '#32CD32'][i % 5]}`,color: '#fdee71',
                    cursor: 'pointer'
                  }}
                >
                  <div 
                    className="card-placeholder"
                    style={{ color: ['#FFD700', '#FF69B4', '#00FFFF', '#8B2BE2', '#32CD32'][i % 5] }}
                  >
                    Photo {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Moving Right */}
          <div style={{ overflow: 'visible', width: '100%', padding: '20px 0' }}>
            <div className="scroll-row scroll-row-2">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={`row2-${i}`}
                  className="throwback-card"
                  onClick={() => setSelectedPhoto({ row: 2, index: i })}
                  style={{
                    background: `linear-gradient(135deg, ${['rgba(255, 127, 80, 0.5)', 'rgba(147, 112, 219, 0.5)', 'rgba(255, 215, 0, 0.5)', 'rgba(0, 191, 255, 0.5)', 'rgba(255, 20, 147, 0.5)'][i % 5]}, rgba(0, 0, 0, 0.3))`,
                    border: `3px solid ${['#FF7F50', '#9370DB', '#FFD700', '#00BFFF', '#FF1493'][i % 5]}`,
                    cursor: 'pointer'
                  }}
                >
                  <div 
                    className="card-placeholder"
                    style={{ color: ['#FF7F50', '#9370DB', '#FFD700', '#00BFFF', '#FF1493'][i % 5] }}
                  >
                    Photo {i + 11}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 - Moving Left */}
          <div style={{ overflow: 'visible', width: '100%', padding: '20px 0' }}>
            <div className="scroll-row scroll-row-3">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={`row3-${i}`}
                  className="throwback-card"
                  onClick={() => setSelectedPhoto({ row: 3, index: i })}
                  style={{
                    background: `linear-gradient(135deg, ${['rgba(218, 165, 32, 0.5)', 'rgba(138, 43, 226, 0.5)', 'rgba(0, 255, 255, 0.5)', 'rgba(255, 105, 180, 0.5)', 'rgba(50, 205, 50, 0.5)'][i % 5]}, rgba(0, 0, 0, 0.3))`,
                    border: `3px solid ${['#DAA520', '#8B2BE2', '#00FFFF', '#FF69B4', '#32CD32'][i % 5]}`,
                    cursor: 'pointer'
                  }}
                >
                  <div 
                    className="card-placeholder"
                    style={{ color: ['#DAA520', '#8B2BE2', '#00FFFF', '#FF69B4', '#32CD32'][i % 5] }}
                  >
                    Photo {i + 21}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p style={{
          marginTop: '60px',
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          fontStyle: 'italic'
        }}>Hover to pause • Swipe through memories</p>
      </section>

      {/* Throwback Section */}
      <section 
        className="dashboard-section throwback-section"
        data-section-id="throwback"
        ref={(el) => registerSection('throwback', el)}
        style={{
          minHeight: '100vh',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: '140px 20px 40px',
          overflow: 'visible'
        }}
      >
        <h2
  style={{
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    fontWeight: 'bold',
    color: '#fdee71',
    marginBottom: 'clamp(30px, 5vh, 50px)',
    textAlign: 'center',
    fontFamily: 'Bradley Hand, cursive',
    zIndex: 10,
    position: 'relative'
  }}
>
  Throwback
</h2>

        {/* Flower Container with Lock System */}
        <div style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          maxHeight: 'calc(100vh - 200px)',
          padding: '0'
        }}>
          {/* Container for both flower halves */}
          <div style={{
            position: 'relative',
            width: 'clamp(200px, 35vw, 450px)',
            height: 'clamp(200px, 35vw, 450px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* Left Half */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: isThrowbackUnlocked 
                ? 'translate(calc(-50% - clamp(120px, 20vw, 280px)), -50%)' 
                : 'translate(-50%, -50%)',
              transition: 'transform 2s cubic-bezier(0.4, 0.0, 0.2, 1)',
              width: 'clamp(200px, 35vw, 450px)',
              height: 'clamp(200px, 35vw, 450px)',
              overflow: 'visible',
              zIndex: 10
            }}>
              <FlowerComponent 
                size="clamp(200px, 35vw, 450px)"
                sunSize="45%"
                moonSize="39.5%"
                sunTop="28%"
                sunLeft="28%"
                moonTop="30.8%"
                moonLeft="30.8%"
                showPetalRotation={true}
                petalAnimation={isThrowbackUnlocked ? 'none' : 'petalsRotateAnticlockwise 40s linear infinite'}
                clipPath="inset(0 50% 0 0)"
                clipPathTransition="clip-path 2s cubic-bezier(0.4, 0.0, 0.2, 1)"
                style={{
                  overflow: 'visible'
                }}
              />
            </div>

            {/* Right Half */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: isThrowbackUnlocked 
                ? 'translate(calc(-50% + clamp(120px, 20vw, 280px)), -50%)' 
                : 'translate(-50%, -50%)',
              transition: 'transform 2s cubic-bezier(0.4, 0.0, 0.2, 1)',
              width: 'clamp(200px, 35vw, 450px)',
              height: 'clamp(200px, 35vw, 450px)',
              overflow: 'visible',
              zIndex: 10
            }}>
              <FlowerComponent 
                size="clamp(200px, 35vw, 450px)"
                sunSize="45%"
                moonSize="39.5%"
                sunTop="28%"
                sunLeft="28%"
                moonTop="30.8%"
                moonLeft="30.8%"
                showPetalRotation={true}
                petalAnimation={isThrowbackUnlocked ? 'none' : 'petalsRotateAnticlockwise 40s linear infinite'}
                clipPath="inset(0 0 0 50%)"
                clipPathTransition="clip-path 2s cubic-bezier(0.4, 0.0, 0.2, 1)"
                style={{
                  overflow: 'visible'
                }}
              />
            </div>
          </div>

          {/* Year buttons and photo card */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: '40px',
            gap: '30px',
            pointerEvents: isThrowbackUnlocked ? 'auto' : 'none',
            zIndex: 5,
            opacity: isThrowbackUnlocked ? 1 : 0,
            transition: 'opacity 1.5s ease 0.5s'
          }}>
              {/* Year buttons */}
              <div style={{
                display: 'flex',
                gap: '20px'
              }}>
                {(['2023', '2024', '2025'] as const).map(year => (
                  <button 
                    key={year} 
                    onClick={() => setSelectedYear(year)}
                    style={{
                      padding: '12px 35px',
                      borderRadius: '20px',
                      background: selectedYear === year 
                        ? 'linear-gradient(135deg, #e88bb7 0%, #d67ba4 100%)'
                        : 'linear-gradient(135deg, #f5a3c7 0%, #e88bb7 100%)',
                      border: 'none',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: selectedYear === year 
                        ? '0 6px 20px rgba(0, 0, 0, 0.3)'
                        : '0 4px 15px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s ease',
                      transform: selectedYear === year ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Photo card */}
              <div style={{
                width: '300px',
                height: '300px',
                background: 'white',
                borderRadius: '8px',
                border: '12px solid #4a47a3',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'all 0.4s ease'
              }}>
                {/* Photo area */}
                <div style={{
                  flex: 1,
                  background: selectedYear === '2023' 
                    ? 'linear-gradient(to bottom, #87CEEB 0%, #E8F4F8 50%, #90EE90 100%)'
                    : selectedYear === '2024'
                    ? 'linear-gradient(to bottom, #FFB6C1 0%, #FFC0CB 50%, #FFD700 100%)'
                    : 'linear-gradient(to bottom, #B0E0E6 0%, #ADD8E6 50%, #87CEEB 100%)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.4s ease'
                }}>
                  {/* Cloud */}
                  <div style={{
                    width: '80px',
                    height: '40px',
                    background: 'white',
                    borderRadius: '50px',
                    position: 'absolute',
                    top: '40px',
                    right: '60px',
                    boxShadow: 'inset 0 -5px 10px rgba(0, 0, 0, 0.05)'
                  }} />
                  
                  {/* Hills */}
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    width: '100%',
                    height: '40%',
                    display: 'flex',
                    alignItems: 'flex-end'
                  }}>
                    <svg width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="none">
                      <path d="M0,120 Q75,40 150,80 T300,60 L300,120 Z" fill={selectedYear === '2023' ? '#78BE20' : selectedYear === '2024' ? '#90EE90' : '#4CAF50'} />
                      <path d="M0,120 Q100,60 200,100 T300,90 L300,120 Z" fill={selectedYear === '2023' ? '#9ACD32' : selectedYear === '2024' ? '#A8E6A3' : '#66BB6A'} opacity="0.8" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          {/* Lock Icon removed */}
        </div>

        {/* Countdown Timer */}
        <div className="mt-6 sm:mt-8 relative flex flex-wrap gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-4 sm:px-6 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl mb-12 sm:mb-32 md:mb-40 lg:mb-48 justify-center" style={{
          background: 'rgba(61, 0, 84, 0.75)',
          color: '#FFFFFF',
          boxShadow: '0 0 20px rgba(223, 160, 0, 0.6), 0 0 30px rgba(223, 160, 0, 0.4)',
          animation: 'timerGlow 1.5s infinite alternate',
          zIndex: 10
        }}>
          {(['days', 'hours', 'minutes', 'seconds'] as const).map(unit => (
            <div key={unit} className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 lg:w-28 lg:h-32 flex flex-col items-center justify-center">
              <div 
                className={animate[unit] ? 'timer-digit-change' : ''}
                style={{
                  width: '100%',
                  height: '50%',
                  fontSize: 'clamp(1.5rem, 5vw, 2.6rem)',
                  fontWeight: '800',
                  fontFamily: 'Poppins, sans-serif',
                  color: '#FBC02D',
                  textShadow: '0 0 12px rgba(251,192,45,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {time[unit]}
              </div>
              <div style={{
                fontSize: 'clamp(0.75rem, 2.5vw, 1.5rem)',
                color: '#E0E0E0',
                marginTop: '4px',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                fontFamily: 'BackToSchool, sans-serif'
              }}>
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes rotateAntiClockwise {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(-360deg);
            }
          }
          
          @keyframes rotateClockwise {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes lockPulse {
            0%, 100% {
              filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.6));
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              filter: drop-shadow(0 0 16px rgba(139, 92, 246, 0.9));
              transform: translate(-50%, -50%) scale(1.1);
            }
          }

          @keyframes glowBeam {
            0% {
              opacity: 0;
              height: 0%;
            }
            50% {
              opacity: 1;
              height: 100%;
            }
            100% {
              opacity: 0;
              height: 100%;
            }
          }

          @keyframes timerGlow {
            from { box-shadow: 0 0 20px rgba(255, 191, 29, 0.542); }
            to { box-shadow: 0 0 35px rgba(251,192,45,0.8); }
          }

          .timer-digit-change {
            animation: rotateOnce 0.45s ease-out;
          }

          @keyframes rotateOnce {
            0% { transform: scale(1) rotateX(0deg); }
            50% { transform: scale(1.2) rotateX(180deg); }
            100% { transform: scale(1) rotateX(360deg); }
          }
        `}</style>
      </section>

      {/* Events Info Modal */}
      {showEventsInfo && (
        <div className="events-info-modal" onClick={() => setShowEventsInfo(false)}>
          <div className="events-info-content" onClick={(e) => e.stopPropagation()}>
            <button className="events-info-close" onClick={() => setShowEventsInfo(false)}>�</button>
            
            {/* Corner Flowers for Events Information */}
            {/* Floating Flower - Top Right */}
            <div className="fixed -top-16 -right-16 md:-top-32 md:-right-32 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-[1]" style={{ border: 'none', outline: 'none' }}>
              <div className="flower-inner" style={{ animation: 'spin-slow 120s linear infinite', transformOrigin: 'center center', border: 'none', outline: 'none' }}>
                <FlowerComponent 
                  size="100%"
                  sunSize="50%"
                  moonSize="43%"
                  sunTop="25%"
                  sunLeft="25%"
                  moonTop="28.5%"
                  moonLeft="28.5%"
                  showPetalRotation={true}
                  opacity={1}
                />
              </div>
            </div>

            {/* Floating Flower - Bottom Left */}
            <div className="fixed -bottom-16 -left-16 md:-bottom-32 md:-left-32 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-[1]" style={{ border: 'none', outline: 'none' }}>
              <div className="flower-inner" style={{ animation: 'spin-slow 120s linear infinite', transformOrigin: 'center center', border: 'none', outline: 'none' }}>
                <FlowerComponent 
                  size="100%"
                  sunSize="50%"
                  moonSize="43%"
                  sunTop="25%"
                  sunLeft="25%"
                  moonTop="28.5%"
                  moonLeft="28.5%"
                  showPetalRotation={true}
                  opacity={1}
                />
              </div>
            </div>
            
            <div className="events-navigation">
              <button className="events-nav-btn prev" onClick={prevEventSlide}>◀</button>
              <div 
                className="events-carousel-3d-container"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={() => onTouchEnd('events')}
              >
                <div className="events-carousel-3d-wrapper">
                  {eventInfoCards.map((card, index) => {
                    const offset = index - currentEventSlide;
                    
                    let transform = '';
                    let zIndex = 0;
                    let opacity = 0;
                    let filter = 'grayscale(100%) brightness(0.5)';
                    
                    if (offset === 0) {
                      // Active card - center front
                      transform = 'translateX(0) translateY(0) translateZ(200px) rotateY(0deg) scale(1)';
                      zIndex = 10;
                      opacity = 1;
                      filter = 'none';
                    } else if (offset === 1 || offset === -eventInfoCards.length + 1) {
                      // Right card
                      transform = 'translateX(60%) translateY(10%) translateZ(-200px) rotateY(-35deg) scale(0.7)';
                      zIndex = 5;
                      opacity = 0.5;
                      filter = 'grayscale(50%) brightness(0.7)';
                    } else if (offset === -1 || offset === eventInfoCards.length - 1) {
                      // Left card
                      transform = 'translateX(-60%) translateY(10%) translateZ(-200px) rotateY(35deg) scale(0.7)';
                      zIndex = 5;
                      opacity = 0.5;
                      filter = 'grayscale(50%) brightness(0.7)';
                    } else {
                      // Hidden cards
                      transform = offset > 0 ? 'translateX(100%) translateZ(-400px) scale(0.5)' : 'translateX(-100%) translateZ(-400px) scale(0.5)';
                      zIndex = 0;
                      opacity = 0;
                    }
                    
                    return (
                      <div
                        key={index}
                        className="event-info-card-3d"
                        style={{
                          transform,
                          zIndex,
                          opacity,
                          filter,
                          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        <div className="poster-placeholder">
                          <span>POSTER of EVENT</span>
                        </div>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button className="events-nav-btn next" onClick={nextEventSlide}>▶</button>
            </div>
            <div className="events-carousel-indicators">
              {eventInfoCards.map((_, index) => (
                <button
                  key={index}
                  className={`events-indicator ${index === currentEventSlide ? 'active' : ''}`}
                  onClick={() => setCurrentEventSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <Login
        showLoginModal={showLoginModal}
        onClose={handleCloseLogin}
        loginFormData={loginFormData}
        setLoginFormData={setLoginFormData}
        onSubmitApi={handleLoginSubmit}
        isLoggingIn={isLoggingIn}
        loginMessage={loginMessage}
        setLoginMessage={setLoginMessage}
        onSignupClick={handleSignupClick}
      />

      {/* Signup Modal */}
      <Signup
        showSignupModal={showSignupModal}
        onClose={handleCloseSignup}
        signupFormData={signupFormData}
        onInputChange={handleSignupInputChange}
        onCollegeChange={(value) => setSignupFormData(prev => ({ ...prev, college: value }))}
        onSubmit={handleSignupSubmit}
        signupStep={signupStep}
        totalSteps={totalSteps}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
        onLoginClick={() => { setShowSignupModal(false); setShowLoginModal(true); }}
      />

      {/* Sub-Modal for Menu Categories */}
      {activeSubModal && (
        <div className="login-modal-overlay" onClick={handleCloseSubModal}>
          <div className="sub-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>{activeSubModal === 'EVENTS' ? 'REGISTER FOR EVENTS' : activeSubModal}</h2>
              <button 
                className="close-btn" 
                onClick={(e) => { 
                  e.preventDefault();
                  e.stopPropagation(); 
                  console.log('Close button clicked');
                  setActiveSubModal(null);
                }}
                type="button"
              >
                ×
              </button>
            </div>
            <div className="sub-modal-body">
              {activeSubModal === 'EVENTS' && (
                <div className="events-modal-container">
                  {loadingEvents ? (
                    <div className="loading-events">
                      <p>Loading events...</p>
                    </div>
                  ) : (
                    <>
                      <div className="events-category-grid">
                      {/* Sports Events */}
                      <div className="event-category-card">
                        <h3>⚽ Sports Events ({getFilteredSportsEvents().length})</h3>
                        <div className="event-list">
                          {getFilteredSportsEvents().length > 0 ? (
                            getFilteredSportsEvents().map((event) => (
                              <label key={event._id} className="event-item event-checkbox-item">
                                <input
                                  type="checkbox"
                                  className="event-checkbox"
                                  checked={tempSelectedEvents.has(event._id)} 
                                  disabled={isEventDisabled(event)}
                                  onChange={() => { 
                                    // Only allow changes if not already registered
                                    if (!selectedEvents.has(event._id)) {
                                      const newSelection = new Set(tempSelectedEvents); 
                                      const wasSelected = newSelection.has(event._id); 
                                      if (wasSelected) { 
                                        newSelection.delete(event._id); 
                                      } else { 
                                        newSelection.add(event._id); 
                                      } 
                                      const hasRegularEvents = [...sportsEvents, ...culturalEvents].some(e => newSelection.has(e._id)); 
                                      setRegularEventsSelected(hasRegularEvents); 
                                      setTempSelectedEvents(newSelection); 
                                    }
                                  }}
                                />
                                <div className="event-item-content">
                                  <h4>{event.eventName}</h4>
                                  {isLoggedIn && (
                                    <small className="event-gender">({event.gender})</small>
                                  )}
                                </div>
                              </label>
                            ))
                          ) : (
                            <p>No sports events available at the moment.</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Cultural Events */}
                      <div className="event-category-card">
                        <h3>🎭 Cultural Events ({getFilteredCulturalEvents().length})</h3>
                        <div className="event-list">
                          {getFilteredCulturalEvents().length > 0 ? (
                            getFilteredCulturalEvents().map((event) => (
                              <label key={event._id} className="event-item event-checkbox-item">
                                <input
                                  type="checkbox"
                                  className="event-checkbox"
                                  checked={tempSelectedEvents.has(event._id)} 
                                  disabled={isEventDisabled(event)}
                                  onChange={() => { 
                                    // Only allow changes if not already registered
                                    if (!selectedEvents.has(event._id)) {
                                      const newSelection = new Set(tempSelectedEvents); 
                                      const wasSelected = newSelection.has(event._id); 
                                      if (wasSelected) { 
                                        newSelection.delete(event._id); 
                                      } else { 
                                        newSelection.add(event._id); 
                                      } 
                                      const hasRegularEvents = [...sportsEvents, ...culturalEvents].some(e => newSelection.has(e._id)); 
                                      setRegularEventsSelected(hasRegularEvents); 
                                      setTempSelectedEvents(newSelection); 
                                    }
                                  }}
                                />
                                <div className="event-item-content">
                                  <h4>{event.eventName}</h4>
                                  {isLoggedIn && (
                                    <small className="event-gender">({event.gender})</small>
                                  )}
                                </div>
                              </label>
                            ))
                          ) : (
                            <p>No cultural events available at the moment.</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Para Sports Events */}
                      <div className={`event-category-card para-sports-card ${regularEventsSelected ? 'disabled' : ''}`}>
                        <h3>♿ Para Sports Events ({getFilteredParaSportsEvents().length})</h3>
                        {getFilteredParaSportsEvents().length === 0 && (
                          <div>
                            <p style={{color: '#c96ba1', fontWeight: 'bold'}}>?? No para sports events loaded. Server might be down.</p>
                            <button onClick={() => fetchEvents()} style={{padding: '5px 10px', margin: '5px', backgroundColor: '#522566', color: 'white', border: 'none', borderRadius: '4px'}}>
                              ?? Retry Loading Events
                            </button>
                          </div>
                        )}
                        <div className="event-list">
                          {getFilteredParaSportsEvents().length > 0 ? (
                            getFilteredParaSportsEvents().map((event) => (
                              <label key={event._id} className="event-item event-checkbox-item">
                                <input
                                  type="checkbox"
                                  className="event-checkbox"
                                  checked={tempSelectedEvents.has(event._id)}
                                  disabled={isEventDisabled(event)}
                                  onChange={() => {
                                    // Only allow changes if not already registered
                                    if (!selectedEvents.has(event._id) && !regularEventsSelected) {
                                      const newSelection = new Set(tempSelectedEvents);
                                      const wasSelected = newSelection.has(event._id);
                                      
                                      if (wasSelected) {
                                        newSelection.delete(event._id);
                                      } else {
                                        newSelection.add(event._id);
                                      }
                                      
                                      // Check if any para sports events are selected
                                      const hasParaSportsSelected = getFilteredParaSportsEvents().some(pe => 
                                        newSelection.has(pe._id)
                                      );
                                      
                                      setParaSportsSelected(hasParaSportsSelected);
                                      
                                      // If selecting para sports, remove all regular events
                                      if (!wasSelected && hasParaSportsSelected) {
                                        [...getFilteredSportsEvents(), ...getFilteredCulturalEvents()].forEach(e => {
                                          newSelection.delete(e._id);
                                        });
                                        setRegularEventsSelected(false);
                                      }
                                      
                                      setTempSelectedEvents(newSelection);
                                    }
                                  }}
                                />
                                <div className="event-item-content">
                                  <h4>{event.eventName}</h4>
                                  <p>{event.description || 'No description available'}</p>
                                  {event.date && <p className="event-meta">📅 {event.date}</p>}
                                  {event.venue && <p className="event-meta">📍 {event.venue}</p>}
                                  {event.prizePool && <p className="event-meta">🏆 {event.prizePool}</p>}
                                  {event.category && <p className="event-meta">🏷️ {event.category}</p>}
                                </div>
                              </label>
                            ))
                          ) : (
                            <p>No para sports events available at the moment.</p>
                          )}
                        </div>
                      </div>
                    </div>
                    </>
                  )}
                  
                  <div className="events-modal-footer">
                    <div className="selected-count">
                      Selected: {tempSelectedEvents.size} event(s)
                      {tempSelectedEvents.size > 0 && (
                        (() => {
                          const totalAmount = calculateRegistrationPrice(
                            tempSelectedEvents,
                            userProfileData.gender || 'unknown'
                          );
                          const isParaSelection = totalAmount === 0;
                          const formattedAmount = isParaSelection ? 'FREE (Para sports)' : `₹${totalAmount}`;
                          return (
                            <div className="price-preview">
                              Total: {formattedAmount}
                            </div>
                          );
                        })()
                      )}
                    </div>
                    <div className="modal-actions">
                      <button className="close-modal-btn" onClick={handleCloseSubModal}>
                        Cancel
                      </button>
                      {tempSelectedEvents.size > 0 && (
                        <button 
                          className="register-events-btn"
                          onClick={handleRegisterForEvents}
                        >
                          ✅ Register for Events ({tempSelectedEvents.size})
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {activeSubModal === 'PROFILE' && (
                <div className="sub-cards-grid">
                  <div className="sub-card" onClick={handleOpenProfile}>
                    <h3>VIEW PROFILE</h3>
                  </div>
                  <div className="sub-card">
                    <h3>EDIT PROFILE</h3>
                  </div>
                  <div className="sub-card" onClick={() => setShowMyEventsModal(true)}>
                    <h3>MY EVENTS</h3>
                  </div>
                  <div className="sub-card">
                    <h3>CERTIFICATES</h3>
                  </div>
                </div>
              )}
              
              {activeSubModal === 'SCHEDULE' && (
                <div className="sub-cards-grid">
                  <div className="sub-card">
                    <h3>DAY 1</h3>
                  </div>
                  <div className="sub-card">
                    <h3>DAY 2</h3>
                  </div>
                  <div className="sub-card">
                    <h3>DAY 3</h3>
                  </div>
                  <div className="sub-card">
                    <h3>FULL SCHEDULE</h3>
                  </div>
                </div>
              )}
              
              {activeSubModal === 'COLLABORATION' && (
                <div className="sub-cards-grid">
                  <div className="sub-card">
                    <h3>PARTNERSHIPS</h3>
                  </div>
                  <div className="sub-card">
                    <h3>SPONSORS</h3>
                  </div>
                  <div className="sub-card">
                    <h3>MEDIA</h3>
                  </div>
                  <div className="sub-card">
                    <h3>VOLUNTEERS</h3>
                  </div>
                </div>
              )}
              
              {activeSubModal === 'ZONALS' && (
                <div className="sub-cards-grid">
                  <div className="sub-card">
                    <h3>ZONE A</h3>
                  </div>
                  <div className="sub-card">
                    <h3>ZONE B</h3>
                  </div>
                  <div className="sub-card">
                    <h3>ZONE C</h3>
                  </div>
                  <div className="sub-card">
                    <h3>ZONE D</h3>
                  </div>
                </div>
              )}
              
              {activeSubModal === 'CRICKET' && (
                <div className="sub-cards-grid">
                  <div className="sub-card">
                    <h3>MATCHES</h3>
                  </div>
                  <div className="sub-card">
                    <h3>TEAMS</h3>
                  </div>
                  <div className="sub-card">
                    <h3>FIXTURES</h3>
                  </div>
                  <div className="sub-card">
                    <h3>RESULTS</h3>
                  </div>
                </div>
              )}
              
              {activeSubModal === 'HOSPITALITY' && (
                <div className="sub-cards-grid">
                  <div className="sub-card">
                    <h3>ACCOMMODATION</h3>
                  </div>
                  <div className="sub-card">
                    <h3>FOOD</h3>
                  </div>
                  <div className="sub-card">
                    <h3>TRANSPORT</h3>
                  </div>
                  <div className="sub-card">
                    <h3>SERVICES</h3>
                  </div>
                </div>
              )}
              
              {activeSubModal === 'CAMPUS AMBASSADOR' && (
                <div className="sub-cards-grid">
                  <div className="sub-card">
                    <h3>APPLY NOW</h3>
                  </div>
                  <div className="sub-card">
                    <h3>BENEFITS</h3>
                  </div>
                  <div className="sub-card">
                    <h3>RESPONSIBILITIES</h3>
                  </div>
                  <div className="sub-card">
                    <h3>LEADERBOARD</h3>
                  </div>
                </div>
              )}
              
              {activeSubModal === 'SPONSORS' && (
                <div className="sub-cards-grid">
                  <div className="sub-card">
                    <h3>TITLE SPONSORS</h3>
                  </div>
                  <div className="sub-card">
                    <h3>GOLD SPONSORS</h3>
                  </div>
                  <div className="sub-card">
                    <h3>SILVER SPONSORS</h3>
                  </div>
                  <div className="sub-card">
                    <h3>PARTNERS</h3>
                  </div>
                </div>
              )}
              
              {activeSubModal === 'CERTIFICATES' && (
                <div className="sub-cards-grid">
                  <div className="sub-card">
                    <h3>PARTICIPATION</h3>
                  </div>
                  <div className="sub-card">
                    <h3>WINNER</h3>
                  </div>
                  <div className="sub-card">
                    <h3>RUNNER UP</h3>
                  </div>
                  <div className="sub-card">
                    <h3>EXCELLENCE</h3>
                  </div>
                </div>
              )}
              
              {activeSubModal === 'OUR TEAM' && (
                <div className="sub-cards-grid">
                  <div className="sub-card">
                    <h3>CORE TEAM</h3>
                  </div>
                  <div className="sub-card">
                    <h3>ORGANIZING COMMITTEE</h3>
                  </div>
                  <div className="sub-card">
                    <h3>VOLUNTEERS</h3>
                  </div>
                  <div className="sub-card">
                    <h3>COORDINATORS</h3>
                  </div>
                </div>
              )}
              
              {activeSubModal === 'MAP' && (
                <div className="sub-cards-grid">
                  <div className="sub-card">
                    <h3>CAMPUS MAP</h3>
                  </div>
                  <div className="sub-card">
                    <h3>VENUE LOCATIONS</h3>
                  </div>
                  <div className="sub-card">
                    <h3>PARKING</h3>
                  </div>
                  <div className="sub-card">
                    <h3>FACILITIES</h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* User ID Success Popup */}
      {showUserIdPopup && generatedUserId && (
        <div className="login-modal-overlay" onClick={handleCloseUserIdPopup}>
          <div className="userid-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="userid-popup-header">
              <h2>🎉 Registration Successful!</h2>
            </div>
            <div className="userid-popup-body">
              <div className="userid-display">
                <div className="success-icon">✓</div>
                <h3>Your Mahotsav ID</h3>
                <div className="userid-box">
                  <span className="userid-text">{generatedUserId}</span>
                </div>
                <h3>Your Password</h3>
                <div className="userid-box password-box">
                  <span className="password-text">{generatedPassword}</span>
                </div>
                <div className="screenshot-note">
                  <span className="screenshot-icon">💡</span>
                  <p>Please take a screenshot of this page to save your credentials!</p>
                </div>
                <p className="userid-instructions">
                  Use your email/Mahotsav ID and password to login.
                </p>
              </div>
              <button className="userid-close-btn" onClick={handleCloseUserIdPopup}>
                Continue to Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="login-modal-overlay" onClick={handleCloseForgotPassword}>
          <div className="forgot-password-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>?? Forgot Password</h2>
              <button className="close-btn" onClick={handleCloseForgotPassword}>�</button>
            </div>
            <div className="forgot-password-modal-body">
              <p className="forgot-password-instructions">
                Enter your registered email address and we'll send your login credentials to your inbox.
              </p>
              
              <form className="forgot-password-form" onSubmit={handleForgotPasswordSubmit}>
                {resetMessage && (
                  <div className={`submit-message ${resetMessage.type}`}>
                    {resetMessage.text}
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="forgot-email">Email Address</label>
                  <input
                    type="email"
                    id="forgot-email"
                    name="forgot-email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="form-input"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="forgot-password-submit-btn"
                  disabled={isSendingReset}
                >
                  {isSendingReset ? '?? Sending...' : '?? Send Password to Email'}
                </button>
                
                <div className="back-to-login">
                  <button 
                    type="button" 
                    onClick={() => { 
                      setShowForgotPasswordModal(false); 
                      setShowLoginModal(true); 
                    }} 
                    className="back-to-login-btn"
                  >
                    ? Back to Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="login-modal-overlay" onClick={handleCloseProfile}>
          <div className="login-modal-content profile-modal-expanded" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>👤 My Profile</h2>
              <button className="close-btn" onClick={handleCloseProfile}>×</button>
            </div>
            <div className="login-modal-body">
              {isLoadingProfile ? (
                <div className="loading-profile">
                  <p>Loading profile data...</p>
                </div>
              ) : (
                <div className="profile-details">
                  <div className="profile-header-section">
                    <div className="profile-avatar">
                      {userProfileData.name.charAt(0).toUpperCase()}
                    </div>
                    <h3>{userProfileData.name}</h3>
                  </div>
                  
                  <div className="profile-info-section">
                    <h4>📋 Personal Information</h4>
                    <div className="profile-info-grid">
                      <div className="profile-info-item">
                        <span className="info-label">Full Name:</span>
                        <span className="info-value">{userProfileData.name}</span>
                      </div>
                      <div className="profile-info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{userProfileData.email}</span>
                      </div>
                      <div className="profile-info-item">
                        <span className="info-label">Mahotsav ID:</span>
                        <span className="info-value">{userProfileData.userId || 'MH26000001'}</span>
                      </div>
                      {userProfileData.gender && (
                        <div className="profile-info-item">
                          <span className="info-label">Gender:</span>
                          <span className="info-value">{userProfileData.gender}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="profile-stats-section">
                    <h4>📊 Activity Summary</h4>
                    <div className="stats-grid">
                      <div className="stat-box">
                        <div className="stat-number">{userRegisteredEvents.length}</div>
                        <div className="stat-label">Events Registered</div>
                      </div>
                      <div className="stat-box">
                        <div className="stat-number">0</div>
                        <div className="stat-label">Events Completed</div>
                      </div>
                    </div>
                  </div>

                  {/* Registered Events Section */}
                  <div className="profile-registered-events-section">
                    <h4>🎯 Registered Events</h4>
                    {userRegisteredEvents.length > 0 ? (
                      <div className="registered-events-list">
                        {userRegisteredEvents.map((registration: any, index: number) => (
                          <div key={index} className="registered-event-item">
                            <div className="event-item-header">
                              <h5>{registration.eventId?.eventName || 'Event'}</h5>
                              <span className="event-type-badge">
                                {registration.eventId?.eventType === 'sports' ? '⚽' : 
                                 registration.eventId?.eventType === 'parasports' ? '♿' : '🎭'} 
                                {registration.eventId?.eventType || 'Event'}
                              </span>
                            </div>
                            <div className="event-item-details">
                              {registration.eventId?.venue && (
                                <p className="event-meta">📍 {registration.eventId.venue}</p>
                              )}
                              {registration.eventId?.date && (
                                <p className="event-meta">📅 {registration.eventId.date}</p>
                              )}
                              {registration.registrationType && (
                                <p className="event-meta">👥 {registration.registrationType === 'individual' ? 'Individual' : 'Team'}</p>
                              )}
                              {registration.teamName && (
                                <p className="event-meta">🏆 Team: {registration.teamName}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-events-registered">
                        <p>You haven't registered for any events yet.</p>
                        <button 
                          className="browse-events-btn"
                          onClick={() => {
                            setShowProfileModal(false);
                            setActiveSubModal('EVENTS');
                            fetchEvents();
                            if (userProfileData.userId) {
                              fetchUserSavedEvents(userProfileData.userId).then(savedEventIds => {
                                setTempSelectedEvents(savedEventIds);
                              });
                            }
                          }}
                        >
                          Browse Events
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="profile-actions">
                    <button className="profile-action-btn logout-btn" onClick={handleLogout}>🚪 Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Event Registration Modal */}
      {showEventRegistrationModal && selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          onClose={() => {
            setShowEventRegistrationModal(false);
            setSelectedEvent(null);
          }}
        />
      )}

      {/* Event Checklist Modal */}
      {showEventChecklistModal && (
        <div className="login-modal-overlay" onClick={handleCloseEventChecklist}>
          <div className="event-checklist-modal" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>?? Select Events</h2>
              <button className="close-btn" onClick={handleCloseEventChecklist}>�</button>
            </div>
            <div className="event-checklist-body">
              <p className="checklist-instructions">
                Browse and select events you're interested in, then save them to your My Events collection.
              </p>
              
              {loadingEvents ? (
                <div className="loading-events">
                  <p>Loading events...</p>
                </div>
              ) : (
                <div className="events-checklist-container">
                  {/* Sports Events Section */}
                  {getFilteredSportsEvents().length > 0 && (
                    <div className="checklist-section">
                      <h3>? Sports Events
                        {isLoggedIn && userProfileData.gender === 'female' && (
                          <span className="pricing-info"> (?{getPricingForUser().sports} each)</span>
                        )}
                      </h3>
                      <div className="checklist-items">
                        {getFilteredSportsEvents().map((event) => (
                          <label key={event._id} className="checklist-item">
                            <input
                              type="checkbox"
                              checked={selectedEvents.has(event._id)}
                              onChange={() => handleToggleEventSelection(event._id)}
                            />
                            <div className="checklist-item-content">
                              <h4>{event.eventName}</h4>
                              <p>{event.description || 'No description'}</p>
                              {event.date && <span className="event-meta-small">?? {event.date}</span>}
                              {event.venue && <span className="event-meta-small">?? {event.venue}</span>}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cultural Events Section */}
                  {getFilteredCulturalEvents().length > 0 && (
                    <div className="checklist-section">
                      <h3>?? Cultural Events
                        {isLoggedIn && userProfileData.gender === 'female' && (
                          <span className="pricing-info"> (?{getPricingForUser().culturals} each)</span>
                        )}
                      </h3>
                      <div className="checklist-items">
                        {getFilteredCulturalEvents().map((event) => (
                          <label key={event._id} className="checklist-item">
                            <input
                              type="checkbox"
                              checked={selectedEvents.has(event._id)}
                              onChange={() => handleToggleEventSelection(event._id)}
                            />
                            <div className="checklist-item-content">
                              <h4>{event.eventName}</h4>
                              <p>{event.description || 'No description'}</p>
                              {event.date && <span className="event-meta-small">?? {event.date}</span>}
                              {event.venue && <span className="event-meta-small">?? {event.venue}</span>}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {getFilteredSportsEvents().length === 0 && getFilteredCulturalEvents().length === 0 && (
                    <p className="no-events-message">
                      {isLoggedIn && userProfileData.gender === 'female' 
                        ? "No events available for female participants at the moment." 
                        : "No events available at the moment."
                      }
                    </p>
                  )}
                </div>
              )}

              <div className="checklist-footer">
                <div className="selected-count">
                  Selected: {selectedEvents.size} event(s)
                </div>
                <button 
                  className="save-events-btn"
                  onClick={handleSaveSelectedEvents}
                  disabled={selectedEvents.size === 0}
                >
                  ?? Save to My Events
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* My Events Modal */}
      {showMyEventsModal && (
        <div className="login-modal-overlay" onClick={() => setShowMyEventsModal(false)}>
          <div className="event-checklist-modal" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>🎯 My Registered Events</h2>
              <button className="close-btn" onClick={() => setShowMyEventsModal(false)}>×</button>
            </div>
            <div className="event-checklist-body">
              <p className="checklist-instructions">
                These are your registered events. Click the delete button to remove any event you don't want to participate in.
              </p>
              
              {myEvents.length > 0 ? (
                <div className="my-events-list">
                  {myEvents.map((event) => (
                    <div key={event._id} className="my-event-card">
                      <div className="my-event-content">
                        <div className="my-event-header">
                          <h4>{event.eventName}</h4>
                          <span className="event-type-badge">
                            {event.eventType === 'sports' ? '?' : event.eventType === 'parasports' ? '??' : '??'} {event.eventType}
                          </span>
                        </div>
                        <p>{event.description || 'No description'}</p>
                        <div className="event-details-grid">
                          {event.date && <p className="event-meta">?? {event.date}</p>}
                          {event.venue && <p className="event-meta">?? {event.venue}</p>}
                          {event.prizePool && <p className="event-meta">?? {event.prizePool}</p>}
                        </div>
                        <div className="event-registered-badge">
                          ? Registered
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-events-saved">
                  <p>You haven't registered for any events yet.</p>
                  <button className="browse-events-btn" onClick={() => {
                    setShowMyEventsModal(false);
                    setActiveSubModal('EVENTS');
                    // Fetch data in background
                    fetchEvents();
                    if (isLoggedIn && userProfileData.userId) {
                      fetchUserSavedEvents(userProfileData.userId).then(savedEventIds => {
                        setTempSelectedEvents(savedEventIds);
                      });
                    } else {
                      setTempSelectedEvents(new Set());
                    }
                  }}>
                    Browse Events
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="footer-section" style={{
        background: '#000',
        width: '100vw',
        position: 'relative',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        marginTop: '80px',
        marginBottom: '0',
        padding: '0',
        boxSizing: 'border-box'
      }}>
        {/* Footer Content Wrapper */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '40px 40px 0 40px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '50px'
          }}>
          {/* Logo Section */}
          <div>
            <img 
              src={`${import.meta.env.BASE_URL}image.png`}
              alt="Mahotsav 2026" 
              style={{
                height: '80px',
                objectFit: 'contain',
                marginBottom: '25px'
              }}
            />
            {/* Social Media Icons */}
            <h3 style={{
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              letterSpacing: '1px'
            }}>FOLLOW US ON :</h3>
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <a href="https://www.instagram.com/vignan_mahotsav/profilecard/?igsh=dDE1MHNpcmM4eXhm" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://whatsapp.com/channel/0029Vars0ZXJ3jutqK5hfj3r" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/vignan-mahotsav" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 style={{
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              letterSpacing: '1px'
            }}>CONTACT US :</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 6 10-6"/>
                </svg>
                <span style={{ color: '#fff', fontSize: '1rem' }}>mahotsav@vignan.ac.in</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span style={{ color: '#fff', fontSize: '1rem' }}>+91 94930 33592</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span style={{ color: '#fff', fontSize: '1rem' }}>+91 90305 57363</span>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div>
            <h3 style={{
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              letterSpacing: '1px'
            }}>LOCATION :</h3>
            <div style={{ display: 'flex', alignItems: 'start', gap: '15px', marginBottom: '20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginTop: '4px', flexShrink: 0 }}>
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <p style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.8', margin: 0 }}>
                VIGNAN'S FOUNDATION FOR SCIENCE, TECHNOLOGY & RESEARCH (DEEMED TO BE UNIVERSITY), VADLAMUDI, GUNTUR, A.P -522213
              </p>
            </div>
            <a 
              href="https://maps.app.goo.gl/5pufqAcYqKrQCyQZ6" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#a78bfa',
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '10px',
                transition: 'color 0.3s'
              }}
            >
              VIEW ON GOOGLE MAPS
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
          </div>
        </div>
      </footer>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'pointer'
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              width: '50px',
              height: '50px',
              border: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              fontSize: '2rem',
              cursor: 'pointer',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              zIndex: 10000
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ✕
          </button>

          {/* Photo Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '800px',
              height: '80vh',
              borderRadius: '20px',
              background: (() => {
                const row = selectedPhoto.row;
                const i = selectedPhoto.index;
                if (row === 1) {
                  return `linear-gradient(135deg, ${['rgba(255, 215, 0, 0.5)', 'rgba(255, 105, 180, 0.5)', 'rgba(0, 255, 255, 0.5)', 'rgba(138, 43, 226, 0.5)', 'rgba(50, 205, 50, 0.5)'][i % 5]}, rgba(0, 0, 0, 0.3))`;
                } else if (row === 2) {
                  return `linear-gradient(135deg, ${['rgba(255, 127, 80, 0.5)', 'rgba(147, 112, 219, 0.5)', 'rgba(255, 215, 0, 0.5)', 'rgba(0, 191, 255, 0.5)', 'rgba(255, 20, 147, 0.5)'][i % 5]}, rgba(0, 0, 0, 0.3))`;
                } else {
                  return `linear-gradient(135deg, ${['rgba(218, 165, 32, 0.5)', 'rgba(138, 43, 226, 0.5)', 'rgba(0, 255, 255, 0.5)', 'rgba(255, 105, 180, 0.5)', 'rgba(50, 205, 50, 0.5)'][i % 5]}, rgba(0, 0, 0, 0.3))`;
                }
              })(),
              border: (() => {
                const row = selectedPhoto.row;
                const i = selectedPhoto.index;
                if (row === 1) {
                  return `3px solid ${['#FFD700', '#FF69B4', '#00FFFF', '#8B2BE2', '#32CD32'][i % 5]}`;
                } else if (row === 2) {
                  return `3px solid ${['#FF7F50', '#9370DB', '#FFD700', '#00BFFF', '#FF1493'][i % 5]}`;
                } else {
                  return `3px solid ${['#DAA520', '#8B2BE2', '#00FFFF', '#FF69B4', '#32CD32'][i % 5]}`;
                }
              })(),
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'default'
            }}
          >
            <div
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: (() => {
                  const row = selectedPhoto.row;
                  const i = selectedPhoto.index;
                  if (row === 1) {
                    return ['#FFD700', '#FF69B4', '#00FFFF', '#8B2BE2', '#32CD32'][i % 5];
                  } else if (row === 2) {
                    return ['#FF7F50', '#9370DB', '#FFD700', '#00BFFF', '#FF1493'][i % 5];
                  } else {
                    return ['#DAA520', '#8B2BE2', '#00FFFF', '#FF69B4', '#32CD32'][i % 5];
                  }
                })()
              }}
            >
              Photo {selectedPhoto.row === 1 ? selectedPhoto.index + 1 : selectedPhoto.row === 2 ? selectedPhoto.index + 11 : selectedPhoto.index + 21}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

