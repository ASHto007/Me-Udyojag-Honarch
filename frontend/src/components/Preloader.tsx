import React, { useState, useEffect } from 'react';

export interface PreloaderProps {
  minDuration?: number;
  onComplete?: () => void;
}

const STAGES = [
  { at: 0, tag: '01 / 04', text: 'सक्षमीकरण • INSPIRING ENTREPRENEURS' },
  { at: 28, tag: '02 / 04', text: 'परिसंवाद • 500+ INDUSTRY TITANS' },
  { at: 62, tag: '03 / 04', text: 'उद्योग क्रांती • MSME GROWTH NETWORK' },
  { at: 88, tag: '04 / 04', text: 'अभिजात मराठी • SHAPING MAHARASHTRA' },
];

export const Preloader: React.FC<PreloaderProps> = ({
  minDuration = 1750,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(STAGES[0]);
  const [isLifting, setIsLifting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    let frameId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const fraction = Math.min(elapsed / minDuration, 1);

      // Smooth cubic ease-out
      const eased = Math.round((1 - Math.pow(1 - fraction, 3)) * 100);
      setProgress(eased);

      for (let i = STAGES.length - 1; i >= 0; i--) {
        if (eased >= STAGES[i].at) {
          setStage(STAGES[i]);
          break;
        }
      }

      if (fraction < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        // Hold 100% momentarily for visual satisfaction, then trigger theatrical reveal
        setTimeout(() => {
          setIsLifting(true);
          // Trigger parent onComplete when curtain begins lifting so main page starts gliding in
          if (onComplete) {
            onComplete();
          }

          // Unmount after curtain completely lifts off
          setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = '';
          }, 850);
        }, 220);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = '';
    };
  }, [minDuration, onComplete]);

  if (isDone) return null;

  return (
    <div
      role="status"
      aria-label="Loading Mi Udyojak Honarach"
      aria-live="polite"
      style={{
        transition: 'transform 0.85s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.85s ease',
        transform: isLifting ? 'translateY(-101%)' : 'translateY(0)',
      }}
      className="fixed inset-0 z-[99999] bg-[#070A11] text-white flex flex-col justify-between overflow-hidden select-none pointer-events-auto"
    >
      {/* ── Ambient Radial Atmosphere ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm Golden Glow Center-Top */}
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-gradient-to-b from-[#E27500]/22 via-[#FF8A00]/10 to-transparent rounded-full blur-[130px] transform-gpu" />
        
        {/* Subtle Bottom Grounding Glow */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#E27500]/08 rounded-full blur-[100px] transform-gpu" />

        {/* Delicate Cinematic Grid / Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border border-white/[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[920px] h-[920px] rounded-full border border-white/[0.015]" />
      </div>

      {/* ── Top Header / Brand Watermark ─────────────────────────────── */}
      <header className="relative z-10 w-full px-6 sm:px-12 pt-8 sm:pt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E27500] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E27500]" />
          </span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/70">
            मी उद्योजक होणारच
          </span>
        </div>

        <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-white/40">
          EST. MAHARASHTRA
        </div>
      </header>

      {/* ── Center Hero Cinematic Statement ───────────────────────────── */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center my-auto py-8">
        
        {/* Floating Brand Medallion */}
        <div className="relative mb-7 sm:mb-9 group">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#E27500]/30 to-[#FFA53B]/20 blur-md opacity-70 animate-pulse pointer-events-none" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(226,117,0,0.22)] border border-white/80 flex items-center justify-center">
            <img
              src="/assets/logo.png"
              alt="Mi Udyojak Honarach"
              width={96}
              height={96}
              className="w-full h-full object-contain filter drop-shadow-sm"
              loading="eager"
            />
          </div>
        </div>

        {/* Category Super-Title */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-6">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase text-[#FFA947]">
            MAHARASHTRA'S ENTREPRENEURSHIP MOVEMENT
          </span>
        </div>

        {/* ── The Signature Typography Requested by User ──────────────── */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black tracking-[-0.03em] leading-[1.08] sm:leading-[1.06] text-white">
          <span className="block text-white drop-shadow-md">
            Dream local.
          </span>
          <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#FF7A00] via-[#FFA947] to-[#FFE0B2] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(255,122,0,0.28)]">
            Build something big.
          </span>
        </h1>

        {/* Marathi Movement Sub-statement */}
        <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg font-marathi font-medium text-white/70 max-w-xl">
          अभिजात मराठी, श्रीमंत मराठी • ५००+ उद्योग मार्गदर्शक आणि नवउद्योजकांचे व्यासपीठ
        </p>
      </main>

      {/* ── Bottom Precision HUD / Laser Progress ────────────────────── */}
      <footer className="relative z-10 w-full px-6 sm:px-12 pb-8 sm:pb-12 max-w-4xl mx-auto flex flex-col items-center gap-4">
        
        {/* Dynamic Phase Stage Text */}
        <div className="flex items-center justify-between w-full max-w-md text-[11px] sm:text-xs font-mono tracking-wider text-white/50">
          <span className="text-[#FFA947] font-semibold">
            {stage.tag}
          </span>
          <span className="text-white/80 font-sans tracking-normal font-medium truncate ml-3">
            {stage.text}
          </span>
        </div>

        {/* Laser Hairline Progress Track */}
        <div className="relative w-full max-w-md h-[3px] bg-white/[0.08] rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#E27500] via-[#FFA947] to-[#FFF0D4] transition-all duration-100 ease-out shadow-[0_0_16px_#FFA947]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Numeric Counter & Status */}
        <div className="flex items-center justify-between w-full max-w-md text-xs font-mono">
          <span className="text-white/40 tracking-widest text-[10px] uppercase">
            {progress === 100 ? 'EXPERIENCE READY' : 'LOADING ECOSYSTEM'}
          </span>
          <span className="text-base sm:text-lg font-bold text-[#FFA947] tabular-nums tracking-tight">
            {progress < 10 ? `0${progress}` : progress}
            <span className="text-xs text-white/40 ml-0.5">%</span>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Preloader;
