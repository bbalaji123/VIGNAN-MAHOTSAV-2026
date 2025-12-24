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
      backgroundImage: 'url("/Background-redesign.png")',
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
        `}
      </style>

      {/* Back Button */}
      <BackButton onClick={handleBackClick} />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start min-h-[80vh] px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-12">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 md:mb-20 text-white opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]"
          style={{
            fontFamily: 'Cinzel Decorative, serif',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
            letterSpacing: '0.1em'
          }}
        >
          ZONALS
        </h1>
        
        {/* City Cards Container */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-[1400px] w-full opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
          <div 
            onClick={() => handleCityClick('bangalore')} 
            className="bg-[rgba(184,147,189,0.7)] border-[3px] border-[rgba(198,142,107,0.8)] rounded-[20px] p-12 sm:p-16 lg:p-24 min-w-[200px] w-[240px] sm:w-[280px] h-[250px] sm:h-[300px] flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-[5px] hover:translate-y-[-10px] hover:shadow-[0_10px_30px_rgba(184,147,189,0.5)] hover:bg-[rgba(184,147,189,0.85)] active:scale-95"
            style={{ touchAction: 'manipulation' }}
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black text-center lowercase">bangalore</span>
          </div>
          <div 
            className="bg-[rgba(184,147,189,0.7)] border-[3px] border-[rgba(198,142,107,0.8)] rounded-[20px] p-12 sm:p-16 lg:p-24 min-w-[200px] w-[240px] sm:w-[280px] h-[250px] sm:h-[300px] flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-[5px] hover:translate-y-[-10px] hover:shadow-[0_10px_30px_rgba(184,147,189,0.5)] hover:bg-[rgba(184,147,189,0.85)] active:scale-95"
            style={{ touchAction: 'manipulation' }}
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black text-center lowercase">vizag</span>
          </div>
          <div 
            className="bg-[rgba(184,147,189,0.7)] border-[3px] border-[rgba(198,142,107,0.8)] rounded-[20px] p-12 sm:p-16 lg:p-24 min-w-[200px] w-[240px] sm:w-[280px] h-[250px] sm:h-[300px] flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-[5px] hover:translate-y-[-10px] hover:shadow-[0_10px_30px_rgba(184,147,189,0.5)] hover:bg-[rgba(184,147,189,0.85)] active:scale-95"
            style={{ touchAction: 'manipulation' }}
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black text-center lowercase">hyderabad</span>
          </div>
          <div 
            className="bg-[rgba(184,147,189,0.7)] border-[3px] border-[rgba(198,142,107,0.8)] rounded-[20px] p-12 sm:p-16 lg:p-24 min-w-[200px] w-[240px] sm:w-[280px] h-[250px] sm:h-[300px] flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-[5px] hover:translate-y-[-10px] hover:shadow-[0_10px_30px_rgba(184,147,189,0.5)] hover:bg-[rgba(184,147,189,0.85)] active:scale-95"
            style={{ touchAction: 'manipulation' }}
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black text-center lowercase">tirupati</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zonals;
