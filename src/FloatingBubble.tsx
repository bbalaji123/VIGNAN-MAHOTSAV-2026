import React, { useState } from 'react';

const FloatingBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 md:bottom-[30px] md:right-[30px] z-[1000]">
      {/* Main floating button with Garuda logo */}
      <div 
        className={`w-[60px] h-[60px] md:w-[70px] md:h-[70px] bg-gradient-to-br from-amber-400 to-amber-500 border-[3px] border-blue-900 rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(251,191,36,0.5)] transition-all duration-300 relative overflow-hidden z-[1002] hover:scale-110 hover:shadow-[0_6px_25px_rgba(251,191,36,0.7)] ${
          isOpen 
            ? 'rotate-180 scale-110 shadow-[0_6px_25px_rgba(251,191,36,0.7)]' 
            : 'animate-[pulse_2s_infinite]'
        }`}
        onClick={toggleMenu}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}garuda.png`} 
          alt="Garuda" 
          className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] object-contain transition-transform duration-300"
        />
      </div>

      {/* Expandable menu items */}
      <div className={`absolute bottom-[70px] md:bottom-[80px] right-0 w-[60px] md:w-[70px] flex flex-col gap-3 md:gap-4 items-center ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <button 
          className={`w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-black/70 rounded-full flex items-center justify-center cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.3)] border-2 border-white/20 transition-all duration-400 text-white text-sm hover:scale-110 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-200 hover:shadow-[0_8px_25px_rgba(255,215,0,0.4)] hover:text-black ${
            isOpen 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-5 scale-0'
          }`}
          style={{ transitionDelay: '0.1s', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          Button 1
        </button>
        <button 
          className={`w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-black/70 rounded-full flex items-center justify-center cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.3)] border-2 border-white/20 transition-all duration-400 text-white text-sm hover:scale-110 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-200 hover:shadow-[0_8px_25px_rgba(255,215,0,0.4)] hover:text-black ${
            isOpen 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-5 scale-0'
          }`}
          style={{ transitionDelay: '0.05s', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          Button 2
        </button>
        <button 
          className={`w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-black/70 rounded-full flex items-center justify-center cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.3)] border-2 border-white/20 transition-all duration-400 text-white text-sm hover:scale-110 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-200 hover:shadow-[0_8px_25px_rgba(255,215,0,0.4)] hover:text-black ${
            isOpen 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-5 scale-0'
          }`}
          style={{ transitionDelay: '0s', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          Button 3
        </button>
      </div>

      {/* Backdrop overlay */}
      <div 
        className={`fixed top-0 left-0 w-screen h-screen bg-black/30 backdrop-blur-sm -z-10 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />
    </div>
  );
};

export default FloatingBubble;
