import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="w-screen overflow-x-hidden font-sans bg-cover bg-center bg-fixed bg-no-repeat min-h-screen" style={{backgroundImage: "url('/IMG_2042.png')"}}>
      <nav className="fixed top-0 left-0 right-0 w-full bg-black/80 backdrop-blur-md flex justify-center items-center py-4 gap-10 text-lg z-50 shadow-lg">
        <div className="flex gap-8">
          <Link to="/" className="text-white no-underline px-5 py-2 border-b-2 border-transparent transition-all duration-300 font-medium hover:border-white hover:text-mahotsav-gold-400">Home</Link>
          <a href="#events" className="text-white no-underline px-5 py-2 border-b-2 border-transparent transition-all duration-300 font-medium hover:border-white hover:text-mahotsav-gold-400">Events</a>
          <a href="#zonal" className="text-white no-underline px-5 py-2 border-b-2 border-transparent transition-all duration-300 font-medium hover:border-white hover:text-mahotsav-gold-400">Zonal</a>
          <a href="#about-us" className="text-white no-underline px-5 py-2 border-b-2 border-white text-mahotsav-gold-400 font-medium">About Us</a>
        </div>
      </nav>
      <section className="relative min-h-screen bg-transparent pt-32 pb-24 px-5 text-white text-center overflow-hidden">
        <h1 className="text-6xl mb-10 text-mahotsav-gold-400 drop-shadow-lg">About Us</h1>
        <div className="bg-white/15 backdrop-blur-md p-12 my-12 mx-auto w-4/5 max-w-4xl rounded-3xl shadow-2xl">
          <h2 className="text-4xl mb-6 text-white drop-shadow-md">Welcome to Vignan Mahotsav</h2>
          <p className="text-xl leading-relaxed mb-5 opacity-95 drop-shadow-sm">
            Vignan Mahotsav is an annual celebration that brings together the brightest minds in science, technology, and innovation. Our festival showcases cutting-edge research, cultural performances, and engaging workshops that inspire curiosity and foster collaboration. Whether you're a student, professional, or science enthusiast, you'll find something to spark your imagination.
          </p>
          <p className="text-xl leading-relaxed opacity-95 drop-shadow-sm">
            Join us in exploring the wonders of science and technology, celebrating creativity, and building connections that last a lifetime. Together, we're shaping the future of innovation!
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
