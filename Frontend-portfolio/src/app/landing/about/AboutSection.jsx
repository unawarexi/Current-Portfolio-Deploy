// ============================================================================
// ABOUT SECTION — dynamic: fetches profile from API, falls back to static copy
// ============================================================================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Images from '@core/constants/Images';
import { sectionBase, sectionDivider, pill, glows, patterns } from '@core/decorative';
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@core/animations/FramerAnimations';
import { Card } from '@components/ui';
import { Activity, Shield, Clock, ArrowRight, ChevronRight, Pencil, BookOpen } from '@core/constants/icons';
import { EmptyState } from '@components/shared';
import { useAboutSectionUsecase } from '@app/usecases/about-usecase';
import Skills from './Skills';
import Metrics from './Metrics';
import Socials from './Socials';
import useResponsive from '@hooks/useResponsive';

// Static fallback copy (used before API returns)
const STATIC = {
  bio: "I'm a passionate software developer with experience creating dynamic and responsive web applications. Specialising in full-stack development with JavaScript, React, Node.js, Flutter, and blockchain integrations.",
  vision: 'Transforming the digital landscape by building applications that solve real problems and enhance user experiences.',
  philosophy: 'Passionate and dedicated — focused on delivering exceptional, scalable products built to last.',
  headline: 'Full-Stack Developer',
};

const FEATURE_ICONS = [Activity, Shield, Clock];

const AboutSection = () => {
  const { isDesktop } = useResponsive();
  const { profile, bio, vision, philosophy, history, mission, goals, values, funFacts, stats } = useAboutSectionUsecase();
  const [expanded, setExpanded] = useState(false);

  const featureCards = [
    { icon: Activity, title: 'Why Choose Me?',  body: bio.slice(0, 160) + (bio.length > 160 ? '…' : '') },
    { icon: Shield,   title: 'My Vision',       body: vision },
    { icon: Clock,    title: 'My Approach',     body: philosophy },
  ];

  const extraContent = [
    history    && { label: 'My Journey',     content: history },
    mission    && { label: 'Mission',        content: mission },
    goals?.length && { label: 'Goals',       content: goals.join(' · ') },
    values?.length && { label: 'Core Values',content: values.join(' · ') },
    funFacts?.length && { label: 'Fun Facts', content: funFacts.join(' · ') },
  ].filter(Boolean);

  return (
    <section className={`${sectionBase} bg-white dark:bg-[#070b18]`} id="about">
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20" style={patterns.dots} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: glows.bottomRight }} />

      <div className="relative z-10 container mx-auto px-6 md:px-10">

        {/* ── Intro row ────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-center mb-10 sm:mb-16 lg:mb-20">
          <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="flex-1">
            <span className={`${pill} mb-3 sm:mb-6`}>About Me</span>
            <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-wide mb-3 sm:mb-6">
              {profile.tagline || (
                <>Revolutionizing{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">Software Development</span></>
              )}
            </h2>
            <p className="font-sans text-gray-600 dark:text-gray-400 text-[12px] sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-8 max-w-lg">
              {bio}
            </p>
            {profile.openToWork !== false && (
              <div className="flex items-center gap-2 mb-3 sm:mb-4 text-[10px] sm:text-xs text-green-500 font-semibold">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                {profile.availabilityNote || 'Open to work & collaboration'}
              </div>
            )}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-5 sm:mb-10">
              <motion.a href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-5 py-2 sm:px-8 sm:py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-display font-semibold tracking-wide text-[11px] sm:text-sm transition-colors">
                Contact Me
              </motion.a>
              <a href="#skills"
                className="px-5 py-2 sm:px-8 sm:py-3 rounded-full border border-primary-500/40 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 font-display font-semibold tracking-wide text-[11px] sm:text-sm transition-colors">
                Skills »
              </a>
              <Link to="/about"
                className="inline-flex items-center gap-1.5 px-5 py-2 sm:px-8 sm:py-3 rounded-full border border-accent-500/40 text-accent-600 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-500/10 font-display font-semibold tracking-wide text-[11px] sm:text-sm transition-colors">
                <BookOpen size={13} /> Know More
              </Link>
              {/* <Link to="/auth/edit-about"
                className="inline-flex items-center gap-1.5 px-5 py-2 sm:px-8 sm:py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 font-display font-semibold tracking-wide text-[11px] sm:text-sm transition-colors">
                <Pencil size={12} /> Update Profile
              </Link> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-3 sm:pt-6 border-t border-gray-200 dark:border-white/10">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="font-display text-base sm:text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">{value}</span>
                  <span className="font-sans text-[9px] sm:text-xs text-gray-500 uppercase tracking-widest mt-0.5 sm:mt-1">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image column */}
          {isDesktop && (
            <motion.div variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="flex-1 flex justify-center">
              <div className="relative w-[400px]">
                <div className="absolute -inset-4 bg-primary-500/10 rounded-3xl blur-2xl" />
                <img
                  src={profile.avatar || Images.aboutImage2}
                  alt="Developer"
                  className="relative z-10 w-full rounded-2xl object-cover"
                />
              </div>
            </motion.div>
          )}
        </div>

        <div className={sectionDivider} />

        {/* ── Feature cards ────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 my-8 sm:my-16"
        >
          {featureCards.map(({ icon: Icon, title, body }, i) => (
            <motion.div key={title} variants={staggerItem} className="h-full">
              <Card variant="glass" hoverable className="h-full group p-4 sm:p-8">
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary-100 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400 mb-3 sm:mb-5">
                  <Icon size={16} />
                </div>
                <h3 className="font-display text-sm sm:text-lg font-semibold text-gray-900 dark:text-white tracking-wide mb-2 sm:mb-3">{title}</h3>
                <p className="font-sans text-[11px] sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{body || '—'}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ── See more expandable ──────────────────────────────────────── */}
        {extraContent.length > 0 && (
          <div className="mb-16">
            <button
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-2 mx-auto text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline transition mb-6"
            >
              {expanded ? 'Show less' : 'See more about me'}
              <ChevronRight size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 pb-4">
                    {extraContent.map(({ label, content }) => (
                      <div key={label} className="p-3 sm:p-6 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.07]">
                        <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary-500 mb-1 sm:mb-2">{label}</p>
                        <p className="text-[11px] sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{content}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Socials */}
        <div className="flex justify-center mb-8 sm:mb-16">
          <Socials />
        </div>
      </div>

      <Metrics />
      <Skills />
    </section>
  );
};

export default AboutSection;
