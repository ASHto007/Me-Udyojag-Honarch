import React from 'react';

export const BrandLogoTab: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Brand Navigation"
      className="fixed top-0 left-4 sm:left-8 lg:left-12 z-40 pointer-events-auto"
    >
      <a
        href="#"
        onClick={handleClick}
        className="block bg-white border-b-2 border-x border-[#E27500] rounded-b-2xl sm:rounded-b-3xl p-2 sm:p-3 lg:p-3.5 pb-2.5 sm:pb-3.5 lg:pb-4 w-[84px] sm:w-[115px] lg:w-[148px] shadow-sm transition-transform duration-200 hover:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500] group"
        aria-label="Mi Udyojak Honarach — Return to top of page"
      >
        <img
          src="/assets/logo.png"
          alt="Mi Udyojak Honarach Logo"
          className="w-full h-auto object-contain block"
          width={148}
          height={148}
          loading="eager"
        />
      </a>
    </aside>
  );
};

export default BrandLogoTab;
