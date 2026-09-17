import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface TypewriterConfig {
  phrase: string;
  initialDelay?: number;    // ms before first character (default 500)
  typingSpeed?: number;     // ms per character forward (default 90)
  holdTime?: number;        // ms to hold complete phrase (default 3000)
  deletingSpeed?: number;   // ms per character deleting (default 45)
  pauseBeforeRetype?: number; // ms to wait before retyping (default 500)
  isVisible?: boolean;      // whether hero is in viewport
}

export const TypewriterText: React.FC<TypewriterConfig> = ({
  phrase = 'something big.',
  initialDelay = 500,
  typingSpeed = 90,
  holdTime = 3000,
  deletingSpeed = 45,
  pauseBeforeRetype = 500,
  isVisible = true,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // State machine: 'WAIT_INITIAL' | 'TYPING' | 'HOLD' | 'DELETING' | 'WAIT_RETYPE'
  const stateRef = useRef<'WAIT_INITIAL' | 'TYPING' | 'HOLD' | 'DELETING' | 'WAIT_RETYPE'>('WAIT_INITIAL');
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const clearCurrentTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Main animation step runner
  const step = useCallback(() => {
    if (prefersReducedMotion) {
      setDisplayedText(phrase);
      return;
    }

    // Pause if hero is offscreen or document is hidden
    if (!isVisible || document.hidden) {
      return;
    }

    clearCurrentTimer();

    const currentState = stateRef.current;

    if (currentState === 'WAIT_INITIAL') {
      timerRef.current = setTimeout(() => {
        stateRef.current = 'TYPING';
        step();
      }, initialDelay);
    } else if (currentState === 'TYPING') {
      if (indexRef.current < phrase.length) {
        indexRef.current += 1;
        setDisplayedText(phrase.slice(0, indexRef.current));
        timerRef.current = setTimeout(step, typingSpeed);
      } else {
        stateRef.current = 'HOLD';
        timerRef.current = setTimeout(() => {
          stateRef.current = 'DELETING';
          step();
        }, holdTime);
      }
    } else if (currentState === 'DELETING') {
      if (indexRef.current > 0) {
        indexRef.current -= 1;
        setDisplayedText(phrase.slice(0, indexRef.current));
        timerRef.current = setTimeout(step, deletingSpeed);
      } else {
        stateRef.current = 'WAIT_RETYPE';
        timerRef.current = setTimeout(() => {
          stateRef.current = 'TYPING';
          step();
        }, pauseBeforeRetype);
      }
    } else if (currentState === 'WAIT_RETYPE') {
      stateRef.current = 'TYPING';
      step();
    }
  }, [
    phrase,
    initialDelay,
    typingSpeed,
    holdTime,
    deletingSpeed,
    pauseBeforeRetype,
    isVisible,
    prefersReducedMotion,
    clearCurrentTimer,
  ]);

  // Lifecycle driver
  useEffect(() => {
    if (prefersReducedMotion) {
      clearCurrentTimer();
      setDisplayedText(phrase);
      return;
    }

    step();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearCurrentTimer();
      } else {
        step();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearCurrentTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [step, prefersReducedMotion, clearCurrentTimer, phrase]);

  const showCaret = !prefersReducedMotion;

  return (
    <span className="relative inline-block text-[#E27500] whitespace-nowrap align-baseline">
      {/* Invisible sizing phantom layer reserves exact full width and height */}
      <span
        className="opacity-0 select-none pointer-events-none inline-block invisible"
        aria-hidden="true"
      >
        {phrase}
      </span>

      {/* Animated text overlaid precisely in the reserved space */}
      <span
        className="absolute left-0 top-0 inline-flex items-center text-[#E27500] whitespace-nowrap"
        aria-hidden="true"
      >
        <span>{displayedText}</span>
        {showCaret && (
          <span
            className="inline-block w-[2.5px] sm:w-[3px] lg:w-[3.5px] h-[0.82em] bg-[#E27500] ml-1 animate-pulse"
            style={{ animationDuration: '0.9s' }}
            aria-hidden="true"
          />
        )}
      </span>
    </span>
  );
};

export default TypewriterText;
