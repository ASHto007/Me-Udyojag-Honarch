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

  // Active Section Detection: Home active at top, About not highlighted prematurely
  useEffect(() => {
    const sectionList = [
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

    let ticking = false;

    const checkActive = () => {
      const scrollY = window.scrollY;

      // 1. Home must always be active when hero is visible near top
      if (scrollY < 260) {
        setActiveSection('top');
        return;
      }

      // 2. Near bottom of page -> Contact / Join
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 70) {
        setActiveSection('contact');
        return;
      }

      // 3. Trigger line accounts for sticky elements and viewport center
      const triggerY = scrollY + window.innerHeight * 0.38;

      let currentId = 'top';
      for (const item of sectionList) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (triggerY >= top) {
            currentId = item.dockId;
          }
        }
      }

      setActiveSection(currentId);
    };

    const handleScrollActive = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    checkActive();

    window.addEventListener('scroll', handleScrollActive, { passive: true });
    window.addEventListener('resize', handleScrollActive, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollActive);
      window.removeEventListener('resize', handleScrollActive);
    };
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
    if (href === '#' || href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('top');
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const targetY = element.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      const navItem = navItems.find((n) => n.href === href);
      if (navItem) setActiveSection(navItem.id);
    }
  };

  return (
    <nav
      aria-label="Floating Navigation"
      className={`ios-dock ${isCollapsed ? 'ios-dock--collapsed' : 'ios-dock--expanded'}`}
    >
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

export default FloatingDock;
