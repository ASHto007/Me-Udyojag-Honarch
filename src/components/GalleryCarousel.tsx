import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Maximize2, Tag, Calendar } from 'lucide-react';
import './Gallery.css';

export interface GalleryItemDto {
  id: string;
  image: { url: string; alt: string };
  title: string;
  description: string;
  chapter: string;
  categoryLabel: string;
  badge: string;
  statIcon: string;
  stat: string;
}

export interface GalleryCarouselProps {
  items: GalleryItemDto[];
  onOpenLightbox: (item: GalleryItemDto) => void;
  className?: string;
}

export const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
  items,
  onOpenLightbox,
  className = ''
}) => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [activeCenterIndex, setActiveCenterIndex] = useState(0);

  // Animation & Physics Refs
  const progressRef = useRef(0);
  const targetProgressRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const isInteractingRef = useRef(false);
  const isVisibleRef = useRef(true);

  // Drag tracking refs
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartProgressRef = useRef(0);
  const isDraggingRef = useRef(false);
  const directionLockedRef = useRef<'horizontal' | 'vertical' | null>(null);

  const count = items.length;
  const angleStep = (2 * Math.PI) / count;

  // Render loop using requestAnimationFrame
  const updateCardsTransform = useCallback(() => {
    if (!stageRef.current) return;
    const cards = stageRef.current.querySelectorAll('.gallery-3d-card') as NodeListOf<HTMLElement>;
    const stageWidth = stageRef.current.clientWidth;
    const isMobile = stageWidth < 640;
    const radius = isMobile ? 360 : 540;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, i) => {
      // Calculate angular position on cylinder
      let angle = (progressRef.current + i * angleStep) % (2 * Math.PI);
      if (angle > Math.PI) angle -= 2 * Math.PI;
      if (angle < -Math.PI) angle += 2 * Math.PI;

      const absAngle = Math.abs(angle);
      if (absAngle < minDistance) {
        minDistance = absAngle;
        closestIndex = i;
      }

      // 3D positioning
      const x = Math.sin(angle) * radius;
      const z = (Math.cos(angle) - 1) * radius;
      const rotY = -(angle * 180) / Math.PI;

      // Scale & opacity based on angle distance
      const cosVal = Math.cos(angle);
      const scale = Math.max(0.68, Math.min(1.08, 0.72 + 0.36 * Math.max(0, cosVal)));
      const opacity = Math.max(0, Math.min(1, 1 - (absAngle / (Math.PI * 0.75))));
      const isCenter = absAngle < 0.25;

      card.style.transform = `translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex = `${Math.round(cosVal * 100)}`;
      card.style.pointerEvents = opacity < 0.2 ? 'none' : 'auto';

      if (isCenter) {
        card.classList.add('gallery-3d-card--center');
      } else {
        card.classList.remove('gallery-3d-card--center');
      }
    });

    setActiveCenterIndex(closestIndex);
  }, [angleStep]);

  // Main RAF tick
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (time: number) => {
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // If targeted to a specific card, smoothly ease to target
      if (targetProgressRef.current !== null) {
        const diff = targetProgressRef.current - progressRef.current;
        if (Math.abs(diff) < 0.001) {
          progressRef.current = targetProgressRef.current;
          targetProgressRef.current = null;
        } else {
          progressRef.current += diff * 0.12;
        }
        updateCardsTransform();
      } else if (!isInteractingRef.current && isVisibleRef.current && !prefersReduced) {
        // Continuous constant rotation speed (~5.5s per card)
        const speed = angleStep / 5.5;
        progressRef.current = (progressRef.current - speed * delta) % (2 * Math.PI);
        updateCardsTransform();
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [angleStep, updateCardsTransform]);

  // IntersectionObserver to pause when out of viewport
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(stage);

    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Center to a specific card
  const centerToCard = (index: number) => {
    let currentAngle = (progressRef.current + index * angleStep) % (2 * Math.PI);
    if (currentAngle > Math.PI) currentAngle -= 2 * Math.PI;
    if (currentAngle < -Math.PI) currentAngle += 2 * Math.PI;

    targetProgressRef.current = progressRef.current - currentAngle;
  };

  // Mouse & Touch Drag Events with Direction Lock
  const handlePointerDown = (clientX: number, clientY: number) => {
    isInteractingRef.current = true;
    isDraggingRef.current = true;
    dragStartXRef.current = clientX;
    dragStartYRef.current = clientY;
    dragStartProgressRef.current = progressRef.current;
    targetProgressRef.current = null;
    directionLockedRef.current = null;
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;

    const deltaX = clientX - dragStartXRef.current;
    const deltaY = clientY - dragStartYRef.current;

    if (!directionLockedRef.current) {
      if (Math.abs(deltaY) > 8 && Math.abs(deltaY) > Math.abs(deltaX)) {
        directionLockedRef.current = 'vertical';
        isDraggingRef.current = false;
        return;
      }
      if (Math.abs(deltaX) > 8) {
        directionLockedRef.current = 'horizontal';
      }
    }

    if (directionLockedRef.current === 'horizontal') {
      const sensitivity = 0.0035;
      progressRef.current = dragStartProgressRef.current + deltaX * sensitivity;
      updateCardsTransform();
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    directionLockedRef.current = null;
    isInteractingRef.current = false;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      centerToCard((activeCenterIndex + 1) % count);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      centerToCard((activeCenterIndex - 1 + count) % count);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenLightbox(items[activeCenterIndex]);
    }
  };

  return (
    <div
      ref={stageRef}
      className={`gallery-3d-stage ${className}`.trim()}
      onMouseEnter={() => { isInteractingRef.current = true; }}
      onMouseLeave={() => { if (!isDraggingRef.current) isInteractingRef.current = false; }}
      onFocus={() => { isInteractingRef.current = true; }}
      onBlur={() => { isInteractingRef.current = false; }}
      onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
      onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
      onMouseUp={handlePointerUp}
      onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="3D Continuous Cylinder Photo Gallery"
    >
      <div className="gallery-3d-cylinder">
        {items.map((item, i) => {
          const isCenter = i === activeCenterIndex;
          return (
            <div
              key={item.id}
              className={`gallery-3d-card ${isCenter ? 'gallery-3d-card--center' : ''}`}
              onClick={() => {
                if (isCenter) {
                  onOpenLightbox(item);
                } else {
                  centerToCard(i);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${item.title} - ${item.chapter}`}
            >
              {/* Media layer */}
              <div className="gallery-3d-card__media">
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  draggable="false"
                  loading="eager"
                />
              </div>
              <div className="gallery-3d-card__overlay" />

              {/* Caption content */}
              <div className="gallery-3d-card__content">
                <div className="gallery-3d-card__eyebrow">
                  <span className="gallery-3d-card__badge">
                    <Tag className="w-3 h-3 text-[#E27500]" />
                    <span>{item.badge}</span>
                  </span>
                  <span className="gallery-3d-card__stat inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-white/60" />
                    <span>{item.stat}</span>
                  </span>
                </div>

                <h3 className="gallery-3d-card__title">
                  {item.title}
                </h3>
                <p className="gallery-3d-card__desc">
                  {item.description}
                </p>

                <div className="gallery-3d-card__hint">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to expand image</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryCarousel;
