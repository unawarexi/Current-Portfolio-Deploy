import React from "react";
import "./Testimonials.css";
import AVRT1 from "../../assets/avatar1.jpg";
import AVRT2 from "../../assets/avatar2.jpg";
import AVRT3 from "../../assets/avatar3.jpg";
import AVRT4 from "../../assets/avatar4.jpg";

// import Swiper core and required modules
import { Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "animate.css";
import { Animation } from "../../Animations/Stargerred";
import useIntersectionObserver from "../../Hooks/IntersectObserver";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// import required modules

const testimonial__data = [
  {
    id: 1,
    name: "madam regular",
    image_url: AVRT1,
    image_title: "avatar one",
    desc: "I've worked with a lot of developers, but Andrew's expertise is next-level. He's the web guru you've been looking for!",
  },

  {
    id: 2,
    name: "Benjamin Brown",
    image_url: AVRT2,
    image_title: "avatar one",
    desc: "If you want a website that's as unique as you are, Andrew is the one. His creativity and skill are a winning combo",
  },

  {
    id: 3,
    name: "Ethan Johnson",
    image_url: AVRT3,
    image_title: "avatar one",
    desc: "Andrew's websites are like finely tuned sports cars on the internet highway - fast, sleek, and impressive",
  },

  {
    id: 4,
    name: "mishal sophie",
    image_url: AVRT4,
    image_title: "avatar one",
    desc: "Andrew's work is so good, it even impresses other web developers. His websites are the gold standard of the digital world.",
  },
];

const Testimonials = () => {
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
    <motion.section {...Animation} ref={targetRef} id="Testimonials">
      {animate && (
        <motion.div {...Animation}>
          <div className="Testimonial_intro">
            <h5> Review from clients</h5>
            <h2> Testimonials </h2>
          </div>

          <Swiper
            className="container testimonial__container swipper"
            // install Swiper modules
            modules={[ Pagination, Autoplay]}
            spaceBetween={40}
            slidesPerView={1}
          
            pagination={{ clickable: true }}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {testimonial__data.map(
              ({ name, image_url, image_title, desc }, id) => {
                return (
                  <SwiperSlide key={id} className="testimonial">
                    <div className="client__avatar">
                      <img src={image_url} alt={image_title} />
                    </div>

                    <h5 className="client__name">{name}</h5>
                    <small className="client__review">{desc}</small>
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </motion.div>
      )}
    </motion.section>
  );
};

export default Testimonials;
