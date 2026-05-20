// ============================================================================
// THEME TOGGLE - Switch between light and dark modes
// ============================================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from '@core/constants/icons';
import { cn } from '@utils/cn';
import useThemeStore from '@store/theme.store';

const iconVariants = {
  initial: { scale: 0, rotate: -180, opacity: 0 },
  animate: { scale: 1, rotate: 0, opacity: 1 },
  exit: { scale: 0, rotate: 180, opacity: 0 },
};

export const ThemeToggle = ({ size = 'md', className }) => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  const btnPad = size === 'sm' ? 'p-1.5' : size === 'lg' ? 'p-2.5' : 'p-2';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleDarkMode}
      className={cn(
        btnPad,
        'rounded-lg transition-colors',
        'bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/30',
        'border border-white/20 dark:border-white/10',
        'text-gray-200 hover:text-white',
        'focus:outline-none',
        className
      )}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDarkMode ? (
          <motion.div
            key="sun"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <Sun size={iconSize} className="text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <Moon size={iconSize} className="text-indigo-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
