import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger and close icons
import ThemeToggle from '../constants/Theme';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  // State to manage mobile menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation items array
  const navItems = ['Home', 'About', 'Skills', 'Portfolio', 'Contact'];

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section>
      <header className="fixed top-0 w-full z-50 bg-black/5 backdrop-blur-md text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5  flex-row items-center justify-between">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg> */}
            <div className="ml-3 text-xl lg:text-3xl text-gray-700 font-bold">D<span className='text-indigo-700'>r.</span> Dre</div>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex md:ml-auto items-center text-base justify-center space-x-6">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gray-900 text-indigo-500">
                {item}
              </a>
            ))}
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
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-[#0e162f] h-screen text-blue-300 p-5 shadow-lg z-20"
            >
            <div 
  onClick={toggleMenu} 
  className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 cursor-pointer ml-auto"
>
  <FaTimes size={32} className="text-blue-300" />
</div>

              <div className="flex flex-col mt-4 space-y-6">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-md hover:text-gray-300 bg-[#070b18] px-4 py-3 shadow-blue-300 shadow-md hover:bg-[#121e47] rounded-full"
                    onClick={toggleMenu}
                  >
                    {item}
                  </a>
                ))}
                {/* Theme Toggle inside mobile menu */}
                <div className="mt-4">
                  <ThemeToggle />
                  <p className='text-gray-400 items-center text-center'>Theme mode</p>
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
