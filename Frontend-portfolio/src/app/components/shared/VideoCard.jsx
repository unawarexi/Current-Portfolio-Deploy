// ============================================================================
// VideoCard — <video> that only plays when the element is visible in the
// viewport (IntersectionObserver).  Pauses + rewinds when out of view so
// dozens of off-screen videos never burn CPU / GPU / bandwidth.
// ============================================================================
import React, { useRef, useEffect } from 'react';

const VideoCard = ({ src, className, poster }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Only call play if paused to avoid DOMException on rapid scroll
          if (el.paused) el.play().catch(() => {});
        } else {
          if (!el.paused) { el.pause(); el.currentTime = 0; }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      loop
      muted
      playsInline
      preload="none"      // don't fetch until we decide to play
    />
  );
};

export default VideoCard;
