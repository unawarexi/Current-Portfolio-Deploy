// ============================================================================
// LIBRARY — /projects page: big 3-col grid, huge typography
// ============================================================================
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight, Search, Plus } from '@core/constants/icons';
import { Badge } from '@components/ui';
import { ProjectGridSkeleton } from '@components/skeletons';
import { EmptyState, VideoCard } from '@components/shared';
import { sectionBase, pill, glows, patterns, sectionDivider } from '@core/decorative';
import { staggerContainer, staggerItemBig } from '@core/animations/FramerAnimations';
import { AnimatedHeading, TiltCard } from '@core/animations/AnimatedText';
import Scene3D from '@core/animations/Scene3D';
import { useProjectsUsecase } from '@app/usecases/project-usecase';

const CATEGORIES = ['All', 'Web', 'Mobile', 'Blockchain', 'Other'];

// ─── Project card (matching PortfolioOverview) ───────────────────────────
const ProjectCard = ({ project, onSelect }) => (
  <motion.div variants={staggerItemBig} className="h-full">
    <TiltCard intensity={5} className="h-full">
      <div
        onClick={() => onSelect(project)}
        className="h-full flex flex-col overflow-hidden group border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] backdrop-blur-sm rounded-3xl cursor-pointer hover:border-primary-500/40 transition-colors duration-300"
      >
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100 dark:bg-gray-900/50">
          {project.video ? (
            <VideoCard
              src={project.video}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            />
          ) : (project.coverImages?.[0] || project.image) ? (
            <img src={project.coverImages?.[0] ?? project.image} alt={project.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-800/40 to-accent-800/40" />
          )}
          {project.category && (
            <span className="absolute top-4 left-4"><Badge variant="primary" size="sm" className="backdrop-blur-md bg-primary-500/80 shadow-lg border-none text-white">{project.category}</Badge></span>
          )}
          {project.status && (
            <span className="absolute top-4 right-4">
              <Badge variant={project.status === 'Live' ? 'success' : project.status === 'In Progress' ? 'warning' : 'default'} size="sm" className="backdrop-blur-md shadow-lg">
                {project.status}
              </Badge>
            </span>
          )}
        </div>
        <div className="flex flex-col flex-1 p-6 md:p-8">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-burgundy-500 transition-colors">{project.title}</h3>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-6 line-clamp-2">{project.description}</p>
          
          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.slice(0, 3).map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-burgundy-500/10 text-burgundy-600 dark:text-burgundy-400 font-semibold border border-burgundy-500/20">{t}</span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 font-semibold">+{project.technologies.length - 3}</span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-white/[0.06]">
            <span className="flex items-center gap-2 text-burgundy-600 dark:text-burgundy-500 text-sm font-bold group-hover:translate-x-1 transition-transform">
              View Case Study <ArrowRight size={16} />
            </span>
            {(project.webLiveLinks?.[0] || project.webLiveLink || project.liveLink) && (
              <a href={project.webLiveLinks?.[0] ?? project.webLiveLink ?? project.liveLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-burgundy-500 hover:text-white transition-colors" aria-label="Live preview">
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  </motion.div>
);

// ─── Page ─────────────────────────────────────────────────────────────────
const Library = () => {
  const { filtered: allFiltered, isLoading, category, setCategory, handleSelect } = useProjectsUsecase();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

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
    <section className={`${sectionBase} bg-gray-50 dark:bg-[#070b18] min-h-screen pt-32`}>
      <Scene3D variant="minimal" className="opacity-30 fixed" />
      <div className="absolute inset-0 pointer-events-none opacity-20" style={patterns.dots} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: glows.dual }} />

      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-6 sm:px-10 lg:px-20">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-burgundy-500/10 text-burgundy-600 dark:text-burgundy-400 border border-burgundy-500/20">The Archive</span>
          <AnimatedHeading
            as="h1"
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-extrabold text-gray-900 dark:text-white tracking-tight mt-6 mb-6"
          >
            Project Library
          </AnimatedHeading>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent mx-auto mb-6" />
          <p className="font-sans text-base md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Browse all my work — filter by category or search by name, description, or tech stack.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-10 md:mb-16">
          <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full pl-16 pr-6 py-4 md:py-5 text-base md:text-lg font-sans rounded-full border border-gray-300 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-md text-gray-900 dark:text-white focus:ring-4 focus:ring-burgundy-500/30 focus:border-burgundy-500 focus:outline-none transition-all shadow-xl"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 md:mb-20">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full font-display text-sm md:text-base font-bold tracking-wide transition-all duration-300
                ${activeTab === cat
                  ? 'bg-burgundy-600 text-white shadow-lg shadow-burgundy-600/30 scale-105'
                  : 'text-gray-500 dark:text-gray-400 hover:text-burgundy-500 border border-gray-200 dark:border-white/10 hover:border-burgundy-500/30 bg-white/50 dark:bg-white/5 backdrop-blur-sm'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ProjectGridSkeleton count={6} />
          </div>
        ) : displayed.length === 0 ? (
          <EmptyState
            variant="search"
            title="No projects match your search"
            description="Try a different keyword or clear the filters."
            size="lg"
          />
        ) : (
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
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
        className="fixed bottom-[10%] lg:right-20 right-6 z-50 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-burgundy-600 hover:bg-burgundy-700 text-white shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Add new project"
      >
        <Plus size={24} />
      </button>
    </section>
  );
};

export default Library;
