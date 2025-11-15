import React from 'react';
import './FloatingIcons.css';

const FloatingIcons: React.FC = () => {
  return (
    <div className="floating-icons-container">
      {/* Left floating icon - photo.png */}
      <div className="floating-icon left-icon">
        <img src={`${import.meta.env.BASE_URL}photo.png`} alt="Photo" className="icon-image" />
      </div>
      
      {/* Right floating icon - infinity.png */}
      <div className="floating-icon right-icon">
        <img src={`${import.meta.env.BASE_URL}infinity.png`} alt="Infinity" className="icon-image" />
      </div>
    </div>
  );
};

export default FloatingIcons;