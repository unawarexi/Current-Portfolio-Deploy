// ============================================================================
// SINGLE EXPERIENCE — detailed blog-style experience page
// ============================================================================
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSingleExperienceUsecase } from '@app/usecases/experience-usecase';
import { ArrowLeft, Briefcase, Calendar, Check, Activity, Pencil } from '@core/constants/icons';
import { Badge } from '@components/ui';
import { cn } from '@utils/cn';
import { glows } from '@core/decorative';

const Section = ({ title, children }) => (
  <div className="py-8 border-b border-gray-100 dark:border-white/[0.06]">
    <h3 className="text-sm font-bold uppercase tracking-widest text-primary-500 mb-4">{title}</h3>
    {children}
  </div>
);

const ListBullet = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <Check size={14} className="flex-shrink-0 mt-1 text-primary-500" />
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
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading experience…</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#070b18]">
        <div className="text-center px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Not Found</h2>
          <Link to="/#experience" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-semibold">
            <ArrowLeft size={14} /> Back to Experience
          </Link>
        </div>
      </div>
    );
  }

  const achievements  = item.achievements  || [];
  const productsBuilt = item.productsBuilt || [];
  const skills        = item.skills        || [];

  return (
    <div className="bg-white dark:bg-[#070b18] text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Hero band */}
      <div className="relative bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: glows.dual }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <Link
            to="/#experience"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition"
          >
            <ArrowLeft size={14} /> All Experiences
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {item.type     && <Badge variant="primary" size="sm">{item.type}</Badge>}
            {item.subCategory && <Badge variant="outline" size="sm">{item.subCategory}</Badge>}
            {item.isCurrent && <Badge variant="success" size="sm">Current</Badge>}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight mb-3"
          >
            {item.role}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm mt-4">
            <span className="flex items-center gap-1.5"><Briefcase size={14} />{item.company}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} />{item.year}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-10">

        {/* Overview */}
        <Section title="Overview">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base max-w-3xl">
            {item.description}
          </p>
        </Section>

        {/* Impact */}
        {item.impact && (
          <Section title="Impact & Contribution">
            <div className="p-6 rounded-2xl bg-primary-50 dark:bg-primary-500/5 border border-primary-100 dark:border-primary-500/10">
              <Activity size={18} className="text-primary-500 mb-3" />
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{item.impact}</p>
            </div>
          </Section>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <Section title="Achievements">
            <ListBullet items={achievements} />
          </Section>
        )}

        {/* Products Built */}
        {productsBuilt.length > 0 && (
          <Section title="Products Built">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {productsBuilt.map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06]">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{p}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Section title="Skills Used">
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">{s}</span>
              ))}
            </div>
          </Section>
        )}

        {/* CTA */}
        <div className="py-12 flex items-center justify-between flex-wrap gap-4">
          <Link
            to="/#experience"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 transition font-medium"
          >
            <ArrowLeft size={14} /> Back to Experience
          </Link>
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
          >
            <Pencil size={13} /> Update Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleExperience;
