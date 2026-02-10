import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from './components/BackButton';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';


const OurTeam: React.FC = () => {
  const navigate = useNavigate();
  const { tab, category } = useParams<{ tab?: string; category?: string }>();

  const [activeTab, setActiveTab] = useState<'faculty' | 'student' | 'web'>(() => {
    if (tab === 'faculty' || tab === 'student' || tab === 'web') return tab as 'faculty' | 'student' | 'web';
    return 'web';
  });


  // Sync state with URL parameters
  useEffect(() => {
    if (tab === 'faculty' || tab === 'student' || tab === 'web') {
      setActiveTab(tab as 'faculty' | 'student' | 'web');
    }

  }, [tab, category]);

  const handleTabChange = (newTab: 'faculty' | 'student' | 'web') => {
    navigate(`/our-team/${newTab}`);
  };


  const handleBackClick = () => {
    navigate('/?menu=true');
  };

  const facultyMembers = useMemo(
    () => [
      { name: 'Faculty Convenor', role: 'Convenor', detail: 'Faculty', category: 'Convenor', image: '/images/Web College Data/1.avif' },
      { name: 'Faculty Co-Convenor', role: 'Co-Convenor', detail: 'Faculty', category: 'Co-Convenor', image: '/images/Web College Data/2.avif' },
      { name: 'Faculty Core 1', role: 'Core Team', detail: 'Faculty', category: 'Faculty Core', image: '/images/Web College Data/3.avif' },
      { name: 'Faculty Core 2', role: 'Core Team', detail: 'Faculty', category: 'Faculty Core', image: '/images/Web College Data/4.avif' },
      { name: 'Faculty Core 3', role: 'Core Team', detail: 'Faculty', category: 'Faculty Core', image: '/images/Web College Data/5.avif' },
      { name: 'Faculty Core 3', role: 'Core Team', detail: 'Faculty', category: 'Faculty Core', image: '/images/Web College Data/6.avif' }
    ],
    []
  );

  const verticalLeads = [
    { name: 'Alma Connects', folder: '1', count: 4, prefix: 'ALMA' },
    { name: 'Ambience', folder: '2', count: 5, prefix: 'AMB' },
    { name: 'Anchoring & Content Writing', folder: '3', count: 4, prefix: 'ACW' },
    { name: 'Controls', folder: '4', count: 5, prefix: 'CNT' },
    { name: 'Cricket Championship', folder: '5', count: 3, prefix: 'MCC' },
    { name: 'Dance Competitions', folder: '6', count: 4, prefix: 'DC' },
    { name: 'Dance Performances', folder: '7', count: 3, prefix: 'DP' },
    { name: 'Dramatics Competitions', folder: '8', count: 2, prefix: 'DRA' },
    { name: 'Fashion & Spot-light Competitions', folder: '9', count: 5, prefix: 'FSL' },
    { name: 'Fine Arts Competitions', folder: '10', count: 3, prefix: 'FAC' },
    { name: 'Food Stalls', folder: '11', count: 1, prefix: 'FOOD' },
    { name: 'Gaming', folder: '12', count: 3, prefix: 'GM' },
    { name: 'Guest Lecture and Workshops', folder: '13', count: 4, prefix: 'GL&W' },
    { name: 'Hospitality & Transport', folder: '14', count: 8, prefix: 'H&T' },
    { name: 'Informals & Event Management', folder: '15', count: 6, prefix: 'I&EM ' },
    { name: 'Literary Competitions', folder: '16', count: 5, prefix: 'LC ' },
    { name: 'Public Relations & Digital Marketing', folder: '17', count: 6, prefix: 'PR' },
    { name: 'Logistics', folder: '18', count: 4, prefix: 'LOG ' },
    { name: 'Mahotsav Social Responsibility', folder: '19', count: 5, prefix: 'MSR ' },
    { name: 'Multimedia Competitions', folder: '20', count: 5, prefix: 'MMC' },
    { name: 'Media Relations & Guest Interviews', folder: '21', count: 4, prefix: 'MR&GI ' },
    { name: 'Multimedia & Design', folder: '22', count: 4, prefix: 'TD' },
    { name: 'Music Performances', folder: '23', count: 4, prefix: 'MP' },
    { name: 'Music Competitions', folder: '24', count: 4, prefix: 'MC' },
    { name: 'Photography & Video-Editing', folder: '25', count: 5, prefix: 'PVE' },
    { name: 'Registrations', folder: '26', count: 2, prefix: 'Registrations' },
    { name: 'Sports & Games – Individual Events (M&W)', folder: '27', count: 6, prefix: 'IE(M&W)' },
    { name: 'Sports & Games – Team Events (Men)', folder: '28', count: 6, prefix: 'Team Events (Men)' },
    { name: 'Sports & Games – Team Events (Women)', folder: '29', count: 7, prefix: 'Team Events (women)1 (2)' },
    { name: 'Sports & Games – Track & Field (Men)', folder: '30', count: 5, prefix: 'Track & Field (Men)' },
    { name: 'Sports & Games – Track & Field (Women)', folder: '31', count: 1, prefix: 'Track & Field (Women)' },
    { name: 'Stage & Quality Management', folder: '32', count: 4, prefix: 's&q' },
    { name: 'Sponsorship', folder: '33', count: 2, prefix: 'Sponsorship' },
    { name: 'Techno Races & Sports', folder: '34', count: 4, prefix: 'TSR' },
    { name: 'Web & IT Design', folder: '35', count: 1, prefix: 'WEB' }
  ];

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
      ...verticalLeads.flatMap(vertical => {
        // Special handling for folder 35 (WEB) which has no number
        if (vertical.folder === '35') {
          return [{
            name: vertical.name,
            role: 'Vertical Lead',
            detail: 'Student',
            category: `Leads-${vertical.name}`,
            image: `/images/35/WEB.avif`
          }];
        }

        // Special handling for folder 29 (Team Events Women) with irregular naming
        if (vertical.folder === '29') {
          const images = [
            'Team Events (women)1.avif',
            'Team Events (women)2.avif',
            'Team Events (women)3.avif',
            'Team Events (women)4.avif',
            'Team Events (women)1 (2).avif',
            'Team Events (women)2 (2).avif',
            'Team Events (women)3 (2).avif'
          ];
          return images.map(img => ({
            name: vertical.name,
            role: 'Vertical Lead',
            detail: 'Student',
            category: `Leads-${vertical.name}`,
            image: `/images/29/${img}`
          }));
        }

        // Regular handling for all other folders
        return Array.from({ length: vertical.count }).map((_, i) => ({
          name: vertical.name,
          role: 'Vertical Lead',
          detail: 'Student',
          category: `Leads-${vertical.name}`,
          image: `/images/${vertical.folder}/${vertical.prefix}${i + 1}.avif`
        }));
      })
    ],
    []
  );

  const webDesignMembers = useMemo(() => [
    { name: 'Team Leader', role: 'Team Leader', detail: 'Web Design', category: 'Web Design Team', image: '/a.jpeg' },
    { name: 'Team Member', role: 'Team Member', detail: 'Web Design', category: 'Web Design Team', image: '/b.jpeg' },
    { name: 'Team Member', role: 'Team Member', detail: 'Web Design', category: 'Web Design Team', image: '/c.jpeg' },
    { name: 'Team Member', role: 'Team Member', detail: 'Web Design', category: 'Web Design Team', image: '/d.jpeg' },
    { name: 'Team Member', role: 'Team Member', detail: 'Web Design', category: 'Web Design Team', image: '/e.jpeg' },
    { name: 'Team Member', role: 'Team Member', detail: 'Web Design', category: 'Web Design Team', image: '/f.jpeg' },
    { name: 'Team Member', role: 'Team Member', detail: 'Web Design', category: 'Web Design Team', image: '/g.jpeg' },
    { name: 'Team Member', role: 'Team Member', detail: 'Web Design', category: 'Web Design Team', image: '/h.jpeg' },
  ], []);

  const categories = useMemo(() => {
    if (activeTab === 'faculty') return ['Convenor', 'Co-Convenor', 'Faculty Core', 'Faculty Leads'];
    if (activeTab === 'web') return ['Web Design Team'];
    return [
      'Convenor',
      'Co-Convenors',
      'Core',
      'Leads-Alma Connects',
      'Leads-Ambience',
      'Leads-Anchoring & Content Writing',
      'Leads-Controls',
      'Leads-Cricket Championship',
      'Leads-Dance Competitions',
      'Leads-Dance Performances',
      'Leads-Dramatics Competitions',
      'Leads-Fashion & Spot-light Competitions',
      'Leads-Fine Arts Competitions',
      'Leads-Food Stalls',
      'Leads-Gaming',
      'Leads-Guest Lecture and Workshops',
      'Leads-Hospitality & Transport',
      'Leads-Informals & Event Management',
      'Leads-Literary Competitions',
      'Leads-Public Relations & Digital Marketing',
      'Leads-Logistics',
      'Leads-Mahotsav Social Responsibility',
      'Leads-Multimedia Competitions',
      'Leads-Media Relations & Guest Interviews',
      'Leads-Multimedia & Design',
      'Leads-Music Performances',
      'Leads-Music Competitions',
      'Leads-Photography & Video-Editing',
      'Leads-Registrations',
      'Leads-Sports & Games – Individual Events (M&W)',
      'Leads-Sports & Games – Team Events (Men)',
      'Leads-Sports & Games – Team Events (Women)',
      'Leads-Sports & Games – Track & Field (Men)',
      'Leads-Sports & Games – Track & Field (Women)',
      'Leads-Stage & Quality Management',
      'Leads-Sponsorship',
      'Leads-Techno Races & Sports',
      'Leads-Web & IT Design'
    ];
  }, [activeTab]);

  const displayedMembers = useMemo(() => {
    if (activeTab === 'student') return studentMembers;
    if (activeTab === 'web') return webDesignMembers;
    return facultyMembers;
  }, [activeTab, studentMembers, facultyMembers, webDesignMembers]);

  const groupedMembers = useMemo(() => {
    const members = activeTab === 'faculty' ? facultyMembers : (activeTab === 'web' ? webDesignMembers : studentMembers);
    return categories.map(cat => ({
      name: cat,
      members: members.filter(m => m.category === cat)
    })).filter(group => group.members.length > 0);
  }, [categories, activeTab, facultyMembers, studentMembers, webDesignMembers]);

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
            height: 450px;
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
          color: '#fdee71',
          textShadow: '0 0 30px rgba(253, 238, 113, 0.3)',
          marginTop: '18px'
        }}>OUR TEAM</h1>
        <div className="flex flex-wrap justify-center gap-2 md:gap-6 pb-6" style={{ marginTop: '20px', marginBottom: '30px' }}>
          {[
            { key: 'student', label: 'Student' },
            { key: 'faculty', label: 'Faculty' },
            { key: 'web', label: 'Web Design' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key as 'faculty' | 'student' | 'web')}
              style={{ padding: '10px 50px', borderRadius: '10px', fontSize: '18px' }}
              className={`transition-all duration-300 font-semibold flex items-center justify-center text-center text-white uppercase tracking-[0.2em] border-2 border-white/70 hover:scale-110 hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] ${activeTab === tab.key
                ? 'bg-amber-400 text-black shadow-[0_0_30px_rgba(251,191,36,0.5)]'
                : 'bg-white/10 text-white hover:bg-amber-400/20'
                }`}
            >
              {tab.label}
            </button>
          ))}

        </div>

        {groupedMembers.map((group, groupIndex) => {
          const isLeadsSection = group.name.startsWith('Leads-');
          const leadsVerticalName = isLeadsSection ? group.name.replace('Leads-', '') : '';
          const isFirstLeadsSection = group.name === 'Leads-Alma Connects';

          return (
            <div
              key={groupIndex}
              className="w-full flex flex-col items-center section-animated"
              style={{
                marginBottom: '100px',
                animationDelay: `${groupIndex * 0.2}s`
              }}
            >
              {/* Add main LEADS heading before first vertical */}
              {isFirstLeadsSection && (
                <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-[0.25em] border-b-2 border-amber-400/30 text-center"
                  style={{ marginTop: '10px', marginBottom: '60px', paddingBottom: '10px', color: '#fdee71' }}>
                  LEADS
                </h2>
              )}

              {/* Subheading for vertical name */}
              <h3 className={`${isLeadsSection ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'} font-bold uppercase tracking-[0.25em] border-b-2 border-amber-400/30 text-center`}
                style={{ marginTop: isLeadsSection ? '0' : '10px', marginBottom: '40px', paddingBottom: '10px', color: '#fdee71' }}>
                {isLeadsSection ? leadsVerticalName : group.name}
              </h3>
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
          );
        })}
      </div>
    </div>
  );
};

export default OurTeam;
