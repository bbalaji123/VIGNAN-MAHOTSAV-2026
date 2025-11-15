import React, { useState } from 'react';
import './FloatingBubble.css';

const FloatingBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: string) => {
    console.log(`Clicked on ${item}`);
    if (item === 'Announcement') {
      setShowAnnouncements(true);
      setIsOpen(false); // Close menu after selection
    } else {
      setIsOpen(false); // Close menu after selection
    }
  };

  const closeAnnouncements = () => {
    setShowAnnouncements(false);
  };

  return (
    <div className="floating-bubble-container">
      {/* Main floating button */}
      <div 
        className={`floating-bubble ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Menu" className="bubble-logo" />
        <div className={`close-icon ${isOpen ? 'visible' : ''}`}>✕</div>
      </div>

      {/* Expandable menu items */}
      <div className={`bubble-menu ${isOpen ? 'expanded' : ''}`}>
        <div 
          className="bubble-menu-item item-1"
          onClick={() => handleMenuItemClick('Calendar')}
        >
          <div className="menu-icon">📅</div>
        </div>
        
        <div 
          className="bubble-menu-item item-2"
          onClick={() => handleMenuItemClick('Announcement')}
        >
          <div className="menu-icon">📢</div>
        </div>
        
        <div 
          className="bubble-menu-item item-3"
          onClick={() => handleMenuItemClick('Book')}
        >
          <div className="menu-icon">📚</div>
        </div>
        
        <div 
          className="bubble-menu-item item-4"
          onClick={() => handleMenuItemClick('Settings')}
        >
          <div className="menu-icon">⚙️</div>
        </div>
      </div>

      {/* Backdrop overlay */}
      <div 
        className={`bubble-backdrop ${isOpen ? 'visible' : ''}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Announcements Modal */}
      {showAnnouncements && (
        <div className="announcements-overlay" onClick={closeAnnouncements}>
          <div className="announcements-modal" onClick={(e) => e.stopPropagation()}>
            <div className="announcements-header">
              <h3>📢 Mahotsav Announcements</h3>
              <button className="close-announcements" onClick={closeAnnouncements}>×</button>
            </div>
            <div className="announcements-content">
              <div className="announcement-item">
                <h4>🎉 Registration Now Open!</h4>
                <p>Vignan Mahotsav 2026 registration is now live! Early bird discounts available until January 20th. Don't miss out on this spectacular celebration of innovation and culture.</p>
                <span className="announcement-date">Dec 15, 2025</span>
              </div>
              
              <div className="announcement-item">
                <h4>🏆 Prize Pool Increased!</h4>
                <p>We're excited to announce that our total prize pool has been increased to ₹15 Lakhs! More opportunities to win big in technical, cultural, and sports competitions.</p>
                <span className="announcement-date">Dec 10, 2025</span>
              </div>
              
              <div className="announcement-item">
                <h4>🎭 Celebrity Guest Artists</h4>
                <p>Renowned artists and performers will grace our cultural nights. Get ready for mesmerizing performances that will make Mahotsav 2026 unforgettable!</p>
                <span className="announcement-date">Dec 5, 2025</span>
              </div>
              
              <div className="announcement-item">
                <h4>🏨 Accommodation Booking Open</h4>
                <p>Book your stay now! Premium suites, guest houses, and hostel accommodations available. Special rates for early bookings and group reservations.</p>
                <span className="announcement-date">Nov 30, 2025</span>
              </div>
              
              <div className="announcement-item">
                <h4>🚀 New Event Categories Added</h4>
                <p>Exciting new competition categories including AI/ML Championships, Robotics Challenge, and Innovation Expo. Register now to participate!</p>
                <span className="announcement-date">Nov 25, 2025</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingBubble;