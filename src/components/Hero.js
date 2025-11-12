import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="team-name">NC Valkyries Fastpitch S<span className={"softball-emoji"}>🥎</span>ftball</h1>
        <p className="team-tagline">10U Travel Softball • Huntersville, NC</p>
        <div className="hero-decoration">
          {/*<span className="softball-icon">🥎</span>*/}
            <img src="/VALKYRIE_LOGO.svg" alt="NC Valkyries Logo" className="logo softball-icon" style={{ width: '400px' }}/>
        </div>
      </div>
      <div className="scroll-indicator">
        <span className="scroll-arrow">&#8595;</span>
        <span className="scroll-text">Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;