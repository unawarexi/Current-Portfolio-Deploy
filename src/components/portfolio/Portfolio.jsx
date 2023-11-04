import React from "react";
import "./Portfolio.css";
import Portfolio1 from "../../assets/portfolio1.jpg";
import Portfolio2 from "../../assets/portfolio2.jpg";
import Portfolio3 from "../../assets/portfolio3.jpg";
import Portfolio4 from "../../assets/portfolio4.jpg";
import Portfolio5 from "../../assets/portfolio5.png";
import Portfolio6 from "../../assets/portfolio6.jpg";

import "animate.css";
import { Animation } from "../../Animations/Stargerred";
import useIntersectionObserver from "../../Hooks/IntersectObserver";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";


const data = [
  {
    id: 1,
    image: Portfolio1,
    title: "Team Mgt. Dashboard",
    github: "https://github.com",
    demo: "https://dribbble.com/shots/19248211-Team-Management-Dashboard-Kanban-Task-Manager",
  },
  {
    id: 2,
    image: Portfolio2,
    title: "Sales Dashboard | Analytics ",
    github: "https://github.com",
    demo: "https://dribbble.com/shots/19031656-Sales-Dashboard-Analytics-Web-App",
  },
  {
    id: 3,
    image: Portfolio3,
    title: "Event Hub Application",
    github: "https://github.com",
    demo: "https://dribbble.com/shots/17339140-Event-Hub-Application",
  },
  {
    id: 4,
    image: Portfolio4,
    title: "Task Management App",
    github: "https://github.com",
    demo: "https://dribbble.com/shots/17390530-Task-Management-App",
  },
  {
    id: 5,
    image: Portfolio5,
    title: " HRM dashboard",
    github: "https://github.com",
    demo: "https://dribbble.com/shots/19064533-Management-table-Table-components-HRM-dashboard",
  },
  {
    id: 6,
    image: Portfolio6,
    title: "Electrys | EV charging app",
    github: "https://github.com",
    demo: "https://dribbble.com/shots/22127345-Electrys-EV-charging-app",
  },
];

const Portfolio = () => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin
    threshold: 0.5, // Trigger when 50% of the element is in the viewport
  });

  const [anime, setAnime] = useState(false);

  // Add a useEffect to trigger the animation when isIntersecting changes
  useEffect(() => {
    if (isIntersecting) {
      setAnime(true);
    }
  }, [isIntersecting]);

  

  return (
    <motion.section ref={targetRef} id="Portfolio" {...Animation}>
      {anime && (
        <div>
          <div className="portfolio_intro animate__animated animate__flipInX  animated__delay-1s">
            <h5 className="animate__slideInUp"> My Recent Works </h5>
            <h2 className="animate__slideInUp"> Portfolio </h2>
          </div>

          <motion.div className="container portfolio__container   animate__animated animate__bounceInUp animated__delay-1s">
            {data.map(({ id, image, title, github, demo }) => {
              return (
                <article key={id} className="portfolio__item ">
                  <motion.div
                    {...Animation}
                    className="portfolio__item-image animate__animated animate__pulse animate__backInUp animated__delay-1s"
                  >
                    <img src={image} alt={title} />
                    <p className="image__text">
                      "Step into my portfolio world, where professionalism meets
                      fun, showcasing my skills and creative endeavors." <br />{" "}
                      -Andrew C.J
                    </p>
                  </motion.div>
                  <h3>{title}</h3>

                  {/** ============= for the buttons ============= */}
                  <div className="portfolio__item-cta animate__animated animate__flipInY">
                    <a
                      href={github}
                      className="btn btn-primary animate__animated animate__slideInUp  animate__delay-1s"
                    >
                      Github
                    </a>
                    <a
                      href={demo}
                      className="btn btn-primary animate__animated animate__slideInUp  animate__delay-1.5s"
                      target="_blank"
                    >
                      Live Demo
                    </a>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </div>
      )}
    </motion.section>
  );
};

export default Portfolio;
