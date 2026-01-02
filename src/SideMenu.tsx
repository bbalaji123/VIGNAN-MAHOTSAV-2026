import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';

interface SideMenuProps {
  onMenuClick: (category?: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on a page where back button should be shown
  const showBackButton = location.pathname !== '/';

  const menuCategories = [
    { name: 'EVENTS', icon: '/menu-dashboard/events.svg' },
    { name: 'ABOUT US', icon: '/menu-dashboard/team.svg' },
    { name: 'SCHEDULE', icon: '/menu-dashboard/Schedule.svg' },
    { name: 'COLLABORATION', icon: '/menu-dashboard/collaboration.svg' },
    { name: 'ZONALS', icon: '/menu-dashboard/zonals.svg' },
    { name: 'HOSPITALITY', icon: '/menu-dashboard/hospitality.svg' },
    { name: 'CERTIFICATES', icon: '/menu-dashboard/home.svg' },
    { name: 'MAP', icon: '/menu-dashboard/17.svg' },
    { name: 'CAMPUS AMBASSADOR', icon: '/menu-dashboard/campus ambassador.svg' }
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
      {window.innerWidth >= 640 && (
        <div className="fixed pointer-events-none side-menu-flower-top" style={{
          top: window.innerWidth < 640 ? '-6rem' : '-8rem',
          right: window.innerWidth < 640 ? '-6rem' : '-8rem',
          width: window.innerWidth < 640 ? '12rem' : '16rem',
          height: window.innerWidth < 640 ? '12rem' : '16rem',
          zIndex: 0
        }}>
          <FlowerComponent
            size="100%"
            sunSize="50%"
            moonSize="43%"
            sunTop="25%"
            sunLeft="25%"
            moonTop="28.5%"
            moonLeft="28.5%"
            showPetalRotation={true}
            opacity={window.innerWidth < 640 ? 0.01 : window.innerWidth < 1024 ? 0.02 : 0.04}
          />
        </div>
      )}

      {/* Floating Flower - Bottom Left */}
      {window.innerWidth >= 640 && (
        <div className="fixed pointer-events-none side-menu-flower-bottom" style={{
          bottom: window.innerWidth < 640 ? '-6rem' : '-2rem',
          left: window.innerWidth < 640 ? '-6rem' : '-8rem',
          width: window.innerWidth < 640 ? '12rem' : '16rem',
          height: window.innerWidth < 640 ? '12rem' : '16rem',
          zIndex: 0
        }}>
          <FlowerComponent
            size="100%"
            sunSize="50%"
            moonSize="43%"
            sunTop="25%"
            sunLeft="25%"
            moonTop="28.5%"
            moonLeft="28.5%"
            showPetalRotation={true}
            opacity={window.innerWidth < 640 ? 0.01 : window.innerWidth < 1024 ? 0.02 : 0.04}
          />
        </div>
      )}

      {/* Menu toggle button */}
      <div
        className={`fixed left-2 xs:left-3 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/30 hover:scale-110 active:scale-95 overflow-visible touch-manipulation ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        role="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <div className="w-4 h-[13px] xs:w-5 xs:h-[15px] sm:w-6 sm:h-[18px] relative flex flex-col justify-between cursor-pointer">
          <span
            className={`w-full h-[2px] xs:h-[2.5px] sm:h-[3px] bg-yellow-400 rounded-sm transition-all duration-300 origin-center shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${isOpen ? 'translate-y-[5.5px] xs:translate-y-[6px] sm:translate-y-[7.5px] rotate-45' : ''
              }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)' }}
          />
          <span
            className={`w-full h-[2px] xs:h-[2.5px] sm:h-[3px] bg-yellow-400 rounded-sm transition-all duration-300 origin-center shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${isOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)' }}
          />
          <span
            className={`w-full h-[2px] xs:h-[2.5px] sm:h-[3px] bg-yellow-400 rounded-sm transition-all duration-300 origin-center shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${isOpen ? '-translate-y-[5.5px] xs:-translate-y-[6px] sm:-translate-y-[7.5px] -rotate-45' : ''
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
          className={`h-full w-52 xs:w-56 sm:w-64 md:w-72 lg:w-80 bg-black/80 text-white backdrop-blur-md shadow-2xl transition-all duration-700 ease-out rounded-r-xl xs:rounded-r-2xl sm:rounded-r-3xl md:rounded-r-[50px] relative z-50 ${isOpen
            ? 'translate-x-0 opacity-100 animate-[menuSlideRotate_0.7s_cubic-bezier(0.25,0.46,0.45,0.94)]'
            : '-translate-x-full opacity-0'
            }`}
          style={{
            clipPath: isOpen ? 'ellipse(150% 100% at 0% 50%)' : 'ellipse(0% 100% at 0% 50%)',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
        >
          <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8">
            <div className="mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8 border-b border-white/20 pb-2 xs:pb-3 sm:pb-4 md:pb-5 lg:pb-6 relative z-50">
              <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-amber-400" style={{ fontFamily: 'Aladin, cursive' }}>MENU</h2>
            </div>

            {/* Back Button */}
            {showBackButton && (
              <div className="mb-3 xs:mb-4">
                <BackButton
                  className="!static !top-auto !left-auto"
                  onClick={() => {
                    setIsOpen(false);
                    navigate(-1);
                  }}
                />
              </div>
            )}

            <div className="space-y-1.5 xs:space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4">
              {menuCategories.map((category, index) => (
                <div
                  key={category.name}
                  className={`flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 p-1.5 xs:p-2 sm:p-2.5 md:p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/10 hover:translate-x-2 group touch-manipulation active:scale-95 ${isOpen ? 'animate-[menuItemSlideIn_0.5s_ease-out_forwards]' : 'opacity-0 -translate-x-5'
                    }`}
                  onClick={() => handleCategoryClick(category.name)}
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${category.icon}`}
                    alt={category.name}
                    className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-300 object-contain flex-shrink-0"
                  />
                  <span className="font-medium text-[2rem] xs:text-[2.95rem] sm:text-sm md:text-base tracking-wide" style={{ fontFamily: 'coffee+tea demo, sans-serif' }}>
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-3 xs:left-4 sm:left-5 md:left-6 lg:left-8 right-3 xs:right-4 sm:right-5 md:right-6 lg:right-8">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-8 h-8 xs:w-10 xs:h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-16 lg:h-16 mx-auto opacity-80 hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
