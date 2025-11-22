import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AboutUs from './components/AboutUs';
import EventDetail from './EventDetail';

function App() {
  return (
    <div className="w-full min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/event/:eventName" element={<EventDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
