import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-transparent absolute top-0 left-0 z-30 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-5 flex items-center justify-between">
        {/* Logo Lockup */}
        <a className="flex items-center gap-2.5 sm:gap-3 group" href="#" aria-label="Mi Udyojak Honarach Homepage">
          <img
            alt="Mi Udyojak Honarach Logo"
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            src="/assets/logo.png"
          />
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base text-[#333333] leading-tight tracking-tight group-hover:text-[#E27500] transition-colors font-sans">
              Mi Udyojak Honarach!
            </span>
            <span className="text-[11px] sm:text-[12px] font-marathi text-[#E27500] font-bold">
              मी उद्योजक होणारच!
            </span>
          </div>
        </a>
      </div>
    </header>
  );
};
