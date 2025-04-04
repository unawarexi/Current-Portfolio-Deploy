import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger and close icons
import ThemeToggle from "../constants/Theme";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  // State to manage mobile menu visibility
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Navigation items array
  const navItems = ["Home", "About", "Skills", "Portfolio", "Contact"];

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
    <section>
      <header className="fixed top-0 w-full z-50 bg-white/30 backdrop-blur-md text-gray-600 body-font md:h-24 h-16 dark:bg-transparent dark:text-blue-300 shadow-lg">
        <div className="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
          <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <div className="ml-3 text-xl lg:text-3xl text-gray-700 font-bold">
              D<span className="text-indigo-700">r.</span> Dre
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex md:ml-auto items-center text-base justify-center space-x-6">
            {navItems.map((item) => renderNavLink(item))}
            <ThemeToggle />
          </nav>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700">
              {menuOpen ? <></> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu with Framer Motion */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 rounded-tl-xl rounded-bl-xl right-0 bottom-0 w-64 bg-white dark:bg-[#0e162f] h-screen text-[#0e162f] dark:text-blue-300 p-5 shadow-lg z-20"
            >
              <div
                onClick={toggleMenu}
                className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-400 dark:bg-gray-800 cursor-pointer ml-auto"
              >
                <FaTimes size={32} className="dark:text-blue-300 text-white" />
              </div>

              <div className="flex flex-col mt-4 space-y-6">
                {navItems.map((item) => (
                  isHomePage ? (
                    <a
                      key={item}
                      href={`/#${item.toLowerCase()}`}
                      className="text-md hover:text-gray-300 bg-[#070b18] px-4 py-3 shadow-blue-300 shadow-md hover:bg-[#121e47] rounded-full"
                      onClick={toggleMenu}
                    >
                      {item}
                    </a>
                  ) : (
                    <Link
                      key={item}
                      to={item === "Portfolio" ? "/projects" : `/#${item.toLowerCase()}`}
                      className="text-md hover:text-gray-300 bg-white dark:bg-[#070b18]  px-4 py-3 shadow-blue-300 shadow-md hover:bg-[#121e47] rounded-full"
                      onClick={toggleMenu}
                    >
                      {item}
                    </Link>
                  )
                ))}
                {/* Theme Toggle inside mobile menu */}
                <div className="mt-4">
                  <ThemeToggle />
                  <p className="text-gray-400 items-center text-center">
                    Theme mode
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </section>
  );
};

export default NavBar;