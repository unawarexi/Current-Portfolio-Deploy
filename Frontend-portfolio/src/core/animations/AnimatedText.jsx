// ============================================================================
// ANIMATED TEXT — premium text animation components
// AnimatedHeading: splits text into words with staggered reveal
// CountUp: animated number counter for metrics / stats
// ParallaxText: scroll-velocity based text marquee
// ============================================================================
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// ── Animated Heading — word-by-word staggered reveal ────────────────────────
const wordVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export const AnimatedHeading = ({
  children,
  as: Tag = 'h2',
  className = '',
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  if (!text) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag ref={ref} className={className} style={{ perspective: '600px' }}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
};

// ── CountUp — animated number counter ───────────────────────────────────────
export const CountUp = ({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const numEnd = parseInt(end, 10);
    if (isNaN(numEnd)) {
      setCount(end);
      return;
    }

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numEnd));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

// ── Parallax Section Heading — Y-offset on scroll ──────────────────────────
export const ParallaxHeading = ({ children, className = '', speed = 0.3 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80 * speed, -80 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// ── 3D Tilt Card wrapper ────────────────────────────────────────────────────
export const TiltCard = ({ children, className = '', intensity = 8 }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
