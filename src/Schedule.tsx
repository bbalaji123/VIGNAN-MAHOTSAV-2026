import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Schedule.css';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';
import { scheduleData } from './data/scheduleData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faMapMarkerAlt, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const Schedule: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWorkshops, setShowWorkshops] = useState(false);

  // Dynamically calculate available categories based on view mode
  const categories = useMemo(() => {
    let events = scheduleData;
    if (showWorkshops) {
      events = events.filter(e => e.isWorkshop);
    }
    const uniqueCats = new Set(events.map(e => e.category));
    return ['All', ...Array.from(uniqueCats).sort()];
  }, [showWorkshops]);

  // Reset category selection when switching views
  useEffect(() => {
    setSelectedCategory('All');
  }, [showWorkshops]);

  const filteredEvents = useMemo(() => {
    let events = scheduleData;

    // Filter by view type
    if (showWorkshops) {
      events = events.filter(event => event.isWorkshop);
    } else {
      events = events.filter(event => !event.isWorkshop);
    }

    // Then apply category filter
    if (selectedCategory !== 'All') {
      events = events.filter(event => event.category === selectedCategory);
    }

    // Finally apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      events = events.filter(event =>
        event.event.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query)
      );
    }

    return events;
  }, [selectedCategory, searchQuery, showWorkshops]);

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split('.');
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
  };

  const handleSportsPdfClick = () => {
    const link = document.createElement('a');
    link.href = '/images/p1.jpeg';
    link.download = 'p1.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCulturalsPdfClick = () => {
    const link = document.createElement('a');
    link.href = '/images/p2.jpeg';
    link.download = 'p2.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden schedule-container" style={{
      backgroundImage: 'url("/images/Background.png")',
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

      {/* Back Button */}
      <BackButton onClick={() => navigate('/?menu=true')} />

      {/* Schedule Header */}
      <div className="schedule-header">
        <h1 className="schedule-title">Mahotsav 2026 {showWorkshops ? 'Workshops' : 'Schedule'}</h1>

        {/* View Toggle */}
        <div className="view-toggle-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            className={`view-toggle-btn ${!showWorkshops ? 'active' : ''}`}
            onClick={() => setShowWorkshops(false)}
          >
            Full Schedule
          </button>
          <button
            className={`view-toggle-btn ${showWorkshops ? 'active' : ''}`}
            onClick={() => setShowWorkshops(true)}
          >
            Workshops Only
          </button>
        </div>

        {/* PDF Download Buttons */}
        <div className="pdf-buttons-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            className="view-toggle-btn"
            style={{ backgroundColor: '#db2777', color: 'white', border: 'none' }}
            onClick={handleSportsPdfClick}
          >
            Sports PDF
          </button>
          <button
            className="view-toggle-btn"
            style={{ backgroundColor: '#db2777', color: 'white', border: 'none' }}
            onClick={handleCulturalsPdfClick}
          >
            Culturals PDF
          </button>
        </div>

        {/* Search and Filter */}
        <div className="search-filter-section">
          <input
            type="text"
            className="search-box"
            placeholder="Search events, venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Schedule Content */}
      <div className="schedule-content">
        {filteredEvents.length > 0 ? (
          <>
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <div key={`${event.day}-${event.event}-${event.venue}`} className="event-card">
                  <span className="event-category">{event.category}</span>
                  <h3 className="event-name">{event.event}</h3>
                  <div className="event-details">
                    <div className="event-detail-item">
                      <span className="event-detail-icon">
                        <FontAwesomeIcon icon={faCalendar} />
                      </span>
                      <span>{formatDate(event.day)}</span>
                    </div>
                    <div className="event-detail-item">
                      <span className="event-detail-icon">
                        <FontAwesomeIcon icon={faClock} />
                      </span>
                      <span>{event.time}</span>
                    </div>
                    <div className="event-detail-item">
                      <span className="event-detail-icon">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                      </span>
                      <span>{event.venue}</span>
                    </div>
                    {event.isWorkshop && (
                      <div className="event-detail-item workshop-badge">
                        <span className="event-detail-icon">
                          <FontAwesomeIcon icon={faGraduationCap} />
                        </span>
                        <span>Workshop</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-events">
            {searchQuery ? 'No events found matching your search.' : 'No events scheduled.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
