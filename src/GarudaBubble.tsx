import React, { useState } from 'react';

const GarudaBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 md:bottom-[30px] md:right-[30px] z-[9999] flex flex-col items-center gap-4">
      {/* Action Buttons */}
      <div className={`flex flex-col gap-3 absolute bottom-[70px] md:bottom-[85px] right-0 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <button 
          className={`w-[45px] h-[45px] md:w-[60px] md:h-[60px] rounded-full bg-white/95 border-2 border-amber-400 shadow-lg cursor-pointer flex items-center justify-center font-semibold text-[0.6rem] md:text-xs text-gray-800 transition-all duration-300 hover:bg-white hover:border-amber-400 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_8px_25px_rgba(251,191,36,0.5)] ${
            isOpen 
              ? 'opacity-100 translate-y-0 scale-100 animate-[slideUpBounce_0.5s_ease-out_0.3s_forwards]' 
              : 'opacity-0 translate-y-5 scale-50'
          }`}
        >
          <span className="text-center leading-tight p-1">Button 3</span>
        </button>
        <button 
          className={`w-[45px] h-[45px] md:w-[60px] md:h-[60px] rounded-full bg-white/95 border-2 border-amber-400 shadow-lg cursor-pointer flex items-center justify-center font-semibold text-[0.6rem] md:text-xs text-gray-800 transition-all duration-300 hover:bg-white hover:border-amber-400 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_8px_25px_rgba(251,191,36,0.5)] ${
            isOpen 
              ? 'opacity-100 translate-y-0 scale-100 animate-[slideUpBounce_0.5s_ease-out_0.2s_forwards]' 
              : 'opacity-0 translate-y-5 scale-50'
          }`}
        >
          <span className="text-center leading-tight p-1">Button 2</span>
        </button>
        <button 
          className={`w-[45px] h-[45px] md:w-[60px] md:h-[60px] rounded-full bg-white/95 border-2 border-amber-400 shadow-lg cursor-pointer flex items-center justify-center font-semibold text-[0.6rem] md:text-xs text-gray-800 transition-all duration-300 hover:bg-white hover:border-amber-400 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_8px_25px_rgba(251,191,36,0.5)] ${
            isOpen 
              ? 'opacity-100 translate-y-0 scale-100 animate-[slideUpBounce_0.5s_ease-out_0.1s_forwards]' 
              : 'opacity-0 translate-y-5 scale-50'
          }`}
        >
          <span className="text-center leading-tight p-1">Button 1</span>
        </button>
      </div>

      {/* Main Floating Bubble */}
      <button 
        className={`w-[55px] h-[55px] md:w-[70px] md:h-[70px] rounded-full bg-transparent border-none shadow-[0_8px_25px_rgba(0,0,0,0.2)] cursor-pointer flex items-center justify-center transition-all duration-400 relative overflow-visible hover:scale-110 hover:rotate-[10deg] hover:shadow-[0_12px_35px_rgba(0,0,0,0.3)] ${
          isOpen ? 'rotate-180' : ''
        }`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}garuda.png`} 
          alt="Garuda" 
          className={`w-[85%] h-[85%] object-contain transition-transform duration-400 ${isOpen ? 'scale-110' : ''}`}
        />
      </button>
    </div>
  );
};

export default GarudaBubble;
