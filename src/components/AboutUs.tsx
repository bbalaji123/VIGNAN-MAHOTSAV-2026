import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="w-screen overflow-x-hidden font-sans bg-cover bg-center bg-fixed bg-no-repeat min-h-screen" style={{backgroundImage: "url('/IMG_2042.png')"}}>
      <nav className="fixed top-0 left-0 right-0 w-full bg-black/80 backdrop-blur-md flex justify-center items-center py-4 gap-10 text-lg z-50 shadow-lg sm:gap-5 sm:py-3 sm:text-base sm:flex-wrap xs:gap-3 xs:py-2 xs:text-sm xs:px-2">
        <div className="flex gap-8 sm:gap-4 sm:flex-wrap sm:justify-center xs:gap-2">
          <Link to="/" className="text-white no-underline px-5 py-2 border-b-2 border-transparent transition-all duration-300 font-medium hover:border-white hover:text-mahotsav-gold-400 sm:px-3 sm:py-1 xs:px-2 xs:py-1 xs:text-xs">Home</Link>
          <a href="#events" className="text-white no-underline px-5 py-2 border-b-2 border-transparent transition-all duration-300 font-medium hover:border-white hover:text-mahotsav-gold-400 sm:px-3 sm:py-1 xs:px-2 xs:py-1 xs:text-xs">Events</a>
          <a href="#zonal" className="text-white no-underline px-5 py-2 border-b-2 border-transparent transition-all duration-300 font-medium hover:border-white hover:text-mahotsav-gold-400 sm:px-3 sm:py-1 xs:px-2 xs:py-1 xs:text-xs">Zonal</a>
          <a href="#about-us" className="text-white no-underline px-5 py-2 border-b-2 border-white text-mahotsav-gold-400 font-medium sm:px-3 sm:py-1 xs:px-2 xs:py-1 xs:text-xs">About Us</a>
        </div>
      </nav>
      <section className="relative min-h-screen bg-transparent pt-32 pb-24 px-5 text-white text-center overflow-hidden sm:pt-28 sm:pb-20 sm:px-4">
        <style>{`
          @media (max-width: 767px) {
            section {
              padding-left: 15px !important;
              padding-right: 15px !important;
            }
          }
        `}</style>
        <h1 className="text-6xl mb-10 text-mahotsav-gold-400 drop-shadow-lg sm:text-4xl sm:mb-8 xs:text-3xl xs:mb-6">About Us</h1>
        <div className="p-12 my-12 mx-auto w-4/5 max-w-5xl sm:p-8 sm:my-8 sm:w-11/12 xs:p-6 xs:my-6 xs:w-full" style={{background: 'transparent', backgroundColor: 'transparent', backdropFilter: 'none'}}>
          <h2 className="text-4xl mb-8 font-bold sm:text-3xl sm:mb-6 xs:text-2xl xs:mb-5" style={{color: '#FFD700'}}>ABOUT THEME</h2>
          
          <div className="mb-10">
            <h3 className="text-3xl mb-6 font-semibold sm:text-2xl sm:mb-5 xs:text-xl xs:mb-4" style={{color: '#FFD700'}}>Mahotsav 2026 - The Eternal Harmony</h3>
            
            <div className="text-left space-y-6 text-white">
              <p className="text-xl leading-relaxed sm:text-lg xs:text-base xs:leading-normal">
                This is not just a theme, but a beacon of hope, a leap towards peace in the larger society around us. It inspires the visionaries of world peace. The hope of an eternal harmony focuses on ideals built through the refinement of the balance of all the interdependence that are crucial for the ecosystem to thrive.
              </p>
              
              <p className="text-xl leading-relaxed sm:text-lg xs:text-base xs:leading-normal">
                This fun revolution towards harmony includes vibrant, fostering connections and fulfillment. Mahotsav 2026 is a step towards better understanding the way we take pride in saying, "sustainability", "diversity", "inclusivity", "reliability", and "solidarity".
              </p>
              
              <p className="text-xl leading-relaxed sm:text-lg xs:text-base xs:leading-normal">
                Mahotsav, in its nature, is an entertaining and engaging event, and this year the focus is on using the influence of youth towards the global future in various aspects of the eternal harmony. Mahotsav 2026 is all set to focus on fun and the future, internally, societally and globally!
              </p>
              
              <p className="text-xl leading-relaxed sm:text-lg xs:text-base xs:leading-normal">
                Our vision encompasses not just technological advancement, but the holistic development of human consciousness towards creating a sustainable and harmonious world. We believe in the power of youth to drive meaningful change and create lasting impact through innovation, collaboration, and cultural exchange.
              </p>
              
              <p className="text-xl leading-relaxed sm:text-lg xs:text-base xs:leading-normal">
                Join us in this transformative journey as we explore the intersection of tradition and modernity, science and spirituality, individual growth and collective responsibility. Together, we're not just organizing an event - we're cultivating a movement towards eternal harmony that will resonate far beyond the boundaries of our institution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
