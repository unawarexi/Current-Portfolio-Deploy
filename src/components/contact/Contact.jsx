import React from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import { AiOutlineMail } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";

import "animate.css";
import { Animating, Animation } from "../../Animations/Stargerred";
import useIntersectionObserver from "../../Hooks/IntersectObserver";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Contact = () => {
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

  {
    /**================ this below is for form ===================== */
  }
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_i5ffb9d",
        "template_6fskznn",
        form.current,
        "VI6SUpVr-luQDsD-T"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <motion.section {...Animation} ref={targetRef} id="Contact">
      {animate && (
        <motion.div  {...Animation}>
          <div className="Contact_intro animate__animated animate__flipInY">
            <h5>Get In Touch</h5>
            <h2>Contact Me</h2>
          </div>

          <motion.div {...Animation} className="container contact__container">
            <div className="contact__options">

              <article className="contact__option animate__animated animate__flipInY animated__delay-1s">
                <AiOutlineMail className="contact-option__icons" />
                <h4>Email</h4>
                <h5>just.andrew001@gmail.com</h5>
                <a
                  href="mailto:just.andrew.ckw@gmail.com"
                  target="_blank"
                 >
                  Send a Message
                </a>
              </article>

              <article className="contact__option animate__animated animate__flipInY animated__delay-1s">
                <FaTwitter className="contact-option__icons" />
                <h4>Twitter</h4>
                <h5>Andrew chukwuweike</h5>
                <a
                  href="https://x.com/D'UNAWARE"
                  target="_blank"
                >
                  Send a Message
                </a>
              </article>

              <article className="contact__option animate__animated animate__flipInY animated__delay-1s">
                <BsWhatsapp className="contact-option__icons" />
                <h4>Whatsapp</h4>
                <h5>click me</h5>
                <a
                  href="https://api.whatsapp.com/send?phone=+2349028378837"
                  target="_blank"
                >
                  Send a Message
                </a>
              </article>
            </div>

            <motion.form {...Animating} ref={form} onSubmit={sendEmail}>
              <input type="text" name="name" placeholder="Full Name" required />

              <input
                type="email"
                name="email"
                placeholder="email@gmail.com"
                required
              />
              <textarea
                name="message"
                rows="7"
                placeholder="Message"
                required
              ></textarea>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default Contact;
