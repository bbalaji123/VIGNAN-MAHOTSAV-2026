import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Dashboard from './Dashboard';
import EventDetail from './EventDetail';
import EventsInfo from './EventsInfo';
import CampusAmbassador from './CampusAmbassador';
import CampusMap from './CampusMap';
import Hospitality from './Hospitality';
import OurTeam from './OurTeam';
import Sponsors from './Sponsors';
import Schedule from './Schedule';
import ParaSports from './ParaSports';
import Collaboration from './Collaboration';
import Zonals from './Zonals';
import Bangalore from './Bangalore';
import Chennai from './Chennai';
import Vizag from './Vizag';
import Hyderabad from './Hyderabad';
import Tirupathi from './Tirupathi';

function ExternalRedirect({ url }: { url: string }) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);
  return null;
}

function App() {
  return (
    <div className="w-full min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events-info" element={<EventsInfo />} />
          <Route path="/event/:eventName" element={<EventDetail />} />
          <Route path="/campus-ambassador" element={<CampusAmbassador />} />
          <Route path="/campus-map" element={<CampusMap />} />
          <Route path="/hospitality" element={<Hospitality />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/para-sports" element={<ParaSports />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/zonals" element={<Zonals />} />
          <Route path="/zonals/bangalore" element={<Bangalore />} />
          <Route path="/zonals/chennai" element={<Chennai />} />
          <Route path="/zonals/vizag" element={<Vizag />} />
          <Route path="/zonals/hyderabad" element={<Hyderabad />} />
          <Route path="/zonals/tirupathi" element={<Tirupathi />} />
          <Route path="/guide" element={<ExternalRedirect url="https://vignan.ac.in/mahotsav/mahotsav2025/mahotsav_guide.php" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
