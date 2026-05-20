// ============================================================================
// CONTACT SECTION  (renamed from contact/Contact.jsx, Contact.css removed)
// Uses: useContactUsecase, Input (ui), Button (ui), Card (ui),
//       Send / Mail / Phone / MapPin (icons.js)
// ============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Twitter, Linkedin, Instagram } from '@core/constants/icons';
import { Input, Button, Card } from '@components/ui';
import { sectionBase, sectionDivider, pill, glows, patterns } from '@core/decorative';
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@core/animations/FramerAnimations';
import { useContactUsecase } from '@app/usecases/contact-usecase';

// ─── Info items ────────────────────────────────────────────────────────────
const contactInfo = [
  {
    Icon: MapPin,
    label: 'Location',
    value: 'Benin City, Edo — Lagos, Nigeria',
  },
  {
    Icon: Phone,
    label: 'Phone',
    value: '+234 (902) 837-8837',
    href: 'tel:+2349028378837',
  },
  {
    Icon: Mail,
    label: 'Email',
    value: 'andrewchukwuweike@gmail.com',
    href: 'mailto:andrewchukwuweike@gmail.com',
  },
];

const hours = [
  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
  { day: 'Saturday',         time: '10:00 AM – 4:00 PM' },
  { day: 'Sunday',           time: 'Closed' },
];

const socials = [
  { Icon: Linkedin,  href: 'https://www.linkedin.com/in/andrew-j-chukwuweike-se', label: 'LinkedIn' },
  { Icon: Twitter,   href: 'https://twitter.com', label: 'Twitter' },
  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

// ─── Component ────────────────────────────────────────────────────────────────
const ContactSection = () => {
  const { fields, handleChange, submit, isSubmitting } = useContactUsecase();

  return (
    <section
      className={`${sectionBase} bg-white dark:bg-[#070b18]`}
      id="contact"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20" style={patterns.cross} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: glows.dual }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className={pill}>Contact</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-wide mt-4 mb-2">
            Get In Touch
          </h2>
          <div className={sectionDivider} />
          <p className="font-sans text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Have a project in mind? Let's talk — I respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Contact form (3 cols) ──────────────────────────────── */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-3"
          >
            <Card
              variant="glass"
              size="lg"
              className="border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02]"
            >
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white tracking-wide mb-2">
                Send a Message
              </h3>
              <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mb-8">
                Feel free to reach out and I'll get back to you as soon as possible.
              </p>

              <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={fields.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <Input
                  label="Subject"
                  name="subject"
                  value={fields.subject}
                  onChange={handleChange}
                  placeholder="Project enquiry"
                />
                {/* Textarea — Input component doesn't have as= prop, use raw textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-medium text-gray-700 dark:text-gray-300">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project…"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm font-sans
                      bg-white dark:bg-white/[0.04]
                      border border-gray-200 dark:border-white/10
                      text-gray-900 dark:text-white
                      placeholder:text-gray-400 dark:placeholder:text-gray-600
                      focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                      resize-none transition-all duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                  rightIcon={<Send size={16} />}
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* ── Info panel (2 cols) ───────────────────────────────── */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact info */}
            <Card
              variant="glass"
              size="lg"
              className="border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02]"
            >
              <h3 className="font-display text-base font-semibold text-gray-900 dark:text-white tracking-wide mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                {contactInfo.map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-500/15 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <Icon size={15} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="font-sans text-sm text-gray-800 dark:text-gray-200 hover:text-primary-500 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="font-sans text-sm text-gray-800 dark:text-gray-200">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Hours */}
            <Card
              variant="glass"
              size="lg"
              className="border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02]"
            >
              <h3 className="font-display text-base font-semibold text-gray-900 dark:text-white tracking-wide mb-4">
                Hours of Operation
              </h3>
              <div className="space-y-2">
                {hours.map(({ day, time }) => (
                  <div key={day} className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-white/[0.05] last:border-0">
                    <span className="font-sans text-xs text-gray-600 dark:text-gray-400">{day}</span>
                    <span className="font-mono text-xs text-gray-800 dark:text-gray-200">{time}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 dark:border-white/20 text-gray-500 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-all duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
