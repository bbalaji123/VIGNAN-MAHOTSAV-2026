import React, { useState, type JSX } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BackButton from './components/BackButton';
import FlowerComponent from './components/FlowerComponent';
import { API_BASE_URL } from './services/api';
import { showToast } from './utils/toast';

interface EventDetailData {
  title: string;
  subtitle: string;
  rules: string[];
  prizes: {
    first: string;
    second: string;
    third?: string;
    fourth?: string;
  } | {
    men: {
      first: string;
      second: string;
      third?: string;
      fourth?: string;
    };
    women: {
      first: string;
      second: string;
      third?: string;
      fourth?: string;
    };
  };
  contacts: {
    name: string;
    phone: string;
  }[];
}

const EventDetail: React.FC = () => {
  const { eventName } = useParams<{ eventName: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [showAthleticsSelection, setShowAthleticsSelection] = useState(false);
  const [selectedAthleticsEvents, setSelectedAthleticsEvents] = useState<string[]>([]);

  // Get the section we came from for smart back navigation
  const fromSection = location.state?.fromSection || '';

  // Smart back navigation handler
  const handleBack = () => {
    if (fromSection) {
      // Navigate to /events with the specific section to open
      navigate('/events', { state: { openSection: fromSection } });
    } else {
      // Default behavior - go back in history
      navigate(-1);
    }
  };

  // Handle Add to My Events
  const handleAddToMyEvents = async () => {
    // Check if user is logged in using the same method as Dashboard
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');

    if (!isLoggedIn || !userId) {
      showToast.warning('Please login to continue');
      return;
    }

    if (!eventName) {
      showToast.error('Invalid event');
      return;
    }

    const normalizedName = eventName.toLowerCase().trim();
    if (normalizedName.includes('athletics') || normalizedName.includes('track')) {
      setShowAthleticsSelection(true);
      return;
    }

    // Call the actual registration logic for non-athletics events
    await processEventRegistration(eventName);
  };

  const processEventRegistration = async (nameToRegister: string, isAthleticsSubEvent: boolean = false) => {
    const userId = localStorage.getItem('userId');
    const userGender = localStorage.getItem('gender')?.toLowerCase();

    // Define women-only events
    const womenOnlyEvents = [
      'throwball', 'throw ball', 'tennikoit'
    ];

    // Define men-only events (if any)
    const menOnlyEvents: string[] = ['hockey', '3k', '3 k'];

    // Define para sports events
    const paraEvents = [
      'para athletics', 'para cricket'
    ];

    // Check gender restrictions
    const normalizedEventName = nameToRegister.toLowerCase().trim();

    if (womenOnlyEvents.some(e => normalizedEventName.includes(e))) {
      if (userGender !== 'female') {
        showToast.error('This is a Women-only event. You are not allowed to register.');
        return;
      }
    }

    if (menOnlyEvents.some(e => normalizedEventName.includes(e))) {
      if (userGender !== 'male') {
        showToast.error('This is a Men-only event. You are not allowed to register.');
        return;
      }
    }

    try {
      setIsAddingEvent(true);

      // First, fetch existing registered events
      const existingEventsResponse = await fetch(`${API_BASE_URL}/my-registrations/${userId}`);
      const existingEventsResult = await existingEventsResponse.json();

      // Normalize existing events from API response to always be an array
      let existingEvents: any[] = [];
      if (existingEventsResult?.success && existingEventsResult.data) {
        const data = existingEventsResult.data;

        if (Array.isArray(data)) {
          existingEvents = data;
        } else if (Array.isArray(data.registeredEvents)) {
          // Backward compatibility with older API shape
          existingEvents = data.registeredEvents;
        } else if (Array.isArray(data.events)) {
          // Current API shape
          existingEvents = data.events;
        }
      }

      // Check if event is already registered (normalize for comparison)
      const normalizeEventName = (name: string) => name?.toLowerCase().trim();
      const currentEventNormalized = normalizeEventName(nameToRegister || '');

      const alreadyRegistered = existingEvents.some(
        (e: any) => {
          const registeredEventName = e.eventName || e.Event || e.name || '';
          return normalizeEventName(registeredEventName) === currentEventNormalized;
        }
      );

      if (alreadyRegistered) {
        // If it's a sub-event, we just skip it silently or alert once
        if (!isAthleticsSubEvent) showToast.info('You have already registered for this event!');
        return;
      }

      // Check para sports vs normal sports mutual exclusion
      const isCurrentEventPara = paraEvents.some(e => normalizedEventName.includes(e));
      const hasParaEvents = existingEvents.some((e: any) => {
        const eName = (e.eventName || e.Event || e.name || '').toLowerCase();
        return paraEvents.some(pe => eName.includes(pe));
      });
      const hasNormalEvents = existingEvents.some((e: any) => {
        const eName = (e.eventName || e.Event || e.name || '').toLowerCase();
        return !paraEvents.some(pe => eName.includes(pe));
      });

      if (isCurrentEventPara && hasNormalEvents) {
        showToast.warning('You have already registered for normal events. You cannot register for Para Sports events.');
        return;
      }

      if (!isCurrentEventPara && hasParaEvents) {
        showToast.warning('You have already registered for Para Sports events. You cannot register for normal events.');
        return;
      }

      // Determine event type based on the page we came from or event name
      let eventType = 'sports';
      const fromSection = location.state?.fromSection || '';
      if (fromSection.toLowerCase().includes('cultural') || nameToRegister.toLowerCase().includes('dance') || nameToRegister.toLowerCase().includes('music')) {
        eventType = 'culturals';
      } else if (fromSection.toLowerCase().includes('para') || nameToRegister.toLowerCase().includes('para')) {
        eventType = 'parasports';
      }

      // Clean up category to remove gender-specific prefixes and fix naming
      let cleanCategory = fromSection || '';
      cleanCategory = cleanCategory
        .replace(/Women's\s+/gi, '')
        .replace(/Men's\s+/gi, '')
        .replace(/Team Events\s+Indoor Sports/gi, 'Indoor Sports')
        .replace(/Team\s+Events/gi, 'Team Sports')
        .replace(/Athletics/gi, 'Athletics')
        .trim();

      // Create event object
      // Note: Fee is set to 0 here because the actual fee is calculated at registration level
      // based on the combination of events selected (culturals only, sports only, or both)
      const newEvent = {
        eventName: nameToRegister,
        eventType: eventType,
        category: cleanCategory,
        description: `${nameToRegister}`,
        fee: eventType === 'parasports' ? 0 : 0 // Fee calculated at registration level
      };

      // Combine existing events with new event
      const allEvents = [...existingEvents, newEvent];

      // Save to database via API
      const response = await fetch(`${API_BASE_URL}/save-events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          events: allEvents
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to add event');
      }

      if (!isAthleticsSubEvent) showToast.success('You are registered to this event, please check in profile');
    } catch (error) {
      console.error('Error adding event:', error);
      if (!isAthleticsSubEvent) showToast.error('Failed to add event. Please try again.');
    } finally {
      setIsAddingEvent(false);
    }
  };

  const handleAthleticsSelectionConfirm = async () => {
    if (selectedAthleticsEvents.length === 0) {
      showToast.warning('Please select at least one athletics event');
      return;
    }

    setShowAthleticsSelection(false);
    setIsAddingEvent(true);

    try {
      // Register each selected sub-event
      for (const subEvent of selectedAthleticsEvents) {
        await processEventRegistration(`Athletics - ${subEvent}`, true);
      }
      showToast.success('Successfully registered for selected Athletics events!');
    } catch (error) {
      console.error('Error in athletics multi-registration:', error);
      showToast.warning('Some events could not be registered. Please check your profile.');
    } finally {
      setIsAddingEvent(false);
      setSelectedAthleticsEvents([]);
    }
  };

  const athleticsEvents = [
    { id: '100m', name: '100 M' },
    { id: '400m', name: '400 M' },
    { id: '800m', name: '800 M' },
    { id: '4x100m', name: '4 X 100 M Relay' },
    { id: '4x400m', name: '4 X 400 M Relay' },
    { id: 'shotput', name: 'Shot Put' },
    { id: 'longjump', name: 'Long Jump' },
    { id: '3k', name: '3 K (Men Only)', menOnly: true }
  ];

  // Event data
  const eventDetailsData: { [key: string]: EventDetailData } = {
    "Athletics": {
      title: "Athletics",
      subtitle: "TRACK & FIELD (Men & Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "All participants must come with a proper sports attire.",
        "All rules are applicable for all Track & Field events under Men & Women categories i.e., 100 M, 400 M, 800 M, 4 X 100 M relay, 4 x 400 M relay, short put, long Jump and 3 K for men only.",
        "Everyone should report at least 30 mins before scheduled time.",

        "If the player wishes to raise any issue or concern,  he / she must approach the protest team with in 15 min.",
        "Protest Fee: ₹2000",
        "Prize Money - Men: 1st Rs.3,000 | 2nd Rs.2,000 | 3rd Rs.1,000",
        "Prize Money - Women: 1st Rs.3,000 | 2nd Rs.2,000 | 3rd Rs.1,000"
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. Md.Karishma", phone: "+91 73868 57843" },
        { name: "Mr. G.Srinivas", phone: "+91 93928 34630" },
        { name: "Ms. Himasri", phone: "+91 85208 22204" },
        { name: "Mr. Hema Naga Venkata Krishna", phone: "+91 74160 65745" },
        { name: "Mr. S.Rathna Prabhooth ", phone: "+91 63030 13174" },
        { name: "Mr. M. Venkata swamy", phone: "+91 83176 56282" },
        { name: "Mr. N.Jessieevans", phone: "+91 78158 87117" },
        { name: "Ms, R.Siva Chandini", phone: "+91 99592 62017" }

      ]
    },
    "Men's Athletics": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "TRACK & FIELD (Men & Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "All participants must come with a proper sports attire.",
        "All rules are applicable for all Track & Field events under Men & Women categories i.e., 100 M, 400 M, 800 M, 4 X 100 M relay, 4 x 400 M relay, short put, long Jump and 3 K for men only.",
        "Everyone should report at least 30 mins before scheduled time.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. Md.Karishma", phone: "+91 73868 57843" },
        { name: "Mr. G.Srinu", phone: "+91 93928 34630" },
        { name: "Ms. Hima", phone: "+91 85208 22204" },
        { name: "Mr. Hemanth", phone: "+91 74160 65745" },
        { name: "Mr. S.Rathna Prabhooth ", phone: "+91 63030 13174" },
        { name: "Ms. M. Venkata swamy", phone: "+91 83176 56282" }

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
        { name: "Ms. Md.Karishma", phone: "+91 73868 57843" },
        { name: "Mr. G.Srinu", phone: "+91 93928 34630" },
        { name: "Ms. Hima", phone: "+91 85208 22204" },
        { name: "Mr. Hemanth", phone: "+91 74160 65745" },
        { name: "Mr. S.Rathna Prabhooth ", phone: "+91 63030 13174" },
        { name: "Ms. M. Venkata swamy", phone: "+91 83176 56282" }
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
        "**Tie breaks is as following:**",
        "A.) Buchholz. B.) Buchholz but 1. C.) Sonneburn burger. D.) Direct encounter. E.)  Great number of victories.",
        "If a player wishes to raise any issue or concern, he/she must approach the Protest Team within 15 minutes.",
        "Protest Fee: ₹2000"
      ],
      prizes: {
        first: "Rs. 6,000",
        second: "Rs. 4,000"
      },
      contacts: [
        { name: "Ms. K. Gayathri", phone: "+91 93929 60026" },
        { name: "Mr. M. Siva Subrahmanyam", phone: "+91 93479 10733" },
        { name: "Ms. K. Gayathri", phone: "+91 93929 60026 " },
        { name: "Mr. D. Harshith", phone: "+91 80191 71205" },
        { name: "Ms. D. Sowmya", phone: "+91 70136 39789" },
        { name: "Mr. SK. Moulali", phone: "+91 77806 93439" }
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
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team within 15 minutes.",
        "Protest Fee: ₹2000."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000"
      },
      contacts: [
        { name: "Ms. K. Gayathri", phone: "+91 93929 60026" },
        { name: "Mr. M. Siva Subrahmanyam", phone: "+91 93479 10733" },
        { name: "Ms. K. Gayathri", phone: "+91 93929 60026 " },
        { name: "Mr. D. Harshith", phone: "+91 80191 71205" },
        { name: "Ms. D. Sowmya", phone: "+91 70136 39789" },
        { name: "Mr. SK. Moulali", phone: "+91 77806 93439" }
      ]
    },
    "Tennikoit": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "TENNICOIT – Singles (Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "All participants must come with a proper sports attire.",
        "Participants should report at least 30 mins before scheduled time.",
        "The match is played as the best of 3 sets, 21+21+15 points.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team within 15 minutes.",
        "Protest Fee: ₹2000"
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500"
      },
      contacts: [
        { name: "Ms. K. Gayathri", phone: "+91 93929 60026" },
        { name: "Mr. M. Siva Subrahmanyam", phone: "+91 93479 10733" },
        { name: "Ms. K. Gayathri", phone: "+91 93929 60026 " },
        { name: "Mr. D. Harshith", phone: "+91 80191 71205" },
        { name: "Ms. D. Sowmya", phone: "+91 70136 39789" },
        { name: "Mr. SK. Moulali", phone: "+91 77806 93439" }
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
        "**Rules & Regulations for the Yogasana events:**",
        "**A.	Traditional Yogasana (singles) Event**",
        "Total Marks: 70",
        "Competition Format: One final round only.",
        "Holding Time:",
        "Compulsory Asanas: 30 seconds.",
        "Optional Asanas: 15 seconds.",
        "**B.	Artistic Yogasana (singles) Event**",
        "Total Marks: 150",
        "Number of Asanas: 10",
        "Performance Time: 150–180 seconds",
        "Holding Time per Asana: Minimum 5 seconds",
        "Requirement: Athletes must cover at least 3 major categories in their routine",
        "Link to refer syllabus: https://drive.google.com/drive/folders/1144knECxU7K72jfrR5YgboztbNP7y96D?usp=sharing",
        "If the player wishes to raise an issue or concern either before or during the event, he / she must approach the protest team.",
        "Protest Fee: ₹2000"
      ],
      prizes: {
        first: "Rs. 2,000 (Traditional) / Rs. 2,000 (Artistic)",
        second: "Rs. 1,500 (Traditional) / Rs. 1,500 (Artistic)"
      },
      contacts: [
        { name: "Ms. K. Gayathri", phone: "+91 93929 60026" },
        { name: "Mr. M. Siva Subrahmanyam", phone: "+91 93479 10733" },
        { name: "Ms. K. Gayathri", phone: "+91 93929 60026 " },
        { name: "Mr. D. Harshith", phone: "+91 80191 71205" },
        { name: "Ms. D. Sowmya", phone: "+91 70136 39789" },
        { name: "Mr. SK. Moulali", phone: "+91 77806 93439" }
      ]
    },
    "Yoga & Individual": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "YOGASANA (Men & Women) - Traditional & Artistic",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Everyone should report at least 30 mins before scheduled match time.",
        "All participants must come with a proper sports attire.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Syllabus, Rules & Regulations for the Yogasana events: Traditional Yogasana (singles) Event - Syllabus of Seniors A for Men & Women as per new code of points of Yogasana Bharat",
        "Artistic Yogasana (singles) Event - Artistic Yogasana Single Event syllabus as per new code of points of Yogasana Bharat",
        "Link to refer syllabus: https://www.yogasanabharat.com/code",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 2,000 (Traditional) / Rs. 2,000 (Artistic)",
        second: "Rs. 1,500 (Traditional) / Rs. 1,500 (Artistic)"
      },
      contacts: [
        { name: "Mr. H. Harshith", phone: "+91 80191 71205" },
        { name: "Mr. S. Siva Subrahmanyam", phone: "+91 93479 10733" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Ms. G. Gayathri", phone: "+91 93929 60026" },
        { name: "Ms. S. Sowmya", phone: "+91 70136 39789" }

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
        "Syllabus, Rules & Regulations for the Yogasana events: Traditional Yogasana (singles) Event - Syllabus of Seniors A for Men & Women as per new code of points of Yogasana Bharat",
        "Artistic Yogasana (singles) Event - Artistic Yogasana Single Event syllabus as per new code of points of Yogasana Bharat",
        "Link to refer syllabus: https://www.yogasanabharat.com/code",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 2,000 (Traditional) / Rs. 2,000 (Artistic)",
        second: "Rs. 1,500 (Traditional) / Rs. 1,500 (Artistic)"
      },
      contacts: [
        { name: "Mr. H. Harshith", phone: "+91 80191 71205" },
        { name: "Mr. S. Siva Subrahmanyam", phone: "+91 93479 10733" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Ms. G. Gayathri", phone: "+91 93929 60026" },
        { name: "Ms. S. Sowmya", phone: "+91 70136 39789" }

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
        "All participants must come with a proper sports attire (DUBAK).",
        "Participants must wear chin guards, forearm guards, and groin guards, which must arrange by your own.",
        "Chest guards and helmets will be provided.",
        "Jury Decision is final, if a player wishes to raise any issue or concern, he/she must approach the Protest Team within 15 minutes.",
        "Protest Fee: ₹2000"
      ],
      prizes: {
        first: "Rs. 1,500",
        second: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. K. Gayathri", phone: "+91 93929 60026" },
        { name: "Mr. M. Siva Subrahmanyam", phone: "+91 93479 10733" },
        { name: "Ms. K. Gayathri", phone: "+91 93929 60026 " },
        { name: "Mr. D. Harshith", phone: "+91 80191 71205" },
        { name: "Ms. D. Sowmya", phone: "+91 70136 39789" },
        { name: "Mr. SK. Moulali", phone: "+91 77806 93439" }
      ]
    },
    "Para Sports": {
      title: "para Atheletics",
      subtitle: "PARA SPORTS (MEN)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "In Para sports only two events: 100Mts, 400Mts (Men only) under Hand amputee, Leg amputee and visual impairment categories.",
        "Players must report at least before 30 minutes at respective grounds.",
        "All participants must come with a proper sports attire.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500"
      },
      contacts: [
        { name: "Mr. G.Srinivas", phone: "+91 93928 34630" },
        { name: "Mr. Hema Naga Venkata Krishna", phone: "+91 74160 65745" },
        { name: "Mr. M. Venkata swamy", phone: "+91 83176 56282" }
      ]
    },
    "Para Cricket": {
      title: "para Cricket",
      subtitle: "PARA CRICKET (MEN)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Everyone should report at least 30 mins before scheduled match time.",
        "Each team should consist of 15 members.",
        "Out of these, 11 members will play in the match.",
        "The game will be played with a red ball.",
        "Teams must bring their own kit bags.",
        "Players should wear proper white attire.",
        "All other rules will follow the standard BCCI guidelines.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 5,000",
        second: "Rs. 4,000"
      },
      contacts: [
        { name: "Mr. U. Om Shri", phone: "+91 93477 75310" },
        { name: "Mr. G. Siva Rama Krishna", phone: "+91 63099 59419" }
      ]
    },
    "Volley ball (Men)": {
      title: "Team Events",
      subtitle: "VOLLEY BALL (M&W)",
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
        "If the player whishes to raise an issue or concern either before or during the event, he / she must approach the protest team within 15 minutes.",
        "Protest Fee: ₹2000"
      ],
      prizes: {
        men: {
          first: "Rs. 30,000",
          second: "Rs. 20,000",
          third: "Rs. 7,000",
          fourth: "Rs. 3,000"
        },
        women: {
          first: "Rs. 15,000",
          second: "Rs. 10,000"
        }
      },
      contacts: [
        { name: "Mr. N. Venkata Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" },
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. S. prabooth", phone: "+91 63030 13174" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Mr. B.AbhiRam", phone: "+91 83098 27464" },
        { name: "Ms. R.Tejaswini", phone: "+91 93980 38691" }
      ]
    },
    "Volley ball (Women)": {
      title: "Team Events",
      subtitle: "VOLLEY BALL (Women)",
      rules: [
        "Team strength is 7+5 players.",
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
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
      ]
    },
    "Basket ball (Men)": {
      title: "Team Events",
      subtitle: "BASKET BALL (M&W)",
      rules: [
        "Team strength is 5+5 players.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team within 15 minutes",
        "Protest Fee: ₹2000"
      ],
      prizes: {
        men: {
          first: "Rs. 30,000",
          second: "Rs. 20,000",
          third: "Rs. 7,000",
          fourth: "Rs. 3,000"
        },
        women: {
          first: "Rs. 15,000",
          second: "Rs. 10,000"
        }
      },
      contacts: [
        { name: "Mr. N. Venkata Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" },
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. S. prabooth", phone: "+91 63030 13174" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Mr. B.AbhiRam", phone: "+91 83098 27464" },
        { name: "Ms. R.Tejaswini", phone: "+91 93980 38691" }
      ]
    },
    "Basket ball (Women)": {
      title: "Team Fields",
      subtitle: "BASKET BALL (Women)",
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
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
      ]
    },
    "Kabaddi (Men)": {
      title: "Team Events",
      subtitle: "KABADDI (M&W)",
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
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team within 15 minutes.",
        "Protest Fee: ₹2000"
      ],
      prizes: {
        men: {
          first: "Rs. 30,000",
          second: "Rs. 20,000",
          third: "Rs. 7,000",
          fourth: "Rs. 3,000"
        },
        women: {
          first: "Rs. 15,000",
          second: "Rs. 10,000"
        }
      },
      contacts: [
        { name: "Mr. N. Venkata Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" },
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. S. prabooth", phone: "+91 63030 13174" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Mr. B.AbhiRam", phone: "+91 83098 27464" },
        { name: "Ms. R.Tejaswini", phone: "+91 93980 38691" }
      ]
    },
    "Kabaddi (Women)": {
      title: "Team Events",
      subtitle: "KABADDI (Women)",
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
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Mr. N. Venkata Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" },
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. S. prabooth", phone: "+91 63030 13174" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Mr. B.AbhiRam", phone: "+91 83098 27464" },
        { name: "Ms. R.Tejaswini", phone: "+91 93980 38691" }
      ]
    },
    "Kho-Kho (Men)": {
      title: "Team Events",
      subtitle: "KHO-KHO (M&W)",
      rules: [
        "Team strength is 9+3 players.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team within 15 minutes.",
        "Protest Fee: ₹2000",
        "No player is allowed to participate in multiple teams. If found, the team will be disqualified."
      ],
      prizes: {
        men: {
          first: "Rs. 30,000",
          second: "Rs. 20,000"
        },
        women: {
          first: "Rs. 15,000",
          second: "Rs. 10,000"
        }
      },
      contacts: [
        { name: "Mr. N. Venkata Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" },
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. S. prabooth", phone: "+91 63030 13174" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Mr. B.AbhiRam", phone: "+91 83098 27464" },
        { name: "Ms. R.Tejaswini", phone: "+91 93980 38691" }
      ]
    },
    "Kho-Kho (Women)": {
      title: "Team Events",
      subtitle: "KHO-KHO (Women)",
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
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
      ]
    },
    "Hockey (Men)": {
      title: "Team Events",
      subtitle: "HOCKEY (Men)",
      rules: [
        "Team strength is 7+3 players.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team within 15 minutes.",
        "Protest Fee: ₹2000."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Mr. N. Venkata Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" },
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. S. prabooth", phone: "+91 63030 13174" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Mr. B.AbhiRam", phone: "+91 83098 27464" },
        { name: "Ms. R.Tejaswini", phone: "+91 93980 38691" }
      ]
    },
    "Hockey (Women)": {
      title: "Team Fields",
      subtitle: "HOCKEY (Women)",
      rules: [
        "Team strength is 7+3 players.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player whishes to raise an issue or concern either before or during the event, he / she must approach the protest team within 15 minutes.",
        "Protest Fee: ₹2000."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
      ]
    },
    "Football (Men)": {
      title: "Team Events",
      subtitle: "FOOTBALL (Men)",
      rules: [
        "Team strength is 7+3 players.",
        "The time of each half will be informed before the commencement of tournament.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time if any team failed  to report within the scheduled time, the team will be disqualified without any intimation and  the opponent will be considered as winners.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team within 15 minutes.",
        "Protest Fee: ₹2000."
      ],
      prizes: {
        first: "Rs. 30,000",
        second: "Rs. 20,000",
        third: "Rs. 7,000",
        fourth: "Rs. 3,000"
      },
      contacts: [
        { name: "Mr. N. Venkata Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" },
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. S. prabooth", phone: "+91 63030 13174" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Mr. B.AbhiRam", phone: "+91 83098 27464" },
        { name: "Ms. R.Tejaswini", phone: "+91 93980 38691" }
      ]
    },
    "Football (Women)": {
      title: "Team Fields",
      subtitle: "FOOTBALL (Women)",
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
        "If the player whishes to raise an issue or concern either before or during the event, he / she must approach the protest team within 15 minutes.",
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
      ]
    },
    "Throw ball": {
      title: "Team Events",
      subtitle: "THROWBALL (Women)",
      rules: [
        "Team limit is 9+3 players.",
        "The match is played as the best of 3 sets, 25+25+15 points.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team within 15 minutes.",
        "Protest Fee: ₹2000."

      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Mr. N. Venkata Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" },
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. S. prabooth", phone: "+91 63030 13174" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Mr. B.AbhiRam", phone: "+91 83098 27464" },
        { name: "Ms. R.Tejaswini", phone: "+91 93980 38691" }
      ]
    },
    "Classical Dance Solo": {
      title: "DANCE",
      subtitle: "Classical Dance Solo",
      rules: [
        "The classical dance performed can be from any of the approved schools of dance, such as Kathak, Kathakali, Bharat Natyam, Manipuri, Kuchipudi, Mohiniyattam, or Odissi.",
        "Participants will be allowed up to 10 minutes, which includes preparation time. Maximum three accompanists are permissible. Audio tracks are also permitted.",
        "The selected song(s) must not appear in movies or shows. However, if an original song is present in a movie, the original composition should be used.",
        "Elements like fire, water or harmful substances must not be used.",
        "Judgment will be based on the qualities like Tal, Technique, Rhythm, Abhinaya or Expression, Costumes, Footwork and general impression."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        { name: "Ms. Ch. Aparna", phone: "+91 85238 13227" },
        { name: "Mr. B. Ram Chandu", phone: "+91 83412 40966" },
        { name: "Ms. Asritha", phone: "+91 73868 89772" },
        { name: "Ms. Vineesha", phone: "+91 99516 95475" }
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
        "4th round: 5 minutes (any composition of Ilayaraja / A R Rahman /  K  V Mahadevan/ Anirudh Ravichandran / MM Keeravani / Mani Sharma. Karaoke is must)",
        "Evaluation – Average scores of 2nd and 3rd round will be taken to get promoted to 4th round. For finals 40% of scores in the average of 2 & 3 rounds and 60% of scores for the performance in the 4th round will be added to declare the IDOL"
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        { name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544" },
        { name: "Mr. M.Winstone", phone: "+91 83280 09698" },
        { name: "Ms. Varshitha", phone: "+91 87123 47513" }
      ]
    },
    "Dancing Star - Western Solo": {
      title: "DANCE",
      subtitle: "Dancing Star - Western Dance Solo",
      rules: [
        "There will be an elimination round. Max time in this round will be 2 minutes.",
        "The final round can be performed as an extension of the preliminaries or as a new composition. The maximum duration for the final performance shall not exceed 4 minutes.",
        "Film song of any language can be chosen for performance, any songs that may lead to controversies are not allowed.",
        "Any audio or track that are offensive, criticising or hurt others feelings must be avoided. This includes for ex. AI generated spoofs.",
        "Elements like fire, water or harmful substances must not be used.",
        "Audio Track must be submitted in only pendrive to the coordinators before the commencement of event.",
        "Judgement will be based on choreography, selection of songs, expression and overall performance."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        { name: "Ms. Ch. Aparna", phone: "+91 85238 13227" },
        { name: "Mr. B. Ram Chandu", phone: "+91 83412 40966" },
        { name: "Ms. Asritha", phone: "+91 73868 89772" },
        { name: "Ms. Vineesha", phone: "+91 99516 95475" }
      ]
    },
    "Group Singing": {
      title: "MUSIC",
      subtitle: "Group Singing",
      rules: [
        "Group can consist of a minimum of 3 singers and a maximum of 6 singers, and the performance can be accompanied by either a band with instruments (Maximum Number of accompanies are 3) or a karaoke.",
        "A participant must be limited to a single team; however, the accompanists can perform with multiple teams.",
        "Folk song / Film song of any language can be chosen for performance, any songs of (professionally rival Telugu actor families) that may be lead to controversies are not allowed.",
        "Maximum time allowed for the group song is 5 minutes which does not include setting time. The setting time for a group shall not exceed 3 minutes.",
        "Judgement will be strictly on the basis of quality of singing only. Things like make-up, costumes and actions of the team are not considered for judgement."
      ],
      prizes: {
        first: "Rs. 5,000",
        second: "Rs. 3,500",
        third: "Rs. 2,000"
      },
      contacts: [
        { name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544" },
        { name: "Mr. M.Winstone", phone: "+91 83280 09698" },
        { name: "Ms. Varshitha", phone: "+91 87123 47513" }
      ]
    },
    "Singing Jodi": {
      title: "MUSIC",
      subtitle: "Singing Jodi",
      rules: [
        "This is a Jodi singing competition (Each performance must feature exactly two singers).",
        "Time for Stage/ Instruments setting is maximum 4 minutes.",
        "The number of accompanists would not be more than two. Karaoke is permitted in case of accompanist’s absence. ",
        "Duration of the performance shall be 4 minutes. ",
        "Film song of any language can be chosen for performance, any songs of (professionally rival Telugu actor families) that may lead to controversies are not allowed.",
        "Judgment will be made on the qualities like, composition rhythm, coordination and general impression."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544" },
        { name: "Mr. M.Winstone", phone: "+91 83280 09698" },
        { name: "Ms. Varshitha", phone: "+91 87123 47513" }
      ]
    },
    "Classical Light Vocal Solo": {
      title: "MUSIC",
      subtitle: "Classical/Light Vocal Solo",
      rules: [
        "The maximum duration of the performance shall not be more than 6 minutes.",
        "Maximum number of accompanists is two. Shruthi box should be used (Accompanists should also get registered).",
        "Item can be presented in either Hindustani or Carnatic style.",
        "Movie songs are not allowed under this item.",
        "Only non-film songs/ geet/ ghazal/ bhajan/ shabad and abhangas can be presented for Light vocal.",
        "Sufficient thought and care must be exercised in the choice of Raga and composition",
        "Judgement will be based on the qualities like Taal, Selection of Raga, Composition and general impression."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544" },
        { name: "Mr. M.Winstone", phone: "+91 83280 09698" },
        { name: "Ms. Varshitha", phone: "+91 87123 47513" }
      ]
    },
    "Western Vocal Solo": {
      title: "MUSIC",
      subtitle: "Western Vocal Solo",
      rules: [
        "Time for Stage/ Instruments setting is maximum 2 minutes.",
        "The number of accompanists would not be more than two. Karaoke is permitted in case of accompanist’s absence.",
        "Duration of the performance shall be 4 minutes.",
        "Language of the song can be any Foreign language.",
        "Judgment will be made on the qualities like vocal performance, pitch, vocal expression, and overall musicality."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544" },
        { name: "Mr. M.Winstone", phone: "+91 83280 09698" },
        { name: "Ms. Varshitha", phone: "+91 87123 47513" }
      ]
    },
    "Anthyakshari Duo": {
      title: "MUSIC",
      subtitle: "Anthyakshari Duo",
      rules: [
        "The event will be having 3 - 4 rounds.",
        "First round will be written test on the questions about movie songs and personalities.",
        "The details of remaining rounds will be announced on spot"
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544" },
        { name: "Mr. M.Winstone", phone: "+91 83280 09698" },
        { name: "Ms. Varshitha", phone: "+91 87123 47513" }
      ]
    },
    "Instrumental Solo": {
      title: "MUSIC",
      subtitle: "Instrumental Solo",
      rules: [
        "•	The Instrumental Solo Performance category is open to all types of instruments, whether Western or Classical, Percussion or Non-Percussion.",
        "No pre-processed or programmed sounds/loops are allowed in the performance.",
        "Item can be presented in any style or genre.",
        "Participants must bring their own instruments.",
        "Duration of performance shall be between 4 to 5 min.",
        "Time for stage/ Instruments setting is maximum 3 minutes.",
        "Maximum number of accompanists is two. (if required)",
        "Judges may ask for specific changes in the performance and request a subsequent performance if deemed necessary.",
        "Judging will be based on the following criteria:",
        "Mastery of the instrument and proficiency.",
        "Complexity and difficulty of the piece/Music performed.",
        "Musicality, expression, and dynamics.",
        "Composition and overall impression.",
        "Adaptability to on-the-spot changes as directed by judges."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544" },
        { name: "Mr. M.Winstone", phone: "+91 83280 09698" },
        { name: "Ms. Varshitha", phone: "+91 87123 47513" }
      ]
    },
    "Skit": {
      title: "DRAMATICS",
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
        first: "Rs. 8,000",
        second: "Rs. 5,000",
        third: "Rs. 4,000"
      },
      contacts: [
        { name: "Mr. K.Pavankishore", phone: "+91 99633 17059" },
        { name: "Mr. P.Samba Siva Rao", phone: "+91 63011 24757" }
      ]
    },
    "Mime": {
      title: "DRAMATICS",
      subtitle: "Mime",
      rules: [
        "Minimum 3 and Maximum of 6 participants are allowed to participate in a team",
        "Judgment will most likely be based on the qualities like idea, creativity of presentation, use of make-up, general impression.",
        "Duration of performance shall be for maximum of 5 minutes.",
        "Background music with no vocals is allowed."
      ],
      prizes: {
        first: "Rs. 6,000",
        second: "Rs. 4,000",
        third: "Rs. 2,000"
      },
      contacts: [
        { name: "Mr. K.Pavankishore", phone: "+91 99633 17059" },
        { name: "Mr. P.Samba Siva Rao", phone: "+91 63011 24757" }
      ]
    },
    "Dancing Jodi - Western Duo": {
      title: "DANCE",
      subtitle: "Dancing Star - Western Dance Duo",
      rules: [
        "This is a dual dance competition and choice of genre is left to the team.",
        "The maximum duration of the performance should not exceed 4 minutes.",
        "The duo can either be a BB/BG/GG.",
        "The audio track is to be submitted in pen drive to the coordinator before the event starts.",
        "Film song of any language can be chosen for performance, any songs of (professionally rival Telugu actor families) that may lead to controversies are not allowed.",
        "Use of fire (including diyas , candles or lighters) and water is not allowed.",
        "Judgement will be based on choreography, song selection, synchronization and overall performance.",
        "Any audio or track that are offensive, criticising or hurt others feelings must be avoided. For ex. AI generated spoofs."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        { name: "Ms. Ch.Aparna", phone: "+91 85238 13227" },
        { name: "Mr. B.Ram Chandu", phone: "+91 83412 40966" },
        { name: "Ms. Asritha", phone: "+91 73868 89772" },
        { name: "Ms. Vineesha", phone: "+91 99516 95475" }
      ]
    },
    "Spot Dance - Jodi": {
      title: "DANCE",
      subtitle: "Spot Dance - Jodi",
      rules: [
        "This is a dual spot dance competition and must feature exactly two dancers.",
        "The duo can be a Boy/Boy (BB), Boy/Girl (BG), or Girl/Girl (GG) pairing.",
        "Participants must dance to the music played on the spot by the coordinators.",
        "The maximum duration of the performance will be determined by the coordinators.",
        "Participants should report at least 30 minutes before the scheduled time.",
        "The song will be unknown to the participants until it is played during the event.",
        "Judgment will be based on spontaneity, rhythm, coordination, and overall performance."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,500"
      },
      contacts: [
        { name: "Ms. Ch.Aparna", phone: "+91 85238 13227" },
        { name: "Mr. B.Ram Chandu", phone: "+91 83412 40966" },
        { name: "Ms. Asritha", phone: "+91 73868 89772" },
        { name: "Ms. Vineesha", phone: "+91 99516 95475" }
      ]
    },
    "Group Dance": {
      title: "DANCE",
      subtitle: "Group Dance Competition",
      rules: [
        "Participants are free to choose any genre, such as Bollywood, hip-hop, contemporary, salsa, classical, semi-classical, mass, and folk, etc.",
        "There should be a minimum of 4 members on the stage at any point of time and a maximum of 12 members per team.",
        "The maximum duration of performance is 6 minutes. An elimination round will be held if necessary.",
        "In case of using movie songs or movie references in the audio tracks, any sort of controversial elements is to be avoided.",
        "The use of fire (including diyas, candles, or lighters) and water is not allowed.",
        "Any audio or track that is offensive, criticizing, or hurts others' feelings must be avoided. For example, AI-generated spoofs are not permitted.",
        "Judgment will be based on the following: choreography, creativity in presentation, track selection, formations, costume, synchronization, and overall performance."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 12,000",
        third: "Rs. 8,000"
      },
      contacts: [
        { name: "Ms. Ch.Aparna", phone: "+91 85238 13227" },
        { name: "Mr. B.Ram Chandu", phone: "+91 83412 40966" },
        { name: "Ms. Asritha", phone: "+91 73868 89772" },
        { name: "Ms. Vineesha", phone: "+91 99516 95475" }
      ]
    },
    "Mono Action": {
      title: "DRAMATICS",
      subtitle: "Mono Action",
      rules: [
        "Each participant artist will be given 4 minutes.",
        "The participant is required to perform an act of any theme. ",
        "Obscenity and offensive gestures are strictly prohibited. ",
        "Judgement will be based on acting, dialogue delivery, stage presence and overall impression."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. K.Pavankishore", phone: "+91 99633 17059" },
        { name: "Mr. P.Samba Siva Rao", phone: "+91 63011 24757" }
      ]
    },
    "Spot Ad Making": {
      title: "DRAMATICS",
      subtitle: "On the Spot Ad Making",
      rules: [
        "A maximum of 4 participants are allowed to participate in a team.",
        "The items or item names will be given 1 minute before the presentation.",
        "The maximum time allotted for preparation for each team is 5 minutes.",
        "The maximum time allowed to showcase their talent is 2 – 3 minutes.",
        "Judgment will most likely be based on the qualities like idea, creativity of presentation, general impression. ",
        "Vulgarity or bitter insinuations in presentation should be avoided. Only innocent satire or humour is expected."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. K.Pavankishore", phone: "+91 99633 17059" },
        { name: "Mr. P.Samba Siva Rao", phone: "+91 63011 24757" }
      ]
    },
    "Dialogue Dhamaka": {
      title: "DRAMATICS",
      subtitle: "Dialogue Dhamaka",
      rules: [
        "It is an individual competition.",
        "Participants have the flexibility to deliver a dialogue from any movie or they can write their own script for a dialogue in any language.",
        "Each student is allowed to perform for a minimum of 1 minute and a maximum of 4 minutes.",
        "Your performance will be evaluated based on key criteria i.e., voice, fluency, facial expressions, gestures, dialogue delivery, stage presence and overall impression."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. K.Pavankishore", phone: "+91 99633 17059" },
        { name: "Mr. P.Samba Siva Rao", phone: "+91 63011 24757" }
      ]
    },
    "Master Orator": {
      title: "LITERATURE",
      subtitle: "Mahotsav 2026 Master Orator in collaboration with the TOASTMASTERS CLUB",
      rules: [
        "Speaking Time: Each participant will be given 3 minutes for delivering content.",
        "First Round Topic: The topic for the first round will be provided one day before the competition and will be sent to the participants' respective emails.",
        "Second Round (Extempore): The second round will be Extempore. The topic will be given on the spot and participants will have 25 seconds as buffer time for preparation.",
        "judgment will be based on the following: Content delivery, fluency, and relevance to the topic given.",
        "The winner will be awarded the title of \"Master Orator\"."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        { name: "Mr. Nihal Kumar", phone: "+91 79797 52014" },
        { name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055" },
        { name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146" },
        { name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228" }
      ]
    },
    "On Spot Creative Content Writing": {
      title: "LITERATURE",
      subtitle: "Spot Creative Writing",
      rules: [
        "Creative writing is defined as any writing of the participant's own composition.",
        "Participants are required to write an essay on a particular topic that will be given on the spot.",
        "The written submissions are to be submitted within the specified duration.",
        "The word limit for the competition is 800 words.",
        "Judgement is based on creativity and originality, relevance to the given topic, clarity and coherence of ideas, effective language use, and correctness of grammar"
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. Nihal Kumar", phone: "+91 79797 52014" },
        { name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055" },
        { name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146" },
        { name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228" }
      ]
    },
    "Telugu Vyaasa Rachana": {
      title: "LITERATURE",
      subtitle: "Telugu Vyaasa Rachana",
      rules: [
        "Telugu Vyaasa Rachana is defined as any writing of the participant's own composition.",
        "Participants are required to write an essay in Telugu on a particular topic that will be given on the spot.",
        "The written submissions are to be submitted within the specified duration.",
        "The word limit for the competition is 500-600 words.",
        "Judgement is based on relevance to the topic, clarity of expression, creativity, and correct use of language."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. Nihal Kumar", phone: "+91 79797 52014" },
        { name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055" },
        { name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146" },
        { name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228" }
      ]
    },
    "Shayari - Hindi": {
      title: "LITERATURE",
      subtitle: "Shayari - Hindi",
      rules: [
        "Participants should present their own composed Shayari on one of the following themes: “PATRIOTISM / LOVE / FORGIVING”.",
        "Participants are supposed to re-write the Shayari composed by them on the selected topic on the spot without seeing and a hard copy of the Shayari shall be submitted to the judges.",
        "The Shayari must be performed on the stage.",
        "The minimum number of lines should be 6 to 8.",
        "Each participant should submit only one entry.",
        "The judgment criteria would be based on the Impact, Creativity, Relevance to the theme."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. Nihal Kumar", phone: "+91 79797 52014" },
        { name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055" },
        { name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146" },
        { name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228" }
      ]
    },
    "JAM": {
      title: "LITERARY",
      subtitle: "IMPROMPTU",
      rules: [
        "1. This competition is designed for those who enjoy speaking impromptu.",
        "2. After the topic is given, 25 seconds will be provided as buffer time.",
        "3. Following the buffer time, the participant must talk for a maximum of one minute regarding the given topic.",
        "",
        "4. Game play and Scoring:",
        "The game proceeds in rounds with contestants attempting to interrupt the speaker by correctly identifying errors.",
        "",
        "TABLE_START",
        "Action|Points Awarded",
        "Successful Jam (Justified Interruption)|+5 Points to the interrupter (who then takes over as speaker).",
        "Unsuccessful Jam (Unjustified Interruption)|-2 Points to the interrupter.",
        "Speaking Successfully (Until Jammed or Time-Out)|+1 Point for every 10 seconds of error-free speech (to be tracked by the timekeeper).",
        "TABLE_END",
        " ",
        "• One of the contestants will begin speaking on the given topic.",
        "• Any other contestant can \"jam\" (interrupt) the speaker by stating the reason for the interruption.",
        "• If the reason for jamming is justified, the interrupting person will gain points and the chance to speak.",
        "• If the reason for jamming is turned down, the interrupting person will receive negative points, and the previous speaker can continue speaking.",
        "• The contestant with the maximum points at the end of the given time will be declared the winner.",

        "5. Judicial Clarification: Valid Jamming Reasons",
        "For the purpose of consistency, justified interruptions (successful jams) may be called for the following reasons, among others:",
        "• Hesitation/Stammering (a prolonged pause or repetition).",
        "• Repetition (of a word or phrase, excluding articles/prepositions).",
        "• Grammatical Error (a clear error in syntax or grammar).",
        "• Deviation from the Topic (a complete shift away from the theme).",
        "• Failure to use a specific word/phrase (if mandated by the topic card)."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. Nihal Kumar", phone: "+91 79797 52014" },
        { name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055" },
        { name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146" },
        { name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228" }
      ]
    },
    "Dumb Charades": {
      title: "LITERATURE",
      subtitle: "Dumb Charades",
      rules: [
        "Enacting the word without your voice does need patience. Here you find the test of your own least bothered patience.",
        "The team of two will be permitted for the competition.",
        "The team will be provided with the sort of words that might be either the movie names or some sort of word.",
        "One among the team has to enact the word and the other has to say the word."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. Nihal Kumar", phone: "+91 79797 52014" },
        { name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055" },
        { name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146" },
        { name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228" }
      ]
    },
    "Quiz": {
      title: "LITERATURE",
      subtitle: "Quiz Wiz",
      rules: [
        "The knowledge to know is never ending. Learning to exhibit maybe one’s passion and the platform to be chosen is what is called Quiz. Here the participants will be made into teams where each team consists of three people and they will be tested in the areas of history, mythology, literature, social sciences, general world affairs etc.; A maximum of three rounds will be conducted which include fill the abbreviations, knowledge dropping and speeding test to decide the winner among the participants.",
        "The team of three will be permitted for the competition.",
        "The teams are not based on the college name or any sort of group messing the atmosphere of the contest.",
        "The people are being provided with the stationary. Thus no loose paper, pen or any sort of material is entertained.",
        "Use of electronic gadgets like cell phones, laptops or any material will violate the rules of the contest.",
        "Arguments over issues with either the contestant or the coordinator will lead to elimination from the contest."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,500"
      },
      contacts: [
        { name: "Mr. Nihal Kumar", phone: "+91 79797 52014" },
        { name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055" },
        { name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146" },
        { name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228" }
      ]
    },

    "Word Master": {
      title: "LITERATURE",
      subtitle: "Word Master",
      rules: [
        "This multi-stage event tests participants' comprehensive command of vocabulary, spelling, and analytical word skills.",
        "I. Event Structure and Flow",
        "The competition is a series of elimination rounds, consisting of four distinct events:",
        "**Round 1: Words Worth — Vocabulary / Word Knowledge**",
        "**Round 2: Spell Bee — Spelling Accuracy**",
        "**Round 3: Solving Crosswords — Word Definition / Grid Solving**",
        "**Round 4 (Finals): Solving Anagrams — Analytical Word Rearrangement**",
        "II. General Rules and Timing",
        "Format: This is an individual competition.",
        "Timing: The specific time limits for Solving Anagrams and Solving Crosswords will be announced on the spot by the coordinator.",
        "Progression: Contestants will be filtered based on performance in each preceding round to advance to the next stage.",
        "Device Usage: The use of any electronic device, mobile phone, or external reference material is strictly prohibited and will result in immediate disqualification.",
        "Scoring criteria: Scoring will be based on accuracy and time taken to complete the task."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. Nihal Kumar", phone: "+91 79797 52014" },
        { name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055" },
        { name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146" },
        { name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228" }
      ]
    },

    "Story telling": {
      title: "LITERATURE",
      subtitle: "Story Telling",
      rules: [
        "This competition provides a platform to explore the ancient art of storytelling and captivate the audience through powerful oratory skills.",
        "Performance Details:",
        "Time Limit: The maximum duration for the performance is 6 minutes. A warning bell will sound at 5 minutes, and the final bell will sound at 6 minutes, at which point the participant must conclude their story.",
        "Language: The performance may be delivered in English or Telugu.",
        "Theme/Genre: The participant is free to choose any theme or genre (e.g., Folk Tale, Personal Narrative, Historical, Fiction, etc.).",
        "Aids and Props: The use of simple, hand-held props is permitted, but elaborate sets or background music/audio tracks are not allowed.",
        "Content and Originality:",
        "Source Material: The story presented may be original (composed by the participant) or adapted from an existing published work. If adapted, the source must be verbally acknowledged at the start or end of the performance.",
        "Content Restriction: The story must be suitable for a general audience. Vulgarity, offensive insinuations, or content that promotes hate speech or discrimination is strictly prohibited.",
        "Judging Criteria:",
        "The performance will be evaluated on the qualities like Narrative Arc and Content, Vocal Modulation, Expression and Gestures, Audience Engagement and adherence to Time Limit."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. Nihal Kumar", phone: "+91 79797 52014" },
        { name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055" },
        { name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146" },
        { name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228" }
      ]
    },

    "Theme Painting": {
      title: "VISUAL ARTS",
      subtitle: "ON SPOT THEME PAINTING",
      rules: [
        "The theme for the painting will be given to the participants on the spot.",
        "The maximum time for the participant in completing the painting shall not exceed 2 hours and 30 minutes.",
        "Painting should be done on the A3 size drawing paper provided by the organisers.",
        "Participants are permitted to use any medium, including pencil colors, oil colors, watercolors, poster colors, or pastel colors.",
        "Candidates are responsible for bringing their own materials, such as brushes, paints, palettes, etc. Only the A3 drawing paper will be provided by the organizers.",
        "Participants may be required to provide a verbal description or explanation of their painting to the judges, if deemed necessary by the judging panel.",
        "The use of any mobile phones, internet, or other electronic devices is strictly prohibited during the competition."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        { name: "Ms. K.Unnathi", phone: "+91 79815 97629" },
        { name: "Mr. Ch.Dhanush", phone: "+91 63014 20067" },
        { name: "Ms. P.Lavanya ", phone: "+91 93819 88110" }
      ]
    },

    "Clay Modelling": {
      title: "VISUAL ARTS & CRAFT",
      subtitle: "CLAY MODELLING",
      rules: [
        "The specific theme for the clay model will be given to the participants on the spot.",
        "The maximum time allocated for the competition shall not exceed 2 hours and 30 minutes.",
        "The necessary clay material will be provided to all participants by the organizers.",
        "Specific details regarding the required size, additional topic clarification, and any other specific rules will be announced on the spot at the start of the competition.",
        "Participants must bring their own modelling tools (e.g., sculpting tools, wires, knives).",
        "Judgement will be based on Creativity & Interpretation of the theme, technique & finish, three dimensionality & form.",
        "The use of any mobile phones, internet, or external reference images/materials is strictly prohibited."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. K.Unnathi", phone: "+91 79815 97629" },
        { name: "Mr. Ch.Dhanush", phone: "+91 63014 20067" },
        { name: "Ms. P.Lavanya ", phone: "+91 93819 88110" }
      ]
    },

    "Rangoli": {
      title: "VISUAL ARTS & CRAFT",
      subtitle: "RANGOLI",
      rules: [
        "A team may consist of a maximum of two (2) members.",
        "The maximum time allocated for the competition shall not exceed 2 hours and 30 minutes.",
        "Participants are responsible for bringing all their own materials.",
        "Only one medium is permitted for the design. The allowed mediums are: Colours, Flower Petals or Saw – dust or Pulses or Rice.",
        "The medium and form of expression can be free-hand, pictorial, or descriptive.",
        "Participants must prepare their Rangoli design within the space provided by the organizers.",
        "The use of any mobile phones or internet for reference or assistance is strictly prohibited during the competition.",
        "Judgement will be based on overall impact and visual appeal, creativity and interpretation of theme (if a theme is announced), clarity, symmetry and detailing, aesthetic use of chosen medium."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. K.Unnathi", phone: "+91 79815 97629" },
        { name: "Mr. Ch.Dhanush", phone: "+91 63014 20067" },
        { name: "Ms. P.Lavanya ", phone: "+91 93819 88110" }
      ]
    },

    "Mehandi": {
      title: "FINE ARTS",
      subtitle: "MEHANDI",
      rules: [
        "Judging Criteria: Participants will be judged based on originality, creativity, intricacy of design, and overall aesthetic appeal.",
        "Materials Allowed: Only standard Mehandi (Henna) may be used. The use of stencils, hand prints, molds, or any external decorative materials (such as beads, glitter, or stickers) is strictly prohibited.",
        "Supplies: Participants must bring their own Mehandi cones and any other necessary materials.",
        "Time Limit: The maximum duration allowed for the competition is 2 hours and 30 minutes.",
        "Design Requirements: The design must be applied to both hands of the model. It must cover the palm and extend at least 6 inches up the forearm (palmar side).",
        "The use of mobile phones or the internet for reference is prohibited during the competition."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. K.Unnathi", phone: "+91 79815 97629" },
        { name: "Mr. Ch.Dhanush", phone: "+91 63014 20067" },
        { name: "Ms. P.Lavanya ", phone: "+91 93819 88110" }
      ]
    },

    "Collage": {
      title: "FINE ARTS",
      subtitle: "COLLAGE",
      rules: [
        "The specific theme will be announced at the start of the competition. All artwork must be created on the A3 size sheet provided.",
        "The total time allotted for the competition is 2 hours and 30 minutes.",
        "Participants must bring their own scissors, glue/adhesive, and any other necessary tools.",
        "The collage must be constructed exclusively from old magazines provided by the participant.",
        "The use of mobile phones or the internet for design ideas or references is strictly prohibited."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. K.Unnathi", phone: "+91 79815 97629" },
        { name: "Mr. Ch.Dhanush", phone: "+91 63014 20067" },
        { name: "Ms. P.Lavanya ", phone: "+91 93819 88110" }
      ]
    },

    "Face Painting": {
      title: "FINE ARTS",
      subtitle: "FACE PAINITING",
      rules: [
        "Participants are free to choose their own theme; designs must be executed directly on the model's face.",
        "The maximum time allowed for the competition is 2 hours and 30 minutes.",
        "Entries will be evaluated based on originality, creativity, technical skill, and aesthetic appeal.",
        "The use of mobile phones or the internet for references or inspiration is strictly prohibited during the event."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. K.Unnathi", phone: "+91 79815 97629" },
        { name: "Mr. Ch.Dhanush", phone: "+91 63014 20067" },
        { name: "Ms. P.Lavanya ", phone: "+91 93819 88110" }
      ]
    },

    "Pencil Sketching": {
      title: "FINE ARTS",
      subtitle: "PENCIL SKETCHING",
      rules: [
        "The specific topic will be announced on-the-spot at the commencement of the event.",
        "Participants must bring their own drawing and painting supplies (pencils, erasers, brushes, paints, etc.). Only the A3 drawing sheet will be provided by the organizers.",
        "All entries must be completed on the provided A3 size paper.",
        "The total time allotted for the competition is 2 hours and 30 minutes.",
        "The use of mobile phones or any digital devices for reference or inspiration is strictly prohibited.",
        "Evaluation will be based on creativity, technical skill, and how effectively the theme is interpreted."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. K.Unnathi", phone: "+91 79815 97629" },
        { name: "Mr. Ch.Dhanush", phone: "+91 63014 20067" },
        { name: "Ms. P.Lavanya ", phone: "+91 93819 88110" }
      ]
    },

    "Mandala Art": {
      title: "FINE ARTS",
      subtitle: "MANDALA ART",
      rules: [
        "Mandala Art Theme: The Equilibrium of Elements",
        "In alignment with our fest theme, Eternal Harmony, the topic is The Equilibrium of Elements. We invite you to depict the perfect balance between the opposing forces of nature. Your mandala should reflect how fire, water, earth, and air—though different—coexist in a state of eternal peace and symmetry. Let your patterns show that harmony is not the absence of difference, but the perfect arrangement of it.",
        "Participants must strictly follow the announced theme.",
        "An A3 size drawing sheet will be provided to all participants by the organizers.",
        "All artwork must be entirely original. The use of mobile phones, the internet, or printed reference sheets is strictly prohibited.",
        "The maximum time allowed for the competition is 2 hours and 30 minutes.",
        "Entries will be evaluated based on creativity, technical precision (symmetry and detail), theme interpretation, and overall visual appeal."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. K.Unnathi", phone: "+91 79815 97629" },
        { name: "Mr. Ch.Dhanush", phone: "+91 63014 20067" },
        { name: "Ms. P.Lavanya ", phone: "+91 93819 88110" }
      ]
    },

    "Haute Couture": {
      title: "FASHION COMPETITIONS",
      subtitle: "HAUTE COUTURE (Fashion Themed Ramp Walk)",
      rules: [
        "Each team is responsible for their own costumes and must present a cohesive theme.",
        "Teams will be evaluated based on the following:",
        "• Thematic Relevance: How well the theme is portrayed.",
        "• Formation: Choreography and stage presence.",
        "• Costume Design: Creativity and craftsmanship of the outfits.",
        "• The Walk: Confidence, poise, and gait on the ramp.",
        "Any form of obscenity in attire or vulgarity in performance is strictly prohibited. Failure to comply will lead to immediate disqualification.",
        "There is no limit on the number of teams that can participate from a single institute. However, an individual is allowed to be part of a single team only.",
        "Each team is allotted a time slot of 8 to 10 minutes for their final performance.",
        "Each team must consist of a minimum of 8 members and a maximum of 12 members."
      ],
      prizes: {
        first: "Rs. 20,000",
        second: "Rs. 15,000",
        third: "Rs. 12,000"
      },
      contacts: [
        { name: "Mr. S.Satya Reddy", phone: "+91 93900 41156" },
        { name: "Ms. Sara", phone: "+91 79815 69853" },
        { name: "Mr. Manohar ", phone: "+91 81253 97739" },
        { name: "Ms. Md.Nadira ", phone: "+91 93921 91983" },
      ]
    },
    "Craftvilla": {
      title: "FASHION COMPETITIONS",
      subtitle: "CRAFTVILLA (Accessories designing)",
      rules: [
        "**Permissible Categories:**",
        "Participants may choose to design items from any of the following categories:",
        "• Jewelry & Adornments: Beaded, Fabric, Threaded, Tribal, or Wood jewelry.",
        "• Artistic Paper Craft: Paper Quilling and Greeting Card design.",
        "• Material Design: Antique-style accessories and Leather crafts.",
        "• Sustainability: \"Wealth from Waste\" (Upcycled accessories).",

        "Team Composition: A team may consist of a maximum of two members. Individual participation is also permitted.",
        "Materials & Supplies: Participants are responsible for bringing all necessary tools and raw materials required for their specific craft. No materials will be provided on-site.",
        "Originality: All designs must be created during the competition hours."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. S.Satya Reddy", phone: "+91 93900 41156" },
        { name: "Ms. Sara", phone: "+91 79815 69853" },
        { name: "Mr. Manohar ", phone: "+91 81253 97739" },
        { name: "Ms. Md.Nadira ", phone: "+91 93921 91983" },
      ]
    },
    "Texart": {
      title: "FASHION COMPETITIONS",
      subtitle: "TEXART (Fashion sketching)",
      rules: [
        "Theme: The specific design brief or theme will be announced on-the-spot at the start of the event.",
        "Participation: This is an individual (solo) competition.",
        "Materials: Participants must bring their own sketching and coloring tools (pencils, markers, fineliners, etc.).",
        "Stationery: Official drawing sheets will be provided to all participants by the organizers.",
        "Time Management: All designs must be completed and submitted within the stipulated time limit. No extra time will be granted for finishing touches."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. S.Satya Reddy", phone: "+91 93900 41156" },
        { name: "Ms. Sara", phone: "+91 79815 69853" },
        { name: "Mr. Manohar ", phone: "+91 81253 97739" },
        { name: "Ms. Md.Nadira ", phone: "+91 93921 91983" },
      ]
    },
    "T-Shirt Designing": {
      title: "FASHION COMPETITIONS",
      subtitle: "T-SHIRT DESIGNING",
      rules: [
        "Apparel: Participants may bring a white T-Shirt of their own or a White T-shirts will be provided on-site for an additional material fee of ₹150 per T-shirt.",
        "Team Size: Participation is open to individuals or teams of up to 2 members.",
        "Materials: Participants are expected to bring their own colors or dyes, rubber bands, gloves, and any other specialized tools needed.",
        "Originality: Designs must be original and created during the allotted time frame."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. S.Satya Reddy", phone: "+91 93900 41156" },
        { name: "Ms. Sara", phone: "+91 79815 69853" },
        { name: "Mr. Manohar ", phone: "+91 81253 97739" },
        { name: "Ms. Md.Nadira ", phone: "+91 93921 91983" },
      ]
    },
    "Mahotsav Got Talent": {
      title: "SPOT LIGHT",
      subtitle: "MAHOTSAV GOT TALENT",
      rules: [
        "**Overview:**",
        "Do you have a skill that defies the ordinary? Mahotsav Got Talent is a platform for the unconventional, the extraordinary, and the breathtaking. We are looking for performances that break the routine and leave the audience in awe.",
        "Participation & Team Size: This event is open to both solo performers and groups. There is no limit on the number of members per team; however, the performance must be coordinated and cohesive to be limited to a maximum duration of 5 min.",
        "Performance Scope: Participants may showcase any art form or skill, including but not limited to Dance, Music, Acrobatics, Magic, or Mentalism. We are specifically looking for the ‘X-Factor’—performances that are unique, innovative, and go beyond standard routines.",
        "Judging Criteria: Evaluation is based on the Overall Impact of the act. Judges will consider stage presence, technical execution, creativity, and the \"wow factor\" created by the performance."
      ],
      prizes: {
        first: "Rs. 7,000",
        second: "Rs. 5,000",
        third: "Rs. 3,000"
      },
      contacts: [
        { name: "Mr. S.Satya Reddy", phone: "+91 93900 41156" },
        { name: "Ms. Sara", phone: "+91 79815 69853" },
        { name: "Mr. Manohar ", phone: "+91 81253 97739" },
        { name: "Ms. Md.Nadira ", phone: "+91 93921 91983" },
      ]
    },
    "Mr. and Ms. Mahotsav": {
      title: "SPOT LIGHT",
      subtitle: "MR. & MS. MAHOTSAV",
      rules: [
        "**Overview:**",
        "This premier multi-round competition is designed to identify the most versatile individuals on campus. Participants will be evaluated on their personality, intellect, and unique talents to determine who best represents the spirit of the fest.",
        "**The Prize:**",
        "The top performers will be honored with the prestigious titles of Mr. Mahotsav and Ms. Mahotsav, celebrated with an official crowning ceremony.",
        "**The Rounds of Competition:**",
        "Round 1: Personality Assessment (Written) – A preliminary screening where participants respond to a series of situational and personality-based questions designed to evaluate their thought process, ethics, and character.",
        "Round 2: The Talent Showcase – Participants have 2 to 3 minutes to exhibit their unique skills on stage. Whether it is performing arts, a technical demonstration, or a creative display, this round focuses on stage presence and flair.",
        "Round 3: The Jury’s Perspective (Situation Round) – Finalists will be presented with a real-world scenario or a general situational question by the jury. This round tests spontaneous thinking, communication skills, and the ability to articulate a clear perspective under pressure."
      ],
      prizes: {
        first: "Rs. 4,000 (Mr. Mahotsav - Men)",
        second: "Rs. 4,000 (Ms. Mahotsav - Women)"
      },
      contacts: [
        { name: "Mr. S.Satya Reddy", phone: "+91 93900 41156" },
        { name: "Ms. Sara", phone: "+91 79815 69853" },
        { name: "Mr. Manohar ", phone: "+91 81253 97739" },
        { name: "Ms. Md.Nadira ", phone: "+91 93921 91983" },
      ]
    },
    "Short Film Making": {
      title: "DIGITAL STORYTELLING & CREATIVE MEDIA",
      subtitle: "Short Film Making",
      rules: [

        "1. The short film may address any theme of choice, including social issues, fiction, love, drama, or thriller.",
        "2. The submission must be a visually engaging video, such as a vlog, documentary, or short story, that incorporates camera work. PowerPoint presentations and photo story submissions will not be accepted.",
        "3. The short film duration should not exceed 15 minutes, including titles and end credits.",
        "4. There is no language restriction; however, subtitles are mandatory for all short films, irrespective of the language used.",
        "5. Vulgarity or offensive insinuations are prohibited. Only innocent satire or humor is allowed. The short films will be judged based on the concept, script, acting, screenplay, narration, and overall presentation.",
        "6. Representatives of the film cast and crew can be from different colleges, but they should definitely be a bonafide student currently pursuing any UG or PG program.",
        "7. Short films released between March 2025 and January 2026 are eligible for participation.",
        "8. Though there might be many members working in the film, a minimum count of 4 and maximum of 6 will only be permitted to register as representatives.",
        "",
        "**Registration Guidelines:**",
        "**Online Submission:**",
        "1. The director of the short film must submit the entry by sharing the Google Drive link or Youtube link of the short film through this form",
        "2. No changes will be accepted once the link is submitted.",
        "3. Online submission deadline: 30th January 2026",
        "4. Online Screening Date: 31st January 2026 (The screening will be conducted internally within the college. Participants are not permitted to attend this process.)",
        "5. After the screening process, the top-performed short films will be shortlisted and will be informed through phone call/mail within a week.",
        "6. Cast and crew registered under the shortlisted film must attend Vignan Mahotsav 2026 on 7th February 2026 for the final round.",
        "7. One representative from the cast/crew (Director/Lead) must pay the total amount for all team members together and submit the details in this form.",
        "8. Winners will be awarded prizes on 7th February 2026 at 6:00 PM during the valedictory function.",
        "",
        "**On-Spot Submission:**",
        "1. The director of the short film must submit his/her short film through Pen drive only.",
        "2. On-spot submissions will be accepted only on 5th February 2026 for participants who miss the online deadline.",
        "3. Offline Screening Date: 6th February 2026",
        "4. After the screening process, the top performed short films will be shortlisted and will be informed through phone call/mail by same evening.",
        "5. Cast and crew registered under the shortlisted film must attend Vignan Mahotsav 2026 on 7th February 2026 for the final round.",
        "6. Winners will be awarded prizes on 7th February 2026 at 6:00 PM during the valedictory function.",
        "",
        "**Final Round Selection Process:**",
        "1. From both categories — online submissions and on-spot submissions — the top-performed short films will be selected separately, and then combined for the final round on 7th February 2026."
      ],
      prizes: {
        first: "Rs. 20,000",
        second: "Rs. 15,000",
        third: "Rs. 12,000"
      },
      contacts: [
        { name: "Gurram Mohan", phone: "96665 83007" },
        { name: "P.Purnima Sai", phone: "79977 55999" },
        { name: "N.Suchitha Sharon", phone: "74161 49878" },
        { name: "N.Hasini", phone: "82474 60472" },
        { name: "Manu", phone: "83417 19026" }
      ]
    },
    "Online Photography": {
      title: "FINE ARTS",
      subtitle: "ONLINE PHOTOGRAPHY",
      rules: [
        "**Rules:**",
        "• NOTE: Individual participant only.",
        "• MODE: Online submission",
        "• FORMAT: JPEG format only (High resolution preferred).",
        "• THEME: “Nature / Workmanship / Wildlife / Street Photography”",
        "• THEME DESCRIPTION: Participants must choose any ONE theme and capture photographs that clearly represent the essence of the selected theme, highlighting originality, storytelling, composition, and visual impact.",
        "• DEADLINE : 31st January 2026",
        "• ORIGINAL CONTENT ONLY:",
        "o Google images and stock images are strictly not allowed.",
        "o Photographs must be captured by the participant only.",
        "o Any form of plagiarism will lead to immediate disqualification.",
        "• SUBMISSION REQUIREMENTS:",
        "o Submit 2 photographs of the chosen theme.",
        "o RAW photo + EDITED photo must be submitted for each photograph.",
        "o Only minor editing (color correction, exposure, cropping) is allowed.",
        "• RESULT ANNOUNCEMENT: Winners will be intimated through phone call/email."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        { name: "Gurram Mohan", phone: "96665 83007" },
        { name: "P.Purnima Sai", phone: "79977 55999" },
        { name: "N.Suchitha Sharon", phone: "74161 49878" },
        { name: "N.Hasini", phone: "82474 60472" },
        { name: "Manu", phone: "83417 19026" }
      ]
    },

    "Digital Poster Making": {
      title: "DIGITAL STORYTELLING & CREATIVE MEDIA",
      subtitle: "Digital Poster Making",
      rules: [

        "• NOTE : Solo participation only.",
        "• THEME: Imagine you are designing a poster for a nationwide mental health awareness campaign. Use your creativity to communicate support, hope, and understanding. You may choose any angle or message within the theme of mental well-being, emotional support, or community care.",
        "• MODE: Online submission through google form.",
        "• The participant is required to create a poster on the mentioned theme.",
        "• FORMAT: JPEG / PNG / PDF.",
        "• SIZE: A4 (portrait or landscape).",
        "• RESOLUTION: Minimum 300 dpi.",
        "• Originality:",
        "No plagiarism; AI-generated artwork is strictly prohibited.",
        "Only original or royalty-free images and text may be used.",
        "• THEME REPRESENTATION: The poster must clearly and creatively reflect the given theme.",
        "• TITLE REQUIREMENT : Participants are encouraged to create their own unique title for the poster and display it clearly in the design.",
        "• IDENTIFICATION:",
        "Do not include your name or college logo on the poster.",
        "A unique ID will be provided for identification purposes.",
        "• SUBMISSION POLICY: Late submissions will not be accepted.",
        "• SUBMISSION DEADLINE: 31st January 2026.",
        "• DISQUALIFICATION CLAUSE: Any copied, offensive, misleading, or AI-generated content will result in immediate disqualification.",
        "• RESULT ANNOUNCEMENT: Winners will be intimated through phone call/mail."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Gurram Mohan", phone: "96665 83007" },
        { name: "P.Purnima Sai", phone: "79977 55999" },
        { name: "N.Suchitha Sharon", phone: "74161 49878" },
        { name: "N.Hasini", phone: "82474 60472" },
        { name: "Manu", phone: "83417 19026" }
      ]
    },
    "Mahotsav Digital Chronicle": {
      title: "DIGITAL STORYTELLING & CREATIVE MEDIA",
      subtitle: "Mahotsav Digital Chronicle",
      rules: [

        "**1. Team Composition (3 Members)**",
        "1. Content Writer: Responsible for writing articles, highlights, and descriptions.",
        "2. Photographer: Must capture event photos on Day 1 & Day 2 of Mahotsav.",
        "3. Designer: Creates the digital magazine layout using any approved design platform.",
        "",
        "**2. Tasks**",
        "1. Capture real-time moments from Day 1 & Day 2 of Mahotsav.",
        "2. Write engaging content covering performances, stalls, competitions, ambiance, and crowd highlights.",
        "3. Design a structured and visually appealing digital magazine using collected photographs and written content.",
        "",
        "**3. Allowed Platforms**",
        "Canva, Adobe Express, Figma, InDesign, MS Publisher, or any digital design tool.",
        "",
        "**4. Output Format**",
        "1. Final submission must be in PDF format.",
        "2. Magazine must contain a minimum of 6 pages and a maximum of 15 pages.",
        "",
        "**5. Judging Criteria**",
        "1. Creativity and presentation.",
        "2. Quality of photographs.",
        "3. Content clarity and storytelling.",
        "4. Magazine flow and layout.",
        "5. Overall impact.",
        "",
        "**6. Disqualification Criteria**",
        "1. Use of internet photos instead of original photographs.",
        "2. Plagiarised or AI-generated content.",
        "3. Offensive or inaccurate representation of the event."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        { name: "Gurram Mohan", phone: "96665 83007" },
        { name: "P.Purnima Sai", phone: "79977 55999" },
        { name: "N.Suchitha Sharon", phone: "74161 49878" },
        { name: "N.Hasini", phone: "82474 60472" },
        { name: "Manu", phone: "83417 19026" }
      ]
    },
    "Reel Making": {
      title: "DIGITAL STORYTELLING & CREATIVE MEDIA",
      subtitle: "Reel Making",
      rules: [

        "• ELIGIBILITY: Team of maximum 4 members.",
        "• MODE: Online submission",
        "• DURATION: Minimum 50 sec – Maximum 60 sec (strict disqualification beyond 60 sec).",
        "• FORMAT: MP4, 720p+, vertical allowed",
        "• The team leader must submit the entry by sharing the Google Drive Link or Insta Reel Link of the reel through this form",
        "• THEME: “Small Acts, Big Harmony”",
        "• THEME DESCRIPTION: How small actions can create big happiness and harmony in life.",
        "• ORIGINAL CONTENT ONLY: No offensive, explicit, or political visuals.",
        "• Only royalty-free audio, images, and video clips can be used.",
        "• SUBMISSION DEADLINE: 28th January 2026.",
        "• RESULT ANNOUNCEMENT: Winners will be intimated through phone call/email."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        { name: "Gurram Mohan", phone: "96665 83007" },
        { name: "P.Purnima Sai", phone: "79977 55999" },
        { name: "N.Suchitha Sharon", phone: "74161 49878" },
        { name: "N.Hasini", phone: "82474 60472" },
        { name: "Manu", phone: "83417 19026" }
      ]
    },
    "Valorant": {
      title: "GAMING",
      subtitle: "Valorant (PC)",
      rules: [
        "All participating players are required to bring their own laptops for use during the tournament.",
        "Ethernet connection is provided, players are advised to bring laptops that support WLAN connection.",
        "Mahotsav ID cards must be presented by every player",
        "Maximum of 5 players per team.",
        "The competition will utilize a single-elimination knockout structure. Winning teams will advance to the next round.",
        "The usage of cheats, bugs, or any form of unauthorized software is strictly prohibited. Any team found violating this rule will be summarily disqualified from the tournament.",
        "In the event of any technical issue originating from a player’s side—such as laptop failure, system crash, or battery depletion—no rematch or replay will be permitted.",
        "Any form of in-game toxicity—including chat abuse, intentional targeting, or disruptive behavior—will not be tolerated. Offenders may receive warnings or be removed from the tournament."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        { name: "Mr. Harsha vardhan", phone: "+91 87122 77646" },
        { name: "Mr. Charan gopi", phone: "+91 87909 65843" },
        { name: "Mr. N Praneeth Virat", phone: "+91 86887 45247" }
      ]
    },
    "E-Football": {
      title: "GAMING",
      subtitle: "E-Football (PC)",
      rules: [
        "All participating players are required to bring their own laptops for use during the tournament.",
        "Ethernet connection is provided, players are advised to bring laptops that support WLAN connection.",
        "Mahotsav ID cards must be presented by every player.",
        "Maximum of 3 players per team.",
        "The competition will utilize a single-elimination knockout structure. Winning teams will advance to the next round.",
        "The usage of cheats, bugs, or any form of unauthorized software is strictly prohibited. Any team found violating this rule will be summarily disqualified from the tournament.",
        "In the event of any technical issue originating from a player’s side—such as laptop failure, system crash, or battery depletion—no rematch or replay will be permitted.",
        "Any form of in-game toxicity—including chat abuse, intentional targeting, or disruptive behavior—will not be tolerated. Offenders may receive warnings or be removed from the tournament."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,500"
      },
      contacts: [
        { name: "Mr. Harsha vardhan", phone: "+91 87122 77646" },
        { name: "Mr. Charan gopi", phone: "+91 87909 65843" },
        { name: "Mr. N Praneeth Virat", phone: "+91 86887 45247" }
      ]
    },
    "Counter Strike": {
      title: "GAMING",
      subtitle: "Counter Strike (PC)",
      rules: [
        "All participating players are required to bring their own laptops for use during the tournament.",
        "Ethernet connection is provided, players are advised to bring laptops that support WLAN connection.",
        "Mahotsav ID cards must be presented by every player.",
        "Maximum of 5 players per team.",
        "According to the game guidelines players are supposed to play modes to unlock private matchmaking so players are supposed to unlock the private matchmaking before coming to event.",
        "The competition will utilize a single-elimination knockout structure. Winning teams will advance to the next round.",
        "The usage of cheats, bugs, or any form of unauthorized software is strictly prohibited. Any team found violating this rule will be summarily disqualified from the tournament.",
        "In the event of any technical issue originating from a player’s side—such as laptop failure, system crash, or battery depletion—no rematch or replay will be permitted.",
        "Any form of in-game toxicity—including chat abuse, intentional targeting,  or disruptive behavior—will not be tolerated. Offenders may receive warnings or be removed from the tournament."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        { name: "Mr. Harsha vardhan", phone: "+91 87122 77646" },
        { name: "Mr. Charan gopi", phone: "+91 87909 65843" },
        { name: "Mr. N Praneeth Virat", phone: "+91 86887 45247" }
      ]
    },
    "Smash Karts": {
      title: "GAMING",
      subtitle: "Smash Karts (PC)",
      rules: [
        "Pc’s  are provided.",
        "Mahotsav ID cards must be presented by every player.",
        "All matches will be played in Solo mode (individual).",
        "The competition will utilize a single-elimination knockout structure. Winning player will advance to the next round.",
        "The usage of cheats, bugs, or any form of unauthorized software is strictly prohibited. Any team found violating this rule will be summarily disqualified from the tournament.",
        "In the event of any technical issue originating from a player’s side—such as laptop failure, system crash, or battery depletion—no rematch or replay will be permitted.",
        "Any form of in-game toxicity—including chat abuse, intentional targeting, or disruptive behavior—will not be tolerated. Offenders may receive warnings or be removed from the tournament."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. Harsha vardhan", phone: "+91 87122 77646" },
        { name: "Mr. Charan gopi", phone: "+91 87909 65843" },
        { name: "Mr. N Praneeth Virat", phone: "+91 86887 45247" }
      ]
    },
    "Line Follower Robot": {
      title: "ROBO WARS",
      subtitle: "Line Follower Robot",
      rules: [
        "**Objective:** Line Follower Challenge is a line-following and maze-solving competition. A track of white lines on black backgrounds and black lines on white backgrounds will be laid out and an autonomous robot must follow that line. The robot must complete a task. The path will have checkpoints. The team which completes the correct path the fastest will be the winner.",
        "",
        "**Robot Specifications:**",
        "• The robot must fit inside a 300 × 300 mm red-coloured square. No height restrictions. Exceeding dimensions results in immediate disqualification.",
        "• The robot must be fully autonomous. No remote control, no wired/wireless control, cameras, image processing, or external assistance is allowed.",
        "• There is no weight constraint of the robot.",
        "• Pre-made sensor kits may be used, but similar modular assemblies are NOT allowed.",
        "• All sensors, processors, power sources, and controllers must be mounted onboard.",
        "• The robot must not damage the track, arena surface, or checkpoints.",
        "• Modifying the robot after inspection without permission can lead to disqualification.",
        "",
        "**Power Supply and Propulsion:**",
        "• The machine must be entirely self-contained and should not receive any external assistance. It must not utilize an energy source that involves a combustion process.",
        "• The machine must have its own on-board power source. The use of external power supplies is not permitted.",
        "• The potential difference between any two points on the machine must not surpass 12V.",
        "",
        "**Track & Arena Details:**",
        "• The arena consists of a continuous line track with curves, turns, and possible intersections.",
        "• Checkpoints will be placed at predefined locations along the track during the actual competition runs.",
        "• The exact track layout may be disclosed partially or fully before the event, but minor changes or surprise elements may be introduced.",
        "• Arena dimensions (all in mm): Maximum arena size: 4000 × 4500 mm, Track width: 30 mm, Start zone: 200 × 200 mm",
        "• Track colour may vary due to fading; do not assume perfect black/white contrast.",
        "• Track may include discontinuities.",
        "• Arena tolerances may vary up to 5% or 20 mm.",
        "• Lighting conditions (sunlight/incandescent/fluorescent) will not be controlled.",
        "",
        "**Trial Run (Practice Round):**",
        "• Each team will be given one free trial run (span of 2 minutes) before the official competition begins.",
        "• This trial run is meant for: Testing the robot, Calibrating sensors, Adjusting and finalizing the code.",
        "• No checkpoints will be present during the trial run.",
        "• Trial run time is not included in scoring.",
        "• No hardware modifications are allowed after trial run without referee approval.",
        "",
        "**Checkpoint Rules:**",
        "• Checkpoints will be active only during the competition runs.",
        "• If the robot reaches a checkpoint and becomes unbalanced or unable to proceed correctly, the team is allowed to lift the robot and place it at the previous checkpoint. Each team will be given three official chances (runs) during the competition to fix the robot.",
        "• The robot must resume the run from the previous checkpoint only, not from the start.",
        "• Touching or repositioning the robot without referee permission will lead to disqualification.",
        "",
        "**Team Rules:**",
        "• A team may consist of a maximum of four members. Only one member from team is allowed to handle the robot during the competition.",
        "• Only team members registered for the event are allowed in the competition area.",
        "• Any form of misbehaviour, argument with officials, or violation of rules may result in disqualification.",
        "• A participant cannot be a member of multiple teams.",
        "• Only undergraduate students are allowed to participate.",
        "",
        "**General Rules:**",
        "• The robot must start only after the referee's signal.",
        "• External assistance during a run is strictly prohibited.",
        "• The organizers reserve the right to modify rules if necessary and resolve disputes.",
        "• The decision of the referee and organizers will be final and binding.",
        "",
        "**Hand Touch:**",
        "• The operator must request referee permission before touching the robot.",
        "• Touching without permission results in immediate disqualification.",
        "• If permission is granted: The robot must restart from the last checkpoint. The timer will continue running.",
        "",
        "**Scoring Criteria:**",
        "• Scoring is purely time-based.",
        "• The overall time taken from start to finish will be calculated for each run.",
        "• The team with the minimum final time will be declared the winner.",
        "**Notes:**",
        "•  All the participants are requested to come to the competition priorily one hour before the event starts to complete your trail runs and inspection."
      ],
      prizes: {
        first: "Rs. 8,000",
        second: "Rs. 6,000",
        third: "Rs. 4,000"
      },
      contacts: [
        { name: "Mr. Gautam Kumar", phone: "+91 80927 31451" },
        { name: "Mr. Pavan Swaroop", phone: "+91 93473 56252" },
        { name: "Mr. Majeti Duteswar kalyan", phone: "+91 93929 76993" },
        { name: "Ms.T.Lakshmi Hasmitha", phone: "+91 93466 34538 " }
      ]
    },
    "Bot Wrestling": {
      title: "ROBO WARS",
      subtitle: "Bot Wrestling",
      rules: [
        "**Objective:**",
        "Bot Wrestling is a competitive event where two robots, controlled either wirelessly or via wired connections, face off with the objective of pushing the opposing robot out of the designated arena. These robots must be operated remotely, ensuring a battle of strategic maneuvering and technological prowess.",
        "",
        "**Robot Specifications:**",
        "1. The robot’s dimensions must not exceed (300mm x 300 mm x 300 mm) at any point during the game. The robot height should not exceed 15cm.",
        "2. Both wired and wireless robots are allowed.",
        "3. The weight of the bot (wired/wireless) should not exceed 5 kg.",
        "4. The maximum voltage for batteries, both in the robot and the remote, must not exceed 12 V.",
        "5. The bot can have 4-wheel drive or 2-wheel drive mechanism; all the tyres must contribute to its movement.",
        "6. The body of the robot must not be taken from any readymade toys.",
        "7. For wired control, participants must ensure that the wire length is at least 5 meters. The wires should be properly insulated and bundled together as a single unit without disturbing the others robot.",
        "8. RF modules from toy cars are not permitted; however, the use of IC engines and LEGO kits will result in disqualification.",
        "9. The battery of the robot should be onboard.",
        "",
        "**Weapon / Front Attachment Constraints:**",
        "1. There should be no holding mechanism to the robot.",
        "2. No expansion of front attachments of the robot after start.",
        "3. No sharp blades, cutters, or entangling devices.",
        "4. Wedge/lifter angles typically: 20°–45°.",
        "",
        "**Rules:**",
        "1. The objective of the competition is to be the last bot standing inside the arena.",
        "2. Teams will compete in a knockout or league format, depending on the total number of participating teams. Based on performance, the top four teams will qualify for the Semi-Finals.",
        "3. At the start of each match, both bots must be positioned at the center of the ring.",
        "4. The match will begin only after the referee’s signal.",
        "5. A bot wins a round by pushing its opponent completely outside the ring.",
        "6. The referee’s decision will be final in determining whether a bot has been pushed out entirely.",
        "7. If a bot does not move from its position for more than 30 seconds, the team will receive a first warning.",
        "8. Chain and belt mechanisms involved robots are not allowed. Only electric driven system are allowed to participate.",
        "9. The team will be disqualified if the player intentionally hurts the opponents robot after the referees signal.",
        "",
        "**Match Duration:**",
        "• Each match will have a maximum duration of 5 minutes.",
        "",
        "**Push-Out Limit:**",
        "• The bot with the greater number of push-outs will be declared the winner.",
        "",
        "**False Start Rule:**",
        "• If a bot moves before the referee’s signal, the match counter will be reset, and the team will be given a second chance.",
        "• Repeated violations of this rule will result in disqualification.",
        "",
        "**Arena:**",
        "1. The arena will be square in shape of side 2400 mm.",
        "2. The main arena will be a circular in shape with a maximum diameter 2200 mm.",
        "3. A center white line of 25.40 mm width, divides the arena into two equal halves.",
        "4. White border squares of 300 mm x 300 mm on the opposite sides of the central line, indicating the starting zones of the two competing teams.",
        "5. The arena will be constructed from wood, with all the markings on it, including the zones, painted onto the surface.",
        "",
        "**Power Supply:**",
        "1. The robot must be completely self-contained and require no external assistance. It must not use any energy produced through burning fuels that may have any potential risk of fire hazard.",
        "2. The robot must have an internal on-board power source, external power supplies are not allowed.",
        "3. The voltage within the robot must not exceed 12 V DC any point.",
        "",
        "**Point System:**",
        "1. Each match will have a total duration of 5 minutes, unless extended by the judges.",
        "2. During these 5 minutes, points will be awarded based on the number of goals scored.",
        "3. If a robot goes outside the arena, the opposing team will be awarded one point.",
        "4. The judges’ decision shall be final and binding in all matters.",
        "5. The organizers reserve the right to modify any or all of the above rules as deemed necessary.",
        "",
        "**Hand Touch:**",
        "1. The operator must request referee permission before touching the robot.",
        "2. Touching without permission results in immediate disqualification.",
        "3. If the robot disconnects during the competition, one minute will be given to repair it."
      ],
      prizes: {
        first: "Rs. 8,000",
        second: "Rs. 6,000",
        third: "Rs. 4,000"
      },
      contacts: [
        { name: "Mr. Gautam Kumar", phone: "+91 80927 31451" },
        { name: "Mr. Pavan Swaroop", phone: "+91 93473 56252" },
        { name: "Mr. Majeti Duteswar kalyan", phone: "+91 93929 76993" },
        { name: "Ms.T.Lakshmi Hasmitha", phone: "+91 93466 34538 " }
      ]
    },
    "Robo Races": {
      title: "ROBO WARS",
      subtitle: "Robo Races",
      rules: [
        "**Objective:** Robo Race is a competitive event in which teams must design and build a manually controlled wired or wireless robot capable of traversing multiple challenging terrains such as land, sand, gravel, inclines, and shallow water. The robot that successfully completes the entire track in the minimum amount of time will be declared the Robo Race Winner.",
        "",
        "**Robot Specifications:**",
        "• The robot must fit inside 300 × 300 × 300 mm (L × B × H) at all times. External control devices are not included in dimensions.",
        "• Maximum weight allowed is 5 kg.",
        "• Chain-based mechanisms are not allowed.",
        "• Only electric motor–driven gear mechanisms are permitted.",
        "• Ready-made RC cars are strictly prohibited.",
        "• Use of IC engines, compressors, or pneumatic systems is not allowed.",
        "• The robot must remain intact throughout the race. Disintegration results in immediate disqualification.",
        "• The robot must not cause any damage to the track or arena.",
        "• If the robot is deemed unsafe, the team will be disqualified.",
        "• Market-procured parts allowed: Motors, Tyres & wheels",
        "",
        "**Power Supply:**",
        "• Allowed batteries: Li-po, Li-ion, or standard cell batteries.",
        "• Batteries must be placed inside a protective shield to ensure safety during impacts.",
        "• Standard operating voltage: 11.2V",
        "• Maximum permitted voltage: 12V. Exceeding 12V will result in penalty time before the race.",
        "",
        "**Control System Rules:**",
        "• Wired Control: The wire must remain slack at all times during the race.",
        "• Wireless Control: Wireless robots must use dual-frequency / Bluetooth / equivalent systems. Teams must switch to the desired frequency before the event to avoid interference. If disconnection occurs while racing, teams have 1 minute to repair the robot.",
        "",
        "**Track and Arena Details:**",
        "• The track will consist of multiple terrains: smooth surfaces, sand, gravel, slopes, and shallow water.",
        "• The robot must remain inside the track boundaries at all times.",
        "• Checkpoints will be placed at regular intervals for reset purposes.",
        "• Any damage caused to the track by the robot will result in disqualification.",
        "",
        "**Trial Run (Practice Round):**",
        "• Each team will be given one free trial run (span of 2 minutes) before the official competition begins.",
        "• This trial run is meant for: Testing the robot, Calibrating sensors, Adjusting and finalizing the code.",
        "• No checkpoints will be present during the trial run.",
        "• Trial run time is not included in scoring.",
        "• No hardware modifications are allowed after trial run without referee approval.",
        "",
        "**Checkpoint Rules:**",
        "• Checkpoints will be active only during the competition runs.",
        "• If the robot reaches a checkpoint and becomes unbalanced or unable to proceed correctly, the team is allowed to lift the robot and place it at the previous checkpoint. Each team will be given three official chances (runs) during the competition to fix the robot.",
        "• The robot must resume the run from the previous checkpoint only, not from the start.",
        "• Touching or repositioning the robot without referee permission will lead to disqualification.",
        "",
        "**Team Rules:**",
        "• A team may consist of a maximum of five members. Only one member from team is allowed to handle the robot during the competition.",
        "• Only team members registered for the event are allowed in the competition area.",
        "• Any form of misbehavior, argument with officials, or violation of rules may result in disqualification.",
        "• A participant cannot be a member of multiple teams.",
        "• Only undergraduate students are allowed to participate.",
        "",
        "**General Rules:**",
        "• The robot must start only after the referee's signal.",
        "• External assistance during a run is strictly prohibited.",
        "• The organizers reserve the right to modify rules if necessary and resolve disputes.",
        "• The decision of the referee and organizers will be final and binding.",
        "",
        "**Hand Touch:**",
        "• The operator must request referee permission before touching the robot.",
        "• Touching without permission results in immediate disqualification.",
        "• If permission is granted: The robot must restart from the last checkpoint. The timer will continue running.",
        "",
        "**Scoring Criteria:**",
        "• Scoring is purely time-based.",
        "• The overall time taken from start to finish will be calculated for each run.",
        "• The team with the minimum final time will be declared the winner.",
        "**Notes:**",
        "•  All the participants are requested to come to the competition priorily one hour before the event starts to complete your trail runs and inspection."

      ],
      prizes: {
        first: "Rs. 8,000",
        second: "Rs. 6,000",
        third: "Rs. 4,000"
      },
      contacts: [
        { name: "Mr. Gautam Kumar", phone: "+91 80927 31451" },
        { name: "Mr. Pavan Swaroop", phone: "+91 93473 56252" },
        { name: "Mr. Majeti Duteswar kalyan", phone: "+91 93929 76993" },
        { name: "Ms.T.Lakshmi Hasmitha", phone: "+91 93466 34538 " }
      ]
    }
  };

  // Event image mapping
  const eventImageMap: { [key: string]: string } = {
    // Category Images
    "Sports": "/images/Sports.avif",
    "Cultural": "/images/Cultural.avif",
    "Gaming": "/images/Gaming.avif",
    "Visual Arts": "/images/visual arts.avif",
    "Digital Arts": "/images/digital arts.avif",
    // Sports Events
    "Athletics": "/images/athletics.avif",
    "Men's Athletics": "/images/athletics.png",
    "Women's Athletics": "/images/athletics.png",
    "Para Sports": "/images/para athletics (men).avif",
    "Para Athletics": "/images/para athletics (men).avif",
    "Para Cricket": "/images/para cricket(men).avif",
    "Chess": "/images/chess.avif",
    "Table Tennis": "/images/Tabel Tennis.avif",
    "Traditional Yogasana": "/images/Traditional Yoga.avif",
    "Artistic Yogasana": "/images/Traditional Yoga.avif",
    "Yoga & Individual": "/images/Yoga & individual.png",
    "Taekwondo": "/images/Taekwando.avif",
    "Tennikoit": "/images/Tennikoit.avif",
    "Volley ball (Men)": "/images/volley ball.avif",
    "Volley ball (Women)": "/images/volley ball.avif",
    "Basket ball (Men)": "/images/basket ball.avif",
    "Basket ball (Women)": "/images/basket ball.avif",
    "Kabaddi (Men)": "/images/kabbadi.avif",
    "Kabaddi (Women)": "/images/kabbadi.avif",
    "Kho-Kho (Men)": "/images/kho kho.avif",
    "Kho-Kho (Women)": "/images/kho kho.avif",
    "Hockey (Men)": "/images/hockey.avif",
    "Hockey (Women)": "/images/hockey.avif",
    "Throw ball": "/images/throwball.avif",
    "Football (Men)": "/images/football men.avif",
    "Football (Women)": "/images/football men.avif",
    // Dance Events
    "Classical Dance Solo": "/images/classical dance.avif",
    "Dancing Star - Western Solo": "/images/dancig star.avif",
    "Dancing Jodi - Western Duo": "/images/dancing jodi.avif",
    "Spot Dance - Jodi": "/images/spot dance.avif",
    "Group Dance": "/images/group dance.avif",
    // Music Events
    "Singing Idol": "/images/singing idol.avif",
    "Group Singing": "/images/group singing.avif",
    "Singing Jodi": "/images/singing jodi.avif",
    "Classical Light Vocal Solo": "/images/classical or light vocal solo.avif",
    "Western Vocal Solo": "/images/Western vocal solo.avif",
    "Anthyakshari Duo": "/images/anthyakshari.avif",
    "Instrumental Solo": "/images/instrumental solo.avif",
    // Theatre Events
    "Skit": "/images/skit.avif",
    "Mime": "/images/mime.avif",
    "Mono Action": "/images/Mono Action.avif",
    "Spot Ad Making": "/images/On Spot Ad Making.avif",
    "Dialogue Dhamaka": "/images/Dialogue Drama.avif",
    // Literature Events
    "Master Orator": "/images/Master orator.avif",
    "On Spot Creative Content Writing": "/images/spot creative.avif",
    "Telugu Vyaasa Rachana": "/images/telugu vyasa rachana.avif",
    "Shayari - Hindi": "/images/Shayari hindi.avif",
    "JAM": "/images/impromptu.avif",
    "Story telling": "/images/story telling.avif",
    "Quiz": "/images/Quiz wiz.avif",
    "Word Master": "/images/word master.avif",
    "Dumb Charades": "/images/dumb chardes.avif",
    // Visual Arts Events
    "Theme Painting": "/images/Theme Painting.avif",
    "Clay Modelling": "/images/clay modeling.avif",
    "Rangoli": "/images/Rangoli.avif",
    "Mehandi": "/images/Mehandi.avif",
    "Collage": "/images/collage.avif",
    "Face Painting": "/images/Face painting.avif",
    "Pencil Sketching": "/images/pencil Sketching.avif",
    "Mandala Art": "/images/Mandala Art.avif",
    // Fashion Design Events
    "Haute Couture": "/images/Theme Ramp walk.avif",
    "Craftvilla": "/images/Craft villa.avif",
    "Texart": "/images/texart.avif",
    "T-Shirt Designing": "/images/T-shirt designing.avif",
    // Digital Storytelling Events
    "Online Photography": "/images/Theme Photography.avif",
    "Digital Poster Making": "/images/Digital Poster Making.avif",
    "Mahotsav Digital Chronicle": "/images/MH-26 Digital Chronicle.avif",
    "Reel Making": "/images/reel making.avif",
    "Short Film Making": "/images/Short Film.avif",
    // Gaming Events
    "Valorant": "/images/valorant.avif",
    "E-Football": "/images/E-Football.avif",
    "Counter Strike": "/images/Counter Strike.avif",
    "Smash Karts": "/images/smash kart.avif",
    "Line Follower Robot": "/images/Line Flower Robot.avif",
    "Bot Wrestling": "/images/Bot wrestling.avif",
    "Robo Races": "/images/Robo Races.avif",
    // Spotlight Events
    "Mr. and Ms. Mahotsav": "/images/Mr&Ms.Mahotsav.avif",
    "Mahotsav Got Talent": "/images/Mahotsav%20Got%20Talent.avif"
  };

  const handleDownloadHTML = async () => {
    if (!eventData) return;

    console.log('=== Starting download process ===');
    setIsDownloading(true);
    try {
      const element = document.getElementById('download-section');
      if (!element) {
        throw new Error('Download section not found');
      }

      // 1. Convert Images to Base64 for offline support
      console.log('Converting images to base64...');
      const images = Array.from(element.getElementsByTagName('img'));
      const originalSrcs = new Map<HTMLImageElement, string>();
      const imagesToConvert = images.filter(img => img.src && !img.src.includes('data:'));
      console.log(`Found ${imagesToConvert.length} images to convert`);

      for (const img of imagesToConvert) {
        try {
          const response = await fetch(img.src);
          const blob = await response.blob();
          const reader = new FileReader();
          const base64data = await new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          originalSrcs.set(img, img.src);
          img.src = base64data;
        } catch (e) {
          console.warn(`Failed to convert image to base64: ${img.src}`, e);
        }
      }

      // 1.5. Convert background image to Base64
      console.log('=== Converting background image ===');
      let backgroundImageBase64 = '';
      const possibleBgPaths = ['/images/Background.png', '/Background-redesign.avif'];

      for (const bgPath of possibleBgPaths) {
        try {
          console.log(`Attempting to fetch background image: ${bgPath}`);
          const response = await fetch(bgPath);
          console.log(`Response status: ${response.status}, ok: ${response.ok}`);
          if (!response.ok) {
            console.warn(`Failed to fetch ${bgPath}: ${response.status}`);
            continue;
          }
          const blob = await response.blob();
          console.log(`Blob size: ${blob.size} bytes, type: ${blob.type}`);
          const reader = new FileReader();
          backgroundImageBase64 = await new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          console.log(`Successfully converted background image: ${bgPath}, base64 length: ${backgroundImageBase64.length}`);
          showToast.success(`Background loaded: ${bgPath}`);
          break; // Success, exit loop
        } catch (e) {
          console.warn(`Failed to convert background image ${bgPath}:`, e);
        }
      }

      if (!backgroundImageBase64) {
        console.error('Could not load any background image');
        showToast.warning('Background image could not be embedded');
      }

      // 2. Get the content
      const content = element.outerHTML;

      // Restore original srcs in the live UI
      originalSrcs.forEach((src, img) => {
        img.src = src;
      });

      // 3. Get all styles
      let styles = '';
      const styleSheets = document.styleSheets;
      for (let i = 0; i < styleSheets.length; i++) {
        try {
          const sheet = styleSheets[i];
          const rules = sheet.cssRules || sheet.rules;
          for (let j = 0; j < rules.length; j++) {
            styles += rules[j].cssText + '\n';
          }
        } catch (e) {
          if (styleSheets[i].href) {
            styles += `@import url("${styleSheets[i].href}");\n`;
          }
        }
      }

      // 4. Construct the full HTML
      const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${eventData.subtitle} - Event Details</title>
  <style>
    body { 
      margin: 0; 
      padding: 0; 
      background-color: #1a1034; 
      font-family: sans-serif;
    }
    #download-section {
      width: 100%;
      min-height: 100vh;
      margin: 0 auto;
      background-color: #1a1034;
      background-image: url('${backgroundImageBase64}');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
    }
    /* Hide the download, add buttons, and back button in the exported file */
    .action-buttons-container,
    button[aria-label="Go back"] {
      display: none !important;
    }
    ${styles}
  </style>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
  ${content}
</body>
</html>`;

      // 5. Trigger Download
      const blob = new Blob([fullHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${eventData.subtitle.replace(/[^a-zA-Z0-9\s]/g, '_')}_Details.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast.success('Event details downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      showToast.error(`Download failed: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const eventData = eventDetailsData[eventName || ''];

  if (!eventData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        backgroundImage: 'url("https://res.cloudinary.com/dctuev0mm/image/upload/v1766935583/Background-redesign_jbvbrc.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="text-center text-white">
          <h2 className="text-4xl mb-8">Event Not Found</h2>
          <button
            onClick={handleBack}
            className="text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:text-pink-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="download-section" className="min-h-screen event-detail-page" style={{
      backgroundImage: 'url("/images/Background.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Flower - Top Right Corner */}
      <div className="fixed pointer-events-none max-md:z-0 md:z-[1] event-detail-flower" style={{
        top: '-150px',
        right: '-150px',
        width: '450px',
        height: '450px',
        opacity: 0.7
      }}>
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

      <style>{`
        @media (max-width: 768px) {
          .event-detail-flower {
            width: 150px !important;
            height: 150px !important;
            top: -60px !important;
            right: -60px !important;
            opacity: 150 !important;
          }
        }
      `}</style>

      <div className="min-h-screen" style={{ position: 'relative', zIndex: 10, padding: '0px' }}>
        {/* Header: Logo + Back Button + Title */}
        <div style={{ margin: '0px', paddingTop: '0px', paddingLeft: '16px', paddingRight: '16px' }}>
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-3 md:items-start mb-4">
            {/* Left column: Logo and Back button stacked */}
            <div className="flex flex-col items-start gap-3">
              <img
                src={`/menu-dashboard/image.avif`}
                alt="Vignan Mahotsav"
                style={{ height: '18rem', objectFit: 'contain', marginTop: '-5rem' }}
              />
              <BackButton
                className="!static !top-20 !left-auto" style={{ marginTop: '-7rem', marginBottom: '4rem' }}
                onClick={handleBack}
              />
            </div>

            {/* Center column: Title */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '2rem' }}>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Aladin, cursive' }}>
                {eventData.title}
              </h1>
              <h2 style={{ fontSize: '1.875rem', fontWeight: '600', color: '#e9d5ff', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', fontFamily: 'Aladin, cursive' }}>
                {eventData.subtitle}
              </h2>
            </div>

            {/* Right column: Empty (for balance) */}
            <div></div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden flex flex-col items-center gap-3 mb-4 pt-0" style={{ position: 'relative' }}>
            {/* Mahotsav Logo - Top Center */}
            <div className="event-detail-mobile-logo" style={{
              position: 'absolute',
              top: '0px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
              width: 'clamp(220px, 50vw, 350px) !important',
              maxWidth: 'clamp(220px, 50vw, 350px) !important',
              pointerEvents: 'none'
            }}>
              <img
                src={`/menu-dashboard/image.avif`}
                alt="Vignan Mahotsav"
                style={{
                  width: '100% !important',
                  height: 'auto',
                  display: 'block',
                  pointerEvents: 'none'
                }}
              />
            </div>

            {/* Back Button and Titles with padding-top for logo space */}
            <div style={{ paddingTop: 'clamp(170px, 38vw, 240px)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 10 }}>
              <div style={{ width: '100%', position: 'relative' }}>
                <BackButton
                  className="!fixed !top-3 !left-1"
                  onClick={handleBack}
                  style={{ cursor: 'pointer', pointerEvents: 'auto', zIndex: 50 }}
                />
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Aladin, cursive', whiteSpace: 'nowrap' }}>
                  {eventData.title}
                </h1>
                <h2 className="text-2xl font-semibold text-purple-100" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', fontFamily: 'Aladin, cursive', maxWidth: '280px', margin: '0 auto', lineHeight: '1.3', wordBreak: 'break-word' }}>
                  {eventData.subtitle}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex justify-center items-start" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-6 sm:gap-8 max-w-7xl items-start">
            {/* Poster */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-48 sm:w-56 md:w-64 aspect-[3/4] bg-white/90 border-2 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md" style={{ borderColor: '#FFD700' }}>
                {eventName && eventImageMap[eventName] ? (
                  <img
                    src={eventImageMap[eventName]}
                    alt={eventName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-base sm:text-lg font-bold text-purple-900 text-center">
                    <span>POSTER of EVENT</span>
                  </div>
                )}
              </div>
            </div>

            {/* Rules Section */}
            <div className="p-5 sm:p-8 lg:p-4">

              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-yellow-400" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Quesha, sans-serif' }}>
                Rules:
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {(() => {
                  const elements: JSX.Element[] = [];
                  let inTable = false;
                  let tableRows: string[] = [];
                  let tableHeaders: string[] = [];

                  eventData.rules.forEach((rule, index) => {
                    if (rule === 'TABLE_START') {
                      inTable = true;
                      tableRows = [];
                      tableHeaders = [];
                      return;
                    }

                    if (rule === 'TABLE_END') {
                      inTable = false;
                      // Render the table
                      elements.push(
                        <li key={`table-${index}`} className="my-4">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse" style={{ border: '2px solid white' }}>
                              <thead>
                                <tr style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                                  {tableHeaders.map((header, i) => (
                                    <th
                                      key={i}
                                      className="border border-white px-3 py-2 text-left text-sm sm:text-base font-bold text-white"
                                      style={{
                                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                                        fontFamily: 'Borisna, sans-serif'
                                      }}
                                    >
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {tableRows.map((row, rowIndex) => {
                                  const cells = row.split('|');
                                  return (
                                    <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)' }}>
                                      {cells.map((cell, cellIndex) => (
                                        <td
                                          key={cellIndex}
                                          className="border border-white px-3 py-2 text-sm sm:text-base text-white"
                                          style={{
                                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                                            fontFamily: 'Borisna, sans-serif'
                                          }}
                                        >
                                          {cell.trim()}
                                        </td>
                                      ))}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </li>
                      );
                      return;
                    }

                    if (inTable) {
                      if (tableHeaders.length === 0) {
                        // First row is headers
                        tableHeaders = rule.split('|');
                      } else {
                        // Subsequent rows are data
                        tableRows.push(rule);
                      }
                      return;
                    }

                    // Regular rule rendering
                    const isSectionHeader = /^(I{1,4})\.\s/.test(rule);
                    const isSubheading = /^\*\*.*\*\*$/.test(rule.trim());
                    const startsWithBullet = rule.trim().startsWith('•');

                    let displayText = rule;
                    if (isSubheading) {
                      displayText = rule.replace(/^\*\*|\*\*$/g, '');
                    } else if (startsWithBullet) {
                      displayText = rule.trim().substring(1).trim();
                    }

                    const urlMatch = displayText.match(/https?:\/\/\S+/);
                    const url = urlMatch ? urlMatch[0] : null;
                    const [beforeUrl, afterUrl] = url
                      ? [displayText.slice(0, displayText.indexOf(url)), displayText.slice(displayText.indexOf(url) + url.length)]
                      : [displayText, ''];

                    elements.push(
                      <li key={index} className="flex items-start gap-2 sm:gap-4">
                        {!isSectionHeader && !isSubheading && (
                          <span className="text-yellow-400 font-bold text-base sm:text-lg mt-1 shrink-0">•</span>
                        )}
                        <span
                          className="text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose"
                          style={{
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                            fontFamily: 'Borisna, sans-serif',
                            letterSpacing: '0.02em',
                            fontWeight: (isSectionHeader || isSubheading) ? 'bold' : 'normal',
                            color: isSubheading ? '#fdee71' : 'white'
                          }}
                        >
                          {url ? (
                            <>
                              {beforeUrl}
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-yellow-300 hover:text-yellow-200"
                              >
                                {url}
                              </a>
                              {afterUrl}
                            </>
                          ) : (
                            displayText
                          )}
                        </span>
                      </li>
                    );
                  });

                  return elements;
                })()}
              </ul>
            </div>

            {/* Prizes and Contact Section */}
            <div className="space-y-3 sm:space-y-4">
              {/* Cash Prizes */}
              <div className="p-5 sm:p-8 lg:p-4">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-yellow-400 text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Quesha, sans-serif' }}>
                  Cash Prizes:
                </h3>
                {'men' in eventData.prizes ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-yellow-300 mb-2" style={{ fontFamily: 'Borisna, sans-serif' }}>Men:</h4>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                          <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{ fontFamily: 'Borisna, sans-serif' }}>First</span>
                          <span className="font-semibold" style={{ fontFamily: 'Borisna, sans-serif' }}>- {eventData.prizes.men.first}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                          <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{ fontFamily: 'Borisna, sans-serif' }}>Second</span>
                          <span className="font-semibold" style={{ fontFamily: 'Borisna, sans-serif' }}>- {eventData.prizes.men.second}</span>
                        </div>
                        {eventData.prizes.men.third && (
                          <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                            <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{ fontFamily: 'Borisna, sans-serif' }}>Third</span>
                            <span className="font-semibold" style={{ fontFamily: 'Borisna, sans-serif' }}>- {eventData.prizes.men.third}</span>
                          </div>
                        )}
                        {eventData.prizes.men.fourth && (
                          <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                            <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{ fontFamily: 'Borisna, sans-serif' }}>Fourth</span>
                            <span className="font-semibold" style={{ fontFamily: 'Borisna, sans-serif' }}>- {eventData.prizes.men.fourth}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-yellow-300 mb-2" style={{ fontFamily: 'Borisna, sans-serif' }}>Women:</h4>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                          <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{ fontFamily: 'Borisna, sans-serif' }}>First</span>
                          <span className="font-semibold" style={{ fontFamily: 'Borisna, sans-serif' }}>- {eventData.prizes.women.first}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                          <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{ fontFamily: 'Borisna, sans-serif' }}>Second</span>
                          <span className="font-semibold" style={{ fontFamily: 'Borisna, sans-serif' }}>- {eventData.prizes.women.second}</span>
                        </div>
                        {eventData.prizes.women.third && (
                          <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                            <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{ fontFamily: 'Borisna, sans-serif' }}>Third</span>
                            <span className="font-semibold" style={{ fontFamily: 'Borisna, sans-serif' }}>- {eventData.prizes.women.third}</span>
                          </div>
                        )}
                        {eventData.prizes.women.fourth && (
                          <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                            <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{ fontFamily: 'Borisna, sans-serif' }}>Fourth</span>
                            <span className="font-semibold" style={{ fontFamily: 'Borisna, sans-serif' }}>- {eventData.prizes.women.fourth}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                      <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{ fontFamily: 'Borisna, sans-serif' }}>First</span>
                      <span className="font-semibold" style={{ fontFamily: 'Borisna, sans-serif' }}>- {eventData.prizes.first}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                      <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{ fontFamily: 'Borisna, sans-serif' }}>Second</span>
                      <span className="font-semibold" style={{ fontFamily: 'Borisna, sans-serif' }}>- {eventData.prizes.second}</span>
                    </div>
                    {eventData.prizes.third && (
                      <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                        <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{ fontFamily: 'Borisna, sans-serif' }}>Third</span>
                        <span className="font-semibold" style={{ fontFamily: 'Borisna, sans-serif' }}>- {eventData.prizes.third}</span>
                      </div>
                    )}
                    {eventData.prizes.fourth && (
                      <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                        <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{ fontFamily: 'Borisna, sans-serif' }}>Fourth</span>
                        <span className="font-semibold" style={{ fontFamily: 'Borisna, sans-serif' }}>- {eventData.prizes.fourth}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="p-5 sm:p-8 lg:p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-yellow-400 text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Quesha, sans-serif' }}>
                  Contact no:
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {eventData.contacts.map((contact, index) => {
                    // Determine prefix (Mr/Ms) based on name
                    const prefix = contact.name.toLowerCase().includes('ms') || contact.name.toLowerCase().includes('miss') ? 'Ms.' : 'Mr.';
                    // Clean name (remove existing Mr/Ms if present)
                    const cleanName = contact.name.replace(/^(Mr\.?|Ms\.?|Miss)\s*/i, '').trim();
                    // Format phone with +91 and space
                    const formattedPhone = contact.phone.startsWith('+91') ? contact.phone : `+91 ${contact.phone.replace(/^\+?91\s*/, '')}`;

                    return (
                      <div key={index} className="text-white text-xs sm:text-sm md:text-base">
                        <div className="font-semibold" style={{ fontFamily: 'Borisna, sans-serif' }}>
                          {prefix} {cleanName}: <a href={`tel:${formattedPhone.replace(/\s/g, '')}`} style={{ color: '#FFD700', textDecoration: 'underline', cursor: 'pointer' }}>{formattedPhone}</a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-container flex flex-col md:flex-row gap-6 justify-center items-center mt-16 mb-20 px-6">
          <button
            className="hover:scale-105 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-[0_8px_16px_rgba(0,0,0,0.3)] text-lg flex items-center justify-center gap-2 border-2 border-purple-400/30"
            style={{
              width: '85%',
              maxWidth: '320px',
              backgroundColor: '#462554'
            }}
            onClick={handleDownloadHTML}
            disabled={isDownloading}
          >
            {isDownloading ? ' Downloading...' : ' Download Details'}
          </button>

          <button
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-105 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-[0_8px_16px_rgba(0,0,0,0.3)] text-lg flex items-center justify-center gap-2"
            style={{ width: '85%', maxWidth: '320px' }}
            onClick={handleAddToMyEvents}
            disabled={isAddingEvent}
          >
            {isAddingEvent ? ' Adding...' : ' Add My Events'}
          </button>
        </div>

        {/* Athletics Selection Modal */}
        {showAthleticsSelection && (
          <div className="athletics-selection-overlay">
            <div className="athletics-selection-modal">
              <h2 className="athletics-selection-title">
                Select Athletics Events
              </h2>
              <div className="athletics-selection-list custom-scrollbar">
                {athleticsEvents.map((event) => {
                  const userGender = localStorage.getItem('gender')?.toLowerCase();
                  if (event.menOnly && userGender !== 'male') return null;

                  const isSelected = selectedAthleticsEvents.includes(event.name);

                  return (
                    <div
                      key={event.id}
                      className={`athletics-selection-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedAthleticsEvents(prev =>
                          prev.includes(event.name)
                            ? prev.filter(e => e !== event.name)
                            : [...prev, event.name]
                        );
                      }}
                    >
                      <div className={`athletics-selection-checkbox ${isSelected ? 'selected' : ''}`}>
                        {isSelected && (
                          <span className="athletics-selection-checkmark">✓</span>
                        )}
                      </div>
                      <span className="athletics-selection-text">
                        {event.name}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="athletics-selection-footer">
                <button
                  className="athletics-selection-btn-cancel"
                  onClick={() => {
                    setShowAthleticsSelection(false);
                    setSelectedAthleticsEvents([]);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="athletics-selection-btn-confirm"
                  disabled={selectedAthleticsEvents.length === 0}
                  onClick={handleAthleticsSelectionConfirm}
                >
                  Confirm Selection ({selectedAthleticsEvents.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;