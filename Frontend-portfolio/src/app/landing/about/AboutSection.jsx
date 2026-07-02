// ============================================================================
// ABOUT SECTION — editorial parallax redesign (Apple/Google-dev aesthetic)
// BIG, BOLD, MODERN — massive typography, generous spacing, 3D depth
// ============================================================================
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { pill, glows, patterns } from "@core/decorative";
import {
  staggerContainer,
  staggerItem,
  staggerItemBig,
} from "@core/animations/FramerAnimations";
import {
  AnimatedHeading,
  CountUp,
  TiltCard,
} from "@core/animations/AnimatedText";
import LazyScene3D from "@core/animations/LazyScene3D";
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
const truncate = (str = "", max = 220) =>
  str.length > max ? str.slice(0, max).trimEnd() + "…" : str;

// ── Inline section label ─────────────────────────────────────────────────────
const EyeBrow = ({ children }) => (
  <span className="inline-block text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-primary-500 mb-4 md:mb-6">
    {children}
  </span>
);

// ── Stat item — now with CountUp ─────────────────────────────────────────────
const Stat = ({ value, label }) => (
  <div className="flex flex-col">
    <span className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-none">
      <CountUp end={value} suffix={value.toString().includes("+") ? "+" : ""} />
    </span>
    <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
      {label}
    </span>
  </div>
);

// ── Driving-force card — with 3D tilt ────────────────────────────────────────
const DriveCard = ({ icon: Icon, title, body, accent }) => (
  <TiltCard className="h-full" intensity={6}>
    <div
      className="group relative flex flex-col gap-3 sm:gap-5 p-5 sm:p-9 md:p-10 rounded-md sm:rounded-2xl
                  bg-white dark:bg-white/[0.03]
                  border border-gray-100 dark:border-white/[0.07]
                  hover:border-primary-500/40 dark:hover:border-primary-500/30
                  transition-all duration-300 overflow-hidden h-full"
    >
      {/* Subtle glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 20% 80%, rgba(99,102,241,.08) 0%, transparent 70%)",
        }}
      />
      <div
        className={`relative z-10 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl ${accent} text-white`}
      >
        <Icon size={22} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
      </div>
      <div className="relative z-10">
        <h3 className="font-display text-base sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-[10px] sm:text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-4">
          {body || "—"}
        </p>
      </div>
    </div>
  </TiltCard>
);

// ── Main component ────────────────────────────────────────────────────────────
const AboutSection = () => {
  const apiData = useAboutSectionUsecase() || {};
  const profile = apiData.profile || {
    name: "Andrew C.",
    tagline: STATIC.headline,
    openToWork: true,
    availabilityNote: "Open to work & collaboration",
    avatar:
      "https://res.cloudinary.com/dkt3rfpgz/image/upload/v1783032145/file_00000000561c71f493904f7d48d37e1d_rurv2c.png",
  };
  const bio = apiData.bio || STATIC.bio;
  const vision = apiData.vision || STATIC.vision;
  const philosophy = apiData.philosophy || STATIC.philosophy;
  const history = apiData.history;
  const mission = apiData.mission;
  const goals = apiData.goals;
  const values = apiData.values;
  const funFacts = apiData.funFacts;
  const stats =
    apiData.stats && apiData.stats.length > 0
      ? apiData.stats
      : [
          { value: 4, label: "Years Exp." },
          { value: 50, label: "Projects" },
          { value: 20, label: "Clients" },
        ];
  const [expanded, setExpanded] = useState(false);

  // Parallax refs
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

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

  return (
    <section
      className="relative bg-white dark:bg-[#070b18] overflow-hidden"
      id="about"
    >
      {/* ── 3D BACKGROUND inside hero only (see heroRef div) ── */}

      {/* ── EDITORIAL HERO ─────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative min-h-[90vh] lg:min-h-screen flex flex-col lg:flex-row items-center w-full px-[5%] lg:px-[10%] pt-32 pb-20 md:pt-44 md:pb-28 gap-10 lg:gap-12 overflow-hidden"
      >
        {/* 3D scene — scoped to hero viewport only */}
        <LazyScene3D variant="default" />

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

        {/* Text column — left-aligned */}
        <motion.div
          style={{ y: textY, willChange: "transform" }}
          className="relative z-10 w-full lg:w-[48%]"
        >
          <motion.div
            variants={staggerContainer(0.14, 0.12)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem}>
              <EyeBrow>About Me</EyeBrow>
            </motion.div>

            <motion.div variants={staggerItemBig}>
              <AnimatedHeading
                as="h2"
                className="editorial-title font-display font-extrabold text-gray-900 dark:text-white mb-6 sm:mb-8"
              >
                {profile.tagline
                  ? profile.tagline
                  : "Building software that matters."}
              </AnimatedHeading>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mb-8 sm:mb-10 max-w-[580px]"
            >
              <p className="editorial-copy text-gray-600 dark:text-gray-400 max-w-2xl">
                {truncate(bio, 220)}
              </p>
              <Link
                to="/about"
                className="mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary-500 hover:text-primary-600 transition"
              >
                Read more <ArrowRight size={12} />
              </Link>
            </motion.div>

            {/* Availability badge */}
            {profile.openToWork !== false && (
              <motion.div
                variants={staggerItem}
                className="flex items-center gap-2.5 mb-8 sm:mb-10"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs sm:text-sm text-green-500 font-semibold tracking-wide">
                  {profile.availabilityNote || "Open to work & collaboration"}
                </span>
              </motion.div>
            )}

            {/* CTA row */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-16"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900
                           font-display font-bold tracking-wide text-sm sm:text-base transition-colors
                           hover:bg-primary-700 dark:hover:bg-gray-100"
              >
                Contact Me
              </motion.a>
              <a
                href="#skills"
                className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full border border-gray-300 dark:border-white/20
                           text-gray-700 dark:text-gray-300 font-display font-bold tracking-wide text-sm sm:text-base
                           hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Skills
              </a>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full
                           border border-gray-300 dark:border-white/20
                           text-gray-700 dark:text-gray-300 font-display font-bold tracking-wide text-sm sm:text-base
                           hover:border-accent-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                <BookOpen size={14} />
                Full Story
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-4 sm:gap-y-5 pt-6 sm:pt-10 border-t border-gray-200 dark:border-white/10"
            >
              {stats.map(({ value, label }) => (
                <Stat key={label} value={value} label={label} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bento Grid — right-aligned */}
        <motion.div
          style={{ y: imgY, willChange: "transform" }}
          className="relative z-10 w-full lg:w-[48%] h-[500px] sm:h-[600px] lg:h-[700px] mt-10 lg:mt-0"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-3 sm:gap-4 h-full w-full">
            {/* Card 1: Vertical (Left) */}
            <div className="col-span-1 row-span-2 rounded-md md:rounded-[2rem] overflow-hidden relative group shadow-2xl dark:shadow-black/50">
              <img
                src={
                  profile.avatar ||
                  "https://res.cloudinary.com/dkt3rfpgz/image/upload/v1783032145/file_00000000561c71f493904f7d48d37e1d_rurv2c.png"
                }
                alt="Profile"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-white font-display font-bold text-md sm:text-xl md:text-2xl mb-1">
                  {profile.name || "Andrew C."}
                </h4>
                <p className="text-white/80 font-mono text-[10px] sm:text-xs uppercase tracking-wider">
                  {profile.tagline?.split(" ")[0] || "Product Engineer"}
                </p>
              </div>
            </div>

            {/* Card 2: Top Horizontal (Right top) */}
            <div className="col-span-1 md:col-span-2 row-span-1 rounded-md md:rounded-[2rem] overflow-hidden relative bg-gradient-to-br from-burgundy-600 to-burgundy-900 px-3 md:px-0 md:p-6 sm:p-8 flex flex-col justify-center group shadow-2xl dark:shadow-black/50">
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay"
                style={patterns.circuit}
              />
              <div className="relative z-10">
                <h4 className="text-white font-display font-bold text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3">
                  Global Impact
                </h4>
                <p className="text-white/80 text-xs sm:text-sm max-w-[280px] leading-relaxed">
                  Working with clients worldwide to build scalable, beautiful,
                  and robust software solutions.
                </p>
              </div>
            </div>

            {/* Card 3: Bottom Vertical 1 (Right bottom left) */}
            <div className="col-span-1 row-span-1 rounded-md md:rounded-[2rem] overflow-hidden relative bg-gray-900 border border-white/10 p-5 sm:p-6 flex flex-col justify-between group shadow-2xl dark:shadow-black/50">
              <div className="text-burgundy-400 group-hover:scale-110 transition-transform duration-300 origin-left">
                <Shield size={28} className="sm:w-8 sm:h-8" />
              </div>
              <div>
                <h4 className="text-white font-display font-bold text-base sm:text-lg md:text-xl mb-1">
                  Architecture
                </h4>
                <p className="text-gray-400 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">
                  Systems designed to scale.
                </p>
              </div>
            </div>

            {/* Card 4: Bottom Vertical 2 (Right bottom right) */}
            <div className="col-span-1 row-span-1 rounded-md md:rounded-[2rem] overflow-hidden relative bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/10 p-5 sm:p-6 flex flex-col justify-between group shadow-2xl dark:shadow-black/50">
              <div className="text-accent-500 group-hover:scale-110 transition-transform duration-300 origin-left">
                <Activity size={28} className="sm:w-8 sm:h-8" />
              </div>
              <div>
                <h4 className="text-gray-900 dark:text-white font-display font-bold text-base sm:text-lg md:text-xl mb-1">
                  Performance
                </h4>
                <p className="text-gray-600 dark:text-gray-400 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">
                  Lightning fast delivery.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── DRIVING FORCES (3-col cards) ───────────────────────────────── */}
      <div className="w-full px-[5%] lg:px-[10%] relative z-10 py-20 sm:py-32">
        <div className="mb-10 sm:mb-16">
          <EyeBrow>What I Bring</EyeBrow>
          <AnimatedHeading
            as="h3"
            className="font-display text-[clamp(1.8rem,4vw,4.5rem)] font-extrabold text-burgundy-900 dark:text-burgundy-400 tracking-tight max-w-3xl"
          >
            Craft, care &amp; conviction — in every line.
          </AnimatedHeading>
        </div>

        <motion.div
          variants={staggerContainer(0.14, 0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {featureCards.map(({ icon, title, body, accent }, idx) => (
            <motion.div
              key={title}
              variants={staggerItemBig}
              className={
                featureCards.length % 2 !== 0 && idx === featureCards.length - 1
                  ? "col-span-2 md:col-span-1"
                  : ""
              }
            >
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
      <div className="w-full px-[5%] lg:px-[10%] border-t border-gray-100 dark:border-white/[0.06]" />

      {/* ── SEE MORE ───────────────────────────────────────────────────── */}
      {extraContent.length > 0 && (
        <div className="w-full px-[5%] lg:px-[10%] py-16 sm:py-20">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-primary-500
                       hover:text-primary-600 transition mb-10 group"
          >
            {expanded ? "Collapse" : "More about me"}
            <ChevronRight
              size={16}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-4">
                  {extraContent.map(({ label, content }) => (
                    <div
                      key={label}
                      className="glass-panel rounded-md md:rounded-[1.75rem] p-6 md:p-8"
                    >
                      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary-500 mb-3">
                        {label}
                      </p>
                      <p className="text-[10px] sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4">
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
      <div className="w-full px-[5%] lg:px-[10%] flex justify-center py-12 sm:py-16">
        <Socials />
      </div>

      <Metrics />
      <Skills />
    </section>
  );
};

export default AboutSection;
