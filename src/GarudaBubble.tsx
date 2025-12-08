import React, { useState } from 'react';
import './GarudaBubble.css';

const GarudaBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="garuda-bubble-container">
      {/* Action Buttons */}
      <div className={`garuda-action-buttons ${isOpen ? 'open' : ''}`}>
        <button className="garuda-action-btn garuda-btn-3">
          <span>Button 3</span>
        </button>
        <button className="garuda-action-btn garuda-btn-2">
          <span>Button 2</span>
        </button>
        <button className="garuda-action-btn garuda-btn-1">
          <span>Button 1</span>
        </button>
      </div>

      {/* Main Floating Bubble */}
      <button 
        className={`garuda-main-bubble ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <img src={`${import.meta.env.BASE_URL}garuda.png`} alt="Garuda" />
      </button>
    </div>
  );
};

export default GarudaBubble;
