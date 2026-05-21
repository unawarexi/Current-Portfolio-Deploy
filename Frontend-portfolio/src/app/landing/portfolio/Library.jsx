// ============================================================================
// LIBRARY — /projects page: all projects, filter + search
// ============================================================================
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight, Search, Plus } from '@core/constants/icons';
import { Card, Badge } from '@components/ui';
import { ProjectGridSkeleton } from '@components/skeletons';
import { EmptyState } from '@components/shared';
import { VideoCard } from '@components/shared';
import { sectionBase, pill, glows, patterns, sectionDivider } from '@core/decorative';
import { staggerContainer, staggerItem } from '@core/animations/FramerAnimations';
import { useProjectsUsecase } from '@app/usecases/project-usecase';

const CATEGORIES = ['All', 'Web', 'Mobile', 'Blockchain', 'Other'];

// ─── Project card (same as PortfolioOverview) ────────────────────────────
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
      <div className="relative h-36 sm:h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {project.video ? (
          <VideoCard
            src={project.video}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (project.coverImages?.[0] || project.image) ? (
          <img src={project.coverImages?.[0] ?? project.image} alt={project.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-800/40 to-accent-800/40" />
        )}
        {project.category && (
          <span className="absolute top-3 left-3"><Badge variant="primary" size="xs">{project.category}</Badge></span>
        )}
        {project.status && (
          <span className="absolute top-3 right-3">
            <Badge variant={project.status === 'Live' ? 'success' : project.status === 'In Progress' ? 'warning' : 'default'} size="xs">
              {project.status}
            </Badge>
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <h3 className="font-display text-[12px] sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">{project.title}</h3>
        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-2 sm:mb-3 line-clamp-2">{project.description}</p>
        {project.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {project.technologies.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium">{t}</span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-400">+{project.technologies.length - 3}</span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/[0.06]">
          <span className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-xs font-semibold">
            View Case Study <ArrowRight size={12} />
          </span>
          {(project.webLiveLink || project.liveLink) && (
            <a href={project.webLiveLink ?? project.liveLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Live preview">
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </Card>
  </motion.div>
);

// ─── Page ─────────────────────────────────────────────────────────────────
const Library = () => {
  const { filtered: allFiltered, isLoading, category, setCategory, handleSelect } = useProjectsUsecase();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Map category tab to the usecase's category value
  const handleCategoryChange = (cat) => setCategory(cat === 'All' ? 'General Overview' : cat);
  const activeTab = category === 'General Overview' ? 'All' : category;

  const displayed = useMemo(() => {
    if (!query.trim()) return allFiltered;
    const q = query.toLowerCase();
    return allFiltered.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.technologies?.some((t) => t.toLowerCase().includes(q)),
    );
  }, [allFiltered, query]);

  return (
    <section className={`${sectionBase} bg-gray-50 dark:bg-[#070b18] min-h-screen`}>
      <div className="absolute inset-0 pointer-events-none opacity-20" style={patterns.dots} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: glows.dual }} />

      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-3 sm:px-6 md:px-14">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <span className={pill}>All Projects</span>
          <h1 className="font-display text-xl sm:text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-wide mt-3 sm:mt-4 mb-2">
            Project Library
          </h1>
          <div className={sectionDivider} />
          <p className="text-gray-500 dark:text-gray-400 text-[11px] sm:text-sm mt-2 sm:mt-4 max-w-lg mx-auto">
            Browse all projects — filter by category or search by name, description, or technology.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-5 sm:mb-8">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-2.5 text-[12px] sm:text-sm rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-5 sm:mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1 sm:px-5 sm:py-2 rounded-full font-display text-[10px] sm:text-xs font-semibold tracking-wide transition-all duration-200
                ${activeTab === cat
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-primary-500 border border-gray-200 dark:border-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        {!isLoading && (
          <p className="text-[10px] sm:text-xs text-gray-400 dark:text-neutral-500 text-center mb-4 sm:mb-6">
            Showing {displayed.length} project{displayed.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Grid */}
        {isLoading ? (
          <ProjectGridSkeleton count={9} />
        ) : displayed.length === 0 ? (
          <EmptyState
            variant="search"
            title="No projects match your search"
            description="Try a different keyword or clear the filters."
            size="md"
          />
        ) : (
          <motion.div
            variants={staggerContainer(0.05, 0.03)}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
          >
            {displayed.map((project, i) => (
              <ProjectCard key={project.id ?? i} project={project} onSelect={handleSelect} />
            ))}
          </motion.div>
        )}
      </div>

      {/* FAB */}
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

export default Library;
