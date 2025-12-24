import React, { useState } from 'react';
import FlowerComponent from './components/FlowerComponent';

interface SideMenuProps {
  onMenuClick: (category?: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuCategories = [
    { name: 'EVENTS', icon: '/events.svg' },
    { name: 'ABOUT US', icon: '/team.svg' },
    { name: 'SCHEDULE', icon: '/Schedule.svg' },
    { name: 'COLLABORATION', icon: '/collaboration.svg' },
    { name: 'ZONALS', icon: '/zonals.svg' },
    { name: 'HOSPITALITY', icon: '/hospitality.svg' },
    { name: 'CERTIFICATES', icon: '/home.svg' },
    { name: 'MAP', icon: '/17.svg' },
    { name: 'CAMPUS AMBASSADOR', icon: '/campus ambassador.svg' }
  ];

  const handleCategoryClick = (category: string) => {
    onMenuClick(category);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Flower - Top Right */}
      <div className="fixed -top-20 -right-20 sm:-top-32 sm:-right-32 md:-top-64 md:-right-64 pointer-events-none w-40 h-40 sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-[1]">
        <FlowerComponent 
          size="100%"
          sunSize="50%"
          moonSize="43%"
          sunTop="25%"
          sunLeft="25%"
          moonTop="28.5%"
          moonLeft="28.5%"
          showPetalRotation={true}
        />
      </div>

      {/* Floating Flower - Bottom Left */}
      <div className="fixed -bottom-20 -left-20 sm:-bottom-32 sm:-left-32 md:-bottom-64 md:-left-64 pointer-events-none w-40 h-40 sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-[1]">
        <FlowerComponent 
          size="100%"
          sunSize="50%"
          moonSize="43%"
          sunTop="25%"
          sunLeft="25%"
          moonTop="28.5%"
          moonLeft="28.5%"
          showPetalRotation={true}
        />
      </div>

      {/* Menu toggle button */}
      <div
        className={`fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/30 hover:scale-110 active:scale-95 overflow-visible touch-manipulation ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        role="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <div className="w-6 h-[18px] relative flex flex-col justify-between cursor-pointer">
          <span 
            className={`w-full h-[3px] bg-yellow-400 rounded-sm transition-all duration-300 origin-center shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${
              isOpen ? 'translate-y-[7.5px] rotate-45' : ''
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)' }}
          />
          <span 
            className={`w-full h-[3px] bg-yellow-400 rounded-sm transition-all duration-300 origin-center shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${
              isOpen ? 'opacity-0 scale-x-0' : ''
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)' }}
          />
          <span 
            className={`w-full h-[3px] bg-yellow-400 rounded-sm transition-all duration-300 origin-center shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${
              isOpen ? '-translate-y-[7.5px] -rotate-45' : ''
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)' }}
          />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" 
          onClick={handleOverlayClick}
        />
      )}

      {/* Side Menu Panel */}
      <div className="fixed left-0 top-0 h-full z-50">
        <div 
          className={`h-full w-64 sm:w-72 md:w-80 bg-black/80 text-white backdrop-blur-md shadow-2xl transition-all duration-700 ease-out rounded-r-[30px] sm:rounded-r-[50px] ${
            isOpen 
              ? 'translate-x-0 opacity-100 animate-[menuSlideRotate_0.7s_cubic-bezier(0.25,0.46,0.45,0.94)]' 
              : '-translate-x-full opacity-0'
          }`}
          style={{
            clipPath: isOpen ? 'ellipse(150% 100% at 0% 50%)' : 'ellipse(0% 100% at 0% 50%)',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
        >
          <div className="p-4 sm:p-6 md:p-8">
            <div className="mb-4 sm:mb-6 md:mb-8 border-b border-white/20 pb-3 sm:pb-4 md:pb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-400">Menu</h2>
            </div>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {menuCategories.map((category, index) => (
                <div
                  key={category.name}
                  className={`flex items-center gap-3 md:gap-4 p-2.5 sm:p-2 md:p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/10 hover:translate-x-2 group touch-manipulation ${
                    isOpen ? 'animate-[menuItemSlideIn_0.5s_ease-out_forwards]' : 'opacity-0 -translate-x-5'
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}${category.icon}`}
                    alt={category.name}
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform duration-300 object-contain flex-shrink-0"
                  />
                  <span className="font-medium text-xs sm:text-xs md:text-sm tracking-wide">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8">
              <img 
                src={`${import.meta.env.BASE_URL}logo.png`} 
                alt="Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto opacity-80 hover:scale-110 transition-transform duration-300" 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
