import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComingSoon.css';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';

const Schedule: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden" style={{
      backgroundImage: 'url("https://res.cloudinary.com/dctuev0mm/image/upload/v1766935583/Background-redesign_jbvbrc.png")',
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

      {/* Back Button */}
      <BackButton onClick={() => navigate('/')} />

      {/* Coming Soon Content */}
      <div className="coming-soon-container" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        zIndex: 10
      }}>
        <h1 className="coming-soon-title" style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 'bold',
          color: '#fdee71',
          marginBottom: '2rem',
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
          fontFamily: 'Bradley Hand, cursive'
        }}>
          Coming Soon
        </h1>
        
        <p className="coming-soon-subtitle" style={{
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          color: '#ffffff',
          marginBottom: '1.5rem',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          fontFamily: 'Poppins, sans-serif'
        }}>
          Schedule Details
        </p>

        <p className="coming-soon-message" style={{
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          color: 'rgba(255, 255, 255, 0.9)',
          maxWidth: '600px',
          lineHeight: '1.8',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          fontFamily: 'Poppins, sans-serif'
        }}>
          We're preparing something amazing for you! The complete schedule for Mahotsav 2026 will be revealed soon. Stay tuned!
        </p>

        <div className="coming-soon-loader" style={{
          marginTop: '3rem'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(253, 238, 113, 0.2)',
            borderTop: '4px solid #fdee71',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Schedule;
