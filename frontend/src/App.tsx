import { useState } from 'react';
import './App.css';
import { Preloader } from './components/Preloader';
import { BrandLogoTab } from './components/BrandLogoTab';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Founder } from './components/Founder';
import { AboutCompany } from './components/AboutCompany';
import { Programs } from './components/Programs';
import { Milestones } from './components/Milestones';
// import { Stories } from './components/Stories';
import { Mentors } from './components/Mentors';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Videos } from './components/Videos';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { FloatingDock } from './components/FloatingDock';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCFBF9] text-[#333333] antialiased relative selection:bg-[#E27500]/20 selection:text-[#E27500]">
      {/* Brand Intro Loader Page */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      <Analytics />

      {/* Standalone Fixed Hanging Brand Logo Tab (Fixed to top viewport) */}
      <BrandLogoTab />

      {/* Floating Responsive Dock (Fixed to bottom viewport) */}
      <FloatingDock />

      {/* Main Page Elements — Smooth Cinematic Entrance After Preloader */}
      <div
        className={`w-full transition-opacity duration-1000 ${
          isLoaded
            ? 'opacity-100 filter-none pointer-events-auto'
            : 'opacity-0 blur-[2px] pointer-events-none'
        }`}
      >
        {/* Main Content Sections */}
        <main className="w-full">
          <Hero />
          <Stats />
          <Founder />
          <AboutCompany />
          <Programs />
          <Milestones />
          {/* <Stories /> - hidden as requested */}
          <Mentors />
          <Events />
          <Gallery />
          <Videos />
          <ContactForm />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
