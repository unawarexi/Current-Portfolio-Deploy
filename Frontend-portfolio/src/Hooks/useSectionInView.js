// ============================================================================
// useSectionInView — fires once when an element enters the viewport.
// Returns { ref, inView }.  inView latches to true and never goes back to
// false so sections mount once and stay mounted (no layout thrash on scroll).
// ============================================================================
import { useRef, useState, useEffect } from 'react';

/**
 * @param {IntersectionObserverInit} options
 * @param {boolean} triggerOnce – default true; latch after first intersection
 */
const useSectionInView = (options = {}, triggerOnce = true) => {
  const ref    = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already latched – skip setting up observer
    if (triggerOnce && inView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (triggerOnce) observer.disconnect();
      } else if (!triggerOnce) {
        setInView(false);
      }
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, triggerOnce, options]);

  return { ref, inView };
};

export default useSectionInView;