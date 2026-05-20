// ============================================================================
// FLOATING NAV — bottom nav bar  (lucide icons from @core/constants/icons)
// ============================================================================

import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Layers, Mail } from '@core/constants/icons';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

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
      className="fixed bottom-4 z-50
        left-0 right-0 mx-auto
        flex items-center gap-1 px-4 py-2
        bg-black/60 backdrop-blur-xl
        border border-white/10 rounded-2xl shadow-xl
        w-max max-w-[calc(100vw-2rem)]"
    >
      {navItems.map(({ Icon, to, name }) => {
        const isActive = activeNav === to;

        const itemClass = `
          relative group flex items-center justify-center
          p-3 rounded-xl cursor-pointer transition-all duration-200
          ${isActive
            ? 'text-primary-400 bg-primary-500/15'
            : 'text-gray-400 hover:text-primary-400 hover:bg-white/5'
          }
        `;

        const inner = (
          <>
            <Icon size={18} />
            {/* Tooltip */}
            <span className="absolute -top-9 left-1/2 -translate-x-1/2
              px-2 py-1 rounded-lg text-[10px] font-mono tracking-wide
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

        // Home page — use smooth scroll Link
        return (
          <ScrollLink
            key={name}
            to={to}
            smooth
            duration={500}
            className={itemClass}
            onClick={() => setActiveNav(to)}
          >
            {inner}
          </ScrollLink>
        );
      })}
    </motion.nav>
  );
};

export default FloatingNavbar;
