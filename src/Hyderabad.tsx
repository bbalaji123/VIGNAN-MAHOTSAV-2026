import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './components/BackButton';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';

const Hyderabad: React.FC = () => {
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
      <div className="fixed -top-32 -right-32 md:-top-64 md:-right-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-1000 z-[1]">
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
      <div className="fixed -bottom-32 -left-32 md:-bottom-64 md:-left-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-750 z-[1]">
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

          /* Font overrides for this page */
          .Hyderabad-title {
            font-family: 'Woodtrap', sans-serif !important;
          }

          .Hyderabad-content,
          .Hyderabad-content *,
          .Hyderabad-content h1,
          .Hyderabad-content h2,
          .Hyderabad-content h3,
          .Hyderabad-content h4,
          .Hyderabad-content h5,
          .Hyderabad-content h6,
          .Hyderabad-content div,
          .Hyderabad-content span {
            font-family: 'arial', sans-serif !important;
          }
        `}
      </style>

      {/* Back Button */}
      <BackButton onClick={handleBackClick} />

      <div className="relative z-10 min-h-screen px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex flex-col justify-center items-center">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="Hyderabad-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4"
            style={{
              textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
              letterSpacing: '0.15em',
              paddingTop: '20px'
            }}
          >
            Hyderabad
          </h1>
          <p className="Hyderabad-content text-xl sm:text-2xl md:text-3xl text-white italic"
            style={{
              letterSpacing: '0.05em',
              paddingBottom: '20px',
              paddingTop: '10px'
            }}
          >
            (5-6 DEC,2025)
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 sm:gap-12 max-w-[1400px] mx-auto">
          {/* Left Card */}
          <div 
            className="bg-[rgba(184,147,189,0.7)] border-[3px] border-[rgba(198,142,107,0.8)] rounded-[20px] overflow-hidden flex items-center justify-center backdrop-blur-[5px] mx-auto lg:mx-0 lg:flex-shrink-0"
            style={{
              minWidth: '180px',
              width: '300px',
              height: '400px',
            }}
          >
            <img src="/zonals/HYDERABAD.avif" alt="Hyderabad" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Events Table */}
          <div className="flex-1 w-full max-w-[600px] mx-auto lg:mx-0">
            <div className="Hyderabad-content bg-[rgba(82,37,102,0.3)] border-2 border-dashed border-white/50 rounded-lg backdrop-blur-[10px] p-4 sm:p-6 md:p-8 lg:p-10" style={{ minHeight: '400px', width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center uppercase tracking-wider" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important', marginTop: '20px', marginBottom: '40px' }}>
                ZONAL EVENTS (MEN)
              </h3>
              <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:gap-8 lg:gap-12 text-white" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important' }}>
                {/* Sports Column */}
                <div className="flex flex-col gap-2 sm:gap-3 min-w-[100px] sm:min-w-[120px] md:min-w-[150px]">
                  <div className="flex flex-col py-2 sm:py-3 border-b border-white/30">
                    <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-1" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important', marginLeft: '10px' }}>Volley ball</div>
                    <div className="text-xs sm:text-sm md:text-base lg:text-lg" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important', marginLeft: '10px' }}>(6+4)</div>
                  </div>
                  <div className="flex flex-col py-2 sm:py-3 border-b border-white/30">
                    <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-1" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important', marginLeft: '10px' }}>Basket ball</div>
                    <div className="text-xs sm:text-sm md:text-base lg:text-lg" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important', marginLeft: '10px' }}>(5+5)</div>
                  </div>
                  <div className="flex flex-col py-2 sm:py-3">
                    <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-1" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important', marginLeft: '10px' }}>Football</div>
                    <div className="text-xs sm:text-sm md:text-base lg:text-lg" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important', marginLeft: '10px', marginBottom: '10px' }}>(7+3)</div>
                  </div>
                </div>

                {/* Prizes Section */}
                <div className="flex-1 flex flex-col">
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 lg:gap-8 mb-2 sm:mb-3 font-bold text-xs sm:text-sm md:text-base lg:text-lg text-center" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important' }}>
                    <div></div>
                    <div>Zone<br/>Winners</div>
                    <div>Mahotsav<br/>Winners</div>
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 lg:gap-8 text-xs sm:text-sm md:text-base lg:text-lg text-center" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important' }}>
                      <div className="font-semibold text-left text-xs sm:text-sm md:text-base">I Prize :</div>
                      <div>10,000</div>
                      <div>30,000</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 lg:gap-8 text-xs sm:text-sm md:text-base lg:text-lg text-center" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important' }}>
                      <div className="font-semibold text-left text-xs sm:text-sm md:text-base">II Prize :</div>
                      <div>6,000</div>
                      <div>25,000</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 lg:gap-8 text-xs sm:text-sm md:text-base lg:text-lg text-center" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important' }}>
                      <div className="font-semibold text-left text-xs sm:text-sm md:text-base">III Prize :</div>
                      <div>-</div>
                      <div>7,000</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 lg:gap-8 text-xs sm:text-sm md:text-base lg:text-lg text-center" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important' }}>
                      <div className="font-semibold text-left text-xs sm:text-sm md:text-base">IV Prize :</div>
                      <div>-</div>
                      <div>3,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="Hyderabad-content mt-3 sm:mt-4 md:mt-6 text-white text-center pt-4 sm:pt-5 md:pt-6" style={{ fontFamily: 'BakeryRoastDemo, sans-serif !important', paddingTop: '20px'  }}>
              <div className="text-sm sm:text-base md:text-lg font-semibold">
                <div>Mr. K. Pavan Kumar - +91 78938 83123</div>
              </div>
            </div>
          </div>

          {/* Hosting Partner */}
          <div className="Hyderabad-content flex flex-col items-center justify-center gap-3 sm:gap-4 mx-auto lg:mx-0 lg:flex-shrink-0" style={{ height: '400px' }}>
            <div className="text-xs sm:text-sm md:text-base font-semibold text-white uppercase tracking-widest">
              HOSTING PARTNER
            </div>
            <div className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] rounded-full bg-white/90 flex items-center justify-center p-3 sm:p-4 shadow-[0_5px_20px_rgba(0,0,0,0.3)]">
              <img src="/RCB.avif" alt="Hosting Partner" className="w-full h-full object-contain" />
            </div>
            <div className="text-base sm:text-lg lg:text-xl font-bold text-white text-center max-w-[200px] leading-tight">
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="Hyderabad-content max-w-[1200px] mx-auto mt-0 text-center text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed px-4 sm:px-8 py-4 sm:py-5 md:py-6" style={{ fontFamily: 'arial, sans-serif !important',marginTop: '20px',marginBottom: '20px' }}>
          <strong><i>*Note : </i></strong><i>The semi finalists of each zone will be promoted to higher level rounds during </i>
          <i>Vignan Mahotsav 2026 organised from 5 - 7 Feb, 2026 at Guntur, Andhra Pradesh.</i>
        </div>

        {/* Register Button */}
        <button 
          className="Hyderabad-content block mx-auto mt-16 sm:mt-20 min-h-[56px] px-16 sm:px-20 lg:px-24 py-5 sm:py-6 rounded-[10px] font-semibold text-sm sm:text-base cursor-pointer transition-all duration-300 border-none uppercase active:scale-95"
          style={{
            background: '#0b112b',
            color: '#fff',
            boxShadow: '0 5px 15px rgba(228, 138, 185, 0.4)',
            touchAction: 'manipulation',
            padding: '8px 10px 8px 10px',
            fontFamily: 'coffee, sans-serif !important'
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

export default Hyderabad;
