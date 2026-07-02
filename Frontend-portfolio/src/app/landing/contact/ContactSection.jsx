// ============================================================================
// CONTACT SECTION — big, bold Apple-style layout with 3D background
// ============================================================================

import React from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
} from "@core/constants/icons";
import { Input, Button, Card } from "@components/ui";
import {
  sectionBase,
  sectionDivider,
  pill,
  glows,
  patterns,
} from "@core/decorative";
import { fadeInLeft, fadeInRight } from "@core/animations/FramerAnimations";
import { AnimatedHeading, TiltCard } from "@core/animations/AnimatedText";
import Scene3D from "@core/animations/Scene3D";
import { useContactUsecase } from "@app/usecases/contact-usecase";

// ─── Info items ────────────────────────────────────────────────────────────
const contactInfo = [
  {
    Icon: MapPin,
    label: "Location",
    value: "Benin City, Edo — Lagos, Nigeria",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "+234 (902) 837-8837",
    href: "tel:+2349028378837",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "andrewchukwuweike@gmail.com",
    href: "mailto:andrewchukwuweike@gmail.com",
  },
];

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
  { day: "Saturday", time: "10:00 AM – 4:00 PM" },
  { day: "Sunday", time: "Closed" },
];

const socials = [
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/andrew-j-chukwuweike-se",
    label: "LinkedIn",
  },
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

// ─── Component ────────────────────────────────────────────────────────────────
const ContactSection = () => {
  const { fields, handleChange, submit, isSubmitting } = useContactUsecase();

  return (
    <section
      className={`${sectionBase} bg-white dark:bg-[#070b18] min-h-screen flex items-center`}
      id="contact"
    >
      <Scene3D variant="dense" className="opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={patterns.cross}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block opacity-40"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(159,37,65,0.2) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none dark:opacity-30"
        style={{ background: glows.dual }}
      />

      <div className="page-shell relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-burgundy-500/10 text-burgundy-600 dark:text-burgundy-400 border border-burgundy-500/20">
            Contact
          </span>
          <AnimatedHeading
            as="h2"
            className="editorial-title mt-6 mb-6 text-burgundy-800 dark:text-burgundy-400"
          >
            Get In Touch
          </AnimatedHeading>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent mx-auto mb-6" />
          <p className="editorial-copy text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            Have a project in mind? Let's build something extraordinary
            together. I respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 xl:gap-16 items-start px-[5%] lg:px-[10%]">
          {/* ── Contact form (3 cols) ──────────────────────────────── */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3"
          >
            <TiltCard intensity={2}>
              <div className="glass-panel rounded-[2rem] p-8 md:p-12">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                  Send a Message
                </h3>
                <p className="font-sans text-sm md:text-base text-gray-500 dark:text-gray-400 mb-8 md:mb-10">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </p>

                <form
                  onSubmit={submit}
                  className="flex flex-col gap-5 md:gap-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
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
                  {/* Textarea */}
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={fields.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project…"
                      rows={6}
                      required
                      className="w-full px-5 py-4 rounded-xl text-base font-sans
                        bg-gray-50 dark:bg-white/[0.04]
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
                    className="mt-4 h-14 text-base shadow-lg shadow-primary-500/30"
                    rightIcon={<Send size={18} />}
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </TiltCard>
          </motion.div>

          {/* ── Info panel (2 cols) ───────────────────────────────── */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6 md:gap-8"
          >
            {/* Contact info */}
            <div className="glass-panel rounded-[2rem] p-8 md:p-10">
              <h3 className="font-display text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-8">
                Contact Information
              </h3>
              <div className="space-y-6 md:space-y-8">
                {contactInfo.map(({ Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 md:gap-5 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-1.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="font-sans text-sm md:text-base text-gray-800 dark:text-gray-200 hover:text-primary-500 transition-colors font-medium"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-sans text-sm md:text-base text-gray-800 dark:text-gray-200 font-medium">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="glass-panel rounded-[2rem] p-8 md:p-10">
              <h3 className="font-display text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
                Hours of Operation
              </h3>
              <div className="space-y-3">
                {hours.map(({ day, time }) => (
                  <div
                    key={day}
                    className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-white/[0.05] last:border-0"
                  >
                    <span className="font-sans text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {day}
                    </span>
                    <span className="font-mono text-xs text-gray-800 dark:text-gray-200 font-semibold">
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-2">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 bg-white dark:bg-white/5 hover:border-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary-500/30"
                >
                  <Icon size={20} />
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
