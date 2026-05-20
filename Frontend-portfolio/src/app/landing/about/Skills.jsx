// ============================================================================
// SKILLS — tech-stack carousel
// Uses: Badge (ui), Card (ui), ChevronLeft/ChevronRight (icons.js)
// ============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from '@core/constants/icons';
import { Badge } from '@components/ui';
import { pill, sectionDivider } from '@core/decorative';
import skillSets from '@core/data/tech-stack';
import { staggerContainer, staggerItem } from '@core/animations/FramerAnimations';

const Skills = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % skillSets.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  const prev = () => setCurrent((c) => (c === 0 ? skillSets.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === skillSets.length - 1 ? 0 : c + 1));

  return (
    <div className="w-full py-16 px-4 sm:px-8" id="skills">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <span className={pill}>Tech Stack</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-wide mt-4 mb-2">
          Skills &amp; Expertise
        </h2>
        <div className={sectionDivider} />
        <p className="font-sans text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Languages, frameworks, and tools I use to build products that scale.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-5xl mx-auto">
        {skillSets.map((s, i) => (
          <button
            key={s.category}
            onClick={() => setCurrent(i)}
            className={`px-4 py-1.5 rounded-full font-display text-xs font-semibold tracking-wide transition-all duration-200
              ${i === current
                ? 'bg-primary-600 text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-primary-500 border border-gray-200 dark:border-white/10'
              }`}
          >
            {s.category}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative max-w-5xl mx-auto">
        {/* Prev button */}
        <button
          onClick={prev}
          className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-10
            flex items-center justify-center w-9 h-9 rounded-full
            bg-primary-600/80 hover:bg-primary-600 text-white
            transition-colors duration-200"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-10
            flex items-center justify-center w-9 h-9 rounded-full
            bg-primary-600/80 hover:bg-primary-600 text-white
            transition-colors duration-200"
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
            <motion.div
              variants={staggerContainer(0.07, 0.05)}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-4 py-6 px-4"
            >
              {skillSets[current].skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={staggerItem}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl
                    border border-gray-200 dark:border-white/10
                    bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm
                    transition-shadow duration-200 hover:border-primary-500/40 w-20 sm:w-24"
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-8 h-8 object-contain"
                  />
                  <Badge variant="default" size="xs">
                    {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {skillSets.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-1.5 bg-primary-500'
                : 'w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600'
            }`}
            aria-label={`Category ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Skills;
