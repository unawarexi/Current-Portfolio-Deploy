// ============================================================================
// METRICS — developer KPI cards
// Uses: Card (ui), CheckCircle (icons.js), staggerContainer
// ============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from '@core/constants/icons';
import { Card } from '@components/ui';
import { pill, sectionDivider, glows, patterns } from '@core/decorative';
import { staggerContainer, staggerItem } from '@core/animations/FramerAnimations';

const metricsData = [
  {
    title: 'Code Quality',
    items: [
      '98% code test coverage',
      'Fewer than 2% bugs reported post-release',
      '100% adherence to review standards',
    ],
  },
  {
    title: 'Delivery Speed',
    items: [
      '3–5 new features shipped monthly',
      '2-day average turnaround for hotfixes',
      '100% on-time project delivery',
    ],
  },
  {
    title: 'User Engagement',
    items: [
      '75% of users adopt new features within 2 weeks',
      '80% of feedback actioned in next cycle',
      '90% user retention over 6 months',
    ],
  },
  {
    title: 'Full-Stack Proficiency',
    items: [
      'Mastery in React, Node.js, and databases',
      '95% hands-on experience with cloud services',
      'Delivered 20+ full-stack applications',
    ],
  },
  {
    title: 'Frontend Expertise',
    items: [
      'Responsive UI — 95% cross-browser compatibility',
      '90+ Lighthouse performance scores',
      '30+ dynamic, interactive web apps shipped',
    ],
  },
  {
    title: 'Mobile Development',
    items: [
      '10+ apps live on App Store & Google Play',
      '98% crash-free session rate',
      '5-star rating on 90% of app reviews',
    ],
  },
];

const Metrics = () => (
  <div
    className="relative w-full py-20 px-4 sm:px-8 overflow-hidden bg-[#070b18]"
    id="metrics"
  >
    {/* Decorative */}
    <div className="absolute inset-0 pointer-events-none opacity-20" style={patterns.grid} />
    <div className="absolute inset-0 pointer-events-none" style={{ background: glows.dual }} />

    <div className="relative z-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <span className={pill}>Performance</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-wide mt-4 mb-2">
          Developer Metrics
        </h2>
        <div className={sectionDivider} />
      </div>

      {/* Cards grid */}
      <motion.div
        variants={staggerContainer(0.1, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {metricsData.map(({ title, items }) => (
          <motion.div key={title} variants={staggerItem}>
            <Card
              variant="glass"
              size="lg"
              hoverable
              className="h-full group border border-white/[0.07] bg-white/[0.03] hover:border-primary-500/30"
            >
              <h3 className="font-display text-base sm:text-lg font-semibold text-white tracking-wide mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-gray-400 text-sm">
                    <CheckCircle
                      size={15}
                      className="flex-shrink-0 mt-0.5 text-primary-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);

export default Metrics;
