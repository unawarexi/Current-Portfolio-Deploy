import React, { useEffect, useRef } from "react";
import { slideInFromLeft, fadeIn, scaleUp, rotateIn } from "../../Animations/GsapAnimations";
import Skills from "./Skills";
import Metrics from "./Metrics";
import Images from "../../constants/ImageStrings";
import "./About.css";
import Socials from "./Socials";
import useResponsive from "../../Hooks/useResponsive";

const About = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);


  useEffect(() => {
    slideInFromLeft(titleRef.current); 
    fadeIn(imageRef.current); 
    scaleUp(buttonRef.current); 
  }, []);


  return (
    <section className="text-gray-600 body-font">
  <div ref={titleRef} className="flex flex-col text-center w-full mt-20">
    <h1 className="text-3xl font-bold title-font mb-4 text-gray-900">
      About Me
    </h1>
    <div className="rounded-2xl px-6 py-8 mx-auto mb-8 w-[70%] md:w-2/3">
      <p className="leading-relaxed text-gray-700 md:text-base text-[13px]">
        I'm a passionate software developer with experience in creating
        dynamic and responsive web applications. <br />I thrive on learning
        new technologies and constantly improving my skills to build
        meaningful and impactful solutions.
      </p>
    </div>
  </div>
  <div className="container mx-auto flex px-5 py-20 lg:flex-row flex-col items-center">
    {/* Profile Image */}
    <div className="lg:max-w-[20%] lg:w-full md:w-80 w-1/2 mb-10 md:mb-0 img-bg rounded-3xl grid place-items-center">
      <img
        className="object-cover object-center rounded-3xl shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300"
        alt="profile"
        src={Images.aboutImg}
      />
    </div>
    {isMobile && (
      <div ref={imageRef} className="mb-6">
        <Socials />
      </div>
    )}

    {/* About Me Content */}
    <div className="container px-4 lg:flex-grow lg:w-1/3 md:w-full lg:pl-24 flex flex-col md:items-start md:text-left items-center text-left mt-4 md:mt-10 lg:mt-0">
      <div className="bg-indigo-300 bg-opacity-20 backdrop-blur-lg rounded-3xl px-6 py-8 mb-8 w-full md:w-[90%]">
        <h1 className="title-font md:text-5xl text-xl mb-4  md:-ml-0 font-bold text-gray-900">
          <span className="text-blue-500 block md:inline">Welcome,</span>{" "}
          <br />
          I'm <span className="text-blue-600">Andrew Chukwuweike</span>
          <br />
          <span className="text-indigo-500">Software Developer</span>
        </h1>
        <p className="mb-8 leading-relaxed text-gray-700 md:text-md text-[13px]">
          With a background in both frontend and backend development, I
          specialize in building full-stack web applications that are
          robust, user-friendly, and efficient. My expertise includes
          working with JavaScript, React, Node.js, and more. I love solving
          complex problems and delivering high-quality code that makes a
          difference.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center md:space-x-10 lg:space-x-16 items-center mt-6">
        {/* Button Section */}
        <div className="flex space-x-4">
          <a href="#projects">
            <button className="inline-flex text-white bg-indigo-600 border-0 py-3 md:px-8 px-4 focus:outline-none hover:bg-indigo-700 rounded-full md:text-lg text-[13px] transition-all duration-300 ease-in-out">
              View Projects
            </button>
          </a>
          <a href="#contact">
            <button className="inline-flex text-gray-700 bg-gray-100 border-0 py-3 md:px-8 px-4 focus:outline-none hover:bg-gray-200 rounded-full md:text-lg text-[13px] transition-all duration-300 ease-in-out">
              Contact Me
            </button>
          </a>
        </div>

        {/* Social Media Icons */}
        {(isDesktop || isTablet) && (
          <div ref={imageRef} className="flex items-center space-x-6 mt-6 md:mt-0">
            <Socials />
          </div>
        )}
      </div>
    </div>
  </div>
  <Metrics />
  <Skills />
</section>

  );
};

export default About;
