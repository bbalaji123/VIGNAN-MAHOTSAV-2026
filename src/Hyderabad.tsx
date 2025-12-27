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

          /* Font overrides for this page */
          .hyderabad-title {
            font-family: 'Woodtrap', sans-serif !important;
          }

          .hyderabad-content,
          .hyderabad-content *,
          .hyderabad-content h1,
          .hyderabad-content h2,
          .hyderabad-content h3,
          .hyderabad-content h4,
          .hyderabad-content h5,
          .hyderabad-content h6,
          .hyderabad-content div,
          .hyderabad-content span {
            font-family: 'arial', sans-serif !important;
          }
        `}
      </style>

      {/* Back Button */}
      <BackButton onClick={handleBackClick} />

      <div className="relative z-10 min-h-screen px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex flex-col justify-center items-center">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="hyderabad-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4"
            style={{
              textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
              letterSpacing: '0.15em',
              paddingTop: '20px',
            }}
          >
            HYDERABAD
          </h1>
          <p className="hyderabad-content text-xl sm:text-2xl md:text-3xl text-white italic"
            style={{
              letterSpacing: '0.05em',
              paddingBottom: '20px',
            }}
          >
            (Dates: Reveal soon)
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
            <div className="hyderabad-content bg-[rgba(82,37,102,0.3)] border-2 border-dashed border-white/50 rounded-lg backdrop-blur-[10px] p-4 sm:p-6 md:p-8 lg:p-12" style={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center uppercase tracking-wider pb-2 sm:pb-4" style={{ fontFamily: 'BackToSchool, sans-serif !important', marginBottom: '0' }}>
                ZONAL EVENTS (MEN)
              </h3>
              <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:gap-12 text-white" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>
                {/* Sports Column */}
                <div className="flex flex-col gap-3 sm:gap-4 min-w-[120px] sm:min-w-[150px]">
                  <div className="flex flex-col py-3 sm:py-4 border-b border-white/30">
                    <div className="font-bold text-base sm:text-lg md:text-xl mb-1" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>Volley ball</div>
                    <div className="text-sm sm:text-base md:text-lg" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>(6+4)</div>
                  </div>
                  <div className="flex flex-col py-3 sm:py-4 border-b border-white/30">
                    <div className="font-bold text-base sm:text-lg md:text-xl mb-1" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>Basket ball</div>
                    <div className="text-sm sm:text-base md:text-lg" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>(5+5)</div>
                  </div>
                  <div className="flex flex-col py-3 sm:py-4 border-b border-white/30">
                    <div className="font-bold text-base sm:text-lg md:text-xl mb-1" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>Kabaddi</div>
                    <div className="text-sm sm:text-base md:text-lg" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>(7+3)</div>

                  </div>
                  <div className="flex flex-col py-3 sm:py-4 border-b border-white/30">
                    <div className="font-bold text-base sm:text-lg md:text-xl mb-1" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>Football</div>
                    <div className="text-sm sm:text-base md:text-lg" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>(7+3)</div>
                  </div>
                </div>

                {/* Prizes Section */}
                <div className="flex-1 flex flex-col">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 mb-3 sm:mb-4 font-bold text-sm sm:text-base md:text-lg text-center pt-4 sm:pt-5" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>
                    <div></div>
                    <div>Zone<br/>Winners</div>
                    <div>Mahotsav<br/>Winners</div>
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 text-sm sm:text-base md:text-lg text-center" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>
                      <div className="font-semibold text-left">I Prize :</div>
                      <div>10,000</div>
                      <div>30,000</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 text-sm sm:text-base md:text-lg text-center" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>
                      <div className="font-semibold text-left">II Prize :</div>
                      <div>6,000</div>
                      <div>25,000</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 text-sm sm:text-base md:text-lg text-center" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>
                      <div className="font-semibold text-left">III Prize :</div>
                      <div>-</div>
                      <div>7,000</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 text-sm sm:text-base md:text-lg text-center" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>
                      <div className="font-semibold text-left">IV Prize :</div>
                      <div>-</div>
                      <div>3,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="hyderabad-content mt-3 sm:mt-4 md:mt-6 text-white text-center pt-4 sm:pt-5" style={{ fontFamily: 'BackToSchool, sans-serif !important' }}>
              <div className="text-sm sm:text-base md:text-lg font-semibold">
                <div> Contact: Mr.Sk. Kadharbasha  - +91 81799 30666</div>
              </div>
            </div>
          </div>

          {/* Hosting Partner */}
          <div className="hyderabad-content flex flex-col items-center justify-center gap-3 sm:gap-4 mx-auto lg:mx-0 lg:flex-shrink-0" style={{ height: '400px' }}>
            <div className="text-xs sm:text-sm md:text-base font-semibold text-white uppercase tracking-widest">
              HOSTING PARTNER
            </div>
            <div className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] rounded-full bg-white/90 flex items-center justify-center p-3 sm:p-4 shadow-[0_5px_20px_rgba(0,0,0,0.3)]">
              
            </div>
            <div className="text-base sm:text-lg lg:text-xl font-bold text-white text-center max-w-[200px] leading-tight">
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="hyderabad-content max-w-[1200px] mx-auto mt-8 sm:mt-12 md:mt-16 text-center text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed px-4 sm:px-8 py-4 sm:py-5" style={{ fontFamily: 'arial, sans-serif' }}>
          <strong><i>*Note : </i></strong><i>The semi finalists of each zone will be promoted to higher level rounds during </i>
          <i>Vignan Mahotsav 2026 organised from 5 - 7 Feb, 2026 at Guntur, Andhra Pradesh.</i>
        </div>

        {/* Register Button */}
        <button 
          className="hyderabad-content block mx-auto mt-12 sm:mt-16 md:mt-20 min-h-[48px] sm:min-h-[56px] px-12 sm:px-16 md:px-20 lg:px-24 py-4 sm:py-5 md:py-6 rounded-[10px] font-semibold text-xs sm:text-sm md:text-base cursor-pointer transition-all duration-300 border-none uppercase active:scale-95 touch-manipulation"
          style={{
            background: '#012b16',
            color: '#fff',
            boxShadow: '0 5px 15px rgba(228, 138, 185, 0.4)',
            touchAction: 'manipulation',
            fontFamily: 'coffee, sans-serif !important',
            paddingTop: '20px',
            paddingBottom: '20px',
            paddingLeft: '30px',
            paddingRight: '30px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(228, 138, 185, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(228, 138, 185, 0.4)';
          }}
         onMouseDown={(e) => {
            return e.currentTarget.style.transform = 'scale(0.95)';
        
          }}
          onClick={() => window.open('https://forms.gle/yZ4dw5uhgDMnV95o9 ', '_blank')}   
              >
          CLICK HERE TO REGISTER
        </button>
      </div>
    </div>
  );
};

export default Hyderabad;
