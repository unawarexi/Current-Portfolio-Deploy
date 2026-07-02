// ============================================================================
// SINGLE PORTFOLIO — highly visual, massive typography, gallery focus
// ============================================================================
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, MonitorPlay, Pencil } from '@core/constants/icons';
import { useSingleProjectUsecase } from '@app/usecases/project-usecase';
import { Badge } from '@components/ui';
import { AnimatedHeading } from '@core/animations/AnimatedText';
import Scene3D from '@core/animations/Scene3D';
import { staggerContainer, staggerItemBig, parallaxFadeUp } from '@core/animations/FramerAnimations';

const SinglePortfolio = () => {
  const { id } = useParams();
  const { project, isLoading, handleEdit } = useSingleProjectUsecase(id);

  // Parallax for the massive hero image
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (isLoading && !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#070b18]">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#070b18]">
        <h2 className="text-4xl font-bold mb-6">Project Not Found</h2>
        <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-600 text-white font-bold hover:scale-105 transition-transform">
          <ArrowLeft size={18} /> Back to Projects
        </Link>
      </div>
    );
  }

  // Combine cover image and gallery
  const coverImage = project.coverImages?.[0] || project.image || '';
  const gallery = [...(project.coverImages || []), ...(project.galleryImages || [])]
    .filter((img) => img !== coverImage)
    .filter(Boolean);

  const heroImage = coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

  return (
    <div className="bg-white dark:bg-[#070b18] text-gray-900 dark:text-gray-100 min-h-screen relative overflow-hidden">
      <Scene3D variant="minimal" className="opacity-20 fixed" />

      {/* ── MASSIVE PARALLAX HERO ──────────────────────────────────────── */}
      <div className="relative h-[65vh] sm:h-[80vh] md:h-[90vh] min-h-[450px] sm:min-h-[600px] flex items-end overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 pointer-events-none"
        >
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b18] via-[#070b18]/60 to-transparent pointer-events-none" />

        <div className="relative z-10 page-shell pb-8 sm:pb-12 md:pb-20">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm md:text-base font-bold mb-10 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Library
          </Link>

          <div className="flex flex-wrap gap-3 mb-6">
            {project.category && <Badge variant="primary" size="md" className="backdrop-blur-md bg-primary-500/80 text-white border-none">{project.category}</Badge>}
            {project.status && <Badge variant="outline" size="md" className="backdrop-blur-md bg-white/10 text-white border-white/20">{project.status}</Badge>}
          </div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={staggerItemBig}
              className="font-display text-3xl sm:text-5xl md:text-[6rem] lg:text-[8rem] font-extrabold text-white tracking-tight leading-[0.9] mb-6 sm:mb-8 md:mb-12"
            >
              {project.title}
            </motion.h1>

            <motion.div variants={staggerItemBig} className="flex flex-wrap items-center gap-4 md:gap-6">
              {(project.webLiveLink || project.liveLink) && (
                <a
                  href={project.webLiveLink ?? project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-3 px-5 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-full bg-primary-600 text-white font-bold text-xs sm:text-sm md:text-base hover:bg-primary-500 hover:scale-105 transition-all shadow-xl shadow-primary-500/30"
                >
                  <ExternalLink size={20} /> Live Project
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-3 px-5 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm md:text-base hover:bg-white hover:text-gray-900 hover:scale-105 transition-all"
                >
                  <Github size={20} /> Repository
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── CONTENT BODY ───────────────────────────────────────────────── */}
      {/* Quick-info strip */}
      <div className="relative z-10 border-b border-gray-100 dark:border-white/[0.06] bg-gray-50/80 dark:bg-white/[0.02]">
        <div className="page-shell py-5 sm:py-6 flex flex-wrap items-center gap-4 sm:gap-6">
          {project.technologies?.slice(0, 8).map((t) => (
            <span key={t}
              className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-white dark:bg-gray-800/80
                border border-gray-200 dark:border-gray-700
                text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-sm">
              {t}
            </span>
          ))}
          {project.technologies?.length > 8 && (
            <span className="text-xs text-gray-400 font-medium">+{project.technologies.length - 8} more</span>
          )}
        </div>
      </div>

      <motion.div
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="relative z-10 page-shell py-8 sm:py-10 md:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
          
          {/* Main info column */}
          <div className="space-y-10 md:space-y-16 min-w-0">
            {/* Overview */}
            <motion.div variants={staggerItemBig}>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 text-burgundy-800 dark:text-burgundy-400">Overview</h2>
              <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-[1.8] font-light">
                {project.description}
              </p>
            </motion.div>

            {/* Impact / Content */}
            {project.content && (
              <motion.div variants={staggerItemBig}>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 text-burgundy-800 dark:text-burgundy-400">The Process</h2>
                <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-[1.8]">
                  <div dangerouslySetInnerHTML={{ __html: project.content }} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <motion.div variants={staggerItemBig}
              className="sticky top-28 p-5 md:p-6 rounded-2xl
                bg-gray-50 dark:bg-white/[0.02]
                border border-gray-200 dark:border-white/[0.05]">
              <h3 className="font-display text-sm font-bold mb-5 uppercase tracking-widest text-burgundy-600 dark:text-burgundy-500">Project Details</h3>
              
              <div className="space-y-6">
                {project.technologies?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((t) => (
                        <span key={t} className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {project.client && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Client / Role</h4>
                    <p className="text-sm md:text-base font-medium">{project.client}</p>
                  </div>
                )}

                {/* Quick links in sidebar */}
                <div className="pt-2 flex flex-col gap-2">
                  {(project.webLiveLink || project.liveLink) && (
                    <a href={project.webLiveLink ?? project.liveLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-xs font-bold hover:bg-primary-500 transition-colors">
                      <ExternalLink size={14} /> View Live
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold hover:border-primary-500 hover:text-primary-500 transition-colors">
                      <Github size={14} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── GALLERY ────────────────────────────────────────────────────── */}
        {gallery.length > 0 && (
          <motion.div variants={staggerItemBig} className="mt-14 md:mt-24">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {gallery.map((img, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-white/10 ${i === 0 && gallery.length % 2 !== 0 ? 'sm:col-span-2 aspect-[21/9]' : 'aspect-video'}`}>
                  <img
                    src={img}
                    alt={`Gallery item ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── FOOTER CTA ─────────────────────────────────────────────────── */}
        <div className="pt-12 md:pt-20 flex items-center justify-between flex-wrap gap-4 border-t border-gray-200 dark:border-white/10 mt-12">
          <Link
            to="/projects"
            className="flex items-center gap-2 text-base md:text-lg text-gray-500 hover:text-primary-500 transition font-bold"
          >
            <ArrowLeft size={18} /> Back to Library
          </Link>
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-2 sm:gap-3 px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm sm:text-base font-bold hover:scale-105 transition-transform"
          >
            <Pencil size={18} /> Update Project
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default SinglePortfolio;
