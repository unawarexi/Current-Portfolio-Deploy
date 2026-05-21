// ============================================================================
// PORTFOLIO OVERVIEW — homepage section: first 6 projects + "Show more" CTA
// ============================================================================
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight, Plus, ChevronRight } from '@core/constants/icons';
import { Card, Badge } from '@components/ui';
import { ProjectGridSkeleton } from '@components/skeletons';
import { EmptyState } from '@components/shared';
import { VideoCard } from '@components/shared';
import { sectionBase, sectionDivider, pill, glows, patterns } from '@core/decorative';
import { staggerContainer, staggerItem } from '@core/animations/FramerAnimations';
import { useProjectsUsecase } from '@app/usecases/project-usecase';

const CATEGORIES = ['General Overview', 'Web', 'Mobile', 'Blockchain'];
const PAGE_LIMIT  = 6; // cards shown in the homepage section

// ─── Project card ──────────────────────────────────────────────────────────
const ProjectCard = ({ project, onSelect }) => (
  <motion.div variants={staggerItem} className="h-full">
    <Card
      variant="elevated"
      hoverable
      clickable
      noPadding
      onClick={() => onSelect(project)}
      className="h-full flex flex-col overflow-hidden group border border-gray-200 dark:border-white/[0.07]"
    >
      {/* Thumbnail */}
      <div className="relative h-36 sm:h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {project.video ? (
          <VideoCard
            src={project.video}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (project.coverImages?.[0] || project.image) ? (
          <img
            src={project.coverImages?.[0] ?? project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-800/40 to-accent-800/40" />
        )}
        {project.category && (
          <span className="absolute top-3 left-3">
            <Badge variant="primary" size="xs">{project.category}</Badge>
          </span>
        )}
        {project.status && (
          <span className="absolute top-3 right-3">
            <Badge
              variant={project.status === 'Live' ? 'success' : project.status === 'In Progress' ? 'warning' : 'default'}
              size="xs"
            >
              {project.status}
            </Badge>
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <h3 className="font-display text-[12px] sm:text-sm font-semibold text-gray-900 dark:text-white tracking-wide mb-1 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-2 sm:mb-3 line-clamp-2">
          {project.description}
        </p>
        {/* Tech chips */}
        {project.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {project.technologies.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium">
                {t}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-400">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/[0.06]">
          <span className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-xs font-semibold">
            View Case Study <ArrowRight size={12} />
          </span>
          {(project.webLiveLink || project.liveLink) && (
            <a
              href={project.webLiveLink ?? project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-400 hover:text-primary-400 transition-colors"
              aria-label="Live preview"
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </Card>
  </motion.div>
);

// ─── Section ──────────────────────────────────────────────────────────────
const PortfolioOverview = () => {
  const { filtered, isLoading, category, setCategory, handleSelect } = useProjectsUsecase();
  const navigate = useNavigate();

  const visible = filtered.slice(0, PAGE_LIMIT);
  const hasMore = filtered.length > PAGE_LIMIT;

  return (
    <section className={`${sectionBase} bg-gray-50 dark:bg-[#070b18]`} id="portfolio">
      <div className="absolute inset-0 pointer-events-none opacity-20" style={patterns.dots} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: glows.bottomRight }} />

      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-3 sm:px-6 md:px-14">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <span className={pill}>Portfolio</span>
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-wide mt-3 sm:mt-4 mb-2">
            Featured Projects
          </h2>
          <div className={sectionDivider} />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-5 sm:mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 sm:px-5 sm:py-2 rounded-full font-display text-[10px] sm:text-xs font-semibold tracking-wide transition-all duration-200
                ${category === cat
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-primary-500 border border-gray-200 dark:border-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <ProjectGridSkeleton count={PAGE_LIMIT} />
        ) : visible.length === 0 ? (
          <EmptyState
            variant="search"
            title="No projects found"
            description="No projects in this category yet. Check back soon."
            size="md"
          />
        ) : (
          <motion.div
            variants={staggerContainer(0.07, 0.04)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
          >
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id ?? project.title ?? i}
                project={project}
                onSelect={handleSelect}
              />
            ))}
          </motion.div>
        )}

        {/* Show more */}
        {!isLoading && hasMore && (
          <div className="text-center mt-6 sm:mt-12">
            <button
              onClick={() => navigate('/projects')}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-5 py-2 sm:px-7 sm:py-3 rounded-full border border-primary-500/40 text-primary-600 dark:text-primary-400 text-[11px] sm:text-sm font-semibold hover:bg-primary-500 hover:text-white transition-all duration-200"
            >
              Show more projects <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* FAB — admin only */}
      <button
        onClick={() => navigate('/auth/new')}
        className="fixed bottom-[10%] lg:right-20 right-4 z-50 flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg transition-colors"
        aria-label="Add new project"
      >
        <Plus size={18} />
      </button>
    </section>
  );
};

export default PortfolioOverview;
