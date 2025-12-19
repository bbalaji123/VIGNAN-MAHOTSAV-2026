import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="w-screen overflow-x-hidden font-sans bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 min-h-screen">
      <nav className="fixed top-0 left-0 right-0 w-full bg-black/80 backdrop-blur-md flex justify-center items-center py-4 gap-10 text-lg z-50 shadow-lg sm:gap-5 sm:py-3 sm:text-base sm:flex-wrap xs:gap-3 xs:py-2 xs:text-sm xs:px-2">
        <div className="flex gap-8 sm:gap-4 sm:flex-wrap sm:justify-center xs:gap-2">
          <Link to="/" className="text-white no-underline px-5 py-2 border-b-2 border-transparent transition-all duration-300 font-medium hover:border-white hover:text-mahotsav-gold-400 sm:px-3 sm:py-1 xs:px-2 xs:py-1 xs:text-xs">Home</Link>
          <a href="#events" className="text-white no-underline px-5 py-2 border-b-2 border-transparent transition-all duration-300 font-medium hover:border-white hover:text-mahotsav-gold-400 sm:px-3 sm:py-1 xs:px-2 xs:py-1 xs:text-xs">Events</a>
          <a href="#zonal" className="text-white no-underline px-5 py-2 border-b-2 border-transparent transition-all duration-300 font-medium hover:border-white hover:text-mahotsav-gold-400 sm:px-3 sm:py-1 xs:px-2 xs:py-1 xs:text-xs">Zonal</a>
          <a href="#about-us" className="text-white no-underline px-5 py-2 border-b-2 border-white text-mahotsav-gold-400 font-medium sm:px-3 sm:py-1 xs:px-2 xs:py-1 xs:text-xs">About Us</a>
        </div>
      </nav>
      
      <section className="relative min-h-screen pt-32 pb-24 px-8 text-white overflow-hidden sm:pt-28 sm:pb-20 sm:px-4">
        {/* About Us Heading */}
        <h1 className="text-center text-7xl mb-16 text-white drop-shadow-lg sm:text-5xl sm:mb-12 xs:text-4xl xs:mb-8" 
            style={{ fontFamily: 'Bradley Hand, cursive' }}>
          About Us
        </h1>
        
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-12 mb-16 lg:flex-col lg:items-center">
            {/* Left Side - Garuda Logo */}
            <div className="flex-shrink-0 lg:mb-8">
              <img 
                src={`${import.meta.env.BASE_URL}garuda.png`}
                alt="Garuda Logo" 
                className="w-64 h-64 object-contain sm:w-48 sm:h-48 xs:w-40 xs:h-40"
              />
            </div>
            
            {/* Right Side - Content */}
            <div className="flex-1">
              <p className="text-white text-lg leading-relaxed mb-6 sm:text-base xs:text-sm">
                <strong>Vignan Mahotsav 2026 is the 19th edition of a premier National-Level Youth Festival hosted by Vignan's Foundation for Science, Technology & Research (VFSTR).</strong> Scheduled from <strong>February 5–7, 2026</strong>, the festival brings together <strong>20,000+ students from across India</strong> to compete and collaborate in <strong>80+ cultural, technical, and performing events</strong>, making it one of South India's most dynamic youth platforms. Centered on the theme <strong>"The Eternal Harmony,"</strong> Mahotsav 2026 is more than a celebration—it is a youth-driven movement inspired by global unity. The theme highlights balance, diversity, inclusivity, sustainability, and solidarity, demonstrating how culture, creativity, and innovation can collectively shape a peaceful, interconnected future.
              </p>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="bg-purple-200 bg-opacity-90 rounded-3xl py-8 px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
              {/* Footfall */}
              <div className="text-center">
                <div className="text-5xl mb-2">👣</div>
                <div className="text-purple-900 font-bold text-lg">20,000+</div>
                <div className="text-purple-900 text-sm font-semibold">TOTAL FOOTFALL</div>
              </div>
              
              {/* Colleges */}
              <div className="text-center">
                <div className="text-5xl mb-2">🎓</div>
                <div className="text-purple-900 font-bold text-lg">350+</div>
                <div className="text-purple-900 text-sm font-semibold">COLLEGES</div>
              </div>
              
              {/* Events */}
              <div className="text-center">
                <div className="text-5xl mb-2">👥</div>
                <div className="text-purple-900 font-bold text-lg">80+</div>
                <div className="text-purple-900 text-sm font-semibold">EVENTS</div>
              </div>
              
              {/* Online Audience */}
              <div className="text-center">
                <div className="text-5xl mb-2">📱</div>
                <div className="text-purple-900 font-bold text-lg">5,00,000+</div>
                <div className="text-purple-900 text-sm font-semibold">ONLINE AUDIENCE</div>
              </div>
              
              {/* Editions */}
              <div className="text-center">
                <div className="text-5xl mb-2">
                  <div className="w-16 h-16 rounded-full border-4 border-purple-900 flex items-center justify-center mx-auto">
                    <span className="text-purple-900 text-xl font-bold">18</span>
                  </div>
                </div>
                <div className="text-purple-900 font-bold text-sm mt-2">18 EDITIONS</div>
                <div className="text-purple-900 text-sm font-semibold">OF FESTIVITIES</div>
              </div>
              
              {/* Cash Prizes */}
              <div className="text-center">
                <div className="text-5xl mb-2">🏆</div>
                <div className="text-purple-900 font-bold text-lg">15+ LACKS</div>
                <div className="text-purple-900 text-sm font-semibold">CASH PRIZES</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
