import React, { useState } from 'react';

const FloatingBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="floating-bubble-container">
      {/* Main floating button */}
      <div 
        className={`floating-bubble ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
      </div>

      {/* Expandable menu items */}
      <div className={`bubble-menu ${isOpen ? 'expanded' : ''}`}>
        {/* Menu items removed */}
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