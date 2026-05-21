// ============================================================================
// SINGLE PORTFOLIO — case-study page
// Fetches by :id from URL; falls back to Zustand store if navigated via card.
// ============================================================================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSingleProjectUsecase } from '@app/usecases/project-usecase';
import { ArrowLeft, Github, ExternalLink, MapPin, Download, Calendar, User, Clock, Briefcase, Pencil } from '@core/constants/icons';
import { Badge } from '@components/ui';
import { cn } from '@utils/cn';
import { glows, patterns } from '@core/decorative';

// ─── Helpers ─────────────────────────────────────────────────────────────
const Section = ({ title, children, className }) => (
  <section className={cn('py-12 md:py-16', className)}>
    <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
    <div className="h-px w-16 bg-primary-500 mb-8" />
    {children}
  </section>
);

const MetaChip = ({ icon: Icon, label, value }) =>
  value ? (
    <div className="flex flex-col items-center gap-1.5 px-5 py-4 rounded-xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/[0.07] text-center min-w-[120px]">
      <div className="w-8 h-8 rounded-lg bg-primary-500/10 text-primary-500 flex items-center justify-center">
        <Icon size={16} />
      </div>
      <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-neutral-500 font-semibold">{label}</span>
      <span className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{value}</span>
    </div>
  ) : null;

const LinkButton = ({ href, icon: Icon, label, variant = 'outline' }) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200',
        variant === 'primary'
          ? 'bg-primary-600 text-white hover:bg-primary-700'
          : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400',
      )}
    >
      {Icon && <Icon size={15} />} {label}
    </a>
  ) : null;

// ─── Image lightbox ────────────────────────────────────────────────────────
const Lightbox = ({ images, index, onClose }) => {
  const [current, setCurrent] = useState(index);
  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button className="absolute top-4 right-4 text-white/60 hover:text-white text-3xl leading-none" onClick={onClose}>×</button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-2xl leading-none px-3 py-2"
        onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); }}
      >‹</button>
      <img
        src={images[current]}
        alt={`Screenshot ${current + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-2xl leading-none px-3 py-2"
        onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); }}
      >›</button>
      <span className="absolute bottom-6 text-white/50 text-xs">{current + 1} / {images.length}</span>
    </div>
  );
};

// ─── Main component ──────────────────────────────────────────────────────
const SinglePortfolio = () => {
  const { project, isLoading, handleEdit } = useSingleProjectUsecase();
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // ── Loading ───────────────────────────────────────────────────────────
  if (isLoading && !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#070b18]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 dark:text-neutral-400">Loading project…</p>
        </div>
      </div>
    );
  }

  // ── Not found ─────────────────────────────────────────────────────────
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#070b18]">
        <div className="text-center px-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Project Not Found</h2>
          <p className="text-gray-500 dark:text-neutral-400 text-sm mb-6">This project doesn't exist or has been removed.</p>
          <Link to="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition">
            <ArrowLeft size={14} /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Normalise data — support both old static data shape and new Firestore shape
  const coverImage   = project.coverImages?.[0] ?? project.image ?? null;
  const galleryImages = [
    ...(project.projectImages ?? []),
    ...(project.coverImages ?? []),
  ].filter(Boolean);
  const features = project.features
    ? project.features.split('\n').filter(Boolean)
    : (project.keyFeatures ?? []);
  const techList = project.technologies ?? project.techStack ?? [];

  return (
    <div className="bg-white dark:bg-[#070b18] text-gray-800 dark:text-gray-200 overflow-x-hidden">
      {lightboxIdx !== null && (
        <Lightbox images={galleryImages} index={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: glows.dual }} />
        {project.videoUrl ? (
          <video src={project.videoUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
        ) : coverImage ? (
          <img src={coverImage} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-900/60 to-accent-900/60" style={patterns.circuit} />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Back */}
        <Link
          to="/projects"
          className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full transition"
        >
          <ArrowLeft size={14} /> All Projects
        </Link>

        {/* Update */}
        <button
          onClick={handleEdit}
          className="absolute top-6 right-6 flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium backdrop-blur-sm bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-full transition"
        >
          <Pencil size={13} /> Update
        </button>

        {/* Title overlay */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 right-0 p-8 md:p-14"
        >
          <div className="flex flex-wrap gap-2 mb-3">
            {project.category && <Badge variant="primary" size="sm">{project.category}</Badge>}
            {project.status && (
              <Badge variant={project.status === 'Live' ? 'success' : project.status === 'In Progress' ? 'warning' : 'default'} size="sm">
                {project.status}
              </Badge>
            )}
            {project.type && <Badge variant="outline" size="sm">{project.type}</Badge>}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight max-w-3xl">
            {project.title}
          </h1>
        </motion.div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Meta chips */}
        <div className="flex flex-wrap gap-3 py-8 border-b border-gray-100 dark:border-white/[0.06]">
          <MetaChip icon={Briefcase} label="Client"   value={project.client}   />
          <MetaChip icon={User}      label="Role"     value={project.role}     />
          <MetaChip icon={Clock}     label="Duration" value={project.duration} />
          <MetaChip icon={Calendar}  label="Year"     value={project.year}     />
        </div>

        {/* Overview / description */}
        <Section title="About the Project">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base max-w-3xl">
            {project.description}
          </p>
          {/* Quick links */}
          <div className="flex flex-wrap gap-3 mt-6">
            <LinkButton href={project.githubLink}     icon={Github}      label="Source Code"  />
            <LinkButton href={project.webLiveLink}    icon={ExternalLink}       label="Live Demo"    variant="primary" />
            <LinkButton href={project.googlePlayLink} icon={Download}  label="Google Play"  />
            <LinkButton href={project.appStoreLink}   icon={Download}  label="App Store"    />
            <LinkButton href={project.videoUrl}       icon={Download}        label="Watch Demo"   />
          </div>
        </Section>

        {/* Tech stack */}
        {techList.length > 0 && (
          <Section title="Tech Stack">
            <div className="flex flex-wrap gap-2">
              {techList.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Features */}
        {features.length > 0 && (
          <Section title="Key Features">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06]">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Challenges & Solution */}
        {(project.challenges || project.solution) && (
          <Section title="Challenges & Solutions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.challenges && (
                <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10">
                  <h3 className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-3">Challenges</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{project.challenges}</p>
                </div>
              )}
              {project.solution && (
                <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-500/5 border border-green-100 dark:border-green-500/10">
                  <h3 className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wider mb-3">Solution</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{project.solution}</p>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Results */}
        {project.results && (
          <Section title="Results & Outcomes">
            <div className="p-6 rounded-2xl bg-primary-50 dark:bg-primary-500/5 border border-primary-100 dark:border-primary-500/10">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{project.results}</p>
            </div>
          </Section>
        )}

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <Section title="Project Gallery">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {galleryImages.map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800 group"
                  onClick={() => setLightboxIdx(i)}
                >
                  <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <ExternalLink size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* CTA */}
        <div className="py-12 border-t border-gray-100 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/projects"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
          >
            <ArrowLeft size={14} /> Back to all projects
          </Link>
          <div className="flex flex-wrap gap-3">
            <LinkButton href={project.githubLink}  icon={Github} label="Source Code" />
            <LinkButton href={project.webLiveLink} icon={ExternalLink}  label="Live Demo"   variant="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePortfolio;
