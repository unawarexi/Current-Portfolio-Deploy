import React from "react";
import "./Experience.css";
import { BsFillCheckCircleFill } from "react-icons/bs";

import "animate.css";
import { Animation } from "../../Animations/Stargerred";
import useIntersectionObserver from "../../Hooks/IntersectObserver";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Experience = () => {
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
    <motion.section {...Animation} id="Experience" ref={targetRef}>
      {animate && (
        <motion.div  {...Animation}>
          <div
            className={`Experience_intro ${
              animate
                ? "animate__animated  animate__heartBeat  animate__delay-0.9s"
                : ""
            }`}
          >
            <h5> what skills I Have ? </h5>
            <h2>My Experience</h2>
          </div>

          <div className="container experience__container ">
            <motion.div
              {...Animation}
              className="experience__frontend  animate__animated animate__zoomIn"
            >
              <h3> Frontend development </h3>

              <div className="experience__content">

                <article className="experience__details ">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4>HTML</h4>
                    <small className="text-light"> Experienced </small>
                  </div>
                </article>

                <article className="experience__details ">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4>CSS</h4>
                    <small className="text-light"> Experienced </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4>JavaScript</h4>
                    <small className="text-light"> Experienced </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4>BootStrap</h4>
                    <small className="text-light"> Experienced </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4>Tailwind</h4>
                    <small className="text-light"> Experienced </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4>Sass</h4>
                    <small className="text-light"> Experienced </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4>React</h4>
                    <small className="text-light"> Experienced </small>
                  </div>
                </article>
              </div>
            </motion.div>

            {/**==================== END OF FRONTEND ================== */}

            <motion.div
              {...Animation}
              className="experience__backend animate__animated animate__zoomIn"
            >
              <h3> Backend development </h3>
              <div className="experience__content">
                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4>Node-JS</h4>
                    <small className="text-light"> Intermediate </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4>Mongo-DB</h4>
                    <small className="text-light"> Intermediate </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4>Python</h4>
                    <small className="text-light"> Intermediate </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4> C - program </h4>
                    <small className="text-light"> Intermediate </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4> Django </h4>
                    <small className="text-light"> Intermediate </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4> My-SQL</h4>
                    <small className="text-light"> Basic </small>
                  </div>
                </article>
              </div>
            </motion.div>

            {/**==================== END OF BACKTEND ================== */}

            <motion.div
              {...Animation}
              className="experience__others  animate__animated animate__zoomIn  animate__delay-1.2s"
            >
              <h3> Other Skills </h3>
              <div className="experience__content">
                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4> Git / GitHub</h4>
                    <small className="text-light"> Intermediate </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4> Redux </h4>
                    <small className="text-light"> Experienced </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4> Linux / Shell</h4>
                    <small className="text-light"> Intermediate </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4>Networking</h4>
                    <small className="text-light"> Experienced </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4> SoftWare  <br /> technician </h4>
                    <small className="text-light"> Experienced </small>
                  </div>
                </article>

                <article className="experience__details">
                  <BsFillCheckCircleFill className="experience__details-icons" />
                  <div>
                    <h4>HardWare <br /> technician </h4>
                    <small className="text-light"> Experienced </small>
                  </div>
                </article>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default Experience;
