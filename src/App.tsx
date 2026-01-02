import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Dashboard from './Dashboard';
import EventDetail from './EventDetail';
import EventsInfo from './EventsInfo';
import CampusAmbassador from './CampusAmbassador';
import CADashboard from './CADashboard';
import CAManagerLogin from './CAManagerLogin';
import CAManagerDashboard from './CAManagerDashboard';
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
import Guide from './Guide';

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
          <Route path="/events/dance" element={<EventsInfo />} />
          <Route path="/events/music" element={<EventsInfo />} />
          <Route path="/events/dramatics" element={<EventsInfo />} />
          <Route path="/events/literature" element={<EventsInfo />} />
          <Route path="/events/visual-arts" element={<EventsInfo />} />
          <Route path="/events/fashion-design" element={<EventsInfo />} />
          <Route path="/events/digital-storytelling" element={<EventsInfo />} />
          <Route path="/events/spot-light" element={<EventsInfo />} />
          <Route path="/events/gaming" element={<EventsInfo />} />
          <Route path="/events/robo-games" element={<EventsInfo />} />
          <Route path="/events/sports" element={<EventsInfo />} />
          <Route path="/events/indoor-sports" element={<EventsInfo />} />
          <Route path="/events/mens-team-sports" element={<EventsInfo />} />
          <Route path="/events/womens-team-sports" element={<EventsInfo />} />
          <Route path="/events/para" element={<EventsInfo />} />
          <Route path="/event/:eventName" element={<EventDetail />} />
          <Route path="/campus-ambassador" element={<CampusAmbassador />} />
          <Route path="/ca-dashboard" element={<CADashboard />} />
          <Route path="/CA-Manager" element={<CAManagerLogin />} />
          <Route path="/ca-manager/dashboard" element={<CAManagerDashboard />} />
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
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
