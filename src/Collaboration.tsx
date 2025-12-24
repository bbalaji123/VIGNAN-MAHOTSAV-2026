import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './components/BackButton';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';

const Collaboration: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
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

          /* Mobile-first responsive styles handled by Tailwind classes in JSX */
        `}
      </style>

      {/* Back Button */}
      <BackButton onClick={handleBackClick} />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 sm:mb-8 md:mb-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]" style={{
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
          fontFamily: 'Woodtrap, sans-serif'
        }}>COLLABORATION</h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-white mb-4 sm:mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]" style={{
          textShadow: '0 0 20px rgba(251, 191, 36, 0.6)',
          fontFamily: 'Woodtrap, sans-serif'
        }}>A New Treasure Awaits...</h2>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]" style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontFamily: 'Woodtrap, sans-serif'
        }}>Coming Soon to the Seven Seas!</p>
      </div>
    </div>
  );
};

export default Collaboration;
