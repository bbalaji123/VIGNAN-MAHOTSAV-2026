import React, { useState, useEffect } from 'react';
import AnimatedIcon from './Animatedicon';
import FloatingBubble from './FloatingBubble';
import FloatingIcons from './FloatingIcons';
import SideMenu from './SideMenu';
import EventRegistrationModal from './EventRegistrationModal';
import { registerUser, loginUser, forgotPassword, getEventsByType, saveMyEvents, getMyEvents, getMyEventRegistrations, type SignupData, type Event } from './services/api';
import './Dashboard.css';
import './ForgotPassword.css';
import './App.css';

const Dashboard: React.FC = () => {
  const [showMenuCards, setShowMenuCards] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showOverviewModal, setShowOverviewModal] = useState(false);
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
    participationType: 'none'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [generatedUserId, setGeneratedUserId] = useState<string | null>(null);
  const [showUserIdPopup, setShowUserIdPopup] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [resetMessage, setResetMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [sportsEvents, setSportsEvents] = useState<Event[]>([]);
  const [culturalsEvents, setCulturalsEvents] = useState<Event[]>([]);
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
  const [userProfileData, setUserProfileData] = useState<{ name: string; email: string; userId?: string; userType?: string }>({ name: '', email: '' });
  const [showEventChecklistModal, setShowEventChecklistModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [showMyEventsModal, setShowMyEventsModal] = useState(false);
  const [tempSelectedEvents, setTempSelectedEvents] = useState<Set<string>>(new Set());
  const [eventRegistrationsCount, setEventRegistrationsCount] = useState(0);

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

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      console.log('🔄 Fetching events from API...');
      setLoadingEvents(true);
      try {
        // Fetch sports events
        console.log('📡 Fetching sports events...');
        const sportsResponse = await getEventsByType('sports');
        console.log('⚽ Sports response:', sportsResponse);
        if (sportsResponse.success && sportsResponse.data) {
          setSportsEvents(sportsResponse.data);
          console.log(`✅ Loaded ${sportsResponse.data.length} sports events`);
        }

        // Fetch culturals events
        console.log('📡 Fetching cultural events...');
        const culturalsResponse = await getEventsByType('culturals');
        console.log('🎨 Culturals response:', culturalsResponse);
        if (culturalsResponse.success && culturalsResponse.data) {
          setCulturalsEvents(culturalsResponse.data);
          console.log(`✅ Loaded ${culturalsResponse.data.length} cultural events`);
        }
      } catch (error) {
        console.error('❌ Error fetching events:', error);
      } finally {
        setLoadingEvents(false);
        console.log('✅ Finished loading events');
      }
    };

    fetchEvents();
  }, []);

  const handleMenuClick = (category?: string) => {
    if (category) {
      // If a category is provided, open that specific modal
      handleCardClick(category);
    } else {
      // Otherwise toggle menu cards display
      setShowMenuCards(!showMenuCards);
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleOverviewClick = () => {
    setShowOverviewModal(true);
  };

  const handleCloseOverview = () => {
    setShowOverviewModal(false);
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
      participationType: 'none'
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
          participationType: 'none'
        });
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.message || 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
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
    } catch (error) {
      setResetMessage({
        type: 'error',
        text: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSendingReset(false);
    }
  };

  const handleCardClick = (cardName: string) => {
    if (cardName === 'HOME') {
      // Scroll to top for home
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowMenuCards(false);
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
      
      setActiveSubModal(cardName);
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

  const handleShowMyEvents = () => {
    setShowProfileDropdown(false);
    setShowMyEventsModal(true);
  };

  const handleCloseMyEvents = () => {
    setShowMyEventsModal(false);
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
        const { userId, name, email, userType = 'visitor' } = result.data;
        
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
          userType: userType || 'visitor'
        };
        setUserProfileData(profileData);
        
        setShowLoginModal(false);
        setLoginFormData({ email: '', password: '' });
        
        // Store in localStorage
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userType', userType || 'visitor');
        localStorage.setItem('isLoggedIn', 'true');
        
        // Fetch user's saved events from database
        fetchUserSavedEvents(userId);
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
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    
    if (storedLoginStatus === 'true' && storedUserName && storedUserId) {
      setIsLoggedIn(true);
      setLoggedInUserName(storedUserName);
      setUserProfileData({
        name: storedUserName,
        email: storedUserEmail || '',
        userId: storedUserId,
        userType: storedUserType || 'visitor'
      });
      
      // Fetch user's saved events from database
      fetchUserSavedEvents(storedUserId);
    }
  }, []);

  // Function to fetch user's saved events from database
  const fetchUserSavedEvents = async (userId: string) => {
    try {
      const result = await getMyEvents(userId);
      if (result.success && result.data) {
        setMyEvents(result.data);
        setSelectedEvents(new Set(result.data.map((e: Event) => e._id)));
      }
    } catch (error) {
      console.error('Error fetching saved events:', error);
    }
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
    <div className={`single-page-app ${timeTheme}-theme`}>
      
      {/* Sunlight Effect */}
      <div className={`sunlight-effect ${isScrolled ? 'active' : ''}`}>
        <div className="sunlight-rays ray-1"></div>
        <div className="sunlight-rays ray-2"></div>
        <div className="sunlight-rays ray-3"></div>
      </div>

      {/* Shimmer Overlay */}
      <div className={`shimmer-overlay ${isScrolled ? 'active' : ''}`}></div>

      {/* Sticky Side Menu */}
      <SideMenu onMenuClick={handleMenuClick} />
     
      <nav className="header-nav">
          <div className="nav-left">
            <a href="#home" className="active">Home</a>
            <a href="#my-events" onClick={(e) => { e.preventDefault(); handleShowMyEvents(); }}>My Events</a>
            <a href="#zonal">Zonal</a>
          </div>
          <div className="nav-right">
            {/* Profile section - shown when logged in */}
            {isLoggedIn && (
              <div className="user-profile-section" onClick={handleShowProfile}>
                <div className="profile-icon">👤</div>
                <span className="welcome-text">Welcome, {loggedInUserName}!</span>
              </div>
            )}
          </div>
      </nav>
      
      {/* Participation Stats Marquee */}
      <div className="participation-marquee">
        <div className="marquee-content">
          <span className="marquee-item">🏅 Sports - Men: 350 </span>
          <span className="marquee-separator">•</span>
          <span className="marquee-item">🏅 Sports - Women: 250 </span>
          <span className="marquee-separator">•</span>
          <span className="marquee-item">🎭 Culturals - Men: 250 </span>
          <span className="marquee-separator">•</span>
          <span className="marquee-item">🎭 Culturals - Women: 250 </span>
          <span className="marquee-separator">•</span>
          <span className="marquee-item">🏅 Sports - Men: 350 </span>
          <span className="marquee-separator">•</span>
          <span className="marquee-item">🏅 Sports - Women: 250 </span>
          <span className="marquee-separator">•</span>
          <span className="marquee-item">🎭 Culturals - Men: 250 </span>
          <span className="marquee-separator">•</span>
          <span className="marquee-item">🎭 Culturals - Women: 250 </span>
        </div>
      </div>
      
      {/* The Icon Component - Fixed position, animates with scroll */}
      <AnimatedIcon iconSrc={`${import.meta.env.BASE_URL}IMG_2037.webp`} />

      {/* 1. Hero Section (First Fold) */}
      <section className="hero-section">
        <div className="hero-image-container">
          <img src={`${import.meta.env.BASE_URL}image.png`} alt="Vignan Mahotsav" className="hero-main-image" />
        </div>
        
        {/* Action Buttons - Overview always visible, Login only when not logged in */}
        <div className="hero-action-buttons">
          <button className="overview-btn" onClick={handleOverviewClick}>Overview</button>
          {!isLoggedIn && (
            <button className="login-btn" onClick={handleLoginClick}>Login</button>
          )}
        </div>
        
        <div className="scroll-indicator">
          <p>Scroll down to see the magic ✨</p>
        </div>
      </section>

      {/* 2. About Us Section (Second Fold) */}
      <section className="about-us-section">
        <h1>About Us</h1>
        <div className="about-us-content">
          <h2>Welcome to Vignan Mahotsav</h2>
          <p>
            Vignan Mahotsav is an annual celebration that brings together the brightest minds 
            in science, technology, and innovation. Our festival showcases cutting-edge research, 
            interactive exhibitions, and inspiring demonstrations that captivate audiences of all ages.
          </p>
          <p>
            Join us in exploring the wonders of science and discover how innovation shapes our future.
          </p>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="sponsors-section">
        <h2>Our Sponsors & Partners</h2>
        <div className="sponsors-image-container">
          <img src={`${import.meta.env.BASE_URL}sponsors.jpg`} alt="Our Sponsors and Partners" className="sponsors-image" />
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="dashboard-section features-section">
        <h2>Event Highlights</h2>
        
        {/* Statistics View */}
        <div className="stats-showcase-grid">
          <div className="stat-showcase-card">
            <div className="stat-number">20K+</div>
            <div className="stat-label">Participants</div>
            <button className="stat-button">Participants</button>
          </div>
          <div className="stat-showcase-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Events</div>
            <button className="stat-button">Events</button>
          </div>
          <div className="stat-showcase-card">
            <div className="stat-number">15 Lakhs</div>
            <div className="stat-label">Prize Pool</div>
            <button className="stat-button">Prize Pool</button>
          </div>
          <div className="stat-showcase-card">
            <div className="stat-number">25+</div>
            <div className="stat-label">Sponsors</div>
            <button className="stat-button">Sponsors</button>
          </div>
        </div>
      </section>

      {/* Highlights of 2025 Section */}
      <section className="dashboard-section highlights-section">
        <h2>Highlights of 2025</h2>
        <div className="highlights-grid">
          <div className="highlight-card">
            <div className="highlight-image">
              <div className="day-badge">Day ONE</div>
              <div className="highlight-video">
                <video 
                  autoPlay
                  controls
                  loop 
                  muted 
                  playsInline
                  preload="metadata"
                  className="day-video"
                >
                  <source src={`${import.meta.env.BASE_URL}day 1.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <h3>Exciting Day One Highlights</h3>
            <p>Cultural performances, inauguration ceremony, and opening events that set the stage for an amazing festival.</p>
          </div>
          
          <div className="highlight-card">
            <div className="highlight-image">
              <div className="day-badge">Day TWO</div>
              <div className="highlight-video">
                <video 
                  autoPlay
                  controls
                  loop 
                  muted 
                  playsInline
                  preload="metadata"
                  className="day-video"
                >
                  <source src={`${import.meta.env.BASE_URL}day 2.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <h3>Exciting Day Two Highlights</h3>
            <p>Main events, competitions, technical exhibitions, and spectacular performances by renowned artists.</p>
          </div>
          
          <div className="highlight-card">
            <div className="highlight-image">
              <div className="day-badge">Day THREE</div>
              <div className="highlight-video">
                <video 
                  autoPlay
                  controls
                  loop 
                  muted 
                  playsInline
                  preload="metadata"
                  className="day-video"
                >
                  <source src={`${import.meta.env.BASE_URL}day 3.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <h3>Exciting Day Three Highlights</h3>
            <p>Grand finale, award ceremonies, closing performances, and memorable moments to conclude the festival.</p>
          </div>
        </div>
      </section>

      {/* 4. Stats Section */}
      <section className="dashboard-section stats-section">
        <h2>Mahotsav by the Numbers</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>5000+</h3>
            <p>Participants</p>
          </div>
          <div className="stat-card">
            <h3>100+</h3>
            <p>Exhibitions</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>Workshops</p>
          </div>
          <div className="stat-card">
            <h3>30+</h3>
            <p>Expert Speakers</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2025 Vignan Mahotsav. All rights reserved.</p>
      </footer>

      {/* Floating Bubble Menu */}
      <FloatingBubble />
      
      {/* Decorative Floating Icons */}
      <FloatingIcons />

      {/* Side Menu */}
      <SideMenu onMenuClick={handleMenuClick} />

      {/* Overview Modal */}
      {showOverviewModal && (
        <div className="login-modal-overlay" onClick={handleCloseOverview}>
          <div className="overview-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>Vignan Mahotsav 2026 - Overview</h2>
              <button className="close-btn" onClick={handleCloseOverview}>×</button>
            </div>
            <div className="overview-modal-body">
              <div className="overview-content">
                <div className="overview-section">
                  <h3>🎉 Welcome to Vignan Mahotsav</h3>
                  <p>
                    Vignan Mahotsav is the grandest celebration of science, technology, culture, and innovation 
                    organized annually at our esteemed institution. This magnificent festival brings together 
                    brilliant minds, creative souls, and passionate individuals from across the nation to 
                    celebrate the spirit of knowledge and cultural harmony.
                  </p>
                </div>

                <div className="overview-section">
                  <h3>🌟 Festival Highlights</h3>
                  <div className="highlights-list">
                    <div className="highlight-item">
                      <strong>Cultural Extravaganza:</strong> Witness spectacular performances including 
                      classical dance, music concerts, drama, and folk art from various regions of India.
                    </div>
                    <div className="highlight-item">
                      <strong>Technical Competitions:</strong> Participate in cutting-edge technical events, 
                      hackathons, robotics competitions, and innovation challenges.
                    </div>
                    <div className="highlight-item">
                      <strong>Sports Tournaments:</strong> Engage in thrilling sports competitions including 
                      cricket, football, basketball, athletics, and traditional games.
                    </div>
                    <div className="highlight-item">
                      <strong>Literary Events:</strong> Express your creativity through poetry, storytelling, 
                      debate competitions, and creative writing contests.
                    </div>
                  </div>
                </div>

                <div className="overview-section">
                  <h3>📅 Event Details</h3>
                  <div className="event-details">
                    <div className="detail-row">
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">3 Days of Non-stop Celebration</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Dates:</span>
                      <span className="detail-value">5-7 February 2026</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Venue:</span>
                      <span className="detail-value">Vignan University Campus</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Expected Participants:</span>
                      <span className="detail-value">5000+ Students & Faculty</span>
                    </div>
                  </div>
                </div>

                <div className="overview-section">
                  <h3>🏆 What Makes It Special</h3>
                  <p>
                    Vignan Mahotsav stands as a testament to the perfect blend of tradition and modernity. 
                    Our festival promotes cultural diversity, technological advancement, and holistic 
                    development of students. It provides a platform for showcasing talent, fostering 
                    creativity, and building lasting memories.
                  </p>
                  <p>
                    Join us in this incredible journey of learning, celebration, and cultural exchange. 
                    Be part of an experience that celebrates the essence of "Eternal Harmony" - where 
                    science meets art, tradition meets innovation, and dreams meet reality.
                  </p>
                </div>

                <div className="overview-section">
                  <h3>🎯 Registration & Participation</h3>
                  <p>
                    Ready to be part of this magnificent celebration? Register now to secure your spot 
                    in various events, competitions, and cultural programs. Don't miss this opportunity 
                    to showcase your talents and be part of something extraordinary!
                  </p>
                </div>
              </div>
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
                  {isLoggingIn ? '⏳ Logging in...' : '🔑 Login to Dashboard'}
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
                      <label htmlFor="dateOfBirth">Date of Birth * (This will be your password)</label>
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
              <h2>{activeSubModal}</h2>
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
                    <div className="events-category-grid">
                      {/* Sports Events */}
                      <div className="event-category-card">
                        <h3>⚽ Sports Events ({sportsEvents.length})</h3>
                        <div className="event-list">
                          {sportsEvents.length > 0 ? (
                            sportsEvents.map((event) => (
                              <label key={event._id} className="event-item event-checkbox-item">
                                <input
                                  type="checkbox"
                                  className="event-checkbox"
                                  checked={tempSelectedEvents.has(event._id)}
                                  onChange={() => {
                                    const newSelection = new Set(tempSelectedEvents);
                                    if (newSelection.has(event._id)) {
                                      newSelection.delete(event._id);
                                    } else {
                                      newSelection.add(event._id);
                                    }
                                    setTempSelectedEvents(newSelection);
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
                            <p>No sports events available at the moment.</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Cultural Events */}
                      <div className="event-category-card">
                        <h3>🎨 Cultural Events ({culturalsEvents.length})</h3>
                        <div className="event-list">
                          {culturalsEvents.length > 0 ? (
                            culturalsEvents.map((event) => (
                              <label key={event._id} className="event-item event-checkbox-item">
                                <input
                                  type="checkbox"
                                  className="event-checkbox"
                                  checked={tempSelectedEvents.has(event._id)}
                                  onChange={() => {
                                    const newSelection = new Set(tempSelectedEvents);
                                    if (newSelection.has(event._id)) {
                                      newSelection.delete(event._id);
                                    } else {
                                      newSelection.add(event._id);
                                    }
                                    setTempSelectedEvents(newSelection);
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
                            <p>No cultural events available at the moment.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="events-modal-footer">
                    <div className="selected-count">
                      Selected: {tempSelectedEvents.size} event(s)
                    </div>
                    <button 
                      className="save-to-my-events-btn"
                      onClick={async () => {
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
                        
                        try {
                          const result = await saveMyEvents(userProfileData.userId!, eventIds);
                          
                          if (result.success) {
                            await fetchUserSavedEvents(userProfileData.userId!);
                            setTempSelectedEvents(new Set());
                            handleCloseSubModal();
                            alert(`✅ Successfully registered for ${eventIds.length} event(s)! Check My Events to view them.`);
                          } else {
                            alert(result.message || 'Failed to register. Please try again.');
                          }
                        } catch (error) {
                          console.error('Error registering for events:', error);
                          alert('An error occurred while registering.');
                        }
                      }}
                      disabled={tempSelectedEvents.size === 0}
                    >
                      ✅ Register for Events ({tempSelectedEvents.size})
                    </button>
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
                  {sportsEvents.length > 0 && (
                    <div className="checklist-section">
                      <h3>⚽ Sports Events</h3>
                      <div className="checklist-items">
                        {sportsEvents.map((event) => (
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
                  {culturalsEvents.length > 0 && (
                    <div className="checklist-section">
                      <h3>🎨 Cultural Events</h3>
                      <div className="checklist-items">
                        {culturalsEvents.map((event) => (
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

                  {sportsEvents.length === 0 && culturalsEvents.length === 0 && (
                    <p className="no-events-message">No events available at the moment.</p>
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
        <div className="login-modal-overlay" onClick={handleCloseMyEvents}>
          <div className="event-checklist-modal" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>🎫 My Registered Events</h2>
              <button className="close-btn" onClick={handleCloseMyEvents}>×</button>
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
                            {event.eventType === 'sports' ? '⚽' : '🎨'} {event.eventType}
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
                      <button 
                        className="delete-event-btn"
                        onClick={async () => {
                          if (!confirm(`Are you sure you want to remove "${event.eventName}" from your events?`)) {
                            return;
                          }
                          
                          try {
                            // Remove this event from the user's saved events
                            const remainingEventIds = myEvents
                              .filter(e => e._id !== event._id)
                              .map(e => e._id);
                            
                            if (remainingEventIds.length === 0) {
                              // If removing all events, clear everything
                              const result = await saveMyEvents(userProfileData.userId!, []);
                              if (result.success) {
                                setMyEvents([]);
                                setSelectedEvents(new Set());
                                alert('Event removed successfully!');
                              }
                            } else {
                              // Update with remaining events
                              const result = await saveMyEvents(userProfileData.userId!, remainingEventIds);
                              if (result.success) {
                                await fetchUserSavedEvents(userProfileData.userId!);
                                alert('Event removed successfully!');
                              } else {
                                alert(result.message || 'Failed to remove event.');
                              }
                            }
                          } catch (error) {
                            console.error('Error removing event:', error);
                            alert('An error occurred while removing the event.');
                          }
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-events-saved">
                  <p>You haven't registered for any events yet.</p>
                  <button className="browse-events-btn" onClick={() => {
                    setShowMyEventsModal(false);
                    handleCardClick('EVENTS');
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