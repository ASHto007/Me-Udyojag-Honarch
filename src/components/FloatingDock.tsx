import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Home, User, Briefcase, Calendar, Award, Users, Image, MessageSquare } from 'lucide-react';

export const FloatingDock: React.FC = () => {
  const [activeSection, setActiveSection] = useState('top');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);

  const navItems = [
    { href: '#', label: 'Home', icon: Home, id: 'top' },
    { href: '#founder-vision', label: 'About', icon: User, id: 'about' },
    { href: '#programs', label: 'Services', icon: Briefcase, id: 'programs' },
    { href: '#achievements', label: 'Milestones', icon: Award, id: 'achievements' },
    { href: '#mentors', label: 'Mentors', icon: Users, id: 'mentors' },
    { href: '#community', label: 'Events', icon: Calendar, id: 'community' },
    { href: '#gallery', label: 'Gallery', icon: Image, id: 'gallery' },
    { href: '#contact', label: 'Join', icon: MessageSquare, id: 'contact' },
  ];

  // Zero-cost Active Section Detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      { id: 'top', dockId: 'top' },
      { id: 'founder-vision', dockId: 'about' },
      { id: 'about-company', dockId: 'about' },
      { id: 'programs', dockId: 'programs' },
      { id: 'achievements', dockId: 'achievements' },
      { id: 'mentors', dockId: 'mentors' },
      { id: 'community', dockId: 'community' },
      { id: 'gallery', dockId: 'gallery' },
      { id: 'contact', dockId: 'contact' }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sectionIds.find((s) => s.id === entry.target.id);
            if (match) {
              setActiveSection(match.dockId);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
      }
    );

    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lightweight scroll collapse handler (zero DOM reads)
  const handleScroll = useCallback(() => {
    if (!isScrollingRef.current) {
      isScrollingRef.current = true;
      setIsCollapsed(true);
    }

    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }

    scrollTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      setIsCollapsed(false);
    }, 280);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [handleScroll]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('top');
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      aria-label="Floating Navigation"
      className={`ios-dock ${isCollapsed ? 'ios-dock--collapsed' : 'ios-dock--expanded'}`}
    >
      {/* Liquid glass top specular refraction sweep */}
      <div className="ios-dock__glow" />

      {/* Nav items container */}
      <div className="ios-dock__items">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              className={`ios-dock__item ${isActive ? 'ios-dock__item--active' : ''}`}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="ios-dock__icon" strokeWidth={isActive ? 2.2 : 1.6} />
              <span className="ios-dock__label">{item.label}</span>
              {isActive && <span className="ios-dock__dot" />}
            </a>
          );
        })}
      </div>
    </nav>
  );
};
