import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Schedule: React.FC = () => {
  const navigate = useNavigate();
  const [activeSchedule, setActiveSchedule] = useState<'cultural' | 'sports'>('cultural');
  const [selectedCulturalCategory, setSelectedCulturalCategory] = useState<string>('Music');
  const [selectedSportsCategory, setSelectedSportsCategory] = useState<string>('Team Events');
  const [showParaSports, setShowParaSports] = useState<boolean>(false);

  const handleBackClick = () => {
    navigate('/');
  };

  const culturalCategories = ['Music', 'Dance', 'Dramatics and Filmmaking', 'Literary', 'Fine Arts', 'Fashion and Spotlight'];
  const sportsCategories = ['Team Events', 'Individual Events', 'Para Sports'];

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

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .schedule-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
            position: relative;
            z-index: 1;
          }

          .schedule-title {
            font-size: 3.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #fdee71, #e48ab9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px rgba(253, 238, 113, 0.3);
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.1s;
          }

          .schedule-subtitle {
            font-size: 1.8rem;
            font-weight: 600;
            text-align: center;
            color: #ffffff;
            margin-bottom: 2rem;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.3s;
          }

          .schedule-layout {
            display: grid;
            grid-template-columns: 230px 1fr 230px;
            gap: 3rem;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.5s;
            align-items: start;
          }

          .sidebar-left {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .sidebar-right {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .category-button {
            background: rgba(30, 30, 30, 0.8);
            border: 1px solid rgba(253, 238, 113, 0.3);
            border-radius: 10px;
            color: #ffffff;
            padding: 0.9rem 1.2rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            font-size: 0.95rem;
            letter-spacing: 0.3px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
          }

          .category-button:hover {
            background: rgba(253, 238, 113, 0.2);
            border-color: rgba(253, 238, 113, 0.6);
            transform: scale(1.03);
            box-shadow: 0 5px 15px rgba(253, 238, 113, 0.3);
          }

          .category-button.active {
            background: rgba(253, 238, 113, 0.3);
            border-color: #fdee71;
            box-shadow: 0 5px 15px rgba(253, 238, 113, 0.5);
          }

          .main-content {
            background: rgba(0, 0, 0, 0.5);
            border-radius: 15px;
            padding: 2.5rem;
            min-height: 600px;
            border: 2px solid rgba(253, 238, 113, 0.2);
          }

          .event-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1.5rem;
          }

          .event-table th {
            background: linear-gradient(135deg, #fdee71, #e48ab9);
            color: #000;
            padding: 1rem 1.5rem;
            text-align: left;
            font-weight: 700;
            border: 1px solid rgba(253, 238, 113, 0.3);
            font-size: 1rem;
            letter-spacing: 0.5px;
          }

          .event-table td {
            color: #ffffff;
            padding: 1rem 1.5rem;
            border: 1px solid rgba(253, 238, 113, 0.3);
            background: rgba(0, 0, 0, 0.3);
          }

          .bottom-buttons {
            display: flex;
            justify-content: center;
            gap: 2.5rem;
            margin-top: 3rem;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.7s;
          }

          .schedule-action-button {
            background: linear-gradient(135deg, #e48ab9, #c96ba1);
            color: #ffffff;
            padding: 0.9rem 2.5rem;
            border-radius: 50px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 5px 20px rgba(245, 158, 11, 0.4);
            font-size: 1rem;
            letter-spacing: 0.8px;
            text-transform: uppercase;
          }

          .schedule-action-button:hover {
            background: linear-gradient(135deg, #fdee71, #e48ab9);
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(253, 238, 113, 0.6);
          }

          .schedule-action-button.active {
            background: linear-gradient(135deg, #fdee71, #e48ab9);
            box-shadow: 0 8px 30px rgba(253, 238, 113, 0.7);
            transform: translateY(-2px);
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

          .coming-soon {
            text-align: center;
            color: #ffffff;
            font-size: 1.5rem;
            margin-top: 3rem;
          }

          .parasports-cards-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
            padding: 2rem 0;
          }

          @keyframes neonPulse {
            0%, 100% {
              box-shadow: 
                0 0 20px rgba(253, 238, 113, 0.5),
                0 0 40px rgba(253, 238, 113, 0.3),
                0 0 60px rgba(253, 238, 113, 0.2),
                inset 0 0 20px rgba(253, 238, 113, 0.1);
            }
            50% {
              box-shadow: 
                0 0 30px rgba(253, 238, 113, 0.7),
                0 0 60px rgba(253, 238, 113, 0.5),
                0 0 90px rgba(253, 238, 113, 0.3),
                inset 0 0 30px rgba(253, 238, 113, 0.2);
            }
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .neon-card {
            background: linear-gradient(145deg, rgba(0, 0, 0, 0.9), rgba(20, 20, 20, 0.95));
            border: 3px solid rgba(253, 238, 113, 0.6);
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
            background: linear-gradient(45deg, #fdee71, #e48ab9, #fdee71);
            border-radius: 20px;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.4s ease;
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
          }

          .neon-card:hover {
            transform: translateY(-10px) scale(1.03);
            border-color: #fdee71;
            box-shadow: 
              0 0 40px rgba(253, 238, 113, 0.8),
              0 0 80px rgba(253, 238, 113, 0.6),
              0 0 120px rgba(253, 238, 113, 0.4),
              inset 0 0 40px rgba(253, 238, 113, 0.2);
          }

          .neon-card:hover::before {
            opacity: 0.3;
          }

          .card-icon-area {
            width: 100%;
            height: 300px;
            background: rgba(0, 0, 0, 0.6);
            border: 2px solid rgba(253, 238, 113, 0.3);
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
            background: radial-gradient(circle, rgba(253, 238, 113, 0.1) 0%, transparent 70%);
          }

          .placeholder-text {
            color: rgba(253, 238, 113, 0.4);
            font-size: 1.1rem;
            font-weight: 500;
            letter-spacing: 1px;
            z-index: 1;
          }

          .card-title {
            font-size: 1.8rem;
            font-weight: bold;
            text-align: center;
            background: linear-gradient(135deg, #fdee71, #e48ab9);
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
            color: rgba(253, 238, 113, 0.8);
            font-weight: 600;
            letter-spacing: 0.5px;
          }

          .shield-icon {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 35px;
            height: 35px;
            border: 2px solid #fdee71;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.8);
            box-shadow: 0 0 15px rgba(253, 238, 113, 0.5);
          }

          .shield-icon::before,
          .shield-icon::after {
            content: '';
            position: absolute;
            background: #fdee71;
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

          @media (max-width: 1024px) {
            .schedule-layout {
              grid-template-columns: 1fr;
            }

            .sidebar-left,
            .sidebar-right {
              width: 100%;
              gap: 0.75rem;
            }

            .sidebar-right {
              margin-top: 1rem;
            }

            .category-button {
              padding: 1rem 1.25rem;
            }
          }

          @media (max-width: 768px) {
            .schedule-content {
              padding: 1rem;
            }

            .schedule-title {
              font-size: 2.5rem;
            }

            .schedule-subtitle {
              font-size: 1.25rem;
            }

            .main-content {
              padding: 1.5rem;
            }

            .event-table th,
            .event-table td {
              padding: 0.75rem;
              font-size: 0.9rem;
            }

            .bottom-buttons {
              flex-direction: column;
              gap: 1rem;
            }

            .schedule-action-button {
              width: 100%;
              padding: 1rem 2rem;
            }

            .back-button {
              top: 1rem;
              left: 1rem;
              padding: 0.5rem 1rem;
            }

            .parasports-cards-container {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }

            .neon-card {
              padding: 1.5rem;
            }

            .card-icon-area {
              height: 250px;
            }

            .card-title {
              font-size: 1.5rem;
            }
          }
        `}
      </style>

      {/* Back Button */}
      <button onClick={handleBackClick} className="circular-back-button" aria-label="Go back">
      </button>

      {/* Main Content */}
      <div className="schedule-content">
        <h1 className="schedule-title">SCHEDULE</h1>
        <h2 className="schedule-subtitle">EVENT DETAILS</h2>

        <div className="schedule-layout">
          {/* Left Sidebar - Cultural Categories */}
          <div className="sidebar-left">
            {culturalCategories.map((category) => (
              <button
                key={category}
                className={`category-button ${activeSchedule === 'cultural' && selectedCulturalCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setActiveSchedule('cultural');
                  setSelectedCulturalCategory(category);
                  setShowParaSports(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="main-content">
            {showParaSports ? (
              <div className="parasports-cards-container">
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
            ) : (
              <table className="event-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Category</th>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Venue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="coming-soon">
                      Event schedule coming soon...
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {/* Right Sidebar - Sports Categories */}
          <div className="sidebar-right">
            {sportsCategories.map((category) => (
              <button
                key={category}
                className={`category-button ${activeSchedule === 'sports' && selectedSportsCategory === category ? 'active' : ''}`}
                onClick={() => {
                  if (category === 'Para Sports') {
                    setActiveSchedule('sports');
                    setSelectedSportsCategory(category);
                    setShowParaSports(true);
                  } else {
                    setActiveSchedule('sports');
                    setSelectedSportsCategory(category);
                    setShowParaSports(false);
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="bottom-buttons">
          <button 
            className={`schedule-action-button ${activeSchedule === 'sports' ? 'active' : ''}`}
            onClick={() => {
              setActiveSchedule('sports');
              setShowParaSports(false);
            }}
          >
            Sports Schedule
          </button>
          <button 
            className={`schedule-action-button ${activeSchedule === 'cultural' ? 'active' : ''}`}
            onClick={() => {
              setActiveSchedule('cultural');
              setShowParaSports(false);
            }}
          >
            Culturals Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
