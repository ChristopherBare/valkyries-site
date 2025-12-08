import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2>About Us</h2>
        <div className="about-content">
          <p className="about-text">
            Welcome to NC Valkyries Fastpitch Softball, a competitive 10U travel softball team dedicated to
            developing young athletes both on and off the field. Based in Huntersville, NC, we're 
            committed to fostering teamwork, sportsmanship, and a love for the game.
          </p>
          <p className="about-text">
            Our program focuses on skill development, competitive play, and building lifelong 
            friendships. We believe in creating a positive environment where every player can 
            reach their full potential while having fun and learning valuable life lessons.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;