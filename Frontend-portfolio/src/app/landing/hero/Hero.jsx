// ============================================================================
// HERO SECTION  (was: header/Header.jsx)
// Full-screen intro — futuristic dark layout, Framer Motion entrance,
// Button component, icons from @core/constants/icons
// ============================================================================

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "@core/constants/icons";
import { Button } from "@components/ui";
import { ThemeToggle } from "@components/shared";
import Images from "@core/constants/Images";
import { glows, patterns, pill } from "@core/decorative";
import {
  staggerContainer,
  staggerItem,
  fadeInRight,
} from "@core/animations/FramerAnimations";
import Socials from "@landing/about/Socials";
import { useAbout } from "@hooks/api-hooks/useAbout";

const ROLES = [
  "Senior Frontend Engineer",
  "Founding Engineer",
  "Fullstack Product Engineer",
  "AI Product Engineer",
  "Senior Mobile & Cross-Platform Engineer",
  "System Designer & Architect",
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
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="font-mono text-[10px] sm:text-sm lg:text-base tracking-wider sm:tracking-widest text-burgundy-600 dark:text-burgundy-400 uppercase absolute inset-0 flex items-center justify-center lg:justify-start"
        >
          {ROLES[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Floating tech badge ──────────────────────────────────────────────────────
const FloatingBadge = ({ text, delay, className, isBurgundy }) => (
  <motion.span
    animate={{ y: [0, -8, 0] }}
    transition={{
      duration: 3 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    className={`absolute px-3 py-1.5 rounded-full text-xs font-mono font-semibold backdrop-blur-sm border ${
      isBurgundy
        ? "bg-burgundy-500/10 text-burgundy-700 dark:text-burgundy-300 border-burgundy-500/30"
        : "bg-primary-500/10 text-primary-700 dark:text-primary-300 border-primary-500/30"
    } ${className}`}
  >
    {text}
  </motion.span>
);

// ─── Component ────────────────────────────────────────────────────────────────
const Hero = () => {
  const { data: profile } = useAbout();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const haloScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const cvUrl = profile?.cvUrl || "/Andrew-Chukwuweike-CV.pdf";
  const stats = [
    {
      value: profile?.yearsOfExperience
        ? `${profile.yearsOfExperience}+`
        : "4+",
      label: "Years Exp.",
    },
    {
      value: profile?.projectsCount ? `${profile.projectsCount}+` : "50+",
      label: "Projects",
    },
    { value: profile?.rating ?? "4.9", label: "Rating" },
    {
      value: profile?.clientsCount ? `${profile.clientsCount}+` : "20+",
      label: "Clients",
    },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[100svh] flex items-center bg-slate-50 dark:bg-[#070b18] overflow-hidden"
    >
      {/* Patterns */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={patterns.circuit}
      />

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
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 30%, black 75%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 30%, black 75%)",
            opacity: 0.18,
          }}
        />
        {/* Gradient wash — keeps left copy crisp, melts into portrait on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-[#070b18] dark:via-[rgba(7,11,24,0.90)] dark:to-transparent" />
        {/* Mobile glow accents — give the dark space life */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 55% at 78% 30%, rgba(79,70,229,0.28) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 15% 85%, rgba(139,92,246,0.20) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Glow blobs — desktop always, enhanced intensity on mobile via the layer above */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 lg:opacity-100"
        style={{ background: glows.topLeft }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-60 lg:opacity-100"
        style={{ background: glows.bottomRight }}
      />
      {/* Burgundy glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 lg:opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(159,37,65,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Theme toggle — top right */}
      <div className="absolute top-6 right-6 z-20 md:top-8 md:right-8">
        <ThemeToggle size="md" />
      </div>

      {/* Content */}
      <motion.div style={{ y: contentY }} className="relative z-10 w-full">
        <div className="page-shell py-20 sm:py-32 lg:py-36">
          <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)]">
            {/* ── Left column ─────────────────────────────────────────────── */}
            <motion.div
              variants={staggerContainer(0.12, 0.1)}
              initial="hidden"
              animate="visible"
              className="min-w-0 text-center lg:text-left"
            >
              {/* Availability pill */}
              <motion.span
                variants={staggerItem}
                className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-burgundy-500/10 text-burgundy-600 dark:text-burgundy-400 border border-burgundy-500/20 mb-5 sm:mb-7"
              >
                ● &nbsp;Open to senior &amp; founding roles
              </motion.span>

              <motion.p
                variants={staggerItem}
                className="mx-auto mb-4 max-w-2xl font-mono text-[0.72rem] uppercase tracking-[0.38em] text-burgundy-700/90 dark:text-burgundy-300/90 lg:mx-0"
              >
                Product-minded engineering for ambitious digital brands
              </motion.p>

              {/* Name */}
              <motion.h1
                variants={staggerItem}
                className="font-display font-extrabold leading-none tracking-[-0.055em] text-gray-900 dark:text-white mt-2 mb-1
              text-[clamp(1.5rem,5vw,4.2rem)] [word-break:break-word]"
              >
                ANDREW J.
              </motion.h1>
              <motion.h1
                variants={staggerItem}
                className="font-display font-extrabold leading-none tracking-[-0.055em] text-transparent
              bg-clip-text bg-gradient-to-r from-gray-900 dark:from-white via-primary-500 dark:via-primary-200 to-accent-500 dark:to-accent-300 mb-5 sm:mb-7
              text-[clamp(1.5rem,5vw,4.2rem)] [word-break:break-word]"
              >
                CHUKWUWEIKE
              </motion.h1>

              {/* Role ticker */}
              <motion.div variants={staggerItem} className="mb-5 sm:mb-7">
                <RoleTicker />
              </motion.div>

              {/* Discipline tags */}
              <motion.div
                variants={staggerItem}
                className="flex flex-wrap gap-2 sm:gap-2.5 justify-center lg:justify-start mb-6 sm:mb-10"
              >
                {[
                  "Fullstack",
                  "Mobile & Desktop",
                  "AI & AI Agents",
                  "Blockchain & Smart Contracts",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 sm:px-4 rounded-full text-[9px] sm:text-[11px] font-mono font-semibold
                  bg-gray-900/[0.05] dark:bg-white/[0.05] border border-gray-900/10 dark:border-white/10 text-gray-600 dark:text-gray-300 tracking-[0.18em]"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                variants={staggerItem}
                className="editorial-copy max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-12 text-gray-600 dark:text-slate-300"
              >
                I architect and ship end-to-end products; from pixel-perfect UIs
                and cross-platform mobile apps to AI agents, on-chain protocols,
                and the backend systems that tie it all together. I thrive at
                the founding-stage speed where ownership, taste, and engineering
                depth matter equally.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={staggerItem}
                className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-10 sm:mb-14"
              >
                <a href="#portfolio">
                  <Button
                    variant="primary"
                    size="lg"
                    className="h-10 px-5 text-xs sm:h-14 sm:px-8 sm:text-base shadow-[0_18px_50px_rgba(99,102,241,0.28)]"
                    rightIcon={<ArrowRight size={16} />}
                  >
                    View Work
                  </Button>
                </a>
                <a
                  href={cvUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-10 px-5 text-xs sm:h-14 sm:px-8 sm:text-base text-burgundy-900 border-burgundy-900 bg-burgundy-500/10 hover:bg-burgundy-500/20 dark:border-white/20 dark:bg-white/[0.02] dark:text-white dark:hover:bg-white/5"
                    leftIcon={<Download size={16} />}
                  >
                    Download CV
                  </Button>
                </a>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={staggerItem}
                className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4 sm:pt-10 max-w-3xl mx-auto lg:mx-0"
              >
                {stats.map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center lg:items-start"
                  >
                    <span className="font-display text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                      {value}
                    </span>
                    <span className="mt-1 font-mono text-[10px] sm:text-[11px] text-gray-500 dark:text-slate-500 uppercase tracking-[0.28em]">
                      {label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Socials */}
              <motion.div
                variants={staggerItem}
                className="mt-4 sm:mt-8 flex justify-center lg:justify-start"
              >
                <Socials />
              </motion.div>
            </motion.div>

            {/* ── Right column — image + floating badges ───────────────────── */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
              className="relative flex justify-center md:flex"
            >
              <motion.div
                style={{ scale: haloScale }}
                className="relative mx-auto hidden h-[24rem] w-[24rem] md:block lg:h-[34rem] lg:w-[34rem]"
              >
                <div className="absolute inset-3 rounded-full border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02]" />
                <div className="absolute inset-0 rounded-full border border-burgundy-600/30 dark:border-burgundy-400/20" />
                <div className="absolute inset-[8%] rounded-full border border-burgundy-500/25 dark:border-burgundy-300/15" />
                <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-burgundy-500/30 via-burgundy-400/10 to-transparent blur-3xl" />
                <motion.div
                  style={{ y: portraitY }}
                  animate={{ rotate: [0, 2, 0, -2, 0] }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-[11%] overflow-hidden rounded-full border border-gray-900/10 dark:border-white/12 shadow-[0_25px_90px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_90px_rgba(0,0,0,0.45)]"
                >
                  <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.8),transparent_28%),linear-gradient(180deg,rgba(248,250,252,0.02),rgba(248,250,252,0.28))] dark:bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.28),transparent_28%),linear-gradient(180deg,rgba(7,11,24,0.02),rgba(7,11,24,0.28))]" />
                  <img
                    src={Images.backgroundImage}
                    alt="Andrew Chukwuweike"
                    className="h-full w-full object-cover object-top"
                  />
                </motion.div>
              </motion.div>

              {/* Floating tech badges */}
              <FloatingBadge
                text="React / Next"
                delay={0}
                className="left-0 top-10 hidden md:flex"
                isBurgundy
              />
              <FloatingBadge
                text="Flutter"
                delay={0.5}
                className="right-0 top-20 hidden md:flex"
              />
              <FloatingBadge
                text="Solidity"
                delay={1}
                className="bottom-8 left-10 hidden md:flex"
                isBurgundy
              />
              <FloatingBadge
                text="LangChain / AI"
                delay={1.5}
                className="bottom-16 right-0 hidden md:flex"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
