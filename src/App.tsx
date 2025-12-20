import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
