import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Award, ArrowRight } from 'lucide-react';
import './AccordionGallery.css';

export interface MentorGalleryItem {
  image: string;
  name: string;
  role: string;
  tag: string;
  experience?: string;
  description: string;
  link?: string;
  alt?: string;
}

export interface AccordionGalleryProps {
  items: MentorGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  trigger?: 'hover' | 'click';
  className?: string;
}

export const AccordionGallery: React.FC<AccordionGalleryProps> = ({
  items,
  defaultIndex = 0,
  accentColor = '#E27500',
  overlayColor = '#0B1320',
  textColor = '#ffffff',
  height = 520,
  gap = 14,
  radius = 24,
  expandRatio = 0.52,
  duration = 0.5,
  ease = 'power2.out',
  parallax = 0.4,
  tilt = 5,
  trigger = 'hover',
  className = ''
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const count = items.length;
  const [active, setActive] = useState<number>(Math.min(Math.max(defaultIndex, 0), count - 1));

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const applyGSAP = useCallback(
    () => {
      if (typeof window === 'undefined' || prefersReduced) return;
      const isMobile = window.innerWidth <= 640;
      if (isMobile) return;

      const panels = panelRefs.current;
      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const rot = isActive ? 0 : i < active ? tilt : -tilt;

        gsap.to(panel, {
          rotateY: rot,
          duration: duration,
          ease: ease,
          overwrite: 'auto'
        });

        if (media) {
          const shift = isActive ? 0 : (active - i) * parallax * 15;
          gsap.to(media, {
            x: shift,
            duration: duration,
            ease: ease,
            overwrite: 'auto'
          });
        }
      });
    },
    [active, duration, ease, parallax, tilt, prefersReduced]
  );

  useEffect(() => {
    applyGSAP();
  }, [applyGSAP]);

  const handleEnter = (i: number) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      if (trigger === 'hover') setActive(i);
    }
  };

  const handlePanelClick = (i: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(i);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActive(i);
    }
  };

  const handleCtaClick = (e: React.MouseEvent, href?: string) => {
    e.stopPropagation();
    if (href) {
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="accordion-gallery-wrapper">
      <div
        ref={rootRef}
        className={`accordion-gallery ${className}`.trim()}
        style={{
          // @ts-expect-error CSS custom properties
          '--ag-accent': accentColor,
          '--ag-overlay': overlayColor,
          '--ag-text': textColor,
          '--ag-gap': `${gap}px`,
          '--ag-radius': `${radius}px`,
          '--ag-expand-grow': `${(expandRatio * (count - 1)) / (1 - expandRatio)}`,
          height: `${height}px`
        }}
        role="list"
        aria-label="Mentors Interactive Gallery"
      >
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <div
              key={i}
              ref={(el: HTMLElement | null) => { panelRefs.current[i] = el; }}
              className={`ag-panel ${isActive ? 'ag-panel--active' : ''}`}
              style={{ borderRadius: `${radius}px` }}
              onClick={(e) => handlePanelClick(i, e)}
              onMouseEnter={() => handleEnter(i)}
              onFocus={() => setActive(i)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              role="listitem"
              tabIndex={0}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`${item.name} - ${item.role}`}
            >
              {/* Mentor Photo Container */}
              <span className="ag-panel__frame">
                <span className="ag-panel__media" ref={(el: HTMLElement | null) => { mediaRefs.current[i] = el; }}>
                  <img
                    src={item.image}
                    alt={item.alt || item.name}
                    draggable="false"
                    loading="eager"
                  />
                </span>
                <span className="ag-panel__overlay" aria-hidden="true" />
              </span>

              {/* Mentor Info Layer */}
              <div className="ag-panel__label" aria-hidden="true">
                {/* Tag / Specialization */}
                <div className="ag-panel__tag-wrapper">
                  <span className="ag-panel__tag">
                    <Award className="w-3 h-3 text-[#E27500]" />
                    <span>{item.tag}</span>
                  </span>
                  {item.experience && (
                    <span className="ag-panel__exp-badge">
                      {item.experience}
                    </span>
                  )}
                </div>

                {/* Mentor Name Header */}
                <div className="ag-panel__header">
                  <span className="ag-panel__bar" />
                  <div className="flex flex-col">
                    <span className="ag-panel__text">
                      {item.name}
                    </span>
                    <span className="ag-panel__role">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* Detailed Bio / Guidance Info on Expand */}
                <p className="ag-panel__subtext">
                  {item.description}
                </p>

                {/* Dedicated Interactive CTA Button */}
                <div className="ag-panel__action">
                  <a
                    href={item.link || '#contact'}
                    onClick={(e) => handleCtaClick(e, item.link || '#contact')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFB783] bg-white/10 hover:bg-[#E27500] hover:text-white px-3.5 py-1.5 rounded-full transition-colors pointer-events-auto cursor-pointer"
                  >
                    <span>Connect with Mentor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Swipe Indicators */}
      <div className="mobile-dots flex sm:hidden items-center justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              active === i ? 'w-6 bg-[#E27500]' : 'bg-white/20'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AccordionGallery;
