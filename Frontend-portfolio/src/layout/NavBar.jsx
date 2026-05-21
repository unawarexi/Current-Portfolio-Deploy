// ============================================================================
// NAVBAR — desktop + mobile
// Desktop: transparent fixed bar with links + ThemeToggle
// Mobile:  hamburger → full-screen slide-down drawer with circuit pattern,
//          glow atmosphere, staggered nav items and status pill
// ============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, User, Briefcase, Layers, Mail, Menu, X, Moon
} from '@core/constants/icons';
import { ThemeToggle } from '@components/shared/ThemeToggle';
import { patterns, glows } from '@core/decorative';
import { colors } from '@core/constants/colors';

// ── Nav items ────────────────────────────────────────────────────────────────
const navItems = [
  { label: 'Home',       hash: 'home',       Icon: Home },
  { label: 'About',      hash: 'about',      Icon: User },
  { label: 'Experience', hash: 'experience', Icon: Briefcase },
  { label: 'Portfolio',  hash: 'portfolio',  Icon: Layers,  to: '/projects' },
  { label: 'Contact',    hash: 'contact',    Icon: Mail },
];

// ── Animation variants ───────────────────────────────────────────────────────
const drawerVariants = {
  hidden: { y: '-100%', opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { type: 'spring', stiffness: 280, damping: 28 },
  },
  exit: {
    y: '-100%', opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, x: -28 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.08 + i * 0.07, type: 'spring', stiffness: 260, damping: 22 },
  }),
};

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

// ── Component ─────────────────────────────────────────────────────────────────
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const location  = useLocation();
  const isHome    = location.pathname === '/';

  const hrefFor = (item) =>
    item.to ? item.to : `/#${item.hash}`;

  return (
    <section className="relative">
      {/* ── Fixed bar ─────────────────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-40 h-12 sm:h-16 md:h-20
        bg-black/30 backdrop-blur-md border-b border-white/5 shadow-lg">
        <div className="container mx-auto h-full px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-base sm:text-xl lg:text-2xl font-bold text-gray-100 dark:text-white z-50">
            D<span style={{ color: colors.primary[500] }}>r.</span> Dre
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={hrefFor(item)}
                className="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="md:hidden z-50 flex items-center justify-center
              w-8 h-8 sm:w-10 sm:h-10 rounded-xl
              bg-gradient-to-br from-indigo-600 to-indigo-800
              shadow-lg shadow-indigo-900/40
              text-white"
          >
            <Menu size={16} />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="hidden" animate="visible" exit="exit"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              variants={drawerVariants}
              initial="hidden" animate="visible" exit="exit"
              className="fixed top-0 left-0 w-full z-50 md:hidden
                min-h-[70vh] rounded-b-[2.5rem] overflow-hidden
                bg-[#0b0f1e] border-b border-white/8 shadow-2xl"
            >
              {/* Circuit pattern background */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={patterns.circuit}
              />

              {/* Glow atmosphere */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: glows.dual }}
              />

              {/* ── Drawer content ── */}
              <div className="relative z-10 px-4 pt-4 pb-6 flex flex-col gap-4">

                {/* Header row */}
                <div className="flex items-center justify-between">
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="text-base font-bold text-white"
                  >
                    D<span style={{ color: colors.primary[400] }}>r.</span> Dre
                  </Link>

                  {/* Status pill */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full
                    bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase">
                      Available
                    </span>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="flex items-center justify-center w-9 h-9 rounded-full
                      bg-white/5 border border-white/10 text-gray-300
                      hover:bg-white/10 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

                {/* Nav links */}
                <nav className="flex flex-col gap-2">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        to={hrefFor(item)}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-2xl
                          bg-white/[0.03] border border-white/[0.06]
                          hover:bg-indigo-500/10 hover:border-indigo-500/20
                          transition-all duration-200"
                      >
                        {/* Icon bubble */}
                        <div className="flex items-center justify-center w-7 h-7 rounded-xl
                          bg-indigo-500/10 border border-indigo-500/15
                          text-indigo-400 group-hover:bg-indigo-500/20
                          transition-colors shrink-0">
                          <item.Icon size={14} />
                        </div>

                        <span className="text-[12px] font-medium text-gray-200
                          group-hover:text-indigo-300 transition-colors">
                          {item.label}
                        </span>

                        {/* Arrow */}
                        <svg
                          className="ml-auto w-3.5 h-3.5 text-gray-600
                            group-hover:text-indigo-400 transition-colors"
                          fill="none" stroke="currentColor" strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M9 18l6-6-6-6" />
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Theme toggle row */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="flex items-center justify-between
                    px-3 py-2.5 rounded-2xl
                    bg-white/[0.03] border border-white/[0.06]"
                >
                    <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center
                      bg-indigo-500/10 border border-indigo-500/15 text-indigo-400">
                      <Moon size={14} />
                    </div>
                    <span className="text-[12px] font-medium text-gray-300">Appearance</span>
                  </div>
                  <ThemeToggle />
                </motion.div>

                {/* Bottom glow accent */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-1
                    rounded-full blur-sm opacity-60"
                  style={{ background: `linear-gradient(90deg, transparent, ${colors.primary[500]}, transparent)` }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NavBar;