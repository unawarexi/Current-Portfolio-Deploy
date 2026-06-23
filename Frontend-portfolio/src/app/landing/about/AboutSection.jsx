// ============================================================================
// ABOUT SECTION — editorial parallax redesign (Apple/Google-dev aesthetic)
// ============================================================================
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Images from "@core/constants/Images";
import {
  sectionBase,
  sectionDivider,
  pill,
  glows,
  patterns,
} from "@core/decorative";
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
} from "@core/animations/FramerAnimations";
import { Card } from "@components/ui";
import {
  Activity,
  Shield,
  Clock,
  ArrowRight,
  ChevronRight,
  Pencil,
  BookOpen,
} from "@core/constants/icons";
import { EmptyState } from "@components/shared";
import { useAboutSectionUsecase } from "@app/usecases/about-usecase";
import Skills from "./Skills";
import Metrics from "./Metrics";
import Socials from "./Socials";
import useResponsive from "@hooks/useResponsive";

// ── Static fallback ──────────────────────────────────────────────────────────
const STATIC = {
  bio: "I'm a passionate software developer with experience creating dynamic and responsive web applications. Specialising in full-stack development with JavaScript, React, Node.js, Flutter, and blockchain integrations.",
  vision:
    "Transforming the digital landscape by building applications that solve real problems and enhance user experiences.",
  philosophy:
    "Passionate and dedicated — focused on delivering exceptional, scalable products built to last.",
  headline: "Full-Stack Developer",
};

// ── Truncation helper ────────────────────────────────────────────────────────
const truncate = (str = "", max = 180) =>
  str.length > max ? str.slice(0, max).trimEnd() + "…" : str;

// ── Inline section label ─────────────────────────────────────────────────────
const EyeBrow = ({ children }) => (
  <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary-500 mb-3">
    {children}
  </span>
);

// ── Stat item ────────────────────────────────────────────────────────────────
const Stat = ({ value, label }) => (
  <div className="flex flex-col">
    <span className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-none">
      {value}
    </span>
    <span className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
      {label}
    </span>
  </div>
);

// ── Driving-force card ───────────────────────────────────────────────────────
const DriveCard = ({ icon: Icon, title, body, accent }) => (
  <div
    className="group relative flex flex-col gap-4 p-6 sm:p-8 rounded-2xl
                bg-white dark:bg-white/[0.03]
                border border-gray-100 dark:border-white/[0.07]
                hover:border-primary-500/40 dark:hover:border-primary-500/30
                transition-all duration-300 overflow-hidden"
  >
    {/* Subtle glow on hover */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle at 20% 80%, rgba(99,102,241,.06) 0%, transparent 70%)",
      }}
    />
    <div
      className={`relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-xl ${accent} text-white`}
    >
      <Icon size={18} />
    </div>
    <div className="relative z-10">
      <h3 className="font-display text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-[12px] sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-4">
        {body || "—"}
      </p>
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const AboutSection = () => {
  const { isDesktop } = useResponsive();
  const {
    profile,
    bio,
    vision,
    philosophy,
    history,
    mission,
    goals,
    values,
    funFacts,
    stats,
  } = useAboutSectionUsecase();
  const [expanded, setExpanded] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);

  // Parallax refs
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const featureCards = [
    {
      icon: Activity,
      title: "Why Choose Me?",
      body: vision,
      accent: "bg-primary-600",
    },
    {
      icon: Shield,
      title: "My Vision",
      body: philosophy,
      accent: "bg-accent-500",
    },
    { icon: Clock, title: "My Approach", body: bio, accent: "bg-purple-600" },
  ];

  const extraContent = [
    history && { label: "My Journey", content: history },
    mission && { label: "Mission", content: mission },
    goals?.length && { label: "Goals", content: goals.join(" · ") },
    values?.length && { label: "Core Values", content: values.join(" · ") },
    funFacts?.length && { label: "Fun Facts", content: funFacts.join(" · ") },
  ].filter(Boolean);

  const displayBio = bioExpanded ? bio : truncate(bio, 200);

  return (
    <section
      className="relative bg-white dark:bg-[#070b18] overflow-hidden"
      id="about"
    >
      {/* ── EDITORIAL HERO ─────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative min-h-[85vh] flex items-end pb-0 overflow-hidden"
      >
        {/* Background noise / grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'url("https://grainy-gradients.vercel.app/noise.svg")',
            backgroundSize: "200px",
          }}
        />
        {/* Gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white/0 to-white dark:from-[#070b18] dark:via-transparent dark:to-[#070b18]" />

        {/* Parallax image — full-bleed right side */}
        {isDesktop && (
          <motion.div
            style={{ y: imgY }}
            className="absolute right-0 top-0 h-full w-[52%] pointer-events-none select-none"
          >
            <img
              src={profile.avatar || Images.aboutImage2}
              alt=""
              className="w-full h-full object-cover object-top"
              style={{
                maskImage:
                  "linear-gradient(to left, black 40%, transparent 100%)",
              }}
            />
            {/* inner fade */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-white dark:to-[#070b18]" />
          </motion.div>
        )}

        {/* Text column */}
        <motion.div
          style={{ y: textY }}
          className="relative z-10 w-full lg:w-[55%] px-5 sm:px-8 md:px-12 lg:px-16 pt-28 pb-16 md:pt-40 md:pb-24"
        >
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem}>
              <EyeBrow>About Me</EyeBrow>
            </motion.div>

            <motion.h2
              variants={staggerItem}
              className="font-display font-black text-[clamp(2.4rem,6vw,5rem)] leading-[1.06] tracking-tight text-gray-900 dark:text-white mb-5 sm:mb-7"
            >
              {profile.tagline ? (
                profile.tagline
              ) : (
                <>
                  Building{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-accent-500 to-purple-500">
                    software
                  </span>{" "}
                  that matters.
                </>
              )}
            </motion.h2>

            <motion.div
              variants={staggerItem}
              className="mb-6 sm:mb-8 max-w-[520px]"
            >
              <p className="text-[13px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
                {displayBio}
              </p>
              {bio.length > 200 && (
                <button
                  onClick={() => setBioExpanded((e) => !e)}
                  className="mt-2 text-[11px] sm:text-xs font-semibold text-primary-500 hover:text-primary-600 transition"
                >
                  {bioExpanded ? "Show less ↑" : "Read more ↓"}
                </button>
              )}
            </motion.div>

            {/* Availability badge */}
            {profile.openToWork !== false && (
              <motion.div
                variants={staggerItem}
                className="flex items-center gap-2 mb-6 sm:mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] sm:text-xs text-green-500 font-semibold tracking-wide">
                  {profile.availabilityNote || "Open to work & collaboration"}
                </span>
              </motion.div>
            )}

            {/* CTA row */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-14"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 sm:px-7 sm:py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900
                           font-display font-bold tracking-wide text-xs sm:text-sm transition-colors
                           hover:bg-primary-700 dark:hover:bg-gray-100"
              >
                Contact Me
              </motion.a>
              <a
                href="#skills"
                className="px-5 py-2.5 sm:px-7 sm:py-3 rounded-full border border-gray-300 dark:border-white/20
                           text-gray-700 dark:text-gray-300 font-display font-bold tracking-wide text-xs sm:text-sm
                           hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Skills
              </a>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full
                           border border-gray-300 dark:border-white/20
                           text-gray-700 dark:text-gray-300 font-display font-bold tracking-wide text-xs sm:text-sm
                           hover:border-accent-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                <BookOpen size={12} />
                Full Story
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap gap-x-8 gap-y-4 pt-5 sm:pt-8 border-t border-gray-200 dark:border-white/10"
            >
              {stats.map(({ value, label }) => (
                <Stat key={label} value={value} label={label} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── DRIVING FORCES (3-col cards) ───────────────────────────────── */}
      <div className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24">
        <div className="mb-8 sm:mb-12">
          <EyeBrow>What I Bring</EyeBrow>
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight max-w-lg">
            Craft, care &amp; conviction — in every line.
          </h3>
        </div>

        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {featureCards.map(({ icon, title, body, accent }) => (
            <motion.div key={title} variants={staggerItem}>
              <DriveCard
                icon={icon}
                title={title}
                body={body}
                accent={accent}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── THIN RULE ──────────────────────────────────────────────────── */}
      <div className="mx-5 sm:mx-8 md:mx-12 lg:mx-16 border-t border-gray-100 dark:border-white/[0.06]" />

      {/* ── SEE MORE ───────────────────────────────────────────────────── */}
      {extraContent.length > 0 && (
        <div className="px-5 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-2 text-[12px] sm:text-sm font-bold text-primary-500
                       hover:text-primary-600 transition mb-8 group"
          >
            {expanded ? "Collapse" : "More about me"}
            <ChevronRight
              size={15}
              className={`transition-transform duration-300 group-hover:translate-x-0.5 ${expanded ? "rotate-90" : ""}`}
            />
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
                  {extraContent.map(({ label, content }) => (
                    <div
                      key={label}
                      className="p-5 rounded-xl bg-gray-50 dark:bg-white/[0.025]
                                 border border-gray-100 dark:border-white/[0.06]"
                    >
                      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] text-primary-500 mb-2">
                        {label}
                      </p>
                      <p className="text-[12px] sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4">
                        {content}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ── SOCIALS ────────────────────────────────────────────────────── */}
      <div className="flex justify-center px-5 py-10 sm:py-14">
        <Socials />
      </div>

      <Metrics />
      <Skills />
    </section>
  );
};

export default AboutSection;
