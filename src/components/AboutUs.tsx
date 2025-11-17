import React from 'react';
import { Link } from 'react-router-dom';
import '../Dashboard.css';

const AboutUs: React.FC = () => {
  return (
    <div className="single-page-app">
      <nav className="header-nav">
        <div className="nav-left">
          <Link to="/" className="nav-link">Home</Link>
          <a href="#events">Events</a>
          <a href="#zonal">Zonal</a>
          <a href="#about-us" className="active">About Us</a>
        </div>
      </nav>
      <section className="about-us-section">
        <h1>About Us</h1>
        <div className="about-us-content">
          <h2>Welcome to Vignan Mahotsav</h2>
          <p>
            Vignan Mahotsav is an annual celebration that brings together the brightest minds in science, technology, and innovation. Our festival showcases cutting-edge research, cultural performances, and engaging workshops that inspire curiosity and foster collaboration. Whether you're a student, professional, or science enthusiast, you'll find something to spark your imagination.
          </p>
          <p>
            Join us in exploring the wonders of science and technology, celebrating creativity, and building connections that last a lifetime. Together, we're shaping the future of innovation!
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
