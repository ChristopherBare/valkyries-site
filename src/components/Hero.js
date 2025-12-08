import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [open, setOpen] = useState(false);

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
        className="fixed left-3 top-3 z-50 h-10 w-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/60 transition"
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

      {/* Left Drawer */}
      <nav
        id="site-drawer"
        className={`fixed left-0 top-0 z-50 h-full w-64 max-w-[80vw] bg-white/75 backdrop-blur-sm shadow-xl border-r border-gray-200 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div className="px-5 py-4">
          <div className="text-sm font-semibold tracking-wide text-gray-500">Navigation</div>
        </div>
        <ul className="px-2 py-2 space-y-1">
          <li>
            <a href="#hero" onClick={handleNavClick} className="block rounded-md px-4 py-2 text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">Home</a>
          </li>
          <li>
            <a href="#about" onClick={handleNavClick} className="block rounded-md px-4 py-2 text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">About</a>
          </li>
          <li>
            <a href="#sponsors" onClick={handleNavClick} className="block rounded-md px-4 py-2 text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">Sponsors</a>
          </li>
          <li>
            <a href="#coaches" onClick={handleNavClick} className="block rounded-md px-4 py-2 text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">Coaches</a>
          </li>
          <li>
            <a href="#team" onClick={handleNavClick} className="block rounded-md px-4 py-2 text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">Team</a>
          </li>
          <li>
            <a href="#calendar" onClick={handleNavClick} className="block rounded-md px-4 py-2 text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">Calendar</a>
          </li>
          <li>
            <a href="#connect" onClick={handleNavClick} className="block rounded-md px-4 py-2 text-gray-800 hover:bg-sky-50 hover:text-sky-700 transition">Connect</a>
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