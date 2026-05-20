// ============================================================================
// EXPERIENCE SECTION — dynamic, fetches from API, falls back to static data
// ============================================================================
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, ArrowRight } from '@core/constants/icons';
import { Card, Badge } from '@components/ui';
import { EmptyState } from '@components/shared';
import { sectionBase, sectionDivider, pill, glows, patterns } from '@core/decorative';
import { staggerContainer, staggerItem, fadeInLeft } from '@core/animations/FramerAnimations';
import { useExperienceUsecase } from '@app/usecases/experience-usecase';

// Derive unique type categories from items (preserve insertion order)
const getCategories = (items) => {
  const cats = ['All', ...new Set(items.map((i) => i.type).filter(Boolean))];
  return cats;
};

// ─── Job card ─────────────────────────────────────────────────────────────────
const JobCard = ({ job, index, onSelect }) => (
  <motion.div variants={staggerItem} className="flex gap-5 items-start">
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-600 text-white font-display font-bold text-sm flex-shrink-0">
        {index + 1}
      </div>
      <div className="flex-1 w-px bg-white/10 mt-2 min-h-[2rem]" />
    </div>
    <Card
      variant="glass"
      hoverable
      clickable
      onClick={() => onSelect(job)}
      className="flex-1 mb-6 border border-white/[0.07] bg-white/[0.03] hover:border-primary-500/30 cursor-pointer"
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-display text-base sm:text-lg font-semibold text-white tracking-wide">{job.role}</h3>
          <p className="font-mono text-xs text-primary-400 mt-0.5">{job.company}</p>
        </div>
        <div className="flex items-center gap-2">
          {job.isCurrent && <Badge variant="success" size="xs">Current</Badge>}
          <span className="flex items-center gap-1.5 text-gray-500 font-mono text-[11px]">
            <Calendar size={12} />{job.year}
          </span>
        </div>
      </div>
      <p className="font-sans text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{job.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {(job.skills || []).slice(0, 5).map((s) => (
          <Badge key={s} variant="primary" size="xs">{s}</Badge>
        ))}
        {(job.skills || []).length > 5 && (
          <span className="text-[10px] text-gray-500">+{job.skills.length - 5} more</span>
        )}
      </div>
      <div className="flex items-center gap-1 text-primary-400 text-xs font-semibold mt-2">
        View full details <ArrowRight size={12} />
      </div>
    </Card>
  </motion.div>
);

// ─── Section ─────────────────────────────────────────────────────────────────
const ExperienceSection = () => {
  const { items, isLoading, handleSelect } = useExperienceUsecase();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSub, setActiveSub]           = useState('All');

  const categories = getCategories(items);

  const filteredByType = activeCategory === 'All'
    ? items
    : items.filter((i) => i.type === activeCategory);

  const subCategories = activeSub === 'All'
    ? ['All', ...new Set(filteredByType.map((i) => i.subCategory).filter(Boolean))]
    : ['All', ...new Set(filteredByType.map((i) => i.subCategory).filter(Boolean))];

  const displayed = activeSub === 'All'
    ? filteredByType
    : filteredByType.filter((i) => i.subCategory === activeSub);

  const handleCategory = (cat) => { setActiveCategory(cat); setActiveSub('All'); };

  return (
    <section className={`${sectionBase} bg-white dark:bg-[#070b18]`} id="experience">
      <div className="absolute inset-0 pointer-events-none opacity-20" style={patterns.hatch} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: glows.topLeft }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 text-center">
          <span className={pill}>Career</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-wide mt-4 mb-2 flex items-center justify-center gap-3">
            <Briefcase size={28} className="text-primary-500" />
            Work Experience
          </h2>
          <div className={sectionDivider} />
          <p className="font-sans text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            A detailed overview of my professional experience across software development and IT.
          </p>
        </motion.div>

        {/* Category tabs */}
        {!isLoading && items.length > 0 && (
          <>
            <div className="flex flex-wrap justify-center gap-1 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`px-5 py-2 rounded-full font-display text-xs font-semibold tracking-wide transition-all duration-200
                    ${activeCategory === cat ? 'bg-primary-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-primary-500 border border-gray-200 dark:border-white/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Sub-category tabs */}
            {subCategories.length > 1 && (
              <div className="flex flex-wrap justify-center gap-1 mb-10">
                {subCategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSub(sub)}
                    className={`px-4 py-1.5 rounded-full font-display text-[11px] font-medium tracking-wide transition-all duration-200
                      ${activeSub === sub ? 'border-b-2 border-primary-500 text-primary-500' : 'text-gray-500 dark:text-gray-400 hover:text-primary-500'}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Timeline */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}--${activeSub}`}
              variants={staggerContainer(0.1, 0.05)}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10 }}
            >
              {displayed.length > 0 ? (
                displayed.map((job, i) => (
                  <JobCard key={job.id || job.company + i} job={job} index={i} onSelect={handleSelect} />
                ))
              ) : (
                <EmptyState
                  variant="search"
                  title="No experiences yet"
                  description="No experience entries have been added to this category yet."
                  size="md"
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
