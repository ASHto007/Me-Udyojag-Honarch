import './App.css';
import { Header } from './components/Header';
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
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { FloatingDock } from './components/FloatingDock';

function App() {
  return (
    <div className="min-h-screen bg-[#FCFBF9] text-[#333333] antialiased">
      {/* Top Header with Brand Logo */}
      <Header />

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
