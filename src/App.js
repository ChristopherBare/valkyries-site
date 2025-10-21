import React from 'react';
import './App.css';
import Hero from './components/Hero';
import Coaches from './components/Coaches';
import About from './components/About';
import Team from './components/Team';
import SocialLinks from './components/SocialLinks';

function App() {
  return (
    <div className="App">
      <Hero />
      <About />
      <Coaches />
      <Team />
      <SocialLinks />
    </div>
  );
}

export default App;
