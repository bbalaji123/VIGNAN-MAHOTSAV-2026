import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const OurTeam: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
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
        <div className="flower-inner" style={{ animation: 'spin-slow 120s linear infinite', transformOrigin: 'center center' }}>
          <img 
            src={`${import.meta.env.BASE_URL}petals.png`}
            alt="Flower Petals"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={`${import.meta.env.BASE_URL}sun.png`}
              alt="Sun"
              className="absolute w-1/3 h-1/3 object-contain"
              style={{ animation: 'sunRotateClockwise 20s linear infinite' }}
            />
            <img 
              src={`${import.meta.env.BASE_URL}moon.png`}
              alt="Moon"
              className="absolute w-1/3 h-1/3 object-contain"
              style={{ 
                zIndex: 10,
                animation: 'moonStatic 20s linear infinite'
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating Flower - Bottom Left */}
      <div className="fixed -bottom-32 -left-32 md:-bottom-64 md:-left-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-[1]">
        <div className="flower-inner" style={{ animation: 'spin-slow 120s linear infinite', transformOrigin: 'center center' }}>
          <img 
            src={`${import.meta.env.BASE_URL}petals.png`}
            alt="Flower Petals"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={`${import.meta.env.BASE_URL}sun.png`}
              alt="Sun"
              className="absolute w-1/3 h-1/3 object-contain"
              style={{ animation: 'sunRotateClockwise 20s linear infinite' }}
            />
            <img 
              src={`${import.meta.env.BASE_URL}moon.png`}
              alt="Moon"
              className="absolute w-1/3 h-1/3 object-contain"
              style={{ 
                zIndex: 10,
                animation: 'moonStatic 20s linear infinite'
              }}
            />
          </div>
        </div>
      </div>

      <style>
        {`
          .flower-container-mobile {
            width: 500px;
            height: 500px;
            position: fixed;
            overflow: visible;
          }
          
          .flower-inner {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          
          .flower-container-mobile:first-of-type .flower-inner {
            top: -50%;
            right: -50%;
          }
          
          .flower-container-mobile:nth-of-type(2) .flower-inner {
            bottom: -50%;
            left: -50%;
          }
          
          @media (max-width: 768px) {
            .flower-container-mobile {
              width: 300px;
              height: 300px;
            }
            
            .flower-container-mobile:first-of-type .flower-inner {
              top: -40%;
              right: -40%;
            }
            
            .flower-container-mobile:nth-of-type(2) .flower-inner {
              bottom: -40%;
              left: -40%;
            }
          }
          
          @keyframes petalsRotateAnticlockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          
          @keyframes sunRotateClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .team-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 80vh;
          }

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .team-title {
            font-size: 3.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.1s;
          }

          .team-subtitle {
            font-size: 2.5rem;
            font-weight: 600;
            text-align: center;
            color: #ffffff;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            margin-bottom: 1rem;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.3s;
          }

          .team-coming-soon {
            font-size: 1.25rem;
            text-align: center;
            color: #ffffff;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.5s;
          }

          .back-button {
            position: fixed;
            top: 2rem;
            left: 2rem;
            z-index: 1000;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: #000;
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 5px 15px rgba(251, 191, 36, 0.4);
          }

          .back-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(251, 191, 36, 0.6);
          }

          @media (max-width: 768px) {
            .team-content {
              padding: 1rem;
              margin-left: 0;
            }

            .team-title {
              font-size: 2.5rem;
            }

            .team-subtitle {
              font-size: 1.75rem;
            }

            .team-coming-soon {
              font-size: 1rem;
            }

            .back-button {
              top: 1rem;
              left: 1rem;
              padding: 0.5rem 1rem;
              font-size: 0.875rem;
            }
          }
        `}
      </style>

      {/* Back Button */}
      <button onClick={handleBackClick} className="circular-back-button" aria-label="Go back">
      </button>

      {/* Main Content */}
      <div className="team-content">
        <h1 className="team-title">OUR TEAM</h1>
        <h2 className="team-subtitle">A New Treasure Awaits...</h2>
        <p className="team-coming-soon">Coming Soon to the Seven Seas!</p>
      </div>
    </div>
  );
};

export default OurTeam;
