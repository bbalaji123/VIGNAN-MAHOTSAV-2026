import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './components/BackButton';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';


const OurTeam: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'faculty' | 'student'>('student');
  const [selectedFacultyCategory, setSelectedFacultyCategory] = useState<string>('Convener');
  const [selectedStudentCategory, setSelectedStudentCategory] = useState<string>('Convener');

  const handleBackClick = () => {
    navigate('/?menu=true');
  };

  const facultyMembers = useMemo(
    () => [
      { name: 'Dr. Ananya Rao', role: 'Cultural Outreach', detail: 'Faculty', category: 'Convener', image: '' },
      { name: 'Prof. Rahul Menon', role: 'Tech Lead', detail: 'Faculty', category: 'Co-Convener', image: '' },
      { name: 'Dr. Kavya Sen', role: 'Performing Arts', detail: 'Faculty', category: 'Faculty Core', image: '' },
      { name: 'Dr. Mira Kulkarni', role: 'Guest Curation', detail: 'Faculty', category: 'Faculty Leads', image: '' },
      { name: 'Prof. Dev Joshi', role: 'Logistics', detail: 'Faculty', category: 'Faculty Core', image: '' }
    ],
    []
  );

  const studentMembers = useMemo(
    () => [
      { name: 'Student Convener', role: 'Main Convener', detail: 'Student', category: 'Convener', image: '/images/Web College Data/CONVENOR.avif' },
      ...Array.from({ length: 5 }).map((_, i) => ({
        name: `Co-Convener ${i + 1}`,
        role: 'Co-Convener',
        detail: 'Student',
        category: 'Co-Conveners',
        image: `/images/Web College Data/CC${i + 1}.avif`
      })),
      ...Array.from({ length: 18 }).map((_, i) => ({
        name: `Core Member ${i + 1}`,
        role: 'Core Team',
        detail: 'Student',
        category: 'Core',
        image: `/images/Web College Data/CORE${(i % 18) + 1}.avif`
      })),
      { name: 'Student Lead', role: 'Vertical Lead', detail: 'Student', category: 'Leads', image: '/images/Web College Data/CORE.avif' }
    ],
    []
  );

  const displayedMembers = useMemo(() => {
    if (activeTab === 'student') {
      if (selectedStudentCategory === 'All') return studentMembers;
      return studentMembers.filter(m => m.category === selectedStudentCategory);
    }
    if (selectedFacultyCategory === 'All') return facultyMembers;
    return facultyMembers.filter(m => m.category === selectedFacultyCategory);
  }, [activeTab, studentMembers, facultyMembers, selectedFacultyCategory, selectedStudentCategory]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden" style={{
      backgroundImage: 'url("/images/Background.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Floating Flower - Top Right */}
      <div className="fixed -top-32 -right-32 md:-top-64 md:-right-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 max-md:z-0 md:z-[1]">
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
      <div className="fixed -bottom-32 -left-32 md:-bottom-64 md:-left-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 max-md:z-0 md:z-[1]">
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

          /* Performance Optimized Team Card Styles */
          .team-card {
            width: 300px;
            height: 400px;
            aspect-ratio: 3/4;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s ease, opacity 0.4s ease;
            will-change: transform, filter, opacity;
            backface-visibility: hidden;
            transform: translateZ(0); /* Force GPU */
          }

          /* Spotlight Effect: Dims others ONLY when a card is hovered (not the gap) */
          .team-grid:has(.team-card:hover) .team-card:not(:hover) {
            filter: grayscale(1) brightness(0.5);
            opacity: 0.6;
            transform: scale(0.95) translateZ(0);
          }

          .team-card:hover {
            transform: scale(1.05) translateZ(0);
            z-index: 10;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            border-color: rgba(251, 191, 36, 0.5);
          }

          .team-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        `}
      </style>

      {/* Back Button */}
      <BackButton onClick={handleBackClick} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex flex-col justify-center items-center min-h-[80vh]">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-4 sm:mb-6" style={{
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
          marginTop: '20px'
        }}>OUR TEAM</h1>
        <div className="flex flex-wrap justify-center gap-2 md:gap-6 pb-6" style={{ marginTop: '50px', marginBottom: '50px' }}>
          {[
            { key: 'faculty', label: 'Faculty' },
            { key: 'student', label: 'Student' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'faculty' | 'student')}
              style={{ padding: '10px 50px', borderRadius: '10px', fontSize: '18px' }}
              className={`transition-all duration-300 font-semibold flex items-center justify-center text-center text-white uppercase tracking-[0.2em] border-2 border-white/70 hover:scale-110 hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] ${activeTab === tab.key
                ? 'bg-amber-400 text-black shadow-[0_0_30px_rgba(251,191,36,0.5)]'
                : 'bg-white/10 text-white hover:bg-amber-400/20'
                }`}
            >
              {tab.label}
            </button>
          ))}

          {activeTab === 'faculty' && (
            <select
              value={selectedFacultyCategory}
              onChange={(e) => setSelectedFacultyCategory(e.target.value)}
              className="bg-black/40 text-white border-2 border-[#fdee71]/50 hover:scale-105 transition-all font-semibold uppercase tracking-wider backdrop-blur-md cursor-pointer focus:outline-none focus:border-[#fdee71] px-[30px] py-[25px] md:py-[10px] text-[18px] rounded-lg ml-0 mt-12 md:mt-0 md:ml-[560px] w-[60%] md:w-auto"
            >
              {['Convenor', 'Co-Convenors', 'Faculty Core', 'Faculty Leads'].map(cat => (
                <option key={cat} value={cat} className="bg-gray-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
          )}

          {activeTab === 'student' && (
            <select
              value={selectedStudentCategory}
              onChange={(e) => setSelectedStudentCategory(e.target.value)}
              className="bg-black/40 text-white border-2 border-[#fdee71]/50 hover:scale-105 transition-all font-semibold uppercase tracking-wider backdrop-blur-md cursor-pointer focus:outline-none focus:border-[#fdee71] px-[30px] py-[25px] md:py-[10px] text-[18px] rounded-lg ml-0 mt-12 md:mt-0 md:ml-[560px] w-[60%] md:w-auto"
            >
              {['Convener', 'Co-Conveners', 'Core', 'Leads'].map(cat => (
                <option key={cat} value={cat} className="bg-gray-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
          )}
        </div>

        {activeTab === 'faculty' && (
          <>
            <div className="w-full max-w-5xl flex flex-wrap justify-center gap-10 mt-4 mb-20 team-grid">
              {displayedMembers.map((member, index) => (
                <div key={index} className="team-card shadow-2xl flex flex-col items-center">
                  <div className="w-full h-full overflow-hidden relative">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        width={300}
                        height={400}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10 flex items-center justify-center">
                        <span className="text-2xl">Coming....!!</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'student' && (
          <>
            <div className="w-full max-w-5xl flex flex-wrap justify-center gap-10 mt-4 mb-20 team-grid">
              {displayedMembers.map((member, index) => (
                <div key={index} className="team-card shadow-2xl flex flex-col items-center">
                  <div className="w-full h-full overflow-hidden relative">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        width={300}
                        height={400}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10 flex items-center justify-center">
                        <span className="text-6xl">👤</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OurTeam;
