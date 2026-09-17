import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Calendar, Award, MapPin, Newspaper, Maximize2 } from 'lucide-react';
import type { GalleryItemDto } from './Gallery';
import './OrbitImages.css';

export interface OrbitImagesProps {
  items: GalleryItemDto[];
  onOpenLightbox: (item: GalleryItemDto) => void;
  isLightboxOpen?: boolean;
  className?: string;
}

export const OrbitImages: React.FC<OrbitImagesProps> = ({
  items,
  onOpenLightbox,
  isLightboxOpen = false,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Responsive stage width
  const [stageWidth, setStageWidth] = useState<number>(1200);

  // Active center index for synchronized spotlight caption
  const [activeCenterIndex, setActiveCenterIndex] = useState<number>(0);
  const activeCenterIndexRef = useRef<number>(0);

  // Controls state
  const [isManualPaused, setIsManualPaused] = useState<boolean>(false);
  const [isPlayingVisual, setIsPlayingVisual] = useState<boolean>(true);

  // Animation controller refs for continuous smooth marquee
  const continuousProgressRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isFocusInsideRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isResumeWaitingRef = useRef<boolean>(false);
  const isManualPausedRef = useRef<boolean>(false);
  const isLightboxOpenRef = useRef<boolean>(isLightboxOpen);

  // Drag tracking refs
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartYRef = useRef<number>(0);
  const dragOffsetStepRef = useRef<number>(0);
  const didDragMoveRef = useRef<boolean>(false);

  const rafIdRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(performance.now());

  const originalCount = items.length;

  // Build display items: repeat items if list is short to ensure an uninterrupted, seamless infinite track
  const displayItems = useMemo(() => {
    if (items.length === 0) return [];
    let list: Array<{ item: GalleryItemDto; originalIndex: number }> = items.map((item, idx) => ({
      item,
      originalIndex: idx,
    }));
    while (list.length < 10) {
      list = [...list, ...items.map((item, idx) => ({ item, originalIndex: idx }))];
    }
    return list;
  }, [items]);

  const totalCards = displayItems.length;

  // Keep refs synchronized
  useEffect(() => {
    isManualPausedRef.current = isManualPaused;
    setIsPlayingVisual(!isManualPaused);
  }, [isManualPaused]);

  useEffect(() => {
    isLightboxOpenRef.current = isLightboxOpen;
  }, [isLightboxOpen]);

  // Responsive resize observer
  useEffect(() => {
    if (!stageRef.current) return;
    const updateSize = () => {
      if (stageRef.current) {
        setStageWidth(stageRef.current.clientWidth);
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  // IntersectionObserver to pause when offscreen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Geometry configuration: larger cards, tightly reduced gap, edge-to-edge full width
  const isMobile = stageWidth < 768;
  const isTablet = stageWidth >= 768 && stageWidth < 1100;
  const isWide = stageWidth >= 1500;

  // Increased prominent card sizes
  const cardWidth = isMobile
    ? Math.min(320, Math.round(stageWidth * 0.82))
    : (isWide ? 500 : (isTablet ? 400 : 455));
  const cardHeight = Math.round(cardWidth * 0.62);

  // Tight, uniform gap between every card
  const gap = isMobile ? 16 : (isWide ? 26 : 20);
  const slotSpacing = cardWidth + gap;

  // Rear shallow curve in Y and depth in Z
  const radiusY = isMobile ? 45 : (isWide ? 90 : 75);
  const radiusZ = isMobile ? 120 : (isWide ? 250 : 200);
  const maxSpan = (stageWidth / 2) + cardWidth;

  // Render transformed photo panels along rear oval arc with uniform spacing and constant marquee velocity
  const renderCards = useCallback(() => {
    if (!stageRef.current || totalCards === 0) return;
    const cards = stageRef.current.querySelectorAll('.rear-oval-card') as NodeListOf<HTMLElement>;

    // Current continuous marquee progress + user drag offset
    const currentP = continuousProgressRef.current + dragOffsetStepRef.current;

    let closestDist = Infinity;
    let closestOriginalIdx = 0;

    const fadeStart = (stageWidth / 2) - (cardWidth * 0.15);
    const fadeEnd = (stageWidth / 2) + (cardWidth * 0.70);

    cards.forEach((card) => {
      const idxAttr = card.getAttribute('data-index');
      if (idxAttr === null) return;
      const idx = parseInt(idxAttr, 10);
      if (idx >= displayItems.length) return;

      // Distance in slots from center (0)
      let d = (((idx + currentP) % totalCards) + totalCards) % totalCards;
      if (d > totalCards / 2) {
        d -= totalCards;
      }

      // Exact linear horizontal position (uniform spacing everywhere: gap is exactly 'gap' px)
      const x = -d * slotSpacing;
      const absX = Math.abs(x);

      // Track closest card for synchronized spotlight
      if (Math.abs(d) < closestDist) {
        closestDist = Math.abs(d);
        closestOriginalIdx = displayItems[idx].originalIndex;
      }

      // Hide cards that are completely offscreen
      if (absX > fadeEnd) {
        card.style.opacity = '0';
        card.style.visibility = 'hidden';
        card.style.pointerEvents = 'none';
        card.setAttribute('aria-hidden', 'true');
        card.setAttribute('tabindex', '-1');
        return;
      }

      card.style.visibility = 'visible';

      // Normalized horizontal coordinate along the rear oval
      const u = Math.max(-1.3, Math.min(1.3, x / maxSpan));

      // Parabolic curve: 1 at center (deepest), 0 at sides
      const curveFactor = Math.max(0, 1 - Math.pow(Math.min(1, Math.abs(u)), 2));

      // 3D coordinates along rear arc
      const y = -radiusY * curveFactor;
      const z = -radiusZ * curveFactor;

      // Middle photos slightly more distant (0.86), side photos slightly larger (1.02)
      const scale = 1.02 - 0.16 * curveFactor;

      // Gentle inward perspective rotation while keeping photo fronts recognizable
      const rotateY = -18 * Math.max(-1, Math.min(1, u));

      // Opacity: solid across the stage, clean smooth fade only near the very edge of viewport
      let opacity = 1.0;
      if (absX > fadeStart) {
        opacity = Math.max(0, 1 - (absX - fadeStart) / (fadeEnd - fadeStart));
      }

      // Depth brightness: subtle depth feel
      const brightness = 1.0 - 0.10 * curveFactor;
      const zIndex = Math.round(100 * (1 - curveFactor));

      card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = `brightness(${brightness.toFixed(3)})`;
      card.style.zIndex = `${zIndex}`;
      card.style.pointerEvents = opacity < 0.2 ? 'none' : 'auto';
      card.setAttribute('aria-hidden', opacity < 0.25 ? 'true' : 'false');
      card.setAttribute('tabindex', opacity < 0.25 ? '-1' : '0');

      if (Math.abs(d) < 0.45) {
        card.classList.add('rear-oval-card--active');
      } else {
        card.classList.remove('rear-oval-card--active');
      }
    });

    // Update active spotlight only when changed to avoid re-rendering frames
    if (activeCenterIndexRef.current !== closestOriginalIdx) {
      activeCenterIndexRef.current = closestOriginalIdx;
      setActiveCenterIndex(closestOriginalIdx);
    }
  }, [totalCards, displayItems, slotSpacing, stageWidth, cardWidth, maxSpan, radiusY, radiusZ]);

  // Main continuous marquee animation frame loop
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      renderCards();
      return;
    }

    const tick = (now: number) => {
      const dt = Math.min(100, now - lastTimestampRef.current);
      lastTimestampRef.current = now;

      const isPaused =
        isManualPausedRef.current ||
        isHoveredRef.current ||
        isFocusInsideRef.current ||
        isLightboxOpenRef.current ||
        !isVisibleRef.current ||
        isResumeWaitingRef.current ||
        isDraggingRef.current;

      if (!isPaused && totalCards > 0) {
        // Continuous smooth marquee flow: ~4 seconds per card
        const marqueeSpeed = 0.00025; // slots per ms
        continuousProgressRef.current = (continuousProgressRef.current + marqueeSpeed * dt) % totalCards;
      }

      renderCards();
      rafIdRef.current = requestAnimationFrame(tick);
    };

    lastTimestampRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [totalCards, renderCards]);

  // Hover handlers: immediately freeze, and resume 1 second after pointer leaves
  const handlePointerEnter = useCallback(() => {
    isHoveredRef.current = true;
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    isResumeWaitingRef.current = false;
  }, []);

  const handlePointerLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    // Wait exactly 1 second after pointer leaves before resuming smoothly
    isResumeWaitingRef.current = true;
    resumeTimerRef.current = setTimeout(() => {
      isResumeWaitingRef.current = false;
      lastTimestampRef.current = performance.now();
    }, 1000);
  }, []);

  // Keyboard focus handlers
  const handleFocus = useCallback(() => {
    isFocusInsideRef.current = true;
  }, []);

  const handleBlur = useCallback(() => {
    isFocusInsideRef.current = false;
  }, []);

  // Manual Previous/Next navigation
  const handlePrev = useCallback(() => {
    if (totalCards === 0) return;
    continuousProgressRef.current = (continuousProgressRef.current - 1 + totalCards) % totalCards;
    renderCards();
  }, [totalCards, renderCards]);

  const handleNext = useCallback(() => {
    if (totalCards === 0) return;
    continuousProgressRef.current = (continuousProgressRef.current + 1) % totalCards;
    renderCards();
  }, [totalCards, renderCards]);

  // Manual Play/Pause toggle
  const togglePlayPause = useCallback(() => {
    setIsManualPaused((prev) => !prev);
  }, []);

  // Drag / Touch gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    didDragMoveRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    dragOffsetStepRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    const dy = e.clientY - dragStartYRef.current;

    // Distinguish intentional drag from accidental tap
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      didDragMoveRef.current = true;
    }

    // Convert horizontal pixel drag into fractional slot progress
    const stepDelta = -(dx / slotSpacing);
    dragOffsetStepRef.current = stepDelta;
    renderCards();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }

    // Apply drag offset smoothly to continuous progress
    const offset = dragOffsetStepRef.current;
    continuousProgressRef.current = (continuousProgressRef.current + offset + totalCards * 10) % totalCards;
    dragOffsetStepRef.current = 0;

    // 1-second delay before resuming marquee
    isResumeWaitingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isResumeWaitingRef.current = false;
      lastTimestampRef.current = performance.now();
    }, 1000);

    renderCards();
  };

  const handleCardClick = (item: GalleryItemDto) => {
    // Only open lightbox if it was a pure click, not an accidental drag gesture
    if (!didDragMoveRef.current) {
      onOpenLightbox(item);
    }
  };

  const currentCenterItem = items[activeCenterIndex] || items[0];

  const statIcon = useMemo(() => {
    if (!currentCenterItem) return Calendar;
    switch (currentCenterItem.statIcon) {
      case 'award':
        return Award;
      case 'map-pin':
        return MapPin;
      case 'newspaper':
        return Newspaper;
      default:
        return Calendar;
    }
  }, [currentCenterItem]);

  const StatIconComponent = statIcon;

  return (
    <div
      ref={containerRef}
      className={`rear-oval-carousel ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label="Interactive Archival Photographs Carousel"
    >
      {/* ─── Top Manual Controls Bar ─── */}
      <div className="rear-oval-controls-bar">
        <div className="rear-oval-nav-btns">
          <button
            onClick={handlePrev}
            className="rear-oval-btn"
            aria-label="Previous photograph"
            title="Previous (Left arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlayPause}
            className={`rear-oval-btn ${!isPlayingVisual ? 'rear-oval-btn--active' : ''}`}
            aria-label={isPlayingVisual ? 'Pause autoplay' : 'Play autoplay'}
            title={isPlayingVisual ? 'Pause (Space)' : 'Play (Space)'}
          >
            {isPlayingVisual ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={handleNext}
            className="rear-oval-btn"
            aria-label="Next photograph"
            title="Next (Right arrow)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Counter indicator */}
        <div className="rear-oval-counter">
          <span className="text-[#FFB783] font-bold">{activeCenterIndex + 1}</span>
          <span className="text-gray-500 mx-1">/</span>
          <span className="text-gray-400">{originalCount}</span>
        </div>
      </div>

      {/* ─── 3D Rear Oval Stage (Uniform spacing, reduced gap, no glowing line) ─── */}
      <div
        ref={stageRef}
        className="rear-oval-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="region"
        aria-live="polite"
      >
        <div className="rear-oval-track">
          {displayItems.map((entry, idx) => (
            <div
              key={`${entry.item.id}-${idx}`}
              data-index={idx}
              className="rear-oval-card"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
              }}
              onClick={() => handleCardClick(entry.item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenLightbox(entry.item);
                }
              }}
              aria-label={`Enlarge photo: ${entry.item.title}`}
            >
              <div className="rear-oval-card__inner">
                <img
                  src={entry.item.image.url}
                  alt={entry.item.image.alt}
                  draggable={false}
                  className="rear-oval-card__img"
                />
                <div className="rear-oval-card__gradient" />

                {/* Card Header Badge */}
                <div className="rear-oval-card__badge-row">
                  <span className="rear-oval-card__badge">
                    {entry.item.badge}
                  </span>
                  <span className="rear-oval-card__expand-hint">
                    <Maximize2 className="w-3.5 h-3.5 text-white/80" />
                  </span>
                </div>

                {/* Card Bottom Title Overlay */}
                <div className="rear-oval-card__caption">
                  <h4 className="rear-oval-card__title">
                    {entry.item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Lower Foreground Synchronized Spotlight & Caption ─── */}
      {currentCenterItem && (
        <div className="rear-oval-spotlight">
          <div className="rear-oval-spotlight__content">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div className="inline-flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#E27500]/20 border border-[#E27500]/40 text-[#FFB783] text-xs font-bold uppercase tracking-wider">
                  {currentCenterItem.categoryLabel}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {currentCenterItem.chapter}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <StatIconComponent className="w-3.5 h-3.5 text-[#E27500]" />
                <span>{currentCenterItem.stat}</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
              {currentCenterItem.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 max-w-3xl">
              {currentCenterItem.description}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                onClick={() => onOpenLightbox(currentCenterItem)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFB783] hover:text-white transition-colors cursor-pointer group"
                aria-label="Enlarge full resolution photo in lightbox"
              >
                <span>Click to view full archival photo</span>
                <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Navigation dots */}
              <div className="flex items-center gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      continuousProgressRef.current = (totalCards - i + totalCards * 10) % totalCards;
                      renderCards();
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeCenterIndex === i ? 'w-6 bg-[#E27500]' : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to photo ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrbitImages;
