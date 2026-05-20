// ============================================================================
// SPINNER / LOADER COMPONENTS - Unified loading state indicators
// ============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@utils/cn';
import { Loader2 } from '@core/constants/icons';

// ========================
// SIMPLE SPINNER
// ========================
const sizeStyles = {
  xs: { spinner: 14, text: 'text-xs' },
  sm: { spinner: 18, text: 'text-sm' },
  md: { spinner: 24, text: 'text-sm' },
  lg: { spinner: 32, text: 'text-base' },
  xl: { spinner: 48, text: 'text-lg' },
};

const variantStyles = {
  default: 'text-neutral-500 dark:text-neutral-400',
  primary: 'text-indigo-500',
  white: 'text-white',
};

export const Spinner = ({ size = 'md', variant = 'primary', label, className }) => {
  const config = sizeStyles[size] ?? sizeStyles.md;
  return (
    <div className={cn('inline-flex flex-col items-center gap-2', className)}>
      <Loader2
        size={config.spinner}
        className={cn('animate-spin', variantStyles[variant])}
      />
      {label && (
        <span className={cn(config.text, variantStyles[variant])}>{label}</span>
      )}
    </div>
  );
};

// ========================
// PAGE LOADER — full-page centered spinner
// ========================
export const PageLoader = ({ message = 'Loading…' }) => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm gap-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <Loader2 size={40} className="text-indigo-500" />
    </motion.div>
    {message && (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{message}</p>
    )}
  </div>
);

// ========================
// DOTS LOADER
// ========================
export const DotsLoader = ({ size = 'md', variant = 'primary', className }) => {
  const dotSizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };
  const gaps = { xs: 'gap-1', sm: 'gap-1', md: 'gap-1.5', lg: 'gap-2', xl: 'gap-2.5' };

  return (
    <div className={cn('flex items-center', gaps[size], className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            'rounded-full',
            dotSizes[size],
            variant === 'default' && 'bg-neutral-500',
            variant === 'primary' && 'bg-indigo-500',
            variant === 'white' && 'bg-white dark:bg-neutral-800'
          )}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};
