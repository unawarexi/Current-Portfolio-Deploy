import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const footerData = [
  {
    title: "Web Development",
    links: ["Frontend", "Full-Stack", "MERN", "Django"],
  },
  {
    title: "Mobile Development",
    links: ["React Native", "Flutter", "Cross Platform", "Deployments"],
  },
  {
    title: "Blockchain",
    links: ["Smart Contracts", "Solidity", "dApps", "Audits"],
  },
  {
    title: "Achievements",
    links: ["Projects", "Certifications", "Hackathons", "Awards"],
  },
  {
    title: "Resources",
    links: ["Blog", "Documentation", "Tutorials", "GitHub"],
  },
  {
    title: "Contact",
    links: ["Email", "LinkedIn", "GitHub", "Twitter"],
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#050914] text-slate-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(159,37,65,0.15),transparent_28%)]" />

      <div className="page-shell relative py-20 sm:py-24 lg:py-28">
        <div className="mb-16 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 font-mono text-[0.72rem] uppercase tracking-[0.34em] text-primary-300">
              Creative engineering portfolio
            </p>
            <h2 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-bold leading-[0.94] tracking-[-0.05em] text-burgundy-900 dark:text-burgundy-400">
              Bold digital products, crafted with clarity and range.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              From interface systems to backend architecture and emerging tech, this studio focuses on work that feels modern, composed, and useful.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:gap-8">
            {footerData.map((section, index) => (
              <div key={index}>
                <h3 className="mb-4 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-slate-500">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, idx) => (
                    <li key={idx} className="text-sm text-slate-300/85 transition-colors hover:text-white sm:text-[0.95rem]">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-7 text-slate-400 sm:text-[0.95rem]">
            Stay connected for product experiments, engineering notes, and selected case studies.
          </p>
          <span className="inline-flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all hover:border-primary-400 hover:text-white">
              <FaFacebookF className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all hover:border-primary-400 hover:text-white">
              <FaTwitter className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all hover:border-primary-400 hover:text-white">
              <FaInstagram className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all hover:border-primary-400 hover:text-white">
              <FaLinkedinIn className="h-4 w-4" />
            </a>
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            2025 andrewsCorp — <span className="text-slate-300">@unaware</span>
          </p>
          <span>Empowering innovation with polished software systems.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
