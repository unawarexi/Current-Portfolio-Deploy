import React from 'react';
import Skills from './Skills';
import Metrics from './Metrics';
import Images from '../../constants/ImageStrings';
import "./About.css"

const About = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="flex flex-col text-center w-full mt-20">
        <h1 className="text-3xl font-bold title-font mb-4 text-gray-900">About Me</h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed md:text-base text-gray-700 px-4 text-sm">
          I'm a passionate software developer with experience in creating dynamic and responsive web applications. <br />
          I thrive on learning new technologies and constantly improving my skills to build meaningful and impactful solutions.
        </p>
      </div>
      <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
        {/* Profile Image */}
        <div className="lg:max-w-sm lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 img-bg rounded-3xl grid place-items-center">
  <img className="object-cover object-center rounded-3xl shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300" alt="profile" src={Images.aboutImg} />
</div>

        {/* About Me Content */} 
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-left">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            <span className='text-blue-300 text-3xl'>Welcome,</span> <br />I'm Andrew Chukwuweike
            <br className="lg:inline-block " /><span className=''>Software Developer</span>
          </h1>
          <p className="mb-8 leading-relaxed text-gray-700">
            With a background in both frontend and backend development, I specialize in building full-stack web applications that are robust, user-friendly, and efficient. 
            My expertise includes working with JavaScript, React, Node.js, and more. I love solving complex problems and delivering high-quality code that makes a difference.
          </p>
          <div className="flex justify-center">
            <a href="#projects">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 md:px-6 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                View Projects
              </button>
            </a>
            <a href="#contact" className="ml-4">
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 md:px-6 px-4 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Contact Me
              </button>
            </a>
          </div>
        </div>
      </div>
      <Metrics />
      <Skills />
    </section>
  );
};

export default About;
