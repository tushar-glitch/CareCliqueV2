import React from "react";
import image from "../images/main.jpg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
        Empowering Wellness, <br />
        Elevating Lives
        </h1>
        <p>Begin Your Wellness Journey at Your Health Hub, Where Your Well-being Is Our Utmost Priority. Join Us as We Guide You Towards Optimal Health and Comprehensive Care.
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
