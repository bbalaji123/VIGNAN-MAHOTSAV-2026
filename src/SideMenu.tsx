import React, { useState } from 'react';\nimport './SideMenu.css';

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
        className={`hamburger-container fixed left-4 top-1/2 transform -translate-y-1/2 z-50 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/30 hover:scale-110 active:scale-95 ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        role="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <div className="hamburger-icon">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={handleOverlayClick}></div>}

      {/* Side Menu Panel */}
      <div className="fixed left-0 top-0 h-full z-50">
        <div className={`menu-panel h-full w-80 bg-black/80 text-white transform transition-all duration-700 ease-out backdrop-blur-md shadow-2xl ${isOpen ? 'menu-open translate-x-0' : 'menu-closed -translate-x-full'}`}
             style={{
               clipPath: isOpen ? 'ellipse(150% 100% at 0% 50%)' : 'ellipse(0% 100% at 0% 50%)',
               borderRadius: '0 50px 50px 0'
             }}>
          <div className="p-8">
            <div className="mb-8 border-b border-white/20 pb-6">
              <h2 className="text-2xl font-bold text-mahotsav-gold-400">Menu</h2>
            </div>
            <div className="space-y-4">
              {menuCategories.map((category, index) => (
                <div
                  key={category.name}
                  className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/10 hover:translate-x-2 group"
                  onClick={() => handleCategoryClick(category.name)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                  <span className="font-medium text-sm tracking-wide">{category.name}</span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="w-16 h-16 mx-auto opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;