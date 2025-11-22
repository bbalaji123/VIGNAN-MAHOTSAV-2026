import React, { useState, useEffect } from 'react';

const FloatingIcons: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Hide icons when scrolled past 50% of the first viewport
      if (scrollY > viewportHeight * 0.5) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`floating-icons-container ${isVisible ? 'visible' : 'hidden'}`}>
      {/* Top left lotus logo */}
      <div className="floating-icon top-left-icon">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Lotus Logo" className="icon-image" />
      </div>
      
      {/* Top right infinity */}
      <div className="floating-icon top-right-icon">
        <img src={`${import.meta.env.BASE_URL}infinity.png`} alt="Infinity" className="icon-image" />
      </div>
      
      {/* Middle left lotus */}
      <div className="floating-icon middle-left-icon">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Lotus Logo" className="icon-image" />
      </div>
      
      {/* Bottom right photo icon */}
      <div className="floating-icon bottom-right-icon">
        <img src={`${import.meta.env.BASE_URL}photo.png`} alt="Photo" className="icon-image" />
      </div>
      
      {/* Bottom left flower */}
      <div className="floating-icon bottom-left-flower">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Lotus Logo" className="icon-image" />
      </div>
    </div>
  );
};

export default FloatingIcons;