import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './components/BackButton';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';

const Sponsors: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/?menu=true');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden" style={{
      backgroundImage: 'url("/images/Background.png")',
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
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 sm:mb-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]" style={{
        background: 'linear-gradient(135deg, #fdee71, #e48ab9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: '0 0 30px rgba(253, 238, 113, 0.3)'          

      }}>SPONSORS</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-7xl px-4">
        {[1, 2, 3, 4].flatMap(imgNum =>
          Array.from({ length: 9 }).map((_, i) => ({ imgNum, index: i }))
        ).map(({ imgNum, index }, uniqueId) => (
          <div
            key={`${imgNum}-${index}`}
            className="group relative aspect-square rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 ease-out bg-white shadow-lg border border-white/20"
            style={{
              animation: `fadeInUp 0.8s ease-out ${0.1 + uniqueId * 0.05}s forwards`,
              opacity: 0
            }}
          >
            <div
              className="w-full h-full transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url('/${imgNum}.jpeg')`,
                backgroundSize: '900% 100%',
                backgroundPosition: `${(index / 8) * 100}% center`,
                backgroundRepeat: 'no-repeat'
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
              <p className="text-white text-xs text-center font-medium">Partner</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
