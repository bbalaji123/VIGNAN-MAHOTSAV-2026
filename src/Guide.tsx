import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Guide.css';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';

const Guide: React.FC = () => {
  const navigate = useNavigate();

  const handleMapClick = () => {
    navigate('/campus-map');
  };

  const handleScheduleClick = () => {
    navigate('/schedule');
  };

  const handleContactsClick = () => {
    // Scroll to footer section with contact information
    navigate('/');
    setTimeout(() => {
      const footer = document.querySelector('footer');
      footer?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="guide-container">
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

      {/* Back Button */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50">
        <BackButton onClick={() => navigate('/')} />
      </div>

      {/* Garuda Logo */}
      <div className="fixed top-4 left-16 md:top-6 md:left-20 z-50">
        <img 
          src={`${import.meta.env.BASE_URL}Garuda.avif`}
          alt="Garuda" 
          className="guide-garuda-logo"
        />
      </div>

      {/* Mahotsav Logo - Bigger and Centered */}
      <div className="guide-logo-section">
        <img 
          src={`${import.meta.env.BASE_URL}image.avif`}
          alt="Mahotsav 2026" 
          className="guide-main-logo"
        />
      </div>

      {/* Centered Content: Date and Buttons */}
      <div className="guide-content-center">
        {/* Date Text - Between Logo and Buttons */}
        <div className="guide-date-middle">5 - 7 FEBRUARY 2025</div>

        {/* Three Buttons */}
        <div className="guide-action-buttons">
          <button className="guide-action-btn" onClick={handleMapClick}>
            MAP
          </button>
          <button className="guide-action-btn" onClick={handleScheduleClick}>
            SCHEDULE
          </button>
          <button className="guide-action-btn" onClick={handleContactsClick}>
            CONTACTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guide;
