import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';

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

          .schedule-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 1rem;
            position: relative;
            z-index: 1;
          }
          
          @media (min-width: 640px) {
            .schedule-content {
              padding: 1.5rem;
            }
          }
          
          @media (min-width: 1024px) {
            .schedule-content {
              padding: 2rem;
            }
          }

          .schedule-title {
            font-size: 2rem;
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
          
          @media (min-width: 640px) {
            .schedule-title {
              font-size: 2.5rem;
            }
          }
          
          @media (min-width: 1024px) {
            .schedule-title {
              font-size: 3.5rem;
            }
          }

          .schedule-subtitle {
            font-size: 1.125rem;
            font-weight: 600;
            text-align: center;
            color: #ffffff;
            margin-bottom: 1.5rem;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.3s;
          }
          
          @media (min-width: 640px) {
            .schedule-subtitle {
              font-size: 1.25rem;
            }
          }
          
          @media (min-width: 1024px) {
            .schedule-subtitle {
              font-size: 1.8rem;
              margin-bottom: 2rem;
            }
          }

          .category-button {
            background: rgba(30, 30, 30, 0.8);
            border: 1px solid rgba(253, 238, 113, 0.3);
            border-radius: 10px;
            color: #ffffff;
            padding: 0.75rem 1rem;
            min-height: 44px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            font-size: 0.875rem;
            letter-spacing: 0.3px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
            touch-action: manipulation;
          }
          
          @media (min-width: 640px) {
            .category-button {
              padding: 0.9rem 1.2rem;
              font-size: 0.95rem;
            }
          }
          
          @media (min-width: 1024px) {
            .category-button {
              padding: 1rem 1.25rem;
            }
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
            padding: 1rem;
            min-height: 400px;
            border: 2px solid rgba(253, 238, 113, 0.2);
          }
          
          @media (min-width: 640px) {
            .main-content {
              padding: 1.5rem;
              min-height: 500px;
            }
          }
          
          @media (min-width: 1024px) {
            .main-content {
              padding: 2.5rem;
              min-height: 600px;
            }
          }

          .event-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1.5rem;
          }

          .event-table th {
            background: linear-gradient(135deg, #fdee71, #e48ab9);
            color: #000;
            padding: 0.625rem 0.75rem;
            text-align: left;
            font-weight: 700;
            border: 1px solid rgba(253, 238, 113, 0.3);
            font-size: 0.75rem;
            letter-spacing: 0.3px;
          }

          .event-table td {
            color: #ffffff;
            padding: 0.625rem 0.75rem;
            border: 1px solid rgba(253, 238, 113, 0.3);
            background: rgba(0, 0, 0, 0.3);
            font-size: 0.75rem;
          }
          
          @media (min-width: 640px) {
            .event-table th,
            .event-table td {
              padding: 0.75rem 1rem;
              font-size: 0.875rem;
            }
          }
          
          @media (min-width: 1024px) {
            .event-table th {
              padding: 1rem 1.5rem;
              font-size: 1rem;
              letter-spacing: 0.5px;
            }
            
            .event-table td {
              padding: 1rem 1.5rem;
              font-size: 1rem;
            }
          }

          .bottom-buttons {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: stretch;
            gap: 1rem;
            margin-top: 2rem;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.7s;
          }
          
          @media (min-width: 640px) {
            .bottom-buttons {
              flex-direction: row;
              align-items: center;
              gap: 1.5rem;
              margin-top: 2.5rem;
            }
          }
          
          @media (min-width: 1024px) {
            .bottom-buttons {
              gap: 2.5rem;
              margin-top: 3rem;
            }
          }

          .schedule-action-button {
            background: linear-gradient(135deg, #e48ab9, #c96ba1);
            color: #ffffff;
            padding: 0.75rem 1.5rem;
            min-height: 48px;
            width: 100%;
            border-radius: 50px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 5px 20px rgba(245, 158, 11, 0.4);
            font-size: 0.875rem;
            letter-spacing: 0.6px;
            text-transform: uppercase;
            touch-action: manipulation;
          }
          
          @media (min-width: 640px) {
            .schedule-action-button {
              width: auto;
              padding: 0.9rem 2rem;
              font-size: 0.95rem;
              letter-spacing: 0.7px;
            }
          }
          
          @media (min-width: 1024px) {
            .schedule-action-button {
              padding: 0.9rem 2.5rem;
              font-size: 1rem;
              letter-spacing: 0.8px;
            }
          }

          .schedule-action-button:hover {
            background: linear-gradient(135deg, #fdee71, #e48ab9);
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(253, 238, 113, 0.6);
          }
          
          .schedule-action-button:active {
            transform: scale(0.98);
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
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1rem 0;
          }
          
          @media (min-width: 768px) {
            .parasports-cards-container {
              grid-template-columns: repeat(2, 1fr);
              gap: 2rem;
              padding: 1.5rem 0;
            }
          }
          
          @media (min-width: 1024px) {
            .parasports-cards-container {
              gap: 2.5rem;
              padding: 2rem 0;
            }
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
            padding: 1.25rem;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.4s ease;
            animation: neonPulse 3s infinite;
            touch-action: manipulation;
          }
          
          @media (min-width: 640px) {
            .neon-card {
              padding: 1.5rem;
            }
          }
          
          @media (min-width: 1024px) {
            .neon-card {
              padding: 2rem;
            }
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
            height: 200px;
            background: rgba(0, 0, 0, 0.6);
            border: 2px solid rgba(253, 238, 113, 0.3);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            position: relative;
            overflow: hidden;
          }
          
          @media (min-width: 640px) {
            .card-icon-area {
              height: 250px;
              margin-bottom: 1.25rem;
            }
          }
          
          @media (min-width: 1024px) {
            .card-icon-area {
              height: 300px;
              margin-bottom: 1.5rem;
            }
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
            font-size: 1.25rem;
            font-weight: bold;
            text-align: center;
            background: linear-gradient(135deg, #fdee71, #e48ab9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          
          @media (min-width: 640px) {
            .card-title {
              font-size: 1.5rem;
              letter-spacing: 0.75px;
            }
          }
          
          @media (min-width: 1024px) {
            .card-title {
              font-size: 1.8rem;
              letter-spacing: 1px;
            }
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

          /* Mobile-first responsive styles handled by Tailwind classes in JSX */
        `}
      </style>

      {/* Back Button */}
      <BackButton onClick={handleBackClick} />

      {/* Main Content */}
      <div className="schedule-content">
        <h1 className="schedule-title">SCHEDULE</h1>
        <h2 className="schedule-subtitle">EVENT DETAILS</h2>

        {/* Mobile: Stack vertically, Desktop: 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr_230px] gap-4 lg:gap-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
          {/* Left Sidebar - Cultural Categories */}
          <div className="flex flex-col gap-3">
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
          <div className="main-content order-first lg:order-none">
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
              <div className="overflow-x-auto">
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
              </div>
            )}
          </div>

          {/* Right Sidebar - Sports Categories */}
          <div className="flex flex-col gap-3">
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
