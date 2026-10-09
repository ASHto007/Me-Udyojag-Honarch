import React, { useState, useEffect } from 'react';

export interface PreloaderProps {
  minDuration?: number;
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({
  minDuration = 950,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    let frameId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const fraction = Math.min(elapsed / minDuration, 1);

      // Smooth ease-out cubic curve
      const eased = Math.round((1 - Math.pow(1 - fraction, 3)) * 100);
      setProgress(eased);

      if (fraction < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        // Smoothly fade out and reveal main page
        setTimeout(() => {
          setIsFadingOut(true);
          if (onComplete) {
            onComplete();
          }

          setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = originalOverflow;
          }, 600);
        }, 120);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = originalOverflow;
    };
  }, [minDuration, onComplete]);

  if (isDone) return null;

  return (
    <div
      role="status"
      aria-label="Loading Mi Udyojak Honarach"
      aria-live="polite"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0A0E17] text-white select-none transition-all duration-600 ease-out ${
        isFadingOut ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
      }`}
    >
      {/* Subtle ambient executive glow behind logo */}
      <div className="absolute w-72 h-72 rounded-full bg-[#E27500]/12 blur-3xl pointer-events-none" />

      {/* Brand Centerpiece */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo Card */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-3.5 shadow-2xl border border-white/20 flex items-center justify-center mb-6 transition-transform duration-500 hover:scale-105">
          <img
            src="/assets/logo.png"
            alt="Mi Udyojak Honarach"
            width={96}
            height={96}
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>

        {/* Brand Name */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1.5 font-marathi">
          मी उद्योजक होणारच
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-gray-400 font-medium tracking-wider uppercase mb-8">
          Maharashtra’s Entrepreneurship Movement
        </p>

        {/* Minimal Precision Progress Bar */}
        <div className="w-48 sm:w-56 h-[3px] bg-white/10 rounded-full overflow-hidden relative mb-3">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#E27500] to-[#FFA726] rounded-full transition-all duration-100 ease-out shadow-[0_0_8px_rgba(226,117,0,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Discreet Percentage */}
        <span className="text-[11px] font-mono font-medium text-gray-500 tabular-nums">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
