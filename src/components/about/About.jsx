import React from "react";
import Skills from "./Skills";
import Metrics from "./Metrics";
import Images from "../../constants/ImageStrings";
import "./About.css";
import Socials from "./Socials";
import useResponsive from "../../Hooks/useResponsive";

const About = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <section className="text-gray-600 body-font">
      <div className="flex flex-col text-center w-full mt-20">
        <h1 className="text-3xl font-bold title-font mb-4 text-gray-900">
          About Me
        </h1>
        <p className="lg:w-2/3 w-[70%] mx-auto leading-relaxed md:text-base text-gray-700 lg:px-4 text-[13px]">
          I'm a passionate software developer with experience in creating
          dynamic and responsive web applications. <br />I thrive on learning
          new technologies and constantly improving my skills to build
          meaningful and impactful solutions.
        </p>
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
          <div className="mb-6">
            <Socials />{" "}
          </div>
        )}

        {/* About Me Content */}
        <div className=" container px-4 lg:flex-grow lg:w-1/2 md:w-full lg:pl-24  flex flex-col md:items-start md:text-left items-center text-lef md:mt-10 lg:mt-0">
          <h1 className="title-font sm:text-4xl text-xl mb-4 font-medium text-gray-900 -ml-6 md:-ml-0">
            <span className="text-blue-300 text-3xl">Welcome,</span> <br />
            I'm Andrew Chukwuweike
            <br className="lg:inline-block " />
            <span className="">Software Developer</span>
          </h1>
          <p className="mb-8 leading-relaxed text-gray-700 md:text-base text-sm">
            With a background in both frontend and backend development, I
            specialize in building full-stack web applications that are robust,
            user-friendly, and efficient. My expertise includes working with
            JavaScript, React, Node.js, and more. I love solving complex
            problems and delivering high-quality code that makes a difference.
          </p>
          <div className="flex md:flex-row flex-col justify-center md:space-x-10 lg:space-x-20 items-center   ">
            <div>
              <a href="#projects">
                <button className="inline-flex text-white bg-indigo-500 border-0 py-4 md:px-6 px-4 focus:outline-none hover:bg-indigo-600 rounded-full md:text-lg text-sm ">
                  View Projects
                </button>
              </a>
              <a href="#contact" className="ml-4">
                <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-4 md:px-6 px-4 focus:outline-none hover:bg-gray-200 rounded-full md:text-lg text-sm">
                  Contact Me
                </button>
              </a>
            </div>

            {/* Social Media Icons */}
            {(isDesktop || isTablet) && <Socials />}
          </div>
        </div>
      </div>
      <Metrics />
      <Skills />
    </section>
  );
};

export default About;
