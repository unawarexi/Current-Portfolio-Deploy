// ============================================================================
// EXPERIENCE SECTION
// md+:    Asymmetric bento grid  (Pinterest / Apple-event card board)
// mobile: Vertical accent timeline
// ============================================================================
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, ArrowRight } from "@core/constants/icons";
import { Badge } from "@components/ui";
import { EmptyState } from "@components/shared";
import { pill, glows, patterns } from "@core/decorative";
import {
  staggerContainer,
  staggerItemBig,
} from "@core/animations/FramerAnimations";
import { AnimatedHeading, TiltCard } from "@core/animations/AnimatedText";
import { useExperienceUsecase } from "@app/usecases/experience-usecase";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getCategories = (items) => [
  "All",
  ...new Set(items.map((i) => i.type).filter(Boolean)),
];

// ─── Bento pattern: 12-col grid, 6-card repeating cycle ──────────────────────
//   [0 · 7col 2row] [1 · 5col 1row]
//                   [2 · 5col 1row]
//   [3 · 5col 2row] [4 · 7col 1row]
//                   [5 · 7col 1row]
const BENTO = [
  { col: "md:col-span-7", row: "md:row-span-2", size: "big" },
  { col: "md:col-span-5", row: "md:row-span-1", size: "sm" },
  { col: "md:col-span-5", row: "md:row-span-1", size: "sm" },
  { col: "md:col-span-5", row: "md:row-span-2", size: "big" },
  { col: "md:col-span-7", row: "md:row-span-1", size: "wide" },
  { col: "md:col-span-7", row: "md:row-span-1", size: "wide" },
];

// ─── Bento card  (tablet / desktop) ───────────────────────────────────────────
const BentoCard = ({ job, index, onSelect }) => {
  const { col, row, size } = BENTO[index % BENTO.length];
  const isBig = size === "big";
  const isWide = size === "wide";

  const isAccent = (index + 1) % 4 === 0;

  return (
    <motion.div
      variants={staggerItemBig}
      className={`${col} ${row} group cursor-pointer`}
      onClick={() => onSelect(job)}
    >
      <TiltCard intensity={isBig ? 5 : 3} className="h-full">
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-[1.75rem]
          border ${isAccent ? "border-burgundy-200 dark:border-burgundy-500/20 bg-burgundy-50 dark:bg-burgundy-900/10" : "border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#09101f] dark:hover:bg-[#0d1428]"}
          p-6 sm:p-7 lg:p-9
          hover:border-burgundy-500/25 dark:hover:border-burgundy-500/25
          hover:shadow-lg hover:shadow-burgundy-500/5
          transition-all duration-500`}
        >
          {/* Decorative glow */}
          <div
            className="pointer-events-none absolute -top-14 -right-14 h-56 w-56 rounded-full
            bg-burgundy-600/[0.07] blur-3xl
            group-hover:bg-burgundy-600/[0.18] transition-colors duration-700"
          />

          {/* Watermark number */}
          <span
            className="pointer-events-none absolute bottom-4 right-6 select-none
            font-display font-extrabold leading-none
            text-burgundy-500/[0.05] dark:text-burgundy-500/[0.05]
            text-8xl lg:text-[9rem]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Top row */}
          <div className="relative z-10 mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-burgundy-500">
                {job.type || "Experience"}
              </p>
              <h3
                className={`font-display font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white
                ${
                  isBig
                    ? "text-2xl sm:text-[1.8rem] lg:text-[2.1rem]"
                    : isWide
                      ? "text-xl sm:text-2xl lg:text-[1.75rem]"
                      : "text-lg sm:text-xl"
                }`}
              >
                {job.role}
              </h3>
              <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-slate-400">
                {job.company}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {job.isCurrent && (
                <Badge variant="success" size="sm">
                  Current
                </Badge>
              )}
              <span
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full
                border border-gray-200 bg-gray-100
                dark:border-white/[0.08] dark:bg-white/[0.04]
                px-2.5 py-1.5 font-mono text-[10px] text-gray-500 dark:text-slate-400"
              >
                <Calendar size={11} />
                {job.year}
              </span>
            </div>
          </div>

          {/* Description — visible on big / wide cards only */}
          {isBig || isWide ? (
            <p className="relative z-10 mb-5 flex-1 text-sm leading-relaxed text-gray-500 dark:text-slate-400 line-clamp-4">
              {job.description}
            </p>
          ) : (
            <div className="flex-1" />
          )}

          {/* Skill chips */}
          <div className="relative z-10 flex flex-wrap gap-1.5 mb-5">
            {(job.skills || [])
              .slice(0, isBig ? 7 : isWide ? 5 : 3)
              .map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-burgundy-500/20 bg-burgundy-500/[0.08]
                  px-2.5 py-1 text-[10px] font-medium text-burgundy-600 dark:text-burgundy-400"
                >
                  {s}
                </span>
              ))}
          </div>

          {/* CTA */}
          <div
            className="relative z-10 flex items-center gap-2 text-[11px] font-bold text-burgundy-500
            group-hover:translate-x-1 transition-transform duration-300"
          >
            View details <ArrowRight size={13} />
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

// ─── Mobile card (simple timeline item) ───────────────────────────────────────
const MobileCard = ({ job, index, onSelect }) => {
  const isAccent = (index + 1) % 4 === 0;

  return (
    <motion.div variants={staggerItemBig} className="relative group">
      <span
        className="absolute -left-[22px] top-6 z-10 h-4 w-4 rounded-full
        border-4 border-gray-50 dark:border-[#050914] bg-burgundy-500"
      />
      <div
        className={`mb-6 cursor-pointer overflow-hidden rounded-2xl
          border p-5 transition-colors duration-300
          ${isAccent ? "border-burgundy-200 dark:border-burgundy-500/20 bg-burgundy-50 dark:bg-burgundy-900/10" : "border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#09101f]"}
          hover:border-burgundy-500/30`}
        onClick={() => onSelect(job)}
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">
              {job.role}
            </h3>
            <p className="text-sm font-medium text-burgundy-600 dark:text-burgundy-400">
              {job.company}
            </p>
          </div>
          <span
            className="flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full
          border border-gray-200 bg-gray-100
          dark:border-white/[0.08] dark:bg-white/[0.04]
          px-2.5 py-1.5 font-mono text-[10px] text-gray-500 dark:text-slate-400"
          >
            <Calendar size={10} />
            {job.year}
          </span>
        </div>
        <p className="mb-3 text-xs leading-relaxed text-gray-500 dark:text-slate-400 line-clamp-2">
          {job.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(job.skills || []).slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-full border border-burgundy-500/20 bg-burgundy-500/[0.08]
            px-2 py-0.5 text-[10px] font-medium text-burgundy-600 dark:text-burgundy-400"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────
const ExperienceSection = () => {
  const { items, isLoading, handleSelect } = useExperienceUsecase();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSub, setActiveSub] = useState("All");

  const categories = getCategories(items);
  const filteredByType =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.type === activeCategory);
  const subCategories = [
    "All",
    ...new Set(filteredByType.map((i) => i.subCategory).filter(Boolean)),
  ];
  const displayed =
    activeSub === "All"
      ? filteredByType
      : filteredByType.filter((i) => i.subCategory === activeSub);
  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setActiveSub("All");
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-50 dark:bg-[#050914] py-[clamp(5.5rem,10vw,10rem)]"
      id="experience"
    >
      {/* Decorative layers */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={patterns.hatch}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: glows.topLeft }}
      />
      {/* Top separator */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-burgundy-500/30 to-transparent" />

      <div className="page-shell relative z-10">
        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="mb-12 md:mb-20 text-center">
          <span className={pill}>Career</span>
          <AnimatedHeading
            as="h2"
            className="editorial-title mx-auto mt-6 mb-6 flex max-w-5xl items-center justify-center gap-5 text-gray-900 dark:text-white"
          >
            <Briefcase size={40} className="text-burgundy-500 max-sm:hidden" />
            Work Experience
          </AnimatedHeading>
          <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-burgundy-500/50 to-transparent" />
          <p className="editorial-copy mx-auto max-w-3xl text-gray-500 dark:text-slate-400">
            A detailed overview of my professional journey across software
            engineering and product development.
          </p>
        </div>

        {/* ── Category tabs ─────────────────────────────────────────── */}
        {!isLoading && items.length > 0 && (
          <div className="mb-10 md:mb-16">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`rounded-full px-5 py-2 sm:px-7 sm:py-3 font-display text-xs sm:text-sm font-bold tracking-wide transition-all duration-300
                    ${
                      activeCategory === cat
                        ? "bg-burgundy-600 text-white shadow-lg shadow-burgundy-600/30 scale-105"
                        : "border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-white/[0.03] text-gray-600 dark:text-slate-400 hover:border-burgundy-500/30 hover:text-burgundy-500 dark:hover:text-burgundy-400"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {subCategories.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2">
                {subCategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSub(sub)}
                    className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold tracking-wide transition-all duration-300
                      ${
                        activeSub === sub
                          ? "border-b-2 border-burgundy-500 text-burgundy-500 dark:text-burgundy-400"
                          : "text-gray-400 dark:text-slate-500 hover:text-burgundy-500 dark:hover:text-burgundy-400"
                      }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Content ───────────────────────────────────────────────── */}
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-burgundy-500 border-t-transparent" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}--${activeSub}`}
              exit={{ opacity: 0 }}
            >
              {displayed.length === 0 ? (
                <EmptyState
                  variant="search"
                  title="No experiences yet"
                  description="No experience entries have been added to this category yet."
                  size="lg"
                />
              ) : (
                <>
                  {/* Mobile — vertical accent timeline */}
                  <motion.div
                    variants={staggerContainer(0.1, 0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}
                    className="md:hidden pl-6 ml-3 border-l-2 border-burgundy-500/20"
                  >
                    {displayed.map((job, i) => (
                      <MobileCard
                        key={job.id || job.company + i}
                        job={job}
                        index={i}
                        onSelect={handleSelect}
                      />
                    ))}
                  </motion.div>

                  {/* Tablet / Desktop — asymmetric bento grid */}
                  <motion.div
                    variants={staggerContainer(0.07, 0.05)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.04 }}
                    className="hidden md:grid md:grid-cols-12 md:auto-rows-[minmax(14rem,auto)] md:grid-flow-dense gap-4 lg:gap-5"
                  >
                    {displayed.map((job, i) => (
                      <BentoCard
                        key={job.id || job.company + i}
                        job={job}
                        index={i}
                        onSelect={handleSelect}
                      />
                    ))}
                  </motion.div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
