import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';
import './FloatingIcons.css';
import AnimatedIcon from './Animatedicon';
import GarudaBubble from './GarudaBubble';
import EventRegistrationModal from './EventRegistrationModal';
import { registerUser, loginUser, forgotPassword, getEventsByType, saveMyEvents, getMyEvents, getMyEventRegistrations, type SignupData, type Event } from './services/api';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPageMenu, setShowPageMenu] = useState(false);
  const [showEventsInfo, setShowEventsInfo] = useState(false);
  const [showSportsDetails, setShowSportsDetails] = useState(false);

  const [currentSportsSlide, setCurrentSportsSlide] = useState(0);

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
  
  // Highlights carousel state
  const [currentHighlightSlide, setCurrentHighlightSlide] = useState(0);
  const highlightCards = [
    { day: "Day ONE", title: "Exciting Day One Highlights", description: "Cultural performances, inauguration ceremony, and opening events that set the stage for an amazing festival.", video: "day 1.mp4" },
    { day: "Day TWO", title: "Exciting Day Two Highlights", description: "Main events, competitions, technical exhibitions, and spectacular performances by renowned artists.", video: "day 2.mp4" },
    { day: "Day THREE", title: "Exciting Day Three Highlights", description: "Grand finale, award ceremonies, closing performances, and memorable moments to conclude the festival.", video: "day 3.mp4" }
  ];

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
      subtitle: "TENNIKOIT – Singles (Women)",
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [activeSubModal, setActiveSubModal] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeTheme, setTimeTheme] = useState<'day' | 'evening' | 'night'>('day');
  const [signupFormData, setSignupFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    college: '',
    dateOfBirth: '',
    userType: 'visitor',
    participationType: 'none',
    referenceId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [generatedUserId, setGeneratedUserId] = useState<string | null>(null);
  const [showUserIdPopup, setShowUserIdPopup] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [resetMessage, setResetMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [showEventRegistrationModal, setShowEventRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState<string>('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  const [loginMessage, setLoginMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userProfileData, setUserProfileData] = useState<{ name: string; email: string; userId?: string; userType?: string; gender?: string }>({ name: '', email: '' });
  const [showEventChecklistModal, setShowEventChecklistModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [tempSelectedEvents, setTempSelectedEvents] = useState<Set<string>>(new Set());
  const [eventRegistrationsCount, setEventRegistrationsCount] = useState(0);
  const [paraSportsSelected, setParaSportsSelected] = useState(false);
  const [regularEventsSelected, setRegularEventsSelected] = useState(false);
  const [showMyEventsModal, setShowMyEventsModal] = useState(false);

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
    console.log('🔍 Filtering events - User gender:', userGender, 'User profile:', userProfileData);
    console.log('📊 Events to filter:', events.length, 'events');
    
    if (userGender === 'female') {
      // Female users can only see female and mixed gender events
      const filtered = events.filter(event => 
        event.gender === 'female' || event.gender === 'mixed'
      );
      console.log('👩 Female user - showing', filtered.length, 'events (female + mixed only)');
      return filtered;
    }
    
    if (userGender === 'male') {
      // Male users can only see male and mixed gender events  
      const filtered = events.filter(event => 
        event.gender === 'male' || event.gender === 'mixed'
      );
      console.log('👨 Male user - showing', filtered.length, 'events (male + mixed only)');
      return filtered;
    }
    
    // For non-logged in users or other genders, show all events
    console.log('🔓 Non-logged user or other gender - showing all', events.length, 'events');
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

  // Scroll detection for sunlight effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsScrolled(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to fetch events from API
  const fetchEvents = useCallback(async () => {
    console.log('🔄 Fetching events from API...');
    const userGender = isLoggedIn ? userProfileData.gender : undefined;
    console.log('👤 User gender for filtering:', userGender);
    setLoadingEvents(true);
    try {
        // Test API connection first
        console.log('🔗 Testing API connection...');
        const testResponse = await fetch('/api/events').catch(() => null);
        if (!testResponse) {
          console.warn('⚠️ Backend server may not be running. Using production API...');
        }

        // Fetch sports events with gender filter if user is logged in
        console.log('📡 Fetching sports events...');
        const sportsResponse = await getEventsByType('sports', userGender);
        console.log('⚽ Sports response:', sportsResponse);
        if (sportsResponse.success && sportsResponse.data) {
          setSportsEvents(sportsResponse.data);
          console.log(`✅ Loaded ${sportsResponse.data.length} sports events ${userGender ? `for ${userGender} users` : ''}`);
        } else {
          console.warn('⚠️ No sports events loaded:', sportsResponse.message);
        }

        // Fetch culturals events with gender filter if user is logged in
        console.log('📡 Fetching cultural events...');
        const culturalsResponse = await getEventsByType('culturals', userGender);
        console.log('🎨 Culturals response:', culturalsResponse);
        if (culturalsResponse.success && culturalsResponse.data) {
          setCulturalEvents(culturalsResponse.data);
          console.log(`✅ Loaded ${culturalsResponse.data.length} cultural events ${userGender ? `for ${userGender} users` : ''}`);
        } else {
          console.warn('⚠️ No cultural events loaded:', culturalsResponse.message);
        }

        // Fetch para sports events with gender filter if user is logged in
        console.log('📡 Fetching para sports events...');
        const paraSportsResponse = await getEventsByType('parasports', userGender);
        console.log('♿ Para Sports response:', paraSportsResponse);
        if (paraSportsResponse.success && paraSportsResponse.data) {
          setParaSportsEvents(paraSportsResponse.data);
          console.log(`✅ Loaded ${paraSportsResponse.data.length} para sports events ${userGender ? `for ${userGender} users` : ''}`);
        } else {
          console.warn('⚠️ No para sports events loaded:', paraSportsResponse.message || paraSportsResponse.error);
        }
      } catch (error) {
        console.error('❌ Error fetching events:', error);
        console.log('💡 Troubleshooting tips:');
        console.log('   1. Make sure backend server is running: npm start');
        console.log('   2. Check if MongoDB is connected');
        console.log('   3. Verify API endpoints are working');
      } finally {
        setLoadingEvents(false);
        console.log('✅ Finished loading events');
      }
  }, [isLoggedIn, userProfileData.gender]);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Refetch events when user login status or gender changes
  useEffect(() => {
    if (isLoggedIn && userProfileData.gender) {
      console.log('🔄 User gender detected, refetching events for:', userProfileData.gender);
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
  
  const nextHighlightSlide = () => {
    setCurrentHighlightSlide((prev) => (prev + 1) % highlightCards.length);
  };

  const prevHighlightSlide = () => {
    setCurrentHighlightSlide((prev) => (prev - 1 + highlightCards.length) % highlightCards.length);
  };

  // Touch swipe handling for highlights carousel
  const [highlightTouchStart, setHighlightTouchStart] = useState<number | null>(null);
  const [highlightTouchEnd, setHighlightTouchEnd] = useState<number | null>(null);

  const handleHighlightTouchStart = (e: React.TouchEvent) => {
    setHighlightTouchEnd(null);
    setHighlightTouchStart(e.targetTouches[0].clientX);
  };

  const handleHighlightTouchMove = (e: React.TouchEvent) => {
    setHighlightTouchEnd(e.targetTouches[0].clientX);
  };

  const handleHighlightTouchEnd = () => {
    if (!highlightTouchStart || !highlightTouchEnd) return;
    const distance = highlightTouchStart - highlightTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextHighlightSlide();
    } else if (isRightSwipe) {
      prevHighlightSlide();
    }
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
      
      // Cultural events - using generic sports structure
      'Classical Dance Competition': 'Chess', // Using individual event structure
      'Western Music Band Competition': 'Football', // Using team event structure
      'Solo Singing Competition': 'Chess',
      'Drama & Theatre Competition': 'Football',
      'Fashion Show': 'Chess',
      'Folk Dance Competition': 'Chess',
      'Stand-up Comedy Competition': 'Chess',
      'Art & Painting Exhibition': 'Chess',
      'Poetry & Literature Competition': 'Chess',
      'DJ & Music Production Battle': 'Chess'
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
      }
    }
    
    console.log('Mapped event name:', eventName);
    
    // Check if event data exists before navigating
    const eventExists = eventDetailsData[eventName as keyof typeof eventDetailsData];
    
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
    setLoginFormData({ email: '', password: '' });
    setLoginMessage(null);
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
    setShowLoginModal(false); // Close login modal if open
  };

  const handleCloseSignup = () => {
    setShowSignupModal(false);
    setSignupFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      college: '',
      dateOfBirth: '',
      userType: 'visitor',
      participationType: 'none',
      referenceId: ''
    });
    setSubmitMessage(null);
    setShowUserIdPopup(false);
    setGeneratedUserId(null);
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
          referenceId: ''
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
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleForgotPasswordClick = () => {
    setShowLoginModal(false);
    setShowForgotPasswordModal(true);
    setResetMessage(null);
    setForgotPasswordEmail('');
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
    
    console.log('💰 PRICE CALCULATION START');
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
    
    // EXPLICIT FEMALE LOGIC - ALWAYS ₹250 FOR SINGLE TYPE
    const normalizedGender = gender?.toLowerCase();

    if (normalizedGender === 'female') {
      console.log('   - ✅ FEMALE USER DETECTED');
      
      if (hasSports && hasCulturals) {
        console.log('   - 👩 Female: Sports + Culturals = ₹350');
        return 350;
      }
      
      if (hasSports && !hasCulturals) {
        console.log('   - 👩 Female: Sports ONLY = ₹250');
        return 250;
      }
      
      if (hasCulturals && !hasSports) {
        console.log('   - 👩 Female: Culturals ONLY = ₹250');
        return 250;
      }
      
      console.log('   - ❌ Female user but no sports/culturals detected');
    }
    
    // MALE LOGIC
    if (normalizedGender === 'male') {
      console.log('   - ✅ MALE USER DETECTED');
      
      if (hasSports && hasCulturals) {
        console.log('   - 👨 Male: Sports + Culturals = ₹350');
        return 350;
      }
      
      if (hasSports && !hasCulturals) {
        console.log('   - 👨 Male: Sports ONLY = ₹350');
        return 350;
      }
      
      if (hasCulturals && !hasSports) {
        console.log('   - 👨 Male: Culturals ONLY = ₹250');
        return 250;
      }
    }
    
    // Fallback for users without gender info - charge as per event mix
    if (hasSports && hasCulturals) {
      console.log('   - ⚙️ Fallback: Sports + Culturals = ₹350');
      return 350;
    }
    if (hasSports) {
      console.log('   - ⚙️ Fallback: Sports only = ₹350');
      return 350;
    }
    if (hasCulturals) {
      console.log('   - ⚙️ Fallback: Culturals only = ₹250');
      return 250;
    }

    console.log('   - ❌ FALLBACK: Defaulting to ₹0');
    console.log('💰 PRICE CALCULATION END');
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
    const priceText = totalAmount === 0 ? 'FREE' : `₹${totalAmount}`;
    
    const confirmationMessage = `
🎯 REGISTRATION CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Selected Events (${eventIds.length}):
${eventsList}

👤 Participant: ${userProfileData.name}
⚧ Gender: ${userGender}
💰 Total Amount: ${priceText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
          ? `✅ Successfully registered for ${eventIds.length} event(s) for FREE!`
          : `✅ Successfully registered for ${eventIds.length} event(s)! Total amount: ₹${totalAmount}`;
          
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

  const handleShowProfile = () => {
    // Fetch event registrations count when opening profile
    if (userProfileData.userId) {
      fetchEventRegistrationsCount(userProfileData.userId);
    }
    setShowProfileModal(true);
  };

  const fetchEventRegistrationsCount = async (userId: string) => {
    try {
      const response = await getMyEventRegistrations(userId);
      if (response.success && response.data) {
        // Count the registrations
        const count = Array.isArray(response.data) ? response.data.length : 0;
        setEventRegistrationsCount(count);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  const handleCloseProfile = () => {
    setShowProfileModal(false);
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
        alert(`✅ Successfully saved and registered for ${eventIds.length} event(s)!`);
      } else {
        alert(result.message || 'Failed to save events. Please try again.');
      }
    } catch (error) {
      console.error('Error saving events:', error);
      alert('An error occurred while saving events.');
    }
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginMessage(null);

    // Validate required fields
    if (!loginFormData.email || !loginFormData.password) {
      setLoginMessage({
        type: 'error',
        text: 'Please enter email/userId and password'
      });
      setIsLoggingIn(false);
      return;
    }

    try {
      // Call the real login API
      const result = await loginUser(loginFormData.email, loginFormData.password);
      
      if (result.success && result.data) {
        const { userId, name, email, userType = 'visitor', gender } = result.data;
        console.log('🔑 Login success - User data:', { userId, name, email, userType, gender });
        
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
        console.log('💾 Storing user profile:', profileData);
        
        setShowLoginModal(false);
        setLoginFormData({ email: '', password: '' });
        
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
      console.log('💾 Loading user profile from localStorage:', profileData);
      
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
    <div className={`w-screen overflow-x-hidden relative font-sans min-h-screen ${timeTheme}-theme`}
         style={{background: "transparent"}}>
      
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
        <div className="fixed top-5 left-5 z-60 cursor-pointer" onClick={handlePageMenuToggle}>
          <div className="w-8 h-8 flex flex-col justify-around items-center transition-transform duration-300">
            <span className="block w-full h-0.5 rounded transition-all duration-300 bg-yellow-400" style={{backgroundColor: '#FFD700'}}></span>
            <span className="block w-full h-0.5 rounded transition-all duration-300 bg-yellow-400" style={{backgroundColor: '#FFD700'}}></span>
            <span className="block w-full h-0.5 rounded transition-all duration-300 bg-yellow-400" style={{backgroundColor: '#FFD700'}}></span>
          </div>
        </div>
      )}

      {/* Top-Right Profile Section */}
      {isLoggedIn && (
        <div className="fixed top-3 sm:top-5 right-3 sm:right-5 z-50 flex items-center gap-4 sm:gap-6 cursor-pointer bg-pink-600 px-6 sm:px-8 py-4 sm:py-5 rounded-full text-white hover:bg-purple-700 transition-all duration-300 border-2 border-yellow-400 min-w-[150px] sm:min-w-[200px]" onClick={handleShowProfile}>
          <div className="text-2xl sm:text-4xl">👤</div>
          <span className="text-sm sm:text-lg font-bold hidden xs:block">Welcome, {loggedInUserName}!</span>
          <span className="text-sm sm:text-lg font-bold block xs:hidden">Profile</span>
        </div>
      )}
     
      {/* 1. Hero Section (First Fold) - Moved to Top */}
      <section className="relative min-h-screen flex flex-col items-center justify-center md:justify-start md:pt-20 lg:pt-16 z-10 text-white text-center overflow-hidden" style={{background: "transparent"}} >
        <div className="flex justify-center items-center z-20 relative w-full px-0">
          <img src={`${import.meta.env.BASE_URL}image.png`} alt="Vignan Mahotsav" className="w-full max-w-none md:w-[95%] md:max-w-8xl lg:w-[92%] xl:w-[90%] object-contain bg-transparent border-none shadow-none animate-fadeInDown" style={{width: "120%", height: "120%", maxWidth: "none", marginLeft: "15%", marginRight: "0"}} />
        </div>
        <style>{`
          @media (min-width: 768px) {
            .animate-fadeInDown {
              margin-left: 5% !important;
            }
          }
          
          /* Mobile view adjustments for flower overlap */
          @media (max-width: 767px) {
            .flower-container-mobile {
              width: 150px !important;
              height: 150px !important;
              opacity: 0.25 !important;
            }
            
            /* Adjust all dashboard sections for mobile */
            .about-theme-section,
            .highlights-section,
            .dashboard-section {
              padding-left: 15px !important;
              padding-right: 15px !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
            
            .about-theme-container {
              padding-left: 10px !important;
              padding-right: 10px !important;
              max-width: 100% !important;
            }
            
            .theme-content {
              padding-left: 20px !important;
              padding-right: 20px !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
            
            .theme-description {
              padding-left: 5px !important;
              padding-right: 5px !important;
            }
            
            .highlights-navigation {
              margin-left: 0 !important;
              margin-right: 0 !important;
              padding-left: 5px !important;
              padding-right: 5px !important;
            }
            
            /* Ensure content has proper z-index above flowers */
            section {
              position: relative;
              z-index: 20 !important;
            }
          }
        `}</style>
        
        {/* Action Buttons - Register for events and login when not logged in */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 mb-4 justify-center items-center z-20 relative px-4 w-full">
          {isLoggedIn ? (
            <button className="w-56 h-16 sm:w-48 sm:h-14 md:w-52 lg:w-56 xl:w-60 bg-linear-to-r from-green-500 to-green-600 text-white rounded-2xl text-xl sm:text-lg md:text-xl font-semibold cursor-pointer transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center" onClick={() => {
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
            <button className="w-56 h-16 sm:w-48 sm:h-14 md:w-52 lg:w-56 xl:w-60 bg-linear-to-r from-pink-500 to-pink-600 text-white rounded-2xl text-xl sm:text-lg md:text-xl font-semibold cursor-pointer transition-all duration-300 hover:from-pink-600 hover:to-pink-700 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center" onClick={handleLoginClick}>Register/Login</button>
          )}
        </div>
      </section>

      {/* The Icon Component - Fixed position, animates with scroll */}
      <AnimatedIcon iconSrc={`${import.meta.env.BASE_URL}IMG_2037.webp`} />

      {/* Full Screen Grid Menu Overlay */}
      {showPageMenu && (
        <div className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-99998" 
          style={{
            backgroundImage: 'url("/Background-redesign.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}>
          {/* Floating Flower - Top Right */}
          <div className="fixed -top-64 -right-64 pointer-events-none" style={{ width: '600px', height: '600px', opacity: 0.25, zIndex: 1 }}>
            <div className="flower-inner" style={{ animation: 'spin-slow 120s linear infinite', transformOrigin: 'center center' }}>
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
                    zIndex: 10
                  }}
                />
              </div>
            </div>
          </div>

          {/* Floating Flower - Bottom Left */}
          <div className="fixed -bottom-64 -left-64 pointer-events-none" style={{ width: '600px', height: '600px', opacity: 0.25, zIndex: 1 }}>
            <div className="flower-inner" style={{ animation: 'spin-slow 120s linear infinite', transformOrigin: 'center center' }}>
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
                    zIndex: 10
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Back Button */}
          <button 
            className="circular-back-button"
            onClick={() => setShowPageMenu(false)}
            aria-label="Go back"
            style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', zIndex: 99999 }}
          >
          </button>

          {/* Menu Title */}
          <div className="text-center pt-8 pb-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-widest">MENU</h1>
          </div>

          {/* Grid Menu Items - Centered */}
          <div className="flex items-center justify-center h-[calc(100vh-140px)]">
            <div className="max-w-7xl mx-auto px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* HOME */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[180px] border border-white/20 group"
                onClick={() => { handleCardClick('HOME'); setShowPageMenu(false); }}
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
                <div className="text-6xl mb-4 text-yellow-400 transition-transform duration-300 group-hover:scale-125">⚓</div>
                <span className="text-white text-lg font-semibold tracking-wide">HOME</span>
              </div>

              {/* EVENTS */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[180px] border border-white/20 group"
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
                <div className="text-6xl mb-4 text-yellow-400 transition-transform duration-300 group-hover:scale-125">🗡️</div>
                <span className="text-white text-lg font-semibold tracking-wide">EVENTS</span>
              </div>

              {/* PROFILE */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[180px] border border-white/20 group"
                onClick={async (e) => { e.preventDefault(); if (userProfileData.userId) { await fetchUserSavedEvents(userProfileData.userId); } setShowMyEventsModal(true); setShowPageMenu(false); }}
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
                <div className="text-6xl mb-4 text-yellow-400 transition-transform duration-300 group-hover:scale-125">⚓</div>
                <span className="text-white text-lg font-semibold tracking-wide">PROFILE</span>
              </div>

              {/* SCHEDULE */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[180px] border border-white/20 group"
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
                <div className="text-6xl mb-4 text-yellow-400 transition-transform duration-300 group-hover:scale-125">🔭</div>
                <span className="text-white text-lg font-semibold tracking-wide">SCHEDULE</span>
              </div>

              {/* COLLABORATION */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[180px] border border-white/20 group"
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
                <div className="text-6xl mb-4 text-yellow-400 transition-transform duration-300 group-hover:scale-125">🛢️</div>
                <span className="text-white text-lg font-semibold tracking-wide">COLLABORATION</span>
              </div>

              {/* ZONALS */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[180px] border border-white/20 group"
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
                <div className="text-6xl mb-4 text-yellow-400 transition-transform duration-300 group-hover:scale-125">🗼</div>
                <span className="text-white text-lg font-semibold tracking-wide">ZONALS</span>
              </div>

              {/* PARA SPORTS */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[180px] border border-white/20 group"
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
                <div className="text-6xl mb-4 text-yellow-400 transition-transform duration-300 group-hover:scale-125">🧭</div>
                <span className="text-white text-lg font-semibold tracking-wide">PARA SPORTS</span>
              </div>

              {/* HOSPITALITY */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[180px] border border-white/20 group"
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
                <div className="text-6xl mb-4 text-yellow-400 transition-transform duration-300 group-hover:scale-125">🌴</div>
                <span className="text-white text-lg font-semibold tracking-wide">HOSPITALITY</span>
              </div>

              {/* CAMPUS AMBASSADOR */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[180px] border border-white/20 group"
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
                <div className="text-6xl mb-4 text-yellow-400 transition-transform duration-300 group-hover:scale-125">🚢</div>
                <span className="text-white text-lg font-semibold tracking-wide">CAMPUS AMBASSADOR</span>
              </div>

              {/* SPONSORS */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[180px] border border-white/20 group"
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
                <div className="text-6xl mb-4 text-yellow-400 transition-transform duration-300 group-hover:scale-125">📦</div>
                <span className="text-white text-lg font-semibold tracking-wide">SPONSORS</span>
              </div>

              {/* OUR TEAM */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[180px] border border-white/20 group"
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
                <div className="text-6xl mb-4 text-yellow-400 transition-transform duration-300 group-hover:scale-125">💣</div>
                <span className="text-white text-lg font-semibold tracking-wide">OUR TEAM</span>
              </div>

              {/* MAP */}
              <div 
                className="menu-grid-card bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl min-h-[180px] border border-white/20 group"
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
                <div className="text-6xl mb-4 text-yellow-400 transition-transform duration-300 group-hover:scale-125">🗺️</div>
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
                  ← Back
                </button>
                <h2>PARA SPORTS CATEGORIES</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowParaSports(false); setShowPageMenu(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevParaSportsSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextParaSportsSlide}>▶</button>
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
                  ← Back
                </button>
                <h2>PARA ATHLETICS MEN</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowParaAthleticsMen(false); setShowParaSports(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevParaAthleticsSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextParaAthleticsSlide}>▶</button>
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
                  ← Back
                </button>
                <h2>PARA CRICKET MEN</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowParaCricketMen(false); setShowParaSports(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevParaCricketSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextParaCricketSlide}>▶</button>
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
                  ← Back
                </button>
                <h2>CULTURAL CATEGORIES</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowCulturals(false); setShowPageMenu(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevCulturalsSlide}>◀</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: Math.min(3, culturalsCards.length) }).map((_, index) => {
                  const cardIndex = (currentCulturalsSlide + index) % culturalsCards.length;
                  const card = culturalsCards[cardIndex];
                  return (
                    <div 
                      key={cardIndex} 
                      className="indoor-sport-card"
                      onClick={() => handleCulturalsClick(card.title)}
                    >
                      <div className="indoor-sport-card-poster-background">
                        <span className="indoor-sport-poster-placeholder-text">CULTURAL POSTER</span>
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
              <button className="indoor-sports-nav-btn next" onClick={nextCulturalsSlide}>▶</button>
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
                  ← Back
                </button>
                <h2>MUSIC EVENTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowMusic(false); setShowCulturals(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevMusicSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextMusicSlide}>▶</button>
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
                  ← Back
                </button>
                <h2>DANCE EVENTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowDance(false); setShowCulturals(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevDanceSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextDanceSlide}>▶</button>
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
                  ← Back
                </button>
                <h2>THEATRE & CINEMATOGRAPHY</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowTheatre(false); setShowCulturals(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevTheatreSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextTheatreSlide}>▶</button>
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
                  ← Back
                </button>
                <h2>LITERATURE EVENTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowLiterature(false); setShowCulturals(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevLiteratureSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextLiteratureSlide}>▶</button>
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
                  ← Back
                </button>
                <h2>VISUAL ARTS & CRAFT</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowVisualArts(false); setShowCulturals(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevVisualArtsSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextVisualArtsSlide}>▶</button>
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
                  ← Back
                </button>
                <h2>FASHION DESIGN & STYLING</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowFashionDesign(false); setShowCulturals(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevFashionDesignSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextFashionDesignSlide}>▶</button>
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
                  ← Back
                </button>
                <h2>SPOT LIGHT EVENTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowSpotLight(false); setShowCulturals(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevSpotLightSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextSpotLightSlide}>▶</button>
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
              <button className="inline-sports-details-close-btn" onClick={() => { setShowSportsDetails(false); setShowPageMenu(true); }}>×</button>
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
                  ← Back
                </button>
                <h2>MEN'S INDIVIDUAL & INDOOR SPORTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowIndoorSports(false); setShowSportsDetails(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevIndoorSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextIndoorSlide}>▶</button>
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
                  ← Back
                </button>
                <h2>WOMEN'S INDIVIDUAL & INDOOR SPORTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowWomenIndoorSports(false); setShowSportsDetails(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevWomenIndoorSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextWomenIndoorSlide}>▶</button>
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
                  ← Back
                </button>
                <h2>MEN'S TEAM FIELD SPORTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowMenTeamSports(false); setShowSportsDetails(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevMenTeamSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextMenTeamSlide}>▶</button>
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
                  ← Back
                </button>
                <h2>WOMEN'S TEAM FIELD SPORTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowWomenTeamSports(false); setShowSportsDetails(true); }}>×</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevWomenTeamSlide}>◀</button>
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
              <button className="indoor-sports-nav-btn next" onClick={nextWomenTeamSlide}>▶</button>
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
      <section className="dashboard-section about-theme-section">
        <div className="about-theme-container">
          <h2 className="about-theme-title">About Theme</h2>
          <div className="theme-content">
            <h3 className="theme-name">Mahotsav 2026 - The Eternal Harmony</h3>
            <p className="theme-description">
              This is not just a theme, but a beacon of hope, a leap towards peace in the larger society around us. It inspires the visionaries of world peace. The hope of an eternal harmony focuses on ideals built through the refinement of the balance of all the interdependence that are crucial for the ecosystem to thrive.
            </p>
            <p className="theme-description">
              This fun revolution towards harmony includes vibrant, fostering connections and fulfillment. Mahotsav 2026 is a step towards better understanding the way we take pride in saying, "sustainability", "diversity", "inclusivity", "reliability", and "solidarity".
            </p>
            <p className="theme-description">
              Mahotsav, in its nature, is an entertaining and engaging event, and this year the focus is on using the influence of youth towards the global future in various aspects of the eternal harmony. Mahotsav 2026 is all set to focus on fun and the future, internally, societally and globally!
            </p>
            <p className="theme-description">
              Our vision encompasses not just technological advancement, but the holistic development of human consciousness towards creating a sustainable and harmonious world. We believe in the power of youth to drive meaningful change and create lasting impact through innovation, collaboration, and cultural exchange.
            </p>
            <p className="theme-description">
              Join us in this transformative journey as we explore the intersection of tradition and modernity, science and spirituality, individual growth and collective responsibility. Together, we're not just organizing an event - we're cultivating a movement towards eternal harmony that will resonate far beyond the boundaries of our institution.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights of 2025 Section */}
      <section className="dashboard-section highlights-section">
        <h2>Highlights of 2025</h2>
        <div className="highlights-navigation">
          <button className="highlights-nav-btn prev" onClick={prevHighlightSlide}></button>
          <div 
            className="highlights-carousel-3d-container"
            onTouchStart={handleHighlightTouchStart}
            onTouchMove={handleHighlightTouchMove}
            onTouchEnd={handleHighlightTouchEnd}
          >
            <div className="highlights-carousel-3d-wrapper">
              {highlightCards.map((card, index) => {
                const isActive = index === currentHighlightSlide;
                const offset = index - currentHighlightSlide;
                
                let transform = '';
                let zIndex = 0;
                let opacity = 0;
                let filter = 'grayscale(100%) brightness(0.5)';
                
                if (offset === 0) {
                  // Active card - center front
                  transform = 'translateX(0) translateY(0) translateZ(300px) rotateY(0deg) scale(1.05)';
                  zIndex = 10;
                  opacity = 1;
                  filter = 'none';
                } else if (offset === 1 || offset === -highlightCards.length + 1) {
                  // Right card - arc position
                  transform = 'translateX(75%) translateY(15%) translateZ(-300px) rotateY(-45deg) scale(0.75)';
                  zIndex = 5;
                  opacity = 0.5;
                  filter = 'brightness(0.3)';
                } else if (offset === -1 || offset === highlightCards.length - 1) {
                  // Left card - arc position
                  transform = 'translateX(-75%) translateY(15%) translateZ(-300px) rotateY(45deg) scale(0.75)';
                  zIndex = 5;
                  opacity = 0.5;
                  filter = 'brightness(0.3)';
                } else {
                  // Hidden cards
                  transform = 'translateX(0) translateZ(-600px) scale(0.5)';
                  zIndex = 1;
                  opacity = 0;
                  filter = 'grayscale(100%) brightness(0.5)';
                }
                
                return (
                  <div 
                    key={index}
                    className={`highlight-card-3d ${isActive ? 'active' : ''}`}
                    onClick={() => setCurrentHighlightSlide(index)}
                    style={{
                      transform,
                      zIndex,
                      opacity,
                      filter,
                      cursor: 'pointer'
                    }}
                  >
                    <div className="highlight-image">
                      <div className="day-badge">{card.day}</div>
                      <div className="highlight-video">
                        <video 
                          autoPlay={isActive}
                          controls
                          loop 
                          muted 
                          playsInline
                          preload="metadata"
                          className="day-video"
                        >
                          <source src={`${import.meta.env.BASE_URL}${card.video}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <button className="highlights-nav-btn next" onClick={nextHighlightSlide}></button>
        </div>
        <div className="highlights-carousel-indicators">
          {highlightCards.map((_, index) => (
            <button
              key={index}
              className={`highlights-indicator ${index === currentHighlightSlide ? 'active' : ''}`}
              onClick={() => setCurrentHighlightSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Accreditation Section - Standalone */}
      <section className="accreditation-section">
        <div className="accreditation-container">
          <img src={`${import.meta.env.BASE_URL}clg.png`} alt="Accreditation and Rankings" className="accreditation-main-image" />
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        {/* Footer Content */}
        <div className="footer-content">
          {/* Logo Section */}
          <div className="footer-logo-section">
            <img src={`${import.meta.env.BASE_URL}vig.png`} alt="Vignan Logo" className="footer-vignan-logo-img" />
          </div>
          
          {/* Contact Section */}
          <div className="footer-contact-section">
            <p className="footer-contact-label">Contact us: +91 94930 33592 | +91 90305 57363</p>
            <p className="footer-email-label">Email: <a href="mailto:mahotsav@vignan.ac.in">mahotsav@vignan.ac.in</a></p>
            <p className="footer-website-label">Website: <a href="https://vignan.ac.in/mahotsav" target="_blank" rel="noopener noreferrer">vignan.ac.in/mahotsav</a></p>
          </div>
          
          {/* Social Media */}
          <div className="footer-social-section">
            <p className="footer-social-label">Follow us on:</p>
            <div className="social-icons">
              <a href="https://www.instagram.com/vignan_mahotsav?igsh=c3lwNjc4Y2phaGlx" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                <img src={`${import.meta.env.BASE_URL}insta.svg`} alt="Instagram" />
              </a>
              <a href="https://whatsapp.com/channel/0029Vars0ZXJ3jutqK5hfj3r" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                <img src={`${import.meta.env.BASE_URL}wha.png`} alt="WhatsApp" />
              </a>
              <a href="https://linkedin.com/company/vignan-mahotsav" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                <img src={`${import.meta.env.BASE_URL}linkedin.svg`} alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Garuda Floating Bubble */}
      <GarudaBubble />

      {/* Events Info Modal */}
      {showEventsInfo && (
        <div className="events-info-modal" onClick={() => setShowEventsInfo(false)}>
          <div className="events-info-content" onClick={(e) => e.stopPropagation()}>
            <button className="events-info-close" onClick={() => setShowEventsInfo(false)}>×</button>
            <div className="events-info-grid">
              {eventInfoCards.map((card, index) => (
                <div key={index} className="event-info-card">
                  <div className="poster-placeholder">
                    <span>POSTER of EVENT</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="login-modal-overlay" onClick={handleCloseLogin}>
          <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>Welcome Back!</h2>
              <button className="close-btn" onClick={handleCloseLogin}>×</button>
            </div>
            <div className="login-modal-body">
              <form className="login-form" onSubmit={handleLoginSubmit}>
                {loginMessage && (
                  <div className={`submit-message ${loginMessage.type}`}>
                    {loginMessage.text}
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="email">Email or Mahotsav ID</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={loginFormData.email}
                    onChange={handleLoginInputChange}
                    placeholder="Enter email or MH26XXXXXX"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginFormData.password}
                    onChange={handleLoginInputChange}
                    placeholder="Enter your password"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" /> Remember me
                  </label>
                  <button type="button" onClick={handleForgotPasswordClick} className="forgot-password">Forgot password?</button>
                </div>
                <button type="submit" className="login-submit-btn" disabled={isLoggingIn}>
                  {isLoggingIn ? '⏳ Logging in...' : '🔑 Login'}
                </button>
                <div className="signup-link">
                  <p>Don't have an account? <button type="button" onClick={handleSignupClick} className="signup-btn">Sign up</button></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="login-modal-overlay" onClick={handleCloseSignup}>
          <div className="signup-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>Join Mahotsav 2026</h2>
              <button className="close-btn" onClick={handleCloseSignup}>×</button>
            </div>
            <div className="signup-modal-body">
              <form className="signup-form" onSubmit={handleSignupSubmit}>
                {submitMessage && (
                  <div className={`submit-message ${submitMessage.type}`}>
                    {submitMessage.text}
                  </div>
                )}
                
                <div className="form-section">
                  <h3>👤 Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={signupFormData.name}
                        onChange={handleSignupInputChange}
                        placeholder="Enter your full name"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dateOfBirth">Date of Birth * (Your Password)</label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={signupFormData.dateOfBirth || ''}
                        onChange={handleSignupInputChange}
                        className="form-input"
                        placeholder="DD/MM/YYYY"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select 
                      id="gender" 
                      name="gender" 
                      value={signupFormData.gender || ''}
                      onChange={handleSignupInputChange}
                      className="form-input form-select"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-section">
                  <h3>🎓 Academic Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="college">College Name</label>
                      <input
                        type="text"
                        id="college"
                        name="college"
                        value={signupFormData.college}
                        onChange={handleSignupInputChange}
                        placeholder="Enter your college name"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="registerId">Register ID</label>
                      <input
                        type="text"
                        id="registerId"
                        name="registerId"
                        value={signupFormData.registerId || ''}
                        onChange={handleSignupInputChange}
                        placeholder="Enter your register ID"
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="referenceId">Reference ID</label>
                    <input
                      type="text"
                      id="referenceId"
                      name="referenceId"
                      value={signupFormData.referenceId || ''}
                      onChange={handleSignupInputChange}
                      placeholder="Enter reference ID (optional)"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>📞 Contact Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={signupFormData.email}
                        onChange={handleSignupInputChange}
                        placeholder="your.email@example.com"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Mobile Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={signupFormData.phone}
                        onChange={handleSignupInputChange}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>🎯 Registration Type</h3>
                  <div className="form-group">
                    <label htmlFor="userType">I am registering as *</label>
                    <select 
                      id="userType" 
                      name="userType" 
                      value={signupFormData.userType || 'visitor'}
                      onChange={handleSignupInputChange}
                      className="form-input form-select"
                      required
                    >
                      <option value="visitor">Visitor</option>
                      <option value="participant">Participant</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="signup-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '⏳ Creating Account...' : '🎉 Create Account & Get Mahotsav ID'}
                </button>
                
                <div className="login-link">
                  <p>Already have an account? <button type="button" onClick={() => { setShowSignupModal(false); setShowLoginModal(true); }} className="login-btn-link">Login here</button></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Modal for Menu Categories */}
      {activeSubModal && (
        <div className="login-modal-overlay" onClick={handleCloseSubModal}>
          <div className="sub-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>{activeSubModal === 'EVENTS' ? 'REGISTER FOR EVENTS' : activeSubModal}</h2>
              <button className="close-btn" onClick={handleCloseSubModal}>×</button>
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
                        <h3>🎨 Cultural Events ({getFilteredCulturalEvents().length})</h3>
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
                            <p style={{color: '#e74c3c', fontWeight: 'bold'}}>⚠️ No para sports events loaded. Server might be down.</p>
                            <button onClick={() => fetchEvents()} style={{padding: '5px 10px', margin: '5px', backgroundColor: '#9b59b6', color: 'white', border: 'none', borderRadius: '4px'}}>
                              🔄 Retry Loading Events
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
                                  {event.prizePool && <p className="event-meta">💰 {event.prizePool}</p>}
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
                          🎯 Register for Events ({tempSelectedEvents.size})
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {activeSubModal === 'PROFILE' && (
                <div className="sub-cards-grid">
                  <div className="sub-card">
                    <h3>VIEW PROFILE</h3>
                  </div>
                  <div className="sub-card">
                    <h3>EDIT PROFILE</h3>
                  </div>
                  <div className="sub-card">
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
                <p className="userid-instructions">
                  Please save this ID for future reference. You will need this ID to login and participate in events.
                </p>
                <div className="userid-info">
                  <p>📧 A confirmation email has been sent to your registered email address with your credentials.</p>
                  <p>🔑 Your password is your date of birth in DDMMYYYY format (e.g., 15012000).</p>
                  <p>📝 Use your email/Mahotsav ID and password to login.</p>
                </div>
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
              <h2>🔑 Forgot Password</h2>
              <button className="close-btn" onClick={handleCloseForgotPassword}>×</button>
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
                  {isSendingReset ? '📧 Sending...' : '📧 Send Password to Email'}
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
                    ← Back to Login
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
          <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>👤 My Profile</h2>
              <button className="close-btn" onClick={handleCloseProfile}>×</button>
            </div>
            <div className="login-modal-body">
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
                    <div className="profile-info-item">
                      <span className="info-label">Registration Date:</span>
                      <span className="info-value">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="profile-stats-section">
                  <h4>📊 Activity Summary</h4>
                  <div className="stats-grid">
                    <div className="stat-box">
                      <div className="stat-number">{eventRegistrationsCount}</div>
                      <div className="stat-label">Events Registered</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-number">0</div>
                      <div className="stat-label">Events Completed</div>
                    </div>
                  </div>
                </div>

                <div className="profile-actions">
                  <button className="profile-action-btn edit-btn">✏️ Edit Profile</button>
                  <button className="profile-action-btn logout-btn" onClick={handleLogout}>🚪 Logout</button>
                </div>
              </div>
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
              <h2>📋 Select Events</h2>
              <button className="close-btn" onClick={handleCloseEventChecklist}>×</button>
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
                      <h3>⚽ Sports Events
                        {isLoggedIn && userProfileData.gender === 'female' && (
                          <span className="pricing-info"> (₹{getPricingForUser().sports} each)</span>
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
                              {event.date && <span className="event-meta-small">📅 {event.date}</span>}
                              {event.venue && <span className="event-meta-small">📍 {event.venue}</span>}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cultural Events Section */}
                  {getFilteredCulturalEvents().length > 0 && (
                    <div className="checklist-section">
                      <h3>🎨 Cultural Events
                        {isLoggedIn && userProfileData.gender === 'female' && (
                          <span className="pricing-info"> (₹{getPricingForUser().culturals} each)</span>
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
                              {event.date && <span className="event-meta-small">📅 {event.date}</span>}
                              {event.venue && <span className="event-meta-small">📍 {event.venue}</span>}
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
                  💾 Save to My Events
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
              <h2>🎫 My Registered Events</h2>
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
                            {event.eventType === 'sports' ? '⚽' : event.eventType === 'parasports' ? '🏅' : '🎨'} {event.eventType}
                          </span>
                        </div>
                        <p>{event.description || 'No description'}</p>
                        <div className="event-details-grid">
                          {event.date && <p className="event-meta">📅 {event.date}</p>}
                          {event.venue && <p className="event-meta">📍 {event.venue}</p>}
                          {event.prizePool && <p className="event-meta">💰 {event.prizePool}</p>}
                        </div>
                        <div className="event-registered-badge">
                          ✅ Registered
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
    </div>
  );
};

export default Dashboard;

