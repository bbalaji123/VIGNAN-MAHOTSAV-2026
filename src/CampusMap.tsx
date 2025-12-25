import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './components/BackButton';
import FlowerComponent from './components/FlowerComponent';
import './Dashboard.css';

const CampusMap: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-x-hidden"
      style={{
        backgroundImage: 'url("/Background-redesign.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Floating Flower - Top Right */}
      <div className="fixed -top-32 -right-32 md:-top-64 md:-right-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-[1]">
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
      <div className="fixed -bottom-32 -left-32 md:-bottom-64 md:-left-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-[1]">
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

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .campus-title {
            font-family: 'Woodtrap', sans-serif !important;
          }
        `}
      </style>

      {/* Back Button */}
      <BackButton onClick={handleBackClick} />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-24 pb-10 
                      opacity-0 animate-[fadeInUp_0.8s_ease-out_0.05s_forwards] z-[2]">

        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="campus-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
            }}
          >
            CAMPUS BLUE PRINT
          </h1>

          <p className="mt-2 text-sm sm:text-base text-white/70 italic">
            Interactive campus blueprint — zoom, pan, and explore venue locations
          </p>
        </div>

        {/* 50 / 50 Image + Map — PERFECT CENTERING */}
        <div className="w-full max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6
                       place-items-center
                       min-h-[460px] md:min-h-[560px]"
          >
            {/* LEFT: Campus Image */}
            <img
              src={`${import.meta.env.BASE_URL}map.png`}
              alt="Campus Blueprint - Mahotsav 2025 Venue Locations"
              className="w-[85%] max-w-[600px] h-auto object-contain"
            />

            {/* RIGHT: Live Google Map */}
            <div
              className="w-[85%] max-w-[600px] h-[380px] md:h-[430px]
                         rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1uZxIpP4jFqgAqCDThH4ZWryPqkiR9Vc"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mahotsav 2025 Campus Map"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CampusMap;
