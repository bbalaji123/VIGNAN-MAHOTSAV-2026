import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './components/BackButton';
import FlowerComponent from './components/FlowerComponent';
import './WhatsAppGroups.css';

const WhatsAppGroups: React.FC = () => {
  const navigate = useNavigate();

  const whatsappGroups = [
    { name: 'Cultural Events', link: '#' },
    { name: 'Dance Competition', link: '#' },
    { name: 'Music Competition', link: '#' },
    { name: 'Drama & Theatre', link: '#' },
    { name: 'Art & Craft', link: '#' },
    { name: 'Photography', link: '#' },
    { name: 'Sports Events', link: '#' },
    { name: 'Gaming Zone', link: '#' },
    { name: 'Tech Events', link: '#' },
    { name: 'Literary Events', link: '#' },
    { name: 'Quiz Competition', link: '#' },
    { name: 'Debate Club', link: '#' },
    { name: 'Fashion Show', link: '#' },
    { name: 'Food Festival', link: '#' },
    { name: 'Film Making', link: '#' },
    { name: 'Robotics', link: '#' },
    { name: 'Athletics', link: '#' },
    { name: 'Indoor Games', link: '#' },
    { name: 'Outdoor Games', link: '#' },
    { name: 'Volunteers', link: '#' },
    { name: 'Core Team', link: '#' },
    { name: 'Coordinators', link: '#' },
    { name: 'Campus Ambassadors', link: '#' },
    { name: 'Media Team', link: '#' },
    { name: 'Design Team', link: '#' },
    { name: 'Content Team', link: '#' },
    { name: 'Hospitality', link: '#' },
    { name: 'Registration Desk', link: '#' },
    { name: 'Security Team', link: '#' },
    { name: 'Transport Team', link: '#' },
    { name: 'Technical Support', link: '#' },
    { name: 'General Updates', link: '#' }
  ];

  const handleGroupClick = (link: string) => {
    if (link !== '#') {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="whatsapp-groups-container">
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

      {/* Back Button */}
      <BackButton onClick={() => navigate('/guide')} />

      {/* Main Content */}
      <div className="whatsapp-groups-content">
        <h1 className="whatsapp-groups-title">WhatsApp Groups</h1>
        
        <div className="whatsapp-groups-grid">
          {whatsappGroups.map((group, index) => (
            <button
              key={index}
              className="whatsapp-group-btn"
              onClick={() => handleGroupClick(group.link)}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppGroups;
