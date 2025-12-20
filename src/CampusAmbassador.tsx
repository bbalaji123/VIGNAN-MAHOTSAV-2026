import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';

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

          @media (max-width: 768px) {
            .hero-title {
              font-size: 2.5rem;
            }

            .hero-register-btn {
              padding: 0.875rem 2rem;
              font-size: 1rem;
            }

            .mahotsav-logo {
              width: 140px;
              top: 1rem;
              left: 1rem;
            }

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

            .back-button {
              top: 6.5rem;
              left: 1rem;
              padding: 0.5rem 1rem;
              font-size: 0.9rem;
            }
          }
        `}
      </style>

      {/* Mahotsav Logo */}
      <img 
        src={`${import.meta.env.BASE_URL}image.png`}
        alt="Vignan Mahotsav 2026"
        className="mahotsav-logo"
      />

      {/* Back to Dashboard Button */}
      <button 
        onClick={handleBackToDashboard}
        className="back-button"
        aria-label="Go back"
      >
        BACK
      </button>

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">CAMPUS AMBASSDOR</h1>
        <button 
          onClick={handleRegisterLogin}
          className="hero-register-btn"
        >
          Click Here To Register
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="ambassador-content">
          <h1 className="ambassador-title">MAHOTSAV CREW</h1>
          <h2 className="ambassador-subtitle">Vignan Mahotsav Campus Ambassador Program</h2>

          {/* Introduction Section */}
          <h3 className="section-title">1. Introduction</h3>
          <div className="section-content">
            <p>Mahotsav Crew- The Vignan Mahotsav 2026 Campus Ambassador (CA) Program is a student-driven initiative that empowers enthusiastic individuals to represent Vignan Mahotsav in their respective colleges. The program's primary goal is to promote the fest, expand outreach, and foster intercollegiate engagement through innovative campaigns and personal networks. It's a unique leadership opportunity to be the face of one of South India's largest cultural festivals.</p>
            <p>Being part of the Mahotsav Crew is not just about promotion — it is about becoming the face of a movement that celebrates youth, culture, and collaboration. For many, it becomes a memorable journey filled with opportunities, recognition, and unforgettable experiences.</p>
          </div>

          {/* Eligibility Criteria Section */}
          <h3 className="section-title">2. Eligibility Criteria</h3>
          <div className="section-content">
            <p>To become a Mahotsav Crew Campus Ambassador for Vignan Mahotsav 2026, the applicant must:</p>
            <p><strong>2.1 Current Enrollment:</strong> Must be a student in a recognized college/university (UG/PG).</p>
            <p><strong>2.2 Communication Skills:</strong> Able to connect and interact confidently with peers.</p>
            <p><strong>2.3 Proactive & Enthusiastic:</strong> Self-motivated, energetic, and ready to take initiative.</p>
            <p><strong>2.4 Creative & Innovative:</strong> Bring fresh ideas for online/offline fest promotions.</p>
            <p><strong>2.5 Time Management:</strong> Balance academics with ambassador tasks efficiently.</p>
            <p><strong>2.6 Passion for Events:</strong> Genuine interest in fests, marketing, and student activities.</p>
          </div>

          {/* Points Allotment Rules Section */}
          <h3 className="section-title">3. Points Allotment Rules</h3>
          <div className="section-content">
            <p>Campus Ambassadors will earn points based on their engagement and efforts across various categories.</p>
            
            <h4 style={{ color: '#fbbf24', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Outreach & Promotion</h4>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              marginBottom: '2rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Activity</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Resharing /Reposting official posts on social media</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>5 points/post</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Sharing in WhatsApp groups (50-100 mem) to (100-200 mem)</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>5 points/group to 10 points/group</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Creating original content (reels/blogs/memes)</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>15 points</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Organizing on-campus promotional events</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>20 points/event</td>
                </tr>
              </tbody>
            </table>

            <h4 style={{ color: '#fbbf24', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>B. Referrals & Signups</h4>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              marginBottom: '2rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Activity</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Referring a friend/Surrounding Colleges Students to sign up as a CA</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>20 points/referral</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Registering participants for Mahotsav</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>5 points/attendee</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Bridging team Mahotsav & Student Council of colleges</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>10 points/college</td>
                </tr>
              </tbody>
            </table>

            <h4 style={{ color: '#fbbf24', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>C. Performance Multipliers</h4>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              marginBottom: '2rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Special Cases</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Multiplier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>For colleges located at long distances</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Total Points= 4 x (multiplier + 1) x (number of participants)</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>For exceeding 50+ attendee registrations</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Bonus 50 points</td>
                </tr>
              </tbody>
            </table>
            <p style={{ fontStyle: 'italic', color: '#fbbf24' }}>➢ 4 x (multiplier + 1) x (number of participants) points Multiplier = (distance between VFSTR and admitted institute (in kms) /1000) * number of people. Get students to participate in events</p>
          </div>

          {/* Incentives & Rewards Section */}
          <h3 className="section-title">4. Incentives & Rewards (Extending this Based on Targets)</h3>
          <div className="section-content">
            <h4 style={{ color: '#fbbf24', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Rewards Based on Milestones</h4>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              marginBottom: '2rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Tier</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Milestone</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#000', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Bronze</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>100+ Points</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Free entry for the Fest + Certificate + Free Accommodation & Food</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Silver</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>150+ Points</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Receive the benefits of previous tier+ Branded Fest Merchandise(Cap) + "Zomato & Blink it Subscription"</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Gold</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>200+ Points</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Receive the benefits of previous tiers + Title of CA Lead + "Spotify Premium"</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Platinum</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>250+ points</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Receive the benefits of previous tiers + Fest Merchandise (Hoodie/ T-shirts) + Star Campus Ambassador + "Netflix Subscription"</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Diamond</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>250+ Points / Scope of Zonal at your respective Venue (Cities Excluding Vizag, Hyderabad, Tirupati, Chennai, Bangalore)</td>
                  <td style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(251, 191, 36, 0.3)' }}>Receive the benefits of previous tiers + On stage recognition + "Legend Campus Ambassador" + Certificate of Excellence + "ChatGPT Go Subscription"</td>
                </tr>
              </tbody>
            </table>

            <h4 style={{ color: '#fbbf24', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>B. Long-Term Benefits</h4>
            <p>Letter of Recommendation (LOR) from Vignan Mahotsav 2026.</p>
            <p>Exclusive access to workshops & guest lectures organized as part of Mahotsav 2026</p>
            <p>Recognition on Mahotsav 2026 Official Website (Gold Tier onwards)</p>
          </div>

          {/* Code of Conduct Section */}
          <h3 className="section-title">5. Code of Conduct</h3>
          <div className="section-content">
            <p>All Campus Ambassadors must:</p>
            <p>1. Maintain professionalism and uphold the brand reputation.</p>
            <p>2. Avoid spamming, false/misleading promotions.</p>
            <p>3. Respect the rules and policies of their own institutions during all promotional activities.</p>
            <p>4. Submit updates and progress reports when requested.</p>
          </div>

          {/* Program Duration & Review Section */}
          <h3 className="section-title">6. Program Duration & Review</h3>
          <div className="section-content">
            <p>The program will run from [Dec 2025] to [Feb 2026].</p>
            <p>Monthly performance reviews will be conducted based on point submissions and engagement.</p>
            <p>Final awards will be based on cumulative performance throughout the duration.</p>
          </div>

          {/* Contact Information */}
          <div className="contact-info">
            <h3 className="section-title" style={{ marginBottom: '1rem' }}>
              For any inquiries regarding the Campus Ambassador Program, please contact:
            </h3>
            <p className="contact-person">Mr. Brahma Teja : +91 8185865120</p>
            <p className="contact-person">Ms. Venkata Jagathi : +91 8341430174</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusAmbassador;
