import React from 'react';
import Images from '../../constants/ImageStrings';
import { FaDownload, FaBriefcase } from 'react-icons/fa';
import useResponsive from '../../Hooks/useResponsive';

const Header = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  return (
    <div className="relative h-[100vh] md:h-[70vh]">
      {/* Image container with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={Images.backgroundImage} 
          alt="background" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Section content on top of image */}
      <section className="text-gray-600 body-font absolute inset-0 z-10 flex items-center justify-center">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow lg:w-1/2 md:w-full lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-left">
            <h1 className="title-font md:text-4xl text-xl mb-4 font-medium text-white ">
              Expert in Web Development, Mobile Apps, and <span className='text-indigo-700'>Blockchain / SmartContracts Integration</span>
            </h1>
            <p className="mb-8 leading-relaxed text-white">
              Bringing innovative digital solutions to life with expertise in modern web technologies, mobile application development, and secure blockchain integrations. Let's create something great together!
            </p>
           
             {!isMobile && <>
              <div className="flex w-full md:justify-start justify-center items-end">
             <div className="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
                <label htmlFor="hero-field" className="leading-7 text-sm text-gray-300">
                  Let’s start a conversation
                </label>
                <input 
                  type="text" 
                  id="hero-field" 
                  name="hero-field" 
                  className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                />
              </div>
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 lg:px-6 md:px-2 md:w-40 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Contact Me
              </button>
            </div>
            <p className="text-sm mt-2 text-gray-300 mb-8 w-full">
              Let's connect and discuss how I can help bring your ideas to life.
            </p>
            </> }
            <div className="grid space-y-4 w-full md:flex md:space-x-4 md:flex-row">
              <button className="bg-[#070b18] w-full inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none shadow-lg shadow-blue-300">
                <FaDownload className="w-6 h-6" />
                <span className="ml-4 flex items-start flex-col leading-none">
                  <span className="text-xs text-gray-600 mb-1">DOWNLOAD</span>
                  <span className="title-font font-medium text-sm md:text-base text-blue-300">Resume & Portfolio</span>
                </span>
              </button>
              <button className="bg-[#070b18] w-full inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none shadow-lg shadow-blue-300">
              <FaBriefcase className="w-6 h-6" />
                <span className="ml-4  md:w-full flex items-start flex-col leading-none">
                  <span className="text-xs text-gray-600 mb-1">CHECK OUT</span>
                  <span className="title-font font-medium text-blue-300">My Experience</span>
                </span>
              </button>
            </div>
          </div>
          {!isMobile && !isTablet && <><div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src={Images.subBackgroundImage} />
          </div></> }
        </div>
      </section>
    </div>
  );
};

export default Header;
