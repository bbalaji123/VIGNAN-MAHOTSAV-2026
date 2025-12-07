import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './FloatingIcons.css';

const ParaSports: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col relative" style={{
      backgroundImage: 'url("/Background-redesign.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Floating Flower - Top Right */}
      <div className="fixed -top-64 -right-64 pointer-events-none" style={{ width: '600px', height: '600px', opacity: 0.25, zIndex: 1 }}>
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
      <div className="fixed -bottom-64 -left-64 pointer-events-none" style={{ width: '600px', height: '600px', opacity: 0.25, zIndex: 1 }}>
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

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes neonPulse {
            0%, 100% {
              box-shadow: 
                0 0 20px rgba(251, 191, 36, 0.5),
                0 0 40px rgba(251, 191, 36, 0.3),
                0 0 60px rgba(251, 191, 36, 0.2),
                inset 0 0 20px rgba(251, 191, 36, 0.1);
            }
            50% {
              box-shadow: 
                0 0 30px rgba(251, 191, 36, 0.7),
                0 0 60px rgba(251, 191, 36, 0.5),
                0 0 90px rgba(251, 191, 36, 0.3),
                inset 0 0 30px rgba(251, 191, 36, 0.2);
            }
          }

          .parasports-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            position: relative;
            z-index: 1;
          }

          .parasports-title {
            font-size: 4rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 3rem;
            margin-top: 2rem;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.1s;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .back-to-list-btn {
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
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.95rem;
          }

          .back-to-list-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(251, 191, 36, 0.6);
          }

          .cards-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem;
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem 0;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.3s;
          }

          .neon-card {
            background: linear-gradient(145deg, rgba(0, 0, 0, 0.9), rgba(20, 20, 20, 0.95));
            border: 3px solid rgba(251, 191, 36, 0.6);
            border-radius: 20px;
            padding: 2rem;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.4s ease;
            animation: neonPulse 3s infinite;
          }

          .neon-card::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #fbbf24, #f59e0b, #fbbf24);
            border-radius: 20px;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.4s ease;
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .neon-card:hover {
            transform: translateY(-10px) scale(1.03);
            border-color: #fbbf24;
            box-shadow: 
              0 0 40px rgba(251, 191, 36, 0.8),
              0 0 80px rgba(251, 191, 36, 0.6),
              0 0 120px rgba(251, 191, 36, 0.4),
              inset 0 0 40px rgba(251, 191, 36, 0.2);
          }

          .neon-card:hover::before {
            opacity: 0.3;
          }

          .card-icon-area {
            width: 100%;
            height: 350px;
            background: rgba(0, 0, 0, 0.6);
            border: 2px solid rgba(251, 191, 36, 0.3);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            position: relative;
            overflow: hidden;
          }

          .card-icon-area::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 80%;
            background: radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%);
          }

          .placeholder-text {
            color: rgba(251, 191, 36, 0.4);
            font-size: 1.1rem;
            font-weight: 500;
            letter-spacing: 1px;
            z-index: 1;
          }

          .card-title {
            font-size: 1.8rem;
            font-weight: bold;
            text-align: center;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .card-subtitle {
            font-size: 1rem;
            text-align: center;
            color: rgba(251, 191, 36, 0.8);
            font-weight: 600;
            letter-spacing: 0.5px;
          }

          .shield-icon {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 35px;
            height: 35px;
            border: 2px solid #fbbf24;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.8);
            box-shadow: 0 0 15px rgba(251, 191, 36, 0.5);
          }

          .shield-icon::before,
          .shield-icon::after {
            content: '';
            position: absolute;
            background: #fbbf24;
          }

          .shield-icon::before {
            width: 20px;
            height: 2px;
            transform: rotate(45deg);
          }

          .shield-icon::after {
            width: 2px;
            height: 20px;
            transform: rotate(45deg);
          }

          @media (max-width: 768px) {
            .parasports-title {
              font-size: 2.5rem;
              margin-bottom: 2rem;
            }

            .cards-container {
              grid-template-columns: 1fr;
              gap: 2rem;
              padding: 1rem;
            }

            .neon-card {
              padding: 1.5rem;
            }

            .card-icon-area {
              height: 280px;
            }

            .card-title {
              font-size: 1.5rem;
            }

            .back-to-list-btn {
              top: 1rem;
              left: 1rem;
              padding: 0.5rem 1rem;
              font-size: 0.85rem;
            }
          }
        `}
      </style>

      {/* Back to List Button */}
      <button onClick={handleBackClick} className="circular-back-button" aria-label="Go back">
      </button>

      {/* Main Content */}
      <div className="parasports-content">
        <h1 className="parasports-title">PARA SPORTS</h1>

        <div className="cards-container">
          {/* Card 1 - Para Athletics */}
          <div className="neon-card">
            <div className="shield-icon"></div>
            <div className="card-icon-area">
              <span className="placeholder-text">Image Space</span>
            </div>
            <h3 className="card-title">Para Athletics</h3>
            <p className="card-subtitle">(M&W)</p>
          </div>

          {/* Card 2 - Para Cricket */}
          <div className="neon-card">
            <div className="shield-icon"></div>
            <div className="card-icon-area">
              <span className="placeholder-text">Image Space</span>
            </div>
            <h3 className="card-title">Para Cricket</h3>
            <p className="card-subtitle">(M&W)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParaSports;
