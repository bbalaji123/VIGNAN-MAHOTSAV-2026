import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './components/BackButton';
import FlowerComponent from './components/FlowerComponent';
import './WhatsAppGroups.css';

const WhatsAppGroups: React.FC = () => {
  const navigate = useNavigate();

  const whatsappGroups = [
    { name: 'Dance', link: 'https://chat.whatsapp.com/CGiQptgxFAF7pBrmQM67r5?mode=gi_t' },
    { name: 'Dramatics', link: 'https://chat.whatsapp.com/JnMGEkCkGQW3VGWdu6FMuO?mode=gi_t' },
    { name: 'Music', link: 'https://chat.whatsapp.com/CvKPomyeoxqGw2El1eJUiI?mode=gi_t' },
    { name: 'Fashion', link: 'https://chat.whatsapp.com/HrvgNYQD7yP5XVOgexudA2?mode=gi_t' },
    { name: 'Visual Arts & Crafts', link: 'https://chat.whatsapp.com/FIoYwPm9C9pDFHBBgvl6wD?mode=gi_t' },
    { name: 'Literature', link: 'https://chat.whatsapp.com/LZ6BuWrjKdR8qACUkeIkFD?mode=gi_t' },
    { name: 'Spotlight', link: 'https://chat.whatsapp.com/G9XGpYaUk3sASRLX9COEHZ?mode=gi_t' },
    { name: 'Gaming', link: 'https://chat.whatsapp.com/GUX5Ml0MeoECEucqjilrL5?mode=gi_t' },
    { name: 'Techno Sports & Races', link: 'https://chat.whatsapp.com/JzrR56fZd9sJzWfomgX2u2?mode=gi_t' },
    { name: 'Sports', link: 'https://chat.whatsapp.com/BnIIwZUop4E5GhnsKSY7xpin' }
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
