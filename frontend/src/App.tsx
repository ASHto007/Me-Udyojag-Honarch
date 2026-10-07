import './App.css';
import { BrandLogoTab } from './components/BrandLogoTab';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Founder } from './components/Founder';
import { AboutCompany } from './components/AboutCompany';
import { Programs } from './components/Programs';
import { Milestones } from './components/Milestones';
import { Stories } from './components/Stories';
import { Mentors } from './components/Mentors';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Videos } from './components/Videos';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { FloatingDock } from './components/FloatingDock';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="min-h-screen bg-[#FCFBF9] text-[#333333] antialiased relative">
      <Analytics />
      {/* Standalone Fixed Hanging Brand Logo Tab */}
      <BrandLogoTab />

      {/* Main Content Sections */}
      <main className="w-full">
        <Hero />
        <Stats />
        <Founder />
        <AboutCompany />
        <Programs />
        <Milestones />
        <Stories />
        <Mentors />
        <Events />
        <Gallery />
        <Videos />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Responsive Dock */}
      <FloatingDock />
    </div>
  );
}

export default App;
