import React from 'react';
import './styles/About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p>I'm a passionate frontend developer with 3 years of experience.</p>
          <p>When I'm not coding, I enjoy hiking and reading sci-fi novels.</p>
        </div>
        <div className="about-image">
          <img src="/images/sps.jpg" alt="Profile" className="profile-img" />
        </div>
      </div>
    </section>
  );
};

export default About;