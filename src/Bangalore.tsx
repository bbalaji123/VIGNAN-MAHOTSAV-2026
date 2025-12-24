import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';

const Bangalore: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/zonals');
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
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Back Button */}
      <button 
        onClick={handleBackClick} 
        className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[1000] min-h-[48px] px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-[50px] font-semibold cursor-pointer transition-all duration-300 border-none uppercase text-sm sm:text-base active:scale-95" 
        style={{
          background: 'linear-gradient(135deg, #e48ab9, #c96ba1)',
          color: '#fff',
          boxShadow: '0 5px 15px rgba(228, 138, 185, 0.4)',
          touchAction: 'manipulation'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(228, 138, 185, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 5px 15px rgba(228, 138, 185, 0.4)';
        }}
        aria-label="Go back"
      >
        BACK
      </button>

      <div className="relative z-10 min-h-screen px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mt-6 sm:mt-8 md:mt-12 mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4"
            style={{
              fontFamily: 'Cinzel Decorative, serif',
              textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
              letterSpacing: '0.15em'
            }}
          >
            BANGALORE
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white italic"
            style={{
              fontFamily: 'Cinzel Decorative, serif',
              letterSpacing: '0.05em'
            }}
          >
            (1-2 DEC,2025)
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 sm:gap-12 max-w-[1400px] mx-auto">
          {/* Left Card */}
          <div className="bg-[rgba(184,147,189,0.7)] border-[3px] border-[rgba(198,142,107,0.8)] rounded-[20px] p-12 sm:p-16 lg:p-20 min-w-[220px] w-full sm:w-[280px] h-[250px] sm:h-[300px] flex items-center justify-center backdrop-blur-[5px] mx-auto lg:mx-0 lg:flex-shrink-0">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black lowercase">bangalore</span>
          </div>

          {/* Events Table */}
          <div className="flex-1 w-full max-w-[600px] mx-auto lg:mx-0">
            <div className="bg-[rgba(82,37,102,0.3)] border-2 border-dashed border-white/50 rounded-lg p-6 sm:p-8 lg:p-10 backdrop-blur-[10px]">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-6 sm:mb-8 uppercase tracking-wider">
                ZONAL EVENTS (MEN)
              </h3>
              <div className="flex flex-col md:flex-row gap-8 sm:gap-12 text-white">
                {/* Sports Column */}
                <div className="flex flex-col gap-4 min-w-[150px]">
                  <div className="flex flex-col py-4 border-b border-white/30">
                    <div className="font-bold text-base sm:text-lg mb-1">Volley ball</div>
                    <div className="text-sm sm:text-base">(6+4)</div>
                  </div>
                  <div className="flex flex-col py-4 border-b border-white/30">
                    <div className="font-bold text-base sm:text-lg mb-1">Basket ball</div>
                    <div className="text-sm sm:text-base">(5+5)</div>
                  </div>
                  <div className="flex flex-col py-4">
                    <div className="font-bold text-base sm:text-lg mb-1">Kabaddi</div>
                    <div className="text-sm sm:text-base">(7+3)</div>
                  </div>
                </div>

                {/* Prizes Section */}
                <div className="flex-1 flex flex-col">
                  <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-4 font-bold text-sm sm:text-base text-center">
                    <div></div>
                    <div>Zone<br/>Winners</div>
                    <div>Mahotsav<br/>Winners</div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-3 gap-4 sm:gap-8 text-sm sm:text-base text-center">
                      <div className="font-semibold text-left">I Prize :</div>
                      <div>10,000</div>
                      <div>30,000</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 sm:gap-8 text-sm sm:text-base text-center">
                      <div className="font-semibold text-left">II Prize :</div>
                      <div>6,000</div>
                      <div>25,000</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 sm:gap-8 text-sm sm:text-base text-center">
                      <div className="font-semibold text-left">III Prize :</div>
                      <div>-</div>
                      <div>7,000</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 sm:gap-8 text-sm sm:text-base text-center">
                      <div className="font-semibold text-left">IV Prize :</div>
                      <div>-</div>
                      <div>3,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hosting Partner */}
          <div className="flex flex-col items-center gap-4 mx-auto lg:mx-0 lg:flex-shrink-0">
            <div className="text-sm sm:text-base font-semibold text-white uppercase tracking-widest">
              HOSTING PARTNER
            </div>
            <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full bg-white/90 flex items-center justify-center p-4 shadow-[0_5px_20px_rgba(0,0,0,0.3)]">
              <img src={`${import.meta.env.BASE_URL}dayananda.svg`} alt="Dayananda Sagar College" className="w-full h-full object-contain" />
            </div>
            <div className="text-base sm:text-lg lg:text-xl font-bold text-white text-center max-w-[200px] leading-tight">
              Dayananda Sagar<br/>College of Engineering
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="max-w-[1200px] mx-auto mt-12 sm:mt-16 text-center text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-8">
          <strong>Note : </strong>The semi finalists of each zone will be promoted to higher level rounds during 
          Vignan Mahotsav 2026 organised from 5 - 7 Feb, 2026 at Guntur, Andhra Pradesh.
        </div>

        {/* Register Button */}
        <button 
          className="block mx-auto mt-8 sm:mt-12 min-h-[48px] px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-[50px] font-semibold text-base sm:text-lg cursor-pointer transition-all duration-300 border-none uppercase active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #e48ab9, #c96ba1)',
            color: '#fff',
            boxShadow: '0 5px 15px rgba(228, 138, 185, 0.4)',
            touchAction: 'manipulation'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(228, 138, 185, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(228, 138, 185, 0.4)';
          }}
        >
          CLICK HERE TO REGISTER
        </button>
      </div>
    </div>
  );
};

export default Bangalore;
