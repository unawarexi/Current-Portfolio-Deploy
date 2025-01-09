import React, { useState } from 'react';
import { FaHome, FaUser, FaBriefcase, FaProjectDiagram, FaEnvelope } from 'react-icons/fa'; // Icons from react-icons
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const FloatingNavBar = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { icon: <FaHome size={24} />, link: '/', name: 'Home' },
    { icon: <FaUser size={24} />, link: '/about', name: 'About' },
    { icon: <FaBriefcase size={24} />, link: '/experience', name: 'Experience' },
    { icon: <FaProjectDiagram size={24} />, link: '/portfolio', name: 'Portfolio' },
    { icon: <FaEnvelope size={24} />, link: '/contact', name: 'Contact' },
  ];

  // Update active nav based on route path
  const updateActiveIndex = () => {
    const currentPath = location.pathname;
    const foundIndex = navItems.findIndex((item) => item.link === currentPath);
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
  };

  React.useEffect(() => {
    updateActiveIndex();
  }, [location]);

  return (
    <motion.div
      className="fixed bottom-10 left-1/2 transform -translate-x-1.5 z-50 w-[90%] md:w-[50%] bg-white/30 backdrop-blur-lg rounded-full shadow-lg flex justify-around py-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {navItems.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`relative flex items-center justify-center p-4 cursor-pointer ${
            activeIndex === index ? 'text-indigo-500' : 'text-gray-500'
          }`}
        >
          {item.icon}
          {activeIndex === index && (
            <span className="absolute inset-0 w-full h-full rounded-full bg-indigo-500 opacity-20"></span>
          )}
        </Link>
      ))}
    </motion.div>
  );
};

export default FloatingNavBar;
