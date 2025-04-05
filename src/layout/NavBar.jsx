import React, { useState } from "react";
import { FaBars, FaTimes, FaHome, FaUser, FaBriefcase, FaFolderOpen, FaEnvelope } from "react-icons/fa"; // Import icons
import ThemeToggle from "../constants/Theme";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import useResponsive from "../Hooks/useResponsive";

const NavBar = () => {
  // State to manage mobile menu visibility
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Navigation items array
  const navItems = ["Home", "About", "Experience", "Portfolio", "Contact"];

  // Map nav items to corresponding icons
  const navIcons = {
    Home: <FaHome />,
    About: <FaUser />,
    Experience: <FaBriefcase />,
    Portfolio: <FaFolderOpen />,
    Contact: <FaEnvelope />,
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const renderNavLink = (item) => {
    // Special case for Portfolio
    if (item === "Portfolio") {
      return (
        <Link
          key={item}
          to={isHomePage ? "/#portfolio" : "/projects"}
          className="hover:text-gray-900 text-indigo-500"
        >
          {item}
        </Link>
      );
    }

    // For home page sections, use hash routing
    if (isHomePage) {
      return (
        <a
          key={item}
          href={`/#${item.toLowerCase()}`}
          className="hover:text-gray-900 text-indigo-500"
        >
          {item}
        </a>
      );
    }

    // For other pages, use Link to navigate back to home page with hash
    return (
      <Link
        key={item}
        to={`/#${item.toLowerCase()}`}
        className="hover:text-gray-900 text-indigo-500"
      >
        {item}
      </Link>
    );
  };

  return (
    <section className="relative">
      <header className="fixed top-0 w-full z-30 bg-black/30 backdrop-blur-md text-gray-600 body-font md:h-20 h-16 dark:bg-transparent dark:text-blue-300 shadow-lg">
        <div className="relative container mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
          <Link to="/" className="flex z-50 font-medium items-center text-gray-900 mb-4 md:mb-0">
            <div className="ml-3 text-xl lg:text-3xl text-gray-100 font-bold dark:text-white">
              D<span className="text-indigo-500">r.</span> Dre
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center text-base justify-center space-x-8">
            {navItems.map((item) => renderNavLink(item))}
            <ThemeToggle />
          </nav>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center z-50">
            <button 
              onClick={toggleMenu} 
              className="text-gray-100 dark:text-white bg-gradient-to-r from-indigo-500 to-indigo-700 p-2 rounded-lg shadow-md flex items-center justify-center"
            >
              {menuOpen ? <></> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Modern Style */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-white to-gray-500 dark:from-[#0e162f] dark:to-[#070b18] text-[#142043] dark:text-blue-300 p-4 shadow-lg z-50 rounded-b-3xl overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <Link to="/" className="flex font-medium items-center">
                  <div className="text-xl text-gray-800 font-bold dark:text-white">
                    D<span className="text-indigo-500">r.</span> Dre
                  </div>
                </Link>
                
                <div
                  onClick={toggleMenu}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 cursor-pointer shadow-lg"
                >
                  <FaTimes size={20} className="text-white" />
                </div>
              </div>

              <div className="flex flex-col space-y-4 mb-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item === "Portfolio" ? "/projects" : `/#${item.toLowerCase()}`}
                      className="flex items-center text-base font-medium hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-lg bg-white/50 dark:bg-[#0e162f]/50 backdrop-blur-sm shadow-md"
                      onClick={toggleMenu}
                    >
                      <span className="mr-3 text-indigo-500">{navIcons[item]}</span> {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Theme Toggle inside mobile menu - Fixed positioning and alignment */}
              <motion.div 
                className="mt-2 px-4 py-3 bg-white/70 dark:bg-[#0e162f]/70 rounded-xl backdrop-blur-sm shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                    Switch theme
                  </p>
                  <ThemeToggle />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </section>
  );
};

export default NavBar;