// ============================================================================
// ABOUT DETAIL — extended personal story with big editorial typography
// ============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from '@core/constants/icons';
import { Link } from 'react-router-dom';
import { useAboutSectionUsecase } from '@app/usecases/about-usecase';
import { AnimatedHeading } from '@core/animations/AnimatedText';
import LazyScene3D from '@core/animations/LazyScene3D';
import { glows } from '@core/decorative';
import { textReveal, staggerContainer, staggerItemBig } from '@core/animations/FramerAnimations';

const SectionHeading = ({ children, align = 'left' }) => (
  <AnimatedHeading
    as="h2"
    className={`font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8 md:mb-12 ${
      align === 'center' ? 'text-center' : ''
    }`}
  >
    {children}
  </AnimatedHeading>
);

const BlockCard = ({ title, content }) => (
  <motion.div variants={staggerItemBig}
    className="group grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-10
      p-6 md:p-8 rounded-[2rem]
      bg-gray-50 dark:bg-white/[0.02]
      border border-gray-200 dark:border-white/[0.05]
      hover:border-primary-500/30 transition-all duration-500">
    <div className="flex-shrink-0">
      <h3 className="font-display text-xl md:text-2xl font-bold text-gray-900 dark:text-white
        group-hover:text-primary-500 transition-colors leading-tight">
        {title}
      </h3>
    </div>
    <div className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-[1.75] space-y-4">
      {content.split('\n').filter(Boolean).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  </motion.div>
);

const GridList = ({ title, items }) => (
  <motion.div variants={staggerItemBig} className="mb-10 md:mb-16">
    <h3 className="font-display text-lg md:text-xl font-bold text-primary-500 uppercase tracking-widest mb-6 md:mb-8">{title}</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
      {items.map((item, i) => (
        <div key={i} className="p-4 md:p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          <p className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200">{item}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

const AboutDetail = () => {
  const { history, mission, goals, values, funFacts, bio, stats } = useAboutSectionUsecase();

  return (
    <div className="bg-white dark:bg-[#070b18] min-h-screen relative overflow-hidden">
      <LazyScene3D variant="minimal" className="opacity-30 fixed" />
      {/* ── Dark hero band — full bleed ───────────────────────────────── */}
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        animate="visible"
        className="relative z-10 bg-gray-950 overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24"
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: glows.dual }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-20">

          {/* Back */}
          <Link
            to="/#about"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white
              text-sm md:text-base font-bold mb-12 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Home
          </Link>

          {/* Badge */}
          <motion.div variants={textReveal} className="mb-4 md:mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
              bg-primary-500/10 border border-primary-500/20
              text-xs font-bold uppercase tracking-[0.25em] text-primary-400">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
              The Story
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={staggerItemBig}
            className="font-display text-[clamp(3rem,7vw,6.5rem)] font-extrabold
              tracking-tight leading-[0.95] text-white mb-6 md:mb-8"
          >
            Behind<br />the Code.
          </motion.h1>

          {/* Bio */}
          <motion.p
            variants={staggerItemBig}
            className="text-base md:text-xl text-white/60 leading-relaxed max-w-[640px] mb-10 md:mb-14"
          >
            {bio || "Passionate software developer building intuitive, scalable digital products."}
          </motion.p>

          {/* Stats */}
          <motion.div variants={staggerItemBig} className="flex flex-wrap gap-8 md:gap-12 pt-8 border-t border-white/10">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="font-display text-3xl md:text-4xl font-extrabold text-white">{value}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Body content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 page-shell py-16 md:py-24">
        {/* Main Content Sections */}
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8 md:space-y-12"
        >
          {history && <BlockCard title="My Journey" content={history} />}
          {mission && <BlockCard title="Mission & Vision" content={mission} />}

          {(goals?.length > 0 || values?.length > 0 || funFacts?.length > 0) && (
            <div className="pt-10 md:pt-16 border-t border-gray-200 dark:border-white/10">
              <SectionHeading align="center">Core Philosophy</SectionHeading>
              <div className="mt-10 md:mt-14">
                {values?.length > 0 && <GridList title="Core Values" items={values} />}
                {goals?.length > 0 && <GridList title="Goals" items={goals} />}
                {funFacts?.length > 0 && <GridList title="Beyond the Screen" items={funFacts} />}
              </div>
            </div>
          )}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32 text-center"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Let's write the next chapter.</h2>
          <Link
            to="/#contact"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-bold text-lg md:text-xl shadow-xl shadow-primary-600/30 hover:scale-105 transition-all duration-300"
          >
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutDetail;
