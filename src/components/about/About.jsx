import React, { useEffect, useRef } from "react";
import Skills from "./Skills";
import Metrics from "./Metrics";
import Images from "../../constants/ImageStrings";
import "./About.css";
import Socials from "./Socials";
import useResponsive from "../../Hooks/useResponsive";
import gsap from "gsap";

const About = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  // Refs for animations
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const statsRef = useRef(null);
  const contentRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    // Create a timeline for sequenced animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Initial state - set elements invisible
    gsap.set([titleRef.current, contentRef.current], { 
      opacity: 0, 
      x: -50 
    });
    
    gsap.set(imageRef.current, { 
      opacity: 0, 
      scale: 0.9 
    });
    
    gsap.set(buttonRef.current, { 
      opacity: 0, 
      scale: 0.8 
    });
    
    gsap.set(statsRef.current, { 
      opacity: 0, 
      y: 30 
    });
    
    gsap.set(featuresRef.current, { 
      opacity: 0, 
      y: 50 
    });
    
    // Content slide in from left
    tl.to(contentRef.current, { 
      opacity: 1, 
      x: 0, 
      duration: 0.8
    });
    
    // Title comes in slightly after content
    tl.to(titleRef.current, { 
      opacity: 1, 
      x: 0, 
      duration: 0.6
    }, "-=0.4");
    
    // Button scales up with a bounce effect
    tl.to(buttonRef.current, { 
      opacity: 1, 
      scale: 1, 
      duration: 0.5,
      ease: "back.out(1.7)" 
    }, "-=0.2");
    
    // Stats fade in and move up
    tl.to(statsRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.7 
    }, "-=0.3");
    
    // Image fades in and scales up
    tl.to(imageRef.current, { 
      opacity: 1, 
      scale: 1, 
      duration: 1 
    }, "-=0.7");
    
    // Features section animates last
    tl.to(featuresRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
      stagger: 0.1 // Stagger the animation of child elements
    }, "-=0.5");
    
    // Clean up function
    return () => {
      tl.kill();
    };
  }, []);

  // Add hover animation for button
  const handleButtonHover = (element, isEnter) => {
    gsap.to(element, {
      scale: isEnter ? 1.05 : 1,
      backgroundColor: isEnter ? "#4338ca" : "#4f46e5", // Darker indigo on hover
      duration: 0.3
    });
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <header
        className={`fixed top-0 w-full z-50 ${
          (isDesktop || isTablet || isMobile) ? "bg-white/30" : ""
        } backdrop-blur-md text-gray-600 body-font md:h-0 h-16 dark:bg-transparent dark:text-blue-300 shadow-lg`}
      >
        {/* Header content */}
      </header>
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col justify-evenly">
        {/* Left Column */}
        <div ref={contentRef} className="lg:w-1/2 w-full mb-10 lg:mb-0 flex flex-col">
          <div className="mb-4">
            <span className="inline-block py-1 px-3 rounded bg-indigo-100 text-indigo-500 text-sm font-medium tracking-widest">
              About Me
            </span>
          </div>
          
          <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Revolutionizing
            <br />
            <span className="text-indigo-600">Software Development</span>
          </h1>
          
          <p className="leading-relaxed mb-8 text-gray-600">
            I'm a passionate software developer with experience in creating
            dynamic and responsive web applications. With a background in both frontend 
            and backend development, I specialize in building full-stack web applications 
            that are robust, user-friendly, and efficient. My expertise includes working with 
            JavaScript, React, Node.js, and more.
          </p>
          
          <div className="flex mb-10">
            <a href="#contact">
              <button 
                ref={buttonRef} 
                className="inline-flex text-white bg-indigo-600 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-700 rounded-full text-lg transition-all duration-300 ease-in-out"
                onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
              >
                Contact Me
              </button>
            </a>
            <a href="#learn-more" className="ml-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 text-lg font-medium transition-all duration-300 ease-in-out">
              Learn More
              <span className="ml-2">»»</span>
            </a>
          </div>
          
          {/* Stats Section */}
          <div ref={statsRef} className="flex flex-wrap -mx-4 mt-auto mb-auto">
            <div className="w-1/4 px-4">
              <div className="flex flex-col items-center">
                <span className="text-indigo-600 font-bold text-3xl">4+</span>
                <span className="text-sm text-gray-500">Years Exp</span>
              </div>
            </div>
            
            <div className="w-1/4 px-4">
              <div className="flex flex-col items-center">
                <span className="text-indigo-600 font-bold text-3xl">50+</span>
                <span className="text-sm text-gray-500">Projects</span>
              </div>
            </div>
            
            <div className="w-1/4 px-4">
              <div className="flex flex-col items-center">
                <span className="text-indigo-600 font-bold text-3xl">4.9</span>
                <span className="text-sm text-gray-500">Ratings</span>
              </div>
            </div>
            
            <div className="w-1/4 px-4">
              <div className="flex flex-col items-center">
                <span className="text-indigo-600 font-bold text-3xl">50+</span>
                <span className="text-sm text-gray-500">Clients</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Image */}
        <div ref={imageRef} className="lg:w-1/2 w-full lg:pl-10 flex justify-center">
          <div className="rounded-lg overflow-hidden">
            <img
              alt="developer workspace"
              className="object-cover object-center w-full h-full"
              src={Images.aboutImage2}
            />
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div ref={featuresRef} className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="p-4 lg:w-1/3">
            <div className="h-full bg-white dark:bg-black/30 p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 w-12 h-12">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 className="text-lg font-medium title-font mb-4 text-gray-900">Why Choose Me?</h2>
              <p className="leading-relaxed text-base">
                I offer a comprehensive suite of development skills, including robust backend systems and beautiful frontend interfaces with collaboration at the core.
              </p>
              <a href="#why-choose-me" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-4 transition-all duration-300 ease-in-out">
                Learn More
                <span className="ml-2">👉</span>
              </a>
            </div>
          </div>
          
          <div className="p-4 lg:w-1/3">
            <div className="h-full bg-white dark:bg-black/30 p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 w-12 h-12">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h2 className="text-lg font-medium title-font mb-4 text-gray-900">My Vision</h2>
              <p className="leading-relaxed text-base">
                I am committed to transforming the digital landscape by building applications that solve real problems and enhance user experiences.
              </p>
              <a href="#my-vision" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-4 transition-all duration-300 ease-in-out">
                Learn More
                <span className="ml-2">👉</span>
              </a>
            </div>
          </div>
          
          <div className="p-4 lg:w-1/3">
            <div className="h-full bg-white dark:bg-black/30 p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 w-12 h-12">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h2 className="text-lg font-medium title-font mb-4 text-gray-900">My Approach</h2>
              <p className="leading-relaxed text-base">
                I'm Andrew Chukwuweike, a passionate and dedicated software developer focused on delivering exceptional products and solutions.
              </p>
              <a href="#my-approach" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-4 transition-all duration-300 ease-in-out">
                Learn More
                <span className="ml-2">👉</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Socials */}
      <div className="container px-5 pb-12 mx-auto">
        <div className="flex justify-center">
          <Socials />
        </div>
      </div>
      
      {/* Include your original components */}
      <Metrics />
      
      {/* Skills Section */}
      <Skills />
    </section>
  );
};

export default About;