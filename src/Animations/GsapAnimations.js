// animations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Slide In from Left
export const slideInFromLeft = (element) => {
  gsap.from(element, {
    x: -200,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    },
  });
};

// Slide In from Right
export const slideInFromRight = (element) => {
  gsap.from(element, {
    x: 200,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    },
  });
};

// Fade In
export const fadeIn = (element) => {
  gsap.from(element, {
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    },
  });
};

// Scale Up Animation
export const scaleUp = (element) => {
  gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
     toggleActions: "play reverse play reverse"
    },
  });
};

// Rotate In Animation
export const rotateIn = (element) => {
  gsap.from(element, {
    rotation: 90,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    },
  });
};
