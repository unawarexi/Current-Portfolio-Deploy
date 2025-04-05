import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaBriefcase, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const FloatingNavbar = () => {
  const [activeNav, setActiveNav] = useState('home');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Update active nav based on current location
  useEffect(() => {
    if (location.hash) {
      setActiveNav(location.hash.substring(1)); // Remove the # character
    } else if (location.pathname.includes('/projects')) {
      setActiveNav('portfolio');
    } else {
      setActiveNav(isHomePage ? 'home' : '');
    }
  }, [location, isHomePage]);

  const navItems = [
    { icon: <FaHome />, to: 'home', name: 'Home' },
    { icon: <FaUser />, to: 'about', name: 'About' },
    { icon: <FaBriefcase />, to: 'experience', name: 'Experience' },
    { icon: <FaProjectDiagram />, to: '/projects', name: 'Portfolio' },
    { icon: <FaEnvelope />, to: 'contact', name: 'Contact' },
  ];

  const handleNavigation = (item) => {
    setActiveNav(item.to);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-black bg-opacity-60 backdrop-blur-lg shadow-lg rounded-2xl 
       p-2 flex items-center justify-evenly w-80 md:w-[28rem] lg:w-[32rem] xl:w-[36rem] max-w-full md:space-x-4 space-x-2">
      {navItems.map((item) => {
        // Special case for Portfolio
        if (item.to === 'portfolio' && !isHomePage && location.pathname.includes('/projects')) {
          return (
            <div key={item.name} className="group relative flex items-center">
              <Link
                to="/projects"
                className={`cursor-pointer p-3 text-white text-sm sm:text-base md:text-lg ${
                  activeNav === item.to ? 'text-blue-400' : 'text-gray-300'
                } transition-colors duration-300 ease-in-out hover:text-blue-400`}
              >
                {item.icon}
              </Link>
              <span className="absolute bottom-12 opacity-0 group-hover:opacity-100 text-xs sm:text-sm bg-gray-800 text-white rounded-lg px-2 py-1 transition-opacity duration-300">
                {item.name}
              </span>
            </div>
          );
        }
        
        return (
          <div key={item.name} className="group relative flex items-center">
            {isHomePage ? (
              // On home page - use scroll navigation
              <ScrollLink
                to={item.to}
                smooth={true}
                duration={500}
                className={`cursor-pointer p-3 text-white text-sm sm:text-base md:text-lg ${
                  activeNav === item.to ? 'text-blue-400' : 'text-gray-300'
                } transition-colors duration-300 ease-in-out hover:text-blue-400`}
                onClick={() => handleNavigation(item)}
              >
                {item.icon}
              </ScrollLink>
            ) : (
              // On other pages - navigate back to home with hash
              <Link
                to={`/#${item.to}`}
                className={`cursor-pointer p-3 text-white text-sm sm:text-base md:text-lg ${
                  activeNav === item.to ? 'text-blue-400' : 'text-gray-300'
                } transition-colors duration-300 ease-in-out hover:text-blue-400`}
                onClick={() => handleNavigation(item)}
              >
                {item.icon}
              </Link>
            )}
            <span className="absolute bottom-12 opacity-0 group-hover:opacity-100 text-xs sm:text-sm bg-gray-800 text-white rounded-lg px-2 py-1 transition-opacity duration-300">
              {item.name}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
};

export default FloatingNavbar;