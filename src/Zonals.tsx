import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './components/BackButton';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';

const Zonals: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleCityClick = (city: string) => {
    navigate(`/zonals/${city.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden" style={{
      backgroundImage: 'url("/Background-redesign.avif")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
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

      <style>
        {`
          @keyframes petalsRotateAnticlockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          
          @keyframes sunRotateClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Override global font for this page's h1 */
          h1.zonals-title {
            font-family: 'Woodtrap', sans-serif !important;
          }
        `}
      </style>

      {/* Back Button */}
      <BackButton onClick={handleBackClick} />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 lg:pt-8 pb-8 sm:pb-12">
        <h1 
          className="zonals-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 sm:mb-8 md:mb-10 text-white opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]"
          style={{
            fontFamily: 'Woodtrap, sans-serif !important',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
            letterSpacing: '0.1em'
          }}
        >
          ZONALS
        </h1>
        
        {/* City Cards Container */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-[1200px] w-full opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
          <div 
            onClick={() => handleCityClick('bangalore')} 
            className="bg-[rgba(184,147,189,0.7)] border-[3px] border-[rgba(198,142,107,0.8)] rounded-[20px] overflow-hidden min-w-[180px] w-[195px] sm:w-[240px] h-[260px] sm:h-[320px] flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-[5px] hover:translate-y-[-10px] hover:shadow-[0_10px_30px_rgba(184,147,189,0.5)] hover:bg-[rgba(184,147,189,0.85)] active:scale-95"
            style={{ touchAction: 'manipulation' }}
          >
            <img src="/zonals/BENGALURU.avif" alt="Bangalore" className="w-full h-full object-cover" />
          </div>
          <div 
            onClick={() => handleCityClick('vizag')}
            className="bg-[rgba(184,147,189,0.7)] border-[3px] border-[rgba(198,142,107,0.8)] rounded-[20px] overflow-hidden min-w-[180px] w-[195px] sm:w-[240px] h-[260px] sm:h-[320px] flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-[5px] hover:translate-y-[-10px] hover:shadow-[0_10px_30px_rgba(184,147,189,0.5)] hover:bg-[rgba(184,147,189,0.85)] active:scale-95"
            style={{ touchAction: 'manipulation' }}
          >
            <img src="/zonals/VIZAG.avif" alt="Vizag" className="w-full h-full object-cover" />
          </div>
          <div 
            onClick={() => handleCityClick('hyderabad')}
            className="bg-[rgba(184,147,189,0.7)] border-[3px] border-[rgba(198,142,107,0.8)] rounded-[20px] overflow-hidden min-w-[180px] w-[195px] sm:w-[240px] h-[260px] sm:h-[320px] flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-[5px] hover:translate-y-[-10px] hover:shadow-[0_10px_30px_rgba(184,147,189,0.5)] hover:bg-[rgba(184,147,189,0.85)] active:scale-95"
            style={{ touchAction: 'manipulation' }}
          >
            <img src="/zonals/HYDERABAD.avif" alt="Hyderabad" className="w-full h-full object-cover" />
          </div>
          <div 
            onClick={() => handleCityClick('tirupathi')}
            className="bg-[rgba(184,147,189,0.7)] border-[3px] border-[rgba(198,142,107,0.8)] rounded-[20px] overflow-hidden min-w-[180px] w-[195px] sm:w-[240px] h-[260px] sm:h-[320px] flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-[5px] hover:translate-y-[-10px] hover:shadow-[0_10px_30px_rgba(184,147,189,0.5)] hover:bg-[rgba(184,147,189,0.85)] active:scale-95"
            style={{ touchAction: 'manipulation' }}
          >
            <img src="/zonals/TIRUPATHI.avif" alt="Tirupati" className="w-full h-full object-cover" />
          </div>

          {/* Chennai Card */}
          <div 
            onClick={() => handleCityClick('chennai')}
            className="bg-[rgba(184,147,189,0.7)] border-[3px] border-[rgba(198,142,107,0.8)] rounded-[20px] overflow-hidden min-w-[180px] w-[195px] sm:w-[240px] h-[260px] sm:h-[320px] flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-[5px] hover:translate-y-[-10px] hover:shadow-[0_10px_30px_rgba(184,147,189,0.5)] hover:bg-[rgba(184,147,189,0.85)] active:scale-95"
            style={{ touchAction: 'manipulation' }}
          >
            <img src="/zonals/CHENNAI.avif" alt="Chennai" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zonals;
