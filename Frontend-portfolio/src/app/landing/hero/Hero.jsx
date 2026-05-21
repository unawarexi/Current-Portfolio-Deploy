// ============================================================================
// HERO SECTION  (was: header/Header.jsx)
// Full-screen intro — futuristic dark layout, Framer Motion entrance,
// Button component, icons from @core/constants/icons
// ============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from '@core/constants/icons';
import { Button } from '@components/ui';
import { ThemeToggle } from '@components/shared';
import Images from '@core/constants/Images';
import { glows, patterns, pill } from '@core/decorative';
import {
  staggerContainer,
  staggerItem,
  fadeInRight,
} from '@core/animations/FramerAnimations';
import Socials from '@landing/about/Socials';
import { useAbout } from '@hooks/api-hooks/useAbout';

const ROLES = [
  'Senior Frontend Engineer',
  'Founding Engineer',
  'Fullstack Product Engineer',
  'AI Product Engineer',
  'Senior Mobile & Cross-Platform Engineer',
  'System Designer & Architect',
];

// ─── Cycling role ticker ──────────────────────────────────────────────────────
const RoleTicker = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="h-6 sm:h-8 overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          exit={{    y: -24, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="font-mono text-[10px] sm:text-sm lg:text-base tracking-wider sm:tracking-widest text-primary-400 uppercase absolute inset-0 flex items-center justify-center lg:justify-start"
        >
          {ROLES[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Floating tech badge ──────────────────────────────────────────────────────
const FloatingBadge = ({ text, delay, className }) => (
  <motion.span
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    className={`absolute px-3 py-1.5 rounded-full text-xs font-mono font-semibold
      bg-primary-500/20 text-primary-300 border border-primary-500/30 backdrop-blur-sm ${className}`}
  >
    {text}
  </motion.span>
);

// ─── Component ────────────────────────────────────────────────────────────────
const Hero = () => {
  const { data: profile } = useAbout();

  const cvUrl   = profile?.cvUrl  || '/Andrew-Chukwuweike-CV.pdf';
  const stats = [
    { value: profile?.yearsOfExperience  ? `${profile.yearsOfExperience}+`  : '4+',  label: 'Years Exp.' },
    { value: profile?.projectsCount      ? `${profile.projectsCount}+`      : '50+', label: 'Projects'   },
    { value: profile?.rating             ?? '4.9',                                    label: 'Rating'     },
    { value: profile?.clientsCount       ? `${profile.clientsCount}+`       : '20+', label: 'Clients'    },
  ];

  return (
  <section
    id="home"
    className="relative min-h-screen flex items-center bg-[#070b18] overflow-hidden"
  >
    {/* Patterns */}
    <div className="absolute inset-0 opacity-30 pointer-events-none" style={patterns.circuit} />

    {/* ── Mobile / tablet portrait bg (hidden on desktop) ──────────── */}
    {/* Image is right-anchored; CSS mask fades it left→transparent so
        text stays readable while the portrait creates depth on the right */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
      {/* Portrait — faint, right-side only */}
      <img
        src={Images.backgroundImage}
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-[75%] object-cover object-top"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 30%, black 75%)',
          maskImage:       'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 30%, black 75%)',
          opacity: 0.18,
        }}
      />
      {/* Gradient wash — keeps left copy crisp, melts into portrait on right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, #070b18 22%, rgba(7,11,24,0.90) 42%, rgba(7,11,24,0.50) 65%, rgba(7,11,24,0.08) 100%)',
        }}
      />
      {/* Mobile glow accents — give the dark space life */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 85% 55% at 78% 30%, rgba(79,70,229,0.28) 0%, transparent 65%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 15% 85%, rgba(139,92,246,0.20) 0%, transparent 60%)' }}
      />
    </div>

    {/* Glow blobs — desktop always, enhanced intensity on mobile via the layer above */}
    <div className="absolute inset-0 pointer-events-none opacity-60 lg:opacity-100" style={{ background: glows.topLeft }} />
    <div className="absolute inset-0 pointer-events-none opacity-60 lg:opacity-100" style={{ background: glows.bottomRight }} />

    {/* Theme toggle — top right */}
    <div className="absolute top-6 right-6 z-20">
      <ThemeToggle size="md" />
    </div>

    {/* Content */}
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-24">
      <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">

        {/* ── Left column ─────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="visible"
          className="flex-1 text-center lg:text-left"
        >
          {/* Availability pill */}
          <motion.span variants={staggerItem} className={`${pill} mb-3 sm:mb-6`}>
            ● &nbsp;Open to senior &amp; founding roles
          </motion.span>

          {/* Name */}
          <motion.h1
            variants={staggerItem}
            className="font-display font-bold leading-none tracking-wider text-white mt-2 sm:mt-4 mb-1 sm:mb-2"
            style={{ fontSize: 'clamp(1.6rem, 6vw, 5.5rem)' }}
          >
            ANDREW J.
          </motion.h1>
          <motion.h1
            variants={staggerItem}
            className="font-display font-bold leading-none tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 mb-3 sm:mb-6"
            style={{ fontSize: 'clamp(1.6rem, 6vw, 5.5rem)' }}
          >
            CHUKWUWEIKE
          </motion.h1>

          {/* Role ticker */}
          <motion.div variants={staggerItem} className="mb-3 sm:mb-6">
            <RoleTicker />
          </motion.div>

          {/* Discipline tags */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap gap-1 sm:gap-2 justify-center lg:justify-start mb-4 sm:mb-8"
          >
            {['Fullstack','Mobile & Desktop','AI & AI Agents','Blockchain & Smart Contracts'].map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-mono font-semibold
                  bg-white/[0.05] border border-primary-500/20 text-gray-400 tracking-wide"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="font-sans text-gray-400 text-[12px] sm:text-sm lg:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-5 sm:mb-10"
          >
            I architect and ship end-to-end products — from pixel-perfect UIs and
            cross-platform mobile apps to AI agents, on-chain protocols, and the
            backend systems that tie it all together. I thrive at the founding-stage
            speed where ownership, taste, and engineering depth matter equally.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-12"
          >
            <Link to="#portfolio">
              <Button
                variant="primary"
                size="lg"
                className="max-sm:h-9 max-sm:px-4 max-sm:text-xs max-sm:gap-1.5"
                rightIcon={<ArrowRight size={14} className="max-sm:w-3 max-sm:h-3" />}
              >
                View Work
              </Button>
            </Link>
            <a
              href={cvUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="max-sm:h-9 max-sm:px-4 max-sm:text-xs max-sm:gap-1.5"
                leftIcon={<Download size={14} className="max-sm:w-3 max-sm:h-3" />}
              >
                Download CV
              </Button>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-4 gap-2 sm:gap-4 pt-3 sm:pt-8 border-t border-white/10 max-w-md mx-auto lg:mx-0"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center lg:items-start">
                <span className="font-display text-base sm:text-2xl font-bold text-primary-400">{value}</span>
                <span className="font-sans text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Socials */}
          <motion.div variants={staggerItem} className="mt-4 sm:mt-8 flex justify-center lg:justify-start">
            <Socials />
          </motion.div>
        </motion.div>

        {/* ── Right column — image + floating badges ───────────────────── */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
          className="flex-1 flex justify-center relative hidden lg:flex"
        >
          {/* Decorative ring */}
          <div className="absolute inset-0 m-auto w-80 h-80 rounded-full border border-primary-500/20" />
          <div className="absolute inset-0 m-auto w-96 h-96 rounded-full border border-primary-500/10" />

          {/* Glow behind image */}
          <div className="absolute inset-0 m-auto w-72 h-72 rounded-full bg-primary-600/10 blur-3xl" />

          {/* Profile image */}
          <motion.img
            src={Images.backgroundImage}
            alt="Andrew Chukwuweike"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 w-72 h-72 object-cover rounded-full border-2 border-primary-500/30 grayscale hover:grayscale-0 transition-all duration-500"
          />

          {/* Floating tech badges */}
          <FloatingBadge text="React / Next"    delay={0}   className="-top-4 left-8" />
          <FloatingBadge text="Flutter"         delay={0.5} className="top-12 -right-4" />
          <FloatingBadge text="Solidity"        delay={1}   className="-bottom-2 left-16" />
          <FloatingBadge text="LangChain / AI"  delay={1.5} className="bottom-16 -right-8" />
        </motion.div>

      </div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600"
    >
      <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
      <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent" />
    </motion.div>
  </section>
  );
};

export default Hero;
