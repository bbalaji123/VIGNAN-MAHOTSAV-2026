import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Schedule.css';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';
import { getDaySchedules, scheduleData } from './data/scheduleData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

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
      // Show all Main Schedule events (no day filtering anymore)
      // Keep them sorted by Day, then Time? They are already sorted in scheduleData mostly.
      // But let's explicitly sort by date to be safe if 'scheduleData' order is mixed.
      // Or just leave as is if scheduleData is ordered.
      // Assuming scheduleData is roughly ordered.

      // Exclude workshops from main schedule if that's the intent? 
      // Logic before was: if (showWorkshops), filter(isWorkshop). Else filter(day === selectedDay).
      // Since selectedDay logic is gone, "Else" implies show ALL non-workshops? 
      // Or show ALL events regardless? 
      // Usually "Workshops Only" implies a toggle. The "Full Schedule" might include workshops or exclude them.
      // Let's assume "Full Schedule" excludes events explicitly marked as isWorkshop=true if they are separate?
      // Actually looking at data: workshops were separate events. 
      // Let's show everything if !showWorkshops OR exclude workshops if they are clutter?
      // Original Logic:
      // if (showWorkshops) events.filter(isWorkshop)
      // else events.filter(day === selectedDay) -> day logic applied to ALL.

      // Let's make "Full Schedule" show EVERYTHING (except maybe workshops if they are clutter, but user said "merge all").
      // I will exclude workshops from the main "Schedule" view to keep the toggle meaningful, 
      // OR include everything if safe. Let's exclude workshops on the main list if `isWorkshop` property exists, 
      // to mirror the toggle behavior (Workshops vs Schedule events).
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
        <div className="view-toggle-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
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

        {/* Day Tabs Removed as per user request to "merge all" */}

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
              {filteredEvents.map((event, index) => (
                <div key={`${event.day}-${event.event}-${event.venue}`} className="event-card">
                  <span className="event-category">{event.category}</span>
                  <h3 className="event-name">{event.event}</h3>
                  <div className="event-details">
                    <div className="event-detail-item">
                      <span className="event-detail-icon">
                        <FontAwesomeIcon icon={faCalendarAlt} />
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
