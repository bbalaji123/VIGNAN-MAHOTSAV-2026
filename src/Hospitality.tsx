import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import GarudaBubble from './GarudaBubble';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';

const Hospitality: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'instructions' | 'howToReach' | 'accommodation' | 'contacts' | 'faqs'>('instructions');

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

          /* Mobile-first responsive styles handled by Tailwind classes in JSX */
        `}
      </style>

      {/* Back Button */}
      <BackButton onClick={handleBackClick} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:ml-[15%]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 sm:mb-6 md:mb-8" style={{
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
        }}>HOSPITALITY</h1>
        
        {/* Mobile Dropdown Navigation */}
        <select 
          className="block md:hidden w-full max-w-md mx-auto mb-6 sm:mb-8 px-4 py-3 sm:py-4 bg-white/10 border-2 border-yellow-400/50 rounded-xl text-white font-semibold text-sm sm:text-base uppercase cursor-pointer backdrop-blur-md appearance-none focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(251,191,36,0.4)] touch-manipulation"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23fbbf24\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            backgroundSize: '24px',
            paddingRight: '3rem'
          }}
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as 'instructions' | 'howToReach' | 'accommodation' | 'contacts' | 'faqs')}
        >
          <option value="instructions" style={{ background: '#522566', color: '#ffffff' }}>Instructions</option>
          <option value="howToReach" style={{ background: '#522566', color: '#ffffff' }}>How to Reach</option>
          <option value="accommodation" style={{ background: '#522566', color: '#ffffff' }}>Accommodation</option>
          <option value="contacts" style={{ background: '#522566', color: '#ffffff' }}>Contacts</option>
          <option value="faqs" style={{ background: '#522566', color: '#ffffff' }}>FAQ's</option>
        </select>

        {/* Desktop Tab Navigation */}
        <div className="hidden md:flex justify-center gap-3 lg:gap-4 mb-6 sm:mb-8 flex-wrap px-4">
          <button 
            className={`min-h-[48px] px-4 sm:px-6 py-3 rounded-full font-semibold text-sm lg:text-base uppercase tracking-wide transition-all duration-300 touch-manipulation active:scale-95 ${
              activeTab === 'instructions' 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-[0_5px_15px_rgba(251,191,36,0.4)]' 
                : 'bg-white/10 border-2 border-yellow-400/30 text-white hover:bg-yellow-400/20 hover:border-yellow-400/60 hover:-translate-y-0.5'
            }`}
            onClick={() => setActiveTab('instructions')}
          >
            Instructions
          </button>
          <button 
            className={`min-h-[48px] px-4 sm:px-6 py-3 rounded-full font-semibold text-sm lg:text-base uppercase tracking-wide transition-all duration-300 touch-manipulation active:scale-95 ${
              activeTab === 'howToReach' 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-[0_5px_15px_rgba(251,191,36,0.4)]' 
                : 'bg-white/10 border-2 border-yellow-400/30 text-white hover:bg-yellow-400/20 hover:border-yellow-400/60 hover:-translate-y-0.5'
            }`}
            onClick={() => setActiveTab('howToReach')}
          >
            How to Reach
          </button>
          <button 
            className={`min-h-[48px] px-4 sm:px-6 py-3 rounded-full font-semibold text-sm lg:text-base uppercase tracking-wide transition-all duration-300 touch-manipulation active:scale-95 ${
              activeTab === 'accommodation' 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-[0_5px_15px_rgba(251,191,36,0.4)]' 
                : 'bg-white/10 border-2 border-yellow-400/30 text-white hover:bg-yellow-400/20 hover:border-yellow-400/60 hover:-translate-y-0.5'
            }`}
            onClick={() => setActiveTab('accommodation')}
          >
            Accommodation
          </button>
          <button 
            className={`min-h-[48px] px-4 sm:px-6 py-3 rounded-full font-semibold text-sm lg:text-base uppercase tracking-wide transition-all duration-300 touch-manipulation active:scale-95 ${
              activeTab === 'contacts' 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-[0_5px_15px_rgba(251,191,36,0.4)]' 
                : 'bg-white/10 border-2 border-yellow-400/30 text-white hover:bg-yellow-400/20 hover:border-yellow-400/60 hover:-translate-y-0.5'
            }`}
            onClick={() => setActiveTab('contacts')}
          >
            Contacts
          </button>
          <button 
            className={`min-h-[48px] px-4 sm:px-6 py-3 rounded-full font-semibold text-sm lg:text-base uppercase tracking-wide transition-all duration-300 touch-manipulation active:scale-95 ${
              activeTab === 'faqs' 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-[0_5px_15px_rgba(251,191,36,0.4)]' 
                : 'bg-white/10 border-2 border-yellow-400/30 text-white hover:bg-yellow-400/20 hover:border-yellow-400/60 hover:-translate-y-0.5'
            }`}
            onClick={() => setActiveTab('faqs')}
          >
            FAQ's
          </button>
        </div>

        {/* Instructions Tab */}
        {activeTab === 'instructions' && (
          <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards] min-h-[600px] w-full max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-3 sm:mb-4 mt-6 sm:mt-8">Eligibility:</h2>
            <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• <strong>Sports & Games:</strong> Students of any UG / PG program from Technical Deemed Universities, Engineering and Pharmacy institutes are only allowed to participate in sports events.</p>
            <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• <strong>Performing Arts:</strong> Students of any UG / PG program of any discipline are permitted to participate, from institutes of Engineering & Technology, Arts & Sciences, Designing, Fashion, Medical, Pharma etc., in Performing arts / Literature / Visual Arts and Crafts / Fashion events.</p>

            <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-3 sm:mb-4 mt-6 sm:mt-8">Registrations:</h2>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• All external participants have to report at the Registration desk arranged near the main gate before 12 noon on 5th Feb 2026.</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• Registration fee:</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base pl-6 sm:pl-8">o Sports & Games: Rs.350/- for Men and Rs. 250/- for women</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base pl-6 sm:pl-8">o Performing arts / Literature / Visual Arts and Crafts / Fashion: Rs. 250/-</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base pl-6 sm:pl-8">o Entry is free for PARA sports participants.</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• All participants must produce their college ID card and Bonafide certificate.</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• On completion of individual registration, a Mahotsav ID will be generated for your account.</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• After individual registration, Team captain/leads must report at counters setup for concerned game/ event for registering their team by producing Mahotsav ID cards of all the team members.</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• Students registered for sports and games events are permitted to participate in any one Team event of sports and games and any number of Track & Field/ Individual sport event Performing Arts / Literature / Visual Arts and Crafts / Fashion.</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• Students registered for Performing Arts alone will not be permitted to participate in Sports & Games.</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• Participants who require accommodation must register at the adjacent hospitality desk by producing a Mahotsav ID card issued upon first come first serve basis.</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• Any number of individuals / teams are allowed to participate from an institute in an event.</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• Lunch will be provided on the three days of the fest for Sports & Games participants only.</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• All the visitors should also register at the desk with a nominal entry fee.</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• Winners and Runners will be awarded with cash prizes, memento/medal and appreciation certificate during the valedictory function only i.e., held on 8th Feb 2025 from 6 – 8 p.m.</p>
          <p className="text-white leading-relaxed mb-2 text-sm sm:text-base">• Participation certificates will be issued to all the participants at the event venue only upon completion of the event.</p>

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 text-center mt-8 sm:mt-12 mb-3 sm:mb-4">FOR QUERIES AND DETAILS ON ACCOMMODATION CONTACT:</h2>
          
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-yellow-400 mt-4 sm:mt-6 mb-3 sm:mb-4">For Boys:</h3>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-400 to-orange-500">
                <th className="p-3 sm:p-4 text-left text-black font-bold uppercase border border-yellow-400/30 text-sm sm:text-base">Name</th>
                <th className="p-3 sm:p-4 text-left text-black font-bold uppercase border border-yellow-400/30 text-sm sm:text-base">Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">Ashwin</td>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">88852 84355</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">Ajith</td>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">93461 93840</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">Hemanth</td>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">88854 76252</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">Phani</td>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">95426 66866</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">Nawaz Basha</td>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">99638 76989</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">Yeshwanth</td>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">83091 90435</td>
              </tr>
            </tbody>
          </table>
          </div>

          <h3 className="text-base sm:text-lg md:text-xl font-bold text-yellow-400 mt-4 sm:mt-6 mb-3 sm:mb-4">For Girls:</h3>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-400 to-orange-500">
                <th className="p-3 sm:p-4 text-left text-black font-bold uppercase border border-yellow-400/30 text-sm sm:text-base">Name</th>
                <th className="p-3 sm:p-4 text-left text-black font-bold uppercase border border-yellow-400/30 text-sm sm:text-base">Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">Yamini</td>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">70939 12677</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">Sravani</td>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">90147 04929</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">Bindhu</td>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">99590 22317</td>
              </tr>
            </tbody>
          </table>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 text-center mt-8 sm:mt-12 mb-3 sm:mb-4">FOR FURTHER QUERIES AND DETAILS CONTACT:</h2>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-400 to-orange-500">
                <th className="p-3 sm:p-4 text-left text-black font-bold uppercase border border-yellow-400/30 text-sm sm:text-base">Name</th>
                <th className="p-3 sm:p-4 text-left text-black font-bold uppercase border border-yellow-400/30 text-sm sm:text-base">Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">Lohith</td>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">8309751051</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">Sri Vatsav</td>
                <td className="p-3 sm:p-4 text-white border border-yellow-400/30 text-sm sm:text-base">94419 34549</td>
              </tr>
            </tbody>
          </table>
          </div>
          </div>
        )}

        {/* How to Reach Tab */}
        {activeTab === 'howToReach' && (
          <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] min-h-[600px] w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
            <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 sm:mb-6">How to Reach</h2>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• Vignan University is well-connected to neighboring cities and towns, making it easily accessible for visitors. The nearest major city is Guntur, which is approximately 20 kilometers away. Guntur has a railway station and is connected to major cities like Hyderabad, Vijayawada, and Chennai. From Guntur, one can hire a taxi or take a bus that goes to Tenali to reach Vignan.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• The nearest major railway station is in Tenali which is approximately 12 kM from Vignan University and is connected to major cities like Vishakhapatnam, Chennai, Coimbatore, Cochin.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• One can get down at Vijayawada junction that has great connectivity to all parts of India and reach Tenali by bus which would take around 45 minutes.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 text-white/90">• There are plenty of auto-rickshaws and buses available from Tenali to reach Vignan University.</p>

            <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 sm:mb-6">FOR QUERIES AND DETAILS ON ACCOMMODATION CONTACT:</h2>
          
            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Boys:</h3>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-purple-900/50">
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Name</th>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Ashwin</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">88852 84355</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Ajith anna</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">93461 93840</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Hemanth</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">88854 76252</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Phani</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">95426 66866</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Nawaz Basha</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">99638 76989</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">Yeshwanth</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">83091 90435</td>
                </tr>
              </tbody>
            </table>
            </div>

            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Girls:</h3>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-purple-900/50">
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Name</th>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Yamini</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">70939 12677</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Sravani</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">90147 04929</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">Bindhu</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">99590 22317</td>
                </tr>
              </tbody>
            </table>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 sm:mb-6 mt-8">FOR FURTHER QUERIES AND DETAILS CONTACT:</h2>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-purple-900/50">
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Name</th>
                  <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Lohith</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">8309751051</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">Sri Vatsav</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">94419 34549</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        )}

        {/* Accommodation Tab */}
        {activeTab === 'accommodation' && (
          <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] min-h-[600px] w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
            <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 sm:mb-6">Accommodation</h2>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• Participants who require accommodation must register at the hospitality desk by producing the Mahotsav ID card issued post registration process.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• Participants coming from distances more than 100 km from Guntur will only be provided with accommodation upon first come first serve basis depending on the availability with basic amenities.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• Participants are advised to bring their basic bedding and electrical spikes for their charging their gadgets.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• Boys and Girls will be accommodated at different venues; common halls will be provided along with decent washroom facilities.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• No additional charge will be taken for accommodation from sports & Games participants; a nominal fee of Rs.100 will be charged from participants of cultural events.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• Smoking, drinking and other drug consumption are strictly prohibited and necessary action will be taken by the institute if a participant is found to be in possession of these items.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• Any damage to institution facilities and property provided to the participants would result in serious action and necessary reimbursement charges should be paid by the participants found guilty.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• Participants are required to keep the given check-in receipts and ID card safe until they checkout. the candidate has to pay the registration fee again and get a new ID card.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• Participants should report at the accommodation venue to the concerned in-charge with their ID cards every time they enter or exit the room for safety concerns.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• Participants are requested to adhere to the check-out time mentioned in the check-in receipt. Check-out after the time indicated will not be entertained.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• Participants are expected to not create any kind of nuisance which might trouble other participants in the room.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• The college will not be responsible for any damage or loss of property or valuables stored in places of accommodation.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• Girls should strictly follow the curfew timings of Vignan that are specified during the allocation of room.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• The decision of organizers is final and binding in case of any dispute.</p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">• Faculty members accompanying the students will be provided the facility free of cost, if informed in advance.</p>

            <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 sm:mb-6">FOR QUERIES AND DETAILS ON ACCOMMODATION CONTACT:</h2>
          
            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Boys:</h3>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-900/50">
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Name</th>
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Ashwin</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">88852 84355</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Ajith anna</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">93461 93840</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Hemanth</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">88854 76252</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Phani</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">95426 66866</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Nawaz Basha</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">99638 76989</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">Yeshwanth</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">83091 90435</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Girls:</h3>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-900/50">
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Name</th>
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Yamini</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">70939 12677</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Sravani</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">90147 04929</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">Bindhu</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">99590 22317</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 sm:mb-6">FOR FURTHER QUERIES AND DETAILS CONTACT:</h2>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-900/50">
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Name</th>
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Lohith</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">8309751051</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">Sri Vatsav</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">94419 34549</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] min-h-[600px] w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
            <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 sm:mb-6">FOR QUERIES AND DETAILS ON ACCOMMODATION CONTACT:</h2>
          
            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Boys:</h3>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-900/50">
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Name</th>
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Ashwin</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">88852 84355</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Ajith anna</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">93461 93840</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Hemanth</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">88854 76252</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Phani</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">95426 66866</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Nawaz Basha</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">99638 76989</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">Yeshwanth</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">83091 90435</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Girls:</h3>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-900/50">
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Name</th>
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Yamini</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">70939 12677</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Sravani</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">90147 04929</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">Bindhu</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">99590 22317</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 sm:mb-6">FOR FURTHER QUERIES AND DETAILS CONTACT:</h2>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-900/50">
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Name</th>
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Lohith</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">8309751051</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">Sri Vatsav</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">94419 34549</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === 'faqs' && (
          <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] min-h-[600px] w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
            <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 sm:mb-6">FAQ's</h2>
            
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90"><strong>1) From when can I avail accommodation?</strong></p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">Accommodation can be availed from 4th February, 2026 - 10 pm onwards.</p>

            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90"><strong>2) What documents and proofs are required while coming to Mahotsav?</strong></p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">It is mandatory to bring the College ID card and bonafide certificate when you arrive at registration desk at Vignan University.</p>

            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90"><strong>3) Does the accommodation include food?</strong></p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">No, but you can make use of the canteens/food stalls available during Mahotsav at your own expense. Whereas, for Sports & Games participants, Lunch will be provided</p>

            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90"><strong>4) When can I come for registration and accommodation?</strong></p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">Accommodation and registration services can be availed from 4th Feb 2026, starting at 10 PM. The Registration and Hospitality desk will operate 24/7 until 5th Feb 2025. Please note that registrations and check-outs are paused during Inaugural and Valedictory functions, so kindly plan accordingly.</p>

            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90"><strong>5) Can I vacate earlier than the registered date?</strong></p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">Yes, however you have to inform to the coordinator regarding your check out.</p>

            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90"><strong>6) Whom and How should I approach for accommodation on arrival?</strong></p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">You have to report at the hospitality desk. You can contact Helpline numbers for any further help.<br />Helpline No: 88854 76252</p>

            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90"><strong>7) Will Mahotsav guarantee security for my luggage and stuff?</strong></p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">The attendees are responsible for managing their own belongings, Mahotsav does not guarantee security of luggage or any personal belongings.</p>

            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90"><strong>8) Can I check out later than my scheduled time of checkout?</strong></p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">You have to checkout at your given time only.</p>

            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90"><strong>9) Are Male and Female students provided with the same accommodations?</strong></p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">No, male and female students would not be provided with the same accommodation.</p>

            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90"><strong>10) Can I expect to private room allotted to me?</strong></p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">No, common halls will be arranged with decent washroom facilities.</p>

            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90"><strong>11) Is there any curfew for students?</strong></p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">Yes, there will be a curfew for girl students. It will be informed during the allocation of room.</p>

            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90"><strong>12) What about the food provision inside the college?</strong></p>
            <p className="text-sm sm:text-base leading-relaxed mb-2 text-white/90">You can make use of the canteens/food stalls available during Mahotsav at your own expense.</p>

            <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 sm:mb-6">FOR QUERIES AND DETAILS ON ACCOMMODATION CONTACT:</h2>
          
            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Boys:</h3>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-900/50">
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Name</th>
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Ashwin</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">88852 84355</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Ajith anna</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">93461 93840</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Hemanth</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">88854 76252</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Phani</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">95426 66866</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Nawaz Basha</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">99638 76989</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">Yeshwanth</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">83091 90435</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Girls:</h3>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-900/50">
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Name</th>
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Yamini</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">70939 12677</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Sravani</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">90147 04929</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">Bindhu</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">99590 22317</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 sm:mb-6">FOR FURTHER QUERIES AND DETAILS CONTACT:</h2>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[400px] my-6 sm:my-8 border-collapse bg-black/30 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-900/50">
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Name</th>
                    <th className="p-3 sm:p-4 text-left text-sm sm:text-base font-bold text-yellow-400 border-b border-white/20">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">Lohith</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90 border-b border-white/10">8309751051</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">Sri Vatsav</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-white/90">94419 34549</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Garuda Floating Bubble */}
      <GarudaBubble />
    </div>
  );
};

export default Hospitality;
