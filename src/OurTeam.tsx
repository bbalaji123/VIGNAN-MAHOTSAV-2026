import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from './components/BackButton';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';


const OurTeam: React.FC = () => {
  const navigate = useNavigate();
  const { tab, category } = useParams<{ tab?: string; category?: string }>();

  const [activeTab, setActiveTab] = useState<'faculty' | 'student'>(() => {
    if (tab === 'faculty' || tab === 'student') return tab as 'faculty' | 'student';
    return 'student';
  });

  const [selectedFacultyCategory, setSelectedFacultyCategory] = useState<string>(() => {
    if (tab === 'faculty' && category) return decodeURIComponent(category);
    return 'All';
  });

  const [selectedStudentCategory, setSelectedStudentCategory] = useState<string>(() => {
    if ((!tab || tab === 'student') && category) return decodeURIComponent(category);
    return 'All';
  });

  // Sync state with URL parameters
  useEffect(() => {
    if (tab === 'faculty' || tab === 'student') {
      setActiveTab(tab as 'faculty' | 'student');
    }

    if (category) {
      const decodedCategory = decodeURIComponent(category);
      if (tab === 'faculty') {
        setSelectedFacultyCategory(decodedCategory);
      } else {
        setSelectedStudentCategory(decodedCategory);
      }
    }
  }, [tab, category]);

  const handleTabChange = (newTab: 'faculty' | 'student') => {
    const currentCategory = newTab === 'faculty' ? selectedFacultyCategory : selectedStudentCategory;
    navigate(`/our-team/${newTab}/${encodeURIComponent(currentCategory)}`);
  };

  const handleFacultyCategoryChange = (newCategory: string) => {
    navigate(`/our-team/faculty/${encodeURIComponent(newCategory)}`);
  };

  const handleStudentCategoryChange = (newCategory: string) => {
    navigate(`/our-team/student/${encodeURIComponent(newCategory)}`);
  };

  const handleBackClick = () => {
    navigate('/?menu=true');
  };

  const facultyMembers = useMemo(
    () => [
      { name: 'Dr. Ananya Rao', role: 'Cultural Outreach', detail: 'Faculty', category: 'Convenor', image: '' },
      { name: 'Prof. Rahul Menon', role: 'Tech Lead', detail: 'Faculty', category: 'Co-Convenor', image: '' },
      { name: 'Dr. Kavya Sen', role: 'Performing Arts', detail: 'Faculty', category: 'Faculty Core', image: '' },
      { name: 'Dr. Mira Kulkarni', role: 'Guest Curation', detail: 'Faculty', category: 'Faculty Leads', image: '' },
      { name: 'Prof. Dev Joshi', role: 'Logistics', detail: 'Faculty', category: 'Faculty Core', image: '' }
    ],
    []
  );

  const studentMembers = useMemo(
    () => [
      { name: 'Student Convenor', role: 'Main Convenor', detail: 'Student', category: 'Convenor', image: '/images/Web College Data/CONVENOR.avif' },
      ...Array.from({ length: 5 }).map((_, i) => ({
        name: `Co-Convenor ${i + 1}`,
        role: 'Co-Convenor',
        detail: 'Student',
        category: 'Co-Convenors',
        image: `/images/Web College Data/CC${i + 1}.avif`,
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

  const categories = useMemo(() => {
    if (activeTab === 'faculty') return ['Convenor', 'Co-Convenor', 'Faculty Core', 'Faculty Leads'];
    return ['Convenor', 'Co-Convenors', 'Core', 'Leads'];
  }, [activeTab]);

  const displayedMembers = useMemo(() => {
    if (activeTab === 'student') {
      if (selectedStudentCategory === 'All') return studentMembers;
      return studentMembers.filter(m => m.category === selectedStudentCategory);
    }
    if (selectedFacultyCategory === 'All') return facultyMembers;
    return facultyMembers.filter(m => m.category === selectedFacultyCategory);
  }, [activeTab, studentMembers, facultyMembers, selectedFacultyCategory, selectedStudentCategory]);

  const groupedMembers = useMemo(() => {
    const members = activeTab === 'faculty' ? facultyMembers : studentMembers;
    return categories.map(cat => ({
      name: cat,
      members: members.filter(m => m.category === cat)
    })).filter(group => group.members.length > 0);
  }, [categories, activeTab, facultyMembers, studentMembers]);

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
            transform: scale(1.1) translateZ(0);
            z-index: 10;
            box-shadow: 0 0 40px rgba(251, 191, 36, 0.6), 0 20px 50px rgba(0,0,0,0.8);
            border-color: rgba(251, 191, 36, 1);
          }

          /* Shine Effect */
          .team-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(
              to right,
              transparent,
              rgba(255, 255, 255, 0.3),
              transparent
            );
            transform: skewX(-25deg);
            transition: 0.75s;
          }

          .team-card:hover::after {
            left: 150%;
          }

          .team-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          /* Entrance Animations */
          @keyframes sectionReveal {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .section-animated {
            animation: sectionReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            opacity: 0;
            will-change: transform, opacity;
          }

          .stagger-card {
            animation: sectionReveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            opacity: 0;
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
          marginTop: '18px'
        }}>OUR TEAM</h1>
        <div className="flex flex-wrap justify-center gap-2 md:gap-6 pb-6" style={{ marginTop: '20px', marginBottom: '30px' }}>
          {[
            { key: 'student', label: 'Student' },
            { key: 'faculty', label: 'Faculty' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key as 'faculty' | 'student')}
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
              onChange={(e) => handleFacultyCategoryChange(e.target.value)}
              className="bg-black/40 text-white border-2 border-[#fdee71]/50 hover:scale-105 transition-all font-semibold uppercase tracking-wider backdrop-blur-md cursor-pointer focus:outline-none focus:border-[#fdee71] px-[30px] py-[25px] md:py-[10px] text-[18px] rounded-lg ml-0 mt-12 md:mt-0 md:ml-[560px] w-[60%] md:w-auto"
            >
              {['All', ...['Convenor', 'Co-Convenor', 'Faculty Core', 'Faculty Leads']].map(cat => (
                <option key={cat} value={cat} className="bg-gray-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
          )}

          {activeTab === 'student' && (
            <select
              value={selectedStudentCategory}
              onChange={(e) => handleStudentCategoryChange(e.target.value)}
              className="bg-black/40 text-white border-2 border-[#fdee71]/50 hover:scale-105 transition-all font-semibold uppercase tracking-wider backdrop-blur-md cursor-pointer focus:outline-none focus:border-[#fdee71] px-[30px] py-[25px] md:py-[10px] text-[18px] rounded-lg ml-0 mt-12 md:mt-0 md:ml-[560px] w-[60%] md:w-auto"
            >
              {['All', ...['Convenor', 'Co-Convenors', 'Core', 'Leads']].map(cat => (
                <option key={cat} value={cat} className="bg-gray-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
          )}
        </div>

        {(activeTab === 'faculty' ? selectedFacultyCategory : selectedStudentCategory) === 'All' ? (
          groupedMembers.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="w-full flex flex-col items-center section-animated"
              style={{
                marginBottom: '100px',
                animationDelay: `${groupIndex * 0.2}s`
              }}
            >
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.25em] text-amber-400 border-b-2 border-amber-400/30 text-center"
                style={{ marginTop: '10px', marginBottom: '40px', paddingBottom: '10px' }}>
                {group.name}
              </h2>
              <div className="w-full max-w-5xl flex flex-wrap justify-center gap-10 team-grid">
                {group.members.map((member, index) => (
                  <div
                    key={index}
                    className="team-card shadow-2xl flex flex-col items-center stagger-card"
                    style={{ animationDelay: `${(groupIndex * 0.2) + (index * 0.05)}s` }}
                  >
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
                          <span className={activeTab === 'faculty' ? "text-2xl" : "text-6xl"}>
                            {activeTab === 'faculty' ? "Coming....!!" : "👤"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full max-w-5xl flex flex-wrap justify-center gap-10 mt-4 mb-20 team-grid section-animated">
            {displayedMembers.map((member, index) => (
              <div
                key={index}
                className="team-card shadow-2xl flex flex-col items-center stagger-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
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
                      <span className={activeTab === 'faculty' ? "text-2xl" : "text-6xl"}>
                        {activeTab === 'faculty' ? "Coming....!!" : "👤"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OurTeam;
