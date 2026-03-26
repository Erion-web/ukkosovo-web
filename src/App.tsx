import { useState, useEffect } from 'react';
import { AdminProvider } from './contexts/AdminContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Mission } from './components/Mission';
import { Services } from './components/Services';
import { TheBridge } from './components/TheBridge';
import { DataFlow } from './components/DataFlow';
import { OurActivities } from './components/OurActivities';
import { Location } from './components/Location';
import { Partners } from './components/Partners';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { ActivityDetail } from './components/ActivityDetail';

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Handle browser back/forward buttons
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple client-side routing
  if (currentPath === '/admin') {
    return <AdminPanel />;
  }

  // Activity detail pages (e.g., /activity/1)
  if (currentPath.startsWith('/activity/')) {
    const activityId = parseInt(currentPath.split('/')[2]);
    if (!isNaN(activityId)) {
      return <ActivityDetail activityId={activityId} />;
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <TheBridge />
        <Mission />
        <DataFlow />
        <Services />
        <OurActivities />
        <Location />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}