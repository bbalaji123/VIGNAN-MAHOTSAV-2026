import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';
import AnimatedIcon from './Animatedicon';
import EventRegistrationModal from './EventRegistrationModal';
import Login from './Login';
import Signup from './Signup';
import FlowerComponent from './components/FlowerComponent';
import Gallery, { galleryImages } from './Gallery';
import { API_BASE_URL, registerUser, loginUser, forgotPassword, getEventsByType, saveMyEvents, getUserRegisteredEvents, type SignupData, type Event } from './services/api';

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
    { title: "SPORTS", description: "Competitive sports events including Football, Basketball, Badminton, and more." },
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
  const [currentDay, setCurrentDay] = useState<1 | 2 | 3>(1);
  
  // Touch swipe state for carousels
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;
  const videoRef = useRef<HTMLIFrameElement>(null);

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

  // Placeholder for legacy sports/cultural event metadata that was previously
  // inlined as a large object. Currently only used for existence checks.
  const eventDetailsData = {} as const;

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
      contacts: [
        {name: "Ms. Ch.Aparna", phone: "+91 8523 81322"},
        {name: "Mr. B.Ram Chandu", phone: "+91 834124 0966"},
        {name: "Ms. Asritha", phone: "+91 73868 89772"},
        {name: "Mr. Vineesha", phone: "+91 99516 95475"}

      ]
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
      contacts: [
        {name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544"},
        {name: "Mr. M.Winstone", phone: "+91 83280 09698"},
        {name: "Ms. Varshitha", phone: "+91 87123 47513"}
      ]
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
      contacts: [
        {name: "Ms. Ch.Aparna", phone: "+91 8523 81322"},
        {name: "Mr. B.Ram Chandu", phone: "+91 8341 240966"},
        {name: "Ms. Asritha", phone: "+91 7386 889772"},
        {name: "Mr. Vineesha", phone: "+91 9951 695475"}
      ]
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
      contacts: [
        {name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544"},
        {name: "Mr. M.Winstone", phone: "+91 8328009698"},
        {name: "Ms. Varshitha", phone: "+91 8712347513"}
      ]
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
      contacts: [
        {name: "Ms. K.Pavankishore", phone: "+91 99633 17059"},
        {name: "Mr. P.Samba Siva Rao", phone: "+91 63011 24757"}
      ]
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
      contacts: [
        {name: "Ms. Ch.Aparna", phone: "+91 8523 81322"},
        {name: "Mr. B.Ram Chandu", phone: "+91 8341 240966"},
        {name: "Ms. Asritha", phone: "+91 7386 889772"},
        {name: "Mr. Vineesha", phone: "+91 9951 695475"}
      ]
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
      contacts: [
        {name: "Ms. K.Pavankishore", phone: "+91 9963317059"},
        {name: "Mr. P.Samba Siva Rao", phone: "+91 63011 24757"}
      ]
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
      contacts: [
        {name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544"},
        {name: "Mr. M.Winstone", phone: "+91 83280 09698"},
        {name: "Ms. Varshitha", phone: "+91 87123 47513"}
      ]
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
      contacts: [
        {name: "Ms. Ch.Aparna", phone: "+91 8523 81322"},
        {name: "Mr. B.Ram Chandu", phone: "+91 83412 40966"},
        {name: "Ms. Asritha", phone: "+91 73868 89772"},
        {name: "Mr. Vineesha", phone: "+91 99516 95475"}
      ]
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
      contacts: [
        {name: "Ms. K.Pavankishore", phone: "+91 9963317059"},
        {name: "Mr. P.Samba Siva Rao", phone: "+91 63011 24757"}
      ]
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
         {name: "Mr. S.Satya Reddy", phone: "+91 93900 41156"},
        {name: "Ms. Sara", phone: "+91 94904 84233"},
        {name: "Mr. Manohar ", phone: "+91 81253 97739"},
        {name: "Ms. Md.Nadira ", phone: "+91 93921 91983"},
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
    branch: '',
    dateOfBirth: '',
    userType: 'participant',
    participationType: 'none',
    referenceId: '',
    state: '',
    district: '',
    referralCode: ''
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
  const [userProfileData, setUserProfileData] = useState<{ 
    name: string; 
    email: string; 
    userId?: string; 
    userType?: string; 
    gender?: string;
    branch?: string;
    college?: string;
    phone?: string;
    dateOfBirth?: string;
  }>({ name: '', email: '' });
  const [showEventChecklistModal, setShowEventChecklistModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [tempSelectedEvents, setTempSelectedEvents] = useState<Set<string>>(new Set());
  const [paraSportsSelected, setParaSportsSelected] = useState(false);
  const [regularEventsSelected, setRegularEventsSelected] = useState(false);
  const [showMyEventsModal, setShowMyEventsModal] = useState(false);
  const [userRegisteredEvents, setUserRegisteredEvents] = useState<any[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationEvents, setRegistrationEvents] = useState<any>({ Sports: [], Culturals: [] });
  const [selectedRegistrationEvents, setSelectedRegistrationEvents] = useState<Set<string>>(new Set());

  // Helper to check if an event is already saved/registered for the user
  const isEventAlreadySaved = (eventName: string) => {
    return myEvents.some((event) => event.eventName === eventName);
  };

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
    
    if (userGender === 'female') {
      // Female users can only see female and mixed gender events
      const filtered = events.filter(event => 
        event.gender === 'female' || event.gender === 'mixed'
      );
      return filtered;
    }
    
    if (userGender === 'male') {
      // Male users can only see male and mixed gender events  
      const filtered = events.filter(event => 
        event.gender === 'male' || event.gender === 'mixed'
      );
      return filtered;
    }
    
    // For non-logged in users or other genders, show all events
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

  // Pricing helper for gender-based registration fees
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

  // Convert database events to simple card format for carousels
  const convertEventsToCards = (events: Event[]): { title: string; subtitle: string }[] => {
    return events.map((event) => ({
      title: event.eventName,
      subtitle: event.category || (event as any).eventType || 'Event'
    }));
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

  // Auto-rotate throwback videos every 15 seconds
  useEffect(() => {
    if (!isThrowbackUnlocked) return;
    
    const interval = setInterval(() => {
      setCurrentDay((prev) => (prev === 3 ? 1 : (prev + 1) as 1 | 2 | 3));
    }, 15000); // 15 seconds
    
    return () => clearInterval(interval);
  }, [isThrowbackUnlocked]);

  // Reset to Day 1 when year changes
  useEffect(() => {
    setCurrentDay(1);
  }, [selectedYear]);

  // Scroll tracking for throwback section - flower open/close animation
  useEffect(() => {
    // Use a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const throwbackSection = document.querySelector('[data-section-id="throwback"]');
      if (!throwbackSection) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
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

  // IntersectionObserver-based lazy loading for gallery images
  useEffect(() => {
    // Defer if there is no gallery on the current view
    const container = document.querySelector('.gallery-grid');
    if (!container) return;

    const images = container.querySelectorAll<HTMLImageElement>('img[data-src]');
    if (!images.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const img = entry.target as HTMLImageElement;
          const dataSrc = img.getAttribute('data-src');
          if (dataSrc) {
            // Swap in the real AVIF source once image is near viewport
            img.src = dataSrc;
            img.removeAttribute('data-src');
          }
          obs.unobserve(entry.target);
        });
      },
      {
        root: null,
        // Start loading slightly before the image enters the viewport
        rootMargin: '200px 0px',
        threshold: 0.1
      }
    );

    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
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
    const userGender = isLoggedIn ? userProfileData.gender : undefined;
    setLoadingEvents(true);
    try {
        // Fetch sports events with gender filter if user is logged in
        const sportsResponse = await getEventsByType('sports', userGender);
        if (sportsResponse.success && sportsResponse.data) {
          setSportsEvents(sportsResponse.data);
        }

        // Fetch culturals events with gender filter if user is logged in
        const culturalsResponse = await getEventsByType('culturals', userGender);
        if (culturalsResponse.success && culturalsResponse.data) {
          setCulturalEvents(culturalsResponse.data);
        }

        // Fetch para sports events with gender filter if user is logged in
        const paraSportsResponse = await getEventsByType('parasports', userGender);
        if (paraSportsResponse.success && paraSportsResponse.data) {
          setParaSportsEvents(paraSportsResponse.data);
        }
      } catch (error) {
        // Silently handle errors
      } finally {
        setLoadingEvents(false);
      }
  }, [isLoggedIn, userProfileData.gender]);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Refetch events when user login status or gender changes
  useEffect(() => {
    if (isLoggedIn && userProfileData.gender) {
      fetchEvents();
    }
  }, [isLoggedIn, userProfileData.gender, fetchEvents]);

  // Fetch registration events from JSON
  useEffect(() => {
    const loadRegistrationEvents = async () => {
      try {
        const response = await fetch('/registration/registration.json');
        const data = await response.json();
        setRegistrationEvents(data);
      } catch (error) {
        // Silent error handling
      }
    };
    loadRegistrationEvents();
  }, []);

  // Load saved events from database when user logs in
  useEffect(() => {
    const loadUserEvents = async () => {
      if (isLoggedIn && userProfileData.userId) {
        try {
          // Try to fetch from database first
          const response = await fetch(`${API_BASE_URL}/my-registrations/${userProfileData.userId}`);
          const result = await response.json();
          
          if (response.ok && result.success && result.data.events) {
            setMyEvents(result.data.events);
            // Also save to localStorage as backup
            const storageKey = `myEvents_${userProfileData.userId}`;
            localStorage.setItem(storageKey, JSON.stringify(result.data.events));
          } else {
            // Fallback to localStorage if API fails
            const storageKey = `myEvents_${userProfileData.userId}`;
            const savedEvents = localStorage.getItem(storageKey);
            if (savedEvents) {
              const events = JSON.parse(savedEvents);
              setMyEvents(events);
            }
          }
        } catch (error) {
          // Fallback to localStorage on error
          const storageKey = `myEvents_${userProfileData.userId}`;
          const savedEvents = localStorage.getItem(storageKey);
          if (savedEvents) {
            try {
              const events = JSON.parse(savedEvents);
              setMyEvents(events);
            } catch (parseError) {
              // Silent error handling
            }
          }
        }
      } else {
        setMyEvents([]);
      }
    };
    
    loadUserEvents();
  }, [isLoggedIn, userProfileData.userId]);

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
    
    // Check if event data exists in either sports or cultural events before navigating
    const eventExists = eventDetailsData[eventName as keyof typeof eventDetailsData] || 
                        culturalEventsData[eventName as keyof typeof culturalEventsData];
    
    if (eventExists || eventName) {
      // Navigate to the new event detail page
      navigate(`/event/${encodeURIComponent(eventName)}`);
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
      branch: '',
      dateOfBirth: '',
      userType: 'participant',
      participationType: 'none',
      referenceId: '',
      state: '',
      district: ''
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
      branch: '',
      dateOfBirth: '',
      userType: 'participant',
      participationType: 'none',
      referenceId: '',
      state: '',
      district: ''
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
        // Close signup modal and show beautiful credential card
        setShowSignupModal(false);
        setGeneratedUserId(result.data.userId);
        // Use password from backend response (in DD/MM/YYYY format)
        setGeneratedPassword(result.data.password || password);
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
          branch: '',
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
    // Check if user is logged in
    if (!isLoggedIn) {
      alert('Please login first to view your profile.');
      setShowLoginModal(true);
      return;
    }
    
    if (!userProfileData.userId) {
      alert('Unable to load profile. Please try logging in again.');
      return;
    }
    
    setShowProfileModal(true);
    setIsLoadingProfile(true);
    
    try {
      // Ensure latest saved events are loaded
      if (userProfileData.userId) {
        await fetchUserSavedEvents(userProfileData.userId);
      }

      // Fetch user's registered events
      const registrationsResult = await getUserRegisteredEvents(userProfileData.userId);
      
      if (registrationsResult.success && registrationsResult.data) {
        setUserRegisteredEvents(registrationsResult.data.registeredEvents || []);
      } else {
        setUserRegisteredEvents([]);
      }
    } catch (error) {
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
    
    // Update para/regular selection status
    const selectedEventsArray = Array.from(newSelected);
    const hasPara = selectedEventsArray.some(id => paraSportsEvents.some(pe => pe._id === id));
    const hasRegular = selectedEventsArray.some(id => sportsEvents.some(se => se._id === id) || culturalEvents.some(ce => ce._id === id));
    
    setParaSportsSelected(hasPara);
    setRegularEventsSelected(hasRegular);
  };

  const handleSaveSelectedEvents = async () => {
    if (!userProfileData.userId) {
      alert('Please login to save events!');
      return;
    }

    const eventIds = Array.from(selectedEvents);
    
    // Get full event objects from the selected IDs
    const allEvents = [...sportsEvents, ...culturalEvents, ...paraSportsEvents];
    const selectedEventObjects = eventIds.map(id => {
      const event = allEvents.find(e => e._id === id);
      if (!event) return null;
      
      return {
        eventName: event.eventName,
        eventType: event.eventType,
        category: event.category,
        description: event.description || '',
        fee: event.fee || 0
      };
    }).filter(e => e !== null);
    
    try {
      const result = await saveMyEvents(userProfileData.userId, selectedEventObjects);
      
      if (result.success) {
        // Fetch updated saved events from database
        await fetchUserSavedEvents(userProfileData.userId);
        setShowEventChecklistModal(false);
        alert(`? Successfully saved and registered for ${eventIds.length} event(s)!`);
      } else {
        alert(result.message || 'Failed to save events. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while saving events.');
    }
  };

  const handleLoginSubmit = async (payload: { mahotsavId?: string; regNo?: string; email?: string; password: string }) => {
    setIsLoggingIn(true);
    setLoginMessage(null);

    // Validate required fields
    const identifier = payload.mahotsavId || payload.regNo || payload.email;
    if (!identifier || !payload.password) {
      setLoginMessage({
        type: 'error',
        text: 'Please enter email/userId and password'
      });
      setIsLoggingIn(false);
      return;
    }

    try {
      // Call the real login API with the identifier
      const result = await loginUser(identifier, payload.password);
      
      if (result.success && result.data) {
        const { userId, name, email, userType = 'visitor', gender, branch, college, phone, dateOfBirth } = result.data;
        
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
        
        // Store user profile data with all available fields
        const profileData = {
          name: name,
          email: email,
          userId: userId,
          userType: userType || 'visitor',
          gender: gender, // No default value
          branch: branch,
          college: college,
          phone: phone,
          dateOfBirth: dateOfBirth
        };
        setUserProfileData(profileData);
        
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
        if (branch) {
          localStorage.setItem('userBranch', branch);
        }
        if (college) {
          localStorage.setItem('userCollege', college);
        }
        if (phone) {
          localStorage.setItem('userPhone', phone);
        }
        if (dateOfBirth) {
          localStorage.setItem('userDOB', dateOfBirth);
        }
        localStorage.setItem('isLoggedIn', 'true');
        
        // Fetch user's saved events from database
        await fetchUserSavedEvents(userId);

        // After successful login, open the profile page/modal directly
        setShowProfileModal(true);
        setIsLoadingProfile(true);
        
        try {
          // Fetch user's registered events
          const registrationsResult = await getUserRegisteredEvents(userId);
          
          if (registrationsResult.success && registrationsResult.data) {
            setUserRegisteredEvents(registrationsResult.data.registeredEvents || []);
          } else {
            setUserRegisteredEvents([]);
          }
        } catch (error) {
          setUserRegisteredEvents([]);
        } finally {
          setIsLoadingProfile(false);
        }
      } else {
        setLoginMessage({
          type: 'error',
          text: result.message || 'Login failed. Please check your credentials.'
        });
      }
    } catch (error) {
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
    const storedBranch = localStorage.getItem('userBranch');
    const storedCollege = localStorage.getItem('userCollege');
    const storedPhone = localStorage.getItem('userPhone');
    const storedDOB = localStorage.getItem('userDOB');
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    
    if (storedLoginStatus === 'true' && storedUserName && storedUserId) {
      setIsLoggedIn(true);
      setLoggedInUserName(storedUserName);
      const profileData = {
        name: storedUserName,
        email: storedUserEmail || '',
        userId: storedUserId,
        userType: storedUserType || 'visitor',
        gender: storedUserGender || undefined, // Convert null to undefined
        branch: storedBranch || undefined,
        college: storedCollege || undefined,
        phone: storedPhone || undefined,
        dateOfBirth: storedDOB || undefined
      };
      setUserProfileData(profileData);
      
      // Fetch user's saved events from database
      if (storedUserId) {
        fetchUserSavedEvents(storedUserId);
      }
    }
  }, []);
  const fetchUserSavedEvents = async (userId: string): Promise<Set<string>> => {
    try {
      const result = await getUserRegisteredEvents(userId);
      if (result.success && result.data && result.data.registeredEvents) {
        const events = result.data.registeredEvents;
        setMyEvents(events);
        // Create Set of event names for comparison
        const savedEventIds = new Set<string>(events.map((e: any) => e.eventName || e.Event || e.name));
        setSelectedEvents(savedEventIds);
        return savedEventIds; // Return the event IDs for immediate use
      }
    } catch (error) {
      // Silent error handling
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
         style={{background: "transparent", maxWidth: "100vw", overflowX: "hidden", position: "relative", padding: "0", margin: "0", display: "flex", flexDirection: "column"}}>
      
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
          <div className="absolute top-0 left-16 sm:top-7 z-60">
            <img 
              src={`${import.meta.env.BASE_URL}Garuda.avif`}
              alt="Garuda"
              className="h-20 sm:h-24 w-auto object-contain"
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
        {/* Left side image - 1.avif */}
        <div className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none" style={{ width: '450px', height: '450px', paddingLeft: '80px',paddingTop: '90px' }}>
          <img src="/1.avif" alt="Decoration Left" className="w-full h-full object-contain pointer-events-none" />
        </div>
        
        {/* Right side image - 2.avif */}
        <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none" style={{ width: '450px', height: '450px', paddingRight: '80px', paddingTop: '90px', opacity: 1, transition: 'opacity 0.6s ease-in-out' }}>
          <img src="/2.avif" alt="Decoration Right" className="w-full h-full object-contain pointer-events-none" />
        </div>
        
        {/* National Level Youth Festival Text - Positioned absolutely */}
        <div className="absolute top-8 left-0 right-0 z-20 w-full px-4 pt-4 pointer-events-none">
        </div>
        {/* Logo */}
        <div className="flex justify-center items-center z-20 relative w-full px-0 mahotsav-logo-container" style={{marginTop: "-80px", display: "flex", justifyContent: "center"}}>
          <img src={`${import.meta.env.BASE_URL}image.avif`} alt="Vignan Mahotsav" className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[50%] max-w-none object-contain bg-transparent border-none shadow-none animate-fadeInDown mahotsav-logo-img" style={{height: "60%", maxWidth: "none", marginLeft: "50px", marginRight: "50px", marginTop: "-80px"}} />
        </div>
        
        {/* Action Buttons - separate container with mobile-specific positioning */}
        <div className="flex justify-center items-center mt-8 lg:-mt-72 hero-action-buttons" style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem', zIndex: 20, position: 'relative', paddingLeft: '1rem', paddingRight: '1rem', width: '100%', alignItems: 'center'}}>
          {isLoggedIn ? (
            myEvents.length === 0 ? (
            <button 
              className="register-events-btn"
              style={{width: '11rem', height: '3rem', background: 'linear-gradient(to right, #FF69B4, #FF1493)', color: 'white', borderRadius: '1rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(255, 105, 180, 0.4)'}} 
              onClick={handleOpenProfile}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 105, 180, 0.6)';
                e.currentTarget.style.background = 'linear-gradient(to right, #FF1493, #C71585)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 105, 180, 0.4)';
                e.currentTarget.style.background = 'linear-gradient(to right, #FF69B4, #FF1493)';
              }}
            >Register for Events</button>
            ) : null
          ) : (
            <button 
              className="register-login-btn w-44 h-12 sm:w-48 sm:h-13 md:w-52 md:h-14 bg-linear-to-r from-pink-500 to-pink-600 text-white rounded-2xl text-sm sm:text-base md:text-lg font-semibold cursor-pointer transition-all duration-300 hover:from-pink-600 hover:to-pink-700 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center touch-manipulation active:scale-95"
              style={{
                marginTop: '0',
                marginLeft: '0',
              }}
              onClick={handleLoginClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(236, 72, 153, 0.6)';
                e.currentTarget.style.background = 'linear-gradient(to right, #db2777, #be185d)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(236, 72, 153, 0.4)';
                e.currentTarget.style.background = 'linear-gradient(to right, #ec4899, #db2777)';
              }}
            >Register/Login</button>
          )}
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
            
            /* Center Register/Login button on mobile */
            .hero-action-buttons {
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            
            .register-login-btn {
              margin-top: -80px !important;
            }
            
            /* Adjust all dashboard sections for mobile */
            .dashboard-container {
              display: flex !important;
              flex-direction: column !important;
            }
            
            .throwback-section {
              order: 1 !important;
            }
            
            .about-theme-section {
              order: 2 !important;
            }
            
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
      </section>

      {/* The Icon Component - Fixed position flower - Hide in Gallery and Throwback sections */}
      {!visibleSections.has('throwback') && !visibleSections.has('throwbacks') && <AnimatedIcon />}

      {/* Full Screen Grid Menu Overlay */}
      {showPageMenu && (
        <div className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat overflow-visible" 
          style={{
            backgroundImage: 'url("https://res.cloudinary.com/dctuev0mm/image/upload/v1766935583/Background-redesign_jbvbrc.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            zIndex: 99998
          }}>
          {/* Floating Flower - Top Right */}
          <div className="fixed -top-32 -right-32 md:-top-64 md:-right-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]" style={{ border: 'none', outline: 'none' }}>
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
                hideMoon={true}
              />
            </div>
            {/* Static Moon - Not rotating */}
            <img 
              src={`${import.meta.env.BASE_URL}moon.avif`}
              alt="Moon"
              style={{
                position: 'absolute',
                width: '43%',
                height: '43%',
                top: '28.5%',
                left: '28.5%',
                pointerEvents: 'none',
                zIndex: 10,
                animation: 'none',
                transform: 'none'
              }}
            />
          </div>

          {/* Floating Flower - Bottom Left */}
          <div className="fixed -left-32 md:-left-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]" style={{ bottom: '-150px', border: 'none', outline: 'none' }}>
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
                hideMoon={true}
              />
            </div>
            {/* Static Moon - Not rotating */}
            <img 
              src={`${import.meta.env.BASE_URL}moon.avif`}
              alt="Moon"
              style={{
                position: 'absolute',
                width: '43%',
                height: '43%',
                top: '28.5%',
                left: '28.5%',
                pointerEvents: 'none',
                zIndex: 10,
                animation: 'none',
                transform: 'none'
              }}
            />
          </div>
          
          {/* Back Button and Menu Title - Combined on Mobile */}
          <div className="menu-header-container-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginTop: '10px', marginBottom: '10px' }}>
            <div className="menu-back-button-mobile">
              <button
                onClick={() => setShowPageMenu(false)}
                className="w-24 h-12 flex items-center justify-center bg-transparent border-none cursor-pointer transition-all duration-300 hover:scale-110"
                aria-label="Go back"
              >
                <img
                  src={`${import.meta.env.BASE_URL}BACK.avif`}
                  alt="Back"
                  className="w-full h-full object-contain"
                />
              </button>
            </div>
            <h1 className="menu-title-heading text-3xl font-bold text-white tracking-widest" style={{textShadow: '0 4px 12px rgba(0,0,0,0.3)', fontFamily: 'coffee+tea demo, sans-serif !important', flex: 1, textAlign: 'center', marginRight: '96px'}}>MENU</h1>
          </div>

          {/* Menu Title - Desktop Only */}
          <div className="text-center menu-title-container menu-title-desktop" style={{marginTop: "10px", paddingBottom: "2px"}}>
            <h1 className="menu-title-heading text-4xl md:text-6xl font-bold text-white tracking-widest" style={{textShadow: '0 4px 12px rgba(0,0,0,0.3)', fontFamily: 'coffee+tea demo, sans-serif !important'}}>MENU</h1>
          </div>

          {/* Grid Menu Items - Scrollable Container */}
          <div className="overflow-y-auto overflow-x-hidden h-[calc(100vh-100px)] px-4 md:px-6 menu-grid-container" style={{marginTop: "-90px"}}>
            <div className="max-w-5xl mx-auto py-4 md:py-6 flex items-center justify-center min-h-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {/* Back Button - Inside Scroll (Desktop Only) */}
              <div className="col-span-2 md:col-span-4 flex justify-start mb-2 menu-back-button-desktop" style={{ marginLeft: '-190px' }}>
                <button
                  onClick={() => setShowPageMenu(false)}
                  className="w-32 h-16 flex items-center justify-center bg-transparent border-none cursor-pointer transition-all duration-300 hover:scale-110"
                  aria-label="Go back"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}BACK.avif`}
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
                onClick={(e) => { e.preventDefault(); handleOpenProfile(); setShowPageMenu(false); }}
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
                  navigate('/events-info', { state: { openSection: 'paraCards' } });
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
                <img src="https://res.cloudinary.com/dctuev0mm/image/upload/v1766997935/para_sports_tbld5k.svg" alt="Para Sports" className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-125" />
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
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowParaSports(false); setShowPageMenu(true); }}>?</button>
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
                      <img 
                        src="/events/para.avif"
                        alt={card.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
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
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowParaAthleticsMen(false); setShowParaSports(true); }}>?</button>
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
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowParaCricketMen(false); setShowParaSports(true); }}>?</button>
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
                <h2>PERFORMING ARTS,VISUAL ARTS,LITERARY,FASHION</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowCulturals(false); setShowPageMenu(true); }}>?</button>
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
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowMusic(false); setShowCulturals(true); }}>?</button>
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
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowDance(false); setShowCulturals(true); }}>?</button>
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
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowTheatre(false); setShowCulturals(true); }}>?</button>
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
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowLiterature(false); setShowCulturals(true); }}>?</button>
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
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowVisualArts(false); setShowCulturals(true); }}>?</button>
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
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowFashionDesign(false); setShowCulturals(true); }}>?</button>
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
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowSpotLight(false); setShowCulturals(true); }}>?</button>
            </div>
            <div className="indoor-sports-navigation">
              <button className="indoor-sports-nav-btn prev" onClick={prevSpotLightSlide}>?</button>
              <div className="indoor-sports-grid">
                {Array.from({ length: Math.min(3, spotLightCards.length) }).map((_, index) => {
                  const cardIndex = (currentSpotLightSlide + index) % spotLightCards.length;
                  const card = spotLightCards[cardIndex];
                  
                  // Image mapping for spotlight events
                  const spotlightImageMap: { [key: string]: string } = {
                    "Mr. and Ms. Mahotsav": "events/Mr and ms mahotsav.avif",
                    "Mahotsav Got Talent": "events/gaming.avif"
                  };
                  
                  const imagePath = spotlightImageMap[card.title];
                  
                  // Only render if image path exists
                  if (!imagePath) return null;
                  
                  const baseUrl = import.meta.env.BASE_URL || '/';
                  
                  return (
                    <div key={cardIndex} className="indoor-sport-card">
                      <img 
                        src={`${baseUrl}${imagePath}`}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
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
              <button className="inline-sports-details-close-btn" onClick={() => { setShowSportsDetails(false); setShowPageMenu(true); }}>?</button>
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
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowIndoorSports(false); setShowSportsDetails(true); }}>?</button>
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
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowWomenIndoorSports(false); setShowSportsDetails(true); }}>?</button>
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
                <h2>TEAM FIELD SPORTS</h2>
              </div>
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowMenTeamSports(false); setShowSportsDetails(true); }}>?</button>
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
              <button className="inline-indoor-sports-close-btn" onClick={() => { setShowWomenTeamSports(false); setShowSportsDetails(true); }}>?</button>
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
          
          {/* Garuda Logo - Above title on mobile, left side on desktop */}
          <div className="garuda-about-theme" style={{
            position: 'absolute',
            height: 'auto',
            zIndex: 1
          }}>
            <img 
              src="/Garuda.avif" 
              alt="Garuda Logo"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>

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
                color: '#f5e210ff',
                textAlign: 'justify',
                fontWeight: '400',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                fontFamily: 'coffee+tea demo, sans-serif'
              }}>
                Vignan is all geared up for the 19th edition of Mahotsav 2026, a national-level convergence of talent centered on the sacred theme "Eternal Harmony," running for three dynamic days from February 5th to 7th, 2026. This event is meticulously designed to merge the diverse pursuits of sport, culture, art, and athletics into a single, vibrant platform, offering over 20,000 participants from 300+ colleges a high-stakes opportunity to showcase their excellence. With a magnificent prize pool exceeding ?17,00,000, Mahotsav 2026 is an essential crucible for nurturing the nation's most promising young minds, providing a powerful stage for students, a high-visibility engagement platform for sponsors, and a celebrated organizational achievement for Vignan, reinforcing its legacy as a premier host of national youth aspiration.
              </p>
          </div>
          
          {/* Stats Bar */}
          <div ref={statsRef} style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '30px',
            padding: '40px 15px',
            marginTop: '40px',
            boxShadow: '0 0 30px rgba(223, 160, 0, 0.822)',
            maxWidth: '1200px',
            margin: '40px auto 0'
          }}>
            <div className="stats-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {/* Footfall */}
              <div style={{ textAlign: 'center', minWidth: '150px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px',color: '#1e3050' }}><i className="fa-solid fa-people-group"></i></div>
                <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.75rem', marginBottom: '5px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{footfall.toLocaleString()}+</div>
                <div style={{ color: '#f5e210', fontWeight: '600', fontSize: '1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>TOTAL FOOTFALL</div>
              </div>
              
              {/* Colleges */}
              <div style={{ textAlign: 'center', minWidth: '150px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px',color: '#1e3050' }}><i className="fa-solid fa-graduation-cap"></i></div>
                <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.75rem', marginBottom: '5px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{colleges}+</div>
                <div style={{ color: '#f5e210', fontWeight: '600', fontSize: '1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>COLLEGES</div>
              </div>
              
              {/* Events */}
              <div style={{ textAlign: 'center', minWidth: '150px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px',color: '#1e3050' }}><i className="fa-solid fa-trophy"></i></div>
                <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.75rem', marginBottom: '5px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{events}+</div>
                <div style={{ color: '#f5e210', fontWeight: '600', fontSize: '1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>EVENTS</div>
              </div>
              
              {/* Online Audience */}
              <div style={{ textAlign: 'center', minWidth: '150px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px',color: '#1e3050'}}><i className="fa-solid fa-earth-africa"></i></div>
                <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.75rem', marginBottom: '5px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{onlineAudience.toLocaleString()}+</div>
                <div style={{ color: '#f5e210', fontWeight: '600', fontSize: '1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>ONLINE AUDIANCE</div>
              </div>
              
              {/* Editions */}
              <div style={{ textAlign: 'center', minWidth: '150px' }}>
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '#1e3050 4px solid',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}>18</div>
                </div>
                <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1rem', marginBottom: '5px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>18 EDITIONS</div>
                <div style={{ color: '#f5e210', fontWeight: '600', fontSize: '1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>OF FESTIVITIES</div>
              </div>
              
              {/* Cash Prizes */}
              <div style={{ textAlign: 'center', minWidth: '150px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px', color: '#1e3050' }}><i className="fa-solid fa-hand-holding-dollar"></i></div>
                <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.75rem', marginBottom: '5px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{cashPrizes}+ LACKS</div>
                <div style={{ color: '#f5e210', fontWeight: '600', fontSize: '1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>CASH PRIZES</div>
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
            width: calc((100vw - 80px) / 3);
            max-width: 280px;
            min-width: 100px;
            height: clamp(140px, 20vw, 200px);
            border-radius: 15px;
            overflow: visible;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
          }

          @media (max-width: 768px) {
            .throwback-card {
              width: calc((100vw - 60px) / 3);
              gap: 10px;
            }
            
            .scroll-row {
              gap: 10px;
            }

            /* Year buttons - keep in single row on mobile, above video */
            .throwback-year-buttons {
              top: calc(50% - 140px) !important;
              flex-wrap: nowrap !important;
              gap: 10px !important;
              padding: 0 10px !important;
              justify-content: center !important;
            }

            .throwback-year-buttons button {
              padding: 6px 14px !important;
              font-size: 0.85rem !important;
              flex-shrink: 0 !important;
            }

            /* Video wrapper - center between flowers */
            .throwback-video-wrapper {
              top: 50% !important;
              width: calc(100% - 40px) !important;
              max-width: 500px !important;
            }

            .throwback-video-card {
              width: 100% !important;
              aspect-ratio: 16/9 !important;
              height: auto !important;
            }

            .throwback-video-card iframe {
              position: relative !important;
              height: 100% !important;
            }

            /* Center Register button in mobile */
            .register-events-btn,
            .register-login-btn {
              position: relative !important;
              margin-top: 0 !important;
              margin-left: 0 !important;
              left: auto !important;
            }

            /* Profile section mobile responsiveness */
            .profile-info-box {
              padding: 1.5rem !important;
            }

            /* Side menu flowers - hide completely on mobile */
            .side-menu-flower-top,
            .side-menu-flower-bottom {
              display: none !important;
            }

            /* Hero section improvements */
            .hero-action-buttons {
              margin-top: 2rem !important;
            }

            /* Profile modal mobile improvements */
            .profile-modal-header {
              padding: 0.5rem !important;
            }

            .profile-back-btn,
            .profile-logout-btn {
              padding: 0.4rem 0.8rem !important;
              font-size: 0.9rem !important;
              left: 0.5rem !important;
            }

            .profile-logout-btn {
              right: 0.5rem !important;
              left: auto !important;
            }

            .profile-title {
              font-size: 1.2rem !important;
            }

            .profile-content-area {
              padding: 1rem !important;
            }

            .profile-content-wrapper {
              max-width: 100% !important;
            }

            /* Registration Success Modal - Mobile Responsive */
            .credential-card {
              width: 95vw !important;
              max-width: 95vw !important;
              padding: 1.5rem !important;
              margin: 10px !important;
            }

            .credential-card h2 {
              font-size: 1.5rem !important;
              margin-bottom: 0.5rem !important;
            }

            .credential-card p {
              font-size: 0.875rem !important;
              margin-bottom: 1.5rem !important;
            }

            .credential-card > div:first-of-type {
              padding: 1.25rem !important;
            }

            .credential-card label {
              font-size: 0.75rem !important;
            }

            .credential-card span[style*="fontSize: '1.5rem'"] {
              font-size: 1.1rem !important;
              letter-spacing: 1px !important;
            }

            .credential-card button {
              font-size: 1rem !important;
              padding: 0.875rem !important;
            }

            /* Success icon smaller on mobile */
            .credential-card > div[style*="width: '80px'"] {
              width: 60px !important;
              height: 60px !important;
            }

            .credential-card > div[style*="width: '80px'"] span {
              font-size: 2rem !important;
            }

            /* Decorative corners smaller */
            .credential-card > div[style*="width: '120px'"] {
              width: 60px !important;
              height: 60px !important;
            }

            /* Screenshot warning mobile */
            .credential-card > div[style*="background: linear-gradient(135deg, rgba(220, 38, 38"] {
              flex-direction: column !important;
              text-align: center !important;
              padding: 1rem !important;
            }

            .credential-card > div[style*="background: linear-gradient(135deg, rgba(220, 38, 38"] span {
              font-size: 1.5rem !important;
            }

            .credential-card > div[style*="background: linear-gradient(135deg, rgba(220, 38, 38"] p {
              font-size: 0.875rem !important;
            }
          }

          /* iPhone 12 Pro and similar devices (390px width) */
          @media (max-width: 430px) {
            /* Registration Success Modal - Extra Small Screens */
            .credential-card {
              width: 92vw !important;
              max-width: 92vw !important;
              padding: 1.25rem !important;
              border-radius: 20px !important;
            }

            .credential-card h2 {
              font-size: 1.35rem !important;
              line-height: 1.3 !important;
            }

            .credential-card p {
              font-size: 0.8rem !important;
            }

            /* Credentials container - tighter spacing */
            .credential-card > div:first-of-type {
              padding: 1rem !important;
              margin-bottom: 1rem !important;
            }

            .credential-card label {
              font-size: 0.7rem !important;
              margin-bottom: 0.4rem !important;
            }

            /* ID and Password display */
            .credential-card span[style*="fontSize: '1.5rem'"] {
              font-size: 1rem !important;
              letter-spacing: 0.5px !important;
              padding: 0.75rem 1rem !important;
            }

            /* Success icon */
            .credential-card > div[style*="width: '80px'"] {
              width: 50px !important;
              height: 50px !important;
              margin-bottom: 1rem !important;
            }

            .credential-card > div[style*="width: '80px'"] span {
              font-size: 1.75rem !important;
            }

            /* Corner decorations */
            .credential-card > div[style*="width: '120px'"] {
              width: 50px !important;
              height: 50px !important;
            }

            /* Screenshot warning */
            .credential-card > div[style*="background: linear-gradient(135deg, rgba(220, 38, 38"] {
              padding: 0.875rem 1rem !important;
              gap: 0.5rem !important;
              margin-bottom: 1rem !important;
            }

            .credential-card > div[style*="background: linear-gradient(135deg, rgba(220, 38, 38"] span {
              font-size: 1.25rem !important;
            }

            .credential-card > div[style*="background: linear-gradient(135deg, rgba(220, 38, 38"] p:first-of-type {
              font-size: 0.8rem !important;
              line-height: 1.4 !important;
            }

            .credential-card > div[style*="background: linear-gradient(135deg, rgba(220, 38, 38"] p:last-of-type {
              font-size: 0.75rem !important;
            }

            /* Continue button */
            .credential-card button {
              font-size: 0.95rem !important;
              padding: 0.8rem !important;
              border-radius: 10px !important;
            }

            /* General spacing adjustments */
            .credential-card > div {
              margin-bottom: 0.75rem !important;
            }
          }

          /* Tablet styles for flowers */
          @media (min-width: 640px) and (max-width: 1023px) {
            .side-menu-flower-top,
            .side-menu-flower-bottom {
              opacity: 0.02 !important;
              filter: blur(1.5px) !important;
            }
          }

          /* Desktop-only styles for flowers */
          @media (min-width: 1024px) {
            .side-menu-flower-top {
              opacity: 0.04 !important;
              filter: blur(1px) !important;
            }

            .side-menu-flower-bottom {
              opacity: 0.04 !important;
              filter: blur(1px) !important;
            }
          }

          /* Large desktop styles for flowers */
          @media (min-width: 769px) {
            .side-menu-flower-top {
              top: -16rem !important;
              right: -16rem !important;
              width: 37.5rem !important;
              height: 37.5rem !important;
            }

            .side-menu-flower-bottom {
              bottom: -16rem !important;
              left: -16rem !important;
              width: 37.5rem !important;
              height: 37.5rem !important;
            }

            /* Desktop positioning for Register button */
            .register-events-btn,
            .register-login-btn {
              position: relative !important;
              margin-top: -100px !important;
              margin-left: 0 !important;
              left: auto !important;
            }

            /* Desktop padding for profile */
            .profile-info-box {
              padding: 6.25rem 43.75rem 6.25rem 6.25rem !important;
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
      
      {/* Gallery Section */}
      <Gallery 
        onPhotoClick={(row: number, index: number) => setSelectedPhoto({ row, index })}
        registerSection={registerSection}
      />

      {/* Throwback Section */}
      <section 
        className={`dashboard-section throwback-section ${isThrowbackUnlocked ? 'unlocked' : ''}`}
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
          overflow: 'hidden'
        }}
      >
        <h2
  style={{
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    fontWeight: 'bold',
    color: '#fdee71',
    marginBottom: '-27px',
    textAlign: 'center',
    fontFamily: 'Bradley Hand, cursive',
    position: 'relative',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(253, 238, 113, 0.5)',
    letterSpacing: '2px'

  }}
>
  Throwback
</h2>

        {/* Flower Container with Lock System */}
        <div className="throwback-flower-container" style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          maxHeight: 'calc(100vh - 200px)',
        }}>
          {/* Container for both flower halves */}
          <div className="throwback-flower-wrapper" style={{
            position: 'relative',
            width: 'clamp(200px, 35vw, 450px)',
            height: 'clamp(200px, 35vw, 450px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '-20px'
          }}>
            {/* Left Half */}
            <div className="throwback-flower-left" style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: isThrowbackUnlocked 
                ? 'translate(calc(-50% - clamp(180px, 25vw, 400px)), -50%)' 
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
                showPetalRotation={false}
                petalAnimation={isThrowbackUnlocked ? 'none' : 'petalsRotateAnticlockwise 40s linear infinite'}
                clipPath="inset(0 50% 0 0)"
                clipPathTransition="clip-path 2s cubic-bezier(0.4, 0.0, 0.2, 1)"
                style={{
                  overflow: 'visible',
                }}
              />
            </div>

            {/* Right Half */}
            <div className="throwback-flower-right" style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: isThrowbackUnlocked 
                ? 'translate(calc(-50% + clamp(180px, 25vw, 400px)), -50%)' 
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
                showPetalRotation={false}
                petalAnimation={isThrowbackUnlocked ? 'none' : 'petalsRotateAnticlockwise 40s linear infinite'}
                clipPath="inset(0 0 0 50%)"
                clipPathTransition="clip-path 2s cubic-bezier(0.4, 0.0, 0.2, 1)"
                style={{
                  overflow: 'visible'
                }}
              />
            </div>
          </div>

          {/* Year buttons - separate from video */}
          <div className="throwback-year-buttons" style={{
            position: 'absolute',
            top: window.innerWidth >= 768 ? '20px' : '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '30px',
            pointerEvents: 'auto',
            zIndex: 15,
            opacity: isThrowbackUnlocked ? 1 : 0,
            transition: 'opacity 1.5s ease 0.5s',
            justifyContent: 'center'
          }}>
            {(['2023', '2024', '2025'] as const).map(year => (
              <button 
                key={year} 
                onClick={() => setSelectedYear(year)}
                style={{
                  padding: '8px 26px',
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

          {/* Video card - centered between flowers */}
          <div className="throwback-video-wrapper" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 5,
            opacity: isThrowbackUnlocked ? 1 : 0,
            transition: 'opacity 1.5s ease 0.5s',
            width: window.innerWidth >= 768 ? 'auto' : 'calc(100% - 40px)',
            maxWidth: window.innerWidth >= 768 ? 'none' : '500px'
          }}>
              {/* Video card */}
              <div 
                className="throwback-video-card"
                style={{
                  background: '#000',
                  borderRadius: '8px',
                  border: '3px solid rgba(223, 160, 0, 0.822)',
                  boxShadow: '0 0 30px rgba(223, 160, 0, 0.822)',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  cursor: 'default',
                  padding: 0,
                  pointerEvents: 'auto',
                  zIndex: 100
                }}
              >
                {/* YouTube Video Embed */}
                <iframe
                  ref={videoRef}
                  key={`video-${selectedYear}-${currentDay}-${isThrowbackUnlocked}`}
                  width="100%"
                  height="100%"
                  src={isThrowbackUnlocked ? `https://www.youtube.com/embed/${
                    selectedYear === '2023' 
                      ? currentDay === 1 ? 'N3dzZ6CVdqg' : currentDay === 2 ? 'lPQ4inwLiFk' : 'o_jkjFvHftM'
                      : selectedYear === '2024'
                      ? currentDay === 1 ? 'NMqFcGgZmz0' : currentDay === 2 ? '498q6iDA5MA' : 'VOXMqhE3YF4'
                      : currentDay === 1 ? '2U5XHsBwNpw' : currentDay === 2 ? 'nhZWo0IIaUs' : 'EKTdbforGSk'
                  }?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&enablejsapi=1` : ''}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title="Mahotsav Throwback Video"
                  loading="lazy"
                  style={{
                    border: 'none',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1,
                    pointerEvents: 'auto'
                  }}
                />
                {/* Day indicator */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '5px 12px',
                  borderRadius: '15px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}>
                  Day {currentDay}
                </div>
              </div>
            </div>

          {/* Lock Icon removed */}
        </div>

        {/* Countdown Timer */}
        <div 
          className="throwback-countdown-timer"
          style={{
          marginTop: '30px',
          position: 'relative',
          display: 'flex',
          gap: '20px',
          padding: '25px 35px',
          borderRadius: '16px',
          background: 'rgba(61, 0, 84, 0.75)',
          color: '#FFFFFF',
          boxShadow: '0 0 30px rgba(223, 160, 0, 0.822)',
          animation: 'timerGlow 1.5s infinite alternate',
          zIndex: 10,
          marginBottom: '200px',
          justifyContent: 'center'
        }}>
          {(['days', 'hours', 'minutes', 'seconds'] as const).map(unit => (
            <div key={unit} style={{
              width: window.innerWidth < 640 ? '70px' : '85px',
              height: '90px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div 
                className={animate[unit] ? 'timer-digit-change' : ''}
                style={{
                  width: '100%',
                  height: '60px',
                  fontSize: window.innerWidth < 640 ? '2rem' : '2.6rem',
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
                fontSize: window.innerWidth < 640 ? '0.9rem' : '1.5rem',
                color: '#E0E0E0',
                marginTop: '6px',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                fontFamily: 'BakeryRoastDemo, sans-serif'
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
            <button className="events-info-close" onClick={() => setShowEventsInfo(false)}>?</button>
            
            {/* Corner Flowers for Events Information */}
            {/* Floating Flower - Top Right */}
            <div className="fixed -top-16 -right-16 md:-top-32 md:-right-32 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-1" style={{ border: 'none', outline: 'none' }}>
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
                  hideMoon={true}
                />
              </div>
              {/* Static Moon - Not rotating */}
              <img 
                src={`${import.meta.env.BASE_URL}moon.avif`}
                alt="Moon"
                style={{
                  position: 'absolute',
                  width: '43%',
                  height: '43%',
                  top: '28.5%',
                  left: '28.5%',
                  pointerEvents: 'none',
                  zIndex: 10,
                  animation: 'none',
                  transform: 'none',
                  opacity: 0.25
                }}
              />
            </div>

            {/* Floating Flower - Bottom Left */}
            <div className="fixed -bottom-16 -left-16 md:-bottom-32 md:-left-32 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-1" style={{ border: 'none', outline: 'none' }}>
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
                  hideMoon={true}
                />
              </div>
              {/* Static Moon - Not rotating */}
              <img 
                src={`${import.meta.env.BASE_URL}moon.avif`}
                alt="Moon"
                style={{
                  position: 'absolute',
                  width: '43%',
                  height: '43%',
                  top: '28.5%',
                  left: '28.5%',
                  pointerEvents: 'none',
                  zIndex: 10,
                  animation: 'none',
                  transform: 'none',
                  opacity: 0.25
                }}
              />
            </div>
            
            <div className="events-navigation">
              <button className="events-nav-btn prev" onClick={prevEventSlide}>?</button>
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
              <button className="events-nav-btn next" onClick={nextEventSlide}>?</button>
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
                  setActiveSubModal(null);
                }}
                type="button"
              >
                �
              </button>
            </div>
            <div className="sub-modal-body">
              
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
        <div className="login-modal-overlay" onClick={handleCloseUserIdPopup} style={{
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="credential-card" onClick={(e) => e.stopPropagation()} style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderRadius: '24px',
            padding: '3rem',
            maxWidth: '550px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.3)',
            border: '2px solid rgba(255, 215, 0, 0.4)',
            animation: 'fadeInScale 0.5s ease-out',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative corner elements */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
              borderRadius: '0 0 100% 0'
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '120px',
              height: '120px',
              background: 'linear-gradient(315deg, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
              borderRadius: '100% 0 0 0'
            }} />

            {/* Success Icon with glow */}
            <div style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto',
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                <span style={{ fontSize: '3rem' }}>🎉</span>
              </div>
            </div>

            <h2 style={{
              color: '#ffd700',
              textAlign: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              textShadow: '0 2px 10px rgba(255, 215, 0, 0.3)',
              position: 'relative',
              zIndex: 1
            }}>
              Registration Successful!
            </h2>
            
            <p style={{
              color: '#e5e7eb',
              textAlign: 'center',
              marginBottom: '2rem',
              fontSize: '1rem',
              position: 'relative',
              zIndex: 1
            }}>
              Welcome to Vignan Mahotsav 2026
            </p>

            {/* Credentials Container */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '1.5rem',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  color: '#fbbf24',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Your Mahotsav ID
                </label>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #ffd700',
                  boxShadow: '0 4px 15px rgba(255, 215, 0, 0.2)'
                }}>
                  <span style={{
                    color: '#ffffff',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    letterSpacing: '2px',
                    display: 'block',
                    textAlign: 'center'
                  }}>
                    {generatedUserId}
                  </span>
                </div>
              </div>

              <div>
                <label style={{
                  color: '#fbbf24',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Your Password
                </label>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #ffd700',
                  boxShadow: '0 4px 15px rgba(255, 215, 0, 0.2)'
                }}>
                  <span style={{
                    color: '#ffffff',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    letterSpacing: '2px',
                    display: 'block',
                    textAlign: 'center'
                  }}>
                    {generatedPassword}
                  </span>
                </div>
              </div>
            </div>

            {/* Screenshot Warning */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(239, 68, 68, 0.1) 100%)',
              border: '2px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              position: 'relative',
              zIndex: 1
            }}>
              <span style={{ fontSize: '2rem' }}>📸</span>
              <div>
                <p style={{
                  color: '#fef3c7',
                  fontSize: '1rem',
                  fontWeight: '600',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  Important: Take a screenshot of this page!
                </p>
                <p style={{
                  color: '#e5e7eb',
                  fontSize: '0.875rem',
                  margin: '0.25rem 0 0 0'
                }}>
                  Save these credentials for future login
                </p>
              </div>
            </div>

            <button 
              onClick={handleCloseUserIdPopup}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#1a1a2e',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
                position: 'relative',
                zIndex: 1
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.4)';
              }}
            >
              Continue to Login →
            </button>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="login-modal-overlay" onClick={handleCloseForgotPassword}>
          <div className="forgot-password-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>?? Forgot Password</h2>
              <button className="close-btn" onClick={handleCloseForgotPassword}>?</button>
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

      {/* Profile Modal - New Design */}
      {showProfileModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 99999,
          backgroundImage: 'url("https://res.cloudinary.com/dctuev0mm/image/upload/v1766935583/Background-redesign_jbvbrc.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'auto'
        }}>

          {/* Content Container */}
          <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
            
            {/* Student Details Header with Logout Button */}
            <div className="profile-modal-header" style={{
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(12px)',
              padding: '0.5rem 1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative',
              fontSize: '1.25rem',

            }}>
              <button
                onClick={handleCloseProfile}
                className="profile-back-btn"
                style={{
                  padding: '0.5rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#1f2937',
                  fontWeight: 'bold',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'absolute',
                  left: '1.5rem',
                  fontSize: '1.2rem'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'white'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'}
              >
                Back
              </button>
              <h1 className="profile-title" style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>Student Details</h1>
              <button
                onClick={handleLogout}
                className="profile-logout-btn"
                style={{
                  padding: '0.5rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#1f2937',
                  fontWeight: 'bold',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'absolute',
                  right: '1.5rem',
                  fontSize: '1.2rem'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'white'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'}
              >
                Logout
              </button>
            </div>

            {/* Main Content Area - Horizontally Centered */}
            <div className="profile-content-area" style={{ padding: '3rem', display: 'flex', justifyContent: 'center' }}>
              {isLoadingProfile ? (
                <div style={{ color: 'white', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                  Loading profile data...
                </div>
              ) : (
                <div className="profile-content-wrapper" style={{ maxWidth: '2000px', width: '100%' }}>
              
              {/* User Info Box */}
              <div className="profile-info-box" style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(12px)',
                borderRadius: '0.5rem',
                padding: '2rem',
                marginBottom: '1.5rem',
                marginTop: '0',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                wordWrap: 'break-word',
                overflowWrap: 'break-word'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'white', fontSize: '1rem', minWidth: '120px', flexShrink: 0 }}>Reg No</span>
                    <span style={{ color: 'white', fontSize: '1rem', wordBreak: 'break-word' }}>: {userProfileData?.userId || 'N/A'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'white', fontSize: '1rem', minWidth: '120px', flexShrink: 0 }}>Name</span>
                    <span style={{ color: 'white', fontSize: '1rem', textTransform: 'uppercase', wordBreak: 'break-word' }}>: {userProfileData?.name || 'N/A'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'white', fontSize: '1rem', minWidth: '120px', flexShrink: 0 }}>Email</span>
                    <span style={{ color: 'white', fontSize: '1rem', wordBreak: 'break-all' }}>: {userProfileData?.email || 'N/A'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'white', fontSize: '1rem', minWidth: '120px', flexShrink: 0 }}>Gender</span>
                    <span style={{ color: 'white', fontSize: '1rem', textTransform: 'capitalize', wordBreak: 'break-word' }}>: {userProfileData?.gender || 'N/A'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'white', fontSize: '1rem', minWidth: '120px', flexShrink: 0 }}>DOB</span>
                    <span style={{ color: 'white', fontSize: '1rem', wordBreak: 'break-word' }}>: {userProfileData?.dateOfBirth || 'N/A'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'white', fontSize: '1rem', minWidth: '120px', flexShrink: 0 }}>College</span>
                    <span style={{ color: 'white', fontSize: '1rem', wordBreak: 'break-word' }}>: {userProfileData?.college || 'N/A'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'white', fontSize: '1rem', minWidth: '120px', flexShrink: 0 }}>Branch</span>
                    <span style={{ color: 'white', fontSize: '1rem', wordBreak: 'break-word' }}>: {userProfileData?.branch || 'N/A'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'white', fontSize: '1rem', minWidth: '120px', flexShrink: 0 }}>Phone</span>
                    <span style={{ color: 'white', fontSize: '1rem', wordBreak: 'break-word' }}>: {userProfileData?.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Event Details Section with Button on Right */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold', margin: 0 }}>Event Details</h2>
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    setShowMyEventsModal(true);
                  }}
                  style={{
                    padding: '0.75rem 2rem',
                    background: '#ec09bbe6',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    borderRadius: '0.375rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textTransform: 'uppercase'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#2563eb';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#3b82f6';
                  }}
                >
                  EDIT/REGISTER
                </button>
              </div>
              
              {/* Events Count Box */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(12px)',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <p style={{ color: 'white', fontSize: '1.125rem', textAlign: 'center', margin: 0, fontWeight: '500' }}>
                  You are enrolled in {userRegisteredEvents.length || myEvents.length} events.
                </p>
              </div>
              
              {/* Combined Events and Welcome Section */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(12px)',
                borderRadius: '0.5rem',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Inline view of registered events */}
                <div style={{ width: '100%', maxWidth: '500px' }}>
                  {myEvents.length > 0 ? (
                    <>
                      <h3 style={{ color: '#fef3c7', fontSize: '1.25rem', fontWeight: 700, textAlign: 'center', marginBottom: '1rem' }}>
                        My Registered Events
                      </h3>
                      <div style={{ maxHeight: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {myEvents.map((event, index) => (
                          <div
                            key={event._id || `${event.eventName}-${index}`}
                            style={{
                              background: 'rgba(255, 255, 255, 0.18)',
                              borderRadius: '0.5rem',
                              padding: '0.75rem 1rem',
                              border: '1px solid rgba(255, 255, 255, 0.25)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.25rem'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
                                {event.eventName}
                              </span>
                              {event.eventType && (
                                <span
                                  style={{
                                    background: event.eventType === 'sports' ? '#3b82f6' : '#ec4899',
                                    color: 'white',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '999px',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase'
                                  }}
                                >
                                  {event.eventType}
                                </span>
                              )}
                            </div>
                            {event.category && (
                              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>
                                {event.category}
                              </span>
                            )}
                            {event.description && (
                              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                                {event.description}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', textAlign: 'center', marginTop: '1rem' }}>
                        Use the <strong>EDIT/REGISTER</strong> button above to modify your events.
                      </p>
                    </>
                  ) : (
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', textAlign: 'center' }}>
                      You haven't registered for any events yet. Use the <strong>EDIT/REGISTER</strong> button above to choose your events.
                    </p>
                  )}
                </div>
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
              <button className="close-btn" onClick={handleCloseEventChecklist}>?</button>
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
                      <h3>Sports Events
                        {isLoggedIn && userProfileData.gender === 'female' && (
                          <span className="pricing-info"> ({getPricingForUser().sports} each)</span>
                        )}
                      </h3>
                      <div className="checklist-items">
                        {getFilteredSportsEvents().map((event) => (
                          <label key={event._id} className={`checklist-item ${isEventDisabled(event) ? 'disabled' : ''}`}>
                            <input
                              type="checkbox"
                              checked={selectedEvents.has(event._id)}
                              onChange={() => handleToggleEventSelection(event._id)}
                              disabled={isEventDisabled(event)}
                            />
                            <div className="checklist-item-content">
                              <h4>{event.eventName}</h4>
                              <p>{event.description || 'No description'}</p>
                              {event.date && <span className="event-meta-small">{event.date}</span>}
                              {event.venue && <span className="event-meta-small">{event.venue}</span>}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cultural Events Section */}
                  {getFilteredCulturalEvents().length > 0 && (
                    <div className="checklist-section">
                      <h3>Cultural Events
                        {isLoggedIn && userProfileData.gender === 'female' && (
                          <span className="pricing-info"> ({getPricingForUser().culturals} each)</span>
                        )}
                      </h3>
                      <div className="checklist-items">
                        {getFilteredCulturalEvents().map((event) => (
                          <label key={event._id} className={`checklist-item ${isEventDisabled(event) ? 'disabled' : ''}`}>
                            <input
                              type="checkbox"
                              checked={selectedEvents.has(event._id)}
                              onChange={() => handleToggleEventSelection(event._id)}
                              disabled={isEventDisabled(event)}
                            />
                            <div className="checklist-item-content">
                              <h4>{event.eventName}</h4>
                              <p>{event.description || 'No description'}</p>
                              {event.date && <span className="event-meta-small">{event.date}</span>}
                              {event.venue && <span className="event-meta-small">{event.venue}</span>}
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
                  Save to My Events
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
              <h2>My Registered Events</h2>
              <button className="close-btn" onClick={() => setShowMyEventsModal(false)}>×</button>
            </div>
            <div className="event-checklist-body">
              <p className="checklist-instructions">
                These are your registered events.
              </p>
              
              {myEvents.length > 0 ? (
                <div className="my-events-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {myEvents.map((event, index) => (
                    <div key={event._id || index} style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      position: 'relative'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600', margin: 0, flex: 1 }}>
                          {event.eventName}
                        </h4>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span style={{
                            background: event.eventType === 'sports' ? '#3b82f6' : '#ec4899',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                          }}>
                            {event.eventType}
                          </span>
                          <button
                            onClick={async () => {
                              if (confirm(`Are you sure you want to remove "${event.eventName}" from your registered events?`)) {
                                try {
                                  const updatedEvents = myEvents.filter((_, i) => i !== index);
                                  
                                  // Update in database
                                  const response = await fetch(`${API_BASE_URL}/save-events`, {
                                    method: 'POST',
                                    headers: {
                                      'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                      userId: userProfileData.userId,
                                      events: updatedEvents
                                    })
                                  });

                                  const result = await response.json();

                                  if (response.ok && result.success) {
                                    // Update localStorage
                                    const storageKey = `myEvents_${userProfileData.userId}`;
                                    localStorage.setItem(storageKey, JSON.stringify(updatedEvents));
                                    
                                    // Update state
                                    setMyEvents(updatedEvents);
                                    alert('Event removed successfully!');
                                  } else {
                                    throw new Error(result.message || 'Failed to remove event');
                                  }
                                } catch (error) {
                                  console.error('Error removing event:', error);
                                  alert('Failed to remove event. Please try again.');
                                }
                              }
                            }}
                            style={{
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.375rem',
                              padding: '0.35rem 0.6rem',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = '#dc2626';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = '#ef4444';
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      {event.category && (
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', margin: '0.5rem 0' }}>
                          {event.category}
                        </p>
                      )}
                      {event.description && (
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                          {event.description}
                        </p>
                      )}
                      {event.fee && (
                        <p style={{ color: '#fbbf24', fontSize: '0.875rem', fontWeight: '600', margin: '0.5rem 0 0 0' }}>
                          Fee: ₹{event.fee}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-events-saved" style={{ textAlign: 'center', padding: '2rem' }}>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
                    You haven't registered for any events yet.
                  </p>
                  <button 
                    className="browse-events-btn" 
                    onClick={() => {
                      setShowMyEventsModal(false);
                      setShowRegistrationModal(true);
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(to right, #fbbf24, #f59e0b)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
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
        <div className="footer-content" style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '20px 20px 0 20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
          {/* Logo Section */}
          <div>
            <img 
              src={`${import.meta.env.BASE_URL}image.avif`}
              alt="Mahotsav 2026" 
              className="footer-logo"
              style={{
                height: '200px',
                objectFit: 'contain',
                marginBottom: '-60px',
                marginLeft: '-7px',
                marginTop: '-80px'
              }}
            />
            {/* Social Media Icons */}
            <h3 className="footer-heading" style={{
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              marginBottom: '12px',
              letterSpacing: '1px'
            }}>FOLLOW US ON :</h3>
            <div className="footer-social" style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '25px'
            }}>
              <a href="https://www.instagram.com/vignan_mahotsav/profilecard/?igsh=dDE1MHNpcmM4eXhm" target="_blank" rel="noopener noreferrer" className="social-icon" style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://whatsapp.com/channel/0029Vars0ZXJ3jutqK5hfj3r" target="_blank" rel="noopener noreferrer" className="social-icon" style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/vignan-mahotsav" target="_blank" rel="noopener noreferrer" className="social-icon" style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="footer-heading" style={{
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              marginBottom: '12px',
              letterSpacing: '1px'
            }}>CONTACT US :</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="mailto:mahotsav@vignan.ac.in" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="footer-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 6 10-6"/>
                </svg>
                <span className="footer-text" style={{ color: '#fff', fontSize: '0.7rem', cursor: 'pointer' }}>mahotsav@vignan.ac.in</span>
              </a>
              <a href="tel:+919493033592" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="footer-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span className="footer-text" style={{ color: '#fff', fontSize: '0.7rem', cursor: 'pointer' }}>+91 94930 33592</span>
              </a>
              <a href="tel:+919030557363" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="footer-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span className="footer-text" style={{ color: '#fff', fontSize: '0.7rem', cursor: 'pointer' }}>+91 90305 57363</span>
              </a>
            </div>
          </div>

          {/* Location Section */}
          <div>
            <h3 className="footer-heading" style={{
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              marginBottom: '12px',
              letterSpacing: '1px'
            }}>LOCATION :</h3>
            <div style={{ display: 'flex', alignItems: 'start', gap: '10px', marginBottom: '12px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="footer-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginTop: '2px', flexShrink: 0 }}>
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <p className="footer-text" style={{ color: '#fff', fontSize: '0.7rem', lineHeight: '1.6', margin: 0 }}>
                VIGNAN'S FOUNDATION FOR SCIENCE, TECHNOLOGY & RESEARCH (DEEMED TO BE UNIVERSITY), VADLAMUDI, GUNTUR, A.P -522213
              </p>
            </div>
            <a 
              href="https://maps.app.goo.gl/5pufqAcYqKrQCyQZ6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
              style={{
                color: '#a78bfa',
                fontSize: '0.7rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                marginTop: '-3px',
                paddingLeft: '8px',
                transition: 'color 0.3s'
              }}
            >
              VIEW ON GOOGLE MAPS
              <svg className="footer-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

          {/* Photo Content - reuse AVIF gallery image for modal view */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '900px',
              maxHeight: '80vh',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.85)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'default'
            }}
          >
            <img
              src={galleryImages[selectedPhoto.row * 6 + selectedPhoto.index]}
              alt={`Gallery ${selectedPhoto.row * 6 + selectedPhoto.index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}

      {/* Registration Modal with Events from JSON */}
      {showRegistrationModal && (
        <div 
          className="login-modal-overlay" 
          onClick={() => setShowRegistrationModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            backdropFilter: 'blur(10px)'
          }}
        >
          <div 
            className="registration-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, rgba(139, 69, 172, 0.95), rgba(88, 28, 135, 0.95))',
              borderRadius: '1rem',
              padding: '2rem',
              width: '90%',
              maxWidth: '900px',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold', margin: 0 }}>Register for Events</h2>
              <button
                onClick={() => setShowRegistrationModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  padding: 0,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                ×
              </button>
            </div>

            {/* Calculate constraint states */}
            {(() => {
              const hasParaSelected = Array.from(selectedRegistrationEvents).some(id => id.startsWith('para-'));
              const hasNormalSelected = Array.from(selectedRegistrationEvents).some(id => id.startsWith('sport-') || id.startsWith('cultural-'));
              (window as any).__hasParaSelected = hasParaSelected;
              (window as any).__hasNormalSelected = hasNormalSelected;
              return null;
            })()}

            {/* Category Cards: Sports, Culturals, Para */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
                marginBottom: '1.5rem'
              }}
            >
              {/* Sports Events Card */}
              {registrationEvents.Sports && registrationEvents.Sports.length > 0 && (
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    border: '1px solid rgba(148, 163, 184, 0.6)'
                  }}
                >
                  <h3
                    style={{
                      color: '#fef3c7',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      marginBottom: '0.75rem'
                    }}
                  >
                    Sports Events
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '260px', overflowY: 'auto' }}>
                    {registrationEvents.Sports.map((event: any, index: number) => {
                      if (!event || !event.Event) return null;

                      const eventId = `sport-${index}`;
                      const eventName = event.Event;
                      const category = event.Category || '';
                      const isHeader = category && category.trim() !== '';

                      // Gender-based filtering
                      const userGender = userProfileData.gender?.toLowerCase();
                      if (userGender && category) {
                        const categoryLower = category.toLowerCase();
                        if (userGender === 'male' && categoryLower.includes('women')) {
                          return null; // Skip women's events for male users
                        }
                        if (userGender === 'female' && categoryLower.includes('men') && !categoryLower.includes('women')) {
                          return null; // Skip men's events for female users
                        }
                      }

                      if (isHeader) {
                        return (
                          <div
                            key={eventId}
                            style={{
                              color: '#fbbf24',
                              fontWeight: 'bold',
                              fontSize: '1.05rem',
                              marginTop: '0.75rem',
                              paddingLeft: '0.25rem'
                            }}
                          >
                            {category}
                          </div>
                        );
                      }

                      const disabled = isEventAlreadySaved(eventName);
                      const constraintDisabled = !disabled && (window as any).__hasParaSelected;
                      const finalDisabled = disabled || constraintDisabled;
                      const isChecked = disabled || selectedRegistrationEvents.has(eventId);

                      return (
                        <label
                          key={eventId}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: finalDisabled
                              ? 'rgba(75, 85, 99, 0.5)'
                              : 'rgba(255, 255, 255, 0.08)',
                            padding: '0.6rem 0.85rem',
                            borderRadius: '0.5rem',
                            cursor: finalDisabled ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            opacity: constraintDisabled ? 0.5 : 1
                          }}
                          onMouseOver={(e) => {
                            if (!finalDisabled) {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                            }
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = finalDisabled
                              ? 'rgba(75, 85, 99, 0.5)'
                              : 'rgba(255, 255, 255, 0.08)';
                          }}
                          onClick={(e) => {
                            if (constraintDisabled && !disabled) {
                              e.preventDefault();
                              alert('You have selected Para Sports events. Please deselect them before selecting regular Sports or Cultural events.');
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={finalDisabled}
                            onChange={() => {
                              if (finalDisabled) return;
                              
                              setSelectedRegistrationEvents((prev) => {
                                const newSet = new Set(prev);
                                if (newSet.has(eventId)) {
                                  newSet.delete(eventId);
                                } else {
                                  newSet.add(eventId);
                                }
                                return newSet;
                              });
                            }}
                            style={{
                              width: '18px',
                              height: '18px',
                              marginRight: '0.75rem',
                              cursor: finalDisabled ? 'not-allowed' : 'pointer',
                              accentColor: '#fbbf24'
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                              {eventName}
                            </div>
                            {category && !isHeader && (
                              <div
                                style={{
                                  color: 'rgba(255, 255, 255, 0.7)',
                                  fontSize: '0.8rem',
                                  marginTop: '0.1rem'
                                }}
                              >
                                {category}
                              </div>
                            )}
                            {disabled && (
                              <div
                                style={{
                                  color: 'rgba(248, 250, 252, 0.8)',
                                  fontSize: '0.75rem',
                                  marginTop: '0.1rem'
                                }}
                              >
                                Already registered
                              </div>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Culturals Events Card */}
              {registrationEvents.Culturals && registrationEvents.Culturals.length > 0 && (
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    border: '1px solid rgba(148, 163, 184, 0.6)'
                  }}
                >
                  <h3
                    style={{
                      color: '#fef3c7',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      marginBottom: '0.75rem'
                    }}
                  >
                    Culturals Events
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '260px', overflowY: 'auto' }}>
                    {registrationEvents.Culturals.map((event: any, index: number) => {
                      // Skip null entries and header row
                      if (!event || event['Prize money for Performing arts, Visual arts, Fashion'] === 'Event') return null;

                      const eventId = `cultural-${index}`;
                      const eventName = event['Prize money for Performing arts, Visual arts, Fashion'];
                      const category = event['5'] || '';

                      // Skip if no event name
                      if (!eventName) return null;

                      const isHeader = category && category.trim() !== '' && !event.Column1;

                      // Gender-based filtering for culturals (most are mixed, but apply if gender-specific)
                      const userGender = userProfileData.gender?.toLowerCase();
                      if (userGender && (category || eventName)) {
                        const textToCheck = (category + ' ' + eventName).toLowerCase();
                        if (userGender === 'male' && textToCheck.includes('ms.')) {
                          return null; // Skip Ms. Mahotsav for male users
                        }
                        if (userGender === 'female' && textToCheck.includes('mr.') && !textToCheck.includes('mrs')) {
                          return null; // Skip Mr. Mahotsav for female users
                        }
                      }

                      if (isHeader) {
                        return (
                          <div
                            key={eventId}
                            style={{
                              color: '#fbbf24',
                              fontWeight: 'bold',
                              fontSize: '1.05rem',
                              marginTop: '0.75rem',
                              paddingLeft: '0.25rem'
                            }}
                          >
                            {category}
                          </div>
                        );
                      }

                      const disabled = isEventAlreadySaved(eventName);
                      const constraintDisabled = !disabled && (window as any).__hasParaSelected;
                      const finalDisabled = disabled || constraintDisabled;
                      const isChecked = disabled || selectedRegistrationEvents.has(eventId);

                      return (
                        <label
                          key={eventId}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: finalDisabled
                              ? 'rgba(75, 85, 99, 0.5)'
                              : 'rgba(255, 255, 255, 0.08)',
                            padding: '0.6rem 0.85rem',
                            borderRadius: '0.5rem',
                            cursor: finalDisabled ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            opacity: constraintDisabled ? 0.5 : 1
                          }}
                          onMouseOver={(e) => {
                            if (!finalDisabled) {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                            }
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = finalDisabled
                              ? 'rgba(75, 85, 99, 0.5)'
                              : 'rgba(255, 255, 255, 0.08)';
                          }}
                          onClick={(e) => {
                            if (constraintDisabled && !disabled) {
                              e.preventDefault();
                              alert('You have selected Para Sports events. Please deselect them before selecting regular Sports or Cultural events.');
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={finalDisabled}
                            onChange={() => {
                              if (finalDisabled) return;
                              
                              setSelectedRegistrationEvents((prev) => {
                                const newSet = new Set(prev);
                                if (newSet.has(eventId)) {
                                  newSet.delete(eventId);
                                } else {
                                  newSet.add(eventId);
                                }
                                return newSet;
                              });
                            }}
                            style={{
                              width: '18px',
                              height: '18px',
                              marginRight: '0.75rem',
                              cursor: finalDisabled ? 'not-allowed' : 'pointer',
                              accentColor: '#fbbf24'
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                              {eventName}
                            </div>
                            {category && !isHeader && (
                              <div
                                style={{
                                  color: 'rgba(255, 255, 255, 0.7)',
                                  fontSize: '0.8rem',
                                  marginTop: '0.1rem'
                                }}
                              >
                                {category}
                              </div>
                            )}
                            {disabled && (
                              <div
                                style={{
                                  color: 'rgba(248, 250, 252, 0.8)',
                                  fontSize: '0.75rem',
                                  marginTop: '0.1rem'
                                }}
                              >
                                Already registered
                              </div>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Para Sports Events Card */}
              {getFilteredParaSportsEvents().length > 0 && (
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    border: '1px solid rgba(148, 163, 184, 0.6)'
                  }}
                >
                  <h3
                    style={{
                      color: '#fef3c7',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      marginBottom: '0.75rem'
                    }}
                  >
                    Para Sports
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '260px', overflowY: 'auto' }}>
                    {getFilteredParaSportsEvents().map((event, index) => {
                      const eventId = `para-${index}`;
                      const eventName = event.eventName;
                      const category = event.category || '';

                      const disabled = isEventAlreadySaved(eventName);
                      const hasNormalSelected = (window as any).__hasNormalSelected;
                      const constraintDisabled = !disabled && hasNormalSelected;
                      const finalDisabled = disabled || constraintDisabled;
                      const isChecked = disabled || selectedRegistrationEvents.has(eventId);

                      return (
                        <label
                          key={eventId}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: finalDisabled
                              ? 'rgba(75, 85, 99, 0.5)'
                              : 'rgba(255, 255, 255, 0.08)',
                            padding: '0.6rem 0.85rem',
                            borderRadius: '0.5rem',
                            cursor: finalDisabled ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            opacity: constraintDisabled ? 0.5 : 1
                          }}
                          onMouseOver={(e) => {
                            if (!finalDisabled) {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                            }
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = finalDisabled
                              ? 'rgba(75, 85, 99, 0.5)'
                              : 'rgba(255, 255, 255, 0.08)';
                          }}
                          onClick={(e) => {
                            if (constraintDisabled && !disabled) {
                              e.preventDefault();
                              alert('You have selected regular Sports or Cultural events. Please deselect them before selecting Para Sports events.');
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={finalDisabled}
                            onChange={() => {
                              if (finalDisabled) return;
                              
                              setSelectedRegistrationEvents((prev) => {
                                const newSet = new Set(prev);
                                if (newSet.has(eventId)) {
                                  newSet.delete(eventId);
                                } else {
                                  newSet.add(eventId);
                                }
                                return newSet;
                              });
                            }}
                            style={{
                              width: '18px',
                              height: '18px',
                              marginRight: '0.75rem',
                              cursor: finalDisabled ? 'not-allowed' : 'pointer',
                              accentColor: '#fbbf24'
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                              {eventName}
                            </div>
                            {category && (
                              <div
                                style={{
                                  color: 'rgba(255, 255, 255, 0.7)',
                                  fontSize: '0.8rem',
                                  marginTop: '0.1rem'
                                }}
                              >
                                {category}
                              </div>
                            )}
                            {disabled && (
                              <div
                                style={{
                                  color: 'rgba(248, 250, 252, 0.8)',
                                  fontSize: '0.75rem',
                                  marginTop: '0.1rem'
                                }}
                              >
                                Already registered
                              </div>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Submit Button */}
            <div style={{ 
              borderTop: '2px solid rgba(255, 255, 255, 0.3)', 
              paddingTop: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {/* Summary Section */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem'
              }}>
                <div>
                  <div style={{ color: 'white', fontSize: '1rem', fontWeight: '600' }}>
                    Selected: {selectedRegistrationEvents.size} event(s)
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {(() => {
                      // Calculate event types
                      const selectedIds = Array.from(selectedRegistrationEvents);
                      const hasSports = selectedIds.some(id => id.startsWith('sport-'));
                      const hasCulturals = selectedIds.some(id => id.startsWith('cultural-'));
                      
                      return `${hasSports ? 'Sports' : ''}${hasSports && hasCulturals ? ' + ' : ''}${hasCulturals ? 'Culturals' : ''}`;
                    })()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#fbbf24', fontSize: '0.875rem', fontWeight: '600' }}>
                    Registration Fee
                  </div>
                  <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {(() => {
                      const selectedIds = Array.from(selectedRegistrationEvents);
                      const hasSports = selectedIds.some(id => id.startsWith('sport-'));
                      const hasCulturals = selectedIds.some(id => id.startsWith('cultural-'));
                      const userGender = userProfileData.gender?.toLowerCase();
                      const userCollege = userProfileData.college || '';
                      
                      // Check if user is from one of the special Vignan colleges
                      const specialVignanColleges = [
                        'Vignan Pharmacy College',
                        "Vignan's Foundation of Science, Technology & Research",
                        "Vignan's Lara Institute of Technology & Science"
                      ];
                      
                      const isSpecialVignanStudent = specialVignanColleges.some(college => 
                        userCollege.toLowerCase().includes(college.toLowerCase()) ||
                        college.toLowerCase().includes(userCollege.toLowerCase())
                      );
                      
                      let fee = 0;
                      
                      // If from special Vignan colleges, fee is always 150
                      if (isSpecialVignanStudent) {
                        if (hasSports || hasCulturals) {
                          fee = 150;
                        }
                      } else {
                        // Regular fee calculation
                        if (userGender === 'male') {
                          if (hasSports || hasCulturals) {
                            fee = 350; // Same fee regardless of selection
                          }
                        } else if (userGender === 'female') {
                          if (hasSports && hasCulturals) {
                            fee = 350; // Both
                          } else if (hasSports) {
                            fee = 350; // Sports only
                          } else if (hasCulturals) {
                            fee = 250; // Culturals only
                          }
                        } else {
                          if (hasSports || hasCulturals) {
                            fee = 350;
                          }
                        }
                      }
                      
                      return fee > 0 ? `₹${fee}` : '₹0';
                    })()}
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                onClick={async () => {
                  if (selectedRegistrationEvents.size === 0) {
                    alert('Please select at least one event');
                    return;
                  }
                  
                  if (!isLoggedIn || !userProfileData.userId) {
                    alert('Please login to register for events');
                    return;
                  }
                  
                  // Calculate fee for confirmation message
                  const selectedIds = Array.from(selectedRegistrationEvents);
                  const hasSports = selectedIds.some(id => id.startsWith('sport-'));
                  const hasCulturals = selectedIds.some(id => id.startsWith('cultural-'));
                  const userGender = userProfileData.gender?.toLowerCase();
                  const userCollege = userProfileData.college || '';
                  
                  // Check if user is from one of the special Vignan colleges
                  const specialVignanColleges = [
                    'Vignan Pharmacy College',
                    "Vignan's Foundation of Science, Technology & Research",
                    "Vignan's Lara Institute of Technology & Science"
                  ];
                  
                  const isSpecialVignanStudent = specialVignanColleges.some(college => 
                    userCollege.toLowerCase().includes(college.toLowerCase()) ||
                    college.toLowerCase().includes(userCollege.toLowerCase())
                  );
                  
                  let fee = 0;
                  
                  // If from special Vignan colleges, fee is always 150
                  if (isSpecialVignanStudent) {
                    if (hasSports || hasCulturals) {
                      fee = 150;
                    }
                  } else {
                    // Regular fee calculation
                    if (userGender === 'male') {
                      if (hasSports || hasCulturals) {
                        fee = 350; // Same fee regardless of selection
                      }
                    } else if (userGender === 'female') {
                      if (hasSports && hasCulturals) {
                        fee = 350; // Both
                      } else if (hasSports) {
                        fee = 350; // Sports only
                      } else if (hasCulturals) {
                        fee = 250; // Culturals only
                      }
                    } else {
                      if (hasSports || hasCulturals) {
                        fee = 350;
                      }
                    }
                  }
                  
                  // Prepare events data to save
                  const eventsToSave = selectedIds
                    .map(id => {
                      const [type, index] = id.split('-');
                      const idx = parseInt(index);

                      if (type === 'sport' && registrationEvents.Sports[idx]) {
                        const event = registrationEvents.Sports[idx];
                        return {
                          eventName: event['738500'],
                          eventType: 'sports',
                          category: event['Prize money for Sports'] || '',
                          description: `${event['Prize money for Sports'] || ''} - ${event['738500']}`.trim(),
                          fee: userProfileData.gender === 'male' ? 350 : 350
                        };
                      }

                      if (type === 'cultural' && registrationEvents.Culturals[idx]) {
                        const event = registrationEvents.Culturals[idx];
                        return {
                          eventName: event['Prize money for Performing arts, Visual arts, Fashion'],
                          eventType: 'culturals',
                          category: event['5'] || '',
                          description: `${event['5'] || ''} - ${event['Prize money for Performing arts, Visual arts, Fashion']}`.trim(),
                          fee: userProfileData.gender === 'male' ? 350 : (hasSports ? 350 : 250)
                        };
                      }

                      if (type === 'para') {
                        const paraEvents = getFilteredParaSportsEvents();
                        const event = paraEvents[idx];
                        if (event) {
                          return {
                            eventName: event.eventName,
                            eventType: 'parasports',
                            category: event.category || '',
                            description: event.description || event.eventName,
                            fee: 0
                          };
                        }
                      }

                      return null;
                    })
                    .filter(e => e !== null);
                  
                  try {
                    // Save to database via API
                    const response = await fetch(`${API_BASE_URL}/save-events`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        userId: userProfileData.userId,
                        events: eventsToSave
                      })
                    });

                    const result = await response.json();

                    if (!response.ok || !result.success) {
                      throw new Error(result.message || 'Failed to save events');
                    }

                    // Also save to localStorage as backup
                    const storageKey = `myEvents_${userProfileData.userId}`;
                    localStorage.setItem(storageKey, JSON.stringify(eventsToSave));
                    
                    // Update local state with the registered events
                    setMyEvents(eventsToSave as any);
                    
                    // Refresh myEvents from database to ensure sync
                    await fetchUserSavedEvents(userProfileData.userId);
                    
                    const eventTypes = `${hasSports ? 'Sports' : ''}${hasSports && hasCulturals ? ' + ' : ''}${hasCulturals ? 'Culturals' : ''}`;
                    alert(`Successfully registered for ${selectedRegistrationEvents.size} event(s)!\n\nEvent Type: ${eventTypes}\nTotal Registration Fee: ₹${fee}\n\nThank you!`);
                    setShowRegistrationModal(false);
                    setSelectedRegistrationEvents(new Set());
                  } catch (error) {
                    console.error('Error saving events:', error);
                    alert('An error occurred while saving events to database. Please try again.');
                  }
                }}
                disabled={selectedRegistrationEvents.size === 0}
                style={{
                  padding: '0.875rem 2rem',
                  background: selectedRegistrationEvents.size === 0 ? 'rgba(156, 163, 175, 0.5)' : 'linear-gradient(to right, #fbbf24, #f59e0b)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: selectedRegistrationEvents.size === 0 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  textTransform: 'uppercase'
                }}
                onMouseOver={(e) => {
                  if (selectedRegistrationEvents.size > 0) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(251, 191, 36, 0.5)';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Submit Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

