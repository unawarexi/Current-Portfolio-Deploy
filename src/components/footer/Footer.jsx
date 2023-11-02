import React from "react";
import "./Footer.css";
import { BsInstagram, BsTwitter, BsGithub, BsLinkedin } from "react-icons/bs";

import "animate.css";
import { Animation, Animating } from "../../Animations/Stargerred";
import useIntersectionObserver from "../../Hooks/IntersectObserver";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Footer = () => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin
    threshold: 0.5, // Trigger when 50% of the element is in the viewport
  });

  const [animate, setAnimate] = useState(false);

  // Add a useEffect to trigger the animation when isIntersecting changes
  useEffect(() => {
    if (isIntersecting) {
      setAnimate(true);
    }
  }, [isIntersecting]);

  return (
    <footer ref={targetRef} className="footer">
      {animate && (
        <motion.div {...Animating}>
          <div className="Footer_intro">
            <a href="#" className="footer__logo">
              Andrew-Corp
            </a>
          </div>

          <ul className="permalinks">
            <li className="animate__animated animate__fadeInLeft">
              <a href="#">Home</a>
            </li>
            <li className="animate__animated animate__flipInY">
              <a href="#About">About</a>
            </li>
            <li className="animate__animated animate__flipInY">
              <a href="#Experience">Experience</a>
            </li>
            <li className="animate__animated animate__flipInY">
              <a href="#Services">Services</a>
            </li>
            <li className="animate__animated animate__flipInY">
              <a href="#Portfolio">Portfolio</a>
            </li>
            <li className="animate__animated animate__flipInY">
              <a href="#Testimonials">Testimonials</a>
            </li>
            <li className="animate__animated animate__fadeInRight">
              <a href="#Contact">Contact</a>
            </li>
          </ul>

          <div className="footer__socials">
            <a href="https://instagram.com/the_andrewscorp?igshid=YTQwZjQ0NmI0OA==">
              <BsInstagram className="animate__animated animate__flipInX  animated__delay-1s" />
            </a>

            <a href="https://x.com/@d_unaware">
              <BsTwitter className="animate__animated animate__flipInX  animated__delay-1s" />
            </a>

            <a href="https://www.linkedin.com/in/andrew-j-chukwuweike-se">
              <BsLinkedin className="animate__animated animate__flipInX  animated__delay-1s" />
            </a>

            <a href="https://github.com/unawarexi">
              <BsGithub className="animate__animated animate__flipInX animated__delay-1s" />
            </a>
          </div>

          <div className="footer__copyright">
            <small>Copyright © [2022] Andrew Corp. All Rights Reserved.</small>
          </div>
        </motion.div>
       
      )}
    </footer>
  );
};

export default Footer;
