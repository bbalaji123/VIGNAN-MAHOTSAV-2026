import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';

const CampusAmbassador: React.FC = () => {
  // Local state to control the incentives modal
  const [showIncentivesModal, setShowIncentivesModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'pointsAllotment' | 'incentives' | 'codeOfConduct' | 'programDuration'>('pointsAllotment');

  const navigate = useNavigate();

  // Back navigation handled by `BackButton` (navigate(-1))

  const handleRegisterLogin = () => {
    // Instead of navigating to the signup/login, show the Incentives & Rewards modal
    setShowIncentivesModal(true);
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
      <div className="fixed -top-32 -right-32 md:-top-64 md:-right-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-1">
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
      <div className="fixed -bottom-32 -left-32 md:-bottom-64 md:-left-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-1">
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
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }

          @keyframes sunRotateClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes moonStatic {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .flower-inner {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .hero-section {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            padding: 2rem;
            text-align: center;
          }

          .back-button {
            position: absolute;
            top: 8rem;
            left: 2rem;
            z-index: 1000;
            background: linear-gradient(135deg, #e48ab9, #c96ba1);
            color: #fff;
            padding: 0.75rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 5px 15px rgba(228, 138, 185, 0.4);
            text-transform: uppercase;
          }

          .back-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(228, 138, 185, 0.6);
          }

          .mahotsav-logo {
            position: absolute;
            top: 1.5rem;
            left: 2rem;
            z-index: 999;
            width: 400px;
            height: auto;
          }

          .hero-title {
            font-size: 5rem;
            font-weight: 700;
            color: #ffffff;
            text-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
            margin-bottom: 3rem;
            line-height: 1.2;
            letter-spacing: 0.05em;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.1s;
          }

          .hero-register-btn {
            background: linear-gradient(135deg, #e48ab9, #c96ba1);
            color: #fff;
            padding: 1rem 3rem;
            border-radius: 50px;
            font-weight: 700;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 5px 20px rgba(228, 138, 185, 0.4);
            text-transform: uppercase;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.3s;
          }

          .hero-register-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(228, 138, 185, 0.6);
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

          /* Mobile-first responsive styles handled by Tailwind classes in JSX */

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Mahotsav Logo */}
      <img 
        src={`${import.meta.env.BASE_URL}image.avif`}
        alt="Vignan Mahotsav 2026"
        className="absolute top-4 left-4 sm:top-0 sm:left-8 w-32 sm:w-48 md:w-64 lg:w-96 h-auto z-999"
      />

      {/* Back button (uses BackButton component to navigate back) */}
      <BackButton className="absolute top-20 sm:top-28 md:top-7 left-2 sm:left-8 z-1000" />

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 sm:mb-12 leading-tight tracking-wide opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]" style={{
          textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
        }}>MAHOTSAV CREW</h1>
        <button
          onClick={handleRegisterLogin}
          className="w-44 h-12 sm:w-48 sm:h-13 md:w-52 md:h-14 lg:w-56 lg:h-16 xl:w-64 xl:h-16 bg-linear-to-r from-pink-500 to-pink-600 text-white rounded-2xl text-sm sm:text-base md:text-lg lg:text-xl font-semibold cursor-pointer transition-all duration-300 hover:from-pink-600 hover:to-pink-700 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center touch-manipulation active:scale-95 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]"
        >
          Register/Login
        </button>
      </div>

      {/* Incentives & Rewards Modal (glass morphism) */}
      {showIncentivesModal && (
        <div className="fixed inset-0 z-10000 flex items-center justify-center px-4 animate-[fadeIn_0.3s_ease-out_forwards]">
          <div
            className="absolute inset-0 bg-black/50 animate-[fadeIn_0.2s_ease-out_forwards]"
            onClick={() => setShowIncentivesModal(false)}
          />
          <div className="relative w-full max-w-4xl max-h-[85vh] overflow-auto rounded-xl p-5 scrollbar-hide animate-[dropdownFade_0.4s_ease-out_forwards]" style={{
              margin: '0 auto',
              boxSizing: 'border-box',
              width: 'min(95vw, 900px)',
              minWidth: '320px',
              maxWidth: '900px',
              maxHeight: '85vh',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              background: 'rgba(199, 205, 28, 0.06)',
              backdropFilter: 'blur(8px) saturate(120%)',
              WebkitBackdropFilter: 'blur(8px) saturate(120%)',
              border: '1px solid rgba(255,255,255,0.12)'
            }}>
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
            <button
              onClick={() => setShowIncentivesModal(false)}
              style={{ position: 'absolute', right: 12, top: 12, cursor: 'pointer' }}
              className="text-white bg-transparent hover:opacity-90 hover:scale-110 transition-all duration-200 p-2 rounded"
              aria-label="Close incentives modal"
            >
              ✕
            </button>

           <div style={{ background: '#5b2d82', borderRadius: 14, padding: '32px 28px', color: '#fff' }}>
             <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 600, color: '#fbbf24', marginBottom: '1.5rem', fontStyle: 'italic' }}>Here's what being a Campus Ambassador (CA) gets you:</h2>

             <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
               <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: 10, padding: '18px 24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '1.05rem', lineHeight: 1.5, border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                 <span style={{ color: '#fbbf24', fontWeight: 700 }}>Bronze (100+ Points):</span>{' '}
                 <span style={{ color: '#fff' }}>Free entry for the Fest + Certificate + Free Accommodation & Food</span>
               </div>
               <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: 10, padding: '18px 24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '1.05rem', lineHeight: 1.5, border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                 <span style={{ color: '#fbbf24', fontWeight: 700 }}>Silver (150+ Points):</span>{' '}
                 <span style={{ color: '#fff' }}>Receive the benefits of previous tier + Branded Fest Merchandise(Cap) + "Zomato & Blink it Subscription"</span>
               </div>
               <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: 10, padding: '18px 24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '1.05rem', lineHeight: 1.5, border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                 <span style={{ color: '#fbbf24', fontWeight: 700 }}>Gold (200+ Points):</span>{' '}
                 <span style={{ color: '#fff' }}>Receive the benefits of previous tiers + Title of CA Lead + "Spotify Premium"</span>
               </div>
               <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: 10, padding: '18px 24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '1.05rem', lineHeight: 1.5, border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                 <span style={{ color: '#fbbf24', fontWeight: 700 }}>Platinum (250+ Points):</span>{' '}
                 <span style={{ color: '#fff' }}>Receive the benefits of previous tiers + Fest Merchandise (Hoodie/ T-shirts) + Star Campus Ambassador + "Netflix Subscription"</span>
               </div>
               <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: 10, padding: '18px 24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '1.05rem', lineHeight: 1.5, border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                 <span style={{ color: '#fbbf24', fontWeight: 700 }}>Diamond (250+ Points / Scope of Zonal at your respective Venue - Cities Excluding Vizag, Hyderabad, Tirupati, Chennai, Bangalore):</span>{' '}
                 <span style={{ color: '#fff' }}>Receive the benefits of previous tiers + On stage recognition + "Legend Campus Ambassador" + Certificate of Excellence + "ChatGPT Go Subscription"</span>
               </div>
             </div>


             <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
               <button
                 onClick={() => { setShowIncentivesModal(false); navigate('/', { state: { openLogin: true } }); }}
                 className="w-44 h-12 sm:w-48 sm:h-13 md:w-52 md:h-14 bg-linear-to-r from-pink-500 to-pink-600 text-white rounded-2xl text-sm sm:text-base md:text-lg font-semibold cursor-pointer transition-all duration-300 hover:from-pink-600 hover:to-pink-700 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center touch-manipulation active:scale-95"
               >
                 Register/Login
               </button>
             </div>
           </div>
          </div>
        </div>
      )}

      {/* What is Mahotsav Crew Section */}
      <div className="w-full py-16 sm:py-20 md:py-24 flex justify-center items-center px-4" style={{
        background: 'transparent',
        position: 'relative',
        marginBottom: '40vh'
      }}>
        <div style={{
          width: 'min(95vw, 75%)',
          maxWidth: '75%',
          minWidth: '320px',
          margin: '0 auto'
        }}>
          {/* Content Box */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '14px',
            padding: '70px 50px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 text-center" style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              letterSpacing: '0.02em',
              marginBottom: '32px'
            }}>
              What is Mahotsav Crew?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed" style={{
              textAlign: 'justify',
              lineHeight: '1.9',
              letterSpacing: '0.02em',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '100%'
            }}>
              Mahotsav Crew- The Vignan Mahotsav 2026 Campus Ambassador (CA) Program is a student-driven initiative that empowers enthusiastic individuals to represent Vignan Mahotsav in their respective colleges. The program's primary goal is to promote the fest, expand outreach, and foster intercollegiate engagement through innovative campaigns and personal networks. It's a unique leadership opportunity to be the face of one of South India's largest cultural festivals. Being part of the Mahotsav Crew is not just about promotion — it is about becoming the face of a movement that celebrates youth, culture, and collaboration. For many, it becomes a memorable journey filled with opportunities, recognition, and unforgettable experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Eligibility Criteria Section */}
      <div className="w-full py-16 sm:py-20 md:py-24 flex justify-center items-center px-4" style={{
        background: 'transparent',
        position: 'relative'
      }}>
        <div style={{
          width: 'min(95vw, 75%)',
          maxWidth: '75%',
          minWidth: '320px',
          margin: '0 auto'
        }}>
          {/* Content Box */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '14px',
            padding: '70px 50px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 text-center" style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              letterSpacing: '0.02em',
              marginBottom: '32px'
            }}>
              Eligibility Criteria
            </h2>
            <p className="text-base sm:text-lg text-white leading-relaxed sm:leading-loose mb-4" style={{
              textAlign: 'justify',
              lineHeight: '1.8',
              letterSpacing: '0.02em',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
            }}>
              To become a Mahotsav Crew Campus Ambassador for Vignan Mahotsav 2026, the applicant must:
            </p>
            <p className="text-base sm:text-lg text-white leading-relaxed sm:leading-loose mb-3" style={{
              textAlign: 'justify',
              lineHeight: '1.8',
              letterSpacing: '0.02em',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
            }}>
              <strong> Current Enrollment:</strong> Must be a student in a recognized college/university (UG/PG).
            </p>
            <p className="text-base sm:text-lg text-white leading-relaxed sm:leading-loose mb-3" style={{
              textAlign: 'justify',
              lineHeight: '1.8',
              letterSpacing: '0.02em',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
            }}>
              <strong> Communication Skills:</strong> Able to connect and interact confidently with peers.
            </p>
            <p className="text-base sm:text-lg text-white leading-relaxed sm:leading-loose mb-3" style={{
              textAlign: 'justify',
              lineHeight: '1.8',
              letterSpacing: '0.02em',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
            }}>
              <strong> Proactive & Enthusiastic:</strong> Self-motivated, energetic, and ready to take initiative.
            </p>
            <p className="text-base sm:text-lg text-white leading-relaxed sm:leading-loose mb-3" style={{
              textAlign: 'justify',
              lineHeight: '1.8',
              letterSpacing: '0.02em',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
            }}>
              <strong> Creative & Innovative:</strong> Bring fresh ideas for online/offline fest promotions.
            </p>
            <p className="text-base sm:text-lg text-white leading-relaxed sm:leading-loose mb-3" style={{
              textAlign: 'justify',
              lineHeight: '1.8',
              letterSpacing: '0.02em',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
            }}>
              <strong> Time Management:</strong> Balance academics with ambassador tasks efficiently.
            </p>
            <p className="text-base sm:text-lg text-white leading-relaxed sm:leading-loose" style={{
              textAlign: 'justify',
              lineHeight: '1.8',
              letterSpacing: '0.02em',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
            }}>
              <strong> Passion for Events:</strong> Genuine interest in fests, marketing, and student activities.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation Section */}
      <div className="w-full px-4" style={{
        marginTop: '6rem',
        marginBottom: '4rem'
      }}>
        <div style={{
          width: 'min(95vw, 75%)',
          maxWidth: '75%',
          minWidth: '320px',
          margin: '0 auto'
        }}>
          {/* Tab Navigation Buttons */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-12 sm:mb-14 md:mb-16 overflow-x-auto" style={{
            scrollbarWidth: 'thin',
            WebkitOverflowScrolling: 'touch'
          }}>
            <button 
              className="w-44 h-12 sm:w-48 sm:h-13 md:w-52 md:h-14 lg:w-56 lg:h-16 text-white rounded-2xl text-sm sm:text-base md:text-lg font-semibold cursor-pointer transition-all duration-300 hover:from-pink-600 hover:to-pink-700 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center touch-manipulation active:scale-95"
              style={{
                background: activeTab === 'pointsAllotment' ? 'linear-gradient(to right, #ec4899, #db2777)' : 'linear-gradient(to right, rgba(236, 72, 153, 0.5), rgba(219, 39, 119, 0.5))'
              }}
              onClick={() => setActiveTab('pointsAllotment')}
            >
              Points Allotment
            </button>
            <button 
              className="w-44 h-12 sm:w-48 sm:h-13 md:w-52 md:h-14 lg:w-56 lg:h-16 text-white rounded-2xl text-sm sm:text-base md:text-lg font-semibold cursor-pointer transition-all duration-300 hover:from-pink-600 hover:to-pink-700 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center touch-manipulation active:scale-95"
              style={{
                background: activeTab === 'incentives' ? 'linear-gradient(to right, #ec4899, #db2777)' : 'linear-gradient(to right, rgba(236, 72, 153, 0.5), rgba(219, 39, 119, 0.5))'
              }}
              onClick={() => setActiveTab('incentives')}
            >
              Incentives
            </button>
            <button 
              className="w-44 h-12 sm:w-48 sm:h-13 md:w-52 md:h-14 lg:w-56 lg:h-16 text-white rounded-2xl text-sm sm:text-base md:text-lg font-semibold cursor-pointer transition-all duration-300 hover:from-pink-600 hover:to-pink-700 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center touch-manipulation active:scale-95"
              style={{
                background: activeTab === 'codeOfConduct' ? 'linear-gradient(to right, #ec4899, #db2777)' : 'linear-gradient(to right, rgba(236, 72, 153, 0.5), rgba(219, 39, 119, 0.5))'
              }}
              onClick={() => setActiveTab('codeOfConduct')}
            >
              Code of Conduct
            </button>
            <button 
              className="w-44 h-12 sm:w-48 sm:h-13 md:w-52 md:h-14 lg:w-56 lg:h-16 text-white rounded-2xl text-sm sm:text-base md:text-lg font-semibold cursor-pointer transition-all duration-300 hover:from-pink-600 hover:to-pink-700 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center touch-manipulation active:scale-95"
              style={{
                background: activeTab === 'programDuration' ? 'linear-gradient(to right, #ec4899, #db2777)' : 'linear-gradient(to right, rgba(236, 72, 153, 0.5), rgba(219, 39, 119, 0.5))'
              }}
              onClick={() => setActiveTab('programDuration')}
            >
              Program Duration
            </button>
          </div>

          {/* Content Container */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '14px',
            padding: '70px 50px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minHeight: '400px',
            marginTop: '3rem',
            scrollMarginTop: '8rem'
          }}>
            {activeTab === 'pointsAllotment' && (
              <div className="text-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-6" style={{ scrollMarginTop: '8rem' }}>Points Allotment Rules</h2>
                <p className="mb-6 text-base sm:text-lg" style={{ lineHeight: '1.8' }}>Campus Ambassadors will earn points based on their engagement and efforts across various categories.</p>
                
                <h4 style={{ color: '#fbbf24', fontSize: 'clamp(1rem, 3vw, 1.2rem)', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Outreach & Promotion</h4>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table style={{ 
                  width: '100%',
                  minWidth: '500px',
                  borderCollapse: 'collapse', 
                  marginBottom: '2rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}>
                      <th style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Activity</th>
                      <th style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Resharing /Reposting official posts on social media</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>5 points/post</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Sharing in WhatsApp groups (50-100 mem) to (100-200 mem)</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>5 points/group to 10 points/group</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Creating original content (reels/blogs/memes)</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>15 points</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Organizing on-campus promotional events</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>20 points/event</td>
                    </tr>
                  </tbody>
                </table>
                </div>

                <h4 style={{ color: '#fbbf24', fontSize: 'clamp(1rem, 3vw, 1.2rem)', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>B. Referrals & Signups</h4>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table style={{ 
                  width: '100%',
                  minWidth: '500px',
                  borderCollapse: 'collapse', 
                  marginBottom: '2rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}>
                      <th style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Activity</th>
                      <th style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Referring a friend/Surrounding Colleges Students to sign up as a CA</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>20 points/referral</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Registering participants for Mahotsav</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>5 points/attendee</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Bridging team Mahotsav & Student Council of colleges</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>10 points/college</td>
                    </tr>
                  </tbody>
                </table>
                </div>

                <h4 style={{ color: '#fbbf24', fontSize: 'clamp(1rem, 3vw, 1.2rem)', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>C. Performance Multipliers</h4>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table style={{ 
                  width: '100%',
                  minWidth: '500px',
                  borderCollapse: 'collapse', 
                  marginBottom: '2rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}>
                      <th style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Special Cases</th>
                      <th style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Multiplier</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>For colleges located at long distances</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Total Points= 4 x (multiplier + 1) x (number of participants)</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>For exceeding 50+ attendee registrations</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Bonus 50 points</td>
                    </tr>
                  </tbody>
                </table>
                </div>
                <p style={{ fontStyle: 'italic', color: '#fbbf24', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>➢ 4 x (multiplier + 1) x (number of participants) points Multiplier = (distance between VFSTR and admitted institute (in kms) /1000) * number of people. Get students to participate in events</p>
              </div>
            )}

            {activeTab === 'incentives' && (
              <div className="text-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-6" style={{ scrollMarginTop: '8rem' }}>Incentives & Rewards (Extending this Based on Targets)</h2>
                <h4 style={{ color: '#fbbf24', fontSize: 'clamp(1rem, 3vw, 1.2rem)', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Rewards Based on Milestones</h4>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table style={{ 
                  width: '100%',
                  minWidth: '600px',
                  borderCollapse: 'collapse', 
                  marginBottom: '2rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}>
                      <th style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Tier</th>
                      <th style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Milestone</th>
                      <th style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Reward</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Bronze</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>100+ Points</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Free entry for the Fest + Certificate + Free Accommodation & Food</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Silver</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>150+ Points</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Receive the benefits of previous tier+ Branded Fest Merchandise(Cap) + "Zomato & Blink it Subscription"</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Gold</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>200+ Points</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Receive the benefits of previous tiers + Title of CA Lead + "Spotify Premium"</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Platinum</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>250+ points</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Receive the benefits of previous tiers + Fest Merchandise (Hoodie/ T-shirts) + Star Campus Ambassador + "Netflix Subscription"</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Diamond</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>250+ Points / Scope of Zonal at your respective Venue (Cities Excluding Vizag, Hyderabad, Tirupati, Chennai, Bangalore)</td>
                      <td style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Receive the benefits of previous tiers + On stage recognition + "Legend Campus Ambassador" + Certificate of Excellence + "ChatGPT Go Subscription"</td>
                    </tr>
                  </tbody>
                </table>
                </div>

                  <h4 style={{ color: '#fbbf24', fontSize: 'clamp(1rem, 3vw, 1.2rem)', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>B. Long-Term Benefits</h4>
                  <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)', marginBottom: '0.5rem' }}>Letter of Recommendation (LOR) from Vignan Mahotsav 2026.</p>
                  <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)', marginBottom: '0.5rem' }}>Exclusive access to workshops & guest lectures organized as part of Mahotsav 2026</p>
                  <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Recognition on Mahotsav 2026 Official Website (Gold Tier onwards)</p>
              </div>
            )}

            {activeTab === 'codeOfConduct' && (
              <div className="text-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-6" style={{ scrollMarginTop: '8rem' }}> Code of Conduct</h2>
                <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)', marginBottom: '1rem' }}>All Campus Ambassadors must:</p>
                <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)', marginBottom: '0.5rem' }}>1. Maintain professionalism and uphold the brand reputation.</p>
                <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)', marginBottom: '0.5rem' }}>2. Avoid spamming, false/misleading promotions.</p>
                <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)', marginBottom: '0.5rem' }}>3. Respect the rules and policies of their own institutions during all promotional activities.</p>
                <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>4. Submit updates and progress reports when requested.</p>
              </div>
            )}

            {activeTab === 'programDuration' && (
              <div className="text-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-6" style={{ scrollMarginTop: '8rem' }}>Program Duration & Review</h2>
                <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)', marginBottom: '0.5rem' }}>The program will run from [Dec 2025] to [Feb 2026].</p>
                <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)', marginBottom: '0.5rem' }}>Monthly performance reviews will be conducted based on point submissions and engagement.</p>
                <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Final awards will be based on cumulative performance throughout the duration.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="w-full py-12 flex justify-center items-center px-4">
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-lg" style={{
          maxWidth: '900px',
          width: '100%'
        }}>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6">
            For any inquiries regarding the Campus Ambassador Program, please contact:
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-white mb-2">
            Mr. Srivatsav : <a href="tel:+919441934549" className="text-white hover:text-yellow-400 transition-colors">+91 9441934549</a>
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white">
            Ms. Ojaswi : <a href="tel:+919418234545" className="text-white hover:text-yellow-400 transition-colors">+91 9418234545</a>
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer-section" style={{
        background: '#000',
        width: '100vw',
        position: 'relative',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        marginTop: '80px',
        marginBottom: '0',
        padding: '0',
        boxSizing: 'border-box'
      }}>
        {/* Footer Content Wrapper */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '40px 40px 0 40px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '50px'
          }}>
          {/* Logo Section */}
          <div>
            <img 
              src={`${import.meta.env.BASE_URL}image.avif`}
              alt="Mahotsav 2026" 
              style={{
                height: '80px',
                objectFit: 'contain',
                marginBottom: '25px'
              }}
            />
            {/* Social Media Icons */}
            <h3 style={{
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              letterSpacing: '1px'
            }}>FOLLOW US ON :</h3>
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <a href="https://www.instagram.com/vignan_mahotsav/profilecard/?igsh=dDE1MHNpcmM4eXhm" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://whatsapp.com/channel/0029Vars0ZXJ3jutqK5hfj3r" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/vignan-mahotsav" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 style={{
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              letterSpacing: '1px'
            }}>CONTACT US :</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 6 10-6"/>
                </svg>
                <span style={{ color: '#fff', fontSize: '1rem' }}>mahotsav@vignan.ac.in</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span style={{ color: '#fff', fontSize: '1rem' }}>+91 94930 33592</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span style={{ color: '#fff', fontSize: '1rem' }}>+91 90305 57363</span>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div>
            <h3 style={{
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              letterSpacing: '1px'
            }}>LOCATION :</h3>
            <div style={{ display: 'flex', alignItems: 'start', gap: '15px', marginBottom: '20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginTop: '4px', flexShrink: 0 }}>
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <p style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.8', margin: 0 }}>
                VIGNAN'S FOUNDATION FOR SCIENCE, TECHNOLOGY & RESEARCH (DEEMED TO BE UNIVERSITY), VADLAMUDI, GUNTUR, A.P -522213
              </p>
            </div>
            <a 
              href="https://maps.app.goo.gl/5pufqAcYqKrQCyQZ6" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#a78bfa',
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '10px',
                transition: 'color 0.3s'
              }}
            >
              VIEW ON GOOGLE MAPS
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CampusAmbassador;
