// ============================================================================
// ABOUT DETAIL — full blog-style "About Me" page
// All sections map directly to the about schema fields from the backend.
// ============================================================================
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAboutSectionUsecase } from '@app/usecases/about-usecase';
import Images from '@core/constants/Images';
import { glows, patterns, sectionBase } from '@core/decorative';
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@core/animations/FramerAnimations';
import {
  ArrowLeft, Activity, Shield, Clock, Calendar, Download,
  BookOpen, Briefcase, Check, Pencil, ExternalLink,
} from '@core/constants/icons';
import { Badge } from '@components/ui';

// ─── Small sub-components ─────────────────────────────────────────────────

const SectionHeading = ({ label, title }) => (
  <div className="mb-8">
    <span className="text-xs font-bold uppercase tracking-widest text-primary-500">{label}</span>
    {title && (
      <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1">{title}</h2>
    )}
    <div className="h-0.5 w-12 bg-primary-500 mt-3" />
  </div>
);

const BlockCard = ({ children, className = '' }) => (
  <div className={`p-5 sm:p-7 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-white/[0.07] shadow-sm ${className}`}>
    {children}
  </div>
);

const TagPill = ({ label }) => (
  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
    {label}
  </span>
);

// ─── Main component ────────────────────────────────────────────────────────
const AboutDetail = () => {
  const {
    profile: p,
    bio, history, vision, mission, philosophy,
    currentFocus, goals, values, funFacts, hobbies,
    education, certifications, languages,
  } = useAboutSectionUsecase();

  const name         = p.name         || 'Andrew Corps';
  const headline     = p.headline     || 'Full-Stack Developer';
  const tagline      = p.tagline      || '';

  const LEVEL_COLOR = {
    Native:        'bg-green-500',
    Fluent:        'bg-blue-500',
    Intermediate:  'bg-yellow-500',
    Beginner:      'bg-gray-400',
  };
  const LEVEL_WIDTH = {
    Native:       'w-full',
    Fluent:       'w-4/5',
    Intermediate: 'w-3/5',
    Beginner:     'w-2/5',
  };

  return (
    <div className="bg-white dark:bg-[#070b18] text-gray-800 dark:text-gray-200 min-h-screen overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className="relative bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: glows.dual }} />
        <div className="absolute inset-0 pointer-events-none opacity-10" style={patterns.circuit} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-10 transition"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>

          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Avatar */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              animate="visible"
              className="flex-shrink-0"
            >
              <div className="relative w-36 h-36 md:w-48 md:h-48">
                <div className="absolute -inset-3 bg-primary-500/20 rounded-full blur-xl" />
                <img
                  src={p.avatar || Images.aboutImage2}
                  alt={name}
                  className="relative z-10 w-full h-full object-cover rounded-full ring-4 ring-primary-500/30"
                />
              </div>
            </motion.div>

            {/* Identity */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
              className="text-center md:text-left"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-2 block">About Me</span>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">{name}</h1>
              <p className="text-lg text-primary-300 font-medium mb-3">{headline}</p>
              {tagline && <p className="text-white/60 text-sm max-w-xl leading-relaxed mb-5">{tagline}</p>}
              {p.openToWork !== false && (
                <div className="inline-flex items-center gap-2 text-xs text-green-400 font-semibold mb-5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  {p.availabilityNote || 'Open to work & collaboration'}
                </div>
              )}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {p.cvUrl && (
                  <a
                    href={p.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition"
                  >
                    <Download size={14} /> Download CV
                  </a>
                )}
                <Link
                  to="/auth/edit-about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm font-semibold transition"
                >
                  <Pencil size={13} /> Update Profile
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 space-y-20">

        {/* Bio */}
        <section>
          <SectionHeading label="Who I Am" title="My Story" />
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg max-w-3xl">{bio}</p>
        </section>

        {/* History */}
        {history && (
          <section>
            <SectionHeading label="Background" title="My Journey" />
            <BlockCard>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{history}</p>
            </BlockCard>
          </section>
        )}

        {/* Vision / Mission / Philosophy */}
        {(vision || mission || philosophy) && (
          <section>
            <SectionHeading label="Driving Forces" title="Vision, Mission & Philosophy" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {vision && (
                <BlockCard>
                  <Activity size={20} className="text-primary-500 mb-3" />
                  <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-2">Vision</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{vision}</p>
                </BlockCard>
              )}
              {mission && (
                <BlockCard>
                  <Shield size={20} className="text-accent-500 mb-3" />
                  <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-2">Mission</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{mission}</p>
                </BlockCard>
              )}
              {philosophy && (
                <BlockCard>
                  <Clock size={20} className="text-purple-500 mb-3" />
                  <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-2">Philosophy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{philosophy}</p>
                </BlockCard>
              )}
            </div>
          </section>
        )}

        {/* Current Focus */}
        {currentFocus && (
          <section>
            <SectionHeading label="Right Now" title="Current Focus" />
            <BlockCard className="border-l-4 border-l-primary-500">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{currentFocus}</p>
            </BlockCard>
          </section>
        )}

        {/* Goals */}
        {goals.length > 0 && (
          <section>
            <SectionHeading label="Ambitions" title="Goals" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goals.map((goal, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06]">
                  <Check size={14} className="flex-shrink-0 mt-1 text-primary-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{goal}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Values */}
        {values.length > 0 && (
          <section>
            <SectionHeading label="What I Stand For" title="Core Values" />
            <div className="flex flex-wrap gap-2">
              {values.map((v) => <TagPill key={v} label={v} />)}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <SectionHeading label="Academic Background" title="Education" />
            <div className="space-y-4">
              {education.map((edu, i) => (
                <BlockCard key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{edu.degree}</p>
                    <p className="text-sm text-gray-500 dark:text-neutral-400">{edu.institution}</p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1"><Calendar size={11} />{edu.year}</p>
                  </div>
                </BlockCard>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <SectionHeading label="Credentials" title="Certifications" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <BlockCard key={i}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">{cert.name}</p>
                      <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">{cert.issuer} · {cert.year}</p>
                    </div>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-primary-500 hover:text-primary-400 transition">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </BlockCard>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section>
            <SectionHeading label="Communication" title="Languages" />
            <div className="space-y-4 max-w-md">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">{lang.name}</span>
                    <span className="text-xs text-gray-500 dark:text-neutral-400">{lang.level}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${LEVEL_COLOR[lang.level] ?? 'bg-primary-500'} ${LEVEL_WIDTH[lang.level] ?? 'w-3/4'} transition-all duration-700`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Fun Facts */}
        {funFacts.length > 0 && (
          <section>
            <SectionHeading label="Random" title="Fun Facts" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {funFacts.map((fact, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-primary-50 dark:bg-primary-500/5 border border-primary-100 dark:border-primary-500/10">
                  <span className="text-lg leading-none">🎉</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{fact}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hobbies */}
        {hobbies.length > 0 && (
          <section>
            <SectionHeading label="Beyond Code" title="Hobbies & Interests" />
            <div className="flex flex-wrap gap-2">
              {hobbies.map((h) => <TagPill key={h} label={h} />)}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="pt-8 border-t border-gray-100 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-neutral-400 hover:text-primary-500 transition font-medium"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/#contact"
              className="px-5 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
            >
              Get In Touch
            </Link>
            <Link
              to="/auth/edit-about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition"
            >
              <Pencil size={13} /> Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDetail;
