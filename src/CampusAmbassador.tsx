import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';

const CampusAmbassador: React.FC = () => {
  // Local state to control the incentives modal
  const [showIncentivesModal, setShowIncentivesModal] = useState(false);

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
        className="absolute top-4 left-4 sm:top-6 sm:left-8 w-32 sm:w-48 md:w-64 lg:w-96 h-auto z-[999]"
      />

      {/* Back button (uses BackButton component to navigate back) */}
      <BackButton className="absolute top-20 sm:top-28 md:top-7 left-2 sm:left-8 z-[1000]" />

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 sm:mb-12 leading-tight tracking-wide opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]" style={{
          textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
        }}>MAHOTSAV CREW</h1>
        <button
          onClick={handleRegisterLogin}
          className="w-44 h-12 sm:w-48 sm:h-13 md:w-52 md:h-14 lg:w-56 lg:h-16 xl:w-64 xl:h-16 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl text-sm sm:text-base md:text-lg lg:text-xl font-semibold cursor-pointer transition-all duration-300 hover:from-pink-600 hover:to-pink-700 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center touch-manipulation active:scale-95 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]"
        >
          Register/Login
        </button>
      </div>

      {/* Incentives & Rewards Modal (glass morphism) */}
      {showIncentivesModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4 animate-[fadeIn_0.3s_ease-out_forwards]">
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
                 className="w-44 h-12 sm:w-48 sm:h-13 md:w-52 md:h-14 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl text-sm sm:text-base md:text-lg font-semibold cursor-pointer transition-all duration-300 hover:from-pink-600 hover:to-pink-700 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center touch-manipulation active:scale-95"
               >
                 Register/Login
               </button>
             </div>
           </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 lg:ml-[15%] opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8" style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
          }}>MAHOTSAV CREW</h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-red-500 mb-8 sm:mb-12">Vignan Mahotsav Campus Ambassador Program</h2>

          {/* Introduction Section */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6 mt-6 sm:mt-8">1. Introduction</h3>
          <div className="text-white leading-relaxed sm:leading-loose text-sm sm:text-base mb-6 sm:mb-8">
            <p>Mahotsav Crew- The Vignan Mahotsav 2026 Campus Ambassador (CA) Program is a student-driven initiative that empowers enthusiastic individuals to represent Vignan Mahotsav in their respective colleges. The program's primary goal is to promote the fest, expand outreach, and foster intercollegiate engagement through innovative campaigns and personal networks. It's a unique leadership opportunity to be the face of one of South India's largest cultural festivals.</p>
            <p>Being part of the Mahotsav Crew is not just about promotion — it is about becoming the face of a movement that celebrates youth, culture, and collaboration. For many, it becomes a memorable journey filled with opportunities, recognition, and unforgettable experiences.</p>
          </div>

          {/* Eligibility Criteria Section */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6 mt-6 sm:mt-8">2. Eligibility Criteria</h3>
          <div className="text-white leading-relaxed sm:leading-loose text-sm sm:text-base mb-6 sm:mb-8">
            <p>To become a Mahotsav Crew Campus Ambassador for Vignan Mahotsav 2026, the applicant must:</p>
            <p><strong>2.1 Current Enrollment:</strong> Must be a student in a recognized college/university (UG/PG).</p>
            <p><strong>2.2 Communication Skills:</strong> Able to connect and interact confidently with peers.</p>
            <p><strong>2.3 Proactive & Enthusiastic:</strong> Self-motivated, energetic, and ready to take initiative.</p>
            <p><strong>2.4 Creative & Innovative:</strong> Bring fresh ideas for online/offline fest promotions.</p>
            <p><strong>2.5 Time Management:</strong> Balance academics with ambassador tasks efficiently.</p>
            <p><strong>2.6 Passion for Events:</strong> Genuine interest in fests, marketing, and student activities.</p>
          </div>

          {/* Points Allotment Rules Section */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6 mt-6 sm:mt-8">3. Points Allotment Rules</h3>
          <div className="text-white leading-relaxed sm:leading-loose text-sm sm:text-base mb-6 sm:mb-8">
            <p>Campus Ambassadors will earn points based on their engagement and efforts across various categories.</p>
            
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

          {/* Incentives & Rewards Section */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6 mt-6 sm:mt-8">4. Incentives & Rewards (Extending this Based on Targets)</h3>
          <div className="text-white leading-relaxed sm:leading-loose text-sm sm:text-base mb-6 sm:mb-8">
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
              <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Letter of Recommendation (LOR) from Vignan Mahotsav 2026.</p>
              <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Exclusive access to workshops & guest lectures organized as part of Mahotsav 2026</p>
              <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Recognition on Mahotsav 2026 Official Website (Gold Tier onwards)</p>
          </div>

          {/* Code of Conduct Section */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6 mt-6 sm:mt-8">5. Code of Conduct</h3>
          <div className="text-white leading-relaxed sm:leading-loose text-sm sm:text-base mb-6 sm:mb-8">
            <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>All Campus Ambassadors must:</p>
            <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>1. Maintain professionalism and uphold the brand reputation.</p>
            <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>2. Avoid spamming, false/misleading promotions.</p>
            <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>3. Respect the rules and policies of their own institutions during all promotional activities.</p>
            <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>4. Submit updates and progress reports when requested.</p>
          </div>

          {/* Program Duration & Review Section */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6 mt-6 sm:mt-8">6. Program Duration & Review</h3>
          <div className="text-white leading-relaxed sm:leading-loose text-sm sm:text-base mb-6 sm:mb-8">
            <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>The program will run from [Dec 2025] to [Feb 2026].</p>
            <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Monthly performance reviews will be conducted based on point submissions and engagement.</p>
            <p style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Final awards will be based on cumulative performance throughout the duration.</p>
          </div>

          {/* Contact Information */}
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-lg" style={{
            background: 'rgba(228, 138, 185, 0.1)',
            border: '2px solid rgba(228, 138, 185, 0.3)'
          }}>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6">
              For any inquiries regarding the Campus Ambassador Program, please contact:
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-white mb-2">Mr. Brahma Teja : +91 8185865120</p>
            <p className="text-base sm:text-lg md:text-xl text-white">Ms. Venkata Jagathi : +91 8341430174</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampusAmbassador;
