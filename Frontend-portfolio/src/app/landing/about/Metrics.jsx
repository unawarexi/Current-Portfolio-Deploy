// ============================================================================
// METRICS — developer KPI cards with big bold design and 3D parallax
// ============================================================================

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle } from "@core/constants/icons";
import { pill, glows, patterns } from "@core/decorative";
import {
  staggerContainer,
  staggerItemBig,
} from "@core/animations/FramerAnimations";
import { AnimatedHeading, TiltCard } from "@core/animations/AnimatedText";
import Scene3D from "@core/animations/Scene3D";
import useResponsive from "@hooks/useResponsive";

const metricsData = [
  {
    title: "Code Quality",
    items: [
      "98% code test coverage",
      "Fewer than 2% bugs reported post-release",
      "100% adherence to review standards",
    ],
  },
  {
    title: "Delivery Speed",
    items: [
      "3–5 new features shipped monthly",
      "2-day average turnaround for hotfixes",
      "100% on-time project delivery",
    ],
  },
  {
    title: "User Engagement",
    items: [
      "75% of users adopt new features within 2 weeks",
      "80% of feedback actioned in next cycle",
      "90% user retention over 6 months",
    ],
  },
  {
    title: "Full-Stack Proficiency",
    items: [
      "Mastery in React, Node.js, and databases",
      "95% hands-on experience with cloud services",
      "Delivered 20+ full-stack applications",
    ],
  },
  {
    title: "Frontend Expertise",
    items: [
      "Responsive UI — 95% cross-browser compatibility",
      "90+ Lighthouse performance scores",
      "30+ dynamic, interactive web apps shipped",
    ],
  },
  {
    title: "Mobile Development",
    items: [
      "10+ apps live on App Store & Google Play",
      "98% crash-free session rate",
      "5-star rating on 90% of app reviews",
    ],
  },
];

const Metrics = () => {
  const { isMobile } = useResponsive();

  return (
    <div
      className="relative w-full py-14 sm:py-20 md:py-32 lg:py-40 px-4 sm:px-10 lg:px-20 overflow-hidden bg-gray-50 dark:bg-gray-950"
      id="metrics"
    >
      {/* Decorative */}
      <Scene3D variant="minimal" className="opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={patterns.grid}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glows.dual }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <span className={pill}>Performance</span>
          <AnimatedHeading
            as="h2"
            className="font-display text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-6 mb-4"
          >
            Developer Metrics
          </AnimatedHeading>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent mx-auto" />
        </div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8 lg:gap-10"
        >
          {metricsData.map(({ title, items }, i) => (
            <motion.div
              key={title}
              variants={staggerItemBig}
              className="h-full"
            >
              <TiltCard intensity={5} className="h-full">
                <div
                  className="h-full p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] backdrop-blur-lg
                             hover:border-primary-500/30 dark:hover:border-primary-500/40 hover:shadow-xl hover:shadow-primary-500/10 dark:hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-500/20 transition-colors duration-500" />

                  <h3 className="relative z-10 font-display text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-wide mb-4 sm:mb-6">
                    {title}
                  </h3>
                  <ul className="relative z-10 space-y-3 sm:space-y-4">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 sm:gap-4 text-gray-600 dark:text-gray-400 text-[10px] sm:text-sm md:text-base leading-relaxed"
                      >
                        <CheckCircle
                          size={isMobile ? 12 : 18}
                          className="flex-shrink-0 mt-0.5 text-primary-500"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Metrics;
