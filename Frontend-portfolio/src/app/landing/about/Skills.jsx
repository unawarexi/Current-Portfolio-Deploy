// ============================================================================
// SKILLS
// md+:    Dark gallery wall — bento grid with unequal cards, no sliding
// mobile: Category carousel with prev/next
// ============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from '@core/constants/icons';
import { Badge } from '@components/ui';
import { pill } from '@core/decorative';
import skillSets from '@core/data/tech-stack';
import { staggerContainer, staggerItemBig } from '@core/animations/FramerAnimations';
import { AnimatedHeading, TiltCard } from '@core/animations/AnimatedText';
import useResponsive from '@hooks/useResponsive';

// ─── Gallery sizes: flex-based so items naturally center with justify-center ──
// Each size has explicit width × height — no CSS grid col-span needed
const SIZE_STYLES = {
  sm:      'col-span-1 row-span-1',
  feature: 'col-span-2 row-span-2',
  wide:    'col-span-2 row-span-1',
  tall:    'col-span-1 row-span-2',
};

const GALLERY = [
  { size: 'feature' }, { size: 'sm'      }, { size: 'sm'   }, { size: 'tall'  },
  { size: 'wide'    }, { size: 'sm'      }, { size: 'sm'   },
];

// ─── Gallery card (md+) ───────────────────────────────────────────────────────
const GalleryCard = ({ skill, index }) => {
  const { size } = GALLERY[index % GALLERY.length];
  const sizeStyle = SIZE_STYLES[size];
  const isFeature = size === 'feature';
  const isWide    = size === 'wide';
  const isTall    = size === 'tall';

  return (
    <motion.div
      variants={staggerItemBig}
      className={`${sizeStyle} w-full h-full group relative overflow-hidden rounded-xl
        border border-gray-200/70 dark:border-white/[0.07]
        bg-white/80 dark:bg-[#0c1427]/70
        transition-all duration-300
        hover:border-primary-400/60 dark:hover:border-primary-500/40
        hover:shadow-lg hover:shadow-primary-500/10`}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
        transition-opacity duration-500
        bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_65%)]
        dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),transparent_60%)]" />

      {/* ── Feature: big centred icon + name */}
      {isFeature && (
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2.5 p-3">
          <div className="relative flex items-center justify-center h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16">
            <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img src={skill.icon} alt={skill.name}
              className="relative z-10 h-full w-full object-contain group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-mono text-[9px] md:text-[10px] lg:text-[11px] font-semibold
            text-gray-600 dark:text-slate-300 tracking-[0.15em] text-center line-clamp-2">
            {skill.name}
          </span>
        </div>
      )}

      {/* ── Wide: icon left, name right */}
      {isWide && (
        <div className="relative z-10 flex h-full items-center gap-2.5 px-3">
          <img src={skill.icon} alt={skill.name}
            className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 flex-shrink-0 object-contain group-hover:scale-110 transition-transform duration-300" />
          <span className="font-mono text-[7px] md:text-[8px] lg:text-[10px]
            text-gray-600 dark:text-slate-300 tracking-wide truncate">
            {skill.name}
          </span>
        </div>
      )}

      {/* ── Tall: icon centred, name below */}
      {isTall && (
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2 p-2">
          <img src={skill.icon} alt={skill.name}
            className="h-8 w-8 md:h-9 md:w-9 lg:h-11 lg:w-11 object-contain group-hover:scale-110 transition-transform duration-300" />
          <span className="font-mono text-[7px] md:text-[8px] lg:text-[9px]
            text-gray-500 dark:text-slate-400 tracking-wide text-center leading-tight line-clamp-2
            group-hover:text-gray-700 dark:group-hover:text-slate-200 transition-colors">
            {skill.name}
          </span>
        </div>
      )}

      {/* ── Small: compact icon + label */}
      {!isFeature && !isWide && !isTall && (
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-1 p-1.5">
          <img src={skill.icon} alt={skill.name}
            className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 object-contain group-hover:scale-110 transition-transform duration-300" />
          <span className="font-mono text-[6px] md:text-[7px] lg:text-[7.5px]
            text-gray-400 dark:text-slate-500 tracking-wide text-center line-clamp-1
            group-hover:text-gray-700 dark:group-hover:text-slate-300 transition-colors">
            {skill.name}
          </span>
        </div>
      )}
    </motion.div>
  );
};

// ─── Mobile carousel card ─────────────────────────────────────────────────────
const CarouselCard = ({ skill }) => (
  <motion.div variants={staggerItemBig}>
    <TiltCard intensity={15}>
      <div className="group flex w-24 flex-col items-center justify-center gap-3 rounded-2xl
        border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03]
        px-4 py-5 shadow-sm transition-all duration-300
        hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/20">
        <div className="relative h-10 w-10 flex items-center justify-center">
          <div className="absolute inset-0 scale-0 rounded-full bg-primary-500/20 blur-xl
            group-hover:scale-150 transition-transform duration-500" />
          <img src={skill.icon} alt={skill.name}
            className="relative z-10 h-full w-full object-contain group-hover:scale-110 transition-transform duration-300" />
        </div>
        <Badge variant="default" size="sm" className="mt-1 text-[9px]">{skill.name}</Badge>
      </div>
    </TiltCard>
  </motion.div>
);

const Skills = () => {
  const [current, setCurrent] = useState(0);
  const { isDesktop, isTablet } = useResponsive();
  const isLarge = isDesktop || isTablet;

  // Auto-advance category every 8s on desktop (gives time to appreciate each gallery wall)
  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % skillSets.length), 6000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setCurrent((c) => (c === 0 ? skillSets.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === skillSets.length - 1 ? 0 : c + 1));

  return (
    <div className="w-full overflow-hidden" id="skills">
      <div className="page-shell py-16 md:py-24 lg:py-28">

        {/* ── Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-burgundy-500/10 text-burgundy-600 dark:text-burgundy-400 border border-burgundy-500/20">Tech Stack</span>
          <AnimatedHeading
            as="h2"
            className="editorial-title mt-6 mb-4 text-gray-900 dark:text-white"
          >
            Skills &amp; Expertise
          </AnimatedHeading>
          <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
          <p className="editorial-copy mx-auto max-w-3xl text-gray-500 dark:text-gray-400">
            Languages, frameworks and tools I use to build products that scale to millions of users.
          </p>
        </div>

        {/* ── Category tabs */}
        <div className="relative z-20 mb-8 md:mb-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          {skillSets.map((s, i) => (
            <button
              key={s.category}
              onClick={() => setCurrent(i)}
              className={`rounded-full px-4 py-2 sm:px-6 sm:py-2.5 font-display text-xs sm:text-sm font-bold tracking-wide transition-all duration-300
                ${i === current
                  ? 'bg-burgundy-600 text-white shadow-lg shadow-burgundy-600/30 scale-105'
                  : 'border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] text-gray-500 dark:text-gray-400 hover:border-burgundy-500/30 hover:text-burgundy-500 backdrop-blur-sm'}`}
            >
              {s.category}
            </button>
          ))}
        </div>

        {/* ─────────────────────────────────────────────────────────────────
             TABLET / DESKTOP — flex-wrap gallery (naturally centres items)
        ───────────────────────────────────────────────────────────────── */}
        {isLarge && (
          <div className="relative max-w-5xl mx-auto mt-8">
            <button
              onClick={prev}
              className="absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-burgundy-600/80 hover:bg-burgundy-600 text-white transition-colors duration-200 shadow-lg"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-burgundy-600/80 hover:bg-burgundy-600 text-white transition-colors duration-200 shadow-lg"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="w-full py-4 flex justify-center px-10">
                  <motion.div 
                    variants={staggerContainer(0.025, 0.01)}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-3 md:gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-[110px] md:auto-rows-[130px] grid-flow-row-dense w-full"
                  >
                    {skillSets[current].skills.map((skill, i) => (
                      <GalleryCard key={skill.name} skill={skill} index={i} />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Category label */}
            <div className="flex justify-center mt-8">
              <span className="rounded-full border border-gray-200 dark:border-white/[0.08]
                bg-gray-50 dark:bg-white/[0.04]
                px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em]
                text-gray-400 dark:text-slate-400">
                {skillSets[current].category}
              </span>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────
             MOBILE — Carousel with prev/next
        ───────────────────────────────────────────────────────────────── */}
        {!isLarge && (
          <div className="relative">
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute -left-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center
                rounded-full border border-gray-200 dark:border-white/10
                bg-white/80 dark:bg-gray-900/80 text-gray-800 dark:text-white
                hover:bg-primary-600 hover:text-white shadow-xl transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute -right-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center
                rounded-full border border-gray-200 dark:border-white/10
                bg-white/80 dark:bg-gray-900/80 text-gray-800 dark:text-white
                hover:bg-primary-600 hover:text-white shadow-xl transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.div
                  variants={staggerContainer(0.07, 0.04)}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap justify-center gap-4 px-6 py-8"
                >
                  {skillSets[current].skills.map((skill) => (
                    <CarouselCard key={skill.name} skill={skill} />
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* ── Dot indicators */}
        <div className="mt-8 md:mt-10 flex justify-center gap-3">
          {skillSets.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-500 ${
                i === current
                  ? 'h-2 w-10 bg-burgundy-500 shadow-lg shadow-burgundy-500/50'
                  : 'h-2 w-2 bg-gray-300 dark:bg-gray-700 hover:bg-burgundy-400 dark:hover:bg-burgundy-500'
              }`}
              aria-label={`Category ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Skills;
