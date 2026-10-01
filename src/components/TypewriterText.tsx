import React, { useState, useEffect, useRef } from 'react';

export interface TypewriterConfig {
  phrase?: string;
  initialDelay?: number;     // ms before starting typing (default 200)
  typingSpeed?: number;      // ms per character forward (default 75)
  holdTime?: number;         // ms to hold complete phrase before delete (default 1200)
  deletingSpeed?: number;    // ms per character delete (default 40)
  pauseBeforeRetype?: number;// ms to wait before retyping (default 300)
}

export const TypewriterText: React.FC<TypewriterConfig> = ({
  phrase = 'something big.',
  initialDelay = 200,
  typingSpeed = 75,
  holdTime = 1200,
  deletingSpeed = 40,
  pauseBeforeRetype = 300,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isReducedMotion, setIsReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const stateRef = useRef<'TYPING' | 'HOLD' | 'DELETING' | 'WAIT_RETYPE'>('TYPING');
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  useEffect(() => {
    // If user prefers reduced motion, display full phrase statically
    if (isReducedMotion) {
      return;
    }

    let isMounted = true;
    indexRef.current = 0;
    stateRef.current = 'TYPING';

    const runStep = () => {
      if (!isMounted) return;

      const currentState = stateRef.current;

      if (currentState === 'TYPING') {
        if (indexRef.current < phrase.length) {
          indexRef.current += 1;
          setDisplayedText(phrase.slice(0, indexRef.current));
          timerRef.current = setTimeout(runStep, typingSpeed);
        } else {
          stateRef.current = 'HOLD';
          timerRef.current = setTimeout(runStep, holdTime);
        }
      } else if (currentState === 'HOLD') {
        stateRef.current = 'DELETING';
        timerRef.current = setTimeout(runStep, deletingSpeed);
      } else if (currentState === 'DELETING') {
        if (indexRef.current > 0) {
          indexRef.current -= 1;
          setDisplayedText(phrase.slice(0, indexRef.current));
          timerRef.current = setTimeout(runStep, deletingSpeed);
        } else {
          stateRef.current = 'WAIT_RETYPE';
          timerRef.current = setTimeout(runStep, pauseBeforeRetype);
        }
      } else if (currentState === 'WAIT_RETYPE') {
        stateRef.current = 'TYPING';
        timerRef.current = setTimeout(runStep, typingSpeed);
      }
    };

    // Begin typing loop without pause
    timerRef.current = setTimeout(runStep, initialDelay);

    return () => {
      isMounted = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [phrase, initialDelay, typingSpeed, holdTime, deletingSpeed, pauseBeforeRetype, isReducedMotion]);

  if (isReducedMotion) {
    return <span className="inline-block text-[#E27500]">{phrase}</span>;
  }

  return (
    <span className="relative inline-block text-[#E27500] whitespace-nowrap align-baseline pr-2">
      {/* Invisible sizing phantom layer reserves exact full width and height to prevent any layout shift */}
      <span
        className="opacity-0 select-none pointer-events-none inline-block invisible"
        aria-hidden="true"
      >
        {phrase}
      </span>

      {/* Animated continuous typing text overlaid precisely within the reserved space */}
      <span
        className="absolute left-0 top-0 inline-flex items-center text-[#E27500] whitespace-nowrap"
        aria-hidden="true"
      >
        <span>{displayedText}</span>
        <span
          className="inline-block w-[2.5px] sm:w-[3px] lg:w-[3.5px] h-[0.82em] bg-[#E27500] ml-1 animate-pulse"
          style={{ animationDuration: '0.8s' }}
          aria-hidden="true"
        />
      </span>
    </span>
  );
};

export default TypewriterText;
