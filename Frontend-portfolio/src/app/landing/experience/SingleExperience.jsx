// ============================================================================
// SINGLE EXPERIENCE — detailed blog-style experience page with big text
// ============================================================================
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSingleExperienceUsecase } from '@app/usecases/experience-usecase';
import { ArrowLeft, Briefcase, Calendar, Check, Activity, Pencil } from '@core/constants/icons';
import { Badge } from '@components/ui';
import { glows } from '@core/decorative';
import LazyScene3D from '@core/animations/LazyScene3D';
import { staggerContainer, staggerItemBig } from '@core/animations/FramerAnimations';

const Section = ({ title, children }) => (
  <motion.div variants={staggerItemBig} className="py-8 sm:py-12 md:py-16 border-b border-gray-200 dark:border-white/[0.06] last:border-0">
    <h3 className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.2em] text-primary-500 mb-4 sm:mb-6 md:mb-8">{title}</h3>
    {children}
  </motion.div>
);

const ListBullet = ({ items }) => (
  <ul className="space-y-3 sm:space-y-4 md:space-y-6">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 sm:gap-4 md:gap-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-[1.8]">
        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-primary-500/10 flex items-center justify-center mt-0.5 sm:mt-1">
          <Check size={16} className="text-primary-500" />
        </div>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const SingleExperience = () => {
  const { item, isLoading, handleEdit } = useSingleExperienceUsecase();

  if (isLoading && !item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#070b18]">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#070b18]">
        <div className="text-center px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Experience Not Found</h2>
          <Link to="/#experience" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-600 text-white text-base font-bold hover:scale-105 transition-transform">
            <ArrowLeft size={18} /> Back to Experience
          </Link>
        </div>
      </div>
    );
  }

  const achievements  = item.achievements  || [];
  const productsBuilt = item.productsBuilt || [];
  const skills        = item.skills        || [];

  return (
    <div className="bg-white dark:bg-[#070b18] min-h-screen relative overflow-hidden">
      <LazyScene3D variant="minimal" className="opacity-20 fixed" />
      
      {/* Hero band */}
      <div className="relative bg-gray-950 overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 pointer-events-none hidden dark:block opacity-40" style={{ background: 'radial-gradient(circle at 30% 70%, rgba(159,37,65,0.25) 0%, transparent 50%)' }} />
        <div className="absolute inset-0 pointer-events-none dark:opacity-30" style={{ background: glows.dual }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-10 lg:px-20">
          <Link
            to="/#experience"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm md:text-base font-bold mb-12 transition-colors"
          >
            <ArrowLeft size={18} /> All Experiences
          </Link>

          <div className="flex flex-wrap gap-3 mb-6">
            {item.type && <Badge variant="primary" size="md" className="px-4 py-1.5">{item.type}</Badge>}
            {item.subCategory && <Badge variant="outline" size="md" className="px-4 py-1.5 border-white/20 text-white">{item.subCategory}</Badge>}
            {item.isCurrent && <Badge variant="success" size="md" className="px-4 py-1.5 bg-green-500/20 text-green-400 border-green-500/30">Current</Badge>}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="font-display text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 sm:mb-8"
          >
            {item.role}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-10 text-white/60 text-sm sm:text-base md:text-xl font-medium">
            <span className="flex items-center gap-2"><Briefcase size={20} className="text-primary-400" />{item.company}</span>
            <span className="flex items-center gap-2"><Calendar size={20} className="text-primary-400" />{item.year}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-10 lg:px-20 py-10 sm:py-16 md:py-24"
      >
        <Section title="Overview">
          <p className="text-gray-600 dark:text-gray-300 leading-[1.8] text-base sm:text-lg md:text-xl lg:text-2xl font-light">
            {item.description}
          </p>
        </Section>

        {item.impact && (
          <Section title="Impact & Contribution">
            <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-[2rem] bg-primary-50 dark:bg-primary-500/5 border border-primary-100 dark:border-primary-500/10">
              <Activity size={32} className="text-primary-500 mb-6" />
              <p className="text-base md:text-xl text-gray-800 dark:text-gray-200 leading-[1.8] font-medium whitespace-pre-line">
                {item.impact}
              </p>
            </div>
          </Section>
        )}

        {achievements.length > 0 && (
          <Section title="Key Achievements">
            <ListBullet items={achievements} />
          </Section>
        )}

        {productsBuilt.length > 0 && (
          <Section title="Products Built">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {productsBuilt.map((p, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] hover:-translate-y-1 transition-transform">
                  <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-burgundy-500/10 text-burgundy-600 dark:text-burgundy-400 font-display text-sm sm:text-lg font-bold flex items-center justify-center">0{i + 1}</span>
                  <span className="text-sm sm:text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">{p}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {skills.length > 0 && (
          <Section title="Technologies Used">
            <div className="flex flex-wrap gap-3 md:gap-4">
              {skills.map((s) => (
                <span key={s} className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {s}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* CTA */}
        <div className="pt-16 sm:pt-24 md:pt-32 pb-8 sm:pb-12 flex items-center justify-between flex-wrap gap-4 sm:gap-6">
          <Link
            to="/#experience"
            className="flex items-center gap-2 text-base md:text-lg text-gray-500 hover:text-primary-500 transition font-bold"
          >
            <ArrowLeft size={18} /> Back to All Experiences
          </Link>
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-2 sm:gap-3 px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm sm:text-base font-bold hover:scale-105 transition-transform"
          >
            <Pencil size={18} /> Update Experience
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SingleExperience;
