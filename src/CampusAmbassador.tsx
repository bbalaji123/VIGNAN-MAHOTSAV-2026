import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const CampusAmbassador: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/');
  };

  const handleRegisterLogin = () => {
    // Navigate to home page and trigger login modal
    navigate('/', { state: { openLogin: true } });
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
            width: 600px;
            height: 600px;
            overflow: hidden;
          }
          
          .flower-inner {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          
          .flower-container-mobile:first-of-type .flower-inner {
            top: -48%;
            right: -48%;
          }
          
          .flower-container-mobile:nth-of-type(2) .flower-inner {
            bottom: -48%;
            left: -48%;
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
            to { transform: rotate(720deg); }
          }
          
          @keyframes moonStatic {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .ambassador-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            margin-left: 15%;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.1s;
          }

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .ambassador-title {
            font-size: 3rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 2rem;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
          }

          .ambassador-subtitle {
            font-size: 1.5rem;
            font-weight: 600;
            text-align: center;
            color: #ef4444;
            margin-bottom: 3rem;
          }

          .section-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #fbbf24;
            margin-bottom: 1.5rem;
            margin-top: 2rem;
          }

          .section-content {
            color: #fff;
            line-height: 1.8;
            font-size: 1rem;
            margin-bottom: 2rem;
          }

          .section-content p {
            margin-bottom: 1rem;
            padding-left: 1.5rem;
            position: relative;
            color: #fff;
            background: none;
            border: none;
            box-shadow: none;
          }

          .section-content p::before {
            content: "◆";
            position: absolute;
            left: 0;
            color: #fbbf24;
          }

          .section-content p strong {
            color: #fbbf24;
          }

          .contact-info {
            text-align: center;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(251, 191, 36, 0.3);
          }

          .contact-person {
            color: #fff;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
          }

          .register-btn {
            display: inline-block;
            margin-top: 2rem;
            padding: 1rem 3rem;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: #000;
            font-weight: bold;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
            font-size: 1.1rem;
          }

          .register-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
          }

          @media (max-width: 768px) {
            .ambassador-title {
              font-size: 2rem;
            }
            
            .ambassador-subtitle {
              font-size: 1.2rem;
            }
            
            .ambassador-content {
              padding: 1rem;
              margin-left: 0;
            }
            
            .ambassador-section {
              padding: 1.5rem;
            }
          }
        `}
      </style>

      {/* Back to Dashboard Button */}
      <button 
        onClick={handleBackToDashboard}
        className="circular-back-button"
        aria-label="Go back"
      >
      </button>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center min-h-screen py-20">
        <div className="ambassador-content">
          <h1 className="ambassador-title">CAMPUS AMBASSADOR</h1>
          <h2 className="ambassador-subtitle">Rules & Regulations</h2>

          {/* Responsibilities Section */}
          <h3 className="section-title">1. Responsibilities</h3>
          <div className="section-content">
            <p>Act as the primary point of contact between Vignan Mahotsav 2025 and your college.</p>
            <p>Actively promote the festival within your college through various channels, including but not limited to: Distributing official Vignan Mahotsav 2025 posters and flyers.</p>
            <p>Organizing on-campus promotional events (e.g., information sessions, social media campaigns).</p>
            <p>Utilizing college networks and student forums to spread awareness.</p>
            <p>Achieve a minimum registration target: Secure at least 50 registrations for Vignan Mahotsav 2025 from students within your college.</p>
          </div>

          {/* Benefits Section */}
          <h3 className="section-title">2. Benefits</h3>
          <div className="section-content">
            <p><strong>Free Registration:</strong> Complimentary access to all Vignan Mahotsav 2025 events and activities.</p>
            <p><strong>Complimentary Accommodation & Meals:</strong> Provision of comfortable accommodation and nutritious meals throughout the festival duration.</p>
            <p><strong>Exclusive Goodie Bag:</strong> Receive a Vignan Mahotsav 2025 T-shirt, jacket, or another exclusive merchandise item.</p>
            <p><strong>Certificate of Appreciation:</strong> Acknowledgement of your valuable contributions with a personalized Certificate of Appreciation.</p>
            <p><strong>Letter of Recommendation:</strong> Opportunity to receive a Letter of Recommendation from Vignan Mahotsav 2025, highlighting your leadership, initiative, and promotional skills.</p>
            <p><strong>"Best Campus Ambassador" Award:</strong> The top 3 performing ambassadors, based on registration numbers, will be recognized as "Best Campus Ambassador" and receive a special award.</p>
          </div>

          {/* Eligibility Section */}
          <h3 className="section-title">3. Eligibility</h3>
          <div className="section-content">
            <p>Must be a currently enrolled student at a recognized college or university.</p>
            <p>Possess strong interpersonal and communication skills.</p>
            <p>Be enthusiastic, proactive, and committed to promoting Vignan Mahotsav 2025.</p>
          </div>

          {/* Disclaimer Section */}
          <h3 className="section-title">4. Disclaimer</h3>
          <div className="section-content">
            <p>The Vignan Mahotsav 2025 organizing committee reserves the right to modify these rules and regulations at any time.</p>
          </div>

          {/* Contact Information */}
          <div className="contact-info">
            <h3 className="section-title" style={{ marginBottom: '1rem' }}>
              For any inquiries regarding the Campus Ambassador Program, please contact:
            </h3>
            <p className="contact-person">Mr. Brahma Teja : +91 8185865120</p>
            <p className="contact-person">Ms. Venkata Jagathi : +91 8341430174</p>

            {/* Register/Login Button */}
            <div className="text-center">
              <button 
                onClick={handleRegisterLogin}
                className="register-btn"
              >
                Register / Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusAmbassador;
