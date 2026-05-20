// ============================================================================
// CONFIRMATION — Admin login gate, redesigned with project design system
// ============================================================================
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@components/ui/Spinner';
import { Button } from '@components/ui';
import { Input } from '@components/ui';
import Images from '@core/constants/Images';
import { useAuthStore } from '@store/auth.store';
import { Shield, AlertTriangle, BadgeCheck, X } from '@core/constants/icons';
import { glows, patterns, pill } from '@core/decorative';
import { staggerContainer, staggerItem, fadeInUp } from '@core/animations/FramerAnimations';

// ─── Animated floating ring ───────────────────────────────────────────────────
const Ring = ({ size, opacity, delay }) => (
  <motion.div
    animate={{ scale: [1, 1.06, 1], opacity: [opacity, opacity * 0.6, opacity] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    className="absolute rounded-full border border-primary-500/20 pointer-events-none"
    style={{ width: size, height: size, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
  />
);

// ─── Failed auth modal ────────────────────────────────────────────────────────
const FailModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.88, opacity: 0, y: 20 }}
      animate={{ scale: 1,    opacity: 1, y: 0  }}
      exit={{    scale: 0.88, opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-sm rounded-2xl bg-[#0d1122] border border-red-500/30 shadow-2xl p-8 flex flex-col items-center text-center"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* Icon */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/15 border border-red-500/30 mb-5">
        <AlertTriangle size={28} className="text-red-400" />
      </div>

      <h3 className="font-display text-lg font-bold text-white tracking-wide mb-2">
        Access Denied
      </h3>
      <p className="font-sans text-sm text-gray-400 leading-relaxed mb-6">
        The password you entered is incorrect. Please try again.
      </p>

      <Button variant="danger" size="md" fullWidth onClick={onClose}>
        Try Again
      </Button>
    </motion.div>
  </motion.div>
);

// ─── Component ────────────────────────────────────────────────────────────────
const Confirmation = () => {
  const [input,   setInput]           = useState('');
  const [loading, setLoading]         = useState(false);
  const [showModal, setShowModal]     = useState(false);
  const [success, setSuccess]         = useState(false);

  const authID    = import.meta.env.VITE_APP_PASSWORD;
  const { login } = useAuthStore();
  const navigate  = useNavigate();

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    if (input === authID) {
      setLoading(true);
      setSuccess(true);
      login({ role: 'admin' });
      setTimeout(() => {
        setLoading(false);
        navigate('/auth/new');
      }, 1400);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070b18]">

      {/* ── Background layer ────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={patterns.circuit} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: glows.dual }} />

      {/* Faded background image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={Images.ConfirmImg2}
          alt=""
          aria-hidden="true"
          className="absolute -left-10 bottom-0 w-[55%] max-w-lg opacity-[0.07] object-contain select-none"
        />
        <img
          src={Images.ConfirmImg}
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-0 w-[50%] max-w-md opacity-[0.06] object-contain select-none"
        />
      </div>

      {/* ── Card ────────────────────────────────────────────────────── */}
      <motion.div
        variants={staggerContainer(0.1, 0.05)}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md mx-auto px-4"
      >
        {/* Decorative rings behind card */}
        <Ring size={320} opacity={0.5} delay={0}   />
        <Ring size={460} opacity={0.3} delay={1.2} />
        <Ring size={600} opacity={0.15} delay={2.4} />

        <div className="relative rounded-2xl bg-white/[0.04] border border-white/[0.09] backdrop-blur-xl shadow-2xl overflow-hidden px-8 py-10">

          {/* Top gradient accent */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/60 to-transparent" />

          {/* ── Header ──────────────────────────────────────────────── */}
          <motion.div variants={staggerItem} className="flex flex-col items-center mb-8">
            <div className={`flex items-center justify-center w-14 h-14 rounded-full mb-5 transition-colors duration-500
              ${success
                ? 'bg-green-500/15 border border-green-500/30'
                : 'bg-primary-500/15 border border-primary-500/30'}`}
            >
              {success
                ? <BadgeCheck size={26} className="text-green-400" />
                : <Shield     size={26} className="text-primary-400" />
              }
            </div>

            <span className={`${pill} mb-4`}>Admin Access</span>

            <h1 className="font-display text-2xl font-bold text-white tracking-wide text-center">
              Secure Login
            </h1>
            <p className="font-sans text-sm text-gray-400 mt-2 text-center leading-relaxed">
              Enter your admin password to access the portfolio dashboard.
            </p>
          </motion.div>

          {/* ── Form ────────────────────────────────────────────────── */}
          <motion.form variants={staggerItem} onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="password"
              label="Admin Password"
              placeholder="Enter password…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              size="lg"
              variant="default"
              leftIcon={<Shield size={16} />}
              showPasswordToggle
              disabled={loading}
              autoFocus
            />

            <Button
              type="submit"
              variant={success ? 'secondary' : 'primary'}
              size="lg"
              fullWidth
              isLoading={loading}
              isDisabled={loading || !input.trim()}
            >
              {loading ? 'Authenticating…' : success ? 'Redirecting…' : 'Confirm Identity'}
            </Button>
          </motion.form>

          {/* Bottom accent */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
        </div>

        {/* Fine print */}
        <motion.p variants={staggerItem} className="text-center text-[11px] text-gray-600 mt-4 font-mono">
          Unauthorized access is prohibited.
        </motion.p>
      </motion.div>

      {/* ── Modal ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && <FailModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Confirmation;
