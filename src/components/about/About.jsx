import React from "react";
import "./About.css";
import ME from "../../assets/me-about.jpg";
import { FaAward, FaUsers } from "react-icons/fa";
import { AiOutlineAppstore } from "react-icons/ai";
import "animate.css";
import { Animating, Animation } from "../../Animations/Stargerred";
import useIntersectionObserver from "../../Hooks/IntersectObserver";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const About = () => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin
    threshold: 1.0, // Trigger when 50% of the element is in the viewport
  });

  const [animate, setAnimate] = useState(false);

  // Add a useEffect to trigger the animation when isIntersecting changes
  useEffect(() => {
    if (isIntersecting) {
      setAnimate(true);
    }
  }, [isIntersecting]);

  return (
    <section ref={targetRef} id="About">
      {animate && (
        <div>
          <div className="About_intro">
            <h5 className="animate__animated animate__zoomIn">Get to Know</h5>
            <h2 className="animate__animated animate__zoomIn">About Me</h2>
          </div>

          <div className="container about__container">
            {" "}
            <motion.div
              {...Animating}
              className="about__me animate__animated animate__fadeInLeft"
            >
              <div className="about__me-image  ">
                <img src={ME} alt="about_me-image" />
              </div>
            </motion.div>
            <motion.div {...Animation} className="about__content">
              <div className="about__cards animate__animated animate__fadeInRight ">
                <article className="about__card  animate__animated animate__flipInY animate__delay-1s">
                  <FaAward className="about__icon" />
                  <h5>Experience</h5>
                  <small>3+ years experience</small>
                </article>

                <article className="about__card animate__animated animate__flipInY animate__delay-1s">
                  <FaUsers className="about__icon" />
                  <h5>Clients</h5>
                  <small>300+ Clients worldwide</small>
                </article>

                <article className="about__card animate__animated animate__flipInY animate__delay-1s">
                  <AiOutlineAppstore className="about__icon" />
                  <h5>Projects</h5>
                  <small>50+ Projects</small>
                </article>
              </div>

              <p className="about_para animate__animated animate__slideInUp">
                Passionate web developer and design enthusiast with a knack for
                creating user-friendly, visually appealing websites. Dedicated
                to crafting digital experiences that leave a lasting impression.
                Together we can bring your ideas to life.
              </p>

              <a href="#Contact" className="btn btn-primary animate__slideInUp">
                {" "}
                Let's Talk
              </a>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
