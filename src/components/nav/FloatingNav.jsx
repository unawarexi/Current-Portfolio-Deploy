import React, { useState } from 'react';
import { FaHome, FaUser, FaBriefcase, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const FloatingNavbar = () => {
  const [activeNav, setActiveNav] = useState('home');
  const navItems = [
    { icon: <FaHome />, to: 'home', name: 'Home', scroll: true },
    { icon: <FaUser />, to: 'about', name: 'About', scroll: true },
    { icon: <FaBriefcase />, to: 'experience', name: 'Experience', scroll: true },
    { icon: <FaProjectDiagram />, to: '/overview', name: 'Portfolio', scroll: false },
    { icon: <FaEnvelope />, to: 'contact', name: 'Contact', scroll: true },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-black bg-opacity-60 backdrop-blur-lg shadow-lg rounded-2xl p-2 flex items-center justify-between w-72 sm:w-80 md:w-96 lg:w-[32rem] xl:w-[36rem] max-w-full">
      {navItems.map((item) => (
        <div key={item.name} className="group relative flex items-center">
          {item.scroll ? (
            <ScrollLink
              to={item.to}
              smooth={true}
              duration={500}
              className={`cursor-pointer p-2 text-white text-sm sm:text-base md:text-lg ${
                activeNav === item.to ? 'text-blue-400' : 'text-gray-300'
              } transition-colors duration-300 ease-in-out hover:text-blue-400`}
              onSetActive={() => setActiveNav(item.to)}
            >
              {item.icon}
            </ScrollLink>
          ) : (
            <Link
              to={item.to}
              className={`cursor-pointer p-2 text-white text-sm sm:text-base md:text-lg ${
                activeNav === item.to ? 'text-blue-400' : 'text-gray-300'
              } transition-colors duration-300 ease-in-out hover:text-blue-400`}
              onClick={() => setActiveNav(item.to)}
            >
              {item.icon}
            </Link>
          )}
          <span className="absolute bottom-12 opacity-0 group-hover:opacity-100 text-xs sm:text-sm bg-gray-800 text-white rounded-lg px-2 py-1 transition-opacity duration-300">
            {item.name}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export default FloatingNavbar;
