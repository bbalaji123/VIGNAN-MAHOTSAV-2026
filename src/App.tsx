import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './Dashboard';

// Lazy load heavy components
const EventDetail = lazy(() => import('./EventDetail'));
const EventsInfo = lazy(() => import('./EventsInfo'));
const CampusAmbassador = lazy(() => import('./CampusAmbassador'));
const CADashboard = lazy(() => import('./CADashboard'));
const CAManagerLogin = lazy(() => import('./CAManagerLogin'));
const CAManagerDashboard = lazy(() => import('./CAManagerDashboard'));
const CampusMap = lazy(() => import('./CampusMap'));
const Hospitality = lazy(() => import('./Hospitality'));
const OurTeam = lazy(() => import('./OurTeam'));
const Sponsors = lazy(() => import('./Sponsors'));
const Schedule = lazy(() => import('./Schedule'));
const ParaSports = lazy(() => import('./ParaSports'));
const Collaboration = lazy(() => import('./Collaboration'));
const Zonals = lazy(() => import('./Zonals'));
const Bangalore = lazy(() => import('./Bangalore'));
const Chennai = lazy(() => import('./Chennai'));
const Vizag = lazy(() => import('./Vizag'));
const Hyderabad = lazy(() => import('./Hyderabad'));
const Tirupathi = lazy(() => import('./Tirupathi'));
const Guide = lazy(() => import('./Guide'));



import React, { useState } from 'react';
import Preloader from './components/Preloader';

function App() {
  const [isDashboardLoaded, setIsDashboardLoaded] = useState(false);
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [bootStart] = useState(() => Date.now());

  return (
    <div className="w-full min-h-screen desktop-bound" role="application" aria-label="Vignan Mahotsav 2026">
      {!preloaderFinished && (
        <Preloader
          isLoading={!isDashboardLoaded}
          maxWaitMs={Math.max(6000, 2000 + (Date.now() - bootStart))}
          onFinish={() => setPreloaderFinished(true)}
        />
      )}
      <Toaster toastOptions={{ style: { zIndex: 999999 } }} containerStyle={{ zIndex: 999999 }} />
      <Router>
        <Suspense fallback={
          <div role="status" aria-live="polite" aria-label="Loading page content">
            <span className="sr-only">Loading...</span>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Dashboard onLoad={() => setIsDashboardLoaded(true)} />} />
            {/* Redundant Routes for Dashboard pointed to same component, we can keep them but need to pass prop or handle uniquely. 
                Ideally, Dashboard handles its own mount. But if we navigate to /dashboard, we want preloader too? 
                Yes. 
            */}
            <Route path="/dashboard" element={<Dashboard onLoad={() => setIsDashboardLoaded(true)} />} />
            <Route path="/register-for-events" element={<Dashboard onLoad={() => setIsDashboardLoaded(true)} />} />
            <Route path="/events" element={<EventsInfo />} />
            <Route path="/events/robos" element={<EventsInfo />} />
            <Route path="/events/arts" element={<EventsInfo />} />
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
            {/* Catch all route - redirect any unknown routes to main page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
