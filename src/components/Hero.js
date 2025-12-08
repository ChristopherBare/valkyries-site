import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavClick = (e) => {
    // Allow default anchor scroll then close menu
    setOpen(false);
  };

  // Body scroll lock when menu is open (mobile overlay)
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Return focus to trigger when closing
  useEffect(() => {
    if (!open && triggerRef.current) {
      // Use a microtask to avoid focus conflicts during state updates
      Promise.resolve().then(() => triggerRef.current && triggerRef.current.focus());
    }
  }, [open]);

  return (
    <section className="hero" id="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="team-name">NC Valkyries Fastpitch S<span className={"softball-emoji"}>🥎</span>ftball</h1>
        <p className="team-tagline">10U Travel Softball • Huntersville, NC</p>
        <div className="hero-decoration">
          {/*<span className="softball-icon">🥎</span>*/}
            <img src="/VALKYRIE_LOGO.svg" alt="NC Valkyries Logo" className="logo softball-icon" style={{ width: '400px' }}/>
        </div>
      </div>
      {/* Subtle hamburger button top-left */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="site-drawer"
        onClick={() => setOpen((v) => !v)}
        ref={triggerRef}
        className="fixed left-3 top-3 z-50 h-12 w-12 sm:h-10 sm:w-10 flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-white/60 transition"
      >
        <span className="relative block h-5 w-5">
          <span
            className={`absolute left-0 top-[2px] h-[2px] w-full bg-white transition-transform duration-300 ${open ? 'translate-y-[8px] rotate-45' : ''}`}
          />
          <span
            className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-white transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className={`absolute left-0 bottom-[2px] h-[2px] w-full bg-white transition-transform duration-300 ${open ? '-translate-y-[8px] -rotate-45' : ''}`}
          />
        </span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Full-screen Menu (defaults mobile-first), becomes drawer on md+ */}
      <nav
        id="site-drawer"
        className={`fixed inset-0 left-0 top-0 z-50 h-screen w-screen bg-white text-gray-900 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}
        md:h-full md:w-64 md:max-w-[80vw] md:bg-white/75 md:backdrop-blur-sm md:shadow-xl md:border-r md:border-gray-200`}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="text-base md:text-sm font-semibold tracking-wide text-gray-500">Navigation</div>
          {/* Close button (visible on mobile overlay) */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="md:hidden inline-flex items-center justify-center p-3 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <ul className="px-2 py-2 space-y-1">
          <li>
            <a href="#hero" onClick={handleNavClick} className="block rounded-md px-4 py-4 md:py-2 text-lg md:text-base text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">Home</a>
          </li>
          <li>
            <a href="#about" onClick={handleNavClick} className="block rounded-md px-4 py-4 md:py-2 text-lg md:text-base text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">About</a>
          </li>
          <li>
            <a href="#sponsors" onClick={handleNavClick} className="block rounded-md px-4 py-4 md:py-2 text-lg md:text-base text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">Sponsors</a>
          </li>
          <li>
            <a href="#coaches" onClick={handleNavClick} className="block rounded-md px-4 py-4 md:py-2 text-lg md:text-base text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">Coaches</a>
          </li>
          <li>
            <a href="#team" onClick={handleNavClick} className="block rounded-md px-4 py-4 md:py-2 text-lg md:text-base text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">Team</a>
          </li>
          <li>
            <a href="#calendar" onClick={handleNavClick} className="block rounded-md px-4 py-4 md:py-2 text-lg md:text-base text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">Calendar</a>
          </li>
          <li>
            <a href="#connect" onClick={handleNavClick} className="block rounded-md px-4 py-4 md:py-2 text-lg md:text-base text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">Connect</a>
          </li>
        </ul>
      </nav>
      <div className="scroll-indicator">
        <span className="scroll-arrow">&#8595;</span>
        <span className="scroll-text">Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;