import React, { useState } from 'react';

interface SideMenuProps {
  onMenuClick: (category?: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuCategories = [
    { name: 'EVENTS', icon: '🎯' },
    { name: 'ABOUT US', icon: 'ℹ️' },
    { name: 'SCHEDULE', icon: '📅' },
    { name: 'COLLABORATION', icon: '🤝' },
    { name: 'ZONALS', icon: '🌍' },
    { name: 'HOSPITALITY', icon: '🏨' },
    { name: 'CERTIFICATES', icon: '🏆' },
    { name: 'MAP', icon: '🗺️' },
    { name: 'CAMPUS AMBASSADOR', icon: '👥' }
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
      {/* Menu toggle button */}
      <div
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/30 hover:scale-110 active:scale-95 overflow-visible ${isOpen ? 'active' : ''}`}
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
          className={`h-full w-72 md:w-80 bg-black/80 text-white backdrop-blur-md shadow-2xl transition-all duration-700 ease-out rounded-r-[50px] ${
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
          <div className="p-6 md:p-8">
            <div className="mb-6 md:mb-8 border-b border-white/20 pb-4 md:pb-6">
              <h2 className="text-xl md:text-2xl font-bold text-amber-400">Menu</h2>
            </div>
            <div className="space-y-3 md:space-y-4">
              {menuCategories.map((category, index) => (
                <div
                  key={category.name}
                  className={`flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/10 hover:translate-x-2 group ${
                    isOpen ? 'animate-[menuItemSlideIn_0.5s_ease-out_forwards]' : 'opacity-0 -translate-x-5'
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                  <span className="font-medium text-xs md:text-sm tracking-wide">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8">
              <img 
                src={`${import.meta.env.BASE_URL}logo.png`} 
                alt="Logo" 
                className="w-12 h-12 md:w-16 md:h-16 mx-auto opacity-80 hover:scale-110 transition-transform duration-300" 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
