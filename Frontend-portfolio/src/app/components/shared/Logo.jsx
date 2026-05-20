// ============================================================================
// LOGO - Portfolio brand logo component
// ============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@utils/cn';
import { Link } from 'react-router-dom';

const sizeConfig = {
  xs: { text: 'text-sm', height: 'h-6' },
  sm: { text: 'text-base', height: 'h-8' },
  md: { text: 'text-lg', height: 'h-10' },
  lg: { text: 'text-xl', height: 'h-12' },
  xl: { text: 'text-2xl', height: 'h-16' },
};

export const Logo = ({ size = 'md', className, href = '/', animated = true }) => {
  const config = sizeConfig[size] ?? sizeConfig.md;

  const content = (
    <motion.span
      className={cn('font-bold text-gray-100 dark:text-white', config.text, className)}
      whileHover={animated ? { scale: 1.03 } : undefined}
    >
      D<span className="text-indigo-500">r.</span> Dre
    </motion.span>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }
  return content;
};

export default Logo;
