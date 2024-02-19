import React from "react";
import image from "../images/about.avif";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              height={450}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
            At HealthBooker, we are a dedicated team of healthcare professionals committed to providing exceptional and compassionate medical services. With a focus on patient-centric care, we aim to foster a welcoming environment where your health and well-being take center stage. Our mission is to be your trusted partner on your path to a healthier life, delivering quality healthcare that prioritizes your needs. Learn more about our team and our unwavering dedication to enhancing lives through expert medical care.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
