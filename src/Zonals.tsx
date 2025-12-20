import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './components/BackButton';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';

const Zonals: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleCityClick = (city: string) => {
    navigate(`/zonals/${city.toLowerCase()}`);
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

          .zonals-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            min-height: 80vh;
            padding: 4rem 2rem 2rem 2rem;
            padding-top: 6rem;
          }

          .zonals-title {
            font-family: 'Cinzel Decorative', serif;
            font-size: 4rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 4rem;
            color: #ffffff;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
            letter-spacing: 0.1em;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.1s;
          }

          .city-cards-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
            max-width: 1400px;
            width: 100%;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.3s;
          }

          .city-card {
            background: rgba(184, 147, 189, 0.7);
            border: 3px solid rgba(198, 142, 107, 0.8);
            border-radius: 20px;
            padding: 6rem 3rem;
            min-width: 250px;
            width: 280px;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            cursor: pointer;
            backdrop-filter: blur(5px);
          }

          .city-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(184, 147, 189, 0.5);
            background: rgba(184, 147, 189, 0.85);
          }

          .city-name {
            font-size: 2rem;
            font-weight: 600;
            color: #000000;
            text-align: center;
            text-transform: lowercase;
          }

          .back-button {
            position: fixed;
            top: 2rem;
            left: 2rem;
            z-index: 1000;
            background: linear-gradient(135deg, #fdee71, #e48ab9);
            color: #000;
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 5px 15px rgba(253, 238, 113, 0.4);
          }

          .back-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(253, 238, 113, 0.6);
          }

          @media (max-width: 768px) {
            .zonals-title {
              font-size: 2.5rem;
            }

            .city-cards-container {
              gap: 1.5rem;
            }

            .city-card {
              min-width: 200px;
              width: 240px;
              height: 250px;
              padding: 4rem 2rem;
            }

            .city-name {
              font-size: 1.5rem;
            }

            .back-button {
              top: 1rem;
              left: 1rem;
              padding: 0.5rem 1rem;
            }
          }
        `}
      </style>

      {/* Back Button */}
      <BackButton onClick={handleBackClick} />

      {/* Main Content */}
      <div className="zonals-content">
        <h1 className="zonals-title">ZONALS</h1>
        
        {/* City Cards Container */}
        <div className="city-cards-container">
          <div className="city-card" onClick={() => handleCityClick('bangalore')}>
            <span className="city-name">bangalore</span>
          </div>
          <div className="city-card">
            <span className="city-name">vizag</span>
          </div>
          <div className="city-card">
            <span className="city-name">hyderabad</span>
          </div>
          <div className="city-card">
            <span className="city-name">tirupati</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zonals;
