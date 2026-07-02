// ============================================================================
// FLOATING NAV — bottom nav bar  (lucide icons from @core/constants/icons)
// ============================================================================

import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Layers, Mail } from '@core/constants/icons';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { Icon: Home,     to: 'home',       name: 'Home' },
  { Icon: User,     to: 'about',      name: 'About' },
  { Icon: Briefcase,to: 'experience', name: 'Experience' },
  { Icon: Layers,   to: 'portfolio',  name: 'Portfolio' },
  { Icon: Mail,     to: 'contact',    name: 'Contact' },
];

const FloatingNavbar = () => {
  const [activeNav, setActiveNav] = useState('home');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (location.hash) {
      setActiveNav(location.hash.substring(1));
    } else if (location.pathname.includes('/projects')) {
      setActiveNav('portfolio');
    } else if (location.pathname === '/') {
      setActiveNav('home');
    }
  }, [location]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-4 sm:bottom-6 md:bottom-8 z-[100]
        left-0 right-0 mx-auto
        flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3
        bg-white/80 dark:bg-[#070b18]/80 backdrop-blur-2xl
        border border-gray-200/80 dark:border-white/[0.08] rounded-[2rem] shadow-2xl shadow-black/10 dark:shadow-black/40
        w-max max-w-[calc(100vw-2rem)]"
    >
      {navItems.map(({ Icon, to, name }) => {
        const isActive = activeNav === to;

        const itemClass = `
          relative group flex items-center justify-center
          p-2.5 sm:p-3.5 rounded-2xl cursor-pointer transition-all duration-300
          ${isActive
            ? 'text-burgundy-600 dark:text-burgundy-400 bg-burgundy-500/10 shadow-inner scale-105'
            : 'text-gray-500 dark:text-gray-400 hover:text-burgundy-600 dark:hover:text-burgundy-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:scale-110'
          }
        `;

        const inner = (
          <>
            <Icon size={20} className="sm:w-6 sm:h-6" />
            {/* Tooltip */}
            <span className="absolute -top-9 left-1/2 -translate-x-1/2
              px-2 py-1 rounded-lg text-[9px] font-mono tracking-wide
              bg-gray-900 text-white border border-white/10
              opacity-0 group-hover:opacity-100 pointer-events-none
              transition-opacity duration-200 whitespace-nowrap">
              {name}
            </span>
          </>
        );

        // Off homepage — use React Router Link
        if (!isHomePage || (to === 'portfolio' && location.pathname.includes('/projects'))) {
          return (
            <Link
              key={name}
              to={`/#${to}`}
              className={itemClass}
              onClick={() => setActiveNav(to)}
            >
              {inner}
            </Link>
          );
        }

        // Home page — use native smooth scroll
        return (
          <a
            key={name}
            href={`#${to}`}
            className={itemClass}
            onClick={(e) => {
              e.preventDefault();
              setActiveNav(to);
              const element = document.getElementById(to);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {inner}
          </a>
        );
      })}
    </motion.nav>
  );
};

export default FloatingNavbar;
