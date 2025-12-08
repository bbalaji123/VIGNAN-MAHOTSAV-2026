import React, { useState } from 'react';

const FloatingBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="floating-bubble-container">
      {/* Main floating button with Garuda logo */}
      <div 
        className={`floating-bubble ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <img 
          src={`${import.meta.env.BASE_URL}garuda.png`} 
          alt="Garuda" 
          className="garuda-logo"
        />
      </div>

      {/* Expandable menu items */}
      <div className={`bubble-menu ${isOpen ? 'expanded' : ''}`}>
        <button className="bubble-menu-item" style={{ transitionDelay: '0.1s' }}>
          Button 1
        </button>
        <button className="bubble-menu-item" style={{ transitionDelay: '0.05s' }}>
          Button 2
        </button>
        <button className="bubble-menu-item" style={{ transitionDelay: '0s' }}>
          Button 3
        </button>
      </div>

      {/* Backdrop overlay */}
      <div 
        className={`bubble-backdrop ${isOpen ? 'visible' : ''}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
};

export default FloatingBubble;