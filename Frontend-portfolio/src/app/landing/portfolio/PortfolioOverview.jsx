// ============================================================================
// PORTFOLIO OVERVIEW — big, bold 3-column grid with 3D cards
// ============================================================================
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ExternalLink,
  ArrowRight,
  Plus,
  ChevronRight,
} from "@core/constants/icons";
import { Card, Badge } from "@components/ui";
import { ProjectGridSkeleton } from "@components/skeletons";
import { EmptyState } from "@components/shared";
import { VideoCard } from "@components/shared";
import {
  sectionBase,
  sectionDivider,
  pill,
  glows,
  patterns,
} from "@core/decorative";
import {
  staggerContainer,
  staggerItemBig,
} from "@core/animations/FramerAnimations";
import { AnimatedHeading, TiltCard } from "@core/animations/AnimatedText";
import useResponsive from "@hooks/useResponsive";
import { useProjectsUsecase } from "@app/usecases/project-usecase";

const CATEGORIES = ["General Overview", "Web", "Mobile", "Blockchain"];
const PAGE_LIMIT = 6; // cards shown in the homepage section

// ─── Project card ──────────────────────────────────────────────────────────
const ProjectCard = ({ project, onSelect }) => (
  <motion.div variants={staggerItemBig} className="h-full">
    <TiltCard intensity={5} className="h-full">
      <div
        onClick={() => onSelect(project)}
        className="glass-panel h-full flex flex-col overflow-hidden group rounded-md md:rounded-[2rem] cursor-pointer hover:border-primary-500/40 transition-colors duration-300"
      >
        {/* Thumbnail */}
        <div className="relative h-40 sm:h-56 md:h-64 overflow-hidden bg-gray-100 dark:bg-gray-900/50">
          {project.video ? (
            <VideoCard
              src={project.video}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            />
          ) : project.coverImages?.[0] || project.image ? (
            <img
              src={project.coverImages?.[0] ?? project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-800/40 to-accent-800/40" />
          )}

          {/* Tags overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
            {project.category && (
              <Badge
                variant="primary"
                size="sm"
                className="backdrop-blur-md bg-primary-500/80 text-white border-none shadow-lg"
              >
                {project.category}
              </Badge>
            )}
            {project.status && (
              <Badge
                variant={
                  project.status === "Live"
                    ? "success"
                    : project.status === "In Progress"
                      ? "warning"
                      : "default"
                }
                size="sm"
                className="backdrop-blur-md shadow-lg"
              >
                {project.status}
              </Badge>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-4 sm:p-6 md:p-8">
          <h3 className="font-display text-md sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2 line-clamp-1 group-hover:text-burgundy-500 transition-colors">
            {project.title}
          </h3>
          <p className="text-[10px] sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-6 line-clamp-2">
            {project.description}
          </p>

          {/* Tech chips */}
          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 md:mb-6">
              {project.technologies.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-md bg-burgundy-500/10 text-burgundy-600 dark:text-burgundy-400 font-semibold border border-burgundy-500/20"
                >
                  {t}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 font-semibold">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 md:pt-5 border-t border-gray-100 dark:border-white/[0.06]">
            <span className="flex items-center gap-2 text-burgundy-600 dark:text-burgundy-500 text-[10px] md:text-sm font-bold group-hover:translate-x-1 transition-transform">
              View Case Study <ArrowRight size={16} />
            </span>
            {(project.webLiveLink || project.liveLink) && (
              <a
                href={project.webLiveLink ?? project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-burgundy-500 hover:text-white transition-colors"
                aria-label="Live preview"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  </motion.div>
);

// ─── Section ──────────────────────────────────────────────────────────────
const PortfolioOverview = () => {
  const { filtered, isLoading, category, setCategory, handleSelect } =
    useProjectsUsecase();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();

  const visible = filtered.slice(0, PAGE_LIMIT);
  const hasMore = filtered.length > PAGE_LIMIT;

  return (
    <section
      className={`${sectionBase} bg-gray-50 dark:bg-[#070b18]`}
      id="portfolio"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={patterns.dots}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glows.bottomRight }}
      />

      <div className="page-shell relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-12 md:mb-24">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-burgundy-500/10 text-burgundy-600 dark:text-burgundy-400 border border-burgundy-500/20">
            Portfolio
          </span>
          <AnimatedHeading
            as="h2"
            className="editorial-title mt-6 mb-6 text-gray-900 dark:text-white"
          >
            Featured Projects
          </AnimatedHeading>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent mx-auto mb-6" />
          <p className="editorial-copy mx-auto max-w-3xl text-gray-500 dark:text-gray-400">
            Selected product work across web, mobile, and emerging technologies,
            presented with more space for visual storytelling.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex md:flex-wrap justify-center gap-3 sm:gap-4 mb-12 md:mb-20">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 sm:px-8 sm:py-3.5 rounded-full font-display text-[8px] sm:text-sm md:text-base font-bold tracking-wide transition-all duration-300
                ${
                  category === cat
                    ? "bg-burgundy-600 text-white shadow-lg shadow-burgundy-600/30 scale-105"
                    : "text-gray-500 dark:text-gray-400 hover:text-burgundy-500 border border-gray-200 dark:border-white/10 hover:border-burgundy-500/30 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid — changed from 4 cols to 3 cols for bigger, bolder cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ProjectGridSkeleton count={3} />
          </div>
        ) : visible.length === 0 ? (
          <EmptyState
            variant="search"
            title="No projects found"
            description="No projects in this category yet. Check back soon."
            size="lg"
          />
        ) : (
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
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
          <div className="text-center mt-16 md:mt-24">
            <button
              onClick={() => navigate("/projects")}
              className="inline-flex items-center gap-3 px-6 py-3 sm:px-10 sm:py-5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs sm:text-sm md:text-base font-bold hover:border-burgundy-500 hover:text-burgundy-500 dark:hover:text-burgundy-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:scale-105 group"
            >
              Explore all projects
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        )}
      </div>

      {/* FAB — admin only */}
      <button
        onClick={() => navigate("/auth/new")}
        className="fixed bottom-[10%] lg:right-20 right-6 z-50 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-burgundy-600 hover:bg-burgundy-700 text-white shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Add new project"
      >
        <Plus size={24} />
      </button>
    </section>
  );
};

export default PortfolioOverview;
