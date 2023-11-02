import React from "react";
import "./services.css";
import { BsCheck2 } from "react-icons/bs";

import "animate.css";
import { Animation } from "../../Animations/Stargerred";
import useIntersectionObserver from "../../Hooks/IntersectObserver";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Services = () => {
  
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
    <section ref={targetRef} id="Services" >
      {animate && (
        <motion.div {...Animation} >
          <div className="Services_intro"> 
            <h5> What I Offer ? </h5>
            <h2> Services </h2>
          </div>

          <motion.div  {...Animation}  className="container services__container">
            <article className="service animate__animated animate__fadeInUp animate__delay-0.5s">

              <div className="service__head">
                <h3>UI/UX Design</h3>
              </div>

              <ul className="service__list">
                <li className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    User-Centered Design: Putting users at the forefront of the
                    design process.
                  </p>
                </li>

                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Intuitive Navigation: Creating easy-to-use and
                    understandable interfaces.
                  </p>
                </li>

                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Responsive Layouts: Designs that adapt seamlessly to various
                    devices.
                  </p>
                </li>

                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Visual Consistency: Maintaining a cohesive and appealing
                    design style.
                  </p>
                </li>

                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Accessibility Integration: Ensuring inclusivity for all
                    users.
                  </p>
                </li>

                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Prototype Iteration: Refining designs through user feedback
                    and testing.
                  </p>
                </li>
              </ul>
            </article>
            {/*====================== end of ui/ux =============*/}

            <article className="service animate__animated animate__fadeInUp animate__delay-0.9s">
              <div className="service__head">
                <h3> WEB Development </h3>
              </div>

              <ul className="service__list">
                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Frontend Development, Responsive web design, Performance
                    optimization and fast-loading websites
                  </p>
                </li>

                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Backend Development, User authentication and authorization,
                    Server-side scripting and APIs
                  </p>
                </li>

                <li   className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    {" "}
                    E-Commerce Solutions, Payment gateway integration, Order
                    tracking and notifications{" "}
                  </p>
                </li>

                <li   className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Content Management, SEO-friendly content optimization,
                    User-friendly admin interfaces{" "}
                  </p>
                </li>

                <li   className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Web Security, SSL certificate installation, Data encryption,
                    Regular security updates{" "}
                  </p>
                </li>

                <li   className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Performance, Image and asset, Database query and Browser
                    rendering optimization{" "}
                  </p>
                </li>

                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    {" "}
                    Mobile App Development, Cross-platform, In-app purchases,
                    Mobile UI/UX design{" "}
                  </p>
                </li>

                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Support and Maintenance, Backup and recovery, Technical
                    documentation, Bug fixing and issue resolution.
                  </p>
                </li>
              </ul>
            </article>

            {/*====================== end of web development =============*/}

            <article className="service animate__animated animate__fadeInUp animate__delay-1s">
              <div className="service__head">
                <h3> Useful hobbies </h3>
              </div>

              <ul className="service__list">
                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Tech Blogging: Sharing about coding tips, tutorials, and
                    tech trends showcases expertise and help others
                  </p>
                </li>

                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Continuous Learning: Staying up-to-date with the latest
                    technologies and programming languages through self-study{" "}
                  </p>
                </li>

                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Tech Meetups/Networking: Attending tech meetups and
                    networking events enhancing my professional connections and
                    knowledge
                  </p>
                </li>

                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Teaching/Tutoring: Sharing coding knowledge through teaching
                    or tutoring hence helping my peers / team.
                  </p>
                </li>

                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Attending concerts and travelling: All work no play makes
                    jack a dull boy hahaha
                  </p>
                </li>

                <li  className=" animate__animated animate__slideInDown">
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Photography: Capturing memories is both creative and
                    practical for documenting important events and choosing
                    images for certain projects.
                  </p>
                </li>
              </ul>
            </article>

            {/*====================== end of Hobbies =============*/}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Services;
