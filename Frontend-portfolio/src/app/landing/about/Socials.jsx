// ============================================================================
// SOCIALS — icon links with bigger typography and 3D hover effects
// ============================================================================

import React from 'react';
import { Linkedin, Github, Twitter, Instagram, Mail } from '@core/constants/icons';
import { cn } from '@utils/cn';
import { TiltCard } from '@core/animations/AnimatedText';

const links = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/andrew-j-chukwuweike-se',
    label: 'LinkedIn',
    color: 'group-hover:bg-[#0077B5] group-hover:text-white group-hover:border-[#0077B5]',
  },
  {
    icon: Github,
    href: 'https://www.github.com/unawarexi',
    label: 'GitHub',
    color: 'group-hover:bg-gray-800 group-hover:text-white group-hover:border-gray-800 dark:group-hover:bg-white dark:group-hover:text-gray-900',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com',
    label: 'Twitter / X',
    color: 'group-hover:bg-black group-hover:text-white group-hover:border-black dark:group-hover:bg-white dark:group-hover:text-black dark:group-hover:border-white',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com',
    label: 'Instagram',
    color: 'group-hover:bg-gradient-to-br group-hover:from-yellow-400 group-hover:via-pink-500 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent',
  },
  {
    icon: Mail,
    href: 'mailto:andrewchukwuweike@gmail.com',
    label: 'Email',
    color: 'group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600',
  },
];

const Socials = ({ size = 22 }) => (
  <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
    {links.map(({ icon: Icon, href, label, color }) => (
      <TiltCard key={label} intensity={25}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group block"
        >
          <div className={cn(
            'flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full',
            'border-2 border-gray-200 dark:border-white/10',
            'bg-white dark:bg-gray-900',
            'text-gray-600 dark:text-gray-400',
            'shadow-sm group-hover:shadow-xl',
            'transition-all duration-300 group-hover:scale-110',
            color,
          )}>
            <Icon size={size} className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          </div>
        </a>
      </TiltCard>
    ))}
  </div>
);

export default Socials;
