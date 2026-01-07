import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './components/BackButton';
import FlowerComponent from './components/FlowerComponent';
import './Dashboard.css';

const CampusMap: React.FC = () => {
  const navigate = useNavigate();
  const [showImageModal, setShowImageModal] = React.useState(false);

  const handleBackClick = () => {
    navigate('/?menu=true');
  };

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-x-hidden"
      style={{
        backgroundImage: 'url("/Background-redesign.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Floating Flower - Top Right */}
      <div className="fixed -top-32 -right-32 md:-top-64 md:-right-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 max-md:z-0 md:z-[1]">
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
      <div className="fixed -bottom-32 -left-32 md:-bottom-64 md:-left-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 max-md:z-0 md:z-[1]">
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

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .campus-title {
            font-family: 'Aladin', cursive !important;
          }

          @media (max-width: 768px) {
            .mobile-content-spacer {
              padding-bottom: 20px !important;
            }
            .mobile-map-spacer {
              margin-bottom: 20px !important;
            }
          }
        `}
      </style>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50 md:static">
        <BackButton onClick={handleBackClick} />
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-4 md:pt-24 pb-32 md:pb-16 
                      opacity-0 animate-[fadeInUp_0.8s_ease-out_0.05s_forwards] z-2 mobile-content-spacer">

        {/* Header */}
        <div className="text-center mb-10 mt-16 md:mt-0">
          <h1
            className="campus-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold pt-4 md:pt-0"
            style={{
              background: '#fdee71',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
              marginTop: '50px'
            }}
          >
            CAMPUS BLUE PRINT
          </h1>

        </div>

        {/* 50 / 50 Image + Map — PERFECT CENTERING */}
        <div className="w-full max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6
                       place-items-center
                       min-h-[460px] md:min-h-[560px]"
            style={{ marginTop: '40px' }}
          >
            {/* LEFT: Campus Image */}
            <img
              src="/images/map.png"
              alt="Campus Blueprint - Mahotsav 2025 Venue Locations"
              className="w-[85%] max-w-[600px] h-auto object-contain cursor-pointer transition-transform hover:scale-105"
              onClick={handleImageClick}
              style={{ cursor: 'pointer' }}
            />

            {/* RIGHT: Live Google Map */}
            <div
              className="w-[85%] max-w-[600px] h-[380px] md:h-[430px]
                         rounded-2xl overflow-hidden shadow-2xl mb-16 md:mb-10 mobile-map-spacer"
            >
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1uZxIpP4jFqgAqCDThH4ZWryPqkiR9Vc"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mahotsav 2025 Campus Map"

              />
            </div>
          </div>
        </div>

      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div
          className="image-modal-overlay"
          onClick={handleCloseModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
            cursor: 'pointer'
          }}
        >
          <button
            onClick={handleCloseModal}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              color: 'white',
              fontSize: '1.5rem',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              zIndex: 10000,
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>
          <img
            src="/images/map.png"
            alt="Campus Blueprint - Full View"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: window.innerWidth <= 768 ? '95%' : '90%',
              maxHeight: window.innerWidth <= 768 ? '98%' : '90%',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              cursor: 'default',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CampusMap;
