import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="team-name">NC Valkyries Fastpitch Softball</h1>
        <p className="team-tagline">10U Travel Softball • Huntersville, NC</p>
        <div className="hero-decoration">
          <span className="softball-icon">🥎</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;