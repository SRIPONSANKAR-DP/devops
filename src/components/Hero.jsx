import React, { useState, useEffect } from "react";
import "./styles/Hero.css";

const Hero = () => {
  const roles = ["Frontend Developer", "React Enthusiast", "UI/UX Designer", "Web Developer"];
  const [currentRole, setCurrentRole] = useState(roles[0]);

  const fullName = "Hi, I'm SRIPONSANKAR D P";
  const [typedName, setTypedName] = useState("");
  const [nameIndex, setNameIndex] = useState(0);

  // Typing effect for name
  useEffect(() => {
    if (nameIndex < fullName.length) {
      const timeout = setTimeout(() => {
        setTypedName((prev) => prev + fullName[nameIndex]);
        setNameIndex((prev) => prev + 1);
      }, 100); // Speed of typing

      return () => clearTimeout(timeout);
    }
  }, [nameIndex, fullName]);

  // Looping roles
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % roles.length;
      setCurrentRole(roles[index]);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="typing-text">{typedName}</h1>
        <h2 className="changing-text">{currentRole}</h2>
        <p>I build amazing web experiences with React</p>
        <a href="#contact" className="cta-button">Get In Touch</a>
      </div>
    </section>
  );
};

export default Hero;
