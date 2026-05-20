// ============================================================================
// SOCIALS — icon links using lucide-react (from @core/constants/icons)
// ============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter, Instagram, Mail } from '@core/constants/icons';
import { cn } from '@utils/cn';

const links = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/andrew-j-chukwuweike-se',
    label: 'LinkedIn',
    color: 'hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]',
  },
  {
    icon: Github,
    href: 'https://www.github.com/unawarexi',
    label: 'GitHub',
    color: 'hover:bg-gray-800 hover:text-white hover:border-gray-800 dark:hover:bg-white dark:hover:text-gray-900',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com',
    label: 'Twitter / X',
    color: 'hover:bg-black hover:text-white hover:border-black',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com',
    label: 'Instagram',
    color: 'hover:bg-gradient-to-br hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white',
  },
  {
    icon: Mail,
    href: 'mailto:andrewchukwuweike@gmail.com',
    label: 'Email',
    color: 'hover:bg-primary-600 hover:text-white hover:border-primary-600',
  },
];

const Socials = ({ size = 20 }) => (
  <div className="flex items-center gap-3">
    {links.map(({ icon: Icon, href, label, color }) => (
      <motion.a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        whileHover={{ scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-full',
          'border border-gray-300 dark:border-white/20',
          'text-gray-600 dark:text-gray-400',
          'transition-all duration-200',
          color,
        )}
      >
        <Icon size={size} />
      </motion.a>
    ))}
  </div>
);

export default Socials;
