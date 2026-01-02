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
    <div 
      className={`fixed top-0 left-0 w-screen h-screen pointer-events-none z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`}
    >
      {/* Top left lotus logo */}
      <div className="absolute top-[12%] md:top-[15%] left-[4%] md:left-[8%] w-[45px] h-[45px] md:w-[80px] md:h-[80px] flex items-center justify-center transition-all duration-300 animate-[gentleFloat_4s_ease-in-out_infinite] hover:scale-110">
        <img 
          src={`/images/logo.png`} 
          alt="Lotus Logo" 
          className="w-full h-full object-contain opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-110" 
        />
      </div>
      
      {/* Top right infinity */}
      <div className="absolute top-[14%] md:top-[15%] right-[6%] md:right-[15%] w-[45px] h-[45px] md:w-[80px] md:h-[80px] flex items-center justify-center transition-all duration-300 animate-[gentleFloat_4s_ease-in-out_infinite_1s] hover:scale-110">
        <img 
          src="/images/infinity.png" 
          alt="Infinity" 
          className="w-full h-full object-contain opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-110" 
        />
      </div>
      
      {/* Middle left lotus */}
      <div className="absolute top-[40%] md:top-[45%] left-[2%] md:left-[25%] -translate-y-1/2 w-[45px] h-[45px] md:w-[80px] md:h-[80px] flex items-center justify-center transition-all duration-300 animate-[gentleFloat_4s_ease-in-out_infinite_2s] hover:scale-110">
        <img 
          src={`/images/logo.png`} 
          alt="Lotus Logo" 
          className="w-full h-full object-contain opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-110" 
        />
      </div>
      
      {/* Bottom right photo icon */}
      <div className="absolute bottom-[12%] md:bottom-[45%] right-[5%] md:right-[10%] w-[45px] h-[45px] md:w-[80px] md:h-[80px] flex items-center justify-center transition-all duration-300 animate-[gentleFloat_4s_ease-in-out_infinite_3s] hover:scale-110">
        <img 
          src="/images/photo.png" 
          alt="Photo" 
          className="w-full h-full object-contain opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-110" 
        />
      </div>
      
      {/* Bottom left flower */}
      <div className="absolute bottom-[8%] left-[4%] md:left-[8%] w-[45px] h-[45px] md:w-[80px] md:h-[80px] flex items-center justify-center transition-all duration-300 animate-[gentleFloat_4s_ease-in-out_infinite_4s] hover:scale-110">
        <img 
          src={`/images/logo.png`} 
          alt="Lotus Logo" 
          className="w-full h-full object-contain opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-110" 
        />
      </div>
    </div>
  );
};

export default FloatingIcons;
