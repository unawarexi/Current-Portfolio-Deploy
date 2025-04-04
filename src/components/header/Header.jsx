import React, { useEffect, useRef } from 'react';
import Images from '../../constants/ImageStrings';
import { FaDownload, FaBriefcase } from 'react-icons/fa';
import useResponsive from '../../Hooks/useResponsive';
import { Link } from 'react-router';
import gsap from 'gsap';

const Header = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  // Create refs for elements to animate
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);
  const heroContainerRef = useRef(null);
  const inputRef = useRef(null);
  const downloadButtonRef = useRef(null);
  const portfolioButtonRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Create a timeline for sequenced animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Initial state - elements invisible or positioned off-screen
    gsap.set([titleRef.current, descriptionRef.current, buttonsRef.current, inputRef.current], { 
      opacity: 0, 
      y: 30 
    });
    
    gsap.set([downloadButtonRef.current, portfolioButtonRef.current], { 
      opacity: 0, 
      scale: 0.8 
    });
    
    gsap.set(imageRef.current, { 
      opacity: 0, 
      x: 50 
    });
    
    gsap.set(backgroundRef.current, { 
      opacity: 0
    });
    
    // Background fade in
    tl.to(backgroundRef.current, { 
      opacity: 1, 
      duration: 1.2 
    });
    
    // Title animation
    tl.to(titleRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8
    }, "-=0.6");
    
    // Description fade in
    tl.to(descriptionRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8 
    }, "-=0.5");
    
    // Input and contact button
    tl.to(buttonsRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.6 
    }, "-=0.4");
    
    tl.to(inputRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.6 
    }, "-=0.4");
    
    // Download and portfolio buttons with slight bounce
    tl.to([downloadButtonRef.current, portfolioButtonRef.current], { 
      opacity: 1, 
      scale: 1, 
      stagger: 0.15, 
      duration: 0.7,
      ease: "back.out(1.4)" 
    }, "-=0.2");
    
    // Hero image slide in
    tl.to(imageRef.current, { 
      opacity: 1, 
      x: 0, 
      duration: 1,
      ease: "power2.out" 
    }, "-=0.8");
    
    // Clean up function
    return () => {
      tl.kill();
    };
  }, []);

  // Hover animations for buttons
  const handleButtonHover = (element, isEnter) => {
    gsap.to(element, {
      scale: isEnter ? 1.05 : 1,
      boxShadow: isEnter ? "0 8px 15px rgba(37, 99, 235, 0.3)" : "0 4px 10px rgba(37, 99, 235, 0.2)",
      duration: 0.3
    });
  };

  return (
    <div className="relative h-[80vh] md:h-[70vh]">
      {/* Image container with overlay */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <img 
          src={Images.backgroundImage} 
          alt="background" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Section content on top of image */}
      <section ref={heroContainerRef} className="text-gray-600 body-font absolute inset-0 z-10 flex items-center justify-center mt-20">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow lg:w-1/2 md:w-full lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-left">
            <h1 ref={titleRef} className="title-font md:text-4xl text-lg mb-4 font-medium text-white">
              Expert in Web Development, Mobile Apps, and <span className='text-indigo-300'>Blockchain / SmartContracts Integration</span>
            </h1>
            <p ref={descriptionRef} className="mb-8 leading-relaxed text-white md:text-base text-[13px]">
              Bringing innovative digital solutions to life with expertise in modern web technologies, mobile application development, and secure blockchain integrations. Let's create something great together!
            </p>
            {!isMobile && (
              <>
                <div ref={buttonsRef} className="flex w-full md:justify-start justify-center items-end">
                  <div className="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
                    <label htmlFor="hero-field" className="leading-7 text-sm text-gray-300">
                      Let's start a conversation
                    </label>
                    <input 
                      ref={inputRef}
                      type="text" 
                      id="hero-field" 
                      name="hero-field" 
                      className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                    />
                  </div>
                  <button 
                    className="inline-flex text-white bg-indigo-500 border-0 py-2 lg:px-6 md:px-2 md:w-40 focus:outline-none hover:bg-indigo-600 rounded text-lg transition-all duration-300"
                    onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
                  >
                    Contact Me
                  </button>
                </div>
                <p className="text-sm mt-2 text-gray-300 mb-8 w-full">
                  Let's connect and discuss how I can help bring your ideas to life.
                </p>
              </>
            )}
            <div className="grid space-y-4 w-full md:flex md:space-x-4 md:flex-row">
              <button 
                ref={downloadButtonRef}
                className="bg-[#070b18] w-full inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none shadow-md shadow-blue-300 transition-all duration-300"
                onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
              >
                <FaDownload className="w-6 h-6" />
                <span className="ml-4 flex items-start flex-col leading-none">
                  <span className="text-xs text-gray-600 mb-1">DOWNLOAD</span>
                  <span className="title-font font-medium text-sm md:text-base text-blue-300 text-[13px]">Resume & Cover Letter</span>
                </span>
              </button>
              <button 
                ref={portfolioButtonRef}
                className="w-full inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none shadow-md shadow-blue-300 transition-all duration-300"
                onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
              >
                <FaBriefcase className="w-6 h-6" />
                <Link to="/overview" className="ml-4 md:w-full flex items-start flex-col leading-none">
                  <span className="text-xs text-gray-600 mb-1">CHECK OUT</span>
                  <span className="title-font font-medium text-blue-300">My Portfolio</span>
                </Link>
              </button>
            </div>
          </div>
          {!isMobile && !isTablet && (
            <div ref={imageRef} className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img className="object-cover object-center rounded" alt="hero" src={Images.subBackgroundImage} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Header;