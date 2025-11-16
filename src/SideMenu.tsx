import React, { useState } from 'react';
import './SideMenu.css';

interface SideMenuProps {
  onMenuClick: (category?: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuCategories = [
    { name: 'EVENTS', icon: '🎯' },
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
        className={`arrow-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        role="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <div className="arrow-icon">
          {isOpen ? '✕' : '☰'}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={handleOverlayClick}></div>}

      {/* Side Menu Panel */}
      <div className={`side-menu-panel ${isOpen ? 'open' : ''}`}>
        <div className="side-menu-header">
          <h2>Menu</h2>
        </div>
        <div className="side-menu-categories">
          {menuCategories.map((category) => (
            <div
              key={category.name}
              className="side-menu-item"
              onClick={() => handleCategoryClick(category.name)}
            >
              <span className="menu-item-icon">{category.icon}</span>
              <span className="menu-item-text">{category.name}</span>
            </div>
          ))}
        </div>
        <div className="side-menu-footer">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="sidebar-logo" />
        </div>
      </div>
    </>
  );
};

export default SideMenu;